# Verification record — `bd/nidw/nid-correction-application-form-1` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2688**. It opens
**Bangladesh's National ID & Civic Documents vertical**, the last of
Bangladesh's 6 verticals to open, using the National Identity Registration
Wing's (NIDW, operating under the Bangladesh Election Commission) "Form-1"
("Application for Correction of Error(s) in the National ID Card or Preserved
Data"). A sibling issue/PR (GOV-2687) authors Bangladesh's Business Formation
vertical in parallel this cycle — see "Bangladesh's overall vertical status"
below for how the two combine.

## Source verification (independently re-derived, not copied from the task briefing)

- **Forms index:** `https://nidw.gov.bd/downloadForm.php` — independently
  re-fetched this cycle via a Chrome-like-User-Agent `curl` (no TLS bypass
  needed for this host): **HTTP 200**, `Content-Type: text/html; charset=UTF-8`,
  **32,211 bytes**. The page's own `<title>` reads ".: Bangladesh Election
  Commission :." and its form list carries the exact link text "1. Print
  Mistake Correction Form1.pdf." pointing at
  `download/NIDForms/print_mistake_correction_form1.pdf`.
- **NIDW homepage:** `https://nidw.gov.bd/` — independently fetched, **HTTP
  200**; its own prose refers to "NID Wing" as the operational unit handling
  NID issuance/correction, confirming `authority.name`
  ("National Identity Registration Wing (NIDW), Bangladesh Election
  Commission").
- **PDF source:**
  `https://nidw.gov.bd/download/NIDForms/print_mistake_correction_form1.pdf`
  — fetched independently this cycle via the same `curl` invocation:
  - **HTTP 200**, `Content-Type: application/pdf`, **146,866 bytes** —
    matching the task briefing's own cited size exactly, independently
    re-derived.
  - **`sha256`:**
    `a80ee2b64d89d5a540eeac21bbe2fff0c69b28e4df1da5bdec475e8a78ef593d`
    (computed via `sha256sum` on the freshly-downloaded file).
  - The response's own `Last-Modified` header reads `Wed, 07 Mar 2018
    04:32:02 GMT`, captured here to anchor a future re-verification diff.

## PDF structure, independently confirmed via `pdfjs-dist@4` (legacy build)

- **2 pages**.
- `getFieldObjects()` returned **`null`**, and both pages'
  `getAnnotations()` returned an **empty array** — this is a genuine static
  print-and-fill specimen with **zero AcroForm/Widget annotations**, unlike
  this registry's `bd/dip` schemas (e-passport, visa) or `bd/brta`'s
  AcroForm-bearing DMV form.
- `getTextContent()` returned a text layer across both pages, position-sorted
  into rows by y-coordinate to reproduce the form's own reading order.

## Bengali text-extraction encoding issue — investigated and fixed, not given up on

pdfjs-dist's raw `getTextContent()` output, read literally, is **not directly
legible** Bengali — it is not mojibake in the "wrong codepage" sense, but a
**glyph-ordering artifact**: the extraction follows the underlying content
stream's glyph paint order, which for this PDF's embedded font is *visual*
order, not Unicode *logical* order. Bengali has three dependent vowel signs
that are pre-base in rendering but post-base in logical/Unicode storage — ি
(U+09BF, vowel sign I), ে (U+09C7, vowel sign E), ৈ (U+09C8, vowel sign AI).
Because they are painted before the consonant they modify, the raw extraction
also emits them before that consonant, e.g. the very common word "পরিচয়"
("identity") was extracted as "পিরচয়" (the vowel sign ি and the consonant র
swapped).

This was investigated, not written off as unreadable:

1. Confirmed the pattern was systematic (the same three vowel signs, the same
   swap direction) rather than random noise, by observing it recur
   identically across dozens of words.
2. Wrote a small, disposable Node post-processing script (not committed, per
   this registry's own established practice for one-off extraction tooling)
   applying one regex: for each pre-base vowel sign (ি/ে/ৈ) immediately
   followed by a virama-joined consonant cluster, move the vowel sign to
   *after* that cluster.
3. Re-ran the fix across the full extracted text of both pages. The result is
   substantially and legibly correct Bengali: recognizable, correctly-ordered
   government-form vocabulary throughout (জাতীয় পরিচয়পত্র "National ID
   card", সংশোধন "correction", আবেদনকারী "applicant", অভিভাবক "guardian",
   ঠিকানা "address", স্বাক্ষর "signature", মোবাইল নম্বর "mobile number",
   ইমেইল "e-mail", রক্তের গ্রুপ "blood group", জন্ম তারিখ "date of birth",
   etc.). Every field in this schema, the correction table's 9 subject rows,
   and all 6 of the page-2 instructions were read from this corrected text.

### A residual, disclosed limitation: dropped conjunct ligatures

A handful of complex Bengali conjunct ligatures used by this PDF's embedded
legacy font (e.g. ক্ষ "ksha", ত্র "tra") have **no ToUnicode entry at all**
and extract as a blank space rather than a reordering-recoverable character —
these are glyph-mapping gaps, not an ordering problem the regex above can fix.

An attempt was made to independently cross-check these specific gaps by
rendering each page to a bitmap via `pdfjs-dist`'s canvas API (`node-canvas`,
`page.render()` at 3x scale). This did **not** work: the PDF's embedded
TrueType font uses non-standard/malformed glyph hinting programs —
`pdfjs-dist` logs a repeated `"TT: CALL empty stack (or invalid entry)"`
warning for essentially every glyph on both pages while rendering — and the
resulting bitmap paints no visible glyph outlines at all. This failure is
itself informative: it corroborates that this document embeds a legacy,
non-standard Bengali font whose both its ToUnicode CMap *and* its glyph
program are unreliable, consistent with the reordering bug above, rather than
being two unrelated defects.

Lacking a working visual cross-check, every ligature-dropped gap was resolved
instead from the **fixed, verbatim-repeated legal phrase it sits inside**.
The form's own title phrase — "জাতীয় পরিচয়পত্র বা সংরক্ষিত তথ্য-উপাত্ত"
("the National ID card or preserved data") — recurs identically at the top of
page 1, in item ১, in item ৩'s table header, and in page-2 instructions
১/২/৪, always with the exact same single dropped syllable in the exact same
word ("সংরক্ষিত" → "সংরি ত"). Recognizing the same, common, unambiguous
administrative term recurring identically across five independent locations
in the same document is treated here as a disclosed **judgment call**, not an
independently re-derived fact of the same weight as the mechanical reordering
fix above.

## Form structure and scoping decisions

### In scope (30 `fields[]` + 4 `documents[]` entries)

- **Application type** (`applicationType`): a printed "জরুরী/সাধারণ"
  (Urgent/Regular) checkbox pair, appearing on both the main application and
  its tear-off receipt, corroborated by page-2 instruction 4's own
  differential processing time (7 working days urgent vs. 30 regular).
  Modeled as `enum`, `required: true`.
- **Item ১** (identity of the NID card holder / applicant): Name, National ID
  Number — `applicantName`, `applicantNidNumber`, both `required: true`.
- **Item ২** (legal guardian, applicable when the NID holder is a minor or
  court-declared incompetent): Name, National ID Number —
  `guardianName`, `guardianNidNumber`. The source's own item ২ heading and
  page-2 instruction 2 make this block conditionally mandatory, but — the
  same disclosed judgment call this registry's `bd/dip` e-passport schema
  already made for its own guardian block — the form provides **no dedicated
  boolean field** (e.g. an "is the card holder a minor?" checkbox) to gate a
  `requiredWhen` condition against. Rather than inventing one, both fields are
  modeled as unconditionally optional.
- **Item ৩** (the correction table, 9 printed subject rows, each with a
  current-value and a requested-new-value column): Name (Bengali), Name
  (English), Father's Name, Mother's Name, Spouse's Name, Date of Birth,
  Address, Blood Group, Other — modeled as **18 flat fields**
  (`correction<Subject>Current`/`correction<Subject>New`), all optional. The
  table's own instruction ("অপ্রয়োজনীয় অংশ কর্তন করিয়া দিন" — cross out
  the unneeded rows) confirms an applicant fills in only the row(s) relevant
  to their specific correction request, so no row can be marked
  unconditionally required; this registry's v0.3 field model is flat (no
  nested/array fields, per spec §6.1), so the table's rows are expressed this
  way rather than as a repeating group. Blood Group is kept `string`, not
  `enum`: this is a blank fill-in on a static, non-AcroForm specimen with no
  embedded or printed option list to model a closed set from — inventing an
  8-value (A+/A-/etc.) enum without direct source evidence would violate this
  registry's "never invent an enum without a source-provided option list"
  convention.
- **Other** row (item ৩'s ninth, catch-all row): `correctionOtherFieldName`
  (which field), `correctionOtherCurrentValue`, `correctionOtherNewValue`.
- **Signature block** (bottom of page 1, two columns — Applicant's
  signature/thumbprint, Legal Guardian's signature/thumbprint if applicable):
  each column separately prints Name/Address/Mobile Number/E-mail alongside
  the signature line. The **Name** in this block is the same underlying fact
  already captured as `applicantName`/`guardianName` above and is **not**
  re-modeled as a duplicate field (disclosed consolidation decision, to avoid
  two fields asserting the same data point under different names).
  **Address** and **Mobile Number** are new facts not captured elsewhere on
  the form and are modeled `required: true` for the applicant column (no
  asterisk convention exists on this static form, but these are the
  applicant's own basic contact particulars with no "if applicable"
  qualifier printed near them, unlike E-mail, whose own label reads
  "ই-মেইল (যদি থাকে)" — "E-mail, if any" — explicitly optional).
  `guardianAddress`/`guardianMobileNumber`/`guardianEmail` mirror the same
  three facts for the guardian column, unconditionally optional for the same
  reason as `guardianName` above.

### Out of scope, disclosed

- **Serial Number and Application Date** (top of page 1): both sit directly
  beneath a printed "(অফিস কর্তৃক পূরণীয়)" ("to be filled by the office")
  heading — office-entered, not applicant-entered, data.
- **The tear-off acknowledgement-receipt section**
  ("অংশ-ক (ফরম-১)" — "Part-A (Form-1)"): a duplicate summary restating the
  applicant's/guardian's Name and National ID Number, the Application Date,
  plus office-only fields (the responsible officer's signature/seal, and the
  next-contact/NID-issuance date, both filled in when the office later hands
  the receipt back — see page-2 instruction 4). Excluded as a receipt slip
  that duplicates already-captured applicant data plus office-only content,
  consistent with this registry's convention of not double-modeling a
  restated receipt (see `bd/dip/e-passport-application-form`'s own exclusion
  of its Online Registration ID/Payment Reference items on the same
  reasoning).
- **No payment/fee requirement is modeled.** Page-2 instruction 5 states
  explicitly: "অত্র আবেদনের জন্য আবেদনকারীকে কোনো ফি/চার্জ প্রদান করিতে
  হইবে না" ("The applicant shall not have to pay any fee/charge for this
  application") — a genuine, source-confirmed negative finding, not an
  omission.

## Documents (`documents[]`)

- **`applicantNidPhotocopy`** (`identity-document`, `required: true`) — page-2
  instruction 3 unconditionally requires a photocopy of the NID holder's own
  National ID Card.
- **`guardianNidPhotocopy`** (`identity-document`, `required: false`) —
  page-2 instruction 2 makes this mandatory specifically when the card holder
  is a minor/court-declared incompetent, but — for the same reason as
  `guardianName` above — no boolean gate field exists, so this is modeled
  unconditionally optional and the conditional requirement is disclosed in
  the entry's own `handling` text rather than fabricated as a machine-checked
  gate.
- **`correctionSupportingDocument`** (`supporting-evidence`,
  `required: false`) — the correction table's own fourth column
  ("মন্তব্য/দলিলাদি" — Remarks/Documents) implies supporting proof
  accompanies specific corrections (e.g. a birth certificate for a
  date-of-birth correction), but the form itself provides no discrete,
  itemized per-row document checklist the way `bd/dip/e-passport
  -application-form`'s attachment list does. Modeled as one generic optional
  entry rather than fabricating a per-row requirement the source does not
  spell out.
- **`applicantSignatureAttestation`** (`attestation`, `required: true`) — the
  signature/thumbprint of the applicant, or of the legal guardian if the card
  holder is a minor/court-declared incompetent. No verbatim declaration
  sentence ("I hereby declare...") is printed near the signature line on this
  form (unlike, e.g., `bd/dip/e-passport-application-form`'s own Declaration
  block), so no `statement` text is cited.

## Language

`process.language` is `bn` (Bengali): the form's text is Bengali throughout;
only the parenthetical "(NID)" abbreviation survives as Latin-script text
anywhere on the form. This distinguishes it from `bd/dip`'s fully bilingual
(Bengali-primary/English-secondary) passport and visa specimens.

## Bangladesh's overall vertical status

At the time this cycle authored this schema, Bangladesh had 4 of 6 verticals
published (Taxes, DMV, Passport, Visa) plus this cycle's National ID & Civic
Documents (5th), with Business Formation being authored in parallel via a
sibling issue/PR (GOV-2687, `registry/bd/roc/`). Whether Bangladesh reaches
6 of 6 depends on whether that sibling PR has landed on `main` by the time
this PR is reviewed — see this PR's own description and `CATALOG.md`'s
Executive Summary entry for the count current as of this PR's opening.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/nidw/nid-correction-application-form-1/1.0.0/`:

- **`valid-adult-name-correction.json`** — an adult applicant (no guardian),
  a regular (non-urgent) application, correcting only their Bengali-script
  name (row (ক)).
- **`valid-minor-with-guardian-dob-blood-group-correction.json`** — a minor
  applicant with a legal guardian, an urgent application, correcting both
  Date of Birth (row (চ)) and Blood Group (row (জ)), with full guardian
  contact particulars and all 4 `documents[]` entries provided.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.{enum,pattern,maxLength}` grammar
plus `documents[].required` directly against `spec/v0.3/SPEC.md`'s rules:

```
$ node check_conformance.mjs schema.json \
    valid-adult-name-correction.json \
    valid-minor-with-guardian-dob-blood-group-correction.json
valid-adult-name-correction.json: 0 error(s)
valid-minor-with-guardian-dob-blood-group-correction.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-applicant-name.json`** — drops `applicantName`
  (a static `required: true` field) from the adult valid fixture.
- **`mutation-control-missing-applicant-address.json`** — drops
  `applicantAddress`.
- **`mutation-control-missing-applicant-mobile-number.json`** — drops
  `applicantMobileNumber`.
- **`mutation-control-invalid-enum-application-type.json`** — sets
  `applicationType` to `"walk-in"`, not one of the enum's 2 values.
- **`mutation-control-missing-required-document-nid-photocopy.json`** —
  removes the `applicantNidPhotocopy` entry from `documents[]`, isolating the
  required-document check.
- **`mutation-control-invalid-email-pattern.json`** — starts from the
  guardian valid fixture (which populates `applicantEmail`) and sets it to
  `"not-an-email"`, violating its regex pattern.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-applicant-name.json \
    mutation-control-missing-applicant-address.json \
    mutation-control-missing-applicant-mobile-number.json \
    mutation-control-invalid-enum-application-type.json \
    mutation-control-missing-required-document-nid-photocopy.json \
    mutation-control-invalid-email-pattern.json
mutation-control-missing-applicant-name.json: 1 error(s)
  - applicantName: required but missing
mutation-control-missing-applicant-address.json: 1 error(s)
  - applicantAddress: required but missing
mutation-control-missing-applicant-mobile-number.json: 1 error(s)
  - applicantMobileNumber: required but missing
mutation-control-invalid-enum-application-type.json: 1 error(s)
  - applicationType: value "walk-in" not in enum ["urgent","regular"]
mutation-control-missing-required-document-nid-photocopy.json: 1 error(s)
  - documents.applicantNidPhotocopy: required document not provided
mutation-control-invalid-email-pattern.json: 1 error(s)
  - applicantEmail: value "not-an-email" does not match pattern ^[^@\s]+@[^@\s]+\.[^@\s]+$
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/nidw/nid-correction-application-form-1/1.0.0/schema.json
ok   registry/bd/nidw/nid-correction-application-form-1/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/nidw/nid-correction-application-form-1/1.0.0/schema.json
ok   registry/bd/nidw/nid-correction-application-form-1/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Bangladesh's **National ID & Civic Documents vertical**, its last
  remaining open vertical.
- `jurisdiction.level` is `national` — NIDW/the Bangladesh Election Commission
  is Bangladesh's national identity-registration authority.
- `process.type` is `amendment` — this form corrects/amends already-registered
  NID data, rather than an original `application`.
- Companion candidate for a future cycle: NIDW's Form-6 ("Lost/Duplicate NID
  Reissue"), located at
  `https://nidw.gov.bd/download/NIDForms/lost_duplicate_form6.pdf` (908,653
  bytes per this cycle's scouting; not independently re-verified in this
  cycle since it is out of this v1.0.0's scope) and mirrored at
  `https://services.nidw.gov.bd/resources/forms/New_Lost_Form.pdf`. This would
  model the lost/damaged-card reissue process rather than a data-correction
  process, and NIDW's own `downloadForm.php` index also lists a Form-14
  ("ID Card Correction Form") not investigated this cycle.
- The live online submission portal (`services.nidw.gov.bd`) requires login
  to actually file — only the downloadable specimen PDF is unauthenticated —
  consistent with this registry's existing precedent (BRTA, DIP) that a
  genuine print-and-fill specimen is sufficient basis for a schema even when
  live online submission itself sits behind a portal login.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the PDF has not
been silently replaced with a revised edition (this cycle captured its
`Last-Modified: Wed, 07 Mar 2018 04:32:02 GMT` header to anchor a future
diff); (2) whether NIDW's Form-6 (lost/duplicate reissue) or Form-14
(a second, differently-named correction form also listed on the same index)
warrant a companion schema; (3) whether a future cycle can find a working
image-rendering path for this PDF's malformed embedded font, to independently
re-confirm the small number of conjunct-ligature-dropped words resolved this
cycle by textual-repetition inference rather than direct visual read.
