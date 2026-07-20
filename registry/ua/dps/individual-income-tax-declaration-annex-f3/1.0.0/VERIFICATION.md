# Verification record — `ua/dps/individual-income-tax-declaration-annex-f3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4017**, authoring child
issue **GOV-4019**), deepening Ukraine's own disclosed Taxes backlog — the
ten companion schedules the GOV-3531 cycle disclosed but did not model when
it authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which seven (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК,
Annex Ф2, Annex ЄСВ3) were already modelled by the GOV-3588, GOV-3623,
GOV-3632, GOV-3641, GOV-3907/GOV-3996, GOV-4002/GOV-4004, and GOV-4010
cycles respectively.

## Why this candidate

This cycle's own issue (GOV-4019) had already sized all three then-remaining
sheets fresh (`XLSX.readFile` + `!ref`/`!merges` count), re-confirmed
independently this cycle:

| Sheet   | `!ref`        | `!merges` | Own structure                          |
|---------|---------------|-----------|------------------------------------------|
| ЄСВ 1   | `A1:CA244`    | 241       | fixed 12-month repeating table         |
| ЄСВ 2   | `A1:CZ250`    | 211       | fixed 12-month repeating table         |
| **Ф 3** | **`A1:BQ420`**| **202**   | **no repeating table — fixed line items** |

