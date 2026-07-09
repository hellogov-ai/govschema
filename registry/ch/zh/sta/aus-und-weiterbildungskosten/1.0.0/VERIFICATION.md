# Verification record — `ch/zh/sta/aus-und-weiterbildungskosten` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Aus- und Weiterbildung

This is the recurring "GovSchema Standard Research" cycle (**GOV-1882**). The
prior cycle (GOV-1875/GOV-1878), which authored Versicherungsprämien
(`ch/zh/sta/versicherungspraemien`), left four remaining CH-ZH companion
schedules as an open backlog list (Aus- und Weiterbildung,
Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt A/B/G) and
specifically flagged Aus- und Weiterbildung as the next candidate to screen.
This cycle confirms it is tractable: a genuine, current, unauthenticated,
flat (non-AcroForm) 1-page PDF, sourced from the same `zh.ch` tax-forms
listing as its four siblings. `CATALOG.md` is updated by this cycle to move
Aus- und Weiterbildung from the open list to closed, leaving three remaining
companion schedules (Liegenschaftenverzeichnis, Schuldenverzeichnis,
Hilfsblatt A/B/G).

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/aus-und-weiterbildungskosten` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (the same authority as the main return and its four other companion
  schedules; this form's own printed issuer is also "StA Form.", here "367").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-formulare/367%20Aus-%20und%20Weiterbildung%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 367 (2024) 12.25 — Berufsorientierte Aus- und
  Weiterbildungskosten 2025," fetched directly (HTTP 200,
  `Content-Type: application/pdf`, `%PDF-1.4`, 46,013 bytes, no `/Encrypt`,
  no login/CAPTCHA/WAF gate) from the same tax-return landing page
  GOV-1847/GOV-1854/GOV-1868/GOV-1875 used,
  <https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>,
  which links this form directly next to the main return and its other
  companion schedules under the 2025 "est-formulare" listing. The link text
  and filename ("367 Aus- und Weiterbildung ZH 2025 HA DEF.pdf") match the
  main return's own reference to this schedule by name at line 292
  (Ziffer 16.2).
- **A note on the form's own print date.** Like its four CH-ZH sibling
  companion schedules, this form's footer prints "StA Form. 367 **(2024)**
  12.25" even though its own cover page is titled "Berufsorientierte Aus- und
  Weiterbildungskosten" for the 2025 tax year — the printed template was
  evidently last revised in 2024 and reused for the 2025 tax year. Disclosed
  as an observed detail, not treated as a discrepancy.
- **Companion Wegleitung, examined for rate confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025"
  GOV-1847/GOV-1868/GOV-1875 used, fetched the same way (HTTP 200, `%PDF-1.7`,
  1,497,565 bytes). Its own explanatory section ("Berufsorientierte Aus- und
  Weiterbildungskosten [Ziffer 16.2]") restates, in prose, the same two caps
  this form's own two sections already print ("... bis zum Gesamtbetrag von
  CHF 12'400 bei der Staatssteuer bzw. CHF 13'000 bei der Bundessteuer ..."),
  so no separate Wegleitung lookup was required to fill in a missing figure.
  It also states the statutory eligibility criterion for this deduction (a
  Sekundarstufe II qualification already held, or the taxpayer has turned 20,
  and the costs are not those of a first Sekundarstufe II qualification) —
  disclosed below as an explicit scope decision, since it has no
  corresponding field on the form itself.
- **No official worked specimen of this exact form was found — unlike the
  two prior companion-schedule cycles.** Berufsauslagen (GOV-1868) and
  Versicherungsprämien (GOV-1875) each found their own form's official worked
  specimen on Wegleitung PDF page 36 (the printed page footer reads "36," no
  page-index offset in this PDF). This cycle checked that same page, the
  page immediately after it, and the page carrying this form's own
  explanatory prose:
  - **PDF page 16** (the page containing the "Berufsorientierte Aus- und
    Weiterbildungskosten [Ziffer 16.2]" explanatory prose quoted above)
    carries, immediately below that prose, the Wegleitung's own blank
    reference facsimile of this exact form (box codes 2900/2903, 2901/2904,
    2902/2905, 2920/2921 (Staatssteuer), 2920/2921 (Bundessteuer), and 292 —
    identical to the live form's own layout, confirming the box numbering
    read off the live PDF above) — but every entry position on it is the
    same box-outline rendering artifact ("13211" and its permutations)
    observed on all four CH-ZH sibling forms' own blank boxes, not an actual
    transcribed value. This page illustrates the form's own printed
    structure inline with its explanatory text, not a filled specimen — a
    different placement from Berufsauslagen/Versicherungsprämien, whose own
    inline facsimiles happen to sit on the same page as a later worked
    example.
  - **PDF page 36** carries only the Berufsauslagen and Versicherungsprämien
    worked specimens (confirmed by a full-text scan of the page: no "367,"
    "2900," or "Weiterbildung" token appears on it) — no Form 367 specimen
    of any kind sits on this page.
  - **PDF page 37** carries the Wegleitung's own fully worked specimen of the
    main return's own page 3 ("Abzüge 2025") summary for the "Muster-Meister
    Felix und Regula" household — and it does show real, transcribed values
    for several other companion schedules' transfer lines: line 220 (11.1,
    Berufsauslagen Person 1) = CHF 4'815 state / CHF 4'815 federal, matching
    Berufsauslagen's (GOV-1868) own specimen; line 270 (15,
    Versicherungsprämien) = CHF 8'400 state / CHF 5'100 federal, matching
    Versicherungsprämien's (GOV-1875) own specimen; line 260 (14.1, pillar
    3a) = CHF 7'258 both columns. A coordinate-level re-check
    (`pdfjs-dist` per-item `(x, y)`) of line 292 (16.2, this schedule's own
    transfer line, printed at y≈507.7) on that same page found only the
    box-outline artifact at both the Staatssteuer x-position (≈282.6, close
    to the "Staatssteuer" column header's own x≈278.8) and the Bundessteuer
    x-position (≈352.9, close to "Bundessteuer"'s own x≈348.5) — i.e. **this
    line is deliberately left blank** in the Wegleitung's own official
    specimen; the Muster-Meister household claimed no further-education
    deduction that year.
  - Per the issue's own instruction for this contingency, this schema's
    field logic and statutory caps were instead sourced directly from the
    live form's own printed text (cross-checked against the Wegleitung's
    prose restatement of the same two caps), and the worked mock-data
    example below was constructed independently by this cycle's author, with
    every arithmetic step hand-recomputed, rather than copied from or
    matched against any government-published specimen.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item, plus a `pdf-lib`
  AcroForm check (`form.getFields()`) and a `pdfjs-dist` per-page annotation
  check (`page.getAnnotations()`, filtered to `subtype === 'Widget'`). Both
  checks returned **zero** fillable widgets on this form's single page — the
  same flat, non-AcroForm, print/reference-facsimile shape as its four
  CH-ZH sibling schemas. Coordinate-based extraction was essential to
  establish the row/column layout correctly:
  - the box codes for each row are printed as a pair separated by a slash
    (e.g. "2900 / 2903"), the first number at x≈338.4 and the second at
    x≈360.9, immediately to the left of two separate entry-box positions at
    x≈404 (Person 1's amount column) and x≈498 (Person 2's amount column) —
    confirming this form places both persons side-by-side on one page,
    unlike Berufsauslagen's two separate physical pages;
  - the three raw-cost rows (Total der Kosten / Beitrag Arbeitgeber oder
    weiterer Stellen / Selbstgetragene Kosten, box codes 2900-2905) sit
    above both the "Staatssteuer" and "Bundessteuer" section headers'
    own y-positions, confirming these three lines are single, non-tax-column
    -split figures shared by both tax columns — the same pattern
    Versicherungsprämien's own Section A used;
  - only the "Zulässiger Abzug" (allowed-deduction) row and the final total
    are printed twice, once under each section header, each with its own
    cap (CHF 12'400 under "Staatssteuer," CHF 13'000 under "Bundessteuer")
    — confirming the tax-column split applies only to the capped, allowed
    -deduction stage, not to the raw cost inputs;
  - the "Beitrag Arbeitgeber..." row prints a minus sign ("–") immediately
    before each person's amount box, confirming it is subtracted from the
    "Total der Kosten" row to produce "Selbstgetragene Kosten," for both
    Person 1 and Person 2 independently;
  - the "Zulässiger Abzug" row's own label prints "max. **je** CHF 12'400"/
    "max. **je** CHF 13'000" — "je" ("each") — confirming the cap applies
    individually to each person's own self-borne cost, not to the two
    persons' combined total, consistent with the two separate amount-box
    positions (Person 1, Person 2) printed on that same row;
  - the summary row beneath each "Zulässiger Abzug" row prints "2920 +"
    followed directly by a single combined amount box, then a further row
    with the code "292" beside a second box holding the same combined
    figure, immediately above the "▸ Zu übertragen in die Steuererklärung
    Seite 3 Ziffer 16.2" arrow-and-caption; the same abbreviated "2920 +"
    wording (without printing "2921" as text) appears identically in the
    Wegleitung's own blank facsimile of this form (PDF page 16), confirming
    it is the form's own genuine printed shorthand for "the sum of boxes
    2920 and 2921," not an extraction artifact — modelled in this schema as
    a single combined total field per tax column (see the field-by-field
    mapping below).
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: a single shared household header, but per-person cost/deduction columns on one page

Like Versicherungsprämien (a single-page, single-header form) but unlike
Berufsauslagen (two separate physical pages, one header each), this form has
one Name/Vorname/AHVN13/Gemeinde header block feeding a two-column body where
Person 1 and Person 2 each have their own cost figures side by side. This
schema follows the form's own layout exactly: one set of header fields
(`ahvn13RemainingDigits`, `gemeinde`, `name`, `vorname`), and `Person1`/
`Person2`-suffixed fields for every cost and deduction line.

## Scope decision: the raw cost lines (2900-2905) are not split by tax column; only the capped deduction and final total are

Section-by-section coordinate inspection (see above) confirms
`totalEducationCostsPersonX`, `employerOrThirdPartyContributionPersonX`, and
`selfBorneCostsPersonX` are each a single figure used identically against
both the state-tax and federal-tax caps — the same treatment
Versicherungsprämien gave its own Section A (bezahlte Prämien/Zinsen). Only
`allowedDeductionPersonXStateTax`/`FederalTax` and the two final
`totalFurtherEducationDeductionStateTax`/`FederalTax` fields differ by tax
column, because only the statutory cap itself differs (CHF 12'400 vs.
CHF 13'000).

## Scope decision: `validation.maximum` (not `validation.enum`) on the four allowed-deduction fields

Unlike Versicherungsprämien's Section B lookup fields (which print exactly
two discrete alternative figures depending on marital status and pillar
2/3a contributions, correctly modelled with `enum`), this form's cap is a
single, continuous ceiling applied to a genuinely variable self-borne cost
(`selfBorneCostsPersonX`) — any value from CHF 0 up to the cap is a valid,
literal transcription of "the lower of the self-borne cost or the cap," not
a choice between two fixed printed numbers. `validation.minimum: 0,
validation.maximum: 12400` (state) / `13000` (federal) is the correct
constraint here, the same pattern Berufsauslagen used for its own several
capped lines (e.g. the CHF 5'200/CHF 3'300 commuting-cost caps).

## Scope decision: no eligibility-criterion field or course-detail fields, since none are printed on the form

The Wegleitung's own explanatory prose states a statutory eligibility test
(a Sekundarstufe II qualification already held, or the taxpayer has turned
20 years old, and the costs claimed are not those of a first Sekundarstufe II
qualification) — but this form itself has no corresponding checkbox, and
neither the form nor its Wegleitung ask the filer to name the institution,
programme, or dates on this specific schedule (unlike, for instance,
Berufsauslagen's own private-vehicle-use justification checkboxes, which
have direct on-form counterparts at lines 2041-2044). Consistent with this
registry's general preference against inventing fields the source form
itself does not print, no such field is added; the eligibility rule and
absence of any supporting-document requirement are instead disclosed here
and in the schema's own top-level `description`.

## Scope decision: `totalFurtherEducationDeductionStateTax`/`FederalTax` (292) are `required: true`; the per-person lines are not

The form prints exactly one line explicitly labelled as the schedule's own
final, always-completed total transferred onward ("Total," box code 292,
captioned "▸ Zu übertragen in die Steuererklärung Seite 3 Ziffer 16.2"),
mirroring the precedent set by every other CH-ZH companion schedule
authored to date (each schedule's own single transferring total, or — for
Versicherungsprämien's three distinct labelled totals — every total a filer
completes regardless of how many preceding lines are zero). The
intermediate per-person cost and capped-deduction lines are not required,
since a filer with only one active person (e.g. a single filer, or a couple
where only one spouse incurred further-education costs) legitimately leaves
the other person's lines entirely blank.

## Field-by-field source mapping

- **Header** (single household entry) → `ahvn13RemainingDigits`, `gemeinde`,
  `name`, `vorname`.
- **Total der Kosten / Beitrag Arbeitgeber oder weiterer Stellen /
  Selbstgetragene Kosten** (lines 2900-2905) →
  `totalEducationCostsPerson1`/`Person2`,
  `employerOrThirdPartyContributionPerson1`/`Person2`,
  `selfBorneCostsPerson1`/`Person2`.
- **Zulässiger Abzug** (lines 2920/2921, Staatssteuer and Bundessteuer
  sections) → `allowedDeductionPerson1StateTax`/`Person2StateTax`,
  `allowedDeductionPerson1FederalTax`/`Person2FederalTax`.
- **Total** (line 292) → `totalFurtherEducationDeductionStateTax`/
  `FederalTax`, transferring onto the main return's own
  `furtherEducationCostsStateTax`/`FederalTax` fields (Ziffer 16.2).

## Mock-data test run

Per the issue's phase-3 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) loaded
`conformance/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/application-packet.json`
against `schema.json` and checked:

```
OK   Both required fields present (totalFurtherEducationDeductionStateTax,
     totalFurtherEducationDeductionFederalTax)
