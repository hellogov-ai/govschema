# Verification record — `us/irs/extension-to-file-4868` edition `2025` v1.0.0

This file is the **source-review record** for this document edition/version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

This is the first GovSchema document to exercise the **edition / tax-year axis**
introduced in [spec v0.2](../../../../../../spec/v0.2/SPEC.md) §5.7 under
[GSP-0005](../../../../../../spec/proposals/0005-edition-axis-time-versioned-forms.md).
See [Edition axis](#edition-axis-time-versioned-form) below.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded. It therefore remains `draft`, not `verified`. Consumers SHOULD treat this
as an accurate, source-grounded structural reference, not a load-bearing
description of the live process.

## Source examined

- **Document `(id, edition, version)`:** `us/irs/extension-to-file-4868` / `2025` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** U.S. Internal Revenue Service (IRS)
- **Primary source URL:** <https://www.irs.gov/forms-pubs/about-form-4868>
- **Official form id:** `Form 4868`
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

The "About Form 4868" page was confirmed live at authoring time. It identifies the
form as the **"Application for Automatic Extension of Time to File U.S. Individual
Income Tax Return"**, links the current **2025 Form 4868** revision, and links
**"All Form 4868 Revisions"** — confirming the form is republished each tax year
(the basis for the edition axis below).

## Edition axis (time-versioned form)

Form 4868 is **time-versioned**: the IRS publishes a fresh revision keyed to each
tax year. Per spec v0.2 §5.7 this is modelled on the **edition** axis, *not* by
bumping `version` or folding the year into `id`:

```json
"edition": { "scheme": "us-tax-year", "label": "2025" }
```

- The document carries `edition.scheme = us-tax-year`, `edition.label = 2025`.
- It is stored one directory deeper than a non-edition document, at
  `registry/us/irs/extension-to-file-4868/2025/1.0.0/schema.json`; the `<edition>`
  path segment (`2025`) equals `edition.label` (spec §10 rule 6).
- `id` (`us/irs/extension-to-file-4868`) is **year-agnostic**: it names the process
  across all tax-year editions. A 2026 edition will be authored at
  `.../extension-to-file-4868/2026/1.0.0/` and **coexists** with this one. Neither
  deprecates the other, since in early 2026 an agent may still file a late 2024
  return alongside the 2025 return.
- `version` (`1.0.0`) remains the SemVer content contract **within** the 2025
  edition. A correction to *this* edition's fields ships as a new `version` under
  `2025/`; a new tax year ships as a new `edition`.

Both validators were run at authoring time and pass:
`node tools/validate.mjs <path>` (zero-dependency, rules 1 and 6) and
`node tools/validate-ajv.mjs <path>` (full JSON Schema 2020-12 against the v0.2
meta-schema), the latter reporting the document as `[v0.2]`.

## What was confirmed against the source

- **Form identity and purpose.** The form is the automatic extension of time to
  **file** an individual income tax return (the Form 1040 series). Confirmed
  against the "About Form 4868" page.
- **File-vs-pay distinction.** The extension is to *file*, not to *pay*: any tax
  owed is still due by the original deadline. This drives the `balanceDue` /
  `amountPaying` fields and is stated in the document `description` and those
  fields' `description`s.
- **Two-part layout.** Form 4868's structure is **Part I — Identification** and
  **Part II — Individual Income Tax**. The document mirrors this as two linear
  `steps` (`identification`, `individual_income_tax`).
  - Part I → `taxpayerName`, address fields, `taxpayerSsn`, `spouseSsn`.
  - Part II → `estimatedTotalTaxLiability` (line 4), `totalPayments` (line 5),
    `balanceDue` (line 6), `amountPaying` (line 7), plus the two checkboxes:
    `outOfCountry` (line 8, "out of the country" U.S. citizen/resident) and
    `form1040nrNoWages` (line 9, Form 1040-NR filer without wages subject to U.S.
    withholding).

## What is NOT yet independently verified

- The **Part II money line items** reflect the structure of Form 4868 but were not
  yet confirmed amount-by-amount, line-number-by-line-number against the live 2025
  PDF; the `sourceRef` annotations are indicative, not authoritative citations.
- **Dollar amounts are free numeric inputs.** The IRS does not publish fixed maxima
  for these lines, so no `minimum`/`maximum` is asserted; this is an intentional
  absence, not an unverified constraint.
- Constraint patterns (SSN, ZIP, two-letter state) are reasonable encodings, not
  citations of a published validation rule from the source.
- The original form models the address as a composite block; v0.2's flat field
  model represents it as several `address*` fields (SPEC §6.1). Foreign-address
  handling is described in `addressState` / `addressPostalCode` rather than modelled
  structurally.
- **Deadlines and any year-specific dollar thresholds** are deliberately not encoded
  as data; the document points consumers to the live source instead.

## Path to a `verified` claim (next step)

To advance this edition to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) **against the 2025 Form 4868 PDF specifically**, confirms the source is
authoritative, resolves any discrepancy by shipping a **new schema version** under
`2025/` (immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
4868 is a tax-year-sensitive process and the next edition cycle falls within this
window. Re-check the source on or before that date, on any `source.url` change, and
when the IRS publishes the next tax-year revision (which is authored as a new
**edition**, not a re-verification of this one).
