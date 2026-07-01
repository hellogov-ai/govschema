# GSP-0012: Schema maturity levels (badge model)

- **Status:** Proposed — targets `spec/v0.3`. Pending CEO accept-into-v0.3
  sign-off (requested on [GOV-316](/GOV/issues/GOV-316)).
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-316, drafted per RFC 0003 §2 (GOV-302)
- **Affects:** `spec/vN/govschema.schema.json` (new top-level OPTIONAL
  `maturity` member), §9 (lifecycle status and verification, sibling
  section), a new `practices/maturity-self-assessment-v1.md`, `tools/` (a
  future `tools/validate-maturity.mjs`), every consumer deciding whether a
  schema is rich enough to drive a real agent interaction. **Depends on**
  GSP-0013 (`Condition` type, `steps[].transitions`, the `to: null` exit
  sentinel) and GSP-0014 (`documents[]`, `fieldRole`) — both already accepted
  into `spec/v0.3` — since the Agent-Ready tier's criteria are read directly
  off constructs those two GSPs define.
- **One-way-door:** yes. This introduces a new top-level member and a
  graduated badge vocabulary that other tooling (a future
  `tools/validate-maturity.mjs`, and any agent-developer-facing "is this
  schema good enough" gate) will come to depend on — a new axis of what
  "ready" means, alongside `status`'s existing "checked" axis. Per
  [GOVERNANCE.md](../../GOVERNANCE.md) this requires maintainer (CEO)
  sign-off before acceptance. Filing this proposal document is not that act —
  ordinary two-way-door PR review, exactly as GSP-0001–0015 were filed.
  Nothing in `spec/vN` changes until a separate CEO sign-off interaction
  accepts it.

## Problem

`status` (`draft`/`verified`/`deprecated`, SPEC §9) answers "has this been
checked against the source?" It says nothing about "is this rich enough for
an agent to safely drive a real interaction?" A flat, unverified,
single-field form and a fully-branching, richly-verified, browser-tested
process both currently look the same shape-wise: a JSON object with `fields`
and an optional `steps`. An agent developer deciding whether to build against
a given registry entry — and a producer deciding what to invest in modeling
next — both need a declared, checkable answer to "how far along the
execution-readiness path is this schema?" before `status: verified` alone can
tell them.

## Design (non-normative sketch)

### 1. The `maturity` top-level member

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
  today's behavior. This keeps the member additive and low-stakes to skip,
  the same posture GSP-0011 took for `mapping.json`'s presence (SPEC §13.5,
  "absence has no bearing").
- `level` — REQUIRED when `maturity` is present. One of
  `structural-reference` / `verified-schema` / `agent-ready-schema` /
  `execution-tested-schema` — a **derived** value, not an independent input,
  so it cannot disagree with `criteria`: `level` MUST equal the highest tier
  in `criteria` whose value, and every lower tier's value, is `true` (mirrors
  the `id`/path consistency discipline in SPEC §10 rule 1: one fact, asserted
  once). See §2's cumulative-ladder rule below for why "and every lower
  tier's" matters.
- `criteria` — REQUIRED object, one boolean per tier (§2), keyed exactly as
  shown above.
- `method` — REQUIRED. Identifier of the assessment practice used, resolved
  the same way `verification.method` resolves against `practices/`
  (SPEC §9.2). This proposal introduces the first such practice,
  `maturity-self-assessment-v1` (producer self-declares `criteria` at
  authoring time); a future automated practice could name a different value
  without changing this member's shape.
- `assertedBy` / `assertedAt` — REQUIRED when `maturity` is present. Named
  `asserted*`, not `verified*`, on purpose: unlike `verification.verifiedBy`
  (a third party independently confirming a fact), `maturity` starts as a
  producer's own claim about their own document — the asserted-then-checked
  pattern in §3 is what earns it trust over time, not a human reviewer's
  signature at declaration time.
