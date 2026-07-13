# Verification record — `gh/gis/grant-of-visa-and-permit-for-return-to-ghana` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`

This is GovSchema Standard Research cycle **GOV-2698**, opening **Ghana's
Visa vertical (1 of 6)** via the Ghana Immigration Service's (GIS)
"APPLICATION FORM FOR GRANT OF A VISA/PERMIT FOR RETURN TO GHANA." Ghana
itself opened as this registry's 41st jurisdiction via GOV-2510 (National
ID, `gh/nia/ghana-card-application-form-1a`). Sibling issues GOV-2696
(Passport) and GOV-2697 (Business Formation) were scouting/authoring
Ghana's other verticals in parallel this same cycle — this document does
not touch or claim credit for either.

## Scoping: Re-Entry Visa/Permit, NOT the first-time tourist e-Visa

This schema is scoped **strictly** to GIS's Re-Entry Visa/Permit pathway —
the service used by a person already resident in, or otherwise legally
connected to, Ghana (a foreign national holding a Ghanaian residence/work
permit, or a Ghanaian citizen/permit holder) who wants to travel abroad
temporarily and be guaranteed re-entry on return. This is independently
confirmed as a live, named GIS service:

- `https://gis.gov.gh/visas/` (re-fetched this cycle, HTTP 200) lists
  "Re-Entry Visa" among Ghana's visa categories and its own page copy
  reads: *"Re-entry permit is issued to visitors who desire to leave
  [Ghana] temporarily and return to the country."*

This schema does **NOT** cover Ghana's first-time tourist e-Visa. That
pathway was independently re-checked this cycle at
`https://evisa.immigration.gov.gh` (HTTP 200 — live, but an exclusively
online account/login-gated application wizard) and has no downloadable,
unauthenticated PDF/paper specimen of any kind. Nobody should read this
schema as describing the tourist e-Visa flow.

## Sources examined

### Source 1 — the PDF itself (`source.url`)

- **Discovery:** `https://gis.gov.gh/gis-forms/` (GIS's own public forms
  index, unauthenticated, HTTP 200, re-fetched this cycle) links directly
  to this specimen; the URL was re-derived from that live index page rather
  than trusted at face value from the issue's inherited string (which did
  turn out to match, but was independently re-confirmed, not assumed).
- **URL:** `https://gis.gov.gh/wp-content/uploads/2023/10/APPLICATION-FORM-FOR-GRANT-OF-A-VISA-and-PERMIT-FOR-RETURN-TO-GHANA.pdf`
- **Fetch:** direct `curl` (no login, no paywall): **HTTP 200**,
  `Content-Type: application/pdf`, **1,500,822 bytes**,
  `Last-Modified: Fri, 13 Jun 2025 11:12:54 GMT`,
  `sha256: 14bdb332f24b1fd172db3b851fa369b2235d9ba9710f58cbbc545b5f9fdc470b`.
- This is a genuine 2-page **scanned/rasterized** specimen: `pdfjs-dist`
  (legacy build, v6) `getAnnotations({intent:'display'})` returns **0**
  Widget annotations on both pages (0 AcroForm), and `getOperatorList()`
  shows each page's content stream consists of exactly one clipping path
  plus one `paintImageXObject` call over a single full-page image — no
  text-drawing operators, no other graphics. Byte-level inspection of the
  raw PDF confirms both page images are `/Filter [/DCTDecode]` (plain
  JPEG) XObjects: object 14 (page 1, 1652×2337, 1,360,539-byte stream) and
  object 22 (page 2, 1240×1753, 133,520-byte stream).

### Extraction/transcription method — a genuine rendering-pipeline failure, worked around

The established technique for a scanned/image-based PDF in this registry is
`pdfjs-dist` + `node-canvas` page rendering. That pipeline was attempted
here (both the plain `page.render()` path and the `NodeCanvasFactory` +
`Image`/`ImageData`/`Path2D` global-polyfill variant used successfully on
other scanned specimens in this repo) and **failed on this specimen** in
this environment: `page.render()` throws `TypeError: Image or Canvas
expected` from inside pdfjs-dist's internal `paintInlineImageXObject`
helper (which its `paintImageXObject` path delegates to for JPEG XObjects),
producing a blank white canvas rather than an error-terminated render.

Rather than accept a blank page or fabricate field content from the issue's
inherited description, the two embedded JPEG streams were extracted
directly from the raw PDF bytes: each image object's `stream`/`endstream`
markers were located and exactly `/Length` bytes were sliced out
byte-for-byte (verified as valid JPEGs via their `FF D8 FF E0` magic
bytes), producing two standalone `.jpg` files identical in content to what
the PDF's viewer would display. These were then read and transcribed
directly, item by item — a higher-fidelity result than a rasterized canvas
render would have produced in any case, since it is the original scan with
no re-encoding step.

