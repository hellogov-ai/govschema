# Verification record — `rs/apr/jrpps-pr-sole-proprietor-registration` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2725** (parent research
cycle **GOV-2723**), authoring the child issue named in **GOV-2716**'s own
cycle: **GOV-2716** scouted Serbia (via APR's JRPPS-PR sole-proprietor
registration) to a strong, ready-to-author candidate and logged it in
`CATALOG.md`'s "Known Gaps & Opportunities" section rather than authoring it
immediately. This schema **opens Serbia as the registry's 48th
jurisdiction**, via Business Formation.

## Duplicate-concurrent-run check

Checked `gh pr list --state all --search "apr"` and `git branch -a | grep -i
rs-apr` before starting — neither found an existing `rs/apr` PR or branch
beyond this run's own `rs-apr-jrpps-pr-gov2725`, so no reconciliation was
needed this cycle.

## Source verification — re-fetched from scratch, not trusted from the prior cycle

The task briefing flagged that `apr.gov.rs` is intermittently flaky and
instructed a retry loop rather than trusting the prior cycle's numbers at
face value. This cycle's own re-fetch found the **live host fully down**,
not merely flaky:

- A retry loop of the source PDF URL directly
  (`https://apr.gov.rs/upload/Portals/0/preduzetnici/2025/JRPPS_PR___Osnivanje_2025_T.pdf`)
  returned **HTTP 500 on all 23 consecutive attempts** (spread across two
  batches, with 3-5s backoff and a browser-like `User-Agent`), each time
  returning the same 39,174-byte generic IIS/ASP.NET error page (confirmed
  by inspecting the response body, which begins `<!DOCTYPE HTML PUBLIC
  "-//W3C//DTD HTML 4.01 Transitional//EN"...`), not a truncated/corrupt PDF.
- A direct fetch of the bare domain root (`https://apr.gov.rs/`) **also
  returned HTTP 500**, confirming this is a site-wide outage rather than a
  path-specific or transient glitch, and ruling out a simple retry-until-200
  approach.
- Fell back to the Wayback Machine as the task briefing's own retry-loop
  instruction did not anticipate a full site outage. The CDX API
  (`web.archive.org/cdx/search/cdx?url=...&output=json`) lists 8 snapshots
  between 2025-05-06 and 2025-09-18, all but one sharing the identical CDX
  content digest `IXDQYCQOK7CEUNBQ7T37KMQQB4GEGREA`.
  - Fetched the most recent snapshot
    (`web.archive.org/web/20250918034911id_/http://www.apr.gov.rs/upload/Portals/0/preduzetnici/2025/JRPPS_PR___Osnivanje_2025_T.pdf`)
    via both the `id_` (raw, unmodified) and `if_` (iframe-embeddable)
    Wayback replay modifiers: **byte-identical**, confirming the replay
    modifier does not alter PDF content (unlike HTML pages, which Wayback
    sometimes banner-injects).
  - Cross-checked against an independent, much-earlier snapshot
    (`20250506092155`, a different calendar month): **also byte-identical**
    to the 20250918 snapshot.
  - **sha256:** `0a7ebff903fa896a6b8c3d14f440d087aa7ec341cdb25cfe04b8b04bd0cc69ca`,
    **412,964 bytes**, valid `%PDF-1.7` header. This is a different
    byte-size than the prior cycle's own scouting figure and than any single
    CDX `length` column value (which records WARC-record length, not object
    length, so is not directly comparable) — since three independent
    fetches (two Wayback replay modes, two snapshot dates) all agree
    byte-for-byte, this is treated as the authoritative current content, not
    a red flag.

## PDF structure, confirmed via `pdfjs-dist` 3.11.174 (legacy build)

- **10 pages**, confirmed genuinely **AcroForm-fillable**:
  `doc.getFieldObjects()` returns **244 distinct field names** (260 total
  field-object entries, since AcroForm radio-button groups share one field
  name across multiple per-value widgets). Of these, **197 distinct field
  names are actually anchored to a visible page** (211 visible widget
  entries across pages 1-10); the remaining ~47 names are orphaned
  parent/master field definitions with no page assignment (`page: -1`), an
  artifact of the shared multi-entity-type JRPPS AcroForm template this
  PR-specific PDF was generated from (e.g. bare `Text33`, `Text34`, ...
  exist as unused parents alongside their real, page-anchored
  `Text33.0`/`Text33.1` children).
