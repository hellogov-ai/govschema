# GSP-0004: Conditional flow (branching transitions)

- **Status:** Superseded by [GSP-0013](./0013-extended-conditional-logic.md)
  (2026-07-01). This document's `steps[].transitions` sketch is carried
  forward unchanged into GSP-0013 §1/§4, which also resolves the open
  terminal-sentinel question below and extends the same `Condition` grammar
  to fields, cross-field validation, and documents. Kept as the historical
  record of the original ask; GSP-0013 is the proposal that goes forward for
  acceptance.
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-14 (carry-over from [GSP-0001](./0001-document-model-reconciliation.md))
- **Affects:** `spec/vN/govschema.schema.json` (`steps`/flow model), `tools/`, consumers

## Problem

The v0.1 flow model (`steps`) is **linear**: each step names at most one successor
via `next`. Real government processes routinely branch. The motivating example is
the US passport DS-82 reference schema
(`registry/us/dos/passport-renewal-ds82`): an *eligibility gate* routes an applicant
who fails any condition (passport lost/stolen, issued >15 years ago, issued before
age 16, damaged, undocumentable name change) away from the by-mail form to an
in-person path. v0.1 cannot represent this; the routing rule currently lives only
in field `description`s and the document's `VERIFICATION.md`, which is a loss of
machine-readable fidelity.

## Sketch (non-normative)

Add conditional `transitions` to the step model, with a small, closed,
side-effect-free condition language (no executable code):

```json
"transitions": [
  { "to": "apply_in_person", "when": { "any": [
      { "field": "passportLostOrStolen", "equals": true },
      { "field": "passportUndamaged", "equals": false }
  ] } },
  { "to": "applicant_details" }
]
```

- Transitions evaluated top-to-bottom; first whose `when` holds is taken; a
  `when`-less transition is an unconditional fallthrough (SHOULD be last).
- Conditions: comparison (`equals`/`notEquals`/`in`/`greaterThan`/`lessThan`) and
  boolean composition (`all`/`any`/`not`).
- A terminal sentinel (e.g. `"__end__"`) for `to`.
- Reference integrity + "no unconditional cycle" become §10 normative rules.

This is a backward-compatible addition: a document with no `transitions` keeps
v0.1 linear semantics. Recommended as the **first** additive after v0.1.

## Open questions

- Sentinel value for "end of flow" vs. an explicit terminal-step marker.
- How rich the condition language should be (keep minimal vs. add string/arithmetic
  operators) — see the v0.1 SPEC §12 note.
- Interaction with `validation` (can a condition reference a value the validator has
  not yet checked?).

## Decision requested

A future, scheduled work item; no decision required now. Filed so the loss of
fidelity recorded in GSP-0001 is tracked, not forgotten.
