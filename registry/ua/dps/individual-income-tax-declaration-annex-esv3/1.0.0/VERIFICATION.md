# Verification record — `ua/dps/individual-income-tax-declaration-annex-esv3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4010**), deepening
Ukraine's own disclosed Taxes backlog — the ten companion schedules the
GOV-3531 cycle disclosed but did not model when it authored
`ua/dps/individual-income-tax-declaration` (the main declaration sheet), of
which six (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК, Annex Ф2) were
already modelled by the GOV-3588, GOV-3623, GOV-3632, GOV-3641,
GOV-3907/GOV-3996, and GOV-4002/GOV-4004 cycles respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Ukraine's own disclosed Taxes backlog (four
remaining companion schedules — ЄСВ1, ЄСВ2, ЄСВ3, Ф3 — to the
already-published main declaration) remains the strongest immediately-
actionable candidate: the source workbook is already fetched, hashed, and
structurally inventoried across seven prior cycles, so no new
source-discovery risk is involved.

None of the four remaining candidates had been sized by any prior cycle
(unlike Ф2, which the GOV-3632 cycle had already pre-sized). This cycle sized
all four fresh via `XLSX.readFile`, reading each sheet's own `!ref` and
`!merges` count:

| Sheet   | `!ref`      | Merges |
|---------|-------------|--------|
| ЄСВ 1   | A1:CA244    | 241    |
| ЄСВ 2   | A1:CZ250    | 211    |
| ЄСВ 3   | A1:CY226    | 131    |
| Ф 3     | A1:BQ420    | 202    |

