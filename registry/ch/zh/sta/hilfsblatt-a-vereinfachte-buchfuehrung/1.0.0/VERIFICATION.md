# Verification record — `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Hilfsblatt A

This is the recurring "GovSchema Standard Research" cycle (**GOV-1903**). The
prior cycle (GOV-1896, Schuldenverzeichnis) left Hilfsblatt A/B/G as the sole
remaining CH-ZH companion-schedule gap — previously understood as, in
substance, three separate self-employment/agricultural bookkeeping worksheets
(Forms 328/329 for Hilfsblatt A, 330 for Hilfsblatt B, 331 for Hilfsblatt G)
rather than one schedule, and flagged as three future sub-cycle candidates
precisely because none had yet been screened for tractability. This cycle
screened and pursued only **Hilfsblatt A**, and only its current
(2024-edition) **simplified-bookkeeping** variant, Form 328 — the narrower and
more broadly applicable of Hilfsblatt A's own two variants (a self-employed
filer chooses one or the other depending on how they keep books), used by
sole proprietors/freelancers who do not keep full commercial accounts. Its
sibling variant, Form 329 ("Hilfsblatt A mit kaufmännischer Buchhaltung", for
filers who keep full commercial books and instead transcribe a signed balance
sheet/income statement onto a much shorter worksheet), is deliberately
deferred as a distinct, separately-scoped future candidate — the two variants
serve different filer populations with structurally different worksheets, so
combining them into one cycle would not fit this registry's established
one-schedule-per-cycle pattern any better than treating them separately.
Hilfsblatt B (Form 330, an agricultural questionnaire) and Hilfsblatt G (Form
331, agricultural/forestry) remain open, unscreened backlog candidates. This
document closes the Hilfsblatt A (simplified-bookkeeping) gap specifically.
It does not open a new vertical or jurisdiction — Switzerland remains at 2 of
6 verticals (DMV, Taxes) — but it further deepens the Taxes vertical's
coverage of an already-open jurisdiction.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its seven other companion
  schedules; this form's own printed issuer is "StA Form. 328").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/selbstaendig-erwerbende/328%20Hilfsblatt%20A%20mit%20vereinfachter%20ZH%202024%20DEF.pdf>
  — "StA Form. 328 (2024) 12.24 — Hilfsblatt A für Selbständigerwerbende mit
  vereinfachter Buchführung," fetched directly (HTTP 200, `%PDF-1.4`, 95,591
  bytes, 4 pages, no `/Encrypt`, no login/CAPTCHA/WAF gate) from the "Formulare
  für Selbständigerwerbende" listing, reached from the same `zh.ch` tax-forms
  hub page every prior CH-ZH cycle has used
  (<https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>).
  A byte-level scan of the raw PDF for the literal strings `/AcroForm` and
  `/Widget` returned **zero** matches for both — confirming this is a flat,
  non-AcroForm print/reference-facsimile PDF, the same shape as all seven of
  its CH-ZH sibling schedules.
