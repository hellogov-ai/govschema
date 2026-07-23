# Verification record — py/mda/driving-licence-declaration@1.0.0

## Candidate selection

GOV-4443 ("GovSchema Standard Research", child of GOV-4441). The GOV-4424
cycle scouted Paraguay as a brand-new jurisdiction alongside Namibia and
Tajikistan and found it the strongest of the three (4 of 6 verticals
STRONG — Taxes, Business Formation, DMV, Visa — see CATALOG.md's Known
Gaps entry 0i). Taxes and Business Formation were authored first (GOV-4427
`py/dnit/individual-income-tax-return` and GOV-4435
`py/suace/business-formalization-individual`); this issue authors DMV as
Paraguay's third vertical (3 of 6), via the Municipalidad de Asunción
(MDA) candidate the same scouting cycle already banked. Visa remains open
STRONG backlog; Passport/National ID (cédula) are confirmed dead ends per
the scouting cycle's own findings.

Paraguay issues driving licences at the municipal (not national) level;
this schema models only the Municipalidad de la Ciudad de Asunción's own
form and does not generalize to any other Paraguayan municipality.

## Reaching the live source

The scouting cycle's own note already gave the exact document URL and
byte count; both were independently re-verified rather than trusted at
face value:

- `https://asuncion.gov.py/wp-content/uploads/2019/03/DECLARACION-JURADA-Licencia-de-conducir-def.pdf`
  (redirects 301 to `www.asuncion.gov.py`)
- HTTP 200, `Content-Type: application/pdf`, 155,460 bytes — matching the
  banked figure exactly.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with no session/cookie state reached it cleanly.
- sha256 `edaa3d21d3bed89ff08293f5aca177dc65ad060ab1b7e05a59529ef95ab7a37c`.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
CommonJS build at `legacy/build/pdf.js`). `getAnnotations()` found **zero**
`/Widget` annotations on either page — this is a flat/printed specimen
with no AcroForm at all (unlike the two prior Paraguayan schemas' own
auto-generated-but-present AcroForms), meaning it is filled out by hand
after printing. Every field was therefore identified from
`getTextContent()`'s raw string + x/y `transform` position across both
pages, cross-checked against both pages rendered to 2.5x-scale PNGs via
`pdfjs-dist` + `node-canvas` to confirm checkbox counts, table-cell
boundaries, and the presence or absence of checkbox glyphs at specific
label positions. (The checkbox squares are vector-drawn page content, not
font glyphs, so they rendered correctly even where some accented-character
text glyphs did not — a font-resolution warning affecting only text, not
graphics, confirmed by cross-checking against the independently-obtained
raw text-layer extraction.)

Unlike both prior Paraguayan schemas' source forms, this form prints no
asterisk or other required-field marker anywhere; required/optional
judgments in this schema are therefore based on the field's evident role
(e.g. an identity/contact field central to issuing a licence vs. a
conditional cross-reference number only some applicants would hold), the
same judgment-call approach this registry already documents for
`jm/taj/individual-income-tax-return` and `ph/lto/drivers-license-application`'s
own `bloodType`/`isOrganDonor` precedent.

## Document structure

**Page 1** ("DECLARACIÓN JURADA — LICENCIA DE CONDUCIR"): a `Fecha` (date)
box top-right; Section 1 ("MOTIVO DEL TRÁMITE DE LICENCIA DE CONDUCIR" — a
6-way single-select checkbox row: Habilitación Nueva / Renovación / Cambio
de Categoría / Constancia de Posesión / Emisión de Duplicado /
Cancelación, plus a "LICENCIA DE CONDUCIR Nº" cross-reference field);
Section 2 ("CATEGORÍAS DE LICENCIAS DE CONDUCIR" — a 10-way single-select
checkbox grid across two rows of five: Particular / Profesional "A" /
Profesional "A" Superior / Profesional "C" / Profesional "D" /
Motociclista / Profesional "B" / Profesional "B" Superior / Extranjero /
Otros); Section 3 ("DATOS PERSONALES" — name, Cédula de Identidad Nº,
address, house number, barrio, date of birth, nationality, sex, mobile
phone, email, blood type, organ-donor Sí/No, and an existing "Registro
Municipal - RMC" number); Section 4 ("PARA EXTRANJEROS", for foreign
applicants — three alternative identity-document number boxes: Carnet de
Residencia Nº / Pasaporte Nº / Carnet de Diplomático Nº, plus a "Carnet
Nº" cross-reference field alongside a 4-way single-select
residency-status checkbox row: Radicación / Admisión Definitiva /
Admisión Temporaria / Oficial); Section 5 ("LICENCIA DE CONDUCIR DE
EXTRANJERO", for an applicant already holding a foreign driving licence —
its number, issuing municipio, and país); a free-text "Obs."
(Observaciones) line; a printed "NO SE ACEPTARÁN TACHADURAS NI ENMIENDAS"
notice and jurat ("DECLARACIÓN JURADA: Declaro bajo Fe de Juramento..."),
both excluded as non-fillable; and a "Firma del Solicitante" signature
line with no field behind it.

