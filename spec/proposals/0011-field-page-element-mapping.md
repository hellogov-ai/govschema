# GSP-0011: Field-to-page-element mapping (companion `mapping.json`)

- **Status:** Accepted — CEO sign-off recorded 2026-07-01 (GOV-267 decision
  interaction, "Accept as written"). The companion-file approach, the scope
  boundary, and the GSP-0010-first sequencing are accepted as written below.
  Registry rollout (the `mapping.json` pilot) is tracked separately.
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-267 (per the GOV-265 plan, Workstream C)
- **Affects:** `registry/` (new file convention), `tools/` (a new validator),
  `practices/` (a new verification practice), consumers that drive a browser
  against a live government form
- **One-way-door:** yes. This introduces a new registry artifact type and file
  convention that other tooling (a pilot in GSP-0010, a future MCP/Skill layer)
  would come to depend on. Per [GOVERNANCE.md](../../GOVERNANCE.md), it requires
  maintainer (CEO) sign-off before acceptance. This proposal is not normative
  and creates no obligation on its own; nothing in `spec/vN` or the registry
  changes until it is accepted.

## Problem

A GovSchema document describes *what* a government process asks for — its
fields, types, validation, and flow — and, via `sourceRef`, *where a field
appears in the source document* (e.g. `"Box 4a"`, a page heading). It was never
meant to, and does not, say *where that field lives on the live web page* — which
`<input>`, `<select>`, or ARIA-labelled control a browser-driving agent should
target. An agent that wants to read a government form's live page and line up
each control with a schema field currently has to guess, per site, with no
structured help from the standard.

Two properties make this a poor fit for `schema.json` itself:

1. **Volatility mismatch.** A government site's markup (CSS classes, framework,
   a redesign) churns far more often than the legal content of the form it
   presents. If locator data lived inside `schema.json` and shared its version,
   a purely cosmetic DOM change would force a version bump on a document whose
   fields and rules had not changed at all — undermining the immutable,
   semver-stable registry contract the rest of the standard is built on (lens:
   *backward compatibility & semver*).
2. **Different verification clock.** Confirming a schema's fields match the
   legal content of a form, and confirming a selector still resolves on the live
   page, are two different acts of verification with two different half-lives.
   Conflating them under one `verification.lastVerifiedAt` would let a stale
   selector hide behind a schema that is otherwise still accurate, or vice
   versa.

## Sketch (non-normative)

A **separate, OPTIONAL companion artifact**, sibling to `schema.json`, never a
member inside it:

```
registry/<id>/<version>/mapping.json
registry/<id>/<edition>/<version>/mapping.json   # time-versioned forms (§5.7, GSP-0005)
```

The `<id>`, `<edition>`, and `<version>` segments are exactly the ones already
governing the sibling `schema.json` under the same directory — `mapping.json`
never introduces its own versioning axis; it always describes the schema
version it sits beside.

### Shape

```json
{
  "$schema": "https://govschema.org/spec/v0.2/mapping.schema.json",
  "mappingVersion": "0.1.0",
  "schema": { "id": "ie/dttas/driving-licence-renewal", "version": "1.0.0" },
  "source": {
    "url": "https://www.ndls.ie/licensed-driver/renew-my-driving-licence.html"
  },
  "verification": {
    "method": "selector-probe-v1",
    "lastVerifiedAt": "2026-07-01",
    "nextReviewBy": "2026-08-01"
  },
  "fields": [
    {
      "name": "applicationChannel",
      "locators": [
        { "signal": "label-text", "value": "How are you renewing?" },
        { "signal": "aria-label", "value": "Renewal channel" },
        { "signal": "name-attr", "value": "applicationChannel" },
        { "signal": "css-selector", "value": "#renewal-channel-select" },
        { "signal": "xpath", "value": "//select[@id='renewal-channel-select']" }
      ]
    }
  ]
}
```

- **`schema.id` / `schema.version`** — explicit back-reference to the sibling
  document. Redundant with the directory path (defense in depth, and it lets a
  `mapping.json` be validated in isolation without re-deriving its path).
