# Verification record — `ph/dfa/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from **direct DOM inspection of the live, unauthenticated
Online Passport Appointment System** (`passport.gov.ph`), operated by the
Department of Foreign Affairs' Office of Consular Affairs (DFA-OCA). It
remains `draft`, not `verified`, pending an independent second reviewer's
field-by-field pass and, ideally, a future confirmation pass that does not
require holding a real appointment slot (see "Deliberate scope limit" below).

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1497](../../../../GOV-1497)). Passport was the Philippines' last
unscreened-as-strong vertical gap: prior cycles (GOV-1466, GOV-1490;
see `CATALOG.md`) had already screened `passport.gov.ph` and explicitly
deferred it as a weaker candidate because "the live wizard consumes
genuinely scarce real DFA appointment inventory" — i.e., progressing through
the wizard's Date and Time step holds an actual bookable slot. This cycle
picked the same candidate back up but designed the extraction method
specifically to avoid that cost (see below), rather than treating the prior
concern as a dead end.

## Source examined

- **Document `(id, version)`:** `ph/dfa/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Foreign Affairs – Office of Consular Affairs
  (DFA-OCA), Republic of the Philippines
- **Primary source URL:** <https://passport.gov.ph/appointment>
- **Located via:** the DFA's own public "Schedule an Appointment" navigation
  link, listed on `passport.gov.ph`'s home page alongside Requirements,
  Where to Apply, FAQ, and Accredited Payment Merchants.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access and extraction method

`passport.gov.ph/appointment` returned HTTP 200 directly (no login gate).
After accepting the Terms and Conditions checkbox and choosing "Start
Individual Appointment", the wizard presents six tabs in its left-hand nav:
**Site Location**, **Date and Time**, **Personal Information**, **Family
Information**, **Application Information**, **Contact Information**. The
system is server-rendered (ASP.NET-style postback wizard): once the Site
Location step is submitted, the **Date and Time** step's page load already
contains every downstream step's field as a hidden `<input>` — 61 hidden
inputs covering the full Personal/Family/Application/Contact Information
field set — even though those steps have not yet been visually reached. A
Playwright script (`document.querySelectorAll('input, select, textarea')`,
reading each element's `id`/`name`/`type`) captured this complete,
verbatim field-name inventory directly from the live DOM, the same
whole-wizard-in-one-load shape documented for `br/pf/passport-application`
(see [[gov-form-pdf-extraction]] / `gov1364-br-pf-passport-application-live-dom-technique`
memory), giving every field's exact source `name` attribute
(`FirstName`, `Birthday.Day`/`.Month`/`.Year`, `CivilStatus`, `BirthRight`,
`ApplicationType`, etc.) with no vision/OCR step.

## Deliberate scope limit: did not solve the reCAPTCHA or hold a real slot

Submitting the Date and Time step (to reach the rendered Personal
Information step and see its live labels, option lists, and
required-field asterisks) requires selecting a specific site, date, and
time slot, then solving a reCAPTCHA challenge ("Please complete the
recaptcha challenge."). Reaching that point necessarily places a temporary
hold on one specific appointment slot at one specific DFA site. Given the
Philippines runs genuinely scarce passport-appointment capacity (a
site-availability sweep this cycle across 43 DFA sites found the large
majority — including every Metro Manila DFA office checked — fully booked
for the next several months, with only a minority of provincial sites
showing any open date), and given the prior GOV-1466/GOV-1490 cycles
explicitly flagged this exact cost as the reason they deferred this
vertical, this cycle deliberately did **not**:

- solve or attempt to bypass the reCAPTCHA challenge,
- submit the Date and Time step, or
- hold any specific site/date/time combination beyond the few seconds
  needed to confirm a given site had at least one open (non-"fully
  booked") calendar date, immediately releasing the browser session
  afterward rather than proceeding to a time-slot hold or payment step.

This is a considered trade-off, not an oversight: it means the Personal
Information/Family Information/Application Information/Contact Information
steps' live-rendered labels, dropdown option lists, and required-field
asterisks were **not** independently confirmed this cycle (unlike
`br/pf/passport-application`, whose equivalent four tabs render with no
CAPTCHA gate at all and so were read directly). Everything below this
document's field-name inventory is inferred, not observed, and is flagged
accordingly.

## What was confirmed directly (verbatim, from the live DOM)

- **Wizard structure:** six-tab flow (Site Location → Date and Time →
  Personal Information → Family Information → Application Information →
  Contact Information), confirmed from the rendered left-hand nav on the
  Site Location and Date and Time steps.
- **Every field's exact source name/id**, in DOM order, for the four
  applicant-data steps (see `schema.json`'s `sourceRef` values, each citing
  the literal source field name in parentheses) — 46 distinct field
  concepts (48 schema fields once the two split date fields, `Birthday.*`
  and `DateIssued.*`, are each counted as their three constituent inputs).
  Field-to-step assignment (which fields belong to Personal vs. Family vs.
  Application vs. Contact Information) is read directly from DOM order,
  which cleanly clusters into four contiguous blocks matching the six-tab
  nav exactly.
- **The site's own required-field convention:** both the Site Location and
  Date and Time steps render "Fields with asterisks(\*) are required" and
  mark Region/Country/Site with an asterisk while leaving Office
  Name/Address/Contact Number (auto-populated, read-only display fields)
  unmarked — confirming the system does distinguish required from optional
  fields with a visible asterisk convention, even though this cycle could
  not observe which asterisks apply within the four applicant-data steps
  specifically.
- **Genuinely scarce appointment inventory:** a sweep across all 43 listed
  DFA sites (Philippines region) found the great majority fully booked for
  every visible calendar date across several months; a minority of sites
  (e.g. Antique, Angeles, Balanga, Butuan, Cagayan De Oro, and others) had
  at least one open date in the near term. This corroborates, rather than
  contradicts, the prior cycles' stated reason for deferring this vertical.

## What was inferred (not independently confirmed) and why

1. **`sex` (source field `Gender`) option list.** Modelled as `["M", "F"]`
   by analogy to `ph/bi/non-immigrant-visa-application`'s independently-
   confirmed `sex` field (`M`/`F` checkboxes on the Bureau of Immigration's
   own CGAF form) — the closest same-jurisdiction, independently-verified
   reference. Not confirmed against this system's own live dropdown.
2. **`civilStatus` option list.** Reused verbatim from
   `ph/bi/non-immigrant-visa-application`'s independently-confirmed
   `civilStatus` enum (`single`/`married`/`widowed`/`separated`/`annulled`/
   `divorced`) for the same reason. Not confirmed against this system's own
   live dropdown.
3. **`citizenshipBasis` (source field `BirthRight`) option list.**
   Corroborated via multiple DFA consular-post pages (e.g. dual-citizenship/
   RA 9225 explainer pages hosted on `*.dfa.gov.ph` consular-post
   subdomains) and independent passport-guide sites, consistently
   describing BIRTH/ELECTION/RA 9225/naturalization as the standard "Basis
   of Citizenship" categories on the DFA passport application — but no
   single source was a literal transcription of this system's own dropdown
   text, so the coded values (`birth`/`election`/`ra_9225`/`naturalization`)
   are this document's own slugging of that description, not a verbatim
   source enum.
4. **`applicationType` option list.** Corroborated via DFA-affiliated
   "Basic Requirements for Adult New/Renewal/Lost Applications" pages
   (mirrored across several `*.dfa.gov.ph` consular-post subdomains),
   consistently describing three categories: new (first-time), renewal
   (currently/recently expired), and lost (lost, damaged, or mutilated —
   DFA's own guidance treats a damaged/mutilated passport as filed under
   the same "lost" bucket, processed with new-application requirements plus
   a notarized Affidavit of Loss/Mutilation). Not a verbatim transcription
   of this system's own dropdown text.
5. **`required`/`requiredWhen` markers on all four applicant-data steps.**
   None of these were read from a live rendered asterisk, since reaching
   those steps requires the reCAPTCHA-gated submission this document
   deliberately did not perform (see "Deliberate scope limit" above).
   `required: true` was asserted only for fields structurally necessary to
   identify the applicant and file any of the three application types
   (name, sex, date of birth, civil status, country of birth, citizenship
   basis, citizenship, email, mobile number, application type, residential
   address/city/province, emergency contact name/number); every other field
   is `required: false`. `requiredWhen` was asserted only where the
   underlying logic is unambiguous from the field's own purpose
   (`previousPassportNumber`/`previousPassportDateIssued`/
   `previousPassportPlaceOfIssuance` when `applicationType` is `renewal` or
   `lost`; `spouseLastName`/`spouseFirstName` when `civilStatus` is
   `married`; `foreignPassportCountry` when `hasForeignPassport` is `true`).
   A reviewer who can complete the wizard without displacing a real
   applicant (e.g. during a future site visit or via DFA's own internal
   documentation) should confirm or correct every one of these markers.
6. **`companionName`/`companionRelationship`/`companionContactNumber`
   purpose.** These three fields' role could not be confirmed live. Modelled
   generically as an accompanying-person block; their likely purpose
   (assistance companion for a Person-With-Disability or senior-citizen
   applicant) is inferred from the appointment system's own separate PWD/
   senior-citizen and OFW site-specific notice checkboxes observed on the
   Site Location step, not from any direct evidence tying those notices to
   this field group.
7. **No repeating/array field type (GSP-0009).** Not applicable to this
   document — no repeating structure was found in the field-name inventory.

## What was deliberately NOT modelled (and why)

1. **Site Location and Date and Time step fields** (region, country, site,
   date, time slot, and the associated anti-forgery/session/reCAPTCHA
   plumbing: `SiteRegionID`, `SiteCountryID`, `SiteID`, `ScheduleDate`,
   `TimeSlotID`, `OffsetTicks`, `DraftApplicationCode`, `AppointmentId`,
   `__RequestVerificationToken`, `g-recaptcha-response`, and the five
   per-site notice-acknowledgment checkboxes `cl-notif-checkbox`/
   `pubpow-notif-checkbox`/`ofw-notif-checkbox`/`renewal-notif-checkbox`/
   `co-notif-checkbox`). These select and reserve a booking slot and
   acknowledge that specific site's own posted rules — they are the
   booking website's own scheduling/session logistics, not passport-
   application data, consistent with how `kr/mofa/passport-application-
   first-adult` and other appointment-driven schemas in this registry
   exclude office/branch/queue selection from `fields[]`.
2. **Minor-applicant path.** The same wizard likely supports a parent/
   guardian consent block for applicants under 18 (consistent with every
   other passport schema in this registry that draws this same
   first-time-adult/minor boundary); this document is scoped to an adult
   applicant and does not model it, since it was never observed (blocked
   behind the same reCAPTCHA gate).
3. **Payment and appointment-confirmation steps.** The wizard collects
   payment after the four applicant-data steps; this is a downstream
   transactional step, not application data, and is out of scope per this
   registry's convention (e.g. `br/pf/passport-application`'s GRU payment
   slip is likewise not modelled).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to, without
holding a real applicant's appointment slot for longer than necessary to
observe the four applicant-data steps:

1. Independently re-confirm the field-name inventory against the live DOM.
2. If a legitimate opportunity arises to view the rendered Personal/Family/
   Application/Contact Information steps (e.g. an actual DFA appointment
   being booked for a real applicant, or future guidance/documentation DFA
   itself publishes), confirm or correct every inferred enum option list
   and required/requiredWhen marker in items 1-6 above.
3. Confirm DFA has not since changed the wizard's step structure or field
   names.

## Mock test run (phase 4)

A throwaway Node script (not committed) built a mock application — a
Filipino-born adult applying for a **new** passport, single, both parents
Filipino citizens, no foreign passport — and checked every populated field
against its `type`/`validation` constraint and every `requiredWhen`-gated
field's effective requiredness given the mock's own answers
(`applicationType: new` correctly left `previousPassportNumber`/
`previousPassportDateIssued`/`previousPassportPlaceOfIssuance` not required;
`civilStatus: single` correctly left `spouseLastName`/`spouseFirstName` not
required; `hasForeignPassport: false` correctly left
`foreignPassportCountry` not required). Result: **PASS**, 48 fields
modelled, 21 populated in the mock, 4 flow steps. This is a data-shape
dry run only — it does not constitute execution of the live system, per the
deliberate scope limit above.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06**
(~6 months). Re-check the source, and confirm no structural change to the
wizard, on or before that date and on any `source.url` change.
