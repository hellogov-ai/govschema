# Verification record — `ch/zh/sta/steuererklaerung-natuerliche-personen` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up canton Zürich's Taxes vertical

This is the recurring "GovSchema Standard Research" cycle (**GOV-1847**). The
prior cycle (GOV-1840) opened Switzerland as the registry's 27th jurisdiction
via the St.Gallen DMV form and explicitly screened Taxes as a candidate,
flagging it as genuinely strong but deferring it:

> "Canton Zürich's own tax office (`zh.ch`) publishes both an online-filing
> portal (`ZHprivateTax`...) **and** a genuine, current, unauthenticated, flat
> (non-AcroForm) PDF main declaration for individuals... plus companion PDFs
> (securities/holdings inventory, professional-expenses, insurance-premiums
> schedules) and a 40-page official Wegleitung... This is a genuinely strong,
> open backlog candidate for Switzerland's Taxes vertical — not pursued to a
> full schema this cycle only because DMV was already picked... A future
> cycle should pursue this directly rather than re-screening."

This document closes that gap, giving Switzerland its **2nd of 6 verticals**
(Switzerland previously had only DMV; Visa and domestic Passport are
confirmed dead ends per GOV-1840; Business Formation and National ID are
confirmed dead ends per GOV-1840; National ID unscreened prior to GOV-1840
but confirmed dead end that cycle).

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/steuererklaerung-natuerliche-personen` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (the form's own printed issuer, "StA Form. 300"; address Bändliweg 21,
  8090 Zürich, per the Wegleitung's own back-cover contact block).
- **Primary source (the return itself):**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-formulare/300%20STE%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 300 (2025) 12.25," the current 2025-tax-year 4-page base
  return, fetched directly (HTTP 200, `%PDF-1.4`, 99,652 bytes, no
  `/Encrypt`, no login/CAPTCHA/WAF gate) from the Kantonales Steueramt
  Zürich's own tax-return landing page,
  <https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>.
  Byte size and filename match exactly what the prior cycle's (GOV-1840)
  screening record described, confirming that characterization was accurate
  and current.
- **Primary source (field-by-field instructions):**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — "Wegleitung zur Steuererklärung 2025" (40 pages, 1,497,565 bytes),
  fetched the same way. This document restates several lines' statutory caps
  and rates that the return itself does not print (e.g. the pillar-3a
  CHF 7'258/36'288 caps, the CHF 25'000/25'800 childcare cap, the
  CHF 20'600/10'300 donation ceiling, the 5%-of-net-income medical-cost
  floor, and the insurance-premium deduction ceilings), quoted directly into
  this schema's field descriptions.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction succeeded cleanly on both PDFs. A separate `pdf-lib` AcroForm
  check (`form.getFields()`) and a `pdfjs-dist` annotation-layer check
  (`page.getAnnotations()`, filtered to `subtype === 'Widget'`) both returned
  **zero** form-field widgets across all 4 pages of the main return — a flat
  print/reference facsimile PDF (completed on paper in block letters, or
  filed electronically via the authenticated `ZHprivateTax` online portal —
  see the return's own footnote directing filers to
  `www.zh.ch/steuererklaerung`), not a fillable AcroForm. Every field below
  was read from the return's own printed, numbered lines and cross-checked
  against the Wegleitung's own explanatory sections. Because the return's
  personal-particulars section places Person 1 and Person 2's fields in two
  visually adjacent columns that a naive single-axis line-grouping merges
  into one interleaved string, this extraction re-ran with full `(x, y)`
  coordinates per text item (not just `y`-bucketed lines) to correctly
  attribute each label to its own column before assigning field names — the
  same class of column-disambiguation problem flagged, but not fully
  resolved, for `ch/sg/stva/gesuch-lernfahr-fuehrerausweis`'s own signature
  block; here it fully resolved cleanly because the two columns' `x`
  positions (person 1 ≈ 142-350, person 2 ≈ 355+) never overlap.
- **Retrieved / reviewed:** 2026-07-08.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: base main declaration only, companion schedules excluded

The main return references several distinct, separately-published companion
PDFs by name next to specific lines: **Wertschriftenverzeichnis** (securities
and holdings inventory, lines 150/400), **Berufsauslagen** (Form 360,
professional-expenses schedule, lines 220/240), **Versicherungsprämien**
(Form 365, insurance-premiums schedule, line 270), **Aus- und
Weiterbildung** (Form 367, further-education costs, line 292),
**Liegenschaftenverzeichnis** (real-estate register, lines 188/421/422),
**Schuldenverzeichnis** (debts register, lines 250/470), and **Hilfsblatt
A/B/G** (self-employment worksheets, lines 120-123/430), plus several
smaller ad hoc worksheets ("Aufstellung über behinderungsbedingte Kosten,"
"Aufstellung über Krankheits- und Unfallkosten"). Modelling all of these
alongside the main return in one session would be a substantially larger
scope than any other income-tax schema in this registry (the same reasoning
`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` applied to the Czech
return's four Přílohy).

This document therefore models the **main 4-page declaration only**: every
numbered line the taxpayer enters directly on this return, whether or not
that line's own value is computed off-form with the help of one of the named
companion schedules (the same treatment `cz/mf`'s own `capitalIncomeTaxBase`
(ř. 38) received for a line that sits directly on the base return but derives
from an annex). Each companion schedule is represented only as a
`documents[]` supporting-evidence requirement, gated on the corresponding
main-form line being greater than zero — never as its own set of modelled
fields. Left out, as an open backlog candidate for a future cycle: fully
modelling any one of the seven companion schedules in its own right (most
promisingly the Wertschriftenverzeichnis, since securities income/wealth is
likely the most commonly-populated companion schedule for a typical filer).

## Scope decision: computed and capped-derivative lines excluded

Per this registry's established treatment of income-tax schemas elsewhere
(`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`, `pt/at/declaracao-rendimentos-irs-modelo-3`,
`pl/mf/zeznanie-pit-37`), a line that is a **pure arithmetic function of
other lines already captured as fields** is not itself modelled:

| Line(s) | Formula / nature | Why excluded |
|---|---|---|
| 199 | "Total der Einkünfte, zu übertragen auf Seite 3, Ziffer 19" | pure transfer/carry-forward of the income total |
| 299 | "Total der Abzüge, zu übertragen in Ziffer 20" | pure transfer/carry-forward of the deductions total |
| 310 | Ziffer 19 (=199) − Ziffer 20 (=299) | pure arithmetic |
| 350 | Ziffer 21 (=310) abzüglich Ziffern 22.1 (320) und 22.2 (324) | pure arithmetic |
| 390 | Ziffer 23 (=350) abz. Ziff. 24.1-24.3 (370+372+374+365) | pure arithmetic |
| 398 | Ziffer 25 (=390) − 26.1 (394) − 26.2 (396) | pure arithmetic |
| 460 | sum of lines 400-430 | pure arithmetic |
| 490 | Ziffer 33 (=460) − Ziffer 34 (470) | pure arithmetic |
| 498 | Ziffer 35 (=490) − 36.1 (494) − 36.2 (496) | pure arithmetic |
| 134-137 | `pensionAnnuityRowNAmountPersonN` × `...PercentPersonN` / 100 | computed from the already-modelled Betrag/Prozente sub-boxes (960-967) |
| 256 | `annuityPaymentsGrossAmount` (2561) × the ESTV-published Leibrenten taxable-portion rate | a rate the Wegleitung states is published separately by the federal tax administration (ESTV), not printed on this return |
| 260, 261 | min(`pillar3aContributionPerson1`/`Person2`, the statutory pillar-3a cap) | a capped derivative of an already-modelled field (262/263), per this registry's treatment of statutory-cap-derived lines |

## Field-by-field source mapping

- **Representative block** (all optional) → `representativeNameOrFirm`
  through `representativeUidChe`. Completed only if a trustee/tax advisor is
  authorized to receive requests and assessment rulings on the taxpayer's
  behalf.
- **Personal, occupational, and family particulars** (p.1) →
  `person1DateOfBirth` through `person2OrdinaryPensionFundContributions`.
  Extracted with full `(x, y)` coordinates to correctly separate the
  form's two side-by-side "Person 1"/"Person 2" columns (see Extraction
  method). **Person 1's own name is not itself a field on this document**:
  the paper form is mailed pre-addressed by the tax office (an address
  window), so only Person 2 (a spouse/registered partner newly declared on
  a joint return) has an explicit first-name box on this page — disclosed
  rather than silently omitted (Judgment call 1).
- **Dependents** (p.1 tables) → `childrenInHouseholdDetails` through
  `supportedPersonsOutsideHouseholdDetails`, each collapsing a small
  repeating table into one free-text field, the same convention this
  registry uses elsewhere (e.g. `cz/mf`'s `dependentChildrenDetails`).
- **Income** (p.2, lines 100-188) → `employmentIncomeMainPerson1` through
  `netRealEstateIncome`. Unlike the deductions section, every income line
  has a single amount column (income being computed the same way for state
  and federal tax), confirmed via per-item `x`-coordinate inspection of the
  column header ("CHF ohne Rappen," one column, vs. the deductions page's
  two "Staatssteuer"/"Bundessteuer" columns).
- **Deductions** (p.3, lines 220-396) →
  `professionalExpensesPerson1StateTax` through
  `taxableIncomeAllocatedAbroad`. Confirmed via `(x, y)` inspection that
  most deduction lines carry **two independent entry boxes** (state-tax and
  federal-tax columns, since several deduction caps differ between the two
  — e.g. the CHF 25'000 vs. CHF 25'800 childcare cap, the CHF 7'258 pillar-3a
  cap being federally uniform but the box still duplicated) — modelled as
  two sibling fields per line (`...StateTax`/`...FederalTax`), except line
  365 (spouse/partner allowance), which the source form prints with **only
  one** box (federal-tax column; the state tax handles married-couple relief
  through its tariff rather than a fixed deduction here) — modelled as a
  single `spouseOrPartnerAllowanceFederalTax` field, disclosed rather than
  fabricating a non-existent state-tax counterpart (Judgment call 2).
- **Wealth** (p.4, lines 400-498) → `securitiesAndClaimsWealth` through
  `wealthAllocatedAbroad`. Single-column throughout (Switzerland's federal
  tax has no wealth-tax component, so only the cantonal/communal wealth tax
  applies) — confirmed the same way as the income page.
- **Pension capital benefits and gifts/inheritances** (p.4, lines 510-519) →
  `capitalBenefitDeathOrDisabilityAmount` through
  `giftOrInheritanceGivenValue`. The gift/inheritance date fields
  (`giftOrInheritanceReceivedDate`/`GivenDate`) are modelled as full `date`
  values even though the source form prints only day/month boxes next to a
  fixed, pre-printed "2025" — disclosed in each field's own description
  (Judgment call 3).
- **Filing and signature** (p.4) → `placeOfSigning`, `dateOfSigning`, plus
  the `declarationAttestation` `documents[]` entry reproducing the form's own
  completeness/truthfulness statement verbatim. The ink signature lines
  themselves ("Unterschrift Person 1"/"Unterschrift Person 2") carry no
  fillable widget and are not modelled as fields, consistent with this
  registry's standard treatment of signature-only lines.
- **Companion-schedule references** → the 18 `documents[]` entries, each
  `category: supporting-evidence` (or, for the completeness declaration,
  `attestation`), gated with `requiredWhen` on the corresponding main-form
  line(s) being greater than zero.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`all`/`any`/`not` `Condition` grammar as
GSP-0013 checked every `type`/`required`/`requiredWhen`/`validation`
constraint and every `documents[].requiredWhen` in `schema.json` against
four scenarios:

```
OK   Scenario 1: single employed taxpayer, pillar 3a contribution
OK   Scenario 2: married couple, child, pension annuity, donation,
                 real estate, capital benefit
