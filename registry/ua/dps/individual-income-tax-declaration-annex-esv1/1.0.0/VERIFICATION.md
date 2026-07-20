# Verification record — `ua/dps/individual-income-tax-declaration-annex-esv1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4037**, a child of
**GOV-4035**), deepening Ukraine's own disclosed Taxes backlog — the ten
companion schedules the GOV-3531 cycle disclosed but did not model when it
authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which nine (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК,
Annex Ф2, Annex ЄСВ3, Annex Ф3, Annex ЄСВ2) were already modelled by the
GOV-3588, GOV-3623, GOV-3632, GOV-3641, GOV-3907/GOV-3996, GOV-4002/GOV-4004,
GOV-4010, GOV-4017/GOV-4019, and GOV-4026 cycles respectively.

## Why this candidate

Annex ЄСВ1 is the tenth and last of the ten companion schedules
`ua/dps/individual-income-tax-declaration` discloses but does not itself
model. With all nine siblings now authored, this schedule was the only
remaining candidate in Ukraine's own disclosed Taxes backlog — no sizing
comparison against alternatives was needed this cycle. The GOV-4010 cycle
had already pre-sized this sheet fresh (`!ref` A1:CA244, 241 merges — at the
time, the largest of the four then-remaining candidates by merge count).
This cycle independently re-confirmed that sizing and, per this cycle's own
instructions, did **not** trust the declared 244-row extent blindly: a full
non-empty-cell dump of the sheet's entire declared extent found the actual
printed content ends at row 109 — the remaining 135 declared rows
(110-244) are blank print-area padding, the same pattern every prior UA DPS
annex sized this way has shown.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all nine prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `ЄСВ 1` sheet.
  - **Cited URL (same as the parent declaration and all nine prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same exact
    timestamped Wayback Machine snapshot the Annex ЄСВ2 cycle's own
    VERIFICATION.md cites
    (`https://web.archive.org/web/20260424210531/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all nine
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across eleven cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/esv1`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `ЄСВ 1`).
    The `ЄСВ 1` sheet (`!ref` = `A1:CA244`, 241 merges, matching the
    GOV-4010 cycle's own prior sizing exactly) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full declared
    extent, dumping every non-empty cell to independently confirm the
    sheet's printed content ends at row 109 (rows 110-244 are blank
    print-area padding — no enum/checkbox/label content was found past row
    109). Cross-referenced against the workbook's own `!merges` array (241
    entries for this sheet) to resolve exactly which row/column range each
    header label, checkbox, digit-entry box, and table cell spans.

### Structure confirmed

The `ЄСВ 1` sheet's own title (rows 10-11: "Розрахунок сум нарахованого
доходу застрахованих осіб та суми нарахованого єдиного внеску" — Calculation
of the amounts of accrued income of insured persons and the amount of
accrued unified social contribution) identifies this as the **primary/
default** ЄСВ calculation schedule, distinct from both Annex ЄСВ2 (voluntary
participation) and Annex ЄСВ3 (post-audit adjustment). This cycle
deliberately did **not** assume identity with either ЄСВ sibling and found
several genuine structural differences by reading ЄСВ1's own printed cells
directly:

- **Header, taxpayer identification** (rows 15-24): the standard RNOKPP-
  or-religious-objector-passport field (rows 15-18), the second Pension-
  Fund-specific passport field (rows 20/23, `pensionFundIdentificationPassport`,
  footnote * at row 97), and a direct full-name field (row 24, `fullName`).
  As on Annex ЄСВ2 (not Annex ЄСВ3), this sheet's own row-24 cell literally
  reads "імя" without an apostrophe — confirmed via a codepoint dump of the
  raw cell string, matching ЄСВ2's own finding rather than ЄСВ3's ("ім'я",
  with one).
- **Declaration type** (row 28/31): **a genuinely three-value
  `declarationType` enum** — original ("Звітна"), revised_original
  ("Звітна нова"), and **corrective ("Уточнююча")** — confirmed by dumping
  every non-empty cell across the sheet's full printed extent and finding
  three checkbox/label merge pairs (C31:D31/E31:H31, I31:J31/K31:Q31,
  R31:S31/T31). This is a genuine departure from Annex ЄСВ2 and Annex
  ЄСВ3 (both two-value, original/revised_original only) and instead matches
  the three-value convention every *other* authored UA DPS annex shares —
  consistent with ЄСВ1 being the primary schedule rather than a
  scenario-specific adjustment.
