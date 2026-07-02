# Verification record — `us/fl/doe/online-voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived by directly operating the live
`registertovoteflorida.gov` wizard end-to-end with a headless, real browser.
It remains `draft`, not `verified` — see "What was not done" below.

## Sources examined

- **Document `(id, version)`:** `us/fl/doe/online-voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of State, Division of Elections
  ("FL DOE").
- **`https://www.registertovoteflorida.gov/`** — the Florida Online Voter
  Registration System (OVR). This is an Angular single-page application; a
  plain `curl`/static fetch returns only an empty shell (confirmed — see
  "Method" below), so the entry page, its five expandable info panels ("How
  to submit an online application", "Who is eligible to register", "How to
  pre-register before you turn 18", "When to register", "What browsers to
  use"), and all three wizard steps were read by rendering the page with a
  real (non-headless-detected) Chromium instance and extracting
  `document.body.innerText`, matching the discipline in
  [`gov-source-fidelity-verification`](../../../../../../docs/agent-consumption.md)
  but for a JS-rendered app rather than server HTML.
- **Step 1 (`/eligibilityreactive`)** — Reason for Application (3 checkboxes),
  Eligibility (US citizenship radio + two affirmation checkboxes), and,
  revealed after those are filled, Personal Identification Information
  (FLHSMV DL/ID number + issue date, or last-4 SSN, name, DOB). The exact DL
  number format was confirmed via the page's own "Example — Florida Driver
  License and Identification Card" popup image (`D123-456-83-789-0`,
  displayed with dashes but stored as 1 letter + 12 digits — confirmed by
  observing the live input silently truncate a deliberately-too-long typed
  value).
- **Step 2 (`/rdfromvalidation` when FLHSMV verification of mock data
  fails, routing to the "Start Paper Application" branch)** — Political
  Party Preference, Legal Residential Address, Mailing Address, Former
  Address/Name Where Last Registered, Personal Information (gender,
  race/ethnicity, phone, sample-ballot email, place of birth),
  Assistance/Volunteer Services, Military/Overseas Status. All `<input>`/
  `<select>` DOM nodes on this page were enumerated programmatically (ids,
  types, option lists), not just their rendered label text.
- **Review Page (`/reviewform`)** — confirmed that selecting a residential
  address (a single autocomplete field) silently derives the county (e.g.
  selecting a Titusville, FL address populated "Brevard" with no separate
  county input anywhere in the DOM).
- **Prefilled application (`/appform`)** — the live-rendered "Florida Voter
  Registration Application Instructions and Form (DS-DE 39, R1S-2.040,
  F.A.C.)(eff. 04/24/2024)", populated with the same mock data entered in
  Steps 1-2. This is the strongest single source: it exposes the exact
  paper-form row numbering ("Rows 1 – 6 and 15 must be completed for an
  application to be processed"), the full felony/mental-incapacity/oath
  statutory language, and the closed-primary/NPA-default party-affiliation
  rule, letting this review cross-check the wizard's own field set against
  the state's published form of record in one page.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Method

`curl`/static HTTP fetch of `registertovoteflorida.gov` (and its Wayback
Machine snapshot) returns a near-empty Angular shell with no field content —
this application is entirely client-rendered. This review therefore drove a
real, headless Chromium instance (`playwright-core`, installed to a scratch
directory outside the repo, launched with the system libraries at
`/paperclip/chrome-sysroot` per this environment's browser-screenshot
convention) with a realistic desktop user agent, and:

1. Loaded the home page and expanded all five info panels to capture their
   full text.
2. Clicked "Register or Update" into Step 1, filled Reason for Application
   and Eligibility with mock affirmative answers, and captured the
   dynamically-revealed Personal Identification Information section.
3. Filled mock FLHSMV identity data (a syntactically well-formed but
   fictitious DL number, SSN-last-4, name, DOB) and advanced — FLHSMV could
   not verify this mock identity (as expected; no real DL/ID exists to
   verify against), so the wizard offered "Edit", "Start Paper Application",
   or "Exit". This review clicked "Start Paper Application" to continue
   observing the field set, since the source's own "How to submit an online
   application" panel states the electronic-submit and paper-prefill paths
   differ only in the final action, not the data collected.
4. Filled Step 2 (party affiliation, address via the live USPS-style
   autocomplete, mailing/former-address toggles, personal information,
   assistance/military questions) and advanced to the Review Page, then to
   the final prefilled DS-DE 39 print view.
5. Stopped there. No "Print" or "Submit" action was invoked, and no real
   personal data was used at any point.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Reason for Application" (3 checkboxes) | `reasonForApplication` |
| "Are you a citizen of the United States of America?" | `usCitizen` |
| "I affirm that I am not a convicted felon..." | `notAFelonAttestation` |
| "I affirm that I have not been adjudicated mentally incapacitated..." | `mentalIncapacityAttestation` |
| "I have never been issued a Florida DL or Florida ID card." / "...a social security number." | `isDLUnavailable`, `isSSNUnavailable` |
| "Florida DL or Florida ID card number (DLN):" / "Card issued (ISS) date:" / "...last four digits of your Social Security Number:" | `flDlNumber`, `dlIssueDate`, `ssnLast4` |
| "Last Name:" / "First Name: (If applicable)" / "Middle Name: (If applicable)" / "Suffix: (If applicable)" / "Date of Birth (DOB):" | `lastName`, `firstName`, `middleName`, `nameSuffix`, `dateOfBirth` |
| "Party Affiliation *" (18-option `<select>`) | `partyAffiliation` |
| "Address:" (Legal Residential Address, autocomplete) | `residentialAddress` |
| Review Page auto-derived "County: Brevard" | `residentialCounty` |
| "Mailing address is the same as residential address." + "United States"/"International" toggle + "State :"/"Address:" | `mailingAddressSameAsResidential`, `mailingAddressCountryType`, `mailingAddressState`, `mailingAddress` |
| "Former Address Where You Were Last Registered to Vote" (State + Address) | `formerAddressState`, `formerAddress` |
| "Former Name Where You Were Last Registered to Vote" | `formerFirstName`, `formerMiddleName`, `formerLastName` |
| "Gender" / "Race/Ethnicity" / "Phone Number" | `gender`, `raceEthnicity`, `phoneNumber` |
| "Email me a sample ballot at:" → reveals "Email" + "Confirm Email Address" | `requestSampleBallotByEmail`, `publicEmailAddress`, `emailConfirmation` |
| "State or Country of Birth" | `placeOfBirth` |
| "I will need help voting." / "I would like to be a poll worker or election worker." | `votingAssistanceRequired`, `pollWorkerVolunteer` |
| "I am one of the following:" (4 radio options) | `militaryOverseasStatus` |
| DS-DE 39 Row 15 Oath text | `oathAffirmed` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **The FLHSMV-verified electronic-submission branch was not independently
  exercised.** No real Florida DL/ID exists to verify against in this
  environment, so FLHSMV verification of the mock identity failed and the
  wizard routed to "Start Paper Application" rather than the fully
  electronic path. The Step 2/3 field set is the same underlying Angular
  form component tree in both branches (confirmed by inspecting DOM element
  ids, not just rendered text, before and after the branch point) and the
  source's own "How to submit an online application" panel describes the
  difference as which action concludes the process (electronic submit vs.
  print-sign-mail), not a different data model — but this is inference from
  the one branch actually walked, not independent observation of the other.
- **`residentialAddress` and `mailingAddress` are modelled as single
  autocomplete strings, not decomposed street/unit/city/ZIP fields.** The
  live DOM exposes exactly one editable `<input>` for each — a USPS-style
  geocoded address search — even though the resulting prefilled DS-DE 39
  prints separate Street/Unit/City/County/Zip cells. Modelling separate
  city/ZIP/unit fields here would imply the applicant enters them
  independently, which the live wizard does not support; `residentialCounty`
  is included (system-derived, `required: false`) because the paper form
  prints it as one of its six mandatory rows, but it is explicitly
  documented as non-entered.
- **`mailingAddressCountryType`'s `international` branch was seen to exist
  but not field-verified.** The "United States"/"International" toggle was
  observed; only the "United States" sub-form (`mailingAddressState` +
  `mailingAddress`) was filled and advanced past. The International
  branch's exact field set (e.g. a free-text country field vs. a country
  `<select>`) is unconfirmed.
