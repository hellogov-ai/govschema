# Verification record — `nl/ind/family-member-admission-and-residence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Netherlands' family-member visa application

This is the recurring "GovSchema Standard Research" cycle (GOV-4107). The
Netherlands stood at 5 of 6 verticals, Visa being the only gap, since the
harmonised Schengen short-stay (C-visa) route for NL is a confirmed dead end
(`consular.mfaservices.nl`, account-gated — recorded in this registry's Known
Gaps section). The GOV-4092 cycle (2026-07-21) had screened and banked IND
Form 9511 as a genuinely open, ready-to-author candidate for this exact gap,
alongside Austria's DMV candidate (authored the same day via GOV-4100). This
cycle re-confirmed the source is still reachable and authored the schema.
This document closes the NL x Visa cell, giving the Netherlands all 6 of its
verticals.

## Sources examined

- **Document `(id, version)`:** `nl/ind/family-member-admission-and-residence-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration and Naturalisation Service (Immigratie- en
  Naturalisatiedienst, IND).
- **Primary source (field-by-field, the form itself):**
  <https://ind.nl/en/forms/9511.pdf> — fetched fresh this cycle (HTTP 200,
  397,176 bytes, 10 pages), the IND's own canonical English-language edition
  of Form 9511 (edition 2025/8), "Application for admission and residence 'to
  stay with a family member' (foreign national)". A raw byte scan for the
  `/AcroForm` marker confirmed the PDF carries no AcroForm/XFA fields (a
  plain printed-form text layer, the same class as several other static PDFs
  already used in this registry, e.g. `at/bmi/driving-licence-application`).
  Text was extracted with the registry's established `pdfjs-dist` technique,
  reading each page's text-content items and grouping by y-coordinate into
  lines.
- **Structural cross-check via glyph x-coordinates:** Section 3.11
  ("Residence status of your sponsor") prints what a naive line-by-line read
  would flatten into one 9-item list. Extracting each item's raw
  `transform[4]` (x-position) instead reveals two distinct checkbox columns:
  a top-level column at x=218 (5 items: Dutch nationality / Privileged /
  Residence Permit, namely. / Waiting for the application... / None) and an
  indented sub-choice column at x=254, nested specifically under "Residence
  Permit, namely." (4 items: Paid employment / Study / Asylum / A residence
  permit other than as mentioned above). Modelled as `sponsorResidenceStatus`
  (5-value enum) plus a conditional `sponsorResidencePermitType` (4-value
  enum, `requiredWhen sponsorResidenceStatus == "residence_permit"`).
- **Retrieved / reviewed:** 2026-07-21.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What the form's 14 sections map to

- **Page 1 header** ("To be filled in by the Dutch embassy or consulate":
  location of embassy/consulate, date, name/initials of the embassy
  employee) — **not modelled**. This box is completed by embassy/consulate
  staff at the registration appointment, not supplied by the applicant; the
  applicant only receives the resulting V-number back (`vNumber`).
- **Section 1** (applicant identity, civil status, address/contact, travel
  document) → `vNumber` through `travelDocumentIssuedBy`.
- **Heading above 1.16-1.18** ("Only if the applicant is under 18 years of
  age") → `applicantIsMinor` (an explicit boolean gate this document
  introduces, since GovSchema's `requiredWhen` grammar has no
  age-computation operator — the same treatment `nl/rvig/passport-application`
  uses for its own `applicantIsMinor` field) plus
  `legalRepresentativeSurname` through `legalRepresentativeNationality`.
- **Section 2** (does the sponsor already live in the Netherlands?) →
  `sponsorAlreadyInNetherlands`, modelled as a `steps[].transitions` branch
  point: `true` routes to Section 3, `false` skips it (the sponsor applies
  concurrently).
- **Section 3** (sponsor's own identity, civil status, residence status,
  address/contact "in the Netherlands", if applicable) →
  `sponsorVNumber` through `sponsorEmail`, all `requiredWhen
  sponsorAlreadyInNetherlands == true` except `sponsorCitizenServiceNumber`
  (itself marked "if applicable" even within this conditional section, so
  modelled `visibleWhen` rather than `requiredWhen`).
- **Section 4** (identification — passport copies) → the
  `applicantPassportCopy` / `sponsorIdentityDocumentCopy` `documents[]`
  entries. The Turkey/Dutch-Turkish-nationality footnote's alternative
  supporting documents (Turkish passport page, Nüfus card, or a Turkish
  authorities' statement) are a narrow edge case **not modelled** as
  separate document entries.
- **Section 5** (civic integration examination abroad) →
  `civicIntegrationExamStatus` plus the `civicIntegrationExamResults` /
  `civicIntegrationExemptionProof` documents.
- **Sections 6-7 intro** (TB test declaration, two checkboxes) →
  `tbTestDeclaration`.
- **Section 7** (means of evidence — three relationship-to-sponsor
  categories, each with its own document checklist) → `relationshipToSponsor`
  plus 13 conditional `documents[]` entries branching on it (and, within the
  `spouse_or_registered_partner` branch, further branching on `civilStatus`
  for `marriageCertificate` vs. `registeredPartnershipDeed`). The minor-child
  branch's "if your other parent... remains in the country of origin" clause
  is modelled as its own gate, `otherParentRemainsInCountryOfOrigin`, since
  it determines two further conditional documents
  (`consentFromLeftBehindParent`, `leftBehindParentIdCopy`). Two age-based
  nuances the source states in prose — the antecedents certificate is only
  needed for a minor-child applicant aged 12+, and the certificate of
  non-impediment only for one aged 15+ — are **disclosed in each affected
  document's own `sourceRef` but not separately gated**, for the same reason
  `applicantIsMinor` needed an explicit boolean: there is no age-computation
  operator in the current `requiredWhen` grammar to express "applicant's age
  at signatureDate ≥ N" directly against `dateOfBirth`. A strict evaluation
  of this schema therefore over-requires those two documents for a younger
  child; the mock-data test run below demonstrates and works around this by
  supplying `certificateOfNonImpediment` even for an under-15 scenario. This
  is a genuine spec-vocabulary gap, in the same family as GOV-4037's
  disclosed inability to express a stated multiplication formula in
  `crossFieldValidation` — worth flagging to the Founding Engineer as a
  future age/date-arithmetic operator proposal, not fixed unilaterally here.
- **Section 8** (payment of fees; bank details, V-number as payment
  reference) → the `applicationFeePayment` document; the fee amount itself
  is deliberately not encoded as a single authoritative figure (it varies by
  situation), the same convention `nl/rvig/passport-application` and
  `de/bmi/passport-application` use.
- **Section 9** (declaration of consent to e-mail communication, "only if
  your sponsor not already lives in the Netherlands") →
  `communicationConsent`, `requiredWhen sponsorAlreadyInNetherlands ==
  false`.
- **Section 10** (what happens next) — informational only, not modelled.
- **Section 11** (MVV and residence permit: intended departure date,
  collection location) → `intendedDepartureDate` /
  `residencePermitCollectionLocation` (6-option enum: Amsterdam, Goes,
  's-Hertogenbosch (Den Bosch), Den Haag, Maastricht, Zwolle).
- **Section 12** (registering in the Netherlands, BRP/BSN) — informational
  only, describing a post-approval municipal step outside this form; not
  modelled.
- **Section 13** (signing) → `appendicesCount` through `signatureDate`.
- **Section 14** (submission instructions/address) — informational only,
  not modelled.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`notEquals`/`in`/`greaterThan`/`greaterThanOrEqual`/`all`/`any`
grammar as GSP-0013's `Condition` type checked every
`type`/`required`/`requiredWhen`/`validation.enum` field constraint, every
`documents[].requiredWhen`, and both `crossFieldValidation` rules against
four scenarios:

```
OK   Scenario 1: adult spouse, sponsor in NL on paid-employment permit
OK   Scenario 2: unmarried partner, sponsor applying concurrently, email consent
OK   Scenario 3: minor child, legal representative, left-behind parent consent
FAIL Negative control: minor applicant, missing legalRepresentativeSurname (expected FAIL)
    - MISSING required field: legalRepresentativeSurname
    - MISSING required field: legalRepresentativeFirstNames
    - MISSING required field: legalRepresentativeAddressStreet
    - MISSING required field: legalRepresentativeAddressPostcode
    - MISSING required field: legalRepresentativeAddressTown
    - MISSING required field: legalRepresentativeAddressCountry
    - MISSING required field: legalRepresentativeNationality
    - MISSING required field: otherParentRemainsInCountryOfOrigin
    - MISSING required field: communicationConsent
    - MISSING required document: applicantPassportPhoto
    - MISSING required document: applicantPassportCopy
    - MISSING required document: civicIntegrationExemptionProof
    - MISSING required document: sponsorIncomeEvidence
    - MISSING required document: declarationBySponsorAppendix
    - MISSING required document: birthCertificateOrFamilialRelationshipEvidence
    - MISSING required document: parentalAuthorityEvidence
    - MISSING required document: certificateOfNonImpediment
    - MISSING required document: applicationFeePayment
