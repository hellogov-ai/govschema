# Verification record — `pe/cancilleria/solicitud-visa-dgc-005` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-11`

This is a `GovSchema Standard Research` cycle (**GOV-2419**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

CATALOG.md's own "Known Gaps & Opportunities" section (item 11, the GOV-2404
cycle's own note) named Peru's DGC-005 visa form as a re-confirmed candidate,
but described it as weaker than the Vietnam TK01 form ultimately authored
that cycle: "genuine unauthenticated static text-layer PDF... none carrying
genuine AcroForm widgets." This cycle re-opened that assessment rather than
treating it as settled, and re-fetched the form from three independent
`gob.pe` mirrors instead of trusting the single mirror the prior cycle had
examined:

- The Barcelona consulate's own `gob.pe` page
  (`consulado-del-peru-en-iquique`/`5193085`) serves a **2013** revision:
  Microsoft Word 2007, `IsAcroFormPresent: false`, 0 AcroForm widgets — a
  genuine plain text-layer PDF, matching the prior cycle's characterization.
- The Ministry's **own institutional page**
  (`gob.pe/institucion/rree/informes-publicaciones/279740-formulario-de-solicitud-de-visa-dgc-005`)
  and the Guayaquil consulate's page
  (`gob.pe/institucion/consulado-del-peru-en-guayaquil/informes-publicaciones/7986809-formulario-de-solicitud-de-visa-dgc-005`)
  both serve a **byte-identical** (`sha256:1b728535857a1b40...`), materially
  different **2019** revision: Microsoft Word 2016, `IsAcroFormPresent: true`,
  **63 real AcroForm widgets**, most carrying self-documenting
  `alternativeText` tooltips. This is a genuinely stronger candidate than the
  prior cycle scouted, not a re-confirmation of the same weak finding — the
  prior cycle's own single-mirror check happened to land on the superseded
  2013 copy.

The 2019 revision also differs substantively in content, not just format: it
replaces the older binary Visa Temporal/Visa Residente split with a
seven-way visa-subtype checkbox group (Turista, Negocios, Transeúnte,
Artista, Tripulante, Otro, Residente), adds a Correo Electrónico field
(item 13) with no counterpart in the 2013 copy, and adds an entirely new
conditional Sección 4 ("Grupo Artístico — ONLY FOR ARTIST-APPLICATION") that
does not exist in the 2013 copy at all. This schema is authored against the
2019 revision exclusively.

## Sources examined

### Source 1 (primary `source`, canonical Ministry-hosted copy)

- **Authority:** Ministerio de Relaciones Exteriores del Perú (Cancillería)
- **Document:** Formulario DGC-005, "Solicitud de Visa"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://cdn.www.gob.pe/uploads/document/file/321107/formulario_solicitud_visa.pdf>,
  linked from the Ministry's own institutional publications page
  <https://www.gob.pe/institucion/rree/informes-publicaciones/279740-formulario-de-solicitud-de-visa-dgc-005>.
- **File identity:** `sha256:1b728535857a1b406728e52e69abfe6c2de146b9f957148ef73746c6236ab8c8`,
  311,026 bytes, PDF 1.6, linearized, `IsAcroFormPresent: true`. PDF metadata:
  `CreationDate: 2019-05-21`, `Creator: Microsoft® Word 2016`, `Author:
  Lisbeth Rosangel Antialon Quispe`. Confirmed byte-identical to the Guayaquil
  consulate's own independently-hosted copy
  (`cdn.www.gob.pe/uploads/document/file/9767651/7986809-formulario-de-solicitud-de-visa-dgc-005.pdf`),
  cross-checked from a second `gob.pe` institutional path.
- **Extraction method:** `pdfjs-dist` (legacy build) for both the text layer
  (`page.getTextContent()`, position-sorted by `transform` y/x to resolve the
  form's two-column grid layout) and the full AcroForm widget inventory
  (`page.getAnnotations()`, 63 `Widget` annotations, each with `fieldName`,
  `fieldType`, `rect`, and `alternativeText`).
- **Retrieved / reviewed:** 2026-07-11

### Source 2 (superseded revision, examined for comparison only)

- **URL:** <https://www.consulado.pe/Documents/visas/formulario_solicitud_visa.pdf>
  (mirrored via `cdn.www.gob.pe/uploads/document/file/5193085/...`, the
  Barcelona consulate's own `gob.pe` page)
- **File identity:** `sha256:3e3cd0b48eaffa6470f8ee3f1412d81e8d5ae217940e1ca297c9cf6958cf85ff`,
  35,503 bytes, PDF 1.5, `IsAcroFormPresent: false`, 0 AcroForm widgets.
  `CreationDate: 2013-08-21`, `Creator: Microsoft® Word 2007`.
- **Why not used:** confirmed materially superseded by Source 1 (see "Why
  this candidate" above) — no email field, no Grupo Artístico section, and
  only a binary Temporal/Residente visa-type split rather than the current
  seven-way subtype group.

## Field inventory (Phase 3)

| Field (schema `name`) | Label (source) | AcroForm widget name(s) | Example valid value |
|---|---|---|---|
| `visaType` | Procedimiento a Realizar / Type of Visa | `Negocios`, `Transeúnte`, `Artista`, `Tripulante`, `Visa Residente Resident Visa` (Btn/checkBox); `Turista`, `Otro` (Tx, checkbox-position boxes) | `"TURISTA"` |
| `otroEspecifique` | Otro (especifique) | `Business` (Tx; mismatched alternativeText, see judgment call 2) | `"Voluntariado"` |
| `passportType` | Tipo de Pasaporte | `Type NumPassport` | `"Ordinario"` |
| `passportNumber` | Número de Pasaporte | `Num` | `"AB1234567"` |
| `apellidoPaterno` | Apellido Paterno | `2  Apellido Paterno` | `"García"` |
| `apellidoMaternoCasada` | Apellido Materno o Casada | `Casada Maiden Name` | `"Fernández"` |
| `nombres` | Nombres | `4 Nombres Name` | `"Lucía Isabel"` |
| `sexo` | Sexo | `undefined_3` (Masculino, inferred), `Femenino Female` | `"FEMENINO"` |
| `maritalStatus` | Estado Civil | `Soltero Single`, `Casado Married` (Btn); `Viudo Widowed`, `undefined_2` (Divorciado, inferred) (Tx) | `"SOLTERO"` |
| `lugarNacimiento` | Lugar de Nacimiento (País) | (text label only, no distinct widget beyond the row's blank) | `"México"` |
| `nacionalidad` | Nacionalidad | `8 Nacionalidad  Nationality` | `"Mexicana"` |
| `fechaNacimiento` | Fecha de Nacimiento | `d`, `d2`, `m1`, `m2`, `a1`-`a4` (8 boxes, consolidated) | `"1994-03-12"` |
| `profesionOcupacion` | Profesión/Ocupación | `10 ProfesiónOcupación  Ocupation` | `"Ingeniera de Software"` |
| `domicilioPeru` | Domicilio o Alojamiento en el Perú | `11 Domicilio... AvJrCalle` + `...AvJrCalle2` (2 lines, consolidated) | `"Av. Larco 345, Miraflores, Lima"` |
| `telefonoPeru` | Teléfono (Perú) | `Teléfono` | `"+51 987654321"` |
| `domicilioExtranjero` | Domicilio en el Extranjero | `12 Domicilio en el Extranjero` | `"Calle Reforma 120, Ciudad de México"` |
| `paisExtranjero` | País | `Country` | `"México"` |
| `telefonoExtranjero` | Teléfono (Extranjero) | `Teléfono_2` | `"+52 5512345678"` |
| `correoElectronico` | Correo Electrónico | `13 Correo Electrónico  Email` | `"lucia.garcia@example.com"` |
| `grupoArtisticoNombre` | Nombre (Grupo Artístico) | `Nombre` (Sección 4) | `"Ensamble Bianchi"` |
| `grupoArtisticoNacionalidad` | Nacionalidad (Grupo Artístico) | `Nacionalidad` (Sección 4) | `"Italiana"` |

`documents[]`:

| Document `id` | What it is | Required? |
|---|---|---|
| `applicantPhoto` | Passport-style photo of the applicant (Sección 3) | Yes |

## Access notes and judgment calls

1. **`visaType` collapses seven checkbox-position widgets into one enum.**
   The source has no separate top-level "Visa Temporal" checkbox of its own —
   only its six sub-categories (Turista, Negocios, Transeúnte, Artista,
   Tripulante, Otro) and the sibling "Visa Residente" checkbox exist as
   widgets. Checking any one of the six sub-categories is what signals a
   temporary-visa application in this source; there is no redundant
   umbrella field to also model.
2. **`otroEspecifique`'s underlying AcroForm field carries the internal
   `alternativeText` "Business"**, despite sitting at the grid position
   immediately after the `Otro` checkbox and before the next section's
   `Visa Residente` row. Treated as a field-naming artifact of the source PDF
   (most likely copy-pasted from another field during the form's own
   authoring in Word) rather than evidence that this box is scoped only to
   business-purpose visas — its position, not its internal name, drives this
   schema's interpretation.
3. **Six of the group/pair widgets have no `alternativeText` of their own**
   (`undefined`, `undefined_2`, `undefined_3`, `undefined_4`, `undefined_5`,
   plus the unlabelled wide box after `Visa Residente`). `undefined_2` and
   `undefined_3` are resolved to Divorciado and Masculino respectively by
   their fixed grid position directly beside each option's own printed label
   (cross-checked against the row order common to both the 2013 and 2019
   revisions: Soltero/Viudo then Casado/Divorciado; Masculino above
   Femenino). `undefined_4`/`undefined_5` and the wide box after `Visa
   Residente` sit inside Sección 5 (Reservado para Uso Interno) or have no
   printed label at all and are excluded from `fields[]` as out of scope
   (official-use / unidentifiable, respectively) — see judgment call 6.
4. **No required/optional marker system (no asterisks) is printed anywhere
   on this form**, unlike several other schemas already in this registry.
   This schema treats all 13 explicitly numbered Sección 2 items as
   `required: true`, and their unnumbered phone sub-fields (`telefonoPeru`,
   `telefonoExtranjero`) as optional, a disclosed, consistent convention
   rather than a claim that the source itself marks these fields' required
   status.
5. **`fechaNacimiento` consolidates 8 single-character AcroForm boxes**
   (`d`, `d2` for day; `m1`, `m2` for month; `a1`-`a4` for year) into one
   `type: date` field, per this registry's established convention for
   segmented date-of-birth boxes (e.g. `dk/cpr/notification-of-entry`).
6. **Sección 3 (Firma, Impresión Digital y Foto del Solicitante), Sección 5
   (Reservado para Uso Interno), and Sección 6 (Observaciones / Firma del
   Cónsul o Encargado) are excluded from `fields[]` entirely.** Sección 3's
   signature and fingerprint are physical marks made in person at the
   consular counter, not data the applicant supplies in advance — only its
   photo requirement is modelled, as `documents[].applicantPhoto`. Sección 5
   (case number, DIGEMIN authorization, consulate-name pre-fill) and Sección
   6 (remarks and the consul's own signature) are internal government
   case-processing fields, never applicant-filled.
7. **Sección 4 (Grupo Artístico) is modelled with `requiredWhen` gating on
   `visaType equals ARTISTA`**, per its own printed heading, "ONLY FOR
   ARTIST – APLICATION" (sic, verbatim source typo preserved only in this
   note, not in the schema's own field labels).
8. **`correoElectronico`'s `validation.pattern` is a general-purpose email
   shape check**, not a source-published rule — the form itself prints no
   validation rule for this field beyond its own blank line.

## Test run (Phase 4)

No live submission was attempted: Peru's visa system requires an in-person or
consular appointment and physical signature/fingerprint capture (Sección 3),
and submitting fabricated identity data against a foreign government's
immigration/consular process is not a safe or reversible action — the same
reasoning already documented for this registry's other consular/immigration
schemas (e.g. `co/cancilleria/visa-application-individual`).

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by
`it/agenzia-entrate/modello-730` and `vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`):
compiles `schema.json`'s `fields[]` into a JSON Schema draft 2020-12 document
checked with `ajv`, plus a from-scratch evaluator for the shared Condition
grammar that checks both `fields[].requiredWhen` and `documents[]`
requiredness against a `documents: [{id, provided}]` array — checking
`documents[]` requiredness explicitly, since this registry's own accumulated
experience is that conformance checkers routinely skip it.

```
$ node validate_instance.mjs registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json \
    conformance/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/tourist-visa-first-time-applicant.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json \
    conformance/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/artist-visa-with-ensemble.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'passportNumber' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'passportNumber'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-email-pattern-violation.json: 'correoElectronico' set to 'not-an-email'
Static (required/type/pattern/enum) validation: FAIL
 - /correoElectronico must match pattern "^[^@\s]+@[^@\s]+\.[^@\s]+$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-artist-field.json: visaType is 'ARTISTA'
$ # but 'grupoArtisticoNombre' (requiredWhen visaType equals ARTISTA) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'grupoArtisticoNombre' is required (requiredWhen matched) but not provided
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
$ node tools/validate.mjs registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json
ok   registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json
ok   registry/pe/cancilleria/solicitud-visa-dgc-005/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Peru's other five verticals (screened this cycle, not authored)

Per the GOV-2404 cycle's own record, three of Peru's other candidates are
genuine unauthenticated static text-layer PDFs without AcroForm widgets: SUNAT
RUC registration (Formulario 2119, Business Formation), MTC's driver's-licence
application (DMV), and DGC-005 itself was that cycle's own third comparison
point for Visa — this cycle's finding that DGC-005 in fact carries a genuine
2019 AcroForm revision does not change the assessment of the other two
siblings, which were not re-checked this cycle. Passport (Migraciones) and
National ID (RENIEC DNI) remain appointment/biometric-gated; Taxes (SUNAT) is
Clave-SOL-login-gated. Peru now stands at 1 of 6 verticals (Visa); the other
five remain open backlog candidates for a future cycle, with Business
Formation and DMV the strongest pre-scouted leads.
