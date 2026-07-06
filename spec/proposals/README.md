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
| 0006 | [Sensitivity / data classification](./0006-sensitivity-classification.md) | Folded into `spec/v0.3` (GOV-373) — CEO sign-off recorded 2026-07-01 (GOV-313) |
| 0007 | [File field constraints (`maxBytes`, `mediaTypes`)](./0007-file-field-constraints.md) | Folded into `spec/v0.3` (GOV-373) — CEO sign-off recorded 2026-07-01 (GOV-314) |
| 0008 | [`datetime` scalar type](./0008-datetime-scalar.md) | Proposed (v0.2 candidate) |
| 0009 | [Composite & repeating values — structured `object` + `array`](./0009-composite-repeating-values.md) | Proposed (v0.2 candidate) — ⚠ one-way-door, CEO flag |
| 0010 | [Namespaced `extensions`](./0010-namespaced-extensions.md) | Proposed (v0.2 candidate) |
| 0011 | [Field-to-page-element mapping (companion `mapping.json`)](./0011-field-page-element-mapping.md) | Accepted — new registry artifact type, CEO sign-off recorded 2026-07-01 |
| 0012 | [Schema maturity levels (badge model)](./0012-schema-maturity-levels.md) | Folded into `spec/v0.3` (GOV-373) — CEO sign-off recorded 2026-07-01 (GOV-316) |
| 0013 | [Extended conditional logic (supersedes GSP-0004)](./0013-extended-conditional-logic.md) | Folded into `spec/v0.3` (GOV-373) — CEO sign-off recorded 2026-07-01 (GOV-312) |
| 0014 | [Documents as a first-class model (`documents[]` array)](./0014-documents-as-first-class-model.md) | Folded into `spec/v0.3` (GOV-373) — CEO sign-off recorded 2026-07-01 (GOV-315) |
| 0015 | [Verification as an operational trust layer](./0015-verification-operational-trust-layer.md) | Accepted for v0.3 — CEO sign-off recorded 2026-07-01 (GOV-325) |
| 0016 | [Conformance fixtures (non-submitting)](./0016-conformance-fixtures.md) | Accepted — two-way-door, decided via normal PR review (GOV-317) |
| 0017 | [Agent conformance and safety boundary](./0017-agent-conformance-safety-boundary.md) | Folded into `spec/v0.3` (GOV-399) — CEO sign-off recorded 2026-07-01 (GOV-318) |
| 0018 | [Field-level eligibility value semantics (`eligibleValues`)](./0018-field-eligibility-value-semantics.md) | Folded into `spec/v0.3` — CEO sign-off recorded 2026-07-01 (GOV-393) |
| 0019 | [Generalize `edition.scheme` beyond `us-tax-year`/`gb-tax-year`](./0019-generalize-edition-scheme-calendar-tax-year.md) | Proposed — not yet reviewed, ⚠ one-way-door, Founding Engineer/CEO flag |
| 0020 | [Treaty-authorized third-party issuers in `authority`](./0020-treaty-authorized-third-party-issuers.md) | Folded into `spec/v0.3` — CEO sign-off recorded 2026-07-02 (GOV-582) |
| 0021 | [Municipal & county jurisdictions (`jurisdiction.locality`)](./0021-municipal-county-jurisdictions.md) | Folded into `spec/v0.3` — CEO sign-off recorded 2026-07-06 (GOV-667) |

GOV-373 shipped the `spec/v0.3` meta-schema and prose fold-in for the five GSPs
above whose acceptance record explicitly deferred that step (GSP-0006, GSP-0007,
GSP-0012, GSP-0013, GSP-0014): `spec/v0.3/govschema.schema.json` and
`spec/v0.3/SPEC.md` now exist as an additive MINOR over `spec/v0.2`, and
`tools/validate-ajv.mjs` validates documents targeting the `0.3` line. This is
the prerequisite the EIN/SS-4 flagship (GOV-319) needed before any of its
deliverables could be authored. GSP-0015/0016/0017 remained out of scope for
that fold-in (see their own paragraphs below). GOV-399 subsequently folded
GSP-0017 into `spec/v0.3/SPEC.md` §14 as its own normative section, since it
adds no meta-schema member and so needed no `govschema.schema.json` change.
GSP-0015/0016 remain out of scope, tracked separately.

