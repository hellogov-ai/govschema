# Verification record — `za/dha/smart-id-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Eligibility categories, required supporting documents, and fees were read
directly from an official DHA-hosted brochure. The applicant-particulars field
set was independently confirmed live against the real DOM of the eHomeAffairs
account-registration form, and the substantive application-form fields (ID
number, citizenship, names) plus the payment flow were read from an official
DHA-hosted step-by-step guide showing screenshots of the live application
screens. It remains `draft`, not `verified`, because the flow beyond
account-registration Step 1 could not be walked interactively (it requires a
real South African cellphone number for SMS OTP verification) — see "What is
NOT yet independently verified" below.

## Access notes

- `https://www.dha.gov.za/files/Brochures/SmartIDrequirements.pdf` is directly
  reachable (HTTP 200) and is a scanned image with no extractable text layer;
  read directly via PDF vision, not OCR/regex extraction.
- `https://ehome.dha.gov.za/eHomeAffairsV3/SGRegister` (the live eHomeAffairs
  account-registration form) was rendered with a real headless Chromium
  browser (Playwright, `/paperclip/chrome-sysroot` libraries supplying missing
  shared libraries for the sandboxed Chromium build) and its DOM was queried
  directly for every `input`/`select`/`textarea` element's `id`, `name`,
  `placeholder`, `maxLength`, and (for `select`) full option list. This is a
  first-party, live confirmation of field names/ids/constraints, not a
  secondary description.
- `https://ehome.dha.gov.za/eHomeAffairsV3/Content/HowToGuide.pdf` (linked from
  the "How To" nav item on the live eHomeAffairs site) is directly reachable
  (HTTP 200) and contains real screenshots of the application-form, document-
  upload, payment, and booking screens; read directly via PDF vision.
- Registering an eHomeAffairs account requires a real South African cellphone
  number to receive an SMS one-time PIN, so the application-submission flow
  beyond account-registration Step 1 (fields on the actual "Identity Card &
  Passport/Travel Document Application Form", document upload, payment,
  booking) could not be walked interactively. Those fields are instead sourced
  from the How-To Guide's screenshots of that same live form — a first-party
  source, but a static illustration rather than an interactive confirmation.
- `https://www.gov.za/services/services-residents/citizenship/personal-identification/apply-for-identity-document`
  (the national government portal) and
  `https://www.westerncape.gov.za/service/applying-identity-document`
  (a provincial government's page, `.gov.za` domain) were fetched directly and
  used to cross-check eligibility ages, re-issue reasons, fees, and the
  naturalised-citizen document set (Form BI-1620).

## Sources examined

- **Document `(id, version)`:** `za/dha/smart-id-card-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Home Affairs (DHA), Republic of South Africa
- **Primary source URL (directly retrieved, HTTP 200, read verbatim via PDF
  vision):** <https://www.dha.gov.za/files/Brochures/SmartIDrequirements.pdf>
  — "Requirements when applying for Smart ID Card" (categories A/B/C, fees)
- **Live form DOM (directly rendered and queried):**
  <https://ehome.dha.gov.za/eHomeAffairsV3/SGRegister> — "Account Registration
  - Step 1" (title, initials, forenames, surname, ID number, date of birth,
  email, cellphone country code + number)
- **Official step-by-step guide (directly retrieved, HTTP 200, read verbatim
  via PDF vision):**
  <https://ehome.dha.gov.za/eHomeAffairsV3/Content/HowToGuide.pdf> — "How to
  use eHomeAffairs", showing the "Select Application Types" screen, the
  "Identity Card & Passport/Travel Document Application Form" (For Whom is the
  Document(s)? - Identity: ID No, South African citizen Y/N, how citizen,
  full forenames, surname, maiden name), the "Upload Documents" screen, and the
  "Make the online payment" screen (Payment Type/Amount, e.g. "Re-issue of an
  identity document" R140.00)
- **Cross-check (directly retrieved):**
  <https://www.gov.za/services/services-residents/citizenship/personal-identification/apply-for-identity-document>
  — national government portal, eligibility age and re-issue reasons
- **Cross-check (directly retrieved):**
  <https://www.westerncape.gov.za/service/applying-identity-document> —
  provincial government page, fee table, Form BI-9/DHA-9/BI-1620 references,
  naturalised-citizen document set
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Brochure categories A (youth 16+), B (pensioners 60+), C (other citizens): required documents and fees, read directly from the government scan | `applicationReason`, `birthCertificate`, `guardianOrInformantIdCopy`, `parentDeathCertificate`, `previousIdDocumentOrAffidavit`, `proofOfResidence`, `marriageCertificate`, `divorceDecree`, `applicationFee` |
| eHomeAffairs Account Registration Step 1, every field's live DOM `id`/`name`/`placeholder`/`maxLength` | `title`, `initials`, `fullForenames`, `surname`, `identityNumber`, `dateOfBirth`, `email`, `cellCountryCode`, `cellNumber` |
| How-To Guide screenshot of the application form's "For Whom is the Document(s)? - Identity" section | `areYouASouthAfricanCitizen`, `howAreYouACitizen`, `maidenName` |
| Western Cape Government page: fingerprints via Form DHA-9, two colour ID photos, naturalised-citizen document set (naturalisation/permanent-residence certificate + Form BI-1620) | `fingerprints`, `idPhotos`, `naturalisationOrPermanentResidenceCertificate` |
| How-To Guide payment screenshot ("Re-issue of an identity document", R140.00) cross-checked against the brochure's category-C fee and the Western Cape fee table | `applicationFee` |
| Form BI-9 completed, dated, and signed in the presence of a Home Affairs official (not pre-signed) | `declarationSignature` |

## What is NOT yet independently verified

- The exact **declaration wording** on Form BI-9 — the form cannot be
  downloaded (DHA distributes and completes it with the applicant in person),
  so no first-party copy of its printed text was available to quote verbatim.
  `declarationSignature` is modeled without a fabricated `statement`.
- Whether the **naturalisation/permanent-residence document set and Form
  BI-1620** (`naturalisationOrPermanentResidenceCertificate`) is required
  unconditionally or varies by category — the only source is the Western Cape
  provincial government's page, not a dha.gov.za-hosted equivalent.
- The **application-submission screens beyond account-registration Step 1**
  (the live "Identity Card & Passport/Travel Document Application Form",
  document-upload, payment, and branch-booking screens) were confirmed from
  the DHA's own How-To Guide screenshots, not by interactively completing the
  live flow — doing so requires a real South African cellphone number for SMS
  OTP verification, which was not available in this environment.
- Whether `applicationFee`'s payment `methods` (modeled here as cash, card, and
  bank transfer, based on the guide's "Enter banking details"/"Pay with credit
  card" options and the brochure's "at a Home Affairs office" cash option) is
  the complete and current list.
- This document covers the **Smart ID Card** pathway only. The green
  bar-coded ID book (being phased out), the Temporary Identity Certificate,
  and applications lodged at a South African mission/consulate abroad are out
  of scope, per `description`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by interactively completing the eHomeAffairs application
flow with a real South African cellphone number (or against a domestic Home
Affairs office's own published field-level checklist) to confirm the
application-form, upload, and payment fields directly, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
