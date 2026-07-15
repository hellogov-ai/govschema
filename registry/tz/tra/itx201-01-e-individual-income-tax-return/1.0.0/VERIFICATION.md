# Verification record — `tz/tra/itx201-01-e-individual-income-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3159)

GOV-3159 is a pre-scouted, ready-to-author candidate delegated from the
GOV-3152 "GovSchema Standard Research" cycle, which independently scouted
and live-verified Tanzania's remaining verticals in parallel with authoring
`tz/nida/application-form-2a` (National ID). This cycle picked up the
delegation and re-verified the candidate from scratch rather than trusting
the prior cycle's own curl/sha256 claims. Tanzania opened this registry as
its 61st jurisdiction via Business Formation
(`tz/brela/company-registration-form-14a`, GOV-3113) and reached 2 of 6
verticals via National ID (`tz/nida/application-form-2a`, GOV-3152); this
document opens Taxes, bringing Tanzania to 3 of 6.

## Sources examined

- **Document `(id, version)`:** `tz/tra/itx201-01-e-individual-income-tax-return` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Tanzania Revenue Authority ("TRA").
- **Primary source:**
  - Form file: <https://www.tra.go.tz/images/uploads/forms/FINAL_RETURN_OF_INCOME_INDIVIDUAL.doc>
    — fetched directly this cycle via plain `curl`: **HTTP 200**,
    content-type `application/msword`, **428,032 bytes**, sha256
    `8139aeb3282c0df0179755e2b04c13fbef575320416bf2031df08137dacffee2`. File
    header confirmed genuine OLE2/Compound File Binary
    (`D0 CF 11 E0 A1 B1 1A E1`) — a real legacy Microsoft Word `.doc`
    binary, not scanned, not a login-gated e-filing system, and not an
    interactive AcroForm.
  - Corroborating source: <https://www.tra.go.tz/page/income-tax-for-individuals>
    (**HTTP 200**), whose own article body names this exact form verbatim
    — `"Forms: ITX201.01.E Return of Income – Individual"` — alongside the
    six-month post-year-end filing deadline this form's own NOTE section
    also states (Section 91, Income Tax Act 2004).
  - No `pdftotext`/`pdfjs-dist`/LibreOffice/`soffice`/`antiword`/`pip` is
    available in this environment, and none applies directly to a legacy
    `.doc` binary in any case (no PDF edition of this form exists on
    `tra.go.tz`). Text was extracted with the npm package `word-extractor`
    (installed standalone for this task, not committed as a repo
    dependency), the same legacy-`.doc`-via-`word-extractor` technique
    already established elsewhere in this registry (e.g.
    `hr/mingo/obrtni-registar`, `bg/nra/obrazets-2001-1`). `doc.getBody()`
    returned the complete document text cleanly.
  - The raw tab-delimited structure (inspected via `cat -A`) revealed a
    structural feature not obvious from the label text alone: items 10
    through 25 (the Business Income build-up and Deductions/Expenses
    section) sit under a **single-column** header reading "Business
    Income / Amount", but immediately before item 26 a **second, distinct**
    table header appears — "Taxable Income" / "Tax Payable/Paid (TZS)" —
    and its two-blank-cell-per-row raw tab pattern continues **uniformly,
    cell-for-cell**, from item 26 through item 47 inclusive. This means
    each of those 22 items is in fact **two** fields (a category's income
    amount and its own computed tax), not one, and is modeled that way
    throughout (`<name>Income` / `<name>Tax` pairs). Item 48 ("DUE DATE"),
    by contrast, carries only a single trailing tab — confirmed as one
    date field, not a third two-column row.
  - This two-column reading is independently corroborated by the form's
    own Appendix 2 tax-rate tables printed on the same document: a
    progressive individual-income scale (employment-type income), a
    turnover-based presumptive-tax scale keyed to whether incomplete or
    complete business records are kept, and a schedular withholding-rate
    table with a **distinct rate per income category** (e.g. DSE-registered
    dividends at 5% vs other dividends at 10%; capital gains at 10%
    resident / 20% non-resident) — exactly the category-by-category
    income/tax computation the two-column layout requires the taxpayer to
    perform by hand.
  - No visual/rendered inspection of this OLE2 `.doc` was possible in this
    environment (no LibreOffice/`soffice`/`unoconv` available to convert
    it to PDF or an image) — a genuine, disclosed extraction-tooling gap
    for this particular source format, distinct from this registry's usual
    PDF-grid cases (normally resolved via `node-canvas` rendering). Two
    consequences of this gap are disclosed explicitly at the field level
    rather than silently resolved: (1) items 46 ("Less tax paid") and 47
    ("Net Tax Payable") carry the identical raw two-blank-cell tab pattern
    as items 26-45, so their own "Taxable Income" companion fields
    (`lessTaxPaidIncome`, `netTaxPayableIncome`) are modeled for structural
    completeness, but each field's own `description` discloses that its
    real-world applicability could not be visually confirmed (a
    settlement-stage tax figure has no obvious independent "taxable
    income" concept of its own); (2) the ambiguous, unnumbered-in-raw-
    extraction Appendix 1 items "STOCK VALUATION METHOD:" and "BASIS OF
    ACCOUNTING" were cross-checked against Appendix 2's own numbered notes
    ("Appendix 2 Row 4: The method used in stock determination...",
    "Appendix 2 Row 5: Indicate the accounting system...", "Appendix 2 Row
    6: Indicate the accounting date...") which confirm their row numbers
    (4, 5, 6) even though the digit glyphs themselves did not survive in
    the same reading-order position during raw text extraction — these
    Appendix 1 items are out of scope for this version regardless (see
    Scope decisions), so this ambiguity does not affect any modeled field.
  - Two source formula artifacts are disclosed rather than silently
    corrected: item 31's own printed formula ("26+27+28+29") excludes item
    30 (Final withholding payments) from the Total Business Income/Tax
    subtotal, and item 45's own printed formula
    ("26+27+28+29+32+33+34+43") likewise excludes both item 30 and item 44
    (Repatriated income of a domestic permanent establishment) from the
    Total Income/Tax figure — both reproduced exactly as printed in each
    field's own `description`, not corrected to a taxpayer's-intuition sum.

## Scope decisions

1. **Modeled in full:** the General Information/Individual's Particulars
   section (items 1-9) and the Computation of Income and Tax section in
   full (items 10-48), plus both declaration blocks (documented as
   `documents[]` attestation entries).
2. **Out of scope, disclosed rather than silently omitted:** the form's
   own Appendix 1 supporting schedules — Schedule of Assets and
   Liabilities, Particulars of Bank Accounts, Particulars of Children and
   Dependants, Stock Valuation Method, Basis of Accounting, Accounting
   Date, and Foreign Tax Credits. Each is a distinct repeating-row or
   single-item schedule that could be modeled as a companion schema in a
   future version, mirroring this registry's established companion-
   schedule pattern (e.g. Lithuania's GPM311/GPM311C, the CH-ZH Hilfsblatt
   series).
3. **Out of scope:** the form's second-page "FOR OFFICIAL USE ONLY" block
   (name of taxpayer restated for filing, TRA data-entry officer name/
   designation/signature/date, an approve/not-approve authorization
   checkbox, and five rejection-reason checkboxes). This is staff-assigned
   intake/adjudication data the taxpayer never supplies, consistent with
   this registry's established exclusion of similar office-only blocks
   (e.g. NIDA Form 2A's Section G).
4. **The cover block's "Date of issue"/"Issuing office"/office contact
   details are out of scope** — this is TRA's own issuing-office
   letterhead information, not applicant-facing data, analogous to NIDA
   Form 2A's excluded batch/enrollment box.
5. **Items 10-48 (the entire Computation of Income and Tax section) are
   modeled `required: false`.** This is a whole-of-form return covering
   business, employment, and investment income alike; the form gives no
   indication that a taxpayer with, say, no business income must still
   enter zeroes across the Business Income build-up (items 10-16). This
   mirrors the Dominican Republic's IR-2 return, whose own settlement-
   section lines are modeled the same way.
6. **`validation.minimum: 0` is applied only to direct-entry amount fields
   whose own label cannot logically be negative** (turnover, purchases,
   and each income-category/tax-payable amount from items 26-44); it is
   withheld from every field whose own printed formula can subtract to a
   negative result (`costOfGoodsSold`, `grossProfit`, `netProfitIncome`,
   `totalBusinessIncome`, `totalIncomeAmount`, `netTaxPayable`, and the two
   disclosed-ambiguous items 46/47 Taxable-Income companion fields) —
   consistent with the same `minimum: 0` departure already established and
   disclosed in the Dominican Republic's IR-2 schema (GOV-3114).
7. **`taxationCategory` (item 9) is modeled as a single-select enum**, not
   a multi-select, from the form's own flat five-checkbox row ("Please
   tick the appropriate boxes"). The two presumptive-tax options
   correspond directly to the record-keeping-dependent rates in this
   form's own Appendix 2 table, and Resident/Non-Resident are
   definitionally mutually exclusive; the source's plural "boxes" wording
   is disclosed as not, by itself, confirmed evidence of a genuine
   multi-select intent — a judgment call, not an inferred conditional
   the source explicitly states.
8. **`preparerTitle`'s fourth enum value (`MS_BI`) preserves the source's
   own abbreviation verbatim** — the preparer's declaration block prints
   "Title: Mr  Mrs  Ms/Bi", one option more than the taxpayer's own "Mr Mrs
   Ms" row (item 2). "Bi" is likely a Swahili honorific ("Bibi"), not
   independently confirmed from this document alone; the abbreviation is
   reproduced as printed rather than expanded or guessed at.
9. **Every numbered item was checked for any asterisk, "if applicable", or
   similar marking distinguishing required from optional fields; none
   exists anywhere on this form.** All requiredness judgment calls above
   were made in the absence of any such source signal and are disclosed in
   full.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/tz/tra/itx201-01-e-individual-income-tax-return/1.0.0/`: 2
valid scenarios plus 5 mutation-control fixtures. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`required`/
`validation` rules, not committed to the repo) before being finalized:

- `valid-resident-employment-only-refund.json` (a resident individual with
  employment income only, filing a simple return that nets to a refund
  position — `netTaxPayable: -94800`, confirming negative values are
  accepted where no `minimum` is imposed) — **0 errors**.
- `valid-presumptive-mixed-income-with-preparer.json` (a resident
  individual taxed under the complete-record-keeping presumptive regime,
  with business, dividend, interest, rental, and capital-gain income,
  filed through a paid preparer; every computed subtotal in this fixture
  arithmetically matches the form's own printed formulas) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `tin`) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets `returnPeriodFrom` to
  `15-01-2025`, not ISO 8601) — **exactly 1 error**.
- `mutation-control-invalid-taxation-category-enum.json` (sets
  `taxationCategory` to `"RETIRED"`, not in the form's own five-checkbox
  enum) — **exactly 1 error**.
- `mutation-control-invalid-title-enum.json` (sets `title` to `"DR"`, not
  in the form's own three-checkbox enum) — **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `emailAddress` to
  `"not-an-email"`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/tz/tra/itx201-01-e-individual-income-tax-return/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/tz/tra/itx201-01-e-individual-income-tax-return/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **478/478** (up from 477/477 before this document); `node
  tools/validate-ajv.mjs` → **478/478**.
- `node tools/verify-sources.mjs` — clean (no FAIL on this document's
  changed files).
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source `.doc` template's own printed structure
is fully transcribed from the genuine, currently-served official form (a
print-and-fill template, not an interactive AcroForm or e-filing system),
but no live submission through any TRA filing channel was attempted.
GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the United Republic of
Tanzania or the Tanzania Revenue Authority.
