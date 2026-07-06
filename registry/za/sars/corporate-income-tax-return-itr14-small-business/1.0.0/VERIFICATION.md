# Verification record — `za/sars/corporate-income-tax-return-itr14-small-business` v1.0.0

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
  `za/sars/corporate-income-tax-return-itr14-micro-business`, and
  `za/sars/corporate-income-tax-return-itr14-body-corporate`; this document
  reads Section 14 ("ANNEXURE D — SMALL BUSINESS", §§14.1-14.2, pp.71-115)
  in full — the exact page range's text was extracted verbatim via the same
  `pdfjs-dist` technique, cross-referenced against the full 174-page guide
  where a shared definition (e.g. Partnerships fields) was defined just
  before Section 14 begins.
- `www.sarsefiling.co.za` (the live eFiling portal) requires a registered
  eFiler login to reach the actual return wizard; it was not walked
  screen-by-screen this cycle — the same constraint recorded in all three
  sibling ITR14/ITR12 VERIFICATION.md files in this registry.

## Sources examined

- **Document `(id, version)`:** `za/sars/corporate-income-tax-return-itr14-small-business` / `1.0.0`
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
| §14.1.1 "REGISTERED DETAILS" | `detailsVerifiedAndConfirmed`, `publicOfficerCompliant` |
| §14.1.2 "DORMANT" | `isCompanyDormant`, `becameDormantDuringYear`, `ceasedTradingDuringPeriod` |
| §14.1.3 "COMPANY TYPE" | `isCooperative`, `isAssociationOfPersons`, `isNonProfitCompany`, `isCollectiveInvestmentScheme`, `isBodyCorporateSectionalTitles`, `isShareBlockCompany`, `doesCompanyHaveMembers`, `grossIncomeSalesTurnoverPlusOtherIncome`, `totalAssetsCurrentAndNonCurrent` |
| §14.1.4 "CAPITAL GAIN/LOSS TRANSACTIONS" | `hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`, `hadDebtReducedForNoConsideration`, `reductionForLocalAsset`, `reductionForForeignAsset` |
| §14.1.5 "VOLUNTARY DISCLOSURE PROGRAMME" | `relatesToVoluntaryDisclosureProgramme` |
| §14.1.6 "SMALL BUSINESS CORPORATION" | `isSmallBusinessCorporationS12E` |
| §14.1.7 "SPECIAL ECONOMIC ZONES" | `isQualifyingSezCompany` |
| §14.1.8 "DEDUCTION (s7F)..." | `wantsS7fDeduction` |
| §14.1.9 "DONATIONS (S18A)" | `wantsS18aDonationsDeduction`, `howManyOrganisationsDonatedTo` |
| §14.1.10 "TAX CREDITS" | `wantsPayeCredits`, `numberOfIrp5Certificates`, `wantsForeignTaxCreditsS6quat1a`, `hadForeignTaxCreditsRefunded`, `wantsS6quat1cDeduction` |
| §14.1.11 "COMPANY INFORMATION" | `howManyClassesOfShares`, `isPartnerInPartnership`, `howManyPartnershipsJointVentures`, `isPersonalServiceProvider`, `isListedOnRecognisedStockExchange`, `isResidentInSouthAfrica`, `hadCryptoAssetTransactionsExcludingCgt`, `howManyBeneficialOwners`, `qualifiesForUdzDeductionS13quat`, `enteredReportableArrangement`, `numberOfReportableArrangements`, `wereDividendsDeclared`, `isPartOfGroupPreparingConsolidatedFinancialStatements`, `isMemberOfMneGroup` |
| §14.1.12 "CUSTOMS INFORMATION" | `isRegisteredForCustoms`, `numberOfCustomsClientCodes` |
| §14.2.1 "COMPANY/CLOSE CORPORATION PARTICULARS" | `taxReferenceNumber`, `yearOfAssessment`, `registeredName`, `tradingName`, `companyRegistrationNumber`, `financialYearEnd`, `isReturnForForeignBranchOrAgency`, `provinceOfMajorityIncome`, `standardIndustryCode`, `profitCodeMainSource`, `profitCodeOtherDescription` |
| §14.2.2 "TAX PRACTITIONER DETAILS" | `isTaxPractitionerFiling` (inferred, see below), `taxPractitionerRegistrationNumber`, `taxPractitionerTelNumber`, `taxPractitionerNoEmailDeclared`, `taxPractitionerEmailAddress` |
| §14.2.4 "DECLARATION" | `declarationDate`, `declarationStatement` document |
| §14.2.5 "REPORTABLE ARRANGEMENT" | `hasRoundTripFinancingS80d`, `hasOffsettingElementsS80c`, `hasAccommodatingPartyS80e` |
| §14.2.6 "DIVIDENDS DECLARED" | `totalDividendsSubjectToStc`, `totalDividendsSubjectToDividendsTax`, `totalDividendsExemptFromDividendsTax`, `totalDividendsSubjectToDoubleTaxationRelief`, `totalDividendsInSpecieDeclared` |
| §14.2.7 "NON-RESIDENCY" | `nonResidentDueToForeignIncorporation`, `nonResidentDueToTaxTreaty`, `dateCeasedToBeResident` |
| §14.2.9 "ADDITIONAL ASSESSMENT INFORMATION" | `consentToProvideFinancialStatementsToCipc` through `hasDifferentTaxRateForOilAndGas` (33 fields — see `steps.additional_assessment_information`) |
| §14.2.10 "CRYPTO ASSETS TRANSACTIONS" | `cryptoAssetsIncludedInIncomeStatement`, `grossCryptoAssetsAmountInIncomeStatement`, `cryptoAssetTransactionsResultedInProfit`, `cryptoAssetsProfitAmount`, `cryptoAssetsLossAmount`, `amountOfCryptoAssetsInBalanceSheet` |
| §14.2.11 "SMALL BUSINESS CORPORATION" (completion stage) | `sbcGrossIncome`, `sbcDeclarationInvestmentAndPersonalServiceIncomeUnder20Percent`, `sbcDeclarationNotPersonalServiceProvider`, `sbcDeclarationAllShareholdersNaturalPersons`, `sbcDeclarationNoCrossHoldingsInOtherEntities` |
| §14.2.14 "URBAN DEVELOPMENT ZONE (s13quat)" | `udzBuildingInApprovedDemarcatedZone` through `udzIncurredLowCostHousingCosts` (9 fields) |
| §14.2.17 "COMPANY STRUCTURE" | `ultimateHoldingEntityName`, `ultimateHoldingEntityRegistrationNumber`, `isUltimateHoldingCompanyResidentOutsideSA`, `ultimateHoldingCompanyTaxResidencyCountryCode`, `ultimateHoldingCompanyIncomeTaxReferenceNumber`, `isPartnerInUnincorporatedJointVenture`, `isPartOfGroupWithConsolidatedTurnoverOverR1Billion` |
| §14.2.18 "MULTINATIONAL ENTITY (MNE)" | `mneReportingEntityTaxJurisdiction`, `mneReportingEntityName`, `mneReportingEntityIncomeTaxNumber`, `mneReportingEntityTaxIdentificationNumber`, `mneReportingEntityRole`, `mneGroupReportingFiscalYearEnd` |
| §14.2.19 "BALANCE SHEET" | `nonCurrentAssetsPropertyPlantEquipment` through `otherCurrentLiabilitiesDescription` (24 fields) |
| §14.2.20 "INCOME STATEMENT" | `salesTurnover` through `otherExpenseItemsDescription` (40 fields) |
| §14.2.22 "DEBIT ADJUSTMENTS: Non-Taxable Amounts Credited" | `accountingInterestReceivedReceivableAllowable` through `otherAdjustmentsAllowableDescription` (24 fields) |
| §14.2.23 "CREDIT ADJUSTMENTS: Non-Deductible Amounts Debited" | `accountingInterestPaidPayableAddBack` through `otherAddBackDescription` (39 fields) |
| §14.2.26 "RECOUPMENT OF ALLOWANCES/EXPENSES PREVIOUSLY GRANTED" (filer-entered line only) | `imputedNetIncomeFromCfc` |
| §14.2.29/§14.2.30 "DONATIONS ALLOWABLE..." | `totalAmountDonated`, `averageValueOfParticipatoryInterests` |
| §14.2.31 "DEDUCTION (I.T.O. s7F)..." | `s7fDeductionAmount` |
| §14.2.32 "DEDUCTION I.T.O. s6quat(1C)..." | `s6quat1cDeductionAmount`, `hadRightOfRecoveryOtherThanMap`, `foreignTaxRefundedDuringYear`, `taxableIncomeFromSaSourcedTradeTaxedOutsideSa` |
| §14.2.34/§14.2.35 "REDUCTION OF LOCAL/FOREIGN ASSESSED CAPITAL LOSS..." | `localDebtReductionAmount`, `foreignDebtReductionAmount` |
| §14.2.38 "FOREIGN TAX CREDITS REFUNDED/DISCHARGED" | `foreignTaxRefundedAllowedAsRebate`, `foreignTaxRefundedAllowedAsS6quat1cDeduction` |

