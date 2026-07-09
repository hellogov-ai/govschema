# Verification record — `ch/zh/sta/schuldenverzeichnis` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Schuldenverzeichnis

This is the recurring "GovSchema Standard Research" cycle (**GOV-1896**). The
prior cycle (GOV-1889), which authored the Liegenschaftenverzeichnis
(real-estate register), left two companion schedules as the remaining open
backlog list: Schuldenverzeichnis (debts register) and Hilfsblatt A/B/G
(self-employment worksheets). `CATALOG.md`'s own "Known Gaps" list repeated
this open list verbatim after GOV-1889 merged. This cycle's reconnaissance
confirmed the Schuldenverzeichnis is a genuine, current, unauthenticated,
flat (non-AcroForm), single-page PDF, and picked it over Hilfsblatt A/B/G:
the latter is, in substance, three separate self-employment bookkeeping
worksheets (Forms 328/329 for Hilfsblatt A — with and without kaufmännische
Buchhaltung, 330 for Hilfsblatt B, 331 for Hilfsblatt G), each aimed at a
materially narrower filer population (self-employed and agricultural
filers) and each its own distinct multi-page accounting form, which does not
fit this registry's established one-schedule-per-cycle pattern as cleanly as
a single, simple, broadly-applicable schedule does. This document closes
the Schuldenverzeichnis gap specifically. It does not open a new vertical or
jurisdiction — Switzerland remains at 2 of 6 verticals (DMV, Taxes) — but it
further deepens the Taxes vertical's coverage of an already-open
jurisdiction, leaving Hilfsblatt A/B/G as the sole remaining open backlog
candidate (now flagged as, in substance, three separate future sub-cycle
candidates rather than one).

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/schuldenverzeichnis` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its five other companion schedules;
  this form's own printed issuer is "StA Form. 355").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/est-formulare/355_schulden_zh_2020_def.pdf>
  — "StA Form. 355 (2020) 12.20 — Schuldenverzeichnis," fetched directly
  (HTTP 200, `%PDF-1.5`, 54,514 bytes, no `/Encrypt`, no login/CAPTCHA/WAF
  gate) from the same `zh.ch` tax-forms listing page
  (<https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>)
  every prior CH-ZH cycle has used.
- **A note on this form's year-independent URL, matching the
  Liegenschaftenverzeichnis pattern.** Like `ch/zh/sta/liegenschaftenverzeichnis`
  (and unlike the three yearly-repackaged schedules — Wertschriften- und
  Guthabenverzeichnis, Berufsauslagen, Versicherungsprämien, Aus- und
  Weiterbildung, each hosted at a `.../2025/est-formulare/...` path with
  "2025" printed in its own cover title), this form is hosted at a
  **year-independent** `.../jahrunabhaengig/est-formulare/...` path, its own
  printed template dated "StA Form. 355 **(2020)** 12.20," and its cover
  page carries no tax year at all — instead, the header prints a standalone
  4-box "◂ Jahr" entry field, the same shape as the Liegenschaftenverzeichnis
  header. This document accordingly models the 'Jahr' box as its own
  required `taxYear` field, for the same reason disclosed in the
  Liegenschaftenverzeichnis's own VERIFICATION.md: the tax year is genuinely
  filer-entered data on this form, not an assumption baked into the schema
  version.
- **A note on the itemized table's per-row text-extraction artifact.**
  `pdfjs-dist` text extraction returned each of the 30 table rows' two money
  columns as an identical repeating digit string (`"113213211"` in the
  "Schuld am 31. Dezember" column, `"13213211"` in the "Schuldzinsen"
  column) rather than a distinct per-row reference code. Rendering the page
  to PNG (`node-canvas`, 3x and 6x scale) confirmed this is a text-layer
  artifact of the decorative notched digit-entry-box glyphs printed in every
  blank cell (the same box-drawing font used for the AHVN13 and Jahr entry
  boxes elsewhere on this form, and for the entry boxes across every other
  CH-ZH companion schedule this registry has modelled) — **not** a real
  per-row box-reference code. This is a materially simpler table than the
  Wertschriften- und Guthabenverzeichnis's own 24-row table (whose Zugang/
  Abgang date columns do carry real per-row codes, 2305-01..24/2309-01..24):
  this form's two money columns carry no per-row codes of any kind, only the
  two headline Total boxes (3200, 3201) at the foot of the table.
  Confirmed by direct visual inspection of the rendered page (both at 3x
  overview scale and a 6x/header-region crop) — every row is a plain blank
  box-ruled entry line, with the creditor-name/address column to its left
  printed as ordinary ruled lines (no box-ruled digit-entry font at all),
  consistent with free-text entry.
- **Companion Wegleitung, examined for rule confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025" every prior
  CH-ZH cycle has used, fetched the same way (HTTP 200, 1,497,565 bytes, 40
  pages, `%PDF-1.7`). A full-text scan for "Schuldenverzeichnis" /
  "Schuldzinsen" / "Schulden" matched PDF pp.2, 3, 10, 14-23, 31, 37, 38.
  Of these:
  - **p.31** ("Beilagen zur Steuererklärung") lists `Formular
    «Schuldenverzeichnis»` under "Weitere Beilagen" — attachments required
    only when the corresponding deduction/asset is actually claimed —
    confirming this schedule is filed as a genuine attachment, not merely
    an internal worksheet.
  - **p.37** ("Abzüge und Einkommensberechnung") carries the main return's
    own line-12 entry, `12. Schuldzinsen (soweit nicht schon unter Ziff. 2
    abgezogen) Schuldenverzeichnis 250`, matching the main return schema's
    own `debtInterestStateTax`/`debtInterestFederalTax` field descriptions
    verbatim (box 250, "to the extent not already deducted under income
    line 2"). This page also carries the Wegleitung's own fully worked
    household specimen (Muster-Meister Felix und Regula), rendered to PNG to
    resolve the jumbled specimen digits: box 250 shows **CHF 8'000** of
    debt interest, printed **identically** in both the Staatssteuer and
    Bundessteuer columns.
  - **p.38** ("Das Vermögen") carries the main return's own line-34 entry,
    `34. Schulden Schuldenverzeichnis 470`, matching the main return
    schema's own `debtsWealth` field description verbatim (box 470). The
    same rendered specimen shows box 470 = **CHF 750'000** (subtracted from
    a CHF 1'208'373 gross-asset total at box 460 to reach a CHF 458'373
    taxable-wealth figure at box 490).
  - The specimen's identical CHF 8'000 entry in both the Staatssteuer and
    Bundessteuer columns of Ziffer 12 is the direct evidentiary basis for
    this document's `totalPrivateDebtInterest` field description: this
    schedule produces one combined interest figure that the filer (or the
    online ZHprivateTax portal) transcribes unchanged into both of the main
    return's state- and federal-tax columns, unlike lines where state and
    federal law genuinely diverge (e.g. the main return's own child/
    supported-person deductions, which print different Staatssteuer/
    Bundessteuer amounts even in the same specimen).
  - **No dedicated worked specimen of this exact form's own per-creditor row
    structure exists anywhere in the Wegleitung** — the same class of
    negative finding the aus-und-weiterbildungskosten cycle (GOV-1882) made
    for Form 367 and the Liegenschaftenverzeichnis cycle (GOV-1889) made for
    Form 350. Confirmed by (1) a full-text scan for the literal footer
    string "StA Form. 355" across all 40 Wegleitung pages, which returns no
    match at all (unlike Form 350's own blank facsimile appearing on pp.14,
    28-30) — this form's own reference facsimile is not reproduced anywhere
    in the Wegleitung, only its two headline transfer boxes (250, 470) as
    printed on the main return's own pp.37-38; and (2) a full-text and
    rendered-page scan for "Muster" co-occurring with "Schuld" across all 40
    pages, which returns only these same two aggregate-transfer pages (37,
    38), with no supporting Form-355-level breakdown of Gläubiger/Schuld/
    Schuldzinsen anywhere. This negative finding is disclosed explicitly:
    this schema's own worked mock-data example (below) is independently
    constructed and hand-recomputed, not matched against an official
    specimen, though it deliberately uses a similar order of magnitude to
    the Wegleitung's own aggregate figures (a CHF 700,000 mortgage-plus-loan
    total, vs. the specimen's CHF 750,000) as a plausibility cross-check,
    not as a claim of matching any official worked example.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction with full `(x, y)` coordinates per text item, plus a `pdfjs-dist`
  per-page annotation check (`page.getAnnotations()`, filtered to
  `subtype === 'Widget'`). The check returned **zero** fillable widgets on
  the form's single page — the same flat, non-AcroForm, print/reference-
  facsimile shape as all five sibling companion schedules. The page was
  additionally **rendered to PNG** (`pdfjs-dist` + `node-canvas`, 3x scale
  for a full-page overview and 6x scale for a header-region crop) and
  visually cross-checked against the extracted text before any field name
  was assigned. This rendering pass is what resolved:
  - the exact header layout (AHVN13 with the "756" Swiss country-code prefix
    pre-printed plus 10 blank digit boxes, labelled "13-stellig"; a 4-digit
    "Jahr" box; and free-text Gemeinde/Name/Vorname fields) — field-for-field
    identical to the Liegenschaftenverzeichnis header;
  - the 30-row table's true shape (one free-text creditor-name/address
    column at left, two box-ruled whole-CHF money columns at right headed
    "Schuld am 31. Dezember" / "CHF ohne Rappen" and "Schuldzinsen" / "CHF
    ohne Rappen"), and the digit-box text-extraction artifact disclosed
    above;
  - the foot-of-table "Total Privatschulden / private Schuldzinsen" line
    (boxes 3200/3201) and the two printed transfer-arrow captions ("Zu
    übertragen in die Steuererklärung Seite 4, Ziffer 34" for box 3200; "Zu
    übertragen in die Steuererklärung Seite 3, Ziffer 12" for box 3201),
    confirming both destination lines on the main return without relying on
    the main return's own field descriptions alone.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: the 30-row creditor table collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). The form's own creditor table has 30 printed rows, each
linking a creditor's name/address to a year-end debt balance and an interest
amount — genuinely unbounded cardinality in practice (a filer with more than
30 creditors would need to summarize or continue by other means, though —
unlike its Wertschriften-und-Guthabenverzeichnis and Liegenschaftenverzeichnis
siblings — this form's own printed page makes no reference to a dedicated
continuation sheet for that case). Per this registry's established treatment
of exactly this situation elsewhere, the whole table is collapsed into one
`creditorDebtDetails` free-text field, with a full description of the values
each entry is expected to carry.

## Scope decision: no continuation-sheet modelling (unlike Wertschriften/Liegenschaften)

Both `ch/zh/sta/wertschriften-und-guthabenverzeichnis` and
`ch/zh/sta/liegenschaftenverzeichnis` model explicit pass-through transfer
fields for a continuation sheet (Beiblatt) used when a filer's holdings
exceed the printed table's row count. This document does **not** model any
such field: neither this form's own single page, nor the main return's own
line 250/470 field descriptions, nor any of the 16 Wegleitung pages that
mention "Schuldenverzeichnis"/"Schuldzinsen"/"Schulden" reference a
Schuldenverzeichnis continuation sheet by name. This is disclosed as a
confirmed absence, not an oversight: a filer with more than 30 creditors is
outside this form's own designed scope, and no distinct GovSchema document
exists to model a sheet that itself does not appear to exist.

## Field-by-field source mapping

- **Tax year** ("◂ Jahr" box) → `taxYear`. See the dedicated note above on
  why this field exists on this schedule, matching the
  Liegenschaftenverzeichnis precedent.
- **Household header** (AHVN13/Gemeinde/Name/Vorname) → `ahvn13RemainingDigits`,
  `gemeinde`, `name`, `vorname` — the same header shape and field-naming
  convention as every other CH-ZH companion schedule this registry has
  modelled (collected once per household, not per person).
- **Creditor inventory** (the 30-row "Name, Vorname und Adresse des
  Gläubigers" / "Schuld am 31. Dezember" / "Schuldzinsen" table) →
  `creditorDebtDetails`. See scope decision above.
- **Headline totals** (boxes 3200, 3201) → `totalPrivateDebt`,
  `totalPrivateDebtInterest`. The first transfers directly onto the main
  return's own `debtsWealth` field (Ziffer 34); the second transfers onto
  **both** of the main return's `debtInterestStateTax` and
  `debtInterestFederalTax` fields (Ziffer 12) — confirmed by the Wegleitung's
  own worked specimen showing an identical value in both columns (see
  "Sources examined" above).

## Mock-data test run

Per the issue's phase-3/phase-4 instruction to document field-level detail
and test-run the schema with valid mock data, this document's fields were
checked by hand against the schema's own `validation` constraints and
against the conformance fixture,
`conformance/ch/zh/sta/schuldenverzeichnis/1.0.0/application-packet.json`:

- `taxYear` = `2025` — within `[2000, 2100]`. OK.
- `ahvn13RemainingDigits` = `"7891234560"` — matches `^[0-9]{10}$` (10
  digits). OK.
- `gemeinde` = `"Winterthur"`, `name` = `"Steiner"`, `vorname` = `"Andrea"`
  — within their respective `maxLength` constraints. OK.
- `creditorDebtDetails` — describes two creditors: (1) Zürcher Kantonalbank,
  a mortgage lender on the filer's self-occupied home in Winterthur, debt
  CHF 680,000, interest CHF 7,650; (2) Hans Meier, a private individual,
  personal loan, debt CHF 20,000, interest CHF 350. Within the 6000-character
  `maxLength`. OK.
- `totalPrivateDebt` = `700000` — verified: 680,000 + 20,000 = 700,000
  (exact).
- `totalPrivateDebtInterest` = `8000` — verified: 7,650 + 350 = 8,000
  (exact). This also matches the Wegleitung's own specimen figure at box
  250 (CHF 8,000) exactly, by construction, as a plausibility check; the
  underlying two-creditor breakdown is independently authored, not copied
  from the specimen (which shows no such breakdown).

No `documents[]` array is defined on this schema (unlike its
Liegenschaftenverzeichnis and Wertschriften siblings, which each gate a
supporting-evidence attachment on a companion-transfer condition) — this
form has no continuation sheet and no separate supporting-evidence
attachment of its own beyond the schedule itself (the Wegleitung's p.31
checklist lists only "Formular «Schuldenverzeichnis»" as the attachment,
which is this document in its entirety, not a further sub-attachment) — so
there is no conditional-requirement rule to test, unlike the
Liegenschaftenverzeichnis cycle's own `requiredWhen` scenario/negative-control
pair.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/schuldenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/schuldenverzeichnis/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/schuldenverzeichnis/1.0.0/schema.json
ok   registry/ch/zh/sta/schuldenverzeichnis/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/verify-sources.mjs` was also run against this document's registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/ch/zh/sta/schuldenverzeichnis/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## What is NOT modelled (out of scope), and why

