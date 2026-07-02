# Verification record — `gb/ukvi/standard-visitor-visa` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields, documents, and
flow, and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from and cross-checked against the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has not been completed against
the live, authenticated online application form itself (not reachable
pre-application). It therefore remains `draft`, not `verified`.

## Why this candidate, why now

Catalog audit at the start of this cycle (88 candidates, 51 published / 37
candidate) confirmed **Visa** is still the most under-served vertical: only
"electronic travel authorization" shapes were published
(`us/cbp/esta-application`, `ca/ircc/eta-application`,
`gb/homeoffice/eta-application`). Three Visa candidates remained untouched:
this document (UK Standard Visitor Visa), Australia's ETA subclass 601
(mobile-app-only application channel, no web form to source from), and the EU
ETIAS (explicitly flagged in `discovery/catalog.json` as not yet operational —
rollout confirmed for Q4 2026 — so authoring should wait for a live
application). This document was chosen because it is sourced from `gov.uk`
(a domain with no access block recorded in this registry, unlike
`canada.ca`/`nzta.govt.nz`) and represents a structurally distinct shape from
every published Visa document: a full visa requiring a Visa Application
Centre biometric appointment, not just an ETA's app/photo-upload flow.

## Sources examined

- **Document `(id, version)`:** `gb/ukvi/standard-visitor-visa` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Primary source 1:** <https://www.gov.uk/standard-visitor> — the official
  "Visit the UK as a Standard Visitor: Overview" page. Fetched directly (HTTP
  200). Covers the fee (GBP 135 / 6 months), the permitted-activities list,
  the general eligibility requirements (valid passport, intent to leave,
  ability to fund the visit, no intention to reside via repeated visits), the
  prohibited-activities list (no work, no public funds, no marriage/civil
  partnership), and the "check if you need a visa" nationality-determination
  tool.
- **Primary source 2:**
  <https://www.gov.uk/standard-visitor/apply-standard-visitor-visa> — the
  "Apply for a Standard Visitor visa" sub-page. Fetched directly. Describes
  the online-application-then-biometric-appointment process, the specific
  data points the online application collects (travel dates, accommodation,
  trip cost, current address and length of residence, parents' names/DOB "if
  known", income, employer/partner/family-in-UK/funder details, travel
  history, and criminal/civil/immigration offence details), the Visa
  Application Centre biometric enrolment step, and the ~3-week decision
  timeline.
- **Primary source 3:**
  <https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk>
  — the official "Visiting the UK: guide to supporting documents" guidance.
  Fetched directly. Supplies the exact document-category wording used for
  every `documents[]` entry: financial evidence (bank/building-society
  statements showing fund origin, employer earnings letter), employment/
  self-employment/education evidence, sponsorship evidence (sponsor identity/
  financial capacity/relationship/status), business invitation letters, and
  previous-passport travel-history evidence.
