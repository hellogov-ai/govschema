# Verification record — `in/morth/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this candidate, why now

This GOV-1240 "GovSchema Standard Research" cycle re-ran the Phase 1
catalog audit (`find registry -name schema.json`, grouped by jurisdiction ×
vertical) and found the committed `CATALOG.md` stale in several places —
most notably it still listed India, the Netherlands, and New Zealand as
missing a Passport schema, when `in/mea/passport-application-first-adult`,
`in/mea/passport-reissue`, `nl/rvig/passport-application`, and
`nz/dia/passport-application-first-adult` / `passport-renewal-adult` had all
already merged. `CATALOG.md` was corrected as part of this cycle's other
deliverable.

With the catalog corrected, all 12 tracked jurisdictions now have at least
one schema in every one of the 6 focus verticals except two confirmed,
previously-researched dead ends (`nl` and `za` Visa — see GOV-777/GOV-1225).
Rather than force a new jurisdiction gap that does not exist, this cycle
looked for a genuine **sub-process gap within an already-covered vertical**
— the same escalation this registry used once its coarse
one-schema-per-(jurisdiction, vertical) matrix first saturated (GOV-986,
GOV-1093).

India's `in/morth/learners-licence-application` (GOV-878) explicitly scoped
itself to the Learner's Licence service only, naming "Issue of New Driving
Licence" as one of Form 2's six other out-of-scope services. That is the gap
this document closes: an applicant who already holds a valid LL and is
converting it to a full, permanent Driving Licence (DL) — the natural next
step in the same MoRTH/Sarathi process, on the same source form.

**A prior blocked cycle (GOV-1215) had queued up a different candidate — a
new US federal CDL (`us/fmcsa/cdl-application-class-a`) schema — but that
candidate's premise was wrong.** GOV-1215's own research claimed CDL
coverage was "completely new (0 existing)" in the registry. That claim did
not hold: `us/ca/dmv/commercial-drivers-license-application` (California's
CDL/CLP application, Form DL 44C / eDL 44C) already exists and is published
(versions 1.0.0, 1.1.0). GOV-1215's draft field spec also cited a federal
CFR section against nearly every field without ever fetching or reading 49
CFR Part 383 or a real state CDL form directly — a source-fidelity gap this
registry has repeatedly caught in review (see e.g. GOV-1174, GOV-942,
GOV-872). That work was not used. GOV-1215 has been commented and left
blocked/superseded rather than resumed; a fresh, corrected candidate (this
document) was authored instead.

## Sources examined

