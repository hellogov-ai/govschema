# Verification record — `gb/hmrc/self-assessment-tax-return-sa100` edition `2024-25`, v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`edition`:** `gb-tax-year` / `2024-25` (tax year 6 April 2024 to 5 April 2025)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

Every numbered box on the eight main-return pages was **transcribed box-by-box from
the official HMRC SA100 (2025) PDF** and mapped to a field. The structure is
source-faithful, but the full field-by-field re-verification the practice requires
(`manual-source-review-v1` → Procedure step 2) against the live online Self
Assessment service (which requires sign-in) has **not** been completed
screen-by-screen. It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, edition, version)`:** `gb/hmrc/self-assessment-tax-return-sa100` / `2024-25` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** His Majesty's Revenue and Customs (HMRC)
- **Primary source (landing page):** <https://www.gov.uk/government/publications/self-assessment-tax-return-sa100>
- **Document reference:** Form **SA100 (2025)** — main tax return, tax year **6 April 2024 to 5 April 2025**
- **PDF transcribed:** the SA100 2025 main return (8 pages, TR 1–TR 8; InDesign generation timestamp 2025-03-03, "Use form SA100(2025) to file a tax return")
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Edition rationale

The SA100 is a **time-versioned form**: HMRC publishes a fresh edition each UK tax
year, keyed to the 6 April–5 April year, with figures and occasional structural
changes that differ from the prior year. Per [GSP-0005] / spec `§5.7`, this is an
`edition`, **not** a SemVer `version` bump, so it is stored at
`registry/gb/hmrc/self-assessment-tax-return-sa100/2024-25/1.0.0/schema.json`. The
`id` stays year-agnostic (`gb/hmrc/self-assessment-tax-return-sa100`) so it names
the process across all editions, and `edition.label` (`2024-25`) equals the
`<edition>` path segment (spec `§10` rule 6). This is the second GovSchema document
to exercise the edition axis, after `us/irs/extension-to-file-4868/2025`
(`us-tax-year`); this one exercises the `gb-tax-year` hyphenated-span label.

## Scope: main return only

This document models the **SA100 main return (pages TR 1–TR 8) only**. The
supplementary pages are separate forms gated by the page TR 2 questions, which are
modelled (`hadEmployment`, `hadSelfEmployment`, `hadPartnership`, `hadUkProperty`,
`hadForeignIncome`, `hadTrustIncome`, `hadCapitalGains`, `hadResidenceOrRemittance`,
`needAdditionalInformationPages`). Their internal fields belong to their own
documents (future work):

| TR 2 question | Supplementary form |
|---|---|
| Employment | SA102 |
| Self-employment | SA103 (S/F) |
| Partnership | SA104 (S/F) |
| UK property | SA105 |
| Foreign | SA106 |
| Trusts etc | SA107 |
| Capital Gains Tax summary | SA108 |
| Residence, remittance basis etc | SA109 |
| Additional information | SA101 |

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Personal details (DOB, name/address, phone, NINO) and the pre-printed UTR | `dateOfBirth`, `taxpayerName`, `addressLine1`…`postcode`, `phoneNumber`, `nationalInsuranceNumber`, `uniqueTaxpayerReference` |
| TR 2 supplementary-page gating questions (boxes 1–9), incl. "Number" sub-boxes and "Computation(s) provided" | the `had*` booleans, `numberOf*Pages`, `capitalGainsComputationsProvided` |
| TR 3 income boxes 1–21 (UK interest/dividends, foreign interest/dividends up to the stated caps, State Pension and benefits, other income/expenses) | `taxedUkInterest` … `descriptionOfOtherIncome` |
| TR 4 tax reliefs boxes 1, 1.1, 2–10, 13–16 (pension contributions, Gift Aid, Blind Person's Allowance); boxes 11–12 "not in use" omitted | `pensionReliefAtSource` … `giveSpouseSurplusAllowance` |
| TR 5 Student Loan (boxes 1–3), High Income Child Benefit Charge (boxes 1–3), Marriage Allowance (boxes 1–5) | `studentLoanRepaymentDue` … `marriageAllowanceMarriageDate` |
| TR 6 tax refunded/set off (box 1), do-not-code-out choices (boxes 2–3), repayment/nominee details (boxes 4–14) | `incomeTaxRefundedOrSetOff` … `nomineeAuthorisationSigned` |
| TR 7 tax adviser (boxes 15–18) and any other information (box 19) | `taxAdviserName` … `anyOtherInformation` |
| TR 8 provisional figures (box 20), supplementary pages enclosed (box 21), declaration/signature (box 22), signing on behalf (boxes 23–26) | `containsProvisionalFigures` … `signatoryAddress` |

## Modelling decisions

- **Yes/No questions → `boolean`; "Number" sub-boxes → `integer`.** TR 2 "X in the
  box" gates are booleans; the "Number" of employment/self-employment/partnership
  pages are integers (`minimum: 1` when present).
- **Money boxes → `number`, free input.** The GBP boxes carry no encoded maxima;
  HMRC publishes no fixed maximum, consistent with the treatment in
  `us/irs/extension-to-file-4868/2025`.
- **Tax-year figures are not frozen.** Threshold figures the form text cites (e.g.
  the £12,570 Personal Allowance / £1,260 Marriage Allowance transfer, the £3,000
  code-out limit, the £1,000 trading/property allowances, the £2,000/£500 foreign
  interest/dividend caps) are described in field text but **not encoded as data**,
  consistent with `gb/hmrc/marriage-allowance` and `gb/dvla/vehicle-tax`. They are
  what makes this an *edition*; a new tax year ships a new edition.
- **Patterns:** UTR `^[0-9]{10}$`; NINO `^[A-Za-z]{2}[0-9]{6}[A-Da-d]?$`; sort code
  `^[0-9]{2}-?[0-9]{2}-?[0-9]{2}$`; account number `^[0-9]{8}$`. UK postcodes are
  kept as length-bounded strings rather than a strict regex.

## Conditional requiredness (not encoded structurally in v0.2)

The form has extensive conditional logic that v0.2 does not encode structurally
([GSP-0004]); it is stated in field descriptions instead:

- The TR 2 "Number" boxes are required only when the matching Yes box is ticked.
- The repayment section (boxes 4–14) is completed only when a repayment is due.
- The Marriage Allowance section (boxes 1–5) is completed only to make the transfer.
- The High Income Child Benefit Charge section applies only when its stated
  conditions are met.
- Boxes 23–26 (signatory's own name/address) are required only when signing on
  behalf of someone else (boxes 23–24 completed).

Only the declaration (`declarationSigned`, `declarationDate`) and the core
identifiers (`uniqueTaxpayerReference`, `nationalInsuranceNumber`, `dateOfBirth`,
`taxpayerName`, `addressLine1`, `addressTown`) are declared `required: true`.

## What is NOT yet independently verified

- The **online** Self Assessment service presents these items as an adaptive,
  signed-in flow; its screen order and exact on-screen labels were not captured
  screen-by-screen. Field annotations are derived from the **paper SA100 (2025)**
  PDF, which is authoritative for the boxes but not for the online presentation.
- The NINO and sort-code/account-number patterns are structural bounds, not a
  citation of HMRC's own validation rules.

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service and the SA100 notes ("How to fill in your tax return
(2025)"), resolve any discrepancy by shipping a **new schema version within this
edition** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months).
Re-check on or before that date, on any `source.url` change, and — because this is a
time-versioned form — author a **new `edition`** (`2025-26`, …) for each subsequent
tax year rather than mutating this one. Editions coexist (spec `§5.7`).

[GSP-0005]: ../../../../../../spec/proposals/0005-edition-axis-time-versioned-forms.md
[GSP-0004]: ../../../../../../spec/proposals/0004-conditional-flow.md
