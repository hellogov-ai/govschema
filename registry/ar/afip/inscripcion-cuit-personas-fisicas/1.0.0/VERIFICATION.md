# Verification record — `ar/afip/inscripcion-cuit-personas-fisicas` v1.0.0

## Candidate selection

This session's brief (GOV-2195) was to author AFIP's Formulario 460/F
("Solicitud de Inscripción / Modificación de Datos — Personas Físicas y
Sucesiones Indivisas"), the natural-person analogue of the already-published
`ar/afip/inscripcion-cuit-personas-juridicas` (F.460/J, GOV-2169, PR #351).
F.460/F was named but explicitly scoped **out** of that earlier session's
brief and its own VERIFICATION.md recorded it as "a strong next-cycle
candidate ... not fetched or extracted this session", reporting a prior
scouting lead of ~148 widgets. That lead is **independently re-verified
from scratch** in this session (fresh `curl` fetch, fresh `pdfjs-dist`
extraction, own field-count reconciliation) rather than trusted — the
widget count turned out to match exactly, but (as with F.460/J) the
*distinct-field* count required its own derivation.

This document deepens Argentina's Business Formation vertical (alongside
F.460/J); Argentina currently stands at 3 of 6 verticals (Business
Formation, Visa, DMV) before this schema.

## Source

- **Primary:**
  `https://serviciosweb.afip.gob.ar/genericos/formularios/pdf/interactivos/f460f.pdf`
  — fetched fresh this session with a browser User-Agent
  (`curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
  (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **208,143 bytes**, SHA-256
  `be2465f8e8c52ef6cde52df6e8a0365c2a6575724a10c210d43396433829b699`.
  Confirmed genuine `%PDF-1.6` content by inspecting the file's own leading
  bytes (`%PDF-1.6\r%âãÏÓ\r\n`), not merely by trusting the `Content-Type`
  header. No login, CAPTCHA, or WAF/bot-mitigation challenge was
  encountered — a plain `curl` with a browser `User-Agent` succeeded on the
  first attempt, consistent with the prior scouting pass's report and with
  F.460/J's own experience of this domain.
  `Last-Modified: Fri, 12 Aug 2022 15:47:53 GMT` per the server's own
  response header.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0`
re-fetched this URL (plus 2 others cited in this file) a second time
immediately before finalizing this record: 3 URLs checked, 0 warnings, 0
allowlisted, all clear.

## Extraction method

Used `pdfjs-dist` (CommonJS, `legacy/build/pdf.js`, from the pre-existing
`/tmp/node_modules/pdfjs-dist` install this registry's tooling note
recommends reusing rather than a fresh `npm install`):

- `doc.getFieldObjects()` to enumerate every AcroForm field-name key and,
  for each, every underlying widget/kid instance carrying its own `rect`.
- `page.getAnnotations({ intent: "display" })` per page to enumerate every
  raw `Widget` annotation (the true widget count), including each
  combobox's own `options` array (`exportValue`/`displayValue` pairs) —
  used verbatim for every dropdown `enum` in this document, not
  re-transcribed by hand, to eliminate transcription risk on long/accented
  option lists (e.g. the 24-province list, the 8-option filer-capacity
  list).
- `page.getTextContent()` per page, preserving each text item's
  `transform[4]`/`transform[5]` (x, y) position, to reconstruct printed
  labels/headers by spatial proximity to each widget.

### Widget → field reconciliation

1. **148 raw AcroForm widgets** across the PDF's 2 pages: 48 (p.1), 100
   (p.2). This matches the prior scouting pass's reported "~148 widgets"
   exactly. Only 2 pages total — unlike F.460/J's 4-page Original+Duplicado
   structure, this specimen carries no mirrored receipt copy at all.
2. `getFieldObjects()` returns **180 distinct keys**, but this figure
   is *not* the real field count: 41 of those 180 keys are **non-terminal
   parent/grouping nodes with zero widget instances of their own** (no
   `rect` on any of their entries) — an artifact of how `pdfjs-dist`
   disambiguates multiple same-named sibling fields in the AcroForm's own
   field-name tree by appending `.0`, `.1`, etc. at each hierarchy level
   (verified directly: e.g. the key `"Localidad"` has 0 terminal entries,
   its child `"Localidad.0"` also has 0, and only its grandchildren
   `"Localidad.0.0"`/`"Localidad.0.1"` carry the 2 real widgets — one per
   address block). Checked mechanically for all 180 keys, not assumed:
   - **130 keys** have exactly **1** terminal (`rect`-bearing) widget
     instance — ordinary text/checkbox/dropdown fields.
   - **9 keys** have exactly **2** terminal widget instances each,
     confirmed via each pair's shared `kidIds` under one non-terminal
     parent node — genuine **PDF radio-button groups** (`getFieldObjects()`
     reports `type: "radiobutton"` for every kid), not two
     coincidentally-identically-named fields: `Tramite` (trámite type:
     `Solic`/`modif`), `argentino o extranjero` (nationality), `residenteonoresidente`
     (residency), `Telefonotipo` (phone type: `Fijo`/`Celular`), `comp soc`/
     `comp soc 2`/`comp soc 3`/`comp soc 4` (per-activity-row "sociedad de
     hecho"/"otras", 4 independent row-level groups), and `Tipo empleador`
     (employer type). This is a **materially different situation from
     F.460/J**, whose visually similar Sí/No-style pairs are independent,
     non-grouped checkboxes (`radioButton: false`) needing `exclusivityGroups`
     to declare their mutual exclusivity; here the PDF itself enforces
     single-choice via a real radio group, so each is modelled as one
     `enum` field and this document needs **no `exclusivityGroups` at all**.
   - **41 keys** have **0** terminal widget instances (see above) — pure
     hierarchy artifacts, not real fields, excluded entirely.
   - Arithmetic check: 130×1 + 9×2 + 41×0 = 130 + 18 + 0 = **148**,
     matching the raw widget count exactly. And 130 + 9 = **139** keys
     carry at least one real widget — the true distinct-field count.
3. **139 real distinct fields**, with **zero split-digit-box merges**
   needed. Checked programmatically: none of the 148 widgets carries a
   `maxLen` restriction of the kind F.460/J's split boxes use (its CUIT
   field alone was 11 single-digit boxes merged into one) — every text
   widget on this specimen returns `maxLen: undefined`, meaning this
   specimen's CUIT, postal codes, dates, etc. are each already single,
   unrestricted free-text boxes. This is a genuine structural
   simplification versus F.460/J, not an extraction oversight; disclosed
   here rather than left unexplained.
4. **Final: 139 fields**, mechanically confirmed as
   `len(json.load(open('schema.json'))['fields'])` after assembly.

### A note on what was *not* scoped down

Like F.460/J, this specimen provides several fixed, bounded, pre-printed
multi-row tables rather than an open-ended "Añadir" (Add)-button-driven
repeating structure: 1 principal + 3 secondary economic-activity rows
(`principalActivity...`/`secondaryActivity1-3...`), a 4-row taxes table
(`taxName1-4`/`taxCode1-4`/`taxRegistrationDate1-4`), a 4-row
withholding/collection-regimes table (`regimeName1-4` etc.), and a 4-row
self-employment "Actividad" table under Datos de la Seguridad Social
(`activityName1-4` etc., each row also carrying its own `comp soc`-style
radio group and sole-proprietor checkbox). Because each of these tables'
AcroForm layer provides a *fixed, finite* number of boxes — not an
unbounded array — every row's fields are modelled directly, the same
disclosed judgment call F.460/J's own VERIFICATION.md documents; this is
not evidence this registry has adopted GSP-0009 array/repeating-value
support.

### Dropdown option lists (exact, not re-transcribed)

Every dropdown (`Ch`/combobox) field's `options` array was read directly
from `page.getAnnotations()` and used verbatim for this document's
`validation.enum` lists, with only the blank/placeholder option (a bare
space or two spaces, representing "nothing selected yet") filtered out:
`requestReason` (motivo, 3 options), `identityDocumentType` (tipodocumento,
6 options), `residencePermitType` (tiporesidencia, 4 options),
`fiscalAddressProvince`/`realAddressProvince` (provincias, 24 options each
— Argentina's 23 provinces plus Ciudad Autónoma de Buenos Aires/Capital
Federal), `fiscalYearEndMonth` (Mes cierre ej, 12 Spanish month names),
`filerCapacityCode` (caracter3, 8 options, textually identical in spirit
to F.460/J's footnote-only "Carácter" catalog but implemented here as an
actual bounded dropdown rather than free text), and `signerCapacity`
(Caracter, 2 options: Titular/Apoderado/a). Reading these programmatically
rather than by eye eliminates transcription risk on the longer/accented
lists (e.g. "Comercializador/a de Combustibles Líquidos - Ley 23.966
Título III Cap. I)", "Santiago del Estero").

### Two disclosed PDF-authoring quirks

1. **`employerType` (Tipo de empleador/a radio group) reuses `comp soc`'s
   exportValues.** Its two radio kids carry `exportValues` `"hecho"`/`"otras"`
   — literally identical to the unrelated per-activity-row "Componente de
   sociedad" ("De hecho"/"Otras") radio groups earlier on the same page —
   while this group's own printed labels actually read "Común"/"Personal de
   casas particulares" (ordinary employer vs. domestic/household-staff
   employer). Confirmed by inspecting both groups' raw `exportValues`
   directly and cross-checking against `getTextContent()`'s nearby text at
   this group's own coordinates. Most plausible explanation: the widget
   pair was duplicated from a "comp soc" group during PDF authoring without
   updating its export values. Disclosed on `employerType`'s own
   `description` rather than silently substituting new export codes not
   actually present in the source PDF, or silently leaving a mismatched
   label unremarked.
2. **The field behind the printed "Nombres (completo)" label carries the
   confusing raw AcroForm name `Apellido.0.1`.** Its parents (`Apellido`,
   `Apellido.0`) exist only as zero-terminal hierarchy nodes; the one real
   widget under this branch sits, by its own `rect` x/y position, directly
   beside the printed "Nombres (completo)" caption on page 1 — not beside
   any "Apellido"-labelled caption. Resolved by on-page position (the
   technique this registry uses throughout), not by the field's own
   (evidently mis-transcribed-during-authoring) name; modelled as
   `givenNames`, with the raw name disclosed on the field's own
   `description` and `sourceRef`.

## Other judgment calls flagged for an independent reviewer

1. **No `required` signal anywhere in the source AcroForm.** Checked
   programmatically across all 148 widgets: none carries the `/Ff`
   Required bit, and a full scan of every extracted text item for a `*`
   character found none — no asterisk-required convention either. Every
   field's `required: true/false` in this document is therefore a
   **structurally-inferred judgment call** (core identity fields —
   document type/number, birth date, sex, nationality, names, principal
   activity, fiscal/real address core components, and the declaration
   block — are asserted required on the strength of being unambiguously
   essential to any filing; everything else, including all optional
   table rows beyond the first/principal row, defaults to `false`), not a
   source-asserted claim, matching F.460/J's own lower-confidence
   disclosure on this point.
2. **`cuit` is optional at the schema level, with a `crossFieldValidation`
   rule making it conditionally necessary** (`cuitRequiredForModification`,
   gated on `requestType equals "modif"`, an explicit value check on a
   required field — not a `notEquals` comparison against an optional
   field, per this registry's own notEquals-empty-string pitfall note).
   Mirrors F.460/J's identical pattern for the identical reason: a first-time
   registration has no CUIT yet.
3. **Two further `crossFieldValidation` rules gate on other *required*
   enum fields' values**, for the same notEquals-pitfall-avoidance reason:
   `foreignNationalRequiresOriginAndResidency` (gated on `nationality
   equals "extranjero"`, requiring `countryOfOrigin`/`residencyStatus`/
   `residencePermitType`) and `attorneySignerRequiresName` (gated on
   `signerCapacity equals "Apoderado/a"`, requiring `attorneyName`).
   `residencePermitValidUntil` was deliberately left ungated even though it
   conceptually only applies to non-permanent residence types, since
   nesting a condition on `residencePermitType`'s value (itself only
   conditionally required) risked exactly the kind of chained-optional-field
   gating this registry's pitfall note warns against; the conditional
   relevance is disclosed in the field's own `description` instead.
4. **`sex` is modelled as an open string, not a closed `M`/`F` enum.**
   Unlike this registry's other Argentina schema with a "sex" field
   (`ar/cancilleria/formulario-solicitud-visado`, whose FSV specimen cites
   an explicit "M o F" footnote), this specimen's AcroForm box for "Sexo
   (tal como figura en documento)" is a plain, unrestricted text field with
   no footnote, dropdown, or radio group of its own — confirmed by
   checking its `fieldType` (`text`) and scanning for any nearby footnote
   text. No enum is asserted here since none is shown on this specific
   source.
5. **`fiscalAddressPostalCode`/`realAddressPostalCode` modelled as open
   strings, not a fixed-length numeric pattern** — same reasoning as
   F.460/J: the AcroForm boxes carry no `maxLen`, wide enough for either a
   legacy 4-digit postal code or a modern alphanumeric CPA (Código Postal
   Argentino) code, and the specimen does not disambiguate which is
   expected.
6. **`commercialJurisdictionLocality` is one combined field**, unlike
   F.460/J's separate `jurisdiccion`/`province` fields (with a disclosed
   gap where F.460/J's own "Localidad" caption had no widget at all).
   F.460/F's own printed caption for this row reads the two concepts
   already joined as "Jurisdicción/localidad" above a single AcroForm box
   (`jurisdicc.0`) — confirmed by inspecting the row's own text items and
   finding only the one combined caption, not two separate ones. No gap
   to disclose here; the single-field modelling follows the single-caption
   source directly.
7. **`employerStartMonthYear` is modelled as a full `date`, not an
   MM/AAAA string** — unlike F.460/J's identically-purposed field (which
   is explicitly captioned "(MM/AAAA)" over two split boxes). This
   specimen's "Fecha de inicio" (employer) box carries no such caption and
   is a single, unrestricted text box; absent a month/year-only cue, it is
   modelled as an ordinary full date. By contrast, the per-activity-row
   `activityStartMonthYear{n}`/`activityEndMonthYear{n}` fields *are*
   explicitly captioned "Mes/año" in the source (`getTextContent()` shows
   this sub-label directly under both the "Inicio" and "Baja" column
   headers) and are modelled as MM/AAAA-pattern strings accordingly — the
   distinction is source-driven, not arbitrary.
