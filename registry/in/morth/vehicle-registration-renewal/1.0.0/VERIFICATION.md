# Verification record — `in/morth/vehicle-registration-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was **derived directly from the current fillable Form 25 PDF**,
downloaded without any bot-block from parivahan.gov.in (the Ministry's own
Parivahan Sewa e-governance portal) — stronger sourcing than a third-party
mirror or guidance-prose-only transcription. It is corroborated against the
primary legal rule (Rule 52, Central Motor Vehicles Rules, 1989) and against
the authority's own guidance page. But the live parivahan.gov.in/VAHAN
transactional "Renewal of Registration" e-service itself is state-instanced
and login-gated and could not be walked screen by screen, so the full
field-by-field comparison `manual-source-review-v1` (Procedure step 2)
requires against a live portal has **not** been completed. It therefore
remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `in/morth/vehicle-registration-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Road Transport and Highways (MoRTH), Government
  of India, acting through the state Regional Transport Offices (RTOs) as
  registering authorities.
- **Primary source URL:**
  <https://parivahan.gov.in/sites/default/files/DownloadForm/cmvr/FORM-25.pdf> —
  the current fillable **Form 25** ("Form of Application for Renewal of
  Certificate of Registration of a Motor Vehicle") PDF, served directly by
  parivahan.gov.in's own "Downloadable Forms" library. Fetched directly with
  `curl`, HTTP 200, a genuine 28 KB `%PDF-1.5` binary with a real text layer
  (not a scanned image). Text-extracted with `pdfjs-dist`
  (`getTextContent`); both pages were read and transcribed in full.
- **Corroborating primary-legal source:** the same consolidated Central
  Motor Vehicles Rules, 1989 PDF at indiacode.nic.in already used and
  documented for `in/morth/vehicle-ownership-transfer/1.0.0` (see that
  schema's VERIFICATION.md for the sourcing note on why morth.nic.in/
  morth.gov.in no longer serves static chapter PDFs). **Rule 52 ("Renewal of
  certificate of registration"), page 62 of that extracted PDF:** read in
  full — confirms the sixty-day pre-expiry filing window, the Rule 81 fee
  reference, and that the registering authority (not the applicant) obtains
  the certificate of fitness referred to in sub-rule (2) before renewing.
  The compiled CMVR's own copy of Form 25 (pages 305-306 of that PDF, page
  287 of the printed compilation) is an older revision lacking the
  `applicantMobileNumber`, `standingCapacity`, and `sleeperCapacity` fields
  present on the current standalone PDF; the current standalone form was
  used as the authoritative field set, consistent with preferring the
  live/current government artifact over a possibly-superseded compiled
  excerpt.
- **Corroborating guidance page:**
  <https://parivahan.gov.in/en/content/renewal-of-rc> ("Renewal of
  Registration Certificate"), fetched directly (`curl`, HTTP 200, a
  server-rendered Drupal page, not a JS SPA shell). Its "Documents required"
  list — Form 25, Pollution Under Control certificate, fitness certificate,
  certificate of registration, proof of road tax paid, insurance
  certificate, PAN card/Form 60 & 61, pencil print of chassis/engine
  number, and signature identification of owner — was used for the
  `documents[]` array, together with its own footnote that items marked
  with an asterisk "may be required in some states."
- **Retrieved / reviewed:** 2026-07-04 (all three sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `vehicleRegistrationMark`, `applicantName`, `applicantMobileNumber`, `currentCertificateDateOfIssue`, `currentCertificateDateOfExpiry`, `registeringAuthorityIssuedOrLastRenewed`, `applicantPresentAddress`, `updateAddressOnRenewedCertificate` | **Directly observed**, Form 25's opening paragraph, items (a)-(d), and the address sentence. |
| `renewalNotPreviouslyRefusedDeclaration`, `certificateNotCancelledOrSuspendedDeclaration` | **Directly observed**, verbatim declaration sentences printed immediately after the address line on Form 25. |
| `classOfVehicle` through `fuelUsed` (numbered items 1-13, `standingCapacity`, `sleeperCapacity`) | **Directly observed**, Form 25's numbered vehicle-particulars block, taken from the current standalone PDF (which includes 11A/11B, absent from the older compiled-CMVR copy of the form — see above). |
| `insuranceCertificateEnclosedDeclaration` | **Directly observed**, verbatim: "I enclose the certificate of insurance for perusal and return." |
| `vehicleUnderEncumbrance`, `encumbranceType`, `encumbranceHolderName` | **Directly observed**, Form 25's Note section (page 2 of the standalone PDF): the two mutually-exclusive hire-purchase/lease vs. hypothecation blanks, with the "strike out whichever is inapplicable" instruction read as a single choice field (`encumbranceType`) plus a shared holder-name field, rather than two independent blanks — a source-faithful simplification, since the form itself only expects one of the two to be completed. |
| `documents[].certificateOfRegistrationBeingRenewed` | **Directly observed**, Form 25's opening sentence: "the certificate of registration which is attached." |
| `documents[].certificateOfInsurance` | **Directly observed** on Form 25 itself, and independently corroborated by the guidance page's "Insurance certificate*" line. |
| `documents[].pencilPrintOfChassisAndEngineNumber` | **Directly observed**, Form 25 item 9's "(Affix pencil print)" instruction, corroborated by the guidance page's "Pencil Print of Chassis & Engine Number *". |
| `documents[].specimenSignatureOfRegisteredOwner` | **Directly observed**, Form 25's signature/specimen-signature block, corroborated by the guidance page's "Signature Identification of owner*". |
| `documents[].pollutionUnderControlCertificate`, `documents[].proofOfRoadTaxPaid`, `documents[].panCardOrForm60Form61` | **Directly observed on the guidance page only** (not printed on Form 25 itself, which is the application form, not a documents checklist). Modelled as `required: false` where the guidance page's own asterisk marks the item as state-variable; `pollutionUnderControlCertificate` is listed without an asterisk, so modelled `required: true`. |
| `documents[].fitnessCertificate` | **Directly observed**, Rule 52(2): the registering authority itself, not the applicant, obtains the certificate of fitness by referral. Modelled `required: false` since it is not an applicant-supplied document under the primary rule, even though the guidance page's asterisked list suggests some states ask the applicant to arrange or present it directly. |
| `documents[].renewalFee` | **Directly observed reference (Form 25 — "I have paid the fee of Rs. ......."; Rule 52(1)), amount not encoded.** Rule 81 sets fees by rule and vehicle class rather than a flat amount, consistent with `in/morth/learners-licence-application` and `in/morth/vehicle-ownership-transfer`'s fee convention. |

## Test run with mock data

A mock application packet was assembled at
`conformance/in/morth/vehicle-registration-renewal/1.0.0/application-packet.json`
using fabricated owner/vehicle details (not a real registration mark,
chassis/engine number, or address). Unlike prior MoRTH schemas' manual
field-by-field reasoning, this packet was additionally checked with a
small ad hoc script that re-implements the schema's own
`required`/`requiredWhen`/`validation` evaluation (condition grammar
`all`/`any`/`not`/leaf-compare per GSP-0013) and runs it against the
packet's `collectedValues` — all 29 fields evaluated, 27 populated (the two
left unpopulated, `standingCapacity`/`sleeperCapacity`, are correctly
optional for a private saloon car and recorded in `fieldsNotApplicable`),
zero constraint violations. The packet exercises the `vehicleUnderEncumbrance
= true` branch (hire-purchase, per Form 25's Note section) rather than the
ordinary unencumbered case, which is instead the branch already exercised
by `in/morth/vehicle-ownership-transfer`'s mock packet — between the two
MoRTH conformance packets, both branches of this recurring encumbrance
pattern are now exercised at least once. No value was submitted to any
government system: the live Parivahan/VAHAN renewal e-service is a
state-instanced, login-gated transactional portal with no public test/
sandbox mode, so — consistent with this registry's treatment of other
credential-gated live services — this review did not attempt to exercise a
live wizard end to end.

## Scope and jurisdiction notes

- **Ordinary owner-initiated renewal of a private, non-transport motor
  vehicle's registration certificate at its existing registering
  authority.** Out of scope for v1.0.0:
  - Transport (commercial) vehicles, whose registration-renewal cycle is
    tied to a separate, recurring fitness-certificate regime under a
    different set of rules.
  - Renewal after the certificate has already lapsed beyond whatever grace
    period a given state permits — Rule 52(3) simply bars using the vehicle
    in public once the certificate expires; it does not set a separate
    lapsed-renewal procedure, and states are known to vary in practice on
    this point.
  - A simultaneous change of registering-authority jurisdiction.
  - Issuance of a duplicate certificate of registration (Form 26, per
    Rule 53 — a distinct process for a lost/destroyed certificate).
  - Vehicle registration itself (Form 20) and ownership transfer (Forms 29/
    30, already published as `in/morth/vehicle-ownership-transfer`) — both
    separate processes.
- **This closes India's DMV "Registration/Tag" renewal gap** distinct from
  the one-time "Title" event already covered by
  `in/morth/vehicle-ownership-transfer` (whose own VERIFICATION.md flagged
  this exact renewal-at-the-fitness-mark process as the remaining,
  separate gap). Per the GOV-960 audit lineage, India, NZ, and SG were the
  three jurisdictions with a published Drivers-Licence schema but no
  recurring Vehicle Registration/Tag renewal schema (as opposed to a
  one-time Title/ownership-transfer schema); this closes that gap for
  India. CA/Ontario's `ca/on/mto/vehicle-permit-renewal` remains a
  `candidate` (blocked twice on a live-wizard eligibility lookup requiring
  a real, already-issued plate/permit pair); NZ and SG were not attempted
  in this cycle and remain open for a future one.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against a live state instance of the
Parivahan/VAHAN "Renewal of Registration Certificate" e-service using a
genuine login and an actual registered vehicle, confirms which of the
guidance page's asterisked (state-variable) documents apply in that state,
resolves any discrepancy by shipping a **new schema version** (immutability
— VERSIONING §3, practice Procedure step 5), and records the outcome here
plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
