# GSP-0007: File field constraints (`maxBytes`, `mediaTypes`)

- **Status:** Proposed — targets a future spec MINOR (additive).
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-62 (per the GOV-61 spec-evolution disposition, item 4)
- **Affects:** `spec/vN/govschema.schema.json` (field `validation`), consumers

## Problem

A `file` field describes a required upload by metadata, not bytes (§6.4). Real
forms publish hard constraints on those uploads — "PDF or JPEG, maximum 5 MB",
"passport photo, JPEG only". In v0.1 there is nowhere structured to record them:
§6.4 directs producers to "state any such requirement in the field
`description`", which is prose an agent cannot enforce. An agent that wants to
reject an over-size or wrong-type file *before* contacting the government source —
the whole point of local validation (§1.1) — cannot.

These limits are **facts published by the source**, exactly the kind of
verifiable, source-traceable fact GovSchema exists to capture (lens:
*source-of-truth fidelity*). Leaving them in free text loses machine-readable
fidelity, the same defect GSP-0003 and GSP-0004 address elsewhere.

## Sketch (non-normative)

Add two OPTIONAL, additive validation keywords that apply only to `file`-typed
fields:

```json
{
  "name": "evidenceOfName",
  "label": "Evidence of name change",
  "type": "file",
  "sourceRef": "Page 3, supporting documents",
  "validation": {
    "maxBytes": 5242880,
    "mediaTypes": ["application/pdf", "image/jpeg"]
  }
}
```

- `maxBytes` — OPTIONAL non-negative integer; the maximum accepted upload size in
  bytes, as published by the source. (Bytes, not "MB", to keep the unit
  unambiguous — lens: *spec precision over cleverness*.)
- `mediaTypes` — OPTIONAL non-empty array of **IANA media type** strings
  (RFC 6838), e.g. `application/pdf`, `image/jpeg`. The accepted upload formats.

Both are *recorded source facts*, not GovSchema policy: a producer publishes them
only when the source states them, and the verification record (§9) is what asserts
they still match the live source.

Applicability is type-scoped: `maxBytes`/`mediaTypes` are meaningful **only** when
`type` is `file`. The meta-schema today carries a single flat, closed `validation`
object shared by all types; accepting this proposal requires making `validation`
**conditional on `type`** (e.g. a JSON Schema `if/then` or per-type `$defs`) so
these keywords are permitted for `file` and rejected elsewhere. That conditional
shape is itself a small design point called out below.

## Open questions

- **Conditional-validation mechanism.** How to express "these keywords only for
  `file`" in the meta-schema (`if`/`then`/`allOf`, or splitting `validation` into
  per-type sub-schemas). This decision also sets the pattern for any future
  type-scoped keyword (e.g. `format` for `string`), so it is worth fixing
  deliberately rather than per-keyword.
- **Media-type wildcards.** Permit `image/*`-style ranges, or require fully
  specified types only? Fully specified is more precise and verifiable;
  wildcards are more forgiving. Recommend fully specified for v0.2.
- **Scope creep.** `minBytes`, page-count, or dimension limits are conceivable but
  rare; keep v0.2 to `maxBytes` + `mediaTypes` and add others only on real demand.

## Decision requested

A future, scheduled work item; no decision required now. Low controversy —
purely additive validation keywords for an existing type. Acceptance into
`spec/v0.2` is gated on CEO sign-off per [GOVERNANCE.md](../../GOVERNANCE.md).
