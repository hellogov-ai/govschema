# Verification record — `us/uscis/naturalization-n400` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from the official Form N-400 (Edition 01/20/25)
and its Instructions, but given the scale of this form (268 fields across 13
parts), a second-reviewer field-by-field pass has **not** yet been completed and
recorded. It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `us/uscis/naturalization-n400` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/n-400>
- **Official form id:** `N-400` (Application for Naturalization), Edition 01/20/25
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why the AcroForm PDF, not the online flow

Form N-400 can be filed online via a myUSCIS account or by mail. The online flow
sits behind an authenticated, login-gated account and could not be inspected
directly (the same constraint documented for `nz/dia/realme-verified-identity`
and other login-gated sources). This schema is therefore sourced from the
official Form N-400 PDF and Instructions PDF, per the issue's fallback guidance.
The PDF is the authoritative, publicly fetchable representation of the same
field set the online flow collects.

## Method

1. Fetched `https://www.uscis.gov/n-400` directly (200 OK, no access block) and
   confirmed the current edition date (01/20/25) and filing channels.
2. Downloaded the Form N-400 PDF from
   `https://www.uscis.gov/sites/default/files/document/forms/n-400.pdf`.
   The PDF uses the Standard security handler (encrypted, empty user password);
   raw zlib/stream inspection was insufficient, so the form was parsed
   programmatically with `pdfjs-dist` (`legacy/build/pdf.js`), which handles the
   encryption transparently.
3. Extracted plain text per page (`getTextContent`) for all 14 pages, giving a
   complete first pass at every Part, item number, and label.
4. For sections where content-stream text order did not match visual reading
   order — Part 1's eligibility-category lettering (A–G) and Part 3's biographic
   item numbers — re-extracted with `(x, y)` position data per text run, sorted
   top-to-bottom/left-to-right, to recover the true visual order and confirm
   item-letter-to-description mapping.
5. Rendered pages 3, 5, 6, and 8 to PNG (`pdfjs-dist` + `node-canvas`, scale 2.0)
   and visually counted table rows/columns to confirm the cardinality of every
   repeating table on the form (glyph rendering was partially broken in this
   headless setup, but table grid lines and checkbox counts were clearly
   legible). Cross-checked against the PDF's AcroForm field names
   (`getAnnotations`) where the naming was unambiguous.

## Repeating tables: how they are modeled

The GovSchema v0.3 field model has no repeating-group/array type (only scalar
`string | number | integer | boolean | date | enum | file | object`). Each
repeating table on the source form is modeled as **N fixed, numbered field
sets**, where N is the table's actual row count on the form (confirmed per
step 5 above), not an arbitrary truncation:

| Table | Location | Rows confirmed |
|---|---|---|
| Previous physical addresses (5-year history) | Part 4, Item 1 | 3 → `previousAddress1..3*` |
| Children | Part 6, Item 2 | 3 → `child1..3*` |
| Employment/schools (5-year history) | Part 7, Item 1 | 3 → `employer1..3*` |
| Trips outside the United States (5-year history) | Part 8, Item 1 | 6 → `trip1..6*` |
| Crime/offense disclosure | Part 9, Item 15.b | 5 → `crime1..5*` |

Where the source form itself caps a table at N rows and directs applicants to
"use the space provided in Part 14. Additional Information" for anything beyond
that, this schema encodes the same N-row cap and reproduces that instruction in
each field's `description`. `Part 14. Additional Information` itself is free-text
overflow space with no fixed fields and is intentionally not modeled.

## What was confirmed against the source

- All 13 applicant-facing Parts (Part 1 through Part 13) were transcribed
  field-by-field with `sourceRef` pointing to the printed Part/Item number.
- Part 15 (Signature at Interview) and Part 16 (Oath of Allegiance acknowledgment
  text) are USCIS-officer/ceremony-time sections with no applicant pre-filing
  data entry beyond what Part 9, Items 31–37 already capture (willingness to
  take the Oath) — intentionally out of scope, consistent with how
  `us/uscis/permanent-resident-card-replacement-i90` excludes USCIS-internal
  sections.
- Enum option sets (`ethnicity`, `race`, `eyeColor`, `hairColor`,
  `maritalStatus`, `child*Relationship`, `child*Residence`,
  `currentSpouseBecameCitizenBy`) were transcribed directly from the checkbox
  labels visible in the extracted/position-sorted text.
- Conditional fields (`requiredWhen`) were added only where the source text
  states an explicit routing rule (e.g. "Required when wantsNameChange is
  true", "skip to Item Number X"); compound conditions that depend on more than
  one prior answer (e.g. current-spouse detail fields, which depend on both
  marital status and eligibility category) are instead documented in prose in
  the field `description`, to avoid encoding a condition tree that risks being
  subtly wrong.

## What is NOT yet independently verified

- A second reviewer has not yet performed an independent field-by-field pass
  against the live PDF, which `manual-source-review-v1` (Procedure step 2)
  requires for a `verified` claim. Given the form's size, Part 9 (Additional
  Information About You — the "good moral character" background-disclosure
  section, Items 1–37) is the highest-priority section for that second pass,
  since it is the most legally significant and the most densely packed with
  sequential sub-lettered items.
- The online myUSCIS filing flow itself (question wording, save/resume
  behavior, conditional branching as implemented in the UI) was not observed,
  since it is login-gated; this schema reflects the paper/PDF field set only.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a second reviewer applies
`manual-source-review-v1` (Procedure step 2) field-by-field against the live
Form N-400 PDF, with particular attention to Part 9's item lettering and the
repeating-table row counts documented above, resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check the source on or before that date and on any edition-date
change (the form footer edition date is the authoritative version marker).
