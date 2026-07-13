# Verification record — `gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`

This is a `GovSchema Standard Research` cycle (**GOV-2698**), continuing
Ghana's research thread from **GOV-2695** (the parent research issue), which
scouted all 5 of Ghana's remaining open verticals in parallel following
**GOV-2510**'s opening of Ghana as the registry's 41st jurisdiction (via
National ID & Civic Documents).

## Why this candidate

Ghana stood at 1 of 6 verticals (National ID & Civic Documents) entering this
cycle. GOV-2695's own research pass found the Ghana Immigration Service
(GIS)'s forms library at `gis.gov.gh/gis-forms/` — an unauthenticated HTML
index — linking directly to a downloadable "Application Form for Grant of a
Visa/Permit for Return to Ghana" PDF. This cycle authors the schema and
independently re-verifies the cited source rather than trusting the issue's
citation at face value.

## Source examined

- **Authority:** Ghana Immigration Service (GIS).
- **Document:** "APPLICATION FORM FOR GRANT OF A VISA/PERMIT FOR RETURN TO
  GHANA"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://gis.gov.gh/wp-content/uploads/2023/10/APPLICATION-FORM-FOR-GRANT-OF-A-VISA-and-PERMIT-FOR-RETURN-TO-GHANA.pdf>
- **File identity:** `sha256:14bdb332f24b1fd172db3b851fa369b2235d9ba9710f58cbbc545b5f9fdc470b`,
  1,500,822 bytes, `Content-Type: application/pdf`,
  `Last-Modified: Fri, 13 Jun 2025 11:12:54 GMT`. Byte count and hash match
  the GOV-2698 issue's own citation exactly.
- **Structure:** 2 pages. Page 1 carries the 14 numbered items plus an
  "ATTACHMENTS" note; page 2 is a "FOR OFFICIAL USE ONLY" block.
- **Retrieved / reviewed:** 2026-07-13

## Extraction method

`pdfjs-dist` (v4, legacy build) `page.getAnnotations()` confirms **0 `Widget`
annotations** on both pages, and `page.getTextContent()` confirms **0
extractable text items** on both pages — this is a genuinely **scanned**
specimen (a raster image embedded in the PDF, not a text or form layer), a
different tier from this registry's flat-but-text-extractable specimens
(e.g. `ng/nis`, `rw/dgie`).

With no text layer to extract, the page was rendered directly: a custom
`NodeCanvasFactory` (backed by `node-canvas`) was passed to
`page.render()` at 2.5x scale, producing a 1487×2105px PNG per page, which
was then read visually. Every numbered item was cross-checked with a
targeted crop (e.g. items 1–2, items 3–5, items 6–12, item 13's row
specifically) to rule out any small print missed at full-page zoom. No
hidden or overlapping text was found; the faint mirrored content visible on
page 2 is print bleed-through from page 1's ink, not a second layer of
genuine page-2 content.

## Field inventory

33 `fields[]` entries, referenced by item number:

| Item | Printed content | Schema field(s) |
|---|---|---|
| 1 | Name (in full) Mr./Mrs./Miss | `title`, `fullName` |
| 2 | Previous Name (if any) | `previousName` |
| 3(a) | Nationality | `nationality` |
| 3(b) | Date & Place of Birth | `dateOfBirth`, `placeOfBirth` |
| 4(a) | Passport No. | `passportNumber` |
| 4(b) | Date & Place of Issue | `passportIssueDate`, `passportPlaceOfIssue` |
| 4(c) | Date of Expiry | `passportExpiryDate` |
| 5 (header) | Address in Ghana (in full) | `addressInGhana` |
| 5(a) | Postal (Office/Business), Tel | `postalAddressGhana`, `postalTelephoneGhana` |
| 5(b) | Residential (H/No.), Tel | `residentialAddressGhana`, `residentialTelephoneGhana` |
| 6 | Address Overseas, Tel | `overseasAddress`, `overseasTelephone` |
| 7 | Educational Qualifications, Occupation | `educationalQualifications`, `occupation` |
| 8(a) | How long resident in Ghana | `residencyDurationGhana` |
| 8(b) | Date of first arrival | `dateOfFirstArrival` |
| 8(c) | Date of latest arrival | `dateOfLatestArrival` |
| 9 | Destination abroad (give full address) | `destinationAbroad` |
| 10 | Date of departure | `dateOfDeparture` |
| 11 | Object of journey and proposed length of stay abroad | `objectOfJourneyAndProposedStay` |
| 12 | Reasons for wishing to return to Ghana (to be supported by documentary evidence) | `reasonsForReturn` (+ `reasonsForReturnEvidence` document) |
| 13 | Marital Status | `maritalStatus` |
| 14 | Name of Spouse, Nationality | `spouseName`, `spouseNationality` |
| (declaration) | Date, beside the signature/thumbprint line | `signatureDate` |

