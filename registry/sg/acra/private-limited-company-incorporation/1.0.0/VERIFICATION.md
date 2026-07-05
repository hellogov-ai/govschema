# Verification record — `sg/acra/private-limited-company-incorporation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Sources examined

- **Document `(id, version)`:** `sg/acra/private-limited-company-incorporation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Accounting and Corporate Regulatory Authority ("ACRA").
- **Primary sources** (ACRA's "Registering a local company" how-to guide series, acra.gov.sg):
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/registering-via-bizfile/>
    — "Step 4.6: Registering a local company via Bizfile" (last updated 16 May
    2026): eligibility, required documents/information, the full 10-step
    registration flow, fees, and processing time.
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/choosing-a-company-type/>
    — "Step 4.1: Choosing a company type" (last updated 3 February 2026):
    exempt private company vs. private company limited by shares vs. public
    company distinctions and shareholder caps.
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/choosing-a-companys-financial-year-end/>
    — "Step 4.2: Choosing a company's financial year end (FYE)" (last updated
    29 January 2026): FYE definition, 12-month/52-week accounting periods.
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/appointing-company-directors-other-key-officers/>
    — "Step 4.3: Choosing company directors & other key officers" (last
    updated 29 January 2026): director eligibility (local residency rules),
    company secretary eligibility and the six-month post-incorporation
    appointment window, auditor exemption.
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/deciding-on-share-capital-share-types/>
    — "Step 4.4: Deciding on share capital & share types" (last updated 6
    March 2026): share capital vs. paid-up capital, share classes, the
    SGD 1 minimum, the 19-digit/19-decimal-place share-count limit, and the
    four share-payment-mode terms (All in Cash, etc.).
  - <https://www.acra.gov.sg/register/business/registering-different-business-structures/local-company/company-constitution/>
    — "Step 4.5: Preparing or adopting a company constitution" (last updated
    29 January 2026): constitution contents and the two model-constitution
    modes (in force from time to time / at a point in time).
  - <https://www.acra.gov.sg/register/business/choosing-reserving-a-business-name/reserving-bizfile/>
    — "Reserving a business name via Bizfile": name-format rule, mandatory
    SSIC code, application email, SGD 15 fee, 120-day validity (the same
    prerequisite eService `sg/acra/sole-proprietorship-registration` sources
    its name-reservation fields from).
- **Field extraction method:** Bizfile has no downloadable fillable form — it
  is a Singpass-authenticated online eService, the same constraint
  `sg/acra/sole-proprietorship-registration` documented. ACRA's own guide PDF
  this document's sibling schema cites
  (`bizfile-guide---incorporate-local-company.pdf`) now 301-redirects to the
  live "Step 4.6" how-to guide page above — ACRA has migrated this guidance
  off a static PDF entirely since that sibling schema was authored. Each of
  the six guide pages above was independently fetched with a browser-like
  `curl` request (a plain `curl` without a User-Agent header is blocked by
  CloudFront with an HTTP 403) and converted to raw text with a script
  stripping only `<script>`/`<style>`/tag markup — not just a `WebFetch`
  tool-summarized read — so every quoted fact below was verbatim-checked
  against the raw page text, not a paraphrase. This is a **stronger**
  sourcing method than the automated-fetch-and-summarize technique
  `sg/acra/sole-proprietorship-registration` used, though still weaker than
  the `pdfjs-dist` AcroForm/XFA extraction used for PDF-form-based schemas in
  this registry (e.g. `nl/kvk/bv-formation`), since Bizfile publishes no
  fillable form to extract from.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Step 4.3 — director local-residency eligibility | `founderResidencyStatus` |
| Reserving a business name via Bizfile | `proposedCompanyName`, `primarySsicCode`, `secondarySsicCode`, `businessActivityCustomDescription`, `nameApplicationEmail` |
| Step 4.1 — company type / shareholder caps | `companyType` |
| Step 4.6, Step 2, Company details | `nameRegistrationEserviceNumber`, `registeredOfficeAddressLine`, `registeredOfficeUnitNumber`, `registeredOfficePostalCode`, `officeHoursConfirmed`, `companyEmailAddress` |
| Step 4.2 — FYE | `financialYearEndDate`, `financialYearPeriod` |
| Step 4.6, Step 3, Position holders | `founderFullName`, `founderNricOrFin`, `founderDateOfBirth`, `founderPositionsHeld`, `founderResidentialAddressLine`/`UnitNumber`/`PostalCode`, `founderContactAddressLine`/`UnitNumber`/`PostalCode`, `founderMobileNumber`, `founderContactEmail` |
| Step 4.3 — company secretary six-month window, "not the sole director" | `founderPositionsHeld` description (secretary out of scope) |
| Step 4.6, Step 4, Nominator information (ROND/RONS) | `isExemptFromNomineeRegisters`, `nomineeExemptionCategory`, `hasNomineeDirectorOrShareholder` |
| Step 4.6, Step 5, Controller details (RORC) | `isExemptFromControllersRegister`, `controllerExemptionCategory`, `ableToIdentifyControllers`, `controllerIsSoleFounder` |
| Step 4.4 — share capital/payment modes/share count limits | `shareCapitalCurrency`, `sharePaymentMethod`, `shareClass`, `numberOfSharesIssued`, `issuedShareCapitalAmount`, `paidUpShareCapitalAmount` |
| Step 4.6, Step 7, Allot shares | `shareAllotmentConfirmed` |
| Step 4.6, Step 8 / Step 4.5, Constitution | `constitutionType`, `constitutionDocument`, `modelConstitutionMode` |
| Step 4.6, Step 9, Final review & payment | `declarationConfirmed`, `specialUenRequested` |
| Step 4.6, Fees and processing time | `paymentMethod` |

## What is NOT independently confirmed / out of scope

- **Exact NRIC/FIN and postal code validation patterns.** As with
  `sg/acra/sole-proprietorship-registration`, `founderNricOrFin` is modelled
  as free text bounded only by a generous `maxLength`, since Bizfile's own
  field-level format validation was not published in any source reviewed.
  Postal codes carry a `^[0-9]{6}$` pattern on the strength of Singapore's
  well-established 6-digit national addressing standard, not a
  Bizfile-specific claim.
- **ROND/RONS and RORC exemption category dropdown values.** Both "Step 4:
  Add nominator information" and "Step 5: Add controller details" instruct
  the applicant to "select the exemption category from the dropdown list",
  but neither page (nor any other page reviewed) publishes that dropdown's
  actual value set. `nomineeExemptionCategory` and `controllerExemptionCategory`
  are therefore modelled as unconstrained strings rather than a fabricated
  enum, the same discipline `sg/acra/sole-proprietorship-registration`
  applied to its own unconfirmed CPF Board 3-year-registration criteria.
- **Nominee director/shareholder arrangements.** Modelled only as an
  eligibility-style exit (`hasNomineeDirectorOrShareholder`); the nominator
  detail sub-form (Step 4's "Add a nominator" fields) is out of scope,
  consistent with this document's single-founder scope where a nominee
  arrangement cannot arise in the first place.
- **Unable-to-identify-controllers declaration path.** Step 5's third
  scenario (not exempt, unable to identify controllers — a declaration
  checkbox plus "individuals with executive control") is modelled only as an
  exit transition, not followed through; a single-founder company can always
  identify its controller (the founder), so this path is a genuine dead end
  for this document's scope, not an unresearched gap.
- **Corporate position holders and corporate registrable controllers.** Both
  Step 3 ("individual or corporate entity") and Step 5 ("Corporate
  Registrable Controllers") support a corporate entity in these roles; out
  of scope by the single natural-person-founder scoping used throughout this
  registry (e.g. `nl/kvk/bv-formation`'s single natural-person director,
  `ca/on/registration/business-incorporation`'s single director/
  incorporator).
- **Group and trust share allotments.** Step 7 also supports allotting
  shares to a group of shareholders or into a trust arrangement; out of
  scope by the single-shareholder scoping (`shareAllotmentConfirmed` models
  only the individual-shares path).
- **Company secretary, auditor appointment, and CSP-mediated filing.** Per
  Step 4.3, a company secretary must be appointed within six months of
  registration (not at registration itself) and an auditor within three
  months unless exempt; neither is modelled, being post-incorporation
  compliance steps rather than part of the registration filing. Filing via
  a corporate service provider (CSP), rather than the founder self-filing,
  is likewise out of scope.
- **Constitution upload file constraints.** `constitutionDocument` is
  modelled as an unconstrained `file` field: no accepted media type or
  maximum size was published in the guide pages reviewed for this document.
- **Exact declaration wording.** Step 9 instructs the applicant to "read the
  declaration carefully" before checking the declaration box, but does not
  publish the declaration's exact text (unlike, e.g.,
  `sg/acra/sole-proprietorship-registration`'s quoted owner-consent
  attestation statement); `declarationConfirmed` is therefore modelled as a
  plain boolean confirmation, not a `documents[]` attestation entry with a
  verbatim `statement`, since fabricating one would violate source-of-truth
  fidelity.
- **Public company types and unlimited private companies.** Step 4.1 also
  describes public companies limited by shares/by guarantee and unlimited
  (exempt) private companies; out of scope — this document models only the
  two share-capital-requiring private company types compatible with a
  single-founder incorporation.

## Scope and jurisdiction notes

- Closes the last open candidate in the DE/FR/NL/SG
  true-limited-liability-company-formation gap first flagged by the
  GOV-1136 research cycle: `de/handelsregister/gmbh-formation-musterprotokoll`
  (GmbH), `fr/inpi/sasu-or-eurl-formation` (SASU/EURL), and
  `nl/kvk/bv-formation` (BV) closed the other three. `sg/acra/sole-proprietorship-registration`
  covers only the one-owner sole-proprietorship form, not a legal entity
  with separate legal personality and share capital — this document is
  Singapore's true-LLC-analogue sibling.
- Scoped to a single founder who is sole director and sole shareholder,
  matching the single-founder narrowing used by every sibling schema in
  this quartet. Unlike those three (each a paper/PDF form filed with a
  registrar or notary), Bizfile is itself a branching online eService, so
  this document reuses the `transitions`/`exitReason` eligibility-gate
  pattern from `sg/acra/sole-proprietorship-registration` (the first
  Business Formation schema to apply that GSP-0013 construct) for its three
  nominee/controller exit paths, rather than the `requiredWhen`-only
  approach `nl/kvk/bv-formation` and `de/handelsregister/gmbh-formation-musterprotokoll`
  used (neither of those paper forms has a branch that disqualifies the
  applicant mid-flow).
- Addresses are modelled as flat `addressLine`/`unitNumber`/`postalCode`
  string triples, matching `sg/acra/sole-proprietorship-registration`'s
  convention for the same reason: no source reviewed exposes Bizfile's own
  screen-level address field breakdown to decompose further.
- This is the registry's **ninth** company-formation jurisdiction/entity
  pair, after `gb/companies-house/company-incorporation-in01`,
  `us/ca/sos/business-entity-llc-formation`, `ie/cro/company-incorporation`,
  `ca/on/registration/business-incorporation`,
  `sg/acra/sole-proprietorship-registration`,
  `de/handelsregister/gmbh-formation-musterprotokoll`,
  `fr/inpi/sasu-or-eurl-formation`, `au/asic/proprietary-company-registration`,
  and `nl/kvk/bv-formation` — and closes `discovery/catalog.json`'s last open
  Business Formation candidate.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with Singpass access drives the
live Bizfile "Register new business entity" eService (after first reserving
a company name) with a mock (test) exempt-private-company incorporation,
confirms the exact screen-by-screen field list, the `founderNricOrFin` and
postal code validation patterns, the ROND/RONS and RORC exemption-category
dropdown values, and the constitution upload's file constraints noted above,
and records the outcome here — shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Test run

A mock `conformance/sg/acra/private-limited-company-incorporation/1.0.0/application-packet.json`
scenario (Rajesh Kumar, a Singapore Citizen incorporating a single-founder
exempt private company, "Kumar Trading Pte. Ltd.", a general wholesale-trade
business, issuing SGD 1,000 of ordinary shares fully paid in cash and
adopting ACRA's model constitution) was checked with a from-scratch script
re-implementing this document's own `required`/`requiredWhen` condition
grammar (GSP-0013) plus its `transitions`/`exitReason` and
`crossFieldValidation` constructs. Result: **0 errors** across all 47 fields
(41 collected, 6 correctly marked not-applicable). Mutation tests confirmed:
(1) the `founderResidencyStatus` eligibility gate correctly excludes
`none_of_the_above` from `eligibleValues`; (2) flipping
`isExemptFromNomineeRegisters` to `true` correctly flips
`nomineeExemptionCategory` to required and `hasNomineeDirectorOrShareholder`
to not-required; (3)-(5) each of the three
`nominee_and_controller_declarations` step's exit transitions
(`nominee-arrangement-out-of-scope`, `unable-to-identify-controllers-out-of-scope`,
`multi-controller-out-of-scope`) fires correctly when its triggering field is
mutated, each taking priority over the ones after it; (6) the scenario's
baseline values correctly fall through to `share_capital` with no exit;
(7) flipping `constitutionType` to `customised_upload` correctly flips
`constitutionDocument`/`modelConstitutionMode` requiredness; and (8) the
`paidUpNotAboveIssued` cross-field rule (SGD 1,000 ≤ SGD 1,000) passes. The
schema was also validated against the GovSchema v0.3 meta-schema with
`tools/validate-ajv.mjs` (pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-05** (6
months).
