# Verification record — `au/homeaffairs/eta-application-601` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was **derived from and cross-checked against** two official sources
(below), but the full field-by-field comparison the practice requires — confirming
*every* published field, type, requiredness, and constraint directly against the
live AustralianETA app on an NFC-enabled device — has **not** been completed. It
therefore remains `draft`, not `verified`.

## Why this candidate was picked up now

`au/homeaffairs/eta-application-601` was already a tier-2 candidate in
`discovery/catalog.json` with a note (GOV-276) flagging that the application
channel is mobile-app-only since 2022. Visa is the least-covered of GovSchema's 6
focus verticals (only 3 of 9 tracked jurisdictions — CA, GB, US — had a Visa
schema before this document; AU had none). This cycle's research phase surveyed
coverage across all 6 verticals (DMV, Business Formation, Visa, Passport, Taxes,
National ID & Civic Documents) and picked this catalog-ready candidate as the
clearest remaining gap.

## Access constraint

`immi.homeaffairs.gov.au` returns HTTP 403 to both direct `WebFetch` and `curl`
retrieval — the same class of block already recorded for `passports.gov.au` and
`dfat.gov.au` (see the `gov-au-wayback-workaround` practice memory). Recovered via
a Wayback Machine capture instead. The AustralianETA mobile app itself was not
driven directly: it requires a physical NFC-enabled Android or iOS device to scan
a passport chip, which this environment does not have.

## Sources examined

- **Document `(id, version)`:** `au/homeaffairs/eta-application-601` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Home Affairs
- **Primary source (Wayback capture):**
  <http://web.archive.org/web/20260515072855/https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601>
  (captured 2026-05-15; live URL confirmed 403-blocked at authoring time,
  2026-07-03). The archived page embeds the visa's full eligibility criteria,
  step-by-step application guide, fee, and validity as structured JSON in the
  page's own client-rendering payload (`PageSchemaHiddenField`), not just
  free-form prose — a stronger signal than a plain-text summary.
- **Official supporting PDF:** "Australian ETA App – Guidance notes for industry
  users" — <https://immi.homeaffairs.gov.au/supporting/files/australian-eta-app-industry-guidance.pdf>
  — fetched directly with `curl` (HTTP 200, no access block, unlike the HTML
  page). 16 pages, extracted with `pdfjs-dist` (`getTextContent`, position-sorted
  by y/x coordinate) per the `gov-form-pdf-extraction` technique. Walks through
  every screen of the app's applicant flow section-by-section (§5-§13), written
  for a travel-agent/industry user assisting an applicant, but the screens and
  data collected are the same ones an individual self-service applicant sees.
- **Retrieved / reviewed:** 2026-07-03
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Scope decisions

- **Out of scope — travel-agent/industry-user IATA verification.** The app asks
  a "are you a travel agent?" branch requiring an IATA numeric code or travel
  agent ID verification number before an industry user can start an
  application. Not modeled: this document is the applicant/self-service path.
- **Out of scope — under-18 applicants.** The "Best interests of the child"
  eligibility criterion (the visa may be refused if not in the best interests of
  an applicant under 18) is not modeled as a field; this document assumes an
  adult applicant, consistent with every sibling passport/visa document in this
  registry.
- **Out of scope — an applicant who fails the character, health, genuine-visitor,
  or debt criteria.** Each is modeled as an `eligibility`-role field with a
  `transitions` exit to `null`; the official guidance is explicit that such an
  applicant should apply for a Visitor (subclass 600) visa instead of an ETA, not
  continue this application with extra fields.
- **Out of scope — a specific "purpose of visit" selection field.** Unlike the
  sibling `gb/ukvi/standard-visitor-visa`, neither source states the app
  collects a discrete purpose-of-visit answer; fabricating one would violate
  source-of-truth fidelity, so it is omitted.
