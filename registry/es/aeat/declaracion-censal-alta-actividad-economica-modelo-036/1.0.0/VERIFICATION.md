# Verification record — `es/aeat/declaracion-censal-alta-actividad-economica-modelo-036` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1659**), a general
research-analyst brief covering the full catalog: verify and deepen two
pre-screened candidates, pick the strongest (or pivot if both are weaker than
expected), author it fully, test it, and commit.

## Why this candidate

CATALOG.md's "Known Gaps & Opportunities" and its own Business Formation
section both explicitly flag Spain's Business Formation vertical as the
registry's one remaining unscreened gap for a jurisdiction that already has
two other verticals (Taxes via `es/aeat/declaracion-censal-personas-fisicas-modelo-030`,
DMV via `es/dgt/solicitud-tramites-vehiculo`). This cycle's brief named two
pre-screened candidates and asked for both to be deepened before picking:

1. **Chile — Taxes (SII Formulario 22, Declaración de Renta).** Re-confirmed
   this cycle: `https://www.sii.cl/ayudas/formularios/f22_at2026.pdf` is a
   genuine, current PDF (HTTP 200, ~1.3MB) hosted directly on `sii.cl`, but
   independently re-checked for `/AcroForm`/`/Widget` markers and confirmed to
   carry neither — it is a static specimen/reference form, not a fillable
   AcroForm. The two named guide alternatives
   (`guia_practica_renta_2026.pdf` and
   `guia_trib_suplemento_2026.html`) were fetched this cycle: the
   suplemento page does give código/recuadro-level guidance (e.g. "recuadro
   2," "código 1887," an "Instrucción" button per código, worked
   "Ejercicios prácticos"), but its own visible structure orients toward the
   full range of taxpayer types and income sources Formulario 22 covers, with
   no confirmed simplified wage/salary-only track comparable in scope to this
   registry's other individual-income-tax schemas (`id/djp/...1770s`,
   `za/sars/individual-income-tax-return-itr12`). Combined with
   `cl/sii/aviso-venta-vehiculo`'s own prior screening record (SII's largest,
   most complex return), this remains a viable-but-weaker future candidate —
   scoping a genuinely bounded wage-only pathway out of a códigos-based guide
   this broad, without a fillable form to anchor field boundaries, is a
   larger and more failure-prone undertaking than the candidate below.
