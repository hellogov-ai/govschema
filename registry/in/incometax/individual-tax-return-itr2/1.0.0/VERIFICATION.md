# Verification record — `in/incometax/individual-tax-return-itr2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this cycle picked up ITR-2

This is a direct follow-up to [GOV-1224](/GOV/issues/GOV-1224)'s research
(tracked further by [GOV-1229](/GOV/issues/GOV-1229), which authored ITR-4
SUGAM) and to `CATALOG.md`'s "Known Gaps & Opportunities" list, which named
**India ITR-2/ITR-3** as the top genuinely open, well-sourced candidate:
"capital-gains/foreign-income and non-presumptive-business individual tax
returns. Same income-tax e-filing portal and notified-utility technique
already proven for ITR-1/ITR-4." ITR-2 was picked over ITR-3 because ITR-2
covers no-business-income filers (the same restriction ITR-1/ITR-4 share),
giving the highest reuse of already-published scaffolding; ITR-3 (business/
professional income with full books of account) is the most complex of the
three and remains a candidate for a future cycle.

## Sources examined

- **Document `(id, version)`:** `in/incometax/individual-tax-return-itr2` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Income Tax Department, Government of India; the ITR forms
  themselves are notified annually by the Central Board of Direct Taxes
  (CBDT) under the Income-tax Rules, 1962.
- **Primary source (field-by-field detail):** the ITR-2 **Excel utility for
  Assessment Year 2026-27, version 1.1** (`ITR2_AY_26-27_V1.1.zip` →
  `ITR2_AY_26-27_V1.1.xlsm`), fetched directly from the e-Filing portal's own
  Downloads page (<https://www.incometax.gov.in/iec/foportal/downloads>) at
  <https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-06/ITR2_AY_26-27_V1.1.zip>
  — **HTTP 200, no access block**, 9.54 MB. This is the same channel
  (incometax.gov.in, not the WAF-blocked incometaxindia.gov.in gazette host)
  already used and recorded for `in/incometax/individual-tax-return-itr1-sahaj`
  and `in/incometax/individual-tax-return-itr4-sugam`.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Extraction technique: OOXML zip/XML parsing (66 worksheets)

The `.xlsm` is a standard OOXML zip archive with **66 worksheets** — far more
than ITR-1's (~21) or ITR-4's (24), reflecting ITR-2's much larger schedule
surface (`ISIN List`, `Home`, `PART A - General`, `Nature Of Business`,
`Part A - BS`, `Manufacturing Account`, `Trading Account`, `Profit and Loss`,
`Part A - OI`, `Quantitative Details`, `Schedule S`, `House Property`, `BP`,
`DPM - DOA`, `DEP_DCG`, `ESR`, `CG`, `Schedule 112A`,
`Schedule 115AD(1)(iii) proviso`, `VDA`, `OS`, `CYLA - BFLA`, `CFL`,
`Unabsorbed Depreciation`, `ICDS`, `10AA`, `80C`, `80G`, `80D`, `RA`,
`80GGA`, `80E_80EE_80EEA_80EEB`, `VI-A`, `80U-80DD`, `80GGC`, `AMT`,
`SPI - SI`, `AMTC`, `EI`, `FSI1`, `PTI`, `TPSA`, `FSI`, `Sch 5A`, `TR_FA`,
`AL`, `GST`, `Tax Calculated`, `Part B - TI TTI`, `IT`, `ESOP`, `TDS`,
`Part B ATI`, `Verification`, and several helper/dropdown sheets). It was
extracted with Python's `zipfile` module (no Excel/LibreOffice/pip install
available in this environment) and each worksheet's `xl/worksheets/sheetN.xml`
parsed directly as XML via `xml.etree.ElementTree`, keyed by cell reference,
with `xl/sharedStrings.xml` resolved for text cells and each sheet's real
file resolved through `xl/workbook.xml` + `xl/_rels/workbook.xml.rels` (sheet
name/`sheetId` → `r:id` → `worksheets/sheetN.xml` — **the file's numeric
suffix does not reliably match the sheet's own `sheetId` or declaration
order**, a mapping pitfall confirmed firsthand this cycle and worth flagging
for any future OOXML scrape in this registry: always resolve through the
rels file, never assume `sheetId`/order = filename).

Every field's `sourceRef` cites the specific worksheet and cell (or row
range, for multi-cell table headers) of that utility, plus the form's own
line code (e.g. `A1e`, `B3c`, `1a`, `2ai`) where one exists.

## Scope decisions (what is modelled vs. deferred)

ITR-2 reuses ITR-1/ITR-4's general-information (adjusted for ITR-2's own
filer-status/residential-status/director/partner/unlisted-shares/Portuguese-
Civil-Code questions), Chapter VI-A deduction, taxes-paid, bank-details, and
verification scaffolding, and adds the schedules that distinguish it from
ITR-1/ITR-4 — **the reason a filer needs ITR-2 at all**:

- **Modelled, at an asset-category/net-gain level:** Schedule CG (capital
  gains) — short-term gains on immovable property, STT-paid listed equity
  (section 111A), and other assets; long-term gains on immovable property,
  section 112A listed equity (the same narrow ~Rs. 1.25 lakh-exemption line
  ITR-1/ITR-4 themselves expose, here alongside every other asset class
  ITR-1/ITR-4 cannot model), and other assets with indexation; aggregate
  reinvestment deductions (54/54B/54D/54EC/54F/54G/54GA); and the Part B-TI
  rate-bucketed totals (total STCG, total LTCG, total capital gains).
  Schedule VDA (virtual digital assets / crypto, section 115BBH) as a single
  aggregate income figure. Schedule FA/TR (foreign assets and foreign-tax
  relief) as aggregate depository-account, equity/debt-interest, foreign-
  income, and tax-relief figures, gated by residential status (Schedule FA
  is inapplicable to non-residents per the form's own note). Schedule AL
  (assets and liabilities), gated on the form's own >Rs. 1 crore
  total-income threshold, as an eligibility boolean plus one aggregate
  immovable-asset-cost figure. House Property extended to a third-and-beyond
  aggregate (ITR-1/ITR-4 cap at 2). Schedule OS (Other Sources) extended
  with rental-of-machinery/plant income, section 56(2)(x) income, and
  lottery/online-game winnings — none present on ITR-1's simpler Other
  Sources schedule. The identity-section additions
  (`isDirectorInCompany`, `isPartnerInFirm`, `heldUnlistedEquitySharesDuringYear`,
  `governedByPortugueseCivilCode`) are modelled as their own eligibility-role
  booleans because, per the form's own scoping logic, a "Yes" to any one of
  them (or to having capital gains beyond the narrow 112A allowance, foreign
  assets, or more than two house properties) is what actually requires a
  filer to use ITR-2 instead of ITR-1/ITR-4.
- **Deferred (out of scope), and why:** consistent with this registry's
  existing main-form/schedule-detail precedent (see
  `in/incometax/individual-tax-return-itr1-sahaj` and `-itr4-sugam`
  VERIFICATION.md), the following per-item schedule detail behind this
  document's aggregate fields is out of scope:
  - Schedule CG's own per-transaction consideration/cost-of-acquisition/
    indexation/stamp-duty-valuation (section 50C) breakdown, its non-
    resident/FII-specific sub-items (A3, A4, B5), slump-sale computation
    (A2), buyer-detail table, DTAA special-rate rows, and Capital Gains
    Accounts Scheme utilization tracking — Schedule CG is, by a wide margin,
    the most complex schedule in the notified form (over 300 rows spanning
    short-term and long-term computation alone); only the net-gain-by-
    asset-category figures a filer would actually supply (or a return-
    preparation tool would already have computed) are modelled.
  - Schedule VDA's own per-transaction (acquisition date, transfer date,
    cost of acquisition, consideration) table — only the aggregate positive-
    income total is modelled.
  - Schedule FA's own per-account/per-entity tables (country, financial
    institution, address, account number, peak balance, interest accrued) —
    Schedule FA has numerous such tables (A1 foreign depository accounts,
    A2 custodial accounts, equity/debt interests, and more); only a small
    number of headline aggregate figures are modelled.
  - Schedule AL's own per-asset (description, address) breakdown — only one
    aggregate immovable-asset-cost figure is modelled; movable assets and
    liabilities are not modelled at all this cycle.
  - House Property's own co-owner/tenant/section-24(b) loan-by-loan
    sub-detail (as in ITR-1/ITR-4) and the third-and-beyond property's own
    per-property detail (address, type, rent, tax, interest) — only an
    aggregate income figure for property 3+.
  - Schedule OS's own dividend sub-type (i/ii/iii), interest sub-type
    (savings/deposit/refund/PF-related), and section 56(2)(x) sub-item
    (money/immovable-property/other-property) breakdowns — aggregate only,
    the same reasoning as ITR-1.
  - The TDS1/TDS2/TCS/advance-tax schedules' own per-employer/per-deductor/
    per-challan rows (same reasoning and precedent as ITR-1/ITR-4).
  - The 80D/80DD/80DDB/80G/80GGA sub-schedules' own donee-by-donee or
    dependent-by-dependent breakdown (aggregate only, as in ITR-1/ITR-4).
  - Schedule 5A (income apportionment between spouses governed by the
    Portuguese Civil Code) — `governedByPortugueseCivilCode` is modelled as
    an eligibility gate only; the apportionment table itself is out of
    scope.
  - Schedule TR's own per-country tax-relief breakdown — only the aggregate
    total is modelled.
  - **Business/professional-income schedules are not modelled at all**:
    Schedule BP, `Nature Of Business`, `Part A - BS`, `Manufacturing
    Account`, `Trading Account`, `Profit and Loss`, `Part A - OI`,
    `Quantitative Details`, the depreciation schedules (`DPM - DOA`,
    `DEP_DCG`, `Unabsorbed Depreciation`), `ICDS`, and the GST
    turnover-reconciliation schedule all appear in the notified utility's
    own worksheet set, but ITR-2's own title cell states it is
    "[For Individuals and HUFs **not having income from profits and gains
    of business or profession**]" — those filers use ITR-3/ITR-4 instead.
    Their presence in the shared utility workbook (evidently a common
    codebase across the ITR-2/3/4 family) does not make them in-scope for
    an ITR-2 filer.
  - Schedule AMT/AMTC (Alternate Minimum Tax), `SPI - SI` (income of
    specified persons clubbed with the filer's own), `CFL` (carry-forward of
    losses), `CYLA - BFLA` (current-year/brought-forward loss adjustment),
    `10AA` (SEZ unit deduction), `EI` (exempt income), `FSI`/`FSI1`/`PTI`
    (foreign-source income and pass-through income detail beyond the
    aggregate Schedule TR figure already modelled), `TPSA` (specified
    domestic transactions), `ESOP` (ESOP tax-deferral tracking), and
    `Part B ATI` (Alternate Tax on certain incomes) are all deferred the
    same way ITR-1/ITR-4 deferred their own least-common schedules — none
    of these apply to a plausible mainstream ITR-2 filer's first-pass
    return, and each would need its own dedicated research pass.
