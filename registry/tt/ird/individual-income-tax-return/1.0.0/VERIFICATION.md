# Verification record — tt/ird/individual-income-tax-return@1.0.0

## Candidate selection

GOV-4575 ("GovSchema Standard Research"). GOV-4568 opened Trinidad and
Tobago as the registry's 91st jurisdiction via `tt/imd/passport-application-first-adult@1.0.0`
and banked three further STRONG-candidate verticals for a future cycle in
CATALOG.md's Known Gaps entry 0m: DMV (Ministry of Works and Transport Form
4 + Form 12), Business Formation (Companies Registry Form 1, plus a Form 6
sole-proprietor statement already confirmed image-only/scanned with no
extractable text layer), and Taxes (Inland Revenue Division Form 400 ITR).
This cycle authors the Taxes candidate: it carries no disclosed OCR blocker
(unlike Business Formation's Form 6) and no disclosed broken-TLS-chain
fetch workaround (unlike DMV's `mowt.gov.tt`), making it the cleanest of
the three banked candidates to pick up first.

## Reaching the live source

`https://ird.gov.tt/Media/Default/IRDForms/2018/F-400ITR--2018.pdf`

- Required `curl -k` (TLS certificate verification bypass) to reach
  `ird.gov.tt` from this session's network egress — a plain `curl` request
  without it fails at the TLS handshake (exit code 60); this is a
  connectivity/certificate-chain characteristic of the host, not a
  login/CAPTCHA/WAF content gate, and does not affect the document's own
  authenticity once reached.
- HTTP 200, `Content-Type: application/pdf`, **157,151 bytes** — matches
  the byte count independently recorded when this candidate was first
  banked in GOV-4568, confirming the source has not changed since.
- sha256 of the retrieved bytes:
  `5db6ccfcd095f3194de69e97b348fe787c1a4c9f08561911a94fb2811ef47a36`.
- PDF header `%PDF-1.4` at byte 0, 13 pages, confirmed via `pdfjs-dist`'s
  `numPages`.
- `getAnnotations()` returned zero AcroForm fields on any of the 13 pages —
  a flat, print-and-fill specimen, not an interactive form.
- Despite the filename and footer barcode reading "2018"/"V1-18400ITRP0x",
  the document is confirmed live and currently served from IRD's own
  "IRDForms" media library at the exact URL banked in GOV-4568 — the
  Inland Revenue Division's standing practice of keeping prior-year return
  templates permanently downloadable (the filer supplies the correct
  reporting year via the schema's own printed header, not a URL path
  change).

### Authority attribution

The document's own header prints "GOVERNMENT OF THE REPUBLIC OF TRINIDAD
AND TOBAGO, Ministry of Finance, Inland Revenue Division", and is
approved by the Board of Inland Revenue under Section 76 of the Income Tax
Act, Chap. 75:01. This schema attributes `authority` to the Inland Revenue
Division (IRD, `ird.gov.tt`), the issuing and processing authority whose
own domain hosts the form.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item's raw string and `transform` x/y position on all 13
pages, grouped into printed rows by rounded y-coordinate and sorted by
x-coordinate. The document is plain English with clean, non-rasterized
embedded fonts — the text layer extracted completely and unambiguously.
Pages 1-2 (the core return this schema models) were also rendered to PNG
via `node-canvas` at 2.5x scale to visually confirm the true table/checkbox
layout; unlike some other registry sources where embedded-font glyph
outlines failed to rasterize in this environment, this specimen's glyphs
rendered cleanly, visually confirming every checkbox ("NAME CHANGE" /
"ADDRESS CHANGE"; "Resident" / "Non-Resident" / "Male" / "Female" /
"Self-employed") as a plain, symmetric square glyph with no printed
asymmetry between paired options.

## Document structure

The 13-page form (each page footer-stamped with its own `V1-18400ITRPnn`
code) is: page 1, the Identification Section and the start of the Tax
Computation Section (Income, Lines 1-10); page 2, Deductions (Lines
11-33), Prepayments (Lines 34-41), and the General Declaration; pages 3-13,
twenty lettered companion Schedules (A through T) covering specific income
types and computations referenced from the main return by page number
(e.g. "Page 6, Schedule E", "Page 3, Schedule B", "Page 4, Schedule C",
"Page 11, Schedule R", "Page 13, Schedule T").

## Scope

This v1.0.0 schema models only the 2-page core return (Identification
Section, Tax Computation Section, General Declaration) — the portion every
individual filer completes regardless of income type. The 20 lettered
companion Schedules (A-T, pages 3-13) are excluded, following this
registry's standing narrow-scoping precedent for large multi-schedule tax
returns (e.g. Zambia's ITF 46_1 excluding its business/self-employment
computation sections; Kazakhstan's Form 250.00 authored core-first with
Schedules 250.01-06 as separate companion documents in later cycles). Each
excluded schedule is referenced from a specific core-return field's own
`description` (e.g. `netIncomeFromOtherSources` cites Schedule E,
`alimonyMaintenancePayment` cites Schedule B), so the gap is visible
rather than silent, and left as disclosed open backlog for a future
companion-schema cycle.

Within the core return, every printed formula/subtotal line — Lines 4, 6,
10 (Income section); 14, 16, 20, 24, 25, 26, 29, 30, 32, 33 (Deductions
section); 39, 40, 41 (Prepayments section) — is excluded from `fields[]`,
per this registry's standing closed decision to defer calculated/derived
fields (GSP-0013 §7, founder-confirmed on GOV-302). Only the lines a
taxpayer directly supplies are modelled. The sole exception is Line 15
("Deduct Personal Allowance - $72,000"): although printed alongside
formula lines, it is a fixed statutory constant available to every
individual filer rather than a value derived from other lines on this
form, so it is modelled as a directly-supplied required field, consistent
with how this registry treats other schemas' own printed fixed-allowance
constants.

## Disclosed findings and interpretation choices

1. **Three independent tick-box groups share one "Please tick the
   appropriate box" instruction** — Resident/Non-Resident, Male/Female,
   and a standalone Self-employed box — confirmed via the page 1 render:
   the first two are modelled as mutually-exclusive `enum` fields
   (`residencyStatus`, `sex`); Self-employed is modelled as an independent
   `isSelfEmployed` boolean, since the form prints it as a third, separate
   checkbox rather than a third option of either enum.
2. **`tradeName`/`typeOfBusiness`/`addressOfBusiness*` are gated
   `requiredWhen isSelfEmployed equals true`**, per the form's own printed
   qualifier "(IF ANY) SELF EMPLOYED ONLY" directly beside the Trade Name
   box.
3. **`personalAllowance` (Line 15) is modelled required, not excluded as a
   computed total** — see Scope above for the distinction drawn between a
   fixed statutory constant and a line genuinely derived by formula from
   other lines.
4. **`covenantedDonations` (Line 13)'s own printed 15%-of-Line-10 ceiling
   is disclosed in its `description` but not enforced as a `validation`
   maximum**, since Line 10 (Total Income) is itself an excluded computed
   total this schema does not carry a value for.
5. **`declarationDate` collapses the declaration's own printed "day of
   .... 2019" blank into one ordinary `date` field** rather than splitting
   day/month/fixed-year sub-fields or introducing a schema `edition` axis,
   consistent with this registry's `kz/kgd/*`/`ua/dps/*` tax-return
   precedent of modelling a filing year as an ordinary data value on a
   single, undated generic schema rather than a new edition per tax year.
6. **Every Income/Deductions/Prepayments line (Lines 1-3, 5, 7-9, 11-13,
   17-19, 21-23, 27-28, 31, 34-38) is modelled `required: false`**: the
   form's own "To Nearest Dollar, Omit Cents/Commas" column header carries
   no accompanying "enter NONE if not applicable" instruction, but every
   line is visibly one of many alternative income/deduction/prepayment
   categories a given filer may simply not have — the same left-blank-if-
   inapplicable convention this registry's `bw/burs/individual-tax-return`
   and `zm/zra/individual-income-tax-return` precedents already apply to
   their own analogous income-category lines.
7. **Excluded as official-use-only fields, not applicant-supplied data:**
   page 2's "FOR OFFICIAL USE ONLY" box ("Place Date Received Stamp
   Here").

## Conformance

3 valid mock scenarios — `valid-employed-resident` (a resident PAYE
employee with employment income, personal allowance, and a signed
declaration, no self-employment or schedule-referenced lines populated);
`valid-self-employed-with-deductions` (a resident, self-employed filer
exercising `isSelfEmployed`'s four `requiredWhen`-gated business fields
plus several deduction lines); and `valid-non-resident-with-schedule-
referenced-income` (a non-resident filer exercising the Schedule-
referenced lines — `netIncomeFromOtherSources`, `alimonyMaintenancePayment`,
`taxCredits`, `businessLevyLiability`, `totalIncomeTaxQuarterlyInstalmentsPaid`,
`totalBusinessLevyQuarterlyInstalmentsPaid`) — plus 8 mutation-control
fixtures (one missing statically-required field from each of `birFileNo`,
`lastName`, `firstName`, `occupationOrProfession`, `dateOfBirth`,
`personalAllowance`, `declarantName`, `signatureOfTaxpayerOrAuthorisedAgent`
— 8 fixtures) and one unknown-field-rejected fixture, committed under
`conformance/tt/ird/individual-income-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 12 fixtures: all 3 valid scenarios at 0
errors, all 8 static-required mutation controls each raising exactly 1
error, the unknown-field fixture correctly rejected, and confirmed every
`requiredWhen` field reference resolves to a real field name (0 dangling
references). Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run.