Total: **283 fields**, 4 `documents` entries, 21 `steps`.

## Key structural findings versus the three sibling ITR14 documents

- **Annexure D is 44 guide pages (§14, pp.71-115) versus 10-24 pages for the
  three siblings** (Dormant, Micro Business, Body Corporate/Share Block).
  Reading it in full surfaced eight sections with no counterpart in any
  sibling document: Small Business Corporation eligibility (§14.1.6,
  §14.2.11), Reportable Arrangement (§14.1.11(i), §14.2.5), Dividends
  Declared (§14.1.11(j), §14.2.6), Additional Assessment Information
  (§14.2.9, 33 fields), Urban Development Zone (§14.1.11(h), §14.2.14),
  Company Structure (§14.1.11(k), §14.2.17), Multinational Entity group
  details (§14.1.11(l), §14.2.18), and Contributed Tax Capital (§14.2.13,
  deferred — see below).
- **The Dormant branching logic (§14.1.2) is more complex than the other
  three siblings' simple `isCompanyDormant=false` gate.** Answering "Yes" to
  `isCompanyDormant` and then "Yes" to `becameDormantDuringYear` (the company
  became dormant/inactive *during* the year, i.e. it was trading for part of
  it) still results in the company **not** being regarded as Dormant — the
  Company Type questions display, matching this document's Small Business
  scope. Only "Yes" + "No" (continuously dormant all year) keeps the company
  classified Dormant, out of scope here (see
  `za/sars/corporate-income-tax-return-itr14-dormant`). This document models
  both `isCompanyDormant` and `becameDormantDuringYear` (the latter with
  `fieldRole: "eligibility"`, `eligibleValues: [true]`) to capture this
  correctly, rather than collapsing it to a single boolean gate as the
  simpler siblings do.
