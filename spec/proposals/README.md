# Specification proposals

This directory holds **GovSchema proposals (GSPs)**: design notes that record a
decision the standard must make before it is baked into a `spec/vN` release.
Each proposal states a problem, the options, a recommendation, and the decision
requested — so that one-way-door choices are made deliberately and on the
record, per [GOVERNANCE.md](../../GOVERNANCE.md).

A proposal is not normative. The normative artifacts are the meta-schema
(`spec/vN/govschema.schema.json`) and the prose specification alongside it; a
proposal becomes normative only when it is accepted and folded into them.

| #    | Title                                  | Status   |
| ---- | -------------------------------------- | -------- |
| 0001 | [Document-model reconciliation](./0001-document-model-reconciliation.md) | Accepted |
| 0002 | [URN-style external identifier (colon GSID)](./0002-colon-gsid-external-identifier.md) | Proposed (deferred) |
| 0003 | [Labelled enum options](./0003-labelled-enum-options.md) | Proposed (v0.2) |
| 0004 | [Conditional flow](./0004-conditional-flow.md) | Superseded by GSP-0013 |
| 0005 | [Edition / tax-year axis for time-versioned forms](./0005-edition-axis-time-versioned-forms.md) | Accepted — Option C, for v0.2 |
| 0006 | [Sensitivity / data classification](./0006-sensitivity-classification.md) | Proposed (v0.2 candidate) |
| 0007 | [File field constraints (`maxBytes`, `mediaTypes`)](./0007-file-field-constraints.md) | Proposed (v0.2 candidate) |
| 0008 | [`datetime` scalar type](./0008-datetime-scalar.md) | Proposed (v0.2 candidate) |
| 0009 | [Composite & repeating values — structured `object` + `array`](./0009-composite-repeating-values.md) | Proposed (v0.2 candidate) — ⚠ one-way-door, CEO flag |
| 0010 | [Namespaced `extensions`](./0010-namespaced-extensions.md) | Proposed (v0.2 candidate) |
| 0011 | [Field-to-page-element mapping (companion `mapping.json`)](./0011-field-page-element-mapping.md) | Accepted — new registry artifact type, CEO sign-off recorded 2026-07-01 |
| 0013 | [Extended conditional logic (supersedes GSP-0004)](./0013-extended-conditional-logic.md) | Proposed (v0.3 package) — CEO accept-into-v0.3 sign-off requested (GOV-312) |
| 0015 | [Verification as an operational trust layer](./0015-verification-operational-trust-layer.md) | Proposed (v0.3 candidate) — ⚠ one-way-door on acceptance, CEO sign-off pending |

GSP-0006–0010 were drafted from the spec-evolution candidates surfaced by GOV-52
docs conformance and dispositioned by the Founding Engineer (GOV-61 → GOV-62).
They are **Proposed** (non-normative); per-GSP acceptance into `spec/v0.2` is
gated on CEO sign-off.

GSP-0011 was drafted from the GOV-265 plan (Workstream C, field↔page-element
mapping for browser-driving agents). It was a **one-way-door** proposal — a new
registry artifact type and file convention — gated on CEO sign-off per
[GOVERNANCE.md](../../GOVERNANCE.md); sign-off was recorded 2026-07-01 (GOV-267).
Registry rollout (the `mapping.json` pilot on 1–2 reference schemas) is tracked
separately and sequenced after a GSP-0010 `extensions`-based pilot.

GSP-0013 was drafted per RFC 0003 (GOV-302), the founder-approved design RFC
for a `spec/v0.3` agent-execution-readiness package. It supersedes GSP-0004,
extending its step-transition condition grammar to field visibility/
requiredness, cross-field validation, and (reserved for GSP-0014) document
requiredness. It is first in the RFC's recommended sequencing (§12) — GSP-0012,
GSP-0014, GSP-0016, GSP-0017, and the EIN/SS-4 flagship all reference its
`Condition` type.

## Considered and rejected

These candidates were evaluated and deliberately not advanced. Recording them
keeps the rejection on the record and avoids re-litigating without new evidence.

| Candidate | Disposition | Rationale |
| --------- | ----------- | --------- |
| Top-level `locale` member (GOV-61 item 7a) | **Out of scope** | Redundant with the existing `process.language` (§5.6, BCP 47). Revisit **only** if a concrete need emerges that a language tag alone cannot carry — e.g. a BCP-47 region/formatting requirement distinct from the source language. Reversible: re-open if a real case appears. |
