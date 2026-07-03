# Verification record — `de/auswaertiges-amt/national-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Germany's national visa application

This is the recurring "GovSchema Standard Research" cycle
([GOV-815](/GOV/issues/GOV-815)). Visa remains the registry's weakest
vertical: after `ie/irishimmigration/short-stay-visa-avats` (GOV-803) closed
Ireland's gap, Visa stood at 7/9 jurisdictions, with SG and DE the only gaps
left — both already recorded as `candidate`-status catalog entries from a
prior discovery pass (`sg/ica/visa-application-save`,
`de/auswaertiges-amt/national-visa-consular-services-portal`). Of the two,
Germany was judged more tractable this cycle: the Federal Foreign Office
publishes its national-visa application as a single canonical, uniformly
used PDF form, whereas Singapore's SAVE service requires a Singpass-holding
local contact or an authorised visa agent's own account — a harder
sourcing problem left for a future cycle. This document closes the DE x
Visa cell (Visa now 8/9; SG remains).

## Sources examined

- **Document `(id, version)`:** `de/auswaertiges-amt/national-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Foreign Office (Auswärtiges Amt).
- **Primary source (field-by-field, the form itself):**
  <https://www.auswaertiges-amt.de/resource/blob/207850/f9342033f2933dc05da54151efe283db/aufenthalten-data.pdf>,
  the Federal Foreign Office's own canonical, bilingual German/English
  "Antrag auf Erteilung eines nationalen Visums" / "Application for a
  national visa" (5 pages), fetched directly (HTTP 200, no access block) and
  text-extracted with the registry's established `pdfjs-dist` technique
  (the PDF carries no AcroForm/XFA fields — despite a "-data" filename
  suffix — so it is a plain printed-form text layer, the same class as
  several other static PDFs already used in this registry). Cross-checked
  byte-for-byte identical in extracted text against a second, independently
  hosted copy at a German mission's own site
  (`https://dhaka.diplo.de/resource/blob/2081380/d7f0cecc3a5d78522cf3c035d2942c62/antrag-d-visa-data.pdf`),
  confirming this is the single form every mission uses, not a
  jurisdiction-specific variant.
- **Landing/context page:**
  <https://www.auswaertiges-amt.de/en/visa-service/visumantragformulare-d/231156>
  ("Application forms for longer-term stays in Germany (national visa,
  category D)"), which lists this same bilingual form alongside seven other
  German-paired language variants (French, Spanish, Arabic, Chinese,
  Portuguese, Russian, Turkish) — corroborating that this is the single,
  purpose-agnostic national-visa form, not one of several purpose-specific
  forms.
- **Portal overview page:**
  <https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal>
  and <https://digital.diplo.de/>, describing the Consular Services Portal's
  four-phase process (online registration/submission with uploaded
  documents → preliminary completeness review → appointment scheduling →
  in-person biometrics/fee/original-document check) and confirming it has
  been "fully online since Jan 2025 for 28 long-stay purposes," explicitly
  excluding Schengen (short-stay) visas.
- **Live system verification (Consular Services Portal, digital.diplo.de).**
  A headless Playwright/Chromium session with a realistic desktop user
  agent reached every **public** page with no access block: the portal
  homepage; the top-level purpose menu (Opportunity Card, Blue Card (EU),
  Family reunification, Taking up employment, Studies and Search for a
  place to study, Vocational training and advanced training); the "Blue
  Card (EU)" and "Employment as an academic" pages, each with a searchable
  country-of-residence combobox (confirmed live: typing "India" and
  pressing Enter reveals a live-rendered German-mission radio-button list —
  Bangalore, Chennai, Kolkata, Mumbai, New Delhi — each annotated with the
  Indian states/union territories it covers) and an "Apply online now"
  button that stays disabled until both a country and a mission are picked.
  Clicking "Apply online now" after selecting country+mission triggers a
  redirect chain to `sso.digital.diplo.de/auth/realms/AUSLPORTAL/...`
  (a Keycloak identity-provider realm) and returns to
  `digital.diplo.de/silent-check-sso.html#error=login_required` — confirming
  the actual data-entry screens require Bund ID/portal-account
  registration and sign-in before any field is rendered, the same
  login-gated-form class already recorded elsewhere in this registry (e.g.
  `nz/dia/realme-verified-identity`). No credentials were available or used;
  no account was created. Per **source-of-truth fidelity**, this document
  is authored from the Federal Foreign Office's own canonical PDF instead —
  the same form the portal's own description says it digitises — rather
  than from the gated screens.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What the PDF's 16 sections map to

