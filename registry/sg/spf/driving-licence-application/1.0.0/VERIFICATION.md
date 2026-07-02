# Verification record — `sg/spf/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official police.gov.sg Traffic Police
guidance page listed below. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `sg/spf/driving-licence-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Traffic Police, Singapore Police Force (SPF).
- **Primary source:** "Application, Replacement, and Renewal of Singapore
  Driving Licence" —
  <https://www.police.gov.sg/knowledge-hub/traffic/traffic-matters/application-replacement-and-renewal-of-singapore-driving-licence>
  — fetched live as **raw HTML** (not a summarized fetch) and converted to
  plain text for direct quotation, 2026-07-02 (page's own "Last updated on 03
  September 2025" footer). This single page supplied every field in this
  document: the test/training table for new applications, the applicant-group
  and channel/fee tables for application/replacement/renewal, the
  foreigner-renewal rejection criteria, and the age-65+ medical-certification
  and in-person-class rules.
- **Field extraction method:** a prose guidance page, not a fillable
  form/PDF — the same shape and method as
  `ca/on/mto/drivers-licence-renewal`, `sg/acra/sole-proprietorship-registration`,
  and `au/nsw/service-nsw/driver-licence-renewal`. Field names and enum
  values were derived from the page's own wording (quoted in each field's
  `sourceRef`).
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "You may apply for a valid Singapore Driving Licence online via our e-Services after passing the relevant tests."; "If your valid Singapore Driving Licence is lost, damaged, or defaced, you will need to have it replaced."; "Renewal of Photocard Driving Licence for Foreigners" | `applicationType` |
| "Apply via: e-Services / Log in using SingPass" (repeated in every How-to table) | `hasSingpassAccess` |
| "Singapore Citizens & Permanent Residents"; "Foreigners holding Valid work passes issued by the Ministry of Manpower (MOM); or Student / Long-Term Visit passes issued by the Immigration & Checkpoints Authority (ICA)" | `applicantGroup` |
| "Class of Licence" (test table); "2B, 2A, 2, 3, 3A" / "4, 4A, 5" (65+ renewal tables) | `licenceClassApplied`, `renewalLicenceClasses` |
| "All: Basic Theory Test" | `hasPassedBasicTheoryTest` |
| "All: ... Final Theory Test" | `hasPassedFinalTheoryTest` |
| "Riding Theory Test (for motorcycle learner motorists only)" | `isApplyingForMotorcycleClass`, `hasPassedRidingTheoryTest` |
| "All: ... Simulator Training" | `hasCompletedSimulatorTraining` |
| "For Class 2B only: Expressway Familiarisation Ride" | `hasCompletedExpresswayFamiliarisationRide` |
| "All: ... Practical driving or riding test" | `hasPassedPracticalTest` |
| "If you enrolled as a learner motorist after 1 Oct 2018, your photograph taken then will be printed... If you enrolled before 1 Oct 2018, please have your photograph taken at the driving centre before applying" | `enrolledAsLearnerAfterOct2018` |
| "If your valid Singapore Driving Licence is lost, damaged, or defaced" | `replacementReason` |
| "Apply via: e-Services / Log in using SingPass" (Replacement/Renewal tables, no named field beyond this) | `existingLicenceNumber` (see honesty flag below) |
| "All foreigners holding valid work permits (WP) or passes"; "the work permit / employment pass / student pass / dependent pass and/or other documents showing your extended stay in Singapore" | `foreignerPassType` |
| "The expiry date of your Singapore driving licence has exceeded more than 3 years" | `licenceExpiryExceedsThreeYears` |
| "the expiry date of the work permit / employment pass / student pass / dependent pass and/or other documents showing your extended stay in Singapore is less than one month from the date of application" | `passValidityLessThanOneMonthFromApplicationDate` |
| "If you possess a valid Singapore Driving Licence and are 65 years old and above, you need to be certified fit to drive by a Singapore registered medical practitioner" | `applicantAge65OrAbove` |
| "2B, 2A, 2, 3, 3A: e-Services" vs "4, 4A, 5: Singapore Safety Driving Centre" (65+ renewal tables) | `renewalIncludesHeavyOrBusClass` |
| "Completed medical examination reports must be submitted online to the Traffic Police in JPEG or PDF format... After doing so, you may renew of your driving licence." | `medicalExaminationReportAccepted`, `medicalExaminationReport` (document) |

## Honesty flags (deliberate, recorded rather than glossed over)

- **Open question: why is "Renewal" on this page scoped to foreigners
  only?** The source's own "Content Overview" lists exactly three sections:
  "Applying for a Singapore Driving Licence" (all groups), "Replacing a
  Singapore Driving Licence" (all groups), and "Renewal of Photocard Driving
  Licence for Foreigners" (foreigners only, by its own title). No Singapore
  Citizen/Permanent Resident renewal path appears anywhere on this page. This
  is plausibly because SC/PR licences do not carry a fixed expiry the way a
  foreigner's photocard licence (tied to their pass validity) does — but this
  document does not assert that reason, since it was not independently
  confirmed against another SPF/government source this cycle. This document
  therefore narrows its `renewal_foreigner_photocard` branch to foreigners
  only, matching exactly what the source states, rather than guessing at an
  SC/PR renewal flow that may not exist or may live on a different page.
- **`existingLicenceNumber` — inferred field, not a direct quote.** No table
  or paragraph on this page names a specific input field beyond "e-Services /
  Log in using SingPass." Included by analogy to every other online
  driver-licence renewal/replacement in this registry (`au/nsw/service-nsw`,
  `ca/on/mto`, `us/ca/dmv`, `gb/dvla`, `nz/nzta`), each of which requires the
  current licence number to identify the applicant's record — a reasonable
  inference, not as well-sourced as the eligibility-list fields.
- **`isApplyingForMotorcycleClass` asked directly, not derived from
  `licenceClassApplied`.** It is common knowledge in Singapore's licensing
  scheme that classes 2B/2A/2 are motorcycle classes, but this exact mapping
  is not spelled out on this source page (which only says the Riding Theory
  Test applies "for motorcycle learner motorists only," without naming which
  classes that means). Rather than hard-coding an unsourced class-to-vehicle-
  type table into a `requiredWhen` condition, this document asks the
  applicant directly. A future revision should confirm the exact class list
  against an independent SPF/LTA source and could then collapse this into a
  derived condition on `licenceClassApplied` if confirmed.
- **Ambiguous table-column extraction for the new-application test/training
  table.** The source's HTML table renders, after tag-stripping, as a flat
  list: "All / Basic Theory Test, Riding Theory Test (...), Final Theory
  Test, Simulator Training, Practical driving or riding test / For Class 2B
  only / Expressway Familiarisation Ride" — the "Tests" and "Mandatory
  Training Programme" column boundary for the "All" row is not recoverable
  with certainty from the extracted text (i.e., whether "Simulator Training"
  is itself a "Test" or the sole "Mandatory Training Programme" entry for all
  classes). This document conservatively treats every item in that row as
  jointly required for all classes (`hasPassedBasicTheoryTest`,
  `hasPassedFinalTheoryTest`, `hasCompletedSimulatorTraining`,
  `hasPassedPracticalTest`), which does not depend on resolving the column
  boundary, and keeps `hasCompletedExpresswayFamiliarisationRide` correctly
  scoped to Class 2B only (that row is unambiguous). A future revision should
  re-render the live page (not just its text layer) to confirm the exact
  column structure.
- **No fee/payment fields.** Fees ($50 for application/renewal, $25 for
  replacement) and payment methods (eNETS, Visa, MasterCard, Debit Card) are
  documented on the source but deliberately excluded, the same convention
  used by `sg/acra/sole-proprietorship-registration` and
  `au/nsw/service-nsw/driver-licence-renewal`'s concession-fee handling — a
  fee fact to exclude from fields, not model as something the applicant
  supplies.
- **In-person paths out of scope, not modelled as fields.** The driving-centre
  test-booking/training process, the in-person endorsement-sticker process
  for an existing holder adding a new class, and the mandatory in-person
  Singapore Safety Driving Centre renewal path for 65+ Class 4/4A/5 renewal
  (gated by `renewalIncludesHeavyOrBusClass`) are all explicitly out of scope
  and exited via `to: null` transitions rather than partially modelled.

## Path to `verified`

1. Independently confirm the SC/PR driving-licence renewal question above
   (whether SC/PR licences simply do not expire, or whether a renewal path
   exists on a different SPF/LTA source not reviewed this cycle) before
   asserting a reason one way or the other.
2. Confirm the exact class-to-vehicle-type mapping (which classes are
   "motorcycle" classes for Riding Theory Test purposes) against an
   independent SPF/Land Transport Authority source, and consider deriving
   `isApplyingForMotorcycleClass` from `licenceClassApplied` if confirmed.
3. Re-render the source page's test/training table (not just its extracted
   text layer) to resolve the "Tests" vs. "Mandatory Training Programme"
   column-boundary ambiguity flagged above.
4. Drive the live, Singpass-authenticated SPF e-Services flow itself (post-
   login) with a mock/test account to confirm the exact screen-by-screen
   field list, replacing the `existingLicenceNumber` inference with a
   directly observed field.
