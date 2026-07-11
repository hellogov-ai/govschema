# Verification record — dk/skattestyrelsen/oplysningsskemaet@1.0.0

## Candidate selection

This session's brief (GOV-2253, "GovSchema Standard Research") re-confirmed
the four legacy-named National ID candidates (DE Steuer-ID, SG NRIC, NZ
RealMe, "remaining voter registration") are all already resolved, then
picked up Denmark's remaining vertical backlog. Denmark opened as the
registry's 33rd jurisdiction via `dk/um/application-for-danish-passport`
(GOV-2244, Passport, 1/6 verticals); CATALOG.md's own Known Gaps section
(item 4) had flagged genuine, fresh, unauthenticated AcroForm-PDF
candidates for Denmark's DMV and Taxes verticals as strong enough to
author, without naming a specific agency or form.

Both were screened fresh this cycle:

- **DMV**: Færdselsstyrelsen's driving-licence application, form P23
  (`https://cdn.fstyr.dk/faerdselsstyrelsen/Media/638554152455559004/Ansøgning%20om%20kørekort%20-%20(P23).pdf`,
  created June 2024) is a genuine, current, fillable AcroForm — but it
  resolves to 397 raw field names structured as a shared record card with
  18 repeated licence-category blocks (`proeve/kategori/paategningskode`),
  filled progressively over the licence's lifetime by driving schools,
  police, kommune, and examiners — only ~15 fields are actually
  applicant-entered, and the document is not fundamentally a citizen-facing
  intake form. Motorstyrelsen's vehicle-registration/re-registration flow
  (`motorregister.skat.dk`) is exclusively MitID/TastSelv-login-gated, no
  static-form fallback. Two further downloadable Motorstyrelsen forms
  (21.063 border-plate registration, 21.115 import-vehicle
  inspection/registration) are current but carry zero AcroForm fields —
  flat print specimens. **DMV was set aside as a poor candidate.**
- **Taxes**: Skattestyrelsen's form 04.003, "Oplysningsskemaet" (the
  personal income tax return issued to taxpayers exempt from the digital
  filing duty), is a genuine, current, fillable AcroForm with a
  field-by-field printed rubrik/felt-nr numbering scheme baked directly
  into the document's own text layer — no separate vejledning/guide
  document exists or is needed. **Taxes was picked.**

## Source

- **URL:** `https://skat.dk/media/ftiduwhm/04003_januar2026-t.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `461,975` bytes, confirmed a genuine PDF (`%PDF-1.7` header) containing
  an `/AcroForm` dictionary.
- **Edition:** January 2026, for indkomstår (tax year) 2025 — the form's
  own footer prints `04.003 Skattestyrelsen er en del af Skatteforvaltningen
  2026.01` on every page, and page 1 states the filing deadline as
  "Husk fristen den 1. juli 2026" (1 July 2026), consistent with a 2025
  tax-year return filed in 2026.
- No separate companion vejledning/guide document was needed or found:
  every input row on the form's own 4 pages is printed as
  `[label] [Rubrik #] [optional lock/redirect note] [Felt nr. #]`, giving
  a complete, self-documenting rubrik map directly in the specimen's own
  text content stream.

## Extraction technique

`pdfjs-dist` (`build/pdf.js`, loaded via `require()` from a cached
`/tmp/node_modules` install, same environment used by prior cycles) was
used for three independent passes, not one:

1. **`doc.getFieldObjects()`** — resolved **109 distinct field names**
   across the document's 4 pages (99 `Tx` text fields, ~10 `Btn`
   checkbox/radio widgets). Field names are entirely generic
   (`Text field #1` .. `#94`, `Knap_1` .. `Knap_10`, `Radioknap_1` ..
   `Radioknap_5`) — no self-documenting names, unlike some other
   jurisdictions' specimens in this registry.
2. **`page.getTextContent()` clustered into visual lines** — each text
   item's `transform[4]`/`transform[5]` (x/y) was used to group items into
   rows (items within 2.5pt of the same y treated as one printed line),
   then lines sorted top-to-bottom per page. This reconstructed the full
   rubrik/felt-nr table for all 4 pages independent of any AcroForm
   metadata.
