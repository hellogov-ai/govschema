# Verification record — `rw/dgie/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2544**), resolving the
open, unresolved Visa candidate GOV-2526 left as backlog when Rwanda opened
this registry's 43rd jurisdiction via its DMV vertical.

## Why this candidate

Rwanda stood at 1 of 6 verticals (DMV) entering this cycle. GOV-2526's own
research pass had found two candidate PDFs for Visa (a Rwandan-embassy-in-UK
mirror and an RDB-hosted "Proposed New visa application form") but left both
unverified for AcroForm field content and disclosed Visa as an **open,
unresolved candidate** rather than a confirmed live source, since DGIE's own
current guidance elsewhere points at the IremboGov online portal. This cycle
resolves that open item.

## Sources examined

### Source 1 (primary `source`, Rwandan Embassy in the UK mirror)

- **Authority:** Directorate General of Immigration and Emigration (DGIE),
  under the National Intelligence and Security Service (printed on the form
  itself).
- **Document:** "VISA APPLICATION"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.rwandainuk.gov.rw/fileadmin/user_upload/UK_user_upload/Documents/visa_permit_application_form_pdf.pdf>
- **File identity:** `sha256:01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0`,
  233,226 bytes, `Last-Modified: Mon, 22 Mar 2021 15:05:52 GMT`.
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (independent mirror, Rwandan Embassy in the USA)

- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.rwandainusa.gov.rw/index.php?eID=dumpFile&t=f&f=105216&token=7a561cb3a8fb3e918c39dcc8d01ec1f183c7c270>
- **File identity:** confirmed **byte-identical** to Source 1 —
  `sha256:01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0`,
  233,226 bytes — despite a materially different `Last-Modified: Tue, 03 Sep
  2024 17:26:00 GMT`. Both this schema's cited sha256 and the byte count
  match the GOV-2544 issue's own citation exactly, independently re-derived
  rather than trusted; the two mirrors' differing `Last-Modified` headers
  (2021 vs. 2024) despite identical content indicates independent
  re-uploads of the same file at different embassies over time, not a stale
  single copy — corroborating (not merely repeating) the issue's claim that
  this is DGIE's one current standard specimen distributed to its missions.

### Currency check (not a form source — confirms the issuance channel)

- **URL:** <https://www.migration.gov.rw/visa/visitors-visa/>
- **Finding:** the page's own printed text names "the office of a diplomatic
  mission of Rwanda in the applicant's country of residence" as a current
  issuance channel — alongside the border post, IremboGov online portal, and
  the DGIE office itself — for the Holiday/Tourist (V1), Job Search (V4), and
  Business Survey (V6) visa categories, confirming the embassy/consulate
  channel this specimen serves remains live, not superseded by an
  online-only requirement.
- **Retrieved / reviewed:** 2026-07-12

## Extraction method

