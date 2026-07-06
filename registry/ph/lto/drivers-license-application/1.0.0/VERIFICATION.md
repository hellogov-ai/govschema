# Verification record — `ph/lto/drivers-license-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every applicant-facing field was read directly from the text layer of LTO
Form No. 21 (v3, September 2023 edition), a genuine (non-scanned) government
form. It remains `draft`, not `verified`, because a live LTO/LTMS intake
walkthrough and a second independent reviewer's field-by-field pass have not
yet occurred — see "What is NOT yet independently verified" below.

## Why this candidate, and the provenance problem it resolves

This `GovSchema Standard Research` cycle (`GOV-1519`) began by re-scanning
`CATALOG.md`'s own "Known Gaps" table (regenerated as of 2026-07-06): DMV
stood at 15/17 jurisdictions, with the Philippines as one of its two
remaining gaps (Brazil being the other). A prior cycle (`GOV-1466`) had
already found the right document — LTO Form No. 21, "Application for
Driver's License" — but explicitly flagged it as a weaker source: "only
fetchable via a third-party CDN mirror since `lto.gov.ph` itself is
Cloudflare-gated on every path tried."

This cycle reconfirmed that gate directly: both `https://lto.gov.ph/wp-content/uploads/2023/09/APL-Form_v3.pdf`
and a second first-party candidate, `https://www.officialgazette.gov.ph/downloads/2014/06jun/DOTC-LTO-Form-21.pdf`
(the Official Gazette of the Philippines, a distinct .gov.ph domain hosting
an older, 2014 edition of the same form), both return **HTTP 403** to a
direct fetch (confirmed via both `curl` with a browser User-Agent and this
environment's `WebFetch` tool, ruling out a client-side artifact). Rather
than falling back to a third-party mirror, this cycle checked the Wayback
Machine's Availability API for the current (2023) `lto.gov.ph` upload path
and found a clean snapshot (`20241211044849`, i.e. captured 2024-12-11) of
the **exact same file at its exact same first-party URL**. This is the same
technique already used successfully for `mx/semovi/alta-vehiculo-foraneo`
(GOV-1435) — retrieving an official document via the Wayback Machine when
the live host is unreachable/gated — and it directly resolves the
"third-party-mirror-only" provenance weakness the prior cycle flagged: the
retrieved bytes are archived from LTO's own upload path, not a third-party
site's re-hosting of the form.

This closes the Philippines' last open GovSchema vertical: DMV. The
Philippines now has at least one published schema in all six verticals
(Business Formation, National ID & Civic Documents, Taxes, Visa, Passport,
DMV).

## Access notes

- **Primary source (retrieved via Wayback Machine, HTTP 200, genuine text-layer PDF):**
  <http://web.archive.org/web/20241211044849/https://lto.gov.ph/wp-content/uploads/2023/09/APL-Form_v3.pdf>
  — a snapshot of `https://lto.gov.ph/wp-content/uploads/2023/09/APL-Form_v3.pdf`
  itself. `curl -o` confirmed HTTP 200, `content-type: application/pdf`,
  415,350 bytes.
- The PDF was read using `pdfjs-dist@3.11.174` (the same pinned version used
  by prior UAE/South-Korea/Mexico cycles per `gov-form-pdf-extraction.md`).
  `getTextContent()` confirmed a genuine, non-scanned text layer on both of
  the document's two pages.
- An initial attempt to render the pages to PNG via `node-canvas` (the
  established fallback for screenshot-only sources) lost a large share of
  glyphs to an embedded-font resolution error
  (`Requesting object that isn't resolved yet`) — a rendering-pipeline
  artifact of this particular PDF's embedded font, not a source-content
  problem. This was abandoned in favour of a direct per-glyph coordinate dump
  (`item.transform[4]`/`[5]` grouped into text rows by y-coordinate, sorted
  by x within each row), which recovered the complete, correctly-ordered
  field-label text with no gaps — confirmed by cross-checking the dump's
  page-1 row count and content against the plain `getTextContent()` string
  join used for an initial pass.
- `doc.getFieldObjects()` returned `null` and `page.getAnnotations()` returned
  an empty array on both pages: this PDF carries no interactive AcroForm
  widgets. Every field described in this schema is a printed label plus a
  blank/checkbox area, read from the text layer — there is no underlying
  form-field metadata to cross-check against.
- **Page 2** ("Annex A1 — Back portion of APL") is entirely LTO
  examiner/evaluator content (a road-test demerit-point score sheet, a
  driving-skills rater/chief-practical-examiner sign-off block, and a
  release-of-liability statement tied to the actual driving test) — no
  additional applicant-input fields beyond page 1 exist there. It is
  excluded from this schema's `fields`, consistent with this registry's
  established practice of modeling only applicant-facing content (e.g.
  `kr/koroad/driving-licence-application`'s exclusion of its own back-side
  test-result score grids).
- The header row containing "DISTRICT OFFICE ___" sits directly beneath the
  LTO's own printed institutional address ("East Avenue, Quezon City"); its
  layout does not make it certain whether this line is applicant-completed
  (naming the specific district office they are filing at) or
  office-stamped at intake. Modeled as an applicant-facing required field
  (`filingDistrictOffice`) but flagged here as this document's
  **lowest-confidence field** for an independent reviewer.
- No itemized "documentary requirements" checklist appears anywhere on Form
  No. 21 itself (unlike, e.g., `kr/koroad/driving-licence-application`'s own
  form, which lists its submission documents directly). The `documents[]`
  entries in this schema (PSA birth certificate, government-issued ID,
  LTO-accredited-clinic medical certificate, parent/guardian consent for a
  minor, application fee) are corroborated only from secondary,
  LTO-affiliated informational aggregator pages surfaced by a web search —
  **not** a primary LTO/LTMS publication — and are explicitly flagged as a
  lower-confidence part of this document. The form's own BLOOD TYPE / EYES
  COLOR / HEIGHT / WEIGHT fields corroborate that a physical/medical exam
  genuinely underlies the application, which lends some indirect support to
  the medical-certificate requirement specifically.
- No authoritative primary LTO fee schedule was found this cycle; consistent
  with `kr/koroad/driving-licence-application`'s precedent for a
  separately-set, non-form-stated fee, `applicationFee` is modeled without a
  fixed `amount`.

## Sources examined

- **Document `(id, version)`:** `ph/lto/drivers-license-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Land Transportation Office (LTO), an agency of the
  Department of Transportation (DOTr)
- **Primary source (retrieved via Wayback Machine, full text layer read):**
  <http://web.archive.org/web/20241211044849/https://lto.gov.ph/wp-content/uploads/2023/09/APL-Form_v3.pdf>
  — LTO Form No. 21 (v3, September 2023 edition)
- **Confirmed-gated, not used directly:** `https://lto.gov.ph/wp-content/uploads/2023/09/APL-Form_v3.pdf`
  (HTTP 403), `https://www.officialgazette.gov.ph/downloads/2014/06jun/DOTC-LTO-Form-21.pdf`
  (HTTP 403, older 2014 edition of the same form)
- **Secondary/corroborating (web search only, not directly fetched or
  cited as a `sourceRef`):** several LTO-informational aggregator pages
  describing current PSA birth certificate / government ID / LTO-accredited
  medical certificate / minor's parental-consent requirements — used only
  for the `documents[]` list, explicitly flagged above as lower-confidence
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Header, "DISTRICT OFFICE" | `filingDistrictOffice` |
| Title block + SP/DL/CL checkbox list | `licenseTypeApplied` |
| "TYPE OF APPLICATION (TOA)" A-K lettered list | `typeOfApplication`, `revisionOfRecordsType`, `revisionOfRecordsOtherDetails` |
| "ISSUE DATE" / "EXPIRY DATE" / "AGENCY CODE" | `existingLicenseIssueDate`, `existingLicenseExpiryDate`, `agencyCode` |
| "NAME (Family Name, First Name, Middle Name)" | `lastName`, `firstName`, `middleName` |
| "PRESENT ADDRESS" / "TEL.NO." / "CP NO." / "TIN" | `presentAddress`, `telephoneNumber`, `mobileNumber`, `tin` |
| "NATIONALITY" / "SEX" / "BIRTH DATE" / "HEIGHT" / "WEIGHT" / "LICENSE NUMBER" | `nationality`, `sex`, `birthDate`, `heightCm`, `weightKg`, `existingLicenseNumber` |
| "CIVIL STATUS (CS)" list / "BIRTHPLACE" | `civilStatus`, `birthplace` |
| "FATHER'S NAME" / "MOTHER'S NAME" / "SPOUSE NAME" | `fathersName`, `mothersName`, `spouseName` |
| "HIGHEST EDUCATIONAL ATTAINMENT (EA)" | `highestEducationalAttainment` |
| "DRIVING SKILL ACQUIRED FROM" (driving school / private licensed person / TESDA) | `drivingSkillSource`, `drivingSkillSourceName`, `drivingSkillSourceInstructorName`, `privateInstructorLicenseNumber` |
| "EMPLOYER'S BUSINESS NAME" / "TEL. NO" / "EMPLOYER'S BUSINESS ADDRESS" | `employerBusinessName`, `employerTelephoneNumber`, `employerBusinessAddress` |
| "BLOOD TYPE" / "EYES COLOR" / "ORGAN DONOR" checkbox list | `bloodType`, `eyeColor`, `isOrganDonor`, `organDonorAll`, `organDonorHeart`, `organDonorEyes`, `organDonorLiver`, `organDonorBones`, `organDonorKidneys`, `organDonorCornea`, `organDonorPancreas`, `organDonorLungs`, `organDonorSkin` |
| "EMERGENCY CONTACT PERSON" / "NO." / "ADDRESS" | `emergencyContactPerson`, `emergencyContactNumber`, `emergencyContactAddress` |
| "DRIVER'S LICENSE VEHICLE CATEGORY" table (9 category rows x Existing/Applied For) | `existingCategoryA`...`existingCategoryCE`, `appliedForCategoryA`...`appliedForCategoryCE` |
| Same table, "NON PRO"/"PRO" and "CLUTCH TYPE AT/MT" columns | `licenseRestrictionType`, `clutchType` |
| "CONDITIONS" 1-5 | `conditionWearsCorrectiveLenses`, `conditionUsesSpecialEquipmentForLimbs`, `conditionCustomizedVehicleOnly`, `conditionDaylightDrivingOnly`, `conditionHearingAidRequired` |
| "FILL THIS UP ONLY IF YOUR NAME ABOVE IS DIFFERENT..." / "PREVIOUS NAME" | `nameChangedFromPreviousLicense`, `previousName` |
| Perjury certification statement | `declarationTrueAndCorrect` |
| Disclosure-authorization statement | `consentsToLtoDisclosure` |
| Applicant signature line | `declarationSignature` (document) |

The entire "TO BE ACCOMPLISHED BY LTO PERSONNEL ONLY" block (evaluator
certification and signature) and all of page 2 (road-test score sheet,
driving-skills rater/chief-practical-examiner sign-off) were deliberately
excluded as office-/examiner-only content, not applicant input.

## Interpretive judgment calls disclosed for an independent reviewer

1. **`filingDistrictOffice`** — as noted above, it is not fully certain this
   header line is applicant-completed rather than office-stamped.
2. **`documents[]`** is sourced from secondary aggregator pages, not a
   primary LTO/LTMS publication, since Form No. 21 itself carries no
   itemized documentary-requirements list. Flagged as this document's
   weakest-sourced section.
3. **`appliedForCategoryCE`** (and, by construction, every other
   `appliedForCategory*` field) is modeled as `required: false` even though
   a genuine application is expected to select at least one category.
   GovSchema v0.3 has no native "at least one of N booleans is true"
   cross-field operator (`crossFieldValidation`'s `requirePresent` models
   conditional field *presence*, not a same-shape disjunction over a set of
   independent boolean fields), so this constraint is disclosed here rather
   than forced onto any single field.
4. **`drivingSkillSourceName`** applies across three different
   `drivingSkillSource` values (`driving_school`, `private_licensed_person`,
   `tesda`) but is left ungated by a `requiredWhen`, since GovSchema v0.3's
   condition grammar has no native "value is one of a set" operator distinct
   from a single `equals`/`notEquals` comparison (chaining three separate
   `requiredWhen` blocks onto one field is not supported by the spec's
   single-condition-per-field shape).
5. **`existingLicenseIssueDate`/`existingLicenseExpiryDate`** are modeled as
   unconditionally optional rather than gated to a specific `typeOfApplication`
   value, since the form places them in the TOA block without a printed
   scope note tying them to one specific lettered item.
6. **Organ-donor granularity**: only `organDonorAll` carries a
   `requiredWhen: isOrganDonor=true`; the eight individual-organ fields
   (Heart, Eyes, Liver, Bones, Kidneys, Cornea, Pancreas, Lungs, Skin) are
   modeled as independently optional booleans rather than each gated to
   `isOrganDonor`, since the form itself allows checking "ALL" or any
   combination of the individual items and does not treat them as a single
   mutually-exclusive/gated group.
7. This v1.0.0 fully sources the **Type A ("new")** transaction only. The
   other ten `typeOfApplication` values (Renewal, Conversion of Foreign DL,
   Additional Code/Category, Change of DL Classification, Expired DL with
   Valid FDL, Duplicate, Dropping of Category, Revision of Records,
   Enhancement of DL, Change of Clutch Type) are captured as a closed enum
   matching the form's own lettered list, but each one's distinct downstream
   document requirements are not separately modeled, consistent with
   `kr/koroad/driving-licence-application`'s precedent of fully sourcing one
   primary pathway.

## Test run (Phase 4 — mock-data conformance check)

A mock application packet exercising the "new Driver's License, driving-school
pathway, category B, non-professional, automatic" branch was authored at
`conformance/ph/lto/drivers-license-application/1.0.0/application-packet.json`
(+ human-readable `.txt` rendering) and checked against `tools/validate.mjs`
and `tools/validate-ajv.mjs` (both pass for the schema document itself). Six
scenarios (new DL, new Student Permit, married applicant, private-instructor
pathway, revision-of-records/change-name, organ-donor-false) were hand-traced
against the schema's `requiredWhen` conditions; see the packet's own `.txt`
file for the full trace. No automated conformance-runner exists yet in this
repository (per `conformance/README.md`'s own "Out of scope" note), so this
is a manual, not machine-executed, check.

## What is NOT yet independently verified

- A live LTO/LTMS (Land Transportation Management System) online intake
  walkthrough has not been performed; this document is sourced entirely from
  the gazetted paper form.
- Whether `filingDistrictOffice` is genuinely applicant-completed (see
  judgment call 1).
- The `documents[]` list (see judgment call 2) — corroborated only from
  secondary aggregator sources, not a primary LTO publication.
- The exact, current **application/licensing fee** — no authoritative primary
  LTO fee-schedule page was found this cycle.
- Whether `email`-equivalent contact fields or additional consent
  fields exist on the live LTMS online channel that are not present on the
  paper form (this document does not model an `email` field at all, since
  none appears anywhere on Form No. 21's text layer).
- The nine sub-processes captured only as `typeOfApplication` enum values
  without full field-level scoping (see judgment call 7).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live
LTO/LTMS intake or an authoritative LTO-published field-level checklist;
resolves any discrepancy by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5); and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
