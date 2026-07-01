# Verification record — `ie/cro/company-incorporation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official
sources below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed
and recorded against the live CORE (Companies Registration Online Environment)
filing screens. It therefore remains `draft`, not `verified`.

## Why this schema and why now (GOV-409)

GOV-409 is a recurring "GovSchema Standard Research" brief scoped to five
verticals: DMV, Business Formation, Visa, Passport, Taxes. A catalog audit
(discovery/catalog.json: 82 candidates, 41 published across 8 jurisdictions
before this cycle) found Business Formation only published for GB
(`gb/companies-house/company-incorporation-in01`) and US-CA
(`us/ca/sos/business-entity-llc-formation`, plus the EIN identifier), leaving
two logged tier-2 candidates unauthored: `ie/cro/company-incorporation` and
`ca/on/registration/business-incorporation`. This continues the prior GOV-381
research cycle's own "Next" note, which flagged both as good targets. Ireland
was chosen over Ontario because CRO is a single national authority (like GB,
unlike the US or Canada's provincial/federal split noted in
`discovery/README.md`), it already has three published IE schemas to build
authority-coverage alongside (`ie/dfa/*` passports, `ie/dsp/pps-number-application`,
`ie/dttas/driving-licence-renewal`), and its Form A1 requirements are
well-documented across multiple independent public pages.

## Sources examined

- **Document `(id, version)`:** `ie/cro/company-incorporation` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Companies Registration Office (CRO), Ireland.
- **Primary source URLs** (all under `cro.ie`):
  - `/registration/company/required-steps/` — Form A1 and constitution overview,
    the Fé Phráinn vs. Ordinary Online A1 distinction (partially; full detail
    from `/registration/company/registration-methods/`), NACE code requirement.
  - `/information-leaflets/company-incorporation-leaflet-1/` — company types,
    the LTD-specific rules (one document constitution, no memorandum, one
    director allowed with a separate secretary), the full Checklist for
    Constitution (subscriber signature/witnessing, share statement rules,
    prohibited objects).
  - `/registration/company/incidental-obligations/company-officers/` — director/
    secretary minimums by company type, age (18+) and undischarged-bankrupt
    restrictions (Companies Act 2014 ss.131-132), the EEA-resident-director
    requirement and Section 137 bond, the secretary rules (may be a body
    corporate, must be separate from a sole director), the "note on completing
    Form A1" for other-directorships disclosure and its exceptions, and the
    25-company directorship cap (s.142).
  - `/registration/company/incidental-obligations/registered-office/` —
    registered-office physical-location and An-Post-deliverability rules.
  - `/registration/company/incidental-obligations/company-name/` — name
    objection/similarity rules (Companies Act 2014 s.30), reservation mechanics
    (out of scope of this document, noted for completeness), and the reserved
    suffix words requiring third-party permission (out of scope: none of this
    document's fields model those restricted words).
  - `/registration/company/registration-methods/` — Ordinary Online A1 (10
    working days) vs. Fé Phráinn A1 (5 working days, requires a separate
    CRO-preapproved promoter constitution template) schemes, and the company
    name reservation fee/mechanics.
- **Secondary source (corroboration):** cpdstore.ie, "What is Required to be
  Filed to Incorporate a Company?" (Lauren Doyle, CPD Store, published
  2023-04-28) — a practitioner CPD explainer that lists the Form A1 field set
  end-to-end (company name, type, director/secretary/subscriber particulars,
  registered office, NACE code, share capital fields, constitution
  requirements) and the online filing fee (€50) and file-upload/signature
  mechanics (PDF upload, 8 MB cap, wet-signature requirement, witness
  restriction). Used because cro.ie's own pages, while authoritative on rules,
  do not present the Form A1 field list as a single consolidated table; this
  secondary source was used to cross-check field completeness, not as the
  primary source for any legal rule.
- **Retrieval method:** `cro.ie` returns HTTP 403 to direct automated fetch
  from this environment (same class of block noted on other jurisdictions'
  sites in prior authoring passes, e.g. `passports.gov.au`). Every `cro.ie`
  page above was instead retrieved via `web.archive.org` Wayback Machine
  snapshots dated between 2025-12-10 and 2026-03-09, decompressed to plain
  text, and read in full (not summarized by a third-party tool).
- **Official form id:** Form A1 ("Form of incorporation of a new company").
- **Retrieved / reviewed:** 2026-07-01.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

