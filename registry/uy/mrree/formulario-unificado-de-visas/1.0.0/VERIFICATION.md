# Verification record — `uy/mrree/formulario-unificado-de-visas` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2472**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Uruguay stood at 2 of 6 verticals (Business Formation, DMV) entering this
cycle, with Taxes, Visa, Passport, and National ID all open. A parallel
scouting pass across all four open verticals found:

- **Taxes** (DGI): the actual annual return (Formulario 1102) is filed via a
  desktop program or the `servicios.dgi.gub.uy` portal, both requiring
  `gub.uy`/digital-ID authentication; the one downloadable PDF found
  (Formulario 3100, dependents declaration) has **0 AcroForm widgets** — a
  flat print-and-hand-fill table submitted to an employer, not DGI. Dead end.
- **Passport** and **National ID** (both DNIC): both are appointment-booking
  procedures gated behind a `gub.uy`/digital-cédula login just to schedule,
  with no downloadable form of any kind — data goes directly into the
  portal, and issuance itself is in-person/biometric. Dead ends.
- **Visa** (MRREE): the Formulario Unificado de Visas is a genuine AcroForm
  PDF, hosted directly by the Ministry, requiring no login — the strongest
  candidate found across all four gaps. This document authors that
  candidate, opening Uruguay's Visa vertical (3 of 6).

## Sources examined

### Source 1 (primary `source`, canonical Ministry-hosted copy)

- **Authority:** Ministerio de Relaciones Exteriores (MRREE)
- **Document:** Formulario Unificado de Visas / Visa Application Form
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.gub.uy/ministerio-relaciones-exteriores/sites/ministerio-relaciones-exteriores/files/2026-03/Formulario%20unificado%20de%20visas.pdf>,
  linked from the Uruguay Consulate General in Mexico's own trámite page
  (`gub.uy/ministerio-relaciones-exteriores/consulado-general-mexico/tramites-servicios/visa`),
  which instructs applicants to "completar el formulario que viene al final
  de la página y remitirlo al correo electrónico" (complete the form at the
  end of the page and send it by email) to the corresponding consulate.
- **File identity:** `sha256:429cefed89d404ae8c7380be983eda37318bc88416d22c2f27097643bdf9cb72`,
  1,625,285 bytes, confirmed **byte-identical** to a second, independently
  discovered mirror hosted by the Uruguay Consulate General in Barcelona
  (`consuladouy-bcn.es/wp-content/uploads/2024/02/Formulario-unificado-de-visas-2024.pdf`)
  — the mirror surfaced first during scouting under a 2024-02 path, but this
  cycle re-derived the file directly from a current `gub.uy` consular page
  (2026-03 path) to confirm it is the Ministry's own current, centrally
  hosted edition, not a stale third-party copy that happens to still be
  live.
- **Extraction method:** `pdfjs-dist` (legacy build, `require`'d via
  `createRequire` since the installed `pdfjs-dist@3` ships no `.mjs` legacy
  entrypoint) for both the AcroForm widget inventory
  (`page.getAnnotations()`, filtered to `subtype === "Widget"`) and the text
  layer (`page.getTextContent()`, position-sorted by `item.transform[4]`/`[5]`
  for x/y) to correlate each widget to its printed label.
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (different, non-superseding form — examined and set aside)

- **URL:** <https://www.gub.uy/ministerio-relaciones-exteriores/sites/ministerio-relaciones-exteriores/files/2024-10/VISA%20VACIA%20(1).odt>
  ("VISA VACIA (1).odt", 5,873 bytes)
