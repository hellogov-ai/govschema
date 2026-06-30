# Verification record — `gb/dvla/driving-licence-renewal-photocard` v1.0.0

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
screen-by-screen against the live DVLA renewal service (behind a "Start now"
interactive journey using GOV.UK One Login). It therefore remains `draft`, not
`verified`.

## Source examined

- **Document `(id, version)`:** `gb/dvla/driving-licence-renewal-photocard` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA)
- **Primary source URL:** <https://www.gov.uk/renew-driving-licence>
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Official DVLA online renewal service; **£14** online fee | (fee intentionally not encoded — see below) |
| Renew the **10-year photocard** (driver number on the photocard) | `drivingLicenceNumber` |
| Must be a **resident of Great Britain** and not disqualified | eligibility (described) |
| **Cannot renew online if your name or title has changed** | `noNameOrTitleChange` |
| New licence sent to the **address** held / supplied | `address*` |
| Photo can be **reused from a valid UK passport** record | `photoSource`, `passportNumber` |
| Old photocard must be **sent to DVLA** after renewal | post-issue step (described) |

The **£14 fee** is deliberately **not encoded as data** (pricing changes and is
published on the live source), mirroring the registry's treatment of the USPS
identity-verification fee. The eyesight/medical declaration is modelled as a
single confirmation field, not the full medical-condition questionnaire.

## Conditional requiredness (not encoded structurally in v0.1)

- `passportNumber` is required only when `photoSource` is `reuse_passport_photo`.

This is declared `required: false` with the rule documented in the field
`description` — the v0.1 conditional-required limitation tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md).

## What is NOT yet independently verified

- The exact **field order and labels** of the live One Login–based flow were not
  captured screen-by-screen; annotations are indicative.
- The **driver-number pattern** encodes the well-known 16-character DVLA format
  (5 surname + 6 date-encoded + 2 initials + 1 check + 2 issue); it is a structural
  encoding, not a citation of a published DVLA validation rule.
- Constraint patterns (National Insurance number, UK postcode) are pragmatic
  encodings consistent with the rest of the registry.

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service, resolve any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months);
the fee makes this pricing-sensitive. Re-check on or before that date and on any
`source.url` change.
