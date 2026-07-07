# Verification record — `co/cancilleria/visa-application-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1602**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

CATALOG.md's "By Jurisdiction" table showed Colombia (the registry's 19th
jurisdiction, opened GOV-1567) at 3 of its 6 verticals — DMV
(`co/runt/formulario-solicitud-tramites-vehiculo`), Business Formation
(`co/rues/matricula-mercantil`), and Taxes
(`co/dian/declaracion-renta-personas-naturales-formulario-210`) — with
Passport, Visa, and National ID all still open. The prior cycle that closed
Taxes (GOV-1595) had already screened Colombia's Visa channel and logged it as
weaker than the Formulario 210 candidate ultimately authored: "Cancillería
Visa, real fields locked behind a live AJAX wizard session." This cycle
re-screened all three of Colombia's remaining gaps:

- **Passport** (Cancillería): the online form found this cycle
  (`tramitesmre.cancilleria.gov.co/tramites/enlinea/pasaporte/solicitar.xhtml`)
  is a **change/renewal** request (cambio del pasaporte ordinario o
  electrónico) — first-time applicants must already hold a "contraseña por
  primera vez" issued in person by the Registraduría, so this form itself
  does not model a first-time/from-scratch passport application. Left open
  as a backlog candidate for a future cycle focused on the renewal/change
  pathway specifically.
- **National ID**: the Registraduría's "Cédula de ciudadanía digital"
  duplicate-request flow (`registraduria.gov.co/?page=cedula-digital`) is
  described in secondary sources as a short online form (full name, cédula
  number, email, phone, PSE payment) but the Registraduría's own site
  (`registraduria.gov.co`) returned HTTP 403 to every direct fetch attempted
  this cycle (both a plain `curl` and a browser-UA `curl`), so no primary,
  field-level source was reachable. Left open as a backlog candidate.
