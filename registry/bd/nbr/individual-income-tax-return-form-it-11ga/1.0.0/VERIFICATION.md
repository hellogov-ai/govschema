# Verification record — `bd/nbr/individual-income-tax-return-form-it-11ga` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2612**. It opens
**Bangladesh as this registry's 46th jurisdiction**, via its **Taxes
vertical (1 of 6)**, using the National Board of Revenue's (NBR) IT-11GA
("Form of Return of Income for Individual Person"), 2023 edition. Bangladesh
was scouted and screened in GOV-2591's prior cycle (see that issue's own
memory record): DMV (BRTA), Business Formation, Passport, and National ID
were all confirmed dead ends or weak (portal-migrated, garbled-font/no-fields,
or a scanned raster background with no OCR text layer behind the AcroForm
fields), and IT-11GA was flagged as the strongest candidate — a clean,
text-layer-only, no-login-gate PDF. This cycle independently re-verified that
characterization from scratch, since no exact prior-cycle URL, hash, or page/
field count had been recorded to reproduce.

## Source verification (independently re-derived, not copied from the task)

- Located this cycle via a fresh fetch of NBR's own English income-tax-forms
  page, `https://nbr.gov.bd/form/income-tax/eng` (HTTP 200 with a
  browser-like `User-Agent`; a bare `curl` with no `User-Agent` returns HTTP
  403 — a WAF rule, not a dead source). That page currently lists the
  individual return as `Individual_Return_IT-11Ga(2023)5.pdf` (a second,
  differently-suffixed copy, `...3.pdf`, also surfaced in web search but is
  **not** the one linked from NBR's own current forms page — the `5.pdf`
  copy was treated as canonical for that reason).
