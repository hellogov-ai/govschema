# Verification record — `ca/ircc/eta-application` v1.0.0

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
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Why this candidate was advanced now

`ca/ircc/eta-application` was already a tier-1 candidate in `discovery/catalog.json`
(opened during GOV-276's Visa vertical work alongside `us/cbp/esta-application`),
with a note to "confirm the exact question set from the official IRCC 'Application
Help Guide' PDF at authoring time." This cycle did exactly that.

## Access constraint

The live application (`eta-canada-part1.canada.ca` and successor screens) is a
multi-step web form intended to be filled out in a single timed session (the
guide itself warns "your information can't be saved and you have limited time to
complete the form"), not a static document suited to automated field-by-field
scraping. Consistent with the approach already used for the sibling
`us/cbp/esta-application` document (a JS-rendered application sourced from official
DHS/CBP PIA PDFs instead), this document is sourced from IRCC's own **Electronic
Travel Authorization (eTA) Application Help Guide**, a static PDF published
directly on `canada.ca` that walks through the live form question-by-question.

## Sources examined

- **Document `(id, version)`:** `ca/ircc/eta-application` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Immigration, Refugees and Citizenship Canada (IRCC)
- **Primary source URL:** <https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/apply.html>
- **Official guide PDF:** <https://www.canada.ca/content/dam/ircc/documents/pdf/english/eta/english.pdf>
  ("Electronic Travel Authorization (eTA) Application Help Guide", Ci4-136/2015E-PDF)
  — fetched directly with a plain `curl` request; HTTP 200, no access block.
  Parsed with the `pdf-parse` npm package (`PDFParse.getText()`); all 22 pages
  extracted as clean, legible text and transcribed field-by-field from that
  output.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

An eTA application is a one-time filing per authorization (valid up to 5 years or
until passport expiry), not filed "for" a recurring tax/award year — applying the
GSP-0005 §2 coexistence test, there is no scenario where two editions of the eTA
data model need to coexist for the same applicant. This document is therefore
authored at the plain (non-edition) registry path,
`registry/ca/ircc/eta-application/1.0.0/`. A future eTA question-set revision that
changes the field set ships as a new `version`, not an edition.

## Scope decisions

The guide covers three parts; this document models Part 2 only (an applicant
completing the form for themselves):

- **Out of scope — Part 1 (parent/guardian or representative applying on behalf
  of someone else).** A distinct flow with its own representative-category
  question and a second applicant-details section; not modeled here.
- **Out of scope — Part 2(A), lawful permanent residents of the United States.**
  U.S. LPRs holding valid U.S. status are exempt from the eTA requirement
  entirely and answer a different question branch; not applicable to the
  general case this document models.
- **Out of scope — Israeli/Taiwanese/Romanian passport-holder eligibility
  questions.** Additional eligibility sub-questions shown only to holders of
  these three specific passport types; a narrow edge case not modeled here.
- **Out of scope — Part 3 (post-submission).** Confirmation emails and the eTA
  status-check tool are process facts, not applicant-entered fields.

## What was confirmed against the source

- **Process identity.** The eTA is Canada's air-travel counterpart to a visa
  waiver for visa-exempt foreign nationals (not required for U.S. citizens, and
  not required for land/sea entry — the guide's scope is air travel). CAD $7 fee,
  minutes-to-days approval, up to 5-year or passport-expiry validity. Confirmed
  against the guide's own summary and Part 3.
- **Travel document eligibility.** The full seven-option document-type list, with
  the two ineligible options (refugee travel document; alien passport/travel
  document issued to non-citizens) explicitly excluded from the `travelDocumentType`
  enum per the guide's own eligibility notes, transcribed from Part 2's document
  selection.
- **Passport-name transcription rules.** The guide's detailed rules for
  apostrophes, hyphens, name order via the machine-readable zone, filial markers
  ("bin"/"bint"/"ibn"/"ben"/"ould"), spousal markers ("épouse de"/"ep."), omitted
  titles/prefixes/honorifics, and the Roman-script-only constraint are all
  recorded in `lastName`'s description (and referenced from `firstName`'s),
  transcribed verbatim in substance from Part 2(B).
- **Full field set (Parts 2(B) through 2(I)).** Passport details, UCI/previous
  document number, marital status (7 options), employment (14 occupation
  categories), contact and residential address (including the P.O.-box
  prohibition and the abbreviation prohibition on street names), preferred
  communication language, travel information, the four background questions
  (visa refusal/entry denial, criminal history, tuberculosis contact/diagnosis
  with its 3(a)/3(b) sub-branch, and the other-conditions question), and the
  typed-signature consent/declaration step — all transcribed field-by-field from
  the decoded PDF text.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, integer minimum, date format, boolean
type, and the conditional-field notes called out in field descriptions):

```json
{
  "travelDocumentType": "passport_ordinary_regular",
  "passportIssuingCountry": "USA",
  "nationality": "American",
  "passportNumber": "512334789",
  "lastName": "Torres",
  "firstName": "Maria Alejandra",
  "dateOfBirth": "1990-03-14",
  "countryOfBirth": "United States",
  "cityOfBirth": "San Diego",
  "passportIssueDate": "2019-05-10",
  "passportExpiryDate": "2029-05-09",
  "uniqueClientIdentifierOrPreviousDocumentNumber": "NA",
  "maritalStatus": "never_married_single",
  "occupation": "sales_and_service",
  "employerOrSchoolName": "Riverside Coastal Goods LLC",
  "employerOrSchoolCountry": "United States",
  "employerOrSchoolCity": "San Diego",
  "employedOrEnrolledSinceYear": 2026,
  "email": "maria.torres@example.com",
  "residentialAddressStreetNumber": "482",
  "residentialAddressStreetName": "Harbor View Drive",
  "residentialAddressCity": "San Diego",
  "residentialAddressCountry": "United States",
  "residentialAddressProvinceState": "California",
  "residentialAddressPostalCode": "92101",
  "preferredCommunicationLanguage": "english",
  "knowsTravelDate": true,
  "plannedTravelDate": "2026-09-15",
  "hasBeenRefusedVisaOrDeniedEntry": false,
  "hasCriminalHistory": false,
  "hasTuberculosisContactOrDiagnosis": false,
  "medicalCondition": "none_of_the_above",
  "signatureFullName": "Maria Alejandra Torres"
}
```

This models Maria Alejandra Torres — the same individual used in the sibling
`us/ca/sos/business-entity-llc-formation`, `us/ca/sos/corporation-formation-arts-gs`,
`us/irs/employer-identification-number-ss4`, `us/ca/dmv/vehicle-title-transfer`, and
`us/dos/lost-or-stolen-passport-ds64` mock scenarios — applying for herself for an
upcoming trip to Canada, with no background-question flags raised. The scenario
exercises the `knowsTravelDate: true` → `plannedTravelDate` pair while omitting the
optional `plannedDepartureTime`, `jobTitle`, address-unit/line2/district fields,
and all of the conditional background-question follow-ups (since every background
question answered `false`/`none_of_the_above`, none of their dependent fields
apply). A one-off Node script (`node:fs` + a hand-rolled per-field validator, not
committed to the repo) confirmed every populated field satisfies its `type` and
`validation` constraint and that no required field was left unset:

```
PASS — mock adult self-application eTA (no travel-history flags) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/ca/ircc/eta-application/1.0.0/schema.json
ok   registry/ca/ircc/eta-application/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/ca/ircc/eta-application/1.0.0/schema.json
ok   registry/ca/ircc/eta-application/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **The live form's exact screen-by-screen presentation** (question order, exact
  wording, which fields appear on which screen) was not directly observed — the
  form requires an active, timed session and is not scrapable as static HTML.
  This document is sourced from IRCC's own Help Guide, which the guide itself
  states walks through the live form in order.
- **`jobTitle`'s exact option list.** The guide states job title is selected from
  a list "dependent on the chosen occupation," but does not enumerate that list
  itself, so `jobTitle` is modeled as free text rather than an enum — a
  reasonable flattening, not a verified option set.
- **Constraint patterns** (passport issuing-country 3-letter code, email
  minimum length) are reasonable encodings, not citations of a published IRCC
  validation rule.
- **The three scoped-out paths** (Part 1 representative/parent flow, Part 2(A)
  U.S. LPR exemption, and the Israeli/Taiwanese/Romanian eligibility
  sub-questions) are documented as out of scope but not modeled or verified
  field-by-field; see "Scope decisions" above.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the current IRCC eTA Application Help Guide PDF, ideally with
an observed run of the live application's screens, confirms the sources are still
authoritative, resolves any discrepancy by shipping a new schema **version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the outcome
here plus sets `status: verified` with a current `verification.lastVerifiedAt` /
`nextReviewBy`. This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
IRCC publishes a new version of the eTA Application Help Guide.
