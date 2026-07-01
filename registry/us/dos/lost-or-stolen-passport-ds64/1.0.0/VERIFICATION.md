# Verification record — `us/dos/lost-or-stolen-passport-ds64` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Why this candidate was added (phase 2 of the GOV-282 brief)

GOV-282 names "Passport (First-Time, Renewal, Lost, etc.)" as one of five focus
verticals. Before this document, the registry had eight published passport
documents across seven jurisdictions (US, GB, IE, AU, CA, NZ, SG) covering
first-time and renewal applications, but **no** "Lost" candidate at all — not even
in the discovery backlog — despite "Lost" being named explicitly in the brief.
This document closes that gap for the U.S.: it was added directly as a new
catalog candidate and authored to `published` in the same cycle, mirroring how
`us/ca/sos/corporation-formation-arts-gs` and `us/ca/dmv/vehicle-title-transfer`
opened gaps in prior cycles.

## Sources examined

- **Document `(id, version)`:** `us/dos/lost-or-stolen-passport-ds64` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (DOS)
- **Primary source URL:** <https://travel.state.gov/content/travel/en/passports/have-passport/lost-stolen.html>
- **Official form id:** `Form DS-64` (OMB Control No. 1405-0014)
- **Form PDF:** <https://eforms.state.gov/Forms/ds64_pdf.pdf> — fetched directly
  with a plain `curl` request; no access block encountered, consistent with the
  sibling `us/dos/passport-application-ds11` and `us/dos/passport-renewal-ds82`
  documents also sourced from state.gov. Parsed with the `pdf-parse` npm package
  (`PDFParse.getText()`). Page 2 of 2 (the actual data-collection form —
  document-status checkboxes, identity, contact, loss/theft details, and
  signature block) extracted as clean, legible text and was transcribed
  field-by-field from that output. Some of page 1's boilerplate/legal text (the
  filing-options list, warning, and Privacy Act statement) extracted with
  font-encoding artifacts — a custom-glyph substitution in this PDF's generation
  tool scrambled some letters (e.g. "book and/or card" rendering as
  "ERRNDQGRUFDUG" in places) — but this did not affect any of the page 2 field
  labels this schema is built from, which were unaffected and fully legible.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A lost-or-stolen-passport report is a one-time filing tied to a specific
incident, not filed "for" a recurring tax/award year — applying the GSP-0005 §2
coexistence test, there is no scenario where two editions of the DS-64 data model
need to coexist for the same applicant. This document is therefore authored at
the plain (non-edition) registry path,
`registry/us/dos/lost-or-stolen-passport-ds64/1.0.0/`. A future DS-64 revision
that changes the field set ships as a new `version`, not an edition.

## What was confirmed against the source

- **Form identity and purpose.** Form DS-64 reports a valid U.S. passport book
  and/or card as lost or stolen, cancelling it in the Consular Lost and Stolen
  Passport System (CLASP) so it can no longer be used for travel. Confirmed
  against the form's own title and the travel.state.gov "Report Your Passport
  Lost or Stolen" page.
