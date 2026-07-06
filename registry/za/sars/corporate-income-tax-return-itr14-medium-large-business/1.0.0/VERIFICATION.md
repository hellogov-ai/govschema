# Verification record — `za/sars/corporate-income-tax-return-itr14-medium-large-business` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

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
  `za/sars/corporate-income-tax-return-itr14-dormant`,
  `za/sars/corporate-income-tax-return-itr14-micro-business`,
  `za/sars/corporate-income-tax-return-itr14-body-corporate`, and
  `za/sars/corporate-income-tax-return-itr14-small-business`; this document
  reads Section 15 ("ANNEXURE E — MEDIUM TO LARGE BUSINESS", §§15.1-15.2,
  pp.115-169) in full — 55 pages, the largest of the five Annexures. Guide
  page numbers were confirmed against the PDF's own printed "Page N of 174"
  footer before use (each page's footer text was cross-checked against the
  extraction's own page markers before any range was trusted, the same
  discipline the Small Business cycle applied), and the text was
  cross-referenced against Section 14 (Annexure D, Small Business) where
  Annexure E reuses wording verbatim (e.g. Dividends Declared, Reportable
  Arrangement, Additional Assessment Information, Personal Service Provider,
  MNE, Company Structure) so shared field definitions were not re-derived
  from scratch.
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle — the same constraint recorded in all four
  sibling ITR14/ITR12 VERIFICATION.md files in this registry.

## Sources examined