- **Document `(id, version)`:** `in/morth/driving-licence-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Road Transport and Highways (MoRTH), Government
  of India, through the state Regional Transport Offices (RTOs), under the
  Central Motor Vehicles Rules, 1989.
- **Primary source (re-fetched directly this cycle, HTTP 200):**
  <https://parivahan.gov.in/sites/default/files/DownloadForm/cmvr/FORM-2.pdf>
  — the same canonical, current Form 2 PDF already used and cross-checked
  for `in/morth/learners-licence-application` (GOV-878); re-downloaded and
  re-extracted independently this cycle (curl with a browser-like
  User-Agent, then zlib content-stream decompression and `Tj`/`TJ` string
  extraction) to confirm it is still live and unchanged, rather than reusing
  the sibling schema's extraction verbatim. The "Issue of New Driving
  Licence" checkbox, section 6 "Particulars of existing Licence (Learners or
  Permanent)" (Licence Number, Class of Vehicle(s), issuing authority,
  validity period), and the Annexure document list were all read directly
  from this re-extraction.
- **Secondary source (fetched directly, HTTP 200):**
  <https://parivahan.gov.in/en/content/licensing-related-fees-charges> — the
  MoRTH's own Rule 32 fee schedule. Confirms **Rs. 200 for issue of a
  driving licence** (item 4) and **Rs. 300 for the test of competence to
  drive, per class** (item 3) — both distinct from the Rs. 150
  learner's-licence fee already cited in the sibling schema. Not encoded as
  a fixed `documents[]` field value (fees are set by rule and can change),
  consistent with this registry's fee-field convention.
- **Attempted but not used:** `sarathi.parivahan.gov.in`, the transactional
  per-state application portal. Its entry points returned an "Access Denied"
  WAF response to direct fetch/curl, the same hard block already
  encountered and documented for the sibling LL schema. No live-portal
  walkthrough was performed as a result; this document is transcribed from
  the canonical PDF and the fees page only.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| "Services applying for" checkbox — Issue of New Driving Licence (vs. 6 other services) | `applyingForNewDrivingLicenceOnly` |
| Class(es) of Vehicle (COV) checkbox group + footnotes (section 1, "Applicable for New Learners Licence or New Driving Licence") | `classOfVehicleApplied` |
| Aadhaar Card Number / Aadhaar application number | `aadhaarNumber`, `aadhaarApplicationNumber` |
| Name of Applicant: First/Middle/Last Name | `firstName`, `middleName`, `lastName` |
| "Son/Wife/Daughter of" relation + name | `relationType`, `relatedPersonName` |
| Date of Birth, Gender, Identification Mark, Educational Qualification, Blood Group, Email, Mobile, Landline | corresponding like-named fields (same section 2 block as the LL schema) |
| Present Address fields | `presentAddressLine1/VillageOrTown/District/State/PinCode` |
| Permanent Address (only if different) | `permanentAddressSameAsPresent`, `permanentAddressLine1` |
| Section 6, "Particulars of existing Licence (Learners or Permanent)": Licence Number | `existingLearnersLicenceNumber` |
| Section 6: Class of Vehicle(s) | `existingLearnersLicenceClassOfVehicle` |
| Section 6: Name of the Licencing Authority which issued the Licence | `existingLearnersLicenceIssuingAuthority` |
| Section 6: Validity Period From/To date | `existingLearnersLicenceValidFrom`, `existingLearnersLicenceValidTo` |
| Self-Declaration as to Physical Fitness, questions (a)–(f) | same 8 boolean fields as the LL schema |
| General declaration — prior disqualification | `previouslyDisqualifiedFromLicence` |
| Organ donation declaration | `willingToDonateOrgans` |
| Annexure, Proof of Address AND Age (10-item list), section 4's "in case of New Learners Licence or New Driving Licence or Change of Address" note | `documents[].proofOfAddressAndAge` |
| Annexure, Medical Certificate (Form-1A), gated on "applying for renewal and is above 40 years of age, or applying for Transport Licence" | `documents[].medicalCertificateForm1A`, gated on `classOfVehicleApplied == transport_vehicle` (the Transport-Licence half of that OR condition; the renewal-and-40+ half is out of scope, since this document does not model renewal) |
| Annexure, "Other documents ... if applicable": Driving Certificate (Form 5) | `documents[].drivingSchoolCertificateForm5` — modelled as ungated (`required: false`, no `requiredWhen`) because, unlike the Form-1A entry, the source text states no explicit trigger condition for this item; see "What is NOT independently confirmed" below |
| Passport-size photograph, "size not more than 50 KB" | `documents[].passportPhoto` |
| Rule 32 fee schedule (Rs. 200 issue-of-DL + Rs. 300/class test fee) | `documents[].applicationFeePayment` |

## What is NOT independently confirmed / out of scope

- **A live Sarathi state-portal walkthrough.** Same WAF block as
  `in/morth/learners-licence-application`; this document is transcribed from
  the national Form 2 PDF and the national fees page only. The exact online
  screen flow, and whether a given state's Sarathi instance auto-populates
  the section-6 existing-LL particulars from the applicant's own LL record
  (rather than asking the applicant to retype them) is not observed.
- **`drivingSchoolCertificateForm5`'s trigger condition.** The Annexure lists
  it under a general "if applicable" heading without the explicit
  parenthetical the Form-1A entry has. It is left `required: false` with no
  `requiredWhen` gate rather than inferring an unstated condition (e.g.
  gating it to `transport_vehicle` the way Form-1A is gated) — a deliberate
  precision-over-inference choice; a future revision can add a gate once a
  live-portal or RTO source confirms one.
- **A minor applicant's parent/guardian consent.** Form 2's guardian
  consent declaration explicitly states "I give my consent for his/her
  obtaining **the learners licence**" — tied to the LL service by name, not
  the DL service. This document therefore does not model `applicantIsMinor`
  or guardian-consent fields (unlike the sibling LL schema), rather than
  reuse a consent block the form text does not extend to this service.
- **The driving test itself.** Form 2's "FOR OFFICE USE ONLY" section
  records Date of Test / Result / Pass-Fail and the licensing authority's
  issue-or-refuse decision — these are outcomes recorded by the RTO, not
  applicant-supplied input fields, and are out of scope.
- **Addition of Class of Vehicle, Renewal of Driving Licence, Duplicate
  Driving Licence, Change/Correction of Address or Name** — Form 2's other
  five services besides new-LL and new-DL — remain unmodelled, consistent
  with this registry's narrow-first-schema convention.
- **Section 5 (Driving School enrolment details — school name, enrolment
  number/date, certificate number/date, training period)** is explicitly
  scoped in the source to "request for Addition of a Class of Vehicle in
  Transport Category" only, a different service, and is therefore omitted
  here.

## Scope and jurisdiction notes

- India's **sixth** registry entry and second DMV-vertical schema (alongside
  `in/morth/learners-licence-application`, `vehicle-registration`,
  `vehicle-registration-renewal`, and `vehicle-ownership-transfer`); India
  remains at 6/6 verticals covered (this narrows a sub-process gap within
  the DMV vertical, it does not open a new vertical).
- Conditional flow uses `requiredWhen` (GSP-0013) for the differing-permanent-
  address branch and the Form-1A medical-certificate document gate, and
  `steps[].transitions` with `exitReason` (GSP-0013 §4) for the single
  genuine scope gate (a different Form 2 service requested).
- `dateOfBirth`, `aadhaarNumber`, `aadhaarApplicationNumber`,
  `mobileNumber`, `existingLearnersLicenceNumber`, and the address fields
  are marked `classification: pii`/`sensitive-pii`; the physical-fitness
  declaration fields and blood group are marked `classification: health`,
  matching the sibling LL schema's classification choices for the same
  form sections.
- **Test run (Phase 4):** a mock
  `conformance/in/morth/driving-licence-application/1.0.0/application-packet.json`
  packet (an adult LMV applicant converting an existing, still-valid LMV
  Learner's Licence) was checked with a small scratch script
  re-implementing the schema's own `required`/`requiredWhen`/`validation`/
  `eligibleValues` evaluation (not checked into the registry, per this
  registry's structural-reference-schema convention). The committed
  baseline packet passed with 0 violations. Three additional synthetic
  scenarios were run through the same evaluator to exercise every
  conditional branch not hit by the baseline: (1) a `transport_vehicle`
  applicant supplying `medicalCertificateForm1A` and
  `drivingSchoolCertificateForm5` passed with 0 violations; (2) the same
  `transport_vehicle` applicant withholding `medicalCertificateForm1A`
  correctly flagged a missing-required-document violation; (3) a
  different-permanent-address applicant omitting
  `permanentAddressLine1` correctly flagged a missing-required-field
  violation; (4) an applicant who ticked a different Form 2 service
  correctly flagged as ineligible via `applyingForNewDrivingLicenceOnly`'s
  `eligibleValues` gate.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with access to a specific
state's Sarathi portal instance (or independent confirmation from someone
who has completed a live DL application) confirms: the online form's
exact field-by-field presentation matches Form 2's section-6 columns,
whether the existing-LL particulars are auto-populated from the applicant's
own record online, current fee figures at that state's instance (states can
add service/smart-card surcharges on top of the central Rule 32 fees), and
the real trigger condition (if any) for the Form 5 driving-school
certificate document.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
