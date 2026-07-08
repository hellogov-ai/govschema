# Verification record — `ch/zh/sta/berufsauslagen` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Berufsauslagen

This is the recurring "GovSchema Standard Research" cycle (**GOV-1868**). The
prior cycle (GOV-1854), which authored the Wertschriftenverzeichnis
(`ch/zh/sta/wertschriften-und-guthabenverzeichnis`), left the remaining six
CH-ZH companion schedules as an open backlog list: Berufsauslagen,
Versicherungsprämien, Aus- und Weiterbildung, Liegenschaftenverzeichnis,
Schuldenverzeichnis, and Hilfsblatt A/B/G. This cycle picks Berufsauslagen
specifically because it is likely the single most commonly populated
companion schedule of the six: nearly every salaried filer in Switzerland
claims *some* work-related expense deduction (at minimum the flat-rate
"übrige Berufskosten" line), whereas the securities schedule closed last
cycle only applies to filers who hold investments. `CATALOG.md`'s own "Known
Gaps" list is updated by this cycle to move Berufsauslagen from the open list
to closed, leaving five remaining companion schedules.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/berufsauslagen` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (the same authority as the main return and the Wertschriftenverzeichnis;
  this form's own printed issuer is also "StA Form.", here "360").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-formulare/360%20Berufsauslagen%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 360 (2024) 12.25 — Berufsauslagen 2025," fetched directly
  (HTTP 200, `%PDF-1.4`, 71,793 bytes, no `/Encrypt`, no login/CAPTCHA/WAF
  gate) from the same tax-return landing page GOV-1847/GOV-1854 used,
  <https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>,
  which links this form directly next to the main return under the 2025
  "est-formulare" (Steuererklärungsformulare) listing. The link text and
  filename ("360 Berufsauslagen ZH 2025 HA DEF.pdf") match the main return's
  own reference to this schedule by name at lines 220/240 (Ziffer 11.1/11.2).
- **A note on the form's own print date.** Like the Wertschriftenverzeichnis
  (StA Form. 340, printed "(2023)"), this form's footer prints "StA Form. 360
  **(2024)** 12.25" even though its own cover page is titled "Berufsauslagen
  **2025**" throughout — the printed template was evidently last revised in
  2024 and is reused for the 2025 tax year with only the cover-page year
  updated. Disclosed as an observed detail, not treated as a discrepancy.
- **Companion Wegleitung, examined for rate/cap confirmation:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025" GOV-1847 used,
  fetched the same way (HTTP 200, `%PDF-1.7`, 1,497,565 bytes). Its pp.13-14
  ("Berufsauslagen [Ziffer 11]") restate, in prose, every rate and cap this
  form's own two pages already print numerically (CHF 700 flat bicycle/moped
  rate; CHF 5'200/CHF 3'300 commuting-cost caps; CHF 7.50/CHF 1'600 and
  CHF 15/CHF 3'200 meal-surcharge rates/caps; CHF 0.70/CHF 0.40 per-km
  car/motorcycle rates; the 3%-of-net-wage CHF 2'000-CHF 4'000 band; the
  20%-of-side-income CHF 800-CHF 2'400 band) plus the exact statutory wording
  of the four private-vehicle-use justifications (matching checkboxes
  2041-2044 verbatim) and a fuller explanation of the one line the form
  itself does not print a fixed cap for (line 2860/2861, extra costs for an
  out-of-town weekly residence — see scope decision below). Crucially, p.36
  carries an **official worked specimen of this exact form**: "Berufsauslagen
  2025, Person 1, Muster-Meister Felix, Kanton Zürich, Gemeinde Zürich,
  AHVN13 756.1234.5678.90" with CHF 700 at line 202 (bicycle flat rate), CHF
  1'600 at line 206 (capped employer-subsidized meal surcharge, both tax
  columns), CHF 2'515 at line 212 (other-costs flat-rate deduction, both tax
  columns), every other line blank, and a total of CHF 4'815 at line 220 for
  both the Staatssteuer and Bundessteuer columns (700 + 1'600 + 2'515 =
  4'815, confirmed by arithmetic).
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item, plus a `pdf-lib`
  AcroForm check (`form.getFields()`) and a `pdfjs-dist` per-page annotation
  check (`page.getAnnotations()`, filtered to `subtype === 'Widget'`). Both
  checks returned **zero** fillable widgets across both pages — the same
  flat, non-AcroForm, print/reference-facsimile shape as its two CH-ZH
  sibling schemas. Both pages were additionally **rendered to PNG**
  (`pdfjs-dist` + `node-canvas`, 2.5× scale) and visually cross-checked
  against the extracted text before any field name was assigned. This
  rendering pass is what resolved:
  - that Person 1's page alone carries the AHVN13 and Gemeinde boxes — the
    mirrored Person 2 page (p.2) omits both, confirming these are collected
    once per filing rather than once per person;
  - the exact three-box layout of the "1.3 Auto, Motorrad" sub-table (a
    two-row worksheet — workplace, workdays, km, trips/day, km/year,
    rate/km — feeding a single combined deduction box via a printed brace),
    which a naive text scan alone could not disambiguate from the
    surrounding checkbox labels ("Auto: CHF -.70 pro km," "Motorrad: CHF
    -.40 pro km," "geleastes Fahrzeug");
  - that each numbered line (e.g. "201 201," "220 220") prints the **same**
    box-reference number in both the Staatssteuer and Bundessteuer columns —
    i.e. one line number denotes one row with two amount cells, not two
    distinct box numbers — consistent with how the main return's own
    `professionalExpensesPerson1StateTax`/`FederalTax` fields both cite "line
    220," confirming the box-numbering convention carries through correctly
    from this schedule onto the main return;
  - that no signature/date/declaration block appears anywhere on either page
    (confirmed by rendering both pages in full) — this schedule transfers
    its totals onto the main return, whose own single signature block
    already covers the whole filing, so this document defines no
    `documents[]` attestation entry of its own.
  - the p.36 worked specimen described above, used to sanity-check this
    schema's own field layout and the state/fed shared-box-number convention
    before any mock data was authored.
- **Retrieved / reviewed:** 2026-07-08.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: the two-row private-vehicle worksheet is collapsed to one free-text field per person

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). Section 1.3's own worksheet has two printed rows (for a filer
who commutes to more than one workplace during the year), each with up to
seven distinct values (workplace, working days, km, trips/day, km/year,
rate/km, and the resulting per-row deduction), combined via a printed brace
into the single box-204/224 deduction total. Per this registry's established
treatment of exactly this situation elsewhere (the main return's own
`childrenInHouseholdDetails` and siblings; the Wertschriftenverzeichnis's own
`securitiesAndHoldingsDetails`), the worksheet is collapsed into one
`carMotorcycleCommutingDetailsPerson1`/`Person2` free-text field, with the
combined deduction kept as its own numeric field (`carMotorcycleDeductionPerson1StateTax`
and siblings) since that is the literal entry box printed on the form.

## Scope decision: statutory caps modelled directly on the affected fields

Unlike the main return (which deferred most caps/rates to the Wegleitung
since it does not print them on its own face), this schedule prints every
statutory rate and cap directly on its own two pages. Per the same pattern
the main return itself used for lines it *does* print a cap for (e.g.
`childcareCostsStateTax`'s CHF 25'000 cap), every capped line here carries the
matching `validation.minimum`/`maximum`: CHF 700 (bicycle/moped flat rate),
CHF 5'200/CHF 3'300 (commuting-cost subtotal, state/federal), CHF 1'600
(employer-subsidized meal surcharge), CHF 3'200 (fully-employee-borne meal
surcharge and shift/night-work compensation), CHF 2'000-CHF 4'000 (other
professional costs, flat rate), and CHF 800-CHF 2'400 (side-job expenses,
flat rate). The one line this schedule itself defers to the Wegleitung
(weekly-residence extra costs, line 2860/2861) is deliberately left
uncapped, since the Wegleitung confirms its total is a composite of an
uncapped actual-rent component, a capped meal component, and an
already-counted-elsewhere transport component — no single statutory ceiling
applies to the combined line.

## Scope decision: no Lohnausweis net-wage field, and the itemized-actual lines are pass-through amounts only

The 3%-of-net-wage flat-rate deduction (line 212/232) depends on a net-wage
figure drawn from the taxpayer's own salary certificate (Lohnausweis), which
belongs to the main return / the employer's own certificate, not to this
schedule — this document models only the resulting CHF deduction amount
actually entered in box 212/232, not the underlying net-wage computation.
Likewise, the "bzw. effektiv gemäss Aufstellung" lines (213/217/233/237) are
modelled as plain numeric transfer amounts, with the itemized statement
(Aufstellung) itself represented only as a gated `documents[]` supporting-
evidence requirement (`expenseItemizationAufstellung`), consistent with how
the main return and the Wertschriftenverzeichnis treat every other
itemized-statement reference throughout this registry.

## Field-by-field source mapping

- **Header** (p.1 for Person 1 only; p.2 for Person 2) → `ahvn13RemainingDigitsPerson1`,
  `gemeinde`, `namePerson1`, `vornamePerson1`, `arbeitgeberPerson1`,
  `arbeitsortStrassePerson1`, and their Person 2 counterparts (minus AHVN13/
  Gemeinde, not printed on Person 2's page).
- **1. Fahrkosten** (lines 201/221, 202/222, the 1.3 worksheet and its
  204/224 total, 205/225 Zwischentotal) → `publicTransitSubscriptionCostsPersonXStateTax`/
  `FederalTax`, `bicycleMopedFlatRatePersonXStateTax`/`FederalTax`,
  `carMotorcycleCommutingDetailsPersonX`, `carMotorcycleDeductionPersonXStateTax`/
  `FederalTax`, `commutingCostsSubtotalPersonXStateTax`/`FederalTax`.
- **2. Mehrkosten der Verpflegung** (lines 206/226, 208/228, 210/230 plus its
  "Anzahl Tage" box) → `mealSurchargeEmployerSubsidizedPersonXStateTax`/
  `FederalTax`, `mealSurchargeFullyEmployeeBornePersonXStateTax`/`FederalTax`,
  `shiftNightWorkDaysPersonX`, `shiftNightWorkCompensationPersonXStateTax`/
  `FederalTax`.
- **3. Übrige Berufskosten** (lines 212/232, 213/233) →
  `otherProfessionalCostsFlatRatePersonXStateTax`/`FederalTax`,
  `otherProfessionalCostsActualPersonXStateTax`/`FederalTax`.
- **4. Mehrkosten bei auswärtigem Wochenaufenthalt** (lines 2860/2861) →
  `weeklyResidenceExtraCostsPersonXStateTax`/`FederalTax`.
- **5. Auslagen bei Nebenerwerb** (lines 216/236, 217/237) →
  `sideJobExpensesFlatRatePersonXStateTax`/`FederalTax`,
  `sideJobExpensesActualPersonXStateTax`/`FederalTax`.
- **6. Total der Berufsauslagen** (lines 220/240) →
  `totalProfessionalExpensesPersonXStateTax`/`FederalTax`, `required: true`
  on both, since every filer using this schedule ultimately produces this
  total (even as the sum of zero-value lines) and it is this document's
  principal output, transferring directly to the main return's own
  `professionalExpensesPersonXStateTax`/`FederalTax` fields.
- **7. Begründung für die Benützung eines privaten Motorfahrzeuges** (lines
  2041-2044/2241-2244) → `reasonNoPublicTransportPersonX`,
  `reasonTimeSavingsOver1HourPersonX`, `reasonEmployerRequiredPersonX`,
  `reasonMedicalUnableToUsePublicTransportPersonX`.
- **Evidentiary references** → the 4 `documents[]` entries
  (`expenseItemizationAufstellung`, `weeklyResidenceItemizationAufstellung`,
  `employerConfirmationForRequiredVehicleUse`,
  `medicalCertificateForVehicleUse`), each `requiredWhen` its triggering
  field(s) across both persons.

## Mock-data test run

Per the issue's phase-3 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`all`/`any`/`not` `Condition` grammar as
GSP-0013 checked every `required`/`requiredWhen` constraint on both fields
and `documents[]` against three scenarios (fabricated, not copied from the
Wegleitung's own official specimen — see below for a note on how they were
cross-checked against it):

```
OK   Scenario 1: single filer, public-transit commuter, flat-rate other costs only
OK   Scenario 2: joint filers, Person 1 claims private-car commuting + weekly
                 residence + side-job actual costs; Person 2 claims bicycle
                 flat rate + shift-work meal surcharge
