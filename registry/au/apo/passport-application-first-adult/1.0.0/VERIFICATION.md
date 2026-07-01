# Verification record — `au/apo/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** official-source-derived
content, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live passports.gov.au application flow. It therefore remains
`draft`, not `verified`.

## Access constraint

`passports.gov.au` and `dfat.gov.au` block direct automated retrieval at the TLS
layer, the same constraint recorded against the sibling
`au/apo/passport-renewal-adult`. That sibling document reached the official pages
through Wayback Machine snapshots; **this review's tooling could not reach
web.archive.org either**, a stricter constraint. The field model here is instead
corroborated across multiple independent secondary sources — Australian consular
post checklists (e.g. Geneva, Mumbai, UK, USA embassy/consulate pages) and
passport-agent guides — that quote or closely paraphrase the official
passports.gov.au pages, cross-checked against each other for consistency, and
against the sibling renewal schema's already-confirmed applicant/contact/photo/
product field pattern (same authority, same online portal, same Australia Post
lodgement process).

## Sources examined

- **Document `(id, version)`:** `au/apo/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Australian Passport Office (APO), Department of Foreign Affairs
  and Trade
- **Primary source URL:** <https://www.passports.gov.au/new-passport>
- **Official form ref:** PC8 (paper Adult passport application form ref, per
  consular-post checklists; the online application has no separate form number)
- **Supporting official-page topics** (reached via secondary sources quoting
  them, per the access constraint above): `adult-passport` (application steps),
  `identity-documents-you-need` (Category A/B/C PID system), `citizenship`
  (citizenship evidence), `guarantors-referees-and-witnesses` (referee/guarantor
  eligibility), `passport-photos`, `fees` (validity/processing-speed/payment
  options — the fee page is shared with the renewal schema)
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **Citizenship evidence**: full birth certificate (born in Australia, generally before 20 August 1986) vs. citizenship certificate (born overseas, or born in Australia without automatic citizenship by birth) | `bornInAustralia`, `citizenshipEvidenceType` |
| **Identity documents (PID)**: a Category A + Category B pathway, or — with no Category A/B document — a fallback of 3+ Category C documents plus one photo-and-signature document | `identityDocumentPathway`, `categoryCDocumentCount`, `hasPhotoAndSignatureDocument` |
| **Referee** (online application) eligibility: known >12 months, adult Australian citizen, and either a current passport (2+ years' validity) or 12+ months on the electoral roll at their current address | `refereeFullName`, `refereeKnownForOverTwelveMonths`, `refereeIsAdultAustralianCitizen`, `refereeIdentityBasis`, `refereePassportNumber`, `refereeElectoralAddress`, `refereeContactPhone` |
| **Application steps**: gather documents/photos → find a referee/guarantor → complete the form → lodge at Australia Post with original documents and pay → wait (6+ weeks standard) | overall `steps` ordering |
| Shared **applicant/contact/photo/product** field pattern (name, DOB, place of birth, sex, residential address, email, phone, passport photos, validity/processing-speed/payment) | corresponding fields, ported from the published `au/apo/passport-renewal-adult` |

## What is NOT yet independently verified

- The **exact enumerated list** of Category B and Category C identity documents
  (the sources describe the pathway/count rule consistently but not a
  document-by-document list); not encoded, to avoid asserting an unconfirmed
  enumeration.
- The exact **guarantor** (paper-form) requirements — signing section 11, the
  photo endorsement — are recorded on the sibling renewal schema's research but
  this document scopes to the **online referee path only**; a paper-form
  guarantor path is out of scope here.
- The **live screen-by-screen field order and labels** of the AusPassport online
  portal were not captured directly.
- **Fees** are intentionally not encoded as authoritative data.
- This document covers applying **from within Australia** only; applying from
  outside Australia is a separate, out-of-scope process (per
  `help/applying-outside-australia`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live passports.gov.au pages and the
AusPassport online portal, step 3 flow), confirms the source is authoritative,
resolves any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the sources on or before that date and on any `source.url` change.
