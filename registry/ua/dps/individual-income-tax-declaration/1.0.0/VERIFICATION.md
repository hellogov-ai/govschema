# Verification record — `ua/dps/individual-income-tax-declaration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3531**), deepening
Ukraine's own disclosed Taxes backlog candidate. That candidate was first
flagged when the GOV-3513 cycle opened Ukraine as the registry's 73rd
jurisdiction (via `ua/moj/state-registration-individual-entrepreneur`,
Business Formation) and re-disclosed when the GOV-3523 cycle opened Ukraine's
Visa vertical (via `ua/mfa/visa-application-form`).

## Why this candidate

Both prior Ukraine cycles scouted the jurisdiction's other verticals and
found this specific source — the State Tax Service's own annual personal
income tax declaration, directly downloadable and unauthenticated — STRONG
and ready to scope, alongside a Passport candidate (a consular-mirrored PDF)
that remains open backlog. This cycle re-scanned CATALOG.md's own "Genuinely
open, well-sourced candidates" section fresh, found this candidate still open
and unclaimed, and used it rather than scouting a new jurisdiction.

## Sources examined

### Primary source

- **Authority:** Державна податкова служба України (State Tax Service of
  Ukraine, DPS) — official site confirmed at `https://tax.gov.ua`.
- **Document — Форма податкової декларації про майновий стан і доходи**,
  approved by Order of the Ministry of Finance of Ukraine No. 859 of
  2 October 2015, as amended by Order No. 119 of 26 February 2025 (the
  edition modelled here, effective for reporting periods from
  1 January 2026).
  - **Cited URL (this issue):**
    `https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`
  - **Access note:** direct fetch returns HTTP 403 to this sandbox; fetched
    instead via the Wayback Machine mirror this issue itself cites
    (`https://web.archive.org/web/2024/https://tax.gov.ua/data/normativ/000/001/65107/Podatkova_deklarats_ya_pro_maynoviy_stan_dohodi_vvoditsya_v_d_yu_z_01_s_chnya_2026_roku_.xls`),
    HTTP 200.
  - **File identity:** 869,376 bytes,
    `sha256:7c67f4c421a1a8fc610f9226819d223debcb56b3fd1fc3d5f75ce0247cc7f0ac`.
    The first 8 bytes are `D0 CF 11 E0 A1 B1 1A E1` — the OLE2/Compound File
    Binary Format magic number, confirming a genuine legacy BIFF8 `.xls`, not
    an HTML error page and not an xlsx/zip container mislabelled with an
    `.xls` extension (independently re-confirmed this issue's own warning:
    no `PK\x03\x04` zip local-file-header signature appears anywhere in the
    first 4KB, so Python's `zipfile` module genuinely cannot open it).
  - **Extraction method:** parsed with the `xlsx` npm package
    (`npm install xlsx` in a scratch directory, not committed to this
    repository), which opened all 11 declared sheets via `XLSX.readFile`:
    `Деклар 2024` (the main declaration, modelled by this schema), `ЄСВ 1`,
    `ЄСВ 2`, `ЄСВ 3`, `КІК `, `Ф 1`, `Ф 2`, `Ф 3`, `Ф4`, `МПЗ`, and `АП` —
    matching this issue's own inventory exactly. The main sheet was read
    cell-by-cell with `XLSX.utils.decode_range`/`encode_cell` across its full
    172-row extent (not the row-array convenience helper alone, which
    silently merges adjacent non-empty cells and obscures which column each
    value belongs to), cross-referencing column A's own printed item/line
    numbers against each row's label text to resolve every field's exact
    source position and column (e.g. distinguishing Section II's "Сума
    доходів" column 3 from its four adjacent tax-withholding columns).

### Structure confirmed

The main declaration sheet's 172 rows resolve to eight numbered sections
(I-VIII) plus an unnumbered ten-schedule attachment checklist, filing date,
and attestation:

- **Section I — General information** (rows 11-42): declaration type (item
  1) and its "довідкова" flag (item 1.1, footnote 1); reporting period and
  the period being corrected (item 2, footnote 2); the corrected document's
  registration number (footnote 3); taxpayer identity and tax address (items
  3-4, footnote 4 for the optional phone/email); the filing tax authority
  (item 5); residency status and who filled the form (items 6-7); and five
  taxpayer-category checkboxes (item 8, footnote 5 for the last).
- **Authorized-filer block** (rows 44-49, item 9): name and tax number of an
  authorized filer, when applicable.
- **Section II — Taxable income** (rows 50-73): line 10 and its fifteen
  sub-lines (10.1-10.15, including 10.6.1 and 10.13.1), each with its own
  five-column breakdown (income amount; PIT/military-levy withheld by a tax
  agent; PIT/military-levy self-payable) — most sub-lines mark four of those
  five columns "x" (not applicable) in the source itself, footnotes 6-8
  attached to specific lines.
- **Section III — Non-taxable income** (rows 74-79): line 11 and sub-lines
  11.1-11.3.
- **Section IV — Total annual income** (rows 80-82): line 12.
- **Section V — PIT/military-levy tax obligations** (rows 83-102): lines
  13-22.1, including nine adjustment lines (13.1, 14-19) each computed from
  one of the schedules disclosed below.
- **Section VI — Error-correction computation** (rows 102-111): lines 23-27,
  each with four tax-obligation-type columns (minimum tax obligation, USC,
  PIT, military levy), relevant only to corrective filings.
- **Section VII — Bank details for a tax-discount refund** (rows 112-117).
- **Section VIII — Own real estate/movable property and rental-property
  table** (rows 119-128): a seven-column table with exactly three printed
  row slots (row codes 1-3), plus the category legend (footnote **) and
  rental-mark note (footnote ***).
- **Three freeform-addendum blocks** (rows 129-141): each a "count of
  attachments" plus a free-text table, tied to specific Tax Code provisions
  not otherwise represented on the main form — disclosed, not modelled (see
  below).
- **Ten-schedule attachment checklist** (rows 143-145): Ф1, Ф2, Ф3, Ф4, КІК,
  МПЗ, ЄСВ1, ЄСВ2, ЄСВ3, АП — footnotes 8 and 9 mark КІК/ЄСВ2/ЄСВ3 as
  attachment *counts*, not simple presence flags.
- **Filing date and attestation** (rows 146-153): the filing date, the
  accuracy attestation statement, and the signature block.
- **Officer-only block** (rows 162-169): the tax authority's own electronic-
  database entry mark and desk-review outcome — excluded as read-only/
  officer-facing, per this registry's established discipline.

## Scope and disclosed boundaries

This schema is deliberately scoped to **the main declaration sheet
(`Деклар 2024`), modelled in full, with its ten schedules disclosed only at
gating-checkbox/count level.** Explicitly out of scope, and disclosed rather
than silently omitted:

- **All ten schedules' internal line items** (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2,
  Ф3, Ф4, МПЗ, АП) — each is its own dedicated sheet in the source workbook.
  This schema models each schedule's own gating field
  (`appendixF1Attached` through `appendixApAttached`, with `appendixKikCount`/
  `appendixEsv2Count`/`appendixEsv3Count` as counts per footnotes 8-9) but not
  the schedule content behind them — the same combined-form scoping
  convention already established in this registry for Kazakhstan's Form
  220.00 (GOV-3477) and its own companion schedules (GOV-3484, GOV-3506),
  Lithuania's GPM311 (GOV-2969), and Romania's Formulary 212 (GOV-2797). Any
  one of the ten schedules is a reasonably scoped future companion-schema
  candidate.
- **Section V's own adjustment lines 13.1 and 14-19.** Each is a value
  computed *from* one of the ten schedules already disclosed at
  gating-checkbox/count level above (13.1 from АП; 14-15 from МПЗ; 16 from
  Ф3; 18 references a foreign-tax credit tied to schedules not modelled
  here) — modelling their derived totals without the schedules that produce
  them would misrepresent this v1.0's own completeness. This schema instead
  models only Section V's three lines a filer reports directly without an
  intervening schedule computation: line 13 (`totalPitObligation`) and the
  final budget-settlement lines 20.1-20.3/21.1/22.1.
- **Section II's own five-column breakdown per income line.** Most of the
  four tax-withholding/self-payable columns are marked "x" (not applicable)
  in the source itself for the majority of income sub-lines; this schema
  models each sub-line's own income-amount column (column 3) only. Line 13
  (`totalPitObligation`) is documented in its own field description as
  carrying line 10's own column-6 total, without a separate field for that
  column.
- **Section VI's other three tax-obligation-type columns** (minimum tax
  obligation, USC, military levy) on rows 23-27 — this schema models each
  row's PIT-column figure only, since PIT is the tax type common to every
  filer under this form; each field's own description names the unmodelled
  columns.
