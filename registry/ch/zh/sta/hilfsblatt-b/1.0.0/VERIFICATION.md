# Verification record — `ch/zh/sta/hilfsblatt-b` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Form 330

This is the recurring "GovSchema Standard Research" cycle (**GOV-1924**). The
prior cycle (GOV-1917, Hilfsblatt G — Form 331) left Hilfsblatt B (Form 330,
the larger, non-simplified agricultural/forestry questionnaire) as the sole
remaining CH-ZH companion-schedule backlog candidate, deferred at the time as
a "larger, structurally-forked future candidate better scoped as its own
dedicated cycle." This cycle re-fetched Form 330 directly and confirmed the
fork: the form's own routing instruction, printed at the very top of page 1
("Dieses Hilfsblatt ist wie folgt auszufüllen: Landwirte mit Buchhaltung:
Ziffern 1, 2, 4 und 5. Landwirte mit Aufzeichnungen: Ziffern 3, 4 und 5."),
splits the document into two mutually exclusive computation paths selected by
the filer's own bookkeeping method — but both paths, and the two shared
sections that follow them (Ziffer 4 and 5), live inside **one single 4-page
PDF**, not two separate form numbers. This is case (a) of the issue brief's
own branching decision framework (a single document with two internal
branches), not case (b) (the way Hilfsblatt A turned out to be two separate
PDFs, Forms 328/329, across the GOV-1903/GOV-1910 cycles). Accordingly this
cycle authors **one** schema, `ch/zh/sta/hilfsblatt-b`, modelling both
computation paths via a single required discriminator field (`berichtsart`)
and `requiredWhen` conditions gating each path's own computed fields — no
second child issue is filed, since there is no second PDF/form-number variant
left to defer. This closes Switzerland's CH-ZH companion-schedule backlog
entirely: no further Hilfsblatt A/B/G variant remains unscreened. It does not
open a new vertical or jurisdiction — Switzerland remains at 2 of 6 verticals
(DMV, Taxes).

## Sources examined

- **Document `(id, version)`:** `ch/zh/sta/hilfsblatt-b` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kanton Zürich — Finanzdirektion, Kantonales Steueramt Zürich
  (same authority as the main return and its ten other companion schedules;
  this form's own printed issuer is "StA Form 330").
- **Primary source:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/jahrunabhaengig/selbstaendig-erwerbende/330_hib_zh_2020_def.pdf>
  — "StA Form 330 (2020) 12.20 — Hilfsblatt B Fragebogen für Land- und
  Forstwirtschaft," fetched directly this cycle (HTTP 200, `%PDF-1.5`,
  **97,364 bytes**, **4 pages** per the PDF's own `/Count 4`, no `/Encrypt`)
  from the "Formulare für Selbständigerwerbende" listing on the same `zh.ch`
  tax-forms hub page every prior CH-ZH cycle has used
  (<https://www.zh.ch/de/steuern-finanzen/steuern/steuern-natuerliche-personen/steuererklaerung-natuerliche-personen.html>).
  A byte-level scan of the raw PDF for the literal strings `/AcroForm` and
  `/Widget` returned **zero** matches for both — confirming this is a flat,
  non-AcroForm print/reference PDF, the same shape as all ten of its CH-ZH
  sibling schedules.
- **Listing-page label check (supersession cutoff).** The raw listing page
  HTML was re-fetched directly and the download link's own on-page label text
  was inspected: "Hilfsblatt B Fragebogen für Land- und Forstwirtschaft," 4
  Seiten, "Sprachen" (multiple languages available), 93 KB — with **no**
  "bis `<year>`" cutoff qualifier, the same technique every prior CH-ZH cycle
  has used to confirm currency. This confirms Form 330 is zh.ch's own
  current, unsuperseded edition despite its 2020-dated filename
  (`330_hib_zh_2020_def.pdf`).
- **A stale size figure inherited from the prior cycle's own record, found
  and corrected.** The GOV-1917 (Hilfsblatt G) cycle's own VERIFICATION.md
  described this sibling form, without directly re-fetching it at the time,
  as "110 KB." This cycle independently re-fetched Form 330 directly and
  found its true size is **93 KB (97,364 bytes)** per both the listing page's
  own label and the fetched byte count — the "110 KB" figure instead matches
  the listing page's own size label for a *different* sibling form,
  Hilfsblatt A mit kaufmännischer Buchhaltung (Form 329, ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung).
  This is disclosed here as a minor, non-substantive correction to a prior
  cycle's own record (that record's own primary claims about Form 331 itself
  were independently re-verified separately and remain unaffected); it does
  not change any modelling decision in this document.
- **The single-PDF, two-computation-path structure, confirmed by direct
  re-extraction.** The whole 4-page PDF's text content was extracted with
  `pdfjs-dist`'s legacy build (`getTextContent()`), the same reviewer-confirmed
  technique used across every CH-ZH cycle, extracting cleanly in one pass
  with no garbling. The extraction confirms: **page 1** carries the header,
  the routing instruction quoted above, Ziffer 2 ("Nachführung der
  Abschreibungen ... auf Liegenschaften") printed in a left-hand box, and
  Ziffer 1 ("Ermittlung des Einkommens nach Buchhaltung") printed in the
  main right-hand column, both converging on the same header fields (Jahr,
  AHVN13, Gemeinde, Name, Vorname) at the page foot; **page 2** carries
  Ziffer 3.1-3.4 (the Aufzeichnungen path's own business net-worth statement
  and depreciation/acquisition-cost table) and the start of Ziffer 3.5
  (3.5.1 through 3.5.13, ending mid-table at a page-break carry-forward
  mark); **page 3** continues Ziffer 3.5 (3.5.14 through 3.5.27), then Ziffer
  3.6 (Ermittlung der Betriebsaufwendungen) and Ziffer 3.7 (Reineinkommen);
  **page 4** carries Ziffer 4 (Besondere Leistungen des Bundes und der
  Kantone), Ziffer 5 (Angaben über den Betrieb), and the signature block.
  Both computation paths (Ziffer 1/2 vs. Ziffer 3) are thus physically
  interleaved across the same four pages, not split into separate documents,
  confirming this is case (a) of the issue brief's branching framework.
- **No explicit checkbox for the path choice.** The extracted text was
  searched for a literal selector/checkbox tied to the routing instruction
  quoted above; none was found — the choice of path is implied structurally
  by which Ziffer-numbered section the filer actually completes, not by a
  printed radio button. This document's own `berichtsart` field is therefore
  a disclosed modelling addition, not a literal transcription of a printed
  form control; see "Judgment calls" below.
- **Companion Wegleitung (StA Form 332), re-examined for Hilfsblatt-B-specific
  content:**
  <https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/steuern-finanzen/steuern/natuerlichepersonen/2025/est-wegleitungen/332%20Wegleitung%20HiB%20HiG%20ZH%202025%20bf%20DEF.pdf>
  — "StA Form 332 (2025) 12.25," re-fetched this cycle (HTTP 200, 145,979
  bytes, 8 pages per `pdfjs-dist`'s own page count). Its pages 1-3 (Hilfsblatt
  B) confirm the eligibility framing already known from the GOV-1917 cycle —
  Hilfsblatt B is the default, larger questionnaire; Hilfsblatt G is only
  available to smaller operations under the stated size thresholds — and the
  same Merkblatt NL 1/2007 (Naturalbezüge/Privatanteile/Naturallöhne rate
  table) and Merkblatt A/2001 (Abschreibungen rate table) already cited in
  ch/zh/sta/hilfsblatt-g's own field descriptions, which this document
  reuses by cross-reference where the same concepts recur (e.g.
  `naturalbezuegeErwachseneAufzeichnungen`, `verpflegungBetriebsangestellteAufzeichnungen`).
  **No worked, fully-numeric specimen of Hilfsblatt B's own internal Ziffer
  1-3 lines was found** in this Wegleitung — the same negative finding
  several prior CH-ZH cycles (including GOV-1917) have already made for their
  own forms. This document's own worked mock-data example (below) is
  therefore independently constructed and its arithmetic hand-recomputed
  end-to-end for both computation paths, not matched against an official
  specimen.
- **Extraction method.** Both PDFs (the 4-page form and the 8-page dedicated
  Wegleitung) were fetched with `curl` and their text content extracted with
  `pdfjs-dist`'s legacy build (`getTextContent()`, text-only, no `canvas`
  needed), the reviewer-confirmed reliable default technique for CH-ZH PDFs
  of any size. Both extracted cleanly in one pass with no garbling.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Two genuine structural differences found against the sibling Hilfsblatt G form

Because Hilfsblatt B and Hilfsblatt G share large amounts of near-identical
printed structure (Ziffer 4 "Besondere Leistungen" is essentially identical
in substance; the shared Ziffer 5 "Angaben über den Betrieb" section is
almost line-for-line the same as Hilfsblatt G's own Ziffer 3), this cycle
cross-checked the two forms' own extracted text side by side and found two
genuine, disclosed differences, not modelling errors:

1. **An extra land-use line.** Hilfsblatt B's own Ziffer 5.2 "Bodennutzung"
   table prints a line, "Zwischenkulturen (Gemüse u.a.)" (5.2.20,
   intercropping), between "Wald" (5.2.19) and "Obstbäume" (5.2.21), that
   Hilfsblatt G's own equivalent Ziffer 3.2 land-use table does not carry at
   all. Modelled here as `zwischenkulturenGemueseUa`, with its own
   description disclosing the difference.
2. **A four-tier, not three-tier, Bergzone selector.** Hilfsblatt B's own
   Ziffer 5.4 "Zone" selector prints "Bergzone: 1 2 3 4" (four numbered
   tiers), matching the official Swiss agricultural-zone classification in
   full (Talzone, Hügelzone/vHz, Bergzone I-IV), whereas Hilfsblatt G's own
   equivalent `produktionszone` field (modelled in the GOV-1917 cycle) only
   offers "Bergzone 1," "Bergzone 2," and "Bergzone 3" — one tier short.
   Modelled here as `zone`, with an enum extending to `"Bergzone 4"` and its
   own description disclosing the difference. This cycle does **not** modify
   the already-published `ch/zh/sta/hilfsblatt-g` v1.0.0 schema to add the
   missing tier — that document is out of scope for this cycle — but flags
   it explicitly here for a future re-verification cycle of Hilfsblatt G to
   re-check.

## Scope decision: `berichtsart` models an implicit (unprinted) discriminator field

Per "Sources examined" above, Form 330 prints no literal checkbox for the
Buchhaltung-vs-Aufzeichnungen choice; the choice is structurally implied by
which Ziffer-numbered section the filer actually completes. GovSchema's flat
field model has no native notion of "the section you filled in implies your
answer to an unprinted question" — `requiredWhen` conditions need an actual
field to gate on. This document therefore adds `berichtsart` as an explicit,
required, `string` enum field (`mitBuchhaltung` / `mitAufzeichnungen`) not
directly transcribed from a printed form control, but inferred from the
form's own printed routing instruction. This is disclosed as a modelling
addition, not a literal transcription — the same class of judgment call as
Ziffer G's own inferred Zwischentotal semantics — and is the mechanism by
which every Ziffer-1/2-specific and Ziffer-3-specific field's own
`requiredWhen` condition is expressed.

## Scope decision: the Ziffer 3.1/3.2 business net-worth statement collapsed to two free-text fields; its bounded "Total" rows modelled individually

GovSchema v0.3 fields are flat: there is no `array`/nested-object element
type yet (proposed only in
[GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md),
not accepted). Ziffer 3.1 (Aktiven) cross-tabulates 11 named asset rows
(Kasse, Post/Bank, Tiere, Vorräte, Maschinen/Fahrzeuge/Geräte, Obst/Beeren/
Reben, Liegenschaft, Gebäude/mechanische Einrichtungen, Pflanzen/
Meliorationen, Boden, plus one blank row) against up to 5 metrics (Buchwert
Jahresanfang, Zugänge, Abgänge, Abschreibung/Wertberichtigung, Buchwert
Jahresende); Ziffer 3.2 (Fremdkapital) cross-tabulates 3 named liability rows
against a similar column set. Per this registry's established treatment of
multi-column cross-tabulated tables (see e.g. `ch/zh/sta/hilfsblatt-g`'s own
depreciation-table summaries), each is collapsed into its own free-text
summary field (`aktivenSummary`, `fremdkapitalSummary`). Each table's own
bounded "Total" row ("Total 1" at Ziffer 3.1.12, "Total 2" at Ziffer 3.2.5),
however, is modelled individually — as `totalAktivenJahresanfang`/
`totalAktivenJahresende` and `totalFremdkapitalJahresanfang`/
`totalFremdkapitalJahresende` respectively — per this registry's convention
of modelling a bounded aggregate row individually even when the itemized rows
above it are collapsed. The form's own Ziffer 3.3 "Differenz (Total 1 – Total
2)" row is read as carrying the same Jahresanfang/Jahresende column pair as
the rows above it (i.e. reporting business net worth at both points in time,
not a single value) and is modelled as `differenzJahresanfang`/
`differenzJahresende` — a disclosed judgment call, since no worked specimen
with real figures exists to confirm the row's own exact column shape (see
"Judgment calls" below).

## Scope decision: the Ziffer 3.4 depreciation/acquisition-cost table collapsed to one free-text field; its bounded "Total" row modelled individually

Ziffer 3.4 cross-tabulates 4 named categories (Liegenschaft gesamthaft,
Gebäude/mechanische Einrichtungen, Pflanzen/Meliorationen, Boden
Wertberichtigung) against 5 columns (A: Abschreibungen bis Jahresanfang; B:
Abschreibungen Steuerjahr; C = A + B: Abschreibungen bis Jahresende; D:
Buchwert am Jahresende; E = C + D: Anlagekosten am Jahresende) — the same
class of bounded, fixed-category cross-tabulation as Ziffer 3.1/3.2 above.
Collapsed into `abschreibungenUndAnlagekostenSummary` for the same reason;
its own bounded "Total" row (3.4.5) is modelled individually as
`totalAbschreibungenBisJahresanfang`, `totalAbschreibungenSteuerjahr`,
`totalAbschreibungenBisJahresende`, `totalBuchwertJahresendeAnlagekosten`,
and `totalAnlagekostenJahresende` — the only Total row in this document whose
own printed column formulas (C = A + B; E = C + D) are stated explicitly on
the form itself, rather than inferred from print sequence, and are
accordingly hand-verified in the worked example below without any disclosed
ambiguity.

## Scope decision: the Ziffer 5.1 land-use table's itemized rows collapsed to one free-text field; its "Total" row modelled individually

Identical treatment, and identical table shape, to `ch/zh/sta/hilfsblatt-g`'s
own Ziffer 3.1: itemized filer-named municipality/canton/country rows are
collapsed into `bewirtschafteteFlaechenSummary`; the table's own bounded
"Total" row (5.1.7) is modelled individually as `totalEigentumHa`,
`totalPachtHa`, and `totalPachtzinsChf`, folding the form's own separate
ha/a entry boxes into one decimal-hectare field per area figure (1 a = 0.01
ha), the same convention as `ch/zh/sta/hilfsblatt-g`.

## Scope decision: Ziffer 3.7.1/3.7.2 are reprints of Ziffer 3.5.27/3.6.21, not separately modelled fields

Ziffer 3.7 ("Reineinkommen") prints three lines: 3.7.1 "Total
Betriebseinkünfte (Übertrag aus Ziffer 3.5.27)," 3.7.2 "Total
Betriebsaufwendungen (Übertrag aus Ziffer 3.6.21) (–)," and 3.7.3
"Einkommen." The first two are explicit, printed carry-forward reprints of
`totalBetriebseinkuenfteAufzeichnungen` (3.5.27) and
`totalBetriebsaufwendungenAufzeichnungen` (3.6.21) respectively — the form's
own printed captions state the transfer explicitly, unlike a genuinely new
figure. Per this registry's established practice of declining to model pure
duplicate reprints twice (see e.g. `ch/zh/sta/hilfsblatt-g`'s own treatment
of Hilfsblatt A's Ziffer 10.1/10.2/11.1 reprints), this document does not add
separate `totalBetriebseinkuenfteUebertrag`/`totalBetriebsaufwendungenUebertrag`
fields; `einkommenNachAufzeichnungen` (3.7.3) is instead computed directly
from the two underlying totals.

## Scope decision: the page-break carry-forward mark (Ziffer 3.5.13/3.5.14) is not modelled

Ziffer 3.5 spans the page 2/page 3 boundary; the form prints "3.5.13 Übertrag
in Ziffer 3.5.14" at the foot of page 2 and "3.5.14 Übertrag von Ziffer
3.5.13" at the top of page 3, immediately before continuing with 3.5.15. This
is a pure pagination artifact carrying the running subtotal across the page
break, introducing no new information — this document's own
`mietwertBetriebsleiterwohnungAufzeichnungen` field (3.5.15) is the first new
line after the carry, and its own description discloses the skipped
carry-forward marks.

## Field-by-field source mapping

- **Household header** (Jahr, AHVN13, Gemeinde, Name, Vorname) →
  `jahr`, `ahvn13RemainingDigits`, `gemeinde`, `name`, `vorname`. Identical
  header shape to `ch/zh/sta/hilfsblatt-g` (no firm-name/business-seat,
  Geschäftsjahr dates, Erwerbsart selector, UID, or Nebensteuerdomizile
  field).
- **Routing instruction (unprinted discriminator)** → `berichtsart`. See
  scope decision above.
- **Ziffer 1 (Ermittlung des Einkommens nach Buchhaltung)** →
  `abschlussdatum`, `reingewinnBzwVerlust`,
  `aufrechnungGehaltPrivatbezuegeZinsgutschriften`, `aufrechnungSteuern`,
  `aufrechnungNichtBegruendeteAbschreibungenRueckstellungen`,
  `aufrechnungArbeitnehmeranteilBeruflicheVorsorge`,
  `aufrechnungSaeule3aUndPrivateVersicherungen`, `aufrechnungPrivatanteile`,
  `aufrechnungBuchgewinneHoeherbewertung`, `aufrechnungNaturalbezuege`,
  `aufrechnungMietwertBetriebsleiterwohnung`,
  `aufrechnungAndereGeschaeftsertraege`,
  `aufrechnungAndereNichtZulaessigeBelastungen`,
  `totalZifferEinsEinsUndEinsZwei`, `abzugBeitraegeAhvIvEo`,
  `abzugArbeitgeberanteilBeruflicheVorsorge`,
  `abzugNettoertraegeGeschaeftswertschriften`, `abzugAndere`,
  `totalAbzuege`, `einkommenNachBuchhaltung` — all `requiredWhen`
  `berichtsart` equals `mitBuchhaltung` for the three total/subtotal lines;
  individual add-back/deduction line items are optional, consistent with
  every other CH-ZH companion schedule's own treatment of line-item detail
  vs. required totals.
- **Ziffer 2 (Nachführung der Abschreibungen auf Liegenschaften)** →
  `liegenschaftenAbschreibungenSummary` (optional even on the Buchhaltung
  path, per the form's own "only if not otherwise apparent in the
  bookkeeping" instruction), `persoenlicheBeitraegeBetriebsinhaber` (shared
  with the Aufzeichnungen path's own Ziffer 3.7 area disclosure — see
  below).
- **Ziffer 3.1/3.2/3.3 (Aktiven/Fremdkapital/Differenz)** →
  `aktivenSummary`, `totalAktivenJahresanfang`, `totalAktivenJahresende`,
  `fremdkapitalSummary`, `totalFremdkapitalJahresanfang`,
  `totalFremdkapitalJahresende`, `differenzJahresanfang`,
  `differenzJahresende`. See scope decision above.
- **Ziffer 3.4 (Abschreibungen und Anlagekosten)** →
  `abschreibungenUndAnlagekostenSummary`, `totalAbschreibungenBisJahresanfang`,
  `totalAbschreibungenSteuerjahr`, `totalAbschreibungenBisJahresende`,
  `totalBuchwertJahresendeAnlagekosten`, `totalAnlagekostenJahresende`. See
  scope decision above.
- **Ziffer 3.5 (Ermittlung der Betriebseinkünfte)** → `einnahmenKasse`,
  `einnahmenPostBank`, `abzueglichPrivateinlagen`,
  `abzueglichSchuldenerhoehungen`, `abzueglichBezuegeBetrieblicheGeldkonti`,
  `abzueglichLiegenschaftenverkaeufe`, `betriebseinnahmen`,
  `naturalbezuegeErwachseneAufzeichnungen`,
  `naturalbezuegeKinderBis6JahreAufzeichnungen`,
  `naturalbezuegeKinder6Bis13JahreAufzeichnungen`,
  `naturalbezuegeKinder13Bis18JahreAufzeichnungen`,
  `kaesereibezuegeAufzeichnungen`, `mietwertBetriebsleiterwohnungAufzeichnungen`,
  `privatanteilAutoAufzeichnungen`, `privatanteilVersicherungenAufzeichnungen`,
  `privatanteilHeizungStromTelefonTvAufzeichnungen`,
  `privatanteilAndereAufzeichnungen`, `andereGeschaeftsertraegeAufzeichnungen`,
  `zwischentotalNachPrivatanteilen`, `bestandJahresendeTiereAufzeichnungen`,
  `bestandJahresendeVorraeteAufzeichnungen`,
  `zwischentotalInklBestandJahresendeAufzeichnungen`,
  `bestandJahresbeginnTiereAufzeichnungen`,
  `bestandJahresbeginnVorraeteAufzeichnungen`,
  `totalBetriebseinkuenfteAufzeichnungen` — all `requiredWhen` `berichtsart`
  equals `mitAufzeichnungen` for the three running-subtotal/total lines.
- **Ziffer 3.6 (Ermittlung der Betriebsaufwendungen)** → `ausgabenKasse`,
  `ausgabenPostBank`, `abzueglichPrivatentnahmen`,
  `abzueglichSchuldenrueckzahlungen`, `abzueglichInvestitionenMaschinen`,
  `abzueglichInvestitionenObstBeerenReben`, `abzueglichInvestitionenGebaeude`,
  `abzueglichInvestitionenPflanzenMeliorationen`,
  `abzueglichInvestitionenBoden`, `abzueglichEinlagenBetrieblicheGeldkonti`,
  `betriebsausgaben`, `verpflegungBetriebsangestellteAufzeichnungen`,
  `unterkunftBetriebsangestellteAufzeichnungen`,
  `abschreibungenMaschinenAufzeichnungen`,
  `abschreibungenObstBeerenRebenAufzeichnungen`,
  `abschreibungenGebaeudeMechEinrichtungenAufzeichnungen`,
  `abschreibungenPflanzenMeliorationenAufzeichnungen`,
  `abschreibungenBodenWertberichtigungenAufzeichnungen`,
  `abzugNettoertraegeGeschaeftswertschriftenAufzeichnungen`,
  `andereGeschaeftsaufwendungenAufzeichnungen`,
  `totalBetriebsaufwendungenAufzeichnungen`.
- **Ziffer 3.7 (Reineinkommen)** → `einkommenNachAufzeichnungen` (3.7.3); see
  scope decision above for why 3.7.1/3.7.2 are not separately modelled.
  `persoenlicheBeitraegeBetriebsinhaber` shared with the Buchhaltung path's
  own Ziffer 2.4.
- **Ziffer 4 (Besondere Leistungen des Bundes und der Kantone)** →
  `direktzahlungenInsgesamt`, `ackerbaubeitraegeInsgesamt`,
  `allgemeineHangbeitraegeBund`, `allgemeineHangbeitraegeKanton`,
  `soemmerungsbeitraegeBund`, `soemmerungsbeitraegeKanton`,
  `tierhaltungErschwerendeProduktionsbedingungen` — the same field set and
  structure as `ch/zh/sta/hilfsblatt-g`'s own Ziffer 3.4, shared regardless
  of `berichtsart`. Ziffer 4.1 ("Familienzulagen — in der Steuererklärung in
  Ziffer 3.4 anzugeben") is a pure navigational pointer directing the filer
  to declare family allowances on the *main return* instead, printed with no
  input box of its own on this form; it is deliberately **not** modelled as
  a field here (see "What is NOT modelled" below).
- **Ziffer 5 (Angaben über den Betrieb)** → `bewirtschafteteFlaechenSummary`,
  `totalEigentumHa`, `totalPachtHa`, `totalPachtzinsChf`,
  `tierhaltungKueheStiere` through `tierhaltungAndere`,
  `milchkontingentEinschlAlpKg`, `bodennutzungWiesenWeiden` through
  `bodennutzungAndere`, `totalLandwirtschaftlicheNutzflaeche`,
  `bodennutzungWald`, `zwischenkulturenGemueseUa`,
  `bodennutzungObstbaeumeAnzahl`, `kaelbermast`, `viehhandel`, `pouletmast`,
  `pensionspferde`, `pferdezucht`, `andereSpezialbetriebszweige`, `zone`,
  `adresseVerkaeufer`, `chfVerkaufspreis`, `adresseKaeufer`, `chfKaufpreis`,
  `anderesGewerbeAlsNebenbetrieb`, `bemerkungenBeilagen` — shared regardless
  of `berichtsart`, structurally near-identical to `ch/zh/sta/hilfsblatt-g`'s
  own Ziffer 3, with the two genuine differences disclosed above
  (`zwischenkulturenGemueseUa`, `zone`'s four-tier Bergzone enum).
- **Signature block** → `placeOfSigning`, `dateOfSigning`, plus a
  `declarationAttestation` documents[] entry for "Dieses Hilfsblatt ist
  vollständig und wahrheitsgetreu ausgefüllt."

## Mock-data test run

Because this document models two mutually exclusive computation paths, two
complete, internally consistent worked examples were constructed and
hand-recomputed end-to-end — one filer per path.

### Filer A — Buchhaltung (bookkeeping) path

"Ruedi Ackermann," Illnau-Effretikon, Canton Zürich, Talzone, tax year 2025.
`berichtsart = "mitBuchhaltung"`.

**Ziffer 1 — Ermittlung des Einkommens nach Buchhaltung**

- 1.1 Reingewinn gemäss Erfolgsrechnung = **45,000**.
- 1.2 Aufrechnungen: Gehalt/Privatbezüge/Zinsgutschriften 8,000 + Steuern
  3,500 + nicht begründete Abschreibungen/Rückstellungen 1,200 +
  Arbeitnehmeranteil berufl. Vorsorge 2,000 + Säule 3a/private Versicherungen
  1,500 + Privatanteile 4,200 + Buchgewinne Höherbewertung 0 + Naturalbezüge
  2,400 + Mietwert Betriebsleiterwohnung 14,000 + andere Geschäftserträge 500
  + andere nicht zulässige Belastungen 300 = **37,600**. Verified:
  8,000+3,500=11,500; +1,200=12,700; +2,000=14,700; +1,500=16,200;
  +4,200=20,400; +0=20,400; +2,400=22,800; +14,000=36,800; +500=37,300;
  +300=37,600. Exact.
- 1.3 Total der Ziffern 1.1 und 1.2 = 45,000 + 37,600 = **82,600**. Verified:
  exact.
- 1.4 Abzüge: Beiträge AHV/IV/EO 9,200 + Arbeitgeberanteil berufl. Vorsorge
  2,000 + Nettoerträge Geschäftswertschriften 1,800 + andere 0 = **13,000**.
  Verified: 9,200+2,000=11,200; +1,800=13,000; +0=13,000. Exact.
- 1.5 Total der Abzüge = **13,000**. Verified: exact (matches 1.4 sum).
- 1.6 Einkommen = 82,600 − 13,000 = **69,600**. Verified: exact. Transfers to
  the main return's own Ziffer 2.

**Ziffer 2 — Nachführung der Abschreibungen auf Liegenschaften** (optional,
completed here since the attached bookkeeping does not separately show
cumulative depreciation)

- Bauernhaus Illnau: Total Abschreibungen bis Ende Vorjahr 45,000 +
  Abschreibungen Steuerjahr 3,000 = Total Abschreibungen bis Jahresende
  **48,000**. Verified: 45,000+3,000=48,000. Exact.
- `persoenlicheBeitraegeBetriebsinhaber` = 9,200 (matches `abzugBeitraegeAhvIvEo`
  above, as expected for the same underlying AHV contribution).

### Filer B — Aufzeichnungen (records) path

"Verena Steiner," Turbenthal, Canton Zürich, Bergzone 2, tax year 2025.
`berichtsart = "mitAufzeichnungen"`.

**Ziffer 3.1/3.2/3.3 — Aktiven, Fremdkapital, Differenz**

| Position | Jahresanfang | Jahresende |
|---|---:|---:|
| Kasse | 2,000 | 2,500 |
| Post, Bank | 18,000 | 22,000 |
| Tiere | 60,000 | 65,000 |
| Vorräte | 15,000 | 17,000 |
| Maschinen/Fahrzeuge/Geräte (+20,000/−5,000/−15,000 Abschr.) | 80,000 | 80,000 |
| Obst/Beeren/Reben (−500 Abschr.) | 10,000 | 9,500 |
| Liegenschaft (Landgut gesamthaft) | 400,000 | 400,000 |
| Gebäude/mech. Einrichtungen (−8,000 Abschr.) | 150,000 | 142,000 |
| Pflanzen, Meliorationen (−1,000 Abschr.) | 20,000 | 19,000 |
| Boden | 100,000 | 100,000 |
| **Total 1 (Aktiven)** | **855,000** | **857,000** |

Verified Jahresanfang: 2,000+18,000=20,000; +60,000=80,000; +15,000=95,000;
+80,000=175,000; +10,000=185,000; +400,000=585,000; +150,000=735,000;
+20,000=755,000; +100,000=855,000. Exact. Verified Jahresende:
2,500+22,000=24,500; +65,000=89,500; +17,000=106,500; +80,000=186,500;
+9,500=196,000; +400,000=596,000; +142,000=738,000; +19,000=757,000;
+100,000=857,000. Exact.

| Position | Jahresanfang | Jahresende |
|---|---:|---:|
| Bankschulden | 250,000 | 240,000 |
| Andere Darlehen | 50,000 | 45,000 |
| Investitionskredite | 30,000 | 28,000 |
| **Total 2 (Fremdkapital)** | **330,000** | **313,000** |

Verified: 250,000+50,000=300,000; +30,000=330,000. And
240,000+45,000=285,000; +28,000=313,000. Exact.

- Differenz Jahresanfang = 855,000 − 330,000 = **525,000**. Differenz
  Jahresende = 857,000 − 313,000 = **544,000**. Verified: exact.

**Ziffer 3.4 — Abschreibungen und Anlagekosten**

| Kategorie | A (bis JA) | B (Steuerjahr) | C = A+B | D (Buchwert JE) | E = C+D |
|---|---:|---:|---:|---:|---:|
| Liegenschaft gesamthaft | 120,000 | 0 | 120,000 | 400,000 | 520,000 |
| Gebäude/mech. Einrichtungen | 60,000 | 8,000 | 68,000 | 142,000 | 210,000 |
| Pflanzen, Meliorationen | 9,000 | 1,000 | 10,000 | 19,000 | 29,000 |
| Boden (Wertberichtigung) | 0 | 0 | 0 | 100,000 | 100,000 |
| **Total** | **189,000** | **9,000** | **198,000** | **661,000** | **859,000** |

Verified column A: 120,000+60,000=180,000; +9,000=189,000; +0=189,000.
Column B: 0+8,000=8,000; +1,000=9,000; +0=9,000. Column C = A+B: exact per
row (120,000+0=120,000; 60,000+8,000=68,000; 9,000+1,000=10,000; 0+0=0), and
Total C = 189,000+9,000 = 198,000, matching the row-by-row sum
(120,000+68,000+10,000+0=198,000). Column D: 400,000+142,000=542,000;
+19,000=561,000; +100,000=661,000. Column E = C+D: exact per row
(120,000+400,000=520,000; 68,000+142,000=210,000; 10,000+19,000=29,000;
0+100,000=100,000), Total E = 198,000+661,000=859,000, matching the
row-by-row sum (520,000+210,000+29,000+100,000=859,000). All exact.

**Ziffer 3.5 — Ermittlung der Betriebseinkünfte**

- Kasse (Einnahmen) 95,000 + Post/Bank (Einnahmen) 180,000 = 275,000, minus
  Privateinlagen 10,000, Schuldenerhöhungen 5,000, Bezüge betriebliche
  Geldkonti 3,000, Liegenschaftenverkäufe 0 = **Betriebseinnahmen 257,000**.
  Verified: 95,000+180,000=275,000; 10,000+5,000+3,000+0=18,000;
  275,000−18,000=257,000. Exact.
- Naturalbezüge: Erwachsene 1,920 (2×960) + Kinder −6J 240 (1×240) + Kinder
  6-13J 0 + Kinder 13-18J 720 (1×720) + Käsereibezüge 0 = 2,880. Plus Mietwert
  Betriebsleiterwohnung 15,000, Privatanteil Auto 2,200, Versicherungen 900,
  Heizung/Strom/Telefon/TV 2,640, andere 0, andere Geschäftserträge 800 =
  running add total 24,420. Verified: 1,920+240=2,160; +0=2,160; +720=2,880;
  +0=2,880; +15,000=17,880; +2,200=20,080; +900=20,980; +2,640=23,620;
  +0=23,620; +800=24,420. Exact.
- Zwischentotal (3.5.21) = 257,000 + 24,420 = **281,420**. Verified: exact.
- Tiere Bestand Jahresende 65,000 + Vorräte Bestand Jahresende 17,000 —
  cross-checked exactly against `totalAktivenJahresende`'s own Tiere (65,000)
  and Vorräte (17,000) rows above.
- Zwischentotal (3.5.24) = 281,420 + 65,000 + 17,000 = **363,420**. Verified:
  281,420+65,000=346,420; +17,000=363,420. Exact.
- Tiere Bestand Jahresbeginn 60,000 + Vorräte Bestand Jahresbeginn 15,000 —
  cross-checked exactly against `totalAktivenJahresanfang`'s own Tiere
  (60,000) and Vorräte (15,000) rows above.
- Total Betriebseinkünfte (3.5.27) = 363,420 − 60,000 − 15,000 =
  **288,420**. Verified: 363,420−60,000=303,420; −15,000=288,420. Exact.

**Ziffer 3.6 — Ermittlung der Betriebsaufwendungen**

- Kasse (Ausgaben) 60,000 + Post/Bank (Ausgaben) 140,000 = 200,000, minus
  Privatentnahmen 8,000, Schuldenrückzahlungen 12,000, Investitionen
  Maschinen 20,000 (matches the Aktiven Maschinen row's own Zugänge, as
  expected), Investitionen Obst/Beeren/Reben 0, Gebäude 0, Pflanzen/
  Meliorationen 0, Boden 0, Einlagen betriebliche Geldkonti 2,000 =
  **Betriebsausgaben 158,000**. Verified:
  8,000+12,000=20,000; +20,000=40,000; +0+0+0+0=40,000; +2,000=42,000;
  200,000−42,000=158,000. Exact.
- Verpflegung 6,120 (1 Person) + Unterkunft 1,500 + Abschreibungen: Maschinen
  15,000 (matches Aktiven), Obst/Beeren/Reben 500 (matches Aktiven), Gebäude/
  mech. Einrichtungen 8,000 (matches Aktiven and Ziffer 3.4 column B),
  Pflanzen/Meliorationen 1,000 (matches Aktiven and Ziffer 3.4 column B),
  Boden (Wertberichtigungen) 0 (matches Aktiven and Ziffer 3.4 column B) +
  andere Geschäftsaufwendungen 700, minus Nettoerträge
  Geschäftswertschriften 1,200 = running add/subtract 31,620. Verified:
  6,120+1,500=7,620; +15,000=22,620; +500=23,120; +8,000=31,120; +1,000=32,120;
  +0=32,120; +700=32,820; −1,200=31,620. Exact.
- Total Betriebsaufwendungen (3.6.21) = 158,000 + 31,620 = **189,620**.
  Verified: exact.

**Ziffer 3.7 — Reineinkommen**

- Einkommen = 288,420 − 189,620 = **98,800**. Verified: exact. Transfers to
  the main return's own Ziffer 2.
- `persoenlicheBeitraegeBetriebsinhaber` = 11,000 (this filer's own AHV
  disclosure; a distinct value from Filer A's, since these are two
  independent hypothetical filings).

**Ziffer 4 — Besondere Leistungen des Bundes und der Kantone** (Filer B)

- Allgemeine Hangbeiträge Bund 4,000 + Kanton 2,500 + Sömmerungsbeiträge Bund
  0 + Kanton 0 + Tierhaltung erschwerende Produktionsbedingungen 1,500 =
  **Direktzahlungen, insgesamt 8,000**. Verified: 4,000+2,500=6,500;
  +1,500=8,000. Exact.
- Ackerbaubeiträge, insgesamt = 1,500 (a subset of, and already included
  within, Betriebseinnahmen above).

**Ziffer 5 — Angaben über den Betrieb** (Filer B)

- 5.1: Turbenthal (Eigentum 15.20 ha, Pacht 4.00 ha, Pachtzins CHF 5,600);
  Wila (Eigentum 3.00 ha, Pacht 0 ha, Pachtzins CHF 0). Total Eigentum =
  15.20+3.00 = **18.20 ha**. Total Pacht = 4.00+0 = **4.00 ha**. Total
  Pachtzins = 5,600+0 = **CHF 5,600**. Verified: exact.
- 5.2 Tierhaltung: Kühe/Stiere 22, Aufzuchtrindvieh 12, Mastrindvieh 0,
  Mutterschweine 0, Mastschweine/Jager 0, Pferde 2, Ziegen/Schafe 0,
  Geflügel 0, Andere 0; Milchkontingent einschl. Alp 165,000 kg.
- 5.2 Bodennutzung: Wiesen/Weiden 11.00 + Silomais/Futterrüben 3.50 +
  Getreide/Mais/Raps/Erbsen 2.50 + Kartoffeln/Zuckerrüben 0.80 + Obstanlagen
  0.50 + Gemüse/Beeren/Reben 0.40 + Andere 0.30 = **Total landw. Nutzfläche
  19.00 ha**. Verified: 11.00+3.50=14.50; +2.50=17.00; +0.80=17.80;
  +0.50=18.30; +0.40=18.70; +0.30=19.00. Exact. Wald 3.00 ha, Zwischenkulturen
  0.20 ha. **Cross-check:** 19.00 + 3.00 + 0.20 = **22.20 ha**, exactly
  matching Ziffer 5.1's own Total Eigentum (18.20) + Total Pacht (4.00) =
  **22.20 ha** — confirming Ziffer 5.2's own land-use breakdown (including
  the extra `zwischenkulturenGemueseUa` line unique to this form) reconciles
  against Ziffer 5.1's own operated-area total. Obstbäume: 60 St.
- 5.3 Spezialzweige: Kälbermast false, Viehhandel false, Pouletmast false,
  Pensionspferde **true**, Pferdezucht false; andere: (blank).
- 5.4 Zone: **Bergzone 2**.
- 5.5: no property transactions this year (fields left blank).
- 5.6: `anderesGewerbeAlsNebenbetrieb` = "im vorstehenden Einkommen
  enthalten."
- 5.7 Bemerkungen/Beilagen: "Pachtlandverzeichnis beigelegt für Gemeinde
  Wila (Pacht 4.00 ha)."
- `placeOfSigning` = "Turbenthal", `dateOfSigning` = "2026-03-15".

Every `validation` constraint (AHVN13 10-digit pattern, `jahr` range
2000-2100, `berichtsart`/`zone`/`anderesGewerbeAlsNebenbetrieb` enum
membership, non-negative integer counts, `maxLength` bounds) was checked by
hand against both filers' mock values above. OK.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ch/zh/sta/hilfsblatt-b/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-b/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/zh/sta/hilfsblatt-b/1.0.0/schema.json
ok   registry/ch/zh/sta/hilfsblatt-b/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/verify-sources.mjs` was also run (see "Access notes" below for the
exact output and invocation).

## What is NOT modelled (out of scope), and why

- **The Ziffer 3.1/3.2 business net-worth statement's own itemized asset/
  liability rows** — collapsed into `aktivenSummary` and `fremdkapitalSummary`.
  See scope decision above.
- **The Ziffer 3.4 depreciation/acquisition-cost table's own four named-
  category rows** — collapsed into `abschreibungenUndAnlagekostenSummary`.
  See scope decision above.
- **The Ziffer 5.1 land-use table's own itemized, filer-named municipality/
  canton/country rows** — collapsed into `bewirtschafteteFlaechenSummary`.
  See scope decision above.
- **Ziffer 3.7.1/3.7.2's own reprint lines** — not separately modelled, since
  they are pure carry-forward reprints of `totalBetriebseinkuenfteAufzeichnungen`
  and `totalBetriebsaufwendungenAufzeichnungen`. See scope decision above.
- **The Ziffer 3.5.13/3.5.14 page-break carry-forward mark** — a pure
  pagination artifact, not a new field. See scope decision above.
- **Ziffer 4.1 (Familienzulagen)** — a pure navigational pointer directing
  the filer to the *main return's* own Ziffer 3.4, printed with no input box
  of its own on this form; not modelled as a field here, consistent with
  this registry's practice of not fabricating a field for a pure
  instructional caption.
- **Form 328/329 (Hilfsblatt A, the sibling non-agricultural self-employment
  worksheets)** — cross-referenced by `anderesGewerbeAlsNebenbetrieb` but not
  themselves modelled by this document; each is already separately published
  as `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` and
  `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung`.
- **Any office-only field** (none observed on this form).

## Judgment calls

1. **`berichtsart` models an unprinted, structurally-implied discriminator
   field**, not a literal transcription of a printed checkbox. See its own
   scope decision above.
2. **`aktivenSummary`/`fremdkapitalSummary`/`abschreibungenUndAnlagekostenSummary`/
   `bewirtschafteteFlaechenSummary` each collapse a cross-tabulated or
   filer-named table into one free-text field**, with each table's own
   bounded "Total" row modelled individually, consistent with every other
   collapsed repeating table in this registry.
3. **`differenzJahresanfang`/`differenzJahresende` read the Ziffer 3.3
   "Differenz" row as carrying the same Jahresanfang/Jahresende column pair
   as the rows above it**, rather than a single value — a disclosed, not
   certain, interpretation absent a worked specimen. See scope decision
   above.
4. **Ziffer 3.7.1/3.7.2 are treated as pure reprints, not separately modelled
   fields**, since their own printed captions state the transfer explicitly.
   See scope decision above.
5. **The Ziffer 3.5.13/3.5.14 page-break carry-forward mark is not modelled**
   as it introduces no new information. See scope decision above.
6. **Ziffer 4.1 (Familienzulagen) is read as a pure navigational pointer with
   no input box of its own**, and is therefore not modelled as a field —
   disclosed rather than silently assumed either way.
7. **Booleans (`kaelbermast`, `viehhandel`, `pouletmast`, `pensionspferde`,
   `pferdezucht`) use GovSchema's `boolean` field type**, consistent with
   `ch/zh/sta/hilfsblatt-g`'s own treatment of the identical five checkboxes
   (reordered on this form's own print layout, but the same five options).
8. **`zone` is modelled as a required, single-select enum with a four-tier
   Bergzone option**, one tier more than `ch/zh/sta/hilfsblatt-g`'s own
   `produktionszone` field — a disclosed, genuine difference between the two
   sibling forms, not a copy-paste inconsistency. See "Two genuine structural
   differences" above.
9. **`jahr` is modelled as a required field**, matching every other CH-ZH
   companion schedule's own year-independent-hosting convention.
10. **Amounts are modelled as plain `number` fields** (or `integer` for
    discrete head counts), consistent with every other CH-ZH companion
    schedule.
11. **`jurisdiction.level` is `subnational` with `subdivision: "CH-ZH"`**,
    identical to the main return and its ten other companion schedules.
12. **No live submission was attempted** — filing a real Swiss cantonal tax
    return attachment is a real legal act with a real cantonal tax
    authority, not a safe or reversible action to simulate against a live
    government process, consistent with this registry's standing
    discipline.

## Access notes

No access blocks: `zh.ch` was reachable directly from this environment with
plain `curl` for the form and the dedicated Hilfsblatt B/G Wegleitung alike —
no TCP-level reset, WAF, or CAPTCHA gate encountered, consistent with every
prior CH-ZH cycle's finding that `zh.ch`'s own tax-forms domain is unblocked.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/ch/zh/sta/hilfsblatt-b
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is Switzerland's eleventh Taxes-vertical document (a companion
  schedule to the main return, `ch/zh/sta/steuererklaerung-natuerliche-personen`),
  not a new vertical or jurisdiction; Switzerland remains at 2 of 6
  verticals.
- `id` reuses the `sta` authority-directory segment (the same cantonal tax
  office) and a short slug, `hilfsblatt-b`, with no bookkeeping-method
  disambiguator in the slug itself — unlike the two Hilfsblatt A variants,
  which needed one because they are two separate PDF/form-number documents,
  this form's own two computation paths live inside one single document and
  are instead disambiguated within the schema via the `berichtsart` field.
- No `edition` member is used, consistent with this registry's existing
  treatment of the other CH-ZH companion schedules.
- This cycle closes the CH-ZH companion-schedule backlog entirely: all of
  Wertschriften-/Guthabenverzeichnis, Berufsauslagen, Versicherungsprämien,
  Aus-/Weiterbildungskosten, Liegenschaftenverzeichnis, Schuldenverzeichnis,
  Hilfsblatt A (both bookkeeping variants), Hilfsblatt G, and now Hilfsblatt
  B are published. A future cycle re-screening this vertical should look for
  newly introduced companion schedules on the same zh.ch listing rather than
  re-checking these ten (now eleven) already-published documents.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the main return and its other companion
schedules. Because `status` remains `draft`, a future review should
prioritize: confirming the next tax year's edition of the main return keeps
the same Ziffer-2 transfer target for both of this schedule's own
path-specific net-income lines, re-checking whether the standalone Form 330
PDF is ever republished under a newer print-date stamp, re-confirming the
disclosed `differenzJahresanfang`/`differenzJahresende` column-shape reading
against a worked specimen if one ever surfaces, and separately flagging
`ch/zh/sta/hilfsblatt-g`'s own `produktionszone` field for a future
re-verification cycle to consider whether it should be extended with a
fourth Bergzone tier to match this document's own `zone` field.
