# Verification record — `do/dgii/annual-corporate-income-tax-return-ir-2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3114)

This candidate was pre-scouted during the GOV-3101 "GovSchema Standard
Research" cycle, independently re-verified live during GOV-3109, and
delegated as the standalone child issue GOV-3114 with pre-verified sourcing
(URL, HTTP status, browser-User-Agent gotcha, and a binary-string-scan-derived
worksheet inventory). This cycle picked up GOV-3114 directly and re-verified
the source **from scratch** rather than trusting the prior notes as-is, per
this registry's standing convention. The Dominican Republic is not yet in the
registry; this document opens it as the 60th jurisdiction, via Taxes (1 of 6
verticals).

## Sources examined

- **Document `(id, version)`:** `do/dgii/annual-corporate-income-tax-return-ir-2` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Dirección General de Impuestos Internos (DGII).
- **Primary source:**
  - Direct `.zip`: <https://dgii.gov.do/herramientas/formularios/formularioDeclaraciones/ISR/Personas%20Jur%C3%ADdicas/IR-2-2018.zip>
    — re-fetched independently this cycle via `curl` **with a browser
    User-Agent** (the bare domain returns HTTP 403 without one — UA-sniffing,
    not a hard WAF, exactly as the prior scouting note described): HTTP 200,
    **size 2,345,919 bytes**, sha256
    `cec819bb8606c26a7ed601af2d95b3c83d8371cd0d8202ff06e1295270c2bea3`.
  - The archive contains **two files**, both examined:
    - `IR-2-2018.xls` — the workbook itself. Size 1,316,864 bytes, sha256
      `ca20e12669358be12065746cee069533872ac0211b784676dcd8715de4ed06a2`.
    - `Instructivo-IR-2-y-ANEXOS.pdf` — DGII's own 68-page line-by-line
      instructions booklet for the IR-2 form and all its Anexos. Size
      2,349,460 bytes, sha256
      `4c175b2b0b986c6344355d9b875c5ecd5f596d15d13640141744d3ced2c0eb9d`. Used
      as a **second, independent source** to cross-check the workbook's own
      structure — not relied on alone.
  - The `.xls` is legacy Office (OLE2/BIFF8), confirmed by the prior
    scouting note and independently re-confirmed this cycle. No
    `unzip`/`pip`/`openpyxl` is available in this environment; `python3`'s
    built-in `zipfile` module extracted the archive. The BIFF8 workbook
    itself was parsed with the npm package `xlsx` (SheetJS), installed
    standalone in a scratch directory for this task (**not** added as a
    repository dependency) — it directly exposes sheet names, cell values,
    cell formulas, merged-cell ranges, embedded shape/TextBox objects, and
    the raw bytes of the embedded VBA project.

## Structure independently re-confirmed

- **17 worksheets**, confirmed via `wb.SheetNames`: `D-2`, `D-1`, `D`,
  `A-1`, `A-2`, `A-3`, `B-1`, `B-2`, `B-3`, `B-4`, `E`, `H-1`, `H-2`, `G`,
  `J`, `IR-2` (this document's scope), and `Activo` — cross-checked against
  each worksheet's own printed title row (e.g. `A-1`'s row 2 prints "ANEXO
  A-1" / "BALANCE GENERAL"; `B-1`'s prints "ANEXO B-1" / "ESTADO DE
  RESULTADOS"). This is a **larger** worksheet inventory than the prior
  scouting note's own preliminary list (which only named the annex
  *categories* — Estado de Resultado, Balance General, Ajustes Fiscales,
  Datos Informativos/Complementarios — not the full per-sector sheet count),
  and all of it is corroborated a second, independent way: the embedded VBA
  project's raw bytes (extracted via SheetJS's `bookVBA` option) literally
  contain the strings `"Balance General (anexo A1)"`, `"Balance General
  (anexo A2)"`, `"Balance General (anexo A3)"`, `"Estado de Resultado (anexo
  B1)"` through `"...(anexo B4)"`, `"Ajustes Fiscales (anexo G)"`, `"Datos
  Complementarios (anexo E)"`, and `"Datos Informativos (anexo D)"` /
  `"...(anexo D1)"` / `"...(anexo J)"` — the macro's own comment/label text
  for a "hide annex sheets that don't match the selected sector" routine
  (`OCULTAR HOJAS DE ANEXOS QUE NO CORRESPONDEN`), bound to a `SECTOR
  ECONÓMICO` picker UserForm.
- The workbook's named ranges (via `wb.Workbook.Names`) independently
  confirmed the identification-block cell wiring: `TIPODECLARACION` → `IR-2`
  cell `H8`, `INVERSIONES` → `S8`, `SECTOR_ECONOMICO` → `S3`, and
  `Sector1`..`Sector5` → `AN1`:`AN5` (internal tokens), with their
  human-readable labels in `AM1`:`AM5` (`"Manufactura, Comercio,
  Agropecuaria"`, `"Hoteles y Afines"`, `"Bancos y Financieras"`,
  `"Compañías de Seguros"`, `"Instituciones Electricas"`).

## Scope decisions

