# Verification record — `mx/ine/credencial-para-votar-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3491**). Mexico's five
other verticals (Passport, DMV, Business Formation, Taxes, Visa) were already
published in this registry; National ID & Civic Documents was Mexico's sole
remaining open backlog vertical, per this catalog's own By-Jurisdiction table.

## Why this candidate

This cycle re-scanned the By-Jurisdiction table for single-vertical-gap
jurisdictions (a faster-converging heuristic than always deepening whichever
jurisdiction is currently hot) and scouted four candidates in parallel: AE
Passport (weak — a genuine ICP user-manual walkthrough exists but is
screen-level, not field-level, in its extractable text), LK Business
Formation (strong — delegated separately as backlog), GR National ID
(confirmed dead end — the application form is issued only in person at the
police station, behind a TAXISnet-gated appointment portal with no
downloadable specimen), and MX National ID (strong — authored this cycle).

Two Mexican National ID candidates were screened before settling on this one:

- **CURP correction** (`gob.mx/curp`) — confirmed a dead end. Correction is
  handled only via email (`tramitescurp@segob.gob.mx`) or an in-person
  RENAPO/Registro Civil module visit; no downloadable form with real fields
  exists.
- **CURP Biométrica / Tarjeta de Identidad** (the 2024-2025 rollout) —
  confirmed in-person/biometric-enrollment-only; no online form found.
- **INE Credencial para Votar application — authored this cycle.** The
  Credencial para Votar is Mexico's de facto national identity document
  (grounded in Article 143 of the Ley General de Instituciones y
  Procedimientos Electorales), making it the natural National ID & Civic
  Documents candidate even though it is issued by the electoral authority.

## Sources examined

### Primary source

- **Authority:** Instituto Nacional Electoral (INE) — official site
  `https://www.ine.mx`.
- **Document — "Solicitud de Expedición de Credencial para Votar"** (RFE
  reference `0301010100001`, printed as a barcode on the form itself).
  - **URL (directly retrieved, HTTP 200):**
    `https://ine.mx/wp-content/uploads/2025/03/Solicitud-de-Expedicion-de-Credencial.pdf`
  - **Access note:** no login, CAPTCHA, or WAF gate. Directly downloadable
    from INE's own WordPress media library.
  - **File identity:** `content-type: application/pdf`,
    `content-length: 483,640` bytes,
    `sha256:d000063beda08bda4074a252b83fe668bde5c949821b26e4791d938b16636b76`.
    Re-confirmed via a fresh `HEAD` request this cycle (HTTP/2 200,
    `last-modified: Mon, 10 Mar 2025`).
  - **Structure confirmed:** a single-page, flat/scanned-style PDF (no
    AcroForm/Widget annotations) via `pdfjs-dist`. A companion
    `Solicitud-de-Expedicion-de-la-Credencial-Extranjero.pdf` (176 KB, HTTP
    200) also exists for foreign nationals resident in Mexico's separate INE
    registration track — a natural companion-schema candidate for a future
    cycle, not modelled here.
  - **Extraction method:** `pdfjs-dist` text-content extraction with
    per-glyph x/y coordinates recovered every printed label and blank-field
    position. The page also carries dense ruled-box/checkbox-parenthesis
    artwork the text layer alone does not fully disambiguate (in particular,
    the boundary between applicant-facing sections and two
    administrative/verification blocks), so the page was additionally
    rendered to a raster image (`pdfjs-dist` + `node-canvas`, 3x scale,
    1839×2895px) and read as five height-banded crops spanning the full
    page — the same zoomed-image-transcription technique this registry used
    for `kz/kgd/individual-income-tax-declaration-schedule-220-01`
    (GOV-3484) — to confirm the exact section boundaries and grid layout.

## Scope and disclosed boundaries