## What was confirmed against the source

| Source section | Field(s) |
|---|---|
| Company Name — naming rules | `companyName` |
| Company Incorporation (Leaflet 1) — NACE code | `natureOfBusinessDescription`, `naceCode` |
| Registered Office — physical location | `registeredOfficeAddressLine1/2`, `registeredOfficeEircode` |
| Form A1 required particulars (company email) | `companyEmailAddress` |
| Company Officers — Directors and Secretaries | `directorFullName`, `directorDateOfBirth`, `directorNationality`, `directorOccupation`, `directorResidentialAddressLine1/2`, `directorResidentialAddressCountry` |
| Company Officers — note on completing Form A1 | `directorOtherDirectorships` |
| Company Officers — EEA residency / Section 137 | `directorIsEeaResident`, `section137BondArranged` |
| Company Officers — the Secretary | `secretaryIsBodyCorporate`, `secretaryFullName`, `secretaryDateOfBirth`, `secretaryNationality`, `secretaryResidentialAddressLine1/2`, `secretaryResidentialAddressCountry`, `secretaryCorporateName`, `secretaryCorporateRegistrationNumber` |
| Checklist for Constitution — subscriber requirements | `subscriberName`, `subscriberAddressLine1/2`, `subscriberAddressCountry`, `numberOfSharesSubscribed` |
| Checklist for Constitution — LTD nominal-capital allowance | `nominalValuePerShare` |
| Forming a company — constitution requirements | `constitutionType` |
| Checklist for Constitution — signature/witnessing | `constitutionDocument`, `subscriberSignatureWitnessName` |
| Forming a company — Form A1 declaration | `lawfulActivityDeclarationConfirmed` |
| cpdstore.ie — Form A1 submission requirements | `formA1WetSignatureConfirmed`, `directorPpsn` (flagged, see below) |

## Scope narrowing and why

GovSchema v0.2 fields are flat (SPEC.md §6.1): there is no array or
repeating-group construct ([GSP-0009](../../../../spec/proposals/0009-composite-repeating-values.md)
tracks a future addition). Form A1 supports an arbitrary number of directors,
subscribers, and share classes, so — following the same precedent as
`gb/companies-house/company-incorporation-in01` and
`us/ca/sos/business-entity-llc-formation` — this document is scoped to the
**single-director, single-secretary, single-subscriber, single-share-class
Private Company Limited by Shares (LTD)** case: the common individual-founder
scenario, and the only Irish company type that may have just one director.
Concretely, **out of scope** for v1.0.0:

- Designated Activity Companies (DAC), public companies (PLC/PUC/PULC),
  Companies Limited by Guarantee (CLG/DAC-by-guarantee), unlimited companies,
  Societas Europaea, and UCITS — all require a minimum of two directors and/or
  a two-document (memorandum + articles) constitution with stated objects,
  unlike the LTD's one-document, no-objects constitution this document models.
- More than one director, secretary, subscriber, or share class — the source
  form's repeatable blocks for each are not modelled.
- The **Fé Phráinn A1** fast-track scheme — it requires a promoter to have a
  draft constitution pre-approved by the CRO as a standing template before any
  individual incorporation, a separate multi-step relationship out of scope of
  a single incorporation's data model. `constitutionType` therefore only
  distinguishes the CRO's standard downloadable LTD constitution from a
  bespoke one, both filed under the Ordinary Online A1 scheme.
- **Company name reservation** — an optional, separate pre-step (RCN
  application, €25, 28-day hold) that produces a certificate presentable
  alongside a later Form A1 for a fee offset. Not part of Form A1 itself.
- The **Register of Beneficial Ownership (RBO)** filing — a distinct
  post-incorporation statutory filing (separate from Form A1) with its own
  PPSN-verification regime; out of scope of this document entirely.
- **Fees** (name reservation €25, incorporation €50 per the secondary source) —
  payment metadata, not applicant-collected data, consistent with how other
  schemas in this registry (e.g. `au/apo/passport-application-first-adult`)
  treat fees.

## What is NOT yet independently verified

