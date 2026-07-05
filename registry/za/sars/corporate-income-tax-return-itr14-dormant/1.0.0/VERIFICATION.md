# Verification record — `za/sars/corporate-income-tax-return-itr14-dormant` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field and document was read directly from the text layer of SARS's own
current "How to complete the Income Tax Return (ITR14) for Companies"
External Guide. It remains `draft`, not `verified`, because the live
`sarsefiling.co.za` wizard could not be walked interactively — see "What is
NOT yet independently verified" below.

## Access notes

- `https://www.sars.gov.za/wp-content/uploads/IT-GEN-04-G01-How-to-complete-the-Income-Tax-Return-ITR14-for-Companies-External-Guide.pdf`
  was fetched directly, HTTP 200, with a genuine text layer — extracted in
  full with `pdfjs-dist` (`getTextContent`), not OCR. It is a 174-page guide
  (Revision 19, effective 2 March 2026) covering all five ITR14 company-type
  Annexures; the sections read closely for this schema were Section 3
  ("DETERMINE COMPANY CLASSIFICATION"), Section 8.1 ("INFORMATION TO CREATE
  RETURN (FORM WIZARD)"), Section 9 ("SUBMITTING THE ITR14 RETURN"), and
  Section 11 in full ("ANNEXURE A — DORMANT COMPANY", §§11.1-11.2, pp.11-24,
  covering the Form Wizard questions and the Company/Close Corporation
  Particulars, Tax Practitioner Details, Dormant Company Details, and
  Declaration sections of the return itself).
- Sections 12-15 (Annexures B-E — Body Corporate/Share Block, Micro
  Business, Small Business, and Medium to Large Business) were surveyed only
  at the table-of-contents level to confirm their comparative size (each
  spans 30-100+ pages and includes Balance Sheet, Income Statement, and full
  Tax Computation containers that a dormant company does not complete) — not
  read field-by-field, since they are out of scope for this document (see
  its `description`).
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle — the same constraint recorded in
  `za/sars/individual-income-tax-return-itr12`'s VERIFICATION.md.

## Sources examined

- **Document `(id, version)`:** `za/sars/corporate-income-tax-return-itr14-dormant` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** South African Revenue Service (SARS)
- **Primary source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):**
  <https://www.sars.gov.za/wp-content/uploads/IT-GEN-04-G01-How-to-complete-the-Income-Tax-Return-ITR14-for-Companies-External-Guide.pdf>
  — "How to complete the Income Tax Return (ITR14) for Companies" (IT-GEN-04-G01,
  Revision 19, effective 2 March 2026)
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| §3(b) — company classification | `companyClassification` |
| §11.1.1 "REGISTERED DETAILS" | `detailsVerifiedAndConfirmed`, `publicOfficerCompliant` |
| §11.1.2 "DORMANT" | `isCompanyDormant`, `becameDormantDuringYear`, `movementInAssetsLiabilitiesReserves`, `isCooperative`, `isAssociationOfPersons`, `isCollectiveInvestmentScheme`, `isNonProfitCompany`, `isBodyCorporateSectionalTitles`, `isShareBlockCompany`, `isResidentInSouthAfrica`, `doesCompanyHaveMembers`, `howManyBeneficialOwners`, `howManyClassesOfShares` |
| §11.1.3 "CAPITAL GAIN/LOSS TRANSACTIONS" | `hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`, `hadDebtReducedForNoConsideration` |
| §11.1.4 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| §11.1.5 "SPECIAL ECONOMIC ZONES" | `isQualifyingSezCompany` |
| §11.1.6 "DEDUCTION (s7F)..." | `wantsS7fDeduction` |
| §11.1.7 "CUSTOMS INFORMATION" | `isRegisteredForCustoms`, `numberOfCustomsClientCodes` |
| §11.2.1 "COMPANY/CLOSE CORPORATION PARTICULARS" | `taxReferenceNumber`, `yearOfAssessment`, `registeredName`, `tradingName`, `companyRegistrationNumber`, `financialYearEnd`, `isReturnForForeignBranchOrAgency`, `provinceOfMajorityIncome`, `standardIndustryCode`, `profitCodeMainSource` |
| §11.2.2 "TAX PRACTITIONER DETAILS (IF APPLICABLE)" | `isTaxPractitionerFiling` (inferred, see below), `taxPractitionerRegistrationNumber`, `taxPractitionerTelNumber`, `taxPractitionerNoEmailDeclared`, `taxPractitionerEmailAddress` |
| §11.2.3 "DORMANT COMPANY DETAILS" | `reasonForDormancy`, `isActingAsNominee`, `receivedTaxablePassiveIncome`, `taxablePassiveIncomeAmount`, `isPartyToAssetHoldingContract` |
| §11.2.4 "VOLUNTARY DISCLOSURE PROGRAMME" | `vdpApplicationNumber` |
| §11.2.5 "DECLARATION" | `declarationDate`, `declarationStatement` document |
| §9(c) — AFS optionality for dormant companies | `annualFinancialStatements` document |
| §11.2.9 "DEDUCTION (i.t.o. s7F)..." | `s7fDeductionAmount` |

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login, which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- **`isTaxPractitionerFiling`** is an inferred gating field, not a
  verbatim-quoted wizard question. Guide §11.2.2 is headed "TAX PRACTITIONER
  DETAILS (IF APPLICABLE)" but the Annexure A wizard text never shows an
  explicit Yes/No question for it — unlike `za/sars/individual-income-tax-return-itr12`,
  which has an explicit "Mark with an X if you are completing the return as
  a tax practitioner" question in its Form Wizard section. SARS eFiling
  most plausibly determines this from the logged-in user's
  practitioner-registered role rather than an in-form question. A live
  eFiling walkthrough is needed to confirm whether this is a real field, a
  read-only derived state, or does not exist as modelled.
