# Verification record — `us/usps/change-of-address` v1.0.0

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
recorded against the live online Mover's Guide flow. It therefore remains `draft`,
not `verified`. Consumers SHOULD treat this as an accurate, source-grounded
structural reference, not a load-bearing description of the live process.

## Source examined

- **Document `(id, version)`:** `us/usps/change-of-address` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** United States Postal Service (USPS)
- **Primary source URL:** <https://www.usps.com/manage/forward.htm>
- **Official form id:** `PS Form 3575` (paper equivalent of the online Change of Address)
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Change of Address can be for an **Individual, Family, or Business** | `moverType` |
| Change can be **permanent** or **temporary** (15 days up to 1 year) | `changeType`, `temporaryEndDate` |
| Forwarding has a **start / move effective date** | `moveEffectiveDate` |
| Old (from) and new (to) **addresses** are collected | `oldAddress*`, `newAddress*` |
| **Contact** details (phone and email) are collected | `phone`, `email` |
| Identity is verified **online with a card** (billing address matching the old or new address, small fee) **or in person** with photo ID | `identityVerificationMethod` |

Confirmed source rules folded into field `description`s rather than encoded as
constraints (v0.1 has no cross-field or temporal rules):

- For a **family** move, everyone shares the same last name and mail is forwarded
  for that last name at the old address (`lastName`).
- Temporary forwarding minimum is **15 days** (`temporaryEndDate`).
- PS Form 3575 limits backdating of the start date to **no more than 45 days**
  before submission (`moveEffectiveDate`).

## Conditional requiredness (not encoded structurally in v0.1)

Name requiredness depends on `moverType`: an **individual** or **family** move
requires `firstName`/`lastName`; a **business** move requires `businessName`
instead. The GovSchema v0.1 field model has no conditional-required mechanism, so
`firstName`, `lastName`, and `businessName` are all declared `required: false` and
the conditional rule is documented in their `description`s. This is the same
limitation tracked for conditional flow in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md); when a
conditional mechanism is adopted, a new schema version should encode the rule
directly.

## What is NOT yet independently verified

- The exact **field order and labels** of the live online Mover's Guide were not
  captured screen-by-screen; `label`/`sourceRef` annotations are indicative,
  derived from the public "Standard Forward Mail" page and PS Form 3575, not a
  verbatim transcription of the current online flow.
- Constraint patterns (state, ZIP, phone) are reasonable encodings consistent with
  the rest of the registry, not citations of a published USPS validation rule.
- The **identity-verification fee** and current pricing are deliberately not
  encoded as data (they change); the document points consumers to the live source.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field, step 3 flow), confirms the source is
authoritative, resolves any discrepancy by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the outcome
here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
the Change of Address process carries an identity-verification fee and is
pricing-sensitive. Re-check the source on or before that date and on any
`source.url` change.
