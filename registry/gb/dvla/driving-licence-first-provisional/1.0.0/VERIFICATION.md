# Verification record — `gb/dvla/driving-licence-first-provisional` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official
sources below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed
against the live authenticated flow at
`apply-for-driving-licence.service.gov.uk` or a live scan of form D1 itself.
It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/driving-licence-first-provisional` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA).
- **Primary source URL:** <https://www.gov.uk/apply-first-provisional-driving-licence>
  (fetched live, 2026-07-01) — eligibility (age, eyesight, residency),
  application channels (online vs. by post), fees, payment methods, and the
  post-application confirmation-email statement.
- **Secondary source URL:** <https://www.gov.uk/id-for-driving-licence>
  (fetched live, 2026-07-01) — identity-verification categories (UK passport,
  UKVI share code, other accepted documents) and the countersignatory rules.
- **Tertiary/weak source (not an official DVLA field list):** third-party
  PDF-form-filler summaries of form D1's section structure (personal details,
  eyesight, licence categories wanted, previous licence details, medical
  declaration Part A/Part B), used only to confirm that a medical-condition
  declaration section exists on the paper channel. No official, independently
  reachable, line-by-line D1 field specification was found or used.
- **Official form id:** D1 ("Application for a driving licence"), by-post
  channel only — available at Post Offices, not published as a downloadable
  PDF (same access pattern as the sibling
  `gb/dvla/driving-licence-renewal-photocard`'s D1 pack). The online channel
  has no form number.
- **Retrieved / reviewed:** 2026-07-01.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "be at least 15 years and 9 months old" | `dateOfBirth` |
| "have been given permission to live in Great Britain... for at least 185 days" | `residencyMeetsRequirement` |
| "be able to read a number plate from 20 metres away" | `eyesightMeetsStandard` |
| Online channel: £34, arrives within a week, MasterCard/Visa/Electron/Delta debit or credit card | `applicationChannel`, `paymentMethod` |
| By-post channel: form D1 from a Post Office, £43 by cheque or postal order | `applicationChannel`, `paymentMethod` |
| "DVLA will send you a confirmation email once you've applied" | `email` |
| "You'll be told when you sign in if you need to prove your identity... using photo ID like a passport" | `identityVerificationMethod` |
| UK passport: "Write the 9-digit passport number on the application form" | `identityVerificationMethod = uk_passport`, `ukPassportNumber` |
| UKVI share code as a digital identity-verification route | `identityVerificationMethod = ukvi_share_code`, `ukviShareCode` |
| Countersignatory must hold a valid GB photocard licence, be UK resident, know the applicant personally, not be a relative or housemate | `identityVerificationMethod = other_document_with_countersignatory`, `countersignatoryName`, `countersignatoryLicenceNumber` |

## What is NOT independently confirmed (out of scope)

- **The full D1 form field list.** Only the medical-declaration gate
  (`medicalConditionDeclared`) is modelled; the specific notifiable
  conditions, the Part A/Part B branching, and any DVLA medical questionnaire
  are out of scope pending a review pass against an official DVLA-published
  field list (not a third-party form-filler summary).
- **Applicant biographic detail beyond name and date of birth** — e.g. sex,
  place of birth, previous surname, National Insurance number, address — is
  not confirmed for this specific service and is **not modelled**, unlike the
  sibling renewal schema which had its applicant-detail fields drawn from a
  service the reviewer could partially read pre-login. `title` is included by
  analogy with that sibling and is flagged as **not independently
  re-confirmed** for the first-application service specifically (see its
  field `sourceRef`).
- **Photo capture** (upload vs. reuse of an existing passport photo) is not
  modelled. The identity-verification sources describe *identity documents*,
  not a photo-capture step, and no source read during this pass confirmed
  whether/how a photograph is collected for a first application. A future
  minor version should add this once the online service's pre-login screens
  (or an official D1 scan) can be read directly.
- **Licence categories applied for** (e.g. category B car, category A
  motorcycle) are not modelled; no source read during this pass stated
  whether the first-provisional application itself asks the applicant to
  select categories, or whether a provisional licence is issued with a fixed
  standard category set.
- **The online service's authenticated screens.** Unlike
  `gb/dvla/driving-licence-renewal-photocard`, whose `before-you-start` /
  `before-you-continue` pre-login screens were reachable at authoring time,
  the equivalent first-provisional start URL returned HTTP 404 when tried
  during this pass; no pre-login screen content could be read for this
  service.

## Scope and jurisdiction notes

- **Great Britain residents only.** Like the sibling renewal schema,
  Northern Ireland has its own separate service; this document is GB-only
  (`jurisdiction.level: national`, matching the GB DVLA convention).
- **First application only.** Renewal of an existing licence is out of scope
  here — see the already-published `gb/dvla/driving-licence-renewal-photocard`.
- **Fees are intentionally not encoded as amounts**, consistent with every
  other `gb/dvla/*` and `gb/hmpo/*` reference schema. The £34/£43 figures
  quoted above are qualitative context recorded in this file and in field
  descriptions, not authoritative validation data.
- **Not time-versioned.** Applying GSP-0005 §2's coexistence test: this
  process does not encode a year-varying value, so this is a plain `v1.0.0`
  document, not an edition-axis schema.
- Conditional requiredness (`identityVerificationMethod`-gated fields,
  `applicationChannel`-gated `email`) is expressed with `requiredWhen`
  (GSP-0013), not left to field-description prose, since this document
  targets spec v0.3.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 field-by-field against the live authenticated online flow and
an officially-sourced D1 form scan specifically, resolves the open items
above (most importantly the medical-declaration detail and any missing
biographic/photo fields) by shipping a **new schema version** if discrepancies
are found (immutability — VERSIONING §3), and records the outcome here.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
