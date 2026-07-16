# Verification record — `ec/sri/inscripcion-ruc-persona-natural` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3328**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Ecuador opened as this registry's 65th jurisdiction only three cycles ago
(GOV-3305), with a single vertical modelled — Visa, via
`ec/cancilleria/formulario-solicitud-visa`. That schema's own VERIFICATION.md
recorded SRI's web server (`www.sri.gob.ec`) as unreachable at the time
("connection timeout, curl exit 28"), leaving it un-pursued as a candidate
for Ecuador's Business Formation vertical. This cycle re-checked SRI first
rather than opening a 66th brand-new jurisdiction, since Ecuador, Ethiopia,
and Georgia (the registry's three newest jurisdictions, each opened in the
immediately preceding cycles) each still have 5 of their 6 verticals open —
building out an already-open jurisdiction's next vertical is preferred over
adding jurisdiction #66 when a live, well-sourced candidate is available.

SRI's server responded normally this cycle (HTTP 200 on every fetch, with a
realistic desktop `User-Agent` header set) to both of the documents this
schema is built from. Other Ecuadorian candidates screened this cycle and
found weaker:

- **Registro Civil passport renewal/first-issue**: requires an
  already-created `Agencia Virtual` account (login-gated), with no
  downloadable field-by-field form found describing the online wizard's own
  structure.
- **Registro Civil "Duplicado de cédula Express"** (`apps.registrocivil.gob.ec/portalCiudadano/cedulaexpress/`):
  a genuine live, unauthenticated JSF/PrimeFaces application — confirmed
  live via direct `curl` and a real Playwright/Chromium session (screenshot
  captured) — but its entire visible field surface is a 3-field search step
  (10-digit cédula/NUI number, date of birth, and an image CAPTCHA); the
  actual duplicate-request/payment step that would follow a successful
  search is rendered server-side only after that CAPTCHA is solved against
  a real citizen's own registered data, which this cycle could not do
  without impersonating a real person. Left as a disclosed, thin, gated
  candidate — see "Known gaps" below — rather than authored as a 3-field
  schema.
- **ANT (Agencia Nacional de Tránsito) vehicle-registration forms**: the
  live `ant.gob.ec/index.php/formularios` page itself did not respond to a
  direct connection attempt this cycle; a Wayback Machine snapshot (dated
  2020-09-20, the most recent full crawl found) resolves instead, but its
  form inventory is almost entirely heavy-transport/commercial-fleet
  paperwork (refund requests, transport-permit renewals, web-service access
  forms for professional transport operators) with no core "vehicle
  registration/matriculación" application form among the indexed links —
  weaker than the RUC candidate below.

**SRI's RUC (Registro Único de Contribuyentes) registration for natural
persons** was the strongest candidate found: a genuine official request-form
template (`Formato solicitudes RUC inscripcion- persona natural.docx`) hosted
directly on `www.sri.gob.ec`, corroborated by SRI's own official
screenshot-driven step-by-step guide (`GUIA RUC EN LINEA.pdf`) for the fully
online channel. This document authors that candidate, opening Ecuador's
Business Formation vertical (2 of 6).

## Sources examined

### Primary source

- **Authority:** Servicio de Rentas Internas (SRI)
- **Document:** Solicitud de Inscripción del RUC (persona natural) —
  "Formato solicitudes RUC inscripcion- persona natural.docx"
- **URL (directly retrieved, HTTP 200,
  `application/vnd.openxmlformats-officedocument.wordprocessingml.document`):**
  `https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/057da380-7223-4000-9e43-fd44c2550cd6/Formato%20solicitudes%20RUC%20inscripcion-%20persona%20natural.docx`
- **File identity:** `sha256:1dacd4966d4a82648744b1500ba967e86c53f2d470dea37c7c9d425be660cca`,
  41,387 bytes.