8. **`filerCapacityCode` is a genuine dropdown here, unlike F.460/J's
   free-text field of the same name and purpose.** F.460/J's "Carácter"
   box is a plain text field whose footnote (3) merely lists candidate
   values as guidance; this specimen implements the equivalent concept
   (AcroForm field `caracter3`) as an actual bounded `Ch` (combobox)
   field with 8 options, confirmed via `getAnnotations()`'s own `options`
   array — modelled as a closed `enum` here, appropriately more strictly
   than F.460/J's open string, because the *source* is stricter here, not
   because of an inconsistency between these two documents.

## What is out of scope for v1.0.0

- **The 41 zero-terminal parent/grouping keys** `getFieldObjects()` returns
  as an artifact of the AcroForm's own field-name hierarchy (see "Widget →
  field reconciliation" above) — these carry no widget and no data of
  their own.
- **AFIP's full economic-activity ("Nomenclador") catalog** is not
  reproduced as a closed enum; `principalActivityCode`/
  `secondaryActivityNCode`/`activityCodeN` remain open strings since the
  specimen shows only individual boxes, never the catalog itself (same
  scope decision as F.460/J).
- **No `documents[]`/file-upload or fee-payment modelling.** This
  specimen is a paper AcroForm meant to be printed, signed, and filed at
  an AFIP office; it contains no upload/attachment widgets and no
  fee-payment section of its own to model.