FAIL Negative control: capitalBenefitDeathOrDisabilityAmount without
                       payment date (expected FAIL)
    - MISSING required field: capitalBenefitDeathOrDisabilityPaymentDate
FAIL Negative control 2: donation without documents/declarationAttestation
                         (expected FAIL)
    - MISSING required document: donationAndOtherDeductionsStatement
    - MISSING required document: declarationAttestation
```

Scenario 1 exercises the single-filer path (employment income, a capped
pillar-3a contribution, the salary-certificate and pillar-3a-certificate
document requirements). Scenario 2 exercises the joint-filer path (a second
person's date of birth and first name, a child in the household triggering
the fixed per-child state/federal allowance, a private pension/annuity with
its amount/percentage sub-fields, a charitable donation, a real-estate
holding, and a capital benefit paid on death/disability with its payment
date). The two negative controls confirm the evaluator actually enforces
`requiredWhen` on both fields and documents (a capital-benefit amount without
its payment date, and a donation without its supporting statement or the
declaration attestation) rather than trivially passing everything. No
defects were found in the schema itself.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0/schema.json
ok   registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0/schema.json
ok   registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **Wertschriftenverzeichnis** (securities and holdings inventory) — a
  distinct, larger, independently-published PDF referenced at income line
  150 and wealth line 400; left as an open backlog candidate, likely the
  strongest next sub-cycle target since it is the most commonly-populated
  companion schedule.
- **Berufsauslagen** (Form 360, professional-expenses schedule, lines
  220/240), **Versicherungsprämien** (Form 365, insurance-premiums
  schedule, line 270), **Aus- und Weiterbildung** (Form 367, further-education
  costs, line 292), **Liegenschaftenverzeichnis** (real-estate register,
  lines 188/421/422), **Schuldenverzeichnis** (debts register, lines
  250/470), and **Hilfsblatt A/B/G** (self-employment worksheets, lines
  120-123/430) — each a distinct, separately-published PDF; same reason.
- **The ad hoc worksheets** for disability-related costs and medical/accident
  costs (each an "Aufstellung"/"Merkblatt"-referenced form, not itself
  independently numbered like the schedules above) — same reason.
- **Every pure computed/arithmetic or capped-derivative line** — see the
  table above.
- **The office-only fields** ("Bitte nicht ausfüllen," "Zustellung /
  Einreichungsfrist / Frist erstreckt bis / gemahnt am / Eingang" on p.1) —
  completed by the tax office, not the taxpayer, the same class of exclusion
  this registry applied to `ch/sg/stva/gesuch-lernfahr-fuehrerausweis`'s own
  "Bitte nicht ausfüllen" box.

## Judgment calls

1. **Person 1's own name is not modelled as a field.** The paper return is
   mailed pre-addressed by the tax office (an address window on the form),
   so the source PDF's text layer has no "Name"/"Vorname" label for Person 1
   between the title block and the representative section — only Person 2
   (a spouse/registered partner newly declared on a joint return) has an
   explicit `Vorname` box. Disclosed in `person2FirstName`'s own description
   rather than fabricating a Person 1 name field the source does not show.
2. **`spouseOrPartnerAllowanceFederalTax` (line 365) has no state-tax
   counterpart.** Confirmed via `(x, y)` coordinate inspection that this
   line prints only one amount box (federal-tax column); Zürich's state tax
   grants married-couple relief through its tariff structure rather than a
   fixed per-couple deduction on this line, unlike the federal computation.
3. **`giftOrInheritanceReceivedDate`/`GivenDate` are modelled as full `date`
   values even though the source form prints only day/month boxes next to a
   pre-printed, fixed "2025."** GovSchema's `date` type requires a full
   `YYYY-MM-DD` value (§6.2); this schema's own field description states
   that the year is fixed at the tax year by the form itself, so a producer
   or consumer populating this field for a 2025 return should set the year
   accordingly, rather than the schema fabricating a day/month-only type the
   spec does not define.
4. **Every deduction line with two visible amount boxes is modelled as two
   sibling fields (`...StateTax`/`...FederalTax`), never collapsed into
   one.** Unlike a split identity-number comb box (a single logical value
   spread across adjoining boxes with no separator, e.g. `ch/sg`'s
   `ahvNumber`), each state/federal pair here is a **materially independent
   value** — the applicable statutory cap frequently differs between the
   two columns (e.g. CHF 25'000 vs. CHF 25'800 for childcare), so collapsing
   them would silently discard a real distinction the source draws.
5. **`pillar3aContributionPerson1`/`Person2` (lines 262/263, the "eff. CHF"
   actual-contribution boxes) are modelled; the corresponding capped
   deductible amounts (lines 260/261) are not** — the latter are a pure
   statutory-cap function of the former (see the computed-lines table),
   consistent with this registry's practice of modelling the taxpayer's own
   raw input rather than a value the taxpayer (or an agent) is expected to
   derive by applying a published cap.
6. **`annuityPaymentsGrossAmount` (line 2561) is modelled; the corresponding
   deductible Ertragsanteil (line 256) is not** — the Wegleitung states the
   deductible portion is computed via a rate the Swiss federal tax
   administration (ESTV) publishes separately (not printed on this return),
   the same class of external-rate-dependent computed value this registry
   excludes elsewhere (e.g. `cz/mf`'s own treatment of statutory-rate-based
   totals).
7. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   consistent with `ch/sg/stva/gesuch-lernfahr-fuehrerausweis`'s own
   treatment of Swiss cantonal forms: Zürich's tax administration
   independently designs and publishes its own return (distinct in layout
   and detail from any other canton's own return), even though the
   substantive tax base for the direct federal tax component is federally
   harmonized (DBG). This document models Zürich's own return only, not a
   claim that every Swiss canton's natural-person tax return is identical.
8. **No live submission was attempted** (see Mock-data test run) — filing a
   real Swiss tax return is a real legal act with a real cantonal tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` — no TCP-level reset, WAF, or CAPTCHA gate encountered. This is
