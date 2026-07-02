# Verification record — `us/uscis/adjustment-of-status-i485` v1.0.0

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

Form I-485 (Application to Register Permanent Residence or Adjust Status) was
prioritized under [GOV-664's approved plan](../../../../../../../GOV/issues/GOV-664#document-plan)
(federal passport/immigration authoring wave, plan §2 F1.3): it is the core
domestic step of the U.S. immigration lifecycle — the filing that converts an
approved or concurrently filed immigrant petition (Form I-130, I-140, I-360,
I-526/I-526E, and others) or another qualifying basis (asylee/refugee
adjustment, Diversity Visa, registry) into lawful permanent resident status —
and, like `us/uscis/permanent-resident-card-replacement-i90`
(GOV-282/GOV-362), is published as a paper/PDF form with no online-account
login gate blocking direct fetch.

## Sources examined

- **Document `(id, version)`:** `us/uscis/adjustment-of-status-i485` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/i-485>
- **Official form id:** `Form I-485 (Edition 01/20/25)`
- **Form PDF:** <https://www.uscis.gov/sites/default/files/document/forms/i-485.pdf>
  — fetched directly with a plain `curl` request; HTTP 200, no access block, no
  login gate.
- **Extraction method:** the PDF carries **no fillable AcroForm/XFA fields**
  recognized by `pdf-lib` (`form.getFields()` returned zero); page text was
  extracted with `pdfjs-dist` (`getTextContent()` per page), yielding clean,
  legible text for all 24 pages, transcribed field-by-field from that output —
  the same technique used for `us/uscis/permanent-resident-card-replacement-i90`.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

Adjustment of status is a one-time filing tied to an underlying immigrant
petition, priority date, or other qualifying basis, not something filed "for" a
recurring period — applying the GSP-0005 §2 coexistence test, there is no
scenario where two editions of the I-485 data model need to coexist for the
same applicant. This document is therefore authored at the plain (non-edition)
registry path, `registry/us/uscis/adjustment-of-status-i485/1.0.0/`. A future
form revision (the form itself is dated per edition, e.g. "01/20/25") that
changes the field set ships as a new `version`, not an edition.

## Scope decisions

Form I-485 (Edition 01/20/25) has 14 numbered parts across 24 pages, plus a
"For USCIS Use Only" cover block. This document models Parts 1-12 (all
applicant/interpreter/preparer-facing content), with the following
simplifications and exclusions:

- **Part 13 (Signature at Interview)** is completed by a USCIS officer at the
  in-person interview, not by the applicant when preparing the filing — out of
  scope, the same treatment given to agency-internal "For USCIS Use Only"
  content elsewhere (e.g. Form I-90's Action Block, Form PPTC 153's agency
  fields).
- **Part 14 (Additional Information)** is a genuinely open-ended continuation
  space for overflow answers from any other part (identified by page/part/item
  number cross-references) — out of scope for this flat field set, the same
  treatment given to Form I-90's Part 8 and other published documents'
  overflow sections.
- **The cover page's "For USCIS Use Only" block** (Priority Date, Country
  Chargeable, receipt/interview action items, attorney/G-28 representative
  fields) is agency-internal or attorney-of-record data, not applicant-supplied
  form content — out of scope, consistent with Form I-90's precedent.
- **Repeating structures with a fixed number of form-provided entry
  blocks** (Organization 1/2 in Part 9 items 2-9, Child 1/2 in Part 7 items
  2-3) are each modeled as separate, fully-named fields (`organization1*` /
  `organization2*`, `child1*` / `child2*`) rather than an array, since the
  form itself provides exactly two slots; additional entries route to Part 14
  per the form's own instructions. This mirrors Form I-90's `interpreter*` /
  `preparer*` per-role field-set pattern.