GSP-0008–0010 were drafted from the spec-evolution candidates surfaced by GOV-52
docs conformance and dispositioned by the Founding Engineer (GOV-61 → GOV-62).
They are **Proposed** (non-normative); per-GSP acceptance into `spec/v0.2` is
gated on CEO sign-off. (GSP-0006 and GSP-0007, drafted from the same batch,
were pulled forward into `spec/v0.3` and accepted — see their own paragraphs
below.)

GSP-0009 carried the pre-publication working title "repeating groups"; three
already-published `VERIFICATION.md` records (`registry/us/uscis/permanent-
resident-card-replacement-i90`, `travel-document-i131`,
`adjustment-of-status-i485`, all `1.0.0`) linked it under that filename before
the rename to `0009-composite-repeating-values.md`. Since those records are
immutable per [VERSIONING.md](../../VERSIONING.md) §3,
[`0009-repeating-groups.md`](./0009-repeating-groups.md) is kept in place as a
non-normative redirect stub rather than point-patching the records
(GOV-1095). New links to GSP-0009 should use the current filename.

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

GSP-0012 was drafted per RFC 0003 (GOV-302 §2), the founder-approved design
RFC for the `spec/v0.3` agent-execution-readiness package. It defines a new
top-level `maturity` member (`level`/`criteria`/`method`/`assertedBy`/
`assertedAt`) and four cumulative tiers — Structural Reference / Verified
Schema / Agent-Ready Schema / Execution-Tested Schema — whose middle two tiers
read directly off GSP-0013's `steps[].transitions`/`to: null` and GSP-0014's
`documents[]`/`fieldRole`. Drafted after both landed, per RFC 0003 §12's
recommended sequencing (point 4); individual accept-into-v0.3 sign-off was
recorded 2026-07-01 (GOV-316).

GSP-0016 was drafted per RFC 0003 (GOV-302 §7). Unlike its siblings above, it
is **two-way-door**: a new top-level `conformance/` directory and a
`browser-flow.schema.json` fixture-format scaffold, with no `spec/vN`
meta-schema change and no change to what "verified" means, so it is decided
by normal pull-request review (the Review gate) rather than CEO sign-off, per
[GOVERNANCE.md](../../GOVERNANCE.md). It depends on GSP-0013 (conditional-
violation payload fixtures) and GSP-0014 (document-requiredness fixtures),
both already accepted; GSP-0011 (`mapping.json`) needed no new blocker since
it was already accepted. Filed and landed together under GOV-317.

GSP-0017 was drafted per RFC 0003 (GOV-302 §6), the founder-approved design
RFC for the `spec/v0.3` agent-execution-readiness package, per the founder's
own interaction answer on GOV-302 leaning normative. It proposes a new
normative SPEC §14, "Agent conformance and safety boundary," generalizing
GSP-0011 §13.4's `mapping.json`-only scope-boundary language to every
GovSchema document and every `docs/agent-consumption.md` consumption layer —
the six-point MUST/MUST-NOT list on consumer behavior (no-submission-
authorization, confirm-before-submit, stricter handling for
`classification`/`identity-document` data, surface `status`/`verification`/
`maturity` before relying on draft data, no government-endorsement claim,
uniform application), plus a companion `docs/agent-safety-model.md`. Drafted
after GSP-0006 and GSP-0012 landed, per RFC 0003 §12's recommended sequencing
(point 5), since two of the six rules key on `classification` and `maturity`.
Unlike its schema-shape siblings, this is flagged explicitly for deliberate
CEO attention beyond the ordinary accept-into-v0.3 review — RFC 0003 §13 Q5
named it the item "most worth an explicit yes," since it is the first
GovSchema conformance rule binding consumer *behavior*, not document shape.
Individual accept-into-v0.3 sign-off, including explicit acknowledgment of
that consumer-behavior scope expansion, was recorded 2026-07-01 (GOV-318).