- **Section 1** (applicant identity, travel document, current address/
  contact) → `surname` through `mobilePhone`.
- **Section 2** (spouse/registered partner) → `spouseSurname` through
  `spousePlaceOfResidence`, gated on `maritalStatus` being `married` or
  `civil union`.
- **Section 3** (children, including those over 18, "also required if
  remaining abroad") → `childrenCount`/`childrenDetails`, collapsing the
  source's repeating table into one free-text field once populated — the
  same treatment `ie/irishimmigration/short-stay-visa-avats` uses for its
  own small repeating tables (`dependentChildrenDetails`,
  `previousStaysDetails` below).
- **Section 4** (parents, "required even if the persons concerned remain
  abroad") → `fatherSurname`.."motherPlaceOfResidence`, all `required: true`
  since the source form does not condition this section on anything.
  `fatherDateAndPlaceOfBirth`/`motherDateAndPlaceOfBirth` are each a single
  field because the source table combines date-and-place-of-birth into one
  column for this section (unlike Section 1's separate boxes for the
  applicant).
- **Section 5** (previous stays in Germany, up to five, month/year) →
  `previouslyInGermany`/`previousStaysDetails`.
- **Section 6** (intended place of stay, accommodation type) →
  `intendedStayStreet` through `otherAccommodationDetails`.
- **Section 7** (permanent residence maintained abroad) →
  `maintainsPermanentResidenceOutsideGermany`/`permanentResidenceLocation`.
- **Section 8** (accompanying family) →
  `familyMembersAccompanying`/`accompanyingFamilyMembersDetails`.
- **Section 9** (purpose of stay; the exact `<=12 months` single-validity
  statement) → `purposeOfStay` through `stayNotExceedingTwelveMonths`. The
  enum (`Employment`/`Study`/`Au pair`/`Language course`/`Family
  reunion`/`Other`) is the form's own picklist, distinct from (and coarser
  than) the Consular Services Portal's 28 online purpose categories — see
  the field's own description and "What is NOT modelled" below.
- **Section 10** (references in Germany — employer, school, relatives) →
  `referenceStreet` through `referenceEmail`, all optional: the source form
  does not mark this section as universally mandatory the way it does
  Sections 1-9.
- **Section 11** (trade/profession trained and, if different, current) →
  `professionTrained`/`currentProfessionIfDifferent`.
- **Section 12** (intended duration, from/to) →
  `intendedDurationFrom`/`intendedDurationTo`.
- **Section 13** (means of subsistence; German health-insurance coverage) →
  `meansOfSubsistence`/`hasHealthInsuranceForGermany`.
- **Section 14** (criminal convictions, in Germany and/or abroad, each an
  independent when/where + reason + nature-and-extent sub-block) →
  `hasCriminalConvictions` plus the six `conviction{Germany,Abroad}*`
  fields, each `visibleWhen hasCriminalConvictions == true` but not
  individually `requiredWhen` — an applicant may have only a Germany or
  only an abroad conviction to report, not both.
- **Section 15** (expelled/deported/refused a residence permit/refused
  entry) → `previouslyExpelledDeportedOrRefused`, modelled as the form's own
  single combined question rather than four separate booleans, since the
  source presents it as one sentence with one implied yes/no answer.
- **Section 16** (notifiable-disease footnote list) →
  `suffersNotifiableDisease`, with the exact footnote 1 disease list
  reproduced in the field description.
- **Photo requirement** (page 1 header) and the **Declaration** and
  **Section 54(2)/Section 53 AufenthG legal-notice acknowledgement** (pages
  4-5, each independently signed and dated, with exact bilingual attestation
  text captured verbatim from the PDF) → the three `documents[]` entries.
- **Portal-specific, not on the paper form:** `countryOfResidence` and
  `responsibleMission`, the Consular Services Portal's own live-confirmed
  pre-login routing step (see above), included because an agent using this
  schema to prepare an application will need to know which mission is
  responsible before any of the form's own fields are relevant.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Python script (not committed to the repo) implementing the
same `equals`/`notEquals`/`in`/`greaterThan`/`greaterThanOrEqual`/`all`/
`any`/`not` grammar as GSP-0013's `Condition` type checked every
`type`/`required`/`requiredWhen`/`visibleWhen`/`validation.enum` constraint
and both `crossFieldValidation` rules in `schema.json` against four
scenarios:

```
OK   Scenario 1: solo Indian skilled-worker applicant, single, no branch triggers
OK   Scenario 2: branch-heavy — married w/ spouse+child, prior Germany stay, apartment, other purpose, conviction
OK   Scenario 3: Other travel-document type, Other accommodation, Study purpose, expelled, abroad conviction
FAIL Negative control: missing spouseFirstNames while married (expected FAIL)
    - MISSING required field: spouseFirstNames
```

Scenarios 1-3 together exercise every `requiredWhen`/`visibleWhen` branch
this document defines (spouse/partner fields; children; previous stays;
apartment room count; other-accommodation explanation; other/employment
purpose sub-fields; both Germany and abroad conviction sub-blocks;
marital-status-since date) and both `crossFieldValidation` rules
(`intendedDurationToAfterFrom`, `travelDocumentValidAfterIssue|`), all of
which held. The fourth scenario is a negative control confirming the
evaluator actually enforces `requiredWhen` (it correctly reports
`spouseFirstNames` missing once `maritalStatus` is `married`) rather than
trivially passing everything. No defects were found in the schema itself
during this pass.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/de/auswaertiges-amt/national-visa-application/1.0.0/schema.json
ok   registry/de/auswaertiges-amt/national-visa-application/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/de/auswaertiges-amt/national-visa-application/1.0.0/schema.json
ok   registry/de/auswaertiges-amt/national-visa-application/1.0.0/schema.json [v0.3]
```

The full registry (152/152 schema documents, 3/3 `mapping.json` companions)
continues to validate after this addition.

## What is NOT modelled (out of scope), and why

- **The authenticated Consular Services Portal's own data-entry screens** —
  gated behind Bund ID/account registration (see above); this document
  models the underlying paper form the portal digitises instead.
- **Schengen (short-stay) visas** — the Consular Services Portal and this
  document both explicitly exclude them; that gap is already closed by
  `fr/france-visas/schengen-visa-application` for the harmonised Schengen
  form, and Germany's own short-stay process is a separate, narrower
  candidate for a future schema.
- **Purpose-specific supplementary question sets** the portal or a mission
  collects in addition to this base form for a given purpose — e.g. a Blue
  Card (EU) applicant's qualification/salary thresholds and employer
  contract details, an Opportunity Card applicant's points-system
  criteria, a student's course-acceptance/financing evidence, or a family
  reunification applicant's sponsor details. Each of the portal's 28
  purposes may layer its own additional fields on top of this shared base;
  out of scope for this initial schema, and each a candidate for its own
  future schema or a MINOR-version extension, the same modelling choice
  `ie/irishimmigration/short-stay-visa-avats` makes for its own
  Employment/Study Visa Application question sets.
- **The exact wording and mechanics of the appointment-scheduling and
  in-person biometrics/fee-payment phases** (phases 3-4 of the portal's own
  four-phase description) — process context only, not modelled as fields.
- **Service-provider fees** some missions charge for application-checking
  services (mentioned on the portal's Blue Card page) — amount varies by
  mission and is not itself an applicant-supplied field.

## Scope and jurisdiction notes

- This is Germany's first Visa-vertical document. `de/bmi/*` and
  `de/finanzamt/*` and `de/gewerbeamt/*` and `de/kba/*` cover Passport/
  National ID/Taxes/Business Formation/DMV respectively; this document opens
  a fifth DE authority segment, `de/auswaertiges-amt/*`.
- `id` uses the `auswaertiges-amt` authority segment (the Federal Foreign
  Office's own German name, unabbreviated) rather than an abbreviation,
  consistent with this registry's existing `de/gewerbeamt/*` and
  `de/finanzamt/*` segments.
- Conditional requiredness/visibility uses `requiredWhen`/`visibleWhen`
  (GSP-0013), targeting spec v0.3, the same as every other Visa-vertical
  document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6
months). Because `status` remains `draft` (this document was authored from
the canonical PDF form but not against the live, authenticated portal
itself), a future review should prioritize obtaining portal credentials (or
partnering with a mission/applicant who has them) to confirm the
authenticated data-entry screens field-by-field, which would also resolve
whether any Section 10 fields are in fact mandatory online even though the
paper form does not mark them so.