- **The Balance Sheet and Income Statement carry materially more line items**
  than the shared, smaller containers in Dormant/Micro/Body-Corporate.
  Small Business's Balance Sheet adds Investments in associates and joint
  ventures, separate interest-bearing/interest-free long-term loan lines, a
  Debtors (excl. trade) line, and Short-term investments (24 fields total vs.
  ~11 in the smaller siblings); its Income Statement adds Admin/Management/
  secretarial/rentals, Dividends in specie (s8F/s8FA), Dividends received,
  Insurance proceeds received, Alterations and improvements, Consulting/
  legal/professional fees, Directors'/members' remuneration, and soil-erosion
  expenditure (s17A) (40 fields total vs. ~26-27 in the smaller siblings).
- **The Tax Computation Debit/Credit Adjustment lists are markedly larger and
  separately itemised**, unlike the siblings' single, shorter, combined
  "Adjustments Added Back"/"Adjustments Allowable" lists (~18-20 items each).
  Guide §14.2.22 ("DEBIT ADJUSTMENTS: Non-Taxable Amounts Credited") lists
  ~24 items and §14.2.23 ("CREDIT ADJUSTMENTS: Non-Deductible Amounts
  Debited") lists ~40 — both modelled here in full as individually optional
  currency fields. A further, much larger "SPECIAL ALLOWANCES NOT CLAIMED IN
  THE INCOME STATEMENT" list (§14.2.22 continued, ~84 items) has no
  equivalent in the three siblings at all — see the scope-cut section below.
- **Judgment call — Debit/Credit Adjustment fields are modelled as
  `required: false`, not `required: true`.** The guide's own language for
  §§14.2.22-14.2.23 is "Only complete the relevant currency fields... a
  pop-up selection box will display from which only those adjustments
  relevant to the company must be selected and completed" — materially
  different from the Balance Sheet/Income Statement's "All fields... are
  compulsory... complete zero (0) if not applicable." This document departs
  from `za/sars/corporate-income-tax-return-itr14-body-corporate`'s
  equivalent (shorter) "Adjustments Added Back"/"Adjustments Allowable"
  fields, which were modelled `required: true` — a difference a reviewer
  should double-check, since it is possible Body Corporate's own (unread by
  this cycle) §12.2.10 guide text uses the same "only complete relevant"
  language and its `required: true` treatment was itself an over-strict
  carry-over from the Balance Sheet/Income Statement convention.

