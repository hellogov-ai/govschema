# Verification record — `mx/semovi/alta-vehiculo-foraneo` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

This document was derived from SEMOVI's own official citizen manual PDF for
this exact procedure ("Segundo manual: Perfil ciudadano"), not a live-browser
walk of the wizard itself (which requires a "Llave CDMX" citizen account —
see below). It remains `draft`, not `verified`, pending an independent second
reviewer's field-by-field pass, and pending a live-wizard re-walk if a Llave
CDMX test account ever becomes available.

## Why this document exists

CATALOG.md's "Known Gaps" section explicitly flagged CDMX's SEMOVI
"Ventanilla de Control Vehicular" manual as the strongest already-scouted,
unauthored DMV candidate for Mexico (GOV-1414's own VERIFICATION.md had
scouted it and left it for a future cycle in favor of the more explicitly
flagged Taxes gap that cycle closed). Mexico was opened as the registry's
16th jurisdiction via `mx/inm/forma-migratoria-multiple-electronica`
(GOV-1393, Visa) and has since closed Business Formation
(`mx/sat/preinscripcion-rfc-persona-moral`, GOV-1414) and Taxes
(`mx/sat/declaracion-anual-sueldos-salarios`, GOV-1428). This cycle
(GOV-1435) picks up the DMV candidate, closing Mexico's fourth vertical.
Vehicle registration in Mexico is administered by each state/CDMX
individually, not federally, so this document is classified as
`jurisdiction.level: subnational`, `subdivision: MX-CMX` — the same modelling
this registry already uses for `br/sp/jucesp/cnpj-registration-dbe` (a
state-level authority feeding a nationally-relevant registration), per the
task's own precedent instruction.

## Source examined