2. **Spain — Business Formation (Modelo 036/037, Declaración Censal).**
   Deepened this cycle and picked. Modelo 037 (the shorter, simplified sibling
   form the brief flagged as a possible fallback) is confirmed **suppressed**:
   a live web search this cycle found Orden HAC/1526/2024 (BOE-A-2025-410,
   published 2025-01-09, effective 2025-02-03) eliminates Modelo 037 outright,
   corroborated across several independent secondary sources (Iberley,
   Billin, Rivero Gustafson Abogados, Plana Ventura Garcés, Tirant Prime,
   Fiscal-Impuestos, Fundesplai) all describing the same order and effective
   date. Modelo 036's own live procedure page
   (`sede.agenciatributaria.gob.es/Sede/procedimientoini/G322.shtml`) links
   only to two session-based web applications
   (`wlpl/BU36-M036/MOD036/index.zul`, one authenticated via
   Cl@ve/certificado, one an unauthenticated 'Cumplimentación, validación y
   obtención en PDF para su impresión' wizard that outputs a PDF only after
   an online fill+validate step) — neither is a standalone downloadable
   blank AcroForm, confirming the brief's own concern. However, this cycle
   found a much stronger alternative source: AEAT's own official, current,
   fully unauthenticated **"Guía práctica para cumplimentación del modelo
   censal 036"** (root: `sede.agenciatributaria.gob.es/Sede/ayuda/
   manuales-videos-folletos/manuales-practicos/
   guia-practica-cumplimentacion-modelo-censal-036.html`, footer-dated
   26/marzo/2026, i.e. actively maintained), a full chapter-and-casilla-numbered
   walkthrough — not the mere "instrucciones PDF" the brief had flagged as
   possibly too thin, but AEAT's flagship structured guide for this exact
   form, directly comparable in depth to `co/dian/declaracion-renta-
   personas-naturales-formulario-210`'s own instructivo-sourced authoring.
   Its own "Modelo 036 declaración censal simplificada" summary page gives an
   explicit eligibility test and a clean casilla-by-causa table, letting this
   document scope tightly to the natural-person, alta-only, simplified-036
   pathway. Picked over Chile Taxes as the stronger, better-bounded,
   more-precisely-sourced candidate this cycle.

## Sources examined

### Source 1 (primary `source`, the guide)

- **Authority:** Agencia Estatal de Administración Tributaria (AEAT)
- **Document:** "Guía práctica para cumplimentación del modelo censal 036"
- **Root URL (directly retrieved, HTTP 200, no login):**
  <https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/guia-practica-cumplimentacion-modelo-censal-036.html>
- **Retrieved / reviewed:** 2026-07-07. Every page fetched this cycle
  returned HTTP 200 with no login/CAPTCHA/WAF gate, footer-dated
  26/marzo/2026 (a currently-maintained edition, not a stale mirror).
- **Pages read in full this cycle** (chapter → sub-page):
  - `.../capitulo-01-cuestiones-generales/causas-presentacion-obligados-declarar/alta-modelo-036.html` (+ `casilla-110-solicitud-numero-identificacion-036.html`, `.../personas-fisicas.html`, `casilla-111-alta-censo-empresarios-036.html`)
  - `.../capitulo-02-identificacion/modelo-036/pagina-2a-identificacion-personas-fisicas.html` (+ `identificacion.html`, `domicilio-fiscal-espana.html`, `domicilio-efectos-notificaciones.html`, `datos-telefonos-direcciones-electronicas-recibir-aeat.html`)
  - `.../capitulo-04-actividades-economicas-locales/cumplimentacion-declaracion-actividades-economicas-locales.html` (+ `actividad.html`, `lugar-realizacion-actividad.html`, `lugar-realizacion-actividad/actividad-local-determinado.html`, `.../actividad-fuera-local-determinado.html`)
  - `.../capitulo-06-impuesto-sobre-valor-anadido/inicio-actividad.html` (+ `regimenes-aplicables/regimen-general-modelo-036.html`, `.../simplificado-modelo-036.html`, `.../recargo-equivalencia-modelo-036.html`, `.../agricultura-ganaderia-pesca-modelo-036.html`, `.../regimen-especial-criterio-caja-modelo-036.html`)
  - `.../capitulo-07-irpf-is-irnr/irpf-modelo-036.html` (+ `metodo-estimacion-irpf.html`, `.../estimacion-directa-simplificada.html`, `.../estimacion-objetiva.html`)
  - `/Sede/Ayuda/guia-practica-declaracion-censal/capitulo_1/modelos/036-simplificada.html` — the "Modelo 036 declaración censal simplificada" summary page, giving the eligibility test and the causa/casilla/página table this document's own scope is built on (casillas 111/122/124/125/127/131/132/136/150).
- **Extraction method:** direct HTTP fetch (`curl`, no browser rendering
  needed — every page is server-rendered HTML) followed by tag-stripping and
  HTML-entity decoding via a small Python script; every casilla number, box
  label, and eligibility rule cited in `schema.json`'s `sourceRef`s and
  descriptions was read directly from this plain-text extraction, not
  inferred from a summary.
- **What it confirms:** the simplified-036 eligibility test (fiscally
  resident natural person, fiscal domicile = domicilio de gestión, not a
  large company, no VAT special regime other than Simplificado/
  Agricultura-Ganadería-Pesca/Recargo de Equivalencia/Criterio de Caja); the
  causa 111 "Alta en el censo" table; the Página 2A identification/domicilio
  fiscal/domicilio-notificaciones/teléfono-email fields and casilla numbers
  (A4, A11-A25, A30, A39, A41-A60); the activity table (casillas 400,
  402-404) and its ten-row type/code classification; the "lugar de
  realización de la actividad" branch (casillas 405-411 for "fuera de un
  local determinado," a distinct address block for "en local determinado");
  and the VAT/IRPF regime casilla numbers (510, 550, 514, 534, 608, 609,
  604).

### Source 2 (corroborating, Modelo 037 suppression)

- A live web search (2026-07-07) independently found and cross-checked
  Orden HAC/1526/2024 (published in the BOE 2025-01-09, in force
  2025-02-03) across seven independent secondary sources (Iberley, Billin,
  Adade, e-Consulting, Rivero Gustafson Abogados, Plana Ventura Garcés,
  Tirant Prime, Fiscal-Impuestos, Fundesplai — several converging on the
  identical order number/date), all describing the same effect: Modelo 037
  is suppressed and its former filers must now use Modelo 036. This directly
  answers the brief's own open question ("verify this against AEAT's own
  current published forms/BOE before trusting it") — confirmed true, and
  Modelo 036 (not 037) is this document's subject accordingly.

### Source 3 (corroborating, live procedure page)

- `https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G322.shtml`
  and its sibling
  `.../ayuda/consultas-informaticas/presentacion-declaraciones-ayuda-tecnica/modelo-036/presentacion-papel-modelo-036.html`
  (both HTTP 200, no login) confirm Modelo 036 is filed through one of two
  session-based web applications
  (`https://www1.agenciatributaria.gob.es/wlpl/BU36-M036/MOD036/index.zul`,
  authenticated, and
  `https://www1.agenciatributaria.gob.es/wlpl/BU36-ASIS/M036/index.zul`,
  unauthenticated but interactive) — reconfirming there is no standalone
  downloadable blank AcroForm PDF for Modelo 036 itself, which is why this
  document is sourced from the guide (Source 1) instead.

