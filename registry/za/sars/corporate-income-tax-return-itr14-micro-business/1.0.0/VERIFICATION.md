# Verification record — `za/sars/corporate-income-tax-return-itr14-micro-business` v1.0.0

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
  `za/sars/corporate-income-tax-return-itr14-dormant`; this document reads
  Section 13 ("ANNEXURE C — MICRO BUSINESS", §§13.1-13.2, pp.46-70) in full,
  where the Dormant document had surveyed it only at table-of-contents
  level.
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle — the same constraint recorded in
  `za/sars/individual-income-tax-return-itr12`'s and
  `za/sars/corporate-income-tax-return-itr14-dormant`'s VERIFICATION.md
  files.

## Sources examined

- **Document `(id, version)`:** `za/sars/corporate-income-tax-return-itr14-micro-business` / `1.0.0`
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
| §13(a) — Micro Business definition | `companyClassification` |
| §13.1.1 "REGISTERED DETAILS" | `detailsVerifiedAndConfirmed`, `publicOfficerCompliant` |
| §13.1.2 "DORMANT" | `isCompanyDormant`, `ceasedTradingDuringPeriod` |
| §13.1.3 "COMPANY TYPE" | `isCooperative`, `isAssociationOfPersons`, `isNonProfitCompany`, `isCollectiveInvestmentScheme`, `isBodyCorporateSectionalTitles`, `isShareBlockCompany`, `grossIncomeSalesTurnoverPlusOtherIncome`, `totalAssetsCurrentAndNonCurrent` |
| §13.1.4 "CAPITAL GAIN/LOSS TRANSACTIONS" | `hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`, `hadDebtReducedForNoConsideration`, `reductionForLocalAsset`, `reductionForForeignAsset` |
| §13.1.5 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| §13.1.6 "SPECIAL ECONOMIC ZONES" | `isQualifyingSezCompany` |
| §13.1.7 "DEDUCTION (s7F)..." | `wantsS7fDeduction` |
| §13.1.8 "DONATIONS" | `wantsS18aDonationsDeduction`, `howManyOrganisationsDonatedTo` |
| §13.1.9 "TAX CREDITS" | `wantsPayeCredits`, `numberOfIrp5Certificates`, `wantsForeignTaxCreditsS6quat1a`, `hadForeignTaxCreditsRefunded`, `wantsS6quat1cDeduction` |
| §13.1.10 "COMPANY INFORMATION" | `isResidentInSouthAfrica`, `ceasedToBeResidentDuringYear`, `doesCompanyHaveMembers`, `howManyBeneficialOwners`, `howManyClassesOfShares`, `isPartnerInPartnership`, `howManyPartnershipsJointVentures`, `isPersonalServiceProvider`, `isListedOnRecognisedStockExchange`, `hadCryptoAssetTransactionsExcludingCgt` |
| §13.1.11 "CUSTOMS INFORMATION" | `isRegisteredForCustoms`, `numberOfCustomsClientCodes` |
| §13.2.1 "COMPANY/CLOSE CORPORATION PARTICULARS" | `taxReferenceNumber`, `yearOfAssessment`, `registeredName`, `tradingName`, `companyRegistrationNumber`, `financialYearEnd`, `isReturnForForeignBranchOrAgency`, `provinceOfMajorityIncome`, `standardIndustryCode`, `profitCodeMainSource`, `profitCodeOtherDescription` |
| §13.2.2 "TAX PRACTITIONER DETAILS" | `isTaxPractitionerFiling` (inferred, see below), `taxPractitionerRegistrationNumber`, `taxPractitionerTelNumber`, `taxPractitionerNoEmailDeclared`, `taxPractitionerEmailAddress` |
| §13.2.4 "DECLARATION" | `declarationDate`, `declarationStatement` document |
| §13.2.5 "NON-RESIDENCY" | `nonResidentDueToForeignIncorporation`, `nonResidentDueToTaxTreaty`, `dateCeasedToBeResident` |
| §13.2.7 "CRYPTO ASSETS TRANSACTIONS" | `cryptoAssetsIncludedInIncomeStatement`, `grossCryptoAssetsAmountInIncomeStatement`, `cryptoAssetTransactionsResultedInProfit`, `cryptoAssetsProfitAmount`, `cryptoAssetsLossAmount`, `amountOfCryptoAssetsInBalanceSheet` |
| §13.2.11 "BALANCE SHEET" | `nonCurrentAssetsPropertyPlantEquipment`, `nonCurrentAssetsVehicles`, `nonCurrentAssetsLongTermLoans`, `currentAssetsInventoryWorkInProgress`, `currentAssetsTradeAndOtherReceivables`, `currentAssetsCashAndCashEquivalents`, `otherAssets`, `totalEquityCapitalAndReserves`, `nonCurrentLiabilitiesLongTermLoansAndProvisions`, `currentLiabilitiesTradeAndOtherPayables`, `otherEquityAndLiabilities` |
| §13.2.12 "INCOME STATEMENT" | `salesTurnover`, `lessCostOfSales`, and all 11 Income Item / 14 Expense Item fields (see schema.json's `steps.income_statement`) |
| §13.2.13 "TAX COMPUTATION" | all Adjustments Added Back and Adjustments Allowable fields (see `steps.tax_computation`), plus `imputedNetIncomeFromCfc` |
| §13.2.15/13.2.16 "DONATIONS ALLOWABLE..." | `totalAmountDonated`, `averageValueOfParticipatoryInterests` |
| §13.2.17 "DEDUCTION (s7F)..." | `s7fDeductionAmount` |
| §13.2.18 "DEDUCTION (s6quat(1C))..." | `s6quat1cDeductionAmount`, `hadRightOfRecoveryOtherThanMap`, `foreignTaxRefundedDuringYear`, `taxableIncomeFromSaSourcedTradeTaxedOutsideSa` |
| §13.2.20/13.2.21 "REDUCTION OF LOCAL/FOREIGN ASSESSED CAPITAL LOSS..." | `localDebtReductionAmount`, `foreignDebtReductionAmount` |
| §13.2.24 "FOREIGN TAX CREDITS REFUNDED/DISCHARGED" | `foreignTaxRefundedAllowedAsRebate`, `foreignTaxRefundedAllowedAsS6quat1cDeduction` |

## Scope cuts (deliberate, all per spec v0.3's lack of a repeating/nested field model — SPEC.md Section 12)

- **Share/Membership Register** (§13.2.9, up to 4 sub-containers, each
  repeating up to 20 rows) and **Details of Beneficial Owner(s)** (§13.2.10,
  repeats 0-9 times) — only the top-level gating/count fields
  (`doesCompanyHaveMembers`, `howManyBeneficialOwners`,
  `howManyClassesOfShares`) are modelled.
- **Schedule of Local/Foreign Capital Gains and Losses** (§13.2.19, an
  unbounded repeating table) — only the top-level gating booleans
  (`hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`) and the two
  single-field debt-reduction amounts (§13.2.20-13.2.21, not repeating) are
  modelled.
- **PAYE Credits Available** (§13.2.22, repeats per IRP5 certificate) — only
  the top-level gate and count (`wantsPayeCredits`, `numberOfIrp5Certificates`)
  are modelled.
- **Donations Allowable to approved organisations** (§13.2.15-13.2.16,
  repeats up to 20 organisations) — only the top-level gate, count, and
  total-amount fields are modelled, not the per-organisation name/PBO-number/
  amount rows.
- **Partnership/Joint Ventures** (§13.2.25, repeats per partnership) — only
  the top-level gate and count are modelled.
- **Foreign Tax Credits: Taxable Foreign Sourced Income of Resident
  Companies — s6quat(1A)** (§13.2.23, a multi-field computation block) —
  deferred in full; it is itself a nested computation container comparable
  in scope to the Tax Computation section.
- **Details of Enhanced Renewable Energy Deduction — s12BA** (§13.2.14) —
  deferred in full since it is a conditional sub-container gated on a >R0
  value in `enhancedRenewableEnergyDeductionS12ba`, which is itself retained
  as a plain currency field.
- **Special Economic Zone container's full mandatory sub-questionnaire**
  (§13.2.8, six-plus follow-up declarations contingent on which SEZ(s) the
  company operates in) — only the top-level qualifying-company gate
  (`isQualifyingSezCompany`) is modelled, matching
  `za/sars/corporate-income-tax-return-itr14-dormant`'s identical scope cut.
- **Personal Service Provider container's full decision-tree questionnaire**
  (§13.2.6, an 8-part chain of narrative eligibility tests with no further
  downstream currency fields) — only the top-level gate
  (`isPersonalServiceProvider`) is modelled.
- **All SARS-calculated fields** (Total Assets; Total Equity and
  Liabilities; Gross Profit/Loss subtotal; both Income Statement Control
  Totals; Net Profit/Loss subtotal; both Tax Computation Control Totals;
  Calculated Profit/Loss before CFC income; and the "Amounts to be Included
  in the Determination of Taxable Income" intermediate lines) are excluded,
  consistent with `sg/iras/corporate-income-tax-return-form-cs`'s and this
  registry's discipline of not modelling derived/computed values (SPEC.md
  §16). `imputedNetIncomeFromCfc` is the sole exception in that subsection —
  the guide describes it as filer-entered (Source Code 4276), not
  calculated.
- **Two Adjustments Allowable line items excluded even though not
  calculated:** "Levy exemption in terms of s10(1)(e)(i)" and "Other income
  exemption (excluding levy) in terms of s10(1)(e)(ii)" — the guide states
  both fields "will be disabled/greyed out" specifically for a company
  classified as Micro Business (they apply only to Body Corporate/Share
  Block companies), so including them would misrepresent this document's
  own scope.

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login, which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- **`isTaxPractitionerFiling`** is an inferred gating field, not a
  verbatim-quoted wizard question — the same caveat already recorded in
  `za/sars/corporate-income-tax-return-itr14-dormant`'s VERIFICATION.md:
  guide §13.2.2 is headed "TAX PRACTITIONER DETAILS (If applicable)" but the
  Annexure C wizard text never shows an explicit Yes/No question for it.
- **`profitCodeOtherDescription`** cannot be expressed as a `requiredWhen`
  condition under GSP-0013 (its trigger is "the selected profit code ends
  with '98'", a suffix condition on `profitCodeMainSource`'s own value, not
  a separate boolean field) — modelled as an always-optional field with a
  description explaining the real-world condition instead of a fabricated
  gate.
- **`donationsS18aAddBack`/`donationsOtherAddBack`** are guide-documented as
  "pre-populated with the same value and locked" once their Income Statement
  counterparts are completed; retained as plain fields anyway per
  `sg/iras/corporate-income-tax-return-form-cs`'s precedent for
  IRAS/SARS-pre-filled-but-declared values, not dropped.
- **Annexures A, B, D, and E** (Dormant — already modelled separately;
  Body Corporate/Share Block, Small Business, Medium to Large Business) are
  out of scope for this document.

## Mock-data test run

A complete, illustrative mock filing — "Karoo Craft Traders (Pty) Ltd", a
small retail craft/homeware trading company with turnover (R853,000) and
total assets (R620,000) both comfortably within the Micro Business
thresholds — is recorded in
[`conformance/za/sars/corporate-income-tax-return-itr14-micro-business/1.0.0/application-packet.json`](../../../../../conformance/za/sars/corporate-income-tax-return-itr14-micro-business/1.0.0/application-packet.json).

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member and checking exact 1:1 coverage against the
packet's `collectedValues`/`notApplicableFields`): `totalFields: 151`,
`collectedCount: 124`, `notApplicableCount: 27`, `errors: 0`.

Two mutation tests confirmed the evaluator is not trivially passing every
input: (1) flipping `hadCryptoAssetTransactionsExcludingCgt` to `true`
without adding `cryptoAssetsIncludedInIncomeStatement`,
`cryptoAssetTransactionsResultedInProfit`, and
`amountOfCryptoAssetsInBalanceSheet` correctly raised 3 violations; (2)
flipping `wantsS6quat1cDeduction` to `true` without adding
`s6quat1cDeductionAmount` correctly raised a violation for that field (and
its 3 sibling fields gated on the same condition).

Unlike `za/sars/corporate-income-tax-return-itr14-dormant`, this document's
mock packet includes a full worked Balance Sheet, Income Statement, and Tax
Computation — the first ZA corporate-tax schema in this registry to do so —
though it does not reproduce SARS' own tax-payable calculation (all
SARS-calculated subtotal fields are out of scope; see "Scope cuts" above).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) by walking the live
`sarsefiling.co.za` wizard end to end with a registered eFiler account, for
a company classified as Micro Business matching this document's scope;
resolves any discrepancy — especially `isTaxPractitionerFiling`'s inferred
gating, flagged above as unconfirmed — by shipping a **new schema version**
(immutability — VERSIONING §3); and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any
`source.url` change.
