# Verification record — `in/incometax/individual-tax-return-itr4-sugam` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this cycle picked up ITR-4 SUGAM

This is a direct follow-up to [GOV-1224](/GOV/issues/GOV-1224)'s research,
tracked as [GOV-1229](/GOV/issues/GOV-1229). GOV-1224 found that
`in/incometax/individual-tax-return-itr1-sahaj` (GOV-900) only covers
ITR-1 SAHAJ filers (salary/pension, no business income), leaving ITR-2, ITR-3,
and ITR-4 as an open gap for India's Taxes vertical. ITR-4 (SUGAM) was picked
first of that set because it is closest in filer profile and form shape to
ITR-1 — both are simplified, single-schedule returns for filers under the
Rs. 50 lakh total-income ceiling — giving the highest reuse of ITR-1's
already-published general-information, deduction, taxes-paid, bank-details,
and verification scaffolding. ITR-2 (capital gains/foreign assets, no
business income) and ITR-3 (business/professional income with full books of
account — the most complex of the three) remain candidate for future cycles.

## Sources examined

- **Document `(id, version)`:** `in/incometax/individual-tax-return-itr4-sugam` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Income Tax Department, Government of India; the ITR forms
  themselves are notified annually by the Central Board of Direct Taxes
  (CBDT) under the Income-tax Rules, 1962.
