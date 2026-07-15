# Verification record — `do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3166)

[GOV-3152](/GOV/issues/GOV-3152) (2026-07-15) independently scouted and
live-verified all four of the Dominican Republic's then-remaining verticals
in parallel with authoring `tz/nida/application-form-2a`.
[GOV-3158](/GOV/issues/GOV-3158) picked up the Passport candidate
(`do/mirex/passport-application`) and delegated the other four as standalone
child issues, disclosing this candidate's source URL, its two-option choice
(FI-VHM-308 vehicle-transfer vs. GRCIV-011 vehicle-removal), and a confirmed
dead end (INTRANT driver's-license first-issuance, SSO-gated). This cycle
([GOV-3173](/GOV/issues/GOV-3173)) picked up GOV-3166 directly and
re-verified the source **from scratch** rather than trusting the prior
scouting note as-is, per this registry's standing convention. FI-VHM-308 was
chosen over GRCIV-011 because a sale/transfer declaration is the closer
functional analogue to the title-transfer transactions already modeled
elsewhere in this registry's DMV vertical (`cl/sii/aviso-venta-vehiculo`,
`br/mg/detran/comunicacao-de-venda-de-veiculo`). The Dominican Republic
already has two published documents (Taxes and Passport); this document is
its third, opening the DMV vertical (1 of 6 for that vertical, 3/6 verticals
overall for the jurisdiction).

## Sources examined

- **Document `(id, version)`:** `do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Dirección General de Impuestos Internos (DGII), Departamento
  de Vehículos de Motor.
- **Primary source:**
  `https://dgii.gov.do/vehiculosMotor/formularioVehiculosMotor/Documents/FI-VHM-308.zip`
  — fetched fresh this cycle with a plain `curl` (no browser User-Agent or
  session needed): HTTP 200, `Content-Type: application/zip`, 45,504 bytes,
  sha256 `21e4f72d6f2fb2454ab4b60f6c379f7e24d6a12e0e10aaf66ed5c651a0881932`.
- **Archive contents:** one file,
  `FI-VHM-308 Formulario Declaración Jurada de Transferencia de Vehículos de Motor.xlsx`,
  56,408 bytes, sha256
  `945addf62d6d5e0b326a73afce9bafd33d39fa7339169bdacff3f0b45b14b74f`, a
  single-worksheet OOXML `.xlsx` (`xl/worksheets/sheet1.xml`, no embedded VBA
  project, unlike the legacy `.xls` IR-2 workbook).
- **Sibling forms on the same DGII page (not modeled this version):**
  `GRCIV-011` (Solicitud de Eliminación de Vehículos de Motor),
  `FI-VHM-312` (Solicitud Reembolso del Impuesto de Circulación Vehicular),
  `FI-ADML-007` (Solicitud de Certificaciones) — each a separate, distinct
  form with its own field set, left as disclosed backlog candidates for a
  future cycle rather than modeled here.

## Structure independently confirmed

Parsed directly via Python's stdlib `zipfile`/`xml.etree.ElementTree`
(no `openpyxl`/`pip` available or needed in this environment) against the
workbook's own `xl/sharedStrings.xml` (39 shared strings) and
`xl/worksheets/sheet1.xml` parts, cross-referenced by cell reference (e.g.
`C16`, `K16`) and the sheet's 58 `mergeCell` ranges to reconstruct the print
layout's field grid section by section, top to bottom:

- **Header** (row 7-10): "Departamento de Vehículos de Motor" (office label,
  not a field) and the declaration's own title; **Fecha** (día/mes/año, row
  9-10) — no printed asterisk.
- **I. DATOS DEL VENDEDOR** (rows 14-31): Cédula/RNC\*, Nombre/Razón
  Social\*, Teléfono, Celular\*, then a "Dirección\*" subsection: Calle,
  Número/Edif., Urb./Barrio/Res. (no per-field asterisks), Sector\*,
  Municipio\*, Provincia\*.
- **II. DATOS DEL COMPRADOR** (rows 33-40): Cédula/RNC, Nombre/Razón Social,
  Teléfono, Celular — none carry an asterisk. Row 40 carries the form's own
  footnote (shared-string index 34): "\* Si no conoce los datos del
  comprador continuar en la casilla III" ("If you don't know the buyer's
  data, continue at box III").
- **III. DATOS DEL VEHICULO** (rows 47-56): Placa\*, Marca\*, Modelo\*,
  Chasis (no asterisk), Año\*.
- **IV. DATOS DE LA VENTA** (rows 58-61): Monto de la Venta (RD$)\*, Fecha de
  la Venta (no asterisk).
- **V. DECLARACION DE VENTA SIN DATOS DEL COMPRADOR** (rows 64-73): "Yo, ___,
  Declaro bajo Fe de juramento que el vehículo indicado en el presente
  formulario fue vendido por mi en la fecha antes indicada y que desconozco
  los datos del comprador y/o poseedor actual del mismo..." (a fallback sworn
  statement for when Section II can't be completed), "Firma del Declarante"
  (wet-ink signature, excluded — see Scope decisions), and the closing
  "(\*) Datos Obligatorios" legend.

## A genuine reverse-engineering finding: no `dataValidations`, requiredness from a stray asterisk cell