- **Not independently confirmed:** system-computed fields (annual property
  value, gross total income, tax payable, cess, rebate, interest under
  sections 234A/234B/234C, refund/demand amount) are intentionally **not**
  modelled as input fields — they are the e-Filing portal's own computed
  outputs, the same "don't model what the source computes for the filer"
  principle already applied to every prior tax-return schema in this
  registry.
- **Not machine-enforced (documented only):** ITR-2's own eligibility is a
  disjunction (any one of: capital gains beyond section 112A, foreign
  assets/income, more than two house properties, being a director/partner,
  holding unlisted shares, or RNOR/non-resident status makes ITR-1/ITR-4
  insufficient) rather than a single gate; this document does not encode a
  `crossFieldValidation` "at least one of" rule, for the same reason
  ITR-4's VERIFICATION.md gives — GSP-0013's grammar is built around field
  *presence/absence* and simple comparisons, not "at least one of several
  booleans is true."
- **No live e-Filing portal walkthrough.** Filing ITR-2 online requires a
  PAN-linked, OTP/Aadhaar-authenticated e-Filing account not available in
  this environment, so the field-by-field comparison the practice requires
  against the live online screens has not been completed.

## Mock-data test run

Two representative scenarios plus one deliberately-broken sanity-check
variant were authored and checked field-by-field against every
`type`/`required`/`requiredWhen`/`visibleWhen`/`enum`/`pattern`/`minimum`/
`maximum` constraint in `schema.json`, using a one-off Python condition
evaluator (not committed to the repo) implementing the same
`equals`/`notEquals`/`greaterThan`/`greaterThanOrEqual`/`lessThan`/
`lessThanOrEqual` grammar as GSP-0013's `Condition` schema (spec v0.3 §8.1).

**Scenario 1 — Resident individual, director + unlisted shares + LTCG112A +
foreign depository account:** Ananya Rao, a Bengaluru-based resident
individual who is a company director and held unlisted equity shares during
the year, with salary income, one self-occupied house property, short-term
and section-112A long-term capital gains on listed equity, and a foreign
bank account (Schedule FA applicable), filing an original return in the old
tax regime.

