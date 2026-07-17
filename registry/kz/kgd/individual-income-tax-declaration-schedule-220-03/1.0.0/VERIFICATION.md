# Verification record — `kz/kgd/individual-income-tax-declaration-schedule-220-03` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3544**), deepening
Kazakhstan's Taxes vertical by authoring the third of the ten disclosed
companion schedules to the Individual Income Tax Declaration
(`kz/kgd/individual-income-tax-declaration`, GOV-3477) — Form 220.03, the
treaty-exempt-income schedule the GOV-3506 cycle's own Form 220.02 boundary
check had already located and confirmed (image `178.jpg`, "Form 220.03 page
1").

## Why this candidate

CATALOG.md's own "Genuinely open, well-sourced candidates" section disclosed
eight remaining companion schedules (Forms 220.03-220.10) as open backlog
after the GOV-3506 cycle authored Form 220.02. This cycle re-scanned
CATALOG.md fresh per the standing per-cycle routine and found:

- every single-vertical-gap jurisdiction's remaining vertical (AT DMV; BR/CH/
  MK/NL/PL/SK Visa; GR/MN National ID; RW Taxes) already a confirmed dead
  end (re-confirmed by reading the "Confirmed dead ends" section, not
  re-screened live this cycle);
- **AE Passport re-screened and found to be the *same* already-published
  source, not a new opening.** CATALOG.md's own "genuinely open" note for AE
  Passport pointed at ICP's Smart App citizen-category manual, pages 15-24,
  describing "a genuine screen-by-screen walkthrough of the passport-renewal
  wizard." This cycle fetched that manual directly
  (`https://icp.gov.ae/ica_files/smart_app/pdf/5.23_user_manual_english_version_of_the_application_citizen_category.pdf`,
  HTTP 200, confirmed 72 pages via `pdfjs-dist`) and rendered pages 10-22 at
  3x zoom. **Pages 15-22 are not a passport-issuance wizard — they are the
  exact same "Replace ID" (Emirates ID replacement) wizard already published
  as `ae/icp/emirates-id-replacement`** (identical screen titles "Replace
  ID"/"Basic Information 1/5" with `familyBookIssuanceDate`/
  `replacementReason: Lost/Stolen`, matching that document's own p.15
  screenshot verbatim). The wizard's step 3/5 happens to be titled "Passport
  Information" because Emirates ID replacement collects the holder's
  passport particulars as supporting data, not because this is a passport
  application. CATALOG.md's characterization of this source as a
  "passport-renewal wizard" was a mischaracterization, not a genuine new
  finding — this candidate does not open AE's Passport vertical. This
  correction is carried into CATALOG.md's own Known Gaps section this cycle
  (see the Executive Summary and Known Gaps updates). AE Passport remains
  weak/unresolved per the `emirates-id-replacement` VERIFICATION.md's own
  prior finding (public service page is checklist-level only; the 231-page
  Service Card Guide is a text catalog, not a screenshot walkthrough).
- Turkey's `evisa.gov.tr` (screened as a potential 74th-jurisdiction
  candidate) redirects to an unrelated third-party commercial domain
  (`dtvgroup.com.tr`) on both a direct `curl` fetch and a fresh `WebFetch` —
  not a genuine e-visa channel reachable this cycle, and not re-attempted
  further given the redirect target's own unrelated nature.

Given these findings, this cycle picked the disclosed KZ Taxes
companion-schedule backlog over continuing to scout new ground — the same
"deepen an open, well-sourced backlog item before scouting new ground"
preference this registry's routine already establishes, and the same
schedule series the GOV-3484/GOV-3506 cycles already advanced twice.

## Sources examined

### Primary source

- **Authority:** Министерство финансов Республики Казахстан (Ministry of
  Finance of the Republic of Kazakhstan), via the Комитет государственных
  доходов (State Revenue Committee, KGD) — official site confirmed at
  `https://kgd.gov.kz`.
