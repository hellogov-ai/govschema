# Verification record — `pk/fbr/annexure-a-adjustable-tax` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5745, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh first rather than trusting the
in-repo state from memory. Every jurisdiction disclosed at 5 of 6 verticals
was re-checked against the same 16-jurisdiction list the immediately
preceding GOV-5738 cycle had already re-confirmed a dead end (AE, BA, BR,
CZ, GR, ID, JM, MK, MN, MT, NO, PL, RW, SK, TN, TT) — no new lead found
among them. With no jurisdiction-closing candidate available, the
strongest actually-open, pre-sourced candidate was this workbook's own
disclosed backlog: both the sibling
`pk/fbr/annual-individual-income-tax-return-it-1b` document's own v1.0.0
(GOV-3104) and `pk/fbr/annual-individual-income-tax-return-it-2` document's
own v1.0.0 (GOV-5738) explicitly named "Annexes A–F" as this same
nine-worksheet workbook's open backlog. This cycle picked up Annex-A, the
first of the six.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annexure-a-adjustable-tax` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200, size
    **104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to every prior cycle's own recorded figures for this
    same workbook (GOV-3104, GOV-5731, GOV-5738), confirming no revision.
    No login/CAPTCHA gate.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`/pip/openpyxl available in this environment; unzipped
    directly with Python's built-in `zipfile` module and the target
    worksheet's `sheetData` rows, `sharedStrings.xml` string table, and
    `dataValidations` block were parsed by hand from the raw XML.
  - Confirmed via `xl/workbook.xml`'s own `<sheets>` element that
    `Annex-A` (`sheetId="12"`) maps to `r:id="rId3"`, which
    `xl/_rels/workbook.xml.rels` resolves to `xl/worksheets/sheet3.xml` —
    the worksheet parsed for this document. The workbook's full 9-sheet
    inventory (`IND (PROP-CG-OS)`, `IND (BUS PLUS)`, `Annex-A` through
    `Annex-F`, `Wealth Statement`) was re-confirmed identical to every
    prior cycle's own finding.

## Scope decisions

Annex-A ("Adjustable Tax Collected / Deducted") is a self-contained,
single-worksheet withholding-tax schedule: forty named categories, each a
tax collected/deducted at source under a specific section of the Income
Tax Ordinance, 2001 (imports u/s 148, directorship fees u/s 149,
profit-on-debt u/s 151, payments to non-residents u/s 152, payments for
goods u/s 153, motor-vehicle fees/taxes u/s 231B/234, utility bills u/s
236, property transfers u/s 236C/236K, and others), each reported as two
amounts: "Receipts / Value" (column H) and "Tax Collected / Deducted "
(column I).

1. **Header block modelled in full, but structurally narrower than its
   siblings.** Row 3 carries Name and Tax Year (pre-filled `2024`,
   consistent with the workbook's own title and every sibling worksheet's
   own header); row 4 carries CNIC and NTN. **This worksheet has no
   Address field at all**, unlike the `IND (PROP-CG-OS)` / `IND (BUS
   PLUS)` / `Wealth Statement` worksheets, each of which does carry one —
   a genuine, disclosed structural difference, not an omission by this
   schema.
2. **Neither the CNIC cell (`C4`) nor the NTN cell (`I4`) carries its own
   `dataValidation` rule on this worksheet** — this sheet's single
   `dataValidations` block (below) covers only the amount columns, `H7:I47`.
   By contrast, every sibling worksheet in this workbook does carry an
   explicit `type="whole"` rule constraining its own CNIC cell to exactly
   13 digits. This document applies the same 13-digit CNIC pattern to
   `taxpayerCnic` for consistency with the sibling worksheets from the
   same workbook, disclosed here as an applied convention rather than a
   rule independently confirmed on this specific sheet.
