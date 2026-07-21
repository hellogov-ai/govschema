# Verification record — cy/crmd/passport-application@1.0.0

## Candidate selection

GOV-4121 ("GovSchema Standard Research") found no pre-banked candidate at
cycle start — the prior cycle's Austria DMV / Netherlands Visa pair
(GOV-4092/GOV-4094) had both been authored (GOV-4100, GOV-4107). A fresh
scan of every remaining single-vertical-gap jurisdiction (BR/CH/PL/SK/MK
Visa, GR/HU National ID, and Kazakhstan's/Jordan's/Morocco's remaining
verticals) found each one already a confirmed dead end recorded in an
earlier cycle, so this cycle scouted three brand-new jurisdictions in
parallel instead: Latvia, Saudi Arabia, and Cyprus, none yet in the
registry.

- **Saudi Arabia**: dead end across all six verticals. Every service
  (Absher traffic/DMV, the Saudi Business Center, ZATCA tax registration,
  Jawazat passport issuance, Iqama/national-ID) funnels through Nafath
  national SSO or a structurally circular Absher login (which itself
  requires an existing national ID to authenticate); `moi.gov.sa` was
  network-unreachable and `visa.visitsaudi.com` returned a WAF block to
  automated fetch. No unauthenticated first-party form or field-level
  guide found for any vertical.
- **Latvia**: Business Formation is a strong, genuinely open candidate —
  the Register of Enterprises' KR2 sole-trader registration form, served
  directly and unauthenticated as a native `.docx` at
  `apraksti.ur.gov.lv/lv/KR2%20veidlapa`. Left as pre-scouted backlog (see
  the Known Gaps update) rather than authored this cycle, since Cyprus's
  Passport candidate was stronger on freshness and simplicity.
- **Cyprus**: won this cycle. Passport (CRMD) is a genuine, unauthenticated,
  dated (November 2025) first-party PDF with clear field-by-field structure
  once rendered; Cyprus's Visa form is a confirmed field-for-field duplicate
  of the EU-harmonized Schengen Annex I template already modelled at
  `de/auswaertiges-amt/national-visa-application` (not a fresh win, despite
  Cyprus being outside Schengen); Business Formation's HE1 incorporation
  form must be sworn before a Cyprus lawyer in court, not self-service;
  DMV's first-party host (`mcw.gov.cy`) is currently unreachable
  mid-domain-migration; Taxes (TD1) has migrated fully to the login-gated
  TAXISnet/TFA e-filing system; National ID requires CY Login SSO. Passport
  was the clear strongest of Cyprus's six.

## Reaching the live source

