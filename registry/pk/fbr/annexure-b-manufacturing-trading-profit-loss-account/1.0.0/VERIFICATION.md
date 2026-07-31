# Verification record — `pk/fbr/annexure-b-manufacturing-trading-profit-loss-account` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5752, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first. The immediately preceding
GOV-5745 cycle's own `pk/fbr/annexure-a-adjustable-tax` v1.0.0 (and its own
siblings, IT-1B and IT-2) had all explicitly named "Annexes B through F" as
this same nine-worksheet workbook's disclosed, open backlog, and the
16-jurisdiction "5 of 6 verticals" list had already been re-screened a dead
end across three consecutive prior cycles (GOV-5731, GOV-5738, GOV-5745)
with no new lead — so this cycle picked up Annex-B, the next of the five
remaining annexes, rather than re-screening that same list a fourth time.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-b-manufacturing-trading-profit-loss-account` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures for this same
    workbook (GOV-3104, GOV-5731, GOV-5738, GOV-5745), confirming no
    revision. No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped directly
    with Python's built-in `zipfile` module, and the target worksheet's
    `sheetData` rows, `sharedStrings.xml` string table, `mergeCells`, and
    `dataValidations` block were parsed by hand from the raw XML.
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that `Annex-B`
    (`sheetId="13"`) maps to `r:id="rId4"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet4.xml` —
    the worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every prior
    cycle's own finding.

## Scope decisions

Annex-B ("Manufacturing / Trading / Profit & Loss Account (including
Revenues subject to Final / Fixed Tax)") is a business income-statement
schedule for an individual taxpayer's business. The source form's own
instruction directly beneath the title states "Separate form should be
filled for each business" — i.e. one Annex-B instance per business. The
worksheet is printed across two pages that repeat the identification
header (Name, CNIC, Tax Year, NTN — all formula-linked to the sibling
`'IND (BUS PLUS)'` worksheet, confirming this Annex is filed alongside Form
IT-2, not standalone) and contains three logical sections:

1. **Manufacturing / Trading Profit & Loss Account, Sr. 1–45** (rows
   9–53). Each line splits into three amount columns: Total Amount (E),
   Amount Subject to Final Tax (F), Amount Subject to Normal Tax (G).
   **This worksheet's own single `dataValidation` rule
   (`type="whole"`, `operator="greaterThanOrEqual"`, `formula1=0`,
   `sqref="E9:G53 G5 G59 E63:E67"`) covers this entire row range
   uniformly, including every computed subtotal row itself** — Sr. 4
   ("Cost of Sales / Services [(sum of 5 to 15)-16]"), Sr. 17 ("Gross
   Profit / (Loss) [1-4]"), Sr. 18 ("Other Revenues [Sum of 19 to 22]"),
   Sr. 24 ("Management, Administrative, Selling & Financial Expenses [Sum
   of 25 to 44]"), and Sr. 45 ("Accounting Profit / (Loss) [17+18-24]").
   This is the same materially different validation shape already
   disclosed for this workbook's own `Annex-A` sibling, and a genuine,
   observed structural difference from the `IT-1B`/`IT-2`/`Wealth
   Statement` siblings, where the equivalent headline-total rows were
   confirmed, by the *absence* of any numeric-entry validation rule, to be
   computed subtotals and excluded from those documents on that basis.
   Because every P&L row here carries the identical constraint as its own
   components, this version models all 45 lines as individually
   reportable fields — 135 fields total (45 × 3 amount columns) — following
   the same convention already established for Annex-A.

   One label/item-count mismatch was found in the source and is disclosed,
   not corrected: Sr. 18's own printed label reads "Other Revenues [Sum of
   19 to 22]", but the actual sub-items beneath it run Sr. 19 through
   Sr. 23 (five items, not four) — "Share in Taxed Income from AOP" (Sr.
   23) is present in the sheet's own row data but not reflected in the
   summary label's own range. Modelled as printed; not corrected.

2. **Unadjusted business-loss carry-forward, Sr. 46–52** (rows 62–67),
   single Total-Amount column (E) only — no Final/Normal Tax split. A
   genuine Sr.-numbering skip was found and is disclosed: **Sr. 49 (which
   by sequence would be "Unadjusted (Loss) from Business for 2018") is
   entirely absent** between Sr. 48 ("...for 2017") and Sr. 50 ("...for
   2019") — the same "later insertion/removal, not renumbered" pattern
   already disclosed in the Wealth Statement's own roman-numeral Inflows
   skip and in Annex-A's own Sr. 7 skip. The same `dataValidation` rule's
   own `E63:E67` clause covers only Sr. 47–52 (rows 63–67), **deliberately
   excluding Sr. 46 itself** (row 62, "Income / (Loss) from Business
   before adjustment of Admissible Depreciation / Initial Allowance /
   Amortization for current / previous years") — consistent with Sr. 46
   being the current year's own business result, which (unlike the
   already-realized prior-year losses in Sr. 47–52, each carried forward
   and reported as a positive magnitude) can genuinely be negative.
   `incomeLossBeforeAdjustment` is modelled with no `minimum`; the five
   `unadjustedLoss20xx` fields each carry `minimum: 0`.

3. **Statement of Affairs / Balance Sheet, Sr. 53–63** (rows 69–79) — a
   business-specific balance sheet (Total Assets/Liabilities and named
   asset/liability categories), distinct from the personal net-worth
   disclosure already modelled in `pk/fbr/wealth-statement`. **This
   section carries no `dataValidation` coverage at all** (the sheet's own
   single rule stops at row 67). A genuine, disclosed source-document
   artifact was found in the raw `mergeCells` block: `<mergeCell
   ref="E69:F79"/>` merges columns E and F into a single cell spanning all
   eleven rows of this section, even though the sheet's own `<cols>`
   definition gives columns E, F, and G an identical width and style
   matching the P&L section's three-column layout above. Column G is left
   unmerged, with its own individually styled (but unvalidated) cell in
   every row of this range, and is modelled here as this section's single
   per-line "Amount" field (11 fields, one per Sr. 53–63 line) — the E:F
   merge is disclosed rather than silently modelled as a second and third
   amount column a filer could never actually populate per line. No
   `minimum` is modelled for any of these eleven fields, consistent with
   the section's own total absence of a `dataValidation` rule.

4. **Header.** Like Annex-A (and unlike IT-1B/IT-2/Wealth Statement), this
   worksheet carries no separate Address field. Name (C4/C58) and CNIC
   (C5/C59) are formula cells (`=IF('[2]IND (BUS PLUS)'!$C$3="","",...)`)
   linked to the sibling `'IND (BUS PLUS)'` worksheet, not direct-entry
   cells — confirming this Annex is filed alongside Form IT-2. A genuine
   internal labelling inconsistency was found and is disclosed, not
   resolved: the page-1 header's own NTN label (row 5, shared-string
   index 6) reads unstarred **"NTN"**, while the page-2 continuation
   header's own NTN label (row 59, shared-string index 36) for the
   identical field reads starred **"NTN\*"**. `taxpayerNtn` is modelled as
   optional, matching the page-1 label; the page-2 asterisk is quoted
   verbatim in the field's own description. Both NTN cells (G5, G59) carry
   the `sqref`'s own `type="whole" ≥0` validation. Neither the CNIC cell
   (C4/C5/C58/C59) carries its own `dataValidation` rule on this sheet —
   the same 13-digit CNIC pattern already established across every other
   worksheet in this workbook is applied here by convention, disclosed as
   an assumption rather than a rule confirmed on this specific sheet.
   Row 54's own bare "Signature:" footer carries no accompanying
   declaration paragraph and no Date cell at all (unlike Annex-A's own
   "Signature: \_\_\_ Date: \_\_\_" footer), so no `declarationDate` field
   and no `documents[]` attestation entry are modelled for this document.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/pk/fbr/annexure-b-manufacturing-trading-profit-loss-account/1.0.0/`:
2 valid scenarios plus 5 mutation-control fixtures, each derived from a
valid fixture by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`, not committed to the repo)
before being finalized:

- `valid-trading-business-simple.json` (a small trading business —
  revenue, cost of sales, gross profit, a handful of indirect expenses,
  accounting profit, no prior-year unadjusted losses, and a small
  Statement of Affairs) — **0 errors**.
- `valid-manufacturing-business-with-carryforward-losses.json` (a larger
  manufacturing business reporting Final-Tax-subject revenue alongside
  Normal-Tax-subject revenue, a fuller cost-of-sales and indirect-expense
  breakdown, two prior-year unadjusted losses (2019, 2020), and a fuller
  Statement of Affairs) — **0 errors**.
- `mutation-control-missing-required-tax-year.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-pnl-amount.json` (sets `netRevenueTotal` to a
  negative amount, violating `minimum: 0`) — **exactly 1 error**.
- `mutation-control-negative-unadjusted-loss.json` (sets
  `unadjustedLoss2020` to a negative amount, violating `minimum: 0`) —
  **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — **697/697** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **697/697**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-b-manufacturing-trading-profit-loss-account/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (697 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-B"
(Manufacturing / Trading / Profit & Loss Account) structure —
identification block, all 45 Profit & Loss lines, the prior-year
unadjusted-loss carry-forward section, and the business Statement of
Affairs / Balance Sheet — is fully transcribed from the genuine,
currently-served official Tax Year 2024 edition (a fillable Excel
workbook, not a government online-filing system), but no live filing
through FBR's own IRIS e-filing channel was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Islamic Republic of Pakistan or the
Federal Board of Revenue.