- **Visa** (this document): the live SITAC wizard itself
  (`tramitesmre.cancilleria.gov.co/tramites/enlinea/solicitarVisa.xhtml`)
  reconfirmed the prior cycle's finding — HTTP 200 but a bot-mitigation
  challenge-script page (`TSPD`/APM), no form markup reachable
  unauthenticated. Independently searching (rather than accepting the prior
  cycle's characterization as final) surfaced a second, distinct source: the
  Cancillería's own "Guía de Usuario: Solicitar Visa en línea" (SITAC), a
  47-page, screenshot-driven, field-by-field walkthrough of the exact same
  wizard, hosted directly and unauthenticated on `cancilleria.gov.co`. This
  was not the source the prior cycle's screening note referred to. This
  cycle authored against it.

## Sources examined

### Source 1 (primary `source`, full field-by-field walkthrough)

- **Authority:** Ministerio de Relaciones Exteriores de Colombia (Cancillería)
- **Document:** "Guía de Usuario: Solicitar Visa en línea" (Sistema Integral
  de Trámites al Ciudadano — SITAC)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.cancilleria.gov.co/sites/default/files/FOTOS2018/guia_del_usuario_solicitar_visa_en_linea.pdf>
  — a genuine (non-image) PDF, 47 pages, whose own cover page states "Fecha
  última actualización 09/03/2018"; still linked from the Cancillería's
  current 2026 visa-services search results and still describing the exact
  live wizard path (`tramitesmre.cancilleria.gov.co/tramites/enlinea/solicitarVisa.xhtml`)
  reconfirmed live this cycle (see Access notes below).
- **Extraction method:** `pdfjs-dist@3.11.174` (pinned per registry
  precedent) for the text layer, plus `canvas`-rendered page screenshots
  (2.5x scale) read directly, since most of the document's field labels live
  inside embedded browser screenshots rather than the PDF's own text layer.
- **Retrieved / reviewed:** 2026-07-07
- **What it confirms:** the full six-tab wizard (Solicitud → Solicitante →
  Visa → Otros → Soportes → Confirmación) for an Individual applicant
  registering their own visa request (Titular Principal) or through an
  apoderado, including every on-screen field label, its required-field
  asterisk (or lack of one), worked-example values, and the §4.1 reference
  table (pp.39-47) naming the full Tipo de Visa × Actividad de Visa taxonomy
  and each combination's own Información Laboral field variations.

### Access notes (live wizard, reconfirmed)

- `tramitesmre.cancilleria.gov.co/tramites/enlinea/solicitarVisa.xhtml`:
  HTTP 200, but the response body is a bot-mitigation loader script
  (`window["loaderConfig"] = "/TSPD/?type=19"`, an `<APM_DO_NOT_TOUCH>`
  challenge payload) with no form markup — matches the prior cycle's
  characterization ("real fields locked behind a live AJAX wizard session")
  and is the reason this document is authored against the guide PDF instead.

## Field inventory (Phase 3)

| Field (schema `name`) | Label (source) | Source / page | Example valid value |
|---|---|---|---|
| `numeroPasaporte` | Número de Pasaporte | p.5 | `"MN9030389"` |
| `nacionalidadSolicitante` | Nacionalidad | p.5 | `"ARGENTINA"` |
| `solicitudDe` | Solicitud de | p.5 | `"VISA"` |
| `tipoVisa` | Tipo Visa | p.5, 39-47 | `"Migrante"` |
| `actividadVisa` | Actividad de la Visa | p.5, 39-47 | `"SOCIO / PROPIETARIO"` |
| `tipoSolicitud` | Tipo Solicitud | p.5 | `"INDIVIDUAL"` |
| `tipoSolicitante` | Tipo de Solicitante | p.5-6 | `"TITULAR"` |
| `tramitadaPor` | Tramitada por | p.6, 10 | `"DIRECTAMENTE POR EXTRANJERO"` |
| `apoderadoTipoDocumento` … `apoderadoCorreoElectronico` | Información Apoderado (9 fields) | p.10 | — |
| `primerNombre` / `primerApellido` / etc. | Datos Personales | p.4, 10 | `"HEATHER"` / `"SMITH"` |
| `sexo` | Sexo | p.10 | `"MASCULINO"` |
| `estadoCivil` | Estado Civil | p.10 | `"CASADO(A)"` |
| `tieneOtraNacionalidad` | ¿Tiene otra Nacionalidad? | p.10 | `false` |
| `nivelAcademico` | Nivel Académico | p.11, 19 | `"Postgrado - Doctorado"` |
| `areaConocimiento` | Área de Conocimiento | p.11, 19 | `"Matemáticas y Ciencias naturales"` |
| `subareaConocimiento` | Subárea de Conocimiento | p.11, 19 | `"Biología, Microbiología y afines"` |
| `fechaNacimiento` | Fecha de Nacimiento | p.11, 19 | `"1980-01-01"` |
| `paisNacimiento` | País Nacimiento | p.11, 19 | `"CANADA"` |
| `paisDomicilio` | País (Último Domicilio) | p.11 | `"COLOMBIA"` |
| `ciudadMunicipioDomicilio` | Ciudad/Municipio | p.11 | `"BOGOTA, BOLIVAR"` (verbatim) |
| `direccionDomicilio` | Dirección | p.11 | `"CLL 123# 21-21"` |
| `telefonoDomicilio` | Teléfono | p.11 | `"5162000"` |
| `deseaNotificacionesCorreo` | ¿Tiene correo electrónico y desea recibir notificaciones...? | p.11 | `true` |
| `correoElectronico` / `confirmacionCorreoElectronico` | Correo Electrónico / Confirmación | p.11 | `"correo@mail.com"` |
| `profesion` | Profesión | p.13 | `"Ingeniero Civil"` |
| `actividadUOcupacion` | Actividad u ocupación | p.13 | `"Socio de empresa comercial"` |
| `descripcionActividadUOcupacion` | Descripción de actividad u ocupación | p.13 | `"Administración de sociedad comercial en Bogotá"` |
| `entidadFamiliaInversion` | Entidad / Familia / Inversión | p.13 | `"Comercializadora Andina S.A.S."` |
| `haTenidoVisaColombiana` | ¿Ha tenido Visa Colombiana? | p.12-13 | `true` |
| `visaAnteriorTipo` … `visaAnteriorLugarExpedicion` | Visa Anterior (4 fields) | p.13 | `"V-778899"` |
| `leHaSidoNegadaVisa` | ¿Le ha sido negada alguna solicitud de visa anteriormente? | p.12 | `false` |
| `leHaSidoCanceladaInadmitidaVisa` | ¿Le ha sido cancelada/inadmitida alguna visa? | p.12 | `false` |
| `haSidoExpulsadoColombia` / `haSidoDeportadoColombia` / `tieneProcesosPenales` / `haPermanecidoSinVisaAutorizada` | Información Adicional (4 booleans) | p.14 | `false` / `false` / `true` / `false` |
| `especifique` | Especifique | p.14 | `"Proceso penal por accidente de tránsito menor, archivado en 2022."` |
| `familiarResideColombia` | ¿Algún familiar suyo reside en Colombia? | p.14-15 | `true` |
| `parentescoFamiliar` / `tipoVisaFamiliar` | Parentesco / Tipo Visa (familiar) | p.15 | `"PADRE"` / `"Residente"` |

`documents[]`:

| Document `id` | What it is | Required? |
|---|---|---|
| `fotoDigital` | 4cm×3cm color photo, white background, JPG ≤300KB | Yes |
| `copiaPasaportePrincipal` | Passport data-page copy | Yes |
| `copiaPasaporteUltimoSello` | Last entry/exit stamp page copy | Yes |
| `copiaVisaAnteriorSinOCR` | Prior visa page copy (non-OCR editions) | Yes (conditionally exempt per source text — see judgment call 8) |
| `poderApoderado` | Power of attorney | Only when `tramitadaPor = APODERADO` |
| `soporteContratoOActividadLaboral` | "Resumen de contrato" form + financial/identity proof (Individual) | Yes |

## Access notes and judgment calls

1. **Scope is deliberately narrowed to the Individual, Titular Principal
   pathway.** The guide's own prose defines four gating dropdowns
   (`tipoSolicitud`, `tipoSolicitante`, `tramitadaPor`, `solicitudDe`) each
   with exactly two values; this document models both values of each as a
   genuine enum (since both are named in the guide's own bullet-point
   definitions) but only walks the INDIVIDUAL × TITULAR downstream flow
   field-by-field. The GRUPO FAMILIAR pathway's own beneficiary-linking
   sub-flow (Búsqueda del Titular modal, pp.7-9) and the BENEFICIARIO
   applicant's own distinct Información Laboral field set (Ocupación en
   Colombia / Familia / Institución, p.13) are out of scope for this v1.0.0.
