# Verification record — `ca/ircc/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.

## Why this candidate was advanced now

`ca/ircc/passport-application-first-adult` was already a tier-1 candidate,
noted as the sibling to the published `ca/ircc/passport-renewal-simplified` and
"the fallback path noted in ... VERIFICATION.md for applicants whose personal
details have changed." Unlike that document, which was authored from canada.ca
guidance prose and secondary sources without a directly cited PDF, this cycle
found and used the actual live Form PPTC 153 PDF.

## Sources examined

- **Document `(id, version)`:** `ca/ircc/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Immigration, Refugees and Citizenship Canada, Passport Program (IRCC)
- **Primary source URL:** <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-adult-passport.html>
- **Official form id:** `Form PPTC 153 (02-2026)`
- **Form PDF:** <https://www.canada.ca/content/dam/ircc/migration/ircc/english/passport/forms/pdf/pptc153.pdf>
  — fetched directly with a plain `curl` request; HTTP 200, no access block.
  Parsed with the `pdf-parse` npm package (`PDFParse.getText()`); all 8 pages
  (the 9-section application form itself, and the full Instructions A-P)
  extracted as clean, legible text and transcribed field-by-field from that
  output.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A first adult passport application is a one-time filing per document (the form
must be signed within the preceding 12 months, but this is a submission-freshness
rule, not a recurring filing period), not filed "for" a recurring tax/award
year — applying the GSP-0005 §2 coexistence test, there is no scenario where two
editions of the PPTC 153 data model need to coexist for the same applicant. This
document is therefore authored at the plain (non-edition) registry path,
`registry/ca/ircc/passport-application-first-adult/1.0.0/`. A future form revision
(the form itself is dated per revision, e.g. "02-2026") that changes the field
set ships as a new `version`, not an edition.

## Scope decisions

The form has 9 numbered sections; this document models all of them, with the
following simplifications for open-ended or repeating structures:

- **Section 5 (documents to support identity)** provides two rows to combine
  multiple documents into one qualifying identity proof; this document models
  the first (primary) document only. A second document row is out of scope
  (see GSP-0009).
- **Section 7 (additional personal information — addresses and occupation in
  the last two years)** is a genuinely repeating, open-ended structure (the
  form itself directs overflow to a separate Form PPTC 056); out of scope for
  this flat field set entirely, tracked under GSP-0009.
- **Section 8 (references)** requires exactly two references (a fixed
  cardinality, not open-ended), so both are modeled as named
  `reference1*`/`reference2*` field pairs rather than a repeating structure.
- **Out of scope — credit card payment section (D)**, applicable only to
  mail-in applications paying by card; a payment-method detail, not an
  identity/application-content field.
- **Out of scope — citizenship-document branching detail beyond the document
  type.** Sections 4(A)/4(B) list specific acceptable document sub-types (e.g.
  the K/X certificate-number exception, the pre-/post-February-2012
  original-vs-copy rule); these eligibility nuances are recorded in the
  relevant field descriptions where load-bearing, but the deep citizenship-law
  cross-references (e.g. Citizenship Act §3(2)) are process facts, not form
  fields.
- **Out of scope — the page-2 and page-3 "Signature of applicant / Date"
  boxes** (end of section 5, end of section 9), in addition to the page-1
  declaration signature modeled as `applicantSignatureDate`. These restate the
  same signing date across all three required-signed pages rather than
  representing distinct information, so only the one declaration date/place is
  modeled.

## What was confirmed against the source

- **Process identity and requirements.** The guarantor eligibility criteria
  (Canadian citizen 18+, valid or ≤1-year-expired 5/10-year passport, 16+ when
  that passport was issued, 2+ years personally knowing the applicant), the
  two-reference requirement (non-relative, non-guarantor, 18+, 2+ years known),
  and the mandatory emergency contact are all confirmed directly from the form
  and its Instructions sections B/J, and recorded in the relevant field
  descriptions.
- **Full section-by-section field set (sections 1-9).** Personal information
  (name-for-passport rules including the marriage/legal-name-change
  documentation trigger, anticipated travel date's month/day-only format,
  place/date of birth, sex/gender identifier with the PPTC 643 cross-reference,
  eye colour, height, addresses, contact info), the applicant and guarantor
  declaration/signature blocks, the previous-travel-document
  return-or-destroy choice, the born-in-Canada/born-abroad citizenship-document
  branch, the identity-document requirement, the 5-year/10-year validity
  choice, the two references, and the mandatory emergency contact — all
  transcribed field-by-field from the decoded PDF text.
- **Signature and photo certification rules.** The guarantor's three
  free-of-charge duties (validate section 2, certify one photo's likeness,
  sign identity-document copies where applicable) are recorded in the
  guarantor-related field descriptions, transcribed from Instructions section J.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, integer minimum, date format, boolean
type, and the conditional-field notes called out in field descriptions):

```json
{
  "surnameForPassport": "Chen",
  "givenNamesForPassport": "David Wei",
  "parentsSurnamesAtBirth": "Chen, Wong",
  "anticipatedTravelDateUnknown": true,
  "placeOfBirthCity": "Toronto",
  "placeOfBirthCountry": "Canada",
  "placeOfBirthProvinceOrState": "Ontario",
  "dateOfBirth": "2001-11-02",
  "sex": "male",
  "naturalEyeColour": "Brown",
  "height": "178 cm",
  "currentHomeAddressLine1": "900 Bay Street",
  "currentHomeAddressCity": "Toronto",
  "currentHomeAddressProvinceOrState": "ON",
  "currentHomeAddressPostalCode": "M5S 1A1",
  "primaryPhoneNumber": "+14165550142",
  "applicantSignatureDate": "2026-08-01",
  "applicantSignedAtCity": "Toronto",
  "applicantSignedAtProvinceOrState": "ON",
  "guarantorSurname": "Chen",
  "guarantorGivenNames": "Li Ming",
  "guarantorDateOfBirth": "1970-05-20",
  "guarantorPassportNumber": "GA123456",
  "guarantorPassportIssueDate": "2020-01-15",
  "guarantorPassportExpiryDate": "2030-01-14",
  "guarantorRelationshipToApplicant": "Parent",
  "guarantorAddressLine1": "900 Bay Street",
  "guarantorAddressCity": "Toronto",
  "guarantorAddressProvinceOrState": "ON",
  "guarantorAddressPostalCode": "M5S 1A1",
  "guarantorYearsKnown": 24,
  "guarantorOtherPhoneNumber": "+14165550143",
  "guarantorSignatureDate": "2026-08-01",
  "guarantorSignedAtCity": "Toronto",
  "guarantorSignedAtProvinceOrState": "ON",
  "hasPreviousCanadianTravelDocument": false,
  "bornInCanada": true,
  "citizenshipDocumentTypeBornInCanada": "provincial_or_territorial_birth_certificate",
  "citizenshipDocumentNumber": "ON-2001-998877",
  "citizenshipDocumentIssueDate": "2001-11-10",
  "identityDocumentType": "Ontario driver's licence",
  "identityDocumentNumber": "C1234-56789-01234",
  "identityDocumentNameOnDocument": "David Wei Chen",
  "passportValidityPeriod": "ten_year",
  "reference1FullName": "Sarah Thompson",
  "reference1RelationshipToApplicant": "Family friend",
  "reference1YearsKnown": 10,
  "reference1PhoneNumber": "+14165550188",
  "reference1Email": "sarah.thompson@example.com",
  "reference1AddressLine1": "44 Elm Street",
  "reference1AddressCity": "Toronto",
  "reference1AddressProvinceOrState": "ON",
  "reference1AddressCountry": "Canada",
  "reference1AddressPostalCode": "M4W 1N2",
  "reference2FullName": "James Okafor",
  "reference2RelationshipToApplicant": "Colleague",
  "reference2YearsKnown": 5,
  "reference2PhoneNumber": "+14165550177",
  "reference2Email": "james.okafor@example.com",
  "reference2AddressLine1": "12 King Street West",
  "reference2AddressCity": "Toronto",
  "reference2AddressProvinceOrState": "ON",
  "reference2AddressCountry": "Canada",
  "reference2AddressPostalCode": "M5H 1A1",
  "emergencyContactFullName": "Li Ming Chen",
  "emergencyContactRelationshipToApplicant": "Parent",
  "emergencyContactPhoneNumber": "+14165550142",
  "emergencyContactAddressLine1": "900 Bay Street",
  "emergencyContactAddressCity": "Toronto",
  "emergencyContactAddressProvinceOrState": "ON",
  "emergencyContactAddressPostalCode": "M5S 1A1"
}
```

This models David Wei Chen — the individual introduced in the sibling
`us/ca/dmv/vehicle-title-transfer` mock scenario and given a first SIN in the
`ca/esdc/social-insurance-number-application` mock scenario this session —
applying for his first adult Canadian passport, born in Toronto, with his
parent as guarantor, no prior travel document, and choosing the 10-year
validity period. The scenario exercises the `bornInCanada: true` →
`citizenshipDocumentTypeBornInCanada` branch and the
`hasPreviousCanadianTravelDocument: false` path (no previous-document fields
needed), while omitting the optional anticipated-travel-date, mailing address,
email, other-phone, and identity-document-expiry fields. A one-off Node script
(`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type` and `validation` constraint
and that no required field was left unset:

```
PASS — mock first adult passport application (Canadian-born, no prior travel document) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/ca/ircc/passport-application-first-adult/1.0.0/schema.json
ok   registry/ca/ircc/passport-application-first-adult/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/ca/ircc/passport-application-first-adult/1.0.0/schema.json
ok   registry/ca/ircc/passport-application-first-adult/1.0.0/schema.json [v0.2]
```

## Fix-up: review-gate findings (2026-07-01)

The `GOV-347` review gate (independent re-derivation of the field set from the
live PDF, per Procedure step 2) found real gaps in the initial field set that
were not covered by any documented scope decision — these were plain misses,
not intentional exclusions. Added in this fix-up commit:

- **Section 2 (guarantor):** `guarantorOtherPhoneNumber`, `guarantorAddressApt`
  — both already modeled for the applicant in section 1, missed for the
  guarantor.
- **Section 8 (references, ×2):** `reference{1,2}OtherPhoneNumber`,
  `reference{1,2}Email`, and the full address block
  (`reference{1,2}AddressLine1/Apt/City/ProvinceOrState/Country/PostalCode`).
  References include a distinct country/territory field on the form (unlike
  the applicant/guarantor, who are assumed domestic), so `AddressCountry` is
  modeled as required for references specifically.
- **Section 9 (emergency contact):** `emergencyContactOtherPhoneNumber` and
  the full current-home-address block
  (`emergencyContactAddressLine1/Apt/City/ProvinceOrState/PostalCode`). This
  section's address block has no country/territory field on the form (unlike
  section 8), so none is modeled here.

The "page-2/page-3 signature box" judgment call the reviewer flagged as
non-blocking is now recorded explicitly under "Scope decisions" above.

## What is NOT yet independently verified

- **`identityDocumentType`'s modeling as free text.** The form does not
  enumerate acceptable identity-document types (e.g. driver's licence,
  provincial ID card); this is a reasonable open-text encoding, not a verified
  enum, consistent with the `jobTitle`/`identityDocumentType`-style hedge
  already used elsewhere this session for similarly unenumerated fields.
- **The precise wording/scope of the citizenship-document sub-type
  eligibility rules** (e.g. the K/X certificate-number exception, the
  pre-/post-2012 original-vs-copy distinction) are recorded in prose but not
  independently modeled as separate machine-checkable constraints.
- **Constraint patterns** (phone E.164, postal code) are reasonable encodings,
  not citations of a published IRCC validation rule.
- **The out-of-scope sections** (5's second document row, 7's address/
  occupation history, the credit-card payment section) are documented as such
  but not modeled or independently verified field-by-field; see "Scope
  decisions" above.
- **The online/in-person application experience's exact screen flow** was not
  directly observed; this document is sourced from the paper/PDF Form PPTC 153
  and its instructions.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form PPTC 153 PDF, confirms the sources are still
authoritative, resolves any discrepancy by shipping a new schema **version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
IRCC publishes a new Form PPTC 153 revision (the form is dated per revision, e.g.
"02-2026").
