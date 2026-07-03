# Verification record — `in/incometax/individual-tax-return-itr1-sahaj` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this cycle picked up India's income tax return

This is the recurring "GovSchema Standard Research" cycle
([GOV-900](/GOV/issues/GOV-900)). The prior three cycles
([GOV-869](/GOV/issues/GOV-869), [GOV-878](/GOV/issues/GOV-878),
[GOV-887](/GOV/issues/GOV-887)) opened India as an 11th jurisdiction and
authored its Passport, DMV, and National ID & Civic Documents schemas,
leaving India at 3/6 verticals. `discovery/catalog.json` already carried
three `candidate` entries for India's remaining gaps — Company
Incorporation (SPICe+), Individual Income Tax Return (ITR-1 SAHAJ), and
e-Visa. ITR-1 was picked because both SPICe+ (multi-agency MCA
integration form) and the e-Visa system are login/session-gated online
flows with no single authoritative field-level PDF, whereas the Income Tax
Department publishes the notified ITR-1 form as a downloadable,
non-interactive artifact every assessment year — the same shape that has
worked cleanly for every other tax-return schema in this registry (FR
2042, DE ELSTER, AU myTax, SG Form B1, NZ IR3, CA T1, IE Form 11S). This
document closes the IN × Taxes cell (India now 4/6 verticals).

## Sources examined

- **Document `(id, version)`:** `in/incometax/individual-tax-return-itr1-sahaj` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Income Tax Department, Government of India; the ITR forms
  themselves are notified annually by the Central Board of Direct Taxes
  (CBDT) under the Income-tax Rules, 1962.
- **Primary source (field-by-field detail):** the ITR-1 SAHAJ **Excel
  utility for Assessment Year 2026-27, version 1.1**
  (`ITR1_AY_26-27_V1.1.zip` → `ITR1_AY_26-27_V1.1.xlsm`), fetched directly
  from the e-Filing portal's own Downloads page
  (<https://www.incometax.gov.in/iec/foportal/downloads>) at
  <https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-06/ITR1_AY_26-27_V1.1.zip>
  — **HTTP 200, no access block**, byte size matching the size the
  Downloads page itself advertises (3.68 MB). This is the Department's own
  current-cycle offline-filing utility, not a third-party mirror.
- **Access-block encountered and worked around:** the *notified-form
  Gazette PDF* at `incometaxindia.gov.in` (a distinct host from the
  e-filing portal) returned an `Access Denied` WAF response on direct
  fetch (`curl` with a browser `User-Agent`), consistent with the
  bot-blocking pattern already recorded for other jurisdictions' tax-form
  hosts in this registry (`de/finanzamt/income-tax-return-elster`'s
  `formulare-bfinv.de`). A third-party mirror of the same Gazette PDF
  (dezshira.com) was checked but found to be the **outdated AY 2017-18
  edition** — a materially different form shape from the current cycle (no
  two-house-property allowance, no section 24(b) loan schedule, no
  115BAC regime election, no updated-return 139(8A) Part B-ATI) — and was
  discarded rather than used. The current Excel utility from
  `incometax.gov.in` was used instead, and is a stronger source than a
  scraped PDF mirror: it is retrieved from the same domain the notified
  Gazette PDF's own e-filing FAQ page points taxpayers to for downloads,
  and it is a **structured workbook** whose cell values are the literal
  field labels ITR-1's own printed line codes (`B1`, `B2`, `C1`, `D1`–`D11`,
  `5a`–`5u`) anchor to, not an OCR/text-layer reconstruction.
- **Secondary sources:** the e-Filing portal's own "File ITR-1 (Sahaj)
  Online" help pages (confirming the pre-fill/review shape and the
  Rs. 50 lakh / two-house-property eligibility ceiling) and general web
  search results corroborating the AY 2025-26/2026-27 form changes
  (bank pre-validation emphasis, the new two-house-property allowance).
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Extraction technique: OOXML zip/XML parsing of the notified Excel utility

