# Verification record — `gh/gra/personal-income-tax-return-dt-0103` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2697**. Ghana was opened as
this registry's **41st jurisdiction** via GOV-2510 (National ID vertical,
`gh/nia/ghana-card-application-form-1a`). This cycle opens Ghana's **Taxes
vertical**, via the Ghana Revenue Authority's (GRA) DT 0103 "Personal Income
Tax Return" (ver. 1.1).

## Source verification (independently re-derived, not copied from the task)

- Located this cycle via a fresh fetch of GRA's own public forms library,
  `https://gra.gov.gh/forms/` (HTTP 200), which links the current form as
  `DT_0103_personal_income_tax_return_form_v103-ver-1.1..-1.pdf`. This
  resolved to the same URL the task description's scouting-pass note cited —
  independently re-confirmed via the forms-index page itself, not assumed —
  and also independently reconfirmed the byte size/hash the task description
  did **not** itself assert (the task's own instructions explicitly asked for
  a fresh re-derivation, not a copy).
- **URL:**
  `https://gra.gov.gh/wp-content/uploads/2020/09/DT_0103_personal_income_tax_return_form_v103-ver-1.1..-1.pdf`
- Fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 461527`
    bytes, `Last-Modified: Sat, 17 Apr 2021 20:08:10 GMT`.
  - **`sha256`:**
    `b394df0bf108c710f6d681c3b261a8af11af35623c56436fb9e77b75c91c8359`
    (computed independently via `sha256sum` on the freshly-downloaded file).
  - A companion `.docx` edition is also linked from the same forms-index
    entry (`...v103-ver-1.1..-1-word.docx`); the PDF was treated as canonical
    per this registry's usual practice of sourcing from the PDF specimen.
- Parsed with `pdfjs-dist@3` (legacy build), installed in a scratch
  directory (not a repo dependency), following this registry's established
  PDF-extraction practice:
  - `getAnnotations({intent:'display'})` filtered to `subtype === 'Widget'`
    confirmed **4 pages**, **0 AcroForm widgets on every page** — a printed,
    text-layer-only form (as the task description anticipated), not a
    fillable AcroForm.
  - Every field below was instead extracted by reading `getTextContent()`'s
    position-sorted text rows (grouped by rounded `y`, sorted by `x` within
    each row) directly.
  - Two apparent **numbering gaps** were found in the printed text and
    independently confirmed as genuine source artifacts (not extraction
    bugs) by rendering both pages to PNG via `pdfjs-dist` + `canvas` and
    visually inspecting the printed item labels:
    - Page 2's Employment Income items jump directly from `"v. Total
      Benefits in kind..."` to `"vii. Others (e.g. Director's Fees)"`, with
      no `"vi."` item printed anywhere on the page. The page's own `TOTAL
      EMPLOYMENT INCOME` line still reads `"(Sum i to vi)"` despite the last
      printed item being labelled `vii.`
    - Page 3's Reliefs items jump directly from `"viii. Voluntary Pension
      contribution..."` to `"x. Other allowable deductions"`, with no
      `"ix."` item printed. The page's own `K. Total allowable
      deductions/reliefs` line still reads `"(Sum of i to ix)"`.
    - Both are modeled faithfully as printed (`employmentOtherIncome`
      labelled `vii.`, `reliefOtherAllowableDeductions` labelled `x.`), with
      each anomaly disclosed in both the field `description` and this file,
      rather than silently renumbered or treated as an extraction defect.

## Field-by-field inventory and disclosed judgment calls

### Page 1 (current tax office, personal/business/employment information)

- **`currentTaxOfficeLto`/`currentTaxOfficeMto`/`currentTaxOfficeSto`**: the
  source prints `"CURRENT TAX OFFICE"` with a `"(Tick One)"` instruction over
  three office-type labels (LTO/MTO/STO — Large/Medium/Small Taxpayer
  Office). Modeled as three mutually-exclusive booleans plus an
  `exclusivityGroups` entry enforcing "at most one true"; the "(Tick One)"
  instruction's "exactly one" half is disclosed here in prose, consistent
  with this registry's usual `exclusivityGroups` convention (only the
  "at most one" half is machine-enforceable per SPEC §8.4).
- **`assessmentYear`**: printed as `"YEAR OF ASSESSMENT (yyyy)"` — a plain
  4-digit calendar year, unlike some other jurisdictions' `YYYY-YYYY`
  assessment-year ranges (e.g. Bangladesh's `bd/nbr` schema); modeled with a
  `^[0-9]{4}$` pattern to match this form's own printed format guide exactly.
- **`returnPeriodFrom`/`returnPeriodTo`**: printed as `"PERIOD: FROM (dd /
  mm)"` / `"TO (dd / mm)"` — day/month only, with no year segment on the
  form itself. Modeled as plain strings with a `^[0-9]{2}/[0-9]{2}$` pattern
  (not `type: date`, which GovSchema v0.3 requires to be a full
  `YYYY-MM-DD`) — a disclosed judgment call, since the source's own printed
  format guide omits the year.
