# Verification record — `ua/dps/individual-income-tax-declaration-annex-f1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-18`

This is a `GovSchema Standard Research` cycle (**GOV-3639**, authoring child
issue **GOV-3641**), deepening Ukraine's own disclosed Taxes backlog — the
ten companion schedules the GOV-3531 cycle disclosed but did not model when
it authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which three (Annex АП, Annex Ф4, Annex МПЗ) were already modelled
by the GOV-3588, GOV-3623, and GOV-3632 cycles respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Kazakhstan's Form 220.0X companion-schedule series
remains fully closed (GOV-3477 through GOV-3616); its own disclosed Form
250.00 lead remains unscreened and was not used again this cycle without
first confirming a genuine unauthenticated source. Ukraine's own disclosed
Taxes backlog (seven remaining companion schedules — ЄСВ1, ЄСВ2, ЄСВ3, КІК,
Ф1, Ф2, Ф3 — to the already-published main declaration) remains the
strongest immediately-actionable candidate: the source workbook is already
fetched, hashed, and structurally inventoried (GOV-3531, GOV-3588, GOV-3623,
GOV-3632), so no new source-discovery risk is involved.

The GOV-3632 cycle had already sized all eight then-remaining sheets fresh
(`XLSX.readFile` + `!ref`/`!merges` count):

| Sheet   | `!ref`        | `!merges` |
|---------|---------------|-----------|
| ЄСВ 1   | `A1:CA244`    | 241       |
| ЄСВ 2   | `A1:CZ250`    | 211       |
| ЄСВ 3   | `A1:CY226`    | 131       |
| КІК     | `A1:BO207`    | 116       |
| **Ф 1** | **`A1:CT213`**| **101**   |
| Ф 2     | `A1:CR183`    | 278       |
| Ф 3     | `A1:BQ420`    | 202       |
| ~~МПЗ~~ | `A1:DG72`     | 153       (modelled GOV-3632) |

