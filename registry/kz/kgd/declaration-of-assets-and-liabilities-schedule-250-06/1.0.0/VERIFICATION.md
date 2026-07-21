# Verification record — `kz/kgd/declaration-of-assets-and-liabilities-schedule-250-06` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

This is a `GovSchema Standard Research` cycle (**GOV-4085**), closing
Kazakhstan's Form 250.0X companion-schedule series by authoring the sixth and
last of the six disclosed schedules to Form 250.00
(`kz/kgd/declaration-of-assets-and-liabilities`, GOV-4043).

## Why this candidate

Schedules 250.01-250.05 were already authored across five prior cycles
(GOV-4050, GOV-4057, GOV-4064, GOV-4071, GOV-4078). Form 250.06 was left as
the only remaining schedule in the series each of those cycles' own
VERIFICATION.md disclosed as open backlog — not a choice among several
candidates, but the one item left.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Forms 220.00,
  250.00, and Schedules 250.01-250.05.
  - **URL:** `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the order's own full HTML document returned **HTTP 504
    Gateway Timeout on two separate attempts** this cycle, the same failure
    mode disclosed on the GOV-4057/GOV-4064/GOV-4071/GOV-4078 cycles. The
    static file/image server (`adilet.zan.kz/files/...`) remained fully
    responsive — the image fetch below succeeded on the first attempt — so
    this did not block authoring, but the order's own explanatory chapter
    for Form 250.06 could not be independently cross-checked this cycle.
    Disclosed honestly rather than fabricating a citation to unread text.
  - **Form 250.06 itself** is embedded as a single scanned page image,
    `/files/1576/49/202.jpg` (fetched via `curl -k`, HTTP 200, 142,690
    bytes — the same byte count the GOV-4057 cycle's own boundary check
    against Form 250.05 had already recorded when it fetched this same
    image to confirm the page-count structure, giving independent
    confirmation the source is unchanged), upscaled 4x with the `sharp`
    image library for legibility and read directly to transcribe both of
    its sections in full.
  - **Boundary check:** the GOV-4057 cycle had already confirmed `202.jpg`
    to be Form 250.06 (items 12-13); this cycle re-confirmed that directly
    by reading the page's own top-right label "форма 250.06" and header
    "Приложение 6 к Декларации" (Appendix 6 to the Declaration).

### Extraction method

Every field on Form 250.06 was transcribed directly from the page image,
which prints its own classifier citations inline as numbered footnotes for
item 12 (no separate explanatory-chapter cross-check was required to confirm
column meanings for that item; item 13 prints no footnotes, only plain
column headers):

- **Item 12** ("Раздел В. Сведения о наличии дебиторской/кредиторской
  задолженности, в том числе за пределами Республики Казахстан" — receivables/
  payables debt, including outside Kazakhstan; gated by the parent form's own
  `hasReceivablesOrPayables` checkbox, item 12 on Form 250.00): columns A (row
  number), B (Вид задолженности — debt type, per the footnote "Кт" for
  creditor debt or "Дт" for debtor debt), C (Идентификационный номер
  дебитора/кредитора — counterparty ID number, worked example
  "001122350468"), D (ФИО/наименование дебитора/кредитора — counterparty
  full name/entity name, worked example "Иванов И.И."), E (Код страны
  регистрации Дт/Кт — two-letter country code per its own footnote, worked
  example "CA"), F (Код валюты — three-letter currency code per its own
  footnote, worked example "USD"), G (Сумма задолженности по состоянию на 31
  декабря — debt amount as of 31 December, printed as млрд/млн/тыс digit-box
  groups, worked example "20000"), and H (Основание для задолженности —
  basis for the debt: notarization/court decision/reconciliation act, worked
  example "Решение СМАС г. Астаны, дело № 1684-24-00-4/652 от 12.04.2024
  г."). A prose note printed directly above the table states that debt to
  banks and organizations carrying out certain banking operations is **not**
  reflected in this section, except debt to such banks/organizations located
  outside the Republic of Kazakhstan — disclosed on the section-relevant
  field descriptions as a scope note rather than modelled as a validation
  rule, since the schema has no way to verify a counterparty's own
  regulatory status.
- **Item 13** ("Раздел В. Сведения об имуществе, переданному в
  доверительное управление" — property transferred to trust management;
  gated by the parent form's own `hasTrustProperty` checkbox, item 13 on
  Form 250.00): columns A (row number), B (Наименование имущества (объекта)
  — property name, worked example "Квартира"), C (Идентификационный
  (кадастровый) номер имущества — identification/cadastral number, worked
  example "11:22:334444:555"), D (Идентификационный номер ИИН/БИН
  доверительного управляющего — trust manager's IIN/BIN, worked example
  "001100011100"), E (Дата начала доверительного управления — trust
  management start date, printed as ДДММГГГГ digit boxes), and F (Дата
  окончания доверительного управления — trust management end date, same
  digit-box format).

### Row counts

Both sections print exactly **4 blank rows** above their own worked example
row — re-counted this cycle via a dedicated crop of each section
individually rather than trusting a single visual pass. This differs from
the GOV-4078 cycle's own finding on Form 250.04 (a genuine 3-way row-count
gradient of 4/3/2 across its three sections): Form 250.06's two sections are
uniform at 4 rows each. Recorded here for completeness, but this is not a
novel ambiguity or finding in its own right — just a factual observation
that this schedule does not exhibit the gradient its sibling did.

### Debt-type indicator modelled as a two-value enum

Column B of item 12 is printed on the page as free text but its own footnote
states exactly two permitted letter values ("Кт" or "Дт"), each with a
specific stated meaning (a debt the declarant owes vs. a debt owed to the
declarant). This is modelled as a two-value enum (`payable`/`receivable`)
following the same english-semantic-enum convention already established on
the parent Form 250.00 schema's own `residencyStatus` (`resident`/
`non_resident`) and `declarationType` fields, rather than as a free-text
string or the literal Cyrillic abbreviations.

### Multi-box amount field modelled as a single number field

The debt-amount column (G) in item 12 is printed on the page as multiple
boxed-digit place-value groups (млрд/млн/тыс) rather than a single blank
box, consistent with the convention already established across the KZ
220.0X and 250.0X schedule series: this represents one numeric amount, not
several separate values (`debtEntryNAmount`, a single `number` field with
`minimum: 0`).

## Disclosed judgment calls

- **Counterparty identification number (column C, item 12) modelled as free
  text with no pattern**, unlike the schedule's own `iin`/
  `representedPersonIin` fields. The section explicitly covers debt
  "включая за пределами Республики Казахстан" (including outside the
  Republic of Kazakhstan), so a foreign counterparty's identification number
  will not generally fit Kazakhstan's 12-digit IIN/BIN format even though
  the printed worked example happens to show one. Constraining the pattern
  would reject a large share of genuinely valid foreign-counterparty
  filings.
- **Trust manager's identification number (column D, item 13) modelled with
  the 12-digit `^[0-9]{12}$` pattern**, the opposite judgment call from the
  one above, because the printed field label itself states "ИИН/БИН" — both
  of which share Kazakhstan's 12-digit numeric format — with no indication
  this section extends to foreign trust managers the way item 12 explicitly
  does for foreign counterparties. The page prints a single identification
  box with no separate indicator of which of the two identifier types (IIN
  vs. BIN) applies in a given row.
- **Row count (4 per section) read from the specimen**, the same convention
  as every other schedule in this series — the page shows exactly four
  blank rows above each section's own worked example, and neither section's
  footnote/header states a maximum row count in prose.
- **`trustEntryNStartDate`/`trustEntryNEndDate` modelled as this registry's
  standard `date` type**, abstracting the printed ДДММГГГГ digit-box layout
  into the schema's own ISO 8601 date convention, consistent with every
  other date field already modelled across the parent Form 250.00 schema and
  its companion schedules.
- **`currentSheetNumber`** modelled identically to every other schedule in
  this series — the same recurring top-right header box, optional integer,
  no stated upper bound.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.06, Schedule 6 to Form
250.00, only.** Explicitly out of scope, and disclosed rather than silently
omitted:

- **The other five schedules** (Forms 250.01-250.05 — dividends/gifts/
  inheritance and foreign real estate/vehicles, foreign bank accounts/equity
  stakes, housing-construction participation/investment gold, securities/
  digital assets/brokerage accounts, and intellectual property/other
  high-value property, respectively), each already authored in prior cycles.
  This closes the entire six-schedule series.
- **The parent declaration's own gating checkboxes**
  (`hasReceivablesOrPayables`, `hasTrustProperty`) that determine whether
  this schedule is filed at all — already modelled on
  `kz/kgd/declaration-of-assets-and-liabilities` itself, not duplicated
  here.
- **The order's own explanatory chapter for Form 250.06** — not
  cross-checked this cycle due to the persistent HTTP 504 documented above.
  Every column meaning and both classifier citations needed to author this
  schema were available directly on the page image itself, so the schema's
  own field definitions are not less reliable as a result — only the
  secondary cross-check is missing, and that absence is disclosed here
  rather than papered over with a citation to unread text.

## Conformance fixtures

12 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities-schedule-250-06/1.0.0/`:
2 valid submissions (0 errors each — one minimal filing with only the
required `iin` field, and one fuller filing populating all four rows of both
sections, including a foreign counterparty identifier in row 3 of item 12 to
exercise the disclosed free-text judgment call above) and 10 mutation
fixtures (each expected to fail validation with exactly 1 error): a missing
required `iin`, an invalid `iin` pattern, an invalid `representedPersonIin`
pattern, an invalid `currentSheetNumber` below its stated minimum, an
invalid `debtEntry1Type` enum value, an invalid `debtEntry1CountryCode`
pattern, an invalid `debtEntry1CurrencyCode` pattern, a negative
`debtEntry1Amount`, an invalid `trustEntry1ManagerId` pattern, and one
unknown-field rejection.

## Independence and reproducibility

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` were run against the schema document itself and
pass; every fixture listed above was additionally validated against a
derived JSON Schema built from this document's own `fields` array (ajv
2020-12, matching the expected valid/invalid outcome for each fixture).
GovSchema is an independent, non-profit standards body; it is not
affiliated with, endorsed by, or operated by the Government of the Republic
of Kazakhstan or the State Revenue Committee.
