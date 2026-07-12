# Verification record — `ng/nis/application-for-visa-entry-permit` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2561**), continuing
Nigeria's research thread from **GOV-2551** (the parent research issue) and
**GOV-2553** (Taxes, 2 of 6).

## Why this candidate

Nigeria stood at 2 of 6 verticals (Business Formation, Taxes) entering this
cycle. GOV-2551's own research pass found three independent mirrors of the
Nigeria Immigration Service's "Form Imm. 22 — Application Form for
Visa/Entry Permit", all flat, print-and-fill PDFs, consistent with this
registry's existing `rw/dgie/visa-application` precedent. This cycle
authors the schema and independently re-verifies the cited sources rather
than trusting the issue's citations at face value.

## Sources examined

### Source 1 (primary `source`, Embassy of Nigeria in Vietnam)

- **Authority:** Nigeria Immigration Service (NIS); distributed by the
  Embassy of the Federal Republic of Nigeria in Vietnam.
- **Document:** "APPLICATION FOR NIGERIAN VISA-ENTRY PERMIT FORM"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://nigeriaembassy.org.vn/wp-content/uploads/2020/11/VISA_FORM-1.pdf>
- **File identity:** `sha256:97276666450c71d1eb7c1eeeec1549e0d9a8a075d025a611cae34761fa224914`,
  373,872 bytes, `Content-Type: application/pdf`,
  `Last-Modified: Sat, 21 Nov 2020 08:31:52 GMT`. Byte count matches the
  GOV-2561 issue's own citation exactly.