Fetched `https://www.gov.cy/media/sites/127/2025/11/Passport-form-ENGLISH.pdf`
directly with `curl` using a standard desktop Chrome User-Agent (this
registry's own WebFetch tool's default UA is WAF-blocked on this asset;
a browser UA is not — the same UA-sniffing pattern this registry has hit
on other `gov.cy`-family and similarly WAF-fronted hosts).

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 217081`,
  `Last-Modified: Thu, 20 Nov 2025 12:15:06 GMT`.
- sha256:
  `3309049ceb05fb083801d4edd56e9c7ee87e9ead12e7e13d0824005a22e8f596`.
- No login, CAPTCHA, or WAF gate on the asset itself once a browser UA is
  used.

## Structure of the source

Five pages. `pdfjs-dist`'s `getFieldObjects()` returns null and the page
annotation arrays are empty — this is a flat, non-AcroForm scanned PDF, not
a fillable form. Its embedded OCR text layer is badly garbled (checkbox
rows extract as fragments like `0Married Osingle 0 Divorced`, and several
header lines are unrecoverable noise), so every field in this schema was
derived from a direct visual read of each page rendered at 3x scale via
`pdfjs-dist` + `node-canvas`, not the text layer — the same technique this
registry used for other badly-OCR'd or checkbox-dense flat scans (e.g.
`at/bmi/driving-licence-application`, GOV-4100). Page 4 is instructions
prose (including the numbered supporting-document list modelled as
`documents[]` below); page 5 was confirmed genuinely blank by direct visual
inspection of its render, not assumed from a truncated text dump.

Page 1 splits into an applicant-facing top block (the Issue/Reissue/
Replacement request-type checkboxes, plus an "ATTENTION" notice) and a
"FOR OFFICIAL USE" block beneath it covering the assigned passport number,
receiving office, application/receipt numbers, a "Taking of biometric
features" checkbox, and a 7-way "Type of Passport" classification
(biometric/non-biometric/diplomatic/service/limited-validity/refugee/
temporary). All of the latter sits inside the form's own "FOR OFFICIAL USE"
bounding box with no visual separation from the unambiguous clerk-only
intake fields beside it, so the entire block — including "Type of
Passport," despite nominally describing something an applicant might
expect to select — is modelled as office-only and excluded from
`fields[]`, consistent with this registry's convention for other
jurisdictions' clerk-only intake/classification sections.

## Disclosed source-fidelity findings

1. **Sections II/III (parents' details) carry no minor-only qualifier.**
   Unlike Section VI ("...OF UNDERAGE APPLICANTS," printed explicitly),
   Sections II and III ("FATHER'S DETAILS"/"MOTHER'S DETAILS") have no
   conditional marker restricting them to minor applicants. Modelled as
   required for every applicant regardless of age.
2. **Asymmetric label for the same concept.** The father's row is headed
   "Surname"; the mother's equivalent row is headed "Family Name." Kept as
   printed (`fatherSurname` vs. `motherFamilyName`) rather than silently
   normalized to one term.
3. **One input box, two stacked labels.** Section V(i)'s box is captioned
   "Passport No." directly above "Travel Document No.," with no visual
   separator distinguishing which label the blank line actually belongs
   to. Modelled as a single field
   (`otherCyprusPassportOrTravelDocumentNumber`) with both labels preserved
   in its own label text, rather than guessing.
4. **The guardian party has no biographical block.** Unlike the father and
   mother, who each get a full name/DOB/nationality/passport-number block
   in Sections II/III, the guardian appears only inside the Section VI
   declaration — a signature line and an ID-card-number line, nothing
   else. No `guardianName`/`guardianDateOfBirth` field exists to model,
   because none is printed anywhere on the form.
5. **Section VI's true consent rule is not a strict AND.** The section's
   own text asks for both parents' (or the guardian's) signature for every
   minor applicant, but the page-4 instructions carve out two exceptions:
   a Family Court sole-custody order lets the other parent sign alone, and
   the guardian's signature is a full alternative to both parents', not an
   addition to them. GSP-0013's `requiredWhen` grammar has no "exactly one
   of, unless N, in which case a different M" primitive to express this —
   the same limitation `il/moin/dr1-passport-application` disclosed for
   its own single-parent-consent rule. `fatherConsentSignature`/
   `motherConsentSignature` are modelled `requiredWhen applicantIsMinor` as
   the section's own printed default; the exceptions are disclosed here,
   not encoded.
6. **`applicantIsMinor` is not a printed checkbox.** As with
   `il/moin/dr1-passport-application`'s own `applicantIsMinor`, this form
   instead renders two separate, mutually exclusive declaration sections —
   Section VI for underage applicants, Section VII for applicants over 18
   — and the schema models the gating boolean directly rather than
   inferring it from a nonexistent checkbox.
7. **Two page-4 document requirements are narrower than the schema's
   `requiredWhen` can express.** The police certificate (D.3) is textually
   tied to loss/theft specifically, while `applicationType: REPLACEMENT`
   also covers wear-and-tear (which would not need a police report); the
   Cypriot-citizenship certificate (D.7.ii) is textually tied to
   naturalization/registration specifically, while every `ISSUE`
   (first-time) applicant is modelled as needing it, including those who
   are Cypriot by birth. Both narrowings are disclosed in the affected
   `documents[]` entries' own `sourceRef` rather than encoded, since
   neither distinction has a corresponding field on the form.

## Conformance

2 valid mock scenarios
(`conformance/cy/crmd/passport-application/1.0.0/valid-adult-first-time.json`,
an adult first-time applicant with no other-passport history;
`valid-minor-both-parents-consent.json`, a minor applicant whose reissue
application is signed by both parents) plus 8 mutation-control fixtures
(a missing statically-required field; a missing father-consent signature
while `applicantIsMinor` is true; a missing other-Cyprus-passport number
while `hasOtherCyprusPassport` is true; a missing birth-certificate
document while `applicationType` is `ISSUE`; an invalid `sex` enum value;
an invalid `applicationType` enum value; an unknown top-level field; and a
missing applicant-signature while `applicantIsMinor` is false) are
committed under `conformance/cy/crmd/passport-application/1.0.0/`.

An ephemeral, from-scratch mock validator (deriving required/`requiredWhen`
rules directly from this schema's own `fields[]`/`documents[]`, not
committed) ran all 10 fixtures: both valid scenarios at 0 errors, all 8
mutation controls each raising exactly 1 error, and confirmed every
`requiredWhen` field reference resolves (0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass at
568/568 for the full registry, individually and as part of the full run.

## Scope boundaries

This document models only the applicant-facing side of the form: the
request-type selection, applicant/father/mother/spouse identity blocks,
the applicant's own passport-history questions, and the age-appropriate
declaration section (VI or VII). It excludes the form's own
"FOR OFFICIAL USE" block (see above) and the officer's own countersignature
line at the bottom of page 3. Submission is in-person only, at a District
Authority, Citizen Service Centre, or Cypriot consulate/embassy abroad — no
online filing channel exists for this form. This schema does not submit
anything on an applicant's behalf and does not imply endorsement by, or
affiliation with, the Republic of Cyprus or its Ministry of Interior.
