# Verification record — `gb/hmpo/passport-application-first-adult` v1.0.0

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
screen-by-screen against the live HM Passport Office apply flow (behind a "Start
now" interactive journey). It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `gb/hmpo/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** His Majesty's Passport Office (HMPO)
- **Primary source URL:** <https://www.gov.uk/apply-first-adult-passport>
- **Related documents page:** <https://www.gov.uk/apply-first-adult-passport/documents-you-need-to-apply>
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Relationship to the published renewal reference

This is the **sibling** of the published `gb/hmpo/passport-renewal-adult` reference.
A first application reuses the renewal's name / date-of-birth / photo cluster and
**adds the first-time identity evidence** a renewal does not need:

- **parents' details** (`parent*`) to establish British nationality;
- a **birth certificate** and supporting **identity documents**
  (`birthCertificateFile`, `supportingIdentityDocumentsFile`);
- a **person who confirms the applicant's identity**
  (`identityConfirmerName`, `identityConfirmerEmail`) — the online equivalent of a
  countersignatory.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Eligibility: **British national, aged 16+** (or within 3 weeks of 16), **never held a UK passport** (or last issued before 1 Jan 1994) | `dateOfBirth`, `parent*` (described) |
| **£102 online / £115.50 paper** fee | (fee intentionally not encoded — see below) |
| A **digital photo** is required | `photoFile` |
| **Documents** must be sent to confirm identity and nationality | `birthCertificateFile`, `supportingIdentityDocumentsFile` |
| A **person must confirm your identity** | `identityConfirmerName`, `identityConfirmerEmail` |
| Name, previous names, date and place of birth, address, contact | core fields |

The **fee** is deliberately **not encoded as data** (pricing changes and is
published on the live source), consistent with the registry's fee treatment.

## Conditional requiredness (not encoded structurally in v0.1)

- `previousName` is required only when `hasPreviousName` is true.
- `addressPostcode` is required for UK addresses and omitted for overseas ones
  (`addressCountry` distinguishes them).

Declared `required: false` with the rule in the field `description` — the v0.1
conditional-required limitation tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md).

## What is NOT yet independently verified

- The exact **field order and labels** of the live flow were not captured
  screen-by-screen; annotations are indicative, derived from the guidance and the
  linked "documents you need to apply" page.
- The precise **document checklist** varies by personal circumstance (e.g.
  naturalised citizens, parents' nationality at the applicant's birth). This schema
  models the common evidence; the full conditional checklist is described, not
  enumerated, and should be re-confirmed at `verified` time.
- `parent*` is modelled as a single parent's details in flat fields; capturing both
  parents and their nationality at the applicant's birth needs the nested field
  model deferred in SPEC §12.
- The `sex` enum encodes the passport's recorded values; it is not a citation of a
  published HMPO option list.

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service, resolve any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months);
the fee makes this pricing-sensitive. Re-check on or before that date and on any
`source.url` change.
