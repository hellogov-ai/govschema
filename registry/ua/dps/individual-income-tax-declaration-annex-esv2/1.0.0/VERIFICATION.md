# Verification record — `ua/dps/individual-income-tax-declaration-annex-esv2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4026**), deepening
Ukraine's own disclosed Taxes backlog — the ten companion schedules the
GOV-3531 cycle disclosed but did not model when it authored
`ua/dps/individual-income-tax-declaration` (the main declaration sheet), of
which eight (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК, Annex Ф2,
Annex ЄСВ3, Annex Ф3) were already modelled by the GOV-3588, GOV-3623,
GOV-3632, GOV-3641, GOV-3907/GOV-3996, GOV-4002/GOV-4004, GOV-4010, and
GOV-4017/GOV-4019 cycles respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Ukraine's own disclosed Taxes backlog (two
remaining companion schedules — ЄСВ1 and ЄСВ2 — to the already-published
main declaration) remains the strongest immediately-actionable candidate:
the source workbook is already fetched, hashed, and structurally
inventoried across nine prior cycles, so no new source-discovery risk is
involved. Between the two, ЄСВ2 was picked: the GOV-4017 cycle had already
sized both fresh (ЄСВ1: `!ref` A1:CA244, 241 merges; ЄСВ2: `!ref` A1:CZ250,
211 merges) and picked the third remaining candidate (Ф3, no repeating
table) as smaller/simpler than both; of the two still open, ЄСВ2 has fewer
merges than ЄСВ1 and was modelled first for that reason.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all eight prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `ЄСВ 2` sheet.
  - **Cited URL (same as the parent declaration and all eight prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the exact timestamped
    Wayback Machine snapshot
    (`https://web.archive.org/web/20260424210531/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake and no empty-body
    flake from the wildcard `/web/2024/` redirect form some prior cycles
    hit.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all eight
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across ten cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/esv2`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `ЄСВ 2`,
    confirmed as the exact sheet-name string `wb.SheetNames` reports — no
    trailing-space quirk on this particular sheet's own name, unlike some
    siblings). The `ЄСВ 2` sheet (`!ref` = `A1:CZ250`, 211 merges) was read
    cell-by-cell with `XLSX.utils.decode_range`/`encode_cell` (not the
    row-array convenience helper, which merges adjacent non-empty cells)
    across its full declared extent, dumping every non-empty cell to
    independently confirm the sheet's printed content ends at row 115 (the
    remaining 135 declared rows, 116-250, are blank print-area padding, the
    same pattern found on every prior UA DPS annex sized this way — no
    enum/checkbox content was found past row 115). Cross-referenced against
    the workbook's own `!merges` array (211 entries for this sheet) to
    resolve exactly which row/column range each header label, entry row,
    and checkbox spans.

### Structure confirmed

The `ЄСВ 2` sheet's 115-row printed extent resolves to a taxpayer-
identification/declaration-type/period header, a voluntary-participation-
agreement identification block, a selectable-insurance-type/coefficient
block, a headline total, a fixed twelve-month table, and a
footnote/signature block. This cycle deliberately did **not** assume
identity with the closest structural sibling, Annex ЄСВ3 — both are
audited/adjusted differently under the Tax Code (ЄСВ3 covers a documentary-
audit adjustment; ЄСВ2 covers voluntary-participation contributions) — and
found several genuine structural differences by reading ЄСВ2's own printed
cells directly:

- **Header, taxpayer identification** (rows 15-24): identical in substance
  to Annex ЄСВ3's own header — the standard RNOKPP-or-religious-objector-
  passport field (rows 15-18), the second Pension-Fund-specific passport
  field (rows 20-21, `pensionFundIdentificationPassport`, footnote * at row
  106), and a direct full-name field (row 24, `fullName`). One minor
  textual quirk found: row 24's own cell literally reads "імя" without an
  apostrophe (confirmed via a codepoint dump of the raw cell string),
  unlike Annex ЄСВ3's own equivalent cell, which prints "ім'я" with one —
  disclosed in `fullName`'s own field description rather than silently
  normalized away.
- **Declaration type and period** (rows 28-38): **a genuinely two-value
  `declarationType` enum**, matching Annex ЄСВ3's own two-value convention
  (not the three-value original/revised_original/corrective convention
  most other authored UA DPS annexes share). Confirmed by dumping every
  non-empty cell across the sheet's full printed extent: only two
  checkbox/label pairs exist (`Звітна` at D31:E31/F31:J31 and `Звітна нова`
  at L31:M31/N31:V31); no third checkbox or `Уточнююча` label exists
  anywhere. The period box (`reportingPeriodYear`/`reportingPeriodMonth`,
  footnotes 2/1 at rows 108/107) is gated per its own footnote wording to
  persons participating in voluntary insurance filing an "original" or
  "revised original" declaration — modelled as optional, matching the same
  convention this registry established for Annex АП and reused for Annex
  Ф2 and Annex ЄСВ3.
