# Verification record — `sg/lta/vehicle-ownership-transfer` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was **derived from and cross-checked against** the official
sources below, but the live digital service itself is Singpass-gated and
could not be walked screen by screen, so the full field-by-field comparison
`manual-source-review-v1` (Procedure step 2) requires has **not** been
completed against the live service. It therefore remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `sg/lta/vehicle-ownership-transfer` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Land Transport Authority (LTA), Singapore.
- **Primary source URL:**
  <https://onemotoring.lta.gov.sg/content/onemotoring/home/selling-deregistering/transfer-ownership.html> —
  the live LTA OneMotoring guidance page describing the current
  Singpass-authenticated digital transfer flow. Fetched live, 2026-07-04, no
  access block encountered. Describes: seller-initiated transfer using the
  vehicle registration number, new owner's NRIC/FIN, and the new owner's
  contact number; a 5-calendar-day window for the new owner to log in and
  confirm; a S$25 transfer fee paid by the new owner via OneMotoring; a
  7-calendar-day statutory deadline for the whole transfer; eligibility
  conditions (no outstanding loan/road tax arrears, vehicle age vs. COE
  category, valid motor insurance in the new owner's name, vehicle inspection
  if due, and Light/Heavy Goods Vehicle-specific licence/parking-certificate
  requirements).
