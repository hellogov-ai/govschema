# Verification record — `rw/dgie/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2544**, a child of
**GOV-2542**), a general research-analyst brief covering DMV, Business
Formation, Visa, Passport, Taxes, and National ID & Civic Documents across
all jurisdictions. This cycle resolves **Rwanda's Visa vertical (2 of 6)**;
Rwanda's DMV vertical already exists in this registry at
`rw/rra/vrf-e06-motor-vehicle-registration-form` (GOV-2526).

## Why this candidate

The brief handed a specific, already-scouted candidate: DGIE's "Visa
Application" form, published by Rwanda's own diplomatic missions in the UK
and USA, reported reachable, unauthenticated, byte-identical across both
mirrors, and a flat (non-AcroForm) specimen. This cycle re-verified that
report from scratch rather than trusting it.

## Sources examined

### Source 1 (primary `source`, Rwandan embassy in the UK)

- **Authority:** Directorate General of Immigration and Emigration (DGIE),
  an agency of Rwanda's National Intelligence and Security Service (NISS).
- **Document:** "Visa Application" form (Republic of Rwanda / National
  Intelligence and Security Service / Directorate General of Immigration
  and Emigration), 2-page flat PDF.
- **URL (directly retrieved via `curl`, HTTP 200, no login/CAPTCHA/WAF):**
  <https://www.rwandainuk.gov.rw/fileadmin/user_upload/UK_user_upload/Documents/visa_permit_application_form_pdf.pdf>
- **File identity:** `sha256:01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0`,
  233,226 bytes, retrieved 2026-07-12. `Last-Modified: Mon, 22 Mar 2021
  15:05:52 GMT`.

### Source 2 (cross-mirror corroboration, Rwandan embassy in the USA)

- **URL (directly retrieved via `curl`, HTTP 200):**
  <https://www.rwandainusa.gov.rw/fileadmin/user_upload/USA_user_uploads/visa_form.pdf>
- **File identity:** identical sha256 and byte size to Source 1
  (`01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0`,
  233,226 bytes), retrieved 2026-07-12. `Last-Modified: Tue, 03 Sep 2024
  17:26:00 GMT` (a later re-publish date than Source 1, but byte-for-byte
  the same document — corroborating that this is a stable, still-current
  specimen rather than a stale one-off mirror). Independently re-derived
  this cycle by fetching both URLs and diffing sha256 hashes, not copied
  from the brief.

### Structural analysis (both mirrors, identical since byte-identical)

- **`grep -a -c "/AcroForm"` and `grep -a -c "/Widget"` both return `0`** —
  confirmed independently this cycle. This is a flat, print-and-hand-fill
  specimen, not a genuine AcroForm.
- **`pdfjs-dist` (legacy build) `page.getAnnotations()`** independently
  confirms `0` annotations on both of the document's 2 pages.
- **Extraction method:** `pdfjs-dist` `getTextContent()` (text items plus
  x/y transform coordinates) for the full printed text of both pages, plus
  `getOperatorList()` (rectangle/path `constructPath` drawing operators, with
  their bounding boxes) to distinguish printed tick-box checkbox widgets
  (small, ~33×14pt rectangles, e.g. beside "Male"/"Female" and beside each
  Marital Status option) from ordinary text-fill blank-line rectangles
  (much wider, ~150-200pt, one per free-text answer box) — see judgment
  call 1 below for how this distinction resolved the top line's ambiguity.
  A full-page canvas render was attempted via `pdfjs-dist` + `node-canvas`
  but failed on an embedded inline image object unrelated to the form's own
  layout; the operator-list rectangle inventory was sufficient to resolve
  every ambiguity without it.

### Source 3 (migration.gov.rw — currency check)

- **URL:** <https://www.migration.gov.rw/visa/visitors-visa>
- Quote: "The visitors visa is issued upon arrival at the border post,
  online, at immigration and emigration office, at the office of a
  diplomatic mission of Rwanda in the applicant's country of residence or
  at any other place as may be determined by the Directorate General."
