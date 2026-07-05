# Verification record — `kr/nts/year-end-tax-settlement-income-deduction-report` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field in this schema was read directly from the text layer of the
National Tax Service's own official English-language guide, which reproduces
the gazetted Enforcement Rule of the Income Tax Act's Attached Form No.
37(1)-(3) as an English original (not a translation). It remains `draft`, not
`verified`, because a live NTS Hometax portal walkthrough and a second
independent reviewer's field-by-field pass have not yet occurred — see "What
is NOT yet independently verified" below.

## Access notes

- Retrieved directly from `nts.go.kr`, HTTP 200, no login required, three
  editions cross-checked: the 2020 edition
  (`nts.go.kr/upload/english/sub/2020 Easy Guide for Foreigners' Year-end Tax
  Settlement.pdf`), a 2022 edition (`d.nts.go.kr`), and the current 2025
  edition (issue date Dec. 2025, `nts.go.kr/comm/nttFileDownload.do`). All
  three are genuine text-layer PDFs (not scanned images); this document is
  sourced from the **2025 edition**, the most current at retrieval time.
- Extracted with `pdfjs-dist`'s `getTextContent` (238 pages), the same
  technique used throughout this registry for encrypted/complex-layout gov
  PDFs (see memory note `gov-form-pdf-extraction`). Chapter IX "Tax Forms"
  (guide pp.187-214) was read in full; Form 37(1)-(3) spans guide pp.199-203
  (3 of the form's official 10 printed pages — the guide's English section
  reproduces only the substantive, non-duplicative pages of the form, per
  its own "(Page 1 of 10)"/"(Page 2 of 10)"/"(Page 3 of 10)" page markers).
  A second, coordinate-based extraction (grouping text items by y-position
  to reconstruct table rows) was run over the same three PDF pages to
  disambiguate the form's multi-column matrix layout (personal-deduction
  table, pension/insurance/housing-fund tables, tax-credit table) before
  fields were authored.
- This is the fourth South Korean schema in the registry
  (`kr/mofa/passport-application-first-adult`, GOV-1289;
  `kr/koroad/driving-licence-application`, GOV-1291;
  `kr/nec/overseas-voter-registration`, GOV-1294;
  `kr/moj/visa-application`, GOV-1292) and closes the last of the five KR
  verticals GOV-1289's research rated STRONG (Passport, DMV, Visa, National
  ID, Taxes) — only Business Formation remains unmodelled for KR, rated WEAK
  in that research since IROS/startbiz.go.kr both require certificate login.
  This is also the registry's first schema sourced from a guide document
  that is itself an **official English original** of a Korean gazetted form,
  rather than a bilingual form or a Claude-vision reading of a Korean-only
  source — the lowest translation-risk KR source found so far.

## Sources examined

- **Document `(id, version)`:** `kr/nts/year-end-tax-settlement-income-deduction-report` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** National Tax Service (국세청, NTS), Republic of Korea
- **Primary source (directly retrieved, HTTP 200, text layer read in full):**
  <https://www.nts.go.kr/comm/nttFileDownload.do?fileKey=01059b95704bfc331d222bb2b4e7a927>
  — "2025 Easy Guide for Foreigners' Year-end Tax Settlement" (Issue Date
  Dec. 2025), Chapter IX "Tax Forms", pp.199-203: Enforcement Rule of the
  Income Tax Act, Draft Attached Form No. 37(1)-(3), "Report of Income
  Deduction & Tax Credit / Report of Income Deduction & Tax Credit from Wage
  & Salary Income".
