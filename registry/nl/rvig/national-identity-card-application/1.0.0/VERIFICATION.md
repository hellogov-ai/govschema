# Verification record — `nl/rvig/national-identity-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this candidate, why now

The Netherlands was at 4/6 focus verticals (DMV, Business Formation, Taxes,
Passport) going into this cycle, with Visa and National ID & Civic Documents
open. `nl/rvig/passport-application`'s own VERIFICATION.md explicitly flagged
this as the natural next candidate: "A future `nl/rvig/national-identity-card-
application` schema would reuse the same eligibility/minor-consent shape,"
following the same split `de/bmi` uses between `passport-application` and
`national-identity-card-application` — two distinct legal documents issued by
the same authority through the same in-person channel.

This cycle also investigated NL's Visa gap first (the Netherlands' Schengen
short-stay visa uses the EU-harmonised Annex I form already modelled for
France as `fr/france-visas/schengen-visa-application`, so an NL-specific
schema would largely duplicate it with no new teaching value; the
NL-specific alternative — the IND's national long-stay entry visa (MVV) — is
split across 200+ purpose-specific application forms with no single
representative instance, unlike Germany's one general-purpose national visa
form). Both are documented as open findings below rather than authored this
cycle; the identity card was the stronger, source-grounded candidate
available this heartbeat.

## Sources examined

- **Document `(id, version)`:** `nl/rvig/national-identity-card-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Rijksdienst voor Identiteitsgegevens (RvIG), on behalf of
  the Ministry of the Interior and Kingdom Relations (BZK), under the
  Paspoortwet 1991 and the Paspoortuitvoeringsregeling Nederland (PUN) — the
  same authority and legal basis as `nl/rvig/passport-application`.
  Applications are received and processed at gemeente (municipality)
  passport/ID desks, not at RvIG directly.
- **Primary source (fetched directly, HTTP 200):**
  <https://loket.digitaal.utrecht.nl/nl/producten/paspoort-of-identiteitskaart-aanvragen>
  — the municipality of Utrecht's official digital loket page, the same page
  `nl/rvig/passport-application` used, since Utrecht presents passport and
  ID-card applications as one combined service. Confirmed: required
  documents (existing travel documents, a passport photo no older than 6
  months), the identity card's own 2026 fee table by age tier/speed
  (distinct from the passport's table), standard (6 working day) and
  expedited (next/second business day) processing timelines, the 3-month
  document-destruction rule, fingerprint capture from age 12, and a
  guardian-consent walkthrough presented under an "Aanvragen (kind jonger
  dan 12 jaar)" (Applying — child younger than 12) subheading.
