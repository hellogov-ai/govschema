# Verification record — `se/transportstyrelsen/vehicle-registration-new-vehicle` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2063, "GovSchema Standard Research")

This cycle's task brief asks (phase 1) to catalog what the registry already
covers and (phase 2) to research online for missing government
portals/forms/systems. Phase 1 found the registry at 29 jurisdictions, 319
published schemas, with Sweden (opened GOV-2056) at 1 of its 6 verticals
(Business Formation only). `se/bolagsverket/aktiebolag-formation`'s own
closing note flagged Sweden's other five verticals (Passport, DMV, Taxes,
Visa, National ID) as open, unscreened backlog candidates for a future
cycle — the natural, already-identified next step, rather than re-screening
already-gated jurisdictions or searching for a 30th country from scratch.

A scouting pass across all five remaining Swedish verticals found:

- **DMV (Transportstyrelsen)** — strong: Form TS8003 is a genuine,
  unauthenticated, directly downloadable fillable AcroForm PDF, with the
  authority's own field-by-field guide embedded in the same PDF.
- **Taxes (Skatteverket)** — weak: the income-tax return has moved to
  e-service-first; no current downloadable blank paper form was found, and
  the official field-by-field guide brochure ("Dags att deklarera",
  SKV 325) has been discontinued in favour of web pages.
- **Passport (Polismyndigheten)** — dead end: the entire process is
  in-person (photo and fingerprints captured at the appointment itself); no
  home-fillable application form exists, and booking requires
  e-legitimation login.
- **National ID (Skatteverket/Polisen national ID card)** — dead end for the
  same reason: in-person biometric issuance only. Only a companion
  guardian-consent form (SKV 1502) is downloadable, not the main
  application.
- **Visa (Migrationsverket)** — confirmed duplicate: Sweden's Schengen visa
  form (nos. 118031 SV / 119031 EN) is the identical EU-harmonized
  "Application for Schengen Visa" template already published as
  `fr/france-visas/schengen-visa-application`, and separately reconfirmed a
  duplicate for Spain and Czechia per CATALOG.md's own Known Gaps notes.

DMV was the clear strongest candidate, so this cycle authored
`se/transportstyrelsen/vehicle-registration-new-vehicle`.

## Sources examined