- **Voluntary-participation agreement identification** (rows 38-56): **a
  genuine structural departure from Annex ЄСВ3.** Where ЄСВ3 identifies a
  documentary audit act (a single date split into three labelled
  `число`/`місяць`/`рік` cells, plus an act number), ЄСВ2 instead
  identifies a voluntary-participation agreement: `calculationYear` (row
  38, same field as ЄСВ3's own), `calculationSequenceNumber` (row 40,
  footnote 3 — gated to "one voluntary-participation agreement" rather
  than "one audit act"), `contractNumber` (rows 43-44), and **five separate
  dates** — `contractConclusionDate` (row 47), `contractExpirationDate`
  (row 49), `contractTerminationDate` (row 51), a previous-period date pair
  `previousPeriodFrom`/`previousPeriodTo` (rows 53-54), and `paymentDate`
  (row 56). A full non-empty-cell dump confirmed **none of these five dates
  print `число`/`місяць`/`рік` sub-labels** the way Annex ЄСВ3's own single
  audit-act date does (row 43, columns AR/BD/BW) — each ЄСВ2 date prints
  only bare numeric entry boxes separated by two literal `.` characters
  (dots found at, e.g., columns BO/BT for most, AT/AY then BO/BT for the
  previous-period pair). Rather than fabricating day/month/year column
  boundaries this cycle could not independently confirm from the sheet's
  own printed text, each date is modelled as a single `date`-typed field
  (matching the main declaration's own `filingDate` convention).
- **Selectable insurance types and coefficient mark** (rows 63-73): **a
  second genuine structural departure.** Section 8 offers two selectable
  insurance types — pension insurance (row 65, `pensionInsuranceSelected`)
  and social insurance (row 67, `socialInsuranceSelected`) — modelled as
  boolean fields, but this cycle could **not** locate a distinct 2-column
  checkbox merge cell adjacent to either label in the sheet's own
  `!merges` array (each label's own merge, A65:AR65/A67:AS67, runs the full
  row width with nothing else on the row). This contrasts with
  `declarationType`'s own confirmed 2-column checkbox merges (D31:E31,
  L31:M31) and with section 9's own coefficient-2 mark (row 70), which
  **does** have a confirmed 2-column checkbox merge (CA70:CB70) separate
  from its label merge (A70:BD70) — the same 2-column convention. Whether
  sections 8's two lines are actually rendered as tick-boxes or as plain
  marked text on the printed form is therefore not fully confirmed from
  cell/merge structure alone; disclosed explicitly in both fields' own
  descriptions rather than guessed. Section 7 ("Тип форми", row 58/60)
  prints a single fixed value ("добровільна участь") with no adjacent
  checkbox merge and no alternative value anywhere on the sheet — like
  Annex ЄСВ3's own analogous "Тип форми" line, this is not modelled as a
  fillable field, since it carries no second value to distinguish; it is
  reflected instead in this document's own top-level `description`.
