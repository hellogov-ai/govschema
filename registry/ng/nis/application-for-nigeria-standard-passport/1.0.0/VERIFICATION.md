# Verification record — `ng/nis/application-for-nigeria-standard-passport` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2577**), continuing
Nigeria's research thread from **GOV-2567** (parent) and **GOV-2569**
(National ID, 4 of 6), where this candidate — NIS Form C1 via the Nigeria
High Commission London mirror — was first identified and left as backlog.

## Why this candidate

Nigeria stood at 4 of 6 verticals (Business Formation, Taxes, Visa, National
ID) entering this cycle, with Passport as the sole open backlog vertical and
DMV a confirmed dead end (state/FRSC licensing is SSO-portal-gated with no
downloadable specimen, per GOV-2561). This cycle authors the schema and
independently re-verifies the cited source rather than trusting the prior
cycle's citation at face value.

## Source examined

- **Authority:** Nigeria Immigration Service (NIS); distributed by the
  Nigeria High Commission, London.
- **Document:** "APPLICATION FOR NIGERIA STANDARD PASSPORT Form C1"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.nigeriahc.org.uk/wp-content/uploads/2023/05/LostReqForm.pdf>
- **File identity:** `sha256:85d970ee602c3bb9d98e1fd850541a8d63d9fd2f5c45c5a6b2281cf98bc317a4`,
  170,446 bytes, `Content-Type: application/pdf`,
  `Last-Modified: Tue, 06 Jun 2023 05:55:47 GMT`. Byte count matches the
  figure already recorded in CATALOG.md's GOV-2569 update exactly.
- **Retrieved / reviewed:** 2026-07-12

The filename (`LostReqForm.pdf`) is misleading: the PDF is a 6-page bundle
assembled by the London mission, of which Form C1 itself is only page 1.
The bundle also contains:

- **Pages 2-3:** "FORM OF UNDERTAKING AND GUARANTEE" ("Form P/21"), a
  guarantor affidavit with its own Parts I-III.
- **Page 4:** "STATUTORY DECLARATION OF LOST PASSPORT", a notarized
  declaration specific to this mission's lost-passport process.
- **Page 5:** "STATUTORY DECLARATION OF AGE", a notarized declaration used
  where no birth registry existed at the time of the applicant's birth.
- **Page 6:** a public notice (anti-tout warning, e-passport application
  channel, payment-status lookup instructions) — not a form, no fields.

## Extraction method

