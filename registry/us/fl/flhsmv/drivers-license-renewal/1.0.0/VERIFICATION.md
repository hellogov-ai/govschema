# Verification record — `us/fl/flhsmv/drivers-license-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official flhsmv.gov guidance page listed
below. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `us/fl/flhsmv/drivers-license-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of Highway Safety and Motor Vehicles
  ("FLHSMV").
- **Primary source (guidance):** "Renew or Replace Your Florida Driver
  License or ID Card" —
  <https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/>
  — fetched live as raw HTML, 2026-07-02. Supplied the eight-year renewal
  cycle, the driver-license (18-month) vs. ID-card (12-month) renewal
  windows, the "renew online" MyDMV Portal description (every-other-cycle
  online eligibility, SSN verification requirement, $2.00 processing fee,
  2-3 week mailing time, emailed confirmation-receipt option), and the full,
  verbatim eight-item "Customers must go into an office" trigger list.
- **Corroborating source:** FLHSMV news release, "FLHSMV Implements
  Legislation Requiring Driver Licenses and Identification Card numbers to
  Change" (2024-07-19) —
  <https://www.flhsmv.gov/2024/07/19/flhsmv-implements-legislation-requiring-driver-licenses-and-identification-card-numbers-to-change/>
  — fetched live as raw HTML, 2026-07-02. Repeats the same eight-item
  in-office trigger list verbatim, independently confirming it is FLHSMV's
  standing, stable framing of the renewal channel rule rather than a
  one-off summary on the guidance page. Also states that renewed credentials
  "will be issued a new number" under the current randomized-numbering
  scheme and that "the license or identification card format will remain
  the same" — the basis for the `floridaCredentialNumber` format inference
  (see honesty flags below).
- **General-information source (checked, largely not incorporated):**
  <https://www.flhsmv.gov/driver-licenses-id-cards/general-information/> —
  fetched live as raw HTML, 2026-07-02. Confirmed no additional
  senior/age-specific renewal-cycle or vision-test rule is stated on this
  page (contrary to some third-party, non-authoritative blog claims of an
  "80+, every six years" rule); no such rule is encoded in this schema
  because it could not be confirmed against a first-party FLHSMV source.
- **MyDMV Portal login gate (checked, confirmed unreachable pre-auth):**
  <https://mydmvportal.flhsmv.gov/Home/en/Account/Landing> — fetched twice:
  once as raw HTML (no form markup present, only a `<select>` language
  picker), and once rendered with a headless Chromium browser via
  Playwright (`playwright-core`, Chromium binary at
  `/paperclip/.cache/ms-playwright/chromium-1228`, launched with
  `LD_LIBRARY_PATH` pointed at `/paperclip/chrome-sysroot`) to execute the
  page's client-side JavaScript in full. After full render, the DOM still
  contains no login or renewal-transaction input fields — only a language
  `<select>` and links to unauthenticated services (Driver License Check,
  Motor Vehicle Information Check, Express Motor Vehicle Renewal for
  vehicle registrations/permits, Emergency Contact Information). The actual
  driver-license renewal transaction (reached via GoRenew.com, which
  redirects to this same portal) is not independently reachable
  pre-authentication, the same conclusion this registry already reached for
  NY's MyDMV/NY.gov ID online renewal (see
  `us/ny/dmv/drivers-license-renewal` VERIFICATION.md) and for NZ's RealMe
  login gate (`nz/dia/realme-verified-identity`).
- **Field extraction method:** direct manual reading of the fetched raw HTML
  guidance-page and news-release text (converted to plain text with a small
  Node script; no PDF or AcroForm involved — FLHSMV publishes no
  downloadable renewal application form for this transaction).
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Florida driver license holders may renew their credential up to 18 months in advance... and ID card holders may renew 12 months in advance" | `credentialTypeRenewing` |
| "Customers must go into an office: ... If a customer is getting a Florida driver license or ID card for the first time." | `isFirstTimeFloridaCredential` |
| "the department must verify a customer's Social Security number" | `last4SSN` |
| "Customers must renew their Florida driver license or ID card every eight years. The expiration date is listed on the credential." | `currentCredentialExpirationDate` |
| "Florida offers an online convenience renewal service for customers every other renewal period." + "If a customer used the online convenience service on their last renewal." | `usedOnlineConvenienceRenewalLastCycle` |
| "If a customer is not REAL ID compliant." | `currentCredentialIsRealIdCompliant` |
| "If a customer wishes to update their photo." | `wantsPhotoUpdate` |
| "If there is a name change... must present an original or certified court order of marriage certificate..." + "If the customer is changing their name using an original or certified court order or marriage certificate." | `isChangingNameWithCourtOrderOrMarriageCertificate`, `documents[].nameChangeDocument` |
| "If a customer wishes to add or remove a designation, or has a court order to update their credential." | `wantsToAddOrRemoveDesignationOrHasCourtOrderedUpdate` |
| "If the customer holds a commercial driver license." | `holdsCommercialDriverLicense` |
| "If the license has the word \"TEMPORARY\" printed on it." | `hasTemporaryCredential` |
| "Renew Online" / "Renew in Office" section headings | `renewalChannel` |
| "Customers can receive an emailed confirmation receipt... select 'yes', enter an email address, and click 'Send Email Confirmation'" | `wantsEmailConfirmation`, `confirmationEmail` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **No downloadable renewal form exists, unlike NY's MV-44.** FLHSMV's
  renewal transaction runs entirely inside MyDMV Portal (online) or is
  handled at a counter (in office); there is no public fillable PDF
  application to extract a field list from. `floridaCredentialNumber`,
  `lastName`, `firstName`, `middleName`, and `dateOfBirth` are therefore
  modelled as reasonable inferences of what any renewal transaction must
  supply to identify the record being renewed, not literal field names
  quoted from a source document — the same discipline already used for
  `driverLicenseNumber` etc. in `us/ca/dmv/drivers-license-renewal`. Flagged
  as lower-confidence fields relative to the directly-quoted eligibility and
  channel fields above.
- **`floridaCredentialNumber` format not confirmed on a first-party page in
  this session.** Multiple independent secondary sources describe the
  Florida credential number as one letter followed by twelve digits, and
  FLHSMV's own 2024-07-19 news release states the format "will remain the
  same" after the 2024 randomization change (implying continuity with that
  pre-existing format), but no first-party FLHSMV page fetched in this
  session states the digit count explicitly. The `^[A-Z][0-9]{12}$` pattern
  is included on that corroborated-but-not-first-party-explicit basis, the
  same confidence level already accepted for the analogous CA DL-number
  pattern in this registry.
- **CDL and TEMPORARY-credential holders modelled as channel triggers, not
  scope exits — a deliberate departure from the NY precedent.** In
  `us/ny/dmv/drivers-license-renewal`, a CDL applicant is routed off a
  distinct certification block on the same form and excluded from that
  schema's scope (pointing instead to
  `us/ca/dmv/commercial-drivers-license-application`). FLHSMV's own source
  text does not draw that distinction: "If the customer holds a commercial
  driver license" and "If the license has the word 'TEMPORARY' printed on
  it" sit in the exact same single bulleted "Customers must go into an
  office" list as REAL ID upgrade, photo update, and name change — all
  eight items are presented by FLHSMV as one undifferentiated list of
  reasons the *renewal itself* must happen in an office, not as reasons the
  customer is ineligible to renew. Per **source-of-truth fidelity**, this
  schema follows FLHSMV's own framing rather than importing NY's structure:
  CDL and TEMPORARY-credential holders are in scope, gated to
  `renewalChannel = in_office` like every other trigger, not excluded.
  `isFirstTimeFloridaCredential` is the one item from that same list that
  *is* still modelled as a hard scope-exit, because a first-time credential
  is definitionally not a renewal of an existing one regardless of which
  channel FLHSMV routes it through.
- **Address change intentionally excluded**, unlike `us/ca/dmv` and
  `us/ny/dmv`'s renewal schemas, which both fold a residence/mailing-address
  section directly into the renewal document. FLHSMV's guidance page lists
  "Update the address on your driver license or ID card" as its own,
  separate MyDMV Portal service, distinct from "Renew a driver license" —
  a source-level signal that FLHSMV itself does not treat address change as
  part of the ordinary renewal transaction. Excluded from this schema on
  that basis rather than assumed-bundled.
- **No vision-test, organ-donor, or age-based renewal-cycle fields.** Some
  non-authoritative third-party sites claim an "80 and older, renew every
  six years, vision test required" rule and a document-upload vision-test
  step inside GoRenew. Neither claim is stated on flhsmv.gov's guidance page
  or general-information page as fetched in this session, so neither is
  encoded here — consistent with this registry's discipline of sourcing
  only from first-party government pages, not third-party DMV-adjacent
  blogs.
- **MyDMV Portal / GoRenew.com online transaction not independently
  confirmed field-by-field.** As described under "Sources examined" above,
  the portal's login page was rendered with a real headless browser (not
  just a static HTML fetch) specifically to rule out a shadow-DOM or
  client-rendered form being missed, and still exposed no fields
  pre-authentication. This schema is derived entirely from FLHSMV's public
  guidance instead, which is authoritative regardless of the portal's
  internal screen flow.
- **Fees intentionally not encoded**, matching every other DMV schema in
  this registry (e.g. `us/ca/dmv/drivers-license-renewal`,
  `us/ny/dmv/drivers-license-renewal`).

## Test run against mock data

A worked mock-applicant walkthrough exercising every step and the
`steps[].transitions` eligibility gate is recorded in
[`conformance/us/fl/flhsmv/drivers-license-renewal/1.0.0/application-packet.json`](../../../../../conformance/us/fl/flhsmv/drivers-license-renewal/1.0.0/application-packet.json)
(and its human-readable `.txt` companion). No live FLHSMV account, MyDMV
Portal session, or in-office visit was actually conducted — GovSchema does
not submit forms on anyone's behalf (see `AGENTS.md` §5 / GSP-0017).

## Path to `verified`

1. Independently re-confirm the `floridaCredentialNumber` twelve-digit
   format against a first-party FLHSMV page (e.g. a retail/issuance guide),
   since it is flagged above as corroborated-but-not-first-party-explicit
   in this session.
2. If FLHSMV ever documents the MyDMV Portal / GoRenew.com renewal
   transaction's exact screen-by-screen field set (e.g. via a published
   API, developer guide, or accessible test account), reconcile it against
   the identity fields inferred here.
3. Re-fetch flhsmv.gov's renewal guidance page periodically for changes to
   the in-office trigger list or renewal-window timing.
