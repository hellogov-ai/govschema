# Verification record — `us/dos/lost-or-stolen-passport-ds64` v1.1.1

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

A full field-by-field comparison (`manual-source-review-v1` → Procedure step 2)
and flow comparison (step 3) are now complete. No field, type, requiredness,
validation, or flow discrepancy was found against the sources examined; no data
change was needed. This is a **PATCH** per VERSIONING.md ("a re-verification
that finds the source unchanged ... refreshes `verification.lastVerifiedAt`
[and] `status` to `verified`").

## Sources examined (re-fetched directly this pass)

- <https://travel.state.gov/content/travel/en/passports/have-passport/lost-stolen.html>
  — re-fetched directly (HTTP 200, no access block). Confirmed unchanged: the
  three reporting channels (Online Form Filler at pptform.state.gov, cancels
  within 1 business day; by mail with Form DS-64 plus a front-and-back photo-ID
  photocopy; or in person while applying for a new passport with Form DS-11),
  the "reporting does not replace the passport — apply in person for a
  replacement" statement, and the do-not-report-an-already-expired-passport
  exception. Page footer now reads "Last Updated: May 12, 2026" — after this
  schema's original 2026-07-01 authoring date, but the "Report Your Passport
  Lost or Stolen" content itself (reporting options, key points) is unchanged
  from what v1.0.0/v1.1.0 recorded; the update timestamp reflects an unrelated
  page-template refresh elsewhere on travel.state.gov, not a content change to
  this page's substance.
- **Form DS-64 PDF**, re-fetched directly from `eforms.state.gov/Forms/ds64.pdf`
  (HTTP 200) and re-extracted with a **second, independent tool** —
  `pdfjs-dist` (`getTextContent()`), distinct from the original authoring's
  `pdf-parse` — closing v1.0.0's open "re-fetch and re-extract... or try an
  alternative extraction tool" item. Page 2 (the data-collection fields)
  extracted cleanly and matches this schema's `fields`/`steps` 1:1: the
  book/card status-and-selection checkboxes, the connected-new-application
  question, identity (name, name-change, DOB, place of birth, SSN with its
  voluntary-disclosure note), contact (address, phone, alternate phone,
  email), the loss/theft explanation/location/date questions, **both**
  distinct "Did you file a police report?" questions (one under the
  loss/theft-date question, mapped to `policeReportFiled`; one under the
  other-lost-passports history question, mapped to
  `otherLostPassportPoliceReportFiled` — the GOV-321 correction from v1.0.0
  still holds), the lost book/card number-and-issue-date fields, the
  other-lost-passports history group, and the signature block including the
  minor-under-16 dual-guardian path and its 22 C.F.R. 51.28 sole-authority
  exception (Form DS-5525).
- Page 1's known custom-glyph font-encoding artifact reproduced **identically**
  in this pass's independent extraction (e.g. "book and/or card" again
  rendering as "ERRNDQGRUFDUG"), confirming it is a stable rendering artifact
  of the PDF's generation tooling — not new drift, and not something a
  different extraction tool resolves — and that it continues to affect only
  page 1 boilerplate/legal prose, not any page 2 field label or the page 1
  filing-options text (which extracted legibly and matches this schema's
  `description` fields).
- OMB Control No. **1405-0014** confirmed unchanged (matches
  `source.documentRef`); the PDF's expiration-date line is one of the strings
  affected by the glyph artifact and could not be read with full confidence
  this pass either, consistent with v1.0.0's original note — not treated as a
  discrepancy since `documentRef` does not encode an expiration date.

## What was re-confirmed against the source (no changes)

- **Cross-field "at least one of book/card" constraint.** Still expressible
  only as a description-level note on `passportBookStatus`/
  `passportCardStatus`, not a machine-enforced `crossFieldValidation` rule:
  spec v0.3's `crossFieldValidation` (§8.3, [GSP-0013]) shapes are `when` +
  `requireAbsent`/`requirePresent` (gating a *different* field's presence) or
  a `compare` between two fields' *values*, neither of which expresses "at
  least one of these two enum fields must not both be `not_applicable`"
  without a synthetic boolean helper field. Left as a documented, spec-grammar
  limitation rather than forcing an awkward encoding — unchanged from
  v1.0.0/v1.1.0.
- **Constraint patterns** (SSN 9-digit, ZIP/postal code length, E.164 phone)
  remain reasonable GovSchema-convention encodings, not citations of a
  published DOS validation rule — unchanged.
- **Online and phone-reporting channels' exact data model** were still not
  directly observed (the Online Form Filler at pptform.state.gov requires an
  interactive session; the phone channel per the PDF's own page 1 is "not
  available for customers abroad" and has no published field list). This
  document remains sourced from the paper/PDF Form DS-64, which
  travel.state.gov states is the same underlying report; `source.url`/
  `documentRef` target that paper form specifically, so this is a documented
  scope decision, not a gap blocking `verified` status — the same pattern
  applied to other login-gated online channels in this registry (e.g.
  `nz/dia/realme-verified-identity`).
- **Pairing with Form DS-11.** `isConnectedToNewApplication`'s description and
  the document `description`'s reference to `us/dos/passport-application-ds11`
  both re-confirmed against the live page's "While applying for a new one"
  section, which states the applicant "must include information about your
  most recent passport while filling out Form DS-11" and that DOS "may pause
  your application and ask you to submit Form DS-64" if that information is
  incomplete — consistent with this schema's existing framing of DS-64 as
  submitted together with DS-11 in the common case.

## Noted aside, not fixed this pass (out of scope for this review)

Several fields whose `description` already says "Personal identifier; handle
as sensitive data" (`lastName`, `firstName`, `middleName`,
`nameAtPassportIssuance`, `telephoneNumber`, `alternateTelephoneNumber`,
`emailAddress`) do not carry the optional `classification: sensitive-pii`
member that this document's own v1.0.0→v1.1.0 spec-migration bump already
applied to `dateOfBirth`, `socialSecurityNumber`, `lostPassportBookNumber`,
and `lostPassportCardNumber`. This is a partial GSP-0006 classification
backfill, not something this verification pass's practice (field/type/
requiredness/validation/flow accuracy against the live source) covers;
flagged for whoever next runs a classification-backfill pass over this
document, same pattern as the `de/bmi/residence-registration` v1.1.1 aside.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when the U.S. Department of State publishes a new Form DS-64
revision.
