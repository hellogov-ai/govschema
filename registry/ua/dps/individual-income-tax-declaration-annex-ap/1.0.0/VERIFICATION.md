# Verification record — `ua/dps/individual-income-tax-declaration-annex-ap` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3588**), deepening
Ukraine's own disclosed Taxes backlog — the ten companion schedules the
GOV-3531 cycle disclosed but did not model when it authored
`ua/dps/individual-income-tax-declaration` (the main declaration sheet).

## Why this candidate

This cycle first re-checked Kazakhstan's `adilet.zan.kz` Form 220.0X
image-serving endpoint (the vein the last several cycles, GOV-3477 through
GOV-3574, have been mining) and confirmed it is **still down** — a third
independent confirmation, and this cycle found the failure mode had actually
changed shape: every image request now returns a genuine HTTP 404 (tested
across images 170, 182-194, and even an unrelated document's image 1.jpg),
rather than the earlier cycles' own "Ведутся технические работы" (technical
maintenance) 200-status placeholder page. The main HTML document page itself
still loads fine (HTTP 200, 2.6MB); the outage is specific to the image
endpoint, and is now confirmed broader (affecting a wholly unrelated document
ID, not just the Form 220.00-220.10 image bundle) than any prior cycle's
narrower description. Kazakhstan's Form 220.07-220.10 remain open backlog for
a future cycle once this clears.

