# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-01` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4050**), deepening
Kazakhstan's Taxes vertical by authoring the first of the six disclosed
companion schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043) that cycle's own
VERIFICATION.md flagged as open backlog but did not model.

## Why this candidate

The GOV-4043 cycle sized all six schedules (250.01-250.06) from the
explanatory text alone (chapter/page count) but did not open the images
themselves to size by field count. This cycle re-fetched all six schedule
page images fresh and read each one directly to compare field counts before
picking:

- **250.01** (foreign real estate + vehicles, 2 sections): ~13 leaf columns.
- **250.02** (foreign bank accounts ×2 + equity stakes, 3 sections): ~17
  leaf columns — largest of the six alongside 250.04.
- **250.03** (housing-construction participation + investment gold, 2
  sections): ~14 leaf columns.
- **250.04** (securities/derivatives + digital assets + brokerage accounts,
  3 sections): ~18 leaf columns — largest.
- **250.05** (intellectual property + other high-value property, 2
  sections): ~13 leaf columns — tied with 250.01.
- **250.06** (receivables/payables + trust property, 2 sections): ~14 leaf
  columns.

250.01 and 250.05 tied as the smallest two candidates. 250.01 was picked as
the natural first schedule in the numbered sequence (no other tiebreaker
favored one over the other — 250.01 has no monetary/amount columns at all,
while 250.05 has one, but neither this registry's own KZ 220.0X series nor
the GOV-4043 cycle established a size tiebreaker beyond leaf-column count).

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00 and
  250.00.
  - **URL (directly retrieved, HTTP 200):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk documented for this domain across every prior KZ cycle
    (`openssl verify` code 21) — a server misconfiguration, not a real
    access gate. `curl -k` loads the page at HTTP 200. Fetched fresh this
    cycle: 2,660,118 bytes, text/html — byte-identical to the GOV-4043
    cycle's own fetch.
  - **Form 250.01 itself** is embedded as a single scanned page image,
    `/files/1576/49/197.jpg`, fetched directly (`curl -k`, HTTP 200) and
    read visually to transcribe both of its sections (foreign real estate,
    row 01; foreign-registered vehicles, row 02) in full.
  - **Boundary check:** `198.jpg` was fetched and confirmed to be the start
    of Form 250.02 ("Раздел В. а) Сведения о деньгах физического лица на
    банковских счетах..."), confirming Form 250.01 is exactly one page
    (197), as the GOV-4043 cycle's own structure list stated (eight images
    195-202: two pages for the main form, one page each for the six
    schedules).
  - **Cross-check against explanatory text:** the order's own "Пояснение по
    составлению декларации об активах и обязательствах физического лица
    (форма 250.00)" (Appendix 10) has its own **Глава 3, "Составление формы
    250.01 (Приложение 1)"** (items 11-13), read in full this cycle and
    used to confirm every column's meaning field-by-field — see "Extraction
    method" below.

### Extraction method

Every field on Form 250.01 was transcribed directly from the page image in
column order, then cross-checked against Глава 3's own numbered items:

- **Item 12** (real estate section, triggered by main-declaration item 01):
  confirms columns A (row number), B (property type — a directly-enumerated
  prose list: land plot, building/house, garage, dacha, commercial
  building, part of a building, apartment, office, covered parking space,
  structure, aircraft, sea vessel, inland-waterway vessel, or river-sea
  vessel), C (two-letter country code per the Customs Union's own
  Classifier of World Countries, Decision No. 378), D (identification/
  cadastral number), and E (address — for land/buildings, the physical
  address; for aircraft/vessels, the home base or port of registration).
- **Item 13** (vehicle section, triggered by main-declaration item 02):
  confirms columns A (row number), B (vehicle type — passenger car,
  motorcycle, truck; explicitly **excludes** air/sea/river vessels, which
  are captured in the real-estate section instead), C (brand/model), D
  (country code, same classifier), E (state registration/plate number), and
  F (VIN/chassis number, or for rail rolling stock the manufacturer's
  serial number, or for other vehicles the engine number).

Both category lists (column B in each section) are modelled as free
strings, not invented enums: the printed specimen shows a blank text box
for column B in each section (confirmed via the worked example rows —
"ДОМ" and "Легковой автомобиль" respectively), not a dropdown/checkbox
widget, the same convention this registry already applies to KGD's own
currency/country-code fields when a classifier is cited in prose rather
than embedded as a selectable widget on the page itself.

### External classifiers cited, not embedded

- **Country code (both sections' column C/D):** the order's own explanatory
  text cites the same "Классификатор стран мира" (Decision No. 378 of the
  Customs Union Commission, 20 September 2010) already used by the parent
  Form 250.00 schema — a **two-letter** code (confirmed via the text's own
  worked examples: KZ, DE, GB), distinct from the **three-digit** country
  code the unrelated KZ 220.0X schedule series cites for the same
  classifier decision. Both conventions were confirmed directly from each
  series' own explanatory text this cycle, not assumed identical from one
  to the other.

## Disclosed judgment calls

- **`representedPersonIin` modelled without a separate boolean gate.** The
  parent Form 250.00 schema models a separate `isLegalRepresentative`
  boolean alongside `representedPersonIin` (`requiredWhen` that boolean is
  true), because its own item 3 prints a distinct checkbox next to the IIN
  box. This schedule's own item 2 prints only a single IIN box with no
  adjacent checkbox visible in the image — so `representedPersonIin` is
  modelled here as a plain optional field with no `requiredWhen` gate,
  rather than fabricating a checkbox the specimen does not show.
- **Row count (3 per section) read from the specimen, not stated as a
  fixed capacity in the explanatory text.** Глава 3's own prose does not
  state a maximum row count for either section; the reference image shows
  exactly three blank rows above each section's own worked example.
  Modelled via this registry's standard flat `entryN`-prefixed convention
  (`realEstateEntry1`-`3`, `vehicleEntry1`-`3`), the same convention already
  established for the KZ 220.0X schedule series' own small bounded-capacity
  tables (e.g. `kz/kgd/individual-income-tax-declaration-schedule-220-07`).
- **`currentSheetNumber`** (top-right "Укажите номер текущего листа" box,
  printed identically on every one of this form's own pages) is modelled
  the same way the KZ 220.0X schedule series already models the same
  recurring header box — optional, integer, no stated upper bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.01, Schedule 1 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The other five schedules** (Forms 250.02 through 250.06 — foreign bank
  accounts/equity stakes, housing-construction participation/investment
  gold, securities/digital assets/brokerage accounts, intellectual
  property/other high-value property, and receivables-payables/trust
  property, respectively), each disclosed by the parent Form 250.00
  schema's own VERIFICATION.md as separate, open backlog candidates for a
  future cycle.
- **The parent declaration's own gating checkboxes** (`hasForeignRealEstate`,
  `hasForeignVehicle`) that determine whether this schedule is filed at
  all — already modelled on `kz/kgd/declaration-of-assets-and-liabilities`
  itself, not duplicated here.

## Conformance fixtures

9 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-01/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field and one fuller filing populating all three rows of
both sections) and 7 mutation fixtures (each expected to fail validation
with exactly 1 error): a missing required `iin`, an invalid `iin` pattern,
two invalid country-code patterns (`realEstateEntry1CountryCode`,
`vehicleEntry1CountryCode`), an invalid `representedPersonIin` pattern, an
invalid `currentSheetNumber` below its stated minimum, and one unknown-field
rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` were run against every fixture listed above and
pass. GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
