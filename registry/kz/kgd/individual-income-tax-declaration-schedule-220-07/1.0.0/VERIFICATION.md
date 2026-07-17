# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-07` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3595**), deepening
Kazakhstan's Taxes vertical by authoring the seventh of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.07,
gratuitously received (transferred) property.

## Why this candidate: the adilet.zan.kz image outage has cleared

Three prior cycles (GOV-3574, GOV-3581, GOV-3588) each independently
re-confirmed `adilet.zan.kz`'s image-serving endpoint
(`adilet.zan.kz/files/1576/49/*.jpg`) down — the first two as an HTTP 200
"Ведутся технические работы" (technical maintenance) placeholder, the third
(GOV-3588) as a changed HTTP 404 failure signature affecting even an
unrelated document's own images. This cycle re-tested the same endpoint
fresh (`curl -k`, several dozen image numbers: 170, 182-200) and found it
**fully recovered**: every image returns a genuine HTTP 200 with a valid
`image/jpeg` body (85-173 KB), including images 182.jpg and 183.jpg, which
even the GOV-3568 cycle's own successfully-completed Form 220.06 schema
could not read due to a narrower, persistent 404 affecting only those two
files at the time. This resolves the outage and reopens the Form
220.07-220.10 backlog the GOV-3574/3581/3588 cycles had each left blocked.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** ("Об утверждении форм налоговой
  отчетности с пояснением по их составлению и Правил их представления") —
  the same order the parent Form 220.00 and Forms 220.01-220.06 schemas
  source.
  - **URL (independently re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390` (2,660,117-byte HTML).
  - **Image boundary — confirmed two independent ways:**
    1. The Order's own Rules text: a fresh full-text search located "Глава
       9. Пояснение по составлению формы 220.07 – Безвозмездно полученное
       (переданное) имущество..." (Items 37-39), immediately following Form
       220.06's own closing Глава 8 with no intervening content, and
       immediately preceded by "Глава 10. Пояснение по заполнению формы
       220.08 – Доходы, полученные в МФЦА".
    2. Direct visual read of the rendered page images (fetched fresh via
       `curl -k`, no scaling/rendering artifacts): image 188 is headed
       "форма 220.07 стр.01", image 189 "форма 220.07 стр.02", image 190
       "форма 220.07 стр.03", and image 191 is headed "форма 220.08
       стр.01" — confirming **Form 220.07 spans exactly three pages
       (images 188-190)** and Form 220.08 (a single page) begins
       immediately after.
  - **Pages read this cycle: images 188.jpg-190.jpg**, at native resolution
    plus zoomed crops (the `sharp` npm package, reused from a prior cycle's
    `/tmp/kz22004/node_modules`) for the footnote text and column F/E box
    widths.
  - **Row count (12 individual entry rows plus a distinct row-1
    grand-total row, 13 boxed rows total per page):** confirmed by a
    pixel-luminance horizontal-border scan (a small Node script reading
    raw pixel data via `sharp`) down column A's row-number box area on
    image 188, detecting 13 evenly-pitched (~23-24px) border-line clusters
    bounding 12 full row intervals below the fixed "00000001" first row —
    corroborated by a direct visual crop of the same column.
  - **The row-1 grand-total row and its printed caption:** row "00000001"
    is captioned, in column B's position on page 1, "ИТОГО (строка
    заполняется ТОЛЬКО по итогу формы)" ("TOTAL — row filled ONLY for the
    form's grand total") — an explicit instruction not present on any
    prior sibling schedule in this series. Despite this caption, the
    printed table still shows boxes for columns C, D (page 1) and E, F, G,
    H (page 2) on this same row-1 position. This schema treats those boxes
    as structurally present but semantically inapplicable to a grand-total
    row (no country/property/document identity attaches to a total) and
    models only the row's two money columns (H, I) as dedicated
    `totalAmountReceivedAmount` / `totalAmountTransferredAmount` fields,
    per this registry's established convention for this series' own
    "ИТОГО"-row total fields (e.g.
    `kz/kgd/individual-income-tax-declaration-schedule-220-04`'s
    `totalForeignCurrencyAmount` and siblings). The 12 individual entry
    rows (printed row-ordinals 2-13, modelled as `entry1` through
    `entry12`) are modelled with all nine columns.
  - **Column layout per page, confirmed by direct visual read:** page 1
    (188) shows columns A (row ordinal, boxed, not modelled as a field,
    per this registry's established convention), B, C, and D, plus the
    printed footnote "* При получении отчислений на безвозмездной основе
    графы D и Е не заполняются" (re-read at 2x-zoom crop to confirm the
    literal letters "D и Е", not "D и F"). Page 2 (189) shows columns A,
    E (1 box), F ("Код имущества", 2 boxes — visually confirmed at zoom),
    G (split into a "Номер" free-text sub-field and a "Цифрами дня,
    месяца, года" date sub-field), and H (a ТРИЛ/МЛРД/МЛН/ТЫС-grouped
    digit-box money field, the same convention as every sibling
    schedule's money columns). Page 3 (190) shows columns A and I only.

### Secondary source — the Order's own Rules text (Глава 9, Items 37-39)

- **Item 37** states the schedule's purpose: determining a non-commercial
  organization's income amount.
- **Item 38** describes the two-line taxpayer-information header: row 1 is
  the IIN (with the same trust-manager substitution rule already
  established for the parent form and every sibling schedule); row 2 is
  the tax period.
- **Item 39** describes the calculation table's nine columns field-by-field:
  1. Column A — row ordinal (not modelled, per established convention).
  2. Column B — BIN of the legal entity or IIN of the individual named in
     column D; filled only if that party has a Kazakhstani BIN/IIN under
     the Law "On National Registers of Identification Numbers".
  3. Column C — country-of-residence code, per Item 56 of the same Rules
     (the Customs Union's own "Классификатор стран мира" classifier, the
     same one this series' siblings already reference for their own
     country-code columns).
  4. Column D — the nonresident's own registration number in its country
     of residence.
  5. Column E — a four-value property-type code: "1" charitable
     assistance; "2" sponsorship assistance; "3" money/other property
     received or transferred gratuitously; "4" income under a government
     social-contract agreement, deposit interest, and condominium
     participants' contributions.
  6. Column F — property code per Item 58 of the same Rules (an external
     classifier); **the Rules text states this column is not filled when
     the receipt is a deduction/contribution received gratuitously
     (propertyTypeCode "4")**.
  7. Column G — the confirming document's number and date.
  8. Column H — amount (value) of property received free of charge.
  9. Column I — amount (value) of property transferred free of charge.

## Discrepancy disclosed, not resolved

The form's own printed footnote (page 1) states **columns D and E** are not
filled when `propertyTypeCode` is "4" (receiving deductions/contributions
on a gratuitous basis), while the Rules text's own Item 39(6) instead
states **column F** is not filled for that same case. Both were
independently re-read this cycle: the footnote via a zoomed crop of image
188 (confirming the literal text "графы D и Е", not "D и F"), and the Rules
text via the Order's own HTML (confirming "Данная графа не заполняется в
случае получения отчислений на безвозмездной основе" appears directly
after the column-F definition, not column D or E's). This schema
transcribes both statements verbatim into the affected fields'
(`entry{N}NonresidentRegistrationNumber`, `entry{N}PropertyTypeCode`,
`entry{N}PropertyCode`) own descriptions rather than picking one as
authoritative or inventing a `requiredWhen` rule that would silently favor
one source over the other — consistent with this registry's practice of
disclosing genuine primary-source ambiguities rather than resolving them
by assumption.

## Scope and disclosed boundaries

- Column B (counterparty BIN/IIN) is modelled as a 12-digit string per
  Item 39(2)'s own text (Kazakhstan's unified BIN/IIN identifiers are both
  12 digits under the same National Registers Law the Rules text itself
  cites), rather than an independently confirmed box count.
- Column C's 3-digit pattern and column F's 2-digit pattern were both
  visually confirmed directly on the rendered page images at zoom.
- Column D (nonresident registration number) has no confirmed box layout
  and no digit-count/format constraint is asserted, the same conservative
  choice this schedule series uses whenever the Rules text describes a
  field only as free-text with no format specified.
- Column G is modelled as two fields (`entry{N}DocumentNumber`,
  `entry{N}DocumentDate`), matching its own visually-confirmed two-sub-field
  layout.
- All money fields (`totalAmountReceivedAmount`,
  `totalAmountTransferredAmount`, `entry{N}AmountReceived`,
  `entry{N}AmountTransferred`) are modelled with `minimum: 0`, per this
  registry's established convention of treating every "Сумма"/"стоимость"
  column as non-negative.
- The remaining three schedules (220.08, 220.09, 220.10) remain disclosed,
  open backlog for future companion-schema cycles, now that the
  adilet.zan.kz image outage has cleared.

## Verification checks performed this cycle

- `node tools/validate.mjs` — 544/544 documents pass (was 543/543 before
  this schema; +1 for this document).
- `node tools/validate-ajv.mjs` — 544/544 documents validate against the
  v0.3 meta-schema.
- 13 conformance fixtures committed under `conformance/kz/kgd/`
  `individual-income-tax-declaration-schedule-220-07/1.0.0/` (2 valid + 11
  mutation-control), each re-derived against a from-scratch ajv-based mock
  validator built from this schema's own `fields` array (required list,
  patterns, enums, minimums, and `additionalProperties: false`) and
  confirmed to behave as expected (valid fixtures pass; every mutation
  fixture fails for its own targeted reason).
- `node tools/verify-sources.mjs` run against this document's own source
  citations.

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema.
