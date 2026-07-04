# Verification record — `nz/dia/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from a **directly-read primary source**: the full text
of the official Form PAS310 (edition dated 31 January 2025), read page by page,
corroborated by the live `govt.nz` and `dia.services.govt.nz` guidance pages.
This gives it stronger direct-source grounding than the sibling
`nz/dia/passport-renewal-adult` v1.0.0, whose applicant-field section relied on
secondary corroboration because its own form PDF could not be retrieved. It
remains `draft`, not `verified`, pending an independent second reviewer's
field-by-field pass against a live session.

## Why this gap existed

A per-jurisdiction × per-vertical catalog review (GOV-1051 research cycle,
2026-07-04) found that `registry/nz/dia` published only
`passport-renewal-adult` and `realme-verified-identity` — no first-time
application, unlike every other jurisdiction with a published passport document
(US, GB, IE, AU, CA all have both a first-time application and a renewal). This
document closes that gap. It was added directly at `published` in
`discovery/catalog.json`, since no `candidate` entry for it existed beforehand.

## Source examined

- **Document `(id, version)`:** `nz/dia/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Internal Affairs, New Zealand Passports (DIA)
- **Primary source URL:** <https://www.govt.nz/browse/passports-citizenship-and-identity/get-or-renew-a-new-zealand-passport/apply-for-a-new-adult-passport/>
- **Official form id:** `PAS310` (Application for a New Zealand Passport — Adult; 31 January 2025 edition)
- **Retrieved / reviewed:** 2026-07-04
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

`passports.govt.nz` again returned `HTTP 403` to every direct/automated fetch
attempted (both the live PDF URLs and the guidance pages), the same recurring
gotcha recorded for `nz/dia/passport-renewal-adult` and `nz/dia/realme-verified-identity`
(see `[[gov-form-pdf-extraction]]` in engineering memory). Unlike those two
documents, this cycle located an **exact Wayback Machine capture of the live
PDF itself**: the CDX API (`web.archive.org/cdx/search/cdx?url=passports.govt.nz/__data/assets/pdf_file/0018/19602/adult-new-v2.pdf`)
returned a 21 February 2025 snapshot of the same file served by the live site,
confirmed by URL match. That snapshot (`https://web.archive.org/web/20250221015729/https://www.passports.govt.nz/__data/assets/pdf_file/0018/19602/adult-new-v2.pdf`)
was fetched directly (no block on `web.archive.org` via `curl`) and its full
text extracted page-by-page with `pdfjs-dist` (the same tool used across this
registry for CID/glyph-encoded and access-blocked PDFs). Every field, section
number, and label cited in this schema's `sourceRef` values was read verbatim
from that extraction, not inferred from prose summaries.

Two supporting pages were fetched directly (no block):

- `govt.nz` — "Apply for your first adult passport": eligibility (16+, NZ
  citizen), online vs. paper channel description, fee (NZD 247).
- `dia.services.govt.nz` — "Getting started": corroborates the online
  channel's field set (name, DOB, place of birth, gender, height, eye colour,
  contact details) and flags a first-time-applicant-specific extra: an online
  **live camera identity check**, distinct from the passport photo.

## What was confirmed directly (verbatim, from PAS310's own text)

- **Section 1** (personal details): surname, first/middle names, place and
  date of birth, gender (Male/Female/Gender X), height (cm), eye colour.
- **Section 2** (entitlement): the four tick-box bases — born in NZ; born in
  Niue/Cook Islands/Tokelau (birth-certificate document required only for a
  first-time applicant); citizenship by grant or descent (certificate number,
  no document required); entitlement for another reason (supporting evidence
  required) — and the exact document requirements per basis, from the page-8
  checklist table.
- **Section 3** (names at birth): mother's name at the applicant's birth,
  mother's own maiden name, father's name at the applicant's birth.
- **Section 4** (contact and delivery): home address fields, phone/email, and
  the delivery-address-if-different branch, including the PO-Box-vs-street
  distinction for international courier delivery.
- **Section 10** (emergency contact) and **Section 11** (applicant
  declaration): read verbatim, including the exact declaration text.
- **Section 12** (witness/identity referee): passport number, years known (1+
  required), name, date of birth, address, phone — and the eligibility
  declaration (16+, known 1+ year, not related/spouse/same-address, valid NZ
  passport), which **independently corroborates, word for word**, the BDM76
  Identity Referee Declaration already read for the renewal sibling.
- **Section 13** (fees/payment): the three service levels (standard, urgent —
  up to 3 working days, callout — by appointment) and the two paper-channel
  payment methods (card, EFTPOS in person). Fee amounts are intentionally not
  encoded as schema data (they change); see the `processingSpeed` /
  `paymentMethod` field descriptions.

## What is out of scope for v1.0.0

- **Name-change pathways** (PAS310 sections 6 and 7 — marriage/civil union,
  statutory declaration/deed poll): gated out entirely via the
  `nameChangedSinceBirth` eligibility field. An applicant who has changed
  their name before their first passport must use the paper form's full
  sections 6/7 directly; the associated original-certificate documents are
  not modelled here.
- **Statutory declaration edge case** (PAS310 section 8): triggered only when
  someone else completes the form for an applicant with a disability/language
  difficulty, or when the applicant wears a head covering/headband for
  religious or medical reasons in their photo. Left unmodelled to keep this
  document scoped to the common case of a competent adult applicant
  completing their own application; flagged here rather than in the schema so
  a future revision can add it deliberately.
- **The online channel's live camera identity check**: `dia.services.govt.nz`
  states first-time online applicants need "a device with internet access and
  a camera" for an online identity check distinct from the passport photo.
  This document does not model that check as a field (its data shape was not
  independently observed, only described in prose); it is noted here as a
  known online-channel-only step.
- **Address decomposition for third parties**: the identity referee's and
  emergency contact's addresses are each collapsed into a single free-text
  field, unlike the applicant's own home/delivery addresses which mirror the
  source form's unit/street/suburb/city/postcode/country breakdown. This is a
  deliberate scope compression — an agent validating a third party's postal
  address does not need the same structural precision it needs for its own
  user's delivery address.
- **Exact digital-photo pixel/byte specification**: PAS310 (a paper form) only
  specifies print dimensions (35mm x 45mm) and paper-quality rules; the
  online channel's digital equivalent (as flagged for the renewal sibling) is
  not independently confirmed here either.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-derive the same Wayback capture (or a fresh, unblocked fetch
of `passports.govt.nz`) and re-check every `sourceRef` against it field by
field, confirm the current fee schedule and photo digital-file specification
against the live site, and decide whether the statutory-declaration edge case
and the online live-identity-check step should be folded into a future
revision. Record the outcome here before setting `status: verified`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): passport applications are fee/policy-sensitive, and this record's
reliance on a year-old Wayback snapshot (rather than a live fetch) for the
form's own text argues for the shorter end of the cadence. Re-check the
source, and confirm no newer PAS310 edition has been published, on or before
that date and on any `source.url` change.
