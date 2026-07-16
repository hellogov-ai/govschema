# Verification record — `kh/gdt/monthly-vat-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3417**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

The prior cycle (GOV-3410) opened Cambodia as the registry's 69th
jurisdiction with its Business Formation vertical, and flagged a specific
backlog candidate for Taxes: "Form P101, Monthly Tax Declaration, 294
AcroForm fields, same unauthenticated `tax.gov.kh` channel." This cycle
re-fetched that exact document to author it and found the prior note was
wrong on two counts:

- The linked PDF
  (`https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/6d75d313-fd60-4268-a53a-09b9b5172f0e`,
  HTTP 200, genuine `%PDF-1.6`, 3,548,987 bytes) is titled, per its own
  printed heading, "APPLICATION FORM FOR THE UPDATING INFORMATION FOR E-TAX
  SYSTEM" — a taxpayer-contact-detail update form, not a monthly tax
  declaration.
- It has exactly 23 AcroForm widgets on a single page (confirmed via
  `pdfjs-dist`'s `getAnnotations()`/`getFieldObjects()`), nowhere near the
  294 previously cited.

This is the same category of mistake this catalog has caught before in a
prior cycle's own transcribed figures (e.g. the GOV-2195 AFIP 460/F
correction) — a scouting note taken at face value rather than re-verified.
Rather than author the wrong document, this cycle re-screened `tax.gov.kh`'s
full public document-form library
(`https://www.tax.gov.kh/en/document-form`, paginated across 5 pages) for a
genuine monthly tax-filing candidate.

The library's own "MONTHLY TAX RETURN FORM" category surfaced:

- **"Monthly Tax Return in New Form without Branch"** — 17,216,797 bytes,
  1,802 AcroForm widgets across 16 pages. This is Cambodia's combined
  monthly return (VAT, profit-tax prepayment, withholding tax, salary tax,
  and other tax types together, each with its own repeating line-item
  schedule) — genuinely too large to responsibly scope, extract, and verify
  in one cycle. Not authored; left as a disclosed, unauthored candidate
  rather than force-fit.
- **"Return for Value Added- Form VAT 200"** — a standalone monthly VAT
  return, 1,268,384 bytes, 289 AcroForm widgets across 2 pages (50 on the
  main computation page, 239 on a supporting invoice-level annex). This is
  the form every VAT-registered Cambodian enterprise files monthly,
  independent of the combined-return form above. Won on scope: a genuine,
  self-contained, well-bounded single-tax-type return, the same "narrower
  dedicated form over the too-broad combined one" pattern this registry has
  picked before (e.g. `ec/sri/formulario-102a`).
