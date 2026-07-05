# Verification record — `za/sars/corporate-income-tax-return-itr14-body-corporate` v1.0.0

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
  full with `pdfjs-dist` (`getTextContent`), not OCR. This is the same
  174-page guide (Revision 19, effective 2 March 2026) used to author
  `za/sars/corporate-income-tax-return-itr14-dormant` and
  `za/sars/corporate-income-tax-return-itr14-micro-business`; this document
  reads Section 12 ("ANNEXURE B — BODY CORPORATE/SHARE BLOCK COMPANY",
  §§12.1-12.2, pp.24-46) in full.
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle — the same constraint recorded in all three
  other ITR14/ITR12 VERIFICATION.md files in this registry.

## Sources examined

- **Document `(id, version)`:** `za/sars/corporate-income-tax-return-itr14-body-corporate` / `1.0.0`
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
| §12.1.1 "REGISTERED DETAILS" | `detailsVerifiedAndConfirmed`, `publicOfficerCompliant` |
| §12.1.2 "DORMANT" | `isCompanyDormant`, `ceasedTradingDuringPeriod` |
| §12.1.3 "COMPANY TYPE" | `isCooperative`, `isAssociationOfPersons`, `isNonProfitCompany`, `isCollectiveInvestmentScheme`, `isBodyCorporateSectionalTitles`, `confirmRegisteredWithDeedsOffice`, `deedsOfficeRegistrationNumber`, `isShareBlockCompany`, `howManyClassesOfShares`, `doesCompanyHaveMembers` |
| §12.1.4 "CAPITAL GAIN/LOSS TRANSACTIONS" | `hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`, `hadDebtReducedForNoConsideration`, `reductionForLocalAsset`, `reductionForForeignAsset` |
| §12.1.5 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| §12.1.6 "SPECIAL ECONOMIC ZONES" | `isQualifyingSezCompany` |
| §12.1.7 "DEDUCTION (s7F)..." | `wantsS7fDeduction` |
| §12.1.8 "DONATIONS (S18A)" | `wantsS18aDonationsDeduction`, `howManyOrganisationsDonatedTo` |
| §12.1.9 "TAX CREDITS" | `wantsPayeCredits`, `numberOfIrp5Certificates`, `wantsForeignTaxCreditsS6quat1a`, `hadForeignTaxCreditsRefunded`, `wantsS6quat1cDeduction` |
| §12.1.10 "CUSTOMS INFORMATION" | `isRegisteredForCustoms`, `numberOfCustomsClientCodes` |
| §12.2.1 "COMPANY/CLOSE CORPORATION PARTICULARS" | `taxReferenceNumber`, `yearOfAssessment`, `registeredName`, `tradingName`, `companyRegistrationNumber`, `financialYearEnd`, `isReturnForForeignBranchOrAgency`, `provinceOfMajorityIncome`, `standardIndustryCode`, `profitCodeMainSource`, `profitCodeOtherDescription` |
| §12.2.2 "TAX PRACTITIONER DETAILS" | `isTaxPractitionerFiling` (inferred, see below), `taxPractitionerRegistrationNumber`, `taxPractitionerTelNumber`, `taxPractitionerNoEmailDeclared`, `taxPractitionerEmailAddress` |
| §12.2.4 "DECLARATION" | `declarationDate`, `declarationStatement` document |
| §12.2.6 "SHARE / MEMBERSHIP REGISTER" (top-level gate only) | `isResidentInSouthAfrica` |
| §12.2.7 "DETAILS OF BENEFICIAL OWNER(S)" (top-level gate only) | `howManyBeneficialOwners` |
| §12.2.8 "BALANCE SHEET" | `nonCurrentAssetsPropertyPlantEquipment`, `nonCurrentAssetsVehicles`, `nonCurrentAssetsLongTermLoans`, `currentAssetsInventoryWorkInProgress`, `currentAssetsTradeAndOtherReceivables`, `currentAssetsCashAndCashEquivalents`, `otherAssets`, `totalEquityCapitalAndReserves`, `nonCurrentLiabilitiesLongTermLoansAndProvisions`, `currentLiabilitiesTradeAndOtherPayables`, `otherEquityAndLiabilities` |
| §12.2.9 "INCOME STATEMENT" | `salesTurnover`, `lessCostOfSales`, and all 11 Income Item / 14 Expense Item fields (see schema.json's `steps.income_statement`) |
| §12.2.10 "TAX COMPUTATION" | all Adjustments Added Back and Adjustments Allowable fields (see `steps.tax_computation`), including `levyExemptionS10_1_e_i` and `otherIncomeExemptionS10_1_e_ii` (not modelled in the Micro Business sibling document — see below), plus `imputedNetIncomeFromCfc` |
| §12.2.12/§12.2.13 "DONATIONS ALLOWABLE..." | `totalAmountDonated`, `averageValueOfParticipatoryInterests` |
| §12.2.14 "DEDUCTION (I.T.O. s7F)..." | `s7fDeductionAmount` |
| §12.2.15 "DEDUCTION I.T.O. s6quat(1C)..." | `s6quat1cDeductionAmount`, `hadRightOfRecoveryOtherThanMap`, `foreignTaxRefundedDuringYear`, `taxableIncomeFromSaSourcedTradeTaxedOutsideSa` |
| §12.2.17/§12.2.18 "REDUCTION OF LOCAL/FOREIGN ASSESSED CAPITAL LOSS..." | `localDebtReductionAmount`, `foreignDebtReductionAmount` |
| §12.2.21 "FOREIGN TAX CREDITS REFUNDED/DISCHARGED" | `foreignTaxRefundedAllowedAsRebate`, `foreignTaxRefundedAllowedAsS6quat1cDeduction` |

## Key structural findings versus `za/sars/corporate-income-tax-return-itr14-micro-business`

- **The gross-income/total-assets size-threshold fields are correctly
  absent.** Guide §12.1.3(h) states these two fields ("Specify the gross
  income..." / "Specify the total assets...") display only **when NEITHER**
  "Is the company a body corporate..." **NOR** "Is the company a share block
  company..." is answered "Yes" — i.e. they belong to the Micro/Small/Medium
  classification branch, not Annexure B. A naive copy of the Micro Business
  field set would have wrongly included them; they are correctly omitted
  here.
- **No Non-Residency, Personal Service Provider, Crypto Assets Transactions,
  Partnership/Joint Ventures, or "listed on a recognised stock exchange"
  section exists in guide Section 12** for the Body Corporate/Share Block
  pathway (the Micro Business Annexure's §§13.1.10, 13.2.5, 13.2.6, 13.2.7,
  13.2.25 have no counterpart here). These fields (`ceasedToBeResidentDuringYear`,
  `nonResidentDueToForeignIncorporation`, `nonResidentDueToTaxTreaty`,
  `dateCeasedToBeResident`, `isPartnerInPartnership`,
  `howManyPartnershipsJointVentures`, `isPersonalServiceProvider`,
  `isListedOnRecognisedStockExchange`, `hadCryptoAssetTransactionsExcludingCgt`
  and its 5 downstream fields) are deliberately **not modelled** in this
  document — confirmed absent by reading Section 12 in full, not assumed.
- **`isResidentInSouthAfrica` and `howManyBeneficialOwners` are real,
  guide-quoted wizard questions** (confirmed via their use as
  completion-stage gating conditions at §12.2.6(a) and §12.2.7(b)
  respectively) but, unlike Micro Business's §13.1.10 "Company Information"
  container, guide Section 12 does not give them their own named wizard
  sub-header. Each field's own `description` flags this explicitly.
- **Two fields new to this document, specific to Body Corporate
  classification:** `confirmRegisteredWithDeedsOffice` and
  `deedsOfficeRegistrationNumber` (§12.1.3(f)(iii), introduced from the 2025
  year of assessment onwards). A "No" answer to `confirmRegisteredWithDeedsOffice`
  triggers a guide-documented error ("a body corporate must be registered
  with the Deeds Office") that blocks the return, so it is modelled with
  `fieldRole: "eligibility"` / `eligibleValues: [true]`, matching the pattern
  already used for `detailsVerifiedAndConfirmed`.
- **Two Tax Computation Adjustments Allowable fields that
  `za/sars/corporate-income-tax-return-itr14-micro-business`'s VERIFICATION.md
  explicitly excludes as "disabled/greyed out for Micro Business" are
  included here:** `levyExemptionS10_1_e_i` (s10(1)(e)(i)) and
  `otherIncomeExemptionS10_1_e_ii` (s10(1)(e)(ii)) — the guide states both
  apply specifically to a company classified as Body Corporate or Share
  Block Company (§12.2.10(f)(i)(E)-(F)).

## Scope cuts (deliberate, all per spec v0.3's lack of a repeating/nested field model — SPEC.md Section 12)

- **Share/Membership Register** (§12.2.6, up to 4 sub-containers, each
  repeating up to 20 rows) and **Details of Beneficial Owner(s)** (§12.2.7,
  repeats 0-9 times) — only the top-level gating/count fields
  (`doesCompanyHaveMembers`, `howManyBeneficialOwners`,
  `howManyClassesOfShares`) are modelled.
- **Schedule of Local/Foreign Capital Gains and Losses** (§12.2.16, an
  unbounded repeating table) — only the top-level gating booleans
  (`hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`) and the two
  single-field debt-reduction amounts (§12.2.17-12.2.18, not repeating) are
  modelled.
- **PAYE Credits Available** (§12.2.20, repeats per IRP5 certificate) — only
  the top-level gate and count (`wantsPayeCredits`, `numberOfIrp5Certificates`)
  are modelled.
- **Donations Allowable to approved organisations** (§12.2.12-12.2.13,
  repeats up to 20 organisations) — only the top-level gate, count, and
  total-amount fields are modelled, not the per-organisation name/PBO-number/
  amount rows.
- **Foreign Tax Credits: Taxable Foreign Sourced Income of Resident
  Companies — s6quat(1A)** (§12.2.19) — deferred in full; itself a nested
  computation container comparable in scope to the Tax Computation section.
- **Details of Enhanced Renewable Energy Deduction — s12BA** (§12.2.11) —
  deferred in full since it is a conditional sub-container gated on a >R0
  value in `enhancedRenewableEnergyDeductionS12ba`, itself retained as a
  plain currency field.
- **Special Economic Zone container's full mandatory sub-questionnaire**
  (§12.2.5, six-plus follow-up declarations) — only the top-level qualifying-
  company gate (`isQualifyingSezCompany`) is modelled, matching both sibling
  ITR14 documents' identical scope cut.
- **All SARS-calculated fields** (Total Assets; Total Equity and
  Liabilities; Gross Profit/Loss subtotal; both Income Statement Control
  Totals; Net Profit/Loss subtotal; both Tax Computation Control Totals;
  Calculated Profit/Loss before CFC income) are excluded, consistent with
  this registry's discipline of not modelling derived/computed values
  (SPEC.md §16). `imputedNetIncomeFromCfc` is the sole exception — the guide
  describes it as filer-entered (Source Code 4276), not calculated.

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login, which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- **`isTaxPractitionerFiling`** is an inferred gating field, not a
  verbatim-quoted wizard question — the same caveat recorded in both sibling
  ITR14 documents' VERIFICATION.md files.
- **`isResidentInSouthAfrica`** and **`howManyBeneficialOwners`** are
  confirmed real questions (quoted at their completion-stage gate points),
  but their exact wizard-stage placement/header is inferred rather than
  directly quoted, since guide Section 12 does not name a wizard sub-header
  for them the way it does for Micro Business's equivalent questions.
- **`profitCodeOtherDescription`** cannot be expressed as a `requiredWhen`
  condition under GSP-0013 (its trigger is "the selected profit code ends
  with '98'", a suffix condition on `profitCodeMainSource`'s own value, not
  a separate boolean field) — modelled as an always-optional field with a
  description explaining the real-world condition instead of a fabricated
  gate.
- **`donationsS18aAddBack`/`donationsOtherAddBack`** are guide-documented as
  "pre-populated with the same value and locked" once their Income Statement
  counterparts are completed; retained as plain fields anyway per this
  registry's established precedent.
- **Annexures A, C, D, and E** (Dormant and Micro Business — already
  modelled separately; Small Business, Medium to Large Business) are out of
  scope for this document.

## Mock-data test run

A complete, illustrative mock filing — "Fynview Body Corporate", a
Sectional Titles Act body corporate managing a residential sectional-title
scheme in Cape Town, Western Cape, whose sole material income is levy income
from unit owners (fully exempt under s10(1)(e)(i)) plus modest bank interest
and R5,000 of other income (exempt under s10(1)(e)(ii)) — is recorded in
[`conformance/za/sars/corporate-income-tax-return-itr14-body-corporate/1.0.0/application-packet.json`](../../../../../conformance/za/sars/corporate-income-tax-return-itr14-body-corporate/1.0.0/application-packet.json).

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member and checking exact 1:1 coverage against the
packet's `collectedValues`/`notApplicableFields`): `totalFields: 138`,
`collectedCount: 120`, `notApplicableCount: 18`, `errors: 0`.

Two mutation tests confirmed the evaluator is not trivially passing every
input: (1) leaving `confirmRegisteredWithDeedsOffice` unanswered while
`isBodyCorporateSectionalTitles` stays `true` correctly raised a violation
for that field; (2) flipping `wantsS6quat1cDeduction` to `true` without
adding its 4 downstream fields (`s6quat1cDeductionAmount`,
`hadRightOfRecoveryOtherThanMap`, `foreignTaxRefundedDuringYear`,
`taxableIncomeFromSaSourcedTradeTaxedOutsideSa`) correctly raised 4
violations.

This document reuses the same Balance Sheet/Income Statement/Tax Computation
structure as `za/sars/corporate-income-tax-return-itr14-micro-business`
(the guide states these containers are shared verbatim across the Dormant,
Body Corporate/Share Block, and Micro Business pathways), but demonstrates
the two Body-Corporate-specific Adjustments Allowable fields
(`levyExemptionS10_1_e_i`, `otherIncomeExemptionS10_1_e_ii`) with realistic
non-zero values, since the mock filer's levy and other income are directly
exempted through them.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) by walking the live
`sarsefiling.co.za` wizard end to end with a registered eFiler account, for
a company classified as Body Corporate or Share Block Company matching this
document's scope; resolves any discrepancy — especially
`isTaxPractitionerFiling`'s inferred gating and `isResidentInSouthAfrica`'s/
`howManyBeneficialOwners`' inferred wizard placement, both flagged above as
unconfirmed — by shipping a **new schema version** (immutability —
VERSIONING §3); and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any
`source.url` change.