**ЄСВ 3 was picked** as the smallest by both dimensions (fewest rows, fewest
merges), consistent with this registry's established practice of preferring
the most tractable next candidate when several are equally well-sourced.
Also confirmed, via a full non-empty-cell dump of the sheet's entire declared
extent, that the sheet's actual printed content ends at row 89 — the
remaining 137 declared rows (90-226) are blank print-area padding, the same
pattern the Annex Ф2 cycle found for its own sheet (183 declared rows, 102
printed).

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all six prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `ЄСВ 3` sheet.
  - **Cited URL (same as the parent declaration and all six prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and all six prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all six
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across eight cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua-sizing2`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `ЄСВ 3`).
    The `ЄСВ 3` sheet (`!ref` = `A1:CY226`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    dumping every non-empty cell to confirm the sheet's printed content in
    full, and cross-referenced against the workbook's own `!merges` array
    (131 entries for this sheet) to resolve exactly which row/column range
    each header label, entry row, and line-code/amount pair spans.

### Structure confirmed

The `ЄСВ 3` sheet's 89-row printed extent resolves to a taxpayer-
identification/declaration-type/period header, audit-specific
identification fields, a fixed twelve-month table, and a footnote/signature
block:

- **Header, taxpayer identification** (rows 15-24): the standard RNOKPP-
  or-religious-objector-passport field (rows 15-18, matching every other
  authored annex's own `taxpayerTaxNumberOrPassport` convention), plus **two
  fields genuinely unique among this registry's seven authored UA DPS
  annexes**: a second, distinct passport-identification field specifically
  for Pension Fund of Ukraine purposes (rows 20-21, `pensionFundIdentificationPassport`,
  footnote * at row 79 giving the expected format), and a direct full-name
  field (row 24, `fullName`) — every other annex relies solely on the main
  declaration's own `taxpayerFullName`, but this sheet requests the name
  again directly, consistent with its own capacity to be filed as a
  standalone calculation potentially covering a different year than the
  main declaration's own reporting period.
- **Declaration type and period** (rows 28-38): **a genuinely two-value
  `declarationType` enum, not the three-value convention (original/
  revised_original/corrective) every other authored UA DPS annex shares.**
  Confirmed by dumping every non-empty cell across the sheet's full printed
  extent: only two checkbox/label pairs exist (`Звітна` at D31:E31/F31:J31
  and `Звітна нова` at L31:M31/N31:V31); no third checkbox cell or
  `Уточнююча` label exists anywhere on the sheet. A stray label fragment
  (`AC28`: "Звітний (податковий) період: Звітний (податковий) період, що
  уточнюється:") does appear in the row 28 header text — carried over from
  the master declaration template's own column-group header — but
  corresponds to no actual input cell, checkbox, or third enum value on
  this sheet, and is not modelled as a field. The period box itself (row
  31 year, footnote 2; row 35 month, footnote 1) is gated per footnote 1's
  own wording to a specific filer category (individual entrepreneurs,
  independent professionals, or farming-enterprise members) filing an
  "original" or "revised original" (not "corrective") declaration — modelled
  as `reportingPeriodYear`/`reportingPeriodMonth`, both optional, since no
  automated validator can know in advance whether a given filer falls in
  that category.
- **Audit-specific identification** (rows 38-53): the substantive fields
  unique to this schedule's own audit-adjustment purpose — `calculationYear`
  (row 38, "Рік, за який формується розрахунок", the tax year whose ЄСВ
  obligation is being adjusted — the schedule's own operative period field,
  distinct from `reportingPeriodYear` above), `calculationSequenceNumber`
  (row 40, footnote 3: a declaration may include several ЄСВ3 calculations,
  one per affected year, each numbered — corresponding to the main
  declaration's own `appendixEsv3Count` gating field), and the audit act's
  own date (`auditActDay`/`auditActMonth`/`auditActYear`, row 43) and number
  (`auditActNumber`, row 47). Row 53's own "7. Тип форми:" line prints only
  one checkbox option across the sheet's full extent ("після документальної
  перевірки", after documentary audit) — since this entire schedule exists
  exclusively for post-audit adjustments, this is not modelled as a variable
  field (it carries no second value to distinguish).
- **Twelve-month table** (rows 61-77): a fixed printed capacity of exactly
  twelve entry rows (65-76, one per calendar month, Січень through
  Грудень), each with its own insured-person category code (column O-V,
  footnote 4: three enumerated values), a base amount (column W-BB, "Сума,
  з якої розраховано зобов'язання з єдиного внеску"), and a resulting
  liability amount (column BC-BZ, "Сума зобов'язань"), plus its own
  `УСЬОГО` total row (77). Modelled with calendar-month-named indexed
  fields (`januaryInsuredPersonCategory`/`januaryBaseAmount`/
  `januaryLiabilityAmount` through `decemberInsuredPersonCategory`/
  `decemberBaseAmount`/`decemberLiabilityAmount`) rather than numeric
  indices, since each row corresponds to one specific, fixed calendar
  month rather than an arbitrary repeating entry — a first for this
  registry's UA DPS annexes (every prior fixed-capacity table modelled an
  arbitrary entry, not a specific named month).
- **Footnote and signature block** (rows 79-89): footnote * (passport
  format, row 79), footnotes 1-4 (rows 80-83), and the signature block
  including an accuracy-attestation sentence ("Наведена інформація є
  правильною", row 86) — **unlike Annex Ф1, Annex КІК, and Annex Ф2, this
  sheet does print an accuracy-attestation sentence**, matching Annex
  АП/Ф4/МПЗ's own convention instead. `documents` is therefore populated
  with one entry, consistent with the registry's convention of modelling
  this attestation when the source text actually states it.

## Scope and disclosed boundaries

This schema models the `ЄСВ 3` sheet **in full**: the identification
header (including its two fields unique among this registry's authored UA
DPS annexes), the two-value declaration-type/period header, the
audit-specific identification fields, and the fixed twelve-month table plus
its own total row. Scoping decisions made and documented here rather than
silently:

- **The twelve-month table is modelled with calendar-month-named indexed
  fields** (`january...`-`december...`) rather than numeric indices
  (`month1...`-`month12...`), since each row is fixed to one specific
  calendar month by the sheet's own printed labels, not an arbitrary
  repeating entry — see "Structure confirmed" above.
- **`declarationType` is a two-value enum** (`original`/`revised_original`),
  not this registry's usual three-value UA DPS annex convention — see
  "Structure confirmed" above for the full non-empty-cell-dump confirmation.
- **No `crossFieldValidation` rule ties `totalBaseAmount`/
  `totalLiabilityAmount` back to the twelve months' own base/liability
  amounts.** The sheet itself prints no explicit summation formula linking
  the `УСЬОГО` row to the twelve month rows above it — this cycle
  transcribed the total fields independently rather than inventing an
  equality the source text does not state, consistent with this registry's
  own established practice of reserving `crossFieldValidation` for
  comparisons the source text states explicitly (see Annex Ф2's own
  equivalent finding for its depreciation-total/Section-I-total
  relationship).
- **Row 53's "Тип форми" (form type) is not modelled** — the sheet prints
  only one checkbox option ("після документальної перевірки") across its
  full extent, carrying no second value to distinguish, since this entire
  schedule exists exclusively for post-audit adjustments.
- **The row 28 header's stray "...що уточнюється:" label fragment is not
  modelled as a field** — it corresponds to no input cell, checkbox, or
  third `declarationType` value anywhere on the sheet (confirmed via a full
  non-empty-cell dump), and is documented here rather than silently
  dropped.
- **`documents` is populated with one entry** (the row 86 accuracy
  attestation), unlike Annex Ф1/КІК/Ф2, which omit `documents` entirely
  since their own sheets print no such sentence.
- **Every table entry field (category, base amount, liability amount, for
  all twelve months) is modelled as not required**, for consistency with
  this registry's established treatment of every other UA DPS annex's own
  primary content fields, since no automated validator can know in advance
  which months, if any, a given audit adjustment affects.
- **`calculationYear`, the audit act's own date fields, and
  `auditActNumber` are modelled as required** — unlike the twelve-month
  table's own content fields, these identify the specific audit act and
  affected tax year this schedule exists to record, and every genuine
  filing of this schedule necessarily has one.

**Not modelled, left as open backlog:**

- The other three companion schedules disclosed by the parent
  declaration's own VERIFICATION.md (ЄСВ1, ЄСВ2, Ф3) remain open backlog
  for future companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-esv3/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the eight required header/audit fields, and one fuller
`revised_original`-type filing exercising the full header including both
optional period fields and the Pension-Fund passport field, plus two
months' worth of table entries and both totals) and 7 mutation-control
fixtures (each expected to raise exactly 1 class of error): a missing
required `taxpayerTaxNumberOrPassport`, a missing required `fullName`, a
missing required `auditActNumber`, an invalid `declarationType` enum value
(`corrective` — genuinely invalid here despite being a valid value on every
other authored UA DPS annex), an invalid `januaryInsuredPersonCategory`
enum value, a negative `januaryBaseAmount`, and an unknown field rejected.
All 9 were independently checked this cycle with a fresh, from-scratch,
throwaway Node mock validator built directly from this schema's own
`required`/`requiredWhen`/`validation` definitions (not committed, per this
registry's established per-cycle practice) — each fixture produced exactly
the expected pass/fail result. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass across the full registry with this schema
added (553/553).

## Known gaps

- The other three companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, Ф3) remain open
  backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule and Ukraine's remaining
  DMV/National ID verticals (both previously found weak) were not
  re-screened this cycle.
- No `crossFieldValidation` rule ties the twelve-month table's own entries
  back to `totalBaseAmount`/`totalLiabilityAmount` — see "Scope and
  disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all six prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
