# Verification record — `ec/cancilleria/formulario-solicitud-visa` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3305**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Every jurisdiction already in the registry (62 at the start of this cycle)
had at least one prior cycle screen every one of its remaining open vertical
gaps, and the large majority were re-confirmed dead ends this same cycle
(Japan DMV/Passport, Uruguay Taxes/Passport/National ID, Pakistan
Passport/Visa/National ID, Peru Passport/National ID, Chile
Passport/Visa/National ID, Spain Passport/Visa, Sri Lanka Business Formation,
North Macedonia/Slovakia/Netherlands/Poland Visa, Malaysia Taxes, Jordan
DMV/Business Formation/National ID — see CATALOG.md's own accumulated
screening notes). Rather than re-scout an already-exhausted gap, this cycle
opened a brand-new 63rd jurisdiction: Ecuador, not previously modelled at
all. A targeted web search for Ecuador's own government visa/immigration
form found:

- **SRI (tax authority) RUC registration forms** (`FORMULARIO RUC01A`, a
  genuine PDF for business-registry inscription): the SRI web server itself
  did not respond to a direct connection attempt this cycle (`curl`: exit 28,
  connection timeout) — a candidate for a future cycle once connectivity is
  re-checked, not pursued here.
- **Registro Civil identity-card issuance**: the citizen-facing service page
  describes in-person/online-portal issuance with no downloadable static
  application form found.
- **Cancillería (Ministry of Foreign Affairs and Human Mobility) visa
  application form** — the strongest candidate found: a current (dated
  January 2025 in its own upload path), genuine 45-widget AcroForm PDF
  hosted directly by the Ministry, covering all four of its visa categories
  (temporary residence, permanent residence, temporary visitor, diplomatic)
  and five request types (application, certificate, renewal, transfer,
  cancellation) in one unified bilingual form. This document authors that
  candidate, opening Ecuador's Visa vertical (1 of 6).

## Sources examined

### Primary source

- **Authority:** Ministerio de Relaciones Exteriores y Movilidad Humana
  (Cancillería)
- **Document:** Formulario de Solicitud de Visa / Visa Application Form
- **URL (directly retrieved, HTTP 200, `application/pdf`):**
  `https://www.cancilleria.gob.ec/wp-content/uploads/2025/01/formulario_solicitud_visa0165183001736872889-1.pdf`
- **File identity:** `sha256:79707ebe96b7e28893e66e0c0780f279da3facbfd855ef5231cc0ee38e33fbf0`,
  213,407 bytes.
- **TLS caveat, disclosed rather than worked around silently:** this exact
  URL's certificate chain is missing an intermediate certificate — both
  `curl` and Node's global `fetch` (the same client `tools/verify-sources.mjs`
  uses) fail standard TLS verification against it (`unable to get local
  issuer certificate`). This is a server-side misconfiguration on
  `www.cancilleria.gob.ec`, not evidence the document is stale, fabricated,
  or gated: the file was still retrieved successfully with certificate
  verification disabled (`curl -k`), confirmed a genuine, well-formed
  `%PDF-1.6` file, and is **byte-identical** (same sha256, same 213,407
  bytes) to an independently-fetched archive.org snapshot taken 2026-01-28 —
  itself found via the Wayback Machine's `available` API, not manually
  guessed. Because this repository's own `source.url` field must resolve
  over standard TLS for future automated re-verification, `source.url`
  points at that archive.org snapshot instead of the (currently
  TLS-misconfigured) Ministry URL directly; the Ministry URL above remains
  the authoritative origin and is unchanged in content from the archived
  copy.
- **Extraction method:** `pdfjs-dist` (legacy build) for both the AcroForm
  widget inventory (`doc.getFieldObjects()`) and the text layer
  (`page.getTextContent()`, position-sorted by `item.transform[4]`/`[5]` for
  x/y), plus a direct page render via `pdfjs-dist` + `node-canvas` at 2.2x
  scale to visually confirm widget-to-label correlation where the
  coordinate-only heuristic was ambiguous (see judgment call 1 below).
- **Retrieved / reviewed:** 2026-07-16

### Alternative sources considered and not used

- **SRI (Servicio de Rentas Internas) `FORMULARIO RUC01A`** (business-registry
  inscription form) — a genuine PDF surfaced by search, but `sri.gob.ec` did
  not respond to a direct fetch attempt this cycle (`curl` exit 28,
  connection timeout over both HTTP and HTTPS). Left as an unscreened
  backlog candidate for Ecuador's Business Formation vertical for a future
  cycle, not a confirmed dead end.
- **SRI individual income-tax declaration** (`Formulario 102`/`102A`) — the
  SRI's own guidance describes filing exclusively through the authenticated
  "SRI en línea" web portal; no downloadable blank return form was found
  independent of that same connectivity issue, so this was not conclusively
  screened either way this cycle.
