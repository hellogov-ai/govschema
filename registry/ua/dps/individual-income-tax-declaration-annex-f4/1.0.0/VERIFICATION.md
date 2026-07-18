# Verification record — `ua/dps/individual-income-tax-declaration-annex-f4` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-18`

This is a `GovSchema Standard Research` cycle (**GOV-3623**), deepening
Ukraine's own disclosed Taxes backlog — the ten companion schedules the
GOV-3531 cycle disclosed but did not model when it authored
`ua/dps/individual-income-tax-declaration` (the main declaration sheet), and
of which one (Annex АП) was already modelled by the GOV-3588 cycle.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Kazakhstan's Form 220.0X companion-schedule series
(GOV-3477 through GOV-3616) is now **fully closed** — Forms 220.00 through
220.10 are all modelled, and the CATALOG's own executive-summary entries
confirm no further undisclosed schedule remains in that series. A single
unscreened lead surfaced from that closing cycle's own text — an unrelated
Form 250.00 ("individual assets-and-liabilities declaration") glimpsed only
as an image header on the same `adilet.zan.kz` site — but it is disclosed,
not yet screened for a genuine unauthenticated field-by-field source, so it
was not used this cycle without first confirming a real source exists.

Ukraine's own disclosed Taxes backlog (nine remaining companion schedules —
ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, Ф4, МПЗ — to the already-published main
declaration) remains the strongest immediately-actionable candidate: the
source workbook is already fetched, hashed, and structurally inventoried
(GOV-3531, GOV-3588), so no new source-discovery risk is involved. Of the
nine, **Ф4** (real estate and movable-property sale-income computation) was
picked next: at `!ref A1:CR70` it is one of the smaller remaining sheets
(smaller than ЄСВ1/ЄСВ2/ЄСВ3, КІК, Ф1, Ф2, and Ф3, though slightly larger
than МПЗ), has a clean, fully bounded structure (two three-entry repeating
tables, no unbounded rows — a genuine structural parallel to this registry's
`kz/kgd` Form 220.0X series), and its own Article 172/173 income-tax-
treatment logic is self-contained and independently checkable against the
Tax Code citations printed directly on the sheet.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and Annex АП), approved
  by Order of the Ministry of Finance of Ukraine No. 859 of 2 October 2015,
  as amended by Order No. 119 of 26 February 2025 (the edition modelled
  here, effective for reporting periods from 1 January 2026), this cycle
  modelling its own `Ф4` sheet.
  - **Cited URL (same as the parent declaration and Annex АП):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and Annex АП's own VERIFICATION.md files
    cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`).
    This attempt returned HTTP 200 directly with no transient-500 flake
    (unlike Annex АП's own three-retry note), yielding the file on the first
    fetch.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash both the parent declaration's and Annex
    АП's own VERIFICATION.md files already recorded, confirming the same
    unchanged source file. First 8 bytes `D0 CF 11 E0 A1 B1 1A E1` (OLE2/
    Compound File Binary Format), confirming a genuine legacy BIFF8 `.xls`.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua_dps_scratch`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets, including `Ф4`. The
    `Ф4` sheet (`!ref` = `A1:CR70`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    and cross-referenced against the workbook's own `!merges` array (215
    entries for this sheet) to resolve exactly which column range each
    header label spans — necessary because every income-tax-treatment block
    header (e.g. "що не підлягають оподаткуванню...") is printed once above
    a merged multi-column span rather than repeated per column. Row 70 was
    independently confirmed blank, ruling out any trailing content past the
    printed sheet.

### Structure confirmed

The `Ф4` sheet's 70-row extent resolves to a title/header block, two
identically-shaped repeating-table sections, a computation section, and a
signature block:

- **Title block** (rows 1-20): the receipt-stamp placeholder (not modelled,
  officer-facing), the "Додаток Ф4 до податкової декларації про майновий
  стан і доходи" heading, the calculation's own subtitle naming its scope
  (PIT and military-levy liabilities on real-estate and movable-property
  sale/exchange income), and the taxpayer identification field (row 17-20).
- **Declaration type/period header** (rows 22-25): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's own `declarationType`) and reporting period. **Confirmed via
  direct inspection of every non-empty cell in rows 20-27 that this header
  carries no companion "місяць" (month) column in either period box** —
  a genuine structural difference from Annex АП's own footnote-driven
  `reportingPeriodMonth`/`correctedPeriodMonth` pair (which is scoped to
  individual entrepreneurs ceasing activity mid-year, not relevant to a
  general property-sale schedule any individual filer may need).
- **Розділ І — real estate sale/exchange** (rows 28-40): a bounded
  three-entry table (rows 35-37, entries 1.1-1.3) with 12 columns: row
  number, object name, address, then three income-tax-treatment blocks each
  spanning a merged multi-column header (confirmed via `!merges`) — income
  not taxable under Article 172.1; income taxed at 5% under Article 172.2
  first/fourth paragraph (with its own PIT and military-levy columns); and
  income taxed at 18% under Article 172.2 second/third paragraph (with its
  own documented-acquisition-cost, income-less-cost difference, PIT, and
  military-levy columns). Row 38 ("ВСЬОГО") totals the nine numeric columns
  only — confirmed via `!merges` (`D38:AA38` merges the name+address columns
  under a single "ВСЬОГО" label with no per-column total, while
  `AB38:AI38` through `CL38:CQ38` are present as separate fillable merged
  cells for each of the nine numeric columns).
