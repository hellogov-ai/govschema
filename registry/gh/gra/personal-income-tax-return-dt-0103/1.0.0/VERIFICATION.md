# Verification record — `gh/gra/personal-income-tax-return-dt-0103` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2697** (parent research
cycle **GOV-2695**, which scouted Ghana's 5 remaining open verticals in
parallel — Ghana opened as the 41st jurisdiction via **GOV-2510**, National
ID only). This schema **opens Ghana's Taxes vertical**.

## Source verification (independently re-derived, not copied from the task briefing)

- Re-confirmed the exact PDF filename against GRA's own live forms listing
  rather than trusting the task briefing's pre-scouted filename verbatim:
  `curl -s https://gra.gov.gh/forms/` (**HTTP 200**), then grepped the
  returned HTML for a `DT_0103`-named link, finding exactly
  `DT_0103_personal_income_tax_return_form_v103-ver-1.1..-1.pdf` embedded in
  the listing.
- **PDF source:**
  `https://gra.gov.gh/wp-content/uploads/2020/09/DT_0103_personal_income_tax_return_form_v103-ver-1.1..-1.pdf`
  — fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **461,527 bytes**.
  - **`sha256`:**
    `b394df0bf108c710f6d681c3b261a8af11af35623c56436fb9e77b75c91c8359`
    (computed via `sha256sum` on the freshly-downloaded file).
  - Both the byte count and hash **independently match the task briefing's
    own pre-scouted figures exactly**, confirming the specimen has not
    changed since that scouting pass.

## PDF structure, independently confirmed via `pdfjs-dist@3` (legacy build)

- **4 pages**, a plain print-and-fill specimen: `getFieldObjects()` returned
  `null` and `page.getAnnotations({intent: "display"})` returned **zero
  Widget-subtype annotations across all 4 pages** — confirmed, not assumed
  from the task briefing's own characterization.
- `getTextContent()` returned a full, clean, English-only text layer on
  every page. Every text item's `(x, y)` transform was grouped by rounded
  `y`-coordinate into rows and sorted by `x` to reconstruct the source's own
  line breaks and column layout — the full per-page, per-row transcript was
  read in full before modeling any field.
- **Attempted page-image cross-check** (`pdfjs-dist` + `node-canvas` at 2.5x
  scale, `FONTCONFIG_PATH` pointed at this sandbox's own fontconfig per this
  registry's established browser-screenshot precedent): page 1 threw
  `TypeError: Image or Canvas expected` inside pdfjs-dist's
  `paintInlineImageXObject` (almost certainly the GRA letterhead crest, an
  inline image XObject this pdfjs-dist/node-canvas combination cannot
  rasterize in this sandbox); page 4 (the Declaration page, printed with no
  images) rendered without throwing but produced a blank white canvas — no
  usable visual cross-check was obtained for any page this cycle. **Every
  field below is derived from the text-layer transcript alone**, and the one
  place this genuinely matters — the Signature/Date/"OR"/"R.T.P" block on
  page 4's self-declaration branch — is disclosed explicitly rather than
  resolved by invented visual structure (see `isCertifiedByRegisteredTaxPractitioner`
  below).

## Field derivation

The form's structure, reconstructed by row (English-only, verified via
`getTextContent()` positions):

**Page 1** — header (Ghana Revenue Authority, Domestic Tax Revenue Division,
Personal Income Tax Return; Current Tax Office LTO/MTO/STO tick-one + Name
of GRA Office; Year of Assessment; Period From/To dd/mm); §1 Personal
Information (Surname/TIN, First Name/Telephone No., Other Name(s),
Nationality); §2 Business Information (Location/GhanaPost Digital Address;
Business Name(s)/Business Activity; "If more than ONE provide the same
information on a separate sheet"; Tenancy status of Business
Rented/Owned + "(If rented provide particulars of Landlord)"; Name of
Landlord; Telephone Number(s); TIN); §3 Employment Information (TIN of
Employer, Name of Employer, Address).

**Page 2** — §4 Sources of Income: "(Do you earn income from business? If
No proceed to B)"; A. Net Business Income/Loss (As per financial Statement
attached); "(Do you earn income from employment? If No proceed to C)"; B.
Employment Income (i. Basic salary, ii. Cash Allowances, iii. Other Cash
Benefit, iv. Excess Bonus, Benefit in Kind [1. Accommodation Benefit, 2.
Vehicle Benefit, 3. Others e.g. Loan Benefit & Share Benefit etc.], v.
Total Benefits in kind, **vii.** Others (e.g. Director's Fees), TOTAL
EMPLOYMENT INCOME (Sum i to vi)); "Do you any investment income? (If No
proceed to D)"; C. Investment and Other Incomes (i. Royalty, ii. Interest,
iii. Dividend (Received from Non-Resident Person), iv. Taxable Rent Income,
v. Income from Foreign Source, vi. Other, TOTAL INVESTMENT INCOME & OTHER
INCOMES); D. TOTAL INCOME.

