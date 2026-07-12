# Verification record — `uy/dgi/inscripcion-actualizacion-empresas-formulario-0351` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2449**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions. This
cycle opens **Uruguay as GovSchema's 39th jurisdiction**, via the Business
Formation vertical (1 of 6).

## Why this candidate

The brief handed a specific, already-scouted candidate: DGI/BPS's
Formulario 0351, "Declaración de Registro: Inscripción y Actualización —
Empresas y Otras Entidades Unipersonales o Pluripersonales," reported
reachable, unauthenticated, and a genuine 501-widget AcroForm. This cycle
re-verified that report from scratch rather than trusting it.

## Sources examined

### Source 1 (primary `source`, canonical DGI-hosted PDF)

- **Authority:** Dirección General Impositiva (DGI), jointly with Banco de
  Previsión Social (BPS) — this is a shared DGI/BPS declaration; a single
  filing updates both organisms' registries at once.
- **Document:** Formulario 0351, "Declaración de Registro: Inscripción y
  Actualización — Empresas y Otras Entidades Unipersonales o
  Pluripersonales" (Versión 05)
- **URL (directly retrieved via `curl`, HTTP 200, no login/CAPTCHA/WAF):**
  <https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/2023-09/Formulario%2B0351%2BV05.pdf>
- **File identity:** `sha256:339eb84796fa651c4c1354e4677c216d57048c575eb6d12b96864466861fbf69`,
  499,137 bytes, retrieved 2026-07-12.
- **AcroForm structure, confirmed via `pdfjs-dist` (legacy build)
  `page.getAnnotations()`:** 2 pages, 501 total widgets — 267 `Btn`
  (checkbox/radio), 224 `Tx` (text), 10 `Ch` (choice/dropdown), matching the
  prior scouting pass's counts exactly (re-derived independently, not copied
  from the brief).
- **Extraction method:** `pdfjs-dist` `getAnnotations()` per page for the
  field name (`T`)/type (`FT`)/tooltip (`TU`)/export-value inventory, plus
  `getTextContent()` for the full printed text, plus a full-page render to
  PNG at 2.2x scale via `pdfjs-dist` + `node-canvas` for both pages, to
  visually confirm the Rubro layout and resolve several field-name-vs-Rubro
  ambiguities the raw widget/text dumps alone left unclear (see judgment
  calls below).

### Source 2 (landing/download page)

- **URL:** <https://www.gub.uy/direccion-general-impositiva/tramites-y-servicios/formularios/formulario-0351-inscripcion-actualizacion-empresas-otras-entidades>
- Confirms this is the current, single published copy of Formulario 0351
  (487.44 KB listed, matching the 499,137-byte download); no newer version
  is linked from this page.

### Source 3 (DGI/BPS's own instructivo — casilla-level requiredness rules)

- **URL:** <https://www.bps.gub.uy/1150/instructivo-form-351-inscripcion-y-actualizacion.html>
  (PDF fetched via WebFetch after a direct `curl` guess at a differently-named
  URL 404'd; the actual PDF is titled "INSTRUCTIVO Form 0351 Versión 03" —
  an older instructivo revision than the V05 form itself, but its
  Rubro-by-Rubro completion rules match the V05 form's own Rubro structure
  1:1 and are the only authoritative prose guidance DGI/BPS publish for this
  form).
- Extracted via `pdfjs-dist` `getTextContent()`. Cited per-field via
  `sourceRef` throughout `schema.json` and in the field inventory below.
  This source is what confirms, for example, that `rut` is only required on
  a restart/modification filing, that Teléfono fijo/móvil requires at least
  one of the two, that Rubro 4 (Domicilio Constituido) is skipped entirely
  when it equals the fiscal address, and that Rubro 9 (Datos del Titular)
  applies "solamente en las inscripciones de entidades hasta con dos
  personas físicas" (only to unipersonal filings with up to two linked
  physical persons) — the load-bearing fact behind this schema's
  owner/second-person design.

