# Verification record — `us/fl/doh/birth-certificate-request` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from the Florida Department of Health's own
published application form and instructions. It remains `draft`, not
`verified` — see the honesty flags below for the specific ambiguities that
keep it from `verified`.

## Sources examined

- **Document `(id, version)`:** `us/fl/doh/birth-certificate-request` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of Health, Bureau of Vital Statistics
  ("FL DOH").
- **"Birth Certificates" landing page:**
  <https://www.floridahealth.gov/certificates/certificates/birth/index.html>
  — fetched live as raw HTML, 2026-07-02 (HTTP 200, no block). Supplied the
  eligible-requestor summary, the VitalChek third-party-vendor channel
  description (out of scope for this schema — see below), the fee schedule
  narrative, and the mail-in/walk-in/county-health-department ordering
  channels.
- **DH 726, "Application for Florida Birth Certificate" (01/2022, Fla. Admin.
  Code R. 64V-1.0131):**
  <https://www.floridahealth.gov/wp-content/uploads/2025/07/DH726-birth-app-6-30-2023.pdf>
  — fetched live (HTTP 200), read directly as a PDF (both pages: the
  fillable application on page 1, the printed "Information and Instructions"
  reverse side on page 2). This is the authoritative field source: every
  field name/label in this schema is a direct transcription of a labelled
  blank on this form, and every numbered eligibility category, fee line, and
  acceptable-ID list comes from its reverse-side instructions.
- **Field extraction method:** direct PDF read (native multimodal rendering),
  not a summarized fetch — recovered the exact printed wording of every field
  label, fee line, and instructional paragraph on both pages, per
  [`gov-form-pdf-extraction`](../../../../../../docs/agent-consumption.md)
  discipline.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / `documents[]` entry |
|---|---|
| "ELIGIBILITY (Section 382.025, Florida Statutes)" numbered list 1-6 | `requestorEligibilityCategory` |
| "a birth certificate marked 'Deceased' may be issued to registrant's spouse, child, grandchild, sibling" | `deceasedRegistrantRelativeType` |
| "Applicant's Name: ___ (Person requesting the record)" | `applicantFullName` |
| "Mailing Address: ___ Apt.#: ___", "City: ___ State: ___ ZIP Code: ___" | `applicantMailingAddressLine1/2`, `applicantMailingAddressCity/State/PostalCode` |
| "Phone (with area code): ___ email: ___" | `applicantPhone`, `applicantEmail` |
| "If applicant is an attorney, provide name of client you represent..." | `isAttorneyRequestor`, `attorneyClientFullName`, `attorneyClientRelationshipToRegistrant`, `attorneyBarLicenseNumber` |
| "Full Name on Birth Record: ___" | `registrantFullName` |
| "Sex: ___ Date of Birth: ___ City/County: ___" | `registrantSex`, `registrantDateOfBirth`, `registrantBirthCityOrCounty` |
| "Mother's / Parent's Full Name Prior to First Marriage" / "Father's / Parent's..." | `motherParentFullNameBeforeMarriage`, `fatherParentFullNameBeforeMarriage` |
| "Computer-Generated Certification of Birth" / "Photocopy-Generated Certificate of Live Birth" fee lines | `certificationType`, `numberOfCertificationsRequested` |
| "Additional Years Searched: $2.00 per year (Required when exact year is unknown. Maximum fee is $50.00)" | `additionalYearsSearchedQuantity` |
| "Rush Order (Optional): ... additional $10 fee" | `rushServiceRequested` |
| "FEES: Check or Money Order Payable to: Vital Statistics. DO NOT SEND CASH." | `paymentMethod`, `documents[].feePayment` |
| "APPLICANT'S VALID PHOTO IDENTIFICATION REQUIRED" / "ACCEPTABLE FORMS OF IDENTIFICATION: Driver License, State Identification Card, Passport, Military Identification Card" | `documents[].applicantPhotoIdDocument` |
| "Legal Guardian (must provide guardianship papers)" | `documents[].guardianshipPapersDocument` |
| "Legal representative ... (must provide documentation)" | `documents[].legalRepresentativeDocumentationDocument` |
| "Other person(s) by court order (must provide certified copy of court order)" | `documents[].courtOrderCopyDocument` |
| "notate 'Registrant Deceased' ... include a photocopy of the death certificate" | `documents[].deathCertificateCopyDocument` |
| "the application must be accompanied with a notarized Affidavit to Release a Birth Certificate form (DH 1958) ... and a copy of valid photo identification of both" | `documents[].dh1958AffidavitDocument`, `documents[].eligiblePersonPhotoIdDocument` |
| "Any person who willfully and knowingly provides any false information ... commits a felony of the third degree..." (paired with the "Signature: ___" line) | `documents[].falseStatementAttestation` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **VitalChek's own online-order flow is out of scope.** The landing page
  prominently offers "Order Online with VitalChek," but VitalChek is stated
  to be an "ONLY... approved" *third-party contracted vendor*, not the
  Department of Health's own system (the DH 726 form itself repeats the
  same warning: "VitalChek.com is the ONLY online vendor approved... Be
  cautious when sharing personal information online with unknown
  entities"). This schema models the Department's own DH 726 mail-in/walk-in
  application instead, consistent with the standard's scope (we schematize
  government processes, not a private vendor's proprietary intake flow).