- **Document `(id, version)`:** `mx/semovi/alta-vehiculo-foraneo` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Secretaría de Movilidad de la Ciudad de México (SEMOVI)
- **Live wizard (not directly used as source — see below):**
  `https://tramites.cdmx.gob.mx/ventanillavehicular/public/` — every direct
  fetch from this environment (`curl`, `WebFetch`) times out at the
  connection layer (confirmed a network-layer timeout against the
  `*.cdmx.gob.mx` host generally, not a 403/WAF response — consistent with
  this cycle's own task brief and with `mx/inm/forma-migratoria-multiple-electronica`'s
  and `mx/sat/preinscripcion-rfc-persona-moral`'s prior experience with
  `cdmx.gob.mx`/`sat.gob.mx` hosts in this sandbox). The wizard also requires
  prior authentication with a "Llave CDMX" citizen account (visible in the
  manual's own Imagen 1/Imagen 2 login screenshots), which this cycle has no
  test credentials for regardless of network reachability.
- **Primary source actually used:**
  `https://tramites.cdmx.gob.mx/ventanillavehicular/public/assets/manual_ciudadano-VCV-alta.pdf`
  — "Ventanilla de Control Vehicular: Alta de Vehículo — Segundo manual:
  Perfil ciudadano", Secretaría de Movilidad de la Ciudad de México, 17
  pages. Fetched via a Wayback Machine mirror
  (`https://web.archive.org/web/20230424172715/https://tramites.cdmx.gob.mx/ventanillavehicular/public/assets/manual_ciudadano-VCV-alta.pdf`,
  snapshot dated 2023-04-24) since the live `cdmx.gob.mx` host itself is
  unreachable from this environment. HTTP 200, genuine `%PDF-1.4` content,
  3,193,813 bytes. `source.url` in `schema.json` cites the original
  `tramites.cdmx.gob.mx` URL (the canonical government location), consistent
  with this registry's existing precedent for a Wayback-mirrored source
  (`br/sp/jucesp/cnpj-registration-dbe`'s `VERIFICATION.md`) — the Wayback
  detour is recorded here, not substituted into `source.url` itself.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the manual PDF via the Wayback mirror above.
2. Extracted the PDF's text layer with `pdfjs-dist` (pinned to `3.11.174`
   per this cycle's own task brief, a version documented as compatible in
   this environment) via `getTextContent`. This recovered only the manual's
   **narrative instructional prose** across all 17 pages — confirming the
   manual carries no text layer for its embedded screenshots ("Imagen 1"
   through "Imagen 26"). Every field label, option, and required/optional
   cue in this document therefore comes from the screenshots themselves, not
   the text layer.
3. Rendered each relevant page (4–11, covering the login/dashboard framing
   and the full "Alta de vehículo foráneo" data-entry wizard through its
   completion screen) to PNG using `pdfjs-dist`'s page-rendering API, at up
   to 8x viewport scale for legibility, then directly **visually read** (not
   OCR'd) each rendered page, cropping sub-regions at full native resolution
   where a screenshot's own edges were ambiguous (see judgment call 2 below).
   **Canvas-backend technique note for a future cycle:** `@napi-rs/canvas`
   (the backend `mx/sat/preinscripcion-rfc-persona-moral`'s VERIFICATION.md
   recommended) segfaulted natively on every `page.render()` call against
   this specific `pdfjs-dist` version in this environment, even after
   polyfilling `global.Path2D`/`DOMMatrix`/`ImageData`/`Image` from the same
   `@napi-rs/canvas` package (isolated to the render call itself via a
   minimal repro; not a font-glyph-path issue this time, since the crash
   reproduced even prior to any text being drawn). Switching the canvas
   backend to the `canvas` package (node-canvas, Cairo-based) resolved this
   immediately with no polyfills needed — a different resolution than the
   prior cycle's, and worth trying first in a future cycle before assuming
   `@napi-rs/canvas` is the fix.
4. The manual is framed entirely as generic instructions (no single worked
   fictional applicant is carried end-to-end the way
   `mx/sat/preinscripcion-rfc-persona-moral`'s "LA CAPERUCITA ROJA" guide
   was) — screenshots show placeholder/masked or empty form controls rather
   than one consistent worked example's values throughout. Example values in
   this document's field descriptions are therefore GovSchema's own
   plausible, fabricated examples (a fake VIN, a fake CURP shape, etc.), not
   transcribed from the source the way `mx/sat`'s worked-example values
   were — consistent with how every other field in this document is
   sourced (label, presence, required/optional cue, and screen grouping are
   all source-derived; example *values* are this document's own, clearly
   fabricated for illustration, as GSP-0001/the field model does not require
   a field's `description` to reproduce a literal source example when none
   exists in the source).

## What was confirmed directly (verbatim, from the manual's screenshots)

- The manual's own explicit scope statement (§1.1, p.3): "Actualmente, el
  trámite disponible es el de ALTA NUEVO de AUTO PARTICULARES FORÁNEOS. Es
  decir, vehículos que nunca han estado registrados en el padrón vehicular de
  la CDMX." — this document models exactly that pathway (an out-of-state
  vehicle never before registered in CDMX), not a brand-new-from-dealer
  vehicle purchase.
- The landing page's own "Alta de vehículo foráneo (Particular)" panel
  (Imagen 3, p.5): "Alta de vehículos particulares que tengan placas de otra
  entidad federativa sin registro previo en el padrón de la CDMX", and its
  own listed "Consideraciones": "Este trámite no aplica para los siguientes
  vehículos: Híbridos, Motocicletas" — hybrid vehicles and motorcycles are
  out of scope for this online pathway per the source's own text, not this
  document's own restriction.
- The three-tab wizard structure ("Datos del propietario" / "Datos del
  vehículo" / "Recolección de aditamentos") visible in the left-hand
  navigation on every relevant screenshot (Imagen 7, 8, 14).
- The "Soy persona: Física / Moral" toggle (Imagen 7, p.7) and that the
  wizard "habilita[n] campos o documentos distintos" (enables different
  fields/documents) for each, per the manual's own prose (p.6) — though only
  the Física branch's fields are ever shown (see judgment call 1).
- The VIN/clave-vehicular validation behavior against SEMOVI's own padrón
  vehicular, stated explicitly in the manual's own prose (p.7): "Estos campos
  serán validados en el padrón vehicular de la SEMOVI...Si tu VIN o Clave no
  son aceptadas o arrojan información incorrecta, deberás contactar a SEMOVI
  ... y por ende no podrás continuar con el trámite."
- The full branch structure and every field/document shown for: the
  comprobante-de-baja Sí/No branch (Imagen 9, 10, including the acta de
  denuncia/extravío conditional upload); the ownership-proof a)/b) branch
  (Imagen 11, 12, including the additional sale-document and seller-ID
  uploads on branch b); the imported-vehicle pedimento sub-section (Imagen
  13); and the aditamentos-pickup choice (Imagen 14).