- **Genuinely open-ended repeating tables** — the public-charge benefits-received
  table (item 65, up to 8 rows of benefit/dates/amount) and the
  institutionalization table (item 66) — are modeled as single free-text
  fields (`publicChargeBenefitsReceivedDetail`, `institutionalizationDetail`),
  one entry per line, the same treatment given to Form I-90's `race` field for
  the "select all applicable" checkbox group. v0.3 has no native
  repeating-structure field type (tracked as
  [GSP-0009](../../../../../spec/proposals/0009-repeating-groups.md)).
- **`race`** (Part 8, item 2, "select all applicable boxes") is modeled as a
  single string field documented to hold a comma-separated list of the five
  source category values, identical to Form I-90's treatment of the same
  field.
- **`applicationCategory`** (Part 2, items 3.a-3.g) collapses a deeply nested
  checkbox tree of roughly 50 leaf immigrant-classification options into a
  single 51-value enum, since the form itself requires selecting exactly one
  leaf category; this mirrors Form I-90's `reasonForApplicationSectionA`/`B`
  pattern at larger scale.
- **General Eligibility and Inadmissibility Grounds (Part 9)** is modeled in
  full: 86 numbered items (plus lettered sub-items, e.g. 43.b-43.i, 53.a-53.d,
  78.a-78.b, 84.a-84.c) are each a distinct boolean field, tagged
  `"fieldRole": "eligibility"` per GSP-0014 to mark them as gating/eligibility
  questions rather than ordinary data fields. No `eligibleValues` is set on
  any of them: a "Yes" answer to most of these items signals a potential
  ground of inadmissibility, but several are waivable or fact-dependent, and
  asserting a specific eligible/ineligible value per item would be a legal
  determination this schema does not make; a consuming agent should treat
  every `fieldRole: eligibility` answer here as routing information for
  professional/legal review, not an automated accept/reject signal.
- **Mutually exclusive/conditional selections** (e.g.
  `permanentResidentStatus`-style branches such as `filingAs` →
  `principalApplicant*`, `publicChargeExemptCategory` → items 57-66,
  `currentMaritalStatus` → `currentSpouse*`) are recorded as
  conditional-required notes in field descriptions, not encoded as structural
  constraints — the same treatment given to Form I-90's branching fields
  (tracked under [GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md);
  v0.3's `requiredWhen`/`visibleWhen` condition grammar from GSP-0013 could
  formalize these in a follow-up minor version).

## What was confirmed against the source

- **Full part-by-part field set (Parts 1-12).** Identity, A-Number, other
  names/dates of birth, passport/visa and last-arrival details, Form I-94
  information, current/mailing/prior/foreign addresses, Social Security card
  election; the filing-category and principal/derivative-applicant routing and
  the full ~50-option immigrant-classification enum; the Affidavit of Support
  exemption-reason enum; prior consular immigrant-visa applications and
  5-year employment/education history; both parents' identity; marital status,
  current-spouse and prior-marriage details; both modeled children's identity
  and relationship; biographic information (ethnicity, race, height, weight,
  eye/hair color); all 86 numbered General Eligibility and Inadmissibility
  Grounds items (criminal, security-related, public-charge, immigration-
  violation, and miscellaneous-conduct questions) plus their lettered
  sub-items and documented conditional follow-ups; and the applicant,
  interpreter, and preparer contact/certification/signature blocks —
  all transcribed field-by-field from the decoded PDF text (`pdfjs-dist`
  page-text extraction; no AcroForm/XFA fields were present to cross-check
  against).
- **Process identity.** Confirmed `Form I-485` (Edition 01/20/25) is the
  correct, current USCIS form for adjustment of status, distinct from
  `us/uscis/permanent-resident-card-replacement-i90` (card
  renewal/replacement for an existing permanent resident, not obtaining
  status) and from consular immigrant-visa processing abroad (a separate,
  non-USCIS process).

## Mock-data test run

Per the issue's instruction to test-run the schema with valid mock data, a
representative filled-out application was authored (a first-time, F-1-status
applicant adjusting as the spouse of a U.S. citizen, with a clean eligibility
history) and checked field-by-field, via a one-off Node script (not committed
to the repo), against every `type`/`required`/`validation` constraint in
`schema.json`:

