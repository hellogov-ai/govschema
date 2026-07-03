# Verification record — `fr/france-visas/schengen-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived directly from the harmonised Schengen application
form (CERFA 14076*05) that France-Visas' online démarche collects data for,
cross-checked against official service-public.gouv.fr and diplomatie.gouv.fr
guidance describing the online process. The full field-by-field comparison
the practice requires against the **live, authenticated
france-visas.gouv.fr online application screens** has not been completed, so
this remains `draft`, not `verified`.

## Why this cycle picked up France's Schengen visa application

This is the recurring "GovSchema Standard Research" cycle
([GOV-770](/GOV/issues/GOV-770)). The prior cycle
([GOV-763](/GOV/issues/GOV-763)) closed the FR x Taxes gap and left France
still missing schemas in National ID & Civic Documents, Business Formation,
and Visa. Of those three, Visa is also the single weakest vertical
registry-wide — 4/9 jurisdictions (only CA/GB/US/AU) even after
`au/homeaffairs/eta-application-601` was authored in GOV-756 — so this cycle
picked up France's Visa gap over the other two remaining FR gaps, per
GOV-756's own "how to apply" recommendation to prioritize Visa. This
document closes the FR x Visa cell (Visa now 5/9).

## Sources examined

- **Document `(id, version)`:** `fr/france-visas/schengen-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** France-Visas, the joint online visa service of the
  Ministère de l'Europe et des Affaires Étrangères (MEAE) and the Ministère
  de l'Intérieur — both named as the data controllers directly on the
  source form itself.
- **Primary source (field-by-field detail):**
  <https://www.formulaires.service-public.gouv.fr/gf/cerfa_14076.do>, which
  serves the harmonised CERFA N°14076*05 "Demande de visa Schengen /
  Application for Schengen Visa" PDF (the same standard form used by every
  Schengen state, of which the France-Visas online form is a digital front
  end), fetched **directly with no access block** (HTTP 200, 91.3 KB PDF).
  All 33 numbered boxes plus the administration-only section and page-4
  declaration/signature block were extracted with `pdfjs-dist`'s
  `getTextContent()` (the PDF is a plain printed-form text layer, not an
  interactive AcroForm — same class of extraction as
  `fr/dgfip/income-tax-return-2042`).
- **Access-block note:** `france-visas.gouv.fr` itself (both its `/en/`
  guidance pages and its own hosted copy of the same CERFA PDF at
  `france-visas.gouv.fr/documents/d/france-visas/...`) returned an
  interstitial bot-check page ("One moment please") on every direct fetch
  attempt during this session — a new instance of the access-block pattern
  already recorded for several other jurisdictions' portals in this
  registry (e.g. `gov-au-wayback-workaround`). Unlike those cases, no
  Wayback Machine fallback was needed or attempted: the identical CERFA PDF
  is independently and authoritatively mirrored by
  `formulaires.service-public.gouv.fr`, itself a `gouv.fr` public-service
  property (France's official forms portal), which imposes no such block.
- **Secondary sources (online-process/flow detail):**
  <https://www.service-public.gouv.fr/particuliers/vosdroits/R1476?lang=en>
  (confirms the CERFA form number and that it is submitted at a French
  embassy/consulate abroad) and third-party visa-application-centre
  operator (TLScontact) public guidance describing France-Visas' own
  five-step published process (create an account and fill in the online
  form; receive an email receipt; book an appointment at the allocated visa
  centre; attend the appointment to submit the file and give biometrics;
  track the application until passport receipt) — used only for the
  process/flow wrapper (steps, in-person appointment framing), not for any
  field-level content, all of which is sourced to the CERFA form itself.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Box 1-9, 11 (état civil / personal details) | `lastName` through `nationalIdentityNumber` |
| Box 12-16 (travel document) | `travelDocumentType` through `travelDocumentIssuingCountry` |
| Box 19-20 (address, contact, residence) | `email` through `residencePermitValidUntil` |
| Box 21-22 (occupation, employer) | `currentOccupation`, `employerOrEducationEstablishmentDetails` |
| Box 23-27 (purpose, destination, entries, dates) | `purposeOfJourney` through `intendedDepartureAfterFirstStayDate` |
| Box 28-29 (prior Schengen visa/fingerprint history, final-destination entry permit) | `fingerprintsCollectedPreviously` through `finalDestinationEntryPermitDetails` |
| Box 30-31 (host/invitation, accommodation) | `invitingPersonOrHotelName` through `hostOrganizationContactPersonDetails` |
| Box 32 (funding and means of subsistence) | `travelCostsFundedBy` through `sponsorMeansOfSubsistence` |
| Box 33 (form completed by another person) | `formCompletedByThirdParty` through `thirdPartyPreparerContactDetails` |
| Administration section "Documents justificatifs" checklist (Document de voyage / Moyens de subsistance / Invitation / Assurance maladie en voyage / Moyen de transport) | `documents[]`: `travelDocumentCopy`, `meansOfSubsistenceEvidence`, `invitationOrAccommodationEvidence`, `travelMedicalInsuranceCertificate`, `meansOfTransportEvidence` |
| Page 4 declaration/signature block | `documents[]`: `signedDeclaration` (verbatim `statement`) |
| france-visas.gouv.fr fee schedule | `documents[]`: `visaFeePaymentReceipt` (EUR 90 standard adult fee) |

## What is NOT modelled (out of scope), and why

- **Box 10 (parental authority / legal guardian for minors)** — this
  document models an adult applicant applying for themselves; an
  application made by a parent/guardian on behalf of a minor is out of
  scope, the same exclusion `gb/ukvi/standard-visitor-visa` makes for
  under-18 applicants.
- **Boxes 17-18 (data of the EU/EEA/Swiss/UK-national family member, and
  the applicant's relationship to them)** — the form itself instructs that
  "family members of EU/EEA/Swiss/UK-agreement nationals must not fill in
  boxes 21, 22, 30, 31, and 32 (marked with an asterisk)": this is a
  structurally distinct, narrower application pathway (visa facilitated
  under free-movement rules) rather than a variant of the standard
  short-stay case this document models. Out of scope entirely, including
  the asterisked boxes' conditional exemption, to keep this document to one
  coherent pathway rather than silently mixing two.
- **The long-stay national visa (CERFA N°14571, "visa de long séjour")** —
  a structurally different form (for stays over 90 days: work, study,
  family reunification) with its own field set; out of scope, the same
  main-form/sibling-form split already used for
  `fr/dgfip/income-tax-return-2042`'s annexes.
- **The DROM-CTOM overseas-territories short-stay form (CERFA
  N°15934*01)** — a near-duplicate form for a narrower set of destination
  territories; out of scope.
- **Administration-only boxes** (date/number of the request, submission
  channel, caseworker, decision, visa validity dates/entries/days) are
  filled in by the consulate, not the applicant, and are excluded, the same
  administration-only exclusion already applied to every other reference
  schema modelling an official paper form in this registry.
- **No live france-visas.gouv.fr online-form walkthrough.** Creating a
  France-Visas account and starting a real application requires an actual
  travel intent and (per its five-step process) leads directly into
  booking a real consulate/VAC appointment slot — not something this
  environment can exercise safely or reversibly. The field model is
  reconstructed from the authoritative CERFA form the online démarche is
  built from, not a direct read of the live screens themselves.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`enum`
constraint in `schema.json`, using a one-off Python condition evaluator (not
committed to the repo) implementing the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `condition` schema:

**Scenario 1 — self-funded first-time tourist** (35/56 fields populated):
Marco Alvarez, an Argentine national travelling to France for tourism,
funding the trip himself, with no prior Schengen visa and a hotel booking
as the accommodation reference.

**Scenario 2 — sponsor-funded business trip with prior visa history**
(42/56 fields populated): the same applicant instead attending a trade fair
as an exhibitor (`purposeOfJourney: other`), residing in a third country
under a residence permit, with a prior Schengen visa on file, the trip
funded by a corporate sponsor, and the form completed by a travel agent
rather than the applicant.

Both runs:

```
All required fields satisfied. OK   (Scenario 1: self-funded tourist, no prior visa)
All required fields satisfied. OK   (Scenario 2: sponsor-funded business trip, prior visa, third-party preparer)
```

Scenario 2 specifically exercised every `requiredWhen`-gated field this
document defines: `maritalStatusOtherDescription`, `purposeOfJourneyOtherDescription`,
`residencePermitNumber`/`residencePermitValidUntil`, `sponsorDetails`/
`sponsorMeansOfSubsistence`, and `thirdPartyPreparerName`/
`thirdPartyPreparerContactDetails` — all correctly required once their
gating field was set, and correctly *not* required in Scenario 1 (default
path: applicant-funded, self-completed, no residence-permit, no "other"
branches). No defects were found in this pass; every `requiredWhen` in this
document gates on a `boolean`/`enum` `equals` comparison, not a numeric
`notEquals`/`greaterThan` comparison, so the absent-vs-zero misfire recorded
for `fr/dgfip/income-tax-return-2042` does not apply here structurally.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs
ok   registry/fr/france-visas/schengen-visa-application/1.0.0/schema.json

$ node tools/validate-ajv.mjs
ok   registry/fr/france-visas/schengen-visa-application/1.0.0/schema.json [v0.3]
```

