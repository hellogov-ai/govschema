# Verification record — `mx/sat/preinscripcion-rfc-persona-moral` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

This document was derived from **SAT's own official screenshot-driven
step-by-step guide PDF**, not a live-browser walk of the wizard itself (which
is bot-mitigation-gated — see below). It remains `draft`, not `verified`,
pending an independent second reviewer's field-by-field pass, and pending a
live-browser re-walk if a bypass for the wizard's WAF ever becomes available.

## Why this document exists

CATALOG.md's "Known Gaps" section explicitly flagged Mexico's Business
Formation vertical as unmodelled: Mexico was opened as the registry's 16th
jurisdiction via `mx/inm/forma-migratoria-multiple-electronica` (GOV-1393, in
the Visa vertical), and that cycle's own VERIFICATION.md separately scouted
SAT's RFC preinscription wizard and left it as backlog ("the live SAT
preinscription wizard returned HTTP 403 to a direct fetch (untested via a
real browser this cycle) — a candidate for a future cycle"). This cycle
(GOV-1414) picks that candidate up. RFC (Registro Federal de Contribuyentes)
is Mexico's federal taxpayer/business identifier — the closest Mexican
analogue to the US EIN (`us/irs/employer-identification-number-ss4`), which
this registry already classifies under Business Formation — so this document
is classified the same way, closing Mexico's Business Formation gap.

## Source examined

- **Document `(id, version)`:** `mx/sat/preinscripcion-rfc-persona-moral` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Servicio de Administración Tributaria (SAT)
- **Live wizard (not directly used as source — see below):**
  `https://www.sat.gob.mx/aplicacion/33805/preinscribe-tu-empresa-en-el-rfc`
  — returns **HTTP 403** to a direct fetch. Independently re-confirmed this
  cycle: `curl` with a realistic browser `User-Agent` string still returns
  403 on this specific application path, while `https://www.sat.gob.mx`
  itself returns HTTP 200 — indicating a WAF/bot-mitigation rule scoped to
  this application, not a wholesale SAT outage. Not retried via a real
  headless browser this cycle (a possible avenue for a future
  re-verification, per the task brief's own instruction not to spend further
  time on direct/WebFetch retries against this specific URL).
