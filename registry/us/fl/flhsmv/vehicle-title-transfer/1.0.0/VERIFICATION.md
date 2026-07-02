# Verification record — `us/fl/flhsmv/vehicle-title-transfer` v1.0.0

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
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Why this candidate was added

GOV-664's approved plan (§3, "Florida wave") lists FLHSMV driver license
renewal, vehicle registration renewal, then vehicle title transfer (HSMV 82040) as
FL.1, FL.2, and FL.3 respectively; this document is FL.3. FL.1
(`us/fl/flhsmv/drivers-license-renewal`) and FL.2
(`us/fl/flhsmv/vehicle-registration-renewal`, GOV-680, merged via PR #119) already
established the `us/fl/flhsmv/...` registry path for the subdivision `US-FL`. This
document mirrors the existing `us/ca/dmv/vehicle-title-transfer` sibling
(GOV-282/GOV-301) as the closest same-vertical precedent for scope, field-naming,
and out-of-scope conventions.

## Sources examined

- **Document `(id, version)`:** `us/fl/flhsmv/vehicle-title-transfer` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of Highway Safety and Motor Vehicles (FLHSMV)
- **Official form id:** `Form HSMV 82040 (Rev. 07/23)` — "Application for
  Certificate of Motor Vehicle Title"
- **Form PDF (primary and only source; the form is self-contained and does not
  reference a separate instructions page):**
  <https://www.flhsmv.gov/pdf/forms/82040.pdf> — fetched directly with a plain
  `curl` request; returned `200` with no CDN/WAF block (`content-type:
  application/pdf`, `content-length: 458843`, `last-modified: Wed, 10 Jan 2024`,
  consistent with the form's own printed "Rev. 07/23" revision line). Decoded
  with the `pdfjs-dist` npm package (installed to a scratch directory, not the
  repo's `tools/` dependencies) two ways:
  - `page.getTextContent()` for the printed instruction/warning prose (both
    pages, e.g. the Section 6 federal/state odometer-mileage warning, and the
    header's "Please submit this form to your local tax collector office or
    license plate agency" instruction — confirming the office/mail-only
    submission channel named in the document's `description`).
  - `page.getAnnotations()` for the AcroForm's field/widget layer — **226**
    named form fields across both pages, enumerated with exact label text
    (`alternativeText`), field type (`Tx`/`Btn`/`Sig`), and page position
    (`rect`). This is the authoritative source for field labels and for which
    checkboxes share a single radio-group `fieldName` (e.g. "Are you a Florida
    Resident?" is one logical yes/no field backed by two widget rects, not two
    independent booleans) — the same stronger cross-check technique used for
    the CA REG 227 fix-up (GOV-301).
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer) — initial authoring
  source-review

## Not a time-versioned (edition) form

A vehicle title transfer is a one-time event tied to a specific ownership change,
not filed "for" a recurring tax/award year — applying the GSP-0005 §2 coexistence
test, there is no scenario where two editions of the HSMV 82040 data model need to
coexist for the same applicant. This document is therefore authored at the plain
(non-edition) registry path, `registry/us/fl/flhsmv/vehicle-title-transfer/1.0.0/`.
A future HSMV 82040 revision that changes the field set ships as a new `version`,
not an edition.

## Scope decisions

Form HSMV 82040 is a single, multi-purpose, 13-section form used for several
distinct FLHSMV transactions. This document models the ownership-**Transfer**
application type; the following are explicitly out of scope (stated in the schema
`description` rather than silently omitted):

- **The "Original" application type.** The form's own header offers a binary
  Application Type choice (Original / Transfer); "Original" is a vehicle's
  first-ever Florida certificate of title with no change of ownership — a
  distinct process from a transfer, with a different required-field profile this
  document does not model.
- **Off-Highway Vehicle Type checkboxes** (All-Terrain Vehicle / Recreational
  Off-Highway Vehicle / Off-Highway Motorcycle) — a vehicle-category flag
  orthogonal to an ordinary motor-vehicle title transfer.
- **Section 3 (Brands, Usage and Type)** — 17 vehicle-condition/usage checkboxes
  (e.g. Rebuilt, Flood, Kit Car, Taxicab, Long/Short Term Lease). Real fields on
  the form, but a large, orthogonal condition-flag block not central to modeling
  the transfer itself; a candidate for a future MINOR addition if a consumer need
  is identified.
- **Vehicle length (feet/inches).** Trailer-specific, consistent with the CA
  sibling's exclusion of vessel/trailer-only fields.
- **Section 7 (Dealer Sales Tax Report and Motor Vehicle Trade-In Information).**
  Dealer-only fields (Florida sales tax registration number, dealer license
  number, trade-in details) that do not apply to an individual seller/buyer.
- **Section 8 (Motor Vehicle Identification Number Verification).** A physical
  VIN inspection completed and signed by a *third party* — a licensed Florida
  dealer, Florida notary public, law enforcement officer, or authorized
  FLHSMV/tax collector/license plate agency employee — not data the applicant
  supplies. (The applicant's own parallel self-certification, "I/We physically
  inspected the VIN" in Section 12, *is* modeled as `physicallyInspectedVin`.)
- **Section 13 (Release of Spouse or Heirs Interest).** A decedent's-estate
  transfer scenario (the vehicle's owner has died), a materially different fact
  pattern from an ordinary living-owner transfer, consistent with the CA
  sibling's exclusion of its own notarized/administrative-release path.

## What was confirmed against the source

- **Form identity, revision, and submission channel.** Form HSMV 82040
  ("Application for Certificate of Motor Vehicle Title"), Rev. 07/23, confirmed
  against the form's own header and footer text (`HSMV 82040 MV – Rev. 07/23`).
  The header's "Please submit this form to your local tax collector office or
  license plate agency" instruction is transcribed verbatim into the schema
  `description` and is the basis for `process.type: amendment` (no online
  submission channel exists for this form).
- **Application-type and print-option header fields.** The Application Type
  (Original/Transfer) and "Request to print Certificate of Title"
  (No/Yes: In office/Yes: Mailed) checkbox groups, transcribed directly from the
  decoded AcroForm widget layer.
- **Section 1 (Owner/Applicant Information) field set.** Customer/Fleet/Unit
  Number, county of residence, Florida-resident/US-citizen/deaf-or-hard-of-hearing
  yes/no questions (the last marked "(Voluntary)" on the form and modeled as
  `required: false` accordingly), the joint-ownership OR/AND election (with the
  form's own "if neither box is checked, the title will be issued with 'and'"
  default recorded in `jointOwnershipType`'s description), the three
  "select if applicable" ownership-arrangement checkboxes (Life
  Estate/Remainder Person, Tenancy by the Entirety, With Rights of Survivorship —
  modeled as independent optional booleans since the form does not state they are
  mutually exclusive), owner/co-owner/mail-to name, contact, sex, date of birth,
  DL/ID or FEID/Suffix number, and mailing/residential address blocks — all
  transcribed field-by-field from the decoded widget layer, including which
  fields are marked "(Voluntary)" on the form (phone and email throughout) versus
  required.
- **Section 2 (Motor Vehicle Description) field set.** VIN, Florida title
  number, license plate number, previous state of issue, make, model, year,
  body, color, weight, GVW, BHP/CC, van-use type, and the alternative fuel-type
  checkbox group — transcribed from the decoded widget layer; the fuel-type
  enum's five values (natural gas liquid/compressed, hybrid gas/electric,
  hybrid diesel/electric, electric) are exactly the five checkboxes the form
  prints, with no separate "gasoline/diesel" checkbox (recorded in `fuelType`'s
  description).
- **Section 4 (Lienholder Information) field set.** ELT-customer yes/no, the
  three-way lienholder-identifier-type radio group (FEID/Suffix #, DMV Account #,
  DL/ID #+Sex+DOB), lienholder contact/address, date of lien, lienholder name,
  and the "authorize the Department to send the title to the owner" checkbox
  (whose default behavior when unchecked — mail to the first lienholder — is
  recorded in `lienholderName`'s description) — transcribed from the decoded
  widget layer.
- **Section 5 (Transfer Type) field set.** The six-way acquisition-type radio
  group (Sale/Gift/Repossession/Court Order/Inheritance/Other), the sale-price
  field (the form's separate dollars/cents boxes flattened into a single
  `salePrice` number, consistent with the CA sibling's `purchasePrice`
  convention), the other-acquisition free-text box, and date acquired —
  transcribed from the decoded widget layer. `acquisitionType` is `required: true`
  (unlike most "if applicable" sections) since it is the field that most directly
  carries this document's transfer scope.
- **Section 6 (Odometer Declaration) field set and warning.** The 5-/6-digit
  odometer selector, the odometer reading (the form's six separate digit-place
  boxes flattened into a single integer, consistent with the "flatten UI digit
  boxes into one field" convention used elsewhere in the registry), date read,
  and the three-way certification radio group — transcribed from the decoded
  widget layer, with the federal/state mileage-disclosure warning text quoted
  verbatim in `odometerCertification`'s description.
- **Section 9 (Sales Tax Exemption Certification) field set.** Confirmed this
  section actually contains **two independent exemption grounds** printed on the
  same page — a certificate-basis pair (purchaser holds a valid exemption
  certificate / vehicle used exclusively for rental, each with its own
  certificate/registration-number field) and a separate transaction-reason list
  (inheritance, gift, divorce decree, transfer between a married couple, other,
  even trade or trade down) — and modeled them as two separate enum fields
  (`salesTaxExemptionCertificateBasis`, `salesTaxExemptionTransactionReason`)
  rather than one, since the decoded widget layer shows they are backed by
  distinct, independently-selectable checkbox groups, not a single list.
- **Section 10 (Repossession Declaration) and Section 11 (Non-Use and Other
  Certifications).** Transcribed directly; `certifiesRepossession` is linked via
  `requiredWhen`/`visibleWhen` to `acquisitionType: repossession`, since the
  source's own Section 5 acquisition-type list and Section 10 declaration
  describe the same repossession fact.
- **Section 12 (Application Attestment and Signatures).** The penalties-of-perjury
  attestation, owner/co-owner signature dates, and the applicant's own
  "I/We physically inspected the VIN" self-certification (distinct from Section
  8's third-party inspector role — see Scope decisions) — transcribed from the
  decoded widget layer. Per registry convention (no `signature` field type in the
  v0.3 field-type vocabulary, §6.2), the physical wet-signature fields
  (`Sig`-type AcroForm widgets) are represented only via their paired attestation
  boolean and signature-date fields, not as a modeled field of their own.

## Mock-data test run

Per the phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked programmatically
(a one-off Node script, `node:fs` + a hand-rolled per-field validator, not
committed to the repo) against every populated field's `type`/`validation`
constraint, every static `required` field's presence, every `requiredWhen`
condition satisfied by the mock data, and the step/field flow-reference integrity
of the document itself:

```json
{
  "certificateOfTitlePrintOption": "yes_mailed",
  "ownerCountyOfResidence": "Miami-Dade",
  "ownerIsFloridaResident": true,
  "ownerIsUsCitizen": true,
  "ownerFullName": "Chen, David, Wei",
  "ownerSex": "M",
  "ownerDateOfBirth": "1985-04-12",
  "ownerDlOrFeidNumber": "C123456789012",
  "ownerMailingAddressLine1": "900 Bay Street",
  "ownerMailingAddressCity": "Miami",
  "ownerMailingAddressState": "FL",
  "ownerMailingAddressZipCode": "33130",
  "ownerResidentialAddressLine1": "900 Bay Street",
  "ownerResidentialAddressCity": "Miami",
  "ownerResidentialAddressState": "FL",
  "ownerResidentialAddressZipCode": "33130",
  "vehicleIdentificationNumber": "1HGCM82633A123456",
  "vehicleMake": "Honda",
  "vehicleModel": "Accord",
  "vehicleYear": 2019,
  "acquisitionType": "sale",
  "salePrice": 18500,
  "dateAcquired": "2026-06-28",
  "odometerDigitCount": "six_digit",
  "odometerReading": 42500,
  "dateOdometerRead": "2026-06-28",
  "odometerCertification": "reflects_actual_mileage",
  "applicantAttestsFactsTrueUnderPenaltyOfPerjury": true,
  "applicantOwnerSignatureDate": "2026-07-02"
}
```

This models David Wei Chen, a Florida-resident individual buying a used car from
an individual seller for $18,500 with no lienholder and no co-owner, mailing his
new title — the most common individual-to-individual scenario, exercising the
`acquisitionType: sale` → `salePrice` conditional pair while omitting the optional
co-owner, mail-to, lienholder, and sales-tax-exemption sections entirely. Output:

```
PASS — mock data satisfies schema constraints; flow/field references consistent.
```

The registry validators were also run against the schema document itself:

```
$ node tools/validate.mjs registry/us/fl/flhsmv/vehicle-title-transfer/1.0.0/schema.json
ok   registry/us/fl/flhsmv/vehicle-title-transfer/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/fl/flhsmv/vehicle-title-transfer/1.0.0/schema.json
ok   registry/us/fl/flhsmv/vehicle-title-transfer/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **Fees.** Form HSMV 82040 does not print a fee amount on the form itself; this
  document does not assert a specific title/transfer fee figure. A reviewer
  should confirm the current title-transfer fee schedule against FLHSMV's
  published fee tables and, if worth recording, add it to the document
  `description` with its own citation.
- **The "Original" application type's field profile.** Noted as out of scope
  above; a future sibling document (e.g. `us/fl/flhsmv/vehicle-title-application`)
  would need its own independent field-by-field review, not an extension of this
  document's `transactionType`-style branching (this document does not model an
  `applicationType` field at all, unlike the CA sibling's `transactionType`).
- **Section 3's 17 brand/usage checkboxes**, the length (feet/inches) field, and
  Sections 7/8/13 — all explicitly out of scope; see "Scope decisions" above.
- **Constraint patterns** (ZIP code, VIN length, E.164 phone, state abbreviation)
  are reasonable encodings consistent with sibling US registry documents, not
  citations of a published FLHSMV validation rule.
- **County-level variation.** Florida title transactions are processed by
  county tax collector offices and license plate agencies, which may layer
  local procedural requirements (appointment scheduling, accepted payment
  methods) on top of the state form; this document models the state-level HSMV
  82040 form only.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form HSMV 82040 (Rev. 07/23) PDF (or a newer revision,
if one has since been published), confirms the source is still authoritative,
resolves any discrepancy by shipping a new schema **version** (immutability —
VERSIONING.md §3), and records the outcome here plus sets `status: verified` with
a current `verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays
as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
FLHSMV publishes a new Form HSMV 82040 revision.
