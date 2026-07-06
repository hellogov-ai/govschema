# Verification record — `ae/fta/corporate-tax-registration` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read primary source**: the
Federal Tax Authority's own official Corporate Tax Registration user manual,
retrieved as a PDF and read page-by-page via PDF-to-image rendering (its
embedded text layer is sparse — mostly step captions, not the on-screen field
labels themselves). It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle (`GOV-1371`). The
prior cycle that authored `ae/fta/vat-registration` (`GOV-1335`/`GOV-1297`)
explicitly flagged, in its own `description` and in `CATALOG.md`'s "Known
Gaps" section, that "the FTA's EmaraTax platform also publishes a separate
Corporate Tax Self-Registration user manual (a distinct application from VAT
Registration) — a candidate for a future sibling document." This cycle first
scouted whether a genuinely new UAE vertical (Passport, DMV, Business
Formation, or National ID — all still unmodelled for the UAE) had a
sourceable, unauthenticated live wizard or manual:

- **UAE Business Formation** (DED trade license / Invest in Dubai / Basher):
  general web search surfaced only third-party summaries; the live
  application flows (Invest in Dubai's e-Trader license, Basher) are
  reachable only via Emirates ID/UAE Pass login, consistent with GOV-1289's
  original WEAK/login-gated rating for this vertical.
- **UAE National ID** (ICP Emirates ID issuance/renewal): the ICP portal
  requires an Emirates ID number or UAE Pass login to start any application;
  no field-by-field manual was found. Also login-gated.
- **Brazil's Carteira de Identidade Nacional (CIN)** was also scouted as a
  National-ID candidate for Brazil (unresearched since `GOV-1364`): a live
  Playwright render of the São Paulo state portal
  (`servicos.sp.gov.br/fcarta/...`) confirmed its "Iniciar" wizard redirects
  to `sso.acesso.gov.br` (gov.br federal SSO, CPF-based login) before any
  form field is shown — login-gated, not pursued further this cycle. Its
  governing federal decree (Decreto 10.977/2022, read directly from
  planalto.gov.br) does give a clean, gazetted field list (Art. 11/13/14),
  but was set aside in favour of the stronger, already-precedented EmaraTax
  sourcing shape below; it remains an open candidate for a future cycle.

Given both new-vertical candidates for the UAE were login-gated and the CT
Registration manual was already confirmed to exist as a plain, directly
downloadable PDF (found via web search, no login/CAPTCHA), this cycle
authored the explicitly-flagged CT Registration sibling document instead.
This is the UAE's second Taxes-vertical document (alongside
`ae/fta/vat-registration`), not a new vertical, but closes a real, precisely
named gap.

## Source examined

