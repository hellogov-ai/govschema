# Verification record — `tz/tra/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3214)

GOV-3214 is a child issue of the GOV-3212 "GovSchema Standard Research"
cycle (2026-07-15), scouted after that cycle found Tanzania at 3 of 6
verticals (Business Formation/GOV-3113, Taxes/GOV-3101, National ID &
Civic Documents/GOV-3152), with DMV, Visa, and Passport left as open
unscreened backlog. A related weaker candidate — TRA's Driver's License
Guide, a marketing walkthrough for the login-gated IDRAS online portal —
was screened by the scouting note and confirmed a soft dead end for a
standalone driving-license schema. TRA's own Form MV10 (vehicle
registration) was the viable path for this vertical instead. This document
opens Tanzania's DMV vertical (4th of 6).

## Source

- **URL:**
  `https://www.tra.go.tz/images/uploads/forms/APPLICATION_FOR_REGISTRATION_MOTOR_VEHICLE.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, `content-type: application/pdf`,
  1,111,676 bytes, fetched directly with `curl` from the official
  `tra.go.tz` domain — no login/CAPTCHA/WAF gate encountered.
- **sha256:**
  `45c9fe1cee298c16d91c0aa0c38294373e375f2017d9d923b3a8d5bb62fe3ee4`
- 2 pages. Each page's raw MediaBox is landscape A4 (841.92×595.2pt) with a
  90-degree `/Rotate` entry, so the document renders and prints as portrait
  A4 — confirmed via `pdfjs-dist`'s `page.view`/`page.getViewport()`.
- TRA already anchors Tanzania's Taxes (`tz/tra/itx201-01-e-individual-income-tax-return`)
  and Business Formation entries; TRA also administers motor vehicle
  registration under the Road Traffic Act, alongside its taxation mandate.

## Extraction method — genuine scanned/raster PDF, no text layer

- `pdfjs-dist@3.11.174`'s `getTextContent()` returned **zero text items** on
  both pages.
- `page.getAnnotations()` returned **zero widgets** on both pages —
  confirmed not an AcroForm either.
- Both pages were rendered with `pdfjs-dist` + `node-canvas` at 3x scale
  (1785×2525px per page), then cropped at higher effective resolution
  section-by-section (owner/titleholder blocks, the class/purpose row, the
  number-plate legend, the vehicle-category/colour legend, the official-use
  block) to resolve every field label and legend value. The full-page
  renders and every crop referenced below are the actual basis for the
  field list — the same profile as `md/asp/vehicle-registration`
  (GOV-3157): a genuine text-extraction gap (zero recoverable text), not a
  vector-drawn grid pdfjs-dist's text layer merely missed.
- Both page renders carry faint mirrored bleed-through text from the
  opposite side of the physical sheet (visible in the initial page-1 render
  as backwards page-2 paragraph text). Confirmed as scan bleed-through, not
  genuine page-1 content, by a targeted high-resolution crop of the
  affected whitespace on page 1 (see the "no dedicated Owner's Name field"
  finding below) — the crop shows only the mirrored page-2 notes text, no
  forward-reading page-1 content underneath it.

## Field-by-field derivation and judgment calls

- **No printed required/optional convention anywhere.** This form carries
  no asterisks, bold markers, or other explicit required/optional
  convention. Requiredness below is a disclosed judgment call based on
  which data this registration transaction structurally cannot proceed
  without: `applicationReason`, `ownerCategory` (the source's own page-2
  note states the application "will be rejected" if Owner Category and
  identity number are not stated), `ownerDeclarationDate`, and the
  vehicle's core `yearOfMake`/`vehicleMake`/`vehicleModel`/`vehicleCategory`/
  `vehicleColorCode`/`vehicleConfiguration`. Vehicle technical specifications
  (weights, axle counts, engine capacities, transmission, class/purpose,
  road-worthiness/insurance/customs reference numbers) are modeled optional.
- **No dedicated "Owner's Name" field.** The Particulars of Owner block has
  no name blank anywhere — only Owner Category, an Owner Identification
  Number table (TIN Number / Other Number), and the declaration/date/
  signature. This contrasts with the Particulars of Titleholder block,
  which does have an explicit "Titleholder's Name" / "Age" line. The
  "USE BLOCK LETTERS" instruction beneath the Owner Identification Number
  table sits over genuinely blank whitespace, confirmed by a targeted
  high-resolution crop, with no printed line before the declaration box.
  Page 2's own explanatory note ("In most cases the ID number will be
  identified against the TIN system or other similarly reference data
  tables") explains why: TRA resolves the owner's identity from the
  tabulated TIN/Other Number rather than a free-text name field. This is a
  genuine, disclosed source finding — no `ownerName` field is fabricated to
  fill the apparent gap.
- **`ownerTinNumber`/`ownerOtherIdNumber` and
  `titleholderTinNumber`/`titleholderOtherIdNumber` both optional.** The
  source's own required-if-not-rejected note structurally implies at least
  one of the owner pair must be present, but v0.3's field model has no
  "at least one of two optional fields" cross-field primitive — disclosed
  in each field's `description` rather than encoded.
- **`classNumber` ("Class No").** The very first blank in the Motorvehicle
  Particulars table, carrying no accompanying legend or further label
  anywhere on either page. Modeled as free text rather than asserting an
  unverified meaning.
- **`vehicleCategory` / `vehicleColorCode` legends.** Each is a single
  blank on the Motorvehicle Particulars table ("(See below)") referencing a
  closed legend table printed lower on page 2 (11 vehicle categories, 10
  colours). Modeled as `enum` fields keyed to the legend's own printed
  numeric codes, with every legend value transcribed verbatim into the
  field `description` (v0.3 has no labelled-enum-option member, GSP-0003).
- **`vehicleColorOther` ("Other Colour").** A supplementary free-text box
  alongside the closed 10-value colour legend, for a shade the legend does
  not capture precisely; modeled as a separate optional field rather than
  folded into `vehicleColorCode`.
- **`locallyManufactured`.** The printed checkbox trio
  ("☐ Locally Manufactured ☐Yes ☐No") carries an unexplained leading
  checkbox before the Yes/No pair, with no separate label or blank of its
  own. Modeled as a single boolean capturing only the Yes/No answer; the
  leading checkbox is disclosed as unmodeled rather than guessed at. This
  field is a distinct data point from Application Reason's own "Locally
  manufactured" enum option on page 1 — both are printed on the source and
  both are modeled, disclosed here as an observed redundancy in the source
  form itself, not a modeling error.
- **Note 1 ("State all, if available, at least one must be indicated")**,
  printed over Engine Cubic Capacity (1) / Engine KW Capacity (1) / Engine
  HP Capacity (1). An "at least one of three optional fields" rule with no
  cross-field primitive to express it in v0.3 — disclosed on each of the
  three fields' `description` rather than encoded.
- **Note 2 ("For Heavy Duty Vehicles and Semi-trailers only. State all axle
  distances, starting from the front axle.")**, printed over Number of
  Axles (2) / Axle Distance (Centimeter) (2). Not encoded as `visibleWhen`
  since "Heavy Duty Vehicles" does not map onto a single unambiguous
  `vehicleCategory`/`vehicleConfiguration` value the source itself names —
  disclosed on both fields' `description` instead. `axleDistance` is
  modeled as free text (not a number) since the note calls for "all axle
  distances" into what is structurally a single blank, and v0.3 has no
  repeating-value field type (GSP-0009 remains deferred).
- **`numberPlateQuality` ("and quality: 1☐ 2☐"), repeated once per
  number-plate-size row with no legend anywhere distinguishing grades 1/2.**
  Modeled as a single enum field since only one plate size (and therefore
  one quality tick) applies per application; the unresolved meaning of the
  two grades is disclosed in the field's `description` rather than guessed.
- **`visibleWhen`/`requiredWhen` conditions attached only where the source's
  own printed label explicitly and unambiguously scopes a field**, e.g.
  "(For Take-on vehicle only)" → `registrationBookNumber`, "(For imported
  vehicles only)" → `foreignRegistrationNumber`, the italic "Insurance
  Information for Take-on vehicles only" header → the five insurance
  fields, and "Not mandatory for Take-on registration" →
  `numberPlateDeliveryAddress`'s `requiredWhen`. The Supporting
  Documentation column's customs/SARPCCO reference-number fields
  (`customsClearanceCertificateNumber`, `sarpccoClearanceCertificateNumber`,
  etc.) carry **no** such explicit per-field scoping label on page 2 itself
  — only the separate page-1 attachment-requirement bullets reference
  Application Reason, which are modeled via `documents[].requiredWhen`
  instead — so these page-2 reference-number fields are left as plain
  optional fields rather than an inferred `visibleWhen` this registry
  cannot attribute to explicit source text.
- **`documents[]` (6 entries).** `ownerDeclaration`/`titleholderDeclaration`
  model the two "I declare that all the particulars furnished by me in this
  form are true and correct" attestation boxes verbatim (category
  `attestation`, statement text quoted exactly); the wet-ink
  "Owner's Signature"/"Titleholder's Signature" lines themselves are
  excluded per this registry's standing convention on physical signatures,
  with their adjoining dates modeled as `ownerDeclarationDate`/
  `titleholderDeclarationDate` fields. The remaining four entries model the
  page-1 "Please attach to this application" bullets, each gated by
  `requiredWhen` on `applicationReason` where the bullet's own condition
  maps onto that field's enum values (`registrationCardAndInsuranceCertificate`
  → Take on; `customsClearanceCertificate` → Importation or Other).
  `policeInspectionReport`'s bullet also reads "or if vehicle older than
  three years" and `sarpccoCertificate`'s bullet also reads "and if vehicle
  imported from a SADC member country" — neither clause is encoded in
  `requiredWhen` (no age-from-`yearOfMake` computation in the Condition
  grammar, and no SADC-membership-of-`importedFrom` field on this form) and
  each is disclosed instead in the document entry's own `handling` member.
- **Official-use-only block excluded.** "For official use only" — Personal
  Plate Number (7-box grid), Registration No (7-box grid), Vehicle Control
  No, Date, Office Code, Officer Code, and Official stamp & signature — a
  post-processing registration record TRA staff complete once the
  application is approved, not applicant-supplied data. Consistent with
  this registry's established convention of excluding staff/office-only
  blocks (e.g. `md/asp/vehicle-registration`'s excluded inspector-
  verification lines).

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/visibleWhen/pattern/date-format/enum/range rules directly from
this schema's own `fields[]`/`documents[]`, discarded after use, not
committed) ran the following fixtures in
`conformance/tz/tra/vehicle-registration/1.0.0/`:

- `valid-first-time-importation-dar-es-salaam.json` (a newly imported
  self-propelled pickup, `applicationReason: importation`, with the
  customs/SARPCCO/foreign-registration fields and documents an importation
  triggers) — **0 errors**.
- `valid-taken-on-with-titleholder-and-insurance.json` (a company-owned
  heavy load vehicle taken on from a financial-institution titleholder,
  `applicationReason: taken_on`, exercising the titleholder block,
  registration-book/current-registration/insurance fields, and the
  Take-on-triggered documents) — **0 errors**.
- `mutation-control-missing-required-field-application-reason.json` (drops
  `applicationReason`) — **exactly 1 error**.
- `mutation-control-missing-required-field-owner-category.json` (drops
  `ownerCategory`) — **exactly 1 error**.
- `mutation-control-missing-required-field-vehicle-category.json` (drops
  `vehicleCategory`) — **exactly 1 error**.
- `mutation-control-invalid-enum-vehicle-category.json` (sets
  `vehicleCategory` to `"12"`, outside the 1–11 legend) — **exactly 1
  error**.
- `mutation-control-invalid-range-year-of-make.json` (sets `yearOfMake` to
  `1850`, below the `minimum: 1900` bound) — **exactly 1 error**.
- `mutation-control-invalid-date-format-owner-declaration-date.json` (sets
  `ownerDeclarationDate` to `15/07/2026`, not ISO `YYYY-MM-DD`) —
  **exactly 1 error**.
- `mutation-control-missing-required-document-owner-declaration.json`
  (drops the `ownerDeclaration` attestation) — **exactly 1 error**.
- `mutation-control-missing-conditionally-required-documents-taken-on.json`
  (starts from the Take-on fixture and drops `policeInspectionReport`,
  exercising `documents[].requiredWhen`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **488/488** (up from 487/487).
- `node tools/verify-sources.mjs registry/tz/tra/vehicle-registration/1.0.0`
  — 1 directory, 3 URLs checked. The source PDF URL itself returned a
  transient `UND_ERR_RES_CONTENT_LENGTH_MISMATCH` warning (tolerated by the
  tool; the same 1.1MB file was independently confirmed HTTP 200 with a
  matching sha256 via `curl` moments earlier in this session). The bare
  `https://www.tra.go.tz` host is already allowlisted (GOV-3159) for a
  documented Node-`fetch()`-vs-server header-folding incompatibility this
  registry's other `tra.go.tz` entries already carry; this cycle did not
  need to add a new allowlist entry.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (488 entries).

## Maturity

`structural-reference`: the source form's own printed field labels and
legend values are fully transcribed from the genuine, currently-served
official PDF via a high-resolution raster render (no text layer existed to
extract), but no live filing through a TRA online channel was attempted.
GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of the United
Republic of Tanzania or the Tanzania Revenue Authority.
