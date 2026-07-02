# Verification record — `de/bmi/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields, documents, and
flow, and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from and cross-checked against the official/showcase
sources below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has not yet been completed
against the live, authenticated in-person appointment system a Bürgeramt
clerk actually uses (no such system is reachable pre-appointment). It
therefore remains `draft`, not `verified`.

## Why this candidate, why now

This is the last open catalog candidate in the **Passport** vertical — every
other tracked jurisdiction (US, GB, IE, CA, NZ, AU, SG) already has a
published passport schema. Germany's own two published schemas
(`de/bmi/residence-registration`, `de/bmi/residence-deregistration`) are the
only DE schemas in the registry to date; this document is DE's first in the
Passport vertical and its third overall.

## Sources examined

- **Document `(id, version)`:** `de/bmi/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Primary source URL:** <https://service.berlin.de/dienstleistung/121151/>
  — Berlin's official "Reisepass beantragen" service page. Fetched directly
  and read in full (not a small-model summary standing in for the primary
  text) via the WebFetch tool, which returns a converted-to-markdown reading
  of the live page; the retrieval succeeded (no block encountered, unlike the
  WAF/HTTP blocks recorded for `canada.ca` and `nzta.govt.nz` in
  `ca/cra/individual-income-tax-and-benefit-return-t1` and
  `nz/nzta/drivers-licence-renewal`). Covers eligibility requirements
  (citizenship, personal appearance, Berlin residency and the
  primary/secondary fee distinction, minors), the required-documents list,
  the complete fee schedule (age tiers, secondary-residence surcharge,
  express, 48-page, in-office photo, postal delivery), processing times, the
  in-person-only submission channel, the provisional-passport alternative,
  and the legal basis (PassG §6 Abs. 1, PassV, PassVwV).
- **Secondary source (national cross-check):**
  <https://www.amtlich-einfach.de/DE/Fuer_Privatpersonen/Ausweise_und_Fahrzeuge/Reisepass/reisepass_node.html>
  — a federal citizen-service digitalisation ("Amtlich einfach") showcase
  page, not Berlin-specific. Independently corroborates: the 6-8 week
  standard processing time (Berlin: "up to 8 weeks"); the 3-4 business day
  express time (Berlin: "maximum 4 business days"); the May 2025 rule that
  citizen offices no longer accept printed biometric photos, only digital
  submission via an office service station or a certified studio with an
  access code (matches Berlin's digital-photo requirement and the two
  `photoCreationChannel` options modelled here); that first-time applicants
  need a birth certificate and that the office also needs "a parent with ID
  to confirm identity" for a minor (used to source the
  `guardianIdentityDocument` entry, which Berlin's own page does not spell
  out as a separate item from general minors eligibility); and that parental
  consent "can be provided in writing" (used to source
  `guardianConsentDocument`).
- **Source found unreachable:** the catalog candidate's original
  `candidateSource`, <https://www.bundesregierung.de/breg-de/leichte-sprache/reisepass-und-personalausweis>,
  returned HTTP 404 as of 2026-07-02. It was not used; the Berlin service
  page and the amtlich-einfach.de page above were used instead. A future
  review should check whether the bundesregierung.de "Leichte Sprache" page
  has moved to a new URL rather than being retired outright.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## What was confirmed directly against the primary source

From `service.berlin.de/dienstleistung/121151/` (fetched and read in full):

| Source element | Field(s) / schema element |
|---|---|
| "German citizenship required" | `isGermanCitizen` (`fieldRole: eligibility`, exit transition) |
| "Berlin residency required (primary residence); secondary residence acceptable with valid reason (higher fee applies)" | `residenceBasis` |
| "Current biometric passport photo (digital format, as of May 1, 2025)" | `photoCreationChannel` |
| "Previous documents (if available)" / "your previous document (Reisepass) will be invalidated at the time of application" | `identityDocumentForVerification` |
| "Birth certificate or marriage certificate (if never held such documents or personal data differs from registration)" | `neverHeldGermanIdOrPassport`, `personalDataDiffersFromRegistration`, `birthOrMarriageCertificate` |
| "Naturalization certificate and previous passport/identity document (for recently naturalized citizens)" | `recentlyNaturalised`, `naturalisationCertificate`, `previousForeignIdDocument` |
| "For minors: legal guardians must apply; both child and guardian(s) must attend" | `applicantIsMinor` |
| "Standard passports contain 32 pages; an extended version with 48 pages is available for frequent travelers" | `passportPageCount` |
| "Standard: up to 8 weeks" / "Express: maximum 4 business days (application submitted before 11:00 AM)" | `processingSpeed` |
| Fee table (age tiers, secondary-residence surcharge, express +€32, 48-page +€22, in-office photo +€6, postal delivery +€15) | not modelled as data (see "Fees, deliberately unencoded" below); drives which enum options exist on `residenceBasis`, `passportPageCount`, `processingSpeed`, `photoCreationChannel`, `deliveryMethod` |
| "In-person only at citizen offices (Bürgerämter)" | `process.type`, description |
| Provisional passport (1-year validity, no biometric chip) available if standard/express can't meet a deadline | out of scope (description); a related but distinct service, same discipline as excluding `de/bmi/residence-deregistration`'s sibling scope from `de/bmi/residence-registration` |
| Legal basis: PassG §6 Abs. 1, PassV, PassVwV | cited in `authority`/description |

## What was cross-checked against the secondary source

The May 2025 digital-photo rule, the standard/express processing-time
figures, the first-time-applicant birth-certificate requirement, and the
guardian's-ID-and-consent minors requirement were all independently
corroborated by `amtlich-einfach.de`, a federal (non-Berlin-specific) page —
giving reasonable confidence this models the nationally-set Passgesetz data
model rather than a Berlin-only variant, the same convention already
established for `de/bmi/residence-registration`'s Berlin/Munich exemplar
cross-check.

## What is NOT yet independently verified

- **The live in-person appointment system's actual screen/data-entry
  sequence.** Like `ca/on/mto/drivers-licence-renewal` and
  `sg/acra/sole-proprietorship-registration`, the authoritative "form" here
  is not a downloadable document but a clerk's internal system, not
  independently reachable. This document's fields and step ordering are
  reconstructed from the citizen-facing guidance prose, not a direct read of
  that system.
- **Whether every Land's citizen office uses an identical fee/service-option
  structure.** Berlin's dienstleistung 121151 is treated as a representative
  exemplar of a nationally-set legal framework (PassG/PassV), not proof every
  Land is byte-identical — the same caveat already recorded for
  `de/bmi/residence-registration`.
- **Exact wording of the guardian consent requirement.** amtlich-einfach.de
  states consent "can be provided in writing" but does not quote a verbatim
  consent statement, so `guardianConsentDocument` is modelled as a
  `supporting-evidence` document (a document to be provided), not as an
  `attestation` (which per SPEC §9 requires an exact, source-verbatim
  `statement` string this research did not find).
- **Fees, deliberately unencoded.** As with every other schema in this
  registry, specific EUR amounts (recorded above only for traceability) are
  not asserted as schema data; they change over time and the live source is
  authoritative.

## Scope notes

- **Renewal and first-time application share one document.** The source
  frames "your previous document will be invalidated" as the common case but
  explicitly supports first-time applicants via `neverHeldGermanIdOrPassport`
  — this mirrors the catalog candidate's own title ("Passport
  Application/Renewal").
- **Out of scope:** the provisional passport (vorläufiger Reisepass), the
  service for German citizens not registered in Berlin/tourists/Germans
  resident abroad (dienstleistung 306704), the Kinderreisepass, and the
  Personalausweis (a separate DE catalog candidate). Each is a related but
  distinct service.
- **Single applicant only**, consistent with every other schema in this
  registry; a minor's guardian is modelled only via the `responsible-party`
  documents, not as a full co-applicant field set.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live Bürgeramt appointment
process itself, not just the surrounding guidance prose — the same gap
flagged for `ca/on/mto/drivers-licence-renewal` and
`sg/acra/sole-proprietorship-registration`. Re-attempt the bundesregierung.de
"Leichte Sprache" source at its current URL, if found, as an additional
independent federal-level cross-check.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check both sources on or before that date and on any `source.url`
change.
