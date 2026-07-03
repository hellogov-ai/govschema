# Verification record — `in/morth/learners-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this candidate, why now

This GOV-878 "GovSchema Standard Research" cycle re-confirmed India (opened
as GovSchema's eleventh jurisdiction in GOV-869) has only one published
schema — `in/mea/passport-application-first-adult` — leaving 5 of 6 focus
verticals open for India specifically (DMV, Business Formation, Visa, Taxes,
National ID & Civic Documents), even though the other ten jurisdictions'
matrix is saturated. DMV was chosen first: it is the largest-volume,
best-bounded individual government interaction, and every other jurisdiction
in the registry already has at least one DMV-vertical schema.

India's DMV-equivalent is the Sarathi/Parivahan system run by the Ministry of
Road Transport and Highways (MoRTH) through state Regional Transport Offices
(RTOs). Its single "Form 2" covers 7 distinct services (new Learner's
Licence, new Driving Licence, addition of class, renewal, duplicate, address
change, name change); this document narrows to the **Learner's Licence**
service only, since it is the mandatory, well-bounded gateway every driver
passes through before a Driving Licence — the same narrow-first-schema
convention used for every other jurisdiction's initial DMV/passport/visa
schema (e.g. `nl/rdw/drivers-licence-renewal`, `de/bmi/passport-application`,
`in/mea/passport-application-first-adult`).

## Sources examined

- **Document `(id, version)`:** `in/morth/learners-licence-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Road Transport and Highways (MoRTH), Government
  of India, through the state Regional Transport Offices (RTOs), under the
  Central Motor Vehicles Rules, 1989.
- **Primary source (fetched directly, HTTP 200):**
  <https://parivahan.gov.in/sites/default/files/DownloadForm/cmvr/FORM-2.pdf>
  — the current, amended Form 2 ("FORM OF APPLICATION FOR LEARNER'S LICENCE
  OR DRIVING LICENCE OR ADDITION OF A NEW CLASS OF VEHICLE OR RENEWAL OF
  DRIVING LICENCE OR CHANGE OF ADDRESS OR NAME"), hosted directly on the
  national parivahan.gov.in domain. Confirmed current (not stale) because it
  includes the post-2021-amendment E-Rickshaw/E-Cart and Adapted-Vehicle-
  for-Divyang categories.
  - **Negative check.** A Meghalaya RTO mirror
    (`megtransport.gov.in/pdf/form2.pdf`) was also fetched and found to be a
    **stale, pre-amendment** version of Form 2 (uses obsolete categories
    such as "Invalid Carriage" instead of the current COV list) — it was
    not used as a source, and this registry's convention of preferring the
    national/canonical source over a state mirror when both exist (per
    `in/mea/passport-application-first-adult`'s VERIFICATION.md) held again
    here.
  - **Extraction technique:** direct `curl` fetch of the PDF with a
    browser-like User-Agent, then zlib-stream decompression and `Tj`/`TJ`
    content-stream text extraction (this PDF's content streams are plain,
    not CID-keyed like the MEA passport-booklet PDF, so the simpler
    technique sufficed — no `pdfjs-dist` scratch-install needed this time).
- **Secondary source (fetched directly, HTTP 200):**
  <https://parivahan.gov.in/en/content/licensing-related-fees-charges> — the
  MoRTH's own Rule 32 fee schedule, confirming Rs. 150 per class of vehicle
  for issue of a learner's licence. Not encoded as a fixed `documents[]`
  field value (fees can change by rule amendment over time), consistent with
  this registry's fee-field convention.
- **Attempted but not used:** `sarathi.parivahan.gov.in`, the transactional
  per-state application portal. Its `stateSelection.do` entry point returned
  an "Access Denied" WAF page to direct fetch/curl — a hard block, not a
  UA-sniffing issue (the `parivahan.gov.in` content site, by contrast, was
  fetchable with a browser-like User-Agent). No live-portal walkthrough was
  performed as a result; this document is transcribed from the canonical
  PDF only.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| "Services applying for" checkbox — Issue of New Learner's Licence (vs. 6 other services) | `applyingForNewLearnersLicenceOnly` |
| Class(es) of Vehicle (COV) checkbox group + footnotes | `classOfVehicleApplied` |
| Aadhaar Card Number / Aadhaar application number | `aadhaarNumber`, `aadhaarApplicationNumber` |
| Name of Applicant: First/Middle/Last Name | `firstName`, `middleName`, `lastName` |
| "Son/Wife/Daughter of" relation + name | `relationType`, `relatedPersonName` |
| Date of Birth | `dateOfBirth` |
| Parent/Guardian Declaration (s.7(2), Motor Vehicles Act 1988) "in case of applicant who is a minor" | `applicantIsMinor`, `parentGuardianName`, `parentGuardianRelationship`, `documents[].parentGuardianConsentDeclaration` |
| Gender (Male/Female/Transgender) | `gender` |
| Identification Mark | `identificationMark` |
| Educational Qualification | `educationalQualification` |
| Blood Group | `bloodGroup` |
| Email / Mobile / Landline | `email`, `mobileNumber`, `landlineNumber` |
| Present Address fields | `presentAddressLine1/VillageOrTown/District/State/PinCode` |
| Permanent Address (only if different) | `permanentAddressSameAsPresent`, `permanentAddressLine1` |
| Self-Declaration as to Physical Fitness, questions (a)–(f) | `hasEpilepsyOrLossOfConsciousness`, `canReadRegistrationMarkAt25m`, `wearsGlassesOrContactLenses`, `hasLossOfLimbOrMuscularDefect`, `hasNightBlindness`, `canHearOrdinarySoundSignal`, `usesHearingAid`, `hasOtherDiseaseOrDisabilityDangerousToPublic` |
| General declaration — prior disqualification | `previouslyDisqualifiedFromLicence` |
| Organ donation declaration | `willingToDonateOrgans` |
| Annexure, Proof of Address AND Age (10-item list) | `documents[].proofOfAddressAndAge` |
| Annexure, Medical Certificate (Form-1A), gated on "renewal and above 40, or Transport Licence" | `documents[].medicalCertificateForm1A`, gated on `classOfVehicleApplied == transport_vehicle` (the LL-relevant half of that OR condition; the renewal-and-40+ half applies only to the out-of-scope renewal service) |
| Passport-size photograph, "size not more than 50 KB" | `documents[].passportPhoto` |
| Rule 32 fee schedule (Rs. 150/class) | `documents[].applicationFeePayment` |

## What is NOT independently confirmed / out of scope

- **A live Sarathi state-portal walkthrough.** `sarathi.parivahan.gov.in`
  WAF-blocked direct fetch; this document is transcribed from the national
  Form 2 PDF, which the site itself states is the basis for the online
  form, but the exact online screen flow/validation messages for any given
  state's Sarathi instance were not directly observed.
- **Full permanent-address sub-fields.** Only `permanentAddressLine1` is
  modelled (matching the same representative-field convention used in
  `in/mea/passport-application-first-adult`), not a full second address
  block; a future MINOR addition could add district/state/pin-code if a
  live-portal pass shows they are collected separately from present address.
- **Driving Licence issue, addition of class, renewal, duplicate, and
  address/name-change services**, plus the driving test and vehicle
  registration (Form 20 / VAHAN, a separate portal) are explicitly out of
  scope of this first India-DMV schema, matching this registry's
  narrow-first-schema-per-jurisdiction convention.
- **Driving-school enrolment fields** (Form 2 has a driving-school block:
  school name, enrolment number/date, certificate number/date) are omitted;
  they are optional/conditional on a driving-school pathway not required for
  a Learner's Licence itself and are more relevant to the DL/test flow.

## Scope and jurisdiction notes

- India's **second** registry entry (after `in/mea/passport-application-
  first-adult`), and its first DMV-vertical schema — India is now 2/6
  verticals covered.
- Conditional flow uses `requiredWhen` (GSP-0013) for the minor-guardian-
  consent and permanent-address branches, and `steps[].transitions` with
  `exitReason` (GSP-0013 §4) for the single genuine scope gate (a different
  Form 2 service requested).
- `dateOfBirth`, `aadhaarNumber`, `aadhaarApplicationNumber`, and
  `mobileNumber` are marked `classification: sensitive-pii`; the physical-
  fitness declaration fields and blood group are marked
  `classification: health`; remaining name/address/contact fields are marked
  `classification: pii`, per GSP-0006's advisory vocabulary.
- Mock-data condition-evaluator testing (a positive-control adult LMV
  applicant; a minor MCWOG applicant to exercise the guardian-consent
  branch; an adult transport-vehicle applicant to exercise the Form-1A
  medical-certificate gate; and a wrong-service profile to exercise the
  scope-exit transition) confirmed every `requiredWhen`/`transitions` branch
  resolves as intended: the positive control has zero missing required
  fields and requires only the three baseline documents; the minor profile
  correctly flags `parentGuardianName`/`parentGuardianRelationship` as
  missing and adds the consent-declaration document; the transport-vehicle
  profile correctly adds the Form-1A document; and the wrong-service profile
  correctly exits with `not_eligible_different_service_requested`. No script
  is checked into the registry (structural-reference schemas in this
  registry do not carry conformance fixtures — GSP-0016 fixtures are used
  once a schema reaches `verified`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with access to a specific
state's Sarathi portal instance (or independent confirmation from someone
who has completed a live LL application) confirms: the online form's exact
field-by-field presentation matches Form 2's paper columns, whether
permanent-address sub-fields are collected separately online, and current
fee figures at that state's instance (some states add service/smart-card
surcharges on top of the central Rule 32 fee).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
