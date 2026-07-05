# Verification record — `za/cipc/private-company-incorporation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this schema and why now (GOV-1181)

GOV-1181 ("GovSchema Standard Research") is the same recurring research-cycle
issue as GOV-1136/GOV-1157/GOV-1160/GOV-1174. GOV-1174's own closing note
records that South Africa was opened as the registry's 13th jurisdiction with
exactly one schema published — `za/dha/passport-application-first-adult` —
and that every other ZA vertical (DMV, Business Formation, Visa, Taxes,
National ID) remained unopened for "a future cycle". This document is that
cycle: it opens **Business Formation** for South Africa, following the same
true-limited-liability-company-formation pattern the GOV-1136 cycle
established for DE/FR/NL/SG (each closing the gap between a mere sole-trader
registration and a genuine separate-legal-personality company).

A repeat catalog audit of `discovery/catalog.json`'s `candidates[]` (per the
lesson recorded from the GOV-1174 cycle) found the same two dead ends as
before — `ca/on/mto/vehicle-permit-renewal` (blocked on a live plate/permit
eligibility lookup) and `eu/etias` (still pre-launch, per GOV-276) — and no
other open candidates within the six focus verticals. With the standing
backlog dry and South Africa freshly opened but nearly empty, the productive
move (per the memory recorded from GOV-1174) is to expand the new
jurisdiction rather than re-litigate known dead ends.

## Sources examined

