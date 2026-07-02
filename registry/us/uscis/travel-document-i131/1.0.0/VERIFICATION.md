# Verification record — `us/uscis/travel-document-i131` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.

## Why this candidate was advanced now

[GOV-675](/GOV/issues/GOV-675), part of the federal passport/immigration wave
approved under [GOV-664](/GOV/issues/GOV-664)'s plan (§2, item F1.5). Form
I-131 is DHS/USCIS's Application for Travel Documents, Parole
Documents, and Arrival/Departure Records — a wide-scope form covering reentry
permits, refugee travel documents, TPS travel authorization documents, advance
parole, and several distinct humanitarian-parole / parole-in-place / re-parole
pathways. The source issue explicitly scoped this deliverable to "Application
for Travel Document (re-entry permit / advance parole)"; see Scope decisions
below for exactly which parts of the live form that excludes.

## Sources examined

- **Document `(id, version)`:** `us/uscis/travel-document-i131` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/i-131>
- **Official form id:** `Form I-131 (Edition 01/20/25)`
- **Form PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-131.pdf>
  — fetched directly with a plain `curl` request (a browser `User-Agent` header
  was sufficient); HTTP 200, no access block.
- **Instructions PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-131instr.pdf>
  (not fetched this cycle; see "What is NOT yet independently verified").
- **Extraction method:** `npm install pdfjs-dist` (network access available even
  though this env has no `pdftotext`/`pip`), then `getDocument().getFieldObjects()`
  for every AcroForm field name/type/exportValue across all 14 pages, and
  `page.getTextContent()` per page with items re-sorted into reading order by
  glyph `(y, x)` position (the raw item-array join order interleaves columns and
  scrambles lettered sub-item sequences, e.g. Part 1 Item 5's A-M list). This
  reading-order resort was necessary to correctly recover the A-M ordering for
  Item 5 (cross-checked against the field name suffixes `P1_Line5A`...`P1_Line5M`
  in `getFieldObjects()`, which is the authoritative order).
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source-review)

## Not a time-versioned (edition) form

An I-131 filing is a one-time submission per trip/status-preservation need
(reentry permit before an extended absence, advance parole before travel while
an immigration application is pending) — applying the GSP-0005 §2 coexistence
test, there is no scenario where two editions of the I-131 data model need to
coexist for the same applicant. This document is therefore authored at the
plain (non-edition) registry path, `registry/us/uscis/travel-document-i131/1.0.0/`.
A future form revision (dated per edition, e.g. "01/20/25") that changes the
field set ships as a new `version`, not an edition.

## Scope decisions

Form I-131 has 13 numbered parts (Part 13 is an open-ended continuation
section) covering five distinct travel/parole document types. Per the source
issue's explicit framing ("re-entry permit / advance parole"), this document
models only:

- **Part 1** — `travelDocumentType` (Item 1: Reentry Permit; Item 5: Advance
  Parole, with its 13 lettered sub-bases A-M) and `holdsRefugeeStatusOrDerivedLPR`
  (Item 13, always asked regardless of document type).
- **Part 2** — Information About You (Items 1-13), in full.
- **Part 3** — Biographic Information, in full.
- **Part 4** — Processing Information (Items 1-9), in full — including the
  Reentry-Permit-specific mailing/notification sub-flow (Items 7-9), which the
  form itself gates behind "If you are applying for an Advance Parole Document,
  SKIP to Part 7" (Item 6.b instruction).
- **Part 5** — Complete Only If Applying for a Reentry Permit, in full.
- **Part 7** — Information About Your Proposed Travel (Advance Parole only), in
  full.
- **Part 10, 11, 12** — Applicant / Interpreter / Preparer contact,
  certification, and signature, in full.

**Explicitly out of scope** (not modeled), because they belong to application
types other than reentry permit / advance parole:

- **Part 1, Item Numbers 2-4** (Refugee Travel Document eligibility statements,
  TPS Travel Authorization Document) and **Item Numbers 6-12** (initial parole
  from outside the U.S., parole in place, re-parole, and their many
  program-specific sub-bases: FWVP, IMMVI, CAM, FRTF, Ukrainian/Afghan
  re-parole processes, Military PIP, etc.).
- **Part 2, Items 14-27** ("Information About Them" — completed only when
  filing on behalf of someone else, which the form ties to the parole/PIP/
  re-parole application types in scope's exclusion list above, not to reentry
  permit or advance parole).
- **Part 6** — Complete Only If Applying for a Refugee Travel Document.
- **Part 8** — Complete Only If Applying for an Initial Parole Document,
  Parole in Place, or Re-parole.
- **Part 9** — Employment Authorization For New Period of Parole (Re-parole).
- **Part 13** — Additional Information, a genuinely open-ended continuation
  space (page/part/item-number cross-referenced overflow), given the same
  out-of-scope treatment as Form I-90's Part 8 and other similarly-shaped
  continuation sections.

