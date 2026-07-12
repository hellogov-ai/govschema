# Verification record — `ng/firs/fct-irs-personal-income-tax-return-form-a` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2553**. It closes **Nigeria's
Taxes vertical (2 of 6)**, via FCT-IRS's "Form A", the Personal Income Tax
Return Form for the Federal Capital Territory. Nigeria opened this registry's
42nd jurisdiction via GOV-2518 (Business Formation, CAC Form 1.1); Passport,
DMV, Visa, and National ID remain open, unscreened backlog for Nigeria after
this cycle.

## Jurisdiction scoping: why FCT, not "Nigeria" nationally

Nigerian personal income tax is administered **state by state**: each of the
36 states plus the Federal Capital Territory operates its own State/Territory
Internal Revenue Service under the nationally-standardized Personal Income
Tax Act (PITA) framework, and each publishes its own edition of the
PITA-mandated "Form A" (or an equivalent). This schema is deliberately scoped
to `jurisdiction.level: subnational`, `jurisdiction.subdivision: NG-FC`
(ISO 3166-2 for the Federal Capital Territory) rather than asserted as a
single national form — the same class of scoping decision this registry has
made for other sub-national tax administrations. A future cycle could add
sibling editions for other Nigerian states' own Form A/equivalent, following
this document's own field inventory as a starting template (the underlying
PITA-mandated data items are expected to be materially the same across
states, though this was not independently confirmed against any other
state's own specimen this cycle).

## Sources examined

### Source 1 — the FCT-IRS Form A PDF (chosen as `source.url`)

- **URL:** <https://fctirs.gov.ng/wp-content/uploads/Personal-Income-Tax-Return-Form-A.pdf>
- Independently re-fetched this cycle via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **323,404 bytes**,
  `Last-Modified: Thu, 09 Oct 2025 ...` (2025-10-09), **sha256:
  5062478b44c42c94524d773691e0903d2328640a9d5f3a252475c094a3bd324d** — this
  matches the assigned task's own citation exactly, corroborated
  independently rather than trusted on the citation's word alone.
- `pdfjs-dist` (legacy build) `getDocument()`/`getAnnotations()` confirms a
  genuine 2-page PDF with **0 Widget annotations on either page** — a flat,
  print-and-hand-fill specimen, the same tier this registry has already
  modeled for `rw/dgie/visa-application`, `pe/sunat/formulario-virtual-709-declaracion-renta`,
  `uy/dgi/inscripcion-actualizacion-empresas-formulario-0351`, and
  `ke/brs/cr1-application-to-register-a-company`.
- `node tools/verify-sources.mjs registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0`
  ran clean this cycle (1 directory, 3 URLs checked, 0 warnings, 0
  allowlisted) — `fctirs.gov.ng` resolves cleanly via Node's `fetch()`, no
  TLS override or allowlist entry needed (unlike, e.g., `kra.go.ke`'s
  documented apex-certificate mismatch).

### Source 2 — `pdfjs-dist` text-layer extraction (own re-derivation)

`getTextContent()` was read on both pages, items grouped by rounded
`transform` y-coordinate and sorted by x, to reconstruct each printed row in
reading order (a disposable `extract2.mjs`, not committed — see the excerpt
below). This is the technique this registry has used for every other
0-widget flat form, since there are no AcroForm field names to source from.

A full-text scan of both pages' extracted text found **zero asterisk (`*`)
characters used as a required-field marker anywhere in Parts A-D** (the
guide notes on page 2 use two literal asterisks, but only inside prose
describing employer-paid domestic-servant/benefit annotation conventions —
`"should be asterisked (*)"` — not as a per-field required-marker on Parts
A-D themselves). This is a materially different situation from `ng/cac`'s
specimen (which prints visible asterisks that the authoritative source
turned out not to honor either) — here there is **no** required-field
marking convention on the specimen at all, disclosed as the basis for this
schema's own requiredness judgment calls (see "Requiredness policy" below).

### Source 3 — `pdfjs-dist` + `node-canvas` rendering (table-geometry cross-check only)

