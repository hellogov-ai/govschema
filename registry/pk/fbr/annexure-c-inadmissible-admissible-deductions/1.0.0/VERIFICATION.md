# Verification record — `pk/fbr/annexure-c-inadmissible-admissible-deductions` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5759, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first rather than trusting the
in-repo state from memory. The immediately preceding GOV-5752 cycle's own
`VERIFICATION.md`, and this document's own workbook siblings
(`pk/fbr/annual-individual-income-tax-return-it-1b`,
`pk/fbr/annual-individual-income-tax-return-it-2`,
`pk/fbr/annexure-a-adjustable-tax`,
`pk/fbr/annexure-b-manufacturing-trading-profit-loss-account`, and
`pk/fbr/wealth-statement`), had all explicitly named "Annexes C through F"
as this same nine-worksheet workbook's disclosed, open backlog — and the
16-jurisdiction "5 of 6 verticals" gap list had already been re-screened a
dead end across four consecutive prior cycles (GOV-5731, GOV-5738,
GOV-5745, GOV-5752). This cycle picked up Annex-C, the next of the four
remaining Annexes, rather than re-screening that same jurisdiction list a
fifth consecutive time.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-c-inadmissible-admissible-deductions` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures for this
    same workbook (GOV-3104, GOV-5731, GOV-5738, GOV-5745, GOV-5752),
    confirming no revision. No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped
    directly with Python's built-in `zipfile` module. An initial
    regex-based pass over the raw worksheet XML mis-attributed a header
    row's own shared-string values to the wrong cell references (a
    greedy-match artifact on adjacent self-closing `<c>` elements); this
    was caught by cross-checking against the same row's raw XML and
    corrected by re-parsing with Python's `xml.etree.ElementTree` instead,
    which was used for the sheet actually cited below.
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that
    `Annex-C` (`sheetId="14"`) maps to `r:id="rId5"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet5.xml` —
    the worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every
    prior cycle's own finding.

## Scope decisions

Annex-C ("Inadmissible / Admissible Deductions") is a self-contained,
single-worksheet reconciliation schedule: thirty-one named categories of
expenditure/provisions added back as inadmissible under specific sections
of the Income Tax Ordinance, 2001 (mostly section 21, plus sections 28,
29, 34, and 67), followed by ten named categories of amounts admissible for
tax purposes (tax depreciation/amortization for the current year,
unabsorbed carry-forwards from previous years, and accounting-vs-tax
gain/loss differences on disposals of intangibles/assets), each reported
as a single Amount (column E). Both sections' own headline rows ("Sr. 1 —
Inadmissible Deductions [Sum of 2 to 32]" and "Sr. 33 — Admissible
Deductions [Sum of 34 to 43]") are themselves computed subtotals of their
own listed components.

1. **Header block is formula-linked to Form IT-2, unlike Annex-A's own
   plain header.** Row 3's Name cell (`C3`) and row 4's CNIC cell (`C4`)
   each carry a formula —
   `IF('[2]IND (BUS PLUS)'!C3="","",'[2]IND (BUS PLUS)'!C3)` and the CNIC
   equivalent — pulling directly from the `IND (BUS PLUS)` (Form IT-2)
   worksheet in the same workbook. This is the same formula-linking
   pattern already disclosed for `pk/fbr/annexure-b-manufacturing-trading-profit-loss-account`,
   confirming this Annex, like Annex-B, is filed alongside Form IT-2
   rather than standalone — a genuine structural difference from Annex-A's
   own header, which carries no such formula. Tax Year (cell `E3`) is
   pre-filled `2024`. NTN (cell `E4`) is a genuine direct-entry cell, not
   formula-linked.
2. **This worksheet has no Address field and no Business Name field.**
   Like Annex-A (and unlike `IT-1B`/`IT-2`/`Wealth Statement`), there is no
   Address field. Unlike Annex-B, there is also no printed "Separate form
   should be filled for each business" instruction and no Business Name
   row — this schedule reconciles at the whole-taxpayer level, consistent
   with its Name/CNIC cells being formula-pulled directly from Form IT-2
   rather than re-entered per business instance.
3. **The NTN cell (`E4`) *is* covered by this worksheet's own
   `dataValidation` rule, unlike Annex-A's own NTN cell.** The sheet's
   single `dataValidation` rule (`type="whole"`,
   `operator="greaterThanOrEqual"`, `formula1=0`, `sqref="E4 E6:E48"`)
   explicitly includes `E4` — the same shape already disclosed for
   Annex-B's own NTN cell (`G5`/`G59`). `taxpayerNtn` is modelled with
   `validation.minimum: 0` accordingly.
4. **All 43 data rows (6–48), including both headline subtotals, are
   uniformly validated.** The same `dataValidation` rule's `E6:E48` clause
   covers the entire Amount column across every one of the 43 rows —
   **row 6 (Sr. 1, "Inadmissible Deductions [Sum of 2 to 32]") and row 38
   (Sr. 33, "Admissible Deductions [Sum of 34 to 43]") included**. This is
   the same materially different validation shape already disclosed for
   this workbook's Annex-A and Annex-B siblings (where the equivalent
   headline totals carry the identical constraint as their own
   components), and remains a genuine structural difference from the
   `IT-1B`/`IT-2`/`Wealth Statement` siblings, where the equivalent totals
   were excluded on the basis of carrying no validation rule at all.
   Because every row here carries the identical constraint, **this version
   models all 43 rows as individually reportable fields** —
   `inadmissibleDeductionsTotal`, `admissibleDeductionsTotal`, and every
   named component — following the same convention already established
   for Annex-A/Annex-B.
5. **Each line item's own FBR classification code (column D) is recorded
   in `sourceRef`/`description` text, not modelled as a separate field.**
   The codes (e.g. Sr. 1's `3239`, Sr. 19's `322902`) are fixed lookup
   keys printed on the source form as plain numeric cells (`numFmtId="0"`,
   General format — confirmed not a zero-padded text code that a plain
   `number` re-parse would corrupt), consistent with how Annex-A's and
   Annex-B's own line-item codes were handled.
6. **Row 49's bare "Signature:" / "Date:" footer, with no accompanying
   verification/declaration paragraph** (the same shape already disclosed
   for Annex-A's own row 48 footer), is modelled as a single optional
   `declarationDate` field; no `documents[]` attestation entry is included
   since there is no statement text to quote.

## Structural findings disclosed, not corrected

1. **No column-collapsing merge, unlike Annex-B's own Statement of
   Affairs section.** This worksheet's own `mergeCells` block (`A38:A48`,
   `A1:E1`, `A2:E2`, `A3:B3`, `A4:B4`, `A6:A37`) was independently parsed
   and contains only vertical section-label merges ("Inadmissible
   Deductions" spanning Sr. 1–32, "Admissible Deductions" spanning
   Sr. 33–43) and header-label merges — no analogue of Annex-B's own
   `<mergeCell ref="E69:F79"/>` that collapsed a printed multi-column
   layout into fewer usable columns. Every data row here has a single,
   genuinely independent Amount cell.
2. **Sheet `dimension` (`A1:X67`) extends beyond populated content.**
   Rows 50–63 carry no `<row>` element at all, and rows 64–67 contain only
   empty, styled-but-valueless cells with no text, formula, or numeric
   value of any kind — confirmed and not modelled, consistent with this
   worksheet not being printed across two pages (unlike Annex-A/Annex-B,
   which each repeat their identification header on a second page).
3. **All 43 Sr. numbers are present and sequential**, with no skip of the
   kind disclosed in the `Wealth Statement`'s own roman-numeral Inflows
   gap, Annex-A's own Sr. 7 skip, and Annex-B's own Sr. 49 skip — the
   first of this workbook's own Annex worksheets reviewed so far with no
   Sr.-numbering gap.
4. **Neither of the two known source-document label quirks in "grass"
   (Sr. 7, verbatim `"grass amount of supplies"`, evidently intended
   "gross") nor the trailing double space in Sr. 19's own label (`"Add
   Backs u/s 21(p) Utility bills exceeding prescribed amount not paid
   through prescribed mode   "`) was corrected** — both are quoted
   verbatim (trimmed only for the trailing whitespace, which carries no
   semantic content) in their own fields' `label`/`description`/`sourceRef`
   text, consistent with this registry's standing convention of disclosing
   rather than silently correcting source-document typos (cf. Annex-A's
   own `"zforiegn"` disclosure).

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/pk/fbr/annexure-c-inadmissible-admissible-deductions/1.0.0/`:
2 valid scenarios plus 6 mutation-control fixtures, each derived from one
of the valid fixtures by a single targeted mutation. All 8 were run
against a from-scratch, ephemeral field-by-field conformance checker
(derived directly from this schema's own `fields[]`, not committed to the
repo) before being finalized:

- `valid-few-add-backs.json` (a taxpayer reporting three inadmissible
  add-back categories and the matching `inadmissibleDeductionsTotal`, no
  admissible-side entries) — **0 errors**.
- `valid-full-reconciliation.json` (a taxpayer reporting every one of the
  43 lines — both subtotals and all 41 named components — plus a signed
  `declarationDate`) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-subtotal.json` (sets
  `inadmissibleDeductionsTotal` to a negative amount, violating
  `minimum: 0`) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets
  `addBackSection21hPersonalExpenditure` to a negative amount) —
  **exactly 1 error**.
- `mutation-control-negative-ntn.json` (sets `taxpayerNtn` to a negative
  value) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — **698/698** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **698/698**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-c-inadmissible-admissible-deductions/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (698 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-C"
(Inadmissible / Admissible Deductions) structure — identification block
and all 43 named reconciliation line items with their Amount fields — is
fully transcribed from the genuine, currently-served official Tax Year
2024 edition (a fillable Excel workbook, not a government online-filing
system), but no live filing through FBR's own IRIS e-filing channel was
attempted. GovSchema is an independent, non-profit standards body and is
not affiliated with, endorsed by, or operated by the Islamic Republic of
Pakistan or the Federal Board of Revenue.
