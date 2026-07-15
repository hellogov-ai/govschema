# Verification record — `md/asp/cerere-admitere-examen-preschimbare-restabilire-permis-conducere` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3179)

GOV-3179 is a disclosed backlog candidate from GOV-3157 (the Moldova DMV
vertical opener, `md/asp/vehicle-registration`), itself a child of the
GOV-3152 "GovSchema Standard Research" cycle. This document is a second
DMV sub-process for Moldova, from the same ASP forms index
(`https://e-services.md/ro/content/descarca-formulare`) as the just-merged
vehicle-registration schema.

## Source

- **URL:**
  `https://www.asp.gov.md/sites/default/files/servicii/e-servicii/formulare-tip/3-4/3_cerere_de_admitere_la_examen_preschimbare_restabilire_permis_de_conducere_2.pdf`
- **Discovered via:** `https://e-services.md/ro/content/descarca-formulare`,
  ASP's own forms index (an unauthenticated public listing) — the same
  index as `md/asp/vehicle-registration`.
- **Retrieved:** 2026-07-15, HTTP 200, `content-type: application/pdf`,
  56,576 bytes, fetched directly with `curl` — no login/CAPTCHA/WAF gate
  encountered.
- **sha256:**
  `a099c40f302c0932c97b5caa4818599a925f820f4625ff070eeaecd92f6d8ff7`
- Genuine %PDF-1.5 header (confirmed via `od -A x -t x1z` on the first 16
  bytes).
- Re-verified fresh this cycle rather than trusted from the GOV-3157
  scouting note as-is, per that ticket's own instruction.

## Extraction method — genuine scanned/raster PDF, no text layer

Like the sibling `md/asp/vehicle-registration` (and unlike
`md/asp/cerere-inregistrare-intreprinzator-individual`), this single-page
document is a **genuine scanned/rasterized form**, confirmed
programmatically rather than assumed:

- `pdfjs-dist@3.11.174`'s `getTextContent()` on the sole page returned
  **zero text items**.
- `page.getAnnotations()` returned **zero widgets** — confirmed not an
  AcroForm either.
- The page was rendered with `pdfjs-dist` + `node-canvas` at 4x scale
  (2382×3370px full-page PNG), then cropped section-by-section (top
  header, DNP box-grid zoom, each of the four checkbox blocks, and the
  closing signature block) to resolve every field label and box grid at
  higher effective resolution. The full-page render and every crop are
  the actual basis for the field list below.

## Field-by-field derivation and judgment calls

- **No printed required/optional convention anywhere**, same as the
  sibling `md/asp/vehicle-registration`. Requiredness is a disclosed
  judgment call based on which data each request type structurally cannot
  proceed without.
- **Four mutually-exclusive request types, modeled as an enum
  `requestType` with `requiredWhen`-gated conditional fields per option**,
  following the same conditional-field pattern established elsewhere in
  this registry (e.g. `mx/semovi/alta-vehiculo-foraneo`'s
  `ownerPersonType`-gated fields). The source form prints four checkboxes
  on one page: (1) `admiterea la proba___examenului...` (exam admission),
  (2) `preschimbarea permisului de conducere...` (license exchange), (3)
  `restabilirea permisului de conducere...` (license restoration), (4)
  `eliberarea permisului de conducere provizoriu` (provisional license
  issuance, no further blanks). Each of the first three carries distinct
  printed blanks not shared with the others, so this document models them
  as separate conditional field sets rather than one shared set.
- **`Șefului ___ (subdiviziunea, numele, prenumele)` pre-title addressing
  line, modeled as an optional field (`submittedToOffice`), not
  excluded.** Unlike the vehicle-registration sibling's excluded
  `ELIBERAT p/t`/`n/î` header (a post-processing issuance reference), this
  line plausibly could be completed by either the applicant (naming the
  specific ASP subdivision they are filing to) or the receiving office
  itself. Disclosed as an interpretive judgment call rather than either
  excluding it outright or asserting it is applicant-required.
- **`DNP` 13-digit box grid, modeled as `personalIdNumber` with the same
  13-digit IDNP pattern established in the sibling `md/asp` schemas.** The
  cell count (13) was counted directly from a zoomed crop
  (`/tmp/gov3179/dnp_zoom2.png` in this session). The abbreviation itself
  differs from the sibling vehicle-registration form's explicit
  `Codul personal (I.D.N.P.)` label, but the field's structural position
  (a 13-cell box grid, directly following the applicant's identity-document
  details, immediately before `solicit:`) and cell count match exactly,
  and no alternative 13-digit Moldovan personal-identifier concept is
  otherwise documented. Disclosed as a judgment call rather than asserted
  with certainty.
- **`raionName` (`raionul`) modeled optional, not required.** Moldova's two
  municipii (Chișinău, Bălți) are not subdivided into raioane, so a
  resident of either could structurally leave this blank while still
  fully completing the domicile address (`domicileLocality` +
  `domicileStreet`, both required).
