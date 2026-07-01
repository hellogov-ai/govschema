# Verification record — `us/irs/employer-identification-number-ss4` v2.2.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0`/`v2.0.0`/`v2.1.0`'s own `VERIFICATION.md` files stay as the
authoring provenance for those versions and are not edited (VERSIONING.md §3
immutability); this is a fresh record for `v2.2.0`.

## Current claim

- **`status`:** `verified` (advanced from `draft` — this version performs the
  full independent field-by-field re-review the practice requires; see
  "Independent second-reviewer pass" below)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`
- **`maturity.level`:** `agent-ready-schema` (new — see "Maturity declaration"
  below)

This closes out [GOV-404](/GOV/issues/GOV-404) (split from
[GOV-319](/GOV/issues/GOV-319), RFC 0003 §8 deliverable 3 of 5).

## Why this is a MINOR version, not PATCH or MAJOR

Two independent changes are bundled in this release:

1. **A label fix** (`principalAddressLine1`, see below) and a **verification
   refresh** (`status: draft` → `verified`, `lastVerifiedAt` refreshed). Per
   [VERSIONING.md](../../../../../VERSIONING.md) §1 and its "Status
   interaction" note, either of these alone is a PATCH: no change to the data
   contract, "re-verify against the live source with no field changes" and
   "fix `label`... or other annotations."
2. **The `maturity` top-level member, added for the first time** on this
   document (GSP-0012, folded into `spec/v0.3`). This is the first schema in
   the registry to declare `maturity` — no prior-version precedent exists for
   its own bump size, so this record sets one: `maturity` is a new OPTIONAL,
   additive top-level member, the same category `v2.1.0`'s own record placed
   `documents[]` in ("a new OPTIONAL field... a new step that does not alter
   existing required inputs" — VERSIONING.md §5.3-referenced MINOR rule). Any
   `2.1.0`-conforming applicant data remains valid under `2.2.0`; a consumer
   simply gains one more structured fact (the maturity badge) to act on. That
   makes the `maturity` addition MINOR-tier, which is the higher of the two
   bundled changes, so the release as a whole bumps `2.1.0` → **`2.2.0`**
   (MINOR), not a PATCH.

## Independent second-reviewer pass

Per the practice's Procedure steps 2–3, and per GOV-404's explicit instruction
that this be "a genuine independent second-reviewer pass — not the same
reviewer re-asserting the original authoring claim":

- **Source re-fetched fresh**, not assumed from prior records: the live Form
  SS-4 PDF (<https://www.irs.gov/pub/irs-pdf/fss4.pdf>), the "About Form SS-4"
  page, the EIN online-application eligibility page, and the Form SS-4
  instructions ("How To Apply" section), all retrieved 2026-07-01.
- **A different, higher-fidelity extraction method than prior versions used.**
  `v1.0.0`/`v2.0.0`/`v2.1.0`'s records describe decoding the PDF's content
  streams and reading `Tj`/`TJ` text-showing operators. Re-attempting that
  exact technique this pass found **zero** literal `Tj`/`TJ` operators
  anywhere in the decompressed streams — Form SS-4 is an XFA-dynamic PDF (its
  decompressed streams are dominated by XFA template XML: `caption`, `exData`,
  `textEdit`, `field name="f1_41"`, etc., not page content-stream text-showing
  operators), so that described technique could not actually have recovered
  the field labels the way its own prose claims. This pass instead used
  `pdfjs-dist`'s page `getTextContent()` (reads the true rendered page text,
  regardless of the PDF's internal AcroForm/XFA structure) plus
  `getAnnotations()` (to confirm the AcroForm field/widget layout matches the
  visible line numbering). This is a **methodology-provenance correction**,
  not a content defect: independently re-deriving the full page text this way
  and diffing it field-by-field against `schema.json` confirmed the
  previously-recorded field content itself was accurate (see below) — the
  prior records' *description of how* they got that content does not hold up
  to a literal repeat, but *what* they recorded checks out.
- **Full field-by-field comparison**, all 40 `fields[]` entries plus the two
  eligibility-gate fields, against the freshly-extracted Form SS-4 line text
  (lines 1–18, Third Party Designee, and signature block) and the online
  eligibility page: every `label`, `type`, `required`, `validation` (all three
  enum lists — `entityType`'s 16 options, `reasonForApplying`'s 9,
  `principalActivity`'s 12 — recounted and matched exactly, including the
  `wholesale_agent_broker`/`wholesale_other` distinction), and `sourceRef` was
  checked. One discrepancy found (below); every other entry matched.
- **Flow comparison** (Procedure step 3): the `steps[]` ordering and field
  grouping match the form's line ordering and section breaks (Third Party
  Designee, signature block). The `eligibility_check` step's two `to: null`
  exits still match the live online-assistant eligibility page's "Who can use
  this tool" / "You can't use this" wording, re-confirmed verbatim this pass.
- **`documents[].applicantSignature.statement`** re-confirmed verbatim against
  the freshly-extracted signature-block text: unchanged, exact match.
- **Cross-checked supporting facts** used in field `description`s, re-fetched
  live rather than trusted from prior records: the designee's-authority-
  terminates-at-EIN-issuance note ("The designee's authority terminates at the
  time the EIN is assigned and released to the designee." — instructions'
  Third Party Designee section) and the responsible-party-must-be-an-
  individual rule with its government-entity exception ("Unless the applicant
  is a government entity, the responsible party must be an individual... If
  you are applying for an EIN for a government entity, you may enter an EIN
  for the responsible party on line 7b.") — both still accurate as described.
- **Source currency re-confirmed**: the "About Form SS-4" page and the PDF's
  own header/footer both still read "Rev. December 2025" / "Rev. 12-2025" —
  no new revision since `v1.0.0` first authored this document.

## Discrepancy found and corrected

- **`principalAddressLine1` label.** The live form's line 5a caption reads
  "Street address (if different) (Don't enter a P.O. box.)" The prior label,
  "Street address (if different from mailing address)", paraphrased the first
  clause and silently dropped the second — the "don't enter a P.O. box"
  instruction was present only in the field's `description`
  ("Cannot be a P.O. box, unlike the mailing address"), not in `label` itself,
  which the practice's Procedure step 2 requires to "match the source
  wording." Corrected to `"Street address (if different) (don't enter a P.O.
  box)"`. No `type`/`required`/`validation`/`sourceRef` change — this is a
  label-only fix.

