# Verification record — `us/ca/sos/voter-registration` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

`draft`, not `verified`, because the walkthrough stopped at the Review page
(Step 4 of 5) without pressing the final `Submit` action — no real
application was filed, and the confirmation/electronic-signature step that
would follow was never observed. See "What was not done" below.

## Sources examined

- **Document `(id, version)`:** `us/ca/sos/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** California Secretary of State (SOS), the office that
  administers California's online voter registration system under state
  election law.
- **`https://registertovote.ca.gov/`** — the SOS's public voter-registration
  landing page. Fetched live via `WebFetch`, 2026-07-02 (HTTP 200). Static
  informational page (confirmed by a direct `curl` fetch, not a JS
  SPA-shell): identifies the driver-license/ID-or-SSN identity-proofing
  model, the 16-17 pre-registration pathway, the 9 supported election-material
  languages, and links to the live application.
- **`https://covr.sos.ca.gov/`** — the live online voter registration
  **application itself**, reached via `registertovote.ca.gov`'s "Register to
  Vote Now" link. This is a server-rendered ASP.NET MVC application (not a
  client-side SPA), confirmed by directly fetching it with `curl` and reading
  literal `<form>`/`<input>`/`<select>` HTML — the same technique that failed
  to reach content at FL's `registertovoteflorida.gov` (an Angular SPA
  requiring a real browser) and at AU's `enrol.aec.gov.au` (network-blocked
  entirely). **This document is sourced by directly operating this live
  server**: fetching each wizard page's own anti-forgery token
  (`__RequestVerificationToken`) and session cookies, then `POST`ing
  well-formed field data to `/en/OnlineVoterRegistration/PostForm` and reading
  the server's own re-rendered next-step HTML — not a headless browser, but
  the same practical effect of exercising the real, live, server-validated
  wizard end-to-end, with mock/placeholder applicant data throughout
  (`Jane Doe`, DOB `1990-06-15`, address `123 Main St, Sacramento, CA 95814`)
  and no real submission.
  - **Step 1 — Classification.** Fetched live, 2026-07-02. One field,
    `ClassificationType`, a 7-option radio group. Supplied option `1` ("A
    U.S. citizen and resident of California").
  - **Step 2 — Personal Information.** The single largest page in the
    wizard, combining four field groups: Qualifications, Personal
    Information (name, contact, date/place of birth, California
    driver-license-or-ID/last-4-SSN identity proofing, ethnicity, language
    preference), Home and Mailing Address (including a no-street-address
    branch and a previous-registration recall section), and Political Party
    Preference. Posted a complete, valid submission and received Step 3 back
    (HTTP 200), confirming server-side acceptance of every field modelled in
    this step.
  - **Step 3 — Additional Information/Consent.** Vote-by-Mail informational
    text (no field), State/County Voter Information Guide mail preferences,
    electronic notification email, poll-worker volunteering (with a
    spoken-languages sub-list), accessibility, third-party-assistance
    disclosure, and the final penalty-of-perjury Affirmation checkbox. Posted
    a complete, valid submission and received Step 4 (Review) back (HTTP
    200).
  - **Step 4 — Review.** A read-only `<dl>` summary of every value submitted
    in Steps 1-3, confirming the server's own model of the data (echoed back
    correctly, including the county resolved from the numeric `CountyId` to
    its name, `SACRAMENTO`). Its own form has only `Edit` and `Submit`
    buttons; **`Submit` was never pressed.**

## What was not done — the one honest gap

**The final `Submit` action on the Review page, and whatever confirmation or
electronic-signature step follows it (the wizard's Step 5 of 5), were never
exercised**, to avoid filing a real voter registration application. This
schema's field inventory is therefore complete through the Review page but
does not model whatever Step 5 itself collects (if anything beyond a final
confirmation — the Review page's own `Submit` button suggests the
application may be filed directly from Step 4, with Step 5 being a
confirmation/receipt screen rather than a further data-collection step, but
this was not observed directly).

Additionally, **only the `us_citizen_ca_resident` classification branch
(`ClassificationType=1`) was walked.** The other six classification values
(active-duty military/Merchant Marine, eligible spouse/dependent, activated
National Guard, and the three overseas-citizen categories) share the same
wizard and the same `ClassificationType` field, but were not independently
exercised; they plausibly surface additional fields (an overseas mailing
address, military unit information, or a UOCAVA-specific declaration) not
captured in this schema. This mirrors `au/aec/voter-enrolment`'s decision not
to model AEC's special-category enrolment forms.

## Modelling decisions

- **Date of birth collapsed to one field.** The source renders `dateOfBirth`
  as three separate controls (`MonthOfBirth`, `DayOfBirth`, `YearOfBirth`),
  collapsed here to one field per this registry's comb-field convention
  (e.g. `au/aec/voter-enrolment`'s own `dateOfBirth`).
- **Large geographic dropdowns (state, country, county) modelled as free
  text, not enums.** The source presents fixed dropdowns for U.S.
  state/territory (59 options), foreign country/region (~200 options), and
  California county (58 options). Rather than embed these as `enum`
  vocabularies, they are modelled as `string` fields with a `maxLength`, per
  this registry's existing convention for large geographic value sets (e.g.
  `us/dos/immigrant-visa-ds260`'s `stateProvinceOfBirth`/`countryOfBirth`
  fields, and `au/aec/voter-enrolment`'s own state-abbreviation fields, which
  used a short string rather than the full option list).
- **`spokenLanguages` modelled as a comma-separated string, not an array.**
  GovSchema v0.3's field `type` enum has no `array`/multi-select type (a
  known gap tracked as GSP-0009). Modelled as a comma-joined string with the
  vocabulary spelled out in the field's own `description`, matching the
  precedent set by `us/uscis/travel-document-i131`'s `race` field.
