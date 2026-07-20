# Verification record — `ua/dps/individual-income-tax-declaration-annex-esv1` v1.0.0

This file is the **source-review record** for this document version, per
the [`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4037**), closing
Ukraine's own disclosed Taxes backlog in full — the ten companion schedules
the GOV-3531 cycle disclosed but did not model when it authored
`ua/dps/individual-income-tax-declaration` (the main declaration sheet), of
which nine (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1, Annex КІК, Annex Ф2,
Annex ЄСВ3, Annex Ф3, Annex ЄСВ2) were already modelled by the GOV-3588,
GOV-3623, GOV-3632, GOV-3641, GOV-3907/GOV-3996, GOV-4002/GOV-4004,
GOV-4010, GOV-4017/GOV-4019, and GOV-4026 cycles respectively. **This
schedule is the tenth and last — no further companion schedules to the
parent declaration remain open backlog after this cycle.**

## Why this candidate

This was the only candidate left: the GOV-4026 cycle's own VERIFICATION.md
explicitly named Annex ЄСВ1 as the sole remaining schedule in Ukraine's own
disclosed Taxes backlog, pre-sized at `!ref` A1:CA244, 241 merges (the
largest of the four candidates the GOV-4010 cycle had sized fresh: ЄСВ1
241 merges, ЄСВ2 211 merges, ЄСВ3 131 merges, Ф3 202 merges).

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
    (re-confirmed this cycle). Fetched instead via the exact timestamped
    Wayback Machine snapshot
    (`https://web.archive.org/web/20260424210531/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no flake of any kind this cycle.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all nine
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across eleven cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/esv1`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `ЄСВ 1`,
    confirmed as the exact sheet-name string `wb.SheetNames` reports). The
    `ЄСВ 1` sheet (`!ref` = `A1:CA244`, 241 merges — matching the GOV-4010
    cycle's own fresh sizing) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full declared
    extent, dumping every non-empty cell to independently confirm the
    sheet's printed content ends at row 109 (the remaining 135 declared
    rows, 110-244, are blank print-area padding, the same pattern found on
    every prior UA DPS annex sized this way — no enum/checkbox content was
    found past row 109). Cross-referenced against the workbook's own
    `!merges` array (241 entries for this sheet) to resolve exactly which
    row/column range each header label, entry row, and checkbox spans.

### Structure confirmed

The `ЄСВ 1` sheet's 109-row printed extent resolves to a taxpayer-
identification header, a declaration-type/period header (with a second,
"period being corrected" box), a termination-registration date, an economic-
activity code, a calculation sequence number, a four-row payer-type/period
table, a three-option form-type selection, a fixed twelve-month table, and a
footnote/signature block. This cycle deliberately did **not** assume
identity with its closest structural siblings, Annex ЄСВ2 and Annex ЄСВ3 —
this is the only ЄСВ-family sibling filed by individual entrepreneurs/
independent professionals/farm household members computing accrued income
and accrued ЄСВ liability directly, rather than a voluntary-contribution or
post-audit adjustment — and found several genuine structural differences by
reading ЄСВ1's own printed cells directly:

- **Header, taxpayer identification** (rows 15-24): identical in substance
  to Annex ЄСВ2/ЄСВ3's own header — the standard RNOKPP-or-religious-
  objector-passport field (rows 15-18), the second Pension-Fund-specific
  passport field (rows 20-23, `pensionFundIdentificationPassport`, footnote
  * at row 97), and a direct full-name field (row 24, `fullName`). The same
  minor textual quirk found on both siblings recurs here: row 24's own cell
  literally reads "імя" without an apostrophe (confirmed via a codepoint
  dump of the raw cell string) — the third sheet in this series to carry
  this exact source-text inconsistency, disclosed in `fullName`'s own field
  description rather than silently normalized.
- **Declaration type and period** (rows 28-38): **a genuinely three-value
  `declarationType` enum** — unlike Annex ЄСВ2/ЄСВ3's own two-value
  convention (no 'corrective'/'Уточнююча' option), matching the three-value
  convention most other authored UA DPS annexes share. Confirmed via three
  distinct 2-column checkbox merges (C31:D31, I31:J31, R31:S31), each
  immediately preceding its own label (`Звітна`, `Звітна нова`,
  `Уточнююча`) — a genuine, confirmed checkbox structure, not inferred
  from label text alone. **A second, distinct period box — unique among
  this registry's authored UA DPS annexes.** Row 28's own header text reads
  "Звітний (податковий) період: Звітний (податковий) період, що
  уточнюється:" (two concatenated labels in one merged cell), and the
  sheet's own digit-entry merges below (row 31 for years, row 35 for
  months) resolve into two separate boxes: a `reportingPeriodYear`/
  `reportingPeriodMonth` pair (near AV31/AQ35, footnote 1 "Довідкова1" at
  row 35 gating it to the same pension/material-support scenario this
  registry established for Annex АП/Ф2/ЄСВ3), and a `correctedPeriodYear`/
  `correctedPeriodMonth` pair (near BR31/BL35, footnote 2 at row 99 gating
  it to a 'corrective' filing reporting a termination/deregistration
  event). This second box exists on this sheet, and not on ЄСВ2/ЄСВ3's own
  sheets, precisely because ЄСВ1 is the only one of the three ЄСВ-family
  siblings that actually supports a 'corrective' declarationType value in
  the first place.
- **Termination-registration date** (rows 38-39): **a genuine structural
  departure from Annex ЄСВ2 (whose five dates print no sub-labels at all)
  and a match with Annex ЄСВ3's own audit-act date convention.** This
  sheet's field 5 date — "Дата державної реєстрації припинення... або дата
  подання до контролюючого органу заяви про зняття з обліку платника
  єдиного внеску" (date of state registration of termination, or date of
  filing a deregistration application) — prints explicit `число`/`місяць`/
  `рік` column labels (confirmed at AQ38/BA38/BR38), so it is modelled as
  three separate integer fields (`terminationRegistrationDay`/`Month`/
  `Year`), not a single `date`-typed field.
- **Economic-activity code and calculation sequence number** (rows 42-45):
  `mainEconomicActivityCode`, a dot-separated numeric entry box (a literal
  '.' cell at BK42 flanked by four 2-column digit-entry merges), modelled
  as a free-form string rather than fabricating an exact digit-grouping
  pattern the cell/merge structure alone does not fully disambiguate; and
  `calculationSequenceNumber` (footnote 3, row 100), whose footnote text
  explicitly states a 2-9 value range (not merely "at least 1" as prior
  siblings' equivalent fields were modelled) — encoded here as
  `minimum: 2, maximum: 9`.
- **Payer type and period of registration** (rows 48-56): **a fourth
  genuine structural departure, and this cycle's most significant
  disclosed finding.** Section 8 lists four payer-type rows, each with its
  own "з"/"по" (from/to) date-range box: "ФО – на загальній системі
  оподаткування" (row 49), "ФО – на загальній системі оподаткування"
  again (row 51, **byte-for-byte identical** to row 49's own label —
  confirmed via a raw codepoint comparison of both cell strings, not just a
  visual match), "Особа, яка провадить незалежну професійну діяльність"
  (row 53), and "Член фермерського господарства" (row 55). A full scan of
  every merge touching rows 48-56 found **no checkbox, footnote, or any
  other distinguishing text** anywhere on the sheet that would explain why
  the general-tax-system payer type is printed twice with an identical
  label. Row 49's own date box does carry two extra empty 2-column merges
  (AF49:AG49, AK49:AL49) that row 51's box lacks, but these read as
  internal digit-entry sub-cells for the "з" date itself, not a semantic
  marker distinguishing the two rows. This cycle models both occurrences
  as separate fields (`generalTaxSystemPeriod1From/To`,
  `generalTaxSystemPeriod2From/To`) and discloses the ambiguity explicitly
  — it may represent two genuinely separate stints of general-system
  registration within one reporting year (e.g. de-registered then
  re-registered), or a template duplication artifact in the source
  workbook itself — rather than guessing which and silently modelling only
  one. None of the four period boxes print `число`/`місяць`/`рік`
  sub-labels, so all eight fields are modelled as `date`-typed, matching
  this registry's established no-sub-label convention.
- **Form type** (rows 58-60): **a fifth genuine structural departure from
  Annex ЄСВ2's own "Тип форми" section**, which prints a single fixed value
  with no second option. This sheet's own section 9 offers three genuine
  selectable scenarios — "після припинення" (after termination, footnote 4,
  row 60 column E), "призначення пенсії" (pension assignment, footnote 5,
  row 60 column U), and "призначення матеріального забезпечення, страхових
  виплат" (material support/insurance-payment assignment, footnote 6, row
  60 column AG). A full merge scan found a confirmed 2-column checkbox
  (AE60:AF60) only for the third option; the first two labels' own merges
  (E60:Q60, and U60 unmerged entirely) have no adjacent checkbox cell
  anywhere on the row. Modelled as three independent boolean fields, each
  disclosing its own checkbox-confirmation status — the same disclosure
  pattern this registry used for Annex ЄСВ2's own
  pensionInsuranceSelected/socialInsuranceSelected ambiguity.
- **Twelve-month table** (rows 66-91): six columns confirmed via the row
  66/69/70/82 merge boundaries (A-K month name, L-T category code, U-AK
  declared net income, AL-BB contribution base amount, BC-BI contribution
  rate percentage, BJ-BS accrued contribution amount). The category-code
  enum (footnote 7, row 104) is genuinely three-valued — codes 4/5/9
  (`farm_household_member`/`individual_entrepreneur_general_basis`/
  `independent_professional_income_recipient`) — matching Annex ЄСВ3's own
  three-value convention (codes 4/5/9), not Annex ЄСВ2's own two-value
  convention (codes 16/65). **A sixth genuine finding: the sixth column's
  own header text states an explicit arithmetic formula** — "Сума
  нарахованого єдиного внеску (графа 4 × графа 5)" (amount of accrued
  unified contribution = column 4 × column 5) — the first time any of this
  registry's eleven authored UA DPS annex/declaration documents has found
  an explicit multiplication formula printed directly in a column header.
  GovSchema's own `crossFieldValidation` vocabulary (GSP-0013 §3,
  `spec/v0.3/govschema.schema.json`'s own `fieldCompare` definition)
  supports only direct field-to-field comparison operators (`equals`,
  `notEquals`, `greaterThan`, `greaterThanOrEqual`, `lessThan`,
  `lessThanOrEqual` against a single `compareTo` field name) — there is no
  operator or mechanism to express "field A equals field B × field C." This
  cycle therefore does **not** add a `crossFieldValidation` rule for this
  relationship, since any rule expressible in the current vocabulary would
  either be wrong (a same-value `equals` check between two different-
  semantics fields) or silently drop the multiplication altogether. This is
  disclosed here as a genuine spec-vocabulary gap, worth raising to the
  Founding Engineer as a candidate for a future GSP-0013 extension (a
  computed/arithmetic comparison operator), rather than worked around
  unilaterally. Row 82's own `УСЬОГО` (total) row confirms, via literal 'х'
  placeholder cells at L82 (category) and BC82 (rate percentage), that only
  the three genuinely summable amount columns (net income, base amount,
  accrued contribution) get their own total fields — matching this
  registry's established total-row modelling convention.
- **Footnote and signature block** (rows 97-107): footnote * (passport
  format, row 97), footnotes 1-8 (rows 98-105), and the signature block
  including an accuracy-attestation sentence ("Наведена інформація є
  правильною.", row 106, trailing period not colon — matching Annex ЄСВ3's
  own equivalent sentence rather than Annex ЄСВ2's own colon-terminated
  version) — `documents` is populated with one entry.

## Scope and disclosed boundaries

This schema models the `ЄСВ 1` sheet **in full**: the identification
header, the three-value declaration-type/dual-period header, the split
termination-registration date, the economic-activity code, the calculation
sequence number, the four payer-type period boxes, the three-option
form-type selection, and the fixed twelve-month table plus its own total
row. Scoping decisions made and documented here rather than silently:

- **`declarationType` is a three-value enum**
  (`original`/`revised_original`/`corrective`), unlike Annex ЄСВ2/ЄСВ3's own
  two-value convention — confirmed via three distinct checkbox merges.
- **A second `correctedPeriodYear`/`correctedPeriodMonth` box is modelled**,
  unique among this registry's authored UA DPS annexes, since this is the
  only ЄСВ-family sibling actually supporting a `corrective` filing.
- **`terminationRegistrationDay`/`Month`/`Year` are split integer fields**,
  not a single `date`-typed field, since the sheet prints explicit
  `число`/`місяць`/`рік` sub-labels for this one date (unlike section 8's
  own four payer-type period boxes, which print none).
- **The general-tax-system payer-type period is modelled as two separate
  field pairs** (`generalTaxSystemPeriod1From/To`,
  `generalTaxSystemPeriod2From/To`), reflecting the sheet's own genuine,
  unexplained duplicate label at rows 49 and 51 — see "Structure confirmed"
  above for the full disclosure of this ambiguity.
- **`afterTerminationFormType`/`pensionAssignmentFormType` are modelled as
  boolean fields despite no confirmed adjacent checkbox merge**; only
  `materialSupportAssignmentFormType` has a confirmed 2-column checkbox
  merge — see "Structure confirmed" above.
- **No `crossFieldValidation` rule is added for the monthly table's own
  stated `графа 4 × графа 5` multiplication formula** — the spec's
  `crossFieldValidation` vocabulary cannot express an arithmetic product
  between two fields, only direct field-to-field comparisons. This is a
  genuine spec-vocabulary gap, not a scoping omission — see "Structure
  confirmed" above.
- **No `crossFieldValidation` rule ties any of the three total-row fields
  back to the twelve months' own entries.** The sheet itself prints no
  explicit summation formula for this relationship — transcribed
  independently rather than inventing an equality the source text does not
  state, consistent with this registry's own established practice.
- **Every table entry field (category, declared net income, contribution
  base amount, contribution rate, accrued contribution amount, for all
  twelve months) is modelled as not required**, for consistency with this
  registry's established treatment of every other UA DPS annex's own
  primary content fields.
- **`taxpayerTaxNumberOrPassport`, `fullName`, and `declarationType` are
  modelled as required`** — these identify the specific taxpayer and filing
  this schedule exists to record. Unlike Annex ЄСВ2/ЄСВ3, this schedule has
  no distinct "operative year" or "contract/audit-act number" field of its
  own to require, since it reports directly against the main declaration's
  own reporting period rather than a separate legal instrument.

**Not modelled, left as open backlog:**

- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too.
- The GSP-0013 §3 `crossFieldValidation` vocabulary gap disclosed above
  (no arithmetic-product comparison operator) is a standards-track finding
  for the Founding Engineer/CEO to consider for a future spec MINOR, not
  something this cycle resolves unilaterally.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-esv1/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the three required fields, and one fuller `corrective`-type filing
exercising the full header including the Pension-Fund passport field, both
period boxes, the split termination-registration date, the economic-
activity code, the calculation sequence number, one general-tax-system
period pair (of the two available), the after-termination form-type flag,
and two months' worth of table entries plus all three totals) and 7
mutation-control fixtures (each expected to raise exactly 1 class of
error): a missing required `taxpayerTaxNumberOrPassport`, a missing
required `fullName`, a missing required `declarationType`, an invalid
`declarationType` enum value, an invalid `januaryInsuredPersonCategory`
enum value (using Annex ЄСВ2's own two-value convention's
`voluntarily_insured_person`, genuinely invalid here since this schedule's
own footnote 7 defines a disjoint three-value set), a negative
`januaryContributionBaseAmount`, and an unknown field rejected. All 9 were
independently checked this cycle with a fresh, from-scratch, throwaway Node
mock validator built directly from this schema's own `required`/
`validation` definitions (not committed, per this registry's established
per-cycle practice) — each fixture produced exactly the expected pass/fail
result. Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass across
the full registry with this schema added (556/556).

## Known gaps

- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's DMV and National ID verticals (both previously found weak) were
  not re-screened this cycle.
- Whether section 9's `afterTerminationFormType`/`pensionAssignmentFormType`
  lines are actually rendered as checkboxes, the exact reason section 8's
  general-tax-system payer type is printed twice with an identical label,
  and the exact digit-grouping of `mainEconomicActivityCode`'s dot-separated
  entry box, are not confirmed from cell/merge structure alone — see
  "Structure confirmed" above.
- No `crossFieldValidation` rule expresses the monthly table's own stated
  `графа 4 × графа 5` multiplication formula, since the spec's vocabulary
  (GSP-0013 §3) supports only direct field-to-field comparisons, not
  arithmetic products — a candidate for a future spec MINOR, not resolved
  by this cycle.
- No `crossFieldValidation` rule ties the twelve-month table's own entries
  back to the total-row fields — see "Scope and disclosed boundaries"
  above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all nine prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