- That completing the wizard produces a folio (e.g. "VRV-00000730") and a
  five-stage status tracker ("Solicitud capturada" → "Validando documentos" →
  "En espera de pago" → "En espera de que recoja aditamentos" → "Trámite
  concluido") shown on Imagen 15.1/15.2 — this document models only the
  initial data-entry/document-upload stage that produces the folio, not the
  subsequent SEMOVI validation, correction (§2.3), fee-payment (§2.4), or
  plate-pickup-scheduling (§2.5) stages, each of which the manual describes
  as its own later, separate screen a validated applicant returns to.

## Interpretive judgment calls flagged for an independent reviewer

1. **The "persona moral" (legal-entity) owner branch is entirely out of
   scope for this v1.0.0.** The manual's own prose confirms the wizard
   "habilita campos o documentos distintos" for a moral-person owner, but no
   screenshot anywhere in the 17-page manual shows what those fields or
   documents actually are — only the "Física" branch's three visible fields
   (`ownerCurp`, `ownerPhoneNumber`, `ownerStreet`) are modelled, each gated
   `requiredWhen ownerPersonType == "fisica"`. A reviewer with live-wizard
   access should add the moral-person branch's own fields once confirmed.
2. **`ownerStreet`'s screen is visibly cropped in the manual itself, not by
   this document's own extraction.** Imagen 7's screenshot ends abruptly
   immediately below the three visible input boxes' top edges (confirmed at
   8x render scale — the input boxes themselves are cut off mid-height in
   the source PDF's own embedded image, not merely by this document's page
   rendering). A typical Mexican address form of this kind would ordinarily
   also collect a postal code, colonia, exterior/interior number, and
   alcaldía/municipio at minimum — none of these appear anywhere in the
   manual, so none is modelled here. This document does not assert that
   `ownerStreet` is the only address field the live wizard collects, only
   that it is the only one confirmed by the source.
3. **`previousLicensePlate`'s upstream entry point is not identified.** The
   manual's own prose says this field "aparecerá precargada con la
   información que ingresaste al inicio" (will appear pre-loaded with the
   information you entered at the start), but no earlier screenshot in the
   manual shows a plate-entry control — plausibly it is entered on the very
   part of the "Datos del propietario" screen that judgment call 2 notes is
   cropped out of view, but this is not confirmed. `previousLicensePlate` is
   modelled as `required: false` (since the manual shows it pre-filled and
   greyed-out at the point it is visible) with this gap disclosed in its
   description rather than asserting a specific origin.
4. **`vehicleOrigin` (nacional/importado) is inferred entirely from
   narrative text, with no screenshot of its own control.** The manual's
   prose (p.9, preceding Imagen 13) states "si seleccionaste que el vehículo
   es importado el sistema te pedirá cargar el pedimento de
   importación...Si tu vehículo es nacional, estos campos no serán
   visibles" — confirming the field's functional effect and its two-value
   nature, but never showing the selector control itself (its exact label,
   whether it is a toggle/dropdown/radio group, or whether more than two
   values exist). This is a materially lower-confidence field than any other
   in this document, all of which are confirmed directly from a screenshot;
   flagged here rather than silently modelled at the same confidence level.
5. **Four dropdown fields modelled as open strings, not closed enums,
   because the manual never expands their option lists**: `previousPlateState`
   (Entidad de la placa anterior), `vehicleCommercialBrand` (marca comercial),
   `invoiceDocumentType`/`saleDocumentType`/`sellerIdDocumentType`/
   `importDocumentType` (all four "Seleccionar tipo de documento" controls).
   Every one of these renders as a live `<select>`-style dropdown in its
   screenshot, but each screenshot shows only the unopened control reading
   "Seleccionar" — never an expanded option list. Following this registry's
   established precedent for this exact situation (see
   `mx/sat/preinscripcion-rfc-persona-moral`'s judgment call 1), these are
   left as open strings rather than fabricated closed enums. `previousPlateState`
   is additionally not asserted identical to any other MX schema's federal-entity
   catalog (e.g. `mx/inm/forma-migratoria-multiple-electronica`'s
   `destinationState`) without direct confirmation against this specific
   wizard's own catalog.
6. **The third-party aditamentos-pickup sub-flow's data/document
   requirement is out of scope.** The manual's prose (p.10) says selecting
   "Alguien más" requires the applicant to "adjuntar la información del
   tercero que asistirá" (attach the third party's information), but shows
   no screenshot of what that consists of — unlike judgment call 4
   (`vehicleOrigin`), where the narrative at least implies a specific
   two-value field, here there is no indication at all of shape (a data
   field? a file upload? both? an authorization letter?). Rather than
   guessing at a field this uncertain, only the top-level
   `aditamentosPickupBy` choice is modelled; the third-party information
   requirement itself is not.
7. **CURP pattern validation reuses the standard 18-character CURP regex**,
   the same shape used for `mx/sat/preinscripcion-rfc-persona-moral`'s
   analogous fields' sibling documents in this registry's broader Mexican
   corpus, since CURP format is a fixed federal standard independent of
   which agency's form collects it.
8. **VIN pattern validation uses the standard 17-character ISO 3779 VIN
   shape** (excluding I/O/Q), a generic international standard rather than
   anything SEMOVI-specific, since the manual does not publish its own VIN
   format rule beyond "validated against the padrón vehicular."
9. **No worked fictional example is transcribed from the source, unlike
   `mx/sat/preinscripcion-rfc-persona-moral`'s "LA CAPERUCITA ROJA" guide.**
   This manual's screenshots show empty or placeholder-masked form controls
   throughout rather than one consistent applicant's filled-in values, so
   this document's field `description`s do not (and could not) cite a
   source-verified example value the way that sibling document's could —
   see Extraction method step 4.
10. **The manual's own later sections (§2.2–§2.5: tracking an in-progress
    trámite, correcting a rejected one, paying the resulting fee/tenencia
    line via a "Línea de Captura", and scheduling the in-person plate-pickup
    appointment) are entirely out of scope for this v1.0.0**, consistent
    with this registry's standing convention of modelling the online
    data-entry/document-upload wizard up to its first output (a folio),
    not any subsequent government-side processing, payment, or in-person
    step. No fee/payment `documents[]` entry is modelled since the fee
    screen the manual describes (§2.4) belongs to that later, out-of-scope
    stage, not to the data-entry wizard itself.

