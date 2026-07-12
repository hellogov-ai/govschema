# Verification record — `pe/sunat/solicitud-inscripcion-ruc-persona-natural` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2426**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

CATALOG.md's own "Known Gaps & Opportunities" section (item 12, the GOV-2419
cycle's own note) named SUNAT's Formulario 2119 (RUC registration) as Peru's
strongest pre-scouted, unauthenticated Business Formation candidate, alongside
the MTC driver's-licence application (DMV) — both flagged as "not re-screened
this cycle for a possible AcroForm revision of their own — worth checking in a
future cycle" given the GOV-2419 cycle's own finding that a sibling Peru form
(DGC-005) had a genuine AcroForm revision hiding behind its Ministry
institutional page rather than the consulate mirror previously examined. This
cycle re-checked that specific possibility for Formulario 2119 before
authoring against it.

Three independent copies of Formulario 2119 were fetched and cross-hashed:

- **`sunat.gob.pe`'s own canonical copy** (`f-2119-sunat.pdf`,
  `sha256:136cc390d4bde76856e6bf8c17a3309c68f2b3f9c2c6f3663413653977f8233c`,
  35,712 bytes): PDF 1.4, `Creator: Adobe PageMaker 7.0`,
  `Producer: Acrobat Distiller 6.0`, `CreationDate: 2006-09-07`.
- **The `gob.pe` institutional page's mirror**
  (`gob.pe/institucion/sunat/informes-publicaciones/374992-formulario-2119`,
  upload ID 448271, `sha256:28a3d21675c6ad51de8c01ab00eafc8fc9099b87a66ea933325f759f3bea22ab`,
  31,418 bytes): PDF 1.7, `Creator`/`Producer: PDFium`,
  `CreationDate: 2016-02-01`.
- **An older `gob.pe` CDN link surfaced independently by web search**
  (upload ID 400202) turned out to be **byte-identical** to the 448271 upload
  above (same SHA-256) — the same PDFium-regenerated copy hosted under two
  different upload IDs, not a distinct revision.

Unlike DGC-005, this cross-check does **not** overturn the GOV-2404 cycle's
original characterization: **none of the three copies carries any AcroForm
widget.** `pdfjs-dist`'s `page.getAnnotations()` returns 0 `Widget`
annotations on every page of every copy, and a raw byte-level scan (including
inside each PDF's inflated `FlateDecode` object streams) finds no `/AcroForm`
or `/Widget` marker in any of them. The `sunat.gob.pe` and `gob.pe` copies
differ only in producer/regeneration metadata (a 2006 PageMaker original vs. a
2016 PDFium reprint) — both render byte-for-byte the same two-page text
content, confirmed via `pdfjs-dist` text-content extraction. This is
genuinely a re-confirmation, not a new finding: Formulario 2119 is a real,
unauthenticated, text-layer-only PDF, the same tier as this registry's
`jp/houmukyoku` and `vn/gdt` precedents, not a hidden-AcroForm case like
DGC-005 turned out to be.

`orientacion.sunat.gob.pe/03-formularios-para-la-inscripcion-al-ruc`
independently confirms the form is currently **"VIGENTE"** (in force) — one
of the "FORMULARIOS FÍSICOS VIGENTES PARA REALIZAR LA INSCRIPCIÓN AL RUC POR
TERCERO" (currently valid physical forms for RUC registration through a
third party), alongside its own companion Formulario 2054 (legal
representatives) and Formulario 2046 (additional establishments). The form's
own Rubro IV ("Datos de la Persona Natural") and Tabla Anexa N° 2 confirm it
is also the operative form for a natural person, conjugal partnership, or
undivided estate registering directly, not merely a third-party-filing
artifact.

## Sources examined

### Source 1 (primary `source`, canonical SUNAT-hosted copy)

- **Authority:** Superintendencia Nacional de Aduanas y de Administración
  Tributaria (SUNAT)