- **Secondary sources (national cross-check, fetched directly, HTTP 200):**
  - <https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/waar-en-hoe-kan-ik-een-paspoort-of-identiteitskaart-aanvragen>
    — confirms eligibility (Dutch nationality only), registration-municipality
    requirement, and mandatory in-person attendance apply identically to
    both documents.
  - <https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/duur-geldigheid-paspoort-of-nederlandse-identiteitskaart>
    — "Voor personen vanaf 18 jaar is het paspoort of de Nederlandse
    identiteitskaart (ID-kaart) 10 jaar geldig. Voor personen jonger dan 18
    jaar blijft een paspoort of identiteitskaart 5 jaar geldig" — validity is
    identical for both documents (10y at 18+, 5y under 18).
  - <https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart/vraag-en-antwoord/heeft-mijn-kind-een-eigen-paspoort-of-identiteitskaart-nodig>
    — states the consent rule directly as a comparison table: identity card
    requires parental/guardian consent only under age 12; passport requires
    it for the full under-18 population. This **resolves** the ambiguity
    `nl/rvig/passport-application`'s VERIFICATION.md had explicitly flagged
    as unconfirmed — that Utrecht's shared page frames its guardian-consent
    walkthrough under the under-12 threshold because that is the genuine
    ID-card rule, not because the passport's own under-18 rule was
    under-described. This document's `applicantIsUnder12` field is grounded
    directly in this source, independent of the passport schema's
    inference-by-extension caveat.
  - A supplementary web search corroborated the same under-12/12-17 split
    across three independent municipality pages (Amsterdam, and others found
    via search) using consistent language ("Kinderen jonger dan 12 jaar
    hebben toestemming nodig... vanaf 12 jaar is geen toestemming nodig"),
    reducing the risk that this is a single source's error.
- **Under-12 guardian-consent form (previously fetched directly, HTTP 200,
  text-extracted for `nl/rvig/passport-application`; re-used here):**
  <https://www.nederlandwereldwijd.nl/binaries/content/assets/pdfs-nederlands/toestemmingsverklaring-ouder-gezaghebber-minderjarige-aanvrager-nl.pdf>
  — "Toestemming ouder/gezaghebber voor minderjarige aanvrager(s)" /
  "Parental/Legal guardian consent for minor applicant(s)", a bilingual
  (Dutch/English) national form published in the Staatscourant (Stcrt. 2008,
  nr. 115, Ministerie van Algemene Zaken). Its application-type checkbox
  includes "identiteitskaart" alongside "paspoort," confirming it is the
  shared national consent instrument for both documents, not
  passport-specific.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Rijksoverheid.nl — nationality/registration eligibility, stated for both documents | `isDutchNational`, `registeredInApplyingMunicipality` |
| Utrecht loket page — required documents confirm registered personal data | `lastName`, `firstNames`, `dateOfBirth` |
| Toestemmingsverklaring — "Geboorteplaats / Place of birth" | `placeOfBirth` |
| Rijksoverheid.nl validity Q&A — 5y under 18 / 10y at 18+ | `applicantIsMinor` |
| Rijksoverheid.nl "Heeft mijn kind een eigen paspoort of identiteitskaart nodig?" — consent required under 12 only | `applicantIsUnder12` |
| Utrecht loket page — DigiD remote consent vs. printable PDF fallback, under the under-12 walkthrough | `allAuthorizedGuardiansAttendingInPerson`, `absentGuardianConsentMethod`, `documents[].guardianConsentDocument` |
| Toestemmingsverklaring — "Vader / Moeder / Gezaghouder" | `consentingGuardianRelationship` |
| Toestemmingsverklaring — "geldigheid van drie maanden vanaf datum ondertekening" | `documents[].guardianConsentDocument.freshness` (P3M) |
| Toestemmingsverklaring — signature-verification clause | `documents[].guardianIdentityDocumentCopy`, gated on `absentGuardianConsentMethod == signed_paper_form` |
| Utrecht loket page — identity-card-specific fee table and processing-time tiers | `processingSpeed` |
| Utrecht loket page — "Delivery service costs €19.00" | `deliveryMethod` |
| Utrecht loket page — required travel documents / photo freshness | `documents[].existingTravelDocuments`, `documents[].passportPhoto` |
| Utrecht loket page — fee table, debit card/cash payment at appointment | `documents[].applicationFeePayment` |

## What is NOT independently confirmed / out of scope

- **A live, authenticated gemeente appointment or DigiD pre-fill session.**
  No test DigiD credential was available; this document is transcribed from
  published process descriptions, not a completed live walkthrough — the
  same discipline `nl/rvig/passport-application` applied.
- **Whether Utrecht's fee table and timelines are byte-identical in every
  gemeente.** Fees and processing times are nationally regulated in
  principle, but only the *structure* of the process is asserted as
  nationwide; no fee amount is encoded as an `amount` object on
  `applicationFeePayment`, consistent with every other schema in this
  registry.
- **The 12-17 age band's fingerprint/photo requirements beyond what is
  common to the passport.** This document assumes the same fingerprint
  (12+) and photo rules the passport uses, since Utrecht's page presents
  both documents as one combined biometric-capture process; no source was
  found that states an identity-card-specific deviation.
- **The exact set of European countries that accept the Nederlandse
  identiteitskaart as a travel document outside the Schengen area.**
  Rijksoverheid.nl confirms the card works throughout Schengen and notes
  some additional European countries accept it by informal practice rather
  than formal agreement, but does not publish an exhaustive list; this is
  described in prose only and not modelled as a field.
- **The Nederlands paspoort (passport).** Out of scope — see
  `nl/rvig/passport-application`.
- **NL Visa vertical — investigated this cycle, not authored.** Two
  candidates were considered and both have real obstacles:
  1. **Short-stay Schengen visa** (Ministerie van Buitenlandse Zaken /
     Dutch missions abroad, submitted via VFS Global and similar external
     service providers). The application form used is the EU-harmonised
     Annex I form to Regulation (EC) No 810/2009 (cerfa n° 14076*02) — the
     *same* form already modelled as `fr/france-visas/schengen-visa-
     application` (GOV-770), since the harmonised form is identical across
     all Schengen states regardless of which consulate receives it. An
     NL-specific schema would duplicate that content with no new teaching
     value, so it was not authored. `nl/rdw/drivers-licence-renewal`'s
     VERIFICATION.md (GOV-843) previously described this channel as having
     "no downloadable PDF equivalent" — that description was about the
     account-gated appointment-booking portal, not the form itself; the
     harmonised form is genuinely downloadable (confirmed via a VFS Global
     Netherlands mirror), so this finding supersedes that one.
  2. **National long-stay entry visa (machtiging tot voorlopig verblijf,
     MVV)**, issued by the IND for stays over 90 days. This is NL-specific
     and would not duplicate the FR schema, but the IND publishes forms per
     residence purpose (family reunification, work, self-employment,
     study, and others) rather than one general-purpose form — its own
     forms page lists 241 results. Germany's equivalent schema
     (`de/auswaertiges-amt/national-visa-application`) was authorable
     because the German national visa uses one general form with a
     purpose-selection field; no NL equivalent single form was found this
     cycle. A future cycle should pick one representative purpose (family
     reunification is the largest category) and scope a schema explicitly
     to it, the same way `nl/belastingdienst/individual-income-tax-return-
     m-form` scoped to one filer population rather than modelling the
     Belastingdienst's full return.

## Scope and jurisdiction notes

- This is NL's **fifth** registry entry, and its **second** in the National
  ID & Civic Documents vertical framing (the first NL entry there, since
  Passport and National ID & Civic Documents are tracked as separate
  verticals in this project's charter). NL is now 5/6 verticals; only Visa
  remains open, per the findings above.
- Conditional flow uses `requiredWhen` (GSP-0013) for the under-12 guardian-
  consent branch (a chained `all` condition), and `steps[].transitions`
  with `exitReason` (GSP-0013 §4) for the two eligibility gates (non-Dutch
  national; not registered in the applying municipality), mirroring
  `nl/rvig/passport-application`'s convention.
- `dateOfBirth`/`placeOfBirth` are marked `classification: pii`/
  `sensitive-pii` per GSP-0006's advisory vocabulary, consistent with
  `nl/rvig/passport-application` and `de/bmi/national-identity-card-
  application`.
- Mock-data condition-evaluator testing (four profiles: adult renewal;
  applicant aged 14, i.e. minor but not under 12, requiring no consent
  fields; applicant aged 8 with both guardians attending; applicant aged 8
  with one guardian consenting remotely via DigiD) confirmed every
  `requiredWhen` branch resolves as intended, including that the 14-year-old
  profile correctly leaves `allAuthorizedGuardiansAttendingInPerson` etc.
  unset and not required. No script is checked into the registry
  (structural-reference schemas in this registry do not carry conformance
  fixtures — GSP-0016 fixtures are used once a schema reaches `verified`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Dutch DigiD
account (and, for the guardian-consent branch, an eligible applicant under
12 and a co-holder of parental authority) completes an actual gemeente
identity-card appointment, or obtains independent confirmation from someone
who has, confirming: the exact data the appointment/pre-fill screens collect
directly versus pre-populate from the BRP, whether every gemeente truly
applies the same fee/consent structure as Utrecht's, and the current fee
figures. Recording the outcome here and shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
