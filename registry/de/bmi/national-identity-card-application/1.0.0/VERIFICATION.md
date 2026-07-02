# Verification record — `de/bmi/national-identity-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields, documents, and
flow, records a mock-data test run of the field set, and states the current
verification claim honestly.

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

This is the last open catalog **tier-1** candidate in the National ID & Civic
Documents vertical (`discovery/catalog.json`), identified during the GOV-200
catalog gap review: German nationals aged 16+ are legally required to hold an
identity document, most commonly this card, making it one of the
highest-frequency processes in the jurisdiction. It is distinct from
`de/bmi/residence-registration` (Anmeldung, open to any resident) and
`de/finanzamt/tax-identification-number` (neither of which is an identity-
document application), and from `de/bmi/passport-application` (a related but
separate BMI document this cycle deliberately mirrors in structure, since both
share the same in-person Bürgeramt/Melderegister process model).

## Sources examined

- **Document `(id, version)`:** `de/bmi/national-identity-card-application` /
  `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Primary source URL:** <https://service.berlin.de/dienstleistung/120703/>
  — Berlin's official "Personalausweis beantragen" service page. Fetched
  directly with `curl` (HTTP 200) and read in full as raw HTML text, not a
  small-model summary. Covers eligibility (citizenship, personal appearance,
  Berlin residency and the primary/secondary fee distinction, minors),
  reasons to apply, validity periods, the full required-documents list
  (including the minor/guardian custody nuance and the first-application
  religious-headwear declaration), the complete fee schedule, processing
  time, the in-person-only submission channel, the direct-mail delivery
  pilot, and the legal basis (PAuswG §9).
- **Secondary source #1 (national cross-check, Application):**
  <https://www.personalausweisportal.de/Webs/PA/EN/citizens/german-id-card/application/application-node.html>
  — the BMI's own citizen-facing English-language "German ID Card" portal.
  The live site returns HTTP 400 to a direct fetch (a bot-block distinct from,
  but structurally similar to, the WAF blocks recorded for `canada.ca` and
  `nzta.govt.nz`); retrieved instead via a Wayback Machine capture dated
  2024-12-14. Independently corroborates: application is in-person only, at
  "the identity card authority of your local government services office";
  the card is issued only to German nationals; minors under 16 need a
  parent/guardian applicant, generally with the other parent/guardian's
  consent; necessary documents (valid ID or, failing that, passport/child ID/
  child passport, plus a current passport photograph, plus birth certificate
  in the same two conditions Berlin describes); detailed photograph
  requirements (front view, centred face, open eyes, closed mouth, neutral
  expression); and — a fact Berlin's page does not mention — that a **second
  fingerprint has been mandatory on newly issued cards since August 2021**
  (EU-wide requirement), which this schema does not model as a field because
  fingerprint capture happens at the appointment itself, not as an applicant-
  supplied data point, consistent with how photo capture is modelled
  (`photoCreationChannel`) but fingerprinting is not.
- **Secondary source #2 (national cross-check, Fees and Validity):**
  <https://www.personalausweisportal.de/Webs/PA/EN/citizens/german-id-card/fees-and-validity/fees-and-validity-node.html>
  — Wayback capture dated 2024-09-26. Confirms the 6-year (under 24) /
  10-year (24+) validity split and the same fee-driver categories Berlin
  lists (age tier, secondary-residence surcharge, temporary card, eID
  activation/PIN-change/address-change being free since January 2021). **Fee
  amounts differ from Berlin's live page** — this capture shows €37/€22.80
  (age tiers) versus Berlin's live €46.00/€27.60 — read as a genuine fee
  increase in the ~20 months between the two sources, not a factual
  discrepancy in this schema (fees are not encoded as schema data either
  way; see "Fees, deliberately unencoded" below).
- **Secondary source #3 (field-layout cross-check, Data on the ID Card):**
  <https://www.personalausweisportal.de/Webs/PA/EN/citizens/german-id-card/data-on-the-id-card/data-on-the-id-card-node.html>
  — Wayback capture dated 2024-12-19. The front/back field legend itself is
  an interactive numbered image whose labels did not extract as text; used
  only to confirm the page's existence and general front/back split, not as
  a field source.
- **Tertiary source (issued-card field layout, not application-form
  fields):** the English Wikipedia article
  ["German identity card"](https://en.wikipedia.org/wiki/German_identity_card)
  (retrieved 2026-07-02) documents the exact printed field list on the
  physical card (front: photo, document number, RFID access number, surname,
  birth name, given names, date of birth, nationality, place of birth,
  expiry date, signature; back: eye colour, height, date of issue, issuing
  authority, residence, religious name/pseudonym, MRZ) and the chip contents
  (name, date of birth, photograph, and — since 2021 — fingerprints). This
  confirms that nearly all core identity data displayed on the finished card
  originates from the Melderegister, not fresh applicant declarations — the
  same "confirmed against the population register, not freely declared"
  framing already used for `de/bmi/passport-application`'s `lastName`/
  `firstNames`/`dateOfBirth` fields — and that the card does **not** print a
  sex/gender marker (unlike this registry's other National ID schemas, e.g.
  `sg/ica/identity-card-replacement`), so no such field is modelled here.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## What was confirmed directly against the primary source

From `service.berlin.de/dienstleistung/120703/` (fetched and read in full):

| Source element | Field(s) / schema element |
|---|---|
| "Deutsche Staatsangehörigkeit" | `isGermanCitizen` (`fieldRole: eligibility`, exit transition) |
| "Wohnsitz in Berlin (Ausnahmen möglich)" / secondary-residence fee surcharge | `residenceBasis` |
| "1 aktuelles, digitales biometrisches Passfoto (Neue Regelung ab 01.05.2025)" | `photoCreationChannel` |
| "Ihr altes Dokument (falls vorhanden)" / "Ihr gültiges Dokument (falls vorhanden)" | `identityDocumentForVerification` (modelled as genuinely optional, not required — see "Scope notes") |
| "ggf. Personenstandsurkunde... falls Sie noch nie ein Dokument... hatten" / "falls Ihre Angaben... abweichen" | `neverHeldGermanIdOrPassport`, `personalDataDiffersFromRegistration`, `birthOrMarriageCertificate` |
| "Wenn Sie eingebürgert wurden und erstmals deutsche Dokumente beantragen wollen" | `recentlyNaturalised`, `naturalisationCertificate`, `previousForeignIdDocument` |
| "Persönliche Vorsprache... Bei Minderjährigen vor Vollendung des 16. Lebensjahres..." / separated-guardian custody rule | `applicantIsMinor`, `separatedGuardianConsentRequired`, `guardianConsentAndIdDocument` |
| "Gehören Sie... einer Religionsgemeinschaft an, die... nicht ohne Kopfbedeckung..." | `belongsToHeadwearRequiringReligiousCommunity`, `religiousHeadwearDeclaration` |
| "Bei Antragsstellung kann ein Direktversand gewählt werden (Pilotphase)" | `deliveryMethod` |
| Fee table (age tiers, secondary-residence +€13, on-site photo +€6, direct-mail +€15) | not modelled as data (see "Fees, deliberately unencoded" below); drives which enum options exist on `residenceBasis`, `photoCreationChannel`, `deliveryMethod` |
| "Das können Sie ausschließlich vor Ort im Bürgeramt machen" | `process.type`, description (in-person only, no online channel) |
| "Personalausweis vorläufig beantragen" (separate service) | out of scope (description), same discipline as `de/bmi/passport-application` excluding the provisional Reisepass |
| Legal basis: Personalausweisgesetz (PAuswG) §9 | cited in `authority`/description |

## What was cross-checked against the secondary/tertiary sources

The in-person-only channel, German-nationals-only eligibility, the two-tier
validity period, the general minor/guardian-consent shape, and the photo
requirements were all independently corroborated by the BMI's own
personalausweisportal.de pages (application, fees-and-validity) — the same
"Berlin exemplar of a nationally-set legal framework, cross-checked against a
federal source" convention already established for
`de/bmi/residence-registration` and `de/bmi/passport-application`. The
Wikipedia article independently corroborated the printed-card field layout
and confirmed the absence of a sex/gender field.

## What is NOT yet independently verified

- **The live in-person appointment system's actual screen/data-entry
  sequence.** As with `de/bmi/passport-application`, the authoritative "form"
  here is not a downloadable document but a Bürgeramt clerk's internal
  system, not independently reachable pre-appointment. This document's
  fields and step ordering are reconstructed from citizen-facing guidance
  prose, not a direct read of that system.
- **Whether every Land's citizen office uses an identical fee/service-option
  structure.** Berlin's dienstleistung 120703 is treated as a representative
  exemplar of a nationally-set legal framework (PAuswG), not proof every Land
  is byte-identical — the same caveat already recorded for
  `de/bmi/residence-registration` and `de/bmi/passport-application`.
- **Exact wording of the separated-guardian consent declaration.** Berlin's
  page names the downloadable form ("Einverständniserklärung des nicht
  anwesenden Elternteils zum Antrag auf Ausstellung eines
  Personalausweises") but this session did not retrieve and read that PDF
  directly, so `guardianConsentAndIdDocument` is modelled as a
  `supporting-evidence` document (a document to be provided), not as an
  `attestation` with a source-verbatim `statement` string.
- **The exact fee amounts currently in force nationwide.** The €13/€23.20
  gap between Berlin's live page and the BMI portal's 2024 Wayback capture
  (see Sources) is read as a genuine increase over time, but this was not
  cross-checked against a third, more recent national source.
- **Fees, deliberately unencoded.** As with every other schema in this
  registry, specific EUR amounts (recorded above only for traceability) are
  not asserted as schema data; they change over time and the live source is
  authoritative.

## Scope notes

- **`identityDocumentForVerification` is modelled as genuinely optional**
  (`required: false`, no `requiredWhen`), unlike `de/bmi/passport-application`'s
  equivalent field, which is `required: true`. Berlin's own wording — "falls
  vorhanden" ("if available") — for both the old-document and valid-document
  bullets makes clear a true first-time applicant (most commonly a
  16-year-old with no prior Personalausweis or Reisepass) may have nothing
  to present at all beyond the birth certificate already required by
  `birthOrMarriageCertificate`. This is a deliberate refinement over the
  passport schema's modelling choice, not an inconsistency — flagged here so
  a future reviewer does not "fix" it to match.
- **The minor/guardian custody nuance is new relative to
  `de/bmi/passport-application`.** Berlin's Personalausweis page spells out a
  materially richer rule than its Reisepass page: separated joint-custody
  guardians require the absent guardian's written consent unless the
  applying guardian has sole custody or both attend together, and if the
  guardians live apart (not just temporarily) only the guardian with whom
  the minor is registered may apply at all. The last of these (the
  registered-guardian-only restriction) is documented in this file and the
  field description, but is not separately modelled as its own field/
  condition — the schema captures the consent-document consequence
  (`separatedGuardianConsentRequired`) an agent needs to act on, not every
  underlying eligibility nuance a human clerk would apply, matching the
  economy-of-modelling precedent set by `au/ato/individual-tax-return-mytax`.
- **The first-application religious-headwear declaration is new** and not
  present in any other DE schema in this registry. It is gated to
  first-time applicants only (`neverHeldGermanIdOrPassport: true`), matching
  Berlin's own "bei der erstmaligen Beantragung" (at first-time application)
  wording.
- **Out of scope:** the provisional identity card (vorläufiger
  Personalausweis, dienstleistung 120682), the service for German citizens
  not registered in Berlin/the homeless/tourists/Germans resident abroad
  (dienstleistung 326550), the exemption-from-the-Ausweispflicht service, the
  Reisepass (a separate, already-published DE schema) and Kinderreisepass,
  and the post-issuance eID/PIN-activation step. Each is a related but
  distinct service or a later lifecycle stage, not part of applying for the
  card itself.
- **Single applicant only**, consistent with every other schema in this
  registry; a minor's guardian is modelled only via the `responsible-party`
  document, not as a full co-applicant field set.

## Mock-data test run

A fabricated first-time-minor-applicant scenario (Lukas Weber, age 17, born
2008-11-15, first-ever Personalausweis, separated joint-custody parents with
one present) was assembled into a conformance packet
(`conformance/de/bmi/national-identity-card-application/1.0.0/`) and checked
programmatically against this schema's own `required`/`requiredWhen` rules:
**all 13 fields and all 6 documents accounted for exactly once (collected or
explicitly not-applicable; provided or explicitly not-applicable), 0
errors.** This scenario was deliberately chosen over a simpler adult-renewal
case to exercise every conditional path this document adds beyond
`de/bmi/passport-application`'s template: the minor/separated-guardian
consent chain and the first-application religious-headwear declaration.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live Bürgeramt appointment
process itself, not just the surrounding guidance prose — the same gap
flagged for `de/bmi/passport-application`. Retrieve and read the actual
"Einverständniserklärung des nicht anwesenden Elternteils" PDF form directly
to confirm (or promote to an `attestation`) the consent-document wording, and
cross-check current fee amounts against a third, more recent national source.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check all sources on or before that date and on any `source.url`
change.