## Field inventory and decomposition/scoping decisions

Page 1 carries exactly **14 numbered items**, a declaration statement, a
signature/thumbprint-and-date line, and an ATTACHMENTS section — matching
the issue's own rough description, independently re-confirmed by direct
transcription rather than assumed:

1. NAME (IN FULL) MR./MRS./MISS — split into `title` (enum) + `fullName`
   (string). The source prints exactly three honorific options
   (MR./MRS./MISS) directly before the name blank — a closed, bounded
   vocabulary the applicant selects among — modeled as its own `enum`
   field, following this registry's `za/dha/smart-id-card-application`
   precedent (an actual dropdown `title` field) rather than `ng/nis`'s
   sibling Visa schema precedent (which kept an equivalent prefix embedded
   in a free-text label, since that form's prefix had no separately
   identifiable closed set printed in the same position). This is a
   disclosed judgment call, not a fabricated field: the three options are
   printed verbatim on the specimen.
2. PREVIOUS NAME (IF ANY) → `previousName` (optional).
3. (a) NATIONALITY / (b) DATE & PLACE OF BIRTH → `nationality`,
   `dateOfBirth` + `placeOfBirth` (the combined (b) blank split into two
   machine fields).
4. (a) PASSPORT NO / (b) DATE & PLACE OF ISSUE / (c) DATE OF EXPIRY →
   `passportNumber`, `passportIssueDate` + `passportPlaceOfIssue` (again
   split from one combined blank), `passportExpiryDate`.
5. ADDRESS IN GHANA (IN FULL) / (a) POSTAL (OFFICE/BUSINESS) + TEL /
   (b) RESIDENTIAL (H/NO.) + TEL → `addressInGhana`,
   `postalAddressGhana`+`postalAddressGhanaTelephone`,
   `residentialAddressGhana`+`residentialAddressGhanaTelephone`. **Disclosed
   judgment call:** item 5's own header line carries its own dotted answer
   space, printed *before* and distinct from its own lettered (a)/(b)
   sub-items below it — unlike items 3, 4, and 8, whose lettered sub-parts
   begin immediately with no separate header blank of their own. This
   asymmetry (confirmed by re-cropping and re-reading the extracted page-1
   JPEG at native resolution around this item specifically) is read as
   evidence that the header line is a genuine, separate, fillable field
   (e.g. a general/legal Ghana address) rather than a cosmetic section
   title, and it is modeled accordingly as its own required field.
   `postalAddressGhana`/its telephone are modeled as optional (an applicant
   without an office/business has nothing to declare, mirroring `ng/nis`'s
   own optional "Office Address" precedent); `residentialAddressGhana` and
   its telephone are required.
