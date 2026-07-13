# Verification record — `bd/nidw/print-mistake-correction-form-1` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2685** (child issue
**GOV-2688**), sourced from an independent re-scouting pass this same cycle
(**GOV-2685**). It closes **Bangladesh's National ID & Civic Documents
vertical (5 of 6)**, using the National Identity Registration Wing's (NIDW)
"Form-1" (ফরম-১), an application for correction of printing-related errors
in a National ID card or in NIDW's own preserved data. Bangladesh's DMV,
Taxes, Passport, and Visa verticals are already published; Business
Formation (via RJSC) remains Bangladesh's sole open vertical after this
schema lands.

## Source verification (independently re-derived, not copied from the task briefing)

- **Source PDF:**
  `https://nidw.gov.bd/download/NIDForms/print_mistake_correction_form1.pdf`
  — fetched independently this cycle via a plain `curl` (no TLS-verification
  workaround needed, unlike several other Bangladesh government hosts
  already in this registry):
  - **HTTP 200**, `Content-Type: application/pdf`, **146866 bytes**.
  - **`sha256`:**
    `a80ee2b64d89d5a540eeac21bbe2fff0c69b28e4df1da5bdec475e8a78ef593d`
    (computed via `sha256sum` on the freshly-downloaded file).
  - `Last-Modified: Wed, 07 Mar 2018 04:32:02 GMT` — captured here to anchor
    a future re-verification diff.
  - The byte size matches the task briefing's own cited figure
    (146,866 bytes) exactly, independently re-derived.
- **Forms index:** `https://nidw.gov.bd/downloadForm.php` — independently
  re-fetched this cycle: **HTTP 200**, `Content-Type: text/html`,
  **32211 bytes**. Confirms the listing `"1. Print Mistake Correction
  Form1.pdf."` as the first entry, corroborating this is NIDW's own
  officially-distributed "Form-1".
- **NIDW home page:** `https://nidw.gov.bd/` — independently re-fetched this
  cycle: **HTTP 200**, `Content-Type: text/html`. The page's own `<title>`
  ("Bangladesh Election Commission") and body copy (referring to "NID Wing"
  reissuing a National Identity Card) corroborate the authority attribution:
  NIDW is the National Identity Registration Wing under the Bangladesh
  Election Commission, hence `registry/bd/nidw/`.
- **Companion candidate, disclosed out of scope:** Form-6 (lost/duplicate
  NID reissue),
  `https://nidw.gov.bd/download/NIDForms/lost_duplicate_form6.pdf` —
  independently confirmed reachable this cycle (`HEAD` request: HTTP 200,
  `Content-Type: application/pdf`, **908653 bytes**), also mirrored at
  `https://services.nidw.gov.bd/resources/forms/New_Lost_Form.pdf`. A
  distinct process (lost/duplicate reissue, not a data-correction request)
  and out of scope for this v1.0.0; flagged as a candidate companion schema
  for a future cycle.
- The live online submission portal (`services.nidw.gov.bd`) is
  login-gated for actual filing; only the downloadable specimen PDF is
  unauthenticated. This is consistent with this registry's own established
  precedent (e.g. `bd/brta`, `bd/dip/e-passport-application-form`): a
  print-and-fill specimen distributed by the authority's own domain is
  sufficient basis for a schema even when the live online-submission
  channel itself requires a portal login.

## PDF structure, independently confirmed via `pdfjs-dist@4.10.38` (legacy build)

- **2 pages**, matching the task briefing.
- `getFieldObjects()` returned **`null`** — **no AcroForm**.
- `getAnnotations()` returned **0** for both pages — a plain print-and-fill
  document, not a fillable form.
- `getTextContent()` returned a Bengali text layer for both pages (with the
  Latin acronym "NID" appearing verbatim in several labels), but **a
  recurring subset of characters extract as a NUL (U+0000) codepoint**
  rather than a legible Unicode character — most consistently the "ত্র"
  conjunct cluster (as in "পরিচয়পত্র", "identity card/document"), but also
  several other conjunct/complex clusters throughout both pages.

### Encoding defect, independently confirmed via a second extraction path (not assumed acceptable)

This task explicitly called for verifying the encoding rather than assuming
mojibake/gaps are acceptable. Two independent checks were run this cycle:

1. **Codepoint inspection of `getTextContent()`'s own output** — every
   string item containing a NUL was dumped with its full codepoint
   sequence. The NUL consistently appears exactly where a conjunct or
   complex character cluster is printed (confirmed by cross-reading the
   surrounding, correctly-extracted characters against the form's own
   well-known vocabulary), not at random positions — consistent with an
   incomplete embedded-font **ToUnicode CMap** (a font-encoding defect),
   not a corrupted download (the sha256 above matches the task briefing's
   own cited byte size exactly, so the file itself is unmodified).
