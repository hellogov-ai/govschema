# Verification record — `gb/companies-house/company-incorporation-in01` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live `register-a-company-online` service screens. It
therefore remains `draft`, not `verified`.

## Why this schema and why now (GOV-179)

GOV-179 asked for a catalog audit, a gap-research pass, and a new schema. The
registry audit (21 published schemas across US, GB, IE, CA, NZ, AU, DE) shows
heavy concentration in identity documents (8 passport schemas) and almost no
coverage of **company formation**, despite it being named explicitly in the
foundation's charter ("company formation, visas, DMV, passports and beyond").
The discovery catalog already lists four company-formation candidates —
`gb/companies-house/company-incorporation-in01`, `us/ca/sos/business-entity-llc-formation`,
`ie/cro/company-incorporation`, `ca/on/registration/business-incorporation` —
and none had been authored. GB's Companies House was chosen first because
(a) it is a single national authority (unlike the US, where formation is
state-administered), (b) it publishes a single current form (IN01) with a
directly retrievable PDF, and (c) it pairs naturally with the already-published
GB reference schemas (`gb/co/register-to-vote`, `gb/dvla/vehicle-tax`,
`gb/hmrc/self-assessment-tax-return-sa100`) to keep building out GB's authority
coverage.

## Sources examined

- **Document `(id, version)`:** `gb/companies-house/company-incorporation-in01` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Companies House (the UK's registrar of companies).
- **Primary source URL:** <https://www.gov.uk/limited-company-formation/register-your-company>,
  plus its linked sub-pages (`company-address`, `memorandum-and-articles-of-association`,
  `documents`, `directors-secretaries-and-shareholders`, `choose-company-name`),
  and <https://www.gov.uk/guidance/people-with-significant-control-pscs>.
- **Primary form source:** IN01 ("Application to register a company"), version
  12.0 (02/26), a fillable PDF hosted at
  `assets.publishing.service.gov.uk/media/696f5dc3c0f4afaa9536a082/IN01_v12.0-FINAL.pdf`,
  found via web search since it is not linked from the guidance pages that
  WebFetch could reach directly. Retrieved and **decompressed/parsed directly**
  (zlib-inflated content streams, parenthesized-string text extraction) — the
  same technique used for the SA100 and ITR-E PDF-derived schemas — so every
  field below is read from the form's own text, not a secondary summary.
- **Official form id:** IN01.
- **Retrieved / reviewed:** 2026-07-01.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

## What was confirmed against the source

| IN01 section | Field(s) |
|---|---|
| A1 — Company name | `companyName` |
| A5 — Principal business activity | `sicCode1`-`sicCode4`, `businessActivityDescription` |
| A6 — Situation of registered office | `registeredOfficeSituation` |
| A7 — Registered office address | `registeredOfficeAddressLine1`, `registeredOfficeAddressLine2`, `registeredOfficePostcode` |
| A10 — Registered email address | `registeredEmailAddress` |
| A8/A9 — Articles of association | `articlesOption`, `restrictedArticles` |
| D1 — Director appointments | `directorTitle`, `directorFirstNames`, `directorSurname`, `directorFormerNames`, `directorNationality`, `directorCountryOfResidence` |
| D2 — Director's service address | `directorServiceAddressSameAsRegisteredOffice`, `directorServiceAddressLine1/2`, `directorServiceAddressCountry`, `directorServiceAddressPostcode` |
| D3/D1 — Director's date of birth | `directorDateOfBirth` |
| D4 — Director's usual residential address, Section 243 exemption | `directorResidentialAddressSameAsServiceAddress`, `directorResidentialAddressLine1/2`, `directorResidentialAddressCountry`, `directorResidentialAddressPostcode`, `directorSection243ExemptionApplied` |
| D5/D6 — Director's identity verification details | `directorIdentityVerified`, `directorPersonalCode`, `directorNameMatchesVerifiedName`, `directorNameMismatchReason` |
| F1 — Statement of capital | `shareCurrency`, `shareClassName`, `numberOfSharesIssued`, `nominalValuePerShare`, `aggregateNominalValue`, `aggregateAmountUnpaid` |
| F2 — Prescribed particulars of rights attached to shares | `prescribedParticularsOfShares` |
| F3 — Initial shareholdings (subscriber) | `subscriberName`, `subscriberAddressLine1/2`, `subscriberAddressCountry`, `subscriberAddressPostcode` |
| H2 — Statement of no PSC | `statementOfNoSignificantControl` |
| I1 — Individual's details (PSC) | `pscFirstNames`, `pscSurname`, `pscFormerNames`, `pscNationality`, `pscCountryOfResidence` |
| I2 — Individual's service address | `pscServiceAddressSameAsRegisteredOffice`, `pscServiceAddressLine1/2`, `pscServiceAddressCountry`, `pscServiceAddressPostcode` |
| I3 — Individual's date of birth | `pscDateOfBirth` |
| I4 — Individual's usual residential address, Section 790ZF exemption | `pscResidentialAddressSameAsServiceAddress`, `pscResidentialAddressLine1/2`, `pscResidentialAddressCountry`, `pscResidentialAddressPostcode`, `pscSection790ZFExemptionApplied` |
| I5/I6 — PSC's identity verification details | `pscIdentityVerified`, `pscPersonalCode`, `pscNameMatchesVerifiedName`, `pscNameMismatchReason` |
| I7 — Nature of control for an individual | `pscShareOwnershipBand`, `pscVotingRightsBand`, `pscRightToAppointRemoveDirectors`, `pscSignificantInfluenceOrControl` |
| L1 — Consent statement | `consentToActConfirmed` |
| M1 — Particulars of an individual PSC | `individualPscParticularsConfirmed` |
| N1 — Lawful purpose | `lawfulPurposeConfirmed` |
| Part 9 — Statement of compliance (P1/P2) | `deliveredByAgent`, `agentName`, `subscriberPrintedName` |

The general guidance pages separately confirmed: the registered-office
"appropriate address" test and the PO-Box restriction (`company-address`), the
model-articles-vs-bespoke choice (`memorandum-and-articles-of-association`,
`documents`), the 25%/50%/75% PSC thresholds and the personal-detail list
(`people-with-significant-control-pscs`), and the SIC-code cap of 4 codes from
the condensed Companies House list (search results citing
`resources.companieshouse.gov.uk/sic/`).

## Scope narrowing and why

GovSchema v0.2 fields are flat (SPEC.md §6.1): there is no array or
repeating-group construct, and composite/repeating values are tracked
separately as a proposed future addition
([GSP-0009](../../../../spec/proposals/0009-composite-repeating-values.md)).
IN01 is a form built almost entirely around repeatable sections (any number of
directors, secretaries, subscribers, PSCs, share classes and currencies), so a
literal 1:1 transcription is not representable in v0.2. Rather than force an
approximation, this document is scoped to the **single-director,
single-subscriber, single-share-class, single-PSC private-company-limited-by-shares
case** — the common individual scenario of one person incorporating their own
company (the GB structural counterpart to a US single-member LLC, as already
noted on the `us/ca/sos/business-entity-llc-formation` and
`gb/companies-house/company-incorporation-in01` discovery catalog entries).
Concretely, **out of scope** for v1.0.0:

- Public companies, companies limited by guarantee, and unlimited companies
  (Sections A4, G, name-ending exemption for guarantee/charity companies).
- Corporate directors and corporate secretaries (Sections C1-C4, E1-E4) —
  modelled only for an individual director; no secretary appointment at all
  (optional for a private company and atypical in the single-member case this
  document targets).
- More than one director, subscriber, share class/currency, or PSC — the
  source form's "continuation pages" for each of these are not modelled.
- Registrable relevant legal entities and "other registrable persons" as PSCs
  (Sections J1-J5, K1-K6) — only an individual PSC, or a statement of no PSC.
- The nature-of-control sub-cases where control is exercised via a firm or
  trust that is not a legal person (I8/I9) — only the four direct
  individual-control bases (shares, voting rights, right to appoint/remove
  directors, significant influence/control) are modelled.
- Applicants who have applied for protection from having their PSC details
  disclosed on the public register (the form explicitly says not to use IN01
  for this; a separate form is required).
- Payment amount/method and the presenter-information block — administrative,
  not data an agent collects on the individual's behalf.

## What is NOT yet independently verified

- The exact **online `register-a-company-online` service screen order and
  wording** were not captured screen-by-screen; `sourceRef` annotations cite
  the IN01 v12.0 PDF's own section codes (A1, D1, F1, I1, etc.), which the
  online service is believed to mirror closely (Companies House's guidance
  describes the online service as covering the same data) but this was not
  independently confirmed field-by-field against the live online flow.
- The **SIC code format** (`^[0-9]{5}$`) is inferred from example codes seen in
  secondary sources (e.g. `62012`) and the "condensed list" cap of 4 codes; the
  exact regular structure of all valid codes on Companies House's condensed
  list (as opposed to the full ONS list) was not itself directly retrieved and
  verified.
- The **Companies House personal code** length (11 characters) is stated
  directly by source text ("This is an 11 character code"), but its permitted
  character set was not specified by the source and is therefore constrained
  only by length (`minLength`/`maxLength` 11), not a `pattern`.
- Whether identity verification (`pscIdentityVerified`) is **strictly
  mandatory** at incorporation for a PSC (as it now is for a director) was
  stated by secondary guidance (`verify-your-identity-for-companies-house`,
  reached via search, not the primary IN01 PDF) rather than confirmed in the
  IN01 form text itself, which frames the PSC identity-verification section
  (I5/I6) as something to complete "only if your PSC has verified their
  identity and shared their personal code with you" — i.e. the form itself
  treats it as conditional on having a code already, not as a blocking
  requirement of the application. `pscIdentityVerified` is therefore modelled
  as optional (`required: false`), unlike `directorIdentityVerified`, which the
  form states as a precondition ("Individual directors must have verified
  their identity...") and is modelled as required.
- The address-field normalization (splitting each source address block into
  `AddressLine1`/`AddressLine2`/`Country`/`Postcode`, folding "Building
  name/number" + "Street" into one line and "Post town" + "County/Region" into
  another) is a GovSchema convention consistent with `gb/co/register-to-vote`
  and `gb/dvla/vehicle-tax`, not a 1:1 transcription of the source form's line
  layout.
- The registration **fee** (a flat £100 online / £124 by cheque, per secondary
  sources reached via search) was not verified against a primary Companies
  House fee schedule and is not modelled as a field regardless, being payment
  metadata rather than applicant-collected data.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live
`register-a-company-online` service screens specifically (not just the IN01
PDF), confirms the SIC-code pattern and personal-code character set against a
primary Companies House source, resolves any discrepancy by shipping a **new
schema version** (immutability — VERSIONING §3, practice Procedure step 5),
and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date and on any `source.url`
change. Companies House identity-verification requirements were still in
their 12-month transition period as of this authoring date (started 18
November 2025), so the mandatory/conditional framing of PSC identity
verification is likely to firm up before the next review.
