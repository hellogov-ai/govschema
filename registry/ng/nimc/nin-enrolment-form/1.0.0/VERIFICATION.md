# Verification record — `ng/nimc/nin-enrolment-form` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2569** (child of **GOV-2567**).
It closes Nigeria's National ID & Civic Documents vertical, sourced from the
National Identity Management Commission's (NIMC) "National Identification
Number (NIN) Enrolment Form", v2.0 — the pre-enrolment form an applicant
completes before attending an NIMC enrolment centre in person for biometric
capture.

## Sources examined

### Source 1 — the PDF itself (chosen as `source.url`)

- **URL:** <http://bern.foreignaffairs.gov.ng/wp-content/uploads/sites/32/2022/03/enrolment_form_v2.pdf>
  — the Nigerian Ministry of Foreign Affairs' own Bern (Switzerland) embassy
  subsite. Fetched directly via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **1,677,660 bytes**,
  `sha256: 99200bb832d4463e6bcdf8be78dd08ed14241d614a407830dc86093855af9638`.
  Re-checked live at verification time — still HTTP 200, unauthenticated, no
  login/paywall/CAPTCHA gate.

### NIMC's own domain no longer serves this document — disclosed, not a dead end

- The scouting pass for this cycle (a subagent search under GOV-2567) found
  that NIMC's own historical static path
  (`nimc.gov.ng/docs/reports/enrolment_form_v2.pdf` and sibling paths) now
  returns NIMC's redesigned React SPA shell / 404, not the PDF. A Wayback
  Machine CDX check (reported by the scouting pass, not independently
  re-run in this write-up) shows the direct PDF resolved from 2016 through
  late 2023, then began returning the SPA shell from 2024 onward — consistent
  with a 2024 site redesign, not a withdrawal of the underlying form. The
  Bern-embassy mirror is an official `.gov.ng`-domain copy of the identical
  NIMC document (same "v2.0" watermark printed on the form itself), used
  here as `source.url` since it is the reachable official copy, following
  this registry's established practice of citing the best reachable
  official-domain mirror when a primary agency domain's static path has
  moved (cf. `ng/nis`'s embassy-mirror sourcing last cycle, GOV-2561).
- Two other Nigerian-embassy paths for the same form (Nigeria's Washington
  DC and London missions) were checked opportunistically during this
  schema's authoring and returned the same v2.0 form byte-for-byte
  (`sha256` matched the Bern copy), corroborating rather than contradicting
  the primary source, but are not separately cited as a second `source.url`
  per this registry's single-source convention.

### Source 2 — direct `pdfjs-dist` text-layer extraction (own re-derivation)

- This specimen carries **zero AcroForm widgets** — confirmed via
  `page.getAnnotations()` returning an empty array on both of the
  document's 2 pages — a flat, print-and-hand-fill form, the same tier as
  this registry's `rw/dgie`, `ng/nis`, and `ng/firs` specimens (no
  `Widget`/`FT` objects to derive field names, charLimits, or radio
  structure from, unlike the AcroForm-backed `gh/nia` specimen).
- Full-page `getTextContent()` was extracted with each item's `transform`
  matrix (x/y in PDF space) preserved, then grouped by rounded y-coordinate
  into printed lines and cross-checked against every literal `"*"` glyph's
  own (x, y) position to determine, field by field, which of the form's ~110
  printed blanks/checkboxes the form itself marks mandatory. The form's own
  footer instruction, printed on both pages, is unambiguous: **"ALL FIELDS
  MARKED * MUST BE FILLED."**
- 18 lettered sections (A–R) were identified from the section-heading
  glyphs (each printed as an isolated single capital letter at a fixed
  right-margin x-coordinate, e.g. `x≈481–503`) and used directly as this
  schema's `sourceRef` section labels.

## Field inventory and scoping/disclosure decisions

