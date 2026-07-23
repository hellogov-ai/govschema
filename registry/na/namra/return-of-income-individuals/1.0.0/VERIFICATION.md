# Verification record — na/namra/return-of-income-individuals@1.0.0

## Candidate selection

GOV-4491 ("GovSchema Standard Research", child of GOV-4488), delegated
after GOV-4488 re-scanned two banked candidates from the GOV-4424 scouting
pass (2026-07-22) that had never been picked up for authoring: Tajikistan
(Taxes, delegated separately as GOV-4490) and Namibia (Taxes, this cycle).
Namibia has no existing GovSchema entries — this schema opens Namibia as a
new jurisdiction, Taxes vertical (1 of 6).

## Reaching the live source, and the pre-flagged file-size change

The delegating issue explicitly flagged, before authoring began, that the
source PDF had grown from 1,097,728 bytes (the GOV-4424 banked record) to
2,124,999 bytes, and instructed re-deriving field count/structure from
scratch rather than trusting the prior byte count or any assumed field
list. This cycle independently re-fetched rather than reusing either
number at face value:

- `https://itas.namra.org.na/assets/documents/return-forms/Return_for_Individual.pdf`
- Required a browser-like `User-Agent` and a `Referer: https://itas.namra.org.na/`
  header, per the delegating issue's own disclosed gotcha — a plain
  default-UA request does hit a WAF; with both headers set, HTTP 200,
  `Content-Type: application/pdf`.
- Downloaded size: **2,124,999 bytes**, exactly matching the delegating
  issue's own re-verified figure (2026-07-23), confirming this is the same
  fresh specimen the issue flagged, not a further-changed document.
- sha256 of the retrieved bytes:
  `3c71d4fcbb28c26643485e3c07e0656d8b7f2d63e199dff25816371ff520e99e`.

Despite the ~2MB size (roughly double the banked estimate), the document
itself is a short, 4-page form — the size increase is attributable to
embedded fonts/rasterized branding assets, not additional pages or fields.
`pdfjs-dist` (`build/pdf.js`, vendored at `/tmp/node_modules/pdfjs-dist`)
`getAnnotations()` confirmed **zero `/Widget` annotations** across all 4
pages — a flat (non-AcroForm) specimen, so no assumption about field count
or structure could be sourced from widget names; every field below was
derived from the text layer and rendered page images instead.

## Extraction method

