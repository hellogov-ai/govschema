# Verification record — `us/dos/international-driving-permit-aaa` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from AAA's own printed application form (a
primary source, not a secondary description of one), so field coverage is
higher-confidence than a typical first-pass schema. It remains `draft` because
the live AAA-IDP.com online channel's own screens were not independently
walked through.

## Source examined

- **Document `(id, version)`:** `us/dos/international-driving-permit-aaa` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Department of State (DOS), operated by the American
  Automobile Association (AAA) per [GSP-0020](../../../../../spec/proposals/0020-treaty-authorized-third-party-issuers.md)
- **Primary sources:**
  - <https://www.aaa.com/vacation/IDPapplication.pdf> — AAA's own two-page
    IDP/IADP application PDF, retrieved and read in full (both the applicant
    form page and the participating-country list page).
  - <https://www.aaa.com/vacation/idpf.html> — overview page describing the
    three application channels and their distinct fees/processing times.
- **Retrieved / reviewed:** 2026-07-02 (both sources fetched live at authoring time)
- **Reviewer:** GovSchema Engineering (Founding Engineer, initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **Applicant qualifications** — 18+, valid U.S./territorial license, not suspended/revoked | `applicantIsAtLeast18`, `holdsValidUSOrTerritorialLicense`, `certifiesInformationTrueAndLicenseNotSuspendedOrRevoked` |
| **Three application channels** (in-person, mail, online) with distinct requirements/fees | `applicationMethod`, `mailApplicationLicensePhotocopyAttached`, `onlinePhotoFeePaid` |
| **Identity block** — name (must match license), email, phone, license number/state/expiration, birthplace, DOB | `firstName`…`dateOfBirth` |
| **Address and travel** — home address, foreign address if known, departure date, permit effective date (within 6 months) | `homeAddressStreet`…`permitEffectiveDate` |
| **Permit type** — IDP (Geneva 1949) vs. IADP (Inter-American 1943, Brazil/Uruguay) | `desiredPermitType` |
| **Vehicle class** the permit is issued for, matching the underlying license | `licensedVehicleType` |
| **Requirements** — 2 signed 2"x2" passport photos, $20 fee, mail-only license photocopy, optional expedited postage | `passportPhotosAttached`, `permitFeePaid`, `mailApplicationLicensePhotocopyAttached`, `expeditedReturnPostageAmount` |
| **Certification and signature**, mandatory for issuance | `certifiesInformationTrueAndLicenseNotSuspendedOrRevoked`, `signature`, `signatureDate` |
| **Mail return address** as the physical shipping label | `mailReturnAddress` |
| Online channel's **distinct $10 photo fee** (idpf.html, not on the printed form) | `onlinePhotoFeePaid` |

## Scope boundary

This document models AAA's own paper application (channel-agnostic apart from
the two mail/online-specific fields called out above) and ends at submission.
It does not model AAA-IDP.com's own online-only screens field-by-field, since
those were not independently examined; `onlinePhotoFeePaid` is the one online-
specific fact confirmed from idpf.html. It does not submit the application or
issue the permit — AAA prints and mails/hands over the physical IDP; the live
aaa.com source is always authoritative.

## What is NOT yet independently verified

- The **online channel's own field set** (AAA-IDP.com) was not walked through
  live; this schema assumes it collects the same substantive data as the
  paper form plus the photo fee, which was confirmed from idpf.html but not
  cross-checked field-by-field against the live online form.
- **Processing times and channel-specific fees** (in-person same-day, online
  5 business days + shipping, mail 5-7 weeks) are documented in field
  `description`s/notes only, not encoded as schema data, since they change.
- The **participating-country list** (IDP vs. IADP eligibility per country)
  is real and current as of the source PDF (May 2015 IDP list / January 2009
  IADP list, both reprinted unchanged on the current form) but is not
  reproduced as schema data — `desiredPermitType`'s two enum values are the
  permit categories, not a per-country lookup.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live AAA-IDP.com online channel,
step 3 flow), confirms the source is authoritative, resolves any discrepancy
by shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0
record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months): fees, photo requirements, and channel processing times on this
surface change periodically. Re-check the source on or before that date and
on any `source.url` change.
