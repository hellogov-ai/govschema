# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-02` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4064**), deepening
Kazakhstan's Taxes vertical by authoring the third of the six disclosed
companion schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043).

## Why this candidate

The GOV-4050 cycle sized all six schedules by field count from the schedule
page images themselves: 250.01 and 250.05 tied as the smallest two (~13 leaf
columns, 2 sections each); 250.02 and 250.04 the largest (~17-18 columns, 3
sections each); 250.03 and 250.06 in between (~14 columns, 2 sections each).
With 250.01 and 250.05 already authored (GOV-4050, GOV-4057), this cycle
re-scanned CATALOG.md's own Known Gaps entry for Form 250.00 fresh and picked
250.02 as the next natural candidate in the numbered sequence — the last of
the two "largest" schedules remaining unauthored (alongside 250.04).

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00,
  250.00, 250.01, and 250.05.
  - **URL:** `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Form 250.02 itself** is embedded as a single scanned page image,
    `/files/1576/49/198.jpg` (fetched via `curl -k`, HTTP 200, 157,837
    bytes), read directly at full resolution and via two 3x-zoom crops (one
    of Раздел В.а)/В.б), one of item 04) to transcribe every column and row
    count precisely.
  - **Boundary check:** the page's own barcode (`2625002010000`) encodes
    "25002" — form 250.02 — consistent with the GOV-4043 cycle's own
    structure list, which independently identified `198.jpg` as Schedule
    250.02 (foreign bank accounts over/under threshold and foreign equity
    stakes, items 03a/03b/04) when it first catalogued all eight page images
    of Appendix 10.
  - **Access note:** the persistent HTTP 504 the GOV-4057 cycle hit against
    the order's own full HTML document did not recur this cycle — the page
    loaded normally via `curl -k` (the usual TLS-certificate-chain quirk
    documented on every KZ cycle, not a real access gate) — but this cycle
    did not need to re-read the explanatory chapter regardless, since every
    field on this page prints its own inline footnote citations (see
    "Extraction method" below), the same self-contained pattern the GOV-4057
    cycle found on Form 250.05's own page.

### Extraction method

Every field on Form 250.02 was transcribed directly from the page image and
two zoomed crops, in column order:

- **Item 03, Раздел В.а)** ("Сведения о деньгах физического лица на
  банковских счетах и (или) иных финансовых организациях, находящихся за
  пределами Республики Казахстан, в сумме, совокупно превышающих по всем
  банковским вкладам 1000-кратный размер месячного расчетного показателя"):
  three blank entry rows (confirmed by direct visual count in the zoomed
  crop) above a worked example — columns A (row number), B (institution
  identification number — worked example "111122223333"), C (institution
  name — worked example "ROYAL BANK CANADA"), D (country code, per the
  footnote's own two-letter classifier — worked example "CA"), E (currency
  code, per the footnote's own three-letter classifier — worked example
  "USD"), and F (amount, printed as млрд/млн/тыс digit-box groups — worked
  example "10 000").
- **Item 03, Раздел В.б)** ("Сведения о деньгах физического лица,
  принимающего антикоррупционное ограничение по открытию и владению счетами
  (вкладами) ... вне зависимости от суммы банковского вклада"): the
  identical five columns and three blank entry rows as Раздел В.а) —
  confirmed by direct visual count — worked example ("444455556666", "ROYAL
  BANK CANADA", "CA", "USD", "20 000"). This section reports the same class
  of foreign account regardless of amount, for declarants subject to
  Kazakhstan's anti-corruption restriction on foreign accounts (Law of the
  Republic of Kazakhstan "On Combating Corruption").
- **Item 04** ("Сведения о доле участия в уставном капитале юридического
  лица (за исключением акционерных обществ), созданного за пределами
  Республики Казахстан"): **two** blank entry rows (confirmed by direct
  visual count in the zoomed crop — one fewer row than the two bank-account
  sections on the same page) above a worked example — columns A (row
  number), B (legal-entity identification number — worked example
  "111122223333"), C (legal-entity name — worked example "«Bank of
  Monreal», CANADA"), D (country code, same two-letter classifier — worked
  example "CA"), and E (share of participation, printed as a two-group
  comma-separated digit-box layout — worked example "35,000%").

### A genuine, disclosed form-design quirk (not silently resolved)

Item 04's own column C header prints **"Наименование банковского
учреждения"** (bank institution name) verbatim — byte-for-byte the same
label used for the bank-name column in both Раздел В.а) and Раздел В.б)
directly above it — even though item 04's own section heading concerns
equity stakes in a foreign **legal entity** generally ("за исключением
акционерных обществ", i.e. any non-joint-stock-company legal entity, not
specifically a bank), and column B in the same section is correctly labelled
"Идентификационный номер **юридического лица**" (legal entity, not
institution). The worked example itself happens to name a bank («Bank of
Monreal»), which is consistent with either reading and does not resolve
whether the column C label is an unintentional copy-paste artifact from the
two sections above it or a deliberate (if oddly narrow, and inconsistent with
its own column B and section heading) restriction to banking-sector
entities. This registry has no access to the order's own underlying intent
beyond the rendered page image, so this is disclosed as an open ambiguity —
modelled as `equityStakeEntryNLegalEntityName`, matching the parent Form
250.00 schema's own generally-worded `hasForeignEquityStake` gating field,
rather than silently renamed to either "bank" or "legal entity" without
disclosure.

### Multi-box fields modelled as single number fields

- The amount column (F) in both bank-account sections is printed as
  млрд/млн/тыс place-value digit-box groups, modelled as a single `number`
  field with `minimum: 0`, per this registry's established convention
  (already applied across the KZ 220.0X and 250.0X schedule series).
- The share-percentage column (E) in the equity-stake section is printed as
  a two-group comma-separated digit-box layout; the worked example
  ("35,000%") confirms up to three decimal places. Modelled as a single
  `number` field with `minimum: 0, maximum: 100`.

## Disclosed judgment calls

- **Row count differs by section on the same page**: three rows for both
  bank-account sections (Раздел В.а/В.б), two rows for the equity-stake
  section (item 04) — confirmed by direct visual count of each section's own
  blank rows, not assumed uniform across the page.
- **Institution/legal-entity identification number (column B in every
  section) modelled as a free string with no pattern.** Unlike the IIN
  fields, the page does not print a footnote stating this identifier's
  format, and the worked examples ("111122223333") are illustrative account/
  registration numbers of a type this registry has no independent format
  citation for.
- **`currentSheetNumber`** modelled identically to Schedules 250.01 and
  250.05 — the same recurring top-right header box, optional integer, no
  stated upper bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.02, Schedule 2 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The other three schedules** (Forms 250.03, 250.04, and 250.06 —
  housing-construction participation/investment gold, securities/digital
  assets/brokerage accounts, and receivables-payables/trust property,
  respectively), each disclosed by the parent Form 250.00 schema's own
  VERIFICATION.md as separate, open backlog candidates for a future cycle.
- **The parent declaration's own gating checkboxes**
  (`hasForeignBankAccountsOverThreshold`, `hasForeignBankAccountsAntiCorruptionRestricted`,
  `hasForeignEquityStake`) that determine whether this schedule is filed at
  all — already modelled on `kz/kgd/declaration-of-assets-and-liabilities`
  itself, not duplicated here.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-02/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field and one fuller filing populating all three rows of both
bank-account sections and both rows of the equity-stake section) and 8
mutation fixtures (each expected to fail validation with exactly 1 error): a
missing required `iin`, an invalid `iin` pattern, an invalid
`representedPersonIin` pattern, an invalid `currentSheetNumber` below its
stated minimum, an invalid `bankAccountOverThresholdEntry1CountryCode`
pattern, an invalid `bankAccountAntiCorruptionEntry1CurrencyCode` pattern, an
`equityStakeEntry1SharePercentage` above its stated maximum, and one
unknown-field rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` were run against every fixture listed above and
pass. GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