- **`taxpayerTin`**: the single highest-materiality judgment call on this
  schema. Since **1 April 2021**, GRA no longer issues a separate individual
  TIN: an individual's **Ghana Card Personal Identification Number (Ghana
  Card PIN)** is used as their TIN instead, per GRA's own published policy
  page (`gra.gov.gh/commencement-of-the-use-of-ghana-card-personal-identification-number-as-taxpayer-identification-number/`)
  and reconfirmed via GRA's own TIN FAQ page and a public 2026 GRA social
  post: *"Since the introduction of the Ghana Card, GRA no longer uses the
  old TIN...for individuals. Your Ghana Card PIN...is Your Personal Tin."*
  The Ghana Card PIN's own published structure is a country code
  (`"GHA"`) followed by an 8- or 9-digit system-generated number and a
  1-character checksum, hyphen-separated (e.g. `"GHA-123456789-0"`) — public
  sources are not fully consistent on 8 vs. 9 digits for the middle segment,
  so `taxpayerTin`'s pattern (`^GHA-[0-9]{8,9}-[0-9A-Z]$`) accepts either
  length rather than asserting false precision. This form's own printed TIN
  blank (last modified 2021-04, coinciding with but not necessarily
  reflecting the changeover) carries **no digit-count guide of its own** —
  the pattern is a disclosed judgment call resolving an external, official
  numbering-scheme fact not itself printed on this specific PDF's blank-line
  layout, the same category of judgment call `bd/nbr`'s own e-TIN pattern
  made.
- **`landlordTin`/`employerTin`**: the source gives no format guide for
  either, and unlike `taxpayerTin` (necessarily an individual, since this is
  the *individual* return), a landlord or employer may be an individual
  (Ghana Card PIN format) **or** a corporate entity (GRA's own legacy
  business-TIN format, which was not superseded by the PIN changeover — GRA
  states businesses "may still register for and use the Corporate TIN").
  No single pattern is asserted for either field — a disclosed
  non-assertion, not an oversight.
- **`businessTenancyStatusRented`/`businessTenancyStatusOwned`**: two
  mutually-exclusive checkboxes (`exclusivityGroups`), gating
  `landlordName`/`landlordTelephoneNumbers`/`landlordTin` via `requiredWhen`
  on `businessTenancyStatusRented === true` — the source's own printed
  instruction, `"(If rented provide particulars of Landlord)"`, is a
  genuine boolean-gated relationship, unlike several other disclosed
  optional-only fields below.
- **`businessDigitalAddress`/`businessName`/`businessActivity`,
  `employerTin`/`employerName`/`employerAddress`**: each applicable only if
  the filer has business or employment income respectively. The source's
  own instructional cues (`"Do you earn income from business?"`, `"If
  employed..."`) are prose guidance printed inline with the section
  headings, not discrete boolean widgets — left optional with no
  `requiredWhen`, consistent with this registry's practice of not inventing
  a gate the source itself does not present as a distinct field.

### Page 2 (Sources of Income)

19 fields across Business/Employment/Investment/Total Income. The source's
own instructional cues (`"Do you earn income from business? If No proceed to
B"`, `"Do you earn income from employment? If No proceed to C"`, `"Do you
[have] any investment income? If No proceed to D"`) are printed prose
navigation aids, not discrete boolean widgets — none of the three are
modeled as fields, and the income-category line items beneath each are left
optional (0/absent when not applicable) rather than gated by an invented
condition, the same pattern `bd/nbr` and `th/rd/pit-90` both used for their
own unmodeled income-category gates.

**Disclosed numbering gap #1** (`employmentOtherIncome`/
`totalEmploymentIncome`): see "Source verification" above.

### Page 3-4 (Tax Computation and Declaration)