- **Document `(id, version)`:** `ae/fta/corporate-tax-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Tax Authority (FTA), United Arab Emirates
- **Primary source URL:** <https://tax.gov.ae/Datafolder/Files/eservices/New%20CT/CT%20Registration%20Taxpayer%20User%20Manual%20EN%20V4.pdf>
- **Official document title:** "Corporate Tax Registration – Taxpayer User
  Manual", Version 4.0.0.0, dated 17 May 2023
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

Note on version currency: the FTA's own document-control table (p.2) records
four revisions (1.0 25-Jan-23 through 4.0 17-May-23, the last "Updates based
on PwC/FTA Final Review"). Several other manual filenames were found in web
search results without a visible version/date (e.g. a "V4" filename at a
different path); the copy examined here is the one whose in-document control
table could be read directly and is internally dated 17-May-23. A future
reviewer should confirm no newer manual has since superseded this one — see
"Path to a `verified` claim" below.

## Access constraint and how it was worked around

The manual is a plain, directly downloadable PDF (no login, no CAPTCHA) at
the URL above, found via a targeted web search (the `tax.gov.ae` guides index
page does not itself surface every manual). The PDF is **41 pages, mostly UI
screenshots**: `pdfjs-dist`'s extractable text layer yields only ~17KB of
step captions and instructional prose (e.g. "Select the Entity Type of your
business from the list"), not the actual on-screen field labels visible in
each screenshot (e.g. "Trade License Issuing Authority", "Shareholding
Percentage"). Every field in this schema was therefore read directly off the
**rendered screenshots**, not the text layer: each PDF page was rasterized to
a PNG (`pdfjs-dist` + `node-canvas`, 2.6x scale) and read with Claude's own
PDF-vision capability — the same technique used for `ae/fta/vat-registration`
and this registry's other screenshot-driven guides (`za/sars` ITR14
Annexures, `sg/iras/corporate-income-tax-return-form-cs`).

## What was confirmed directly (verbatim, from the rendered screenshots)

Pages 1-41 were rendered and read in full; field labels and their
step/section membership are cited in each field's `sourceRef` by page number:

- **p.13, Introduction / Required Documents:** the service overview (5
  sections, ~30 minutes, free of charge) and the required-documents note,
  which splits by registrant type — "In case registrant is a Natural
  Person: Emirates ID/Passport of the Taxable person" vs. "In case
  registrant is a Legal Person: Emirates ID/Passport of authorized
  signatory, Proof of authorization for the authorized signatory". This is
  the direct evidence for this version's Legal-Person-only scope decision
  (see below).
- **p.16-17, Entity Details:** the Entity Type dropdown; the full 12-item
  Legal Person entity sub-type list, read verbatim from the "Note" callout
  on p.17 (UAE Public Joint Stock Company, UAE Private Company incl. an
  Establishment, UAE Partnership, Foreign Company, Foreign Partnership,
  Club or Association or Society, Trust, Charity, Foundation, Federal
  Government Entity, Emirate Government Entity, Other); Country of
  Registration/Incorporation, Date of Incorporation, and Corporate Tax
  Period.
- **p.21-22, Main License Details:** Trade License Issuing Authority,
  Number, Issue/Expiry Date, Legal/Trade Name in English and Arabic, and the
  "Trade License is not applicable for the below entity sub types" carve-out
  list (p.22): Natural Person - Partnership or Heir; Legal Person - Foreign
  Business; Legal Person - Federal UAE Govt. Entity; Legal Person - Emirate
  UAE Govt. Entity.
- **p.23-24, Business Activities:** the Add Business Activity modal
  (Industry, Main Group, Sub-Group, Activity, auto-populated Activity Code).
- **p.25-26, Owner Details:** the Owner Type dropdown (confirmed
  verbatim, p.26 text: "Owner Type can be a 'Legal Person' or a 'Natural
  Person'"), First/Last Name in English and Arabic, Ownership Start Date,
  Shareholding Percentage, and Corporate Tax TRN (Optional).
- **p.27-28, Branch Details:** the "Do you have branches in UAE?" gate; the
  instruction that each branch repeats the full trade-license/business
  -activity/owner sub-form is read but **not** modelled per-branch (see
  "What is out of scope" below).
- **p.30-31, Contact Details:** the address block (Country, Building Name &
  Number, Street, Area, City, Emirate dropdown) and phone fields (Mobile
  and Landline, each with its own country code); the two source callouts
  (address must match the trade license; do not use another company's
  address). No email or P.O. Box field is present in this section, unlike
  the sibling VAT Registration schema's Contact Details step — confirmed by
  directly inspecting the rendered screenshot, not assumed.
- **p.33-36, Authorized Signatory:** the Authorized Signatory List summary
  table (columns: Name in English, Name in Arabic, ID Number, Email ID); the
  "Is the authorized signatory a resident of the UAE?" gate; the Emirates ID
  Number/Expiry Date/upload block (conditional on UAE residency); the
  Passport Number/Issuing Country/Expiry Date/upload block (shown
  unconditionally in the rendered "Yes, resident" example, alongside the
  Emirates ID fields); the Source of Authorization dropdown (rendered
  example value "Memorandum of Association") and its upload slot; and the
  info callout confirming "Evidence of Authorization may include a Power of
  Attorney in the case of a Legal Person."
- **p.37-38, Review and Declaration:** the per-step review summary (not
  modelled — echoes prior steps' own data, consistent with this registry's
  convention); the Declaration block's own First/Last Name in English and
  Arabic, Country Code, Mobile Number, and Email fields (rendered with
  example values, confirming they are real, distinct inputs from the
  Authorized Signatory block); and the verbatim attestation checkbox text.

## Interpretive judgment calls (flagged for an independent reviewer)

1. **Authorized Signatory's own Name/Email fields (p.33-34):** the rendered
   manual's screenshot of the "Add Authorized Signatory" modal begins
   mid-scroll, at "Is the authorized signatory a resident of the UAE?" — the
   modal's own top portion (where Name/Email would be entered) was not
   captured by any rendered page in this 41-page manual. This schema's
   `authorizedSignatoryFirstNameEnglish`/`LastNameEnglish`/`NameArabic`/
   `Email` fields are therefore inferred from the **Authorized Signatory
   List** summary table's own column headers (p.33: "Name in English | Name
   in Arabic | ID Number | Email ID"), which are directly confirmed, rather
   than from the entry modal itself. A future reviewer should confirm the
   modal's top portion directly (e.g. via a live EmaraTax render or a newer
   manual revision) to verify these are exactly two name fields (First/Last)
   rather than one combined field, and to check for any additional fields
   (e.g. mobile number, designation) not visible in this manual's captured
   screenshots.
2. **"Legal Person - Foreign Business" (p.22) mapped to two enum values:**
   the trade-license carve-out list names a single sub-type, "Foreign
   Business", which does not exactly match either of p.17's two distinct
   Legal Person sub-types "Foreign Company" and "Foreign Partnership". This
   schema's `tradeLicenseIssuingAuthority`/etc. `requiredWhen` condition
   excludes **both** `legal_person_foreign_company` and
   `legal_person_foreign_partnership`, on the reasoning that neither a
   foreign company nor a foreign partnership would hold a UAE trade
   license. A future reviewer should confirm this reading against the live
   EmaraTax wizard directly.
3. **Natural Person `entityType` enum values (`natural_person_individual`,
   `natural_person_other`):** only `natural_person_partnership_or_heirs` is
   independently confirmed for this specific document (via the p.22
   trade-license carve-out list's own text, "Natural Person - Partnership or
   Heir"). The other two values are asserted by direct analogy to the
   sibling `ae/fta/vat-registration` schema's confirmed Natural Person
   taxonomy (`natural_person_individual`, `natural_person_partnership_or_heirs`,
   `natural_person_others`) on the same EmaraTax platform, since this
   manual's own screenshots never open the Entity Type dropdown to show its
   Natural Person branch. A future reviewer should confirm this against a
   live render.
4. **`corporateTaxPeriod` and `authorizedSignatorySourceOfAuthorization`
   modelled as free text, not enums:** both are dropdown fields in the live
   wizard, but the manual's screenshots only ever show one selected example
   value each ("January - December"; "Memorandum of Association") and never
   open the dropdown to show its full option list. Modelling either as a
   fabricated enum would violate this registry's "Spec precision over
   cleverness" lens more than modelling them as free text with the known
   example documented in `description`.

## What is out of scope for v1.0.0

- **Natural Person registration's own field set:** `entityType` is
  selectable as any of the three Natural Person values, but this version
  does not model the Natural-Person-specific flow beyond that selection.
  The manual's own required-documents note (p.13) implies this pathway is
  materially simpler than the Legal Person one modelled here (Emirates
  ID/Passport of the Taxable Person directly, with no separate Authorized
  Signatory/Owner/Business-License block), but no screenshots of that
  distinct flow were found in this 41-page manual — only the fully
  documented Legal Person walkthrough (p.15-38) is modelled beyond the
  Entity Type field itself. This is a disclosed scope decision, not an
  oversight, matching this registry's precedent of deferring unsourced
  sub-flows (e.g. `in/incometax/individual-tax-return-itr3`'s deferred
  schedules).
- **Per-branch and per-owner repeating detail beyond the first entry:** the
  manual's Owner Details and Branch Details blocks are each an
  add-another-row UI; GovSchema v0.3's field model is flat with no
  array/repeating-group type yet (`spec/v0.3/SPEC.md` §6.1). Each is
  modelled as a single first/primary entry, the same precedent
  `ae/fta/vat-registration` and `kr/moj/visa-application` established for
  their own repeating tables.
- **Full per-branch sub-form:** Branch Details (p.27) states each branch
  requires its own complete trade-license/business-activity/owner
  sub-structure, structurally identical to the main entity's — not
  duplicated here beyond the `hasBranchesInUae` gate itself.
- **VAT Registration and Excise Tax registration:** both are separate
  EmaraTax applications with their own user manuals (VAT Registration is
  modelled separately as `ae/fta/vat-registration`), out of scope for this
  document (noted in `description`).
- **Review-summary step (p.37):** the Review-and-Declaration step's own
  read-only summary tables (echoing every prior step's entered values) are
  not modelled as fields — they carry no new data, consistent with this
  registry's convention of modelling only applicant-supplied data.
- **Submission Date field (p.37):** shown pre-filled/read-only in the
  Declaration block's rendered example; not applicant-supplied, so not
  modelled as a field.

## Conformance exercise

`conformance/ae/fta/corporate-tax-registration/1.0.0/application-packet.json`
models a fabricated Legal Person - UAE Private Company applicant (a Dubai
mainland spice trader) with a trade license, a single natural-person owner
at 100% shareholding, no branches, and a UAE-resident authorized signatory —
exercising the Main License Details block, the Emirates ID block, and the
always-required Passport block together. The generator script additionally
re-evaluates the `requiredWhen` conditions against three fabricated negative
branches (`entityType=natural_person_individual`,
`authorizedSignatoryIsUaeResident=false`, and
`entityType=legal_person_foreign_company`) and confirms each correctly turns
off its gated fields — this caught no defects, but is recorded as a
from-scratch check independent of the schema's own authoring pass. Re-run
with `node tools/validate.mjs` and `node tools/validate-ajv.mjs` against
`schema.json` (both pass, GovSchema `0.3.0`).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the manual PDF and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual screenshot.
2. Confirm the FTA has not since published a newer manual revision
   superseding v4.0.0.0 (17 May 2023) — EmaraTax's UI evolves and a newer
   manual version may exist even though this was the latest version found
   this cycle.
3. Resolve the four interpretive judgment calls above against a live
   EmaraTax render if credentialed access is available, or a newer manual
   revision if one surfaces.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer manual revision has been
published, on or before that date and on any `source.url` change.
