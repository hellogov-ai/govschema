# Verification record — `ch/zh/sta/liegenschaftenverzeichnis` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Liegenschaftenverzeichnis

This is the recurring "GovSchema Standard Research" cycle (**GOV-1889**). The
prior cycle (GOV-1882), which authored the Aus- und Weiterbildungskosten
schedule, left three companion schedules as an open backlog list:
Liegenschaftenverzeichnis (real-estate register), Schuldenverzeichnis (debts
register), and Hilfsblatt A/B/G (self-employment worksheets).
`CATALOG.md`'s own "Known Gaps" list repeated this open list verbatim after
GOV-1882 merged, noting none had yet been screened for tractability. This
cycle's reconnaissance confirmed the Liegenschaftenverzeichnis is a genuine,
current, unauthenticated, flat (non-AcroForm) PDF, and picked it as the
strongest remaining candidate: real-estate ownership is common among Swiss
filers, and unlike Schuldenverzeichnis (debts) or Hilfsblatt A/B/G
(self-employment, a materially narrower filer population), this schedule's
own printed prose is unusually self-contained. This document closes that
specific, named gap. It does not open a new vertical or jurisdiction —
Switzerland remains at 2 of 6 verticals (DMV, Taxes) — but it further deepens
the Taxes vertical's coverage of an already-open jurisdiction, leaving
Schuldenverzeichnis and Hilfsblatt A/B/G as the two remaining open backlog
candidates.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/liegenschaftenverzeichnis` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its four other companion schedules;
  this form's own printed issuer is "StA Form. 350").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/est-formulare/350%20Liegensch%20ZH%202025%20HA%20DEF.pdf>
  — "StA Form. 350 (2025) 12.25 — Liegenschaftenverzeichnis," fetched directly
  (HTTP 200, `content-type: application/pdf`, `%PDF-1.4`, 71,322 bytes — byte
  size independently reconfirmed against this cycle's own reconnaissance
  finding — no `/Encrypt`, no login/CAPTCHA/WAF gate).
- **A note on this form's URL and its own 'Jahr' box.** Unlike its four
  sibling companion schedules (Wertschriften- und Guthabenverzeichnis,
  Berufsauslagen, Versicherungsprämien, Aus- und Weiterbildung), each hosted
  at a yearly `.../2025/est-formulare/...` path and each carrying "2025" in
  its own printed cover title, this form is hosted at a **year-independent**
  `.../jahrunabhaengig/est-formulare/...` path, and its own cover page carries
  no tax year at all — instead, p.1 prints a standalone 4-box "◂ Jahr" entry
  field immediately below the household header. This is disclosed as an
  observed structural difference, not treated as a discrepancy: the printed
  template is evidently reused across tax years without a per-year reprint
  (the sibling schedules are reprinted yearly only because their own box
  contents — e.g. Wertschriften' "Steuerwert am 31.12.2025" column header —
  are themselves year-specific text, whereas nothing on this form's own face
  is). This document models the 'Jahr' box as its own required `taxYear`
  field for exactly this reason: it is the only member of the five CH-ZH
  companion schedules where the tax year is genuinely filer-entered data, not
  an assumption baked into the schema version.
- **Companion Wegleitung, examined for rule confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025" every prior CH-ZH
  cycle has used, fetched the same way (HTTP 200, 1,497,565 bytes, 40 pages,
  `%PDF-1.7`). Its pp.28-30 (PDF pages 28-30) carry this form's own
  explanatory section ("Liegenschaftenverzeichnis"), used to confirm:
  - the Eigenmietwert (imputed rental value) computation basis differs by
    property category: for a single-family house or a condominium unit, the
    value is the one the Regierungsrat's own valuation instruction (ZStB
    21.1) assigns, communicated to the taxpayer directly by the
    Gemeindesteueramt (municipal tax office) — **not filer-computed**; for a
    self-occupied unit inside the owner's own multi-family or business
    building, the filer enters 70% of the rent the unit would achieve if let
    to a third party — **filer-computed**;
  - the deductible maintenance/management cost is claimed per property as
    either a flat 20%-of-declared-gross-rental-income allowance (pauschal —
    "Die Pauschale wird in Prozenten des deklarierten Bruttomietertrages
    berechnet ... und beträgt 20% für jede Liegenschaft") or itemized actual
    costs (effektiv), mutually exclusive per property, with the flat-rate
    election disallowed outright for a predominantly commercially-used
    property;
  - the Vermögenssteuerwert (net-wealth assessed tax value) of a multi-family
    or business building is itself computed via a capitalization formula
    (`Vermögenssteuerwert = Bruttojahresertrag x 100 / 7.05`), yet — per p.30's
    own "Übertrag in die Steuererklärung" instruction — this value transfers
    into the **Verkehrswert** column/Ziffer 31.1, not the "Ertragswert (Land-
    oder Forstwirtschaft)" column/Ziffer 31.2, which the same instruction
    confirms is reserved strictly for genuinely agricultural- or
    forestry-classified land ("Das Total der Vermögenssteuerwerte von
    land- und forstwirtschaftlichen Liegenschaften ... Ziffer 31.2 ... Das
    Total der Vermögenssteuerwerte aller übrigen Liegenschaften ... Ziffer
    31.1") — this was the single most easily-misread structural detail on
    this form (the "Ertragswert" sub-heading printed directly under the
    p.1 "Steuerwert (siehe Wegleitung Ziffer 31)" umbrella heading could be
    misread as a general "capitalized value" column rather than the
    narrower "agricultural/forestry only" column it actually is), resolved
    only by reading the Wegleitung's own p.30 prose rather than the form's
    own two-word column sub-heading in isolation;
  - both Steuerwert figures are, in the ordinary case, values the
    Gemeindesteueramt already assigned and communicated to the taxpayer via
    its own Liegenschaftenbewertung notice, not independently computed by the
    filer from scratch ("Die entsprechende Liegenschaftenbewertung wird Ihnen
    vom Gemeindesteueramt der Liegenschaftengemeinde zugestellt"; the
    Wegleitung's own p.38 marginal note repeats: "Falls Sie den Steuerwert
    Ihrer Liegenschaft nicht kennen, gibt Ihnen das Gemeindesteueramt gerne
    Auskunft") — this is the disclosed basis for treating both Steuerwert
    total fields as plain `number` transfer fields rather than fields with
    any derivation/formula semantics of their own.
- **No dedicated worked specimen of this exact form exists in the
  Wegleitung — a disclosed negative finding**, the same class of finding the
  aus-und-weiterbildungskosten cycle (GOV-1882) made for Form 367. This was
  confirmed three ways: (1) a full-text scan for the literal footer string
  "StA Form. 350" across all 40 Wegleitung pages returns PDF pp.14, 28, 29,
  and 30 — each carrying only this form's own **blank** reference facsimile
  as a background/reference layer behind the explanatory prose (a print-
  layout artifact shared with every other companion schedule's own
  explanatory section, e.g. p.14 also carries Berufsauslagen's own blank
  facsimile behind its unrelated Schuldzinsen prose); (2) a page-by-page scan
  for "Beispiel"/"Muster" tokens locates the Wegleitung's own worked
  household specimen (Muster-Meister Felix und Regula) spanning PDF pp.33-38,
  whose own stated assumptions explicitly include "selbstbewohnte
  Liegenschaft" (a self-occupied property) — so a property genuinely exists
  in this specimen — yet its own per-property Form-350 breakdown (Ort,
  Strasse, Art, Fläche, the two Steuerwert columns, the Eigenmietwert/rental-
  income split, and the maintenance-cost method) is never shown; only the
  two aggregate transfer figures this schedule would have produced are
  visible on the specimen's own main-return pages, rendered to PNG and
  read directly: PDF p.35 (main return page 2, "Einkünfte 2025") shows line
  188 (Nettoertrag aus Liegenschaften) = **CHF 15'680**; PDF p.38 (main
  return page 4, "Vermögen") shows line 421 (Ziffer 31.1, Verkehrswert) =
  **CHF 1'050'000** and line 422 (Ziffer 31.2, Ertragswert/Land- oder
  Forstwirtschaft) left **blank** (no agricultural/forestry property in the
  specimen household); (3) neither pp.28-30's own explanatory prose nor any
  other Wegleitung page shows a filled property-level line item for this
  form. This negative finding is disclosed explicitly rather than silently
  worked around: this schema's own worked mock-data example (below) is
  independently constructed and hand-recomputed, not matched against an
  official specimen, though its own order of magnitude (a CHF 780'000
  self-occupied single-family house, versus the specimen's CHF 1'050'000
  property) was deliberately kept broadly comparable to the Wegleitung's own
  aggregate figures as a plausibility cross-check, not as a claim of
  matching any official worked example.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item, plus a `pdf-lib`
  AcroForm check (`form.getFields()`) and a `pdfjs-dist` per-page annotation
  check (`page.getAnnotations()`, filtered to `subtype === 'Widget'`). Both
  checks returned **zero** fillable widgets across both pages — the same
  flat, non-AcroForm, print/reference-facsimile shape as all four sibling
  companion schedules. Both pages were additionally **rendered to PNG**
  (`pdfjs-dist` + `node-canvas`, 2.5x scale) and visually cross-checked
  against the extracted text before any field name was assigned. This
  rendering pass is what resolved:
  - the exact two-column split on p.1 ("Ertragswert / Land- oder
    Forstwirtschaft" at boxes 5531-55310, vs. "Verkehrswert" at boxes
    5541-55410), each column headed "CHF" with no "ohne Rappen" (without
    centimes) qualifier explicitly printed — unlike the main return's own
    page headers — but each entry box in the rendered image is a
    single-digit slot with no decimal notch, confirming whole-CHF entry, the
    same convention this registry applies elsewhere (Judgment call 4 below);
  - the p.2 "pauschal"/"effektiv" maintenance-cost choice rendered as two
    stacked line items per property (e.g. "5731 pauschal" directly above
    "5741 effektiv" for property 1), confirming these are mutually exclusive
    alternative entry lines, not two simultaneously-fillable amounts;
  - that box `151`-style qualified-participation-style side annotations do
    not exist on this form (unlike Wertschriften's own box 151) — the p.1
    "Land- oder Forstwirtschaft" text is a column sub-heading, not a
    checkbox or separate box, confirmed by its position directly beneath
    "Ertragswert" and its complete absence from the pdf-lib/pdfjs Widget
    scan.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: the 10-property repeating table collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). The form's own property table has 10 printed rows spanning
both pages (p.1: Ort/Kanton-Land/Strasse/Art/Fläche plus the two Steuerwert
columns; p.2: the Eigenmietwert/rental-income split, the maintenance-cost
method and amount, and the resulting net remaining income — all linked to
the same property by row number) — genuinely unbounded cardinality in
practice (a filer with more than 10 properties continues onto a separate
Beiblatt zum Liegenschaftenverzeichnis). Modelling 10 x roughly a dozen
distinct values per property as fixed slots would misrepresent the form's
own unbounded, repeating nature and would not scale past 10 anyway. Per this
registry's established treatment of exactly this situation elsewhere
(`ch/zh/sta/wertschriften-und-guthabenverzeichnis`'s own 24-row
`securitiesAndHoldingsDetails`; `ch/zh/sta/berufsauslagen`'s own private-
vehicle commuting sub-table), the whole table — both pages, linked by
property number — is collapsed into one `propertyInventoryDetails` free-text
field, with a full description of the values each entry is expected to
carry.

## Scope decision: the Beiblatt zum Liegenschaftenverzeichnis is a pass-through total, not modelled

Consistent with the main return's own exclusion of this entire document as a
companion schedule, this document in turn excludes its own companion
sub-schedule: the **Beiblatt zum Liegenschaftenverzeichnis** (continuation
sheet for properties beyond the 10 printed rows, confirmed by the
Wegleitung's own repeated cross-references to be a distinct, separately-
published form available from the Gemeindesteueramt or `www.zh.ch/steuern`).
It is represented only as (a) three plain numeric transfer fields
(`transferFromBeiblattErtragswert`, `transferFromBeiblattVerkehrswert`,
`transferFromBeiblattVerbleibenderErtrag`) — the literal entry boxes printed
directly on *this* form (557, 558, 578) — and (b) a `documents[]`
supporting-evidence requirement gated on any of those three transfer fields
being greater than zero.

## Scope decision: no declaration/signature block on this document (unlike Wertschriften)

Unlike `ch/zh/sta/wertschriften-und-guthabenverzeichnis` (which carries its
own "Ort und Datum" signature line and declaration statement, since it makes
an independent withholding-tax refund claim, "mit Verrechnungsantrag"), this
form's own two pages carry **no** signature block, declaration statement, or
"Ort und Datum" line of any kind — confirmed by a full-text search of the
extracted content of both pages. This is consistent with the Wegleitung's own
"Beilagen zur Steuererklärung" (p.31) checklist, which lists this form simply
as an attachment ("Liegenschaftenbesitzer: Liegenschaftenverzeichnis mit
allfälligen Beiblättern") to be filed alongside the main return, whose own
page-4 declaration ("Diese Steuererklärung ist vollständig und
wahrheitsgetreu ausgefüllt") already covers every attached schedule. No
`declarationAttestation` document entry is therefore modelled on this
document, unlike its Wertschriften sibling.

## Field-by-field source mapping

- **Tax year** (p.1, "◂ Jahr" box) → `taxYear`. See the dedicated note above
  on why this field exists on this schedule alone among the five CH-ZH
  companion schedules.
- **Household header** (p.1, AHVN13/Gemeinde/Name/Vorname) → `ahvn13RemainingDigits`,
  `gemeinde`, `name`, `vorname` — the same header shape and field-naming
  convention as `aus-und-weiterbildungskosten` and `versicherungspraemien`
  (collected once per household, not per person).
- **Property inventory** (p.1, "Liegenschaft 1" through "Liegenschaft 10"
  blocks; p.2, the per-property income/cost table) → `propertyInventoryDetails`.
  See scope decision above.
- **Continuation-sheet transfers** (p.1 boxes 557/558; p.2 box 578) →
  `transferFromBeiblattErtragswert`, `transferFromBeiblattVerkehrswert`,
  `transferFromBeiblattVerbleibenderErtrag`.
- **Headline totals** (p.1 boxes 3952/3951; p.2 box 3953) →
  `totalErtragswertLandwirtschaft`, `totalVerkehrswert`, `netRealEstateIncome`.
  The second and third transfer directly onto the main return's own
  `realEstateMarketValueWealth` (Ziffer 31.1) and `netRealEstateIncome`
  (Ziffer 6) fields; the first onto `realEstateIncomeValueWealth` (Ziffer
  31.2) — confirmed by cross-reading the main return's own field
  descriptions, which already name this document as their source.
- **Supporting-evidence references** → the 3 `documents[]` entries
  (`rentalIncomeStatementMieterspiegel`, `maintenanceCostStatement`,
  `continuationSheetBeiblatt`), the first two left ungated (their triggering
  condition — a rented unit, or the "effektiv" cost method — lives inside the
  collapsed free-text field and cannot be structurally gated, the same
  treatment `wertschriften-und-guthabenverzeichnis` gives its own ungated
  `originalCertificatesForLargeDomesticGamingWinnings` entry), the third
  `requiredWhen` any of the three Beiblatt transfer fields is greater than
  zero.

## Mock-data test run

Per the issue's phase-3 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`all`/`any`/`not` `Condition` grammar as
GSP-0013 checked the one `requiredWhen` constraint on `documents[]` against
three scenarios:

```
OK   Scenario 1: single self-occupied property, no continuation sheet
OK   Scenario 2: two properties (one self-occupied, one rented) plus a
     Beiblatt transfer, continuation-sheet document supplied
