# Verification record — `us/va/health-benefits-enrollment-10-10ez` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

`draft`, not `verified`, because no live walkthrough of the va.gov online
application wizard was performed — see "What was not done" below. This
schema is sourced directly from VA's own current-edition fillable PDF.

## Sources examined

- **Document `(id, version)`:** `us/va/health-benefits-enrollment-10-10ez` /
  `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Department of Veterans Affairs (VA), Veterans Health
  Administration.
- **`https://www.va.gov/find-forms/about-form-10-10ez/`** — reachable
  directly (HTTP 200, no bot-block encountered), linking to
  `https://www.va.gov/vaforms/medical/pdf/VA Form 10-10EZ.pdf` (the space
  in the URL path required percent-encoding, `%20`).
- **`VA Form 10-10EZ.pdf`** — **FEB 2025 edition** (the current edition at
  the time of this review), retrieved via `curl` (HTTP 200, 1,267,392
  bytes) and processed with a scratch npm install of `pdfjs-dist` (legacy
  build). This is a genuine fillable AcroForm/XFA PDF, so — beyond the
  standard page-by-page text-layer extraction used for this registry's
  other PDF-sourced schemas — this document's fields were also
  cross-referenced against the PDF's own **form-field annotations**,
  retrieved via `page.getAnnotations()` (name + type, e.g.
  `F[0].P4[0].SSN[0]` `[Tx]`, `F[0].P4[0].BirthSex[0]` `[Btn]`). Every
  field's `sourceRef` in this document cites both the printed question
  number/label and this internal PDF field name, following the precedent
  set by `au/aec/voter-enrolment`'s PDF field-name extraction technique —
  giving this document unusually direct field-level traceability. All 6
  pages were extracted: page 1 (general instructions and background on
  Enrollment vs. Registration), page 2 (Sections IV-IX instructions), page
  3 (submission instructions, Paperwork Reduction Act and Privacy Act
  notices), and pages 4-6 (the fillable form itself: Sections I-IX and the
  signature block).

## What was not done — the one honest gap

No live walkthrough of the va.gov online "Apply for VA health care" wizard
was performed. VA's own form instructions (page 1) state the paper form and
online application collect the same underlying eligibility information
("For Veterans to apply for enrollment in the VA health care system"), so
this document treats the static PDF — directly reachable and field-name
traceable — as the faithful source, the same choice made for this
registry's other PDF-sourced schemas when a live wizard could not be
independently walked through this cycle.

## Test run performed

Phase 4 of this cycle's research brief calls for a test run with valid mock
data. A scratch Node script (`/tmp/va-test/mocktest.mjs`, not checked into
the registry) implements the GSP-0013 condition grammar
(`equals`/`in`/`all`/`any`/`not`) and resolves `visibleWhen`/`requiredWhen`
against two independent mock applicants:

1. A single Veteran with no dependents, applying for Registration only, no
   claimed exposures, employed full-time, and declining financial
   disclosure.
2. A married Veteran with one dependent child, retired, claiming Gulf War
   hazard-location and herbicide-location exposure (each exercising its own
   from/to date pair), health insurance and Medicare Part A enrollment, and
   opting into financial disclosure (exercising the per-person
   Veteran/spouse/child income fields and the deductible-expenses section).

Both scenarios: (a) supply every field that is required given its resolved
visibility, (b) pass each field's own `validation` (pattern/enum/min-max),
and (c) contain no reference to a field name absent from `fields[]` across
every `visibleWhen`, `requiredWhen`, `documents[]` `requiredWhen`, and
`steps[].fields` entry. Both passed after one iteration (the first run
surfaced two genuine mock-data gaps — a missing `homeAddressCounty` for a
Veteran whose home address differs from her mailing address, and missing
employer details for a retired Veteran, since the source form requires
employer information for "employed or retired" — both were mock-data
omissions, not schema defects, and were corrected).

The schema also validates against both the zero-dependency structural
checker (`tools/validate.mjs`) and the full JSON Schema draft 2020-12
meta-schema via ajv (`tools/validate-ajv.mjs`).

## Modelling decisions

- **Models one spouse and one dependent child inline**, matching the base
  form's own printed capacity (Section IV: "1. SPOUSE'S NAME" and "2.
  CHILD'S NAME", with "Use a separate sheet for additional dependents"
  printed at the top of the section) — the same "up to N inline, continue
  on a separate sheet" pattern this registry already uses for
  `gb/hmrc/child-benefit-claim-ch2` (2 children) and
  `in/mca/company-incorporation-spice-plus`.
