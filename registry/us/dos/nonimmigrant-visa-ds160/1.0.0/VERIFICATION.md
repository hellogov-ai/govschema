# Verification record — `us/dos/nonimmigrant-visa-ds160` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`maturity.level`:** `structural-reference`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

## Why this document uses the sourced-inventory technique

The live DS-160 wizard runs at `ceac.state.gov/genniv` and requires an
authenticated session scoped to a specific interview post before any question
is shown. There is no sandbox or test account in this environment, and
fabricating one would mean submitting an invented identity claim into a live
federal visa-processing system — out of bounds under the same discipline
applied to every other login-gated schema in this registry (RealMe, NRIC,
Steuer-ID, IDP online channels). Per this issue's instruction, the same
**sourced-inventory technique** proven on [GOV-660](../../../../../registry/nz/dia/realme-verified-identity/1.0.0/VERIFICATION.md)
(nz/dia/realme-verified-identity) was applied: find the authority's own
published inventory of the question set rather than a live walkthrough.

## Sources examined

1. **The actual OMB-cleared DS-160 form text** (OMB Control Number
   1405-0182, form edition dated 2010-2011) — retrieved as a law-firm-hosted
   reproduction of the printed/PDF rendering of the form and decoded
   field-by-field from the PDF's own compressed text streams (the same
   zlib-stream-plus-parenthesis-regex technique used for the Form DS-64 PDF
   in GOV-282). This is the **primary, highest-confidence source**: it is the
   government's own form text as cleared under the Paperwork Reduction Act,
   not a paraphrase. It supplied the section order, the great majority of
   field labels, and the verbatim 23-question Security and Background block
   current as of that edition.
2. **travel.state.gov's current DS-160 overview and FAQ pages** — confirmed
   the form's structure and purpose are unchanged (same 11 core sections,
   same post-submission flow), and supplied the "last five U.S. visits",
   "filed an immigrant petition with USCIS", and browser-support details.
3. **Department of State "Frequently Asked Questions on Social Media
   Identifiers in the DS-160 and DS-260" (June 4, 2019)** — a primary
   Enhanced Vetting policy document confirming the DS-160 was updated,
   effective 31 May 2019, to collect social media identifiers, additional
   phone numbers, and additional email addresses, each covering the
   preceding five years; passwords are never requested; certain diplomatic/
   NATO visa classes are exempt.
4. **A secondary compilation of current DS-160 security/background
   questions (immihelp.com)** — used only to identify specific post-2011
   additions to the Security and Background block (the human-trafficking
   family-benefit criminal questions and the forced-abortion/sterilization
   and coerced-organ-transplantation security questions) that are not present
   in the 2010-2011 primary form text. These fields are individually flagged
   in their `sourceRef` as lower-confidence than their verbatim-sourced
   siblings.
5. **DS-160 form fee schedule** was deliberately NOT encoded as schema data
   (fees change and are not part of the applicant-facing question set); see
   travel.state.gov's Fees for Visa Services page for current amounts.

Retrieved: 2026-07-02, all four sources fetched live with no access block
encountered.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **Personal Information 1** — surnames, given names, other names used, native-alphabet name, DOB, sex, marital status, place of birth | `surnames` … `countryOfBirth` |
| **Personal Information 2** — nationality, other nationality, national ID / SSN / taxpayer ID | `nationality` … `usTaxpayerIdNumber` |
| **Address and Phone Information** — home/mailing address, phone numbers, email | `homeAddressLine1` … `emailAddress` |
| **2019 Enhanced Vetting additions** — additional phone numbers, additional email addresses, social media identifiers, all covering 5 years | `usedAdditionalPhoneNumbersLastFiveYears` … `socialMediaIdentifiers` |
| **Passport Information** — number, book number, issuing authority/place/dates, lost/stolen | `passportNumber` … `lostPassportIssuingCountryAuthority` |
| **Travel Information** — principal applicant, purpose of trip, U.S. stay address, payer, travel plans | `isPrincipalApplicant` … `intendedDepartureDate` |
| **Temporary Worker Visa Information** (conditional supplemental page) | `temporaryWorkerEmployerName` … `petitionReceiptNumber` |
| **Travel Companions Information** | `hasTravelCompanions` … `travelCompanions` |
| **Previous U.S. Travel Information** — prior visits, driver's license, prior visa, refusals/revocations, immigrant petition (FAQ) | `hasBeenToUS` … `hasFiledImmigrantPetition` |
| **U.S. Point of Contact Information** | `contactPersonOrOrganizationName` … `contactEmailAddress` |
| **Family Information** — parents, other relatives, spouse | `fatherFullName` … `marriagePlace` |
| **Work/Education/Training Information** (present, previous, additional) | `primaryOccupation` … `militaryServiceHistory` |
| **Security and Background: Medical/Health, Criminal, Security, Immigration Law Violation, Miscellaneous** — verbatim 23-question 2010-2011 block | `hasCommunicableDiseaseOfPublicHealthSignificance` … `attendedPublicSchoolOnFStatusWithoutReimbursement` (excluding the 5 flagged post-2011 additions) |
| **Sign and Submit** — preparer, electronic signature/certification | `wasAssistedByPreparer` … `electronicSignatureFullName` |

