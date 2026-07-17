# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-04` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3551**), deepening
Kazakhstan's Taxes vertical by authoring the fourth of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.04, the
foreign-source-income schedule the GOV-3544 cycle's own Form 220.03 boundary
check had already located (images 179-180, "Form 220.04 page 1").

## Why this candidate

CATALOG.md's own "Genuinely open, well-sourced candidates" section disclosed
seven remaining companion schedules (Forms 220.04-220.10) as open backlog
after the GOV-3544 cycle authored Form 220.03. This cycle re-scanned
CATALOG.md fresh per the standing per-cycle routine and confirmed the 4 named
National ID candidates and every single-vertical-gap jurisdiction's remaining
vertical are still resolved/dead-end per the prior cycle's own re-confirmation
(not re-screened live this cycle, since GOV-3544 had just re-confirmed them
the same day). Given the disclosed, pre-located Form 220.0X backlog remained
open and exact, this cycle deepened it directly rather than re-scouting new
ground — the same "deepen an open, well-sourced backlog item before scouting
new ground" preference this registry's routine already establishes, and the
same schedule series the GOV-3484/GOV-3506/GOV-3544 cycles already advanced
three times.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 and Forms 220.01-220.03 schemas source.
  - **URL (directly retrieved, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain in the GOV-3459/GOV-3477/
    GOV-3484/GOV-3506/GOV-3544 cycles (`openssl verify` code 21) — a server
    misconfiguration, not a real access gate.
  - **File identity confirmed:** Form 220.04 is embedded as two scanned page
    images, `/files/1576/49/179.jpg` (page 1) and `/files/1576/49/180.jpg`
    (page 2), independently re-fetched (`curl -k`, HTTP 200) this cycle and
    read visually — at native resolution first, then at 3x-8x zoom (via the
    `sharp` npm package, cropped per section) to resolve box counts and
    column headers precisely.
    - `178.jpg` sha256: `f5d534500479a8b5c06f0b93c1e3145b59d3ff2941513d99e8ae2b292f7c900e`
    - `179.jpg` sha256: `daebdfc2f6dcc5a9761dc962a5d71def890f3c1e0a07e30e7bd8efd6ee1168e0`
    - `180.jpg` sha256: `fc43618c0f84af9b4b6550b4f119c18e1bf189d70d847a25131fcd684dbea091`
    - `181.jpg` sha256: `4aa00e5969bfb031ffea6026b57439f6ba15f9b5ec58e486f8831781383cbe20`
  - **Boundary check, both ends:** image `179.jpg`'s own printed header
    ("форма 220.04 стр.01") directly states the form and page number, no
    inference needed; `180.jpg` prints "форма 220.04 стр.02". The preceding
    image, `178.jpg`, was independently re-fetched this cycle and visually
    confirmed to still print "форма 220.03 стр.01" — the same content already
    published as `..-schedule-220-03`. The following image, `181.jpg`, was
    fetched and visually confirmed to be a distinct,
    single-page "Раздел. Показатели" layout headed "Форма 220.05" (loss
    accounting), matching the parent Form 220.00 schema's own disclosed
    page-count estimate ("220.05 (loss accounting) — image 181, 1 page").
    This bounds Form 220.04 to exactly images 179-180, two pages.
  - **Row-count determination:** the "Раздел. Показатели" table's row count
    (identical on both pages, sharing one column-A row-number series) was
    confirmed two independent ways: (1) three zoomed vertical bands of
    column A's row-number boxes on page 1, each visually counted (6 + 6 + 5
    = 17), cross-checked against an identical band count on page 2's own
    column A; (2) a pixel-luminance scan down column A's box area detecting
    17 row-top border positions at a consistent ~23-24px pitch below the
    grand-total row. Both methods agree: **1 printed grand-total row plus 17
    individual entry rows** — one more entry row than the sibling Form
    220.03's 16-row table.
  - **Extraction method:** every column was read directly off the rendered
    page images at zoom, with box counts for the boxed-digit columns
    (A: 8 boxes; B: 3 boxes; C: 4 boxes; D: 3 boxes) confirmed via further
    zoomed crops. Columns E and F (page 1) and G and H (page 2) are each a
    single boxed money-amount field per row — F, G, and H print the same
    трлн/млрд/млн/тыс (trillion/billion/million/thousand) place-value group
    labels already established for other Form 220.0X money fields; column E
    (foreign-currency amount) prints no such group labels, since it is not
    denominated in tenge.

### Secondary source — the Order's own Rules text (a new depth of extraction this cycle)

