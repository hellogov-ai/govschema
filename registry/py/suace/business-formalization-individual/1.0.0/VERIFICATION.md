# Verification record — py/suace/business-formalization-individual@1.0.0

## Candidate selection

GOV-4435 ("GovSchema Standard Research", child of GOV-4433). The GOV-4424
cycle scouted Paraguay as a brand-new jurisdiction alongside Namibia and
Tajikistan and found it the strongest of the three (4 of 6 verticals
STRONG — Taxes, Business Formation, DMV, Visa — the strongest
new-jurisdiction showing since Botswana; see CATALOG.md's Known Gaps
entry 0i). Taxes was authored first as GOV-4427
(`py/dnit/individual-income-tax-return@1.0.0`, opening Paraguay as the
registry's 85th jurisdiction); this issue authors Business Formation as
Paraguay's second vertical (2 of 6), via the SUACE Formulario N°1
candidate the same scouting cycle already banked. DMV and Visa remain
open STRONG backlog for future cycles; Passport/National ID (cédula) are
confirmed dead ends per the scouting cycle's own findings.

## Reaching the live source

The scouting cycle's own note already gave the exact document URL and
byte count; both were independently re-verified rather than trusted at
face value:

- `https://suace.gov.py/wp-content/uploads/2020/02/FORMULARIO-FISICA-03.02.2020.pdf`
- HTTP 200, `Content-Type: application/pdf`, 4,295,121 bytes — matching
  the banked figure exactly.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with no session/cookie state reached it cleanly.
- sha256 `6f7871d378138220cec3f66856a42180ce53b999036c00f6cf70099844bac02c`.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
CommonJS build at `legacy/build/pdf.js`). `getAnnotations()` found 80
`/Widget` annotations on page 1 and 46 on page 2 (126 total) — a genuine
AcroForm specimen, but one built by a form-authoring tool (the naming
pattern strongly resembles LibreOffice's auto-generated field names) that
assigns each widget a meaningless auto-incrementing name (`Texto1`,
`Casilla de verificación1_12_12`, etc.) with zero semantic relationship
to what the field actually captures.

Because field names carried no signal, every widget had to be correlated
to its meaning geometrically: `getTextContent()` read every text item's
raw string and its `transform` x/y position across both pages, and a
purpose-built correlation script joined each widget's rect midpoint
against the nearest text on the same row (for inline value boxes) and the
nearest text above it (for section/row headers). This is the same
x/y-position + geometric-join technique this registry has used on other
auto-generated or non-standard AcroForm specimens (e.g.
`kg/gns/unified-tax-declaration`, `ge/napr/llc-founding-agreement`).

Several groupings were genuinely ambiguous from x/y position alone and
were resolved by rendering both pages to 2.5x-scale PNGs via `pdfjs-dist`
+ `node-canvas` and visually inspecting the result (with a further
zoomed-in crop for the Section 10 Tipo de Documento row specifically):

- Whether the "Tipo de Dirección" row's second line of checkboxes
  (Interior/Departamento/Casa/Oficina) was a continuation of the same
  field as the first line (Avenida/Calle/Autopista/Carretera/Callejón)
  or an independent second field — the rendered image showed no
  independent header or asterisk introducing the second line, confirming
  it is one field (see Disclosed Finding 2 below).
- Whether "ACTIVIDAD ECONÓMICA SECUNDARIA" printed one Código/Descripción
  row or two — the raw text extraction showed two candidate row-groups
  only ~15pt apart, which the rendered image confirmed are two distinct,
  full-width printed input boxes (see Disclosed Finding 3).
- Whether Section 10's "Cédula de Identidad" and "Pasaporte" checkboxes
  carry their own adjacent number boxes the way Section 3 and Section 9's
  equivalent rows do — a zoomed crop of the rendered row confirmed only
  "Carnet de Migración" has a number box in this section; the other two
  are checkbox-only (see Disclosed Finding 4).

## Document structure

**Page 1**: Section 1 (Tipo de Trámite: Apertura/Formalización), Section
2 (Tipo de Empresa: Persona Física/EIRL, plus RUC N°), Section 3 (Datos
Personales — name, birth date, nationality, one of three ID-document
types with its own number box, primary email, Razón Social/Nombre
Fantasía), Section 4 (Domicilio Fiscal — administrative address fields
plus a combined 9-value Tipo de Dirección), Section 5 (Datos de
Constitución EIRL, printed "Completar solo en caso de EIRL", plus an
unmarked-required Datos del Escribano sub-block), Section 6 (Actividad
Económica Principal — required — and Actividad Económica Secundaria — two
optional Código/Descripción slots), Section 7 (Operaciones —
Importador/Exportador checkboxes), and Section 8 (Obligaciones
Tributarias, printed "Completar solo en caso de Apertura de la Sociedad"
— a start date, a closing-month choice, and an 11-row tax-regime checkbox
grid each with its own "Fecha desde" date).

**Page 2**: Section 9 (Datos del Representante Legal — a full
identity/contact/backing-document block, structurally a near-duplicate of
Section 3's ID-document pattern but with all three of its own number
boxes present), Section 10 (Gestor Autorizado o Persona a Notificar — see
Disclosed Finding 4 for its incomplete ID-number boxes), Section 11
(Información Patrimonial de la Empresa/MIPYMES — Total Activo/Pasivo
Patrimonial, expressed in guaraníes), Section 12 (Observaciones — a
printed Ley 132/98 copyright-declaration jurat and a Código Penal
Paraguayo Art. 243 false-declaration jurat, with zero associated
widgets), an unnumbered "Solicitante por la Empresa" signer block (name,
ID type/number, role, and a physical "Firma" line with no AcroForm field
behind it), and a "PARA USO EXCLUSIVO DEL SUACE" office-use block (mesa de
entrada number, reception date/time, approval date, reception staff
name/signature).

## Scope: excluded blocks

- **Section 12 ("Observaciones")** — a printed jurat/legal-notice block
  with zero associated widgets; there is nothing to model.
- **"PARA USO EXCLUSIVO DEL SUACE"** — internal government tracking data
  (mesa de entrada number, reception date/time, approval date, reception
  staff name/signature) supplied by SUACE personnel after submission, not
  applicant input. The same class of exclusion this registry's
  `py/dnit/individual-income-tax-return` (Finding 5) and
  `jm/taj/individual-income-tax-return` (Finding 8) already draw around
  their own "for official use" blocks.
- **The "Firma" line** in the "Solicitante por la Empresa" block — no
  AcroForm widget exists behind it, consistent with the form's own
  printed instruction that it "deberá llenarse en forma electrónica,
  impresa y firmada por el representante legal" (must be filled
  electronically, then printed and signed by hand).