### Source 4 (web search — legal-currency check)

- Searched for a V06 revision or a newer DGI/BPS resolution superseding
  Formulario 0351 V05. No newer version surfaced; every result (DGI's own
  page, BPS's own instructivo page, and several third-party accounting-firm
  explainer blogs) still references Formulario 0351 without a V06. **Negative
  check: V05 (2023-09) remains the current, in-force version as of
  2026-07-12.**
- This search also surfaced that Formulario 0351 has a companion form,
  **Formulario 0352**, "Inscripción, Actualización o Baja de Personas
  Físicas Vinculadas" — used specifically to register/update/remove the
  physical persons (partners, administrators, representatives, owners)
  linked to a pluripersonal entity. This independently corroborates this
  schema's scoping decision to exclude the full multi-partner roster from
  Formulario 0351 itself (see judgment call 1 below): that roster genuinely
  lives in a separate form, not merely in an unmodeled section of this one.

## Field inventory (Phase 3)

All Rubro references below are the form's own printed section headers,
confirmed via the page-1/page-2 PNG renders described above.

| Field (schema `name`) | Label (source) | Rubro | Example valid value |
|---|---|---|---|
| `tipoActo` | Acto que se realiza | Rubro 1 | `"inicio_actividades"` |
| `vigenciaActoFecha` | Vigencia del acto (Día/Mes/Año) | Rubro 1 | `"2026-07-01"` |
| `rut` | Nº de RUT | Rubro 1 | `"213456780015"` |
| `numeroRegistroContribuyenteBps` | Nº de Registro de Contribuyente | Rubro 1 | `"123456"` |
| `numeroRegistroEmpresaDgi` | Nº de Registro de Empresa | Rubro 1 | `"7654321"` |
| `tipoEntidad` | Tipo de entidad | Rubro 2 | `"persona_fisica"` |
| `nombreDenominacion` | Nombre o denominación | Rubro 2 | `"María Fernanda Rodríguez Silva"` |
| `nombreFantasia` | Nombre de fantasía | Rubro 2 | `"Almacén Rodríguez"` |
| `esResidente` | Residente | Rubro 2 | `true` |
| `tieneEstablecimientoPermanente` | No residente con Establecimiento permanente | Rubro 2 | `false` |
| `paisResidencia` | País de residencia | Rubro 2 | `"Argentina"` |
| `domicilioFiscalCalidadOcupante` | Calidad en que ocupa el domicilio fiscal | Rubro 3 | `"arrendatario"` |
| `domicilioFiscalDepartamento` | Departamento | Rubro 3 | `"Montevideo"` |
| `domicilioFiscalLocalidad` | Localidad | Rubro 3 | `"Montevideo"` |
| `domicilioFiscalCalle` | Calle | Rubro 3 | `"Avenida 18 de Julio"` |
| `domicilioFiscalNumero` | Número | Rubro 3 | `"1234"` |
| `domicilioFiscalApartamento` | Apart. | Rubro 3 | `"301"` |
| `domicilioFiscalCodigoPostal` | Código postal | Rubro 3 | `"11200"` |
| `domicilioFiscalTelefonoFijo` | Teléfono fijo | Rubro 3 | `"27091234"` |
| `domicilioFiscalTelefonoMovil` | Teléfono móvil | Rubro 3 | `"099123456"` |
| `domicilioFiscalCorreoElectronico` | Correo electrónico | Rubro 3 | `"almacen@example.com"` |
| `domicilioFiscalOtrosDetalles` | Otros detalles de ubicación | Rubro 3 | `"Entre Yaguarón y Andes"` |
| `domicilioConstituidoIgualAlFiscal` | Indicar si el Domicilio Constituido es igual al Fiscal | Rubro 4 | `true` |
| `actividadPrincipalDescripcion` | Actividad Principal | Rubro 5 | `"Comercio minorista de artículos de almacén"` |
| `actividadPrincipalGrupo` | Grupo | Rubro 5 | `"47"` |
| `actividadPrincipalSubgrupo` | Sub G | Rubro 5 | `"471"` |
| `actividadPrincipalCap` | Cap | Rubro 5 | `"1"` |
| `actividadPrincipalBanda` | Band | Rubro 5 | `"A"` |
| `obligacionIva` | Obligación: IVA (Alta) | Rubro 6 | `true` |
| `obligacionIrpf` | Obligación: IRPF I / IRPF II (Alta) | Rubro 6 | `true` |
| `obligacionIrae` | Obligación: IRAE (Alta) | Rubro 6 | `false` |
| `obligacionMonotributo` | Obligación: MONOTRIBUTO (Alta) | Rubro 6 | `true` |
| `combinaCapitalYTrabajo` | Combina Capital y Trabajo | Rubro 6 | `true` |
| `fechaBalance` | Balance (Día/Mes) | Rubro 7 | `"12-31"` |
| `regimenAportacionBps` | (Industria y comercio / Servicios Personales / Rural / Construcción / Civil) | Rubro 8 | `"industria_comercio"` |
| `titularTipoDocumento` | Tipo de documento | Rubro 9 (person 1) | `"CI"` |
| `titularNumeroDocumento` | Nº de documento | Rubro 9 (person 1) | `"4123456"` |
| `titularPaisOrigenDocumento` | País de origen del documento | Rubro 9 (person 1) | `"Uruguay"` |
| `titularPrimerApellido` | 1º Apellido | Rubro 9 (person 1) | `"Rodríguez"` |
| `titularSegundoApellido` | 2º Apellido | Rubro 9 (person 1) | `"Silva"` |
| `titularPrimerNombre` | 1º Nombre | Rubro 9 (person 1) | `"María"` |
| `titularSegundoNombre` | 2º Nombre | Rubro 9 (person 1) | `"Fernanda"` |
| `titularFechaNacimiento` | Fecha de Nacimiento | Rubro 9 (person 1) | `"1988-03-14"` |
| `titularEstadoCivil` | Estado Civil | Rubro 9 (person 1) | `"soltero"` |
| `titularSexo` | Sexo | Rubro 9 (person 1) | `"F"` |
| `titularTipoResidencia` | Tipo de residencia | Rubro 9 (person 1) | `"residente"` |
| `titularPaisResidencia` | País de residencia | Rubro 9 (person 1) | `"Argentina"` |
| `titularDomicilioDepartamento` | Departamento (Domicilio Particular) | Rubro 9 (person 1) | `"Montevideo"` |
| `titularDomicilioLocalidad` | Localidad (Domicilio Particular) | Rubro 9 (person 1) | `"Montevideo"` |
| `titularDomicilioCalle` | Calle (Domicilio Particular) | Rubro 9 (person 1) | `"Bulevar Artigas"` |
| `titularDomicilioNumero` | Número (Domicilio Particular) | Rubro 9 (person 1) | `"2456"` |
| `titularDomicilioApartamento` | Apart. (Domicilio Particular) | Rubro 9 (person 1) | `"301"` |
| `titularDomicilioCodigoPostal` | Código postal (Domicilio Particular) | Rubro 9 (person 1) | `"11300"` |
| `titularTelefonoFijo` | Teléfono fijo | Rubro 9 (person 1) | `"27089999"` |
| `titularTelefonoMovil` | Teléfono móvil | Rubro 9 (person 1) | `"099888777"` |
| `titularCorreoElectronico` | Correo electrónico | Rubro 9 (person 1) | `"maria@example.com"` |
| `segundoTitularPresente` | (second "Persona Física (indicar)" block present) | Rubro 9 (person 2) | `true` |
| `segundoTitularVinculo` | Tipo de Vínculos | Rubro 9 (person 2) | `"representante"` |
| `segundoTitularTipoDocumento` | Tipo de documento | Rubro 9 (person 2) | `"CI"` |
| `segundoTitularNumeroDocumento` | Nº de documento | Rubro 9 (person 2) | `"4556677"` |
| `segundoTitularPaisOrigenDocumento` | País de origen del documento | Rubro 9 (person 2) | `"Uruguay"` |
| `segundoTitularPrimerApellido` | 1º Apellido | Rubro 9 (person 2) | `"Fernández"` |
| `segundoTitularPrimerNombre` | 1º Nombre | Rubro 9 (person 2) | `"Ana"` |
| `observaciones` | Observaciones | Rubro 9 | `"Presentación a cargo de contadora pública."` |