- **Per-row breakdown of the 30-row creditor table** — collapsed into
  `creditorDebtDetails`. See scope decision above.
- **A continuation sheet for creditors beyond the 30th row** — no such
  sheet appears to exist for this form. See scope decision above.
- **A declaration/signature block** — like the Liegenschaftenverzeichnis,
  this form's single page carries no signature line, declaration statement,
  or "Ort und Datum" field of its own, confirmed by a full-text search of
  the extracted page content; the main return's own page-4 declaration
  already covers every attached schedule.
- **Any office-only field.**

## Judgment calls

1. **`creditorDebtDetails` collapses the creditor name/address, debt
   balance, and interest amount into one free-text field per creditor
   row**, consistent with every other collapsed repeating table in this
   registry (Wertschriften' `securitiesAndHoldingsDetails`,
   Liegenschaften' `propertyInventoryDetails`, Berufsauslagen's private-
   vehicle commuting sub-table).
2. **No continuation-sheet field is modelled**, unlike the Wertschriften and
   Liegenschaften siblings. This is a disclosed absence-of-evidence finding,
   not a scope exclusion of an acknowledged sheet: no source examined this
   cycle (this form's own page, the main return, or the Wegleitung)
   references such a sheet by name.
3. **`totalPrivateDebtInterest`'s field description states it transfers to
   both the state- and federal-tax columns of the main return**, based on
   the Wegleitung's own worked specimen showing an identical figure in both
   columns — a factual claim about this specific line's behavior, not a
   general rule about every Staatssteuer/Bundessteuer-columned line on the
   main return (several other lines, e.g. child/supported-person
   deductions, do diverge between the two columns in the same specimen).
4. **Amounts are modelled as plain `number` fields in whole CHF**, per the
   form's own "CHF ohne Rappen" column headers (explicit on this form,
   unlike the Liegenschaftenverzeichnis's plain "CHF" headers) and the
   rendered page's box-ruled, no-decimal-notch entry cells.
5. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its five other companion schedules.
6. **`taxYear` is modelled as a required field**, matching the
   Liegenschaftenverzeichnis precedent: this is one of only two of the six
   CH-ZH companion schedules hosted at a year-independent URL with a
   genuinely filer-entered tax-year box, rather than a year baked into the
   printed template.
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

- This is Switzerland's seventh Taxes-vertical document (a companion
  schedule to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`),
  not a new vertical or jurisdiction; Switzerland remains at 2 of 6
  verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `schuldenverzeichnis`.
- No `edition` member is used, consistent with this registry's existing
  treatment of the other CH-ZH annual tax-year-specific schedules — even
  though this particular form's own hosting path is year-independent, its
  *content* (the tax year a given filing covers) is still scoped by the
  filer-entered `taxYear` field, not by a schema-version edition axis.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the main return and its other companion
schedules. Because `status` remains `draft`, a future review should
prioritize: confirming the next tax year's edition of the main return keeps
the same box-reference numbering (250, 470, 3200, 3201) for this schedule,
confirming this form's own year-independent hosting path and "Jahr" box
convention persists, and re-screening whether Hilfsblatt A/B/G (the sole
remaining CH-ZH companion-schedule gap, now understood to be three separate
self-employment worksheets rather than one schedule) has become a tractable
next candidate — most plausibly as three separate future sub-cycles rather
than one combined effort.
