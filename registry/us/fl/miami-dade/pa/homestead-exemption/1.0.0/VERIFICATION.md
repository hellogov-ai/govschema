# Verification record — `us/fl/miami-dade/pa/homestead-exemption` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived directly from the Florida Department of Revenue's own
state-prescribed DR-501 application form (the exact document the Miami-Dade
County Property Appraiser hosts and requires), plus the Property Appraiser's
own published eligibility/proof-of-residency summary. It remains `draft`, not
`verified` — see the honesty flags below for the specific ambiguities and
scope narrowings that keep it from `verified`.

This is the **first county/municipal-level (`jurisdiction.locality`) document
published in the registry**, piloting [GSP-0021](../../../../../../../spec/proposals/0021-municipal-county-jurisdictions.md)
and the `spec/v0.3` normative text at `SPEC.md` §5.2/§5.4 (which uses this
exact `us/fl/miami-dade/<authority>/homestead-exemption` shape as its worked
example).

## Sources examined

- **Document `(id, version)`:** `us/fl/miami-dade/pa/homestead-exemption` /
  `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Jurisdiction:** `country: US`, `subdivision: US-FL`,
  `locality: { name: "Miami-Dade County", slug: "miami-dade" }`,
  `level: municipal`.
- **Authority:** Property Appraiser of Miami-Dade County (the office's own
  site uses "PA" throughout its URL structure — `miamidadepa.gov/pa/forms.page`,
  `miamidadepa.gov/pa/exemptions.asp`, `miamidadepa.gov/pa/file-online.asp` —
  so `pa` was chosen as the authority slug rather than an invented
  abbreviation. The county-hosted DR-501 letterhead itself reads "PROPERTY
  APPRAISER OF MIAMI-DADE COUNTY").
- **"Homestead Exemption and Portability Online Filing" page:**
  <https://www.miamidadepa.gov/pa/file-online.asp> — fetched live, 2026-07-06
  (via WebFetch). Supplied the list of exemptions filed through the same
  online portal (Homestead, Senior, Portability, Widow/Widower, Totally and
  Permanently Disabled Veteran, Surviving Spouse of a T&P Disabled Veteran,
  Veteran's Disability), the eligibility summary (legal/equitable title and
  permanent residence as of January 1, US citizenship or permanent-resident
  status), the "Acceptable Proof of Residency" list, the March 1 statutory
  deadline, and the mail/email/walk-in/online submission channels.
- **"Exemptions & Benefits" page:**
  <https://www.miamidadepa.gov/pa/exemptions.asp> — fetched live, 2026-07-06
  (via WebFetch). Confirmed the homestead/senior/widow(er)/disability/
  deployed-military benefit summary and the Save Our Homes portability
  description; this page itself is a marketing/summary page and defers
  detailed eligibility rules to a "Property Tax Exemption Guidelines" download
  and the DR-501 form, consistent with using the DR-501 PDF as the
  authoritative field source below.
- **DR-501, "Original Application for Homestead and Related Tax Exemptions"
  (R. 01/26, Rule 12D-16.002, F.A.C.), Florida Department of Revenue's own
  copy:** <https://floridarevenue.com/property/documents/dr501.pdf> — fetched
  live (HTTP 200) and read directly as a PDF (all 5 pages: the 3-page fillable
  application, the penalties/statute page, and the "Added Benefits" reference
  table).
- **DR-501, Miami-Dade County Property Appraiser's own re-hosted copy:**
  <https://www.miamidadepa.gov/resources-pa/library/forms/dr501.pdf> — fetched
  live (HTTP 200), read directly as a PDF. Confirmed the underlying
  application content (pages 1-5, "DR-501 R. 01/26") is **identical** to the
  state's generic copy, prefixed with the county's own one-page "Extenuating
  Circumstances for Late-Filed Exemption Application" cover form
  (`PAMDC-ECv312026`, signed by "Tomas Regalado, Property Appraiser," 111 NW
  1st Street, Suite 710, Miami, FL 33128, phone 305-375-4712) — this
  confirms Miami-Dade files the exact state-prescribed DR-501, with its own
  late-filing petition process layered on top (out of scope for this
  v1.0.0 — see honesty flags).
- **Field extraction method:** direct PDF read (native multimodal rendering)
  of both PDFs, not a summarized fetch, per
  [`gov-form-pdf-extraction`](../../../../../../docs/agent-consumption.md)
  discipline — recovered the exact printed wording of every labelled blank,
  checkbox, and reference-table row.
- **Retrieved / reviewed:** 2026-07-06.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / `documents[]` entry |
|---|---|
| "County ___ Tax Year ___" / "I am applying for homestead exemption: New or Change" | `taxYear`, `applicationAction` |
| "Homestead address" / "Mailing address, if different" | `homesteadAddressLine1/City/State/PostalCode`, `mailingAddressLine1/City/State/PostalCode` |
| "Parcel identification number or legal description" | `parcelIdentificationNumberOrLegalDescription` |
| "Type of deed ___ Date of deed" / "Recorded: Book Page Date or Instrument number" | `deedType`, `deedDate`, `deedRecordedBook/Page/Date`, `deedInstrumentNumber` |
| "Is the property in a trust? Yes No Name of trust on the property deed" | `isPropertyInTrust`, `trustName` |
| Applicant/Co-applicant table: "Name", "Phone number", "*Social Security #", "Date of birth" | `applicantFullName/PhoneNumber/SocialSecurityNumber/DateOfBirth`, `coApplicant...` equivalents |
| "*Disclosure of your social security number is mandatory... section 196.011(1)(b)" | `applicantSocialSecurityNumber` description |
| "Are you a US Citizen? Yes No" / "If not a US Citizen, provide Immigration # or Resident Alien Card #" | `applicant/coApplicantIsUSCitizen`, `.../ImmigrationOrAlienCardType`, `.../ImmigrationOrAlienCardNumber` |
| "% of ownership" / "Date homestead was established" | `applicant/coApplicantOwnershipPercentage`, `.../HomesteadEstablishedDate` |
| "Name and address of any owners not residing on the property" | `ownersNotResidingOnPropertyNameAndAddress` |
| "Marital status of Applicant/Co-applicant: Single Married Divorced Widowed Other, Explain" | `applicant/coApplicantMaritalStatus`, `.../MaritalStatusOtherExplanation` |
| "Co-applicant relationship to Applicant (Example: Spouse, parent, sibling)" | `coApplicantRelationshipToApplicant` |
| "Do you currently claim residency or homestead in another county or state? Applicant? Co-applicant?" | `applicant/coApplicantClaimsResidencyOrHomesteadElsewhere` |
| "Address of current or previous homestead" / "Date current or previous homestead was established and ended, if applicable" | `currentOrPreviousHomesteadAddress/EstablishedDate/EndedDate` |
| "Please provide as much information as possible. Your county property appraiser will make the final determination." + Proof of Residence table rows | `proofPreviousResidencyOutsideFloridaTerminationDate`, `proofFloridaDriverLicenseOrIdNumber`, `proofFloridaVehicleTagNumber`, `proofFloridaVoterRegistrationNumber`, `proofDeclarationOfDomicileRecordedDate`, `proofCurrentEmployer`, `proofAddressOnLastIRSReturn`, `proofSchoolLocationOfDependentChildren`, `proofBankStatementSentToHomesteadAddress`, `proofUtilityPaymentAtHomesteadAddress`; `documents[].proofOfPermanentResidencyDocument` |
| Page 2 checkbox list, "In addition to homestead exemption, I am applying for the following benefits" (all 12 items) | `requestingSeniorExemptionLimitedIncome`, `requestingSeniorExemptionLimitedIncome25YearResidency`, `requestingWidowedExemption`, `requestingBlindExemption`, `requestingTotallyPermanentlyDisabledExemption`, `requestingQuadriplegicExemption`, `requestingLimitedIncomeDisabilityExemption`, `requestingFirstResponderDisabledExemption`, `requestingFirstResponderSurvivingSpouseExemption`, `requestingDisabledVeteranAge65Discount`, `requestingVeteranDisabled10PercentExemption`, `requestingDisabledVeteranWheelchairExemption`, `requestingServiceConnectedDisabledVeteranExemption`, `requestingSurvivingSpouseOfVeteranKilledOnDutyExemption` |
| "If you received the same exemption on another parcel in the previous year, enter the previous parcel information... Parcel number ___ County ___" (both veteran/surviving-spouse rows) | `sameExemptionPreviousParcelNumber`, `sameExemptionPreviousParcelCounty` |
| "Other, specify: ___" | `otherBenefitRequestedExplanation` |
| Page 5 "Added Benefits" reference table (Amount/Qualifications/Forms and Documents/Statute columns, all rows) | `documents[].deathCertificateOfSpouseDocument`, `.blindDisabilityCertificationDocument`, `.totallyPermanentlyDisabledCertificationDocument`, `.quadriplegicCertificationDocument`, `.limitedIncomeDisabilityCertificationDocument`, `.firstResponderDisabilityDocumentation`, `.firstResponderSurvivingSpouseLetterDocument`, `.disabledVeteranAge65DiscountDocument`, `.veteranDisabled10PercentProofDocument`, `.veteranWheelchairDisabilityProofDocument`, `.serviceConnectedVeteranDisabilityProofDocument`, `.survivingSpouseVeteranActiveDutyLetterDocument`, `.seniorExemptionIncomeDocument` |
| Page 3 — "I understand that under section 196.131(2), F.S., any person who knowingly and willfully gives false information... I certify all information on this form... true, correct, and in effect on January 1 of this year." (paired with "Signature, applicant") | `documents[].falseStatementAttestation` |
| Miami-Dade online-filing page's "Acceptable Proof of Residency" list | `documents[].proofOfPermanentResidencyDocument.acceptedTypes` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **The Property Appraiser's own online e-file portal is gated and not
  structurally modelled field-by-field.** `apps.miamidadepa.gov/PA.OnlineExemptions`
  requires an account/login (confirmed via search result: "PA Online
  Exemptions" resolves to an `Account/Login` page) and could not be read
  unauthenticated. Consistent with how prior gated-portal schemas in this
  registry handled the same situation (e.g.
  `us/fl/doh/birth-certificate-request`'s VitalChek fallback), this schema
  instead models the state-prescribed DR-501 paper form that both the online
  portal and the mail/walk-in channels are built on top of, per the
  Department of Revenue's own framing ("Application due to property appraiser
  by March 1... Complete pages 1 through 3"). The live portal's own field
  order, validation, and upload mechanics may differ in presentation from the
  paper form modelled here.
- **`pa` was chosen as the authority slug over the spec's own illustrative
  `tax-collector`.** `SPEC.md` §5.2 uses
  `us/fl/miami-dade/tax-collector/homestead-exemption` as an *illustrative id
  shape only, not the real authority slug* (its own comment says so). Research
  confirmed the Miami-Dade **Property Appraiser** (not the Tax Collector) is
  the office that actually administers homestead exemption applications —
  the Tax Collector's Office bills and collects the resulting tax, but the
  DR-501 application itself is "filed with the county property appraiser's
  office" and Miami-Dade's own site uses `pa` as its authority path segment
  throughout (`miamidadepa.gov/pa/...`). `pa` matches both the office's actual
  function and its own self-chosen URL abbreviation.
- **Proof-of-Residence table (DR-501 page 2) is modelled for the applicant
  only, not duplicated per co-applicant/spouse.** The printed table has
  separate "Applicant" and "Co-applicant/Spouse" columns for most proof-of-
  residence rows, but this v1.0.0 narrows scope to the applicant's own proof
  fields (`proofFloridaDriverLicenseOrIdNumber` etc.) to keep the field count
  tractable for a first county-level pilot; a future MINOR could add the
  parallel `coApplicantProof...` set. `proofSchoolLocationOfDependentChildren`
  is modelled as a single shared field regardless, since a dependent child's
  school does not logically differ per parent.
- **`currentOrPreviousHomesteadEstablishedDate`/`EndedDate` are not gated by
  `requiredWhen`.** The source prints these as "if applicable" even in the
  row that follows the "claim residency/homestead elsewhere" question, so
  they are modelled as always-optional rather than conditionally required —
  a deliberate, disclosed simplification, not an oversight.
- **`sameExemptionPreviousParcelNumber`/`County` are not gated by
  `requiredWhen`.** The source's own conditional ("If you received the same
  exemption on another parcel in the previous year...") depends on a fact
  (a prior-year exemption on a *different* parcel) this schema does not
  otherwise capture as a field, so tying `requiredWhen` to either veteran
  exemption boolean would over-trigger for the common case of a first-time
  claim. Modelled as optional and documented instead of forcing an incorrect
  gate.
- **The Property Appraiser's own gated online portal, the late-filed-
  application extenuating-circumstances petition, the Save Our Homes
  Portability transfer (DR-501T), and each footnoted exemption's own
  follow-on application (DR-501SC, DR-416/DR-416B, DR-501DV, DR-501A) are out
  of full structural scope for v1.0.0.** This schema models the DR-501
  checkbox declaring intent to claim each benefit and the supporting
  document/certification it triggers, but not the separate application's own
  fields — the same kind of narrowing the birth-certificate schema applied to
  the DH 1958 affidavit sub-flow. The Miami-Dade-specific "Extenuating
  Circumstances for Late-Filed Exemption Application" form
  (`PAMDC-ECv312026`), confirmed live on the county's own DR-501 PDF cover
  page, is a distinct late-filing petition process, not part of the on-time
  original-application flow modelled here.
- **`homesteadAddressState` is modelled as a free `^[A-Z]{2}$` field, not a
  fixed `"FL"` literal**, even though every homestead-eligible property is
  necessarily in Florida — the source prints an open address block, not a
  pre-filled state value.

## Conformance

See `conformance/us/fl/miami-dade/pa/homestead-exemption/1.0.0/` for a mock,
non-submitted application packet exercising a straightforward single-
applicant, no-co-applicant, homestead-only filing.
