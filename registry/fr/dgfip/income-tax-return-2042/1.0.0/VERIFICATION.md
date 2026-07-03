# Verification record — `fr/dgfip/income-tax-return-2042` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived directly from DGFiP's own official form PDF and
cross-checked against impots.gouv.fr's and service-public.gouv.fr's guidance
pages. The full field-by-field comparison the practice requires against the
**live, authenticated impots.gouv.fr "espace particulier" online screens**
has not been completed, so this remains `draft`, not `verified`.

## Why this cycle picked up France's income tax return

This is the recurring "GovSchema Standard Research" cycle
([GOV-763](/GOV/issues/GOV-763)). The prior cycle
([GOV-756](/GOV/issues/GOV-756)) ran a fresh 9-jurisdiction x 6-vertical
coverage audit (AU/CA/DE/FR/GB/IE/NZ/SG/US x DMV/Passport/Taxes/National
ID/Business Formation/Visa) after every catalog candidate in the original
jurisdiction set had been exhausted. That audit found France the weakest
single jurisdiction — 0 schemas in Taxes, National ID & Civic Documents,
Business Formation, and Visa, despite DMV and Passport both already closed
for FR (`fr/ants/vehicle-registration-certificate`,
`fr/ants/passport-application-first-adult`). This document closes the FR x
Taxes cell.

## Sources examined

- **Document `(id, version)`:** `fr/dgfip/income-tax-return-2042` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Direction Générale des Finances Publiques (DGFiP).
- **Primary source (field-by-field detail):**
  <https://www.impots.gouv.fr/sites/default/files/formulaires/2042/2026/2042_5535.pdf>,
  the official form n°2042 (Cerfa 10330), 2025 edition, form code
  `2025TIR135`, fetched **directly from impots.gouv.fr with no access
  block** (HTTP 200) via the form's own landing page
  (<https://www.impots.gouv.fr/formulaire/2042/declaration-des-revenus>).
  Unlike several other jurisdictions' tax-form hosts already recorded in
  this registry (Germany's `formulare-bfinv.de` SPA shell, e.g. — see
  `de/finanzamt/income-tax-return-elster/1.0.0/VERIFICATION.md`), this is a
  direct-from-source PDF with no mirror or Wayback fallback needed.
- **Secondary sources (flow/process/deadlines):**
  <https://www.impots.gouv.fr/formulaire/2042/declaration-des-revenus> (the
  form's own landing page, confirming online filing via impots.gouv.fr is
  the mandatory default channel and listing the supplementary forms
  (2042-C, 2042-RICI, 2042-C-PRO, 2042-K/IOM) this document defers to) and
  <https://www.service-public.gouv.fr/particuliers/vosdroits/R1281?lang=en>
  (an official English-language guidance page independently describing the
  same income/deduction/family-situation categories the PDF itself carries
  box codes for).
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## PDF shape: text-layer extraction, box codes anchor every field

The PDF has no `/AcroForm`/`/XFA` interactive layer (it is the plain
printed form image with an embedded text layer, not a fillable PDF) —
`pdfjs-dist`'s `getFieldObjects()` is not applicable. All 6 pages were read
with `pdfjs-dist`'s `getTextContent()`. Every income/deduction/credit box
on this form carries the DGFiP's own printed alphanumeric box code (e.g.
`1AJ`, `2DC`, `4BA`, `6NS`, `7UD`, `8HV`); every field this document sources
to one of those codes was read directly off the extracted text, not
guessed or inferred from a description elsewhere. The état-civil,
family-situation, and address sections carry no box codes (a plain-text
layout) but do carry the same printed instructional sentences the sibling
`fr/ants/passport-application-first-adult` schema already used as
`sourceRef` quotes for the equivalent état-civil fields — the same
technique is applied here.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| p.2 "situation du foyer fiscal en 2025" checkboxes M/C/D/V/O and half-share cases L/P/F/T | `maritalStatus`, `isSingleParent`, `raisedChildAloneFiveYears`, `hasDisabilityCardOrPension`, `spouseHasDisabilityCardOrPension` |
| p.2 "personnes à charge" cases F/G/H/I/R/J/N and "Renseignements sur vos enfants" | `numberOfDependentChildrenUnder18` through `numberOfMarriedOrFamilyDependentAdultChildren` |
| p.1 état civil, déclarant 1 and déclarant 2 blocks | `declarant1Title` through `countryOfBirthDeclarant2` |
| p.1 "adresse au 1er janvier 2026" and "Statut" | `addressStreet` through `coTenantName` |
| p.1 first-time-filer / returning-filer block, p.6 "rattachement" checklist | `isFirstTimeFiler` through `parentsNameAndAddress` |
| p.3 section 1 "traitements, salaires, pensions, rentes" boxes `1AJ`-`1BK` | `salaryDeclarant1` through `actualExpensesDeductionDeclarant2` |
| p.3 section 2 "revenus de capitaux mobiliers" boxes `2DC`/`2TS`/`2TR`/`2CH`/`2BH`/`2AB`/`2OP` | `taxableDividends` through `optsForProgressiveTaxScale` |
| p.4 section 4 "revenus fonciers" boxes `4BE`-`4BZ` | `microFoncierReceipts` through `filesSpecialForm2044` |
| p.4 section 6 "charges déductibles" boxes `6DE`-`6QW` | `deductibleCSGOnCapitalIncome` through `newlyDomiciledInFranceIn2025` |
| p.4 section 7 "réductions et crédits d'impôt" boxes `7UD`-`7DG` | `donationsToCharityJanToOct` through `householdHasDisabilityCard` |
| p.4 section 8 "prélèvement à la source et divers" boxes `8HV`-`8TK` | `withholdingOnSalariesPensionsDeclarant1` through `foreignIncomeWithFrenchTaxCredit` |
| p.2 "informations — coordonnées bancaires" mandate text | `ibanNumber`, `bicCode`, `authorizesDgfipDirectDebitMandate` |
| p.1 signature block "À"/"Le" | `declarationPlace`, `declarationDate` |
| p.5 "attestation d'hébergement"; p.6 first-time-filer document checklist | `documents[]`: `identityDocumentCopy`, `leaseAgreementCopy`, `hostProofOfResidence`, `hostingAttestation`, `bankDetailsRIB` |

