# Verification record — `gb/co/register-to-vote` v1.0.0

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
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed
screen-by-screen against the live `register-to-vote.service.gov.uk` flow (which is
behind a "Start now" interactive journey). It therefore remains `draft`, not
`verified`. Consumers SHOULD treat this as an accurate, source-grounded structural
reference, not a load-bearing description of the live process.

## Source examined

- **Document `(id, version)`:** `gb/co/register-to-vote` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** Cabinet Office (Electoral Registration)
- **Primary source URL:** <https://www.gov.uk/register-to-vote>
- **Service entry point:** <https://www.registertovote.service.gov.uk/register-to-vote/start>
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Single **nationwide** service, official GOV.UK (Cabinet Office) | document authority/scope |
| **Nationality** determines eligibility and which elections you can vote in | `nationality` |
| **Name** and any **change of name** are collected | `lastName`, `firstName`, `middleNames`, `hasPreviousName`, `previousName` |
| **Date of birth** (register at 16, or 14 in Scotland/Wales) | `dateOfBirth` |
| **National Insurance number** is normally required, but you **can still register without one** | `hasNationalInsuranceNumber`, `nationalInsuranceNumber` |
| **Current address** to be registered at | `address*` |
| **Previous address** collected if you moved recently | `movedInLast12Months`, `previousAddress*` |
| **Open register** opt-out | `openRegisterOptOut` |

## Conditional requiredness (not encoded structurally in v0.1)

- `nationalInsuranceNumber` is required **unless** `hasNationalInsuranceNumber`
  is false (the documented no-NINo path).
- `previousName` is required only when `hasPreviousName` is true.
- `previousAddress*` is required only when `movedInLast12Months` is true.

The GovSchema v0.1 field model has no conditional-required mechanism, so these
fields are declared `required: false` and the rule is documented in their
`description`s — the same limitation tracked for conditional flow in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md). When a
conditional mechanism is adopted, a new schema version should encode the rule
directly.

## What is NOT yet independently verified

- The exact **field order and labels** of the live online flow were not captured
  screen-by-screen; `label`/`sourceRef` annotations are indicative, derived from
  the public guidance page and the established service structure.
- Constraint patterns (National Insurance number, UK postcode) are pragmatic
  encodings consistent with the rest of the registry, not citations of a published
  Electoral Registration validation rule. The postcode pattern accepts the common
  outward/inward forms; it does not implement the full BS 7666 / GOV.UK postcode
  grammar.
- **Nation-specific differences** (England vs. Scotland vs. Wales registration age
  and franchise) are described in field text, not modelled as separate paths.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field, step 3 flow) against the live service, confirms
the source is authoritative, resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5), and records
the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months).
Re-check the source on or before that date and on any `source.url` change.
