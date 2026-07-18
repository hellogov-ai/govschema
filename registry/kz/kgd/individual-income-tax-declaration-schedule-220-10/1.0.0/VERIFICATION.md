# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-10` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-18`

This is a `GovSchema Standard Research` cycle (**GOV-3616**), closing out
Kazakhstan's Form 220.0X companion-schedule series by authoring the tenth
and last disclosed companion schedule to the Individual Income Tax
Declaration (`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form
220.10, information on digital assets.

## Why this candidate: finishing the Form 220.0X companion-schedule series

The immediately preceding cycle (GOV-3609) authored Form 220.09 (expenses of
non-VAT-payer taxpayers) and left Form 220.10 as the sole remaining
disclosed schedule in this series. This cycle re-scanned CATALOG.md's Known
Gaps section fresh and re-confirmed the 4 named National ID candidates from
the standing routine all remain resolved, then re-tested the
`adilet.zan.kz` image-serving endpoint fresh (`curl -k`, images 192-205) and
confirmed it remains up: every tested image returns a genuine HTTP 200 with
a valid `image/jpeg` body.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** ("Об утверждении форм налоговой
  отчетности с пояснением по их составлению и Правил их представления") —
  the same order the parent Form 220.00 and Forms 220.01-220.09 schemas
  source.
  - **URL (independently re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390` (2,660,117-byte HTML).
  - **Image boundary — confirmed two independent ways:**
    1. The Order's own Rules text: a fresh full-text search located "Глава
       12. Пояснение по заполнению формы 220.10 – Сведения по цифровым
       активам" (Items 50-53), immediately following Глава 11's own Form
       220.09 content (Items 47-49, modelled by the immediately preceding
       GOV-3609 cycle) with no intervening content.
    2. Direct visual read of the rendered page images (fetched fresh via
       `curl -k`, no scaling/rendering artifacts): image 194 is headed
       "форма 220.010 стр.01" ("Сведения по цифровым активам") and image
       195 is headed "форма 250.00 стр.01" ("ДЕКЛАРАЦИЯ ОБ АКТИВАХ И
       ОБЯЗАТЕЛЬСТВАХ ФИЗИЧЕСКОГО ЛИЦА" — an entirely unrelated individual
       assets-and-liabilities declaration, not a companion schedule to Form
       220.00 at all) — confirming **Form 220.10 spans exactly one printed
       page** (image 194), and that no Form 220.11 exists: this is the last
       schedule in the series.
  - **Page read this cycle: image 194**, at native resolution.

### Secondary source — the Order's own Rules text (Глава 12, Items 50-53)

- **Item 50** states the form's purpose: reporting digital-asset holdings
  for the tax period.
- **Item 51** describes the two-line taxpayer-information header: row 1 is
  the IIN (with the same trust-manager substitution rule already
  established for the parent form and every sibling schedule); row 2 is the
  tax period.
- **Item 52** describes the "digital assets at the start of the tax period"
  table's four columns (A-D) — row ordinal, asset name, quantity, value —
  and then, under a **second, duplicate "52."** paragraph number, describes
  the "digital assets at the end of the tax period" table's four columns
  (E-H) in the same field order. See the disclosed source-numbering oddity
  below.
- **Item 53** (the next distinct paragraph number) describes the
  "Криптокошельки" (crypto wallets) table's three columns (I-K): row
  ordinal, wallet address, wallet/exchange name.

## Discrepancy disclosed, not resolved

The Order's own Rules text reuses paragraph number "52." for both the
start-of-period and end-of-period digital-asset column descriptions — two
consecutive "52." entries (covering columns A-D, then E-H) with no
intervening "53." — a genuine numbering duplication in the primary source,
transcribed as printed rather than silently renumbered. This is a different
kind of discrepancy from the chapter-heading wording error the immediately
preceding GOV-3609 cycle disclosed for Form 220.09 (a text/heading
mismatch, not a numbering duplication) and from the footnote-vs-Rules-text
column conflicts the GOV-3595/GOV-3602 cycles disclosed for Forms
220.07/220.08 — no footnote-vs-Rules conflict was found for this form.

## Scope and disclosed boundaries

- Row counts confirmed by a pixel-luminance horizontal-border scan (a small
  Node script reading raw pixel data via the `sharp` npm package,
  reinstalled to `/tmp/node_modules` for this cycle) locating each
  section's dark header bar, followed by a direct visual crop of columns A,
  E, and I at 8x zoom: the "на начало налогового периода" and "на конец
  налогового периода" sections each have 5 boxed rows (1 ИТОГО row + 4
  entry rows); the "Криптокошельки" section has 5 boxed rows (no ИТОГО
  row).