`pdfjs-dist` (legacy build, v3, `require`'d via `createRequire`) was used for
`page.getAnnotations()` (confirming **0 `Widget` annotations** across all 6
pages — a flat, print-and-hand-fill bundle, the same tier as this registry's
`ng/nis/application-for-visa-entry-permit` precedent) and
`page.getTextContent()` (row-grouped by rounded y-coordinate, sorted
left-to-right by x) to read the full printed text of every page directly.
With 0 widgets, there are no digital field names to cross-check against;
every field in this schema is derived directly from Form C1's own printed
labels and row/column position on page 1.

## Field inventory

40 `fields[]` entries, all sourced from page 1:

| Source (page 1) | Printed content | Schema field(s) |
|---|---|---|
| Header | Applicant Phone No | `applicantPhoneNumber` |
| — | Surname / Other Names | `surname`, `otherNames` |
| — | Sex: Male Female | `sex` |
| — | Date of Birth (Day/Month/Year) | `dateOfBirth` |
| — | Place of Birth: Town / State | `placeOfBirthTown`, `placeOfBirthState` |
| — | State of Origin | `stateOfOrigin` |
| — | Current Address: State / Street | `currentAddressState`, `currentAddressStreet` |
| — | Profession / Occupation | `profession`, `occupation` |
| — | Height in Meters | `heightInMeters` |
| — | Colour of Eyes (brown/green/grey/blue) | `eyeColour` |
| — | Colour of Hair (black/grey/white) | `hairColour` |
| — | Marital Status (single/married/widowed/divorced) | `maritalStatus` |
| — | Special features | `specialFeatures` |
| — | Maiden Name | `maidenName` (`requiredWhen` maritalStatus in married/widowed/divorced) |
| — | Next of Kin: Name / Address / Contact Telephone No. | `nextOfKinName`, `nextOfKinAddress`, `nextOfKinContactTelephone` |
| For Official Use Only | Reason for application (First Issue / Re-issue / Damaged / Lost / Change of data / Dual National) | `reasonForApplication` |
| For Official Use Only | Lost Previous Passport No. | `previousPassportNumber` (`requiredWhen` reasonForApplication=lost) |
| Particulars of Children table (bounded 4-row) | Name / Date of Birth / Sex / Place of Birth, rows 1-4 | `child1..4Name`/`DateOfBirth`/`Sex`/`PlaceOfBirth` |
| Receipt footer | Date (beside "Signature or thumbprint of applicant") | `signatureDate` |

`documents[]` (5 entries):

- `cautionAcknowledgement` — the page-1 header warning, quoted verbatim
  (attestation).
- `passportFeePayment` — "Amount of fees charged" (payment, no fixed amount
  printed on this specimen).
- `guarantorUndertakingForm` — Form P/21 (pages 2-3), modelled as a
  companion document (supporting-evidence, `belongsTo: responsible-party`).
- `statutoryDeclarationOfLostPassport` — page 4 (supporting-evidence,
  `requiredWhen` reasonForApplication=lost).
- `statutoryDeclarationOfAge` — page 5 (supporting-evidence, not
  machine-gated).

The specimen's final office-only block (authority code, acquisition batch
number, application form number, fee amount collected by the office,
officer/control-officer signatures, post-issuance passport-number
recording) is excluded, consistent with this registry's established
"for official use only" exclusion convention (cf. `ng/nis/application-for-
visa-entry-permit`'s DC-edition page-3 exclusion).

## Access notes and judgment calls

1. **Scoped to the Adult applicant pathway.** The specimen's header prints
   a shared `ADULT MINOR` toggle, but no distinct fields exist anywhere on
   the page for a Minor applicant beyond that single toggle (no separate
   parent/guardian-particulars block, unlike this registry's
   `ng/nimc/nin-enrolment-form`, which does have a dedicated Guardian
   Details section). Rather than fabricate Minor-specific fields this
   specimen does not print, this schema models the Adult pathway only,
   matching this issue's own title/scope; a Minor-pathway schema is left
   as a future candidate if a fuller specimen with distinct Minor fields
   is ever found.
2. **`reasonForApplication` is modelled at its full 6-value printed
   breadth**, not narrowed to first-time/adult only. Form C1 is
   structurally one form serving First Issue, Re-issue, Damaged, Lost,
   Change of data, and Dual National with equal footing (all six printed
   as one checkbox row); narrowing to a single reason would contradict
   this registry's source-fidelity principle, which models what the
   specimen actually asks rather than an assumed narrower scenario.
3. **`reasonForApplication`'s printed position is disclosed as unusual.**
   The checkbox set appears only within the specimen's "For Official Use
   Only"/receipt-counterfoil portion of page 1 (printed twice, once per
   near-identical receipt block), not the applicant-facing top section.
   It is nonetheless modelled as core applicant `fields[]` data (not
   excluded as office administrivia) because it represents the
   applicant's own stated reason for applying, transcribed by the office
   onto the receipt — unlike the surrounding pure-administrivia fields
   (authority code, batch number, fee amount, officer signatures), which
   are excluded.
4. **The guarantor form (Form P/21), the Statutory Declaration of Lost
   Passport, and the Statutory Declaration of Age are each modelled as a
   `documents[]` entry, not as this schema's own `fields[]`.** Each is a
   separately executed, separately signed/notarized instrument with its
   own signatory (a guarantor or declarant, distinct from the passport
   applicant), consistent with this registry's companion-document
   convention for genuinely distinct bundled forms (cf. the guardian-
   consent companion-form pattern used elsewhere in this registry). This
   is a disclosed scoping call, not a silent drop: each companion
   document's own internal structure (Form P/21's Parts I-III; each
   statutory declaration's own sworn content) is described in its
   `sourceRef` rather than flattened into this schema's `fields[]`.