- Rendered all 10 pages to PNG via `pdfjs-dist` + `node-canvas` (2.5x scale)
  and visually cross-checked every widget's `rect` against the rendered
  page before modeling any field — not just correlating (x, y) text
  positions blindly. This caught two structural details that text-position
  correlation alone would have gotten wrong or missed:
  1. Page 1's register-selection group (`Radio Button1`, 11 mutually
     exclusive tick-boxes: Register of Business Entities, of foreign
     associations, of sports federations/societies, of bankruptcy estates,
     of endowments/foundations, of chambers of commerce, of associations,
     of representative offices of foreign endowments/foundations, of
     representative offices of foreign chambers of commerce, of health
     institutions, of culture institutions) is a **real, single-choice
     AcroForm radio group** (true PDF radio-button kids sharing one field
     name with distinct export values), not the "independently-named
     sibling widgets" checkbox-group quirk this registry has seen
     elsewhere. It is nonetheless **excluded from `fields[]`**: this
     specific PDF (filename `JRPPS_PR`) is the sole-proprietor-only edition
     of JRPPS, and a sole proprietor filing through it always registers in
     the Register of Business Entities — the other 10 options describe
     entity types wholly out of scope for this schema. Modeling it as an
     11-value open enum would misrepresent this pathway's actual decision
     space (there is no real choice here for a `preduzetnik` filer).
  2. On page 3, the СЕДИШТЕ (seat) address's "`*Број:`" (house number)
     label spans **two adjacent text widgets** (`Text36.0`, `Text37.0`)
     with no distinguishing sub-label of its own — visually confirmed via
     an overlay render (widget rects drawn directly on the rendered page)
     that both widgets sit inside what appears as a single continuous input
     box. This is inconsistent with every other address block on this form
     (the applicant's page-1 address, the page-3 postal-receipt address,
     and each of the three page-7 branch-location addresses), all of which
     print a single combined "`Број и слово:`" (Number and letter) label
     over exactly two widgets, one per named concept. Modeled as: the first
     widget (`Text36.0`) → `seatHouseNumber` (matching the "Број:"-only
     label, one concept); the second widget (`Text37.0`) is **excluded** as
     an unlabeled structural duplicate rather than invented a "suffix" or
     "letter" meaning it has no printed support for — the seat's actual
     letter suffix is captured separately by the adjacent, clearly-labeled
     `слово:` widget (`Text23`), which does have its own field
     (`seatHouseLetter`).
- Every other repeating checkbox/radio group on this form follows the
  registry's already-documented quirk (independently-named sibling widgets
  standing in for a single-choice concept) and is modeled by intent, not
  raw plumbing, per the task briefing's own instruction — e.g.
  `businessNameDesignation` (пословно име: "ПРЕДУЗЕТНИК" vs. "ПР"),
  `businessActivityStartOption`, `socialInsuranceBasis`,
  `qualificationLevel` (14 tick-boxes → one enum), and each translation
  block's foreign-language/national-minority-language pair.

## Field-scoping judgment calls

- **Two overlapping "seat" fields, on different pages, both kept.**
  `registeredSeatPlace` (page 2, part of the business-name construction:
  "Пословно име ... и место у ком је седиште предузетника") and
  `seatMunicipality`/`seatPlace`/`seatStreet`/etc. (page 3, the full
  СЕДИШТЕ address block) both capture the seat, but are genuinely separate
  AcroForm widgets appearing at different points in the source document.
  Both are modeled rather than silently merged, with the overlap disclosed
  on `registeredSeatPlace`'s own `description`.
- **Three distinct e-mail fields, all kept.** `applicantEmail` (page 1,
  optional, the submitter's own contact e-mail — the submitter may be a
  proxy, not the sole proprietor), `businessEmailAddress` (page 3, required,
  "Адреса за пријем електронске поште је обавезан предмет регистрације" —
  the business's official e-mail of record) and `taxAuthorityEmail` (page 9,
  required, collected specifically so the Tax Administration can verify
  reachability of newly-founded taxpayers) are three separate widgets on
  the source, likely the same address in practice but not guaranteed to be,
  and are modeled as three separate fields with cross-references disclosed
  in each one's own `description`.