- **Document — Order of the Minister of Finance of the Republic of Kazakhstan
  No. 695, 12 November 2025** ("Об утверждении форм налоговой отчетности с
  пояснением по их составлению и Правил их представления") — the same order
  the parent Form 220.00 and Forms 220.01/220.02 schemas source.
  - **URL (directly retrieved, HTTP 200 via `curl -k`):**
    `https://adilet.zan.kz/rus/docs/V2500037390`
  - **Access note:** the same TLS-certificate-chain-missing-an-intermediate
    quirk already documented for this domain in the GOV-3459/GOV-3477/
    GOV-3484/GOV-3506 cycles (`openssl verify` code 21) — a server
    misconfiguration, not a real access gate.
  - **File identity confirmed:** Form 220.03 is embedded as a single scanned
    page image, `/files/1576/49/178.jpg`, independently re-fetched (`curl
    -k`, HTTP 200) this cycle and read visually — at native resolution
    first, then at 3x-6x zoom (via the `canvas` npm package, cropped per
    section) to resolve box counts and column headers precisely.
  - **Boundary check, both ends:** image `178.jpg`'s own printed header
    ("форма 220.03 стр.01") directly states the form and page number, no
    inference needed. The following image, `179.jpg`, was fetched and
    confirmed to already be Form 220.04 page 1 ("ДОХОДЫ ИЗ ИНОСТРАННЫХ
    ИСТОЧНИКОВ, СУММЫ УПЛАЧЕННОГО ИНОСТРАННОГО НАЛОГА И ЗАЧЕТА"), confirming
    Form 220.03 is exactly one page (image 178) — matching the page count
    the GOV-3477 cycle's own parent Form 220.00 VERIFICATION.md had already
    disclosed ("220.03 (treaty-exempt income) — image 178, 1 page"). No
    correction to that estimate was needed.
  - **Row-count determination:** the "Раздел. Показатели" table's row count
    was confirmed two independent ways: (1) three zoomed vertical slices of
    the page each visually counted (6 + 6 + 5 rows = 17 total, matching); (2)
    a pixel-luminance scan down the row-number (column A) box area detecting
    row-border minima at a consistent ~23.3px pitch from the grand-total
    row's top edge (y≈169 in the native 933×635 image) through the last
    entry row (y≈541), i.e. `(541-169)/23.3 + 1 ≈ 17` rows. Both methods
    agree: **1 printed grand-total row plus 16 individual entry rows.**
  - **Extraction method:** every column (A "№", B "Код вида международного
    договора", C "Наименование международного договора", D "Код страны, с
    которой заключен международный договор", E "Доход, подлежащий
    освобождению от налогообложения") was read directly off the rendered
    image, with box counts for the boxed-digit columns (A: 8 boxes, B: 2
    boxes, D: 3 boxes) confirmed via further zoomed crops.

### Form convention confirmed

- **The four repeating column headers** printed above column E's amount
  grid (трлн / млрд / млн / тыс — trillion / billion / million / thousand
  place-value groups) are the same single boxed-digit money-amount entry
  convention already confirmed for Forms 220.00-220.02 — each row's column E
  is modelled as one `number` field in tenge, not four independent values.
- **Column A ("№", 8 boxed digits)** is a row-ordinal control, not applicant
  data — the grand-total row prints a fixed value ("00000001"), and this
  registry's established convention (already applied to Forms 220.00-220.02,
  none of which model auto-incrementing row/line numbers as their own field)
  is followed here too: row identity is expressed by field-name ordinal
  (`entry1`...`entry16`), not a separate row-number field.
- **The grand-total row is structurally distinct from the 16 entry rows** —
  its own printed instruction ("строка заполняется ТОЛЬКО по итогу формы",
  "this row is filled ONLY for the form's total") and its blank columns
  B/C/D (no treaty-type/name/country boxes are printed on that row, only
  column E) confirm it is a single summary field, not entry row 0. Modelled
  as the standalone `totalExemptIncome` field, separate from the `entry1`...
  `entry16` series.
- **A page-level "Укажите номер текущего листа" (indicate current sheet
  number) box** appears in the header, distinct from the numbered Item 1/2
  fields — used when a taxpayer's treaty-income entries exceed this
  schedule's single-sheet 16-row capacity and additional continuation sheets
  of the same form are filed. Modelled as `currentSheetNumber`, an optional
  integer field; this box does not appear on Forms 220.00-220.02's own
  schemas (none of those forms' tables needed a continuation-sheet
  mechanism), so this is a genuinely new field, not carried over by
  convention.

## Scope and disclosed boundaries

This schema is deliberately scoped to **Form 220.03 in full** — its single
page, the taxpayer-identification header (items 1-2), the sheet-numbering
box, the grand-total row, and all 16 individual treaty-entry rows (each with
treaty-type code, treaty name, country code, and exempt-income amount).
Explicitly out of scope, and disclosed rather than silently omitted:

- **The seven other companion schedules** (Forms 220.04 through 220.10)
  remain open, disclosed backlog for future companion schemas — see the
  parent Form 220.00 schema's own VERIFICATION.md for each remaining
  schedule's page count and subject matter.
- **Undocumented code-value legends.** Neither the treaty-type code (column
  B) nor the country code (column D) has a legend printed on this page —
  both are modelled as pattern-constrained `string` fields (`^[0-9]{2}$` and
  `^[0-9]{3}$` respectively), not `enum`, per this registry's established
  discipline for undocumented external classifier codes (e.g. Form 220.01's
  own activity-type codes).
- **Continuation-sheet mechanics beyond the single sheet-number field.** The
  form's own header implies more than 16 treaty entries would require a
  second physical sheet of the same form, but no second-sheet template or
  cross-sheet aggregation rule is printed on this page — not modelled beyond
  the `currentSheetNumber` field itself.
- **AE Passport (icp.gov.ae)** — re-screened this cycle and found to be the
  same already-published `ae/icp/emirates-id-replacement` source under a
  mischaracterized description, not a new candidate. See "Why this
  candidate" above. Left as a genuinely weak/unresolved AE backlog item, per
  the `emirates-id-replacement` document's own prior finding.

## Conformance fixtures

9 fixtures are committed under
`conformance/kz/kgd/individual-income-tax-declaration-schedule-220-03/1.0.0/`:
2 valid submissions (one with only the two required header fields populated;
one fuller filing populating the sheet number, the grand total, and three
individual treaty-entry rows) and 7 mutation-control fixtures (each expected
to raise exactly 1 error): an invalid `iin` pattern (wrong digit count), a
missing required `iin`, a missing required `taxPeriodYear`, an invalid
`taxPeriodYear` type (string instead of integer), an invalid
`entry1TreatyTypeCode` pattern (wrong digit count), a `totalExemptIncome`
given a string instead of a number, and an unknown field not defined
anywhere in this schema. All 9 were checked with a from-scratch, throwaway
Node mock validator implementing this schema's own `required`/`validation`
rules (not committed, per this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 537/537 across
the full registry with this schema added.

## Known gaps

- Forms 220.04 through 220.10 remain open backlog for future companion
  schemas — see the parent Form 220.00 schema's own VERIFICATION.md for each
  remaining schedule's page count and subject matter.
- Kazakhstan's remaining verticals — DMV, Passport, Visa, and National ID —
  remain re-confirmed weak/gated per the GOV-3459 cycle (Visa: reCAPTCHA;
  DMV/Passport/National ID: login+EDS-gated `egov.kz`); not re-screened this
  cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(as a scanned page image) and transcribed its fields. No automated
re-verification tooling exists yet for this schema; `nextReviewBy` is set 6
months out per the practice's default cadence.