## Documentation-only correction (does not touch `schema.json`)

- **"Nine" applicant situations, corrected to thirteen.** `v1.0.0`'s
  "Corrections from independent review" section (carried forward by reference
  in every later version's "What is NOT yet independently verified") describes
  the Form SS-4 page 2 "Do I Need an EIN?" table as covering "nine different
  applicant situations." A fresh, full read of that table this pass counts
  **13 distinct `IF the applicant...` rows** (started a new business; hired
  employees; opened a bank account; changed type of organization; purchased a
  going business; created a trust; created a pension plan as a plan
  administrator; is a foreign person needing an EIN to comply with IRS
  withholding regulations; is administering an estate; is a withholding agent
  for nonwage income paid to an alien; is a state or local agency; is a
  single-member LLC; is an S corporation) — the "nine" in the older records
  conflates the row count with the table's nine numbered **footnotes**, which
  is a different thing. This is a correction to verification-record prose
  only; `schema.json` itself never states a situation count. The earlier
  records are immutable and are not edited (VERSIONING.md §3); this record
  states the corrected count for any future reviewer.
- **Substantively, the flat `required` model still holds against all 13
  rows, re-checked individually.** Every field this document marks
  `required: true` at the top level (`entityLegalName`, `mailingAddressLine1`,
  `mailingAddressCity`, `responsiblePartyName`, `responsiblePartyTaxId`,
  `entityType`, `reasonForApplying`, `previouslyAppliedForEIN`) falls inside
  every one of the 13 rows' "complete lines..." ranges — none of the 13
  situations excludes any of them. And `isLLC`'s `required: false` (the
  correction `v1.0.0` already made) is confirmed exactly right: line 8a is
  excluded from the required-lines list for exactly 3 of the 13 rows — plan
  administrator, estate administrator, and state/local tax-reporting agency —
  matching `v1.0.0`'s finding precisely, just against the corrected
  denominator (3 of 13, not 3 of 9). No `required` flag needed to change.