`documents[]` (3 entries):

- `applicantPhotographs` — the empty, uncaptioned photo-affixing box printed
  on page 1's top-right, read together with the "ATTACHMENTS: 1. TWO (2)
  CURRENT PASSPORT SIZE PHOTOGRAPHS" note as the same requirement.
- `reasonsForReturnEvidence` — item 12's own printed instruction "(TO BE
  SUPPORTED BY DOCUMENTARY EVIDENCE)".
- `applicationDeclaration` — the solemn-declaration statement printed
  immediately above the signature/thumbprint line, quoted verbatim.

The page-2 "FOR OFFICIAL USE ONLY" block (Fee paid, Receipt No., Signature
of Cashier, Stamp) is excluded as staff-populated, consistent with this
registry's established convention (cf. `gh/nia`'s excluded MRW
Number/Registration Centre Number/Interviewer NID No. widgets). No raw
signature/thumbprint capture field is modelled, for the same reason.

## Access notes and judgment calls

1. **Item 5 carries its own header-level blank before its lettered
   sub-items, unlike items 3 and 4.** Items 3 ("(a) Nationality... (b)
   Date & Place of Birth...") and 4 ("(a) Passport No... (b)... (c)...")
   go straight from the item number into lettered parts with no preceding
   header blank. Item 5 uniquely prints "ADDRESS IN GHANA (IN FULL)..."
   with its own dotted blank *before* "(a) POSTAL..." and "(b)
   RESIDENTIAL...". This schema treats that header blank as a genuine,
   separate general-address field (`addressInGhana`), rather than silently
   discarding it as decorative — it is a real structural difference from
   items 3/4, not an extraction artifact.
2. **`maritalStatus` is modelled as free text, not an enum.** A targeted
   crop of item 13's row (`crop-marital.png` during this session) confirms
   the specimen prints only a bare dotted blank — "13. MARITAL
   STATUS........................." — with no enumerated options anywhere
   on either page. This is a deliberate departure from this registry's
   other `maritalStatus` fields (e.g. `ng/nis`, `ng/nimc`), which are
   modelled as enums because their own specimen (or a corroborating
   edition) prints explicit options; no such corroborating edition was
   found for this form.
3. **`spouseName`/`spouseNationality` (item 14) are not `requiredWhen`-gated
   on `maritalStatus`.** Since `maritalStatus` is free text with no
   reliable machine match against "married", gating would require
   inventing a pattern match this specimen's own text does not support.
   The conditional relationship is documented in each field's
   `description` only, matching this registry's established
   free-text-gated-conditional practice (cf. `ng/nis`'s
   `employmentEmployerName`).
4. **`postalAddressGhana`/`postalTelephoneGhana` (item 5(a)) are optional;
   `residentialAddressGhana`/`residentialTelephoneGhana` (item 5(b)) are
   required.** An applicant without an office or business has nothing to
   declare in 5(a), matching this registry's `officeAddress`-is-optional /
   `residentialAddress`-is-required convention (cf. `ng/nis`).
5. **`overseasAddress`/`overseasTelephone` (item 6) and
   `destinationAbroad` (item 9) are modelled as two distinct required
   fields**, even though both concern an address abroad. The specimen
   prints them as two separate numbered items with no cross-reference
   between them, and this schema does not assume they are always
   identical (an applicant may maintain an overseas residence distinct
   from a specific trip's destination) — faithfully kept separate per
   this standard's source-of-truth-fidelity principle.
6. **Items 9, 11, and 12 each print a multi-line ruled blank** (one
   continuation line for item 9, one for item 11, two for item 12) with no
   separate lettering or numbering. Each is modelled as a single free-text
   field with a `maxLength` sized to the visible ruled space, not as
   separate fields — consistent with how a single free-text answer
   spanning multiple ruled lines is modelled elsewhere in this registry.
7. **`applicantPhotographs` reconciles two printed cues to the same
   requirement**: the empty, uncaptioned box on page 1 (which a completed
   specimen would show a photo affixed to) and the page-1 "ATTACHMENTS"
   note requiring two passport-size photographs. Neither is modelled as a
   second, independent document, since the specimen gives no indication
   these are two different photographs beyond the same two-photograph
   requirement.
8. **Scoping: this is GIS's Re-Entry Visa/Permit pathway, not the
   first-time tourist e-Visa.** A fresh check of `gis.gov.gh/visas/`
   confirms this specimen corresponds to the site's listed "Re-Entry Visa"
   service (obtained before departure so a Ghana resident may re-enter on
   return), distinct from the first-time tourist e-Visa, which remains a
   login-gated online application portal with no downloadable blank
   specimen found at any tier this cycle. This scoping is disclosed here
   and in `schema.json`'s `description` rather than silently conflating
   the two pathways, matching this registry's `rw/dgie` and `uy/mrree`
   visa-scoping precedent.

## Test run (Phase 4)

No live submission was attempted: Ghana's Re-Entry Visa/Permit channel is a
printed, hand-completed application submitted in person or via a Ghanaian
diplomatic mission together with photographs and supporting documentary
evidence, not a portal accepting programmatic submissions, and submitting
fabricated identity data against a foreign government's immigration process
is not a safe or reversible action — the same reasoning already documented
for this registry's other consular/immigration schemas (e.g.
`rw/dgie/visa-application`, `ng/nis/application-for-visa-entry-permit`).

Instead, two independent worked mock records were built from this
document's own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by `rw/dgie` and
`ng/nis`): compiles `schema.json`'s `fields[]` into a JSON Schema document
checked with `ajv` (+`ajv-formats` for `date`), plus a from-scratch
evaluator for `requiredWhen`/`documents[]` conditional requiredness.