```
PASS — mock I-485 application (171 fields set) satisfies schema field-level constraints.
```

The script cross-referenced every `required: true` field against the mock
object and confirmed all 131 unconditionally-required fields (i.e. those
without a "Required when ..." conditional note in their description) were
populated, and that every populated field's value satisfied its `type` and
`validation` constraint (string length, regex pattern, enum membership,
integer minimum/maximum, and date format). The scenario exercises
`applicationCategory: spouse_of_us_citizen`, `filingAs: principal_applicant`,
`publicChargeExemptCategory: not_exempt` (with items 57-62 completed and
items 63-64 answered `false`), a prior U.S. address requiring the
`priorAddress*` fields, and a clean answer (`false`) to all 86 Part 9
eligibility items.

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/uscis/adjustment-of-status-i485/1.0.0/schema.json
ok   registry/us/uscis/adjustment-of-status-i485/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/uscis/adjustment-of-status-i485/1.0.0/schema.json
ok   registry/us/uscis/adjustment-of-status-i485/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **A small number of item-number placements in Part 1 and Part 9.** The
  extracted PDF text's column-based layout interleaves several item numbers
  out of true reading order — the same class of issue documented for Form
  I-90's height/weight items (6-9). Specifically:
  - Part 1: the passport/travel-document/visa fields and item 8 (USCIS Online
    Account Number) form one cluster without individually numbered sub-items;
    and the "current immigration status" / alien-crewman-visa / addresses
    cluster (items 13-18) could not be unambiguously split item-by-item from
    the extracted text. The field content and labels are transcribed as
    printed; only the exact item-number-to-field mapping in these two
    clusters is uncertain.
  - Part 9: item 35 ("have you EVER served as a foreign government official?")
    appears in the extracted text prefixed with a stray "25." immediately
    before it, inconsistent with the surrounding 34→36 sequence; treated as a
    text-extraction artifact and numbered 35 by position. Organization 2's
    city/state/country location field (between explicit items 6 and 8) has no
    printed item number in the extracted text and is inferred as item 7. The
    43.b-43.i security-related sub-items' own cross-references to each other
    (e.g. "described in Item Numbers 43.b.-43.e.") appear with inconsistent
    ranges in different places in the extracted text; the individual activity
    descriptions are transcribed as printed, but the exact boundary of each
    cross-reference range is not independently confirmed. Items 76-77
    (unlawful presence and its trafficking follow-up) are ordered by logical
    dependency (base question, then conditional follow-up) rather than by
    the extracted text's raw left-to-right/top-to-bottom order, which
    presents them reversed.
- **`classOfAdmission`-style free-text fields** (e.g. `i94ImmigrationStatus`,
  `currentImmigrationStatus`) are modeled as free text; the Instructions
  document (not fetched this cycle) may enumerate a controlled vocabulary.
- **Constraint patterns** (phone E.164, SSN, A-Number digit count, integer
  ranges) are reasonable encodings, not citations of a published USCIS
  validation rule.
- **The out-of-scope Part 13 (interview signature) and Part 14 (continuation)
  sections**, and the cover page's "For USCIS Use Only"/attorney block, are
  documented as such but not modeled or independently verified field-by-field;
  see "Scope decisions" above.
- **The `fieldRole: eligibility` items' legal consequence** (which specific
  "Yes" answers are waivable, which are absolute bars) is intentionally not
  encoded in this schema; see the Part 9 scope-decision note above.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) against the live Form I-485 PDF, resolves the item-numbering
ambiguities noted above by re-deriving the true reading order (e.g. from the
form's Instructions document or an alternate extraction method), confirms the
sources are still authoritative, resolves any discrepancy by shipping a new
schema **version** (immutability — VERSIONING §3, practice Procedure step 5),
and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when USCIS publishes a new Form I-485 edition (the form is dated
per edition, e.g. "01/20/25").