- **`fields[].name`** — the field being located.
- **`fields[].locators`** — an **ordered list of candidate locator signals**,
  tried in order by a consuming agent until one resolves. No single locator
  signal is treated as authoritative or guaranteed stable; degrading gracefully
  across several signals is the entire value of the artifact over a single
  brittle CSS selector. Recommended `signal` vocabulary, in the recommended
  fallback order (most to least resilient to a redesign):

  | `signal`       | Meaning                                                  |
  | -------------- | --------------------------------------------------------- |
  | `label-text`   | Visible text of the control's associated `<label>`.       |
  | `aria-label`   | The control's `aria-label` (or `aria-labelledby` target).  |
  | `name-attr`    | The control's `name` attribute.                            |
  | `id-attr`      | The control's `id` attribute.                              |
  | `css-selector` | A CSS selector.                                            |
  | `xpath`        | An XPath expression — last resort, most brittle to markup change. |

  The vocabulary is open (new signals may be added without a breaking change),
  but the fallback order above is a recommendation a consumer SHOULD follow: try
  human-legible signals (label text, ARIA) before structural ones (CSS, XPath),
  since the former survive a redesign far more often than the latter.

### Referential integrity

- Every `fields[].name` in `mapping.json` MUST resolve to a `name` defined in
  the sibling `schema.json`'s `fields`. This is the same shape of rule as the
  existing flow-reference-integrity check (`SPEC.md` §10 rule 4: every step
  `fields` entry must resolve to a defined field name) and would be enforced the
  same way — as a normative, non-JSON-Schema-expressible rule, checked by
  tooling rather than the meta-schema alone.
- `mapping.json` MAY omit fields that have no stable page presence (e.g. a field
  only ever set via conditional client-side logic with no visible control) — the
  reverse direction (every `mapping.json` field name exists in `schema.json`) is
  the integrity rule; the converse (every schema field has a mapping entry) is
  not required, since coverage may be partial.

### Its own verification record

- `mapping.json` carries its **own** `verification` block, structurally similar
  to but independent of the schema's — a different `method`, its own
  `lastVerifiedAt` / `nextReviewBy`. A schema's `status: verified` claim is about
  legal-content fidelity; a mapping's freshness claim is about selectors still
  resolving on the live page. These MUST NOT be conflated into one flag.
- This proposal recommends a new verification practice, e.g.
  `selector-probe-v1`, documented under `practices/` alongside
  `manual-source-review-v1`: an **automated, headless-browser probe** that loads
  `source.url`, attempts each field's locator list in order, and records whether
  at least one signal resolved per field. Unlike `manual-source-review-v1`, this
  practice is a natural candidate for a scheduled/CI check rather than a purely
  human one, since it is checking DOM presence, not legal meaning — but the
  practice doc itself is a separate, later deliverable (tracked as a follow-up
  once this GSP is accepted), not specified in full here.

### Scope boundary — describe, never prescribe (normative if accepted)