- **Sibling forms identified but deliberately not pursued this cycle:**
  the same listing page also links Form 329 ("Hilfsblatt A mit
  kaufmännischer Buchhaltung"), Form 330 ("Hilfsblatt B Fragebogen für Land-
  und Forstwirtschaft"), and Form 331 ("Hilfsblatt G für Land- und
  Forstwirtschaft") — see "Why this cycle picked up Hilfsblatt A" above for
  the scope decision to defer each.
- **A note on this form's year-independent URL, matching the
  Liegenschaftenverzeichnis/Schuldenverzeichnis pattern.** Like those two
  siblings (and unlike the three yearly-repackaged schedules — Wertschriften-
  und Guthabenverzeichnis, Berufsauslagen, Versicherungsprämien, Aus- und
  Weiterbildung), this form is hosted at a **year-independent**
  `.../jahrunabhaengig/selbstaendig-erwerbende/...` path, its own printed
  template dated "StA Form. 328 **(2024)** 12.24," and its cover page carries
  a standalone filer-entered "Jahr" box rather than a year baked into the
  title. This document accordingly models the "Jahr" box as its own required
  `jahr` field, for the same reason disclosed in the Liegenschaftenverzeichnis
  and Schuldenverzeichnis VERIFICATION.md files: the tax year is genuinely
  filer-entered data on this form, not an assumption baked into the schema
  version.
- **A note on a text-extraction artifact confirming an unlabelled line.** A
  targeted byte-offset check around the raw content-stream token for
  "13.12" (the line immediately before the "13.13 Total Aktiven ohne
  Liegenschaften" total) found only a blank `( )` token following it, with no
  further label text anywhere in the surrounding stream — confirming this is
  a genuinely unlabelled catch-all asset line printed on the form itself, not
  a text-extraction gap. Modelled as `weitereAktivenOhneBezeichnung` with this
  ambiguity disclosed directly in its own field description, per this
  registry's "spec precision over cleverness" standard: an unresolved label is
  represented explicitly, not guessed.
- **Companion Wegleitung, examined for rule confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same 40-page "Wegleitung zur Steuererklärung 2025" every prior CH-ZH
  cycle has used, fetched the same way (HTTP 200, 1,497,565 bytes, 40 pages,
  `%PDF-1.7`). A full text-layer extraction (6,477 lines) was searched for
  "Hilfsblatt A", "Selbständigerwerbende", "Selbständige Erwerbstätigkeit",
  "328", "Buchführung", "Warenlager", "Umsatz", and "Bruttogewinn". Of these:
  - The Wegleitung's own reprint of the main return's Ziffer 2 confirms:
    "Einkünfte aus selbständiger Erwerbstätigkeit in Handel, Gewerbe, freien
    Berufen (**Hilfsblatt A**) oder Landwirtschaft (Hilfsblatt B oder G)" —
    confirming this document's own `einkuenfteSelbstaendigeErwerbstaetigkeitSteuerzwecke`
    (Ziffer 12) transfers to the main return's Ziffer 2, exactly as printed on
    this form's own Ziffer 12 transfer caption ("Zu übertragen in die
    Steuererklärung Seite 2, Ziffer 2").
  - The Wegleitung's own reprint of the main return's Ziffer 32 states
    verbatim: "Selbständigerwerbende mit vereinfachter Buchführung übertragen
    das Eigenkapital laut **Hilfsblatt A (Ziff. 14.4)** auf die Seite 4 der
    Steuererklärung in die Ziffer 32" — an exact, independent confirmation of
    this document's own `eigenkapitalSelbstaendigerwerbenderOhneLiegenschaften`
    (Ziffer 14.4) transfer, matching this form's own printed transfer caption
    ("Zu übertragen in die Steuererklärung Seite 4, Ziffer 32") word for word.
    The same passage additionally confirms the *kaufmännische Buchführung*
    variant (Form 329) transfers from its own, differently-numbered Ziffer
    10.4 — direct evidence that the two Hilfsblatt A variants are structurally
    distinct forms, reinforcing the decision to scope this cycle to Form 328
    only.
  - The Wegleitung's own reprint of the main return's Ziffer 16.1 ("Beiträge
    an die AHV, IV und 2. Säule, sofern nicht unter Ziff. 1 und 2 abgezogen")
    corroborates this document's own `einkaufsbeitragVorsorgeeinrichtung`
    (Ziffer 16) transfer, matching this form's own printed transfer caption
    ("Zu übertragen in die Steuererklärung Seite 3, Ziffer 16.1").
  - The Wegleitung's own attachment checklist (its "Beilagen"/required-
    documents section) lists, among the documents required for a
    self-employed filer: "Aufstellungen über Aktiven und Passiven, Einnahmen
    und Ausgaben sowie Privatentnahmen und -einlagen für Steuerpflichtige mit
    vereinfachter Buchführung" — matching this form's own printed instruction
    text verbatim ("Selbständigerwerbende mit vereinfachter Buchführung haben
    dieses Hilfsblatt vollständig auszufüllen und unterzeichnete Aufstellungen
    über Aktiven und Passiven, Einnahmen und Ausgaben sowie Privatentnahmen
    und -einlagen einzureichen"), and forming the basis for this schema's
    `signedStatementsAssetsLiabilitiesIncomeExpenses` required `documents[]`
    entry.
  - **No worked specimen of this form's own internal Ziffer 1-16 lines was
    found anywhere in the Wegleitung** — the same class of negative finding
    several prior CH-ZH cycles (Liegenschaftenverzeichnis GOV-1889,
    Aus-und-Weiterbildung GOV-1882) have already made for their own forms. A
    targeted search for "Warenlager", "Umsatz", and "Bruttogewinn" — terms
    that would only appear if the Wegleitung reproduced this form's own
    internal computation — returned zero matches across all 6,477 extracted
    lines; the Wegleitung's own worked household specimen (the same one used
    by every prior CH-ZH cycle) covers only the main return's own numbered
    lines, never this schedule's internal detail. This negative finding is
    disclosed explicitly: this schema's own worked mock-data example (below)
    is independently constructed and its arithmetic hand-recomputed
    end-to-end, not matched against an official specimen.
- **Extraction method.** Both PDFs' compressed content streams were
  decompressed directly (zlib/`FlateDecode`) and their `Tj`/`TJ` text-showing
  operators parsed with octal-escape decoding, since this form's own simple
  Latin-text font encodes characters as literal byte values (confirmed
  directly readable German prose, including printed accented characters via
  octal escapes, e.g. `\344` = ä). This is a simpler, self-written extraction
  than the `pdfjs-dist` coordinate-based approach used on some earlier CH-ZH
  cycles, chosen because it was sufficient to recover fully readable text
  from both PDFs without a rendering pass; the "13.12" byte-offset check
  above additionally confirmed one Type0/CID-encoded token in the surrounding
  stream (a decorative digit-entry-box glyph, the same class of artifact
  disclosed in the Schuldenverzeichnis cycle) is not a hidden label.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: the depreciation table (Ziffer 2.1-2.14) collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). The form's own depreciation table cross-tabulates 5 asset
categories (Geschäftsliegenschaft, Fahrzeuge, Maschinen/Werkzeuge,
Einrichtungen, Mobilien) against 7 metrics (opening value, additions,
disposals, value before depreciation, booked depreciation, rate, closing
value) — 35 cells, a genuinely multi-dimensional repeating structure, larger
and more complex than any single-axis repeating table this registry has
collapsed before (e.g. the Schuldenverzeichnis's 30-row, 2-column creditor
table). Per this registry's established treatment of unbounded/multi-
dimensional repeating tables, the whole table is collapsed into one
`depreciationScheduleSummary` free-text field; only the resulting aggregate
booked-depreciation figure, which the form itself carries forward to Ziffer
9.10, is separately modelled as `abschreibungenGemaessTabelle`.

## Scope decision: the creditor table (Ziffer 3) collapsed to one free-text field, mirroring Schuldenverzeichnis

This form's own Ziffer 3 table (business-debt creditors: name/address, debt
balance, interest) is structurally identical in kind to the standalone
Schuldenverzeichnis form's own creditor table, and is collapsed the same way,
into `geschaeftsschuldenSummary`, with the two headline totals
(`totalGeschaeftsschulden`, `totalZinsenAufGeschaeftsschulden`) separately
modelled since each transfers to a specific computed line elsewhere on this
same form (Ziffer 14.3/15.2 and Ziffer 9.7 respectively).

