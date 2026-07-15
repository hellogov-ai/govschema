# Verification record — `pk/fbr/annual-individual-income-tax-return-it-1b` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3104, delegated from GOV-3101)

The prior GOV-3101 cycle ("GovSchema Standard Research") scouted Pakistan
alongside other candidates while opening Israel's Visa vertical, and found
FBR's official "Manual Return" workbook for individuals a strong,
cleanly-sourced Taxes-vertical candidate — but judged it too large to author
accurately within that same cycle's effort budget (a 9-worksheet composite
workbook) and delegated it as a standalone child issue, GOV-3104, with
pre-verified sourcing (URL, sha256, byte count, worksheet inventory). This
cycle (GOV-3109, "GovSchema Standard Research") found GOV-3104 unclaimed and
picked it up directly rather than re-scouting fresh candidates, since it was
already a fully pre-verified, ready backlog item.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annual-individual-income-tax-return-it-1b` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx`: <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — re-fetched independently this cycle via plain `curl`: HTTP 200,
    **size 104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` — both
    figures exactly matching GOV-3104's own pre-recorded sourcing notes. No
    login/CAPTCHA gate on this direct `download1.fbr.gov.pk` URL, linked
    from `fbr.gov.pk/income-tax-return-form/51147/131234`.
  - This is a native Office Open XML `.xlsx` (a zip archive of XML parts),
    not a PDF. No `unzip`, `pip`, or `openpyxl` was available in this
    environment; the archive was unzipped directly with Python's built-in
    `zipfile` module and every worksheet's `sheetData` rows,
    `sharedStrings.xml` string table, cell `style` (`s`) attributes, and the
    workbook's own `dataValidations` rules were parsed by hand from the raw
    XML (`xl/workbook.xml`, `xl/_rels/workbook.xml.rels`,
    `xl/worksheets/sheetN.xml`, `xl/sharedStrings.xml`).
  - Confirmed **9 worksheets** via `xl/workbook.xml`'s `<sheets>` element,
    cross-checked against each worksheet's own printed title row: `IND
    (PROP-CG-OS)` (Form IT-1B, this document's scope), `IND (BUS PLUS)`
    (Form IT-2, the business-income variant), `Annex-A` through `Annex-F`,
    and `Wealth Statement` (the section-116 net-worth statement).

## Scope decisions

The workbook is a 9-worksheet composite spanning far more than one return.
Modeling all of it in one version would require field-by-field
transcription of several large, structurally distinct schedules well beyond
what a single cycle can transcribe and independently cross-check with
confidence. This v1.0.0 is scoped to the **"IND (PROP-CG-OS)" worksheet
alone** (Form IT-1B, for individuals with property/capital-gains/other-
sources/foreign/AOP-share income — i.e. everything other than salary or
business income, which the sibling "IND (BUS PLUS)"/Form IT-2 worksheet
covers instead):

1. **Identification block modeled in full**: taxpayer name, CNIC, NTN,
   address, and tax year (row 4–6 of the worksheet).
2. **The Property income sub-item breakdown (Sr. 2–10 — rent received,
   1/10th-not-adjusted amounts, forfeited deposits, unrecoverable-rent
   recovery, unpaid liabilities, the 1/5th building-repairs allowance,
   insurance premium, local rate/tax, and other deductions) is out of
   scope, and so is the Property category total itself (Sr. 1, code
   2000).** This was not an arbitrary cut: the worksheet's own
   `dataValidations` block has **no numeric-entry rule at all** covering
   row 9 (Sr. 1's own row), while every other in-scope income/allowance
   line does carry one — confirming Sr. 1 is a computed subtotal (summing
   Sr. 2–10), not an independently, directly-entered figure, consistent
   with the sibling IT-2 worksheet's own explicit row label "Income/(loss)
   from property [Sum of 2 to 10]" (the IT-1B worksheet's row 9 omits that
   bracket text, but the underlying structure — a category total rolling
   up ten sub-items — is the same).
3. **Six unambiguous headline totals modeled, each as a single reported
   number rather than the worksheet's own multi-column breakdown** (see
   point 5): Capital Gains (Sr. 11, code 4000), Other Sources Income (Sr.
   12, code 5000), Foreign Income (Sr. 13, code 6000), AOP untaxed income
   share (Sr. 14, code 3131), AOP taxed income share (Sr. 15, code 3141),
   and Total Income (Sr. 16, code 9000) — plus, from the Deductible
   Allowances section, Deductible Allowances Total (Sr. 17, code 9009),
   Zakat u/s 60 (Sr. 18, code 9001), Education Expenses u/s 60D (Sr. 19,
   code 9008), and Taxable Income (Sr. 20, code 9100).
4. **A source-document artifact was found and disclosed, not silently
   corrected**: Sr. 17's own printed label reads "Deductible Allowances
   [18+19+20]", implying it sums Sr. 18, 19, *and* 20. But Sr. 20 is
   "Taxable Income [16-17]" — a figure computed *after* Deductible
   Allowances (Sr. 17), and therefore cannot itself be one of Sr. 17's own
   addends. Only Sr. 18 (Zakat) and Sr. 19 (Education Expenses) exist as
   real sub-items of Sr. 17 elsewhere in the worksheet. This is disclosed
   in both `schema.json`'s field-level `description` for
   `deductibleAllowancesTotal` and in the CATALOG.md update, quoted
   verbatim rather than reinterpreted.
5. **The worksheet's own three-column layout (headed "Total Amount" /
   "Amount Exempt from Tax or Subject to Fixed/Final Tax" / "Amount Subject
   to Normal Tax" for income lines, redefined to "Total" / "Inadmissible" /
   "Admissible" for the Deductible Allowances lines) is out of scope for
   this version.** This was independently confirmed as a *genuinely
   inconsistent* structure, not a uniform three-column form, by decoding
   the worksheet's single `greaterThanOrEqual 0` data-validation rule's
   `sqref` cell-range union cell-by-cell: Sr. 11/12 (rows 19–20) validate
   only two of the three columns (I and J, not H); Sr. 13/14/16 (rows
   21/22/24) validate all three; Sr. 15 (row 23) validates only H and J;
   Sr. 17/18/19 (rows 26–28) validate all three; Sr. 20 (row 29, Taxable
   Income) validates **only column J**. Rather than fabricate a uniform
   H/I/J split this source itself does not apply consistently, each in-
   scope line is modeled as one reported total.
6. **CNIC format independently confirmed from the source's own
   data-validation rule, not an external reference.** Cell `C5` (the
   taxpayer CNIC field) and cell range `G76:H76` (the verification
   block's declarant-CNIC field) both carry an identical `type="whole"`
   rule bounded `[1000000000000, 9999999999999]` — i.e. exactly a 13-digit
   whole number — modeled as `taxpayerCnic`/`declarantCnic`'s
   `pattern: "^\\d{13}$"`. Cell `J5` (the NTN field) carries a separate
   `type="whole"` rule bounded `[1, 99999999]` (up to 8 digits), modeled as
   `taxpayerNtn`'s `pattern: "^\\d{1,8}$"`.
7. **A second, unrelated artifact was identified and excluded as template
   noise**: stray non-zero values (e.g. `734500`) left in an otherwise-
   unused spreadsheet column (C4) on two rows of this worksheet, outside
   the three defined amount columns. Not modeled as a field.
8. **The verification/declaration paragraph (rows 76–77) is modeled as a
   `documents[]` `attestation` entry**, quoted verbatim, following this
   registry's established convention for signed/quoted declaration text.
   Its blanks — declarant name, declarant CNIC, and the printed "Self /
   Representative" capacity choice (referencing section 172 of the Income
   Tax Ordinance, 2001) — are modeled as `declarantName`, `declarantCnic`,
   and the `declarantCapacity` enum, all `required: true`.
9. **Out of scope for this version, disclosed here rather than silently
   omitted**: the Property sub-item breakdown and total (Sr. 1–10, see
   point 2 above); the Computations/tax-liability section (Sr. 21–33: tax
   chargeable, normal income tax, tax credits, advance tax, admitted/
   demanded/refundable tax, agriculture income and its tax — arithmetic
   derived from the return, not primary taxpayer-supplied data); the
   Final/Fixed/Minimum/Average/Relevant/Reduced Tax withholding schedule
   (Sr. 34–65, dozens of withholding-tax-rate categories for dividends,
   imports, prize money, capital gains on securities/immovable property,
   etc. — confirmed via a distinct data-validation header redefinition at
   row 43, "Receipts/Value" / "Tax Collected/Deducted" / "Tax Chargeable",
   marking a genuine section boundary); Annexes A through F; the mandatory
   Wealth Statement (section 116 of the Income Tax Ordinance — a 180-row,
   27-major-line-item net-worth statement with bounded repeating sub-items
   per asset category, a strong companion-schema candidate for a future
   cycle); and the sibling "IND (BUS PLUS)" worksheet (Form IT-2).

## Conformance fixtures (Phase 3)

6 fixtures committed under
`conformance/pk/fbr/annual-individual-income-tax-return-it-1b/1.0.0/`: 2
valid scenarios plus 4 mutation-control fixtures, each derived from one of
the valid fixtures by a single targeted mutation. All 6 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`, not committed to
the repo) before being finalized:

- `valid-self-filer-minimal-income.json` (a self-filing individual
  reporting only Total Income and Taxable Income, no capital gains/foreign/
  AOP income or deductions) — **0 errors**.
- `valid-representative-filed-with-deductions.json` (capital gains, other-
  sources, foreign, and both AOP income-share lines populated, Zakat and
  education-expense deductions claimed, filed via a representative) —
  **0 errors**.
- `mutation-control-missing-required-field.json` (drops `taxpayerAddress`) —
  **exactly 1 error**.
- `mutation-control-invalid-enum-declarant-capacity.json` (sets
  `declarantCapacity` to `AGENT`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to a
  12-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets `totalIncome` to `-50000`,
  violating `minimum: 0`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/pk/fbr/annual-individual-income-tax-return-it-1b/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/pk/fbr/annual-individual-income-tax-return-it-1b/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **469/469**; `node tools/validate-ajv.mjs` → **469/469**.
- `node tools/verify-sources.mjs registry/pk/fbr/annual-individual-income-tax-return-it-1b/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (469 entries).

## Maturity

`structural-reference`: the source workbook's own printed "IND
(PROP-CG-OS)" structure — identification block, six headline income/
allowance totals, and the verification declaration — is fully transcribed
from the genuine, currently-served official Tax Year 2024 edition (a
fillable Excel workbook, not a government online-filing system), but no
live filing through FBR's own IRIS e-filing channel was attempted.
GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Islamic Republic of
Pakistan or the Federal Board of Revenue.
