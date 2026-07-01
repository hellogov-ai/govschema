# Verification record — `us/ca/dmv/commercial-drivers-license-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live eDL 44C online application screens. It therefore remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `us/ca/dmv/commercial-drivers-license-application` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** California Department of Motor Vehicles (CA DMV)
- **Primary source URL:** <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/>
- **Official form ref:** DL 44C / eDL 44C (Commercial Driver License Application)
- **Supporting sources (federal enumerations incorporated by California's program):**
  - CA DMV Commercial Driver Handbook, Section 1 (Introduction) —
    <https://www.dmv.ca.gov/portal/handbook/commercial-driver-handbook/section-1-introduction/>
  - CA DMV CDL Classes & Certifications —
    <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/commercial-driver-license-classes-certifications/>
  - 49 CFR § 383.153 (endorsement codes H/N/P/S/T/X, restriction codes incl. K —
    intrastate only) — <https://www.law.cornell.edu/cfr/text/49/383.153>
  - 49 CFR § 383.71 / § 391.11 (four self-certification categories: non-excepted
    interstate, excepted interstate, non-excepted intrastate, excepted intrastate)
- **Retrieved / reviewed:** 2026-07-01 (pages confirmed live at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Applicant must already hold a valid CA noncommercial **Class C** licence before a CLP is issued | `californiaDriverLicenseNumber` |
| Minimum age **18** (intrastate) / **21** (interstate, hazmat, or hazmat/tank endorsements) | `dateOfBirth` (rule recorded in its description) |
| Identity confirmed with **name, date of birth, SSN** (original SS card for a first CDL) | `lastName`/`firstName`/`middleName`, `dateOfBirth`, `socialSecurityNumber` |
| **Residence address**, matched to a residency document for a first CA licence/ID | `residenceAddress*` |
| **CDL classes A/B/C** and their vehicle-weight/passenger/hazmat definitions | `cdlClassRequested` |
| **Endorsement codes H, N, P, S, T** (49 CFR 383.153) and the combined-**X** rule when both H and N are requested | `endorsementHazardousMaterials`, `endorsementTankVehicle`, `endorsementPassenger`, `endorsementSchoolBus`, `endorsementDoubleTriple` |
| **Four self-certification categories** (49 CFR 383.71) and the intrastate-only **K** restriction DMV applies to `non_excepted_intrastate` | `selfCertifiedCommerceType` |
| A **10 Year History Record Check (DL 939)** is required if licensed elsewhere in the last 10 years | `licensedInOtherJurisdictionLast10Years` |
| A **Medical Examiner's Certificate (MEC)** from an MCSA-5875/5876 exam (FMCSA National Registry examiner, valid 2 years) is required for the two non-excepted categories | `medicalExaminerCertificateExpirationDate` |

## Conditional rules (not encoded structurally in v0.1)

Recorded in field `description`s, not encoded (v0.1 has no conditional constraint
mechanism — tracked in
[GSP-0004](../../../../../../spec/proposals/0004-conditional-flow.md)):

- `medicalExaminerCertificateExpirationDate` is only required in practice when
  `selfCertifiedCommerceType` is `non_excepted_interstate` or
  `non_excepted_intrastate`; it is kept `required: true` in this v0.1 document
  (flat/linear model) with the exemption stated in its description.
- `endorsementHazardousMaterials` and `endorsementTankVehicle` both `true`
  results in DMV issuing the combined `X` endorsement rather than separate `H`
  and `N` endorsements; this substitution is descriptive only and not modeled as
  a distinct field.
- The **age threshold** (21 for interstate/hazmat) is a condition on
  `dateOfBirth` combined with `selfCertifiedCommerceType` and the hazmat
  endorsement, recorded in `dateOfBirth`'s description rather than enforced.

## What is NOT yet independently verified

- The exact **field order, labels, and screen flow** of the live eDL 44C online
  application were not captured screen-by-screen; `sourceRef` annotations are
  indicative, derived from the public CDL overview and handbook pages.
- This document models only the **CLP/CDL application intake** (DL 44C). The
  subsequent knowledge/skills testing, the 14-day CLP-to-skills-test waiting
  period, Entry-Level Driver Training (ELDT) provider verification, and CDL
  issuance itself are out of scope for this document and are not modeled here.
- **Fees** (currently referenced as $73 for Class A/B and $43 for Class C in
  secondary sources, subject to periodic legislative change) are intentionally
  not encoded.
- The **CA DL-number** pattern (`[A-Z][0-9]{7}`) is the established California
  format, not a citation of a published DMV validation rule.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live eDL 44C flow, step 3 flow),
confirms the source is authoritative, resolves any discrepancy by shipping a
**new schema version** (immutability — VERSIONING §3, practice Procedure step 5),
and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months):
federal CDL/ELDT rules and CA DMV's online-application flow change periodically.
Re-check the sources on or before that date and on any `source.url` change.
