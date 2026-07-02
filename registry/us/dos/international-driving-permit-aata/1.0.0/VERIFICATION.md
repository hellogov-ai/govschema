# Verification record — `us/dos/international-driving-permit-aata` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

This document is a **coarser** structural reference than its companion
`us/dos/international-driving-permit-aaa`: AATA's live application form
(aataidp.com/application) is a client-rendered page whose field-by-field
content could not be captured with a plain fetch, so the fields below are
derived from AATA's public informational pages (steps, FAQ, application &
shipping, payment methods) rather than the live form itself.

## Source examined

- **Document `(id, version)`:** `us/dos/international-driving-permit-aata` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Department of State (DOS), operated by the American
  Automobile Touring Alliance (AATA) per [GSP-0020](../../../../../spec/proposals/0020-treaty-authorized-third-party-issuers.md)
- **Primary sources:**
  - <https://www.aataidp.com/idp-steps> — three-step application overview
  - <https://www.aataidp.com/faq> — eligibility, validity period, application-channel FAQ
  - <https://www.aataidp.com/application-and-shipping> — shipping methods/costs, restricted-destination list
  - <https://www.aataidp.com/payment-methods> — accepted payment methods, fee mentions
- **Retrieved / reviewed:** 2026-07-02 (all four pages fetched live at authoring time)
- **Reviewer:** GovSchema Engineering (Founding Engineer, initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **Eligibility** — 18+, valid U.S. driver's license (foreign license does not qualify, U.S. citizenship not required) | `applicantIsAtLeast18`, `holdsValidUSLicense` |
| **Three-step process** — digital passport photo, digital license images (front/back), online application | `digitalPassportPhotoProvided`, `driversLicenseFrontImageProvided`, `driversLicenseBackImageProvided` |
| **Online-only channel** — no mail or in-person option (unlike the companion AAA schema) | modeled by the absence of an `applicationMethod` field; every field here is online-only |
| **Shipping** — five tiers (domestic priority/express, international standard/priority/priority-select) with published costs, and a named restricted-destination list | `shippingRecipientName`, `shippingAddress`, `shippingMethod` |
| **Fees** — $20 permit fee, $9 photo-processing fee | `permitFeePaid`, `photoProcessingFeePaid` |
| **Payment methods** — cards (Visa/Mastercard/Amex/Discover/JCB/UnionPay), Apple Pay, ACH | `paymentMethod` |
| **Validity** — one year from issuance, must reapply annually, valid only alongside the current U.S. license | recorded in `title`/`description`, not encoded as a field (not applicant-supplied data) |

## What is NOT yet independently verified

- **Exact field names/order of the live online application** (aataidp.com/application)
  were not captured — the page renders its form client-side and a plain fetch
  returns only the informational shell. Fields in this schema are
  process-level (derived from the steps/FAQ pages), not a verbatim
  transcription of the live form.
- Whether AATA's form separately asks for **date of birth, license
  expiration date, or a "full name matching license" field** in exactly that
  shape (as opposed to, e.g., deriving some of this from the uploaded license
  images via OCR) was not confirmed; these are modeled by analogy to the
  identical federal/treaty requirement AAA's own printed form documents
  explicitly, since both issuers operate under the same DOS authorization.
- **Processing time** ("1-4 days" per third-party sources found during
  research) was not confirmed on an AATA-owned page examined here and is
  therefore not encoded as schema data.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live aataidp.com/application
online form — likely requiring a browser-driven walkthrough rather than a
plain fetch — step 3 flow), confirms the source is authoritative, resolves
any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus
sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months): fees, shipping tiers, and the restricted-destination list on this
surface change periodically. Re-check the source on or before that date and
on any `source.url` change.