- **Document `(id, version)`:** `za/sars/corporate-income-tax-return-itr14-medium-large-business` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** South African Revenue Service (SARS)
- **Primary source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):**
  <https://www.sars.gov.za/wp-content/uploads/IT-GEN-04-G01-How-to-complete-the-Income-Tax-Return-ITR14-for-Companies-External-Guide.pdf>
  — "How to complete the Income Tax Return (ITR14) for Companies" (IT-GEN-04-G01,
  Revision 19, effective 2 March 2026)
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| §15.1.1 "REGISTERED DETAILS" | `detailsVerifiedAndConfirmed`, `publicOfficerCompliant` |
| §15.1.2 "DORMANT" | `isCompanyDormant`, `becameDormantDuringYear`, `ceasedTradingDuringPeriod` |
| §15.1.3 "COMPANY TYPE" | `isCooperative`, `isAssociationOfPersons`, `isNonProfitCompany`, `isCollectiveInvestmentScheme`, `isBodyCorporateSectionalTitles`, `isShareBlockCompany`, `doesCompanyHaveMembers`, `grossIncomeSalesTurnoverPlusOtherIncome`, `totalAssetsCurrentAndNonCurrent` |
| §15.1.4 "CAPITAL GAIN/LOSS TRANSACTIONS" | `hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`, `hadDebtReducedForNoConsideration`, `reductionForLocalAsset`, `reductionForForeignAsset` |
| §15.1.5 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| §15.1.6 "SPECIAL ECONOMIC ZONES" | `isQualifyingSezCompany` |
| §15.1.7 "DEDUCTION (s7F)..." | `wantsS7fDeduction` |
| §15.1.8 "DONATIONS (S18A)" | `wantsS18aDonationsDeduction`, `howManyOrganisationsDonatedTo` |
| §15.1.9 "TAX CREDITS" | `wantsPayeCredits`, `numberOfIrp5Certificates`, `wantsForeignTaxCreditsS6quat1a`, `hadForeignTaxCreditsRefunded`, `wantsS6quat1cDeduction` |
| §15.1.10 "COMPANY INFORMATION" | `isPartnerInPartnership`, `howManyPartnershipsJointVentures`, `isPersonalServiceProvider`, `isListedOnRecognisedStockExchange`, `isResidentInSouthAfrica`, `ceasedToBeResidentDuringYear`, `howManyClassesOfShares`, `hadCryptoAssetTransactionsExcludingCgt`, `howManyBeneficialOwners`, `qualifiesForUdzDeductionS13quat`, `enteredReportableArrangement`, `numberOfReportableArrangements`, `wereDividendsDeclared`, `isPartOfGroupPreparingConsolidatedFinancialStatements`, `isMemberOfMneGroup`, `electsHeadquarterCompanyS9i`, `receivedForeignIncomeOrIncurredForeignExpenditureOrPaidNonResident`, `enteredAffectedTransactionS31`, `receivedOrAccruedIncomeAffectedTransaction`, `incurredExpenditureAffectedTransaction`, `hasS37aPenalty` |
| §15.1.11 "CUSTOMS INFORMATION" | `isRegisteredForCustoms`, `numberOfCustomsClientCodes` |
| §15.2.1 "COMPANY/CLOSE CORPORATION PARTICULARS" | `taxReferenceNumber`, `yearOfAssessment`, `registeredName`, `tradingName`, `companyRegistrationNumber`, `financialYearEnd`, `isReturnForForeignBranchOrAgency`, `provinceOfMajorityIncome`, `standardIndustryCode`, `profitCodeMainSource`, `profitCodeOtherDescription` |
| §15.2.2 "TAX PRACTITIONER DETAILS" | `isTaxPractitionerFiling` (inferred, see below), `taxPractitionerRegistrationNumber`, `taxPractitionerTelNumber`, `taxPractitionerNoEmailDeclared`, `taxPractitionerEmailAddress` |
| §15.2.4 "DECLARATION" | `declarationDate`, `declarationStatement` document |
| §15.2.5 "INTERNATIONAL" (no counterpart in any sibling) | `ownsForeignAssetsOrInvestments`, `receivedIncomeSubjectToForeignTaxes`, `madePaymentsToNonResidentForServicesInSa`, `totalPaymentsMadeToNonResident` |
| §15.2.6 "FOREIGN EXCHANGE GAINS/LOSSES" (no counterpart) | `fxGainLossCounterpartyConnectedPerson`, `fxGainLossRealisedDuringYear`, `isDomesticTreasuryManagementCompany` |
| §15.2.7 "FOREIGN DIVIDENDS" (no counterpart) | `receivedForeignDividends`, `claimedForeignDividendExemption`, `foreignDividendsSubjectToParticipationExemption` |
| §15.2.8 "CAPITAL GAINS" (no counterpart) | `claimedExemptionDisposalEquitySharesForeignCompany` |
| §15.2.9 "SA WITHHOLDING TAX" (no counterpart) | `wasTaxWithheldAgainstRoyaltiesInterestDividends` |
| §15.2.10 "CONTROLLED FOREIGN COMPANY" (no counterpart) | `holdsMoreThan10PercentInControlledForeignCompany`, `numberOfControlledForeignCompanies` |
| §15.2.11 "DOUBLE TAXATION" (no counterpart) | `earnedForeignIncomeNotTaxableInSaDoubleTaxAgreement` |
| §15.2.12 "REPORTABLE ARRANGEMENT" | `hasRoundTripFinancingS80d`, `hasOffsettingElementsS80c`, `hasAccommodatingPartyS80e` |
| §15.2.13 "DIVIDENDS DECLARED" | `totalDividendsSubjectToStc`, `totalDividendsSubjectToDividendsTax`, `totalDividendsExemptFromDividendsTax`, `totalDividendsSubjectToDoubleTaxationRelief`, `totalDividendsInSpecieDeclared` |
| §15.2.14 "STC CREDITS" (no counterpart) | `utilisedStcCreditsAgainstDividends`, `stcCreditsOpeningBalance`, `stcCreditsReceived`, `stcCreditsUtilised`, `stcCreditsClosingBalance` |
| §15.2.15 "NON-RESIDENCY" | `nonResidentDueToForeignIncorporation`, `nonResidentDueToTaxTreaty`, `dateCeasedToBeResident` |
| §15.2.16 "HEADQUARTER COMPANY" (no counterpart) | `hqCompliesShareholding10Percent`, `hqCompliesAssetBase80Percent`, `hqCompliesGrossIncome50Percent`, `headquarterCompanySchedule` document |
| §15.2.18 "ADDITIONAL ASSESSMENT INFORMATION" | `consentToProvideFinancialStatementsToCipc` through `hasDifferentTaxRateForOilAndGas` (33 fields — see `steps.additional_assessment_information`) |
| §15.2.19 "CRYPTO ASSETS TRANSACTIONS" | `cryptoAssetsIncludedInIncomeStatement`, `grossCryptoAssetsAmountInIncomeStatement`, `cryptoAssetTransactionsResultedInProfit`, `cryptoAssetsProfitAmount`, `cryptoAssetsLossAmount`, `amountOfCryptoAssetsInBalanceSheet` |
| §15.2.22 "URBAN DEVELOPMENT ZONE (s13quat)" | `udzBuildingInApprovedDemarcatedZone` through `udzIncurredLowCostHousingCosts` (9 fields) |
| §15.2.25 "COMPANY STRUCTURE" | `ultimateHoldingEntityName`, `ultimateHoldingEntityRegistrationNumber`, `isUltimateHoldingCompanyResidentOutsideSA`, `ultimateHoldingCompanyTaxResidencyCountryCode`, `ultimateHoldingCompanyIncomeTaxReferenceNumber`, `isPartnerInUnincorporatedJointVenture`, `isPartOfGroupWithConsolidatedTurnoverOverR1Billion` |
| §15.2.26 "SUBSIDIARY DETAILS" (no counterpart) | `groupConsolidatedTurnover`, `groupOrganogram` document |
| §15.2.27 "MULTINATIONAL ENTITY (MNE)" | `mneReportingEntityTaxJurisdiction`, `mneReportingEntityName`, `mneReportingEntityIncomeTaxNumber`, `mneReportingEntityTaxIdentificationNumber`, `mneReportingEntityRole`, `mneGroupReportingFiscalYearEnd` |
| §15.2.28 "BALANCE SHEET" | `nonCurrentAssetsFixedProperty` through `otherCurrentLiabilitiesDescription` (64 fields) |
| §15.2.29 "INCOME STATEMENT" | `grossSalesForeignConnected` through `otherExpenseItemsDescription` (89 fields) |
| §15.2.31 "DEBIT ADJUSTMENTS" | `accountingInterestReceivedReceivableAllowable` through `otherAdjustmentsAllowableDescription` (25 fields) |
| §15.2.32 "CREDIT ADJUSTMENTS" | `accountingInterestPaidPayableAddBack` through `otherAddBackDescription` (40 fields) |
| §15.2.35 "RECOUPMENT..." (filer-entered line only) | `imputedNetIncomeFromCfc` |
| §15.2.39/§15.2.40 "DONATIONS ALLOWABLE..." | `totalAmountDonated`, `averageValueOfParticipatoryInterests` |
| §15.2.41 "CORPORATE RULES" (no counterpart) | `assetForShareTransactionS42`, `substitutiveShareForShareTransactionS43`, `amalgamationTransactionS44`, `intraGroupTransactionS45`, `unbundlingTransactionS46`, `liquidationWindingUpDeregistrationS47` |
| §15.2.42 "DEDUCTION (s7F)..." | `s7fDeductionAmount` |
| §15.2.43 "DEDUCTION s6quat(1C)..." | `s6quat1cDeductionAmount`, `hadRightOfRecoveryOtherThanMap`, `foreignTaxRefundedDuringYear`, `taxableIncomeFromSaSourcedTradeTaxedOutsideSa` |
| §15.2.45 "REDUCTION OF LOCAL/FOREIGN ASSESSED CAPITAL LOSS..." | `localDebtReductionAmount`, `foreignDebtReductionAmount` |
| §15.2.48 "FOREIGN TAX CREDITS REFUNDED/DISCHARGED" | `foreignTaxRefundedAllowedAsRebate`, `foreignTaxRefundedAllowedAsS6quat1cDeduction` |
| §15.2.49 "PENALTIES..." (no counterpart) | `penaltyNonQualifyingInvestmentsS37a6`, `penaltyImpermissibleDistributionsMiningRehabS37a7` |
| §15.2.54 "MINING AND QUARRYING" (no counterpart) | `conductedMiningInMultipleMines` through `conductedMiningWithoutLegalOwnership` (6 fields), `miningSchedule` document |
| §15.2.55 "CONSTRUCTION" (no counterpart) | `hadCreditorsRetentionsWithSubcontractors`, `incurredLossesContractWorkInProgressS22_3a` |
| §15.2.56 "WHOLESALE AND RETAIL TRADE" (no counterpart) | `enteredAgreementDiscloseDebtorsBookTo3rdParty` |
| §15.2.57 "FINANCIAL AND INSURANCE ACTIVITIES" (no counterpart) | `bankClaimedDoubtfulDebtProvisionExcessAgreedWithSars`, `madeCapitalContributionOrLoanToTrust`, `claimedDeductionProvisionExGratiaPayments` |

