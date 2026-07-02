# Verification record — `au/nsw/service-nsw/driver-licence-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official service.nsw.gov.au and nsw.gov.au
driver-licence guidance pages listed below. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `au/nsw/service-nsw/driver-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Transport for NSW ("TfNSW"), delivered through Service NSW.
- **Primary source:** "Renew or upgrade a NSW driver licence" —
  <https://www.service.nsw.gov.au/transaction/renew-or-upgrade-a-nsw-driver-licence>
  — fetched live as **raw HTML** (not a summarized fetch) and converted to
  plain text for direct quotation, 2026-07-02. This page supplied: the full
  "Eligibility" bullet list, the complete "Reasons you may not be able to
  renew or upgrade online" list, licence-class names and terms (P1: 18
  months; P2 Car/LR/MR/HR: 3 years; P2 Rider: 30 months; full licence: 1, 3,
  or 5 years), the eyesight-requirement rules (age-based currency for C/R,
  12-month rule for LR/MR/HR/HC/MC, same-day commercial test for PT T011),
  the online renewal steps (MyServiceNSW Account, "Enter your NSW driver
  licence details"), and the "What you need" list (MyServiceNSW Account,
  licence fee or concession details).
- **Secondary source (corroboration):** "How to renew your licence" —
  <https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/renewing-or-replacing-your-licence/how-to-renew-your-licence>
  — fetched via summarized tooling, 2026-07-02 — corroborated the same
  online-eligibility exclusions (10-year term, learner licence, overdue
  medical assessment, combined driver/boat licence, recent address change)
  and licence-term lengths from an independent NSW Government page, not
  Service NSW's own transaction page.
- **Broken-link check:** the primary source page links a "Licence Renewal
  Application – PDF" at
  `https://tfnswforms.transport.nsw.gov.au/45071506-licence-renewal-application.pdf`.
  Fetched directly, 2026-07-02: this URL now serves an HTML "No longer
  exists" page from Transport for NSW, not a PDF. This schema is **not**
  derived from that document (it could not be); it is derived entirely from
  the two guidance pages above, the same "prose guidance page, not a
  fillable form/PDF" shape as `ca/on/mto/drivers-licence-renewal`.
