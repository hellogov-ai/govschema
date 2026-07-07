# Verification record — `cl/sii/inicio-actividades-personas-naturales` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1624**), a general
research-analyst brief covering the full catalog: screen candidates for
Brazil's National ID gap and at least two brand-new-jurisdiction candidates
across at least two verticals, pick the strongest, author it fully, test it,
and commit.

## Why this candidate

CATALOG.md's "Known Gaps & Opportunities" flagged Brazil's National ID
(Carteira de Identidade Nacional, CIN) as an "open-but-weak backlog candidate
... never actually deep-dived," and separately encouraged scouting a 20th
jurisdiction (naming Chile, Argentina, Peru, Portugal, Poland, and Spain as
starting points). This cycle screened three candidates before picking this
one:

1. **Brazil — National ID (Carteira de Identidade Nacional).** A parallel
   research pass found the federal `gov.br` CIN portal is SSO-login-gated
   (`gov.br/gestao/pt-br/carteira-da-identidade-nacional`, "Conteúdo
   Restrito"), and Rio Grande do Sul's own "Identidade Fácil" is an Angular
   SPA whose bundles resolve to a state OIDC login before any form loads —
   the same `gov.br`-style SSO wall that has already killed several other
   Brazil candidates in this registry (CNH, Visa). Paraná's own
   `rci.pr.gov.br/solicitante/iniciar` (embedded via
   `policiacivil.pr.gov.br`) is a live, unauthenticated HTML form, but a
   second-pass depth check found it is only a 3-field identity-lookup/
   eligibility screen (`num_doc`/`nome`/`data_nascimento`) for an applicant
   who already holds a Paraná RG/CIN record. A further pass then found the
   real downstream data-entry form independently — a sibling page
   (`policiacivil.pr.gov.br/Pagina/Correcao-de-Solicitacao`) embeds
   `rci.pr.gov.br/pedido`, a Vue/Inertia SPA whose compiled, unauthenticated
   `app.js` bundle exposes a genuine, rich, bounded field set (address with
   ViaCEP autofill, phone, marital status, name/DOB correction, parents'
   names, blood type, a disability-type checkbox group, health/organ-donor
   fields, five document numbers, file uploads, and pickup logistics) via
   its own `$parent.form.<field>` component-source references. This is a
   genuinely strong, ready-to-author candidate — not picked this cycle only
   because it needs a live-rendered-page pass to confirm each field's real
   on-screen label/requiredness (the JS bundle exposes internal field names,
   not confirmed visible text), a distinct task better scoped as a dedicated
   future cycle. It is also scoped to correction/update of an *existing*
   Paraná record, not first-time issuance (confirmed separately gated
   in-person-only). Left open as the strongest-ever-found backlog candidate
   for Brazil's National ID gap, not picked this cycle.
2. **Spain — AEAT Modelo 030 (Declaración censal / NIF registration).** A
   genuine, unauthenticated, official-host fillable PDF
   (`sede.agenciatributaria.gob.es`, HTTP 200, no login/CAPTCHA gate,
   `%PDF-1.6`, real `/AcroForm`). Extraction via `pdfjs-dist` found ~135
   AcroForm widgets across 4 pages, but every widget uses generic internal
   names (`dato.1` … `dato.135`) rather than descriptive names — attributing
   each widget to its real casilla label requires a separate, error-prone
   coordinate-matching pass against the page's text layer, and the form
   itself is considerably larger and more repetitive (the same "Datos
   identificativos" block reappears for a spouse/cónyuge and up to several
   representantes across pages 1 and 3). A genuinely strong candidate for a
   future cycle, but more failure-prone to extract faithfully in a single
   pass than the candidate below, whose AcroForm field names are already
   self-documenting.
3. **Chile — SII Formulario 4415-PN (this document).** Confirmed via direct
   fetch: `https://www.sii.cl/formularios/imagen/F4415_PN.pdf` returns
   HTTP 200 (`Last-Modified: 2025-02-13`, i.e. a currently maintained
   edition, not a stale artifact), no login/CAPTCHA/WAF gate. `pdfjs-dist`
   extraction of the AcroForm layer found 55 widgets on page 1 (page 2 is
   the form's own prose instructivo, not further form fields), and — unlike
   the Spain candidate — nearly every widget already carries a real,
   descriptive internal name (`RUT`, `APELLIDO_PATERNO`,
   `DESCRIPCION_DE.LA_ACTIVIDAD`, `CODIGOACTIVIDADES_P`, `rut propietario`,
   `monto arriendo`, `14ter`, etc.), which this document's own field
   inventory cross-checked against the page's text layer by y-coordinate to
   confirm every label attribution. Bounded (a fixed, single-page form; the
   only repeating element — secondary economic-activity codes — is
   explicitly capped by the form's own instructions at 3, "en caso de más de
   cuatro, adjuntar Formulario 4416"). This is the strongest candidate
   screened this cycle on this registry's own bar (unauthenticated,
   field-level, bounded, self-documenting field names, current edition) and
   is picked as Chile's opening (20th jurisdiction) schema.

Other Chile candidates considered and rejected before settling on this one
(per a parallel research pass): `registrocivil.cl` (cédula de identidad
renewal) and `pasaporte.cl` (passport) both require Chile's national SSO
(**ClaveÚnica**) before any field renders; `registrodeempresasysociedades.cl`
("Tu Empresa en Un Día", the flagship same-day company-formation wizard) is
likewise entirely ClaveÚnica-gated, with no field markup visible pre-login;
`chileatiende.gob.cl` (the tramites aggregator portal) returns HTTP 403 to a
direct fetch and is a secondary aggregator, not a primary source, regardless.
SII's own live online-filing channel for this exact process also requires an
authenticated "Clave Tributaria"/ClaveÚnica session (confirmed via
ChileAtiende's own ficha 3025 prose) — but per this registry's established
precedent (`mx/sat/preinscripcion-rfc-persona-moral`,
`ph/bir/tin-application-corporations-partnerships`), a login-gated live
wizard does not disqualify a candidate whose authoritative field structure is
independently recoverable from a genuinely public, unauthenticated, official
PDF — which this form is.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Servicio de Impuestos Internos (SII)
- **Document:** Formulario 4415-PN, "Declaración de Inicio de Actividades
  para Personas Naturales," edición 07/2016 printed on the form's own footer
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.sii.cl/formularios/imagen/F4415_PN.pdf> — a genuine two-page
  fillable AcroForm PDF, 568,372 bytes, `Last-Modified: 2025-02-13` (still
  the current edition SII serves at this URL in 2026, not a stale mirror).
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js`
  (`getAnnotations()` for the AcroForm widget layer — field name, type,
  dropdown options, and bounding-box rect per widget; `getTextContent()` for
  the page's own text layer, grouped into rows by y-coordinate and
  cross-matched against each widget's rect to attach the correct on-screen
  label). Every field in this document's `fields[]` was attributed this way,
  not by name-guessing from the AcroForm field name alone (several of which
  carry typos or copy-paste artifacts from neighbouring fields — see
  judgment call 6).
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** every field's exact position (page 1), its section,
  its dropdown options where applicable (`seleccion_casificaclion_contribuyente`
  carries its full 4-option list as literal AcroForm export values), and
  page 2's own prose instructivo (§§1–6), which states which of the form's
  six lettered sections are always mandatory versus first-category-only, the
  occupancy-status code legend, the three tax-regime descriptions, and the
  Domicilio Postal/Urbano's own stated purpose (see Field inventory below).

### Source 2 (corroborating, current-currency check)

- A live web search (2026-07-07) independently confirmed this exact form
  number and title are still the currently-cited natural-person "Inicio de
  Actividades" mechanism (e.g. ChileAtiende ficha 3025, "Inicio de
  actividades (persona natural)"), and that the form's four
  always-mandatory sections are A, B, D, and E — matching this document's
  own reading of the source PDF's own p.2 instructivo verbatim ("Luego, debe
  completar obligatoriamente los recuadros: A.- 'Persona que efectúa el
  trámite', B.- 'Identificación del Contribuyente, D.- 'Identificación de
  Actividades Económicas a Desarrollar' y E.- 'Domicilio casa matriz, email,
  domicilio notificaciones'.").

## Field inventory (Phase 3)

All 54 `fields[]` entries and their exact source widget/label are listed
inline in `schema.json`'s own `sourceRef` per field (each cites the printed
section, the printed label, and the underlying AcroForm field name). Summary
by section:

| Section | Fields | Always mandatory? |
|---|---|---|
| Encabezado (header) | `fechaInicioActividades` | Yes (per instructivo §4.1) |
| A. Persona que efectúa el trámite | `rutPersonaTramite`, `apellidoPaternoTramite`, `apellidoMaternoTramite`, `nombresTramite` | Yes (per instructivo §4.1) |
| B. Identificación del Contribuyente | `clasificacionContribuyente`, `apellidoPaternoContribuyente`, `apellidoMaternoContribuyente`, `nombresContribuyente` | Yes |
| C. Capital | `capitalEnterado`, `capitalPorEnterar`, `fechaCapitalPorEnterar`, `capitalTotal` | Only for Primera Categoría (`requiredWhen`/`visibleWhen` on `primeraCategoria`) |
| D. Identificación de Actividades Económicas | `primeraCategoria`, `segundaCategoria`, `afectaIva`, `exentoIva`, `descripcionActividad`, `codigoActividadPrincipal`, `codigoActividadSecundaria1-3` | Yes (the category/description/principal-code fields); IVA condition and secondary codes conditional |
| E. Domicilio Casa Matriz | `callePrincipal`, `numeroPrincipal`, `depOficinaLocalPrincipal`, `blockPrincipal`, `poblacionVillaPrincipal`, `comunaPrincipal`, `ciudadPrincipal`, `telefonoFijoPrincipal`, `telefonoMovilPrincipal`, `emailPrincipal` | Yes (core address/comuna/ciudad/email); block/población/teléfono modelled optional |
| Domicilio adicional (Primera Categoría only) | `rolAvaluoPropiedad`, `rutPropietario`, `calidadOcupacionDomicilio`, `montoArriendoDomicilio`, `tieneDomicilioPostal` + 3 postal fields, `tieneDomicilioUrbano` + 7 urban fields | Only for Primera Categoría, and only "si tuviera" (if applicable) |
| F. Régimen Tributario de la Renta | `regimenSimplificado14Ter`, `regimenRentaPresunta`, `regimenRentaAtribuida14A`, `regimenSemiIntegrada14B` | Only for Primera Categoría |

Total: **54 fields**, plus 3 `exclusivityGroups` (category, IVA condition,
tax regime) capturing the form's own "marcar con una X en una de las
formas"/mutually-exclusive-checkbox instructions.

## Access notes and judgment calls

1. **No native per-field required/length constraint exists anywhere in this
   PDF.** Every AcroForm widget's own `required` and `maxLen` annotation
   properties were checked programmatically (via `pdfjs-dist`'s
   `getAnnotations()`) and are uniformly `false`/`0`/`undefined` — this PDF
   carries no enforced validation of its own. `required: true` is therefore
   applied only to the fields inside the four sections the instructivo's own
   prose explicitly names as always-mandatory (A, B, D, E); fields inside
   those sections that are structurally supplementary in nature (a second
   surname, address components like block/población-villa/one of the two
   phone numbers, secondary economic-activity codes beyond the principal)
   are modelled `required: false`, since no per-field signal distinguishes
   them from the section's core fields — a genuine limitation of this
   source, disclosed the same way as `co/registraduria/duplicado-cedula-ciudadania`
   discloses an equivalent limitation for its own manual-sourced screens.
2. **`copiaDocumento` (AcroForm field `original-copia`) is deliberately
   excluded from `fields[]`.** This dropdown (`ORIGINAL- Servicio de
   Impuestos Internos` / `COPIA-contribuyente`) selects which physical copy
   of the printed two-part form this sheet represents — a print/copy
   selector, not applicant domain data, the same discipline this registry
   applies to page-navigation/copy-selector artifacts elsewhere.
3. **No fillable widget was found for the top-of-form "ROL ÚNICO
   TRIBUTARIO" box, only for the adjacent "FECHA DE INICIO DE ACTIVIDADES"
   box.** The header row (p.1, above Sección A) prints "DÍA MES AÑO" beside
   "ROL ÚNICO TRIBUTARIO" as column labels; per-glyph x-coordinate
   inspection confirmed the row's only fillable widget (`Texto2`, modelled
   as `fechaInicioActividades`) sits under the DÍA/MES/AÑO columns
   (x≈309–411), while the "ROL ÚNICO TRIBUTARIO" label (x≈467) has no
   corresponding widget anywhere on the page. `fechaInicioActividades` is
   modelled as `required: true` on the strength of the instructivo's own
   imperative instruction ("Deben colocar la fecha de Inicio de Actividades
   en el recuadro respectivo," §4.1) confirming it is genuinely
   applicant-entered, not SII-stamped. The neighbouring "ROL ÚNICO
   TRIBUTARIO" box is presumably a duplicate/reference display of the same
   RUT already captured in `rutPersonaTramite`, not a distinct fillable
   field, and is not modelled separately.
4. **`calidadOcupacionDomicilio` is modelled as a 5-value closed enum
   (codes `"1"`–`"5"`), unlike most open-string address dropdowns elsewhere
   in this registry's Latin American schemas.** This is safe to close
   because the form's own printed legend states the exhaustive list
   verbatim ("1.PROPIETARIO, 2.ARRENDADO NOTARIAL, 3.USUFRUCTUADO, 4.CEDIDO
   o 5.ARRENDADO SIMPLE" — p.2 instructivo, and the abbreviated legend
   reprinted directly beneath the field on p.1), unlike e.g. Colombian
   department/comuna dropdowns, whose full option catalogs are never
   printed on the source itself.
5. **The two `codigoActividad*` fields and the 800+-entry SII activity-code
   catalog they reference are out of scope.** The form's own instructivo
   states the codes come from "tabla internacional de actividades" (an
   external catalog SII publishes separately, on
   `sii.cl` → "Ayudas por Servicio" → "Códigos de actividad económica," not
   reproduced on this form) — modelled as a pattern-constrained (`^[0-9]{6}$`)
   open string, not a fabricated enum, consistent with this registry's
   established discipline for large external code tables (e.g. RUNT's own
   department/vehicle-type dependencies, DIAN's activity-code references).
6. **Two AcroForm field names are reused across visually distinct blocks**
   — `comuna` appears twice (once in the Domicilio Postal block, once in the
   Domicilio Urbano block) and `calle notificaciones` similarly collides
   with the Sección E field's own internal name pattern. This is a genuine
   quirk in the source PDF's own AcroForm authoring (confirmed by rect
   inspection — the two `comuna`-named widgets sit at clearly different
   page positions, y≈292 and y≈348, so they are two separate visual fields
   that happen to share one internal PDF field name, not one shared value).
   This document disambiguates them into two independently named schema
   fields (`comunaPostal` / `comunaUrbano`) based on which visual block each
   widget's rect places it in, and discloses the underlying PDF field-name
   collision here for an independent reviewer to double-check against the
   rendered page.
7. **Requirements for special-case supporting activities (transport-for-hire
   and mining) are out of scope.** The instructivo's own §6 ("Casos
   Especiales") lists extra documents required if the applicant's activity
   is passenger/cargo transport-for-hire or mining (vehicle-ownership
   contracts, mining-registry certificates, notarized lease agreements,
   etc.), but these are activity-specific supporting evidence, not fields on
   this form itself, and are not modelled in `documents[]` for this v1.0.0.
8. **No `documents[]` array is modelled at all.** The form's own p.2 §5
   ("Requisitos") states only that supporting antecedents are "los
   solicitados en el informativo 'Inscripción al RUT y/o Declaración de
   Inicio de Actividades'" — a separate SII informative document this cycle
   did not retrieve and independently verify. Rather than fabricate a
   generic "identity document" or "proof of address" requirement not
   actually itemized in the source examined this cycle, this document
   leaves `documents[]` absent (it is OPTIONAL) and discloses the gap here
   for a future cycle.
9. **The live online-filing channel (SII's own web platform, per
   ChileAtiende ficha 3025) requires an authenticated "Clave Tributaria" or
   ClaveÚnica session and was not walked live this cycle** — this document
   is derived entirely from the public PDF form and its own instructivo, not
   from that wizard. If a future reviewer gains a way to observe the live
   wizard, it should be cross-checked against this document the same way
   `co/registraduria/duplicado-cedula-ciudadania` cross-checked a live HTML
   screen against an older PDF manual.

## Test run (Phase 4)

No live submission was attempted: SII's live filing channel is
authentication-gated and submitting a declaration of economic-activity
start-up with fabricated taxpayer data against a real production tax registry
is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and manually checked against every field's
`required`/`requiredWhen`/`visibleWhen`/`validation` rule and all three
`exclusivityGroups`:

**Scenario 1 — Segunda Categoría filer (independent professional).** A
freelance accountant, RUT `12345678-9`, files
`fechaInicioActividades: "2026-08-01"`, `clasificacionContribuyente:
"111 Persona natural chilena"`, `segundaCategoria: true`,
`primeraCategoria: false` (satisfying `categoriaTributaria`'s exclusivity),
`descripcionActividad: "Servicios de contabilidad y asesoría tributaria
independiente"`, `codigoActividadPrincipal: "692000"`, full Sección A/B/E
fields, and no Sección C, no IVA condition, no domicilio-adicional block, and
no Sección F fields at all. Checked: every field whose `visibleWhen`
resolves to `false` (because `primeraCategoria` is `false`) is correctly
exempt from its own `requiredWhen` — e.g. `capitalEnterado`,
`afectaIva`/`exentoIva`, `regimenSimplificado14Ter`, and the entire
domicilio-adicional block are all absent from the record and pass ("Visibility
gates requiredness," SPEC.md §6.7). Passes with zero errors.

**Scenario 2 — Primera Categoría filer, VAT-affected, renting the main
address, with a postal-notification address.** A sole trader running a small
retail shop, RUT `9876543-2`, files `fechaInicioActividades: "2026-09-15"`,
`primeraCategoria: true`,
`segundaCategoria: false`, `afectaIva: true`, `exentoIva: false`,
`capitalEnterado: 500`, `capitalPorEnterar: 500`,
`fechaCapitalPorEnterar: "2026-12-31"`, `capitalTotal: 1000`,
`calidadOcupacionDomicilio: "5"`, `montoArriendoDomicilio: 350`,
`tieneDomicilioPostal: true` with all four postal fields populated,
`tieneDomicilioUrbano: false` (so its 7 fields are correctly absent),
`regimenRentaAtribuida14A: true` with the other three regime booleans
absent/false. Checked against `exclusivityGroups`: exactly one field is
`true` in each of the three groups. Checked `montoArriendoDomicilio`'s
`requiredWhen` (`calidadOcupacionDomicilio in ["2","5"]`) correctly fires
since `"5"` is in the list. Passes with zero errors.

**Negative controls** (each expected to fail exactly one rule): (a) setting
both `primeraCategoria` and `segundaCategoria` to `true` in Scenario 1 —
violates the `categoriaTributaria` exclusivity group (more than one member
`true`); (b) in Scenario 2, setting `calidadOcupacionDomicilio: "5"` while
leaving `montoArriendoDomicilio` absent — violates that field's own
`requiredWhen`; (c) `rutPersonaTramite: "123456789"` (no dash/check digit) —
violates `validation.pattern`; (d) `emailPrincipal: "not-an-email"` —
violates its `validation.pattern`. All four negative controls were correctly
rejected by manual rule-tracing against `schema.json`.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate-ajv.mjs registry/cl/sii/inicio-actividades-personas-naturales/1.0.0/schema.json
ok   registry/cl/sii/inicio-actividades-personas-naturales/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/validate.mjs registry/cl/sii/inicio-actividades-personas-naturales/1.0.0/schema.json
ok   registry/cl/sii/inicio-actividades-personas-naturales/1.0.0/schema.json
1/1 document(s) passed.
```
