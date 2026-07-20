# Verification record — `ua/dps/individual-income-tax-declaration-annex-kik` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-3907**, authoring child
issue **GOV-3996**), deepening Ukraine's own disclosed Taxes backlog — the
ten companion schedules the GOV-3531 cycle disclosed but did not model when
it authored `ua/dps/individual-income-tax-declaration` (the main declaration
sheet), of which four (Annex АП, Annex Ф4, Annex МПЗ, Annex Ф1) were already
modelled by the GOV-3588, GOV-3623, GOV-3632, and GOV-3641 cycles
respectively.

## Why this candidate

This cycle re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section fresh. Ukraine's own disclosed Taxes backlog (six
remaining companion schedules — ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф2, Ф3 — to the
already-published main declaration) remains the strongest immediately-
actionable candidate: the source workbook is already fetched, hashed, and
structurally inventoried across five prior cycles (GOV-3531, GOV-3588,
GOV-3623, GOV-3632, GOV-3641), so no new source-discovery risk is involved.

The GOV-3632 cycle had already sized all remaining sheets fresh
(`XLSX.readFile` + `!ref`/`!merges` count); of the six sheets remaining
after Ф1, **КІК has the fewest merges (116)** of any remaining sheet,
matching that pre-sizing table's own count exactly (re-confirmed this
cycle via a fresh `XLSX.readFile` read: `!ref` = `A1:BO207`, 116 merges).

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**
  (the same combined workbook as the main declaration and all four prior
  annexes), approved by Order of the Ministry of Finance of Ukraine No. 859
  of 2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from 1 January
  2026), this cycle modelling its own `КІК ` sheet (the sheet's own
  internal name carries a trailing space, the same convention already
  observed for the `Ф 1` sheet's own internal space).
  - **Cited URL (same as the parent declaration and all four prior
    annexes):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch again returns HTTP 403 to this sandbox
    (re-confirmed this cycle). Fetched instead via the same Wayback Machine
    mirror the parent declaration's and all four prior annexes' own
    VERIFICATION.md files cite
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200 on the first attempt, no transient-500 flake.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac` —
    **byte-identical** to the hash the parent declaration's and all four
    prior annexes' own VERIFICATION.md files already recorded, confirming
    the same unchanged source file across six cycles now.
  - **Extraction method:** parsed with the `xlsx` npm package (fresh scratch
    install at `/tmp/ua_dps_kik`, not committed to this repository) via
    `XLSX.readFile`, confirming all 11 declared sheets (including `КІК `).
    The `КІК ` sheet (`!ref` = `A1:BO207`) was read cell-by-cell with
    `XLSX.utils.decode_range`/`encode_cell` (not the row-array convenience
    helper, which merges adjacent non-empty cells) across its full extent,
    dumping every non-empty cell to confirm the sheet's printed content in
    full, and cross-referenced against the workbook's own `!merges` array
    (116 entries for this sheet) to resolve exactly which column range each
    header label and line-code/amount pair spans.

### Structure confirmed

The `КІК ` sheet's 63-row printed extent (rows 64-207 are blank print-area
padding) resolves to a title/header block, a CFC-identification block, a
two-section flat computation (no repeating-row table of any kind),
footnotes, and a signature block — a genuinely different shape from every
other UA DPS annex authored so far:

- **Title block** (rows 1-15): the receipt-stamp placeholder (not modelled,
  officer-facing), the "Додаток КІК до податкової декларації про майновий
  стан і доходи" heading, the calculation's own subtitle ("Розрахунок
  податкових зобов'язань з податку на доходи фізичних осіб та військового
  збору, визначених з частини прибутку контрольованої іноземної компанії"),
  and the taxpayer identification field (rows 12-15).
- **Declaration type/period header** (rows 18-21): declaration type
  (Звітна/Звітна нова/Уточнююча — the same three-value enum as the parent
  declaration's and all four prior annexes' own `declarationType`) and
  reporting period. This header carries no companion "місяць" (month)
  column in either period box — matching Annex Ф4's, Annex МПЗ's, and
  Annex Ф1's own convention rather than Annex АП's month-bearing one.
- **CFC identification block** (rows 25-37): full name (English), legal
  form, location (English), ownership share percentage, state registration
  number, ownership structure, country name, and country code — followed by
  the sheet's own explicit note (row 37): "Заповнюється окремо по кожній
  контрольованій іноземній компанії" (filled out separately for each
  controlled foreign company), confirming this schedule is filed once per
  CFC, not once per declaration. This is a genuinely different shape from
  every prior UA DPS annex: Annex Ф1, Annex Ф4, and Annex МПЗ each print a
  fixed-capacity repeating-row table (of one, three, and four entries
  respectively) for their own subject matter, while Annex КІК instead
  prints a single named-entity identification block with no row-numbered
  table structure at all.
- **Розділ І — indicators** (rows 38-47): three numbered lines (1, 2, 3)
  plus one sub-line (1.1) under line 1's own "у тому числі:" (including:)
  note — the adjusted profit share included in the controlling person's
  taxable income, its own actually-distributed-profit sub-component, and
  two dividend-income categories (from Ukrainian profit-tax payers, and
  from Ukrainian non-profit-tax-paying entities). No explicit summation
  formula ties lines 1.1/2/3 back to line 1's own total — this cycle
  transcribed the sheet's own "у тому числі:" wording as descriptive
  context only, not as a modelled `crossFieldValidation` rule, since
  inventing one would go beyond what the source text itself states.
- **Розділ ІІ — tax obligations** (rows 48-55): six numbered lines (4-9) —
  PIT computed from the adjusted profit share (line 4, its own printed
  formula splitting the base by whether it was actually distributed or
  not, at two different rates per Article 167.1 and sub-clause 167.5.4),
  PIT on each of the two dividend categories (lines 5, 6, each at its own
  cited rate), the foreign tax credit (line 7, explicitly capped at line 4
  by the sheet's own printed text and citing footnote 3's documentary-proof
  condition), the final PIT payable (line 8, printed formula (line 4 − line
  7) + line 5 + line 6), and the final military levy payable (line 9,
  printed formula (line 1 + line 2 + line 3) × the point 16-1 subdivision
  10 Chapter XX rate).
- **Footnotes** (rows 56-58): the CFC-identification sourcing note
  (footnote 1: full name/location per registration documents; country name
  and code per the State Statistics Service's own country-code classifier,
  Order No. 32 of 8 January 2020, or a free-economic-zone name), the share-
  percentage sourcing note (footnote 2: per the taxpayer's own separately
  filed Report on Controlled Foreign Companies), and the foreign-tax-credit
  documentary-proof condition (footnote 3) — none modelled as fields,
  consistent with this registry's established treatment of footnote/legend
  text as field-level `description` context rather than data.
- **Signature block, no attestation sentence** (rows 61-63): confirmed by
  dumping every non-empty cell across the entire `КІК ` sheet (rows 1-207,
  columns A-BO) that **no accuracy-attestation sentence** ("Інформація,
  наведена в додатку до декларації, є правильною." or similar) exists
  anywhere on this sheet — only the signature-block label itself ("Фізична
  особа – платник податку або уповноважена особа") and the "(підпис)"/
  "(власне ім'я та прізвище)" captions, both officer/applicant-facing and
  not modelled as data. This is the **second** of this registry's five
  authored UA DPS annexes (after Annex Ф1) to have no `documents` key at
  all — the omission is disclosed, not an oversight, and follows the same
  spec `minItems: 1` reasoning Annex Ф1's own VERIFICATION.md already
  established.

## Scope and disclosed boundaries

This schema models the `КІК ` sheet **in full** — the CFC-identification
block, and both Розділ І's and Розділ ІІ's own computation lines — since
the sheet's own structure is already fully bounded (no repeating rows of
any kind, unlike every other UA DPS annex authored so far). Scoping
decisions made and documented here rather than silently:

- **This annex is filed once per controlled foreign company**, per the
  sheet's own row-37 note. A taxpayer with multiple CFCs would submit
  multiple copies of this schema, each with its own CFC-identification
  block and computation — the schema itself models a single CFC's own
  data, consistent with the sheet's own printed design.
- **`cfcCountryCode` carries no fixed-length pattern.** Footnote 1 cites an
  external classifier (the State Statistics Service's own "Перелік кодів
  країн світу для статистичних цілей," Order No. 32 of 8 January 2020)
  rather than printing the code format on this sheet or in its own Rules
  text; this cycle did not independently fetch that classifier, so the
  field is left as an unconstrained short string (`minLength: 1`,
  `maxLength: 10`) rather than a fabricated pattern — the same caution this
  registry's other annexes already apply to codes sourced from external
  classifiers.
- **No `crossFieldValidation` rule sums lines 1.1/2/3 into line 1**, despite
  line 1's own "у тому числі:" (including:) wording — see "Розділ І —
  indicators" above. Only one `crossFieldValidation` rule is included
  (`foreignTaxPaidAmount` ≤ `pitFromAdjustedProfitAmount`, since line 7's
  own printed text explicitly states the cap "але не більше ніж рядок 4"),
  consistent with this registry's own established practice of reserving
  `crossFieldValidation` for comparisons the source text itself states
  explicitly.
- **No `documents` attestation entry (the key is omitted entirely, not an
  empty array)** — see "Signature block, no attestation sentence" above.
- **Row/line numbers themselves are not modelled as fields.** They are
  fixed, printed labels (line codes 1, 1.1, 2, 3, 4-9), the same treatment
  this registry's other UA DPS annexes and the `kz/kgd` series both give
  their own fixed row/item numbers.
- **`taxpayerTaxNumberOrPassport` reuses the parent declaration's own
  either/or free-string modelling** (RNOKPP, or a religious objector's
  passport series/number) rather than a fixed-length numeric pattern, for
  the same reason the parent field and all four prior annexes' own fields
  do.
- **No `visibleWhen`/`requiredWhen` gating is attached to any CFC-
  identification or computation field beyond `correctedPeriodYear`.**
  Nothing in the sheet's own source text ties the CFC block or the
  computation to a specific `declarationType` value — a qualifying taxpayer
  files this annex regardless of whether the parent declaration is
  original or corrective, so gating here would be an invented rule not
  supported by the source.
- **Every substantive content field beyond the shared header (taxpayer ID,
  declaration type, reporting year) is modelled as not required**, even
  though the CFC-identification fields are this annex's own core reason for
  being filed — for consistency with this registry's established treatment
  of every other UA DPS annex's own primary content fields, since no
  automated validator can know in advance whether a given filing will carry
  data on this sheet at all.

**Not modelled, left as open backlog:**

- The other five companion schedules disclosed by the parent declaration's
  own VERIFICATION.md (ЄСВ1, ЄСВ2, ЄСВ3, Ф2, Ф3) remain open backlog for
  future companion schemas.
- Kazakhstan's own unscreened Form 250.00 lead (surfaced by the GOV-3616
  cycle closing the Form 220.0X series) remains unscreened this cycle too
  — see "Why this candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration-annex-kik/1.0.0/`: 2
valid submissions (0 errors each — one minimal `original`-type filing with
only the header fields, no CFC data filled in, and one fuller
`corrective`-type filing exercising the full CFC-identification block and
the full Розділ І/ІІ computation) and 7 mutation-control fixtures (each
expected to raise exactly 1 class of error): a missing required
`taxpayerTaxNumberOrPassport`, an invalid `declarationType` enum value, a
missing `correctedPeriodYear` when `declarationType` is `corrective`, a
`cfcSharePercentage` exceeding its 100 maximum, a negative
`pitFromAdjustedProfitAmount`, an unknown field rejected, and a
`crossFieldValidation` violation (`foreignTaxPaidAmount` exceeding
`pitFromAdjustedProfitAmount`). All 9 were independently re-checked this
cycle with a fresh, from-scratch, throwaway Node mock validator built
directly from this schema's own `required`/`requiredWhen`/`validation`/
`crossFieldValidation` definitions (not committed, per this registry's
established per-cycle practice) — each fixture produced exactly the
expected pass/fail result. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass across the full registry with this schema
added (551/551).

## Known gaps

- The other five companion schedules to
  `ua/dps/individual-income-tax-declaration` (ЄСВ1, ЄСВ2, ЄСВ3, Ф2, Ф3)
  remain open backlog — see "Scope and disclosed boundaries" above.
- Kazakhstan's own Form 250.00 lead (surfaced by the GOV-3616 cycle closing
  the Form 220.0X series) remains unscreened — a future cycle should
  independently confirm whether a genuine unauthenticated field-by-field
  source exists for it before treating it as ready to author.
- Ukraine's Passport-vertical companion schedule (the consular-mirrored PDF
  disclosed by the GOV-3537 cycle) and Ukraine's remaining DMV/National ID
  verticals (both previously found weak) were not re-screened this cycle.
- `cfcCountryCode`'s exact format/length was not independently confirmed
  against the State Statistics Service's own classifier (Order No. 32 of 8
  January 2020) — see "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(the same parsed legacy `.xls` workbook already opened for the parent
declaration and all four prior annexes, this cycle's own dedicated sheet
read cell-by-cell) and transcribed its fields. No automated re-verification
tooling exists yet for this schema; `nextReviewBy` is set 6 months out per
the practice's default cadence.
