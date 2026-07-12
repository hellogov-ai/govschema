# Verification record — `pe/mtc/solicitud-licencia-conducir-012-17` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2434**), tasked
specifically with opening Peru's DMV vertical via MTC's driver's-licence
application, a candidate three prior cycles (GOV-2404, GOV-2419, GOV-2426) had
named but never actually fetched, fetched-and-hashed, or field-extracted.

## Why this candidate

CATALOG.md's own "Known Gaps & Opportunities" section (items 11-13) named
"MTC's driver's-licence application" as Peru's strongest pre-scouted DMV
candidate — "a genuine unauthenticated static text-layer PDF, no real AcroForm
widgets" — but disclosed this characterization had never actually been
verified by fetching the document. This cycle did that verification and found
the candidate is real, but more layered than the one-line prior note
suggested.

Peru's driver's licences are issued by MTC's own Dirección de Circulación
Vial (DCV), not delegated to a regional government as initially hypothesized
in this issue's brief — accredited driving schools ("Escuelas de
Conductores") and health establishments issue supporting certificates that
feed into MTC's Sistema Nacional de Conductores, but the licence-issuance
request itself is filed directly with MTC-DCV using a single "menu" cover
form, **Formulario 012/17.03, "Solicitud - Licencias de Conducir,"** that
covers ~20 different DCV procedure codes (first issuance, renewal, category
upgrade, exchange from military/diplomatic/refugee status, duplicate,
information correction, hazardous-materials endorsement) via one shared
applicant-data section and a large procedure-selection checkbox matrix.

## Sources examined

### Source 1 (primary `source`, current form revision)

- **Authority:** Ministerio de Transportes y Comunicaciones (MTC), Dirección
  General de Autorizaciones en Transportes / Dirección de Circulación Vial
  (DCV)
- **Document:** Formulario 012/17.03, "Solicitud - Licencias de Conducir"
- **Canonical URL:** <https://portal.mtc.gob.pe/servicios_tramite/plataforma/documentos/Formulario2022/DCV/PDF_F_012-17.03.pdf>
- **Access note:** `portal.mtc.gob.pe` resolves to `200.62.243.23`, but every
  direct TCP connection attempt from this environment to that host times out
  (`curl -m 90` → exit 28, and a bare `curl -sv https://portal.mtc.gob.pe/`
  also times out at the TCP handshake) — a network/infrastructure limitation
  of this sandbox, not a login gate, CAPTCHA, or WAF challenge (no HTTP
  response is ever received to classify). `WebFetch` to the same host also
  failed (`ECONNREFUSED`). The document was instead retrieved via the
  Internet Archive's Wayback Machine, whose CDX index shows **eight crawls
  of this exact URL between 2022-06-30 and 2025-06-28, all sharing the
  identical SHA-1 content digest** `UE6SELZNJWXPDVKQS2SVPY6UKLGOUOWV` — i.e.
  the file has been byte-for-byte unchanged for at least three years of
  monitoring. The most recent capture (`20250628213228`) was fetched via
  `web.archive.org/web/20250628213228id_/...` (the `id_` flag serves the
  archived bytes with no Wayback UI injection) and its own SHA-1
  (recomputed locally, base32-encoded: `UE6SELZNJWXPDVKQS2SVPY6UKLGOUOWV`)
  matches the CDX digest exactly, confirming an unmodified copy.
- **File identity:** `sha256:df5d8bab897bb69d795eae71cd5fcbe2ec7f4b85589bb300a7978878db63d92d`,
  243,172 bytes, PDF 1.7, `Producer: Foxit GSDK - Foxit Software Inc.`,
  `ModDate: 2022-03-31`. `IsAcroFormPresent: false`, 0 AcroForm widgets on
  either of its 2 pages (`pdfjs-dist` `page.getAnnotations()`).
- **Currency corroboration:** an independent, more recent Wayback capture
  (2026-01-16) of MTC's own TUPA (Texto Único de Procedimientos
  Administrativos) entry for procedure DCV-037 explicitly cites
  **"Formulario PDF: 012/17.03"** by name as the current form for that
  procedure — see Source 3 below.
