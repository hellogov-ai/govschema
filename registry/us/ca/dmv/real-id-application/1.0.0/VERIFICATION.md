# Verification record — `us/ca/dmv/real-id-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official dmv.ca.gov REAL ID pages listed
below. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `us/ca/dmv/real-id-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** California Department of Motor Vehicles ("CA DMV").
- **REAL ID landing page:** <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/>
  — fetched live as raw HTML, 2026-07-02 (HTTP 200, no block). Supplied the
  overall online-then-office-visit flow shape ("Complete the application
  online and upload your documents" → "Bring the original documents submitted
  online to your REAL ID appointment" → "Visit a DMV office").
- **"What Is REAL ID?" page:** <https://www.dmv.ca.gov/portal/what-is-real-id/>
  — fetched live as raw HTML, 2026-07-02. Supplied the AB 60 ineligibility
  rule, the Social Security number requirement (with its unspecified
  "exceptions may apply" caveat), the high-level ONE-identity/TWO-residency
  document summary, and links to the checklist and online application.
- **"REAL ID Checklist" interactive tool:** <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/>
  — fetched live as raw HTML, 2026-07-02. This is the richest source: a
  client-rendered, multi-step wizard whose static HTML/text still carried
  every question's exact wording, all 12 identity-document options, the
  name-change sub-flow (up to 5 numbered changes, each with a reason
  drop-down), the 21 residency-document options, the P.O. Box rule, and the
  minor/tracing-document rules (out of scope for this v1.0.0 adult-applicant
  schema).
- **"Driver's License / ID Card Application" (online eDL 44) page:**
  <https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/>
  — fetched live as raw HTML, 2026-07-02. Confirmed the online application is
  a single, login-gated (DMV online account, two-factor authentication) form
  shared across renewal/new-issuance/REAL-ID-conversion, collects "name,
  address, and date of birth" plus SSN, and is completed at a DMV field
  office (signature, testing, photo). The live authenticated screens
  themselves were not reachable pre-login — same constraint as every other
  authenticated-portal schema in this registry (e.g.
  `gb/ukvi/standard-visitor-visa`, `us/cbp/esta-application`) — so fields are
  reconstructed from the checklist tool's prose/questions, not a direct
  screen read.
- **Field extraction method:** raw HTML fetch + tag-stripped plain-text
  extraction (curl, not a summarized WebFetch), so exact bullet-list and
  question wording is directly quotable — the same
  [`gov-source-fidelity-verification`](../../../../../../docs/agent-consumption.md)
  discipline used throughout this registry.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / `documents[]` entry |
|---|---|
| "Individuals applying for or renewing an AB 60 driver's license are not eligible to receive a REAL ID..." | `isAB60LicenseHolder` |
| "basic information such as name, address, and date of birth" | `fullLastName`, `fullFirstName`, `fullMiddleName`, `dateOfBirth` |
| "You will be asked to provide your Social Security number on your REAL ID application (exceptions may apply)" | `socialSecurityNumber` (see honesty flag below) |
| "the same mailing address that is listed on your REAL ID application" | `residenceAddressLine1`, `residenceAddressLine2`, `residenceAddressCity`, `residenceAddressPostalCode` |
| "Proof of Identity ... Check mark the document below that you'll use as your proof of identity." (12 options) | `identityDocumentType`, `documents[].identityDocument` |
| "Does your current full name match what is on your identity document?" | `fullNameMatchesIdentityDocument` |
| "Does your valid passport contain your current full name?" | `passportContainsCurrentFullName` (see honesty flag below) |
| "How many times have you changed your full name? ... Please enter a number from 1 to 5." | `howManyNameChanges` |
| "First Full Name Change: Full name at birth: / I changed my full name to: / Reason for name change:" | `nameAtBirth`, `changedFullNameTo`, `nameChangeReason` |
| "Ensure you bring at least one of the following to document each legal name change." | `documents[].nameChangeDocument` |
| "Use a P.O. Box? One document MUST show both your P.O. Box and physical (residence) address..." | `usesPoBoxForMailingAddress` |
| "Two Proofs of Residency ... Check mark the TWO different documents below..." (21 options) | `residencyDocumentType1`, `residencyDocumentType2`, `documents[].residencyDocument1`, `documents[].residencyDocument2` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **Social Security number exception not modelled.** The "What Is REAL ID?"
  page states an applicant "will be asked to provide your Social Security
  number on your REAL ID application (exceptions may apply)" but never names
  the exception (California DMV literature elsewhere references limited
  cases such as certain non-immigrant visa holders, but that was not
  independently confirmed on any page fetched this cycle). `socialSecurityNumber`
  is modelled as `required: true` with no conditional exception field, rather
  than guessing an unsourced gate — the same discipline as
  `sg/ica/passport-application`'s unmodelled edge cases.
- **`passportContainsCurrentFullName`'s trigger condition is ambiguous.** The
  REAL ID Checklist is a client-rendered wizard; a static HTML/text fetch
  captures every question's wording but not the JavaScript that decides
  exactly when a follow-up question is shown. In the extracted text, "Does
  your valid passport contain your current full name?" appears directly
  after "Does your current full name match what is on your identity
  document?", suggesting it may only be shown when the selected
  `identityDocumentType` is a passport and the name does not match — but that
  could not be confirmed without exercising the live wizard's client-side
  logic. Modelled conservatively as `visibleWhen: fullNameMatchesIdentityDocument
  == false`, not gated on `identityDocumentType`, and flagged here rather than
  guessed silently.
- **Only the first name change is modelled (GSP-0009 exclusion).** The
  checklist tool supports up to 5 separate name changes, each with its own
  "changed to" / "reason" pair (and, for the first only, a "full name at
  birth" field). GovSchema v0.3 has no repeating-field/array construct
  ([GSP-0009](../../../../../../spec/proposals/0009-composite-repeating-values.md)
  is still Proposed, not accepted). `howManyNameChanges` records the count for
  context; `nameAtBirth`/`changedFullNameTo`/`nameChangeReason` model only the
  first change. An applicant with 2–5 name changes is out of scope for
  v1.0.0 — the same exclusion discipline `au/ato/individual-tax-return-mytax`
  used for concurrent employers/health-insurance policies.
- **Two-different-documents rule recorded in prose only.** `residencyDocumentType1`
  and `residencyDocumentType2` share one enum and must hold different values
  per the source ("TWO DIFFERENT printed documents"), but GovSchema v0.3's
  `crossFieldValidation` (§8.3, [GSP-0013]) only supports `equals`/`notEquals`/
  ordering comparisons between two named fields via `compare`, which *would*
  express this — a deliberate simplification for v1.0.0 was made to keep the
  schema close to the NY/CA renewal precedent of prose-recorded cross-field
  rules; a future revision could add a `crossFieldValidation` entry comparing
  the two fields with `operator: notEquals` instead.
- **Name-change tracing documents for minors, and the "name does not appear on
  any residency document" tracing-relationship path, are out of scope.** The
  checklist describes both (a minor tracing a parent's residency document via
  Form SOC 154/154A/156; an adult tracing via a birth certificate/marriage
  license/domestic-partnership certificate when their own name is absent from
  every residency document). Neither is modelled in v1.0.0 — this schema
  assumes the applicant's own name appears on both residency documents,
  narrowing scope the same way `ca/on/mto/drivers-licence-renewal` narrowed
  around its own eligibility gates.
- **The source's "Second Residency FAQs" page was not fetched.** Linked from
  "What Is REAL ID?" as a distinct edge-case explainer
  (`/real-id/what-is-real-id/second-residency-faqs/`); out of scope for
  v1.0.0, which assumes a single California residence.
- **No `documents[]` attestation entry.** No exact sign-off/certification
  statement text for the REAL ID application itself was found on any fetched
  page (the online eDL 44 FAQ says only "You will sign the form once you
  visit a DMV field office and complete the process with a DMV employee," no
  verbatim text) — same discipline as `de/bmi/passport-application`'s
  `guardianConsentDocument` gap.
- **In-office steps out of scope.** This schema models only the fields the
  DMV's own guidance describes as collectible online/ahead of the office
  visit (identity, address, document checklist). The vision/written test,
  photo, signature, biometrics, and fee payment that occur at the DMV field
  office are out of scope for v1.0.0, the same scope line drawn by every
  DMV schema in this registry whose process concludes with an in-person
  office visit.

## Relationship to `us/ca/dmv/drivers-license-renewal`

That schema (already published) models an *existing* licence-holder's
renewal-method branch and carries a single boolean gate,
`upgradingToRealId`, that forces `renewalMethod: in_person` — it does not
expand what a REAL ID application itself collects. This schema is the
sibling that models that expansion for a first-time REAL ID
applicant/converter. A future revision could cross-reference the two more
tightly (e.g. a shared identity-document sub-schema) once GSP-0009's
composite/repeating-value work lands.

## Conformance

See `conformance/us/ca/dmv/real-id-application/1.0.0/` for a mock,
non-submitted application packet exercising the eligible path with one
documented name change.