**Page 3** — §5 Tax Computation: A. Net Business Profit/Loss (Same as 4A);
Add Backs (i. Depreciation, ii. Non-allowable deductions); B. Total Add
Backs; C. Adjusted Business Profit/Loss; Deduct (i. Non-Taxable income, ii.
Allowable Deduction); D. Total Deductions; E. Net Adjusted Business
Profit/Loss; F. Add Total Investment Income (same as 4C); G. Add Total
Employment Income (same as 4B); H. Total Assessable Income; I. Income Taxed
at Different Rates; J. Net Assessable Income; Deduct: Reliefs (i. Social
Security, ii. Marriage/Responsibility, iii. Children's education, iv. Old
Age, v. Aged Dependents, vi. Disability, vii. Cost of Training, viii.
Voluntary Pension contribution, **x.** Other allowable deductions); K.
Total allowable deductions/reliefs (Sum of i to ix).

**Page 4** — L. Chargeable Income (5J – 5K); M. Tax Charged; Less Payments
(i. Tax Credits, ii. Payment on Account (All Sources)); N. Total Payments;
O. Tax Payable/(Overpaid); DECLARATION — a. For persons making return on
their own behalf ("I, ___ do hereby declare..."; Signature/Date; "OR" /
"R.T.P"); b. For persons making return on behalf of another person ("I ___
on behalf of ___ do hereby declare..."; Address; Signature; Relationship to
taxpayer; Date).

Every printed field was mapped to one of this schema's 80 `fields[]`
entries or 2 `documents[]` entries. See the schema's own `sourceRef` on each
field for the exact page/section/label it was read from.

## Disclosed source-form artifacts (not silently corrected)

Two apparent stale-caption artifacts in the source PDF itself, each modeled
verbatim rather than corrected, consistent with this registry's established
precedent (e.g. `gr/aade`'s own disclosed code-to-label ambiguities) of
modeling what the source actually prints:

1. **§4B employment-income breakdown:** the printed item list runs i–v then
   jumps directly to **"vii. Others (e.g. Director's Fees)"** — no "vi"
   item is printed anywhere in the extracted text — while the section's own
   total caption still reads **"TOTAL EMPLOYMENT INCOME (Sum i to vi)"**.
   Modeled as `employmentOtherIncome` (item vii) and `totalEmploymentIncome`
   (the caption's own mismatch disclosed on the latter field's
   `description`).
2. **§5 Reliefs:** the printed item list runs i–viii then jumps directly to
   **"x. Other allowable deductions"** — no "ix" item is printed — while its
   own total caption reads **"K. Total allowable deductions/reliefs (Sum of
   i to ix)"**. Modeled as `reliefOtherAllowableDeductions` (item x) and
   `totalAllowableDeductionsReliefs` (the same kind of disclosed mismatch).

## Scoping and modeling judgment calls

- **§2/§3 header fields not gated to §4's yes/no questions:** Business
  Information (`businessName`, `businessActivity`, etc.) and Employment
  Information (`employerName`, `employerTin`, etc.) fields are modeled as
  optional (`required: false`) without `requiredWhen` coupling to §4's
  `hasBusinessIncome`/`hasEmploymentIncome` gates. The source's own "If No
  proceed to..." instructions gate only the §4 income-*amount* entries
  themselves, not explicitly the §2/§3 identification fields — a filer
  could plausibly complete §2/§3 (e.g. to record a dormant business) while
  still answering "No" in §4. The natural applicability relationship is
  disclosed here narratively rather than encoded as an invented hard rule.
- **Landlord particulars gated to tenancy status:** `landlordName`,
  `landlordTelephoneNumber`, and `landlordTin` are gated `requiredWhen`
  `businessTenancyStatus` is `"rented"`, directly matching the source's own
  printed instruction "(If rented provide particulars of Landlord)"
  immediately beneath the tenancy tick-boxes — the task briefing's own
  description independently corroborates this as "landlord particulars."
- **§4 gating booleans and their totals:** `hasBusinessIncome`,
  `hasEmploymentIncome`, and `hasInvestmentIncome` model the source's own
  unlabeled Yes/No tick-box pairs (not extractable as text on a
  non-AcroForm specimen, consistent with this registry's established
  pattern for tick-box gates); each section's headline total
  (`netBusinessIncomeOrLoss`, `totalEmploymentIncome`,
  `totalInvestmentAndOtherIncome`) is gated `requiredWhen` its corresponding
  gate is `true`, directly matching the source's own explicit "if No
  proceed to [next section]" skip instructions. The itemised breakdown
  lines beneath each total are left optional individually since not every
  filer has every sub-category of income.
