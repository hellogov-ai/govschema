# Verification record — `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Form 329

This is the recurring "GovSchema Standard Research" cycle (**GOV-1910**). The
prior cycle (GOV-1903, Hilfsblatt A — vereinfachte Buchführung, Form 328) left
Form 329 (Hilfsblatt A's own kaufmännische-Buchhaltung variant), Hilfsblatt B
(Form 330, an agricultural questionnaire), and Hilfsblatt G (Form 331,
agricultural/forestry) as the three remaining CH-ZH companion-schedule
backlog candidates, none yet screened for tractability. This cycle screened
all three against the same `zh.ch` "Formulare für Selbständigerwerbende"
listing used by every prior CH-ZH cycle and pursued only **Form 329** — the
direct sibling of the already-published Form 328, serving the same
self-employed-filer population but under the opposite bookkeeping method
(full commercial accounts rather than simplified/single-entry books), and by
far the most tractable of the three: a 2-page worksheet versus the two
agricultural forms' own 4 pages each of livestock/crop-specific detail
serving a materially smaller and more specialized filer population (farmers).
Hilfsblatt B and Hilfsblatt G remain open, unscreened-in-depth backlog
candidates for a future cycle. This document closes the Form 329 gap
specifically. It does not open a new vertical or jurisdiction — Switzerland
remains at 2 of 6 verticals (DMV, Taxes) — but it further deepens the Taxes
vertical's coverage of an already-open jurisdiction.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its eight other companion schedules;
  this form's own printed issuer is "StA Form. 329").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/selbstaendig-erwerbende/329_hilfsblatt_a_kaufmaennischer_zh_2021_def.pdf>
  — "StA Form. 329 (2021) 12.21 — Hilfsblatt A für Selbständigerwerbende mit
  kaufmännischer Buchführung," fetched directly (HTTP 200, `%PDF-1.4`,
  112,995 bytes, 2 pages, no `/Encrypt`, no login/CAPTCHA/WAF gate) from the
  "Formulare für Selbständigerwerbende" listing on the same `zh.ch` tax-forms
  hub page every prior CH-ZH cycle has used
  (<https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>).
  A byte-level scan of the raw PDF for the literal strings `/AcroForm` and
  `/Widget` returned **zero** matches for both — confirming this is a flat,
  non-AcroForm print/reference-facsimile PDF, the same shape as all eight of
  its CH-ZH sibling schedules.