## What is out of scope for v1.0.0

- **The Llave CDMX login/authentication step** (Imagen 1, 2) — a
  login/bot-check mechanic, not a data field, consistent with every other
  document in this registry.
- **The persona moral (legal-entity) owner branch** — see judgment call 1.
- **Any owner-address field beyond `ownerStreet`** — see judgment call 2.
- **The third-party aditamentos-pickup information requirement** — see
  judgment call 6.
- **§2.2 Seguimiento de trámites** (tracking an in-progress application's
  status via the bandeja de trámites) — read-only status view, not an input
  to this wizard.
- **§2.3 Correcciones en trámites** (SEMOVI validator-flagged field
  corrections) — a re-entry/correction flow over the same fields this
  document already models, triggered by a government-side review outcome,
  not a first-pass data-entry field.
- **§2.4 Pago de trámites** (fee/tenencia payment via a generated "Línea de
  Captura") — a subsequent payment stage reached only after SEMOVI validates
  the submission; no fee amount is stated anywhere in this manual.
- **§2.5 Planear recoger aditamentos para circular** (scheduling the
  in-person plate-pickup appointment via SEMOVI's own separate citas
  system) — an out-of-wizard, in-person concluding step, the same category
  of exclusion as `mx/sat/preinscripcion-rfc-persona-moral`'s in-person SAT
  Módulo appointment.
- **The "Vista Previa" / final folio and status-tracker screens**
  (Imagen 15.1, 15.2, 16) — read-only output the wizard generates after data
  entry, not input fields.
- **The mandatory Llave CDMX-gated session state and any CAPTCHA/bot-check
  the live wizard may impose** — not observed directly in this manual's
  screenshots (none is shown), but flagged for completeness the same way
  every other document in this registry excludes such mechanics on principle
  even absent direct confirmation of the exact control.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch and re-read the same manual PDF end to end and
confirm no newer edition has been published (the manual carries no visible
revision date of its own; only the Wayback snapshot date, 2023-04-24, is
available as a proxy), (b) most importantly, obtain a Llave CDMX test
citizen account and attempt a genuine live-browser walk of
`tramites.cdmx.gob.mx/ventanillavehicular/public/`'s "Alta de vehículo
foráneo (Particular)" wizard to resolve judgment calls 1–6 above with direct
DOM/client-side-validation confirmation — this would additionally confirm or
correct the four dropdowns' full option catalogs (judgment call 5), and (c)
confirm whether SEMOVI has since published a citizen manual covering the
persona moral branch or the third-party-pickup sub-flow separately.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this document is sourced entirely from a single static PDF manual
rather than a live DOM/validator-source walk, carries a materially larger
number of open-string/scope-cut/lower-confidence judgment calls than a
typical `verified`-track candidate (ten, versus this registry's usual half
that count), and the underlying manual's own currency cannot be confirmed
beyond its 2023 Wayback snapshot date — all of which argue for the shorter
end of the cadence rather than the standard ~12-month re-check. Re-check the
source, retry the live wizard for a Llave CDMX test account, and confirm no
newer manual edition has been published, on or before that date and on any
`source.url` change.