- **Розділ ІІ — movable property sale/exchange** (rows 42-52): an
  identically-shaped bounded three-entry table (rows 49-51, entries
  1.1-1.3), differing only in its lead columns (object name and make/model
  instead of name and address) and its 18%-block comparator column, which
  here is "Вартість такого об'єкта рухомого майна, що була задекларована
  особою як об'єкт декларування у порядку одноразового (спеціального)
  добровільного декларування" (the object's value under a one-time special
  voluntary declaration, per Chapter XX subdivision 94 of the Tax Code)
  rather than a documented acquisition cost. Row 52 ("ВСЬОГО") totals the
  same nine numeric columns, confirmed the same way via `!merges`.
- **Section III — tax-liability computation** (rows 54-63): eight numbered
  lines with a single "Сума (грн, коп.)" value column each — non-taxable
  income (line 3, carried per the source's own instruction to the parent
  declaration's line 11.2); total taxable income (line 4, carried to line
  10.5 column 3); PIT total (line 5, the source's own printed formula sums
  both sections' 5%- and 18%-block PIT columns); PIT withheld by a tax agent
  (line 5.1, carried to line 10.5 column 4) and PIT payable directly by the
  taxpayer (line 5.2, carried to line 10.5 column 6); and the same
  withheld/payable split for the military levy (lines 6, 6.1, 6.2, carried
  to line 10.5 columns 5 and 7 respectively).
- **Attestation and signature block** (rows 65-69): the accuracy attestation
  statement (row 65, "Інформація, наведена в додатку до декларації, є
  правильною." — spelled correctly here, unlike Annex АП's own source typo)
  and the signature block (signature + printed name, officer-facing fields,
  not modelled as data).
- A "2" printed at `AV40` and "Продовження додатка Ф4" ("continuation of
  Annex Ф4") at `CE41` are a page-break/page-number artifact of the sheet's
  two-page print layout, not a footnote reference — confirmed by the
  complete absence of any footnote-definition text anywhere in the sheet
  (unlike Annex АП, whose footnotes 1 and 2 are printed at the bottom of its
  own sheet).

## Scope and disclosed boundaries

This schema models the `Ф4` sheet **in full** — both three-entry tables,
their section totals, the header/period fields, and the Section III
computation — since the sheet's own structure is already fully bounded (no
unbounded repeating rows). Scoping decisions made and documented here rather
than silently:

- **The three entry rows per section are the sheet's own fixed printed
  capacity** (rows 35-37 and 49-51, each numbered 1.1-1.3 in the source
  itself), not an arbitrary cap chosen by this schema — the same convention
  already established by this registry's `kz/kgd` Form 220.0X companion-
  schedule series for bounded repeating groups.
- **Row/column numbers themselves are not modelled as fields.** They are
  fixed, printed labels (№ з/п, column numbers 1-12), the same treatment
  this registry's `kz/kgd` series and Annex АП both give their own fixed
  row/item numbers.
- **The 18%-block "less" column** (`realEstate{N}Taxable18PctIncomeLessExpenses`
  / `movableProperty{N}Taxable18PctIncomeLessDeclaredValue`) is each a
  computed value the source's own column formula derives (column 10 =
  column 8 − column 9) — modelled as its own field regardless, since the
  source form prints it as a field the filer (or their accounting software)
  fills in directly, the same treatment Annex АП already gives its own
  computed `month{N}AdvancePayable` field.
- **Section III's line 5 (`pitTotal`) and line 6 (`militaryLevyTotal`)**
  reproduce the source's own printed formulas (summing both sections' 5%-
  and 18%-block PIT/military-levy total columns) in each field's own
  `description`, rather than being expressed as a `crossFieldValidation`
  rule — this registry's practice reserves `crossFieldValidation` for
  simple two-field comparisons, not multi-field sum formulas.
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field and Annex АП's own field do.
- **Two representative `crossFieldValidation` rules** are included (the
  first entry's own 18%-block "less" column ≤ its own income column, for
  each of the two sections) as a sanity check on the column-10-equals-
  column-8-minus-column-9 relationship (column 9's own minimum of 0 makes
  this always true for correctly computed data); the identical relationship
  holds for entries 2 and 3 in each section but is not repeated as separate
  rules, consistent with Annex АП's own established practice of including a
  representative rule rather than an exhaustive one.
- **No `visibleWhen`/`requiredWhen` gating is attached to any Розділ І/ІІ or
  Section III field.** Unlike Annex АП's own Section II (explicitly gated to
  `declarationType == corrective` by its own section title), nothing in
  Ф4's own source text ties any of its sections to a specific
  `declarationType` value — a taxpayer may have real-estate and/or
  movable-property sale income to report regardless of whether this is an
  original or corrective filing, so gating here would be an invented rule
  not supported by the source.

**Not modelled, left as open backlog:**

- The other eight companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, МПЗ) remain open
  backlog for future companion schemas.
- The unscreened Form 250.00 lead surfaced by the KZ Form 220.0X series'
  own closing cycle (GOV-3616) was not screened this cycle — see "Why this
  candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-f4/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the header fields and a single real-estate entry, one fuller
`corrective`-type filing exercising all three entries of both sections plus
the Section III computation and the correction-period field) and 7
mutation-control fixtures (each expected to raise exactly 1 class of error):
a missing required `taxpayerTaxNumberOrPassport`, an invalid
`declarationType` enum value, a missing `correctedPeriodYear` when
`declarationType` is `corrective`, a negative
`realEstate1Taxable5PctIncome`, a wrong-type `movableProperty1MakeModel`,
an unknown field rejected, and a `crossFieldValidation` violation
(`realEstate1Taxable18PctIncomeLessExpenses` exceeding
`realEstate1Taxable18PctIncome`). All 9 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- The other eight companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2,
  Ф3, МПЗ) remain open backlog — see "Scope and disclosed boundaries" above.
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
declaration and Annex АП, this cycle's own dedicated sheet read cell-by-cell)
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
