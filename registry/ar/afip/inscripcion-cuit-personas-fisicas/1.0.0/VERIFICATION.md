# Verification record — `ar/afip/inscripcion-cuit-personas-fisicas` v1.0.0

## Candidate selection

This session's brief (GOV-2195, child of the recurring research issue
GOV-2167) was to close out **AFIP's Formulario 460/F**, the individual/
persona física analogue of `ar/afip/inscripcion-cuit-personas-juridicas`
(F.460/J, published GOV-2169), deepening Argentina's Business Formation
vertical with a second schema rather than opening a new jurisdiction or
vertical. F.460/F was named as an explicit backlog candidate in GOV-2169's
own VERIFICATION.md ("a strong next-cycle candidate ... not yet fetched or
extracted") and was screened again — inconsistently — in two later
Argentina cycles (GOV-2179, GOV-2187), both of which reported it in
CATALOG.md as a "flat/printed 0-widget form ... like its 460/J sibling."

**That prior reporting is incorrect, and this session's own independent
extraction supersedes it** (see "Extraction method" below): F.460/F is a
genuine, fully-interactive fillable AcroForm PDF with 148 raw widgets
across 2 pages, not 0. The 460/J sibling it was compared against is
likewise a genuine fillable AcroForm (351 widgets — see that document's
own published VERIFICATION.md), not flat either. Neither document is
scanned-image/text-free the way `ar/dnrpa/solicitud-tipo-08-transferencia-automotor`
(GOV-2187) genuinely is. This document's own CATALOG.md update discloses
and corrects the earlier claim; the origin of the "0-widget" misreport was
not identified (most plausibly a scouting-pass error that was repeated
rather than independently re-checked in the two later cycles — the exact
failure mode this registry's own recurring-research practice exists to
catch by re-deriving numbers from scratch each cycle rather than trusting
a prior report).

## Source

- **Primary:**
  `https://serviciosweb.afip.gob.ar/genericos/formularios/pdf/interactivos/f460f.pdf`
  — fetched fresh this session with a browser User-Agent: **HTTP 200**,
  `content-type: application/pdf`, exactly **208,143 bytes**, SHA-256
  `be2465f8e8c52ef6cde52df6e8a0365c2a6575724a10c210d43396433829b699`.
  Confirmed genuine `%PDF-1.6` content by inspecting the file's own
  leading bytes (`%PDF-1.6\r%âãÏÓ\r\n` — `od -c` on the first 16 bytes), not
  merely trusting the `Content-Type` header. No login, CAPTCHA, or
  WAF/bot-mitigation challenge was encountered. `Last-Modified: Fri, 12
  Aug 2022 15:47:53 GMT` per the server's own response header.
- **Independent re-fetch:** the same URL was fetched a **second time**,
  independently, later in this same session (a fresh `curl` invocation,
  not a cached copy) specifically to confirm the extraction data this
  document is built from was not corrupted or stale: byte-for-byte and
  hash-for-hash identical (208,143 bytes, same SHA-256, same
  `Last-Modified`).
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0`
re-fetched this URL (plus 2 others cited in this file) immediately before
finalizing this record: 3 URLs checked, 0 warnings, 0 allowlisted, all
clear. No entry was added to `tools/verify-sources-allowlist.json` — this
domain needs none.

## Extraction method

Used `pdfjs-dist` (CommonJS, `legacy/build/pdf.js`, from a pre-existing
`/tmp/node_modules/pdfjs-dist` install reused per this registry's own
tooling note):

- `doc.getFieldObjects()` to enumerate every **distinct AcroForm field
  name** and, for each, every underlying terminal widget entry (one
  carrying a `rect` per widget instance) plus, for combo boxes, that
  field's own closed `items` catalog (`exportValue`/`displayValue` pairs).
- `page.getAnnotations({ intent: "display" })` per page — **independently
  re-run this session**, not merely inherited from a prior extraction
  pass — to enumerate every raw `Widget` annotation (the true widget
  count) and each widget's own `fieldFlags`, to check programmatically
  for the `/Ff` Required bit (bit value `2`).
- `page.getTextContent()` per page, preserving each text item's `x`/`y`
  position, to reconstruct printed labels/headers by spatial proximity to
  each widget's own `rect` — done field-by-field for all 139 terminal
  fields in this document, not inferred from field-name text alone (see
  "Label attribution" below).

### Widget → field reconciliation

1. **148 raw AcroForm widgets** across the PDF's 2 pages, confirmed via
   this session's own independent `page.getAnnotations({intent:'display'})`
   call: **48 on page 1, 100 on page 2** — reconciling exactly with the
   per-page widget counts this session started from.
2. `getFieldObjects()` resolves the document's AcroForm to **180 distinct
   field names**. **41 of these are non-terminal hierarchy container
   nodes** (0 terminal widgets of their own — e.g. `Apellido` → its child
   `Apellido.0` → the actual terminal leaf `Apellido.0.1`; `fecha inicio`
   → `fecha inicio.0`..`fecha inicio.11`, etc.) and are excluded from this
   document's `fields` entirely, per this registry's established
   convention for `pdfjs`'s array-style field-name hierarchy. This leaves
   **139 real terminal logical field names**.
3. Of those 139: **130 have exactly 1 widget instance each** (independent
   text/combo-box/checkbox fields), and **9 have exactly 2 widget
   instances each**, confirmed `radioButton: true` via `getFieldObjects()`
   for every one of the 18 underlying widgets (checked individually, not
   assumed) — genuine native PDF radio-button groups, **not** an
   Original/Duplicado mirrored-copy structure (this specimen has no such
   mirroring at all — unlike the 460/J sibling's Original+Duplicado
   4-page design, this is a single 2-page specimen: "Hoja 1 de 2" and
   "Hoja 2 de 2", confirmed by each page's own printed running header).
   The 9 radio groups: `Tramite` (`Solic`/`modif` — new registration vs.
   data modification), `argentino o extranjero` (`argentino`/`extranjero`
   — nationality), `residenteonoresidente` (`residente`/`no residente` —
   tax residency), `comp soc`, `comp soc 2`, `comp soc 3`, `comp soc 4`
   (each `hecho`/`otras` — 4 rows of a "Componente de sociedad" table),
   `Tipo empleador` (`hecho`/`otras` — employer type, see the disclosed
   quirk below), and `Telefonotipo` (`Fijo`/`Celular` — phone type).
4. Reconciliation arithmetic: 148 raw widgets − 9 (one redundant widget
   per radio group, since each group's 2 widgets collapse into 1 logical
   `enum` field) = **139 logical fields**, mechanically confirmed as
   `len(json.load(open('schema.json'))['fields'])` after assembly — not
   asserted from the arithmetic alone. **No split-digit/split-component
   box merges exist in this specimen** (see below), so no further
   reduction applies; 139 is also this document's final field count.

### No split-digit-box groups (a divergence from the 460/J sibling)

The 460/J sibling merges 5 split-digit/split-component box groups (its
own 11-box CUIT among them) into single logical fields. This document was
explicitly checked for the same pattern before assuming none exists:
every one of the 139 terminal fields' `maxLen` property was inspected
programmatically across the full `fieldObjects.json` dump — **none carry
any `maxLen` constraint at all** (all `None`/absent). The CUIT itself
(`CUIT`, field name unchanged from the specimen) is a **single open
AcroForm text box**, ~115pt wide, not split into 11 single-digit boxes the
way the 460/J sibling's `CUIT1`..`CUIT11` are. This document therefore has
**zero split-box merges** — a genuine structural difference from its
sibling, not an extraction gap; disclosed here per the task brief's
explicit instruction to check for this pattern before assuming every
terminal name is already a complete logical field.

### Combo boxes with closed, AFIP-defined value catalogs (a second divergence)

8 of this specimen's fields are AcroForm combo boxes whose own
`getFieldObjects()` entry carries a genuine, closed `items` array (not
merely a text box): `motivo` (reason for the filing — Espontáneo/Convenio
migratorio/Oficio), `tipodocumento` (identity-document type — DNI/LE/LC/
Pasaporte/Certificado de Migraciones/C. I. país limítrofe), `Mes cierre ej
2` (fiscal year-end month, the 12 months), `caracter3` (filer-capacity
code, 8 values), `tiporesidencia` (residency type — Permanente/
Transitoria/Temporaria/Precaria), `provincias.0`/`provincias.1` (fiscal
and real address province, Argentina's 24 provinces/autonomous city), and
`Caracter` (declarant capacity — Titular/Apoderado/a). Every one of these
8 catalogs was extracted directly from each combo box's own `items` array
(`exportValue` == `displayValue` for every entry checked) — not typed from
memory or guessed at — and each is modelled as `type: "enum"` with
`validation.enum` listing the non-blank values (the leading blank/
placeholder entry every combo box carries as its unselected default state
is excluded, the same way an unchecked checkbox's "Off" state is not
itself a modelled value). The 460/J sibling has **no** combo boxes with
closed catalogs of this kind (its own analogous fields — e.g.
`controllingBodyCode`, `filerCapacityCode` — are plain text boxes,
disclosed there as open strings); this is a genuinely richer,
programmatically-discoverable choice structure unique to this specimen.

### Native PDF radio groups modelled as `type: "enum"` (per task brief, spec v0.3 §6.4.1)

Per this task's explicit brief and spec v0.3 §6.4.1 ("When `type` is
`enum`, `validation.enum` is a non-empty array of the allowed values...
Describe the choices in the field's `description`"), all 9 genuine PDF
radio-button groups are modelled as a single `type: "enum"` field with
`validation.enum` listing the group's literal `exportValues` — **not**
as an independent-boolean-pair-plus-`exclusivityGroups` the way the 460/J
sibling models its own (non-grouped) checkbox choices. This is the
correct spec-conformant distinction: the sibling's checkboxes are
independent AcroForm fields with no native grouping (`radioButton: false`
on every one, confirmed there), so GSP-0013 `exclusivityGroups` is the
only way to disclose their real-world mutual exclusivity; this
specimen's 9 groups are genuine single PDF fields with 2 linked widget
instances and `radioButton: true`, so `type: "enum"` models the choice
natively and correctly, with mutual exclusivity inherent to the type
rather than requiring a separate declaration. Consequently **this
document declares no `exclusivityGroups` entries at all** — every
independent checkbox remaining in this specimen (`retiredUnderLaw24241`,
the 4 `socialSecurityActivityNSoleProprietorEmployer` checkboxes, and
`declarationAcknowledged`) was checked for a paired "No"/counterpart
widget nearby and found to have **none** (each carries a single "Sí"/"Yes"
caption and exportValue, confirmed by listing every text item in each
checkbox's coordinate neighborhood) — a lone affirmative checkbox with no
mutually-exclusive sibling to group.

### A disclosed PDF-authoring quirk: `Tipo empleador`'s literal exportValues vs. its own printed caption

This document's own independent rect-based label-attribution pass (not
inherited from the task brief, which only listed the raw `exportValues`)
surfaced a genuine quirk: the `Tipo empleador` radio group's two widgets
carry the literal `exportValues` `hecho`/`otras` — the **same literal
strings** the four unrelated `comp soc`/`comp soc 2`/`comp soc 3`/
`comp soc 4` ("Componente de sociedad: De hecho / Otras") radio groups use
elsewhere in the same "9- Datos de la Seguridad Social" section. However,
`Tipo empleador`'s own adjacent printed caption text (confirmed via
`getTextContent()` at the exact same y-coordinate as the radio widgets)
reads **"Común" / "Personal de casas particulares"** — "regular
[employer]" versus "domestic/household-staff employer" — an entirely
different concept from "de hecho"/"otras" partnership types. This reads as
a PDF-authoring artifact: whoever assembled this AcroForm most plausibly
cloned one of the `comp soc` radio-group widgets to create `Tipo empleador`
and updated its visible caption text without renaming its underlying
`exportValues`. This document's `employerType` field models the **literal**
`exportValues` (`hecho`/`otras`) in `validation.enum`, since that is what a
consumer filling this PDF programmatically must actually submit, with the
human-meaningful mapping (`hecho` = "Común", `otras` = "Personal de casas
particulares") disclosed in the field's own `description` — disclosed
rather than silently reconciled or silently left for a reader to discover
on their own.

### Label attribution technique

Every one of the 139 terminal fields' label was reconstructed by
correlating its own `rect` (x/y position) against the nearest `getTextContent()`
text item(s) on the same page, verified against each section's own printed
heading ("1- DATOS DE IDENTIFICACIÓN" through "10- DECLARACIÓN JURADA") to
confirm page/section placement — not inferred from AcroForm field-name text
alone, several of which are cryptic Spanish abbreviations (`mat prof seg
soc`, `cod ret01.0.0`) that only resolve to a clear meaning once matched
against their own column header. This was done exhaustively for all 139
fields, cross-checked field-by-field against a full sorted dump of both
pages' text items by x/y position; a machine-checked bijection (below)
confirms every one of the 139 raw AcroForm field names was mapped to
exactly one of this document's 139 field names, with none dropped, none
duplicated, and none invented.

**A specific case called out in the task brief**: `Apellido paterno` and
`Apellido materno` are each their own top-level terminal field name (rects
confirm both on page 1, y420 and y389 respectively — "2- Datos
Referenciales" section), completely unrelated to the 3-level hierarchy
chain `Apellido` → `Apellido.0` → the terminal `Apellido.0.1`. This
document confirmed via `Apellido.0.1`'s own `rect` ([318, 420, 558, 433] —
same row as `Apellido paterno`, positioned to its right) and the nearest
text item ("Nombres (completo)" at x317/y437) that this hierarchy-leaf
field is in fact the "given names (in full)" box on the same "2- Datos
Referenciales" row, modelled here as `givenNames` — not a duplicate
surname field, and not (as the sibling task brief's own general caution
about this naming pattern might suggest for a different document) the
declaration block's "Apellido y nombre" field, which is a wholly separate,
correctly-page/rect-confirmed field (`Nombre DJ` → `declarantName`, page 2,
"10- Declaración Jurada").

### A width-pattern judgment call: full-date vs. month/year fields

No field in this specimen carries an explicit "DD/MM/AAAA" or "MM/AAAA"
qualifier in its own printed caption for every date-shaped box (unlike the
declaration block's own `Fecha DD/MM/YYYYY` field, which is explicit).
This document's own independent measurement of every date-shaped field's
`rect` width found a consistent bimodal pattern: fields captioned "Fecha
de..."/"Fecha inicio"/"Fecha alta" etc. with **no** further qualifier are
uniformly ~53pt wide (`dateOfBirth`, `dateOfDeath`, `residencyValidUntil`,
`principalActivityStartDate`, all 4 `secondaryActivityNStartDate`, all 4
`taxRegistrationDateN`, all 4 `regimeRegistrationDateN`,
`employerStartDate`, `declarationDate`), while fields whose own caption
explicitly reads "Mes/año" are uniformly ~30pt wide (`socialSecurityActivityNStartMonthYear`,
`socialSecurityActivityNEndMonthYear`). This width split was used as
corroborating (not sole) evidence to model `employerStartDate` as a full
`type: "date"` rather than a month/year string, since its own caption
("Fecha de inicio") lacks the "Mes/año" qualifier and its box matches the
~53pt full-date group — disclosed here as a judgment call based on a
structural pattern found independently in this session, not a source
-asserted claim.

### One further minor label ambiguity, disclosed rather than silently resolved

The "9- Datos de la Seguridad Social" activity sub-table's `mat prof seg
soc.N` column (modelled here as `socialSecurityActivityNProfessionalLicenseNumber`)
carries a clean, correctly-positioned "Matr. Prof." caption at y277
directly above its own column — but the same x-coordinate range also
contains a stray "Mes/año" text item at y269, the same y-band used by the
two genuinely date-related columns to its left ("Inicio"/"Baja"). A
professional-license/registration number column having a "month/year"
sub-caption makes no semantic sense, and this document's own field-name
cross-check (`mat prof seg soc` — an unambiguous abbreviation for
"Matrícula Profesional") confirms the column's true purpose. This is
most plausibly a residual/duplicate text-rendering artifact from an
edited template (the same general class of PDF-text-positioning artifact
this registry's pitfall list already warns about), not a genuine second
caption — disclosed here rather than silently dropped or reinterpreted as
a date field.

### Machine-checked field-name bijection

A programmatic cross-check confirmed a strict 1:1 mapping between this
document's 139 field `name`s and the 139 raw terminal AcroForm field
names in `terminal-fields.json`: zero raw names unmapped, zero mapped
names absent from the raw set, zero duplicate `name` values on either
side. This is a stronger, independently-run check than eyeballing the
field list — every raw AcroForm field name genuinely present in the
source PDF is accounted for exactly once in this document's `fields`.

## Other judgment calls flagged for an independent reviewer

1. **No `required` signal anywhere in the source AcroForm — checked
   programmatically, independently, this session.** `page.getAnnotations({intent:'display'})`
   was used to inspect `fieldFlags` on all 148 widgets directly (not
   inherited from a prior pass): 7 distinct `fieldFlags` values appear
   across the document (`0`, `4194304`, `12582912`, `29360128`, `33603584`,
   `4325376`, `49152`), and **none** have the `/Ff` Required bit (bit value
   `2`) set — `requiredCount = 0` across all 148 widgets, confirmed by a
   bitwise `& 2` check on every widget. No asterisk-required convention
   was found in either page's text either. Every field's `required`
   value in this document is therefore a **structurally-inferred judgment
   call**, following the same practice and confidence level the 460/J
   sibling used: identification/name/address-core fields, the principal
   economic activity, and the declaration block are asserted `required:
   true` on the strength of being unambiguously essential to any filing;
   the 4-row economic-activity/tax/regime/social-security tables (rows
   2-4 and, per point 6 below, even row 1) default to `false`, since
   unlike the sibling's officer-identification table (where at least one
   officer is legally mandatory for any entity), nothing in this
   specimen indicates at least one row of these tables must be populated
   for every filing.
2. **`cuit` is optional at the schema level, with a `crossFieldValidation`
   rule making it conditionally necessary** — directly analogous to the
   460/J sibling's `cuitRequiredForModification` rule, adapted to this
   document's `type: "enum"` `requestType` field rather than a boolean
   pair: `when: {field: "requestType", equals: "modif"} → requirePresent:
   ["cuit"]`. Per this registry's own notEquals-empty-string pitfall
   note, this uses an explicit `equals` leaf on a required, closed-enum
   field, not a `notEquals` comparison against an optional field.
3. **`countryOfOrigin` is optional, with a `crossFieldValidation` rule
   requiring it when the individual is foreign.** `nationality`
   (`argentino`/`extranjero`) is modelled `required: true` (an
   always-answered core-identity choice); when it equals `"extranjero"`,
   `countryOfOrigin` becomes necessary — `countryOfOriginRequiredForForeignNational`.
   `residencyType`/`residencyValidUntil` are also chiefly relevant only
   for a foreign resident, but no crossFieldValidation rule was added for
   them: unlike `countryOfOrigin` (which is unambiguously always
   necessary for any foreign national, regardless of tax-residency
   status), whether a residency-permit type/expiry is actually necessary
   depends on further combinations of nationality *and* tax-residency
   status this specimen does not spell out explicitly enough to assert a
   rule with confidence — left as an optional field with the
   conditionality disclosed in its own `description` rather than guessed
   at with a rule.
4. **`declarantName` is optional, with a `crossFieldValidation` rule
   requiring it when the declarant signs as an attorney-in-fact.** The
   specimen's own printed caption for this field reads "Apellido y nombre
   (en caso de ser apoderado/a)" — an explicit textual conditionality
   signal, the cleanest of any in this document. `declarantCapacity`
   (`Titular`/`Apoderado/a`) is modelled `required: true`; when it equals
   `"Apoderado/a"`, `declarantName` becomes necessary —
   `declarantNameRequiredForAttorneyInFact`. Per the notEquals pitfall
   note, this again uses `equals` on a required enum field, not
   `notEquals` on an optional one.
5. **`sex` is modelled as an open string, not a closed enum.** Its own
   caption reads "Sexo (tal como figura en documento)" — "sex as it
   appears on the [identity] document" — and its AcroForm field (`Sexo`)
   is a plain text box, not one of this specimen's combo boxes (unlike
   the adjacent `tipodocumento`/document-type field in the same row,
   which is a combo box). Modelled as required (positioned in the core
   identification block alongside `dateOfBirth`, with no "(de
   corresponder)"/"if applicable" qualifier the way `dateOfDeath`
   explicitly carries), but disclosed here as a lower-confidence
   structural inference like every other `required: true` value in this
   document.
6. **The 4-row `socialSecurityActivityN...` table's row 1 is *not*
   modelled as required, a deliberate divergence from the 460/J
   sibling's own officer-table row-1-required precedent.** The sibling
   required its own officer-identification table's row 1 on the grounds
   that a legal entity filing must legally identify at least one officer.
   This specimen's own "9- Datos de la Seguridad Social" activity table
   registers economic activities for social-security/autónomo
   contribution purposes — a section that plausibly applies only to
   self-employed individuals, not to every natural person filing this
   form (e.g. a simple employee with no independent economic activity
   would have nothing to enter here). Absent a clearer source signal that
   at least one row is always mandatory, every field in all 4 rows
   (including row 1) defaults to `required: false` — disclosed here as a
   deliberate, reasoned departure from the sibling's own precedent rather
   than an oversight.
7. **Address postal codes (`fiscalAddressPostalCode`/`realAddressPostalCode`)
   modelled as open strings, not a fixed-length numeric pattern** — same
   basis as the 460/J sibling's own `fiscalAddressPostalCode`/
   `legalAddressPostalCode`: the AcroForm boxes accommodate either a
   legacy 4-digit postal code or a modern alphanumeric CPA (Código Postal
   Argentino) code, and the specimen does not disambiguate which is
   expected.
8. **`cuit`'s pattern (`^\d{11}$`) assumes a raw, unpunctuated 11-digit
   value**, matching the sibling's own convention for its analogous
   fields, even though this specimen's CUIT box (unlike the sibling's
   11-single-digit-box CUIT) is a single wide field that could in
   practice accept a hyphenated format (e.g. "20-12345678-9"); disclosed
   in the field's own `description`.
9. **`commercialProvince` (the "7- Datos Comerciales" section's own
   "Provincia" field, AcroForm name `provincia datos comercial`) is
   modelled as an open string, not one of this specimen's closed
   `provincias.N` combo-box catalogs.** Checked programmatically: this
   specific field's own `getFieldObjects()` entry is `type: "text"`, not
   `"combobox"` — a genuinely different AcroForm widget type from the
   fiscal/real-address province fields in the same document, despite the
   identical printed caption ("Provincia"), disclosed rather than
   silently normalized to match the other two.

## What is out of scope for v1.0.0

- **The AFIP-staff-only handling of a filed paper form** (this specimen
  carries no reception-date-stamp widget of the kind the 460/J sibling's
  Original/Duplicado pages do — there being no Duplicado copy at all in
  this single-copy specimen).
- **The wet-ink "Firma y Sello" (signature and seal) line** — no
  corresponding AcroForm widget exists anywhere on either page (searched
  for and found none), consistent with `declarationDate`/
  `declarationPlace`/`declarantCapacity`/`declarantName`/
  `declarationAcknowledged` being the only declaration-block fields
  modelled.
- **AFIP's full economic-activity ("Nomenclador") catalog** is not
  reproduced as a closed enum — `principalActivityCode`/
  `secondaryActivityNCode`/`socialSecurityActivityNCode` remain open
  strings, since the specimen shows only individual boxes, never the
  catalog itself (the same scope decision the 460/J sibling made for its
  own analogous fields).
- **The in-person/postal submission process itself.** This specimen is a
  paper AcroForm meant to be printed, signed, and filed at an AFIP office
  (or by whatever channel `requestReason` implies); it contains no
  upload/attachment widgets and no fee-payment section of its own to
  model.
- **No `documents[]`/file-upload modelling**, consistent with the above.

## Mock conformance test run

Per this registry's Phase-4 practice, two valid mock payloads and three
negative/mutation controls were constructed against this document's own
`fields`/`validation`/`crossFieldValidation`, and checked by hand against
every field's `type`/`required`/`validation` rule (equivalent to running
each through `ajv` with the field-level constraints compiled from
`schema.json`).

**Valid mock 1 — new registration, Argentine national, tax-resident:**

```json
{
  "requestType": "Solic",
  "requestReason": "Espontáneo",
  "documentType": "DNI",
  "documentNumber": "30123456",
  "dateOfBirth": "1985-04-12",
  "sex": "F",
  "nationality": "argentino",
  "taxResidencyStatus": "residente",
  "paternalSurname": "GOMEZ",
  "givenNames": "MARIA LAURA",
  "fiscalAddressStreet": "AV. CORRIENTES",
  "fiscalAddressNumber": "1234",
  "fiscalAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "fiscalAddressDistrict": "COMUNA 1",
  "fiscalAddressProvince": "Capital Federal",
  "fiscalAddressPostalCode": "C1043AAJ",
  "realAddressStreet": "AV. CORRIENTES",
  "realAddressNumber": "1234",
  "realAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "realAddressDistrict": "COMUNA 1",
  "realAddressProvince": "Capital Federal",
  "realAddressPostalCode": "C1043AAJ",
  "email": "maria.gomez@example.com.ar",
  "principalActivityDescription": "SERVICIOS DE CONSULTORIA EN INFORMATICA",
  "principalActivityCode": "620100",
  "principalActivityStartDate": "2026-08-01",
  "declarationAcknowledged": true,
  "declarationDate": "2026-08-01",
  "declarationPlace": "Buenos Aires",
  "declarantCapacity": "Titular"
}
```

- `requestType="Solic"` / no `cuit` supplied → `cuitRequiredForModification`'s
  `when` (`requestType equals "modif"`) is not met, so `cuit` is correctly
  **not** required here.
- `nationality="argentino"` (not `"extranjero"`) → `countryOfOriginRequiredForForeignNational`'s
  `when` is not met, so `countryOfOrigin` is correctly **not** required.
- `declarantCapacity="Titular"` (not `"Apoderado/a"`) → `declarantNameRequiredForAttorneyInFact`'s
  `when` is not met, so `declarantName` is correctly **not** required.
  **0 errors.**

**Valid mock 2 — data modification, foreign national via attorney-in-fact,
with economic-activity and social-security rows:**

```json
{
  "requestType": "modif",
  "cuit": "27301234567",
  "requestReason": "Oficio",
  "documentType": "Pasaporte",
  "documentNumber": "AB1234567",
  "dateOfBirth": "1978-11-03",
  "sex": "M",
  "nationality": "extranjero",
  "countryOfOrigin": "Chile",
  "taxResidencyStatus": "residente",
  "residencyType": "Permanente",
  "residencyValidUntil": "2030-01-01",
  "paternalSurname": "SILVA",
  "givenNames": "RODRIGO ANDRES",
  "maternalSurname": "PEREZ",
  "fiscalAddressStreet": "RUTA NACIONAL 3",
  "fiscalAddressNumber": "5670",
  "fiscalAddressLocality": "COMODORO RIVADAVIA",
  "fiscalAddressDistrict": "COMODORO RIVADAVIA",
  "fiscalAddressProvince": "Chubut",
  "fiscalAddressPostalCode": "9000",
  "realAddressStreet": "RUTA NACIONAL 3",
  "realAddressNumber": "5670",
  "realAddressLocality": "COMODORO RIVADAVIA",
  "realAddressDistrict": "COMODORO RIVADAVIA",
  "realAddressProvince": "Chubut",
  "realAddressPostalCode": "9000",
  "phoneType": "Celular",
  "phoneAreaCode": "297",
  "phoneNumber": "4123456",
  "principalActivityDescription": "TRANSPORTE DE CARGA POR CARRETERA",
  "principalActivityCode": "494200",
  "principalActivityStartDate": "2019-03-15",
  "secondaryActivity1Description": "ALQUILER DE MAQUINARIA VIAL",
  "secondaryActivity1Code": "772911",
  "secondaryActivity1StartDate": "2021-06-01",
  "fiscalYearEndMonth": "Diciembre",
  "filerCapacityCode": "Productor/a",
  "taxName1": "IVA",
  "taxCode1": "10",
  "taxRegistrationDate1": "2019-03-15",
  "retiredUnderLaw24241": false,
  "assignedAutonomousCategory": "II",
  "socialSecurityActivity1StartMonthYear": "03/2019",
  "socialSecurityActivity1Description": "TRANSPORTE DE CARGA",
  "socialSecurityActivity1Code": "494200",
  "socialSecurityActivity1EmployeeCount": 2,
  "socialSecurityActivity1SoleProprietorEmployer": true,
  "employerType": "hecho",
  "employerStartDate": "2019-04-01",
  "employeeCount": 2,
  "declarationAcknowledged": true,
  "declarationDate": "2026-07-20",
  "declarationPlace": "Comodoro Rivadavia",
  "declarantCapacity": "Apoderado/a",
  "declarantName": "FERNANDEZ, JORGE ALBERTO"
}
```

- `requestType="modif"` → `cuit` is present (`"27301234567"`, 11 digits)
  → `cuitRequiredForModification` satisfied.
- `nationality="extranjero"` → `countryOfOrigin` is present (`"Chile"`) →
  `countryOfOriginRequiredForForeignNational` satisfied.
- `declarantCapacity="Apoderado/a"` → `declarantName` is present →
  `declarantNameRequiredForAttorneyInFact` satisfied. **0 errors.**

**Negative control 1 — `cuit` absent on a data-modification filing:** same
as valid mock 2 but with `cuit` removed. `cuitRequiredForModification`'s
`when` is met while `requirePresent: ["cuit"]` is not satisfied → **fails
validation**, as expected.

**Negative control 2 — foreign national with no country of origin, and a
malformed `nationality` enum value:** `{ "nationality": "extranjera",
"documentType": "DNI", "documentNumber": "1", "dateOfBirth": "1990-01-01",
"sex": "F", "paternalSurname": "X", "givenNames": "Y",
"fiscalAddressStreet": "A", "fiscalAddressNumber": "1",
"fiscalAddressLocality": "L", "fiscalAddressDistrict": "D",
"fiscalAddressProvince": "Chubut", "fiscalAddressPostalCode": "9000",
"realAddressStreet": "A", "realAddressNumber": "1", "realAddressLocality":
"L", "realAddressDistrict": "D", "realAddressProvince": "Chubut",
"realAddressPostalCode": "9000", "principalActivityDescription": "X",
"principalActivityCode": "1", "principalActivityStartDate": "2020-01-01",
"declarationAcknowledged": true, "declarationDate": "2020-01-01",
"declarationPlace": "X", "declarantCapacity": "Titular" }`. Two problems,
both expected to be caught: (a) `"extranjera"` is not a member of
`nationality`'s `validation.enum` (`["argentino", "extranjero"]`) — fails
enum validation; (b) even setting that aside, `nationality` cannot be
evaluated as `"extranjero"` for the `countryOfOriginRequiredForForeignNational`
rule, so the rule's own `when` would not fire on this malformed value —
illustrating why the enum check must run before (or independently of) the
crossFieldValidation check. **Fails validation.**

**Negative control 3 — declarant signs as attorney-in-fact but `declarantName`
is missing:** same as valid mock 1 but with `"declarantCapacity":
"Apoderado/a"` added and no `declarantName`. `declarantNameRequiredForAttorneyInFact`'s
`when` (`declarantCapacity equals "Apoderado/a"`) is met while
`requirePresent: ["declarantName"]` is not satisfied → **fails
validation**, as expected.

## Tooling run

- `node tools/validate.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-fisicas/1.0.0` → 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json`, now 337 entries (336 → 337).

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this document corrects a prior cycle's
factual error about this exact specimen (see "Candidate selection" above),
carries several structurally-inferred (not source-asserted) `required`
judgment calls, one deliberate divergence from its sibling's row-1-required
precedent (point 6 above), and one disclosed minor label ambiguity (the
stray "Mes/año" text fragment near `mat prof seg soc`). Re-check the
source, confirm no newer specimen has replaced this one (`Last-Modified`
was already August 2022 as of this session), and re-verify Argentina's
remaining open follow-on candidate (`08M.pdf`, the DNRPA motovehículo
Solicitud Tipo 08 variant) on or before that date and on any `source.url`
change.
