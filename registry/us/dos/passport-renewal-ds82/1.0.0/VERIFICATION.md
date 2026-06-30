# Verification record — `us/dos/passport-renewal-ds82` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded. It therefore remains `draft`, not `verified`. Consumers SHOULD treat this
as an accurate, source-grounded structural reference, not a load-bearing
description of the live process.

## Source examined

- **Document `(id, version)`:** `us/dos/passport-renewal-ds82` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (DOS)
- **Primary source URL:** <https://travel.state.gov/en/passports/renew-replace/mail.html>
- **Official form id:** `DS-82`
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

The **eligibility conditions** are taken from the official "Renew Your Passport by
Mail" page. You can renew by mail with Form DS-82 only if *all* of the following
hold; the document models each as a boolean in the `eligibility` step:

| Source condition | Field |
|---|---|
| Most recent passport has never been reported lost or stolen | `passportLostOrStolen` (must be `false`) |
| Issued within the last 15 years | `passportIssuedWithin15Years` |
| Issued at age 16 or older and valid for 10 years | `passportIssuedAge16OrOlder` |
| You can submit your most recent passport with the application | `canSubmitMostRecentPassport` |
| Issued in current name, or name change is documentable | `nameMatchesOrHaveDocumentation` |
| Not damaged other than normal wear and tear | `passportUndamaged` |

Child restriction confirmed: a passport for a child under 16 cannot be renewed by
mail — folded into `passportIssuedAge16OrOlder` and its `description`.

**Eligibility routing rule (not encoded structurally in v0.1).** If any condition
above fails, the applicant is **not** eligible to renew by mail and must apply in
person. The GovSchema v0.1 flow model (`steps`) is *linear* and cannot express this
conditional branch, so the rule is recorded here and in each eligibility field's
`description` rather than as a flow transition. Conditional flow is the first
tracked additive proposal,
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md); when adopted,
the `apply_in_person` branch should be restored as a real transition in a new
schema version.

Required submission items confirmed from the source and modelled as fields:
completed DS-82, most recent passport (`canSubmitMostRecentPassport`), one
photograph (`photo`), payment by check or money order (`paymentMethod`), and a
name-change document when applicable (`nameChangeDocument`).

## What is NOT yet independently verified

- The **applicant input fields** (`lastName` … `paymentMethod`) reflect the
  structure of Form DS-82 but were not yet confirmed item-by-item against the live
  PDF; the `sourceRef` annotations are indicative, not authoritative.
- Constraint patterns (SSN, passport number, ZIP, phone) are reasonable encodings,
  not citations of a published validation rule from the source.
- The original source models composite inputs (e.g. mailing address) and labelled
  choices richly; v0.1's flat field model represents the address as several
  `mailingAddress*` fields and enum choices as `validation.enum` values with the
  human labels folded into `description`. Nested fields and labelled options are
  deferred (SPEC §12).
- **Fees and processing times** are deliberately not encoded as data (they change
  frequently); the document points consumers to the live source instead.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison), confirms the source is authoritative, resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice Procedure
step 5), and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
passport renewal is a fee/policy-sensitive process. Re-check the source on or
before that date and on any `source.url` change.