## Disclosed findings and interpretation choices

1. **Three separate applicant/representante-level ID-document number
   boxes are collapsed into one `documentNumber`/`representanteDocumentNumber`
   field each**, rather than modelled as three parallel
   visibleWhen-gated fields. The source prints an independent number box
   directly after each of C.I. N°, Pasaporte N°, and Carnet de Migración
   N° in both Section 3 and Section 9, but exactly one is ever filled in
   per submission (whichever `documentType`/`representanteDocumentType`
   is checked) — the same collapsing this registry's
   `at/bmeia/schengen-visa-application` already applies to its own
   `travelDocumentType`/`travelDocumentNumber` pair for an analogous
   single-choice-of-N-document-types row.
2. **`tipoDireccion` is modelled as a single 9-value enum, not two
   separate fields**, even though the source prints its nine options
   (Avenida/Calle/Autopista/Carretera/Callejón, then
   Interior/Departamento/Casa/Oficina) across two visual rows. Rendering
   the page to an image confirmed there is no independent header,
   asterisk, or field label introducing the second row as anything other
   than a continuation of the same "*Tipo de Dirección" field above it —
   this registry's own "spec precision over cleverness" convention favors
   one field over a speculative two-field split the source itself does
   not indicate.
3. **Actividad Económica Secundaria is modelled as two independently-named
   Código/Descripción slots** (`actividadSecundaria1*`/`actividadSecundaria2*`),
   confirmed by rendering the page to an image after the raw x/y text
   extraction showed two candidate row-groups only ~15pt apart under one
   "ACTIVIDAD ECONÓMICA SECUNDARIA" header — the rendered image confirmed
   two full-width printed boxes, not one wrapped/duplicate box. Neither
   slot carries a required marker (unlike Actividad Económica Principal's
   own required Código/Descripción, which the source marks with
   asterisks).