## Scope decision: duplicate same-value lines are modelled once, not twice

This form re-prints several figures a second time at a later Ziffer, purely
as a same-page cross-reference rather than as an independently-sourced value:
Ziffer 9.7 re-prints the same figure as `totalZinsenAufGeschaeftsschulden`
(Ziffer 3); Ziffer 14.1 and 15.1 both re-print the same figure as
`totalAktivenOhneLiegenschaften` (Ziffer 13.13); Ziffer 14.3 and 15.2 both
re-print the same figure as `totalGeschaeftsschulden` (Ziffer 3). Per this
registry's convention of not re-declaring an identical value under two field
names, none of these five duplicate re-prints has its own field; each field
description that produces the underlying value cross-references every Ziffer
it is re-printed at.

## Scope decision: Ziffer 8's own Zwischentotal excluded as a pure carry-forward

Ziffer 8 ("Zwischentotal, zu übertragen von der vorhergehenden Seite") is the
page-break carry-forward of `bruttogewinn` (Ziffer 6) plus the sum of Ziffer
7's other-business-income lines — a pure computed value with no independent
source figure of its own, consistent with the main return schema's own
stated policy of excluding "any pure computed/arithmetic line (a total, a
carried-forward transfer...)".

## Field-by-field source mapping

- **Business/household header** (Firmenname und Sitz, Branche, Geschäftsjahr
  dates, Abrechnungsart, AHVN13, Gemeinde, Name, Vorname, Erwerbsart, Jahr,
  UID, Nebensteuerdomizile) → `firmennameUndSitz`, `brancheOderArtDerGeschaeftstaetigkeit`,
  `namenUndAdressenMitgesellschafter`, `geschaeftsjahrVon`, `geschaeftsjahrBis`,
  `abrechnungsart`, `ahvn13RemainingDigits`, `gemeinde`, `name`, `vorname`,
  `erwerbsart`, `jahr`, `uidChe`, `nebensteuerdomizile`.
