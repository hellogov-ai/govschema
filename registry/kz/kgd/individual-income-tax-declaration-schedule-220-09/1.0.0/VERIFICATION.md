# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-09` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-18`

This is a `GovSchema Standard Research` cycle (**GOV-3609**), deepening
Kazakhstan's Taxes vertical by authoring the ninth of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.09,
expenses of non-VAT-payer taxpayers for acquired goods, works, services.

## Why this candidate: continuing the Form 220.0X companion-schedule series

The immediately preceding cycle (GOV-3602) authored Form 220.08 (income
received in the Astana International Financial Centre) and left Forms
220.09-220.10 as disclosed, open backlog now that the `adilet.zan.kz`
image-serving outage (three straight cycles, GOV-3574/3581/3588) had cleared.
This cycle re-tested the same endpoint fresh (`curl -k`, images 192-202) and
confirmed it remains up: every tested image returns a genuine HTTP 200 with a
valid `image/jpeg` body (87-169 KB).

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** ("Об утверждении форм налоговой
  отчетности с пояснением по их составлению и Правил их представления") —
  the same order the parent Form 220.00 and Forms 220.01-220.08 schemas
  source.
  - **URL (independently re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390` (2,660,117-byte HTML).
  - **Image boundary — confirmed two independent ways:**
    1. The Order's own Rules text: a fresh full-text search located "Глава
       11. Пояснение по заполнению формы 220.09 – Расходы
       налогоплательщиков, не являющихся плательщиками налога на
       добавленную стоимость, по реализованным товарам, работам, услугам"
       (Items 47-49), immediately following Глава 10's own Form 220.08
       content (Items 40-46, modelled by the immediately preceding GOV-3602
       cycle) with no intervening content.
    2. Direct visual read of the rendered page images (fetched fresh via
       `curl -k`, no scaling/rendering artifacts): image 192 is headed
       "форма 220.09 стр.01", image 193 "форма 220.09 стр.02", and image
       194 is headed "форма 220.010 стр.01" ("Сведения по цифровым
       активам" — information on digital assets, an entirely different
       subject) — confirming **Form 220.09 spans exactly two printed
       pages** (images 192-193) and Form 220.10 begins immediately after.
  - **Pages read this cycle: images 192-193**, at native resolution. Both
    carry the same continuation-sheet numbering box ("Укажите номер
    текущего листа") in the header — present on this form, unlike the
    immediately preceding Form 220.08, which carries no such box (visually
    confirmed by direct comparison of images 191 and 192).

### Secondary source — the Order's own Rules text (Глава 11, Items 47-49)

- **Item 47** states the form's purpose: reporting acquired goods (works,
  services) by non-VAT-payer taxpayers, including expenses not allowable as
  deductions, and explicitly states this schedule's own figures are not
  carried forward into the main declaration or its other appendices.
- **Item 48** describes the two-line taxpayer-information header: row 1 is
  the IIN (with the same trust-manager substitution rule already
  established for the parent form and every sibling schedule); row 2 is the
  tax period.
- **Item 49** describes the expense table's seven columns (A through G)
  field-by-field:
  1. Column A — row ordinal (not modelled as a field, per this registry's
     established convention).
  2. Column B — the counterparty-taxpayer's BIN/IIN.
  3. Column C — the nonresident counterparty's country-of-residence code,
     per Item 56 of the same Rules.
  4. Column D — the nonresident counterparty's own tax-registration number
     in its country of residence; filled only when column C carries a
     country code.
  5. Column E — a seven-value expense-type code (financial, advertising,
     consulting, marketing, design, engineering, or other services).
  6. Column F — the value of the acquired goods (works, services).
  7. Column G — a four-value flag classifying which activity (generally-
     taxed, special-tax-regime, apportioned between both, or non-
     deductible) the expense relates to.

## Discrepancy disclosed, not resolved

Глава 11's own section heading reads "...по реализованным товарам, работам,
услугам" (goods/works/services **realized/sold**), while Item 47's own body
text and the form's own printed header (both independently re-read this
cycle) instead read "...по приобретенным товарам, работам, услугам"
(goods/works/services **acquired**) — a chapter-heading wording error in the
primary source, transcribed as printed in this document's own `description`
field rather than silently corrected. No discrepancy between the form's own
printed footnote and the Rules text was found for this schedule (unlike
Forms 220.07 and 220.08, each of which disclosed a genuine footnote-vs-Rules-
text or Rules-internal citation conflict).

## Scope and disclosed boundaries

- Row count (12 individual entry rows plus a distinct row-1 grand-total
  row, 13 boxed rows total per page): confirmed by a pixel-luminance
  horizontal-border scan (a small Node script reading raw pixel data via
  the `sharp` npm package, freshly installed for this cycle) down column
  A's row-number box area on image 192, corroborated by a direct visual
  crop of the same column at 4x zoom.
- The first row is captioned, in column B's position on page 1, "ИТОГО
  (строка заполняется ТОЛЬКО по итогу формы)" — the same instruction
  already established on Form 220.07's own row 1. Despite this caption, the
  printed table still shows boxes for columns C, D, E (page 1) and G (page
  2) on this same row-1 position; this schema treats those boxes as
  structurally present but semantically inapplicable to a grand-total row
  and models only the row's own money column (F) as a dedicated
  `totalExpenseAmount` field, per this registry's established convention
  (e.g. `kz/kgd/individual-income-tax-declaration-schedule-220-07`'s
  `totalAmountReceivedAmount` and siblings).
- Column B is modelled as a 12-digit BIN/IIN per Item 49(2)'s own text,
  consistent with this series' other schedules' own column-B/column-D
  BIN/IIN fields.
- Column C's 3 boxes were visually confirmed on image 192 (cropped and read
  at 4x zoom), matching the same country classifier pattern already
  established for this schedule series.
- Column D's 18 boxes (visually grouped 12+6) were visually confirmed on
  the same crop. Item 49(4) states this column is filled only when column C
  carries a country-residence code — a genuine conditional disclosed in the
  field's own description rather than encoded as a `requiredWhen` rule,
  consistent with this series' established convention of not asserting
  `requiredWhen` relationships among these companion schedules' columns
  (also mindful of this registry's own prior `notEquals`-on-an-optional-
  field pitfall).
- Column E's single box was visually confirmed, backing the seven-value
  string enum; corroborated by the form's own printed footnote on image 193
  ("1 - финансовые услуги; 2 - рекламные услуги; 3 - консультационные
  услуги; 4 - маркетинговые услуги; 5 - дизайнерские услуги; 6 -
  инжиниринговые услуги; 7 - прочие"), which matches Item 49(6) verbatim.
- Column F's 12 boxes (ТРИЛ/МЛРД/МЛН/ТЫС-grouped, 3 boxes per group) were
  visually confirmed on image 193 — the same money-column convention as
  every sibling schedule; modelled as `type: "number"` with `minimum: 0`
  and no fixed digit-count pattern.
- Column G's single box was visually confirmed on image 193, backing the
  four-value string enum per Item 49(7).
- The remaining schedule (220.10 — digital-asset holdings) remains
  disclosed, open backlog for a future companion-schema cycle.

## Verification checks performed this cycle

- `node tools/validate.mjs` — 546/546 documents pass (was 545/545 before
  this schema; +1 for this document).
- `node tools/validate-ajv.mjs` — 546/546 documents validate against the
  v0.3 meta-schema.
- `npm run build-index` (in `tools/govschema-client/`) — regenerated
  `registry-index.json` with 546 entries.
- Conformance fixtures committed under `conformance/kz/kgd/`
  `individual-income-tax-declaration-schedule-220-09/1.0.0/` (2 valid + 10
  mutation-control), re-derived against a from-scratch ajv-based mock
  validator built from this schema's own `fields` array (required list,
  patterns, enums, minimums, maxLength, and `additionalProperties: false`)
  and confirmed to behave as expected: all 12 fixtures passed or failed for
  their own targeted reason.
- `node tools/verify-sources.mjs registry/kz/kgd/individual-income-tax-declaration-schedule-220-09/1.0.0`
  — 4 URLs checked, 0 failures; 2 warnings, both a transient TLS
  leaf-signature verification failure on `adilet.zan.kz` already tolerated
  by this tool (the same site-wide certificate-chain quirk this series'
  prior cycles have each worked around with `curl -k`), not a real content
  or availability failure.

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema.
