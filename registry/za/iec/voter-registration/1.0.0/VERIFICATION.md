# Verification record — `za/iec/voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

South Africa was the only one of this registry's 13 published jurisdictions
with no voter-registration schema (all others have one published, or, for
Singapore, a documented non-applicability finding — automatic/NRIC-based
registration, GOV-1075). This closes that gap. Unlike South Africa's known
login-gated Visa system (flagged open across three prior cycles — GOV-1174,
GOV-1187, GOV-1201), the IEC's `registertovote.elections.org.za` VoterPortal
is a public, unauthenticated self-registration platform and was directly
reachable this cycle.

## Access notes

- `registertovote.elections.org.za` is a server-rendered Blazor application.
  It loaded cleanly over a direct headless-browser fetch (no bot-block, no
  Cloudflare/WAF challenge). Its home page ("Register to vote in-country" /
  "Apply for a special vote" / "Special vote application status" / "Recover
  user profile") was reached, and clicking through to "Register to vote
  in-country" → "Get started" reached
  `registertovote.elections.org.za/voter/registration/za`, the "Online voter
  self-registration — Identity verification" screen.
- That screen's three controls were read directly from the live DOM: a text
  input with placeholder `Enter your 13-digit ID number` and HTML
  `maxlength="13"`; a checkbox whose label is the verbatim Section 97/section
  88 Electoral Act declaration quoted in `eligibilityDeclaration.sourceRef`;
  and a file-upload control (`id="fileInput"`).
- A syntactically-valid mock South African ID number was constructed
  (`900101` birthdate + `5800` sequence + `0` SA-citizen digit + `8` +
  correct Luhn check digit → `9001015800082`) and submitted. The platform
  rejected it with the on-page message `ID number is invalid. Your ID number
  must be 13-digit South African ID number. Please re-enter your ID number`
  plus a modal `Invalid ID Number / The ID number you have entered is not
  valid. Please check and try again.` — this confirms the platform performs
  a real-time Department of Home Affairs population-register lookup against
  the ID number, not merely a 13-digit format check, and that no schema field
  beyond this first screen could be reached without a genuine, currently-
  registered South African ID number. Consistent with this registry's
  treatment of other identity-gated live flows (e.g. `za/dha/smart-id-card-application`,
  `in/mca/company-incorporation-spice-plus`), the remaining fields are sourced
  from the IEC's own static documentation instead of fabricated.
- Two official IEC PDF factsheets were retrieved directly (HTTP 200, genuine
  text layer, extracted with `pdfjs-dist`) and used to source the fields the
  live identity-verification screen does not cover:
  `https://www.elections.org.za/pw/Documents/Outreach/Factsheets/Voter%20registration/IEC%20Online%20Voter%20Registration%20Factsheet.pdf`
  (name/surname, contact details, OTP confirmation, address capture, ID-photo
  upload — its own numbered "How to register online?" list) and
  `https://www.elections.org.za/pw/Documents/Outreach/Factsheets/Voter%20registration/IEC%20How%20to%20Register%20to%20Vote%20Factsheet.pdf`
  (the address-sufficiency and false-information-is-a-crime guidance quoted in
  `residentialAddressDetails.sourceRef`).
- A third IEC document referenced from search results,
  `https://www.elections.org.za/content/Documents/Voter-education/Submit-online-address-guide-(PDF)/`
  ("Guide to registering on the My IEC portal and updating your address"),
  returned an HTTP 403 Cloudflare challenge to both direct fetch and this
  review's headless-browser tooling and was not used.
- The static `https://www.elections.org.za/pw/voter/How-Do-I-Register` page
  was fetched directly (HTTP 200 via headless browser, though the review's
  non-browser fetch tool alone returned a 403 challenge on the same URL) and
  used only as corroborating eligibility/channel context (citizenship, age
  16+/18+, accepted ID document types, the five registration channels), not
  as a field source.

## Sources examined

- **Document `(id, version)`:** `za/iec/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Electoral Commission of South Africa (IEC)
- **Primary source (live, directly reached, no block):**
  <https://registertovote.elections.org.za/voter/registration/za> — "Online
  voter self-registration — Identity verification" screen
- **Primary source (directly retrieved, HTTP 200, text layer extracted with
  pdfjs-dist):**
  <https://www.elections.org.za/pw/Documents/Outreach/Factsheets/Voter%20registration/IEC%20Online%20Voter%20Registration%20Factsheet.pdf>
- **Primary source (directly retrieved, HTTP 200, text layer extracted with
  pdfjs-dist):**
  <https://www.elections.org.za/pw/Documents/Outreach/Factsheets/Voter%20registration/IEC%20How%20to%20Register%20to%20Vote%20Factsheet.pdf>
- **Cross-check (directly retrieved via headless browser):**
  <https://www.elections.org.za/pw/voter/How-Do-I-Register>
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Live identity-verification screen — ID-number input (placeholder, maxlength 13) and its invalid-ID error text | `idNumber` |
| Live identity-verification screen — Section 97/88 declaration checkbox (verbatim label) | `eligibilityDeclaration` |
| Live identity-verification screen — file-upload control; Online Voter Registration Factsheet item 5 | `idDocumentPhoto` |
| Online Voter Registration Factsheet, "How to register online?" item 3 | `firstNames`, `surname`, `cellphoneNumber`, `emailAddress`, `otpCode` |
| Online Voter Registration Factsheet Privacy Notice ("we collect your email address and phone numbers...") | `cellphoneNumber`, `emailAddress` |
| Online Voter Registration Factsheet item 4 ("Capture your address details"); How to Register to Vote Factsheet "REMEMBER" address-sufficiency/false-information guidance | `residentialAddressDetails` |

## What is NOT yet independently verified

- The exact on-screen field layout, labels, and validation constraints for
  name/surname, contact details, OTP, and address capture — these screens sit
  behind a real-time Home Affairs ID-number lookup this review could not pass
  with a synthetic ID, so they are sourced from the IEC's own factsheet
  summaries rather than a direct DOM read. `firstNames`/`surname`/`cellphoneNumber`/`otpCode`/`residentialAddressDetails`
  are each flagged with this caveat in their own `description`.
- Whether `firstNames`/`surname` are applicant-entered fields, or instead
  displayed read-only (pre-filled from the Home Affairs population register
  once the ID number validates) for the applicant to confirm — the
  factsheet's phrasing ("Enter your ID number, name and surname...") reads as
  data entry, but this was not confirmed on-screen.
- Whether `emailAddress` is truly optional in practice, or the portal in fact
  requires at least one of cellphone/email — modeled conservatively as
  cellphone required (it is the stated OTP-delivery channel) and email
  optional.
- The exact structure of `residentialAddressDetails` — whether the live
  screen splits it into discrete street/suburb/town/province/postal-code
  fields (as South Africa's own paper-era voter/civic forms typically did) or
  accepts free text, since South Africa's in-person registration process no
  longer uses a paper form with numbered address items (it is captured
  electronically via a handheld device at registration stations). Modeled
  conservatively as one free-text field per the factsheet's own
  "full residential address or a description of where you live" wording,
  rather than inventing a multi-field breakdown with no direct source.
- The separate "Apply for a special vote" and "special vote application
  status" pathways on the same portal, and the distinct out-of-country
  registration process — out of scope per `description`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) with a genuine, currently-registered South African ID
number to walk the identity-verification → personal/contact/OTP →
address-capture screens end to end; resolves any discrepancy from this
version's factsheet-sourced fields by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5); and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Test run

A mock application packet
(`conformance/za/iec/voter-registration/1.0.0/application-packet.json`) models
a South African citizen registering for the first time with a smart ID card,
using a syntactically-valid but fabricated ID number. Independently checked
with a from-scratch field-by-field validator (required-field presence,
`validation.pattern`/`minLength`/`maxLength`/`enum`, `eligibleValues`
routing): 9/9 fields collected, 0 violations. A mutation test confirmed the
checker actually discriminates: flipping `eligibilityDeclaration` to `false`
is correctly flagged as outside `eligibleValues`, and shortening `idNumber` to
`123` is correctly flagged as failing its 13-digit pattern.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change, and sooner if the 2026 local government election is proclaimed (the
factsheet states online registration is available "24/7 until the voters'
roll closes when the election in question is proclaimed").