## Field inventory (Phase 3)

All 33 `fields[]` entries and their exact source casilla/label are listed
inline in `schema.json`'s own `sourceRef` per field. Summary by section:

| Section | Fields | Always required for this v1.0.0's alta scope? |
|---|---|---|
| Página 2A. Identificación | `nif`, `primerApellido`, `segundoApellido`, `nombre`, `nombreComercial` | NIF/apellido/nombre yes; segundo apellido and nombre comercial optional |
| Domicilio fiscal en España | `tipoViaDomicilioFiscal`, `nombreViaDomicilioFiscal`, `numeroDomicilioFiscal`, `municipioDomicilioFiscal`, `provinciaDomicilioFiscal`, `codigoPostalDomicilioFiscal`, `indicadorReferenciaCatastral`, `referenciaCatastral` | Yes (address core + the mandatory catastral indicator); `referenciaCatastral` conditional on the indicator |
| Domicilio a efectos de notificaciones + contacto | `tipoViaNotificaciones`...`codigoPostalNotificaciones`, `telefonoAvisos`, `emailAvisos` | All optional — only when a notification domicile differs from the fiscal one, or contact data is being registered |
| Cap. 4 Actividad económica | `descripcionActividad`, `codigoActividad`, `grupoEpigrafeIae`, `lugarRealizacionActividad`, `fechaInicioActividad`, `municipioActividad` + 5 "local determinado" fields | Description/code/lugar/fecha yes; `grupoEpigrafeIae` conditional on an A0x code; the local-determinado block conditional on `lugarRealizacionActividad` |
| Cap. 6 IVA | `regimenGeneral`, `regimenSimplificado`, `regimenRecargoEquivalencia`, `regimenAgriculturaGanaderiaPesca` | Exactly one expected true (`exclusivityGroups`), none individually required (a filer with no special-regime eligibility may leave all false, defaulting to general) |
| Cap. 7 IRPF | `estimacionDirectaNormal`, `estimacionDirectaSimplificada`, `estimacionObjetiva` | Exactly one expected true (`exclusivityGroups`) |

Total: **33 fields**, plus 2 `exclusivityGroups` (VAT regime, IRPF estimation
method).

## Access notes and judgment calls

1. **Scoped exclusively to the alta (casilla 111) cause of presentation,
   simplified-036, natural-person pathway.** The guide's own "036
   simplificada" summary page lists nine causas (111 alta, 122/124/125/127/
   131/132/136 modificación, 150 baja); this document models only 111.
   Modificación and baja reuse the same underlying page structure to change
   or cancel data already on file — a materially different, session-relative
   operation (it requires knowing what is currently registered) that is out
   of scope for a first-registration schema, consistent with how
   `co/rues/matricula-mercantil` and other registry schemas scope to a
   single cause/track rather than modelling every possible causa a shared
   form supports.
