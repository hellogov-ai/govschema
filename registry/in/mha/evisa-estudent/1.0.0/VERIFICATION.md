# Verification record — `in/mha/evisa-estudent` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this cycle picked up the e-Student Visa

This document was authored as a scoped Phase 3 follow-up to
[GOV-1224](/GOV/issues/GOV-1224#document-research) (a Phase 2 research-only
pass), tracked as [GOV-1228](/GOV/issues/GOV-1228). GOV-1224's research found
that `in/mha/evisa-etourist` (GOV-914) models only one of the e-Visa scheme's
several categories, and specifically:

- **Confirmed a non-gap:** a work/employment e-Visa does not exist. The
  Bureau of Immigration's own FAQ states "e-Visa is not allowed for
  employment" — employment always requires an in-person Regular (Employment)
  Visa through an Indian Mission, a fundamentally different, offline,
  mission-specific process out of scope for a destination e-Visa schema. No
  work-visa e-Visa schema was authored, per that finding.
- **Confirmed a real gap:** the e-Student Visa (e-S V) is active, distinct
  from e-Tourist (1-year/multiple-entry vs. e-Tourist's 30-day/1-year/5-year
  variants), and carries institution/course-specific fields and documents not
  modeled by the e-Tourist schema.

This document closes that gap, modeling the e-Student Visa (e-S V) category
specifically.

## Sources examined

- **Document `(id, version)`:** `in/mha/evisa-estudent` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bureau of Immigration, Ministry of Home Affairs, Government
  of India (Indian Visa Online portal) — same authority as
  `in/mha/evisa-etourist`.
- **Primary source (scheme rules and duration/entries):** the e-Visa scheme
  page (`evisa/tvoa.html`, fetched directly, HTTP 200), specifically its
  "Details of Visas" duration/entries table (e-Student Visa: one year, 365
  days from the date of grant of ETA, multiple entry) and its
  category-specific document-requirement list ("For e-Student Visa").
- **Primary source (purpose options and field structure):** a live
  headless-browser (Playwright) pass over
  `indianvisaonline.gov.in/evisa/Registration`'s "e-Visa Application" step —
  the same page already used for `in/mha/evisa-etourist` — this time
  inspecting the full `evisa_purpose` dropdown (68 total options across every
  e-Visa category) for its e-Student Visa (e-S V) entries, and the page's
  `evisaServiceAllowed` backend JSON model (fetched via XHR on nationality
  selection), which carries named keys for every category's category-specific
  fields, including `institute_name`, `institute_address`, `institute_email`,
  `institute_phone`, `course_name`, `course_start_month`, `course_start_year`,
  and `coursedurations`.
- **Corroborating source:** the official sample application walkthrough PDF
  (`evisa/images/SampleForm.pdf`) for the shared applicant/passport/
  address/family/reference/security-screening field blocks, identical to
  those already sourced and modeled for `in/mha/evisa-etourist`.
- **Access blocks encountered:** the wizard's Applicant/Family/Visa Details
  pages (reached after the "e-Visa Application" registration step) sit past
  a live CAPTCHA, exactly as recorded for `in/mha/evisa-etourist`. This means
  the institute/course fields' *rendered* input page — its exact labels,
  field order, and per-field required/optional split — could not itself be
  observed; their existence and names are instead corroborated by the
  `evisaServiceAllowed` JSON model (a direct read of the site's own backend
  field contract) and by tvoa.html's document-requirement wording, which
  names the same concepts (admission letter with course duration, financial
  support, institution).
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## e-Student Visa purpose options (evisa_purpose dropdown)

The live `evisa_purpose` dropdown (id `visaPurposeDropdown`) carries 9 e-S V
entries, all captured verbatim during this pass:

| Code | Live dropdown text | Modeled enum value |
|---|---|---|
| 469 | FOR THOSE COMING TO PURSUE COURSES ON INDIAN LANGUAGES AND INDIAN KNOWLEDGE SYSTEM | `indian_languages_and_knowledge_systems` |
| 431 | FOR THOSE COMING UNDER STUDENT EXCHANGE PROGRAMME FROM INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `student_exchange_programme` |
| 421 | FOR BUDDHIST STUDIES IN INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `buddhist_studies` |
| 426 | FOR HIGHER EDUCATION (INCLUDING IN SOUTH ASIAN UNIVERSITY AND NALANDA UNIVERSITY) FROM INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `higher_education` |
| 420 | FOR STUDIES IN YOGA IN INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `yoga_studies` |
| 428 | FOR STUDIES IN VEDIC CULTURE IN INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `vedic_culture_studies` |
| 429 | FOR STUDIES IN INDIAN SYSTEMS OF MUSIC AND DANCE IN INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `indian_music_and_dance_studies` |
| 430 | FOR SHORT TERM COURSES FROM INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `short_term_courses` |
| 432 | FOR THOSE COMING TO PURSUE EDUCATION, TRAINING AND SKILL DEVELOPMENT IN AYUSH PRACTICES FROM INSTITUTES REGISTERED ON STUDY IN INDIA PORTAL | `ayush_education_training_skill_development` |

The dropdown also confirmed a separate e-Family Visa (e-SX V) category ("FOR
DEPENDENT OF E-STUDENT VISA", codes 475/425) — this is the companion
dependent-visa category GOV-1224 flagged as `in/mha/evisa-family`, a related
but distinct future gap, not modeled here. No e-Employment/e-Work category
exists anywhere in the dropdown, corroborating GOV-1224's confirmed non-gap.

## Institute/course field evidence: the `evisaServiceAllowed` JSON model

Selecting a nationality on the live "e-Visa Application" page fires an XHR to
`indianvisaonline.gov.in/evisa/json/evisaServiceAllowed`, which returns a
single JSON object used as the client-side form-data model across **every**
e-Visa category (not just Student) — most keys are empty/null placeholders
until a purpose is selected. The response captured during this pass includes,
among many other categories' keys:

```json
{
  "institute_name": null, "institute_address": null,
  "institute_email": null, "institute_phone": null,
  "course_name": "", "course_start_month": "", "course_start_year": "",
  "coursedurations": "", "student_id": null, "invitationLatter": "",
  "duration": 0, "duration_choose_appl": "", "duration_id": 0
}
```

This is read as strong, direct evidence of the real backend field set for
the Student category (it is the site's own contract, not an inference from
labels), and the six fields carried in this document —
`instituteName`/`instituteAddress`/`instituteEmail`/`institutePhone`/
`courseName`/`courseDuration`/`courseStartMonth`/`courseStartYear` — map 1:1
onto `institute_name`/`institute_address`/`institute_email`/
`institute_phone`/`course_name`/`coursedurations`/`course_start_month`/
`course_start_year`. Two keys present in the same object were **not**
modeled here because they could not be corroborated against a category-
specific document or description and would otherwise be guesses:

- **`student_id`** — ambiguous; may be an internal record identifier
  assigned once an institute registered on the Study in India portal
  confirms the applicant (a referral-linkage concept touched on by the
  sibling `referralExists`/`referralcode` keys), not necessarily an
  applicant-supplied field. Not modeled.
- **`invitationLatter`** — appears in the same object but the "Invitation
  Letter" concept is documented on tvoa.html for other categories (Business,
  Medical Attendant, e-Entry) rather than for Student, whose own document
  requirement instead names a "Letter of admission"; treated as belonging to
  those other categories, not Student, and not modeled here.

Because the exact rendered page for these fields sits past the CAPTCHA gate,
their `required`/optional split (`instituteEmail`/`institutePhone` are
modeled `required: false`) and precise field order are the producer's best
judgment from the available evidence, not an observed rendering — flagged
as an explicit gap below.

## Student-specific document requirements

Read verbatim from tvoa.html's category-specific document-requirement list,
"For e-Student Visa":

- Scanned Bio Page of the passport (already modeled as `passportBioPageScan`,
  shared with every category).