- **What it is:** unzipped and read as OpenDocument XML (`content.xml`). Its
  own printed content identifies it as "SOLICITUD DE AUTORIZACION DE VISA", a
  request letter addressed **from** the Uruguayan Consulate in Rosario,
  Argentina **to** the Dirección Nacional de Migración — a single
  consulate's internal request template, not an applicant-facing unified
  form. Its field set (No. de orden, Nombres y Apellidos, Nacionalidad,
  Lugar y Fecha de Nacimiento, Profesión, Estado Civil, Nombre del Cónyuge,
  Tipo y Número Documento de Viaje, Razones del Viaje, Referencia en el
  Uruguay, Pasaje Confirmado, Reservas de Hotel, plus an "Para Uso Oficial"
  section for the Consul's own opinion) overlaps substantially with, but is
  materially different in structure and audience from, the Formulario
  Unificado de Visas.
- **Why not used:** this is a different form for a different filer (the
  consulate's own outbound letter to Migración, not something an applicant
  fills in and submits), not an alternate edition of the AcroForm PDF this
  schema is sourced from. Disclosed here so a future cycle does not mistake
  it for a stale/duplicate copy of the same document.

## Field inventory (Phase 3)

The AcroForm carries 22 `Widget` annotations on page 1 (18 `Tx` plain-text
fields, 4 `Tx` fields carrying an `AFDate_FormatEx("dd/mm/yyyy")`
format/keystroke action); page 2 is a bilingual notes-only page with 0
widgets. All 22 widgets sit in a single right-hand column
(x≈262–577); all 21 mapped widgets align one-to-one, row by row, with their
own printed bilingual label in the left column (x≈42) by y-coordinate —
a clean single-column layout with no ambiguity in the correlation itself.

| Field (schema `name`) | Label (source) | AcroForm widget name | Example valid value |
|---|---|---|---|
| `fechaSolicitud` | Fecha de solicitud/Date of application | `Fecha1_af_date` | `"2026-07-12"` |
| `nombre` | Nombre/First name | `Text2` | `"Camila"` |
| `apellidos` | Apellidos/Surname | `Text3` | `"Fernández Rossi"` |
| `lugarNacimiento` | Lugar de nacimiento (ciudad y país)/Place of birth | `Text4` | `"Montevideo, Uruguay"` |
| `fechaNacimiento` | Fecha de nacimiento/Date of birth | `Fecha2_af_date` | `"1994-03-18"` |
| `nacionalidad` | Nacionalidad/Nationality | `Text7` | `"Argentina"` |
| `direccion` | Dirección/Address | `Text8` | `"Av. Corrientes 1234, Buenos Aires, Argentina"` |
| `numeroPasaporte` | Nº de pasaporte/Passport No | `Text9` | `"AAB123456"` |
| `fechaVencimientoPasaporte` | Fecha de vencimiento/Expiration date | `Fecha3_af_date` | `"2030-05-01"` |
| `profesion` | Profesión/Profession | `Text10` | `"Contadora"` |
| `empresa` | Empresa en la que trabaja/Company where you work | `Text11` | `"Estudio Contable Rossi & Asociados"` |
| `cargo` | Cargo que desempeña/Position held | `Text12` | `"Socia"` |
| `estadoCivil` | Estado Civil/Marital Status | `Text13` | `"Soltera"` |
| `nombreConyuge` | Nombre completo del cónyuge/Spouse's full name | `Text14` | `"Luciana Duarte Ibáñez"` |
| `fechaViaje` | Fecha de viaje/Date of the trip | `Fecha4_af_date` | `"2026-08-15"` |
| `razonesViaje` | Razones de su viaje a Uruguay/Reasons for your trip | `Text15` | `"Turismo, visitar familiares"` |
| `referenciaUruguay` | Referencia en Uruguay/Reference in Uruguay | `Text16` | `"Juan Pérez (primo), Montevideo"` |
| `direccionUruguay` | Dirección en Uruguay/Address in Uruguay | `Text18` | `"Bulevar Artigas 456, Montevideo"` |
| `telefono` | N° teléfono/Telephone | `Text19` | `"+598 99 123 456"` |
| `vinculoConPais` | Vínculo con el país donde solicita la visa | `Text20` | `"Ciudadana argentina"` |
| `visasAnteriores` | Visas anteriores a Uruguay/Previous visas to Uruguay | `Text5` | `"Visa de turista, emitida 2022-06-10"` |

No `documents[]`: the form's own page-2 notes ("Notas"/"Notes") instruct the
applicant to "presentar todos los originales al Consulado" (present all
originals to the Consulate) but the form itself does not itemize which
supporting documents that entails — unlike, e.g.,
`pe/cancilleria/solicitud-visa-dgc-005`, which names a specific photo
requirement. Rather than invent an unsourced document list, this schema
models 0 `documents[]` this cycle, matching the convention already set by
`pe/sunat/formulario-virtual-709-declaracion-renta`.

## Access notes and judgment calls

1. **One widget, `Text1` (rect `[193.092,717.556,417.602,747.01]`,
   `textAlignment: 1` i.e. centered — every other field's alignment is
   unset/left), is excluded from `fields[]`.** It sits between the printed
   Ministry header ("Ministerio de Relaciones Exteriores/Foreign Affairs
   Ministry", y≈751–764) and the form's own title ("Solicitud de
   Visa/Visa Application", y≈693) — a gap in the text layer with no
   correlated label of its own, and its `alternativeText` is empty. Rather
   than guess (e.g. a consulate-name or file-reference box), this is
   disclosed as an unlabeled/ambiguous widget and left out of scope.
2. **The printed signature line at the bottom of page 1**
   ("________________________________" / "Firma solicitante/Applicant's
   signature", y≈11–29) **has no corresponding AcroForm widget at all** —
   confirmed directly from the widget inventory, which has no entry below
   `Text5` (bottom edge y=54.231). This is a wet-ink signature captured after
   printing, not a fillable field, consistent with this registry's existing
   convention for consular/immigration forms that require a physical
   signature (e.g. `pe/cancilleria/solicitud-visa-dgc-005`, judgment call 6).
3. **`estadoCivil` is modelled as free text, not an enum.** Unlike
   `pe/cancilleria/solicitud-visa-dgc-005`'s four-way Estado Civil checkbox
   grid, this source's widget (`Text13`) is a plain `Tx` field with no
   sibling checkbox widgets — the form simply prints "Estado Civil/Marital
   Status" beside one blank line.
4. **`nombreConyuge` and `visasAnteriores` are `required: false`; every
   other field is `required: true`.** The form prints no asterisk or other
   required/optional marker system anywhere. Because `estadoCivil` is free
   text rather than an enumerated value, there is no field to gate a
   `requiredWhen` condition on for spouse's name — an applicant without a
   spouse is expected to leave `nombreConyuge` blank, and a first-time
   applicant genuinely has no prior Uruguayan visas to declare in
   `visasAnteriores` (the form provides no separate "none" checkbox for
   either). All 19 other fields are treated as required, consistent with
   this registry's convention of treating a form's own default column of
   blanks as expected-to-be-filled absent a stated exception.
5. **`telefono` is modelled as paired with `direccionUruguay`, not
   `direccion`.** It is printed immediately after "Dirección en
   Uruguay/Address in Uruguay" with no country qualifier of its own; its
   row position (not a numbering system — this form has none) is the only
   disambiguating signal.
6. **`fechaVencimientoPasaporte` is modelled as the passport's own expiration
   date**, inferred from its position directly following `numeroPasaporte`
   ("Nº de pasaporte/Passport No"), not the visa's or the trip's own
   expiration.

## Test run (Phase 4)

No live submission was attempted: Uruguay's visa process is consular
(printed, signed by hand, and emailed with original supporting documents to
a specific consulate), not a portal accepting programmatic submissions, and
submitting fabricated identity data against a foreign government's
consular/immigration process is not a safe or reversible action — the same
reasoning already documented for this registry's other consular/immigration
schemas (e.g. `pe/cancilleria/solicitud-visa-dgc-005`,
`co/cancilleria/visa-application-individual`).

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by
`pe/cancilleria/solicitud-visa-dgc-005` and
`vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`): compiles `schema.json`'s
`fields[]` into a JSON Schema document checked with `ajv` (+`ajv-formats`
for `date`), plus a from-scratch evaluator for `requiredWhen`/`documents[]`
conditional requiredness (this registry's own accumulated experience is that
conformance checkers routinely skip `documents[]`, though this document has
none).

```
$ node validate_instance.mjs registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json \
    conformance/uy/mrree/formulario-unificado-de-visas/1.0.0/tourist-visa-first-time-applicant.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json \
    conformance/uy/mrree/formulario-unificado-de-visas/1.0.0/business-visa-married-with-prior-visa.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'numeroPasaporte' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'numeroPasaporte'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-invalid-date-format.json: 'fechaNacimiento' set to 'not-a-date'
Static (required/type/pattern/enum) validation: FAIL
 - /fechaNacimiento must match format "date"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-maxlength-violation.json: 'estadoCivil' set to a 40-character string (validation.maxLength: 30)
Static (required/type/pattern/enum) validation: FAIL
 - /estadoCivil must NOT have more than 30 characters
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json
ok   registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json
ok   registry/uy/mrree/formulario-unificado-de-visas/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Uruguay's other three open verticals (screened this cycle, not authored)

Taxes (DGI, login-gated portal or a 0-widget dependents-only PDF), Passport
and National ID (both DNIC, login-gated appointment-scheduling only with no
downloadable form of any kind) remain open backlog candidates for a future
cycle — see "Why this candidate" above for the specific per-vertical
findings. Uruguay now stands at 3 of 6 verticals (Business Formation, DMV,
Visa).