- **Headline total** (row 73): **a third genuine structural departure.**
  Section 10 prints a headline "Загальна сума добровільних внесків..."
  total (`declaredTotalVoluntaryContributionsAmount`) *ahead of* the
  twelve-month table — a field with no equivalent anywhere on Annex ЄСВ3's
  own sheet (which totals only within its own table's `УСЬОГО` row). The
  sheet prints no formula tying this headline total to the table's own
  total row, so both are modelled and transcribed independently rather
  than asserting an equality the source text does not state.
- **Twelve-month table** (rows 75-91): **a fourth genuine structural
  departure.** Where Annex ЄСВ3's own table carries three data columns per
  month (category/base amount/liability amount), ЄСВ2's own table carries
  **four**: an insured-person category code (columns O-V, footnote 4 — a
  genuinely two-value enum, `16`/`65`, unlike ЄСВ3's own three-value
  `4`/`5`/`9`), a base amount ("Сума, з якої сплачено страховий внесок...",
  columns W-AV), a voluntary-contributions amount ("Сума добровільних
  внесків", columns AW-BV), and — present on no other authored UA DPS
  annex's own repeating table — a total-days-of-service figure ("Усього
  повних днів стажу", columns BW-CB). Modelled with calendar-month-named
  indexed fields (`january...`-`december...`), matching the convention
  Annex ЄСВ3 established for this registry's fixed-capacity, specific-
  calendar-month tables, plus its own `УСЬОГО` total row
  (`totalBaseAmount`/`totalVoluntaryContributionsAmount`/
  `totalDaysOfService`).
- **Footnote and signature block** (rows 106-115): footnote * (passport
  format, row 106), footnotes 1-4 (rows 107-110), and the signature block
  including an accuracy-attestation sentence ("Наведена інформація є
  правильною:", row 111) — like Annex АП/Ф4/МПЗ/ЄСВ3 (and unlike Annex Ф1,
  КІК, and Ф2), this sheet does print an accuracy-attestation sentence, so
  `documents` is populated with one entry. **A minor genuine textual
  difference from Annex ЄСВ3's own equivalent sentence:** ЄСВ2's own row
  111 cell literally ends with a colon (`:`), where ЄСВ3's own row 86 cell
  prints no trailing punctuation at all — confirmed by reading both raw
  cell strings directly. The `statement` field here is transcribed
  verbatim, including the colon.

## Scope and disclosed boundaries

This schema models the `ЄСВ 2` sheet **in full**: the identification
header, the two-value declaration-type/period header, the voluntary-
participation agreement's own identification fields, the selectable-
insurance-type/coefficient block, the headline total, and the fixed
twelve-month table plus its own total row. Scoping decisions made and
documented here rather than silently:

- **Five dates are modelled as single `date`-typed fields, not split
  day/month/year integers** — unlike Annex ЄСВ3's own audit-act date. The
  sheet prints no `число`/`місяць`/`рік` sub-labels for any of ЄСВ2's own
  dates, only dot-separated numeric boxes, so this cycle could not
  independently confirm exact day/month/year column boundaries and chose
  not to fabricate them — see "Structure confirmed" above.
- **`pensionInsuranceSelected`/`socialInsuranceSelected` are modelled as
  boolean fields despite no confirmed adjacent checkbox merge** — see
  "Structure confirmed" above for the full disclosure of this ambiguity.
- **Section 7's "Тип форми" line is not modelled** — it prints a single
  fixed value with no second option anywhere on the sheet, the same
  treatment Annex ЄСВ3 gave its own analogous line.
- **`declarationType` is a two-value enum** (`original`/`revised_original`),
  matching Annex ЄСВ3's own convention rather than this registry's more
  common three-value UA DPS annex convention — confirmed via a full
  non-empty-cell-dump.
- **The monthly table's own `InsuredPersonCategory` enum is two-valued**
  (`voluntarily_insured_person`/`one_time_payer`, footnote 4), not the
  three-valued convention Annex ЄСВ3's own equivalent column uses.
- **No `crossFieldValidation` rule ties any of the three total-row fields
  back to the twelve months' own entries, nor ties
  `declaredTotalVoluntaryContributionsAmount` (the headline total) to
  `totalVoluntaryContributionsAmount` (the table's own total row).** The
  sheet itself prints no explicit summation formula for either
  relationship — this cycle transcribed all total fields independently
  rather than inventing an equality the source text does not state,
  consistent with this registry's own established practice (see Annex
  ЄСВ3's own equivalent finding).
- **Every table entry field (category, base amount, voluntary-
  contributions amount, days of service, for all twelve months) is
  modelled as not required**, for consistency with this registry's
  established treatment of every other UA DPS annex's own primary content
  fields.
- **`taxpayerTaxNumberOrPassport`, `fullName`, `declarationType`,
  `calculationYear`, `contractNumber`, and `contractConclusionDate` are
  modelled as required** — these identify the specific taxpayer, filing,
  and voluntary-participation agreement this schedule exists to record,
  and every genuine filing of this schedule necessarily has all six.

**Not modelled, left as open backlog:**

- Annex ЄСВ1, the tenth and final companion schedule disclosed by the
  parent declaration's own VERIFICATION.md, remains open backlog.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-esv2/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the six required header/agreement fields, and one fuller
`revised_original`-type filing exercising the full header including both
optional period fields, the Pension-Fund passport field, the agreement's
own optional dates, both insurance-type selections, the coefficient mark,
the headline total, and two months' worth of table entries plus all three
totals) and 7 mutation-control fixtures (each expected to raise exactly 1
class of error): a missing required `taxpayerTaxNumberOrPassport`, a
missing required `fullName`, a missing required `contractNumber`, an
invalid `declarationType` enum value (`corrective` — genuinely invalid
here, as on Annex ЄСВ3, despite being a valid value on most other authored
UA DPS annexes), an invalid `januaryInsuredPersonCategory` enum value, a
negative `januaryBaseAmount`, and an unknown field rejected. All 9 were
independently checked this cycle with a fresh, from-scratch, throwaway Node
mock validator built directly from this schema's own
`required`/`validation` definitions (not committed, per this registry's
established per-cycle practice) — each fixture produced exactly the
expected pass/fail result. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass across the full registry with this schema
added (555/555).

## Known gaps

- Annex ЄСВ1, the tenth and final companion schedule to
  `ua/dps/individual-income-tax-declaration`, remains open backlog — see
  "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule and Ukraine's remaining
  DMV/National ID verticals (both previously found weak) were not
  re-screened this cycle.
- Whether sections 8's two insurance-type-selection lines (rows 65/67) are
  actually rendered as checkboxes, and the exact day/month/year column
  boundaries for this schedule's own five dates, are not confirmed from
  cell/merge structure alone — see "Structure confirmed" above.
- No `crossFieldValidation` rule ties the twelve-month table's own entries
  back to the total-row fields, nor ties the headline total to the table's
  own total row — see "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all eight prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