Of the seven sheets remaining after МПЗ, **Ф 1 has the fewest merges (101)**
of any remaining sheet — fewer even than Ф 2's smaller row extent (183 rows
but 278 merges, the densest of the seven). Low merge count was МПЗ's own
proxy for "clean, fully bounded structure" last cycle, and re-inspecting Ф 1
directly this cycle confirmed the same holds here: a single fixed-capacity
investment-asset entry (not an unbounded or even a multi-row table), a short
two-section computation, and no repeating blocks of unknown size.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all three prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `Ф 1` sheet.
  - **Cited URL (same as the parent declaration and all three prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and all three prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all three
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across five cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua_dps_f1`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `Ф 1` —
    note the sheet name itself carries a literal space between the letter
    and the digit, unlike the `Ф4` sheet's own name). The `Ф 1` sheet
    (`!ref` = `A1:CT213`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    and cross-referenced against the workbook's own `!merges` array (101
    entries for this sheet) to resolve exactly which column range each
    header label spans.

### Structure confirmed

The `Ф 1` sheet's 74-row printed extent (rows 75-213 are blank print-area
padding) resolves to a title/header block, a single-entry investment-asset
table with its own total row, a short two-section computation, footnotes,
and a signature block — no attestation sentence:

- **Title block** (rows 1-20): the receipt-stamp placeholder (not modelled,
  officer-facing), the "Додаток Ф1 до податкової декларації про майновий
  стан і доходи" heading, the calculation's own subtitle ("Розрахунок
  податкових зобов'язань з податку на доходи фізичних осіб та/або
  військового збору з доходів, отриманих від операцій з інвестиційними
  активами"), and the taxpayer identification field (rows 15-18).
- **Declaration type/period header** (rows 21-24): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's and all three prior annexes' own `declarationType`) and
  reporting period. Confirmed via direct inspection of every non-empty cell
  in rows 21-24 that this header carries no companion "місяць" (month)
  column in either period box — matching Annex Ф4's and Annex МПЗ's own
  convention rather than Annex АП's month-bearing one.
- **Розділ І — investment-asset table** (rows 27-42): a table with **a
  fixed printed capacity of exactly one entry row**, unlike Annex Ф4's
  three-entry real-estate/movable-property tables or Annex МПЗ's four-entry
  land-plot table. Row "1" (the entry) spans rows 34-36 (text-wrap lines
  for the type/description columns) with its own data cells on row 34;
  row 37 is the section's own "УСЬОГО" total row, printed within the same
  four-row-tall row-number merge (`A34:C37`) but with its own distinct
  income/cost/result cells (confirmed cell-by-cell: `D37:AD37` holds only
  the "УСЬОГО" label, while `AE37`/`AR37`/`BD37` are separate, independently
  merged total cells — the same "total row overlaid on the last wrap-line of
  the last entry" layout this registry has now seen across all four
  authored UA DPS annexes). Six numbered columns: row number, asset type
  (footnote-coded 1-4), name/characteristics, sale income, acquisition cost,
  and financial result (profit (+) or loss (–)). Below the table: the
  carried-forward prior-period negative financial result (line 2), the
  overall financial result (line 3, defined by the sheet's own printed
  formula as the total row's own financial-result column minus line 2), and
  its own positive/negative split (lines 3.1/3.2, each explicitly printed
  "без знака" — without sign — for the negative case).
- **Розділ ІІ — tax obligations** (rows 44-51): PIT (line 4, defined by the
  sheet's own printed formula as line 3.1 × the Article 167 rate, with the
  Article 170.2.8 carve-out cited inline) split into the portion withheld by
  a tax agent (line 4.1) and the portion payable directly by the taxpayer
  (line 4.2, the positive value of line 4 minus line 4.1); and the same
  withheld/payable split for military levy (lines 5, 5.1, 5.2, the levy rate
  cited to point 161 of subdivision 10 of Chapter XX of the Tax Code).
- **Footnotes** (rows 66-70): the asset-type code list (footnote *, four
  categories: corporate rights other than securities; exchange-traded
  securities/derivatives; non-exchange-traded securities/derivatives;
  foreign-source investment assets) and the related-non-resident/low-tax-
  jurisdiction arm's-length pricing rule (footnote **, citing sub-clause
  39.2.1.2 of Article 39 of the Tax Code) — neither modelled as fields,
  consistent with this registry's established treatment of footnote/legend
  text as field-level `description` context rather than data.
- **Signature block, no attestation sentence** (rows 72-74): **a genuine
  structural difference from all three prior annexes** — Annex Ф4 (row 65),
  Annex МПЗ (row 57), and Annex АП each print an explicit accuracy-
  attestation sentence ("Інформація, наведена в додатку до декларації, є
  правильною." / "Наведена інформація є правильною.") immediately before
  the signature block. This cycle dumped every non-empty cell across the
  entire `Ф 1` sheet (rows 1-213, columns A-CU) and confirmed **no such
  sentence, or any text resembling it, exists anywhere on this sheet** —
  only the signature-block label itself ("Фізична особа – платник податку
  або уповноважена особа") and the "(підпис)"/"(власне ім'я та прізвище)"
  captions, all officer/applicant-facing and not modelled as data. Because
  no attestation statement text is printed on this sheet, the `documents`
  key is omitted entirely (per the spec's own `minItems: 1` constraint,
  which forbids an empty array when the key is present — confirmed via
  `tools/validate-ajv.mjs`) rather than fabricating an attestation entry to
  match the sibling annexes' own convention — a disclosed deviation, not a
  silent omission.

## Scope and disclosed boundaries

This schema models the `Ф 1` sheet **in full** — the single-entry
investment-asset table and its total row, the header/period fields, and
both Розділ І's and Розділ ІІ's own computation lines — since the sheet's
own structure is already fully bounded (no unbounded repeating rows).
Scoping decisions made and documented here rather than silently:

- **The one entry row is the sheet's own fixed printed capacity** (row 34,
  wrapped across rows 34-36, numbered "1" in the source itself), not an
  arbitrary cap chosen by this schema — the same convention already
  established by Annex Ф4's three-entry tables and Annex МПЗ's four-entry
  table, here simply at its smallest observed size (n=1) in this
  registry's UA DPS series so far.
- **`investmentAssetTotalIncomeAmount`/`investmentAssetTotalCostAmount`/
  `investmentAssetTotalFinancialResult` (the "УСЬОГО" row) are modelled as
  their own distinct fields, even though they are numerically identical to
  `investmentAsset1IncomeAmount`/`investmentAsset1CostAmount`/
  `investmentAsset1FinancialResult`** — the source prints the total row as
  its own separate merged cells with a distinct label ("УСЬОГО"), the same
  practice this registry's Annex МПЗ VERIFICATION.md already established
  for `totalMinTaxObligationAmount` (also numerically a carry-forward of a
  distinct printed box, not silently collapsed into one field).
- **`investmentAsset1Type` is modelled as a semantic enum, not a raw numeric
  code**, translating the sheet's own footnote-coded values (1-4) into
  descriptive identifiers (`corporate_rights`,
  `securities_exchange_traded`, `securities_non_exchange_traded`,
  `foreign_source_assets`) — matching this registry's established
  `declarationType`-style convention of semantic enum values over literal
  source codes.
- **No `documents` attestation entry (the key is omitted entirely, not an
  empty array — see the spec's `minItems: 1` constraint above)** — see
  "Signature block, no attestation sentence" above. This is the first of
  this registry's four authored UA DPS annexes to have no `documents` at
  all; the omission is disclosed, not an oversight.
- **Row/column numbers themselves are not modelled as fields.** They are
  fixed, printed labels (№ з/п, line codes 1-6, 2, 3, 3.1, 3.2, 4-5.2), the
  same treatment this registry's other UA DPS annexes and the `kz/kgd`
  series both give their own fixed row/item numbers.
- **`investmentAsset1FinancialResult`, `investmentAssetTotalFinancialResult`,
  and `totalInvestmentFinancialResult` carry no `minimum` constraint** —
  each is explicitly definable as either a profit (+) or a loss (–) per the
  sheet's own column header and line 3's own label, unlike lines 3.1/3.2
  (`investmentProfitAmount`/`investmentLossAmount`), which the sheet itself
  instructs to state "без знака" (without sign) and are therefore
  constrained to `minimum: 0`.
- **Two representative `crossFieldValidation` rules** are included
  (`pitPayableByTaxpayer` ≤ `pitAmount`; `militaryLevyPayableByTaxpayer` ≤
  `militaryLevyAmount`, since both "payable by taxpayer" lines are defined
  as the positive value of (total minus withheld-by-agent), and both totals
  have their own `minimum` of 0) — consistent with Annex Ф4's and Annex
  МПЗ's own established practice of reserving `crossFieldValidation` for
  simple two-field comparisons, not multi-field sum formulas.
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field and all three prior annexes' own fields
  do.
- **No `visibleWhen`/`requiredWhen` gating is attached to any Розділ І/ІІ
  field.** Nothing in the sheet's own source text ties the investment-asset
  table or the tax-obligation computation to a specific `declarationType`
  value — a qualifying taxpayer files this annex regardless of whether the
  parent declaration is original or corrective, so gating here would be an
  invented rule not supported by the source.

**Not modelled, left as open backlog:**

- The other six companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф2, Ф3) remain open backlog
  for future companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too
  — see "Why this candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-f1/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the header fields, no investment-asset entry filled in, and one fuller
`corrective`-type filing exercising the investment-asset entry, its total
row, the prior-period-loss carryforward, the profit/loss split, and the full
Розділ ІІ tax computation) and 7 mutation-control fixtures (each expected to
raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, an invalid `declarationType` enum value, a
missing `correctedPeriodYear` when `declarationType` is `corrective`, a
negative `investmentAsset1IncomeAmount`, a wrong-type `investmentAsset1Type`,
an unknown field rejected, and a `crossFieldValidation` violation
(`pitPayableByTaxpayer` exceeding `pitAmount`). All 9 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- The other six companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф2, Ф3)
  remain open backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule (the consular-mirrored PDF
  disclosed by the GOV-3537 cycle) and Ukraine's remaining DMV/National ID
  verticals (both previously found weak) were not re-screened this cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all three prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
