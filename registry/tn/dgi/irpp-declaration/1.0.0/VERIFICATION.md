# Verification record — tn/dgi/irpp-declaration@1.0.0

## Candidate selection

GOV-4666 ("GovSchema Standard Research"). GOV-4638 (a prior cycle of the same
recurring routine) scouted Tunisia's Taxes candidate as STRONG: "the Ministry
of Finance/DGI's IRPP declaration, `finances.gov.tn`, 804KB, 13 pages" — but
banked it rather than authoring it, since that cycle's scope was the new-
jurisdiction opening itself (Tunisia's Passport vertical). This cycle
re-scouted and independently re-fetched the candidate before authoring it,
opening Tunisia's Taxes vertical (4 of 6: Passport, National ID, Business
Formation, now Taxes). Tunisia's remaining vertical (Visa — scouted STRONG by
GOV-4638) and DMV (weak) are unchanged open backlog.

## Reaching the live source

Found via web search for the form's own French name ("Déclaration de l'Impôt
Sur le Revenu Des Personnes Physiques"), landing on the Ministry of Finance's
own document page,
`https://www.finances.gov.tn/fr/document/declaration-de-limpot-sur-le-revenu-des-personnes-physiques`,
which links the PDF at a site-relative path.

- Plain unauthenticated `curl` request (realistic desktop `User-Agent`
  header; `-k` to skip TLS verification, no session/cookie state, no
  CAPTCHA/WAF challenge).
- Direct PDF URL:
  `https://www.finances.gov.tn/sites/default/files/2019-08/dec_irpp_2014_0.pdf`
  — HTTP 200, **803,784 bytes** retrieved, matching GOV-4638's own banked
  estimate ("804KB") almost exactly.
- sha256 of the retrieved bytes:
  `4f8ae27da41e54e7c992ed6edc8cd1086a403fd625530cd663cddf46247501a5`.
- 13 physical PDF pages, confirmed via `pdfjs-dist`'s `numPages`; the
  document's own printed footer numbers pages 1-12 ("n/12"), with the 13th
  PDF page being a separate, distinctly-headed annex ("قائمة مفصلة في المبالغ
  المخصومة من المورد بعنوان الضريبة على الدخل و الضريبة على الشركات" — a
  detailed list of amounts withheld at source), printed landscape and
  restarting its own "1/12" page count — a genuinely separate, dynamically
  multi-page attachment bundled into the same file, not part of the core
  12-page declaration.
- `getAnnotations()` returned 0 annotations on every page — a flat,
  print-and-fill specimen, not an interactive AcroForm (same as
  `tn/dgi/declaration-of-existence`).

### Authority attribution

Page 1's own header carries "الجمهورية التونسية / وزارة الاقتصاد والمالية /
الإدارة العامة للأداءات" (Republic of Tunisia / Ministry of Economy and
Finance / General Directorate of Duties). `authority` is modelled identically
to `tn/dgi/declaration-of-existence@1.0.0` — the Direction Générale des
Impôts (DGI) under the Ministry of Finance — the same authority, a different
form.

## Extraction method

`pdfjs-dist`'s `getTextContent()` extracted a text layer on every page, but
exactly like `tn/dgi/declaration-of-existence`, **the extracted string order
did not reassemble into readable Arabic** — the same fourth-failure-mode
(genuine Arabic Unicode codepoints, but glyph-paint order not matching
logical reading order) already documented for this registry's Tunisian DGI
sources. A `node-canvas` render at 3x scale (6x for one detail crop of page
1's income-category grid, to resolve exact sub-column boundaries) was used as
the *primary* reading method for every field label, checkbox, and table
header — not the raw `getTextContent()` string order.

## Document structure & scope

This is a 12-printed-page individual income tax return (IRPP) plus the
13th-PDF-page withholding annex described above. Its 12 pages are:

1. Identification, filing-type code, payment-basis table, applicant name/
   address/activity, marital status and dependent-children detail, and the
   **income-category summary grid** — nine numbered columns (1-9) each
   corresponding to one of the tax code's own income categories, several
   with sub-columns for a real-regime/flat-rate/sectoral-standard/partner-
   share breakdown (17 blank cells total).
2-5. Per-category detailed build-up schedules — one or two pages each for
   industrial/commercial profits, non-commercial professional profits,
   agricultural/fishing profits, real estate income, wages/pensions, and
   securities/movable-capital income, each showing the turnover/receipts/
   expense/stock-value line items and a "النتيجة المحاسبية"/"النتيجة
   الجبائية" (accounting/tax result) subtotal feeding into the page-1 grid
   cell for that category.
6. Common deductions (activity tax-incentive deductions, ~13 named other
   deductions, reinvested-income deduction) and the two-stage tax
   computation (net taxable income adjustment, then the progressive bracket
   table: 0%/15%/20%/25%/30%/35% against fixed dinar thresholds).
7. Minimum-tax adjustment (a turnover-based anti-avoidance floor) and
   withholding/advance-payment credits.
8. Exempt-income itemization, the final "الخلاصة" (summary) reconciliation
   table, the signed declaration/attestation, and an administration-only
   ("خاص بالإدارة") receipt-processing block.
9. A reference table of ~60 tax-incentive codes (a nomenclature the filer
   cites by code in page 6's activity-incentive-deductions table, not a set
   of fields in itself).
10. A ~32-item "documents accompanying the declaration" checklist (yes/no
    per item), most items conditioned on which income category/regime
    applies.
11-12. Supplementary disclosure blocks: secondary-branch detail, a second
    (redundant) dependent-children table, and identifying information for
    the filer's accountant and tax advisor.

### What this v1.0.0 models, and why

Given the scale above, this v1.0.0 models the **core declaration**: page 1's
identification and income-category summary grid (the actual filed numbers),
page 6's common deductions and tax computation, page 7's withholding-credit
total and balance-direction checkbox, and page 8's final summary/penalties/
signature — 64 `fields[]` across 9 steps, plus 11 `documents[]` entries (a
representative subset of page 10's checklist, plus the signed-declaration
attestation).

**Explicitly excluded and banked as open backlog** for a future minor
version, matching this registry's established main-form-now/companion-
schedules-later precedent (Kazakhstan's 220.00/250.00 series,
GOV-4043..GOV-4085):

- Pages 2-5's per-category detailed build-up schedules (turnover, purchases,
  stock values, receipts-minus-expenses derivations) — page 1's own grid
  cells are modelled as the filer's final, directly-supplied net-result
  figures per category (the source prints no formula tying these cells to
  any other page-1 cell), so the *filed* numbers are captured even without
  the *derivation* schedules.
