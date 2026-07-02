# Verification record — `sg/ica/identity-card-reregistration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** been completed against
the live self-service e-Service itself, because that e-Service is Singpass-
authenticated (see "Why no downloadable form" below). It therefore remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `sg/ica/identity-card-reregistration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration & Checkpoints Authority (ICA), Singapore.
- **Primary source URL:** <https://www.ica.gov.sg/documents/ic/re-registration> —
  "Re-Register Identity Card for 30/55-year-olds" process page. Fetched live,
  2026-07-02 (HTTP 200). Confirms: mandatory re-registration before the 31st
  and 56th birthdays (unless a replacement IC was issued within the prior 10
  years), the one-year window from the date of ICA's digital notification
  (SMS/Singpass app), the one-year grace window for applicants who were
  overseas during the re-registration period, documents required (split by
  citizen vs. permanent resident), fees (S$10 citizens / S$50 permanent
  residents), accepted payment methods (Visa/Mastercard, AMEX, Internet
  Direct Debit, PayNow), 7-working-day processing, 3-month collection window,
  and the "Enquire Application Status" identifiers (IC Number, Date of Issue,
  Date of Birth).
- **Secondary source URL:** <https://www.ica.gov.sg/documents/ic/update_particulars>
  — "Replace Identity Card (Change of Particulars/Damaged)" page. Fetched
  live, 2026-07-02 (HTTP 200). Near-identical document list and process
  structure (same photo/translation/document rules, same Singpass e-Service
  channel, same payment methods), used to cross-check the re-registration
  page's document list is consistent with ICA's standard replace-IC document
  set rather than a one-off page-specific quirk.
- **Tertiary source URL:** <https://www.ica.gov.sg/photo-guidelines> — "Photo
  Guidelines" page. Fetched live, 2026-07-02 (HTTP 200). Confirms photo
  dimensions (400×514px for e-Service upload), accepted formats (jpg, jpeg,
  heic, heif, png), and the 8MB maximum file size.
- **Retrieved / reviewed:** 2026-07-02 (all sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Why no downloadable form, unlike the sibling loss/damage document

`sg/ica/identity-card-replacement` (the loss/damage document) was grounded in
an official downloadable PDF form, since ICA publishes one for that flow.
**No equivalent PDF exists for re-registration** — it was searched for (the
same URL pattern used for the loss form's PDF, and a scan of the
re-registration page's own links) and none was found; the page states plainly
"Login to our e-Service using your Singpass to complete the online
application form," with no paper/PDF alternative offered. The primary
self-service channel itself (`eservices.ica.gov.sg/esvclandingpage/iconline`)
is Singpass-authenticated and returned an HTTP 504 on direct fetch (2026-07-02,
consistent with a login-walled backend, not a page outage — corroborated by
the identical Singpass-gate pattern documented for every other ICA e-Service
in this registry, e.g. `sg/ica/passport-application`, `sg/ica/identity-card-replacement`).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `residencyStatus`, `paymentMethod`, `photo` | **Directly observed** on the live re-registration page and the Photo Guidelines page (fees, payment methods, photo specs). |
| `wantsToAddReligiousName`, `hasNameChangeByDeedPoll`, `wantsToAddMarriedName` (and the corresponding `baptismOrReligiousCertificate`/`deedPollForNameChange`/`marriageCertificate` documents) | **Directly observed**: each maps to one bullet in the re-registration page's "Documents Required" section, split exactly as published between the Singapore-citizen list (baptism/religious certificate, deed poll) and the citizen-and-PR list (marriage certificate). |
| `passportPersonalParticularsPage` document | **Directly observed**: "The page(s) of your current passport which contains your personal particulars" — the sole permanent-resident-specific document on the re-registration page. |
| `email` | **Directly observed**: the re-registration page's own "Processing Time" section states approval notifications are sent "via SMS and email," implying an email address is collected; not itself proof of a labelled form field, but the closest direct evidence available. |
| `dateOfBirth` | **Directly observed**: both the eligibility statement (age-30/55 trigger) and the "Enquire Application Status" identifier list name Date of Birth explicitly. |
| `nricNumber`, `fullName`, `nameInChineseJawiTamil`, `address`, `sex`, `race`, `dialectGroup`, `countryOrPlaceOfBirth`, `nationality`, `contactNumber` | **Inferred by analogy**, not directly observed on this page or any ICA-published field list for this specific flow. These are the same underlying NRIC particulars ICA collects on the sibling `sg/ica/identity-card-replacement` document (independently verified there against the official PDF form), carried over on the reasoning that both documents update the same ICA identity-particulars record via the same e-Service family. This is a materially weaker sourcing grain than the sibling document and is flagged here rather than presented as equivalent rigor. |
| `declarationConfirmed`, `declarationDate` | **Inferred**: no re-registration-specific declaration text is published anywhere (unlike the loss/damage PDF, which has an exact two-paragraph declaration). Modelled as one generic confirmation boolean plus a submission date, following this registry's established fallback for portal-only flows with no published declaration text (see `sg/iras/individual-income-tax-return-formb1`'s `declarationConfirmed`). |

## Modelling decision: review-and-confirm, not from-scratch entry

Unlike the loss/damage flow (where the previous card is gone and the
applicant re-establishes their particulars from a paper trail), a
re-registration applicant already has a valid IC and ICA already holds their
current particulars on file — the notification is scheduled and
system-triggered, not applicant-initiated. The particulars fields in this
schema are therefore best understood as **confirm-or-update** values against
an existing record, the same modelling shape as this registry's "review a
pre-filled return" schemas (`au/ato/individual-tax-return-mytax`,
`sg/iras/individual-income-tax-return-formb1`, `de/finanzamt/income-tax-return-elster`)
rather than a blank intake form. No structural change to the field model was
needed — every field is still optional/required per its own merits — but this
framing is recorded here since the live page's prose does not state it
explicitly; it is a reasonable inference, not a guess, given ICA is the one
sending the notification in the first place.

## Modelling decision: no raw payment-card fields

Consistent with `sg/ica/identity-card-replacement` and
`sg/ica/passport-application`: GovSchema models **which** payment method is
used, not raw cardholder data. `paymentMethod` plus the `reregistrationFee`
payment document capture the fee obligation and accepted methods without
modelling card-capture fields.

## Out of scope

- **Loss/damage replacement** — a distinct document,
  `sg/ica/identity-card-replacement` (already published).
- **First-time registration at age 15** — a distinct ICA process
  ("Register Identity Card for 15-year-olds"), not authored.
- **Change of race** — a distinct, separately-approved process
  ("Information on Change of Race") that must complete *before* a
  re-registration or replacement application if race is affected; out of
  scope here.
- **Physical collection and thumbprint capture at an ICA counter** — a
  collection-logistics step, not an application-data field, consistent with
  the sibling document's exclusion of the same step.

## Test run with mock data

Per this cycle's "complete a test run with valid example mock data"
instruction: the live self-service e-Service requires a genuine Singpass
login and eligibility (an actual ICA-issued digital notification) and
therefore cannot be exercised with fabricated data — there is no public
test/sandbox mode, consistent with every other Singpass-gated flow in this
registry. A conformance packet
(`conformance/sg/ica/identity-card-reregistration/1.0.0/application-packet.json`)
was instead assembled illustrating every field of this schema populated with
a fabricated mock applicant, following this registry's standard conformance-
packet convention for schemas whose live channel cannot be safely or publicly
test-submitted.

## Scope and jurisdiction notes

- **Whole of Singapore.** ICA's identity-card function is national; there is
  no subnational variation.
- **Singapore Citizens and Permanent Residents only**, consistent with NRIC
  eligibility generally.
- **Scheduled age-30/55 re-registration only.** Loss/damage replacement,
  first-time registration, and change of race are distinct documents/processes
  (see "Out of scope" above).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with Singpass access and an
actual pending re-registration notification applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live
`eservices.ica.gov.sg/esvclandingpage/iconline` e-Service flow — in
particular confirming (a) whether the particulars fields are truly
pre-filled/confirm-only as inferred above, (b) the exact declaration
statement text, and (c) whether any additional field exists that this page's
prose does not surface — then ships the correction as a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5) and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