6. ADDRESS OVERSEAS + TEL → `overseasAddress` (required),
   `overseasAddressTelephone` (optional — a telephone number is not always
   available at every applicant's overseas address).
7. EDUCATIONAL QUALIFICATIONS / OCCUPATION → `educationalQualifications`,
   `occupation`.
8. (a) HOW LONG RESIDENT IN GHANA / (b) DATE OF FIRST ARRIVAL / (c) DATE OF
   LATEST ARRIVAL → `yearsResidentInGhana`, `dateOfFirstArrival`,
   `dateOfLatestArrival`.
9. DESTINATION ABROAD (GIVE FULL ADDRESS) → `destinationAbroad`.
10. DATE OF DEPARTURE → `dateOfDeparture`.
11. OBJECT OF JOURNEY AND PROPOSED LENGTH OF STAY ABROAD →
    `objectOfJourneyAndLengthOfStay`, kept as **one** combined field since
    (unlike items 3/4/8) this item prints no (a)/(b) lettering of its own —
    the source itself does not split it into separately addressable
    sub-answers.
12. REASONS FOR WISHING TO RETURN TO GHANA (with "TO BE SUPPORTED BY
    DOCUMENTARY EVIDENCE" printed beneath it) → `reasonsForReturnToGhana`
    field plus a sibling `reasonsForReturnSupportingEvidence` document
    entry capturing that printed instruction.
13. MARITAL STATUS → `maritalStatus`, modeled as **free text**. The source
    prints no enumerated option list anywhere for this item — unlike
    `ng/nis`'s sibling Visa schema, whose `maritalStatus` enum was taken
    from a second, corroborating edition's explicit spelled-out option
    list (`single`/`married`/`widowed`/`divorced`). No such second edition
    or spelled-out list exists for this Ghana specimen, so inventing an
    enum boundary here would not be source-faithful.
14. NAME OF SPOUSE / NATIONALITY → `spouseName`, `spouseNationality`, both
    optional and explicitly **not** machine-gated on `maritalStatus` (which
    is free text with no reliable machine match against a "married" value)
    — disclosed rather than silently assumed safe.

Declaration + signature/thumbprint/date line → `signatureDate` (field) +
`applicantDeclaration` (a `documents[]` attestation entry quoting the
verbatim declaration text, matching this registry's `ng/nis` precedent of
modeling a signature line's date as a field and the wet-ink mark/statement
itself as an attestation document, not a data field).

ATTACHMENTS section (page 1, one item only: "TWO (2) CURRENT PASSPORT SIZE
PHOTOGRAPHS") → `applicantPhotographs` document entry. The blank
ruled box in the form's top-right margin (visible on the extracted page-1
JPEG) is the box provided for affixing one of the two required photographs,
cited in the same `sourceRef`.

**No passport-surrender/passport-copy attachment is modeled**: unlike
several other jurisdictions' Visa forms in this registry (e.g. `ng/nis`'s
explicit "Please attach original passport" instruction), this specimen's
own ATTACHMENTS section lists only the two photographs — no passport-copy
or passport-surrender instruction is printed anywhere on page 1, so none is
invented here, even though passport particulars are collected in item 4.

## Excluded: page 2, "FOR OFFICIAL USE ONLY"

Page 2 is headed **"FOR OFFICIAL USE ONLY"** and carries exactly four
GIS-staff/cashier fields, none of them applicant-facing:

- "Fee paid: C........" (a cedi amount, left blank on the specimen — no
  fee schedule is printed anywhere on either page for the applicant to
  read in advance)
- "Receipt No. ........"
- "Signature of Cashier ........"
- "STAMP" (an office-stamp impression area)

These are **deliberately excluded** from `fields[]`/`documents[]`: they are
populated by GIS staff after submission, not supplied by the applicant, and
modeling them as applicant-facing fields would misrepresent who fills them
in. This exclusion mirrors this registry's established practice of
excluding staff/back-office-only blocks (e.g. Bangladesh's DIP visa form's
"Police Verification/Official Use" block, GOV-2677).

## Conformance run

Two valid mock fixtures were built against `schema.json` with a
purpose-written, disposable `validate_instance.mjs` script (not committed;
mirrors the pattern used by this jurisdiction's own
`gh/nia/ghana-card-application-form-1a` and `ng/nis`'s `validate_instance.mjs`
scripts): compiles `fields[]` into a JSON Schema draft 2020-12 document
checked with `ajv` + `ajv-formats` (for `date`), plus a from-scratch
evaluator for the shared Condition grammar, checked against a sibling
`documents: [<id>, ...]` array of provided document ids (this schema's
`documents[]` entries have no `requiredWhen`, so a plain provided-id array
is sufficient — the same fixture shape `gh/nia`'s own mutation-control
fixtures already use in this registry):

```
$ node validate_instance.mjs registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json \
    conformance/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/single-unmarried-returning-worker.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json \
    conformance/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/married-permit-holder-with-previous-name-and-spouse.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each a single deliberate
violation of the first valid fixture, each correctly raising **exactly 1
error**:

```
$ # mutation-control-missing-required-field.json: 'passportNumber' (required) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'passportNumber'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-telephone-pattern-violation.json: 'residentialAddressGhanaTelephone'
$ # set to "not-a-phone-number!!"
Static (required/type/pattern/enum) validation: FAIL
 - /residentialAddressGhanaTelephone must match pattern "^[0-9+()\- ]{5,30}$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-title-enum-violation.json: 'title' set to "dr" (not in the
$ # ["mr","mrs","miss"] enum)
Static (required/type/pattern/enum) validation: FAIL
 - /title must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json
ok   registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json
ok   registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/gh/gis/grant-of-visa-and-permit-for-return-to-ghana/1.0.0`
re-fetched every cited URL (the source PDF and the two scoping-disclosure
URLs, `gis.gov.gh/visas/` and `evisa.immigration.gov.gh`) and reported
**0 warnings, all clear**. `tools/govschema-client/registry-index.json` was
regenerated via `npm run build-index` (in `tools/govschema-client/`, after
`npm ci --include=dev` since a plain `npm ci` under a local
`NODE_ENV=production` skips `ajv`'s devDependency install) to include this
document's entry.

## Ghana's other verticals (disclosure, not this schema's claim)

Ghana now stands at **2 of 6 verticals** (National ID, Visa) as a direct
result of this issue. **DMV was screened this same cycle and confirmed a
dead end**: the Driver and Vehicle Licensing Authority (DVLA)'s public site
was rebuilt at some point after prior scouting passes and no longer hosts
its old downloadable licence/registration form PDFs — every path checked
this cycle either 404s or redirects into a JavaScript-rendered
account/portal flow with no static specimen. Passport and Business
Formation were being scouted/authored in parallel by sibling issues
GOV-2696 and GOV-2697 this same cycle; this document does not claim any
progress on either and defers to their own VERIFICATION.md records. Taxes
remains open, unscreened backlog for a future cycle.
