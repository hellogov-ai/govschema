# Verification record — `sg/ica/entry-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Singapore's entry visa application

This is the recurring "GovSchema Standard Research" cycle
([GOV-822](/GOV/issues/GOV-822)). Visa was the registry's last vertical with
a gap: after `de/auswaertiges-amt/national-visa-application` (GOV-815) closed
Germany's gap, Visa stood at 8/9 jurisdictions, with Singapore the sole
remaining cell — already recorded as a `candidate`-status catalog entry from a
prior discovery pass (`sg/ica/visa-application-save`), flagged then as
requiring an unusual intermediary-submission channel worth confirming before
authoring. This document closes the SG x Visa cell and, with it, the Visa
vertical (now 9/9 — the first vertical in this registry, alongside Passport,
DMV, Business Formation, Taxes, and National ID & Civic Documents, to reach
full 9-jurisdiction coverage across all six focus verticals; see
`gov430-taxes-vertical-and-gsp0019` and `gov474-dmv-business-formation-vertical-and-xfa-extraction`
memory for the other verticals' closure history).

## Sources examined

- **Document `(id, version)`:** `sg/ica/entry-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration & Checkpoints Authority (ICA).
- **Eligibility/overview page:**
  <https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements>
  ("Check if You Need an Entry Visa"), confirming visitors holding travel
  documents from 40+ listed countries/territories require a Singapore entry
  visa, that "ICA does not accept submission of visa application over the
  immigration counters," and that an applicant without a local contact may
  instead go through an authorised visa agent appointed by a Singapore
  Overseas Mission or the nearest Singapore Overseas Mission directly.
- **e-Visa / SAVE overview:**
  <https://www.ica.gov.sg/news-and-publications/newsroom/media-release/637>
  ("e-VISA — An Easy Way to Obtain a Visa"), describing the SAVE
  (Submission of Application for Visa Electronically) e-Service: the local
  contact or trusted partner submits the application online (no physical
  trip to ICA Building to submit documents or collect a sticker); an
  approved applicant receives an e-Visa as a printable PDF instead of a
  physical visa sticker.
- **e-Services landing page:** <https://www.ica.gov.sg/eservicesandforms> and
  the SAVE application entry point itself,
  <https://eservices.ica.gov.sg/esvclandingpage/save>, confirming the portal
  is reached by "a local contact or authorised visa agent or strategic
  partner" — not the applicant directly.
- **Primary source (field-by-field, Form 14A):**
  <https://www.ica.gov.sg/docs/default-source/ica/forms/form14a.pdf>,
  ICA's own canonical "Application for Entry Visa" (Immigration Act 1959,
  Section 55(1)), fetched directly (HTTP 200, no access block) and
  text-extracted with the registry's established zlib-stream/paren-regex
  technique (the PDF is a bilingual-style, single-language English AcroForm
  whose text layer decompresses cleanly, the same class of static PDF
  already used elsewhere in this registry). All five parts (I Particulars of
  Applicant, II Other Details, III Particulars of Local Contact, IV
  Antecedent of Applicant, V Declaration by Applicant) were extracted and
  read in full.
- **Secondary source (field-by-field, Form V39A):**
  <https://www.ica.gov.sg/docs/default-source/ica/forms/formv39a.pdf>,
  ICA's own canonical "Letter of Introduction for Visa Application," signed
  by the local contact (individual) or a person acting on behalf of a
  company/firm, also fetched directly and text-extracted the same way. This
  form is the sponsor-side counterpart to Form 14A's Part III and supplies
  the individual-vs-company field split (NRIC vs. Unique Entity Number
  (UEN) + representative details) that Form 14A's own Part III does not
  itself distinguish.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What the two forms map to

- **Form 14A, Part I** (applicant identity, marital status and spouse
  particulars, birth/nationality, travel document, PRC ID for Chinese
  nationals, address in country/place of origin) → `fullName` through
  `addressOfOriginResidence`. `spouseStatus`/`spouseNricNumber`/
  `spouseOtherNationalityDetails` are gated on `maritalStatus` being
  `Married`, `Cohabited`, or `Customary` (the three statuses the form
  presents alongside a spouse question); `otherTravelDocumentTypeDetails`
  gates on `travelDocumentType` equals `Others`; `prcIdNumber` is left
  ungated (optional, described as applicable only where nationality is
  Chinese) because the registry's `Condition` grammar has no reliable way to
  gate on a free-text nationality field's exact string.
- **Form 14A, Part II** (contact/occupation/qualifications/income/religion,
  expected arrival, visa type, purpose and length of stay, address in
  Singapore, five-year residence history, travelling companion) →
  `emailAddress` through `companionTravelDocumentNumber`.
  `longerStayReasonAndDuration` gates on `intendedLengthOfStay` equals
  `More than 30 days`; `singaporeAddressType` is a 5-way enum (`Next of
  Kin's Place`, `Relative's Place`, `Friend's Place`, `Hotel`, `Others`) per
  the form's own radio options; `singaporeAddressOtherDetails` gates on
  `singaporeAddressType` equals `Others`; `priorResidenceDetails` gates on
  `residedElsewhereLastFiveYears` equals `true`; the five
  `companion*` fields gate on `hasTravellingCompanion` equals `true`
  (itself optional, since the form only applies this section when the
  applicant is 12 years old or younger, or not accompanied by an airline
  representative — a condition this document cannot itself evaluate, so it
  is left to the preparer to populate).
- **Form 14A, Part II repeating tables** (five-row previous-stays table;
  travelling-companion block) are collapsed into single free-text fields
  (`priorResidenceDetails`), the same treatment used elsewhere in this
  registry for small repeating tables (e.g.
  `de/auswaertiges-amt/national-visa-application`'s `previousStaysDetails`).
- **Form 14A, Part III** (local contact or company/hotel: name,
  relationship, contact number, email) → `localContactName`,
  `localContactRelationshipToApplicant`, `localContactNumber`,
  `localContactEmail`. Part III alone does not distinguish an individual
  local contact from a company/hotel local contact by field set; that
  distinction comes from Form V39A.
- **Form V39A** (signed Letter of Introduction, split into an
  individual-local-contact block and a company/firm block) →
  `localContactType` (a field this document adds, not itself printed on
  either form, needed because it gates which of the following two fields
  applies), `localContactNricNumber` (gated on `localContactType` equals
  `Individual`), `localContactCompanyUen` and
  `localContactCompanyRepresentativeDetails` (gated on `localContactType`
  equals `Company or Hotel`), `localContactAddress`, and
  `embarkationCountryPlace` ("coming to Singapore from"). The signed V39A
  letter itself is captured as the `localContactIntroductionLetter`
  `documents[]` entry rather than a field, since it is the local contact's
  own signed attestation, not applicant-supplied data.
- **Form 14A, Part IV** (antecedent: refused entry/deported, convicted,
  prohibited from entering, entered using a different name, sex,
  nationality/citizenship, or date of birth) →
  `previouslyRefusedEntryOrDeported` through
  `previouslyEnteredSingaporeUsingDifferentParticulars`, each an independent
  boolean per the form's own four-row Yes/No table. The fourth row's
  question (d) is broader than "different name" alone — it covers a
  different name, sex, nationality/citizenship, or date of birth — so the
  field and its label capture all four variants rather than name only.
  `previousParticularsUsed` gates on
  `previouslyEnteredSingaporeUsingDifferentParticulars` equals `true`.
  `antecedentDetails` ("if any of the answers is yes, please furnish
  details") gates on an `any` composition (GSP-0013) of all four booleans
  equalling `true` — the first use of `any` composition in a Visa-vertical
  document in this registry (the same composition primitive already used
  for `sg/ica/identity-card-reregistration`'s `all` condition, per
  memory `gov641-sg-ica-identity-card-reregistration`).
- **Form 14A, Part V** (declaration: information is true/accurate/complete,
  signed and dated) → the `declarationAttestation` `documents[]` entry, with
  the exact attestation text captured verbatim.
- **Page 1 header** ("Affix a recent passport-size photograph here") → the
  `applicantPhoto` `documents[]` entry.
- **Not on either paper form:** `submissionChannel`, a field this document
  adds because ICA does not accept applications directly from the
  applicant or over the counter — every application must go through one of
  four routes (Singpass-holding individual local contact, Corppass-holding
  company/hotel local contact, an authorised visa agent, or a Singapore
  overseas mission), and an agent preparing this application needs to know
  which route is in play before the local-contact fields are relevant. This
  mirrors the pre-login routing fields
  `de/auswaertiges-amt/national-visa-application` adds for its own portal.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`notEquals`/`in`/`greaterThan`/`greaterThanOrEqual`/`all`/
`any`/`not` grammar as GSP-0013's `Condition` type checked every
`type`/`required`/`requiredWhen`/`validation.enum` constraint and the
`crossFieldValidation` rule in `schema.json` against five scenarios:

```
OK   Scenario 1: solo social visitor via Singpass local contact, single, no branch triggers
OK   Scenario 2: married applicant w/ spouse SG citizen, >30 day stay, company local
     contact, PRC national, travelling companion, antecedent yes
OK   Scenario 3: applicant entered SG under different particulars previously (antecedent
     branch via previouslyEnteredSingaporeUsingDifferentParticulars)
FAIL Negative control: married applicant missing spouseStatus (expected FAIL)
    - MISSING required field: spouseStatus
FAIL Negative control: travel document expiry before issue date (expected FAIL)
    - crossFieldValidation FAILED: travelDocumentExpiryAfterIssue
```

Scenarios 1-3 together exercise every `requiredWhen` branch this document
defines (spouse/partner fields; other-travel-document details; longer-stay
reason; other-Singapore-address details; prior-residence details;
travelling-companion sub-fields; individual-vs-company local-contact
sub-fields; previous-particulars-used; antecedent details via the `any`
composition) and the `crossFieldValidation` rule
(`travelDocumentExpiryAfterIssue`), all of which held. The final two
scenarios are negative controls confirming the evaluator actually enforces
`requiredWhen` and `crossFieldValidation` (both correctly report failures)
rather than trivially passing everything. No defects were found in the
schema itself during this pass.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/sg/ica/entry-visa-application/1.0.0/schema.json
ok   registry/sg/ica/entry-visa-application/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/sg/ica/entry-visa-application/1.0.0/schema.json
ok   registry/sg/ica/entry-visa-application/1.0.0/schema.json [v0.3]
```

The full registry (153/153 schema documents) continues to validate after
this addition, and `tools/govschema-client/registry-index.json` was
regenerated (153 entries) to include it.

## What is NOT modelled (out of scope), and why

- **The authenticated SAVE e-Service's own data-entry screens** — gated
  behind the local contact's Singpass or the company/hotel local contact's
  Corppass (see above); this document models the underlying Form 14A and
  Form V39A the e-Service digitises instead.
- **The visa-agent and overseas-mission paper-submission routes'** own
  intake forms/checklists (e.g. VFS Global's per-country checklists seen
  during sourcing) — these are third-party or mission-specific
  intermediary processes layered on top of the same underlying Form
  14A/V39A content this document already models, not a distinct
  government-authored form.
- **Family/group visa application variants** (ICA also publishes a
  "Family Visa Application" SAVE user guide distinct from the individual
  flow modelled here) — a candidate for its own future schema or a MINOR
  extension.
- **Which of the 40+ listed nationalities require a visa at all** — a
  separate eligibility lookup (the visa_requirements page's own country
  list), not itself a field on the application.

## Scope and jurisdiction notes

- This is Singapore's first Visa-vertical document. `sg/ica/identity-card-*`
  and `sg/ica/passport-application` cover National ID & Civic
  Documents/Passport, `sg/acra/*` covers Business Formation, `sg/iras/*`
  covers Taxes, and `sg/spf/*` covers DMV; this document extends the
  existing `sg/ica/*` authority segment into a fifth vertical for that
  authority.
- `id` is `sg/ica/entry-visa-application`, naming the underlying process
  (matching Form 14A's own title, "Application for Entry Visa") rather than
  the SAVE e-Service front-end, consistent with this registry's existing
  convention (e.g. `de/auswaertiges-amt/national-visa-application` names the
  paper form, not the Consular Services Portal).
- Conditional requiredness uses `requiredWhen` (GSP-0013, including one
  `any` composition for `antecedentDetails`), targeting spec v0.3, the same
  as every other Visa-vertical document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6
months). Because `status` remains `draft` (this document was authored from
the canonical Form 14A/V39A PDFs but not against the live, authenticated
SAVE e-Service itself), a future review should prioritize obtaining a local
contact's Singpass or a company's Corppass credentials (or partnering with a
local-contact/agent who has them) to confirm the authenticated data-entry
screens field-by-field, which would also resolve the exact online treatment
of Part II's non-asterisked fields (e.g. `annualIncomeSgd`, `religion`)
that this document has conservatively modelled as optional.

## Review-fix note (pre-merge, GOV-824)

The review gate's `pdfjs-dist` AcroForm extraction (a more complete method
than this document's zlib/paren-regex extraction) surfaced two fidelity
gaps, both fixed in this revision before merge:

1. `singaporeAddressType`'s enum was missing 3 of the form's 5 real options
   (`Next of Kin's Place`, `Relative's Place`, `Friend's Place`) — corrected
   above.
2. `previouslyEnteredSingaporeUsingDifferentName` (renamed
   `previouslyEnteredSingaporeUsingDifferentParticulars`) and its follow-up
   detail field (renamed `previousParticularsUsed`) narrowed Part IV's
   question (d) — which covers a different name, sex, nationality/
   citizenship, or date of birth — down to name only. Both are now
   corrected above.
