# Verification record — `pk/fbr/annexure-e-minimum-final-tax-chargeable` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5773, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first rather than trusting the
in-repo state from memory. The immediately preceding GOV-5766 cycle's own
`VERIFICATION.md`, and this document's own workbook siblings
(`pk/fbr/annual-individual-income-tax-return-it-1b`,
`pk/fbr/annual-individual-income-tax-return-it-2`,
`pk/fbr/annexure-a-adjustable-tax`,
`pk/fbr/annexure-b-manufacturing-trading-profit-loss-account`,
`pk/fbr/annexure-c-inadmissible-admissible-deductions`,
`pk/fbr/annexure-d-depreciation-amortization`, and `pk/fbr/wealth-statement`),
had all explicitly named "Annexes E and F" as this same nine-worksheet
workbook's disclosed, open backlog — and the 16-jurisdiction "5 of 6
verticals" gap list had already been re-screened a dead end across six
consecutive prior cycles (GOV-5731, GOV-5738, GOV-5745, GOV-5752, GOV-5759,
GOV-5766). This cycle picked up Annex-E, the next of the two remaining
Annexes, rather than re-screening that same jurisdiction list a seventh
consecutive time.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-e-minimum-final-tax-chargeable` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures (GOV-3104,
    GOV-5731, GOV-5738, GOV-5745, GOV-5752, GOV-5759, GOV-5766), confirming
    no revision. No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped directly
    with Python's built-in `zipfile` module. Parsed `sheetData` rows directly
    via Python's `xml.etree.ElementTree` (not a regex pass).
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that `Annex-E`
    (`sheetId="16"`) maps to `r:id="rId7"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet7.xml` — the
    worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every prior
    cycle's own finding. This sheet's own `_xlnm.Print_Area` (`Annex-E'!$A$1:$I$65`,
    from `xl/workbook.xml`'s own `definedNames`) was cross-checked against
    the sheet's own populated content (rows 1–65) and found to match exactly.

## Scope decisions

Annex-E ("Minimum Tax Chargeable" / "Final Tax Chargeable") is, like
Annex-A, a flat, single-row-per-category line-item list — but with five
amount columns per category (not two), and two separate tables sharing that
same five-column layout on one sheet.

1. **Header block reverts to Annex-A's own plain convention, not
   Annex-B/Annex-C/Annex-D's formula-link convention.** Row 2's Name cell
   (`C2`, merged `C2:G2`) and row 3's CNIC cell (`C3`, merged `C3:G3`) were
   independently confirmed, via the raw cell XML, to be plain blank
   shared-string cells (shared-string index 299, an empty string) with no
   `<f>` formula element — not formula-linked to `IND (BUS PLUS)` (Form
   IT-2), unlike Annex-B/Annex-C/Annex-D's own Name/CNIC cells. Tax Year
   (cell `I2`) is pre-filled `2024`. NTN (cell `I3`) is a genuine
   direct-entry cell and *is* covered by this worksheet's own single
   `dataValidation` rule (`sqref` includes `I3`); `taxpayerNtn` is modelled
   with `validation.minimum: 0` accordingly.
2. **Two tables, one five-column layout, on a single sheet.** A "Minimum
   Tax Chargeable" table (rows 5–55: Sr. 1 headline total, "Minimum Tax
   Chargeable [Col.E Sum of 2 to 6]", plus Sr. 2 through Sr. 51, fifty named
   withholding/advance-tax categories under the Minimum Tax regime) and a
   "Final Tax Chargeable" table (rows 56–64: its own header re-printed at
   row 56 with its own column-letter sub-labels at row 57, then Sr. 51
   through Sr. 57, seven named categories under the Final Tax regime).
   Both tables share the same five amount columns (E–I), but column F and
   column I carry materially different labels per table — confirmed
   independently from the raw shared-strings table (index 300 "Tax
   Collectible / Deductible" for the first table's column F vs. index 309
   "Final Tax Chargeable" for the second table's column F; index 303
   "Minimum Tax Chargeable" vs. index 310 "Difference (Option Valid if
   <=0)") — modelled as distinct field labels/descriptions per table, not
   the same column reused.
3. **The second table's own Sr. numbering independently restarts from 51**
   rather than continuing from the first table's own Sr. 51 (row 55) — both
   tables happen to reach/start at Sr. 51 as their own last/first row
   respectively, a genuine printed-numbering coincidence, quoted verbatim
   and disclosed, not corrected. Every field sourced from the second table
   carries "(second table, restarting its own Sr. numbering from 51)" in
   its own `description` to disambiguate from the first table's own
   identically-numbered Sr. 51 row.
4. **`dataValidation` coverage is uneven across this sheet's own printed
   entry cells — every printed cell is still modelled as a field
   regardless.** The sheet's own single `dataValidation` rule (`type="whole"`,
   `operator="greaterThanOrEqual"`, `formula1=0`, `sqref="I3 E12:I55"`) was
   independently parsed: `I3` covers the NTN cell; `E12:I55` covers all five
   amount columns for the first table's own Sr. 8 through Sr. 51 rows (rows
   12–55) only. The headline Sr. 1 total (row 5) and Sr. 2 through Sr. 7
   (rows 6–11, the six lowest-numbered import categories) carry **no**
   numeric-entry validation on this sheet, and the entire second table
   (rows 58–64) carries **none** either. Every printed, fillable cell is
   nonetheless modelled as a field regardless of whether it carries a
   `dataValidation` rule — the rule is treated as an added numeric
   constraint where present, not a signal of a field's existence —
   consistent with this workbook's own Annex-A/Annex-D precedent.
   `validation.minimum: 0` is applied only to the 250 fields sourced from
   rows 12–55 (fifty categories × five columns); the 5 Sr.-1 fields and the
   35 second-table fields (seven categories × five columns) carry no
   `minimum`.

