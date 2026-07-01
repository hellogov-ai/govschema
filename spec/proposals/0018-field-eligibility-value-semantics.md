# GSP-0018: Field-level eligibility value semantics (`eligibleValues`)

- **Status:** Accepted — folded into `spec/v0.3`. CEO sign-off recorded
  2026-07-01 via [GOV-393](/GOV/issues/GOV-393) (accepted as written,
  including the `fieldRole: eligibility` co-presence constraint
  recommendation). Standards Reviewer soundness pass:
  [GOV-388](/GOV/issues/GOV-388), no blocking concerns.
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-386, surfaced by GOV-374 (the schema-driven agent interview
  demo, govschema-landing PR #99)
- **Affects:** `spec/v0.3/govschema.schema.json` (field model, §6.8/§6.9
  `fieldRole` neighbourhood); no change to `validation`, `classification`, or
  the `Condition` grammar

## Problem

GOV-386 raised two gaps found while building an agent that walks a
GovSchema document and answers eligibility questions:

1. **No field-level signal for which boolean value keeps an applicant
   eligible.** A document can mark a field as a gating question
   (`fieldRole: eligibility`, GSP-0014 §2) and an agent can type-check that
   the answer is a `boolean`, but nothing says *which* answer disqualifies.
   Confirmed by scanning every schema currently in the registry (40 schemas):
   zero boolean fields set any `validation` constraint today, and
   `us/dos/passport-renewal-ds82` carries six eligibility-role booleans
   (`passportLostOrStolen`, `passportIssuedWithin15Years`, ...) entirely as
   free-text `description`/`sourceRef` prose. The judgment "`true` here means
   ineligible" has to be hardcoded per field name by every consumer, which is
   exactly the kind of source-of-truth-only fact GovSchema exists to make
   structured (lens: *source-of-truth fidelity*).
2. **No field-level hint that a value is sensitive enough to warrant masking**
   in a human-facing summary (e.g. show an SSN as last-4-only).

This proposal addresses (1) with a new member and closes (2) with a
no-new-surface recommendation, since (2) already has a home.

## Part 1 — eligibility value semantics

### Why not reuse `validation.enum` (the issue's starting suggestion)

GOV-386 floated `"validation": {"enum": [false]}` as a stopgap, since
`nonFileValidation.enum` is already a generic, type-agnostic
`array of anything` (§6.3) and would accept this today with **zero
meta-schema change**.

Recommend against adopting this as the sanctioned convention. `validation`
answers "is this a well-formed, truthful value for this field" — it is
consulted before submission to catch malformed input. Eligibility is a
different question: "given a well-formed, truthful value, can this applicant
proceed via this pathway." An applicant whose passport genuinely *was* lost
or stolen must be able to truthfully answer `true`; that answer is valid
data, just a disqualifying one. Encoding eligibility as `validation.enum`
collapses the two, and a naive consumer built against the meta-schema alone
(not per-field tribal knowledge) would treat `true` as a schema violation
rather than a truthful, disqualifying answer — the opposite of what an
honest applicant needs reported back. This is the same category error the
spec has already deliberately avoided once: GSP-0014 §2 gave eligibility
questions a `fieldRole` precisely so labelling a field's *purpose* would
never have to piggyback on a member that governs its *validity* (lens:
*spec precision over cleverness* — an overloaded keyword is an ambiguous
one).

### Why not extend `fieldRole` itself

`fieldRole: eligibility` was deliberately specified as "purely a
presentation/grouping hint ... it changes no validation behavior" (§6.8).
Loading eligibility semantics onto it now would retroactively change what an
already-accepted, already-shipped member means. Keep `fieldRole` exactly as
accepted; add the new semantics as a separate, independent, optional member
next to it.

### Sketch (non-normative): `eligibleValues`

Add an OPTIONAL member, meaningful alongside `fieldRole: eligibility`: a
non-empty array of the field's own values that keep the applicant eligible
via this pathway. Any other well-formed, truthful value is still valid data
under `validation`/`type` — it just means this pathway does not continue.

```json
{
  "name": "passportLostOrStolen",
  "label": "Has your most recent passport ever been reported lost or stolen?",
  "type": "boolean",
  "required": true,
  "fieldRole": "eligibility",
  "eligibleValues": [false],
  "description": "If your most recent passport was reported lost or stolen, you cannot renew by mail with Form DS-82 and must apply in person."
}
```

Semantics:

- `eligibleValues` is an array (mirrors `validation.enum`'s shape, for
  familiarity — lens: *least surprise*) rather than a bare `eligibleValue`
  scalar, so a future non-boolean gating field (e.g. an enum-typed
  eligibility question with one disqualifying option among several) needs no
  shape change — array-from-day-one, same growth reasoning GSP-0006 used for
  `classification`'s cardinality question.
- It makes **no validation claim.** A value absent from `eligibleValues` MUST
  still be accepted as well-formed input if it satisfies `type`/`validation`
  — it only means the applicant cannot continue via *this* pathway with that
  answer. A consumer SHOULD surface this as an eligibility/routing outcome
  ("you may need to apply in person"), never as a data-validation error.
- OPTIONAL, and meaningful **only** alongside `fieldRole: eligibility`. A
  `data`-role field carrying `eligibleValues` is very likely an authoring
  mistake; recommend the meta-schema enforce this the same way it already
  enforces "`requiredWhen` present ⇒ static `required` MUST be false"
  (§6.7) — an `if eligibleValues present then fieldRole MUST be
  "eligibility"` constraint, not left to prose alone.
- Composes unchanged with everything already accepted: a field can carry
  `fieldRole: eligibility`, `eligibleValues`, and `visibleWhen`/`requiredWhen`
  (GSP-0013) simultaneously with no interaction between them.

### Relationship to `steps[].transitions` (GSP-0013) and maturity (GSP-0012)

For a document that already models `steps` with GSP-0013's `transitions`,
the same fact can already be expressed at the flow level today, with no new
member at all: `{"when": {"field": "passportLostOrStolen", "equals": true},
"to": null, "exitReason": "..."}`. That is a real, already-accepted
mechanism — but it exists only for documents that model flow, and the
**Agent-Ready Schema** maturity tier (GSP-0012) is exactly the tier that
requires "every real branch ... expressed as `steps[].transitions`." Almost
every schema in the registry predates `spec/v0.3` and does not reach that
tier: as of this writing exactly one schema,
`us/irs/employer-identification-number-ss4` (GOV-319, landed after this
proposal was first drafted), uses `fieldRole`/`steps[].transitions` at all.
`eligibleValues` is not a replacement for the flow-level
mechanism; it is a lighter, flow-independent field-level annotation usable
by schemas below Agent-Ready maturity (the entire registry today), and a
cheap, directly-on-the-field fact for a consumer that does not want to
reconstruct eligibility by walking the whole transition graph even once a
schema does have `steps`. A schema MAY carry both; they should not disagree,
but reconciling that is a validator lint, not a meta-schema constraint.

### Open questions

- **Enforcing field-value membership.** Should the meta-schema go further and
  require every entry of `eligibleValues` to be assignable to the field's
  own `type` (e.g. reject `"eligibleValues": ["nope"]` on a `boolean`
  field)? JSON Schema can express this per-`type` similarly to how
  `fileValidation`/`nonFileValidation` are already type-conditional (GSP-0007
  precedent). Recommend yes, scoped to `boolean` and `string`-with-`enum`
  fields only for v0.3; leave numeric/date range eligibility ("must be 18
  or older") to a future proposal rather than generalizing now (lens: *spec
  precision over cleverness*).
- **Naming.** `eligibleValues` (positive framing, "these keep you eligible")
  vs. `disqualifyingValues` (negative framing). Recommend the positive
  framing: most gating fields in the wild have exactly one eligible value
  out of two-or-more possible truthful answers, so naming the smaller,
  fixed set reads more naturally at the call site and matches how the DS-82
  registry schema's own `description` prose is already phrased ("passport
  never reported lost or stolen").
- **Multiple eligible values, single-disqualifying framing.** Should there
  also be a `disqualifyingValues` sibling for the (rarer) case where the
  disqualifying set is smaller than the eligible set? No concrete registry
  example motivates this today; revisit only if one appears rather than
  shipping both directions speculatively (lens: *spec precision over
  cleverness*).

## Part 2 — the masking/sensitivity hint: no new spec surface needed

GOV-386's second, smaller gap — a field-level hint that a value is
sensitive enough to warrant masking in a human-facing summary — is already
solved. GSP-0006 (`classification`, Accepted into `spec/v0.3`,
2026-07-01) added exactly this: an OPTIONAL, advisory, open-vocabulary
string on any field, with `sensitive-pii` and `financial` already in its
recommended starter vocabulary, explicitly scoped to drive "redaction,
masking, or access control" by a consuming application (§ Semantics). An SSN
field should already carry `"classification": "sensitive-pii"`, and a
summary-rendering consumer (like GOV-374's demo) can key its masking
decision off that member with no spec change at all.

Recommend **no new member** for this half of GOV-386. The actual gap is
adoption, not spec surface: of the 40 schemas currently in the registry,
**zero** set the `classification` field member anywhere (independently
verified by walking every `fields[]` entry in the registry, not just
grepping for the string — two schemas contain the word "classification" in
unrelated prose, which is not the same thing). None of the schemas in the
registry carrying an SSN- or passport-number-shaped field (e.g. DS-82) use
it yet. That is a
registry-authoring backlog item — going back and setting `classification` on
the fields GSP-0006's own problem statement named (SSN, passport number,
date of birth) — not a standards-evolution question, and does not need CEO
sign-off. Filing that backfill as ordinary two-way-door registry maintenance
work is a fitting follow-up, separate from this GSP.

## Decision — Accepted

The Standards Reviewer soundness pass ([GOV-388](/GOV/issues/GOV-388)) raised
no blocking concerns: the `eligibleValues` shape/semantics, the
`validation.enum`-rejection reasoning, and the "`classification` already
suffices for masking" conclusion were all confirmed sound. It did flag two
stale registry-adoption counts in the doc (corrected above, count only,
no design change): `classification` adoption is 0/40, not 2/38, and
`fieldRole`/`steps[].transitions` now has one real registry user
(`us/irs/employer-identification-number-ss4`, [GOV-319](/GOV/issues/GOV-319),
landed after this proposal was first drafted).

The CEO accepted GSP-0018 as written on 2026-07-01, via
[GOV-393](/GOV/issues/GOV-393):

1. **`eligibleValues`** accepted as sketched (Part 1), including the
   meta-schema constraint recommendation (`eligibleValues` present ⇒
   `fieldRole` MUST be `"eligibility"`, mirroring the existing `requiredWhen`
   ⇒ `required: false` precedent at §6.7). The rejection of reusing
   `validation.enum` is explicitly affirmed as correct and load-bearing.
2. **No new member for the masking/sensitivity ask** (Part 2) — agreed
   `classification` (GSP-0006) already covers it. The CEO directed that the
   0/40 registry-adoption gap be tracked as a separate, ordinary two-way-door
   registry-authoring issue rather than folded into this GSP.

`eligibleValues` is folded into `spec/v0.3/govschema.schema.json` (§6.8
field-model properties + the `allOf` co-presence constraint) and
`spec/v0.3/SPEC.md` (new §6.9) in this same change, following the GOV-373
fold-in pattern. All 40 registry documents and the updated
`spec/v0.3/examples/agent-ready-demo.schema.json` continue to validate
against the meta-schema (`tools/validate.mjs` and `tools/validate-ajv.mjs`),
confirming no regression.

Not blocking GOV-374, which ships with its landing-site-local overlay
regardless of this proposal's outcome.