`getTextContent()` read every text item's raw string and `transform` x/y
position across all 4 pages, grouped into printed rows by rounded
y-coordinate, to reconstruct the form's own schedule/section layout and
every printed label. `node-canvas` (`createCanvas`, vendored at
`/tmp/node_modules/canvas`) then rendered each page to a PNG at 2.5x scale
to independently confirm box/table geometry, checkbox layout, and row
counts that the text layer alone could not disambiguate (in particular,
the exact slot counts of Schedule 2's children table, Schedule 3's
Retirement Annuity "Name of Fund(s)" lines, and the Employees' Tax
Deducted table's PAYE 5 certificate rows).

## Document structure

The 4-page form (6-0/0014C/1, "Return of Income: Individual", "DOMESTIC
TAXES") is laid out as:

- **Page 1** — header (Tax Year, Office of Registration, File
  Identification Number), Schedule 1: Personal Particulars (name,
  addresses, identity number, magisterial district, return office,
  spouse's name/file number), Taxpayer's Contact Details, Taxpayer's
  Banking Details, and the signed Declaration. A "FOR OFFICIAL USE — DATE
  RECEIVED" box is office-only.
- **Page 2** — prior-year-filing question (with a to-which-office/what-
  was-your-income branch), previously-resident-outside-Namibia /
  left-Namibia date questions, Schedule 2 (a 6-row table of supported
  children/stepchildren, each row itself a name plus month/year of
  birth), and a page of "Important Notes and Instructions" (Notes 1-6,
  prose only, no fields of their own — Note 6 is the one that scopes this
  entire form, see below).
- **Page 3** — a Revenue Codes reference table (informational, not a
  field, cited by Schedule 3's own Revenue Code line), Schedule 3: Salary,
  Wages, Fees, Commission, Bonus, and other benefits arising from
  employment as well as Pension and Annuities (one employer/fund row,
  three "Less:" deduction items, and the (a)/(b) housing/company-vehicle
  disclosure questions).
- **Page 4** — a note that Schedule 4 (Pension/Provident Fund refunds) is
  not part of this form, the Employees' Tax Deducted table (3 PAYE 5
  certificate rows), a Statutory Tax Rates reference table (informational
  only), NamRA's own Inland Revenue banking details for payment-by-
  transfer (office/payee data, not applicant data), and the NamRA
  Regional Offices address directory (informational).

## Scope: this is the simplified, full-year-single-employer edition

Note 6 (page 2) is explicit and controls this schema's scope: a taxpayer
who worked for more than one employer and/or received pension/annuities
from more than one retirement fund during the year, who was employed for
only part of the year, who wants to claim expenses as a deduction from
remuneration, or who was involved in farming or other business activities,
is directed to complete Form 6-0/0014B (blue) or 6-0/0014A (yellow)
instead — this specimen's own Schedule 3 accordingly prints only a single
employer/fund row (confirmed both from the text layer and the rendered
page image), not a repeating table. This schema therefore models the
single-employer, full-year edition only; the blue/yellow forms are
out of scope for this cycle and not modelled here.

## Scope: fields excluded as purely computed from other same-form lines

Per this registry's standing closed decision to defer calculated/derived
fields (GSP-0013 §7, founder-confirmed on GOV-302):

- **Schedule 3, SUB-TOTAL** — the sum of the (single) employer/fund gross
  amount row; with only one row on this specimen it is a trivial identity,
  but it is still a same-form computed total, not independently supplied
  data.
- **Schedule 3, TOTAL DEDUCTIONS** — the sum of the three "Less:" items
  (Pension/Provident Fund contribution, Retirement Annuity Fund
  contribution, child education/training insurance premium).
- **Schedule 3, NET SALARY (Line No. 2)** — Sub-Total minus Total
  Deductions.
- **Page 4, SUM OF EMPLOYEES' TAX CREDITS** — the total row of the
  Employees' Tax Deducted table, printed directly beneath the three PAYE 5
  certificate rows sharing the same N$/Cents columns; read as the same-
  table sum of the three rows above it, consistent with the same
  determinism-based exclusion test already applied elsewhere in this
  registry (e.g. `bo/sin/formulario-200-iva`).

## Scope: office-only / third-party fields excluded

- **"FOR OFFICIAL USE — DATE RECEIVED"** (page 1) is excluded as an
  office-only receipt-date stamp, not applicant-supplied data.
- **NamRA's own "Inland Revenue Banking Details"** (page 4 — bank name,
  branch code, account name, account number, reference number for paying
  NamRA by transfer) is excluded in its entirety as the payee's own fixed
  payment details, not applicant data — the taxpayer's *own* banking
  details (Schedule 1) are modelled, since refunds are paid into that
  account, but NamRA's receiving account is not a schema input.
- **NamRA Regional Offices address directory** (page 4) and the **Revenue
  Codes** and **Statutory Tax Rates** reference tables (pages 3-4) are
  excluded as printed reference material the form cites, not blanks the
  applicant fills in.

## Disclosed findings and interpretation choices

1. **"OFFICE OF REGISTRATION" is modelled as two separate fields**
   (`registrationOffice`, `taxFileIdentificationNumber`), matching the
   two distinct blank boxes printed side by side under that heading, the
   second of which the source's own instruction singles out ("ALWAYS
   MENTION THIS FILE IDENTIFICATION NUMBER IN YOUR CORRESPONDENCE AND AT
   INTERVIEWS"). Both are modelled `required: true` notwithstanding the
   page's own instruction that these blocks are typically pre-printed by
   NamRA for an already-registered taxpayer and only need completing "where
   particulars are missing or have changed" — this schema models the
   return's full data content regardless of who conventionally populates
   it first.
2. **"RETURN OFFICE" (Schedule 1) is modelled as a separate field from
   "OFFICE OF REGISTRATION" (page 1 header)**, both left as plain
   free-text strings rather than constrained to the enumerated list of
   7 NamRA regional offices printed on page 4 — that address directory is
   presented as contact information, not explicitly cited by either field
   as its authoritative value set, so this schema does not assume the two
   concepts are drawn from an identical closed list without the source
   saying so.
3. **The prior-year-filing question branches, and both branches are
   modelled with `requiredWhen` against the same boolean**
   (`renderedReturnLastYear`): "TO WHICE OFFICE?" is required only when
   `true` (rendered a return last year); "WHAT WAS YOUR INCOME FOR LAST
   YEAR?" is required only when `false` (did not render a return last
   year) — read directly off the specimen's own row alignment (YES sits
   beside "TO WHICH OFFICE?"; NO sits beside "WHAT WAS YOUR INCOME FOR
   LAST YEAR?").
4. **"IF PREVIOUSLY RESIDENT OUTSIDE NAMIBIA" and "IF YOU HAVE LEFT
   NAMIBIA" are not modelled as separate boolean/checkbox fields.** The
   rendered page image confirms neither caption has its own adjacent
   input box — only the paired "DATE OF ARRIVAL" / "DATE OF DEPARTURE"
   DDMMYYYY boxes are genuine fillable fields. Both are modelled as plain
   optional `date` fields; a supplied value itself signals the
   condition applies, avoiding a fabricated gating boolean the source does
   not provide, per this registry's own established precedent (e.g.
   `ng/firs/fct-irs-personal-income-tax-return-form-a`'s spouse/children
   block).
