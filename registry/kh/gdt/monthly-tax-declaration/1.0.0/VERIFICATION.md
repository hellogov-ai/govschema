# Verification record — `kh/gdt/monthly-tax-declaration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a directly-assigned authoring task (**GOV-3419**), a child of the
`GovSchema Standard Research` cycle **GOV-3417**, following on from **GOV-3410**
which authored the sibling `kh/gdt/legal-form-limited-company-registration`
and left Form P101 (Monthly Tax Declaration) flagged as ready-to-author
backlog for Cambodia's Taxes vertical.

## Source URL correction (important)

GOV-3419's own issue description carried forward a source URL from the
GOV-3410 scouting pass —
`https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/6d75d313-fd60-4268-a53a-09b9b5172f0e`,
with a stated sha256 of
`1d7ece8692c77ca85f85fdbfe18030e3872896650f79cb283623ad587fea48b3`. Before
authoring, this URL was re-verified against the live
`https://www.tax.gov.kh/en/document-form` listing and found to resolve to a
**different, unrelated document**: "Application Form For The Updating
Information For e-Tax System" (a one-page e-Tax profile-update form; fetched,
sha256 matches the issue's own stated hash exactly, confirming the mismatch
was in the issue's carried-over URL, not a re-fetch discrepancy).

The correct Form P101 download link was re-derived from the listing page's
own entry #6 — `Form Tax Payment- Form P101- Update 19/06/2025` — matched via
its adjacent `<script type="application/ld+json">` block (same
schema.org-JSON-LD disambiguation technique used for the sibling schema),
at:

- **Corrected URL:** `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/febbe0a4-f555-4377-8de2-b81aeb60a9f2`
- **HTTP 200, plain unauthenticated curl.**
- **File identity:** genuine AcroForm PDF (`%PDF-1.5` header), 1,521,844
  bytes, `sha256:e06c1decd83ca97baf0c1bfca87c1d448372c9baa9834f180d6cfbbdbb7eb4fc`.

This schema is authored against the corrected URL/file, which is the
authority's own live "Form Tax Payment - Form P101" — the Khmer title
`ទ្រមង់បង់ប្រាក់ពន្ធ P101` translates literally to "Tax Payment Form P101" and
the form's own subtitle `ប្រកាសប្រចាំខែ` means "Monthly Declaration",
consistent with GOV-3419's "Monthly Tax Declaration" framing.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form P101, "Monthly Tax Payment Declaration" (Form Version V4).**
  - **Listing page (directly retrieved, HTTP 200):**
    `https://www.tax.gov.kh/en/document-form`, entry #6, "Form Tax Payment-
    Form P101- Update 19/06/2025".
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a scratch
    directory for extraction only, not added as a repository dependency).
    `page.getAnnotations()` found 294 `Widget` annotations on the form's
    single page — matching GOV-3419's own "~294 AcroForm fields" estimate —
    plus one non-data `Reset Your form` push-button, excluded from
    `fields[]` as a UI control rather than applicant input.
  - **Widget-to-label correlation:** both `getAnnotations()` (widget rects)
    and `getTextContent()` (full text layer with per-glyph x/y coordinates)
    were extracted and merged, the same position-matching technique used for
    the sibling KH schema. The form's 40-row tax-type table was decoded by
    keying each row's own selection-checkbox y-range to its six adjacent
    text-entry widgets (Tax Amount / Account No / Additional Tax / Interest /
    Additional Account / Total Amount, ordered left-to-right by x
    coordinate). This was verified programmatically: every one of the 252
    unique text-field names and 41 unique button-field names (40 row
    checkboxes plus one two-state radio, `Check Box33`) was assigned to
    exactly one row or header field, with no leftover and no double
    assignment.
  - **Khmer-only row labels, disclosed:** unlike the sibling Form 101-P2,
    this table's 40 tax-type row labels are Khmer-only in the source — no
    parallel English column exists here (confirmed by searching the full
    extracted text layer for expected English tax-name substrings, e.g.
    "Patent", "VAT", "Withholding" — all absent). This schema's English
    field labels/descriptions for the 40 tax types are therefore this
    registry's own translation, informed by standard Cambodian tax-law
    English terminology used in the Law on Taxation and GDT publications
    (Patent Tax, Withholding Tax, VAT, Minimum Tax, Accommodation Tax,
    Public Lighting Tax, Slaughter Tax, etc.) — disclosed as an authored
    translation, not a verbatim source caption. Two labels carry lower
    translation confidence, disclosed rather than silently asserted:
    "ពន្ធបន្ថែមចំពោះការរាំងស្ទះ" (modelled as `additionalTaxOnObstruction` —
    Khmer "ការរាំងស្ទះ" ordinarily means "obstruction/blockage", plausibly a
    public-road/traffic-obstruction tax, but the source gives no further
    gloss) and "ចំណូលពីការលក់ឯកសារបោះពុម្ព" (modelled as
    `incomeFromSaleOfPrintedDocuments`, a literal reading).
  - **Tax Identification Number structure:** the source PDF's own AcroForm
    field metadata (`maxLen`/`comb` flags, not rendered visually) shows the
    TIN split into a 4-character comb field (`Text6`, `maxLen: 4`) and an
    11-character comb field (`Text7`, `maxLen: 11`). This schema models
    `taxIdentificationNumber` as one field with pattern
    `^[A-Za-z0-9]{4}[0-9]{11}$`, reflecting that source-confirmed two-part
    structure.