- **The wet-ink signature itself** carries no AcroForm widget beyond the
  `swornDeclarationAcknowledgement` checkbox, `declarationDate`,
  `declarationPlace`, `signerCapacity`, and `attorneyName` fields already
  modelled; no separate "Firma" line widget was found near the
  declaration block.

## Mock conformance test run

Per this registry's Phase-4 practice, two valid mock payloads and four
negative/mutation controls were constructed against this document's own
`fields`/`validation`/`crossFieldValidation`, and checked programmatically
against every field's `type`/`required`/`validation` rule with a small
purpose-built Python harness that mirrors `ajv`'s field-level constraint
semantics (`/tmp/gov2195-af460f/mock_test.py`, not committed — scratch
tooling only).

**Valid mock 1 — new registration, Argentine national, minimal:**

```json
{
  "requestType": "Solic",
  "requestReason": "Espontáneo",
  "identityDocumentType": "DNI",
  "identityDocumentNumber": "34567891",
  "birthDate": "1989-04-12",
  "sex": "F",
  "nationality": "argentino",
  "paternalSurname": "GOMEZ",
  "givenNames": "LAURA BEATRIZ",
  "fiscalAddressStreet": "AV. RIVADAVIA",
  "fiscalAddressNumber": "4550",
  "fiscalAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "fiscalAddressDistrict": "COMUNA 6",
  "fiscalAddressProvince": "Capital Federal",
  "fiscalAddressPostalCode": "C1424",
  "realAddressStreet": "AV. RIVADAVIA",
  "realAddressNumber": "4550",
  "realAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "realAddressDistrict": "COMUNA 6",
  "realAddressProvince": "Capital Federal",
  "realAddressPostalCode": "C1424",
  "email": "laura.gomez@example.com.ar",
  "principalActivityDescription": "SERVICIOS DE CONSULTORIA EN INFORMATICA",
  "principalActivityCode": "620100",
  "principalActivityStartDate": "2026-08-01",
  "swornDeclarationAcknowledgement": true,
  "declarationDate": "2026-08-01",
  "declarationPlace": "Ciudad Autónoma de Buenos Aires",
  "signerCapacity": "Titular"
}
```

