# Verification record — `za/sars/individual-income-tax-return-itr12` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field and document was read directly from the text layer of SARS's own
current Comprehensive Guide to the ITR12 (IT-AE-36-G05, Revision 40, effective
29 June 2026), which is written for the 2026 year of assessment. It remains
`draft`, not `verified`, because the live eFiling wizard could not be walked
interactively — see "What is NOT yet independently verified" below.

## Access notes

- `https://www.sars.gov.za/wp-content/uploads/Ops/Guides/IT-AE-36-G05-Comprehensive-Guide-to-the-ITR12-Income-Tax-Return-for-Individuals-External-Guide.pdf`
  was fetched directly, HTTP 200, with a genuine text layer — extracted in
  full with `pdfjs-dist` (`getTextContent`), not OCR. It is a 144-page guide;
  the sections read closely for this schema were §3 (general information —
  due dates, required documentation), §4.1 (Standard Questions on Form
  Wizard, in full), and §5 (Complete Taxpayer Details: Taxpayer Information,
  Declaration and Signature, Bank Account Details).
- A second PDF, a Provincial Treasury-hosted copy of SARS's own 2017
  "LookFeel" ITR12 mock-up
  (`https://www.treasury.gov.za/research/NT-SDF/Available%20Datasets/Personal%20Income%20Tax%20-%20ITR12%20form.pdf`),
  was fetched directly (HTTP 200, genuine text layer) and used only to
  corroborate that the taxpayer-information field set (name, surname, other
  name, initials, ID/passport, marital status, spouse details, contact
  details) and rough field lengths (13-digit ID number, 10-digit tax
  reference number) have been stable since at least 2017 — it is 9 years out
  of date and was **not** used as the source of record for any field's
  current-year presence, wording, or requiredness; those all come from the
  2026-effective Comprehensive Guide.
- The 10-digit tax-reference-number leading-digit convention (0, 1, 2, 3, or
  9) is sourced from third-party tax-preparation guidance (TaxTim), since the
  SARS guide itself states only that the reference number is 10 digits and
  does not restate the leading-digit rule. Flagged below as needing a
  first-party SARS source.
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle (see "What is NOT yet independently verified").

## Sources examined

- **Document `(id, version)`:** `za/sars/individual-income-tax-return-itr12` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** South African Revenue Service (SARS)
- **Primary source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):**
  <https://www.sars.gov.za/wp-content/uploads/Ops/Guides/IT-AE-36-G05-Comprehensive-Guide-to-the-ITR12-Income-Tax-Return-for-Individuals-External-Guide.pdf>
  — "Comprehensive Guide to the ITR12 Income Tax Return for Individuals"
  (IT-AE-36-G05, Revision 40, effective 29 June 2026, 2026 year of
  assessment)
- **Cross-check (directly retrieved, HTTP 200, used for field-presence/sizing
  corroboration only, not as a current-year source):**
  <https://www.treasury.gov.za/research/NT-SDF/Available%20Datasets/Personal%20Income%20Tax%20-%20ITR12%20form.pdf>
  — SARS 2017 "LookFeel" ITR12 mock-up
