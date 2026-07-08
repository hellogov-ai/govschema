# Verification record — `ch/zh/sta/wertschriften-und-guthabenverzeichnis` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Wertschriftenverzeichnis

This is the recurring "GovSchema Standard Research" cycle (**GOV-1854**). The
prior cycle (GOV-1847), which authored the main Zürich personal tax return
(`ch/zh/sta/steuererklaerung-natuerliche-personen`), explicitly scoped that
document to the base 4-page return only and deferred every companion
schedule, naming this one specifically:

> "Left out, as an open backlog candidate for a future cycle: fully modelling
> any one of the seven companion schedules in its own right (most promisingly
> the Wertschriftenverzeichnis, since securities income/wealth is likely the
> most commonly-populated companion schedule for a typical filer)."

`CATALOG.md`'s own "Known Gaps" list repeated this flag verbatim after GOV-1847
merged. This document closes that specific, named gap. It does not open a new
vertical or jurisdiction — Switzerland remains at 2 of 6 verticals (DMV,
Taxes) — but it is the strongest, most concretely pre-screened candidate on
the registry's own backlog, and materially deepens the Taxes vertical's
coverage of an already-open jurisdiction.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/wertschriften-und-guthabenverzeichnis` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return; this form's own printed issuer is also
  "StA Form.", here "340").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-formulare/340%20WV%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 340 (2023) 12.25 — Wertschriften- und Guthabenverzeichnis 2025
  mit Verrechnungsantrag," fetched directly (HTTP 200, `%PDF-1.4`, 167,121
  bytes, no `/Encrypt`, no login/CAPTCHA/WAF gate) from the same tax-return
  landing page GOV-1847 used,
  <https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>,
  which links this form directly next to the main return under the 2025
  "est-formulare" (Steuererklärungsformulare) listing. The link text and
  filename ("340 WV ZH 2025 HA DEF.pdf") match the main return's own
  reference to this schedule by name at lines 150/400.
- **A note on the form's own print date.** The main return's footer prints
  "StA Form. 300 **(2025)** 12.25," but this form's footer prints "StA Form.
  340 **(2023)** 12.25" even though its own cover page is titled
  "Wertschriften- und Guthabenverzeichnis **2025**" throughout and its
  Steuerwert column is explicitly headed "Steuerwert am 31.12.**2025**." This
  is disclosed as an observed detail, not treated as a discrepancy: the
  printed template itself was evidently last revised in 2023 and is reused
  across tax years with only the cover-page year and the Steuerwert/
  Bruttoertrag column headers updated — consistent with the companion
  continuation sheet (see below) being hosted in a `jahrunabhaengig`
  ("year-independent") folder on `zh.ch`.
- **Companion continuation sheet, examined for scope confirmation only (not
  modelled):**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/est-formulare/342_wv-beiblatt_zh_2020_a4_def.pdf>
  — "1. Beiblatt zum Wertschriften- und Guthabenverzeichnis" (continuation
  sheet 1), fetched the same way (HTTP 200, 143,422 bytes). Confirmed by
  direct text extraction to be a plain continuation of the same row shape
  (rows 2305-25 through higher-numbered rows, i.e. rows 25 onward), requiring
  only the taxpayer's AHVN13 (Swiss social-security number) and name/first
  name as a linking header since it is a separate attached page — supporting
  this document's scope decision to model the continuation sheet only as a
  pass-through transfer total (`transferFromBeiblatt1TaxValue` and siblings),
  not as its own set of fields.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item (not naive
  `y`-bucketed lines), plus a `pdf-lib` AcroForm check (`form.getFields()`)
  and a `pdfjs-dist` per-page annotation check (`page.getAnnotations()`,
  filtered to `subtype === 'Widget'`). Both the AcroForm check and the
  annotation check returned **zero** fillable widgets across all 4 pages —
  the same flat, non-AcroForm, print/reference-facsimile shape as the main
  return. Because the itemized table's own Steuerwert/Bruttoertrag-A/
  Bruttoertrag-B column triplet carries **no printed per-row reference
  codes** (only the Zugang/Abgang date columns are individually numbered,
  2305-01..24/2309-01..24), and because the totals block at the foot of page
  3 packs several distinct box-reference numbers (2350/2352, 2360/2362,
  2370/2371, 400, 539/542, 150, 540) into a dense, visually-distinguished
  three-column layout that a text-only extraction cannot reliably
  disambiguate, pages 2 through 4 were additionally **rendered to PNG**
  (`pdfjs-dist` + `node-canvas`, 2.5× scale) and visually cross-checked
  against the extracted text before any field name was assigned. This
  rendering pass is what resolved:
  - the exact three-column split (Steuerwert / Bruttoertrag "mit
    Verrechnungssteuerabzug" (A) / Bruttoertrag "ohne Verrechnungssteuerabzug"
    (B)) for the `2350/2352`, `2360/2362`, and `2370/2371` transfer-line
    pairs, each of which visually shows **three** boxes per line (a coded
    Steuerwert box, an uncoded middle Bruttoertrag-A box, and a coded
    Bruttoertrag-B box) — the uncoded middle box is disclosed as excluded
    (Judgment call 1);
  - that `539` (Zwischentotal Bruttoerträge, column A) is visually connected
    by a printed bent arrow ("Übertrag Bruttoertrag A in Kolonne B, +") into
    the `150` (Total Bruttoertrag A+B) computation, and that the `540`
    (Verrechnungssteueranspruch) box's "davon 35%" arrow draws specifically
    from the column-A subtotal (`539`), not from the combined `150` total —
    confirming `withholdingTaxReclaimAmount` = 0.35 × `grossIncomeWithWithholding`,
    not 0.35 × `totalGrossIncome`;
  - that box `151` ("Ertrag-Total aus qualifizierten Beteiligungen," on page
    2, next to the Code legend) is a distinct field from the main 24-row
    table, feeding the main return's own `qualifiedParticipationIncomePortion`
    (Ziffer 4.2) — easy to miss in a naive top-to-bottom text scan since it
    sits beside the Code legend rather than inside the row table.
  - the page-4 official worked "Beispiel" (specimen), used to sanity-check
    the rounding convention stated in its own annotation callouts (CHF
    100.45 rounds to CHF 100.-, CHF 100.50 rounds to CHF 101.- for
    Steuerwert/Bruttoertrag entries; CHF 30.224 rounds to CHF 30.20, CHF
    30.875 rounds to CHF 30.90 for the 35% withholding-tax reclaim,
    commercial rounding to the nearest 5 centimes) — both rules are quoted
    directly into this schema's own field descriptions.
- **Retrieved / reviewed:** 2026-07-08.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: itemized 24-row table collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). The form's own itemized table has 24 printed rows
(2300-01 through 2300-24), each with up to nine distinct values (code,
ownership sub-code, currency, face value/quantity, valoren number,
description, acquisition date, disposal date, year-end tax value, and gross
income) — genuinely unbounded cardinality in practice (a filer with more
than 24 holdings continues onto a separate Beiblatt). Modelling 24 × 9 fixed
slots would misrepresent the form's own unbounded, repeating nature and
would not scale past 24 anyway. Per this registry's established treatment of
exactly this situation elsewhere (`ch/zh/sta/steuererklaerung-natuerliche-personen`'s
own `childrenInHouseholdDetails` and sibling fields; `cz/mf`'s
`dependentChildrenDetails`), the whole table is collapsed into one
`securitiesAndHoldingsDetails` free-text field, with a full description of
the columns each entry is expected to carry.

## Scope decision: Beiblatt 1/2 and Form DA-1 are pass-through totals, not modelled

Consistent with the main return's own exclusion of this entire document as a
companion schedule, this document in turn excludes its own companion
sub-schedules: **Beiblatt 1** and **Beiblatt 2** (continuation sheets for
holdings beyond the 24 printed rows — confirmed by direct inspection to
repeat the same row shape, see Sources examined) and **Form DA-1** (the
federal claim for relief from foreign withholding tax on foreign-sourced
investment income, a materially different international double-taxation
process). Each is represented only as (a) a `documents[]` supporting-evidence
requirement gated on its transfer field being greater than zero, and (b) the
transfer amount(s) themselves as plain numeric fields (`transferFromBeiblatt1TaxValue`
and siblings), since those are literal entry boxes printed directly on
*this* form, not fields belonging to the un-modelled companion document.

## Scope decision: the withholding-tax reclaim (line 540) is modelled despite being computed

Per this registry's practice elsewhere (main return's own exclusion table for
pure arithmetic/transfer lines), a value that is a pure arithmetic function of
other already-captured fields is normally not itself modelled. `540`
(`withholdingTaxReclaimAmount`) is exactly such a function — 35% of `539`
(`grossIncomeWithWithholding`) — yet it is included as its own field. This
mirrors the precedent set by `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`'s
own `refundAmount` field (also a computed net result, included because it is
the document's principal output): line 540 is not an incidental subtotal but
the entire reason this form exists (its own subtitle is "mit
Verrechnungsantrag" — with a request for refund), so it earns inclusion
despite being derivable.

## Field-by-field source mapping

- **Refund bank account** (p.1, "Bankverbindung für Rückerstattungen") →
  `refundIban`, `refundAccountHolderName`. Both optional: the source form's
  own instructional text ("Sollten diese Angaben nicht mehr aktuell sein,
  bitten wir Sie, Ihre Korrekturen hier einzutragen") frames these as
  *corrections* to bank details the tax office already holds on file (shown
  in a pre-printed address-window area above them that carries no text-layer
  content of its own), not as a mandatory first-time entry.
- **Itemized holdings** (pp.2-3, rows 2300-01 through 2300-24) →
  `securitiesAndHoldingsDetails`. See scope decision above.
- **Continuation-sheet and Form DA-1 transfers** (p.3, boxes 2350/2352,
  2360/2362, 2370/2371) → `transferFromBeiblatt1TaxValue`,
  `transferFromBeiblatt1GrossIncome`, `transferFromBeiblatt2TaxValue`,
  `transferFromBeiblatt2GrossIncome`, `transferFromFormDA1TaxValue`,
  `transferFromFormDA1GrossIncome`.
- **Headline totals** (p.3, boxes 400, 539, 542, 150; p.2, box 151) →
  `totalTaxValueOfSecurities`, `grossIncomeWithWithholding`,
  `grossIncomeWithoutWithholding`, `totalGrossIncome`,
  `qualifiedParticipationIncomeTotal`. The first and fourth transfer directly
  onto the main return's own `securitiesAndClaimsWealth` (Ziffer 30.1) and
  `securitiesAndOtherAssetsIncome` (Ziffer 4.1) fields respectively; the last
  onto `qualifiedParticipationIncomePortion` (Ziffer 4.2) — confirmed by
  cross-reading the main return's own field descriptions, which already name
  this document as their source.
- **Withholding-tax reclaim** (p.3, box 540) → `withholdingTaxReclaimAmount`.
  See scope decision above.
- **Filing and signature** (p.1) → `placeOfSigning`, `dateOfSigning`
  (the source form prints a single "Ort und Datum" line, split into two
  fields per the main return's own established convention for this exact
  situation), plus the `declarationAttestation` `documents[]` entry
  reproducing the form's own completeness/truthfulness statement verbatim.
- **Companion-schedule and evidentiary references** → the 4 `documents[]`
  entries (`declarationAttestation`, `continuationSheetBeiblatt1`,
  `continuationSheetBeiblatt2`, `formDA1`, and
  `originalCertificatesForLargeDomesticGamingWinnings`), the first required
  unconditionally, the next three `requiredWhen` their corresponding transfer
  field is greater than zero, and the last left optional/ungated since its
  trigger (a specific kind of holding) lives inside the collapsed free-text
  field and cannot be structurally gated.

## Mock-data test run

Per the issue's phase-3 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`all`/`any`/`not` `Condition` grammar as
GSP-0013 checked every `required`/`requiredWhen` constraint on both fields
and `documents[]` against four scenarios:

```
OK   Scenario 1: single filer, domestic savings + one bond, withholding-tax-only
OK   Scenario 2: mixed A/B holdings, qualified participation, Form DA-1 transfer
FAIL Negative control 1: holdings present, declaration attestation omitted (expected FAIL)
    - MISSING required document: declarationAttestation