## Scope cuts (deliberate)

All per spec v0.3's lack of a repeating/nested field model (SPEC.md Section 12),
mirroring the discipline already established in all three sibling ITR14
documents, **plus** four additional large itemised "pop-up selection box"
sub-blocks specific to Annexure D's much larger Tax Computation section that
are deferred as a whole because each is comparable in scope/complexity to a
repeating container:

- **Share/Membership Register** (§14.2.15-14.2.16, up to 4 sub-containers,
  each repeating up to 20 rows) and **Details of Beneficial Owner(s)**
  (§14.2.16, repeats 0-9 times) — only the top-level gating/count fields
  (`doesCompanyHaveMembers`, `howManyBeneficialOwners`, `howManyClassesOfShares`)
  are modelled.
- **Contributed Tax Capital** (§14.2.13, repeats per class of share, up to
  the value entered in `howManyClassesOfShares`) — only the top-level gate
  (`howManyClassesOfShares`, `isResidentInSouthAfrica`) is modelled; the
  per-class description and 7 currency movement fields are out of scope.
- **Schedule of Local/Foreign Capital Gains and Losses** (§14.2.33, an
  unbounded repeating table) — only the top-level gating booleans
  (`hadLocalCapitalGainOrLoss`, `hadForeignCapitalGainOrLoss`,
  `receivedReturnOfCapital`) and the two single-field debt-reduction amounts
  (§14.2.34-14.2.35, not repeating) are modelled.
- **PAYE Credits Available** (§14.2.36, repeats per IRP5 certificate) — only
  the top-level gate and count (`wantsPayeCredits`, `numberOfIrp5Certificates`)
  are modelled.
- **Donations Allowable to approved organisations** (§14.2.29-14.2.30,
  repeats up to 20 organisations) — only the top-level gate, count, and
  total-amount fields are modelled, not the per-organisation name/PBO-number/
  amount rows.
- **Partnership/Joint Ventures** (§14.2.39, repeats per partnership) — only
  the top-level gate and count (`isPartnerInPartnership`,
  `howManyPartnershipsJointVentures`) are modelled.
- **Taxable Distribution(s) from all Trust(s)** (§14.2.9(b), repeats per
  trust) — only the top-level gate and count fields (`isBeneficiaryOfTrust`,
  `howManyTrusts`, `receivedDistributionFromTrust`,
  `numberOfTrustsForDistributions`) are modelled, not the per-trust name/
  registration number/tax reference number/CGT-and-taxable-income
  distribution rows.
