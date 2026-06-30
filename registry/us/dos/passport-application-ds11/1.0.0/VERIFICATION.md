# Verification record — `us/dos/passport-application-ds11` v1.0.0

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
recorded against the live Form DS-11 PDF. It therefore remains `draft`, not
`verified`. Consumers SHOULD treat this as an accurate, source-grounded structural
reference, not a load-bearing description of the live process.

## Source examined

- **Document `(id, version)`:** `us/dos/passport-application-ds11` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (DOS)
- **Primary source URL:** <https://travel.state.gov/en/passports/how-apply.html>
- **Official form id:** `DS-11` (Application for a U.S. Passport)
- **Retrieved / reviewed:** 2026-06-30 (page confirmed live at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| DS-11 is the form used when you **must apply in person** (first time, under 16, or a prior passport that was lost/stolen/damaged, over 15 years old, or issued before age 16) | `inPersonReason` |
| Personal identity block: **name, date of birth, sex, place of birth, SSN, contact, mailing address** | `lastName`…`mailingAddressPostalCode` |
| **Physical description** (height, hair color, eye color) and occupation/employer | `heightFeet`, `heightInches`, `hairColor`, `eyeColor`, `occupation`, `employerOrSchool` |
| **Parental information** and an **emergency contact** are collected | `parent1*`, `parent2*`, `emergencyContact*` |
| Required evidence: **evidence of U.S. citizenship** (original + photocopy), **photo identification** (+ photocopy), and **one photo** | `citizenshipEvidenceType`, `citizenshipEvidence`, `photoIdType`, `photoIdCopy`, `photo` |
| Applicant chooses **book and/or card** and **routine or expedited** service | `productRequested`, `serviceSpeed` |
| DS-11 must be **signed in person before an acceptance agent** at an acceptance facility — it is not mailed | `acceptanceFacilityAcknowledged` |

## Scope boundary — acceptance-facility handoff

This document deliberately ends at the in-person handoff. Unlike DS-82 (renewal by
mail), DS-11 cannot be completed by submission: the applicant signs under oath
before an acceptance agent. `acceptanceFacilityAcknowledged` records that boundary;
nothing here submits on the applicant's behalf (GovSchema scope, catalog boundary).

## What is NOT yet independently verified

- The exact **item numbering and labels** of the live DS-11 PDF were not captured
  box-by-box; `label`/`sourceRef` annotations are indicative, derived from the
  public "How to Apply" guidance and the known DS-11 structure, not a verbatim
  transcription of the current form revision.
- Conditional requiredness — parental information is mandatory for **child
  (under-16)** applicants and requested for adults — is recorded in field
  `description`s, not encoded structurally; v0.1 has no conditional-required
  mechanism (tracked in [GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md)).
- The **application fee** and the separate **execution fee** paid at the
  acceptance facility, and processing times, are deliberately not encoded as data
  (they change); the document points consumers to the live source.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live DS-11 PDF, step 3 flow), confirms
the source is authoritative, resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
the passport surface (fees, required-evidence list, photo rules) changes
periodically. Re-check the source on or before that date and on any `source.url`
change.