Total: **417 fields**, 7 `documents` entries, 26 `steps`.

## Key structural findings versus the four sibling ITR14 documents

- **Annexure E is 55 guide pages (§15, pp.115-169) — the largest of the five
  Annexures**, versus 44 for Small Business (Annexure D) and 10-24 for
  Dormant/Micro Business/Body Corporate. Reading it in full surfaced **nine
  sections with no counterpart in any of the four sibling documents**:
  International (§15.2.5), Foreign Exchange Gains/Losses (§15.2.6), Foreign
  Dividends (§15.2.7), Controlled Foreign Company (§15.2.10), Double Taxation
  (§15.2.11), STC Credits (§15.2.14), Headquarter Company (§15.2.16),
  Subsidiary Details (§15.2.26), and Corporate Rules (§15.2.41) — plus four
  SIC-code-gated industry-specific sections (Mining and Quarrying,
  Construction, Wholesale and Retail Trade, Financial and Insurance
  Activities, §§15.2.54-15.2.57) that likewise have no sibling counterpart.
- **Non-residency branching is more elaborate than any sibling's.** Where
  Small Business (and the other three siblings) gate the Non-Residency
  section on a single `isResidentInSouthAfrica == false`, Medium to Large
  Business additionally asks, when `isResidentInSouthAfrica` is `true`,
  whether the company `ceasedToBeResidentDuringYear` — a company that was
  resident for part of the year and ceased being resident mid-year still
  needs the Non-Residency section and `dateCeasedToBeResident`. This document
  models both fields and gates Non-Residency on
  `any(isResidentInSouthAfrica == false, ceasedToBeResidentDuringYear == true)`,
  rather than collapsing to the simpler siblings' single boolean gate.