2. **`primerApellido`/`segundoApellido`/`nombre`/`nombreComercial` have no
   independently-confirmed casilla number.** Unlike Modelo 030's own PDF
   (whose AcroForm rects let every box be coordinate-matched), this guide's
   own "Identificación" sub-page explains the *legal* composition of the NIF
   (casilla A4 explicitly) and the concept of "nombre comercial," but does
   not print a numbered casilla list the way it does for, e.g., the activity
   table (casillas 400-404) or the domicilio fiscal block (casillas
   A11-A39). These four fields are modelled as clearly-necessary identity
   fields on the strength of the guide's own prose (which discusses them
   immediately after or alongside the NIF box), not as literal
   coordinate-confirmed casilla numbers — disclosed here for a future
   reviewer to cross-check against a rendered Modelo 036 page image if one
   becomes available, the same discipline `es/aeat/declaracion-censal-
   personas-fisicas-modelo-030` applies to its own unconfirmed `sexoInteresado`
   enum.
3. **`fechaInicioActividad` (casilla 406) is confirmed only for the "fuera
   de un local determinado" pathway; this document applies it unconditionally
   (`required: true`) regardless of `lugarRealizacionActividad`.** The
   "Actividad en local determinado" sub-page (read in full this cycle)
   describes the LOCAL número.../... numbering, causa de presentación
   (Alta/Baja/Variación), and reference-number assignment for premises, but
   does not restate its own start-date casilla number in the portion
   retrieved this cycle — a plausible reading is that casillas 405/406
   (causa/fecha) sit in the activity's own shared header regardless of
   where it is carried out, with 407-411 being the "fuera de local
   determinado"-specific reference/municipio fields, but this was not
   independently re-confirmed against the "en local determinado" page's own
   text this cycle. Disclosed for a future reviewer.
