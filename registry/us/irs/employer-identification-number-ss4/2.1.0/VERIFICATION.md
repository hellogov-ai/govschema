# Verification record — `us/irs/employer-identification-number-ss4` v2.1.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0` and `v2.0.0`'s own `VERIFICATION.md` files stay as the
authoring provenance for those versions and are not edited (VERSIONING.md §3
immutability); this is a fresh record for `v2.1.0`.

## Current claim

- **`status`:** `draft` (unchanged — this version does not perform the
  independent field-by-field re-review; see `2.0.0/VERIFICATION.md`'s "What is
  NOT yet independently verified", which still applies)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

## Why this is a MINOR version, not MAJOR

Per [GOV-319](/GOV/issues/GOV-319) (RFC 0003 §8, flagship plan point 2), this
version adds a new top-level `documents[]` array (GSP-0014) with one entry.
Unlike `v2.0.0`'s two new required *fields* (which change what applicant data
validates against `fields[]`/`required`), `documents[]` is new **process
metadata** describing a requirement, not a new required member of the
applicant-supplied data model `fields[]` validates. No existing `fields[]`
entry, `required` flag, or `validation` rule changed. Per
[VERSIONING.md](../../../../../VERSIONING.md) §5.3 ("a new OPTIONAL field... a
new step that does not alter existing required inputs"), this is a
backward-compatible **MINOR** (`2.0.0` → `2.1.0`): any `2.0.0`-conforming
applicant data remains valid; a consumer simply gains one more structured fact
to act on.

## Sources examined

- **Document `(id, version)`:** `us/irs/employer-identification-number-ss4` /
  `2.1.0`
- **Form PDF:** <https://www.irs.gov/pub/irs-pdf/fss4.pdf> — re-downloaded and
  decoded (zlib-decompress the content streams, extract the parenthesized
  `Tj`/`TJ` text-showing operands; same convention `1.0.0/VERIFICATION.md`
  used). 93 of 182 streams decompressed, matching the `1.0.0` count — same
  form revision, no source change since.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## What changed from v2.0.0

- **New `documents[]` array**, one entry: `applicantSignature`
  (`category: attestation`, `required: true`, `belongsTo: applicant`). Its
  `statement` is the **exact, verbatim** perjury text from the decoded PDF
  content stream (signature-block text object, immediately preceding the
  "Name and title (type or print clearly)" caption):

  > Under penalties of perjury, I declare that I have examined this
  > application, and to the best of my knowledge and belief, it is true,
  > correct, and complete.

  Transcribed directly from the PDF's text-showing operands (a `\`
  end-of-line continuation inside the parenthesized string was resolved per
  PDF string syntax — the backslash-newline is a line-wrap artifact in the
  source stream, not a real character — not paraphrased), per the
  *source-of-truth fidelity* lens GSP-0014 §1 calls for on `statement`
  specifically ("an attestation's legal weight lives in its precise
  language").
- **`applicantNameAndTitle`'s `description` tightened**: it remains the
  scalar `fields[]` entry for the signer's typed name and title (a data
  value, unchanged `type`/`required`/`validation`), with its description now
  pointing at the `applicantSignature` `documents[]` entry for the actual
  perjury statement, instead of restating it inline. No behavior change.
- **No `payment` or `identity-document` entries.** Per the RFC's own framing,
  this is a deliberate demonstration that `documents[]` is optional per
  category, not a forced checklist — SS-4 has no file upload and no
  application fee, so only the one `attestation` entry applies.

## What is NOT yet independently verified

Unchanged from `1.0.0`/`2.0.0` — see those records. This version adds one
verbatim-transcribed attestation entry; it does not perform the field-by-field
independent re-review that would advance `status` to `verified`.

## Re-verification

`nextReviewBy` continues unchanged at **2027-01-01** (same cadence window as
`1.0.0`/`2.0.0`; no new source dependency was introduced — the perjury
statement is on the same form page already covered by that window).
