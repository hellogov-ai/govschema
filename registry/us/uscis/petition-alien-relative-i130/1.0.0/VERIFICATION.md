# Verification record — `us/uscis/petition-alien-relative-i130` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.

## Why this candidate was advanced now

`us/uscis/petition-alien-relative-i130` is GOV-664 plan §2 item F1.4 —
priority-ordered federal immigration authoring, alongside the same wave's
other USCIS candidates (N-400, I-765, I-485, I-131). It is the
relationship-establishing petition that gates `us/uscis/adjustment-of-status-i485`
in the two-step "petition, then adjust status" agent story (I-130 approval, or
a concurrently-filed I-130/I-485 package, precedes I-485 for an
immediate-relative beneficiary already in the United States).

## Sources examined

- **Document `(id, version)`:** `us/uscis/petition-alien-relative-i130` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/i-130>
- **Official form id:** `Form I-130 (Edition 04/01/24)`
- **Form PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf>
  — fetched directly over HTTPS with a browser user agent (a plain unauthenticated
  `curl` to `www.uscis.gov` without a user agent returns HTTP 403; adding one
  succeeds, matching the WAF behavior already documented for other USCIS forms
  in this registry). Parsed with `pdfjs-dist`'s `getFieldObjects()` (AcroForm/XFA
  field inventory, including checkbox/radio `exportValues`) and `getTextContent()`
  per page (12 pages), and cross-checked against
  **Instructions for Form I-130** (<https://www.uscis.gov/sites/default/files/document/forms/i-130instr.pdf>,
  11 pages, plain text) for eligibility rules, item-by-item guidance (Parts 3,
  6, 7, 8), and confirmation that Form I-130A (Supplemental Information for a
  Spouse Beneficiary) is a companion form, not part of this document.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A relationship petition is a one-time filing per beneficiary, triggered by the
existence of a qualifying family relationship — applying the GSP-0005 §2
coexistence test, there is no scenario where two editions of the I-130 data
model need to coexist for the same petitioner/beneficiary pair. This document
is therefore authored at the plain (non-edition) registry path,
`registry/us/uscis/petition-alien-relative-i130/1.0.0/`. A future form revision
(the form itself is dated per edition, e.g. "04/01/24") that changes the field
set ships as a new `version`, not an edition.

## A known AcroForm field-numbering quirk

The extracted PDF's internal AcroForm field names (e.g. `Pt4Line56_*`,
`Part4Line1_Yes`) do **not** consistently align 1:1 with the form's printed
Part/item numbers — a revision evidently inserted or renumbered printed items
without renaming the underlying AcroForm fields, a quirk already observed on
other USCIS forms in this registry (see the I-90 VERIFICATION.md height/weight
note). `sourceRef` values in this schema cite the **printed** Part/item numbers
(what a human or an agent reading the rendered PDF sees), reconstructed by
correlating each internal field's page-text position with its checkbox/radio
`exportValues`, not the raw internal field names.

## Scope decisions

