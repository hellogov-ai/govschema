# Verification record — `md/asp/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3157)

GOV-3157 is a child issue of the GOV-3152 "GovSchema Standard Research"
cycle (2026-07-15), which independently scouted and live-verified five of
Moldova's six remaining verticals after that cycle's own GOV-3115 opened
Moldova (60th jurisdiction) via Business Formation
(`md/asp/cerere-inregistrare-intreprinzator-individual`). This ticket was
the strongest of the confirmed-live candidates the scouting note left
disclosed and pre-scouted. This document opens Moldova's DMV vertical (2nd
of 6).

## Source

- **URL:**
  `https://www.asp.gov.md/sites/default/files/servicii/e-servicii/formulare-tip/3-4/7_pentru_proprietari_particulari.pdf`
- **Discovered via:** `https://e-services.md/ro/content/descarca-formulare`,
  ASP's own forms index (an unauthenticated public listing).
- **Retrieved:** 2026-07-15, HTTP 200, `content-type: application/pdf`,
  216,735 bytes, fetched directly with `curl` — no login/CAPTCHA/WAF gate
  encountered at any point on `asp.gov.md`, `www.asp.gov.md`, or
  `e-services.md`.
- **sha256:**
  `8ea235ff626f3089efeceecf2f5b3a804e4b8c18d86ae68c1212655119558e50`
- Genuine %PDF-1.4 header (confirmed via `od -c` on the first 8 bytes).
- A **sibling form** (`8_..._persoane_juridice.pdf`, for legal-entity
  owners) exists at the same index and is explicitly out of scope of this
  document, which models the private-individual (`proprietari particulari`)
  version only.

## Extraction method — genuine scanned/raster PDF, no text layer

Unlike `md/asp/cerere-inregistrare-intreprinzator-individual` (a native
text-layer PDF from the same agency), this single-page document is a
**genuine scanned/rasterized form**:

- `pdfjs-dist@3.11.174`'s `getTextContent()` on the sole page returned
  **zero text items**.
- `page.getAnnotations()` returned **zero widgets** — confirmed not an
  AcroForm either.
- The page was rendered with `pdfjs-dist` + `node-canvas` at 4x scale
  (2380×3368px full-page PNG), then cropped at higher effective resolution
  section-by-section to resolve every field label, box grid, and
  ambiguous abbreviation. The full-page render and every crop referenced
  below are the actual basis for the field list — this is a genuine
  text-extraction gap (zero recoverable text), not a vector-drawn grid
  pdfjs-dist's text layer merely missed (contrast
  `do/mirex/passport-application`, where Tj text-showing operators for the
  grid labels existed in the content stream but landed outside the first
  extraction pass's y-grouping — here there was no text to miss at all).

## Field-by-field derivation and judgment calls

