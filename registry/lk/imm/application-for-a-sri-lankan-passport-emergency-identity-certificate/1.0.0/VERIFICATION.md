# Verification record — `lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2716**. It opens **Sri Lanka**
as this registry's 47th jurisdiction, via its Passport vertical.

## Candidate screening this cycle

This cycle first re-screened the one previously-flagged open gap in an
already-open jurisdiction — **Ghana's DMV vertical** (called out as Ghana's
"sole remaining open backlog vertical" per this catalog's prior update) — and
confirmed it a **dead end**: `dvla.gov.gh` has been rebuilt on a modern stack
(a Next.js marketing site, plus a Nuxt.js "online services" SPA at
`service.dvla.gov.gh`), but the online system is fully login-gated behind an
email/password wall with no public registration or application form exposed
before authentication (confirmed by fetching the raw HTML: only a login form,
no sign-up/new-applicant path). Every web search result independently
confirms the paper Forms F/F1 are purchased in person at DVLA offices, not
published as a downloadable specimen. A Wayback Machine CDX sweep of
`dvla.gov.gh`'s historical `/assets/dvla/media/forms` and `/publications`
paths turned up only a driving-school-registration form, public notices
("Change of Ownership of Motor Vehicle" — a notice, not a form, confirmed via
`pdfjs-dist`: real text layer, but pure prose, 0 form fields), and other
non-form publications — no citizen-fillable driver's-licence or
vehicle-registration application. Also independently re-confirmed (direct
`curl` fetch, HTTP 200 serving an "Accesso negato" access-denied page) this
registry's own prior GOV-2382 dead-end finding for Italy's four remaining
verticals (Passport, Business Formation, National ID, Visa).

With both pre-flagged leads confirmed dead, this cycle scouted three
new-jurisdiction candidates in parallel — Sri Lanka, Serbia, and Jordan, each
via an independent research pass across all six verticals. All three produced
at least one strong, genuinely unauthenticated, field-rich candidate:

- **Sri Lanka** — Passport (Department of Immigration & Emigration): a
  genuine **AcroForm-fillable** PDF, 35 Widget annotations, English field
  labels. **Selected** (see below) — the only true AcroForm among the three
  candidates found this cycle, and Passport is one of the task's named
  priority verticals.
- **Serbia** — Business Formation (APR's JRPPS-PR sole-proprietor
  registration form): also AcroForm-fillable, 150+ fields, but the host
  (`apr.gov.rs`) is intermittently flaky (HTTP 500 on some attempts). Strong
  runner-up candidate for a future cycle.