No `documents[]` are modelled. DGI/BPS's own instructivo says required
documentation "estará en función del tipo de entidad y del acto que se esté
registrando. La DGI brindará en forma específica el detalle para cada caso
en particular" — i.e. there is no fixed, universal document checklist
published by the authoritative source itself; it is determined case-by-case
at filing. Rather than fabricate a plausible-sounding but unsourced
`documents[]` array (e.g. from third-party accounting blogs), this schema
version omits it — a disclosed omission, consistent with `pe/sunat`'s
sibling Business Formation schema also omitting `documents[]`.

## Access notes and judgment calls

1. **Scoped to the "persona física" (individual/sole-proprietor,
   unipersonal) registration path.** `tipoEntidad`'s enum still lists all 24
   entity-type checkbox values (since they share one field), but this
   schema's remaining field set — most importantly all of Rubro 9 (Datos del
   Titular) — only applies, per the instructivo's own text, to unipersonal
   filings ("Rubro 9 – Datos para la Inscripción del Titular Dueño (Sólo
   para unipersonales)"). The pluripersonal path additionally requires a
   full partner/officer roster, which — per this cycle's web-search
   legal-currency check (Source 4) — is in fact captured by a *separate*
   companion form, Formulario 0352, not merely an unmodeled section of
   Formulario 0351. Also out of scope: Rubro 2's "Fecha de Constitución" and
   "Inscripción en el Registro Nal. Com." fields, which the instructivo
   explicitly restricts to "sociedades con contrato" (contract-based
   companies) — not applicable to an individual.
