# Verification — `kh/gdt/withholding-tax-return` v1.0.0

## Why this candidate

The GOV-3417 cycle (2026-07-16), while opening Cambodia's Taxes vertical via
`kh/gdt/monthly-vat-return`, re-screened `tax.gov.kh`'s full public
document-form library and explicitly sized/screened three further standalone
tax-return candidates as ready-to-scope backlog but left all three
unauthored: "Return for Withholding Tax- Form WT 03" (327 widgets, 2 pages),
"Return for Tax on Salary- Form TOS 01" (292 widgets, 2 pages), and "Return
for Patent Tax- Form PR 008" (80 widgets, 3 pages). GOV-3426 (2026-07-16)
authored Form PR 008; GOV-3433 (2026-07-17) authored Form TOS 01. This cycle
(GOV-3440, "GovSchema Standard Research") re-scanned CATALOG.md's live
backlog fresh per the standing routine and picked the last remaining
candidate: **Form WT 03**, Cambodia's monthly withholding-tax return.
Cambodia's other four verticals (DMV, Passport, Visa, National ID) were
re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle,
consistent with this registry's practice of not re-litigating a
recently-confirmed dead end without a new source.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form WT 03, "Return for Withholding Tax".**
  - **Listing page (directly retrieved, HTTP 200, plain unauthenticated
    curl with a standard desktop User-Agent):**
    `https://www.tax.gov.kh/en/document-form/page/3`, under the entry
    "Return for Withholding Tax- Form WT 03", category "MONTHLY TAX RETURN
    FORM" — the same category and listing page as the already-published
    `kh/gdt/monthly-vat-return`, `kh/gdt/monthly-tax-declaration`, and
    `kh/gdt/tax-on-salary-return` siblings, and the same listing page as
    GOV-3417's own Withholding Tax (WT 03) sighting.
  - **Extraction technique reused from GOV-3417/GOV-3426/GOV-3433:** the
    listing page renders each document's title inside a
    `<script type="application/ld+json">` block immediately preceding that
    document's own table row and download link; searching *forward* from
    each title's position (not backward) finds that same row's own
    `<a href>`, avoiding the off-by-one bug GOV-3417 first caught.
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/79b80c34-ede2-4794-b36a-329969debb2c`
  - **File identity:** genuine AcroForm PDF (`%PDF-1.6` header), 1,237,640
    bytes, `sha256:e5e79c7270d04f0ae1e24859c887fc53ad469ada95014975366b26d1c8d72bf`.
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a scratch
    directory for extraction only, not added as a repository dependency).
    `page.getAnnotations()` merged by per-page x/y position with
    `page.getTextContent()`'s bilingual Khmer/English text layer, since the
    source form is genuinely bilingual (a clean parallel English caption
    sits beside every Khmer label) and every field's `label` in this schema
    uses that English caption.
  - **Widget count confirmed:** 68 widgets on page 1, 259 on page 2 — 327
    total, matching the GOV-3417 scouting figure exactly.
  - **No checkbox/radio widgets anywhere in this form:** every one of page
    1's 68 extracted widgets has `fieldType: "Tx"` (plain text). Like
    sibling `kh/gdt/tax-on-salary-return`, this form has no fillable
    checkbox at all.
  - **No shared/reused field-name collisions on page 1:** every one of page
    1's 68 widget names is unique, confirmed by grouping the extracted
    widget list by name. Every field below maps to exactly one widget, or
    (for the header period/TIN/declaration-date blocks) to a small group of
    same-purpose widgets collapsed into one logical field, reusing the
    exact per-character-comb-field collapsing precedent and the exact field
    names the `kh/gdt` siblings already established for this shared header
    layout: `001_DD`/`001_MM`/`001_YYYY` → `periodFromDate`;
    `002_DD`/`002_MM`/`002_YYYY` → `periodToDate`; the 9 single-digit
    `TIN_011`-`TIN_091` comb boxes (`maxLen: 1` confirmed on each via
    `page.getAnnotations()`'s own `maxLen` property) → `taxIdentificationNumber`;
    and the 8 single-digit `D12`/`D13`/`M12`/`M13`/`Y12`-`Y15` comb boxes →
    `filedDate`.
  - **Shared header layout with `kh/gdt/monthly-vat-return` and
    `kh/gdt/tax-on-salary-return`:** the period/TIN/enterprise-name/
    business-activities/address/fax-phone/email header block is
    structurally identical to those siblings' own headers (same field
    order, same address subdivision granularity: House No./Street/Group/
    Village/Sangkat/District/Municipality). This schema reuses those
    siblings' exact field names for consistency across the `kh/gdt` family,
    per this registry's "convention over configuration" practice.
  - **Disclosed widget-numbering quirk:** the source PDF's own internal
    widget names for the table rows skip from `Amount6`/`Withholding6`/
    `Remarks6` (Section I's own Total row) directly to `Amount8`/
    `Withholding8`/`Remarks8` (Section II's first payment-category row) —
    there is no `Amount7`/`Withholding7`/`Remarks7` widget anywhere in the
    extracted annotation list for either page, confirmed by grouping all 68
    page-1 widgets by name. This is a gap in the source form's own internal
    numbering, not a modelling omission: every row's field content was
    independently confirmed against the page's own printed English
    captions and rate percentages via the bilingual text layer rather than
    inferred from the widget name alone.

## Scope and disclosed boundaries

This schema models Form WT 03's page 1 in full: the filing period, taxpayer
identification and address, **Section I — Withholding Tax on Resident
Taxpayers (Article 25 "New")** (five payment-category rows — services/
royalty for intangibles/interest in minerals at 15%; interest to non-bank
or savings-institution taxpayers at 15%; interest to fixed-term depositors
at 6%; interest to non-fixed-term savers at 4%; rental/lease of movable and
immovable property at 10% — plus their own Total row, 18 fields),
**Section II — Withholding Tax on Non-Resident Taxpayers (Article 26
"New")** (four payment-category rows, all at a flat 14% — interest;
royalty/rental/leasing and property-use income; management fee and
technical services; dividend — plus their own Total row, 15 fields), and
the filing declaration (place, date).

Each row's own tax-rate percentage (15%/15%/6%/4%/10% for Section I; a flat
14% for every Section II row) is a static printed label in the source PDF
with no backing widget — documented in each affected field's own
`description` rather than modelled as a separate input field. The source
form's own footnote ("Point 3 and 4 are the payment of interest by domestic
banks and saving institutions to their clients that have deposit or saving
accounts") scopes Section I rows 3 and 4 specifically to domestic-bank/
savings-institution payers — documented in those two rows' field
descriptions rather than modelled as a separate conditional field.

Explicitly out of scope, and disclosed rather than silently omitted:

- **Page 2, "Details on the Withholding Tax on Resident Taxpayers" and
  "...on Non-Resident Taxpayers" (259 widgets)** — a per-recipient
  breakdown schedule: one template row per side (No., Name of Recipients,
  Object of Payment, Invoice/Payment Note, Amount Before Tax Withheld, Tax
  Rate, Withholding Tax). The form's own printed instruction, "Use separate
  sheets if the space is insufficient," confirms this is a supporting
  per-recipient annex attached as needed, not a fixed part of the core
  return modelled here. Left unmodelled as disclosed future-companion
  backlog, the same treatment this registry gave `kh/gdt/monthly-vat-
  return`'s own page-2 invoice-level annex, `kh/gdt/patent-tax-return`'s
  page-3 continuation annex, and `kh/gdt/tax-on-salary-return`'s own page-2
  per-employee annex.
- **Cambodia's other four verticals** (DMV, Passport, Visa, National ID) —
  re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle.

### Modelling decisions worth disclosing

- **All Section I/II per-category row fields (Amount/Withholding/Remarks)
  are optional (`required: false`).** An enterprise may not have made any
  payment in a given payment category that period, leaving those rows
  genuinely blank on a valid filing — the same reasoning
  `kh/gdt/tax-on-salary-return` applied to its own per-bracket fields.
- **Both section Total rows (Amount and Withholding) are `required: true`;
  their Remarks fields remain optional.** Mirroring
  `kh/gdt/tax-on-salary-return`'s `totalTaxDue` treatment: a return with
  zero withholding activity in a section still states that section's total
  (as zero), so the Total row's own amount/withholding fields are always
  expected to be filled in even when every category row above is blank.
- **Header fields (address, fax/phone, email) are modelled as `required:
  true`**, matching the equivalent header fields in the sibling
  `kh/gdt/monthly-vat-return` and `kh/gdt/tax-on-salary-return` schemas
  exactly, since all three forms share the same taxpayer-identification
  header layout and none carries a visible conditional gate on that block.

## Conformance fixtures

Fixtures are committed under
`conformance/kh/gdt/withholding-tax-return/1.0.0/`: two valid submissions (a
minimal filing with a single resident-interest row and zero non-resident
activity, both section totals stated as required; a fuller filing spanning
multiple resident and non-resident payment categories) plus mutation-control
fixtures, one per `required`/`validation` rule exercised (invalid TIN
pattern, invalid email pattern, negative amount, and missing-required-field
cases spanning the header and both section totals). All fixtures were
checked with a from-scratch, throwaway Node mock validator implementing this
schema's own `required`/`validation` rules (not committed — consistent with
this registry's established per-cycle practice of writing an independent
validator rather than reusing the authoring script). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- Page 2's per-recipient "Details" schedule remains disclosed, ready-to-
  scope backlog for a future companion schema/version — see "Scope and
  disclosed boundaries" above.
- Cambodia's DMV, Passport, Visa, and National ID verticals remain open
  backlog, previously screened weak/dead in GOV-3410. This closes out the
  last of the three sibling standalone tax-return candidates the GOV-3417
  cycle sized and screened; no further ready-to-scope `tax.gov.kh`
  candidates remain disclosed as of this cycle (the oversized combined
  "Monthly Tax Return in New Form without Branch," 1,802 widgets/16 pages,
  remains flagged too large to responsibly scope in one cycle).

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
