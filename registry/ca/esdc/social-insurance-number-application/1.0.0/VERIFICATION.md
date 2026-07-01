# Verification record — `ca/esdc/social-insurance-number-application` v1.0.0

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

## Why this candidate was advanced now

`ca/esdc/social-insurance-number-application` was already a tier-1 candidate in
`discovery/catalog.json`, noted as the GB/IE counterpart to
`gb/hmrc/national-insurance-number-application` and
`ie/dsp/pps-number-application`. Unlike several candidates declined earlier this
session (CA CDL, GB first-provisional licence, DE passport application), this
process has a genuine downloadable, fillable application form — closing this gap
completes the tax/benefits-identifier family across all five focus-vertical
jurisdictions this session has touched (US, GB, IE, DE, and now CA).

## Sources examined

- **Document `(id, version)`:** `ca/esdc/social-insurance-number-application` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Employment and Social Development Canada, Service Canada (ESDC)
- **Primary source URL:** <https://www.canada.ca/en/employment-social-development/services/sin/apply.html>
- **Official form id:** `Form GC-NAS2120 (2023-06-004) E`
- **Form PDF:** <https://catalogue.servicecanada.gc.ca/apps/EForms/pdf/en/GC-NAS2120.pdf>
  — fetched directly with a plain `curl` request; HTTP 200, no access block.
  Parsed with the `pdf-parse` npm package (`PDFParse.getText()`); all 8 pages
  (the Information Guide for Applicants, the application form itself — items
  1-13 — and the mail-application checklist) extracted as clean, legible text
  and transcribed field-by-field from that output.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A SIN is issued once per lifetime; a SIN application/amendment is not filed "for"
a recurring tax/award year — applying the GSP-0005 §2 coexistence test, there is
no scenario where two editions of the GC-NAS2120 data model need to coexist for
the same applicant. This document is therefore authored at the plain
(non-edition) registry path,
`registry/ca/esdc/social-insurance-number-application/1.0.0/`. A future form
revision that changes the field set ships as a new `version`, not an edition.

## Scope decisions

- **Modeled:** the application form's own biographic fields (items 1-13):
  application type, applicant name/DOB/gender, parents' names at birth, place of
  birth, family name at birth and prior names, previous-SIN history, status in
  Canada, contact information, mailing address, and the signature/representative
  block.
- **Out of scope — identity-document requirements (Step 1 of the Information
  Guide).** Which specific original documents (birth certificate, permanent
  resident card, work/study permit, etc.) an applicant must present is a rich,
  status-dependent branching structure (citizen / registered Indian / permanent
  resident / temporary resident / other, each with its own document list, plus
  representative-specific document requirements). This is process guidance
  about what to physically bring, not itself form-field data collected on
  GC-NAS2120, and is out of scope for this document.
- **Out of scope — the "for office use only" sections** at the bottom of the
  form (items A-H) — administrative fields completed by Service Canada staff,
  not the applicant.
- **Out of scope — more than two parents.** The form provides items 4 and 5 for
  two parents; the guide's own note about attaching a separate sheet for
  jurisdictions recognizing up to four parents is out of scope for this flat
  field set (see GSP-0009).

## What was confirmed against the source

- **Process identity and channels.** No fee; online (10 business days), by mail
  using this form (20 business days), or in person (issued same-visit, form not
  required) are all confirmed directly from the Information Guide and recorded
  in the document `description`.
- **Application-type options.** The seven checkbox options on the form's own
  header ("I am applying for a(n)") transcribed directly, including the
  "900 series SIN" (temporary SIN) expiry-date-change option.
- **Item-by-item field set (items 1-13).** Name, date of birth, optional
  gender/multiple-birth fields (the guide explicitly states gender is optional,
  unlike every other item 1-13), two parents' names at birth, place of birth,
  family name at birth (distinct from the current name in item 1), prior other
  names, previous-SIN history (with the exact "yes / no / unknown (don't
  recall)" options), status-in-Canada checkboxes, residing-in-Canada
  sub-question, phone numbers, mailing address, and the signature/
  representative-relationship block — all transcribed field-by-field from the
  decoded PDF text.
