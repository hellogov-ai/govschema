# Verification record — `ca/on/mto/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the current **SR-LV-006E (2023/04)**
"Application for Vehicle Registration" PDF, a genuine fillable AcroForm
(XFA) with 128 real, named form-field widgets across its 4 pages, obtained
without any bot-block from Ontario's own Central Forms Repository. This is
stronger sourcing than a guidance-prose-only transcription or a static
(non-fillable) form — every field's own alternative-text/tooltip was read
directly off the PDF's annotation metadata, not inferred from surrounding
prose. The live ServiceOntario/MTO counter transaction itself was not
walked screen-by-screen (it is only performed in person at an Issuing
Office, with no public online equivalent for this specific form), so the
full field-by-field comparison `manual-source-review-v1` (Procedure step 2)
requires against a live transaction has **not** been completed. It
therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `ca/on/mto/vehicle-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ontario Ministry of Transportation (MTO), transactions
  processed through ServiceOntario Driver and Vehicle Licence Issuing
  Offices.
- **Primary source:**
  <https://forms.mgcs.gov.on.ca/dataset/3c75269a-0400-4861-baf2-93a5d668f57c/resource/339a68c4-afe9-4cc8-a372-7c1665e27d14/download/sr-lv-006e.pdf>
  — **SR-LV-006E (2023/04)**, "Application for Vehicle Registration",
  linked directly from its Central Forms Repository dataset page
  (<https://forms.mgcs.gov.on.ca/en/dataset/sr-lv-006>). Fetched directly
  with `curl`, HTTP 200, a genuine 1,435,951-byte `%PDF-1.7` binary (not a
  challenge stub or a scanned image). Both the page text (`pdfjs-dist`
  `getTextContent`) and every AcroForm/XFA field's annotation metadata
  (`getAnnotations`, reading `fieldName`/`fieldType`/`alternativeText`)
  were extracted and read in full across all 4 pages: Section 1
  (Registrant), Section 2 (Number Plates), Section 3 (Vehicle Status),
  Section 4 (Application for Replacement), Section 5 (Declarations —
  commercial/farm/school-bus/historic/low-speed-vehicle, out of scope),
  Section 6 (Change Registered Gross Weight or Seating Capacity, out of
  scope), Section 7 (Certificate of Insurance), Section 8 (Certification/
  signature), and page 4's staff-only "Office Use Only" section (Sections
  A-H), whose Section B "Transaction Type" checklist ("Original
  Registration ... Replacement ... Transfer ...") corroborates this
  schema's `transactionType` field and scoping choices.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `transactionType` | **Inferred structuring, directly grounded**: the source form itself is a single multi-purpose document with no single applicant-facing field naming "new registration" vs. "replacement" as a choice, but page 4's own staff-completed "Transaction Type" checklist lists "Original Registration" and "Replacement" as two of its distinct transaction types, and Sections 1-3/7 (registrant, vehicle, insurance) vs. Section 4 (replacement-specific) are visibly separate parts of the form. This field makes that structure explicit for schema purposes rather than inventing a value the source doesn't support. |
| `registrantIdentificationNumber`, `registrantSex`, `registrantDateOfBirth`, `registrantName` | **Directly observed**, Section 1's own field labels/alternative-text, including "New Plate Registrants only" on the identification-number field. |
| `isNewRegistrantOrAddressChanged`, `physicalAddressStreet/Apartment/City/PostalCode` | **Directly observed**, Section 1 — "Complete address section only if new registrant or address changed." |
| `mailingAddressDifferentFromPhysical`, `mailingAddressStreet/City/PostalCode` | **Directly observed**, Section 1 — "Mailing Address (Complete below only if mailing address is different from above)." |
| `vehicleToBeRegisteredToTwoIndividuals` | **Directly observed**, Section 1 checkbox. The sibling checkboxes "Number plates owned by other than above" and "Unincorporated company name to be recorded" (which cross-references a separate Supplementary Application) were read but not modelled as fields — out of scope, see below. |
| `existingPlateNumberToBeAttached`, `newNumberPlatesRequired`, `vehicleClass`, `odometerKm`, `returningPlatesForCreditOrCancellationNumber` | **Directly observed**, Section 2's own field labels. `vehicleClass`'s enum is restricted to the 6 individual-relevant options (of the 8 the source offers); Commercial and Bus are read but excluded, see below. |
| `vehicleStatus`, `vehicleStatusOtherDescription` | **Directly observed**, Section 3 — "Is this vehicle to be registered? Fit / Unfit / Temporary / Other," with the "Other" free-text box that accompanies the "Other" checkbox on the same AcroForm annotation set. |
| `replacementItem`, `reasonForReplacement`, `replacementValidationNumber`, `vehicleIdentificationNumber` | **Directly observed**, Section 4's own field labels, including the "Complete if applicable" framing for the plate/validation/VIN fields. `vehicleIdentificationNumber` is shared with Section 7's own VIN reference, and Section 4's own "Plate Number" (complete-if-applicable) is shared with `existingPlateNumberToBeAttached` (Section 2) — both are source-faithful simplifications reusing one field for one real-world fact named in two sections, rather than duplicating it. |
| `insuranceCompanyName`, `insurancePolicyNumber` | **Directly observed**, Section 7 — "Certificate of Insurance (The Compulsory Automobile Insurance Act)." The page-1 instructions box ("Provide insurance information in section 7 if applicable") is read as applying to the new-registration transaction, not the pure-replacement one, since a lost sticker/plate replacement does not by itself put the vehicle back on the road for the first time. |
| `applicantPrintedName`, `informationTrueDeclaration`, `applicationDate` | **Directly observed**, Section 8 — "I hereby certify the information in this application is true," the signature/date fields, and the false-statement penalty sentence transcribed into the declaration field's description. |
| `documents[].applicantIdentification` | **Directly observed**, page 4, Section D "Identification Viewed — Personal ID / Third Party / DAL." Staff-facing, but confirms an applicant must present identification to complete this transaction. |
| `documents[].vehicleSourceDocument` | **Directly observed**, page 4, Section E "Identify Source Document — N.V.I.S. or Dealer Certificate / Permit-Vehicle Portion / Permit-Out of Province / Permit-Out of Country." |
| `documents[].registrationFeePayment` | **Directly observed reference**, page 4, Section H "Processing Information — Validation ($) / Admin./Reg. ($) / HST ($) / RST ($)." Amount not encoded as a fixed field value: MTO computes the fee from vehicle class/weight/transaction type, consistent with this registry's fee convention on schemas where the authority computes the amount (cf. `nz/nzta/vehicle-licence-renewal`'s `licensingFeePayment`). |

## Explicitly out of scope for v1.0.0

- **Commercial, bus, farm, dealer/manufacturer, and other business-fleet
  vehicle classes**, and Section 5's associated declarations (CVOR
  exemption/authority, PUO passenger-car-fee declaration, farm-truck
  registration, school-bus contract declaration, historic-vehicle
  declaration, low-speed-vehicle declaration, medical-practitioner plates,
  motor-assisted-bicycle dealer certificate) — all business-internal or
  narrow special-purpose declarations outside GovSchema's individual-focused
  scope (per `discovery/README.md`'s own boundary).
- **An ownership transfer between two individuals.** The source form's own
  office-use Section B lists "Transfer" and "Plate Transfer" as distinct
  transaction types, but the applicant-facing pages have no dedicated
  buyer/seller fields for that scenario (unlike, e.g., `nl/rdw/vehicle-ownership-transfer`'s
  or `sg/lta/vehicle-ownership-transfer`'s dedicated forms) — a genuine
  future candidate, not modelled here.
- **A gross-weight or seating-capacity change** (Section 6) — a distinct,
  narrower transaction the source form itself separates out.
- **The routine, non-eventful annual licence-plate renewal.** This is a
  different transaction from anything on the SR-LV-006E form: most
  eligible vehicles renew automatically without any form at all, and the
  narrower manual-renewal case (commercial/business, motorhome, pre-1983,
  bus, snowmobile) is a live online/in-person service with no downloadable
  form — already tracked separately as the `ca/on/mto/vehicle-permit-renewal`
  discovery candidate (twice blocked on a live-wizard eligibility lookup;
  still open).
- **The Supplementary Application** cross-referenced when an unincorporated
  company name needs to be recorded — a separate form, out of scope.

## Test run with mock data

A mock application packet was assembled at
`conformance/ca/on/mto/vehicle-registration/1.0.0/application-packet.json`
for an ordinary individual registering a passenger vehicle for the first
time with new plates required — fabricated registrant/vehicle/insurance
details, not a real person or vehicle. It was checked with a standalone
script re-implementing the schema's own `required`/`requiredWhen`/
`validation`/`eligibleValues` evaluation (GSP-0013 condition grammar
`all`/`any`/`not`/leaf-compare, the same technique used for the last
several renewal/registration cycles): 28 field/document entries evaluated,
0 violations. The packet exercises the `transactionType = new_registration`
branch; the `replacement` branch (Section 4) was reasoned through manually
against the source text rather than exercised in a second packet. No value
was submitted to any government system: this transaction is only completed
in person at a ServiceOntario Issuing Office, so — consistent with this
registry's treatment of other in-person-only or credential-gated
transactions — this review did not attempt to exercise a live counter
transaction.

## Scope and jurisdiction notes

This is Canada's first Vehicle Registration/Tag/Title-family schema in any
province: per the GOV-960 audit lineage, Canada (alongside India, New
Zealand, Netherlands, and Singapore at various points) had a
Drivers-Licence schema (`ca/on/mto/drivers-licence-renewal`) but no Vehicle
Registration/Tag/Title schema at all. India, Singapore, New Zealand, and
the Netherlands have since been closed (`in/morth/vehicle-ownership-transfer`,
`in/morth/vehicle-registration-renewal`, `sg/lta/vehicle-ownership-transfer`,
`sg/lta/road-tax-renewal`, `nz/nzta/vehicle-licence-renewal`,
`nl/rdw/vehicle-ownership-transfer`); this opens Canada's leg of the same
gap using a genuinely different sourcing angle (a directly downloadable
fillable form) than the live-wizard-eligibility-lookup approach that has
twice left `ca/on/mto/vehicle-permit-renewal` at `candidate` rather than
`published`. That renewal-specific candidate remains open for a future
cycle — a third attempt should still look for a static MTO/ServiceOntario
renewal-specific PDF (distinct from this general-registration form) before
retrying the live wizard.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against a real in-person ServiceOntario
transaction (or an authoritative MTO field-mapping document, if one is
published), confirms the exact fee schedule and any AcroForm field
revisions since the 2023/04 edition, resolves any discrepancy by shipping
a **new schema version** (immutability — VERSIONING §3, practice Procedure
step 5), and records the outcome here plus sets `status: verified` with a
current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