- **Document `(id, version)`:** `se/transportstyrelsen/vehicle-registration-new-vehicle` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Transport Agency (Transportstyrelsen).
- **Primary source:** Transportstyrelsen Form TS8003, version 03.00, edition
  2026-06-17 ("Ansökan om registrering av ett nytt fordon | Application for
  registration of a new vehicle"), downloaded directly from
  `https://www.transportstyrelsen.se/globalassets/global/blanketter/vag/fordonsinformation/ansokan-om-registrering-av-ett-nytt-fordon-ts8003-t.pdf`,
  linked from the official forms page
  <https://www.transportstyrelsen.se/sv/vagtrafik/e-tjanster-och-blanketter/blanketter-for-vagtrafik/fordon/Ansokan-om-registrering-av-ett-nytt-fordon/>.
  A genuine, official, fillable AcroForm PDF (4 pages), retrieved with a
  direct `curl` fetch (HTTP 200, no CAPTCHA/BankID/login gate).
- **Field extraction method:** `pdfjs-dist`'s `getFieldObjects()` and
  page-level `getAnnotations()` (AcroForm field names, types, and each
  field's PDF-level `Required` flag) across pages 1-2 (the only pages
  carrying form fields — pages 3-4 are pure instructions text), plus
  `getTextContent()` for the full text layer across all 4 pages — the same
  rigor already used for `se/bolagsverket/aktiebolag-formation`,
  `nl/kvk/bv-formation`, and `de/gewerbeamt/business-registration`. The PDF
  carries **41 AcroForm fields** (23 text, 18 checkbox) across its 2 field
  -bearing pages; programmatically checked all 41 annotations' `required`
  property exposed by pdfjs-dist (derived from PDF `fieldFlags` bit 2):
  **none** set it — the identical "form's own prose, not the PDF's Required
  bit, is the requiredness signal" pattern already documented for
  `se/bolagsverket/aktiebolag-formation`. Pages 3-4 of the same PDF are the
  form's own official Swedish-language, section-numbered field-by-field
  guide (items 1-4, matching the numbered sections on pages 1-2), used
  directly to write each field's `description` and to resolve which
  sections are conditional.
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| §1 (p.1): vehicle origin (imported by registered importer / manufactured in Sweden), importer/manufacturer contact | `originType`, `importerOrManufacturerOrgNumber`, `importerOrManufacturerEmail`, `importerOrManufacturerPhone`, `ownerIsSameAsImporter` |
| p.1 "Uppgifter om fordonsägaren": vehicle owner | `ownerFullName`, `ownerIdOrOrgNumber`, `ownerPhone` |
| §2 (p.1), guide item 2 (p.3): vehicle details, coded vehicle-type/colour lists | `vehicleType`, `makeType`, `baseVehicleMake`, `tradeDesignation`, `makeCode`, `groupNumber`, `identificationNumber`, `manufactureYearMonthOrModelYear`, `color` |
| p.1 "Registrera tekniska data", guide item 2 (p.3-4): technical-data registration method | `technicalDataViaIndividualApproval`, `typeApprovalNumber`, `technicalDataViaEcoc` |
| p.1 plate-combination checkboxes, guide item 2 (p.4): "Skyltkombination" | `plateOrdinaryFront`, `plateOrdinaryBack`, `plateSmallFront`, `plateSmallBack`, `plateMcMoped`, `plateSnowmobileAtv` |
| p.1: registration certificate issuance, end-of-series dispensation | `registrationCertificateRequested`, `endOfSeriesDispensationCaseNumber` |
| §3 (p.1), guide item 3 (p.4): putting into service, leasing/credit | `putIntoServiceRequested`, `isLeasing`, `isCreditPurchase`, `creditEndDate`, `financierOrgNumber` |
| §4 (p.2), guide item 4 (p.4): usage type for tractors/motorised implements/heavy terrain vehicles | `usedAsTrafficTractor`, `usedAsClass1ImplementMobileCrane`, `usedAsHeavyTerrainVehicleTrafficTractor`, `otherInformation` |
| p.2 "Underskrift": signature block | `signerPrintedName`, `signaturePlace`, `signatureDate`, `documents[].signerHandwrittenSignature` |
| p.3: CoC attachment rule | `documents[].certificateOfConformity` |
| p.3, item 1.A-B: import/manufacturer certificate attachment rule | `documents[].importOrManufacturerCertificate` |
| p.4: end-of-series dispensation decision attachment | `documents[].endOfSeriesDispensationDecision` |

## What is NOT independently confirmed / out of scope

- **No PDF-level `Required` flags.** As noted above, none of the 41 AcroForm
  fields set the PDF's own Required bit; `required`/`requiredWhen`
  assignments in this document are derived from the form's own numbered
  prose instructions and standard registration necessity, not a confirmed
  submission-time gate.
- **Used-vehicle / origin-check ("ursprungskontroll") path.** The form's own
  opening line states it "can only be used to apply for registration of a
  new vehicle"; a used vehicle, or a new vehicle lacking either the
  registered-importer or professional-manufacturer permit, instead requires
  a separate origin-check application submitted by email to
  `fordonsteknik@transportstyrelsen.se` — a distinct process this document
  does not model, flagged as a future companion-schedule candidate.
- **Multi-stage type-approved vehicles.** The form's guide (p.4) notes that
  when an eCoC contains multiple makes/trade designations across
  manufacturing stages, the one to be registered "must be stated" and match
  the eCoC's own format exactly; this document models the underlying
  `baseVehicleMake`/`makeType`/`tradeDesignation` fields but does not encode
  that cross-field format-matching rule itself, since it depends on the
  content of an external, unlinked eCoC record.
- **Power of attorney for a transferred end-of-series dispensation.** If an
  end-of-series dispensation was granted to someone other than the
  applicant, the guide requires a power of attorney (with the
  Transportstyrelsen case number) in addition to the decision copy; out of
  scope as a narrower edge case within an already-narrow dispensation
  branch.
- **Physical proof-of-insurance sticker.** Putting a vehicle into service
  (except a trailer) requires traffic insurance, evidenced on the paper
  form itself by a self-adhesive mark the applicant's insurer or its agent
  supplies — a physical artefact, not a data field or an attachable
  document, so it is only described in `putIntoServiceRequested`'s
  `description`, not modelled as its own `documents[]` entry.
- **Address decomposition.** Owner/importer/manufacturer contact details are
  modelled as the form's own flat fields (name, ID/org number, phone,
  email); the form itself has no address field for the owner or
  importer/manufacturer (only for the deputy-signature block on the
  Bolagsverket sibling schema, not this form).
