# Verification record — `nl/belastingdienst/individual-income-tax-return-m-form` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived directly from the Belastingdienst's own official
M-biljet 2025 PDF. The full field-by-field comparison the practice requires
against the **live, authenticated Mijn Belastingdienst online screens** has
not been completed (this M-form is one of the few Dutch tax-filing paths
still offered as a paper form rather than only online), so this remains
`draft`, not `verified`.

## Why this cycle picked up the Netherlands income tax return

This is the recurring "GovSchema Standard Research" cycle
([GOV-836](/GOV/issues/GOV-836)). The prior cycle
([GOV-829](/GOV/issues/GOV-829)) added the Netherlands as this catalog's
tenth jurisdiction, authoring `nl/kvk/sole-proprietorship-registration-eenmanszaak`
(Business Formation) — but that left NL with only 1 of the 6 focus verticals
published. Taxes was independently the only vertical still open across all
9 prior jurisdictions (US/GB/IE/CA/NZ/AU/DE/SG/FR all closed —
see `spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` and
`fr/dgfip/income-tax-return-2042/1.0.0/VERIFICATION.md`), so this cycle
closes NL x Taxes, bringing Taxes to 10/10 and giving NL its second vertical.

## Why the M-form, not the standard resident (P) return

The Belastingdienst's own decision page
(belastingdienst.nl, "Hebt u de juiste aangifte?") states plainly:

- A filer who lived in the Netherlands the *entire* year — and had no
  business profit — must use the online return through **Mijn
  Belastingdienst**, which requires a DigiD-authenticated login. No
  downloadable paper template exists for that return; ordering a paper
  P-form requires calling the BelastingTelefoon and waiting up to 2 weeks.
- A filer who lived *entirely outside* the Netherlands the whole year (with
  Dutch income/assets) uses a separate online non-resident (`C`) service,
  also DigiD-gated.
- A filer who moved **into or out of** the Netherlands during the year (the
  scenario this document models) is the one population the Belastingdienst
  still ships as a **directly downloadable, fillable-structure M-biljet
  PDF** — no login required to obtain the template.

Consistent with this registry's established practice of preferring a
directly downloadable official source over reconstructing a login-gated
online flow from guidance prose (e.g.
`de/auswaertiges-amt/national-visa-application/1.0.0/VERIFICATION.md`), the
M-form was chosen as the authoritative starting point for NL's individual
income tax return, rather than guessing at the Mijn Belastingdienst screens.

## Sources examined

