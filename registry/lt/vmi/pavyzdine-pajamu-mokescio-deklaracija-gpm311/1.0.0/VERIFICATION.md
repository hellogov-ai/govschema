# Verification record — `lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2969**, opening **Lithuania**
as a new jurisdiction via its Taxes vertical. Both prior scouting candidates
from the previous cycle (GOV-2954, GOV-2955 — Bulgaria's Business Formation
and Ghana's DMV) had already been authored and merged before this cycle
started, so this cycle scouted three brand-new jurisdictions in parallel
(Hungary, Slovakia, Lithuania) rather than picking up leftover backlog.

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i "lt-vmi\|lithuania"` and
`gh pr list --state all --search "lt/vmi"` before starting — neither found an
existing `lt`-prefixed branch or PR, so no reconciliation was needed this
cycle.

## Scouting record — three parallel jurisdiction candidates, one authored

Three independent research agents scouted Hungary, Slovakia, and Lithuania in
parallel this cycle, each asked to find the strongest candidate across all
six verticals:

- **Hungary**: the agent's initial top candidate (a "Schengen visa
  application" PDF on `konzuliszolgalat.kormany.hu`) was independently
  re-verified via a follow-up round-trip before authoring anything. A direct
  fetch confirmed the form's own heading reads "Harmonised application form —
  Application for Schengen Visa," citing Regulation (EU) 2016/399 and the
  Schengen Borders Code — a field-for-field match (all 34 numbered fields
  verified, including the numbering) to the already-modelled
  `fr/france-visas/schengen-visa-application` Annex I template. This is a
  confirmed duplicate, per this registry's existing precedent for Czechia's,
  Poland's, and Switzerland's own copies of the same harmonized form — not an
  open gap. Hungary's other five verticals were also screened and found dead
  ends this cycle: Taxes (NAV) and Business Formation both require the
  proprietary ÁNYK framework program, not a standard PDF; Passport, National
  ID (e-személyi), and DMV are all in-person/biometric-only with no
  citizen-fillable form (police.hu's own service pages state the driving
  licence and vehicle registration are issued/entered electronically by the
  clerk, and the only downloadable "ID card" form found was, on inspection,
  actually a private-investigator/security-guard permit, not the citizen
  national ID card). Hungary is a confirmed dead end across all six
  verticals under this registry's current sourcing standards this cycle —
  not attempted.
- **Slovakia**: the strongest candidate found (DPFOAv25, the individual
  income tax return, `financnasprava.sk`) hit a genuine site-wide outage
  during scouting (every path 302-redirecting to
  `servis.financnasprava.sk/odstavka` across multiple retries) — not
  independently re-verifiable this cycle. Two narrower, genuinely live
  backup candidates were found instead (`slovensko.sk`'s MZV consular
  eForms for a National ID card request and a driving-licence request, both
  scoped to citizens abroad rather than the domestic process), but neither
  was authored this cycle in favor of Lithuania's stronger, immediately
  verifiable lead — left as disclosed backlog (see CATALOG.md's Known Gaps
  section) for a future Slovakia-opening cycle to re-check the outage and
  choose between DPFOAv25 (if the site recovers) and the two consular
  eForms.
- **Lithuania**: authored this cycle — see below.

## Source verification

- **PDF source:**
  `https://e-seimas.lrs.lt/rs/lasupplement/TAP/470ad611ffa511e990d5d63c859a8aa7/dce00c10228f67133748211547043f37/format/ISO_PDF/`
  — fetched via `WebFetch`: **HTTP 200**, **`application/pdf;charset=UTF-8`**,
  **681,405 bytes**, **9 pages**. Hosted on `e-seimas.lrs.lt` (the Seimas'
  own legal-acts repository), serving the PDF annex to VMI Order No. VA-93
  (2019) — a first-party, unauthenticated, no-login/CAPTCHA/WAF-gated
  government source.
- Independently re-extracted via `pdfjs-dist` (legacy Node build, run from
  an isolated `/tmp` scratch directory) directly from the raw PDF bytes
  saved by the WebFetch tool call, rather than trusting the scouting
  agent's own summary: `getTextContent()` across all 9 pages returned a
  full, clean Lithuanian text layer — page 1 is the main GPM311 declaration;
  pages 2-9 are its eight schedules GPM311B through GPM311G in order. Zero
  Widget/AcroForm annotations found at any page — this is a text-layer
  specimen PDF (the paper/reference layout of a return actually filed
  through VMI's Mano VMI online-filing portal, not a fillable AcroForm), the
  same class of source already established for Norway's and Serbia's own
  portal-only annual tax returns in this registry.
- The document's own title, "PAVYZDINĖ PAJAMŲ MOKESČIO DEKLARACIJA
  (GPM311)," and its approving-order citation ("Valstybinės mokesčių
  inspekcijos ... viršininko įsakymu 2019 -- Nr. VA-") were both read
  directly from the extracted page-1 text.

## Field derivation and scoping

The extracted text (`/tmp/lt_gpm311.txt`, 31,594 characters across 9 pages)
was read in full before modeling any field. Scope:

- **Main GPM311 declaration (page 1) — modeled in full**: taxpayer
  identification (personal code, full name), residency status (permanent
  resident checkbox, final-departure date, the 280-day/two-consecutive-year
  first-year-filing basis), the return's five calculated-amounts blocks
  (tax paid before filing, calculated tax liability, final tax
  zero/payable/refundable outcome, social insurance contributions, health
  insurance contributions — each modeled as a `boolean`-is-zero gate plus a
  `requiredWhen`-gated amount field, mirroring the source's own
  "nulis"/amount checkbox-pairs), refund routing (own Lithuanian account vs.
  third-party/foreign account via a separate Form FR0781, out of scope), the
  eight schedule-attachment gates (one boolean "received this income" flag
  plus a conditional page-count field per schedule, mirroring the source's
  own "Tokių pajamų negavau" / "I did not receive such income" checkboxes),
  and the aggregate attached-document page count.
- **GPM311B schedule (page 2, employment income) — modeled in full,
  including its own income-type table**: the disability-based increased/
  maximum non-taxable-income-amount (NPD) election (two mutually exclusive
  checkboxes, modeled as one `enum` field) and the income table itself,
  bounded to **3 repeating rows** (`employmentIncome1`..`3` ×
  type-code/amount/withheld-tax/other-person-paid-tax/source-country-code/
  foreign-tax-paid). The source describes a dynamic table with no printed
  row cap (three rows pre-labelled with income-type code 01, plus an
  instruction to use any additional blank row for codes 02-09) — three rows
  follows this registry's established bounded-repeating-group convention
  for a dynamic list lacking a printed grid to size against (the same
  precedent as `rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana`'s
  6-slot dependents list and `jo/istd/pit-return-employee`'s own 6-row
  `dependentN` precedent), scaled down here since GPM311B's own table shows
  only 3 pre-printed rows before the free-form continuation instruction
  (vs. those two forms' larger printed grids).
- **GPM311C, D1, D2, E, F1, F2, G schedules (pages 3-9) — gate-only, line
  items deliberately out of scope**: each schedule's own internal line-item
  structure (self-employment income and expenses; property-transfer income
  and acquisition cost; rental/financial-instrument/other-asset income;
  interest income; other income, including a long list of named income-type
  codes for prizes, scholarships, pensions, gifts, royalties, etc.;
  controlled-foreign-entity positive-income computation; and
  income-reducing deductible-expense categories) is disclosed but not
  modeled in this v1.0.0, following the combined-multi-schedule-form
  scoping convention already established for Romania's Formulary 212
  (GOV-2797, disclosed the same way) and Greece's Ε1/Ε2/Ε3 multi-form
  income tax return. This schema models only each schedule's own
  gate-and-page-count pair (`receivedIndividualActivityIncome` +
  `gpm311cPageCount`, etc.), leaving the schedules' own line items as a
  disclosed backlog candidate for one or more future, separately-versioned
  companion schemas — a future cycle should prioritize GPM311C
  (self-employment/individual-activity income) as the next most common
  case after employment income.

## Scoping and modeling judgment calls

- **`isPermanentResident`/`finalDepartureDate`/`firstYearResidencyBasis`
  left without an invented `requiredWhen` gate between them**: the source's
  own instructional note ("Žymėkite tik teikdami pirmųjų metų ...
  deklaraciją, teikdami antrųjų metų deklaraciją, žymėkite 'Nuolatinis
  gyventojas'") describes a two-year filing sequence rather than a single
  clean field-equals-value trigger, so all three are modeled independently
  rather than gated on one another, per this registry's established
  no-invented-gate convention.
- **The five calculated-amounts blocks (tax paid before filing, calculated
  tax liability, final tax outcome, social insurance contributions, health
  insurance contributions) each modeled as a boolean-is-zero flag plus a
  `requiredWhen`-gated amount**, mirroring the source's own explicit
  "nulis" (zero) checkbox paired with an amount box for every one of these
  five blocks — a clean, disclosed field-equals-value gate in every case,
  not an invented one.
- **`calculatedTaxLiabilityAmount` has no `minimum` validation**: the source
  explicitly labels this box "suma (+ / -)," i.e. it may be entered as a
  positive or negative amount, unlike the payable/refundable/contribution
  amount fields (which the source's own checkbox-pair structure implies are
  always non-negative).
- **Amounts modeled `number` (not `integer`)**: the source states amounts
  are entered "eurais ir centais" (in euros and cents), i.e. with decimals,
  unlike the dinar-denominated integer amounts on Serbia's PP GPDG.
- **`refundRoutingMethod`/`refundBankAccountNumber` gated by
  `finalTaxOutcome: refundable`/`refundRoutingMethod:
  own-lithuanian-account` respectively**: both are clean, disclosed
  `requiredWhen` gates drawn directly from the source's own two mutually
  exclusive refund-destination options; the third-party/foreign-account
  option's own companion process (a separate Form FR0781 request) is
  explicitly out of this schema's scope, not modeled further.
- **Classification**: `taxpayerPersonalCode` is tagged `sensitive-pii`;
  `taxpayerFullName` is tagged `pii`; `refundBankAccountNumber` is tagged
  `financial`. Plain enumerated/boolean/numeric filing fields are left
  unclassified, matching this registry's established precedent (e.g.
  `rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana`'s own JMBG/name/
  address classification pattern).

## Conformance run

Two hand-authored valid fixtures under
`conformance/lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311/1.0.0/`:

- **`valid-wage-earner-minimal.json`** — a resident wage-earning taxpayer
  with a single employment-income line, a small tax liability payable, no
  other schedules, and zero social/health insurance contributions —
  exercises the schema's minimal required-field path.
- **`valid-refundable-with-individual-activity-and-disability-npd.json`** —
  a taxpayer who ceased residency mid-year (with a final-departure date and
  the first-year 280-day residency basis flagged), paid tax in advance,
  received both employment and individual-activity income, has a
  disability-based increased NPD election, has deductible expenses, and is
  due a refund routed to their own Lithuanian bank account — exercises the
  schema's `requiredWhen` gates across the refund-routing, tax-paid, and
  schedule-attachment fields together.

Ten mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops
  `taxpayerPersonalCode` (static `required: true`).
- **`mutation-control-invalid-enum-value.json`** — sets `finalTaxOutcome` to
  `"partial"`, not one of the enum's 3 values.
- **`mutation-control-invalid-date-format.json`** — sets `finalDepartureDate`
  to `"30-09-2025"`, not the required `YYYY-MM-DD` shape.
- **`mutation-control-invalid-type-income-amount.json`** — sets
  `employmentIncome1Amount` to the string `"twenty-four-thousand"` instead
  of a number.
- **`mutation-control-value-below-minimum.json`** — sets
  `employmentIncome1Amount` to `-500`, below `validation.minimum: 0`.
- **`mutation-control-missing-conditional-tax-paid-amount.json`** — sets
  `taxPaidBeforeFiling` to `true` without its `taxPaidBeforeFilingAmount`
  companion.
- **`mutation-control-missing-conditional-refundable-amount.json`** — sets
  `finalTaxOutcome` to `"refundable"` (with `refundRoutingMethod` and
  `refundBankAccountNumber` both already supplied) without its
  `finalTaxRefundableAmount` companion.
- **`mutation-control-missing-conditional-refund-account-number.json`** —
  sets `finalTaxOutcome`/`finalTaxRefundableAmount`/`refundRoutingMethod`
  (own-account) without its `refundBankAccountNumber` companion.
- **`mutation-control-invalid-minimum-tax-year.json`** — sets `taxYear` to
  `2015`, below `validation.minimum: 2019` (the year VMI Order No. VA-93
  approved this form).
- **`mutation-control-missing-conditional-gpm311c-page-count.json`** — sets
  `receivedIndividualActivityIncome` to `true` without its `gpm311cPageCount`
  companion.

All twelve fixtures were checked with a from-scratch Node conformance
checker (`/tmp/validate_conformance.mjs`, not committed — a disposable
script run from an isolated scratch directory, per this registry's own
established practice since no committed conformance-fixture validator
exists) implementing this schema's own `required`/`requiredWhen`/`type`/
`validation.enum`/`validation.minimum`/date-format grammar directly:

```
$ node /tmp/validate_conformance.mjs registry/lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311/1.0.0/schema.json conformance/lt/vmi/pavyzdine-pajamu-mokescio-deklaracija-gpm311/1.0.0
OK   mutation-control-invalid-date-format.json errors=["finalDepartureDate: invalid date format \"30-09-2025\", expected YYYY-MM-DD"]
OK   mutation-control-invalid-enum-value.json errors=["finalTaxOutcome: value \"partial\" not in enum [\"zero\",\"payable\",\"refundable\"]"]
OK   mutation-control-invalid-minimum-tax-year.json errors=["taxYear: value 2015 below minimum 2019"]
OK   mutation-control-invalid-type-income-amount.json errors=["employmentIncome1Amount: expected type number, got string (\"twenty-four-thousand\")"]
OK   mutation-control-missing-conditional-gpm311c-page-count.json errors=["gpm311cPageCount: required but missing"]
OK   mutation-control-missing-conditional-refund-account-number.json errors=["refundBankAccountNumber: required but missing"]
OK   mutation-control-missing-conditional-refundable-amount.json errors=["finalTaxRefundableAmount: required but missing"]
OK   mutation-control-missing-conditional-tax-paid-amount.json errors=["taxPaidBeforeFilingAmount: required but missing"]
OK   mutation-control-missing-required-field.json errors=["taxpayerPersonalCode: required but missing"]
OK   mutation-control-value-below-minimum.json errors=["employmentIncome1Amount: value -500 below minimum 0"]
OK   valid-refundable-with-individual-activity-and-disability-npd.json errors=[]
OK   valid-wage-earner-minimal.json errors=[]
```

All ten negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
445/445 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
445/445 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens **Lithuania as this registry's 55th jurisdiction**, via its **Taxes**
  vertical (1 of 6). DMV (Regitra — vehicle registration funnels to the
  `eregitra.lt` online e-service or in-person branch visits, no downloadable
  form found), Visa (all Schengen/national visa applications moved fully
  into the MIGRIS online portal as of 2025-10-01, no static form), Passport
  and National ID (both explicitly in-person-only, appointment-based
  biometric enrollment), and Business Formation (`registrucentras.lt`
  returned HTTP 403 on every fetch attempt this cycle, WAF-gated with no
  static fallback; the individual-activity certificate REG812 is
  authenticated-portal-only) were all screened this cycle and found dead
  ends for a first-party unauthenticated fetch — see CATALOG.md's Known
  Gaps section for the full per-vertical record. None should be
  re-attempted without a genuinely new source.
- `jurisdiction.level` is `national` — VMI is Lithuania's national tax
  authority.
- `process.type` is `filing`, matching this registry's established
  convention for tax-return forms.
- `process.language` is `lt`.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming whether a later
VMI order has superseded Order No. VA-93's GPM311 annex for a more recent
tax year; (2) authoring a GPM311C (individual-activity income) companion
schema, the strongest next-scoped candidate among the seven un-modeled
schedules; (3) re-checking whether `registrucentras.lt`'s WAF gate can be
worked around with a JavaScript-executing browser session, the same
technique that closed other jurisdictions' JS-gated business-registration
portals (e.g. Bulgaria's `portal.registryagency.bg`); (4) re-checking
Slovakia's `financnasprava.sk` outage and, once resolved, deciding between
authoring DPFOAv25 (Taxes) or one of the two live consular eForms (National
ID/DMV) found this cycle.
