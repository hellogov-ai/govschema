# Verification record — `is/skatturinn/business-employer-vat-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2077, "GovSchema Standard Research")

This cycle's task brief asks (phase 1) to catalog what the registry already
covers and (phase 2) to research online for missing government portals/forms.
Phase 1 found the registry at 29 jurisdictions, 321 published schemas. A fresh
read of `CATALOG.md`'s Executive Summary confirmed Sweden (opened GOV-2056,
deepened GOV-2063/GOV-2070) now stands at 3 of 6 verticals, with its remaining
three already screened and dead-ended or blocked this same week: Passport and
National ID are both confirmed in-person/biometric-only, and Taxes
(Skatteverket SKV 4314) remains genuinely source-blocked — the only static
copy is a stale c.2014/2015 edition and the live PDF-generation servlet resets
the connection for both a direct fetch and a real headless-Chromium session
alike. The brief's own named National ID candidates (DE Steuer-ID, SG NRIC,
NZ RealMe, "remaining voter registration") are all already resolved or
confirmed non-gaps in prior cycles (see `CATALOG.md`'s own repeated notes on
this). Rather than re-attempt an already-blocked or already-closed gap, a
scouting subagent was dispatched to (a) retry Sweden's Taxes vertical via an
alternate source and (b) find a genuinely new (30th) jurisdiction. Lead (a)
reconfirmed the same structural block (Wayback Machine was also unreachable
this cycle). Lead (b) found Iceland's Skatturinn (Directorate of Internal
Revenue) publishing **RSK 5.02** ("Notification to tax authorities,
registration in the employer's registry and/or value added tax registry") as
a directly downloadable, unauthenticated, bilingual (Icelandic/English)
fillable AcroForm PDF with no CAPTCHA/login/WAF gate — a genuinely new,
unscreened jurisdiction with a strong, currently-served source.

## Sources examined

- **Document `(id, version)`:** `is/skatturinn/business-employer-vat-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Iceland Revenue and Customs (Skatturinn), formerly Ríkisskattstjóri (RSK).
- **Primary source:** Skatturinn Form RSK 5.02, edition 12-3-2021 ("Notification
  to tax authorities, registration in the employer's registry and/or value
  added tax registry"), the English-language PDF downloaded directly from
  `https://www.skatturinn.is/media/rsk05/rsk_0502.en.pdf`, linked from the
  official public forms index <https://www.skatturinn.is/english/forms/>. A
  genuine, official, fillable AcroForm PDF (2 pages), retrieved with a direct
  `curl` fetch (HTTP 200, no block, using a browser `User-Agent`). The PDF's
  own file-modification history (Aug 2023, Sep 2024 timestamps found via the
  scouting pass) shows this edition still actively served, not superseded by
  a newer numbered revision.
- **Field extraction method:** `pdfjs-dist`'s `getFieldObjects()` plus
  page-level `getAnnotations()`/`getTextContent()` (AcroForm field names,
  types, PDF-level `Required` flag via `fieldFlags & 2`, and the full
  position-tagged text layer) — **101 AcroForm fields** across 2 pages;
  programmatically checked all 101 annotations' `fieldFlags`: none set the
  PDF's own Required bit, the same "form's own prose, not the PDF's Required
  bit, is the requiredness signal" pattern already documented for several
  sibling schemas in this registry.
- **Visual re-verification:** unlike Sweden's Migrationsverket/Transportstyrelsen
  forms (whose AcroForm field names are self-documenting English strings),
  RSK 5.02's field names are short Icelandic abbreviations (e.g. `c_cbx_9`,
  `d_teg_starfs_cbx_3`) that do not encode their own label. Coordinate-only
  nearest-label heuristics were tried first but left real ambiguity in two
  checkbox clusters, so the PDF was additionally rendered with a real,
  full-build headless Chromium (Playwright, the `chrome-linux64` build under
  `/paperclip/.cache/ms-playwright`, with `LD_LIBRARY_PATH` pointed at
  `/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu` — the lighter
  `chromium_headless_shell` build has no PDF-viewer plugin and cannot render
  a PDF) and visually re-inspected page-by-page (both the full-page render
  and a scrolled page-2 render) to confirm every checkbox grouping before
  finalizing the field-to-label mapping. This resolved the two ambiguous
  clusters: confirmed 'Form of operation' (private operation / legal entity /
  bankrupt estate) is a single boxed choice, and confirmed the four
  Employer's-Registry special-category checkboxes in §D (resident abroad,
  foreign temporary employment agency, construction-for-own-use salary
  payments, domestic-care salary payments) are visually grouped in one
  orange band but are four independent declarations, not a single choice.
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Header, 'Form of operation' | `operationForm` |
| §A (p.1): VAT registration / registration for employers dates | `vatNewRegistrationFromDate`, `vatAlterationFromDate`, `vatTemporaryFromUntil`, `vatBusinessDormantFromDate`, `employerNewRegistrationFromDate`, `employerAlterationFromDate`, `employerTemporaryFromUntil`, `employerChangeDueToUnemploymentBenefitsDate` |
| p.1, single-client/RSK 10.31 note | `workingForSingleOrFewClients` |
| §B (p.1): operator/employer identity and contact | `operatorName`, `operatorIdNumber`, `operatorAddress`, `operatorPostcode`, `operatorTelephone`, `operatorEmail`, `operatorCellphone`, `operatorEmail2`, `operatorCellphone2`, `alternateBusinessNames`, `alternateNameIdNumber`, `agentRepresentingForeignEntityName`, `agentRepresentingForeignEntityIdNumber`, `bankruptEstateExecutorName` |
| §C (p.1): VAT-taxable activity, base of operations, estimated income, income-registration method | `vatTaxableGoodsOrServicesCategories`, `vatExemptBusinessOperations`, `baseOfOperationsAddress`, `baseOfOperationsMunicipality`, `estimatedFirstVatTaxableTurnoverDate`, `estimatedVatTaxableIncomeFirst12MonthsIsk`, `estimatedDevelopmentCostsFirst12MonthsIsk`, `registersIncomeViaCashRegister`, `registersIncomeViaProductDeposit`, `registersIncomeViaPrenumberedInvoices`, `registersIncomeViaElectronicInvoices`, `registersIncomeViaPrenumberedGiroSlip`, `registersIncomeViaOtherMethod`, `registersIncomeOtherMethodDescription` |
| §C (p.1), 'Use only in case of takeover of business operations' | `activityTakenOverWhollyOrPart`, `takeoverDate`, `takeoverEnterpriseName`, `takeoverEnterpriseIdNumber`, `takeoverInventoryIncluded`, `takeoverInventoryValueIsk`, `takeoverMachineryOrAssetsIncluded`, `takeoverAssetsValueExcludingInventoryIsk`, `takeoverRealEstateIncluded`, `takeoverRealEstateProperties`, `takeoverAdjustmentObligationOvertaken` |
| §D (p.2): class of activity, special employer categories, reference group, position | `classOfActivity`, `employerResidentAbroadOrEmbassy`, `foreignTemporaryEmploymentAgency`, `salaryPaymentsConstructionRealEstateOwnUse`, `salaryPaymentsDomesticCare`, `classOfActivityReferenceGroup`, `classOfActivityReferenceGroupOtherDescription`, `position`, `positionOtherDescription` |
| §E (p.2): legal entity wage payments and shareholders | `legalEntityFirstPaymentDate`, `legalEntityAverageMonthlyWagePaymentsIsk`, `shareholder1NameAndId`, `shareholder1OwnershipPercent`, `shareholder2NameAndId`, `shareholder2OwnershipPercent`, `legalEntityRemunerationReferenceCategory`, `legalEntityEstimatedAnnualRemunerationIsk`, `legalEntityEstimatedMonthlyRemunerationIsk`, `legalEntityRemunerationFromMonth` |
| §F (p.2): independent business operations, estimated remuneration | `independentOperatorReferenceCategory`, `independentOperatorEstimatedAnnualRemunerationIsk`, `independentOperatorEstimatedMonthlyRemunerationIsk`, `independentOperatorRemunerationFromMonth`, `spouseEstimatedAnnualRemunerationIsk`, `spouseEstimatedMonthlyRemunerationIsk`, `spouseRemunerationFromMonth`, `thirdPartyFirstWagePaymentDate`, `thirdPartyEstimatedMonthlyWagePaymentsIsk`, `noWagePaymentsOnlyCalculatedRemuneration`, `calculatedRemunerationSupportingDocumentation` |
| §G (p.2): employer resident abroad or embassy | `foreignEmployerName`, `foreignEmployerIdNumber`, `foreignEmployerAddressAndPostcode`, `foreignEmployerEmail` |
| p.2: comments, date | `comments`, `signatureDate` |
| p.1 takeover note, p.2 §F note, p.2 footer attestation/signature | `documents[].adjustmentObligationTransferDocumentation`, `documents[].calculatedRemunerationDocumentation`, `documents[].applicantSignature` |

