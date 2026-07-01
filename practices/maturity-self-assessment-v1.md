# Practice: maturity-self-assessment-v1

**Identifier:** `maturity-self-assessment-v1`
**Type:** producer self-declaration
**Status:** proposed (GSP-0012, not yet accepted)

## Purpose

Confirm that a document's declared `maturity.criteria` (GSP-0012) honestly
reflects the document's actual shape and how it was assessed. Unlike
`manual-source-review-v1`, this practice does not confirm the document
matches the *live government source* — that is `verification`'s job (SPEC
§9). This practice confirms the document's *execution-readiness claim* is
truthful given what it actually models.

## Procedure

1. **Structural Reference.** Confirm `fields[]` is present, every entry
   carries `type`, and exactly one `source` is cited. (`validation` itself
   stays optional per SPEC §6.1; this check does not require it.) If true,
   set `criteria.structuralReference: true`.
2. **Verified Schema.** Confirm `status: verified` and
   `verification.lastVerifiedAt` is current per the named verification
   practice's cadence. If true, set `criteria.verifiedSchema: true`.
3. **Agent-Ready Schema.** With Verified Schema true, confirm:
   - every real branch in the source process is expressed as
     `steps[].transitions` (GSP-0013), not left in step `description` prose;
   - every real document/eligibility/payment/attestation requirement is
     expressed in `documents[]` or `fieldRole: eligibility` (GSP-0014);
   - every terminal/exit state the source defines is reachable via an
     explicit `to: null` transition (GSP-0013 §4).

   The first two checks require re-reading the live source alongside the
   document — the same diligence `manual-source-review-v1` already applies,
   extended to ask "is every branch/requirement modeled," not just "is every
   modeled field correct." If true, set `criteria.agentReadySchema: true`;
   otherwise `false`, and note what remains unmodeled in `maturity`-adjacent
   `notes` or the document's own `description` fields.
4. **Execution-Tested Schema.** With Agent-Ready Schema true, confirm a
   sibling `mapping.json` exists with a current `selector-probe-v1`
   verification, and a `conformance/<id>/<version>/browser-flow.json` fixture
   exists and the non-submitting harness reaches its terminal state without
   error. If true, set `criteria.executionTestedSchema: true`.
5. **Record the result.** Set `maturity.level` to the highest tier whose
   criteria, and every lower tier's criteria, are `true`. Set
   `maturity.method: "maturity-self-assessment-v1"`, `assertedBy`, and
   `assertedAt` to today.

## Limitations

This is a self-assessment: it depends on the producer's own diligence and is
not an independent third-party check, unlike `manual-source-review-v1`'s
review discipline. It also cannot, by itself, prove *completeness* against
the source for the Agent-Ready tier (see GSP-0012 §2's table) — a future
`tools/validate-maturity.mjs` can recompute the mechanically-checkable half of
`criteria` from the document's shape and flag a mismatch, but the "did the
producer model every real branch" claim remains asserted, not machine-proven,
the same limitation `verification` already carries for its own "how."