## Maturity declaration

Per [GSP-0012](../../../../../spec/proposals/0012-schema-maturity-levels.md)
and [`maturity-self-assessment-v1`](../../../../../practices/maturity-self-assessment-v1.md),
applying that practice's Procedure:

1. **Structural Reference** — `true`. `fields[]` is present, every entry
   carries `type`, and exactly one `source` is cited.
2. **Verified Schema** — `true`, as of this version: `status: verified` with
   `verification.lastVerifiedAt: 2026-07-01`, current per the practice's
   6-month cadence (`nextReviewBy: 2027-01-01`).
3. **Agent-Ready Schema** — `true`. Re-checked against the live source
   (not just the document's own shape) per the practice's step 3 instruction
   to re-read the source alongside the document:
   - The one real branch in the source process — the online-assistant
     eligibility gate — is expressed as `steps[].transitions` with real
     `Condition`s (GSP-0013), not left in prose. The "Do I Need an EIN?" table
     is **not** a branch with an exit: every one of its 13 rows concludes with
     completing and submitting Form SS-4 by some channel; none of them is a
     "don't apply" outcome. It varies which lines are required, which the
     flat `required`/`requiredWhen` model already captures (re-confirmed
     above) — there is no additional `steps[].transitions` branch this
     document is missing.
   - The one real attestation requirement (the perjury signature) is expressed
     in `documents[]`; the one real eligibility requirement (online-assistant
     access) is expressed via `fieldRole: eligibility` on
     `principalBusinessInUS`/`responsiblePartyHasSSNITIN` (GSP-0014). There is
     no payment requirement to model — Form SS-4 has no application fee — and
     no file-upload/identity-document requirement, both re-confirmed this
     pass (no fee is mentioned anywhere in the form, its instructions, or the
     online-assistant page).
   - Both terminal/exit states the source defines (ineligible for the online
     assistant on either eligibility-gate condition) are reachable via
     explicit `to: null` transitions with `exitReason`; neither is silently
     absent.
4. **Execution-Tested Schema** — `false`, and out of scope for this issue.
   `2.1.0/mapping.json` and `conformance/.../2.1.0/browser-flow.json` exist
   but are pinned to `schema.version: "2.1.0"` (SPEC §17 referential
   integrity) and were not carried forward to `2.2.0` — GOV-404 scopes this
   re-verification to the Agent-Ready tier only, not Execution-Tested.
   Advancing to `execution-tested-schema` would require authoring a
   `2.2.0`-pinned `mapping.json` and conformance fixture as separate,
   follow-on work; tracked as a future issue if desired, not implied by this
   record.

Per the ladder rule (GSP-0012 §2, SPEC §10), `criteria.agentReadySchema: true`
with every lower tier also `true` and `executionTestedSchema: false` derives
`maturity.level: "agent-ready-schema"`, matching the meta-schema's `oneOf`
constraint.

## Sources examined

- **Form PDF:** <https://www.irs.gov/pub/irs-pdf/fss4.pdf>, retrieved
  2026-07-01, extracted via `pdfjs-dist` page text + annotation content
  (see "Independent second-reviewer pass" above for why this pass changed
  extraction method).
- **About Form SS-4:** <https://www.irs.gov/forms-pubs/about-form-ss-4>,
  retrieved 2026-07-01 — still "Rev. 12/2025," still the EIN application.
- **Online EIN assistant eligibility page:**
  <https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online>,
  retrieved 2026-07-01.
- **Form SS-4 instructions:** <https://www.irs.gov/instructions/iss4>,
  retrieved 2026-07-01 — "How To Apply" section (fax/mail/telephone
  channels), Third Party Designee authority-termination note, responsible-
  party-individual rule and government-entity exception.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (Standards Engineer — independent
  second-reviewer pass, per GOV-404's requirement that this not be the same
  reviewer re-asserting the original authoring claim)

## Re-verification

Per the practice's Cadence, `nextReviewBy` is **2027-01-01** (6 months).
Re-check the Form SS-4 PDF, the "About Form SS-4" page, the online-assistant
eligibility page, and the instructions' "How To Apply" section on or before
that date, or sooner if the IRS publishes a new Form SS-4 revision.
