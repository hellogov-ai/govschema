# Verification record — `in/eci/voter-registration` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

`draft`, not `verified`, because no live walkthrough of the online
registration wizard was performed — see "What was not done" below. This
schema is sourced directly from the Election Commission of India's own
downloadable Form 6 and its companion guidelines PDF.

## Sources examined

- **Document `(id, version)`:** `in/eci/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Election Commission of India (ECI), under the
  *Representation of the People Act, 1950* and the *Registration of Electors
  Rules, 1960*.
- **`https://voters.eci.gov.in/formspdf/Form_6_English.pdf`** — Form 6,
  "Application Form for New Voters", the **primary field-level source**.
  Downloaded directly via `curl` (HTTP 200, 102,693 bytes), 2026-07-03. Text
  was extracted with a scratch npm install of `pdfjs-dist` (legacy build,
  ESM), reading each page's text content items — this PDF is a plain,
  non-CID-keyed, non-encrypted document, so `pdfjs-dist`'s standard text
  layer extraction recovered all form text directly (no AcroForm field-name
  decoding or glyph-mapping workaround was needed, unlike
  `in/mea/passport-application-first-adult`'s CID-keyed source PDF). Yielded
  the full two-page form: heading (Assembly/Parliamentary Constituency),
  Items 1–10, the DECLARATION block, and the accessibility/acknowledgement
  notes.
- **`https://voters.eci.gov.in/guidelines/Form-6_en.pdf`** — "To be appended
  to Form-6" guidelines, downloaded and decoded the same way (HTTP 200,
  544,037 bytes), 2026-07-03. Supplies the numbered item-by-item filling
  instructions (§§1–8) referenced throughout this schema's `sourceRef`
  values, including the explicit "either official language or English" rule
  (§2) and the citizenship-certificate-style cross-reference between Item 5
  (Aadhaar) and Item 7/DECLARATION.
- **Web search** (search-engine results, not a direct page fetch) confirmed
  Section 19 of the *Representation of the People Act, 1950* as the statutory
  basis for the three eligibility facts referenced in this schema's top-level
  `description` (18 years of age on the qualifying date; ordinarily resident
  in the constituency; citizen of India) — used only to state that
  eligibility rule in prose, not as a field-level source.

## What was not done — the one honest gap

No live walkthrough of the online registration wizard was performed. Two
paths were attempted and both failed for this environment, not for
authentication reasons:

- **`https://www.nvsp.in/`** (the legacy National Voters' Service Portal
  domain) — `WebFetch` returned `certificate has expired`.
- **`https://voters.eci.gov.in/`**, the current Citizen Service Portal that
  has since superseded NVSP for online Form 6 submission — not attempted via
  a live wizard walkthrough this cycle (only its static PDF endpoints were
  fetched). A future review should drive `voters.eci.gov.in/form6` directly
  (headless-browser, per the technique used for `ie/irishimmigration/
  short-stay-visa-avats`) to confirm on-screen field ordering, any
  client-side validation masks, and whether the online flow's field set
  matches the paper form exactly.

Consequently `status` stays `draft`; promote to `verified` once a live
wizard walkthrough is completed or a second, independently-hosted edition of
Form 6 (e.g. a state CEO mirror) is cross-checked field-by-field against this
one, following the precedent set by `au/aec/voter-enrolment`'s two-edition
cross-check.

## Test run performed

Phase 4 of this cycle's research brief calls for a test run with valid mock
data. Since the live wizard could not be reached, this was performed as a
structural test instead: a scratch Node script
(`/tmp/inextract/mocktest.mjs`, not checked into the registry) implements the
GSP-0013 condition grammar (`equals`/`notEquals`/`in`/`all`/`any`/`not`) and
resolves `visibleWhen`/`requiredWhen` against three independent mock
applicants:

1. An adult who supplies only the English name pair, has Aadhaar, uses
   `aadhaar_card` as both age- and residence-proof, declares no disability,
   and has no family member already on the roll at the address.
2. An adult who supplies only the official-language name pair, has no
   Aadhaar, uses `other` for both age- and residence-proof (naming a
   document not on either printed list), and declares a disability.
3. An adult who uses `driving_licence` as age-proof, `bank_or_post_office_
   passbook` as residence-proof, and cross-references a family member already
   enrolled at the same address.

All three scenarios: (a) supply every field that is required given its
resolved visibility, (b) pass each field's own `validation` (pattern/enum/
min-max), and (c) contain no reference to a field name absent from
`fields[]` across every `visibleWhen`, `requiredWhen`, and `steps[].fields`
entry. All three passed on the first run; no schema defect was found by this
test (contrast `fr/dgfip/income-tax-return-2042`, where the equivalent test
did catch a real gating bug).

## Modelling decisions

