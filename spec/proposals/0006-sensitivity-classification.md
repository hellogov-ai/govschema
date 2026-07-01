# GSP-0006: Sensitivity / data classification

- **Status:** Proposed — pulled forward into the `spec/v0.3` package per RFC 0003
  (GOV-302, §11); pending individual CEO accept-into-v0.3 sign-off ([GOV-313](/GOV/issues/GOV-313)).
  Sketch unchanged from the original v0.2-candidate draft. Advisory only.
- **Author:** Standards Engineer
- **Date:** 2026-06-30 (pulled forward 2026-07-01)
- **Issue:** GOV-62 (per the GOV-61 spec-evolution disposition, item 3); pulled
  forward by GOV-302 / [GOV-313](/GOV/issues/GOV-313)
- **Affects:** `spec/vN/govschema.schema.json` (field model), consumers; needed
  by GSP-0014 (`documents[].category: identity-document`) and GSP-0017
  (safety model's stricter-handling rule)

## Problem

A v0.1 field carries no machine-readable signal that the value it collects is
sensitive. Real government forms routinely ask for data a consumer ought to treat
with care — a US Social Security Number (`SS-5`, `DS-82`), a passport number, a
date of birth, bank account details. A consumer that wants to redact such values
in logs, mask them in a UI, or route them through stricter handling has no
structured member to key on; it must hard-code field-name heuristics per schema,
which does not scale across jurisdictions.

The v0.1 field model note (§6.1) explicitly excludes a sensitivity member and
tracks it as deferred (§12, "PII marking").

## Sketch (non-normative)

Add an OPTIONAL, **advisory** `classification` member to the field definition. It
is an **open-vocabulary string** describing the kind of sensitive data the field
holds:

```json
{
  "name": "socialSecurityNumber",
  "label": "Social Security Number",
  "type": "string",
  "classification": "sensitive-pii"
}
```

Recommended starter vocabulary (non-exhaustive, lowercase, hyphenated):

| Value           | Meaning                                                        |
|-----------------|---------------------------------------------------------------|
| `pii`           | Personally identifying, ordinary sensitivity (name, address). |
| `sensitive-pii` | Heightened sensitivity (SSN, passport #, biometric, DOB).     |
| `financial`     | Financial-account or payment data.                            |
| `health`        | Health or medical data.                                       |

Semantics:

- `classification` is **purely advisory**. A consumer **MAY** use it to drive
  redaction, masking, access control, or other special handling. A consumer
  **MUST NOT** treat its presence or absence as a regulatory determination.
- It makes **no legal or compliance claim.** GovSchema is a standards body, not a
  compliance authority; the member records an *engineering* hint about the data's
  nature, never an assertion that the field is "PII under GDPR/CCPA/etc." or that
  any particular legal obligation attaches. This non-claim **MUST** be stated in
  the normative text if accepted.
- The vocabulary is **open**: consumers **SHOULD** ignore (not reject) a value
  they do not recognize, so new classifications can be introduced without a
  breaking change.

## Why an open-vocabulary string, not `sensitive: boolean`

A bare `sensitive: true` boolean (the form the candidate originally took) cannot
express *degree* or *kind*: SSN, a home address, and a bank balance all collapse
to one bit. Growing it later (e.g. distinguishing `sensitive-pii` from
`financial`) would mean **either** adding a second member **or** changing the type
of `sensitive`, both of which are awkward and the latter breaking. An
open-vocabulary string grows by convention: new values are additive and require no
schema-shape change (lens: *backward compatibility & semver*, *composability*).

## Open questions

- **Cardinality.** A field can be both `financial` and `sensitive-pii`. Permit a
  single string only, or also an array of classifications? A single string is the
  smaller v0.2 surface; an array is more expressive. Recommend shipping the single
  string first and treating multi-classification as a later additive (string →
  `string | array` is itself a backward-compatible widening if designed for now).
- **Registry vs. free-form.** Whether the recommended vocabulary is a *closed*
  enum in the meta-schema (rejects unknown values) or an open `string` with a
  documented suggested set (accepts unknown values). Open is recommended to honour
  the growth property above; a documented suggested set keeps consistency.
- **Per-field only, or also process-level?** A document-level default
  classification is conceivable but adds little; recommend field-level only.

## Decision requested

RFC 0003 (§11) recommends accepting this proposal alongside the `spec/v0.3`
agent-execution-readiness package, since GSP-0014 (`documents[].category:
identity-document`) and GSP-0017 (the safety model's stricter-handling rule)
both key on `classification`. No redesign from the sketch above; this is an
accept/hold/reject decision on the existing shape. The explicit constraint
that any accepted form remains **advisory and makes no legal claim** stands
regardless of outcome. Acceptance into `spec/v0.3` is gated on individual CEO
sign-off per [GOVERNANCE.md](../../GOVERNANCE.md), sought via
[GOV-313](/GOV/issues/GOV-313).
