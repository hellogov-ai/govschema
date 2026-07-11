# Verification record — dk/siri/work-permit-application@1.0.0

## Candidate selection

Denmark stood at 4 of its 6 verticals before this cycle (Passport GOV-2244,
Taxes GOV-2253, National ID GOV-2260, Business Formation GOV-2268). Each of
those prior cycles' own screening passes had already flagged SIRI's AR8 form
as a genuine, unauthenticated, fill-by-hand PDF candidate for Denmark's Visa
vertical, while noting SIRI's other Schengen-visa route
(`applyvisa.um.dk`) would be a confirmed duplicate of the Annex I template
already modelled under several other jurisdictions (e.g.
`fr/france-visas/schengen-visa-application`, `at/bmeia/schengen-visa-application`).

Before authoring AR8 directly, this cycle re-screened whether a stronger,
less narrowly-scoped candidate existed: SIRI's own primary/first-time
work-permit route is form **AR1** (or its employer-submitted twin **AR6**),
covering the Pay Limit Scheme, Positive Lists, Researcher, and Fast-track
pathways — a much closer match to "an employed person applying for a work
permit," the pattern this registry's `fi/migri/residence-permit-employed-person`
schema already established for Finland's Visa vertical. That re-screen found
AR1/AR3/AR6/AR7 are **not modellable from an unauthenticated static source**:
SIRI's own application-forms index page
(`nyidanmark.dk/en-GB/Words-and-concepts/SIRI/Application-forms---SIRI`)
links all four only to `newtodenmark.dk/AR1`, which 302-redirects to
`forms.nyidanmark.dk/siri/Login/LoginMitId` — a MitID-authenticated
case-management wizard with no downloadable AcroForm or fill-by-hand
specimen anywhere in its own domain. The only first-party PDFs adjacent to
AR1 are a sworn-declaration signature-substitute
(`Declarations/Sworn-declaration-AR1.pdf`) and a GDPR/data-processing prose
sheet (`Declarations/Engelsk-AR1-online.pdf`, confirmed via a fresh
pdfjs-dist extraction to carry 0 AcroForm fields) — both boilerplate
attached to the online wizard, not the application's own data-entry fields.
Third-party mirrors of an older AR1 layout exist (e.g. a stale, now-404
vfsglobal.com copy) but fail this registry's source-fidelity bar (not a
first-party, currently-hosted source).

AR8 was authored instead, with its narrower real-world scope — sideline
employment, work permits for accompanying family, and extensions of either,
explicitly **not** covering first-time primary/commuter work permits — kept
plainly disclosed in the schema's own `title` and `description` rather than
characterized as a general "work permit for an employed person" schema.

## Source

- **Primary (English):**
  `https://www.nyidanmark.dk/-/media/Files/SIRI/Application-forms/Work-permit-only/AR8_en.pdf`
  — confirmed by two independent `curl` fetches with a browser User-Agent,
  taken minutes apart: both HTTP 200, `content-type: application/pdf`,
  exactly **855,022 bytes**, **SHA-256-identical**
  (`75268736ea08dccec838790d5bc06d9e60906b71474baad4f07db21055bdff60`).
  `Last-Modified: Fri, 30 Jan 2026 13:11:46 GMT`, matching the form-code
  footer printed on the PDF itself (`AR8_en_30012026`).
- **Danish-language sibling:** `.../AR8_da.pdf` (421,369 bytes) — the same
  form; the English version was used as this schema's primary source since
  it is SIRI's own official parallel-language specimen, avoiding a
  translation step.
- **Authority/index page:**
  `https://www.nyidanmark.dk/en-GB/Words-and-concepts/SIRI/Application-forms---SIRI`
  — HTTP 200, SIRI's own index of every downloadable application form by
  category, confirming AR8's placement under "Work" → "Work permit only"
  and its relationship to the sibling AR1/AR3/AR6/AR7/AR9 forms.

## Extraction technique

Fetched the PDF and processed it with `pdfjs-dist` (v3.11.174, legacy
CommonJS build, installed fresh into a scratch directory — this registry's
established technique for numbered/non-fillable specimens, e.g.
`at/bmeia/schengen-visa-application`, `is/skatturinn`):