- **Full field set (page 2).** Transcribed directly from the decoded PDF text:
  the book/card-and-status selection; the connected-new-application question;
  identity (name, name change, date/place of birth, SSN with its voluntary
  disclosure note); contact (address, phone, alternate phone, email); the
  loss/theft explanation, location, and date questions (including the
  "be as exact as possible if unknown" instruction); the police-report question;
  the lost book/card number-and-issue-date fields (with the "book and card have
  different numbers, a reused number cannot be reissued" note); the
  other-lost-passports history question with count and approximate-dates
  follow-ups; and the signature block, including the minor-under-16 dual-parent
  signature path and its sole-legal-authority exception (22 C.F.R. 51.28,
  Form DS-5525).
- **Filing-channel guidance.** The four filing options (online, in-person with a
  new DS-11, by phone, by mail to CLASP with a photo-ID photocopy) and the
  already-expired-passport exception are recorded in the document `description`
  and `isConnectedToNewApplication`'s description, transcribed from page 1's text
  (unaffected by the font-encoding artifacts noted above, since these particular
  sentences extracted cleanly).

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out report was authored and checked field-by-field against
every `type`/`required`/`validation` constraint in `schema.json` (string length,
regex pattern, enum membership, integer minimum, date format, boolean type, and
the conditional-field notes called out in field descriptions):

```json
{
  "passportBookStatus": "stolen",
  "passportCardStatus": "not_applicable",
  "isConnectedToNewApplication": true,
  "lastName": "Torres",
  "firstName": "Maria",
  "middleName": "Alejandra",
  "nameChangedSincePassportIssued": false,
  "dateOfBirth": "1990-03-14",
  "placeOfBirth": "San Diego, California",
  "currentAddressLine1": "482 Harbor View Drive, Suite 210",
  "currentAddressCity": "San Diego",
  "currentAddressState": "CA",
  "currentAddressPostalCode": "92101",
  "telephoneNumber": "+16195550142",
  "lossOrTheftExplanation": "Backpack was stolen from a parked car; the passport was inside a zipped travel pouch.",
  "lossOrTheftLocation": "San Diego, California",
  "lossOrTheftDate": "2026-06-20",
  "policeReportFiled": true,
  "lostPassportBookNumber": "123456789",
  "lostPassportBookIssueDate": "2019-05-10",
  "hasOtherLostOrStolenPassports": false,
  "isMinorUnder16": false,
  "applicantSignatureDate": "2026-07-01"
}
```

This models Maria Alejandra Torres — the same individual used in the sibling
`us/ca/sos/business-entity-llc-formation`, `us/ca/sos/corporation-formation-arts-gs`,
`us/irs/employer-identification-number-ss4`, and `us/ca/dmv/vehicle-title-transfer`
mock scenarios — reporting her passport book stolen from her car and filing this
form together with a new DS-11 application, the most common individual scenario.
The scenario exercises the `passportBookStatus: stolen` → `lostPassportBookNumber`/
`lostPassportBookIssueDate` conditional group and the `isMinorUnder16: false` →
`applicantSignatureDate` pair, while omitting the optional passport-card fields,
alternate phone/email, and the minor-guardian signature path. A one-off Node
script (`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type` and `validation` constraint
and that no required field was left unset:

```
PASS — mock adult stolen-passport-book report (filed with a new DS-11 application) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/dos/lost-or-stolen-passport-ds64/1.0.0/schema.json
ok   registry/us/dos/lost-or-stolen-passport-ds64/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/dos/lost-or-stolen-passport-ds64/1.0.0/schema.json
ok   registry/us/dos/lost-or-stolen-passport-ds64/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **The "at least one of book/card must be lost or stolen" constraint.** The
  form's checkbox layout implies at least one of `passportBookStatus`/
  `passportCardStatus` must be `lost` or `stolen`, but v0.1/v0.2 has no
  cross-field "at least one of" constraint construct; this is stated as a
  description-level note on both fields rather than enforced. Likewise,
  `otherLostPassportCount` and `otherLostPassportApproximateDates` are gated on
  `hasOtherLostOrStolenPassports` only via field-description notes, a reasonable
  flattening of the form's own conditional layout, not independently re-verified
  field-by-field against a live-filled example.
- **The font-encoding artifacts on page 1.** While the page 2 field labels this
  schema is built from extracted cleanly, a reviewer should re-fetch and
  re-extract the PDF (or try an alternative extraction tool) to confirm nothing
  on page 1 that could affect field semantics (rather than just prose/legal
  boilerplate) was garbled.
- **Constraint patterns** (SSN, ZIP code, E.164 phone) are reasonable encodings,
  not citations of a published DOS validation rule.
- **The online and phone-reporting channels' exact data model** were not directly
  observed (the online channel requires an active travel.state.gov session to
  reach past the login gate); this document is sourced from the paper/PDF Form
  DS-64, which the source page states is the same underlying report.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form DS-64 PDF, ideally with an observed run of the
online reporting flow, confirms the sources are still authoritative, resolves any
discrepancy by shipping a new schema **version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt` / `nextReviewBy`.
This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
the U.S. Department of State publishes a new Form DS-64 revision.
