# Verification record — `za/rtmc/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field and document was read directly from the text layer of the
official Form DL1 PDF, cross-checked against a second independent mirror of
the identical form, and corroborated by the South African Government's own
`gov.za` process-description pages for eligibility, prerequisite, and required-
document facts not restated on the form itself. It remains `draft`, not
`verified`, because the live DLTC intake process and the `online.natis.gov.za`
booking portal could not be walked interactively — see "What is NOT yet
independently verified" below.

**Review-gate correction (GOV-1196):** the review pass for this PR
independently re-extracted Form DL1's text layer with `pdfjs-dist` and found
one Section A contact-detail field, "Facsimile number" (between "Contact
telephone number during day" and "Cellphone number"), present on the form but
missing from the initially authored field set. Added as `facsimileNumber`
(optional, same treatment as the other contact-detail fields) prior to merge.

## Access notes

- `https://www.natis.gov.za/index.php/downloads/forms/road-traffic-related-forms`
  and `http://www.enatis.com/index.php/downloads/cat_view/12-public/4-forms/8-road-traffic-related-forms`
  (the NaTIS system's own forms pages) both return HTTP 403 to direct fetch
  and to this review's fetch tooling — the same class of edge/WAF block seen
  on other `natis.gov.za`-family domains in prior GovSchema cycles (e.g.
  `i-kfz.de`, `mca.gov.in`).
- The actual Form DL1 PDF was retrieved instead from
  `https://nelsonmandelabay.gov.za/datarepository/documents/dl1application-for-driving-licence-form-dl1.pdf`
  (Nelson Mandela Bay Metropolitan Municipality's own `.gov.za` domain), HTTP
  200, with a genuine bilingual English/Afrikaans text layer — extracted in
  full with `pdfjs-dist` (`getTextContent`, position-sorted), not OCR.
- That copy's content and its `DL1(18)(2005/11)` print code were cross-checked
  against a second, independent mirror,
  `https://weq4u.co.za/download/form-dl1-application-for-driving-licence/` (a
  private vehicle-licencing service that republishes the identical form), and
  found to match verbatim on every section examined.
- `https://www.gov.za/services/driving-licence/apply-driving-licence` and
  `https://www.gov.za/services/driving-licence/renew-driving-licence` (the
  national government portal, `.gov.za` domain) were fetched directly (HTTP
  200) and used for facts the form itself does not state: the learner's-
  licence prerequisite, minimum ages per vehicle code, the required-documents
  list (proof of residential address, photograph count), the process steps,
  and the fee guidance ("Contact your local licensing office for current
  rates").
- A web search for a fixed national driving-licence-application fee schedule
  (as distinct from the separately gazetted motor-vehicle-*licence* renewal
  fee) returned no single authoritative number; South African driving-licence
  test/application fees are set and published per province/DLTC, not
  nationally. `applicationFee` is modeled without a fixed `amount` for this
  reason (see §9.1 of the spec — `amount` is OPTIONAL).

## Sources examined

- **Document `(id, version)`:** `za/rtmc/driving-licence-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Road Traffic Management Corporation (RTMC), Republic of
  South Africa
- **Primary source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):**
  <https://nelsonmandelabay.gov.za/datarepository/documents/dl1application-for-driving-licence-form-dl1.pdf>
  — Form DL1(18)(2005/11), "Application for Driving Licence"
- **Cross-check mirror (directly retrieved, HTTP 200):**
  <https://weq4u.co.za/download/form-dl1-application-for-driving-licence/>
- **Cross-check (directly retrieved):**
  <https://www.gov.za/services/driving-licence/apply-driving-licence> —
  eligibility, learner's-licence prerequisite, required documents, process
  steps
- **Cross-check (directly retrieved):**
  <https://www.gov.za/services/driving-licence/renew-driving-licence> — Form
  DL1 confirmed as the current form for both a new application and a renewal
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Form DL1 "LIST OF POSSIBLE TRANSACTIONS" / "APPLICATION FOR:" tick-box list | `transactionType` |
| Form DL1 Section A, "Type of identification" / "Identification number" / "Country of issue if foreign ID" | `typeOfIdentification`, `identificationNumber`, `countryOfIssueIfForeignId` |
| Form DL1 Section A, "Nationality" / "Gender" / "Surname" / "Initials and first names" / "Date of birth" / "Official language of preference" | `nationality`, `gender`, `surname`, `initialsAndFirstNames`, `dateOfBirth`, `officialLanguagePreference` |
| Form DL1 Section A, contact-detail fields (e-mail, home/day telephone, facsimile, cellphone) | `emailAddress`, `homeTelephoneNumber`, `daytimeContactTelephoneNumber`, `facsimileNumber`, `cellphoneNumber` |
| Form DL1 Section A, postal-address and street-address blocks and "Address where notices must be served" | `postalAddressLine`, `postalSuburb`, `postalCityTown`, `postalCode`, `streetAddressLine`, `streetSuburb`, `streetCityTown`, `streetPostalCode`, `addressForNotices` |
| Form DL1 Section B, "CLASS OF MOTOR VEHICLE" code table (a-h) and the prior-refusal question | `classOfMotorVehicle`, `hasBeenRefusedLearnersOrDrivingLicenceBefore`, `previousRefusalDetails` |
| Form DL1 Section D, Declaration items (a)-(c) (disqualification/medical fitness) | `medicalFitnessDeclaration` |
| Form DL1 Section D, Declaration item (d) (photograph count) | `photographsSubmittedCount` |
| Form DL1 Section D, Declaration items (e)-(f) and signature/place/date lines | `declarationInformationTrueAndCorrect`, `declarationPlace`, `declarationDate`, `declarationSignature` |
| gov.za "Apply for a driving licence" — required documents and learner's-licence prerequisite | `identityDocument`, `existingLearnersLicence`, `applicantPhotographs`, `proofOfResidentialAddress` |
| gov.za "Apply for a driving licence" — "Contact your local licensing office for current rates" | `applicationFee` |

## What is NOT yet independently verified

- Whether **proof of residential address** (named on the gov.za guidance page
  but not shown as a field on the DL1 form itself) is required at every DLTC
  nationwide, or varies by province/municipality.
- Whether **cellphone number**, or any of the other Section A contact-detail
  fields (including facsimile number), is mandatory in practice at DLTC
  intake — the form itself carries no asterisk or other required/optional
  marking on any contact field, so this document conservatively models them
  as optional and models only the identity/address/declaration fields the
  form's own structure makes unambiguously required.
- The exact, current **driving-licence application/test fee** — no single
  national fee schedule was found (distinct from the separately gazetted
  motor-vehicle *licence-renewal* fee); `applicationFee` is modeled without a
  fixed `amount`, consistent with `gb/dvla/vehicle-tax`'s precedent for a
  locally-varying fee.
- The live `online.natis.gov.za` booking flow (confirmed reachable only for
  Gauteng residents, per gov.za's own guidance) is a session-based scheduling
  tool, not a field-collection form for DL1 itself, and was not walked
  screen by screen this cycle.
- This document covers the **new driving licence, Code B** pathway only.
  `transactionType`'s other enum values (licence held by virtue of a
  government-department licence; replacement of a foreign licence or of a
  licence in an ID document/on a paper card; a temporary licence; a new
  card/duplicate; and the two notice-of-change transactions), and vehicle
  codes other than B, appear on the same form but their own document/fee
  requirements are out of scope, per `description`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live DLTC
intake visit, the `online.natis.gov.za` booking flow (for a Gauteng
applicant), or an authoritative RTMC/provincial-transport-department field-
level checklist; resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5); and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
