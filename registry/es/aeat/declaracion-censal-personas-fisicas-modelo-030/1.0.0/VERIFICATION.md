# Verification record — `es/aeat/declaracion-censal-personas-fisicas-modelo-030` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1645**), opening
**Spain as this registry's 21st jurisdiction**.

## Why this candidate

The brief was to find a real, currently-live, unauthenticated, field-level
government source filling a genuine gap — either in an existing
jurisdiction's remaining open vertical, or a strong new 21st-jurisdiction
opener. This cycle screened the following candidates, in the order
investigated:

1. **Chile — Passport (Registro Civil / consular channels).** A direct
   fetch of `registrocivil.cl` still returns a bot-protection CAPTCHA
   interstitial. The site's own appointment-booking flow
   (`www.registrocivil.cl` → "Reserva de hora") is ClaveÚnica-gated with no
   downloadable form. A search for a standalone passport/cédula application
   PDF turned up only instructional guides, not fillable forms: ChileAtiende's
   own ficha PDF for pasaporte (`chileatiende.gob.cl/fichas/3445/1/pdf`)
   returned HTTP 403 (CloudFront block, matching prior cycles' own finding
   for this domain), and a consulate-published "Instructivo Solicitud Cédula
   Nacional de Identidad y/o Pasaporte Chileno"
   (`chile.gob.cl/los-angeles/.../instructivo_obtencion_cedula_y_pasaporte...pdf`,
   fetched directly, HTTP 200, 624KB) is confirmed prose-only — a
   `pdfjs-dist` AcroForm scan found zero `/AcroForm`/`/Widget` objects in
   the file. Genuinely appointment-only, no field-level source found.
2. **Chile — National ID (cédula de identidad).** Same ClaveÚnica-gated
   scheduling flow as above. A distinct lead — Policía de Investigaciones
   de Chile's (PDI, a different agency from Registro Civil) own
   "Habilitación para Renovar Cédula de Identidad" PDF
   (`pdichile.cl/docs/.../formulario-habilitación-para-renovar-cedula-de-identidad...pdf`)
   — was found via web search, but the fetched bytes were an HTTP 403
   CloudFront block page (1.4KB), not the PDF; the corresponding PDI service
   page also 403s. Even if reachable, this form's own title scopes it
   narrowly to a third-party authorization for someone else to collect a
   renewed card, not the identity-issuance process itself. No usable
   field-level source found.
3. **Chile — Visa (consular e-visa/SAC channel).** Re-checked per this
   cycle's own brief, since DNS/hosting can change between cycles:
   `evisa.minrel.gob.cl` still does not resolve (`curl: (6) Could not
   resolve host`, confirmed 2026-07-07, same finding as the prior
   GOV-1638 cycle). Still not independently confirmed reachable.
4. **Peru — Passport (Migraciones).** A genuine, directly downloadable,
   unauthenticated PDF exists —
   `migraciones.gob.pe/formularios/formatos/SOLICITUD-GENERAL.pdf` (HTTP
   200, 43KB) — but it is Peru's generic multi-purpose "Solicitud General"
   request form used across many different Migraciones procedures, not a
   passport-specific field set, and a full-document `pdfjs-dist` scan found
   **zero `/AcroForm`/`/Widget` objects**: it is a plain, non-fillable
   template. A second candidate PDF referenced in search results
   (`sut.pcm.gob.pe/sutarchivos/file_35_20240226_091532.pdf`, described as a
   passport-specific form) could not be fetched at all — `curl` timed out
   after 40 seconds on every attempt. No usable field-level source found.
5. **Peru — National ID (RENIEC DNI renewal/duplicate).**
   `apps.reniec.gob.pe/renovacionDni/` is live and unauthenticated at its
   landing page (HTTP 200), but it is an Angular single-page app that loads
   Google's `recaptcha/enterprise.js` on its very first screen — a
   CAPTCHA-gated flow, not a static field-level source, matching the same
   class of dead end this registry has confirmed for other reCAPTCHA
   Enterprise-gated national-ID portals (e.g. ZA eHomeAffairs, GOV-1225).
