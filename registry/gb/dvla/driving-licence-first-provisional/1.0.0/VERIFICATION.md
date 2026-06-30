# Verification record — `gb/dvla/driving-licence-first-provisional` v1.0.0

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
screen-by-screen against the live DVLA service (behind a "Start now" interactive
journey). It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `gb/dvla/driving-licence-first-provisional` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA)
- **Primary source URL:** <https://www.gov.uk/apply-first-provisional-driving-licence>
- **Official form id:** `D1` (paper equivalent of the online application)
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Official DVLA online service; **£34** online fee (£43 by post) | (fee intentionally not encoded — see below) |
| Minimum age **15 years 9 months** | `dateOfBirth` (described) |
| Must be able to **read a number plate from 20 metres** | `eyesightDeclaration` |
| Must have permission to live in Great Britain for **at least 185 days** | `residency185Days` |
| Identity proved with a **UK passport** or by sending **original documents** | `identityDocumentType`, `passportNumber` |
| Name, previous names, date and place of birth, sex | `lastName`, `firstNames`, `hasPreviousName`, `previousName`, `dateOfBirth`, `placeOfBirth`, `sex` |
| Address and address history | `address*`, `addressHistory3Years` |

The **£34/£43 fee** is deliberately **not encoded as data** (pricing changes and
is published on the live source), consistent with the registry's fee treatment.

## Conditional requiredness (not encoded structurally in v0.1)

- `passportNumber` is required only when `identityDocumentType` is `uk_passport`;
  the `other_documents` path instead posts original documents to DVLA.
- `previousName` is required only when `hasPreviousName` is true.

These are declared `required: false` with the rule in the field `description` — the
v0.1 conditional-required limitation tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md).

## What is NOT yet independently verified

- The exact **field order and labels** of the live flow were not captured
  screen-by-screen; annotations are indicative, derived from the guidance page and
  the D1 paper-form structure.
- `addressHistory3Years` is carried as a single text block because the v0.1 flat
  field model has no nested/array element type; richer per-address modelling is
  deferred (SPEC §12).
- The `sex` enum encodes the licence's recorded values; it is not a citation of a
  published DVLA option list.

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service, resolve any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months);
the fee makes this pricing-sensitive. Re-check on or before that date and on any
`source.url` change.
