# Verification record — `us/sss/selective-service-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live online registration flow. It therefore remains `draft`,
not `verified`.

## Source examined

- **Document `(id, version)`:** `us/sss/selective-service-registration` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Selective Service System (SSS)
- **Primary source URL:** <https://www.sss.gov/register/>
- **Official form id:** none (online registration service; no public form number)
- **Retrieved / reviewed:** 2026-06-30 (page confirmed live at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Online registration collects **full name** | `lastName`, `firstName`, `middleName` |
| **Date of birth** (registration required for most people assigned male at birth, ages 18 through 25) | `dateOfBirth` |
| **Social Security number** (those without one must contact SSS to register another way) | `socialSecurityNumber` |
| **Current mailing address** | `mailingAddress*` |
| **Contact** details for confirmation | `email`, `phone` |

## Temporal rule (not encoded structurally in v0.1)

Eligibility is an **age window**: registration is required from the 18th birthday
until the person turns 26, and the online service accepts registrations only within
that window. v0.1 has no temporal-constraint mechanism, so the rule is recorded in
the `dateOfBirth` description rather than encoded.

## Scope and sensitivity notes

- Selective Service registration is **legally mandated** for most people assigned
  male at birth in the relevant age range; this document collects inputs only and
  never submits, consistent with the GovSchema boundary.
- **Dual citizens, U.S. citizens living abroad, and those without an SSN** have
  alternative registration paths (embassies/consulates, contacting SSS). Those
  branches are described on the live source and not modelled as separate fields in
  this v1.0.0; they are candidates for a future minor version.

## What is NOT yet independently verified

- The exact **field order and labels** of the live online registration flow were
  not captured screen-by-screen; `sourceRef` annotations are indicative.
- Constraint patterns (SSN, state, ZIP, phone) are reasonable encodings consistent
  with the rest of the registry, not citations of a published SSS validation rule.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live registration flow, step 3 flow),
confirms the source is authoritative, resolves any discrepancy by shipping a **new
schema version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months).
Re-check the source on or before that date and on any `source.url` change.
