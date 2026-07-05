# Verification record — `ae/fta/vat-registration` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

The document was derived from a **directly-read primary source**: the
Federal Tax Authority's own official VAT Registration user manual, retrieved
as a PDF and read page-by-page via PDF-to-image rendering (its embedded text
layer is sparse — mostly step captions, not the on-screen field labels
themselves). It remains `draft`, not `verified`, pending an independent
second reviewer's field-by-field pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1335](../../../../GOV-1335)). Research first picked up `GOV-1295`
(Brazil, `br/receitafederal` individual income tax declaration), a candidate
GOV-1289's prior research cycle had rated STRONG. On inspection the named
source — Receita Federal's 340-page "Perguntão" (Perguntas e Respostas
IRPF 2026, a 745-question topical FAQ) — turned out to be materially weaker
than expected: it groups content by subject (filing obligation, deadlines,
deceased-estate scenarios, etc.) rather than walking through the return's
actual fields, so a clean field list would have to be synthesized from
scattered, non-adjacent citations across dozens of answers. That finding is
recorded on `GOV-1295`'s comment thread, which was left open in backlog
rather than authored against. Effort was redirected to `GOV-1297`
(this document) — UAE's Federal Tax Authority VAT Registration, also
scouted as a secondary new-jurisdiction candidate in GOV-1289's cycle, and
confirmed here to have a genuinely strong, screenshot-driven official user
manual (the same sourcing shape already used successfully for
`za/sars/corporate-income-tax-return-itr14-*` and
`sg/iras/corporate-income-tax-return-form-cs`). This document opens the
**United Arab Emirates as the registry's 14th jurisdiction**.

## Source examined