consistent with the prior cycle's finding that `zh.ch` itself is unblocked
(GOV-1840 encountered an access obstacle only with a *different*, already-
encrypted `zh.ch`-hosted PDF — the St.Gallen cycle's DMV candidate
comparison — not with this document's own tax-return PDFs, which are
unencrypted and unauthenticated).

## Scope and jurisdiction notes

- This is Switzerland's first Taxes-vertical document, giving it 2 of its 6
  verticals (DMV, Taxes); Visa, Passport, Business Formation, and National ID
  remain confirmed dead ends per GOV-1840.
- `id` uses `sta` (the form's own printed "StA" abbreviation for Steueramt,
  the cantonal tax office) as the authority-directory segment, the same
  own-abbreviation convention `ch/sg/stva` and `cz/mf` already use in this
  registry.
- `id`'s own slug, `steuererklaerung-natuerliche-personen`, is the return's
  own official title ("Steuererklärung für natürliche Personen"), ASCII-
  folded per this registry's existing naming convention.
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, consistent with every other document in this registry authored under
  v0.3. No `edition` member is used, consistent with this registry's
  existing treatment of other annual tax-return schemas
  (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`,
  `pl/mf/zeznanie-pit-37`, `pt/at/declaracao-rendimentos-irs-modelo-3`), none
  of which use the `edition` axis despite also being tax-year-specific forms.
- Amounts are modelled as plain `number` fields in whole CHF ("CHF ohne
  Rappen" — CHF without centimes, per the form's own column header), with
  the unit noted in each field's own `label`/`description` rather than a
  separate currency sub-field, the same convention `cz/mf` and
  `pt/at/declaracao-rendimentos-irs-modelo-3` use for their own
  local-currency amounts.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-08** (6
months). Because `status` remains `draft` (this document was authored from
the canonical PDF form and its own Wegleitung but has not been checked
against a live `ZHprivateTax` electronic filing), a future review should
prioritize: confirming the 2026-tax-year edition's own statutory CHF figures
for the fixed-rate deductions/allowances (pillar 3a caps, childcare cap,
donation ceiling, child/supported-person/spouse allowances) have not
changed, and re-screening whether the Wertschriftenverzeichnis (or another
companion schedule) has become a tractable single-session candidate.
