# Verification record — `es/dgt/solicitud-tramites-vehiculo` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1652**), screening
Spain's five remaining open verticals (Passport, DMV, Business Formation,
Visa, National ID & Civic Documents) after Spain opened as this registry's
21st jurisdiction via GOV-1645 (Taxes, AEAT Modelo 030). This document opens
Spain's **DMV** vertical.

## Why this candidate

The brief was to find a real, currently-live, unauthenticated, field-level
government source filling one of Spain's remaining open verticals. This cycle
screened the following candidates, in the order investigated:

1. **Visa — Spain's national (long-stay, Type D) visa application.**
   `exteriores.gob.es` publishes a genuine, free ("Impreso gratuito"),
   directly downloadable AcroForm PDF ("Solicitud de visado nacional" /
   "Application for a national visa"), mirrored across dozens of consulate
   subdomains — fetched directly (HTTP 200), text/AcroForm-extracted via
   `pdfjs-dist` (110 widgets across 4 pages, mostly descriptive field names,
   not generic `dato.X`). On close comparison, however, this is the **same
   EU-harmonized national-visa template already modelled in this registry**
   via `de/auswaertiges-amt/national-visa-application` (Germany's own
   "Antrag auf Erteilung eines nationalen Visums") — both forms share the
   identical numbered-field structure (1. Apellido(s), 2. Apellido(s) de
   nacimiento, 3. Nombre(s), ... 26-29 reagrupante/empleador/centro de
   estudios blocks), consistent with the EU Regulation Annex that
   standardizes this form across Schengen states' national-visa channels.
   Authoring it again would duplicate an existing schema, not fill a gap —
   the same class of rejection this registry has already applied to NL's
   Schengen visa (dupes FR). Not picked.
2. **Business Formation — CIRCE's Documento Único Electrónico (DUE).** A
   real, unauthenticated-landing-page system (`administracion.gob.es`,
   `paeelectronico.es`), but the DUE is explicitly CIRCE's own "master form"
   that **unifies 25+ separate administrative forms** (Agencia Tributaria,
   Seguridal Social, Registro Mercantil, Notaría, etc.), varies by company
   type (SL, SLFS, Comunidad de Bienes, autónomo, ...), and is filed through
   an authenticated online portal (PAE Virtual) rather than a single static
   field-level document. Judged too broad/unbounded for one session, the
   same class of rejection this registry applies to other 100+-field,
   multi-form-unifying sources. Not picked; a narrower single-company-type
   DUE sub-form could be a future candidate if one is found isolated from
   the rest.
3. **Passport / National ID — Policía Nacional (DNI/pasaporte).**
   `sede.policia.gob.es` and `citapreviadnie.es` confirm both processes run
   through an in-person Documentation Unit appointment
   (`citapreviadnie.es`), with no downloadable field-level application form
   found for either the DNI or the passport itself — the same
   appointment-only, biometric-capture pattern this registry has confirmed
   for comparable processes elsewhere (e.g. Argentina's RENAPER, screened in
   GOV-1645). A distinct, separately-issued document — the EX-15 "Solicitud
   de Número de Identidad de Extranjero (NIE) y Certificados" — is a real
   downloadable form, but it is a foreigner-registration/tax-identification
   number process administered by the same Policía Nacional, not Spain's own
   national identity document; left as a possible future National ID/Civic
   Documents candidate rather than picked this cycle, since DMV's own
   candidate (below) was cleanly stronger.
4. **DMV — DGT's Modelo 01 'Trámites de Vehículos' (this document).** The
   Dirección General de Tráfico publishes a single, standard, multi-procedure
   vehicle-request form covering seven distinct vehicle-registry procedures
   via one shared AcroForm PDF — genuinely unauthenticated, currently
   maintained (own printed edition marker 'MOD. 01/2025-08-ES'), and
   confirmed as the actual official in-person form by a second, independent
   DGT source (see below). Same class of source as the sibling
   `co/runt/formulario-solicitud-tramites-vehiculo` (a single official
   multi-trámite vehicle-procedure request form) already in this registry.
   Picked as this cycle's candidate.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Dirección General de Tráfico (DGT), Ministerio del Interior