- **Jordan** — Taxes (ISTD's employee personal income tax return): a flat,
  non-AcroForm PDF with a genuine coded-line-item text layer, comparable in
  richness to this registry's other Taxes-vertical schemas. Strong runner-up
  candidate for a future cycle.

## Source verification (independently re-derived)

- **URL:** `https://www.immigration.gov.lk/content/files/applications/passport_application.pdf`
- Located via web search; corroborated by the department's own
  `pages_e.php?id=7`/`id=24` service pages, which describe the same
  application process this form supports.
- Fetched independently via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 1,200,324`
    bytes, stable across repeated fetches.
  - **`sha256`:** `02c3c01165f6bccd19a2295e4e40437d519e1f82e079936b0572e041df4760a1`
    (computed via `sha256sum` on the freshly-downloaded file).
- Parsed with `pdfjs-dist@4` (legacy build): `getAnnotations()` /
  `getFieldObjects()` confirm **35 Widget annotations** across the document's
  2 pages (30 on page 1, 5 on page 2) — 24 text fields (several using the
  PDF's own `comb` flag with a printed per-character-box `charLimit`, e.g.
  `Surname1`/`Surname2` each `charLimit` 22, `NIC No` `charLimit` 12,
  `Mobile Phone` `charLimit` 10) and 11 checkbox fields. Cross-checked against
  `getTextContent()`'s full, clean English text layer (the form's own
  numbered items 1-21) to derive every field's label, requiredness cue
  (explicit "(If any)" markers), and option grouping.
- Also fetched the department's separate "Instructions to Passport
  Applicants" PDF
  (`immigration.gov.lk/content/files/applications/instructions_english_td.pdf`,
  HTTP 200, 6,541,214 bytes) specifically to check for a printed
  supporting-documents checklist to model as `documents[]`; `pdfjs-dist`
  confirms **0 extractable text characters** across its 2 pages — a
  scanned-image document, not usable as a source for a field-by-field
  checklist. `pages_e.php?id=7` (fetched via WebFetch) was also checked and
  does not print an itemized checklist either. No `documents[]` array is
  modelled in this v1.0.0 as a result — a disclosed scoping gap, not an
  assumption that no supporting documents are required.

## Document structure and scope

- **Two pairs/one group of printed mutually-exclusive checkbox options are
  each independently-named sibling AcroForm widgets, not a true PDF radio
  field**: "Type of Service" (`TOS Normal`/`TOS 1day`), "Sex" (`SexF`/`SexM`),
  "Dual Citizenship" (`DCitizenship Y`/`DCitizenship N`), and "Type of Travel
  Document" (`TOTDR.AC.0`-`TOTDR.AC.3`, four options) all lack a shared
  parent field or `/Ff` radio-group flag in the underlying PDF. This schema
  models each group's clear single-choice printed intent as a single `enum`
  (or `boolean`, for the two-way Dual Citizenship question) field — a
  disclosed judgment call over a literal one-checkbox-per-widget dump,
  consistent with this registry's general practice of modelling the form's
  intent rather than its raw AcroForm plumbing.
- **Item 18 ("Foreign Passport No.") exports from the AcroForm as field name
  `"17 Foreign Passport No"`** — an off-by-one artifact in the source PDF's
  own internal field naming relative to its own printed item number (18),
  disclosed in the field's own `description` rather than silently corrected.
- **Item 19 (father/guardian and mother/guardian NIC/travel-document numbers,
  for applicants under 16) has no applicant-fillable gating field anywhere on
  the form** — no "this application is for a child under 16" checkbox exists
  to condition on. Both fields (`fatherGuardianNationalIdOrTravelDocumentNumber`,
  `motherGuardianNationalIdOrTravelDocumentNumber`) are modelled as optional,
  with the conditional context recorded in `description` rather than a
  fabricated `requiredWhen` referencing a non-existent field; a consuming
  agent can derive applicability from the already-modelled `dateOfBirth`.
- **`surname`/`otherNames`/`permanentAddress` each collapse two printed comb
  text boxes** (22 characters each) into a single logical field, consistent
  with this registry's `th/mfa` precedent for the same multi-line-continuation
  pattern.
- **`dateOfBirth` collapses three printed comb boxes** (Date/Month/Year) into
  a single canonical ISO date.
- **`email`'s `maxLength` of 22 is a genuine specimen constraint** (the
  source PDF's own comb text box), not an editorial choice — recorded as
  printed, disclosed here as likely too short for many real e-mail addresses.
- **No printed required-field asterisks exist for most items.** Only fields
  the form's own prose marks as core identity/contact data, or that are
  logically unconditional (service type, travel document type, NIC number,
  surname, other names, permanent address and district, date of birth, place
  of birth, sex, dual-citizenship yes/no, mobile number, e-mail, and the
  declaration date) are marked `required`. Items explicitly flagged "(If
  any)" (`presentTravelDocumentNumber`, `nmrpNumber`) and items with no
  printed cue of mandatoriness (`profession`, birth-certificate number/
  district, the two guardian ID fields) are modelled but left optional — a
  disclosed judgment call, mirroring this registry's `th/mfa`/`gh/mfa`
  precedent for forms without printed asterisk markup.
- Items 20 (photograph-placement instructions) and the office-only
  Controller's Order / DC-AC signature / PPT-tracking block below the
  declaration are staff/physical artifacts, out of scope, consistent with
  this registry's `gh/nia`/`gh/gis` precedent.

## Validation runs

- `node tools/validate.mjs registry/lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate/1.0.0/schema.json` — **passes**.
- `node tools/validate-ajv.mjs registry/lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate/1.0.0/schema.json` — **passes** (draft 2020-12, spec v0.3 meta-schema).
- A from-scratch conformance-checker script (scratch, not committed —
  evaluates `required`/`requiredWhen`/`validation.pattern`/`maxLength`/`enum`
  against each fixture) found: both `valid-*.json` scenarios raise **0
  errors**; each of 6 `mutation-control-*.json` fixtures raises **exactly 1
  error**. See
  `conformance/lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate/1.0.0/`.

## Out of scope, disclosed

- `documents[]` — no checklist is printed on the form itself, and the
  department's separate "Instructions" PDF is a zero-text scanned image; not
  modelled.
- Item 20 (photograph placement) and the office-only declaration/tracking
  block — staff/physical artifacts, excluded.
- No online/e-passport application channel was identified for this specific
  paper form during this cycle's scouting — this schema models only this
  paper form.