- **Out of scope — more than one additional passport.** `holdsOtherPassports` /
  `otherPassportCountry` / `otherPassportNumber` model a single additional
  passport; the live app's "Add another passport" link supports declaring more
  than one, a known flattening (the same class of simplification recorded for
  `au/ato/individual-tax-return-mytax`'s multiple-concurrent-employer exclusion).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **Eligible-passport list** (34 countries/jurisdictions) is a closed, enumerated list on the official eligibility page | `passportIssuingCountry` |
| Passport **chip scan pre-fills name, date of birth, passport number, and other details** | `familyName`, `givenNames`, `dateOfBirth`, `passportNumber`, `passportIssueDate`, `passportExpiryDate` |
| Some countries omit the **National ID number** from the passport chip, requiring manual entry | `nationalIdNumber` |
| Applicant must **declare other passports held** and provide their details | `holdsOtherPassports`, `otherPassportCountry`, `otherPassportNumber` |
| App lets the applicant **check for an existing Australian visa** | `hasExistingAustralianVisa` |
| App requires a **live facial photo** of the applicant | `applicantPhoto` |
| Applicant must declare **any other name they have been known by** | `hasOtherNames`, `otherNameDetails` |
| App collects **home address and phone number**, phone in the home country's format | `homeAddressLine1/Line2/City/Country/PostalCode`, `homePhoneNumber` |
| App collects and **verifies an email address** by one-time code, used for the decision notification and payment receipt | `emailAddress` |
| App's **"ETA questions"** step asks about criminal convictions and **contact details for the stay in Australia** | `hasCriminalConvictionOrDomesticViolenceHistory`, `contactAddressInAustralia` |
| Eligibility criteria: **genuine visitor**, **health requirement**, **character requirement**, **debt to the Australian Government** | `isGenuineTemporaryVisitor`, `meetsHealthRequirement`, `hasCriminalConvictionOrDomesticViolenceHistory`, `hasPaidBackAustralianGovernmentDebt` |
| **AUD 20 service fee**, no separate Visa Application Charge; **12-month validity or passport expiry** (whichever is shorter); **3-month stay per entry**, multiple entries | Recorded in `description`/`title`, not encoded as a data field (same convention as `gb/homeoffice/eta-application` and `ca/ircc/eta-application`) |

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation`/`requiredWhen` constraint in
`schema.json`:

```json
{
  "isGenuineTemporaryVisitor": true,
  "meetsHealthRequirement": true,
  "hasCriminalConvictionOrDomesticViolenceHistory": false,
  "hasPaidBackAustralianGovernmentDebt": true,
  "passportIssuingCountry": "japan",
  "passportNumber": "TH3829104",
  "familyName": "Tanaka",
  "givenNames": "Haruto",
  "dateOfBirth": "1994-06-21",
  "passportIssueDate": "2021-02-15",
  "passportExpiryDate": "2031-02-14",
  "holdsOtherPassports": false,
  "hasExistingAustralianVisa": false,
  "applicantPhoto": "haruto-tanaka-live-photo.jpg",
  "hasOtherNames": false,
  "homeAddressLine1": "4-12-3 Minamiaoyama",
  "homeAddressCity": "Minato-ku, Tokyo",
  "homeAddressCountry": "Japan",
  "homeAddressPostalCode": "107-0062",
  "homePhoneNumber": "+81 90 1234 5678",
  "emailAddress": "haruto.tanaka@example.jp",
  "contactAddressInAustralia": "Staying with a friend, 22 Wattle Street, Bondi, NSW 2026, Australia"
}
```

This models Haruto Tanaka, a Japanese passport holder (Japan is on the
eligible-passport list) applying for himself for a two-week family/friend visit,
with no criminal, health, debt, or character flags raised and only one passport.
The scenario deliberately exercises the `false`/`false` branch of both
`holdsOtherPassports` and `hasOtherNames` so their conditional
`otherPassportCountry`/`otherPassportNumber`/`otherNameDetails` follow-ups are
correctly omitted, and leaves `nationalIdNumber` unset because Japanese passports
carry no National ID number field to omit in the first place. A one-off Node
script (`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type`/`validation` constraint, every
`requiredWhen` condition is correctly satisfied or correctly left unset, and no
required field was left unset:

```
PASS — mock adult self-application ETA (no eligibility flags, single passport, no aliases) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself and pass:

```
$ node tools/validate.mjs registry/au/homeaffairs/eta-application-601/1.0.0/schema.json
ok   registry/au/homeaffairs/eta-application-601/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/au/homeaffairs/eta-application-601/1.0.0/schema.json
ok   registry/au/homeaffairs/eta-application-601/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **The live app's exact screen-by-screen wording and field order** were not
  directly observed on an NFC-enabled device — the industry-guidance PDF
  describes the applicant-facing screens narratively (with screenshots not
  extracted as text) rather than as a literal field-by-field transcript.
- **`hasCriminalConvictionOrDomesticViolenceHistory` may be two separate
  questions in the live app**, not one combined declaration — the official
  process page states the two together ("any criminal conviction or domestic
  violence history") but this was not independently confirmed against the live
  form. A future verification pass should split this field if the live app asks
  them separately.
- **`isGenuineTemporaryVisitor`, `meetsHealthRequirement`, and
  `hasPaidBackAustralianGovernmentDebt`'s exact in-app question wording** is not
  confirmed — these are eligibility criteria stated on the official page, not
  confirmed screen text from the app itself. Modeled as mandatory
  self-declarations by the same convention already established for
  `gb/homeoffice/eta-application` and `ca/ircc/eta-application`'s background
  questions.
- **`contactAddressInAustralia`'s exact field structure** (single free-text
  field vs. structured address lines) is not confirmed; the sources describe it
  only as "contact details for their stay in Australia."
- **Constraint bounds** (name length 24 characters per the truncation note,
  phone number length, address line lengths) are reasonable encodings from the
  source's own prose, not citations of a published Home Affairs validation rule.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live AustralianETA app on an NFC-enabled device with a
real test passport, confirms the sources are still authoritative, resolves any
discrepancy by shipping a new schema **version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.
This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the sources on or before that date, on any `source.url` change, or when
Home Affairs publishes a new version of the industry-guidance PDF.