24 + 14 fields. Two disclosed non-computations, matching this registry's
established pattern (`bd/nbr`'s own `grossTaxOnTaxableIncome` disclosure):

- **`taxCharged`** (5M) is computed per Ghana's statutory progressive
  personal-income-tax bands (the current rate table GRA publishes). This
  schema does not itself assert or embed that band table — the field is
  modeled because the source itself presents it as a line the filer/
  preparer completes, not because this schema computes it. The conformance
  fixtures below use figures chosen for internal fixture consistency only,
  not as an asserted-current legal figure.
- **Disclosed numbering gap #2** (`reliefOtherAllowableDeductions`/
  `totalAllowableDeductionsReliefs`): see "Source verification" above.

**Disclosed judgment call on the two-path DECLARATION** (page 4): the source
prints two full declaration paragraphs, `(a)` "For persons making return on
their own behalf" and `(b)` "For persons making return on behalf of another
person", with no discrete boolean widget selecting between them (unlike, for
example, the exclusivityGroups-eligible checkboxes elsewhere on this form).
Both paths' name/date/relationship fields are modeled as optional (not
`requiredWhen`-gated on each other), since encoding a gate would require
inventing a condition the source does not present as a distinct field —
disclosed rather than silently modeled, the same pattern this registry used
for `bd/nbr`'s own declarant/father-husband ambiguity.

**Disclosed judgment call on `preparerRtpDetails`**: path (a)'s own layout
prints `"Signature ... OR"` on one row and `"Date ... R.T.P"` on the row
below, with no further discrete sub-fields — read here as an alternative
signing path where a Registered Tax Practitioner (R.T.P.) signs in place of
the taxpayer. Modeled as a single free-text field for the R.T.P.'s
identifying/registration details, since the source's own layout presents no
more granular structure to model against.

**Excluded, consistent with this registry's general practice**: the raw
signature-mark widgets under both declaration paths (physical signature
lines, not data fields) are not modeled, the same exclusion this registry
applied to `gh/nia/ghana-card-application-form-1a`'s own signature/
thumbprint capture widget.

## Conformance run

Two hand-authored valid fixtures under
`conformance/gh/gra/personal-income-tax-return-dt-0103/1.0.0/`:

- **`valid-employed-salaried-tax-due.json`** — a single salaried employee
  (STO tax office), GHS 85,000 of employment income (including benefit-in-
  kind) plus GHS 1,000 of investment interest income, a GHS 3,000 Social
  Security relief, resulting in a **tax-due position** (GHS 9,000 payable,
  no payments made).
- **`valid-business-owner-rented-premises-refund-due.json`** — a business
  owner renting her business premises (exercising the `landlordName`/
  `landlordTelephoneNumbers`/`landlordTin` `requiredWhen` gate), filing via
  declaration path (b) (a tax consultant filing on her behalf), with
  business + investment income, add-backs/deductions, and a Children's
  Education relief, resulting in an **overpaid/refund position**
  (`taxPayableOrOverpaid` = **-1,000**, since GHS 6,000 of payments exceed
  the GHS 5,000 tax charged).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice) validating `required`/`requiredWhen`/
`type`/`validation.{pattern,minimum,maximum,minLength,maxLength,enum}` and
`exclusivityGroups` directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-employed-salaried-tax-due.json \
    valid-business-owner-rented-premises-refund-due.json