## Modelling calls flagged honestly

- **Collapsed repeatable groups.** The live form repeats several sections for
  multiple entries (up to 4 other-name pairs, up to 8 travel companions, up
  to 5 previous U.S. visits, up to 3 prior driver's licenses, up to 7
  immediate relatives, up to 2 previous employers, up to 6 educational
  institutions, up to 4 military-service entries). This registry has no
  repeatable/array field construct (confirmed against `spec/v0.3`), so each
  group is modelled as a single collapsed free-text field, consistent with
  how `us/dos/passport-application-ds11` collapsed `travelCountries`. Each
  affected field's `description` says so explicitly.
- **Dropdown fields without a published code list are modelled as free
  text, not an enum** — `contactRelationshipToApplicant`,
  `fatherStatusInUs`, `motherStatusInUs`, and `primaryOccupation` all present
  as "-SELECT ONE-" dropdowns on the source form, but no code list was
  available in the sources examined. This mirrors `nz/dia/realme-verified-identity`'s
  `gender` field, which withheld an enum for the same reason.
- **`purposeOfTripCategory` is a representative subset, not the full ~40-value
  live dropdown.** Out of scope for this version: the Student/Exchange
  Visitor (F/M/J) SEVIS-specific fields, Treaty Trader/Investor (E)
  DS-156E-adjacent fields, Border Crossing Card fields beyond the category
  value itself, and K-visa-specific fields — only the Temporary Worker (H)
  branch is modelled as a representative conditional supplemental section
  (`temporary_worker_supplemental` step), since it was the one supplemental
  page present in the primary source text.
- **Security and Background explanation boxes are collapsed to one field**
  (`securityBackgroundExplanation`), `requiredWhen` any of the ~28 boolean
  questions is `true`. The live form places a separate explanation box next
  to each individual "Yes" answer.
- **Five Security/Background fields are sourced from a secondary compilation,
  not the primary OMB-cleared text**, and are individually marked as such in
  their `sourceRef`: `hasCommittedOrConspiredHumanTrafficking`,
  `hasKnowinglyAidedHumanTrafficker`,
  `isFamilyOfTraffickerBenefitedFromTrafficking` (collapsing three
  near-identical live-form variants into one field),
  `hasParticipatedInForcedAbortionOrSterilization`, and
  `hasParticipatedInCoercedOrganTransplantation`. These reflect real,
  well-corroborated post-2011 additions to the form (Trafficking Victims
  Protection Reauthorization Act and population-control/organ-harvesting
  grounds) but were not confirmed against the primary OMB-cleared text or a
  live capture.
- **Family/group application feature, saved-application 30-day retrieval
  window, post-denial correction workflow, and the confirmation-page barcode
  are described in the top-level `description` only, not modelled as schema
  fields** — they are CEAC session/workflow behavior, not applicant-facing
  data fields.
- **No visa fee field.** Fees vary by visa category and change periodically
  (see travel.state.gov's Fees for Visa Services page); out of scope as
  volatile, non-form data, consistent with `us/dos/international-driving-permit-aaa`'s
  decision not to encode processing-time/fee facts as schema data.

## What is NOT yet independently verified

- **No live walkthrough of the authenticated CEAC wizard** was performed —
  see "Why this document uses the sourced-inventory technique" above.
- **The primary form-text source is a 2010-2011 edition.** The Department
  has not published a more recent full field-by-field rendering of the form
  text; the 2019 Enhanced Vetting FAQ confirms three specific additions
  since that edition, but the wizard may have made other unannounced
  wording or field changes in the intervening years that this document does
  not capture.
- **The five secondary-sourced Security/Background fields** listed above are
  not confirmed against a primary Department source.
- **Visa-classification-specific supplemental sections** other than the
  Temporary Worker branch (Student/Exchange, Treaty Trader/Investor, Border
  Crossing Card, K-visa) are out of scope entirely for this version.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against a live, authenticated CEAC DS-160
session using a real applicant's own identity documents — never a
fabricated identity — step 3 flow), confirms the source is authoritative,
resolves any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0
record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months): visa-classification categories, security/background question
wording, and Enhanced Vetting requirements have all changed within the past
decade and may change again. Re-check the source on or before that date and
on any `source.url` change.
