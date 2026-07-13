# Verification record — `gh/mfa/application-for-a-republic-of-ghana-passport` v1.0.0

This file is the **source-review record** for this document version, per
the [`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`

This is a `GovSchema Standard Research` cycle (**GOV-2703**), continuing
Ghana's research thread from **GOV-2695** (the parent research issue),
which scouted all 5 of Ghana's then-remaining open verticals in parallel
following **GOV-2510**'s opening of Ghana as the registry's 41st
jurisdiction (via National ID & Civic Documents). **GOV-2697** (Taxes) and
**GOV-2698** (Visa) have since closed two of those five verticals; this
issue is for the Passport vertical.

## Source examined

- **Authority:** Ministry of Foreign Affairs and Regional Integration
  (MFA), Passport Office.
- **Document:** "APPLICATION FOR A REPUBLIC OF GHANA PASSPORT", citing the
  Passport and Travel Certificate Decree (NLCD. 155, 1967).
- **URL (directly retrieved, HTTP 200, no login):**
  <https://mfa.gov.gh/wp-content/uploads/2018/10/passport-form.pdf>
- **File identity:** `sha256:e59193adeaf05847042dbd03928f1e7e9bec3b4cf333ee19c048c18e5bb73c9`,
  248,106 bytes, `Content-Type: application/pdf`. Byte count and hash match
  the GOV-2703 issue's own citation exactly.
- **Structure:** 4 pages. Page 1 carries a header strip (TIN, a
  paid-voucher-code blank, a name-summary blank), instructions/caution
  text, and a "FOR OFFICIAL USE ONLY" block, followed by the start of the
  numbered items (1-3). Pages 2-4 continue items 4-30.
- **Retrieved / reviewed:** 2026-07-13
- **Live workflow page also independently re-fetched:**
  <https://mfa.gov.gh/index.php/passport/> (HTTP 200), which the issue cited
  as describing "the manual-form workflow." Its own text, stripped of
  markup, confirms verbatim: "Download a form... Pay for the processing of
  your application ('PAY PROCESSING FEE'). You will receive an SMS on the
  Mobile Phone number you entered... Write the Paid Voucher Code on your
  Manual Form. Submit the completed Manual Form to the PAC for further
  processing," followed by a list of 10 Passport Application Centers
  (PACs).

## Extraction method

`pdfjs-dist` (v4, legacy build) `page.getAnnotations()` confirms **0
Widget annotations** across all 4 pages, and `page.getTextContent()`
confirms a real, fully extractable text layer (338 / 187 / 168 / 223 text
items on pages 1-4 respectively) — a flat print form, a different tier
from both this registry's AcroForm specimens and its genuinely scanned
specimens (e.g. `gh/gis`).

With no interactive field metadata to read, each page's text items were
grouped by y-coordinate (3pt tolerance) into visual lines and sorted by
x-coordinate within each line, reproducing the form's printed reading
order. Every numbered item (1-30) was read this way. A custom
`NodeCanvasFactory` (backed by `node-canvas`, at 2.5x scale) was also used
to render all 4 pages to PNG; while the specimen's font glyphs did not
render in this environment (a `pdfjs-dist`/`node-canvas` standard-font
path-generator incompatibility, not a content issue — the text layer
itself already fully accounts for every printed word), the rendered
comb-box and blank-line geometry was still visible and was used to (a)
confirm no isolated, unlabelled box exists anywhere across all 4 pages
that might indicate a photograph-affixing area, and (b) resolve the
Item 7(a) Height layout (`___m ___cm`, two separate blanks) from the
gaps between text tokens on that line.

## Field inventory

114 `fields[]` entries, referenced by item number. Selected groups:

| Item(s) | Printed content | Schema field(s) |
|---|---|---|
| Header | TIN; TRANSACTION NO; NAME OF APPLICANT | `taxIdentificationNumber`, `paidVoucherCode`, `applicantFullNameSummary` |
| 1 | Surname / First Name / Other Names | `surname`, `firstName`, `otherNames` |
| 2-3 | Maiden Name(s); previous name if changed | `maidenName`, `previousName` |
| 4 | Date of Birth; Gender | `dateOfBirth`, `gender` |
| 5-6 | City/Town of Birth; Country of Birth | `cityOrTownOfBirth`, `countryOfBirth` |
| 7 | Height (m/cm); Colour of eyes/hair; Visible peculiarities | `heightMeters`, `heightCentimeters`, `colourOfEyes`, `colourOfHair`, `visiblePeculiarities` |
| 8-10 | Nationality; Marital Status; Profession/Previous Profession | `nationality`, `maritalStatus`, `profession`, `previousProfession` |
| 11-13 | National ID / SSN / Voter's ID card numbers | `nationalIdCardNumber`, `socialSecurityNumber`, `votersIdCardNumber` |
| 14-21 | Residence address, Digital Address Code, contact | `countryOfResidence` ... `email` (10 fields) |
| 22 | Institution, address, attendance period | `institutionAttended`, `institutionAddress`, `institutionPeriodFrom`, `institutionPeriodTo` |
| 23 | Evidence of citizenship: father / mother / one grandparent | 27 fields (9 each, `father*`/`mother*`/`grandParent*`) |
| 24 | Dual citizenship declaration | `hasDualCitizenship`, `dualCitizenshipOtherCountry` |
| 25 | Documents held (A-G); document being attached | 7 booleans + `attachingDocumentType`/`Number`/`DateOfIssue`/`PlaceOfIssue` |
| 26 | Two guarantors | 14 fields (`guarantorA*`/`guarantorB*`) |
| 27 | Declaration by applicant | `declarationFullName`, `firstTimeApplicant`, `previousPassportNumber`, `previousPassportStatus`, `declarationSignatureDate` |
| 28 | Parent/legal guardian consent (under 18) | `guardianRelationshipToApplicant` ... `guardianSignatureDate` (5 fields) |
| 29 | Translator for illiterate-in-English applicants | `translatorLanguage` ... `translatorSignatureDate` (5 fields) |
| 30 | Witness | `witnessFullName` ... `witnessSignatureDate` (8 fields) |

`documents[]` (4 entries):

- `citizenshipAndIdentityEvidence` — one of the 7 document types listed in
  item 25 (A-G), matching the applicant's own `attachingDocumentType`
  selection, per instruction 1's "evidence of citizenship and... evidence
  of identity."
- `missingPassportPoliceReport` — `requiredWhen previousPassportStatus
  equals "lost"`, per instruction 2: "Police Report and affidavit are to
  be attached for missing passports."
- `passportProcessingFeePayment` — sourced from the live
  `mfa.gov.gh/index.php/passport/` page, not the PDF itself (see below).
- `applicationDeclaration` — item 27's always-applicable "And that all
  above information is true and correct," quoted verbatim.

The page-1 "FOR OFFICIAL USE ONLY" block (Regional Office, vendor
receipt-stamp area, Passport Office stamp, "Please enter application
payment PIN") is excluded as staff/vendor-populated, consistent with this
registry's established convention (cf. `gh/nia`'s excluded MRW
Number/Registration Centre Number/Interviewer NID No. widgets). The
pre-printed "SERIAL NO: 18/" blank is excluded as a form-batch identifier,
not an applicant-supplied value. No raw signature/thumbprint capture field
is modelled anywhere on the form, for the same reason its constituent
Signature/Date blanks are split (only the Date half is modelled).

## Access notes and judgment calls

1. **`paidVoucherCode` (the printed "TRANSACTION NO:" blank) is
   interpreted using the live workflow page, not the PDF alone.** The
   specimen prints "TRANSACTION NO:" with no on-form explanation of what
   value belongs there. `mfa.gov.gh/index.php/passport/`'s own "HOW TO
   APPLY" steps make the intended content unambiguous: pay the processing
   fee online, receive an SMS with a "Paid Voucher Code," and "Write the
   Paid Voucher Code on your Manual Form" — there being no other blank on
   the specimen this instruction could refer to. Disclosed here rather
   than silently guessed at from the PDF alone.
2. **`maritalStatus` is modelled as free text, not an enum**, matching
   this registry's `gh/gis` precedent for the same jurisdiction: the
   specimen prints only a bare blank for item 9, with no enumerated
   options anywhere across all 4 pages (confirmed via the extracted text
   and a full render).
3. **Item 7(a) Height is modelled as two integer fields
   (`heightMeters`/`heightCentimeters`)**, reflecting the printed
   `___m ___cm` layout (two separate blanks, one before each unit
   literal), rather than a single decimal field — read directly from the
   x-coordinate gaps between the "Height", "m", and "cm" text tokens on
   that line.
4. **Item 23's evidence-of-citizenship block genuinely supports a
   `requiredWhen` gate**, unlike `gh/gis`'s ungated `maritalStatus`
   precedent: each relative's "Living? Yes/No" is a real printed boolean
   choice, so each `*LastKnownAddress` field ("If deceased provide last
   known address") is `requiredWhen` its own `*Living` field equals
   `false` — a genuine conditional-requiredness rule, not a
   disclosed-only convention, because this form actually provides the
   field to key off.
5. **Item 27's declaration is modelled around `firstTimeApplicant`**, the
   printed statement (a) verbatim ("that I have not previously held or
   applied for a passport of any description"), with
   `previousPassportNumber`/`previousPassportStatus` each
   `requiredWhen firstTimeApplicant equals false` — mirroring the form's
   own "Cancel if not applicable" mutual exclusivity between statements
   (a) and (b).
6. **Items 28 (parent/legal guardian consent, applicants under 18) and 29
   (translator for applicants who cannot read or write English) are not
   `requiredWhen`-gated**, even though both are conditional in the real
   world. This specimen provides no dedicated boolean minor-status or
   literacy-status field to key off (unlike item 23's `*Living` fields),
   so gating would require inventing a field this form does not print —
   consistent with this registry's established practice of only gating
   conditionals on fields the source itself provides (cf. `gh/gis`'s
   ungated `maritalStatus`-conditional `spouseName`/`spouseNationality`).
   Each field's `description` documents the real-world condition instead.
7. **No photograph `documents[]` entry is modelled**, a deliberate
   departure from `gh/gis` (a different Ghanaian form). Neither the
   extracted text nor a full-page render of all 4 pages turns up any
   photograph-attachment instruction or unlabelled photo-affixing box
   anywhere on this specimen — disclosed as an absence rather than
   assumed by analogy to other passport forms in this registry.
8. **`passportProcessingFeePayment` (a `documents[]` entry) is sourced
   from the live `mfa.gov.gh/index.php/passport/` page, not the PDF.** The
   fee-payment step precedes and is external to the printed form (it
   produces the Paid Voucher Code written into `paidVoucherCode`), so
   there is no PDF `sourceRef` to cite for it; its `sourceRef` instead
   quotes the live page directly. No fee amount is asserted, since none is
   published on either the form or the workflow page.
9. **Scoping: this schema covers only the manual, paper-form pathway.**
   `passport.mfa.gov.gh` (an online portal referenced by the issue) is
   login-gated for appointment booking and was not screened as an
   alternative submission channel this cycle; the manual form itself
   (this schema's subject) is confirmed unauthenticated and unaffected by
   that gate.

## Test run (Phase 4)

No live submission was attempted: Ghana's passport application is a
printed, hand-completed form submitted in person at a Passport Application
Center together with photographs, evidence of citizenship/identity, and
guarantor/witness signatures — not a portal accepting programmatic
submissions — and submitting fabricated identity data against a foreign
government's passport-issuing process is not a safe or reversible action,
the same reasoning already documented for this registry's other
passport/immigration schemas (e.g. `gh/gis`, `rw/dgie`, `bd/dip`).

Instead, two independent worked mock records were built from this
document's own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by `gh/gis` and
`rw/dgie`): compiles `schema.json`'s `fields[]` into a JSON Schema document
checked with `ajv` (+`ajv-formats` for `date`), plus a from-scratch
evaluator for `requiredWhen`/`documents[]` conditional requiredness (a
shared-`Condition`-grammar subset: `equals`/`notEquals`/`in`, `all`/`any`/
`not`).

```
$ node validate_instance.mjs registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json \
    conformance/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/first-time-applicant-married-both-parents-living.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS

$ node validate_instance.mjs registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json \
    conformance/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/previous-passport-lost-dual-citizenship-deceased-father.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS
```

The second fixture exercises three conditionals at once: `firstTimeApplicant:
false` (requiring `previousPassportNumber`/`previousPassportStatus: "lost"`,
which in turn requires the `missingPassportPoliceReport` document),
`hasDualCitizenship: true` (requiring `dualCitizenshipOtherCountry`), and
`fatherLiving: false` (requiring `fatherLastKnownAddress`).

**Mutation controls** — six negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'surname' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'surname'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-invalid-date-format.json: 'dateOfBirth' set to 'not-a-date'
Static (required/type/pattern/enum) validation: FAIL
 - /dateOfBirth must match format "date"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-invalid-enum-value.json: 'gender' set to 'Other' (not in enum)
Static (required/type/pattern/enum) validation: FAIL
 - /gender must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-maxlength-violation.json: 'surname' set to 60 characters (maxLength: 50)
Static (required/type/pattern/enum) validation: FAIL
 - /surname must NOT have more than 50 characters
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-requiredwhen-violation.json: 'previousPassportNumber'/'previousPassportStatus' removed while firstTimeApplicant: false
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'previousPassportNumber' is required by requiredWhen but missing
 - field 'previousPassportStatus' is required by requiredWhen but missing
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'applicationDeclaration' removed from documents[]
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'applicationDeclaration' is required but not marked provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and
pass clean:

```
$ node tools/validate.mjs registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json
ok   registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json
ok   registry/gh/mfa/application-for-a-republic-of-ghana-passport/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators was also run after adding this
document (406/406 passed) and `tools/govschema-client/registry-index.json`
was regenerated via `npm run build-index` (in `tools/govschema-client/`,
after `npm ci --include=dev` since a plain `npm ci` under a local
`NODE_ENV=production` skips `ajv`'s devDependency install) to include this
document's entry.

## Ghana's other open verticals

Ghana now stands at 4 of 6 verticals (National ID & Civic Documents,
Taxes, Visa, Passport). DMV and Business Formation remain open backlog for
future cycles.