- **Extraction method:** the `.docx` container is a ZIP archive; `word/document.xml`
  was read directly with Python's `zipfile` module and its `<w:tbl>` elements
  walked cell-by-cell via regex over the raw WordprocessingML (no
  docx-to-plain-text conversion, which would have lost the table's row/column
  structure). This confirmed 3 tables:
  1. **"Actividad Solicitada"** — 4 rows: a header row ("Código CIIU" /
     "Descripción" / "Señale una de las actividades como principal") and 3
     identically-structured data rows, each an empty Código-CIIU cell paired
     with an empty Descripción cell.
  2. **Address block** — 14 rows: a two-column header ("DIRECCIÓN DEL
     DOMICILIO" / "DIRECCIÓN DEL ESTABLECIMIENTO MATRIZ") followed by 13
     rows, each a label/blank pair repeated for both address columns:
     `*Provincia:`, `*Cantón:`, `*Parroquia:`, `*Calle principal:`,
     `*Número:`, `*Intersección:`, `Edificio:`, `Piso:`, `Oficina o local:`,
     `*Referencia de Ubicación:`, `Teléfono convencional:`, `*Celular:`,
     `*Correo electrónico:` — 9 of the 13 carry the template's own leading
     asterisk, 4 do not.
  3. **Estimated annual income** — a single-cell question, "¿Cuál es el
     ingreso bruto anual que estima recibir por la actividad que realiza?
     $ ___".
  The document's preamble (outside any table) reads: "Yo, ___, identificado
  con cédula/pasaporte No. ___, solicito la inscripción en el Registro Único
  de Contribuyentes (RUC), para el desarrollo de la(s) siguiente(s)
  actividad(es) económica(s):", followed by the closing declaration: "Declaro
  que todos los documentos presentados ante el Servicio de Rentas Internas
  son auténticos y verdaderos, y me hago responsable de los mismos dentro de
  los controles posteriores que la Administración Tributaria pueda realizar."
  and a note that a supporting document ("Documento que respalda la
  inscripción solicitada, de acuerdo a los requisitos publicados...") must be
  attached in PDF format.
- **Provenance corroboration:** `docProps/core.xml` records the document's
  author as an identified SRI staff member and a creation timestamp of
  2022-08-17T17:45:00Z; `word/header1.xml` prints "Solicitudes del RUC" as
  the running page header — both consistent with a genuine internal SRI
  template rather than a third-party facsimile.

### Corroborating source

- **Document:** "GUIA Inscripción de RUC — Guía para contribuyentes,
  Inscripción de RUC en Línea" (14 pages)
- **URL (directly retrieved, HTTP 200, `application/pdf`):**
  `https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/399ecb4a-1b47-4f68-99f8-57c96fc67dc5/GUIA%20RUC%20EN%20LINEA.pdf`
- **File identity:** `sha256:a94f767fb26d1f79862e8049678b704711ddc6f2373ff78286a6e91cc199757f`,
  1,044,290 bytes.
- **Extraction method:** `pdfjs-dist` (legacy build), `getTextContent()` per
  page.
- **What it corroborates:** the same field set (contact details, address
  including a "CUEN" electrical-supply-code lookup aid, economic activities
  via CIIU codes, estimated annual income) appears in this screenshot-driven
  walkthrough of the fully online `SRI en Línea` self-service channel, which
  requires an already-issued online-access password (`clave de acceso a SRI
  en Línea`) to reach — this schema does not model that login-gated wizard
  directly, only the requirement structure it documents in common with the
  primary `.docx` template. It also states (p.8) that the annual-income field
  "debe ser llenado de manera obligatoria" (must be filled in as mandatory)
  for every applicant, used to justify `required: true` on
  `ingresoBrutoAnualEstimado` despite the primary template printing no
  asterisk there; and (p.9) a hard cap of "mínimo 1 y máximo 20 actividades
  económicas por cada establecimiento" for the online channel specifically —
  disclosed as an online-only detail this schema's 3-slot economic-activity
  group (matching the primary template's own 3 printed rows) does not
  reflect.
- Two SRI-published trámite-guide pages on the government's own `gob.ec`
  portal were also fetched and read in full this cycle:
  `gob.ec/sri/tramites/inscripcion-registro-unico-contribuyente-ruc-persona-natural`
  and its `-documento-habilitante` sibling (for applicants in specific
  regulated professions/segments — accountants, notaries, artisans,
  transportistas, etc., a narrower sub-case not modelled separately here).
  Both list the same required-document categories the primary template's own
  closing note describes (a supporting document per the requisitos
  ficha), corroborating rather than contradicting the primary source.

### External reference table

- **CIIU (Clasificación Industrial Internacional Uniforme) code format:**
  confirmed via INEC's own live Sistema Integrado de Consultas de
  Clasificaciones y Nomenclaturas (`aplicaciones2.ecuadorencifras.gob.ec/SIN/`),
  which resolves real codes in the shape `[A-U][0-9]{4}` with an optional
  `.NN` decimal sub-code (e.g. `G4711`, `G4711.01`, `G4711.02` all resolve as
  genuine codes). Modelled as a `pattern`-validated free-text field per this
  registry's established convention for large external code tables (the
  full CIIU nomenclature runs to several hundred codes across all sectors),
  the same approach `pe/sunat/solicitud-inscripcion-ruc-persona-natural`
  already uses for its own CIIU fields.

## Known gaps / disclosed scope boundaries

- **Online-wizard-only conditional logic** (RIMPE regime classification
  derived from declared income, professional-title/artisan-qualification
  selection changing available CIIU activities, conditional VAT-withholding
  question) is documented in GUIA RUC EN LINEA.pdf but not modelled here —
  it belongs to the login-gated `SRI en Línea` wizard, not the printed
  request template this schema is built from. A future companion/minor-
  version cycle that can walk that wizard live (with a real or
  test-provisioned SRI online-access credential) could extend this schema.
- **Economic-activity cap**: modelled at 3 slots (matching the primary
  template's own 3 printed rows), not the online channel's stated 20-per-
  establishment maximum — disclosed above, consistent with this registry's
  established bounded-repeating-group convention.
- **Ecuador's "Duplicado de cédula Express" National ID candidate**
  (`apps.registrocivil.gob.ec/portalCiudadano/cedulaexpress/`) remains a
  disclosed, open, thin lead for a future cycle: live, unauthenticated,
  confirmed via both direct `curl` and a real Playwright/Chromium session,
  but gated after its 3-field search step (cédula number, date of birth,
  CAPTCHA) by a server-rendered next step this cycle could not reach without
  a real citizen's own registered identity to search against.
- Ecuador's remaining verticals — Passport, DMV, Taxes, and National ID —
  are still open backlog candidates after this cycle.

## Conformance fixtures

8 fixtures are committed under
`conformance/ec/sri/inscripcion-ruc-persona-natural/1.0.0/`: 2 valid
submissions (0 errors each — one single-activity applicant, one
multi-activity applicant with a marked principal activity) and 6
mutation-control fixtures (each expected to raise exactly 1 error): a missing
required address field (`domicilioProvincia`), a missing required contact
field (`domicilioCorreoElectronico`), an invalid email format, a missing
required `applicantFullName`, an invalid CIIU-code pattern, and an
`exclusivityGroups` violation (two economic activities both marked
principal). All 8 were checked with a from-scratch, throwaway Node mock
validator implementing this schema's own `required`/`validation`/
`exclusivityGroups` rules (not committed — consistent with this registry's
established per-cycle practice of writing an independent validator rather
than reusing the authoring script). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 507/507 across the full registry with this
schema added.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