- `requestType="Solic"` → `cuitRequiredForModification`'s `when`
  (`requestType equals "modif"`) is not met, so `cuit` is correctly **not**
  required. `nationality="argentino"` → `foreignNationalRequiresOriginAndResidency`
  not triggered. `signerCapacity="Titular"` → `attorneySignerRequiresName`
  not triggered. **0 errors.**

**Valid mock 2 — data modification, foreign national, attorney-signed, with
tax/regime/activity rows:**

```json
{
  "requestType": "modif",
  "cuit": "27345678901",
  "requestReason": "Oficio",
  "identityDocumentType": "Pasaporte",
  "identityDocumentNumber": "AB1234567",
  "birthDate": "1975-11-03",
  "sex": "M",
  "nationality": "extranjero",
  "countryOfOrigin": "Chile",
  "residencyStatus": "residente",
  "residencePermitType": "Permanente",
  "residencePermitValidUntil": "2030-01-01",
  "paternalSurname": "SILVA",
  "givenNames": "RODRIGO ANDRES",
  "maternalSurname": "PEREZ",
  "fiscalAddressStreet": "CALLE SAN MARTIN",
  "fiscalAddressNumber": "890",
  "fiscalAddressLocality": "MENDOZA",
  "fiscalAddressDistrict": "CAPITAL",
  "fiscalAddressProvince": "Mendoza",
  "fiscalAddressPostalCode": "5500",
  "realAddressStreet": "CALLE SAN MARTIN",
  "realAddressNumber": "890",
  "realAddressLocality": "MENDOZA",
  "realAddressDistrict": "CAPITAL",
  "realAddressProvince": "Mendoza",
  "realAddressPostalCode": "5500",
  "phoneType": "Celular",
  "phoneAreaCode": "261",
  "phoneNumber": "4567890",
  "principalActivityDescription": "VENTA DE PRODUCTOS AGROPECUARIOS",
  "principalActivityCode": "463010",
  "principalActivityStartDate": "2015-05-20",
  "secondaryActivity1Description": "TRANSPORTE DE CARGA",
  "secondaryActivity1Code": "494200",
  "secondaryActivity1StartDate": "2018-02-10",
  "fiscalYearEndMonth": "Diciembre",
  "filerCapacityCode": "Productor/a",
  "taxName1": "IVA",
  "taxCode1": "10",
  "taxRegistrationDate1": "2015-05-20",
  "regimeName1": "RETENCIONES IVA",
  "regimeTaxCode1": "10",
  "regimeCode1": "767",
  "regimeResolutionNumber1": "2854",
  "regimeRegistrationDate1": "2015-05-20",
  "autonomousCategoryAssigned": "Categoría III",
  "retiredUnderLaw24241": false,
  "activityStartMonthYear1": "05/2015",
  "activityName1": "PRODUCTOR AGROPECUARIO",
  "activityCode1": "463010",
  "activityEmployeeCount1": 3,
  "activityCompanyType1": "otras",
  "activitySoleProprietor1": true,
  "employerType": "hecho",
  "employerStartMonthYear": "2016-03-01",
  "employeeCount": 3,
  "swornDeclarationAcknowledgement": true,
  "declarationDate": "2026-07-15",
  "declarationPlace": "Mendoza",
  "signerCapacity": "Apoderado/a",
  "attorneyName": "FERNANDEZ, MARIA JOSE"
}
```