- **Two genuinely distinct period-entry boxes** (rows 31/35): **a
  significant structural departure from Annex ЄСВ2 and Annex ЄСВ3.** Those
  two siblings' own header text includes a stray "Звітний (податковий)
  період, що уточнюється:" fragment (visible in row 28's own AA28 cell on
  this sheet too) that both siblings' own VERIFICATION.md files confirmed
  corresponds to **no actual input cell** on their sheets. On *this* sheet,
  the same fragment **does** correspond to real, dedicated digit-entry box
  merges — a second, separate `рік`-labelled merge (BR31:BS31, with its own
  4-pair digit-box run at BC31:BM31) and a second, separate
  `місяць`-labelled merge (BL35:BO35, with its own digit-box run at
  BF35:BJ35) — distinct from the first period box's own `рік`
  (AV31:AX31)/`місяць` (AQ35:AT35) merges. Modelled as `correctedPeriodYear`/
  `correctedPeriodMonth`, alongside the first box's `reportingPeriodYear`/
  `reportingPeriodMonth`. **A disclosed ambiguity:** both `рік` labels
  carry the same footnote-2 marker, whose own text (row 99) bundles two
  scenarios together (an informational reporting-period box for
  pension/material-support assignment, and a cessation-registration-event
  year/month for form type "after cessation") without unambiguously
  assigning one scenario to each of the two physical boxes; the second
  box's own `місяць` label additionally carries no footnote marker of its
  own at all. This cycle transcribed both boxes as separate fields rather
  than collapsing them into one or guessing which footnote scenario belongs
  to which box.
- **No `calculationYear`-equivalent field.** Unlike Annex ЄСВ2 and Annex
  ЄСВ3 (both of which carry an explicit "5. Рік, за який формується
  розрахунок" field, since each covers a calculation that may apply to a
  *different* year than the main declaration's own reporting period), this
  sheet's own item "5." is instead a cessation/deregistration date (see
  below) — confirmed via a full non-empty-cell dump that no comparable
  "рік, за який формується розрахунок" label exists anywhere on this sheet.
  This is consistent with ЄСВ1 being the *primary* ЄСВ calculation,
  necessarily covering the same year as the main declaration it is
  attached to, rather than a distinct-year audit or voluntary-participation
  adjustment.
- **Cessation/deregistration date** (rows 38-39): "5. Дата державної
  реєстрації припинення або дата подання до контролюючого органу заяви про
  зняття з обліку платника єдиного внеску" (date of state registration of
  cessation of business activity, or date of submission of an application
  for deregistration as a ЄСВ payer) — **explicitly split into число
  (day)/місяць (month)/рік (year) integer fields**, confirmed via distinct
  `число`/`місяць`/`рік`-labelled merges (AQ38:AS38/BA38:BD38/BR38:BS38),
  matching Annex ЄСВ3's own `auditActDay`/`Month`/`Year` convention rather
  than Annex ЄСВ2's own bare dot-separated date-box convention.
- **Main economic activity code** (row 42): "6. Код основного виду
  економічної діяльності" — **a field unique to this schedule among this
  registry's ten authored UA DPS annexes.** No sibling schedule requests an
  economic-activity (КВЕД) code. The only structural detail confirmed from
  cell/merge inspection is a literal "." separator cell (BK42); the exact
  digit-grouping either side of it could not be independently confirmed
  from cell/merge structure alone, so `mainEconomicActivityCode` is
  modelled as a free string rather than a fabricated fixed-width numeric
  pattern.
- **Repeat-filing sequence number** (row 45): "7. Номер розрахунку в
  періоді3" — footnote 3 (row 100) states explicitly that this value ranges
  from 2 to 9 (a more specific bound than any sibling's own equivalent
  field states), modelled as `calculationSequenceNumber` with
  `minimum: 2, maximum: 9`.
- **Filer type and period of stay** (rows 48-56): "8. Тип платника та
  період перебування (місяць):" lists four filer-type rows, each with its
  own з (from)/по (to) month-range pair: individual entrepreneur on the
  general taxation system (row 49), a second row (row 51), a person engaged
  in independent professional activity (row 53), and a member of a farming
  enterprise (row 55). **A genuine source-text anomaly disclosed:** row
  51's own printed label is byte-for-byte identical to row 49's own label
  ("ФО – на загальній системі оподаткування") — confirmed via a
  codepoint-level comparison of both raw cell strings (40 identical
  codepoints), not merely a visual read. Given the standard Ukrainian
  individual-entrepreneur general/simplified taxation-system distinction
  and this row's position as the second of four otherwise-distinct filer
  categories, this is presumably intended to denote the simplified taxation
  system, but the sheet's own printed text does not say so — modelled as
  `individualEntrepreneurSecondCategoryFromMonth`/`ToMonth` with the
  ambiguity disclosed in the field's own description, rather than silently
  assumed or corrected.