- **`applicantEmail` requiredness is ambiguous.** The form prints "Phone
  (with area code): ___ email: ___" on one line with no asterisk or other
  marking distinguishing required from optional fields anywhere on the form.
  Modelled `applicantPhone` as required (a callback phone is referenced
  elsewhere in the Bureau's own assistance line) and `applicantEmail` as
  optional — a judgment call, not a confirmed rule, flagged here rather than
  guessed silently.
- **`registrantSex` has no enumerated options on the source.** Unlike some
  other schemas' `sex`/`gender` fields (e.g. `us/ny/dmv/drivers-license-renewal`'s
  explicit "M / F / X"), the DH 726 prints only a blank line ("Sex: ___")
  with no printed option list. Modelled as free-text `string` rather than
  inventing an enum with unconfirmed values.
- **The unknown/approximate-birth-year search mechanic is not structurally
  modelled.** The source states the year-range search "(if unknown, specify
  range of years to be searched...)" is billed via the flat
  `additionalYearsSearchedQuantity` fee line, but the DH 726 form itself has
  no separate "year range start/end" input boxes — only the fee-quantity
  box. `registrantDateOfBirth` therefore models only the exact-date path;
  an applicant searching an unknown year is out of full structural scope for
  v1.0.0, the same kind of narrowing `us/ca/dmv/real-id-application` applied
  to its own unsourced SSN exception.
- **No cross-field "different document type" or arithmetic-total rules are
  enforced.** `numberOfCertificationsRequested`, `additionalYearsSearchedQuantity`,
  and `rushServiceRequested` each drive a computed dollar total on the form
  (base fee + $4/copy + $2/year + $10 rush + $1 shipping), but this schema
  does not model a computed "total amount enclosed" field — GovSchema
  documents collect applicant-supplied data, not derived monetary totals;
  the `documents[].feePayment` entry records the payment-method rule and
  notes which fields drive the variable total in prose instead.
- **Spanish-language DH 726S and in-office identity verification are out of
  scope.** The Bureau publishes a Spanish-translated DH 726S with identical
  fields (out of scope for this v1.0.0 English-language schema, consistent
  with `process.language: en-US`), and the walk-in counter's own
  in-person ID check is a service-delivery step, not an applicant-supplied
  data field.

## Conformance

See `conformance/us/fl/doh/birth-certificate-request/1.0.0/` for a mock,
non-submitted request packet exercising the direct-registrant-eligible path.