4. **VAT-regime and IRPF-estimation casillas are modelled as independent
   booleans grouped by `exclusivityGroups`, even though the source itself
   states some combinations are technically compatible** (e.g. "el régimen
   general es compatible con todos los regímenes especiales, excepto con el
   régimen simplificado," and recargo de equivalencia "es compatible con
   todos los demás"). This document simplifies to a single-primary-regime
   model for v1.0.0 — consistent with `cl/sii/inicio-actividades-personas-
   naturales`'s own `regimenTributarioRenta` exclusivity group, which makes
   the same "marcar con una X" simplifying assumption — rather than modelling
   the full compatibility matrix, which would require a `documents[]`-scale
   composite structure pending GSP-0009. Disclosed here as a deliberate v1.0.0
   scope cut.
5. **VAT "inicio de actividad" timing casillas (502, 504, 506, 508), the
   Régimen Especial del Criterio de Caja, and the agencias-de-viajes/
   bienes-usados/oro-de-inversión special regimes are out of scope.** The
   criterio-de-caja page (read in full this cycle) explains its own
   opt-in/renuncia mechanics at length but does not print an explicit
   casilla number in the portion retrieved this cycle, and the other VAT
   timing casillas describe a nuanced set of adquisiciones/entregas
   commencement scenarios (whether preparatory acquisitions precede or
   follow the activity's first deliveries) that materially exceed this
   registry's "single simple bounded pathway" bar for a v1.0.0. Left as a
   documented gap for a future revision.
6. **IRPF pagos fraccionados (casillas 600/601) are out of scope.** These
   are quarterly-installment-payment mechanics layered on top of the
   estimation-method election modelled here, not part of the initial alta
   registration itself.
7. **The representative (apoderado) block, the "locales indirectamente
   afectos" (indirectly-affected premises) sub-block, and the P.O.-box
   ("apartado de correos") alternative notification-address track are out
   of scope**, each a self-contained sub-block this document's single-pass
   research did not retrieve this cycle. Consistent with Modelo 030's own
   disclosed scope cuts for comparable sub-blocks.
8. **No `documents[]` array is modelled.** The pages retrieved this cycle
   describe casillas and eligibility rules, not a checklist of supporting
   documents to attach to an alta filing; rather than fabricate a generic
   "identity document" requirement not actually itemized in a source
   examined this cycle, `documents[]` is left absent, consistent with
   `cl/sii/inicio-actividades-personas-naturales`'s own disclosed choice.
9. **Neither live filing channel (the authenticated Cl@ve/certificado
   session nor the unauthenticated 'cumplimentación, validación y obtención
   en PDF' wizard) was walked live this cycle.** Both are session-based Java
   web applications (`.zul` endpoints); this document is derived entirely
   from the guide's own static, unauthenticated prose. If a future reviewer
   gains a way to observe either live wizard, it should be cross-checked
   against this document the same way `co/registraduria/duplicado-cedula-
   ciudadania` cross-checked a live HTML screen against an older PDF manual.

## Test run (Phase 4)

No live submission was attempted: AEAT's live filing channels require either
authentication or an interactive session, and submitting a business-activity
registration with fabricated taxpayer data against a real production tax
registry is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and manually checked against every field's
`required`/`requiredWhen`/`visibleWhen`/`validation` rule and both
`exclusivityGroups`; the primary one is committed as this document's
conformance fixture (`conformance/es/aeat/declaracion-censal-alta-actividad-
economica-modelo-036/1.0.0/application-packet.json`/`.txt`).

**Scenario 1 (committed fixture) — Freelance translator, activity carried
out outside a fixed premises, simplified VAT regime, estimación directa
simplificada.** `nif: "12345678Z"`, `primerApellido: "Serrano"`,
`nombre: "Marta"`, full Página 2A fiscal-domicile block
(`indicadorReferenciaCatastral: "4"`, so `referenciaCatastral` is correctly
absent), `emailAvisos` populated, `descripcionActividad: "Traducción e
interpretación de idiomas"`, `codigoActividad: "A05 Resto de actividades
profesionales"` (so `grupoEpigrafeIae` is required and populated),
`lugarRealizacionActividad: "Fuera de local determinado"` (so
`municipioActividad` is visible and the five "local determinado" fields are
correctly absent), `fechaInicioActividad: "2026-09-01"`,
`regimenGeneral: false`, `regimenSimplificado: false`,
`regimenRecargoEquivalencia: false`,
`regimenAgriculturaGanaderiaPesca: false` — a professional-services activity
is not eligible for any of the four special VAT regimes modelled here, so
none is checked and the regime defaults to the ordinary régimen general by
omission (consistent with the exclusivityGroup's own "at most one true"
semantics, which does not require exactly one), `estimacionDirectaNormal:
false`, `estimacionDirectaSimplificada: true`, `estimacionObjetiva: false`.
Checked: every field gated by `lugarRealizacionActividad` resolves
correctly; `grupoEpigrafeIae`'s `requiredWhen` correctly fires for an A05
code; `referenciaCatastral`'s `requiredWhen` correctly does NOT fire for
indicator `"4"`. Passes with zero errors.

**Scenario 2 (traced, not committed as a separate fixture file) — Retail
shopkeeper operating from a fixed premises, recargo de equivalencia,
estimación objetiva.** `codigoActividad: "A03 Resto de actividades
empresariales"`, `lugarRealizacionActividad: "Local determinado"` (so
`comunidadAutonomaLocal`/`provinciaLocal`/`municipioLocal`/`direccionLocal`
are required and populated, `referenciaCatastralLocal` left absent since it
is optional even when visible, and `municipioActividad` is correctly
absent), `regimenRecargoEquivalencia: true` with the other three VAT
booleans false, `estimacionObjetiva: true` with the other two IRPF booleans
false. Checked against both `exclusivityGroups`: exactly one member `true`
in each. Passes with zero errors.

**Negative controls** (each expected to fail exactly one rule): (a) setting
both `regimenSimplificado` and `regimenRecargoEquivalencia` to `true` in
Scenario 2 — violates the `regimenIva` exclusivity group; (b)
`indicadorReferenciaCatastral: "1"` with `referenciaCatastral` absent —
violates that field's own `requiredWhen`; (c) `nif: "123456789"` (no
trailing letter) — violates `validation.pattern`; (d) `emailAvisos:
"not-an-email"` — violates its `validation.pattern`; (e)
`lugarRealizacionActividad: "Local determinado"` with `municipioLocal`
absent — violates that field's own `requiredWhen`. All five negative
controls were correctly rejected by manual rule-tracing against
`schema.json`.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/es/aeat/declaracion-censal-alta-actividad-economica-modelo-036/1.0.0/schema.json
ok   registry/es/aeat/declaracion-censal-alta-actividad-economica-modelo-036/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/es/aeat/declaracion-censal-alta-actividad-economica-modelo-036/1.0.0/schema.json
ok   registry/es/aeat/declaracion-censal-alta-actividad-economica-modelo-036/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
