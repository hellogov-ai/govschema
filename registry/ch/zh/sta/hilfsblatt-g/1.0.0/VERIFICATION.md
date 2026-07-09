# Verification record — `ch/zh/sta/hilfsblatt-g` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Form 331

This is the recurring "GovSchema Standard Research" cycle (**GOV-1917**). The
prior cycle (GOV-1910, Hilfsblatt A — kaufmännische Buchführung, Form 329)
left Hilfsblatt B (Form 330, an agricultural questionnaire) and Hilfsblatt G
(Form 331, agricultural/forestry) as the two remaining CH-ZH
companion-schedule backlog candidates, both explicitly deferred at the time as
"open, unscreened-in-depth" candidates. This cycle screened both against the
same `zh.ch` "Formulare für Selbständigerwerbende" listing every prior CH-ZH
cycle has used, and pursued only **Form 331 (Hilfsblatt G)** — the narrower,
simplified-eligibility variant of the two, available only to smaller
operations (Talzone up to 8 ha of agricultural utilized area, or hill/mountain
zones up to 20 Rindergrossvieheinheiten, each with a limited scope of special
branches), which lets a qualifying filer report from summed receipts rather
than from full bookkeeping or the more elaborate Fragebogen (questionnaire)
structure that Hilfsblatt B itself uses. Both forms are 4 pages, so page count
alone did not decide the scope call; Hilfsblatt G was chosen because its own
content (a single letter-lettered Ziffer 1-3 income/expense computation) is
self-contained and fully specified by this cycle's own primary source plus a
dedicated companion Wegleitung (see below), whereas Hilfsblatt B's own
structure branches into two materially different computation paths depending
on whether the filer reports "mit Buchhaltungsabschluss" (Ziffern 1, 2, 4, 5)
or "mit Aufzeichnungen" (Ziffern 3, 4, 5) — a larger, structurally-forked
future candidate better scoped as its own dedicated cycle. This document
closes the Form 331 gap specifically, leaving **Hilfsblatt B (Form 330) as the
sole remaining CH-ZH companion-schedule backlog candidate**. It does not open
a new vertical or jurisdiction — Switzerland remains at 2 of 6 verticals (DMV,
Taxes) — but it completes CH-ZH's companion-schedule backlog down to a single
remaining item.

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/hilfsblatt-g` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its nine other companion schedules;
  this form's own printed issuer is "StA Form 331").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/selbstaendig-erwerbende/331_hig_zh_2020_def.pdf>
  — "StA Form 331 (2020) 12.20 — Hilfsblatt G für Land- und Forstwirtschaft,"
  fetched directly this cycle (HTTP 200, `%PDF-1.5`, **95,074 bytes** — exact
  byte-for-byte match against the size stated by the issue brief — **4
  pages** per the PDF's own `/Count 4`, no `/Encrypt`) from the "Formulare für
  Selbständigerwerbende" listing on the same `zh.ch` tax-forms hub page every
  prior CH-ZH cycle has used
  (<https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>).
  A byte-level scan of the raw PDF for the literal strings `/AcroForm` and
  `/Widget` returned **zero** matches for both — confirming this is a flat,
  non-AcroForm print/reference PDF, the same shape as all nine of its CH-ZH
  sibling schedules.
- **Listing-page label check (supersession cutoff).** The raw listing page
  HTML was re-fetched directly and the download link's own on-page label text
  (not just the filename) was inspected: "Hilfsblatt G für Land- und
  Forstwirtschaft," 4 Seiten, Deutsch, 90 KB — with **no** "bis `<year>`"
  cutoff qualifier, the same technique the GOV-1910 cycle documented and used
  to confirm currency. For comparison, the same listing page's superseded
  2021-dated copy of Form 328 is explicitly labelled "... bis 2023," while the
  current 2024-edition copy of Form 328 and Forms 329-331 all carry no such
  qualifier — confirming Form 331 is zh.ch's own current, unsuperseded
  edition despite its 2020-dated filename
  (`331_hig_zh_2020_def.pdf`).
- **A residual discrepancy found and disclosed: two different print-date
  stamps for "the same" Form 331.** The standalone PDF fetched directly above
  carries the footer stamp "StA Form 331 **(2020) 12.20**." The companion 2025
  Wegleitung (StA Form 332, see below) embeds its own illustrative facsimile
  of this exact same page 1 — same header fields, same Ziffer 1.1/1.2 table
  layout, same footnote text about Art. 66 BGBB — but its footer stamp reads
  "StA Form 331 **(2024) 12.25**" instead. This cycle inspected both
  facsimiles side by side (via independent `pdfjs-dist` re-extraction of each
  PDF) and found the field layout, Ziffer numbering, and footnote wording are
  textually identical between the two; nothing in the Wegleitung's own
  embedded facsimile implies a substantive content change, so this cycle
  treats the "(2024) 12.25" stamp as a periodic print-run reprint bundled into
  the newer Wegleitung rather than evidence of a supersede-worthy content
  revision to Form 331 itself. This is disclosed explicitly, rather than
  silently resolved, so a future re-verification cycle can re-check whether
  zh.ch ever republishes Form 331 itself under a newer standalone filename
  (the same kind of currency check the GOV-1910 cycle's own "stale filename"
  technique performs, applied here to a second, independently-discovered angle
  of the same underlying question).
- **A note on this form's year-independent URL, matching its Hilfsblatt-A
  siblings.** Like Forms 328/329, this form is hosted at a
  **year-independent** `.../jahrunabhaengig/selbstaendig-erwerbende/...` path
  and its cover page carries a standalone filer-entered "Jahr" box rather than
  a year baked into the title. This document accordingly models the "Jahr"
  box as its own required `jahr` field, for the same reason disclosed in
  Form 328/329's own VERIFICATION.md records.
- **Sibling form identified but deliberately not pursued this cycle:** the
  same listing page also links Form 330 ("Hilfsblatt B Fragebogen für Land-
  und Forstwirtschaft," 4 pages, 110 KB) — see "Why this cycle picked up Form
  331" above for the scope decision to defer it.
- **Companion Wegleitung #1 (main return's own 2025 Wegleitung), examined
  first and found to defer to a dedicated companion document:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/305_Wegleitung_ZH_2025_HA%20bf%20DEF.pdf>
  — the same "Wegleitung zur Steuererklärung 2025" every prior CH-ZH cycle has
  used, re-fetched the same way (HTTP 200, 1,497,565 bytes, `%PDF-1.7`, 40
  pages, extracted via `pdfjs-dist`'s `getTextContent()`). A search for "331",
  "Hilfsblatt G," "Land- und Forst," and "Landwirtschaft" across the extracted
  text found: (a) the main return's own Ziffer 2 caption reprinted verbatim,
  "**2. Einkünfte aus selbständiger Erwerbstätigkeit in Handel, Gewerbe,
  freien Berufen (Hilfsblatt A) oder Landwirtschaft (Hilfsblatt B oder G)**" —
  confirming this document's own `reineinkuenfte` transfers to the main
  return's Ziffer 2, exactly as printed on this form's own Ziffer 2.3 transfer
  caption ("zu übertragen in Ziffer 2 der Steuererklärung"); and (b) an
  explicit pointer rather than a worked specimen: "**Führen Sie einen
  Landwirtschaftsbetrieb? Dann verwenden Sie bitte das Hilfsblatt B oder das
  Hilfsblatt G. Beachten Sie die Wegleitung zu diesen Hilfsblättern**" — i.e.
  the main return's own Wegleitung explicitly does *not* attempt to explain
  Hilfsblatt B/G's own internal computation, and instead directs filers to a
  separate, dedicated Wegleitung for those two forms specifically. This is a
  useful, previously-undocumented discovery technique for any future CH-ZH
  companion-schedule candidate: search the *main return's* own Wegleitung for
  a redirect sentence naming a form-specific companion guidance document,
  rather than assuming the main Wegleitung is the only available secondary
  source.
- **Companion Wegleitung #2 (dedicated Hilfsblatt B/G Wegleitung), located via
  the redirect above and confirmed on the listing page:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/332%20Wegleitung%20HiB%20HiG%20ZH%202025%20bf%20DEF.pdf>
  — "StA Form 332 (2025) 12.25 — Wegleitung zum Hilfsblatt B" / "Wegleitung
  zum Hilfsblatt G," fetched directly this cycle (HTTP 200, `%PDF-1.x`,
  **145,979 bytes**, **8 pages** per `pdfjs-dist`'s own page count — the
  listing page's own displayed "155 KB" size label is consistent with this
  byte count under KB rounding). Pages 1-3 cover Hilfsblatt B; **page 4 is a
  dedicated "Wegleitung zum Hilfsblatt G" section**, and pages 5-7 are two
  bound Merkblätter (NL 1/2007, Naturalbezüge/Privatanteile/Naturallöhne; and
  A/2001, Abschreibungen). This Wegleitung's own page-4 section for Hilfsblatt
  G confirms:
  - **Eligibility thresholds verbatim**, matching this form's own printed
    header note and the issue brief's own description: "Für Betriebe in der
    Talzone bis zu 8 ha landwirtschaftliche Nutzfläche, für Betriebe der
    voralpinen Hügelzone und der Bergzonen bis zu 20
    Rindergrossvieheinheiten... ist anstelle der Deklaration gemäss Hilfsblatt
    B eine vereinfachte Deklaration auf dem Hilfsblatt G möglich," and "**Für
    gewisse restliche Betriebskosten** [kann] **anstelle der Auflistung eine
    Schätzung der Steuerbehörden treten**" — i.e. the simplification is
    specifically that filers sort and total their own receipts by Ziffer,
    rather than maintaining running ledgers, and may in some cases use a flat
    estimate instead of itemizing remaining costs.
  - **Ziffer-letter cross-references that independently corroborate this
    schema's own Ziffer 2.1/2.2 lettering.** The Wegleitung's own worked
    flat-rate-deduction guidance cites "**Ziffer 2.2i**" (restliche
    Betriebskosten, matching this schema's
    `andereGeschaeftsaufwendungenRestlicheBetriebskosten`) and "**Ziffer
    2.1g**" (Privatanteile, matching `privatanteilAuto` et al.) by the exact
    same letters this schema models — an independent, source-grounded
    confirmation that this document's own letter-by-letter income/expense
    modelling (a-k for Ziffer 2.1, a-i for Ziffer 2.2) matches the live form's
    actual internal lettering, not just this cycle's own re-derivation of it
    from the raw PDF text.
  - **The flat-rate deduction schedule for Ziffer 2.2i** — in the Talzone: CHF
    650/ha of Wies-/Ackerland, plus CHF 150/Mutterschwein, CHF 9/sold
    Mastschwein, CHF 3.50/sold Jager, CHF 3.50/Legehenne, CHF 25/Are of
    special crop branches; in the Berggebiet/voralpine Hügelzone: CHF
    1,000/Rindergrossvieheinheit (GVE), plus CHF 170/Mutterschwein, CHF
    12/sold Mastschwein, CHF 4 each/sold Jager and Legehenne — cited in this
    schema's own `andereGeschaeftsaufwendungenRestlicheBetriebskosten`
    description.
  - **The Merkblatt NL 1/2007 Naturalbezüge rate table**, independently
    confirming this schema's own `naturalbezuegeErwachsene`/
    `naturalbezuegeKinderBis6Jahre`/`naturalbezuegeKinder6Bis13Jahre`/
    `naturalbezuegeKinder13Bis18Jahre` standard rates (CHF 960/240/480/720)
    printed directly on Hilfsblatt G's own Ziffer 2.1e boxes, plus alternate
    lower rates for special cases (e.g. CHF 600/145/300/455 "ohne Milch") and
    the family-size reduction rule (10%/20%/30% for 4/5/6+ children) cited in
    this schema's field descriptions.
  - **The Merkblatt NL 1/2007 employer-side Naturallohnabzug table**,
    independently confirming this schema's own `verpflegungBetriebsangestellte`
    CHF 6,120/year standard rate, printed directly on Hilfsblatt G's own
    Ziffer 2.2f box ("Verpflegung: Personen zu CHF 6120.– pro Jahr").
  - **The Merkblatt A/2001 depreciation-rate table**, cited in this schema's
    own `maschinenPflanzungenDepreciationSummary`/`liegenschaftDepreciationSummary`
    field descriptions (e.g. Fahrzeuge/Maschinen 20%/40%, Reben 6%/12%,
    Obstanlagen 10%/20%, Boden 0%, Gebäude-Gesamtsatz 2%/4%, mechanische
    Einrichtungen 12%/25%).
  - **No worked, fully-numeric specimen of Hilfsblatt G's own internal Ziffer
    1-3 lines was found** in either Wegleitung — this Wegleitung is
    methodological/rate-table guidance, not a filled-in illustrative example
    with real figures. This negative finding is the same class several prior
    CH-ZH cycles have already made for their own forms and is disclosed
    explicitly: this schema's own worked mock-data example (below) is
    independently constructed and its arithmetic hand-recomputed end-to-end,
    not matched against an official specimen.
- **Extraction method.** All three PDFs (4-page form, 40-page main-return
  Wegleitung, 8-page dedicated Hilfsblatt-B/G Wegleitung) were fetched with
  `curl` and their text content extracted with `pdfjs-dist`'s legacy build
  (`getTextContent()`, text-only, no `canvas` needed), the reviewer-confirmed
  reliable default technique for CH-ZH PDFs of any size. All three extracted
  cleanly in one pass with no garbling. Because this form's own page 1 is a
  dense multi-column layout, this cycle additionally cross-checked the raw
  item-level text ordering to confirm that: the header prints only Jahr,
  Kanton Zürich (fixed text, not a field), AHVN13, Gemeinde, Name, and
  Vorname — with **no** firm-name, business-seat, Geschäftsjahr-dates,
  Erwerbsart, UID, or Nebensteuerdomizile fields anywhere in the extracted
  text (unlike Hilfsblatt A's own header) — confirming the issue brief's own
  expectation that this form's header is materially shorter than Hilfsblatt
  A's.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Scope decision: the two depreciation/value-adjustment tables (Ziffer 1.1, 1.2) each collapsed to one free-text field

GovSchema v0.3 fields are flat: there is no `array`/nested-object element type
yet (`array`/nested `object` are proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). Ziffer 1.1 cross-tabulates 2 asset columns (Maschinen inkl.
Fahrzeuge und Geräte; Pflanzungen, Obst-, Beeren-, Rebkulturen) against 6
metrics (opening book value, additions, disposals, value before depreciation,
booked depreciation, closing book value) — 12 cells. Ziffer 1.2 cross-tabulates
up to 4 real-estate columns (Gesamte nicht aufgeteilte Liegenschaft, or split
into Gebäude inkl. mech. Einrichtungen / Pflanzen inkl. Meliorationen / Boden)
against 5 metrics (opening asset value, additions, disposals, closing asset
value, and a further cumulative/current-year depreciation sub-table) — a
bounded but variably-split structure. Per this registry's established
treatment of unbounded/multi-dimensional repeating tables (see e.g.
`ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung`, `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung`),
each table is collapsed into its own free-text summary field
(`maschinenPflanzungenDepreciationSummary`, `liegenschaftDepreciationSummary`).
Unlike the Hilfsblatt-A siblings, neither table's own aggregate depreciation
figure is separately modelled as its own field, because on this form neither
table feeds forward into a *single* line: Ziffer 1.1's own booked-depreciation
metrics feed the four separate Ziffer 2.2e disposal/depreciation lines
(`abschreibungenMaschinen`, `abschreibungenObstBeerenReben`,
`abschreibungenGebaeudeMechEinrichtungen`, `abschreibungenPflanzenMeliorationen`)
individually, not as one combined transfer figure the way Form 328's own
`abschreibungenGemaessTabelle` (Ziffer 9.10) does.

## Scope decision: the Ziffer 3.1 land-use table's itemized rows collapsed to one free-text field; its "Total" row modelled individually

Ziffer 3.1 (Bewirtschaftete Flächen) is a variable-length list of
filer-named rows (up to 3 own-canton Gemeinde rows, up to 2
"In anderen Kantonen" Gemeinde rows, and an "Im Ausland" Staat row), each with
3 values (Eigentum ha/a, Pacht ha/a, Pachtzins CHF) — the same class of
unbounded, filer-named repeating structure this registry has already collapsed
elsewhere (see e.g. `ch/zh/sta/schuldenverzeichnis`,
`ch/zh/sta/liegenschaftenverzeichnis`). Per this registry's established
treatment, the itemized rows are collapsed into one free-text
`bewirtschafteteFlaechenSummary` field. The table's own "Total" row, however,
is a single, bounded, fixed-shape aggregate line with the identical 3-value
shape (Eigentum, Pacht, Pachtzins) — per the issue brief's own instruction to
model a bounded aggregate row individually even when the itemized rows above
it are collapsed, this cycle models `totalEigentumHa`, `totalPachtHa`, and
`totalPachtzinsChf` as their own required fields. **Judgment call on units:**
the form itself provides separate "ha" and "a" (Aren) entry boxes for each
area figure; this cycle folds both into a single decimal-hectare field (1 a =
0.01 ha) rather than doubling the field count with a parallel `...Aren` field
for each, since a hectare-denominated decimal loses no precision the paper
form itself carries (Aren are exact hundredths of a hectare) and this
registry has no established convention requiring a literal 1:1 box-for-box
field split when a single decimal-typed field captures the same information
losslessly.

## Scope decision: the running "Zwischentotal" subtotals of Ziffer 2.1 are modelled as computed fields whose formula is inferred from the form's own print sequence, not from an explicit printed formula

Ziffer 2.1 prints three unlabelled "Zwischentotal" lines (after lettered item
d, after item h, and after item i) before its final "Total Betriebseinkünfte"
line (after item k) — but, unlike Ziffer 2.2's own single "Zwischentotal"
(after item e, which is unambiguous since only one intervening item exists),
none of the three Ziffer 2.1 Zwischentotal lines carries an explicit printed
formula distinguishing "subtotal-of-just-this-letter-group" from
"running-cumulative-subtotal." This cycle models each as a **running
cumulative subtotal** (each equal to the prior Zwischentotal plus the
newly-introduced items since the last one), and further reads the transition
from item i (Bestand Jahresende, closing stock/inventory) to item k (Bestand
Jahresbeginn, opening stock/inventory) as an **addition-then-subtraction**
pair — closing stock value is added into the running subtotal at the
Zwischentotal immediately following item i, and opening stock value is then
subtracted to reach the final Total Betriebseinkünfte — consistent with
standard farm-accounting practice (an increase in year-end livestock/produce
inventory over the year's opening inventory represents additional realized
income for the period; a decrease reduces it) and with the form's own single
explicit minus-sign mark on the Bestand-Jahresbeginn Vorräte line, which this
cycle reads as applying to the whole item-k group rather than to that one
sub-line alone (there is no accounting rationale for subtracting only the
produce-inventory opening value while treating the three livestock-category
opening values as additions). This reading is disclosed as a judgment call,
not a certainty, since no worked specimen with real figures exists to confirm
it (see "Sources examined" above) — a future re-verification cycle should
re-check this interpretation if a specimen or an official clarification ever
surfaces.

## Scope decision: Ziffer 3.4's "Besondere Leistungen des Bundes und des Kantons" is modelled as its own itemized-breakdown section, not deduplicated against Ziffer 2.1d

Ziffer 2.1d (`besondereLeistungenBundKanton`) and Ziffer 3.4
(`direktzahlungenInsgesamt` and its five-line "davon entfallen auf"
breakdown) share an identical printed caption, "Besondere Leistungen des
Bundes und des Kantons." Unlike the pure duplicate same-value reprints this
registry declines to model twice on Hilfsblatt A (e.g. Ziffer 10.1/10.2/11.1
duplicate reprints with zero additional detail), Ziffer 3.4 is not a bare
reprint: it adds five subsidy-type sub-lines (allgemeine Hangbeiträge
Bund/Kanton, Sömmerungsbeiträge Bund/Kanton, Tierhaltung erschwerende
Produktionsbedingungen) that Ziffer 2.1d itself does not show, plus a
separate `ackerbaubeitraegeInsgesamt` cross-check disclosure figure. This
cycle therefore models Ziffer 3.4 as its own six fields, with each field's own
description cross-referencing the ordinarily-identical Ziffer 2.1d total
rather than silently merging the two. Ziffer 3.4's own printed qualifier,
"nur ausfüllen bei Bezug von Familienzulagen" ("only complete when receiving
family allowances"), is reproduced verbatim in the field descriptions; this
cycle was unable to fully resolve why a subsidy-type breakdown would be
gated on receipt of family allowances specifically (the marginal note may be
a formatting artifact tying a *different* nearby instruction — about where
Familienzulagen themselves are declared on the main return's own Ziffer 3.4 —
to this section), and discloses this as an unresolved ambiguity rather than
asserting a confident interpretation.

## Field-by-field source mapping

- **Household header** (AHVN13, Gemeinde, Name, Vorname, Jahr) →
  `ahvn13RemainingDigits`, `gemeinde`, `name`, `vorname`, `jahr`. Unlike
  Hilfsblatt A, this form's own header prints **no** firm-name/business-seat,
  Geschäftsjahr dates, Erwerbsart selector, UID, or Nebensteuerdomizile field
  — confirmed by direct re-extraction of the header text (see "Sources
  examined" above); this form is filed per farm operator, not per
  self-employed activity, so the Hilfsblatt-A-style "which of the main
  return's own four self-employment lines" selector does not appear here.
- **Ziffer 1.1 (Abschreibungstabellen — Maschinen/Pflanzungen)** →
  `maschinenPflanzungenDepreciationSummary`. See scope decision above.
- **Ziffer 1.2 (Liegenschaft)** → `liegenschaftDepreciationSummary`. See
  scope decision above.
- **Ziffer 2.1a (Erträge aus Pflanzenbau)** → `ertraegeAckerbau`,
  `ertraegeRebObstUndGemuesebau`, `ertraegeWaldbau`,
  `ertraegeHeuGrasverkaufWeitereErtraege`.
- **Ziffer 2.1b (Erträge aus Tierhaltung)** →
  `rindviehMilchUndMilchprodukte`, `rindviehFleischUndTierverkaeufe`,
  `abzueglichRindviehTierzukaeufe`, `schweineFleischUndTierverkaeufe`,
  `abzueglichSchweineTierzukaeufe`,
  `gefluegelAndereEierFleischTierverkaeufeWeitereErloese`,
  `abzueglichGefluegelAndereTierzukaeufe`.
- **Ziffer 2.1c/2.1d** → `arbeitenFuerDritteFutterUndWeidegelder`,
  `besondereLeistungenBundKanton`.
- **Ziffer 2.1, Zwischentotal (after d)** →
  `zwischentotalErtraegeArbeitenBeitraege`. See scope decision above.
- **Ziffer 2.1e (Naturalbezüge)** → `naturalbezuegeErwachsene`,
  `naturalbezuegeKinderBis6Jahre`, `naturalbezuegeKinder6Bis13Jahre`,
  `naturalbezuegeKinder13Bis18Jahre`, `kaesereibezuege`.
- **Ziffer 2.1f (Mietwert, Miet-/Pachtzinsen)** →
  `mietwertBetriebsleiterwohnung`, `mietUndPachtzinsen`.
- **Ziffer 2.1g (Privatanteile)** → `privatanteilAuto`,
  `privatanteilVersicherungen`, `privatanteilHeizungStromTelefonTv`,
  `privatanteilLoehneBetriebsangestellteAndere`.
- **Ziffer 2.1h** → `andereGeschaeftsertraegeGemaessAufstellung`.
- **Ziffer 2.1, Zwischentotal (after h)** →
  `zwischentotalNaturalbezuegeMietwerteUndPrivatanteile`.
- **Ziffer 2.1i (Bestand Jahresende)** → `bestandJahresendeRindvieh`,
  `bestandJahresendeSchweine`, `bestandJahresendeGefluegelAndereTiere`,
  `bestandJahresendeVorraete`.
- **Ziffer 2.1, Zwischentotal (after i)** →
  `zwischentotalInklBestandJahresende`. See scope decision above.
- **Ziffer 2.1k (Bestand Jahresbeginn)** → `bestandJahresbeginnRindvieh`,
  `bestandJahresbeginnSchweine`, `bestandJahresbeginnGefluegelAndereTiere`,
  `bestandJahresbeginnVorraete`.
- **Ziffer 2.1, Total Betriebseinkünfte** → `totalBetriebseinkuenfte`.
- **Ziffer 2.2a (Kosten des Pflanzenbaus)** →
  `duengerSaatgutPflanzenschutz`, `hagelversicherungspraemie`,
  `uebrigeKostenPflanzenbau`.
- **Ziffer 2.2b (Maschinen- und Zugkraftkosten)** → `treibUndSchmierstoffe`,
  `repUnterhaltKleinwerkzeuge`, `arbeitenDurchDritte`.
- **Ziffer 2.2c (Kosten Tierhaltung)** → `futterzukaufFuttergeldRindvieh`,
  `futterzukaufSchweine`, `futterGefluegelAndereTiere`,
  `tierarztMedikamenteBesamung`, `uebrigeKostenTierhaltung`.
- **Ziffer 2.2d** → `liegenschaftenUnterhaltskosten`.
- **Ziffer 2.2e (Abgänge und Abschreibungen)** → `abschreibungenMaschinen`,
  `abschreibungenObstBeerenReben`, `abschreibungenGebaeudeMechEinrichtungen`,
  `abschreibungenPflanzenMeliorationen`, `zwischentotalAbgaengeAbschreibungen`.
- **Ziffer 2.2f (Bar- und Naturallöhne)** → `barloehne`,
  `sozialleistungenAngestellte`, `verpflegungBetriebsangestellte`,
  `unterkunftBetriebsangestellte`.
- **Ziffer 2.2g (Schuld- und Pachtzinsen)** → `schuldzinsen`,
  `pachtzinsenAlpzinsen`.
- **Ziffer 2.2h** → `beitraegeAhvAusgleichskasseBetriebsinhaber`.
- **Ziffer 2.2i** → `andereGeschaeftsaufwendungenRestlicheBetriebskosten`.
- **Ziffer 2.2, Total Betriebsaufwendungen** → `totalBetriebsaufwendungen`.
- **Ziffer 2.3 (Reineinkünfte)** → `reineinkuenfte` — transfers to the main
  return's Ziffer 2 (confirmed via the main-return Wegleitung, see "Sources
  examined" above, and per this form's own printed transfer caption).
- **Ziffer 3.1 (Bewirtschaftete Flächen)** →
  `bewirtschafteteFlaechenSummary`, `totalEigentumHa`, `totalPachtHa`,
  `totalPachtzinsChf`. See scope decision above.
- **Ziffer 3.2 (Bodennutzung)** → `bodennutzungWiesenWeiden`,
  `bodennutzungSilomaisFutterrueben`, `bodennutzungGetreideMaisRapsErbsen`,
  `bodennutzungKartoffelnZuckerrueben`,
  `bodennutzungObstanlagenOhneUnternutzen`, `bodennutzungGemueseBeerenReben`,
  `bodennutzungAndere`, `totalLandwirtschaftlicheNutzflaeche`,
  `bodennutzungWald`, `bodennutzungObstbaeumeAnzahl`.
- **Ziffer 3.3 (Tierhaltung)** → `tierhaltungKueheStiere`,
  `tierhaltungAufzuchtrindvieh`, `tierhaltungMastrindvieh`,
  `tierhaltungMutterschweine`, `tierhaltungMastschweineJager`,
  `tierhaltungPferde`, `tierhaltungZiegenSchafe`, `tierhaltungGefluegel`,
  `tierhaltungAndere`, `milchkontingentKg`. See scope decision (Ziffer 3.4)
  section above for a related, but separate, disclosed ambiguity note about
  the "Anzahl" column header's own positioning — resolved here (Ziffer 3.3)
  by reading it as the shared column heading applying to each of the nine
  named category rows.
- **Ziffer 3.4 (Besondere Leistungen Bund und Kanton)** →
  `direktzahlungenInsgesamt`, `ackerbaubeitraegeInsgesamt`,
  `allgemeineHangbeitraegeBund`, `allgemeineHangbeitraegeKanton`,
  `soemmerungsbeitraegeBund`, `soemmerungsbeitraegeKanton`,
  `tierhaltungErschwerendeProduktionsbedingungen`. See scope decision above.
- **Ziffer 3.5 (Spezialbetriebszweige)** → `kaelbermast`, `pferdezucht`,
  `pensionspferde`, `pouletmast`, `viehhandel`, `andereSpezialbetriebszweige`.
- **Ziffer 3.6 (Produktionszone)** → `produktionszone`.
- **Ziffer 3.7 (Liegenschaftenkäufe und -verkäufe)** → `adresseVerkaeufer`,
  `chfVerkaufspreis`, `adresseKaeufer`, `chfKaufpreis`.
- **Ziffer 3.8 (Anderes Gewerbe als Nebenbetrieb)** →
  `anderesGewerbeAlsNebenbetrieb` — its "separat mit Hilfsblatt A deklariert"
  option cross-references this registry's own
  `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` and
  `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung` sibling schedules.
- **Footer** → `bemerkungenBeilagen`.
- **Signature block** → `placeOfSigning`, `dateOfSigning`, plus a
  `declarationAttestation` documents[] entry for "Dieses Hilfsblatt ist
  vollständig und wahrheitsgetreu ausgefüllt."

## Mock-data test run

A complete, internally consistent worked example was constructed and
hand-recomputed end-to-end (a small mixed dairy/crop farm, "Hans Meier,"
Bäretswil, Canton Zürich, Talzone, tax year 2025):

**Ziffer 2.1 — Ermittlung der Betriebseinkünfte**

- a) Erträge aus Pflanzenbau: Ackerbau 8,000 + Reb-/Obst-/Gemüsebau 0 +
  Waldbau 2,000 + Heu-/Grasverkauf 3,000 = **13,000**.
- b) Erträge aus Tierhaltung: Rindvieh (Milch 95,000 + Fleisch/Tierverkäufe
  18,000 − Tierzukäufe 6,000 = 107,000) + Schweine (Fleisch/Tierverkäufe
  4,000 − Tierzukäufe 1,000 = 3,000) + Geflügel/andere (2,500 − 500 = 2,000)
  = **112,000**.
- c) Arbeiten für Dritte, Futter-/Weidegelder = **5,000**.
- d) Besondere Leistungen Bund/Kanton = **12,000**.
- **Zwischentotal (after d)** = 13,000 + 112,000 + 5,000 + 12,000 =
  **142,000**. Verified: 13,000+112,000=125,000; +5,000=130,000;
  +12,000=142,000. Exact.
- e) Naturalbezüge: Erwachsene 1,920 (2 × CHF 960) + Kinder –6J 0 + Kinder
  6-13J 480 (1 × CHF 480) + Kinder 13-18J 0 + Käsereibezüge 0 = **2,400**.
- f) Mietwert Betriebsleiterwohnung 14,000 + Miet-/Pachtzinsen 3,000 =
  **17,000**.
- g) Privatanteile: Auto 2,500 + Versicherungen 800 + Heizung/Strom/Telefon/TV
  2,640 + Löhne andere 0 = **5,940**.
- h) Andere Geschäftserträge = **1,000**.
- **Zwischentotal (after h)** = 142,000 + 2,400 + 17,000 + 5,940 + 1,000 =
  **168,340**. Verified: 142,000+2,400=144,400; +17,000=161,400;
  +5,940=167,340; +1,000=168,340. Exact.
- i) Bestand Jahresende: Rindvieh 85,000 + Schweine 4,000 +
  Geflügel/andere 1,500 + Vorräte 22,000 = **112,500**.
- **Zwischentotal (after i)** = 168,340 + 112,500 = **280,840**. Verified:
  exact.
- k) Bestand Jahresbeginn: Rindvieh 80,000 + Schweine 3,500 +
  Geflügel/andere 1,200 + Vorräte 20,000 = **104,700**.
- **Total Betriebseinkünfte** = 280,840 − 104,700 = **176,140**. Verified:
  exact.

**Ziffer 2.2 — Ermittlung der Betriebsaufwendungen**

- a) Dünger/Saatgut/Pflanzenschutz 6,000 + Hagelversicherungsprämie 900 +
  übrige Kosten Pflanzenbau 1,500 = **8,400**.
- b) Treib-/Schmierstoffe 4,500 + Rep./Unterhalt/Kleinwerkzeuge 3,200 +
  Arbeiten durch Dritte 2,800 = **10,500**.
- c) Futterzukauf Rindvieh 21,000 + Futterzukauf Schweine 2,500 + Futter
  Geflügel/andere 900 + Tierarzt/Medikamente/Besamung 4,200 + übrige Kosten
  Tierhaltung 1,300 = **29,900**.
- d) Liegenschaften-Unterhaltskosten = **9,000**.
- e) Abgänge/Abschreibungen: Maschinen 12,000 + Obst/Beeren/Reben 500 +
  Gebäude/mech. Einrichtungen 8,000 + Pflanzen/Meliorationen 1,000 =
  **Zwischentotal 21,500**. Verified: 12,000+500=12,500; +8,000=20,500;
  +1,000=21,500. Exact.
- f) Barlöhne 15,000 + Sozialleistungen 2,000 + Verpflegung 6,120 (1 Person ×
  CHF 6,120) + Unterkunft 2,000 = **25,120**.
- g) Schuldzinsen 7,500 + Pachtzinsen/Alpzinsen 2,200 = **9,700**.
- h) Beiträge AHV-Ausgleichskasse Betriebsinhaber = **9,800**.
- i) Andere Geschäftsaufwendungen/restliche Betriebskosten = **3,500**.
- **Total Betriebsaufwendungen** = 8,400 + 10,500 + 29,900 + 9,000 + 21,500 +
  25,120 + 9,700 + 9,800 + 3,500 = **127,420**. Verified step by step:
  8,400+10,500=18,900; +29,900=48,800; +9,000=57,800; +21,500=79,300;
  +25,120=104,420; +9,700=114,120; +9,800=123,920; +3,500=127,420. Exact.

**Ziffer 2.3 — Reineinkünfte**

- Reineinkünfte = Total Betriebseinkünfte 176,140 − Total Betriebsaufwendungen
  127,420 = **48,720**. Verified: 176,140−127,420=48,720. Exact. Transfers to
  the main return's own Ziffer 2.

**Ziffer 3.1 — Bewirtschaftete Flächen**

- Bäretswil (Eigentum 12.40 ha, Pacht 3.10 ha, Pachtzins CHF 4,200);
  Wetzikon (Eigentum 2.00 ha, Pacht 0 ha, Pachtzins CHF 0) —
  `bewirtschafteteFlaechenSummary`.
- Total Eigentum = 12.40 + 2.00 = **14.40 ha**. Total Pacht = 3.10 + 0 =
  **3.10 ha**. Total Pachtzins = 4,200 + 0 = **CHF 4,200**. Verified: exact.

**Ziffer 3.2 — Bodennutzung**

- Wiesen/Weiden 8.50 + Silomais/Futterrüben 2.00 + Getreide/Mais/Raps/Erbsen
  1.50 + Kartoffeln/Zuckerrüben 0.40 + Obstanlagen 0.30 + Gemüse/Beeren/Reben
  0.20 + Andere 0.10 = **Total landw. Nutzfläche 13.00 ha**. Verified:
  8.50+2.00=10.50; +1.50=12.00; +0.40=12.40; +0.30=12.70; +0.20=12.90;
  +0.10=13.00. Exact.
- Wald 4.50 ha. **Cross-check:** Total landw. Nutzfläche (13.00 ha) + Wald
  (4.50 ha) = **17.50 ha**, exactly matching Ziffer 3.1's own Total Eigentum
  (14.40 ha) + Total Pacht (3.10 ha) = **17.50 ha** — confirming Ziffer 3.2's
  own land-use breakdown reconciles against Ziffer 3.1's own operated-area
  total, as this schema's own `totalLandwirtschaftlicheNutzflaeche`
  description states it should.
- Obstbäume: 45 St.

**Ziffer 3.3 — Tierhaltung**

- Kühe/Stiere 18, Aufzuchtrindvieh 10, Mastrindvieh 4, Mutterschweine 2,
  Mastschweine/Jager 8, Pferde 1, Ziegen/Schafe 3, Geflügel 40, Andere 0;
  Milchkontingent 145,000 kg.

**Ziffer 3.4 — Besondere Leistungen Bund und Kanton**

- Allgemeine Hangbeiträge Bund 5,000 + Kanton 3,000 + Sömmerungsbeiträge Bund
  0 + Kanton 0 + Tierhaltung erschwerende Produktionsbedingungen 4,000 =
  **Direktzahlungen, insgesamt 12,000**. Verified: 5,000+3,000=8,000;
  +4,000=12,000. Exact, and matches `besondereLeistungenBundKanton` (Ziffer
  2.1d) = 12,000 exactly, confirming the cross-reference disclosed in the
  scope decision above.
- Ackerbaubeiträge, insgesamt = 2,000 (a subset of, and already included
  within, `ertraegeAckerbau` = 8,000 at Ziffer 2.1a — 2,000 ≤ 8,000, so the
  "müssen in den Betriebseinkünften enthalten sein" disclosure requirement is
  satisfied).

**Ziffer 3.5-3.8**

- Spezialbetriebszweige: all five checkboxes `false`; no other special
  branch.
- Produktionszone: `Talzone`.
- Ziffer 3.7: no property transactions this year (fields left blank).
- Ziffer 3.8: `in den vorstehenden Reineinkünften enthalten` (no separate
  secondary trade).
- Bemerkungen/Beilagen: "Pachtlandverzeichnis beigelegt für Gemeinde
  Wetzikon (Pacht 3.10 ha)."

Every `validation` constraint (AHVN13 10-digit pattern, `jahr` range
2000-2100, `produktionszone`/`anderesGewerbeAlsNebenbetrieb` enum membership,
non-negative integer counts, `maxLength` bounds) was also checked by hand
against the mock values above. OK.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/hilfsblatt-g/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-g/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/hilfsblatt-g/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-g/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/verify-sources.mjs` was also run (see "Access notes" below for the
exact output and invocation).

