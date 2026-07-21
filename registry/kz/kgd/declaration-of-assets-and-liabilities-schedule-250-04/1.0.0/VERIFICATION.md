# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-04` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

This is a `GovSchema Standard Research` cycle (**GOV-4078**), deepening
Kazakhstan's Taxes vertical by authoring the fifth of the six disclosed
companion schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043).

## Why this candidate

The GOV-4050 cycle sized all six schedules by field count from the schedule
page images themselves: 250.01 and 250.05 tied as the smallest two (~13 leaf
columns, 2 sections each); 250.02 and 250.04 the largest (~17-18 columns, 3
sections each); 250.03 and 250.06 in between (~14 columns, 2 sections each).
With 250.01, 250.05, 250.02, and 250.03 already authored (GOV-4050, GOV-4057,
GOV-4064, GOV-4071), this cycle re-scanned CATALOG.md's own Known Gaps entry
for Form 250.00 fresh and picked 250.04 as the next natural candidate — the
last of the two "largest" schedules remaining unauthored, leaving only 250.06
open after this cycle.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00,
  250.00, 250.01, 250.02, 250.03, and 250.05.
  - **URL:** `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Form 250.04 itself** is embedded as a single scanned page image,
    `/files/1576/49/200.jpg` (fetched via `curl -k`, HTTP 200, 169,344
    bytes), read directly via a 3x Lanczos upscale — the image was fully
    legible at that resolution without needing further zoomed crops (unlike
    several prior 250.0X schedules).
  - **Boundary check:** the page's own barcode (`2625004010008`) encodes
    "25004" — form 250.04 — consistent with the sequential image numbering
    this registry has now confirmed across all six schedules: 195-196.jpg =
    Form 250.00 (per the GOV-4043 cycle's own structure list), 197.jpg =
    250.01, 198.jpg = 250.02, 199.jpg = 250.03, 200.jpg = 250.04 (this
    cycle), 201.jpg = 250.05 — leaving 202.jpg as 250.06's own slot for a
    future cycle.
  - **Access note:** also re-fetched the order's own full HTML document
    (`curl -k`, HTTP 200, 1,716,534 bytes) and read Глава 6 ("Составление
    формы 250.04", paragraphs 20-23) in full, cross-checking every column
    against its own prose description rather than relying on the image
    alone.

### Extraction method

Every field on Form 250.04 was transcribed directly from the page image and
Глава 6's own prose, in column order:

- **Item 07, Раздел В** ("Сведения о наличии ценных бумаг, производных
  финансовых инструментов (ПФИ), в том числе за пределами Республики
  Казахстан"): **four** blank entry rows (confirmed by direct visual count)
  above a worked example — columns A (row number), B (name of the security/
  derivative — worked example "Акции Apple"), C (quantity, printed as
  млн./тыс. digit-box groups — worked example "100"), D (country code of
  issuance, per the footnote's own two-letter classifier — worked example
  "CA"), E (currency code of acquisition, per the footnote's own three-letter
  classifier — worked example "USD"), and F (price of one unit at
  acquisition, printed as млрд/млн/тыс digit-box groups — worked example
  "100000"). Глава 6 paragraph 21 adds a scope note not visible on the image
  itself: if the same type of security is bought at different prices, each
  purchase is recorded on a separate row; if bought at different times but
  the same price, the holdings may be combined onto a single row.
- **Item 08, Раздел В** ("Сведения о наличии цифровых активов, в том числе за
  пределами Республики Казахстан"): **three** blank entry rows (confirmed by
  direct visual count — one fewer than item 07 on the same page) above a
  worked example — columns A (row number), B (name of the digital asset —
  worked example "Bitcoin"), C (quantity — worked example "0.00000001"), D
  (total price, always in tenge per Глава 6 paragraph 22 — worked example
  "48 640 000"), E (name of the exchange/platform — worked example "Ataix"),
  and F (crypto-wallet details — worked example "ABCDEFG1234567890").
- **Item 09, Раздел В** ("Сведения о деньгах на иностранных брокерских
  счетах"): **two** blank entry rows (confirmed by direct visual count — one
  fewer than item 08, two fewer than item 07, all on the same page) above a
  worked example — columns A (row number), B (brokerage account number —
  worked example "111122223333"), C (name of the financial institution/
  broker — worked example "FREEDOM FINANCE GLOBAL"), D (country code, same
  two-letter classifier — worked example "CA"), E (currency code, same
  three-letter classifier — worked example "USD"), and F (balance at year end,
  printed as млрд/млн/тыс digit-box groups — worked example "350000").

### A sharper row-count gradient than any prior 250.0X schedule

Item 07 prints four blank rows, item 08 prints three, and item 09 prints two —
all three sections on the same physical page, each confirmed by an
independent direct visual count rather than assumed from a prior schedule's
own row counts. Every previously-authored 250.0X schedule with more than one
section (250.02, 250.03) varied by at most one row between its sections;
250.04 is the first to show a three-way gradient (4/3/2) across a single
page, reinforcing that per-section row-count variation is a genuine,
recurring form-design characteristic of this schedule family rather than a
one-off quirk.

### A genuine, disclosed structural difference: item 08 has no country/currency columns

Unlike item 07 and item 09 — both of which carry the same two footnoted
classifiers already established across every 250.0X schedule (Классификатор
стран мира, two-letter country code; Классификатор валют, three-letter
currency code; both per Decision No. 378 of the Customs Union Commission, 20
September 2010) — item 08 (digital assets) has **no country-code or
currency-code column at all**. Глава 6 paragraph 22 confirms this is not an
omission: the digital-asset total-price column (D) is always denominated in
tenge (KZT) by the order's own prose, which is why no separate currency
classifier is printed for that section. Confirmed directly from the prose
rather than assumed from the image's absence of a column alone.

### Multi-box and free-text numeric fields

- The amount/price columns printed as млрд/млн/тыс or млн./тыс. place-value
  digit-box groups (item 07 columns C and F; item 09 column F) are modelled
  as single `number` fields with `minimum: 0`, per this registry's
  established convention (already applied across the KZ 220.0X and 250.0X
  schedule series).
- Item 08's own quantity (C) and total-price (D) columns are printed as
  plain text-entry fields on the page, not digit-box grids — unlike the
  equivalent columns in item 07 and item 09. Modelled as `number` fields with
  `minimum: 0` regardless, since both are numeric quantities; the quantity
  column's own worked example ("0.00000001", for Bitcoin) discloses that this
  column carries fractional quantities to at least eight decimal places, so
  it is deliberately left unconstrained rather than typed as an integer.

## Disclosed judgment calls

- **Row count differs by section on the same page**: four rows for item 07
  (securities/derivatives), three for item 08 (digital assets), two for item
  09 (foreign brokerage accounts) — confirmed by direct visual count of each
  section's own blank rows, not assumed uniform across the page or copied
  from a prior 250.0X schedule's own row counts.
- **Item 08 has no country-code or currency-code column**, confirmed a
  deliberate design choice (total price always in tenge) rather than a
  transcription gap, per Глава 6 paragraph 22's own prose.
- **Digital-asset quantity (item 08, column C) modelled as an unconstrained
  non-negative number, not an integer**, given the worked example's own
  eight-decimal-place precision.
- **Brokerage account number and institution identification (item 07 column
  B name; item 09 column B account number) modelled as free strings with no
  pattern.** Unlike the IIN fields, the page prints no footnote stating a
  format for these identifiers, and the worked examples are illustrative
  values of a type this registry has no independent format citation for.
- **`currentSheetNumber`** modelled identically to Schedules 250.01, 250.02,
  250.03, and 250.05 — the same recurring top-right header box, optional
  integer, no stated upper bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.04, Schedule 4 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The one remaining schedule** (Form 250.06 — receivables/payables and
  trust property), disclosed by the parent Form 250.00 schema's own
  VERIFICATION.md as a separate, open backlog candidate for a future cycle.
  (Forms 250.01, 250.02, 250.03, and 250.05 have already been authored.)
- **The parent declaration's own gating checkboxes**
  (`hasForeignSecurities`, `hasDigitalAssets`, `hasForeignBrokerageAccounts`)
  that determine whether this schedule is filed at all — already modelled on
  `kz/kgd/declaration-of-assets-and-liabilities` itself, not duplicated here.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-04/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field and one fuller filing populating all four rows of item
07, all three rows of item 08, and both rows of item 09) and 8 mutation
fixtures (each expected to fail validation with exactly 1 error): a missing
required `iin`, an invalid `iin` pattern, an invalid `representedPersonIin`
pattern, an invalid `currentSheetNumber` below its stated minimum, an invalid
`securitiesEntry1CountryCode` pattern, an invalid
`digitalAssetEntry1Quantity` below its stated minimum, an invalid
`brokerageAccountEntry1CurrencyCode` pattern, and one unknown-field
rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` were run against every fixture listed above and
pass. GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