OK   allowedDeductionPerson1StateTax (12400) holds within [0, 12400]
OK   allowedDeductionPerson1FederalTax (13000) holds within [0, 13000]
OK   No unknown keys present in the mock data beyond this schema's own
     11 field names actually used (Person 2's 5 fields correctly omitted,
     matching the single-filer scenario)
OK   Arithmetic: 14500 - 1500 = 13000 (selfBorneCostsPerson1)
OK   Arithmetic: min(13000, 12400) = 12400 (allowedDeductionPerson1StateTax
     — the state-tax cap binds, since self-borne cost (13000) exceeds it)
OK   Arithmetic: min(13000, 13000) = 13000 (allowedDeductionPerson1FederalTax
     — exactly at the federal-tax cap, which does not bind below the
     self-borne cost)
OK   Arithmetic: 12400 + 0 = 12400 (totalFurtherEducationDeductionStateTax,
     Person 2 absent/zero)
OK   Arithmetic: 13000 + 0 = 13000 (totalFurtherEducationDeductionFederalTax,
     Person 2 absent/zero)
```

The mock scenario (fabricated, not copied from any official specimen — none
exists for this exact form, see above) models a single filer in Uster
("Reto Baumgartner") who completed a career-oriented further-education
programme in 2025 costing CHF 14'500 in total
(`totalEducationCostsPerson1`), of which his employer contributed CHF 1'500
(`employerOrThirdPartyContributionPerson1`), leaving a self-borne cost of
CHF 13'000 (`selfBorneCostsPerson1`) — a figure chosen deliberately to
exceed the CHF 12'400 state-tax cap while sitting exactly at the CHF 13'000
federal-tax cap, exercising both the "cap binds" and "cap does not bind"
arithmetic paths in a single example. Person 2's fields are omitted
entirely, consistent with Berufsauslagen's own single-filer mock-data
precedent (`conformance/ch/zh/sta/berufsauslagen/1.0.0/application-packet.json`).

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/schema.json
ok   registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/schema.json
ok   registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **The underlying course/programme details** (institution, subject, dates)
  that justify the claimed cost — neither this form nor its Wegleitung ask
  for them to be entered on this schedule itself; only the resulting CHF
  figures are requested.
- **The statutory eligibility criterion** (a Sekundarstufe II qualification
  already held, or age 20 completed, and the costs are not those of a first
  Sekundarstufe II qualification) — stated only as a filing rule in the
  Wegleitung's own prose, with no corresponding checkbox or field printed on
  the form itself. See the dedicated scope-decision section above.
- **Any supporting-evidence document.** Neither this form nor the
  Wegleitung's own Ziffer-16.2 explanatory section request a receipt,
  certificate, or itemized statement to be filed alongside this schedule's
  own figures (unlike Berufsauslagen, which gates several `documents[]`
  entries on its own itemized-actual-cost lines). The main return's own
  `documents[]` array already gates this form itself (`furtherEducationForm`,
  required when either transferred total is greater than 0) — this schedule
  does not duplicate that gate against itself. Accordingly this schema omits
  the `documents[]` array entirely (permitted, since it is not a required
  top-level member).
- **The office-only fields** — none observed on this form's single page.

## Judgment calls

1. **Raw cost lines (2900-2905) modelled as single, non-tax-column-split
   fields, while the allowed-deduction and total lines are modelled with a
   state/federal pair.** This mirrors the form's own physical layout exactly
   and the Wegleitung's own confirmation that only the deduction cap differs
   by tax column. See the dedicated scope-decision section above.
2. **`validation.maximum` (not `validation.enum`) on the four allowed
   -deduction fields.** A continuous cap applied to a genuinely variable
   self-borne cost, not a discrete lookup table. See the dedicated
   scope-decision section above.
3. **No eligibility-criterion or course-detail field**, consistent with this
   registry's general preference against inventing fields the source form
   itself does not print. See the dedicated scope-decision section above.
4. **`totalFurtherEducationDeductionStateTax`/`FederalTax` (292) are
   `required: true`; the per-person lines are not**, extending the
   established CH-ZH companion-schedule precedent of requiring only each
   form's own final, always-completed transfer total(s). See the dedicated
   scope-decision section above.
5. **No `crossFieldValidation` enforcing the printed arithmetic** (e.g.
   `selfBorneCostsPerson1 === totalEducationCostsPerson1 -
   employerOrThirdPartyContributionPerson1`, or the min()/cap logic) is
   added, consistent with this registry's general preference against
   inventing derived-value enforcement beyond what the source form itself
   states as a hard, universally-applicable rule — the same treatment every
   other CH-ZH companion schedule has given its own arithmetic lines.
6. **Amounts are modelled as plain `number` fields in whole CHF ("CHF ohne
   Rappen," printed on the form's own header)**, consistent with this
   registry's convention elsewhere of not adding a separate sub-unit field.
7. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its other three companion schedules,
   since this is the same cantonal tax authority's own companion form.
8. **No live submission was attempted** — filing a real Swiss tax return or
   companion schedule is a real legal act with a real cantonal tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the Wegleitung — no TCP-level reset,
WAF, or CAPTCHA gate encountered, consistent with
GOV-1847/GOV-1854/GOV-1868/GOV-1875's findings that `zh.ch`'s own tax-forms
domain is unblocked.

## Scope and jurisdiction notes

- This is Switzerland's fifth Taxes-vertical document (the fourth companion
  schedule to the main return, alongside the Wertschriftenverzeichnis,
  Berufsauslagen, and Versicherungsprämien), not a new vertical or
  jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `aus-und-weiterbildungskosten`.
- No `edition` member is used, consistent with this registry's existing
  treatment of other annual tax-year-specific schedules. No conditional
  requiredness (`requiredWhen`) or `documents[]` is used, since this
  schedule's own fields carry no gated evidence requirements — the main
  return's own `documents[]` array already gates this form as a whole.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as its four CH-ZH sibling documents. Because
`status` remains `draft`, a future review should prioritize: confirming the
2026-tax-year edition of this form, the main return, and the Wegleitung keep
the same box-reference numbering (2900-2905, 2920-2921, 292), and
re-screening whether any of the three remaining companion schedules
(Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt A/B/G) has become
a tractable next candidate.
