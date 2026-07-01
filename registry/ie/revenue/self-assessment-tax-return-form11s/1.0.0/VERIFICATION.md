# Verification record — `ie/revenue/self-assessment-tax-return-form11s` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was derived directly from the official 2025 Form 11S PDF and its
companion helpsheet PDF. The full field-by-field comparison the practice
requires against the **live ROS Form 11 online screens** (Procedure step 2)
has not been completed, so this remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `ie/revenue/self-assessment-tax-return-form11s` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Office of the Revenue Commissioners ("Revenue").
- **Primary source:** <https://www.revenue.ie/en/self-assessment-and-self-employment/documents/form-11s.pdf>
  — the fillable "Income Tax Return and Self-Assessment for the year 2025,
  Form 11S" PDF, fetched directly (no access block) and its text extracted
  from the PDF's compressed content streams (zlib-inflated, `Tj`/`TJ`
  operators parsed directly — the same technique recorded in a prior
  authoring session's memory notes for PDFs without a `pdftotext`/OCR
  toolchain available).
- **Secondary source:** <https://www.revenue.ie/en/self-assessment-and-self-employment/documents/form11s-helpsheet.pdf>
  — the companion "2025 Tax Return - Helpsheet - Form 11S", fetched and
  extracted the same way. Used for panel-letter context, line-number
  cross-references, and prose explaining several boxes the bare form PDF
  does not itself gloss (e.g. Home Carer Tax Credit tapering, the
  Expression of Doubt facility, Local Property Tax surcharge).
- **Retrieved / reviewed:** 2026-07-01.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Panel A civil status, dependent children, incapacitation, PPSN/DOB/gender for self and spouse/civil partner | `civilStatus`, `personalCircumstancesChangedIn2025`, `civilStatusChangeDate`, `previousCivilStatus`, `basisOfAssessment`, `dateOfMarriageOrCivilPartnership`, `numberOfDependentChildren`, `selfPermanentlyIncapacitated`, `spousePermanentlyIncapacitated`, `taxpayerSurname`, `taxpayerFirstName`, `ppsn`, `taxpayerDateOfBirth`, `taxpayerGender`, `spouseOrCivilPartnerSurname`, `spouseOrCivilPartnerFirstName`, `spouseOrCivilPartnerPpsn`, `spouseOrCivilPartnerDateOfBirth`, `dateOfDeathOfSpouseOrCivilPartner` |
| Panel B self-employed trade, Line 108 assessable net profit, Line 121 withholding tax credit, income-averaging elections | `hasSelfEmployedIncome`, `selfEmployedTradeOwner`, `descriptionOfTrade`, `assessableNetProfit`, `withholdingTaxCredit`, `incomeAveragingElection`, `shareFarmingTrade` |
| Panel D Line 222 gross pay, Line 223 source-of-income category, Line 224(c) employer refund, Line 240(b) allowable expenses | `hasPayeIncome`, `payeIncomeRecipient`, `payeIncomeSourceType`, `grossPayFromEmployment`, `allowableEmploymentExpenses`, `employerRefundOfPriorEmploymentTax` |
| Panel E Line 233 PAYE tax refunded, Line 234 PAYE tax underpaid, Line 245 taxable social welfare payments | `payeTaxRefundedDuringYear`, `payeTaxUnderpaidPriorYears`, `socialWelfarePensionAmount` |
| Panel F foreign pensions and the "file a full Form 11 instead" gate for other foreign income | `hasForeignIncomeOtherThanPensions`, `foreignPensionAmount`, `foreignPensionReliefClaimed`, `foreignPensionCountry` |
| Panel G Line 402 DIRT-deducted deposit interest, other Irish income gross/tax-deducted | `irishDepositInterestDirt`, `irishOtherIncomeGross`, `irishOtherIncomeTaxDeducted` |
| Panel H Line 415(a) Rent-a-Room, Line 416 childcare-services exemption election | `rentARoomGrossIncome`, `childcareServicesGrossIncome`, `childcareExemptionElected` |
| Panel I Line 502 maintenance payments | `maintenancePaymentsNotDeducted` |
| Panel J Lines 515(a), 516, 517, 518, 519, 520, 526, 534 — named personal tax credits | `homeCarerTaxCreditClaimed`, `homeCarerIncome`, `employeeTaxCreditClaimed`, `earnedIncomeTaxCreditClaimed`, `blindPersonsTaxCreditClaimed`, `assistanceDogTaxCreditClaimed`, `dependentRelativeTaxCreditClaimed`, `tuitionFeesPaid`, `rentTaxCreditClaimed`, `rentPaidAmount` |
| Panel P Lines 936(a) through 936(i), late-filing and LPT surcharges, bank details, signature | `totalIncomeForPeriod` through `capacityOfSignatory` (see schema for the full Panel P field set) |

## What is NOT independently confirmed (out of scope)