- **Primary source actually used:**
  `https://wwwmat.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1461176355970&ssbinary=true`
  — "Guía para preinscripción de personas morales", dated 01 de enero de
  2022, 13 pages. Fetched directly with `curl` (HTTP 200; required
  `--ciphers 'DEFAULT@SECLEVEL=0'` to work around this environment's default
  OpenSSL security level rejecting the server's DH key size — a local
  `curl`/OpenSSL configuration issue on the fetching side, not a defect in
  SAT's TLS setup as experienced by ordinary browsers). Confirmed genuine
  `%PDF-1.5` content, 1,914,177 bytes.
  - The `wwwmat` subdomain (likely a "maqueta"/staging-style mirror SAT
    itself links its guide PDFs from) was the exact URL supplied in this
    cycle's task brief and is a `sat.gob.mx` first-party domain; no
    alternate `omawww.sat.gob.mx` mirror was found or needed since the
    primary URL resolved on the first attempt.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the guide PDF directly (see above).
2. Extracted the PDF's text layer with `pdfjs-dist`'s `getTextContent` API.
   This recovered only the guide's **narrative instructional prose** — 21
   numbered steps of plain-language walkthrough text (e.g. "Ingresa a la
   página www.sat.gob.mx, da clic en 'Empresas'...") — confirming the guide
   carries no text layer for its embedded screenshots. Every field label,
   asterisk-required marker, dropdown value, and example value in this
   document therefore comes from the screenshots themselves, not the text
   layer.
3. Because the screenshots are plain raster images with no text layer,
   rendered each of the PDF's 13 pages to a PNG using `pdfjs-dist`'s
   page-rendering API with `@napi-rs/canvas` as the Node canvas backend, at
   up to 5x viewport scale for legibility, then directly **visually read**
   (not OCR'd) each rendered page and, where needed, cropped sub-regions at
   full resolution to confirm exact field labels and asterisk placement.
   Two other Node canvas backends were tried and rejected first for
   environment-specific compatibility reasons before landing on
   `@napi-rs/canvas`: plain `canvas` (node-canvas) failed on `drawImage`
   because `pdfjs-dist` bundles its own nested, different-versioned
   `@napi-rs/canvas` internally for JPEG/image-bitmap decoding regardless of
   which canvas factory is supplied to `page.render()`, so the destination
   canvas and the internally-decoded image ended up as incompatible native
   types; switching the destination canvas to the *same* `@napi-rs/canvas`
   family (plus polyfilling `global.Path2D` from it, since `pdfjs-dist`
   expects a global `Path2D` constructor that Node does not provide) resolved
   both the image-drawing and glyph-path-fill errors. This is a
   reusable technique note for any future cycle rendering a screenshot-only
   PDF guide in this environment.
4. The guide walks a single, fully worked, fabricated example applicant — a
   fictitious company "LA CAPERUCITA ROJA" — through all five of the
   wizard's own steps end-to-end, including a filled domicilio, a filled
   representante legal section, one full economic-activity selection with
   its complementary questions answered, one registered socio/accionista,
   and the resulting "Acuse de pre inscripción" receipt. Every field this
   document declares was cross-checked against this worked example's visible
   value, not just its bare label.

## What was confirmed directly (verbatim, from the guide's screenshots)

- Every field's exact printed label, its step/section grouping ("Paso 1.
  Datos de identificación" through "Paso 4. Cuestionario", the latter
  containing both the activities/questionnaire sub-section and a further
  "Relaciones" sub-section), and every field's example value from the worked
  "LA CAPERUCITA ROJA" applicant.
- The exact set of fields marked with a red `*` (required) versus unmarked
  (optional) on Paso 1, Paso 2, and Paso 3's screenshots (confirmed at up to
  5x render scale — see crops referenced in Extraction method step 3).
- That `legalRepresentativeCurp`/`GivenNames`/`FirstSurname`/`SecondSurname`/
  `DateOfBirth`/`State` render **visibly greyed out** (disabled) on the live
  form the instant `legalRepresentativeRfc` is entered, per the guide's own
  narrative: "al registrarla en automático se despliega la información de
  los campos subsecuentes" (entering it automatically populates the
  subsequent fields).
- That the "Documento protocolizado" section (`notarialDeedNumber` through
  `publicRegistryData`) is explicitly stated as optional in the guide's own
  prose: "La información de la sección 'Documento protocolizado' no es
  obligatoria, sin embargo, se recomienda registrarla."
- That the "Forma en que se realiza" control (`economicActivityForm`) is a
  genuine multi-select checkbox group, confirmed by the guide's own modal
  copy: "Da clic en el recuadro para seleccionar una forma en que realizas tu
  actividad, puedes seleccionar más de una opción" (you can select more than
  one option).
- That the wizard enforces a running income-percentage total across selected
  economic activities, shown live as "Total: 0%" before entry and
  "Total: 100%" once the single worked example activity is assigned its full
  percentage.
- That the "Relaciones" (socios o accionistas) sub-section requires at least
  one RFC to be registered via its "Registrar" button before "Continuar"
  proceeds meaningfully (the guide's own text: "Para añadir otro socio o
  accionista, captura el RFC y da clic en Registrar, de lo contrario
  selecciona Continuar" — implying at least one has already been captured by
  that point in the flow).
- That completing the wizard produces a non-final "Acuse de pre inscripción
  al Registro Federal de Contribuyentes" (pre-registration receipt/folio),
  and that the guide's own final numbered step (21) instructs the applicant
  to conclude the RFC inscription in person, by appointment, at a SAT Módulo
  de Servicios Tributarios, per the requirements in SAT's Ficha de trámite
  39/CFF (Anexo 1-A of the current Resolución Miscelánea Fiscal) — this
  document does not model that in-person conclusion.
- That the wizard itself collects **no file uploads** anywhere across its
  five steps — consistent with `documents[]` being absent from this
  document (see GOV-1393's `br/pf/passport-application` precedent for an
  unstated/out-of-scope fee or document flow; here there is neither a fee
  screen nor a document-upload control at all in the online wizard itself,
  only the in-person appointment's own document checklist per Ficha 39/CFF,
  which is out of scope for a data-entry-wizard schema).