- **Signature rules.** The age-based signing-authority rules (parent/guardian
  for under 12; child/parent/guardian for 12-to-majority; representative/
  guardian/lawyer for a represented minor or adult) and the "X"-signature
  two-witness rule are recorded in `signatureDate`'s description, transcribed
  from the Information Guide's Step 2.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out application was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, date format, boolean type, and the
conditional-field notes called out in field descriptions):

```json
{
  "applicationType": "first_sin",
  "firstGivenName": "David",
  "otherGivenNames": "Wei",
  "familyName": "Chen",
  "dateOfBirth": "2001-11-02",
  "parent1GivenNames": "Li Ming",
  "parent1FamilyNameAtBirth": "Chen",
  "placeOfBirthCity": "Toronto",
  "placeOfBirthProvinceOrState": "Ontario",
  "placeOfBirthCountry": "Canada",
  "familyNameAtBirth": "Chen",
  "hadPreviousSin": "no",
  "statusInCanada": "canadian_citizen",
  "currentlyResidingInCanada": true,
  "primaryPhoneNumber": "+16195550199",
  "mailingAddressStreet": "900 Bay Street",
  "mailingAddressCity": "San Diego",
  "mailingAddressProvinceOrState": "CA",
  "mailingAddressCountry": "United States",
  "mailingAddressPostalCode": "92109",
  "signatureDate": "2026-08-01"
}
```

This models David Wei Chen — the new individual owner introduced in the sibling
`us/ca/dmv/vehicle-title-transfer` mock scenario this session — applying for his
first SIN as a Canadian-born citizen now residing abroad (a plausible scenario:
a Canadian citizen living in the U.S. who still needs a SIN for Canadian tax or
benefits purposes), signing for himself with no representative. The scenario
exercises the `hadPreviousSin: no` path (no `previousSinNumber` needed) and omits
the optional gender, multiple-birth, second-parent, evening-phone, in-care-of,
and representative fields. A one-off Node script (`node:fs` + a hand-rolled
per-field validator, not committed to the repo) confirmed every populated field
satisfies its `type` and `validation` constraint and that no required field was
left unset:

```
PASS — mock first-SIN application (Canadian-born citizen) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/ca/esdc/social-insurance-number-application/1.0.0/schema.json
ok   registry/ca/esdc/social-insurance-number-application/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/ca/esdc/social-insurance-number-application/1.0.0/schema.json
ok   registry/ca/esdc/social-insurance-number-application/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **`gender`'s optionality and value set.** The Information Guide states gender
  is optional and the form shows two boxes (Male/Female); this document models
  it as an optional two-value enum, a reasonable reading but not independently
  cross-checked against a possible third/blank option on the live online form.
- **The `parent2*` fields' actual requiredness.** The guide's "the parent listed
  in item 4 must not be repeated in item 5" phrasing implies two parents are
  expected wherever known, but does not state item 5 is mandatory when only one
  parent is known (e.g. an unknown or deceased second parent); modeled as
  optional pending confirmation.
- **Constraint patterns** (SIN 9-digit format, phone E.164, postal code) are
  reasonable encodings, not citations of a published ESDC validation rule.
- **The online application's exact screen-by-screen flow** was not directly
  observed (it requires signing in); this document is sourced from the paper
  GC-NAS2120 form and its Information Guide, which the guide states covers the
  same underlying data for the mail channel and is a reasonable proxy for the
  online channel's biographic fields.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form GC-NAS2120 PDF, ideally with an observed run of
the online application, confirms the sources are still authoritative, resolves any
discrepancy by shipping a new schema **version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt` / `nextReviewBy`.
This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
Service Canada publishes a new Form GC-NAS2120 revision.
