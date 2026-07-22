# Verification record — kg/gns/unified-tax-declaration@1.0.0

## Candidate selection

GOV-4399 ("GovSchema Standard Research", parent cycle GOV-4397), authoring
Kyrgyzstan's first schema and opening it as the registry's 83rd jurisdiction
(Taxes, 1 of 6).

## Reaching the live source

Target: the State Tax Service's (GNS) forms-listing page,
`https://sti.gov.kg/section/0/%D1%84%D0%BE%D1%80%D0%BC%D1%8B_%D0%BE%D1%82%D1%87%D1%91%D1%82%D0%BE%D0%B2`
("Формы отчётов").

Independently re-fetched both source PDFs this cycle rather than trusting
the issue's own reported hashes alone:

- Main report form:
  `https://sti.gov.kg/section/view-pdf?filePath=websti%2F2026%2F04%2F08%2FFORM%20STI-091_9%20(%D0%BE%D1%84%D0%B8%D1%86).pdf`
  — HTTP 200, `Content-Type: application/pdf`, 864,393 bytes. sha256
  `0c96d62cbf474223813d0a263b86766e4c47de63d21ccc1222b3a58a025be1a6` — a
  byte-for-byte match with the issue's own reported hash.
- Field-by-field completion guide:
  `https://sti.gov.kg/section/view-pdf?filePath=websti%2F2026%2F04%2F08%2F1%20%D0%9F%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%B0%20%D0%BF%D0%BE%20%20%D0%95%D0%B4%D0%B8%D0%BD%D0%BE%D0%BC%D1%83%20%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D1%83%20STI-091%20%2004.03.2026%20(3).pdf`
  — HTTP 200, `Content-Type: application/pdf`, 236,881 bytes. sha256
  `70693a00ca4f58c59c83965597ce3bafa680efe148676b024710497ff0a9c80d` — also
  an exact match.