**Page 2** ("DECLARACIÓN JURADA — PADECIMIENTO DE AFECCIONES Y/O
ADICCIONES", for obtaining the driving licence): an introductory line
re-stating the applicant's name and Cédula de Identidad (C.I.C) Nº —
modelled by reusing this schema's own `fullName`/`documentNumber` fields
rather than duplicating them (see Finding 9 below); a 37-row table ("N° /
AFECCIONES Y/O ADICCIONES / SÍ / NO") of medical/fitness-to-drive Sí-No
questions covering vision, hearing, limb/mobility, neurological,
psychiatric, cardiac, renal/digestive, hematologic, endocrine (diabetes),
allergy, respiratory, and substance-use conditions, plus a catch-all
"OTROS" row; a free-text "Observaciones" line; a second jurat and two
printed instructional notes (both excluded); and a second "Firma del
Solicitante" signature line with no field behind it.

## Disclosed findings and interpretation choices

1. **This is a flat/printed specimen with zero AcroForm widgets on either
   page** — confirmed via `getAnnotations()` returning an empty `/Widget`
   set for both pages. Every field herein was identified purely from text
   position and rendered-image checkbox counts, not from any
   machine-readable form-field layer.
2. **`motivoTramite` and `categoriaLicencia` are each modelled as a single
   flat enum**, not as independent boolean checkboxes, since the source's
   own layout (one checkbox per option, all under one section header, no
   combination example or "select all that apply" language) indicates a
   single choice per section — consistent with this registry's convention
   for single-select checkbox rows elsewhere (e.g.
   `py/suace/business-formalization-individual`'s own
   `tramiteType`/`businessType`).
3. **`licenciaConducirNumero` is `requiredWhen motivoTramite in` every
   option except `habilitacion-nueva`** (Renovación, Cambio de Categoría,
   Constancia de Posesión, Emisión de Duplicado, Cancelación all logically
   presuppose an existing licence number to reference; a brand-new licence
   has none yet to cite), using GSP-0013's `in` operator per this
   registry's own `ug/mowt/driving-licence-application` precedent, rather
   than a `notEquals` comparison against a single value.
4. **Section 4 ("PARA EXTRANJEROS") and Section 5 ("LICENCIA DE CONDUCIR
   DE EXTRANJERO") fields are all modelled optional with no `requiredWhen`
   gate**, even though they are printed under foreigner-specific section
   headers. Unlike this registry's own
   `py/suace/business-formalization-individual` (whose EIRL-only Section 5
   is explicitly printed "Completar solo en caso de EIRL"), this form
   prints no equivalent "complete only if..." instruction tying Section
   4/5 to `categoriaLicencia: extranjero` or to any other field, so no
   conditional gate is asserted the source itself does not state.
5. **`sexo` is modelled as a 2-value enum (`masculino`/`femenino`) despite
   the source printing only a plain "Sexo" label with no visible option
   list** (confirmed via the rendered image — no checkbox glyphs appear
   near this cell), following this registry's own established convention
   for the identical situation on `mx/ine/credencial-para-votar-application`'s
   own `sexo` field.
6. **`grupoSanguineo` (blood type) is modelled `type: string`, not a
   closed enum**, since the source prints only a plain write-in cell with
   no option list — the same treatment this registry's
   `ph/lto/drivers-license-application` already applies to its own
   `bloodType` field.
7. **`donanteOrgano` is modelled `type: boolean, required: true`** — the
   source prints "Donante de Órgano" followed by "Sí"/"No" text in the
   same row with no drawn checkbox square (confirmed via the rendered
   image), but the row functions identically to a Sí/No checkbox pair the
   applicant must mark one of, the same pattern and requiredness this
   registry's `ph/lto/drivers-license-application` applies to its own
   `isOrganDonor` field.
8. **The 37 Section-"Afecciones y/o Adicciones" rows on page 2 are each
   modelled as an independent required `boolean`**, since the page's own
   jurat ("declara que es cierto cuanto sigue" — declares as true what
   follows) frames the entire table as a single sworn declaration
   requiring an answer to every row, not an optional checklist. No
   multi-value construct is available in spec v0.3 for a table of
   independent yes/no rows (the same constraint this registry's own
   tax-regime checkbox grids already work within).
9. **The introductory "El que suscribe... con C.I.C N°..." line on page 2
   reuses this schema's own `fullName` and `documentNumber` fields**
   rather than defining page-2-specific duplicates, since it is the same
   applicant's identity restated on a second page of one combined
   two-page submission.
10. **The printed "NO SE ACEPTARÁN TACHADURAS NI ENMIENDAS" notice, both
    pages' jurat declarations, and both "Firma del Solicitante" signature
    lines are excluded in their entirety** — the first two are
    non-fillable instructional/legal text with no associated blank space
    to write in, and the signature lines are physical signatures with no
    corresponding field, consistent with this registry's established
    exclusion of "for official use"/jurat/signature-only content (e.g.
    `py/suace/business-formalization-individual` Finding 8).

## Conformance

3 valid mock scenarios:

- `valid-habilitacion-nueva-particular` — a brand-new Particular-category
  licence application with no cross-reference licence number, no
  foreigner section, and every one of the 37 medical questions answered
  `false`.
- `valid-renovacion-profesional-b-organ-donor` — a Profesional "B"
  renewal citing an existing licence number, an organ donor answering
  `true`, and a mix of `true`/`false` medical answers including the
  `otherCondition` catch-all.
- `valid-cambio-categoria-extranjero-con-radicacion` — a Cambio de
  Categoría filing for the Extranjero category, exercising every Section
  4/5 foreigner field including `tipoRadicacion: radicacion` and a prior
  foreign licence.

9 mutation-control fixtures (one missing statically-required field each
from `fecha`, `motivoTramite`, `categoriaLicencia`, `fullName`,
`documentNumber`, `direccionParticular`, `fechaNacimiento`, `sexo`,
`grupoSanguineo`) and one unknown-field-rejected fixture, all committed
under `conformance/py/mda/driving-licence-declaration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13 fixtures: all 3 valid scenarios at 0
errors, all 9 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected.

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