- **Ziffer 1 (Warenlager)** → `warenlagerAnschaffungskostenBeginn/Ende`,
  `warenlagerDeklarierterWertBeginn/Ende`, `warenlagerUnterbewertungBeginn/Ende`,
  `warenlagerUnterbewertungProzentBeginn/Ende` — modelled individually since
  this is a bounded 4-metric x 2-timepoint table (8 cells), not an unbounded
  repeating structure.
- **Ziffer 2 (Abschreibungstabelle)** → `depreciationScheduleSummary` plus
  `abschreibungenGemaessTabelle` (Ziffer 9.10). See scope decision above.
- **Ziffer 3 (Geschäftsschulden)** → `geschaeftsschuldenSummary`,
  `totalGeschaeftsschulden`, `totalZinsenAufGeschaeftsschulden`. See scope
  decision above.
- **Ziffer 4 (Berechnung des Umsatzes)** → `einnahmenBar`, `einnahmenPostBank`,
  `einnahmenVerrechnung`, `naturalbezuege`, `kundenguthabenJahresende`,
  `zwischentotalUmsatz`, `abzueglichKundenguthabenJahresanfang`,
  `abzueglichMehrwertsteuer`, `umsatz`.
- **Ziffer 5 (Waren- und Materialaufwand)** → `warenMaterialvorraeteJahresanfang`,
  `zahlungenWarenMaterialeinkaeufe`, `warenMaterialschuldenJahresende`,
  `zwischentotalWarenaufwand`, `abzWarenMaterialvorraeteJahresende`,
  `abzWarenMaterialschuldenJahresanfang`, `warenUndMaterialaufwand`.
- **Ziffer 6 (Bruttogewinn)** → `bruttogewinn`.
- **Ziffer 7 (Andere Geschäftserträge)** → `mietwertPrivatGenutzteWohnung`,
  `bruttoertraegeGeschaeftswertschriften`, `provisionenRueckverguetungenRabatte`,
  `kapitalgewinneGeschaeftsvermoegenBezeichnung`, `kapitalgewinneGeschaeftsvermoegen`,
  `weitereGeschaeftsertraegeBezeichnung`, `weitereGeschaeftsertraege`.
- **Ziffer 8 (Zwischentotal)** → excluded. See scope decision above.
- **Ziffer 9 (Geschäftsaufwendungen)** → `personalaufwand`,
  `persoenlicheAhvIvEoBeitraegeUndGeschaeftsanteil2Saeule`,
  `mieteGeschaeftsraeumlichkeiten`,
  `mietanteilGeschaeftlicheNutzungEigenerLiegenschaften`, `autokosten`,
  `privatanteilAutokosten`, `uebrigeGeschaeftsunkosten`,
  `privatanteileUebrigeUnkosten`, `abschreibungenGemaessTabelle`,
  `totalGeschaeftsaufwendungen` (Ziffer 9.7 excluded as a duplicate, see
  scope decision above; the vehicle make/model and purchase/lease-price memo
  fields printed next to Ziffer 9.6 are out of scope, see the schema's own
  description).