4. **Section 10's `gestorDocumentType` has a value box only for Carnet de
   Migración** (`gestorCarnetMigracionNumero`, requiredWhen
   `carnet-migracion`) — Cédula de Identidad and Pasaporte print only a
   checkbox each, with no adjacent number field, confirmed both from the
   raw widget/text correlation (no `Tx` widget in that x-range at that
   y-band) and from a zoomed-in crop of the rendered page. This is a
   genuine gap in the source form itself (unlike Sections 3 and 9, which
   give all three document types their own number box) and is modelled
   faithfully rather than papered over with an invented field.
5. **`fechaInicioActividadesEirl` (Section 5) and
   `fechaInicioActividadesApertura` (Section 8) are two distinct fields
   sharing the identical printed label** "Fecha de inicio de
   actividades" under two different conditional sections ("Completar
   solo en caso de EIRL" vs "Completar solo en caso de Apertura de la
   Sociedad") — kept separate rather than merged, since a
   Formalización-EIRL filer and an Apertura filer are answering
   genuinely different questions even though the printed words are
   identical.
6. **Each of the 11 Section 8 tax-regime rows is modelled as an
   independent `boolean` plus its own `requiredWhen`-gated `FechaDesde`
   date**, rather than a single multi-select field, since spec v0.3's
   `enum` type is a flat scalar with no array/multi-value construct (the
   same constraint this registry's `kg/gns/unified-tax-declaration` and
   `py/dnit/individual-income-tax-return` already work within). No
   exclusivity constraint is asserted across the 11 regimes (e.g. IRE
   GENERAL vs IRE SIMPLE vs IRE RESIMPLE) since the source form itself
   prints them as independent checkboxes with no radio-button grouping or
   explicit mutual-exclusivity marker.
7. **`totalActivoPatrimonial`/`totalPasivoPatrimonial` are modelled
   `type: integer` with `validation.minimum: 0`**, since the Paraguayan
   guaraní (ISO 4217 PYG) has no minor currency unit (exponent 0) — the
   same guaraní-amount convention this registry's
   `py/dnit/individual-income-tax-return` already applies, though that
   schema's own source additionally prints an explicit "sin céntimos"
   instruction this SUACE form does not.
8. **Section 12 and the "PARA USO EXCLUSIVO DEL SUACE" block are excluded
   in their entirety** and **the "Firma" line has no field behind it** —
   see "Scope: excluded blocks" above.

## Conformance

3 valid mock scenarios:

- `valid-apertura-persona-fisica-single-regime` — an Apertura filing for
  a Persona Física with one Section 8 tax regime selected (700 - IRE
  GENERAL) and no EIRL-only fields.
- `valid-formalizacion-eirl-full-constitucion` — a Formalización filing
  for an EIRL exercising every Section 5 constitution field, the
  Escribano sub-block, both secondary economic activities, and a Carnet
  de Migración gestor.
- `valid-apertura-eirl-multi-regime-otros-respaldo` — an Apertura filing
  for an EIRL selecting three Section 8 regimes with three FechaDesde
  dates, and a representante `Documento de Respaldo` of `otros`
  exercising the conditional `Especificar` field.

9 mutation-control fixtures (one missing statically-required field each
from `tramiteType`, `businessType`, `ruc`, `fullName`, `documentType`,
`documentNumber`, `primaryEmail`, `actividadPrincipalCodigo`,
`totalActivoPatrimonial`) and one unknown-field-rejected fixture, all
committed under
`conformance/py/suace/business-formalization-individual/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving
required/requiredWhen rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 13 fixtures: all 3 valid
scenarios at 0 errors, all 9 mutation controls each raising exactly 1
error, and the unknown-field fixture correctly rejected.

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run
build-index` in `tools/govschema-client/`.