- Two further standalone candidates were fetched and sized but not chosen
  this cycle: "Return for Withholding Tax- Form WT 03" (327 widgets, 2
  pages) and "Return for Tax on Salary- Form TOS 01" (292 widgets, 2 pages)
  — both plausible future Taxes-vertical companion schemas for Cambodia,
  left as disclosed backlog. "Return for Patent Tax- Form PR 008" (80
  widgets, 3 pages) is a further, smaller candidate also left unauthored.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form VAT 200, "Return for Value Added Tax".**
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/dbb8552d-73b8-4eb2-84e3-8846205ccae0`
  - **Listing page (directly retrieved, HTTP 200):**
    `https://www.tax.gov.kh/en/document-form`, page 3 of the paginated
    listing (`/en/document-form/page/3`), under the entry "Return for Value
    Added- Form VAT 200".
  - **Extraction gotcha, disclosed and fixed:** the listing page renders
    each document's title inside a `<script type="application/ld+json">`
    block immediately preceding that document's own table row and download
    link. A first attempt at locating each candidate's `href` by searching
    *backward* from the title text (nearest preceding `<a href>`) silently
    picked up the **previous** row's link instead of the current row's —
    confirmed when this produced "Application Form for Cancel Tax Payment
    Receipt- Form CTR 001" (a different, unrelated document) when searching
    for "Return for Value Added- Form VAT 200". Corrected by searching
    *forward* from each title's position for that same row's own `<a
    href>`, then re-fetching and re-verifying every candidate URL
    (VAT 200, WT 03, TOS 01, PR 008) under the corrected mapping before use.
  - **File identity:** genuine AcroForm PDF (`%PDF-1.6` header), 1,268,384
    bytes, `sha256:48abd6213483afb06f0caf091814de0a5a7d846d351f1a57879641a8ad0dfb4b`.
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a scratch
    directory for extraction only, not added as a repository dependency).
    `page.getAnnotations({intent:'display'})` (50 `Widget` annotations on
    page 1) merged by position with `page.getTextContent()`'s bilingual
    Khmer/English text layer (per-glyph x/y coordinates), correlating each
    widget to its nearest label and to the form's own printed box numbers
    (01-18) rather than trusting the source PDF's internal AcroForm field
    names, which are non-self-describing and in at least one place
    positionally mismatched (see below).
  - **Reused/mismatched internal field name, disclosed:** the widget
    positioned at Box 15 (the VAT-amount column of the standard-rated-sales
    row) carries the internal field name `Exports_01` — copied from the
    unrelated Box 13 "Exports" row directly above it. Box 13 is a 0%-rated
    line and cannot itself carry a VAT amount, so this is a source-side
    naming artifact, not a genuine second exports-VAT box. This schema's
    `standardRatedSalesVat` field is named and positioned by its true
    location (Box 15, confirmed against the form's own printed box number),
    not the PDF's internal field name; the discrepancy is called out again
    in that field's own `description`.
  - **"For Tax Official" block, disclosed and excluded:** the bottom-right
    of page 1 carries a "Filed in [location] ... DD/MM/YYYY" block with its
    own fillable widgets (`Signature-Stamp01`, `D1`/`D2`/`M1`/`M2`/`Y1`-`Y4`)
    directly under a printed "For Tax Official" heading — confirmed by
    column position (this block sits at x≈314-570, distinct from the
    declarant's own signature/seal line at x≈56-235 in the same vertical
    band). Excluded from `fields[]` as staff-only annotation, the same
    convention used for equivalent staff-only blocks elsewhere in this
    registry (e.g. the sibling `kh/gdt/legal-form-limited-company-registration`
    schema's "Tax Official use only" footer). The declarant's own signature
    line ("Director/Manager/Owner of Enterprise (Signature & Seal)") has no
    fillable widget — a printed line for a physical wet signature and
    company seal.

## Scope and disclosed boundaries

This schema models Form VAT 200's page 1 in full: taxpayer identification
(TIN, enterprise name, business activity, registered address broken into its
7 separately-widgeted components, fax/phone, email), the period covered, an
explicit `isNilReturn` declaration (Box 04), and all 15 of the form's
computation boxes (05-18, less Box 04) covering input tax, output tax, and
the resulting payable/refund/credit-carried-forward outcome.

Explicitly out of scope, and disclosed rather than silently omitted:

- **Page 2's "Summary of Creditable Purchases and Taxable Sales for the
  Month" annex** — three repeating line-item schedules (goods/services
  imported or purchased on which a credit is claimed; goods/services
  exported at the zero rate; goods/services locally supplied at the
  standard rate), 239 further AcroForm widgets confirmed via
  `getAnnotations()`. These are supporting detail behind the page-1 totals,
  not an independent declaration — left unmodelled for a future companion
  schema/version, the same disclosed-companion-schedule treatment this
  registry has used before (e.g. the CH-ZH Hilfsblatt series).
- **The combined "Monthly Tax Return in New Form without Branch"** (1,802
  widgets across 16 pages) — sized and screened this cycle but not
  authored; see "Why this candidate" above.
- **Withholding Tax (Form WT 03), Tax on Salary (Form TOS 01), and Patent
  Tax (Form PR 008)** — sized and screened this cycle as further standalone
  Taxes-vertical candidates on the same unauthenticated `tax.gov.kh`
  channel, but not authored this cycle; left as ready-to-scope backlog.
- **Cambodia's other 4 verticals** (DMV, Passport, Visa, National ID) —
  re-confirmed weak/dead in the prior GOV-3410 cycle; not re-screened this
  cycle.

## Conformance fixtures

Fixtures are committed under
`conformance/kh/gdt/monthly-vat-return/1.0.0/`: valid submissions covering
both a normal filing and a NIL return, plus mutation-control fixtures for
each `requiredWhen` rule and validation constraint (invalid TIN pattern,
invalid email pattern, out-of-range period, and a missing computation box
when `isNilReturn` is `false`). All were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation` rules (not committed — consistent
with this registry's established per-cycle practice of writing an
independent validator rather than reusing the authoring script). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- Cambodia's Taxes vertical opens with this schema (2 of 6 verticals now
  published: Business Formation, Taxes). DMV, Passport, Visa, and National
  ID remain open backlog, all previously screened weak/dead in GOV-3410.
- Page 2's invoice-level annex, and the WT 03/TOS 01/PR 008 sibling return
  forms, are disclosed, ready-to-scope candidates for future companion
  schemas/versions — see "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
