# Verification record — `kh/gdt/legal-form-limited-company-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3410**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

By this cycle, Mongolia's own remaining backlog gap (National ID) had already
been re-confirmed a dead end across two prior cycles (GOV-3382, GOV-3389 —
both `e-mongolia.mn`'s login-gated wizard and `burtgel.gov.mn`'s in-person-only
process), and three previously-scouted backlog candidates from an earlier
cycle (Switzerland Business Formation, Kenya Visa, Rwanda National ID) had all
since been authored. With no genuinely open backlog item remaining, this
cycle scouted 3 new-jurisdiction candidates in parallel — Azerbaijan, Egypt,
and Cambodia — across all 6 verticals each.

- **Azerbaijan**: Visa (`evisa.gov.az`) is Cloudflare-challenge-gated; DMV
  (`dmx.gov.az`) and Business Formation (`e-taxes.gov.az`) both hard-403;
  Passport's e-service subdomain renders an empty app shell; National ID is
  in-person only. Only Taxes (`taxes.gov.az`'s individual income tax
  declaration, 173 numbered line-item fields across a main form and 4
  annexes) came back as a strong, unauthenticated candidate.
- **Egypt**: every vertical is login-gated, reCAPTCHA-gated at account
  creation (not just final submit), or unreachable from this environment —
  no strong candidate found this cycle.
- **Cambodia**: the General Department of Taxation (GDT) publishes a public,
  unauthenticated document library at `tax.gov.kh/en/document-form`,
  including genuine AcroForm PDFs with no login/CAPTCHA/WAF gate. **Two
  strong candidates surfaced**: Form 101-P2 (Legal Form for Limited Company —
  Business Formation) and Form P101 (Monthly Tax Declaration — Taxes, 294
  fields, left as ready-to-author backlog for a future cycle since it is a
  business's periodic withholding/VAT filing rather than an individual
  return, and this cycle's time budget was spent on Form 101-P2). Cambodia's
  Visa (`evisa.gov.kh`, CAPTCHA-gated before the field-level DOM is
  reachable), Business Formation's own primary channel (Ministry of
  Commerce's registration portal, currently down — "Site Under Maintenance"),
  DMV (`vehicle.mpwt.gov.kh`, login-gated), Passport (`online.gdi.gov.kh`,
  login-gated), and National ID (in-person only) were all screened and
  found weaker or dead this cycle.

Cambodia won on source strength: a directly downloadable, genuinely
unauthenticated AcroForm PDF with 179 real form-field widgets, versus
Azerbaijan's single Taxes candidate and Egypt's lack of any strong candidate.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form 101-P2, "Legal Form for Limited Company
  (Private/Public Limited Company)".**
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/c5a36033-1c8c-4193-aa9b-7cefc353d718`
  - **Listing page (directly retrieved, HTTP 200):**
    `https://www.tax.gov.kh/en/document-form`, under the entry "Legal Form
    for Limited Company ( Private/Public Limited Company)- Form 101-P2"
    (published 2023-02-01 per the page's own embedded schema.org JSON-LD).
    Located by parsing the page's own `<script type="application/ld+json">`
    blocks (one per downloadable document) and matching the `"name"` field
    against sibling forms in the same series (101-P3 Foreign Company
    Branch, 101-P4 Partnership) to disambiguate the correct `gdtstream`
    UUID, since the download links themselves carry only a "KH"/"EN"
    language-toggle label with no descriptive text.
  - **File identity:** genuine AcroForm PDF (`%PDF-1.5` header), 1,116,490
    bytes, `sha256:9edd0d77f394d625eb6c38bbcbebd6a572405926339f89f4d81eed00619f5c5`.
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a scratch
    directory for extraction only, not added as a repository dependency).
    Both `page.getAnnotations()` (179 `Widget` annotations across 4 pages)
    and `page.getTextContent()` (full bilingual Khmer/English text layer
    with per-glyph x/y coordinates) were extracted, then merged into one
    top-to-bottom, left-to-right reading-order listing per page so every
    widget could be matched to its nearest preceding label by position —
    the source's own internal AcroForm field names (`Text8`, `Check Box4`,
    etc.) carry no semantic meaning on their own, the same non-self-describing-
    widget situation this registry has handled before for other AcroForms.
  - **Known extraction limitation, disclosed:** `pdfjs-dist`'s text
    extraction rendered the form's Khmer text with visibly fragmented
    combining marks and subscript consonants (stray replacement glyphs
    interleaved with base characters — a known limitation extracting
    complex Brahmic-script shaping from PDF glyph runs). Rather than risk a
    transcription error reconstructing broken Khmer strings by hand, every
    field's `label` in this schema uses the form's own parallel, cleanly-
    extracted English caption instead. The form is genuinely bilingual with
    an English column printed directly beside each Khmer one throughout —
    this is not a translation added by this schema.
  - **Reused internal field names, disclosed:** the source PDF reuses the
    same internal AcroForm field name across genuinely distinct logical
    checkboxes on the same page — e.g. `Check Box4` backs both the
    Type-of-Shares single/multiple toggle (§2) and, lower on the same page,
    the Sex male/female toggle (§3). This schema's own field names
    (`shareTypeCount`, `representativeSex`) are assigned by position and
    surrounding label text, not copied from the PDF's own (in this case
    ambiguous) internal field names.