This schema models the domestic INE Credencial para Votar application for
an adult citizen (18+, per Article 143 LGIPE's "full exercise of political
rights" requirement). Explicitly out of scope, and disclosed rather than
silently modelled:

- **The entire "Para Uso Exclusivo del RFE" box** (top of the form): Fecha
  de Trámite, No. de Solicitud Individual, Movimiento Solicitado (a set of
  numeric movement-type codes — 1, 2, 3, 4, 10, 11, 12 — whose specific
  meanings are not published anywhere on the form itself), Clave de
  Elector, Folio Nacional, and Nombre del Funcionario Electoral. This whole
  box is explicitly labelled staff/office-exclusive and is genuine
  office-internal processing data, not applicant input — the same
  treatment this registry gives office-internal control blocks elsewhere
  (e.g. `mx/sre/passport-application`'s own "Campos de control").
- **The "Medio de Identificación" verification grid** (Institución, Número
  de Acta o Folio, Libro/Tomo y Foja, Entidad Federativa, Municipio o
  Delegación, Funcionario Autoriza Ident., Fecha de Expedición) — this
  records which foundational identity document (typically the acta de
  nacimiento) the module verified in person, together with the authorizing
  official's own name and the credential's own issuance date. Unlike the
  applicant-facing blocks, this grid is positioned and captioned as the
  module's own verification record rather than applicant-declared data;
  modelled instead as a single `identityFoundationDocument` entry in
  `documents[]` with a `handling` note, not as individual fields.
- **"Documento de Identidad con Fotografía" and "Comprobante de
  Domicilio"** — each a simple checkbox-plus-write-in-line column recording
  which supporting document was presented; modelled as `documents[]`
  entries (`photoIdDocument`, `proofOfAddressDocument`) rather than
  fields, consistent with this registry's treatment of presented-document
  metadata elsewhere (e.g. `mx/sre/passport-application`'s own
  `proofOfIdentity`).
- **Wet-ink signature and right/left thumbprint capture** — physical
  actions performed at the module, out of scope per this registry's
  standard treatment of biometric capture (e.g.
  `mx/sre/passport-application`).
- **The petition paragraph's own inline "sección ____ solicitado el ____"
  blanks** — a restatement of the already-captured `electoralSection` value
  and the `declarationDate` recorded under "Protesto lo Necesario", not
  independently modelled as separate fields to avoid asserting duplicate
  data the source itself does not distinguish.
- **`birthEntityCode` ("Clave"), `electoralDistrict`, `electoralSection`,
  and `electoralBlock`** are modelled as unconstrained free strings rather
  than fixed-digit-count patterns: the form's own blanks carry no
  digit/letter-count marker or legend confirming an exact format (unlike,
  e.g., the CURP or postal-code formats, which are independently
  well-documented national conventions and are pattern-validated).
- **The "Extranjero" (foreign-national) companion form** — a distinct PDF
  at the same media-library path, disclosed above as a future
  companion-schema candidate, not modelled in this v1.0.0.
- **The naturalization-certificate sub-block** (`naturalizationCertificateNumber`/
  `naturalizationCertificateDate`) is modelled as optional with no
  `requiredWhen` gate, since the form provides no separate
  naturalization-status boolean field to gate on.

## Conformance fixtures

10 fixtures are committed under
`conformance/mx/ine/credencial-para-votar-application/1.0.0/`: 2 valid
submissions (0 errors each — one minimal, required-fields-only submission
for a birthright citizen; one fuller submission for a naturalized citizen
with every optional field populated) and 8 mutation-control fixtures (each
expected to raise exactly 1 error): a missing required `lastNamePaternal`,
an invalid `curp` pattern, an invalid `addressPostalCode` pattern, an
invalid `sex` enum value, an `age` below the 18-year minimum, an `age` of
the wrong type (string instead of number), a missing required
`addressStreet`, a missing required `electoralSection`, and an unknown
field (`movimientoSolicitado`, the staff-only movement code) rejected.
All 10 were checked with a from-scratch, throwaway Node mock validator
implementing this schema's own `required`/`requiredWhen`/`validation`
rules (not committed, per this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 530/530
across the full registry with this schema added.

## Known gaps

- **The "Extranjero" companion form** for foreign nationals resident in
  Mexico is a disclosed, ready-to-scope backlog candidate for a future
  minor-version cycle.
- **The "Medio de Identificación" verification sub-fields** (birth
  certificate institución/número de acta/libro-tomo-foja/entidad
  federativa/municipio) are disclosed as office-verification metadata, not
  modelled — a possible future extension if a stronger case emerges that
  applicants themselves (not just staff) supply this data.
- Mexico now stands at 6 of 6 verticals (Passport, DMV, Business Formation,
  Taxes, Visa, National ID & Civic Documents) — no vertical remains open
  for Mexico.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(both its native PDF text layer and a rendered raster image) and
transcribed its fields. No automated re-verification tooling exists yet for
this schema; `nextReviewBy` is set 6 months out per the practice's default
cadence.