## What is NOT modelled (out of scope), and why

- **The Ziffer 1.1/1.2 depreciation/value-adjustment tables' own per-category,
  per-metric cell breakdown** — collapsed into
  `maschinenPflanzungenDepreciationSummary` and
  `liegenschaftDepreciationSummary`. See scope decision above.
- **The Ziffer 3.1 land-use table's own itemized, filer-named
  municipality/canton/country rows** — collapsed into
  `bewirtschafteteFlaechenSummary`; its bounded "Total" row is modelled
  individually. See scope decision above.
- **Form 330 (Hilfsblatt B, Fragebogen für Land- und Forstwirtschaft)** — a
  distinct, larger, dual-computation-path questionnaire serving farms
  exceeding this form's own eligibility thresholds, deliberately deferred as
  a separate future candidate. See "Why this cycle picked up Form 331"
  above.
- **Any office-only field** (none observed on this form).

## Judgment calls

1. **`maschinenPflanzungenDepreciationSummary` and
   `liegenschaftDepreciationSummary` each collapse their own cross-tabulated
   table into one free-text field**, consistent with every other collapsed
   repeating table in this registry, but with no separately-modelled
   aggregate transfer figure, since neither table feeds a single combined
   line elsewhere on this form (each of the four Ziffer 2.2e lines instead
   draws from a different individual cell). See scope decision above.
