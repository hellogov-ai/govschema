# Verification record — `ua/dps/individual-income-tax-declaration-annex-mpz` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-18`

This is a `GovSchema Standard Research` cycle (**GOV-3630**, authoring child
issue **GOV-3632**), deepening Ukraine's own disclosed Taxes backlog — the
ten companion schedules the GOV-3531 cycle disclosed but did not model when
it authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which two (Annex АП, Annex Ф4) were already modelled by the
GOV-3588 and GOV-3623 cycles respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Kazakhstan's Form 220.0X companion-schedule series
is fully closed (GOV-3477 through GOV-3616); its own disclosed Form 250.00
lead remains unscreened and was not used again this cycle without first
confirming a genuine unauthenticated source. Ukraine's own disclosed Taxes
backlog (eight remaining companion schedules — ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2,
Ф3, МПЗ — to the already-published main declaration) remains the strongest
immediately-actionable candidate: the source workbook is already fetched,
hashed, and structurally inventoried (GOV-3531, GOV-3588, GOV-3623), so no
new source-discovery risk is involved.

Of the eight remaining sheets, this cycle sized all eight fresh
(`XLSX.readFile` + `!ref`/`!merges` count) before picking one:

| Sheet   | `!ref`        | `!merges` |
|---------|---------------|-----------|
| ЄСВ 1   | `A1:CA244`    | 241       |
| ЄСВ 2   | `A1:CZ250`    | 211       |
| ЄСВ 3   | `A1:CY226`    | 131       |
| КІК     | `A1:BO207`    | 116       |
| Ф 1     | `A1:CT213`    | 101       |
| Ф 2     | `A1:CR183`    | 278       |
| Ф 3     | `A1:BQ420`    | 202       |
| **МПЗ** | **`A1:DG72`** | 153       |

