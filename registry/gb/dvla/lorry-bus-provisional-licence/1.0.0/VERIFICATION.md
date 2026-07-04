# Verification record — `gb/dvla/lorry-bus-provisional-licence` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

## Why this schema exists

GOV-986 ("GovSchema Standard Research") audited the registry's coverage
across the 6 focus verticals (DMV, Business Formation, Visa, Passport,
Taxes, National ID & Civic Documents) against all 12 scoped jurisdictions
(US, GB, IE, CA, NZ, AU, DE, SG, FR, NL, IN, EU). The matrix is close to
saturated — every jurisdiction has at least one published schema in every
vertical except two already-recorded infeasible gaps (`NL` Visa — Schengen
duplicates the FR schema, the MVV national visa is 200+ fragmented forms
per [[gov859-nl-identity-card-and-5of6]]; `EU`-level anything — ETIAS is not
yet operational). Within DMV specifically, the vertical's own naming
("Tag, Title, Registration, Drivers License, IDL, and CDL") flagged a
narrower real gap: this registry's **only** commercial/vocational
driving-licence schema was `us/ca/dmv/commercial-drivers-license-application`
(US, one state). No other jurisdiction had a CDL-equivalent schema —
every other DMV/Drivers-License entry (GB's own
`driving-licence-renewal-photocard` and `driving-licence-first-provisional`
included) covers only the standard car (category B) licence. The UK's
HGV/PCV provisional-entitlement process is a clean, non-gated, well-documented
match: same authority (DVLA) as two already-published GB schemas, a
by-post-only paper-form process (matching this registry's general
preference for non-interactive sources), and explicitly named as the
CDL-equivalent leg of the DMV vertical.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/lorry-bus-provisional-licence` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA); tests
  themselves are administered by the Driver and Vehicle Standards Agency
  (DVSA), not modelled here (out of scope, see below).
- **Primary source:** gov.uk guide "Become a qualified heavy goods vehicle
  (HGV) or bus driver" — fetched via the gov.uk content API
  (`https://www.gov.uk/api/content/become-lorry-bus-driver`, HTTP 200, no
  bot-block), 2026-07-04. This guide is a multi-part document; the parts
  read in full were **"Getting qualified"**, **"Applying for a provisional
  HGV or bus licence"**, and **"Fees"**.
- **Secondary source:** gov.uk guide "Driving licence categories"
  (`/api/content/driving-licence-categories`), fetched the same way — used
  only to confirm the closed set of vocational category codes (C1, C1E, C,
  CE, D1, D1E, D, DE) referenced by `licenceCategoryApplied`'s description;
  the category weight/passenger-seat/trailer definitions themselves are
  **not** repeated as schema data (out of scope, purely descriptive).
- **No downloadable form found.** Unlike `ie/revenue/vehicle-registration-tax-vrt`
  (a genuine fillable AcroForm PDF), forms D2 and D4 are **Post-Office-only**
  — the same access pattern already recorded for form D1 in the sibling
  `gb/dvla/driving-licence-first-provisional`'s VERIFICATION.md. A search of
  gov.uk's own site search API (`/api/search.json`) for "D2 form",
  "application for a driving licence D2", and "driving licence D2
  publication" surfaced no `government/publications/*` PDF result for D2 or
  D4 (contrast with car-licence form D1, which likewise has no PDF; this
  registry has not found *any* DVLA driving-licence application form
  published as a directly downloadable PDF, only vehicle-side forms like
  V5C/V11). The sub-page URL
  `/become-lorry-bus-driver/applying-for-a-bus-or-lorry-provisional-entitlement`
  linked from "Getting qualified" 303-redirects back to the same parent
  guide (confirmed via the content API), so it carries no additional detail
  beyond what "Applying for a provisional HGV or bus licence" already
  states.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| "Getting qualified": "have a full car licence" | `fullCarLicenceHeld` |
| "Getting qualified": "be over 18 - but there are some exceptions" | `dateOfBirth` |
| "Filling in form D2" category/entitlement table (C1→C1; C or C1+E→C1,C1+E,C,CE; D or D1→D1,D1+E,D,DE) | `licenceCategoryApplied` |
| "How to apply": "fill in these 2 forms: a D2 application form; a D4 medical examination report - this must be filled in by a doctor" | `d2ApplicationForm`, `d4MedicalExaminationReport`, `d4MedicalReportCompleted` |
| "Filling in form D4": GP, optician (eyesight section), or private medical firm; may be charged | `d4MedicalReportCompleted` description |
| "Send the forms": "Send both forms and your photocard driving licence to DVLA. There's no application fee." | `currentPhotocardLicence` |
| "Send the forms": "If you have a paper driving licence you must include a passport-style colour photo and original identity documents." | `currentLicenceFormat`, `passportStyleColourPhoto`, `originalIdentityDocuments` |
| "Fees" → "Provisional licence": "It's free to apply for a provisional heavy goods vehicle (HGV) or bus licence." | no fee/payment field modelled (confirmed there is none, not an omission) |
| "Driving licence categories" — C1/C1E/C/CE/D1/D1E/D/DE codes | `licenceCategoryApplied` enum values |