Within the in-scope parts:

- **`race`** and **`correctionItemsNeeded`** ("select all applicable boxes")
  are each modeled as a single string field documented to hold a
  comma-separated list of category values, rather than an array type — the
  same treatment as `us/uscis/permanent-resident-card-replacement-i90`'s
  `race` field, pending the native multi-select gap tracked alongside
  [GSP-0009](../../../../../spec/proposals/0009-repeating-groups.md).
- **`otherNamesUsed`** (Part 2, Item 2) collapses the form's three structured
  family/given/middle name rows into one semicolon-separated free-text field,
  consistent with the existing `otherNamesUsed` field on
  `us/uscis/change-of-address-ar11` and `us/dos/passport-application-ds11`
  (same GSP-0009 gap).
- **`physicalAddressDiffersFromMailing`** and **`usedInterpreter`** /
  **`usedPreparer`** are synthetic booleans (not distinct numbered form items)
  inferred from routing instructions in the form text ("if different from the
  above address"; "If no interpreter was used, skip to Part 12"), the same
  synthetic-boolean technique used in `us/uscis/permanent-resident-card-replacement-i90`.
- **Conditional requiredness is encoded structurally** with GSP-0013
  `requiredWhen` (including one `all` composition — `advanceParoleBasisReference`
  requires both `travelDocumentType: advance_parole` and
  `advanceParoleBasis` not equal to `deferred_enforced_departure` — and two
  `any` compositions on `correctionItemsNeeded`/`correctionExplanation`),
  rather than the prose-only convention used in the v0.2-era
  `permanent-resident-card-replacement-i90`. This document is authored
  directly under spec v0.3, so the structural mechanism is used instead of the
  superseded documentation-only pattern.
- **`mostRecentI94RecordNumber`** (Part 2, Item 13) is documented as
  conditionally required by the form ("if you are physically present in the
  United States, and you are seeking ... advance parole ... complete the
  following") but left `required: false` without a `requiredWhen`, because
  "physically present in the United States" is not itself a field captured in
  this document's scope — encoding a false structural requirement here would
  overclaim precision the field set doesn't have.
- **Advance Parole basis reference field.** Item 5's 13 lettered sub-bases
  (A-M) each pair with a different kind of supporting reference (a receipt
  number for petition-based bases, a class-of-admission code for basis H, a
  written explanation for basis M, and no reference at all for basis D). These
  are modeled as one `advanceParoleBasisReference` free-text field rather than
  13 separate fields, with the field's `description` spelling out which kind
  of value applies for which basis.

## What was confirmed against the source

- **Part 1 Application Type** — Item 1 (Reentry Permit) and Item 5 (Advance
  Parole) selection, and Item 5's full A-M lettered basis list (pending I-485;
  pending I-589; pending initial I-821 TPS; Deferred Enforced Departure;
  approved I-821D DACA; approved I-914/I-914A T nonimmigrant; approved
  I-918/I-918A U nonimmigrant; current parolee under INA 212(d)(5); approved
  I-817 Family Unity; pending I-687 §245A; approved V nonimmigrant status; CNMI
  long-term residence; Other), transcribed from the reading-order-sorted page 1
  and page 2 text and cross-checked against the `P1_Line5A`-`P1_Line5M`
  AcroForm field names. Item 13 (refugee status) transcribed from page 4.
- **Part 2 Information About You** (Items 1-13) — full name, other names used,
  current mailing address (with foreign-address province/postal-code variant),
  current physical address, A-Number, country of birth, country of citizenship
  or nationality, sex, date of birth, SSN, USCIS Online Account Number, class
  of admission, and most recent Form I-94 record number — transcribed
  field-by-field from reading-order-sorted page 4-5 text, cross-checked against
  the `Part2_Line*` AcroForm field names.
- **Part 3 Biographic Information** (Items 1-6) — ethnicity, race (5 options),
  height (feet/inches dropdowns), weight, eye color (9 options), and hair color
  (9 options) — transcribed from page 7 text and cross-checked against the
  `P3_Line*` AcroForm field names/export values (eye/hair color enums reused
  verbatim from `us/uscis/permanent-resident-card-replacement-i90`, which
  already cross-checked the identical 9-option USCIS biographic vocabulary).
- **Part 4 Processing Information** (Items 1-9) — removal-proceedings history,
  prior Reentry-Permit/Refugee-Travel-Document and prior Advance-Parole-Document
  issuance history, replacement request routing (reason, correction items,
  correction explanation, replaced-document receipt number), and the
  Reentry-Permit-only delivery/notification sub-flow (mail to U.S. address on
  file vs. an overseas embassy/consulate/field office; notification to the
  same address or an alternate one) — transcribed from pages 7-9,
  cross-checked against the `P4_Line*` field names and the explicit
  "SKIP to Part 8"/"SKIP to Part 7"/"you must complete the rest of Part 4. if
  you are requesting a Reentry Permit" routing instructions in the source
  text.
- **Part 5** (Reentry Permit time-abroad question, 6 duration buckets) and
  **Part 7** (Advance Parole trip details: date of intended departure,
  purpose, countries to visit, number of trips, expected length) — transcribed
  from pages 9-10, cross-checked against `P5_Line1_*`/`P7_Line*` field names.
- **Part 10, 11, 12** (applicant contact/certification/signature; interpreter
  contact/certification/signature; preparer contact/declaration/signature) —
  transcribed from pages 11-13, cross-checked against `Part10_Line*`/
  `Part11_Line*`/`Part12_Line*` field names.
- **Process identity.** Confirmed `Form I-131` (Edition 01/20/25) is the
  correct, current USCIS form for reentry permits and advance parole, and that
  the excluded application types (refugee travel document, TPS travel
  authorization, initial parole, parole in place, re-parole) are genuinely
  distinct sections of the same form, not separate forms.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative filled-out applications were authored — one per
in-scope `travelDocumentType` — and checked field-by-field against every
`type`/`required`/`requiredWhen`/`validation` constraint in `schema.json`
(string length, regex pattern, enum membership, integer minimum/maximum, date
format, boolean type, and the `requiredWhen` conditions including the one
`all`-composed condition and the two `any`-composed conditions):

```json
{
  "travelDocumentType": "advance_parole",
  "advanceParoleBasis": "pending_i485_adjustment_of_status",
  "advanceParoleBasisReference": "MSC1234567890",
  "holdsRefugeeStatusOrDerivedLPR": false,
  "familyName": "Alvarez",
  "givenName": "Marisol",
  "mailingAddressLine1": "812 Congress Avenue",
  "mailingAddressCity": "Austin",
  "mailingAddressState": "TX",
  "mailingAddressZipCode": "78701",
  "mailingAddressCountry": "United States",
  "physicalAddressDiffersFromMailing": false,
  "countryOfBirth": "Mexico",
  "countryOfCitizenshipOrNationality": "Mexico",
  "sex": "female",
  "dateOfBirth": "1992-05-11",
  "classOfAdmission": "F1",
  "ethnicity": "hispanic_or_latino",
  "race": "white",
  "heightFeet": 5,
  "heightInches": 5,
  "weightPounds": 140,
  "eyeColor": "brown",
  "hairColor": "black",
  "everInRemovalProceedings": false,
  "everIssuedReentryPermitOrRefugeeTravelDocument": false,
  "everIssuedAdvanceParoleDocument": true,
  "priorAdvanceParoleDateIssued": "2023-04-01",
  "priorAdvanceParoleDisposition": "still in my possession",
  "requestingReplacementDocument": false,
  "dateOfIntendedDeparture": "2026-09-01",
  "purposeOfTrip": "Attend grandmother's funeral",
  "countriesToVisit": "Mexico",
  "numberOfTrips": "one_trip",
  "expectedLengthOfTripDays": 14,
  "applicantDaytimePhoneNumber": "+15125550111",
  "applicantEmail": "marisol.alvarez@example.com",
  "applicantSignatureDate": "2026-08-01",
  "usedInterpreter": false,
  "usedPreparer": false
}
```

This models Marisol Alvarez, requesting Advance Parole based on a pending
Form I-485, with a prior advance parole document still in her possession, and
a single planned trip to Mexico. It exercises the
`travelDocumentType: advance_parole` branch, including the `all`-composed
`advanceParoleBasisReference` requirement (satisfied, since the basis is not
`deferred_enforced_departure`) and the Part 7 travel fields, while correctly
leaving all Reentry-Permit-only fields (Part 4 Items 7-9, Part 5) unset.

A second scenario modeled Kenji Nakamura, requesting a **replacement** Reentry
Permit (lost/stolen/damaged) to be delivered to a U.S. Embassy overseas, with
the pickup notification sent to an alternate (non-U.S.-file) address:

```json
{
  "travelDocumentType": "reentry_permit",
  "holdsRefugeeStatusOrDerivedLPR": false,
  "familyName": "Nakamura",
  "givenName": "Kenji",
  "mailingAddressLine1": "455 Golden Gate Avenue",
  "mailingAddressCity": "San Francisco",
  "mailingAddressState": "CA",
  "mailingAddressZipCode": "94102",
  "mailingAddressCountry": "United States",
  "physicalAddressDiffersFromMailing": false,
  "alienRegistrationNumber": "123456789",
  "countryOfBirth": "Japan",
  "countryOfCitizenshipOrNationality": "Japan",
  "sex": "male",
  "dateOfBirth": "1980-01-20",
  "ethnicity": "not_hispanic_or_latino",
  "race": "asian",
  "heightFeet": 5,
  "heightInches": 9,
  "weightPounds": 165,
  "eyeColor": "brown",
  "hairColor": "black",
  "everInRemovalProceedings": false,
  "everIssuedReentryPermitOrRefugeeTravelDocument": true,
  "priorReentryOrRefugeeDocumentDateIssued": "2020-01-01",
  "priorReentryOrRefugeeDocumentDisposition": "lost, stolen, or damaged",
  "everIssuedAdvanceParoleDocument": false,
  "requestingReplacementDocument": true,
  "replacementReason": "lost_stolen_or_damaged",
  "replacedDocumentReceiptNumber": "MSC9876543210",
  "reentryPermitDeliveryMethod": "overseas_embassy_consulate_or_field_office",
  "reentryPermitOverseasCity": "Tokyo",
  "reentryPermitOverseasCountry": "Japan",
  "reentryPermitNotificationDeliveryMethod": "alternate_address",
  "notificationAddressLine1": "1-1 Nishi-Shinjuku",
  "notificationAddressCity": "Tokyo",
  "notificationAddressCountry": "Japan",
  "notificationDaytimePhoneNumber": "+81332245277",
  "timeSpentOutsideUS": "1_to_2_years",
  "applicantDaytimePhoneNumber": "+14155550133",
  "applicantSignatureDate": "2026-08-01",
  "usedInterpreter": false,
  "usedPreparer": false
}
```

This exercises the `travelDocumentType: reentry_permit` branch, the
replacement-document sub-flow (`requestingReplacementDocument` →
`replacementReason` → `replacedDocumentReceiptNumber`, without triggering the
`correctionItemsNeeded`/`correctionExplanation` `any`-composed requirement,
since the reason chosen is `lost_stolen_or_damaged` not one of the two
`incorrect_information_*` reasons), and the nested delivery/notification chain
(`reentryPermitDeliveryMethod: overseas_embassy_consulate_or_field_office` →
`reentryPermitNotificationDeliveryMethod: alternate_address` →
`notificationAddress*`/`notificationDaytimePhoneNumber` all becoming
required).

A one-off Node script (`node:fs` + a hand-rolled per-field validator
evaluating `required`/`requiredWhen`, including `all`/`any` condition
composition — not committed to the repo) confirmed every populated field
satisfies its `type`/`validation` constraint, no required or conditionally-
required field was left unset, and no out-of-scope conditional field was
incorrectly triggered, for both scenarios:

```
--- Scenario: Advance Parole (pending I-485) ---
PASS — all field constraints satisfied

--- Scenario: Reentry Permit (replacement, sent overseas) ---
PASS — all field constraints satisfied
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/uscis/travel-document-i131/1.0.0/schema.json
ok   registry/us/uscis/travel-document-i131/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/uscis/travel-document-i131/1.0.0/schema.json
ok   registry/us/uscis/travel-document-i131/1.0.0/schema.json [v0.3]
```

A separate structural check confirmed all 97 fields appear in exactly one
`steps[].fields` entry (no field omitted, none duplicated), and that every
`requiredWhen` leaf condition references a field that actually exists in the
document.

## What is NOT yet independently verified

- **The Instructions document** (`i-131instr.pdf`) was not fetched this cycle;
  this document is sourced from the Form I-131 PDF itself. Constraint patterns
  (phone E.164, SSN, A-Number digit count, height/weight ranges) are reasonable
  encodings, not citations of a published USCIS validation rule.
- **`classOfAdmission` and `advanceParoleBasisReference` as free text.** Neither
  the form nor this review enumerates the full set of valid admission-class or
  petition-receipt-number codes; free text is a reasonable encoding, not a
  verified enum.
- **The online (myUSCIS) filing experience's exact screen flow** was not
  directly observed; per the source page, only certain I-131 application types
  can be filed online (the page states "Online (only available for certain
  application types)") — which subset of the in-scope reentry-permit/advance-
  parole flow that covers was not independently confirmed this cycle.
- **The excluded parts (1 Items 2-4/6-12; Parts 2 Items 14-27, 6, 8, 9, 13)**
  are documented as out of scope but not modeled or independently verified
  field-by-field; see "Scope decisions" above.
- **A second reviewer's independent field-by-field re-derivation** (this
  practice's Procedure step 2) has not yet occurred.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) against the live Form I-131 PDF, confirms the sources are
still authoritative, resolves any discrepancy by shipping a new schema
**version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when USCIS publishes a new Form I-131 edition (the form is dated
per edition, e.g. "01/20/25").
