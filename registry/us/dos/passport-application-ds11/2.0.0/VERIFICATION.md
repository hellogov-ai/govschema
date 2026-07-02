# Verification record — `us/dos/passport-application-ds11` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0`'s own `VERIFICATION.md` stays as the authoring provenance for
that version and is not edited (VERSIONING.md §3 immutability); `v1.1.0` shipped
without its own record. This is a fresh record for `v2.0.0`.

## Current claim

- **`status`:** `verified` (advanced from `draft` — this version performs the
  full field-by-field review the practice requires)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

This closes out [GOV-669](/GOV/issues/GOV-669) (Plan §2 F0.b, split from the
[GOV-664](/GOV/issues/GOV-664#document-plan) Department of State forms plan).

## First finding: the recorded `source.url` is dead

`v1.1.0`'s `source.url`, `https://travel.state.gov/en/passports/how-apply.html`,
now returns HTTP 404. travel.state.gov restructured its passport-application
section into `apply.html` plus dedicated sub-pages (`apply/adults.html`,
`apply/child/under-16.html`, `apply/help/*`). `source.url` is corrected to
`https://travel.state.gov/en/passports/apply/adults.html`, the current page for
the adult in-person flow this document primarily models.

## Independent review pass

Per the practice's Procedure steps 2–3, this pass re-fetched every source
fresh rather than trusting `v1.0.0`/`v1.1.0`'s authoring record:

- **Live guidance pages** (retrieved 2026-07-02): `apply.html`, `apply/adults.html`,
  `apply/child/under-16.html`, `apply/help/citizenship-evidence.html`,
  `apply/help/photo-id.html`, `apply/help/photos.html`, `apply/help/forms.html`,
  `apply/help/fees.html`.
- **The live fillable Form DS-11 PDF** (`eforms.state.gov/Forms/ds11_pdf.pdf`,
  "DS-11 04-2025" per its own footer, OMB expiration 06/30/2028) — extracted two
  independent ways, same methodology as the sibling DS-82 v2.0.0 review:
  - **Page text**, via `pdfjs-dist`'s `getTextContent()` (6 pages: 4 instruction
    pages + 2 application pages), giving the exact printed wording of Section A
    (eligibility), Section C (numbered field instructions 1–8), Section D
    (attachments: citizenship, identity, photo, and — new to this review —
    parental relationship/awareness), and the Application Page 1–2 field
    captions.
  - **AcroForm field structure**, via `pdf-lib`'s form-field API (84 named
    widgets) plus a raw widget-appearance-state pass (`/AP /N` dictionary keys)
    to recover the exact export values of every checkbox/radio group (e.g.
    `Gender :: /M, /F`, `Selection :: /Book, /Card, /Both`, `Parent 1 US Citizen
    :: /Yes, /No`) — cross-checked against the page text.

## Why this is a MAJOR version, not MINOR or PATCH

Two independent classes of change are bundled in this release:

1. **Field-removing / validation-tightening corrections** (see below) — per
   [VERSIONING.md](../../../../../VERSIONING.md) §1, removing a field or
   narrowing an `enum` so previously valid input becomes invalid is MAJOR: an
   agent built against `v1.1.0` that sent `sexMarker: "X"`, `photoIdType:
   "state_id"`, or separate `heightFeet`/`heightInches` would have that input
   rejected or dropped by `v2.0.0`.
2. **Many new, entirely optional (or newly-required-but-additive) fields** —
   on their own this would be MINOR/MAJOR depending on requiredness, but is
   dominated by (1) regardless.

The higher of the two — MAJOR — governs the release as a whole: `1.1.0` →
**`2.0.0`**.

## Discrepancies found and corrected

1. **`sexMarker` narrowed from `["F", "M", "X"]` to `["F", "M"]`.** The live
   Gender radio widget on Form DS-11 (04-2025) offers only `/M` and `/F`; the
   form's own instructions state you must select "M" or "F" corresponding to
   biological sex at birth. No `X` option exists on the current form (same
   finding as the sibling DS-82 v2.0.0 review).
