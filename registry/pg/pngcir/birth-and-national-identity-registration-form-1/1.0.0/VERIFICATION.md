# Verification record — pg/pngcir/birth-and-national-identity-registration-form-1@1.0.0

## Candidate selection

GOV-5833 ("GovSchema Standard Research"). Re-scanned `CATALOG.md` fresh
first: the Known Gaps `0t.` entry, updated through GOV-5826, shows Papua
New Guinea at 3 of 6 verticals (Business Formation, Passport, Visa), with
National ID banked from the GOV-5812 screening cycle as "two live but flat
(zero-widget) candidates, weaker than a genuine AcroForm":

- `pngcir.gov.pg/wp-content/uploads/2020/03/Births-NID-Registration-form_new_Citizenship_Form.pdf`
  (836,266 bytes)
- `pngcir.gov.pg/wp-content/uploads/2020/01/Form-1-Birth.pdf` (475,527
  bytes)

Both were independently re-fetched this cycle via direct `curl`:

| URL | HTTP | Bytes | sha256 |
|---|---|---|---|
| `.../Births-NID-Registration-form_new_Citizenship_Form.pdf` | 200 | 836,266 (byte-identical to the banked estimate) | `a19b4647b2918576ec8e044ece31f072e156ace2f0bb6e32ea0274f75ca45e4d` |
| `.../Form-1-Birth.pdf` | 200 | 475,527 (byte-identical to the banked estimate) | `f5f104fe9883c380518e7e66b06312197be1c6f7f7e4d45391c7e157c1af3df5` |

Both served directly from `pngcir.gov.pg` with no login/CAPTCHA/WAF gate.

## Comparing the two candidates

Both were parsed with `pdfjs-dist` (legacy build):

- **`...Citizenship_Form.pdf`** (836,266 bytes) — confirmed a **pure
  scanned-image specimen**: both pages return zero text-content items, and
  each page's operator list is dominated by a single `paintImageXObject`
  call (6 total ops per page). It carries no extractable text layer at
  all, not merely zero AcroForm widgets — a strictly weaker candidate than
  its sibling. **Not authored.**
- **`Form-1-Birth.pdf`** (475,527 bytes, this document) — a genuine
  born-digital, flat (zero-AcroForm-widget, independently re-confirmed via
  `getAnnotations()`) 2-page specimen with a full, legible text layer
  covering every printed field label, section header, checkbox option, and
  the asterisk (`*`) convention the form itself uses to mark required
  fields (Section A's own instruction reads "PLEASE WRITE IN BLOCK
  LETTERS & FILL UP ALL REQUIRED INFORMATION (*)"). **Authored as this
  document.**

The form is titled "BIRTH & NATIONAL IDENTITY REGISTRATION FORM," issued
under the Civil Registration Act (Chapter 304) Amended 2014, and serves a
dual purpose: registering a child's birth (Sections A/B, completed by or
for the child/applicant and their parents) and, for an applicant who has
turned 18, registering that same person for a National Identity Card
(Section C) against their existing birth record.

## Disclosed scoping decisions

1. **Section O ("For Office Use Only") is entirely excluded.** Its Birth
   Registration/National Identity Card Registration checkbox pair,
   Registration Date, Province/LLG/District/Ward, Registration Point,
   Registration Officer's Name, and NID No. all sit directly beneath a
   printed "For Office Use Only" heading, indicating registry-staff entry,
   not applicant entry — the same treatment this registry gives other
   office-internal control blocks (e.g. `bd/nidw/nid-correction-application-form-1`'s
   excluded serial-number/office-officer fields; `mx/sre/passport-application`'s
   "Campos de control").
2. **No fillable AcroForm widget exists anywhere on this specimen**
   (independently re-confirmed via `pdfjs-dist`, 0 annotations across both
   pages) — consistent with this registry's own convention
   (`pg/ica/passport-application`) of never modelling a scalar signature
   field absent a genuine backing widget. The two printed signature lines
   that carry their own substantive certification/attestation text —
   Section D's Witness "*Signature:" line, and the closing "I hereby
   certify that the above information is correct for the purpose of
   registration under the Civil Registration Act (Chapter 304) Amended
   2014" statement immediately above the "*Applicant's Signature/Mark*"
   line — are instead modelled as `documents[]` attestation entries
   (`witnessSignature`, `applicantCertificationSignature`), mirroring this
   registry's own established convention for exactly this pattern (e.g.
   `pg/ica/passport-application`'s `certificateRegardingApplicant`/
   `applicantDeclaration` entries). The adjacent **Registration Officer's
   Signature** on the same closing line is excluded as office-internal,
   per (1) above.
3. **A directly-supplied boolean gate, `applicantIsAdult`**, models
   Section C's own printed header condition ("THIS SECTION IS TO BE
   COMPLETED BY APPLICANTS 18 YEARS AND ABOVE ONLY") without a backing
   checkbox of its own — mirroring this registry's own
   `applicantUnder17`/`hasSponsor`/`hasHostInMalta` convention
   (`pg/ica/passport-application`; `cd/maeci/visa-application`;
   `mt/identita/long-stay-visa-application`). Every Section C field is
   `requiredWhen` this gate is true; none is statically required, since a
   birth-only registration (a newborn applicant) never reaches Section C
   at all.
