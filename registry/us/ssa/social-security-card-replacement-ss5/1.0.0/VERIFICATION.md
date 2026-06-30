# Verification record — `us/ssa/social-security-card-replacement-ss5` v1.0.0

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
recorded against the live SS-5 PDF and online replacement flow. It therefore
remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `us/ssa/social-security-card-replacement-ss5` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Social Security Administration (SSA)
- **Primary source URL:** <https://www.ssa.gov/number-card/replace-card>
- **Form PDF:** <https://www.ssa.gov/forms/ss-5.pdf> (Form SS-5, edition 12-2024)
- **Official form id:** `SS-5` (Application for a Social Security Card)
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| A **replacement** (same name) can in **most states** be requested online with a personal **my Social Security** account; a **first card** or a **legal name change** cannot be done online | `isFirstCard`, `isLegalNameChange`, `applicationChannel` |
| SS-5 collects the **name to show on the card**, **name at birth** if different, and **other names used** | `cardLastName`/`cardFirstName`/`cardMiddleName`, `nameAtBirth`, `otherNamesUsed` |
| **Citizenship status**, **sex**, **date of birth**, **place of birth** | `citizenshipStatus`, `sex`, `dateOfBirth`, `placeOfBirth` |
| **Parents' names and SSNs** (required under 18) | `mothersNameAtBirth`, `mothersSSN`, `fathersName`, `fathersSSN` |
| Whether a card was **previously issued**, the **current SSN**, and the **name on the most recent card** | `everHadCardBefore`, `currentSSN`, `previousCardName` |
| **Mailing address**, **daytime phone**, and the **signer's relationship** to the applicant | `mailingAddress*`, `daytimePhone`, `relationshipToApplicant` |
| Required evidence: **proof of identity**, plus **proof of U.S. citizenship / immigration status if born outside the U.S.** | `identityDocument`, `citizenshipEvidence` |

## Conditional requiredness (not encoded structurally in v0.1)

Several SS-5 rules are conditional and are recorded in field `description`s, not as
constraints (v0.1 has no conditional-required mechanism — tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md)):

- Parents' details (`mothers*`, `fathers*`) are **required for applicants under
  18** and requested otherwise.
- `citizenshipEvidence` is **required when born outside the U.S.** or not a U.S.
  citizen, and otherwise unnecessary.
- The **online channel** is unavailable when `isFirstCard` or `isLegalNameChange`
  is true; the applicant may still begin online and self-schedule an appointment.

## What is NOT yet independently verified

- The exact **item numbering and labels** of the live SS-5 (12-2024) were not
  captured box-by-box; `sourceRef` numbers are indicative of the form's structure,
  not a verbatim transcription.
- **State participation** in the fully-online replacement flow varies and is not
  encoded as data; consumers must check the live source for the applicant's state.
- SSA accepts **originals or certified copies only**; the `file` fields model the
  evidence requirement, not SSA's physical-document handling.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live SS-5 PDF and the online flow,
step 3 flow), confirms the source is authoritative, resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice Procedure
step 5), and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
the online-eligibility rules and accepted-document list change periodically.
Re-check the source on or before that date and on any `source.url` change.
