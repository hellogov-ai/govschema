# Verification record — ar/afip/inscripcion-cuit-personas-juridicas@1.0.0

## Candidate selection

This document opens Argentina as GovSchema's 32nd jurisdiction, via its
Business Formation vertical. The candidate is AFIP (Administración Federal
de Ingresos Públicos) Formulario 460/J, "Solicitud de Inscripción — Personas
Jurídicas" — the standard interactive PDF a legal entity (a company,
association, foundation, cooperative, or similar) uses to request a fresh
CUIT (Clave Única de Identificación Tributaria, Argentina's unique tax
identifier) registration, or to notify AFIP of a modification to previously
registered data. AFIP is Argentina's federal tax authority and the natural
first Business Formation candidate for a new jurisdiction in this registry,
matching the pattern already established for other jurisdictions whose first
vertical is a tax-authority-administered entity registration (e.g. Iceland's
`is/skatturinn/business-employer-vat-registration`, Sweden's
`se/bolagsverket/aktiebolag-formation`).

This brief arrived with a fully pre-screened source (byte count, SHA-256,
page/widget/field counts, and a detailed field-by-field mapping already
worked out). Per this registry's standing practice, none of that was taken
on trust: every fact below was independently re-derived from a fresh fetch
and a fresh `pdfjs-dist` extraction in this session before being used to
author the schema.

## Source

- **Primary:**
  `https://serviciosweb.afip.gob.ar/genericos/formularios/pdf/interactivos/f460J.pdf`
  — confirmed by direct `curl` fetch with a browser User-Agent: HTTP 200,
  `content-type: application/pdf`, exactly **224,536 bytes**
  (SHA-256 `20acb44b3bcf8bbcd14d2c08b2da16c93c71ad349826b6f685cc12eca27205f8`)
  — matching the byte count and hash disclosed in this cycle's brief exactly.
  Hosted directly in AFIP's own "genéricos/formularios/pdf/interactivos"
  interactive-forms library.
- **Authority page:** `https://www.afip.gob.ar/` — AFIP's own homepage, HTTP
  200.
- A registry-wide search found no existing schema modelling any Argentine
  process under jurisdiction `AR` prior to this document; Argentina is a
  genuinely new jurisdiction for this registry.

## Extraction technique

Fetched the PDF directly and processed it with `pdfjs-dist` v3.11.174 (the
CJS build under `legacy/build/pdf.js`, loaded via `createRequire`, per this
registry's established technique for AcroForm PDFs):

- `getDocument(...).promise` then `.numPages` → **4**.
- `doc.getFieldObjects()` → **177** keys (unique field names).
- `page.getAnnotations()` per page, filtered to `subtype === "Widget"` →
  **73** (page 1), **104** (page 2), **73** (page 3), **101** (page 4) —
  **351 total widgets**, confirming the brief's disclosed counts exactly.

### The original/duplicate structure, re-derived independently

The brief disclosed that this PDF prints the same 2-page form twice. Rather
than trust that framing, this session re-derived the exact structure from
the raw per-page field-name sets and the `getFieldObjects()` per-kid `page`
indices:

- Every one of page 1's 73 field names reappears identically on page 3,
  **except** `inscripcion`/`modificacion` (page 1) vs. `inscripciond`/
  `modificaciond` (page 3) — the transaction-type header checkboxes.
- `getFieldObjects()` shows `inscripcion`/`modificacion` each carry **three**
  widget kids, on pages 1, 2, **and 4** (not page 3) — i.e., the "real"
  header checkboxes are shared/synced across pages 1, 2, and 4 by field-name
  identity (the normal AcroForm same-name-syncs-value mechanism), while page
  3 alone carries a separately-named, non-editable pair
  (`inscripciond`/`modificaciond`) with a JS `Action` on each, evidently kept
  in sync with the real fields by script rather than by shared field name.
  This is a real, minor asymmetry in AFIP's own form design, not a
  transcription error in this document.
- Every one of page 2's 104 field names reappears identically on page 4,
  **except three**: `suscribe`, `caracter`, and `"lugar y fecha"` — the
  entire Declaración Jurada (sworn declaration) signature block. These three
  fields exist **only** on page 2; page 4 has no corresponding widgets at
  all. Cross-checked against the page text: page 4 (`getTextContent()`)
  prints "- DUPLICADO: acuse de recibo para el Contribuyente" (receipt
  acknowledgement for the taxpayer) followed by a disclaimer that the receipt
  stamp "... NO SIGNIFICA QUE LA ADMINISTRACIÓN FEDERAL HAYA CONFORMADO LO
  QUE SE ..." (does not mean the Federal Administration has agreed with what
  is [declared]) — consistent with the duplicate/receipt copy genuinely not
  needing its own separate signature fields, since it is a stamped
  acknowledgement of the original filing, not a second original.