FAIL Negative control 2: Beiblatt 1 transfer amount without the continuation-sheet document (expected FAIL)
    - MISSING required document: continuationSheetBeiblatt1
```

Scenario 1 models a single filer with a domestic savings account and a
domestic bond, both withholding-tax-subject (Code A): total tax value CHF
55,000, gross income CHF 540 (all column A), withholding-tax reclaim CHF
189.00 (35% of 540, exact — no rounding needed). Scenario 2 models a joint
filer with a domestic account, a qualified-participation shareholding
(Code A, "Q" sub-code), and a foreign investment fund (Code B, triggering
`grossIncomeWithoutWithholding`), plus a Form DA-1 foreign-withholding-relief
transfer (requiring the `formDA1` document): total tax value CHF 189,590.50,
gross income CHF 2,846 (2,196 column A + 650 column B), qualified-
participation income CHF 2,000, and a reclaim of CHF 768.60 (35% of 2,196,
exact). Both negative controls confirm the evaluator actually enforces
`requiredWhen` on `documents[]` (an itemized holding without the mandatory
declaration attestation, and a Beiblatt 1 transfer amount without the
continuation-sheet document itself being supplied) rather than trivially
passing everything. No defects were found in the schema itself.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 3 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **Beiblatt 1 and Beiblatt 2** (continuation sheets for holdings beyond the
  24 printed rows) — each a distinct, separately-published PDF; represented
  only as pass-through transfer totals and a gated `documents[]` entry. See
  scope decision above.
- **Form DA-1** (international double-taxation relief for foreign
  withholding tax) — a materially different, separately-published federal
  form; represented only as a pass-through transfer total and a gated
  `documents[]` entry.
- **Per-row breakdown of the 24-row table** — collapsed into
  `securitiesAndHoldingsDetails`. See scope decision above.
- **The uncoded middle (Bruttoertrag-A) box on each of the three transfer
  lines** (2350/2360/2370) — see Judgment call 1.
- **The office-only "Eingang" field** (p.1) — a tax-office date stamp, not a
  taxpayer-completed field, the same class of exclusion this registry
  applied to the main return's own "Bitte nicht ausfüllen" box.

## Judgment calls

1. **The uncoded middle box on each Beiblatt/DA-1 transfer line (Bruttoertrag
   column A) is not modelled**, only the coded Steuerwert box (2350/2360/2370)
   and the coded Bruttoertrag-column-B box (2352/2362/2371). The rendered
   page image confirms a third, visually present but reference-code-less
   entry box exists in the middle (Bruttoertrag-A) column position for these
   three lines. Given that Form DA-1 specifically concerns *foreign-sourced*
   income (where Swiss withholding tax would not apply, i.e. column-B income
   is the expected case for that transfer) and Beiblatt continuation
   entries are a rarer edge case in the first place, this uncoded box is
   judged a minor, disclosed omission rather than a load-bearing field, kept
   out to avoid inventing a field name for a box the source form itself does
   not label.
2. **`totalTaxValueOfSecurities`, `totalGrossIncome`, and
   `withholdingTaxReclaimAmount` are marked `required: true`; the two
   Bruttoertrag-column subtotals (`grossIncomeWithWithholding`,
   `grossIncomeWithoutWithholding`) and `qualifiedParticipationIncomeTotal`
   are `required: false`.** The three required fields are always printed and
   filled in by every filer using this form regardless of holding mix (even
   as zero for an unused column); the subtotals and the qualified-
   participation figure are populated only when the corresponding column or
   holding type actually applies.
3. **`placeOfSigning`/`dateOfSigning` split a single printed "Ort und Datum"
   line into two fields**, mirroring the identical judgment call already made
   and disclosed for the main return this document is a companion to.
4. **Amounts are modelled as plain `number` fields in whole CHF**, except
   `withholdingTaxReclaimAmount`, which the source form itself prints with a
   Rappen (centime) sub-column and its own worked rounding-to-CHF-0.05
   examples — modelled as a plain `number` regardless, consistent with this
   registry's convention elsewhere of not adding a separate sub-unit field,
   with the rounding rule stated in the field's own description instead.
5. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return, since this is the same cantonal tax
   authority's own companion form, not a federally standardized schedule.
6. **No live submission was attempted** — filing a real Swiss withholding-tax
   refund claim is a real legal act with a real cantonal tax authority, not a
   safe or reversible action to simulate against a live government process,
   consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the continuation-sheet PDF fetched for
scope confirmation — no TCP-level reset, WAF, or CAPTCHA gate encountered,
consistent with GOV-1847's finding that `zh.ch`'s own tax-forms domain is
unblocked.

## Scope and jurisdiction notes

- This is Switzerland's second Taxes-vertical document (a companion schedule
  to the first, `ch/zh/sta/steuererklaerung-natuerliche-personen`), not a new
  vertical or jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `wertschriften-und-guthabenverzeichnis`.
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, consistent with the main return and every other document in this
  registry. No `edition` member is used, consistent with this registry's
  existing treatment of other annual tax-year-specific schedules.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-08** (6
months), the same cadence as the main return this document is a companion
to. Because `status` remains `draft`, a future review should prioritize:
confirming the 2026-tax-year edition of both this form and the main return
keep the same box-reference numbering (400/539/542/150/151/540 and the
2350/2352/2360/2362/2370/2371 pairs), and re-screening whether any of the
remaining companion schedules (Berufsauslagen, Versicherungsprämien, Aus- und
Weiterbildung, Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt
A/B/G) has become a tractable next candidate.