- **Document:** Modelo 01 ("MOD. 01/2025-08-ES"), "Trámites de Vehículos" /
  "Solicitud"
- **URL (as cited in `source.url`):**
  <https://sede.dgt.gob.es/export/sites/dgt/.galleries/modelos-solicitud/01/Mod.01-ES.pdf>
- **Access note:** `sede.dgt.gob.es` times out on every direct connection
  attempt from this environment — `curl -v` confirms DNS resolves the host
  (`195.53.65.140`) but the TCP handshake itself never completes
  (`Connection timed out after 12001 milliseconds`), the same class of
  access issue this registry has previously worked around for other
  government domains via Wayback Machine snapshots. The form was retrieved
  instead via the Wayback Machine's most recent crawl of the exact URL above,
  timestamp `20260603024414` (2026-06-03), HTTP 200, 308,633 bytes,
  SHA-256 `2afca792f740a1f05d1f870f4e2afb1b0394bf7c3d9d8045da6024779bacdff5`.
  The Wayback CDX index for this exact URL shows an unbroken run of
  identical-digest captures (`7DHG2UKNM23A3SU2NFV5VV7JFUO5REPJ`) from
  2026-01-04 through 2026-06-03 (the most recent crawl available), i.e. this
  edition of the form was still the live one as of days before this cycle's
  own retrieval date.
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js` (CJS
  build), plus the `canvas` package for a rendered visual cross-check.
  `getAnnotations()` was used for the AcroForm widget layer (field name,
  type, rect, maxLen, checkbox/radio flag, and — for the two `Ch` (choice)
  widgets that carry them — each widget's own embedded `options` list); page
  1 carries 73 widgets, page 2 (an instructions/fee/code-table page) carries
  zero. `getTextContent()` was used for each page's own text layer, combined
  with the widget rects into a y-descending, x-ascending ordered list per
  page to attribute each widget to its printed label. Because the top
  'SELECCIONE EL TRÁMITE...' block packs three trámite/sub-trámite radio
  groups side by side in a dense grid with several ambiguous rows (in
  particular BAJA's Temporal/Definitiva 2-column x 3-row grid and PERMISO
  TEMPORAL's Empresas/Particulares grid), that specific region was
  additionally **rendered at 3x zoom** via `pdfjs-dist`'s own `page.render()`
  into a `canvas` bitmap and visually cropped/inspected before any
  radio-group export value was attributed to a specific label in
  `schema.json` — no attribution in this document relies on the
  coordinate/text match alone without this visual cross-check having been
  performed for that region.
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** every field's exact printed label, its native
  AcroForm type (text/checkbox/radio/choice) and `maxLen` where the source
  asserts one; the seven-way top-level trámite radio group and the five
  narrower sub-trámite radio groups nested beneath five of those seven
  trámites; the two `Ch` widgets' own embedded option lists (Provincia's 52
  provinces, and the vehicle-service code list); and that page 2 carries no
  fillable fields at all (a plain instructions/fee/code-table page).

### Source 2 (corroborating, "this is the real official form" check)

- DGT's own accompanying information sheet,
  `05-Duplicados-y-renovaciones-permiso-circulacion.pdf` (also
  Wayback-retrieved, HTTP 200, 201,460 bytes), for the "Duplicados y
  renovaciones del permiso de circulación" procedure group — one of the
  seven this document models. Its own text states the in-person channel
  requires "Solicitud en impreso oficial. (Impreso disponible en
  www.dgt.es)" — confirming Modelo 01 is indeed the official downloadable
  impreso this procedure group's in-person filing requires, not an
  unrelated or superseded form — and separately documents the accompanying
  identity-document requirement modelled in this document's own
  `documents[]` entry (see Judgment call 7 below).
- DGT's own service landing pages (`sede.dgt.gob.es/es/vehiculos/...`,
  `sede.dgt.gob.es/es/permisos-de-conducir/...`, both found via web search
  but not independently fetched this cycle beyond their search-result
  summaries, since the primary form PDF and its own instruction sheet
  already gave a stronger, directly-checkable confirmation) describe the
  same procedures this form's own trámite/sub-trámite grid names, and
  confirm the online (Cl@ve/certificado-authenticated) channel this
  document deliberately does not model as an alternative to the paper form.

## Field inventory (Phase 3)

All 47 `fields[]` entries and their exact source widget/box/label are listed
inline in `schema.json`'s own `sourceRef` per field. Summary by section:

| Section | Fields | Notes |
|---|---|---|
| Datos del vehículo | `matricula`, `fechaMatriculacionVehiculo`, `bastidorNive` | All optional — this header block is shared across all seven trámites with no field distinguishing which apply |
| Domicilio del vehículo | 10 fields (Tipo de vía … Localidad) | All optional; `provinciaDomicilioVehiculo` is a closed enum (the widget's own 52 embedded province options) |
| Datos del interesado | 7 fields | `nifNieCifInteresado` is the only field modelled `required: true` unconditionally — every submission needs to identify the requesting party |
| Selección de trámite | `tramite` (enum, 7 values) | `required: true` — the form's own top-level radio-button choice |
| Duplicados del permiso de circulación | `duplicadoMotivo` (enum, 6 values) | `requiredWhen` `tramite == "duplicado"` |
| Informe de vehículos | `matriculaInformeVehiculo1`…`8` | Only slot 1 is `requiredWhen` `tramite == "informe"`; the remaining 7 are optional (the form's own fixed 8-box grid carries no field stating how many are actually used) |
| Baja | `bajaMotivo` (enum, 6 values) | `requiredWhen` `tramite == "baja"`; visually confirmed as a Temporal/Definitiva x 3-reason grid |
| Alta de baja temporal | `altaBajaTemporalMotivo` (enum, 2 values) | `requiredWhen` `tramite == "alta_de_baja_temporal"` |
| Matriculación | `matriculacionTipo` (enum, 2), `servicioVehiculo` (enum, 25), `codigoElectronicoMatriculacion`, `codigoElectronicoMaquinariaAgricola` | Only `matriculacionTipo` is `requiredWhen`-gated; the other three are left ungated (see Judgment call 5) |
| Permiso temporal | `permisoTemporalTipo` (enum, 5 values) | `requiredWhen` `tramite == "permiso_temporal"`; visually confirmed as an Empresas/Particulares grid |
| Rehabilitación | (none) | The trámite itself carries no further sub-fields |
| Notificación de conductor habitual | 4 fields | All optional and independent of which trámite is selected |
| Otros | `otros` | Free text, maxLen 350 |
| Fecha y firma | `lugarFirma`, `fechaFirma` | Physical signature itself not modelled, per this registry's standing convention |

Total: **47 fields**, plus **1 `documents[]` entry** (`identityDocument`). No
`exclusivityGroups` are needed: unlike the sibling `es/aeat` schema (whose
causa checkboxes are independent native checkbox widgets requiring a
modelled exclusivityGroup to express mutual exclusivity), every
choice-of-one construct in this form is a **native AcroForm radio-button
group** and is modelled as a single `enum` field, consistent with this
registry's established convention for that widget type (e.g.
`co/runt/formulario-solicitud-tramites-vehiculo`'s `tramiteType`).

## Access notes and judgment calls

1. **Two widgets are deliberately excluded from `fields[]`:** the "Imprimir"
   button widget (a JavaScript print-action button, not applicant data) and
   a tiny (`rect` 5x14pt, `maxLen` 1) text widget named "Elija un trámite"
   sitting at the left margin of the trámite-selection header row — almost
   certainly an internal marker/helper widget rather than a printed,
   applicant-facing box, the same class of exclusion this registry applies
   elsewhere to non-applicant control widgets (e.g. Modelo 030's off-page
   `dato.77`/`dato.80`/`dato.81`/`dato.86`/`dato.87`).
2. **Every choice-of-one section is modelled as a single native-radio-backed
   `enum` field, not a set of booleans with an `exclusivityGroups` entry** —
   because, unlike Modelo 030's causa checkboxes (which are independent
   AcroForm checkbox widgets that merely happen to be visually grouped), the
   `tramite`, `subtramite1`, `subtramite31`, `subtramite4`, `subtramite6`,
   and `subtramite71` fields are each a genuine single AcroForm radio-button
   field name shared across multiple widgets with distinct export values —
   the PDF format itself enforces mutual exclusivity. Matches
   `co/runt/formulario-solicitud-tramites-vehiculo`'s own established
   convention for this exact widget type.
3. **The BAJA and PERMISO TEMPORAL sub-trámite grids were resolved by a
   rendered visual crop, not coordinate-matching alone.** Both radio groups'
   export values on their own (`"Sustracción"`, `"Exportación"`, `"Veh
   matriculado"`, `"Veh sin matricular"`, etc.) do not fully disambiguate
   which column (Temporal/Definitiva, Empresas/Particulares) each option
   belongs to; a 3x-zoom render of that exact page region (see Extraction
   method above) confirmed the column groupings this document's own
   `bajaMotivo`/`permisoTemporalTipo` enum values encode
   (`temporal_sustraccion` vs. a hypothetical `definitiva_sustraccion` that
   does not actually exist on the form, for example).