2. **Independent raster render** — the same PDF was rendered to a PNG raster
   via `pdfjs-dist` + `node-canvas` (`page.render()` at 2.5x scale, in a
   disposable scratch directory). The same character clusters that produced
   a NUL in the text-layer extraction render as a boxed "notdef" fallback
   glyph (occasionally showing an internal glyph-ID label, e.g. "E024") in
   the canvas raster rather than a Bengali glyph. This confirms the defect
   lives in the **embedded font itself** (an incomplete/non-standard
   character mapping), independently corroborated by two different pdfjs
   code paths (text extraction and glyph rasterization), not a single
   extraction quirk.

Despite this, every field below was transcribed with full confidence, not
guesswork:

- The surrounding, unaffected text (item markers (ক)/(খ)/(গ)/... and
  ১/২/৩/৪ Bengali-numeral item numbers, and every word not containing an
  affected conjunct) reads completely legibly.
- This jurisdiction's own established NID-correction vocabulary is already
  cited elsewhere in this registry — `bd/dip/e-passport-application-form`
  independently cites "জাতীয় পরিচয়পত্র" (National ID) and establishes this
  registry's own precedent for treating a printed option list as sufficient
  corroboration even without a fillable widget (its own `gender` field).
- The task briefing's own independently-derived field list ("applicant
  name, NID number, father's/mother's/spouse's name, DOB, address, blood
  group, the specific field(s) being corrected, signature/attestation
  blocks") corroborates the same reading recovered here from the raw text
  layer, cross-checked field-by-field, not copied wholesale.
