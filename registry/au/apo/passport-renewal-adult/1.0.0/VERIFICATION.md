# Verification record — `au/apo/passport-renewal-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from official `passports.gov.au` pages**, retrieved
indirectly (see Access constraint below), for eligibility, photo, identity-document,
and fee/payment-channel facts. The applicant/contact/current-passport field set —
the part of the process that lives inside the authenticated AusPassport online
portal, which this review could not reach at all — is modelled on the shared
pattern already published for `gb/hmpo/passport-renewal-adult`,
`ie/dfa/passport-renewal-adult`, and `ca/ircc/passport-renewal-simplified`, cross-checked
against secondary renewal-process walkthroughs. The full field-by-field comparison
the practice requires (`manual-source-review-v1` → Procedure step 2, against the
live online form) has **not** been completed and recorded, so this remains
`draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `au/apo/passport-renewal-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Australian Passport Office (APO), Department of Foreign Affairs and Trade
- **Primary source URL:** <https://www.passports.gov.au/adult-passport>
- **Official form id:** `PC7` (Australian passport application — adult)
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint

Both `passports.gov.au` and `dfat.gov.au` (govCMS/Akamai-hosted) completed a TLS
handshake for direct automated retrieval but then hung until timeout on every
page request, for both `curl` and the fetch tool — a silent-drop pattern, not an
explicit `403`/`429` like the blocks recorded for `passports.govt.nz` (NZ) or
`dfa.ie` (IE). Direct retrieval of every `passports.gov.au` page and of the
AusPassport online-application portal itself (`online.passports.gov.au`, which
requires an authenticated session regardless) was therefore not possible from
this environment.

The **Wayback Machine** (`web.archive.org`) was not blocked and served recent,
directly-readable HTML snapshots of the official pages, which were retrieved and
read in full:

- `passports.gov.au/adult-passport` — snapshot dated 2026-06-26
- `passports.gov.au/help/passport-photos` — snapshot dated 2026-03-15
- `passports.gov.au/help/identity-documents-you-need` — snapshot dated 2026-03-15
- `passports.gov.au/Fees` — snapshot dated 2025-05-16 (older; fee figures on this
  snapshot are dated "as of 1 January 2025" and are known to be superseded — see
  below)

One directly relevant **primary-source PDF hosted on a `.gov.au` domain** was also
retrieved and read in full: `Checklist_Adult_Mailed-in_Renewal.pdf`, published by
the Australian Consulate-General in Geneva (`geneva.mission.gov.au`) for the
overseas mail-in variant of adult renewal. It corroborates the general form
structure (an APO-website-generated, printed, signed application form; two
identical printed photos with a hand-written full name on the back in black ink;
no guarantor required) but describes a different lodgement channel (mail to an
overseas post, with a credit-card-authorisation form and an optional upcoming-
travel-dates field) from the domestic Australia-Post-lodgement process this
document models, so those overseas-specific details (the travel-dates field, the
mail-specific credit-card authorisation) are **deliberately not included** here.

## What was confirmed directly (via Wayback snapshots of official pages)

- **Renewal eligibility** (verbatim, `adult-passport` snapshot): a passport is
  renewable if it "have expired or still be valid," "have been issued when you
  were aged 16 or older," "have been issued on or after 1 January 2006," "have
  been issued with at least 2 years' validity," "have your current name, date of
  birth, place of birth and gender," is "not be reported lost, stolen, or
  cancelled," and is "presented when you lodge your application." Encoded as
  `issuedAgeSixteenOrOlder`, `issuedOnOrAfterJan2006`,
  `issuedWithAtLeastTwoYearsValidity`, `personalDetailsUnchanged`,
  `passportNotLostStolenOrCancelled`, `currentPassportStatus`. Notably, APO's
  published criteria state **no maximum time since expiry** for renewal
  eligibility, unlike the 24-month online-renewal windows found in the NZ and CA
  reference schemas — this is a genuine cross-jurisdiction difference, not an
  omission.