- **Primary source (field-by-field detail):** the ITR-4 SUGAM **Excel
  utility for Assessment Year 2026-27, version 1.1**
  (`ITR4_AY_26-27_V1.1.zip` → `ITR4_AY_26-27_V1.1.xlsm`), fetched directly
  from the e-Filing portal's own Downloads page
  (<https://www.incometax.gov.in/iec/foportal/downloads>) at
  <https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-07/ITR4_AY_26-27_V1.1.zip>
  — **HTTP 200, no access block**, byte size (4.99 MB) matching the size the
  Downloads page itself advertises (4.76 MB, consistent within rounding).
  This is the same channel (incometax.gov.in, not the WAF-blocked
  incometaxindia.gov.in gazette host) already used and recorded for
  `in/incometax/individual-tax-return-itr1-sahaj`.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Extraction technique: OOXML zip/XML parsing, with a self-closing-cell fix

The `.xlsm` is a standard OOXML zip archive (24 worksheets — more than
ITR-1's 21 — including `Income Details`, `HP`, `44AE`, `Part A Gen_139(8A)`,
`Schedule EA 10(13A)`, `Schedule 24(b)`, `BP`, `TDS`, `TCS`, `IT`,
`Part B ATI`, `Taxes Paid and Verification`, `80D`, `80G`, `80DD_80U`,
`80GGC`, `80E_80EE_80EEA_80EEB`, `80C`, `AL`, `SUMMARY`, `Help`, `DB`,
`TaxCalc`). It was extracted with Python's `zipfile` module and its
`xl/sharedStrings.xml` (143,701 shared strings — far larger than ITR-1's,
reflecting a bigger dropdown/validation surface) and `xl/worksheets/sheetN.xml`
files parsed directly as XML, keyed by cell reference and sheet name
(`xl/workbook.xml`/`xl/_rels/workbook.xml.rels` map each sheet to its file).

A real extraction bug surfaced and was fixed during this cycle: the initial
cell regex (`<c r="X"[^>]*>(.*?)</c>`) does not match Excel's **self-closing
empty-cell** form (`<c r="E1" s="70"/>`), which this workbook uses heavily.
Non-greedy matching then skipped forward past runs of self-closing cells to
the next real `</c>`, silently misattributing later cells' content to
earlier, unrelated cell references (e.g. a cell reported as holding
`'142294'` was actually empty; the real content belonged to a cell dozens of
positions later). The regex was corrected to
`<c r="X"([^>]*?)(?:/>|>(.*?)</c>)`, matching the self-closing and
content-bearing forms as distinct alternatives, and every cell reference used
in this document's `sourceRef`s was re-extracted with the corrected script
and spot-checked against the sheet's own printed row/column layout. This
generalizes beyond this one workbook: any future OOXML cell-scraping in this
registry should use an alternation-based regex (or a real XML parser), not a
single non-greedy `<c>...</c>` pattern, whenever the sheet may contain blank
(self-closing) cells.

## Scope decisions (what is modelled vs. deferred)

ITR-4 reuses ITR-1's general-information, Chapter VI-A deduction,
taxes-paid, bank-details, and verification/TRP scaffolding directly (adjusted
for this utility's own cell references), and adds the fields that
distinguish it from ITR-1:

- **Modelled in full:** filer type (individual/HUF/firm) and the extended
  representative-assessee questions (capacity, address, PAN, Aadhaar) that
  ITR-1 does not ask; presumptive business income under section 44AD
  (turnover split and declared profit), presumptive professional income
  under section 44ADA (receipts split and declared profit), and presumptive
  goods-carriage income under section 44AE (aggregate, gated on a 1-10
  vehicle count per the section's own eligibility ceiling); the
  "Financial Particulars of the Business" simplified balance sheet (Schedule
  BP lines E11-E16, E18-E24) that presumptive filers must report in place of
  full books of account, with the form's own five mandatory lines (sundry
  creditors, inventories, sundry debtors, balance with banks, cash-in-hand)
  marked `requiredWhen` the presumptive-income step applies; section 112A
  long-term-capital-gains reporting (sale consideration, cost of
  acquisition) — the narrow allowance (up to Rs. 1.25 lakh, not chargeable)
  that distinguishes ITR-4 from ITR-1, which permits no capital gains at
  all; and the two royalty deductions (80QQB, 80RRB) not present on ITR-1,
  relevant to ITR-4's professional (44ADA) filers.
- **Deferred (out of scope), and why:** consistent with this registry's
  existing main-form/schedule-detail precedent (see
  `in/incometax/individual-tax-return-itr1-sahaj` VERIFICATION.md), the
  following per-item schedule detail behind this document's aggregate
  fields is out of scope: Schedule BP's own up-to-three business-activity
  breakdown (only a single aggregate `natureOfBusinessOrProfession`/
  `businessOrProfessionCode` pair is modelled); Schedule 44AE's ten-row
  per-vehicle table (registration number, ownership type, tonnage, holding
  period per vehicle — only the aggregate
  `totalPresumptiveIncomeGoodsCarriage44AE` is modelled, alongside the
  vehicle *count*, which the section's own 10-vehicle eligibility ceiling
  makes a genuine eligibility fact rather than schedule sub-detail); the
  GST turnover-reconciliation schedule (multiple GSTINs, each with its own
  outward-supply value); the TDS1/TDS2(i)/TDS2(ii)/TCS/advance-tax
  schedules' own per-employer/per-deductor/per-challan rows (same reasoning
  and precedent as ITR-1); Schedule HP's co-owner/tenant/section-24(b)
  loan-by-loan sub-detail (only the aggregate interest-on-borrowed-capital
  line per property is modelled, as in ITR-1); the 80D/80DD/80DDB/80G/80GGA
  sub-schedules' own donee-by-donee or dependent-by-dependent breakdown
  (aggregate only, as in ITR-1); the dividend income's own quarterly
  (advance-tax-interest) breakdown; and the **Part A Gen_139(8A)** sheet
  (the section 139(8A) *updated-return* "ITR-U" computation block) and the
  full multi-year Form 10-IEA regime-history sub-schedule (A23(A)/A23(B)
  branching across prior assessment years) — both deferred the same way
  ITR-1 deferred its Part B-ATI sheet, as a materially different filing
  posture from a normal original/revised/belated return. This document
  models only the current-year regime election (`optsOutOfNewTaxRegime115BAC6`)
  and its immediate Form 10-IEA filing date/acknowledgement number, not the
  historical audit trail of prior opt-ins/opt-outs.
- **Not independently confirmed:** system-computed fields (annual value,
  presumptive-income totals E6/E7/E8 derived from E2/E4/E5, gross total
  income, tax payable, cess, rebate, interest under sections
  234A/234B/234C/234F, the E17/E25 balance-sheet totals, amount
  payable/refund) are intentionally **not** modelled as input fields — they
  are the e-Filing portal's own computed outputs, the same "don't model
  what the source computes for the filer" principle already applied to
  every prior tax-return schema in this registry, including ITR-1.
  `presumptiveIncome44AD` and `presumptiveIncomeProfession44ADA` **are**
  modelled as inputs (not purely computed), because the form's own text —
  "6% of E1a ... or the amount claimed to have been earned, **whichever is
  higher**" — makes the declared profit a genuine taxpayer input that may
  exceed the statutory minimum, not a pure formula output.
- **Not machine-enforced (documented only):** ITR-4's own eligibility
  requires at least one of section 44AD/44ADA/44AE presumptive income to
  apply (per the form's title-cell eligibility text); this document does not
  encode that as a `crossFieldValidation` rule, since GSP-0013's
  `requirePresent`/`requireAbsent` grammar is built around field
  *absence*, not "at least one of several booleans is `true`" — the same
  category of not-fully-machine-enforced business rule already accepted
  elsewhere in this registry (e.g. ITR-1's percentage-based presumptive
  minimums are not re-derived either).
- **No live e-Filing portal walkthrough.** Filing ITR-4 online requires a
  PAN-linked, OTP/Aadhaar-authenticated e-Filing account not available in
  this environment, so the field-by-field comparison the practice requires
  against the live online screens has not been completed.

## Mock-data test run

Two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`enum`/
`pattern`/`minimum`/`maximum` constraint in `schema.json`, using a one-off
Python condition evaluator (not committed to the repo) implementing the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `Condition` schema (spec v0.3 §8.1), extended from the evaluator
used for `in/incometax/individual-tax-return-itr1-sahaj`.

**Scenario 1 — Individual retail-trade filer under section 44AD, plus
salary and a self-occupied house:** Ravi Kumar, a Pune-based individual with
Rs. 18 lakh retail turnover (mostly banking-channel receipts) declaring
Rs. 1.1 lakh presumptive profit under section 44AD, plus salary income and
one self-occupied house property, filing an original return in the new tax
regime.

**Scenario 2 — Firm operating goods carriages under section 44AE, old tax
regime via Form 10-IEA, revised return filed by a representative partner:**
Shree Transport Services, a Nagpur-based firm (other than an LLP) with 5
goods carriages declaring Rs. 4.5 lakh presumptive income under section
44AE, salary/interest paid to partners, having opted out of the new regime
via Form 10-IEA, filing a section 139(5) revised return through a
representative partner.

Both runs:

```
PASS — Scenario 1 - Individual, 44AD business + salary, new regime, self-occupied house property satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
PASS — Scenario 2 - Firm, 44AE goods carriage (5 vehicles), old regime via Form 10-IEA, revised return, representative-filed satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
```

Scenario 2 correctly triggered every `requiredWhen`-gated follow-up specific
to ITR-4 (the Form 10-IEA filing date/acknowledgement number, the original
return's receipt number/date, the representative's name/email/contact/
capacity/PAN, the 44AE vehicle count and aggregate presumptive income, the
firm-only salary/interest-to-partners field, and the financial-particulars
mandatory lines), while Scenario 1 (new regime, original return, not
representative-filed, no goods-carriage income) correctly required none of
them and instead triggered the 44AD-specific fields.

A deliberately-broken variant of Scenario 1 (dropping `verificationPAN` and
setting `filingUnderSeventhProvisoOnly: true` without its four gated
follow-up questions) was also run, to confirm the evaluator itself correctly
detects violations rather than passing everything by construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'depositsExceedOneCroreInCurrentAccounts'
  - MISSING required field 'foreignTravelExpenditureExceedsTwoLakh'
  - MISSING required field 'electricityExpenditureExceedsOneLakh'
  - MISSING required field 'meetsOtherSeventhProvisoConditions'
  - MISSING required field 'verificationPAN'
```

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/in/incometax/individual-tax-return-itr4-sugam/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr4-sugam/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/in/incometax/individual-tax-return-itr4-sugam/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr4-sugam/1.0.0/schema.json [v0.3]
```

Structural checks (no duplicate field names, every field referenced by
exactly one step, every `visibleWhen`/`requiredWhen` field reference
resolving to a real field, every `steps[].next` resolving to a real step id)
were also run against the parsed document and found clean.

## Why most fields here are optional

Like `in/incometax/individual-tax-return-itr1-sahaj`, this document's
defining shape is **reviewing a pre-filled return**: the e-Filing portal
pre-fills salary, TDS/TCS, and interest/dividend data from Form 26AS and the
AIS before the filer opens the return. `required: true` is reserved for
fields every filer supplies or confirms regardless of pre-fill: identity
(PAN, name, date of birth/formation), filer type, residential status,
nature of employment, primary contact/address, the filing-section
selection, the representative-assessee gate, the three presumptive-income
eligibility gates, the section 112A capital-gains eligibility gate, and the
verification block.

## Time-versioning and the `edition` axis (flagged spec gap)

Like ITR-1, ITR-4 is genuinely time-versioned (`ITR4_AY_26-27_V1.1`, form
shape changing annually). Spec v0.3's `edition.scheme` enum remains
**closed** to `us-tax-year`/`gb-tax-year`/`award-year` (SPEC.md §5.7) and
does not fit India's assessment-year cycle — this is the **ninth** reference
schema in this registry to hit the same gap already flagged by GSP-0019,
after IE Form 11S, NZ IR3, CA T1, AU myTax, SG Form B1, DE ELSTER, FR 2042,
and IN ITR-1 SAHAJ. Published at the plain, non-edition registry path
(`registry/in/incometax/individual-tax-return-itr4-sugam/1.0.0/schema.json`)
as a workaround, consistent with all eight prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3, including the `any`
  composition (GSP-0013 §1) for the financial-particulars step, which
  applies whenever any of the three presumptive-income sections (44AD,
  44ADA, 44AE) is in use.
- `discovery/catalog.json` gained a `published` candidate entry for this
  document (inserted after the ITR-1 SAHAJ entry it extends), consistent
  with `discovery/README.md`'s "candidate becomes a schema" workflow. The
  client registry index was regenerated (`npm run build-index` in
  `tools/govschema-client`).
- India's Taxes vertical now has two of the ITR-2/3/4 set authored (ITR-1
  already published, ITR-4 this cycle); ITR-2 and ITR-3 remain candidate for
  a future cycle, per the priority order GOV-1224 recorded.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated incometax.gov.in e-Filing
"File Income Tax Return" online screens (a PAN-linked, OTP-authenticated
account), confirms the exact online-screen grouping and pre-fill behavior of
the sections modelled here, and records the outcome here — shipping a new
schema version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the AY 2027-28 edition of ITR-4 is notified,
since the source content itself changes annually.