## What is NOT independently confirmed / out of scope

- **No PDF-level `Required` flags.** As noted above, none of the 101
  AcroForm fields set the PDF's own Required bit; `required`/`requiredWhen`
  assignments in this document are derived from the form's own structure and
  standard registration necessity, not a confirmed submission-time gate.
- **ISAT-number.** The form's own §C prints a box explicitly labelled
  "ISAT-number (filled in by RSK)" — an agency-assigned output, not applicant
  input — and is therefore excluded from `fields[]` entirely.
- **Two identically-labelled contact rows in §B.** The source prints two
  consecutive, unqualified "E-mail address"/"Cellphone number" row pairs with
  no distinguishing text. Modelled as a primary and secondary contact entry
  (`operatorEmail`/`operatorCellphone` and `operatorEmail2`/`operatorCellphone2`)
  rather than assuming a distinction (e.g. a bookkeeper's contact vs. the
  operator's own) the source itself does not state.
- **Alternate-name identification number.** The "Icelandic identification
  number" box paired with "Does the company operate under alternate
  name/names?" is modelled as `alternateNameIdNumber` — the ID number
  associated with that alternate name, plausible under Icelandic
  business-name registration practice — rather than omitted, since the
  source's own table layout consistently pairs every named party with an
  adjacent ID-number column. Not independently confirmed against a second
  source; a future reviewer with access to the Icelandic-language edition or
  Skatturinn's own field-help text could confirm or correct this reading.
- **Two independent, non-exclusive checkbox clusters, kept as separate
  booleans rather than collapsed to an enum** (see the GOV-2070 review-fix
  precedent of a true mutually-exclusive radio group having been mismodeled
  as unconstrained booleans, which this document deliberately avoids
  repeating in the other direction): the four §D special-employer-category
  checkboxes (`employerResidentAbroadOrEmbassy`, `foreignTemporaryEmploymentAgency`,
  `salaryPaymentsConstructionRealEstateOwnUse`, `salaryPaymentsDomesticCare`)
  and the six §C income-registration-method checkboxes
  (`registersIncomeViaCashRegister` through `registersIncomeViaOtherMethod`).
  Both clusters are visually grouped under one heading but describe
  circumstances that can plausibly co-occur (e.g. a business could use both
  a cash register and pre-numbered invoices at once), unlike the truly
  single-choice 'Form of operation', 'Class of activity, reference group',
  and 'Position' groups, which were collapsed into enums
  (`operationForm`, `classOfActivityReferenceGroup`, `position`).
  Not independently confirmed against Skatturinn's own field-help text
  (none was found published alongside the form); if a future reviewer finds
  the source intends at-most-one for either cluster, `exclusivityGroups`
  (GSP-0013 §5) would be the more precise construct than the current
  independent-booleans modelling.
- **Signature line.** Not a fillable AcroForm field (a printed line only);
  modelled instead as an `attestation`-category `documents[]` entry
  (`applicantSignature`), the same pattern
  `se/transportstyrelsen/vehicle-registration-new-vehicle` uses for its own
  signature block.
- **Companion form RSK 5.04 ("End of business activity").** A distinct,
  separately numbered form for deregistration, not modelled here; a plausible
  fast-follow candidate for a future cycle.
- **Address decomposition.** All postal addresses are modelled as single
  free-text strings, matching the form's own single free-text address box
  per person/entity, not a decomposed street/number/postal-code/city object.
- **Icelandic kennitala format.** ID-number fields validate against the
  general kennitala pattern (`^[0-9]{6}-?[0-9]{4}$`, 10 digits optionally
  hyphenated after the 6th) rather than a jurisdiction-specific checksum,
  which the form itself does not publish.
- **Live e-service parity.** Not screened this cycle — this document is
  sourced entirely from the paper/PDF form, not a live wizard walkthrough
  (Skatturinn's site was not checked for an e-service equivalent of this
  specific form).

## Scope and jurisdiction notes

- Opens **Iceland as GovSchema's 30th jurisdiction**, with one vertical
  (Business Formation) modelled; Iceland's other five verticals (Passport,
  DMV, Taxes, Visa, National ID) are open, unscreened backlog candidates for
  a future cycle.