FAIL Negative control: private-car reason "Ständige Benützung ... Arbeitgeber"
     checked without the employer-confirmation document (expected FAIL)
    - MISSING required document: employerConfirmationForRequiredVehicleUse
```

**Scenario 1** models a single filer (Anna Furrer, Zürich) commuting by ZVV
public transit: `publicTransitSubscriptionCostsPerson1StateTax/FederalTax` =
CHF 1'020 (an annual regional pass, below both caps so no proration needed),
`otherProfessionalCostsFlatRatePerson1StateTax/FederalTax` = CHF 2'520 (3% of
a CHF 84'000 net wage, within the CHF 2'000-CHF 4'000 band), giving
`totalProfessionalExpensesPerson1StateTax/FederalTax` = CHF 3'540. All
Person 2 fields, all vehicle-reason checkboxes, and all `documents[]` are
absent/false — correctly accepted since none of their triggers fire.

**Scenario 2** models a joint filing. Person 1 (Marco Vogel) drives to a
single workplace 14 km away for 220 working days, claiming
`reasonNoPublicTransportPerson1` = true (with `employerConfirmationForRequiredVehicleUse`
correctly *not* required, since only the no-public-transport reason is
checked) and `carMotorcycleDeductionPerson1StateTax/FederalTax` = CHF 4'312
(220 days × 14 km × 2 (round trip) × CHF 0.70/km = CHF 4'312.00, within the
CHF 5'200 state cap and reflected identically in the CHF 3'300-capped
federal column at CHF 3'300 after the cap applies — the federal
`commutingCostsSubtotalPerson1FederalTax` is CHF 3'300, the capped value, not
the pre-cap CHF 4'312), plus `weeklyResidenceExtraCostsPerson1StateTax/FederalTax`
= CHF 6'200 (triggering `weeklyResidenceItemizationAufstellung`) and
`sideJobExpensesActualPerson1StateTax/FederalTax` = CHF 1'850 (triggering
`expenseItemizationAufstellung`). Person 2 (Sabine Vogel) claims
`bicycleMopedFlatRatePerson2StateTax/FederalTax` = CHF 700 and
`shiftNightWorkDaysPerson2` = 60 with `shiftNightWorkCompensationPerson2StateTax/FederalTax`
= CHF 900 (60 × CHF 15). Both totals and all three triggered `documents[]`
entries are present, and the run accepts the scenario.

The **negative control** reuses Scenario 2's Person 1 but sets
`reasonEmployerRequiredPerson1` = true (in addition to
`reasonNoPublicTransportPerson1`) without supplying
`employerConfirmationForRequiredVehicleUse`, confirming the evaluator
actually enforces `requiredWhen` on this specific `documents[]` entry rather
than trivially passing everything.

All three scenarios' commuting and meal/shift figures were separately
sanity-checked for internal arithmetic consistency against the Wegleitung's
own official p.36 specimen (CHF 700 bicycle flat rate; CHF 1'600 capped
meal surcharge; CHF 2'515 other-costs flat rate; total CHF 4'815) — i.e. the
same box-204/205/220 relationships (component amounts summing to the printed
total, with the commuting subtotal capped before the grand total is formed)
hold in this schema's own scenarios as in the government's own worked
example. No defects were found in the schema itself.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/berufsauslagen/1.0.0/schema.json
ok   registry/ch/zh/sta/berufsauslagen/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/berufsauslagen/1.0.0/schema.json
ok   registry/ch/zh/sta/berufsauslagen/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/zh/sta/berufsauslagen/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **The Lohnausweis net-wage figure** the 3%-of-net-wage flat rate is
  computed from — belongs to the main return / the employer's own salary
  certificate, not this schedule.
- **The itemized statement (Aufstellung)** a filer attaches when claiming
  actual costs above a flat rate for other professional costs, weekly
  residence, or side-job expenses — represented only as gated `documents[]`
  supporting-evidence requirements, not modelled field-by-field (its own
  shape is unbounded and form-free, unlike this document's printed table).
- **The two-row private-vehicle worksheet's per-row breakdown** — collapsed
  into `carMotorcycleCommutingDetailsPersonX`. See scope decision above.
- **The office-only fields** — none observed on either page of this form
  (unlike the main return and Wertschriftenverzeichnis, which each carry one
  office-only stamp/date box).

## Judgment calls

1. **`commutingCostsSubtotalPersonXStateTax`/`FederalTax` (the Zwischentotal,
   line 205/225) is modelled as its own field despite being a pure sum of
   three other already-captured fields.** Unlike the main return's own
   exclusion of pure arithmetic/transfer lines (justified there because the
   companion schedule is where such lines truly belong), this document *is*
   that companion schedule, and the Zwischentotal is where the CHF
   5'200/CHF 3'300 statutory cap is actually applied — a materially
   different, separately capped data point from the final total (line 220),
   consistent with how the Wertschriftenverzeichnis schema itself modelled
   both intermediate subtotals and a final total.
2. **`totalProfessionalExpensesPersonXStateTax`/`FederalTax` (line 220/240)
   are marked `required: true`; every other line is `required: false`.**
   The total is always filled in by every filer using this schedule
   (potentially as the sum of zero-value lines, e.g. a filer claiming only
   the flat-rate "übrige Berufskosten" minimum); every other line applies
   only to the specific commuting/meal/residence/side-job situation that
   filer is in.
3. **`shiftNightWorkDaysPersonX` is modelled as a plain `integer`, not
   validated against `shiftNightWorkCompensationPersonXStateTax`/`FederalTax`
   via `crossFieldValidation`.** The exact CHF-per-day rate a filer applies
   can legitimately differ from the simple headcount × CHF 15 arithmetic in
   edge cases (e.g. partial-year employment, a rate change never observed on
   this specific form), so the two are kept independently entered rather
   than cross-validated, consistent with this registry's general preference
   for not inventing derived-value enforcement the source form itself does
   not state as a hard rule.
4. **Amounts are modelled as plain `number` fields in whole CHF ("CHF ohne
   Rappen," printed on both pages' column headers)**, consistent with this
   registry's convention elsewhere of not adding a separate sub-unit field.
5. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and the Wertschriftenverzeichnis, since this
   is the same cantonal tax authority's own companion form.
6. **No live submission was attempted** — filing a real Swiss tax return or
   companion schedule is a real legal act with a real cantonal tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the Wegleitung — no TCP-level reset,
WAF, or CAPTCHA gate encountered, consistent with GOV-1847/GOV-1854's
findings that `zh.ch`'s own tax-forms domain is unblocked.

## Scope and jurisdiction notes

- This is Switzerland's third Taxes-vertical document (the second companion
  schedule to the main return, alongside the Wertschriftenverzeichnis), not
  a new vertical or jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `berufsauslagen`.
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, consistent with the main return and every other document in this
  registry. No `edition` member is used, consistent with this registry's
  existing treatment of other annual tax-year-specific schedules.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-08** (6
months), the same cadence as its two CH-ZH sibling documents. Because
`status` remains `draft`, a future review should prioritize: confirming the
2026-tax-year edition of this form, the main return, and the Wegleitung keep
the same box-reference numbering (201-220/221-240, 2041-2044/2241-2244,
2860/2861), and re-screening whether any of the five remaining companion
schedules (Versicherungsprämien, Aus- und Weiterbildung,
Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt A/B/G) has become
a tractable next candidate — Versicherungsprämien (Form 365, glimpsed
alongside this cycle's Wegleitung specimen page, p.36) is a reasonable next
guess given it shares the same flat, non-AcroForm shape and a similarly
broad filer base (nearly every filer pays some health/accident insurance
premium).
