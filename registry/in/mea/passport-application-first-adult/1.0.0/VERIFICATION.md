# Verification record — `in/mea/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this candidate, why now

The GOV-869 "GovSchema Standard Research" cycle's first phase was to catalog
the existing registry against the six focus verticals (DMV, Business
Formation, Visa, Passport, Taxes, National ID & Civic Documents) across the
ten jurisdictions already in scope (US, GB, IE, CA, NZ, AU, DE, SG, FR, NL).
That matrix was found saturated at 59/60: every cell has at least one
authored schema except `nl`×Visa (investigated and ruled out in GOV-859 —
the Schengen short-stay form would duplicate `fr/france-visas/schengen-visa-
application`, and the national long-stay MVV visa is fragmented across 200+
purpose-specific forms with no single representative one) and `eu`×ETIAS
(not live until Q4 2026, per GOV-822/GOV-756). With no further gap to close
inside the existing ten jurisdictions, this cycle opened an eleventh
jurisdiction instead — the same routine-expansion move GOV-829 made for the
Netherlands as the tenth. India was chosen for population scale, growing
agent-economy relevance, and — decisive for sourcing — the Ministry of
External Affairs publishes its passport application's column-by-column field
guidance, applicant-category table, and document list directly in English on
its own domain, rather than requiring a login-gated portal or a
non-English-only source.

## Sources examined