- **104 `fields[]` + 1 `documents[]` entry**, covering all 18 sections.
  Enum-shaped printed checkbox groups with named candidate values (e.g.
  Title, Marital Status, Education Level, Religion, Employment Status,
  Residence Status, Date of Birth Verification, Home Delivery Yes/No) are
  each modelled as a single `enum` field, per this registry's established
  Nigeria-vertical convention (`ng/nis`'s `sex`/`maritalStatus`/
  `numberOfEntriesRequired` fields), rather than N-boolean-plus-
  `exclusivityGroups` (the convention `gh/nia` used for a different
  jurisdiction's AcroForm checkbox groups) — the source form's own printed
  candidate lists make the enum boundary directly readable without needing
  AcroForm widget evidence.
- **Non-exclusive checkbox groups** — Section H's physical-marks row
  (Tribal Marks / Hunch Back / Visible Scars / Others) and Section I's
  physical-challenges row (Blind / Deaf / Dumb / Paralyzed / Others) — are
  each modelled as N **independent optional booleans**, not an `enum` or
  `exclusivityGroups` group, since an applicant can plausibly have more than
  one mark or challenge simultaneously; no `exclusivityGroups` entry is
  declared for either group (disclosed here rather than silently omitted).
- **`isHomeless`** gates the five residence-address fields
  (`townCityOfResidence`, `countryOfResidence`, `stateOfResidence`,
  `lgaOfResidence`, `addressOfResidence`) via `requiredWhen: {field:
  "isHomeless", equals: "no"}` — a disclosed inference from the form's own
  printed "IF NO, WHERE DO YOU LIVE?" instruction, since the form prints a
  `*` on each address field unconditionally (no separate "if no" marking
  distinguishes the two Yes/No branches in the raw asterisk layer).
  `residencePostalCode` remains unconditionally optional (no asterisk on
  either branch).
- **Section B (previous name)** carries no Yes/No checkbox of its own — only
  a section heading ("HAVE YOU CHANGED YOUR NAME BEFORE?") followed
  directly by three blanks, none asterisked. Modelled as three independently
  optional fields with no gating condition, since no boolean trigger exists
  on the form to condition on.
- **Section K (existing NIN, "FOR APPLICANT'S PERSONAL DATA UPDATE ONLY")**
  carries no asterisk and is modelled as an unconditionally optional field,
  disclosed in its own description as applicable only to the update use
  case rather than first-time enrolment; the form provides no separate
  boolean distinguishing "first enrolment" from "update" requests to gate
  it on.
- **Section O (Guardian Details)** prints `*` on Surname, First Name, and
  National Identification Number (not Middle Name) with no separate
  toggle distinguishing a minor/dependent applicant (who would plausibly
  need a guardian) from an adult self-enrolling applicant. This schema
  takes the form's asterisks at face value — `guardianSurname`,
  `guardianFirstName`, and `guardianNin` are modelled `required: true`
  unconditionally — following the form's own blanket "ALL FIELDS MARKED
  MUST BE FILLED" instruction rather than inferring an unstated conditional
  trigger the source does not print. This is flagged explicitly as a
  disclosed judgment call, not a silent pass-through: a future review with
  access to NIMC's own internal completion guidance could reasonably
  revise this to a conditional (e.g. gated on an applicant-is-a-minor
  signal this form does not itself carry).
- **Section L (Supporting Documents)** — 9 named document types (Any
  Identity Reference, Immigration Document, National Insurance, Nigeria
  Driver Licence, Nigerian Passport, Other Designated Document, Other
  National Identity Card, Other Passport, Other Travel Document), each with
  a Document Number and Document Expiry Date blank, none asterisked.
  Modelled as 18 independently optional `fields[]` entries (not
  `documents[]`) since each captures structured data (a number and a date)
  rather than a simple provided/not-provided attachment flag — consistent
  with how this registry models identity-document-number fields elsewhere
  (cf. `gh/nia`'s institutional-ID fields) rather than as `documents[]`
  entries, which are reserved here for the form's actual attestation.
- **No `maxLength` values are derived from AcroForm `charLimit`** (unlike
  `gh/nia`), because this specimen has no AcroForm at all. Free-text
  `maxLength` values are round-number estimates in the same spirit as this
  registry's other flat-form schemas (`ng/nis`'s 100–200-character
  estimates), not a structural fact — disclosed here rather than presented
  as source-derived.
- **NIN-number fields** (`existingNin`, `fathersNin`, `mothersNin`,
  `guardianNin`, `nextOfKinNin`) are modelled as plain strings with a
  generous `maxLength: 20` and no digit-only `pattern`. Nigeria's NIN is
  widely documented elsewhere as an 11-digit number, but this specimen
  itself prints no character-count guide on these blanks, so no pattern
  constraint is asserted from this source — a deliberate choice not to
  import an external fact the form itself does not state.
- **`applicantDeclaration`** (`documents[]`, category `attestation`) quotes
  the form's own certification paragraph verbatim, including its citation
  of "the NIMC Act 23 of 2007," confirmed still in force via a fresh web
  search (NIMC continues to describe itself, and to be described in current
  reporting, as operating under the National Identity Management Commission
  Act No. 23 of 2007).
- **No `documents[]` entry models the raw signature/thumbprint capture** —
  the source prints only a dotted signature line (this is a flat,
  non-AcroForm PDF, so there is no capture widget to exclude in the first
  place); `signatureDate` is modelled as a required `date` field instead,
  consistent with this registry's general practice of not modelling raw
  biometric/signature capture as a schema field.

## Conformance run

Two valid fixtures were built against `schema.json` with a from-scratch,
ajv-free checker script (evaluates `required`/`requiredWhen` with visibility
gating, per-type `validation` keywords, and `documents[]`
`required`/`requiredWhen` directly against the meta-schema's own rules) — not
any author-provided tooling, since no shared `tools/conformance-runner.mjs`
exists yet in this repo:

- `single-adult-first-time-enrolment-not-homeless.json` — an unmarried
  female Nigerian applicant, not homeless (exercising the `isHomeless`-gated
  `requiredWhen` branch that requires residence-address fields), first-time
  enrolment (no `existingNin`). **0 errors.**
- `married-personal-data-update-with-supporting-document.json` — a married
  male applicant with a prior name change (Section B), a personal-data-update
  request (`existingNin` populated), a Nigerian Passport supporting document
  (Section L), a tribal mark and a paralysis physical challenge (exercising
  the independent, non-exclusive checkbox fields), and homeless (exercising
  the opposite `isHomeless` branch, where residence-address fields are
  correctly not required). **0 errors.**

Five mutation-control fixtures, each a single deliberate violation of the
first valid fixture, each correctly raised **exactly 1 error**:

- `mutation-control-missing-required-field.json` — removes `lastname`
  (required) → 1 error.
- `mutation-control-invalid-date-format.json` — sets `dateOfBirth` to
  `"14-03-1998"` (not `YYYY-MM-DD`) → 1 error.
- `mutation-control-invalid-enum-value.json` — sets `gender` to `"X"` (not
  in the `["M","F"]` enum) → 1 error.
- `mutation-control-missing-conditional-field.json` — removes
  `townCityOfResidence` while `isHomeless` remains `"no"` → 1 error
  (`requiredWhen` violation).
- `mutation-control-missing-required-document.json` — omits the
  `applicantDeclaration` document → 1 error.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (JSON Schema
draft 2020-12 meta-schema conformance) both pass clean for
`registry/ng/nimc/nin-enrolment-form/1.0.0/schema.json`.

## Backlog note

Nigeria now stands at **4 of 6 verticals** (Business Formation, Taxes, Visa,
National ID). DMV was confirmed a dead end in a prior cycle (GOV-2561: FRSC
state licensing is SSO-portal-gated with no downloadable specimen). Passport
remains the sole open backlog vertical — this cycle's scouting also
identified a strong candidate, NIS "Form C1" (Application for Nigeria
Standard Passport), reachable unauthenticated via the Nigeria High
Commission London's own mirror
(`nigeriahc.org.uk/wp-content/uploads/2023/05/LostReqForm.pdf`, ~35–40
fields plus a guarantor's Form of Undertaking), left for a future cycle.
Rwanda's Business Formation vertical (RDB "RF-001 Domestic Company
Application for Incorporation",
`businessprocedures.rdb.rw/media/2.5_rf-001%20domestic%20company.pdf`, 18
numbered sections) was also scouted this cycle as a strong candidate and
left open for a future cycle.
