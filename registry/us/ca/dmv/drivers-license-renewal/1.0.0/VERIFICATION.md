# Verification record — `us/ca/dmv/drivers-license-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live CA DMV online renewal flow. It therefore remains
`draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `us/ca/dmv/drivers-license-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** California Department of Motor Vehicles (CA DMV)
- **Primary source URL:** <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-your-driver-license-dl/>
- **Official form ref:** DL renewal notice (mailed); no single public form number for the online flow
- **Retrieved / reviewed:** 2026-06-30 (page confirmed live, © 2026, at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Renewal can be done **online, by mail, or in person** | `renewalMethod` |
| Online renewal is available **within 90 days before to 12 months after expiration** and only without an address change or REAL ID upgrade | `licenseExpirationDate`, `renewalMethod`, `addressOrNameChange`, `upgradingToRealId` |
| A first-time **REAL ID** upgrade requires an **in-person** visit with documents | `upgradingToRealId` |
| **Vision changes** (e.g. recent eye surgery) or a new medical condition affecting driving require **in-person** renewal with a vision exam | `visionOrMedicalChange` |
| Certain **ages** (generally 70+) require part of the renewal to be done in person | `dateOfBirth` (rule recorded in its description) |
| Identity is verified with **DL number, name, date of birth, and last four of SSN** | `driverLicenseNumber`, `lastName`/`firstName`/`middleName`, `dateOfBirth`, `last4SSN` |
| **Residence address** (and a separate mailing address if different) | `residenceAddress*`, `mailingAddressDiffers` |

## Conditional / temporal rules (not encoded structurally in v0.1)

Recorded in field `description`s, not encoded (v0.1 has no conditional or temporal
constraint mechanism — tracked in
[GSP-0004](../../../../../../spec/proposals/0004-conditional-flow.md)):

- The online-eligibility **timing window** (90 days before / 12 months after
  expiration) is measured against `licenseExpirationDate`.
- `upgradingToRealId` true, `visionOrMedicalChange` true, and the age threshold on
  `dateOfBirth` each **force `renewalMethod` to `in_person`**.
- An **address or personal-description change** may require a different DMV
  transaction.

## What is NOT yet independently verified

- The exact **field order and labels** of the live online renewal flow were not
  captured screen-by-screen; `sourceRef` annotations are indicative, derived from
  the public "Renew your driver's license" page.
- The **CA DL-number** pattern (`[A-Z][0-9]{7}`) is the established California
  format, not a citation of a published DMV validation rule.
- **Fees**, the thumbprint/photo/knowledge-test steps taken at a field office, and
  exact age thresholds are described on the live source and intentionally not
  encoded as data.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live renewal flow, step 3 flow),
confirms the source is authoritative, resolves any discrepancy by shipping a **new
schema version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
California's REAL ID rules and online-eligibility criteria change periodically.
Re-check the source on or before that date and on any `source.url` change.