- "No Objection Certificate from the Ministry of Health and Family Welfare,
  Govt of India (Incase the applicant is joining a medical or paramedical
  course)" — modeled as the conditional `medicalOrParamedicalNoc` document,
  gated on the new `isMedicalOrParamedicalCourse` field.
- "A letter of support from the parent/guardian accompanied by a bank
  guarantee certificate, or Previous 06 months of bank statement" — modeled
  as `financialSupportProof`.
- "Letter of admission from a recognised Indian educational institution with
  duration of the course" — modeled as `admissionLetter`.

## Scope decisions

- **Purpose enum, not a separate schema per sub-category.** All 9 e-S V
  options share the same duration/entries (one year, multiple entry per
  tvoa.html) and the same institute/course field block; they differ only in
  the course-type description, so they are modeled as a single
  `eStudentVisaPurpose` enum field, mirroring `evisa-etourist`'s
  `eTouristVisaVariant` pattern.
- **Tourist-specific fields dropped from the shared "visa details" step.**
  `evisa-etourist`'s `visa_details` step includes `placesToBeVisited`,
  `hasBookedAccommodationViaTourOperator`, and `expectedPortOfExit` — these
  read as tourism-specific (sightseeing itinerary, tour-operator bookings)
  and were not corroborated as applicable to the Student category by any
  source examined this pass, so they are omitted here. The previous-visit,
  refusal-history, and SAARC-travel-history questions are retained, since
  tvoa.html's and the sample walkthrough's security-screening language reads
  as generic across e-Visa categories rather than tourist-specific.
- **e-Family Visa (e-SX V) not modeled.** Tracked separately as a future
  `in/mha/evisa-family` gap per GOV-1224's recommendation.
- **Work/employment e-Visa not modeled.** Confirmed not to exist (see
  above); no schema authored for it, consistent with GOV-1224's finding.

## Known gaps (explicit, not guessed)

Carried over from `evisa-etourist` (same shared wizard, not independently
re-confirmed this pass since the live dropdown/document-checklist evidence
did not change): `gender`, `religion`, `educationalQualification`, and
`previousVisaType` full option lists are unconfirmed and modeled as free
`string` fields rather than guessed enums.

New to this document:

- **Institute/course field render page unreached** — see "Institute/course
  field evidence" above; the exact rendered labels, order, and per-field
  required/optional split are inferred from the `evisaServiceAllowed` JSON
  model and tvoa.html's document wording, not from an observed rendering.
- **`instituteEmail` / `institutePhone`** modeled `required: false` pending
  confirmation.
- **Study in India portal registration/referral** — 8 of the 9 e-S V purpose
  descriptions reference "institutes registered on Study in India portal"
  as an eligibility precondition on the *institution*, and the JSON model's
  `referralExists`/`referralcode` keys hint at a portal-referral concept.
  This document does not model portal registration/referral status; an
  agent consuming this schema cannot itself verify institute eligibility.

## Mock-data test run