FAIL Negative control: Beiblatt transfer amount present without the
     continuation-sheet document (expected FAIL)
    - MISSING required document: continuationSheetBeiblatt
```

**Scenario 1** (the conformance fixture,
`conformance/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/application-packet.json`)
models a single filer in Uster with one self-occupied single-family house in
Uster, ZH: Verkehrswert CHF 780,000 (transfer value from the
Gemeindesteueramt's own Liegenschaftenbewertung notice); Eigenmietwert Total
CHF 18,200 (Wohnungen/Zimmer/Garagen CHF 18,200, Gewerblich CHF 0); flat
20% maintenance-cost allowance = CHF 3,640 (20% x 18,200 = 3,640, exact);
Verbleibender Ertrag = CHF 14,560 (18,200 - 3,640 = 14,560, exact). No
continuation sheet needed (all three Beiblatt transfer fields are absent/
zero). `totalVerkehrswert` = CHF 780,000 (single property, no Beiblatt
transfer). `netRealEstateIncome` = CHF 14,560 (single property, no Beiblatt
transfer).

**Scenario 2** (VERIFICATION-only, not committed as a second conformance
fixture) models a joint filer with two properties plus one continuation-
sheet-transferred property: Property 1, the same self-occupied Uster house
as Scenario 1 (Verkehrswert CHF 780,000; Verbleibender Ertrag CHF 14,560).
Property 2, a rented multi-family building in Zürich whose own assessed
Vermögenssteuerwert is capitalization-formula-derived: Bruttojahresertrag
CHF 84,600 -> Vermögenssteuerwert = 84,600 x 100 / 7.05 = CHF 1,200,000
exactly (posts to the **Verkehrswert** column per the Wegleitung's own p.30
instruction, not the Ertragswert/Land-oder-Forstwirtschaft column, since a
multi-family building is not agricultural/forestry land); Eigenmietwert/
rental income Wohnungen/Zimmer/Garagen CHF 80,000, Gewerblich CHF 4,600,
Total CHF 84,600 (matching the Bruttojahresertrag used in the capitalization
formula); actual (effektiv) maintenance costs of CHF 22,000 (triggering the
ungated `maintenanceCostStatement` document per the disclosed scope
decision); Verbleibender Ertrag = 84,600 - 22,000 = CHF 62,600 (exact).
A third property (a small parcel of leased agricultural land) is declared on
a continuation sheet: `transferFromBeiblattErtragswert` = CHF 45,000 (an
agricultural/forestry Ertragswert, correctly posted to the Ertragswert
column since it is genuinely agricultural land, unlike Property 2's
capitalized value); `transferFromBeiblattVerkehrswert` = CHF 0;
`transferFromBeiblattVerbleibenderErtrag` = CHF 2,000. Totals:
`totalVerkehrswert` = 780,000 + 1,200,000 + 0 = **CHF 1,980,000** (exact);
`totalErtragswertLandwirtschaft` = 0 + 0 + 45,000 = **CHF 45,000** (exact);
`netRealEstateIncome` = 14,560 + 62,600 + 2,000 = **CHF 79,160** (exact,
verified: 14,560 + 62,600 = 77,160; 77,160 + 2,000 = 79,160). The negative
control confirms the evaluator actually enforces `requiredWhen` on
`documents[]` (a Beiblatt transfer amount without the mandatory
continuation-sheet document itself being supplied) rather than trivially
passing everything. No defects were found in the schema itself.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- **The Beiblatt zum Liegenschaftenverzeichnis** (continuation sheet for
  properties beyond the 10 printed rows) — a distinct, separately-published
  PDF; represented only as pass-through transfer totals and a gated
  `documents[]` entry. See scope decision above.
- **Per-property breakdown of the 10-row table** — collapsed into
  `propertyInventoryDetails`. See scope decision above.
- **The official property-valuation notice (Liegenschaftenbewertung)** the
  Gemeindesteueramt sends the taxpayer — not itself an attachment this
  form's own Wegleitung asks the filer to submit with the return (the
  Wegleitung's own "Beilagen zur Steuererklärung" checklist, p.31, lists only
  "Liegenschaftenverzeichnis mit allfälligen Beiblättern," not the valuation
  notice itself).
- **A declaration/signature block** — this form carries none of its own; see
  the dedicated scope decision above.

## Judgment calls

1. **`propertyInventoryDetails` collapses both pages' per-property data into
   one field**, rather than splitting page-1 (location/type/area/Steuerwert)
   and page-2 (income/maintenance-cost/net-income) data into two separate
   free-text fields. Because every value on both pages is linked to the same
   property by an identical row number (property 1's p.1 data and property
   1's p.2 data describe the same physical property), a single consolidated
   per-property record more faithfully represents the form's own conceptual
   unit (one property, one set of facts) than two artificially-separated
   free-text blobs would.
2. **`totalErtragswertLandwirtschaft` is `required: false`; `totalVerkehrswert`
   and `netRealEstateIncome` are `required: true`.** Almost every filer who
   completes this schedule owns at least one non-agricultural property
   (single-family house, condominium, etc.), so the Verkehrswert total and
   the net-income total are populated (even as zero) by virtually every
   filer of this schedule; the agricultural/forestry Ertragswert total
   applies only to the minority of filers who hold farmland or forestry
   land, mirroring the precedent `wertschriften-und-guthabenverzeichnis` set
   for its own required-core/optional-subtotal split.
3. **Both Steuerwert total fields, and the two per-property Steuerwert
   entries inside `propertyInventoryDetails`, are modelled as plain `number`
   fields with no derivation semantics**, consistent with the disclosed
   finding that these are, in the ordinary case, transfer values the
   Gemeindesteueramt already assigned, not filer-computed formulas — even
   though the Wegleitung discloses the underlying capitalization formula for
   a multi-family/business building's own assessed value. GovSchema v0.3 has
   no field-level formula/derivation member in any case ("Calculated /
   derived fields" remains deferred per SPEC.md §16), so this is consistent
   with the registry's existing practice elsewhere, not a special
   accommodation for this document.
4. **Amounts are modelled as plain `number` fields in whole CHF.** This
   form's own column headers print "CHF" without an explicit "ohne Rappen"
   qualifier (unlike the main return's own page headers), but the rendered
   page image confirms every entry box is a single-digit slot with no
   decimal notch — consistent with whole-CHF entry, the same convention this
   registry applies to its sibling companion schedules.
5. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its four other companion schedules,
   since this is the same cantonal tax authority's own companion form, not a
   federally standardized schedule.
6. **`taxYear` is modelled as a required field, uniquely among the five
   CH-ZH companion schedules.** See the dedicated note under "Sources
   examined" above: this is the only one of the five hosted at a
   year-independent URL and carrying a genuinely filer-entered tax-year box
   on its own face, rather than a year baked into the printed template.
7. **No live submission was attempted** — filing a real Swiss cantonal tax
   return attachment is a real legal act with a real cantonal tax authority,
   not a safe or reversible action to simulate against a live government
   process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the Wegleitung — no TCP-level reset,
WAF, or CAPTCHA gate encountered, consistent with every prior CH-ZH cycle's
finding that `zh.ch`'s own tax-forms domain is unblocked.

## Scope and jurisdiction notes

- This is Switzerland's sixth Taxes-vertical document (a companion schedule
  to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`),
  not a new vertical or jurisdiction; Switzerland remains at 2 of 6
  verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `liegenschaftenverzeichnis`.
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, consistent with the main return and every other document in this
  registry. No `edition` member is used, consistent with this registry's
  existing treatment of the other CH-ZH annual tax-year-specific schedules —
  even though this particular form's own hosting path is year-independent,
  its *content* (the tax year a given filing covers) is still scoped by the
  filer-entered `taxYear` field, not by a schema-version edition axis.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the main return and its other companion
schedules. Because `status` remains `draft`, a future review should
prioritize: confirming the next tax year's edition of both this form and the
main return keep the same box-reference numbering (557/558/578,
3951/3952/3953, and 5531-55310/5541-55410/5701-57010/5711-57110/5721-57210/
5731-57310/5741-57410/5751-57510), confirming the form's own year-
independent hosting path and "Jahr" box convention persists, and
re-screening whether either of the two remaining companion schedules
(Schuldenverzeichnis, Hilfsblatt A/B/G) has become a tractable next
candidate.