- **Foreign Tax Credits: Taxable Foreign Sourced Income of Resident
  Companies — s6quat(1A)** (§14.2.37) — deferred in full; itself a nested
  computation container comparable in scope to the Tax Computation section.
- **Personal Service Provider's full decision-tree questionnaire** (§14.2.8)
  and **Special Economic Zone's full mandatory sub-questionnaire** (§14.2.12)
  — only the top-level gates (`isPersonalServiceProvider`,
  `isQualifyingSezCompany`) are modelled, matching all three siblings'
  identical scope cut.
- **"SPECIAL ALLOWANCES NOT CLAIMED IN THE INCOME STATEMENT"** (§14.2.22
  continued, ~84 individually selectable line items spanning s11(cA) through
  s40CA) — deferred as a whole. This is the single largest sub-block in the
  guide and has no counterpart in any sibling document (their much shorter
  combined "Adjustments Allowable" lists cover only ~6 of these 84 items).
  Explicitly disclosed here and in the schema's own `description` rather than
  silently dropped.
- **"ALLOWANCES/DEDUCTIONS GRANTED IN PREVIOUS YEARS OF ASSESSMENT AND NOW
  REVERSED"** (§14.2.24, ~9 items, several pre-populated from the deferred
  Special Allowances block) — deferred as a whole.
- **"AMOUNTS NOT CREDITED TO THE INCOME STATEMENT"** (§14.2.25, ~15 items)
  — deferred as a whole.
- **"RECOUPMENT OF ALLOWANCES/EXPENSES PREVIOUSLY GRANTED"** (§14.2.26,
  ~12 items) — deferred as a whole, **except** `imputedNetIncomeFromCfc`
  (§14.2.26(c)(iv)), which is retained as a standalone field since the guide
  describes it as filer-entered (Source Code 4276), consistent with all
  three sibling documents, unlike the SARS-calculated "Calculated profit/
  loss excluding net income from CFC" lines in the same subsection.
- **"Details of Enhanced Renewable Energy Deduction — s12BA"** (§14.2.27)
  and **"TAX ALLOWANCES/LIMITATIONS"** (§14.2.28, a large confirmation-
  question decision tree) — both deferred in full. Both are gated on fields
  that live inside the deferred Special Allowances block (e.g.
  `enhancedRenewableEnergyDeductionS12ba`), so they have no anchor field in
  this document; this dependency is disclosed rather than papered over with
  a substitute gate.
- **All SARS-calculated fields** (Total Non-Current/Current Assets, Total
  Capital and Reserves, Total Non-Current/Current Liabilities, Gross Profit/
  Loss subtotal, both Income Statement Control Totals, Net Profit/Loss
  subtotal, all five Tax Computation section Control Totals, Balance of
  Contributed Tax Capital, Calculated Profit/Loss before CFC income) are
  excluded, consistent with this registry's established discipline of not
  modelling derived/computed values (SPEC.md §16).

## What is NOT yet independently verified

- The **live `sarsefiling.co.za` wizard** was not walked screen-by-screen
  this cycle: it requires a registered eFiler login, which could not be
  exercised. Field names/labels here are the guide's own quoted wording, not
  the wizard's HTML field IDs.
- **`isTaxPractitionerFiling`** is an inferred gating field, not a
  verbatim-quoted wizard question — the same caveat recorded in all three
  sibling ITR14 documents' VERIFICATION.md files.
- **The Debit/Credit Adjustment fields' `required: false` treatment**
  (see "Key structural findings" above) is a judgment call a reviewer should
  double-check against Body Corporate's own (shorter) equivalent fields,
  which were modelled `required: true`.
