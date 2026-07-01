# Verification record — `us/irs/employer-identification-number-ss4` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Sources examined

- **Document `(id, version)`:** `us/irs/employer-identification-number-ss4` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Internal Revenue Service (IRS)
- **Primary source URL:** <https://www.irs.gov/forms-pubs/about-form-ss-4>
- **Official form id:** `Form SS-4 (Rev. December 2025)`
- **Form PDF:** <https://www.irs.gov/pub/irs-pdf/fss4.pdf> — downloaded and decoded
  directly (zlib-decompress the PDF's content streams, then extract the
  parenthesized `Tj`/`TJ` text-showing operands; see the repo's PDF-extraction
  convention). 93 of 182 streams decompressed; all lines 1–18 and the Third Party
  Designee / signature blocks were recovered as plain text and transcribed
  field-by-field from that output, not from a summarized rendering.
- **Online-application eligibility/hours/session rules:**
  <https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online>
- **Application-channel eligibility and processing times (fax/mail/telephone):**
  the "How To Apply" section of the Form SS-4 instructions,
  <https://www.irs.gov/instructions/iss4>
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

Form SS-4 is revised periodically (the current revision is December 2025, prior
revisions include January 2025 and December 2023) but does **not** carry a fresh
required edition each tax/award year the way Form 1040, Form 4868, or FAFSA do —
applying the GSP-0005 §2 coexistence test: an EIN application isn't filed "for" a
particular year, its fields don't vary by year, and there is no scenario where two
editions of the SS-4 data model need to coexist for the same applicant. This
document is therefore authored at the plain (non-edition) registry path,
`registry/us/irs/employer-identification-number-ss4/1.0.0/`, the same call made for
`vehicle-tax` and `marriage-allowance` (see `schema-authoring-batches` project
notes). A future SS-4 revision that changes the field set ships as a new
`version`, not an edition.

## What was confirmed against the source

- **Form identity and purpose.** Form SS-4 is the application for an EIN, the
  9-digit federal tax identifier, filed by employers, sole proprietors,
  corporations, partnerships, trusts, estates, and other entities. Confirmed
  against the "About Form SS-4" page and the form's own title block.
- **Full line-by-line field set (lines 1–18).** Transcribed directly from the
  decoded PDF text, including every checkbox-group's option list:
  `entityType` (line 9a, 16 options including `sole_proprietor`, `partnership`,
  `corporation`, `trust`, `remic`, etc.), `reasonForApplying` (line 10, 9 options),
  and `principalActivity` (line 16, 12 options). The "specify" sub-fields attached
  to several checkbox options (`entityTypeOtherSpecify`,
  `entityTypeCorporationFormNumber`, `reasonForApplyingSpecify`,
  `principalActivityOtherSpecify`) and the conditional LLC (8b/8c) and
  incorporation-state (9b) fields were likewise transcribed from the source text,
  not inferred.
- **Third Party Designee and signature blocks.** Transcribed from the form's final
  page; the designee-authority-terminates-at-EIN-issuance note and the
  responsible-party-must-be-an-individual rule (confirmed via the instructions'
  "How To Apply" section) are recorded in the relevant field `description`s.
- **Online-channel eligibility gate.** The IRS EIN online assistant requires the
  principal business to be in the U.S. or a U.S. territory and the responsible
  party to hold an SSN or ITIN (not an EIN); confirmed against the online-EIN
  eligibility page and stated in the document `description` and the
  `responsiblePartyTaxId` field description. This document models the Form SS-4
  field set common to every channel (online, fax, mail, and — international
  applicants only — telephone), not the online assistant's screen-by-screen
  interview specifically.
- **Alternative channels for out-of-scope applicants.** Fax (4-business-day
  turnaround), mail (~4-week turnaround), and telephone (international applicants
  without U.S. legal residence/principal place of business only) are documented in
  the instructions' "How To Apply" section; these are process facts recorded here,
  not modelled as schema fields (the schema is channel-agnostic).
- **Responsible-party requirement.** Per the instructions, the responsible party
  must be an individual (a natural person), not an entity, except where the
  applicant itself is a government entity — recorded in `responsiblePartyName`'s
  description. This requirement applies regardless of the reason for applying,
  which is why `responsiblePartyName`/`responsiblePartyTaxId` are marked `required`
  even though several other line items vary by the reason-for-applying branch (see
  the "Do I Need an EIN?" table on page 2 of the form, which lists a different
  subset of lines to complete depending on the applicant's situation).

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, numeric minimums, and the conditional-field
notes called out in field descriptions):

