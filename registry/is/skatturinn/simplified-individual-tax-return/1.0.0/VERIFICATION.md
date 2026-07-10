# Verification record — `is/skatturinn/simplified-individual-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2084, "GovSchema Standard Research")

This cycle's task brief asks (phase 1) to catalog what the registry already
covers and (phase 2) to research online for missing government portals/forms,
naming DE Steuer-ID, SG NRIC loss/damage/re-registration, NZ RealMe, and
"remaining voter registration" as example National ID candidates. A fresh read
of `CATALOG.md`'s Known Gaps and Executive Summary sections confirmed all four
named candidates are already resolved or confirmed non-gaps/dead-ends in prior
cycles (`CATALOG.md` lines ~211-212, ~2784-2789, ~2934-2936, ~3777-3778).
Rather than re-attempt an already-closed gap, this cycle deepened Iceland
(opened GOV-2077 with one vertical, Business Formation) into a second
vertical. Three candidates for Iceland's remaining five verticals (DMV,
Passport, Taxes, Visa, National ID) were screened:

- **Samgöngustofa driving licence** (DMV): applications are submitted
  electronically through the sýslumaður/District Commissioner portal
  (`island.is`); no standalone downloadable application-form PDF was found.
- **Þjóðskrá passport** (Passport/National ID): pre-registration is done
  through `island.is`, with photo/biometric capture at a District
  Commissioner's office; no field-by-field paper application form was found.
- **Útlendingastofnun Form D-110** (Visa/residence permits): a genuine,
  unauthenticated AcroForm PDF (251 distinct field widgets across 9 pages,
  covering many residence-permit-type branches). A real form and a plausible
  future candidate, but set aside this cycle as too broad in scope for one
  session without first establishing a narrower single-purpose slice, unlike
  this cycle's chosen candidate.
- **Skatturinn RSK 1.13** (Taxes) — chosen. A compact, single-purpose
  "simplified" tax return the form itself scopes to individuals who have
  lived in Iceland for less than three years (explicitly excluding couples,
  filers with dependent children, and owners of real estate/securities/shares
  or the self-employed, who must file the full RSK 1.10/1.01 return instead).
  Directly downloadable, unauthenticated, with no login/CAPTCHA/WAF gate, and
  listed on Skatturinn's own public forms index alongside Polish, Russian, and
  Spanish translations — confirming it is a currently-maintained, actively
  used form for short-term foreign workers, not a retired template.

## Sources examined

- **Document `(id, version)`:** `is/skatturinn/simplified-individual-tax-return` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Iceland Revenue and Customs (Skatturinn).
- **Primary source:** Skatturinn Form RSK 1.13, edition 22-3-2021 ("Tax
  return | simplified"), the English-language PDF downloaded directly from
  `https://www.skatturinn.is/media/rsk01/rsk_0113.en.pdf`, linked from the
  official public forms index <https://www.skatturinn.is/english/forms/>
  (confirmed via a live `WebFetch` of that index, which lists "RSK 1.13:
  Simplified tax return for individuals" with Polish/Russian/Spanish
  translations, and separately "RSK 1.10: Tax return for individuals" for
  2020-2026 — the full-form sibling this simplified return exempts eligible
  filers from). Retrieved with a direct `curl` fetch (HTTP 200, no block,
  using a browser `User-Agent`).
- **Field extraction method:** unlike `is/skatturinn/business-employer-vat-registration`
  (RSK 5.02, a genuine AcroForm), RSK 1.13 has **no AcroForm field layer at
  all** — `pdfjs-dist`'s `getFieldObjects()` returned `null`/no fields.
  Extracted instead via `pdfjs-dist`'s page-level, position-tagged
  `getTextContent()` across both pages (383 positioned text items), using the
  form's own printed reference numbers (e.g. `21`, `22`, `134`, `162`, `296`,
  `301`) as the field-identity anchor, the same "self-documenting printed
  line/box number" technique used for other numbered-position tax forms in
  this registry (e.g. `pl/mf/zeznanie-pit-37`, `jp/nta/individual-income-tax-final-return`).
