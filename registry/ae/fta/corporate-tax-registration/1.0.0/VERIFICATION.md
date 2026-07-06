# Verification record — `ae/fta/corporate-tax-registration` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read primary source**: the
Federal Tax Authority's own official Corporate Tax Registration user guide,
retrieved as a PDF and read page-by-page via PDF-to-image rendering (its
embedded text layer is sparse — mostly step captions, not the on-screen field
labels themselves). It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass.

## Why this document was re-authored (GOV-1374)

This version replaces an earlier authoring pass (GOV-1371, PR #231) that
cited the FTA's **17-May-2023 "Corporate Tax Registration – Taxpayer User
Manual", v4.0.0.0**. The GOV-1374 review gate's independent reviewer
re-downloaded the FTA's live Corporate Tax Registration service page and
found it now links a different, newer document — **"Corporate Tax
Registration User Guide", Version 2.0, dated 1-May-2026** — which reflects a
materially redesigned EmaraTax wizard. The reviewer's findings (posted on PR
#231 and on this issue) were independently re-confirmed by re-downloading the
v2.0 guide fresh and re-rendering every relevant page via the same
`pdfjs-dist` + `node-canvas` technique, then re-authoring the schema
field-by-field against it. Every field cited against the 2023 manual in the
prior version was re-verified or superseded; none were carried over
unverified.

## Source examined

- **Document `(id, version)`:** `ae/fta/corporate-tax-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Tax Authority (FTA), United Arab Emirates
- **Primary source URL:** <https://tax.gov.ae/Datafolder/Files/Pdf/2026/Service-cards/CT/Corporate%20Tax%20Registration%20User%20Guide_EN%20-%20Updated%20version.pdf>
- **Official document title:** "Corporate Tax Registration User Guide",
  Version 2.0, dated 1-May-2026
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (re-authoring source-review, GOV-1374)

Note on version currency: the guide's own document-control table (p.2)
records a single entry — "2.0, 01-May-26, Federal Tax Authority, User Manual
for EmaraTax Portal" — confirmed directly against the rendered screenshot.
This is materially more recent (~2 months before this review) than the
17-May-2023 manual the prior version of this document cited. A future
reviewer should still confirm no even-newer guide has since superseded this
one — see "Path to a `verified` claim" below; this is now a standing
practice for every re-review of this document, not a one-time check.

## Access constraint and how it was worked around

The guide is a plain, directly downloadable PDF (no login, no CAPTCHA) at
the URL above. It is **24 pages, mostly UI screenshots**: `pdfjs-dist`'s
extractable text layer yields only step captions and instructional prose,
not the actual on-screen field labels visible in each screenshot. Every
field in this schema was therefore read directly off the **rendered
screenshots**, not the text layer: each PDF page was rasterized to a PNG
(`pdfjs-dist` + `node-canvas`, 2.6x scale) and read with Claude's own
PDF-vision capability — the same technique used for the prior version of
this document, `ae/fta/vat-registration`, and this registry's other
screenshot-driven guides.

## What was confirmed directly (verbatim, from the rendered screenshots)

All 24 pages were rendered and read in full; field labels and their
step/section membership are cited in each field's `sourceRef` by page
number. Notable, directly-confirmed structural changes from the superseded
2023 manual:

- **p.12, Entity Details:** the Entity Type dropdown is now a flat 9-value
  list (`Natural Person`, `Legal Person - Incorporated`, `Legal Person -
  Foreign Business`, `Legal Person - Club / Association / Society`, `Legal
  Person - Charity`, `Legal Person - Federal Government Entity`, `Legal
  Person - Emirate Government Entity`, `Legal Person - Other`,
  `Partnership`) — transcribed verbatim from a zoomed re-render of the
  dropdown, not paraphrased. Selecting `Legal Person - Incorporated` reveals
  a dependent Entity Sub-Type dropdown with exactly 4 values (`UAE Private
  Company (incl. an Establishment)`, `Public Joint Stock Company`,
  `Foundation`, `Trust`), also transcribed from a zoomed re-render. `Trust`
  and `Foundation` were top-level Entity Type values in the superseded 2023
  manual; they are now Entity Sub-Type values nested under `Legal Person -
  Incorporated`. The 2023 manual's two separate `Foreign Company`/`Foreign
  Partnership` values are now a single `Legal Person - Foreign Business`.
  `Partnership` moved from a Legal-Person sub-type to a top-level Entity
  Type of its own.
- **p.13, Entity Details - Continuity:** a new "Are you a Qualifying Public
  Benefit Entity?" Yes/No field and a new "Upload Certificate of
  Incorporation / Memorandum of Association" entity-level document upload,
  neither present in the superseded 2023 manual. The Corporate Tax Period
  dropdown is confirmed still showing only one example value
  ("January - December"), never opened — free-text modelling retained. The
  wizard now visibly auto-derives a First Corporate Tax Period Start/End
  Date and a First Corporate Tax Return Filing Due Date from the Corporate
  Tax Period selection (shown as read-only grey fields) — confirmed
  directly and, being system-computed rather than applicant-supplied, not
  modelled as fields.
- **p.11, Instructions and Guidelines (Required Documents):** the full,
  split-by-registrant-type required-documents list was read directly and is
  the evidentiary basis for every document's `requiredWhen` gate in this
  version, including the new `decreeLawDocument` (Federal/Emirate Government
  Entity) and `cabinetDecisionDocument` (Qualifying Public Benefit Entity)
  entries. Both the Natural Person list (item A2, "Trade Licenses") and the
  Legal Person/Partnership list (item B4, "Main Trade License") call for a
  trade license; only the Federal/Emirate Government Entity path
  substitutes a Decree Law. This directly informs the trade-license
  `requiredWhen` carve-out in this version, which is narrower than the
  superseded 2023 manual's (see "Interpretive judgment calls" below).
- **p.12, info box:** "Before proceeding to the next section, all mandatory
  fields in the current section must be completed. Optional fields are
  clearly marked as 'Optional'." This is direct, explicit textual evidence
  used throughout this version to resolve required/optional for every field
  not itself carrying a `(Optional)` suffix in its on-screen label — see
  "Interpretive judgment calls" below.
- **p.16, Main License Details – Adding Activities:** the Business Activity
  modal now includes a "Sub Activity" field (rendered example "Tourism &
  Recreation Consultants") in addition to Industry/Main Group/Sub-Group/
  Activity/Activity Code — not present in the superseded 2023 manual.
- **p.16-17, Adding Owners:** a new "Do any of the owners hold 25% or more
  of the ownership?" Yes/No gate, not present in the superseded 2023
  manual.
- **p.17/p.19, Owners List:** the summary table's columns (`Owner Type`,
  `Name in English`, `Name in Arabic`, `ID Number`, `Shareholding
  Percentage`, `Actions`) were read directly and are the basis for this
  version's `ownerNameEnglish`/`ownerNameArabic`/`ownerIdNumber` fields — a
  single combined name pair and a single ID-number field, rather than the
  superseded 2023 manual's first/last-name split (which had no owner ID
  field at all).
- **p.18, Adding Owner Details:** a new "Does the owner hold a valid
  Emirates ID?" Yes/No gate (`ownerHasEmiratesId`) and a new "Do you want
  your UAE Pass profile information to be retrieved?" Yes/No option (a
  data-entry shortcut, not modelled as a field — see "What is out of scope"
  below), neither present in the superseded 2023 manual.
- **p.20, Contact Details:** fully re-confirmed and materially redesigned.
  `Building Name & Number`/`Street`/`Area`/`Emirate` (superseded 2023
  manual) are replaced by a generic `Address Line 1`–`Address Line 4` block
  plus `City`. Two fields were added that the superseded version's own
  VERIFICATION.md explicitly asserted were absent: **Email ID** and **P.O.
  Box (Optional)**. This screenshot is fully visible (no crop/scroll issue),
  so every field in this step is directly confirmed, not inferred.
- **p.21, Authorized Signatory:** the "Add Authorized Signatory" modal is
  **fully visible** in this guide — unlike the superseded 2023 manual, whose
  equivalent screenshot began mid-scroll and forced the prior version to
  infer Name/Email fields from a summary table instead. This version's
  modal shows, in order: "Do you want your UAE Pass profile information to
  be retrieved?" (not modelled, data-entry shortcut only), "Does the
  authorized signatory hold a valid Emirates ID?" (`authorizedSignatoryHasEmiratesId`),
  the "No" branch's Passport Number/Expiry Date/Issuing
  Country/upload, First/Last Name in English and Arabic, Country Code +
  Mobile Number, Email ID, and a new **Designation** field (rendered
  example "CEO") not present in the superseded 2023 manual. No "Source of
  Authorization" dropdown is visible in this modal (present in the
  superseded 2023 manual) — see "Interpretive judgment calls" below.
- **p.22, Review and Declaration:** the Declaration block's First/Last Name
  in English and Arabic, Country Code, Mobile Number, Email, and Submission
  Date (read-only, not modelled) fields are confirmed present, though this
  page shows them as a read-only review echo rather than the original entry
  form — see "Interpretive judgment calls" below regarding required/optional.

## Interpretive judgment calls (flagged for an independent reviewer)

1. **Untagged fields treated as mandatory:** per the guide's own explicit
   instruction (p.12, quoted above), this version treats every field
   without an on-screen `(Optional)` suffix as required. This is a change
   from the prior version's approach (which inferred optionality for some
   untagged fields, e.g. Landline Number and Declaration's Arabic name
   fields, based on the 2023 manual's own layout). Applying this rule here
   makes `contactAddressLine2`/`3`/`4`, `contactLandlineCountryCode`/
   `Number`, and `declarantFirstNameArabic`/`LastNameArabic` all required —
   in particular, a mandatory landline number alongside a mandatory mobile
   number, and a mandatory second/third/fourth address line, are somewhat
   unusual real-world requirements. A future reviewer should confirm these
   against a live EmaraTax render rather than relying solely on the
   guide's general instructional text.
2. **Owner identity fields (`ownerNameEnglish`, `ownerNameArabic`,
   `ownerIdNumber`):** the Owner Details entry-modal screenshot (p.18)
   begins mid-scroll, at the Emirates ID gate — its own Name/ID-number
   input fields (above what's captured) were not directly visible in any
   rendered page of this 24-page guide. These three fields are instead
   read from the Owners List **summary table's own column headers** (p.17/
   p.19: "Name in English | Name in Arabic | ID Number | Shareholding
   Percentage"), which are directly confirmed. A future reviewer should
   confirm the modal's own field labels directly (e.g. via a live EmaraTax
   render), and in particular check whether the live wizard splits
   `ownerIdNumber` into separate Emirates-ID/passport fields the way the
   Authorized Signatory section does, or genuinely keeps it as one field.
3. **Authorized Signatory's Emirates ID fields
   (`authorizedSignatoryEmiratesIdNumber`/`ExpiryDate`):** the rendered
   "Add Authorized Signatory" modal (p.21) shows only the "No" (does not
   hold a valid Emirates ID) branch, with its Passport fields. The "Yes"
   branch's own Emirates ID Number/Expiry Date field labels are asserted by
   direct analogy to this registry's established Emirates-ID-field pattern
   (e.g. the Owner Details/Authorized Signatory sections of sibling EmaraTax
   schemas), not independently confirmed in this guide. A future reviewer
   should confirm this branch against a live render.
4. **Trade-license `requiredWhen` carve-out narrowed:** the superseded 2023
   manual excluded Natural-Person-Partnership-or-Heir, both Foreign
   sub-types, and both Government-Entity sub-types from the trade-license
   requirement. This version's required-documents list (p.11) shows
   **both** the Natural Person and the Legal Person/Partnership document
   lists calling for a trade license, with only the Federal/Emirate
   Government Entity path substituting a Decree Law — so this version
   excludes only `legal_person_federal_government_entity` and
   `legal_person_emirate_government_entity`. This is a directly-evidenced,
   narrower carve-out, not carried over from the prior version by default;
   a future reviewer should confirm against a live render, in particular
   for `legal_person_foreign_business` and `partnership`.
5. **`authorizedSignatorySourceOfAuthorization` and its evidence field
   dropped as a standalone free-text field:** the superseded 2023 manual
   modelled a "Source of Authorization" dropdown (rendered example
   "Memorandum of Association") in the Authorized Signatory section. No
   such dropdown is visible anywhere in this guide's fully-rendered
   Authorized Signatory modal (p.21). The corresponding required document
   (`authorizedSignatoryAuthorizationEvidence`, required per p.11's
   "Proof of Authorization of Authorised Signatories") is retained, since
   it is directly evidenced by the required-documents list, but no
   dedicated upload-slot screenshot for it was found in this 24-page guide
   (unlike Passport/Certificate-of-Incorporation, which do have visible
   upload slots) — its file-format/size constraints are therefore asserted
   generically (`application/pdf`) rather than confirmed. A future reviewer
   should confirm both the absence of a Source-of-Authorization field and
   this document's actual upload constraints against a live render.
6. **`decreeLawDocument` and `cabinetDecisionDocument` constraints:**
   both documents are directly evidenced as required by the p.11
   required-documents list, but neither has a dedicated upload-slot
   screenshot rendered anywhere in this guide (only named in the
   Instructions and Guidelines page's bulleted list). Their file-format/size
   constraints are asserted generically (`application/pdf`, no explicit
   size limit) rather than confirmed against an actual upload UI. A future
   reviewer should confirm against a live render.

## What is out of scope for v1.0.0

- **Natural Person registration's own field set:** `entityType` is
  selectable as `natural_person`, but this version does not model a
  Natural-Person-specific flow beyond that selection, for the same reason
  as the prior version: no screenshots of a distinct Natural Person flow
  were found in this 24-page guide (every rendered example uses `Legal
  Person - Incorporated`). This is a disclosed scope decision, matching
  this registry's precedent of deferring unsourced sub-flows.
- **UAE Pass / Emirates ID auto-retrieval options:** both the Owner Details
  modal ("Do you want your UAE Pass profile information to be retrieved?")
  and the Authorized Signatory modal (same question) offer a data-entry
  shortcut that auto-fills fields from a UAE Pass-linked Emirates ID. This
  is a UI/UX interaction mode, not itself applicant-supplied data distinct
  from the underlying Name/ID/Contact fields already modelled, so it is not
  modelled as a separate field — consistent with this registry's convention
  of modelling only the data itself, not the entry method.
- **Per-branch, per-owner, and per-business-activity repeating detail
  beyond the first entry:** GovSchema v0.3's field model is flat with no
  array/repeating-group type yet (`spec/v0.3/SPEC.md` §6.1). Each is
  modelled as a single first/primary entry, the same precedent this
  registry has established for other repeating tables.
- **Full per-branch sub-form:** Local Branch Details (p.19) states each
  branch requires its own complete trade-license/business-activity/owner
  sub-structure, structurally identical to the main entity's — not
  duplicated here beyond the `hasBranchesInUae` gate itself.
- **VAT Registration and Excise Tax registration:** both are separate
  EmaraTax applications with their own user guides (VAT Registration is
  modelled separately as `ae/fta/vat-registration`), out of scope for this
  document.
- **Review-summary step (p.22):** the Review-and-Declaration step's own
  read-only summary tables (echoing every prior step's entered values) are
  not modelled as fields — they carry no new data, consistent with this
  registry's convention of modelling only applicant-supplied data.
- **First Corporate Tax Period Start/End Date and First Corporate Tax
  Return Filing Due Date, and Submission Date:** shown as read-only,
  system-computed fields in the rendered screenshots (p.13, p.22); not
  applicant-supplied, so not modelled as fields.

## Conformance exercise

`conformance/ae/fta/corporate-tax-registration/1.0.0/application-packet.json`
models a fabricated Legal Person - Incorporated (UAE Private Company)
applicant (a Dubai mainland spice trader) with a trade license, a single
natural-person owner holding 100% (Emirates-ID-holding) and 25%+ of the
ownership, no branches, and a non-UAE-resident-by-Emirates-ID authorized
signatory (exercising the Passport block). A standalone check script
re-evaluated every `requiredWhen`/`documents[].requiredWhen` condition
against the primary scenario and four alternate branches
(`entityType=natural_person`, `entityType=legal_person_federal_government_entity`,
`isQualifyingPublicBenefitEntity=true`, `authorizedSignatoryHasEmiratesId=true`)
and confirmed each correctly turns its gated fields/documents on or off — see
`application-packet.txt` for the full results. Re-run with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` against
`schema.json` (both pass, GovSchema `0.3.0`).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the guide PDF and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual screenshot.
2. Confirm the FTA has not since published a newer guide revision
   superseding v2.0 (1-May-2026) — this is now a standing check for every
   re-review of this document, given it has already happened once.
3. Resolve the six interpretive judgment calls above against a live
   EmaraTax render if credentialed access is available, or a newer guide
   revision if one surfaces. Judgment call 1 (untagged-fields-mandatory) in
   particular has a broad blast radius across the Contact Details and
   Review and Declaration steps and would benefit most from independent
   confirmation.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-11-01**
(~4 months, shorter than this registry's usual ~6-month cadence, given this
document has already been found stale once within months of its first
authoring). Re-check the source, and confirm no newer guide revision has
been published, on or before that date and on any `source.url` change.