- **`coverPageBusinessName` (page 1, "НАЗИВ:").** Ambiguous relative to the
  page-2 componentized business-name construction; disclosed as a judgment
  call on the field's own `description` rather than silently assumed
  equivalent or dropped. The adjacent "МЕСТО ЗА БАРКОД / додељује АПР"
  (barcode area, assigned by APR) is excluded as staff/system-populated.
- **`qualificationLevel` modeled `required: true` despite no printed
  asterisk.** The form's own instructional text is unambiguous mandatory
  language — "Обавезно уписати шифру стручне спреме предузетника"
  (Mandatory to enter the sole proprietor's qualification code) — even
  though this section (like `socialInsuranceBasis`) is explicitly stated to
  not itself be a subject of registration, only data collected to feed the
  CROSO M-form and Tax Administration applications APR files alongside
  registration. This is the one field in the schema marked `required: true`
  without a printed asterisk; every other required-field determination
  follows the source's own asterisk convention.
- **"At least one of two phone numbers" not machine-enforced.** Page 9
  states "*(обавезно унети један од телефонских бројева)" (mandatory to
  enter one of the phone numbers) for `taxAuthorityPhoneFixed` /
  `taxAuthorityPhoneMobile`. GSP-0013's Condition grammar has no clean
  "at least one of two independently-optional fields" construct (only
  `requiredWhen` gated on a single condition, or `crossFieldValidation`'s
  `requirePresent` under a `when` gate) — encoding this would require an
  artificial helper condition not grounded in any real form field, so this
  business rule is disclosed in both fields' own `description` rather than
  structurally enforced, consistent with this repository's established
  `notEquals`-against-an-absent-field avoidance discipline (no field-absence
  operator exists in the grammar).
- **`businessFantasyName` → `businessActivityDescription` cross-requirement
  disclosed, not enforced.** The form states that if a `Назив` (fantasy
  name) is entered, `Предмет пословања` (business activity description)
  must also be entered. Encoding this as `requiredWhen: { field:
  businessFantasyName, notEquals: "" }` would trigger this registry's
  known bug class (no field-absence operator; `notEquals ""` against an
  `undefined` value evaluates `true` regardless, making the field
  effectively always-required) — disclosed in `businessFantasyName`'s own
  `description` instead.
- **`activityPermitOrLicense`/`procurationWrittenAuthorization` conditional
  documents left `required: false`, not `requiredWhen`-gated.** Both are
  genuinely conditional per the page-10 checklist's own prose (on
  regulated-activity status and on whether a procuration was granted,
  respectively), but neither condition is backed by a single boolean field
  in `fields[]` that cleanly captures it (procurator fields are all
  optional strings; there is no single "activity requires a permit"
  toggle) — modeled `required: false` with the condition disclosed in each
  document's own `description`, mirroring this registry's `rw/rdb`
  precedent for `evidenceOfPaymentOfFee`.
