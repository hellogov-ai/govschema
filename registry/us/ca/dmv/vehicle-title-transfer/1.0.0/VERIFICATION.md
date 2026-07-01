# Verification record — `us/ca/dmv/vehicle-title-transfer` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Why this candidate was added (phase 2 of the GOV-282 brief)

GOV-282 names "DMV (Tag, Title, Registration, Drivers License, IDL, and CDL)" as
one of five focus verticals. Before this document, the registry covered only
"Registration" (`us/ca/dmv/vehicle-registration-renewal`) and "Drivers License"
(`us/ca/dmv/drivers-license-renewal`), both renewal-only, and had **no** candidate
at all — not even in `discovery/catalog.json`'s backlog — for Title, CDL, or IDL.
This document closes the "Title" gap: it was added directly as a new catalog
candidate and authored to `published` in the same cycle, mirroring how
`us/ca/sos/corporation-formation-arts-gs` opened the "Incorporation" gap in the
prior cycle. CDL and IDL remain open for a future cycle.

## Sources examined

- **Document `(id, version)`:** `us/ca/dmv/vehicle-title-transfer` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** California Department of Motor Vehicles (CA DMV)
- **Primary source URL:** <https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/>
- **Official form id:** `Form REG 227 (Rev. 9/2021)`
- **Form PDF:** <https://www.dmv.ca.gov/portal/uploads/2021/11/REG-227-R9-2021-AS-WWW.pdf>
  — fetched directly with a plain `curl` request; unlike the
  `bpd.cdn.sos.ca.gov` forms used for the sibling LLC-1/ARTS-GS documents, this
  `dmv.ca.gov`-hosted PDF returned `200` with no CDN block. Parsed with the
  `pdf-parse` npm package (`PDFParse.getText()`); all 8 sections across both
  pages were recovered as plain text and transcribed field-by-field from that
  output. **Fix-up re-review (GOV-301, this cycle):** the AcroForm's encrypted
  field/annotation layer itself was additionally decoded with `pdfjs-dist`
  (`page.getAnnotations()`), which enumerates every named form widget with its
  page position — a stronger cross-check than the plain-text transcription
  alone, since it surfaces fields whose labels don't line-wrap adjacent to their
  input box in the flattened text. This caught two gaps (below).
- **Vehicle Industry Registration Procedures Manual, Chapter 20 (Replacements
  and Substitutes), "Application for Duplicate or Transfer of Title (REG 227)"
  section:** <https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/duplicates-and-substitutes/application-for-duplicate-or-transfer-of-title-reg-227/>
  — used to confirm the two-path structure (replacement-only vs.
  transfer-with-replacement) and which sections each path uses; the field-level
  detail itself was transcribed from the form PDF, not this handbook page.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A title transfer/replacement is a one-time event tied to a specific vehicle
transaction, not filed "for" a recurring tax/award year — applying the GSP-0005
§2 coexistence test, there is no scenario where two editions of the REG 227 data
model need to coexist for the same applicant. This document is therefore authored
at the plain (non-edition) registry path,
`registry/us/ca/dmv/vehicle-title-transfer/1.0.0/`. A future REG 227 revision that
changes the field set ships as a new `version`, not an edition.

## Scope decisions

Form REG 227 has 8 sections; this document models a subset chosen to cover the
individual-to-individual case cleanly, and states the rest as explicitly out of
scope in the schema `description` rather than silently omitting them:

- **Modeled:** the vehicle-identification line; Section 1 (registered owner(s) of
  record); Section 2 (existing legal owner/lienholder, if any); Section 3
  (missing-title statement and owner certification); Section 4 (registered
  owner's release of ownership, transfer path only); Section 6 (new registered
  owner(s), transfer path only); Section 7 (new legal owner/lienholder, transfer
  path only).
- **Out of scope — Section 5 (legal owner of record release, notarized).** This
  is a distinct path where the *lienholder itself* (not the registered owner)
  releases its lien directly on this form; the form states it "cannot be used for
  non-ELT participants with vehicles 2 model years old or newer" and requires a
  notary block this document does not model.