- **Document:** Formulario 2119, "Solicitud de Inscripción o Comunicación de
  Afectación de Tributos (Incluye Exoneraciones)"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.sunat.gob.pe/orientacion/formularios/ruc/f-2119.pdf>
- **File identity:** `sha256:136cc390d4bde76856e6bf8c17a3309c68f2b3f9c2c6f3663413653977f8233c`,
  35,712 bytes, PDF 1.4, `IsAcroFormPresent: false`, 0 AcroForm widgets (2
  pages, 0 widgets each, confirmed via `pdfjs-dist`
  `page.getAnnotations()`). `CreationDate: 2006-09-07`, `Creator: Adobe
  PageMaker 7.0`, `Producer: Acrobat Distiller 6.0`.
- **Extraction method:** `pdfjs-dist` (legacy build) `page.getTextContent()`,
  position-sorted by `transform` y/x to resolve the form's multi-column grid
  layout, cross-checked against exact widget-free x/y coordinates for
  ambiguous rows (see judgment calls below).
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (companion instructions document)

- **URL:** <https://www.sunat.gob.pe/orientacion/formularios/ruc/i-2119.pdf>
- **File identity:** `sha256:613822ba852eb67232fd4bd28d19cdc6e1dc185bf2dd12c6755494443489b051`,
  13,922 bytes, PDF 1.2, 1 page, 0 AcroForm widgets — a prose instructions
  sheet, numbered "Casilla NN" by NN, cited throughout the field inventory
  below.
- **Retrieved / reviewed:** 2026-07-12

### Source 3 (gob.pe institutional mirror, examined for AcroForm comparison)