4. **Mother/Father fields are modelled as separate, prefixed sibling
   fields** (e.g. `motherGivenNames`/`fatherGivenNames`), not a single
   shared field, since the form's own "MOTHER   FATHER" column header
   prints each subsequent row label once above two side-by-side fill-in
   boxes — consistent with this registry's established
   two-column-parent-block pattern.
5. **`applicantFamilyName`'s own "(Name at Birth)" footnote and the
   parents' "(Father's Surname)" footnote** are both disclosed in their
   respective fields' `description` rather than modelled as separate
   fields — they are printed clarifying captions under the Family Name
   row, not additional data points.
6. **`applicantPreferredSpouseFamilyName` and
   `applicantSpouseNidNumberOrName` are left bare-optional, not
   `requiredWhen`-gated**, despite the form's own "(Married Woman Only)"
   caption beneath the first, since (as with
   `pg/ica/passport-application`'s own `otherParentFullName` precedent) a
   parenthetical scope caption is not an imperative requirement statement,
   and inventing a hard `maritalStatus == MARRIED AND gender == FEMALE`
   gate would go beyond what the form itself states.
7. **`typeOfBirth`'s own "(Fill Form 4: Particulars of an Adoption)"
   cross-reference** (appearing under Registered As = Adoption) points to
   a separate PNGCIR form (Form 4) outside this specimen's own scope —
   disclosed, not modelled, consistent with this registry's standing
   practice of not reaching into a cross-referenced sibling document not
   itself sourced this cycle.
8. **Parents Marriage Information (`typeOfMarriage`, `dateOfMarriage`,
   `marriageRegistrationNumber`) is left unconditionally optional**,
   exactly as the form itself prints it (no asterisk on any of its three
   fields, captioned "Civil & Customary Marriage Only") — no boolean "are
   the parents married" gate exists on the form to bind a `requiredWhen`
   condition to, so none is invented.
9. **`orderOfChild` is modelled as a bare-optional integer** (the form's
   own "Order of Child:" field, e.g. 1st/2nd/3rd child born to the same
   mother) and **`applicantDisability` as a bare-optional free-text
   field** (the form provides only a blank line, no Yes/No checkbox) —
   both unmarked with the form's own required-field asterisk.
10. **Screened but not re-scoped this cycle**: PG's DMV and Taxes
    verticals remain confirmed dead ends per the GOV-5812 cycle; the
    sibling IPA Form A-2 (Business Formation companion) remains open,
    unauthored backlog.

## Model summary

87 `fields[]` across 4 steps (1 of the 87 is the directly-supplied
`applicantIsAdult` gate without a backing widget), 2 `documents[]`
attestation entries (`witnessSignature`, `applicantCertificationSignature`),
and no `crossFieldValidation` rules (no genuine structural date/numeric
relationship is printed on this specimen beyond what independent fields
already capture).

## Conformance testing

3 valid mock scenarios:

1. A newborn's birth registration with married parents and no Section C
   fields populated (`applicantIsAdult: false`).
2. An 18-year-old applicant's own National Identity Card registration with
   Section C fully populated, unmarried.
3. A married female 18+ applicant exercising the optional spouse fields
   (`applicantPreferredSpouseFamilyName`, `applicantSpouseNidNumberOrName`).

Plus 15 mutation-control fixtures:

- 11 missing-required fixtures: `applicantGivenNames`,
  `applicantFamilyName`, `applicantMobileNumber` (Section A);
  `motherGivenNames`, `fatherFamilyName`, `motherOriginClan`,
  `motherOriginCountry`, `motherResidentialProvince` (Section B);
  `applicantIsAdult` (the Section C gate itself); `witnessGivenNames`,
  `witnessOccupation` (Section D).
- 2 missing-`requiredWhen` fixtures, both with `applicantIsAdult: true`:
  `applicantOriginProvince` and `applicantEducation` omitted.
- 1 invalid-enum-value fixture (`applicantGender` set to an out-of-enum
  value).
- 1 unknown-field-rejected fixture.

All 18 fixtures committed under
`conformance/pg/pngcir/birth-and-national-identity-registration-form-1/1.0.0/`,
following this registry's established flat-object-per-fixture convention
(`documents[]` requiredness is not exercised by conformance fixtures,
consistent with every other schema in this registry). An ephemeral,
from-scratch conformance checker (deriving required/`requiredWhen` rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 18 fixtures: all 3 valid scenarios at 0 errors, all 15
mutation controls each raising exactly 1 error.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs`, individually and as part of the full registry
run (708/708 passing).

## Vertical status

Opens Papua New Guinea's National ID & Civic Documents vertical (4 of 6).
DMV and Taxes remain confirmed dead ends; the sibling IPA Form A-2 remains
open, unauthored Business Formation backlog.