- A raw grep of the full extracted text for the asterisk character (`*`)
  returned **zero occurrences** — this form prints no requiredness markup
  at all, like this jurisdiction's own `bd/dip/machine-readable-visa-
  application-form` (unlike the AcroForm-derived `bd/dip/e-passport-
  application-form`).

## Form structure and scoping decisions

**Page 1, header row:** Serial Number (`ক্রমিক নম্বর`) and Date of
Application (`আবেদনের তারিখ`, with দিন/মাস/বৎসর day/month/year entry boxes)
appear side by side, with an annotation `(অফিস কর্তৃক পূরণীয়)` ("to be
filled by office") positioned between them. Given this registry's own
consistent convention that a tracking/receipt serial number is
office-assigned (and Bangladeshi bureaucratic forms uniformly treat
`ক্রমিক নম্বর` this way), the serial number is excluded as office-only;
`dateOfApplication` is retained as applicant-supplied (the date on which the
applicant submits), the more common convention for a "date of application"
line signed by the applicant.

**Section 1** identifies the **NID holder** — `holderName`/`holderNidNumber`
(always required) — and, conditionally, a **legal guardian** —
`guardianName`/`guardianNidNumber` — "in case of an NID holder under 18
years of age/declared legally incompetent by a court." The form provides
no boolean flag to gate the guardian fields' requiredness on, the same
disclosed judgment call already used for this jurisdiction's own
`bd/dip/e-passport-application-form` guardian block, so both are left
unconditionally optional.

**Section 3** is a 9-row current-value/requested-value correction table:
name (Bangla), name (English), father's name, mother's name, spouse's name,
date of birth, address, blood group, and an "other" catch-all. Each row has
two columns to fill in ("current information" and "requested corrected
information") plus a shared "Attached documents/Remarks" column. The source
provides no boolean gate identifying which row(s) apply to a given
applicant — a real applicant is expected to complete only the row(s)
relevant to their own correction — so every current/requested field pair is
modeled as unconditionally optional, a disclosed business rule the source
does not itself machine-encode (at-least-one-row-populated is not
machine-checked, consistent with this registry's own established
"disjunctive at-least-one" disclosure precedent, e.g.
`bd/dip/e-passport-application-form`'s `nationalIdCopy`/
`birthRegistrationCertificateCopy`). `currentBloodGroup`/
`requestedBloodGroup` are modeled as plain strings, not enum, consistent
with this registry's own `in/morth` `bloodGroup` precedent (the source
prints only a blank line, no embedded option list). The shared "Attached
documents/Remarks" column is modeled once as the `correctionSupportingEvidence`
`documents[]` entry rather than duplicated per row, since the source names
it generically without an explicit per-row document list.

**Bottom-of-page-1 signature blocks:** a left block, "Legal guardian's
signature/thumbprint **(if applicable)**", and a right block, "Applicant's
signature/thumbprint" (unconditional). Each prints its own "Name:",
"Address:", "Mobile Number:", and "E-mail (if any):" lines beneath the
signature line. Consistent with this registry's own `bd/brta`
(`motor-vehicle-registration-application`, whose page 3 duplicate
identity/signature block is excluded outright) and `bd/dip` precedent of
not modeling a signature block's printed-name-confirmation line as its own
field, the repeated "Name:" line under each block is treated as a duplicate
of the identity already captured above (`holderName` in the ordinary case
of a holder filing for themselves; `guardianName` when a guardian signs)
and is **not** separately modeled. Only the genuinely new data each block
collects — address, mobile number, e-mail — is modeled as new fields:
`applicantAddress`/`applicantMobileNumber`/`applicantEmail` (address and
mobile marked required, as the unconditionally necessary means of reaching
the applicant per Instruction (4)'s own commitment that the office "shall
inform" the applicant of the outcome; e-mail optional, per the source's own
"if any") and `guardianAddress`/`guardianMobileNumber`/`guardianEmail`
(all optional, mirroring `guardianName`/`guardianNidNumber`).

**"অংশ-ক (ফরম-১)" acknowledgement/receipt counterfoil** (page 1, bottom):
duplicates the holder/guardian identity and application date already
captured above (items ১-৩), plus an item ৪ ("Next contact
date/NID issuance date") that is office-determined (a future date the
office assigns, not applicant-supplied). The entire counterfoil is excluded:
items ১-৩ as pure duplicates of already-modeled fields, item ৪ as
office-only.

**Page 2:** a near-identical "Urgent" checkbox/"ক্রমিক নম্বরঃ" (Serial
Number)/"দায়িত্বপ্রাপ্ত কর্মকর্তার স্বাক্ষর" (Signature of the responsible
officer) block is a second office-only receipt stub and is excluded in
full. Only the photograph attachment/staple box ("এখানে সংযুক্ত করুন" /
"(স্ট্যাপল)") is retained, as the `photograph` `documents[]` entry. Page
2's "আবেদনকারীর জন্য নির্দেশাবলী" (Instructions for the Applicant, 6
numbered items) are informational prose, not modeled as fields, but inform
this schema directly:

- Instruction (২): a guardian, when involved, must sign the application and
  submit a copy of their own NID → `guardianNidCopy` `documents[]` entry
  (optional, mirroring the guardian fields' own disclosed conditionality).
- Instruction (৩): a copy of the NID holder's own NID must always be
  submitted → `holderNidCopy` `documents[]` entry (required).
- Instruction (৪): Urgent applications are processed within 7 working days,
  General within 30 working days → reflected in the `applicationType` enum
  and its description.
- Instruction (৫): this application carries **no fee** — confirmed here so
  no payment `documents[]` entry is fabricated.
- Instruction (৬): an incomplete or erroneous application is void —
  informational, not machine-encoded.

**No attestation document modeled.** This form prints no explicit sworn
declaration/attestation sentence anywhere (only bare "signature/thumbprint"
labels), unlike this jurisdiction's own `bd/brta`, `bd/dip/e-passport-
application-form`, and `bd/dip/machine-readable-visa-application-form`,
each of which prints a verbatim "I ... declare" statement. Per this
registry's own convention of only citing verbatim attestation text that
genuinely exists (`document.statement` is meant to be "exact attestation
text, verbatim from the source"), no `documents[]` attestation entry is
modeled here.

### Requiredness judgment call, disclosed

The source prints **no required-field asterisks or other requiredness
markup anywhere** (confirmed by the zero-occurrence `*` grep above), like
this jurisdiction's own `bd/dip/machine-readable-visa-application-form`
(unlike the AcroForm-derived `bd/dip/e-passport-application-form`). Only
fields unconditionally essential to any correction request are marked
`required: true`: `applicationType`, `dateOfApplication`, `holderName`,
`holderNidNumber`, `applicantAddress`, `applicantMobileNumber`. Every other
field — the guardian block, every row of the Section-3 correction table,
and the guardian's own signature-block contact fields — is left optional.
This is a disclosed judgment call, consistent with this registry's own
`bd/brta`/`th/dlt`/`bd/dip` precedent for source forms without printed
requiredness markup.

### Out of scope, disclosed

- **Serial numbers** (page 1 header, page 2 receipt stub) — office-assigned
  tracking numbers, not applicant-supplied.
- **"অংশ-ক (ফরম-১)" acknowledgement/receipt counterfoil** (page 1) — items
  ১-৩ duplicate already-modeled identity/date fields; item ৪
  (next-contact/issuance date) is office-determined.
- **Page 2's "Urgent"/serial-number/officer-signature receipt stub** —
  entirely office-completed.
- **Form-6 (lost/duplicate NID reissue)** — a distinct process (reissue of
  a lost/damaged card, not a data-correction request); disclosed above as a
  companion-schema candidate for a future cycle.
- **No signature-block "Name:" line modeled as a field** — see the
  dedup decision described above.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/nidw/print-mistake-correction-form-1/1.0.0/`:

