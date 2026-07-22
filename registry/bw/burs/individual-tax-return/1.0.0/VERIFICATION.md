# Verification record — bw/burs/individual-tax-return@1.0.0

## Candidate selection

GOV-4307 ("GovSchema Standard Research"). This cycle's own Known Gaps
re-scan found the registry's existing 79-jurisdiction backlog largely
resolved to confirmed dead ends at every near-complete jurisdiction
screened (AE Passport, BR/CH/PL/SK Visa, CZ Passport, GR National ID, NO
Passport — all previously re-confirmed weak/dead-end across 2+ prior
cycles each), so this cycle scouted new-jurisdiction candidates instead,
per the standing routine's own "prefer deepening an open backlog item;
otherwise scout new jurisdictions in parallel" heuristic. Three
candidates were screened in parallel via independent research agents:
Botswana, Uganda, and Bolivia, across all six verticals each. Botswana
came back the strongest by a wide margin — 4 of 6 verticals
(Taxes, Visa, DMV, Passport) confirmed STRONG on first pass, only
Business Formation (CIPA's initial registration is portal-gated; only
post-incorporation maintenance forms are downloadable) and National ID
(Omang, in-person only) dead ends. Uganda came back 3 of 6 STRONG
(Business Formation, National ID, DMV); Bolivia came back weak (only a
JPG-scanned Taxes form, every other vertical a hard SPA/login/timeout
wall). Botswana was picked as the new 80th jurisdiction; its Taxes form
was chosen to author first per the scouting agent's own recommendation
(cleanest unauthenticated 200 response, richest field set, and a
built-in Guide explaining every field) — see the Known Gaps section for
Botswana's other three disclosed-STRONG verticals, left as open backlog
for a future cycle.

## Reaching the live source

Independently re-fetched
`https://www.burs.org.bw/phocadownload/individual%20blank%20return.pdf`
directly (not just trusting the scouting agent's report):

- HTTP 200, 148,353 bytes, no login/CAPTCHA/WAF gate — a plain
  unauthenticated `curl` with a realistic desktop User-Agent reached it
  cleanly.
- sha256
  `5480c72c7a78cae21ac8942855e5e74fccf04540522d185ebd38d2b3321f9ec8`.
- PDF header `%PDF-1.6` at byte 0 — a genuine native (searchable-text)
  PDF, confirmed by clean `pdfjs-dist` text-layer extraction across all 6
  pages (no OCR/scan-image fallback needed).

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing scratch install at
`/tmp/node_modules`, CommonJS build at `legacy/build/pdf.js`), reading
each text item's raw string and its `transform` x/y position across all 6
pages. Also rendered pages 1-2 to PNG via `node-canvas`
(`/tmp/node_modules/canvas`) at 2.5x scale to visually confirm table/grid
row structure — this environment's embedded-font glyph outlines did not
rasterize (blank text, grid lines only), the same known limitation
documented in this registry's `zm/zra/individual-income-tax-return`
precedent, so the rendered images were used only to inspect ruled-line
row counts, never as a substitute for the clean text-layer extraction
(which read every field label correctly).

## Document structure

The 6-page PDF is Form ITA 20/96 itself (pages 1-2, footer-unstamped)
followed by its own 4-page "Form ITA 20 (GUIDE) (2011)" completion guide
(pages 3-6). Page 1 covers Section A (Declaration of Personal
Particulars) and the start of Section B (Income): B.1 Business, B.2
Farming. Page 2 continues Section B: B.3 Rental Income, B.4 Employment
(Remuneration and Benefits/Allowances), B.5 Interest (Building Society/
Bank/Other), B.6 Property Disposals, B.7 Other Income (three lettered
rows, a=Pension/Annuity fixed, b/c free), B.8 Income from Foreign
Investments (three rows: Interest, Dividends, Business — for Botswana
citizens only); then Section C (Exempt Income), Section D (Claims:
Pension Fund Contributions, Retirement Annuity Premiums), Section E (Tax
Credits), Section F (General Information, two Yes/No questions), and
Section G (Declaration).

## Scope