- **`mneReportingEntityIncomeTaxNumber` and
  `mneReportingEntityTaxIdentificationNumber`** are mutually exclusive
  depending on whether the reporting entity's tax jurisdiction is South
  Africa or another country — this display logic is described in each
  field's own `description` rather than expressed as a `requiredWhen`
  condition, since GSP-0013 has no operator for "field equals a specific
  string constant" that avoids the notEquals-against-an-optional-field
  pitfall already documented in this registry's engineering notes. A
  reviewer implementing this schema should treat the two fields as an
  either/or pair keyed on `mneReportingEntityTaxJurisdiction`.
- **`profitCodeOtherDescription`** cannot be expressed as a `requiredWhen`
  condition under GSP-0013 (its trigger is "the selected profit code ends
  with '98'", a suffix condition on `profitCodeMainSource`'s own value, not
  a separate boolean field) — modelled as an always-optional field with a
  description explaining the real-world condition instead of a fabricated
  gate, matching all three sibling documents.
- **`farmingScheduleParagraph`** is left `required: false` with no
  `requiredWhen` gate even though it only applies when
  `participatedInFarmingActivities` is `true`, because the guide's own
  language frames the paragraph selection as optional ("if any") even in
  that case.
- **`donationsS18aAddBack`/`donationsOtherAddBack`** are guide-documented as
  pre-populated from their Income Statement counterparts and locked;
  retained as plain fields anyway per this registry's established precedent.
- **Annexures A, B, C, and E** (Dormant, Body Corporate/Share Block, and
  Micro Business — already modelled separately; Medium to Large Business)
  are out of scope for this document. Annexure E (Medium to Large Business)
  is now the sole remaining unmodelled ITR14 company-type Annexure.

## Mock-data test run

A complete, illustrative mock filing — "Karoo Reeds Manufacturing (Pty) Ltd",
a small manufacturing company in Gqeberha, Eastern Cape, with gross income of
roughly R8.5 million and total assets of roughly R4.2 million (comfortably
inside the Small Business thresholds), 2 beneficial owners, a modest s18A
donation, and a straightforward Balance Sheet/Income Statement/Tax
Computation with no Small Business Corporation, SEZ, UDZ, Company Structure,
or MNE elections — is recorded in
[`conformance/za/sars/corporate-income-tax-return-itr14-small-business/1.0.0/application-packet.json`](../../../../../conformance/za/sars/corporate-income-tax-return-itr14-small-business/1.0.0/application-packet.json).

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member and checking exact 1:1 coverage against the
packet's `collectedValues`/`notApplicableFields`): `totalFields: 283`,
`collectedCount: 141`, `notApplicableCount: 142`, `errors: 0`. The relatively
even split reflects §§14.2.22-14.2.23's ~63 individually-optional Tax
Computation adjustment fields (see the `required: false` judgment call
above), of which the mock scenario only populates the two directly tied to
declared Income Statement lines (`depreciationAddBack`, `donationsS18aAddBack`).

Two mutation tests confirmed the evaluator is not trivially passing every
input: (1) setting `isCompanyDormant` to `true` while leaving
`becameDormantDuringYear` unanswered correctly raised 1 violation for that
field; (2) flipping `isPartOfGroupPreparingConsolidatedFinancialStatements`
to `true` without adding its downstream Company Structure fields correctly
raised 5 violations (`ultimateHoldingEntityName`,
`ultimateHoldingEntityRegistrationNumber`,
`isUltimateHoldingCompanyResidentOutsideSA`,
`isPartnerInUnincorporatedJointVenture`,
`isPartOfGroupWithConsolidatedTurnoverOverR1Billion`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by walking the live `sarsefiling.co.za` wizard end to end
with a registered eFiler account, for a company classified as Small Business
matching this document's scope; resolves any discrepancy — especially
`isTaxPractitionerFiling`'s inferred gating and the Debit/Credit Adjustment
fields' `required: false` treatment, both flagged above as unconfirmed — by
shipping a **new schema version** (immutability — VERSIONING §3); and records
the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any
`source.url` change.
