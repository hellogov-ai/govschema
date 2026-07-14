# Verification record — `lt/vmi/gpm311c-individualios-veiklos-pajamos` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2982**, a child of **GOV-2976**,
deepening **Lithuania's** Taxes vertical with a companion schedule to
`lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311` (opened in GOV-2969).
This does not change Lithuania's vertical count — Taxes was already counted
✓ from the main GPM311 schema.

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i "gpm311\|lt-vmi"` and
`gh pr list --state all --search "gpm311"` before starting — no existing
`gpm311c`-prefixed branch or PR was found, so no reconciliation was needed.

## Source verification — independently re-fetched, not re-cited from GOV-2969

Although the issue brief stated no re-fetch was needed (this is page 3 of the
same PDF `lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311` already cites),
this cycle independently re-fetched and re-verified the source PDF from
scratch, as a fresh checkout, rather than trusting the prior cycle's citation:

- **PDF source:**
  `https://e-seimas.lrs.lt/rs/lasupplement/TAP/470ad611ffa511e990d5d63c859a8aa7/dce00c10228f67133748211547043f37/format/ISO_PDF/`
  — fetched via `curl -sL` with response headers captured: **HTTP/2 200**,
  **`content-type: application/pdf;charset=UTF-8`**, **681,405 bytes** (byte-identical
  to GOV-2969's own citation), **`content-disposition: attachment;
  filename="popierine_GPM311_forma_2019_10-28.pdf"`**. Computed
  **sha256 `c5fb544043e48230ab3e2ce0a41791dc8da1498bd6695d93160022f8b274ac21`**
  via `sha256sum` on the freshly downloaded file (not previously cited by
  GOV-2969's own VERIFICATION.md, which stopped at HTTP status/content-type/
  byte-count/page-count — added here as an additional integrity check).
- Independently re-extracted via `pdfjs-dist` (legacy ESM build, v6.1.200,
  the version available in this sandbox) directly from the freshly downloaded
  raw PDF bytes: `getDocument()` confirmed **9 pages**; `getAnnotations()`
  confirmed **0 Widget/AcroForm annotations on every one of the 9 pages** —
  reconfirming this is a text-layer specimen PDF, not a fillable AcroForm,
  consistent with GOV-2969's own finding.
- Page 3's text layer was extracted two ways: (1) `getTextContent()` items
  joined in natural reading order (31,008 total characters across all 9
  pages, close to but not identical to GOV-2969's own 31,594-character count
  — the difference is due to inter-item spacing choices in the join, not a
  substantive discrepancy, and was not investigated further since the actual
  page-3 content matched independently via method 2); (2) `getTextContent()`
  items with their own x/y glyph-transform coordinates preserved, grouped
  into rows by y-coordinate and sorted by x-coordinate within each row —
  necessary because the source's own multi-line, multi-column header cells
  (e.g. Section I's 9 column headers, each wrapping across 2-4 lines) do not
  reconstruct correctly from a naive left-to-right text join. This
  position-sorted extraction is what resolved the exact column structure
  modeled below.

## Field derivation and scoping

Page 3's own heading reads "Pavyzdinės pajamų mokesčio deklaracijos priedas
GPM311C — Individualios veiklos pajamos." The page carries the same
`taxYear`/`taxpayerPersonalCode` header fields repeated on every GPM311
schedule page (mirroring the main GPM311 schema's own page-1 header fields —
modeled here as this companion schema's own standalone header, since this is
a separately-versioned schema, not a shared-fields reference into the
sibling document), followed by two tables:

- **Section I. PAJAMOS (Income)** — a 6-row table, one fixed row per
  income-type code in the source's own print order: farm activity income
  (code **35**); farm-activity fixed-asset (excl. real estate)
  transfer-of-ownership income (code **97**); business-certificate income
  under activity type 051, residential-premises rental (code **90**);
  business-certificate income under any other activity type (code **92**);
  individual-activity income excluding farm activity and business-certificate
  activity (code **93**); foster-family (šeimyna) participant support income
  (code **96**). 9 columns per row, confirmed against the source's own
  column-code row (`PR_KODAS`, `SUMA_PAGR`, `SUMA_PAP`, `GPM_ISSK`,
  `GPM_KITO`, `VALST_PAJ`, `GPM_UZS`, `VR_KODAS`, `MENUO`): income type code;
  income amount (`SUMA_PAGR` — dual-labeled: the row's total income amount
  for codes 35/93/96/97, or the amount received specifically from
  individuals for codes 90/92); amount received from legal entities/trading
  individuals (`SUMA_PAP` — the source's own header text and column position
  show this applies only to the business-certificate rows, codes 90/92);
  withheld tax; tax paid using another person's funds; source
  country/territory code (footnote 1, referencing VMI's own Target
  Territories list, or code "XO" for an international organization); foreign
  tax paid; business-certificate activity type code; and month (footnote 2,
  for state social insurance/health insurance contribution purposes).
  Modeled as a bounded 6-row repeating group (`incomeRow1`..`incomeRow6`),
  matching the source's own fixed, printed row count exactly — no
  free-form/uncapped continuation row exists on this page (unlike GPM311B's
  own dynamic table), though the source's own instructional note directs a
  taxpayer needing more rows to use a further copy of this same schedule
  page ("Jei duomenys netelpa viename lape, užpildykite daugiau šio priedo
  lapų").
- **Section II. IŠLAIDOS (Expenses)** — a 5-row table (codes **35, 97, 92,
  93, 96** — code 90 has no expense row, consistent with the footnote-driven
  reclassification of certain 90/92-coded income to other schedules, see
  below), 3 columns per row confirmed against the source's own column-code
  row (`PR_KODAS`, `SUMA_PAGR`, `VR_KODAS`): related income type code,
  expense amount (footnote 3: entered net of state social insurance/health
  insurance contributions, which are instead computed on the main GPM311
  declaration), and business-certificate activity type code. This section
  is completed "only when the actual-expense deduction method is applied"
  (per the section's own subheading), as an alternative to the statutory
  expense-ratio method (which requires no supporting detail here). Modeled
  as a bounded 5-row repeating group (`expenseRow1`..`expenseRow5`), matching
  the source's own fixed, printed row count.
- Both tables use this registry's established bounded-repeating-group
  convention (numbered field-name suffixes, e.g. `incomeRow1TypeCode`,
  `incomeRow2TypeCode`, ...), since GovSchema v0.3 has no array/repeating-
  element type — the same convention already used by the sibling GPM311
  schema's own `employmentIncome1`..`3` fields (GOV-2969) and this
  registry's other bounded-row precedents (Greece Ε2's `property1`..`10`,
  GOV-2644).
- **Type-code fields modeled as single-value enums, not free strings**:
  because each of the 11 total rows (6 income + 5 expense) is pre-printed on
  the source with one specific, fixed income-type code, `incomeRowNTypeCode`/
  `expenseRowNTypeCode` are each modeled as an `enum` restricted to that
  row's own single applicable code (e.g. `incomeRow1TypeCode`'s enum is
  `["35-farm-activity-income"]` only) — this still models the source's own
  real `PR_KODAS`/column faithfully while capturing that a filer cannot
  legitimately enter a different code into a pre-labeled row.

## Scope decisions

- **`incomeRowNAmountFromTradeEntities` (`SUMA_PAP`) and
  `incomeRowNBusinessCertificateActivityCode` (`VR_KODAS`) modeled on every
  income row, not only rows 3/4**: the source's own printed grid presents
  all 9 columns uniformly across all 6 rows (a genuine rectangular table),
  so these two columns are modeled on every row for structural fidelity to
  the source, each with a `description` disclosing that they are only
  meaningfully populated for the business-certificate rows (codes 90/92,
  i.e. `incomeRow3`/`incomeRow4`) — the same "structurally uniform, only
  conditionally meaningful" pattern already used by this registry for
  Greece Ε2's `propertyNLeaseTypeAndUse` column disclosures.
- **`expenseRowNBusinessCertificateActivityCode` similarly modeled on every
  expense row**, with a per-row `description` noting that only the code-92
  expense row (`expenseRow3`) genuinely uses this column, since only code 92
  among Section II's 5 rows is business-certificate income.
- **No `requiredWhen` gates added between `incomeRowNTypeCode` and the
  row's other 8 fields, or between `expenseRowNTypeCode` and its other 2
  fields**: every field in both tables is optional, since GPM311C itself is
  only attached when the main GPM311 declaration's own
  `receivedIndividualActivityIncome` gate is true (a cross-schema condition
  out of this companion schema's own scope, already modeled on the sibling
  GPM311 schema), and even then a taxpayer only fills the specific row(s)
  matching income actually received that year — mirroring GPM311B's own
  established convention of leaving every `employmentIncomeN*` field
  optional.
- **Amounts modeled `number` (not `integer`)**: the source's own page-3
  header states "Visos sumos įrašomos eurais ir centais" (All amounts are
  entered in euros and cents), matching the sibling GPM311 schema's own
  amount-field convention.
- **`incomeRowNMonth` modeled `integer` with `minimum: 1`/`maximum: 12`**:
  the source's own footnote (2) describes this as a calendar month number
  (1-12) used for SODRA/health-insurance apportionment purposes.
- **`incomeRowNSourceCountryCode`/`expenseRowNBusinessCertificateActivityCode`/
  `incomeRowNBusinessCertificateActivityCode` modeled `string`, not
  `enum`**: the source references external, separately maintained code lists
  (VMI's own Target Territories list; VMI's own business-certificate
  activity-type code list) that are not reproduced on this page, so no
  closed enum is invented — consistent with the sibling GPM311 schema's own
  `employmentIncomeNSourceCountryCode` precedent.
- **Two "!" footnote-adjacent reclassification notes read but not
  modeled as fields**: the source states that (1) code-90 income received
  from a legal entity, or received outside the stated territorial limits,
  is not treated as business-certificate income and must instead be
  declared on Form GPM311D2 under income-type code 23; and (2) certain
  other business-certificate income received from a legal entity under
  matching-activity or excess-scope conditions is reclassified onto this
  same schedule's own code-93 row. Both are disclosed here as taxpayer-facing
  classification rules, not encoded as schema constraints, since doing so
  would require modeling a full activity/counterparty eligibility test out
  of scope for this v1.0.0.
- **Classification**: `taxpayerPersonalCode` is tagged `sensitive-pii`,
  matching the sibling GPM311 schema's own convention for the same field.
  Plain code/amount/date fields are left unclassified.

## Other schedules noticed in the same source PDF (future candidates, not modeled)

Per this cycle's own issue brief, the same 9-page annex additionally contains
(not modeled in this v1.0.0, left as disclosed backlog for a future
companion-schema cycle):

- **GPM311D1** (page 4) — property/registrable-movable-asset transfer income
  and acquisition cost.
- **GPM311F1** (page 7, per GOV-2969's own page-order finding) — other
  income, including dividends, sole-proprietor profit, board fees,
  athlete/performer income, royalties, and honoraria.
- The sibling GPM311 schema's own `nextReviewBy` note additionally lists
  GPM311D2, GPM311E, and GPM311G as further un-modeled schedules from the
  same combined source.

## Conformance run

Two hand-authored valid fixtures under
`conformance/lt/vmi/gpm311c-individualios-veiklos-pajamos/1.0.0/`:

- **`valid-farm-income-actual-expense-method.json`** — farm activity income
  (code 35) reported with a withheld-tax amount and month, alongside a
  matching Section II expense-row entry — exercises the actual-expense
  deduction pathway (Section II populated) together with a single-code-35
  Section I row.
- **`valid-business-certificate-rental-and-trade-income.json`** — two
  business-certificate income rows (codes 90 and 92) exercising the
  `incomeRowNAmountFromTradeEntities`/`incomeRowNBusinessCertificateActivityCode`
  fields together with a foreign-sourced amount (`SourceCountryCode`/
  `ForeignTaxPaid`) on the code-92 row — no Section II rows populated,
  exercising the statutory expense-ratio (no-expense-detail) pathway.

Ten mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops
  `taxpayerPersonalCode` (static `required: true`).
- **`mutation-control-invalid-minimum-tax-year.json`** — sets `taxYear` to
  `2015`, below `validation.minimum: 2019`.
- **`mutation-control-invalid-enum-value.json`** — sets `incomeRow1TypeCode`
  to `"96-family-carer-support-income"`, not in that row's own
  single-value enum (`["35-farm-activity-income"]`).
- **`mutation-control-invalid-type-income-amount.json`** — sets
  `incomeRow1Amount` to the string `"twelve-thousand"` instead of a number.
- **`mutation-control-value-below-minimum.json`** — sets `incomeRow1Amount`
  to `-500`, below `validation.minimum: 0`.
- **`mutation-control-month-below-minimum.json`** — sets `incomeRow1Month`
  to `0`, below `validation.minimum: 1`.
- **`mutation-control-month-above-maximum.json`** — sets `incomeRow1Month`
  to `13`, above `validation.maximum: 12`.
- **`mutation-control-invalid-expense-enum-value.json`** — sets
  `expenseRow1TypeCode` to `"97-farm-fixed-asset-transfer-income"`, not in
  that row's own single-value enum (`["35-farm-activity-income"]`).
- **`mutation-control-expense-amount-below-minimum.json`** — sets
  `expenseRow1Amount` to `-100`, below `validation.minimum: 0`.
- **`mutation-control-trade-entities-amount-below-minimum.json`** — sets
  `incomeRow4AmountFromTradeEntities` to `-50`, below
  `validation.minimum: 0`.

All twelve fixtures were checked with a from-scratch Node conformance
checker (`/tmp/gov2982/gen/validate_conformance.mjs`, not committed — a
disposable script run from an isolated scratch directory, per this
registry's own established practice since no committed conformance-fixture
validator exists) implementing this schema's own `required`/`requiredWhen`/
`type`/`validation.enum`/`validation.minimum`/`validation.maximum` grammar
directly:

```
$ node /tmp/gov2982/gen/validate_conformance.mjs registry/lt/vmi/gpm311c-individualios-veiklos-pajamos/1.0.0/schema.json conformance/lt/vmi/gpm311c-individualios-veiklos-pajamos/1.0.0
OK   mutation-control-expense-amount-below-minimum.json errors=["expenseRow1Amount: value -100 below minimum 0"]
OK   mutation-control-invalid-enum-value.json errors=["incomeRow1TypeCode: value \"96-family-carer-support-income\" not in enum [\"35-farm-activity-income\"]"]
OK   mutation-control-invalid-expense-enum-value.json errors=["expenseRow1TypeCode: value \"97-farm-fixed-asset-transfer-income\" not in enum [\"35-farm-activity-income\"]"]
OK   mutation-control-invalid-minimum-tax-year.json errors=["taxYear: value 2015 below minimum 2019"]
OK   mutation-control-invalid-type-income-amount.json errors=["incomeRow1Amount: expected type number, got string (\"twelve-thousand\")"]
OK   mutation-control-missing-required-field.json errors=["taxpayerPersonalCode: required but missing"]
OK   mutation-control-month-above-maximum.json errors=["incomeRow1Month: value 13 above maximum 12"]
OK   mutation-control-month-below-minimum.json errors=["incomeRow1Month: value 0 below minimum 1"]
OK   mutation-control-trade-entities-amount-below-minimum.json errors=["incomeRow4AmountFromTradeEntities: value -50 below minimum 0"]
OK   mutation-control-value-below-minimum.json errors=["incomeRow1Amount: value -500 below minimum 0"]
OK   valid-business-certificate-rental-and-trade-income.json errors=[]
OK   valid-farm-income-actual-expense-method.json errors=[]
```

All ten negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
448/448 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
448/448 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

(Prior to this cycle the registry stood at 445/445; +3 for this schema's own
`schema.json` and `VERIFICATION.md` plus the regenerated `registry-index.json`.)

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- This schema **does not change Lithuania's vertical count** — Taxes was
  already counted ✓ for Lithuania from the sibling GPM311 schema (GOV-2969).
  This is a companion-schema deepening within an already-open vertical, per
  this registry's established convention for Romania's Declarația Unică and
  Greece's Ε1/Ε2/Ε3 multi-schedule filings.
- `jurisdiction.level` is `national` — VMI is Lithuania's national tax
  authority, same as the sibling schema.
- `process.type` is `filing`; `process.language` is `lt` — both match the
  sibling schema.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months), matching the sibling GPM311 schema's own cadence. A future review
should prioritize: (1) confirming whether a later VMI order has superseded
Order No. VA-93's GPM311 annex (and, with it, this GPM311C schedule) for a
more recent tax year; (2) authoring GPM311D1 or GPM311F1 as the next
companion schedule from the same combined source PDF (see "Other schedules
noticed" above); (3) the sibling schema's own remaining re-verification
priorities (Slovakia's `financnasprava.sk` outage re-check;
`registrucentras.lt`'s WAF gate).