5. **Schedule 2's children table is flattened to 6 bounded slots**
   (`child1Name`/`child1BirthMonth`/`child1BirthYear` through `child6...`),
   matching the specimen's own 6 numbered rows (confirmed by the rendered
   page image), per this registry's established bounded-repeating-group
   convention (e.g. `ng/firs`'s 4-slot children table). All slots are
   optional. Date of birth is modelled as two separate fields (month,
   year) rather than a single `date` value, since the source itself
   prints only "Month" and "Year" sub-columns with no day column —
   mirroring `bo/sin/formulario-200-iva`'s own `periodMonth`/`periodYear`
   split for the same reason (a source that genuinely omits a day
   component cannot be forced into a full-date type).
6. **Schedule 3's Retirement Annuity Fund "Name of Fund(s)" caption is
   flattened to 2 bounded slots** (`retirementAnnuityFundName1/2`),
   confirmed by rendering the specific ruled sub-area, which shows exactly
   two blank lines beneath the single caption (item 1, Pension/Provident
   Fund, prints only one "Name of Fund" line by contrast).
7. **`grossAmount` and the three Schedule 3 "Less:" deduction amounts are
   modelled `type: integer`**, per the Gross Amount column's own printed
   "(N$ ONLY)" heading confirming whole-Namibia-Dollar amounts with no
   cents column in that part of the form — the same modelling choice
   `bo/sin/formulario-200-iva` makes for its own "(EN BOLIVIANOS SIN
   CENTAVOS)" column.
8. **The Employees' Tax Deducted table's three amount fields
   (`employeesTaxDeducted1/2/3`) are each modelled as a single `type:
   number` field**, even though the source prints two adjacent boxed
   columns ("N$" and "Cents") per row. A single decimal-capable field
   carries the same information without loss (e.g. `1234.56`); no existing
   schema in this registry splits a currency amount into separate
   whole/cents subfields, so this keeps the modelling consistent with the
   registry's established currency-field convention rather than
   introducing a new one for a single form.
9. **The Employees' Tax Deducted table's own "Line No." column is
   excluded** — unlike Schedule 3's own "Line No." column (which is
   pre-printed with "1" and "2", confirmed in the text layer, genuinely
   labelling the Gross Amount and Net Salary lines), this table's "Line
   No." column has no pre-printed values anywhere in the extracted text
   and no stated purpose distinct from the row's own position — treated as
   a redundant sequence marker with no independent information content,
   the same class of exclusion this registry draws around pure
   administrative counters (e.g. `bo/sin/formulario-200-iva`'s own
   "NÚMERO DE ORDEN").
10. **`emailAddress` validation reuses this registry's own single-escaped
    email pattern** (`^[^@\s]+@[^@\s]+\.[^@\s]+$`, one backslash per JSON
    string, not two), specifically to avoid the double-escaped-regex
    defect this registry has previously caught and fixed
    (`py/suace/business-formalization-individual`, GOV-4437).
11. **Two `documents[]` entries derived from Schedule 3's own printed
    attachment instructions are left plain-optional rather than
    `requiredWhen`-gated against a Schedule 3 field** (`grossAmount`,
    a fund-contribution amount, etc.) — this registry has previously
    caught and fixed a bug class where gating a field's/document's
    requiredness on `notEquals` against another field that may be
    genuinely *absent* (not just empty) produces incorrect requiredness
    (see this registry's own notEquals-empty-string-absent-field
    lesson, most recently avoided in `za/dha/visa-application`). Both
    attachments are disclosed as conditionally applicable in their own
    `handling`/`sourceRef` text instead.
12. **`accountType` is modelled as an `enum`** (`SAVINGS`/`CURRENT`/
    `TRANSMISSION`), matching the three printed checkbox labels the
    taxpayer marks exactly one of.
13. **Every Schedule 3 field is modelled `required: false`**, consistent
    with this registry's established convention for income-statement
    lines that do not apply to every filer (this return "must be rendered
    even if there is no tax payable", per the form's own printed
    instruction) — mirroring `bo/sin/formulario-200-iva` and
    `zm/zra/individual-income-tax-return`'s own treatment of their income/
    deduction lines.
14. **`ownsResidence` and `ownsCompanyVehicle` are modelled
    `required: true`**, since both questions are printed unconditionally
    for every filer regardless of employment/income status, unlike the
    Schedule 3 income lines above them; their conditional sub-fields
    ((a)(i)-(iii), (b)(i)-(iii)) are `requiredWhen`-gated on the
    respective boolean.

## Conformance

3 valid mock scenarios — `valid-single-employer-return` (a straightforward
on-time filing with one employer, standard deductions, no children, no
company vehicle, owns own residence); `valid-return-with-children-and-rental`
(a filing with 3 supported children populated, does not own the residence
so the (a)(i)-(iii) rental-disclosure fields are populated, and a
prior-year-income answer since no return was rendered last year); and
`valid-return-with-company-vehicle-and-paye-certificates` (a filing with
the company-vehicle (b)(i)-(iii) fields populated and all 3 Employees' Tax
Deducted PAYE 5 certificate rows populated) — plus 5 mutation-control
fixtures (one missing statically-required field from each of
`taxYear`, `initialsAndSurname`, `identityNumber`, `ownsResidence`,
`declarantName`) and one unknown-field-rejected fixture, committed under
`conformance/na/namra/return-of-income-individuals/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all fixtures: all 3 valid scenarios at 0
errors, all 5 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full registry run. `registry-index.json` regenerated
via `npm run build-index` in `tools/govschema-client/`.
