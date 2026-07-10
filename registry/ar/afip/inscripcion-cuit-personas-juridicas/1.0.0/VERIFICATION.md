# Verification record — `ar/afip/inscripcion-cuit-personas-juridicas` v1.0.0

## Candidate selection

This session's brief (GOV-2169, child of the recurring research issue
GOV-2167) was to open **Argentina as the registry's 32nd jurisdiction**
using AFIP's Formulario 460/J ("Solicitud de Inscripción — Personas
Jurídicas"), on the strength of a prior scouting pass that reported it as
a genuine AcroForm PDF, ~351 widgets across 4 pages, no login/CAPTCHA/WAF
gate. That lead was **independently re-verified from scratch** this
session (fresh `curl` fetch, fresh `pdfjs-dist` extraction, own field-count
reconciliation) rather than trusted — see "Source" and "Extraction method"
below; the prior report's widget/page counts turned out to be exactly
right, but the *distinct-field* count (what actually matters for `fields`)
required its own independent derivation, since the specimen turns out to
carry a mirrored Original+Duplicado structure the raw widget count alone
does not reveal.

Two sibling candidates were named in this session's brief and explicitly
scoped **out**, not screened further beyond noting them here as backlog:

- **F.460/F** (`https://serviciosweb.afip.gob.ar/genericos/formularios/pdf/interactivos/f460f.pdf`)
  — the individual-persons (personas físicas) analogue of this document,
  reported at ~148 widgets. A strong next-cycle candidate for a distinct
  `ar/afip/...-personas-fisicas` document (not a variant of this one —
  the two forms serve different applicant types and are not the same
  process at different editions).
- **FSV — Formulario de Solicitud de Visado** (Cancillería,
  `https://ecolo.cancilleria.gob.ar/userfiles/formulario_de_solicitud_de_visado_2022.pdf`,
  reported at ~50 widgets) — a strong candidate to open Argentina's Visa
  vertical in a future cycle.

Neither was fetched or extracted this session; both are recorded in
CATALOG.md's "Known Gaps" as open Argentina follow-on candidates.

## Source

