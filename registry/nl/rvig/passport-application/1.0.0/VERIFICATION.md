# Verification record — `nl/rvig/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this candidate, why now

The Netherlands is at 3/6 focus verticals (DMV, Business Formation, Taxes),
with Visa, Passport, and National ID & Civic Documents open. A prior cycle
(`nl/rdw/drivers-licence-renewal`, GOV-843) already investigated and ruled
out the Passport vertical for that heartbeat because "NL's passport/ID-card
process is entirely in-person at a gemeente counter with no citizen-facing
downloadable form." This document revisits that conclusion the same way
`de/bmi/passport-application` (also in-person-only, also administered by a
local office under a national law) was still authored: not from a
downloadable application form, but from the municipality's own published
process description, cross-checked nationally, plus one genuine
citizen-facing PDF that does exist for the minor-consent branch.

## Sources examined

- **Document `(id, version)`:** `nl/rvig/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Rijksdienst voor Identiteitsgegevens (RvIG), on behalf of
  the Ministry of the Interior and Kingdom Relations (BZK), under the
  Paspoortwet 1991 and the Paspoortuitvoeringsregeling Nederland (PUN).
  Applications are received and processed at gemeente (municipality)
  passport desks, not at RvIG directly — the same authority-modelling
  convention `de/bmi/passport-application` uses for Germany's
  Bürgeramt-administered Reisepass.
- **Primary source (fetched directly, HTTP 200):**
  <https://loket.digitaal.utrecht.nl/nl/producten/paspoort-of-identiteitskaart-aanvragen>
  — the municipality of Utrecht's official digital loket ("counter") page.
  Covers: required documents (existing travel documents, a passport photo no
  older than 6 months), the full 2026 fee table by document type/age
  tier/speed, standard (6 working day) and expedited (next/second business
  day) processing timelines, the 3-month document-destruction rule,
  fingerprint capture from age 12, minor consent requirements (parental
  consent needed under 18), and the DigiD-based digital consent flow (valid
  3 months) with a printable-PDF fallback for parents without DigiD.
- **Secondary source (national cross-check, fetched directly, HTTP 200):**
  <https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/waar-en-hoe-kan-ik-een-paspoort-of-identiteitskaart-aanvragen>
  — Rijksoverheid.nl's national Q&A page. Independently corroborates:
  applying at the gemeente where the applicant is registered (BRP);
  mandatory in-person attendance for every applicant including children
  ("altijd persoonlijk aanvragen"); the required-documents list; the
  ~5-working-day standard processing estimate; that only Dutch nationals may
  apply for this document (others use an alien or refugee passport); and
  that the process and legal basis are set nationally, not by each
  municipality individually — the basis for treating Utrecht's published
  process as representative nationwide, the same inference
  `de/bmi/passport-application` drew from Berlin's page for federal German
  law.
- **Minor-consent form (fetched directly, HTTP 200, text-extracted):**
  <https://www.nederlandwereldwijd.nl/binaries/content/assets/pdfs-nederlands/toestemmingsverklaring-ouder-gezaghebber-minderjarige-aanvrager-nl.pdf>
  — "Toestemming ouder/gezaghebber voor minderjarige aanvrager(s)" /
  "Parental/Legal guardian consent for minor applicant(s)", a bilingual
  (Dutch/English) national form published in the Staatscourant (Stcrt. 2008,
  nr. 115, Ministerie van Algemene Zaken) — i.e. a legally standardized
  national annex, not a municipality-specific document. Downloaded and
  text-extracted by decompressing the PDF's Flate-encoded content streams
  and regex-matching `Tj`/`TJ` string operands (the same no-dependency
  technique used when `pdfjs-dist` is unavailable; see
  `gov-form-pdf-extraction` in this registry's sourcing notes), which
  recovered every bilingual field label verbatim: the parent/guardian's own
  relationship checkbox ("Vader / Moeder / Gezaghouder"), their own document
  number/issue data, the child's name/date-of-birth/place-of-birth block(s),
  the application-type checkbox (passport / identity card / nationality
  certificate), the "copy of my valid passport's biodata page" signature-
  verification clause, and the three-month validity-from-signature clause.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Rijksoverheid.nl — "Alleen Nederlanders kunnen een paspoort aanvragen" | `isDutchNational` |
| Rijksoverheid.nl — "U vraagt een paspoort aan bij de gemeente waar u staat ingeschreven" | `registeredInApplyingMunicipality` |
| Utrecht loket page — required documents confirm registered personal data | `lastName`, `firstNames`, `dateOfBirth` |
| Toestemmingsverklaring — "Geboorteplaats / Place of birth" | `placeOfBirth` |
| Utrecht loket page — "Under 18 years (passport): Written parental consent required" | `applicantIsMinor` |
| Utrecht loket page — DigiD remote consent vs. printable PDF fallback | `allAuthorizedGuardiansAttendingInPerson`, `absentGuardianConsentMethod`, `documents[].guardianConsentDocument` |
| Toestemmingsverklaring — "Vader / Moeder / Gezaghouder" | `consentingGuardianRelationship` |
| Toestemmingsverklaring — "geldigheid van drie maanden vanaf datum ondertekening"; Utrecht loket page — digital consent "3 maanden geldig" | `documents[].guardianConsentDocument.freshness` (P3M) |
| Toestemmingsverklaring — "Ter controle van mijn handtekening voeg ik een kopie bij van de houderpagina van mijn geldige paspoort" | `documents[].guardianIdentityDocumentCopy`, gated on `absentGuardianConsentMethod == signed_paper_form` |
| Utrecht loket page — fee table and processing-time tiers | `processingSpeed` |
| Utrecht loket page — "Delivery service costs €19.00" | `deliveryMethod` |
| Utrecht loket page — "All existing travel documents, including expired ones" | `documents[].existingTravelDocuments` |
| Utrecht loket page — photo "maximaal 6 maanden oud" | `documents[].passportPhoto` |
| Utrecht loket page — fee table, debit card/cash payment at appointment | `documents[].applicationFeePayment` |

## What is NOT independently confirmed / out of scope

- **A live, authenticated gemeente appointment or DigiD pre-fill session.**
  No test DigiD credential was available; this document is transcribed from
  Utrecht's published process description and the national consent form's
  own text, not a completed live walkthrough. This is the same discipline
  `de/bmi/passport-application` and `nl/rdw/drivers-licence-renewal` applied
  to their own gated/in-person-only channels.
- **Whether Utrecht's fee table and timelines are byte-identical in every
  gemeente.** Fees and processing times are nationally regulated in
  principle, but this document does not cross-check a second municipality's
  published fee table line-by-line; only the *structure* of the process
  (documents, consent path, fee tiers, delivery option) is asserted as
  nationwide, consistent with the `de/bmi/passport-application` Berlin/
  amtlich-einfach.de cross-check pattern. No fee amount is encoded as an
  `amount` object on `applicationFeePayment` for this reason — only
  referenced in prose, per the same convention `de/bmi/passport-application`
  used.
- **The exact DigiD reliability-level requirement** (SMS vs. app) for the
  applicant's own appointment booking/pre-fill is mentioned by a third-party
  explainer site (gebruiksaanwijzing.net), not Utrecht's or Rijksoverheid's
  own page directly, and is therefore not modelled as a field.
- **The Nederlandse identiteitskaart (national identity card).** Utrecht's
  page (and many gemeente pages) present passport and ID-card applications
  as the same appointment/counter flow with shared consent and fingerprint
  rules. This document is scoped to the passport only, matching this
  registry's vertical separation (Passport vs. National ID & Civic
  Documents) and `de/bmi`'s split between `passport-application` and
  `national-identity-card-application`. A future
  `nl/rvig/national-identity-card-application` schema would reuse the same
  eligibility/minor-consent shape.
- **Vreemdelingenpaspoort, vluchtelingenpaspoort, and nooddocument
  (emergency travel document)** are distinct products/processes and out of
  scope.
- **Whether the Utrecht-sourced consent mechanics (DigiD online consent,
  printable-PDF fallback, the "1 guardian attends in person" case) are
  confirmed for the full under-18 population, or only for under-12s.** The
  Utrecht loket page states the general passport rule as "Kinderen jonger dan
  18 jaar hebben toestemming nodig" (consent needed under 18), but the
  detailed walkthrough of *how* to give that consent is published under a
  subheading scoped explicitly to "Aanvragen (kind jonger dan 12 jaar)"
  (Applying — child younger than 12); the page has no equivalent subsection
  for 13-17-year-olds, and rijksoverheid.nl's national cross-check page does
  not mention consent mechanics at all. It is very likely the same national
  DigiD/toestemmingsverklaring service (Stcrt. 2008, nr. 115 is itself
  worded for "minderjarige aanvrager(s)" generally, with no age split) covers
  every minor under 18, not just under-12s — Utrecht's page most plausibly
  frames its walkthrough around the lower ID-card threshold because the page
  covers both passport and ID-card products together — but this document
  does not have a source that states the 13-17 case explicitly, so
  `allAuthorizedGuardiansAttendingInPerson`/`absentGuardianConsentMethod`
  should be treated as inferred-by-extension for applicants aged 12-17
  until a `verified` pass confirms it directly.

## Scope and jurisdiction notes

- This is NL's **fourth** registry entry, and its **first** in the Passport
  vertical: `nl/kvk/sole-proprietorship-registration-eenmanszaak` (Business
  Formation), `nl/belastingdienst/individual-income-tax-return-m-form`
  (Taxes), and `nl/rdw/drivers-licence-renewal` (DMV) preceded it. NL is now
  4/6 verticals; Visa and National ID & Civic Documents remain open.
- Conditional flow uses `requiredWhen` (GSP-0013) for the minor-consent
  branch (a chained `all` condition gating `absentGuardianConsentMethod`,
  `consentingGuardianRelationship`, and the two guardian documents), and
  `steps[].transitions` with `exitReason` (GSP-0013 §4) for the two
  eligibility gates (non-Dutch national; not registered in the applying
  municipality) that genuinely exit this flow to an unmodelled process —
  the same distinction drawn in `nl/rdw/drivers-licence-renewal`'s
  VERIFICATION.md between non-disqualifying conditional fields and genuine
  eligibility-gate transitions.
- `dateOfBirth`/`placeOfBirth` are marked `classification: pii`/
  `sensitive-pii` per GSP-0006's advisory vocabulary, consistent with
  `de/bmi/passport-application`.
- Mock-data condition-evaluator testing (four profiles: adult renewal; minor
  with both guardians attending; minor with one guardian consenting remotely
  via DigiD; a negative control omitting a required field) confirmed every
  `requiredWhen` branch resolves as intended, including the negative control
  correctly flagging the missing field. See the authoring session notes; no
  script is checked into the registry (structural-reference schemas in this
  registry do not carry conformance fixtures — GSP-0016 fixtures are used
  once a schema reaches `verified`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Dutch DigiD
account (and, for the minor-consent branch, an eligible minor applicant and
a co-holder of parental authority) completes an actual gemeente passport
appointment, or obtains independent confirmation from someone who has,
confirming: the exact data the appointment/pre-fill screens collect from the
applicant directly versus pre-populate from the BRP, whether every gemeente
truly applies the same fee/consent structure as Utrecht's, and the current
fee figures. Recording the outcome here and shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