4. **`matriculaInformeVehiculo1` is the only one of the eight plate-number
   boxes modelled `requiredWhen`-gated (`tramite == "informe"`); the
   remaining seven are left `required: false` with no gate at all.** The
   source provides a fixed 8-box grid with no field indicating how many
   plates a given submission actually uses — gating only the first slot (a
   report needs at least one plate) avoids fabricating a minimum/maximum
   count the form itself does not state, the same non-fabrication
   discipline this registry has applied to other fixed-size,
   partially-used repeating structures (e.g. `es/aeat`'s own
   causa-checkbox-to-section correspondence, disclosed as an inference
   rather than a stated cross-reference).
5. **`servicioVehiculo`, `codigoElectronicoMatriculacion`, and
   `codigoElectronicoMaquinariaAgricola` are positioned inside the
   'MATRICULACIÓN' block on the form but are deliberately left
   `required: false` with no `requiredWhen` tie to `tramite ==
   "matriculacion"`** — no source examined this cycle states that a service
   classification or electronic pre-registration code is mandatory for
   every new registration (a private individual's ordinary registration
   plausibly needs neither), so this document does not assert a gate the
   source itself does not publish.
6. **The vehicle-service dropdown (`servicioVehiculo`) omits two codes its
   own page 2 descriptive legend documents.** The widget's own embedded
   option list carries 25 non-blank codes (`A-00`…`A-20`, `B-00`…`B-22`);
   page 2's own "SERVICIO PÚBLICO"/"SERVICIO PARTICULAR" legend additionally
   describes `A-09 Obras` and `B-07 Ambulancia`, neither of which appears as
   a selectable value in the actual combo-box widget — a minor
   inconsistency inside the source PDF itself. This document's `enum`
   reproduces only the codes the widget itself actually offers (not the
   legend's superset), and flags the discrepancy here and in the field's own
   `description` rather than silently reconciling it.
7. **One `documents[]` entry (`identityDocument`) is modelled, sourced from
   DGT's own accompanying instruction sheet for the duplicado/renovación
   procedure group specifically** — natural persons present a DNI, Spanish
   driving licence, residence card, or passport+NIE; legal entities present
   a tarjeta de identificación fiscal plus proof of the signatory's identity
   and representation. This cycle did not independently confirm an
   identical requirement is published for each of the form's other six
   trámites (informe, baja, alta de baja temporal, matriculación, permiso
   temporal, rehabilitación) — disclosed as confirmed for one procedure
   group specifically, not asserted as verified for all seven.
8. **`nifNieCifInteresado`'s `validation.pattern` combines three coexisting
   ID formats into one regular expression** (NIF: 8 digits + letter; NIE:
   X/Y/Z + 7 digits + letter; CIF: letter + 7 digits + letter-or-digit),
   since the source itself presents a single unified "NIF/NIE/CIF" box
   rather than three separate fields — a disclosed synthesis, not a
   citation to an AEAT/DGT-published single regular expression.
9. **`fechaFirma` is merged from three adjacent day/month/year AcroForm text
   boxes into one `date`-typed field**, consistent with this registry's
   established convention (e.g. `es/aeat/declaracion-censal-personas-fisicas-modelo-030`'s
   own `fechaFirma`). The same asymmetry disclosed on that sibling schema
   recurs here: the day (`maxLen` 2) and year (`maxLen` 4) sub-boxes are
   purely numeric-sized, but the month sub-box carries `maxLen` 10 — wide
   enough for a spelled-out month name (e.g. "julio") rather than a 2-digit
   number. Normalized to ISO date regardless, per this document's own
   consistent date-merge convention.
10. **DGT's own authenticated online-filing channel (Cl@ve/certificado, per
    the corroborating source pages) is out of scope for this v1.0.0** — an
    entirely different session-based flow this document does not attempt to
    describe, the same scope boundary this registry applies to AEAT's own
    Sede Electrónica channel in the sibling `es/aeat` schema.
