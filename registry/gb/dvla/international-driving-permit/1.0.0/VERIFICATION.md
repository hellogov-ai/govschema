# Verification record — `gb/dvla/international-driving-permit` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from and cross-checked against the official/primary
sources below. The full field-by-field comparison the practice requires has
been completed once against those sources (this record), but not yet by a
second, independent reviewer — so `status` remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/international-driving-permit` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA); operated by PayPoint
  (GSP-0020 `authority.operatedBy`).
- **Primary sources:**
  - <https://www.gov.uk/driving-abroad/get-an-idp> — eligibility, fee, validity periods.
  - <https://www.gov.uk/driving-abroad/international-driving-permit> — the three
    IDP conventions (1926/1949/1968) and country-specific requirement lookup.
  - <https://www.paypoint.com/instore-services/international-driving-permits> —
    PayPoint's own service page: "Things you will need" checklist, the
    Channel-Islands/Isle-of-Man/foreign-licence/diplomatic-licence eligibility
    exclusion, the passport-photo specification, the country-to-IDP-type table,
    and the FAQ section (including the on-behalf-of-another-person question).
  - PayPoint news releases confirming the DVLA procurement/contract basis
    (`paypointbusiness.com/corporate/news/paypoint-wins-dvla-contract-for-international-driving-permits`),
    used only for the `authority.operatedBy.basis` provenance statement.
- **Official form id:** none. Unlike the US IDP pair
  (`us/dos/international-driving-permit-aaa`/`-aata`, each derived from a
  printed application form), the UK service has no downloadable paper or
  online application form — it is an in-person, over-the-counter transaction
  at PayPoint stores. This document is therefore **guidance-derived**, at the
  same granularity as `gb/dvla/vehicle-tax`: fields transcribe the "what you
  need" checklists and FAQ answers on GOV.UK/PayPoint's own pages, not a form's
  field labels.
- **Retrieved / reviewed:** 2026-07-04 (all sources fetched and read live at
  authoring time; the PayPoint page was fetched and its raw HTML text
  extracted directly, not summarized secondhand).
- **Reviewer:** GovSchema Engineering (Standards Engineer, initial authoring
  source-review).

## A secondary-source claim was checked and rejected

During research, a third-party summary (not a primary GOV.UK/PayPoint source)
asserted that "the licence holder must attend in person (you cannot apply for
someone else)." PayPoint's own FAQ directly contradicts this: "Is someone else
able to apply for an IDP on my behalf? Yes, anyone can apply for an IDP on
your behalf if they have all of your correct documents." This document follows
the primary source and models the on-behalf-of pathway as
`applicantActingOnLicenceHoldersBehalf`, and does not include any
in-person-only constraint.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "You must: live in Great Britain or Northern Ireland / have a full UK driving licence / be 18 or over" | `livesInGBOrNorthernIreland`, `holdsFullGBOrNIDrivingLicence`, `isAtLeast18` |
| "If you hold a driving licence from the Channel Islands, the Isle of Man, a foreign country or drive under a diplomatic licence, you are unfortunately not eligible to apply." | `licenceIsChannelIslandsIoMForeignOrDiplomatic` (eligibility exit) |
| "Things you will need" checklist (licence type, fee, photo, passport for paper licences) | `drivingLicenceType`, `drivingLicenceNumber`, `proofOfIdentityPassportNumber`, `feeAmountGBP`, `paymentMethod`, `passportStandardPhotoAttached` |
| Three IDP conventions (1926/1949/1968) and their validity periods | `idpConventionType` |
| "you cannot apply more than 3 months before you travel" | `intendedTravelDate` (informational) |
| PayPoint FAQ on-behalf-of-another-person answer | `applicantActingOnLicenceHoldersBehalf` |
| Passport-photo specification (full head, colour, light background, no red-eye/shadows/glare, undamaged) | `passportStandardPhotoAttached` description |

## What remains out of scope

- The per-destination-country IDP-type lookup table (150+ rows on PayPoint's
  page) is not modeled as data; `idpConventionType` is left as an applicant
  choice with a description pointing at the checker tools, consistent with how
  the US `desiredPermitType` field models a country-dependent choice without
  enumerating every country.
- No `mapping.json` — there is no online form/screen to map selectors against.

## Next review

`nextReviewBy`: 2027-01-04, or sooner if DVLA changes the appointed issuer,
the fee, or the eligibility rules.