- Models the full form (all 101 AcroForm widgets, collapsed to 85 schema
  fields after gathering three genuinely single-choice checkbox groups into
  enums — see above), rather than scoping to one operator type; `operationForm`
  and `requiredWhen` gate the private-operator/legal-entity/bankrupt-estate
  branches so a consumer can drive a single conditional flow across all
  three filer types this one form serves.
- Conditional flow is expressed with `requiredWhen` throughout (GSP-0013); no
  branch in this document's scope disqualifies the applicant, so no
  `transitions`/`exitReason` construct is used.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms the exact requiredness
Skatturinn enforces when RSK 5.02 is filed, resolves the two disclosed
scope/interpretation decisions above (the duplicate contact-row pairing and
the alternate-name ID-number column) against the Icelandic-language edition
or Skatturinn's own field-help text, and checks whether a live e-service
equivalent exposes any field this paper-form sourcing does not — recording
the outcome here, shipping a new schema version if discrepancies are found
(VERSIONING.md §3, immutability).

## Test run

A mock `conformance/is/skatturinn/business-employer-vat-registration/1.0.0/application-packet.json`
scenario (Björg Ólafsdóttir, a private-operator graphic-design consultancy in
Reykjavík registering for both new VAT and new employer registration, not a
business takeover, registering income via pre-numbered and electronic
invoices) was checked with a from-scratch script re-implementing this
document's own `required`/`requiredWhen` condition grammar (GSP-0013).
Result: **0 errors** across all 85 fields (46 collected, 39 correctly marked
not-applicable). Five mutation tests confirmed the condition grammar fires
correctly: (1) setting `operationForm` to `bankrupt_estate` without adding
`bankruptEstateExecutorName` correctly raised 1 missing-required-field error;
(2) setting `registersIncomeViaOtherMethod` to `true` without adding
`registersIncomeOtherMethodDescription` correctly raised 1 error; (3) setting
`activityTakenOverWhollyOrPart` to `true` without adding the three takeover
detail fields correctly raised 3 errors; (4) setting
`classOfActivityReferenceGroup` to `other` without adding
`classOfActivityReferenceGroupOtherDescription` correctly raised 1 error;
(5) setting `employerResidentAbroadOrEmbassy` to `true` without adding
`foreignEmployerName` correctly raised 1 error. The schema was also validated
against the GovSchema v0.3 meta-schema with `tools/validate.mjs` and
`tools/validate-ajv.mjs` (both pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