- **`valid-adult-self-filed-name-and-dob-correction.json`** — an adult NID
  holder filing for themselves (no guardian block), correcting their
  English-script name and date of birth.
- **`valid-minor-holder-guardian-filed-address-correction.json`** — a minor
  NID holder whose legal guardian signs and files on their behalf,
  correcting the holder's address and blood-group record, with the
  guardian's own contact fields and `guardianNidCopy` document populated.

Both were checked with a from-scratch Node conformance checker
(`conformance-check.mjs`, not committed — a disposable script, per this
registry's own established practice, since this registry does not yet ship
a committed conformance-fixture runner; see
`spec/proposals/0016-conformance-fixtures.md`), validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` directly against `spec/v0.3/govschema.schema.json`'s
own field-validation rules:

```
$ node conformance-check.mjs schema.json \
    valid-adult-self-filed-name-and-dob-correction.json \
    valid-minor-holder-guardian-filed-address-correction.json
valid-adult-self-filed-name-and-dob-correction.json: 0 error(s)
valid-minor-holder-guardian-filed-address-correction.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one**
error, derived from the adult valid fixture:

- **`mutation-control-missing-application-type.json`** — drops
  `applicationType` (a static `required: true` field).
- **`mutation-control-missing-holder-nid-number.json`** — drops
  `holderNidNumber`.
- **`mutation-control-invalid-enum-application-type.json`** — sets
  `applicationType` to `"expedited"`, not one of the enum's 2 values.
- **`mutation-control-invalid-type-date-of-application.json`** — sets
  `dateOfApplication` to `"13-07-2026"` instead of a `YYYY-MM-DD` date.
- **`mutation-control-missing-applicant-mobile-number.json`** — drops
  `applicantMobileNumber` (a static `required: true` field).
- **`mutation-control-nid-number-exceeds-maxlength.json`** — sets
  `holderNidNumber` to an 18-digit string, one character past
  `maxLength: 17`.

```
$ node conformance-check.mjs schema.json \
    mutation-control-missing-application-type.json \
    mutation-control-missing-holder-nid-number.json \
    mutation-control-invalid-enum-application-type.json \
    mutation-control-invalid-type-date-of-application.json \
    mutation-control-missing-applicant-mobile-number.json \
    mutation-control-nid-number-exceeds-maxlength.json
mutation-control-missing-application-type.json: 1 error(s)
  - applicationType: required but missing
mutation-control-missing-holder-nid-number.json: 1 error(s)
  - holderNidNumber: required but missing
mutation-control-invalid-enum-application-type.json: 1 error(s)
  - applicationType: 'expedited' not in enum ["urgent","general"]
mutation-control-invalid-type-date-of-application.json: 1 error(s)
  - dateOfApplication: expected YYYY-MM-DD date string
mutation-control-missing-applicant-mobile-number.json: 1 error(s)
  - applicantMobileNumber: required but missing
mutation-control-nid-number-exceeds-maxlength.json: 1 error(s)
  - holderNidNumber: longer than maxLength 17
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/nidw/print-mistake-correction-form-1/1.0.0/schema.json
ok   registry/bd/nidw/print-mistake-correction-form-1/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/nidw/print-mistake-correction-form-1/1.0.0/schema.json
ok   registry/bd/nidw/print-mistake-correction-form-1/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full registry validation run (`node tools/validate.mjs` with no argument,
covering every published document) passes.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Closes Bangladesh's **National ID & Civic Documents vertical (5 of 6)**;
  DMV, Taxes, Passport, and Visa are already published. Business Formation
  (via RJSC) remains Bangladesh's sole open vertical.
- `jurisdiction.level` is `national` — NIDW/the Election Commission is
  Bangladesh's national civil-registry authority.
- `process.type` is `amendment` (a correction to already-registered data),
  distinct from this registry's `application`-typed Bangladesh schemas;
  `process.language` is `bn` — the source PDF's own text layer is entirely
  in Bengali (apart from the Latin acronym "NID").
- Companion candidate for a future cycle: NIDW's own Form-6 (lost/duplicate
  NID reissue), disclosed above as out of scope for this v1.0.0.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming
`nidw.gov.bd/download/NIDForms/print_mistake_correction_form1.pdf` has not
been silently replaced with a revised edition (the current file's own
`Last-Modified` header, 2018-03-07, suggests this specimen is long-lived
and low-churn); (2) checking whether the NIDW/Election Commission has
migrated Form-1 correction requests to a genuine online-submission
workflow beyond this print-and-fill PDF; (3) whether a future cycle wants
to author Form-6 (lost/duplicate NID reissue) as a companion schema.