```
$ node validate_instance.mjs registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json \
    conformance/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/married-applicant-with-spouse.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json \
    conformance/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/single-applicant-no-office-address.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — five negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'passportNumber' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'passportNumber'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-invalid-date-format.json: 'dateOfBirth' set to 'not-a-date'
Static (required/type/pattern/enum) validation: FAIL
 - /dateOfBirth must match format "date"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-invalid-enum-value.json: 'title' set to 'dr' (not in enum)
Static (required/type/pattern/enum) validation: FAIL
 - /title must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-maxlength-violation.json: 'fullName' set to 250 characters (maxLength: 200)
Static (required/type/pattern/enum) validation: FAIL
 - /fullName must NOT have more than 200 characters
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'applicantPhotographs' removed from documents[]
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'applicantPhotographs' is required but not marked provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json
ok   registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json
ok   registry/gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators was also run after adding this
document, and `tools/govschema-client/registry-index.json` was regenerated
via `npm run build-index` (in `tools/govschema-client/`, after `npm ci
--include=dev` since a plain `npm ci` under a local `NODE_ENV=production`
skips `ajv`'s devDependency install) to include this document's entry.

## Ghana's other open verticals

Ghana now stands at 2 of 6 verticals (National ID & Civic Documents, Visa).
GOV-2695's parallel scouting pass found candidates in Passport, DMV, Business
Formation, and Taxes as open backlog for future cycles.