Per the registry's established practice (see `evisa-etourist`'s
VERIFICATION.md), two representative scenarios were authored and checked
field-by-field against every `type`/`required`/`requiredWhen`/`enum`/
`maxLength`/`minimum`/`maximum`/eligibility constraint in `schema.json`,
using a one-off Python condition evaluator (not committed to the repo)
implementing the same `equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/
`not` grammar as GSP-0013's `Condition` schema (spec v0.3 §8.1), extended to
also check `documents[].requiredWhen`.

**Scenario 1 — Sri Lankan Buddhist-studies student, first visit, non-medical
course:** Kamal Perera, enrolling in Buddhist Studies at Nalanda University,
no Ebola-region travel, no prior India visit, no other valid passport,
single, permanent address same as present, `isMedicalOrParamedicalCourse`
false (so no MOHFW NOC document required).

**Scenario 2 — Nigerian AYUSH (paramedical) student, repeat visitor,
Ebola-region travel history, prior refusal:** Chioma Okafor, enrolling in a
BAMS (Ayurvedic Medicine) course at the All India Institute of Ayurveda,
`isMedicalOrParamedicalCourse` true (triggering the MOHFW NOC document
requirement), Ebola-region travel more than 21 days ago (triggering and
clearing the health-screening follow-ups), a name change, a distinct
permanent address, another valid (UK) passport, a previous e-Tourist Visa
and India visit, a prior UK visa-extension refusal, and SAARC-country travel
in the last 3 years.

Both runs:

```
PASS — Scenario 1 - Sri Lankan Buddhist-studies student, first visit, non-medical course satisfies every type/required/requiredWhen/enum/maxLength/min-max/eligibility constraint.
PASS — Scenario 2 - Nigerian AYUSH (paramedical) student, repeat visitor, Ebola-region travel history, prior refusal satisfies every type/required/requiredWhen/enum/maxLength/min-max/eligibility constraint.
```

A deliberately-broken variant of Scenario 1 (dropping `declarationOfCorrectness`,
flipping `visitedEbolaAffectedCountriesLast21Days` to `true` without its two
gated follow-up questions, setting `isMedicalOrParamedicalCourse` to `true`
without providing the `medicalOrParamedicalNoc` document) was also run, to
confirm the evaluator itself correctly detects violations rather than
passing everything by construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'completed21DaysSinceEbolaTerritoryExit'
  - MISSING required field 'hasEbolaSymptomsOrDisease'
  - MISSING required field 'declarationOfCorrectness'
  - MISSING required document 'medicalOrParamedicalNoc'
```

Scenario 2 also correctly triggered every `requiredWhen`-gated follow-up (the
Ebola-exposure sub-questions, the name-change detail, the other-passport
detail fields, the permanent-address fields, the full previous-visit block,
and the conditional `medicalOrParamedicalNoc` document), while Scenario 1
(no Ebola exposure, no name change, address unchanged, first visit,
non-medical course) correctly required none of them.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/in/mha/evisa-estudent/1.0.0/schema.json
ok   registry/in/mha/evisa-estudent/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/in/mha/evisa-estudent/1.0.0/schema.json
ok   registry/in/mha/evisa-estudent/1.0.0/schema.json [v0.3]
```

## Not modelled (system-derived, or out of this version's scope)

- **Duration and number of entries** are not separate input fields — the
  e-Student Visa's one-year/multiple-entry grant is fixed regardless of
  which of the 9 purpose sub-options is chosen, per tvoa.html.
- **CAPTCHA**, the read-only "Confirm Details" verification-page summary,
  and payment-gateway redirection are not modelled, same as
  `evisa-etourist`.
- The e-Family Visa (e-SX V) dependent category and the scheme's other seven
  non-Student, non-Tourist categories (see Scope decisions above).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer completes a live walkthrough of
`indianvisaonline.gov.in/evisa/Registration` past the CAPTCHA gate with the
Student purpose selected, confirms the institute/course fields' exact
rendered labels, order, and required/optional split against the
`evisaServiceAllowed`-derived field set modeled here, confirms the option
lists flagged as gaps above (gender, religion, educational qualification,
previous-visa-type), and records the outcome here — shipping a new schema
version if discrepancies are found (VERSIONING.md §3, immutability).

## Scope and jurisdiction notes

- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  including on a `documents[]` entry (`medicalOrParamedicalNoc`), per
  spec v0.3 §9.1. `fieldRole: eligibility` / `eligibleValues` (GSP-0018) is
  used for the Ebola 21-day-clearance question and the two mandatory
  declaration checkboxes, matching `evisa-etourist`'s pattern.
- Same destination-country e-Visa modelling stance as `evisa-etourist` and
  `sg/ica/entry-visa-application`: India is the destination, the applicant
  is a foreign national.
- India's Visa vertical now has two published e-Visa category schemas
  (e-Tourist, e-Student) out of the scheme's nine total categories; the
  work/employment non-gap is now recorded in two places (`evisa-etourist`'s
  scope notes implicitly, and explicitly here) so a future cycle does not
  re-investigate it.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-05** (6
months).