- **Out of scope — Section 8 (dealer's release of acquired vehicle).** Dealer-only
  fields (dealership name, dealer/salesperson numbers, R/S number) that do not
  apply to an individual seller.
- **Out of scope — vessel fields.** The form is shared between vehicles and
  vessels (CF number, hull identification number, vessel-mooring address); this
  document is scoped to vehicles only, consistent with the sibling
  `vehicle-registration-renewal` and `drivers-license-renewal` documents.
- **Out of scope — Statement of Facts (REG 256).** Referenced by Section 6 for
  the use-tax exemption on a qualifying-relative transfer; a separate form, not
  modeled here.

## What was confirmed against the source

- **Form identity and purpose.** Form REG 227 is the Application for Replacement
  or Transfer of Title, used whenever the original Certificate of Title cannot be
  used to complete a transfer by endorsing its back. Confirmed against the form's
  own title block and the Vehicle Industry Registration Procedures Manual page.
- **Two-path structure.** `transactionType` (`replacement_only` /
  `transfer_with_replacement`) mirrors the form's own header instruction
  ("Replacement Title (Complete Sections 1-3)" / "Transfer of Title with
  Replacement (Seller completes Sections 1-4, New Owner completes Sections 6 and
  7, as needed)"), transcribed verbatim from the decoded PDF text.
- **Section 1/2 field set.** Registered owner and co-owner name/license/address
  fields, and the existing-lienholder fields ("Do not enter name of owners
  above"), transcribed directly from the decoded text.
- **Section 3 missing-title statement.** The five-option reason enum (lost,
  stolen, illegible/mutilated, not received from prior owner, not received from
  DMV), the replacement-cancels-original-title warning, the in-person-filing
  requirement when the address on file differs, and the 90-day CHP
  vehicle-verification trigger are recorded in `missingTitleReason`'s
  description, transcribed from the form text.
- **Section 4/6/7 transfer fields.** The 10-day transfer deadline, the
  purchase/gift/trade acquisition-type branch with its price-vs.-market-value
  requirement, the AND/OR co-owner joinder rule, the qualifying-relative
  Statement-of-Facts cross-reference, the "write None if no new lienholder"
  instruction, and the Vehicle Code §1808.21 service-of-process consent are all
  recorded in the relevant field descriptions, transcribed from the form text.
- **Section 6 has two co-owner/lessee slots, not one (fix-up, GOV-301).** The
  AcroForm field layer shows a primary new-owner name/DL block plus **two**
  separate "TRUE FULL NAME OF CO-OWNER OR LESSEE" name/DL/AND-OR-checkbox
  groups (`6 Name First-1` with `And Box.0`/`And Box1.0`, and `6 Name Last-2`
  with `And Box.1`/`And Box1.1`) — confirmed against the raw widget rects,
  which place the two groups on adjacent lines directly under the primary new
  owner. `schema.json` now models both: `newCoOwnerName`/`newCoOwnershipType`
  (first slot) and `secondNewCoOwnerName`/`secondNewCoOwnershipType` (second
  slot).
- **Section 6 has a standalone lessee-address field (fix-up, GOV-301).** A
  full-width text field labeled "LESSEE ADDRESS (IF DIFFERENT FROM ADDRESS
  ABOVE)" (AcroForm field `Lessee address, if different from address above`)
  sits between the new-owner mailing address block and the vessel/trailer
  location line; it is distinct from both the physical and mailing addresses
  already modeled. Added as `newLesseeAddress`.
- **Section 7 has an ELT # field (fix-up, GOV-301).** The AcroForm shows a
  three-widget "ELECTRONIC LIENHOLDER ID NO. ELT#" field
  (`7 ELT #.0`/`7 ELT #.1.0`/`7 ELT #.1.1`) on the same line as the new
  lienholder name, with the instruction "Attention ELT Legal Owners: ELT # must
  be shown and the name and address must be entered exactly as shown on the ELT
  listing." Added as `newLienholderElectronicLienId`, required (per the form
  text) only when the named new lienholder is an ELT participant.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, numeric minimum, date format, and the
conditional-field notes called out in field descriptions):

```json
{
  "transactionType": "transfer_with_replacement",
  "licensePlateNumber": "8ABC123",
  "vehicleIdentificationNumber": "1HGCM82633A123456",
  "vehicleYearAndMake": "2019 Honda",
  "registeredOwnerName": "Torres, Maria, Alejandra",
  "registeredOwnerLicenseNumber": "D1234567",
  "registeredOwnerLicenseState": "CA",
  "ownerPhysicalAddressLine1": "482 Harbor View Drive, Suite 210",
  "ownerPhysicalAddressCity": "San Diego",
  "ownerPhysicalAddressState": "CA",
  "ownerPhysicalAddressZipCode": "92101",
  "ownerCountyOfResidence": "San Diego",
  "missingTitleReason": "lost",
  "ownerCertificationName": "Maria Alejandra Torres",
  "ownerCertificationDate": "2026-08-01",
  "ownerCertificationPhone": "+16195550142",
  "releasingOwnerName": "Maria Alejandra Torres",
  "releasingOwnerDate": "2026-08-01",
  "releasingOwnerPhone": "+16195550142",
  "acquisitionDate": "2026-07-28",
  "acquisitionType": "purchase",
  "purchasePrice": 18500,
  "newOwnerName": "Chen, David, Wei",
  "newOwnerLicenseNumber": "D7654321",
  "newOwnerLicenseState": "CA",
  "newOwnerPhysicalAddressLine1": "900 Bay Street",
  "newOwnerPhysicalAddressCity": "San Diego",
  "newOwnerPhysicalAddressState": "CA",
  "newOwnerPhysicalAddressZipCode": "92109",
  "newOwnerCountyOfResidence": "San Diego",
  "newOwnerCertificationDate": "2026-08-01",
  "newOwnerPhone": "+16195550199",
  "newLienholderName": "None"
}
```