- **`homeAddressSameAsMailing` is an inferred gating boolean**, not a
  printed form field. The source prints separate Mailing Address (9) and
  Home Address (10) blocks with no shortcut checkbox; this document follows
  this registry's convention (`au/aec/voter-enrolment`,
  `in/eci/voter-registration`) of adding an explicit boolean where
  GovSchema's grammar needs one but the source form doesn't print one.
- **`hasHealthInsurance`, `hasSpouse`, and `hasChild` are likewise inferred
  gating booleans** for the same reason — Sections III and IV have no
  printed "do you have insurance/a spouse/a child" yes/no box, only fields
  that are meaningless if left blank.
- **`raceEthnicity`, `employmentStatus`-adjacent fields, and
  `exposureCategory` modelled as single-value enums, not multi-select.**
  The source form explicitly allows checking more than one race/ethnicity
  box (4. WHAT IS YOUR RACE/ETHNICITY?) and more than one exposure category
  (3E), but GovSchema's `enum` validation keyword accepts one value per
  field; documented in each field's own description as a simplification,
  matching the same choice made for `gb/hmrc/child-benefit-claim-ch2`'s
  `employmentStatus`/`partnerEmploymentStatus` fields.
- **Military-exposure date pairs (`gulfWarHazardService*`,
  `herbicideService*`, `exposureService*`) modelled as `MM/YYYY` strings,
  not `date` type.** The source form explicitly asks only for "an
  approximate time-frame (MM/YYYY)" for each exposure window, so a full ISO
  date would overspecify precision the source form does not collect —
  matching the same choice made for `in/eci/voter-registration`'s
  `ordinarilyResidentSinceMonthYear`.
- **`exposureServiceFrom`/`exposureServiceTo` left unconditionally
  optional**, not gated by `requiredWhen` on `exposureCategory`, since
  `exposureCategory` itself has no printed yes/no gate (Section 3E is a
  bare "check all that apply" checklist) — documented in each field's own
  description rather than forced into an imprecise condition, the same
  class of gap noted in `in/eci/voter-registration`'s VERIFICATION.md for
  its own at-least-one-of rule.
- **`employerCompanyName`/`Address`/`Phone` required when
  `veteranEmploymentStatus` is `full_time`, `part_time`, or `retired`**,
  matching the source's own printed instruction "(Complete if employed or
  retired)" — `not_employed` is the only status that excludes these
  fields.
- **Social Security number format** (`^[0-9]{3}-[0-9]{2}-[0-9]{4}$`) and
  **10-digit US phone format** (`^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$`) taken
  directly from the source form's own printed field masks (e.g. "(999)
  999-9999", "999-99-9999").
- **Section VI's Yes/No financial-disclosure choice
  (`wantsToDiscloseFinancialInfo`) gates Sections VII-VIII's fields.**
  Sections VII (income) and VIII (deductible expenses) are printed
  immediately below Section VI's opt-in/opt-out choice and are only
  meaningful if the Veteran opts to disclose — modelled with
  `requiredWhen`/`visibleWhen` accordingly. The per-person income
  breakdown (Veteran/Spouse/Child columns in Section VII) is further gated
  on `hasSpouse`/`hasChild` so a single Veteran with no dependents isn't
  asked for spouse/child income.
- **Office-use-only markings** (VA DATE STAMP box, "For VHA Use Only") **not
  modelled** — completed by VA staff processing the application, not by
  the applicant.

## Out of scope

- **The online va.gov application wizard** — not independently walked
  through this cycle; see "What was not done" above.
- **Additional dependents beyond one spouse and one dependent child** — the
  source form itself directs claims for more dependents to "a separate
  sheet," a distinct continuation artifact not modelled here.
- **VA Form 10-10EZR** (Health Benefits Renewal/Update Form) — a distinct
  form for Veterans already enrolled in VA health care to update their
  information, linked from the same publication page but not itself an
  enrollment application.
- **Power of Attorney delegated signing, and the "signed with an 'X' plus
  two witnesses" alternative signing path** — both referenced in the
  source's submission instructions but not modelled as further schema
  fields; `signatureOfApplicant`'s description documents the rule in
  prose.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-03** (6
months). Re-fetch VA Form 10-10EZ to check for an edition update, and
attempt a live walkthrough of the va.gov online application wizard if
feasible; if the field set matches, promote `status` to `verified`.