- **Corroborating context (read for scope/background, not field-sourced):**
  guide Chapter VI "Examples of Income Tax Calculation for 2025" (pp.139-151,
  used for the mock-data conformance run below), guide p.55 (documentary
  evidence table, used to populate `documents[]`), guide p.211/213 (Form 8
  and Form 29-2(3), the flat-tax-rate and tax-treaty companion election
  forms, referenced but not separately field-modelled), and guide p.205 (the
  companion "Statement of Income Deduction & Tax Credit for Pension,
  Savings, etc." form, likewise referenced but not separately field-modelled).

## What was confirmed against the source

- **Header/income-earner identification fields** (`incomeEarnerName` through
  `taxWithholdingRatio`): read verbatim from the form's own header block —
  name, resident/alien registration number, place of work, business
  registration number, household head/member, nationality (+code), length
  of service, tax reduction/exemption period, residency status, state of
  residence (+code), change-of-personal-deduction-items election, payment
  in installments, and the 120%/100%/80% tax-withholding-ratio election
  (form footnote: "you can choose between 120%, 100%, 80% of the tax amount
  that you withhold monthly").
- **Section I (personal deduction / income deduction & tax credit items):**
  the filer-level fields (`numberOfPersonsEligibleForPersonalDeduction`,
  `numberOfChildren`, `filerIsWoman`, `filerIsSingleParent`,
  `filerDisabilityCode`) and the per-dependent fields (flattened to one
  primary dependent, per this registry's established repeating-table
  convention — see `kr/moj/visa-application`'s
  `mostRecentKoreaVisitPurpose` precedent, since spec v0.3 has no
  array/repeating-group model, SPEC.md §6.1) are sourced directly from the
  form's own column headers and its numbered Instructions 1-7 (relationship
  codes 0-8, age/income criteria, "Woman" eligibility conditions, disability
  classification codes 1-3, Citizen=1/Foreigner=9 codes). The
  education-expense/credit-card-spending/donation fields that follow in the
  same section (`generalEducationExpenses` through
  `publicTransportationSpending`) are filer-level aggregate totals per the
  form's own second sub-table, not further broken out per dependent.
- **Section II (pension premium deduction)** and **Section III (special
  income deduction):** national/other-public pension premium,
  national-health/employment-insurance premium (each split
  current-workplace/previous-workplace exactly as the form does), and the
  housing rental loan / long-term mortgage loan gating booleans and
  aggregate repayment fields, all sourced directly from the form's own
  labelled rows.
- **Section IV (other income deductions):** individual pension savings
  (with its 720,000-won-or-40%-of-deposit ceiling note), small-business
  mutual-aid deposits, housing-purchase savings, investment-association
  contributions, ESOP contributions, and long-term collective investment
  securities savings — sourced directly, aggregated across the form's own
  narrower sub-categories where noted (see "What is NOT yet independently
  verified" below).
- **Section V (tax reduction/exemption & tax credit) — the foreign-worker-
  specific core of this document:** `foreignWorkerExemptionPurpose`'s four
  named pathways (inter-government agreement, technology introduction
  contract, Restriction of Special Taxation Act, tax treaty) are transcribed
  verbatim from the form's own "Purpose of entry" checkbox row, alongside
  the receipt/submission-date field pairs for the RSTA and tax-treaty
  pathways. The tax-credit fields (pension account, special tax credit's
  insurance/medical/education/donation/foreign-tax-credit/housing-mortgage-
  interest/monthly-rent items, each with the form's own stated ceiling and
  credit-rate percentages) are transcribed directly from the form's own
  "Type of tax credit / Details / Ceiling / Tax credit ratio" table.
- **Section VI (additional documents for submission)** and the
  **Declaration:** the four yes/no document checklist questions (flat-tax-
  rate application, secondary workplace, pension/savings statement, monthly
  rent & mortgage statement) and the filer's Article-140 declaration
  statement are transcribed verbatim, including the form's own note that a
  filer who fails to report secondary-workplace income to the withholding
  agent must file global income tax themselves or face penalty tax.
- **`documents[]`:** sourced from two places — the form's own Section VI
  checklist (which gates `pensionSavingsStatement` and
  `monthlyRentAndMortgageStatement`) and the guide's separate p.55
  "Documentary evidence" table (which names the Alien Registration
  Certificate, the flat-tax-rate election form, and the foreign-
  engineer/employee tax-reduction application by their official titles).

## Mock-data conformance run

A mock application packet
(`conformance/kr/nts/year-end-tax-settlement-income-deduction-report/1.0.0/application-packet.json`)
models a Chinese-national foreign engineer ("Yuan") employed since
2023-01-01, claiming the Restriction of Special Taxation Act's foreign-
engineer tax reduction, with a spouse ("Amy") and one child ("Charlie") as
dependents. Wage, national pension premium, national health insurance
premium, and credit card spending figures are transcribed verbatim from the
guide's own worked calculation example ("Case 5. A foreign engineer's
year-end tax settlement", p.151) — Yuan/Amy/Charlie are the guide's own
illustrative names, not real persons. Administrative values the
calculation-only example does not state (registration numbers, business
registration number, exemption expiration date, submission dates,
declaration date) are synthesized illustrative values, flagged inline in
`application-packet.txt`, consistent with this registry's established
practice for calculation-example-derived packets (see
`kr/nec/overseas-voter-registration`'s `declarationDate` precedent).

A from-scratch evaluator script (not reused from any other schema's
evaluator) was written to check the packet against every field's effective
`required`/`requiredWhen`, `enum`/`minimum`/`maxLength` validation, every
`crossFieldValidation` rule, and every `documents[].requiredWhen` condition:

- **Result: 0 errors** across all 117 fields, 3 `crossFieldValidation`
  rules, and 7 `documents[]` entries.
- 3 documents evaluated as required for this scenario:
  `residentAlienRegistrationCopy`, `incomeDeductionTaxCreditEvidence`, and
  `foreignEngineerOrEmployeeTaxReductionApplication` (gated correctly on
  `foreignWorkerExemptionPurpose = restriction_of_special_taxation_act`).
- **Mutation testing** (to confirm the evaluator is not vacuously passing):
  three deliberate single-field mutations were run against the same
  evaluator and packet. All three were correctly flagged: (1) removing
  `declarationAgreed` → `MISSING REQUIRED`; (2) setting
  `exemptionExpirationDate` before `technologyContractOrLaborStartDate` →
  `CROSS-FIELD VIOLATION` (`exemptionExpirationNotBeforeContractStart`); (3)
  setting `residencyStatus` to an out-of-enum value (`"maybe"`) →
  `ENUM VIOLATION`.

## What is NOT yet independently verified

- **Granular sub-matrix breakdowns are deliberately aggregated, not
  modelled cell-by-cell:** the source form itself further subdivides several
  of this document's aggregate fields — long-term housing mortgage loan
  interest by borrowing year (before/after 2012), term length (10-15/15-29/
  30+ years), and interest-rate type (fixed/non-deferred vs. other);
  investment-association contributions by contribution year (2023/2024/
  2025) and association (1/2); housing-purchase savings by product type
  (savings account for housing purchase / worker's housing-purchase savings
  / collective savings account for housing subscription). Modelling every
  combination would push this document well past 150 fields for narrow,
  low-incidence categories; each aggregation is flagged in the relevant
  field's own `description`.
- **Three companion forms are referenced only as `documents[]` entries, not
  separately field-modelled:** the "Application for Flat Tax Rate for
  Foreign Employees" (Attached Form No. 8, guide p.211), the "Application
  for Non-Taxation & Exemption ... Under a Tax Treaty" (Attached Form No.
  29-2(3), guide p.213), and the "Statement of Income Deduction & Tax Credit
  for Pension, Savings, etc." (guide p.205) each have their own field-level
  structure not modelled here — a future GovSchema document could model
  each as its own `kr/nts/...` schema.
- **The NTS Hometax simplified year-end tax settlement service** (the
  guide's own Appendix, pp.217-233) — the live portal workflow for
  looking up and submitting pre-filled income-deduction/tax-credit data —
  was not exercised; this document only models the paper/PDF form's own
  field set, consistent with the KR-registry-wide "no login-gated portal"
  sourcing constraint already recorded for `kr/moj/visa-application`
  (HiKorea e-Application) and `nz/dia/realme-verified-identity`.
- A live filing walkthrough and a second independent reviewer's
  field-by-field pass have not yet occurred.

## Path to a `verified` claim (next step)

A second reviewer should independently re-download the 2025 edition PDF,
re-extract Chapter IX pp.199-203, and cross-check each field's `sourceRef`
against the extracted text (as done for the other three KR schemas' review
gates). If confirmed with no material discrepancies, `status` can move from
`draft` to `verified` and `verification.method` can be updated accordingly.

## Re-verification

- **Next review due:** `2027-01-05` (per `verification.nextReviewBy`).
- Re-check against the NTS's next annual edition of the guide (published
  each December for the following year's settlement) for any changed
  ceilings, credit-rate percentages, or added/removed deduction categories —
  the guide itself documents such year-over-year changes in its own
  "Summary of Changes to Tax Laws" section.