## Multi-select fields modelled as comma-separated strings

Boxes 32's "means of subsistence" checkboxes allow selecting more than one
option at once (e.g. both "credit card" and "cash"). Spec v0.3 has no
`array` type (GSP-0009, proposed but not yet accepted), so
`applicantMeansOfSubsistence` and `sponsorMeansOfSubsistence` are modelled
as free-text `string` fields whose `description` documents the closed
comma-separated vocabulary — the same multi-select-as-string treatment
already used for `race` and other multi-check fields in
`us/uscis/travel-document-i131` and `us/uscis/permanent-resident-card-replacement-i90`.

## Scope and jurisdiction notes

- This is France's first Visa-vertical document (`fr/ants/*` and
  `fr/dgfip/*` cover DMV/Passport/Taxes respectively; this document opens a
  fourth FR authority segment, `fr/france-visas/*`).
- `id` uses the `france-visas` authority segment (the name of the joint
  interministerial service applicants actually interact with) rather than
  either ministry individually, the same convention already used for
  `gb/ukvi/standard-visitor-visa` (a directorate name, not its parent
  department "Home Office") and `ca/ircc/eta-application`.
- Conditional requiredness/visibility uses `requiredWhen`/`visibleWhen`
  (GSP-0013), targeting spec v0.3, the same as every other Visa-vertical
  document in this registry.
- The visa fee (`visaFeePaymentReceipt`, EUR 90) reflects the current
  standard adult short-stay fee; reduced/waived rates for children,
  students under specific agreements, and other categories are not
  separately modelled.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` Procedure step 2 against the live, authenticated
france-visas.gouv.fr online application form itself (which requires
starting a real application with genuine travel intent), confirms the exact
online-screen grouping and wording against the CERFA-derived field model
here, and records the outcome — shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
