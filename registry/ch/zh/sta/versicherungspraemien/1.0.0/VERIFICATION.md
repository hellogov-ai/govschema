# Verification record — `ch/zh/sta/versicherungspraemien` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Versicherungsprämien

This is the recurring "GovSchema Standard Research" cycle (**GOV-1875**). The
prior cycle (GOV-1868/GOV-1871), which authored Berufsauslagen
(`ch/zh/sta/berufsauslagen`), left five remaining CH-ZH companion schedules
as an open backlog list, and specifically flagged Versicherungsprämien
(Form 365) as "a reasonable next guess given it shares the same flat,
non-AcroForm shape and a similarly broad filer base (nearly every filer pays
some health/accident insurance premium)." This cycle confirms that guess:
health insurance is mandatory for nearly every Swiss resident (obligatorische
Krankenpflegeversicherung under the KVG), so this schedule likely applies to
a larger share of filers than either prior companion schedule (the
securities inventory applies only to investors; Berufsauslagen only to
employed persons). `CATALOG.md` is updated by this cycle to move
Versicherungsprämien from the open list to closed, leaving four remaining
companion schedules (Aus- und Weiterbildung, Liegenschaftenverzeichnis,
Schuldenverzeichnis, Hilfsblatt A/B/G).

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/versicherungspraemien` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (the same authority as the main return and its two other companion
  schedules; this form's own printed issuer is also "StA Form.", here "365").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-formulare/365%20Versicherung%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 365 (2024) 12.25 — Versicherungsprämien 2025," fetched
  directly (HTTP 200, `Content-Type: application/pdf`, `%PDF-1.4`, 56,091
  bytes, no `/Encrypt`, no login/CAPTCHA/WAF gate) from the same tax-return
  landing page GOV-1847/GOV-1854/GOV-1868 used,
  <https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>,
  which links this form directly next to the main return and its other
  companion schedules under the 2025 "est-formulare" listing. The link text
  and filename ("365 Versicherung ZH 2025 HA DEF.pdf") match the main
  return's own reference to this schedule by name at line 270 (Ziffer 15).
- **A note on the form's own print date.** Like its two CH-ZH sibling
  companion schedules, this form's footer prints "StA Form. 365 **(2024)**
  12.25" even though its own cover page is titled "Versicherungsprämien
  **2025**" — the printed template was evidently last revised in 2024 and
  reused for the 2025 tax year with only the cover-page year updated.
  Disclosed as an observed detail, not treated as a discrepancy.
- **Companion Wegleitung, examined for rate confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025" GOV-1847/GOV-1868
  used, fetched the same way (HTTP 200, `%PDF-1.7`, 1,497,565 bytes). Its
  pp.13-14 ("Versicherungsprämien und Zinsen von Sparkapitalien [Ziffer
  15]") restate, in prose, the same lookup rates this form's own Section B
  already prints (CHF 5'800/CHF 3'700 married-with-pillar-2/3a-contributions;
  CHF 8'700/CHF 5'550 married-without; CHF 2'900/CHF 1'800
  other-with-contributions; CHF 4'350/CHF 2'700 other-without; CHF
  1'300/CHF 700 per child), so no separate Wegleitung lookup was required to
  fill in a missing figure. Crucially, **PDF page 36** — the very same page
  that carries the Berufsauslagen worked specimen GOV-1868 used, with the
  Versicherungsprämien specimen stacked immediately beneath it — carries an
  **official worked specimen of this exact form**: "Versicherungsprämien
  2025, Muster-Meister Felix und Regula, Kanton Zürich, Gemeinde Zürich,
  AHVN13 756.1234.5678.90" with CHF 7'260 at line 601 (private health
  premiums), CHF 850 at line 602 (accident premiums), CHF 3'843 at line 603
  (life/annuity premiums), no entry at line 604 (savings interest), CHF
  11'953 at line 607 (subtotal, arithmetically confirmed: 7'260 + 850 +
  3'843 = 11'953), no entry at line 605 (premium reduction), CHF 11'953 at
  line 606 (Total A, equal to the subtotal since no reduction was entered),
  CHF 5'800 state/CHF 3'700 federal at line 611 (the married-with-pillar-2/3a
  bracket), no entry at line 612 (this couple is married, so the "Übrige
  Steuerpflichtige" line does not apply), CHF 2'600 state/CHF 1'400 federal
  at line 613 (arithmetically confirmed: 2 children × CHF 1'300 = CHF 2'600
  state, 2 × CHF 700 = CHF 1'400 federal), no entry at lines 614/615 (no
  supported-person deduction claimed), CHF 8'400 state/CHF 5'100 federal at
  line 616 (Total B, confirmed: 5'800 + 2'600 = 8'400 state, 3'700 + 1'400 =
  5'100 federal), and a final CHF 8'400 state/CHF 5'100 federal at line 270
  (Total C, confirmed: min(11'953, 8'400) = 8'400 state, min(11'953, 5'100)
  = 5'100 federal — Total B is the binding constraint in both tax columns of
  this specimen).
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item, plus a `pdf-lib`
  AcroForm check (`form.getFields()`) and a `pdfjs-dist` per-page annotation
  check (`page.getAnnotations()`, filtered to `subtype === 'Widget'`). Both
  checks returned **zero** fillable widgets on this form's single page — the
  same flat, non-AcroForm, print/reference-facsimile shape as its three
  CH-ZH sibling schemas. Coordinate-based extraction (rather than a naive
  top-to-bottom text dump) was essential here because:
  - the recurring digit-like glyph sequence ("13211"/"3211"/"3 211"/"2113"
    and similar permutations) that appears immediately below or beside every
    numeric entry line throughout this form (and its Wegleitung
    reproduction) is a **box-outline rendering artifact** — a custom
    "comb"/box-drawing font whose glyph codepoints decode as literal ASCII
    digit characters under naive text extraction — not real form content.
    Coordinate inspection confirmed these tokens consistently sit at the
    same x-position as (and a few PDF-units below) each genuine numeric
    label, and never carry a value consistent with any printed rate,
    confirming they mark empty input-box positions rather than data;
  - Section A's amount column (lines 601-607) sits at a single x-position
    (~x499 on the live form), confirming this section produces **one**
    combined figure used identically against both tax columns' caps in
    Section B/C, unlike Section B itself (lines 611-616) and Section C
    (line 270), which are genuinely two-column (Staatssteuer/Bundessteuer)
    throughout;
  - lines 614 and 615 print the **identical** label ("Zusätzlicher Abzug für
    jede unterstützungsbed. Person") on two separate rows, each with an
    entry-box artifact in only one column (614 in the state-tax x-range,
    615 in the federal-tax x-range) — confirmed only by comparing each
    row's x-position against the Staatssteuer/Bundessteuer column headers'
    own x-position, not decidable from text content alone;
  - the worked specimen's overlaid numeric values sit at distinct
    coordinates from both the form's printed reference-table numbers and
    the box-outline artifacts, and were matched to their owning line by
    x-position (state-tax-column x-range vs. federal-tax-column x-range)
    before being cross-checked arithmetically as described above.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: this schedule is completed once per household, not once per person

Unlike Berufsauslagen (a 2-page form, one page per person) or several of the
main return's own per-person income/deduction line pairs, this form has a
single page with a single Name/Vorname/AHVN13/Gemeinde header and a single
Section A amount column. This matches how the main return's own line 270
(`insurancePremiumsAndSavingsInterestStateTax`/`FederalTax`) is itself a
single household-level field, not a Person-1/Person-2 pair — insurance
premiums and savings interest are pooled and capped at the household level
under this schedule's own statutory design (a married couple's combined cap
is a single, larger figure — e.g. CHF 5'800 vs. CHF 2'900 state-tax — rather
than two separately-capped individual amounts).

## Scope decision: the two discrete Section B lookup values are modelled with `validation.enum`, not `minimum`/`maximum`

Section B's married/other brackets each print exactly **two** valid
statutory figures (e.g. state-tax married: CHF 5'800 or CHF 8'700 — nothing
in between is valid), depending on whether pillar 2/3a contributions were
made. This differs from Berufsauslagen's caps, which were genuine continuous
ranges (e.g. `otherProfessionalCostsFlatRatePerson1StateTax`'s CHF
2'000-CHF 4'000 band is a true 3%-of-net-wage computation bounded by a floor
and ceiling). A `minimum`/`maximum` pair here would incorrectly accept
values between the two printed figures (e.g. CHF 6'500), which the form
itself never permits — the filer is transcribing one of exactly two printed
reference numbers, not computing a value along a continuum. `validation.enum`
(available in the v0.3 `nonFileValidation` keyword set alongside
`pattern`/`minLength`/`maxLength`/`minimum`/`maximum`) is the more accurate
constraint: `marriedMaxDeductionStateTax` → `[5800, 8700]`,
`marriedMaxDeductionFederalTax` → `[3700, 5550]`, `otherMaxDeductionStateTax`
→ `[2900, 4350]`, `otherMaxDeductionFederalTax` → `[1800, 2700]`.

## Scope decision: married/other lines (611/612) are mutually exclusive by construction, with no separate marital-status field

The form's own "1. Für Verheiratete" / "2. Übrige Steuerpflichtige" rows are
alternatives (only a married filer completes line 611; only every other
filer completes line 612) — the form has no separate marital-status
checkbox on this specific page (marital status is established once, on the
main return itself). Consistent with the registry's general preference for
not inventing fields the source form itself does not print, this schema
does not add a `hasPillar2Or3aContributions` or `isMarried` boolean; each
field's own description states the criterion the filer applies when
choosing which printed figure to transcribe.

## Scope decision: `childDeductionCount`/`supportedPersonDeductionCount*` are separate `integer` fields, paired with their own resulting CHF amount

Each of Section B.3's three rows prints its own "Anzahl:" headcount box
feeding a resulting CHF deduction. Consistent with how Berufsauslagen
modelled `shiftNightWorkDaysPersonX` as its own `integer` field alongside
its resulting CHF compensation field, this schema models each headcount
(`childDeductionCount`, `supportedPersonDeductionCountStateTax`,
`supportedPersonDeductionCountFederalTax`) as its own field rather than only
capturing the resulting CHF amount. No cross-field arithmetic enforcement
(e.g. `crossFieldValidation` asserting `additionalChildDeductionStateTax ===
childDeductionCount * 1300`) is added, for the same reason Berufsauslagen
did not enforce the day-count/compensation relationship: this registry's
general preference against inventing derived-value enforcement the source
form itself does not state as a hard rule (a filer could legitimately round
differently, or a rate could change mid-year in an edge case never observed
on this specific form).

## Scope decision: `totalPremiumsAndInterestPaid` (606) and `totalMaxDeductionStateTax`/`FederalTax` (616) are `required: true`, alongside the final `finalInsurancePremiumDeductionStateTax`/`FederalTax` (270)

The form explicitly labels three distinct totals: a non-final "Zwischentotal"
(607, **not** required, consistent with Berufsauslagen's own treatment of
its own Zwischentotal at lines 205/225) and two major, always-completed
totals explicitly labelled "Total ... (A)" (606) and "Total der Abzüge ...
(B)" (616) that a filer completes regardless of how many of the preceding
lines are zero. Because Section C's own final figure (270) is defined as
"the lower of (A) or (B)," both operands are equally essential outputs of
this schedule, not merely one final total with disposable intermediate
steps — so both are marked `required: true` alongside 270, extending
Berufsauslagen's own precedent (which required only the single final total
that transferred onward, because that schedule had only one such
transferring total) to this schedule's three distinct labelled totals.

## Field-by-field source mapping

- **Header** (single household entry) → `ahvn13RemainingDigits`, `gemeinde`,
  `name`, `vorname`.
- **A. Bezahlte Versicherungsprämien und Zinsen von Sparkapitalien** (lines
  601-607) → `privateHealthInsurancePremiums`,
  `privateAccidentInsurancePremiums`, `privateLifeAnnuityInsurancePremiums`,
  `savingsInterest`, `premiumsAndInterestSubtotal`,
  `premiumReductionsReceived`, `totalPremiumsAndInterestPaid`.
- **B. Maximaler Abzug für Versicherungsprämien und Zinsen von
  Sparkapitalien** (lines 611-616) → `marriedMaxDeductionStateTax`/
  `FederalTax`, `otherMaxDeductionStateTax`/`FederalTax`,
  `childDeductionCount`, `additionalChildDeductionStateTax`/`FederalTax`,
  `supportedPersonDeductionCountStateTax`,
  `additionalSupportedPersonDeductionStateTax`,
  `supportedPersonDeductionCountFederalTax`,
  `additionalSupportedPersonDeductionFederalTax`,
  `totalMaxDeductionStateTax`/`FederalTax`.
- **C. Abzug** (line 270) → `finalInsurancePremiumDeductionStateTax`/
  `FederalTax`, transferring onto the main return's own
  `insurancePremiumsAndSavingsInterestStateTax`/`FederalTax` fields (Ziffer
  15).

## Mock-data test run

Per the issue's phase-3 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) loaded
`conformance/ch/zh/sta/versicherungspraemien/1.0.0/application-packet.json`
against `schema.json` and checked:

```
OK   All 5 required fields present (totalPremiumsAndInterestPaid,
     totalMaxDeductionStateTax, totalMaxDeductionFederalTax,
     finalInsurancePremiumDeductionStateTax,
     finalInsurancePremiumDeductionFederalTax)