- **Document `(id, version)`:** `nl/belastingdienst/individual-income-tax-return-m-form` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Belastingdienst (Netherlands Tax Administration).
- **Primary source (field-by-field detail):**
  <https://odb.belastingdienst.nl/wp-content/uploads/2026/01/M-biljet-2025_90-versie.pdf>,
  the official M-biljet 2025 ("Aangifte Inkomstenbelasting, Premie
  volksverzekeringen, Inkomensafhankelijke bijdrage Zvw 2025"), versie 0.7 —
  24 september 2025, fetched **directly with no access block** (HTTP 200),
  linked from the Belastingdienst's own
  <https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/programmas_en_formulieren/aanvragen-m-formulier-2025>
  landing page.
- **Secondary source (channel/eligibility decision):**
  <https://www.belastingdienst.nl/wps/wcm/connect/nl/belastingaangifte/content/hoe-aangifte-inkomstenbelasting-doen>
  ("Aangifte inkomstenbelasting doen: online, met de app of op papier"),
  confirming the M/P/C channel split described above.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## PDF shape: text-layer extraction, numbered questions anchor every field

The M-biljet PDF is 76 pages (a cover/instructions section, 36 numbered
"aangiftebladen" carrying the return's own questions 1 through at least 69,
and a jaarstukken/annual-accounts booklet for entrepreneurs). It has no
`/AcroForm` interactive layer (a printed form with an embedded text layer,
not a fillable PDF); all pages were read with `pdfjs-dist`'s
`getTextContent()`. Every field in this document is sourced to the form's
own numbered question (e.g. `5a`, `10c`, `1j`), read directly off the
extracted text, not guessed or inferred.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Voorblad — persoonlijke gegevens, telefoonnummer, rekeningnummer, beconnummer, ondertekening | `initialsAndName` through `taxConsultantBeconNumber`, `declarationDate` |
| Question 1a-1d — emigratie-/immigratiedatum, buitenlandse periode, nationaliteit | `emigrationDate`, `immigrationDate`, `foreignPeriodCountryCode`, `foreignPeriodFrom`, `foreignPeriodTo`, `nationalityCountryCode` |
| Question 1e-1j — verzekeringsplicht en kwalificerend buitenlands belastingplichtige flowchart | `compulsorilyInsuredInNL2025` through `qualifyingNonResidentTaxpayer` |
| Question 2, 2a-2c — fiscale partner (heel jaar / binnenlandse periode) | `hadSpouseOrCohabitant2025`, `fiscalPartnerAllYear2025`, `fiscalPartnerDomesticPeriodOnly` |
| Question 3a-3d — fiscale partner gegevens | `partnerInitialsAndName` through `divorceOrSeparationRequestDate`, and the voorblad's partner-signature line as `fiscalPartnerHasSigned` |
| Question 4a-4b — periode belastingplicht | `domesticPeriodMonths` |
| Question 5a-5f — loon en ziektewetuitkeringen uit Nederland | `hadDutchEmploymentIncome` through `tipsForeignPeriod` |
| Question 6a-6f — AOW, pensioen, lijfrente en andere uitkeringen uit Nederland | `hadDutchPensionIncome` through `annuitySurrenderForeignPeriod` |
| Question 7a-7b — vrijgestelde inkomsten internationale organisatie | `hadExemptInternationalOrgIncome` through `exemptPensionAmount` |
| Question 8a — loon buiten Nederland | `hadForeignEmploymentIncome`, `foreignEmployerNameAndAddress`, `foreignWageAmount` |
| Question 9a — pensioen en uitkeringen buiten Nederland | `hadForeignPensionIncome`, `foreignBenefitProviderNameAndAddress`, `foreignPensionAmount` |
| Question 10a-10e — reisaftrek openbaar vervoer | `hadPublicTransportCommute` through `commutingDeductionForeignPeriod` |
| Question 11a-11f — inkomsten uit overig werk | `hadOtherWorkIncome` through `otherWorkWithheldTax` |

## What is NOT independently confirmed (out of scope), and sourcing caveats

- **Everything from question 12 onward is out of scope.** Question 12
  (result from making assets available to a fiscal partner/minor
  children/a company with a substantial interest) and question 13 (value of
  business-related assets) are the boundary into a much larger sub-schedule:
  questions 14-23 (business profit / self-employment, requiring the
  separate jaarstukken/annual-accounts booklet), box 2 substantial-interest
  income, and questions 51-69+ (box 3 savings-and-investments income —
  extensively redesigned for the 2025 tax year's "werkelijk rendement"
  actual-yield reform following the Dutch Supreme Court's box 3 rulings,
  including per-property WOZ-value computations and a foreign-tax-credit
  computation). Each is a distinct, self-contained sub-schedule at least as
  large as the 55 fields modelled here; the same main-form/schedule split
  already established for `us/irs/individual-income-tax-return-1040`
  (Schedules out of scope) and `fr/dgfip/income-tax-return-2042` (annex
  forms out of scope).
- **Multi-country foreign periods are simplified to one country.** Question
  1c's own instructions allow listing more than one country/period if a
  filer lived in several countries during 2025; this document models
  `foreignPeriodCountryCode`/`foreignPeriodFrom`/`foreignPeriodTo` as a
  single slot, the same kind of fixed-slot simplification as
  `fr/dgfip/income-tax-return-2042`'s two-declarant-column precedent.
- **Question 1j's country-specific flowchart is simplified to two outcome
  booleans.** The source form's own flowchart branches separately for
  Suriname/Aruba residents, Belgium residents (with a further split on
  which partner had Dutch-taxed income), and EU/EEA/Switzerland/Bonaire/
  Saba/Sint Eustatius residents (subject to the qualifying-non-resident-
  taxpayer conditions) — each combination changes what a filer must report
  for the domestic period. `hadDutchIncomeOrAssetsDuringForeignPeriod` and
  `qualifyingNonResidentTaxpayer` capture the flowchart's outcome rather
  than every branch; the field description directs a filer to the source
  toelichting for the country-by-country detail, the same technique used
  for the DE Auswärtiges Amt visa schema's simplified eligibility gates.
- **Single-employer/single-provider simplification.** Questions 5a, 6a,
  8a, and 9a all read "werkgever(s)"/"uitkeringsinstantie(s)" (plural) on
  the source form, meaning a filer with more than one Dutch employer,
  Dutch benefit payer, foreign employer, or foreign benefit payer repeats
  the same question per source. This document models one primary
  slot per question, consistent with the FR/DE precedent of a fixed slot
  count rather than an open-ended array.
- **Question 6d's cross-reference to question 94 is not modelled.**
  The source form itself notes that an annuity surrender amount must also
  be entered at question 94 (in the personal-deductions section, itself
  out of scope) — flagged here rather than silently dropped.
- **No live Mijn Belastingdienst walkthrough.** Creating a real,
  identity-verified DigiD account is not available in this environment, so
  the practice's live-screen comparison step (as opposed to the paper form
  the online service is also built from, per the Belastingdienst's own
  channel-equivalence framing) has not been completed.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`validation`
constraint in `schema.json`, using a one-off Node condition evaluator (not
committed to the repo) implementing the same `equals`/`notEquals`/`in`/
`greaterThan`/`all`/`any`/`not` grammar as GSP-0013's `condition` schema.