5. **`guarantorUndertakingForm` is modelled as `required: true`**, since
   Form P/21's own header states "(To be furnished by applicant for
   Nigerian Passports)" without qualification — i.e. it applies to Form
   C1 applications generally, not only a subset of reasons. Its own Part
   II (the overseas-travel-specific declaration) carries a narrower,
   explicitly-stated carve-out ("except those sponsored by the Federal or
   State Government or Corporation"), quoted in the document's own
   `sourceRef` rather than modelled as a machine-checkable condition on
   this schema (Form C1 has no dedicated "government-sponsored" eligibility
   field to gate against).
6. **`statutoryDeclarationOfLostPassport` is gated
   `requiredWhen: { field: "reasonForApplication", equals: "lost" }`.**
   Safe to gate this way since `reasonForApplication` is itself
   `required: true` (always present in a conforming submission).
7. **`statutoryDeclarationOfAge` is not machine-gated.** The specimen's own
   page 5 states this declaration applies "where there was no Birth
   Registry" at the time of birth — a condition Form C1 provides no
   dedicated field to check against.
8. **`maidenName` is gated on `maritalStatus` via the `in` operator**
   (`["married", "widowed", "divorced"]`), not `equals`, since more than
   one marital-status value can plausibly carry a maiden name. Safe to
   gate this way since `maritalStatus` is itself `required: true`. The
   specimen does not separately cross-reference sex against this field, so
   no additional sex-based condition is modelled.
9. **`eyeColour` and `hairColour` are modelled as narrow, source-derived
   enums (4 and 3 options respectively), not expanded to a fuller
   real-world colour vocabulary.** The specimen prints exactly these
   options in each column with no free-text alternative; modelled
   faithfully rather than invented.
10. **No photograph requirement is modelled.** Unlike this registry's
    `ng/nis/application-for-visa-entry-permit` (which prints an explicit
    "PHOTOGRAPH" box), the extracted text of all 6 pages of this bundle
    contains no printed mention of a photograph requirement. This is
    flagged as a plausible real-world gap (Nigerian passport applications
    almost certainly require a photograph via the online e-passport
    portal referenced on page 6) for a future verification cycle, rather
    than assumed and silently added without source support.
11. **`profession` and `occupation` are modelled as two distinct fields**,
    since the specimen prints them as two separate blanks with no further
    distinguishing text between them.
12. **The 4-row "Particulars of Children to be endorsed on Mother's
    Passport" table is flattened to `child1`..`child4`**, matching this
    registry's established bounded-repeating-group convention (cf. the
    Visa sibling's 3-row prior-visit table and 4-row countries-lived-in/
    visited tables).

## Test run (Phase 4)

No live submission was attempted: Nigeria's passport-application channel
is a printed, hand-completed application submitted in person or by mail to
a specific NIS office or diplomatic mission together with notarized
companion documents and a processing fee, not a portal accepting
programmatic submissions — the same reasoning already documented for this
registry's other NG/NIS and consular schemas (`ng/nis/application-for-visa-
entry-permit`, `rw/dgie/visa-application`).

Instead, two independent worked mock records were built from this
document's own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by the Visa sibling):
compiles `schema.json`'s `fields[]` into a JSON Schema document checked with
`ajv` (+`ajv-formats` for `date`), plus a from-scratch evaluator for
`requiredWhen`/`documents[]` conditional requiredness.

```
$ node validate_instance.mjs registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json \
    conformance/ng/nis/application-for-nigeria-standard-passport/1.0.0/first-issue-single-applicant.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json \
    conformance/ng/nis/application-for-nigeria-standard-passport/1.0.0/lost-passport-married-applicant-with-child.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — five negative fixtures, each targeting a distinct
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

$ # mutation-control-invalid-enum-value.json: 'reasonForApplication' set to 'renewal' (not in enum)
Static (required/type/pattern/enum) validation: FAIL
 - /reasonForApplication must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-previous-passport-number.json: reasonForApplication='lost'
$ # (with statutoryDeclarationOfLostPassport already provided:true) but 'previousPassportNumber' removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'previousPassportNumber' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'guarantorUndertakingForm' removed from documents[]
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'guarantorUndertakingForm' is required but not marked provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json
ok   registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json
ok   registry/ng/nis/application-for-nigeria-standard-passport/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (387/387 documents plus 3/3
`mapping.json` companions) also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Nigeria's vertical status

**Nigeria now stands at 5 of 6 verticals** (Business Formation, Taxes,
Visa, National ID, Passport). DMV remains a confirmed dead end
(state/FRSC driving-licence issuance is SSO-portal-gated nationally with
no downloadable blank specimen found at any tier, per GOV-2561's screening
pass) — not a hard dead end if a genuinely new third-party-republished
specimen surfaces.