The workbook is a 17-worksheet composite — larger even than Pakistan's own
9-worksheet FBR "Manual Return" workbook (GOV-3104/GOV-3109), the closest
precedent for this task. Modeling every worksheet in one version is well
beyond a single cycle's ability to transcribe and independently cross-check
with confidence. This v1.0.0 is scoped to the **`IR-2` worksheet alone** —
the return itself:

1. **Identification block modeled in full** (Datos Generales de la
   Sociedad): Tipo de Declaración, Sector Económico, Inversiones en Otras
   Compañías, RNC, Razón Social, Nombre Comercial, Teléfono de Contacto,
   Correo Electrónico, Inicio de la Actividad, Año Fiscal, and the fiscal
   period (Ejercicio Comercial Del/Al).
2. **All 35 numbered lines of the return itself modeled** (Casillas A, B,
   and 1 through 33 — section II "Determinación de la Renta Neta Imponible
   o Pérdida Fiscal" and the "Liquidación" section), each as a single
   reported number. This differs from the Pakistan precedent's approach of
   *excluding* a computed subtotal (Sr. 1, Property income) — here, every
   one of IR-2's own lines is modeled, because the task's own framing
   ("core IR-2 form/annex... not every ancillary worksheet") scopes at the
   *worksheet* level, not the *line* level, and because — unlike Pakistan's
   Property sub-item breakdown, which genuinely had no parent line on the
   in-scope worksheet at all — every one of these 35 lines **is** a real,
   numbered line printed on the IR-2 return itself.
3. **Each of those 35 lines' own field-level `description` discloses
   whether the workbook computes it automatically from an out-of-scope
   Anexo, or accepts it as direct taxpayer entry** — confirmed **two
   independent ways**, not asserted from one source alone:
   - The workbook's own cell formulas: a cell carrying a live formula (e.g.
     `AB18`'s `IF(SECTOR_ECONOMICO=Sector1,Casilla4_B1,...)`) is
     auto-computed; a cell with **no formula and no value** in the blank
     template (e.g. `U22`, `T32`..`T41`) is a direct-entry field.
   - DGII's own 68-page instructivo booklet's identical per-line prose:
     "Esta casilla se completa automáticamente" (this box completes itself
     automatically) for computed lines, versus "Colocar en esta casilla..."
     (enter in this box...) for direct-entry lines — independently
     extracted via `pdfjs-dist` page-by-page text extraction (pages 56-60
     of the PDF cover Casillas A through 33 line-by-line) and matched
     against the workbook's own formula/blank-cell status for **every one**
     of the 35 lines.
   - **One genuine disagreement between the two sources was found and
     disclosed, not silently resolved**: Casilla 4 ("Dividendos Ganados en
     Otras Compañías"). The instructivo's prose ("Colocar en esta casilla
     el monto de los dividendos recibido...") reads as a direct-entry
     instruction, but the workbook's own cell `U23` carries a live
     sector-conditional formula (`IF(SECTOR_ECONOMICO=Sector1,Casilla23_B1,
     IF(SECTOR_ECONOMICO=Sector2,Casilla23_B4,...))`) pulling from the
     filer's sector-specific, out-of-scope Anexo B. This is disclosed
     verbatim in the field's own `description` in `schema.json`, not
     silently corrected either way.
4. **`minimum: 0` was applied selectively, not uniformly** — a deliberate,
   disclosed judgment call based on each line's own section header and
   formula behavior, not a blanket assumption that tax-return amounts are
   always non-negative. Casillas 1, 6, 7, 9, and 11 (Beneficio/Pérdida Neta,
   Total Ajustes Fiscales, and the "Renta Neta Imponible ... o Pérdida
   Fiscal" chain — the section's own header explicitly allows a loss) carry
   **no** `minimum`, since a genuine net loss produces a negative value the
   workbook itself does not clamp. Every other numbered line — revenue
   totals, credits, withholdings, penalties, interest, and the settlement
   lines whose own formulas already clamp to zero or a positive magnitude
   (e.g. Casilla 23's `IF(...>0,...,0)` guard) — carries `minimum: 0`.
5. **No field-level `pattern`/`enum` in this document is claimed to
   originate from the workbook's own cell-level validation rules**, unlike
   the Pakistan `.xlsx` (OOXML) precedent, which derived its CNIC pattern
   directly from the source's own `dataValidations` XML block. This legacy
   `.xls` (BIFF8) workbook's own `DV` (data-validation) records are **not**
   exposed by the SheetJS tooling available in this environment — a real
   tooling-capability gap between the two binary formats, disclosed here
   rather than glossed over. `sectorEconomico`'s enum is derived from the
   workbook's own printed labels (`AM1:AM5`) and its own `SECTOR_ECONOMICO`
   named-cell/macro wiring — a genuine structural fact, not a validation
   rule — but `tipoDeclaracion` (free text; no confirmed ORIGINAL/
   RECTIFICATIVA enum in this workbook or its VBA project's raw strings) and
   `inversionesEnOtrasCompanias` (modeled as a "SI"/"NO" enum by DGII's
   standard convention, not confirmed from this workbook's own validation
   rules) are both disclosed as such in their own `description`s.
6. **RNC has no `pattern`** for the same reason (no accessible BIFF8 `DV`
   record), rather than fabricating a digit-count regex from general
   knowledge of DGII's RNC format not itself confirmed against this
   specific source.
7. **The verification/declaration paragraph (Section IV, "Juramento del
   Declarante") is modeled as a `documents[]` `attestation` entry**, quoted
   verbatim from the workbook's own floating TextBox object (extracted via
   SheetJS's `!objects` array, which is more precise than the plain
   cell-by-cell CSV dump — it captured the paragraph's exact wording
   including "por la presente afirmo bajo juramento..."). Its blanks —
   declarant name and capacity — are modeled as `declarantName` and
   `declarantCapacity` (open text; no fixed enum, unlike Pakistan's binary
   Self/Representative choice, since IR-2's "en calidad de" blank is for an
   open-ended corporate officer title).
8. **Section V ("Autorización de Representación"), the optional
   third-party filing-authorization block, is modeled as a second,
   optional `documents[]` `attestation` entry** plus three optional fields
   (`representativeLastName`, `representativeFirstName`,
   `representativeCedula`) — its own floating TextBox text was likewise
   extracted verbatim.
9. **Out of scope for this version, disclosed here rather than silently
   omitted**: all 16 supporting Anexos, each a distinct worksheet with its
   own large, structurally different layout — Anexo D, D-1, D-2 ("Datos
   Informativos" / inflation-adjustment basis computations — DGII's own
   instructivo devotes 11 pages, pages 4-14, to D-2 alone); Anexo A-1/A-2/
   A-3 ("Balance General", three sector variants); Anexo B-1/B-2/B-3/B-4
   ("Estado de Resultados", four sector variants); Anexo E ("Datos
   Complementarios" — prior-year losses and advance-payment income); Anexo
   G ("Ajustes Fiscales" — the detailed 1.1-1.17/2.1-2.4 line items that
   Casillas 2 and 5 of IR-2 themselves total); Anexo H-1/H-2
   ("Identificación del Beneficiario Final y Actualización de Datos" — the
   ultimate-beneficial-owner and company-data-update disclosure; DGII's own
   instructivo (page 3) states this Anexo pair is **mandatory on every
   filing**, a materially important omission disclosed explicitly, not
   glossed over, and a strong companion-schema candidate for a future
   cycle); Anexo J ("Datos Informativos" — invoice/comprobante-fiscal
   summary aggregated from the filer's twelve Formato 606/607 submissions);
   and the standalone "Formulario para la Liquidación del Impuesto a los
   Activos" (asset-tax settlement, worksheet `Activo`) — a related but
   legally and structurally separate tax, not the income-tax return itself
   (it does, however, pull Casilla 12 of IR-2 as a credit against its own
   settlement, confirmed via the instructivo's page 66).
10. **The "Para Uso de la DGII" internal box (fecha de presentación, fecha
    límite, prórroga, liquidador) is excluded** — DGII/administrative
    metadata, not taxpayer-supplied data, mirroring this registry's
    established convention of excluding agency-internal-use boxes.

## Conformance fixtures (Phase 3)

6 fixtures committed under
`conformance/do/dgii/annual-corporate-income-tax-return-ir-2/1.0.0/`: 2 valid
scenarios plus 4 mutation-control fixtures, each derived from one of the
valid fixtures by a single targeted mutation. All 6 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`/`documents[]`, not committed to the repo)
before being finalized:

- `valid-manufacturing-profit-with-anticipos.json` (Manufactura/Comercio/
  Agropecuaria sector, a net profit, positive and negative adjustments, a
  settled tax liability partly offset by anticipos and bank-interest
  withholding credits) — **0 errors**.
- `valid-services-net-loss-via-representative.json` (Hoteles y Afines
  sector, a net loss carried through with no tax due, filed with an
  authorized third-party representative) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `razonSocial`) —
  **exactly 1 error**.
- `mutation-control-invalid-enum-sector-economico.json` (sets
  `sectorEconomico` to `"Zona Franca"`, not in the enum) — **exactly 1
  error**.
- `mutation-control-negative-amount.json` (sets `impuestoLiquidado` to a
  negative value, violating `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `correoElectronico`
  to `"not-an-email"`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/do/dgii/annual-corporate-income-tax-return-ir-2/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/do/dgii/annual-corporate-income-tax-return-ir-2/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **470/470**; `node tools/validate-ajv.mjs` → **470/470**.
- `node tools/verify-sources.mjs registry/do/dgii/annual-corporate-income-tax-return-ir-2/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (470 entries).

## Maturity

`structural-reference`: the source workbook's own printed `IR-2` structure —
identification block, all 35 numbered income-determination/settlement lines,
and the verification/authorization declarations — is fully transcribed from
the genuine, currently-served official Versión 2018 edition (a
macro-enabled Excel workbook, not a government online-filing system), cross-
checked against DGII's own companion instructivo booklet, but no live filing
through DGII's own Oficina Virtual e-filing channel was attempted, and the
16 supporting Anexos this return itself depends on for several of its own
headline figures are not yet modeled. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the Dominican Republic or the Dirección General de Impuestos
Internos.