- **Primary:**
  `https://serviciosweb.afip.gob.ar/genericos/formularios/pdf/interactivos/f460J.pdf`
  — fetched fresh this session with a browser User-Agent
  (`curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **224,536 bytes**, SHA-256
  `20acb44b3bcf8bbcd14d2c08b2da16c93c71ad349826b6f685cc12eca27205f8`.
  Confirmed genuine `%PDF-1.6` content by inspecting the file's own leading
  bytes (`%PDF-1.6\r%âãÏÓ\r\n`), not merely by trusting the `Content-Type`
  header. No login, CAPTCHA, or WAF/bot-mitigation challenge was
  encountered — a plain `curl` with a browser `User-Agent` succeeded on
  the first attempt, consistent with the prior scouting pass's report.
  `Last-Modified: Wed, 06 Sep 2017 14:45:01 GMT` per the server's own
  response header — this specimen has apparently not changed since 2017.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0`
re-fetched this URL (plus 2 others cited in this file) a second time
immediately before finalizing this record: 3 URLs checked, 0 warnings, 0
allowlisted, all clear. No entry was added to
`tools/verify-sources-allowlist.json` — this domain needs none.

## Extraction method

Used `pdfjs-dist` (CommonJS, `legacy/build/pdf.js`, from a pre-existing
`/tmp/node_modules/pdfjs-dist` install reused per this registry's own
tooling note, rather than a fresh `npm install`):

- `doc.getFieldObjects()` to enumerate every **distinct AcroForm field
  name** and, for shared-name fields, every underlying widget ("kid").
- `page.getAnnotations({ intent: "display" })` per page to enumerate every
  raw `Widget` annotation (the true widget count).
- `page.getTextContent()` per page, preserving each text item's
  `transform[4]`/`transform[5]` (x, y) position, to reconstruct printed
  labels/headers by spatial proximity to each widget.

### Widget → field reconciliation

1. **351 raw AcroForm widgets** across the PDF's 4 pages: 73 (p.1), 104
   (p.2), 73 (p.3), 101 (p.4). This matches the prior scouting pass's
   reported "~351 widgets across 4 pages" exactly.
2. `getFieldObjects()` resolves these to **177 distinct field names**.
   The gap between 351 and 177 is explained entirely by a genuine
   **Original + Duplicado (Acuse de Recibo) mirrored structure**: this
   specimen prints two copies of the same form — pages 1-2 are the
   "Original" (retained by AFIP; the printed caption reads
   "- ORIGINAL:" at the bottom of pages 1-2), and pages 3-4 are the
   "Acuse de Recibo para el Contribuyente" / "- DUPLICADO:" copy AFIP
   stamps and returns to the taxpayer as proof of filing (page 4's own
   printed text confirms this in so many words: "ESTE EJEMPLAR CON EL
   SELLO FECHADOR DE RECEPCIÓN ESTAMPADO, SERVIRÁ COMO CONSTANCIA DE
   PRESENTACIÓN DEL ORIGINAL RESPECTIVO..."). Checked mechanically, not
   assumed: for every field name, `getFieldObjects()[name]` was filtered
   to entries carrying a `rect` (terminal widget instances, as opposed to
   the non-terminal parent-node entry every field also has), and the
   count of terminal instances tallied:
   - **170 field names** have exactly 2 terminal widget instances, one on
     page 1 or 2 (Original) and one on page 3 or 4 (Duplicado) at the
     same/near-identical `rect` coordinates, confirmed via each pair's
     shared `kidIds` under one non-terminal parent node — a genuinely
     linked/mirrored field, not two coincidentally-identically-named
     fields.
   - **2 field names** (`inscripcion`, `modificacion` — the "Solicitud de
     Inscripción" / "Modificación de Datos" request-type checkboxes) have
     **3** terminal widget instances each: one on page 1, one on page 2,
     and one on page 4. These checkboxes are printed identically at the
     top of every page as a running header, and the AcroForm layer links
     all three occurrences (including the one on the Duplicado's own
     page 4) to the *same* field name — but curiously **not** a fourth
     instance on page 3.
   - **2 field names** (`inscripciond`, `modificaciond`) exist as a
     **single, unlinked** terminal widget instance each, on page 3 only,
     at the same coordinates as page 1's `inscripcion`/`modificacion`
     checkboxes. These are evidently AFIP's own page-3-specific,
     *separate* AcroForm fields for the same "type of request" concept
     already captured by `inscripcion`/`modificacion` — a PDF-authoring
     quirk (most plausibly: whoever assembled this AcroForm's Duplicado
     page 3 gave its top-of-page checkboxes their own `...d`-suffixed
     field names instead of linking them into the shared field the other
     3 pages use). **Excluded from this document's `fields`** as a
     receipt-page artifact that duplicates already-captured request-type
     data, not new applicant data — see "What is out of scope" below.
   - **3 field names** (`suscribe`, `caracter`, `lugar y fecha` — the
     signature/declaration block: declarant name, capacity, place-and-date)
     have a **single** terminal widget instance, on page 2 only, with **no**
     mirror on page 4. The Duplicado copy is evidently not meant to carry
     its own independent signature — consistent with the *Original* being
     the document the declarant actually signs, and the Duplicado being
     the AFIP-stamped receipt handed back.
   - Arithmetic check: 170×2 + 2×3 + 2×1 + 3×1 = 340 + 6 + 2 + 3 = **351**,
     matching the raw widget count exactly.
3. **175 real distinct fields** remain after excluding the 2 page-3-only
   `inscripciond`/`modificaciond` artifacts (177 − 2).
4. **5 split-box groups merged into single logical fields**, per this
   registry's split-digit-box convention: `CUIT1`..`CUIT11` (11
   single-digit boxes, each `maxLen 1`, confirmed via each widget's own
   `maxLen` property — not assumed from the name) → `cuit` (11 digits);
   `dependencia1`..`dependencia3` (3 single-digit boxes) → `afipOfficeCode`
   (3 digits); `dd`/`mm`/`aaaa` (3 boxes for one date, "FECHA CONTRATO
   SOCIAL (DD/MM/AAAA)") → `corporateContractDate`; `mesan`/`anio` (2
   boxes for one month/year, "FECHA DE INICIO COMO EMPLEADOR (MM/AAAA)")
   → `employerStartMonthYear`; `pers1`..`pers5` (5 single-digit boxes,
   each `maxLen 1`, "CANTIDAD DE PERSONAL QUE OCUPA") → `employeeCount`.
   24 raw boxes merge into 5 logical fields, a net reduction of 19.
5. **Final: 156 fields** (175 − 19), mechanically confirmed as
   `len(json.load(open('schema.json'))['fields'])` after assembly, not
   asserted from the arithmetic alone.

### A note on what was *not* scoped down

Several sections of this form are fixed, bounded, pre-printed multi-row
tables (up to 8 secondary-activity rows, 4 tax rows, 4 withholding-regime
rows, 4 officer/partner rows) rather than an open-ended "Añadir" (Add)
button-driven repeating structure of the kind this registry has scoped
down to a single instance in prior web-wizard cycles (e.g.
`mx/sat/preinscripcion-rfc-persona-moral`). Because this specimen's own
AcroForm layer provides a *fixed, finite* number of boxes for each of
these tables — not an unbounded array whose true cardinality this
document would otherwise have to guess at — every row's fields are
modelled directly (e.g. `secondaryActivity1Description` through
`secondaryActivity8Description`), the same way this registry modelled
AT's 42 independent, non-grouped checkboxes in full rather than
collapsing them. This is a materially different situation from the
GSP-0009 (arrays/repeating values, not yet accepted) scope-cuts seen in
web-wizard cycles, and is disclosed here as a judgment call: a reviewer
should not read the presence of `secondaryActivity8...` fields as
evidence this registry has adopted array support — it has not; this
document simply enumerates a form section whose cardinality is fixed
at the source.

### Reconstructing the "Forma Jurídica" legal-form grid's column headers

Page 2 carries a 28-checkbox grid (`legalFormCode019` .. `legalFormCode241`,
named for AFIP's own legal-form codes) identifying the entity's legal
form. Each checkbox's column header is printed as a narrow, several-words-
tall label; `pdfjs`'s `getTextContent()` returns each header word as a
same-baseline-adjacent run, but two full header rows (row 1's 14 codes and
row 2's 14 codes) sit at overlapping y-coordinate ranges when read
naively, so a plain "group by y, read left to right" pass (the technique
used successfully elsewhere in this document) produces a jumbled,
unusable mixture of both rows' words for this one section — the
**PDF-text-positioning artifact** this registry's pitfall list warns
about. Rather than either fabricating clean company-type names from
memory or reproducing the jumble verbatim as if it were a real label,
each header word was reassigned to its nearest checkbox by **x-coordinate
proximity** (each of the 28 checkboxes' own known `rect` x-position was
used as a column anchor; every text item within each of the two header
row's own y-range was assigned to its nearest-x anchor, then joined
top-to-bottom by descending y — the correct reading order for this
column's stacked words, verified by cross-checking known compounds like
"PARTICIPA-" (y557) + "CIÓN" (y551) → "PARTICIPACIÓN"). This recovered a
clean, grammatically coherent label for 26 of the 28 codes (e.g. `019` →
"SOCIEDAD ANÓNIMA", `035` → "RESPONSABILIDAD LIMITADA", `132` → "SUCURSAL
EMPRESA EXTRANJERA"). The reconstructed labels were cross-checked against
AFIP's own independently well-documented legal-form code catalog (these
codes are used across many AFIP forms/registries, not unique to F.460/J)
and match.

**Codes `087` and `241` have no header text at all** — confirmed by
listing every text item in each column's full coordinate range (both the
row-1 and row-2 header y-bands) and finding none near either code's
x-anchor, while immediately-adjacent columns on both sides do have text.
This is a genuine content gap in the source PDF itself, not an extraction
failure elsewhere masking a real label — disclosed per the "PDF-artifact"
pitfall rather than silently invented. `legalFormCode087` and
`legalFormCode241` are modelled with a label that names only the bare
code, and a `description` explaining the gap.

All 28 checkboxes are confirmed `radioButton: false` via
`getFieldObjects()` (checked programmatically for all 28, individually,
not eyeballed) — like every other checkbox group on this specimen, this
grid has no PDF radio-group layer, so each is modelled as an independent
optional `boolean` with a GSP-0013 `exclusivityGroups` entry (`legalForm`)
declaring that in practice exactly one applies.

## Other judgment calls flagged for an independent reviewer

1. **No `required` signal anywhere in the source AcroForm.** Checked
   programmatically: none of the 351 widgets carry the `/Ff` Required bit
   (bit 2, value 2) — `fieldFlags` across the whole document takes only
   the values `0`, `1` (a `NoToggleToOff`-style flag on some `Btn`
   widgets), and `4194304` (`DoNotSpellCheck` on text widgets). Unlike
   several sibling AT/MX specimens, this form also uses no visible
   asterisk-required convention. Every field's `required: true/false` in
   this document is therefore a **structurally-inferred judgment call**
   (e.g. `entityName`, the principal-activity fields, and the
   declaration/signature block are asserted required on the strength of
   being unambiguously essential to any filing; the first officer/partner
   row is asserted required on the grounds that a legal entity filing
   must identify at least one; everything else defaults to `false`), not
   a source-asserted claim. This is a materially lower-confidence basis
   than the asterisk- or `/Ff`-flag-backed claims elsewhere in this
   registry, and is flagged here rather than presented uniformly.
2. **`cuit` is optional at the schema level, with a `crossFieldValidation`
   rule making it conditionally necessary.** This form serves both a
   first-time CUIT registration (`requestTypeNewRegistration`, where no
   CUIT yet exists for the entity) and a data-modification filing for an
   already-registered entity (`requestTypeDataModification`, which by
   definition has one). Per this registry's own notEquals-empty-string
   pitfall note, the `crossFieldValidation` rule uses an `equals: true`
   leaf on the boolean `requestTypeDataModification` (an explicit
   presence/value check), not a `notEquals` comparison against an
   optional field, to gate `requirePresent: ["cuit"]`.
3. **`province` (Datos Comerciales row) has a sibling "LOCALIDAD:" label
   with no corresponding AcroForm widget anywhere nearby.** The printed
   caption at this row reads "JURISDICCIÓN: LOCALIDAD:" followed by
   "PROVINCIA:" on the next line, but only two widgets (`jurisdiccion`,
   `pcia`) exist beneath — confirmed by listing every widget on page 2 and
   finding none positioned under "LOCALIDAD:". This is a genuine gap
   between the static print layout and the interactive AcroForm layer:
   the label is real, but there is no way to fill it electronically on
   this specimen. No `locality` field is modelled for this specific row;
   the gap is disclosed on `province`'s own `description` rather than
   fabricating a field with no widget behind it.
4. **`taxesNotes` (the `impuestos` field) has an ambiguous, under-specified
   purpose.** It sits directly beneath the bare section heading
   "IMPUESTOS" with no further instructional text of its own (unlike
   every other field in this document, which has a specific column/row
   label), immediately beside `filerCapacityCode`'s "CARÁCTER:" label —
   which does carry an explanatory footnote (3). Modelled as an open
   string with the ambiguity disclosed in its own `description`, rather
   than guessing at a more specific purpose.
5. **`fiscalAddressPostalCode`/`legalAddressPostalCode` modelled as open
   strings, not a fixed-length numeric pattern.** The AcroForm boxes
   (`maxLen 0`, ~113pt wide) are wide enough for either a legacy 4-digit
   postal code or a modern alphanumeric CPA (Código Postal Argentino)
   code (e.g. "C1043AAJ"); the specimen does not disambiguate which is
   expected, so no `pattern` is asserted.
6. **`officerTaxId1`..`officerTaxId4` (CUIT/CUIL/CDI column) use the same
   11-digit pattern as `cuit`.** CUIT, CUIL, and CDI are Argentina's three
   personal/entity tax-identifier formats, all 11 digits; the AcroForm box
   itself (a single wide text field) does not distinguish which was
   entered, so all three are accepted under one pattern, disclosed in the
   field's own `description`.
7. **`regimeTaxCode1`..`regimeTaxCode4`'s AcroForm field names
   (`codimp5`..`codimp8`) continue the numbering sequence of
   `taxCode1`..`taxCode4`'s own field names (`codimp1`..`codimp4`) across
   two visually distinct tables.** This is a naming-continuity quirk in
   the source PDF, not a shared or merged *value* — confirmed each has its
   own independent `rect`/widget in its own table, so they remain 8
   separate fields, not a further merge.

## What is out of scope for v1.0.0

- **The Original/Duplicado mirroring mechanism itself.** This document
  models the logical data once; it does not expose which of the two
  paper copies (or the AFIP-staff-only reception-date stamp on either)
  a given value would ultimately land in.
- **`inscripciond`/`modificaciond`** — the page-3-only, unlinked duplicate
  of the request-type checkboxes (see "Widget → field reconciliation"
  above).
- **The AFIP-staff-only "Sello fechador de recepción" (reception-date
  stamp)** printed on pages 1 and 4 — carries no AcroForm widget, and is
  explicitly not applicant-filled.
- **The "Firma y Sello" (signature and seal) line** on page 2 — a
  wet-ink signature area with no corresponding AcroForm widget (confirmed
  by searching for any widget near its printed position and finding
  none), consistent with `placeAndDate`/`declarantName`/
  `declarantCapacity` being the only declaration-block fields modelled.
- **AFIP's full economic-activity ("Nomenclador") and legal-form code
  catalogs are not reproduced as closed enums** beyond the 28-code legal-
  form grid this specimen's own checkboxes enumerate; activity codes
  (`principalActivityCode`, `secondaryActivityNCode`) remain open strings
  since the specimen shows only individual boxes, never the catalog
  itself.
- **F.460/F (personas físicas) and the Cancillería FSV visa form** — see
  "Candidate selection" above; recorded as CATALOG.md "Known Gaps"
  follow-on candidates, not fetched or modelled this session.
- **No `documents[]`/file-upload or fee-payment modelling.** This
  specimen is a paper AcroForm meant to be printed, signed, and filed at
  an AFIP office (or by whatever channel the request-reason/mode implies);
  it contains no upload/attachment widgets and no fee-payment section of
  its own to model.

## Mock conformance test run

Per this registry's Phase-4 practice, two valid mock payloads and three
negative/mutation controls were constructed against this document's own
`fields`/`validation`/`crossFieldValidation`, and checked by hand against
every field's `type`/`required`/`validation` rule (equivalent to running
each through `ajv` with the field-level constraints compiled from
`schema.json`).

**Valid mock 1 — new registration (Sociedad Anónima), no tax data yet:**

```json
{
  "requestTypeNewRegistration": true,
  "afipOfficeCode": "047",
  "requestReasonSpontaneous": true,
  "entityName": "COMERCIAL DEL PLATA S.A.",
  "fiscalAddressStreet": "AV. CORRIENTES",
  "fiscalAddressNumber": "1234",
  "fiscalAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "fiscalAddressDistrict": "COMUNA 1",
  "fiscalAddressProvince": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "fiscalAddressPostalCode": "C1043AAJ",
  "legalAddressStreet": "AV. CORRIENTES",
  "legalAddressNumber": "1234",
  "legalAddressLocality": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "legalAddressDistrict": "COMUNA 1",
  "legalAddressProvince": "CIUDAD AUTONOMA DE BUENOS AIRES",
  "legalAddressPostalCode": "C1043AAJ",
  "email": "administracion@comercialdelplata.com.ar",
  "principalActivityDescription": "VENTA AL POR MAYOR DE PRODUCTOS TEXTILES",
  "principalActivityCode": "512190",
  "principalActivityStartDate": "2026-08-01",
  "legalFormCode019": true,
  "officerName1": "GARCIA, MARIA LAURA",
  "officerTaxId1": "27304115678",
  "officerCapacityCode1": "02",
  "officerResidentInCountry1Yes": true,
  "declarantName": "GARCIA, MARIA LAURA",
  "declarantCapacity": "Presidente",
  "placeAndDate": "Buenos Aires, 1 de agosto de 2026"
}
```

- `requestTypeNewRegistration=true` / `requestTypeDataModification`
  absent → `crossFieldValidation` rule `cuitRequiredForModification`'s
  `when` condition (`requestTypeDataModification equals true`) is not
  met, so `cuit` is correctly **not** required here. **0 errors.**

**Valid mock 2 — data modification, with tax/regime rows and two officers:**

```json
{
  "requestTypeDataModification": true,
  "cuit": "30712345678",
  "afipOfficeCode": "012",
  "requestReasonOfficialOrder": true,
  "entityName": "LOGISTICA AUSTRAL S.R.L.",
  "fiscalAddressStreet": "RUTA NACIONAL 3",
  "fiscalAddressNumber": "5670",
  "fiscalAddressLocality": "COMODORO RIVADAVIA",
  "fiscalAddressDistrict": "COMODORO RIVADAVIA",
  "fiscalAddressProvince": "CHUBUT",
  "fiscalAddressPostalCode": "9000",
  "legalAddressStreet": "RUTA NACIONAL 3",
  "legalAddressNumber": "5670",
  "legalAddressLocality": "COMODORO RIVADAVIA",
  "legalAddressDistrict": "COMODORO RIVADAVIA",
  "legalAddressProvince": "CHUBUT",
  "legalAddressPostalCode": "9000",
  "phoneType": "Celular",
  "phoneNumber": "2974123456",
  "principalActivityDescription": "TRANSPORTE DE CARGA POR CARRETERA",
  "principalActivityCode": "494200",
  "principalActivityStartDate": "2019-03-15",
  "secondaryActivity1Description": "ALQUILER DE MAQUINARIA VIAL",
  "secondaryActivity1Code": "772911",
  "secondaryActivity1StartDate": "2021-06-01",
  "corporateContractDate": "2019-02-01",
  "capitalNationalPercentage": 100,
  "capitalForeignPercentage": 0,
  "legalFormCode035": true,
  "taxCode1": "10",
  "taxName1": "IVA",
  "taxRegistrationDate1": "2019-03-15",
  "filerCapacityCode": "Responsable Inscripto",
  "regimeName1": "RETENCIONES IVA",
  "regimeTaxCode1": "10",
  "regimeCode1": "767",
  "regimeResolutionNumber1": "2854",
  "regimeRegistrationDate1": "2019-03-15",
  "employerStartMonthYear": "04/2019",
  "employeeCount": 12,
  "officerName1": "FERNANDEZ, JORGE ALBERTO",
  "officerTaxId1": "20251893344",
  "officerCapacityCode1": "03",
  "officerResidentInCountry1Yes": true,
  "officerName2": "SOSA, PATRICIA ELENA",
  "officerTaxId2": "27298761123",
  "officerCapacityCode2": "03",
  "officerResidentInCountry2Yes": true,
  "declarantName": "FERNANDEZ, JORGE ALBERTO",
  "declarantCapacity": "Socio",
  "placeAndDate": "Comodoro Rivadavia, 20 de julio de 2026"
}
```

- `requestTypeDataModification=true` → `cuit` is present
  (`"30712345678"`, 11 digits) → rule satisfied. **0 errors.**

**Negative control 1 — `cuit` absent on a data-modification filing:**
Same as valid mock 2 but with `cuit` removed. `crossFieldValidation`
rule `cuitRequiredForModification`'s `when` (`requestTypeDataModification
equals true`) is met while `requirePresent: ["cuit"]` is not satisfied
→ **fails validation**, as expected.

**Negative control 2 — malformed `cuit` (10 digits, not 11):**
Same as valid mock 1 but with `"cuit": "3071234567"` added. Fails
`validation.pattern` `^\d{11}$` (10 characters) → **fails validation**, as
expected.

**Negative control 3 — both legal-form mutual-exclusivity and a missing
required field:** `{ "legalFormCode019": true, "legalFormCode035": true,
"principalActivityDescription": "X" }`. Two problems, both expected to be
caught: (a) two members of the `legalForm` `exclusivityGroups` entry are
simultaneously `true`, violating "at most one field in a group may be set
(true) at once"; (b) `entityName`, `principalActivityCode`,
`principalActivityStartDate`, `declarantName`, `declarantCapacity`, and
`placeAndDate` — all `required: true` — are absent. **Fails validation on
both counts**, as expected.

## Tooling run

- `node tools/validate.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/afip/inscripcion-cuit-personas-juridicas/1.0.0` → 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this is a from-scratch opening of a new
jurisdiction with no independent second-reviewer pass yet, several
structurally-inferred (not source-asserted) `required` judgment calls, and
two disclosed content gaps (`legalFormCode087`/`legalFormCode241`'s blank
headers, and `province`'s missing "Localidad" widget) that a live-browser
or alternate-specimen cross-check could potentially resolve. Re-check the
source, confirm no newer specimen has replaced this one (`Last-Modified`
was already 2017 as of this session — a long-lived specimen, but worth
reconfirming), and consider whether F.460/F or the FSV visa form are ready
to pick up as a follow-on cycle, on or before that date and on any
`source.url` change.