- `getDocument(...).numPages` → **14**.
- `doc.getFieldObjects()` → `null`; `page.getAnnotations()` on every one of
  the 14 pages → **0** `Widget`-subtype annotations on any page. This is
  therefore a genuine fill-by-hand specimen with **no AcroForm layer**,
  consistent with CATALOG.md's prior characterization of this candidate.
- All page text was extracted with `getTextContent()`, clustered into lines
  by y-coordinate, and cross-walked against the source's own section
  numbering (Part 1: sections 1-12; Part 2: sections 1-8) to build the field
  list. For the salary table specifically (Part 2, Section 3, pages 9-10),
  raw x/y item positions were inspected directly — not just the clustered
  line text — to confirm each row (`Base salary/Hourly wage`, `Fixed
  allowances, if any`, the three repeated `Other employer paid benefits`
  rows, `Total gross salary — per hour`/`per month`) is a single label with
  one blank value cell, i.e. there is no separate printed "amount" column
  to split into a label/value field pair.

## Field model

**104 fields**, split across the form's own two parts (Part 1, completed by
the applicant; Part 2, completed by the employer in Denmark), plus 8
`documents[]` entries and 5 `crossFieldValidation` rules.

**Two disclosed judgment calls**, since this source carries no
asterisk/required-marking convention at all (unlike this registry's AT
Schengen-visa precedent) and no printed yes/no checkbox for whether a third
party is acting on the applicant's/employer's behalf:

1. **Required-field determination is editorial.** Fields necessary to
   identify the applicant/employer and process the application (name, date
   of birth, nationality, passport number, CVR number, salary, job details,
   signatures) are modelled `required: true`; supplementary fields (CPR
   number — a first-time entrant may not yet have one; education/previous
   employment detail beyond the first entry; third-party contact details)
   are modelled `required: false`, disclosed here rather than presented as
   a structural fact the source itself states.
2. **Power-of-attorney documents are `required: false` with an explanatory
   label**, not gated by an invented synthetic boolean. The source's own
   text ("If the application is submitted by a third party...") describes a
   real-world condition with no corresponding checkbox anywhere on the form
   to hang a `requiredWhen` on — inventing one purely to gate a document
   would be a synthetic field with no backing source construct, unlike this
   registry's precedent for `applicantIsMinor` on
   `dk/um/application-for-danish-passport` (which gates a printed section
   header's own stated age condition, not an absent yes/no checkbox for an
   arbitrary third-party scenario). The condition is instead disclosed in
   the document entry's own `label`.

**Conditional visibility.** The source's own printed instruction under
Section 6 ("About authorisation") states that if the offered job requires a
Danish authorisation, the applicant does not need to complete Sections 7
(education) and 8 (previous employment) — modelled via `visibleWhen:
{field: danishAuthorisationRequired, equals: false}` on each section's
fields, rather than silently dropping the sections or leaving them
unconditionally required.

**Bounded repeating group.** Section 8's "previous relevant employment"
block repeats three times on the source (A/B/C, identical field layout each
time) — modelled with the registry's established `previousEmploymentN...`
bounded-flattening convention (e.g. `dk/cpr/notification-of-entry`'s
`entrantN...` pattern), not an open-ended array.

**`crossFieldValidation` (5 rules).** Part 2, Section 4 ("About the
employee") asks the employer to restate the applicant's own surname, first
name(s), date of birth, and nationality for cross-referencing — modelled as
four `equals` comparisons against the applicant's own Part 1 fields (e.g.
`employeeSurnameStatedByEmployer` must equal `surname`), the first use of an
`equals`-operator `crossFieldValidation` rule in this registry (prior uses,
e.g. `at/bmeia/schengen-visa-application`, were date-ordering
`greaterThanOrEqual` comparisons only — one such date-ordering rule is also
included here, `employmentEndDate` must be on/after `employmentStartDate`).

## Mock conformance test run

Two scenarios were built under
`conformance/dk/siri/work-permit-application/1.0.0/` and checked against
this schema's own `required`/`requiredWhen`/`visibleWhen`/`validation`/
`documents[]`/`crossFieldValidation` grammar with a disposable checker
script (`/tmp/pdfextract/conformance-check.mjs`, not committed):