- **URLs:** <https://cdn.www.gob.pe/uploads/document/file/448271/2119_-_FORMULARIO_INSCRIPCION_AL_RUC.pdf>
  (linked from
  <https://www.gob.pe/institucion/sunat/informes-publicaciones/374992-formulario-2119>)
  and <https://cdn.www.gob.pe/uploads/document/file/400202/FORMULARIO_2119.pdf>
  (surfaced independently by web search) — both byte-identical.
- **File identity:** `sha256:28a3d21675c6ad51de8c01ab00eafc8fc9099b87a66ea933325f759f3bea22ab`,
  31,418 bytes, PDF 1.7, `IsAcroFormPresent: false`, 0 AcroForm widgets.
  `CreationDate: 2016-02-01`, `Creator`/`Producer: PDFium`.
- **Why not used as primary:** same text content as Source 1 (confirmed via
  `pdfjs-dist` text-content comparison of both pages), just a later
  PDFium-regenerated reprint with no substantive differences — used only to
  confirm no hidden AcroForm revision exists, per this cycle's "Why this
  candidate" note above.

### Source 4 (Tablas Anexas reference, for enumerated code values)

- **URL:** <https://orientacion.sunat.gob.pe/6746-03-tablas-anexas-2-ruc-empresas>
- **Retrieved / reviewed:** 2026-07-12 — provides the full code tables for
  Tabla Anexa N° 2 (Tipo de Contribuyente), N° 3 (Tipo de Zona), N° 4 (Tipo
  de Vía), N° 5 (Documento de Identidad), N° 6 (Sexo), N° 7 (Nacionalidad),
  N° 8 (Condición de Domiciliado), and (partially, by the page's own
  admission — "por razones de espacio... sólo reproducimos algunos códigos")
  N° 10 (Codificación de Tributos). Tabla Anexa N° 1 (CIIU economic-activity
  codes) and N° 11 (profession/occupation codes) each list several hundred
  entries and are modelled as free-text codes rather than full enums, per
  this registry's established convention for large external reference
  tables (e.g. `es/aeat/declaracion-censal-personas-fisicas-modelo-030`'s own
  CNAE code fields).

### Source 5 ("vigente"/currency confirmation)

- **URL:** <https://orientacion.sunat.gob.pe/03-formularios-para-la-inscripcion-al-ruc>
- **Retrieved / reviewed:** 2026-07-12 — confirms Formulario 2119 is
  currently "VIGENTE" for third-party RUC-inscription filing, alongside its
  own companion Formulario 2054 and Formulario 2046.

## Field inventory (Phase 3)

All casilla numbers below are cited from the companion instructions document
(Source 2, `i-2119.pdf`); tabla references are cited from Source 4.

| Field (schema `name`) | Label (source) | Casilla / Tabla | Example valid value |
|---|---|---|---|
| `tipoSolicitud` | Tipo de Solicitud | Casillas 05-06 | `"INSCRIPCION"` |
| `numeroRuc` | Número de RUC | Casilla 13 | `"10456789123"` |
| `apellidosNombresRazonSocial` | Apellidos y Nombres o Razón Social | Casilla 14 | `"Quispe Mamani Rosa"` |
| `tipoContribuyente` | Tipo de Contribuyente | Casilla 16, Tabla Anexa N° 2 | `"PERSONA_NATURAL_CON_NEGOCIO"` |
| `telefono` | Teléfonos | (no casilla cited) | `"+51 987654321"` |
| `profesionUOficioCodigo` | Código de Profesión u Oficio | Casilla 150, Tabla Anexa N° 11 | `"0231"` |
| `nombreComercial` | Nombre Comercial | Casilla 18 | `"Consultora Andina"` |
| `numeroLicenciaMunicipal` | N° Licencia Municipal | Casilla 19 | `"12345"` |
| `fax` | Fax | (no casilla cited) | `"+51 14567890"` |
| `fechaInicioActividades` | Fecha Inicio Activ. | Casilla 25 | `"2026-07-01"` |
| `actividadEconomicaPrincipalDescripcion` | Actividad Económica Principal | Casilla 24, Tabla Anexa N° 1 | `"Venta al por menor de prendas de vestir"` |
| `actividadEconomicaPrincipalCodigoCiiu` | Código CIIU | Casilla 24, Tabla Anexa N° 1 | `"47710"` |
| `sistemaEmisionComprobantes` | Sistema de Emisión de Comprobantes de Pago | Casillas 26-28 | `"COMPUTARIZADO"` |
| `actividadesEconomicasSecundariasDescripcion` | Actividades Económicas Secundarias | Tabla Anexa N° 1 | `"Actividades de consultoría informática"` |
| `actividadesEconomicasSecundariasCodigoCiiu` | Código CIIU (secundaria) | Tabla Anexa N° 1 | `"62020"` |
| `sistemaContabilidad` | Sistema de Contabilidad | Casillas 29-30 | `"MANUAL"` |
| `actividadComercioExteriorExportador` | Actividad de Comercio Exterior — Exportador | Casillas 31-32 | `true` |
| `actividadComercioExteriorImportador` | Actividad de Comercio Exterior — Importador | Casillas 31-32 | `false` |
| `correoElectronico` | Correo Electrónico | (no casilla cited) | `"rosa.quispe@example.com"` |
| `departamento` | Departamento | Rubro III | `"Lima"` |
| `provincia` | Provincia | Rubro III | `"Lima"` |
| `distrito` | Distrito | Rubro III | `"Miraflores"` |
| `zonaCodigo` | Tipo de Zona | Casilla 37, Tabla Anexa N° 3 | `"URBANIZACION"` |
| `zonaNombre` | Nombre de la Zona | Casilla 38 | `"Urb. San Isidro"` |
| `viaCodigo` | Tipo de Vía | Casilla 39, Tabla Anexa N° 4 | `"AVENIDA"` |
| `viaNombre` | Nombre de la Vía | Casilla 40 | `"Larco"` |
| `numero` | Número | Rubro III | `"345"` |
| `kilometro` | Kilometro | Rubro III | `"12.5"` |
| `manzana` | Manzana | Rubro III | `"C"` |
| `interior` | Interior | Rubro III | `"B"` |
| `departamentoUnidad` | Dpto. | Rubro III | `"402"` |
| `lote` | Lote | Rubro III | `"7"` |
| `otrasReferencias` | Otras Referencias | Casilla 43 | `"Frente al parque central"` |
| `condicionInmueble` | Condición del Inmueble | (page 2 prose only) | `"ALQUILADO"` |
| `documentoIdentidadTipo` | Documento de Identidad — Tipo | Casillas 45-46, Tabla Anexa N° 5 | `"DNI"` |
| `documentoIdentidadNumero` | Documento de Identidad — Número | Casillas 45-46 | `"45678912"` |
| `fechaNacimientoOInicioSucesion` | Fecha de Nacimiento o Inicio de la Sucesión | Casilla 47 | `"1990-04-12"` |
| `sexo` | Sexo | Casilla 48, Tabla Anexa N° 6 | `"FEMENINO"` |
| `nacionalidad` | Nacionalidad | Casilla 49, Tabla Anexa N° 7 | `"PERUANA"` |
| `paisDeProcedencia` | País de Procedencia | Rubro IV (sólo si extranjero) | `"Colombia"` |
| `condicionDomiciliado` | Condición de Domiciliado | Casilla 50, Tabla Anexa N° 8 | `"DOMICILIADO"` |
| `tributo1Codigo` | Código de Tributo (fila 1) | Rubro VI, Tabla Anexa N° 10 | `"1011"` |
| `tributo1Afectacion` | Afectación (fila 1) | Rubro VI | `true` |
| `tributo1FechaAfectacion` | Fecha desde Afecto (fila 1) | Rubro VI | `"2026-07-01"` |
| `tributo1Exoneracion` | Exoneración (fila 1) | Rubro VI | `false` |
| `tributo1FechaExoneracion` | Fecha desde Exonerado (fila 1) | Rubro VI | `"2026-07-12"` |
| `tributo2Codigo` | Código de Tributo (fila 2) | Rubro VI, Tabla Anexa N° 10 | `"3031"` |
| `tributo2Afectacion` | Afectación (fila 2) | Rubro VI | `false` |
| `tributo2FechaAfectacion` | Fecha desde Afecto (fila 2) | Rubro VI | `"2026-07-12"` |
| `tributo2Exoneracion` | Exoneración (fila 2) | Rubro VI | `true` |
| `tributo2FechaExoneracion` | Fecha desde Exonerado (fila 2) | Rubro VI | `"2026-07-12"` |
| `autorizaTercero` | Autoriza a Otra Persona para la Presentación | Constancia de Recepción | `true` |
| `terceroApellidosNombres` | Apellidos y Nombres (Persona Autorizada) | Constancia de Recepción | `"Gomez Torres Ana"` |
| `terceroDocumentoIdentidad` | Documento de Identidad (Persona Autorizada) | Constancia de Recepción | `"48123456"` |

No `documents[]` entries are modelled: RUC inscription is a paper, in-person
procedure (SUNAT counter) in which supporting identity documents are
*exhibited*, not uploaded, and the two companion forms this document defers
(Formulario 2054, Formulario 2046) are out-of-scope separate filings, not
attachments to this one.

## Access notes and judgment calls

1. **This schema is scoped to the natural-person/conjugal-partnership/
   undivided-estate path.** `tipoContribuyente`'s enum models only the six
   Tabla Anexa N° 2 codes relevant to that path (Persona Natural,
   Sociedad Conyugal, Sucesión Indivisa, each Sin/Con Negocio); the
   remaining ~45 codes (all legal-entity forms) require the companion
   Formulario 2054 and Rubro V (Datos de la Empresa), both entirely out of
   scope for this document — matching this registry's established
   convention of scoping a schema to one applicant type and disclosing the
   rest (e.g. `cl/sii/inicio-actividades-personas-naturales`,
   `es/aeat/declaracion-censal-personas-fisicas-modelo-030`).
2. **An undivided estate (Sucesión Indivisa) is exempt from the identity-
   document, sex, and nationality fields**, per the instructions document's
   own text: "De tratarse de una sucesión indivisa, no será obligatorio que
   consigne información referente al documento de identidad, fecha de
   nacimiento y sexo. Lo que sí deberá indicar en forma obligatoria es la
   fecha de inicio de la sucesión." This schema models that exemption via
   `requiredWhen` conditions on `documentoIdentidadTipo`, `documentoIdentidadNumero`,
   `sexo`, `nacionalidad`, and `condicionDomiciliado`, all gated on
   `tipoContribuyente` being one of the four non-sucesión codes; only
   `fechaNacimientoOInicioSucesion` remains unconditionally required (it
   doubles as the estate's own start date).
3. **`nacionalidad` (Tabla Anexa N° 7) is a binary Peruana/Extranjera flag,
   not a country code.** The actual country is captured separately in
   `paisDeProcedencia`, gated `requiredWhen nacionalidad equals EXTRANJERA`.
   This was cross-checked twice — once via the instructions document's own
   numbered casilla-to-tabla mapping (Casilla 49 → Tabla Anexa N° 7), and
   once via exact x/y-coordinate correlation on the printed form itself
   (the "(Tabla 7)" annotation sits directly beneath the "NACIONALIDAD"
   column header) — after an initial raw-text extraction pass produced a
   column-ordering ambiguity between Sexo/Nacionalidad/Domiciliado's three
   adjacent tabla references.
4. **`zonaNombre` is modelled as required only when `zonaCodigo` equals
   `OTROS`, following the more specific numbered casilla instruction**
   ("Cuando el código resulte igual a 12 'otros', se deberá especificar el
   nombre de la zona... en las casillas 38 y 40"), even though the same
   instructions document's own prose description of Casilla 38 is broader
   ("Llenar si su domicilio fiscal se ubica en el interior de una zona").
   The numbered casilla-specific rule is treated as authoritative for this
   schema.
5. **`viaNombre` is modelled as always required, not gated on `viaCodigo`
   equals `OTROS`**, deviating from the letter of the same numbered casilla
   instruction that governs `zonaNombre` above. This is a disclosed,
   deliberate judgment call: every Peruvian tax address requires an actual
   street name (e.g. "Larco" for Avenida Larco) regardless of the
   thoroughfare type selected, and the instructions document's own prose for
   Casilla 40 is self-contradictory on this point ("Llenar si su domicilio
   fiscal se encuentra ubicado en una Avenida, Jirón, Calle, etc.,
   debiendo informar el nombre de la zona, el de la vía o ambos" — read
   literally, this describes filling in the name whenever a vía type is
   selected at all, i.e. essentially always).
6. **`numero`/`kilometro`/`manzana` and `interior`/`departamentoUnidad`/
   `lote` are modelled as six separate optional fields, not one ambiguous
   pair.** The source's own printed grid pairs a primary locator
   (Número, or Kilometro when Tipo de Vía is Carretera, or Manzana when the
   address is located by block) with a secondary locator (Interior, Dpto.,
   or Lote) — only one of each triplet is realistically filled for any
   given address, but modelling all six separately avoids collapsing three
   distinct, mutually-exclusive meanings into one overloaded field.
7. **`condicionInmueble`'s four values (Propio/Alquilado/Cesión en
   Uso/Otros) are sourced from the form's own reverse-side prose** ("deberá
   indicar si su domicilio fiscal corresponde a un local propio, alquilado,
   cesión en uso u otros"), not from a numbered Tabla Anexa — the printed
   form itself shows only a "CONDICIÓN DEL INMUEBLE" heading with no visible
   checkbox breakdown in this cycle's text-layer extraction.
8. **Tabla Anexa N° 1 (CIIU, several hundred codes) and N° 11 (profession/
   occupation, similarly large) are modelled as free-text pattern-validated
   codes, not enums**, per this registry's established convention for large
   external reference tables genuinely too large to enumerate in a schema
   document (cf. `es/aeat`'s own CNAE handling).
9. **Rubro VI (Tributos Afectos) provides six repeatable rows on the
   printed form** (for the full lifetime of a taxpayer's affectation/
   exemption changes); this schema models the first two
   (`tributo1*`/`tributo2*`), the bounded subset relevant to an initial
   inscription declaring one or two tax regimes at once, following this
   registry's established bounded-repeating-group flattening convention
   (e.g. `dk/cpr/notification-of-entry`'s `entrantN`/`childN` fields).
10. **No `documents[]` are modelled.** Unlike this registry's consular/
    immigration schemas (which model a photo or similar physical-counter
    item), RUC inscription requires only *exhibiting* an original identity
    document at the SUNAT counter (Casilla 1.2.2 of the instructions
    document) — no attachment is retained or uploaded for the natural-person
    path this schema covers. The two companion forms the instructions
    document does require attaching (Formulario 2054, for legal entities;
    Formulario 2046, for taxpayers with additional establishments) are both
    out of scope for this natural-person-scoped document, not deferred
    `documents[]` entries.

## Test run (Phase 4)

No live submission was attempted: RUC inscription is an in-person paper
procedure at a SUNAT counter requiring an original identity document to be
physically exhibited (Casilla 1.2.2), and there is no online/unauthenticated
endpoint to submit fabricated data against — the same reasoning already
documented for this registry's other in-person government-counter schemas.

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`_tmp_validate_instance.mjs`, not committed — mirrors the approach used by
`pe/cancilleria/solicitud-visa-dgc-005` and
`vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`): compiles `schema.json`'s
`fields[]` into a JSON Schema draft 2020-12 document checked with `ajv`, plus
a from-scratch evaluator for the shared Condition grammar that checks
`fields[].requiredWhen` (this document has no `documents[]`, so that check is
not applicable here):

```
$ node _tmp_validate_instance.mjs registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json \
    conformance/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/inscripcion-persona-natural-con-negocio.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS

$ node _tmp_validate_instance.mjs registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json \
    conformance/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/afectacion-tributos-extranjero-domiciliado-con-tercero.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'viaNombre' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'viaNombre'
requiredWhen conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-ciiu-pattern-violation.json: 'actividadEconomicaPrincipalCodigoCiiu' set to 'ABC12'
Static (required/type/pattern/enum) validation: FAIL
 - /actividadEconomicaPrincipalCodigoCiiu must match pattern "^[0-9]+$"
requiredWhen conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-tercero-field.json: 'autorizaTercero' set to true
$ # but 'terceroApellidosNombres'/'terceroDocumentoIdentidad' (requiredWhen autorizaTercero equals true) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: FAIL
 - field 'terceroApellidosNombres' is required (requiredWhen matched) but not provided
 - field 'terceroDocumentoIdentidad' is required (requiredWhen matched) but not provided
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
$ node tools/validate.mjs registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json
ok   registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json
ok   registry/pe/sunat/solicitud-inscripcion-ruc-persona-natural/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Peru's other four verticals (screened this cycle, not authored)

Per the GOV-2404 and GOV-2419 cycles' own records: DMV (MTC's driver's-licence
application) remains the other strong pre-scouted, unauthenticated
static-PDF candidate, not re-checked this cycle for a possible AcroForm
revision of its own. Taxes (SUNAT) is Clave-SOL-login-gated; Passport
(Migraciones) and National ID (RENIEC DNI) remain appointment/biometric-gated.
Peru now stands at 2 of 6 verticals (Visa, Business Formation); DMV, Taxes,
Passport, and National ID remain open backlog candidates for a future cycle,
with DMV the strongest lead.