valid-employed-salaried-tax-due.json: 0 error(s)
valid-business-owner-rented-premises-refund-due.json: 0 error(s)
```

Seven mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops `taxpayerTin`
  (a static `required: true` field) from the salaried-employee valid
  fixture.
- **`mutation-control-invalid-tin-pattern.json`** — sets `taxpayerTin` to
  `"XYZ-123456789-0"` (wrong country-code prefix, same overall shape).
- **`mutation-control-invalid-assessment-year-pattern.json`** — sets
  `assessmentYear` to `"25"` (2 digits, not the 4-digit pattern).
- **`mutation-control-invalid-period-pattern.json`** — sets
  `returnPeriodFrom` to `"1/1"` (single-digit day/month, not the 2-digit
  `dd/mm` pattern).
- **`mutation-control-negative-income-amount.json`** — sets
  `salaryBasicPay` to `-5000`, violating its `minimum: 0` constraint.
- **`mutation-control-exclusivity-violation.json`** — sets both
  `currentTaxOfficeMto` and `currentTaxOfficeSto` to `true` on the
  salaried-employee fixture (which already has `currentTaxOfficeSto: true`),
  violating the `current_tax_office` `exclusivityGroups` entry.
- **`mutation-control-missing-requiredwhen-landlord.json`** — drops
  `landlordName` from the business-owner fixture while
  `businessTenancyStatusRented` remains `true`, violating the `requiredWhen`
  gate.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-assessment-year-pattern.json \
    mutation-control-invalid-period-pattern.json \
    mutation-control-negative-income-amount.json \
    mutation-control-exclusivity-violation.json \
    mutation-control-missing-requiredwhen-landlord.json
mutation-control-missing-required-field.json: 1 error(s)
  - taxpayerTin: required but missing
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - taxpayerTin: value "XYZ-123456789-0" does not match pattern ^GHA-[0-9]{8,9}-[0-9A-Z]$
mutation-control-invalid-assessment-year-pattern.json: 1 error(s)
  - assessmentYear: value "25" does not match pattern ^[0-9]{4}$
mutation-control-invalid-period-pattern.json: 1 error(s)
  - returnPeriodFrom: value "1/1" does not match pattern ^[0-9]{2}/[0-9]{2}$
mutation-control-negative-income-amount.json: 1 error(s)
  - salaryBasicPay: value -5000 below minimum 0
mutation-control-exclusivity-violation.json: 1 error(s)
  - exclusivityGroups[current_tax_office]: 2 fields set true, at most 1 allowed (currentTaxOfficeMto, currentTaxOfficeSto)
mutation-control-missing-requiredwhen-landlord.json: 1 error(s)
  - landlordName: required but missing
```

All seven negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
ok   registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
ok   registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`node tools/verify-sources.mjs registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0`
was run clean immediately before opening this PR (1 directory, 3 URLs
checked, 0 warnings, 0 allowlisted). The full registry (all 404
`schema.json` documents, including this one) was also re-validated with
`tools/validate.mjs` and `tools/validate-ajv.mjs` and confirmed to pass, to
check this PR did not regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (404 entries, up from
403 before this cycle) and diffed to confirm only this new entry was added.

## Scope and jurisdiction notes

- Opens Ghana's **Taxes vertical**. `jurisdiction.level` is `national` — the
  Ghana Revenue Authority is Ghana's national tax authority.
- No `edition` member: GovSchema v0.3's `edition.scheme` vocabulary is
  closed to `us-tax-year`/`gb-tax-year`/`award-year` (§5.7), none of which
  fit Ghana's plain calendar-year assessment year. Consistent with
  `bd/nbr/individual-income-tax-return-form-it-11ga` and
  `th/rd/pit-90-personal-income-tax-return`'s own precedent, the
  assessment-year identity is instead modeled via the plain `assessmentYear`
  field and disclosed in `source.documentRef`.
- `process.type` is `filing`; `process.language` is `en` — the source PDF is
  entirely in English.
- `documents[]` carries the printed declaration/certification statement
  (`attestation`, shared by both declaration paths) and a supporting-evidence
  requirement for the financial statement backing `netBusinessIncomeOrLoss`.
- Ghana's other four verticals: **DMV was confirmed a dead end this cycle**
  — the Driver and Vehicle Licensing Authority's (DVLA) rebuilt site removed
  its old form PDFs (re-screened independently this cycle, not assumed from
  a prior note). **Passport, Business Formation, and Visa** are being
  scouted/authored in parallel by sibling issues GOV-2696/GOV-2698 and were
  **not** touched by this schema — this cycle does not claim to have closed
  or opened either of those verticals.
- No duplicate-concurrent-run PR was found for this same GRA form at the
  time of authoring (`gh pr list` on `hellogov-ai/govschema` for open PRs
  matching "GRA"/"2697"/"Ghana"/"DT 0103" returned no results).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) independently confirming
Ghana's currently legislated personal income tax bands/thresholds (which the
`taxCharged` field's conformance fixtures use a plausible figure for,
internal consistency only, not an asserted-current legal figure); (2)
re-confirming the Ghana Card PIN's exact digit count (8 vs. 9) for the
`taxpayerTin` pattern, since public sources were not fully consistent this
cycle; (3) re-screening Ghana's DMV vertical before treating this cycle's
dead-end finding as permanent, per this registry's own "dead-end reversals
need an independent search too" lesson; and (4) checking in on the sibling
GOV-2696/GOV-2698 Passport/Business-Formation/Visa cycles' outcomes.