## What is NOT independently confirmed (out of scope), and sourcing caveats

- **Every annex form the main return itself defers to** is entirely out of
  scope: n°2044 (rental-property income under the actual-expense regime —
  only its summary carry-forward boxes `4BA`/`4BL` are modelled here),
  n°2042-C-PRO (self-employed/BIC/BNC/BA income), n°2042-RICI (the detailed
  breakdown behind most of section 7's boxes), n°2042-K/IOM (overseas-
  territory investment credits), and n°3916/3916-bis (foreign bank
  accounts and foreign life-insurance contracts, boxes `8TT`/`8UU` are
  modelled only as the checkbox gate, not the annex's own content). This
  mirrors the same main-form/annex split already established for
  `de/finanzamt/income-tax-return-elster` (Anlagen out of scope) and
  `us/irs/individual-income-tax-return-1040` (Schedules out of scope).
- **Dependent children's own income is not modelled.** The section 1 income
  boxes (salary, pensions, etc.) have a real third and fourth column on the
  source form for "1re/2e personne à charge" — a working minor child's own
  income can be declared on the parents' return. Only the two adult
  declarants' columns are modelled, matching this registry's existing
  `us/irs/individual-income-tax-return-1040` precedent of a fixed
  declarant/dependent slot count rather than an open-ended array.
- **Mid-year address change not modelled.** The source form's own
  "changements d'adresse" sub-block (a prior address if the filer moved
  during 2025, or a newer current address if they moved again in 2026) has
  no box code and affects a minority of filers each year; left out of
  scope rather than guessed at, the same kind of narrow-line-item cut
  already made in the DE ELSTER and AU myTax schemas for single-purpose
  edge cases.
- **Niche single-purpose exemption boxes are out of scope**: tip income
  (`1PB`-`1PE`), overtime-hours/RTT exemption (`1GH`-`1JH`), value-sharing
  bonus exemption (`1AD`-`1DV`), household-employee flat-rate allowance
  (`1GA`-`1JA`), non-resident/foreign-source salary variants (`1AF`-`1DG`),
  associate/manager income under CGI art. 62 (`1GB`-`1JB`), and several
  similarly narrow section-2/section-4/section-8 sub-lines. These are
  genuine boxes on the source form but each applies to a small filer
  subpopulation; omitted explicitly rather than silently, consistent with
  the DE ELSTER and AU myTax precedent of curating line items rather than
  transcribing every box on a main form this dense.
- **Bank-details requiredness is a documented judgment call, not a
  guess-avoidance gap.** The source text says a RIB must "obligatoirement"
  be attached, but does not state whether an already-enrolled filer whose
  account is unchanged is asked to resupply it every year — `ibanNumber`,
  `bicCode`, `authorizesDgfipDirectDebitMandate`, and the `bankDetailsRIB`
  document are all modelled as optional (`required: false`) rather than
  asserting the stronger unconditional claim the source text's own wording
  would suggest.
- **No live "espace particulier" walkthrough.** Creating a personal
  impots.gouv.fr tax account requires real identity/tax-number verification
  not available in this environment, so the field-by-field comparison the
  practice requires against the live online screens (as opposed to the
  paper form both channels are built from) has not been completed.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`enum`
constraint in `schema.json`, using a one-off Node/Python condition
evaluator (not committed to the repo) that implements the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `condition` schema:

**Scenario 1 — married couple, homeowner, 2 dependents, returning filer**
(54/115 fields populated): Julien Moreau and Camille Petit, a married
couple in Lyon filing jointly with two dependent children, salaried income
for both declarants, some investment income, a PER retirement-savings
contribution, a charitable donation, and home-service expenses.

**Scenario 2 — single parent, first-time filer, tenant, shared custody,
alimony, rental income** (32/115 fields populated): Sophie Bernard, a
single first-time filer in Nantes renting her home, with one child in
shared custody, alimony paid to the other parent, and rental income
reported under the actual-expense regime (carried from form n°2044).

Both runs:

```
PASS — mock married-couple, 2-dependents, homeowner, returning-filer scenario satisfies every type/required/requiredWhen/visibleWhen/enum constraint in fr/dgfip/income-tax-return-2042 v1.0.0.
PASS — mock single-parent, first-time-filer, tenant, shared-custody scenario satisfies every type/required/requiredWhen/visibleWhen/enum constraint in fr/dgfip/income-tax-return-2042 v1.0.0.
```

Scenario 2 also correctly triggered the conditional `documents[]` entries:
`identityDocumentCopy` (first-time filer), `leaseAgreementCopy` (tenant),
and `form2044` (non-zero `taxablePropertyIncome`) all evaluated as
required, while scenario 1 (returning filer, homeowner, no rental income)
correctly required none of them.

This test run caught and fixed two real defects before this document was
committed: `maritalStatusChangeDate` and `spouseFiscalNumber` had
originally been made `requiredWhen` the filer's *current* marital status
was married/pacsed — which would have wrongly forced every long-married
couple to supply a "date of this year's marriage" and a legacy
merge-dossier tax number they don't have; both are now plain optional
fields with a corrected description (they apply only to a marriage/Pacs
that happened *during* the return's own tax year). A related latent bug
was also fixed generically: two `requiredWhen`/`visibleWhen` conditions
originally used `notEquals: 0` against an optional amount field
(`otherAlimonyPaid`, `taxablePropertyIncome`) — since an *absent* field is
`notEquals` any number including `0`, this would have wrongly forced the
gated field/document even when the amount was never provided at all. All
four instances were changed to `greaterThan: 0`, which correctly evaluates
to not-satisfied when the gating amount is absent.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/fr/dgfip/income-tax-return-2042/1.0.0/schema.json
ok   registry/fr/dgfip/income-tax-return-2042/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/fr/dgfip/income-tax-return-2042/1.0.0/schema.json
ok   registry/fr/dgfip/income-tax-return-2042/1.0.0/schema.json [v0.3]
```

## Why most fields here are optional

Like `de/finanzamt/income-tax-return-elster`,
`au/ato/individual-tax-return-mytax`, and
`sg/iras/individual-income-tax-return-formb1`, this document's defining
shape is **reviewing a pre-filled return**: impots.gouv.fr pre-populates
known salary, pension, and capital-income data reported by employers and
financial institutions before the taxpayer opens the return. Fields are
optional for the same two reasons recorded for those sibling documents:
(a) genuine applicability (most income/deduction/credit lines only apply to
some filers), and (b) the pre-fill shape itself. `required: true` is
reserved for fields every filer supplies or confirms regardless of
pre-fill: marital status, both declarants' core identity fields (when a
second declarant applies), home address, housing status, the first-time-
filer gate, and the declaration place/date.

## Time-versioning and the `edition` axis (flagged spec gap)

Form n°2042 is genuinely time-versioned — its own form code (`2025TIR135`)
and printed edition ("DÉCLARATION DES REVENUS 2025") pin it to tax year
2025, the same shape as every other tax-return schema in this registry.
Spec v0.3's `edition.scheme` enum remains **closed** to `us-tax-year` /
`gb-tax-year` / `award-year` (SPEC.md §5.7) — France's calendar-year
déclaration de revenus fits neither existing scheme without the same
misleading-scheme-name problem GSP-0019 already flagged. This is the
**seventh** reference schema to hit this exact gap, after IE Form 11S, NZ
IR3, CA T1, AU myTax, SG Form B1, and DE ELSTER — published at the plain,
non-edition registry path
(`registry/fr/dgfip/income-tax-return-2042/1.0.0/schema.json`) as a
workaround, consistent with all six prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3.
- `declarant2*` fields are gated on `maritalStatus in [married, pacsed]` —
  a couple's Pacs (civil partnership) files exactly one joint return in
  France, the same shape as a marriage, hence the shared gate.
- `isFirstTimeFiler` uses `fieldRole: eligibility` in the same
  presentational sense already established elsewhere in this registry
  (GSP-0014 §2) — it changes which downstream fields/documents apply, not
  a pass/fail eligibility determination for the process itself.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated impots.gouv.fr "espace
particulier" online screens (an identity-verified personal tax account),
confirms the bank-details requiredness question and the exact online-screen
grouping of the sections modelled here, and records the outcome here —
shipping a new schema version if discrepancies are found (VERSIONING.md
§3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2026 edition of form n°2042 is
published, since the source content itself changes annually.
