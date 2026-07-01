# Verification record — `us/uscis/permanent-resident-card-replacement-i90` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.

### Fix-up: Part 6/7 address and mobile-phone fields (review-gate GOV-362)

The initial authoring pass (this file's "What was confirmed against the
source" section, prior wording) inaccurately claimed the interpreter and
preparer sections were transcribed field-by-field in full. An independent
review-gate re-derivation from the live PDF found that each role's full
mailing-address block (Form I-90 items 3.a-3.h: street, apt/flr/ste, city,
state, ZIP code, province, postal code, country) and mobile telephone number
(item 5) had been omitted — the same address-block shape already correctly
modeled for the applicant in Part 1, just not carried over to Parts 6/7. This
fix-up commit adds the 18 missing fields (9 per role × 2 roles):
`interpreterAddressLine1`/`Apt`/`City`/`State`/`ZipCode`/`Province`/
`PostalCode`/`Country`/`MobilePhoneNumber` and the equivalent
`preparerAddress*`/`preparerMobilePhoneNumber` fields, each re-verified against
the extracted PDF text for Part 6 (page 5) and Part 7 (pages 5-6). The "What
was confirmed against the source" section below has been corrected to reflect
this.

## Why this candidate was advanced now

`us/uscis/permanent-resident-card-replacement-i90` was a tier-1 discovery
candidate (`discovery/catalog.json`), noted as comparable in shape to the
already-published `us/ssa/social-security-card-replacement-ss5` and
`us/uscis/change-of-address-ar11`: a high-frequency, single-form, well-bounded
process with a genuine downloadable, fillable PDF (`Form I-90`), distinct from
the eligibility-heavy `us/uscis/naturalization-n400` (still a candidate).

## Sources examined

- **Document `(id, version)`:** `us/uscis/permanent-resident-card-replacement-i90` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/i-90>
- **Official form id:** `Form I-90 (Edition 01/20/25)`
- **Form PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-90.pdf>
  — fetched directly with a plain `curl` request; HTTP 200, no access block.
  Parsed with the `pdf-parse` npm package (`PDFParse.getText()`); all 7 pages
  extracted as clean, legible text and transcribed field-by-field from that
  output.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A Green Card replacement/renewal is a one-time filing per triggering event
(card expiring/expired, lost/stolen/destroyed, never received, mutilated,
incorrect due to USCIS error, or a legal name/biographic change) — applying the
GSP-0005 §2 coexistence test, there is no scenario where two editions of the
I-90 data model need to coexist for the same applicant. This document is
therefore authored at the plain (non-edition) registry path,
`registry/us/uscis/permanent-resident-card-replacement-i90/1.0.0/`. A future
form revision (the form itself is dated per edition, e.g. "01/20/25") that
changes the field set ships as a new `version`, not an edition.

## Scope decisions

The form has 8 numbered parts; this document models Parts 1-7 (all
applicant-facing content plus the optional interpreter/preparer sections), with
the following simplifications:

- **Part 8 (Additional Information)** is a genuinely open-ended continuation
  space for overflow answers from any other part (identified by page/part/item
  number cross-references); out of scope for this flat field set, the same
  treatment given to similarly open-ended overflow sections in other published
  documents (e.g. Form PPTC 153 section 7).
- **`race`** (Part 3, "select all applicable boxes") is modeled as a single
  string field documented to hold a comma-separated list of the five source
  category values, rather than an array type — v0.2 has no native multi-select
  field type (tracked as a documents/richer-field-types gap alongside
  [GSP-0009](../../../../../spec/proposals/0009-repeating-groups.md)-style
  repeating-structure work).
- **Height/weight item numbering (Part 3, items 6-9).** The extracted PDF text
  interleaves these items with the surrounding Section B application-reason
  checkboxes in a way that could not be unambiguously reconstructed into a
  single item-by-item mapping; `heightFeet`/`heightInches`/`weightPounds` are
  modeled with a general Part 3 `sourceRef` rather than an exact item number.
  See "What is NOT yet independently verified" below.
- **Mutually exclusive selections** (`permanentResidentStatus` branching to
  Section A vs. B reasons; `applicantCanReadEnglish` vs. `usedInterpreter`) are
  recorded as conditional-required notes in field descriptions, not encoded as
  structural constraints — v0.2 has no cross-field conditional-required
  mechanism (tracked under [GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md)).

## What was confirmed against the source

- **Full section-by-section field set (Parts 1-7).** Identity and A-Number
  (with the name-legally-changed branch to the previous-name fields and its
  evidence-attachment note), mailing/physical addresses (including the
  foreign-address province/postal-code variant), place/date of birth,
  parents' given names, class/date of admission, SSN, sex, the Section
  A/Section B application-type-and-reason enums (including the 14th/16th
  birthday and commuter-status sub-reasons), processing information
  (immigrant-visa vs. adjustment-of-status routing, removal-proceedings and
  I-407/abandonment questions), biographic details (height, weight, ethnicity,
  race, eye color, hair color — the eye/hair color enums cross-checked against
  the full 9-option lists on the form), disability/impairment accommodations,
  the applicant's statement/contact/certification/signature block, and the
  optional interpreter and preparer sections, **including each role's full
  mailing-address block (items 3.a-3.h) and mobile telephone number (item 5)**
  (plus the preparer's attorney/accredited-representative branch and its
  Form G-28 cross-reference) — all transcribed field-by-field from the decoded
  PDF text.
- **Process identity.** Confirmed `Form I-90` is the correct, current
  (Edition 01/20/25) USCIS form for this process, and that it is distinct in
  scope from Form I-407 (referenced only as a yes/no question item) and Form
  N-400 (naturalization, a separate candidate).

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, integer minimum/maximum, date format,
boolean type, and the conditional-field notes called out in field descriptions):

