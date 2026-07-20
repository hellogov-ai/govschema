# Verification record — `kz/kgd/declaration-of-assets-and-liabilities` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-20`

This is a `GovSchema Standard Research` cycle (**GOV-4043**), deepening
Kazakhstan's Taxes vertical by screening and authoring a candidate the
GOV-3616/GOV-3618 cycle had glimpsed only in passing — an adjacent, unrelated
form image seen while confirming Form 220.10 was the last of Form 220.00's own
ten schedules — but never read or investigated.

## Why this candidate

The 2026-07-20 heartbeat opened with the entire disclosed UA DPS
companion-schedule backlog just closed (GOV-4037, the tenth and last of ten
annexes) and Kazakhstan's own Form 220.0X schedule series already fully
modelled (GOV-3477 through GOV-3618). Rather than force a re-screen of a
gated source or immediately open a new jurisdiction, this cycle re-scanned
CATALOG.md's own disclosed notes and found one specific, never-investigated
lead: Form 250.00, seen only as image 195.jpg immediately after Form 220.10's
own image 194.jpg. In parallel, two new-jurisdiction candidates (Azerbaijan's
driver's-license change form, Uzbekistan's employer income/social-tax
reporting form) were also scouted and found strong — see "Known gaps" below
for both, left as ready-to-use backlog rather than authored this cycle, since
deepening Kazakhstan's own already-open backlog item took priority per this
registry's standing per-cycle procedure.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — the same Order of the Minister of Finance of the Republic of
  Kazakhstan No. 695, 12 November 2025** that also governs Form 220.00.
  - **URL (directly retrieved, HTTP 200):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain across every prior KZ cycle
    (`openssl verify` code 21) — a server misconfiguration, not a real access
    gate. `curl -k` loads the page at HTTP 200. Fetched fresh this cycle:
    2,660,118 bytes, text/html.
  - **Structure confirmed:** the order's own item-9-adjacent item 10 —
    "форму декларации об активах и обязательствах физического лица (форма
    250.00) с пояснением по ее составлению согласно приложению 10" — is Form
    250.00, modelled by this schema, governed by **Appendix 10** (distinct
    from Form 220.00's Appendix 9). Appendix 10 embeds its own form templates
    as eight scanned page images
    (`/files/1576/49/{195,196,197,198,199,200,201,202}.jpg`), immediately
    followed by the appendix's own prose filing instructions ("Пояснение по
    составлению...", read in full for this cycle) — text confirmed to have
    only two chapters (Глава 1 "Общие положения", Глава 2 "Составление
    Декларации (форма 250.00)") for the main declaration, followed by six
    further chapters (Глава 3-8), one per schedule (250.01-250.06), before
    Appendix 11 begins a wholly unrelated form (Form 270.00) — confirming no
    further Form 250.0X schedule exists beyond 250.06.
  - **Extraction method:** all eight page images were fetched directly
    (`curl -k`) and read visually, cross-checked against the explanatory
    text read in full:
    - **195.jpg-196.jpg** (heights 830, 905) — the two-page main Form 250.00
      declaration, this schema's scope.
    - **197.jpg** (height 430) — Schedule 250.01 (Приложение 1: foreign real
      estate and foreign vehicles, items 01-02).
    - **198.jpg** (height 416) — Schedule 250.02 (Приложение 2: foreign bank
      accounts over/under threshold and foreign equity stakes, items
      03a/03b/04).
    - **199.jpg** (height 416) — Schedule 250.03 (Приложение 3: foreign
      housing-construction participation and investment gold, items 05-06).
    - **200.jpg** (height 416) — Schedule 250.04 (Приложение 4: foreign
      securities/derivatives, digital assets, and foreign brokerage accounts,
      items 07-09).
    - **201.jpg** (height 416) — Schedule 250.05 (Приложение 5: intellectual
      property/copyright objects and other high-value property, items
      10-11).
    - **202.jpg** (height 416) — Schedule 250.06 (Приложение 6: receivables/
      payables and trust property, items 12-13).

    Every field on Form 250.00 itself (items 1-6, the fourteen asset/
    liability gating checkboxes 01-13, the below-threshold cash-on-hand
    table, and the responsibility/attestation block) was transcribed
    directly from the page images in item order, then cross-checked against
    the explanatory text (Глава 2) for two ambiguities the images alone left
    open — see "Disclosed judgment calls" below.

### External classifiers cited, not embedded

- **Currency code (Раздел C, cash-on-hand table):** the order's own
  explanatory rules point to the same Appendix 23 "Классификатор валют"
  (Currency Classifier) to Decision No. 378 of the Customs Union Commission
  (20 September 2010) already cited by `kz/kgd/individual-income-tax-declaration`.
  Modelled as a pattern-constrained free string (`entry1CashCurrencyCode`,
  `entry2CashCurrencyCode`) rather than an invented enum.
- **IIN (Individual Identification Number) format:** confirmed as a 12-digit
  personal identifier under Kazakhstan's State Population Register Law, the
  same convention already documented for this registry's
  `kz/moj/state-registration-limited-liability-partnership` and
  `kz/kgd/individual-income-tax-declaration` schemas.

## Disclosed judgment calls

- **`categoryReferenceDate` as a single shared field.** Item 1's three
  mutually-exclusive taxpayer-category options (A/B/C) each print their own
  boxed date with a distinct legal meaning (first day of the candidacy
  month; first day of the filing month; 31 December of the preceding year).
  Since exactly one option is ever selected per filing, this schema carries
  one shared `categoryReferenceDate` field rather than three parallel
  per-category date fields, with the field's own description stating which
  meaning applies for each `taxpayerCategory` value.
- **Item 4 (name/phone/email) scoped to the legal representative, not the
  taxpayer.** The rendered image alone does not visually gate item 4 to the
  legal-representative case, but the explanatory text (Глава 2, its own
  numbered item 3) states explicitly that line 4 records "фамилия, имя,
  отчество физического лица ... законного представителя несовершеннолетнего
  лица" — the legal representative's own particulars, not the taxpayer's
  (whose own name is not re-collected on this form given their IIN already
  identifies them, and who signs under their own name in the Раздел D
  attestation block instead). This schema therefore models
  `representativeLastName`, `representativeFirstName`, and
  `representativePhoneNumber` as `requiredWhen isLegalRepresentative` is
  `true`; `representativePatronymic` and `representativeEmail` remain
  optional even then — the former per this registry's standard Kazakh/
  Russian "if any" naming convention, the latter because the explanatory
  text itself marks email "по желанию" (voluntary).
- **`taxAuthorityCode` modelled as a required filer field on textual
  authority alone.** The printed Раздел D block (image 196.jpg) does not
  visually distinguish this box from the four adjacent office-only fields it
  sits beside, but the explanatory text's own numbered item 3 states it is
  "код органа государственных доходов по месту жительства налогоплательщика"
  — the filer's own local tax-authority code, not one the receiving official
  assigns — the same field this registry's own
  `kz/kgd/individual-income-tax-declaration` schema already models
  identically for Form 220.00's structurally equivalent block.
- **Раздел C's cash-on-hand table capacity.** The rendered image shows
  exactly two blank input rows (one currency/amount pair per row) above its
  own worked example, with no stated numeric capacity in the explanatory
  text. Modelled as `entry1CashCurrencyCode`/`entry1CashAmount` and
  `entry2CashCurrencyCode`/`entry2CashAmount`, both entries optional,
  following this registry's established `entryN`-prefixed convention for
  small bounded-capacity tables (e.g.
  `kz/kgd/individual-income-tax-declaration-schedule-220-07`) — a visual
  reading, not a textually stated count, disclosed as a judgment call.
- **`hasOtherHighValueProperty` (item 11) description.** Schedule 250.05's
  own section for this item is printed "Заполняется ПО ЖЕЛАНИЮ физического
  лица" (filled voluntarily, by the individual's own wish) even when this
  gating box is checked — the only one of the fourteen gating checkboxes
  whose underlying schedule section is itself marked voluntary. Disclosed in
  the field's own description; does not change this v1.0.0's own scope,
  since Schedule 250.05 is out of scope regardless.

## Genuine structural difference from Form 220.00

Form 250.00's own `declarationType` is a **four-value** convention
(первоначальная/очередная/дополнительная/дополнительная по уведомлению) with
no "ликвидационная" (liquidation) option, unlike Form 220.00's five-value
convention (`primary`/`regular`/`additional`/`by_notification`/`liquidation`)
— consistent with Form 250.00 being a personal asset/liability disclosure
with no entrepreneurial-liquidation concept behind it.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 250.00, the main declaration,
only.** Explicitly out of scope, and disclosed rather than silently omitted:

- **All six schedules' internal line items** (Forms 250.01 through 250.06,
  one compact page each in the reference specimen — see "Extraction method"
  above for each schedule's own subject matter). Form 250.00 gates each
  schedule with its own asset/liability checkbox (items 01-13); this schema
  models each of those fourteen checkboxes as its own boolean field
  (`hasForeignRealEstate` through `hasTrustProperty`) but not the schedule
  content behind them — the same combined-form scoping convention already
  established in this registry for Form 220.00 and its own ten schedules.
  Unlike that series, all six of Form 250.00's schedules are considerably
  smaller (one page, 2-3 repeating rows each, per the images examined this
  cycle) — a materially smaller effort than the 220.0X series for a future
  companion-schema cycle to pick up.
- **The receiving tax authority's own fields**: the name of the official who
  accepted the declaration, the incoming document number, the declaration's
  date of receipt, and the postal-stamp date are stated explicitly in the
  explanatory text's own closing sentence to be "заполняются работником
  органа государственных доходов" (filled by the revenue-body employee) —
  disclosed, not modelled, the same convention already established for Form
  220.00.

## Conformance fixtures

11 fixtures are committed under
`conformance/kz/kgd/declaration-of-assets-and-liabilities/1.0.0/`: 2 valid
submissions (0 errors each — one minimal general-category resident filing
with no assets/schedules checked, one fuller candidate-category filing via a
legal representative, non-resident, additional-by-notification, with three
asset checkboxes and both cash-table rows populated, exercising every
`requiredWhen` branch) and 9 mutation-control fixtures (each expected to
raise exactly 1 error): a missing required `iin`, an invalid `iin` pattern
(wrong digit count), an invalid `taxpayerCategory` enum value, an invalid
`declarationType` enum value, an invalid `residencyStatus` enum value, a
missing `attestationSignatoryName`, a negative `entry1CashAmount` (below the
valid 0 minimum), a missing `representativeLastName` when
`isLegalRepresentative` is `true`, and a missing `notificationNumber` when
`declarationType` is `additional_by_notification`. All 11 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation` rules (not committed, per this
registry's established per-cycle practice). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 557/557 across the full registry with this
schema added.

## Known gaps

- All six schedules (Forms 250.01-250.06) are open backlog for future
  companion schemas — see "Scope and disclosed boundaries" above for each
  schedule's own page and subject matter; considerably smaller in aggregate
  than Form 220.00's own ten-schedule series.
- **Azerbaijan's driver's-licence change/replacement application** (Appendix
  6 to MIA Instruction Q16-001-12, `https://mia.gov.az/files/uploader/sv_deyishilme.doc`,
  a genuine unauthenticated legacy-`.doc` single-page form, ~18-20 fields, no
  companion schedules needed) was scouted this cycle as a strong,
  ready-to-author 74th-jurisdiction DMV candidate — not authored this cycle.
- **Uzbekistan's employer income/social-tax reporting form** (Appendix 4 to
  State Tax Committee/Ministry of Finance Resolution No. 3221,
  `https://lex.uz/files/7889507.zip`, a genuine unauthenticated legacy-`.doc`
  file inside a directly downloadable ZIP, a numbered line-code computation
  table) was scouted this cycle as a strong 74th/75th-jurisdiction Taxes
  candidate — not authored this cycle; a distinct individual annual-income
  declaration is believed to exist in the same resolution's other appendices
  but was not pinned down to an exact appendix number this cycle.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images, cross-checked against the order's own explanatory
text) and transcribed its fields. No automated re-verification tooling
exists yet for this schema; `nextReviewBy` is set 6 months out per the
practice's default cadence.