- **Registro Civil identity-card request** — the citizen-facing service page
  (`registrocivil.gob.ec/emision-de-documentos-de-identidad/`) describes
  first-issuance/renewal/duplicate handling via in-person appointment or an
  online citizen portal (`servicios.registrocivil.gob.ec`) requiring
  registration; no downloadable static application-form PDF was found in
  this cycle's search results. Not conclusively screened as a hard dead end
  (a future cycle with direct portal access could still find a genuine
  source), but not pursued further this cycle in favor of the
  stronger-sourced Cancillería visa form.

## Field inventory (Phase 3)

The AcroForm carries 45 `Widget` annotations, all on page 1 (the form's only
page): 29 `Tx` plain-text fields (named `Texto1`-`Texto30`, skipping
`Texto28`) and 16 `Btn` checkbox fields (named `Casilla de verificación1`-`16`).
None carry a self-documenting `alternativeText` tooltip. Because several rows
share ambiguous coordinate proximity to more than one printed caption
(especially the Estado Civil/Sexo checkbox grid, where five and two
checkboxes respectively sit close to multiple adjacent labels), this document
was correlated using both position-matching and a direct visual render,
cross-checked against the rendered image before assignment.

| Field (schema `name`) | Label (source) | AcroForm widget | Example valid value |
|---|---|---|---|
| `visaCategory` | Residencia Temporal / Permanente / Visitante Temporal / Diplomático | `Casilla de verificación1`-`4` | `"RESIDENCIA_TEMPORAL"` |
| `requestType` | Solicitud / Certificado-Visa / Renovación / Transferencia / Cancelación | `Casilla de verificación5`-`9` | `"SOLICITUD"` |
| `passportNumber` | Número de Pasaporte | `Texto1` | `"AB1234567"` |
| `passportCountryOfIssue` | País Donde se Emitió Pasaporte | `Texto2` | `"Colombia"` |
| `passportIssueDate` | Fecha de Emisión | `Texto3` | `"2022-03-10"` |
| `passportExpiryDate` | Fecha de Expiración | `Texto4` | `"2032-03-10"` |
| `apellidos` | Apellidos | `Texto13` | `"Restrepo Gómez"` |
| `nombres` | Nombres | `Texto14` | `"Valentina"` |
| `lugarNacimiento` | Lugar de Nacimiento | `Texto5` | `"Medellín, Colombia"` |
| `fechaNacimiento` | Fecha de Nacimiento | `Texto6` | `"1995-06-21"` |
| `nacionalidad` | Nacionalidad | `Texto7` | `"Colombiana"` |
| `ocupacion` | Ocupación | `Texto8` | `"Ingeniera de software"` |
| `estadoCivil` | Estado Civil (Soltero/Casado/Viudo/Divorciado/Unión de Hecho) | `Casilla de verificación10`-`14` | `"SOLTERO"` |
| `sexo` | Sexo (Femenino/Masculino) | `Casilla de verificación15`-`16` | `"FEMENINO"` |
| `direccionEcuador` | Dirección Ecuador | `Texto10` | `"Av. Amazonas N34-120"` |
| `ciudad` | Ciudad | `Texto11` | `"Quito"` |
| `provincia` | Provincia | `Texto12` | `"Pichincha"` |
| `correoElectronico` | Correo Electrónico Principal | `Texto15` | `"valentina@example.com"` |
| `telefonoMovil` | Número Teléfono Móvil | `Texto16` | `"+593 99 123 4567"` |
| `telefonoDomicilio` | Número Teléfono Domicilio | `Texto17` | `"+593 7 234 5678"` |
| `entidadAuspiciante` | Entidad Auspiciante | `Texto18` | `"Tech Solutions Ecuador S.A."` |
| `nombreResponsableEntidad` | Nombre del Responsable en la Entidad Auspiciante | `Texto19` | `"Carlos Andrade"` |
| `categoriaVisa` | Categoría de Visa que Desea Aplicar | `Texto20` | `"Visa de Residencia Temporal por Relación Laboral"` |
| `documentoEntregado1`-`9` | Documentos Entregados, items 1.- through 9.- | `Texto29`, `Texto9`, `Texto21`-`27` (in that item order) | `"Copia de pasaporte vigente"` |
| `resumenPeticion` | En Texto Resuma su Petición de Visa | `Texto30` | `"Solicito visa de residencia temporal..."` |

Not modelled (excluded and disclosed, not silently dropped):

- The printed wet-ink signature line ("FECHA/Date" and "FIRMA/Signature",
  bottom of page) — no corresponding AcroForm widget exists at that position;
  a physical signature captured after printing, consistent with this
  registry's existing convention for consular/immigration forms (e.g.
  `pe/cancilleria/solicitud-visa-dgc-005`, `uy/mrree/formulario-unificado-de-visas`).
