# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-01` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3484**), deepening
Kazakhstan's Taxes vertical by authoring the first of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.01, the
worldwide-income/deductions/tax-computation schedule the GOV-3477 cycle's own
VERIFICATION.md flagged as the largest standalone candidate among the ten.

## Why this candidate

The GOV-3477 cycle authored the main Form 220.00 declaration but explicitly
scoped out all ten of its companion schedules (Forms 220.01-220.10),
disclosing each one's own page count and subject matter as open backlog. Form
220.01 was flagged there as "a substantial standalone worldwide-income/
deduction/tax-computation schedule" and a reasonably scoped future companion
schema on its own. This cycle re-scanned CATALOG.md's own "Genuinely open,
well-sourced candidates" section fresh, found this candidate still open and
unclaimed, and used it — deepening an already-open jurisdiction's disclosed
backlog item over scouting a fresh new jurisdiction, per this registry's
standing per-cycle procedure.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) that administers individual income
  tax filing — official site confirmed at `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 schema sources.
  - **URL (directly retrieved, HTTP 200):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain in the GOV-3459/GOV-3477 cycles
    (`openssl verify` code 21) — a server misconfiguration, not a real access
    gate. `curl -k` loads the page at HTTP 200. Re-confirmed this cycle with a
    fresh fetch: 2,659,981 bytes, byte-identical in size to the GOV-3477
    cycle's own fetch.
  - **File identity confirmed:** Form 220.01 is embedded as five scanned page
    images, `/files/1576/49/{171..175}.jpg`, each fetched directly (`curl -k`,
    HTTP 200) and read visually — at native resolution first, then at 2-3x
    zoom (via the `sharp` npm package, cropped per section) to resolve small
    print, most notably the header's item 3 ("Признак видов деятельности")
    box row and the deduction section's lettered sub-items.
  - **Boundary check:** image `176.jpg` was also fetched and confirmed to be
    Form 220.02 page 1 ("ВЫЧЕТЫ ПО ФИКСИРОВАННЫМ АКТИВАМ"), confirming Form
    220.01 is exactly five pages (171-175) — consistent with the GOV-3477
    cycle's own structure list. **This corrects that cycle's own schema
    description text**, which had estimated "Form 220.01 alone... spans 7
    pages of the reference specimen"; the true figure, confirmed by directly
    fetching the boundary image, is 5 pages. Not corrected in the parent
    document itself as part of this cycle (out of scope for this PR), but
    flagged here for a future minor edit.
  - **Extraction method:** every numbered line (220.01.001 through
    220.01.061) and every lettered/Roman-numeral sub-item across all five
    pages was transcribed directly from the page images, in printed order,
    cross-checked against each line's own printed arithmetic formula (e.g.
    "220.01.020 = сумма доходов с 220.01.001 по 220.01.019 - (+) 220.01.020 I
    - 220.01.021 II - 220.01.021 III") to confirm no sub-item was skipped or
    misattributed to the wrong parent line.

### Form convention confirmed

- **The four repeating column headers** printed above every amount grid on
  every page (трн / млрд / млн / тыс — trillion / billion / million /
  thousand place-value groups) are a single boxed-digit money-amount entry
  convention for handwriting one number in tenge, not four independent
  values. Confirmed against the parent Form 220.00 schema's own
  `totalCalculatedIitAmountTenge` field, which models the equivalent grid as
  one `number` field; every line in this schema follows the same convention.
- **Dropdown/select boxes** (a small "▾"-style icon next to an otherwise
  blank text field) appear at several lines — e.g. 220.01.007 I, 220.01.012
  III A, 220.01.015 V, 220.01.018 I, 220.01.020 I A/III A, 220.01.022 I,
  220.01.042 I A, 220.01.048 I A/II A, 220.01.053 A, 220.01.054 I A/III A,
  220.01.057 II A, 220.01.058 A — none of the corresponding option lists are
  printed on the form page itself. Each was modelled as a free-string `type`
  field paired with its own amount field, the same external-classifier
  convention the parent Form 220.00 schema already used for its own
  `currencyCode`/`residenceCountryCode` fields, rather than an invented enum.
- **Item 3 of this schedule's own header** ("Признак видов деятельности,
  укажите X): 1 2 3 4") was checked at 3x zoom for an adjacent legend
  explaining what categories 1-4 designate and confirmed to have none printed
  anywhere on the page. Modelled honestly as an `integer` field constrained
  to 1-4, with the ambiguity disclosed directly in the field's own
  `description` rather than a guessed enum — the same "don't fabricate a
  legend that isn't there" standard this registry applies to every external
  classifier.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.01 in full** — its own
taxpayer-identification header (items 1-4), the aggregate annual income
section (220.01.001-220.01.020), the deductions section
(220.01.021-220.01.042), the taxable-income/loss computation
(220.01.043-220.01.051), and the final tax-obligation computation
(220.01.052-220.01.061, the line the parent Form 220.00 schema's own
`totalCalculatedIitAmountTenge` field sums across every attached copy of this
schedule). Explicitly out of scope, and disclosed rather than silently
omitted:

- **The nine other companion schedules** (Forms 220.02 through 220.10, 19
  further pages combined in the reference specimen per the parent schema's
  own VERIFICATION.md) remain open, disclosed backlog for future companion
  schemas.
- **Every dropdown/select field's underlying option list** is cited as an
  external classifier not embedded in this schema (see "Form convention
  confirmed" above) — modelled as free strings.
- **Item 3's activity-type code legend** is disclosed as not printed on the
  form page itself (see above) rather than guessed.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-01/1.0.0/`:
2 valid submissions (0 errors each — one with only the four required header/
total fields populated, one fuller filing exercising realization income,
capital-gain-on-securities and digital-asset "other" dropdown+amount pairs,
cost-of-goods-sold deductions, and the full taxable-income-to-IIT
computation chain) and 8 mutation-control fixtures (each expected to raise
exactly 1 error): an invalid `iin` pattern (wrong digit count), a missing
required `taxPeriodYear`, an `activityTypeCode` above the valid 1-4 range, an
`activityTypeCode` below the valid 1-4 range, a `totalIitAmount` below the
valid 0 minimum, a `separateAccountingActivity` given a string instead of a
boolean, a `realizationIncome` given a string instead of a number, and an
unknown field not defined anywhere in this schema. All 10 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`validation` rules (not committed, per this registry's established
per-cycle practice). Both `tools/validate.mjs` and `tools/validate-ajv.mjs`
pass at 529/529 across the full registry with this schema added.

## Known gaps

- Forms 220.02 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.
- The parent Form 220.00 schema's own description text overstates Form
  220.01's page count as 7; the true figure, confirmed directly this cycle,
  is 5 (see "Sources examined" above) — worth a small correcting edit to that
  document in a future cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
