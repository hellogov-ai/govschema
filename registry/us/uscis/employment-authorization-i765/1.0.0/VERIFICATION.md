# Verification record — `us/uscis/employment-authorization-i765` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

Both the form and the companion Instructions were fetched directly from the live
`uscis.gov` source (HTTP 200, no access block on either) and cross-checked
against each other; no unresolved discrepancy remains between the two sources
reviewed. `status` is set to `verified` on this first authoring pass.

## Why this candidate was advanced now

`us/uscis/employment-authorization-i765` was assigned as part of the approved
federal passport/immigration authoring wave (GOV-664 plan §2, F1.2), alongside
Department of State forms. Form I-765 (Application for Employment
Authorization) is a very-high-volume USCIS filing, online and paper, whose
central complexity is the eligibility-category enumeration (Item Number 27),
distinct in shape from the checkbox-driven `us/uscis/permanent-resident-card-replacement-i90`
already published in this registry.

## Sources examined

- **Document `(id, version)`:** `us/uscis/employment-authorization-i765` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/i-765>
- **Official form id:** `Form I-765 (Edition 08/21/25)`
- **Form PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-765.pdf>
  — fetched directly with a plain `curl` request; HTTP 200, no access block.
  Parsed with the `pdfjs-dist` npm package (per-page `getTextContent()`); all 7
  pages extracted as clean, legible text and transcribed field-by-field.
- **Instructions PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-765instr.pdf>
  — fetched directly the same way; HTTP 200, no access block. All 25 pages
  extracted as clean text. Used specifically for (a) the "Who May File Form
  I-765" eligibility-category enumeration, which the form itself does not
  print, and (b) the "Specific Instructions" section (pages 18-20), which
  restates every Part 2 item number (8 through 31) in linear order and was
  used to resolve the non-linear column order the form PDF's own text
  extraction produced.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

Form I-765 is filed per triggering employment-authorization event (initial
grant, renewal, or replacement/correction), not "for" a recurring period —
applying the GSP-0005 §2 coexistence test, there is no scenario where two
editions of the I-765 data model need to coexist for the same applicant. This
document is therefore authored at the plain (non-edition) registry path,
`registry/us/uscis/employment-authorization-i765/1.0.0/`. A future form
revision (the form itself is dated per edition, e.g. "08/21/25") that changes
the field set ships as a new `version`, not an edition.

## Scope decisions

The form has 6 numbered parts; this document models Parts 1-5 in full, with
the following exclusions and modeling choices:

- **Part 6 (Additional Information)** is a genuinely open-ended continuation
  space for overflow answers from any other part (identified by page/part/item
  number cross-references), out of scope for this flat field set — the same
  treatment given to equivalent overflow sections in other published documents
  (e.g. `us/uscis/permanent-resident-card-replacement-i90` Part 8).
- **The unnumbered attorney/G-28 identification block** on page 1 ("Select
  this box if Form G-28 is attached", Attorney State Bar Number, Attorney or
  Accredited Representative USCIS Online Account Number) carries no Part/Item
  number on the form and functions as USCIS-internal representative
  bookkeeping, not a numbered applicant-facing item — out of scope, the same
  treatment I-90 gives its unnumbered "Action Block/Fee Stamp".