3. **`page.getAnnotations()` widget rects cross-referenced against the
   clustered lines** — for every `Tx` widget, its own rect's y-range
   (`rect[1]` to `rect[3]`) was checked against which clustered line(s)
   fall inside that exact vertical span, rather than assuming the
   field-name numbering (`#1, #2, #3...`) matches visual reading order.
   This distrust was deliberate: the raw field-name sequence is
   demonstrably **not** a reliable position proxy on this specimen — e.g.
   `Text field #93` and `#94` are interleaved out of numeric order between
   `#28`/`#29` and `Knap_3`/`#32` respectively, yet sit in the visually
   correct row on the page. A purely name-ordered mapping would have
   silently mis-attributed several rows.

## The "locked/redirected rows have no widget" finding (disclosed, not assumed)

Walking every `Tx` widget's rect against the clustered lines on pages 1-2
turned up an exact, exhaustive 1:1 correspondence: **every rubrik row
printed with a "Felt låst" (locked) or "Anvend blanket 04.071/04.072" (use
companion form) annotation has literally no AcroForm widget anywhere on
this specimen.** This was checked exhaustively, not sampled:

- **Page 1 body:** 20 rubrik rows total (11, 12, 14, 15, 16, 17, 18, 19,
  347, 251, 20, 784, 785, 786, 21, 23, 24, 27, 437, 29); 9 carry a
  lock/redirect annotation (11, 12, 14, 16, 17, 18, 347, 21, 23); the
  remaining 11 (15, 19, 251, 20, 784, 785, 786, 24, 27, 437, 29) have no
  annotation and map 1:1, in rect order, onto the page's 11 body widgets
  (`Text field #4` through `#14`).
- **Page 2 body:** 22 rubrik/amount rows (32, 33, 34, 35, 36, 37, 346, 39,
  40, 41, 42, 43, 44, 50, 51, 52, 53, 54, 55, 447, 448, 56, 449, 57, 58, 59,
  460, 461, 466, 961) plus 2 checkbox rows (166, 167); 12 of the amount
  rows carry a lock/redirect annotation (34, 41, 42, 43, 44, 50, 52, 55,
  447, 448, 56, 466); the remaining 18 amount rows (32, 33, 35, 36, 37,
  346, 39, 40, 51, 53, 54, 449, 57, 58, 59, 460, 461, 961) plus the 2
  checkbox rows map 1:1, in rect order, onto the page's 18 body text
  widgets (`Text field #15`, `#15-2`, `#16`-`#21`, `#22`-`#30`, `#93`) and
  2 button widgets (`Knap_1`, `Knap_2`).
- **Zero widgets were left unaccounted for and zero un-annotated rows were
  left unmatched** on either page.

This means the exclusion of locked/redirected rubrikker from this
schema is a hard structural fact about the specimen, not an editorial
scope choice: Skattestyrelsen's own paper form gives the taxpayer no box
to write in for a line it already has from third-party reporting (employer,
bank, pension provider) or that it routes to a dedicated companion form
(04.071 for certain interest/maintenance items, 04.072 for certain
wage/pension/dividend items).

## Header-block widget mapping

Three widgets on page 1 cover the header area (Navn og adresse,
Personnummer, Ægtefællens personnummer, plus purely-informational
Skattekommune/Skatteprocenter/Kommune/Kirke/Personfradrag/Indregnet
restskat figures), disambiguated by rect geometry rather than assumed:

- `Text field #1`: rect `x 56.7–307.4, y 669.9–745.5`, `multiLine: true` —
  a wide box on the page's left column spanning ~76pt vertically, matching
  the free-text "Navn og adresse" block.
- `Text field #2`: rect `x 449.4–575.4, y 766.6–779.8` — a narrow
  single-line box in the right column at the "Personnummer" row height.
- `Text field #3`: rect `x 449.4–575.4, y 740.4–753.6` — an identically
  narrow single-line box directly below, at the "Ægtefællens personnummer"
  row height.

No other widget exists in the header region — Skattekommune, Skatteprocenter,
Kommune, Kirke, Personfradrag, and "Indregnet restskat 2023" are pure
Skattestyrelsen-supplied reference figures printed for the specific
addressee and are not modelled.