Rather than force that outage a fourth time, this cycle re-scanned
CATALOG.md's own "Genuinely open, well-sourced candidates" section fresh and
picked up Ukraine's own disclosed backlog instead: ten companion schedules
(ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, Ф4, МПЗ, АП) to the already-published main
declaration, each its own dedicated sheet in the same source workbook. Of the
ten, Annex АП (advance-payment computation, retail fuel trade) was picked
first: it is one of the smaller sheets (`A1:BD80`, versus e.g. Ф3's
`A1:BQ420`), has a clean, fully bounded structure (two twelve-month repeating
tables, no unbounded rows), and is one of only three schedules (with КІК and
ЄСВ2/ЄСВ3) whose gating field on the main declaration is already modelled as
a count/flag rather than a bare boolean — making it a natural next companion
schema to pair with the main declaration's own disclosed gap list.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration), approved by Order of
  the Ministry of Finance of Ukraine No. 859 of 2 October 2015, as amended by
  Order No. 119 of 26 February 2025 (the edition modelled here, effective for
  reporting periods from 1 January 2026), this cycle modelling its own `АП`
  sheet.
  - **Cited URL (same as the parent declaration):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's own VERIFICATION.md cites
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`).
    The first attempt this cycle returned HTTP 500 with a short (141,476-byte)
    error body; two more attempts of the exact same URL also 500'd, but a
    fourth attempt (retried after the same short delay the GOV-3581 cycle's
    own "Wayback transient-500" note recommends) returned HTTP 200 with the
    genuine 869,376-byte file — reconfirming that note's own finding that this
    specific failure mode is a transient content-server flake worth retrying
    through, not a dead source.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's own
    VERIFICATION.md already recorded, confirming the same unchanged source
    file. First 8 bytes `D0 CF 11 E0 A1 B1 1A E1` (OLE2/Compound File Binary
    Format), confirming a genuine legacy BIFF8 `.xls`.
  - **Extraction method:** parsed with the `xlsx` npm package (reused an
    existing scratch install already present in this sandbox at
    `/tmp/xlsxtool`, not committed to this repository) via `XLSX.readFile`,
    confirming all 11 declared sheets, including `АП`. The `АП` sheet
    (`!ref` = `A1:BD80`) was read cell-by-cell with `XLSX.utils.decode_range`/
    `encode_cell` (not the row-array convenience helper, which merges
    adjacent non-empty cells) across its full extent, and cross-referenced
    against the workbook's own `!merges` array to resolve exactly which
    column range each header label spans — necessary because several header
    labels (e.g. the three retail-outlet-count sub-columns, and Section II's
    two three-column groups) are printed once above a merged multi-column
    span rather than repeated per column.

### Structure confirmed

The `АП` sheet's 80-row extent resolves to a header block, two numbered
sections, footnotes, and a signature block:

- **Title block** (rows 1-17): the receipt-stamp placeholder (not modelled,
  officer-facing), the "Додаток АП до податкової декларації про майновий
  стан і доходи" heading, the calculation's own subtitle naming its scope
  (individual entrepreneurs on the general taxation system engaged in retail
  fuel trade), and the taxpayer identification field.
- **Declaration type/period header** (rows 21-27): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's own `declarationType`), reporting period (year, and month
  per footnote 1), and — mirroring the parent declaration's own
  correction-period fields — the period being corrected.
- **Розділ I — Розрахунок авансового внеску** (rows 29-46): a twelve-month
  table (Січень-Грудень, row codes 01-12) with nine columns: month name, row
  code, three retail-outlet-count sub-columns (LPG-exclusive; LPG ≥50% of the
  prior month's turnover; other), the calculated advance amount, the
  cessation-declaration carryover amount (footnote 1), the amount payable
  (column 8 = column 6 − column 7), and the amount paid during the reporting
  year (footnote 2). Row 46 ("УСЬОГО2") totals columns 6-9 only — confirmed
  via the workbook's own `!merges` entries for row 46 (`AP46:AT46`,
  `AU46:AY46`, `AZ46:BD46` are present as fillable merged cells, while
  columns 2-5 are explicitly marked "Х", not applicable, in the source
  itself).
- **Розділ ІІ — Розрахунок авансового внеску у зв'язку з виправленням
  самостійно виявлених помилок** (rows 48-66): a second twelve-month table,
  eight columns: month name, row code, and two three-column groups (as
  originally declared / corrected / difference) — one for the amount
  payable, one for the amount paid. Row 66 ("УСЬОГО") totals all six data
  columns (`AC66:AF66` through `AZ66:BD66` are present as fillable merged
  cells); only the row-code column (`Y66`) is marked "Х".
- **Footnotes and signature block** (rows 68-73): footnote 1 (reporting/
  corrected-period month, scoped to entrepreneurs who ceased activity mid-
  year under Article 177.11 of the Tax Code); footnote 2 (the total-paid
  figure's own carry-forward to Annex Ф2, Section III, line 1.3, capped at
  the PIT liability); the accuracy attestation statement (row 70, which
  carries the source's own typo, "правильнною" rather than "правильною" —
  quoted verbatim rather than silently corrected); and the signature block.

## Scope and disclosed boundaries

This schema models the `АП` sheet **in full** — both twelve-month tables,
their annual totals, and the header/period fields — since the sheet's own
structure is already fully bounded (no unbounded repeating rows, unlike some
of this registry's other companion-schedule candidates). Scoping decisions
made and documented here rather than silently:

- **Section II's twelve rows are gated by `visibleWhen: declarationType ==
  corrective`.** The section's own title ("у зв'язку з виправленням
  самостійно виявлених помилок") ties it to amending a previously filed
  Annex АП, the same condition under which the parent declaration's own
  Section VI (lines 23-27) is gated — this schema mirrors that established
  convention rather than leaving Section II ungated.
- **Row codes and month-name labels themselves are not modelled as fields.**
  They are fixed, printed row labels (01-12, Січень-Грудень), the same
  treatment this registry's `kz/kgd` companion-schedule series gives its own
  fixed row/item numbers.
- **`month{N}AdvancePayable` and the four `month{N}Error*Difference` fields
  are each a computed value the source's own column formula derives**
  (column 8 = column 6 − column 7; difference = corrected − as-declared) —
  modelled as their own fields regardless, since the source form prints
  them as fields the filer (or their accounting software) fills in
  directly, the same treatment this registry's parent declaration already
  gives its own computed totals (e.g. `totalAnnualIncome`).
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field does.
- **A single `crossFieldValidation` rule** (`month1AdvancePayable` ≤
  `month1AdvanceCalculated`) is included as a representative sanity check on
  the column-8-equals-column-6-minus-column-7 relationship (column 7's own
  minimum of 0 makes this always true for correctly computed data); the
  identical relationship holds for all twelve months but is not repeated
  twelve times as separate rules, consistent with this registry's practice
  of including a representative rule rather than an exhaustive one.

**Not modelled, left as open backlog:**

- The other nine companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, Ф4, МПЗ) remain
  open backlog for future companion schemas.
- Chapter/article-level detail behind footnote 1's own list of qualifying
  cessation scenarios (Article 177.11's own second paragraph) was not
  independently read this cycle; the footnote's own summary text is quoted
  in each affected field's description instead.

## Conformance fixtures

12 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-ap/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only January's figures and Section II left blank/hidden, one fuller
`corrective`-type filing exercising every month of both sections and the
correction-period fields) and 10 mutation-control fixtures (each expected to
raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, an invalid `declarationType` enum value, an
out-of-range `reportingPeriodMonth`, a negative `month1AdvanceCalculated`, a
wrong-type `month3RetailOutletsOther`, a wrong-type `month6AdvancePaid`, a
missing `correctedPeriodYear` when `declarationType` is `corrective`, an
unknown field rejected, a wrong-type `totalAdvancePayable`, and a
`crossFieldValidation` violation (`month1AdvancePayable` exceeding
`month1AdvanceCalculated`). All 12 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`visibleWhen`/`validation`/`crossFieldValidation`
rules (not committed, per this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- The other nine companion schedules to `ua/dps/individual-income-tax-declaration`
  (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, Ф4, МПЗ) remain open backlog — see
  "Scope and disclosed boundaries" above.
- Kazakhstan's Form 220.07-220.10 remain blocked on the `adilet.zan.kz`
  image-endpoint outage, now independently confirmed down on a third cycle
  and with a changed failure signature (HTTP 404 rather than a 200-status
  maintenance placeholder) — a future cycle should re-check the endpoint
  fresh rather than assume either observation is still current.
- Ukraine's Passport-vertical companion schedule (the consular-mirrored PDF
  disclosed by the GOV-3537 cycle) and Ukraine's remaining DMV/National ID
  verticals (both previously found weak) were not re-screened this cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration, this cycle's own dedicated sheet read cell-by-cell) and
transcribed its fields. No automated re-verification tooling exists yet for
this schema; `nextReviewBy` is set 6 months out per the practice's default
cadence.
