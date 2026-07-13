# Verification record — `jo/istd/pit-return-employee` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2731**. This schema **opens
Jordan's Taxes vertical** — Jordan's first published schema, making Jordan
the registry's **49th jurisdiction**. Jordan (Taxes) was scouted and left as
an open, ready-to-author candidate in the **GOV-2716** cycle (alongside Sri
Lanka, authored that same cycle, and Serbia, authored in **GOV-2725**); this
cycle independently re-fetched and re-verified the source from scratch
rather than trusting that prior scouting pass's figures verbatim.

## Source verification (independently re-derived, not copied from the task briefing)

- **PDF source:**
  `https://istd.gov.jo/ebv4.0/root_storage/en/eb_list_page/tax_returns_(natural_person_-_employee).pdf`
  — fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **189,206 bytes**.
  - **`sha256`:**
    `a25b8676a670e026f59b127a6d41f06ce501c48f570d42d0acbfbc633a4e2029`
    (computed via `sha256sum` on the freshly-downloaded file).
- Attempted to re-confirm this exact URL against ISTD's own live forms
  listing (rather than trusting the pre-scouted URL alone): `istd.gov.jo`
  runs a legacy ASP.NET WebForms CMS whose Arabic-language forms-listing
  pages (`/Ar/List/النماذج_الضريبية` "Tax Forms" and
  `/Ar/List/الاقرارات_الضريبية` "Tax Declarations") render successfully
  (HTTP 200) but return only a generic template shell (banner/sidebar
  items) under a plain `curl` fetch — the actual per-item form links are
  populated client-side and were not recoverable via static HTML fetch in
  this sandbox. The direct PDF URL itself, however, is live, unauthenticated,
  and serves a genuine `application/pdf` response, which is the primary
  evidence this schema is built from. This is disclosed as an open gap
  (unable to independently corroborate the URL via the listing page) rather
  than silently treated as fully confirmed.

## PDF structure, independently confirmed via `pdfjs-dist@3` (legacy build)

- **2 pages**, a plain print-and-fill specimen: `getFieldObjects()` was not
  called directly, but `page.getAnnotations({intent: "display"})` returned
  **zero Widget-subtype annotations on both pages** — a genuine non-AcroForm
  specimen, confirmed rather than assumed.
- `getTextContent()` returned a full, clean, English-only text layer on both
  pages. Every text item's `(x, y)` transform was grouped by rounded
  `y`-coordinate into rows and sorted by `x` to reconstruct the source's own
  line breaks and column layout — the full per-page, per-row transcript was
  read in full before modeling any field.
- **Page-image cross-check succeeded this cycle:** both pages were rendered
  to PNG via `pdfjs-dist` + `node-canvas` (2.5x scale) and visually
  inspected. This resolved two structural questions the text transcript
  alone left ambiguous:
  1. The top-of-page "Type of Return"/"Tax Period" labels sit at a higher
     `y`-coordinate (reading order) than the boxed checkbox/year control
     itself in the extracted text stream, because the labels and the box
     interleave with the Ministry-of-Finance title line. The rendered image
     confirms these labels genuinely belong to the header box (Regular/
     Amended checkboxes + a 4-digit year value, "2019" on this specimen),
     not to a separate unrelated control.
  2. The Dependent table (headed on page 1) has a **fixed 6-row printed
     capacity** — page 1's own render shows only the column header row at
     the bottom of the page, and page 2's render shows exactly 6 blank
     table rows before the Declaration section begins. This confirms the
     bounded-repeating-group size (`dependent1`..`dependent6`) used below,
     consistent with this registry's established `entrantN`/`childN`
     precedent for fixed-capacity printed tables.

## Field derivation

The form's structure, reconstructed by row (English-only, verified via
`getTextContent()` positions and cross-checked against both page renders):

**Page 1** — header (form code QP170-F1; Ministry of Finance/Income & Sales
Tax Department; Type of Return Regular/Amended + Tax Period; "PIT RETURN /
EMPLOYEE (natural person)" title); identification block (Name of taxpayer;
TIN, National ID/Passport, ISTD Office; Address, Family status; City, P.O.
Box, Telephone, Wife income Yes/No; Zip code, Mobile, Joint income Yes/No;
Email, Nationality Jordanian/Non-Jordanian, Residency Resident/
Non-resident); an unlabeled income-and-exemptions worksheet (box 339, 3303,
3305, 3307, 99310, 993104, 9027, 9028, 9029, 993105, 99110, 991201, 99130);
"Calculation of tax liability (table 99000)" (box 99510, 995201, 995211,
99540, 99171, 991311, 99131, 99513, 995212, 99541, 99132, 99514, 995213,
99542, 99590); the Dependent table header (Dependent name, Relationship,
National ID/passport, Nationality, Year of birth) with its first (blank)
row.

