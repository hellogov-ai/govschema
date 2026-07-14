# Verification record — `za/dha/application-for-visa-temporary-sojourn` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2976**. South Africa was one
vertical short of full 6/6 coverage (Passport, DMV, Business Formation,
Taxes, and National ID were all already modelled; only Visa was open). This
schema closes that gap, making South Africa the registry's 6th jurisdiction
to reach full coverage (after Colombia, Bulgaria, Romania, North Macedonia,
and Ghana).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i "za-dha\|za/dha\|south-africa"` and
`gh pr list --state all --search "za/dha visa"` before starting — neither
found an existing branch or PR for this deliverable, so no reconciliation
was needed this cycle.

## Scouting record

This cycle dispatched three parallel scouting agents: one re-checking
Slovakia's disclosed Taxes backlog (GOV-2969's DPFOAv25/`financnasprava.sk`
outage), one re-checking Lithuania's GPM311C companion-schedule candidate,
and one screening four near-complete jurisdictions' single remaining
vertical gap (Nigeria/DMV, Thailand/National ID, Vietnam/National ID,
South Africa/Visa). All four came back with strong, independently-verified
candidates:

- **South Africa (DHA) — Visa**: the richest and cleanest source found —
  authored this cycle, see below.
- **Vietnam (MPS/C06) — National ID**: `dichvucong.bocongan.gov.vn`'s own
  CC01 "Tờ khai Căn cước công dân" (Citizen ID Declaration), a genuine,
  directly-downloadable legacy `.doc` specimen (~11 numbered fields),
  unauthenticated. Vietnam's own `dichvucong.gov.vn` national portal is
  WAF-blocked; the ministry-specific `bocongan.gov.vn` domain is not.
  **Delegated as a child issue rather than authored this cycle** (this
  cycle authored South Africa instead) — see the GOV-2976 comment thread
  for the delegated issue.
- **Slovakia — Taxes**: `financnasprava.sk`'s outage (first observed
  GOV-2969) is still live as of this cycle (every path, including the
  dedicated `pfseform.financnasprava.sk` forms subdomain, still
  302-redirects to `servis.financnasprava.sk/odstavka`). A **May 21, 2026
  Wayback Machine capture** of DPFOAv25 (the individual income tax return)
  was independently retrieved and gives a rich, ~89-numbered-line field
  list across 9 sections — strong enough to author from the snapshot
  directly rather than wait indefinitely for the live outage to clear.
  **Delegated as a child issue** (opens Slovakia as a new jurisdiction) —
  see the GOV-2976 comment thread.
- **Lithuania — GPM311C companion schedule**: confirmed genuine (page 3 of
  the same 9-page annex PDF GOV-2969's GPM311 schema already cites — no
  re-fetch needed) and a strong, ready-to-author bounded-repeating-row
  candidate (6 income rows / 5 expense rows). **Delegated as a child
  issue** (deepens Lithuania's sole vertical, does not add a new vertical
  count) — see the GOV-2976 comment thread.
- **Nigeria (FRSC) — DMV**: a genuine live multi-step e-form
  (`nigeriadriverslicence.frsc.gov.ng`) was found, not a dead end, but only
  its first step's field names were captured before a captcha gate — **not
  ready to author this cycle**, left as disclosed backlog for a future
  cycle to walk the flow further.
- **Thailand (DOPA) — National ID: confirmed dead end this cycle.** No
  unauthenticated ID-card application form is published anywhere on
  `bora.dopa.go.th` (7 download-category pages checked); the genuine
  self-service channels (`thportal.bora.dopa.go.th`,
  `eservices.bora.dopa.go.th`) are both gated behind ThaID app login.
  Card issuance itself is in-person/biometric. Not worth re-attempting
  without a genuinely new source.

## Source verification

- **PDF source:**
  `https://dirco.gov.za/paris/wp-content/uploads/sites/6/2024/12/LONG-STAY-VISA-APPLICATION-FORM.pdf`
  — independently re-fetched via `curl`: **HTTP 200**,
  **`application/pdf`**, **599,736 bytes**, sha256
  `8d967ccbd2e6e3f3f1f565a342508f6224e5c5330814d3174a6f4c8dddddd960`.
  Hosted on South Africa's Department of International Relations and
  Cooperation's (DIRCO) own Paris-mission domain, a first-party,
  unauthenticated, no-login/CAPTCHA/WAF-gated government source, though not
  DHA's own domain directly (the Department of Home Affairs' main site
  hosts no downloadable specimen of this form; DIRCO's mission sites
  re-publish DHA's official gazetted forms for use by South African
  missions abroad and applicants filing through them).
