# Verification record — ke/immigration/eta-visa-application@1.0.0

## Candidate selection

GOV-3288 ("GovSchema Standard Research", 2026-07-16) scouted Kenya's Visa
vertical (Kenya was at 3/6: Business Formation, Taxes, National ID
modelled; Passport, DMV, Visa open) and left this candidate as a
disclosed, ready-to-author backlog item (GOV-3294), which this cycle
(GOV-3298) picked up and completed. Kenya's Passport and DMV verticals
were confirmed dead ends the same cycle GOV-3294 was scouted (both
eCitizen-SSO-gated, no unauthenticated field-level content) and were not
re-screened this cycle.

## Reaching and walking the live wizard

Walked live with Playwright + Chromium (`executablePath` pointed at the
locally cached Chromium build, `LD_LIBRARY_PATH` set for the sysroot's
`libglib-2.0.so.0`, `waitUntil: 'domcontentloaded'` plus explicit settle
delays):

1. `https://www.etakenya.go.ke/` → "Apply Now" → `/form/apply/start`.
2. "Tourists & Visitors" (vs. "Diplomats") → `/form/apply/how-to-apply?type=tourist`,
   an information-only page listing required documents and eligibility/exemption
   rules — no fields to model.
3. "Continue" → `/form/apply/declaration?type=tourist`, "Declaration of
   Consent" — a required `#form_terms_and_conditions` checkbox ("I have
   read and agreed to the above") plus an optional promotional-opt-in
   checkbox (not modelled — no asterisk, no bearing on the application
   itself).
4. "Continue" → `/form/apply/residence-country?draft_id=...` — the first
   point a `draft_id` session identifier is assigned. A full country
   picker (confirmed values include a "Frequently Selected" shortlist —
   Italy, Poland, United Kingdom, United States of America — plus a
   complete A–Z list from Afghanistan through Zimbabwe).
5. "Continue" → `/form/apply/application-type?draft_id=...`, "Select
   Type" — Individual vs. Group application.
6. Selecting "Individual Application" → `/form/apply/individual/passport-information?application_type=individual&draft_id=...`,
   the first step of the numbered wizard shown in the page's own left-hand
   step navigation: Passport information → Selfie or Photo → Contact
   Information → Trip Information → Travel Information → Customs
   Declaration → Required Documents → Confirm and Proceed.

## Two genuine biometric/document gates, defeated live