- **`directorPpsn`/PPSN mandatoriness on Form A1 itself.** The secondary
  source (cpdstore.ie, dated April 2023) lists PPSN as "soon to be required"
  for directors on Form A1. The CRO's own current (2026) "Company Officers"
  page, read in full for this review, does not restate a PPSN requirement for
  Form A1 in its body text — it only references PPSN in navigation links
  pointing to the separate Register of Beneficial Ownership ("Beneficial
  Owners with no PPSN"). It is plausible the phased-in requirement mentioned
  in 2023 has since taken effect for Form A1 itself (Ireland's Companies
  (Corporate Enforcement Authority) Act 2021 introduced PPSN disclosure duties
  for company officers more broadly), but this review could not confirm that
  directly against a live CORE Form A1 field list. `directorPpsn` is
  therefore modelled as `required: false` (optional) rather than mandatory,
  and this is the single most important open item for the next reviewer to
  resolve — ideally by inspecting the live CORE filing screens directly,
  which this review's Wayback-only retrieval method could not do.
- **`registeredOfficeEircode` mandatoriness** — the Registered Office source
  page describes the address requirement in full but does not explicitly list
  Eircode as a separate mandatory Form A1 field (as distinct from being part
  of a complete Irish postal address); modelled as optional.
- **`naceCode` pattern** — inferred from example NACE codes in general use
  (e.g. `62.02`, `10.83`) as the EU NACE Rev. 2 two-digit-division /
  optional-two-digit-subclass structure; the CRO's own NACE code PDF
  (referenced but not linked with a stable URL on the Leaflet 1 page) was not
  independently retrieved to confirm the exact permitted string format CRO's
  CORE system expects (e.g. whether the separator dot is required, optional,
  or omitted entirely in the online form field).
- **Online CORE screen order and wording** were not captured screen-by-screen;
  `sourceRef` annotations cite the named cro.ie guidance pages' own section
  headings, which are believed to mirror the CORE filing flow's field
  groupings but this was not independently confirmed field-by-field against
  the live online service (the same caveat `gb/companies-house/company-incorporation-in01`
  records for `register-a-company-online`).
- **Section 137 bond mechanics** — confirmed as a real substitute for the
  EEA-resident-director requirement from the Company Officers page, but the
  bond's own application process, cost, and required particulars are a
  separate undertaking not modelled here (`section137BondArranged` records
  only the declaration that one is in place).

## Mock test run (phase 4)

Two realistic payloads and one deliberately invalid payload were checked
field-by-field against every field's `type`/`required`/`validation` rule, the
conditional-requiredness relationships described in field text
(`directorIsEeaResident` → `section137BondArranged`;
`secretaryIsBodyCorporate` → the individual vs. corporate secretary field
groups), and `steps[].fields` referential completeness (every field appears in
exactly one step; no step references an undeclared field).

1. **Single-director, EEA-resident, standard constitution** — an Irish
   director/subscriber (same natural person) forming a small LTD trading
   business, EEA-resident (so no Section 137 bond needed), a separate
   individual Irish secretary, 100 shares at €1 nominal value, the CRO's
   standard LTD constitution. **Result: valid**, all fields pass.
2. **Non-EEA-resident director with a Section 137 bond, body-corporate
   secretary, bespoke constitution** — a UK-resident (non-EEA since 2021)
   director/subscriber with a bond in place, a corporate-secretary provider
   (common in practice, e.g. a formation-agent-supplied secretarial company),
   a single share, and a bespoke (non-standard) constitution. **Result:
   valid**, all fields pass, exercising the `secretaryIsBodyCorporate: true`
   branch and the Section 137 conditional path together in one payload.
3. **Deliberately invalid payload** — a 2-character company name (fails
   `minLength: 3`), a malformed NACE code `"ABCDE"` (fails the numeric
   pattern), a PPSN without its required letter suffix (fails pattern), zero
   subscribed shares (fails `minimum: 1`), an unrecognized `constitutionType`
   value (fails enum), `directorIsEeaResident: false` with no
   `section137BondArranged` declaration, and `secretaryIsBodyCorporate: true`
   with neither corporate-secretary field given. **Result: correctly
   rejected** — all 8 induced errors were caught (5 field-level validation
   failures, 3 conditional-requiredness failures), confirming the schema
   detects each class of error independently.

All three payloads were also checked against `schema.json`'s `steps` array:
every field is reachable from `steps[0]` through `next` chaining, and no field
is orphaned from a step.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live CORE Form A1 filing
screens specifically (not just the cro.ie guidance pages), resolves the
`directorPpsn` mandatoriness question above as the top priority, confirms the
NACE code pattern against CRO's own NACE code list PDF, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date and on any `source.url`
change, and specifically re-check whether PPSN has become a confirmed
mandatory Form A1 field by then.