```

Scenarios 1-3 together exercise every `requiredWhen`/`visibleWhen` branch
this document defines: the minor/legal-representative gate, the
sponsor-already-in-NL branch (both `true` with a `residence_permit` +
`sponsorResidencePermitType` sub-choice, and `false` with the
`communicationConsent` gate it triggers), all three `relationshipToSponsor`
means-of-evidence branches (including the `civilStatus`-nested
marriage-certificate-vs-partnership-deed choice and the
`otherParentRemainsInCountryOfOrigin` sub-gate), and both `civicIntegrationExamStatus`
paths. The `travelDocumentValidAfterIssue` `crossFieldValidation` rule holds
in all three; `departureDateNotBeforeSignatureDate` also holds. The fourth
scenario is a negative control confirming the evaluator actually enforces
`requiredWhen` (a minor applicant with no legal-representative data
correctly fails on all of that branch's fields and every downstream document
it withholds an ID for) rather than trivially passing everything. No defects
were found in the schema itself during this pass; the one caveat
(`certificateOfNonImpediment`'s age nuance, above) is a disclosed,
intentional non-modelled gap, not a bug.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/nl/ind/family-member-admission-and-residence-application/1.0.0/schema.json
ok   registry/nl/ind/family-member-admission-and-residence-application/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/nl/ind/family-member-admission-and-residence-application/1.0.0/schema.json
ok   registry/nl/ind/family-member-admission-and-residence-application/1.0.0/schema.json [v0.3]
```