- **`reasonForDormancy`** is modelled as an open string because the guide
  states only "select the applicable reason for dormancy from the dropdown
  box" without ever enumerating the dropdown's own values. A live eFiling
  walkthrough or a first-party SARS list of dormancy reasons would let this
  become a closed `enum`.
- **`provinceOfMajorityIncome`**'s enum is drawn verbatim from the guide's
  own list of nine provinces plus "International" (§11.2.1(b)(ii)); the
  list's own lettering in the source PDF (A, E, F, G, H, I, J, K, L, M,
  skipping B-D) is a PDF-extraction/layout artifact, not a sign that
  intermediate options were fabricated or omitted — every value is directly
  present in the extracted source text.
- **Annexures B-E** (Body Corporate/Share Block, Micro Business, Small
  Business, Medium to Large Business) are out of scope for this document —
  see its `description` and the schema's `verification.notes` for the full
  scope rationale.
- **Not authored against the v0.3 edition axis**, following the same
  `za/sars/individual-income-tax-return-itr12`/GSP-0019 precedent:
  `edition.scheme` has no `za-tax-year` member yet (spec v0.3 SPEC.md
  §5.7). A future year of assessment would ship as a new major version of
  this document, or be re-authored under the edition axis if/when GSP-0019
  is resolved.

## Mock-data test run

A complete, illustrative mock filing — "Karoo Holdings Proprietary
Limited", a small South African property-holding company that ceased all
trading at the start of the 2026 year of assessment and remained fully
dormant throughout — is recorded in
[`conformance/za/sars/corporate-income-tax-return-itr14-dormant/1.0.0/application-packet.json`](../../../../../conformance/za/sars/corporate-income-tax-return-itr14-dormant/1.0.0/application-packet.json).

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member and checking exact 1:1 coverage against the
packet's `collectedValues`/`notApplicableFields`): `totalFields: 47`,
`collectedCount: 37`, `notApplicableCount: 10`, `errors: 0`. This confirmed
that the `detailsVerifiedAndConfirmed`→`publicOfficerCompliant`,
`becameDormantDuringYear`→(`movementInAssetsLiabilitiesReserves`,
`isCooperative`..`isResidentInSouthAfrica`), `doesCompanyHaveMembers`'
any-of-four gate, `wantsS7fDeduction`→`s7fDeductionAmount`,
`isRegisteredForCustoms`→`numberOfCustomsClientCodes`,
`isTaxPractitionerFiling`→(the four practitioner fields, including the
compound `all()` gate on `taxPractitionerEmailAddress`),
`isActingAsNominee`→`receivedTaxablePassiveIncome`→`taxablePassiveIncomeAmount`,
and `relatesToVoluntaryDisclosureProgramme`→`vdpApplicationNumber`
`requiredWhen` gates all evaluate correctly for this scenario.

A mutation test (flipping `isActingAsNominee` to `true` without adding the
now-required `receivedTaxablePassiveIncome`) confirmed the evaluator
correctly flags the newly-required field as a violation — the evaluator
script is not just trivially passing every input.

Unlike `sg/iras/corporate-income-tax-return-form-cs`, this document has no
`computedForReference` calculation block: a genuinely dormant company (by
definition, no trade, no income, no expenses) has nothing for SARS to
compute a tax liability from, so the mock packet has no worked
tax-computation example to reproduce.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) by walking the live
`sarsefiling.co.za` wizard end to end with a registered eFiler account, for
a company classified as Dormant matching this document's scope; resolves
any discrepancy — especially `isTaxPractitionerFiling` and
`reasonForDormancy`'s dropdown values, both flagged above as unconfirmed —
by shipping a **new schema version** (immutability — VERSIONING §3); and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any
`source.url` change.
