# RFC 0003: GovSchema v0.3 — Agent-execution-readiness

- **Status:** Draft — for founder review. Not normative. No `spec/vN`, meta-schema,
  or registry file changes ship with this RFC.
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-302
- **Affects (if accepted, in follow-up issues):** a new `spec/v0.3` line, six new
  GSPs (0012–0017, reserved below), a new normative "consumer requirements"
  section, a new `conformance/` top-level directory, and the
  `us/irs/employer-identification-number-ss4` reference schema.

> This document is the single design RFC requested in GOV-302. It synthesizes
> the founder's eight discussion points into one coherent, additive extension of
> the standard. It proposes concrete shapes and a migration story; it does not
> decide anything. Each construct below is written up as a candidate GSP so the
> founder (routed via the Founding Engineer) can accept, trim, or reject areas
> independently — exactly as GSP-0001 through GSP-0011 already work.

---

## 0. Positioning

The founder's sharpened one-sentence goal, which this RFC treats as the frame
for everything below:

> *GovSchema is the trusted, versioned, machine-readable contract that lets AI
> agents understand, validate, and safely prepare government forms and
> workflows — without guessing from webpages, HTML, or PDFs. Open-source and
> independent: it describes and verifies government processes; it does not
> submit them.*

Every construct proposed here is additive to that contract, never a departure
from the existing boundary: GovSchema still does not fill out or submit forms
(`GOVERNANCE.md`), still makes no government-endorsement claim, and still keeps
the core (`spec/v0.1`) small and stable. §9 discusses where the positioning
language itself should land; that is a copy change, not a spec change, and is
listed as an open question rather than decided here.

---

## 1. Summary and synthesis approach

The founder's eight points fall into three kinds of change:

| Kind | Points | Mechanism |
|---|---|---|
| **New document constructs** (schema shape grows) | 2 (conditional logic), 4 (documents) | New optional members, folded into a new GSP each, targeting `spec/v0.3` |
| **Operationalizing what already exists** | 1 (maturity levels), 3 (verification trust layer) | Mostly new metadata + tooling around the existing `status`/`verification` model — small schema surface, larger tooling/process surface |
| **New non-schema artifacts and practice** | 5 (safety model), 6 (conformance fixtures), 7 (flagship), 8 (positioning) | A normative consumer-obligations section, a new `conformance/` repo directory, an implementation plan, a copy change |

The unifying design move underneath points 1–4 is a single reusable
**condition language** (§3), first sketched in GSP-0004 for step transitions
and extended here to field visibility/requiredness, document requirredness,
and cross-field checks. One condition grammar, four attachment points — this
is what removes the need for per-form custom agent logic (the explicit
non-goal-creep instruction in GOV-302), rather than inventing a bespoke rule
language per construct.