3. **All forty data rows (7–47), including the headline total, are
   uniformly validated.** The sheet's single `dataValidation` rule
   (`type="whole"`, `operator="greaterThanOrEqual"`, `formula1=0`,
   `sqref="H7:I47"`) covers both amount columns across every one of the
   forty rows — **row 7 (Sr. 1, "Adjustable Tax [Sum of 2 to 38]", the
   headline total) included**. This is a materially different validation
   shape from every sibling worksheet in this same workbook, where the
   equivalent headline-total row was confirmed, by the *absence* of any
   numeric-entry validation rule, to be a computed subtotal and excluded
   from the schema on that basis (`IT-1B`'s own Property total, `IT-2`'s
   own Property total, and every one of the `Wealth Statement`'s fifteen
   category totals). Because this Annex's own total row carries the
   identical constraint as its own thirty-nine components, **this version
   models all forty rows as individually reportable fields** — the total
   (`adjustableTax`) and every named category — each split into its own
   `...Value` (column H) and `...Collected` (column I) field. This follows
   the same registry convention already used for `IT-2`'s Other Sources
   and Foreign Income sub-item breakdowns: a fixed, small, individually
   printed and coded set of line items, not a dynamic repeating table
   gated behind GSP-0009.
4. **Row 48's bare "Signature: ___ Date: ___" footer, with no
   accompanying verification/declaration paragraph** (unlike the sibling
   worksheets' own rows 76–77 / 71–73), is modelled as a single optional
   `declarationDate` field; no `documents[]` attestation entry is included
   since there is no statement text to quote.

## Structural findings disclosed, not corrected

1. **Sr. numbering is not sequential.** Sr. 7 is skipped entirely — row 12
   is Sr. 6 ("Import u/s 148 @ 4%"), row 13 is Sr. 8
   ("Directorship Fee u/s 149(3) @20%"). Two further rows (23 and 28)
   carry no Sr. number at all, each sitting between two numbered rows
   (Sr. 17/18 and Sr. 21/22 respectively) — the same "later insertion,
   not renumbered" signal already disclosed in the `Wealth Statement`
   document's own roman-numeral Inflows skip (`iv` to `vi`, no `v`).
   Modelled as `advanceTaxCashWithdrawal231AB` (row 23) and
   `advanceTaxForeignDomesticWorkers231C` (row 28), named for their own
   printed labels rather than a fabricated Sr. number.
2. **A likely source-document typo, quoted verbatim and disclosed, not
   corrected.** Row 28's own printed label reads `"Advance tax on
   zforiegn domestic workers u/s 231C"` — quoted exactly as printed
   (`[sic]`) in the `advanceTaxForeignDomesticWorkers231C` fields'
   `description`, rather than silently corrected to "foreign."
3. **CNIC constraint applied by convention, not independently confirmed on
   this sheet** — see Scope decision 2 above.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/pk/fbr/annexure-a-adjustable-tax/1.0.0/`: 2 valid scenarios
plus 5 mutation-control fixtures, each derived from one of the valid
fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`, not committed to the repo)
before being finalized:

- `valid-single-category-import.json` (a taxpayer reporting a single
  withholding category — Import u/s 148 @1% — plus the matching
  `adjustableTax` total) — **0 errors**.
- `valid-multiple-categories-mixed.json` (a taxpayer reporting several
  withholding categories spanning import, non-resident payment,
  motor-vehicle registration, and electricity-bill withholding, plus the
  matching total) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `taxYear`) —
  **exactly 1 error**.
- `mutation-control-missing-required-cnic.json` (drops `taxpayerCnic`) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets
  `importGoods148At1PercentValue` to a negative amount, violating
  `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-declaration-date-type.json` (sets
  `declarationDate` to the non-date string `"not-a-date"`) — **exactly 1
  error**.

## Structural validation

- `node tools/validate.mjs` — **696/696** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **696/696**.
- `node tools/verify-sources.mjs registry/pk/fbr/annexure-a-adjustable-tax/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (696 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Annex-A"
(Adjustable Tax Collected / Deducted) structure — identification block
and all forty named withholding-tax categories with their receipts/value
and tax-collected/deducted amounts — is fully transcribed from the
genuine, currently-served official Tax Year 2024 edition (a fillable
Excel workbook, not a government online-filing system), but no live
filing through FBR's own IRIS e-filing channel was attempted. GovSchema is
an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Islamic Republic of Pakistan or the
Federal Board of Revenue.