- **URL:** `https://nbr.gov.bd/uploads/form/Individual_Return_IT-11Ga(2023)5.pdf`
- Fetched independently this cycle via `curl` (with a browser `User-Agent`;
  bare `curl` also 403s on the uploads host):
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 381696`
    bytes, `Last-Modified: Tue, 07 Nov 2023 06:09:28 GMT`.
  - **`sha256`:**
    `2a7f51e37ac8f6e61fd153f002b799f36ca8ced56b0013ca5ff7d1459f76f724`
    (computed independently via `sha256sum` on the freshly-downloaded file).
- Parsed with `pdfjs-dist@3` (legacy build, `getAnnotations({intent:'display'})`,
  filtered to `subtype === 'Widget'`), installed in a scratch directory (not a
  repo dependency), following this registry's established PDF-extraction
  practice:
  - **10 pages**, **0 AcroForm widgets on every page** — confirming
    GOV-2591's prior characterization: this is a printed, numbered-line-item
    form with no fillable AcroForm fields, not a form to extract via widget
    metadata.
  - Every field below was instead extracted by reading `getTextContent()`'s
    position-sorted text rows (grouped by rounded `y`, sorted by `x` within
    each row) directly, confirming each printed line's own numbering,
    heading, and checkbox layout (independently-tickable checkbox glyphs
    render as empty strings in this font; their presence/absence and count
    per row was used to distinguish an independent multi-select checkbox row
    from a mutually-exclusive one — e.g. residentialStatus's two
    Resident/Non-resident checkboxes vs. the six independent special-benefit
    checkboxes) before modeling it.

## Scoping decision (per GOV-2612's own explicit permission)

IT-11GA is a wide return: the 3-page main return (identification, income/tax
summary, tax-payment particulars, verification) plus five annexed schedules
(pages 4-6), a lifestyle-expense statement (IT-10BB, page 7), and a
wealth/net-worth statement (IT-10B, pages 8-9). This v1.0.0 deliberately
scopes to the **general/salaried resident-individual filing pathway**,
modeling:

1. **Page 1** — full taxpayer identification: name, National ID/passport
   number, TIN, circle/taxes zone, assessment year, residential status,
   taxpayer's legal status, the six independent special-benefit checkboxes,
   date of birth, spouse name/TIN, address, contact details, employer name,
   and the (source-fidelity-only, not-applicable-to-this-scope) business/
   firm-identification fields.
2. **Page 2** — the full Statement of Income and Tax (items 1-19): the
   in-scope `incomeFromEmployment` line plus the other nine income-category
   lines modeled as optional pass-through fields (0/absent for a pure
   salaried filer with no other income), the total-income aggregate, and the
   full tax-computation cascade (gross tax, rebate, net tax, minimum tax,
   tax payable, surcharges, delay interest/penalty, total amount payable).
3. **Page 3** — the full Particulars of Tax Payment (items 20-26), the
   free-text list of documents furnished, and the verification/signature
   block.
4. **Schedule 1, part (b)** (page 4) — Income from Employment for employees
   *other than* those on a government pay scale: the general/private-sector
   salaried case this v1.0.0 targets. All 15 numbered items, including the
   header's repeated taxpayer-name/TIN identification line.

### Out of scope, disclosed

- **Schedule 1, part (a)** (page 4, y≈753-413) — the parallel Income from
  Employment schedule for employees receiving salary under a **government**
  pay scale (17 numbered items: basic pay, arrear pay, special/house-rent/
  medical/conveyance/festival/support-staff/leave allowances, honorarium,
  overtime, Bangla Noboborsho allowance, PF interest, lump grant, gratuity,
  others, total). Not modeled — this v1.0.0 targets the general/private-
  sector case (part (b)) instead, per the task's own explicit scoping
  permission.
- **Schedule 2** (page 5) — Income from Rent (10 items: rent/annual value,
  advance rent, benefit value, adjusted advance rent, vacancy allowance,
  total rental value, 6 sub-items of allowable deduction, total admissible
  deduction, net income, taxpayer's share).
- **Schedule 3** (page 5) — Income from Agriculture (4 items: sales/
  turnover, gross profit, expenses, net profit).
- **Schedule 4** (page 6) — Income from Business (16 items: sales/turnover,
  gross profit, expenses, bad debt, net profit, plus a summary balance
  sheet — cash/bank, inventory, fixed assets, other assets, total assets,
  opening/closing capital, drawing, liabilities, total capital & liabilities).
- **Schedule 5** (page 6) — Investment Tax Credit (11 itemized investment
  categories: life insurance, DPS, government securities/mutual fund/ETF
  units, listed securities, Provident Fund Act 1925 contributions,
  self/employer Recognized-Provident-Fund contributions, superannuation
  fund, benevolent fund/group insurance, Zakat fund, others). Its own
  bottom-line carry-forward figure into page 2 item 13 (`taxRebate`) is
  still modeled, as an optional pass-through field, since the in-scope
  page-2 tax computation itself presents that line.
- **IT-10BB (2023)** (page 7) — Statement of Expenses Relating to Lifestyle
  (9 numbered expense categories: fooding/clothing, housing, personal
  transport, utilities, education, travel/vacation, festival, tax deducted
  at source on Sanchaypatra profit, and interest on personal loans, plus a
  total and its own verification/signature block). Per the source's own
  page-10 instruction (8), this statement's signature is mandatory for
  every individual filer regardless of asset level — not field-modeled in
  this v1.0.0, but disclosed as an unmodeled companion-document requirement
  (`documents[].wealthAndLifestyleStatements`) so a future cycle is not
  confused about its absence.
- **IT-10B (2023)** (pages 8-9) — Statement of Assets, Liabilities and
  Expenses (a net-wealth statement: sources of fund, net wealth roll-forward,
  personal liabilities, and a detailed particulars-of-assets section — 8
  numbered top-level items with further lettered/roman-numeral sub-items for
  business assets, director's shareholdings, non-agricultural/agricultural
  property, financial assets, motor vehicles, ornaments, furniture/
  electronics, other assets, and cash/bank balances, plus assets outside
  Bangladesh and a grand total). Per the source's page-8 preamble, mandatory
  for: all public servants; any individual with total assets (in/outside
  Bangladesh) exceeding Taka 40,00,000; any individual owning a motor
  vehicle, having invested in house property/apartment within a City
  Corporation area, owning assets outside Bangladesh, or being a
  shareholder-director of a company; and, per instruction (8), mandatory
  regardless for every individual's own signature. Not field-modeled in
  this v1.0.0 for the same reason as IT-10BB — disclosed via the same
  `documents[]` entry.

## Field-by-field inventory and disclosed judgment calls

### Page 1 (identification)

- **`taxpayerTin`/`spouseTin`/`declarantTin`/`schedule1Tin`**: the source
  prints the TIN line as three dash-separated blank segments (`"TIN: ... -
  ... - ..."`) with **no digit-count guide printed on the form itself** (this
  is a printed form, not an AcroForm with per-character comb boxes). Modeled
  as a single 12-digit e-TIN (`^[0-9]{12}$`) per Bangladesh's current NBR
  e-TIN standard (in force since the 2013 online-registration system; the
  pre-2013 manual TIN was 10 digits and holders were required to re-register
  to the 12-digit e-TIN) — a disclosed judgment call resolving an external,
  official numbering-scheme fact not itself printed on this specific PDF's
  blank-line layout.
