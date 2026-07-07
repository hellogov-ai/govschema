# Verification record — `co/cancilleria/passport-citizen-data-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1609**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Colombia (the registry's 19th jurisdiction) had 4 of its 6 verticals modelled
going into this cycle — DMV (`co/runt/formulario-solicitud-tramites-vehiculo`),
Business Formation (`co/rues/matricula-mercantil`), Taxes
(`co/dian/declaracion-renta-personas-naturales-formulario-210`), and Visa
(`co/cancilleria/visa-application-individual`) — with Passport and National ID
open. A prior cycle (GOV-1595) had screened Colombia's Passport candidate and
found only `tramitesmre.cancilleria.gov.co/tramites/enlinea/pasaporte/solicitar.xhtml`,
describing it as "Passport's narrow ~15-field renewal-only scope" and, in more
detail in its own VERIFICATION.md: "the online renewal/change-of-data form...
is unauthenticated with real field IDs, but is legally restricted to
renewal/change only (first-time applicants and minors are in-person-
appointment-only with no field-level document), has only ~15 fields, and one
key dropdown (`inputMotivoSolicitud`) is AJAX-populated so its exact coded
option values are not present in the static HTML."

Rather than accept that as the last word on Colombia's Passport vertical, this
cycle re-examined the live `solicitar.xhtml` form directly:

- Confirmed live and unchanged: 15 fields, exactly as the prior cycle
  described, including the AJAX-gated `inputMotivoSolicitud` dropdown. This
  cycle additionally attempted to trigger the same PrimeFaces AJAX partial
  request the live page issues on `inputTipoPasaporte`'s `onchange` (a raw
  `curl` POST replaying the exact `javax.faces.partial.*` parameters and a
  fresh `javax.faces.ViewState`), which returned a well-formed but genuinely
  empty `<select>` — reconfirming the prior finding that this dropdown's
  coded values are not recoverable from an unauthenticated automated
  request (it appears to depend on the citizen's actual passport record, not
  merely the selected `tipoPasaporte`).
- Searching independently for a Cancillería-published user guide of the
  *same* form (mirroring the technique that resolved Colombia's Visa gap in
  GOV-1602) surfaced a guide, but for a **different, richer form**:
  `tramitesmre.cancilleria.gov.co/tramites/enlinea/registrarCiudadano.xhtml`
  ("Registro de Ciudadano") — the citizen-data-registration step every
  passport applicant (first-time or renewing) completes online *before*
  finishing in person, distinct from and upstream of `solicitar.xhtml`'s
  reason/office-selection step. The prior cycle's own screening did not
  examine this form. This cycle authored against it instead, since it is
  substantially larger (43 fields across 7 sections vs. ~15) and reachable
  as this jurisdiction's genuine first-time/data-registration Passport
  entry point.

## Sources examined

### Source 1 (primary `source`, live form — Datos Documento panel)

- **Authority:** Ministerio de Relaciones Exteriores de Colombia (Cancillería)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://tramitesmre.cancilleria.gov.co/tramites/enlinea/registrarCiudadano.xhtml>
- **Retrieved:** 2026-07-07, via `curl` with a browser `User-Agent`, cookie
  jar preserved across requests.
- **What it confirms:** the form's initial panel (Datos Documento) renders as
  real, unauthenticated JSF/PrimeFaces markup — no WAF/bot-mitigation
  challenge (unlike `solicitarVisa.xhtml`). Confirmed field IDs and static
  `<select>` option lists for `tipoDocumento` (8 values) and `tipoDocumento`'s
  own required-fields summary text. `inputNacionalidad`'s own `<select>`
  ships empty in the static HTML and via a replayed PrimeFaces AJAX
  `valueChange` postback (see judgment call 2) — consistent with the
  Datos Documento panel depending on server-side citizen-record lookups this
  document cannot reproduce with synthetic data.

### Source 2 (secondary, full field-by-field walkthrough for steps 2-7)

- **Document:** "Guía de Usuario – Trámite parcialmente en línea para
  Pasaportes" ("MANUAL DEL USUARIO — REGISTRO DE DATOS A TRAVÉS DE LA PÁGINA
  WEB PARA EL TRÁMITE DE PASAPORTES"), elaborado por Claudia M. Forero /
  Julián Villarreal, revisado y aprobado por Embajadora Maria del Pilar
  Gómez (Coordinadora GIT Pasaportes Calle 53).
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.cancilleria.gov.co/sites/default/files/FOTOS2018/manual_del_usuario_pasaporte.pdf>
  — a genuine (non-image) PDF, 16 content pages (17 numbered pages including
  a blank/cover convention), whose own footer states "Febrero 28 de 2018" and
  names its own screenshot source as
  `https://tramitesmre.cancilleria.gov.co/tramites/enlinea/registrarCiudadano.xhtml`
  — i.e. the guide is explicitly documenting the exact live URL this cycle
  independently confirmed still resolves in 2026.
