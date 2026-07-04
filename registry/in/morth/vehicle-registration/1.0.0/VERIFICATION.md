# Verification record — `in/morth/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was **derived directly from the current Form 20 PDF**, downloaded
without any bot-block from parivahan.gov.in (the Ministry's own Parivahan Sewa
e-governance portal) — stronger sourcing than a third-party mirror. It is
corroborated against the authority's own "Permanent Registration" guidance
page. But new-vehicle registration in India is, in practice, almost always
initiated electronically by an authorized dealer through the separate,
credentialed Dealer Point Registration module of VAHAN — not a public
applicant-facing wizard — so the full field-by-field comparison
`manual-source-review-v1` (Procedure step 2) requires against a live portal
has **not** been completed. It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `in/morth/vehicle-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Road Transport and Highways (MoRTH), Government
  of India, acting through the state Regional Transport Offices (RTOs) as
  registering authorities.
- **Primary source URL:**
  <https://parivahan.gov.in/sites/default/files/DownloadForm/cmvr/FORM-20.pdf> —
  the current **Form 20** ("Application for Registration or Temporary
  Registration of a Motor Vehicle") PDF, served directly by parivahan.gov.in's
  own "Downloadable Forms" library. Fetched directly with `curl`, HTTP 200, a
  genuine 40 KB `%PDF-1.6` binary with a real text layer (not a scanned
  image). Text-extracted with `pdfjs-dist` (`getTextContent`); all 4 pages
  were read and transcribed in full.
- **Corroborating guidance page:**
  <https://parivahan.gov.in/en/content/permanent-registration> ("Permanent
  Registration"), fetched directly (`curl`, HTTP 200, a server-rendered
  Drupal page, not a JS SPA shell — the same access pattern already used for
  `in/morth/vehicle-registration-renewal`'s "Renewal of RC" guidance page).
  Its "Guidelines" section corroborates the seven-day filing window (Motor
  Vehicles Act 1988 §41, CMVR Rule 47) and the Rule 81 fee/tax reference. Its
  "Documents required" list — Form 20, sales certificate in Form 21, road
  worthiness certificate in Form 22/22A, pollution under control certificate,
  valid insurance certificate, proof of address, design approval (trailer/
  semi-trailer), original Form 21 sales certificate (ex-army), customs
  clearance certificate (imported), temporary registration if any, Form 34
  (HP endorsement), and several state-variable items marked with an asterisk
  — was used for the `documents[]` array, together with its own footnote
  that asterisked items "may be required in some states."
- **Live-portal attempt:** the parivahan.gov.in guide page and public search
  were used to confirm that ordinary new-vehicle registration is routed
  through the Dealer Point Registration module (a credentialed, dealer-only
  e-service pre-populated from manufacturers' Homologation-portal data), not
  a public wizard an individual applicant walks through directly — consistent
  with this registry's treatment of other credential-gated live services
  (e.g. `in/mca/company-incorporation-spice-plus`).
- **Retrieved / reviewed:** 2026-07-04 (both sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `registeredOwnerFullName`, `relationToRegisteredOwner`, `relatedPersonName`, `registeredOwnerAge`, `permanentAddress`, `temporaryOrOfficialAddress`, `ownershipType` | **Directly observed**, Form 20 items 1-4A (page 1). The 15 `ownershipType` enum values are the form's own printed list. |
| `durationOfStayAtPresentAddress`, `ownerMobileNumber`, `panNumber`, `placeOfBirth`, `dateMigratedToIndia`, `nomineeName`, `nomineeRelationship`, `dealerOrManufacturerNameAddress` | **Directly observed**, Form 20 items 5-10 (page 2). |
| `dateMigratedToIndia` conditionality | **Inferred simplification.** The form gates item 8 on "if place of birth is outside India," but `placeOfBirth` (item 7) is free text, not a fixed enum GSP-0013's condition grammar can compare against faithfully. Modelled as an unconditioned optional field with a description explaining the intended gate, rather than a `requiredWhen` that would either never fire or misfire on substring matching. |
| `nomineeName` / `nomineeRelationship` required:false | **Inferred.** Form 20 does not print an explicit "(optional)" marker on items 9A/9B the way it does on item 6 (PAN). Modelled as optional because nomination is understood to be a discretionary CMVR facility, not a precondition of registration; a future review against a live/authoritative FAQ could confirm this explicitly. `nomineeRelationship`'s `requiredWhen` was deliberately **not** written as `{"field": "nomineeName", "notEquals": ""}` — that pattern was flagged in a prior review cycle as a recurring source-fidelity bug: GSP-0013 has no field-absence operator, and `notEquals ""` against an absent (`undefined`) value evaluates to `true` regardless, so it would have made `nomineeRelationship` appear always-required. Left as an unconditioned optional field with an explanatory `description` instead. |
| `vehicleRegisteredAs` (extends Form 25's enum with `in-use-e-rickshaw-or-e-cart`), `classOfVehicle` through `bodyColour` (items 12, 14-28) | **Directly observed**, Form 20's numbered vehicle-particulars block (pages 1-2). Items 29-39 (page 3), the "ADDITIONAL PARTICULARS TO BE COMPLETED ONLY IN THE CASE OF TRANSPORT VEHICLE OTHER THAN MOTOR CAB" block, are **out of scope** for v1.0.0 — see Scope below. |
| `horsePower` required:false | **Inferred.** Form 20 prints items 19 (horse power) and 20 (cubic capacity) as two separate blanks, unlike Form 25's single combined blank. Modelled `cubicCapacity` as required and `horsePower` as optional, since cubic capacity is the figure consistently completed across vehicle/engine types in practice while horsepower is often left blank for small vehicles and is meaningless for Battery Operated Vehicles. |
| `notPreviouslyRegisteredInIndiaDeclaration` | **Directly observed**, verbatim: "I hereby declare that the motor vehicle has not been registered in any State in India." |
| `vehicleUnderEncumbrance`, `encumbranceType`, `encumbranceHolderName` | **Directly observed**, Form 20's Note section (page 4): the same mutually-exclusive hire-purchase/lease vs. hypothecation vs. neither pattern already modelled in `in/morth/vehicle-registration-renewal`, read the same way here (a single choice field plus a shared holder-name field) for consistency across the two MoRTH schemas. |
| `documents[].saleCertificateForm21`, `documents[].roadWorthinessCertificate` | **Directly observed** on Form 20 item 10's parenthetical instruction, corroborated by the guidance page's non-asterisked "Sales certificate in Form 21" / "Road worthiness certificate..." lines. |
| `documents[].pollutionUnderControlCertificate`, `documents[].validInsuranceCertificate`, `documents[].proofOfAddress` | **Directly observed on the guidance page** (non-asterisked, so modelled `required: true`); `proofOfAddress` is additionally corroborated by Form 20 item 3's own parenthetical list of acceptable proof-of-address document types. |
| `documents[].pencilPrintOfChassisAndEngineNumber` | **Directly observed**, Form 20 item 22's "(Affix Pencil print)" instruction; the guidance page marks its own equivalent line with an asterisk, but since the instruction is printed directly on the application form itself (not merely the guidance checklist), modelled `required: true`, consistent with the same judgment call already made for `in/morth/vehicle-registration-renewal`. |
| `documents[].exArmyOrImportedVehicleProof`, `documents[].customsClearanceCertificate` | **Directly observed**, Form 20 item 11 and the guidance page's ex-army/imported lines. Gated with `requiredWhen` on the `vehicleRegisteredAs` enum (an `any` composition for the shared proof document, a single `equals` for the imported-only customs document) — both branches exercised in the conformance check below. |
| `documents[].temporaryRegistrationCertificate`, `documents[].panCardOrForm60Form61` | **Directly observed on the guidance page only**, modelled `required: false` per the page's own "if any" / asterisk markers. |
| `documents[].specimenSignatureOfRegisteredOwner` | **Directly observed**, Form 20's signature/specimen-signature block (page 4). |
| `documents[].registrationFee` | **Directly observed reference** (Form 20 item 39; guidance page's Rule 81 fee and vehicle-tax lines), amount not encoded — fees and tax vary by vehicle class, registration-number choice, and HSRP/smart-card use, consistent with this registry's other MoRTH fee entries. |

## Test run with mock data

A mock application packet was assembled at
`conformance/in/morth/vehicle-registration/1.0.0/application-packet.json`
using fabricated owner/vehicle details (not a real chassis/engine number or
address) for an individual registering a new petrol hatchback purchased
outright from a dealer, with a nominee named and no encumbrance. It was
checked with a small ad hoc script (`check_conformance.mjs`, re-implementing
this schema's own `required`/`requiredWhen`/`validation` evaluation — the
condition grammar `all`/`any`/`not`/leaf-compare per GSP-0013 — against the
packet's `collectedValues`): all 38 fields accounted for (30 populated, 8
correctly recorded in `fieldsNotApplicable` for a private, non-transport,
new, unencumbered vehicle), **zero constraint violations**. A second script
(`check_branches.mjs`) exercised the conditional branches not hit by the
baseline packet: `vehicleRegisteredAs = imported-vehicle` correctly requires
both `exArmyOrImportedVehicleProof` and `customsClearanceCertificate`;
`vehicleRegisteredAs = ex-army-vehicle` requires only the former (confirming
the `any` composition and the single-branch condition each resolve
independently); and `vehicleUnderEncumbrance = true` correctly flags
`encumbranceType`/`encumbranceHolderName` as missing until both are
supplied, then reports zero violations. No value was submitted to any
government system: ordinary new-vehicle registration is routed through a
credentialed, dealer-operated e-service with no public applicant-facing
wizard and no test/sandbox mode, so — consistent with this registry's
treatment of other credential-gated live services — this review did not
attempt to exercise a live wizard end to end.

## Scope and jurisdiction notes

- **Ordinary first-time registration of a new, ex-army, imported, or in-use
  e-rickshaw/e-cart, non-transport (private) motor vehicle by an
  individual, firm, or other listed ownership type, at the registering
  authority in whose jurisdiction the vehicle is kept.** Out of scope for
  v1.0.0:
  - Transport (commercial) vehicles, which require Form 20's additional
    items 29-39 (gross vehicle weight, axle weights, overall dimensions,
    permit particulars) — a distinct, larger data set not modelled here.
  - The Dealer Point Registration workflow itself (the credentialed,
    dealer-operated e-service most new vehicles are actually registered
    through) — this schema models the applicant-facing Form 20 data set a
    dealer collects and enters on the buyer's behalf, not the dealer's own
    portal session.
  - Issuance or renewal of a temporary registration (a separate, shorter-
    lived registration a vehicle may hold before permanent registration).
  - Reassignment of a registration mark, and a locally-manufactured
    trailer/semi-trailer's separate State Transport Authority design-
    approval process (noted only as a conditional supporting document here).
  - Vehicle registration **renewal** (Form 25, already published as
    `in/morth/vehicle-registration-renewal`) and ownership **transfer**
    (Forms 29/30, already published as `in/morth/vehicle-ownership-
    transfer`) — both separate, already-modelled processes at other points
    in a vehicle's life.
- **This closes the specific sub-process gap flagged by
  `in/morth/vehicle-registration-renewal`'s own VERIFICATION.md** ("Vehicle
  registration itself (Form 20) ... a separate process") and by the GOV-986
  audit's finding that the registry's coarse "1+ schema per (jurisdiction,
  vertical)" matrix was saturated but had not yet checked for **sub-process**
  gaps within an already-covered vertical — specifically, that most
  published DMV "Vehicle Registration" entries model only *renewal*
  (`in/morth/vehicle-registration-renewal`, `nz/nzta/vehicle-licence-
  renewal`, `sg/lta/road-tax-renewal`, `us/ca/dmv/vehicle-registration-
  renewal`, `us/fl/flhsmv/vehicle-registration-renewal`) rather than a
  vehicle's original, first-time registration. `de/kba/vehicle-registration`
  and `ca/on/mto/vehicle-registration` already model first-time registration;
  this schema brings India into that set as a third jurisdiction.
- This cycle (GOV-1093) also re-confirmed two already-known dead ends before
  choosing this target: `ca/on/mto/vehicle-permit-renewal` (a live headless-
  browser walkthrough again reached Step 2's real plate/permit eligibility
  lookup and again received a genuine "not eligible... 180 days" business-
  rule response for a fabricated pair — third confirmed instance of this
  exact block, see the candidate's own catalog notes) and
  `gb/hmrc/national-insurance-number-application` (still IP-blocked per
  GOV-926's prior finding). Neither was re-attempted further; both remain
  `candidate`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against a live Dealer Point Registration
session or an equivalent authoritative walkthrough with a genuine vehicle and
dealer credentials, confirms which of the guidance page's asterisked
(state-variable) documents apply in that state, resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