- **The civil-liability acknowledgment `Data ___ / Semnătura ___` pair
  (printed directly beneath the exam-admission checkbox and its own Art.
  1998 Civil Code declaration, which explicitly references damage to
  `vehiculelor de examinare`, examination vehicles) is modeled as
  `examLiabilityAcknowledgmentDate`, gated on `requestType ==
  exam-admission`.** The declaration's own subject matter (use of ASP's
  examination vehicles during a driving test) only functionally applies
  to that request type. This is distinct from the form's second,
  always-applicable `Data ___ / Semnătura ___` pair at the very end
  (following the tariff-payment and data-accuracy declarations), modeled
  as the always-required `applicationDate`. Disclosed as a judgment call
  — the form does not print an explicit "applicable only if..." qualifier
  tying the first `Data`/`Semnătura` pair to the exam-admission checkbox
  specifically, though its physical placement and subject matter both
  support this reading.
- **`examStage`, `examVehicleSubcategory`, `examAdmissionBasis` modeled as
  free text.** No fixed picklist is printed for the exam stage (`proba`),
  the vehicle sub/category, or the admission basis (which the source's
  own footnote describes as covering several distinct scenarios: a
  driving-school qualification, a foreign-license exchange, or restoration
  of a canceled/suspended permit).
- **`exchangeReason`/`restorationReason` modeled as free text**, each per
  the source's own footnote listing example reasons (`deteriorare, schimb
  de date, altele` for exchange; `pierdere, altele` for restoration) but
  printing no fixed picklist.
- **Wet-ink signatures excluded**, per this registry's standing
  convention on physical signatures — only their adjoining dates
  (`examLiabilityAcknowledgmentDate`, `applicationDate`) are modeled.
- **Closing `Cererea și actele au fost recepționate de: ___ (N.P. funcția
  și semnătura angajatului)` line excluded** — the receiving ASP
  employee's own name/position/signature, agency back-office data
  completed by ASP personnel during processing, not by the applicant.
  Consistent with the sibling vehicle-registration schema's excluded
  `EXPERT`/`VERIFICAREA DI` staff lines.
- **No `documents[]` entry.** Unlike the sibling vehicle-registration and
  Business Formation schemas, this form prints no "attached documents"
  list of any kind (no `La cerere se anexează` line or equivalent) — the
  full-page render was checked for this and none is present.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/pattern/date-format/enum rules directly from this schema's
own `fields[]`, discarded after use, not committed) ran the following
fixtures in
`conformance/md/asp/cerere-admitere-examen-preschimbare-restabilire-permis-conducere/1.0.0/`:

- `valid-exam-admission-chisinau.json` (requestType `exam-admission`,
  full exam-admission field set populated) — **0 errors**.
- `valid-license-exchange-balti.json` (requestType `license-exchange`,
  full exchange field set populated) — **0 errors**.
- `valid-license-restoration-orhei.json` (requestType
  `license-restoration`, full restoration field set populated) — **0
  errors**.
- `valid-provisional-license-cahul.json` (requestType
  `provisional-license`, no conditional fields required) — **0 errors**.
- `mutation-control-missing-required-field-applicant-full-name.json`
  (drops `applicantFullName`) — **exactly 1 error**.
- `mutation-control-missing-required-field-personal-id-number.json`
  (drops `personalIdNumber`) — **exactly 1 error**.
- `mutation-control-missing-conditional-field-exam-vehicle-subcategory.json`
  (requestType `exam-admission`, drops `examVehicleSubcategory`) —
  **exactly 1 error**.
- `mutation-control-missing-conditional-field-exchange-issuing-authority.json`
  (requestType `license-exchange`, drops `exchangeIssuingAuthority`) —
  **exactly 1 error**.
- `mutation-control-invalid-pattern-personal-id-number.json` (sets
  `personalIdNumber` to a 4-digit non-IDNP value) — **exactly 1 error**.
- `mutation-control-invalid-date-format-date-of-birth.json` (sets
  `dateOfBirth` to `05/12/1999`, not ISO `YYYY-MM-DD`) — **exactly 1
  error**.
- `mutation-control-invalid-enum-request-type.json` (sets `requestType`
  to `duplicate-license`, not one of the four enum values) — **exactly 1
  error**.

This schema has no `documents[]` entries, so no missing-required-document
fixture applies.

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **480/480** (up from 479/479).
- `node tools/verify-sources.mjs
  registry/md/asp/cerere-admitere-examen-preschimbare-restabilire-permis-conducere/1.0.0`
  clean, 0 warnings.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source form's own printed field labels are
fully transcribed from the genuine, currently-served official PDF via a
high-resolution raster render (no text layer existed to extract), but no
live filing through ASP's own e-services channel was attempted. GovSchema
is an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of the Republic of Moldova or
Agenția Servicii Publice.