- This is the **load-bearing currency check**: it confirms the
  diplomatic-mission/embassy issuance channel — the channel this specimen
  serves — is still one of DGIE's current, live visa-issuance channels
  today, even though much of Rwanda's Visa vertical (and all five of
  Rwanda's other verticals) routes through the IremboGov one-stop online
  portal. Without this quote, an embassy-published 2021/2024-relisted PDF
  would be a plausible dead-end candidate (superseded by an online-only
  channel); with it, the embassy channel is confirmed to remain a genuine,
  parallel issuance path DGIE itself still names.

### Source 4 (web search — legal basis)

- **Law N°57/2018 of 13/08/2018 on Immigration and Emigration in Rwanda**
  (published at `migration.gov.rw/laws`; full text also mirrored at
  rwandalii.org) is DGIE's primary governing statute.
- **Ministerial Order N°06/01 of 29/05/2019 relating to Immigration and
  Emigration** is the implementing ministerial order, also published at
  `migration.gov.rw/laws`.
- These were not independently re-fetched in full for a clause-by-clause
  reading (this schema does not depend on any specific clause of either
  instrument beyond confirming DGIE's basic statutory authority to
  administer visas); cited here as the agency's own published legal basis,
  not fabricated.

## Field inventory (Phase 3)

All 27 printed numbered items were recovered, plus the top line
("Visa applied for" / "Length of stay"). Several items print two boxes
under one number (item 6: District/Country; items 16-17: father's/mother's
name and nationality) and are modelled as two schema fields each.

| Field (schema `name`) | Label (source) | Item | Example valid value |
|---|---|---|---|
| `visaTypeApplied` | Visa applied for | top line | `"tourist"` |
| `lengthOfStay` | Length of stay | top line | `"30 days"` |
| `givenNames` | Given name(s) | 1 | `"Amina"` |
| `familyNames` | Family name(s) | 2 | `"Njoroge"` |
| `otherNames` | Other name(s) | 3 | `""` |
| `gender` | Gender | 4 | `"female"` |
| `dateOfBirth` | Date of Birth | 5 | `"1994-05-12"` |
| `placeOfBirthDistrict` | Place of Birth: District | 6 | `"Westlands"` |
| `placeOfBirthCountry` | Place of Birth: Country | 6 | `"Kenya"` |
| `nationalityOfBirth` | Nationality of Birth | 7 | `"Kenyan"` |
| `emailContact` | E-mail contact | 8 | `"amina@example.com"` |
| `localTelephoneContact` | Local Telephone contact | 9 | `"+250 788 123 456"` |
| `passportNo` | Passport No | 10 | `"A1234567"` |
| `nationalityOfPassport` | Nationality of passport | 11 | `"Kenyan"` |
| `passportIssueDate` | Date of Issue of passport | 12 | `"2022-03-01"` |
| `passportExpiryDate` | Expiry date of passport | 13 | `"2032-02-28"` |
| `professionOccupation` | Profession / Occupation | 14 | `"Marketing Consultant"` |
| `employer` | Employer | 15 | `"Savannah Consulting Ltd"` |
| `fatherName` | Father's name | 16 | `"Joseph Njoroge"` |
| `motherName` | mother's name | 16 | `"Grace Njoroge"` |
| `fatherNationality` | Father's nationality | 17 | `"Kenyan"` |
| `motherNationality` | mother's nationality | 17 | `"Kenyan"` |
| `parentsAddress` | Parent's address | 18 | `"45 Riverside Drive, Nairobi"` |
| `maritalStatus` | Marital Status | 19 | `"never_married_single"` |
| `spouseName` | Name of spouse | 20 | `"Juliana Mendes"` |
| `spouseNationality` | Spouse's nationality | 20 | `"Brazilian"` |
| `spouseBornAtPlace` | Born at | 21 | `"Belem, Brazil"` |
| `spouseBornDate` | on (Day/Month/Year) | 21 | `"1987-02-20"` |
| `spousePresentAddress` | Present address of spouse | 22 | `"Rua das Palmeiras 120..."` |
| `formerVisitsRwanda` | Former visits or stay in Rwanda | 23 | `""` |
| `formerStaysAfrica` | Former stays in Africa | 24 | `"Uganda, 2023"` |
| `reasonForVisaApplication` | Reason for visa application | 25 | `"Tourism"` |
| `proposedPersonsToVisit` | Proposed persons to be visited | 26 | `"N/A — independent travel"` |
| `child1Name`/`child1Gender`/`child1DateOfBirth` | Persons accompanying (children), slot 1 | 27 | `"Beatriz Mendes"` / `"female"` / `"2015-09-09"` |
| `child2Name`/`child2Gender`/`child2DateOfBirth` | slot 2 | 27 | `"Rafael Mendes"` / `"male"` / `"2018-01-22"` |
| `child3Name`/`child3Gender`/`child3DateOfBirth` | slot 3 | 27 | (unused in fixtures) |
| `child4Name`/`child4Gender`/`child4DateOfBirth` | slot 4 | 27 | (unused in fixtures) |

