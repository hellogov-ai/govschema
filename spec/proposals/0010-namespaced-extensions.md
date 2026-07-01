# GSP-0010: Namespaced `extensions`

- **Status:** Proposed — targets a future spec MINOR (additive).
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-62 (per the GOV-61 spec-evolution disposition, item 7b)
- **Affects:** `spec/vN/govschema.schema.json` (top-level and field
  `additionalProperties`), §3 principle 5, consumers

## Problem

A v0.1 document is **closed**: the meta-schema sets `additionalProperties: false`
at every level (§3 principle 5), so any member the spec does not define is
*rejected*. That strictness is deliberate and valuable: it catches typos and
keeps the format small. But it leaves **no sanctioned place** for a producer or
tool to attach experimental or vendor-specific data: an internal tracking id, a
provenance hint a particular pipeline needs, a field annotation a consumer wants
to trial before proposing it as a real member.

With no sanctioned bag, that pressure does not disappear: it produces **ad-hoc
forks** of the format (a private superset with extra keys), which fragments the
standard and defeats interoperability. Every mature schema language meets this
need with a reserved extension mechanism: JSON Schema's `x-`, OpenAPI's
`x-`/specification extensions, HTTP's `X-`-era custom headers. GovSchema should
provide the same pressure-relief valve **without** loosening its strictness
everywhere else.

## Sketch (non-normative)

Add a single reserved `extensions` member — at the document top level, and
optionally per-field — whose **keys are namespaced**:

```json
{
  "id": "us/dos/passport-renewal-ds82",
  "...": "...",
  "extensions": {
    "org.example.pipeline": { "ingestRunId": "2026-06-30-T0193" },
    "ai.hellogov.review":   { "confidence": 0.92 }
  },
  "fields": [
    {
      "name": "socialSecurityNumber",
      "label": "Social Security Number",
      "type": "string",
      "extensions": { "org.example.ui": { "mask": "###-##-####" } }
    }
  ]
}
```

### Namespacing rule

- Every key directly under `extensions` **MUST** be a **namespace identifier**,
  not a bare word. Proposed grammar: a reverse-DNS or dotted-prefix label
  matching `^[a-z0-9]+(\.[a-z0-9-]+)+$` (i.e. at least one dot), e.g.
  `org.example.pipeline`, `ai.hellogov.review`. This guarantees two independent
  extenders cannot collide on a key, mirroring the reconstructable-identity
  discipline of [GSP-0002](./0002-colon-gsid-external-identifier.md) (one owner
  per namespace, no ambiguity).
- The **value** under a namespace key is opaque to GovSchema (any JSON value).
- A consumer **MUST** ignore any namespace it does not recognise, and **MUST
  NOT** let an extension change the interpretation of any standard member.
  `extensions` is strictly *additional, non-authoritative* data. A document
  stripped of all `extensions` MUST remain a conforming document with unchanged
  meaning (lens: *spec precision over cleverness*).

### Interaction with `additionalProperties: false` (the crux)

This is the design point the disposition requires be pinned down exactly:

- The strict `additionalProperties: false` at the document level and field level
  **stays.** Unknown *siblings* of the spec's members remain rejected: `foo` at
  the top level is still an error. The only change is that `extensions` becomes a
  **known, explicitly-permitted member**, so strictness is *not* relaxed
  generally; exactly one well-named door is opened.
- *Inside* `extensions`, openness is scoped and still constrained: rather than a
  blanket `additionalProperties: true`, the meta-schema uses
  **`patternProperties`** keyed on the namespace grammar above, with
  `additionalProperties: false` so that a **non-namespaced** key (a bare `foo`)
  is *rejected*. Net effect: arbitrary namespaced data is allowed; un-namespaced
  data is not. Strictness is preserved at the boundary, not abandoned.

This keeps §3 principle 5 ("strict and small") intact everywhere except a single,
clearly-delimited, self-describing extension surface.

## Open questions

- **Scope.** Top-level only, or also per-field (and per-step)? Per-field is the
  more useful (UI hints, masks) but multiplies the surface. Recommend top-level +
  per-field; defer per-step unless asked.
- **Namespace form.** Reverse-DNS dotted label (above) vs. a registered short
  prefix vs. a URI. Reverse-DNS is familiar and needs no registry; recommended.
- **Graduation path.** Document the expectation that an extension which proves
  broadly useful is *promoted* to a real spec member via a GSP, and the namespaced
  form retired — so `extensions` is a proving ground, not a permanent parallel
  vocabulary.
- **Validation reach.** GovSchema validates only that keys are namespaced; it does
  not (and should not) validate extension *values*. Confirm that limit is
  acceptable.

## Decision requested

A future, scheduled work item; no decision required now. The namespacing rule and
the `additionalProperties` interaction above are the parts that need deliberate
sign-off, since once extenders ship keys the namespace grammar is load-bearing.
Acceptance into `spec/v0.2` is gated on CEO sign-off per
[GOVERNANCE.md](../../GOVERNANCE.md).