- **§5 worksheet requiredness:** the lettered subtotal/total lines (A, C,
  E, H, J, K, and page 4's L/M/N/O) are modeled `required: true` where they
  represent a mandatory bottom-line computation every filer must reach,
  while the itemised numbered add-back/deduction/relief lines beneath them
  are optional, since a given filer will not have every add-back or relief
  category.
- **`isCertifiedByRegisteredTaxPractitioner` — disclosed best-effort
  field:** page 4's self-declaration branch prints a Signature/Date block
  immediately followed by the tokens "OR" and "R.T.P" on the same and next
  printed line. Read here as a Registered Tax Practitioner co-certification
  option, but — since the page-image cross-check did not produce a usable
  render this cycle (see above) — the exact box/checkbox mechanics (e.g.
  whether R.T.P. has its own name/registration-number sub-fields) could not
  be fully disambiguated from the text layer alone. Modeled as a single
  disclosed boolean rather than invented multi-field structure; a future
  cycle with a working page render should revisit this.
- **`periodFrom`/`periodTo` typed as `dd/mm` strings, not `date`:** the
  source prints no year component for this field, so it cannot represent a
  full calendar date; modeled as a pattern-constrained string instead.

## Conformance run

Two hand-authored valid fixtures under
`conformance/gh/gra/personal-income-tax-return-dt-0103/1.0.0/`:

- **`valid-self-declared-full-income.json`** — a self-declared filer with
  business, employment, and investment income all present, tenancy
  `rented` (exercising the landlord-particulars `requiredWhen` gate), and
  both `documents[]` entries provided.
- **`valid-representative-employment-only.json`** — a representative-
  declared filer (exercising the `taxpayerOnBehalfOf`/`representativeAddress`/
  `relationshipToTaxpayer` `requiredWhen` gates) with employment income only
  (`hasBusinessIncome`/`hasInvestmentIncome` both `false`), so the
  business/investment totals and the financial-statement document are
  correctly absent.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.enum`/`validation.pattern`/
`validation.minimum` grammar directly against `spec/v0.3/SPEC.md`'s rules:

```
$ node check_conformance.mjs schema.json \
    valid-self-declared-full-income.json \
    valid-representative-employment-only.json
valid-self-declared-full-income.json: 0 error(s)
valid-representative-employment-only.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-personal-tin.json`** — drops `personalTin`
  (a static `required: true` field) from the self-declared valid fixture.
- **`mutation-control-invalid-enum-tax-office.json`** — sets `taxOffice` to
  `"xto"`, not one of the enum's 3 values.
- **`mutation-control-missing-conditional-landlord-name.json`** — starts
  from the self-declared valid fixture (`businessTenancyStatus: "rented"`)
  and drops only `landlordName`, isolating the `requiredWhen` violation.
- **`mutation-control-missing-conditional-total-employment-income.json`** —
  starts from the representative-declared valid fixture
  (`hasEmploymentIncome: true`) and drops only `totalEmploymentIncome`.
- **`mutation-control-missing-conditional-taxpayer-on-behalf-of.json`** —
  starts from the representative-declared valid fixture
  (`declarationCapacity: "representative"`) and drops only
  `taxpayerOnBehalfOf`.
- **`mutation-control-invalid-pattern-year-of-assessment.json`** — sets
  `yearOfAssessment` to `"20255"` (5 digits), violating the field's
  `^[0-9]{4}$` pattern.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-personal-tin.json \
    mutation-control-invalid-enum-tax-office.json \
    mutation-control-missing-conditional-landlord-name.json \
    mutation-control-missing-conditional-total-employment-income.json \
    mutation-control-missing-conditional-taxpayer-on-behalf-of.json \
    mutation-control-invalid-pattern-year-of-assessment.json
mutation-control-missing-personal-tin.json: 1 error(s)
  - personalTin: required but missing
mutation-control-invalid-enum-tax-office.json: 1 error(s)
  - taxOffice: value "xto" not in enum ["lto","mto","sto"]
mutation-control-missing-conditional-landlord-name.json: 1 error(s)
  - landlordName: required but missing
mutation-control-missing-conditional-total-employment-income.json: 1 error(s)
  - totalEmploymentIncome: required but missing
mutation-control-missing-conditional-taxpayer-on-behalf-of.json: 1 error(s)
  - taxpayerOnBehalfOf: required but missing
mutation-control-invalid-pattern-year-of-assessment.json: 1 error(s)
  - yearOfAssessment: value "20255" does not match pattern ^[0-9]{4}$
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
ok   registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json
ok   registry/gh/gra/personal-income-tax-return-dt-0103/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv`/`ajv-formats` present in this
worktree at the start of this cycle; ran `npm ci --include=dev` inside
`tools/` first, per this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Ghana's **Taxes vertical**; National ID (`gh/nia`) is already
  published. DMV, Passport, Visa, and Business Formation remain open
  backlog per GOV-2695's parallel scouting pass.
- `jurisdiction.level` is `national` — GRA is Ghana's national revenue
  authority.
- `process.type` is `filing`, matching the form's own nature as an annual
  tax return.
- `process.language` is `en`: the form's full text layer is entirely in
  English, with no other language present anywhere in the extracted text.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the specimen has
not been silently replaced with a revised edition (this cycle's byte
count/hash both matched the pre-scouted figures exactly, so no drift has
occurred yet); (2) re-attempting the page-image render (with a fixed
pdfjs-dist/node-canvas combination or an alternative renderer) to visually
resolve the `isCertifiedByRegisteredTaxPractitioner` ambiguity; (3) whether
a future cycle wants to author Ghana's remaining open verticals (DMV,
Passport, Visa, Business Formation) as companion schemas.