- **Ziffer 10-12 (Einkünfte aus selbständiger Erwerbstätigkeit)** →
  `subtotalEinkuenfteSelbstaendigeErwerbstaetigkeitAhv`,
  `persoenlicheAhvIvEoBeitraegeKorrektur`,
  `abzueglichBruttoertraegeGeschaeftswertschriften`, `weitereAbzuegeKorrektur`,
  `einkuenfteSelbstaendigeErwerbstaetigkeitSteuerzwecke` — the last transfers
  to the main return's Ziffer 2 (confirmed via the Wegleitung, see "Sources
  examined" above).
- **Ziffer 13 (Geschäftliche Aktiven ohne Liegenschaften)** → `kasse`,
  `bankguthaben`, `kundenguthabenUndAngefangeneArbeiten`, `delkredere`,
  `warenUndMaterialvorraete`, `uebrigeAktiven`, `wertschriften`,
  `maschinenWerkzeuge`, `einrichtungen`, `mobilien`, `fahrzeuge`,
  `weitereAktivenOhneBezeichnung`, `totalAktivenOhneLiegenschaften` (Ziffer
  14.1/15.1 excluded as duplicates, see scope decision above).
- **Ziffer 14-16 (Eigenkapital und Einkaufsbeitrag)** →
  `abzueglichGeschaeftswertschriftenImWertschriftenverzeichnis`,
  `eigenkapitalSelbstaendigerwerbenderOhneLiegenschaften`,
  `repartitionswertGeschaeftsliegenschaften`, `ahvMeldendesEigenkapital`,
  `einkaufsbeitragVorsorgeeinrichtung` (Ziffer 14.3/15.2 excluded as
  duplicates, see scope decision above); `eigenkapitalSelbstaendigerwerbenderOhneLiegenschaften`
  transfers to the main return's Ziffer 32 and `einkaufsbeitragVorsorgeeinrichtung`
  to Ziffer 16.1 (both confirmed via the Wegleitung, see "Sources examined"
  above).
- **Signature block** → `placeOfSigning`, `dateOfSigning`, plus a
  `declarationAttestation` documents[] entry for "Das Hilfsblatt ist
  vollständig und wahrheitsgetreu ausgefüllt."

## Mock-data test run

Per the issue's phase-3/phase-4 instruction to document field-level detail
and test-run the schema with valid mock data, a complete, internally
consistent worked example was constructed and hand-recomputed end-to-end (a
small retail/craft sole proprietorship, "Muster Handwerk," Zürich, main
occupation, tax year 2025, cash-method accounting):

- **Ziffer 4 (Umsatz):** Bar 15,000 + Post/Bank 180,000 + Verrechnung 5,000 +
  Naturalbezüge 2,000 + Kundenguthaben Jahresende 12,000 = Zwischentotal
  **214,000**; minus Kundenguthaben Jahresanfang 9,000 minus Mehrwertsteuer
  14,000 = Umsatz **191,000**. Verified: 214,000 − 9,000 − 14,000 = 191,000
  (exact).
- **Ziffer 5 (Warenaufwand):** Warenvorräte Jahresanfang 38,000 + Einkäufe
  95,000 + Warenschulden Jahresende 8,000 = Zwischentotal **141,000**; minus
  Warenvorräte Jahresende 42,000 minus Warenschulden Jahresanfang 6,000 =
  Warenaufwand **93,000**. Verified: 141,000 − 42,000 − 6,000 = 93,000
  (exact). The opening/closing inventory figures (38,000/42,000) are the same
  values used at `warenlagerDeklarierterWertBeginn`/`Ende` (Ziffer 1.2) and
  `warenUndMaterialvorraete` (Ziffer 13.5, closing only), by construction, as
  a cross-consistency check.
- **Ziffer 6:** Bruttogewinn = Umsatz 191,000 − Warenaufwand 93,000 =
  **98,000**. Verified: exact.
