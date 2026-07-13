# Verification record — `gh/orc/registration-of-a-subsidiary-business-name` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2704** (parent research
cycle **GOV-2695**, which scouted Ghana's 5 remaining open verticals in
parallel — Ghana opened as the 41st jurisdiction via **GOV-2510**, National
ID only, and **GOV-2697**/**GOV-2698** have since closed Taxes and Visa).
This schema **opens Ghana's Business Formation vertical**.

## Duplicate-concurrent-run check

Before authoring, checked `gh pr list --state all --search "gh/orc"` and
`git branch -a | grep -i orc` — neither found an existing `gh/orc` PR or
branch, so no reconciliation was needed this cycle.

## Source verification (independently re-derived, not copied from the task briefing)

- Re-confirmed the live linkage rather than trusting the task briefing's
  pre-scouted URL verbatim: fetched `https://orc.gov.gh/forms-fees/`
  directly (**HTTP 200** with a browser-like `User-Agent`; a plain `curl`
  without one returned HTTP 500) and grepped the returned HTML for the
  Subsidiary Business Names accordion's own link, finding exactly
  `Form-C.pdf` embedded under the "Subsidiary Business Name Registration" /
  "Subsidiary Business Names(SBN) Re-Registration Form C" listing.
- **PDF source:**
  `https://orc.dntsystems.net/wp-content/uploads/2025/08/Form-C.pdf` —
  fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **445,953 bytes**.
  - **`sha256`:**
    `15e0184521e6dd118dcafe226ce02ea3955b629b8a0189a72779a4e86f38efe4`
    (computed via `sha256sum` on the freshly-downloaded file).
  - Both the byte count and hash **independently match the task briefing's
    own pre-scouted figures exactly**, confirming the specimen has not
    changed since that scouting pass.

## PDF structure, independently confirmed via `pdfjs-dist` (legacy build)

- **3 pages**, a plain print-and-fill specimen: `getTextContent()` returned
  a full, clean, English-only text layer on every page, with no field-object
  metadata to read directly — confirmed, not assumed from the task
  briefing's own "not an AcroForm" characterization.
- Every text item's `(x, y)` transform was extracted and grouped by
  page/row/column to reconstruct the source's own lettered-section layout,
  sections **(A)** through **(L)**, and the Section (B) tick-box grid's
  4-column row structure, before modeling any field. The full per-page dump
  was read in full before modeling any field (this repo's convention is to
  commit the resulting schema and fixtures, not the intermediate extraction
  transcript).

## Note on this cycle's working environment

This registry's shared checkout was repeatedly, mid-session, force-switched
onto sibling agents' own branches while this schema was being authored
(observed at least twice: onto `gov-2703-gh-mfa-passport-form`), which each
time reset `tools/govschema-client/registry-index.json` and `CATALOG.md` to
a different agent's own in-progress state and deleted this schema's
then-untracked `registry/gh/orc/`/`conformance/gh/orc/` directories from the
working tree. Rather than continue racing that shared checkout, this
document was rebuilt from retained working notes/scripts inside a
dedicated, isolated git worktree (`worktree-gov-2704-gh-orc`, branched from
`origin/main`) and re-verified end to end there before this PR was opened —
no content changed as a result, only the environment in which it was
finished and committed.

## Scoping decision: Form C vs. Form A vs. BO1/constitution templates

The task briefing flagged that ORC's primary one-person business-name
registration form ("Form A") is **not independently downloadable** — ORC's
own site directs applicants to pick one up in-house or at a bank, and its
"Download Resources" widget for Form A is empty. This was not
independently re-verified via a fresh fetch this cycle (the task briefing's
own prior-cycle scouting pass is treated as authoritative for that negative
finding, consistent with this registry's practice of not re-deriving every
already-settled negative from scratch when the positive candidate — Form C
— is itself independently re-verified). Form C (subsidiary/branch business
name registration, same Business Names Act, 1962, Act 151 regime) is
modeled here as the closest genuinely downloadable specimen. **This schema
does NOT cover primary/first business-name registration** — disclosed here
and in `schema.json`'s own top-level `description` as an open gap, not
silently conflated, matching this registry's established out-of-scope
disclosure precedent (e.g. `gh/gis`'s Re-Entry-Visa-vs-first-time-e-Visa
distinction, `rw/dgie`, `uy/mrree`).

The BO1 beneficial-ownership form and constitution templates at the same
asset host were considered as alternates per the task briefing's own
suggestion, but not used: Form C is the direct Business-Names-Act
registration document and best matches this registry's Business Formation
vertical convention as established by `ke/brs/cr1-application-to-register-a-company`
and `bd/roc/declaration-on-registration-of-company-form-i`.

## Field-scoping judgment calls

- **Section (B) — 27-item sector tick-box grid, no multi-select/labelled-option
  member in v0.3.** The form prints "Choose your sector by ticking the box
  next to it" over a 4-column grid of 27 distinct sector labels (Legal,
  Agriculture, Estate/Housing, Media, Transport/Aerospace, etc.) plus an
  "Others (Please Specify)" escape hatch. GovSchema v0.3's field model is
  flat, with no nested-array or labelled-enum-option member (SPEC v0.3 §6.1;
  labelled enum options are tracked separately as GSP-0003, not folded into
  this cut). Each sector is therefore modeled as its own boolean field
  (`sectorLegal`, `sectorAgriculture`, `sectorEstateHousing`, …), consistent
  with §6.1's own guidance that composite/multi-valued inputs are expressed
  as several flat fields rather than invented structure. `sectorOthers`
  (boolean) gates `otherSectorSpecify` (`requiredWhen sectorOthers=true`)
  for the form's own "if your sector is not listed, write your sector in
  the space provided for 'others'" instruction.
- **Disclosed specimen artifact: a duplicated "Estate/Housing" tick-box.**
  The grid's second column (row 1) prints "Estate/Housing", and its fourth
  column (row 2) prints the identical label "Estate/Housing" a second time
  — independently confirmed via the extracted `(x, y)` coordinates (`x=112.8
  y=440.6` vs. `x=316.1 y=426.3`, both reading `"Estate/Housing"` verbatim).
  This is modeled as a single `sectorEstateHousing` boolean field, with the
  specimen-level duplication disclosed on that field's own `description`
  rather than invented as two distinct sectors.
- **Section (E) gated by a same-as question.** "Is the Principal place of
  Business the same as the Registered Office Address? If Yes (Tick the box
  and proceed with other Place of Business) If No (Provide Details)" is
  modeled as `principalPlaceSameAsRegisteredAddress` (boolean, required),
  gating all six of Section (E)'s address fields via
  `requiredWhen: { field: "principalPlaceSameAsRegisteredAddress", equals:
  false }` — when the two addresses are the same, the form itself says to
  skip re-entering them.
- **Section (F) "Other Place of Business" is fully optional.** No field in
  this section carries an asterisk anywhere on the specimen, matching the
  sidebar instruction that only "businesses that have multiple operational
  locations must complete this section." Modeled with `required: false` and
  no `requiredWhen` gate (a genuinely optional supplementary section, not a
  conditionally-required one).
- **Section (I) MSME Details feeds a downstream classification table, not
  a field itself.** Page 3 prints ORC's own MSME classification reference
  table (Micro ≤US$25,000 / Small US$25,001–US$1,000,000 / Medium
  US$1,000,001–US$3,000,000 turnover or assets; Micro 1–5 / Small 6–30 /
  Medium 31–100 employees). This table is ORC's own downstream
  classification logic applied to `revenueEnvisaged` and
  `numberOfEmployeesEnvisaged` — not itself applicant-entered data — and is
  described in those two fields' own `description` rather than modeled as
  a field or enum.
- **Section (J) BOP request modeled as a single enum.** The three
  mutually-exclusive tick-one options ("Apply for BOP Now" / "Apply for BOP
  Later" / "Already have a BOP") are modeled as `bopRequestOption` (enum:
  `apply-now` / `apply-later` / `already-have`), gating `bopReferenceNumber`
  via `requiredWhen equals "already-have"`, matching the form's own
  "Provide BOP Reference No." follow-up line.
- **Exclusions — staff-populated and physical-artifact fields, consistent
  with `gh/nia`/`gh/gis` precedent.** Section (L), "For Office Use Only"
  (date of submission, company inspector name, filing date, staff
  signature), is excluded in full as staff-populated. Within Section (K)'s
  Declaration, the "Stamp / Seal of the parent Company" and "Signature"
  lines are excluded as physical artifacts. No verbatim declaration
  statement is printed anywhere on the specimen for these to anchor an
  `attestation`-category `documents[]` entry (SPEC §9.1's `statement`
  member requires exact, source-verbatim text) — the section carries only
  its header, "DECLARATION(Director/Secretary)", and three identification
  fields (TIN, Ghana Card number, name), all of which are modeled
  (`declarantTin`, `declarantGhanaCardNumber`, `declarantName`).
- **Page 3 is informational only, except one checklist line.** Page 3
  ("Important Information") carries the MSME classification reference
  table, a privacy notice, annual-renewal/change-notice guidance, and a
  filer-facing self-verification checklist ("The document has been signed
  at all indicated places", etc.) — none of it applicant-entered data,
  except "Filled TIN Form(s), if any", modeled as the schema's one
  `documents[]` entry (`supporting-evidence`, `required: false`, matching
  the checklist's own "if any" qualifier).
- **Corporate-parent identification fields carry no asterisk despite
  semantic centrality.** `parentCompanyCorporateName`,
  `parentCompanyRegistrationNumber`, and `parentCompanyTin` are printed
  directly beneath "Business Name*" in Section (A) with no asterisk of
  their own on the specimen, even though this form exists specifically to
  register a *subsidiary* of a parent company. Modeled as printed
  (`required: false`) rather than inferring a requirement the source itself
  does not mark.
- **`dateOfCommencement` carries no asterisk.** Printed as a D-D-M-M-Y-Y-Y-Y
  box grid between Sections (C) and (D) with no asterisk visible in the
  extracted text, modeled as `required: false`.

## Test run (conformance fixtures)

No live submission was attempted: ORC's Form C is a printed, hand-completed
specimen submitted in person, not a portal accepting programmatic
submissions.

Two independent worked mock records were built from this document's own
field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the pattern established by `gh/gis` and
`gh/gra`): compiles `schema.json`'s `fields[]` into a JSON Schema document
checked with `ajv` (+ `ajv-formats` for `date`), plus a from-scratch
evaluator for `requiredWhen`/`documents[]` conditional requiredness.

```
$ node validate_instance.mjs schema.json subsidiary-single-location-agriculture-trading.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS

$ node validate_instance.mjs schema.json subsidiary-multi-location-logistics-existing-bop.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS
```

**Mutation controls** — seven negative fixtures, each raising exactly one error:

```
$ # mutation-control-missing-required-field.json: 'businessName' (required: true) removed
 - (root) must have required property 'businessName'
OVERALL: FAIL

$ # mutation-control-invalid-date-format.json: 'dateOfCommencement' set to 'not-a-date'
 - /dateOfCommencement must match format "date"
OVERALL: FAIL

$ # mutation-control-invalid-enum-value.json: 'postalAddressType' set to 'courier' (not in enum)
 - /postalAddressType must be equal to one of the allowed values
OVERALL: FAIL

$ # mutation-control-email-pattern-violation.json: 'emailAddress' set to 'not-an-email'
 - /emailAddress must match pattern "^[^@\s]+@[^@\s]+\.[^@\s]+$"
OVERALL: FAIL

$ # mutation-control-missing-conditional-bop-reference.json: 'bopReferenceNumber' removed while bopRequestOption='already-have'
 - field 'bopReferenceNumber' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-missing-conditional-registered-address.json: 'registeredAddressRegion' removed while principalPlaceSameAsRegisteredAddress=false
 - field 'registeredAddressRegion' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-missing-conditional-other-sector-specify.json: 'otherSectorSpecify' removed while sectorOthers=true
 - field 'otherSectorSpecify' is required (requiredWhen matched) but not provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass clean:

```
$ node tools/validate.mjs registry/gh/orc/registration-of-a-subsidiary-business-name/1.0.0/schema.json
ok   registry/gh/orc/registration-of-a-subsidiary-business-name/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/orc/registration-of-a-subsidiary-business-name/1.0.0/schema.json
ok   registry/gh/orc/registration-of-a-subsidiary-business-name/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Ghana's other open verticals

Ghana now stands at 4 of 6 verticals (National ID & Civic Documents, Taxes,
Visa, Business Formation). Passport and DMV remain open backlog for future
cycles.