- **Structure:** 2 pages, 15 numbered items (item 15 continues onto item 16
  numbering conventions used by the mission, i.e. the printed form runs
  items 1-15 followed by unnumbered follow-on questions carried across to
  page 2 that this schema treats as a continuous 25-question sequence,
  matching the issue's own count).
- **Own-domain status:** this is the only one of the three cited mirrors
  hosted on the issuing embassy's own government domain
  (`nigeriaembassy.org.vn`), which is why it is used as this schema's
  primary citable `source.url` despite being the less complete of the two
  directly-verified editions.
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (fuller edition, Embassy of Nigeria in Washington, DC)

- **URL (directly retrieved, HTTP 200, no login):**
  <https://www.samspassport.com/wp-content/uploads/2019/10/Nigeria-Visa-handwritten-application.pdf>
- **File identity:** `sha256:7e7f7a6c804e2c1eaa33f4772873803fae9be8ec1984a9ffcfbbd25a7f8c3308`,
  43,156 bytes, `Content-Type: application/pdf`,
  `Last-Modified: Tue, 29 Oct 2019 13:45:21 GMT`.
- **Structure:** 3 pages, 31 numbered items, matching the issue's own
  description exactly. This edition's page 1 header prints "EMBASSY OF THE
  FEDERAL REPUBLIC OF NIGERIA / 3519 International Court, NW Washington, DC
  20008" and, distinctly, "**Form Imm. 22**" — confirming NIS's official
  form-number designation, which the Vietnam edition's specimen does not
  print anywhere on its own pages.
- **Hosting:** a third-party visa-services domain (`samspassport.com`), not
  an embassy's own domain — used here as the base for field *coverage*
  (it is the fuller of the two directly-verified editions and is the one
  that identifies the official form number) while Source 1 remains the
  primary citable `source.url` for its own-domain provenance.
- **Retrieved / reviewed:** 2026-07-12

### Source 3 (corroborating mirror, re-verified on a later pass this same cycle)

- **URL:** <https://nigerianvisaservices.com/wp-content/uploads/2017/09/Nigerian-App-New.pdf>
- **First-pass finding:** an early direct-fetch attempt this cycle (with and
  without a browser-like `User-Agent` header) returned an HTTP 200
  **Cloudflare human-verification challenge page** (`text/html`, "Human
  verification", Turnstile widget), not the cited PDF, and was recorded
  above and in `schema.json` as an unreachable, unverified citation.
- **Later-pass correction:** a subsequent independent re-fetch this same
  cycle (again both with and without a browser-like `User-Agent`) returned a
  live `application/pdf` response on every attempt —
  `sha256:8b60aceaaa963eb8ad9690e74613b5cf9118baf6a94af60eb4989b127a2ba544`,
  88,509 bytes, `Last-Modified: Sat, 30 Sep 2017 17:50:03 GMT`. The earlier
  challenge page was therefore a **transient failure** (rate-limiting or a
  momentary bot-mitigation trigger), not a genuine, durable access gate —
  corrected here rather than left as a stale claim, per this registry's
  practice of re-verifying rather than trusting a single failed fetch.
- **Byte identity:** **not** byte-identical to Source 1 or Source 2 (a
  distinct sha256/size from both) — a separately re-typeset/re-rendered
  copy, evidenced by irregular inter-character spacing in its extracted
  text layer (consistent with an OCR or re-layout pass, not a raw file
  copy). Its claimed byte-identity to Source 1, as originally cited in the
  GOV-2561 issue, does **not** hold and is corrected here.
- **Content corroboration:** despite not being byte-identical, a fresh
  `pdfjs-dist` text extraction confirms this specimen carries the same
  "Form Imm. 22" title, the same 31 numbered items in the same order, and
  materially the same item text as Source 2 — corroborating Source 2's
  content as genuinely distributed (in at least two distinct renderings) by
  more than one channel, not a single mission's one-off variant. This
  corroboration is not relied upon for any field this schema would not
  otherwise carry from Source 1/Source 2; it strengthens confidence in the
  DC/Imm.22 edition's content, nothing more.
- **Retrieved / reviewed:** 2026-07-12 (both passes)

## Extraction method

`pdfjs-dist` (legacy build, v3, `require`'d via `createRequire`) was used
for both `page.getAnnotations()` (confirming **0 `Widget` annotations**
across all pages of both directly-verified editions — flat,
print-and-hand-fill forms, the same tier as this registry's `rw/dgie`
specimen) and `page.getTextContent()` (position-sorted by
`item.transform[4]`/`[5]` for x/y) to read each edition's full printed text
directly. With 0 widgets on either edition, there are no digital field
names to cross-check against; every field in this schema is derived
directly from each edition's own printed item numbering and row/column
position.

## Field-set comparison: correcting the issue's "superset" framing

The GOV-2561 issue characterized the DC/Washington edition (31 questions)
as "a superset of the Vietnam form" (adding number-of-entries, funds
available, immigration/criminal/health history, countries lived-in/visited
in the last 5 years, and the fee schedule). Independent side-by-side
extraction of **both** editions' full printed text confirms the DC edition
does add all of that content, but also finds this framing incomplete: the
Vietnam edition independently asks **6 items the DC edition omits
entirely**:

| Vietnam-edition-only item | DC/Imm.22 equivalent |
|---|---|
| Item 4: "EMAIL ADDRESS" | none — DC edition has no e-mail field anywhere |
| Item 10 continuation: "COMPLEXION" (alongside hair/eye colour, height) | DC item 9 asks hair/eye colour and height only, no complexion |
| Item 21: "ACADEMIC QUALIFICATIONS" | none |
| Item 24: "REFERENCE IN VIETNAM (Name and Address ... / TELEPHONE NO)" | none (a mission-localized field; other missions' own editions would presumably substitute their own host-country name here) |
| Item 25: "SOURCE OF SPONSORSHIP FOR PROPOSED VISIT TO NIGERIA" | none |

This is disclosed and corrected rather than silently adopted: this schema
models **the union** of both editions rather than treating the DC edition
as fully containing the Vietnam edition. The DC edition's 31-item structure
supplies 86 of this schema's 93 `fields[]` entries (it is the fuller,
officially-form-numbered edition); the Vietnam edition's 6 edition-unique
items above, plus a 7th ("FORMER NAME (if any)", which the DC edition also
omits from its own item 1 row), are modelled as independently `required:
false` fields — a specimen's omission of a question this registry has
directly verified another edition asks is not evidence the question is
inapplicable, only that this particular mission's edition does not print
it.

## Field inventory

93 `fields[]` entries, referenced by DC/Imm.22 item number (base structure)
and Vietnam-edition item number (edition-unique additions):

| Source item | Printed content | Schema field(s) |
|---|---|---|
| DC 1 | Surname (MR/MRS/MISS) / Other Names | `surname`, `otherNames` |
| VN 1 (cont.) | Former name (if any) | `formerName` |
| DC 2 | Sex / Marital Status | `sex`, `maritalStatus` (enum boundary taken from VN item 5's explicit "Single, Married, Widowed, Divorced" instruction) |
| DC 3a/3b | Present / Previous Nationality | `presentNationality`, `previousNationality` |
| DC 4a/4b | Date of Birth / Place of Birth | `dateOfBirth`, `placeOfBirth` |
| DC 5 | Residential Address / Telephone No. | `residentialAddress`, `residentialTelephone` |
| DC 6 | Office Address / Telephone No. | `officeAddress`, `officeTelephone` |
| DC 7 | Profession | `profession` |
| DC 8 | Armed Forces branch served, From/to | `armedForcesService`, `armedForcesFrom`, `armedForcesTo` |
| DC 9 | Colour of Hair / eyes / Height | `hairColour`, `eyeColour`, `height` |
| VN 10 (cont.) | Complexion | `complexion` |
| DC 10 | Visible Identification marks | `visibleIdentificationMarks` |
| DC 11 | Passport No / Date of issue / Date of expiry / Place of issue / issuing Government | `passportNumber`, `passportIssueDate`, `passportExpiryDate`, `passportPlaceOfIssue`, `passportIssuingGovernment` |
| DC 12 | Purpose of journey | `purposeOfJourney` |
| DC 13 | Number of entries required (Single/Multiple) | `numberOfEntriesRequired` |
| DC 14 | Intended duration of stay | `intendedDurationOfStay` |
| DC 15a/15b | Proposed date of travel / Mode of travel | `proposedDateOfTravel`, `modeOfTravelToNigeria` |
| DC 16 | Funds available for trip | `fundsAvailableForTrip` |
| DC 17a/b/c | Employer name / Post / Job description | `employmentEmployerName`, `employmentPostToBeOccupied`, `employmentJobDescription` |
| DC 18 | Spouse/parents employment particulars in Nigeria | `spouseParentsEmploymentParticulars` |
| DC 19 | Duration of spouse/parents in Nigeria | `spouseParentsDurationInNigeria` |
| DC 20 | Intended address in Nigeria | `intendedAddressInNigeria` |
| DC 21 | Ever applied for a Nigerian visa before? | `previousNigerianVisaApplied` |
| DC 22 | Where did you apply? | `previousVisaApplicationLocation` (`requiredWhen` previousNigerianVisaApplied=yes) |
| DC 23 | Granted or rejected? | `previousVisaOutcome` (`requiredWhen` previousNigerianVisaApplied=yes) |
| DC 24 | Reason if rejected | `previousVisaRejectionReason` (`requiredWhen` previousVisaOutcome=rejected) |
| DC 25 | Ever visited Nigeria? | `previouslyVisitedNigeria` |
| DC 26 | Purpose of previous visit (i-v) | `purposeOfPreviousVisit` (`requiredWhen` previouslyVisitedNigeria=yes) |
| DC 27 (3-row table) | Period of visits and Addresses | `previousVisit1..3From`/`To`/`Address` |
| DC 28 | Years lived in applying country | `yearsLivedInApplyingCountry` |
| DC 29a-f | Health/security screening questions | `everInfectedContagiousDiseaseOrMentalIllness`, `everArrestedOrConvicted`, `everInvolvedNarcoticActivities`, `everDeported` (+ `deportedFromCountry`), `everSoughtVisaByMisrepresentationOrFraud`, `everTestedPositiveHivAids` (+ `hivStatusDetails`) |
| DC 30 (4-row table) | Countries lived in for >1yr, last 5 years | `countryLived1..4Country`/`City`/`Date` |
| DC 31 (4-row table) | Countries visited, last 12 months | `countryVisited1..4Country`/`City`/`Date` |
| VN 4 | Email address | `emailAddress` |
| VN 21 | Academic qualifications | `academicQualifications` |
| VN 24 | Reference in [mission country]: Name/Address, Telephone | `missionCountryReferenceNameAddress`, `missionCountryReferenceTelephone` |
| VN 25 | Source of sponsorship | `sourceOfSponsorship` |
| both editions | Date beside the (unwidgeted) signature line | `signatureDate` |

`documents[]` (9 entries):

- `applicantPhoto` — the "PHOTOGRAPH" box printed on page 1 of both
  editions, and the DC edition's page-3 photo specification ("colored
  passport photo showing full face on white background").
- `originalPassport` — DC page 3, "attach original passport" (identity
  document).
- `letterOfInvitationFromNigeria` — DC page 3.
- `returnPrepaidMailer` — DC page 3, with the explicit "DO NOT ATTACH
  ENVELOPE AND STAMP" handling instruction captured verbatim.
- `childUnder16Requirements` — DC page 3's "REQUIREMENTS FOR CHILDREN UNDER
  SIXTEEN" bundle (birth certificate, 1 photo, signed parental consent,
  parents' passport bio-data/valid ID copies). Not machine-gated: neither
  edition provides a boolean "applicant is under 16" field to gate a
  `requiredWhen` against.
- `onlineVisaFeePayment` — DC page 3, paid online at
  `WWW.immigration.gov.ng` (no fixed amount stated on the specimen; it
  varies by visa category/nationality).
- `processingFeeMoneyOrder` — DC page 3, a fixed $20.00 money-order fee
  mailed with the application.
- `expeditedProcessingFeeMoneyOrder` — DC page 3, an optional $65.00
  money-order fee for expedited service.
- `applicationCertification` — the wet-ink certification statement beside
  the signature line, quoted verbatim from the DC edition; the Vietnam
  edition's differently-worded but substantively equivalent statement is
  disclosed in the field's `sourceRef`, not silently merged into one
  "canonical" wording.

The DC edition's final "For official use only" block (page 3) is excluded
as an office-only section, consistent with this registry's established
convention (cf. `rw/dgie`).

## Access notes and judgment calls

1. **Primary `source.url` is the less complete of the two directly-verified
   editions.** The Vietnam embassy's own-domain copy was chosen over the
   fuller, third-party-hosted DC edition as this schema's citable `source`
   because it is the only one of the three cited mirrors hosted on an
   issuing government domain, per this registry's general preference for
   own-domain provenance. Field *coverage*, however, follows the DC
   edition's structure, since it is fuller and identifies the official
   "Form Imm. 22" designation; this split is stated explicitly in both
   `schema.json`'s `description`/`verification.notes` and here, not left
   implicit.
2. **The issue's "superset" characterization of the DC edition was found
   incomplete and corrected**, not merely repeated — see "Field-set
   comparison" above.
3. **`maritalStatus`'s enum boundary is sourced from the Vietnam edition,
   not the DC edition**, even though the DC edition supplies this schema's
   base structure: the DC edition's item 2 prints only the bare label
   "Marital Status" with no enumerated options, while the Vietnam edition's
   item 5 spells out "(Single, Married, Widowed, Divorced)" explicitly. Both
   editions ask the same underlying question; the more explicit edition's
   wording is used to avoid inventing an enum boundary neither edition's
   own text would otherwise resolve unambiguously.
4. **`sex` has no third option on either edition.** Modelled as a binary
   enum since neither specimen prints anything beyond Male/Female anywhere
   on either edition.
5. **`previousVisaApplicationLocation` and `previousVisaOutcome` are gated
   `requiredWhen: { field: "previousNigerianVisaApplied", equals: "yes" }`.**
   Safe to gate this way because `previousNigerianVisaApplied` is itself
   `required: true` (always present in a conforming submission), matching
   this registry's established `maritalStatus`-gates-spouse-fields pattern
   (cf. `rw/dgie`, `ph/bi`, `ph/dfa`, `ph/lto`, `us/uscis`).
6. **`previousVisaRejectionReason` is gated on `previousVisaOutcome`
   equalling `"rejected"`, even though `previousVisaOutcome` is itself
   optional.** This is safe: an `equals` comparison against an absent
   sibling field evaluates to false (not required), which is the correct
   outcome here — this is the safe direction of the shared Condition
   grammar, distinct from the `notEquals`-against-an-absent-optional-field
   misfire class this registry has hit and fixed before
   (`notequals-empty-string-absent-field-bug`).
7. **`deportedFromCountry` and `hivStatusDetails` are gated the same way**,
   on their respective `yes`-valued sibling questions, which are themselves
   `required: true`.
8. **`everTestedPositiveHivAids`/`hivStatusDetails` faithfully model the
   source's own printed question.** This is not a GovSchema-invented field:
   it is verbatim from DC/Imm.22 item 29(f), and is modelled per this
   standard's source-of-truth-fidelity principle like every other field on
   this specimen, classified `health` for consumer-side handling guidance.
9. **DC item 27's prior-visit table is a bounded 3-row printed grid** (rows
   i-iii, confirmed by direct text-position extraction), flattened to
   `previousVisit1`..`previousVisit3`, each with `From`/`To`/`Address`,
   matching this registry's bounded-repeating-group convention (cf.
   `rw/dgie`'s 4-slot children table, `fi/migri`).
10. **DC items 30 and 31 are each a bounded 4-row printed grid**
    (Country/City/Date columns, confirmed by direct text-position
    extraction), flattened to `countryLived1`..`4` and `countryVisited1`..
    `4` respectively.
11. **`employmentEmployerName`/`employmentPostToBeOccupied`/
    `employmentJobDescription` (DC 17a-c) and `spouseParentsEmployment
    Particulars`/`spouseParentsDurationInNigeria` (DC 18-19) are not
    machine-gated**, even though each is conditional on `purposeOfJourney`
    naming employment or on the applicant joining a spouse/parent/relative
    respectively. Neither condition is machine-checkable: `purposeOfJourney`
    is free text with no reliable pattern match for "employment", and
    neither edition provides a dedicated "reason: joining family" eligibility
    field. The human-facing constraint is documented in each field's
    `description` only, matching this registry's established practice for
    free-text-gated conditionals.
12. **`missionCountryReferenceNameAddress`/`Telephone` are modelled as
    generically "mission country", not "Vietnam"**, even though the source
    specimen prints "REFERENCE IN VIETNAM" verbatim: this question is
    mission-localized (each embassy's own edition would presumably
    substitute its own host country's name), and the schema's field
    `label`/`name` should not hard-code one mission's locale while its
    `sourceRef` still quotes the Vietnam edition's exact printed wording.
13. **`applicationCertification`'s `statement` quotes the DC edition's
    wording verbatim**, since DC supplies this schema's base structure; the
    Vietnam edition's differently-worded but substantively equivalent
    statement is disclosed in the field's `sourceRef` rather than silently
    merged into one canonical wording or discarded.
14. **`childUnder16Requirements` is not machine-gated** since neither
    edition provides an applicant-is-a-minor eligibility field; the
    condition is documented in the document's own `sourceRef` prose only.
15. **`onlineVisaFeePayment` carries no `amount`**, since the DC edition's
    own text states only that the fee is "paid through the Nigeria
    immigration Website", with no fixed figure printed (unlike the $20/$65
    money-order fees, which are fixed amounts stated explicitly).

## Test run (Phase 4)

No live submission was attempted: Nigeria's diplomatic-mission visa channel
is a printed, hand-completed, mailed application to a specific embassy or
consulate together with a money-order processing fee, not a portal
accepting programmatic submissions, and submitting fabricated identity data
against a foreign government's consular/immigration process is not a safe
or reversible action — the same reasoning already documented for this
registry's other consular/immigration schemas (e.g. `rw/dgie/visa-
application`, `uy/mrree/formulario-unificado-de-visas`).

Instead, two independent worked mock records were built from this
document's own field inventory and checked with a purpose-written script
(`validate_instance.mjs`, mirroring the approach used by `rw/dgie` and
`uy/mrree`): compiles `schema.json`'s `fields[]` into a JSON Schema document
checked with `ajv` (+`ajv-formats` for `date`), plus a from-scratch
evaluator for `requiredWhen`/`documents[]` conditional requiredness.

```
$ node validate_instance.mjs registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json \
    conformance/ng/nis/application-for-visa-entry-permit/1.0.0/single-entry-tourist-first-time-applicant.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json \
    conformance/ng/nis/application-for-visa-entry-permit/1.0.0/multiple-entry-business-married-with-prior-rejected-visa.json
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

$ # mutation-control-invalid-enum-value.json: 'maritalStatus' set to 'engaged' (not in enum)
Static (required/type/pattern/enum) validation: FAIL
 - /maritalStatus must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-visa-location.json: previousNigerianVisaApplied='yes',
$ # previousVisaOutcome='granted' set, but 'previousVisaApplicationLocation' left absent
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'previousVisaApplicationLocation' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'originalPassport' removed from documents[]
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'originalPassport' is required but not marked provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json
ok   registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json
ok   registry/ng/nis/application-for-visa-entry-permit/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (385/385 documents) also passed
clean, and `tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` (in `tools/govschema-client/`, after `npm ci
--include=dev` since a plain `npm ci` under a local `NODE_ENV=production`
skips `ajv`'s devDependency install) to include this document's entry.

## Nigeria DMV and Nigeria's other open verticals

**NG DMV was screened this same cycle (GOV-2551) and confirmed a dead
end**: driving-licence issuance is run by the Federal Road Safety Corps
(FRSC) nationally and by state motor-licensing authorities, both
exclusively through SSO/login-gated online portals, with no downloadable
blank specimen PDF found at any tier. Not a hard dead end if a genuinely
new third-party-republished specimen surfaces.

Nigeria now stands at 3 of 6 verticals (Business Formation, Taxes, Visa).
Passport (Form C1 lost/replacement bundle) and National ID (NIMC NIN
Enrolment Form v2.0) were also found as strong candidates this cycle and
are left as open backlog for a future cycle.