The full registry (566/566 schema documents, 3/3 `mapping.json` companions)
continues to validate after this addition.

## What is NOT modelled (out of scope), and why

- **The page-1 "to be filled in by the Dutch embassy or consulate" box** —
  completed by embassy staff, not the applicant (see above).
- **The named appendices this form's own means-of-evidence section
  references** (e.g. "Declaration by sponsor (family and relatives)",
  "Antecedents certificate", "Declaration of relationship", "Questionnaire
  for residence with partner", "Certificate of non-impediment", "Civic
  integration examination abroad") — modelled here only as `documents[]`
  entries (attestations/evidence the applicant must obtain and submit), not
  as their own schema documents with their own field sets. Each is a
  candidate for a future companion schema.
- **The "Notification form for family members and relatives"** referenced in
  Section 13's attestation (used post-admission to report a change in
  circumstances) — a distinct downstream process, out of scope.
- **The Basisregistratie Personen (BRP) municipal-registration step**
  (Section 12) that follows a granted application — already the subject of
  `nl/rvig/passport-application`'s and `nl/rvig/national-identity-card-application`'s
  own BRP-adjacent modelling; not re-modelled here.
- **Two age-based document-requirement nuances** (antecedents certificate
  needs the applicant to be 12+; certificate of non-impediment needs 15+) —
  disclosed in-line in the affected `sourceRef` text but not encoded as
  `requiredWhen` gates, since expressing "age at a given date" is outside the
  current `requiredWhen` grammar. See the Section 7 mapping note above.
- **Exact fee amounts** — vary by situation and change over time; not
  encoded as a single authoritative figure, consistent with
  `nl/rvig/passport-application` and `de/bmi/passport-application`.

## Scope and jurisdiction notes

- This is the Netherlands' first Visa-vertical document, and closes the
  jurisdiction to 6 of 6 verticals (`nl/rvig/*`, `nl/rdw/*`, `nl/kvk/*`,
  `nl/belastingdienst/*`, `nl/denhaag/*` already cover Passport/National
  ID/DMV/Business Formation/Taxes/voter-registration; this document opens a
  new `nl/ind/*` authority segment for Visa).
- `id` uses the `ind` authority segment (the IND's own English abbreviation),
  consistent with this registry's convention of using an authority's own
  short-form abbreviation as the segment (e.g. `nl/rvig`, `nl/rdw`, `nl/kvk`).
- Conditional requiredness/visibility uses `requiredWhen`/`visibleWhen`
  (GSP-0013), targeting spec v0.3, the same as every other Visa-vertical
  document in this registry.
- `registry-index.json` was regenerated via `npm run build-index` in
  `tools/govschema-client/` after adding this document.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6
months). Because `status` remains `draft` and only a single source copy
(ind.nl's own canonical hosting) was cross-checked this cycle, a future
review should locate and byte-for-byte cross-check an independently hosted
mirror (e.g. a specific Dutch mission's own site, following the pattern
`de/auswaertiges-amt/national-visa-application` used against a mission
mirror), and should reconsider the age-based document-gating nuance above if
a future spec revision adds an age/date-arithmetic `Condition` operator.