- **Visual re-verification:** because this form has no AcroForm field names to
  cross-check coordinates against, coordinate-only text extraction was judged
  insufficient on its own to confirm table-row structure and box-number
  pairings. The PDF was rendered with a real, full-build headless Chromium
  (Playwright, the `chrome-linux64` build under `/paperclip/.cache/ms-playwright`,
  with `LD_LIBRARY_PATH` pointed at `/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu`
  — the lighter `chromium_headless_shell` build has no PDF-viewer plugin and
  cannot render a PDF) and visually re-inspected at high zoom, confirming: (a)
  section 1's "Salary and other employment related payments" table has four
  identical blank employer/amount rows all feeding one total box (`21`); (b)
  section 7's "Status/balance in savings and bank accounts" table has two
  blank account rows (institution name / interest income / status) feeding a
  "Total" row with three separately boxed totals (`301`, `12`, `11`). This
  visual pass also caught a genuine **source-document inconsistency**: the
  box actually printed on page 1 for the savings-account interest-income
  total reads **`12`**, but the back-page "Filling out the form - instructions"
  prose refers to the same box as **`312`**. Re-checked against the raw
  position-tagged text layer (not just the rendered image): the instructions
  sentence extracts verbatim as "...interest income in 312 and status in
  11...", confirming this is a real discrepancy in the source PDF's own text,
  not a rendering or OCR artifact of this extraction. This document follows
  the number actually printed on the fillable box (`12`), since that is what
  a filer or agent completing the form would read and act on; the discrepancy
  is disclosed in `interestIncomeTotal`'s own `description`.
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Header: filer identity, income year | `filerIdNumber`, `filerName`, `filerAddress`, `filerMunicipality`, `incomeYear` |
| 'Duration of stay in Iceland' | `arrivalDateInIceland`, `departureDateFromIceland` |
| §1 'Salary and other employment related payments' | `employer1Name`, `employer1Amount`, `employer2Name`, `employer2Amount`, `employer3Name`, `employer3Amount`, `employer4Name`, `employer4Amount`, `salaryAndEmploymentPaymentsTotal` |
| §2 'Car allowance. Per diem payments, fringe benefits' | `carAllowance`, `perDiemPayments`, `carBenefits`, `otherFringeBenefits` |
| §3 'Other income' | `reimbursedPensionFundPremiums`, `otherIncomeDescription`, `otherIncomeAmount` |
| §4 'Deductions' | `deductiblePensionFundPremiums`, `additionalPrivatePensionFundPayments`, `carAllowanceDeduction`, `travelAllowanceDeduction` |
| §5 'Tax base for income taxes' | `taxBaseForIncomeTaxes` |
| §6 'Taxes withheld at source' | `taxesWithheldAtSource` |
| §7 'Status/balance in savings and bank accounts' | `bankAccount1Name`, `bankAccount1InterestIncome`, `bankAccount1Status`, `bankAccount2Name`, `bankAccount2InterestIncome`, `bankAccount2Status`, `taxesWithheldOnInterestTotal`, `interestIncomeTotal`, `savingsStatusTotal` |
| p.2 'Bank account' | `refundBankName`, `refundBankBranchOrService`, `refundBankAccountType`, `refundBankAccountNumber` |
| p.2 'Notices and comments can be sent to:' | `contactEmail` |
| p.2 'Foreign tax identification number (TIN)' | `foreignTaxIdNumber` |
| p.2 'Your address abroad (or your representative in Iceland)' | `addressAbroad` |
| p.1 footer | `telephoneNumber`, `signatureDate`, `documents[].applicantSignature` |

## What is NOT independently confirmed / out of scope

- **No AcroForm layer, no PDF-level `Required` flags.** This form has no
  fillable fields at all (it is a plain PDF meant to be printed and
  hand-filled, or filled by other means); `required`/`requiredWhen`
  assignments are derived entirely from the form's own printed structure
  (which fields are inherently identifying vs. which describe optional
  circumstances), not any PDF-level signal.
- **The `12`/`312` box-number discrepancy** (see above) is disclosed in
  `interestIncomeTotal`'s own `description` and is not resolved further here;
  a future reviewer with access to Skatturinn's own internal processing
  documentation could confirm which number the tax authority's own systems
  actually key on.
- **Repeating employer and bank-account rows modelled as flat numbered
  fields**, not JSON arrays — `employer1Name`/`employer1Amount` through
  `employer4Name`/`employer4Amount`, and `bankAccount1Name`/`bankAccount1InterestIncome`/
  `bankAccount1Status`, `bankAccount2Name`/`bankAccount2InterestIncome`/
  `bankAccount2Status` — matching the same convention
  `is/skatturinn/business-employer-vat-registration`'s own two-shareholder
  rows already use in this registry, rather than introducing a new
  array-of-objects construct for a single sibling document.
- **`taxBaseForIncomeTaxes` (§5) has no printed reference-number box.** The
  form only labels it "Sum of 1+2+3-4", referring to the totals of sections
  1, 2, 3, and 4 (not to individual line numbers). Modelled as a plain
  optional numeric field without a `sourceRef` line number, consistent with
  how this registry already handles printed-but-unnumbered totals.