- Independently re-extracted via `pdfjs-dist` (legacy Node build, run from
  an isolated `/tmp` scratch directory) directly from the raw PDF bytes:
  **20 pages, 0 Widget annotations on every page** — a flat,
  print-and-hand-fill Government Gazette specimen, not an AcroForm.
  `getTextContent()` returned a full, clean, unbroken text layer on every
  page (no OCR/scan artifacts). The document's own printed heading confirms
  its identity and provenance: "(DHA-1738) Form 8 ... APPLICATION FOR VISA
  TO TEMPORARILY SOJOURN IN THE REPUBLIC [Section 10(2)(c) to (k);
  Regulation 9(1)]", and every page footer prints "STAATSKOERANT, 22 MEI
  2014 No. 37679" / "GOVERNMENT GAZETTE, 22 MAY 2014" confirming this is
  the form as published in South Africa's Government Gazette, Vol. 587,
  No. 37679.

## Field derivation and scoping

The extracted text (20 pages) was read in full before modeling any field.
Scope:

- **Pages 1-7 (Sections 1-10) — modeled in full**: the category-of-permit
  selector plus a biometric/fingerprint-form checkbox (page 1); Personal
  Details, Citizenship Details, Passport Details, and Addresses (Sections
  1-4, pages 2-4); Intentions/Proposed Duration of Stay and
  Maintenance/Deportation (Sections 5-6, page 5); Particulars of
  Family/Dependants Accompanying (Section 7, pages 5-6); the "not
  accompanying" branch and a refused-entry/deportation question (page 6,
  between Sections 7 and 8); the Security/Health Questionnaire (Section 8,
  page 6); Additional Information (Section 9, page 7); and the Declaration
  by Applicant (Section 10, page 7). These 10 sections are common to
  **every one of the form's 11 visa categories** — the single richest,
  most-reused part of the specimen.
- **Page 8 — modeled as `documents[]`**: the supporting-documents checklist
  applicable "in respect of all temporary residence visa applications,
  except medical treatment visas" (13 items: valid passport, yellow fever
  certificate, medical report, radiological report, marriage
  certificate/foreign-spousal-recognition, spousal affidavit, divorce
  decree, court order on parental responsibility, death certificate,
  parental consent, proof of adoption, legal separation order, police
  clearance certificates).
- **Pages 9-20 (the twelve category-specific additional-document
  checklists) — deliberately out of scope**, disclosed in the schema's own
  `description`: Study (2 pages), Treaty, Business (established vs.
  establishing, 3 pages combined), Medical Treatment, Relative's, Work:
  General, Work: Critical Skills, Work: Intra-company transfer, Retired
  Person's, and Exchange (2 pages) each have their own independently
  structured document checklist. Modeling all twelve in one v1.0.0 would
  make this schema unreasonably large and each is a legitimate, separately
  scoped future companion candidate — this follows the same
  common-core-first scoping convention already established for e.g.
  `ng/nis/application-for-visa-entry-permit`'s union-of-editions approach
  and `gh/dvla/a2-vehicle-registration`'s OWNER-pathway scoping.

## Scoping and modeling judgment calls