This models Maria Alejandra Torres — the same individual used in the
`us/ca/sos/business-entity-llc-formation`, `us/ca/sos/corporation-formation-arts-gs`,
and `us/irs/employer-identification-number-ss4` mock scenarios — selling her lost
title vehicle to a new individual owner with a purchase (no existing or new
lienholder), the most common individual-to-individual scenario. The scenario
exercises the `transactionType: transfer_with_replacement` conditional group
(releasing-owner and new-owner fields) and the `acquisitionType: purchase` →
`purchasePrice` pair, while omitting the optional co-owner and mailing-address
fields and the existing-lienholder section. A one-off Node script (`node:fs` + a
hand-rolled per-field validator, not committed to the repo) confirmed every
populated field satisfies its `type` and `validation` constraint and that no
required field was left unset:

```
PASS — mock individual-to-individual vehicle title transfer (with replacement) satisfies the schema field-level constraints.
```

Both registry validators were re-run against the schema document itself (not the
mock data) after the GOV-301 fix-up (new `secondNewCoOwnerName`,
`secondNewCoOwnershipType`, `newLesseeAddress`, `newLienholderElectronicLienId`
fields) and still pass:

```
$ node tools/validate.mjs registry/us/ca/dmv/vehicle-title-transfer/1.0.0/schema.json
ok   registry/us/ca/dmv/vehicle-title-transfer/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/ca/dmv/vehicle-title-transfer/1.0.0/schema.json
ok   registry/us/ca/dmv/vehicle-title-transfer/1.0.0/schema.json [v0.2]
```

All four new fields are optional, so the mock-data scenario above (which does
not populate them) remains valid as-is; they were checked structurally instead
— `secondNewCoOwnerName`/`newLesseeAddress` against their `maxLength: 160`
constraint, `secondNewCoOwnershipType` against its `and`/`or` enum, and
`newLienholderElectronicLienId` against its `maxLength: 20` constraint — by
confirming each accepts a representative value (e.g. a second co-owner
`"Chen, Wei"` with `"and"`, and an ELT id `"1234567"`) and that `schema.json`
still validates against the meta-schema with them present.

## What is NOT yet independently verified

- **Fees.** Unlike the LLC-1/ARTS-GS forms, REG 227 does not print a fee amount
  on the form itself; this document deliberately does not assert a specific fee
  figure. A reviewer should confirm the current title-transfer/duplicate-title
  fee schedule against DMV's published fee calculator and, if worth recording,
  add it to the document `description` with its own citation.
- **The `replacement_only` path's exact required-field subset.** The form states
  "Replacement Title (Complete Sections 1-3)" for that path; this document models
  Sections 1-3 as always collectible and gates only the Section 4/6/7
  transfer-path fields on `transactionType`, which is a reasonable flattening but
  not a verified per-path requiredness table.
- **The online/in-person channel split.** The form notes an in-person filing
  requirement when the address on file differs from DMV records (with a CHP
  vehicle-verification trigger within 90 days of a prior replacement); this is
  recorded as a process fact in `missingTitleReason`'s description, not modeled as
  a routing field.
- **Constraint patterns** (ZIP code, VIN length, E.164 phone) are reasonable
  encodings, not citations of a published DMV validation rule.
- **Downstream/related processes** (dealer-facilitated transfers, use-tax
  exemption via REG 256, ELT lienholder releases, vessel titling) are out of
  scope; see "Scope decisions" above.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form REG 227 (Rev. 9/2021) PDF (or a newer revision,
if one has since been published), confirms the sources are still authoritative,
resolves any discrepancy by shipping a new schema **version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt` / `nextReviewBy`.
This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
the California DMV publishes a new Form REG 227 revision.