2. **`tipoVisa`'s enum is sourced from the guide's own §4.1 table headers,
   not fully from the live dropdown.** Only one on-screen example is shown
   selected ("MIGRANTE (M)"), but the guide's own reference table (pp.39-47)
   independently uses exactly three category names — Visitante, Migrante,
   Residente — as its own section headers, naming every one of the ~38
   documented `actividadVisa` values under one of the three. The enum here
   uses that table's own plain-text form; the on-screen single-letter
   parenthetical code confirmed only for Migrante ("(M)") is not
   extrapolated onto the other two.
3. **`actividadVisa` is modelled as an open string, not an enum, despite the
   guide's own table naming ~38 concrete values.** Each value gates a
   different, often disjoint, Información Laboral field set (documented
   across 8 dense pages, pp.39-47) — modelling that full conditional field
   matrix is out of scope for this v1.0.0. Only the generic fallback field
   set the guide itself defines for "los tipos de visas no incluidos en la
   tabla anterior" (`profesion`, `actividadUOcupacion`,
   `descripcionActividadUOcupacion`, `entidadFamiliaInversion`) is modelled.
   A future minor version could add the per-`actividadVisa` field variants
   once scoped against a real applicant scenario.
4. **The guide's own worked example (pp.10-12, "HEATHER"/"JOHN SMITH ADAMS")
   is internally inconsistent about whether it is a Titular or a
   Beneficiario walkthrough**, and this document's Información Laboral
   fields deliberately follow the guide's own *reference table* rather than
   that worked example. Step 5 (p.5) shows `tipoSolicitante` = "TITULAR
   PRINCIPAL" selected, but the same Sección Visa screenshot (p.12) shows a
   field literally labelled "Nombre del Titular de la Visa" — a field the
   guide's own Beneficiario field table (p.13) does not name at all (it
   names "Familia" instead in that slot). Rather than silently reconcile
   this, this document models the fields the guide's own *prose reference
   table* states apply to the Titular/non-listed-`actividadVisa` case
   (`profesion`/`actividadUOcupacion`/`descripcionActividadUOcupacion`/
   `entidadFamiliaInversion`), and does not include the worked example's own
   "Nombre del Titular de la Visa" field, since that field only makes sense
   for a Beneficiario, out of this document's scope.
5. **`sexo`, `estadoCivil`, `apoderadoTipoDocumento`, `visaAnteriorTipo`,
   `parentescoFamiliar`, and `tipoVisaFamiliar` are modelled as open
   strings.** Every one of these is shown on-screen as a dropdown in its own
   "Seleccione..." (unselected) state, never opened or filled with a
   confirmed value — no enum is fabricated for any of them.
6. **`ciudadMunicipioDomicilio`'s confirmed on-screen example
   ("BOGOTA, BOLIVAR") is preserved verbatim** even though Bogotá is
   administratively part of Cundinamarca, not Bolívar, in reality — a
   genuine on-screen data quirk in the source's own worked example (the same
   discipline already used for `id/imigrasi/passport-application-first-adult`'s
   "Imigration Office" (sic) label), not an authoring transcription error.