- `maturity` is **orthogonal to `status`**: a `draft` schema can still be
  richly modeled (`agent-ready-schema` shape, just not yet source-confirmed);
  a `verified` schema can still be flat (`structural-reference`/
  `verified-schema` shape with no branching to model). Consumers needing both
  signals read both; neither subsumes the other.

### 2. The four tiers and their criteria

| Tier (`criteria` key) | Criteria | Mechanically recomputable today? |
|---|---|---|
| **Structural Reference** (`structuralReference`) | `fields[]` present, each entry carrying `type`; exactly one `source` cited (SPEC §8). | Yes, in full — this is already required of every conforming document by SPEC §6/§8 (`validation` itself stays optional per §6.1; this rung does not require it). This rung exists to keep the ladder complete and give consumers an explicit floor to point at, not because it discriminates among registry entries: any document that validates against the meta-schema already clears it. |
| **Verified Schema** (`verifiedSchema`) | `status: verified` and `verification.lastVerifiedAt` current per the named practice's cadence. | Yes, in full — unchanged, already a normative rule (SPEC §9.1, §10 rule 5). |
| **Agent-Ready Schema** (`agentReadySchema`) | Verified Schema, **plus**: every real branch in the source process is expressed as `steps[].transitions` (GSP-0013 §1–§2), not left in step `description` prose; every real document/eligibility/payment/attestation requirement is expressed in `documents[]` (GSP-0014 §1) or `fieldRole: eligibility` (GSP-0014 §2); every terminal/exit state the source defines is reachable via an explicit `to: null` transition (GSP-0013 §4), none silently absent. | Partly. A validator can confirm the *shape* is present and internally consistent — e.g. `steps[].transitions` exists and uses the `Condition` grammar wherever a step has more than one plausible destination, `documents[]` is non-empty whenever the source process has any file/eligibility/payment/attestation requirement to speak of, at least one `to: null` transition is reachable in the step graph when `steps[]` is present. It cannot confirm *completeness against the live source* — that the producer did not simply miss a branch, a document, or an exit state the source actually has. That half remains a producer assertion, exactly the same boundary SPEC §9.2 already draws for `verification`: the practice a `method` names defines the *how*, and the schema shape can only ever prove a claim was recorded, not that the underlying review was exhaustive. |
| **Execution-Tested Schema** (`executionTestedSchema`) | Agent-Ready Schema, **plus**: a sibling `mapping.json` (GSP-0011, accepted) exists whose own `verification` (SPEC §13.3) is current under `selector-probe-v1`; a `conformance/<id>/<version>/browser-flow.json` fixture exists and a non-submitting harness reaches its terminal "review, do not submit" state without error. | Yes, once both companion artifacts exist. `mapping.json`'s own verification record and a conformance fixture's pass/fail result are themselves machine-checkable facts (SPEC §13.3; the fixture format is GSP-0016's concern, not yet accepted); `tools/validate-maturity.mjs` would read those results rather than re-deriving anything new. Until GSP-0016 defines the fixture format, this tier's second criterion has a named slot but no implementable check — a tooling-sequencing gap, not a blocker to accepting this GSP's shape (the same posture GSP-0011 took toward the not-yet-decided GSP-0010 `extensions` pilot). |

- **Cumulative ladder, no gaps.** `criteria` MUST NOT assert a higher tier
  `true` while a lower tier is `false` (e.g. `executionTestedSchema: true`
  with `agentReadySchema: false` is invalid). The four tiers are a strict
  ladder, not four independent switches — a normative rule this GSP proposes
  for SPEC §10, alongside the existing `id`/path and flow-reference-integrity
  rules.
- `level` (§1) is read directly off this ladder: the highest key that is
  `true`, given the rule above guarantees every key below it is also `true`.

### 3. The asserted-then-checked pattern

Same shape as `verification` (SPEC §9.2 precedent), reused for a second axis
rather than inventing a new trust primitive:

- A producer declares `maturity` at authoring time under
  `maturity-self-assessment-v1` — an honest, source-informed claim, exactly
  as `verification.notes` today can honestly state "not yet independently
  re-verified" rather than overclaim.
- A future `tools/validate-maturity.mjs` recomputes the mechanically-checkable
  half of `criteria` (the "Yes" and "Partly" columns in §2's table) from the
  document's actual shape and flags a mismatch in CI — exactly as a lapsed
  `verification.nextReviewBy` today pushes a document back toward `draft`
  (SPEC §9.1).
- The tool is **one-directional**: it can prove a producer's asserted `true`
  is unsubstantiated (shape missing) and demote the claim, but it never
  promotes a producer's own `false` to `true` — recomputation tightens an
  overclaim, it never asserts a claim the producer didn't make. This mirrors
  `verification`'s own direction of drift: a lapsed review moves a document
  toward `draft`, never the reverse without an actual re-review.
- CI severity (hard-fail vs. warn on a detected mismatch) is a tooling/CI
  policy call for the Founding Engineer once `tools/validate-maturity.mjs`
  exists, not a spec-shape decision this GSP needs to resolve.

### 4. Relationship to GSP-0013 and GSP-0014

This GSP invents no schema shape of its own beyond `maturity` and its
`criteria` object — the Agent-Ready tier's criteria are a direct read of
constructs GSP-0013 (`Condition`, `steps[].transitions`, the `to: null` exit
sentinel) and GSP-0014 (`documents[]`, `fieldRole`) already define, per RFC
0003 §12's recommended sequencing (both land before this GSP is drafted). The
Execution-Tested tier similarly reads off GSP-0011 (`mapping.json`,
accepted) and, once it exists, GSP-0016 (conformance fixtures, not yet
filed) — this GSP names the slot each of those artifacts fills without
redefining any of them.

## Open questions

- **A stronger machine-checkable proxy for source completeness.** Whether the
  Agent-Ready tier's "every real branch/document/exit-state" half should get
  a sharper heuristic (e.g. flagging step `description` prose that reads like
  an unmodeled conditional) rather than remaining an honest self-assessment.
  Recommend not inventing this now — a fuzzy prose-mining heuristic risks
  false positives/negatives that are worse than admitting this half stays a
  producer claim, the same posture SPEC §9.2 already takes for
  `verification`'s "how." Revisit if a concrete false-claim incident makes
  the gap costly in practice.
- **`tools/validate-maturity.mjs` CI severity** (block merge vs. warn on a
  detected mismatch) — flagged in §3, a Founding Engineer tooling-policy call
  once the validator exists, not a spec-shape question.
- **Backfill obligation.** Do the schemas authored before this GSP's
  acceptance need a retroactive `maturity` declaration? Recommend no —
  `maturity` is OPTIONAL and additive, the same forward-only rollout pattern
  GSP-0011 (`mapping.json`) and GSP-0015 (`CHANGELOG.md`/`changes.json`) both
  used: authors declare it starting with the first version bump authored
  after acceptance.

## Decision requested

CEO accept-into-`spec/v0.3` sign-off is requested on:

1. The `maturity` top-level member as designed (§1): OPTIONAL,
   `level`/`criteria`/`method`/`assertedBy`/`assertedAt`, `level` derived as
   the highest tier in `criteria` whose value and every lower tier's value
   are `true`.
2. The four tiers and their exact criteria (§2) — Structural Reference /
   Verified Schema / Agent-Ready Schema / Execution-Tested Schema — including
   the new normative rule that `criteria` forms a cumulative ladder with no
   gaps (proposed addition to SPEC §10).
3. The asserted-then-checked pattern (§3): producer self-assessment today
   under a new `maturity-self-assessment-v1` practice, with a future
   `tools/validate-maturity.mjs` recomputing the mechanically-checkable half
   of `criteria` and flagging mismatches — without blocking the
   Execution-Tested tier's schema-shape acceptance on GSP-0016 (conformance
   fixtures) landing first.

Requested via `ask_user_questions` on [GOV-316](/GOV/issues/GOV-316).