- Page 7's minimum-tax floor computation (a narrow, turnover-based
  anti-avoidance provision with several intermediate cells).
- Page 8's exempt-income itemization (category 8's grid cell already
  captures the filed total).
- Page 9's ~60-row tax-incentive code nomenclature (a reference lookup, not
  a field set — `activityIncentiveDeductionsTotal`'s own description points
  filers back to this table).
- The remaining ~21 items of page 10's ~32-item documents checklist (the
  ones modelled are the broadly-applicable financial-statement/schedule
  items; the deferred ones are narrow, category-specific edge cases — e.g.
  asset-transfer-on-retirement certificates, agricultural-land-lease
  certificates, share-listing commitments).
- Pages 11-12's branch/dependent/accountant/tax-advisor disclosure blocks.
- The 13th-PDF-page withholding annex (a genuinely separate, separately-
  paginated attachment, per the Document Structure section above).

## Judgment calls

- **Income-category grid cells modelled as directly-supplied, not
  computed.** Per this registry's established convention (only exclude a
  cell the source itself defines as a formula/sum of other *modelled*
  cells), page 1's 17 grid cells are not excluded even though a real filer
  would arrive at each number via the (excluded) pages 2-5 schedules —
  those schedules are not themselves modelled in this v1.0.0, so nothing in
  this schema computes these cells; they are the filer's own final,
  independently-arrived-at numbers.
- **`totalTaxDue` modelled, the bracket table itself excluded** — the 0%-35%
  rate/threshold table is a printed reference schedule, matching this
  registry's Kazakhstan-established computed-line exclusion convention.
- **Bounded 4-slot dependent-child status fields** (`childSlot1Status`..
  `childSlot4Status`), matching this registry's established bounded-slot
  precedent — the source prints exactly four identically-structured
  "الأول/الثاني/الثالث/الرابع" boxes with no dynamic add-row mechanism.
- **`dependentParentsDeductionAmount` gated on `dependentParentsInCustody`**
  — the only `requiredWhen` gate in this schema, chosen because it is the
  one deduction line on page 6 with an explicit checkbox precondition
  printed beside it (footnote 7); every other deduction line is left
  unconditional-optional since the source states caps/eligibility rules in
  its footnotes but prints no boolean gate.
- **Documents left unconditional-optional** despite the source's own
  checklist being regime/category dependent — this v1.0.0 does not model a
  real/flat-rate regime-selection field (that granularity lives in the
  deferred pages 2-5), so no clean boolean correlate exists yet; modelled as
  optional rather than inventing a condition, following this registry's
  `tn/dgsn/national-identity-card-application` precedent for the same
  situation.
- **`fiscalYearEndDate` typed as `date`** despite the source printing
  day/month/year boxes that most filers leave blank (calendar-year filers
  have no reason to complete it) — modelled optional, matching the boxes as
  printed.

## Validation

- `node tools/validate.mjs registry/tn/dgi/irpp-declaration/1.0.0/schema.json`
  — pass.
- `node tools/validate-ajv.mjs registry/tn/dgi/irpp-declaration/1.0.0/schema.json`
  — pass (ajv 2020-12, v0.3 meta-schema).
- An ephemeral, uncommitted Node conformance script exercised the schema's
  one `requiredWhen` gate (`dependentParentsDeductionAmount` on
  `dependentParentsInCustody`) plus static-required and unknown-field
  rejection across 5 scenarios (2 positive, 3 negative) — all 5 behaved as
  expected.
- `npm run build-index` (in `tools/govschema-client/`) regenerates
  `registry-index.json` to include this document.