```json
{
  "entityLegalName": "Riverside Coastal Goods LLC",
  "tradeName": "Riverside Goods",
  "mailingAddressLine1": "482 Harbor View Drive, Suite 210",
  "mailingAddressCity": "San Diego",
  "mailingAddressState": "CA",
  "mailingAddressPostalCode": "92101",
  "principalBusinessCountyAndState": "San Diego County, CA",
  "responsiblePartyName": "Maria Alejandra Torres",
  "responsiblePartyTaxId": "512334789",
  "isLLC": true,
  "llcMemberCount": 1,
  "llcOrganizedInUS": true,
  "entityType": "sole_proprietor",
  "reasonForApplying": "started_new_business",
  "reasonForApplyingSpecify": "Online retail of handmade coastal home goods",
  "businessStartDate": "2026-08-01",
  "accountingYearClosingMonth": "december",
  "highestExpectedEmployees": 0,
  "previouslyAppliedForEIN": false,
  "applicantNameAndTitle": "Maria Alejandra Torres, Managing Member",
  "applicantPhone": "+16195550142"
}
```

This models a single-member LLC (taxed as a sole proprietorship, the most common
individual-formed-entity case, consistent with `us/ca/sos/business-entity-llc-formation`'s
scope) applying online for a brand-new business with no employees yet. The
scenario exercises the `isLLC` → `llcMemberCount`/`llcOrganizedInUS` conditional
pair and the `reasonForApplying: started_new_business` → `reasonForApplyingSpecify`
pair. A one-off Node script (`node:fs` + a hand-rolled per-field validator, not
committed to the repo) confirmed every populated field satisfies its `type` and
`validation` constraint and that no required field was left unset:

```
PASS — mock single-member-LLC 'started new business' EIN application satisfies the schema's field-level constraints.
```

Both registry validators were run against the schema document itself (not the mock
data) and pass:

```
$ node tools/validate.mjs registry/us/irs/employer-identification-number-ss4/1.0.0/schema.json
ok   registry/us/irs/employer-identification-number-ss4/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/irs/employer-identification-number-ss4/1.0.0/schema.json
ok   registry/us/irs/employer-identification-number-ss4/1.0.0/schema.json [v0.1]
```

## Corrections from independent review

The GOV-284 review gate's independent re-derivation of the field set from the
live Form SS-4 PDF (per `manual-source-review-v1` Procedure step 2) found one
content discrepancy, corrected here:

- **`isLLC` (line 8a) requiredness.** The initial authoring marked `isLLC` as
  `required: true`, describing it as required on "essentially every path." The
  Form SS-4 "Do I Need an EIN?" routing table (page 2) contradicts this: it
  excludes line 8a from the required-lines list for 3 of the 9 applicant
  situations — plan administrator, estate administrator, and state/local
  tax-reporting agency. `isLLC` is now `required: false` with a conditional note
  in its `description`, matching the pattern already used for the dependent
  `llcMemberCount`/`llcOrganizedInUS` (lines 8b/8c) fields. Every other checked
  item — the 16/9/12-option enums (`entityType`/`reasonForApplying`/
  `principalActivity`), the Form 944 election thresholds, and the line-1–18 +
  Third Party Designee + signature-block field mapping — matched the decoded
  PDF text and required no change.

## What is NOT yet independently verified

- **The full "Do I Need an EIN?" line-subset table** (form page 2) documents nine
  different applicant situations, each requiring a different subset of lines 1–18.
  v0.1 has no conditional-flow construct (GSP-0004, not yet accepted), so this
  document models every line as a single flat field set with `required: true` only
  on the items common to essentially every path (`entityLegalName`,
  `mailingAddressLine1/City`, `responsiblePartyName`, `responsiblePartyTaxId`,
  `entityType`, `reasonForApplying`, `previouslyAppliedForEIN`,
  `applicantNameAndTitle`, `applicantPhone`) and `required: false` with a
  conditional note on the rest. This is a reasonable flattening, not a verified
  line-subset mapping for all nine situations. `isLLC` (line 8a) is a case in
  point and was corrected during independent source review (see
  "Corrections from independent review" below): the table excludes line 8a for
  three of the nine paths (plan administrator, estate administrator, state/local
  tax-reporting agency), so it is `required: false` with a conditional note, not
  `required: true`.
- **Constraint patterns** (SSN/EIN format, ZIP code, E.164 phone) are reasonable
  encodings, not citations of a published IRS validation rule.
- **The online EIN assistant's actual screen-by-screen interview** (question
  order, exact wording, branching logic) was not directly observed — unlike the
  GB DVLA photocard-renewal schema's pre-login screen crawl, IRS.gov's EIN
  assistant requires an active session to reach past the eligibility gate, so this
  document is sourced from the paper Form SS-4 and its instructions, which the IRS
  states the online interview mirrors.
- **State-specific downstream requirements** (e.g. a state also requiring its own
  tax registration after the federal EIN is issued) are out of scope; this document
  covers the federal EIN application only.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form SS-4 (Rev. 12-2025) PDF and, ideally, an observed
run of the online EIN assistant's interview screens, confirms the sources are still
authoritative, resolves any discrepancy by shipping a new schema **version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the outcome
here plus sets `status: verified` with a current `verification.lastVerifiedAt` /
`nextReviewBy`. This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when the
IRS publishes a new Form SS-4 revision.
