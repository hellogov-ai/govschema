# Verification record — `co/registraduria/duplicado-cedula-ciudadania` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1616**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

CATALOG.md's "By Jurisdiction" table showed National ID & Civic Documents as
the weakest global vertical (15/19 jurisdictions), with Colombia one of only
four gaps (alongside Brazil, Indonesia, Mexico). Colombia was already at 5 of
its 6 verticals (DMV, Business Formation, Taxes, Passport, Visa all
published), with National ID the sole remaining gap — closing it would make
Colombia the registry's first non-original jurisdiction at 6/6.

Three prior `GovSchema Standard Research` cycles had each screened this exact
gap and reported the same finding:

- **GOV-1567** (opened Colombia): flagged National ID as an open, unscreened
  backlog candidate.
- **GOV-1595** (closed CO Taxes): "the Registraduría's own site
  (`registraduria.gov.co`) returned HTTP 403 to every direct fetch attempted
  this cycle (both a plain `curl` and a browser-UA `curl`), so no primary,
  field-level source was reachable."
- **GOV-1602** (closed CO Visa): re-screened and reconfirmed the same 403,
  noting the flow is "described in secondary sources as a short online form
  (full name, cédula number, email, phone, PSE payment)" but unreachable.

This cycle did not accept the prior 403 as final and instead searched for the
actual subdomain the service runs on, since Colombian government sites
frequently split public-facing transactional tools onto a distinct subdomain
from their WAF-gated main content site (the same pattern this registry's own
Visa (GOV-1602, SITAC guide) and Passport (GOV-1609, `registrarCiudadano.xhtml`)
cycles already exploited for Cancillería). That search found
`epagos.registraduria.gov.co` — a subdomain hosting the RNEC's real
"Duplicado de Cédula en Línea" application — is not behind the same gate.

## Sources examined

### Source 1 (primary `source`, full field-by-field payment-wizard walkthrough)

- **Authority:** Registraduría Nacional del Estado Civil (RNEC)
- **Document:** "Manual de Usuario Pago y Solicitud del Duplicado del
  Documento de Identidad en Línea", Versión 5, dated on its own cover page
  2018-09-21 (Gerencia de Informática — Coordinación de Desarrollo y
  Programación)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://epagos.registraduria.gov.co/tramites_web/manuales/Manual%20de%20usuario%20-%20Tr%C3%A1mites%20web%20con%20pago%20en%20l%C3%ADnea.pdf>
  — a genuine (non-image) 13-page PDF.
- **Cross-check:** the same file path on the main domain
  (`https://www.registraduria.gov.co/IMG/pdf/manual_de_usuario-tramites_web_con_pago_en_linea_y_presencial.pdf`)
  returns **HTTP 403** — confirming the gate is domain-scoped (main
  `www`/root domain), not content-scoped; a Cancillería-affiliated consulate
  site (`boston.consulado.gov.co/sites/default/files/Informacion%20duplicado%20de%20cedula%20en%20linea.pdf`)
  independently references the same `epagos.registraduria.gov.co` flow,
  corroborating it as the real, current channel.
- **Extraction method:** `pdfjs-dist@3.11.174` for the text layer (which
  carries only figure captions — "Ilustración 8. Datos Básicos" etc. — not
  field labels) plus `canvas`-rendered page screenshots (2.5x-5x scale,
  independently re-rendered by this reviewer, not merely re-described) read
  directly, since every field label lives inside the manual's own embedded
  browser screenshots.
- **Retrieved / reviewed:** 2026-07-07
- **What it confirms:** the full "Iniciar Pago" wizard (Datos Básicos → Datos
  de Contacto → Trámite → Preguntas de Seguridad → Registraduría de Entrega →
  Confirmar Pago → PSE payment → Comprobante), plus the Registro and Iniciar
  Sesión screens (superseded for those two screens by the live HTML, see
  Source 2).

### Source 2 (live HTML, Registro screen — higher-fidelity than the 2018 manual for this screen)