2. **`bewirtschafteteFlaechenSummary` collapses its own itemized rows to one
   field, while its "Total" row is modelled individually** as
   `totalEigentumHa`/`totalPachtHa`/`totalPachtzinsChf`, folding the form's
   own separate ha/a entry boxes into one decimal-hectare field per area
   figure. See scope decision above.
3. **The three Ziffer 2.1 "Zwischentotal" lines are modelled as running
   cumulative subtotals**, and the transition from Ziffer 2.1i (added) to
   Ziffer 2.1k (subtracted) is read as a stock/inventory-change convention
   applied to the whole item-k group, not just its one explicitly
   minus-signed sub-line — a disclosed, not certain, interpretation absent a
   worked specimen. See scope decision above.
4. **Ziffer 3.4's six fields are modelled as a distinct itemized-breakdown
   section**, cross-referenced against or ordinarily equal to Ziffer 2.1d's
   own total, rather than deduplicated as a pure reprint. See scope decision
   above.
5. **The Ziffer 3.3 "Anzahl" column header is read as applying uniformly to
   all nine named animal-category rows**, rather than as a second value tied
   specifically to `milchkontingentKg` — a disclosed reading of a genuinely
   ambiguous print layout (see the field's own description).
6. **Booleans (`kaelbermast`, `pferdezucht`, `pensionspferde`, `pouletmast`,
   `viehhandel`) use GovSchema's `boolean` field type** for the form's own
   ja/nein checkboxes, rather than the `string`+`enum` pattern this registry
   has used elsewhere for multi-option selects, since each is a genuine
   binary yes/no question.
7. **`produktionszone` is modelled as a required, single-select enum**
   across the form's own five mutually exclusive zone options, since a
   farm's production zone is fixed and always determinable, and it gates the
   applicable flat-rate deduction schedule for Ziffer 2.2i.
8. **`jahr` is modelled as a required field**, matching the Form 328/329
   precedent: this form is likewise hosted at a year-independent URL with a
   genuinely filer-entered tax-year box.
9. **Amounts are modelled as plain `number` fields** (or `integer` for
   discrete head counts and the Obstbäume count), consistent with every
   other CH-ZH companion schedule.
10. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
    identical to the main return and its nine other companion schedules.
11. **No live submission was attempted** — filing a real Swiss cantonal tax
    return attachment is a real legal act with a real cantonal tax
    authority, not a safe or reversible action to simulate against a live
    government process, consistent with this registry's standing
    discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for the form, the main return's own Wegleitung, and the
dedicated Hilfsblatt B/G Wegleitung alike — no TCP-level reset, WAF, or
CAPTCHA gate encountered, consistent with every prior CH-ZH cycle's finding
that `zh.ch`'s own tax-forms domain is unblocked.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/ch/zh/sta/hilfsblatt-g
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 6 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is Switzerland's tenth Taxes-vertical document (a companion schedule
  to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`), not
  a new vertical or jurisdiction; Switzerland remains at 2 of 6 verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and a short slug, `hilfsblatt-g`, since — unlike the two Hilfsblatt
  A variants, which needed a bookkeeping-method disambiguator in their own
  slugs — Hilfsblatt G is its own standalone form with no sibling variant
  requiring disambiguation.
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
the same Ziffer-2 transfer target for this schedule's own Reineinkünfte line,
confirming this form's own year-independent hosting path and "Jahr" box
convention persists, re-checking whether the standalone Form 331 PDF is ever
republished under a newer print-date stamp matching the "(2024) 12.25"
facsimile embedded in the 2025 Wegleitung (see the residual discrepancy
disclosed under "Sources examined" above), and re-screening whether
Hilfsblatt B (Form 330) — now the sole remaining CH-ZH companion-schedule
backlog candidate — has become a tractable next cycle's candidate.