`pdfjs-dist` (legacy build, v3, `require`'d via `createRequire`) was used for
both `page.getAnnotations()` (confirming **0 `Widget` annotations on both of
the specimen's 2 pages** — a flat, print-and-hand-fill form, unlike
`rw/rra/vrf-e06-motor-vehicle-registration-form`'s genuine AcroForm/XFA) and
`page.getTextContent()` (position-sorted by `item.transform[4]`/`[5]` for
x/y) to read the form's full printed text directly. With 0 widgets, there
are no digital field names to cross-check labels against (unlike a genuine
AcroForm specimen); every field in this schema is derived directly from the
form's own printed numbering (27 numbered items, 1-27) and row/column
position, read verbatim from the extracted text layer.

## Field inventory

All 27 numbered items were accounted for exactly once. 48 `fields[]` entries
were derived — more than 27 because several numbered items print two or more
side-by-side blanks on one row:

| Source item | Printed content | Schema field(s) |
|---|---|---|
| header | "Visa applied for: Transit / Tourist / Visitor's-Resident – Permanent" / "Length of stay:" | `visaTypeApplied`, `lengthOfStay` |
| 1 | Given name(s) | `givenNames` |
| 2 | Family name(s) | `familyNames` |
| 3 | Other name(s) | `otherNames` |
| 4 | Gender (tick box) | `gender` |
| 5 | Date of Birth | `dateOfBirth` |
| 6 | Place of Birth — District / Country | `placeOfBirthDistrict`, `placeOfBirthCountry` |
| 7 | Nationality of Birth | `nationalityOfBirth` |
| 8 | E-mail contact | `emailContact` |
| 9 | Local Telephone contact | `localTelephoneContact` |
| 10 | Passport No | `passportNumber` |
| 11 | Nationality of passport | `passportNationality` |
| 12 | Date of Issue of passport | `passportIssueDate` |
| 13 | Expiry date of passport | `passportExpiryDate` |
| 14 | Profession / Occupation | `profession`, `occupation` |
| 15 | Employer | `employer` |
| 16 | Father's name / mother's name | `fatherName`, `motherName` |
| 17 | Father's nationality / mother's nationality | `fatherNationality`, `motherNationality` |
| 18 | Parent's address | `parentsAddress` |
| 19 | Marital Status (tick box) | `maritalStatus` |
| 20 | Name of spouse / Spouse's nationality | `spouseName`, `spouseNationality` |
| 21 | Born at ___ on [date] (spouse) | `spouseBirthPlace`, `spouseBirthDate` |
| 22 | Present address of spouse | `spousePresentAddress` |
| 23 | Former visits or stay in Rwanda, and time of stay | `priorVisitsRwanda` |
| 24 | Former stays in Africa, places, and dates | `priorStaysAfrica` |
| 25 | Reason for visa application | `reasonForVisaApplication` |
| 26 | Proposed persons to be visited and their address | `personsToBeVisitedAndAddress` |
| 27 | Persons accompanying (children) — 2x2 table | `child1Name`/`child1Gender`/`child1DateOfBirth` .. `child4Name`/`child4Gender`/`child4DateOfBirth` |
| (unwidgeted signature line) | "Done at, ___ on [date]" | `signingPlace`, `signingDate` |

`documents[]` (2 entries):

- `applicantPhoto` — the "COLOURED PHOTO" box printed in the right margin of
  page 1, modelled as `supporting-evidence`, matching this registry's
  `pe/cancilleria/solicitud-visa-dgc-005` convention for a visa-form photo
  requirement.
- `applicationCertification` — "I hereby certify that all information is
  complete and correct", printed beside the signature line (which has no
  corresponding fillable widget, consistent with this being a flat form
  entirely), modelled as an `attestation` quoting the statement verbatim.

The final printed section ("Do not write below this line, for official use
only") is excluded as an office-only block, with no printed content of its
own on this specimen beyond that instruction line.

## Access notes and judgment calls

1. **`visaTypeApplied` is modelled as free text, not an enum.** The header
   line prints no "put a tick (√) in the relevant box" instruction (unlike
   items 4 and 19), and the printed punctuation
   ("Transit / Tourist / Visitor's-Resident – Permanent") does not resolve
   unambiguously into a fixed category list — "Visitor's-Resident" reads
   ambiguously as either one hyphenated category or two run together.
   Rather than invent an enum boundary, this is modelled as free text,
   consistent with this registry's established practice of not inventing
   enumerated values a source does not clearly print (cf. `uy/mrree`'s
   `estadoCivil` judgment call).
2. **Item 14 ("Profession" / "Occupation") is split into two fields.** Both
   labels are printed on the same numbered row with their own blank; rather
   than treat one as a duplicate or synonym of the other, both are modelled
   independently since the form itself distinguishes them.
3. **Items 16-17-20-21-22 (parents' and spouse's particulars) are each split
   into their printed side-by-side blanks** (father's/mother's name and
   nationality; spouse's name/nationality/birth place/birth date/address),
   matching this registry's general convention of one schema field per
   distinct printed blank rather than one field per printed row number.
4. **`spouseName`, `spouseNationality`, `spouseBirthPlace`, `spouseBirthDate`,
   and `spousePresentAddress` are `required: false`, each gated
   `requiredWhen: { field: "maritalStatus", equals: "married" }`.** Safe to
   gate this way because `maritalStatus` is itself `required: true` (always
   present in a conforming submission, per this registry's ph/bi, ph/dfa,
   ph/lto, and us/uscis precedent for the identical spouse-conditional
   pattern) — unlike gating on an optional sibling field that can itself be
   absent (see judgment call 5).
5. **`child1Gender`/`child1DateOfBirth` through `child4Gender`/
   `child4DateOfBirth` are NOT machine-gated with `requiredWhen` against
   their sibling `childNName` fields**, even though they are logically
   conditional on a child slot being used. `childNName` is itself optional
   and genuinely absent (not empty-string) for an applicant travelling
   without children, and gating a conditional field on `notEquals: ""`
   against an optionally-absent sibling is a misfire class this registry has
   hit and fixed before (`notequals-empty-string-absent-field-bug`, e.g.
   `nl/denhaag`'s symmetric election-types judgment call, `kr/nts`,
   `ar/dnrpa`). The human-facing constraint is documented in each field's
   `description` only, not machine-checked.
6. **Item 27's children table is a bounded 2x2 printed grid (4 slots), not
   an open-ended list**, flattened to `child1`..`child4`, matching this
   registry's `fi/migri` bounded-repeating-group convention (GovSchema's
   flat field model has no array/nested-object field type for repeating
   groups).
7. **Item 21 ("Born at ___ on ___") is modelled as the spouse's own birth
   place/date**, inferred from its position directly continuing item 20's
   "Name of spouse / Spouse's nationality" row, and preceding item 22's
   "Present address of spouse" — the whole 20-21-22 block reads as one
   contiguous spouse-particulars section. There is no independent numbered
   item for the applicant's own place/date of birth beyond items 5/6, which
   are already captured.
8. **`priorVisitsRwanda` and `priorStaysAfrica` are `required: false`.** A
   first-time applicant genuinely has none to declare and the form provides
   no separate "none" checkbox, matching this registry's `uy/mrree`
   `visasAnteriores` precedent for an analogous "previous visits" question.
9. **`personsToBeVisitedAndAddress` is `required: true`.** Modelled as
   potentially citing a hotel or tour operator for an applicant with no
   personal host, per this registry's `uy/mrree` `referenciaUruguay`
   precedent for an analogous in-country-reference field, rather than
   treating it as inapplicable to pure tourism.
10. **`emailContact` uses a `pattern` regex, not `format: "email"`** — the
    latter is not a permitted `validation` keyword under spec v0.3's
    `nonFileValidation` definition (only `pattern`/`minLength`/`maxLength`/
    `minimum`/`maximum`/`enum`); caught by `tools/validate-ajv.mjs` during
    this cycle's own validation run and fixed before commit, using the same
    pattern already established by `ae/rta/vehicle-registration-renewal`.

## Test run (Phase 4)

No live submission was attempted: Rwanda's diplomatic-mission visa channel
is a printed, signed, in-person/mailed application to a specific embassy or
consulate, not a portal accepting programmatic submissions, and submitting
fabricated identity data against a foreign government's consular/immigration
process is not a safe or reversible action — the same reasoning already
documented for this registry's other consular/immigration schemas (e.g.
`uy/mrree/formulario-unificado-de-visas`, `pe/cancilleria/solicitud-visa-dgc-005`).

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by `uy/mrree` and
`it/agenzia-entrate/modello-730`): compiles `schema.json`'s `fields[]` into a
JSON Schema document checked with `ajv` (+`ajv-formats` for `date`), plus a
from-scratch evaluator for `requiredWhen`/`documents[]` conditional
requiredness.