- **Form type** (row 58/60): "9. Тип форми:" offers **three** selectable
  values — after_cessation ("після припинення", footnote 4), pension_
  assignment ("призначення пенсії", footnote 5), and material_support_
  assignment ("призначення матеріального забезпечення, страхових виплат",
  footnote 6) — **a genuine departure from Annex ЄСВ2 and Annex ЄСВ3**,
  whose own analogous "Тип форми" line each prints only one fixed,
  non-selectable value (confirmed non-fillable on those two sheets, per
  their own VERIFICATION.md files). Modelled as a three-value `formType`
  enum.
- **Twelve-month table** (rows 66-82): a fixed printed capacity of exactly
  twelve entry rows (70-81, one per calendar month, Січень through
  Грудень), each with **five** data columns — an insured-person category
  code (columns L-T, footnote 7: three enumerated values), a net income
  amount (columns U-AK, "Сума чистого доходу (прибутку)..."), a
  contribution-base amount (columns AL-BB, "Сума доходу, на яку
  нараховується єдиний внесок..."), a contribution rate in percent
  (columns BC-BI, footnote 8: "розмір єдиного внеску, встановлений
  законом"), and a resulting contribution amount (columns BJ-BS) — **the
  widest monthly table of any UA DPS annex authored so far** (one column
  wider than Annex ЄСВ2's own four-column table, two wider than Annex
  ЄСВ3's own three-column table). Footnote 7's own code 4 ("член
  фермерського господарства", member of a farming enterprise) shares the
  same numeric value as Annex ЄСВ3's own footnote-4 code but a genuinely
  *different* meaning there ("член колективного та орендного підприємства,
  сільськогосподарського кооперативу") — a distinct enum value name
  (`farm_enterprise_member`, not ЄСВ3's `collective_leased_enterprise_
  member`) is used for this sheet's own code 4, disclosed rather than
  silently reused. **A genuine first among this registry's UA DPS annexes:
  the table's own column-6 header states an explicit arithmetic formula**
  ("Сума нарахованого єдиного внеску (графа 4 × графа 5)" — column 4 ×
  column 5), unlike every prior UA DPS annex's own total-row figures, which
  carry no stated formula at all. Not encoded as a `crossFieldValidation`
  rule: this registry's `crossFieldValidation` shape (see Annex МПЗ's own
  `positiveDifferenceAmountWithinTotalMinTaxObligation` rule) supports only
  two-field comparisons (e.g. `lessThanOrEqual`), not a three-field
  arithmetic product, and a genuine ambiguity remains over whether the
  contribution-rate field is stored as a percentage (e.g. `22`) or a
  decimal fraction (`0.22`) — a literal, unscaled product only reconciles
  under the latter convention, despite the rate column's own header text
  calling it "відсотки" (percent). Disclosed in the field's own
  description rather than guessed.
- **Total row** (row 82): "УСЬОГО" totals the net income, contribution-
  base, and contribution amount columns; the category and rate columns
  print a literal "х" (not applicable) at this row — confirmed via the
  same full non-empty-cell dump — so no `totalInsuredPersonCategory` or
  `totalContributionRate` field is modelled, matching the pattern every
  prior UA DPS annex's own total row has shown for non-summable columns.
- **Footnote and signature block** (rows 97-109): footnote * (passport
  format, row 97), footnotes 1-8 (rows 98-105), and the signature block
  including an accuracy-attestation sentence ("Наведена інформація є
  правильною.", row 106, no trailing punctuation) — like Annex АП/Ф4/МПЗ/
  ЄСВ3 (and unlike Annex Ф1, КІК, Ф2, and Ф3), this sheet does print an
  accuracy-attestation sentence, so `documents` is populated with one
  entry, matching Annex ЄСВ3's own exact sentence (no trailing colon,
  unlike Annex ЄСВ2's own equivalent sentence).

## Scope and disclosed boundaries

This schema models the `ЄСВ 1` sheet **in full**: the identification
header, the three-value declaration-type header, the two period-entry
boxes, the cessation/deregistration date, the main-economic-activity-code
field, the repeat-filing sequence number, the four filer-type/period-of-
stay row pairs, the three-value form-type field, and the fixed twelve-month
table plus its own total row. Scoping decisions made and documented here
rather than silently:

- **`correctedPeriodYear`/`correctedPeriodMonth` are modelled as a second,
  genuinely distinct pair of fields**, unlike Annex ЄСВ2/ЄСВ3's own
  non-fillable equivalent header fragment — see "Structure confirmed"
  above for the full disclosure of the residual ambiguity over exactly
  which footnote-2 scenario applies to which of the two boxes.
- **No `calculationYear` field is modelled** — this sheet carries no
  equivalent to Annex ЄСВ2/ЄСВ3's own field, consistent with ЄСВ1 covering
  the same reporting year as the main declaration — see "Structure
  confirmed" above.
- **`mainEconomicActivityCode` is modelled as a free string**, not a fixed
  numeric pattern, since this cycle could not independently confirm the
  exact digit-grouping around the sheet's own literal "." separator cell
  from cell/merge structure alone.
- **`individualEntrepreneurSecondCategoryFromMonth`/`ToMonth`'s own label
  is disclosed as byte-identical to `individualEntrepreneurGeneralSystem
  FromMonth`/`ToMonth`'s own label** — a genuine source-text duplication
  this cycle did not silently correct or guess a distinct intended label
  for.
- **`januaryInsuredPersonCategory`'s own code 4 enum value is named
  `farm_enterprise_member`**, distinct from Annex ЄСВ3's own `collective_
  leased_enterprise_member` for the same numeric code — the two sheets'
  own footnote text genuinely differs for this code.
- **No `crossFieldValidation` rule ties `januaryContributionAmount` (or any
  other month's own contribution amount) to `januaryContributionBaseAmount`
  × `januaryContributionRate`**, despite the sheet's own column-6 header
  stating this exact formula — this registry's `crossFieldValidation`
  shape supports only two-field comparisons, not a three-field arithmetic
  product, and a genuine ambiguity remains over the contribution-rate
  field's own percentage-vs-fraction scaling — see "Structure confirmed"
  above.
- **No `crossFieldValidation` rule ties any of the three total-row fields
  back to the twelve months' own entries.** The sheet itself prints no
  explicit summation formula for these totals — this cycle transcribed
  the total fields independently rather than inventing an equality the
  source text does not state, consistent with this registry's own
  established practice (see Annex ЄСВ2's/ЄСВ3's own equivalent findings).
- **Every table entry field (category, net income, contribution base,
  contribution rate, contribution amount, for all twelve months), the two
  period-entry boxes, the cessation/deregistration date, the repeat-filing
  sequence number, the four filer-type/period-of-stay pairs, and the
  form-type field are all modelled as not required**, for consistency with
  this registry's established treatment of every other UA DPS annex's own
  scenario-specific and primary-content fields, since no automated
  validator can know in advance which of these scenarios, if any, apply to
  a given filer.
- **`taxpayerTaxNumberOrPassport`, `fullName`, `declarationType`, and
  `mainEconomicActivityCode` are modelled as required** — these are the
  sheet's own foundational identification items (1, 3, 4, 6), which every
  genuine filing of this schedule necessarily carries, consistent with the
  registry's treatment of the equivalent identification fields on every
  other UA DPS annex.

**Not modelled, left as open backlog:** none among Ukraine's own disclosed
ten-companion-schedule series — **this is the tenth and final schedule**,
closing that entire backlog. Kazakhstan's own unscreened Form 250.00 lead
(surfaced by the GOV-3616 cycle closing the Form 220.0X series) remains
unscreened.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-esv1/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the four required header fields, and one fuller `corrective`-type
filing exercising the full header including both period boxes, the
cessation/deregistration date, the repeat-filing sequence number, all four
filer-type/period-of-stay pairs, the form-type field, and two months' worth
of table entries plus all three totals) and 7 mutation-control fixtures
(each expected to raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, a missing required `fullName`, a missing
required `mainEconomicActivityCode`, an invalid `declarationType` enum
value, an invalid `januaryInsuredPersonCategory` enum value, a negative
`januaryNetIncomeAmount`, and an unknown field rejected. All 9 were
independently checked this cycle with a fresh, from-scratch, throwaway Node
mock validator built directly from this schema's own `required`/
`validation` definitions (not committed, per this registry's established
per-cycle practice) — each fixture produced exactly the expected pass/fail
result. Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass across
the full registry with this schema added (556/556).

## Known gaps

- No companion schedule to `ua/dps/individual-income-tax-declaration`
  remains open backlog — this cycle closes Ukraine's entire disclosed
  ten-schedule companion series.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule and Ukraine's remaining
  DMV/National ID verticals (both previously found weak) were not
  re-screened this cycle.
- The exact scoping split between `reportingPeriodYear`/`Month` and
  `correctedPeriodYear`/`Month` (which footnote-2 scenario belongs to which
  physical box) is not fully confirmed from cell/merge structure alone —
  see "Structure confirmed" above.
- `individualEntrepreneurSecondCategoryFromMonth`/`ToMonth`'s own intended
  filer category (presumably the simplified taxation system, by
  elimination) is not confirmed from the sheet's own printed text, which
  literally duplicates the general-system row's own label — see "Structure
  confirmed" above.
- `mainEconomicActivityCode`'s exact digit-grouping format is not
  confirmed from cell/merge structure alone.
- No `crossFieldValidation` rule ties the twelve-month table's own
  contribution-amount entries back to their own stated
  contribution-base-amount × contribution-rate formula, nor ties the total
  row back to the twelve months' own entries — see "Scope and disclosed
  boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all nine prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