**Scenario 2 — Non-resident, 3 house properties, VDA income, revised return
via representative:** Vikram Nair, a London-based non-resident individual
with three let-out house properties in India (exercising the third-property-
and-beyond aggregate this document adds beyond ITR-1/ITR-4's 2-property cap),
capital gains on immovable property, virtual digital asset (crypto) income,
and no Schedule FA obligation (correctly gated off by non-resident status),
filing a section 139(5) revised return through a representative.

Both runs:

```
PASS — Scenario 1 - Resident individual, director + unlisted shares + LTCG112A + foreign depository account satisfies every type/required/requiredWhen/visibleWhen/enum/pattern/minimum/maximum constraint.
PASS — Scenario 2 - Non-resident, 3 house properties, VDA income, revised return via representative satisfies every type/required/requiredWhen/visibleWhen/enum/pattern/minimum/maximum constraint.
```

Scenario 2 correctly triggered the `additionalHousePropertiesAggregateIncome`
requiredWhen (3 properties), the revised-return follow-ups (original receipt
number/date), and the representative-assessee follow-ups, while correctly
**not** requiring `hasForeignAssetsOrIncome` (gated off by
`residentialStatus: non_resident`) — confirming the eligibility/visibility
wiring for Schedule FA's own "not applicable for NRI" rule actually holds.

This second point surfaced a **real bug during authoring**: an earlier draft
marked `hasForeignAssetsOrIncome` as unconditionally `required: true` while
also gating its `visibleWhen` on residential status — a field cannot be both
always-required and conditionally-visible, and the evaluator correctly
flagged Scenario 2 (a non-resident filer) as missing a "required" field it
should never have been asked. Fixed by moving `hasForeignAssetsOrIncome` to
`required: false` with a matching `requiredWhen` (residency not
non-resident), so it is required exactly when — and only when — it is shown.
This is the same class of self-inconsistent-conditional bug the `notEquals`-
against-an-absent-field pattern flagged in prior cycles (see
`notequals-empty-string-absent-field-bug` in this registry's history), a
reminder that every `required: true` field needs to be checked against its
own `visibleWhen` (if any), not just tested in isolation.

A deliberately-broken variant of Scenario 1 (dropping `verificationFullName`
and setting `filingUnderSeventhProvisoOnly: true` without its four gated
follow-up questions) was also run, to confirm the evaluator itself correctly
detects violations rather than passing everything by construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'depositsExceedOneCroreInCurrentAccounts'
  - MISSING required field 'foreignTravelExpenditureExceedsTwoLakh'
  - MISSING required field 'electricityExpenditureExceedsOneLakh'
  - MISSING required field 'meetsOtherSeventhProvisoConditions'
  - MISSING required field 'verificationFullName'
```

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/in/incometax/individual-tax-return-itr2/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr2/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/in/incometax/individual-tax-return-itr2/1.0.0/schema.json
ok   registry/in/incometax/individual-tax-return-itr2/1.0.0/schema.json [v0.3]
```

A duplicate-field-name check (130 field names, zero duplicates) was also run
against the parsed document and found clean.

## Why most fields here are optional

Like `in/incometax/individual-tax-return-itr1-sahaj` and `-itr4-sugam`, this
document's defining shape is **reviewing a pre-filled return**: the e-Filing
portal pre-fills salary, TDS/TCS, and interest/dividend data from Form 26AS
and the AIS before the filer opens the return. `required: true` is reserved
for fields every filer supplies or confirms regardless of pre-fill: identity
(PAN, name, date of birth/formation), filer status, residential status,
primary contact/address, the new-regime opt-out question, the filing-section
selection, the representative-assessee/director/partner/unlisted-shares/
Portuguese-Civil-Code disclosure gates, the Schedule AL >Rs. 1 crore gate,
and the verification block.

## Time-versioning and the `edition` axis (flagged spec gap)

Like ITR-1 and ITR-4, ITR-2 is genuinely time-versioned
(`ITR2_AY_26-27_V1.1`, form shape changing annually). Spec v0.3's
`edition.scheme` enum remains **closed** to
`us-tax-year`/`gb-tax-year`/`award-year` (SPEC.md §5.7) and does not fit
India's assessment-year cycle — this is (at least) the **tenth** reference
schema in this registry to hit the same gap already flagged by GSP-0019,
after IE Form 11S, NZ IR3, CA T1, AU myTax, SG Form B1, DE ELSTER, FR 2042,
IN ITR-1 SAHAJ, and IN ITR-4 SUGAM. Published at the plain, non-edition
registry path
(`registry/in/incometax/individual-tax-return-itr2/1.0.0/schema.json`) as a
workaround, consistent with all prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), including the residency-gated `notEquals`
  condition on `hasForeignAssetsOrIncome`/`totalPeriodOfStayInIndia*`
  described above.
- `discovery/catalog.json` gained a `published` candidate entry for this
  document (inserted after the ITR-4 SUGAM entry it extends), consistent
  with `discovery/README.md`'s "candidate becomes a schema" workflow. The
  client registry index was regenerated (`npm run build-index` in
  `tools/govschema-client`).
- India's Taxes vertical now has three of the ITR-1/2/3/4 set authored
  (ITR-1, ITR-4, and ITR-2 this cycle); ITR-3 (business/professional income
  with full books of account) remains the sole open candidate of that set
  for a future cycle.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated incometax.gov.in e-Filing
"File Income Tax Return" online screens (a PAN-linked, OTP-authenticated
account), confirms the exact online-screen grouping and pre-fill behavior of
the sections modelled here — particularly Schedule CG's own online-wizard
shape, which the offline utility's spreadsheet layout may not represent
1:1 — and records the outcome here, shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the AY 2027-28 edition of ITR-2 is notified,
since the source content itself changes annually.
