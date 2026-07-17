# Verification — `kh/gdt/tax-on-salary-return` v1.0.0

## Why this candidate

The GOV-3417 cycle (2026-07-16), while opening Cambodia's Taxes vertical via
`kh/gdt/monthly-vat-return`, re-screened `tax.gov.kh`'s full public
document-form library and explicitly sized/screened three further standalone
tax-return candidates as ready-to-scope backlog but left all three
unauthored: "Return for Withholding Tax- Form WT 03" (327 widgets, 2 pages),
"Return for Tax on Salary- Form TOS 01" (292 widgets, 2 pages), and "Return
for Patent Tax- Form PR 008" (80 widgets, 3 pages). GOV-3426 (2026-07-16)
authored the smallest of the three, Form PR 008. This cycle (GOV-3433,
"GovSchema Standard Research") re-scanned CATALOG.md's live backlog fresh
per the standing routine and picked the next of the two remaining
candidates: **Form TOS 01**, the middle-sized of the two (292 widgets,
versus WT 03's 327), Cambodia's monthly payroll withholding tax return.
Cambodia's other four verticals (DMV, Passport, Visa, National ID) were
re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle,
consistent with this registry's practice of not re-litigating a
recently-confirmed dead end without a new source.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form TOS 01, "Return for Tax on Salary" (update 17/01/2018).**
  - **Listing page (directly retrieved, HTTP 200, plain unauthenticated
    curl with a standard desktop User-Agent):**
    `https://www.tax.gov.kh/en/document-form/page/3`, under the entry
    "Return for Tax on Salary- Form TOS 01- update 17/01/2018", category
    "MONTHLY TAX RETURN FORM" — the same category as the already-published
    `kh/gdt/monthly-vat-return` and `kh/gdt/monthly-tax-declaration`
    siblings, and the same listing page as GOV-3417's own Withholding Tax
    (WT 03) sighting.
  - **Extraction technique reused from GOV-3417/GOV-3426:** the listing
    page renders each document's title inside a
    `<script type="application/ld+json">` block immediately preceding that
    document's own table row and download link; searching *forward* from
    each title's position (not backward) finds that same row's own
    `<a href>`, avoiding the off-by-one bug GOV-3417 first caught.
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/a2d7cf62-6179-4de3-b75e-5aff8f4a1da3`
  - **File identity:** genuine AcroForm PDF (`%PDF-1.6` header), 1,701,093
    bytes, `sha256:f77fc22c9c9c2eb7eda9e62dfed6658fad96cd75d3c4dff08a03cea480496a46`.
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a
    scratch directory for extraction only, not added as a repository
    dependency). `page.getAnnotations()` merged by per-page x/y position
    with `page.getTextContent()`'s bilingual Khmer/English text layer,
    since the source form is genuinely bilingual (a clean parallel English
    caption sits beside every Khmer label) and every field's `label` in
    this schema uses that English caption.
  - **Widget count confirmed:** 78 widgets on page 1, 214 on page 2 — 292
    total, matching the GOV-3417 scouting figure exactly.
  - **No checkbox/radio widgets anywhere in this form, disclosed as a
    contrast with its `kh/gdt` siblings:** every one of the 292 extracted
    widgets has `fieldType: "Tx"` (plain text). Unlike `kh/gdt/patent-tax-
    return` (Check Box5-9) or `kh/gdt/monthly-tax-declaration` (Check
    Box33), this form has no fillable checkbox at all — including for its
    own printed "Method of Payment" line (Cash / Bank Transfer / Deduction
    at source), which carries no backing widget and is therefore not
    modelled as a field (a paper-only tick option, not an AcroForm input).
  - **No shared/reused field-name collisions on page 1:** every one of
    page 1's 78 widget names is unique, confirmed by grouping the extracted
    widget list by name. Every field below maps to exactly one widget, or
    (for the header period/TIN/declaration-date blocks) to a small group of
    same-purpose widgets collapsed into one logical field — the same
    per-character-comb-field collapsing precedent this registry applied in
    `mn/atunt/vehicle-plate-number-reservation`: `001_DD1`/`001_MM1`/
    `001_YYYY1` → `periodFromDate`; `002_DD1`/`002_MM1`/`002_YYYY1` →
    `periodToDate`; the 9 single-digit `TIN_01`-`TIN_09` comb boxes →
    `taxIdentificationNumber` (`maxLen: 1` confirmed on each via
    `page.getAnnotations()`'s own `maxLen` property); and the 8 single-digit
    `D_12`/`D_13`/`M_12`/`M_13`/`Y_12`-`Y_15` comb boxes → `filedDate`.
  - **Shared header layout with `kh/gdt/monthly-vat-return`:** the period/
    TIN/enterprise-name/business-activities/address/fax-phone/email header
    block is structurally identical to VAT 200's own header (same field
    order, same address subdivision granularity: House No./Street/Group/
    Village/Sangkat/District/Municipality). This schema reuses that
    sibling's exact field names (`periodFromDate`, `addressSangkat`, etc.)
    for consistency across the `kh/gdt` family, per this registry's
    "convention over configuration" practice.

## Scope and disclosed boundaries

This schema models Form TOS 01's page 1 in full: the filing period,
taxpayer identification and address, **Table I — Tax on Salary on Resident
Employees** (five progressive bracket rows at 0%/5%/10%/15%/20%, each with
its own employee count, salary paid, spouse count, minor-children count,
tax calculation base, and tax on salary, plus their own Total row — 36
fields), **Table II — Tax on Salary on Non-Resident Employees** (a single
row at the fixed 20% rate), **Table III — Tax on Salary on Fringe Benefit**
(a single row, also at the fixed 20% rate), the resulting **Total Tax Due**,
and the filing declaration (place, date).

Each bracket row's own tax-rate percentage (0%/5%/10%/15%/20%, or the fixed
20% on Tables II/III) is a static printed label in the source PDF with no
backing widget — documented in each affected field's own `description`
rather than modelled as a separate input field. Table I's tax-calculation-
base formula, per the form's own printed header (`E = B – [(C + D) x
150,000]`), is likewise documented in each `residentTaxCalculationBase*`
field's description rather than computed by this schema (GovSchema fields
describe source-form inputs, not derived-value computation).

Explicitly out of scope, and disclosed rather than silently omitted:

- **Page 2, "Details on the Tax on Salary on Resident Employees" and
  "...on Non-Resident Employees and Tax on Salary on Fringe Benefit" (214
  widgets)** — a per-employee breakdown schedule: one template row per side
  (Name, Nationality, Function, Salary/Fringe-Benefit Amount, Spouse, Minor
  Children, Allowance, Tax Calculation Base, Tax Rate, Tax on Salary,
  Remarks), each column itself split into a further 8-12 single-character
  comb boxes. The form's own printed instruction, "Please use separate
  sheets if the space is insufficient," confirms this is a supporting
  per-employee annex attached as needed, not a fixed part of the core
  return modelled here. Left unmodelled as disclosed future-companion
  backlog, the same treatment this registry gave `kh/gdt/monthly-vat-
  return`'s own page-2 invoice-level annex and `kh/gdt/patent-tax-return`'s
  page-3 continuation annex.
- **Withholding Tax (Form WT 03)** — the one remaining sibling candidate
  GOV-3417 sized and screened but did not author (327 widgets); left as
  ready-to-scope backlog for a future cycle.
- **Cambodia's other four verticals** (DMV, Passport, Visa, National ID) —
  re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle.

### Modelling decisions worth disclosing

- **All Table I/II/III numeric fields are optional (`required: false`).**
  Unlike the header identity fields (always required) and `totalTaxDue`
  (always required, since a return with zero tax due still states that
  total), an enterprise's actual employee population may fall entirely
  within one bracket, or have no non-resident/fringe-benefit employees at
  all — leaving the other rows genuinely blank on a valid filing, the same
  reasoning `kh/gdt/monthly-vat-return` applied to its own per-rate-box
  fields.
- **Header fields (address, fax/phone, email) are modelled as `required:
  true`**, matching the equivalent header fields in the sibling
  `kh/gdt/monthly-vat-return` schema exactly, since both forms share the
  same taxpayer-identification header layout and neither carries any
  visible conditional gate on that block.

## Conformance fixtures

Fixtures are committed under
`conformance/kh/gdt/tax-on-salary-return/1.0.0/`: two valid submissions (a
minimal filing with only resident employees in the 5% bracket and zero
non-resident/fringe-benefit activity; a fuller filing with resident
employees spanning three brackets, non-resident employees, and a fringe
benefit) plus mutation-control fixtures, one per `required`/`validation`
rule exercised (invalid TIN pattern, invalid email pattern, negative
`totalTaxDue`, and missing-required-field cases spanning the header and
`totalTaxDue`). All fixtures were checked with a from-scratch, throwaway
Node mock validator implementing this schema's own `required`/`validation`
rules (not committed — consistent with this registry's established
per-cycle practice of writing an independent validator rather than reusing
the authoring script). Both `tools/validate.mjs` and `tools/validate-
ajv.mjs` pass across the full registry with this schema added.

## Known gaps

- Page 2's per-employee "Details" schedule and the WT 03 sibling return
  form remain disclosed, ready-to-scope backlog for future companion
  schemas/versions — see "Scope and disclosed boundaries" above.
- Cambodia's DMV, Passport, Visa, and National ID verticals remain open
  backlog, previously screened weak/dead in GOV-3410.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