- **`businessIdentificationNumber`**: similarly modeled as a 13-digit BIN
  (`^[0-9]{13}$`) per the current NBR e-BIN standard, though not applicable
  to the general/salaried filer this v1.0.0 targets (included only for
  page-1 source fidelity, since the source prints this line on every
  IT-11GA regardless of applicability).
- **Special-benefit checkboxes** (`isWarWoundedFreedomFighter`/`isFemale`/
  `isThirdGender`/`isDisabledPerson`/`isAged65OrOlder`/
  `isParentOfDisabledPerson`): confirmed as six independently-tickable
  checkboxes (not a single mutually-exclusive enum) by dumping each row's
  raw text items — each label is followed by its own distinct checkbox
  glyph (rendered as an empty string by this PDF's font), unlike
  `residentialStatus` and `taxpayerLegalStatus`, which are also
  checkbox-per-option but read here as intended to be mutually exclusive
  given their single-answer nature ("Resident / Non-resident",
  "Individual / Firm / HUF / Others").
- **`taxpayerLegalStatus`**: this form is titled "FOR INDIVIDUAL PERSON" yet
  its own item 7 checkbox row prints all four values (Individual / Firm /
  Hindu Undivided Family / Others) — modeled with the full enum for source
  fidelity, since this v1.0.0 targets the typical `"individual"` value for
  this specific form variant.
- **`spouseTin`**: the source has no discrete boolean widget for "is your
  spouse a taxpayer" distinct from the TIN blank itself (item 10 reads
  "TIN (if spouse is a Taxpayer)"). Left optional with no `requiredWhen`,
  since encoding one would require inventing a field the source does not
  present — disclosed rather than silently modeled (the same pattern this
  registry has used before, e.g. `th/rd/pit-90-personal-income-tax-return`'s
  own `spousePassportNumber`).
- **`businessOrganizationName`/`businessIdentificationNumber`/
  `partnersNamesAndTins`**: items 13(a), 13(b), and 14 are firm/business/
  partnership-specific fields not applicable to the general/salaried
  individual filer this v1.0.0 targets. Modeled as plain optional fields
  for page-1 source fidelity (the source prints these lines on every
  IT-11GA), consistent with how `th/rd/pit-90-personal-income-tax-return`
  modeled its own out-of-scope-adjacent `businessEstablishmentName`/
  `businessWebsite` fields.

### Page 2 (Statement of Income and Tax)

19 fields modeled across items 1-19. Items 2-10 (rent, agriculture,
business, capital gain, financial assets, other sources, firm/AoP share,
minor/spouse income, foreign income) are each carried from an out-of-scope
schedule (or, for capital gain/financial assets/other sources/firm-AoP-
share/minor-spouse-income/foreign-income, from no schedule this form itself
annexes for those lines) — modeled as optional pass-through numeric fields,
0/absent for the general/salaried filer this v1.0.0 targets, consistent with
how `th/rd/pit-90-personal-income-tax-return` modeled its own out-of-scope
carry-forward lines (e.g. `section11CarriedFromRealEstateSchedule`) as
optional pass-throughs rather than omitting the line entirely (every filer's
tax computation still presents these lines, in-scope or not).

**Disclosed non-computation:** `grossTaxOnTaxableIncome` (item 12) is
computed per Bangladesh's statutory progressive personal-income-tax bands.
This schema does not itself assert or embed the current band table (which
also varies by `taxpayerLegalStatus`/gender/senior-citizen/disability
status per the special-benefit checkboxes) — the field is modeled because
the source itself presents it as a line the filer/preparer completes, not
because this schema computes it. The two conformance fixtures below use
figures consistent with a plausible application of Bangladesh's publicly
documented tax-year 2023-24 slabs, for internal fixture consistency only,
not as an asserted-current legal figure encoded in the schema itself — the
same disclaimer pattern `th/rd/pit-90-personal-income-tax-return` used for
its own tax-band-dependent fields.

