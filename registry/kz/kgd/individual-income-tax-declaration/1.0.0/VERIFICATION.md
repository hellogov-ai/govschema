# Verification record — `kz/kgd/individual-income-tax-declaration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3477**), deepening
Kazakhstan's Taxes vertical by authoring the disclosed backup candidate the
prior **GOV-3459** cycle flagged when Kazakhstan opened as the registry's 72nd
jurisdiction (via its Business Formation schema,
`kz/moj/state-registration-limited-liability-partnership`).

## Why this candidate

The GOV-3459 cycle screened Kazakhstan's other verticals and found Visa
CAPTCHA-gated and DMV/Passport/National-ID/Taxes-*filing* login-and-EDS-gated
behind `egov.kz`/`cabinet.salyk.kz` — but disclosed one specific, ready-to-scope
exception: a blank Individual Income Tax Declaration (Form 220.00) published,
unauthenticated, via the same `adilet.zan.kz` route that sourced the LLC
registration schema. This cycle re-scanned CATALOG.md's own "Genuinely open,
well-sourced candidates" section fresh, found this candidate still open and
unclaimed, and used it rather than scouting a fresh new jurisdiction —
deepening an already-open jurisdiction's genuinely open backlog item over
opening a 73rd jurisdiction from scratch, per this registry's standing
per-cycle procedure.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) that administers individual income
  tax filing — official site confirmed at `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления").
  - **URL (directly retrieved, HTTP 200):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain in the GOV-3459 cycle
    (`openssl verify` code 21) — a server misconfiguration, not a real access
    gate. `curl -k` loads the page at HTTP 200. Re-confirmed this cycle with a
    fresh fetch.
  - **File identity:** full consolidated-legislation HTML page, 2,659,981
    bytes.
  - **Structure confirmed:** the order lists 29 numbered tax-reporting forms,
    each with its own numbered Appendix. Item 9 of that list —
    "форму декларации по индивидуальному подоходному налогу (форма 220.00) с
    пояснением по ее составлению согласно приложению 9" — is Form 220.00,
    modelled by this schema. Appendix 9 itself embeds the actual form
    templates as scanned page images (`/files/1576/49/{170..194}.jpg`), not as
    native HTML text or AcroForm widgets, followed by the appendix's own
    prose filing instructions ("Пояснение по составлению...").
  - **Extraction method:** each of the 25 page images (170.jpg through
    194.jpg) was fetched directly (`curl -k`) and read visually. Form 220.00
    itself is a single page (170.jpg); its ten schedules follow across the
    remaining 24 images, mapped by their own printed "форма 220.0N стр.NN"
    headers:
    - **220.01** (worldwide income, deductions, tax computation) — images
      171-175, 5 pages.
    - **220.02** (fixed-asset deductions) — images 176-177, 2 pages.
    - **220.03** (treaty-exempt income) — image 178, 1 page.
    - **220.04** (foreign-source income and tax credit) — images 179-180, 2
      pages.
    - **220.05** (loss accounting) — image 181, 1 page.
    - **220.06** (controlled-foreign-company taxation) — images 182-187, 6
      pages.
    - **220.07** (gratuitously received/transferred property) — images
      188-190, 3 pages.
    - **220.08** (AIFC income) — image 191, 1 page.
    - **220.09** (non-VAT-payer expenses) — images 192-193, 2 pages.
    - **220.10** (digital-asset holdings) — image 194, 1 page.

    Every field on Form 220.00 itself (items 1-11, the tax-obligation line
    220.00.001, and the responsibility/attestation block) was transcribed
    directly from the page image in item order.

### External classifiers cited, not embedded

- **Currency code (item 8):** the order's own explanatory rules (paragraph 72)
  point to Appendix 23 "Классификатор валют" (Currency Classifier) to Decision
  No. 378 of the Customs Union Commission (20 September 2010) — a separate
  legal act, not reproduced in this order. Modelled as a free string
  (`currencyCode`) rather than an invented enum.
- **Country-of-residence code (item 11A):** paragraph 73 of the same
  explanatory rules points to that same Decision's Appendix 22
  "Классификатор стран мира" (World Country Classifier). Modelled as a free
  string (`residenceCountryCode`) rather than an invented enum.
- **IIN (Individual Identification Number) format:** confirmed as a 12-digit
  personal identifier under Kazakhstan's State Population Register Law, the
  same convention already documented for this registry's
  `kz/moj/state-registration-limited-liability-partnership` schema.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.00, the main declaration,
only.** Explicitly out of scope, and disclosed rather than silently omitted:

- **All ten schedules' internal line items** (Forms 220.01 through 220.10,
  24 pages combined in the reference specimen). Form 220.00 gates each
  schedule with a single "submitted appendices" checkbox (item 9); this
  schema models each of those ten checkboxes as its own boolean field
  (`appendix22001Attached` through `appendix22010Attached`) but not the
  schedule content behind them — the same combined-form scoping convention
  already established in this registry for Lithuania's GPM311 (GOV-2969),
  Romania's Formulary 212 (GOV-2797), and Greece's Ε1/Ε2/Ε3 income tax
  return. Form 220.01 alone is a substantial standalone worldwide-income/
  deduction/tax-computation schedule and Form 220.06 (CFC taxation) is a
  further 6 pages — either would be a reasonably scoped future companion
  schema on its own.
- **The receiving tax authority's own fields**: the name of the official who
  accepted the declaration, the incoming document number, the declaration's
  date of receipt, and the postal-stamp date are populated by the tax
  authority upon receipt, not entered by the filer — disclosed, not modelled,
  consistent with this registry's convention of excluding office-only
  sections.
- **The seal placement** printed beside the taxpayer's signature is marked in
  the source itself as excluded for private-entrepreneurship subjects — the
  population this declaration (individual entrepreneurs, farm households,
  non-resident individuals) is drawn from — so it is not modelled.
- **Currency and country-of-residence codes** are cited to their governing
  external classifiers (see above) rather than embedded as closed enums.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration/1.0.0/`: 2 valid
submissions (0 errors each — one minimal resident filing with no schedules
attached, one fuller non-resident by-notification filing with four schedules
attached, exercising every `requiredWhen` branch) and 8 mutation-control
fixtures (each expected to raise exactly 1 error): a missing required
`taxpayerName`, an invalid `iin` pattern (wrong digit count), an invalid
`declarationType` enum value, a missing `notificationNumber` when
`declarationType` is `by_notification`, a missing `residenceCountryCode` when
`residencyStatus` is `non_resident`, an invalid `residencyStatus` enum value,
a `totalCalculatedIitAmountTenge` below the valid 0 minimum, and a missing
required `appendix22001Attached`. All 10 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation` rules (not committed, per this
registry's established per-cycle practice). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 528/528 across the full registry with this
schema added.

## Known gaps

- All ten schedules (Forms 220.01-220.10) are open backlog for future
  companion schemas — see "Scope and disclosed boundaries" above for each
  schedule's own page count and subject matter.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
