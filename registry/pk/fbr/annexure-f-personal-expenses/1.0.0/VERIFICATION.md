# Verification record — `pk/fbr/annexure-f-personal-expenses` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5782, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first rather than trusting the
in-repo state from memory. The immediately preceding GOV-5773 cycle's own
`VERIFICATION.md`, and this document's own workbook siblings
(`pk/fbr/annual-individual-income-tax-return-it-1b`,
`pk/fbr/annual-individual-income-tax-return-it-2`,
`pk/fbr/annexure-a-adjustable-tax`,
`pk/fbr/annexure-b-manufacturing-trading-profit-loss-account`,
`pk/fbr/annexure-c-inadmissible-admissible-deductions`,
`pk/fbr/annexure-d-depreciation-amortization`,
`pk/fbr/annexure-e-minimum-final-tax-chargeable`, and `pk/fbr/wealth-statement`),
had all explicitly named "Annex-F" as this same nine-worksheet workbook's sole
remaining disclosed, open backlog item — and the 16-jurisdiction "5 of 6
verticals" gap list had already been re-screened a dead end across seven
consecutive prior cycles (GOV-5731, GOV-5738, GOV-5745, GOV-5752, GOV-5759,
GOV-5766, GOV-5773). This cycle picked up Annex-F to close this workbook's own
backlog outright, rather than re-screening that same jurisdiction list an
eighth consecutive time.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-f-personal-expenses` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures (GOV-3104,
    GOV-5731, GOV-5738, GOV-5745, GOV-5752, GOV-5759, GOV-5766, GOV-5773),
    confirming no revision. No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped directly
    with Python's built-in `zipfile` module. Parsed `sheetData` rows directly
    via Python's `xml.etree.ElementTree` (not a regex pass), except for the
    `mergeCells` and `dataValidations` blocks, which were extracted with a
    single targeted regex against the raw XML text (their own structure is
    not a repeating `sheetData` row shape).
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that `Annex-F`
    (`sheetId="17"`) maps to `r:id="rId8"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet8.xml` — the
    worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every prior
    cycle's own finding. This sheet's own `_xlnm.Print_Area`
    (`'Annex-F'!$A$1:$F$28`, from `xl/workbook.xml`'s own `definedNames`) was
    cross-checked against the sheet's own populated content: rows 1–28 carry
    every label/value on this sheet, plus a scattered handful of blank,
    unlabelled, unstyled-beyond-column-default cells in columns G through P
    on rows 1–2 and 29–46 — column-width/row-height artifacts left over from
    spreadsheet authoring, outside the print area, carrying no text, formula,
    or fill and disregarded (this sheet's own `xl/worksheets/_rels/sheet8.xml.rels`
    contains only a `printerSettings` relationship — no `legacyDrawing`/
    `comments` reference, so no cell comments exist on this sheet either).

## Scope decisions

Annex-F ("Personal Expenses") is a single-table personal/household-expense
line-item list (Sr. 1 headline total plus sixteen named categories, Sr. 2
through Sr. 17 — Sr. 17 itself being a second, embedded subtotal) with a
four-row family-member-contribution sub-table nested inside the same visual
block.

1. **Header block matches Annex-A's and Annex-E's own plain convention, not
   Annex-B/Annex-C/Annex-D's formula-link convention.** Row 3's Name cell
   (`C3`, merged `C3:D3`) and row 4's CNIC cell (`C4`, merged `C4:D4`) were
   independently confirmed, via the raw cell XML, to be plain blank cells
   (styled, no `<v>` value, no `<f>` formula element) — not formula-linked to
   `IND (BUS PLUS)` (Form IT-2), unlike Annex-B/Annex-C/Annex-D's own
   Name/CNIC cells. Tax Year (cell `F3`) is pre-filled `2024` (a bare numeric
   value, no shared-string/formula wrapper). NTN (cell `F4`) is a genuine
   direct-entry cell but, unlike Annex-B's/Annex-C's/Annex-D's/Annex-E's own
   NTN cells, is **not** covered by this sheet's own single `dataValidation`
   rule — the same uncovered shape already disclosed for Annex-A's own NTN
   cell. `taxpayerNtn` therefore carries no `validation` object, consistent
   with that precedent.
2. **A single table with two headline totals, one of which nets its own own
   embedded sub-table back in.** Sr. 1 ("Personal Expenses [(2 + 16) - 17]",
   row 6) is the overall headline total: the form's own printed formula sums
   Sr. 2 through Sr. 16 (fifteen itemised categories, rows 7–21) plus Sr. 17
   (row 22, itself a subtotal of the family-contribution sub-table) and then
   *subtracts* that same Sr. 17 again — i.e. family contributions are added
   into the running total and then netted back out, a genuine printed-formula
   quirk quoted verbatim in that field's own description and not corrected or
   simplified into a friendlier equivalent formula.
3. **The family-contribution sub-table (rows 23–27) is a bounded four-slot
   pattern, not an open-ended array**, consistent with this workbook's own
   established convention (e.g. Annex-D's own three identically-labelled
   "Intangible" slots). Its own header row (row 23) prints only two column
   labels — "CNIC No." (cell `C23`) and "Name*" (cell `D23`) — with no
   repeated "Amount" label of its own; the sub-table's own Amount column
   (`F`) was confirmed, from the raw cell XML, to carry the identical style
   index (`s="130"`) as the main table's own Amount cells (rows 6–22) and to
   fall within this sheet's own single `dataValidation` range (`sqref`
   includes `F24:F27`) — independently confirming it inherits the main
   table's own row-5 "Amount" header rather than being a separate, unlabelled
   column. Column `E` in this sub-table (rows 23–27) carries **no** header,
   **no** value, and **no** `dataValidation` coverage anywhere — a genuine
   unlabelled, non-fillable spacer column between the Name and Amount
   columns, disclosed and not modelled as a field. Modelled as four
   explicitly numbered field triples (`familyMemberContribution1`–`4`, each
   with its own `Cnic`/`Name`/`Amount` suffix), matching Sr. 18 through
   Sr. 21's own printed row numbers.
4. **`dataValidation` coverage is total across this sheet's own Amount
   column, unlike every prior Annex in this workbook.** The sheet's own
   single `dataValidation` rule (`type="whole"`,
   `operator="greaterThanOrEqual"`, `formula1=0`, `sqref="F6:F22 F24:F27"`)
   was independently parsed: it covers **every** Amount cell in both the
   sixteen-category main table (rows 6–22, Sr. 1 through Sr. 17) and the
   four-row family-contribution sub-table (rows 24–27, Sr. 18 through
   Sr. 21) — including both of this sheet's own headline totals (Sr. 1, row
   6; Sr. 17, row 22) alongside their own components. This is the same
   total-validated-like-its-components inversion already disclosed for
   Annex-A's and Annex-C's own headline totals, and the **opposite** of
   Annex-E's own headline-total exclusion — `validation.minimum: 0` is
   applied uniformly to all twenty-one Amount fields sourced from this sheet
   (seventeen main-table categories, including both Sr. 1 and Sr. 17, plus
   four family-contribution Amount fields, one per slot) — see the field
   count reconciliation below.

## Structural findings disclosed, not corrected

1. **Sr. 4's own printed label carries a source-document spelling artifact.**
   "Vehicle Running / Maintenence" (row 9) misspells "Maintenance" — quoted
   verbatim in that field's own description, corrected to "Maintenance" in
   the field's own label for legibility.
2. **Sr. 1's own printed formula nets its own embedded subtotal back out.**
   "Personal Expenses [(2 + 16) - 17]" adds Sr. 17 (family contributions)
   into the running total and then subtracts it again — quoted verbatim and
   disclosed, not corrected or simplified (see Scope decision 2 above).
3. **This sheet's own rotated section label (`A6:A27`, "Personal Expenses")
   exactly spans this sheet's entire single-table block, including its own
   embedded family-contribution sub-table** — the converse of Annex-E's own
   disclosed asymmetry (Annex-E's own rotated label, `A5:A39`, fell sixteen
   rows short of that sheet's own last data row). Confirmed independently
   from the raw `mergeCells` block and disclosed here for completeness, not
   because it constitutes a defect.
4. **`mergeCells` block (16 entries), independently parsed and confirmed:**
   `A1:F1` (title), `A2:F2` (subtitle "Personal Expenses"), `A3:B3`/`C3:D3`
   and `A4:B4`/`C4:D4` (Name/CNIC label-and-value pairs), `C5:D5` (header
   "Description"), `C6:D6` through `C22:D22` (each of the sixteen category
   rows' own Description cell), and `A6:A27` (the rotated section label
   discussed in finding 3). No merges exist inside the family-contribution
   sub-table (rows 23–27) — its own CNIC/Name/Amount columns are genuinely
   separate, unmerged cells, confirming the three-field-per-slot modelling
   choice.

## Field count reconciliation

34 fields total: 4 header fields (`taxpayerName`, `taxpayerCnic`,
`taxpayerNtn`, `taxYear`) + 17 main-table category amounts (Sr. 1 through
Sr. 17, one field each) + 12 family-contribution sub-table fields (4 slots ×
3 fields each — CNIC, Name, Amount) + 1 `declarationDate` = 4 + 17 + 12 + 1 =
**34**. `validation.minimum: 0` is applied to all 17 main-table category
amounts plus all 4 family-contribution Amount fields (21 fields in total);
the 4 header fields, 8 family-contribution CNIC/Name fields, and
`declarationDate` carry no `minimum`.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/pk/fbr/annexure-f-personal-expenses/1.0.0/`: 2 valid scenarios
plus 5 mutation-control fixtures, each derived from one of the valid
fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`, not committed to the repo) before being
finalized:

- `valid-few-categories.json` (a taxpayer reporting a handful of personal-
  expense categories, no family contributions) — **0 errors**.
- `valid-full-reconciliation.json` (a taxpayer reporting all sixteen
  personal-expense categories, both headline totals, all four family-member
  contribution slots, and a signed `declarationDate`) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to a
  14-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets `rent` to a negative amount,
  violating `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-declaration-date-type.json` (sets
  `declarationDate` to a non-date numeric value) — **exactly 1 error**.

No `mutation-control-negative-ntn.json` fixture is included: unlike
Annex-C's/Annex-D's/Annex-E's own NTN cells, Annex-F's `taxpayerNtn` carries
no `validation.minimum` (Scope decision 1 above), the same shape already
disclosed for Annex-A's own NTN field — Annex-A's own conformance fixture set
likewise omits a negative-NTN mutation for the identical reason.

## Structural validation

- `node tools/validate.mjs` — **701/701** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **701/701**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-f-personal-expenses/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (701 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-F"
(Personal Expenses) structure — identification block, the sixteen named
personal/household-expense categories with their headline total, and the
embedded four-slot family-contribution sub-table — is fully transcribed from
the genuine, currently-served official Tax Year 2024 edition (a fillable
Excel workbook, not a government online-filing system), but no live filing
through FBR's own IRIS e-filing channel was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with, endorsed
by, or operated by the Islamic Republic of Pakistan or the Federal Board of
Revenue.