- **The page-1 "Biometric (Attach Fingerprint Form, with Photograph)"
  checkbox is modeled as an independent boolean gate
  (`biometricEnrollmentRequired`), not a 12th `visaCategory` enum value.**
  It is printed immediately after, and visually alongside, the 11
  category checkboxes, but its own parenthetical names an attachment
  action ("Attach Fingerprint Form, with Photograph"), not a permit type —
  disclosed as an interpretive judgment call; a future cycle with a
  clearer source (e.g. official DHA guidance explaining this checkbox)
  should revisit it.
- **Three bounded repeating groups, each modeled via numbered field-name
  suffixes** (this registry's established convention, since the meta-schema
  field.type enum has no array/list member): a 3-slot "other addresses
  lived in the last ten years" table (`otherAddress1`..`3`), a 3-slot
  "relatives and/or friends in the Republic" table
  (`relativeOrFriend1`..`3`), and a 4-slot "family/dependants accompanying
  you" table (`dependant1`..`4`). The specimen prints no fixed row count
  for any of the three — each is modeled with a bounded slot count
  matching this registry's existing precedent for unbounded prose tables,
  and every slot's fields are independently optional so a shorter
  applicant simply leaves the remaining rows blank.
- **`otherDocumentNumber`/`otherDocumentExpiryDate` left as plain optional
  fields, not `requiredWhen`-gated on `otherDocumentType`.** An earlier
  draft gated them on `otherDocumentType notEquals ""`, but this registry's
  own established gotcha (see the `notequals-empty-string-absent-field-bug`
  memory record) flags that pattern as broken against an absent/undefined
  field — a genuinely optional block's sub-fields are left independently
  optional instead, matching precedent elsewhere in this registry.
