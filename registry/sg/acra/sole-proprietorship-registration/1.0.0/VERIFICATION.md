# Verification record — `sg/acra/sole-proprietorship-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

## Sources examined

- **Document `(id, version)`:** `sg/acra/sole-proprietorship-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Accounting and Corporate Regulatory Authority ("ACRA").
- **Primary sources:**
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/sole-proprietorship-or-partnership/>
    — "Registering a sole proprietorship or partnership" (eligibility, required
    documents/information, ownership requirements, fees, registration periods,
    processing timeline).
  - <https://www.acra.gov.sg/how-to-guides/starting-sole-proprietorships/who-can-set-up-a-sole-proprietorship-or-partnership-in-singapore>
    — "Who can set up a sole proprietorship or partnership in Singapore"
    (Singpass/CSP distinction between local and foreign owners).
  - <https://www.acra.gov.sg/how-to-guides/foreigners-registering-a-business-in-singapore/requirements-for-local-residency>
    — "Requirements for local residency" (local-manager appointment for
    foreign owners residing overseas).
  - <https://www.acra.gov.sg/register/business/choosing-reserving-a-business-name/reserving-bizfile/>
    — "Reserving a business name via Bizfile" (name application fields, SSIC
    codes, fee, 120-day validity).
  - <https://www.acra.gov.sg/resources/guides-forms/apply-for-new-business-entity-name/>
    — "Applying for a new business entity name" (name/SSIC/entity-type form
    fields, referral authorities).
  - <https://www.acra.gov.sg/docs/default-source/default-document-library/about-bizfile/bizfile-guide/bizfile-guide_registering-a-new-business-entity_sp_web-1.pdf?sfvrsn=e07204e0_1>
    — "Registering a New Business Entity — Sole Proprietorship/Partnership"
    (the official Bizfile step-by-step guide PDF: Business Details, Position
    Holders, Registration Confirmation & Payment field sections).
- **Field extraction method:** unlike the pdfjs-dist AcroForm/XFA extraction
  used for PDF-form-based schemas in this registry (e.g.
  `ca/on/registration/business-incorporation`,
  `ca/cra/individual-income-tax-and-benefit-return-t1`), Bizfile has no
  downloadable fillable form — it is a Singpass-authenticated online
  eService. The guide PDF above was retrieved and read via automated
  fetch-and-summarize tooling rather than raw text/field extraction, which is
  a **weaker sourcing method**: the field names and section groupings below
  reflect that tool's paraphrase of the PDF's content, not a direct
  character-for-character transcription. This is recorded honestly rather
  than presented as equivalent in rigor to a pdfjs-dist extraction. See "Path
  to a `verified` claim" below for how to strengthen this.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Who can set up a sole proprietorship or partnership in Singapore" / "Requirements for local residency" | `ownerHasSingpassAccess`, `ownerIsForeignResidentOverseas` |
| "Reserving a business name via Bizfile" / "Applying for a new business entity name" | `proposedBusinessName`, `primarySsicCode`, `secondarySsicCode`, `businessActivityCustomDescription`, `nameApplicationEmail` |
| Bizfile Guide, Step 2, Business Details | `nameRegistrationEserviceNumber`, `proposedCommencementDate`, `businessEmailAddress` |
| "Registering a sole proprietorship or partnership" — business address requirements | `businessAddressLine`, `businessAddressUnitNumber`, `businessAddressPostalCode` |
| Bizfile Guide, Step 3, Position Holders | `ownerNricOrFin`, `ownerFullName`, `ownerDateOfBirth`, `ownerResidentialAddressLine`, `ownerResidentialAddressUnitNumber`, `ownerResidentialAddressPostalCode`, `ownerMobileNumber`, `ownerContactEmail` |
| "Requirements for local residency" | `ownerResidencyStatus` (scoped enum) |
| "Registering a sole proprietorship or partnership" — consent requirement | `ownersConsentConfirmed`, `documents[].ownerConsentAttestation` |
| Bizfile Guide, Step 4, Registration Confirmation & Payment | `registrationPeriod`, `specialUenRequested`, `paymentMethod` |
| "Reserving a business name via Bizfile" — 120-day validity | `nameRegistrationEserviceNumber` description |

Fees ($15 name application; $100/1-year or $160/3-year registration) were
confirmed across multiple independent source pages but, consistent with every
other schema in this registry, are **not** modelled as authoritative
structured data — only referenced in field descriptions for context.

## What is NOT independently confirmed / out of scope

- **Exact NRIC/FIN and postal code validation patterns.** The reviewed
  sources state that an NRIC-or-FIN and a postal code are collected, but none
  of them publish Bizfile's own field-level format validation (character
  count, regex). `ownerNricOrFin` is modelled as free text bounded only by a
  generous `maxLength`, deliberately **not** asserting Singapore's
  commonly-cited public NRIC/FIN letter-digit-letter shape as a `pattern`,
  since that shape was not confirmed against Bizfile's own form — the same
  discipline `ca/on/registration/business-incorporation` applied to
  `numberNameLegalElement`. `businessAddressPostalCode` /
  `ownerResidentialAddressPostalCode` **do** carry a `^[0-9]{6}$` pattern,
  since Singapore's 6-digit postal code format is a well-established public
  fact independent of Bizfile (Singapore Post's national addressing
  standard), not a Bizfile-specific claim.
- **Partnerships.** Bizfile's shared registration flow also covers
  partnerships (two or more owners) and professional partnerships; this
  document scopes to the single-owner sole-proprietorship path only,
  consistent with the single-entity/single-owner scoping convention used
  throughout this registry (e.g. `ca/on/registration/business-incorporation`'s
  single director/incorporator, `ie/cro/company-incorporation`'s single
  director/secretary/subscriber). The "Professional Partnership Status" field
  noted in the Bizfile guide's Business Details section applies only to the
  partnership path and is out of scope here.
- **Foreign owners.** Both the "without Singpass" and "residing overseas"
  foreign-owner paths are modelled only as eligibility gates that exit the
  flow (`ownerHasSingpassAccess`, `ownerIsForeignResidentOverseas`), not
  followed through to the corporate-service-provider engagement or
  local-manager appointment process — genuinely different, CSP-mediated
  flows outside this document's scope.
- **Corporate position holders, nominee/trustee arrangements.** The Bizfile
  guide's Position Holders section also supports a corporate entity as
  position holder and nominee/beneficiary sub-fields (class of children,
  corporate beneficiary, etc.); out of scope, matching the individual-owner
  scoping above.
- **Referral-authority name review.** Some proposed names are referred to a
  referral authority for approval (e.g. names implying a professional
  qualification), taking up to 15 working days; not modelled as a distinct
  gate or field, only mentioned in `proposedBusinessName`'s description.
- **Home office (HDB/URA) approval.** `businessAddressLine`'s description
  notes that a home address requires prior HDB/URA approval to be used as a
  business address, but this is not modelled as a separate boolean gate —
  unlike the licence-renewal-style eligibility gates elsewhere in this
  document, ACRA's own pages describe this as a prerequisite the applicant
  arranges separately with HDB/URA, not a Bizfile registration-screen
  question.
- **CPF Board eligibility criteria for the 3-year registration period.**
  `registrationPeriod`'s `three_year` option is conditional on "CPF Board
  criteria" per the source, but the criteria themselves were not detailed in
  any source reviewed for this document.

## Scope and jurisdiction notes

- Conditional flow-exit is expressed with `transitions`/`exitReason`
  (GSP-0013), following the `ca/on/mto/drivers-licence-renewal` /
  `gb/dvla/driving-licence-first-provisional` eligibility-gate precedent —
  the first time this registry applies that pattern to a Business Formation
  schema rather than a DMV one.
  `ownerHasSingpassAccess`/`ownerIsForeignResidentOverseas` are both marked
  `fieldRole: eligibility` and genuinely exit the flow, unlike
  `ca/on/registration/business-incorporation`'s
  `directorIsResidentCanadian`, which is informational-only.
- This document models Bizfile's two linked eServices — "Apply for New
  Business Entity Name" and "Register a New Business Entity" — as two
  sequential steps of one flow (`business_name_reservation` then
  `business_details`/`owner`/`declaration_and_payment`), per the open
  question flagged in the original `discovery/catalog.json` candidate note
  ("likely two linked processes or a two-step flow within one document;
  confirm at authoring time"). This differs from
  `ca/on/registration/business-incorporation`'s treatment of its own
  name-reservation prerequisite (the NUANS Report), which is issued by a
  third-party NUANS-licensed search house external to the Ontario Business
  Registry and is therefore only referenced as an input
  (`nuansReportReferenceNumber`/`nuansReportDate`), not modelled as a step of
  that document — the difference reflects that Bizfile's name reservation is
  ACRA's own first-party eService, not a third-party process.
- This is the **fifth** company-formation jurisdiction in the registry, after
  `gb/companies-house/company-incorporation-in01`,
  `us/ca/sos/business-entity-llc-formation`, `ie/cro/company-incorporation`,
  and `ca/on/registration/business-incorporation` — and the first
  **sole-proprietorship** (rather than company/LLC-incorporation) form of
  business formation modelled in this registry. It closes the
  `discovery/catalog.json` Business Formation vertical's last open candidate.
- Consistent with `gb/dvla/driving-licence-first-provisional` and
  `ca/on/mto/drivers-licence-renewal` (both prose-guidance-sourced, not
  form-PDF-sourced), this document's addresses are modelled as flat
  `addressLine`/`unitNumber`/`postalCode` string triples rather than a fully
  decomposed address object, since no source reviewed exposes Bizfile's own
  screen-level address field breakdown to decompose further.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with Singpass access drives the
live Bizfile "Apply for New Business Entity Name" and "Register a New
Business Entity" eServices with a mock (test) sole-proprietorship
application, confirms the exact screen-by-screen field list, the
`ownerNricOrFin` and postal code validation patterns, and the CPF Board
3-year-registration criteria noted above, and records the outcome here —
shipping a new schema version if discrepancies are found (VERSIONING.md §3,
immutability). Independently re-deriving the Bizfile guide PDF's field text
via `pdfjs-dist` (rather than relying on the automated-fetch summary used for
this version) would also strengthen this record even before a live-eService
walkthrough is possible, per the `gov-form-pdf-extraction` lesson that a
prior version's stated extraction method should be independently
re-confirmed, not assumed reproducible.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
