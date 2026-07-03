# Verification record — `nl/rdw/drivers-licence-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Sources examined

- **Document `(id, version)`:** `nl/rdw/drivers-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Netherlands Vehicle Authority (Rijksdienst voor het Wegverkeer, RDW).
- **Primary sources (fetched directly, HTTP 200):**
  - <https://www.rdw.nl/het-rijbewijs/aanvragen-of-verlengen/rijbewijs-online-verlengen>
    — the "Rijbewijs online verlengen" service page: eligibility conditions
    (participating municipality, valid Dutch licence, DigiD app with ID-check)
    and the three-step process narrative.
  - RDW brochure "Uw rijbewijs online verlengen" (reference `3 B 2400b`),
    linked from the RDW site — full text of the three numbered steps
    (photographer session and application code; online application, pickup
    location choice, and iDEAL/Wero payment of EUR 53.65; pickup and
    surrender of the current licence). Downloaded and text-extracted with
    `pdfjs-dist` (`getTextContent()` across all 4 pages), the same extraction
    method used for `nl/kvk/sole-proprietorship-registration-eenmanszaak`.
  - <https://www.rdw.nl/het-rijbewijs/aanvragen-of-verlengen> — general
    renewal/application landing page, confirming the online-vs-gemeente
    channel split and linking to the lost/stolen and Gezondheidsverklaring
    pages.
  - <https://www.rdw.nl/het-rijbewijs/aanvragen-of-verlengen/gezondheidsverklaring-aanvragen>
    — who must complete a CBR Gezondheidsverklaring (health declaration)
    before renewing: first applications and new categories, holders turning
    75+ at expiry (or 65+ whose licence expires at/after 75), category C/D
    (lorry/bus) applicants, drivers with a relevant medical condition, and
    certain non-EU/EEA licence exchanges; confirms the "Verklaring van
    Geschiktheid" (fitness-to-drive declaration) that follows a positive
    Gezondheidsverklaring is valid for 1 year and that CBR processing can
    take up to 4 months.
  - <https://www.rijksoverheid.nl/onderwerpen/rijbewijs/vraag-en-antwoord/hoe-kan-ik-als-75-plusser-mijn-rijbewijs-verlengen>
    — official (Rijksoverheid.nl) confirmation of the 75+ renewal sequence
    (Gezondheidsverklaring started 4 months before expiry → CBR medical
    appointment → CBR fitness decision → renew at the municipality).
  - <https://www.rijksoverheid.nl/onderwerpen/rijbewijs/vraag-en-antwoord/welke-rijbewijscategorieen-zijn-er>
    — official list and description of every Dutch driving licence category
    code (AM, A1, A2, A, B, BE (code 96), C1, C1E, C, CE, D1, D1E, D, DE, T),
    used verbatim for `categoryRequested`'s enum.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| RDW brochure, "De voorwaarden" (conditions) | `livesInParticipatingMunicipality`, `currentLicenceEligibleForOnlineRenewal`, `hasDigidAppWithIdCheck` |
| RDW brochure, "U vraagt een verlenging... of een categorie-uitbreiding" | `renewalReason`, `categoryRequested` |
| RDW 'Gezondheidsverklaring aanvragen' — who needs a health declaration | `turning75OrOlderAtExpiry`, `appliesForOrHoldsCategoryCOrD`, `hasMedicalConditionAffectingDriving` |
| RDW 'Gezondheidsverklaring aanvragen' — "Bij de aanvraag van uw eerste rijbewijs en bij iedere nieuwe rijbewijscategorie die u haalt (geldt niet voor bromfietsrijbewijs: categorie AM)" (any new category except AM also triggers the health declaration) | `geschiktheidVerklaringObtained`'s and `documents[].geschiktheidVerklaring`'s `renewalReason == "category_extension" AND categoryRequested != "AM"` `requiredWhen` branch |
| RDW 'Gezondheidsverklaring aanvragen' — Verklaring van Geschiktheid 1-year validity | `geschiktheidVerklaringObtained`, `documents[].geschiktheidVerklaring` |
| RDW brochure, Stap 1 (photographer session and application code) | `applicationCode`, `documents[].digitalPhotoAndSignature` |
| RDW brochure, Stap 2 (pickup location, iDEAL payment) | `pickupLocation`, `documents[].renewalFeePayment` |
| RDW brochure, Stap 3 (surrender current licence at pickup) | `documents[].currentLicenceSurrendered` |
| Rijksoverheid.nl driving-licence category list | `categoryRequested`'s enum (AM, A1, A2, A, B, BE, C1, C1E, C, CE, D1, D1E, D, DE, T) |

## What is NOT independently confirmed / out of scope

- **The mijn RDW online renewal screens themselves.** `rdw.nl/rijbewijsverlengen`'s
  actual application form is gated behind a DigiD-app-with-ID-check login;
  this session could not authenticate to it (no test DigiD credential
  available) and so could not confirm the screens' exact field-by-field
  layout, whether `pickupLocation` is a free-text entry or a picker over a
  fixed list of gemeente locations, or whether any additional fields (e.g.
  contact email/phone) are collected online rather than already known to RDW
  via the applicant's BSN/BRP record. This document is transcribed from the
  RDW service page and brochure's prose description of the flow, the same
  discipline `gb/dvla/driving-licence-renewal-photocard` and
  `gb/dvla/vehicle-tax` applied to their own gated online services.
- **cbr.nl was entirely unreachable in this session.** Every attempt to fetch
  any `cbr.nl` page (both via the fetch tool and a direct `curl`) failed with
  a connection timeout, not a bot-check or login wall — the same class of
  failure as `passports.gov.au`/`dfat.gov.au` documented in this registry's
  `gov-au-wayback-workaround` sourcing note, except no Wayback Machine
  snapshot was available for the specific CBR pages needed here either. As a
  result:
  - The Gezondheidsverklaring's own published list of medical topics/questions
    (third-party driving-school and keuringsarts sites report roughly 14
    topics — vision, hearing, diabetes, cardiovascular conditions,
    neurological conditions, dementia, stroke, loss of consciousness,
    Menière's disease, alcohol/drug use, psychiatric conditions, sleep, and
    medication) is **not itemised in this schema at all**. Reproducing that
    breakdown from secondary summarizer sites rather than CBR's own page
    would not meet this registry's source-fidelity bar, so
    `hasMedicalConditionAffectingDriving` is modelled as a single boolean
    trigger only, consistent with the same-purpose field in
    `nz/nzta/drivers-licence-renewal`.
  - No CBR fee figure for the Gezondheidsverklaring/medical examination
    itself is referenced (only the RDW online renewal fee, which RDW's own
    pages do publish, is modelled as `documents[].renewalFeePayment`).
- **Exact wording/mechanism of the online payment step.** The brochure states
  the applicant pays "meteen... met iDEAL" (immediately, by iDEAL); the RDW
  service page additionally names Wero as an accepted method. No fee
  exemption (e.g. by age) is referenced by either NL source, unlike
  `gb/dvla/driving-licence-renewal-photocard`'s `feeExemptionReason` — this
  document therefore models `renewalFeePayment` as unconditionally required,
  not as a field with a choice of payment method, since no source describes
  a genuine applicant-facing choice beyond "iDEAL or Wero".
- **The in-person gemeente channel** (for applicants who fail the
  `livesInParticipatingMunicipality`, `currentLicenceEligibleForOnlineRenewal`,
  or `hasDigidAppWithIdCheck` eligibility gates, and every first-time
  applicant) is out of scope — modelled only as a `transitions` exit, per
  RDW's own guidance to "Ga dan naar uw gemeente" (go to your municipality
  instead).
- **Lost/stolen licence replacement** is a distinct RDW procedure
  ("Rijbewijs aanvragen na vermissing of diefstal") and is out of scope,
  consistent with this registry's one-schema-per-distinct-process
  convention (e.g. `us/dos/lost-or-stolen-passport-ds64` vs.
  `us/dos/passport-renewal-ds82`).
- **Address/contact/identity fields.** Not modelled as fields at all: RDW
  already holds the applicant's identity and address via the BSN/BRP lookup
  triggered by DigiD login, and no source describes the online screens
  asking the applicant to re-enter them (unlike a first-time paper
  application at a municipality counter).

## Scope and jurisdiction notes

- This is the **second NL registry entry in a new vertical**: the first two
  NL schemas (`nl/kvk/sole-proprietorship-registration-eenmanszaak`,
  `nl/belastingdienst/individual-income-tax-return-m-form`) covered Business
  Formation and Taxes; this is the first NL entry in DMV. NL remains open in
  Visa, Passport, and National ID & Civic Documents.
- The DMV vertical was chosen for this cycle because RDW's online renewal
  service and brochure gave the strongest publicly-reachable sourcing of
  NL's four remaining verticals investigated this cycle: NL's passport/ID-card
  process is entirely in-person at a gemeente counter with no citizen-facing
  downloadable form (RvIG's own forms page lists only internal
  municipality-clerk forms), and NL's Schengen visa application is filled in
  entirely inside an account-gated Ministry of Foreign Affairs portal with no
  downloadable PDF equivalent (nederlandwereldwijd.nl states explicitly: "U
  vult het visumaanvraagformulier online in... [dit] is geen downloadbaar
  PDF-bestand").
- Conditional flow uses `requiredWhen`/`visibleWhen` (GSP-0013) for the
  category-extension and health-declaration branches, and `steps[].transitions`
  with `exitReason` (GSP-0013 §4) for the three eligibility gates that
  genuinely exit this online-renewal flow to a different, unmodelled process
  — the same distinction `nl/kvk/sole-proprietorship-registration-eenmanszaak`
  drew between its own non-disqualifying conditional fields and
  `sg/acra/sole-proprietorship-registration`'s genuine eligibility-gate
  `transitions`.
- `hasMedicalConditionAffectingDriving` is marked `classification: health`
  per GSP-0006's advisory vocabulary.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Dutch DigiD
account and an eligible existing driving licence completes an actual mijn RDW
online renewal (or has independent confirmation from someone who has),
confirming: the exact field set and screen order behind the DigiD login,
whether `pickupLocation` is free text or a fixed picker, and the current fee
and accepted payment methods. Separately, a reviewer who can reach `cbr.nl`
should confirm (or refute) the third-party-reported Gezondheidsverklaring
question list and decide whether to model it as itemised fields — recording
the outcome here and shipping a new schema version if discrepancies are
found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