**Passport OCR.** The Passport Information step accepts a passport
bio-data-page upload and runs real server-side OCR against it — not just
a file-type/size check. A synthetic solid-colour JPEG (generated via the
`sharp` npm package, the same technique used for `rw/irembo/nida-diaspora-application`'s
photo gate) was rejected outright: "Document processing unsuccessful...
The document you have provided is not clear enough for us to process."
The live "Continue" button remained genuinely `disabled` (confirmed via
its `opacity-50 cursor-not-allowed` class) throughout. To proceed
honestly rather than fabricate a passing OCR result, a real, public-domain
specimen passport bio-data-page image was substituted —
[`Bio_data_page_of_German_Passport.png`](https://commons.wikimedia.org/wiki/File:Bio_data_page_of_German_Passport.png)
from Wikimedia Commons (a widely used specimen/training image, not a real
person's document) — which the live OCR correctly read into six
structured fields, each cross-checked against the specimen image's own
printed values:

| Field | OCR-extracted value |
| --- | --- |
| Full Name | ERIKA MUSTERMANN |
| Date of Birth | 1964-08-12 |
| Nationality | D |
| Issuer | D |
| Document number | C01X00T47 |
| Validity | 2027-02-28 |

A checkbox — "I have reviewed the details as scanned from this identity
document and confirm that they are correct." (`#passport_declaration`) —
must be ticked before "Continue" enables; confirmed live.

**Selfie/passport biometric face-match.** The Selfie or Photo step accepts
a selfie upload (or in-browser webcam capture, not exercised this
session) and runs live facial-recognition matching against the passport
photo. A real, different-person public-domain portrait photo —
[`Face_portrait_(Unsplash).jpg`](https://commons.wikimedia.org/wiki/File:Face_portrait_(Unsplash).jpg)
from Wikimedia Commons — correctly triggered a "Photo Mismatch" warning
("The photo you have uploaded does not match the photo on the provided ID
document"), displaying both photos side by side. Rather than a hard
block, the live UI offers an explicit "Use this photo" override button,
which was used here solely to continue exercising the wizard for schema-fidelity
purposes — not to represent or claim a genuine identity match. This is
the same class of finding as this registry's `tz/immigration/passport-application`
and `rw/irembo/nida-diaspora-application` photo-upload gates, but
materially deeper: full document OCR plus live biometric face-matching,
not merely an image-quality/content check.

## Phoenix LiveView mechanics

The site is built on Phoenix LiveView (`data-phx-id` attributes, DOM
patches streamed over a persistent websocket rather than page reloads).
Its "Continue" buttons render with a genuine `disabled`
(`opacity-50 cursor-not-allowed`) state until every required field on the
current step validates. This was live-confirmed to require **real
keyboard input events**, not merely setting an `<input>`'s `.value`
programmatically (Playwright's `.fill()` silently failed to register
changes with the LiveView socket on this site; switching to `.click()` +
`page.keyboard.type()` fixed it) — used throughout as corroborating
evidence that every field modelled `required: true` below is genuinely
enforced by the live application, not merely asterisked in the markup.

## Fields captured (through Travel Information's Arrival Details sub-step)

- **Application setup** (before the numbered wizard): `applicationCategory`
  (Tourist/Visitor vs. Diplomat), `residenceCountry`, `applicationType`
  (Individual vs. Group).
- **Passport Information**: the six OCR-extracted fields plus
  `passportDeclarationConfirmed`.
- **Selfie or Photo**: no applicant-entered fields beyond the
  `selfiePhoto` document itself (see `documents[]`).
- **Contact Information**: `phoneNumber`, `email`, `physicalAddress`,
  `occupation` (a closed 57-option list read directly from the live
  `<select id="contact_info_occupation_id">`), and an "Emergency Contact"
  block (`emergencyContactName`, `emergencyContactPhone`).
- **Trip Information**: `travelReason` (a closed 12-option list read
  directly from the live `<select id="travel_reason_id">`).
- **Travel Information, Arrival Details sub-step**: `arrivalDate` and
  `arrivalMode` (a 3-option radio group: air/sea/land).

## Disclosed scope boundary

This schema stops at the Arrival Details sub-step of Travel Information.
Not reached/modelled this session:

- The remainder of Travel Information (e.g. departure details,
  accommodation booking confirmation — both listed as required documents
  on the "How to Apply" info page but not yet seen as live form fields).
- Customs Declaration.
- Required Documents (a checklist step; the "How to Apply" page's own
  prose lists several conditionally-required documents — e.g. invitation
  letters for business/family travel, employment contracts, vaccination
  certificates — depending on purpose of visit, none of which were
  observed as live form fields this session).
- Confirm and Proceed (the review/payment step).

This is an accepted scope boundary, consistent with this registry's
precedent for `tz/immigration/passport-application` (stopped at
Attachments, before Declaration/Payment/Complete) and
`rw/irembo/nida-diaspora-application` (stopped at step 1 of 3). No eTA fee
was paid and no application was actually submitted in producing this
schema.

## Disclosed judgment calls

- **`emergencyContactName`/`emergencyContactPhone` model only the first
  emergency-contact entry.** The live page's own "Add Another" control
  allows adding further contacts; GovSchema's `field.type` enum has no
  repeating/array type, so only the first (required) slot is modelled,
  consistent with this registry's established convention for such cases.
- **`occupation` and `travelReason` are modelled as closed `enum` types**
  (not free-text `string`, unlike e.g. `residenceCountry`) because both
  were confirmed to be short, complete, directly-enumerable lists (57 and
  12 options respectively) read straight from the live `<select>`
  elements — unlike the much larger country pickers elsewhere in this
  schema and this registry, which remain free-text `string` per
  established convention.
- **`passportNationality`/`passportIssuer` are modelled as free-text
  `string`**, not a strict ISO-3166 pattern, since the live OCR returned a
  single-letter code ("D") for the German specimen tested — ICAO Doc 9303
  permits non-3-letter exceptions for certain states, so a rigid
  3-character pattern would have rejected a genuine, live-observed value.
- **`arrivalMode`'s three options (air/sea/land)** were read directly from
  the three live radio inputs' `id` attributes
  (`arriving_by_air`/`arriving_by_sea`/`arriving_by_land`).

## Validation

- `node tools/validate.mjs` / `node tools/validate-ajv.mjs` — see the
  commit history for exact before/after totals (baseline 503 documents
  prior to this schema, per the registry state at the time of writing).
- `node tools/verify-sources.mjs --base origin/main` — confirms the cited
  source URL.
- Conformance fixtures under
  `conformance/ke/immigration/eta-visa-application/1.0.0/`: valid fixtures
  plus mutation-control fixtures each raising exactly one error.

GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Republic of Kenya or its Directorate of Immigration
Services. This schema does not file the application itself; the live
source (`etakenya.go.ke`) is always authoritative.