The `.xlsm` is a standard OOXML zip archive. It was extracted with
Python's `zipfile` module (no `pip`/`openpyxl` available in this
environment) and its `xl/sharedStrings.xml` and `xl/worksheets/sheetN.xml`
parsed directly as XML to recover every cell's literal text, keyed by
cell reference (e.g. `E6`, `H115`) and sheet name (`xl/workbook.xml`
maps each of the workbook's 21 sheets — Income Details, HP, Schedule
24(b), TDS, TCS, Taxes Paid and Verification, Part B ATI, 80D/80G/80GGA/
80GGC/80U-80DD/80C/80E-family schedules, BankCode, IFSC, DataBase,
SUMMARY, Help — to its `sheetN.xml` file). The `DataBase` sheet (19,303
rows) carries every dropdown's option list (e.g. `EmployerCategory`,
`ReturnFileUnderSection`, `TypeOfAccount`, the 80DD/80U disability-severity
lists) and was the direct source for this document's closed `enum`
vocabularies. Every field's `sourceRef` cites the specific sheet name and
cell reference, plus the form's own printed line code where the form
carries one.

## Scope decisions (what is modelled vs. deferred)

ITR-1 SAHAJ is deliberately India's *simplified* return, but its Excel
utility is still a 21-sheet workbook with several schedules whose full
row-by-row detail is genuinely open-ended (multiple employers, multiple
TDS deductors, multiple donees). Consistent with this registry's existing
precedent for main-form/schedule splits (`fr/dgfip/income-tax-return-2042`
excluding the n°2044 rental-income annex's own line items;
`de/finanzamt/income-tax-return-elster` excluding every Anlage), this
document models:

- **Modelled in full:** Part A general/identity information, the section
  115BAC regime election and seventh-proviso/representative-assessee
  compliance questions, Part B1 salary/pension income, up to two house
  properties (Sch HP) at summary level, Part B3 other-sources income,
  every Chapter VI-A deduction line as a single amount field (Part C),
  aggregate taxes-paid figures, refund bank account details, the C3
  exempt-income reporting lines, and the verification/TRP block.
- **Deferred (out of scope), and why:** the TDS1/TDS2/TDS3 schedules'
  own per-employer/per-deductor rows (deductor TAN, name, section code,
  year — `totalTDSOnSalary`/`totalTDSOnOtherIncome` carry only the
  aggregate the taxpayer reviews against Form 26AS/AIS, since this is the
  same "review a pre-filled return" shape already established for
  `de/finanzamt/income-tax-return-elster`); the TCS schedule's
  per-collector rows (same reasoning, `totalTCS`); the advance/self-
  assessment tax challan detail (BSR code, deposit date, challan serial
  number — `totalAdvanceTaxPaid`/`totalSelfAssessmentTaxPaid` carry only
  the totals); Schedule HP's co-owner and tenant sub-detail (name, PAN,
  Aadhaar, percentage share) and the section 24(b) loan-by-loan schedule
  (lender name, account number, sanction date, outstanding balance) —
  only the aggregate `interestOnBorrowedCapital` line per property is
  modelled; the 80D/80DD/80DDB/80G/80GGA sub-schedules' own donee-by-donee
  or dependent-by-dependent breakdown (only the aggregate deduction
  amount per section is modelled, matching the main-sheet's own
  single-amount presentation of each Chapter VI-A line); and **Part
  B-ATI** (`Sheet 'Part B ATI'`), the entire "Computation of total updated
  income and tax payable" block that only applies to a section 139(8A)
  *updated return* — a materially different filing posture from a normal
  original/revised/belated return, out of scope the same way this
  registry treats other single-purpose alternate-filing-path schedules.
- **Not independently confirmed:** system-computed fields (annual value,
  gross total income, tax payable, cess, rebate, interest under sections
  234A/234B/234C/234F, amount payable/refund) are intentionally **not**
  modelled as input fields at all — they are the e-Filing portal's own
  computed outputs from the input fields this document does model, the
  same "don't model what the source computes for the filer" principle
  already applied to every prior tax-return schema in this registry.
- **No live e-Filing portal walkthrough.** Filing ITR-1 online requires a
  PAN-linked, OTP/Aadhaar-authenticated e-Filing account not available in
  this environment, so the field-by-field comparison the practice
  requires against the live online screens (as opposed to the Department's
  own offline utility both channels are generated from) has not been
  completed.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`enum`/
`pattern` constraint in `schema.json`, using a one-off Python condition
evaluator (not committed to the repo) implementing the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `Condition` schema (spec v0.3 §8.1).

**Scenario 1 — PSU-employed salaried resident, self-occupied home, new
regime, original return, filed in person:** Rohan Sharma, salaried at a
public sector undertaking in Pune, one self-occupied house property with
a home-loan interest deduction, savings-bank interest, 80C/80CCD(1B)/80D/
80TTA deductions, TDS on salary, and a savings-account refund destination.