- **Document `(id, version)`:** `ae/fta/vat-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Tax Authority (FTA), United Arab Emirates
- **Primary source URL:** <https://tax.gov.ae/DownloadOpenTextFile?fileUrl=en/VAT_VAT_Guides/VAT_Registration/Register_taxable_person_VAT_EN.pdf>
- **Official document title:** "VAT Registration – Taxpayer User Manual",
  Version 1.0.0.0, dated October 2022
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

The manual is a plain, directly downloadable PDF (no login, no CAPTCHA) —
the `tax.gov.ae` guides-and-references index page itself does not list it,
but the underlying `DownloadOpenTextFile` URL, found via a targeted web
search, serves it without authentication. The PDF is **58 pages of UI
screenshots**: `pdfjs-dist`'s extractable text layer yields only ~26KB of
step captions and instructional prose (e.g. "Select the Entity Type of your
business from the list"), not the actual on-screen field labels visible in
each screenshot (e.g. "Trade License Issuing Authority", "Shareholding
Percentage"). Every field in this schema was therefore read directly off
the **rendered screenshots**, not the text layer: each PDF page was rasterized
to a PNG (`pdfjs-dist` + `node-canvas`, 2.6x scale) and read with Claude's
own PDF-vision capability — the same technique this registry has used for
other screenshot-driven guides (`za/sars` ITR14 Annexures,
`sg/iras/corporate-income-tax-return-form-cs`).

## What was confirmed directly (verbatim, from the rendered screenshots)

Every page from 14 through 56 was rendered and read; field labels and their
step/section membership are cited in each field's `sourceRef` by page number:

- **p.14-18, Entity Details:** the Entity Type dropdown and its full list of
  12 entity-type options (read verbatim from the "Note" callout on p.16,
  since the dropdown itself only shows the selected value); the
  certificate-of-incorporation and tax-group gate questions.
- **p.19-23, Identification Details:** the Main License Details block (Trade
  License Issuing Authority, Number, Issue/Expiry Date, Legal/Trade Name in
  English and Arabic), the "Trade License is not applicable for…" carve-out
  list (p.20), and the Business Activities modal (Industry, Main Group,
  Sub-Group, Activity, Activity Code, primary-activity flag).
- **p.24-25, Owner Details:** the Owner Type dropdown (confirmed value
  "Legal Person" visible on-screen; only `legal_person`/`natural_person` are
  asserted in this schema's `ownerType` enum, since the full dropdown list
  was not itself opened/visible, unlike Entity Type's — a deliberate
  precision choice, not an oversight), owner legal/trade name,
  owner's own trade-license sub-block, and shareholding percentage.
- **p.26, Branch Details:** the "Do you have branches in UAE?" gate; the
  instruction that each branch repeats the full trade-license/
  business-activity/owner sub-form is read but **not** modelled per-branch
  (see "What is out of scope" below).
- **p.29-32, Eligibility Details:** the taxable-supplies/expenses entry
  method (direct entry or Excel-template upload), the four documentary-proof
  upload slots (turnover declaration letter, purchase orders/contracts,
  sample expense invoices, sample sales invoices) and their conditions
  (stamped/signed by the Authorized Signatory; PO payment terms/delivery
  date within 30 days), the VAT Registration Criteria box's verbatim
  mandatory-registration test ("Your taxable supplies was more than
  AED375,000 in any past period of 12 months or… you expect that your
  taxable supplies will be more than AED375,000 in the next 30 days"), and
  the obligation-date/effective-date/exempt-supplies/exception questions.
- **p.33-35, Contact Details:** the full address block (Country, Building
  Name & Number, Street, Area, City, Emirates dropdown), phone/email/PO Box
  fields, and the two source callouts (address must match the trade license
  or certificate of incorporation or title deed or residence; do not use
  another company's address).
- **p.36-39, Business Relationships:** the mandatory Manager/CEO block
  (Designation, name in English/Arabic, UAE-residency gate, nationality,
  passport details) and the optional "Add Relationships" Partner/Director
  block, including its own UAE-involvement disclosure question.
- **p.40-41, Bank Details:** confirmed **optional** (the step heading itself
  reads "Bank Details (Optional)"), IBAN/bank name/branch/account
  holder/account number, and the bank-isolation-letter upload.
- **p.42-48, Additional Details:** the import/export intent gates, the GCC
  Business Activities modal (state, TRN if available, value of
  import/export per year, with the "exclude services unless directly
  related to moving goods" caveat), and the Customs Registration Details
  modal (Emirate, customs registration number, supporting upload).
- **p.49-52, Authorized Signatory:** the "same as your Manager/CEO?" gate
  and the full standalone signatory sub-form when the answer is "No"
  (name, designation, email, mobile, UAE-residency, nationality, passport
  details, Memorandum of Association/Power of Attorney upload).
- **p.53-56, Review and Declaration:** the review summary (not modelled —
  it echoes prior steps' own data) and the Declaration block itself (name,
  country code/mobile, email, submission date, and the verbatim attestation
  checkbox text).

## What is out of scope for v1.0.0

- **Per-branch, per-owner, and per-relationship repeating detail beyond the
  first entry:** the manual's Owner Details, Branch Details, GCC Business
  Activities, Customs Registration Details, and "Add Relationships" blocks
  are each an add-another-row UI; GovSchema v0.3's field model is flat with
  no array/repeating-group type yet (`spec/v0.3/SPEC.md` §6.1). Each is
  modelled as a single first/primary entry, the same precedent
  `kr/moj/visa-application` established for its repeating tables. A future
  MINOR version could add full repeating-row support once the spec does.
- **Full per-branch sub-form:** Branch Details (p.26) states each branch
  requires its own complete trade-license/business-activity/owner
  sub-structure, structurally identical to the main entity's — not
  duplicated here beyond the `hasBranchesInUae` gate itself, to avoid
  triple-counting an already-modelled field shape under a different prefix.
- **Excel-template bulk upload for taxable supplies/expenses:** the manual
  offers a month-by-month entry table (Month / Amount(AED) / Cumulative(AED))
  or an Excel-template upload as an alternative; this schema models the two
  scalar totals (`taxableSuppliesTrailing12MonthsAed`,
  `expectedTaxableSuppliesNext30DaysAed`) that actually drive the mandatory/
  voluntary-registration determination, not the monthly breakdown itself.
- **Voluntary-registration and exception thresholds:** only the mandatory
  AED 375,000 test is quoted verbatim from the source (p.30's VAT
  Registration Criteria box). The commonly cited AED 187,500 voluntary
  threshold was not confirmed verbatim on any page read this cycle, so it is
  deliberately not asserted in any field description or `sourceRef` — see
  "Path to a `verified` claim" below.
- **Excise Tax and Corporate Tax registration:** both are separate EmaraTax
  applications with their own user manuals, out of scope for this document
  (noted in `description`).
- **Review-summary step (p.53-55):** the Review-and-Declaration step's own
  read-only summary tables (echoing every prior step's entered values) are
  not modelled as fields — they carry no new data, consistent with this
  registry's convention of modelling only applicant-supplied data, not
  read-only recap views.

## Review-gate findings (GOV-1338)

An independent re-render of the source PDF (fresh download, not reusing the
authoring session's screenshots) during the GOV-1338 review gate confirmed
every previously-cited `sourceRef` and the 12-item Entity Type enum, the
AED 375,000 mandatory-threshold quote, and the "30 days" Purchase Order term
verbatim. It also surfaced fields visible in the source screenshots that the
initial authoring pass had missed — all fixed in this PR before merge:

- **Add Relationships (Partner/Director), p.38:** the modal also shows First/
  Last Name in Arabic, Passport Number, Passport Issuing Country, Passport
  Expiry Date, a Start Date, and a passport-upload slot, none of which were
  modelled. Added `additionalRelationshipFirstNameArabic`,
  `additionalRelationshipLastNameArabic`,
  `additionalRelationshipPassportNumber`,
  `additionalRelationshipPassportIssuingCountry`,
  `additionalRelationshipPassportExpiryDate`,
  `additionalRelationshipStartDate`, and the `additionalRelationshipPassportCopy`
  document.
- **Additional Details, p.42:** "Will any of these exports to GCC member
  states?" is a distinct boolean gate alongside the modelled import-side
  question ("Will any of these imports be from GCC member states?") — the
  export-side question had no corresponding field. Added
  `expectsExportsToGccMemberStates` and gated `gccValueOfExportAed`'s
  `requiredWhen` on it (mirroring `gccValueOfImportAed`'s existing gate).
- **Authorized Signatory, p.50:** the standalone signatory sub-form (shown
  when different from the Manager/CEO) also has First/Last Name in Arabic and
  a Start Date, structurally identical to the Manager/CEO block one step
  earlier, which had already modelled its own Arabic-name pair. Added
  `authorizedSignatoryFirstNameArabic`/`authorizedSignatoryLastNameArabic`
  (gated with `visibleWhen`, since — unlike the rest of that sub-form — they
  are optional even when the sub-form itself is active) and
  `authorizedSignatoryStartDate` (gated with `requiredWhen`, alongside the
  other passport/identity fields in that block).
- **Declaration, p.53:** the declarant name block also has First/Last Name in
  Arabic fields (present but empty in the rendered example). Added
  `declarantFirstNameArabic`/`declarantLastNameArabic`.

Field count moved from 100 to 112 (13 documents, up from 12). The mock
conformance packet was updated to populate every new field and exercise the
new `expectsExportsToGccMemberStates=false` branch; re-validated with a
from-scratch `requiredWhen`/`visibleWhen` evaluator script (0 errors) and
`node tools/validate.mjs` / `validate-ajv.mjs` (both pass).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the manual PDF and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual screenshot.
2. Confirm the FTA has not since published a newer manual revision
   superseding v1.0.0.0 (Oct 2022) — EmaraTax's UI has evolved since 2022 and
   a newer manual version may exist even though this was the only version
   found this cycle.
3. Verbatim-confirm the voluntary-registration (AED 187,500) and
   exception thresholds directly from an FTA source page/guide, and add the
   citation if confirmed.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer manual revision has been
published, on or before that date and on any `source.url` change.
