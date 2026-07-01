# GSP-0013: Extended conditional logic (supersedes GSP-0004's step-only sketch)

- **Status:** Accepted — as written, for `spec/v0.3`. CEO sign-off recorded
  2026-07-01 ([GOV-312](/GOV/issues/GOV-312) decision interaction).
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-312, drafted per RFC 0003 §3 (GOV-302)
- **Affects:** `spec/vN/govschema.schema.json` (field model, flow model, two new
  top-level arrays), §7 (flow), §10 (normative rules), `tools/`, every consumer
  that evaluates a document's conditional logic. **Supersedes and absorbs
  [GSP-0004](./0004-conditional-flow.md)** — GSP-0004's `steps[].transitions`
  sketch is unchanged in shape but its open terminal-sentinel question is
  resolved here (§4), and this proposal is the one that actually goes forward
  for acceptance; GSP-0004 is retained only as the historical record of the
  original ask.

## Problem

Real government forms are not flat, and the branching is not confined to
step-to-step routing. GSP-0004 proposed a closed `when` grammar for
`steps[].transitions` (motivated by the DS-82 passport-renewal eligibility
gate) but left three things unresolved: how a flow signals "end here," and
whether the same grammar could serve anywhere else. GOV-302 asks for
declarative conditional logic at three more attachment points: field-level
visibility/requiredness, document requiredness, and cross-field validation.
Six sub-asks in total (RFC 0003 §3), one grammar underneath all of them.
Otherwise GovSchema ends up with four bespoke, mutually-inconsistent rule
languages instead of one small one reused four times (lens: *composability &
reuse*, *least surprise*).

This GSP also closes three gaps a standards review of RFC 0003 found in the
sketch before it was filed as a real proposal (GOV-310, recorded against
GOV-302's PR #39): an undefined acyclicity rule for field-level conditions, an
unresolved hidden-but-required contradiction, undefined "set" semantics for
`exclusivityGroups` on non-boolean fields, and a mismatched operator
vocabulary between the base `Condition` type and `crossFieldValidation`'s
`compare` shape. Each is resolved below rather than carried forward as an open
question.

## Sketch (non-normative)

### 1. The shared `Condition` type

One grammar, reused at every attachment point below. Unchanged in spirit from
GSP-0004, with its operator vocabulary extended so it is a strict superset of
what §3's `compare` shape needs (closing the GOV-310 vocabulary-mismatch
finding):

```json
{ "any": [
  { "field": "passportLostOrStolen", "equals": true },
  { "field": "passportUndamaged", "equals": false }
] }
```

