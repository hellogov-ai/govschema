# Verification record — `se/skatteverket/individual-income-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2091, "GovSchema Standard Research")

This cycle's task brief names DE Steuer-ID, SG NRIC loss/damage/re-registration,
NZ RealMe, and "remaining voter registration" as example National ID
candidates. A fresh read of `CATALOG.md`'s Known Gaps and Executive Summary
sections (and the corresponding memory records: GOV-651, GOV-634/GOV-641,
GOV-660) confirmed all four are already resolved or confirmed non-gaps/dead
ends in prior cycles. Rather than re-attempt an already-closed gap, this
cycle opened **Sweden's Taxes vertical** — Sweden already had 3 of 6
verticals modelled (Business Formation via GOV-2056, DMV via GOV-2063, Visa
via GOV-2070).

Three candidates for Sweden's remaining verticals (Passport, Taxes, National
ID) were screened:

- **Polisen passport application**: requires an eID login to "Mina sidor" to
  book an appointment; identity verification, photo, and (where required)
  witness confirmation happen entirely in person. No downloadable
  field-by-field application form was found.
- **Skatteverket national ID card (id-kort)**: applied for and completed
  entirely in person at a tax office, with staff filling in the necessary
  forms and capturing a photograph/fingerprints on the spot. No pre-fillable
  form was found.