- **Companion document:** the LTA-hosted **Form M01** PDF ("Application Form
  for Transfer of Vehicle", edition `VRLSO-F-M01-V10`, dated January 2014),
  fetched directly from
  <https://onemotoring.lta.gov.sg/content/dam/onemotoring/M01.pdf>
  (`curl`, HTTP 200, no block) and text-extracted with `pdfjs-dist`
  (`getTextContent`, grouped by y-coordinate to reconstruct row/column
  layout, since the PDF carries no fillable AcroForm field annotations — it
  is a printed static form, not an interactive one). This form is still
  linked from the live, current OneMotoring site as of the retrieval date,
  and its three-section layout (Section A: current registered owner,
  Section B: new registered owner, Section C: submitter) was used to source
  most individual field names, labels, and structural detail (e.g. the
  Section B registered-address breakdown, the NRIC/FIN-vs-passport identity
  split, and the exact declaration wording) that the shorter guidance prose
  does not restate.
- **Secondary source (checked, not modelled):** an LTA-issued FAQ PDF for
  Electronic Service Agents, "FAQs on Transfer and Deregistration of a
  Vehicle which is still under Financing" (November 2018), fetched from
  onemotoring.lta.gov.sg and text-extracted the same way. Confirms the
  digital transfer/deregistration flow's existence and its
  under-financing branch (an 8-day financing-tag cycle triggered when a
  financed vehicle is transferred, extendable to a 13-day lapse window) but
  this branch is explicitly **out of scope** for this schema version (see
  "Scope" below); read only to confirm the base flow's field set is not
  itself dependent on the financing status.
- **Retrieved / reviewed:** 2026-07-04 (all sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field | Basis |
|---|---|
| `vehicleRegistrationNumber`, `roadTaxExpiryDate` | **Directly observed** in Form M01's top-of-form fields (both the label text and day/month/year sub-structure of the expiry date). |
| `currentOwnerIdType`, `currentOwnerIdNumber`, `currentOwnerName` | **Directly observed** in Form M01 Section A's printed labels. |
| `currentOwnerContactNumber`, `newOwnerContactNumber` | **Inferred from guidance prose, not a labelled Form M01 box.** The 2014 paper form predates the current digital flow and has no explicit contact-number field (only an implicit Section C "particulars of submitter"); the live guidance page's plain-language description of what the seller supplies ("the next owner's NRIC or Foreign Identification Number (FIN) number, and their contact number") is the basis for `newOwnerContactNumber`, and the page's summary bullet "Contact information for both parties" is the basis for `currentOwnerContactNumber`. This is this schema's weakest sourcing point; a future reviewer with Singpass access should confirm the exact field(s) and whether the current owner's own contact number is truly collected (the prose is ambiguous on this specific point). |
| `currentOwnerVehicleNotFinancedDeclaration` | **Directly observed**, verbatim declaration text from Form M01 Section A. |
| `newOwnerIdType`, `newOwnerIdNumber`, `newOwnerName`, `newOwnerBirthDate`, `newOwnerGender`, `newOwnerPassportPlaceOfIssue` | **Directly observed** in Form M01 Section B's printed labels. |
| `newOwnerAddressBlockHouseNo`, `newOwnerAddressStreetName`, `newOwnerAddressFloorUnit`, `newOwnerAddressBuilding` | **Directly observed** in Form M01 Section B's "Registered Address in Singapore" sub-table. |
| `newOwnerAddressPostalCode` | **Directly observed label, inferred current meaning.** Form M01 literally prints "Postal District" — Singapore's legacy pre-1995 28-district numbering — rather than "Postal Code". This schema uses the modern 6-digit-postal-code field name/pattern already established by `sg/acra/sole-proprietorship-registration`'s `businessAddressPostalCode`, on the assumption the live OneMotoring digital form (built well after 2014) asks for the current 6-digit postal code rather than the historic district number. **Not independently confirmed** — flagged for a future reviewer with Singpass access to check against the live screen. |
| `newOwnerInsuranceCompanyName`, `newOwnerInsuranceValidDeclaration` | **Directly observed**, Form M01 Section B's insurance-company field and verbatim declaration text. |
| `documents[].transferFee` | **Directly observed** in the live guidance page ("pay the transfer fee of $25 via OneMotoring"). |

## Test run with mock data

A mock application packet was assembled at
`conformance/sg/lta/vehicle-ownership-transfer/1.0.0/application-packet.json`
using fabricated seller/buyer/vehicle details (not a real NRIC, FIN, vehicle
registration number, or address) and checked against this schema's own
`required`/`requiredWhen`/`validation`/`eligibleValues` constraints. No value
was submitted to any LTA system: the live `onemotoring.lta.gov.sg` digital
services require a genuine Singpass login for both the current and new
registered owner, so — consistent with this registry's treatment of other
credential-gated live services (e.g. `gb/dvla/vehicle-keeper-change-v5c`,
`in/mca/company-incorporation-spice-plus`) — this review did not attempt to
exercise the live wizard end to end.

## Scope and jurisdiction notes

- **Individual-to-individual transfer of a privately owned car only.**
  Company/business/ACRA-registered owners (the form's "**"-marked fields and
  declarations), vehicles still under financing (a separate, longer
  confirmation cycle per the November 2018 FAQ), and Light/Heavy Goods
  Vehicles or buses (additional hawker/farm-licence or parking-certificate
  requirements per the guidance page) are out of scope for v1.0.0.
- **Vehicle-registration-number retention and deregistration are out of
  scope.** Both are guidance-referenced adjacent processes with their own
  digital services, not part of the transfer notification itself.
- **This closes Singapore's "Vehicle Registration" gap in the DMV vertical**
  named in GOV-282/GOV-1000: `sg/spf/driving-licence-application` (Drivers
  License) was already published, but Singapore — like CA, NZ, IN, and NL —
  had no Vehicle Registration/Tag/Title schema at all (per the GOV-960
  per-country x per-vertical audit). Ownership transfer, rather than road-tax
  renewal, was chosen because it is backed by a genuine downloadable
  government form (Form M01) giving direct field traceability, matching this
  registry's sourcing preference for a concrete form artifact over
  guidance-prose-only transcription where one is available.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live `onemotoring.lta.gov.sg`
digital services using a genuine, Singpass-authenticated session and an
actual Singapore-registered vehicle pair (seller + buyer), confirms or
corrects the inferred `currentOwnerContactNumber`/`newOwnerContactNumber`
fields and the `newOwnerAddressPostalCode` postal-district-vs-postal-code
question flagged above, resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