- **Document `(id, version)`:** `za/cipc/private-company-incorporation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Companies and Intellectual Property Commission ("CIPC"),
  Republic of South Africa.
- **Primary sources** (all fetched directly from `cipc.co.za`, each a genuine
  text-layer PDF, not a scan — read and transcribed in full, including every
  sidebar instruction, not just the fillable-field labels):
  - <https://www.cipc.co.za/wp-content/uploads/Forms/Companies/CoR-14_1.pdf>
    — Form CoR14.1, "Notice of Incorporation": all 7 numbered paragraphs, the
    incorporator "From:" box, the declaration/signature block, and the full
    sidebar (fee schedule, annexure conditions, "form is issued in terms of
    section 13 ... and Regulation 14").
  - <https://www.cipc.co.za/wp-content/uploads/Forms/Companies/Cor14_1A.pdf>
    — Form CoR14.1A, Annexure A, "Initial Directors of the Company": the full
    per-director field list and the sidebar's minimum-director-count rules
    per company type.
  - <https://www.cipc.co.za/wp-content/uploads/Forms/Companies/CoR9_1.pdf>
    — Form CoR9.1, "Application to Reserve a Name": the up-to-4-ordered-names
    structure and the four name-conflict disclosure questions (out of scope
    here, see below).
  - <https://www.cipc.co.za/wp-content/uploads/2023/10/CoR15_1A-v1_3.pdf>
    — Form CoR15.1A, "Memorandum of Incorporation — Short Standard Form for
    Private Companies" (all 5 pages): the cover-sheet blanks (director count,
    authorised share ceiling) and the full boilerplate Articles 1–4, read to
    confirm the standard form imposes no section 15(2)(b)/(c) ring-fencing
    provision (Article 1.2(1)) and no par value on shares (Article 2.1(1)).
  - <https://www.cipc.co.za/wp-content/uploads/2022/09/Email_addresses_for_applications_and_supporting_docs_requiredv2_0.pdf>
    — "Contact details, forms & supporting documents required when
    transacting with CIPC" (v2.0, April 2017; still hosted at the current
    `cipc.co.za` domain under a 2022 upload path, and cross-checked against a
    live `WebFetch` of <https://www.cipc.co.za/?page_id=3804>, "Company forms
    and fees", which lists the same form numbers and confirms no newer
    version supersedes it). The "Registration of companies" section, "Private
    company short form" row, supplied: the e-Services filing channel and
    e-mail address, the required supporting documents (certified ID of
    applicant, certified ID of all incorporators and directors, power of
    attorney if applicable), the citizen-vs-foreign-national ID-type note,
    and the fee schedule (R175, reduced by any name-reservation fee already
    paid: R125 if reserved electronically, R100 if reserved manually).
  - <https://www.cipc.co.za/?page_id=149> ("Enterprise registration") and a
    `WebSearch`-surfaced secondary summary of BizPortal's turnaround/fee
    claims — used only as corroborating context (the R175/immediate-turnaround
    figures cross-check against the primary CoR14.1 sidebar and the
    supporting-documents PDF), never as the sole source for any field.
- **Field extraction method:** each PDF above is a genuine AcroForm-style
  text-layer document (confirmed legible on direct read, unlike
  `za/dha/passport-application-first-adult`'s scanned BI-73), so field labels,
  paragraph numbers, and sidebar instructions were transcribed verbatim
  page-by-page rather than paraphrased from a summary.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| CoR14.1, "Customer Code" | `cipcCustomerCode` |
| CoR14.1 ¶6 — three name-determination options | `companyNameMethod`, `reservationOrRegistrationNumber`, `reservedNameHolder` |
| CoR14.1 ¶6 option 3 / CoR9.1 up-to-4-names list | `proposedCompanyNamePrimary`, `proposedCompanyNameAlternate2`/`3`/`4` |
| CoR14.1 ¶2 — incorporation effective date | `incorporationEffectiveDateOption`, `incorporationEffectiveSpecifiedDate` |
| CoR14.1 ¶3 — first financial year end | `firstFinancialYearEnd` |
| CoR14.1 ¶4 — registered office address | `registeredOfficeAddress` |
| CoR15.1A cover sheet — authorised share ceiling, no-par-value shares | `authorisedShareCount` |
| CoR14.1 "From:" box + CoR14.1A Annexure A — incorporator/director identity fields | `founderFullName`, `founderFormerName`, `founderIdentityOrRegistrationNumber`, `founderIsSouthAfricanCitizen`, `founderNationality`, `founderPassportNumber`, `founderDateOfAppointment`, `founderDesignation`, `founderResidentialAddress`, `founderBusinessAddress`, `founderPostalAddress`, `founderOccupation`, `founderIsSouthAfricanResident` |
| CoR14.1 declaration/signature block | `noticeOfIncorporationDeclaration` document (verbatim `statement`) |
| CoR14.1 ¶5 / CoR14.1A sidebar | `initialDirectorsAnnexureA` document |
| CoR14.1 sidebar / CoR15.1A sidebar | `memorandumOfIncorporationStandardForm` document |
| CoR14.1 ¶6 option 3 / CIPC form list ("Cor14.1 App B") | `alternativeNamesAnnexureB` document, gated by `companyNameMethod` |
| Supporting-documents PDF, "Private company short form" row | `founderIdentityDocument` document (citizen smart-ID vs. foreign passport) |
| CoR14.1 sidebar fee note + supporting-documents PDF fee schedule | `registrationFee` document (R175 base fee) |

## What is NOT independently confirmed / out of scope

- **Exact fee net of a paid name reservation.** The schema's `registrationFee`
  document states the R175 base fee (no prior reservation); the reduced
  R125/R100 figures when a name was already paid for at reservation are
  documented in the `sourceRef` text but not modelled as a second amount,
  since GSP-0014's `documents[]` shape supports only one fixed `amount` per
  entry, not a condition-dependent one. A future schema version could add a
  `crossFieldValidation`-adjacent convention for this if the pattern recurs
  elsewhere in the registry.
- **BizPortal's own screen-by-screen field list.** BizPortal
  (bizportal.gov.za) is CIPC's newer consumer-facing online front-end for
  this same "private company short form" filing, and a `WebFetch` of
  `cipc.co.za`'s own enterprise-registration page describes it as offering
  "immediate" processing upon payment — but this document's field list is
  sourced from the underlying prescribed statutory forms (CoR14.1/14.1A/
  15.1A) rather than a BizPortal screen walkthrough, since BizPortal itself
  was not independently browsed in this pass (unlike, e.g.,
  `nl/denhaag/voter-registration-abroad`'s Playwright-captured wizard). The
  prescribed forms are the authoritative field set regardless of which
  front-end channel generates them, per CIPC's own documentation ("Forms
  have been developed into an online application").
- **CoR9.1's four name-conflict disclosure questions.** Paragraph 1(a)–(d) of
  CoR9.1 (language, trade mark conflict, restricted-name category, similarity
  to an existing entity) governs the stand-alone name-reservation filing,
  which this document treats as already resolved by the time of
  incorporation (either a prior reservation is cited, or up to four names are
  proposed for the Commission itself to check at incorporation) — modelling
  those four yes/no disclosures would only be correct for the CoR9.1 filing
  itself, not this Notice of Incorporation.
- **Multiple incorporators, trust/juristic-person incorporators.** CoR14.1's
  "From:" box instructs "If there are multiple incorporators, each must be
  listed. Use a separate sheet" — out of scope by this document's
  single-founder scoping, consistent with every sibling schema in this
  quartet (`de/handelsregister/gmbh-formation-musterprotokoll`,
  `fr/inpi/sasu-or-eurl-formation`, `nl/kvk/bv-formation`,
  `sg/acra/private-limited-company-incorporation`).
- **Ring-fencing provisions (CoR14.1 ¶7 / Annexure C).** The standard MOI
  (CoR15.1A) fixes this to "no provision of the type contemplated in section
  15(2)(b) or (c)" (Article 1.2(1)) — always the first tick-box option for
  this document's scope, so no field is needed; Annexure C (the alternative)
  is genuinely inapplicable, not an unresearched gap.
- **Manual/paper lodgement and its certified-ID/power-of-attorney handling.**
  The supporting-documents PDF's "Private company short form" row describes
  both an e-Services electronic path (documents required) and Banking
  Channel/Self Service Terminal/Third Party Channel paths (fully automated,
  no documents submitted); this schema models the e-Services electronic path
  only, matching its single-founder self-filing scope.
- **Company secretary and auditor appointment.** Not required at
  incorporation for a private company under the Companies Act, 2008 (a
  post-incorporation compliance step, per `CoR44`'s separate listing in the
  supporting-documents PDF); out of scope, consistent with the equivalent
  scoping decision in `sg/acra/private-limited-company-incorporation`.
- **Customised/long-form MOI (CoR15.1B) and non-private company types.**
  CoR14.1 ¶1 also covers State Owned, Public, Personal Liability, and Non
  Profit companies, each requiring a different MOI form and (per the
  supporting-documents PDF) a materially higher R475 fee; out of scope by
  this document's private-company/standard-MOI scoping.
- **Exact South African ID number validation pattern.** As with other
  registry schemas modelling a national ID number without a confirmed
  check-digit algorithm published in the primary source reviewed,
  `founderIdentityOrRegistrationNumber` is bounded only by a generous
  `maxLength`, not a `pattern`, to avoid asserting an unconfirmed format
  rule.

## Scope and jurisdiction notes

- This is South Africa's **first** Business Formation schema, and the
  registry's **tenth** true-limited-liability-company-formation
  jurisdiction/entity pair, after `gb/companies-house/company-incorporation-in01`,
  `us/ca/sos/business-entity-llc-formation`, `ie/cro/company-incorporation`,
  `ca/on/registration/business-incorporation`,
  `de/handelsregister/gmbh-formation-musterprotokoll`,
  `fr/inpi/sasu-or-eurl-formation`, `au/asic/proprietary-company-registration`,
  `nl/kvk/bv-formation`, `in/mca/company-incorporation-spice-plus`, and
  `sg/acra/private-limited-company-incorporation`.
- Unlike the DE/FR/NL/SG quartet (each requiring a minimum or nominal paid-up
  capital contribution at formation), South Africa's Companies Act, 2008 sets
  **no minimum share capital** and issues no-par-value shares — the Notice of
  Incorporation and standard MOI require only an authorised-share-count
  ceiling, not a paid-up-capital figure. This is a genuine jurisdictional
  difference recorded here rather than a sourcing gap: no field for an
  initial capital contribution amount exists because the primary sources
  never require one at this stage.
- Addresses are modelled as flat strings (`registeredOfficeAddress`,
  `founderResidentialAddress`, etc.), matching every form's own free-text
  blank layout — none of the four primary forms decomposes an address into
  structured sub-fields (street/city/postal code), unlike, e.g.,
  `sg/acra/private-limited-company-incorporation`'s Bizfile-derived
  `addressLine`/`unitNumber`/`postalCode` triples.

## Test run

A mock `conformance/za/cipc/private-company-incorporation/1.0.0/application-packet.json`
scenario (Naledi Mokoena, a South African citizen incorporating a
single-founder private company by proposing two candidate names — "Karoo
Ridge Logistics" and "Sunbird Freight Solutions" — rather than citing a prior
name reservation, with incorporation to take effect on the registration
certificate's own date and 1,000 authorised no-par-value shares) was checked
with a from-scratch script (`/tmp/conformance-check.mjs`, re-implementing this
document's own `required`/`requiredWhen` `Condition` grammar per GSP-0013).
Result: **0 violations** across 26 fields (19 collected, 7 correctly
not-applicable). Mutation tests confirmed: (1) switching
`companyNameMethod` to `previously_reserved_or_registered_name` with no
reservation number given correctly flags `reservationOrRegistrationNumber`
and `reservedNameHolder` as missing, and correctly drops
`proposedCompanyNamePrimary`'s requiredness; (2) setting
`founderIsSouthAfricanCitizen` to `false` with no passport number given
correctly flags `founderPassportNumber` as missing; (3) setting
`incorporationEffectiveDateOption` to `specified_later_date` with no date
given correctly flags `incorporationEffectiveSpecifiedDate` as missing; (4)
the `alternativeNamesAnnexureB` document's `requiredWhen` correctly evaluates
to required in the baseline (propose-names) branch and not required in the
reserved-name branch. The schema was also validated against the GovSchema
v0.3 meta-schema with `tools/validate-ajv.mjs` (pass).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer should independently re-fetch
all five CIPC PDFs and the supporting-documents reference table, confirm no
newer form revision has been published (CoR15.1A carries a `v1_3` filename
suffix, suggesting prior revisions exist), and — ideally — walk the live
CIPC e-Services or BizPortal registration flow with a real (test) CIPC
customer account to confirm the online screen sequence matches the
prescribed paper form's field order, recording the outcome here per
VERSIONING.md §3 (immutability; a new version if discrepancies are found).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-05** (6
months).
