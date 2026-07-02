# Verification record — `nz/ird/individual-tax-return-ir3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from the official 2026 IR3 form PDF and its
companion IR3G guide PDF. The full field-by-field comparison the practice
requires against the **live myIR online return** (Procedure step 2) has not
been completed, so this remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `nz/ird/individual-tax-return-ir3` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Inland Revenue Te Tari Taake ("Inland Revenue" / "IRD").
- **Primary source:** <https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir1---ir99/ir3/ir3-2026.pdf>
  — the fillable "IR3 2026, Individual tax return" PDF (7 pages, questions
  1-44), fetched directly (no access block) and its text extracted with
  `pdfjs-dist` (`getTextContent`, items grouped into lines by rounded
  y-coordinate; `getAnnotations` enumerated separately for AcroForm field
  metadata).
- **Secondary source:** <https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir1---ir99/ir3g/ir3g-2026.pdf>
  — the companion "IR3G 2026, Individual income tax return guide" (64 pages),
  extracted the same way. Used to confirm the IRD-number box format ("8 digit
  numbers start in the second Box"), the provisional-tax option codes
  (Standard 'S' / Estimation 'E' / Ratio 'R'), the BIC-code instruction
  ("Please provide the code only. Do not provide a description"), and the
  exact Question 42 declaration wording.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## A note on the source PDF's internal field names

The IR3 PDF is a fillable AcroForm. Its internal field names (recovered via
`getAnnotations`) run **one question number ahead** of the printed, visible
question numbers from Question 23 onward — for example, the AcroForm field
literally named `"28"` occupies the same page position as printed Question
27's total box, and the field named `"34A yes/no"` sits at printed Question
33A. This is consistent with the form's PDF template having been carried
forward from an earlier revision with one fewer numbered question, without
the internal field names being renumbered to match. Every field and
`sourceRef` in this document cites the **printed** Question/Box number (what
a filer or an agent reading the rendered form actually sees), never the
PDF's internal AcroForm field name, to avoid propagating that internal
off-by-one quirk into the schema.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Front page Boxes 1-9A: IRD number, title/name, postal and residential address, date of birth, BIC code, phone, bank account, income-adjustment tick | `irdNumber` through `adjustingIncomeForStudentLoanOrWorkingForFamilies` |
| Question 11 (income with tax deducted) and Question 12 (schedular payments), Boxes 11A-11E, 12A-12D | `hasIncomeWithTaxDeducted` through `schedularPaymentsNet` |
| Questions 13-16 (NZ interest, dividends, Māori authority distributions, estate/trust income), Boxes 13A-13C, 14/14A-14C, 15A-15B, 16A-16C | `hasNzInterest` through `totalNonComplyingTrustDistributions` |
| Questions 17-20 (overseas, partnership, LTC, shareholder-employee income), Boxes 17A-17C, 18A-18B, 19A-19E, 20/20A-20C | `hasOverseasIncome` through `wffMajorShareholderWorkingWithoutPay` |
| Question 21 (tax credit and income subtotal), Boxes 21A-21B | `taxCreditSubtotal`, `incomeSubtotal` |
| Question 22 (residential property income/expenses), method tick and Boxes 22A-22I | `hasResidentialPropertyIncomeOrExpenses` through `excessResidentialRentalDeductionsCarriedForward` |
| Questions 23-30 (other rents, self-employment, property sales, government subsidy, other income, total income, other expenses, income after expenses), Boxes 23-30 | `hasOtherRents` through `incomeAfterExpenses` |
| Questions 31-35 (net losses brought forward, taxable income, IETC, excess imputation credits, PIE income), Boxes 31A-31B, 32, 33/33A-33C, 34, 35A-35C | `claimingNetLossesBroughtForward` through `pieCalculationOutcome` |
| Questions 36-38 (tax calculation, early payment discount, refunds), Boxes 36/36A-36B, 38/38A-38B/38I | `taxOnTaxableIncome` through `remainingRefundAmount` |
| Questions 39-42 (2027 provisional tax, foreign-entity disclosure, part-year return, declaration), Boxes 39A-39B, 40, 41A-41C, 42 | `residualIncomeTaxExceeds5000Debit` through `signatureDate` |
| Question 42 declaration statement, quoted verbatim | `documents[].declarationAttestation` |
| Adjust your income - IR215 (Box 9A) and Overseas income summary - IR1261 (Question 17) as attached documents | `documents[].adjustYourIncomeIr215`, `documents[].overseasIncomeSummaryIr1261` |

## What is NOT independently confirmed (out of scope)

- **Boxes 38C-38H — transferring a refund to a *different* taxpayer's income
  tax account or student loan.** Both sub-sections require a second
  taxpayer's name, IRD number, an "are you associated?" disclosure, and (for
  the income-tax-account transfer) a year-ended and amount. This is a
  repeating other-party-detail structure the v0.3 flat field model has no
  construct for (GSP-0009), the same limitation already recorded for
  `gb/companies-house/company-incorporation-in01` (additional directors/
  subscribers) and `ie/revenue/self-assessment-tax-return-form11s` (Panels C
  and L). `remainingRefundAmount` (Box 38I) is modelled since it is a single
  self-assessed total, but the two transfer sub-sections that feed it are
  not.