Models the full 2-page return (Sections A-G) — unlike this registry's
larger multi-schedule tax-return precedents (e.g. Zambia's 19-page ITF
46_1, Ukraine's DPS declaration with 10 companion schedules), this form's
entire income-declaration structure fits on a single page (page 2) with
no separate business/farming computation schedule to defer, so no
follow-on-schedule scoping exclusion was needed. Every printed section is
modelled; no section is deferred as out-of-scope.

Per the Guide's own instruction ("All numbered parts of [Section B] to be
completed entering the word 'NONE' if you have no income from any
particular source"), every Section B income-category field is modelled
`required: false` — a GovSchema-driven submission's own omission of these
fields is the machine equivalent of the source form's manual "NONE"
convention; this registry does not fabricate a value to represent
absence.

## Disclosed findings and interpretation choices

1. **`residentialAddress` collapses the form's own two alternative
   printed formats into one field** — the source prints "(a) House/Plot
   Number, Name of Street, Name of Town — if you stay in town" and "(b)
   House/Plot Number, Name of Ward, Name of Village — if you stay in a
   village" as two blank-line continuations of the same Sr No 2 item, not
   two separate addresses; there is no printed town/village indicator
   distinguishing two distinct values.
2. **`daysPresentInBotswana`'s own printed sentence repeats "...during
   the year ended 30th June, ...."**, which this schema treats as
   referring to the same tax year already captured in `taxYearEnded`
   (the form's own header blank), not a second, independent year field.
3. **`employmentRemunerationPeriodEmployed` is modelled as free text**,
   not a From/To date pair, since Section B.4(a)'s own column header
   prints only "Period Employed" (unlike Section B.3 Rental Income's
   explicit "Period Let From/To", which this schema does split into two
   `date` fields).
4. **Section B.7 Other Income's three lettered rows (a/b/c) are modelled
   as three distinct field groups**, since the source genuinely prints
   three separate blank rows lettered a/b/c — row a's "Nature of Income"
   is fixed as "Pension/Annuity" per the printed label; rows b/c are
   fully blank/free-text, per the Guide's own instruction to specify the
   nature of any other income "not disclosed in Part 1-6" (excluding
   dividends).
5. **Section B.8 Income from Foreign Investments prints all three rows
   labelled "a."** ("a. Interest", "a. Dividends", "a. Business") rather
   than a/b/c — read as a bullet-style list-marker artifact of the source
   PDF's own layout, not literal repeated sub-item lettering, since each
   row's own "Nature of Income" column value (Interest/Dividends/
   Business) is already distinct and printed. Modelled as three
   independent field groups keyed by that printed nature, consistent with
   Section B.5's Interest a/b/c treatment. No `requiredWhen` gate ties
   these to `countryOfCitizenship`, since the section's own "(for
   Botswana citizens only)" qualifier is prose guidance, not a printed
   boolean/checkbox this schema could condition on, and
   `countryOfCitizenship` is free text rather than a Botswana/non-Botswana
   enum.
6. **`signedByAuthorisedAgent` is a disclosed directly-supplied boolean**,
   modelling the source's own "Taxpayer/Authorised Agent* *Delete as
   appropriate" manual strike-through convention — the same
   no-printed-checkbox pattern this registry's `et/ics/passport-application`
   and `zm/zra/individual-income-tax-return` (Tax Agent block) already use
   for their own analogous fields.
7. **The Section G declaration's own printed "...of..." blank is not
   modelled as a second address field** — read as the same "Address for
   Service of Notice" value already captured in Section A (Sr No 2.b),
   restated within the sworn-declaration sentence's own grammar, not a
   newly-collected value.
8. **Excluded as official-use-only fields, not applicant-supplied data:**
   page 1's "For Office Use Only" block (Issued From/Office Address
   Stamp, Received/Tax Office Date Stamp).

## Conformance

3 valid mock scenarios — `valid-employment-and-interest-income` (an
individual with Section B.4 Employment income from one employer, Section
B.5 Bank interest, and a signed declaration, no business/farming/rental
income populated); `valid-business-and-rental-income` (an individual with
Section B.1 Business income, Section B.3 Rental income, Section D
Pension Fund contributions, and both Section F questions answered "NO");
and `valid-agent-signed-with-gifted-property` (an amended-style return
signed by an authorised agent, exercising `signedByAuthorisedAgent`'s and
both Section F questions' `requiredWhen`-gated fields) — plus 9
mutation-control fixtures (one missing statically-required field from
each of `taxYearEnded`, `fullName`, `residentialAddress`,
`countryOfCitizenship`, `daysPresentInBotswana`,
`usedRentedPropertyInTaxYear`, `movablePropertyTransferredByGift`,
`declarationDate`, `declarationSignature` — 9 fixtures) and one
unknown-field-rejected fixture, committed under
`conformance/bw/burs/individual-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13 fixtures: all 3 valid scenarios at 0
errors, all 9 static-required mutation controls each raising exactly 1
error, the unknown-field fixture correctly rejected, and confirmed every
`requiredWhen` field reference resolves to a real field name (0 dangling
references). Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run.