- **Extraction method:** `pdfjs-dist@3.11.174` for the text layer, plus
  `canvas`-rendered page screenshots (2.5x scale) read directly for every
  page, since the guide's field labels, options, and worked examples live
  inside embedded browser screenshots rather than the PDF's own text layer.
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** the guide walks the form's own Datos Documento →
  (reCAPTCHA/Continuar) → Datos Personales → Datos de Nacimiento → Datos de
  Residencia y Contacto → Información Adicional → Formación Académica →
  Información para actualizar sus datos (security question) flow, with
  on-screen field labels, full dropdown option lists for several fields
  (`sexo`, `estadoCivil`, `identidadEtnica`, `actividadDesempena`,
  `nivelEstudio`), and worked examples (e.g. `tipoDocumento` = "CÉDULA DE
  CIUDADANÍA" auto-resolving `nacionalidad` to "COLOMBIA").

### Cross-check: guide vs. live Datos Documento panel

| Field | Guide (2018) | Live (2026) | Consistent? |
|---|---|---|---|
| `tipoDocumento` options | 7 values (no LICENCIA DE CONDUCCIÓN) | 8 values (adds LC) | Genuine addition since 2018 — disclosed in the field's own `description` |
| `numeroDocumento`, `lugarExpedicion`, `fechaExpedicion` | Present, Datos Documento panel | Present, identical labels/positions | Yes |
| `nacionalidad` auto-fill | Auto-fills "COLOMBIA" for CC | Field ships empty; AJAX replay also returns empty (judgment call 2) | Behavior consistent; coded value only observable via the guide's worked example |
| `fechaNacimiento` | Appears later, in the Datos de Nacimiento panel (p.8) | Appears in the initial Datos Documento panel, asterisked | Site has moved this field since 2018 — disclosed in the field's own `description` |
| Required-fields summary (live panel's own screen-reader text) | n/a | Lists Tipo de Documento, Número de Documento, Nacionalidad, Lugar de Expedición, Fecha de Expedición, Autoriza envío de datos — omits Fecha de Nacimiento despite its on-screen asterisk | Disclosed discrepancy — this document trusts the field's own asterisk |

## Field inventory (Phase 3)

| Field (schema `name`) | Label (source) | Source / page | Example valid value |
|---|---|---|---|
| `tipoDocumento` | Tipo de Documento | Live DOM; Guía p.4 | `"CC"` |
| `numeroDocumento` | Número de Documento | Live DOM; Guía p.5 | `"1023456789"` |
| `nacionalidad` | Nacionalidad | Live DOM; Guía p.5 | `"COLOMBIA"` |
| `lugarExpedicion` | Lugar de Expedición | Live DOM; Guía p.5 | `"BOGOTA"` |
| `fechaExpedicion` | Fecha de Expedición | Live DOM; Guía p.5-6 | `"2010-05-14"` |
| `fechaNacimiento` | Fecha de Nacimiento | Live DOM | `"1995-03-22"` |
| `idAutorizaEnvioDatos` | Consiento que mis datos... | Live DOM; Guía p.6 | `true` |
| `primerNombre` / `segundoNombre` / `primerApellido` / `segundoApellido` | Datos Personales | Guía p.7 | `"CAMILA"` / `"ANDREA"` / `"RODRIGUEZ"` / `"PEREZ"` |
| `estatura` | Estatura | Guía p.7 | `165` |
| `sexo` | Sexo | Guía p.7 | `"FEMENINO"` |
| `estadoCivil` | Estado Civil | Guía p.8 | `"SOLTERO(A)"` |
| `identidadEtnica` | Identidad Étnica | Guía p.8 | `"NINGUNA"` |
| `paisNacimiento` / `ciudadMunicipioNacimiento` | Datos de Nacimiento | Guía p.8-9 | `"COLOMBIA"` / `"BOGOTA"` |
| `paisResidencia` / `ciudadMunicipioResidencia` / `direccionResidencia` | Datos de Residencia y Contacto | Guía p.9 | `"COLOMBIA"` / `"BOGOTA"` / `"CALLE 100 # 15-20"` |
| `telefonoResidencia` / `movilResidencia` / `codigoPostalResidencia` | Teléfono / Móvil / Código Postal | Guía p.9 | `"6013815000"` / `"3001234567"` / `"110111"` |
| `desdeCuandoReside` / `actividadDesempena` | Desde cuando reside / Actividad que desempeña | Guía p.9-10 | `"2020-01-10"` / `"Trabajo calificado"` |
| `deseaNotificacionesCorreo` | ¿Tiene correo electrónico y desea recibir notificaciones...? | Guía p.9-10 | `true` |
| `correoElectronico` / `confirmacionCorreoElectronico` | Correo Electrónico / Confirmación | Guía p.10 | `"camila.rodriguez@example.com"` |
| `viajeHastaSeisMeses` | ¿Está o estará usted en otro país en un viaje de hasta seis meses? | Guía p.10 | `false` |
| `contactoNombres` … `contactoConfirmacionCorreoElectronico` | Información Adicional (8 fields) | Guía p.11 | — |
| `nivelEstudio` | Nivel de Estudio | Guía p.11 | `"UNIVERSITARIO"` |
| `areaConocimiento` / `subareaConocimiento` | Área / Subárea de Conocimiento | Guía p.11-12 | `"Ingeniería, Arquitectura y afines"` / `"Ingeniería de Sistemas"` |
| `preguntaSeguridad` | Pregunta | Guía p.12-13 | `"Nombre de la primera mascota"` |
| `preguntaSeguridadPersonalizada` | Otra Pregunta (personalizada) | Guía p.13 | `"¿Cuál fue tu primer trabajo?"` |
| `respuestaSeguridad` | Respuesta | Guía p.12-13 | `"Firulais"` |

No `documents[]` are modelled: this online step is pure data entry. The
guide's own text states the identity document, photograph, fingerprints, and
signature are all captured **in person** at the passport office ("presentar
los documentos, la toma de la fotografía y el registro de huellas y firma. No
es necesario llevar fotos"), so there is no file-upload control anywhere in
this form.

## Access notes and judgment calls

1. **`nacionalidad`'s coded value is sourced from the guide's single worked
   example, not independently reproduced live.** This cycle attempted to
   replay the live form's own `PrimeFaces.ab` AJAX call
   (`registrarCiudadanoEnLinea:inputTipoDocumento:select:entrada=CC`) with a
   fresh `javax.faces.ViewState` and cookie jar; the response is a
   well-formed partial-response XML but the returned `<select>` has no
   options beyond "Seleccione Nacionalidad" — the live endpoint evidently
   needs additional session state (or genuinely depends on a citizen-record
   lookup) this document cannot reproduce with synthetic data. No enum is
   asserted; the field's own `description` documents the auto-fill behavior
   and its "COLOMBIA" example from the guide.
2. **`tipoDocumento`'s enum includes `LC` (Licencia de Conducción), confirmed
   only in the live 2026 DOM, not in the 2018 guide's own screenshot.** The
   guide's own prose recommends only `CC`/`TI`/`RC` for a passport
   applicant specifically; this document's own scope note in `description`
   states the schema is authored for the `CC` (adult) pathway, while
   preserving the full 8-value enum since that is what the shared form
   genuinely offers.
3. **Steps 2-7 (Datos Personales through the security question) are sourced
   solely from the 2018 guide, not independently re-confirmed against the
   live 2026 DOM.** Reaching those panels live requires solving the form's
   own reCAPTCHA challenge (page 6-7 of the guide), which this cycle did not
   attempt — submitting reCAPTCHA solves via automated tooling would defeat
   its own anti-automation purpose and is out of scope for a schema-authoring
   cycle. This is the direct reason `status` remains `draft`: the Datos
   Documento panel is live-confirmed, but the majority of this document's
   43 fields carry only the guide's own 2018 provenance. See "Path to a
   `verified` claim" below.
4. **`areaConocimiento` and `subareaConocimiento` are modelled as open
   strings, not enums, despite the guide showing partial dropdown lists for
   both.** The guide's own screenshot (p.12) shows the `areaConocimiento`
   list scroll-truncated below at least 10 visible values with more below
   the fold — explicit visual evidence the list is longer than what is
   confirmed on-screen. `subareaConocimiento`'s own six-value example list
   is shown only for one `areaConocimiento` branch (Bellas Artes); modelling
   it as the universal enum would misrepresent every other branch's own
   (unconfirmed) option set.
5. **`ciudadMunicipioNacimiento`/`ciudadMunicipioResidencia`/
   `contactoCiudadMunicipio` are each modelled as a single free-text field**,
   even though the guide's own prose (p.9) describes the same control with
   the looser term "busque el departamento" while the on-screen label reads
   "Ciudad/Municipio" — treated as one field per its own on-screen label,
   with the loose prose terminology disclosed in the field's own
   `description` rather than silently reconciled or split into two fields.
6. **`identidadEtnica` is classified `sensitive-pii`, not merely `pii`.**
   The form's own Aviso de Privacidad text (rendered live and in the guide,
   p.6) explicitly names "el origen étnico, racial y datos biométricos
   (huella, foto, firma)... considerado como sensible según la Ley 1581 de
   2012" — direct source evidence for the stricter classification, unlike
   this document's other demographic fields.
7. **`desdeCuandoReside`/`actividadDesempena` use `requiredWhen` against
   `paisResidencia notEquals "COLOMBIA"`.** `paisResidencia` is itself always
   `required: true` with no `requiredWhen` of its own (never absent in a
   valid submission), so this is not the `notEquals`-against-an-optional-field
   bug class documented in this registry's own review history (GOV-1045):
   the compared field cannot be legitimately absent.
8. **`correoElectronico`/`confirmacionCorreoElectronico` use `requiredWhen`
   against `deseaNotificacionesCorreo equals true`**, mirroring the identical
   pattern already used in the sibling `co/cancilleria/visa-application-individual`
   schema for the same underlying SITAC platform convention.
   `deseaNotificacionesCorreo` is itself always required, so the same
   absent-field reasoning as judgment call 7 applies.
9. **The Información Adicional (emergency-contact) field group is modelled
   entirely optional**, per the guide's own explicit statement ("Tenga en
   cuenta que esta información, no es obligatoria") — no field in this group
   carries a required-field asterisk in the guide's own screenshot.
10. **This document does not model the downstream `solicitar.xhtml`
    reason/office-selection/document-delivery step** (passport type, motivo
    de la solicitud, oficina de entrega, foto personal upload) that a citizen
    completes after this registration step, nor the in-person office visit
    (original ID presentation, photograph, fingerprints, signature) that
    finalizes the process. `solicitar.xhtml` remains open as a distinct,
    separately-scoped candidate per the prior cycle's own screening
    (GOV-1595) — a natural companion schema for a future cycle, once a
    source for `inputMotivoSolicitud`'s coded values is found.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch both sources and confirm no newer edition of the guide
has been published and that the live Datos Documento panel is unchanged, (b)
independently re-render the guide's own pages 7-13 (screenshots) to confirm
this document's transcription of every enum and label, and (c) attempt to
progress past the reCAPTCHA gate on a real browser session (not automated
solving) to directly confirm at least one of steps 2-7's field IDs/labels
live, narrowing judgment call 3's disclosed limitation.

## Test run (Phase 4)

No live submission was attempted: this is a foreign government's citizen
identity-data-registration system, gated by reCAPTCHA precisely to prevent
automated submissions, and submitting fabricated identity data would not be a
safe or reversible action — the same reasoning already documented for this
registry's other government-portal schemas (e.g.
`co/cancilleria/visa-application-individual`).

Instead, two independent worked mock records were built from this document's
own field inventory — (A) a Colombian resident adult, `CC` document type, no
email notifications, resident in Colombia (so `desdeCuandoReside`/
`actividadDesempena` do not apply); (B) the same applicant relocated abroad
(`paisResidencia = "ESTADOS UNIDOS"`), opting into email notifications, and
answering the security question with the "Otra Pregunta" custom-question
branch — and checked programmatically against every field's own
`required`/`requiredWhen`/`validation` (`enum`, `pattern`, `maxLength`, `type`)
keyword and both `crossFieldValidation` rules
(`emailMustMatchConfirmation`, `contactoEmailMustMatchConfirmation`), using a
small purpose-built interpreter for the `Condition` grammar (§8.1, matching
the interpreter already used in this registry's other mock-conformance
checks). Both mock records pass with zero errors.

Three negative controls were also run and correctly rejected: (C) mock B with
`correoElectronico` deleted while `deseaNotificacionesCorreo = true` (caught
by the field's own `requiredWhen`, and by `crossFieldValidation` since the
confirmation field then has no match); (D) mock B with a mismatched
`confirmacionCorreoElectronico` (caught by `crossFieldValidation`); (E) mock B
with `desdeCuandoReside`/`actividadDesempena` deleted while
`paisResidencia = "ESTADOS UNIDOS"` (caught by `requiredWhen`).

Both meta-schema validators (`tools/validate.mjs` and `tools/validate-ajv.mjs`)
were run against the finished document and pass clean, alongside every other
document already in the registry.