- **The three freeform-addendum blocks** (rows 129-141) — each ties to a
  specific, narrow Tax Code provision (§46.4, §164.2.17(д), and a bundle of
  §166.2.2/§170.13/§170.131/§172.2/§176.1) with no fixed field shape of its
  own beyond a free-text table and an attachment count; disclosed as open
  backlog rather than modelled as an unstructured table.
- **The officer-only block** (rows 162-169: the electronic-database entry
  mark and desk-review outcome) — populated by the tax authority on receipt,
  not by the filer.

## Conformance fixtures

11 fixtures are committed under
`conformance/ua/dps/individual-income-tax-declaration/1.0.0/`: 2 valid
submissions (0 errors each — one minimal resident filing with no schedules
or property, one fuller corrective filing with an authorized filer, four
schedules attached, an error-correction computation, bank details, and two
property-table entries, exercising most `requiredWhen`/`visibleWhen`
branches) and 9 mutation-control fixtures (each expected to raise exactly 1
class of error): a missing required `taxpayerFullName`, an invalid
`declarationType` enum value, an invalid `postalCode` pattern, an invalid
`bankAccountNumber` IBAN pattern (wrong country prefix), an out-of-range
`reportingPeriodMonth`, an invalid `property1Category` enum value, a missing
`correctedPeriodYear`/`correctedDocumentRegistrationNumber` when
`declarationType` is `corrective`, a missing `authorizedPersonFullName`/
`authorizedPersonTaxNumber` when `filledBy` is `authorized_person`, and a
`crossFieldValidation` violation (`totalAnnualIncome` below
`totalIncomeIncluded`). All 11 were checked with a from-scratch, throwaway
Node mock validator implementing this schema's own
`required`/`requiredWhen`/`visibleWhen`/`validation`/`crossFieldValidation`
rules (not committed, per this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 535/535 across
the full registry with this schema added.

## Known gaps

- All ten schedules (ЄСВ1, ЄСВ2, ЄСВ3, КІК, Ф1, Ф2, Ф3, Ф4, МПЗ, АП) are open
  backlog for future companion schemas — see "Scope and disclosed
  boundaries" above.
- Section V's adjustment lines 13.1 and 14-19, and Section VI's non-PIT
  columns, are open backlog alongside the schedules that produce them.
- The three freeform-addendum blocks (rows 129-141) are open backlog.
- Ukraine's remaining vertical backlog — **Passport** — remains disclosed
  and unauthored (a consular-mirrored PDF at
  `https://libya.mfa.gov.ua/storage/app/sites/121/imported_content/5e30694f7a7d6.pdf`;
  a Wayback copy was previously found truncated at 1MB and would need a
  fresh full fetch); not re-screened this cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(a parsed legacy `.xls` workbook, cell-by-cell) and transcribed its fields.
No automated re-verification tooling exists yet for this schema;
`nextReviewBy` is set 6 months out per the practice's default cadence.