Both fetched with a plain `curl -A "Mozilla/5.0" -L`; no login/CAPTCHA/WAF
gate on either PDF asset.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getAnnotations()`
confirmed zero `/Widget` annotations on either page of the main form — a
flat, non-AcroForm specimen, matching most other tax-return schemas in this
registry. `getTextContent()` read every text item's raw string and its
`transform` x/y position, reconstructed line-by-line by grouping on rounded
y-coordinate. The completion guide (7 pages of prose, numbered items 1-99)
was read the same way and used as the authoritative source for each
numbered cell's meaning and formula, since the main form's own printed
captions are dense and, for the many similarly-shaped activity categories,
ambiguous without it.

## Document structure

Page 1: the report heading; a 3-way declaration-type checkbox (cell 001);
Section I "Информация о налогоплательщике" (taxpayer information, cells
102-105); the reporting-period range (cells 201/202); Section II
"Информация о едином налоге" (unified tax information) — a dense table of
~26 business-activity categories, each with one or two payment-form
sub-rows (cash/non-cash), each sub-row a (revenue, rate, tax-amount)
triplet keyed to three consecutive numbered cells, plus category- and
section-level computed subtotals; an "avansovye plateshi" (advance
payments) block (cells 182-185); a grand-total block (cells 186/187); and
cell 901 (tax-authority receipt date) plus a QR-code/stamp box. Page 2,
"Приложение к отчету по единому налогу" (Appendix to the report),
reproduces the advance-payments block's own repeatable-row detail (an
"Добавить" (Add) button lets the filer add additional rate-differentiated
advance-payment rows) and cell 901 again.

## Disclosed findings and interpretation choices

1. **`iin`, `taxpayerName`, and `taxAuthorityCodeAndName` (cells 102-104)
   are modelled as required fields despite the completion guide's own
   Item 4 stating they are normally auto-populated by the "Кабинет
   налогоплательщика" (Taxpayer Cabinet) e-filing portal from the filer's
   own account, not typed in by the filer at report time.** Modelled
   anyway (rather than excluded, as this registry excludes genuinely
   tax-authority-populated fields like cell 901 below) because they are
   still real data present in every filed report and an agent operating
   outside that specific portal session would still need to supply them;
   only cell 105 (contact phone) is explicitly stated as filer-entered.
2. **Every cell the completion guide defines as equal to another cell's
   value, or as a `(revenue × rate) / 100%` formula, is excluded from this
   schema's `fields[]`** — the tax-amount cell of every category/sub-row
   triplet (052, 055, 058, 062, 065, 069, 072, 076, 079, 132, 135, 138,
   141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 172, 175, 178, 181),
   every category- or section-level subtotal (059, 066, 073, 080, 169,
   186, 187), and the advance-payment aggregate cells (182-185, see
   Finding 4) — per this registry's own established computed/subtotal-line
   exclusion convention (Kazakhstan's Form 220.00/220.0X series, GSP-0013
   §7). Only the directly-supplied revenue (or, for cell 151, invoice
   value) and rate cell of each category/sub-row is modelled, 26
   categories × 2 cells = 52 fields.
3. **Every `<Category>Rate` field is modelled with the same 10-value
   `validation.enum` (0%, 0.1%, 0.25%, 0.5%, 1%, 2%, 3%, 4%, 6%, 8%)**,
   even though the completion guide states this exact list only once, in
   the context of the advance-payment section's own rate column (Item 92:
   "налогоплательщик выбирает одну ставку в соответствии с видом
   деятельности и формой оплаты... ставки 0%, 0,1%, 0,25%, 0,5%, 1%, 2%,
   3%, 4%, 6%, 8%"). Since the advance-payment rate is drawn from the same
   единый налог rate schedule that governs every other rate cell on this
   form (the tax code chapter this report implements sets one shared rate
   schedule across activity/payment-form combinations), this is treated as
   the closed rate list for every rate field on the form rather than an
   unconstrained free number. Disclosed as an interpretation choice rather
   than a literal per-cell enumeration in the source.
4. **Page 2 ("Приложение к отчету по единому налогу") and the
   corresponding aggregate cells on page 1 (182-185) are excluded from
   this v1.0.0, disclosed as open backlog.** Cells 182 and 184 are each
   defined by the completion guide as equal to the sum of an unbounded,
   dynamically-added ("Добавить"/Add button) repeatable row of (advance
   amount, rate) pairs that carries no numbered-cell identity of its own;
   cells 183 and 185 are, in turn, computed from that same unmodelled
   structure. Rather than fabricate a bounded slot count for an explicitly
   unbounded UI mechanism, this schema follows this registry's
   narrow-scoping convention (e.g. Kazakhstan's Form 220.00 leaving its
   ten numbered schedules for separate companion schemas) and leaves the
   entire advance-payment mechanism as a disclosed gap for a future,
   separately-versioned companion or minor revision.
5. **Cell 901 (tax authority's report-acceptance date) and the QR-code/
   stamp box are excluded as tax-authority-populated, not
   applicant-supplied data**, matching this registry's own convention for
   analogous authority-completed receipt blocks (e.g. Kazakhstan's Form
   220.00 bottom block).
6. **`iin` is modelled without a specific digit-count pattern.** Neither
   the main form nor the completion guide states the ИНН's digit length,
   and this is the registry's first Kyrgyzstan schema with no prior
   `kg/*` precedent to confirm the Kyrgyz Republic's own taxpayer-ID
   format against; left as an unconstrained bounded string
   (`maxLength: 20`) rather than asserting an unverified pattern.

## Conformance

3 valid mock scenarios — `valid-trade-activity-cash-only` (a standard
trade-activity filer reporting only cash-form revenue under the
up-to-50M-som category), `valid-mixed-cash-and-noncash-categories` (a
filer reporting both cash- and non-cash-form revenue across the
processing/tourism/software and public-catering categories), and
`valid-amended-report-sector-specific-activity` (an amended report from a
billiards-hall operator) — plus 7 mutation-control fixtures (one missing
statically-required field from each of `declarationType`, `iin`,
`taxpayerName`, `taxAuthorityCodeAndName`, `contactPhone`,
`taxPeriodStart`, `taxPeriodEnd`) and one unknown-field-rejected fixture,
committed under `conformance/kg/gns/unified-tax-declaration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 11 fixtures: all 3 valid scenarios at 0 errors, all 7
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