- **`application-packet-minimal-sideline-employment.json`**: Anna Mueller, a
  German national already resident in Denmark, applying for a new work
  permit on the sideline-employment ground (not related to her primary job),
  no Danish authorisation required, no education/previous-employment detail,
  no third party. **0 errors.**
- **`application-packet-full-accompanying-family-with-representative.json`**:
  Maria Clara Santos, a Brazilian nurse accompanying her spouse-sponsor,
  applying for an extension, with completed education, two previous
  employment entries, salary/benefits detail, a third-party representative
  on both the applicant's and employer's side (CVR-matched), and full
  employer-side cross-check fields matching the applicant's own identity
  data. **0 errors.**
- **Six mutation/negative controls**, each derived from the minimal scenario
  with exactly one defect introduced, each correctly raising exactly one
  error (confirming the checker is not vacuously passing):
  1. Removing the required `employerCvrNumber` → `required but missing`.
  2. Setting `employmentBasis` to an out-of-enum value → `enum` violation
     (and, as a side effect, the now-orphaned `sidelineRelatedToPrimaryJob`
     correctly flags as "present but not visible", confirming
     `visibleWhen` is enforced against the mutated state, not the original).
  3. Setting `sidelineRelatedToPrimaryJob` to `true` without providing
     `sidelineRelatedElaboration` → `requiredWhen` conditional-required
     violation.
  4. Setting `employmentIndefinite` to `false` with an `employmentEndDate`
     before `employmentStartDate` → `crossFieldValidation`
     `employmentEndDateAfterStartDate` violation.
  5. Changing `employeeSurnameStatedByEmployer` to a value that no longer
     matches the applicant's own `surname` → `crossFieldValidation`
     `employeeSurnameMatchesApplicant` violation — confirming the new
     identity cross-check rules actually fire.
  6. Setting `employerCvrNumber` to a non-numeric value → `pattern`
     violation (`^[0-9]{8}$`).
- `documents[]` requiredness was checked independently (not by the packet
  checker, which only exercises `fields[]`/`crossFieldValidation`): every
  `requiredWhen.field` reference was confirmed to resolve to a real field
  name, and the conditional gate on `authorisationDocumentation`
  (`danishAuthorisationRequired: true`) was confirmed to evaluate correctly
  against both conformance scenarios (`false` in both, so the document
  correctly does not become required in either).

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass), and
against `node tools/verify-sources.mjs registry/dk/siri/work-permit-application/1.0.0`
(0 warnings, 3 URLs checked, 0 allowlisted, all clear).

## Pre-PR re-verification

Immediately before finalizing this record, the primary source PDF was
re-fetched live a second time in this same session: HTTP 200, `content-type:
application/pdf`, exactly 855,022 bytes, **SHA-256-identical** to the first
fetch. The authority/index page was re-checked live and returns HTTP 200.
`node tools/verify-sources.mjs registry/dk/siri/work-permit-application/1.0.0`
reports all clear (0 warnings) on this same re-verification pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm the DISCO-08 job-classification code's actual format
constraints against SIRI's own published code list (this schema
deliberately leaves `disco08Code` as an unconstrained string, since the
source form states no format rule of its own beyond "state the position's
classification code"); and consider whether SIRI's own downloadable
`AR9`/`ESS1`/`JS1`/`MF4` forms (each confirmed to carry official PDF+Word
downloads on the same index page) are a stronger DMV-adjacent or
family-permit candidate for a future cycle, alongside re-attempting the
AR1/AR6 MitID-gated wizard via a genuinely different technique (e.g. a
leaked or third-party-republished specimen with real field labels, which
was not found this cycle).

## Scope and jurisdiction notes

Gives Denmark (GovSchema's 33rd jurisdiction) its **5th of 6 verticals**
(Passport, Taxes, National ID, Business Formation, Visa); **DMV remains
Denmark's only open vertical**, previously screened and set aside as a poor
candidate (GOV-2253: Færdselsstyrelsen's P23 is a shared multi-party record
card, not a citizen-facing intake form; Motorstyrelsen's re-registration
flow is exclusively login-gated with no static fallback) — a future cycle
should look for a different DMV candidate (e.g. a dedicated
new-vehicle-registration or learner's-permit form) rather than re-attempting
those two.