- **A note on this form's apparently stale filename date, and how currency
  was actually confirmed.** Form 329's own PDF filename
  (`329_hilfsblatt_a_kaufmaennischer_zh_2021_def.pdf`) carries a 2021 date
  stamp, and Hilfsblatt B/G's own filenames (`330_hib_zh_2020_def.pdf`,
  `331_hig_zh_2020_def.pdf`) carry 2020 date stamps — at first glance these
  could look superseded, the same way the zh.ch listing page separately links
  an explicitly-labelled-obsolete 2021-dated copy of Form 328 itself
  ("Hilfsblatt A mit vereinfachter Buchführung **bis 2023**"). This cycle
  re-fetched the raw listing page HTML directly and inspected each
  download link's own on-page label text (not just the filename): Form 328's
  *current* 2024-edition copy is labelled plainly "Hilfsblatt A mit
  vereinfachter Buchführung" (no cutoff year), while its superseded 2021
  copy is explicitly labelled "... bis 2023." Forms 329, 330, and 331 are
  each labelled plainly, with **no** "bis `<year>`" qualifier anywhere —
  "Hilfsblatt A mit kaufmännischer Buchhaltung," "Hilfsblatt B Fragebogen für
  Land- und Forstwirtschaft," and "Hilfsblatt G für Land- und
  Forstwirtschaft" respectively — confirming all three are zh.ch's own
  current, unsuperseded editions despite their older internal print-run
  date stamps (these evidently need less frequent republication than the
  main return's own year-specific schedules). This label-vs-filename check
  is a useful, previously-undocumented technique for any future zh.ch
  candidate whose filename date looks old.
- **Sibling forms identified but deliberately not pursued this cycle:** the
  same listing page also links Form 330 ("Hilfsblatt B Fragebogen für Land-
  und Forstwirtschaft," 4 pages) and Form 331 ("Hilfsblatt G für Land- und
  Forstwirtschaft," 4 pages) — see "Why this cycle picked up Form 329" above
  for the scope decision to defer both.
- **A note on this form's year-independent URL, matching its Form-328
  sibling.** Like Form 328, this form is hosted at a **year-independent**
  `.../jahrunabhaengig/selbstaendig-erwerbende/...` path and its cover page
  carries a standalone filer-entered "Jahr" box rather than a year baked into
  the title. This document accordingly models the "Jahr" box as its own
  required `jahr` field, for the same reason disclosed in Form 328's own
  VERIFICATION.md: the tax year is genuinely filer-entered data on this form,
  not an assumption baked into the schema version.
- **Companion Wegleitung, examined for rule confirmation and a worked
  specimen:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same "Wegleitung zur Steuererklärung 2025" every prior CH-ZH cycle
  has used, re-fetched the same way (HTTP 200, 1,497,565 bytes, `%PDF-1.7`,
  extracted via `pdfjs-dist`'s `getTextContent()`). A search for "329",
  "kaufmännisch", "Hilfsblatt A", and "Ziffer 32"/"Ziffer 2" across the
  extracted text found:
  - The Wegleitung's own reprint of the main return's Ziffer 2 confirms:
    "Steuerpflichtige, die eine selbständige Erwerbstätigkeit ausüben, geben
    ihre Einkünfte mit dem **Hilfsblatt A für Selbständigerwerbende mit
    kaufmännischer Buchführung** oder dem Hilfsblatt A für
    Selbständigerwerbende mit vereinfachter Buchführung an" — confirming this
    document's own `einkuenfteSelbstaendigeErwerbstaetigkeit` (Ziffer 5)
    transfers to the main return's Ziffer 2, exactly as printed on this
    form's own Ziffer 2 transfer caption ("Zu übertragen in die
    Steuererklärung Seite 2, Ziffer 2").
  - The Wegleitung's own reprint of the main return's Ziffer 32 states
    verbatim: "**Selbständigerwerbende mit kaufmännischer Buchführung
    übertragen das Eigenkapital laut Hilfsblatt A (Ziff. 10.4)** auf die
    Seite 4 der Steuererklärung in die Ziff. 32. Selbständigerwerbende mit
    vereinfachter Buchführung übertragen das Eigenkapital laut Hilfsblatt A
    (Ziff. 14.4) auf die Seite 4 der Steuererklärung in die Ziff. 32" — an
    exact, independent confirmation of this document's own
    `eigenkapitalSelbstaendigerwerbenderOhneGeschaeftswertschriften` (Ziffer
    10.4) transfer, distinguishing it by Ziffer number from its Form-328
    sibling's own Ziffer 14.4 transfer, in the very same sentence. This
    directly corroborates the structural distinctness already established by
    the prior GOV-1903 cycle.
  - The form's own printed transfer captions independently corroborate the
    Ziffer 16.1 transfer for `einkaufsbeitragVorsorgeeinrichtung` ("Zu
    übertragen in die Steuererklärung Seite 3, Ziffer 16.1," printed directly
    beneath Ziffer 4.1 on the form's own face).
  - **No worked specimen of this form's own internal Ziffer 1-12 lines was
    found anywhere in the Wegleitung** — the same class of negative finding
    the GOV-1903 cycle already made for Form 328, and several other CH-ZH
    cycles have made for their own forms. This negative finding is disclosed
    explicitly: this schema's own worked mock-data example (below) is
    independently constructed and its arithmetic hand-recomputed end-to-end,
    not matched against an official specimen.
- **Extraction method.** Both PDFs' text content was extracted with
  `pdfjs-dist`'s legacy build (`getTextContent()`, text-only, no `canvas`
  needed), consistent with the reviewer-confirmed lesson from the GOV-1903
  cycle that this technique is the more reliable default for CH-ZH PDFs of
  any size, rather than a manual zlib/octal-escape fallback. Both PDFs
  (2-page form, 40-page Wegleitung) extracted cleanly in one pass with no
  garbling.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: the depreciation table (Ziffer 7.1-7.14) collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). This form's own depreciation table cross-tabulates 5 asset
categories (Geschäftsliegenschaft, Fahrzeuge, Maschinen/Werkzeuge,
Einrichtungen, Mobilien) against 7 metrics (opening book value, additions,
disposals, value before depreciation, booked depreciation, rate, closing book
value) — 35 cells, structurally identical to the depreciation table already
collapsed in Form 328's own `depreciationScheduleSummary`. Per this
registry's established treatment of unbounded/multi-dimensional repeating
tables, the whole table is collapsed into one `depreciationScheduleSummary`
free-text field. Unlike Form 328, no aggregate booked-depreciation figure is
separately modelled here, because this form's own depreciation table does not
feed forward into any other computed line: commercial-bookkeeping filers'
depreciation is already reflected in the signed balance sheet's own asset
value (`aktivenLautBilanz`, Ziffer 8.1), so the table exists here purely as
supplementary supporting detail, not as an input to any of this worksheet's
own totals.

## Scope decision: four duplicate same-value lines are modelled once, not twice

This form re-prints several figures a second (and, in one case, third) time
at a later Ziffer, purely as a same-page cross-reference rather than as an
independently-sourced value: Ziffer 10.1 re-prints the same figure as
`totalGeschaeftsaktivenOhneWertschriften` (Ziffer 8.5); Ziffer 10.2 and
Ziffer 11.2 both re-print the same figure as `totalFremdkapital` (Ziffer
9.3); and Ziffer 11.1 re-prints the same figure as `totalGeschaeftsaktiven`
(Ziffer 8.3). Per this registry's convention of not re-declaring an identical
value under two field names (the same convention Form 328 itself applied to
its own five duplicate re-prints), none of these four duplicate re-prints has
its own field; the field description of the value each re-prints
cross-references every Ziffer it reappears at.

## Scope decision: the three Steuerausscheidung disclosure figures are modelled but do not feed any computed total

Unlike Form 328, this form's own header block prints three summary figures
(Bruttoumsatz, Aufwand für Material/Waren/Drittleistungen, Schuldzinsen
gemäss Erfolgsrechnung) explicitly captioned "für Steuerausscheidungszwecke"
— disclosure detail used only for inter-cantonal tax-allocation purposes when
a business has establishments or real estate in more than one canton, not
inputs to this worksheet's own income or equity computation. All three are
modelled as fields (`bruttoumsatz`, `aufwandMaterialWarenDrittleistungen`,
`schuldzinsenGemaessErfolgsrechnung`) since each carries its own printed box
number, but each field's own description states plainly that it does not
feed any computed total on this worksheet — consistent with this registry's
"spec precision over cleverness" standard of not implying a transfer
relationship that the source does not itself establish.

## Field-by-field source mapping

- **Business/household header** (Firmenname und Sitz, Branche, Geschäftsjahr
  dates, AHVN13, Gemeinde, Name, Vorname, Erwerbsart, Jahr, UID,
  Nebensteuerdomizile) → `firmennameUndSitz`,
  `brancheOderArtDerGeschaeftstaetigkeit`, `namenUndAdressenMitgesellschafter`,
  `geschaeftsjahrVon`, `geschaeftsjahrBis`, `ahvn13RemainingDigits`,
  `gemeinde`, `name`, `vorname`, `erwerbsart`, `jahr`, `uidChe`,
  `nebensteuerdomizile`. Unlike Form 328, this form's own header prints no
  `Abrechnungsart` (cash/accrual method) selector — commercial-bookkeeping
  filers' accounting method is fixed by their own signed accounts, not a
  worksheet-level election.
- **Header boxes 1800-1802 (Steuerausscheidungszwecke)** →
  `bruttoumsatz`, `aufwandMaterialWarenDrittleistungen`,
  `schuldzinsenGemaessErfolgsrechnung`. See scope decision above.
- **Ziffer 1 (Einkünfte)** → `reingewinnOderVerlustGemaessErfolgsrechnung`.
- **Ziffer 2 (Korrekturen)** → `barbezuegeEigensalaereEigenkapitalzinsen`,
  `persoenlicheVorsorgebeitraege2Und3SaeuleA`, `weitereAufrechnungen`,
  `naturalbezuegeUndPrivatanteileUnkosten`, `weitereKorrekturen`.
- **Ziffer 3 (Subtotal AHV-Zwecke)** →
  `subtotalEinkuenfteSelbstaendigeErwerbstaetigkeitAhv`.
- **Ziffer 4 (Zusätzliche Korrekturen für Steuerzwecke)** →
  `persoenlicheAhvIvEoBeitraege`,
  `abzueglichBruttoertraegeGeschaeftswertschriften`, `weitereAbzuege`.
- **Ziffer 5 (Einkünfte aus selbständiger Erwerbstätigkeit)** →
  `einkuenfteSelbstaendigeErwerbstaetigkeit` — transfers to the main return's
  Ziffer 2 (confirmed via the Wegleitung, see "Sources examined" above).
- **Ziffer 6 (Angaben über das Warenlager)** →
  `warenlagerAnschaffungskostenBeginn/Ende`, `warenlagerBuchwertBeginn/Ende`,
  `warenlagerUnterbewertungBeginn/Ende`,
  `warenlagerUnterbewertungProzentBeginn/Ende` — modelled individually since
  this is a bounded 4-metric x 2-timepoint table (8 cells), not an unbounded
  repeating structure. Note Form 329's own Ziffer 6.2 is captioned "Buchwert"
  (book value), not Form 328's "Deklarierter Wert" (declared value) — a
  genuine wording difference between the two sibling forms, not a
  transcription error.
- **Ziffer 7 (Abschreibungstabelle)** → `depreciationScheduleSummary`. See
  scope decision above.
- **Ziffer 8 (Geschäftsaktiven)** → `aktivenLautBilanz`,
  `alsEinkommenVersteuerteStilleReservenAktiven`, `totalGeschaeftsaktiven`,
  `abzueglichGeschaeftswertschriftenAktiven`,
  `totalGeschaeftsaktivenOhneWertschriften`.
- **Ziffer 9 (Fremdkapital)** → `fremdkapitalLautBilanz`,
  `alsEinkommenVersteuerteStilleReservenFremdkapital`, `totalFremdkapital`.
- **Ziffer 10 (Eigenkapital)** →
  `differenzEinkommenssteuerwertVermoegenssteuerwertGeschaeftsliegenschaften`,
  `eigenkapitalSelbstaendigerwerbenderOhneGeschaeftswertschriften` (Ziffer
  10.1/10.2 excluded as duplicates, see scope decision above);
  `eigenkapitalSelbstaendigerwerbenderOhneGeschaeftswertschriften` transfers
  to the main return's Ziffer 32 (confirmed via the Wegleitung, see "Sources
  examined" above).
- **Ziffer 11 (Eigenkapital für AHV-Zwecke)** →
  `differenzEinkommenssteuerwertRepartitionswertGeschaeftsliegenschaften`,
  `ahvMeldendesEigenkapital` (Ziffer 11.1/11.2 excluded as duplicates, see
  scope decision above).
- **Ziffer 12 (Einkaufsbeitrag)** → `einkaufsbeitragVorsorgeeinrichtung` —
  transfers to the main return's Ziffer 16.1 (per this form's own printed
  transfer caption, "Zu übertragen in die Steuererklärung Seite 3, Ziffer
  16.1," printed beneath Ziffer 4.1).
- **Signature block** → `placeOfSigning`, `dateOfSigning`, plus a
  `declarationAttestation` documents[] entry for "Das Hilfsblatt ist
  vollständig und wahrheitsgetreu ausgefüllt."

## Mock-data test run

Per the issue's phase-3/phase-4 instruction to document field-level detail
and test-run the schema with valid mock data, a complete, internally
consistent worked example was constructed and hand-recomputed end-to-end (a
small consultancy with full commercial books, "Muster Consulting GmbH-Inh.,"
Zürich, main occupation, tax year 2025):

- **Ziffer 1.1:** Reingewinn gemäss Erfolgsrechnung = **180,000**.
- **Ziffer 2 (Korrekturen):** Barbezüge/Eigensaläre/Eigenkapitalzinsen
  60,000 + persönliche Vorsorgebeiträge 15,000 + weitere Aufrechnungen 5,000
  + Naturalbezüge/Privatanteile 3,000 + weitere Korrekturen 2,000.
- **Ziffer 3:** Subtotal AHV-Zwecke = 180,000 + 60,000 + 15,000 + 5,000 +
  3,000 + 2,000 = **265,000**. Verified: exact.
- **Ziffer 4 (Korrekturen für Steuerzwecke):** + persönliche AHV/IV/EO
  12,000 − Bruttoerträge Geschäftswertschriften 4,000 − weitere Abzüge 6,000.
- **Ziffer 5:** Einkünfte aus selbständiger Erwerbstätigkeit = 265,000 +
  12,000 − 4,000 − 6,000 = **267,000**. Verified: exact. Transfers to the
  main return's own Ziffer 2.
- **Ziffer 6 (Warenlager):** Anschaffungskosten Beginn 90,000 / Ende
  100,000; Buchwert Beginn 80,000 / Ende 88,000; Unterbewertung Beginn
  10,000 (= 11.11% of 90,000, within the 1/3 = 33.33% cap) / Ende 12,000
  (= 12.00% of 100,000, within cap). Verified: 10,000 / 90,000 = 0.1111 →
  11.11%; 12,000 / 100,000 = 0.12 → 12.00% (both exact, both ≤ 33.33).
- **Ziffer 8 (Geschäftsaktiven):** Aktiven laut Bilanz 420,000 + als
  Einkommen versteuerte stille Reserven 15,000 = Total Geschäftsaktiven
  **435,000**; minus Geschäftswertschriften 25,000 = Total Geschäftsaktiven
  ohne Geschäftswertschriften **410,000**. Verified: 420,000 + 15,000 =
  435,000; 435,000 − 25,000 = 410,000 (both exact).
- **Ziffer 9 (Fremdkapital):** Fremdkapital laut Bilanz 150,000 − als
  Einkommen versteuerte stille Reserven 5,000 = Total Fremdkapital
  **145,000**. Verified: exact.
- **Ziffer 10 (Eigenkapital):** Total Geschäftsaktiven ohne
  Geschäftswertschriften 410,000 (= Ziffer 8.5 exactly) − Total Fremdkapital
  145,000 (= Ziffer 9.3 exactly) + Differenz
  Einkommenssteuerwert/Vermögenssteuerwert 8,000 = Eigenkapital
  Selbständigerwerbender ohne Geschäftswertschriften **273,000**. Verified:
  410,000 − 145,000 + 8,000 = 273,000 (exact). Transfers to the main
  return's own Ziffer 32.
- **Ziffer 11 (Eigenkapital für AHV-Zwecke):** Total Geschäftsaktiven
  435,000 (= Ziffer 8.3 exactly) − Total Fremdkapital 145,000 (= Ziffer 9.3
  exactly) + Differenz Einkommenssteuerwert/Repartitionswert 6,000 = der AHV
  zu meldendes Eigenkapital **296,000**. Verified: 435,000 − 145,000 + 6,000
  = 296,000 (exact).
- **Ziffer 12:** Einkaufsbeitrag Vorsorgeeinrichtung = **20,000**, transfers
  to the main return's own Ziffer 16.1.
- **Header disclosure figures:** Bruttoumsatz 850,000, Aufwand für
  Material/Waren/Drittleistungen 520,000, Schuldzinsen gemäss
  Erfolgsrechnung 8,000 — disclosed for Steuerausscheidung purposes only,
  independent of the above computation chain by design (see scope decision
  above).
- Every `validation` constraint (AHVN13 10-digit pattern, `jahr` range
  2000-2100, UID pattern, inventory-percentage 0-33.33 range, `maxLength`
  bounds) was also checked by hand against the mock values above. OK.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/verify-sources.mjs` was also run against this document's registry
directory and confirms every cited URL is live and independently reachable
(see "Access notes" below for the exact output).

## What is NOT modelled (out of scope), and why

- **The depreciation table's own 35-cell per-category breakdown** —
  collapsed into `depreciationScheduleSummary`. See scope decision above.
- **Four duplicate same-page re-prints** (Ziffer 10.1, 10.2, 11.1, 11.2) —
  each is the identical value to a field already modelled once elsewhere.
  See scope decision above.
- **Form 330** (Hilfsblatt B, agricultural questionnaire) and **Form 331**
  (Hilfsblatt G, agricultural/forestry) — each a distinct, larger form
  serving a different filer population (farmers), deliberately deferred as
  separate future candidates. See "Why this cycle picked up Form 329" above.
- **Any office-only field** (none observed on this form).

## Judgment calls

1. **`depreciationScheduleSummary` collapses its 35-cell table into one
   free-text field**, consistent with Form 328 and every other collapsed
   repeating table in this registry, but unlike Form 328 it does not carry a
   separately-modelled aggregate transfer figure, since this form's own
   depreciation table does not feed any computed total. See scope decision
   above.
2. **Four same-page duplicate re-prints are each modelled once, not twice**
   — the same judgment call Form 328 itself applied to its own five
   duplicates. See scope decision above.
3. **The three Steuerausscheidung disclosure figures are modelled as plain
   fields with no transfer relationship implied**, since the source itself
   establishes none. See scope decision above.
4. **`erwerbsart` is modelled as a required enum** across the form's own four
   checkbox options (Haupterwerb/Nebenerwerb x Person 1/Person 2), mirroring
   Form 328's own header structure — this form's own Nebensteuerdomizile
   block prints the identical box numbers (1690-1693) and wording as Form
   328's, confirmed by direct extraction of both forms' header text.
5. **Amounts are modelled as plain `number` fields**, consistent with every
   other CH-ZH companion schedule.
6. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
   identical to the main return and its eight other companion schedules.
7. **`jahr` is modelled as a required field**, matching the Form 328
   precedent: this form is likewise hosted at a year-independent URL with a
   genuinely filer-entered tax-year box.
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

- This is Switzerland's ninth Taxes-vertical document (a companion schedule
  to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`), not
  a new vertical or jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and the form's own official title, ASCII-folded, as its slug:
  `hilfsblatt-a-kaufmaennische-buchfuehrung`. This slug deliberately mirrors
  its Form-328 sibling's own naming pattern
  (`hilfsblatt-a-vereinfachte-buchfuehrung`) while naming its own distinct
  bookkeeping variant, since the two forms are structurally distinct (their
  own equity lines are Ziffer 10.4 vs. 14.4, confirmed above) and are
  therefore modelled as sibling documents rather than as alternate
  `edition`s of one document.
- No `edition` member is used, consistent with this registry's existing
  treatment of the other CH-ZH companion schedules — even though this
  particular form's own hosting path is year-independent, its *content* (the
  tax year a given filing covers) is still scoped by the filer-entered
  `jahr` field, not by a schema-version edition axis.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the main return and its other companion
schedules. Because `status` remains `draft`, a future review should
prioritize: confirming the next tax year's edition of the main return keeps
the same Ziffer numbering (2, 16.1, 32) for this schedule's own transfer
lines, confirming this form's own year-independent hosting path and "Jahr"
box convention persists, and re-screening whether Hilfsblatt B (Form 330) or
Hilfsblatt G (Form 331) has become a tractable next candidate.
