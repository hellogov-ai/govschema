# Verification record — `sg/iras/individual-income-tax-return-formb1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived entirely from IRAS's own live guidance pages
describing the myTax Portal e-Filing flow and its underlying reliefs/income
rules. The full field-by-field comparison the practice requires against the
**live, Singpass-authenticated myTax Portal screens** (Procedure step 2) has
not been completed, so this remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `sg/iras/individual-income-tax-return-formb1` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Inland Revenue Authority of Singapore ("IRAS").
- **Primary source (flow):**
  <https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/understanding-my-income-tax-filing/e-filing-your-income-tax-return>
  ("e-Filing your Income Tax Return", last updated 27 February 2026 per the
  page itself). Fetched directly with `curl` (HTTP 200) — `iras.gov.sg` is
  **not** on this registry's blocked-domain list
  ([[gov430-taxes-vertical-and-gsp0019]], [[gov474-dmv-business-formation-vertical-and-xfa-extraction]]),
  unlike `canada.ca`/`nzta.govt.nz`/`ato.gov.au`. Content was extracted from
  the page's `eyd-rte` rich-text-area divs (the Sitefinity CMS's content
  wrapper class) between the page's `<h1>` and its footer marker, stripped of
  tags and HTML-unescaped, rather than trusting a summarized fetch — the
  [[gov-source-fidelity-verification]] discipline.
- **Secondary sources (relief/income detail):**
  - <https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs>
    ("Tax reliefs", last updated 6 March 2026) — the itemised list of 13
    personal reliefs plus the $80,000 relief cap and its worked example.
  - <https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not>
    ("What is taxable, what is not", last updated 26 February 2026) — income
    category list.
  - <https://www.iras.gov.sg/taxes/individual-income-tax/employees/basic-guide-for-new-individual-taxpayers>
    ("Basic guide for new individual taxpayers", last updated 16 April 2026)
    — the four-row "Taxpayer Group" filing-requirement table and Year of
    Assessment mechanics.
  - <https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions>
    ("Tax reliefs, rebates and deductions" hub page) — rental-expense and
    other deduction categories.
- **Confirmed absent, not assumed:** IRAS does not publish a standalone
  fillable "Form B1" for individual employees. Direct fetch of
  `iras.gov.sg/quick-links/forms` (HTTP 200) lists only GST, property,
  corporate-tax, and "other taxes and services" form categories — no
  individual-income-tax category, and no PDF anywhere on the site named
  "Form B1". This corroborates the catalog candidate's own note that IRAS is
  "portal-only for practical purposes" and confirms myTax Portal itself is
  the filing instrument the >98% e-filing rate refers to, the same
  portal-only shape already flagged for `au/ato/individual-tax-return-mytax`.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Step 1: Singpass/SFA requirement | `hasSingpassOrSfa` |
| Basic guide Step 2/3: Year of Assessment, four-row Taxpayer Group table | `yearOfAssessment`, `taxpayerFilingCategory` |
| Singpass/SFA login (identity) | `nricOrFinNumber`, `fullName` |
| Tax residency page + Tax reliefs eligibility note (residents only may claim reliefs) | `isTaxResident` |
| Step 2 (required documents)/Step 4 (pre-fill description): AIS employer participation, Form IR8A | `employerParticipatesInAis`, `grossEmploymentIncome` |
| Step 5, "What if my employment income details are not shown above?" tick-box | `employerWillTransmitIncomeDetailsNotYetShown` |
| Step 5, overseas-posting exemption from declaring employment income | `wasPostedOverseasWholeYear` |
| "What is taxable" — rent from property; "Tax reliefs, rebates and deductions" — rental expense deductions | `hasRentalIncome`, `grossRentalIncome`, `rentalExpensesClaimed` |
| "What is taxable" — trade/business/profession/vocation, gig/freelance; Step 2 required documents (business/partnership tax reference number) | `hasSelfEmploymentOrTradeIncome`, `selfEmploymentNetProfit`, `businessOrPartnershipTaxReferenceNumber` |
| "What is taxable" — income received from overseas | `hasOverseasIncomeReceivedInSingapore`, `overseasIncomeReceivedInSingaporeAmount` |
| Step 5 "+ADD NEW" other-income screen; "What is taxable" catch-all categories (dividends, interest, gains, annuity, alimony, estate/trust, royalty, SRS withdrawals; winnings explicitly NOT taxable) | `hasOtherTaxableIncome`, `otherTaxableIncomeAmount`, `otherTaxableIncomeDescription` |
| Step 6 Filing Tip (the $8,000 dependant-income question) | `dependantsIncomeUnder8000` |
| Tax reliefs page's 13-item list (11 active reliefs for YA2026, two lapsed and excluded — see below) | `isClaimingSpouseRelief` through `cpfReliefMedisaveContributionsAmount` |
| Step 7: Consolidated Statement review, declaration checkbox, Submit | `reviewedConsolidatedStatement`, `declarationConfirmed`, `submissionDate` |