2. **Rubro 6 (Obligaciones)'s full election matrix is collapsed to four
   boolean flags.** The printed table lists ~20 named DGI/BPS tax
   obligations (IRAE, five IVA sub-variants, four IMESI sub-registrations,
   IMEBA/IMEBA ADIC., PAT-P.F./PAT-Entidades, ITP, ICOSA, MONOTRIBUTO, IRPF
   I/II, IRNR, PRIMARIA, FIS, ENT.ASEGURA.), each with independent
   Alta/Baja columns and up to 5 "Características" sub-roles (01
   Contribuyente, 02 Agente de retención, 03 Agente de percepción, 04
   Responsable por obligaciones tributarias de 3ros, 05 Responsable
   sustituto) — a 267-widget sub-structure within Rubro 6 alone. This
   schema models only `obligacionIva`/`obligacionIrpf`/`obligacionIrae`/
   `obligacionMonotributo` (the four most relevant to a sole proprietor) as
   simple Alta-only booleans; Baja (deregistration), the five
   Características sub-roles, and the IMESI sub-registration numbers are
   all out of scope for v1.0.0.
3. **Rubro 9's second "Persona Física" block is modelled as one boolean
   gate (`segundoTitularPresente`) plus one collapsed `segundoTitularVinculo`
   enum**, rather than the source's full per-person 12-option "Tipo de
   Vínculos" checkbox row (Dueño/Director/Socio/Cónyuge Colab./
   Administrador/Síndico/Socio sin Administración/Socio Administrador
   conjunto/Socio Administrador indistinto/Representante/Repte. Legal
   SAS/Otro) crossed with per-role VF/SS date sub-widgets. This directly
   demonstrates the brief's requested `requiredWhen` pattern: when
   `segundoTitularPresente` is `true` (e.g. because a third-party
   representative/authorized filer is acting on the owner's behalf, one of
   `segundoTitularVinculo`'s values), that person's identity fields
   (`segundoTitularVinculo`, `segundoTitularTipoDocumento`,
   `segundoTitularNumeroDocumento`, `segundoTitularPrimerApellido`,
   `segundoTitularPrimerNombre`) become required; they stay absent and
   optional otherwise. `requiredWhen` is gated on the genuine boolean
   `segundoTitularPresente`, not on `notEquals ""` against an optional
   field, per this registry's documented `notEquals`-empty-string gotcha.
4. **`domicilioFiscalTelefonoFijo` is modelled as required, with
   `domicilioFiscalTelefonoMovil` optional**, even though the instructivo
   actually requires "por lo menos uno" (at least one) of the pair. The
   GovSchema v0.3 `Condition`/`crossFieldValidation` grammar's
   `requirePresent`/`requireAbsent` primitives both mean "all of these
   fields," with no clean "at least one of N" expression available; rather
   than invent a non-standard construct, this schema disclosed-simplifies
   to requiring the fijo variant and leaving móvil optional.
5. **Checkbox `exportValue` collision, disclosed:** the `TActo` (DGI column)
   and `TActoBps` (BPS column) widget groups for Rubro 1's "Acto que se
   realiza" each expose three checkboxes sharing the literal export values
   `Yes`/`No`/`NoNo` across their three rows (Inicio de actividades/Reinicio
   de actividades/Modificación) — the same collision-by-shared-exportValue
   pattern this registry has previously documented for `fi/poliisi`.
   Disambiguation here is by widget rect position (row order), not by
   distinct exportValue strings. Since BPS and DGI must be marked
   consistently for the same election, this schema collapses both widget
   groups into the single `tipoActo` field.
6. **Field-name-prefix-vs-Rubro-number mismatch, resolved via visual
   render.** The AcroForm's internal field names run `R1`..`R11` (e.g.
   `R10.1Ap`, `R11.FNac`), but the printed form has only 9 Rubros. Rendering
   both pages to PNG (`pdfjs-dist` + `node-canvas`, 2.2x scale) confirmed
   that `R10.*`/`R11.*`-prefixed widgets are the two repeatable
   person-data slots *inside* Rubro 9 ("Datos del Titular"), not
   non-existent Rubros 10/11. Likewise, several `R7.*`-prefixed widgets
   (e.g. `R7.Rein1`, `R7.AntSuc`) turned out, on visual inspection, to
   belong to the "Antecedentes"/transfer-reason subsection printed
   directly above the Rubro 8 header rather than to Rubro 7's own
   "Condición" checkboxes — this schema excludes both regardless (judgment
   call 7), so the distinction does not affect any modeled field, but it is
   recorded here since an initial text-only extraction pass mis-attributed
   it.