GSP-0018 was filed against GOV-386, a gap surfaced while building the GOV-374
schema-driven agent interview demo on the landing site: a document can flag a
field as an eligibility gate (`fieldRole: eligibility`, GSP-0014) but has no
way to say which value keeps an applicant eligible, so consumers must
hardcode that judgment per field name. It adds a new OPTIONAL
`eligibleValues` member (Part 1), meaningful only alongside
`fieldRole: eligibility`, explicitly recommending **against** the issue's own
starting suggestion of reusing `validation.enum` for eligibility, since that
conflates "well-formed input" with "eligible outcome" (a truthful
disqualifying answer must still validate). Evaluating GOV-386's second ask
(a masking/sensitivity hint), it concludes no new member is needed there —
that gap is already covered by the accepted GSP-0006 `classification`
member; the real follow-up is a registry-authoring backfill (0/40 schemas
set `classification` today), filed separately per the CEO's direction, not
folded into this GSP (Part 2). Standards Reviewer soundness pass
([GOV-388](/GOV/issues/GOV-388)) raised no blocking concerns (it did catch
two stale registry-count claims, corrected before merge). CEO
accept-into-`spec/v0.3` sign-off recorded 2026-07-01
([GOV-393](/GOV/issues/GOV-393)); `eligibleValues` is folded into
`spec/v0.3/govschema.schema.json` §6.8 field-model properties (plus the
`fieldRole: eligibility` co-presence `allOf` constraint) and
`spec/v0.3/SPEC.md` §6.9 in this same change — unlike the batch-5 GOV-373
fold-in, GSP-0018's acceptance and fold-in land together since it is a
single, small, additive member.

GSP-0019 was filed against GOV-430 (a GovSchema Standard Research cycle
closing the Taxes-vertical gap for CA/AU/DE/NZ/SG/IE), surfaced while
authoring `ie/revenue/self-assessment-tax-return-form11s`: `edition.scheme`
is closed to `us-tax-year`/`gb-tax-year`/`award-year` (GSP-0005), and none
fits Ireland's calendar-year tax return without either mislabeling the
scheme or unilaterally extending a one-way-door enum. It proposes adding
`ie-tax-year` (Option A, least disruptive) as a near-term unblock, flagging a
shape-based generalization (`calendar-tax-year`/`split-tax-year`, Option B)
as a longer-term cleanup once more jurisdictions' tax-filing schemas exist.
Not yet reviewed; the affected schema ships this cycle at the plain,
non-edition registry path rather than blocking on this proposal.

GSP-0020 was filed against GOV-582 (a follow-up from the GOV-381 DMV vertical
discovery pass — every process in that vertical has a published schema
except the International Driving Permit, blocked on this standards call
rather than more research). `authority` (§5.5) models "the government body
that owns the process," which does not fit the US International Driving
Permit: it is issued exclusively by AAA/AATA, private organizations the
Department of State has authorized under the 1949 Geneva Convention on Road
Traffic, not by DOS itself. It proposes an OPTIONAL `authority.operatedBy`
object (`name`/`abbreviation`/`url`/`basis`) that names the operating issuer
and its authorization basis without changing `authority.name`'s existing
meaning (the authorizing government body) — resolving the recurring
"government-authorized, privately-operated" pattern the issue's discovery
also flagged as likely broader than the IDP alone (accredited inspection
stations, treaty-designated notarial agents, etc.). CEO accept-into-
`spec/v0.3` sign-off recorded 2026-07-02 (GOV-582); `authority.operatedBy`
is folded into `spec/v0.3/govschema.schema.json` and `spec/v0.3/SPEC.md`
§5.5 in this same change, unlike the batch-5 GOV-373 fold-in, since it is a
single, small, additive member (same pattern GSP-0018 used).

GSP-0021 was filed against GOV-667, a spec prerequisite the GOV-664
federal→Florida→Miami-Dade plan (§4/§6) flagged: `jurisdiction.level`
already enumerates `municipal`, but nothing lets a schema *name* the
municipal/county body — `jurisdiction.subdivision` is scoped to ISO 3166-2,
which has no county layer, and the `id` path grammar/§13 rule 2 have no
county token to validate. It proposes an OPTIONAL `jurisdiction.locality`
object (`name`/`slug`) that requires `level: municipal` when present, a
documented (not regex-changed — the existing `id` pattern already permits
the extra segment) `us/<subdivision>/<locality-slug>/<authority>/<process>`
id layer, and a §13 rule 2 extension checking the locality path token
against `locality.slug`. Not yet reviewed — CEO sign-off requested via
interaction on GOV-667, per the one-way-door id-grammar precedent in
GSP-0001/0005/0011/0015/0018/0020.

## Considered and rejected

These candidates were evaluated and deliberately not advanced. Recording them
keeps the rejection on the record and avoids re-litigating without new evidence.

| Candidate | Disposition | Rationale |
| --------- | ----------- | --------- |
| Top-level `locale` member (GOV-61 item 7a) | **Out of scope** | Redundant with the existing `process.language` (§5.6, BCP 47). Revisit **only** if a concrete need emerges that a language tag alone cannot carry — e.g. a BCP-47 region/formatting requirement distinct from the source language. Reversible: re-open if a real case appears. |