- **No printed required/optional convention anywhere.** Unlike
  `do/mirex/passport-application`'s explicit `*` asterisk convention, this
  form carries no asterisks, bold markers, or "obligatoriu" text
  distinguishing required from optional fields. Requiredness below is a
  disclosed judgment call based on which data a private-owner vehicle
  transaction structurally cannot proceed without (owner identity, contact,
  and the vehicle's own identifying/technical particulars), with
  block/apartment-style address sub-fields, `placeOfWork`/`jobTitle`, and
  `specialRemarks` modeled optional.
- **Pre-title header excluded (`ELIBERAT p/t` / `n/î`).** These two blanks
  appear above the centered "PENTRU PROPRIETARI PARTICULARI" title itself,
  before any citizen-facing field — read together ("Issued for... /
  no./at...") this reads as a post-processing issuance reference an office
  fills in once a request is completed, not something the applicant
  supplies when filing. Excluded, consistent with this registry's
  established convention of not fabricating fields for administrative
  tracking headers (e.g. `do/mirex/passport-application`'s excluded
  "Lugar de Emisión, Solicitud Número, Fecha de Solicitud" box).
- **`operația tehnologică ... cod` (2-digit code box) excluded.** This
  reads as an internal ASP transaction-type classification code (e.g. a
  back-office code table distinguishing first registration / re-
  registration / plate replacement / deregistration), not a value the
  applicant would know or self-assign — no such code list is printed
  anywhere on the form. The substantive nature of the request is instead
  captured in the applicant's own free-text `requestDescription` field
  (`Rog ___`).
- **Second `n/î` occurrence (after `Marca, model`) also excluded.** The
  exact same ambiguous two-character abbreviation reappears once more,
  immediately after the vehicle make/model blank, again with no
  distinguishing sub-label. Genuinely unresolved from the rendered image;
  disclosed here as an interpretive judgment call rather than a fabricated
  guess at its meaning (see the crop at `/tmp/md-vehicle-reg/crop_marca.png`
  and `/tmp/md-vehicle-reg/crop_ni_zoom.png` in this session).
- **`identityCardIssuedBy` (the single `eliberat` blank).** No sub-label
  distinguishes an issuing authority from an issuance date (unlike the
  form's own explicit `Data nașterii` label elsewhere); modeled as a single
  free-text field capturing whatever the applicant writes.
- **`vehicleVin` / `engineNumber` / `bodyNumber` / `chassisNumber` box
  grids.** Each is printed as a comb-style grid subdivided by forward
  slashes (e.g. `___/___/___/.../___`). The exact cell count could not be
  reliably determined from the rendered image at any crop scale attempted
  (uniform tick marks, no printed numbered guide) — modeled as free-text
  strings with a generous `maxLength` rather than asserting an unverified
  exact character count or a modern 17-character VIN pattern this legacy
  Soviet-derived form template does not itself print.
- **`bodyNumber` (`Caroseria nr.`) and `chassisNumber` (`Șasiul nr.`)
  modeled optional, distinct from `vehicleVin`.** This is a legacy
  East European form that separately tracks body (caroserie) and chassis
  (șasiu) numbers alongside a modern VIN concept (`COD VIN`) and an engine
  number — a distinction some vehicles' documentation may not populate
  independently of the VIN. Modeled optional rather than assuming every
  vehicle has all three as independently meaningful values.
- **`Centrul Militar` box excluded.** A bordered stamp/annotation box
  captioned "Centrul Militar (Pentru vehiculele sápuse evidenței)"
  ("Military Center — for vehicles subject to [military] registration")
  contains no blank line for applicant data; read as a third-party
  military-registration-authority annotation box, not applicant-supplied.
- **`EXPERT`, `VERIFICAREA DI (9-31, 9-73)`, `Verificarea vehiculului`,
  `Verificarea actelor` excluded.** Four staff/inspector verification
  lines (technical expert sign-off, a coded internal verification
  reference, and two ASP-inspector signature+date blocks for vehicle and
  document checks respectively) completed by agency personnel during
  processing, not the applicant.
- **`applicationDate`.** The source's own pre-printed
  "Semnătura personală ___ ___ ___ 200_" line bakes in an obsolete
  two-digit-year suffix from this legacy print template (the same "200_"
  suffix recurs on both inspector-verification lines below it). Despite
  this dated typography, the source file itself was independently
  reconfirmed live and unchanged this cycle (fresh HTTP 200 fetch, matching
  sha256, current `asp.gov.md` domain) — not treated as a stale/dead-end
  signal. `applicationDate` is modeled as a standard ISO date field rather
  than reproducing the obsolete `200_` print quirk, since an applicant
  filing in 2026 writes the actual current date regardless. The
  accompanying wet-ink signature itself is excluded per this registry's
  standing convention on physical signatures.
- **`personalIdNumber` pattern.** 13-digit numeric, based on Moldova's
  published IDNP (numărul de identificare de stat al persoanei fizice)
  numbering standard — an external public standard, not printed
  digit-by-digit on the form itself. Mirrors the precedent set in
  `md/asp/cerere-inregistrare-intreprinzator-individual`.
- **`documents[]` (1 entry, optional).** The form's own closing line,
  "La cerere se anexează: 1. ___ 2. ___ 3. ___", is a generic 3-line
  numbered placeholder with no itemized document types printed anywhere.
  Modeled as one optional `supporting-evidence` entry, the same modeling
  choice used for the sibling Business Formation schema's `documents[]`
  entry, rather than fabricating specific document names the source does
  not print.
- **`fuelType`, `vehicleColor`, `vehicleType`, `bodyType`.** Each is a
  single free-text blank on the source with no printed picklist; modeled
  as free-text `string` rather than fabricating an enum this form does not
  offer, consistent with this registry's established practice (e.g. the
  sibling Business Formation schema's `activityDuration` field).

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/pattern/date-format/range rules directly from this schema's
own `fields[]`/`documents[]`, discarded after use, not committed) ran the
following fixtures in
`conformance/md/asp/vehicle-registration/1.0.0/`:

- `valid-first-time-registration-chisinau.json` (a new imported vehicle,
  no existing Moldovan plate, full owner/vehicle particulars) — **0
  errors**.
- `valid-reregistration-existing-plates-balti.json` (an already-plated
  vehicle re-registered on a change of owner, with `existingPlateSeries`/
  `existingPlateNumber` populated) — **0 errors**.
- `mutation-control-missing-required-field-applicant-full-name.json`
  (drops `applicantFullName`) — **exactly 1 error**.
- `mutation-control-missing-required-field-vehicle-vin.json` (drops
  `vehicleVin`) — **exactly 1 error**.
- `mutation-control-missing-required-field-registration-document-number.json`
  (drops `registrationDocumentNumber`) — **exactly 1 error**.
- `mutation-control-invalid-pattern-personal-id-number.json` (sets
  `personalIdNumber` to a 5-digit non-IDNP value) — **exactly 1 error**.
- `mutation-control-invalid-date-format-date-of-birth.json` (sets
  `dateOfBirth` to `12/04/1985`, not ISO `YYYY-MM-DD`) — **exactly 1
  error**.
- `mutation-control-invalid-range-year-of-manufacture.json` (sets
  `yearOfManufacture` to `1850`, below the `minimum: 1900` bound) —
  **exactly 1 error**.

This schema's sole `documents[]` entry is optional rather than required,
so no missing-required-document fixture applies.

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **478/478** (up from 477/477).
- `node tools/verify-sources.mjs registry/md/asp/vehicle-registration/1.0.0`
  — 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (478 entries).

## Maturity

`structural-reference`: the source form's own printed field labels are
fully transcribed from the genuine, currently-served official PDF via a
high-resolution raster render (no text layer existed to extract), but no
live filing through ASP's own e-services channel was attempted. GovSchema
is an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of the Republic of Moldova or
Agenția Servicii Publice.