7. **Rubro 7 (Otros Datos) is excluded except for `fechaBalance`.** The
   instructivo marks "Fecha de balance" obligatory for a start/restart
   filing, so this schema models the first of the printed form's three
   repeatable Día/Mes balance-date slots as `fechaBalance` (bounded
   repeating-group convention). Rubro 7's "Condición" checkboxes
   (Zona Franca usuario directo/indirecto, Imprenta Autorizada (WEB),
   INAC-CVA 30/90 días, Comercio autorizado Tax free, Entidad Colaboradora,
   Administradora de Crédito, Exonerado, etc.) are explicitly conditional
   ("Sólo se completa cuando corresponde") special/niche regimes, and the
   Antecedentes/transfer-reason section only applies when registering as
   successor to a transferred business — neither applies to the common
   first-time individual registration this schema targets, so both are
   out of scope.
8. **`titularEstadoCivil`'s enum is this schema's own vocabulary, not the
   source's.** The printed form has a free text box for "Estado Civil"
   rather than a checkbox group; `soltero`/`casado`/`divorciado`/`viudo`/
   `concubinato` is a reasonable closed set for Uruguay but is not itself
   verified against a DGI-published enumeration — disclosed as a judgment
   call.
9. **`titularNumeroDocumento`/`segundoTitularNumeroDocumento` use a loose
   `^[0-9]{6,9}$` digit pattern**, not Uruguay's Cédula de Identidad
   check-digit algorithm, since `tipoDocumento` can also be DNI or
   Pasaporte (foreign formats) for either person slot.