## What is NOT independently confirmed (out of scope), and honesty flags

- **Form B (self-employed) is entirely out of scope.** The catalog candidate
  itself scoped this document to "Form B1 (employees); Form B for the
  self-employed" as a separate process. A side income declaration for
  self-employment/trade (`hasSelfEmploymentOrTradeIncome` and its two
  dependent fields) is modelled because the e-Filing flow lets an
  employee-primary filer declare it as additional income, but the full Form
  B return for a primarily-self-employed filer — different filing deadline,
  different obligations — is not modelled here.
- **The employer-filed IR21 tax-clearance process is out of scope.** The
  "Basic guide" Step 5 describes a non-Singapore-Citizen employee's tax
  clearance when leaving Singapore or changing jobs; this is filed by the
  *employer*, not the individual, and is a distinct process from the annual
  individual return this document models. No fields for it were added.
- **Coarser sourcing grain than a form-derived schema.** Unlike
  `au/ato/individual-tax-return-mytax` (extracted from a printed PDF with
  numbered items and box labels) or `ca/cra/individual-income-tax-and-benefit-return-t1`
  (a fillable PDF), this document is sourced entirely from prose guidance
  pages because IRAS publishes no downloadable individual-return form at all
  — confirmed by direct fetch of the forms index, not assumed. The clearest
  instance: the e-Filing page's Step 5 "Declare other sources of income"
  screen is described only as a generic "+ADD NEW" details page, with no
  individual box names given — `hasOtherTaxableIncome`/
  `otherTaxableIncomeAmount`/`otherTaxableIncomeDescription` is therefore one
  catch-all field group (citing the "What is taxable" page's category list in
  its own description) rather than one field per income type. A future
  revision that can drive the live, authenticated myTax Portal screens should
  replace this with individually-named fields.
- **Repeating per-child relief structure not expressible.** Qualifying Child
  Relief and Working Mother's Child Relief are both genuinely per-child
  (the Tax reliefs page's worked example shows a family claiming QCR on 3
  children and WMCR at 15%/20%/25% rates per child) — a repeating structure
  the flat v0.3 field model (GSP-0009) cannot express, the same limitation
  recorded for AU myTax's multiple-employer/multiple-health-policy rows and
  IE Form 11S/NZ IR3's repeating panels. `qualifyingChildReliefAmount` and
  `workingMothersChildReliefAmount` each model a single representative
  amount; a filer with more than one qualifying child is only partially
  served by v1.0.0.
- **No dollar amount fields for IRAS-computed reliefs.** The three NSman
  reliefs (Self/Wife/Parent) and CPF Relief for Employees are modelled as
  claim-only booleans with no corresponding amount field, because none of the
  sourced pages describe the filer typing a dollar figure for them — IRAS
  computes these directly from third-party-reported NSman service/testing
  records and mandatory employee CPF contributions. This mirrors the AU
  schema's treatment of ATO-computed T1/T2 offset codes (a code is entered,
  not a raw dollar amount) — not a gap, a deliberate reflection of who
  computes the figure.
- **Two catalog-listed reliefs deliberately excluded, not merely
  unclaimed.** Foreign Domestic Worker Levy Relief ("Lapsed with effect from
  YA 2025") and Course Fees Relief ("Lapsed with effect from YA 2026") are
  both gone for Year of Assessment 2026, the edition this document targets —
  they are not modelled as fields at all, rather than modelled and left
  perpetually `false`, since a future YA2027+ document version would need to
  re-confirm they stay lapsed rather than silently reappearing as dead
  fields. This is an editorial exclusion decision, not an oversight; a prior
  YA (e.g. a hypothetical YA2024 edition) would need both reliefs restored.
- **No NRIC/FIN format regex is asserted.** `nricOrFinNumber` uses
  `minLength`/`maxLength` only, no `pattern`, matching the discipline
  `sg/acra/sole-proprietorship-registration`'s `ownerNricOrFin` field already
  used — no source reviewed this cycle independently confirmed the character
  format against myTax Portal's own validation.
- **No attestation `documents[]` entry.** None of the four sourced pages give
  the declaration checkbox's exact statement text (the e-Filing page says
  only "Check the declaration box and select 'Submit'"); the same discipline
  `gb/ukvi/standard-visitor-visa` and `de/bmi/passport-application` used when
  a sign-off statement's exact wording wasn't independently sourced.
  `declarationConfirmed` models the act of checking the box, not a quoted
  statement.