- **Field extraction method:** prose guidance pages, not a fillable
  form/PDF; field names and enum values were derived from the pages' own
  wording (quoted in each field's `sourceRef`), the same method used for
  `ca/on/mto/drivers-licence-renewal`.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "you're aged 17 years or over (up to 70 if your licence class is MC)" | `outsideEligibleAgeRange` |
| "you hold an eligible driver licence that will expire in 6 months or less, or expired no more than 6 months ago"; "your licence expired more than 6 months ago" | `licenceExpiredMoreThanSixMonthsAgo`, `currentLicenceExpiryDate` |
| "you hold a learner driver or rider licence"; "you hold a dual class licence that includes a learner class" | `holdsLearnerLicenceOrDualClassIncludingLearner` |
| "your licence is not subject to any restrictions related to enforcement (...)"; "you have any restrictions on your licence (for example, restricted journey, outstanding fine payment or enforcement)" | `hasLicenceRestrictions` |
| "your up-to-date medical conditions are recorded with Transport for NSW (TfNSW) and your NSW Fitness to Drive medical assessment is not overdue"; "you have a medical assessment that is overdue" | `hasOverdueMedicalAssessment` |
| "you've had your signature and photograph taken by TfNSW within 10.5 years before the new licence expires" | `signatureAndPhotoOlderThanTenPointFiveYears` |
| "your licence has an interlock or Q (temporary overseas visitor) condition." | `hasInterlockOrQCondition` (see honesty flag below) |
| "you meet the eyesight requirements"; Eyesight requirements section; "you don't meet the eyesight requirements" | `failsEyesightRequirements` |
| "you hold a combined driver licence and boat licence" | `holdsCombinedDriverAndBoatLicence` |
| "visit a Service NSW Centre in person if you'd like a 10-year licence (available for drivers aged 21 to 44)"; "you're between 21 and 44 years old and would like a 10-year licence" | `wantsTenYearLicenceTerm` |
| "you hold a Passenger Transport licence code PT T012 – holders are required to pass commercial standard eyesight tests" | `holdsPassengerTransportCodeT012` |
| "you've changed your address within the last 14 days" | `addressChangedWithinLastFourteenDays` |
| "you'd like to apply for a NSW Photo Card at the same time" | `wantsPhotoCardAtSameTime` |
| "your last renewal was done using a photo-kit" | `lastRenewalWasPhotoKit` |
| "you need to complete an older driver assessment" | `needsOlderDriverAssessment` |
| "single class full licence (C, R, LR, MR, HR, HC, MC)"; "dual class licence, both classes full (C, LR, MR, HR, HC, MC combined with R)" | `licenceClass` |
| "Full licence – 1, 3 or 5-year licences only" | `renewalTermYears` |
| "Log in, or create your MyServiceNSW Account. Enter your NSW driver licence details..." | `nswDriverLicenceNumber` (see honesty flag below) |
| "the licence fee, or your concession details" | `eligibleForConcessionFee` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **`hasInterlockOrQCondition` — ambiguous source wording.** The primary
  source's "Eligibility" list is a run of bullets each phrased as a
  qualifying condition using an explicit negation ("your licence is **not**
  subject to..."), except the final bullet: "your licence has an interlock
  or Q (temporary overseas visitor) condition." — no "not", unlike every
  sibling bullet in the same list. Read literally, that would mean *having*
  such a condition keeps you eligible, which contradicts how interlock
  programs and Q-conditioned licences are administered elsewhere (both
  require case-specific, in-person handling). This is modelled
  **conservatively as a disqualifying gate** (a likely wording/negation gap
  on the source page itself, not a transcription error introduced here) —
  flagged explicitly rather than silently "fixed" without a note. A future
  revision should re-check this exact sentence against the live page or an
  independent TfNSW source before asserting it with more confidence.
- **`nswDriverLicenceNumber` — inferred field, not a direct quote.** Neither
  source page names the specific field(s) MyServiceNSW Account collects
  beyond "Enter your NSW driver licence details." This field is included by
  analogy to every other online driver-licence renewal in this registry
  (`ca/on/mto/drivers-licence-renewal`, `us/ca/dmv/drivers-license-renewal`,
  `gb/dvla/driving-licence-renewal-photocard`,
  `nz/nzta/drivers-licence-renewal`), each of which requires the current
  licence number to identify the applicant's record — a reasonable
  inference, not equally well-sourced as the eligibility-list fields.
- **No online payment card types enumerated.** The source's "What you need"
  section names only "the licence fee, or your concession details" and
  links a general "our payment methods" page not fetched for this schema
  (that page describes in-person/phone payment options at service centres,
  not necessarily identical to the online transaction gateway). `paymentMethod`
  is therefore modelled only as `eligibleForConcessionFee`, with no card-type
  enum, rather than guessing plausible options.
- **Scope narrowed to full-licence renewal.** Provisional (P1/P2) licence
  renewal/upgrade has its own fixed terms (18 months, 3 years, 30 months)
  and upgrade-eligibility rules (P1→P2 after 12 months held; P2→full after 2
  years held) distinct from the full-licence 1/3/5-year choice modelled
  here; out of scope for this v1.0.0, the same kind of scope line
  `ca/on/mto/drivers-licence-renewal` drew around G1/G2/M1/M2 learner
  licences.

## Path to `verified`

1. Independently confirm the `hasInterlockOrQCondition` wording against a
   second TfNSW/NSW Government source (or a live re-fetch, in case the
   original page's wording changes) before treating this gate's polarity as
   settled.
2. Drive the live, authenticated `service.nsw.gov.au` renewal flow itself
   (post-login) with a MyServiceNSW test/mock account to confirm the exact
   account-linking field(s) collected, replacing the `nswDriverLicenceNumber`
   inference with a directly observed field.
3. Fetch the "our payment methods" page (or the live payment step) to confirm
   whether the online renewal gateway accepts specific card brands, and
   whether a concession-fee sub-flow asks for any additional identifier
   (e.g. a concession card number).