**Disclosed absence of a printed formula:** unlike item 24 (page 3,
explicitly "20 + 21 + 22 + 23"), the source prints **no explicit arithmetic**
for item 25 ("Excess Payment"). `excessPayment`'s description discloses this
is presumed to be the excess of item 24 over item 19 when positive, not an
asserted computation this schema itself performs.

### Page 3 (tax payment, documents list, verification)

13 fields modeled. **Disclosed judgment call** on the verification clause:
the source prints "I ...........................................................father /
husband.........................................................................................." with no
further disambiguating punctuation in the extracted text layer. Modeled as
`declarantName` (the blank before "father / husband") plus
`declarantFatherOrHusbandName` (the blank after it), read as the declarant
identifying themselves via their father's or husband's name — a common
identification convention on Bangladeshi/South Asian government forms —
rather than, for example, two entirely separate declarant/witness names.
`documentsFurnishedList` is modeled as a single free-text field since the
source prints only the heading with blank space beneath it, with no
discrete per-document-type checkboxes (unlike, e.g., a checkbox-per-document
attachment list).

### Schedule 1(b) (page 4, general/salaried employment income)

17 fields modeled (2 header-identification repeats + 15 numbered items).
Every widget-free printed line was read directly from its row's `y`-sorted
text; no ambiguity encountered in this section — the part (b) column is a
single, unambiguous 15-line list with one amount column (unlike part (a),
which the source itself splits into separate Total/Exempted/Taxable-amount
columns for the 16 government-pay-scale line items, itself a further
disclosed reason this v1.0.0 chose the simpler, more common part (b)
pathway as its general/salaried scope).

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0/`:

- **`valid-single-salaried-resident-refund-due.json`** — a single resident
  individual filer with 720,000 taka of Schedule-1(b) salary income (600,000
  basic pay + 120,000 allowances), no other income, a computed gross tax of
  32,000 taka, no rebate, 35,000 taka already deducted at source, resulting
  in a small **excess payment / refund position** (3,000 taka).
- **`valid-married-female-benefit-tax-due.json`** — a married female
  taxpayer (the `isFemale` special-benefit checkbox ticked) with 1,600,000
  taka of Schedule-1(b) salary income (basic pay, allowances, perquisites,
  and an employer Provident Fund contribution, less an exempted amount), a
  computed gross tax of 160,000 taka, a 20,000-taka investment-tax-credit
  rebate (Schedule 5, out of scope — modeled as the pass-through
  `taxRebate` field), tax deducted at source plus advance tax plus a final
  payment with the return, resulting in an exact **balance-due-with-return**
  position (no excess payment, no further amount payable beyond what is
  paid with the return).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice) validating `required`/`requiredWhen`/
`type`/`validation.{enum,minimum,maximum,pattern,minLength,maxLength}`
directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-single-salaried-resident-refund-due.json \
    valid-married-female-benefit-tax-due.json
valid-single-salaried-resident-refund-due.json: 0 error(s)
valid-married-female-benefit-tax-due.json: 0 error(s)
```

Five mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops `taxpayerTin`
  (a static `required: true` field) from the single-filer valid fixture.
- **`mutation-control-invalid-enum-value.json`** — sets `residentialStatus`
  to `"expatriate"`, not one of the enum's two values.
- **`mutation-control-invalid-tin-pattern.json`** — sets `taxpayerTin` to a
  12-character all-letter string (`"ABCDEFGHIJKL"`), preserving length 12
  so only the `pattern` check (not `minLength`/`maxLength`) fires.
- **`mutation-control-invalid-assessment-year-pattern.json`** — sets
  `assessmentYear` to `"2026-27"` (a 2-digit trailing year, not the
  `YYYY-YYYY` pattern this field requires).
- **`mutation-control-negative-income-amount.json`** — sets
  `incomeFromEmployment` to `-5000`, violating its `minimum: 0` constraint.

This schema has no `requiredWhen` fields (every conditional relationship the
source implies — e.g. spouse fields, refund-adjustment year — lacks a
discrete boolean gate on the source itself, so each was left optional and
disclosed above rather than encoded with an invented condition), so no
`requiredWhen`-specific mutation control was needed; the five controls above
exercise every other validation-keyword class this schema uses.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-invalid-enum-value.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-assessment-year-pattern.json \
    mutation-control-negative-income-amount.json