- **The Balance Sheet and Income Statement are dramatically larger** than any
  sibling's, and split many lines by Local/Foreign and Connected/Non-Connected
  that the smaller Annexures collapse into a single line: the Balance Sheet's
  Non-Current Assets and Non-Current Liabilities sections each carry 8
  separate long-term-loan lines (interest free/interest bearing ×
  connected/non-connected × local/foreign) versus 2 combined lines in Small
  Business, plus Investments in subsidiaries, Goodwill and intellectual
  property, and a Group companies current accounts line with no Small
  Business counterpart (64 Balance Sheet fields here vs. 24 in Small
  Business); the Income Statement adds Admin/secretarial fee splits by
  connected/local/foreign, Interest splits the same way, Accommodation and
  travel (local/foreign), Employee expenses broken into 7 separate lines
  (wages, group life, UIF/SDL, pension/provident, medical scheme,
  professional body, training), and Royalties/Interest/Management fee splits
  by local/foreign or connected/non-connected (89 Income Statement fields
  here vs. 40 in Small Business).
- **The guide's own Income Statement expense-item list contains an apparent
  duplicate**: item (SS) "Repairs and maintenance" and item (VV) "Repair and
  maintenance" (§15.2.29(e)(i)) are the same line under two labels a few
  entries apart. Modelled once here as `repairsAndMaintenance`, treated as an
  OCR/authoring artifact in the source guide rather than two distinct
  currency fields — a reviewer should double-check this judgment call against
  a fresh read of that page.