- **`securityHealthQuestionnaireDetails` gated on an `any` condition across
  all six Section 8 yes/no questions**, mirroring the source's own single
  shared instruction ("Furnish full particulars if the reply to any of
  these questions is in the affirmative") rather than inventing six
  separate detail fields the specimen does not print.
- **`dateOfDivorce` (Section 1) and the `divorceDecree` document (page 8)
  are two independent `requiredWhen: maritalStatus equals divorced` gates**,
  not a single combined one — the source states the divorce order "must be
  attached" directly beneath the date-of-divorce field, but the date field
  and the document are still two structurally distinct things (a data field
  vs. a `documents[]` entry) with separate `requiredWhen` clauses per this
  registry's field/document-are-separate-arrays convention.
- **Dates printed as separate "Year Month Day" labels (e.g. Section 1's
  date of birth) are modeled as a single `date`-typed field**, not three
  separate integer fields — matching this registry's prevailing practice
  for date-of-birth fields elsewhere (e.g. the Lithuania/Ghana/Bulgaria
  schemas authored in recent cycles) over a literal three-box transcription.
- **Classification**: `surname`, `givenNames`, `maidenName`, `stageName`,
  `previousOrAlternativeNames`, `dateOfBirth`, `placeOfBirthTown`,
  `placeOfBirthCountry`, `maritalStatus`, `presentCountryOfCitizenship`,
  `passportNumber`, `residentialAddress`, `postalAddress`,
  `contactPersonName`, and each `dependantN` name/date-of-birth field are
  tagged `pii`. Plain enumerated/boolean/numeric/logistics fields are left
  unclassified.

## Conformance run

Two hand-authored valid fixtures under
`conformance/za/dha/application-for-visa-temporary-sojourn/1.0.0/`:

- **`valid-visitors-visa-first-time.json`** — a never-married visitor's-visa
  applicant with a minimal, all-negative security/health questionnaire and
  no dependants, no other-citizenship, no repeating-group rows — exercises
  the schema's minimal required-field path.
- **`valid-business-visa-divorced-affirmative-security.json`** — a divorced
  business-visa applicant with dual citizenship, one prior address, one
  listed in-Republic relative, one accompanying dependant with a
  later-entry intention, a prior refused-entry/deportation history, and an
  affirmative security-questionnaire answer — exercises the schema's
  `requiredWhen` gates across marital-status, citizenship, asylum,
  re-entry, dependants, and security-questionnaire fields together, plus
  the `divorceDecree` conditional document.

Five mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops `surname`
  (static `required: true`).
- **`mutation-control-invalid-enum-value.json`** — sets `travellingBy` to
  `"spaceship"`, not one of the enum's 4 values.
- **`mutation-control-invalid-date-format.json`** — sets `dateOfBirth` to
  `"14/03/1990"`, not the required `YYYY-MM-DD` shape.
- **`mutation-control-missing-conditional-date-of-divorce.json`** — sets
  `maritalStatus` to `"divorced"` (with `documents_divorceDecree` already
  supplied) without its `dateOfDivorce` companion.
- **`mutation-control-missing-conditional-document.json`** — takes the
  divorced business-visa fixture and drops `documents_divorceDecree`
  without touching any field, isolating the document-side `requiredWhen`
  gate from the field-side one.

All seven fixtures were checked with a from-scratch Node conformance
checker (`/tmp/validate_instance_za.mjs`, not committed — a disposable
script, per this registry's own established practice since no committed
conformance-fixture validator exists) implementing this schema's own
`required`/`requiredWhen`/`documents[].requiredWhen`/enum/date-format
grammar directly:

```
$ node /tmp/validate_instance_za.mjs registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json conformance/za/dha/application-for-visa-temporary-sojourn/1.0.0/valid-visitors-visa-first-time.json
.../valid-visitors-visa-first-time.json: OK (0 errors)

$ node /tmp/validate_instance_za.mjs registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json conformance/za/dha/application-for-visa-temporary-sojourn/1.0.0/valid-business-visa-divorced-affirmative-security.json
.../valid-business-visa-divorced-affirmative-security.json: OK (0 errors)

$ for f in conformance/za/dha/application-for-visa-temporary-sojourn/1.0.0/mutation-control-*.json; do node /tmp/validate_instance_za.mjs registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json "$f"; done
mutation-control-invalid-date-format.json: 1 error(s)
mutation-control-invalid-enum-value.json: 1 error(s)
mutation-control-missing-conditional-date-of-divorce.json: 1 error(s)
mutation-control-missing-conditional-document.json: 1 error(s)
mutation-control-missing-required-field.json: 1 error(s)
```

Both valid scenarios raised 0 errors; all 5 negative controls raised
exactly 1 error each (an initial draft of
`mutation-control-missing-conditional-date-of-divorce.json` raised 2 —
`documents_divorceDecree` was also gated on `maritalStatus: divorced` —
fixed by supplying that document so the fixture isolates the field-side
gate alone).

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator both pass for this document:

```
$ node tools/validate.mjs registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json
ok   registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json
ok   registry/za/dha/application-for-visa-temporary-sojourn/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Closes **South Africa's Visa vertical (6 of 6)** — South Africa now joins
  Colombia, Bulgaria, Romania, North Macedonia, and Ghana as jurisdictions
  with full coverage.
- `jurisdiction.level` is `national` — DHA is South Africa's national
  immigration/civic authority.
- `process.type` is `application`.
- `process.language` is `en` (the specimen is English-only; South Africa's
  other 10 official languages are not represented on this form).
- `authority.url` is DHA's own domain (`dha.gov.za`); `source.url` is
  DIRCO's Paris-mission re-publication of the DHA-1738 specimen, since DHA's
  own domain hosts no direct download of this form — disclosed here rather
  than silently treating DIRCO as the issuing authority.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) authoring one or more of
the twelve category-specific additional-document checklists (pages 9-20)
as companion schemas, starting with the largest/most commonly used
categories (Business, Work: General, Work: Critical Skills); (2) revisiting
the `biometricEnrollmentRequired` judgment call if a clearer DHA source
surfaces; (3) picking up this cycle's three delegated child issues
(Vietnam National ID, Slovakia Taxes, Lithuania GPM311C companion).
