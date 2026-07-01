# Verification record — `gb/homeoffice/eta-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live, authenticated UK ETA app / gov.uk apply flow. It
therefore remains `draft`, not `verified`.

## Access constraint

`gov.uk/eta` and `gov.uk/eta/apply` render a thin JavaScript shell to automated
retrieval — the same constraint the sibling `us/cbp/esta-application` document
records. The actual application is completed in the UK ETA mobile app or the
`apply-for-an-eta.homeoffice.gov.uk` flow, neither of which was scraped directly.

## Sources examined

- **Document `(id, version)`:** `gb/homeoffice/eta-application` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** UK Home Office
- **Primary source URL:** <https://www.gov.uk/eta>
- **Official form ref:** UK ETA
- **Supporting sources:**
  - gov.uk/eta/apply (required items: passport, photo, email, payment method)
  - "Electronic Travel Authorisation: caseworker guidance (accessible)" —
    <https://www.gov.uk/government/publications/electronic-travel-authorisation-caseworker-guidance/electronic-travel-authorisation-caseworker-guidance-accessible>
    (the official statement of the suitability/refusal grounds; some questions,
    e.g. the criminal-conviction ones, are given in near-verbatim
    self-declaration wording)
  - Home Office ETA factsheet, April 2026 — eligibility, exemptions, GBP 20 fee,
    validity (multiple journeys, up to 6 months per stay, over up to 2 years or
    until passport expiry)
  - Secondary practitioner summaries (cross-checked, not cited as primary) for
    the immigration-history grounds' plain-language phrasing and for the
    `plannedArrivalDate` travel-details item
- **Retrieved / reviewed:** 2026-07-01 (all pages confirmed live at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Applicant identified by **name, date of birth, nationality, and passport details**, all captured from a passport scan | `lastName`/`firstName`, `dateOfBirth`, `nationality`, `passportNumber`, `passportIssueDate`, `passportExpiryDate` |
| **Email address** required to receive the decision | `email` |
| A **face photo/live scan** is required (except for children 9 and under) | `facialPhoto` |
| A **photo of the passport's biographic page** is required | `passportBiographicPagePhoto` |
| **Criminal-conviction self-declaration questions**, given in near-verbatim wording by the caseworker guidance | `convictedOfCrimeInLast12Months`, `custodialSentenceOver12Months` |
| **War crimes / terrorism / extremism** disclosure and non-conducive refusal ground | `warCrimesTerrorismOrExtremismInvolvement` |
| **Exclusion order / deportation order or decision** refusal ground | `subjectToExclusionOrDeportationDecision` |
| **Immigration history** refusal grounds (overstay, breach of conditions, illegal entry, deception) | `previousUkImmigrationBreach` |
| **Prior ETA cancellation or visitor refusal** refusal ground | `previouslyRefusedOrCancelledUkTravelPermission` |

## What is NOT yet independently verified

- The exact **screen-by-screen field order, labels, and UI wording** of the live
  UK ETA app / apply flow were not captured directly; `sourceRef` annotations
  point to the caseworker guidance and overview pages, not the live form.
- `previousUkImmigrationBreach` **groups several distinct refusal grounds** into
  one field because the live form's exact per-question wording for each was not
  confirmed; a future verification pass may split this into separate fields if
  the live form asks them separately.
- `plannedArrivalDate` is sourced from **secondary application-walkthrough
  summaries**, not the primary gov.uk pages, and is flagged lower-confidence in
  its own field description.
- Whether a **residential address** is collected (unlike the sibling
  `ca/ircc/eta-application`, which does collect one) was not confirmed either
  way by the sources reviewed; no address field is included pending confirmation.
- **Fees** (GBP 20, per the factsheet) are intentionally not encoded as data.
- This document models only an **eligible visitor applying for themselves**; a
  parent/guardian or representative applying on someone else's behalf is out of
  scope, as is the separate `gb/ukvi/standard-visitor-visa` process for
  visa-required nationals.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live, authenticated UK ETA app or
apply flow, step 3 flow), confirms the source is authoritative, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months):
the UK ETA scheme rolled out in phases through early 2026 and its eligibility,
fee, and suitability rules may still be adjusted. Re-check the sources on or
before that date and on any `source.url` change.