Every new member proposed below is **OPTIONAL** at every level. A `spec/v0.2`
document with none of them is already a conforming `spec/v0.3` document
(VERSIONING.md §2's additive-MINOR pattern, repeated for the third time). No
existing field, step, or top-level member changes meaning or becomes required.

### 1.1 New GSPs reserved by this RFC

| # | Title | Point(s) | Risk |
|---|---|---|---|
| GSP-0012 | Maturity levels (badge model) | 1 | Low — pure metadata + tooling |
| GSP-0013 | Extended conditional logic (supersedes GSP-0004's step-only sketch) | 2 | Medium — new field/document members, reuses GSP-0004's grammar |
| GSP-0014 | Documents as a first-class model | 4 | Medium — new top-level array, builds on GSP-0006/0007 |
| GSP-0015 | Verification as an operational trust layer | 3 | Low–medium — schema additions are small; the alerting/cadence tooling is the larger piece |
| GSP-0016 | Conformance fixtures (non-submitting) | 6 | Low — new repo directory, no schema-shape change |
| GSP-0017 | Agent conformance and safety boundary (normative) | 5 | High visibility, low schema-shape risk — first time GovSchema states a MUST on *consumer behavior*, not just document shape |

None of these are filed as `spec/proposals/*.md` yet. On founder sign-off
(§13), the Standards Engineer files each as its own GSP (mirroring GSP-0001–11)
so each gets its own accept/reject/hold decision, per `GOVERNANCE.md`'s
one-way-door process. GSP-0009 (composite/repeating values) is **deliberately
not required** by any of the above — see §11.

---

## 2. Point 1 — Schema maturity levels (GSP-0012)

### Problem

`status` (`draft`/`verified`/`deprecated`, SPEC §9) answers *"has this been
checked against the source?"* It says nothing about *"is this rich enough for
an agent to safely drive a real interaction?"* A flat, unverified,
single-field form and a fully-branching, richly-verified, browser-tested
process both currently look the same shape-wise: a JSON object with `fields`
and an optional `steps`. Agent developers need a declared, checkable answer to
*"how far along the execution-readiness path is this schema?"* before they
decide whether to build against it.

### Proposed tiers

| Tier | Criteria |
|---|---|
| **Structural Reference** | `fields[]` present with `type` + basic `validation`; exactly one `source` cited (§8 today). This is the floor every conforming document already meets. |
| **Verified Schema** | `status: verified` and `verification.lastVerifiedAt`/`nextReviewBy` current per the named practice (§9 today, unchanged). |
| **Agent-Ready Schema** | Verified Schema, **plus**: every real branch in the source process is expressed as `steps[].transitions` (§3 below), not left in prose; every real document/eligibility/payment/attestation requirement is expressed in `documents[]` (§5 below); every terminal/exit state the source defines is reachable via an explicit `to: null` transition (§3.4), not silently absent. |
| **Execution-Tested Schema** | Agent-Ready Schema, **plus**: a sibling `mapping.json` (GSP-0011, already accepted) exists and its own `verification` is current under `selector-probe-v1`; a `conformance/<id>/<version>/browser-flow.json` fixture (§7 below) exists and the non-submitting harness reaches its terminal "review, do not submit" state without error. |

### Shape

```json
"maturity": {
  "level": "agent-ready",
  "criteria": {
    "structuralReference": true,
    "verifiedSchema": true,
    "agentReadySchema": true,
    "executionTestedSchema": false
  },
  "method": "maturity-self-assessment-v1",
  "assertedBy": "GovSchema Engineering",
  "assertedAt": "2026-08-01"
}
```

- OPTIONAL top-level member. A document without `maturity` makes no claim
  either way — consumers fall back to inferring from `status` alone, exactly
  today's behavior. This keeps the member additive and low-stakes to skip.
- `level` is the **highest tier whose criteria are all true** — a derived
  value, not an independent input, so it cannot disagree with `criteria`
  (mirrors the `id`/path consistency discipline in SPEC §10 rule 1: one fact,
  asserted once, checked, not two facts that can drift apart).
- Same **asserted-then-checked pattern as `verification`** (§9 precedent): a
  producer declares `maturity` at authoring time; a future
  `tools/validate-maturity.mjs` recomputes `criteria` from the document's
  actual shape (does it have `transitions`? a sibling `mapping.json` with
  current verification? a passing conformance fixture?) and CI flags a
  mismatch, exactly as re-verification today can move `status` back toward
  `draft`. No new trust primitive — the same shape reused for a new axis.
- `maturity` is **orthogonal to `status`**: a `draft` schema can still be
  richly modeled (`agent-ready` shape, just not yet source-confirmed); a
  `verified` schema can still be flat (`structural-reference`/`verified`
  shape with no branching to model). Consumers needing both signals read
  both; neither subsumes the other.

---

## 3. Point 2 — Conditional logic model (GSP-0013, extends GSP-0004)

### Problem

Real forms are not flat. GSP-0004 already proposed branching `steps[].transitions`
with a closed `when` grammar for step-to-step routing (the DS-82 eligibility
gate is its motivating example) but left it there. GOV-302 asks for the same
kind of declarative logic at four more points: field visibility/requiredness,
document requiredness, cross-field validation, and (lowest priority) computed
fields and mutual exclusivity. Six sub-asks, one grammar.

### 3.1 The shared `Condition` type

Unchanged from GSP-0004's sketch, reused everywhere below:

```json
{ "any": [
  { "field": "passportLostOrStolen", "equals": true },
  { "field": "passportUndamaged", "equals": false }
] }
```

- Leaf comparisons: `equals` / `notEquals` / `in` / `greaterThan` / `lessThan`,
  each `{ "field": <name>, "<op>": <value> }`.
- Boolean composition: `all` / `any` / `not`, each taking one or more nested
  `Condition`s.
- No executable code, no string interpolation, no side effects — a small,
  closed, statically-analyzable grammar an agent evaluates with a ~50-line
  interpreter, not a JS `eval`.
- References `field` `name`s only (flat fields, per the current v0.1/v0.2
  model) — see §11 on why this RFC does not depend on GSP-0009 nesting.

### 3.2 Field-level visibility and requiredness

```json
{
  "name": "llcMemberCount",
  "label": "Number of LLC members",
  "type": "integer",
  "visibleWhen": { "field": "isLLC", "equals": true },
  "requiredWhen": { "field": "isLLC", "equals": true }
}
```

- Both OPTIONAL. Absent `visibleWhen` → always visible (today's behavior).
  Absent `requiredWhen` → the existing static `required` boolean governs
  (unchanged); when both are present, `requiredWhen` is the effective rule and
  static `required` MUST be `false` or absent (no conflicting dual claim).
- This directly replaces the current workaround of saying "required only
  when X" in a field's `description` — visible today in nearly every
  conditional line of the EIN/SS-4 reference schema (e.g. `llcMemberCount`,
  `entityTypeOtherSpecify`, `previousEIN`) — with a machine-checkable rule.

### 3.3 Cross-field validation

For rules that are not "is field X required" but "do fields X and Y agree":

```json
"crossFieldValidation": [
  {
    "id": "employmentCountsRequireHighestCount",
    "when": { "field": "highestExpectedEmployees", "equals": 0 },
    "requireAbsent": ["expectedAgriculturalEmployees", "expectedHouseholdEmployees"]
  },
  {
    "id": "endNotBeforeStart",
    "compare": { "field": "endDate", "operator": "greaterThanOrEqual", "compareTo": "startDate" }
  }
]
```

- New top-level OPTIONAL array. Each rule is either a `when` + `requireAbsent`/
  `requirePresent` shape (built from the same `Condition` type) or a `compare`
  shape (`operator` one of `equals`/`notEquals`/`greaterThan`/`greaterThanOrEqual`/
  `lessThan`/`lessThanOrEqual`, comparing two named fields directly — the one
  new primitive this area needs, since `Condition` alone only compares a field
  to a literal).
- Deliberately **not** a general expression language — two closed shapes, not
  one. Keeps the "declarative, serializable, evaluable without per-form code"
  property GOV-302 asked for.

### 3.4 Terminal / exit states (resolving GSP-0004's open question)

GSP-0004 left the "how does a flow end" sentinel undecided. Recommend
resolving it now, since documents (§5) also need to name failure/exit states:

```json
"transitions": [
  { "to": null, "exitReason": "route-to-in-person-application",
    "when": { "field": "passportLostOrStolen", "equals": true } },
  { "to": "applicant_details" }
]
```

- `to: null` means "end of flow here" — unambiguous, no magic string, no
  collision risk with a real step `id`.
- `exitReason` OPTIONAL free-text/slug explaining *why* the flow ended here
  (e.g. routed to a different channel, disqualified, complete). This is the
  machine-readable form of what today lives only in prose ("routes an
  applicant who fails any condition... away from the by-mail form").
- Transitions are evaluated top-to-bottom, first matching `when` wins, a
  `when`-less transition is an unconditional fallthrough and SHOULD be last
  (unchanged from GSP-0004).

### 3.5 Mutually exclusive choices

```json
"exclusivityGroups": [
  { "id": "eitherFileTypeElection", "fields": ["file944AnnuallyElection", "quarterlyFilingConfirmed"] }
]
```

- New top-level OPTIONAL array: at most one field in each named group may be
  set/true at once. Kept document-level (one array) rather than duplicated
  per field, since exclusivity is a property of the *group*, not any one
  member of it.

### 3.6 Calculated / derived fields — recommend deferring

GOV-302 asks for calculated fields too. Recommendation: **do not ship this in
v0.3.** Almost none of the eleven reference schemas authored so far need a
derived value (most forms ask the applicant to state a fact, not to compute
one), and a real calculation vocabulary (date-diff, currency arithmetic,
concatenation) is exactly the kind of surface that grows the "expression
language" GOV-302 explicitly warns against over-designing. If a concrete need
appears (e.g. an OCR-extracted document populating a field, §5.4), model that
narrowly as `documents[].ocr.populatesFields` rather than a general `computed`
member. Filed as a GSP-0013 open question, not a shipped member — see §13.

---

## 4. Point 3 — Verification as the operational trust layer (GSP-0015)

### Problem

`verification` (SPEC §9) today is one flat record for the *whole document*: a
method, a date, who did it, when it's next due. GOV-302 asks for this to
become operational: know provenance down to the field, detect source drift
automatically, and make the "what changed" history public.

### 4.1 Source snapshot / hash

```json
"source": {
  "url": "https://www.irs.gov/forms-pubs/about-form-ss-4",
  "retrievedAt": "2026-07-01",
  "documentRef": "Form SS-4 (Rev. December 2025)",
  "contentHash": "sha256:9f2c...b71a"
}
```

- `contentHash` — OPTIONAL. A hash of the retrieved source content (the PDF
  bytes, or a canonicalized text extraction) at `retrievedAt`. Lets a future
  monitor (§4.3) detect *any* byte-level change without re-reading the whole
  document, and lets a reviewer confirm they're diffing against exactly what
  the current schema was authored from.
- Deliberately a hash, not a stored snapshot — GovSchema does not want to
  become a mirror/archive of government content (scope, storage, and
  copyright considerations); the hash is enough to detect drift and to prove,
  after the fact, that a given retrieval was the one a schema version cites.

### 4.2 Field-level verification override (not a per-field record by default)

A per-field `verification` record for *every* field, as GOV-302's literal
wording suggests, would 4x-8x the size of every schema for a signal that is
usually uniform (the whole document was reviewed together, on one date, by
one practice). Recommend instead: the document-level `verification` record is
the default for all fields, with an OPTIONAL per-field **override** only when
a field's verification genuinely diverges (e.g. a field added between full
reviews, or one flagged as unconfirmed during a partial re-check):

```json
{
  "name": "llcMemberCount",
  "...": "...",
  "verification": {
    "status": "unverified",
    "notes": "Added after the 2026-07-01 full review; not yet independently confirmed against the source."
  }
}
```

- OPTIONAL, sparse-by-design. Absent on a field ⇒ inherits the document-level
  record in full. `status` here is a narrower vocabulary (`verified`/
  `unverified`/`stale`) than the document `status` enum, since a field can't
  independently be "deprecated."

### 4.3 Diff reports / changelog

Two related, both new, both OPTIONAL:

- **`registry/<id>/CHANGELOG.md`** (one per process, not per version) — a
  human-readable, append-only log: "1.1.0 (2026-08-01): added
  `llcMemberCount` requiredness rule; no field removed." Generated from
  `VERSIONING.md`'s existing MAJOR/MINOR/PATCH classification, so authoring a
  new version and writing its changelog entry is one act, not two.
- **`registry/<id>/<version>/changes.json`** — the same fact, machine-readable,
  diffing against the immediately prior version: `{ "added": [...], "removed":
  [...], "changed": [...] }` field-name lists. Lets a consumer that pinned a
  prior version answer "what exactly changed if I upgrade" without fetching
  and diffing two full documents itself.

### 4.4 Automated source-change alerts and risk-tiered cadence — tooling, flagged for the Founding Engineer

Two of GOV-302's asks here are **tooling/infra, not schema shape**, and are
explicitly out of scope for this RFC to build (per the issue's constraint —
coordinate, don't build):

- A scheduled job (e.g. a GitHub Action cron) that re-fetches each `source.url`,
  recomputes `contentHash` (§4.1), and opens an issue when it no longer
  matches — the mechanical trigger for "this schema needs re-review sooner
  than its `nextReviewBy`."
- **Risk-tiered cadence**: `practices/manual-source-review-v1.md` today fixes
  one default (6 months). Recommend a small, closed `riskTier` vocabulary
  (`high`/`standard`/`low`) on the practice, each with its own default
  `nextReviewBy` offset (e.g. high — a seasonal/fee-bearing form — 60 days;
  standard — 6 months, today's default; low — a rarely-changing registration
  — 12 months), set via a new OPTIONAL `verification.riskTier` member. This is
  a small schema addition; the monitor is the larger build. **This is the one
  area of the RFC that needs an explicit Founding Engineer conversation about
  tooling/infra ownership before a GSP is filed** — flagged again in §13.

---

## 5. Point 4 — Documents as a first-class model (GSP-0014)

### Problem

Today's only document primitive is `type: file` on a `fields[]` entry — one
upload, described by `description` prose, with (per GSP-0007, not yet
accepted) at most `maxBytes`/`mediaTypes`. GOV-302 asks for a much richer
distinction: data fields vs. eligibility questions vs. identity documents vs.
supporting evidence vs. payment requirements vs. signatures/attestations —
categories that are not all files (a payment obligation and a sworn
attestation are not uploads) and that carry metadata (whose document is it,
how fresh must it be, who issued it, can OCR satisfy it) that has nowhere to
live today.

### Design choice: a new top-level `documents[]` array, not richer `file` fields

Recommend a **separate, OPTIONAL top-level array**, sibling to `fields`,
rather than overloading `type: file`:

- Keeps `fields[]` doing one job (a value the applicant supplies, of a scalar
  type) and `documents[]` doing another (a requirement the applicant must
  *satisfy*, which may or may not correspond to a single scalar value).
- Sidesteps a dependency on GSP-0009 (nested/array fields, the highest-risk,
  CEO-flagged proposal in flight) — a document requirement is a fixed,
  enumerable list per form, not an unbounded repeating structure, so it does
  not need array-of-object field support to exist.
- Composes cleanly with GSP-0006 (`classification`) and GSP-0007
  (`maxBytes`/`mediaTypes`), both of which this RFC recommends folding into
  `documents[].constraints` rather than leaving them field-only.

### Shape

```json
"documents": [
  {
    "id": "priorPassport",
    "label": "Most recent U.S. passport",
    "category": "identity-document",
    "required": true,
    "belongsTo": "applicant",
    "acceptedTypes": ["us-passport-book", "us-passport-card"],
    "freshness": { "issuedWithin": null },
    "issuingAuthority": "U.S. Department of State",
    "handling": "mail-original-return-requested",
    "sourceRef": "DS-82, prior passport submission instructions"
  },
  {
    "id": "recentPhoto",
    "label": "Passport photo",
    "category": "supporting-evidence",
    "required": true,
    "constraints": { "mediaTypes": ["image/jpeg"], "maxBytes": 5242880 },
    "ocr": { "extractable": false }
  },
  {
    "id": "applicationFee",
    "category": "payment",
    "required": true,
    "amount": { "currency": "USD", "value": 130 },
    "methods": ["check", "money-order"]
  },
  {
    "id": "applicantSignature",
    "category": "attestation",
    "required": true,
    "statement": "I certify under penalties of perjury that this application is true, correct, and complete."
  }
]
```

- `category` — REQUIRED, closed vocabulary: `identity-document` /
  `supporting-evidence` / `payment` / `attestation`. ("Data field" and
  "eligibility question" are the two categories GOV-302 asks to distinguish
  that are **not** documents — see below.)
- `required` — REQUIRED boolean; `requiredWhen` — OPTIONAL, same `Condition`
  type as §3.2, for a document needed only under some condition (e.g. a birth
  certificate required only when no other identity document is available).
- `belongsTo` — OPTIONAL, one of `applicant`/`dependent`/`responsible-party`/
  `other` — whom the document is about, distinct from who submits it.
- `acceptedTypes` — OPTIONAL array of source-defined document-type slugs
  (open vocabulary, per-schema).
- `freshness` — OPTIONAL; `issuedWithin` an ISO 8601 duration (e.g. `"P6M"`)
  when the source requires a document not be too old, `null`/absent when no
  freshness requirement exists.
- `issuingAuthority` — OPTIONAL free text.
- `handling` — OPTIONAL free-text/slug for source-specific instructions about
  the *physical* document (e.g. "mail original, will be returned" for a prior
  passport) — descriptive only, never an instruction to act (same boundary as
  GSP-0011 §13.4).
- `constraints` — OPTIONAL, reuses GSP-0007's `maxBytes`/`mediaTypes` shape,
  scoped here to document requirements that are actual file uploads
  (`identity-document`/`supporting-evidence`), never `payment`/`attestation`.
- `ocr` — OPTIONAL `{ extractable: boolean, populatesFields: [<field name>] }`
  — whether OCR against this document could satisfy named `fields[]` entries
  (e.g. a prior passport's number/issue date), and which ones. Advisory only:
  a consumer MAY use OCR to prefill `populatesFields`; the schema makes no
  claim about OCR accuracy or that it substitutes for user confirmation
  (ties directly into the safety model, §6).
- `amount`/`methods` — OPTIONAL, `payment`-category only.
- `statement` — OPTIONAL, `attestation`-category only — the exact text the
  applicant is certifying, verbatim from the source.
- `sourceRef` — OPTIONAL, same meaning as `fields[].sourceRef` today.

### Data fields vs. eligibility questions

The other half of GOV-302's distinction (data vs. eligibility, not a document
category) is a lighter touch: an OPTIONAL `fieldRole` on `fields[]` entries,
closed vocabulary `data` (default) / `eligibility`:

```json
{ "name": "passportLostOrStolen", "label": "Was your most recent passport lost, stolen, or damaged?",
  "type": "boolean", "fieldRole": "eligibility" }
```

Purely a hint for UI/agent presentation (e.g. "answer these gating questions
first") — it changes no validation behavior and composes with `visibleWhen`/
`requiredWhen` (§3.2) unchanged.

---

## 6. Point 5 — Agent safety model (GSP-0017)

### Problem

GovSchema's non-submission boundary exists today (`GOVERNANCE.md`, and
narrowly for `mapping.json` in GSP-0011 §13.4), but it is stated per-artifact,
not as one normative statement of what a **conforming consumer** — any agent
built on any GovSchema document — must and must not do. GOV-302 asks for this
to be explicit and structural, not just prose intent.

### Proposal: a new normative SPEC section, generalized from GSP-0011 §13.4

Add **SPEC §14, "Agent conformance and safety boundary"**, applying to every
GovSchema document (not just `mapping.json`), with the following MUST/MUST NOT
set — mostly restating existing boundary language, made binding on *consumer
behavior* for the first time:

1. A GovSchema document **MUST NOT** be treated by a conforming consumer as
   authorization to submit anything to a government system. GovSchema
   describes; it does not authorize.
2. A conforming agent **MUST** obtain explicit, informed user confirmation
   before any final submission action, regardless of how complete or
   validated the collected data is.
3. A conforming agent **MUST** apply stricter handling — at minimum,
   explicit confirmation before use, and no third-party transmission without
   consent — to any field or document carrying a `classification` value
   (GSP-0006) or a `documents[].category` of `identity-document`.
4. A conforming agent **MUST** surface `status` and the `verification`
   record (or, once GSP-0012 lands, `maturity`) to the user, or otherwise
   account for it in its own decision-making, before relying on a document to
   collect or validate data. It **MUST NOT** silently treat a `draft` or
   `deprecated` document, or one whose `verification.nextReviewBy` has
   passed, as current.
5. A conforming agent **MUST NOT** represent a GovSchema document, or any
   output derived from it, as government-issued, government-endorsed, or
   legally authoritative.
6. These requirements apply uniformly across every consumption layer
   (`docs/agent-consumption.md`'s raw-fetch, `llms.txt`, MCP server, and Skill
   layers) — none of them is exempt because it's "just a convenience
   wrapper."

A companion, non-normative `docs/agent-safety-model.md` restates the same six
points in the plain-language style of `docs/agent-consumption.md`, for the
audience that will not read SPEC.md directly.

**Why this needs explicit founder attention** (flagged in §13): every prior
GSP constrains what a conforming *document* looks like. This is the first
proposal that puts a MUST on conforming *consumer behavior* — a real, if
modest, expansion of what "GovSchema conformance" means, and worth a
deliberate yes rather than folding in quietly alongside the schema-shape
GSPs.

---

## 7. Point 6 — Conformance fixtures / non-submitting test suite (GSP-0016)

### Problem

Nothing today lets an implementer check "does my agent's field-collection
logic behave the way the standard expects" without hand-rolling test cases
per schema. GOV-302 asks for a fixture suite that proves out agent behavior
**without GovSchema becoming the automation layer** — fixtures that stop
before submission, by construction.

### Proposed structure

```
conformance/
  README.md
  <id>/<version>/
    payloads/
      valid-complete.json          # a fully valid, complete submission payload
      invalid-missing-required.json
      invalid-conditional-violation.json   # violates a requiredWhen/crossFieldValidation rule
    profiles/
      complete-applicant.json      # a fake user profile with every answer
      partial-applicant.json       # a fake profile with gaps
    expected/
      missing-fields-partial-applicant.json   # what a conforming agent should still ask for, given partial-applicant.json
    browser-flow.json              # a step skeleton (built on mapping.json locators, §2's Execution-Tested tier)
```

- **`payloads/`** — sample JSON documents an agent's local validator should
  accept or reject, keyed to specific rules (a plain missing-required case
  and a conditional-rule case are deliberately separate fixtures, since the
  latter is the new thing v0.3 adds).
- **`profiles/`** + **`expected/`** — given a fake, partial user profile, the
  exact set of fields/documents a conforming agent MUST still prompt for.
  This is the direct, checkable expression of "an agent collects only missing
  fields" (the flagship's central behavior, §8).
- **`browser-flow.json`** — an ordered list of `{ stepId, action:
  "navigate"|"fill"|"read" }` entries referencing `mapping.json` locators,
  terminating in a **mandatory sentinel** `{ "action": "stop-before-submit" }`
  — the fixture format itself has no vocabulary for a submit action, so a
  producer cannot author one even by mistake (same structural-boundary
  technique GSP-0011 §13.4 uses for `mapping.json`).
- A `tools/conformance-runner.mjs` (future work, not built in this RFC) would
  execute these against a consumer implementation and report pass/fail —
  itself read-only/non-submitting, since the fixtures it runs are.

This directory is new but requires **no schema-shape change**: it is data
*about* a schema version, sibling to `registry/`, not inside it.

---

## 8. Point 7 — Flagship: EIN/SS-4 execution-readiness plan

`us/irs/employer-identification-number-ss4` is the natural flagship: it
already has the deepest conditional-requirement prose of any reference
schema (nearly every field's `description` today reads "required only
when..."), linear `steps`, no file uploads (a useful contrast case — not every
schema needs `documents[]` to reach Agent-Ready), and a real eligibility gate
(the IRS online EIN assistant's US-residency + SSN/ITIN-only eligibility,
currently only in `description` and `verification.notes`).

Planned work, sequenced, once GSP-0012–0017 land in `spec/v0.3` (not started
in this RFC):

1. **Conditional logic pass.** Convert every "required only when..."
   `description` into a real `requiredWhen` (§3.2) — `llcMemberCount`,
   `llcOrganizedInUS`, the `entityType`-branch fields, the
   `reasonForApplying`-branch fields, the employee-count branch. Express the
   online-vs-fax/mail/phone eligibility gate as a real `transitions` branch
   (§3.4) with `exitReason` values naming the resulting channel.
2. **Documents pass.** Model the signature block (`applicantNameAndTitle`
   today a plain field) as a `documents[]` `attestation` entry with the exact
   perjury statement from the form. No `payment`/`identity-document` entries
   apply to SS-4 — a deliberate demonstration that `documents[]` is optional
   per category, not a forced checklist.
3. **Maturity declaration.** Ship `maturity.level: "agent-ready"` once 1–2
   land and `status` is genuinely `verified` (today it is `draft`, per
   `VERIFICATION.md` — that re-verification is separate, ordinary work, not
   part of this RFC).
4. **Execution-tested path.** Author a `mapping.json` for the IRS EIN online
   assistant pages, verify it under `selector-probe-v1`, and write a
   `conformance/us/irs/employer-identification-number-ss4/1.x.x/browser-flow.json`
   that walks the online assistant's screens and stops at its final review
   screen — never reaching (and structurally unable to reach) a submit
   action.
5. **Human-reviewable packet demo.** A conformance fixture producing a
   plain-text/JSON "application packet": collected values, each cited back to
   its `sourceRef` (Form SS-4 line number), the eligibility-gate outcome and
   why, and a top banner reading "DRAFT — NOT SUBMITTED — review with a human
   before proceeding" — the concrete, demoable expression of the safety
   model's confirmation requirement (§6, point 2).

This single schema, once complete, exercises every one of GSP-0012–0017 at
once — the reason it is the flagship rather than a from-scratch example.

---

## 9. Point 8 — Positioning

The one-sentence goal in §0 is a copy change, not a spec change, and touches
surfaces this role does not own outright: `README.md`'s tagline,
`site/content/site.json`'s mission statement (site — Designer/Founding
Engineer territory), `llms.txt`'s header, and SPEC §1.1's "Purpose"
paragraph. Recommend, once the exact wording is confirmed (§13, since a
public-facing positioning statement is worth the founder's explicit sign-off
on the literal sentence, not just the direction):

- Fold it into SPEC §1.1 directly (Standards Engineer, ordinary two-way-door
  editorial PR).
- Hand the README/`llms.txt`/site copy changes to the Founding Engineer to
  route to the Designer, since the site's presentation of this sentence is
  outside this role's remit (per this role's collaboration boundary).

No independence/non-submission language changes: the sentence in §0 restates,
rather than loosens, the existing boundary ("it does not submit them" mirrors
`GOVERNANCE.md` verbatim).

---

## 10. Migration and versioning story

- Ships as **`spec/v0.3`**, a new sibling directory per `VERSIONING.md` §2 —
  same pattern as the v0.1 → v0.2 edition-axis addition (GSP-0005). Every
  conforming `spec/v0.2` document remains a conforming `spec/v0.3` document
  unchanged; none of `maturity`, `documents`, `crossFieldValidation`,
  `exclusivityGroups`, `visibleWhen`, `requiredWhen`, `fieldRole`,
  `contentHash`, per-field `verification`, or `transitions` are required by
  anything.
- Meta-schema changes are additive-only: new optional top-level members
  (`maturity`, `documents`, `crossFieldValidation`, `exclusivityGroups`), new
  optional field members (`visibleWhen`, `requiredWhen`, `fieldRole`, a
  field-level `verification` override), new optional `source.contentHash`,
  and `steps[].transitions` alongside (never replacing) `next` — a step MAY
  carry `next` OR `transitions`, never both, so every v0.2 step with `next`
  keeps its exact meaning.
- New non-schema artifacts: `registry/<id>/CHANGELOG.md`,
  `registry/<id>/<version>/changes.json`, and the `conformance/` top-level
  directory. None of these affect whether a sibling `schema.json` conforms —
  same "absence has no bearing" rule GSP-0011 already established for
  `mapping.json` (SPEC §13.5), generalized here to every new companion
  artifact.
- New/extended practices: `maturity-self-assessment-v1` (new),
  `manual-source-review-v1` gains an optional `riskTier`-keyed cadence table
  (extended, not replaced), `selector-probe-v1` (existing, GSP-0011) is reused
  unchanged for the Execution-Tested tier.
- Each of GSP-0012–0017 is filed and decided **independently** on founder
  sign-off — accepting the direction of this RFC does not commit to accepting
  every sub-part; §13's options let the founder trim.

---

## 11. Relationship to existing GSPs — and what this RFC deliberately does not pull in

| GSP | Status today | This RFC's treatment |
|---|---|---|
| 0001 Document-model reconciliation | Accepted | Unaffected — foundational, unchanged. |
| 0002 Colon GSID | Proposed (deferred) | Unaffected, still deferred. |
| 0003 Labelled enum options | Proposed (v0.2) | Unaffected; independent, small, can land whenever. |
| 0004 Conditional flow | Proposed (v0.2) | **Superseded/extended by GSP-0013** (§3) — the step-transition sketch is unchanged; §3 adds the field/document/cross-field attachment points GSP-0004 didn't cover, and resolves its open terminal-sentinel question (§3.4). |
| 0005 Edition axis | Accepted, v0.2 | Unaffected. |
| 0006 Sensitivity classification | Proposed (v0.2 candidate) | **Pulled forward, needed by GSP-0017** (§6, point 3) and by `documents[].category: identity-document`. Recommend accepting alongside this package rather than leaving it stranded. |
| 0007 File field constraints | Proposed (v0.2 candidate) | **Folded into GSP-0014**'s `documents[].constraints` (§5) as the shape for file-upload limits; still usable standalone on plain `type: file` fields too. |
| 0008 `datetime` scalar | Proposed (v0.2 candidate) | Unaffected; independent. |
| 0009 Composite & repeating values | Proposed (v0.2 candidate), CEO-flagged one-way-door | **Deliberately not required.** `documents[]` is a new top-level array specifically so it does not need array-of-object field support (§5); conditions reference only flat field names (§3.1). Nothing in this RFC forces the highest-risk proposal in flight to be decided alongside it. |
| 0010 Namespaced extensions | Proposed (v0.2 candidate) | Unaffected as a mechanism; not used as a staging ground here since GSP-0012–0017 are proposed as real normative members directly (see §13 open question on whether to pilot via `extensions` first instead). |
| 0011 Field-to-page-element mapping | **Accepted** (2026-07-01) | Load-bearing for the Execution-Tested tier (§2) and the flagship's step 4 (§8) — already unblocked, no new decision needed. |

---

## 12. Recommended sequencing

1. **GSP-0013** (conditional logic) first — every later construct references
   its `Condition` type.
2. **GSP-0006** (sensitivity) and **GSP-0007** (file constraints) alongside
   it, since **GSP-0014** (documents) depends on both.
3. **GSP-0014** (documents).
4. **GSP-0012** (maturity levels) — needs 1–3 in place to have criteria to
   measure against.
5. **GSP-0017** (safety model) — can proceed in parallel with 1–4; it is
   prose plus a small SPEC section, not schema shape, but references
   `classification` (GSP-0006) and `maturity` (GSP-0012) so should land after
   those exist.
6. **GSP-0016** (conformance fixtures) — depends on 1, 3, and the already-
   accepted GSP-0011 to be meaningful; can be scaffolded in parallel with 1–5.
7. **Flagship (§8)** — depends on 1–4 landing in `spec/v0.3`; exercises all
   of them together.
8. **Positioning (§9)** — independent, proceeds once the exact sentence is
   confirmed (§13); routed to the Founding Engineer/Designer for site
   surfaces.

---

## 13. Open questions for founder

1. **Package or à la carte?** Approve the whole GSP-0012–0017 package for
   drafting, or trim specific areas now (e.g. defer GSP-0015's alerting
   tooling, or GSP-0017's normative-vs-advisory framing — see Q5)?
2. **Documents model shape (§5).** Confirm the separate top-level
   `documents[]` array (recommended, avoids any GSP-0009 dependency) over a
   richer `type: file` field.
3. **Calculated/derived fields (§3.6).** This RFC recommends **not** shipping
   these in v0.3 at all (no concrete demand yet, real over-design risk).
   Confirm, or name a specific form that needs it.
4. **Terminal-flow sentinel (§3.4).** Confirm `to: null` + `exitReason`
   (recommended) over GSP-0004's original `"__end__"` magic-string sketch.
5. **Safety model bindingness (§6).** Confirm the SPEC §14 approach —
   normative MUSTs on *consumer behavior*, a first for GovSchema — versus a
   purely advisory `docs/agent-safety-model.md` with no conformance teeth.
   Recommend normative (it is the difference between a real safety property
   and a suggestion), but this is the item most worth an explicit yes given
   it expands what "conformance" covers.
6. **GSP numbering (0012–0017) and sequencing (§12)** — confirm before the
   Standards Engineer files each as its own `spec/proposals/*.md`.
7. **Exact positioning sentence (§0, §9).** Confirm the verbatim wording
   before it propagates into `README.md`, `llms.txt`, `site/content/site.json`,
   and SPEC §1.1.
8. **Source-change monitoring tooling (§4.4).** This is real infrastructure
   (a scheduled job, an issue-filing bot) beyond a schema-shape change.
   Confirm appetite/ownership (Founding Engineer) now, or treat it as a later
   phase once GSP-0015's schema-side additions (`contentHash`, `riskTier`,
   changelog) ship on their own.

---

## 14. Next steps if approved

Once the founder responds (in full, partially, or with edits) via the
decision interaction on GOV-302:

1. File each accepted GSP (0012–0017, per the founder's trims) under
   `spec/proposals/`, in the order in §12, each its own PR + review-gate
   (ordinary two-way-door PR review — the *filing* of a proposal is not
   itself the one-way-door act; *accepting* a GSP into `spec/vN` is, per
   `GOVERNANCE.md`, and follows the individual CEO sign-off flow already used
   for GSP-0005/0011).
2. Open one child issue per GSP for drafting, plus one for the EIN flagship
   work breakdown (§8), one for `conformance/` scaffolding (§7), and one for
   the positioning copy change (§9), routed to the Founding
   Engineer/Designer.
3. This RFC document itself stays in `docs/rfc/` as the historical record of
   the synthesis, cross-referenced from each resulting GSP (mirroring how
   GSP-0001 records the reconciliation history it resolved).