2. **`photoIdType` enum corrected: `state_id` removed, seven new values
   added.** `state_id` (a generic non-driver state ID) does not appear on
   either the form's own Section D.2 list or the "Photo ID Requirements" page
   — a plain state ID without a driver's license is actually a *secondary* ID
   requiring a second document, not primary. Removing it is a real
   narrowing (a discrepancy correction, not a new restriction). Added:
   `certificate_of_naturalization`, `certificate_of_citizenship`,
   `foreign_passport`, `matricula_consular`, `permanent_resident_card`,
   `trusted_traveler_id`, `tribal_photo_id` — all confirmed primary-ID
   categories on the live "Photo ID Requirements" page and/or Section D.2.
3. **`heightFeet` + `heightInches` replaced by a single `height` string
   field.** The AcroForm has exactly one `Height` text widget, not separate
   feet/inches boxes — the same single-field convention already used by
   sibling schema `us/dos/passport-renewal-ds82`. The two-integer split was
   never grounded in the source.
4. **`email`/`phone` `sourceRef`s corrected.** `v1.1.0` cited "item 6 — Email"
   and "item 7 — Phone Number". The current form's Section C numbers the
   items 1 Name, 2 DOB, 3 Sex, 4 Place of Birth, 5 SSN, **6 USCIS Registration
   A-Number**, **7 Email Address**, 8 Mailing Address; the phone number
   caption ("Primary Contact Phone Number") is not itself a numbered
   instruction item. Corrected to item 6 = A-Number (newly modeled, see
   below), item 7 = Email, and phone cited without a fabricated item number.
5. **`socialSecurityNumber` description corrected to state the no-SSN
   pathway precisely.** The form requires entering all zeros
   (`000000000`, which still satisfies the existing `^[0-9]{9}$` pattern —
   no validation change) plus a specific signed perjury statement if the
   applicant has never been issued an SSN. `v1.1.0`'s description gestured at
   "an alternative attestation" without the mechanism; the new field
   `noSsnAttestationStatement` (see below) models the attestation itself.

## New fields added

Discovered by cross-referencing the AcroForm's 84 named widgets and Section D
against `v1.1.0`'s 32 fields:

- **`uscisANumber`** — Section C item 6, USCIS Registration A-Number.
- **`noSsnAttestationStatement`** — the signed perjury statement required when
  `socialSecurityNumber` is all zeros.
- **`mailingAddressCountry`** — the form has a country line (`Applicant
  Address Country`); `v1.1.0` implicitly assumed U.S.-only.
- **Permanent address** (`permanentAddressLine1/Line2/City/State/PostalCode`)
  — a block distinct from mailing address, confirmed via five dedicated
  `Permanent Address *` widgets. Unlike sibling DS-82, this form's permanent
  address block has no country line.