- **The PIE worksheet and the tax calculation worksheet**, both printed only
  in the companion IR3G guide, not the IR3 form itself. Each worksheet's own
  line-by-line arithmetic is out of scope; only the totals the form directs a
  filer to transfer onto the IR3 itself (`pieCalculationOutcome` at Box 35C,
  `taxOnTaxableIncome`/`residualIncomeTax`/`taxCalculationResult` at Boxes
  36/36A/36B) are modelled.
- **Box 39C** ("if you've already elected to use the ratio option and want
  to continue using it") and the guide's cross-reference to a separate
  "Provisional tax - IR289" guide are noted in `provisionalTaxOption`'s
  description but not modelled as separate fields; `provisionalTaxOption`'s
  enum values (`S`/`E`/`R`) are the literal option codes the source form and
  guide use, not expanded English names, since the guide states them as
  single letters at Box 39A.
- **Question 44 "Correspondence indicator" / "OFFICE USE ONLY"** on page 7 is
  explicitly an internal Inland Revenue processing field, not an applicant
  input, and is excluded.
- **The exact BIC-code format.** The guide directs filers to
  businessdescription.co.nz to look up a code but does not itself state a
  fixed length or character-class pattern, so `bicCode` has only a
  `maxLength` constraint, not a `pattern`.
- **Whether myIR's online IR3 flow asks every question in the same order or
  groups any of them differently** from the paper form modelled here. Only
  the paper/PDF form and its guide were reviewed; the live myIR screens were
  not.

## Time-versioning and the `edition` axis (flagged spec gap)

The IR3 is genuinely time-versioned — Inland Revenue reissues a fresh edition
every income year with year-specific content and dates (the "IR3 2026"
watermark and "1 April 2025 to 31 March 2026" appear throughout the source
PDF) — the same shape as `gb/hmrc/self-assessment-tax-return-sa100`,
`us/irs/individual-income-tax-return-1040`, and
`ie/revenue/self-assessment-tax-return-form11s`, all of which either use the
`edition` axis (GSP-0005) or are blocked from it by the same gap this
document hits. Spec v0.3's `edition.scheme` enum is **closed** to
`us-tax-year` / `gb-tax-year` / `award-year` (SPEC.md SS5.7) — none of which is
correct for New Zealand, whose income year runs 1 April to 31 March (neither
a plain calendar year nor either of the two named national schemes).

Rather than either (a) mislabeling the scheme, or (b) unilaterally extending
a closed, one-way-door enum, this document is published at the **plain,
non-edition** registry path
(`registry/nz/ird/individual-tax-return-ir3/1.0.0/schema.json`) for this
cycle, consistent with the workaround already recorded for the IE Form 11S.
A future income year would therefore require a MAJOR version bump rather
than a coexisting edition — an honest but real compromise flagged for
correction once the scheme vocabulary is generalized.

See `spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` for
the proposal recommending a jurisdiction-neutral edition scheme addition,
and the GOV-430/GOV-442 issue threads for the routing to the Founding
Engineer/CEO. This is the **second** reference schema (after IE Form 11S) to
hit this exact gap, reinforcing that it affects more than one jurisdiction.

## Scope and jurisdiction notes

- The catalog candidate flagged that "most PAYE-only earners do NOT file an
  IR3 at all" — IRD auto-assesses most individuals from employer-withholding
  data, and filing an IR3 is required only above a threshold of untaxed
  income. This document does not add a separate top-level "do you need to
  file at all" eligibility field, since the source form itself has no such
  question (a filer only reaches the IR3 once IRD, or the filer's own
  self-assessment, has already determined an IR3 is required) — inventing a
  gate with no corresponding box would be a fabricated field, not a
  source-derived one. The description records this applicability context
  instead, consistent with the *spec precision over cleverness* lens
  (document what the source says, not what would be convenient to add).
- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  targeting spec v0.3.
- Most Question-level gate fields (`hasIncomeWithTaxDeducted`,
  `hasNzInterest`, etc.) are marked `fieldRole: eligibility` since a "No"
  answer routes the filer past that question's Boxes entirely, following the
  same convention GSP-0014 introduces and `ie/revenue/self-assessment-tax-return-form11s`
  already uses for its own panel gates.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live myIR online IR3 filing screens, resolves
the BIC-code pattern and Box 39C ratio-option-continuation items above, and
records the outcome here — shipping a new schema version if discrepancies
are found (VERSIONING.md SS3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2027 income year's edition of the IR3 is
published, since the source content itself changes annually.