- **The Tax Computation Debit/Credit Adjustment lists are similar in
  structure to Small Business's** (§15.2.31/§15.2.32 vs. §14.2.22/§14.2.23:
  24 debit items, 39-40 credit items) but not identical in content — Medium
  to Large Business's credit-adjustment list adds several items with no
  Small Business counterpart (e.g. "Accounting losses derived from foreign
  sources (excluding CFC)", "Foreign exchange loss adjustment relating to
  debt (s24I(4))"). Both lists are modelled here in full as individually
  optional currency fields, following `za/sars/corporate-income-tax-return-itr14-small-business`'s
  precedent, since the guide uses identical "only complete the relevant
  currency fields... a pop-up selection box will display" language.
- **Judgment call — the four industry-specific sections (Mining and
  Quarrying, Construction, Wholesale and Retail Trade, Financial and
  Insurance Activities) are modelled as always-optional fields, not gated
  with `requiredWhen`.** Each displays only when `standardIndustryCode`
  starts with a specific numeric prefix (05/06/07/08/09, 41/42/43, 45/46/47,
  64/65/66 respectively) — a string-prefix test GSP-0013 has no operator for,
  the same class of limitation already recorded for `profitCodeOtherDescription`
  in every sibling document. Each field's own `description` states the real
  gating condition. Unlike the large itemised containers this document
  defers wholesale, these industry blocks are compact (2-6 simple Yes/No/
  numeric questions each) and are modelled in full rather than deferred,
  since GSP-0013's field model has no difficulty representing them
  individually — only the conditional-display logic is unexpressed.

## Scope cuts (deliberate)

All per spec v0.3's lack of a repeating/nested field model (SPEC.md Section 12),
mirroring the discipline already established in all four sibling ITR14
documents, **plus** the same class of large itemised "pop-up selection box"
Tax Computation sub-blocks the Small Business sibling deferred, now larger
still in Annexure E, and the wholly-new Transfer Pricing containers:

- **Share/Membership Register** (§15.2.23-15.2.24, up to 4 sub-containers
  each repeating up to 20 rows, plus a "Details of Membership" sub-container
  new to this Annexure) and **Details of Beneficial Owner(s)** (§15.2.24,
  repeats 0-9 times) — only the top-level gating/count fields
  (`doesCompanyHaveMembers`, `howManyBeneficialOwners`, `howManyClassesOfShares`)
  are modelled.
- **Contributed Tax Capital** (§15.2.21, repeats per class of share) — only
  the top-level gate (`howManyClassesOfShares`, `isResidentInSouthAfrica`)
  is modelled; the per-class description and 7 currency movement fields are
  out of scope.
- **Schedule of Local/Foreign Capital Gains and Losses** (§15.2.44, an
  unbounded repeating table) — only the top-level gating booleans
  (`hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`,
  `receivedReturnOfCapital`) and the two single-field debt-reduction amounts
  (§15.2.45, not repeating) are modelled.
- **PAYE Credits Available** (§15.2.46, repeats per IRP5 certificate) — only
  the top-level gate and count (`wantsPayeCredits`, `numberOfIrp5Certificates`)
  are modelled.
- **Donations Allowable to approved organisations** (§15.2.39-15.2.40,
  repeats up to 20 organisations) — only the top-level gate, count, and
  total-amount fields are modelled, not the per-organisation name/PBO-number/
  amount rows.
- **Partnership/Joint Ventures** (§15.2.50, repeats per partnership) — only
  the top-level gate and count (`isPartnerInPartnership`,
  `howManyPartnershipsJointVentures`) are modelled.
- **Taxable Distribution(s) from all Trust(s)** (§15.2.18(a)(ix)(D), repeats
  per trust) — only the top-level gate and count fields
  (`isBeneficiaryOfTrust`, `howManyTrusts`, `receivedDistributionFromTrust`,
  `numberOfTrustsForDistributions`) are modelled, not the per-trust name/
  registration number/tax reference number/CGT-and-taxable-income
  distribution rows.
- **Foreign Tax Credits: Taxable Foreign Sourced Income of Resident
  Companies — s6quat(1A)** (§15.2.47) — deferred in full; itself a nested
  computation container comparable in scope to the Tax Computation section.
- **Personal Service Provider's full decision-tree questionnaire** (§15.2.17)
  and **Special Economic Zone's full mandatory sub-questionnaire** (§15.2.20)
  — only the top-level gates (`isPersonalServiceProvider`,
  `isQualifyingSezCompany`) are modelled, matching all four siblings'
  identical scope cut.
- **"SPECIAL ALLOWANCES NOT CLAIMED IN THE INCOME STATEMENT"** (§15.2.31
  continued, ~83 individually selectable line items spanning s11(cA) through
  s40CA — effectively identical in scope to Small Business's equivalent
  block) — deferred as a whole, the single largest sub-block in the guide.
- **"ALLOWANCES/DEDUCTIONS GRANTED IN PREVIOUS YEARS OF ASSESSMENT AND NOW
  REVERSED"** (§15.2.33), **"AMOUNTS NOT CREDITED TO THE INCOME STATEMENT"**
  (§15.2.34), and the remainder of **"RECOUPMENT OF ALLOWANCES/EXPENSES
  PREVIOUSLY GRANTED"** (§15.2.35, except `imputedNetIncomeFromCfc`) — all
  deferred as a whole, matching Small Business's precedent exactly.
- **"Details of Enhanced Renewable Energy Deduction — s12BA"** (§15.2.36),
  **"TAX ALLOWANCES/LIMITATIONS"** (§15.2.37, a very large confirmation-
  question decision tree — materially longer in Annexure E than in Small
  Business, covering additional Medium/Large-specific declarations e.g.
  around Interest limitation (s11G) tests worded differently for "Small
  Company" vs. "medium or large companies"), and **"INCURRAL OF INTEREST IN
  RESPECT OF CERTAIN DEBTS DEEMED TO BE IN THE PRODUCTION OF INCOME (S24O)"**
  (§15.2.38, a multi-branch acquisition-transaction decision tree, no
  counterpart in any sibling document) — all three deferred in full, each
  gated on fields inside the deferred Special Allowances block, so none has
  an anchor field in this document; these dependencies are disclosed rather
  than papered over with a substitute gate.
- **Transfer Pricing: Received/Receivable** (§15.2.51), **Paid/Payable**
  (§15.2.52), and **Supporting Information** (§15.2.53) — all new to
  Annexure E and deferred in full, being unbounded per-jurisdiction
  repeating matrices (Top 5 Jurisdictions × 10 currency fields × Foreign
  Connected/Non-Connected, for both received and paid transactions) far
  beyond spec v0.3's field model. Only the top-level gating booleans
  (`enteredAffectedTransactionS31`, `receivedOrAccruedIncomeAffectedTransaction`,
  `incurredExpenditureAffectedTransaction`) are modelled.
- **All SARS-calculated fields** (Total Non-Current/Current Assets, Total
  Capital and Reserves, Total Non-Current/Current Liabilities, Gross Profit/
  Loss subtotal, both Income Statement Control Totals, Net Profit/Loss
  subtotal, all Tax Computation section Control Totals, Balance of
  Contributed Tax Capital, Calculated Profit/Loss before CFC income) are
  excluded, consistent with this registry's established discipline of not
  modelling derived/computed values (SPEC.md §16).

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login, which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- **`isTaxPractitionerFiling`** is an inferred gating field, not a
  verbatim-quoted wizard question — the same caveat recorded in all four
  sibling ITR14 documents' VERIFICATION.md files.
- **The Debit/Credit Adjustment fields' `required: false` treatment** is
  carried over unchanged from `za/sars/corporate-income-tax-return-itr14-small-business`'s
  own judgment call (itself flagged there as a departure from
  `za/sars/corporate-income-tax-return-itr14-body-corporate`'s shorter,
  `required: true` equivalent fields) — a reviewer should double-check this
  chain of precedent rather than accept it purely on inheritance.
- **`mneReportingEntityIncomeTaxNumber` and
  `mneReportingEntityTaxIdentificationNumber`** are mutually exclusive
  depending on whether the reporting entity's tax jurisdiction is South
  Africa or another country — carried over unchanged from the Small
  Business sibling's identical §14.2.18 wording; this display logic is
  described in each field's own `description` rather than expressed as a
  `requiredWhen` condition, since GSP-0013 has no operator for "field equals
  a specific string constant" that avoids the notEquals-against-an-optional-field
  pitfall already documented in this registry's engineering notes.
- **`profitCodeOtherDescription`** and the **four industry-specific
  sections' fields** (Mining/Construction/Wholesale/Financial) cannot be
  expressed as `requiredWhen` conditions under GSP-0013 (their triggers are
  string-suffix/prefix conditions on `profitCodeMainSource`/`standardIndustryCode`'s
  own values, not separate boolean fields) — modelled as always-optional
  fields with descriptions explaining the real-world condition instead of a
  fabricated gate.
- **`farmingScheduleParagraph`** is left `required: false` with no
  `requiredWhen` gate even though it only applies when
  `participatedInFarmingActivities` is `true`, because the guide's own
  language frames the paragraph selection as optional ("if any") even in
  that case — same treatment as all four siblings.
- **`repairsAndMaintenance`** models what appears in the guide's own text as
  two duplicate line items under near-identical labels (§15.2.29(e)(i)(SS)
  and (VV)) as a single field — flagged above under "Key structural
  findings" for a reviewer to double-check against a fresh page read.
- **`ceasedToBeResidentDuringYear`** and its `any(...)` gate on the
  Non-Residency section is a new interpretive structure not present in any
  sibling document — a reviewer should double-check this against the guide's
  §15.1.10(d) wording (reproduced in full in this document's field
  descriptions) and, ideally, a live wizard walkthrough.
- **Annexures A-D** (Dormant, Body Corporate/Share Block, Micro Business,
  Small Business — already modelled separately) are out of scope for this
  document. This document closes the ZA SARS ITR14 company-type Annexure
  set: **all five Annexures (A-E) are now modelled.**

## Mock-data test run

A complete, illustrative mock filing — "Highveld Alloys and Engineering
(Pty) Ltd", a Gauteng-based steel/metal-components manufacturer with gross
income of roughly R84.5 million and total assets of roughly R61.2 million
(exceeding the Small Business thresholds), an offshore trading subsidiary, a
>10% stake in a controlled foreign company, MNE-group membership, 3
beneficial owners, 2 classes of shares, a modest s18A donation, PAYE credits
across 46 IRP5 certificates, and no Headquarter Company/SEZ/UDZ elections —
is recorded in
[`conformance/za/sars/corporate-income-tax-return-itr14-medium-large-business/1.0.0/application-packet.json`](../../../../../conformance/za/sars/corporate-income-tax-return-itr14-medium-large-business/1.0.0/application-packet.json).

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member — recursively resolving `all`/`any`
combinators to a fixed point across multiple passes since some conditions
chain — and checking exact 1:1 coverage against the packet's
`collectedValues`/`notApplicableFields`): `totalFields: 417`,
`collectedCount: 278`, `notApplicableCount: 139`, `errors: 0`. The higher
collected fraction than Small Business's run (278/417 = 67% vs. 141/283 =
50%) reflects the Balance Sheet/Income Statement's much larger compulsory
field count (64 + 89 = 153 fields, all `required: true`, most completed
with R0 per the guide's own "complete zero (0) if not applicable"
instruction) rather than a materially different optional/mandatory ratio in
the wizard-gated sections.