Excluded from `fields[]`: the Signature line and the printed
"Do not write below this line, for official use only" office-use footer
(office block, not applicant-facing data).

`documents[]` (2 entries):
- `colouredPhoto` (`supporting-evidence`, required, `belongsTo: applicant`)
  — the printed "COLOURED PHOTO" box on Page 1.
- `certificationStatement` (`attestation`, required) — the printed
  certification statement above the Signature line: "I hereby certify that
  all information is complete and correct."

## Access notes and judgment calls

1. **Top line ("Visa applied for: Transit / Tourist / Visitor's-Resident
   –Permanent") modelled as an `enum`, not free text — and its punctuation
   preserved verbatim rather than reinterpreted.** This line has no
   accompanying tick-box widgets and no "put a tick" instruction, unlike
   items 4 (Gender) and 19 (Marital Status), which both explicitly print
   "put a tick (√) in the relevant box" plus small (~33×14pt) checkbox
   rectangles confirmed via `getOperatorList()`. The rectangle nearest the
   top line (x:427.5-485.8, y:573.7-590.3, ~58×17pt) is shaped like this
   form's ordinary text-fill blank lines, not a checkbox, and sits after
   "Length of stay:" — i.e. it is the length-of-stay answer blank, not a
   visa-type checkbox. So strictly by the printed widget evidence, an
   applicant would circle or underline their chosen visa type rather than
   tick a box. Despite that absence, this schema still models
   `visaTypeApplied` as an `enum` rather than free text, since the printed
   line unambiguously enumerates a closed 3-item list — but this is
   disclosed as a judgment call rather than a widget-confirmed enum, unlike
   `gender`/`maritalStatus`. Separately, the line's own punctuation is odd:
   "Visitor's-Resident –Permanent" could plausibly be intended as three
   further separate categories (Visitor, Resident, Permanent) rather than
   one compound category, mirroring the kind of visa/permit-status
   nomenclature Rwanda uses elsewhere; but the source's own printed
   punctuation does not clearly separate them with a slash the way
   "Transit / Tourist" is separated, so this schema conservatively
   preserves it as a single third value, `visitors_resident_permanent`,
   rather than inventing a 3-way split the source doesn't itself print.
2. **Contact fields (`emailContact`, `localTelephoneContact`) both modelled
   as optional**, unlike e.g. `uy/dgi`'s "at least one of fijo/móvil"
   pattern — this form prints no equivalent "at least one of" instruction
   for email/phone, so there is no textual basis for requiring either one.
   Disclosed rather than fabricating a requirement the source doesn't
   state.
3. **Spousal block (items 20-22) fully gated via `requiredWhen` on
   `maritalStatus` equalling `"married"`, not left half-modelled.** Per the
   lesson from a prior cycle's KE/KRA IT1 review (GOV-2539 follow-up):
   don't leave a spousal pathway dangling. Here, `spouseName`,
   `spouseNationality`, `spouseBornAtPlace`, `spouseBornDate`, and
   `spousePresentAddress` are all `requiredWhen: { field: "maritalStatus",
   equals: "married" }`, and are absent/optional for every other marital
   status. The mutation-control fixture
   `mutation-control-missing-conditional-spouse-field.json` exercises this
   exact gate (married applicant, `spouseName` dropped → exactly 1 required
   error).
4. **Item 27 (Persons accompanying (children)) bounded to the form's own
   printed 4 slots, no invented 5th-slot escape hatch.** The form itself
   prints exactly 4 named child slots ("1. Name" … "4. Name") with no
   companion-form reference for a 5th+ accompanying child anywhere on
   either page. This schema models `child1Name`/`child1Gender`/
   `child1DateOfBirth` through `child4*` and stops there — a disclosed,
   printed bound, not a silent gap.
5. **Each child slot's 3 fields (name/gender/date-of-birth) are modelled as
   independently optional**, rather than `requiredWhen`-gating gender/DOB
   on the child's name being present. This registry has a documented
   anti-pattern (`notequals-empty-string-absent-field-bug`) against gating
   `requiredWhen` on `notEquals ""` against an optional field; rather than
   invent a workaround, this schema simply leaves all 12 child-slot fields
   optional and independent — disclosed as a simplification, not a
   fabricated cross-field rule.
6. **`placeOfBirthDistrict`/`placeOfBirthCountry` and
   `fatherName`/`motherName`/`fatherNationality`/`motherNationality`
   modelled as separate fields**, since the source prints each pair as two
   distinct labelled boxes under one shared item number (District/Country
   under item 6; father's/mother's name under item 16; father's/mother's
   nationality under item 17) — following this registry's convention of
   modelling each printed box as its own field rather than conflating two
   boxes sharing one item number into one field.
7. **`employer`, `otherNames`, `formerVisitsRwanda`, `formerStaysAfrica`
   modelled as optional.** None of these are marked obligatory by the
   source, and each is genuinely inapplicable to some applicants (a
   self-employed/retired/student applicant with no employer; an applicant
   with no other names; a first-time visitor with no former Rwanda/Africa
   history).
8. **No `sourceRef`-cited legal basis for any specific field-level
   requiredness rule** (unlike `uy/dgi`'s instructivo, DGIE's own visa
   pages do not publish a casilla-by-casilla completion guide for this
   specific printed form); requiredness above is this schema's own
   judgment based on which items look like core, always-needed identity/
   travel-purpose data versus clearly conditional or supplementary data,
   disclosed per-field above rather than asserted as sourced fact.

## Legal-currency check

migration.gov.rw's own "Visitors visa" page (Source 3 above), fetched
2026-07-12, explicitly still lists "the office of a diplomatic mission of
Rwanda in the applicant's country of residence" as a current visa-issuance
channel, alongside border-post/online/immigration-office channels. This
confirms the embassy-issued specimen modelled here remains a live, current
issuance path — not a stale or withdrawn artifact — even though DGIE's own
"How to Apply for a Visa on IremboGov" guidance promotes the online portal
as its primary channel and Rwanda's other five verticals are all
IremboGov-only dead ends (per the GOV-2507/GOV-2526 prior-cycle screening).
Negative check for a newer/superseding form: no V2/revised edition of this
specific "Visa Application" form surfaced in this cycle's search; the two
mirrors (UK 2021, USA 2024 re-publish) are byte-identical, corroborating a
single stable, still-current specimen rather than drift between editions.

## Test run (Phase 4)

No live submission was attempted — this is a printed, mail/in-person
embassy-filed PDF, not a self-service online API GovSchema can exercise.
Verification here is against the schema's own structural rules
(`tools/validate.mjs`, `tools/validate-ajv.mjs`) and a hand-rolled
conformance-fixture check.

A throwaway Node script (not committed, run locally from `/tmp`) loaded
`schema.json` and each fixture under
`conformance/rw/dgie/visa-application/1.0.0/`, evaluating every field's
`required`/`requiredWhen` and `validation.enum`/`validation.pattern` rule
against each fixture:

| Fixture | Expected | Actual |
|---|---|---|
| `single-tourist-applicant.json` (valid: single tourist applicant, never married, no children) | 0 errors | 0 errors |
| `married-applicant-with-two-children.json` (valid: married applicant, full spousal block, 2 of 4 child slots used) | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` (drops `givenNames`) | 1 error, `required` | 1 error, `required` on `givenNames` |
| `mutation-control-gender-enum-violation.json` (sets `gender: "other"`) | 1 error, `enum` | 1 error, `enum` on `gender` |
| `mutation-control-missing-conditional-spouse-field.json` (`maritalStatus: "married"` but `spouseName` absent) | 1 error, `required` (conditional) | 1 error, `required` on `spouseName` |

Both registry validators pass with 0 errors:

```
$ node tools/validate.mjs registry/rw/dgie/visa-application/1.0.0/schema.json
ok   registry/rw/dgie/visa-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/rw/dgie/visa-application/1.0.0/schema.json
ok   registry/rw/dgie/visa-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`) after this schema was added.