- **`assemblyConstituencyName` / `parliamentaryConstituencyName` optional.**
  The form addresses the application to the ERO of a named Assembly or
  Parliamentary Constituency, but the guidelines state an application will
  not be rejected for omitting or mis-stating this (the ERO can assist).
  Modelled as two independent optional fields rather than an enforced
  either/or, since the printed rule is "don't worry if you don't know it",
  not "supply exactly one".
- **At least one of each language-pair is required, but not encoded as a
  condition.** Item 1 (applicant's own name) and Item 2 (relative's name) are
  each printed as two parallel columns — official State language and
  English — and the guidelines state either alone is acceptable and will not
  be a ground for rejection. GSP-0013's condition grammar has no clean way to
  express "at least one of fields X, Y must be non-empty" as a
  `requiredWhen`, the same class of gap `au/aec/voter-enrolment`
  encountered for its `citizenshipCertificateNumber` exemption. Documented in
  prose on `nameOfficialLanguageGivenName`/`nameEnglishGivenName`'s own
  descriptions instead of forced into an imprecise `requiredWhen`.
- **`relativeType` splits one printed line into two enum values.** The form
  prints "Legal Guardian in case of orphan/Guru in case of Third Gender" as a
  single line alongside Father/Mother/Husband/Wife, but this schema models it
  as two separate enum values (`legal_guardian_orphan`, `guru_third_gender`)
  rather than one combined value, since a legal guardian and a Guru are
  genuinely different relationships to the applicant despite sharing a
  printed line — the same discipline `au/aec/voter-enrolment` used splitting
  its `citizenshipStatus` branches by underlying AcroForm field grouping
  rather than printed line breaks alone.
- **Comb-style digit-box date collapsed to one field.** `dateOfBirth` is
  printed as eight single-digit boxes (`d d / m m / y y y y`); modelled as a
  single ISO `date` field, per this registry's existing comb-field
  convention (e.g. `au/aec/voter-enrolment`, `nz/dia/passport-renewal-adult`).
- **`hasAadhaar`, `hasDisability`, and
  `hasFamilyMemberAlreadyEnrolled` are inferred gating booleans, not named
  form fields**, for `hasDisability` and `hasFamilyMemberAlreadyEnrolled`
  specifically — Item 9 and Item 10 are simply left blank when not
  applicable, with no printed yes/no tick-box. `hasAadhaar` *is* a printed
  tick-box choice (Item 5(a) vs 5(b)), so that one directly reflects the
  form; the other two follow this registry's convention (mirroring
  `au/aec/voter-enrolment`'s `nameChanged`/`addressChanged`) of adding an
  explicit boolean gate where GovSchema's `visibleWhen`/`requiredWhen`
  grammar needs one but the paper form does not print one.
- **`ageProofDocumentType` / `residenceProofDocumentType` each include an
  `other` option**, matching the form's own "if none of the above documents
  is available, specify" fallback (Item 7(b)(ii), Item 8(b)(ii)). Choosing
  `other` triggers a required free-text document name and, per the form and
  guidelines, obliges the applicant to undergo field verification by an
  officer designated by the ERO — documented in each field's description as
  a business-process consequence, not modelled as a further schema field
  since it is an ERO-side workflow step, not applicant-supplied data.
- **`disabilityPercentage` modelled as `number`, unconstrained beyond
  0–100.** The form prints a blank "___%" with no minimum granularity
  specified.
- **`ordinarilyResidentSinceMonthYear` modelled as a constrained string
  (`MM/YYYY`), not a `date` type.** The form asks only for month and year
  ("mention month and year"), with no day component, so a full ISO date
  would overspecify precision the source form does not collect.
- **No `documents[]` payment entry.** Registration carries no fee; the ECI
  states enrolment is free of cost, consistent with how this registry omits
  a `payment`-category document when a process is free (e.g.
  `au/aec/voter-enrolment`).

## Out of scope

- **Form 7** (objection to inclusion of a name, or claim contesting another
  entry) — a distinct ECI form for a different process, not modelled here.
- **Form 8** (correction of entries in an existing elector's record,
  shifting of residence within the same Assembly Constituency, replacement
  EPIC, or marking an existing elector as a Person with Disability) and
  **Form 8A** (transposition of an existing entry within the same Assembly
  Constituency) — both amend an *existing* electoral-roll entry rather than
  create a first-time one, and use different field sets.
- **Overseas-elector and service-elector registration** — each uses its own
  distinct ECI form (respectively for citizens residing abroad and for
  service personnel/their spouses), not examined here.
- **Roll removal/deletion and objection processes** — distinct ECI
  processes, not modelled here.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-03** (6
months). Re-fetch both PDFs to check for a form-version update, and attempt a
live walkthrough of `voters.eci.gov.in`'s Form 6 wizard; if successful,
promote `status` to `verified`.