Unlike the xlsx forms handled in [GOV-3104](/GOV/issues/GOV-3104)
(Pakistan IT-1B) and [GOV-3114](/GOV/issues/GOV-3114) (this same jurisdiction's
IR-2), this workbook carries **no `dataValidations` element at all** —
confirmed by a direct string search of the raw `xl/worksheets/sheet1.xml` XML
for the literal substring `dataValidation` (absent). It is a plain
print-and-fill layout with no cell-level validation rules to decode.
Requiredness instead follows the form's own printed `*` convention, applied
cell-by-cell.

One genuine ambiguity was found and resolved by direct inspection rather than
assumption: the label "Teléfono" in Section I (cell `C21`) carries **no**
asterisk character within its own string — but a separate, single-character
shared-string cell (`F21`, string index 26, literal `*`) sits immediately
adjacent to it on the same row, between the "Teléfono" label and the
"Celular\*" label (cell `J21`, which *does* carry its own asterisk
concatenated into the string). A full-sheet scan for every cell whose
resolved string is exactly `*` found this to be the **only** such cell on the
entire sheet. Section II's own "Teléfono"/"Celular" labels (row 39) carry no
equivalent adjacent marker. Taken together, this confirms Section I's
Teléfono is required (the source's typesetting simply placed its asterisk in
a neighboring cell rather than the same string as the label), while Section
II's Teléfono/Celular are genuinely unmarked and optional — consistent with
Section II being conditionally skippable per the footnote quoted above. This
is disclosed as a genuine layout quirk resolved by direct cell-level
inspection, not glossed over or guessed.

## Scope decisions

1. **`Cédula / RNC` (seller and buyer) is modeled as a single unconstrained
   string field** per the source's own combined label, since the same box
   accepts either an 11-digit individual cédula or a shorter company RNC and
   no per-format split or pattern is printed on the form itself — the same
   treatment given the equivalent ambiguity in
   `do/mirex/passport-application`'s `identityDocumentNumber`.
2. **Section II (buyer data) is modeled entirely optional**, per the form's
   own footnote directing the filer to skip to Section III when the buyer's
   data is unknown.
3. **Section V's `declarantFullName` is modeled `required: false`**, not
   gated by a `requiredWhen` condition on Section II's fields. The form
   itself provides no boolean/enum field marking "buyer data unknown" — only
   a footnote directing the filer's behavior — so no cross-field rule is
   fabricated to enforce this computationally; the conditional relationship
   is disclosed here instead, the same disclosed-rather-than-fabricated
   approach used for `cl/sii/aviso-venta-vehiculo`'s conditionally-mandatory
   Sección D/E fields.
4. **Three fields carry no asterisk despite apparent practical necessity and
   are modeled `required: false` strictly per the source's own convention,
   not overridden by domain judgment:** the top-of-form declaration date
   (`declarationDate`), `vehicleChassis` (Chasis/VIN), and `saleDate` (Fecha
   de la Venta). Each is disclosed here rather than silently upgraded to
   required.
5. **`sellerAddressStreet`/`sellerAddressNumber`/`sellerAddressNeighborhood`
   are modeled optional** even though the "Dirección" subsection header
   itself carries an asterisk — the same header-level-vs-per-field asterisk
   distinction already established in `do/mirex/passport-application`'s
   Section 2 (identity-document grid).
6. **Excluded from this version, disclosed rather than silently omitted:**
   - "Departamento de Vehículos de Motor" — an office/department header
     label, not applicant data.
   - "Firma del Declarante" — a wet-ink signature captured in person,
     consistent with this registry's treatment of physical signature
     capture elsewhere (`do/mirex/passport-application`, `il/mot/medical-
     examination-driving-license-renewal`).
   - The "(\*) Datos Obligatorios" legend and Section II's own footnote —
     instructional text, not fields.
   - The three sibling DGII forms on the same page (GRCIV-011, FI-VHM-312,
     FI-ADML-007) — each a distinct form, left as disclosed backlog for a
     future cycle.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308/1.0.0/`:
2 valid scenarios plus 5 mutation-control fixtures, each derived from one of
the valid fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`, not committed to the repo) before being
finalized:

- `valid-known-buyer-full-transfer.json` (seller and buyer both fully
  identified via Section I/II, all required fields present) — **0 errors**.
- `valid-unknown-buyer-section-v-declaration.json` (Section II buyer fields
  omitted entirely; `declarantFullName` completed instead, per Section V) —
  **0 errors**.
- `mutation-control-missing-required-field.json` (drops `sellerCedulaRnc`) —
  **exactly 1 error**.
- `mutation-control-missing-seller-phone.json` (drops `sellerPhone`, testing
  the stray-asterisk-derived requiredness finding) — **exactly 1 error**.
- `mutation-control-negative-sale-amount.json` (sets `saleAmount` to a
  negative value, testing `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-vehicle-year.json` (sets `vehicleYear` to `1850`,
  outside `minimum: 1900`) — **exactly 1 error**.
- `mutation-control-missing-vehicle-plate.json` (drops `vehiclePlate`) —
  **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **478/478** (477 documents + this one, plus 3 `mapping.json` companions
  unaffected); `node tools/validate-ajv.mjs` → **478/478**.
- `node tools/verify-sources.mjs registry/do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source form's own printed field grid (Sections
I-V) is fully transcribed from the genuine, currently-served workbook, with
the one layout ambiguity found (the Teléfono stray-asterisk cell)
independently resolved by direct cell-level inspection rather than guessed.
No live filing through DGII's Departamento de Vehículos de Motor was
attempted and no independent second reviewer has yet passed over this field
list. GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Dominican Republic or the
Dirección General de Impuestos Internos.
