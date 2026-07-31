# Verification record — `pk/fbr/annexure-d-depreciation-amortization` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5766, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first rather than trusting the
in-repo state from memory. The immediately preceding GOV-5759 cycle's own
`VERIFICATION.md`, and this document's own workbook siblings
(`pk/fbr/annual-individual-income-tax-return-it-1b`,
`pk/fbr/annual-individual-income-tax-return-it-2`,
`pk/fbr/annexure-a-adjustable-tax`,
`pk/fbr/annexure-b-manufacturing-trading-profit-loss-account`,
`pk/fbr/annexure-c-inadmissible-admissible-deductions`, and
`pk/fbr/wealth-statement`), had all explicitly named "Annexes D through F" as
this same nine-worksheet workbook's disclosed, open backlog — and the
16-jurisdiction "5 of 6 verticals" gap list had already been re-screened a
dead end across five consecutive prior cycles (GOV-5731, GOV-5738, GOV-5745,
GOV-5752, GOV-5759). This cycle picked up Annex-D, the next of the three
remaining Annexes, rather than re-screening that same jurisdiction list a
sixth consecutive time.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-d-depreciation-amortization` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures (GOV-3104,
    GOV-5731, GOV-5738, GOV-5745, GOV-5752, GOV-5759), confirming no
    revision. No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped directly
    with Python's built-in `zipfile` module. Parsed `sheetData` rows directly
    via Python's `xml.etree.ElementTree` (not a regex pass, learning forward
    from a prior cycle's own disclosed regex mis-attribution on an adjacent
    worksheet).
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that `Annex-D`
    (`sheetId="15"`) maps to `r:id="rId6"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet6.xml` — the
    worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every prior
    cycle's own finding.

## Scope decisions

Annex-D ("Depreciation, Initial Allowance, Amortization") is structurally a
genuine departure from Annex-A/Annex-B/Annex-C's own flat, single-Amount-
column line-item lists: it is a multi-column asset register (`dimension`
`A1:IV28`, populated content rows 1–28) with two sections.

1. **Header block is formula-linked to Form IT-2, same as Annex-B/Annex-C.**
   Row 3's Name cell (`C3`) and row 4's CNIC cell (`C4`) each carry a
   formula — `IF('[2]IND (BUS PLUS)'!C3="","",'[2]IND (BUS PLUS)'!C3)` and
   the CNIC equivalent — pulling directly from the `IND (BUS PLUS)` (Form
   IT-2) worksheet. Tax Year (cell `O3`) is pre-filled `2024`. NTN (cell
   `O4`) is a genuine direct-entry cell and *is* covered by this worksheet's
   own `dataValidation` rule (`sqref` includes `O4`), the same shape already
   disclosed for Annex-B's/Annex-C's own NTN cells; `taxpayerNtn` is
   modelled with `validation.minimum: 0` accordingly.
2. **Depreciation table (rows 7–19): twelve fixed asset categories (Sr.
   1–12) plus a thirteenth summary-shaped row (Sr. 13, row 19, "Tax
   Depreciation / Initial Allowance for Current Year").** Each category row
   carries nine printed data columns: WDV (BF) [E], Deletion [F], Addition
   (Used Previously in Pakistan) [G] with its own Extent of Use [H],
   Addition (New) [I] with its own Extent of Use [J], a fixed statutory
   Initial Allowance rate [K] and a fixed statutory Depreciation rate [M]
   printed per category, the taxpayer's own computed Initial Allowance [L]
   and Depreciation [N] amounts, and WDV (CF) [O]. Columns K and M are
   printed constants specific to each category (e.g. Sr. 1 "Building (all
   types)", Code 3302: 15% initial allowance / 10% depreciation; Sr. 9
   "Motor Vehicle (not plying for hire)", Code 33041: 0% initial allowance /
   15% depreciation) — plain numeric cells with no formula — and are
   recorded in each field's own `description` for citation rather than
   modelled as separate reportable fields, following the same convention
   already used for this workbook's Annex-A/Annex-B/Annex-C line-item
   classification codes. Sr. 13's own Rate cells (`K19`/`M19`) are the sole
   exception on this sheet: they hold the text string `"100%"` rather than
   a decimal fraction, confirmed and disclosed but not corrected (see
   Structural findings below).
3. **Amortization table (rows 22–27): six categories (Sr. 14–19), four
   printed data columns each.** WDV (BF) [E], Remaining Useful Life [F],
   Extent of Use [G], and Amortization [H]. Three of these rows (Sr. 14–16)
   share the identical printed label "Intangible" and the identical FBR
   classification Code 3305 — a bounded-slot pattern (three blank,
   identically-labelled repeats of the same category, evidently intended
   for the taxpayer to list up to three distinct intangible assets) already
   seen elsewhere in this registry (e.g. the Mauritius CBRD company-
   formation series); modelled here as three explicitly numbered fields per
   column (`intangibleAsset1*`/`intangibleAsset2*`/`intangibleAsset3*`)
   rather than an open-ended array, consistent with that established
   convention. The remaining three categories are named: "Expenditure
   providing Long Term Advantage / Benefit" (Sr. 17, Code 330516), "Tax
   Amortization for Current Year" (Sr. 18, Code 3247), and
   "Pre-Commencement Expenditure" (Sr. 19, Code 3306).
4. **`dataValidation` coverage is uneven across this sheet's own printed
   entry cells — every printed cell is still modelled as a field
   regardless.** The sheet's single `dataValidation` rule (`type="whole"`,
   `operator="greaterThanOrEqual"`, `formula1=0`,
   `sqref="E22:F25 E19:G19 H22:H27 E27:F27 I19 E26:G26 O4 E7:I18 L7:L19
   N7:O19"`) was independently parsed range-by-range:
   - Depreciation categories (rows 7–18): WDV(BF)/Deletion/Addition(Used
     Previously)/Extent of Use(Used Previously)/Addition(New) [E–I] via
     `E7:I18`; Initial Allowance [L] via `L7:L19`; Depreciation/WDV(CF)
     [N–O] via `N7:O19`. The "Extent of Use" column for the *New* addition
     (column J) is **not covered anywhere** in this sqref, for any row on
     the sheet — a genuine, disclosed asymmetry against its Used-Previously
     counterpart (column H), which *is* validated for every Depreciation
     category row except Sr. 13 itself.
   - Sr. 13 (row 19): WDV(BF)/Deletion/Addition(Used Previously) [E–G] via
     the standalone `E19:G19` clause, Addition(New) [I] via the standalone
     `I19` clause, Initial Allowance/Depreciation/WDV(CF) via the same
     `L7:L19`/`N7:O19` ranges as the twelve ordinary categories — but its
     own Extent of Use (Used Previously) cell (`H19`) carries **no**
     validation, unlike every one of the twelve categories above it.
   - Amortization table: WDV(BF)/Remaining Useful Life [E–F] via
     `E22:F25` (Sr. 14–17) and the standalone `E27:F27` (Sr. 19);
     Amortization [H] via `H22:H27` (all six categories). Extent of Use
     [G] is covered **only** for Sr. 18 ("Tax Amortization for Current
     Year") via the standalone `E26:G26` clause — not for the three
     Intangible slots, the Long Term Advantage category, or the
     Pre-Commencement Expenditure category.
   Every printed, fillable cell on this sheet is nonetheless modelled as a
   field regardless of whether it carries a `dataValidation` rule — the
   rule is treated as an added numeric constraint where present, not a
   signal of a field's existence — consistent with this workbook's own
   Annex-A precedent, where an unvalidated NTN cell was still modelled as a
   field. `validation.minimum: 0` is applied only to the specific fields
   whose cell the sqref actually covers (`buildingExtentOfUseNew` and its
   11 sibling "Extent of Use (New)" fields, and
   `taxDepreciationInitialAllowanceCurrentYearExtentOfUseUsedPreviously`,
   carry no `minimum`; the three Intangible slots' and the Long Term
   Advantage/Pre-Commencement Expenditure categories' own "Extent of Use"
   fields carry no `minimum`).

## Structural findings disclosed, not corrected

1. **Sr. 13's own Rate cells hold text `"100%"`, not a decimal fraction,**
   unlike every one of the twelve ordinary Depreciation categories above it
   (which hold plain decimals, e.g. `0.15`, `0.25`). Confirmed via the raw
   cell type attribute (`t="s"`, shared-string reference) and not modelled
   as a field (consistent with every other Rate cell on this sheet), but
   disclosed here since it is a genuine formatting inconsistency in the
   source document.
2. **Three identically-labelled "Intangible" / Code 3305 rows (Sr.
   14–16).** Independently confirmed via the raw shared-strings table that
   all three rows cite the exact same string index for both the
   description and the code — not a transcription error on this cycle's
   own part, but a genuine repeat in the source form itself.
3. **`mergeCells` block (17 entries) contains one wide merge (`J21:O27`)
   spanning otherwise-unused space to the right of the Amortization
   table** — confirmed empty of any text, formula, or value via the raw
   `sheetData` and not modelled, consistent with this sheet's own printed
   layout leaving that region blank for visual balance rather than data
   entry.
4. **Sr. numbering (1–19) is continuous across both the Depreciation and
   Amortization tables, with rows 20–21 being the Amortization table's own
   header rows rather than a numbering skip** — the first of this
   workbook's own Annex worksheets reviewed so far with continuous Sr.
   numbering across a section boundary (cf. Annex-A's Sr. 7 skip and
   Annex-B's Sr. 49 skip, both within a single section).
5. **Row 28's own bare "Signature:" (cell A28) / "Date:" (cell N28) footer
   carries no accompanying declaration paragraph**, the same shape already
   disclosed for Annex-A's and Annex-C's own footers — modelled as a single
   optional `declarationDate` field, no `documents[]` attestation entry.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/pk/fbr/annexure-d-depreciation-amortization/1.0.0/`: 2 valid
scenarios plus 6 mutation-control fixtures, each derived from one of the
valid fixtures by a single targeted mutation. All 8 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`, not committed to the repo) before being
finalized:

- `valid-few-categories.json` (a taxpayer reporting one Depreciation
  category — Building, new addition only — and one Intangible amortization
  slot) — **0 errors**.
- `valid-full-schedule.json` (a taxpayer reporting every one of the 146
  fields — all thirteen Depreciation-table categories and all six
  Amortization-table categories, plus a signed `declarationDate`) — **0
  errors**.
- `mutation-control-missing-required-field.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-depreciation-amount.json` (sets
  `buildingDepreciation` to a negative amount, violating `minimum: 0`) —
  **exactly 1 error**.
- `mutation-control-negative-amortization-amount.json` (sets
  `taxAmortizationCurrentYearAmortization` to a negative amount) —
  **exactly 1 error**.
- `mutation-control-negative-ntn.json` (sets `taxpayerNtn` to a negative
  value) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — **699/699** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **699/699**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-d-depreciation-amortization/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (699 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-D"
(Depreciation, Initial Allowance, Amortization) structure — identification
block and all nineteen named asset/amortization categories across both
tables with their per-column fields — is fully transcribed from the
genuine, currently-served official Tax Year 2024 edition (a fillable Excel
workbook, not a government online-filing system), but no live filing
through FBR's own IRIS e-filing channel was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Islamic Republic of Pakistan or the Federal
Board of Revenue.
