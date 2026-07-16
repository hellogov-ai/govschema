# Verification — `kh/gdt/patent-tax-return` v1.0.0

## Why this candidate

The GOV-3417 cycle (2026-07-16), while opening Cambodia's Taxes vertical via
`kh/gdt/monthly-vat-return`, re-screened `tax.gov.kh`'s full public
document-form library and explicitly sized/screened three further standalone
tax-return candidates as ready-to-scope backlog but left all three
unauthored: "Return for Withholding Tax- Form WT 03" (327 widgets, 2 pages),
"Return for Tax on Salary- Form TOS 01" (292 widgets, 2 pages), and "Return
for Patent Tax- Form PR 008" (80 widgets, 3 pages). This cycle
(GOV-3426, "GovSchema Standard Research") picked **Form PR 008**: the
smallest and most tractable of the three, and — unlike its two siblings,
which are monthly filings — Cambodia's *annual* patent (business-licence)
tax return, filed by every registered enterprise for the right to carry on
business each calendar year. Cambodia's other four verticals (DMV,
Passport, Visa, National ID) were re-confirmed weak/dead in the GOV-3410
cycle; not re-screened this cycle, consistent with this registry's practice
of not re-litigating a recently-confirmed dead end without a new source.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form PR 008, "Return for Patent Tax" (update 16/01/2019).**
  - **Listing page (directly retrieved, HTTP 200, plain unauthenticated
    curl with a standard desktop User-Agent):**
    `https://www.tax.gov.kh/en/document-form/page/3`, under the entry
    "Return for Patent Tax - Form PR 008- update 16/01/2019", category
    "ANNUAL TAX RETURN FORM" — a different category from the "MONTHLY TAX
    RETURN FORM" category the VAT 200/P101 siblings are listed under,
    consistent with patent tax being an annual rather than monthly
    obligation.
  - **Extraction technique reused from GOV-3417:** the listing page renders
    each document's title inside a `<script type="application/ld+json">`
    block immediately preceding that document's own table row and download
    link; searching *forward* from each title's position (not backward)
    finds that same row's own `<a href>`, avoiding the off-by-one bug
    GOV-3417 first caught. Applied here and cross-checked against the byte
    size/widget count GOV-3417 had already recorded for this exact
    candidate.
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/edebc078-4dbe-4415-97bf-c5dc9c2bbed5`
  - **File identity:** genuine AcroForm PDF (`%PDF-1.5` header), 1,712,399
    bytes, `sha256:432decc7ef1ca56d4434c05da44b3a2fa417784837c3041ecad3fc16bbf673fc`.
  - **Extraction method:** `pdfjs-dist@3` (installed standalone in a
    scratch directory for extraction only, not added as a repository
    dependency). `page.getAnnotations({intent:'display'})` merged by
    per-page x/y position with `page.getTextContent()`'s bilingual
    Khmer/English text layer. The source PDF's internal field names
    (`Text1`, `Text2`, `Check Box5`, ...) are sequential and entirely
    non-descriptive — every field was named and scoped by its printed
    position and label, not trusted from its internal name.
  - **Widget count confirmed:** 43 widgets on page 1, 5 on page 2, 32 on
    page 3 — 80 total, matching the GOV-3417 scouting figure exactly.
  - **Shared-fieldname radio-style pairs, disclosed:** five widget pairs
    reuse the same internal field name across two positioned instances, the
    same convention GDT uses elsewhere in this registry's `kh/gdt` schemas
    (e.g. `Check Box33` in `kh/gdt/monthly-tax-declaration`): `Check Box5`
    (Department of Large Taxpayers vs Tax Branch — `reportingOfficeType`),
    `Check Box6` (head-office address same as registration: Yes vs No —
    `isHeadOfficeAddressSameAsRegistered`), `Check Box7` (business premises
    owned vs rented — `propertyOwnershipType`), `Check Box8` (has property
    ID number, owned branch: No vs Yes — `hasPropertyIdNumberOwned`), and
    `Check Box9` (has property ID number, rented branch: No vs Yes —
    `hasPropertyIdNumberRented`). Each pair is modelled as a single logical
    field by position, not as two independent booleans.
  - **Page 3, "FORM PR 008_1 / ADDITIONAL BUSINESS ACTIVITIES" (32
    widgets):** confirmed present — a repeated TIN/enterprise-name header,
    11 further business-activity/tax-amount row pairs, a subtotal, and its
    own date/signature/name/position block. This is the form's own
    explicitly-referenced continuation annex, named in page 1's own
    instruction text ("in case of more than 4 activities, please fill
    additional form PR 008_01"). Left unmodelled as a disclosed future
    companion schema — the same treatment this registry gave
    `kh/gdt/monthly-vat-return`'s own page-2 invoice-level annex.
  - **Page 2's "TAX OFFICIAL USE ONLY" block, disclosed and excluded:**
    payment-confirmation checkbox, bank account number, bank name, receipt
    number, and a supervisor sign-off block are staff-only annotation, not
    applicant input — excluded from `fields[]`, consistent with equivalent
    staff-only blocks excluded elsewhere in this registry (e.g. the sibling
    `kh/gdt/monthly-vat-return` schema's "For Tax Official" filing-date
    stamp). The declarant's own Name/Position lines on page 2 have no
    fillable widget (printed lines for a physical signature only); only the
    declaration date (`Text33`/`Text34`/`Text35`, DD/MM/YYYY) is modelled
    from that block.

## Scope and disclosed boundaries

This schema models Form PR 008's page 1 in full (application year, taxpayer
identification, tax-office designation, an optional differs-from-
registration head-office address and contact block, business-premises
ownership/rental declaration with a conditional Property Identification
Number sub-flow for each branch, up to four business-activity/tax-amount
line items, and the subtotal/additional-tax/interest/total computation)
plus page 2's two-item attachment checklist and declarant date.

Explicitly out of scope, and disclosed rather than silently omitted:

- **Form PR 008_1 ("ADDITIONAL BUSINESS ACTIVITIES"), page 3 of the same
  PDF** — the form's own continuation annex for enterprises declaring more
  than four business activities. Left for a future companion schema/version,
  consistent with this registry's established practice for disclosed
  companion schedules (e.g. the CH-ZH Hilfsblatt series,
  `kh/gdt/monthly-vat-return`'s own page-2 annex).
- **Page 2's "TAX OFFICIAL USE ONLY" block** — staff-only payment
  confirmation, bank account/name, and receipt number; not applicant input.
- **Withholding Tax (Form WT 03) and Tax on Salary (Form TOS 01)** — the two
  remaining sibling candidates GOV-3417 sized and screened but did not
  author (327 and 292 widgets respectively); left as ready-to-scope backlog
  for a future cycle.
- **Cambodia's other four verticals** (DMV, Passport, Visa, National ID) —
  re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle.

### Modelling decisions worth disclosing

- **`email`/address/contact fields are gated on
  `isHeadOfficeAddressSameAsRegistered = false`, but `poBox`, `mobilePhone`,
  `officeTelephone`, and `fax` are left always-optional.** The form's own
  text only requires the address/contact block at all when the head-office
  address has changed since original registration; within that block, this
  schema requires the address fields and email (as the primary means of
  identifying/contacting the new location) but leaves the remaining contact
  channels (P.O. Box, mobile, office phone, fax) optional in every case,
  mirroring how forms elsewhere in this registry treat secondary contact
  channels as non-mandatory alternatives rather than all-or-nothing.
- **The two attachment-checklist booleans
  (`attachedLandTitleOrRentalContract`, `attachedPropertyTaxReceipt`) are
  modelled as always-optional**, not `requiredWhen
  isHeadOfficeAddressSameAsRegistered = false`, even though the form's own
  instruction text only calls for these attachments in that scenario. This
  avoids gating a `requiredWhen` on a boolean whose absence (rather than an
  explicit `false`) is the common case when the block does not apply — the
  same category of bug this registry has previously caught and documented
  for `notEquals` against an optional field (see this registry's own
  internal engineering notes on that gotcha) — and a checklist confirmation
  is reasonably left as informational rather than a hard gate in this
  schema version.

## Conformance fixtures

Fixtures are committed under
`conformance/kh/gdt/patent-tax-return/1.0.0/`: two valid submissions (a
minimal owned-premises filing with a single business activity and the
address-unchanged branch; a fuller rented-premises filing with a changed
head-office address, two business activities, and the attachment checklist)
plus ten mutation-control fixtures, one per `required`/`requiredWhen`
constraint and validation rule exercised (invalid TIN pattern, invalid
email pattern, tax year below the schema's minimum, negative total, and
five missing-required-field cases spanning both the unconditional and
`requiredWhen`-gated fields). All twelve were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation` rules (not committed — consistent
with this registry's established per-cycle practice of writing an
independent validator rather than reusing the authoring script): 12/12
fixtures behaved as expected. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass across the full registry with this schema
added (521/521).

## Known gaps

- Form PR 008_1 (the >4-activities continuation annex) and the WT 03/TOS 01
  sibling return forms remain disclosed, ready-to-scope backlog for future
  companion schemas/versions — see "Scope and disclosed boundaries" above.
- Cambodia's DMV, Passport, Visa, and National ID verticals remain open
  backlog, previously screened weak/dead in GOV-3410.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