This is a hard boundary, not a style preference, per `AGENTS.md` §5 and
[GOVERNANCE.md](../../GOVERNANCE.md) ("GovSchema does not fill out forms or
submit data on anyone's behalf"):

- `mapping.json` is **descriptive only**: it says *where a value for a named
  field goes on the page*. It MUST NOT contain, and a conforming producer MUST
  NOT add:
  - a submission endpoint or action URL;
  - a "submit"/"next"/navigation locator or instruction of any kind;
  - autofill or auto-submit instructions, sequencing, or timing directives;
  - anything from which "how to complete and submit this form end-to-end"
    could be assembled without a human or an independent agent decision at
    every step.
- If accepted, this constraint MUST be stated in the normative text (`SPEC.md`
  or a dedicated mapping spec section) exactly as above, not left as prose
  intent only — the meta-schema for `mapping.json` should shape its member set
  (e.g. no `action`, `submitUrl`, or `next` members exist to define) so the
  boundary is structural, not merely documented.
- A reviewer checking a `mapping.json` PR should read this section as a
  checklist, not a suggestion.

### Additive and optional — no effect on `schema.json` conformance

- The **absence** of `mapping.json` MUST NOT affect whether the sibling
  `schema.json` conforms to the spec. `mapping.json` is opt-in tooling for one
  consumption pattern (an agent driving a browser); an agent calling a
  government API directly, or one only validating user input against the
  meta-schema, never needs it and is unaffected by its absence.
- Symmetrically, a **present** `mapping.json` that fails its own validation
  (bad referential integrity, a forbidden member) is an error in the mapping
  artifact, never a reason to invalidate the sibling schema.

## Sequencing note — relationship to GSP-0010

[GSP-0010](./0010-namespaced-extensions.md) (namespaced `extensions`) is a
plausible **proving step** before committing to this GSP's companion-file shape:
a per-field `extensions.org.govschema.locator` hint could pilot the locator
concept on one or two reference schemas today, entirely inside the existing
`extensions` proving ground, with no new file convention and no registry-shape
change. That pilot would be reversible in a way a new artifact type is not —
`extensions` data can be dropped without consequence, per GSP-0010's own
design.

Recommend treating the two as sequenced, not competing: GSP-0010's acceptance
unblocks a low-risk `extensions`-based pilot on 1–2 schemas; what is learned from
that pilot (does the ordered-locator-list shape hold up, is per-field the right
granularity, does an automated probe practice actually work against a real
site) should inform whether this GSP's `mapping.json` shape ships as sketched
above or is revised first. Practically: **this GSP does not need to wait for the
pilot to be written or drafted**, but its **acceptance and any registry rollout**
should follow the pilot's findings where the two disagree. The GOV-265 plan
(§5) recommends bundling GSP-0010 and this proposal for CEO review together for
exactly this reason.

## Open questions

- **Granularity of `locators`.** A flat ordered array per field (as sketched) vs.
  something richer (e.g. per-locator confidence, or scoping to a specific
  `steps` entry when the same field name could recur across a multi-page flow).
  Recommend shipping the flat array first; multi-step scoping is a
  backward-compatible addition if a real multi-step recurrence case appears.
- **`mappingVersion` vs. reusing `govschemaVersion`.** Whether `mapping.json`
  versions itself against a `spec/vN`-style mapping meta-schema independently of
  the core spec, or is folded into the same `spec/vN` line as an additional
  schema file (`mapping.schema.json` alongside `govschema.schema.json`).
  Recommend the latter (one spec line, two meta-schemas) for simplicity, but
  this is a build-time decision for whoever implements, not one that needs
  CEO sign-off itself.
- **Coverage requirement.** Whether a `mapping.json`, once present, must cover
  *all* schema fields or may be partial. Recommend explicitly permitting partial
  coverage (see Referential integrity above) since a first mapping pass is more
  useful shipped incomplete than not shipped at all — matches the project's
  existing `draft`/`verified` two-tier tolerance for schemas themselves.
- **Practice doc timing.** Whether `selector-probe-v1` should be fully specified
  as part of this GSP's acceptance, or as a fast-follow once the artifact shape
  itself is approved. Recommend fast-follow: the artifact shape is the one-way
  door; the practice doc is ordinary two-way-door work once the shape exists.

## Decision — Accepted

CEO sign-off was requested because this introduces a new registry artifact type
and file convention (a one-way door per [GOVERNANCE.md](../../GOVERNANCE.md))
that other work — the GSP-0010-based pilot and any future MCP/Skill layer
referencing mapping data — would come to depend on. Sign-off was requested on:

1. The companion-file approach itself (`mapping.json`, sibling to `schema.json`,
   never a member inside it) over folding locator data into the schema.
2. The scope boundary as written above (descriptive-only, no submission/autofill
   surface) as the normative constraint if this GSP is accepted.
3. The sequencing recommendation — an `extensions`-based pilot under GSP-0010
   first, this GSP's registry rollout second.

**Recorded:** Accepted as written (GOV-267 decision interaction, resolved
2026-07-01) — "Accept as written: merge PR #26, mark GSP-0011 Accepted, unblock
the mapping.json pilot child issue." All three points above are accepted as
proposed, with no requested changes.

This proposal remains non-normative text: acceptance authorizes the design, but
no `spec/vN` change, `mapping.json` file, or dependent tooling exists yet.
Acceptance unblocks the GOV-265 plan's child issue piloting `mapping.json` on 1–2
reference schemas (tracked separately, sequenced after the GSP-0010 pilot per
the Sequencing note above).