## Interpretive judgment calls flagged for an independent reviewer

1. **Three dropdown fields modelled as open strings, not closed enums,
   because the guide never shows their full option catalog.**
   `capitalRegime` (Régimen de capital), `registrationType` (Tipo
   inscripción), and `nationality` (Nacionalidad) are all rendered as
   `<select>`-style dropdowns on the live wizard, but the guide's own
   screenshots show only the one pre-selected example value for each,
   never an expanded option list. `capitalRegime`'s example value is
   additionally **truncated by the live dropdown box's own display width in
   the source screenshot itself** ("SOCIEDAD ANONIMA DE CAPITAL VARI") —
   this reads unambiguously as the start of "SOCIEDAD ANÓNIMA DE CAPITAL
   VARIABLE" (a standard, extremely common Mexican corporate regime), but
   the guide never shows the untruncated string, so this document does not
   assert the completion as fact. Rather than guess at any of these three
   catalogs (which would risk fabricating enum values this registry has
   never verified against a live source — a bar every other closed-enum
   field in this document does meet), all three are modelled as open
   `string` fields with a `description` explaining the gap. A reviewer with
   access to a working browser session against the live wizard (or its
   catalog/metadata endpoint, if one exists analogous to
   `mx/inm/forma-migratoria-multiple-electronica`'s
   `/fmme/resources/solicitud/meta-resources/catalogos`) should convert
   these to closed enums once the real catalogs are confirmed.
2. **`fiscalAddressType` and `partnerRelationType` modelled narrowly around
   the one value the guide shows, similar to but distinct from judgment call
   1.** `fiscalAddressType` is modelled as a single-value closed enum
   (`["domicilio_fiscal"]`) rather than an open string, because the guide's
   screenshot shows this specific field rendered **disabled** (not just
   pre-selected) for the address this document scopes to — the fiscal
   address is always this fixed value on the wizard's own first "Detalle
   domicilio" screen, so a single-value enum is the more accurate claim, not
   an incomplete one, unlike judgment call 1's fields (which are genuinely
   open, enabled dropdowns whose full catalog just isn't shown).
   `partnerRelationType`, by contrast, IS shown as an enabled dropdown
   defaulting to "Socio o accionista" with no visible confirmation that it
   is the only reachable value, so — like judgment call 1 — it is modelled
   as an open string, not a closed enum, pending confirmation.
3. **Six repeating structures are explicitly out of scope for this
   v1.0.0**, each because GovSchema v0.3 has no native array/repeating field
   type (GSP-0009, composite/repeating values, is not yet folded into the
   accepted spec — see `fr/ants/driving-licence-renewal-duplicate`'s
   licence-category field for the precedent this document follows for
   multi-select-as-string instead), and because the single-instance scoping
   precedent used throughout this registry for repeating business-formation
   structures (e.g. `sg/acra/private-limited-company-incorporation`'s
   single-founder scope for a wizard that natively supports many
   shareholders) is the more honest alternative to guessing at an array
   shape the spec does not yet support:
   - **Additional/alternate business addresses** beyond the one domicilio
     fiscal this document models (the wizard's "Domicilios" screen supports
     an arbitrary number via its own "Añadir" button — e.g. sucursales,
     bodegas, oficinas).
   - **More than one phone number per address** (the wizard's own
     `+`/`-` controls next to the Tipo/Lada/Teléfono row).
   - **More than one economic activity, each with its own income-percentage
     split** (the wizard's "Actividades seleccionadas" table requires the
     percentages across all selected activities to sum to 100%; this
     document models exactly one activity, so its
     `economicActivityIncomePercentage` is always 100 within that scope).
   - **SAT's full economic-activity catalog itself.** The guide's screenshot
     shows only a small navigable slice of what is evidently a large,
     SCIAN-derived hierarchical catalog (categories like "Comercial,
     industrial o de producción" expand into subgroups, which expand into
     individual activities); reproducing it as a closed enum from a 13-page
     guide would mean guessing at the vast majority of it, so
     `economicActivityDescription` is modelled as an open string instead.
   - **The activity-specific "preguntas complementarias" sub-questionnaire
     for any economic activity other than the guide's one worked example**
     ("Comercial, industrial o de producción"). The guide's own instruction
     text confirms these questions are activity-dependent ("Completa tu
     información respondiendo las siguientes preguntas", shown immediately
     after an activity-category-specific heading), but only ever renders the
     one example category's two questions
     (`incomeTaxCalculationMethod`/`employmentSituation`). A reviewer should
     treat these two fields as illustrative of the *shape* of this
     sub-questionnaire, not as the complete, activity-independent question
     set — a future cycle with live-wizard access (or a broader set of
     official guides, if SAT publishes per-activity-category variants) would
     be needed to model the other categories' own questions.
   - **More than one socio/accionista (partner/shareholder) RFC
     relationship.** The wizard's "Datos capturados" table supports
     registering any number of partners one at a time via its "Registrar"
     button; this document models a single `partnerRfc`/`partnerRelationType`
     pair.