## Structural findings disclosed, not corrected

1. **Sr. 1's own printed label, "Minimum Tax Chargeable [Col.E Sum of 2 to
   6]", is internally inconsistent with the table's own actual row range.**
   The label states the sum spans Sr. 2 to Sr. 6 (five categories, rows
   6–10), but the table's own data rows in fact continue through Sr. 51
   (row 55, fifty categories) — a genuine discrepancy between the printed
   formula description and the sheet's own actual content, quoted verbatim
   in that field's own description and disclosed, not corrected. Unlike
   Annex-A's own headline total (which carried the identical numeric-entry
   `dataValidation` constraint as its own components and was modelled with
   `validation.minimum: 0`), this row is **not** covered by this sheet's own
   `dataValidation` rule — a computed subtotal by this workbook's own
   general convention, modelled with no `minimum` constraint.
2. **One genuine duplicate FBR classification code.** Code `64060059` is
   printed twice on this sheet: at Sr. 25 as "Payment for goods u/s 153(1a)
   @ 4.5%" (row 29) and again at Sr. 35 as "Payment for Goods u/s 153(1)(a)
   @4.5%" (row 37) — differing only in capitalization and inner-
   parenthesization of the section citation. Modelled as two independently
   fillable rows (`paymentGoodsUs1531aLowerAt4Point5PercentSr25*` /
   `paymentGoodsUs1531aUpperAt4Point5PercentSr35*` field-name suffixes)
   consistent with their own distinct printed positions on the sheet, not
   merged.
3. **A second, unrelated section-citation inconsistency.** "153(1a)" (no
   inner parentheses around "1") and "153(1)(a)" (parenthesized) are both
   used on this same sheet for otherwise equivalent categories (Sr. 23–25
   vs. Sr. 33–35) — both forms quoted verbatim as printed, not normalized.
4. **Six source-document spelling/typography artifacts**, each quoted
   verbatim in its own field's `description` and corrected in the field's
   own `label`/name for legibility: Sr. 2 prints "mport u/s 148 @1%"
   (missing leading "I"); Sr. 14 prints "consruction"/"instalation" (for
   "construction"/"installation"); Sr. 17 prints a "©" glyph in place of
   "(c)"; Sr. 18 prints "re-instruance" (for "re-insurance"); Sr. 20 prints
   "ddeduction"/"anyother" (for "deduction"/"any other"); Sr. 27 prints
   "specified for Services" (a doubled "for"); and Sr. 54 (second table)
   prints "Sale Proceeds of of goods" (a doubled "of").
5. **`mergeCells` block (7 entries).** Independently parsed and confirmed:
   `A1:I1` (title), `A2:B2`/`C2:G2` and `A3:B3`/`C3:G3` (Name/CNIC
   label-and-value pairs), `A58:A64` — an empty, unlabelled vertical merge
   in the second table with no text, formula, or value in any constituent
   cell (confirmed empty from the raw `sheetData` and not modelled), and
   `A5:A39` — the rotated "Minimum Tax Chargeable" section label, which
   spans only rows 5–39, not the full first table's own row range (5–55) —
   a genuine, disclosed layout asymmetry (the printed vertical label runs
   out sixteen rows before its own table's last data row), not corrected.
6. **Row 65's own bare "Signature:" (cell A65) / "Date:" (cell H65) footer
   carries no accompanying declaration paragraph**, the same shape already
   disclosed for Annex-A's/Annex-C's/Annex-D's own footers — modelled as a
   single optional `declarationDate` field, no `documents[]` attestation
   entry.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/pk/fbr/annexure-e-minimum-final-tax-chargeable/1.0.0/`: 2 valid
scenarios plus 6 mutation-control fixtures, each derived from one of the
valid fixtures by a single targeted mutation. All 8 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`, not committed to the repo) before being
finalized:

- `valid-few-categories.json` (a taxpayer reporting a handful of Minimum Tax
  import/services categories) — **0 errors**.
- `valid-mixed-both-tables.json` (a taxpayer reporting the Sr. 1 headline
  total, several Minimum Tax categories including both Sr.-25/Sr.-35
  duplicate-code rows, several Final Tax categories, and a signed
  `declarationDate`) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets a `dataValidation`-covered
  Minimum Tax column field to a negative amount, violating `minimum: 0`) —
  **exactly 1 error**.
- `mutation-control-negative-ntn.json` (sets `taxpayerNtn` to a negative
  value) — **exactly 1 error**.
- `mutation-control-invalid-declaration-date-type.json` (sets
  `declarationDate` to a non-date value) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — **700/700** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **700/700**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-e-minimum-final-tax-chargeable/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (700 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-E"
(Minimum Tax Chargeable / Final Tax Chargeable) structure — identification
block and all fifty-eight named line items across both tables with their
five per-column fields each — is fully transcribed from the genuine,
currently-served official Tax Year 2024 edition (a fillable Excel workbook,
not a government online-filing system), but no live filing through FBR's
own IRIS e-filing channel was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the Islamic Republic of Pakistan or the Federal Board of
Revenue.
