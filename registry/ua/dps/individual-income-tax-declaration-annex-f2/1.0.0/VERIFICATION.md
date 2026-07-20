# Verification record — `ua/dps/individual-income-tax-declaration-annex-f2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4002**, authoring child
issue **GOV-4004**), deepening Ukraine's own disclosed Taxes backlog — the
ten companion schedules the GOV-3531 cycle disclosed but did not model when
it authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which five (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК)
were already modelled by the GOV-3588, GOV-3623, GOV-3632, GOV-3641, and
GOV-3907/GOV-3996 cycles respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Ukraine's own disclosed Taxes backlog (five
remaining companion schedules — ЄСВ1, ЄСВ2, ЄСВ3, Ф2, Ф3 — to the
already-published main declaration) remains the strongest immediately-
actionable candidate: the source workbook is already fetched, hashed, and
structurally inventoried across six prior cycles (GOV-3531, GOV-3588,
GOV-3623, GOV-3632, GOV-3641, GOV-3996), so no new source-discovery risk is
involved.

The GOV-3632 cycle had already sized Ф2 at "183 rows, 278 merges" — its own
"next-smallest at 183 rows (Ф2)" note — in its pre-sizing table of remaining
sheets. This cycle picked Ф2 over the remaining ЄСВ1/ЄСВ2/ЄСВ3/Ф3 candidates
(none of which had been sized yet) precisely because its size was already
known and bounded, re-confirmed this cycle via a fresh `XLSX.readFile` read:
`!ref` = `A1:CR183`, 278 merges — matching that pre-sizing note exactly.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all five prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `Ф 2` sheet.
  - **Cited URL (same as the parent declaration and all five prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and all five prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all five
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across seven cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua-f2`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `Ф 2`).
    The `Ф 2` sheet (`!ref` = `A1:CR183`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    dumping every non-empty cell to confirm the sheet's printed content in
    full, and cross-referenced against the workbook's own `!merges` array
    (278 entries for this sheet) to resolve exactly which row/column range
    each header label, entry row, and line-code/amount pair spans.

### Structure confirmed

The `Ф 2` sheet's 102-row printed extent (rows 103-183 are blank print-area
padding) resolves to a taxpayer-identification/declaration-type/period
header, two parallel income-and-tax-computation halves (one for business
activity, one for independent professional activity), and a signature block:

- **Header** (rows 10-22): taxpayer identification (RNOKPP or, for religious
  objectors, passport series/number), declaration type (Звітна/Звітна
  нова/Уточнююча — the same three-value enum as the parent declaration's
  and all five prior annexes' own `declarationType`), and reporting/
  corrected period. This header **does carry a companion "місяць" (month)
  column in both period boxes** (row 22: `AE22`/`BG22`, each labelled
  `місяць1`) — matching Annex АП's convention rather than Annex Ф4's,
  Annex МПЗ's, Annex Ф1's, or Annex КІК's own year-only header. Footnote 1
  (row 97) confirms the same scope Annex АП's own footnote 1 already
  established: filled in only by individual entrepreneurs who ceased
  business activity during the reporting (tax) year and filed under the
  second paragraph of Article 177.11 (Section IV) of the Tax Code of
  Ukraine.
- **Section I — business-activity income** (rows 24-38): a fixed printed
  capacity of exactly **4 entry rows** (34-37) before its own `УСЬОГО` total
  row (38) — the largest single repeating table modelled by any UA DPS
  annex authored so far (versus Annex Ф4's 3-entry and Annex МПЗ's 4-entry
  tables, and Annex Ф1's single-entry table). Each entry: economic-activity
  name, its own classification code (КВЕД), income received, and a four-way
  documented-expense breakdown (materials, wages, other expenses,
  depreciation) feeding a computed net taxable income (`графа 4 – графа 5 –
  графа 6 – графа 7 – графа 8`, confirmed via the sheet's own printed
  column-9 formula).
- **Section II — depreciation** (rows 40-48): a **fixed 4-group
  classification** (line codes `А1`-`А4`, per sub-clause 177.4.9 of Article
  177.4 of Chapter IV of the Tax Code of Ukraine) — confirmed via `!merges`
  to be a fixed enumeration, not a user-extensible repeating table (unlike
  Section I/IV's own entry tables). Each group: asset value at the start
  and end of the reporting period, and its own computed depreciation
  amount, plus a `УСЬОГО` total row (48).
- **Section III — budget settlement, business-activity** (rows 50-63): PIT
  computation (lines 1-1.4: tax liability, self-assessed during the year,
  the fuel-retailer advance-payment credit from Annex АП capped at the
  remaining liability, and the final payable amount) and military-levy
  computation (lines 2-2.3, the same structure) — both confirmed via
  `!merges` to place their value cells in column `BL`.
- **Section IV — independent-professional-activity income** (rows 65-81): a
  fixed printed capacity of exactly **6 entry rows** (75-80) before its own
  `УСЬОГО` total row (81) — the largest of any UA DPS annex table so far.
  Each entry: activity category (an enum of 14 values per the sheet's own
  footnote list at row 83 — notary, lawyer, insolvency practitioner,
  private enforcement officer, forensic expert, auditor, accountant,
  appraiser, engineer, architect, religious/missionary worker, scientific/
  literary/artistic/educational worker, physician, or other), activity
  name/code, income, a three-way expense breakdown (materials, wages,
  other), and computed net taxable income.
- **Section V — budget settlement, independent-professional-activity**
  (rows 87-95): PIT (line 3.1) and military levy (line 4.1), each a single
  payable-amount line with no self-assessed/advance-payment sub-lines
  (unlike Section III) — confirmed via `!merges` (value cells in column
  `BL`).
- **Footnote and signature block** (rows 83-102): the activity-category
  legend (row 83, modelled as the `independentActivityNCategory` enum's own
  `description`), footnote 1 (row 97, modelled as `reportingPeriodMonth`'s/
  `correctedPeriodMonth`'s own `description`), and the signature block
  ("Фізична особа – платник податку або уповноважена особа", "(підпис)",
  "(власне ім'я та прізвище)"). Confirmed, by dumping every non-empty cell
  across the sheet's full extent, that **no accuracy-attestation sentence**
  exists anywhere on this sheet — matching Annex Ф1's and Annex КІК's own
  finding (unlike Annex Ф4/МПЗ/АП, each of which prints one). `documents` is
  therefore omitted entirely, per the spec's own `minItems: 1` constraint on
  that array.

## Scope and disclosed boundaries

This schema models the `Ф 2` sheet **in full**: the shared header, both
fixed-capacity entry tables (Section I's 4 business-activity rows and
Section IV's 6 independent-professional-activity rows) plus their own total
rows, Section II's fixed 4-group depreciation computation, and both
Section III's and Section V's own budget-settlement computations. Scoping
decisions made and documented here rather than silently:

- **Section I and Section IV's entry tables are modelled with indexed field
  names (`businessActivity1`-`businessActivity4`, `independentActivity1`-
  `independentActivity6`)** rather than a repeating-array construct, matching
  this registry's own established convention for every other UA DPS annex's
  fixed-capacity table (Annex Ф4's 3 entries, Annex МПЗ's 4 entries).
- **Section II's four depreciation groups are modelled as a fixed
  enumeration (`depreciationGroup1`-`depreciationGroup4`), not a
  user-extensible repeating table** — the sheet's own `!merges` structure
  confirms exactly 4 printed group rows (line codes `А1`-`А4`), tied to
  Article 177.4's own group classification for individual entrepreneurs
  rather than an open-ended asset register.
- **No `crossFieldValidation` rule ties `businessActivityTotal*`/
  `depreciationTotalAmount` back to Section I's own column-8 total
  (`businessActivityTotalDepreciationAmount`).** The sheet itself prints no
  explicit formula linking Section II's total depreciation amount to
  Section I's own amortization column — this cycle transcribed both totals
  independently rather than inventing an equality the source text does not
  state, consistent with this registry's own established practice of
  reserving `crossFieldValidation` for comparisons the source text states
  explicitly.
- **Two `crossFieldValidation` rules are included**, both directly stated by
  the sheet's own printed formulas: `businessPitPayableAmount` ≤
  `businessPitTaxLiabilityAmount` (line 1.4's own "додатне значення"
  (positive value) wording) and `businessMilitaryLevyPayableAmount` ≤
  `businessMilitaryLevyTaxLiabilityAmount` (line 2.3's own, same wording).
- **`businessPitFuelRetailAdvancePaymentAmount` (line 1.3) is documented as
  cross-referencing Annex АП's own total** (`ua/dps/individual-income-tax-declaration-annex-ap`)
  in its `description`, but no `crossFieldValidation` rule enforces that
  link, since the two schedules are separately filed sheets within the same
  workbook and this registry does not model cross-schema numeric
  constraints (consistent with Annex КІК's own treatment of its numbered
  cross-references to the main declaration).
- **No `documents` attestation entry (the key is omitted entirely, not an
  empty array)** — see "Structure confirmed" above.
- **Row/line numbers and the activity-category legend are not modelled as
  standalone fields.** Line codes (1, 1.1-1.4, 2, 2.1-2.3, 3, 3.1, 4, 4.1)
  are fixed, printed labels transcribed into each field's own `sourceRef`;
  the 14-value activity-category legend (row 83) is transcribed into the
  `independentActivityNCategory` fields' own `description` and `enum`
  rather than modelled as a separate lookup field.
- **`reportingPeriodMonth`/`correctedPeriodMonth` reuse Annex АП's own
  footnote-1 modelling** (optional integer, 1-12, gated to cessation-of-
  business-activity filings) rather than Annex Ф4/МПЗ/Ф1/КІК's year-only
  convention, since this sheet's own header genuinely carries the month
  column (see "Structure confirmed" above) — a real structural difference
  from the five prior annexes' own headers, not an oversight.
- **Every substantive content field beyond the shared header (taxpayer ID,
  declaration type, reporting year) is modelled as not required**, for
  consistency with this registry's established treatment of every other UA
  DPS annex's own primary content fields, since no automated validator can
  know in advance whether a given filing carries business income,
  independent-professional income, or both.

**Not modelled, left as open backlog:**

- The other four companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, Ф3) remain open backlog for future
  companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too
  — see "Why this candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-f2/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the three shared header fields, and one fuller `corrective`-type
filing exercising the full header including both month fields, one
business-activity entry plus its section totals, one depreciation group
plus its total, both Section III lines, one independent-professional-
activity entry plus its section totals, and both Section V lines) and 7
mutation-control fixtures (each expected to raise exactly 1 class of
error): a missing required `taxpayerTaxNumberOrPassport`, an invalid
`declarationType` enum value, a missing `correctedPeriodYear` when
`declarationType` is `corrective`, a negative
`businessActivity1IncomeAmount`, an invalid `independentActivity1Category`
enum value, an unknown field rejected, and a `crossFieldValidation`
violation (`businessPitPayableAmount` exceeding
`businessPitTaxLiabilityAmount`). All 9 were independently checked this
cycle with a fresh, from-scratch, throwaway Node/ajv mock validator built
directly from this schema's own `required`/`requiredWhen`/`validation`/
`crossFieldValidation` definitions (not committed, per this registry's
established per-cycle practice) — each fixture produced exactly the
expected pass/fail result. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass across the full registry with this schema
added (552/552).

## Known gaps

- The other four companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, ЄСВ3, Ф3) remain
  open backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule (the consular-mirrored PDF
  disclosed by the GOV-3537 cycle) and Ukraine's remaining DMV/National ID
  verticals (both previously found weak) were not re-screened this cycle.
- No `crossFieldValidation` rule ties Section II's depreciation total back
  to Section I's own amortization column total — see "Scope and disclosed
  boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all five prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