- **URLs (directly retrieved, HTTP 200, no login, fetched independently by
  this reviewer with `curl`, not merely trusted from an initial scouting
  pass):**
  - `https://epagos.registraduria.gov.co/registro/registro.php` — the live
    account-registration form.
  - `https://epagos.registraduria.gov.co/tramites_web/` — the live
    login/entry page, including its "Recuperación de Datos" modal and a
    2025-03-03-dated "Atención" modal (see judgment call 3 below).
- **Retrieved / reviewed:** 2026-07-07
- **What it confirms:** exact current (2026) field names, HTML5 `pattern`/
  `maxlength`/`required` attributes, and placeholder text for every Registro
  field — a stronger source than the 2018 manual's screenshot for this
  specific screen, and the basis for detecting judgment call 1 below.

## Field inventory (Phase 3)

| Field (schema `name`) | Label (source) | Source / page | Example valid value |
|---|---|---|---|
| `tipoDocumento` | Tipo de Documento | Live HTML, `registro.php` | `"Cédula de ciudadanía"` |
| `numeroIdentificacion` | Número de Identificación | Live HTML, `registro.php` | `"1010012345"` |
| `nombres` | Nombres | Live HTML, `registro.php` | `"MARIA FERNANDA"` |
| `apellidos` | Apellidos | Live HTML, `registro.php` | `"GOMEZ RESTREPO"` |
| `correoElectronico` / `confirmarCorreoElectronico` | Correo Electrónico / (confirmar) | Live HTML, `registro.php` | `"maria.gomez@example.co"` |
| `aceptaPoliticasPrivacidad` | Acepto las políticas de privacidad | Live HTML, `registro.php` | `true` |
| `tipoDocumentoSolicitante` | Tipo de Documento | Manual p.6, Ilustración 8 | `"Cédula de ciudadanía"` |
| `numeroIdentificacionSolicitante` | Número de Identificación | Manual p.6, Ilustración 8 | `"1010012345"` |
| `nombresCompletos` / `apellidosCompletos` | Nombres completos / Apellidos completos | Manual p.6, Ilustración 8 | `"MARIA FERNANDA GOMEZ RESTREPO"` / `"GOMEZ RESTREPO"` |
| `telefonoCelular` | Teléfono celular (10 dígitos) | Manual p.6, Ilustración 9 | `"3001234567"` |
| `telefonoFijo` | Teléfono fijo (8 dígitos) | Manual p.6, Ilustración 9 | `"6013456"` |
| `correoElectronicoContacto` / `confirmarCorreoElectronicoContacto` | Correo Electrónico / Confirmar | Manual p.6, Ilustración 9 | `"maria.gomez@example.co"` |
| `departamentoResidencia` / `municipioResidencia` | Departamento / Municipio de residencia | Manual p.6, Ilustración 9 | `"CUNDINAMARCA"` / `"BOGOTA D.C."` |
| `direccionResidencia` | Dirección de residencia | Manual p.6, Ilustración 9 | `"CALLE 100 # 15-20"` |
| `tipoTramite` | Tipo de Trámite | Manual p.7, Ilustración 10 | `"C.C. - Duplicado"` |
| `aceptaCondicionesTramite` | Acepto | Manual p.7, Ilustración 10 | `true` |
| `respuestaPreguntaEstatura` | ¿...estatura...? (metros) | Manual p.7, Ilustración 11 | `"1,74"` |
| `respuestaPreguntaAnioExpedicion` | ¿...año de expedición...? | Manual p.7, Ilustración 11 | `"2011"` |
| `respuestaPreguntaFechaCumpleanos` | ¿...fecha de cumpleaños...? | Manual p.7, Ilustración 11 | `"02 de noviembre"` |
| `departamentoEntrega` / `municipioEntrega` / `oficinaEntrega` | Departamento / Municipio / Oficina | Manual p.8, Ilustración 12 | `"CUNDINAMARCA"` / `"BOGOTA D.C."` / `"REGISTRADURIA ESPECIAL DE BOGOTA"` |

`documents[]`:

| Document `id` | What it is | Required? |
|---|---|---|
| `pagoDuplicadoCedula` | PSE online payment for the duplicate card | Yes |

## Access notes and judgment calls