- **`eligibilityCategory` (Item Number 27) enum values are the literal USCIS
  category codes** (e.g. `"(a)(3)"`, `"(c)(3)(A)"`, `"(c)(17)(iii)"`) rather
  than invented snake_case labels. This is a deliberate fidelity choice: the
  Instructions' own worked examples instruct the applicant to "type or print
  '(a)(3)'" in the box, so the literal code **is** the value a filer writes
  and the value USCIS itself uses in cross-references throughout the
  Instructions (e.g. "the EAD category for a person already granted asylum is
  category (a)(5)"). A human-readable label for every code is provided in the
  field's `description` as a compact key, since GovSchema v0.3 has no
  labelled-enum construct (GSP-0003 remains a proposal, not adopted into the
  core spec).
- **53 distinct eligibility-category codes** were transcribed from the
  Instructions' "Who May File Form I-765" section (pages 2-16): 19 `(a)`
  codes (`(a)(2)` through `(a)(20)`; there is no `(a)(1)`) and 34 `(c)` codes
  (`(c)(1)` through `(c)(40)`, non-contiguous — e.g. `(c)(13)`, `(c)(15)`,
  `(c)(21)`, `(c)(23)`, `(c)(27)`-`(c)(30)`, `(c)(32)`, `(c)(34)`,
  `(c)(38)`-`(c)(39)` do not appear in the current Instructions and are
  omitted). Where the Instructions describe multiple filing scenarios that
  share one literal code (e.g. `(c)(8)` covers pre-1995 filers, post-1995
  filers, and ABC Settlement Agreement filers; `(c)(9)` covers ordinary
  adjustment applicants, National Interest Waiver physician renewals, and T/U
  adjustment; `(c)(14)` covers general deferred action and A-3/G-5
  civil-action deferred action), those scenarios collapse to a single enum
  value, since the applicant writes the same code regardless of scenario.
- **Other Names Used (Items 2.a-4.c)** is modeled as three flat, always-optional
  name-triplet slots (`otherName1*`/`otherName2*`/`otherName3*`), matching the
  form's own three fixed instances — not a GSP-0009 repeating-structure gap,
  since the source itself provides exactly three static slots rather than an
  open-ended repeating list.
- **Item Numbers 28-31 (sub-fields keyed to a specific eligibility category)**
  are modeled with `requiredWhen` conditions against `eligibilityCategory`
  (GSP-0013 §2) rather than prose-only notes, since GovSchema v0.3 (unlike the
  v0.2 baseline `us/uscis/permanent-resident-card-replacement-i90` was authored
  under) has a conditional-requiredness mechanism. Likewise `(c)(35)`/`(c)(36)`
  share one `requiredWhen` condition via the `in` operator, and the mutually
  exclusive `applicantCanReadEnglish`/`usedInterpreter` boxes are encoded as an
  `exclusivityGroups` entry (GSP-0013 §5) rather than a prose note.
- **U.S.-only mailing/physical addresses.** Unlike `permanent-resident-card-replacement-i90`,
  Form I-765's own instructions state "You must have a United States address to
  file this application," so `mailingAddress*`/`physicalAddress*` model only
  U.S. address components (no foreign province/postal-code/country
  variants); the interpreter and preparer address blocks, by contrast, do
  include the foreign-address variant fields, matching the form's own
  layout (their address blocks show Province/Postal Code/Country lines the
  applicant's own address block does not).
- **Constraint patterns** (phone E.164, SSN, A-Number digit count, USCIS
  receipt-number format `[A-Z]{3}[0-9]{10}` for the I-140/I-129 cross-reference
  fields) are reasonable encodings consistent with USCIS's published receipt
  number format, not citations of a published Form I-765-specific validation
  rule.
- **`placeOfBirthStateOrProvince`** is modeled as always-optional since not
  every country of birth has an equivalent subdivision; the form provides the
  field but does not state it is conditionally required.

## What was confirmed against the source

- **Full section-by-section field set (Parts 1-5).** Reason for applying
  (including the item-number reuse quirk between the name fields and the
  reason checkboxes, both numbered 1.a-1.c), other names used (three slots),
  U.S. mailing and physical addresses, A-Number/USCIS Online Account Number,
  sex, marital status, prior-filing history, SSN, citizenship (two country
  slots), place/date of birth, full travel-and-status history (I-94, passport/
  travel document, last arrival, current/last-arrival immigration status,
  SEVIS number), the eligibility-category field and every one of its 53
  values, the four eligibility-category-specific sub-field groups (STEM OPT
  degree/employer/E-Verify ID; H-4 spouse's I-129 receipt; (c)(8) arrest/
  conviction question; (c)(35)/(c)(36) I-140 receipt and arrest/conviction
  question), the applicant's statement/contact/certification/signature block
  (including the ABC Settlement Agreement checkbox), and the optional
  interpreter and preparer sections including each role's full mailing-address
  block (items 3.a-3.h) and the preparer's attorney/accredited-representative
  branch with its Form G-28 cross-reference — all transcribed field-by-field
  from the decoded PDF text of both the form and its Instructions.
- **Item-number ordering (Items 8-31).** Cross-checked against the
  Instructions' "Specific Instructions" section, which lists every item number
  in linear order — this fully resolved the form PDF's own non-linear
  text-extraction column order, unlike the residual height/weight item-number
  ambiguity left open in `permanent-resident-card-replacement-i90` v1.0.0.
- **Eligibility-category completeness.** Every code appearing anywhere in the
  Instructions' "Who May File Form I-765" section (a 15-page enumeration
  spanning Asylee/Refugee, Nationality, Foreign Students, Diplomatic/
  International Organization Dependents, Employment-Based Nonimmigrant,
  Family-Based Nonimmigrant, Adjustment of Status, and "Other" category
  groups) was extracted and cross-checked twice: once via a raw-text regex
  sweep for the `(a)(N)`/`(c)(N)` pattern, and once by reading the full
  25-page Instructions text section by section to confirm each code's title
  and grouping.
- **Process identity.** Confirmed `Form I-765` is the correct, current
  (Edition 08/21/25) USCIS form for requesting an Employment Authorization
  Document, distinct from status-specific petitions (e.g. Form I-140, I-360,
  I-485, I-914, I-918) that some eligibility categories reference as
  prerequisite or companion filings but that remain out of scope here.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative applications were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`validation` constraint in
`schema.json` (string length, regex pattern, enum membership, date format,
boolean type, and the `requiredWhen`/`exclusivityGroups` conditional-logic
constructs) using a one-off Node script (`node:fs` + a hand-rolled per-field
and per-condition evaluator, not committed to the repo):

```json
{
  "applicantFamilyName": "Okafor",
  "applicantGivenName": "Ngozi",
  "reasonForApplying": "initial_permission_to_accept_employment",
  "mailingAddressLine1": "1400 Independence Avenue SW",
  "mailingAddressCity": "Washington",
  "mailingAddressState": "DC",
  "mailingAddressZipCode": "20024",
  "physicalAddressSameAsMailing": true,
  "sex": "female",
  "maritalStatus": "single",
  "previouslyFiledForEmploymentAuthorization": false,
  "citizenshipCountry1": "Nigeria",
  "placeOfBirthCity": "Lagos",
  "countryOfBirth": "Nigeria",
  "dateOfBirth": "1998-04-12",
  "passportNumber": "A12345678",
  "passportOrTravelDocumentIssuingCountry": "Nigeria",
  "passportOrTravelDocumentExpirationDate": "2029-01-01",
  "dateOfLastArrival": "2025-08-15",
  "placeOfLastArrival": "Dulles International Airport, VA",
  "immigrationStatusAtLastArrival": "F-1 student",
  "currentImmigrationStatusOrCategory": "F-1 student",
  "sevisNumber": "N0012345678",
  "eligibilityCategory": "(c)(3)(B)",
  "applicantCanReadEnglish": true,
  "usedInterpreter": false,
  "usedPreparer": false,
  "applicantDaytimePhoneNumber": "+12025550142",
  "applicantEmail": "ngozi.okafor@example.com",
  "applicantSignatureDate": "2026-08-01"
}
```

This models Ngozi Okafor, an F-1 student requesting initial post-completion
OPT employment authorization (`(c)(3)(B)`), completing the form herself (no
interpreter or preparer), with a physical address identical to her mailing
address. Result:

```
PASS — mock I-765 application satisfies schema field-level constraints.
```

A second, negative-control scenario was run to confirm the conditional-logic
harness is not vacuous: a `(c)(3)(C)` (24-month STEM OPT extension) applicant
with the `stemOpt*` sub-fields (Item Numbers 28.a-28.c) deliberately omitted.
The harness correctly flagged all three as required:

```
Expected missing (STEM OPT sub-fields): [
  'stemOptDegreeLevelAndMajor',
  'stemOptEmployerNameInEVerify',
  'stemOptEmployerEVerifyCompanyId'
]
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/uscis/employment-authorization-i765/1.0.0/schema.json
ok   registry/us/uscis/employment-authorization-i765/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/uscis/employment-authorization-i765/1.0.0/schema.json
ok   registry/us/uscis/employment-authorization-i765/1.0.0/schema.json [v0.3]
```

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when USCIS publishes a new Form I-765 or Instructions edition (both
currently dated "08/21/25") — in particular, re-check the eligibility-category
enumeration, which is amended more frequently than the form's other sections
as USCIS adds or retires categories by rulemaking.
