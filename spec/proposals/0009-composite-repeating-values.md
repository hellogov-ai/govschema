# GSP-0009: Composite & repeating values — structured `object` + `array`

- **Status:** Proposed — targets a future spec MINOR (additive).
  **⚠ Highest-complexity, most one-way-door item of the GOV-61 set —
  flagged for explicit CEO consideration before any v0.2 acceptance.**
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-62 (per the GOV-61 spec-evolution disposition, items 5b + 6)
- **Affects:** `spec/vN/govschema.schema.json` (field `$defs` — recursion),
  §6.1/§6.2 (field model), §7 (flow field references), §10 (name-uniqueness rule),
  `tools/`, **every consumer that traverses fields** — a **one-way door**

## Problem

v0.1 fields are **flat** (§6.1): there is no nested-object structure and no
repeating-element model. Two real shapes cannot be represented faithfully:

1. **Composite values** — a structured sub-record such as an address or a
   contact. Today `object` exists in the `type` enum but only as an *opaque*
   carrier ("a composite value carried opaquely. Prefer flat fields where
   possible", §6.2); its internal members are invisible to the schema.
2. **Repeating values** — a list of an unknown number of like items: dependents,
   prior addresses, vehicles, dates of foreign travel. There is **no `array`
   type** at all, so a producer must either invent fixed `dependent1Name`,
   `dependent2Name`… fields (wrong when cardinality is unbounded) or drop the
   repetition entirely.

The common real shape is the **array of objects** (a list of dependents, each
with name/DOB/relationship), which is why repeating values (5b) and nested
objects (6) must be designed *together*, not separately.

The DS-82 reference schema (`registry/us/dos/passport-renewal-ds82`) is the
cautionary data point: its mailing address was **deliberately flattened** into
scalar fields (`mailingStreet`, `mailingCity`, …) and that worked well. Nesting
must earn its place against that baseline, not replace it by default.

## Sketch (non-normative)

Give `object` an internal structure and add `array`, reusing the existing field
definition recursively:

```json
{
  "name": "dependents",
  "label": "Dependent children",
  "type": "array",
  "items": {
    "type": "object",
    "fields": [
      { "name": "fullName",     "label": "Full name",     "type": "string", "required": true },
      { "name": "dateOfBirth",  "label": "Date of birth", "type": "date",   "required": true },
      { "name": "relationship", "label": "Relationship",  "type": "enum",
        "validation": { "enum": ["child", "stepchild", "adopted"] } }
    ]
  }
}
```

- **`object`** gains an OPTIONAL `fields` member: an array of field definitions
  describing its members. An `object` *without* `fields` keeps its v0.1
  opaque-carrier meaning (backward compatible).
- **`array`** is a new `type` with a REQUIRED `items` member describing the
  element shape — typically (but not necessarily) an `object`.

This is additive: no existing flat document changes meaning.

## MUST-address design points

These are the load-bearing decisions; the proposal exists to force them onto the
record before the model is committed.

### 1. Recursion in the field `$defs`

The element/member shape is *itself a field definition*, so `#/$defs/field` must
reference itself. JSON Schema 2020-12 permits a recursive `$ref` (`items` →
`#/$defs/field`, an `object`'s `fields[]` items → `#/$defs/field`). The
meta-schema gains no new vocabulary, only a back-edge. **Open:** whether to bound
nesting depth (e.g. a recommended max depth) to keep documents legible and
consumers' traversal bounded — unbounded recursion is expressive but a foot-gun
(lens: *machine-first, human-readable*).

### 2. `sourceRef` and name addressing for nested members

- **`sourceRef`** stays a free-text pointer at *each* member to where it appears
  on the source form (e.g. a repeated address block, "Dependent rows, Section 4").
  It is unchanged in meaning; nesting does not require a structured path.
- **Field-name addressing must be defined.** §6.1 / §10 rule 3 currently require
  `name` to be unique among *all* fields document-wide. With nesting, that becomes
  "unique among **siblings** within the same containing `fields`/`items`", and a
  member is addressed by a **dotted path** from the document root, e.g.
  `dependents.fullName`. The proposal **MUST** fix:
  - the exact path grammar (proposed: `.` separator; array elements addressed by
    the array's name, not by index, since cardinality is dynamic);
  - that §10 rule 3 (uniqueness) is rewritten to *sibling* scope + *path*
    global-uniqueness;
  - that §7 flow references (`steps[].fields`) and any future condition
    references ([GSP-0004](./0004-conditional-flow.md)) use this dotted path, and
    §10 rule 4 (flow reference integrity) is updated to resolve paths. This
    coupling to GSP-0004 is a key reason nesting is high-blast-radius.

### 3. Flatten-vs-nest guidance (normative SHOULD, if accepted)

Nesting is powerful and over-usable. The spec **SHOULD** guide producers:

- **Flatten** (prefer scalars with a shared name prefix, as DS-82 does) when the
  composite is **fixed and singular** — a single address, a single contact. Flat
  is simpler to consume, validate, and present.
- **Nest** only when the structure is **genuinely repeating** (unbounded
  cardinality → `array`) or when a composite is **reused** in several places and
  factoring it once aids consistency (lens: *composability & reuse*).
- The default remains *least structure that is faithful to the source* (§3
  principle 5, "strict and small").

## Why this is one-way

Once consumers ship code that **traverses** nested `fields`/`items` and resolves
dotted paths, the traversal contract and the name-addressing grammar become
load-bearing and cannot be walked back without a MAJOR break. It also reopens two
settled invariants — §10 rule 3 (name uniqueness) and rule 4 (flow reference
integrity) — and couples to the still-unaccepted conditional-flow model
(GSP-0004). This is the **single biggest model change** of the GOV-61 set; per the
Founding Engineer's disposition it **must not be folded into v0.2 casually** —
the CEO is asked to weigh the meta-schema shape (recursion + addressing) and the
flatten-vs-nest posture specifically before acceptance.

## Open questions

- Depth bound (see point 1) — recommended cap vs. unbounded.
- Array element constraints (`minItems`/`maxItems`) — defer to the
  richer-constraints work (§12) or bundle here? Recommend defer; this proposal is
  already the largest.
- Whether `array` of *scalars* (e.g. an `array` of `string`) is permitted, or
  only `array` of `object` — scalars are simpler and common enough (a list of
  phone numbers) that permitting them is recommended.
- Interaction with [GSP-0006](./0006-sensitivity-classification.md)
  (`classification` on a nested member) and
  [GSP-0007](./0007-file-field-constraints.md) (a `file` member inside an
  `array` of `object`) — both should compose cleanly, but must be confirmed.

## Decision requested

A future, scheduled work item; **no decision required now**, but flagged as the
one item of this set whose v0.2 acceptance the disposition routes to the CEO with
the meta-schema shape attached. Acceptance is gated on CEO sign-off per
[GOVERNANCE.md](../../GOVERNANCE.md).