- **`mailingAddressState`'s option list is assumed identical to
  `formerAddressState`'s.** Both selects were observed to share the same
  53-value US-state/territory/military-postal-code set
  (`AA`/`AE`/`AP` + `FM`/`MH`/`PW`) and appear to render from the same
  Angular component, but the mailing-address variant's option list was not
  independently re-enumerated value-by-value.
- **`militaryOverseasStatus` reveals no further fields.** Selecting each of
  the three affirmative radio options (active-duty member, spouse/dependent,
  resides-outside-US-citizen) was tried; none revealed an APO/FPO address,
  ballot-delivery-method, or other UOCAVA-specific follow-up field in this
  wizard. This is recorded as observed behaviour, not a claim that Florida's
  UOCAVA process has no such follow-up elsewhere (e.g. a separate FPCA
  process is out of scope for this schema).
- **`partyAffiliation` modelled as `required: true`, diverging from the
  printed DS-DE 39's own "must be completed" row list (1-6, 15), which
  excludes Row 11 (party affiliation).** The live wizard visibly enforces a
  selection (a red "*Required" hint appears beneath the `<select>` if left
  blank) even though the paper form and its own guidance text state a
  first-time registrant who does not choose a party is registered No Party
  Affiliation (NPA) by default. This schema follows the wizard's actually-
  enforced behaviour over the paper form's looser statement, on the
  principle that the schema should describe what the live system requires
  an applicant to submit.
- **Reason-for-application checkboxes modelled as a single enum,** not three
  independent booleans, because a coherent application logically selects
  exactly one reason; the underlying DOM does allow checking more than one
  simultaneously (observed while iterating on this schema), which this
  schema treats as a source UI looseness rather than a modelled
  possibility.
- **Fee/deadline/statutory citation text (e.g. the 29-day registration
  deadline, the 3rd-degree-felony penalty) is recorded in field/document
  descriptions for context only and is not itself validated data** — the
  same convention used throughout this registry for fee schedules and
  penalty notices.

## Relationship to other Florida schemas

This is the first `us/fl/doe/*` (Division of Elections) schema, alongside
the existing `us/fl/doc/*` (Division of Corporations/Sunbiz), `us/fl/doh/*`
(Department of Health), and `us/fl/flhsmv/*` schemas — the authority-slug
convention (division-specific slug under the shared `us/fl/*` state
namespace, not the parent Department of State) follows the precedent
recorded in `us/fl/doc/llc-formation`'s own verification notes. It also
closes the last open candidate slot in the National ID & Civic Documents
vertical's voter-registration coverage.

## Conformance

No `conformance/us/fl/doe/online-voter-registration/1.0.0/` packet is
included in this version; a future revision should add one exercising the
eligible, new-registration, same-mailing-address path once the schema is
re-reviewed against a real FLHSMV-verified run.