1. **The live 2026 Registro screen has dropped two fields the 2018 manual's
   own screenshot shows (Ilustración 3): Teléfono celular and Teléfono
   fijo.** Independently re-fetched (`curl`) the raw HTML of
   `registro.php` and confirmed no `<input>` for either phone field exists
   anywhere in the current markup — this is a genuine site change since
   2018, not a source-reading error. The manual's own Datos de Contacto
   screen (Ilustración 9, later in the flow, after login) still asks for
   both phone numbers, so this document keeps `telefonoCelular`/
   `telefonoFijo` there and does not model them on the Registro screen.
2. **This manual uses no required-field asterisk (or any other marker)
   anywhere, unlike this registry's other Colombian sources** (the
   Cancillería SITAC Visa guide uses `*`; the live `registro.php` HTML uses
   the native `required` attribute). For the Registro screen, `required` is
   read directly from that live HTML's own `required` attribute (present on
   every field except the `politicas` checkbox — see judgment call 4). For
   every field sourced from the manual's screenshots instead (Datos Básicos
   onward), no per-field signal exists at all; `required: true` is applied
   uniformly to every field in each of those screens, based on that screen's
   own imperative instruction text ("Debe confirmar los datos básicos...",
   "deberá ingresar los datos de contacto...", "Deberá seleccionar la
   oficina..."). This is a genuine limitation of this source, not a
   confirmed per-field determination — a reviewer with live, authenticated
   access to the payment wizard should confirm whether e.g. `telefonoFijo`
   (a landline, which not every applicant has) is truly mandatory or merely
   presented identically to its sibling fields without being enforced.
3. **A 2026-only eligibility gate exists that the 2018 manual never mentions
   at all.** The live `tramites_web/` page (fetched 2026-07-07) carries a
   dated (`<!-- 2025-03-03 jacamargo. Modal de aviso -->`) "Atención" modal
   stating verbatim: *"Este servicio permite el pago en línea para obtener
   el duplicado de la cédula amarilla con hologramas expedidas después de
   2019."* This restricts the entire online service to holders of the
   current-generation card; holders of an older (pre-2019, non-hologram)
   card cannot use it. This is disclosed in the document's own top-level
   `description` as a scope note rather than modelled as a field, since the
   modal is a one-way informational warning ("Continuar" button only) with
   no corresponding applicant-input control.
4. **`aceptaPoliticasPrivacidad` carries no native HTML `required`
   attribute**, unlike every other field on the Registro screen — but the
   same live HTML shows an adjacent `<div id="errorpoliticas"
   class="error">` immediately after the checkbox, confirming client-side
   JS enforces it before allowing registration. Modelled as `required: true`
   with `fieldRole: eligibility` / `eligibleValues: [true]`, consistent with
   this registry's established pattern for consent checkboxes that lack the
   native attribute but are functionally mandatory (e.g.
   `ae/icp/emirates-id-replacement`'s `termsAndConditionsAccepted`).
5. **`tipoDocumentoSolicitante`, `departamentoResidencia`,
   `municipioResidencia`, `departamentoEntrega`, `municipioEntrega`, and
   `oficinaEntrega` are modelled as open strings, not enums** — each is
   shown on-screen as a dropdown in its own unselected ("Seleccione una
   opción...") state in the manual's screenshots, so no option list is
   confirmed. The Departamento/Municipio dropdowns are AJAX-dependent
   chains (32 Colombian departments, each with its own municipality list) —
   the same reason this registry's other Colombian documents
   (`co/dian/declaracion-renta-personas-naturales-formulario-210`,
   `co/rues/matricula-mercantil`) leave equivalent geography dropdowns
   unenumerated.
6. **`respuestaPreguntaEstatura`, `respuestaPreguntaAnioExpedicion`, and
   `respuestaPreguntaFechaCumpleanos` are modelled as open strings, not
   enums**, even though each is shown on-screen as a 3-option radio group
   with concrete example values. These identity-verification questions are
   RNEC's own account-security mechanism: each applicant's 3 options
   (one genuine, two decoys) are generated per-account from their own civil
   registry record, not a fixed universal list — modelling the source's own
   worked-example values as a global enum would misrepresent them as
   choosable-by-anyone options rather than a randomized identity check. The
   source's own note is preserved in each field's description: answering
   any of the three incorrectly requires completing the process in person
   instead.
7. **`tipoTramite` is modelled as an open string despite the Registro
   screen's own `tipoDocumento` dropdown supporting a second document type
   (Tarjeta de identidad, minor's ID).** Every downstream screenshot in this
   source (Trámite, Preguntas de Seguridad, Registraduría de Entrega,
   Confirmar Pago) only shows the flow for `"C.C. - Duplicado"` — no
   screenshot anywhere in the 13-page manual confirms a parallel
   `"T.I. - Duplicado"` option or shows that pathway's downstream screens.
   This document's own `description` scopes it explicitly to the Cédula de
   Ciudadanía (adult) pathway; a Tarjeta de Identidad duplicate schema is a
   candidate for a future minor version if a source confirming that
   downstream flow is found.
8. **The live fee amount is not re-confirmed or encoded.** The 2018 manual's
   Trámite screenshot shows "Valor: $ 43.050" next to `"C.C. - Duplicado"`;
   this is a source-computed display value the applicant does not enter, and
   RNEC's real 2026 fee schedule was not independently checked this cycle
   (out of scope — this document only models applicant-input fields, per the
   same discipline already applied to `ae/rta/vehicle-registration-renewal`'s
   `renewalFeePayment`).
9. **Account username/password creation is deliberately excluded.** The
   Confirmación de Registro email delivers an auto-generated username/
   password pair (per manual p.4-5, Ilustración 4-5); the applicant never
   chooses their own credentials on any screen in this source. This is an
   authentication mechanic, not applicant domain data, consistent with this
   registry's discipline of not modelling login/account-creation screens
   elsewhere (e.g. `ae/icp/emirates-id-replacement` does not model UAE Pass
   login).
10. **The PSE bank-selection and bank-hosted payment pages (Ilustración
    14-16), the emailed Comprobante de Documento en Trámite receipt
    (Ilustración 18), and the separate 'Estado del Trámite' status-lookup
    tool (`wsp.registraduria.gov.co/estadodocs/`, Ilustración 20) are all out
    of scope** — third-party payment UI, a read-only output document, and a
    separate status-check tool respectively, none of which are applicant
    input for this request itself. `pagoDuplicadoCedula` in `documents[]`
    represents the payment obligation itself, not these downstream pages.
11. **The Tarjeta de Identidad and Registro Civil minor-applicant pathways
    are out of scope**, consistent with judgment call 7 and with this
    registry's existing discipline for Colombian Cancillería documents
    (e.g. `co/cancilleria/passport-citizen-data-registration` scopes to the
    adult Cédula de Ciudadanía pathway for the same reason).

## Test run (Phase 4)

No live submission was attempted: submitting a real duplicate-ID request
against a government identity-document system with fabricated identity data
is not a safe or reversible action (the request would consume a real PSE
payment and a real RNEC production slot) — the same reasoning already
documented for this registry's other government-portal schemas (e.g.
`id/imigrasi/evisa-visitor-visa-application`).

Instead, one fully-valid worked mock record was built from this document's
own field inventory (a direct applicant, Cédula de ciudadanía, no apoderado
concept applies to this flow) and checked programmatically against every
field's own `required`/`validation` (`enum`, `pattern`, `maxLength`) keyword
and both `crossFieldValidation` rules, using a small purpose-built
interpreter for the schema's `required`/`validation`/`crossFieldValidation`
keywords. The mock record passes with zero errors. Four negative controls
were also run and each correctly rejected exactly one deliberately-introduced
fault: a mismatched `correoElectronico`/`confirmarCorreoElectronico` pair
(caught by `emailMustMatchConfirmation`), a missing required `telefonoCelular`
(caught by `required`), a non-numeric `numeroIdentificacion` (caught by
`validation.pattern`), and `aceptaPoliticasPrivacidad = false` (caught by
`eligibleValues`). A further check confirmed every field in `fields[]`
appears in exactly one `steps[].fields` array. Both meta-schema validators
(`tools/validate.mjs` and `tools/validate-ajv.mjs`) were run against the
finished document and pass clean (258/258 and 258/258 respectively, alongside
every other document already in the registry).