- **Skatteverket SKV 2000 "Inkomstdeklaration 1"** (Taxes) — chosen. Unlike
  most of this registry's individual tax-return schemas, Sweden's return is a
  **personalized document with no publicly downloadable blank specimen**:
  Skatteverket pre-prints each taxpayer's own copy from third-party (employer,
  bank) reports and mails it to their registered address; a blank paper form
  can only be ordered through an authenticated e-service starting
  2026-04-10, or printed after an eID login to "Mina sidor". In place of a
  specimen PDF, Skatteverket maintains a dedicated, officially bilingual
  "contents of the income tax return" page that states verbatim: "Here you
  will find the headlines in the form 'Inkomstdeklaration 1, 2026' ('Income
  Tax Return 1, 2026') in English" — giving the exact Swedish box text and
  its own official English translation for every numbered box on the form.
  This is a genuine, current, government-authored field-by-field source, just
  delivered as an HTML page rather than a PDF.

## Sources examined

- **Document `(id, version)`:** `se/skatteverket/individual-income-tax-return` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Tax Agency (Skatteverket).
- **Primary source:** `https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/declaringtaxesforindividuals/howtofileyourtaxreturn/thecontentsoftheincometaxreturn.4.7be5268414bea064694c76b.html`
  ("The contents of the income tax return"), fetched directly via `curl` with a
  browser User-Agent (HTTP 200, no block) and parsed from the raw HTML
  (tags stripped programmatically, not summarized by a fetch tool), giving
  every box number (1.1 through 9.2, plus sections 17 and 18) with both its
  original Swedish text and Skatteverket's own official English translation.
- **Corroborating sources:** the SKV 2000 order/distribution page
  (`.../blanketterbroschyrer/blanketter/info/2000...html`, confirming the
  personalized/no-blank-specimen nature of the form and its mailing address),
  and general Skatteverket guidance on pre-printed amounts and returns being
  mailed to the registered address.
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| §1.1-1.7 'Income – Income from employment etc.' | `salariesBenefitsSicknessBenefits`, `compensationForExpenses`, `nationalRetirementAndOccupationalPension`, `privatePensionAndAnnuity`, `otherNonPensionableIncome`, `hobbyOrOtherSelfEmployedIncome`, `incomeFromAnnexesK10K10AK13` |
| §2.1-2.4 'Deductions — Income from employment etc.' | `journeysToAndFromWork`, `businessTrips`, `temporaryWorkDualResidenceAndJourneysHome`, `otherWorkRelatedExpenses` |
| §3.1 'General deductions' | `socialInsuranceChargesEuRegulation` |
| §4.1-4.5 'Basis for tax reductions' | `rotWork`, `rutWork`, `renewableElectricity`, `donations`, `sustainableTechnologyInstallation` |
| §5 'Basis for property charge' | `propertyChargeBasisHouses` |
| §6 'Basis for property tax' | `propertyTaxBasisHousesUndevelopedPlots` |
| §7.1-7.7 'Income - Capital' | `standardRateOfCapitalIncome`, `interestDividendsProfitK4SectionC`, `surplusFromRentalOfPrivateHousing`, `profitOnInvestmentFundShares`, `profitFromUnlistedInvestmentFundShares`, `profitK5K6ReversedDeferralK2`, `profitK7K8` |
| §8.1-8.8 'Deductions – Capital' | `interestExpensesLossK4SectionC`, `lossOnInvestmentFundShares`, `lossOnUnlistedInvestmentFundShares`, `lossK5K6`, `lossK7K8`, `investorsDeductionK11`, `interestExpensesUnsecuredLoans` |
| §9.1-9.2 'Foreign insurance — Yield tax' | `taxBaseEndowmentPolicyOrPepp`, `taxBasePensionInsurance` |
| §17 'Additional information' | `hasForeignIncome`, `foreignIncomeCategory`, `foreignIncomeCountry`, `foreignIncomeAmountSek`, `foreignTaxSettlementAmountSek`, `requestsRotRutReallocation`, `incomeDataIncorrectOrMissing`, `otherInformation` |
| §18 'Signature' | `signatureEmail`, `signatureTelephone`, `documents[].taxpayerSignature` |

## What is NOT independently confirmed / out of scope

- **Taxpayer identity header (`taxpayerPersonalIdentityNumber`, `taxpayerName`,
  `taxpayerAddress`) is not itself enumerated on Skatteverket's own
  numbered-box 'contents' page.** That page documents only the income/
  deduction/disclosure boxes, not the administrative cover of the physical
  form, and no blank specimen was available to visually confirm the header's
  exact layout (the return is personalized and has no public blank PDF — see
  above). These three fields are included because Skatteverket's own general
  guidance confirms returns are addressed to a specific taxpayer's
  personnummer and mailed to their registered address, and because an agent
  consuming this schema needs to know whose return it is describing — but
  this is a materially weaker sourcing grain than the numbered boxes
  themselves, disclosed honestly rather than presented as independently
  confirmed. A future reviewer with access to an actual specimen (e.g. after
  an authenticated "Mina sidor" login, out of scope here) should confirm the
  header's exact field set.
- **Sections 10-16 (Business activities, Interest allocation, Expansion funds
  tax, Reduction of social security contributions, General deductions for
  business, and the business-rental-property charge/tax bases) are
  deliberately not modelled.** They apply only to filers who also run a
  sole-proprietorship business (referencing separate Forms NE/N3A, themselves
  unmodelled) or own rental/industrial property, are a materially larger and
  different scope than the core individual return, and reference further
  un-modelled K-annexes (K4 through K15A/B) exactly as sections 1-9 already
  do for capital income/deductions — consistent with this registry's existing
  convention of deferring repeating/complex annex-referenced blocks rather
  than modelling them speculatively. The "Business closed" checkbox
  (tied to section 10) is deferred for the same reason.
- **K-annexes themselves (K4, K5, K6, K7, K8, K9, K10, K10A, K11, K12, K13,
  K15A/B) are not modelled.** Sections 7-8 only capture the aggregate amounts
  those annexes feed into the main return, matching how this registry already
  treats annex-fed totals elsewhere (e.g. `is/skatturinn/simplified-individual-tax-return`'s
  own annex-referenced income line).
- **Two threshold-gated deduction boxes (`journeysToAndFromWork`,
  `otherWorkRelatedExpenses`) collect the total amount, not the
  already-reduced deduction** — per the form's own English instructions
  ("Fill in the total amount"), the SEK 11,000/5,000 thresholds are applied
  by Skatteverket's own processing, not computed here.
- **No PDF-level `Required` flags exist at all** (there is no fillable
  AcroForm — the source is an HTML translation page, and the underlying
  physical form is personalized/pre-printed, not a blank fillable PDF).
  `required`/`requiredWhen` assignments are derived from which fields are
  inherently identifying (taxpayer header, signature contact) versus which
  describe optional circumstances (every numbered income/deduction/disclosure
  box), the same discipline this registry already applies to other
  non-AcroForm sources.
- **Live e-service parity.** Not screened this cycle — Skatteverket's own
  "Inkomstdeklaration 1" e-service (requiring Swedish eID) was not logged
  into; this document is sourced entirely from the public bilingual
  headlines page.
- **Address/name decomposition.** All addresses and names are modelled as
  single free-text strings, not a decomposed structure.
- **Swedish personnummer format.** `taxpayerPersonalIdentityNumber` validates
  against the general personnummer pattern (10- or 12-digit, optional
  hyphen/plus separator), not a jurisdiction-specific checksum, which no
  source examined this cycle publishes.

## Scope and jurisdiction notes

- Opens **Sweden's Taxes vertical**; Sweden now has 4 of its 6 verticals
  modelled (Business Formation GOV-2056, DMV GOV-2063, Visa GOV-2070, Taxes
  via this document). Sweden's other two verticals (Passport, National ID)
  were screened this cycle and found weak (in-person/eID-login flows with no
  field-by-field source; see "Research trail" above) — open backlog
  candidates for a future cycle with a stronger source.
- Scoped strictly to the core individual return (sections 1-9, 17-18); the
  business-activity and business-property sections (10-16) are out of scope
  for this version, a plausible fast-follow candidate.
- Two `requiredWhen`/`visibleWhen` pairs (`foreignIncomeCategory`,
  `foreignIncomeCountry`, `foreignIncomeAmountSek`, all gated on
  `hasForeignIncome equals true`) are the only conditional logic in this
  document — mirroring the form's own single foreign-income disclosure
  branch.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer logs into Skatteverket's
"Inkomstdeklaration 1" e-service (or obtains a real specimen paper form) to
confirm the exact taxpayer-identity header layout this version could not
independently verify, and checks whether the live e-service exposes any
field the bilingual headlines page does not — recording the outcome here,
shipping a new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Test run

A mock `conformance/se/skatteverket/individual-income-tax-return/1.0.0/application-packet.json`
scenario (Anna Lindqvist, a Swedish resident employed by a single employer in
Gothenburg, who owns her house, used RUT-eligible cleaning services, and
holds a small savings/investment account, with no foreign income or business
activity) was checked with a from-scratch script
(`/tmp/gov2091/check_conformance.mjs`, not committed — a disposable checker,
not registry tooling) that: (1) confirms every one of the schema's 48 fields
appears exactly once across `collectedValues`/`notApplicableFields`; (2)
confirms all effectively-required fields (static `required` plus
`requiredWhen`, gated by `visibleWhen`) are collected; (3) confirms no
not-applicable field is actually effectively required given the collected
values; (4) checks every collected value's `pattern`/`minLength`/`maxLength`/
`minimum`/`maximum`/`enum` constraint. Result: **0 errors** across all 48
fields (14 collected, 34 correctly marked not-applicable). Four mutation
tests confirmed the checker actually catches defects rather than passing
vacuously: (1) removing the required `taxpayerName` from `collectedValues`
correctly raised 2 errors (a coverage gap plus a missing-required-field
error); (2) setting `hasForeignIncome` to `true` while leaving
`foreignIncomeCategory`/`foreignIncomeCountry`/`foreignIncomeAmountSek`
not-applicable correctly raised 6 errors (each field flagged as both
"required but not collected" and "marked not-applicable but effectively
required" — confirming the `requiredWhen`/`visibleWhen` evaluator actually
runs); (3) setting `taxpayerPersonalIdentityNumber` to a non-personnummer
string correctly raised exactly 1 pattern-validation error; (4) adding an
invalid `foreignIncomeCategory` value outside its enum correctly raised
exactly 1 enum-validation error. The schema was also validated against the
GovSchema v0.3 meta-schema with `tools/validate.mjs` and
`tools/validate-ajv.mjs` (both pass, 324/324 documents) and
`discovery/check.mjs` (170 candidates / 155 published / 15 to author,
unaffected since this schema was not a tracked discovery candidate).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