- **Leaf comparison:** `{ "field": <name>, "<op>": <value> }`, one op per leaf.
  `<op>` is one of: `equals`, `notEquals`, `in`, `greaterThan`,
  `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`. (GSP-0004's original
  sketch had `greaterThan`/`lessThan` only; the `OrEqual` variants are added
  here because §3's field-to-field `compare` needs them, and a form that
  compares a field to a literal is no less likely to need an inclusive bound
  than one comparing two fields (e.g. "amount must be at least the minimum
  fee").
- **Boolean composition:** `all` / `any` / `not`, each taking one or more
  nested `Condition`s.
- References `field` `name`s only (flat fields, per the current v0.1/v0.2
  model). No executable code, no string interpolation, no side effects — a
  small, closed, statically-analyzable grammar an agent evaluates with a
  ~50-line interpreter, not a JS `eval` (lens: *spec precision over
  cleverness*).
- Does not depend on GSP-0009 (composite/repeating values, still undecided,
  CEO-flagged one-way-door) — see §7 below.

### 2. Field-level visibility and requiredness

```json
{
  "name": "llcMemberCount",
  "label": "Number of LLC members",
  "type": "integer",
  "visibleWhen": { "field": "isLLC", "equals": true },
  "requiredWhen": { "field": "isLLC", "equals": true }
}
```

- Both members OPTIONAL on a field. Absent `visibleWhen` → always visible
  (today's behavior, unchanged). Absent `requiredWhen` → the existing static
  `required` boolean governs (unchanged).
- When `requiredWhen` is present, static `required` MUST be `false` or absent.
  A field cannot carry two independent claims about its own requiredness that
  could disagree (mirrors the `id`/path consistency discipline in SPEC §10
  rule 1: one fact, asserted once).
- **Visibility gates requiredness (resolves the GOV-310 hidden-but-required
  finding):** a field's *effective* requiredness is `false` whenever its
  effective visibility is `false`, regardless of what `requiredWhen` or static
  `required` say. A hidden field can never block submission. This is a
  runtime evaluation rule, not just an authoring convention, so it holds even
  if a producer writes a `requiredWhen` that could be true while
  `visibleWhen` is false. A future `tools/validate-conditions.mjs` SHOULD
  still warn on that authoring pattern (it signals a likely mistake), but the
  evaluation rule is unambiguous either way.
- **Acyclicity (resolves the GOV-310 finding that GSP-0004 only guarded
  step-transition cycles):** treat every field's `visibleWhen`/`requiredWhen`
  as a directed edge from that field to each field its condition references.
  This graph MUST be acyclic — a new §10 normative rule, direct sibling of
  GSP-0004's step-transition-cycle rule, extended from steps to fields. A
  field referencing itself (directly, or transitively through a chain of
  other fields' conditions) is invalid.
- This directly replaces the current workaround of stating "required only
  when X" in a field's `description` — visible today in nearly every
  conditional line of the EIN/SS-4 flagship's target fields (e.g.
  `llcMemberCount`, `entityTypeOtherSpecify`, `previousEIN`) — with a
  machine-checkable rule instead of prose an agent cannot evaluate.

### 3. Cross-field validation

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

- New top-level OPTIONAL array. Each rule has a unique `id` (for error
  reporting) and is exactly one of two shapes:
  - a `when` (a `Condition`) plus `requireAbsent` and/or `requirePresent`
    (arrays of field `name`s); or
  - a `compare`: `{ "field": <name>, "operator": <op>, "compareTo": <name> }`,
    comparing two named fields' values directly.
- **`compare.operator` vocabulary (resolves the GOV-310 mismatch finding):**
  drawn from the *same* set as the base `Condition` leaf operators, minus
  `in` (which needs a literal list on the right-hand side, not a second
  field, so it has no field-to-field meaning here) — `equals`, `notEquals`,
  `greaterThan`, `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`. One
  operator vocabulary for the whole GSP, not two that drift.
- Deliberately **not** a general expression language — two closed shapes, not
  one. This keeps the "declarative, serializable, evaluable without per-form
  code" property GOV-302 asked for (lens: *spec precision over cleverness*).

### 4. Terminal / exit states (resolving GSP-0004's open question)

GSP-0004 left "how does a flow end" as an open sentinel question. Resolved
here, since document requiredness (§5) also needs to name exit/failure
states and a `to: "__end__"`-style magic string was the weaker option on the
table:

```json
"transitions": [
  { "to": null, "exitReason": "route-to-in-person-application",
    "when": { "field": "passportLostOrStolen", "equals": true } },
  { "to": "applicant_details" }
]
```

- `to: null` means "end of flow here" — a JSON `null`, not a string sentinel,
  so there is no collision risk with a real step `id` and no magic-string
  convention to document and remember.
- `exitReason` OPTIONAL free-text/slug explaining *why* the flow ended there
  (e.g. routed to a different channel, disqualified, complete) — the
  machine-readable form of what today lives only in step `description` prose.
- Transitions are still evaluated top-to-bottom, first matching `when` wins,
  a `when`-less transition is an unconditional fallthrough and SHOULD be last
  (unchanged from GSP-0004).
- §10's existing "every `next` MUST name an existing step" rule extends to:
  every `to` MUST be `null` or name an existing step.

### 5. Mutually exclusive choices

```json
"exclusivityGroups": [
  { "id": "eitherFileTypeElection", "fields": ["file944AnnuallyElection", "quarterlyFilingConfirmed"] }
]
```

- New top-level OPTIONAL array: at most one field in each named group may be
  **set** at once. Kept document-level (one array) rather than duplicated per
  field, since exclusivity is a property of the *group*, not any one member.
- **Scope and "set" semantics (resolves the GOV-310 finding that "set" was
  undefined for non-boolean fields):** `exclusivityGroups[].fields` MUST
  reference fields of `type: boolean` only, and "set" means the field's
  value is `true` (`false` or absent does not count). This is a deliberate
  scope trim, not an oversight: every motivating example (RFC 0003 §3.5's
  file-annually vs. file-quarterly election) is a pair of boolean checkboxes,
  and no reference schema authored so far has a concrete non-boolean mutual-
  exclusivity need. Inventing "set" semantics for strings/numbers now (empty
  string? zero? absence?) would be speculative generality with no real case
  to validate it against (lens: *spec precision over cleverness* — an
  ambiguous rule is a broken rule). If a genuine non-boolean case appears,
  extend this member then, against a real example, rather than guessing now.

### 6. Document requiredness (attachment point only — shape reserved for GSP-0014)

RFC 0003 §3 also asks for conditional *document* requiredness (e.g. "attach
proof of name change only if `nameChanged: true`"). GSP-0014 (documents as a
first-class model) has not yet defined `documents[]`'s shape — this GSP does
not invent it early. It commits only to the attachment convention: when
GSP-0014 defines `documents[]`, each entry's conditional requiredness reuses
this exact `Condition` type via a `requiredWhen` member, matching §2's field
convention name-for-name. One grammar, four attachment points, not three
plus a fourth GSP-0014 invents independently.

### 7. Calculated / derived fields — recommend deferring

GOV-302 also asks for calculated/derived fields (e.g. a computed total or
age). Recommend **not shipping this in v0.3.** The founder confirmed "defer"
directly on the GOV-302 RFC's own interaction (RFC 0003 §3.6). Almost none of
the reference schemas authored so far need a derived value (most forms ask
the applicant to state a fact, not to compute one), and a real calculation
vocabulary (date arithmetic, currency arithmetic, string concatenation) is
exactly the kind of surface GOV-302 explicitly warned against over-designing.
If a concrete need appears later (e.g. an OCR-extracted document populating a
field), model it narrowly against that real case (e.g.
`documents[].ocr.populatesFields`, a GSP-0014 concern) rather than adding a
general `computed` member here. Recorded as a closed decision, not an open
question, since the founder has already ruled on it.

## Relationship to GSP-0004

GSP-0004's `steps[].transitions` sketch (top-to-bottom evaluation,
`all`/`any`/`not` composition) is unchanged and fully absorbed into §1 and §4
above. This proposal is what actually goes forward for CEO acceptance;
GSP-0004 is marked superseded in the proposals index and kept only as the
historical record of the original step-only ask (open-source hygiene: the
provenance of an idea should stay visible, not be silently deleted).

## Open questions

- Whether a future `tools/validate-conditions.mjs` should be a new script or
  folded into the existing `tools/validate-schema.mjs` — a build-time
  decision for whoever implements, not a spec question.
- Whether `crossFieldValidation`'s `requireAbsent`/`requirePresent` shape
  ever needs its own `id`-referenceable reuse across rules (e.g. two rules
  sharing one `when`) — no concrete case yet; revisit if one appears.

## Decision — Accepted

CEO accept-into-`spec/v0.3` sign-off was requested on:

1. The shared `Condition` type (§1), including the operator-vocabulary
   extension (`greaterThanOrEqual`/`lessThanOrEqual` added to the base leaf
   set) that unifies it with `crossFieldValidation.compare`.
2. The four attachment points as designed: field `visibleWhen`/`requiredWhen`
   (§2, with the visibility-gates-requiredness rule and the new field-level
   acyclicity rule), `crossFieldValidation` (§3), the resolved `to: null` +
   `exitReason` terminal sentinel (§4, superseding GSP-0004's open question),
   and `exclusivityGroups` scoped to boolean fields only (§5).
3. Deferring calculated/derived fields entirely from v0.3 (§7) — already
   founder-confirmed on GOV-302, restated here for the record since this is
   the GSP that would have carried it.

**Recorded:** Accepted as written (GOV-312 decision interaction, resolved
2026-07-01) — all three points above accepted as proposed, no changes
requested.

This proposal remains non-normative text: acceptance authorizes the design
for a future `spec/v0.3` fold-in; no meta-schema or SPEC.md change ships with
this GSP. Per RFC 0003 §12, nothing else in the v0.3 package blocked on
anything upstream of this GSP, and acceptance now unblocks GSP-0012 (maturity
levels), GSP-0014 (documents), GSP-0016 (conformance fixtures), GSP-0017
(safety model), and the EIN/SS-4 flagship, all of which reference this
`Condition` type and were sequenced after it per the RFC's recommended order.