- **No referee or guarantor required to renew** (verbatim: "You don't need a
  referee or guarantor to renew your passport"), distinguishing renewal from a
  new/first-time application, which does require one. This document therefore
  has no referee/guarantor fields, unlike the `nz/dia/passport-renewal-adult`
  precedent (whose online channel does require one).
- **Process**: online form via the application portal, printed on A4 portrait in
  black ink, then lodged in person at a participating Australia Post outlet with
  the current passport, photos, and any requested supporting documents; or a
  pre-filled paper form obtained by phone.
- **Photo specifications** (verbatim, `passport-photos` snapshot): 35-40mm wide,
  45-50mm high, face (chin to crown) 32-36mm, less than 6 months old, colour,
  dye-sublimation print on ≥200gsm glossy paper, plain white/light background,
  neutral expression, no glasses absent a medical exemption (B-11 form
  alternative). Encoded in `photo`'s description.
- **Sex marker options**: `passports.gov.au`'s own page path
  (`.../sex-and-gender-diverse-passport-applicants`) and its indexed summary
  confirm Australian passports record M, F, or X in the "Sex" field, and that
  applying with a different marker than a current passport requires a new
  passport application rather than renewal. Encoded as `sex`.
- **Fee/payment channel** (verbatim, `Fees` snapshot, dated 1 January 2025): "At
  Australia Post - EFTPOS, MasterCard, Visa, AMEX or cash." Encoded as
  `paymentMethod`'s enum. The specific dollar fee amounts on that snapshot are
  **not** encoded as schema data (per convention) and are known to be stale — a
  July 2026 secondary source quotes a higher current adult 10-year fee; the
  `passportValidityRequested` and `processingSpeed` field descriptions point
  consumers to the live source rather than encoding a number.
- **Passport validity choice**: the same `Fees` snapshot lists a "10-year
  validity passport (for persons aged 16 and over)" and a "5-year validity
  passport (optional for persons 75 and over)" as distinct line items, confirming
  a real applicant choice. Encoded as `passportValidityRequested`.
- **Processing speed options** (verbatim, `adult-passport` snapshot and `Fees`
  snapshot): routine (at least 6 weeks), "Priority (2-day processing)," and
  "Fast Track (5-day processing)," each requiring a complete application and
  excluding postage/delivery time. Encoded as `processingSpeed`.
- **Identity documents**: the `identity-documents-you-need` snapshot confirms
  that document-category requirements (birth certificate, citizenship
  certificate, Category A/B/C documents) apply to new/first-time and replacement
  applications; the renewal path instead only requires presenting the current
  passport itself, which this document already models via
  `currentPassportNumber`/`currentPassportIssueDate`/`currentPassportExpiryDate`.
  No separate identity-document fields were added for renewal.

## What was corroborated across secondary sources (2+ each), not read from a primary AusPassport form

- **Applicant identity fields collected**: surname, given names, date of birth,
  place of birth (city and country), sex, residential address, email, and phone
  — modelled on the field pattern already published for
  `gb/hmpo/passport-renewal-adult`, `ie/dfa/passport-renewal-adult`, and
  `ca/ircc/passport-renewal-simplified`, and corroborated by independent renewal
  walkthroughs (`edvisehub.com`, `australiainsight.com`, `wise.com`) describing an
  AusPassport account, online personal/contact-detail entry, and a printed
  signed form. `sourceRef` annotations naming "Application form — ..." are
  indicative section groupings by analogy to the sibling schemas' documented
  form sections, **not** citations of a directly-read `PC7`/online-portal field
  layout.
- **Australian state/territory address structure** (`residentialState`'s
  8-value enum) reflects the standard ISO 3166-2:AU subdivision list, not a
  citation of the AusPassport form itself.

## What is NOT yet independently verified

- **The exact online-portal field labels, order, and requiredness** — the
  AusPassport application portal (`online.passports.gov.au`) requires an
  authenticated session and was not reached by this review at all. Every
  applicant/contact/current-passport field in this document is inferred by
  analogy to sibling passport-renewal schemas and secondary walkthroughs, not
  read from the live form.
- **Passport number format** (`currentPassportNumber`'s `7,9`-character pattern)
  is inferred from general knowledge of the current Australian passport number
  format, not confirmed against a primary source.
- **Whether `residentialAddressLine2` is genuinely optional** on the live form
  (rather than a fixed two-line address block) is assumed from typical AU
  address-form conventions, not confirmed against the primary source.
- **Current fee amounts** are deliberately not encoded (see above); the `Fees`
  Wayback snapshot itself is already ~14 months stale relative to this review
  date.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs an unrestricted
network path to `passports.gov.au` (or a manual browser session) to (a) confirm
the current-page eligibility, photo, and fee text against a live rather than
archived snapshot, and (b) — the larger gap — obtain access to the AusPassport
online-portal form itself (e.g. by creating a test account) to apply
`manual-source-review-v1` Procedure step 2 (field-by-field comparison) and step 3
(flow comparison) against the actual online form rather than the sibling-schema
analogy used here. Record the outcome here before setting `status: verified`
with a current `verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0
record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): passport renewal is a fee/policy-sensitive process, and this record's
reliance on portal-inaccessible, by-analogy field modelling argues for the
shorter end of the cadence. Re-check the source on or before that date and on
any `source.url` change.
