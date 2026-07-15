# Verification record — `do/camara-comercio-la-vega/registro-mercantil` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3167)

This candidate was pre-scouted during the GOV-3152 "GovSchema Standard
Research" cycle, which independently scouted and live-verified several of
the Dominican Republic's remaining verticals in parallel. GOV-3158 landed
`do/mirex/passport-application`, opening DR's Passport vertical and
disclosing four further candidates for DO's other still-open verticals
(DMV, Business Formation, Visa, National ID) as child issues. This ticket
(GOV-3167, delegated from GOV-3189's "GovSchema Standard Research" cycle)
picks up the Business Formation candidate: the Cámara de Comercio y
Producción de La Vega's standard commercial-registry ("registro mercantil")
request form, covering new registration, renewal, and adequacy filings for
S.R.L., S.A., S.A.S., S. EN N.C., and foreign-company ("Sociedad
Extranjera") entity types. DR already has DMV (`do/dgii/vehicle-transfer-...`),
Taxes (`do/dgii/annual-corporate-income-tax-return-ir-2`), and Passport
(`do/mirex/passport-application`) — this document opens Business Formation,
DR's 4th of 6 verticals.

## Sources examined

- **Document `(id, version)`:** `do/camara-comercio-la-vega/registro-mercantil` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Cámara de Comercio y Producción de La Vega Real, Inc. (CCPLV),
  a chamber-of-commerce mercantile registry (the Dominican Republic's
  mercantile-registry function is delegated to regional chambers of
  commerce, not a single national agency — La Vega is the chamber serving
  La Vega province).
- **Primary source:**
  `https://www.camaralavega.org.do/wp-content/uploads/2015/12/Formulario-S.R.L.-S.A.-S.E.-S.A.S.-S.-EN-N.C.pdf` —
  independently re-fetched fresh this cycle with a plain `curl`, no browser
  User-Agent or session needed: HTTP 200, `Content-Type` PDF, size
  780,693 bytes, sha256
  `0aa917a957691268ccc2b300c499ee9f0dce29c3b6c5c26140b1df4a2aa42889`,
  genuine `%PDF-1.5` magic bytes. No login/CAPTCHA/WAF gate encountered.

## Structure independently re-confirmed

`pdfjs-dist` 3.11.174 (installed standalone in a scratch directory, not
added as a repository dependency) confirms **3 pages** and a genuine
AcroForm: `getFieldObjects()` returns **196** named fields, matching the
prior scouting note's count exactly. This is a fillable AcroForm PDF (not
scanned/raster), so every field's real internal name was read directly from
the extracted field-object map, not inferred from a rendered image.

`page.getAnnotations()` returned **210** Widget annotations across the 3
pages — more than the 196 distinct field names — because several logical
radio-button/checkbox groups share one field name across multiple widgets
(VIP, Cancillería-deposit, and Comprobante-Fiscal each have 2 widgets;
`SolicitadoPor` has 3; `TipoSolicitud` has 5; `EstadoSociedad` has 4;
`DuracionSociedad` has 2; the Gerente/Representante-Autorizado capacity
selector has 2) — `(2-1)×6 + (3-1) + (5-1) + (4-1) = 14` extra widgets,
reconciling 210 annotations to 196 distinct field names exactly.

Field-name inspection shows two categories:

- **~145 semantically-named fields** (e.g. `RNCCédula`, `DENOMINACIÓN
  SOCIALRAZÓN SOCIAL`, `FECHA DE ACTO CONSTITUTIVO`, the four
  `MARCAR CON UNA X...` registration-type checkboxes) whose internal PDF
  field name is itself the printed label text (a common Adobe-Acrobat-form
  authoring artifact), giving an unambiguous 1:1 mapping to schema fields.
- **Generic-named fields** (`Text1`-`Text71`, `fill_2`/`fill_29`-`fill_50`)
  with no semantic internal name — mostly the blank per-row cells of the
  repeating shareholder/partner grid (`CANTIDAD TOTAL ACCIONISTAS/SOCIOS` —
  total shareholders/partners). These were resolved to their real table
  row/column by rendering all 3 pages through node-canvas at 2.5x scale
  (the same technique used in this registry's `do/mirex` and `il/mot`
  cycles) and cross-referencing each field's own annotation `rect`
  (x/y position), sorting top-to-bottom then left-to-right per page and
  matching against the rendered grid lines. This resolves to a bounded
  8-row repeating group, modeled as `shareholder1Name` through
  `shareholder8MaritalStatus` (8 × 6 = 48 fields, plus
  `totalShareholderCount` = 49 total) — consistent with this registry's
  established bounded-repeating-group convention (`entrantN`/`childN`
  pattern used elsewhere).

**195 of 196 raw AcroForm fields are modeled as `fields[]`.** The one
excluded field is `Firma` (page 3, the "AUTORIZACIÓN DEL SOLICITANTE"
wet-ink signature line) — a physical signature capture, not a data field an
agent would populate, consistent with this registry's established
staff/signature-block exclusion convention. No other office/staff-only
section exists in this form; every other field is applicant-facing.

**0 `documents[]` entries**: the form's own "tipo de registro" checkboxes
(`Registro de Documentos`, `Renovación con Registro de Documentos`, etc.)
are registration-type selectors, not a supporting-evidence checklist — no
itemized required-attachment list appears anywhere in the 3-page form
itself, so `documents[]` is genuinely empty for this source, not an
oversight.

## Scope decisions

- **`companyType` enum** (`sa`, `sas`, `srl`, `s_en_nc`, `se`) — taken
  directly from the form's own title/checkbox set (S.R.L./S.A./S.E./
  S.A.S./S. EN N.C.); `se` covers "Sociedad Extranjera" (foreign company).
- **`requestedByType` enum** (`oficina_de_abogados`, `sociedad`,
  `persona_fisica`) — the form's own "a nombre de quién se emitirá la
  factura" (invoice-recipient) framing distinguishes a law-office filer, a
  company filer, and a natural-person filer.
- **`declarantCapacity` enum** (`gerente`, `representante_autorizado`) —
  the form's own signature-block capacity selector.
- One `requiredWhen` conditional field (`companyDurationYears`, gated on
  `companyDurationType == "definida"`) — the form only asks for a specific
  duration in years when "definida" (fixed-term) is selected, not
  "indefinida."

## Validator results

- `node tools/validate.mjs`: **483/483** documents pass (482 baseline +
  this document), 3/3 `mapping.json` companions pass.
- `node tools/validate-ajv.mjs`: **483/483** documents validate against the
  GovSchema `0.3` meta-schema (ajv 2020-12), 3/3 `mapping.json` companions
  pass.
- 7 conformance fixtures committed under
  `conformance/do/camara-comercio-la-vega/registro-mercantil/1.0.0/`
  (2 valid, 5 mutation-control), matching this registry's established
  naming convention.

## Recovery note

The initial authoring pass for this document (schema.json + 7 conformance
fixtures) was produced by a background agent run that crashed
(infrastructure failure, not a content issue) before it could write this
VERIFICATION.md, run the validators, or commit. This document's own author
independently re-fetched the source PDF from scratch (fresh `curl` + sha256
+ `pdfjs-dist` field-count re-derivation, all recorded above) to confirm
the salvaged `schema.json`'s field count and content actually match the
live source before committing it, rather than trusting the uncommitted
work as-is.