## Scope and disclosed boundaries

This schema models Form 101-P2's four data-collection sections in full:

- **§1 Legal Form Information** — the private/public limited company
  toggle.
- **§2 Business Enterprise Information** — company identity (Khmer/Latin
  name), business activity, contact details, registered address with
  geographic coordinates, owned/rented status, share type/count/capital
  structure, and majority-shareholder nationality/percentage.
- **§3 Shareholder/Representative Information** — the one physical person
  completing this application. The source form gates this entire block with
  its own "Is the physical person's information the same as the information
  provided in section II-Form 101?" checkbox: if yes, the form instructs
  skipping straight to §3.1; if no, the identity/contact/address fields
  must be completed. This schema models that gate as
  `isRepresentativeInfoSameAsForm101`, with every `representative*` detail
  field `requiredWhen` it is `false` — a faithful transcription of the
  source's own conditional instruction, not an invented convenience.
- **§3.1** — the representative's declared position in the company
  (`representativePositionInCompany`), which the source's own layout always
  requires regardless of the §3 gate above.
- **§4 Taxpayer Classification Information** — signage board, an optional
  additional legal-form classification (public establishment/state-owned/
  joint-venture/QIP) with its own pre-existing registration number/date and
  supervising ministry, the first-supplies-of-goods-or-services date
  (required, since this schema always models a *new* registration), the
  three-tier taxpayer-size classification by estimated annual turnover,
  employee counts (total, female, foreign, female foreign), weekly day-off,
  working hours, and a hazardous-materials/machinery yes/no gate.
- The **9-item attachment checklist** (§6), modelled as `documents[]`.
- The closing **DECLARATION** block (two required affirmative declarations
  plus a signature date).

Explicitly out of scope, and disclosed rather than silently omitted:

- **§5's public-service-fee/patent-tax computation table** (5 fee line
  items plus a grand total) — the form's own instruction directs the
  applicant to "refer to the Annex on Public Service Fees and Patent Tax"
  to populate this table, and that annex was not fetched this cycle. Rather
  than fabricate plausible-looking fee amounts/units without that source,
  this table is left unmodelled — a genuine gap, not an oversight.