- **Document `(id, version)`:** `in/mea/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of External Affairs (MEA), Government of India,
  under the Passports Act, 1967. Applications are processed through the
  Passport Seva system (Regional Passport Offices, Passport Seva Kendras,
  Post Office PSKs, District Passport Cells, Speed Post Centres, and Citizen
  Service Centres).
- **Primary source (fetched directly, HTTP 200):**
  <https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf>
  — the MEA's own 21-page "Instructions for Filling of Passport Application
  Form and Supplementary Form" booklet. Covers: the full column-by-column
  guidance for both forms (Sections B and C), the applicant-category table
  mapping each fresh/re-issue case to its required documents (Table 2), the
  overall document list (Table 3), the fee list (Table 4), and specimen
  annexures (A, C, D, F, G, H, I, J).
  - **Extraction technique.** This PDF renders its text via embedded
    CID-keyed fonts. The usual zero-dependency technique (decompress
    Flate-encoded content streams, regex-match `Tj`/`TJ` string operands) only
    recovers whitespace/kerning-array placeholders here, not the underlying
    glyphs — a different failure mode than GOV-634's glyph-obfuscated PDF
    (which rasterize-and-read solved) because poppler/`pdftoppm` is not
    installed in this environment. Instead, a scratch `npm install
    pdfjs-dist@3` (legacy Node build, driven via a small script with
    `getTextContent()` per page, not a browser) correctly resolved the CID
    font's glyph-to-Unicode mapping and extracted clean, readable text for
    all 21 pages. This is the technique to reach for first, ahead of
    rasterization, whenever a PDF has genuine embedded-font text (not scanned
    images) that the naive regex approach garbles.
- **Secondary corroborating source (raw curl fetch, not an AI-summarized
  WebFetch, to avoid summarization risk):**
  <https://www.bankbazaar.com/passport/how-fill-passport-application-form.html>
  — an independent third-party field-by-field summary of the live
  application form. Used **only** to confirm the exact enum strings for
  three fields (`gender`, `maritalStatus`, `employmentType`) that the
  official booklet describes narratively ("put a cross in the appropriate
  box") without listing the box-label text itself. Raw HTML fetched directly
  confirms verbatim: "Gender: Male, Female, Transgender"; "Marital Status:
  Single, Married, Divorced, Widow/Widower, Separated"; and the
  employment-type list encoded in `fields[].employmentType.validation.enum`.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Column 1.1/1.2 — "Fresh Passport ... if you have never held a passport" | `previouslyHeldIndianPassport` |
| Table 2, Case I(B) "Minor" | `applicantIsMinor` |
| Column 2.8 — "Citizenship of India by" (birth/descent/registration/naturalization) | `citizenshipBasis` |
| Column 2.1 — Given Name & Surname | `surname`, `givenName` |
| Column 2.2 — aliases | `hasAlias`, `aliasGivenName` |
| Column 2.3 — name changes | `hasNameEverChanged`, `previousGivenName` |
| Column 2.4 — Date of Birth | `dateOfBirth` |
| Column 2.5 — Place of Birth (India vs. abroad vs. Undivided India) | `placeOfBirthCountry`, `placeOfBirthCity`, `placeOfBirthDistrict`, `placeOfBirthState` |
| Column 2.6/2.7 — Gender, Marital Status | `gender`, `maritalStatus` (enum corroborated via bankbazaar.com) |
| Column 2.9/2.10 — PAN, Voter ID | `panNumber`, `voterIdNumber` |
| Column 2.11/2.12 — Employment Type, employer organization | `employmentType` (enum corroborated via bankbazaar.com), `employerOrganizationName` |
| Column 2.13 — parent(minor)/spouse government servant | `isSpouseGovernmentServant` |
| Column 2.14 — Educational Qualification | `educationalQualification` |
| Column 2.15 — Non-ECR eligibility | `eligibleForNonECR`, `documents[].proofOfNonECRCategory` |
| Column 2.16 — distinguishing mark | `distinguishingMark` |
| Column 2.17 — Aadhaar Number | `aadhaarNumber` |
| Column 3 — Family Details, spouse name from spouse's passport | `fatherGivenName`, `motherGivenName`, `legalGuardianName`, `spouseName` |
| Column 4 — Present Residential Address Details | `presentAddressLine1/City/State/PinCode`, `permanentAddressSameAsPresent`, `permanentAddressLine1` |
| Column 5 — Emergency Contact Details | `emergencyContactName/Phone/Address` |
| Column 7 — Other Details (pending criminal case, court permission) | `hasPendingCriminalCase`, `documents[].courtPermissionLetter` |
| Column 1.4 — Type of Application (Normal/Tatkaal) | `processingSpeed` |
| Column 1.5 — Type of Passport Booklet (36/60 pages) | `passportBookletType` |
| Table 3, Document No. 1 — Proof of Present Address | `documents[].proofOfPresentAddress` |
| Table 3, Document No. 2 — Proof of Date of Birth | `documents[].proofOfDateOfBirth` |
| Annexure 'A'; Table 3, Document No. 45 — Identity Certificate | `documents[].identityCertificate`, gated on `employmentType` in government/PSU/statutory-body |
| Section E, Table 4; Column 8 — fee payment methods by submission channel | `documents[].applicationFeePayment` |

## What is NOT independently confirmed / out of scope

- **A live Passport Seva Online Portal walkthrough.** This document is
  transcribed from the MEA's own instruction booklet, not a completed live
  online-application session (the portal requires a registered account and
  an OTP-verified mobile number to reach the actual entry form). The
  booklet's columns are stated by the MEA to be shared between the online
  portal and the paper form, but the online screens' exact field-by-field
  presentation (single page vs. wizard steps, client-side validation
  messages) is not directly observed.
- **`educationalQualification`'s exact closed option list.** The booklet
  only says "put a cross in the appropriate box"; no source examined during
  this cycle states the box labels verbatim, so this field is modelled as
  free text rather than a guessed `enum`, per this registry's "spec
  precision over cleverness" discipline — an unverified enum is a worse
  defect than an honest free-text field. Confirming the live options is
  flagged as a future MINOR addition.
- **`gender`/`maritalStatus`/`employmentType` enum wording.** Confirmed only
  via a secondary, third-party source (bankbazaar.com), not the MEA's own
  wording directly — the booklet describes these columns narratively without
  quoting the checkbox labels. Flagged here and in the schema's own
  `verification.notes` so a future reviewer knows to prioritize confirming
  these three against a live portal session before advancing to `verified`.
- **Minor applicants (Case I(B)), re-issue, citizenship by descent/
  registration/naturalization (Case I(A)(2)/(3)), diplomatic/official
  passport holders, and Tatkaal-only document variants** are out of scope of
  this "first adult, citizen by birth" document, matching this registry's
  narrow-first-schema-per-jurisdiction convention (`fr/ants`, `gb/hmpo`,
  `ca/ircc`, `au/apo` all scoped their first passport schema the same way).
- **Fee amounts.** Table 4's fee figures are not encoded as a single
  authoritative amount on `documents[].applicationFeePayment`, since fees
  change over time — the same convention `de/bmi/passport-application` and
  `nl/rvig/passport-application` used.

## Scope and jurisdiction notes

- This is India's **first** registry entry, opening it as this registry's
  eleventh jurisdiction alongside US, GB, IE, CA, NZ, AU, DE, SG, FR, and NL.
  `discovery/catalog.json`'s `scope.jurisdictions` and description were
  updated accordingly.
- Conditional flow uses `requiredWhen` (GSP-0013) for the alias/name-change/
  address/spouse-name/employer-organization branches, `requiredWhen` with
  the `in` operator for the government/PSU/statutory-body-gated Identity
  Certificate document, and `steps[].transitions` with `exitReason`
  (GSP-0013 §4) for the three genuine eligibility gates (previously held a
  passport; minor applicant; citizenship not by birth) that exit this flow
  to an unmodelled process.
- `dateOfBirth`, `aadhaarNumber`, and `panNumber` are marked
  `classification: sensitive-pii`; the remaining name/address/contact fields
  are marked `classification: pii`, per GSP-0006's advisory vocabulary.
- Mock-data condition-evaluator testing (a full positive-control profile —
  married, government-employed, Non-ECR-eligible, no pending case; three
  negative controls exercising each of the three eligibility exits; and an
  edge-case profile — single, privately employed, pending criminal case,
  permanent address different from present address) confirmed every
  `requiredWhen`/`transitions` branch resolves as intended: the positive
  control has zero missing required fields and correctly requires
  `employerOrganizationName`, `spouseName`, and the Non-ECR/Identity-
  Certificate documents; the three negative controls each exit at
  `eligibility` with the correct `exitReason`; and the edge case correctly
  drops the now-inapplicable `spouseName`/`employerOrganizationName`
  requirements while requiring `permanentAddressLine1` and the court
  permission letter. No script is checked into the registry
  (structural-reference schemas in this registry do not carry conformance
  fixtures — GSP-0016 fixtures are used once a schema reaches `verified`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Passport Seva
Online Portal account completes an actual online application walkthrough (or
obtains independent confirmation from someone who has), confirming: the
`educationalQualification` and any other unconfirmed option lists directly
against the live portal's own field labels, whether the online and paper
forms are truly field-identical, and the current fee figures.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
