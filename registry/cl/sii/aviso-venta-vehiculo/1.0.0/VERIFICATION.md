# Verification record — `cl/sii/aviso-venta-vehiculo` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1638**), opening
Chile's second vertical (DMV) after `cl/sii/inicio-actividades-personas-naturales`
(Business Formation, GOV-1624, PR #271).

## Why this candidate

The brief was to investigate Chile's five other open verticals in priority
order (DMV, Taxes, Visa, Passport/National ID) and pick whichever turned up a
genuinely public, unauthenticated, field-level source first. This cycle
screened the following candidates:

1. **DMV — Registro Civil e Identificación vehicle registration
   (`registrocivil.cl`).** A direct fetch of the site's own homepage returns
   a bot-protection CAPTCHA challenge page (support-code-bearing, with an
   embedded `TSPD`/bot-manager token), not the site itself — confirmed via
   both a direct `curl` fetch and an independent WebFetch render, both
   showing only the CAPTCHA interstitial. This matches the prior cycle's
   finding for Chile's flagship company-formation, passport, and national-ID
   channels (all ClaveÚnica-gated), extended here to Registro Civil's own
   vehicle-registration channel. ChileAtiende's aggregator fichas for the
   same process (`3388-primera-inscripcion-de-vehiculos-motorizados`,
   `3409`/`3343-transferencia-de-dominio-de-vehiculos-motorizados`) all
   return HTTP 403 from CloudFront on direct fetch, matching the prior
   cycle's own finding for this same domain. No PDF fallback was found for
   either first inscription or dominio transfer.
2. **DMV — driver's licence (licencia de conducir), first-time
   application.** Multiple official and municipal sources (gob.cl,
   ChileAtiende, and several comuna transit-department pages — Las Condes,
   Vitacura, Colina, San Miguel) confirm this is exclusively an in-person,
   by-municipality process (schedule an appointment, sit theoretical/
   psychotechnical/medical/practical exams at the comuna's own Dirección de
   Tránsito) with no downloadable application form and no online wizard at
   all — a genuine dead end, not merely a login wall.
3. **DMV — Ministerio de Transportes y Telecomunicaciones (MTT/Subtrans)
   Formulario N°1, 'Solicitud de Inscripción o Anotación'
   (`mtt.gob.cl/wp-content/uploads/2022/10/Formulario-N°1-de-Inscripción-y-anotación-del-Vehículo-3.pdf`).**
   A genuine, unauthenticated, bounded 2-page PDF (recovered via the Wayback
   Machine after `mtt.gob.cl` itself proved unreachable directly from this
   environment — `ECONNREFUSED` on every attempt, while `web.archive.org`
   served a 2023 capture cleanly). Investigated and set aside: this form
   registers/annotates vehicles specifically in the Registro Nacional de
   Servicios de Transporte de Pasajeros (urban/rural bus, taxi, etc.) — a
   commercial passenger-transport-service permit system, a narrower and
   more specialized scope than a general vehicle-sale/transfer notification,
   and (being a plain non-AcroForm printed form with blank underlines, no
   fillable widgets at all per a `pdfjs-dist` annotation check) would have
   required inferring every field boundary from print layout alone with no
   widget cross-check. Set aside in favor of the SII candidate below, whose
   AcroForm widget layer gives an independently checkable field boundary for
   every value.
4. **Taxes — SII Formulario 22 (Declaración de Renta, annual income tax
   return).** `sii.cl/ayudas/formularios/f22_at2026.pdf` is a genuine,
   unauthenticated, current (AT2026) 15-page PDF, confirmed via direct
   fetch (HTTP 200). A full-document `pdfjs-dist` scan found **no
   `/AcroForm` or `/Widget` object anywhere in the file** — it is a prose
   instructivo (the "Suplemento Tributario"/line-by-line guide) with no
   fillable layer at all, describing F22's own live-online-filing wizard
   (itself Clave Tributaria/ClaveÚnica-gated, per SII's current guidance)
   rather than standing in as a fillable substitute the way F4415-PN does
   for the sibling schema. F22 is also SII's largest and most complex
   return (hundreds of line/code combinations across many schedules,
   materially exceeding the "bounded form" bar this registry applies), so
   even a from-instructivo modelling approach (as this registry has used
   elsewhere, e.g. `co/dian/declaracion-renta-personas-naturales-formulario-210`)
   would be a much larger, more error-prone single-pass undertaking than the
   candidate below. Deferred, not pursued further this cycle.
5. **Visa — Chile's consular e-visa/SAC channel.** `tramites.minrel.gov.cl`
   is live and unauthenticated at its landing page (HTTP 200), and its own
   Content-Security-Policy header names a `https://evisa.minrel.gob.cl/`
   subdomain, but that subdomain's hostname did not resolve from this
   environment (`ENOTFOUND`/`curl` exit 6 on every attempt) and the landing
   page's own prose states the visa/prior-authorization application itself
   is completed inside an authenticated "Sistema de Atención Consular"
   (SAC) session. Not independently confirmed reachable unauthenticated this
   cycle; left as an unscreened backlog candidate, not ruled out.
6. **DMV — SII Formulario 1816, 'Aviso de Venta de Vehículos' (this
   document).** Confirmed via direct fetch:
   `https://www.sii.cl/formularios/imagen/F1816.pdf` returns HTTP 200
   (`Last-Modified: 2025-02-13`, matching the currently-maintained-edition
   signal already established for `F4415_PN.pdf` on the same host), no
   login/CAPTCHA/WAF gate. `pdfjs-dist` extraction of the AcroForm layer
   found 55 widgets on page 1 (2 checkboxes, 1 page-selector combo box, 52
   text boxes) plus a 2-page prose instructivo on page 2. Unlike the sibling
   `cl/sii/inicio-actividades-personas-naturales` schema's F4415-PN, this
   form's AcroForm field names are **not** self-documenting (`Texto1`
   through `Texto54`, generic sequential names) — every field's real label
   was instead attributed by extracting the page's text layer with
   per-glyph x/y coordinates, grouping into printed rows, and matching each
   row's label position against the nearest widget rect below/beside it
   (the same coordinate-cross-matching discipline this registry has applied
   to other generically-named AcroForm layers, e.g. the Spain AEAT Modelo
   030 candidate the sibling schema's own VERIFICATION.md described but did
   not pursue). This is a genuinely public, bounded (2-page, fixed-field),
   government-hosted AcroForm PDF matching this registry's established DMV
   precedent for a vehicle-sale/transfer notification
   (`br/mg/detran/comunicacao-de-venda-de-veiculo`,
   `kr/molit/vehicle-ownership-transfer-registration`) even though it is
   administered by Chile's tax authority rather than a dedicated
   vehicle-registry body — Chile publishes no separate agency-specific
   sale-notification form for this process; SII's own F1816 is it. Picked
   as this cycle's candidate.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Servicio de Impuestos Internos (SII)
- **Document:** Formulario 1816, "Aviso de Venta de Vehículos" (a "declaración
  jurada" — sworn declaration)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.sii.cl/formularios/imagen/F1816.pdf> — a genuine two-page
  fillable AcroForm PDF, 338,861 bytes, `Last-Modified: 2025-02-13` (the same
  currently-maintained-edition signal already confirmed for the sibling
  schema's F4415-PN on this host).
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js`.
  `getAnnotations()` was used for the AcroForm widget layer (field name,
  type, rect, checkbox export values — 55 widgets on page 1, none on page
  2); `getTextContent()` was used for the page's own text layer, with each
  item's `transform[4]`/`transform[5]` (x/y) coordinates extracted directly
  (not just the joined string `pdfjs-dist`'s own text-content concatenation
  produces, which loses column/row structure), grouped into rows by rounded
  y-coordinate, and sorted by x-coordinate within each row. Every field in
  this document's `fields[]` was attributed to its printed label by matching
  each widget's rect position against the nearest label row above/beside it
  — necessary here (unlike the sibling schema) because this form's AcroForm
  field names (`Texto1`…`Texto54`, `Casilla de verificación52/53`) carry no
  descriptive information of their own.
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** every field's exact position and section on page 1,
  and page 2's own prose instructivo (§§1–5), which states who must file,
  where, what accompanying documents are required, and which of the form's
  sections (A/B/C always; D/E only for specific taxpayer categories) are
  mandatory for which filer.

### Source 2 (corroborating, still-current check)

- A live web search (2026-07-07) independently confirmed Formulario 1816
  remains the currently-cited SII form for this process (search results
  citing `sii.cl/formularios/imagen/F1816.pdf` directly, alongside
  third-party notary/legal sites referencing the same form number and
  process), and confirmed the alternative private-vehicle transfer/sale
  channel (`registrocivil.cl` "declaración consensual" or notarial
  transfer) is a materially different process from this form's own scope
  (commercial passenger/cargo-for-hire vehicles a taxpayer sells).

## Field inventory (Phase 3)

All 40 `fields[]` entries and their exact source widget/label are listed
inline in `schema.json`'s own `sourceRef` per field. Summary by section:

| Section | Fields | Always mandatory? |
|---|---|---|
| Encabezado (header) | `rutVendedor` | Yes (instructivo §4.1, "en todos los casos... Rol Único Tributario (vendedor)") |
| A. Identificación del Vendedor | `razonSocialApellidoPaternoVendedor`, `apellidoMaternoVendedor`, `nombresVendedor`, `domicilioCalleVendedor`, `domicilioNumeroVendedor`, `domicilioOficinaLocalDeptoVendedor`, `domicilioPoblacionVillaVendedor`, `domicilioComunaVendedor`, `domicilioFonoVendedor` | Core name/address fields yes (per §4.1's "Sección A. Individualización del vendedor"); secondary components (materno surname, oficina/depto, población/villa, fono) modelled optional, no per-field mandatory marker |
| Representante/Mandatario | `apellidoPaternoRepresentante`, `apellidoMaternoRepresentante`, `nombresRepresentante`, `rutRepresentante` | No — conditional on a representative acting, a category this form has no field to flag |
| Individualización del Comprador | `razonSocialApellidoPaternoComprador`, `apellidoMaternoComprador`, `nombresComprador`, `domicilioCalleComprador`, `domicilioNumeroComprador`, `domicilioOficinaLocalDeptoComprador`, `domicilioPoblacionVillaComprador`, `domicilioComunaComprador`, `domicilioFonoComprador` | Same pattern as vendedor |
| B. Detalles | `fechaIniciacionActividad`, `fechaVenta`, `precioVenta`, `nombreNotario`, `numeroRepertorio` | Yes (instructivo §4.1's own "Sección B. DETALLES" list) |
| C. Identificación del Vehículo | `inscripcionRVM`, `tipoVehiculo`, `marcaVehiculo`, `modeloVehiculo`, `anioVehiculo`, `otrosDetallesVehiculo` | Yes for the five instructivo-named items; `otrosDetallesVehiculo` optional (not named in the instructivo's own list) |
| D. Determinación de la Utilidad en Venta | `precioVentaUtilidad`, `costoAdquisicionActualizado`, `utilidadPerdida`, `numeroUltimaFacturaEmitida` | Only for §4.3-category filers (multi-vehicle owners, companies, partial-liquidation Renta Presunta cargo-transport sellers) — no field on the form distinguishes this category, so modelled optional |
| E. Declaro que Continuaré... | `continuaPrimeraCategoriaSi`, `continuaPrimeraCategoriaNo` | Only for §4.2-category filers (single-vehicle individual sellers, full-liquidation Renta Presunta cargo sellers) — same limitation, modelled optional |

Total: **40 fields**, plus **2 `documents[]`** entries (Certificado RNVM,
required; Borrador del Contrato Notarial, conditional on cargo-for-hire
ownership) and **1 `exclusivityGroups`** entry (`continuacionPrimeraCategoria`,
capturing the Sí/No checkbox pair).

## Access notes and judgment calls

1. **No native per-field required/length constraint exists anywhere in this
   PDF**, exactly as the sibling schema's F4415-PN — every AcroForm widget's
   own `required` and `maxLen` annotation properties are uniformly
   `false`/`0`/`undefined`. `required: true` is applied only to the fields
   inside the three sections (A, B, C) the instructivo's own §4.1 names as
   always-mandatory; within those sections, structurally-supplementary
   components (a second surname, oficina/depto, población/villa, one of the
   two phone numbers, "otros detalles") are modelled `required: false`, for
   the same reason as the sibling schema.
2. **Sections D and E are each conditional on a taxpayer-category
   distinction (§4.2 vs §4.3) this form provides no field to capture.**
   Rather than fabricate a `requiredWhen` referencing a field that does not
   exist, both sections' fields are modelled `required: false` (visible
   unconditionally, since there is likewise no field to gate `visibleWhen`
   on). This is disclosed prominently in each affected field's own
   `description` in `schema.json`, not just here.
3. **This form's AcroForm field names are generic (`Texto1`…`Texto54`),
   unlike the sibling schema's F4415-PN.** Every field attribution in this
   document was made by coordinate-matching the widget's rect against the
   page's own text layer, not by name-guessing. A reviewer can independently
   re-verify any attribution by re-running the same extraction and checking
   the cited widget's rect against the label's row position (see Source 1
   above).
4. **Three day/month/year AcroForm text-box triplets are each merged into
   one `date`-typed field** (`fechaIniciacionActividad` from `Texto33`/`34`/
   `35`; `fechaVenta` from `Texto36`/`37`/`38`) — the form itself prints
   these as three narrow adjacent boxes, but this registry models the
   logical value, not the raw widget count, consistent with how
   `fechaInicioActividades` was modelled as a single field in the sibling
   schema despite date sub-components elsewhere in this registry's other
   schemas.
5. **The 'FOLIO' box (AcroForm field `Texto1`) and the page-selector combo
   box (AcroForm field `00`, options "PÁGINA 1 DE 2"/"PÁGINA 2 DE 2") are
   deliberately excluded from `fields[]`.** The former is an office-assigned
   sequential control number (not applicant-entered, matching this
   registry's precedent of excluding office-use-only header boxes); the
   latter is a print/page-navigation artifact, the same discipline the
   sibling schema applies to its own `original-copia` exclusion.
6. **The reverse-side/bottom-of-form "USO EXCLUSIVO SII" fiscalizador
   signature/stamp block, the notarial-authorization-validity line, and the
   "CERTIFICADO DE REG. NAC. DE VEHÍCULOS MOTORIZADOS DE FECHA" line all
   have no corresponding AcroForm widgets at all** (confirmed — the
   annotation scan found only 55 widgets total, none positioned in that
   region) and are not applicant-supplied data regardless.
7. **A single narrow widget (`Texto54`, rect y≈108.5–125.9) sits directly
   above the printed caption "FIRMA DE CONTRIBUYENTE O REPRESENTANTE."**
   Interpreted as the physical-signature line for the form's own printed
   attestation, not applicant domain data, and not modelled in `fields[]` —
   consistent with this registry's established discipline of excluding
   signature/stamp blocks.
8. **`tipoVehiculo` is modelled as an open string, not an enum.** The
   instructivo's own parenthetical example list ("auto, bus, camión,
   camioneta, etc.") is explicitly non-exhaustive (ends "etc."), unlike the
   closed, fully-enumerated legends this registry closes into enums
   elsewhere (e.g. the sibling schema's `calidadOcupacionDomicilio`).
9. **The "Borrador del Contrato Notarial" document is modelled
   `required: false`** because the instructivo's own §4.1 restricts it
   explicitly to "los contribuyentes propietarios de vehículos destinados
   al transporte de carga ajena" (cargo-for-hire vehicle owners only) — a
   category this form provides no field to flag, the same limitation as
   judgment call 2.
10. **The instructivo's own closing note in §4.1 ("los contribuyentes que
    exploten... vehículos motorizados en el transporte de carga ajena,
    acogidos al sistema de Renta Presunta, además deben adjuntar la última
    factura emitida y timbradas sin uso") describes attaching a physical
    invoice/unused-invoice-booklet, distinct from the form's own
    `N° DE ÚLTIMA FACTURA EMITIDA` text field** (modelled as
    `numeroUltimaFacturaEmitida`). The physical attachment itself is not
    modelled as a separate `documents[]` entry this cycle — a narrower,
    niche special case left undisclosed as a fabricated document entry
    rather than itemized without a clean textual anchor, the same
    discipline the sibling schema applies to its own §6 "Casos Especiales"
    exclusion.

## Test run (Phase 4)

No live submission was attempted: this is a sworn tax declaration
("declaración jurada") against SII's own live Término de Giro unit, and
submitting fabricated vehicle-sale data against a real production tax
registry is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory (see `conformance/cl/sii/aviso-venta-vehiculo/1.0.0/`)
and independently checked with a standalone ajv-free rule-tracing script
(not committed — reads `schema.json`'s own `required`/`requiredWhen`/
`visibleWhen`/`validation`/`exclusivityGroups` and evaluates them against
each mock record) in addition to the repo's own validators:

**Scenario 1 — single-vehicle individual taxi owner (§4.2 category), the
committed `application-packet.json`.** A sole owner sells her only
passenger-transport vehicle and declares continuation as a Primera
Categoría taxpayer. Sección D (utilidad) is correctly absent (no
`requiredWhen`/`visibleWhen` references it, since no field distinguishes the
category — see judgment call 2); `continuaPrimeraCategoriaSi: true` /
`continuaPrimeraCategoriaNo: false` satisfies the `continuacionPrimeraCategoria`
exclusivity group (at most one `true`). Passes with zero errors.

**Scenario 2 — small transport company (persona jurídica) with a legal
representative, selling one of several buses it owns (§4.3 category).**
Exercises the `apellidoPaternoRepresentante`/`apellidoMaternoRepresentante`/
`nombresRepresentante`/`rutRepresentante` block and populates Sección D's
three utility-calculation fields (`precioVentaUtilidad`,
`costoAdquisicionActualizado`, `utilidadPerdida`) with a consistent
precio-menos-costo-igual-utilidad arithmetic relationship, while Sección E's
Sí/No fields are correctly left absent. Passes with zero errors.

**Negative controls** (each expected to fail exactly one rule, verified
against the standalone script above): (a) removing `nombreNotario` from
Scenario 1 — correctly flagged as a missing required field; (b) setting
both `continuaPrimeraCategoriaSi` and `continuaPrimeraCategoriaNo` to `true`
in Scenario 1 — correctly flagged as an exclusivity-group violation; (c)
`rutVendedor: "156782345"` (no dash/check digit) — correctly flagged as a
`validation.pattern` violation; (d) `anioVehiculo: "18"` (not 4 digits) —
correctly flagged as a `validation.pattern` violation. All four negative
controls were correctly rejected.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/cl/sii/aviso-venta-vehiculo/1.0.0/schema.json
ok   registry/cl/sii/aviso-venta-vehiculo/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cl/sii/aviso-venta-vehiculo/1.0.0/schema.json
ok   registry/cl/sii/aviso-venta-vehiculo/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