Both ЄСВ1 and ЄСВ2 carry a full twelve-month repeating table (the same
category of structure this registry's Annex ЄСВ3 cycle already modelled for
its own audit-year table), while Ф3 is a fixed-line-item computation sheet
with no repeating block of unknown size — smaller and more clean-bounded by
structure, even though its own printed content (rows 1-117) runs longer than
ЄСВ1's or ЄСВ2's own twelve-row tables. This makes Ф3 the clearer next
candidate of the three, matching this registry's established "clean, fully
bounded structure over raw row count" heuristic from prior UA DPS annex
cycles (e.g. Annex МПЗ's and Annex Ф1's own low-merge-count selections).

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all seven prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `Ф 3` sheet.
  - **Cited URL (same as the parent declaration and all seven prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and all seven prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all seven
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across nine cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua_dps_f3`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `Ф 3`).
    The `Ф 3` sheet (`!ref` = `A1:BQ420`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    and cross-referenced against the workbook's own `!merges` array (202
    entries for this sheet) to resolve exactly which column range each
    header label and value box spans.

### Structure confirmed

The `Ф 3` sheet's 117-row printed extent (rows 118-420 are blank print-area
padding, and the sheet itself prints its own literal "Продовження додатка
Ф3" — continuation-of-annex-Ф3 — page-break marker at row 79, not modelled
as data) resolves to a title/header block, a fixed eleven-category expense
list with its own total row (Section I), a computation of the tax-credit
refund for those eleven general expense categories (Section II), a parallel
computation for Diia City share-acquisition expenses under sub-clause
166.3.10 (Section III), footnotes, and a signature block:

- **Title block and taxpayer identification** (rows 1-14): the receipt-
  stamp placeholder (not modelled, officer-facing), the "Додаток Ф3 до
  податкової декларації про майновий стан і доходи" heading, the
  calculation's own subtitle ("Розрахунок суми податку, на яку
  зменшуються податкові зобов'язання з податку на доходи фізичних осіб, у
  зв'язку з використанням права на податкову знижку"), and the taxpayer
  identification field (rows 11-14) — the same either/or RNOKPP-or-passport
  wording as all seven prior annexes' own field, at this sheet's own
  (earlier) row numbers.
- **Declaration type/period header** (rows 16-19): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's and all seven prior annexes' own `declarationType`) and
  reporting period. Confirmed via direct inspection that this header
  carries no companion "місяць" (month) column in either period box —
  matching Annex Ф4's, Annex МПЗ's, and Annex Ф1's own convention rather
  than Annex АП's month-bearing one.
- **Розділ I — eleven-category expense list** (rows 54-72): a header
  ("Код рядка" / "Категорія понесених витрат" / "Норма Податкового кодексу
  України" / "Перелік витрат..." / "Сума фактично понесених витрат")
  followed by a fixed list of exactly eleven numbered expense categories
  (rows 61-71, category numbers "1" through "11", one of them "4*" and one
  "9**" carrying footnote markers) drawn directly from clause 166.3 of
  Article 166 of the Tax Code of Ukraine (mortgage interest, charitable
  contributions, education, healthcare, life insurance/pension
  contributions, reproductive technology/adoption, alternative-fuel vehicle
  conversion, affordable housing, IDP housing rent, COVID-19 treatment, and
  other expenses), each with its own amount input cell (column `BG`), plus
  a "Усього витрат" (Total expenses) row (row 72, line code "2") with its
  own total amount cell. Only the total row carries an explicit "код
  рядка" value in column `B` (the eleven category rows themselves are
  numbered only in their own "Категорія" column, not the "Код рядка"
  column) — confirmed by inspecting every cell in columns `B` and `E` for
  rows 61-71.
- **Розділ II — tax-credit computation for the eleven general categories**
  (rows 74-93, continuing on a second printed page after row 79's own
  "Продовження додатка Ф3" marker): a `Код рядка`/text/`Сума (грн, коп.)`
  three-column layout, line codes 3 through 10. Confirmed cell-by-cell
  which lines carry their own genuine input/computed value (their own `AX`
  merge holds a distinct printed formula) versus which lines are pure
  headers introducing a two-part rate split with no formula of their own:
  - **Line 3** (`totalEligibleExpenseAmount`): the total eligible-expense
    carry-forward opening this section.
  - **Line 4** (`totalWageIncomeSubjectToTaxAmount`): a genuine total —
    the sheet's own text explicitly ties it to "графа 3 рядка 10.1
    декларації" (column 3 of line 10.1 of the parent declaration) — split
    by rate into lines 4.1/4.2.
  - **Line 5** (`wageTaxWithheldAmount`): the PIT withheld from wages.
  - **Line 6**: "Частка (у відсотках) доходів, оподаткованих за різними
    ставками податку..." — a bare header introducing the 6.1/6.2
    percentage split, with **no formula or distinct printed value of its
    own** (its `AX85` cell is empty, unlike the header's `AX102`
    counterpart in Section III, which the sheet marks with an explicit "х"
    placeholder instead — an inconsistency in the source template itself,
    not a modelling choice). **Not modelled as its own field** — only its
    6.1/6.2 children are, since a standalone "total share of income taxed
    at different rates" would be numerically trivial (always 100%) rather
    than a genuine data point.
  - **Line 7** (`allowedDeductibleExpenseAmount`, "рядок 3, але не більше
    ніж значення рядка 4") and **line 8** (`taxBaseAfterDeductionAmount`,
    "рядок 4 – рядок 7").
  - **Line 9**: "Загальна розрахункова сума податку за ставкою:" — the
    same bare-header pattern as line 6 (its own `AX90` cell is empty, no
    formula of its own), introducing the 9.1/9.2 split. **Not modelled as
    its own field**, for the same reason as line 6.
  - **Line 10** (`taxCreditReductionAmount`, "рядок 5 – рядок 9",
    "переноситься до рядка 16 декларації" — carried forward to line 16 of
    the parent declaration).
- **Розділ III — parallel computation for Diia City share-acquisition
  expenses** (rows 95-110): the same three-column layout, line codes 11
  through 18, structurally identical to Section II but keyed to sub-clause
  166.3.10 (Diia City resident share/corporate-rights acquisition
  expenses) instead of the general clause 166.3 categories, and to
  dividend income (lines 12/12.1/12.2/13/14/14.1/14.2) instead of wage
  income:
  - **Line 14**'s own header row (rows 102, the Section III counterpart of
    line 6) is the one header row in this sheet the source template does
    mark with an explicit "х" (not-applicable) placeholder in its own `AX`
    cell, rather than leaving it blank as lines 6/9/17 do — confirmed by
    direct inspection, not modelled as a data field either way.
  - **Lines 17.1 and 17.2's own printed formulas cite "рядок 17"** (line
    17 itself — a bare header row with no value, the Section III
    counterpart of line 9) **as their multiplicand, rather than "рядок
    16"** (line 16, the actual computed tax base, `AX106` — the same
    quantity line 9.1/9.2's own formulas correctly cite as "рядок 8" in
    Section II). This is a **genuine source-text inconsistency**,
    confirmed by side-by-side comparison of rows 91/92 (Section II,
    correctly citing "рядок 8") against rows 108/109 (Section III,
    citing "рядок 17" where "рядок 16" is clearly intended) — disclosed
    here and in the affected fields' own `description`, not silently
    corrected, per this registry's established practice for source-text
    quirks (e.g. the `kz/kgd` series' own documentRef citation bug,
    GOV-3562).
  - **Line 18** (`diiaCityTaxCreditReductionAmount`) is **also** printed
    as "переноситься до рядка 16 декларації" — carried forward to the
    **same** line 16 of the parent declaration as line 10
    (`taxCreditReductionAmount`) — confirmed by direct comparison of rows
    93 and 110's own trailing parenthetical text, which are textually
    identical apart from the line-number references. This means the
    parent declaration's own line 16 is fed by two independently
    computed amounts from this single annex, not by a single value —
    disclosed as a genuine structural characteristic, not modelled as a
    sum (the parent declaration schema itself, already published, does
    not carry a `taxCreditAmount`-style field this schema could safely
    assert a summation relationship against).
- **Footnotes** (rows 112-113): footnote `*` (row 112) is the healthcare
  category's own effective-date condition (tied to `healthcareExpenseAmount`
  in this schema, per its own `description`). Footnote `**` (row 113) reads
  "Підтверджую достовірність даних під час застосування права на податкову
  знижку відповідно до підпункту 166.3.9..." (I confirm the accuracy of
  data when applying the tax credit under sub-clause 166.3.9...) — this is
  itself an attestation-style sentence, but **conditional and scoped to the
  single IDP-housing-rent category** (sub-clause 166.3.9) rather than a
  general accuracy statement about the whole annex. This is a genuine
  structural difference from Annex АП/Ф4/МПЗ/ЄСВ3 (each of which prints a
  general "Інформація... є правильною" sentence covering the whole filing)
  **and** from Annex Ф1/КІК/Ф2 (which print no attestation text at all).
  This cycle dumped every non-empty cell across the entire `Ф 3` sheet
  (rows 1-420, columns A-BQ) and confirmed this footnote is the *only*
  confirmation-style text anywhere on the sheet — no general attestation
  sentence exists. Because the spec's own `document.category` vocabulary
  (`identity-document`/`supporting-evidence`/`payment`/`attestation`) and
  the established sibling-annex convention both model general attestations
  as a `documents[]` entry, but this footnote is narrower — conditioned on
  one specific expense category's own use, not the filing as a whole —
  this cycle treats it as **field-level description context on
  `idpHousingRentExpenseAmount`** (the same treatment this registry's other
  annexes give footnote/legend text generally) rather than fabricating a
  `documents[]` entry that would overstate its scope to the whole filing.
  `documents` is therefore omitted entirely, the same disclosed choice
  Annex Ф1 made for its own (different) reason — no general attestation
  text at all.
- **Signature block** (rows 115-117): "Фізична особа – платник податку
  або уповноважена особа" / "(підпис)" / "(власне ім'я та прізвище)" —
  officer/applicant-facing, not modelled as data, matching all prior
  annexes.

## Scope and disclosed boundaries

This schema models the `Ф 3` sheet **in full** — the header, Section I's
own eleven-category list and total, and both Section II's and Section
III's own computation lines — since the sheet's own structure is already
fully bounded (no unbounded repeating rows). Scoping decisions made and
documented here rather than silently:

- **Header lines 6, 9, and 17 (and line 14, which the source itself marks
  "х") are not modelled as their own fields** — see "Structure confirmed"
  above. Each is a bare header introducing a two-part rate/percentage split
  with no formula or distinct printed value of its own; only their `.1`/
  `.2` children carry genuine computed values. This is a disclosed
  divergence from treating every `AX`-merged row as a field regardless of
  whether it carries a formula — a stricter standard than raw box
  presence, applied consistently across all four header rows on this
  sheet.
- **`totalEligibleExpenseAmount` (line 3) and `totalExpenseAmount` (line 2,
  Section I's own total) are modelled as their own distinct fields**, even
  though they may be numerically identical in the common case — the source
  prints them as separate boxes with separate labels/line codes across two
  different sections, the same practice this registry's Annex Ф1
  VERIFICATION.md already established for its own "УСЬОГО" row treatment.
- **The two rate-split calculated-tax formulas in Section III (lines 17.1/
  17.2) are transcribed exactly as printed**, including their own literal
  "рядок 17" citation (rather than the evidently-intended "рядок 16") — a
  disclosed source-text inconsistency, not corrected in this schema's own
  field descriptions (see "Structure confirmed" above).
- **No `documents` key** (the key is omitted entirely, matching Annex Ф1's
  own choice) — see "Footnotes" above. This is the second of this
  registry's eight authored UA DPS annexes to omit `documents` outright
  (after Annex Ф1), and the first to do so despite the sheet carrying its
  own attestation-style text, because that text is scoped to a single
  expense category rather than the whole filing.
- **Row/column/line-code numbers themselves are not modelled as fields.**
  They are fixed, printed labels (categories 1-11, line codes 3-10 and
  11-18), the same treatment this registry's other UA DPS annexes and the
  `kz/kgd` series both give their own fixed row/item numbers.
- **Two representative `crossFieldValidation` rules** are included
  (`allowedDeductibleExpenseAmount` ≤ `totalWageIncomeSubjectToTaxAmount`;
  `allowedDiiaCityDeductibleExpenseAmount` ≤ `totalDividendIncomeAmount`,
  since both "allowed expense" lines are explicitly defined by the sheet's
  own text as "line X, but not more than line Y") — consistent with this
  registry's other UA DPS annexes' own established practice of reserving
  `crossFieldValidation` for simple two-field comparisons the source text
  states explicitly, not multi-field sum formulas.
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field and all seven prior annexes' own fields
  do.
- **No `visibleWhen`/`requiredWhen` gating is attached to any Section I/II/
  III field.** Nothing in the sheet's own source text ties the expense
  list or either computation to a specific `declarationType` value — a
  qualifying taxpayer files this annex regardless of whether the parent
  declaration is original or corrective, so gating here would be an
  invented rule not supported by the source.
- **All amount fields carry `minimum: 0`.** Every Section I category
  amount is a positive incurred expense; every Section II/III line is
  either explicitly printed "без знака" (without sign, lines 10 and 18) or
  is, by construction (capped-allowance and difference-of-non-negative-
  capped-values formulas), non-negative in all valid filings.

**Not modelled, left as open backlog:**

- The remaining two companion schedules disclosed by the parent
  declaration's own VERIFICATION.md (ЄСВ1, ЄСВ2 — both carrying a fixed
  twelve-month repeating table) remain open backlog for future companion
  schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-f3/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the header fields, and one fuller `corrective`-type filing exercising
an education-expense and IDP-housing-rent-expense entry in Section I, the
full Section II wage/tax-credit computation, and the full Section III
Diia-City/dividend tax-credit computation, with figures chosen to satisfy
both `crossFieldValidation` rules) and 7 mutation-control fixtures (each
expected to raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, an invalid `declarationType` enum value, a
missing `correctedPeriodYear` when `declarationType` is `corrective`, a
negative `idpHousingRentExpenseAmount`, an out-of-range (>100)
`wageTaxable18PctSharePercent`, an unknown field rejected, and a
`crossFieldValidation` violation (`allowedDeductibleExpenseAmount`
exceeding `totalWageIncomeSubjectToTaxAmount`). All 9 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry (554/554) with this schema added.

## Known gaps

- The remaining two companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2) remain open
  backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule and Ukraine's remaining
  DMV/National ID verticals (both previously found weak) were not
  re-screened this cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all seven prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