```json
{
  "alienRegistrationNumber": "123456789",
  "currentFamilyName": "Nakamura",
  "currentGivenName": "Aiko",
  "nameLegallyChanged": "no",
  "mailingAddressLine1": "455 Golden Gate Avenue",
  "mailingAddressCity": "San Francisco",
  "mailingAddressState": "CA",
  "mailingAddressZipCode": "94102",
  "mailingAddressCountry": "United States",
  "physicalAddressDiffersFromMailing": false,
  "dateOfBirth": "1988-03-14",
  "placeOfBirthCity": "Osaka",
  "countryOfBirth": "Japan",
  "classOfAdmission": "IR1",
  "dateOfAdmission": "2015-09-01",
  "sex": "female",
  "permanentResidentStatus": "lawful_permanent_resident",
  "reasonForApplicationSectionA": "expired_or_expiring_within_six_months",
  "locationAppliedForImmigrantVisaOrAdjustment": "U.S. Embassy Tokyo",
  "locationVisaIssuedOrAdjustmentGranted": "U.S. Embassy Tokyo",
  "enteredWithImmigrantVisa": true,
  "destinationAtAdmission": "San Francisco, CA",
  "portOfEntryAtAdmission": "San Francisco International Airport",
  "everInRemovalProceedings": false,
  "everFiledI407OrAbandonedStatus": false,
  "heightFeet": 5,
  "heightInches": 4,
  "weightPounds": 128,
  "ethnicity": "not_hispanic_or_latino",
  "race": "asian",
  "eyeColor": "brown",
  "hairColor": "black",
  "requestingDisabilityAccommodation": false,
  "applicantCanReadEnglish": true,
  "usedInterpreter": false,
  "usedPreparer": false,
  "applicantDaytimePhoneNumber": "+14155550133",
  "applicantEmail": "aiko.nakamura@example.com",
  "applicantSignatureDate": "2026-08-01"
}
```

This models Aiko Nakamura, a lawful permanent resident renewing an expiring
Green Card, admitted on an immigrant visa issued at the U.S. Embassy in Tokyo,
with no prior removal proceedings or abandonment findings, no disability
accommodation needed, and completing the form herself (no interpreter or
preparer). The scenario exercises the
`permanentResidentStatus: lawful_permanent_resident` →
`reasonForApplicationSectionA` branch and the `enteredWithImmigrantVisa: true`
path, while omitting the optional USCIS Online Account Number,
previous-name fields (name not legally changed), mailing in-care-of name,
mobile phone, and all interpreter/preparer fields (both boolean flags false). A
one-off Node script (`node:fs` + a hand-rolled per-field validator, not
committed to the repo) confirmed every populated field satisfies its `type` and
`validation` constraint and that no required field was left unset:

```
PASS — mock I-90 application (lawful permanent resident, expiring-card renewal, no interpreter/preparer) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/uscis/permanent-resident-card-replacement-i90/1.0.0/schema.json
ok   registry/us/uscis/permanent-resident-card-replacement-i90/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/uscis/permanent-resident-card-replacement-i90/1.0.0/schema.json
ok   registry/us/uscis/permanent-resident-card-replacement-i90/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **Part 3 height/weight item numbering (items 6-9).** As noted under "Scope
  decisions," the exact item-number-to-field mapping for `heightFeet`,
  `heightInches`, and `weightPounds` could not be unambiguously reconstructed
  from the extracted PDF text's layout (the four items appear to interleave
  with the neighboring Section B checkboxes in the underlying PDF form-field
  order). The fields themselves (feet/inches height split, pounds weight) are
  correct per the form's plain-text labels; only their precise item numbers are
  unconfirmed.
- **`classOfAdmission` as free text.** The form does not enumerate acceptable
  admission-class codes on its face (e.g. IR1, CR1, F2A); the Instructions
  document likely lists the full set, which was not fetched this cycle. Free
  text is a reasonable encoding, not a verified enum.
- **Constraint patterns** (phone E.164, SSN, A-Number digit count) are
  reasonable encodings, not citations of a published USCIS validation rule.
- **The out-of-scope Part 8 continuation section** is documented as such but
  not modeled or independently verified field-by-field; see "Scope decisions"
  above.
- **The online (myUSCIS) filing experience's exact screen flow** was not
  directly observed; this document is sourced from the paper/PDF Form I-90
  itself, not its separately-published Instructions document.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form I-90 PDF, confirms the sources are still
authoritative, resolves any discrepancy by shipping a new schema **version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
USCIS publishes a new Form I-90 edition (the form is dated per edition, e.g.
"01/20/25").