- **`everAppliedForOrIssuedPassport`** — the form's own Yes/No gate (`Ever
  Applied or Issued`) for whether the prior-passport-details block applies;
  more precise than inferring this from `inPersonReason`.
- **Prior passport details** (`priorPassportNameOnBook`,
  `priorPassportNameOnCard`, `priorPassportBookStatus`,
  `priorPassportCardStatus`, `priorPassportLossOrTheftDetails`) — Application
  Page 2's book/card status radio groups (confirmed export values:
  `Submitting`/`Stolen`/`Lost`/`Possession`, separately for book and card) and
  free-text circumstances field.
- **Parent detail fields** (`parent1DateOfBirth`, `parent1PlaceOfBirth`,
  `parent1Gender`, `parent1UsCitizen`, and the `parent2*` equivalents) — the
  form's Parent 1/2 blocks ask DOB, place of birth, sex marker, and a Yes/No
  U.S.-citizenship question; `v1.1.0` only had a free-text name and a
  citizenship-country string. Both are kept: `parent1Citizenship` remains as
  supplementary detail, `parent1UsCitizen` models the form's actual Yes/No
  field.
- **Parental consent for under-16 applicants**
  (`parentsOrGuardiansPresentInPerson`, `parentalConsentPathway`,
  `parentalConsentDocument`) and **parental awareness for 16-17 applicants**
  (`parentalAwarenessAcknowledgement`) — Section D.4 ("Proof of Parental
  Relationship" / "Proof of Parental Awareness") was entirely unmodeled in
  `v1.1.0` beyond a vague description note. This is real, consequential
  process detail: an agent unaware that one absent parent requires a
  notarized Form DS-3053 (or death certificate, sole-custody evidence, Form
  DS-5525, or guardian/institution documents) would produce an incomplete
  child application. Gated with `visibleWhen`/`requiredWhen` on
  `inPersonReason == "under_16"` (GSP-0013); the 16-17 awareness field is
  documented textually since no field in this document lets a condition
  compute "age 16 or 17" from `dateOfBirth`.
- **Marital status** (`everMarried`, `spouseFullName`, `spouseDateOfBirth`,
  `spousePlaceOfBirth`, `spouseUsCitizen`, `dateOfMarriage`,
  `divorcedOrWidowed`, `divorceOrWidowDate`) — a full Application Page 2
  section (`Ever Married`, spouse name/DOB/place of birth, `Spouse US
  Citizen`, `Date of Marriage`, `Divorced`, `Widow/Divorce Date`) was entirely
  unmodeled. New `marital_status` step inserted between `parents` and
  `emergency_and_travel`; no existing step is removed or renamed.
- **Emergency contact address** (`emergencyContactAddressLine1/Line2/City/
  State/PostalCode`) — `v1.1.0` had only name/phone/relationship; the form
  also collects a full address for the emergency contact.
- **`travelReturnDate`** — pairs with the already-modeled
  `travelDepartureDate`; the form has a separate `Travel Return Date` widget.
- **`bookSize`** (`regular`/`large`) — the form's `Regular or Large Book`
  checkbox pair, applicable only when requesting a passport book.

## Intentionally not modeled

- **Fees, processing times, and mailing addresses for submission** (Sections
  D.5/E/F) remain deliberately excluded as data, per `v1.0.0`'s original
  scope decision (fee/policy volatility), unchanged.
- **Secondary citizenship/identity evidence pathways** (delayed birth
  certificates, Letters of No Record, early-life records, the two-ID
  secondary-photo-ID path, file-search requests) are out of scope for the
  structured `citizenshipEvidenceType`/`photoIdType` enums, which model the
  *primary* evidence categories only; the live source is authoritative for
  applicants who cannot use a primary category.
- **`Additional #` checkbox group** (export values `Home`/`Work`/`Cell`/
  `Other`), which appears to tag each of the three `Applicant Phone` boxes by
  type. Not modeled — the existing single `phone` field is retained as-is,
  consistent with `v1.0.0`'s original single-phone-field scope.
- **The `" 2"`-suffixed widgets** (`Name of Applicant 2`, `Applicant DOB 2`).
  Consistent with the same finding on sibling DS-82, these read as a Page 2
  identity-header repeat of already-captured applicant fields, not a distinct
  data element.
- **Out-of-country DS-3053 notarization list.** The live source publishes a
  list of countries where Form DS-3053 must be notarized at a U.S. embassy or
  consulate rather than a local notary; this list changes independently of
  the form and is referenced from `parentalConsentDocument`'s description
  rather than encoded, consistent with the fee/policy-volatility principle
  above.

## Sources examined

- **Live pages:** `https://travel.state.gov/en/passports/apply.html`,
  `apply/adults.html`, `apply/child/under-16.html`,
  `apply/help/citizenship-evidence.html`, `apply/help/photo-id.html`,
  `apply/help/photos.html`, `apply/help/forms.html`, `apply/help/fees.html` —
  all retrieved 2026-07-02.
- **Form PDF:** `https://eforms.state.gov/Forms/ds11_pdf.pdf` ("DS-11
  04-2025"), retrieved 2026-07-02, extracted via `pdfjs-dist` page text and
  `pdf-lib` AcroForm field + widget-appearance-state enumeration.
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is **2027-01-02** (6 months):
this cycle found a real, mid-cycle form-revision drift (a dead `source.url`,
plus multiple structural corrections) since `v1.0.0`/`v1.1.0` were authored,
matching the sibling DS-82 finding. Re-check the source on or before that
date, and immediately on any new Form DS-11 revision notice or `source.url`
change.