- **Primary source 4:**
  <https://www.gov.uk/government/publications/visit-guidance/visit-caseworker-guidance-accessible--2>
  — Home Office "Visit: caseworker guidance (accessible)" (last updated 25
  February 2026). Fetched directly. Supplies the Appendix V / paragraph
  V4.2-V4.6 general-requirements wording ("only undertake permitted
  activities and leave at the end of their stay", "not living in the UK or
  making the UK their home through frequent and successive visits") and
  confirms no fixed financial threshold is set — assessment is individual to
  the applicant's circumstances.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## What was confirmed directly against the primary sources

| Source element | Field(s) / schema element |
|---|---|
| "check if you need a visa before you apply" | `requiresStandardVisitorVisa` (`fieldRole: eligibility`, exit transition) |
| "you'll leave the UK at the end of your visit" | `intendsToLeaveUkAfterVisit` |
| "you can support yourself and any dependants ... or get money from someone else"; "pay for your return or onward journey"; caseworker guidance's "sufficient resources to maintain and accommodate" | `canFundVisitAndReturnTravel` |
| Caseworker guidance — "not living in the UK or making the UK their home through frequent and successive visits" | `onlyIntendsPermittedShortVisit` |
| "valid passport or other travel document for the whole of your stay" | `lastName`/`firstNames`/`dateOfBirth`/`nationality`/`passportNumber`/`passportIssueDate`/`passportExpiryDate`/`passportIssuingCountry`, `passportOrTravelDocument` document |
| "the dates you're planning to travel to the UK" | `intendedArrivalDate`, `intendedDepartureDate` |
| "where you'll be staying during your visit" | `accommodationDuringVisit` |
| "how much you think your trip will cost" | `estimatedTripCost` |
| "your current home address and how long you've lived there" | `currentAddressLine1`/`Line2`/`TownOrCity`/`PostalCode`/`Country`, `residentAtCurrentAddressSince` (modelled as a start date, see below) |
| "your parents' names and dates of birth (if known)" | `parent1FullName`/`DateOfBirth`, `parent2FullName`/`DateOfBirth` (all `required: false`, matching the source's own "if known") |
| "how much you earn in a year (if you have an income)" | `annualIncome` (`required: false`) |
| "Employer details, partner information, family in UK, anyone funding your trip" | `employerNameAndAddress`/`occupationOrJobTitle`, `partnerFullName`, `hasFamilyMembersInUk`/`familyInUkDetails`, `fundingSource`/`thirdPartyFunderNameAndRelationship` |
| "your travel history for the past 10 years, depending on your circumstances" | `countriesVisitedInLast10Years` |
| "Details of criminal, civil, or immigration offences" | `hasCriminalConvictions`, `previouslyBreachedUkImmigrationLaw`, `criminalCivilOrImmigrationOffenceDetails` |
| "you've previously been refused entry to the UK" | `previouslyRefusedUkVisaOrEntry` |
| "bank statements which detail the origin of the funds held"; "building society books..."; "proof of earnings, such as a letter from your employer" | `financialEvidence` document |
| "letter from your employer on company headed paper, detailing your role, salary and length of employment"; "letter from your education provider ... confirming your enrolment and leave of absence"; "business registration documents or recent invoices that confirm on-going self-employment" | `employmentOrEducationEvidence` document |
| Sponsorship evidence showing sponsor identity/financial capacity/relationship/status | `sponsorEvidenceDocuments` document |
| "letter of invitation from the organiser" (business) | `businessInvitationLetter` document, gated on `purposeOfVisit == business_activities` |
| "copies of previous passports showing evidence of travel to other countries" | `travelHistoryEvidence` document |
| Fee GBP 135 / up to 6 months; biometric appointment at a Visa Application Centre; ~3-week decision | `description` (not modelled as schema data — fees change over time, consistent with every other schema in this registry) |

## Deliberate modelling choices worth flagging

- **`residentAtCurrentAddressSince` is a date, not a free-text duration.**
  The source asks "how long you've lived there," which a human reads as a
  duration; this document models the underlying fact (a start date) instead,
  for machine precision and so a consumer never has to parse an
  ambiguous "2 years" string. A future revision could add a duration field
  alongside it if a live-form read shows the application literally asks for
  duration rather than a date.
- **`email` is asserted without a direct source quote.** None of the four
  sources reviewed spelled out an "email address" field explicitly (unlike,
  e.g., `gb/homeoffice/eta-application`'s sourced `email` field). It is
  included because every online gov.uk/UKVI application in this registry
  requires an account email for correspondence and decision notification;
  this is a reasonable-inference field, not a verbatim-sourced one — flagged
  here rather than presented as equally well-sourced as the rest.
- **No specific conviction/sentence-length threshold is asserted**, unlike
  the sibling `gb/homeoffice/eta-application` document, which sources exact
  thresholds (e.g. a 12-month custodial-sentence bar) from ETA-specific
  caseworker guidance. The Visit: caseworker guidance page fetched for this
  document referenced "Part Suitability guidance" for the general grounds for
  refusal without restating exact thresholds inline, and that separate
  document was not independently fetched and read for this authoring pass.
  `hasCriminalConvictions` is therefore modelled as a plain declaration field
  (not a hard `fieldRole: eligibility` gate with a specific threshold),
  correctly reflecting that a Standard Visitor visa refusal on suitability
  grounds is a caseworker's discretionary decision, not the ETA's largely
  automated pass/fail.
- **No attestation `documents[]` entry.** Unlike a form with a printed
  declaration a reviewer can transcribe verbatim, no exact sign-off statement
  text for this online application was found in any source reviewed. Per the
  same discipline as `de/bmi/passport-application`'s `guardianConsentDocument`
  (modelled as `supporting-evidence`, not `attestation`, for the identical
  reason), no attestation entry is included rather than inventing wording.
- **No `documents[]` payment entry and no fee amount asserted as data**,
  consistent with every other schema in this registry (fees change over
  time; the live source is authoritative).
- **Biometric enrolment (fingerprints and photo) is described but not
  modelled as a field or document.** It happens in person at a Visa
  Application Centre appointment, after the online application this document
  models — out of scope, same as the appointment step in
  `de/bmi/passport-application`.

## Scope notes

- **Single adult applicant applying for themselves only** — no under-18,
  guardian/representative, or multi-applicant path, consistent with every
  other schema in this registry.
- **Out of scope, each a distinct gov.uk sub-route with its own extra
  eligibility requirements and evidence:** study visitor, academic visitor
  (including senior doctor/dentist), permitted paid engagement, medical
  visitor (including the extended-stay variant), the Marriage Visitor visa,
  and the long-term multi-entry (2/5/10-year) Standard Visitor visa. The
  `purposeOfVisit` enum's `other_permitted_activity` value exists only to let
  an in-scope tourism/family/business applicant note an unlisted permitted
  reason — it does not open any of the excluded sub-routes.
- **Relationship to `gb/homeoffice/eta-application`:** this is the *other*
  branch of the same nationality-based eligibility fork — a visa national who
  answers `requiresStandardVisitorVisa: true` here is, by definition, not the
  audience for the sibling ETA document (whose own `nationality` field
  description notes the same fork from the other side).

## What is NOT yet independently verified

- **The live online application's actual screen sequence and exact field
  labels/ordering.** As with `gb/homeoffice/eta-application` and
  `us/cbp/esta-application`, the authenticated application form itself was
  not reachable pre-application; this document's fields are reconstructed
  from gov.uk guidance prose describing what the form collects, not a direct
  read of its screens.
- **Exact general-grounds-for-refusal wording and thresholds** (Immigration
  Rules Part 9) — the "Part Suitability guidance" referenced by the Visit:
  caseworker guidance page was not independently fetched; see "Deliberate
  modelling choices" above.
- **Whether the online application literally asks for an email address** —
  see above; a reasonable-inference field, not directly sourced.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) field-by-field against the live
online application itself (or an authoritative screen-by-screen walkthrough),
independently fetches the Part Suitability guidance to confirm or replace the
generic `hasCriminalConvictions` declaration with any sourced thresholds, and
confirms whether `email` is genuinely collected as modelled.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check all four sources on or before that date and on any
`source.url` change.
