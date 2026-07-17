# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-08` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3602**), deepening
Kazakhstan's Taxes vertical by authoring the eighth of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.08, income
received in the Astana International Financial Centre (МФЦА/AIFC).

## Why this candidate: re-confirming the cleared adilet.zan.kz outage

The immediately preceding cycle (GOV-3595) had re-tested `adilet.zan.kz`'s
image-serving endpoint (`adilet.zan.kz/files/1576/49/*.jpg`) after three
straight prior cycles (GOV-3574, GOV-3581, GOV-3588) found it down, and
confirmed it fully recovered, leaving Forms 220.08-220.10 as open backlog.
This cycle independently re-tested the same endpoint fresh (`curl -k`,
images 188-193) and confirmed it remains up: every image returns a genuine
HTTP 200 with a valid `image/jpeg` body (85-141 KB).

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** ("Об утверждении форм налоговой
  отчетности с пояснением по их составлению и Правил их представления") —
  the same order the parent Form 220.00 and Forms 220.01-220.07 schemas
  source.
  - **URL (independently re-fetched this cycle, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390` (2,660,117-byte HTML).
  - **Image boundary — confirmed two independent ways:**
    1. The Order's own Rules text: a fresh full-text search located "Глава
       10. Пояснение по заполнению формы 220.08 – Доходы, полученные в
       МФЦА" (Items 40-46), immediately following Глава 9's own Form
       220.07 content (Items 37-39, modelled by the immediately preceding
       GOV-3595 cycle) with no intervening content.
    2. Direct visual read of the rendered page images (fetched fresh via
       `curl -k`, no scaling/rendering artifacts): image 191 is headed
       "форма 220.08 стр.01" and image 192 is headed "форма 220.09
       стр.01" — confirming **Form 220.08 is exactly one printed page**
       (image 191).
  - **Page read this cycle: image 191**, at native resolution. No
    continuation-sheet numbering box ("Укажите номер текущего листа") is
    printed on this form, in contrast to image 192 (Form 220.09), which
    does carry one — visually confirmed by direct comparison of both
    images.

### Secondary source — the Order's own Rules text (Глава 10, Items 40-46)

- **Item 40** states the form's purpose: reporting income exempt from
  individual income tax under paragraphs 3, 4, and 7, Article 6 of the
  Constitutional Law "On the International Financial Centre 'Astana'" of 7
  December 2015.
- **Item 41** describes the two-line taxpayer-information header: row 1 is
  the IIN (with the same trust-manager substitution rule already
  established for the parent form and every sibling schedule); row 2 is
  the tax period.
- **Item 42** describes the financial-services income section (paragraph 3,
  Article 6): lines 220.08.001-220.08.005 (Islamic-bank banking services;
  reinsurance/insurance brokerage services; investment-fund asset
  management/custody/issuance services; brokerage/dealer/underwriting
  services; other financial services per a joint AIFC/planning-body/tax-body
  act), and line 220.08.006, their sum.
- **Item 43** describes the ancillary-services income section (paragraph 4,
  Article 6): lines 220.08.007-220.08.010 (legal; audit; accounting;
  consulting services), and line 220.08.011, their sum.
- **Item 44** describes line 220.08.012: income exempt under paragraph 7,
  Article 6.
- **Item 45** describes line 220.08.013: Centre Bodies' (Органы Центра) and
  their organizations' own income, exempt under paragraph 2, Article 6.
- **Item 46** describes line 220.08.014: the grand total, defined as
  220.08.006 + 220.08.011 + 220.08.012 + 220.08.013.

## Discrepancy disclosed, not resolved

Item 42(6)'s own text describes line 220.08.006 (the financial-services
subtotal) as "Определяется как сумма показателей строк с 220.12.001 по
220.12.005" — citing line range **220.12.001-220.12.005**, not
220.08.001-220.08.005. No Form 220.12 exists anywhere in this Order (the
companion-schedule series runs only 220.01-220.10); every other
cross-reference within this same Глава 10 consistently uses "220.08.0XX"
line numbers, and the five lines actually printed immediately above line
006 on the form itself are 220.08.001-220.08.005. This is treated as a
primary-source typographical error (most plausibly copied from an unrelated
internal drafting template) rather than a real reference to a nonexistent
form — the same disclose-don't-resolve treatment the immediately preceding
GOV-3595 cycle applied to its own footnote-vs-Rules-text conflict on Form
220.07. The `totalFinancialServicesIncomeAmount` field's own description
transcribes the Rules text's literal "220.12.001-220.12.005" wording
verbatim alongside a note of the discrepancy, rather than silently
correcting it.

## Scope and disclosed boundaries

- This is a flat, non-repeating, single-page form — no bounded or unbounded
  repeating-row structure, unlike most of this series' other companion
  schedules. All fourteen line items (220.08.001-220.08.014) are modelled
  as independent optional money fields; only the two header fields (`iin`,
  `taxPeriodYear`) are required, matching this series' established
  convention that a schedule's own body lines are populated only when the
  taxpayer has the underlying activity.
- All money fields are modelled as `type: "number"` with `minimum: 0` and no
  fixed digit-count pattern, per this registry's established convention for
  this series' own ТРВЕ/МЛРД/МЛН/ТЫС-grouped digit-box money columns (the
  same treatment as every sibling schedule's unconstrained money fields,
  including the immediately preceding Form 220.07 schema's own total
  fields).
- No `requiredWhen` rules are asserted; the Rules text does not describe any
  conditional requiredness among this form's fourteen line items.
- The remaining two schedules (220.09, 220.10) remain disclosed, open
  backlog for future companion-schema cycles.

## Verification checks performed this cycle

- `node tools/validate.mjs` — 545/545 documents pass (was 544/544 before
  this schema; +1 for this document).
- `node tools/validate-ajv.mjs` — 545/545 documents validate against the
  v0.3 meta-schema.
- Conformance fixtures committed under `conformance/kz/kgd/`
  `individual-income-tax-declaration-schedule-220-08/1.0.0/` (valid +
  mutation-control), re-derived against a from-scratch ajv-based mock
  validator built from this schema's own `fields` array (required list,
  patterns, minimums, and `additionalProperties: false`) and confirmed to
  behave as expected (valid fixtures pass; every mutation fixture fails for
  its own targeted reason).
- `node tools/verify-sources.mjs` run against this document's own source
  citations.

No submission was made and no live `kgd.gov.kz`/`cabinet.salyk.kz` account
was created or required to author this schema.