4. **`email` modelled as `required: false` despite the guide's own prose
   reading as a soft expectation.** No red asterisk appears next to "Correo
   electrónico:" in the screenshot (unlike, e.g., "Referencias adicionales*"
   two fields above it on the same screen), so this document follows the
   visual asterisk convention used consistently elsewhere in this document
   and marks it optional — but the guide's own instructional paragraph for
   this screen closes with "...captura tu correo electrónico y en su caso
   teléfono" (capture your email and, where applicable, your phone), which
   reads as more strongly expected than a purely optional field, even though
   it is not asterisked. Flagged rather than silently resolved either way.
5. **`economicActivityForm`'s and `employmentSituation`'s required-ness has
   no visible asterisk marker, unlike every other required field in this
   document, but is asserted `required: true` on functional grounds.**
   Neither the "Forma en que se realiza" checkbox group nor the "Para el
   desarrollo de tus actividades" checkbox group carries a red asterisk in
   the guide's screenshots (Paso 4's screens do not appear to use the same
   asterisk convention as Paso 1-3's screens at all — no field on the
   Cuestionario screens is asterisked, including ones that are clearly
   functionally mandatory, like the income percentage needing to reach
   100%). This document asserts `required: true` for
   `economicActivityDescription`, `economicActivityForm`,
   `economicActivityIncomePercentage`, `incomeTaxCalculationMethod`,
   `employmentSituation`, `partnerRfc`, and `partnerRelationType` on the
   strength of the guide's own imperative narrative text and the worked
   example's behavior (each of these is filled in the example before
   "Continuar"/"Guardar datos del Cuestionario" is used), not on a visible
   asterisk — a materially different evidentiary basis than the
   asterisk-confirmed required fields in Paso 1-3. A reviewer should treat
   Paso 4's required-ness claims as lower-confidence than Paso 1-3's.
6. **RFC pattern validation is a general pattern covering both persona moral
   and persona física RFCs.** `legalRepresentativeRfc` and `partnerRfc` both
   use `^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$`, allowing both the 12-character
   persona-moral shape (3 letters + 6-digit date + 3-character homoclave)
   and the 13-character persona-física shape (4 letters + 6-digit date +
   3-character homoclave) — appropriate here because a company's legal
   representative and its socios/accionistas are typically natural persons
   (13-character RFC) even though the company itself, once registered, will
   hold a 12-character RFC. This document does not itself have a
   `companyRfc` field, since the RFC being obtained is the very output of
   this process, not an input to it.
7. **`state` is not asserted identical to
   `mx/inm/forma-migratoria-multiple-electronica`'s 32-entry
   `destinationState` catalog.** Both fields represent a Mexican federal
   entity and are very likely backed by the same underlying government
   catalog in practice, but this document has not independently confirmed
   that SAT's own "Entidad Federativa" dropdown for this specific wizard
   uses identical option strings/casing to INM's catalog, so `state` is left
   as an open string rather than copying INM's enum values across
   authorities without direct confirmation.