**Scenario 2 — state-government pensioner, revised return, filed by a
representative, two house properties, TRP-prepared:** Lakshmi Iyer, a
Tamil Nadu state-government pensioner with a family pension and dividend
income, one let-out and one self-occupied house property, a
seventh-proviso filer (foreign-travel-expenditure trigger), filing a
section 139(5) revised return through a representative assessee (her son)
and a Tax Return Preparer, claiming an 80U severe-disability deduction and
an 80TTB senior-citizen interest deduction.

Both runs:

```
PASS — Scenario 1 - PSU salaried employee, self-occupied home, new regime satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
PASS — Scenario 2 - state-govt pensioner, revised return, representative-filed, 2 properties, TRP-prepared satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
```

A deliberately-broken variant of Scenario 1 (dropping `verificationPAN`
and setting `filingUnderSeventhProvisoOnly: true` without its four gated
follow-up questions) was also run, to confirm the evaluator itself
correctly detects violations rather than passing everything by
construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'depositsExceedOneCroreInCurrentAccounts' ...
  - MISSING required field 'foreignTravelExpenditureExceedsTwoLakh' ...
  - MISSING required field 'electricityExpenditureExceedsOneLakh' ...
  - MISSING required field 'meetsOtherSeventhProvisoConditions' ...
  - MISSING required field 'verificationPAN' ...
```

Scenario 2 also correctly triggered every `requiredWhen`-gated follow-up
(the four seventh-proviso sub-questions, the original-return receipt
number/date, the representative's name/email/contact, the disability-
severity enum for `deduction80U`, and the TRP identification number/name),
while Scenario 1 (not a seventh-proviso filer, not revised, not
representative-filed, no disability deduction, no TRP) correctly required
none of them.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/in/incometax/individual-tax-return-itr1-sahaj/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr1-sahaj/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/in/incometax/individual-tax-return-itr1-sahaj/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr1-sahaj/1.0.0/schema.json [v0.3]
```

## Why most fields here are optional

Like `de/finanzamt/income-tax-return-elster`,
`au/ato/individual-tax-return-mytax`, `fr/dgfip/income-tax-return-2042`,
and `sg/iras/individual-income-tax-return-formb1`, this document's defining
shape is **reviewing a pre-filled return**: the e-Filing portal pre-fills
salary (from Form 16 e-filed by the employer), TDS/TCS, and interest/
dividend data from Form 26AS and the AIS before the taxpayer opens the
return. `required: true` is reserved for fields every filer supplies or
confirms regardless of pre-fill: identity (PAN, name, DOB), residential
status, nature of employment, primary contact/address, the filing-section
selection, the representative-assessee gate, and the verification block.

## Time-versioning and the `edition` axis (flagged spec gap)

ITR-1 is genuinely time-versioned — its own Excel utility is versioned
per assessment year (`ITR1_AY_26-27_V1.1`) and its form shape changes
annually (e.g. the two-house-property allowance is new for AY 2026-27).
Spec v0.3's `edition.scheme` enum remains **closed** to `us-tax-year` /
`gb-tax-year` / `award-year` (SPEC.md §5.7) — India's assessment-year
cycle fits neither existing scheme without the same misleading-scheme-name
problem GSP-0019 already flagged. This is the **eighth** reference schema
to hit this exact gap, after IE Form 11S, NZ IR3, CA T1, AU myTax, SG
Form B1, DE ELSTER, and FR 2042 — published at the plain, non-edition
registry path
(`registry/in/incometax/individual-tax-return-itr1-sahaj/1.0.0/schema.json`)
as a workaround, consistent with all seven prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3.
- India's vertical coverage is now **4/6** (Passport, DMV, National ID &
  Civic Documents, Taxes). Business Formation (SPICe+, MCA Form INC-32)
  and Visa (e-Visa) remain `candidate` in `discovery/catalog.json` for a
  future cycle — both are login/session-gated online systems with no
  single authoritative field-level document, unlike ITR-1's downloadable
  notified-form utility.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated incometax.gov.in e-Filing
"File Income Tax Return" online screens (a PAN-linked, OTP-authenticated
account), confirms the exact online-screen grouping and pre-fill behavior
of the sections modelled here, and records the outcome here — shipping a
new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the AY 2027-28 edition of ITR-1 is
notified, since the source content itself changes annually.