- **Cross-check (web search, third-party):** TaxTim SA guidance confirming
  the 10-digit tax reference number and its leading-digit convention
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Comprehensive Guide §3.1/§3.4 — due dates and required documentation | schema `description`; `irp5Certificates`, `medicalSchemeTaxCertificate`, `retirementAnnuityFundCertificate`, `taxFreeInvestmentCertificate`, `section18ADonationCertificate`, `travelLogbook` documents |
| Comprehensive Guide §4.1.1 "PERSON MAKING THE DECLARATION" | `isTaxPractitionerDeclaration` |
| Comprehensive Guide §4.1.2/§4.1.3 "RESIDENCY"/"NON-RESIDENTS" (used to draw the resident-only scope boundary) | `isRsaTaxResidentFullYear` |
| Comprehensive Guide §4.1.4 "EMPLOYMENT STATUS" | `wasUnemployedFullYear`, `madeRetirementAnnuityContributionsWhileUnemployed`, `wasUnemployedForPartOfYear`, `numberOfUnemploymentPeriods` |
| Comprehensive Guide §4.1.5 "INCOME RECEIVED REFLECTED ON AN IRP5/IT3(a) EMPLOYEE TAX CERTIFICATE" | `receivedIrp5Income`, `numberOfIrp5Certificates`, `paidMedicalExpensesAsMainMember`, `paidMedicalExpensesForDependentFamily`, `madeRetirementAnnuityContributions`, `contributedToPensionOrProvidentFundNotOnCertificate`, `claimTravelAllowanceDeduction`, `numberOfVehiclesForTravelClaim`, `claimEmployerProvidedVehicleDeduction`, `numberOfEmployerProvidedVehicles`, `receivedForeignServiceRemunerationOnCertificate` |
| Comprehensive Guide §4.1.6 "INVESTMENT INCOME" | `receivedInterestDividendsOrReit`, `receivedExemptDividendIncome`, `receivedTrustIncome`, `numberOfTrusts`, `hadTaxFreeInvestmentTransactions`, `numberOfTaxFreeInvestments` |
| Comprehensive Guide §4.1.7 "RENTAL INCOME" | `derivedRentalIncome`, `numberOfRentalProperties` |
| Comprehensive Guide §4.1.8 "PARTNERSHIPS" | `isPartnerInBusiness`, `numberOfPartnershipBusinesses` |
| Comprehensive Guide §4.1.9 "DIRECTOR OR MEMBER OF A CLOSE CORPORATION" | `isDirectorOrCloseCorporationMember` |
| Comprehensive Guide §4.1.10 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| Comprehensive Guide §4.1.11 "ASSETS" | `hasAssetsExceedingR50Million` |
| Comprehensive Guide §4.1.12 "DONATIONS" | `claimSection18ADonations`, `numberOfPboDonationsRecipients` |
| Comprehensive Guide §4.1.14 "OTHER INCOME AND ALLOWABLE EXPENSES" | `hasOtherIncomeOrAllowableExpenses` |
| Comprehensive Guide §5.1 "TAXPAYER INFORMATION" | `incomeTaxReferenceNumber`, `identificationType`, `idNumber`, `passportNumber`, `passportCountry`, `passportIssueDate`, `surname`, `firstName`, `otherName`, `initials`, `dateOfBirth`, `maritalStatus`, `spouseInitials`, `spouseIdNumber`, `spousePassportNumber`, `spousePassportCountry`, `emailAddress`, `noEmailAddressDeclared`, `cellphoneNumber`, `noCellphoneNumberDeclared`, `homeTelephoneNumber`, `businessTelephoneNumber`, `contactDetailsConfirmedCorrect`, `residentialAddressSameAsPostal`, `postalAddressLine1`, `postalSuburb`, `postalCityTown`, `postalCode`, `residentialAddressLine1`, `residentialSuburb`, `residentialCityTown`, `residentialPostalCode`, `taxPractitionerRegistrationNumber`, `taxPractitionerTelephoneNumber`, `taxPractitionerEmailAddress` |
| Comprehensive Guide §5.2 "DECLARATION AND SIGNATURE" | `declarationTrueAndCorrect`, `declarationDate`, `declarationSignature` document |
| Comprehensive Guide §5.3/§5.3.1 "BANK ACCOUNT DETAILS" | `bankAccountHolderDeclaration`, `reasonForNoOrThirdPartyBankAccount`, `bankAccountNumber`, `bankName`, `branchNumber`, `accountType`, `accountHolderName`, `bankDetailsAgreementStatement` |
| Comprehensive Guide §5.3.2/§5.3.3 — bank-detail-change documentation and proof-of-residential-address table | `proofOfResidentialAddress`, `bankVerificationDocument` documents |
| Comprehensive Guide §5.1(b) — ID/passport pre-populated identity | `identityDocument` document |

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login (username/password plus,
  typically, an OTP to a South African cell number), which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- The **10-digit tax-reference-number leading-digit rule** (0/1/2/3/9) is
  sourced from third-party guidance (TaxTim), not a first-party SARS
  statement; the guide itself only states the number is 10 digits.
- The exact **branch-number format** (`branchNumber` is modeled here as a
  6-digit universal branch code, the common South African convention) is not
  explicitly restated in the guide, which instead describes the field as
  auto-completed once a bank is selected from a drop-down.
- This document covers the **resident, "Standard Questions on Form Wizard"**
  pathway only (Comprehensive Guide §4.1). Out of scope, per `description`:
  the "Comprehensive Questions on Form Wizard" (§4.2 — non-resident sourced
  income, foreign income beyond a single IRP5 flag, capital gains, local
  farming) and every downstream, per-item repeating income/deduction detail
  grid a "Yes" answer dynamically adds to the return (e.g. up to 20 rental
  activities, 20 trusts, or 20 partnership businesses) — spec v0.3 has no
  repeating/nested field model (SPEC.md Section 12).
- **Not authored against the v0.3 edition axis.** `edition.scheme` is a
  closed enum (`us-tax-year`/`gb-tax-year`/`award-year`, spec v0.3 SPEC.md
  §5.7, GSP-0005); extending it to a South African tax-year scheme is a
  one-way-door spec change (GSP-0019, open) not made unilaterally here. This
  follows the same non-edition precedent set by `fr/dgfip/income-tax-return-2042`
  and `de/finanzamt/income-tax-return-elster`. A future year's ITR12 would
  ship as a new major version of this document, or the schema would be
  re-authored under the edition axis if/when GSP-0019 is resolved.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by walking the live `sarsefiling.co.za` (or SARS MobiApp)
wizard end to end with a registered eFiler account, for a taxpayer matching
this document's resident/standard-wizard scope; resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5); and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months) — also ahead of the 2027 filing-season guide revision that will
supersede this cycle's Revision 40 guide. Re-check the sources on or before
that date and on any `source.url` change.