## Scope decision: pages 1-2 only (employee/pensioner filer)

This schema models pages 1-2 in full (Personlig indkomst, Kapitalindkomst,
Fradrag i kapitalindkomst, Ligningsmæssige fradrag, and the
ejendomsværdiskat confirmation checkboxes) and deliberately excludes pages
3-4 (Virksomheds ophør, Virksomhedsbeløb, Øvrige virksomhedsoplysninger,
Kapitalafkastordning, Virksomhedsordning, Særlig kapitalafkastberegning,
and Virksomhedsoplysninger/regnskab/revisor disclosure) — the
self-employment/sole-proprietorship accounting sections. These pages are
confirmed present and well-populated with their own fillable widgets (not
screened field-by-field this cycle) and are left as an open backlog
candidate for a future companion schema, the same treatment this registry
already gives the Czech Republic's own base-return-plus-Přílohy sequence
(`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` plus Přílohy č. 1-4). Page
1's own printed text reinforces that this form's own designers already
route business income elsewhere: "Resultat af udenlandsk virksomhed skal
angives på blanket 04.011."

Money amounts are modelled as `type: "number"` representing whole Danish
kroner (DKK), the convention this registry already uses for other
jurisdictions whose forms print unlabelled currency-unit boxes (e.g.
`cz/mf/*`, `pt/at/declaracao-rendimentos-irs-modelo-3`). The three
form-printed deduction caps (`travelExpensesDeduction` ≤ DKK 32,800,
`tradesmenDeduction` ≤ DKK 8,600, `serviceDeduction` ≤ DKK 17,500) are
encoded as `validation.maximum`, taken directly from the amounts printed
in each row's own label text ("- højst 32.800 kr.", "- højst 8.600 kr.",
"– højst 17.500 kr.").

## Field-by-field source mapping

All 34 fields cite their exact `Rubrik <N> / Felt nr. <N>` pair (or, for
the 3 header fields, the specific page-1 header box) directly in
`sourceRef` — see `schema.json`. Every citation was read from the
clustered-line text extracted directly from the live PDF this session, not
copied from any secondary source.

## Mock conformance test run

Two scenarios were built under
`conformance/dk/skattestyrelsen/oplysningsskemaet/1.0.0/` and checked
against this schema's `required`/`validation` grammar with a disposable
checker script (`/tmp/gov2253/check_conformance.mjs`, not committed — same
technique used across this registry's other v1.0.0 cycles):

- **`application-packet-minimal-required-only.json`**: only the two
  required identity fields filled (name/address, CPR). **2 fields
  collected, 32 correctly not-applicable, 0 errors.**
- **`application-packet-full-employee-filer.json`**: a salaried employee
  with a spouse, minor personal/capital income, several itemized
  deductions at or under their printed caps, and both ejendomsværdiskat
  checkboxes set. **13 fields collected, 21 correctly not-applicable, 0
  errors.**
- **Four mutation/negative controls**, each derived from a base scenario
  with exactly one defect introduced, each correctly raised the expected
  error:
  1. Removing the required `applicantCivilRegistrationNumber` →
     `missing-required`.
  2. Setting `applicantCivilRegistrationNumber` to `"12345"` (violates
     `pattern: ^[0-9]{10}$`) → `pattern-violation`.
  3. Setting `tradesmenDeduction` to `15000` (exceeds the printed DKK 8,600
     cap) → `maximum-violation`.
  4. Setting `serviceDeduction` to `20000` (exceeds the printed DKK 17,500
     cap) → `maximum-violation`.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate-ajv.mjs` (passes standalone) and `node
tools/validate.mjs` (passes against the full registry, 346/346 documents
after this addition, 3/3 mapping.json companions).

## Scope and jurisdiction notes

This document models Denmark's Taxes vertical (2/6 for Denmark; DMV,
Business Formation, Visa, and National ID & Civic Documents remain open,
unscreened-or-screened-and-set-aside backlog candidates — see CATALOG.md's
Known Gaps section). It does not submit the return on the taxpayer's
behalf; the live source (skat.dk / TastSelv) is always authoritative.
GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Kingdom of Denmark or Skattestyrelsen.