## Scope and disclosed boundaries

This schema models Form P101 in full:

- **Header** — reporting month/year, an optional document/reference number,
  the filing date, which GDT office the filer reports to (Department of
  Large Taxpayer vs. a named Tax Branch), company name (Khmer and Latin),
  and TIN.
- **The 40-row tax-type table** — each row modelled as 7 fields: a
  `{slug}Selected` boolean plus `TaxAmount`/`AccountNo`/`AdditionalTax`/
  `Interest`/`AdditionalAccountNo`/`TotalAmount`, the latter six
  `requiredWhen` the row's own `Selected` field is `true`. Spec v0.3 has no
  native repeating-group/array support — GSP-0009 ("Composite & repeating
  values — structured object + array") remains in `Proposed` status, not yet
  accepted — so, consistent with this registry's established practice for
  un-adopted repeating-group support (e.g. the sibling schema's share-class
  A–E fields), the table is flattened into 280 explicitly named fields
  rather than modelled as an array.
- **The closing grand-total row** — `grandTotalAmountKhr`, the only widget
  on the source's own "Total" footer row.

Explicitly out of scope, and disclosed rather than silently omitted:

- **The source's own "Signature and name" footer cell** has no AcroForm
  widget backing it at all — the physical signature on this form is
  pen-only. Not modelled as a field, since fabricating a widget with no
  source backing would misrepresent the form.
- **The "Reset Your form" push-button** — a UI control with no data
  semantics, excluded from `fields[]`.
- **No visible optionality markers** (no asterisks, no "(if any)"
  parentheticals) appear anywhere in the source's extracted text. Header
  identity fields (company name, TIN, declaration date, reporting
  month/year, reporting office) are modelled required, following this
  registry's convention of treating unmarked fields as required, except
  `documentNumber` (an unlabelled reference-number box of unclear purpose,
  modelled optional) and `taxBranchName` (`requiredWhen` `reportingOfficeType`
  is `tax_branch`, since the source's own layout only calls for it under
  that office).

## Conformance fixtures

11 fixtures are committed under
`conformance/kh/gdt/monthly-tax-declaration/1.0.0/`: 2 valid submissions (0
errors each — a nil declaration selecting no tax-type row, and a
Tax-Branch-filed declaration selecting 3 tax types with full row detail) and
9 mutation-control fixtures (each expected to raise exactly 1 error): a
missing required `companyName`, an invalid `taxIdentificationNumber` pattern,
a missing `taxBranchName` when `reportingOfficeType` is `tax_branch` (a
`requiredWhen` rule), a missing `patentTaxTaxAmount` when
`patentTaxSelected` is `true` (a row-level `requiredWhen` rule), an
out-of-range `reportingMonth` (13), an invalid `reportingOfficeType` enum
value, a negative `grandTotalAmountKhr` (violating its `minimum: 0`), a
missing required `declarationDate`, and an `accountNo` field exceeding its
`maxLength: 30`. All 11 were checked with a from-scratch, throwaway Node
mock validator implementing this schema's own `required`/`requiredWhen`/
`validation` rules (not committed — consistent with this registry's
established per-cycle practice of writing an independent validator rather
than reusing the authoring script). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 519/519 across the full registry with this
schema added. `tools/verify-sources.mjs`, scoped to this schema's directory,
checked 4 URLs with 0 warnings and 0 failures.

## Known gaps

- Cambodia was already at 2 of 6 verticals (Business Formation, Taxes)
  before this schema merged, via the sibling
  `kh/gdt/legal-form-limited-company-registration` (Business Formation,
  GOV-3410) and `kh/gdt/monthly-vat-return` (Taxes, GOV-3417, merged
  concurrently with this cycle — see below). This schema adds a second
  Taxes-vertical filing for Cambodia rather than opening a new vertical.
  DMV, Passport, Visa, and National ID remain open backlog — see the
  GOV-3410 sibling schema's own VERIFICATION.md for the per-vertical
  screening record.
- A second, independently-authored Cambodian Taxes schema (`kh/gdt/monthly-
  vat-return`, Form VAT 200, GOV-3417) was found mid-cycle to be under
  concurrent authorship by another agent process in this same shared
  checkout, and merged to `main` first — not part of this schema's scope,
  and not modified or interfered with here. Notably, GOV-3417's own
  VERIFICATION.md concluded the "Form P101, 294 fields" backlog candidate
  this schema now authors was a mislabeled dead end; that conclusion was
  based on the same wrong URL this schema's own issue description carried
  forward (see "Source URL correction" above) — the genuine Form P101
  existed all along, at a different URL on the same document-form listing.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