Form I-130 covers two natural persons in full (the petitioner and the
beneficiary) plus a relationship-history section, an interpreter, and a
preparer — by far the largest field set of any process modeled in this
registry to date. The following simplifications keep the document focused on
the fields that gate eligibility, identity, and the I-485/consular-processing
routing decision, consistent with how prior documents in this registry (e.g.
`us/irs/individual-income-tax-return-1040`'s single modeled `dependent1*`
slot against the paper form's four) have handled genuinely bounded
multi-slot sections:

- **Part 9 (Additional Information)** is an open-ended continuation space for
  overflow answers from any other part; out of scope, the same treatment given
  to equivalent continuation sections elsewhere in this registry (e.g. Form
  I-90 Part 8).
- **Prior-spouse history** (petitioner items 20-23, beneficiary items 21-24)
  models the current/most-recent spouse only (`petitionerSpouse1*`,
  `beneficiarySpouse1*`); the form's second historical-spouse slot is out of
  scope.
- **"Information About Beneficiary's Family"** (items 25-44) provides five
  fixed person slots; this document models Person 1 only
  (`beneficiaryFamilyPerson1*`); Persons 2-5 are out of scope.
- **"Other relatives you are also filing for"** (items 6-9) provides two
  relative slots; this document models Relative 1 only (`relative1*`);
  Relative 2 is out of scope.
- **Petitioner's 5-year physical-address history** (items 12-15) provides two
  dated address slots; this document models the current physical address only
  (`petitionerPhysicalAddress*`, gated on `petitionerMailingSameAsPhysical`);
  the second (older) historical address and both slots' date ranges are out of
  scope.
- **Petitioner's and beneficiary's 5-year employment history** (petitioner
  items 42-49, beneficiary items 51-52) is out of scope entirely — it is
  supporting evidentiary context, not eligibility-gating data, and no other
  field's visibility/requiredness depends on it.
- **Petitioner's parents** (items 24-35) are modeled at reduced granularity
  (`petitionerParent1FamilyName`/`GivenName`/`MiddleName`/`DateOfBirth`/
  `CountryOfBirth`, and the same five for Parent 2) — sex and current
  city/country of residence are out of scope.
- **`petitionerRace`** (Part 3, "select all applicable boxes") is modeled as a
  single string field documented to hold a comma-separated list of the five
  source category values, rather than an array type — the same treatment used
  for Form I-90's equivalent field, since v0.3 has no native multi-select field
  type (tracked alongside [GSP-0009](../../../../../spec/proposals/0009-composite-repeating-values.md)).
- **Mutually exclusive Part 4 item 61/62 selection** ("select only 1 option to
  indicate adjustment of status or consular processing," per the form's own
  instructions banner) is modeled as a single `beneficiaryApplicationType` enum
  field (`adjustment_of_status` | `consular_processing`) with the office/post
  location fields gated by GSP-0013 `requiredWhen`, rather than as two raw
  independent Yes/No checkboxes — this is a structural interpretation of the
  source's explicit business rule, not a literal 1:1 field transcription.

Unlike the v0.2-authored `us/uscis/permanent-resident-card-replacement-i90`,
this document is authored directly against v0.3 and uses GSP-0013
`requiredWhen` throughout (interpreter/preparer sub-fields, citizenship-basis
branching, marital-status-gated fields, the adjustment-of-status/consular
selector) instead of prose-only conditional notes.

## What was confirmed against the source

- **Process identity.** Confirmed Form I-130 (Edition 04/01/24) is the current
  USCIS form for establishing a qualifying family relationship for
  immigration purposes, distinct from Form I-130A (a companion form for a
  spouse beneficiary, referenced but not modeled — same treatment as this
  registry gives Form G-28 in `us/uscis/permanent-resident-card-replacement-i90`),
  Form I-485 (adjustment of status, the downstream filing this petition
  gates), and Form I-90 (Green Card renewal for an existing permanent
  resident, not a relationship petition).
- **Full section-by-section field set**, transcribed field-by-field from the
  decoded PDF text and cross-checked against the checkbox/radio
  `exportValues` inventory: Part 1 relationship type and its
  child/parent/sibling sub-branches; Part 2 petitioner identity, A-Number,
  other names, mailing/physical address, marital history, parents, and the
  U.S.-citizen/lawful-permanent-resident branch with certificate and
  admission sub-fields; Part 3 petitioner biographic information (ethnicity,
  race, height, weight, eye color, hair color); Part 4 beneficiary identity,
  addresses, contact information, marital history, family, U.S. entry and
  immigration-proceedings history, passport/travel-document information, the
  native-written-language name/address fields, the spousal
  last-address-together fields, and the adjustment-of-status/consular-post
  routing fields; Part 5 prior-petition and other-relative disclosures; Part 6
  petitioner's statement, contact information, and signature; Part 7
  interpreter's contact information and signature; Part 8 preparer's contact
  information, attorney/accredited-representative branch, and signature.
- **Eligibility framing** from the Instructions document: who may/may not file
  (spouse, parent, sibling, child categories; the adoption, stepparent, and
  prior-marriage restrictions); the two-photo and I-130A requirements for
  spouse beneficiaries; the derivative-beneficiary treatment of a listed
  beneficiary's spouse/children under Items 4-5 of "Who May File."

## Mock-data test run

Per the issue's instruction to test-run the schema with valid mock data, a
representative filled-out petition was authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`validation` constraint in
`schema.json` (string length, regex pattern, enum membership, integer
minimum/maximum, date format, boolean type, and effective requiredness
computed from the GSP-0013 `Condition` grammar):

```json
{
  "relationshipToBeneficiary": "spouse",
  "petitionerGainedStatusThroughAdoption": false,
  "petitionerFamilyName": "Alvarez",
  "petitionerGivenName": "Marco",
  "petitionerCityOfBirth": "Tampa",
  "petitionerCountryOfBirth": "United States",
  "petitionerDateOfBirth": "1988-04-12",
  "petitionerSex": "male",
  "petitionerMailingAddressLine1": "455 Bayshore Blvd",
  "petitionerMailingAddressCity": "Tampa",
  "petitionerMailingAddressState": "FL",
  "petitionerMailingAddressZipCode": "33606",
  "petitionerMailingAddressCountry": "United States",
  "petitionerMailingSameAsPhysical": true,
  "petitionerCurrentMaritalStatus": "married",
  "petitionerDateOfCurrentMarriage": "2024-06-01",
  "petitionerCitizenshipBasis": "us_citizen",
  "petitionerCitizenshipAcquiredThrough": "birth_in_us",
  "petitionerHasCertificateOfNaturalizationOrCitizenship": false,
  "petitionerEthnicity": "not_hispanic_or_latino",
  "petitionerRace": "white",
  "petitionerHeightFeet": 5,
  "petitionerHeightInches": 11,
  "petitionerWeightPounds": 180,
  "petitionerEyeColor": "brown",
  "petitionerHairColor": "black",
  "beneficiaryFamilyName": "Alvarez",
  "beneficiaryGivenName": "Elena",
  "beneficiaryCityOfBirth": "Guadalajara",
  "beneficiaryCountryOfBirth": "Mexico",
  "beneficiaryDateOfBirth": "1990-09-23",
  "beneficiarySex": "female",
  "beneficiaryEverFiledForByOthers": "no",
  "beneficiaryPhysicalAddressLine1": "455 Bayshore Blvd",
  "beneficiaryPhysicalAddressCity": "Tampa",
  "beneficiaryPhysicalAddressState": "FL",
  "beneficiaryPhysicalAddressZipCode": "33606",
  "beneficiaryPhysicalAddressCountry": "United States",
  "beneficiaryCurrentMaritalStatus": "married",
  "beneficiaryDateOfCurrentMarriage": "2024-06-01",
  "beneficiaryEverInUs": true,
  "beneficiaryClassOfAdmission": "B2",
  "beneficiaryI94Number": "12345678901",
  "beneficiaryDateOfArrival": "2023-01-15",
  "beneficiaryAuthorizedStayExpirationDate": "2023-07-14",
  "beneficiaryEverInImmigrationProceedings": false,
  "beneficiaryLastAddressTogetherLine1": "455 Bayshore Blvd",
  "beneficiaryLastAddressTogetherCity": "Tampa",
  "beneficiaryLastAddressTogetherState": "FL",
  "beneficiaryLastAddressTogetherCountry": "United States",
  "beneficiaryLastAddressTogetherDateFrom": "2023-06-01",
  "beneficiaryLastAddressTogetherDateTo": "PRESENT",
  "beneficiaryApplicationType": "adjustment_of_status",
  "beneficiaryAdjustmentOfStatusUscisOfficeCity": "Tampa",
  "beneficiaryAdjustmentOfStatusUscisOfficeState": "FL",
  "petitionerEverFiledPetitionForBeneficiaryOrOtherAlien": false,
  "petitionerCanReadEnglish": true,
  "petitionerUsedInterpreter": false,
  "petitionerUsedPreparer": false,
  "petitionerDaytimePhoneNumber": "+18135550142",
  "petitionerSignatureDate": "2026-07-02"
}
```

This models Marco Alvarez, a U.S. citizen petitioning for his spouse Elena
Alvarez, a Mexican national already in the United States on a B-2 visitor visa
who will seek adjustment of status at the Tampa USCIS field office (exercising
the `beneficiaryApplicationType: adjustment_of_status` branch and its
`requiredWhen`-gated office fields), with no interpreter or preparer used
(exercising the `petitionerCanReadEnglish: true` path) and no prior petitions
filed for any other alien. A one-off Node script (`node:fs` + a hand-rolled
per-field validator that also evaluates each field's `requiredWhen`/`required`
via the GSP-0013 `Condition` grammar) confirmed every populated field satisfies
its `type`/`validation` constraint and that every field whose *effective*
requiredness evaluates to true under this scenario was populated:

```
PASS — mock spousal I-130 petition (adjustment of status, no interpreter/preparer) satisfies all schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/uscis/petition-alien-relative-i130/1.0.0/schema.json
ok   registry/us/uscis/petition-alien-relative-i130/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/uscis/petition-alien-relative-i130/1.0.0/schema.json
ok   registry/us/uscis/petition-alien-relative-i130/1.0.0/schema.json [v0.3]
```

A separate check confirmed every `requiredWhen`/`visibleWhen` `field`
reference in the document names an existing sibling field (0 dangling
references across 205 fields), and that no field combines a static
`required: true` with `requiredWhen` (which the meta-schema itself also
enforces via its `allOf` constraint).

## What is NOT yet independently verified

- **The scope-decision field reductions** above (prior-spouse slot 2, family
  Persons 2-5, relative 2, petitioner's second physical-address-history slot
  and both employment-history blocks, and the beneficiary's current-employer
  block) are documented simplifications, not gaps discovered during
  verification — a future version could add them back as a MINOR bump if a
  reviewer judges the fidelity trade-off should go the other way.
- **The AcroForm field-numbering quirk** described above means a handful of
  `sourceRef` sub-item letters (particularly in the Part 2 employment/address
  history area, now out of scope, and the Part 4 items 55-62 area) were
  reconstructed from page-text position and cross-referenced against
  `exportValues` rather than read directly off an unambiguous internal field
  name; a second reviewer should re-confirm these against the live rendered
  PDF (e.g. in Adobe Acrobat) rather than the text/field extraction used here.
- **`beneficiaryClassOfAdmission`/`petitionerClassOfAdmission` as free text.**
  Neither the form nor the fetched Instructions enumerates the full set of
  admission-class codes (e.g. B2, IR1, CR1); free text is a reasonable
  encoding, not a citation of a published enumerated list.
- **Constraint patterns** (phone E.164, SSN, A-Number digit count) are
  reasonable encodings consistent with other documents in this registry, not
  citations of a published USCIS validation rule.
- **Form G-1055 (fee schedule)** was not fetched this cycle (the `/i-130` page
  defers filing-fee amounts to that separate, frequently-updated schedule);
  this schema does not encode a fee amount, consistent with every other
  document in this registry.
- **The online (myUSCIS) filing experience's exact screen flow** was not
  directly observed; this document is sourced from the paper/PDF Form I-130
  itself, not a live capture of the online filing wizard. The source page
  confirms Form I-130 can be filed online or by mail, and that Form I-485
  cannot currently be filed online even when I-130 is filed online.
- **The out-of-scope Part 9 continuation section** and Form I-130A (spouse
  beneficiary supplement) are documented as such but not modeled or
  independently verified field-by-field.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) against the live Form I-130 PDF and Instructions, confirms
the sources are still authoritative, resolves any discrepancy by shipping a
new schema **version** (immutability — VERSIONING §3, practice Procedure step
5), and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when USCIS publishes a new Form I-130 edition (the form is dated
per edition, e.g. "04/01/24").