- This cycle additionally fetched and read the Order's own full HTML page
  text (`https://adilet.zan.kz/rus/docs/V2500037390`), not just the scanned
  form images used by the GOV-3484/GOV-3506/GOV-3544 cycles. That page embeds
  the complete "Правила составления форм налоговой отчетности" (Rules for
  completing tax reporting forms), including **Глава 6. Пояснение по
  составлению формы 220.04** — the Ministry's own line-by-line instructions
  for this exact schedule (Items 28-30), and confirmed this schedule's own
  Appendix number: **"Приложение 12 к приказу ... № 695"** (Appendix 12),
  immediately following Form 220.03's own confirmed Appendix 11.
- Item 30 gives the authoritative meaning of each column, used directly in
  this schema's field descriptions: column B is the country-of-residence
  code of the **non-resident payer** of the income (not a "treaty country"
  as in Form 220.03); column C is the income-type code per Item 54(2)
  (see the correction below — the schema as first authored mis-cited this
  as "Item 71"); column D
  is the currency code of column E; column E is the foreign-currency income
  amount taxable in Kazakhstan; column F is that amount converted to tenge
  at the market rate on the last business day before the transaction; column
  G is the foreign tax creditable per Tax Code Art. 346 §§1-3 (the smallest
  of three statutory amounts, spelled out in the field description); column
  H is management/general-administrative expenses per Tax Code Art. 257.
  The Rules also disclose a cross-form carry-over: column F row totals for
  specific income-type codes are summed into different lines of the
  corresponding Form 220.01 appendix (codes 2010/2020/2030/2040/2050/2170/
  2190 to line 220.01.001; code 2060 to line 220.01.012; all other codes to
  line 220.01.003; the column F grand total to line 220.01.019; the column G
  grand total to line 220.01.057 I).
- **Item 54(2)** gives a complete inline legend for the income-type code
  (column C) — genuinely richer sourcing than the undocumented-code columns
  on the sibling Forms 220.01-220.03, none of which had an inline legend on
  their own pages or in the Rules text examined by those cycles. **Correction
  (this cycle's review-gate fix, GOV-3554):** the schema as first authored
  cited "Item 71" and modelled only 44 codes. Independent re-verification
  during the GOV-3554 review gate found that Item 71 is not this form's own
  legend at all — it sits in **Appendix 2** of the same Order (No. 695),
  which is the Rules chapter for the unrelated **Form 100.00** (corporate
  income tax declaration); it happens to carry a near-identical 44-code list
  because the two forms' Rules chapters reuse largely the same drafting
  boilerplate. Form 220.04's own Rules sit in **Appendix 9** (confirmed via
  the Order's own numbered appendix list, item 9 = "форма 220.00"), and the
  legend actually keyed to this appendix is **Item 54, sub-clause 2)** ("2)
  доходы из источников за пределами Республики Казахстан"). That legend has
  **46 distinct codes**, not 44 — it includes two codes entirely absent from
  the schema as first published:
  - `2360` — income from a decrease in insurance reserves created by
    insurance/reinsurance organizations under insurance/reinsurance
    contracts, received from a non-resident.
  - `2420` — excess of positive over negative exchange-rate differences,
    determined per IFRS and Kazakhstan's accounting/financial-reporting
    legislation, outside Kazakhstan.

  A third code, **`2460`** (income from a decrease in provisions created by
  licensed banks and organizations performing certain banking operations,
  received from a non-resident), is also missing from the 44-code list but
  is **not printed as "2460" in Appendix 9's own Item 54(2) text** — that
  text instead prints a second, out-of-sequence `2360` entry between codes
  2450 and 2470, with the banking-provisions wording. This is a drafting
  duplicate/typo in the government's own published Order, not a real second
  meaning for code 2360: the identical banking-provisions wording is
  correctly labelled `1460` in this same Item 54's parallel *domestic*-income
  list (sub-clause 1, "доходы из источников в Республике Казахстан") a few
  lines above, and correctly labelled `2460` in the equivalent foreign-income
  legend of a *different* form's Rules chapter elsewhere in the same Order
  (Appendix 6, Item 54, for Form 110.00) — confirmed by fetching and diffing
  both occurrences against Appendix 9's text. Since the domestic/foreign code
  pairs in this scheme consistently differ by exactly 1000 (`1010`↔`2010`,
  `1450`↔`2450`, `1470`↔`2470`, etc.), `1460`↔`2460` is the only reading
  consistent with the rest of the sequence, and a legend entry printed as a
  literal duplicate of an already-used code number is not a usable value in
  any case. This schema therefore models the code as `2460`, not the Order's
  own typo'd `2360` duplicate, and documents the discrepancy here rather than
  silently reproducing it.

  This schema now models column C as an `enum` of the full, corrected
  **47-code** set: the original 44, plus `2360`, `2420`, and `2460` (see
  `entry1IncomeTypeCode`'s description for the full legend, following the
  same enum-with-inline-legend convention already established for
  `si/furs/doh-odm-income-tax-return-instructions`'s `incomeEntry1Code`).
  Checked whether this same "Item 71" mis-citation and 3-code gap could
  recur elsewhere in this registry: `grep`-ing every other KZ KGD
  `schema.json` (the parent `individual-income-tax-declaration`, Form
  220.00, GOV-3477; and sibling schedules 220.01-220.03) for
  `IncomeTypeCode`/`Item 71`/"видов доходов" found no matches — none of them
  model an income-type-code enum, so this fix is fully scoped to this one
  schema.
- **Item 73** (country code, column B) and **Item 55** (currency code,
  column D) are each an external classifier referenced by number —
  "Классификатор стран мира" (Annex 22) and "Классификатор валют"
  (Annex 23) to Decision No. 378 of the Customs Union Commission, 20
  September 2010 — not enumerated inline in this Order's own text. Both
  remain pattern-constrained `string` fields, per this registry's
  established discipline for undocumented external classifier codes.

### Form convention confirmed

- **The grand-total row is structurally distinct from the 17 entry rows** —
  same convention as Forms 220.00-220.03: column A prints a fixed value
  ("00000001") on the total row, and columns B/C/D are replaced on that row
  by the instructional text "ИТОГО (строка заполняется ТОЛЬКО по итогу
  формы)", while columns E, F (page 1) and G, H (page 2) still print boxes on
  the total row for the four grand-total amounts. Modelled as four standalone
  fields (`totalForeignCurrencyAmount`, `totalNationalCurrencyAmount`,
  `totalTaxCreditAmount`, `totalManagementExpensesAmount`), separate from the
  `entry1`...`entry17` series — the same total-row-as-standalone-field
  convention already applied to Forms 220.00-220.03.
- **Column A ("№", 8 boxed digits)** is a row-ordinal control, not applicant
  data, per the same established convention as Forms 220.00-220.03 — row
  identity is expressed by field-name ordinal (`entry1`...`entry17`), not a
  separate row-number field.
- **A page-level "Укажите номер текущего листа" box** appears in the header
  of both pages, the same continuation-sheet mechanism already modelled for
  Form 220.03's `currentSheetNumber` field. Since both of this schedule's
  pages share one printed header/table (not two independent single-page
  schedules), only one `currentSheetNumber` field is modelled, matching the
  schedule's own single logical sheet.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.04 in full** — both of its
pages, the taxpayer-identification header, the sheet-numbering box, the
grand-total row's four amount fields, and all 17 individual entry rows (each
with country code, income-type code, currency code, foreign-currency amount,
national-currency amount, foreign-tax-credit amount, and management-expense
amount). Explicitly out of scope, and disclosed rather than silently omitted:

- **The six other companion schedules** (Forms 220.05 through 220.10) remain
  open, disclosed backlog for future companion schemas — see the parent Form
  220.00 schema's own VERIFICATION.md for each remaining schedule's page
  count and subject matter.
- **The cross-form carry-over into Form 220.01.** The Rules' own Item 30
  discloses that column F and G row/grand totals are summed into specific
  lines of the Form 220.01 appendix (see "Secondary source" above for the
  exact line mapping) — this schema models Form 220.04's own fields only,
  not the receiving Form 220.01 lines or the aggregation itself.
- **The country code (column B) and currency code (column D) external
  classifiers.** Both reference a named Customs Union Commission annex by
  number, not reproduced inline in the Order's own text examined this cycle
  — modelled as pattern-constrained `string` fields (`^[0-9]{3}$` each), not
  `enum`, per this registry's established discipline for undocumented
  external classifier codes.
- **The trustee-filing substitution rule** (Item 29: if a trust manager
  performs the tax obligation, line 1 shows the trust manager's own IIN) is
  disclosed in the `iin` field's description but not separately modelled —
  the field itself is unchanged either way.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-04/1.0.0/`:
2 valid submissions (one with only the two required header fields populated;
one fuller filing populating all four grand totals and three individual
entry rows spanning country, income-type, and currency codes plus all four
amount columns) and 8 mutation-control fixtures (each expected to raise
exactly 1 error): a missing required `iin`, a missing required
`taxPeriodYear`, an invalid `iin` pattern (wrong digit count), an invalid
`taxPeriodYear` type (string instead of integer), an invalid
`entry1CountryCode` pattern (wrong digit count), an `entry1IncomeTypeCode`
value not in the 47-value enum, a `totalForeignCurrencyAmount` given a
string instead of a number, and an unknown field not defined anywhere in
this schema. All 10 were checked with a from-scratch, throwaway Node mock
validator implementing this schema's own `required`/`validation` rules (not
committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 538/538 across the
full registry with this schema added.

## Known gaps

- Forms 220.05 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as scanned page images, plus this cycle's additional read of the Order's
own HTML Rules text) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
