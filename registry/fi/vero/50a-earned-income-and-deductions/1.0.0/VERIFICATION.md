# Verification record — fi/vero/50a-earned-income-and-deductions@1.0.0

## Candidate selection

This session's brief (GOV-2308, "GovSchema Standard Research") targeted
Finland's Taxes vertical directly rather than re-scanning CATALOG.md's
"Known Gaps & Opportunities" section from scratch: the candidate — Vero's
form 3023e, "50A – Earned income and deductions" — was already named as
CATALOG.md's own confirmed-strong Known Gaps item 7, flagged across three
prior cycles (GOV-2276, GOV-2292, GOV-2299) as a genuine, live,
unauthenticated fillable AcroForm PDF with a specific byte size, page
count, and widget count already recorded. No fresh scouting was needed;
this cycle picked the candidate up directly.

The GOV-2308 issue title itself describes this as closing "Finland's
Taxes vertical (5/6)". This is the vertical *count*, not the schema's own
field/widget figures, so it is disclosed here rather than in the
Extraction technique section below: Finland's registry entries prior to
this cycle covered exactly 3 of the 6 verticals (Visa, Business
Formation, National ID) — CATALOG.md's own GOV-2299 update states this
explicitly ("Finland now stands at 3 of 6 verticals ... DMV and Taxes
remain open"). Adding Taxes brings Finland to **4 of 6**, not 5 — the
issue title's "5/6" does not match this document's own arithmetic against
CATALOG.md's own prior figures, and is treated as a pre-filing error in
the issue text rather than followed. Passport is a separately-confirmed
dead end (Finland eliminated paper passport applications in 2006); only
DMV remains a genuinely open, unscreened candidate for this jurisdiction.

## Source

- **URL:** `https://www.vero.fi/contentassets/23a6d90331ae408e84959d44a99dc45d/3023ev25_ws.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `233,558` bytes — matching the issue's own pre-recorded figure exactly.
  Confirmed a genuine PDF (`%PDF-1.7` header), 4 pages, no login/CAPTCHA/
  WAF gate anywhere on `vero.fi`.
- **Edition:** the form's own footer prints "VEROH 3023e 1.2025" on every
  page — the currently live edition as of this cycle.
- The form is genuinely fillable and submittable on paper without any
  prior authentication; Vero's e-filing channel (MyTax) is the primary
  route for taxpayers who can authenticate, but this schema describes the
  paper/PDF specimen, which stands on its own as a citizen-facing form.

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.mjs` v4, installed fresh to a disposable
`/tmp` directory) was used for a two-pass extraction:

1. **Per-page `getAnnotations({ intent: 'display' })`**, cross-checked
   against a second run of **`getAnnotations()` with no intent filter**
   (identical result both ways), resolved every `/Widget` annotation's
   `fieldName`, `fieldType` (`Tx`/`Btn`), `radioButton`/`checkBox` flags,
   `exportValue`, `rect`, and `alternativeText` (tooltip): **135 raw
   widgets across 4 pages** (115 `Tx`, 20 `Btn`, 0 `Ch`) resolving to
   **126 unique field names**. This figure matches CATALOG.md's own
   separately-recorded pre-scout figure ("135 Widget/126 FT fields")
   exactly. It does **not** match the GOV-2308 issue text's own stated
   figure ("127 distinct field names / 141 widgets, 115 Tx + 17 Btn + 0
   Ch") — disclosed here rather than silently reconciled. Since this
   cycle's own count was independently reproduced twice against the exact
   same freshly-fetched, byte-size-matching PDF (with and without an
   intent filter), it is treated as authoritative for this schema.
   **3 of the 126 unique names are page-navigation/utility controls**
   ("Tulosta"/Print, "Sivulle 1"/To first page, "Tyhjenna"/Reset) —
   excluded as non-data-collecting UI chrome, leaving **123 substantive
   unique field names across 132 substantive widgets**. Unlike this
   registry's `fi/prh` precedent, these three controls appear only once,
   clustered at the bottom of page 4, not repeated per page.
2. **Per-page `getTextContent()`**, clustered into visual lines by
   y-coordinate, cross-referenced against each widget's own `rect` — used
   to identify the two repeated header widgets ("010", "053") that carry
   **no tooltip** on any page: a coordinate cross-reference against page
   2's header text confirmed "010" = "Personal identity code" and "053" =
   "Tax year" (both repeated on every page alongside "020"/"Your name",
   which does carry its own tooltip). This specimen's remaining
   AcroForm field names are largely numeric internal keys (e.g. "062",
   "600;1") with **self-documenting English `alternativeText` tooltips**
   on almost every substantive widget — only the two header fields above
   required coordinate decoding.

Every one of the 126 unique widget names was mapped to exactly one
`fields[]` entry via a disposable reconciliation script
(`/tmp/fi-vero-extract/mapping.mjs`, not committed) that asserts zero
unmapped widget names — the same exhaustive-accounting discipline
established by this registry's `fi/migri`, `fi/prh`, and `dk/erst`
cycles. The script confirmed **126/126 widget names mapped, 0 unmapped**,
consolidating to **92 `fields[]` entries** (cross-checked a second time by
diffing the reconciliation script's own key set against the authored
schema's `fields[].name` list: exact match, 0 missing, 0 extra) and **0
`documents[]` entries** (see below).

## Field consolidation

- **Repeated header widgets** ("020"/Your name, "010"/Personal identity
  code, "053"/Tax year): each is printed once per page (4 widgets sharing
  one field name) — a single logical field with multiple form-field
  widgets carrying one shared value, not four separate fields. Modelled
  as `fullName`, `personalIdentityCode`, `taxYear`.
- **Euro/cent amount splits**: every monetary amount on this form is
  printed as two adjacent boxes — a whole-euro box (e.g. "062") and a
  paired cents box with an `s` prefix (e.g. "s062") — **32 such pairs**
  across the form. Each pair is merged into **one `number` field**
  representing the combined decimal euro amount, per this registry's
  established split-widget consolidation convention (the same treatment
  `fi/prh` gave its 5-digit TOL industry code).
- **Two bounded repeating groups**, flattened by ordinal suffix per this
  registry's established convention (matching `dk/cpr`'s `entrantN`/
  `childN` precedent), since the source's own field names already carry
  a `;1`/`;2`/`;3` suffix:
  - **Wages, salaries, fees and compensation** (2 rows) →
    `wagesPayorId1`/`wagesPayorId2`, `wagesPayorName1`/`2`,
    `wagesIncomeType1`/`2`, `wagesGrossIncome1`/`2`,
    `wagesWithholdingTax1`/`2`, `wagesPensionContribution1`/`2`,
    `wagesUnemploymentContribution1`/`2` (7 fields × 2 rows = 14 fields).
  - **Custody of children outside Finland** (3 rows) →
    `childOutsideFinlandName1`-`3`, `childOutsideFinlandDateOfBirth1`-`3`,
    `childOutsideFinlandCustodyType1`-`3`,
    `childOutsideFinlandCustodyEndDate1`-`3` (4 fields × 3 rows = 12
    fields).
  - **Pensions** and **Benefits** each have only a **single** row on this
    specimen (no `;N` suffix on their own widget names) and are modelled
    without any row-numbering suffix accordingly.
- **Custody-type checkbox pairs** ("262;1"/"262;2"/"262;3"): each is two
  identically-named `Btn` widgets with distinct export values ("Joint
  custody "/"Sole custody "), **not** flagged `radioButton: true` at the
  PDF level (unlike this registry's `fi/dvv` precedent, where the
  equivalent checkbox groups genuinely were PDF radio fields) — but
  functionally a two-way mutually-exclusive choice given the shared field
  name. Modelled as one `enum` field per row
  (`childOutsideFinlandCustodyType1`-`3`, values `joint_custody`/
  `sole_custody`), the same checkbox-group-to-enum consolidation `fi/prh`
  used for its multi-way groups, disclosed here since the PDF-level radio
  flag itself is absent.
- **Disclosed source naming quirks** (not modelling artifacts):
  - The four child-support child-identity-code widgets are named
    inconsistently in the source's own AcroForm: the first is `"086,1"`
    (a **comma**) while the remaining three are `"086;2"`, `"086;3"`,
    `"086;4"` (semicolons). All four are flattened identically to
    `childSupportChildPersonalIdentityCode1`-`4`; the comma/semicolon
    inconsistency is a source artifact, disclosed rather than treated as
    a fourth, differently-structured field.
  - The "crediting of tax paid abroad on a pension" widget's own raw
    field name is the bare digit `"1"` (with cents companion `"s1"`) — a
    name with no semantic connection to its own tooltip, which fully
    describes the field ("I have paid tax abroad on a pension I have
    received from Finland..."). Modelled as `foreignTaxCreditOnFinnishPension`
    per the tooltip, not the field name.
  - The spousal-separation widget ("246") is a **text** (`Tx`) box
    directly beneath the sentence "My spouse and I have separated
    permanently during the tax year," not a checkbox paired with a
    separate date box. Modelled as a single optional `date` field
    (`spouseSeparationDate`) whose presence itself signals that the
    separation occurred, since the source provides only the one widget,
    not a boolean-plus-date pair.

## Judgment calls and disclosed quirks

- **No `documents[]` entries**: the form's own instructional text states
  verbatim, "Do not enclose any receipts or free-form clarifications with
  the form; place them somewhere for safekeeping. The Tax Administration
  will ask you for the receipts, if necessary." This is a structural fact
  about the source form, not an oversight — disclosed explicitly given
  this registry's own prior history of conformance checkers silently
  missing a `documents[]` blind spot on schemas that *do* have supporting-
  document requirements. This schema has genuinely none.
- **Amount representation**: unlike some other Nordic income-tax schemas
  in this registry (e.g. `dk/skattestyrelsen`, whose source form prints
  one box per amount and is modelled as a single `number` field), this
  specimen's amounts are genuinely split across two boxes each; the
  resulting single-`number`-field shape looks identical, but the
  consolidation step is a real structural collapse here, not a
  no-op — disclosed for that reason.
- **Car-benefit-reduction km fields**: the two reason checkboxes
  (`carBenefitReductionPrivateUse`, `carBenefitReductionOtherReason`) are
  followed by two km fields ("Private use (km)", "Work-related use
  (km)") that the source's own layout does not clearly gate to one
  checkbox specifically. Left ungated (no `requiredWhen`) rather than
  inventing an unstated one-to-one correspondence.
- **`taxYear`** modelled as `integer` with a `minimum`/`maximum` (2000/
  2100) sanity range rather than a strict pattern, per this registry's
  `ee/emta/income-tax-return-form-a` precedent for the same field name.
- **`crossFieldValidation`**: four `compare` rules (`greaterThanOrEqual`)
  confirm each of the four tax-at-source employment periods' end date is
  not before its own start date. Both fields in each pair are optional;
  per this registry's established convention (e.g. `ae/fta/vat-
  registration`'s license-date compare rule on an equally optional pair),
  the comparison is only meaningful — and only checked by a conforming
  consumer — when both sides of a given pair are actually present.
- **Widget/field-count discrepancy** (see Extraction technique above):
  this cycle's own fresh, twice-reproduced `pdfjs-dist` count (135
  widgets / 126 unique names / 115 Tx + 20 Btn) does not exactly match
  the GOV-2308 issue text's stated figure (141 widgets / 127 distinct
  names / 115 Tx + 17 Btn), though it matches CATALOG.md's own separately
  -recorded pre-scout figure ("135 Widget/126 FT fields") exactly. This
  schema is built from, and its numbers throughout this document refer
  to, this cycle's own independently-reproduced extraction.

## Mock conformance run

Two scenarios were built and checked against this schema's own
`required`/`requiredWhen`/`crossFieldValidation` grammar with a
from-scratch interpreter script (`/tmp/fi-vero-extract/conformance-
check.mjs`, not committed — walks `fields[]` and `crossFieldValidation[]`
directly against a candidate data object, rather than reusing any prior
cycle's own checker):

1. **`single-payor-minimal-required-only.json`** — a taxpayer filling
   only the 3 statically-`required: true` header fields (`fullName`,
   `personalIdentityCode`, `taxYear`), with no other section completed.
   **0 errors.**
2. **`full-coverage-multi-income-and-deductions.json`** — a taxpayer with
   two wages payors, a reduced car benefit, a pension, a benefit, other
   earned income, income spreading, all three special-tax-deduction
   grounds (each with its conditionally-required cost), a YEL
   contribution, a labour-organisation fee, all five wage-income
   expenses, both non-wage-income expense lines, a donation, a repayment
   deduction, child support for two children, a full set of
   international-situation elections (non-resident tax treaty request,
   A1 certificate, two tax-at-source employment periods, total workdays,
   a foreign pension tax credit), two children with custody outside
   Finland (one joint, one sole custody), a permanent spousal separation
   date, and the signature block — exercising all three
   `requiredWhen`-gated cost fields and all four `crossFieldValidation`
   compare rules. **0 errors.**

**5 mutation controls**, each expected to raise exactly 1 error, all
confirmed:

- Dropping `fullName` (statically required) from scenario 1 → 1 error
  (`MISSING REQUIRED FIELD: fullName`).
- Dropping `taxYear` (statically required) from scenario 1 → 1 error
  (`MISSING REQUIRED FIELD: taxYear`).
- Setting `specialDeductionIllness: true` while omitting
  `specialDeductionIllnessCost` in scenario 2 → 1 error (`MISSING
  REQUIRED FIELD: specialDeductionIllnessCost`).
- Setting `specialDeductionChildDevelopmentalDisorder: true` while
  omitting `specialDeductionChildDevelopmentalDisorderCost` in scenario 2
  → 1 error (`MISSING REQUIRED FIELD:
  specialDeductionChildDevelopmentalDisorderCost`).
- Reversing `taxAtSourceEmploymentPeriod1Start`/`...1End` in scenario 2
  (end date set before start date) → 1 error (`CROSS-FIELD VIOLATION:
  taxAtSourceEmploymentPeriod1EndNotBeforeStart`).

The checker script additionally walks every `visibleWhen`/`requiredWhen`/
`crossFieldValidation` field reference in the document and confirms each
resolves to a real `fields[]` entry (**0 dangling references**).

## Validation

`node tools/validate.mjs registry/fi/vero/50a-earned-income-and-deductions/1.0.0/schema.json`
and `node tools/validate-ajv.mjs` (same path) both pass individually and
as part of a full-registry run from a clean checkout of this branch.
