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
| 0006 | [Sensitivity / data classification](./0006-sensitivity-classification.md) | Accepted — for v0.3, CEO sign-off recorded 2026-07-01 (GOV-313) |
| 0007 | [File field constraints (`maxBytes`, `mediaTypes`)](./0007-file-field-constraints.md) | Accepted for v0.3 — CEO sign-off recorded 2026-07-01 (GOV-314) |
| 0008 | [`datetime` scalar type](./0008-datetime-scalar.md) | Proposed (v0.2 candidate) |
| 0009 | [Composite & repeating values — structured `object` + `array`](./0009-composite-repeating-values.md) | Proposed (v0.2 candidate) — ⚠ one-way-door, CEO flag |
| 0010 | [Namespaced `extensions`](./0010-namespaced-extensions.md) | Proposed (v0.2 candidate) |
| 0011 | [Field-to-page-element mapping (companion `mapping.json`)](./0011-field-page-element-mapping.md) | Accepted — new registry artifact type, CEO sign-off recorded 2026-07-01 |
| 0013 | [Extended conditional logic (supersedes GSP-0004)](./0013-extended-conditional-logic.md) | Accepted — for v0.3, CEO sign-off recorded 2026-07-01 (GOV-312) |
| 0014 | [Documents as a first-class model (`documents[]` array)](./0014-documents-as-first-class-model.md) | Accepted for v0.3 — CEO sign-off recorded 2026-07-01 (GOV-315) |
| 0015 | [Verification as an operational trust layer](./0015-verification-operational-trust-layer.md) | Accepted for v0.3 — CEO sign-off recorded 2026-07-01 (GOV-325) |
| 0016 | [Conformance fixtures (non-submitting)](./0016-conformance-fixtures.md) | Accepted — two-way-door, decided via normal PR review (GOV-317) |

GSP-0008–0010 were drafted from the spec-evolution candidates surfaced by GOV-52
docs conformance and dispositioned by the Founding Engineer (GOV-61 → GOV-62).
They are **Proposed** (non-normative); per-GSP acceptance into `spec/v0.2` is
gated on CEO sign-off. (GSP-0006 and GSP-0007, drafted from the same batch,
were pulled forward into `spec/v0.3` and accepted — see their own paragraphs
below.)

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

GSP-0006 was originally a `spec/v0.2` candidate (GOV-62); RFC 0003 (GOV-302)
recommended pulling it forward into the `spec/v0.3` package instead, since
GSP-0014 (`documents[].category: identity-document`) and GSP-0017 (safety
model's stricter-handling rule) both key on `classification`. No redesign —
individual accept-into-v0.3 sign-off was recorded 2026-07-01 (GOV-313).

GSP-0007 was originally a `spec/v0.2` candidate (GOV-62); RFC 0003 (GOV-302)
recommended pulling it forward into the `spec/v0.3` package instead, since
GSP-0014 (documents) needs its `maxBytes`/`mediaTypes` shape for
`documents[].constraints`. No redesign — individual accept-into-v0.3 sign-off
was recorded 2026-07-01 (GOV-314). It remains usable standalone on plain
`type: file` fields, independent of `documents[]`.

GSP-0014 was drafted per RFC 0003 (GOV-302 §5), the founder-approved design
RFC for the `spec/v0.3` agent-execution-readiness package, following the
founder's own "separate-array" answer on the documents-model shape question.
It defines a new top-level `documents[]` array (identity-document /
supporting-evidence / payment / attestation) reusing GSP-0013's `Condition`
type for `requiredWhen` and GSP-0007's `maxBytes`/`mediaTypes` shape for
`constraints`, plus a lighter `fieldRole: data | eligibility` member on
`fields[]`. Drafted after GSP-0013, GSP-0006, and GSP-0007 landed, per RFC
0003 §12's recommended sequencing; individual accept-into-v0.3 sign-off was
recorded 2026-07-01 (GOV-315).

GSP-0016 was drafted per RFC 0003 (GOV-302 §7). Unlike its siblings above, it
is **two-way-door**: a new top-level `conformance/` directory and a
`browser-flow.schema.json` fixture-format scaffold, with no `spec/vN`
meta-schema change and no change to what "verified" means, so it is decided
by normal pull-request review (the Review gate) rather than CEO sign-off, per
[GOVERNANCE.md](../../GOVERNANCE.md). It depends on GSP-0013 (conditional-
violation payload fixtures) and GSP-0014 (document-requiredness fixtures),
both already accepted; GSP-0011 (`mapping.json`) needed no new blocker since
it was already accepted. Filed and landed together under GOV-317.

## Considered and rejected

These candidates were evaluated and deliberately not advanced. Recording them
keeps the rejection on the record and avoids re-litigating without new evidence.

| Candidate | Disposition | Rationale |
| --------- | ----------- | --------- |
| Top-level `locale` member (GOV-61 item 7a) | **Out of scope** | Redundant with the existing `process.language` (§5.6, BCP 47). Revisit **only** if a concrete need emerges that a language tag alone cannot carry — e.g. a BCP-47 region/formatting requirement distinct from the source language. Reversible: re-open if a real case appears. |