mutation-control-missing-required-field.json: 1 error(s)
  - taxpayerTin: required but missing
mutation-control-invalid-enum-value.json: 1 error(s)
  - residentialStatus: value "expatriate" not in enum ["resident","nonResident"]
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - taxpayerTin: value "ABCDEFGHIJKL" does not match pattern ^[0-9]{12}$
mutation-control-invalid-assessment-year-pattern.json: 1 error(s)
  - assessmentYear: value "2026-27" does not match pattern ^[0-9]{4}-[0-9]{4}$
mutation-control-negative-income-amount.json: 1 error(s)
  - incomeFromEmployment: value -5000 below minimum 0
```

All five negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0/schema.json
ok   registry/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0/schema.json
ok   registry/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`node tools/verify-sources.mjs registry/bd/nbr/individual-income-tax-return-form-it-11ga/1.0.0`
was run clean immediately before opening this PR (1 directory, 4 URLs
checked, 0 warnings, 0 allowlisted). The full registry (all 392
`schema.json` documents, including this one) was also re-validated with
`tools/validate.mjs` and confirmed to pass, to check this PR did not
regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (392 entries, up from
391 before this cycle).

## Scope and jurisdiction notes

- Opens Bangladesh as this registry's **46th jurisdiction**, via its
  **Taxes vertical (1 of 6)**. `jurisdiction.level` is `national` — the
  National Board of Revenue is Bangladesh's national tax authority.
- No `edition` member: GovSchema v0.3's `edition.scheme` vocabulary is
  closed to `us-tax-year`/`gb-tax-year`/`award-year` (§5.7), none of which
  fit a Bangladesh assessment year. Consistent with
  `ke/kra/it1-individual-resident-return` and
  `th/rd/pit-90-personal-income-tax-return`'s own precedent (also annual
  returns with no `edition` member), the assessment-year identity is
  instead modeled via a plain `assessmentYear` field and disclosed in
  `source.documentRef`.
- `process.type` is `filing`; `process.language` is `en` — this specific
  PDF edition (fetched from NBR's own `/eng` forms page) is entirely in
  English; a separate Bengali-language edition of the same return also
  exists on NBR's Bengali-language portal but was not the source used here.
- `documents[]` carries the printed verification/certification statement
  (`attestation`), a salary-statement supporting-evidence requirement tied
  to the in-scope Schedule 1(b) income (`supporting-evidence`), and an
  unmodeled-companion-document disclosure for the mandatory IT-10B/IT-10BB
  statements (`supporting-evidence`, `required: false` since no boolean
  field in this schema gates its actual applicability thresholds).
- Companion-schedule/statement candidates for a future cycle, in priority
  order: Schedule 5 (Investment Tax Credit — likely the single highest-
  incidence companion for a salaried filer claiming a rebate), the IT-10B
  wealth statement and IT-10BB lifestyle-expense statement (both
  effectively mandatory per the source's own instructions), Schedule 1(a)
  (government-pay-scale employees), then Schedules 2-4 (rent, agriculture,
  business) by expected filer incidence.
- Bangladesh's other four verticals (DMV/BRTA, Business Formation,
  Passport, National ID) were screened in GOV-2591's prior cycle and found
  weak/dead-end: BRTA's vehicle-registration AcroForm fields sit over a
  scanned raster background with no OCR text layer (field labels not
  machine-extractable); Business Formation, Passport, and National ID were
  each portal-migrated or garbled-font/no-fields. This cycle did not
  re-screen those four verticals; a future cycle re-confirming them before
  writing them off entirely would be prudent, per this registry's own
  "dead-end reversals need an independent search too" lesson
  (GOV-2516/GOV-2517).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) independently confirming
Bangladesh's currently legislated personal income tax bands/thresholds
(which vary by taxpayer category and the special-benefit checkboxes this
schema models), since this schema's conformance fixtures use a plausible
application of the publicly documented tax-year 2023-24 band structure for
internal consistency only, not as an asserted-current legal figure encoded
in the schema itself; (2) Schedule 5 (Investment Tax Credit) as the
strongest companion-schedule candidate, since it has its own dedicated
carry-forward line (`taxRebate`) already modeled on the main return; (3) the
IT-10B/IT-10BB companion statements, given their near-universal mandatory
applicability per the source's own instructions; and (4) re-screening
Bangladesh's other four verticals before treating GOV-2591's prior dead-end
findings as permanent.