6. **Argentina — RENAPER (DNI/Passport).** Both processes are confirmed,
   across every official page found (`argentina.gob.ar/interior/renaper`,
   `tramites.renaper.gob.ar`), to run through in-person Documentation
   Center appointments booked via the "Mi Argentina" app, with online
   presence limited to appointment scheduling and application-status
   lookup — no downloadable field-level form found for either process.
7. **Spain — AEAT Modelo 030 (this document).** Flagged by this cycle's own
   brief as a previously-screened-but-not-picked candidate (GOV-1624's own
   VERIFICATION.md screened it and set it aside only because its ~135
   AcroForm widgets carry generic internal names, `dato.1`…`dato.135`,
   "making faithful single-pass extraction meaningfully more error-prone").
   Re-investigated properly this cycle: confirmed genuinely live,
   unauthenticated, no CAPTCHA/WAF/login gate
   (`sede.agenciatributaria.gob.es/static_files/Sede/Procedimiento_ayuda/G321/mod030_es_es.pdf`,
   HTTP 200, `Last-Modified: Mon, 16 Sep 2024`, 830,991 bytes,
   SHA-256 `c6a4b24d9ef3b8d2843fd5f726ec7dd0117546e695aacf92cc5b3ed67841261f`).
   Despite the generic widget names, the form's own printed **reference
   numbers** (e.g. "207 NIF", "411 Tipo de vía") sit directly above/beside
   each widget and gave a clean, independently-checkable coordinate-matching
   path (see Extraction method below) — genuinely tractable, and opens a
   new jurisdiction. Picked as this cycle's candidate.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Agencia Estatal de Administración Tributaria (AEAT)
- **Document:** Modelo 030, "Declaración censal de alta en el Censo de
  obligados tributarios, cambio de domicilio y/o de variación de datos
  personales"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://sede.agenciatributaria.gob.es/static_files/Sede/Procedimiento_ayuda/G321/mod030_es_es.pdf>
  — a genuine 4-page fillable AcroForm PDF. Pages 1-2 are labelled "Ejemplar
  para la Administración"; pages 3-4 are a byte-for-byte structural
  duplicate labelled "Ejemplar para el interesado" (same field names, same
  layout, confirmed by diffing the extracted widget lists of pages 1 vs 3
  and 2 vs 4) — not modelled as separate content, since they are the same
  logical fields repeated for the filer's own retained copy.
