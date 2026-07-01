# Verification record — `us/cbp/esta-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records
a mock test run against the field model, and states the current verification
claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

## Access constraint

The live application (`esta.cbp.dhs.gov`) renders as a JavaScript application
shell to automated retrieval — no field text is present in the fetched HTML.
`cbp.gov/travel/international-visitors/esta` and every `help.cbp.gov` article
tried returned either HTTP 403 or the same JS-shell/CDN loading page. This
document was therefore authored primarily from two **official DHS/CBP Privacy
Impact Assessment (PIA) PDFs** — static documents served directly by
`dhs.gov` (HTTP 200 with a standard browser `User-Agent`; no bot-block
encountered) — plus CBP's and USA.gov's own overview/FAQ pages, which fetched
successfully as plain HTML.

## Sources examined

- **Document `(id, version)`:** `us/cbp/esta-application` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** U.S. Customs and Border Protection (CBP), U.S. Department of
  Homeland Security (DHS)
- **Primary sources (fetched directly, full text extracted):**
  - <https://www.dhs.gov/sites/default/files/2023-06/privacy-pia-cbp007(h)-esta-june2023.pdf>
    — DHS/CBP/PIA-007(h), June 2023. Describes the ESTA application flow in
    detail: role selection (applicant / third-party representative), passport
    biographic-page capture with OCR auto-population, the remaining biographic
    inputs collected ("phone number and email address; information about
    current or previous employer; social media information (optional);
    destination address and point of contact in the United States; and
    emergency point of contact information"), the Visa Waiver Program
    eligibility questions, Pay.gov payment (credit card, debit card, or ACH
    debit), and CBP's automated vetting on submission. Also describes the 2023
    mobile-app launch, its Machine-Readable Zone and eChip (RFID) capture, and
    the 1:1 facial-comparison liveness check via the Traveler Verification
    Service.
  - <https://www.dhs.gov/sites/default/files/2024-07/24_0712_priv_pia-cbp-007j-esta-update.pdf>
    — DHS/CBP/PIA-007(j), July 2024 update. Confirms the website channel was
    brought in line with the mobile channel: a selfie photograph is now
    required on **both** channels, matched 1:1 against the passport photo;
    photos are retained in the ESTA system for 15 years (14 days for the
    Traveler Verification Service's own copy). Restates the collected-field
    summary ("name, country of birth and citizenship, date of birth, sex,
    travel document information, contact information ..., social media handle
    and platform (voluntary), employment information, destination address, and
    U.S. point of contact information") and the eligibility-question categories
    (communicable disease/physical-mental disorder, arrests/convictions,
    terrorism/espionage/sabotage/genocide, prior visa denial/deportation,
    overstay, travel to Iraq/Syria/other state-sponsor-of-terrorism countries
    or Cuba). States the 2-year validity (or until the VWP eligibility fact
    that ends it occurs first, or the passport expires) and the 90-day
    per-stay limit.
  - PDF text was extracted locally (no `pdftotext`/`pip` available in this
    environment) by decompressing the PDF's Flate-encoded content streams and
    reading the `Tj`/`TJ` text-show operator strings directly — the same
    zlib + parenthesized-string approach used previously for UK gov.uk PDF
    forms (see the `gov-form-pdf-extraction` precedent).
- **Secondary/supporting sources (fetched as plain HTML, no workaround
  needed):**
  - <https://www.usa.gov/visa-waiver-esta> — fee ("$40.27" as of retrieval),
    72-hour typical processing time, 2-year validity, 90-day stay, e-passport
    requirement.
  - <https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html>
    — VWP eligibility conditions, including the designated-country list for the
    travel-history eligibility question (Iran, Iraq, Libya, North Korea,
    Somalia, Sudan, Syria, Yemen since 1 March 2011; Cuba since 12 January
    2021).
  - <https://www.cbp.gov/travel/international-visitors/esta/frequently-asked-questions-about-visa-waiver-program-vwp-and-electronic-system-travel>
    — corroborates the eligibility-question categories in CBP's own words
    (communicable diseases; arrests and convictions for certain crimes; history
    of visa revocation or deportation; other questions) and that "the social
    media question is optional."
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against a primary source

| Source element | Field(s) |
|---|---|
| Role selection (applicant vs. third-party representative); representative must check a box confirming they completed the application on the traveler's behalf | `applicantRole`, `representativeCompletedOnBehalf` |
| Passport biographic data page capture (photo/scan) with OCR auto-population of name, date/place of birth, passport number | `lastName`, `firstName`, `passportBiographicPageImage` |
| Machine-Readable Zone / eChip capture: name, passport number, nationality, date of birth, sex, passport expiration date | `dateOfBirth`, `sexMarker`, `citizenshipCountry`, `passportNumber`, `passportExpirationDate` |
| "name, country of birth and citizenship, date of birth, sex, travel document information" | `countryOfBirth` |
| Selfie photo required on website and mobile app, 1:1 matched against the passport photo via the Traveler Verification Service | `applicantSelfiePhoto` |
| "phone number and email address"; alternate third-party email required if the traveler has none | `phone`, `email` |
| "information about current or previous employer" | `employerInformation` |
| "destination address and point of contact in the United States" | `destinationAddressInUS`, `usPointOfContactName`, `usPointOfContactAddressOrPhone` |
| "emergency point of contact information" (a distinct cluster from the U.S. point of contact) | `emergencyContactName`, `emergencyContactPhone` |
| "social media information (voluntary)" / "social media handle and platform" | `socialMediaPlatform`, `socialMediaIdentifier` |
| VWP eligibility question categories: communicable disease/disorder; arrests/convictions; terrorism/espionage/sabotage/genocide; prior visa denial/deportation/withdrawn application; overstay; travel to designated countries since a stated date | all nine `has*`/`is*` boolean fields |
| Pay.gov payment by credit card, debit card, or ACH debit | `paymentMethod` |
| Automated CBP vetting on submission | `applicationSubmittedToCBP` |
| Two-year validity (or earlier passport expiry / VWP-eligibility change), 90-day stay limit | document `description` |

## What is NOT independently verified

- **Exact verbatim wording of the nine eligibility questions.** The PIAs state
  the *categories* CBP collects (e.g. "arrests and convictions for certain
  crimes") but not the literal on-screen question text. The wording used in
  each field's `label` was cross-checked for consistency across several
  independent practitioner/consumer-guide reproductions of the live form
  (which is standard practice for ESTA-adjacent guidance sites to quote
  verbatim) rather than read directly from `esta.cbp.dhs.gov`, which this
  review could not reach. Treat each `label` as a faithful paraphrase of a
  confirmed category, not a guaranteed character-for-character match to the
  live page.
- **Exact sub-field breakdown of `employerInformation` and
  `usPointOfContactAddressOrPhone`.** The PIAs describe these as information
  categories, not itemized sub-fields; whether the live form splits employer
  name/address/phone (or U.S. point-of-contact address vs. phone) into
  separate inputs was not confirmed. Modeled as single free-text fields rather
  than guessing a sub-field split not evidenced by the source.
- **Current ESTA fee amount.** Sourced from USA.gov ("$40.27") rather than a
  CBP fee schedule page, which was unreachable; fees are set by regulation and
  can change, so it is described only in the document `description`, not
  encoded as a validated field (consistent with `ie/dttas/driving-licence-renewal`
  and `gb/dvla/vehicle-tax`'s qualitative treatment of fees).
- **Current Visa Waiver Program country list.** Deliberately not enumerated as
  a fixed `validation.enum` on `citizenshipCountry` (see that field's
  description) because DHS adds and removes participating countries by
  designation, independent of this schema's version.
- **The screen-by-screen order and exact wording of confirmation/review
  screens** past the fields modeled here.
- **A late-2025 CBP proposal** to expand ESTA data collection (five-year phone/
  email history, additional family details, expanded biometrics) was reported
  in secondary sources during this research pass but had not been adopted into
  a published DHS PIA/SORN as of the retrieval date, so it is out of scope for
  this v1.0.0 document. A future minor/major version should pick it up once
  (and if) it is finalized and appears in an official DHS publication.

## Mock test run

To confirm the field model is internally consistent and usable end-to-end, a
complete mock application instance — a fictitious Japanese traveler visiting
Washington, DC on business — was constructed with one valid example value per
field and checked programmatically against every field's own `type`,
`required`, and `validation` (`enum`/`pattern`/`minLength`/`maxLength`)
constraint declared in `schema.json`. All 33 fields (defined across the 24
required and 9 optional/conditional fields) were present and passed:

| Field | Mock value |
|---|---|
| `applicantRole` | `applicant` |
| `representativeCompletedOnBehalf` | `false` |
| `lastName` / `firstName` | `Nakamura` / `Aoi` |
| `dateOfBirth` | `1994-03-11` |
| `sexMarker` | `F` |
| `countryOfBirth` / `citizenshipCountry` | `JP` / `JP` |
| `passportNumber` | `TZ1234567` |
| `passportExpirationDate` | `2031-05-02` |
| `passportBiographicPageImage` / `applicantSelfiePhoto` | mock upload references |
| `email` | `aoi.nakamura@example.com` |
| `phone` | `+81312345678` |
| `employerInformation` | `Kizuna Trading Co., 3-4-5 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan` |
| `destinationAddressInUS` | `Hyatt Regency, 655 F Street NW, Washington, DC 20004` |
| `usPointOfContactName` / `usPointOfContactAddressOrPhone` | `Daniel Reyes` / `+12025557777` |
| `emergencyContactName` / `emergencyContactPhone` | `Kenji Nakamura` / `+81312349999` |
| `socialMediaPlatform` / `socialMediaIdentifier` | left blank (optional) |
| all nine eligibility questions | `false` |
| `paymentMethod` | `credit_card` |
| `applicationSubmittedToCBP` | `true` |

Result: **pass** — every field name matched a declared `fields[].name`, every
required field was populated, every `date` value matched `YYYY-MM-DD`, every
`enum` value was one of the declared options, and every `pattern`/
`minLength`/`maxLength` constraint was satisfied (e.g. `phone` and
`emergencyContactPhone` against the E.164 pattern, `citizenshipCountry`/
`countryOfBirth` against the two-uppercase-letter pattern). This is a
structural self-check of the schema against its own rules using fictitious
data — it does not submit anything to CBP and is not a substitute for
`manual-source-review-v1`'s live-source field comparison, which remains
outstanding (see above).

## Scope notes

- **Application only**, ending at CBP submission. Checking application status
  after submission, appeal/redetermination after a denial, and the separate
  Form I-94W paper process (retained for travelers who do not use ESTA) are out
  of scope.
- **Not time-versioned.** Applying GSP-0005 §2's coexistence test: ESTA has no
  calendar-year edition cycle, so this is a plain `v1.0.0` document, not an
  edition-axis schema.
- Conditional requiredness the v0.2 flat/linear model cannot express (e.g.
  `representativeCompletedOnBehalf` only meaningful when `applicantRole` is
  `representative`) is documented in field descriptions, per the limitation
  tracked in GSP-0004.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live, authenticated
`esta.cbp.dhs.gov` application itself (not just the PIAs describing it),
confirms the eligibility questions' exact wording, resolves any discrepancy by
shipping a new schema version per [VERSIONING.md](../../../../../VERSIONING.md),
and records the outcome here.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months), or sooner if CBP's pending data-expansion proposal (see above) is
finalized.