Both pages were rendered to PNG at 2.5x-4x scale via `page.render()`. This
rendering surfaced a **font-rendering defect** in the specimen's embedded
bold typeface: `pdfjs-dist`/`node-canvas` repeatedly logged
`getPathGenerator - ignoring character` and `TT: undefined function: 32`
warnings, and the resulting PNGs show every bold-styled caption (e.g. "PART
A: PERSONAL DETAILS", "First Name", section letters/headers) as **invisible
blank space**, while regular/italic-styled text (guide notes, parenthetical
instructions) renders correctly. This means the rendered PNGs could **not**
be used to read captions — only to read vector-drawn table/ruling geometry
(row and column counts), cross-checked against the position-sorted text dump
from Source 2 for every actual label. This defect is disclosed here because
it materially shaped this cycle's method: table row counts for the two
tables whose header captions are affected by this defect (domestic
servants, Part D allowances) were confirmed via rendered ruling-line geometry
rather than by reading a rendered caption directly.

Concretely:

- The **children table** (4 numbered rows: "1"/"2"/"3"/"4") was confirmed
  directly from the text dump (each row's leading digit is regular-weight
  and renders/extracts fine) — no rendering cross-check needed.
- The **vehicles table** (2 "Date of Purchase .../Cost N/Brand/Model/Year"
  rows) was confirmed two independent ways: the text dump shows the exact
  same row of column captions printed twice in sequence (once per vehicle
  slot), *and* the rendered PNG's ruled-line geometry shows exactly 2 rows
  of 7 column-segments (day/month/year sub-boxes plus Cost/Brand/Model/Year)
  in the affected region.
- The **domestic-servants table** ("Name"/"Residential Address"/"Amount
  Paid") and the **Part D allowances table** ("Name of Company"/"Whether on
  life of Self or Spouse"/"Capital sum paid on death"/"Premiums Paid") both
  have bold captions invisible under the rendering defect; their row counts
  (2 each) were read directly from the rendered vector ruling-line geometry
  (crops inspected directly, not inferred from a naming pattern), each
  showing an outer bordered box containing exactly 2 grid/ruled body rows
  beneath the (invisible) header row. Both tables are modeled as bounded
  2-slot repeating groups (`domesticServant1/2*`, `lifeAssurancePolicy1/2*`)
  accordingly.

## Field inventory and scoping/disclosure decisions

1. **Part A (Personal Details) — 6 fields.** `firstName`/`surname` required,
   `middleName` optional (no "none" indicator on the form, and not every
   filer has one); `fctIrsTin`/`emailAddress`/`contactTelephoneNumbers`
   required as basic identity/contact information FCT-IRS needs to process
   and correspond about the return.
2. **Part B (Statement of Income) — 16 fields, all `required: true` with a
   `minimum: 0`.** This specimen carries **zero** asterisks or any other
   field-level required-marking convention anywhere in its text (confirmed
   by the full-text scan in Source 2 above) — a genuine absence, not a
   discrepancy like `ng/cac`'s unused-asterisk finding. Given that absence,
   this schema's disclosed judgment call is: every Part B income-statement
   line, plus the two aggregate subtotal lines and the grand total, is
   modeled required with a `0`-permitting `minimum`, on the basis that a
   filer with none of a given income type still enters `0` on that line
   rather than leaving the return incomplete — the same convention this
   registry used for `ke/kra/it1-individual-resident-return`'s per-employer
   income lines. This is a judgment call, disclosed rather than asserted as
   a literal instruction from the source.
3. **Disclosed printed-label discrepancy: `aggregateInvestmentIncome`.** The
   source's own printed label reads *"Aggregate Investment Income (iv - vii
   above) (Y)"*. But item (iv) ("Income received in or brought into Nigeria
   from all sources outside Nigeria") is already one of the four items
   summed into the immediately preceding *"Aggregate Earned Income (i-iv
   above) (X)"* line — so a second aggregate line cannot also be summing
   item (iv) into a *different* total without double-counting it. The only
   numerically consistent reading is that the "Y" aggregate is meant to sum
   items **(v) through (viii)** (dividends, interest, rents, other
   profits) — the four items actually printed between the two aggregate
   lines. This schema's `aggregateInvestmentIncome` field is modeled as
   that (v)-(viii) sum, with the source's own printed range quoted verbatim
   in the field's `description` rather than silently corrected or
   re-typeset. Both conformance fixtures compute `aggregateInvestmentIncome`
   as `dividendsFromNigerianCompanies + dividendsFromOutsideCountry +
   interestIncome + rentsIncome + otherProfitsIncome` for consistency with
   this reading (`otherProfitsIncome` is item (viii); `rentsIncome` is (vii);
   both included).