- **Panels C (Irish Rental Income) and L (Capital Gains) are entirely out of
  scope.** Both are per-property/per-asset repeating schedules (Form 11S
  Lines 204-217 for rental; a free-form asset-description table for gains).
  The v0.3 flat field model has no repeating-group construct (GSP-0009),
  the same limitation already recorded for `gb/companies-house/company-incorporation-in01`
  (additional directors/subscribers) and `us/ca/dmv/vehicle-title-transfer`
  (notarized lien-release path). The helpsheet itself directs anyone with
  such income to the full Form 11 in any case.
- **The exact lettering of some Panel A sub-boxes.** The PDF text-extraction
  technique used here (zlib-inflate + direct `Tj`/`TJ` parsing, since no
  `pdftotext`/OCR tool is available in this environment) recovers word-level
  text reliably but not always the precise sub-box letter a given phrase sits
  under, where the source form itself uses closely-spaced parenthetical
  letters (e.g. `(a)(b)(c)`). Field names and descriptions were written from
  the surrounding prose rather than a quoted box letter in those cases.
- **The full lettered source-of-income category list at Line 223.** The
  helpsheet states the categories are "(a), (g), (h), (i) or (j)" but only
  "(a) Employment" and "(i) Pension - Employment pension" were legibly
  recovered from the form PDF itself; `payeIncomeSourceType`'s enum is
  therefore a reasonable reconstruction (`employment` /
  `occupational_pension` / `social_welfare_pension` / `other`), not a
  verbatim transcription of all five categories. A future review pass
  should re-derive this enum against the live ROS Form 11 screens, which
  render each category as a labelled checkbox.
- **The exact declaration statement text.** "YOU MUST SIGN THIS DECLARATION"
  was recovered as a heading, but the declaration's own attestation wording
  was not confirmed, so `declarationSigned` models the act of signing
  without a `documents[]` `attestation` entry quoting exact text (unlike
  other schemas that do quote a confirmed statement).
- **Panel H "(a)/(c)" Single Person Child Carer Credit and the two named
  children (Child 1/Child 2) fields.** These exist on the form but were
  judged a fixed-cardinality-of-two composite the current field model would
  either flatten awkwardly or under-represent; left out of scope pending a
  richer composite-value model (GSP-0009 tracks this generally).
- **Health expenses (Line 541) and Non-Routine Dental Expenses.** Present on
  the form under Panel L's page but not modelled — reachable only alongside
  the already-out-of-scope Capital Gains panel on that page, and not
  independently re-confirmed as belonging to a separate, in-scope panel.
- **Whether a third gender option exists on the live online ROS service.**
  The PDF form itself offers only "Male" / "Female"; not independently
  checked against the authenticated online flow.

## Time-versioning and the `edition` axis (flagged spec gap)

Form 11S is genuinely time-versioned — Revenue reissues a fresh edition every
tax year with year-specific content (the 2025 edition here; a "2025 Form 11S"
watermark appears throughout the source PDF) — the same shape as
`gb/hmrc/self-assessment-tax-return-sa100` and `us/irs/individual-income-tax-return-1040`,
both of which use the `edition` axis (GSP-0005). However, spec v0.3's
`edition.scheme` enum is **closed** to `us-tax-year` / `gb-tax-year` /
`award-year` (SPEC.md §5.7) — none of which is correct for Ireland, whose tax
year is the plain calendar year (like `us-tax-year`'s shape) but is not the
United States. Reusing `us-tax-year` for an Irish document would be
structurally fine but semantically misleading to a consumer keying off scheme
name.

Rather than either (a) mislabeling the scheme, or (b) unilaterally extending a
closed, one-way-door enum (SPEC.md explicitly marks §5.7 as settled only by
maintainer sign-off, per GSP-0005's own header), this document is published
at the **plain, non-edition** registry path
(`registry/ie/revenue/self-assessment-tax-return-form11s/1.0.0/schema.json`)
for this cycle. A future tax year would therefore require a MAJOR version
bump rather than a coexisting edition — an honest but real compromise flagged
for correction once the scheme vocabulary is generalized.

See `spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` for
the proposal recommending a jurisdiction-neutral edition scheme addition, and
the GOV-430 issue thread for the routing to the Founding Engineer/CEO.

## Scope and jurisdiction notes

- **Form 11S is Revenue's own simplified substitute for Form 11**, issued to
  a chargeable person Revenue has determined has "straightforward tax
  affairs," not a form an applicant chooses freely — this document models
  the substitute form as received, consistent with the source's own framing.
- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  targeting spec v0.3.
- `hasForeignIncomeOtherThanPensions` is modelled as `fieldRole: eligibility`
  with a `to: null` exit transition, since a `true` answer means the
  applicant should be using the full Form 11 instead, not this document.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live ROS Form 11 online screens (the panels the
helpsheet says apply to a Form 11S filer), resolves the ambiguous-lettering
and category-enum items above, and records the outcome here — shipping a new
schema version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2026 tax year's edition of Form 11S is
published, since the source content itself changes annually.