- **Extraction method:** `pdfjs-dist` (legacy build, v3.11.174)
  `page.getTextContent()`, position-sorted by `transform` y/x to resolve the
  form's multi-column checkbox grid, cross-checked coordinate-by-coordinate
  to reconstruct the procedure/category checkbox matrix (see judgment calls
  below).
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (superseded prior revision, examined for comparison)

- **URL:** <https://cdn.www.gob.pe/uploads/document/file/2349282/Formulario%20de%20solicitud%20de%20licencia%20de%20conducir.pdf.pdf>
  (linked from a `gob.pe` institutional page,
  `gob.pe/institucion/mtc/informes-publicaciones/2297488-formulario-de-solicitud-de-licencia-de-conducir`)
- **File identity:** `sha256:21e995893c88d8b8ee3971a151b3fad7df9b347eca7225708256749a37aa8906`,
  247,073 bytes, `Creator/Producer: Microsoft Excel 2016`,
  `CreationDate: 2021-01-27`. 0 AcroForm widgets.
- **Why not used as primary:** this is the **unversioned** "Formulario
  012/17" (no ".03" suffix) — it is missing the entire "II. NOTIFICACIÓN"
  section that 012/17.03 adds (a 2019-era legal requirement, Art. 9-A of Ley
  Nº 27181, that applicants register a Sistema de Casillas Electrónicas
  mailbox before MTC can notify them of the procedure's outcome), and its
  section numbering (I/II/III/IV/V) is one behind 012/17.03's (I/II/III/IV/
  V/VI/VII) as a direct consequence. This is the same superseded-circular
  pattern this registry caught in `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc`
  (GOV-2404): a `gob.pe` institutional-page mirror serving an older revision
  than the issuing ministry's own current version, despite a more recent
  HTTP `Last-Modified` header (2025-11-27) on the `gob.pe` copy — that header
  reflects a re-upload/re-cache event, not a content update (confirmed via
  `pdfjs-dist` text-content comparison: no textual difference from the 2021
  Excel-authored original beyond the missing section). A second `gob.pe`
  mirror at the same institutional-listing tier (upload 1759990, linked from
  a differently-numbered page titled "Formulario 006/17 Solicitud de
  Licencia de Conducir" but whose PDF is actually named "FORMULARIO 012-17
  LICENCIAS.pdf") was also examined — it is a `Microsoft: Print To PDF`
  scanned/rasterized capture with **zero extractable text** (`pdfjs-dist`
  returns 0 text items on both pages), confirming it as a strictly weaker,
  non-machine-readable artifact regardless of currency.

### Source 3 (TUPA entry, procedure and currency corroboration)

- **URL:** <https://portal.mtc.gob.pe/servicios_tramite/plataforma/documentos/2022/DCV/DCV-037.pdf>
  (also unreachable directly from this sandbox; retrieved via Wayback
  Machine capture `20260116100531`, `sha256:08aba4afb8694315882f2ef2700109024fa96deca355bfb6f08ae79b63d4de12`,
  561,079 bytes)
- **Content:** MTC's own Texto Único de Procedimientos Administrativos entry
  for **DCV-037, "Expedición de licencia de conducir clase A, categoría I"**
  (code `PA1330693F`). Confirms: the form used is "Formulario PDF: 012/17.03"
  (matching Source 1 exactly); the requisitos are a sworn declaration plus
  an approved, Sistema Nacional de Conductores-registered health
  certificate, knowledge exam, and driving-skills exam, plus processing-fee
  payment (S/ 14.70 in-person, S/ 6.70 electronic) — directly corroborating
  this schema's Rubro IV (Entidades Complementarias) and Rubro V (Pago) field
  groups; the legal basis, Decreto Supremo N° 007-2016-MTC ("Reglamento
  Nacional del Sistema de Emisión de Licencias de Conducir"), matches the
  citation already present in the form's own Rubro VI declaración jurada
  text.
- **Retrieved / reviewed:** 2026-07-12

## Field inventory (Phase 3)

All Rubro references below follow 012/17.03's own "Instrucciones Específicas"
numbering (page 2), which runs one Rubro ahead of the older, superseded
012/17 revision because of the inserted Rubro II (Notificación).

| Field (schema `name`) | Label (source) | Rubro / Casilla | Example valid value |
|---|---|---|---|
| `apellidosNombres` | Apellidos y Nombres | Rubro I | `"Ramirez Torres Luis"` |
| `tipoDocumentoIdentidad` | Documento de Identidad (tipo) | Rubro I | `"DNI"` |
| `numeroDocumentoIdentidad` | Documento de Identidad (número) | Rubro I | `"45678912"` |
| `direccion` | Dirección | Rubro I | `"Av. Larco 345"` |
| `distrito` | Distrito | Rubro I | `"Miraflores"` |
| `provincia` | Provincia | Rubro I | `"Lima"` |
| `region` | Región | Rubro I | `"Lima"` |
| `telefono` | Teléfono Fijo / Celular | Rubro I | `"+51 987654321"` |
| `correoElectronico` | Correo Electrónico | Rubro I | `"luis.ramirez@example.com"` |
| `formatoLicencia` | Licencia de Conducir de Clase A | Rubro I | `"ELECTRONICA_Y_FISICA"` |
| `tipoTramite` | Procedimiento a Solicitar | Rubro III | `"EXPEDICION_A_I"` |
| `categoriaLicencia` | Categoría | Rubro III | `"IIIA"` |
| `establecimientoSaludNombre` | Establecimiento de Salud — Nombre/Razón social | Rubro IV | `"Centro Médico Vial San Isidro"` |
| `establecimientoSaludCertificado` | Establecimiento de Salud — N° de certificado | Rubro IV | `"CS-2026-004521"` |
| `establecimientoSaludFechaEmision` | Establecimiento de Salud — Fecha de emisión | Rubro IV | `"2026-05-10"` |
| `escuelaConductoresNombre` | Escuela de Conductores — Nombre/Razón social | Rubro IV | `"Escuela de Conductores Integrales del Perú"` |
| `escuelaConductoresCertificado` | Escuela de Conductores — N° de certificado | Rubro IV | `"EC-2026-011893"` |
| `escuelaConductoresFechaEmision` | Escuela de Conductores — Fecha de emisión | Rubro IV | `"2026-06-01"` |
| `evaluacionConocimientosEntidad` | Evaluación de Conocimientos — Nombre/Razón social | Rubro IV | `"Dirección de Circulación Vial - MTC"` |
| `evaluacionConocimientosNota` | Evaluación de Conocimientos — Nota aprobatoria | Rubro IV | `"38/40"` |
| `evaluacionConocimientosFecha` | Evaluación de Conocimientos — Fecha de evaluación | Rubro IV | `"2026-06-15"` |
| `evaluacionHabilidadesEntidad` | Evaluación de Habilidades — Nombre/Razón social | Rubro IV | `"Dirección de Circulación Vial - MTC"` |
| `evaluacionHabilidadesNota` | Evaluación de Habilidades — Nota aprobatoria | Rubro IV | `"APROBADO"` |
| `evaluacionHabilidadesFecha` | Evaluación de Habilidades — Fecha de evaluación | Rubro IV | `"2026-06-20"` |
| `pagoNombreEntidad` | Nombre de la Entidad | Rubro V | `"Banco de la Nación"` |
| `pagoNumeroRecibo` | N° de Recibo | Rubro V | `"00-2026-778341"` |
| `pagoFechaPago` | Fecha de Pago | Rubro V | `"2026-06-22"` |

**27 fields total.** No `documents[]` entries are modelled: the printed form's
own general instructions only say attached documents "must be current"
(instruction 3) without enumerating a specific attachment list on this cover
form itself — the specific requisitos/attachments for each of the ~20 DCV
procedure codes are published as separate, per-procedure TUPA sheets
(`DCV-037.pdf`, `DCV-038.pdf`, etc., also hosted on the unreachable
`portal.mtc.gob.pe`), which are out of scope for this document, matching how
`pe/sunat/solicitud-inscripcion-ruc-persona-natural` defers its own companion
forms.

## Access notes and judgment calls

1. **Scoped to nine of the source's ~20 procedure codes.** Rubro III's own
   checkbox matrix spans EXPEDICIÓN, REVALIDACIÓN, RECATEGORIZACIÓN (five
   target-category variants), CANJE — MILITAR O POLICIAL, OBTENCIÓN/CANJE
   DIPLOMÁTICO, OBTENCIÓN/CANJE/REVALIDACIÓN — REFUGIADO O ASILADO, CANJE —
   OTORGADA EN OTRO PAÍS, AUTORIZACIÓN ESPECIAL/REVALIDACIÓN AUTORIZACIÓN
   MATPEL, DUPLICADO, and CANJE — MODIFICACIÓN DE LA INFORMACIÓN. This
   schema's `tipoTramite` enum covers only the nine codes relevant to an
   individual citizen obtaining, renewing, upgrading, or replacing their own
   Clase A licence (DCV-037 through DCV-044, plus S-DCV-001); the military/
   police, diplomatic, refugee/asylum, foreign-licence-exchange, MATPEL
   hazardous-materials-endorsement, and information-correction codes are
   disclosed as out of scope, following this registry's established
   convention of scoping a schema to its primary applicant path and
   disclosing the rest (e.g. `pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s
   own natural-person-vs-legal-entity scoping).
2. **`categoriaLicencia` is `requiredWhen` only for `REVALIDACION_II_III` and
   `DUPLICADO`.** Coordinate-by-coordinate reconstruction of the printed
   checkbox matrix (see coordinates recorded during this cycle's own
   extraction) shows only these two procedure columns carry their own
   category checkbox row (I/IIa/IIb/IIIa/IIIb/IIIc). Every other in-scope
   procedure fixes its target category by definition — `EXPEDICION_A_I` and
   `REVALIDACION_A_I` are both printed as "AI" only, and each
   `RECATEGORIZACION_A_*` code names a single specific target category in
   its own column header (e.g. "RECATEGORIZACIÓN AIIa (DCV 039)"). Modelling
   `categoriaLicencia` as unconditionally required would incorrectly force a
   value where the procedure choice already determines it.
3. **`tipoDocumentoIdentidad`'s printed checkbox row renders one label as
   "CI"**, not "TI", in this cycle's `pdfjs-dist` text extraction (verified
   on both the 012/17.03 and the superseded 012/17 copies — same anomaly in
   both). The form's own companion "Instrucciones Específicas" (Rubro I)
   defines only five acronyms — DNI, TI, PTP, CE, CSR — and does not define
   "CI" anywhere. This schema follows the instructions document's canonical
   definition list rather than the header row's raw extraction, treating the
   "CI" rendering as a font-substitution/glyph-mapping artifact of the
   source PDF (a similar class of extraction anomaly to the
   Sexo/Nacionalidad/Domiciliado column-ordering ambiguity disclosed in
   `pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s own VERIFICATION.md).
4. **Entidades Complementarias (Rubro IV) and Pago (Rubro V) fields are
   modelled as unconditionally optional**, even though MTC's own TUPA entry
   for DCV-037 (Source 3) lists an approved health certificate, knowledge
   exam, driving-skills exam, and fee payment as numbered requisitos for
   that specific procedure. This is a deliberate, disclosed judgment call:
   the printed form's own Rubro IV instruction reads "de ser el caso" (as
   applicable) rather than marking these fields obligatory, and requisitos
   genuinely vary by which of the nine in-scope `tipoTramite` codes is
   selected (e.g. `DUPLICADO` does not require a fresh health/knowledge/
   skills evaluation, since it reissues an already-valid licence) — encoding
   per-procedure requisito logic as schema-level `requiredWhen` rules would
   require reconstructing all nine procedures' individual TUPA entries, most
   of which are hosted on the same unreachable `portal.mtc.gob.pe` host as
   Source 1, and was judged out of scope for this initial version.
5. **Rubro II (Notificación) is not modelled as a field.** It is purely a
   prerequisite notice — informing the applicant that outcome notification
   happens via the mandatory Sistema de Casillas Electrónicas (Art. 9-A, Ley
   Nº 27181) and providing the registration link (`casilla.mtc.gob.pe`) if
   the applicant is not yet enrolled — with no corresponding blank or
   checkbox on the printed form itself.
6. **The "Uso de Mesa de Partes" header box** (N° de solicitud, Fecha de
   Registro, N° de Licencia de Conducir being assigned, Centro de Emisión)
   **and the page-1 footer block** (N° de Solicitud, N° de Documento de
   Identidad, Fecha de Registro, a second "Firma del Postulante" line, and
   "Link de descarga de la Licencia Electrónica") are both office-assigned/
   post-submission artifacts — a registry-tracking stub and an
   applicant-facing receipt stub respectively — neither is applicant input,
   matching this registry's established convention of excluding office-use
   control-number boxes (cf. `pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s
   own exclusion of its UBIGEO/USO SUNAT boxes).
7. **Rubro VI (Declaración Jurada) and Rubro VII** (printed on the form
   itself as a second "VII. DECLARACIÓN JURADA" heading, but named "RUBRO
   VII: REFRENDO DEL SOLICITANTE" in the instructions document — a labelling
   inconsistency in the source itself, not an extraction error, disclosed
   here rather than silently resolved) **capture only the applicant's
   (or their legal representative's) signature and fingerprint**, not new
   data fields — `apellidosNombres` under Rubro I already captures the name
   being attested, consistent with this registry's convention of not
   modelling physical signature/fingerprint marks as schema fields.

## Test run (Phase 4)

No live submission was attempted: driver's-licence procedures at MTC-DCV are
processed in person or through the login-gated `licencias.mtc.gob.pe`
Sistema Nacional de Conductores portal, with no unauthenticated endpoint to
submit fabricated data against.

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`_tmp_validate_instance.mjs`, not committed — mirrors the approach used by
`pe/sunat/solicitud-inscripcion-ruc-persona-natural` and
`pe/cancilleria/solicitud-visa-dgc-005`): compiles `schema.json`'s `fields[]`
into a JSON Schema draft 2020-12 document checked with `ajv` (`ajv/dist/2020.js`,
matching `tools/validate-ajv.mjs`'s own draft selection), plus a from-scratch
evaluator for the shared Condition grammar that checks `fields[].requiredWhen`
(this document has no `documents[]`, so that check is not applicable here):

```
$ node tools/_tmp_validate_instance.mjs registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json \
    conformance/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/expedicion-clase-a-categoria-i-primera-vez.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS

$ node tools/_tmp_validate_instance.mjs registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json \
    conformance/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/duplicado-categoria-iiia-por-robo.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'apellidosNombres' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'apellidosNombres'
requiredWhen conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-email-pattern-violation.json: 'correoElectronico' set to 'not-an-email'
Static (required/type/pattern/enum) validation: FAIL
 - /correoElectronico must match pattern "^[^@\s]+@[^@\s]+\.[^@\s]+$"
requiredWhen conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-categoria-field.json: 'tipoTramite' is 'DUPLICADO'
$ # but 'categoriaLicencia' (requiredWhen tipoTramite in [REVALIDACION_II_III, DUPLICADO]) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: FAIL
 - field 'categoriaLicencia' is required (requiredWhen matched) but not provided
OVERALL: FAIL
```

The third case specifically exercises `fields[].requiredWhen` (as opposed to
the plain static-`required` case in `mutation-control-missing-required-field.json`)
— a validator that only checks static `required: true` fields and ignores
conditional `requiredWhen` rules would incorrectly accept this fixture, which
is exactly the gap this fixture exists to catch.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json
ok   registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json
ok   registry/pe/mtc/solicitud-licencia-conducir-012-17/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean (369/369, up from
368 before this document), and `tools/govschema-client/registry-index.json`
was regenerated via `npm run build-index` (in `tools/govschema-client/`,
after `npm ci --include=dev` since a plain `npm ci` under a local
`NODE_ENV=production` skips `ajv`'s devDependency install) to include this
document's entry (also verified against `tools/`'s own `npm ci --include=dev`
for `validate-ajv.mjs`'s `ajv`/`ajv-formats` devDependencies).

## Peru's other three verticals (screened in prior cycles, not re-screened this cycle)

Per the GOV-2404, GOV-2419, and GOV-2426 cycles' own records: Taxes (SUNAT)
is Clave-SOL-login-gated; Passport (Migraciones) and National ID (RENIEC DNI)
remain appointment/biometric-gated. Peru now stands at **3 of 6 verticals**
(Visa, Business Formation, DMV); Taxes, Passport, and National ID remain open
backlog candidates for a future cycle — none was re-screened this cycle, so
no claim is made about whether their prior characterization still holds.
