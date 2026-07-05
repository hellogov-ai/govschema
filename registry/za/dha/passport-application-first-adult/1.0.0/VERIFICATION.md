# Verification record — `za/dha/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

The document was derived directly from the official government-hosted form PDF,
cross-checked against a legible mirror copy of the identical current form. The
full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has been completed for Sections
A, D, and E of Form BI-73 against a directly-retrieved government copy. It
remains `draft`, not `verified`, because two supporting-document requirements
(BI-529 triggering condition, DHA-9 fingerprint procedure) are sourced only from
a secondary consular checklist rather than a domestic first-party source — see
"What is NOT yet independently verified" below.

## Access notes

`dha.gov.za` is directly reachable and its `bi-73.pdf` returned HTTP 200. That
government-hosted copy, however, is a large (7.5 MB), low-contrast scanned image
with no extractable text layer (confirmed with `pdfjs-dist`: 0 characters of
text content across all pages). Its field layout — every label, tick-box, and
section on all 4 pages — was read directly from that scan and cross-checked
page-by-page against a legible, high-resolution mirror of the identical current
BI-73 (plus the companion BI-529) distributed by the South African Embassy in
Washington, D.C., which shows the same `G.P.S. 017-9750` print code, the same
`BI-73` form reference in the top-right corner of every page, and byte-for-byte
identical section text and field layout. `gov.za`'s own media-statements page
(the fee-approval announcement) was also directly reachable.

## Sources examined

- **Document `(id, version)`:** `za/dha/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Home Affairs (DHA), Republic of South Africa
- **Primary source URL (directly retrieved, HTTP 200, read verbatim):**
  <https://www.dha.gov.za/images/PDFs/Travel%20Documents/bi-73.pdf>
- **Official form ref:** BI-73 ("Application for a South African Passport or
  Travel Document"), also referred to as DHA-73 in secondary sources
- **Cross-check mirror (directly retrieved, read verbatim):**
  <https://www.saembassy.org/wp-content/uploads/2023/11/DHA-73-1.pdf> — the
  identical BI-73 form (as a filled specimen) plus the companion BI-529
  ("Determination of Citizenship Status") form
- **Consular requirements checklist (secondary source, for DHA-529/DHA-9 and fee
  context only):** <https://www.suedafrika.org/downloads/BI-73_Passport.pdf>
- **Fee source (directly retrieved):**
  <https://www.gov.za/news/media-statements/minister-aaron-motsoaledi-approves-new-fees-passports-and-travel-documents-09>
  — domestic 32-page adult passport fee ZAR 600, effective 2022-11-01, confirmed
  still current for 2026 by multiple independent secondary sources (idchecker.co.za,
  elyforma.com, konnectsa.co.za)
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Section A, Particulars of applicant (application type tick-boxes, surname, forenames, previous surname, marital status, gender, date of birth, identity number, country/place of birth, postal address, home/work/cell phone) — read directly, verbatim, from both the government scan and the mirror copy | `applicationType`, `deliverToPostalAddress`, `surname`, `forenamesInFull`, `previousSurname`, `maritalStatus`, `gender`, `dateOfBirth`, `identityNumber`, `countryOfBirth`, `placeOfBirth`, `postalAddressLines`, `postalCode`, `homeTelephone`, `workTelephone`, `cellNumber` |
| Section D, Citizenship (must be completed by all applicants): other-citizenship table (country/place/means/date) and prior-travel-document question (date/number) | `acquiredOtherCitizenship`, `otherCitizenshipCountry`, `otherCitizenshipPlaceObtained`, `otherCitizenshipMeans`, `otherCitizenshipDate`, `previouslyIssuedTravelDocument`, `previousTravelDocumentDate`, `previousTravelDocumentNumber` |
| Section E, Declaration (truthfulness statement, 3-month forfeiture clause, date, place, signature) | `declarationTruthfulComplete`, `declarationDate`, `declarationPlace`, `declarationSignature` |
| Instruction 1(e): identity number required, ID documents submitted with application | `identityDocumentCopy` |
| Instruction 1(f): full fingerprint set required for applicants 16+ | `fingerprints` (procedure sourced only from the secondary consular checklist — see below) |
| Instruction 3(a): two 35mm x 45mm photographs | `passportPhotos` |
| Instruction 2: fees payable in cash at a Home Affairs office; `gov.za` fee-approval statement for the ZAR 600 domestic amount | `applicationFee` |
| Section C (parental consent for a minor) exists on the form but is explicitly scoped out — this document is first-time-**adult** only | not modeled (out of scope, stated in `description`) |

## What is NOT yet independently verified

- Whether Form **BI-529** (Determination of Citizenship Status) is required
  unconditionally for every domestic first-time application, or only when the
  applicant's answers to Section D raise a citizenship question. The only
  source that lists it as a required accompanying document is a South African
  consular office's requirements checklist for applications lodged **abroad**,
  where citizenship questions are inherently more likely to arise; this
  document models it as `requiredWhen acquiredOtherCitizenship: true`
  pending confirmation from a domestic Home Affairs source.
- The **DHA-9 fingerprint-collection procedure** (`fingerprints` document) is
  sourced only from the same secondary consular checklist, since it is a
  biometric process rather than a fillable form with a directly-citable primary
  source page.
- **South Africa's Smart ID Card vs. green bar-coded ID book** — the
  `identityDocumentCopy` document does not distinguish between the two
  currently-valid identity-document formats; both are accepted per general DHA
  guidance, but this was not confirmed against a BI-73-specific instruction.
- This document covers the **domestic, ordinary/permanent 32-page** pathway
  only. The Maxi, Diplomatic, Official, Crew Member, Temporary, and Emergency
  Passport pathways share the same BI-73 form but have their own
  supporting-document and fee requirements, not modeled here. Applying at a
  foreign mission/consulate is a separate, higher-fee process, also out of
  scope.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) against a domestic Home Affairs office's own published
checklist (rather than a consular/abroad checklist) to confirm the BI-529 and
DHA-9 items above, resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