## Honesty flags (deliberate, recorded rather than glossed over)

- **No official D2/D4 field-by-field specification exists to check against.**
  Both forms are Post-Office-only, exactly like form D1 in the sibling
  `gb/dvla/driving-licence-first-provisional`. `lastName` and
  `firstNames` are modelled **by analogy** with that sibling's
  applicant-detail fields (every DVLA licence application collects a name
  at minimum) rather than from an independently confirmed D2 field list —
  flagged in each field's own `sourceRef`, not presented as equivalent
  rigor to the source-confirmed fields.
- **The "some exceptions" to the age-18 rule are not modelled.** The source
  links to a separate `vehicles-you-can-drive` page for the detail (e.g.
  narrower age rules for certain armed-forces/exempt-vehicle cases); this
  schema models only the general rule via `dateOfBirth`'s description, with
  no automated eligibility transition attached to it (the same discipline
  the sibling schema used for its own `dateOfBirth` field — only the
  boolean eligibility gates, not the raw date, drive a `steps[]`
  transition).
- **`d4MedicalReportCompleted` is a single gating boolean, not the
  underlying medical questionnaire.** The D4 form's actual medical
  questions (the notifiable-conditions list DVLA's separate
  condition-specific questionnaires would ask) were not sourced and are out
  of scope — the same modelling choice the sibling schema made for its own
  `medicalConditionDeclared` field.
- **Driver CPC tests, the post-CPC full licence, renewal, and
  requalification are explicitly out of scope.** The source guide covers
  all of these under one URL, but only the "Applying for a provisional HGV
  or bus licence" section was modelled — a distinct process ("Renew or
  change a lorry or bus licence", `/renew-lorry-bus-coach-licence`) already
  exists as a separate gov.uk service and would be a natural v2/sibling
  schema, not folded in here.
- **No live DVLA transaction was tested.** D2/D4 are paper forms posted to
  DVLA Swansea; there is no online application channel for this specific
  service (unlike the sibling first-provisional schema, which has both an
  online and a by-post channel). A worked walkthrough with representative
  mock values is given below and in
  `conformance/gb/dvla/lorry-bus-provisional-licence/1.0.0/` in place of a
  live test run.

## Worked example (mock data, not a live submission)

**Scenario:** a 24-year-old full car-licence holder applying for a
provisional Category C (large lorry) entitlement, holding a current
photocard licence.

| Field | Mock value |
|---|---|
| `fullCarLicenceHeld` | `true` |
| `dateOfBirth` | `2002-03-14` |
| `lastName` | `KOWALSKI` |
| `firstNames` | `TOMASZ` |
| `licenceCategoryApplied` | `c` |
| `currentLicenceFormat` | `photocard` |
| `d4MedicalReportCompleted` | `true` |

Walking this data through the modelled `steps[]`: `fullCarLicenceHeld` is
`true`, so `eligibility` falls through to `applicant_and_category` (no exit
triggered) → `medical_and_licence_format`, the final step. Because
`currentLicenceFormat` is `photocard`, `documents[].currentPhotocardLicence`
is correctly required and `passportStyleColourPhoto` /
`originalIdentityDocuments` are correctly not required — a self-consistency
check of the schema's own conditional-requirement logic (also run
mechanically — see
`conformance/gb/dvla/lorry-bus-provisional-licence/1.0.0/`), not a
substitute for a live DVLA transaction — see the honesty flag above.

## Path to `verified`

1. Obtain an official, independently-published D2 and D4 field list (a
   DVLA FOI request or a genuine scanned copy, rather than the current
   guidance-page-only sourcing) to confirm `lastName`/`firstNames` and add
   any additional applicant-detail fields the paper forms actually collect.
2. Confirm the age-18 "some exceptions" carve-out against the
   `vehicles-you-can-drive` page and decide whether it warrants a modelled
   field.
3. Consider a sibling `gb/dvla/lorry-bus-licence-renewal` schema for the
   separate 5-yearly (or annual, over 65) renewal process
   (`/renew-lorry-bus-coach-licence`), explicitly out of scope here.