10. **Domicilio Constituido (Rubro 4) beyond the same-as-fiscal flag is
    out of scope.** Per the instructivo, when `domicilioConstituidoIgualAlFiscal`
    is `true` the rest of Rubro 4 is not completed at all. When `false`,
    the source requires a full separate address (mirroring Rubro 3's own
    structure) that this schema does not model field-by-field — disclosed
    rather than silently dropped, both in this file and in the schema's
    top-level `description`.

## Legal-currency check

Web search for a Formulario 0351 V06 or a superseding DGI/BPS resolution
found none; V05 (dated 2023-09) remains the current, in-force version as of
2026-07-12 (see Source 4 above). Negative result recorded per this
registry's established convention.

## Test run (Phase 4)

No live submission was attempted — Formulario 0351 is a PDF filed with
DGI/BPS, not a self-service online API GovSchema can exercise. Verification
here is against the schema's own structural rules (`tools/validate.mjs`,
`tools/validate-ajv.mjs`) and a hand-rolled conformance-fixture check.

A throwaway Node script (not committed, run locally from `/tmp`) loaded
`schema.json` and each fixture under
`conformance/uy/dgi/inscripcion-actualizacion-empresas-formulario-0351/1.0.0/`,
evaluating every field's `required`/`requiredWhen` and `validation.pattern`/
`validation.enum` rule against each fixture:

| Fixture | Expected | Actual |
|---|---|---|
| `inicio-actividades-unipersonal-comercio-minorista.json` (valid: first-time individual, retail, no representative) | 0 errors | 0 errors |
| `inicio-actividades-unipersonal-con-representante-autorizado.json` (valid: first-time individual, services, with an authorized third-party representative) | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` (drops `nombreDenominacion`) | 1 error, `required` | 1 error, `required` on `nombreDenominacion` |
| `mutation-control-rut-pattern-violation.json` (sets `tipoActo: modificacion` and a malformed `rut`) | 1 error, `pattern` | 1 error, `pattern` on `rut` |
| `mutation-control-missing-conditional-representante-field.json` (`segundoTitularPresente: true` but `segundoTitularPrimerApellido` absent) | 1 error, `required` (conditional) | 1 error, `required` on `segundoTitularPrimerApellido` |

This schema has no `documents[]` array (see above), so there is no
`documents[]`-requiredness blind spot to separately exercise — the
mutation-control set above already covers the three requested error classes
(missing static-required field, pattern violation, missing
`requiredWhen`-gated field) against `fields[]`, which is the schema's only
requirement surface.

Both registry validators pass with 0 errors:

```
$ node tools/validate.mjs registry/uy/dgi/inscripcion-actualizacion-empresas-formulario-0351/1.0.0/schema.json
ok   registry/uy/dgi/inscripcion-actualizacion-empresas-formulario-0351/1.0.0/schema.json
1/1 document(s) passed.

$ node validate-ajv.mjs ../registry/uy/dgi/inscripcion-actualizacion-empresas-formulario-0351/1.0.0/schema.json
ok   registry/uy/dgi/inscripcion-actualizacion-empresas-formulario-0351/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`) and now lists 371 entries.