- **Email submission channel for the origin-check form.** Noted above as an
  explicitly out-of-scope alternate process, not this document's own
  submission channel (this form is submitted by post to Transportstyrelsen,
  701 81 Örebro, per its own header; a CoC in paper format must additionally
  be posted in original form, per p.3).
- **Live e-service parity.** Not screened this cycle; this document is
  sourced entirely from the paper/PDF form, matching
  `se/bolagsverket/aktiebolag-formation`'s own scoping precedent.

## Scope and jurisdiction notes

- Opens **Sweden's DMV vertical** (2 of 6 verticals now open: Business
  Formation, DMV). Sweden's other four verticals (Passport, Taxes, Visa,
  National ID) remain open, either as genuinely unscreened (Taxes, given
  Skatteverket's e-service migration may still admit a companion form) or
  as confirmed dead ends/duplicates (Passport, National ID, Visa) per the
  research trail above.
- Scoped to a genuinely new vehicle only (the form's own stated scope); the
  used-vehicle/origin-check path is a disclosed, out-of-scope future
  companion-schedule candidate, the same class of scoping decision
  `se/bolagsverket/aktiebolag-formation` applies to non-cash share-capital
  contributions.
- `originType` and `ownerIsSameAsImporter` avoid the `notEquals`-against-an-
  optional-field pattern flagged as a bug in a prior cycle (documented in
  this registry's own operating memory as the "notEquals empty-string
  absent-field bug", first caught in `ie/electoral-commission/voter-registration`
  and generalized from GOV-763's numeric `notEquals: 0` finding): every
  `requiredWhen` condition in this document compares only against a
  required, always-populated enum field (`originType`, `vehicleType`) or a
  boolean field gated by such an enum (`ownerIsSameAsImporter`), never
  against an optional string/number field's absent-vs-sentinel state.
  `documents[].endOfSeriesDispensationDecision`'s trigger condition ("filled
  in `endOfSeriesDispensationCaseNumber`") is deliberately *not* expressed
  as a `requiredWhen` for the same reason — it is folded into the
  document's own `label` text instead, since GSP-0013's condition grammar
  has no safe leaf-compare for "field is present" on an optional string.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms the exact
requiredness Transportstyrelsen enforces when TS8003 is filed (paper or by
email, per p.3's alternate channel for the CoC-attached case), and whether
any live e-service equivalent exposes fields this paper-form sourcing does
not — recording the outcome here, shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Test run

A mock
`conformance/se/transportstyrelsen/vehicle-registration-new-vehicle/1.0.0/application-packet.json`
scenario (Nordic Import AB, a registered importer, imports a new Volvo XC60
for a customer, Karin Andersson, who is not the importer; technical data
registered via eCoC; the car put into service on credit with two ordinary
plates) was checked with a from-scratch Node.js script
(`/tmp/gov2063/check_conformance.mjs`, not committed to the repository)
re-implementing this document's own `required`/`requiredWhen` condition
grammar (GSP-0013: `equals`/`notEquals`/`in`/`greaterThan`/`lessThan`/
`all`/`any`/`not`). Result: **0 errors** across all 40 fields (36 collected,
4 correctly marked not-applicable) and all 4 documents (2 provided, 2
correctly marked not-applicable), with every schema field and document
accounted for exactly once (no unaccounted or unknown fields). Three
mutation tests confirmed the condition grammar fires correctly in both
directions:

1. Setting `technicalDataViaIndividualApproval` to `true` without adding
   `typeApprovalNumber` correctly raised 1 missing-required-field error.
2. Switching financing from `isCreditPurchase` to `isLeasing` without
   `financierOrgNumber` correctly raised 1 missing-required-field error
   (confirming the `any` composition over both financing branches).
3. Setting `ownerIsSameAsImporter` to `true` (owner is the importer) without
   `documents[].importOrManufacturerCertificate` correctly raised **0**
   errors — confirming the document's `any`/`all` composed `requiredWhen`
   condition correctly becomes false once neither disjunct holds.

The schema was also validated against the GovSchema v0.3 meta-schema with
`tools/validate-ajv.mjs` (pass) and `tools/validate.mjs` (pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