- **Two `attestation`-category `documents[]` entries, each anchored to a
  verbatim printed statement (SPEC §9.1).** `applicantSignature` quotes
  page 1's own declaration ("Потписивањем регистрационе пријаве подносилац
  одговара за тачност унетих података.") and is `required: true`. A second,
  narrower attestation, `vatRegistrationApplicantSignature`, quotes page 9's
  own VAT-specific declaration ("ПОДНОСИМ ПРИЈАВУ ЗА ЕВИДЕНТИРАЊЕ ОБВЕЗНИКА
  ПОРЕЗА НА ДОДАТУ ВРЕДНОСТ") and is `requiredWhen vatRegistrationRequested
  equals true` — a distinct declaration/signature line specific to the
  optional VAT sub-request, not a duplicate of the page-1 signature.
- **Bounded repeating groups, not open-ended arrays.** Page 6 (procurators:
  1 individual + up to 3 joint) and page 7 (up to 3 branch/separate
  operating locations) are each modeled as a fixed number of flat,
  numbered fields (`jointProcurator1FirstName`.. `jointProcurator3...`,
  `branchLocation1ActivityCode`.. `branchLocation3...`), matching the
  source's own printed capacity per page and its own instruction to
  photocopy additional copies of that page for further repetitions beyond
  what is printed — consistent with this registry's established
  bounded-repeating-group convention (cf. Denmark/Finland `entrantN`/
  `childN` precedent).
- **`predominantActivityCode`/branch `ActivityCode` pattern.** Modeled with
  `validation.pattern: "^\\d{4}$"`, matching the form's own comb-style
  4-box digit entry and its instructional text ("...навођењем одговарајуће
  четвороцифрене шифре...", four-digit code).
- **`vatEstimatedTurnover12Months` minimum.** Modeled with
  `validation.minimum: 8000001`, matching the form's own printed floor
  ("*обавезно унети податак у износу од најмање 8.000.001,00 динара или
  више").

## Conformance fixtures

Two valid scenarios (0 errors each) plus nine mutation-control fixtures
(each raising exactly one error), committed under
`conformance/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/`, checked
with a purpose-written ad hoc script (`validate_instance.mjs`, mirroring
this registry's established per-session pattern since no committed
conformance-fixture validator exists): performs static `required`/`type`/
`pattern`/`enum`/`minimum`/`maximum` checks plus a from-scratch evaluator
for the shared Condition grammar (`requiredWhen`/`documents[].requiredWhen`/
`exclusivityGroups`).

```
$ node validate_instance.mjs schema.json sole-proprietor-indefinite-lump-sum-no-vat.json
sole-proprietor-indefinite-lump-sum-no-vat.json: 0 error(s)

$ node validate_instance.mjs schema.json sole-proprietor-fixed-term-vat-with-procurator.json
sole-proprietor-fixed-term-vat-with-procurator.json: 0 error(s)

$ node validate_instance.mjs schema.json mutation-control-missing-required-field.json
mutation-control-missing-required-field.json: 1 error(s)
  MISSING REQUIRED: entrepreneurFullName

$ node validate_instance.mjs schema.json mutation-control-invalid-enum-value.json
mutation-control-invalid-enum-value.json: 1 error(s)
  VALIDATION ERROR: businessNameDesignation: value "sole-trader" not in enum ["preduzetnik","pr"]

$ node validate_instance.mjs schema.json mutation-control-invalid-date-format.json
mutation-control-invalid-date-format.json: 1 error(s)
  TYPE ERROR: registeredUntilDate: expected ISO date string, got "31-12-2030"

$ node validate_instance.mjs schema.json mutation-control-email-pattern-violation.json
mutation-control-email-pattern-violation.json: 1 error(s)
  VALIDATION ERROR: businessEmailAddress: value "not-an-email" does not match pattern ^[^@\s]+@[^@\s]+\.[^@\s]+$

$ node validate_instance.mjs schema.json mutation-control-missing-conditional-registered-until-date.json
mutation-control-missing-conditional-registered-until-date.json: 1 error(s)
  MISSING REQUIRED: registeredUntilDate

$ node validate_instance.mjs schema.json mutation-control-missing-conditional-apr-org-unit-name.json
mutation-control-missing-conditional-apr-org-unit-name.json: 1 error(s)
  MISSING REQUIRED: aprOrgUnitName

$ node validate_instance.mjs schema.json mutation-control-missing-conditional-vat-primary-activity-code.json
mutation-control-missing-conditional-vat-primary-activity-code.json: 1 error(s)
  MISSING REQUIRED: vatPrimaryActivityCode

$ node validate_instance.mjs schema.json mutation-control-missing-required-document.json
mutation-control-missing-required-document.json: 1 error(s)
  MISSING REQUIRED DOCUMENT: proofOfIdentity

$ node validate_instance.mjs schema.json mutation-control-exclusivity-group-violation.json
mutation-control-exclusivity-group-violation.json: 1 error(s)
  EXCLUSIVITY GROUP VIOLATION: lumpSumVsPersonalSalaryElection: more than one of ["lumpSumTaxationRequested","personalSalaryPayoutElection"] is true
```

Both meta-schema validators were run against the finished document and pass clean:

```
$ node tools/validate.mjs registry/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/schema.json
ok   registry/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/schema.json
ok   registry/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Serbia's other verticals

Serbia opens at 1 of 6 verticals (Business Formation) via this schema.
DMV, Taxes, Visa, National ID, and Passport are open, unscreened backlog
candidates for future cycles.