- **Unlabelled per-section subtotal boxes** for sections 2, 3, and 4 (each
  section's own running total, printed with an arrow into a blank box but no
  reference number) are deliberately **not modelled as separate fields** —
  only the individually numbered line items within each section are, since
  those unlabelled boxes are simple sums of already-modelled sibling fields
  with no independent identity of their own on the form.
- **Address decomposition.** All postal addresses/institution names are
  modelled as single free-text strings, matching the form's own single
  free-text boxes, not a decomposed structure.
- **Icelandic kennitala format.** `filerIdNumber` validates against the
  general kennitala pattern (`^[0-9]{6}-?[0-9]{4}$`) rather than a
  jurisdiction-specific checksum, which the form itself does not publish —
  the same choice already made for `is/skatturinn/business-employer-vat-registration`.
- **Live e-service parity.** Not screened this cycle — this document is
  sourced entirely from the paper/PDF form; Skatturinn's site was not checked
  for a live e-filing wizard equivalent of this specific simplified return.
- **Companion full return RSK 1.10/1.01.** The form's own header directs
  couples, filers with dependent children, and owners of real estate/
  securities/shares, and the self-employed to the full return instead; that
  full, substantially larger return is not modelled here and is a plausible
  fast-follow candidate for a future cycle.

## Scope and jurisdiction notes

- Deepens **Iceland's Taxes vertical**; Iceland now has 2 of its 6 verticals
  modelled (Business Formation via GOV-2077, Taxes via this document).
  Iceland's other four verticals (DMV, Passport, Visa, National ID) are open,
  screened-but-not-yet-authored (DMV, Passport) or unscreened (Visa's D-110
  screened but set aside as too broad, National ID unscreened) backlog
  candidates for a future cycle.
- Scoped strictly to the form's own eligibility window (individuals resident
  in Iceland for less than three years, unmarried/no dependent children, no
  real estate/securities/shares, not self-employed); no attempt is made to
  model the full RSK 1.10/1.01 return this simplified form exempts eligible
  filers from.
- No `requiredWhen` conditional logic is used in this document — the form's
  own printed structure does not gate any field on another field's value
  (unlike `is/skatturinn/business-employer-vat-registration`'s operator-type
  branches); only the five top-level identity/date fields are unconditionally
  required.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms the exact requiredness
Skatturinn enforces when RSK 1.13 is filed (in particular whether the savings/
bank-account section is mandatory when the filer has no Icelandic account),
resolves the disclosed `12`/`312` box-number discrepancy against Skatturinn's
own internal documentation or a second independently-sourced edition of the
form, and checks whether a live e-service equivalent exposes any field this
paper-form sourcing does not — recording the outcome here, shipping a new
schema version if discrepancies are found (VERSIONING.md §3, immutability).

## Test run

A mock `conformance/is/skatturinn/simplified-individual-tax-return/1.0.0/application-packet.json`
scenario (Sarah Whitman, a US citizen software contractor in Reykjavík who
arrived in Iceland during the 2025 income year, worked for a single
employer, remained resident through year-end, and holds one Icelandic
savings account) was checked with a from-scratch script
(`/tmp/gov2084/check_conformance.mjs`, not committed — a disposable checker,
not registry tooling) that: (1) confirms every one of the schema's 47 fields
appears exactly once across `collectedValues`/`notApplicableFields`; (2)
confirms all `required: true` fields are collected; (3) evaluates every
`requiredWhen` condition (none exist in this document) against the collected
values; (4) checks every collected value's `pattern`/`minLength`/`maxLength`/
`minimum`/`maximum`/`enum` constraint. Result: **0 errors** across all 47
fields (25 collected, 22 correctly marked not-applicable). Four mutation
tests confirmed the checker actually catches defects rather than passing
vacuously: (1) removing the required `filerIdNumber` from `collectedValues`
correctly raised 2 errors (a coverage gap plus a missing-required-field
error — both fire because a strict evaluator checks coverage and
requiredness independently); (2) removing the required `incomeYear`
likewise correctly raised 2 errors; (3) setting `incomeYear` to `1850`
(below the field's `minimum: 2000`) correctly raised exactly 1 validation
error; (4) setting `filerIdNumber` to a non-kennitala string
(`"not-a-kennitala"`) correctly raised exactly 1 pattern-validation error.
The schema was also validated against the GovSchema v0.3 meta-schema with
`tools/validate.mjs` and `tools/validate-ajv.mjs` (both pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