- Both digital-asset sections' first row is captioned, in the asset-name
  column's own position, "ИТОГО (строка заполняется ТОЛЬКО по итогу
  формы)" — the same instruction already established on this series' other
  companion schedules (e.g. Forms 220.07 and 220.09's own row-1 captions).
  Despite this caption, the printed table still shows boxes for the
  quantity and value columns (C/D on the start-of-period section, G/H on
  the end-of-period section) on this same row-1 position; this schema
  treats those boxes as structurally present but semantically inapplicable
  to a grand-total row's own name field, and models the quantity/value
  columns as dedicated total fields (`totalDigitalAssetsQuantityStart`/
  `End` and `totalDigitalAssetsValueStart`/`End`), per this registry's
  established convention (e.g.
  `kz/kgd/individual-income-tax-declaration-schedule-220-09`'s
  `totalExpenseAmount`).
- The four following boxed rows in each digital-asset section (printed
  row-ordinals 2-5) are modelled as `entry1` through `entry4`, each with a
  name field (column B or F, a free-text ruled line with no individually
  boxed characters, so no `maxLength` is asserted) and quantity/value
  number fields (columns C/D or G/H, each a grouped multi-box numeric field
  on the printed form — 15 boxes for quantity, 14 for value, visually
  confirmed at 4x zoom — modelled as plain `type: "number"` with
  `minimum: 0` and no fixed digit-count pattern, consistent with this
  series' established convention for money/quantity columns).
- The "Криптокошельки" section has no ИТОГО row: its own first row (also
  printed row-number "00000001" in column I) is a genuine data row, not a
  total, consistent with Item 53's own Rules text describing no total for
  this section. Five boxed rows total (row-ordinals 1-5), modelled as
  `entry1` through `entry5`, each with a wallet-address field (column J)
  and a wallet-name/exchange field (column K), both free-text.
- This closes Kazakhstan's Form 220.0X companion-schedule series in full —
  Form 220.00 (GOV-3477) plus all ten companion schedules 220.01 through
  220.10 are now modelled. No further undisclosed schedule was found in
  this cycle's fresh full-text search of the Order's own Rules text (Глава
  13 immediately following Глава 12 covers income/currency/country/property
  codes, not a further form).

## Verification checks performed this cycle

- `node tools/validate.mjs` — 547/547 documents pass (was 546/546 before
  this schema; +1 for this document).
- `node tools/validate-ajv.mjs` — 547/547 documents validate against the
  v0.3 meta-schema.
- `npm run build-index` (in `tools/govschema-client/`) — regenerated
  `registry-index.json` with 547 entries.
- Conformance fixtures committed under `conformance/kz/kgd/`
  `individual-income-tax-declaration-schedule-220-10/1.0.0/` (2 valid + 7
  mutation-control), checked against a from-scratch mock validator built
  from this schema's own `fields` array (required list, patterns, type
  checks, minimums, and unknown-field rejection) and confirmed to behave as
  expected: all 9 fixtures passed or failed for their own targeted reason.
- `node tools/verify-sources.mjs registry/kz/kgd/individual-income-tax-declaration-schedule-220-10/1.0.0`
  — scoped run (an explicit path arg, never invoked bare or with an
  unrecognized flag, per the GOV-3609 cycle's own lesson learned after
  accidentally triggering a full-registry scan): 4 URLs checked, 0
  failures, 2 warnings, both the same transient TLS leaf-signature
  verification failure on `adilet.zan.kz` already tolerated by this tool
  (the same site-wide certificate-chain quirk this series' prior cycles
  have each worked around with `curl -k`), not a real content or
  availability failure.

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema.