7. **`especifique`'s `requiredWhen` combines all four Información Adicional
   booleans with `any`**, per the guide's own instruction: "Si por lo menos
   a una de estas preguntas la respuesta dada es SI, diligencie el campo
   Especifique."
8. **`copiaVisaAnteriorSinOCR`'s required-document row (Documentos Soporte
   table, item 3) states a conditional exemption in its own descriptive
   text** ("En caso de que ésta hubiere sido otorgada con el OCR este
   requisito no será necesario") while its own machine-readable "Obligatorio"
   table column reads "Sí" unconditionally. Modelled as `required: true`
   (matching the table's own governing column) with the exemption text
   preserved verbatim in `handling` rather than silently applied as a
   `requiredWhen`, since the source itself does not specify a checkable
   condition (whether a given visa was "otorgada con el OCR") that this
   schema's own fields expose.
9. **`poderApoderado` uses `requiredWhen` against `tramitadaPor`, diverging
   from the source table's own unconditional "Obligatorio: Sí".** The same
   table row's own Nombre text states the actual condition ("Si el trámite
   va a ser finalizado por un apoderado..."), and a poder (power of
   attorney) is meaningless when the applicant registers directly — this is
   a deliberate authoring choice to use the more precise conditional
   signal already available in this document (`tramitadaPor`) rather than
   the table's own blanket column value.
10. **`soporteContratoOActividadLaboral` bounds a materially larger,
    branching requirement (persona natural / persona jurídica / ONG, each
    with a different minimum-bank-balance-in-SMLMV threshold) into one
    document entry** with the full conditional text preserved verbatim in
    `handling`, rather than three separate document entries — the schema's
    `documents[]` model has no native "one-of-N" alternative-requirement
    construct. The source's own parallel Grupo Familiar version (table row
    6) and its state/international-organization-employer alternative (row
    7, which replaces this entire requirement with a single letter) are
    both out of scope for this v1.0.0, consistent with the Grupo Familiar
    scope exclusion (judgment call 1).
11. **Prior-visa fields (`visaAnteriorTipo` through
    `visaAnteriorLugarExpedicion`) are modelled `visibleWhen`
    `haTenidoVisaColombiana = true` but not `requiredWhen`-gated required**,
    since none of the four is shown with a required-field asterisk in the
    source even in the "Sí" state screenshot (p.13).
12. **The Liquidación de Estudio de Visa (visa-study-fee payment) step
    (§3.2, pp.21-26) is out of scope.** It is a materially separate flow
    (bank-branch payment, foreign-consulate-bank payment, or PSE) gated on
    whether the specific `actividadVisa` requires a paid study at all — a
    conditional this document does not model (see judgment call 3) — and is
    a natural candidate for a follow-up minor version.
13. **The post-submission status states** (Solicitud con Requerimiento de
    Información, Inadmitida, Negada, Aprobada, Publicada — §3.5, pp.34-38)
    **and the Confirmación tab's own read-only recap are out of scope**, per
    the same discipline this registry already applies to review/attestation
    screens with no independent field content of their own.

## Test run (Phase 4)

No live submission was attempted: the live wizard
(`tramitesmre.cancilleria.gov.co/tramites/enlinea/solicitarVisa.xhtml`) is
bot-mitigation-gated (see Access notes above) and, even if reached, filing a
real visa application against a foreign government's immigration system with
fabricated identity data is not a safe or reversible action — the same
reasoning already documented for this registry's other government-portal
schemas (e.g. `id/imigrasi/evisa-visitor-visa-application`).

Instead, two independent worked mock records were built from this document's
own field inventory — (A) an individual applicant registering directly, no
prior Colombian visa, no Información Adicional flags; (B) an individual
applicant registering through an apoderado, a Traspaso request with a prior
visa on file, and one Información Adicional flag (`tieneProcesosPenales`)
triggering the conditional `especifique` field — and checked programmatically
against every field's own `required`/`requiredWhen`/`validation` (`enum`,
`pattern`, `maxLength`) keyword and the `emailMustMatchConfirmation`
`crossFieldValidation` rule, using a small purpose-built interpreter for the
`Condition` grammar (§8.1). Both mock records pass with zero errors. Two
negative controls were also run and correctly rejected: a mismatched
`correo`/`confirmación` pair (caught by `crossFieldValidation`), and mock B
with `apoderadoPrimerNombre` deleted while `tramitadaPor = APODERADO` (caught
by `requiredWhen`). A third check confirmed every field in `fields[]` appears
in exactly one `steps[].fields` array. Both meta-schema validators
(`tools/validate.mjs` and `tools/validate-ajv.mjs`) were run against the
finished document and pass clean (256/256 and 256/256 respectively, alongside
every other document already in the registry).