- `requestType="modif"` → `cuit` present (11 digits) → rule satisfied.
  `nationality="extranjero"` → `countryOfOrigin`/`residencyStatus`/
  `residencePermitType` all present → rule satisfied. `signerCapacity=
  "Apoderado/a"` → `attorneyName` present → rule satisfied. **0 errors.**

**Negative control 1 — `cuit` absent on a data-modification filing:** Same
as valid mock 2 but with `cuit` removed. `cuitRequiredForModification`'s
`when` is met while `requirePresent: ["cuit"]` is not satisfied → **fails
validation**, as expected.

**Negative control 2 — malformed `cuit` (9 digits, not 11):** Same as
valid mock 1 but with `"cuit": "123456789"` added. Fails `validation.pattern`
`^\d{11}$` → **fails validation**, as expected.

**Negative control 3 — foreign national missing origin/residency:** Same
as valid mock 1 but with `"nationality": "extranjero"` (no
`countryOfOrigin`/`residencyStatus`/`residencePermitType` added).
`foreignNationalRequiresOriginAndResidency`'s `when` is met while none of
its 3 `requirePresent` fields are satisfied → **fails validation on all
3**, as expected.

**Negative control 4 — invalid enum value:** Same as valid mock 1 but with
`"identityDocumentType": "Cedula"` (not one of the 6 real dropdown
options). Fails `validation.enum` → **fails validation**, as expected.

## Tooling run

- `node tools/validate.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0` → 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this is a from-scratch second Argentina AFIP
schema with no independent second-reviewer pass yet, several
structurally-inferred (not source-asserted) `required` judgment calls, and
two disclosed PDF-authoring quirks (the `employerType` exportValue reuse,
and the `Apellido.0.1`-named `givenNames` field) that a live-browser or
alternate-specimen cross-check could potentially resolve or corroborate.
Re-check the source, confirm no newer specimen has replaced this one
(`Last-Modified` was 2022-08-12 as of this session), and consider which of
Argentina's remaining verticals (Passport, Taxes, National ID) are ready to
pick up as a follow-on cycle, on or before that date and on any
`source.url` change.