**Page 2** — the Dependent table's remaining 5 blank rows; the Declaration
("I, hereby, certify that all information given in this declaration is
true, correct and complete, that I have no other source of income other
than employment, under liability, and that the address provided is valid
for notification purposes in accordance with the law."; Date (spouse) / Name
and signature of spouse, if joint income / TIN of the spouse / National ID
of the spouse; Date (taxpayer) / Taxpayer's/agent's name and signature / Tax
agent's TIN / Tax agent's national ID); "For Official Use" (Return filed
at/on/Received by/Signature — staff-populated, excluded from `fields[]`
consistent with this registry's established precedent for office-use-only
blocks, e.g. `gh/orc`'s Section (L)); "Updated Jan 28, 2020" footer.

Every printed field was mapped to one of this schema's 84 `fields[]`
entries or its 1 `documents[]` entry. See the schema's own `sourceRef` on
each field for the exact page/box-code/label it was read from.

## Scoping and modeling judgment calls

- **No explicit gate for the end-of-service-indemnity or National
  Contribution blocks:** unlike this registry's `gh/gra` Ghana DT0103
  precedent, which prints an explicit "Do you earn income from
  employment? If No proceed to..." yes/no gate ahead of each income
  section, this ISTD specimen prints no such gate ahead of boxes
  99171–99541 (end-of-service indemnity) or 99132–99542 (National
  Contribution). Both blocks are modeled fully optional with no
  `requiredWhen` coupling, disclosed here rather than inventing a gate
  field the source does not print.
- **Total/subtotal boxes marked `required: true`; itemized component boxes
  optional:** boxes 339, 99310, 993104, 99110, 99130, 99510, 99540, and
  99590 are each a mandatory bottom-line figure in the worksheet's own
  computation chain and are modeled required; the itemized lines beneath
  them (3303/3305/3307, 9027–9029, 993105, 991201, 995201/995211, and the
  full end-of-service-indemnity/National-Contribution blocks) are optional,
  since a given filer will not have every income/exemption/deduction
  category.
- **`familyStatus` modeled as free text:** printed as a single blank
  fillable cell with no options text anywhere on the specimen (unlike
  `wifeIncome`/`jointIncome`/`nationality`/`residency`, which are printed as
  labeled binary choices) — modeled as an unconstrained string rather than
  an invented enum, consistent with this registry's established precedent
  for unprinted-option fields (e.g. `gh/gra`'s `landlordName`-adjacent free
  text).
- **`taxPeriod` typed as a 4-digit string, not `date`:** the box holds only
  a year value (the specimen prints the example "2019"), so it cannot
  represent a full calendar date; modeled as a pattern-constrained string,
  consistent with this registry's `yearOfAssessment` (`gh/gra`) precedent.
- **Dependent table bounded to 6 rows:** confirmed via the page-2 render
  (see above) rather than assumed from the page-1 column headers alone.
- **Declaration `Date` fields split as `spouseDeclarationDate` (left
  column, paired with the spouse's own signature block) vs.
  `taxpayerDeclarationDate` (right column, paired with the taxpayer's/
  agent's own signature block):** the source prints two independent Date
  boxes side by side, one per declarant; `spouseDeclarationDate` is gated
  `requiredWhen` `jointIncome` is `true` alongside the other spouse-
  particulars fields, while `taxpayerDeclarationDate` is always required.
- **"For Official Use" block excluded:** `Return filed at`/`on`/`Received
  by`/`Signature` are staff-populated at filing time, not applicant-
  fillable — excluded from `fields[]`, consistent with this registry's
  established precedent for office-use-only sections.

## Conformance run

Two hand-authored valid fixtures under
`conformance/jo/istd/pit-return-employee/1.0.0/`:

- **`valid-self-filed-no-dependents.json`** — a single filer (`jointIncome:
  false`, `wifeIncome: false`), regular return, no dependents, no
  end-of-service indemnity, no National Contribution — exercising the
  schema's minimal required-field path.
- **`valid-joint-with-dependents-and-eos.json`** — an amended, jointly-filed
  return (exercising the `jointIncome`-gated spouse fields
  `spouseNameAndSignature`/`spouseTin`/`spouseNationalId`/
  `spouseDeclarationDate`), 2 dependents (`dependent1*`/`dependent2*`), and
  a populated end-of-service-indemnity block.

Six mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-tin.json`** — drops `tin` (static
  `required: true`) from the self-filed valid fixture.
- **`mutation-control-invalid-enum-nationality.json`** — sets `nationality`
  to `"american"`, not one of the enum's 2 values.
- **`mutation-control-invalid-pattern-tax-period.json`** — sets `taxPeriod`
  to `"25"` (2 digits), violating the field's `^[0-9]{4}$` pattern.
- **`mutation-control-missing-conditional-spouse-tin.json`** — starts from
  the joint-filing valid fixture (`jointIncome: true`) and drops only
  `spouseTin`, isolating the `requiredWhen` violation.
- **`mutation-control-missing-taxpayer-declaration-date.json`** — starts
  from the joint-filing valid fixture and drops only
  `taxpayerDeclarationDate` (static `required: true`).
- **`mutation-control-invalid-pattern-dependent-year-of-birth.json`** —
  sets `dependent1YearOfBirth` to `"15"` (2 digits), violating the field's
  `^[0-9]{4}$` pattern.

All eight fixtures were checked with a from-scratch Node conformance
checker (`check-conformance.mjs`, not committed — a disposable script, per
this registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.enum`/`validation.pattern`
grammar directly:

```
$ node check-conformance.mjs schema.json conformance/jo/istd/pit-return-employee/1.0.0
PASS mutation-control-invalid-enum-nationality.json: expected 1 error(s), got 1 -> invalid enum value for nationality: american
PASS mutation-control-invalid-pattern-dependent-year-of-birth.json: expected 1 error(s), got 1 -> invalid pattern for dependent1YearOfBirth: 15
PASS mutation-control-invalid-pattern-tax-period.json: expected 1 error(s), got 1 -> invalid pattern for taxPeriod: 25
PASS mutation-control-missing-conditional-spouse-tin.json: expected 1 error(s), got 1 -> missing required field: spouseTin
PASS mutation-control-missing-taxpayer-declaration-date.json: expected 1 error(s), got 1 -> missing required field: taxpayerDeclarationDate
PASS mutation-control-missing-tin.json: expected 1 error(s), got 1 -> missing required field: tin
PASS valid-joint-with-dependents-and-eos.json: expected 0 error(s), got 0
PASS valid-self-filed-no-dependents.json: expected 0 error(s), got 0
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's ajv-based meta-schema validator was run against the schema
document and passes:

```
$ node tools/validate-ajv.mjs registry/jo/istd/pit-return-employee/1.0.0/schema.json
ok   registry/jo/istd/pit-return-employee/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/govschema-client/node_modules` did not have `pdfjs-dist`/`canvas`
present in this worktree at the start of this cycle, and a bare `npm
install <pkg> --no-save` inside `tools/govschema-client/` silently removed
the existing `ajv`/`ajv-formats` dependencies — reproducing this registry's
own documented gotcha. Recovered via `npm ci --include=dev` followed by a
single combined `npm install pdfjs-dist@3 canvas --no-save`.)

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Jordan's **Taxes vertical** — Jordan's first published schema,
  making Jordan the registry's **49th jurisdiction**. DMV, Business
  Formation, Visa, Passport, and National ID & Civic Documents are all
  open, unscreened backlog candidates.
- `jurisdiction.level` is `national` — ISTD is Jordan's national tax
  authority, under the Ministry of Finance.
- `process.type` is `filing`, matching the form's own nature as an annual
  personal income tax return.
- `process.language` is `en`: this specimen's full text layer is entirely
  in English (ISTD's own English-language distribution of the form); an
  Arabic-language original/parallel edition was not located this cycle and
  is disclosed as an open gap rather than assumed identical in structure.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) independently
corroborating the source PDF URL against ISTD's own dynamic forms-listing
page (this cycle's static-HTML fetch could not recover the client-side-
rendered item links); (2) confirming whether an Arabic-language original
of this form exists and, if its structure differs, whether a companion
schema is warranted; (3) whether a future cycle wants to author Jordan's
remaining open verticals (DMV, Business Formation, Visa, Passport,
National ID & Civic Documents) as companion schemas.
