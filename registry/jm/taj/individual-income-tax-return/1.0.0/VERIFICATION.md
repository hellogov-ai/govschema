# Verification record — jm/taj/individual-income-tax-return@1.0.0

## Candidate selection

GOV-4383 ("GovSchema Standard Research"). The GOV-4360 cycle scouted Jamaica
as a brand-new jurisdiction and banked four STRONG candidates beyond the
Business Formation vertical it opened with (see CATALOG.md's Known Gaps
entry 0f): DMV (subsequently authored via GOV-4376,
`jm/taj/driving-licence-application`), Passport (subsequently authored via
GOV-4367, `jm/pica/passport-application`), Visa (the Jamaican Embassy in
Washington DC's Form J, still open), and Taxes (Tax Administration Jamaica's
Form IT01, "Return of Income — Individuals"). The GOV-4376 cycle's own
re-scouting notes recorded IT01 as byte-matching the banked ~174KB estimate
exactly but flagged it as a flat, non-AcroForm, ~56-line-item return left
open "for a future cycle with a larger authoring budget." This cycle authors
that banked candidate.

Jamaica's remaining open item, Visa (Form J), was re-checked but not chosen:
the GOV-4376 cycle found its host migrated from `embassyofjamaica.org` to
`embwashington.mfaft.gov.jm` and its byte size grew from an estimated ~94KB
to 525,611 bytes since the original banking note, a large enough drift to
warrant a full fresh re-scout rather than treating the banked description as
still accurate. Taxes was the lower-risk pick this cycle: independently
re-verified byte-for-byte against the banked estimate with no drift.

## Reaching the live source

The banked note gave only the host and an approximate byte count, not the
exact path; the live document link was relocated by web search and
re-fetched directly:

- `https://www.jamaicatax.gov.jm/documents/10181/123967/it01.pdf/bd010927-29a5-48dc-afea-cf4ef85d3077`
- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 174411` bytes,
  `Last-Modified: Fri, 06 Feb 2015 23:05:00 GMT`.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with no session/cookie state reached it cleanly.
- sha256 `31bf9df3b3a2be5300e69dc8cf4bd124e1daf206964e5e7c0f82b47965478bd6`.
- PDF header `%PDF-1.` at byte 0 — confirmed by clean `pdfjs-dist` text-layer
  extraction across all 5 pages, no OCR/scan-image fallback needed.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
CommonJS build at `legacy/build/pdf.js`). `getAnnotations()` was run against
every page first and returned zero `/Widget` annotations throughout — a
genuine flat (non-AcroForm) specimen despite the PDF's own document catalog
carrying an `/AcroForm` dictionary reference (an empty or vestigial one, not
a functioning fillable-field layer). `getTextContent()` then read every text
item's raw string and its `transform` x/y position across all 5 pages,
grouped by rounded y-coordinate to reconstruct each printed line in
top-to-bottom order.

## Document structure

- **Page 1**: Section A (General Information — Name, TRN, Home/Business
  Mailing Address, Trade Name, Occupation, New-Address/Revised-Return tick
  boxes) and Section B (Summary of Income, Lines 7-34).
- **Page 2**: Section C (Deductions, Lines 35-42), Section D (Tax
  Computation, Lines 01/02 then 43-47; Credits, Lines 48-53; Net Tax
  Payable, Lines 54-56), and Section E (Declaration, plus a Representative's
  Details block for agent/preparer-filed returns).
- **Pages 3-5**: "Notes and Instructions for Completion of IT01" — prose
  guidance keyed to each line number, not applicant-supplied data. Excluded
  from `fields[]`/`documents[]` entirely, but consulted throughout to
  confirm line semantics (e.g. the Line 02 threshold table, the Line 11
  Adjustments sign convention).

## Scope: excluded calculated/derived lines

Per this registry's standing closed decision to defer calculated/derived
fields (GSP-0013 §7, founder-confirmed on GOV-302 — the same precedent this
registry's `zm/zra/individual-income-tax-return` already applies to its own
formula lines), every printed line computed purely by adding/subtracting
other same-form lines, or by applying a published tax rate to another line,
is excluded from `fields[]`. Each excluded line's own formula, as printed:

- Line 9, Gross Operating Profit (Subtract Line 8 from Line 7)
- Line 12, Total Expenses (Subtract Line 11 from Line 10)
- Line 13, Net Profit (Subtract Line 12 from Line 9)
- Line 16, Net Rental (Subtract Line 15 from Line 14)
- Line 20, Total (Add Lines 17, 18 & 19)
- Line 23, Total Income from Employments & Offices (Add Lines 20, 21 & 22)
- Line 27, Total Deductions (Add Lines 24, 25 & 26)
- Line 28, Net Income Arising from Employments & Offices (Subtract Line 27
  from Line 23)
- Line 34, Total Income (Add Lines 13, 16, 28, 29, 30, 31, 32, & 33)
- Line 39, Total Deductions (Add Lines 35, 36, 37 & 38)
- Line 40, Statutory Income before Donations (Subtract Line 39 from Line 34)
- Line 42, Statutory Income after Donations (Subtract Line 41 from Line 40)
- Line 43, Threshold plus dividends from companies resident in Jamaica (Add
  Lines 01 and 02)
- Line 44, Statutory Income less threshold & dividends at Line 01 (Subtract
  Line 43 from Line 42)
- Line 45, Tax on Statutory Income less threshold & dividends at Line 01
  (Line 44 x Rate____%) — the rate blank is part of this excluded line's own
  formula description, never a separately-numbered field in its own right.
- Line 46, Tax on dividends received from companies resident in Jamaica — a
  published-rate calculation per the form's own notes (0%/5%/15% by
  effective date), structurally the same class of exclusion as Line 45.
- Line 47, Total Tax on Statutory Income (Add Lines 45 and 46)
- Line 53, Total Credits (Add Lines 48, 49, 50, 51 & 52)
- Line 54, NET TAX PAYABLE (Subtract Line 53 from Line 47)
- Line 56, TAX PAYABLE/(REFUNDABLE) (Subtract Line 55 from Line 54)

Attached supporting schedules the form references inline ("Attach Schedule
1/2/3/4", "Attach P24/P24s/Certificates") are not modelled as `documents[]`
entries: their own detailed line items are not printed on this form, the
same scope boundary `zm/zra/individual-income-tax-return` draws around its
own excluded Schedules 1-4. Each field whose line references an attachment
cites it inline in `sourceRef` instead.

## Disclosed findings and interpretation choices

1. **Section D's own line numbering genuinely restarts at 01/02 before
   continuing at 43** — confirmed via each text item's own y-coordinate
   (Lines 01/02 sit directly below the "Section D - TAX COMPUTATION" header,
   both above Line 43's own row), not a `pdfjs-dist` extraction artifact.
   Lines 01 (`dividendsReceivedResidentCompanies`) and 02
   (`incomeAtNilRateThreshold`) are the two direct inputs Line 43 adds
   together.
2. **`incomeAtNilRateThreshold` (Line 02) is modelled as a direct field, not
   excluded as calculated**, even though its value is looked up from a
   published year-by-year threshold table (page 4's own notes, e.g. "2013 -
   $507,312") rather than freely chosen by the filer: the source's own
   printed formula language ("Subtract Line X from Line Y", "Add Lines X and
   Y") never describes how Line 02 itself is derived — only how it is
   subsequently *used* by Line 43 — so Line 02 is a value the filer directly
   transcribes onto this form, structurally the same treatment this
   registry's `bw/burs/individual-tax-return` gives its own schedule-sourced
   `businessChargeableIncomeOrLoss`-class fields.
3. **`adjustments` (Line 11) and `donations` (Line 41) are modelled without
   a `minimum: 0` constraint**, since the form's own notes for Line 11 state
   a net adjustment "could result in an increase or reduction to profit" and
   explicitly instruct that "any capital gain should be deducted" (i.e. the
   net figure can be negative), and Line 41's own computation (feeding a
   subtraction at Line 42) is not constrained non-negative by the source
   either — the same disclosed non-negative-constraint carve-out this
   registry's `zm/zra/individual-income-tax-return` already applies to its
   own `profitLossForYear` field (that document's Finding 8). Every other
   Section B/C/D money field is a plain income/expense/credit amount and is
   constrained `minimum: 0`.
4. **`homeAddress` (Item 3a) is modelled `required: false`**, per the
   source's own qualifier "(if different from 3b.)" — the field is only
   completed when it differs from the required `businessMailingAddress`
   (Item 3b), and the source prints no separate boolean/checkbox this schema
   could gate on, the same no-printed-signal treatment
   `zm/zra/individual-income-tax-return`'s own Tax Agent block (that
   document's Finding 6) already uses for its own analogous ungated optional
   fields.
5. **`newAddressIndicated` and `isRevisedReturn` (Item 6) are modelled as
   two independent booleans, not a mutually-exclusive enum**, since the
   source prints them as two separate tick boxes ("New Address" / "Revised
   Return") with no printed instruction restricting a filer to ticking only
   one.
6. **Every Section B/C/D income, expense, and credit line is modelled
   `required: false`**, despite the form's own blanket instruction "All
   sections MUST be completed": no individual filer has income or
   deductions in every one of these categories in a given year, and the
   source provides no explicit "NONE"/zero-value convention distinguishing
   a genuinely-zero line from an omitted one (unlike, e.g.,
   `bw/burs/individual-tax-return`'s own Guide, which explicitly instructs
   entering the word "NONE"). A GovSchema-driven submission's own omission
   of an inapplicable line is treated as the machine equivalent of leaving
   that line's box blank on the paper form.
7. **The Representative's Details block (`preparerName` through
   `preparerDate`) is modelled bare-optional with no gating field**, since
   Section E prints no checkbox distinguishing a self-filed return from one
   completed by a representative/agent/paid preparer — only the prose
   instruction "To be signed by Taxpayer only; Representatives, Agents and
   Paid Preparers please complete Representative's Details below" — the
   same no-printed-signal convention as Finding 4 and
   `zm/zra/individual-income-tax-return`'s own Tax Agent block.
8. **Excluded as official-use-only, not applicant-supplied data:** Section
   E's own "FOR OFFICIAL USE" block.

## Conformance

3 valid mock scenarios — `valid-self-employed-business-income` (a
self-employed individual with Section B business income lines, Section C
capital allowances and donations, and a taxpayer-signed declaration with no
representative); `valid-employment-and-rental-income` (a PAYE employee with
Section B employment and rental income lines, National Insurance and
superannuation deductions, and PAYE tax credited); and
`valid-agent-prepared-with-dividends-and-revised-return` (a revised return
exercising `isRevisedReturn`, `dividendsReceivedResidentCompanies` /
`incomeAtNilRateThreshold`, and the full Representative's Details block) —
plus 7 mutation-control fixtures (one missing statically-required field from
each of `yearOfAssessment`, `name`, `trn`, `businessMailingAddress`,
`occupation`, `taxpayerSignature`, `declarationDate`) and one
unknown-field-rejected fixture, committed under
`conformance/jm/taj/individual-income-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 11 fixtures: all 3 valid scenarios at 0 errors, all 7
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
