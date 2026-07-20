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

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Ukraine's own disclosed Taxes backlog (three
remaining companion schedules — ЄСВ1, ЄСВ2, Ф3 — to the already-published
main declaration) remains the strongest immediately-actionable candidate:
the source workbook is already fetched, hashed, and structurally
inventoried across eight prior cycles, so no new source-discovery risk is
involved.

The GOV-4010 cycle had already sized all three of these fresh via
`XLSX.readFile`, reading each sheet's own `!ref` and `!merges` count:

| Sheet  | `!ref`      | Merges | Actual printed extent |
|--------|-------------|--------|------------------------|
| ЄСВ 1  | A1:CA244    | 241    | 109 rows               |
| ЄСВ 2  | A1:CZ250    | 211    | 115 rows               |
| Ф 3    | A1:BQ420    | 202    | 117 rows               |

This cycle independently re-confirmed those figures (re-sizing all three
fresh from a newly re-fetched copy of the same source workbook, not reusing
the prior cycle's own recorded numbers) and additionally dumped every
non-empty cell of all three candidate sheets to compare structural
complexity, not just row/merge counts. **Ф3 was picked**: it has the fewest
merges of the three, and — more importantly — it has **no repeating table
at all**, unlike ЄСВ1 and ЄСВ2, which each carry their own fixed
twelve-month repeating table (five data columns per month for ЄСВ1's
insured-person-category/base-amount/liability computation, five columns
per month for ЄСВ2's voluntary-contribution computation). Every one of
Ф3's own data rows is instead a distinct, fixed, single-instance line item
— consistent with this registry's established practice of preferring the
most tractable next candidate when several are equally well-sourced.

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
    install at `/tmp`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `Ф 3`).
    The `Ф 3` sheet (`!ref` = `A1:BQ420`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    dumping every non-empty cell to confirm the sheet's printed content in
    full, and cross-referenced against the workbook's own `!merges` array
    (202 entries for this sheet) to resolve exactly which row/column range
    each header label, line item, and input cell spans.

### Structure confirmed

The `Ф 3` sheet's 117-row printed extent resolves to a taxpayer-
identification/declaration-type/period header, three numbered computation
sections, and a signature block:

- **Header** (rows 11-19): the standard RNOKPP-or-religious-objector-
  passport field (rows 11-14, matching every other authored annex's own
  `taxpayerTaxNumberOrPassport` convention), followed directly by
  declaration type and period (row 16/19) — this sheet has no separate
  Pension-Fund passport field or direct `fullName` field (both first seen on
  Annex ЄСВ3), and its three-value `declarationType` enum
  (original/revised_original/corrective) matches the registry's general
  UA DPS annex convention rather than ЄСВ3's own two-value exception.
- **Section I — incurred-expense table** (rows 54-72): a fixed list of
  eleven expense categories under Article 166.3 of the Tax Code of Ukraine
  (rows 61-71), each with a single amount input cell (column BG) — mortgage
  interest (166.3.1), charitable contributions (166.3.2), education
  (166.3.3), healthcare (166.3.4*, footnoted as not yet in effect pending a
  separate mandatory social health insurance law), life
  insurance/pension contributions (166.3.5), reproductive technology or
  adoption (166.3.6), alternative-fuel vehicle conversion (166.3.7),
  affordable housing (166.3.8), IDP rent (166.3.9**, footnoted as an
  implicit taxpayer attestation of housing/budget-payment conditions),
  COVID-19 treatment (a transitional-provisions item, not itself part of
  Article 166.3), and other unlisted expenses (excluding 166.3.10) — plus
  its own total row (row 72). Columns J ("Норма Податкового кодексу
  України") and P ("Перелік витрат...") print fixed statutory-citation and
  description text for each category and are not modelled as fields, since
  they carry no per-filing variable value.
- **Section II — PIT refund computation, categories 166.3.1-166.3.9 plus
  COVID-19** (rows 74-93): ten numbered lines (3 through 10, with 4 and 6
  and 9 each also having their own fillable aggregate cell alongside their
  own 4.1/4.2, 6.1/6.2, and 9.1/9.2 sub-lines respectively) computing the
  PIT refund from wages: total allowed expenses (line 3), gross wages
  subject to tax split by rate (lines 4/4.1/4.2), PIT withheld from wages
  (line 5), the income share by rate (lines 6/6.1/6.2), resident-allowed
  expenses capped at wages (line 7), the resulting tax base (line 8), the
  computed tax by rate (lines 9/9.1/9.2), and the final refund amount
  (line 10, "рядок 5 – рядок 9", entered without a minus sign).
- **Section III — PIT refund computation, category 166.3.10 (Diia City)**
  (rows 95-110): the same eighteen-through-eleven line-numbering pattern
  mirrored for the Diia City resident share-acquisition category, financed
  by dividend income instead of wages: investment expenses (line 11),
  dividend income split by rate (lines 12/12.1/12.2), PIT withheld from
  dividends (line 13), the income share by rate (lines 14.1/14.2 — **line
  14's own aggregate cell is explicitly printed `х` (not applicable),
  unlike every other parent line in this schedule**, so no aggregate field
  is modelled for it), resident-allowed expenses capped at dividend income
  (line 15), the resulting tax base (line 16), the computed tax by rate
  (lines 17/17.1/17.2), and the final refund amount (line 18, printed as
  "рядок 13 – рядок 17", entered without a minus sign).
- **Footnotes and signature block** (rows 112-117): footnote * (row 112,
  healthcare category's delayed effective date), footnote ** (row 113, IDP
  rent category's implicit attestation), and the signature block. **No
  general accuracy-attestation sentence ("Наведена інформація є
  правильною") is printed anywhere on this sheet** — matching Annex Ф1,
  Annex КІК, and Annex Ф2's own convention (unlike Annex АП/Ф4/МПЗ/ЄСВ3) —
  so `documents` is omitted entirely rather than fabricated.

## Scope and disclosed boundaries

This schema models the `Ф 3` sheet **in full**: the identification header,
Section I's eleven-category expense table plus its total row, Section II's
full wages-based refund computation, and Section III's full dividend-based
(Diia City) refund computation. Scoping decisions made and documented here
rather than silently:

- **Line 14's own aggregate cell is not modelled as a field.** Every other
  parent line with its own sub-lines in this schedule (lines 4, 6, and 9)
  has a genuinely fillable aggregate cell printed alongside its sub-lines.
  Line 14 is the sole exception: its own cell (column AX, row 102) is
  printed literally `х` (a placeholder meaning "not applicable"), confirmed
  by a full non-empty-cell dump of the sheet's entire printed extent — a
  genuine, disclosed structural difference from this schedule's own three
  sibling parent lines, not an oversight.
- **The sheet's own printed formula reference for line 18 ("рядок 13 –
  рядок 17") is transcribed exactly as stated, not silently corrected.**
  Section II's mirrored line 10 formula reads "рядок 5 – рядок 9" (PIT
  withheld minus computed tax); by the same pattern, line 18 would be
  expected to read "рядок 16 – рядок 17" (tax base minus computed tax)
  rather than referencing line 13 (PIT withheld from dividends) against
  line 17. Since line 18's own description text ("значення вказується без
  знака "–"", entered without a minus sign — the same framing used for a
  positive-value-of-a-subtraction elsewhere in this registry) is consistent
  with either reading producing a sensible refund figure, and no
  government erratum for this specific line was found, this is disclosed
  as a possible source citation inconsistency rather than resolved by
  substituting a different line reference than the one actually printed —
  consistent with this registry's own established practice of transcribing
  sources faithfully and flagging apparent inconsistencies rather than
  silently "fixing" them (see the KZ 220.02-220.04 `documentRef` citation
  finding for a prior instance of the same practice).
- **Two `crossFieldValidation` rules are added**, both directly stated by
  the sheet's own "significance without minus sign" framing of a
  subtraction: `taxCreditRefundAmount` (line 10) must not exceed
  `pitWithheldFromWagesAmount` (line 5), and `diiaCityTaxCreditRefundAmount`
  (line 18) must not exceed `pitWithheldFromDividendsAmount` (line 13, the
  reference actually printed on the sheet for this line) — mirroring this
  registry's established practice (see Annex Ф1's own
  `pitPayableByTaxpayerWithinPitAmount` rule) of reserving
  `crossFieldValidation` for relationships the source text states
  explicitly.
- **No `crossFieldValidation` rule ties `totalTaxCreditExpensesAmount`
  (Section I's own total row) back to the eleven individual category
  amounts above it**, and none ties `totalAllowedExpensesAmount` (Section
  II, line 3) back to `totalTaxCreditExpensesAmount` (Section I's own
  total). The sheet prints no explicit summation formula for either
  relationship (the statutory expense caps applied between the two totals
  are a taxpayer computation not reproduced on the sheet itself) —
  consistent with this registry's own established practice of reserving
  `crossFieldValidation` for comparisons the source text states explicitly.
- **`documents` is omitted entirely** — unlike Annex АП/Ф4/МПЗ/ЄСВ3, this
  sheet prints no general accuracy-attestation sentence anywhere across its
  full extent (confirmed by the same non-empty-cell dump used to size this
  candidate).
- **Every field is modelled as not required** except the four header fields
  (`taxpayerTaxNumberOrPassport`, `declarationType`, `reportingPeriodYear`,
  and `correctedPeriodYear` when `declarationType` is `corrective`),
  consistent with this registry's established treatment of every other UA
  DPS annex's own primary content fields, since no automated validator can
  know in advance which expense categories or computation lines, if any, a
  given filer's tax credit claim actually populates.
- **Footnote **'s IDP-housing attestation (category 9) is not modelled as a
  separate boolean field.** The sheet provides no distinct checkbox or
  signature for it — the footnote instead frames claiming the `idpRentAmount`
  amount itself as the taxpayer's attestation of both underlying conditions
  (no other suitable housing outside occupied territory; no budget housing
  payments received). This is documented in the field's own `description`
  rather than modelled as a separate, non-existent input.

**Not modelled, left as open backlog:**

- The other two companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2) remain open backlog for future
  companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-f3/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the three required header fields, and one fuller filing exercising
education and IDP-rent expense categories plus both Section II's and
Section III's full wages/dividend-based refund computations, satisfying
both `crossFieldValidation` rules) and 7 mutation-control fixtures (each
expected to raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, an invalid `declarationType` enum value, a
missing required `correctedPeriodYear` when `declarationType` is
`corrective`, a negative `idpRentAmount`, an out-of-range
`incomeShareTotalPercent` (150, exceeding the 0-100 bound), a
`crossFieldValidation` violation (`taxCreditRefundAmount` exceeding
`pitWithheldFromWagesAmount`), and an unknown field rejected. All 9 were
independently checked this cycle with a fresh, from-scratch, throwaway
Node mock validator built directly from this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` definitions
(not committed, per this registry's established per-cycle practice) — each
fixture produced exactly the expected pass/fail result. Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added (554/554).

## Known gaps

- The other two companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2) remain open
  backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's remaining DMV and National ID verticals (both previously found
  weak) were not re-screened this cycle.
- Line 18's own printed formula reference ("рядок 13 – рядок 17") is a
  disclosed possible source citation inconsistency, not resolved — see
  "Scope and disclosed boundaries" above.
- No `crossFieldValidation` rule ties Section I's own total row back to the
  eleven individual category amounts, or ties Section II's line 3 back to
  Section I's own total — see "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all seven prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