4. **Spouse/children block — 25 fields, all `required: false`, no
   `requiredWhen` gate.** The block sits under the plain instruction "If
   Married, State Spouse's and Children's details" with **no** separate
   Marital Status checkbox/enum field anywhere on this specimen to
   machine-gate against (a contrast with, e.g., `rw/dgie/visa-application`'s
   dedicated tick-box, which this schema's own `requiredWhen` convention
   depends on). Per this registry's `ng/cac` Section D/D1 precedent — do
   not fabricate a synthetic gating field with no corresponding printed
   widget/blank just to make a `requiredWhen` expressible — these 25 fields
   (`spouseFullName` through `child4SchoolFees`) are modeled plain-optional,
   disclosed here rather than silently gated on an invented field. This also
   sidesteps this registry's own documented `notEquals ""`-against-an-
   absent-optional-field bug class entirely, since no conditional gate is
   constructed here in the first place.
5. **Children table bounded to 4 slots.** Per the assigned task's own
   explicit instruction and independently confirmed from the printed
   table's 4 numbered rows (1-4) — no synthetic cap invented.
6. **Part C (Benefits in Kind).** `residentialAddressAsAt1January` is
   modeled `required: true` (every filer has a residence as at 1 January of
   the return year, unlike the remaining, genuinely conditional items in
   this Part); `residentialAddressChangesDuringYear`,
   `rentPaid`/`rentPaidByEmployer`/`rentPaidOrReimbursedByApplicant`, the
   2-slot `domesticServant1/2*` table, the 2-slot `vehicle1/2*` table, and
   the 2-slot `otherBenefitInKind1/2*` table are all modeled optional — Part
   C as a whole only applies to a filer who actually receives one or more
   of these employer-provided benefits.
7. **Domestic servants and vehicles bounded to 2 slots each** — see Source 3
   above for how each row count was confirmed despite the font-rendering
   defect hiding the affected header captions.
8. **`vehicle{N}Year` modeled `type: integer`, `minimum: 1900`/`maximum:
   2100`**, matching this registry's `rw/rra/vrf-e06-motor-vehicle-registration-form`
   precedent for an analogous "vehicle model/manufacture year" field,
   distinct from `vehicle{N}DateOfPurchase` (a full day/month/year date).
9. **Part D (Allowances for Life Assurance, Gratuities, NHIS and Pension
   Contribution) bounded to 2 slots**, all fields optional (only applies to
   a filer with a policy/contribution to declare).
   `lifeAssurancePolicy{N}LifeOfSelfOrSpouse` is modeled as a 2-value enum
   (`self`/`spouse`) directly from the printed "Whether on life of Self or
   Spouse" column caption — not an invented value set.