**МПЗ** is by a wide margin the smallest remaining sheet (72 rows, versus the
next-smallest at 183 rows), has a clean, fully bounded structure (a four-entry
land-plot table plus a short computation section, no unbounded rows — a
genuine structural parallel to Annex Ф4's own two three-entry tables and to
this registry's `kz/kgd` Form 220.0X series), and its own Article 177.14
minimum-tax-obligation logic is self-contained and independently checkable
against the Tax Code citations printed directly on the sheet.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration, Annex АП, and Annex
  Ф4), approved by Order of the Ministry of Finance of Ukraine No. 859 of
  2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `МПЗ` sheet.
  - **Cited URL (same as the parent declaration and both prior annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and both prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's, Annex АП's, and
    Annex Ф4's own VERIFICATION.md files all already recorded, confirming
    the same unchanged source file across four cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua-scan`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets, including `МПЗ`. The
    `МПЗ` sheet (`!ref` = `A1:DG72`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    and cross-referenced against the workbook's own `!merges` array (153
    entries for this sheet) to resolve exactly which column range each
    header label spans.

### Structure confirmed

The `МПЗ` sheet's 72-row extent resolves to a title/header block, one
repeating land-plot table with its own total row, a short computation
section, footnotes, and a signature block:

- **Title block** (rows 1-14): the receipt-stamp placeholder (not modelled,
  officer-facing), the "Додаток МПЗ до податкової декларації про майновий
  стан і доходи" heading, the calculation's own subtitle naming its scope
  and filer population (individual entrepreneurs, other than those on the
  simplified system, who own/lease/otherwise use agricultural land plots),
  and the taxpayer identification field (rows 11-14).
- **Declaration type/period header** (rows 18-21): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's own `declarationType`) and reporting period. Confirmed via
  direct inspection of every non-empty cell in rows 18-21 that this header
  carries no companion "місяць" (month) column in either period box —
  matching Annex Ф4's own convention rather than Annex АП's month-bearing
  one.
- **Розділ І — land-plot table** (rows 24-34): a bounded four-entry table
  (rows 30-33, entries 1.1-1.4) with 14 numbered columns: row number,
  cadastral number, KATOTTG location code, area (own/leased split),
  normative valuation (assessed/not-assessed split), coefficient K, months
  held, minimum tax obligation (assessed/not-assessed split), the section's
  own total ЗМПЗ column, each plot's own share percentage, and each plot's
  own PIT amount. Row 34 ("2" / "УСЬОГО") is the section's own total row.
  **Confirmed, via the sheet's own per-cell "х" (not-applicable) markings,
  an inverted per-row/total convention from Annex Ф4's own tables**: column
  12 (`BX`, the total ЗМПЗ) is marked "х" on all four individual entry rows
  (`BX30`-`BX33`) and printed only on the total row (`BX34`, left blank for
  the filer to complete), while columns 13-14 (`CM`, `CN` — share
  percentage and PIT amount) are the reverse: left blank on the four entry
  rows for the filer to complete, and marked "х" on the total row
  (`CM34`, `CN34`) since neither a share percentage nor a location-specific
  PIT amount is meaningful for a combined total. Modelled precisely as
  printed: `landPlot{1-4}SharePercentage`/`landPlot{1-4}PitAmount` are
  per-plot fields, while `landPlotsTotalMinTaxObligationAmount` is the
  section's own single total-row field.
- **Розділ ІІ — computation** (rows 37-48): three numbered lines with a
  single "Сума (грн, коп.)" value column each — the carried-forward total
  minimum tax obligation (line 01, referencing Section I's own column 12 /
  row 2 total by its own printed cross-reference); the total taxes/fees/
  payments paid during the reporting year (line 02), broken into six
  sub-line categories (02.1 net agricultural-income PIT/military levy;
  02.2 employee/civil-law-relationship and land-lease PIT/military levy;
  02.3 single tax, on mid-year switch from the simplified system; 02.4
  agricultural land tax; 02.5 water-use rental fee; 02.6 20 percent of
  lease-payment expense for state/communally-owned or legal-entity-leased
  agricultural land); and the positive difference between the two (line
  03), which the sheet's own instruction states is carried to column 14 of
  Section V of the parent declaration.
- **Footnotes** (rows 50-56): six numbered footnotes defining the filer
  population (footnote 1), НГОд/НГО (footnote 2), coefficient K including
  its temporary 2022/2023 override (footnote 3), the calendar-months
  definition (footnote 4), the categories exempt from the minimum tax
  obligation and the statutory UAH 700/1,400-per-hectare floor (footnote
  5, printed across two paragraphs — rows 54 and 55 — under a single
  footnote marker), and the KATOTTG classifier citation (footnote 6) — none
  modelled as fields, consistent with this registry's established
  treatment of footnote/legend text as field-level `description` context
  rather than data.
- **Attestation and signature block** (rows 57-61): the accuracy
  attestation statement (row 57, "Наведена інформація є правильною.") and
  the signature block (signature + printed name, officer-facing fields,
  not modelled as data).
- A "2" printed at `AW35` and "Продовження додатка МПЗ" ("continuation of
  Annex МПЗ") at `CM36` are a page-break/page-number artifact of the
  sheet's own two-page print layout (Розділ І prints on page 1, Розділ ІІ
  and the footnotes on page 2), not a footnote reference — confirmed by
  cross-referencing the footnote markers actually attached to Розділ І's
  own column headers (superscripts 2-6 on columns 6, 7, 8, 9, 10, 11),
  each of which resolves to one of the six footnotes at rows 50-56, with
  none pointing to row 35 or 36.

## Scope and disclosed boundaries

This schema models the `МПЗ` sheet **in full** — the land-plot table, its
section total, the header/period fields, and the Розділ ІІ computation —
since the sheet's own structure is already fully bounded (no unbounded
repeating rows). Scoping decisions made and documented here rather than
silently:

- **The four entry rows are the sheet's own fixed printed capacity** (rows
  30-33, each numbered 1.1-1.4 in the source itself), not an arbitrary cap
  chosen by this schema — the same convention already established by Annex
  Ф4's own three-entry tables and this registry's `kz/kgd` Form 220.0X
  series for bounded repeating groups.
- **Row/column numbers themselves are not modelled as fields.** They are
  fixed, printed labels (№ з/п, column numbers 1-14), the same treatment
  this registry's other UA DPS annexes and the `kz/kgd` series both give
  their own fixed row/item numbers.
- **`landPlotNKatottgCode` is modelled as a pattern-constrained free
  string, not an enumerated field**, since the KATOTTG classifier it
  references is an external, separately gazetted code list (per footnote
  6) not reproduced on this sheet — the same treatment this registry gives
  other external-classifier columns (e.g. the `kz/kgd` Form 220.0X series'
  own Customs Union country/currency code columns).
- **`totalMinTaxObligationAmount` (Розділ ІІ line 01) is modelled as its
  own distinct field, even though it is the same value as
  `landPlotsTotalMinTaxObligationAmount` (Розділ І's own total row,
  column 12)** — the source itself prints line 01 as a separate box with
  its own line code ("01") on a physically separate page (Розділ ІІ begins
  the sheet's second printed page), so it is modelled as its own field per
  this registry's established practice of modelling every distinct printed
  box, with the carry-forward relationship documented in the field's own
  `description` rather than silently collapsed into a single field.
- **One representative `crossFieldValidation` rule** is included
  (`positiveDifferenceAmount` ≤ `totalMinTaxObligationAmount`, since line 03
  is defined as the positive value of line 01 minus line 02, and line 02 has
  its own minimum of 0) — the sum relationship among the six 02.n sub-lines
  and their own line 02 total is documented in each field's own
  `description` rather than expressed as a rule, consistent with Annex
  Ф4's own established practice of reserving `crossFieldValidation` for
  simple two-field comparisons, not multi-field sum formulas.
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field and both prior annexes' own fields do.
- **No `visibleWhen`/`requiredWhen` gating is attached to any Розділ І/ІІ
  field.** Nothing in the sheet's own source text ties the land-plot table
  or the computation section to a specific `declarationType` value — a
  qualifying agricultural-land taxpayer files this annex regardless of
  whether the parent declaration is original or corrective, so gating here
  would be an invented rule not supported by the source.
- **Area (`landPlotNAreaOwnHa`/`landPlotNAreaLeasedHa`) fields are modelled
  as unconstrained non-negative numbers, not with a `multipleOf` decimal-
  precision constraint**, even though the sheet's own unit note specifies
  "гектари - з чотирма десятковими знаками" (hectares, to four decimal
  places) — this registry's established validation style constrains
  numeric fields by sign/range, not by decimal-place count, and no other
  schema in this registry currently encodes a `multipleOf` precision rule
  from a similar source instruction.

**Not modelled, left as open backlog:**

- The other seven companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3) remain open
  backlog for future companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too
  — see "Why this candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-mpz/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the header fields and a single land-plot entry, one fuller
`corrective`-type filing exercising all four land-plot entries plus the full
Розділ ІІ computation and the correction-period field) and 7
mutation-control fixtures (each expected to raise exactly 1 class of error):
a missing required `taxpayerTaxNumberOrPassport`, an invalid
`declarationType` enum value, a missing `correctedPeriodYear` when
`declarationType` is `corrective`, a negative `landPlot1MinTaxObligationAssessedAmount`,
a wrong-type `landPlot1CoefficientK`, an unknown field rejected, and a
`crossFieldValidation` violation (`positiveDifferenceAmount` exceeding
`totalMinTaxObligationAmount`). All 9 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- The other seven companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2,
  Ф3) remain open backlog — see "Scope and disclosed boundaries" above.
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
declaration and both prior annexes, this cycle's own dedicated sheet read
cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