Three mutation tests confirmed the evaluator is not trivially passing every
input: (1) stripping the four MNE detail fields
(`mneReportingEntityTaxJurisdiction`, `mneReportingEntityName`,
`mneReportingEntityRole`, `mneGroupReportingFiscalYearEnd`) while
`isMemberOfMneGroup` remained `true` correctly raised 4 violations; (2)
stripping the six Company Structure/Subsidiary Details fields
(`ultimateHoldingEntityName`, `ultimateHoldingEntityRegistrationNumber`,
`isUltimateHoldingCompanyResidentOutsideSA`,
`isPartnerInUnincorporatedJointVenture`,
`isPartOfGroupWithConsolidatedTurnoverOverR1Billion`,
`groupConsolidatedTurnover`) while
`isPartOfGroupPreparingConsolidatedFinancialStatements` remained `true`
correctly raised 6 violations; (3) flipping `hasS37aPenalty` to `true`
without either penalty currency field correctly raised 2 violations
(`penaltyNonQualifyingInvestmentsS37a6`,
`penaltyImpermissibleDistributionsMiningRehabS37a7`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by walking the live `sarsefiling.co.za` wizard end to end
with a registered eFiler account, for a company classified as Medium to
Large Business matching this document's scope; resolves any discrepancy —
especially `isTaxPractitionerFiling`'s inferred gating, the Debit/Credit
Adjustment fields' `required: false` treatment, the `ceasedToBeResidentDuringYear`
branching logic, and the `repairsAndMaintenance` duplicate-label judgment
call, all flagged above as unconfirmed — by shipping a **new schema
version** (immutability — VERSIONING §3); and records the outcome here plus
sets `status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any
`source.url` change.