- **A second URL found under the same download page, `mod030_en_gb.pdf`,
  turned out to be byte-identical** (`cmp` confirmed, matching SHA-256) to
  the Spanish file, despite its "en_gb" filename — there is in fact no
  distinct English-language edition of this form; the filename is
  misleading. This document is authored entirely in Spanish, matching the
  form's actual (only) language.
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js` (CJS
  build), plus the `canvas` package for a rendered visual cross-check.
  `getAnnotations()` was used for the AcroForm widget layer (field name,
  type, rect, maxLen, checkbox flag — 134 distinct `dato.*`/`dato.nif.*`
  fields across pages 1-2, confirmed identical on the duplicate pages 3-4);
  `getTextContent()` was used for each page's own text layer, with each
  item's `transform[4]`/`transform[5]` (x/y) coordinates extracted directly
  and combined with the widget rects into one y-descending, x-ascending
  ordered list per page. Because this form prints an explicit **reference
  number** directly above or beside almost every field (e.g. "207 NIF",
  "412 Nombre de la vía pública"), each widget was attributed to its
  printed box number and label by nearest-position matching in this
  combined list, then **independently re-confirmed visually**: both pages
  were rendered at 3x zoom via `pdfjs-dist`'s own `page.render()` into a
  `canvas` bitmap, and the specific rows most likely to be ambiguous (the
  interesado/cónyuge causa-checkbox grid in §1, the residente/NIF/pasaporte/
  nacionalidad/sexo row in §2/§3, and the representante/estado-civil blocks
  in §8/§9) were cropped and visually inspected against the coordinate-based
  attribution before being accepted. No attribution in `schema.json` relies
  on the coordinate match alone without this visual cross-check having been
  performed for its row.
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** every field's exact printed reference number,
  section, and label; each field's native AcroForm type (text/checkbox) and
  `maxLen` where the source asserts one; the five off-page (negative-`y`
  rect) hidden widgets excluded from this document (see Judgment call 1
  below); and the two duplicate pages' byte-for-byte structural identity to
  pages 1-2.

### Source 2 (corroborating, "still current" check)

- AEAT's own service pages for this form
  (`sede.agenciatributaria.gob.es/Sede/procedimientoini/G321.shtml`,
  `.../censos-nif-domicilio-fiscal/censos/modelo-030-.../descarga-modelo.html`)
  confirm Modelo 030 remains the currently-published form for this process
  and link to the same PDF, and describe its scope consistently with the
  form's own printed title (registration in the census, domicile change,
  personal-data variation) and its two submission channels (paper, and an
  "Extraordinary procedure for non-in-person presentation of Model 030"
  electronic channel this document does not model — see Scope below).
  Neither AEAT help page, nor any other AEAT documentation page found this
  cycle, publishes an explicit table mapping each Section 1 "causa"
  checkbox to which of the form's other sections must be completed for it —
  this document's own `requiredWhen` gating (Judgment call 3 below) is
  this registry's own inference from the near-verbatim textual match
  between several causa labels and their corresponding section headers, not
  a citation to an AEAT-published cross-reference.

## Field inventory (Phase 3)

All 119 `fields[]` entries and their exact source widget/box-number/label
are listed inline in `schema.json`'s own `sourceRef` per field. Summary by
section:

| Section | Fields | Notes |
|---|---|---|
| Header ("Datos identificativos") | `nifInteresado`, `apellidosInteresado`, `nombreInteresado` | The only 3 fields modelled `required: true` unconditionally — every submission needs to identify the filer, and the source prints these on every page with no visible gating checkbox |
| 1. Causas de presentación | 15 boolean fields (`causa*Interesado`/`causa*Conyuge`, boxes 101-117) | All optional; the source's own instructions state interesado+cónyuge pairs are both marked only for a joint filing |
| 2. Datos identificativos del interesado | 15 fields (boxes 201-217) | Core identity (`nifSeccion2Interesado`/`primerApellidoInteresado`/`nombreSeccion2Interesado`) `requiredWhen` any of the alta/modificación/solicitud-NIF interesado causa boxes; rest optional |
| 3. Datos identificativos del cónyuge | 15 fields (boxes 301-317), mirrors §2 | Core identity `requiredWhen` the mirrored cónyuge causa boxes |
| 4. Teléfonos y correo | 5 fields (boxes 426/427/429/431/432) | All optional (a "baja"/withdrawal submission would need the value fields blank) |
| 5. Domicilio fiscal en España | 17 fields (boxes 411-430) | Core address (tipo/nombre de vía, C. Postal, municipio, provincia) `requiredWhen` `causaCambioDomicilioFiscalInteresado` |
| 6. Domicilio en el extranjero | 9 fields (boxes 501-510) | All optional; 501/502 form an `exclusivityGroup` |
| 7. Domicilio de notificaciones | 24 fields (boxes 600-630) | All optional — two alternative tracks (street address vs. apartado de correos) per the source's own "apartado 1 ó el 2" instruction, with no field distinguishing which applies |
| 8. Representante | 9 fields (boxes 701-708) | All optional; 703 SÍ/NO and 704/706 Legal/Voluntaria each form an `exclusivityGroup` |
| 9. Estado civil | 5 fields (boxes 801-805) | The 4 status checkboxes form an `exclusivityGroup`; `fechaAdquisicionEstadoCivilActual` `requiredWhen` `causaCambioEstadoCivilInteresado` |
| 10. Fecha y firma | 2 fields (`lugarFirma`, `fechaFirma`) | Physical signature itself not modelled, per this registry's standing convention |

Total: **119 fields**, plus **6 `exclusivityGroups`** entries
(`residenciaFiscalInteresado`, `residenciaFiscalConyuge`,
`estadoCivilActual`, `domicilioExtranjeroTipo`, `representanteResidencia`,
`causaRepresentacion`).

## Access notes and judgment calls

1. **Five widgets are deliberately excluded from `fields[]`:** `dato.77`,
   `dato.80`, `dato.81`, `dato.86`, `dato.87`. Every other widget in this
   PDF has a `rect` inside the visible page area (`y` roughly 0-840); these
   five carry `rect` y-coordinates of **-104 to -180** — entirely off the
   printed page. They sit adjacent (by field-name numbering) to the
   catastral-reference and foreign-postal-code boxes, and are most likely
   internal duplicate/JavaScript-support widgets (this PDF's `acc.*`/
   `contador.*`/`bot.*` fields confirm the document does carry non-visible
   helper logic for barcode generation and page navigation) rather than
   printed, applicant-facing boxes. Excluded on the same basis this
   registry excludes non-applicant control fields elsewhere (e.g. F1816's
   FOLIO box).
2. **No native per-field `required` flag exists anywhere in this PDF** —
   every widget's own `required` annotation property reads `false`,
   matching the pattern already established for both `cl/sii` schemas in
   this registry. `required: true` is asserted only for the three header
   fields (see table above); every other field's requiredness is either
   `requiredWhen`-gated against a Section 1 causa checkbox (see call 3) or
   left `required: false`.
3. **The `requiredWhen` ties from Section 1's causa checkboxes to Sections
   2/3/5/9 are this registry's own inference, not an AEAT-published
   cross-reference.** No source found this cycle states explicitly "if you
   mark causa 107, you must complete Section 2" — this document infers that
   correspondence from the near-verbatim textual match between a causa's own
   label and its corresponding section's own header (e.g. causa 107
   "Modificación de datos identificativos" ↔ §2's header "Datos
   identificativos del interesado"; causa 103 "Modificaciones/cambio de
   domicilio fiscal" ↔ §5's header "Consignación de domicilio fiscal"; causa
   111 "Cambio/modificación de estado civil" ↔ §9's header "Estado civil").
   Flagged prominently here and in the affected fields' own `description`s
   for a human reviewer to double-check against AEAT's own "Instrucciones"
   documentation (linked from the form's help page but not itself examined
   this cycle, since no direct download link to it was found distinct from
   the form PDF itself).
4. **Section 7's two address tracks ("apartado 1" street address vs.
   "apartado 2" P.O. box) are left entirely optional with no `requiredWhen`
   gate at all**, even though causa 105/106 plausibly corresponds to this
   section — because, unlike Sections 2/5/9, the source provides no field at
   all distinguishing which of the two tracks a given filer uses, and
   fabricating a `requiredWhen` against one track when the true intent might
   be the other would misrepresent the form. Same non-fabrication discipline
   this registry applied to `cl/sii/aviso-venta-vehiculo`'s undistinguished
   Secciones D/E.
5. **`sexoInteresado`/`sexoConyuge` are modelled as an `H`/`M` enum, but this
   is an unconfirmed inference**, not read from the PDF itself: both
   widgets are plain single-character text boxes (`maxLen: 1`) with no
   combo/radio/export-value structure exposing their accepted values. `H`/`M`
   (Hombre/Mujer) is standard convention on comparable AEAT census forms,
   but a human reviewer should double-check this against a live-filled
   specimen or AEAT's own field-help text if one becomes available — flagged
   both here and in each field's own `description`.
6. **Postal-code fields are pattern-tightened to Spain's 5-digit format**
   (`codigoPostalDomicilioFiscal`, `codigoPostalApartadoCorreos`) even though
   their native AcroForm `maxLen` is a generic 10 — a disclosed judgment
   call, justified because both sit inside sections explicitly scoped to a
   domestic Spanish address ("Domicilio fiscal **en España**"; a P.O. box is
   necessarily a domestic postal facility). `codigoPostalNotificaciones`
   (§7, track 1) and `codigoPostalExtranjero` (§6) are left unconstrained,
   since neither section carries the same domestic-only scope note.
7. **Three date fields are each merged from three adjacent day/month/year
   AcroForm text-box triplets into one `date`-typed field**
   (`fechaEfectosResidenciaFiscalInteresado`/`Conyuge`,
   `fechaNacimientoInteresado`/`Conyuge`, `fechaFirma`), consistent with this
   registry's established convention (e.g. `cl/sii/aviso-venta-vehiculo`'s
   `fechaVenta`). One asymmetry is flagged: the signature date's month
   sub-widget (`dato.129`) carries no `maxLen` at all, unlike its day/year
   siblings (`maxLen` 2/4, both purely numeric) and unlike every other
   merged date triple in this document (all three sub-widgets numeric) —
   suggesting this specific line may expect the month spelled out as a word
   ("de **julio** de") rather than a 2-digit number. Normalized to ISO date
   regardless, per this document's own consistent date-merge convention;
   flagged for a human reviewer.
8. **The "Clave" code fields in §8** (`representacionLegalClave`,
   `tipoRepresentacionClave`, `tituloRepresentacionClave`) and the foreign
   country-code field in §6 (`codigoPaisExtranjero`) reference AEAT's own
   external code tables, none of which are reproduced inside this 2-page
   form — modelled as open strings, the same discipline this registry
   applies elsewhere to un-reproduced external code tables (e.g. Chile's
   SII economic-activity-code catalog in the sibling `cl/sii` schema).
9. **The electronic-filing channel is out of scope for this v1.0.0.**
   AEAT's own help pages describe an "Extraordinary procedure for
   non-in-person presentation of Model 030" — an authenticated Sede
   Electrónica flow — as an alternative to the paper form this document
   models; that flow was not examined and is not modelled here.
10. **No accompanying-document requirement is modelled** (no
    `documents[]` array). No source examined this cycle publishes an
    explicit list of documents to attach beyond presenting the paper form
    in person (implicitly alongside one's own DNI/NIE, per general AEAT
    office-visit practice) — left undisclosed as a fabricated `documents[]`
    entry rather than asserted without a citable source.

## Test run (Phase 4)

No live submission was attempted: this is a census filing against AEAT's own
production tax registry, and submitting fabricated identity/domicile data
into a real government census system is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and independently checked with a standalone,
ajv-free rule-tracing script (not committed — reads `schema.json`'s own
`required`/`requiredWhen`/`validation.pattern`/`validation.enum`/
`exclusivityGroups` and evaluates them against each mock record) in addition
to the repo's own validators:

**Scenario 1 — single (unmarried) Spain-resident individual, the committed
`application-packet.json`.** Simultaneously registers in the census (causa
101), reports her current domestic fiscal domicile (causa 103), and
registers a mobile/email for AEAT notices (causa 117). Correctly triggers
the `requiredWhen` gates on Section 2's core identity fields and Section 5's
core address fields; Section 3 (cónyuge), Section 6 (foreign domicile),
Section 7 (notifications), Section 8 (representative), and Section 9
(estado civil) are all correctly left absent. `residenciaFiscalInteresado`'s
exclusivityGroup is satisfied (exactly one of the pair `true`). Passes with
zero errors.

**Scenario 2 — married couple jointly reporting a civil-status change and a
foreign fiscal domicile, filed through a voluntary representative (traced
only, not committed as a second fixture file).** Exercises
`fechaAdquisicionEstadoCivilActual`'s `requiredWhen` tie to
`causaCambioEstadoCivilInteresado`, and all three of the
`estadoCivilActual`, `domicilioExtranjeroTipo`, `representanteResidencia`,
and `causaRepresentacion` exclusivityGroups simultaneously. Passes with zero
errors.

**Negative controls** (each expected to fail exactly one rule, verified
against the standalone script above): (a) removing `nifSeccion2Interesado`
from Scenario 1 while `causaAltaCensoInteresado` stays `true` — correctly
flagged as a missing required field; (b) setting both
`residenteFiscalEspanaInteresado` and `noResidenteFiscalEspanaInteresado`
`true` in Scenario 1 — correctly flagged as an exclusivityGroup violation;
(c) `nifInteresado: "1234567Z"` (7 digits instead of 8) — correctly flagged
as a `validation.pattern` violation; (d)
`codigoPostalDomicilioFiscal: "4700"` (4 digits) — correctly flagged as a
`validation.pattern` violation. All four negative controls were correctly
rejected.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/es/aeat/declaracion-censal-personas-fisicas-modelo-030/1.0.0/schema.json
ok   registry/es/aeat/declaracion-censal-personas-fisicas-modelo-030/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/es/aeat/declaracion-censal-personas-fisicas-modelo-030/1.0.0/schema.json
ok   registry/es/aeat/declaracion-censal-personas-fisicas-modelo-030/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