10. **Declaration — 2 fields.** `declarantFullName` (the blank in "I
    ________ hereby declare...") and `declarationDate` are modeled required
    (a return cannot be validly declared without them); the "(Signature/Thumb
    print of Returnee)" line itself is excluded, per this registry's
    established signature-capture convention (cf. `ng/cac`'s two excluded
    "Signature:" boxes, `rw/dgie`'s excluded signature line). `declarationDate`
    is modeled `type: date` even though printed as a sentence with day/
    "Day of"/year blanks rather than boxed D/M/Y fields, since it is
    unambiguous chronological information — consistent with this registry's
    convention for date-of-signing items elsewhere (e.g. `rw/dgie`'s "Done
    at, on" block).
11. **`documents[]` — 8 entries**, sourced from this specimen's own
    parenthetical "Attach ..." instructions under items (i), (ii), (vi),
    (vii), (viii), the Part B closing note, and Part D's closing note, plus
    the declaration statement itself (`attestation`, `required: true` — the
    only unconditionally required document). The 6 conditional supporting-
    evidence entries (e.g. `accountsForTradeBusinessIncome`,
    `interestIncomeSourceList`) are each left `required: false` with the
    triggering condition disclosed via the entry's own `handling` prose
    rather than a fabricated `requiredWhen` against a `greaterThan 0`
    condition on a required-but-frequently-zero numeric field — such a
    condition would flag every zero-income return (the common case for most
    of these lines), which is not the intended business rule. This mirrors
    this registry's `ng/cac` precedent of disclosing a conditional-document
    trigger in prose when no clean boolean/enum field exists to gate a
    machine-checked `requiredWhen` on cleanly.

## Legal-currency and current-process check

A web search confirms the **Personal Income Tax Act (PITA), Cap. P8, Laws of
the Federation of Nigeria 2004** (as amended, most substantially by the
Personal Income Tax (Amendment) Act 2011) remains the governing statute for
individual income tax in Nigeria, with the **Nigeria Tax Act 2025** and
**Nigeria Tax Administration Act 2025** (both assented to in 2025, with a
2026 commencement) confirmed as a live, current legislative reform package
consolidating Nigeria's tax statutes going forward — disclosed here as
relevant context for a future review rather than independently reconciled
against this schema's own field-level scope, since none of PITA's specific
computational provisions (reliefs, bands, allowances) are modeled as fields
in this v1.0.0 (the source form itself does not print any computed tax
liability line, unlike, e.g., `ke/kra`'s workbook). A web search separately
confirms the **Federal Capital Territory Internal Revenue Service (FCT-IRS)**
— established under the **FCT Internal Revenue Service Act 2015** — is a
live, currently operating tax authority in 2026, distinct from the **Federal
Inland Revenue Service (FIRS)** (which administers companies income tax and
other federal taxes, not individual/personal income tax in the FCT).

## Conformance run (mock, worked examples)

Two hand-authored valid fixtures under
`conformance/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0/`:

- **`valid-single-employed-no-benefits.json`** — a single-employer, pure
  PAYE-employment filer with no non-employment income, no spouse/children
  declared, and no Part C/D benefits — every Part B line other than salary/
  allowances/aggregates/total is `0`, and the `declarationStatement`
  document is present.
- **`valid-married-with-children-and-benefits-in-kind.json`** — exercises
  the spouse block, both bounded children slots, employer-paid rent, one
  domestic-servant slot, one vehicle slot, and one Part D life-assurance
  policy slot, plus non-employment dividend/interest income and its own
  `aggregateInvestmentIncome` computed per the disclosed (v)-(viii) reading
  above; both the `declarationStatement` and (since Part D is used) the
  `lifeAssuranceCertificateOrReceipt` documents are present.

Both were checked with a from-scratch, disposable Node conformance checker
(`check_conformance.mjs`, not committed — implements `required`/
`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,minLength,
maxLength}` plus `documents[]` requiredness, directly from
`spec/v0.3/SPEC.md`'s own `Condition` grammar, not reused from any other
schema's checker):

```
$ node check_conformance.mjs schema.json \
    valid-single-employed-no-benefits.json \
    valid-married-with-children-and-benefits-in-kind.json
valid-single-employed-no-benefits.json: 0 error(s)
valid-married-with-children-and-benefits-in-kind.json: 0 error(s)
```

Four mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops `fctIrsTin`
  (static `required: true`) from the single-employed valid fixture.
- **`mutation-control-invalid-email-pattern.json`** — sets `emailAddress` to
  `"not-an-email-address"` on the single-employed valid fixture.
- **`mutation-control-invalid-enum-value.json`** — sets
  `lifeAssurancePolicy1LifeOfSelfOrSpouse` to `"child"` (not in the printed
  `self`/`spouse` option pair) on the married valid fixture.
- **`mutation-control-invalid-vehicle-year-range.json`** — sets
  `vehicle1Year` to `1750` (below the `minimum: 1900`) on the married valid
  fixture.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-invalid-email-pattern.json \
    mutation-control-invalid-enum-value.json \
    mutation-control-invalid-vehicle-year-range.json
mutation-control-missing-required-field.json: 1 error(s)
  - fctIrsTin: required but missing
mutation-control-invalid-email-pattern.json: 1 error(s)
  - emailAddress: PATTERN_VIOLATION ("not-an-email-address" does not match ^[^@\s]+@[^@\s]+\.[^@\s]+$)
mutation-control-invalid-enum-value.json: 1 error(s)
  - lifeAssurancePolicy1LifeOfSelfOrSpouse: ENUM_VIOLATION ("child" not in ["self","spouse"])
mutation-control-invalid-vehicle-year-range.json: 1 error(s)
  - vehicle1Year: RANGE_VIOLATION (1750 < minimum 1900)
```

All four negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error — no defects were found in the schema
itself during this authoring pass.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0/schema.json
ok   registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0/schema.json
ok   registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry re-run of both validators (`node tools/validate.mjs` /
`node tools/validate-ajv.mjs`, no path argument) after adding this document
passes at **384/384** (383 pre-existing + this one), confirming no
regression to any other schema.

`node tools/verify-sources.mjs registry/ng/firs/fct-irs-personal-income-tax-return-form-a/1.0.0`
ran clean this cycle: 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted.

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm ci --include=dev` then `npm run build-index`, per this registry's own
documented gotcha about a local `NODE_ENV=production` making a bare `npm ci`
skip dev dependencies) and now includes this document (384 entries total).

## Scope and jurisdiction notes

- This is Nigeria's Taxes vertical's first document, bringing Nigeria to
  **2 of 6 verticals** (Business Formation, Taxes). Passport, DMV, Visa, and
  National ID remain open, unscreened backlog for a future cycle.
- `jurisdiction.level` is `subnational` with `subdivision: NG-FC` — see
  "Jurisdiction scoping" above for why this is not modeled as a national
  form.
- `process.type` is `filing`, consistent with this registry's other annual
  individual income tax returns.
- `version` set to `1.0.0`: this document models the FCT-IRS Form A
  specimen in full (every printed Part/item); no companion schedule is
  disclosed as out-of-scope, since the source itself is a single
  self-contained 2-page form with no referenced sibling schedule.

## What was NOT fully resolved (disclosed, not silently guessed)

- The font-rendering defect (Source 3 above) meant two tables' header
  captions could not be read directly from a rendered image; their row
  counts were instead confirmed from vector ruling-line geometry, cross-
  checked against the position-sorted text dump's surrounding labels. This
  is disclosed as the method actually used, not silently smoothed over.
- Whether other Nigerian states' own Form A editions are field-for-field
  identical to this FCT edition was not independently confirmed this cycle
  (no other state's specimen was fetched) — flagged as a future companion-
  schedule opportunity, not asserted either way.
- The Nigeria Tax Act 2025/Nigeria Tax Administration Act 2025 reform
  package's eventual effect on PITA's specific computational provisions
  (reliefs, bands) was not reconciled field-by-field against this schema,
  since this form itself prints no computed-tax-liability line for those
  provisions to attach to.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) re-fetching the source to
confirm it remains live and unauthenticated, and re-checking whether a
newer edition has been published (`Last-Modified` was 2025-10-09 at this
cycle's fetch); (2) whether the Nigeria Tax Act 2025/Nigeria Tax
Administration Act 2025 package's 2026 commencement has changed FCT-IRS's
own Form A specimen; (3) scouting a second Nigerian state's own Form A/
equivalent as a sibling-jurisdiction companion candidate.