## Why every field here is optional except the compulsory few

Like `au/ato/individual-tax-return-mytax`, myTax Portal's defining shape is
**reviewing a pre-filled return**: IRAS states it "will pre-fill" employment
income (from AIS-participating employers), donations, NSman Relief, rental
income (from last year's declaration or e-stamped tenancy records), and prior
reliefs before the individual ever opens the return. A field being optional
here therefore reflects both (a) genuine applicability — most income/relief
items apply only to some filers, exactly as the source describes — and (b)
the pre-fill shape itself, since myTax Portal may already show a correct
value the filer never manually enters. Only the access gate
(`hasSingpassOrSfa`), the core identity/filing-status facts every filer
genuinely needs (`yearOfAssessment`, `taxpayerFilingCategory`,
`nricOrFinNumber`, `fullName`, `isTaxResident`), and the final Consolidated
Statement review/declaration/submission-date fields are `required: true`.
This is the **second** published GovSchema document exercising the "review a
pre-filled return" shape (after AU myTax); the still-open DE ELSTER candidate
shares it too ([[gov430-taxes-vertical-and-gsp0019]]).

## Time-versioning and the `edition` axis (flagged spec gap, fifth jurisdiction)

Singapore's Year of Assessment is genuinely time-versioned — income earned in
one calendar year (e.g. 1 Jan-31 Dec 2025) is assessed and filed the
following year (YA 2026, by 18 April 2026) — but this shape fits **none** of
spec v0.3's closed `edition.scheme` enum (`us-tax-year` / `gb-tax-year` /
`award-year`, SPEC.md §5.7): it isn't a split fiscal year like the US/UK
schemes, and naming it after either of those countries would misattribute
the jurisdiction. Rather than mislabeling the scheme or unilaterally
extending a closed enum, this document is published at the **plain,
non-edition** registry path
(`registry/sg/iras/individual-income-tax-return-formb1/1.0.0/schema.json`).
This is the **fifth** reference schema to hit this exact gap, after IE Form
11S, NZ IR3, CA T1, and AU myTax — further reinforcing
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` as a
genuinely cross-jurisdictional need. Check
`spec/proposals/README.md`'s status line for GSP-0019 before assuming it is
still undecided.

## Worked mock-data walkthrough (no live portal access)

myTax Portal is Singpass/SFA-authenticated and not reachable pre-login in
this environment, the same constraint as `sg/ica/passport-application` and
`sg/acra/sole-proprietorship-registration`. A representative walkthrough
instead:

1. `hasSingpassOrSfa = true` → proceeds past the access gate.
2. `yearOfAssessment = 2026`, `taxpayerFilingCategory = "required_to_file"`.
3. `nricOrFinNumber = "S1234567D"` (illustrative only — no real NRIC),
   `fullName = "Tan Wei Ling"`, `isTaxResident = true`.
4. `employerParticipatesInAis = true`,
   `employerWillTransmitIncomeDetailsNotYetShown = true`,
   `wasPostedOverseasWholeYear = false` — employment income is left to
   myTax Portal's own pre-fill (`grossEmploymentIncome` not collected).
5. `hasRentalIncome = false`, `hasSelfEmploymentOrTradeIncome = false`,
   `hasOverseasIncomeReceivedInSingapore = false`,
   `hasOtherTaxableIncome = false` — no additional income to declare.
6. `dependantsIncomeUnder8000 = true`, `isClaimingSpouseRelief = false`,
   `isClaimingQualifyingChildRelief = true`,
   `childReliefIsDisabilityVariant = false`,
   `qualifyingChildReliefAmount = 4000`,
   `isClaimingSrsRelief = true`, `srsReliefAmount = 15300`,
   `isClaimingCpfReliefForEmployees = true` (no amount field — IRAS-computed).
7. `reviewedConsolidatedStatement = true`, `declarationConfirmed = true`,
   `submissionDate = "2026-04-10"`.

The conformance packet in
`conformance/sg/iras/individual-income-tax-return-formb1/1.0.0/` implements
this scenario and was checked programmatically against this schema's own
`required`/`requiredWhen` constraints (0 errors).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, Singpass-authenticated myTax Portal
screens, replaces the catch-all `hasOtherTaxableIncome` group with
individually-named fields once the portal's own screen labels can be read,
and records the outcome here — shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the Year of Assessment 2027 filing season
opens, since the source content (relief list, thresholds, filing dates)
changes annually.
