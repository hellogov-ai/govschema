# Verification record — `gb/dvla/vehicle-tax` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live online service at `vehicletax.service.gov.uk`. It
therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/vehicle-tax` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA).
- **Primary source URL:** <https://www.gov.uk/vehicle-tax>
- **Secondary sources:**
  - <https://www.gov.uk/tax-vehicle-without-v11-reminder> (reference-document
    alternatives to the V11 reminder)
  - <https://www.gov.uk/vehicle-tax-direct-debit> and its "Change how often you
    pay" sub-page (Direct Debit setup and payment-frequency rules)
  - <https://www.gov.uk/vehicle-exempt-from-vehicle-tax> (exemption categories)
- **Official form id:** none. Vehicle tax has no downloadable paper form
  equivalent to the D1/ITR-E precedents used for other reference schemas.
  DVLA's own guidance states the D1/D2/D4 application packs are Post-Office-only
  and are for driving licences, not vehicle tax. The online service itself sits
  behind an authenticated flow at `vehicletax.service.gov.uk` with no published
  field-by-field specification of its screens.
- **Retrieved / reviewed:** 2026-07-01 (all sources confirmed live at authoring
  time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why GOV.UK guidance prose was used as the field-level source

Unlike `gb/co/register-to-vote` (ITR-E fillable PDF) or
`gb/hmrc/self-assessment-tax-return-sa100` (SA100 fillable PDF), vehicle tax has
no equivalent paper form to extract field-by-field. The GOV.UK guidance pages
are themselves the most authoritative public description of what the service
asks for: the "What you'll need" section of the landing page, the reference-number
formats and digit counts on the "without a reminder" sub-page, the Direct Debit
setup and frequency-change sub-pages, and the exemption-category list. This
document transcribes those into fields; it is a **guidance-derived**, not a
**form-derived**, schema, and that distinction is recorded so consumers weigh its
confidence accordingly.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "What you'll need" — V11 reminder, V5C log book, new keeper slip | `referenceDocumentType`, `referenceNumber` |
| Reference-number digit counts (16 / 11 / 12 digit) — "without a reminder" page | `referenceNumber` validation range |
| MOT evidence (certificate, MOT history screenshot, up to 2-day update lag) | `motEvidenceType` |
| "You must tax your vehicle even if... exempt" + exemption categories page | `exemptFromVehicleTax`, `exemptionCategory` |
| Northern Ireland Post Office requirement: original MOT certificate + insurance certificate/cover note | `isNorthernIrelandKeeper`, `insuranceEvidenceProvided` |
| Payment by Direct Debit or debit/credit card; Direct Debit cannot be set up by phone | `paymentMethod` |
| Payment frequency (12 months, 6 months, monthly/6-monthly/annual Direct Debit, 5% surcharge on monthly/6-monthly, must cancel-and-retax to change frequency) | `paymentFrequency` |
| Address, date of birth, and bank/building society details needed to set up Direct Debit | `applicantDateOfBirth`, `applicantAddressLine1/Town`, `applicantPostcode`, `bankAccountHolderName`, `bankSortCode`, `bankAccountNumber` |

## Scope and jurisdiction notes

- **Whole of the United Kingdom, including Northern Ireland.** DVLA's vehicle
  tax service has applied UK-wide since the 2014 abolition of Northern Ireland's
  separate tax disc; `jurisdiction.country` is `GB` per registry convention for
  DVLA schemas (matching `gb/dvla/*` sibling entries), even though the process
  itself covers Northern Ireland too. The Northern-Ireland-specific Post Office
  requirements are modelled as conditional fields rather than a jurisdiction
  split.
- **The V85/V85/1 reference document** (used for HGVs and some larger vehicles)
  was named in the discovery catalog note but not independently confirmed in the
  retrieved sources for this pass; it is **not** included in
  `referenceDocumentType`'s enum. A future minor version can add it once
  confirmed.
- **Historic-vehicle exemption cutoff** is a rolling date (currently vehicles
  over 40 years old); the field description states this qualitatively rather
  than a fixed year, since the cutoff moves each year.
- **Fees/rates are intentionally not encoded**, consistent with other reference
  schemas (e.g. `us/ca/dmv/drivers-license-renewal`). DVLA vehicle tax rates
  change annually and are out of scope for a field-collection schema.
- Conditional requiredness (Direct Debit bank/address/DOB fields; Northern
  Ireland insurance evidence; `exemptionCategory` only when
  `exemptFromVehicleTax` is true) cannot be expressed structurally in v0.2 and is
  recorded in field descriptions, per the limitation tracked in GSP-0004.

## What is NOT yet independently verified

- The exact **screen order and wording** of the live
  `vehicletax.service.gov.uk` online flow were not captured screen-by-screen;
  this document is derived from the surrounding GOV.UK guidance pages, which
  describe what the service needs but not its literal screen text.
- The **V85/V85/1** HGV reference-document path noted in the discovery catalog
  entry was not confirmed and is excluded pending a follow-up review.
- Whether a name field is separately collected during the online flow (as
  opposed to being read from the V5C/reference lookup) was not confirmed; it is
  omitted here on the assumption that DVLA resolves the keeper's name from the
  reference number, matching the "What you need" list which does not mention a
  name field outside the Direct Debit bank details.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live `vehicletax.service.gov.uk`
online flow specifically, step 3 flow), confirms the source is authoritative,
resolves any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