- **§5's four companion sub-forms** (101-A Bank Account Information, 101-B
  Physical Person Information, 101-C Branch Information, 101-D
  Mission/Business Activity Information) and the SMEs Tax Incentive
  Certificate (TIC) form — each is referenced by name only in a "please
  fill out the information following each form below" instruction, with no
  attached checkbox or field-level widget in this PDF confirming whether
  any is in use for a given filing. Not modelled as either `fields[]` or
  `documents[]`, since fabricating a selection checkbox with no widget
  backing it would misrepresent the source. Left as a disclosed candidate
  for future companion schemas, following this registry's own precedent
  (e.g. `mn/gasr/state-registration-limited-liability-company` leaving
  Form UB-12's own detail unexpanded).
- **§3.1's own apparent re-declaration** of company name, registration
  number, TIN, phone, address, majority-shareholder nationality, and
  share-type/count fields — appearing a second time on page 2 under
  distinct widget names (`Text36`-`Text39`, `Address 2`, `Check Box7`,
  `Check Box07`, `A1`-`E1`) but with labels identical to §2's own fields.
  Nothing in the extracted text or widget structure distinguishes these as
  representing a second, independent fact (e.g. a corporate shareholder's
  own separate registration, as opposed to the company being registered);
  modelled once, under §2, rather than duplicated — a disclosed judgment
  call, not a silent omission.
- **Cambodia's Ministry of Commerce business-name/incorporation
  registration itself** — Form 101-P2 is this registry's chosen entry point
  because it is the only channel found this cycle that is both
  unauthenticated and field-level documented; the Ministry of Commerce's
  own `businessregistration.moc.gov.kh` portal returned "Site Under
  Maintenance" (HTTP 403) this cycle and is not modelled. Form 101-P2's own
  attachment checklist item 1 (Confirmation of Registration Letter issued
  by Ministry of Commerce) reflects that this GDT filing is a companion to,
  not a replacement for, that separate incorporation step.
- **Cambodia's other 5 verticals** (DMV, Passport, Visa, Taxes, National
  ID) — all screened this cycle and found weaker or dead (see "Why this
  candidate" above); left as open backlog, with Form P101 (Monthly Tax
  Declaration, 294 AcroForm fields, same unauthenticated `tax.gov.kh`
  channel) flagged as the strongest ready-to-author lead for Taxes.

## Conformance fixtures

11 fixtures are committed under
`conformance/kh/gdt/legal-form-limited-company-registration/1.0.0/`: 2 valid
submissions (0 errors each — one single-share-class company at an owned
address with the representative's identity already on file via Form 101,
skipping the `representative*` detail fields; one multi-share-class company
at a rented address with a full representative detail block populated) and
9 mutation-control fixtures (each expected to raise exactly 1 error): a
missing required `companyNameKhmer`, an invalid `legalForm` enum value, an
invalid `companyEmail` pattern, a missing `totalMonthlyRentFeeKhr` when
`companyAddressOwnership` is `rented` (the `requiredWhen` rule), a missing
`shareCountClassB` when `shareTypeCount` is `multiple_types` (another
`requiredWhen` rule), a missing `representativeLastName` when
`isRepresentativeInfoSameAsForm101` is `false` (a third `requiredWhen`
rule), an out-of-range `majorityShareholderTotalSharePercent` (>100), a
`declarationNoConviction` set to `false` (violating its `enum:[true]`
constraint), and an out-of-range `taxYearFromMonthDay` (violating its
DD-MM pattern). All 11 were checked with a from-scratch, throwaway Node
mock validator implementing this schema's own `required`/`requiredWhen`/
`validation` rules (not committed — consistent with this registry's
established per-cycle practice of writing an independent validator rather
than reusing the authoring script). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 518/518 across the full registry with this
schema added.

## Known gaps

- Cambodia opens as this registry's 69th jurisdiction with 1 of 6 verticals
  (Business Formation). DMV, Passport, Visa, Taxes, and National ID remain
  open backlog — see "Why this candidate" above for the per-vertical
  screening record, including Form P101 (Monthly Tax Declaration) as a
  ready-to-author Taxes candidate for a future cycle.
- §5's fee-schedule table and four companion sub-forms are disclosed,
  out-of-scope candidates for a future companion schema/version — see
  "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