- Net: 177 unique field names = 175 real independent inputs (the union of
  page 1/3's 73 and page 2/4's 104, minus the 2-for-2 header-checkbox
  rename on page 3, plus the 3 signature fields that exist only once) + the
  2 non-editable JS-mirrored checkboxes (`inscripciond`/`modificaciond`).
  This document models the **175 real fields once** (i.e. one logical page-1
  + one logical page-2 worth of content), not the 351 widget instances and
  not the 2 non-editable mirrors.
- One correction to the brief's own framing: the brief located the
  Declaración Jurada signature block as "page 1 bottom." This session's own
  `getAnnotations()` call places `suscribe`/`caracter`/`"lugar y fecha"`
  squarely on **PDF page 2** (confirmed both by the per-page widget scan and
  by `getFieldObjects()`'s kid `page` index, `1` zero-indexed). The
  left-margin vertical text "DECLARACIÓN JURADA" that appears on page 1 near
  y≈243 is part of a repeating section-index running down the page margin
  (alongside "- ORIGINAL:"/"para la AFIP" at the same x-position on both
  pages 1 and 2) — a navigational artifact, not evidence of a second,
  page-1 declaration section. No field of that name exists on page 1 in this
  session's own extraction.

All page text was additionally extracted with `getTextContent()` (per-page,
with each text run's x/y position) and cross-walked against field rects to
confirm every label-to-field association below.

## Field model

**175 real underlying AcroForm fields → 152 GovSchema fields.** The
reduction comes entirely from combining genuinely split source inputs into
one logical GovSchema field, in the same style this registry uses elsewhere
for digit-box IDs and paired checkboxes:

- 11 single-digit boxes (`CUIT1`..`CUIT11`) → `existingCuit` (one 11-digit
  string, `required: false`, `requiredWhen` `isDataModificationRequest`
  equals `true` — a modification filing necessarily references an existing
  CUIT; a fresh registration has none yet).
- 3 single-digit boxes (`dependencia1`..`dependencia3`) → `afipOfficeCode`.
- 3 boxes (`dd`/`mm`/`aaaa`) → `articlesOfIncorporationDate` (`type: date`).
- 2 boxes (`mesan`/`anio`) → `employerRegistrationStartMonthYear` — kept as a
  pattern-constrained string (`^(0[1-9]|1[0-2])/[0-9]{4}$`), not `type:
  date`, since the source only captures month/year and GovSchema's `date`
  type (§6.2) requires a full RFC 3339 date.
- 5 single-digit boxes (`pers1`..`pers5`) → `numberOfEmployees` (integer).
- Each Sí/No checkbox pair in the 4-row officers table (`si1`/`no1` ...
  `si4`/`no4`) → a single `officerNResidentInCountry` boolean, the same
  binary-question convention used elsewhere in this registry (e.g. the
  Schengen visa schema's `residesInOtherCountry`) — deliberately **not**
  placed in an `exclusivityGroups` entry, since this is a genuine yes/no
  question, not a multi-option selector.

Two checkbox pairs are modelled as independent optional booleans under an
`exclusivityGroups` entry each, since they are independent widgets (not a
native PDF radio group) but the source presents them as one single-answer
question, per this registry's established convention (see the Schengen visa
schema's `fundedBy*` precedent):

- `requestTypeSelection`: `isNewRegistrationRequest` /
  `isDataModificationRequest` ("SOLICITUD DE INSCRIPCIÓN" /
  "MODIFICACIÓN DE DATOS").
- `motivoDelTramiteSelection`: `isSpontaneousFiling` /
  `isOfficialOrderFiling` ("ESPONTÁNEO" / "OFICIO").

The 28-checkbox "FORMA JURÍDICA" grid is modelled the same way, as 28
independent optional booleans (`legalForm*`) in one `exclusivityGroups`
entry (`legalFormSelection`) — confirmed via `getAnnotations()` that all 28
are independent `Btn`/checkbox widgets with no native radio grouping.

Every other source field maps 1:1 to one GovSchema field (the two 12-field
address blocks — fiscal and legal domicile — the economic-activity rows, the
registered-taxes and withholding/collection-regime tables, and the officers
table's name/tax-ID/role columns).

### Disclosed scope decisions

**Legal-form checkbox `241` — confirmed unlabeled, not invented.** The
"FORMA JURÍDICA" grid's second row prints 14 checkboxes (codes `132` through
`241`), each with a multi-line stacked label above it (e.g. "FIDEICOMISO
FINANCIERO" above code `240`) — except code `241`. This session's own
`getTextContent()` extraction of the header block directly above that column
(x≈545-585, y≈487-515 in PDF points) returned no text at all near that
x-range in that row, in contrast to every one of the other 27 checkboxes in
the grid, each of which has a confirmed label. This is modelled as
`legalFormOther241`, an honestly-generic name, with no label invented; the
field's own `description` states this finding. This may be a genuinely
blank/reserved catch-all column in AFIP's own form design — the same
"disclose, don't fabricate" treatment this registry has applied to prior
confirmed source artifacts (e.g. `is/skatturinn`'s box-numbering
discrepancy, `at/bmi`'s font-rendering artifact).

**`jurisdiccion` — confirmed as one combined field, not two.** The source
prints two stacked labels, "JURISDICCIÓN:" and "LOCALIDAD:", on the same
line. This session's own extraction of the underlying field's rect
(`[177.55, 578.80, 357.56, 594.83]`) shows exactly one AcroForm field
(`jurisdiccion`) spanning from just after "LOCALIDAD:" to just before the
next label ("PROVINCIA:", whose own field `pcia` begins at x≈412). No second
field for "Localidad" exists anywhere in this document's 175-field
extraction. Modelled as one combined field, `jurisdictionAndLocality`, with
the two-labels-one-blank structure disclosed in its `description`.

**`impuestos`/`caracter3` — two blanks under one header, kept as two
independent free-text fields.** The row header reads "IMPUESTOS CARÁCTER :",
with footnote (3) attached specifically to "CARÁCTER" (the footnote marker
sits directly above that word, not above "IMPUESTOS"). This session
confirmed via field rects that `impuestos` (x≈126-317) sits under the
"IMPUESTOS" half of the header and `caracter3` (x≈370-579) sits under the
"CARÁCTER" half — two distinct blanks, not one field split across two
widgets. Modelled as `taxCharacterSubject` (which tax(es) the declaration
concerns) and `taxCharacterRole` (the character/role itself, per footnote
(3)'s illustrative list: "Importador, Productor, Comercializador de
Combustibles Líquidos-Ley 23.966 Título III Cap. I)-Bs. Personales: Resp. de
Deuda Ajena-Resp. Sustitutos-Administrador Fiduciario. Ganancias y Gcia.
Mínima Presunta: Resp. de Deuda Ajena-Administrador Fiduciario-Sociedad
Gerente."). Footnote (3) is quoted in `taxCharacterRole`'s `description` for
reference, not encoded as a fixed `enum`, since the underlying AcroForm field
is unconstrained free text and it cannot be confirmed the field is meant to
hold exactly one verbatim token from that list.

**`nationalCapitalPercentage`/`foreignCapitalPercentage` — no sum-to-100
rule encoded.** The source prints both under one shared header,
"PORCENTAJE DE CAPITAL:", which reads as though the two figures describe a
single capital-ownership split (national vs. foreign) that should sum to
100. However, the form prints no explicit statement that they must sum to
100, and — independent of that judgment call — GovSchema v0.3's
`crossFieldValidation` grammar (§8.3) supports only direct field-to-field
`compare` operators (`equals`/`notEquals`/`greaterThan[OrEqual]`/
`lessThan[OrEqual]`), none of which can express an arithmetic sum
constraint against two fields. So even a confidently-inferred sum-to-100
rule could not be encoded as a `crossFieldValidation` rule under the current
spec. Both fields are modelled as independent optional integers
(`minimum: 0`, `maximum: 100` each), with this reasoning disclosed in each
field's `description` rather than asserted as an enforced rule.

**Secondary economic activity rows — no `requiredWhen` on code/date.** The
brief suggested gating each row's code/start-date fields with `requiredWhen`
keyed to the row's own (optional) description field being filled in. This
was deliberately **not** implemented: GovSchema's `Condition` grammar
(GSP-0013, §8.1) has no field-presence operator, and gating a `requiredWhen`
on `notEquals: ""` against an optional string field is a known anti-pattern
in this registry (an *absent* field evaluates `undefined !== ""` as `true`
under a natural leaf-compare evaluator, so the gate misfires as required for
every applicant, not just the ones who filled in the row) — previously
caught by review in this registry and recorded as a standing lesson. Each
`secondaryActivityNCode`/`secondaryActivityNStartDate` field is therefore
left unconditionally optional, with the row-together expectation stated in
its own `description` in prose only, not as a machine-checkable rule.

**Declaration and signature.** The declaration paragraph preceding the
signature line ("El que suscribe Don ... afirma que los datos consignados en
este formulario son correctos y completos y que ha confeccionado esta
declaración jurada sin omitir ni falsear dato alguno que deba contener,
siendo fiel expresión de la verdad.") is short enough to quote verbatim and
is modelled as a `documents[]` attestation entry (`dataAccuracyDeclaration`).
A second `documents[]` entry (`signatureAndSeal`) models the "Firma y Sello"
line itself as the required signing mechanism. The adjacent "Reservado para
certificación de firma:" box on the same line is an AFIP-administrative
signature-certification stamp (filled in by AFIP staff, not the applicant)
and is **not** modelled as an input.

## Mock conformance test run

Two scenarios were built under
`conformance/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0/` and checked
against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]`/`exclusivityGroups` grammar with a disposable checker script
(`/tmp/gov2169-ar-afip/check_conformance.mjs`, not committed — same technique
as this registry's other recent AT/JP cycles):

- **`registration-nueva-sociedad-anonima.json`**: a fresh CUIT registration
  for a newly formed Sociedad Anónima ("AgroTech Pampa S.A."), filed
  spontaneously, one main economic activity, no secondary activities, no
  pre-existing tax/withholding registrations, no employer registration yet,
  legal form `Sociedad Anónima`. **152 fields applicable, 0 errors**; both
  required `documents[]` entries provided.
- **`modificacion-srl-existing-cuit.json`**: a data-modification filing (by
  administrative order) for an already-registered Sociedad de
  Responsabilidad Limitada ("Distribuidora del Sur S.R.L."), referencing its
  existing CUIT, updating both addresses, adding a secondary activity, one
  registered tax, one withholding/collection regime, employer registration
  details, and two officers (one resident in the country, one not). **152
  fields applicable, 0 errors**.
- **Ten mutation/negative controls**, each derived from a base scenario with
  exactly one defect introduced, each correctly raising exactly one error:
  1. Removing required `entityLegalName` → `missing-required`.
  2. Removing the required `signatureAndSeal` document →
     `missing-required-document`.
  3. Setting `existingCuit` to a value containing a letter (violates
     `pattern: ^[0-9]{11}$`) → `pattern-violation`.
  4. Setting `nationalCapitalPercentage` to `150` (violates
     `maximum: 100`) → `range-violation`.
  5. Removing `existingCuit` from the modification-request scenario while
     `isDataModificationRequest` stays `true` → `missing-required`
     (confirming the `requiredWhen` rule fires).
  6. Setting both `isNewRegistrationRequest` and
     `isDataModificationRequest` to `true` (also supplying a valid
     `existingCuit`, to isolate this defect from control 5's rule) →
     `exclusivity-violation` on `requestTypeSelection`.
  7. Setting a second `legalForm*` boolean to `true` alongside the base
     scenario's choice → `exclusivity-violation` on `legalFormSelection`
     (confirming the 28-member group actually fires).
  8. Setting both `isSpontaneousFiling` and `isOfficialOrderFiling` to
     `true` → `exclusivity-violation` on `motivoDelTramiteSelection`.
  9. Removing the required `dataAccuracyDeclaration` document →
     `missing-required-document`.
  10. Setting `foreignCapitalPercentage` to `-5` (violates `minimum: 0`) →
      `range-violation`.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass), and
against
`node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0`
(0 warnings, 3 URLs checked, 0 allowlisted, all clear).

## Pre-PR re-verification

Immediately before finalizing this record, the primary source PDF was
re-fetched live a second time in this same session, with a realistic browser
User-Agent: HTTP 200, `content-type: application/pdf`, exactly 224,536
bytes, **SHA-256-identical** to the first fetch
(`20acb44b3bcf8bbcd14d2c08b2da16c93c71ad349826b6f685cc12eca27205f8`). The
authority URL was re-checked live and returns HTTP 200.
`node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0`
reports all clear (0 warnings) on this same re-verification pass, and
`node tools/validate.mjs`/`node tools/validate-ajv.mjs` both still pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm with AFIP (e.g. via its own help desk or a registered tax
professional) whether Formulario 460/J's live web-based intake channel
(AFIP now runs much of its taxpayer-facing intake through its "Sistema
Registral" web application rather than a mailed/uploaded PDF) has
superseded this interactive-PDF specimen as the primary way this process is
actually filed, and, if so, whether the live web form's field set matches
this PDF's field set exactly; and independently confirm the "FORMA JURÍDICA"
checkbox `241`'s blank-label finding against a second, independently-hosted
copy of the same form (e.g. a provincial AFIP office mirror), to rule out a
one-off rendering artifact in this specific PDF revision.

## Scope and jurisdiction notes

Argentina is GovSchema's **32nd jurisdiction**, opened via this document
with **1 of its 6 verticals** (Business Formation). Its remaining five
(Passport, DMV, Taxes, Visa, National ID) are open, unscreened backlog
candidates for a future cycle — none was screened as part of this session,
since this brief scoped narrowly to the one pre-identified Business
Formation candidate.
