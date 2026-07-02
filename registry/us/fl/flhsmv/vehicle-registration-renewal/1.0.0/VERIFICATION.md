# Verification record — `us/fl/flhsmv/vehicle-registration-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

This is the first `us/fl/*` schema in the registry (Florida wave, GOV-664
plan §3/§6, FL.1). Jurisdiction uses `subdivision: "US-FL"`,
`level: "subnational"`, mirroring the existing `us/ca/*` convention — no spec
change was needed.

## Sources examined

- **Document `(id, version)`:** `us/fl/flhsmv/vehicle-registration-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of Highway Safety and Motor Vehicles ("FLHSMV").
- **"Renew or Replace Your Registration" page:**
  <https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/renew-replace-registration/>
  — fetched live as raw HTML, 2026-07-02 (HTTP 200, no block). Supplied the
  one-to-two-year renewal period, the up-to-three-months-in-advance renewal
  window, the birthday-based expiration rule, the online/mobile-app/in-office
  channel summary, and the $2.00 online processing fee.
- **"Motor Vehicle Registrations" page:**
  <https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/motor-vehicle-registrations/>
  — fetched live as raw HTML, 2026-07-02. Supplied the "personal identifying
  information... to log in" description of MyDMV Portal, the electronic
  insurance-verification rule, the email-confirmation-receipt flow ("select
  'yes', enter an email address, and click 'Send Email Confirmation'"), and
  the delinquent/leased-vehicle fee schedule (confirming renewal fees vary
  and are not a single fixed amount).
- **MyDMV Portal landing page:** <https://mydmvportal.flhsmv.gov/> — fetched
  live as raw HTML, 2026-07-02. This is the authenticated portal's login
  screen; its actual login fields are client-rendered and not present in the
  static HTML (the same authenticated-portal constraint as every other
  login-gated schema in this registry, e.g. `gb/ukvi/standard-visitor-visa`,
  `us/cbp/esta-application`). It links to a separate, **unauthenticated**
  "Express Motor Vehicle Renewal" flow, which was fetched instead (below).
- **"MV Express Renewal" landing page:**
  <https://mydmvportal.flhsmv.gov/Home/en/ExpressRenew/Landing> — fetched
  live as raw HTML, 2026-07-02. Confirmed the express flow's scope
  ("quick and easy express renewal options for parking permit and
  registration renewals," "address modifications are not allowed for this
  express option," non-refundable $2.00 convenience fee).
- **"MV Express Renewal Verification" screen:**
  <https://mydmvportal.flhsmv.gov/Home/en/ExpressRenew/Verification> —
  fetched live as raw HTML with a session cookie jar (`curl -c/-b`), 2026-07-02.
  **This is the richest and highest-confidence source**: unlike the login
  portal, this screen is server-rendered with real `<input>`/`<label>`
  elements in the initial HTML response — not a client-rendered wizard — so
  field names, `id`s, exact label text, and every client-side
  `data-val-regex-pattern` validation attribute were read directly from the
  production DOM, not reconstructed from prose. This is a stronger fidelity
  guarantee than the checklist-text-extraction technique used for
  `us/ca/dmv/real-id-application`.
- **Field extraction method:** raw HTML fetch + regex-based tag stripping
  (curl, not a summarized WebFetch) for the informational pages; direct
  `grep` of `<input>`/`<label>` elements for the Verification screen — the
  same [`gov-source-fidelity-verification`](../../../../../../docs/agent-consumption.md)
  discipline used throughout this registry.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / `documents[]` entry |
|---|---|
| `<input ... id="idividual-selection" name="CustomerType" type="radio" value="I">` / `<input ... id="business-selection" name="CustomerType" type="radio" value="B">`, label "Please select one of the following options. Are you" | `customerType` |
| `<input ... id="individual-dateOfBirth" name="DateOfBirth" ... data-val-requiredif-dependentproperty="CustomerType" data-val-requiredif-dependentvalue="I">`, label "Date of Birth:", instruction "Enter your date of birth exactly as it appears on your motor vehicle record." | `dateOfBirth` (`requiredWhen customerType == individual`) |
| `<input ... id="business-pin" name="PIN" ... data-val-requiredif-dependentproperty="CustomerType" data-val-requiredif-dependentvalue="B" data-val-regex-pattern="^[0-9]{1,11}$">`, label "Renewal Notice PIN:", instruction "Enter your PIN exactly as it appears on your renewal notice." | `renewalNoticePIN` (`requiredWhen customerType == business`) |
| `<input ... name="IndividualLicensePlateNumber">` / `<input ... name="BusinessLicensePlateNumber">`, label "License Plate Number:" | `licensePlateNumber` |
| `<input ... name="IndividualVIN" data-val-regex-pattern="^[a-zA-Z0-9]{1,21}$">` / `<input ... name="BusinessVIN">` (same pattern), label "VIN:" | `vehicleIdentificationNumber` |
| `<input ... name="IndividualParkingPermitNumber" data-val-regex-pattern="^[a-zA-Z]\d{6,7}$">` / business equivalent, label "Parking Permit Number:" | `parkingPermitNumber` |
| `<input ... name="IndividualVesselFLNumber" data-val-regex-pattern="^[Ff][Ll][a-zA-Z0-9]{1,8}$">` / business equivalent, label "Vessel FL Number:" | `vesselFLNumber` |
| `<input ... name="IndividualDocumentedVesselNumber">` / business equivalent, label "Documented Vessel Number:" | `documentedVesselNumber` |
| "Customers may renew their vehicle or vessel for a period of one to two years..." | `renewalPeriodYears` |
| "customers must select 'yes', enter an email address, and click 'Send Email Confirmation'..." | `wantsEmailConfirmation`, `confirmationEmail` |
| "All online electronic payments are charged a $2.00 processing fee in addition to the total transaction." | `documents[].registrationRenewalPayment` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **The "at least one of" additional-identifier rule is not structurally
  enforced.** The live Verification screen requires the customer to supply
  `dateOfBirth` (individual) or `renewalNoticePIN` (business) *plus* at least
  one of `licensePlateNumber`, `vehicleIdentificationNumber`,
  `parkingPermitNumber`, `vesselFLNumber`, or `documentedVesselNumber` (for an
  individual, `renewalNoticePIN` itself is also one of this "at least one"
  set rather than a separate requirement). GovSchema v0.3's
  `crossFieldValidation` `requirePresent`/`requireAbsent`
  ([GSP-0013] §3, SPEC §8.3) requires **every** named field to be present —
  it has no "at least one of N" (OR-of-presence) shape, and the group's
  membership additionally differs by `customerType`. Rather than
  misrepresenting an ALL-of rule as this OR-of-some rule, or fabricating a
  new keyword unilaterally, this is recorded here in prose only — the same
  discipline `us/ca/dmv/real-id-application` used for its
  two-different-residency-documents rule. A future revision could raise this
  as a spec gap once a second example motivates an "at least one of" grammar
  member.
- **VIN's own client-side pattern is looser than the real-world VIN format.**
  A standard VIN is exactly 17 characters from a restricted alphabet
  (excludes I, O, Q). The source's own `data-val-regex-pattern` for
  `IndividualVIN`/`BusinessVIN` is `^[a-zA-Z0-9]{1,21}$` — any 1-21
  alphanumeric characters, including the excluded letters. This schema
  models the source's actual constraint verbatim (source-of-truth
  fidelity), not the stricter format a producer might assume; see the
  `vehicleIdentificationNumber` field `description`.
- **No fields exist for the screens reached only after a record match.**
  Once `verify_identity` fields are submitted, the live service matches them
  against a real FLHSMV record. The subsequent screens (the customer's
  eligible vehicle/vessel list, the computed renewal fee, the actual payment
  form, and the insurance-verification outcome) could not be reached without
  submitting genuine personal data belonging to a real registrant — doing so
  was out of scope for this review. These screens are therefore not modeled
  as fields; `renewalPeriodYears`, `wantsEmailConfirmation`, and
  `confirmationEmail` are instead sourced from FLHSMV's own prose description
  of what those screens collect (see the sources list above), not a direct
  screen read. This is the same online-then-record-matched-screens gap
  `us/ca/dmv/real-id-application` flagged for its own login-gated online
  application.
- **No insurance field.** FLHSMV verifies insurance electronically against
  its own records ("If the department is unable to electronically verify
  valid insurance on the vehicle or vessel, no registration will be issued
  online or in person.") — the customer supplies no insurance data on this
  form. Not modeled as a field, since there is nothing for an agent to
  populate; noted here so the omission reads as a deliberate scope line, not
  a gap.
- **MyFlorida mobile app and in-person renewal are out of scope.** The
  source describes three renewal channels (MyDMV Portal online, MyFlorida
  mobile app, in-office). This schema models only the online MyDMV Portal
  Express Renewal path; the mobile app's own field set (which, per source,
  additionally accepts a checking-account payment method and disallows
  address changes identically) and the in-person channel are not modeled.
- **`registrationRenewalPayment.amount` is intentionally omitted.** The
  renewal fee is not a single fixed value — it varies by vehicle class,
  weight, and county per the "Motor Vehicle Registrations" page's fee
  schedule (delinquent-fee table, leased-vehicle "For Hire" rates). Per SPEC
  §9.1, `amount` is OPTIONAL on a `payment` document entry; omitting it
  rather than fabricating a representative figure follows the same
  discipline as every other variable-fee schema in this registry.

## Conformance

No `conformance/` fixture is included for this version — matching the
convention already established for `us/ca/dmv/vehicle-registration-renewal`,
`us/ca/dmv/drivers-license-renewal`, and `us/ca/dmv/vehicle-title-transfer`,
none of which carry one either.