- The entire "Para Uso Oficial / For official use only" block (Arancel,
  Valor, Fecha de Autorización, Observaciones, and the responsible
  official's own name/signature line) — Ministry-staff-only case-processing
  fields, not applicant-facing, and no AcroForm widgets exist there either.

## Access notes and judgment calls

1. **Widget-to-label correlation required a direct page render, not just
   coordinate matching.** A first pass matching each field's rect to the
   nearest text below it (mirroring this registry's usual "field box, then
   bilingual caption beneath it" heuristic) produced ambiguous or wrong
   results for two groups: (a) the passport-number row's four fields, whose
   own bilingual captions actually sit *inside* each field's rect near its
   bottom edge (an italic placeholder-style caption), not fully below it, so
   an over-wide matching window pulled in the *next* row's captions instead;
   and (b) the Estado Civil/Sexo checkbox grid, where five and two
   checkboxes respectively sit close to more than one adjacent label in a
   non-uniform 2-row grid. Both were resolved by rendering the page to a PNG
   at 2.2x scale via `pdfjs-dist` + `node-canvas` and visually reading the
   grid layout directly, then re-deriving each widget's assignment from the
   confirmed visual row/column position. This is disclosed because a
   coordinate-only heuristic, used alone, would have mis-assigned several
   fields.
2. **`visaCategory` and `requestType` are each collapsed from independent
   checkbox widgets into a single `enum` field**, per this registry's
   convention already established by `pe/cancilleria/solicitud-visa-dgc-005`'s
   `visaType`/`maritalStatus`/`sexo` fields — the source implements no
   structural (e.g. radio-group) exclusivity of its own, but the printed
   options are mutually exclusive by their own meaning.
3. **`telefonoDomicilio`, `entidadAuspiciante`, and
   `nombreResponsableEntidad` are `required: false`; every other mapped
   field defaults to `required: true`.** The form prints no asterisk or
   other required/optional marker system anywhere. `telefonoDomicilio` is
   optional because a home landline is not universal once a mobile number is
   already captured. `entidadAuspiciante`/`nombreResponsableEntidad` are
   optional because a sponsoring organisation is only meaningful for
   residence/work-based applications, not every `visaCategory` value (e.g. a
   Visitante Temporal tourist), and the source provides no `requiredWhen`-
   style visibility instruction of its own to gate these fields on
   `visaCategory` explicitly — treating them as unconditionally required
   would over-constrain applicants who genuinely have none to name.
4. **The nine `documentoEntregadoN` fields are modelled as free text, not a
   `documents[]` array.** The source prints nine identically-blank numbered
   lines (1.- through 9.-) for the applicant to self-list whichever
   supporting materials are physically attached; it names no fixed document
   types of its own (unlike, e.g., `pe/cancilleria/solicitud-visa-dgc-005`'s
   single named `applicantPhoto` requirement). A `documents[]` entry requires
   a fixed, non-empty `label`, which would misrepresent this source's actual
   blank-checklist structure; nine optional string fields instead preserve
   the source's own shape faithfully.
5. **`categoriaVisa` is distinct from `visaCategory`.** The source prints
   both: a checkbox grid naming the four broad application types
   (`visaCategory`), and a separate free-text line ("Categoría de Visa que
   Desea Aplicar") where the applicant names the specific visa
   sub-category/legal basis (e.g. a specific statutory clause) being
   requested under that broad type. Modelled as two separate fields rather
   than conflated into one.

## Test run (Phase 4)

No live submission was attempted: Ecuador's visa process is
consular/Ministry-counter (printed, signed by hand, and submitted with
original supporting documents), not a portal accepting programmatic
submissions, and submitting fabricated identity data against a foreign
government's consular/immigration process is not a safe or reversible
action — the same reasoning already documented for this registry's other
consular/immigration schemas (e.g. `pe/cancilleria/solicitud-visa-dgc-005`,
`uy/mrree/formulario-unificado-de-visas`, `co/cancilleria/visa-application-individual`).

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by those same three
prior schemas): compiles `schema.json`'s `fields[]` into a JSON Schema
document checked with `ajv` (+`ajv-formats` for `date`).

```
$ node validate_instance.mjs registry/ec/cancilleria/formulario-solicitud-visa/1.0.0/schema.json \
    conformance/ec/cancilleria/formulario-solicitud-visa/1.0.0/temporary-resident-first-time-applicant.json
Static (required/type/pattern/enum) validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/ec/cancilleria/formulario-solicitud-visa/1.0.0/schema.json \
    conformance/ec/cancilleria/formulario-solicitud-visa/1.0.0/temporary-visitor-married-no-sponsor.json
Static (required/type/pattern/enum) validation: PASS

OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule, built from the first valid fixture:

```
$ # mutation-control-missing-required-field.json: 'passportNumber' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
  - (root) must have required property 'passportNumber'
OVERALL: FAIL

$ # mutation-control-invalid-enum-value.json: 'estadoCivil' set to "EN_PAREJA" (not in the enum)
Static (required/type/pattern/enum) validation: FAIL
  - /estadoCivil must be equal to one of the allowed values
OVERALL: FAIL

$ # mutation-control-maxlength-violation.json: 'passportNumber' set to a 25-character string (maxLength: 20)
Static (required/type/pattern/enum) validation: FAIL
  - /passportNumber must NOT have more than 20 characters
OVERALL: FAIL
```

All five fixtures behaved exactly as expected. `registry/validate.mjs` and
`registry/validate-ajv.mjs` (this registry's own zero-dependency structural
validator and full meta-schema validator, respectively) both pass on
`schema.json` itself.
