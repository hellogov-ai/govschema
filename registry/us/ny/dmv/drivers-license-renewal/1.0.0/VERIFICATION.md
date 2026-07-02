# Verification record — `us/ny/dmv/drivers-license-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official dmv.ny.gov guidance page and the
official MV-44 fillable PDF form listed below. It remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `us/ny/dmv/drivers-license-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** New York State Department of Motor Vehicles ("NYS DMV").
- **Primary source (guidance):** "Renew a Driver License" —
  <https://dmv.ny.gov/driver-license/renew-a-driver-license> (redirected from
  `/driver-license/renew-driver-license`) — fetched live as raw HTML,
  2026-07-02. Supplied the renewal-method structure (online / by mail / at a
  DMV office), the online eligibility conditions (already has an Enhanced or
  REAL ID, or keeping Standard), the mandatory in-person triggers (upgrading
  to Enhanced/REAL ID, updating photo, changing licence class, never issued
  an SSN, holds a CDL, has a temporary-visitor date), the fee table, and the
  link to form MV-44 as the form to use "If you did not receive a renewal
  notice" (by mail) or as "What to Bring" (at a DMV office).
- **Primary source (form):** MV-44 (4/26), "Application for Permit, Driver
  License or Non-Driver ID Card" — <https://dmv.ny.gov/forms/mv44.pdf> —
  downloaded directly, 2026-07-02. A genuine fillable AcroForm PDF (not XFA,
  not a static/flat PDF): `getFieldObjects()` returned 81 named fields across
  3 pages. Extracted with `pdfjs-dist` (`getDocument().getFieldObjects()` for
  field names/types/options, `getTextContent()` per page for the printed
  instructional text each field name is embedded in), the same tool and
  technique used for every other AcroForm-derived schema in this registry
  (e.g. `us/ca/dmv/commercial-drivers-license-application`).
- **Field extraction method:** AcroForm field objects (name/type/options),
  cross-checked against each page's printed text for the exact instructional
  wording quoted in `sourceRef`/`description`.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "APPLYING FOR" (License / Permit / ID card) | `credentialTypeApplyingFor` |
| "PURPOSE FOR APPLICATION" (New / Change Type / Replacement / Renew / Update Info / Transfer to New York / Conditional / Restricted) | `purposeForApplication` |
| "COMMERCIAL DRIVER LICENSE APPLICANTS ONLY" block (p.2) | `isApplyingForCommercialDriverLicense` |
| "PARENT/GUARDIAN CONSENT" / "Junior License" / "Non-driver ID Card (under 16)" (p.2) | `requiresParentOrGuardianConsent` |
| "Do you now have, or did you ever have, a New York driver license, learner permit, or non-driver ID card?" | `hasCurrentOrPriorNyCredential` |
| "ID NUMBER ON NEW YORK STATE DRIVER LICENSE, LEARNER PERMIT, or NON-DRIVER ID CARD" | `nyCredentialIdNumber` |
| "FULL LAST NAME" / "FULL FIRST NAME" / "FULL MIDDLE NAME" / "SUFFIX" | `fullLastName`, `fullFirstName`, `fullMiddleName`, `suffix` |
| "DATE OF BIRTH" (Month/Day/Year comboboxes) | `dateOfBirth` (see honesty flag below) |
| "SEX" (M/F/X) | `sex` |
| "HEIGHT" Feet/Inches | `heightFeet`, `heightInches` |
| "EYE COLOR" | `eyeColor` |
| "TELEPHONE NUMBER (Home/Mobile)" Area Code / Number / Type | `telephoneAreaCode`, `telephoneNumber`, `telephoneType` |
| "Has your name changed?" / "print your former name exactly as it appears..." | `hasNameChanged`, `formerName` |
| "OTHER CHANGE: What is the change and the reason for it..." | `otherChangeDescription` |
| "If you have never been issued a Social Security Number, check this box" / "SOCIAL SECURITY NUMBER (SSN)" | `neverIssuedSocialSecurityNumber`, `socialSecurityNumber` |
| "ADDRESS WHERE YOU LIVE" (street/Apt/City/State/Zip/County) | `residentialAddressLine`, `residentialAddressAptNo`, `residentialCity`, `residentialState`, `residentialZip`, `residentialCounty` |
| "ADDRESS WHERE YOU GET YOUR MAIL — Required if different from address where you live" | `mailingAddressLine`, `mailingAddressAptNo`, `mailingCity`, `mailingState`, `mailingZip`, `mailingCounty` |
| "HAS YOUR MAILING ADDRESS CHANGED?" / "HAS THE ADDRESS WHERE YOU LIVE CHANGED?" | `hasMailingAddressChanged`, `hasResidentialAddressChanged` |
| "...unless you check this box" (vehicle-registration address propagation) | `excludeVehicleRegistrationsFromAddressUpdate` |
| "Do you have a permit or driver license that is valid or that has expired within the last two years, issued by any place other than New York State?" + "where was it issued" / "Date of Expiration" / "Type of License" / "Out-of-State Permit or License ID No." | `hasOutOfStateLicenseValidOrRecentlyExpired`, `outOfStateLicenseIssuedIn`, `outOfStateLicenseExpirationDate`, `outOfStateLicenseType`, `outOfStateLicenseIdNumber` |
| "VETERAN STATUS — Check this box if you would like to have 'Veteran' printed..." + "You must present proof...(ex: DD-214, DD-215)" | `wantsVeteranDesignation`, `documents[].veteranDischargeProof` |
| "Check this box to make a $1 voluntary donation to the Life Pass It On Trust Fund..." | `wantsLifePassItOnDonation` |
| "Would you like to be added to the Donate Life Registry? Yes (sign and date consent below) / Skip This Question" + registry certification paragraph | `wantsDonateLifeRegistry`, `donorConsentDate`, `documents[].donateLifeRegistryConsentSignature` |
| "PLEASE PRINT NAME" / "CERTIFICATION DATE" (p.2) | `certificationPrintedName`, `certificationDate` |
| "I certify that the information I have given on this application...is true and complete...may be verified against nationwide DMV systems for accuracy." (p.2) | `documents[].applicationCertification` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **`dateOfBirth` — source widget shape not replicated.** MV-44's own DOB
  input is three comboboxes: Month (01-12), Day (01-31), and a **two-digit**
  Year (00-99, plus a blank option). A two-digit year is inherently
  century-ambiguous in isolation. This schema models `dateOfBirth` as a
  normal full ISO 8601 `date`, the same as every other date-of-birth field in
  this registry — reconciling a full date down to the PDF widget's two-digit
  year box is a `mapping.json`/form-filling concern, not something the
  schema's field type needs to encode. Flagged so a future reader does not
  assume the two-digit widget was overlooked.
- **`purposeForApplication` — option order reconstructed from widget
  position, not directly legible label-to-box text.** The PDF's text layer
  extracts the eight "PURPOSE FOR APPLICATION" labels as a single run ("New
  Change Type Replacement Renew Update Info Transfer to New York Conditional
  Restricted") interleaved with the printed guidance-page fee/eligibility
  copy, with no per-box label markup. The eight radiobutton widgets'
  left-to-right x-coordinates (156.0, 191.4, 234.6, 292.2, 354.1, 415.9,
  474.7, 530.7, all at the same y-coordinate) were matched 1:1, in order, to
  the eight labels in the order they appear in the text stream — the same
  position-sorted-extraction discipline used for `nz/nzta/drivers-licence-renewal`'s
  static-PDF text layer. Not independently re-confirmed against a rendered
  screenshot of the live PDF; flagged as a lower-confidence mapping than the
  form's other yes/no and single- or dual-radio questions, where the
  candidate label set is unambiguous.
- **CDL routing (`isApplyingForCommercialDriverLicense`) is inferred, not a
  named checkbox.** MV-44 has no single applicant-facing checkbox literally
  labelled "I am applying for a CDL" in the extracted field list — the
  "COMMERCIAL DRIVER LICENSE APPLICANTS ONLY" section (p.2) is itself the
  routing signal (its own four-way certification only makes sense for a CDL
  applicant), and the form's "License Class" box on p.1 is marked "OFFICE USE
  ONLY," so class selection is not an applicant-facing field on this form at
  all. This field is a reasonable inference from that section heading, not a
  literal form field name — flagged as a lower-confidence field, the same
  discipline used for `nswDriverLicenceNumber` in
  `au/nsw/service-nsw/driver-licence-renewal`.
- **Scope narrowed to standard-licence renewal, adult applicant.** Learner
  permit and non-driver ID card applications, every non-renewal purpose,
  commercial driver licenses (already modelled separately in
  `us/ca/dmv/commercial-drivers-license-application`), and applicants
  requiring parent/guardian consent are all out of scope for v1.0.0 and
  gated out via `steps[].transitions`/`exitReason` (GSP-0013) — the same
  eligibility-gate pattern used across this registry's other prose- and
  form-sourced DMV schemas.
- **United States Selective Service System (SSS) registration section
  (p.1) excluded entirely.** MV-44 bundles a federal SSS registration
  question for male citizens/immigrants aged 18-25 ("If I am a male at least
  18 but less than 26 years old,... I hereby affirmatively opt to register
  with the SSS..."). This registry already has a distinct schema for that
  process, `us/sss/selective-service-registration`; modelling it again inside
  a DMV renewal schema would duplicate a process this registry treats as its
  own document, so it is out of scope here.
- **New York State Voter Registration Application (p.3) excluded
  entirely.** MV-44's bundled NVRA ("Motor Voter") voter-registration
  application — its own full page, with its own eligibility criteria,
  affidavit, and political-party enrollment — is a distinct civic-registration
  process, not a DMV driver-license process. This registry's open catalog
  already lists "California Voter Registration" as its own, separate
  candidate, confirming voter registration is treated as its own document
  type rather than folded into a DMV schema. Excluded from this schema
  entirely (not just the full page-3 application, but also the single p.1
  checkbox tying an address change to a voter-registration-record update),
  for the same reason.
- **MyDMV / NY.gov ID online renewal not independently confirmed
  field-by-field.** The guidance page states online renewal is available
  when "you already have an Enhanced or REAL ID, or you want to keep your
  Standard," and that a Vision Test Report (MV-619) may be required, but the
  live, authenticated MyDMV transaction itself was not reachable pre-login,
  so its screen-by-screen field list is not confirmed. This schema is
  derived from MV-44 (the by-mail/in-person path) instead, which is a
  genuine fillable form, not a portal behind a login wall — a stronger
  sourcing grain than guessing at the online transaction's fields.
- **No enum for `eyeColor`.** The form prints no option list for eye color;
  modelled as free text rather than a guessed set, the same discipline used
  for `gender` in `nz/nzta/drivers-licence-renewal` and `licenceNumber` in
  `ca/on/mto/drivers-licence-renewal`.
- **Fees intentionally not encoded**, matching every other DMV schema in
  this registry (e.g. `us/ca/dmv/drivers-license-renewal`).

## Test run against mock data

A worked mock-applicant walkthrough exercising every step and the
`steps[].transitions` eligibility gate is recorded in
[`conformance/us/ny/dmv/drivers-license-renewal/1.0.0/application-packet.json`](../../../../../conformance/us/ny/dmv/drivers-license-renewal/1.0.0/application-packet.json)
(and its human-readable `.txt` companion). No live NY DMV account, MyDMV
session, or the physical MV-44 form was actually submitted — GovSchema does
not submit forms on anyone's behalf (see `AGENTS.md` §5 / GSP-0017).

## Path to `verified`

1. Independently re-confirm the `purposeForApplication` option-to-position
   mapping and the `isApplyingForCommercialDriverLicense` CDL-routing
   inference against a rendered screenshot of the live MV-44 PDF (not just
   the extracted text/field-object streams), since both are flagged above as
   lower-confidence.
2. Drive the live, authenticated MyDMV online renewal transaction with a
   test/mock NY.gov ID account to confirm whether its field set differs from
   MV-44's (the guidance page implies it reuses the same underlying data
   model, but this has not been directly observed).
3. Re-fetch dmv.ny.gov and dmv.ny.gov/forms/mv44.pdf periodically — MV-44 is
   already on its second 2026 edition (4/26) as of this review; NY DMV
   revises this form on a recurring basis.