8. **Page 11's "Acuse de pre inscripción" example screenshot appears to be a
   reused persona-física sample, not a persona-moral one — noted but not
   acted upon.** The guide's step 20 screenshot (page 11, continuing onto
   pages 12-13) shows the final output receipt fields "Nombre(s): ROSARIO",
   "Primer Apellido: LUNA", "Segundo Apellido: MARTINEZ", and
   "Identificación del aviso: Inscripción de **persona física**" — this is
   inconsistent with the rest of the guide's own "LA CAPERUCITA ROJA"
   persona-moral worked example, and reads as SAT having reused a
   persona-física guide's output screenshot by mistake when assembling this
   persona-moral guide. Since this receipt screen is explicitly out of scope
   for this document (it is the wizard's read-only output, not an
   input field — see "What is out of scope" below), this inconsistency does
   not affect any field in this schema, but is recorded here in case a
   future reviewer encounters the same page and wonders whether they
   mis-identified the source document.

## What is out of scope for v1.0.0

- **The live wizard's WAF/bot-mitigation gate itself.** This document could
  not be, and was not, verified against the live DOM, client-side
  validation source, or any catalog/metadata endpoint the way
  `mx/inm/forma-migratoria-multiple-electronica` was — see "Path to a
  verified claim" below.
- **The mandatory CAPTCHA/image-verification step** shown on Paso 1's
  screenshot ("Introduzca el texto de la imagen*"). Consistent with every
  other document in this registry, this document never submits on anyone's
  behalf, and the CAPTCHA value is generated per-session by the live server,
  so it is not modelled as a field.
- **The six repeating structures** listed in judgment call 3 above.
- **The full economic-activity catalog and the activity-specific
  complementary-questions sets** for any activity category other than the
  guide's one worked example — see judgment call 3.
- **The in-person conclusion of the RFC inscription** at a SAT Módulo de
  Servicios Tributarios, and the document checklist in Ficha de trámite
  39/CFF, per the guide's own final step (21). This document models only
  the online pre-registration data-entry wizard, consistent with its title.
- **The "Vista Previa" / "Resumen" screens and the final "Acuse de pre
  inscripción al Registro Federal de Contribuyentes" receipt.** These are
  read-only output the wizard generates after data entry, not input fields,
  and are not modelled as `fields` — analogous to how
  `mx/inm/forma-migratoria-multiple-electronica` excludes the post-save PDF
  the INM wizard can generate.
- **File uploads / `documents[]`.** The online wizard itself collects no
  file uploads at any of its five steps (see "What was confirmed directly"
  above), so `documents[]` is absent rather than modelling the in-person
  appointment's own separate document checklist.
- **Fee payment.** No fee or payment screen appears anywhere in this online
  wizard (unlike, e.g., a passport-application flow); the RFC pre-inscription
  step itself is free per the guide's own content — no `documents[]` payment
  entry is modelled.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch and re-read the same guide PDF end to end and confirm
no newer edition has been published, (b) most importantly, attempt a genuine
live-browser (not plain `curl`/`WebFetch`) walk of
`sat.gob.mx/aplicacion/33805/preinscribe-tu-empresa-en-el-rfc` to see whether
a real browser session clears the WAF/bot-mitigation gate that blocked this
cycle, and if so, re-derive every field, required-marker, and dropdown
catalog directly from the live DOM/client-side validation source the way
`mx/inm/forma-migratoria-multiple-electronica` was — which would resolve
judgment calls 1, 2, 5, and 7 above with much higher confidence than a static
screenshot guide can, and (c) confirm whether SAT publishes any
per-activity-category variant of the "preguntas complementarias" guide that
would let judgment call 3's sub-questionnaire gap be closed.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this document is sourced entirely from a single static PDF guide
rather than a live DOM/validator-source walk (unlike
`mx/inm/forma-migratoria-multiple-electronica`), carries multiple
open-string/scope-cut judgment calls pending live confirmation, and the
underlying guide is itself already several years old (dated 01/01/2022) —
all of which argue for the shorter end of the cadence rather than the
standard ~12-month re-check. Re-check the source, retry the live wizard for
a WAF bypass, and confirm no newer guide edition has been published, on or
before that date and on any `source.url` change.