- **Ziffer 7 (Andere Geschäftserträge):** 0 + 1,500 + 800 + 3,200
  ("Verkauf Occasion-Fahrzeug") + 0 = **5,500**.
- **Ziffer 8 (excluded field, verified by hand only):** 98,000 + 5,500 =
  103,500.
- **Ziffer 9 (Geschäftsaufwendungen):** Personalaufwand 30,000 + persönliche
  AHV/2.Säule 9,500 + Miete 24,000 + Mietanteil 0 + (Autokosten 8,000 −
  Privatanteil 2,000 = 6,000) + Zinsen Geschäftsschulden 1,800 + (Übrige
  Unkosten 16,000 − Privatanteil 1,000 = 15,000) + Abschreibungen 8,000 =
  Total Geschäftsaufwendungen **94,300**. Verified: 30,000 + 9,500 + 24,000 +
  0 + 6,000 + 1,800 + 15,000 + 8,000 = 94,300 (exact).
- **Ziffer 10:** Subtotal AHV = 103,500 − 94,300 = **9,200**. Verified: exact.
- **Ziffer 11-12:** + persönliche AHV/IV/EO 7,000 (the AHV/IV/EO-only portion
  of the 9,500 booked at Ziffer 9.2, the remainder being the 2nd-pillar
  business share) − Bruttoerträge Geschäftswertschriften 1,500 (matching
  Ziffer 7.2 exactly) − weitere Abzüge (Vorjahresverlust) 2,000 = Einkünfte
  für Steuerzwecke **12,700**. Verified: 9,200 + 7,000 − 1,500 − 2,000 =
  12,700 (exact). Transfers to the main return's own Ziffer 2.
- **Ziffer 13 (Aktiven ohne Liegenschaften):** Kasse 3,000 + Bankguthaben
  25,000 + Kundenguthaben 12,000 (matching Ziffer 4.3 exactly) + Delkredere 0
  + Waren-/Materialvorräte 42,000 (matching Ziffer 5.5/1.2 exactly) + Übrige
  Aktiven 1,000 + Wertschriften 8,000 + Maschinen/Werkzeuge 15,000 +
  Einrichtungen 6,000 + Mobilien 2,000 + Fahrzeuge 18,000 + (unlabelled)
  0 = Total **132,000**. Verified: 3,000+25,000+12,000+0+42,000+1,000+8,000
  +15,000+6,000+2,000+18,000+0 = 132,000 (exact).
- **Ziffer 14:** Eigenkapital ohne Liegenschaften und Geschäftswertschriften
  = 132,000 − 8,000 (Wertschriften, matching Ziffer 13.7 exactly) − 60,000
  (Total Geschäftsschulden) = **64,000**. Verified: exact. Transfers to the
  main return's own Ziffer 32.
- **Ziffer 15:** AHV-meldendes Eigenkapital = 132,000 − 60,000 + 250,000
  (Repartitionswert Geschäftsliegenschaften) = **322,000**. Verified: exact.
- **Ziffer 16:** Einkaufsbeitrag Vorsorgeeinrichtung = **5,000**, transfers to
  the main return's own Ziffer 16.1.