11. **No accompanying municipal-census ("empadronamiento") or IAE data is
    modelled as applicant-supplied.** Page 2's own privacy notice states DGT
    will consult these electronically itself ("consultará electrónicamente
    sus datos referidos al empadronamiento y al IAE") — this document does
    not add a field for data the source itself says is looked up, not
    supplied.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
government vehicle registry, and submitting fabricated identity/vehicle data
into a real government system is not a safe or reversible action.

Instead, a fully hand-constructed mock record was built from this document's
own field inventory
(`conformance/es/dgt/solicitud-tramites-vehiculo/1.0.0/application-packet.json`)
and independently checked with a standalone, ajv-free rule-tracing script
(not committed — reads `schema.json`'s own `required`/`requiredWhen`/
`validation.pattern`/`validation.enum`/`validation.maxLength` and evaluates
them against each mock record), in addition to the repo's own validators.

**Committed scenario — an individual requesting a duplicate circulation
permit for a damaged permit (`tramite: "duplicado"`,
`duplicadoMotivo: "deterioro"`).** Correctly requires `nifNieCifInteresado`
and `duplicadoMotivo` (via the `tramite == "duplicado"` `requiredWhen` tie);
leaves every other trámite's sub-fields absent. Passes with zero errors.

**Three further scenarios (traced only, not committed as separate fixture
files):** (1) `tramite: "informe"` with three of the eight plate slots
populated, the remaining five correctly left absent; (2)
`tramite: "matriculacion"` with `matriculacionTipo: "ordinaria"` and
`servicioVehiculo: "A-04"` (Taxi); (3) `tramite: "permiso_temporal"` with
`permisoTemporalTipo: "particular_previa_matriculacion"`. All three pass with
zero errors.

**Negative controls** (each expected to fail exactly one rule): (a) removing
`tramite` from the committed packet — correctly flagged as a missing
required field; (b) setting `tramite: "baja"` while both `duplicadoMotivo`
and `bajaMotivo` are absent — correctly flagged as a missing required field
(`bajaMotivo`'s `requiredWhen` fires); (c) `tramite: "invalid_value"` —
correctly flagged as a `validation.enum` violation; (d)
`nifNieCifInteresado: "1234567"` (7 digits, no letter) — correctly flagged
as a `validation.pattern` violation; (e)
`provinciaDomicilioVehiculo: "Nonexistent"` — correctly flagged as a
`validation.enum` violation. All five negative controls were correctly
rejected.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/es/dgt/solicitud-tramites-vehiculo/1.0.0/schema.json
ok   registry/es/dgt/solicitud-tramites-vehiculo/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/es/dgt/solicitud-tramites-vehiculo/1.0.0/schema.json
ok   registry/es/dgt/solicitud-tramites-vehiculo/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