OK   All 4 validation.enum fields (marriedMaxDeductionStateTax/FederalTax)
     hold one of their 2 permitted values
OK   No unknown keys present in the mock data beyond this schema's own
     26 field names
OK   Arithmetic: 6000 + 400 + 1200 + 300 = 7900 (premiumsAndInterestSubtotal)
OK   Arithmetic: 7900 - 200 = 7700 (totalPremiumsAndInterestPaid, (A))
OK   Arithmetic: 5800 + 1300 = 7100 (totalMaxDeductionStateTax, (B) state)
OK   Arithmetic: 3700 + 700 = 4400 (totalMaxDeductionFederalTax, (B) federal)
OK   Arithmetic: min(7700, 7100) = 7100 (finalInsurancePremiumDeductionStateTax, (C) state)
OK   Arithmetic: min(7700, 4400) = 4400 (finalInsurancePremiumDeductionFederalTax, (C) federal)
```

The mock scenario (fabricated, not copied from the Wegleitung's own official
specimen) models a married couple in Winterthur ("Peter und Claudia Meier"),
both of whom made pillar 2/3a contributions during 2025 (`marriedMaxDeductionStateTax`
= CHF 5'800, `marriedMaxDeductionFederalTax` = CHF 3'700), with CHF 6'000 in
private health-insurance premiums, CHF 400 in accident-insurance premiums,
CHF 1'200 in life/annuity-insurance premiums, and CHF 300 of savings
interest, less a CHF 200 premium reduction not already netted at source,
for a Total (A) of CHF 7'700. Claiming the additional deduction for their
one child (`childDeductionCount` = 1, CHF 1'300 state/CHF 700 federal), their
Total (B) is CHF 7'100 state/CHF 4'400 federal, both lower than (A) in this
scenario, so the schedule's final deduction (line 270) is CHF 7'100 state/CHF
4'400 federal — a case where Section B, not Section A, is the binding
constraint, distinct from the Wegleitung's own official specimen (where
Section B alone was also binding, but at different figures), giving
independent confirmation that the "lower of (A) or (B)" logic in this
schema's own field descriptions is exercised correctly for a scenario this
schema's own author fabricated rather than merely copying the government's
own worked numbers.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/versicherungspraemien/1.0.0/schema.json
ok   registry/ch/zh/sta/versicherungspraemien/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/versicherungspraemien/1.0.0/schema.json
ok   registry/ch/zh/sta/versicherungspraemien/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/zh/sta/versicherungspraemien/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **The underlying securities/holdings inventory** (Wertschriften- und
  Guthabenverzeichnis) that produces the `savingsInterest` figure this
  form's own line 604 transfers in from — belongs to that companion
  schedule (`ch/zh/sta/wertschriften-und-guthabenverzeichnis`), not this one.
- **Any supporting-evidence document.** Neither this form nor the Wegleitung's
  own Ziffer-15 explanatory section (pp.13-14) request a receipt,
  certificate, or itemized statement to be filed alongside this schedule's
  own figures — unlike Berufsauslagen (which gates several `documents[]`
  entries on its own itemized-actual-cost lines) or the main return's own
  pillar-3a/donation lines. Premium reductions are reconciled directly
  between the taxpayer and the health insurer, not substantiated on this
  form. Accordingly this schema omits the `documents[]` array entirely
  (permitted, since it is not a required top-level member).
- **The office-only fields** — none observed on this form's single page
  (unlike the main return and Wertschriftenverzeichnis, which each carry one
  office-only stamp/date box).

## Judgment calls

1. **Section A (lines 601-607) is modelled as a single set of fields with no
   Staatssteuer/Bundessteuer split, while Sections B and C are modelled with
   a state/federal pair for every line.** This mirrors the form's own
   physical layout exactly (Section A's amount column sits at one
   x-position; Sections B/C each have two clearly labelled column headers)
   and is confirmed by the Wegleitung's own explanatory text, which
   describes "(A)" as a single combined figure compared independently
   against each tax column's own "(B)" maximum.
2. **`validation.enum` (rather than `minimum`/`maximum`) on the four
   Section B lookup fields.** See the dedicated scope-decision section
   above — a discrete two-value lookup, not a continuous range, and
   `enum` is the more accurate constraint of the two available in the v0.3
   `nonFileValidation` keyword set.
3. **`totalPremiumsAndInterestPaid` (606) and `totalMaxDeductionStateTax`/
   `FederalTax` (616) are `required: true`, extending Berufsauslagen's
   single-final-total precedent to this schedule's three distinct labelled
   totals.** See the dedicated scope-decision section above.
4. **No `crossFieldValidation` enforcing the printed per-unit rates** (e.g.
   `additionalChildDeductionStateTax === childDeductionCount * 1300`) is
   added, consistent with this registry's general preference against
   inventing derived-value enforcement beyond what the source form itself
   states as a hard, universally-applicable rule.
5. **Amounts are modelled as plain `number` fields in whole CHF ("CHF ohne
   Rappen," printed on the form's own header)**, consistent with this
   registry's convention elsewhere of not adding a separate sub-unit field.
6. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its other two companion schedules,
   since this is the same cantonal tax authority's own companion form.
7. **No live submission was attempted** — filing a real Swiss tax return or
   companion schedule is a real legal act with a real cantonal tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the Wegleitung — no TCP-level reset,
WAF, or CAPTCHA gate encountered, consistent with
GOV-1847/GOV-1854/GOV-1868's findings that `zh.ch`'s own tax-forms domain is
unblocked.

## Scope and jurisdiction notes

- This is Switzerland's fourth Taxes-vertical document (the third companion
  schedule to the main return, alongside the Wertschriftenverzeichnis and
  Berufsauslagen), not a new vertical or jurisdiction; Switzerland remains
  at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `versicherungspraemien`.
- No `edition` member is used, consistent with this registry's existing
  treatment of other annual tax-year-specific schedules. No conditional
  requiredness (`requiredWhen`) or `documents[]` is used, since this
  schedule's own fields carry no gated evidence requirements — the
  simplest of the CH-ZH companion schedules authored to date.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as its three CH-ZH sibling documents. Because
`status` remains `draft`, a future review should prioritize: confirming the
2026-tax-year edition of this form, the main return, and the Wegleitung keep
the same box-reference numbering (601-607, 611-616, 270), and re-screening
whether any of the four remaining companion schedules (Aus- und
Weiterbildung, Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt
A/B/G) has become a tractable next candidate.