**Scenario 1 — emigrant, fiscal partner all year, Dutch employment income**
(`conformance/.../application-packet-emigrant.json`, 51/80 fields
populated): J. de Vries emigrated from the Netherlands to Germany on 1 July
2025, had a fiscal partner for all of 2025, Dutch employment income and a
public-transport commuting deduction during the domestic period, and no
Dutch income or assets during the foreign period (so the
`qualifyingNonResidentTaxpayer` gate correctly does not apply).

**Scenario 2 — immigrant, single, foreign employment/pension income**
(`conformance/.../application-packet-immigrant.json`, 47/80 fields
populated): A. Okafor immigrated to the Netherlands from Germany on 1 April
2025, has no fiscal partner, had Dutch employment income after moving, and
had foreign (German) employment and pension income plus other-work income
during the domestic period, with `hadDutchIncomeOrAssetsDuringForeignPeriod`
and `qualifyingNonResidentTaxpayer` both `true`.

Both runs:

```
PASS — mock data satisfies every type/required/requiredWhen/visibleWhen/validation constraint in nl/belastingdienst/individual-income-tax-return-m-form v1.0.0.
PASS — mock data satisfies every type/required/requiredWhen/visibleWhen/validation constraint in nl/belastingdienst/individual-income-tax-return-m-form v1.0.0.
```

**Negative control:** the evaluator was also run against a deliberately
broken copy of scenario 1 (a required field removed, a required-when
partner-signature field removed, and a malformed 5-digit BSN in place of the
required 9-digit pattern). It correctly failed with all three defects
reported:

```
FAIL — 3 issue(s):
  - PATTERN fail: burgerservicenummer='12345' !~ ^[0-9]{9}$
  - MISSING required field: fiscalPartnerHasSigned
  - MISSING required field: employerName
```

This confirms the two passing scenarios are a meaningful test, not a
vacuously permissive evaluator. No schema defects were found during this
test run (unlike `fr/dgfip/income-tax-return-2042`'s GOV-763 cycle, which
caught two real `notEquals`-vs-`greaterThan` gating bugs before commit).

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/nl/belastingdienst/individual-income-tax-return-m-form/1.0.0/schema.json
ok   registry/nl/belastingdienst/individual-income-tax-return-m-form/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/nl/belastingdienst/individual-income-tax-return-m-form/1.0.0/schema.json
ok   registry/nl/belastingdienst/individual-income-tax-return-m-form/1.0.0/schema.json [v0.3]
```

## Why most fields here are optional

Unlike the pre-filled-return shape of `de/finanzamt/income-tax-return-elster`
or `fr/dgfip/income-tax-return-2042`, the M-form is a from-scratch paper
declaration — but most of its income categories (Dutch pension, exempt
international-organisation income, foreign employment/pension income,
commuting deduction, other-work income) still only apply to a subset of
filers. `required: true` is reserved for identity/cover-sheet fields every
filer supplies, the residency/period fields the domestic/foreign split
depends on, and the eligibility-gate booleans (`fieldRole: eligibility`)
that determine which downstream question block applies.

## Time-versioning and the `edition` axis (flagged spec gap)

The M-biljet is genuinely time-versioned — its own printed edition ("M
2025", "Versie 0.7 - 24 september 2025") pins it to tax year 2025, the same
shape as every other tax-return schema in this registry. Spec v0.3's
`edition.scheme` enum remains **closed** to `us-tax-year` / `gb-tax-year` /
`award-year` (SPEC.md §5.7) — the Netherlands' calendar-year aangifte fits
neither existing scheme without the same misleading-scheme-name problem
GSP-0019 already flagged. This is the **eighth** reference schema to hit
this exact gap, after IE Form 11S, NZ IR3, CA T1, AU myTax, SG Form B1, DE
ELSTER, and FR form n°2042 — published at the plain, non-edition registry
path (`registry/nl/belastingdienst/individual-income-tax-return-m-form/1.0.0/schema.json`)
as a workaround, consistent with all seven prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3.
- `compulsorilyInsuredInNL2025`, `hadDutchIncomeOrAssetsDuringForeignPeriod`,
  `qualifyingNonResidentTaxpayer`, and the six `had*Income` gates all use
  `fieldRole: eligibility` in the presentational sense established
  elsewhere in this registry (GSP-0014 §2) — each changes which downstream
  fields apply, not a pass/fail eligibility determination for the process
  itself.
- Country codes (`foreignPeriodCountryCode`, `nationalityCountryCode`,
  `countryOfResidenceCode`, `partnerCountryOfResidenceCode`) are modelled
  as a 3-letter pattern per the source form's own instruction ("Een
  landcode bestaat altijd uit 3 letters"), not an enum, since the form does
  not print a closed country-code list.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` Procedure step 2 against the live, authenticated
Mijn Belastingdienst "M-aangifte" online screens (an identity-verified
DigiD account), confirms the exact online-screen grouping of the questions
modelled here, and records the outcome here — shipping a new schema version
if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2026 M-biljet edition is published,
since the source content itself changes annually.
