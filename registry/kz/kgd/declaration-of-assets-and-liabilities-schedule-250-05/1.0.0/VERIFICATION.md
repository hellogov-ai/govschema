# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-05` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4057**), deepening
Kazakhstan's Taxes vertical by authoring the second of the six disclosed
companion schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043).

## Why this candidate

The GOV-4050 cycle (which authored Schedule 250.01) sized all six schedules
by field count from the schedule page images themselves: 250.01 and 250.05
tied as the smallest two (~13 leaf columns, 2 sections each); 250.02 and
250.04 the largest (~17-18 columns, 3 sections each); 250.03 and 250.06 in
between (~14 columns, 2 sections each). With 250.01 already authored, 250.05
is the natural next pick as the only other tied-smallest candidate.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00,
  250.00, and 250.01.
  - **URL:** `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note — a genuine, disclosed limitation this cycle:** the
    order's own full HTML document returned **HTTP 504 Gateway Timeout on
    five separate attempts** across this cycle, a distinct failure mode
    from the TLS-certificate-chain-missing-an-intermediate quirk documented
    on every prior KZ cycle (which is a certificate misconfiguration that
    `curl -k` works around; a 504 is a server-side timeout that no client
    flag works around). The static file/image server
    (`adilet.zan.kz/files/...`) remained fully responsive throughout — every
    image fetch below succeeded on the first attempt — so this did not
    block authoring the schema itself, but it does mean the order's own
    explanatory chapter for Form 250.05 could not be cross-checked this
    cycle. Disclosed honestly rather than fabricating a citation to text
    that was not actually read this cycle.
  - **Form 250.05 itself** is embedded as a single scanned page image,
    `/files/1576/49/201.jpg` (fetched via `curl -k`, HTTP 200, 130,083
    bytes), read directly to transcribe both of its sections in full.
  - **Boundary check:** `200.jpg` was fetched (HTTP 200, 169,344 bytes) and
    confirmed to be the second page of Form 250.04 (items 08 "Раздел В.
    Сведения о наличии цифровых активов" and 09 "Раздел В. Сведения о
    деньгах на иностранных брокерских счетах", ending in barcode
    `2625004010008`); `202.jpg` was fetched (HTTP 200, 142,690 bytes) and
    confirmed to be Form 250.06 (items 12 "Раздел В. Сведения о наличии
    дебиторской/кредиторской задолженности" and 13 "Раздел В. Сведения об
    имуществе, переданном в доверительное управление"). This confirms Form
    250.05 is exactly one page (201), matching the GOV-4050 cycle's own
    eight-image structure list (195-202: two pages for the main form, one
    page each for the six schedules).

### Extraction method

Every field on Form 250.05 was transcribed directly from the page image,
which — unlike Form 250.01's page — prints its own classifier citations
inline as numbered footnotes, so no separate explanatory-chapter cross-check
was required to confirm column meanings:

- **Item 10** (intellectual-property/copyright section, gated by the parent
  form's own `hasIntellectualProperty` checkbox): columns A (row number), B
  (object type — a free-text box; the worked example shows "Фонограмма"),
  C (patent/registration number, if any — worked example "A813237"), D
  (country code, per the footnote: "буквенный двузначный код страны,
  согласно «Классификатору стран мира», утвержденному решением Комиссии
  Таможенного союза от 20 сентября 2010 года № 378" — the same two-letter
  classifier already established for Form 250.00 and Schedule 250.01), and
  E (date of registration of right — printed as blank ДДММГГГГ boxes in the
  worked example, i.e. the specimen demonstrates the box layout without
  filling in an actual date).
- **Item 11** (other high-value property section, gated by the parent
  form's own `hasOtherHighValueProperty` checkbox, and itself printed as
  "Заполняется ПО ЖЕЛАНИЮ физического лица" — filled at the declarant's own
  discretion): columns A (row number), B (property name — worked example
  "Картина"), C (quantity, printed as млн/тыс digit-box groups — worked
  example shows "1"), D (country code, same two-letter classifier per its
  own footnote), E (currency code, per its own footnote: "буквенный
  трехзначный код валюты, согласно «Классификатору валют», утвержденному
  решением Комиссии Таможенного союза от 20 сентября 2010 года № 378" — a
  three-letter classifier, confirmed consistent with the parent Form
  250.00 schema's own `entry1CashCurrencyCode` field, pattern `^[A-Z]{3}$`),
  and F (appraised value, printed as млрд/млн/тыс digit-box groups — worked
  example shows "2 000 000" for the "KZ"/"KZT" example row).

### Multi-box amount fields modelled as single number fields

Both the quantity column (C) and appraised-value column (F) in item 11 are
printed on the page as multiple boxed-digit place-value groups (млн/тыс and
млрд/млн/тыс respectively) rather than a single blank box. This registry
already established, across the KZ 220.0X schedule series, that such
place-value digit-box groups represent one numeric amount, not several
separate values — the same convention is applied here
(`otherPropertyEntry1Quantity`, `otherPropertyEntry1AppraisedValue`, etc.,
each a single `number` field with `minimum: 0`).

### A form-wide labelling convention, not a 250.05-specific ambiguity

Both of this schedule's own section headers print the identical text
"Раздел В" (confirmed via a 3x-zoom crop comparison of both header bars).
This is not unique to 250.05: the same repeated "Раздел В" heading text
appears identically across multiple sections of Forms 250.04 and 250.06 as
well (confirmed by inspecting the boundary-check images `200.jpg` and
`202.jpg` above) — the schedule's own numbered item badge (10, 11, 12, 13,
...) is the actual section differentiator throughout this form family, not
the repeated heading text. Recorded here for completeness, but this is a
confirmed, consistent form-design convention rather than a genuine, unusual
ambiguity worth flagging as a finding in its own right (unlike, for
example, the byte-identical duplicate field label the Annex ЄСВ1 cycle,
GOV-4037, found and disclosed as a genuine unresolved ambiguity).

## Disclosed judgment calls

- **`representedPersonIin` modelled without a separate boolean gate**, for
  the same reason as Schedule 250.01: this schedule's own item 2 prints
  only a single IIN box with no adjacent checkbox visible in the image.
- **Row count (3 per section) read from the specimen**, the same convention
  as Schedule 250.01 and the KZ 220.0X schedule series' own small
  bounded-capacity tables — the page shows exactly three blank rows above
  each section's own worked example, and neither section's footnote states
  a maximum row count in prose.
- **`ipEntry*RegistrationDate` modelled as this registry's standard `date`
  type**, abstracting the printed ДДММГГГГ digit-box layout into the
  schema's own ISO 8601 date convention, consistent with every other date
  field already modelled across the parent Form 250.00 schema
  (`categoryReferenceDate`, `notificationDate`, `declarationSubmissionDate`).
- **`currentSheetNumber`** modelled identically to Schedule 250.01 — the
  same recurring top-right header box, optional integer, no stated upper
  bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.05, Schedule 5 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The other four schedules** (Forms 250.02, 250.03, 250.04, and 250.06 —
  foreign bank accounts/equity stakes, housing-construction
  participation/investment gold, securities/digital assets/brokerage
  accounts, and receivables-payables/trust property, respectively), each
  disclosed by the parent Form 250.00 schema's own VERIFICATION.md as
  separate, open backlog candidates for a future cycle.
- **The parent declaration's own gating checkboxes**
  (`hasIntellectualProperty`, `hasOtherHighValueProperty`) that determine
  whether this schedule is filed at all — already modelled on
  `kz/kgd/declaration-of-assets-and-liabilities` itself, not duplicated
  here.
- **The order's own explanatory chapter for Form 250.05** — not
  cross-checked this cycle due to the persistent HTTP 504 documented above.
  This is a genuine gap relative to the depth of the Schedule 250.01
  cycle's own sourcing, but every column meaning and both classifier
  citations needed to author this schema were available directly on the
  page image itself, so the schema's own field definitions are not less
  reliable as a result — only the secondary cross-check is missing, and
  that absence is disclosed here rather than papered over with a citation
  to unread text.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-05/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field and one fuller filing populating all three rows of
both sections) and 8 mutation fixtures (each expected to fail validation
with exactly 1 error): a missing required `iin`, an invalid `iin` pattern,
an invalid `representedPersonIin` pattern, an invalid `currentSheetNumber`
below its stated minimum, an invalid `ipEntry1CountryCode` pattern, an
invalid `otherPropertyEntry1CurrencyCode` pattern, a negative
`otherPropertyEntry1Quantity`, and one unknown-field rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` were run against every fixture listed above and
pass. GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