- **`otherSpokenLanguage`'s true condition (`spokenLanguages` contains
  `other`) is documented in prose, not encoded.** The shared `Condition`
  grammar (GSP-0013) compares a field's whole value against a literal
  (`equals`/`notEquals`/`in`), with no substring/contains operator over a
  comma-joined string. `visibleWhen` is set to the broader
  `wantsToBePollWorker == true` condition instead, with the finer condition
  named in the field's `description` — the same treatment
  `au/aec/voter-enrolment` gave its `citizenshipCertificateNumber` exemption
  rule.
- **`otherLanguage`'s server-observed requiredness does NOT match its
  intended semantic — flagged, not encoded.** The live server rejected a
  Step 2 submission with `languagePreference` set to `english` (value `1`)
  and `otherLanguage` left blank, with the error "Enter your other language
  preference." Supplying any non-empty value for `otherLanguage` (regardless
  of the selected `languagePreference`) satisfied the server. This schema
  models `otherLanguage` with `requiredWhen`/`visibleWhen` conditioned on
  `languagePreference == "other"` — its evident, intended meaning, and the
  behavior a compliant client (e.g. a browser running the page's own
  client-side JavaScript, which toggles the field's visibility and required
  state) would present to a real applicant — rather than baking in what
  looks like a raw-endpoint validation quirk of the server's own model
  binder. Worth re-checking on next review in case this is intentional
  (e.g. a defensive default) rather than a bug.
- **`politicalParty`'s `requiredWhen` was confirmed, not assumed.** The
  underlying `<select id="PoliticalPartyId">` carries a static HTML
  `required="required"` attribute unconditionally, matching the same pattern
  as `otherLanguage` above — but unlike `otherLanguage`, submitting
  `politicalPartyPreferenceChoice=no_party_or_none` with `politicalParty`
  entirely omitted was accepted by the server without error (confirmed by
  the live walkthrough), so this field's `requiredWhen` condition reflects
  directly observed, not inferred, server behavior. `otherPoliticalParty`'s
  analogous condition (`politicalParty == "other_party"`) was not
  independently tested and is modelled by the same reasoning pattern rather
  than direct observation.
- **Previous-registration and third-party-helper fields modelled as
  optional even when their gating boolean is true.** Neither
  `Previous.FirstName` (etc.) nor
  `ReceivedThirdPartyHelp.ThirdPartyPersonName` (etc.) carry a `required`
  attribute or `data-val-required` rule in the source HTML, despite the
  form's own instructional text implying they should be filled in
  (`"the person who helped you must fill out the questions below"`). This
  schema follows the literal, observed server behavior — `required: false`
  throughout — rather than the instructional text's implication, consistent
  with this registry's practice of matching what the server actually
  enforces.
- **`placeOfBirthType` and its dependents modelled as optional.** No
  `required` attribute or `data-val-required` rule was present on
  `PlaceOfBirthType`, `StatePlaceOfBirthId`, or `CountryPlaceOfBirthId` in
  the source HTML, and a submission leaving all three blank was accepted by
  the server during the live walkthrough.
- **No `documents[]` member.** No file-upload field (`type="file"`) appears
  anywhere in Steps 1-4; California's online system verifies identity
  against DMV/SSA records by reference number, not by uploaded scans, matching
  how this registry omits `documents[]` when a process only asks for
  reference numbers.
- **`classification` and `affirmation` given `fieldRole: eligibility`**,
  consistent with how `au/aec/voter-enrolment` used `fieldRole` on its own
  `evidenceOfIdentity` and general eligibility-gating fields. `isUSCitizen`
  and `registrationChoice` are also eligibility-adjacent but are kept as
  ordinary gating booleans/enum per the same reasoning already applied to
  `au/aec/voter-enrolment`'s `citizenshipStatus`.

## Out of scope

- **The six non-`us_citizen_ca_resident` classification branches** (active
  duty military/Merchant Marine, eligible spouse/dependent, activated
  National Guard, and the three overseas-citizen categories) — see "What was
  not done" above.
- **Whatever Step 5 of 5 (post-Review) collects**, if anything, beyond a
  final submit/confirmation action.
- **Ballot-request and vote-by-mail-specific processes** beyond the
  `wantsStateVoterGuideByMail`/`wantsCountyVoterGuideByMail` mail
  preferences already modelled — distinct SOS/county processes, not modelled
  here.
- **Registration status lookup / "Check Your Registration Status"** — a
  distinct, read-only SOS tool, not modelled here.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6
months). Re-walk the wizard through Step 5 (or as far as ethically possible
without filing a real application) to resolve the one open gap, re-check
whether the `otherLanguage` requiredness quirk still reproduces, and promote
`status` to `verified` if the full flow through submission confirmation is
observed, per `us/fl/doe/online-voter-registration`'s and
`de/finanzamt/tax-identification-number`'s precedent.