```
$ node validate_instance.mjs registry/rw/dgie/visa-application/1.0.0/schema.json \
    conformance/rw/dgie/visa-application/1.0.0/tourist-visa-single-first-time-applicant.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/rw/dgie/visa-application/1.0.0/schema.json \
    conformance/rw/dgie/visa-application/1.0.0/business-visa-married-with-children.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — four negative fixtures, each targeting a distinct
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

$ # mutation-control-invalid-enum-value.json: 'maritalStatus' set to 'engaged' (not in enum)
Static (required/type/pattern/enum) validation: FAIL
 - /maritalStatus must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-spouse-field.json: married applicant, 'spouseName' removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'spouseName' is required (requiredWhen matched) but not provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/rw/dgie/visa-application/1.0.0/schema.json
ok   registry/rw/dgie/visa-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/rw/dgie/visa-application/1.0.0/schema.json
ok   registry/rw/dgie/visa-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (383/383 documents) also passed
clean, and `tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` (in `tools/govschema-client/`, after `npm ci
--include=dev` since a plain `npm ci` under a local `NODE_ENV=production`
skips `ajv`'s devDependency install) to include this document's entry.

## Rwanda's other open verticals

Business Formation, National ID, Passport, and Taxes remain confirmed dead
ends per GOV-2526's own research pass (all routing exclusively through the
login/payment-gated IremboGov one-stop portal or in-person-only processes).
Rwanda now stands at 2 of 6 verticals (DMV, Visa).