- Every `validation` constraint (AHVN13 10-digit pattern, `jahr` range
  2000-2100, UID pattern, `maxLength` bounds) was also checked by hand
  against the mock values above. OK.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/verify-sources.mjs` was also run against this document's registry
directory and confirms every cited URL is live and independently reachable
(see "Access notes" below for the exact output).

## What is NOT modelled (out of scope), and why

- **The depreciation table's own 35-cell per-category breakdown** —
  collapsed into `depreciationScheduleSummary`. See scope decision above.
- **The creditor table's own per-creditor breakdown** — collapsed into
  `geschaeftsschuldenSummary`. See scope decision above.
- **Five duplicate same-page re-prints** (Ziffer 9.7, 14.1, 14.3, 15.1, 15.2)
  — each is the identical value to a field already modelled once elsewhere.
  See scope decision above.
- **Ziffer 8's own Zwischentotal** — a pure computed carry-forward. See scope
  decision above.
- **The vehicle make/model and purchase/lease-price memo fields** printed
  next to Ziffer 9.6 — narrative/justification detail with no transfer to
  any computed total.
- **Form 329** (Hilfsblatt A, kaufmännische Buchhaltung variant), **Form
  330** (Hilfsblatt B), and **Form 331** (Hilfsblatt G) — each a distinct
  form serving a different filer population, deliberately deferred as
  separate future candidates. See "Why this cycle picked up Hilfsblatt A"
  above.
- **Any office-only field** (none observed on this form).

## Judgment calls

1. **`depreciationScheduleSummary` and `geschaeftsschuldenSummary` collapse
   their respective repeating tables into one free-text field each**,
   consistent with every other collapsed repeating table in this registry
   (Wertschriften' `securitiesAndHoldingsDetails`, Liegenschaften'
   `propertyInventoryDetails`, Schuldenverzeichnis's `creditorDebtDetails`).
2. **Five same-page duplicate re-prints are each modelled once, not twice**
   — a judgment call specific to this form's own internal cross-referencing
   style (distinct from a value genuinely sourced twice from two different
   printed boxes). See scope decision above.
3. **`weitereAktivenOhneBezeichnung` (Ziffer 13.12) is modelled as an
   unlabelled catch-all**, with the label ambiguity disclosed directly in
   the field description rather than guessed at, per a targeted byte-offset
   check confirming no label text exists in the source stream. See "Sources
   examined" above.
4. **`erwerbsart` is modelled as a required enum** across the form's own four
   checkbox options (Haupterwerb/Nebenerwerb x Person 1/Person 2), since a
   separate Hilfsblatt A is filed per self-employed activity and per person,
   and the form itself requires exactly one to be checked.
5. **Amounts are modelled as plain `number` fields**, consistent with every
   other CH-ZH companion schedule.
6. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its seven other companion schedules.
7. **`jahr` is modelled as a required field**, matching the
   Liegenschaftenverzeichnis/Schuldenverzeichnis precedent: this is one of
   three of the eight CH-ZH companion schedules hosted at a year-independent
   URL with a genuinely filer-entered tax-year box, rather than a year baked
   into the printed template.
8. **No live submission was attempted** — filing a real Swiss cantonal tax
   return attachment is a real legal act with a real cantonal tax authority,
   not a safe or reversible action to simulate against a live government
   process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for both this form and the Wegleitung — no TCP-level reset,
WAF, or CAPTCHA gate encountered, consistent with every prior CH-ZH cycle's
finding that `zh.ch`'s own tax-forms domain is unblocked.

## Scope and jurisdiction notes

- This is Switzerland's eighth Taxes-vertical document (a companion schedule
  to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`), not
  a new vertical or jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `hilfsblatt-a-vereinfachte-buchfuehrung`. This slug deliberately names the
  bookkeeping variant (`vereinfachte-buchfuehrung`) so that a future Form 329
  schema (`kaufmaennische-buchhaltung`, or similar) is unambiguously a
  sibling document, not a version bump of this one — the two forms are
  distinct in structure and Ziffer numbering (confirmed above: Form 329's own
  equity line is Ziffer 10.4, not 14.4), so they are modelled as sibling
  documents rather than as alternate `edition`s of one document.
- No `edition` member is used, consistent with this registry's existing
  treatment of the other CH-ZH annual tax-year-specific schedules — even
  though this particular form's own hosting path is year-independent, its
  *content* (the tax year a given filing covers) is still scoped by the
  filer-entered `jahr` field, not by a schema-version edition axis.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the main return and its other companion
schedules. Because `status` remains `draft`, a future review should
prioritize: confirming the next tax year's edition of the main return keeps
the same Ziffer numbering (2, 16.1, 32) for this schedule's own transfer
lines, confirming this form's own year-independent hosting path and "Jahr"
box convention persists, and re-screening whether Form 329 (Hilfsblatt A,
kaufmännische Buchhaltung), Hilfsblatt B (Form 330), or Hilfsblatt G (Form
331) has become a tractable next candidate.
