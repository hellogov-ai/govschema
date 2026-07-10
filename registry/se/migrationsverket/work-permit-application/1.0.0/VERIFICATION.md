# Verification record — `se/migrationsverket/work-permit-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2070, "GovSchema Standard Research")

This cycle's task brief restates the Standards Engineer's standing
research→author→verify charter (catalog what exists, research what's
missing, document fields, test-run with mock data, publish a schema). Sweden
was opened at GOV-2056 (Business Formation) and deepened at GOV-2063 (DMV,
2 of 6 verticals); GOV-2063's own closing note flagged Sweden's other four
verticals (Passport, Taxes, Visa, National ID) as open, unscreened backlog
candidates — the natural next step for this cycle, rather than re-screening
already-gated jurisdictions or opening a 30th country from scratch. A
scouting pass (delegated to a research subagent, then independently
re-verified) across all four remaining verticals found:

- **Taxes (Skatteverket)** — initially the strongest-looking candidate: SKV
  4314 ("Preliminär inkomstdeklaration 1", the preliminary income tax
  declaration for sole proprietors and partnership partners) is a genuine
  77-field XFA-structured AcroForm. But its only directly-fetchable static
  copy, `4314_46.pdf`, proved on independent re-extraction to be a stale
  edition — its own guidance text cites "beskattningsår 2014" (tax year
  2014) pension-savings-deduction figures, and the Wayback Machine's closest
  snapshot of the same download URL dates to 2016. Skatteverket's live
  PDF-generation servlet (`www1.skatteverket.se/lcmp2/lc_webapp/secure/PdfServlet.do`,
  which the info page's own download form posts to) resets the TCP
  connection for both a direct `curl` fetch and a real headless-Chromium
  session alike (confirmed with TLS 1.2-forced and default negotiation,
  and with a real browser session complete with cookies/referer) — a
  genuine server-side fault on that specific vhost, not a bot-mitigation
  gate. A web search independently confirmed SKV 4314 has since been
  reissued for tax years 2024, 2025, and 2026, each with real structural
  changes to the form's capital-income section (driven by interest-deduction
  rule changes) — meaning the cached 2014/2015 copy is genuinely
  out of date, not merely differently dated. This candidate was abandoned
  rather than authored against a demonstrably stale source, per this
  registry's source-of-truth-fidelity discipline.
- **Passport (Polisen)** — reconfirmed dead end: the entire process is
  in-person (photo and fingerprints captured at the appointment itself); the
  only downloadable PDF found is a static, non-fillable guardian-consent
  attachment, not the main application.
- **National ID (Skatteverket samordningsnummer / Polisen national ID
  card)** — reconfirmed dead end for the same reason: in-person biometric
  issuance/verification only, and the samordningsnummer application's
  fillable-PDF option is served dynamically with no recoverable direct
  binary URL.
- **Visa (Migrationsverket)** — the Schengen short-stay visa form (nos.
  118031 SV/119031 EN) is a confirmed duplicate of the EU-harmonized
  template already published as `fr/france-visas/schengen-visa-application`
  (and reconfirmed a duplicate in the prior DMV-cycle's own research trail).
  But Migrationsverket also publishes a **Swedish work-permit application**
  (Form 149011), a genuinely Sweden-national, non-harmonized process with
  zero field overlap with the Schengen template: employer/salary/insurance
  details, work-in-Sweden history, education history, and a
  Temporary-Protection-Directive residence-permit-revocation question that
  have no EU-harmonized counterpart. This was the strongest candidate found
  this cycle.

## Sources examined

- **Document `(id, version)`:** `se/migrationsverket/work-permit-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Migration Agency (Migrationsverket).
- **Primary source:** Migrationsverket Form 149011, edition **2026-06-11**
  ("Application for a Swedish work permit" / "Ansökan om arbetstillstånd"),
  downloaded directly from
  `https://www.migrationsverket.se/download/18.2cd2e409193b84c506a35b42/1743507129672/149011_ans_AT_en.pdf`,
  linked from the official forms page
  <https://www.migrationsverket.se/en/contact-us/you-need-documents-from-us/forms.html>.
  A genuine, official, fillable AcroForm PDF (9 pages: 7 form/instruction
  pages, plus a 2-page GDPR-processing appendix that the form itself states
  is not to be submitted), retrieved with a direct `curl` fetch (HTTP 200,
  no CAPTCHA/BankID/login gate). The form's own footer stamp reads "149011
  2026-06-11" on every page — one month old at the time of this review, the
  strongest recency signal found this cycle (directly contrasted with the
  SKV 4314 candidate's confirmed c.2014/2015 staleness above).
- **Field extraction method:** `pdfjs-dist`'s page-level `getAnnotations()`
  across all 9 pages (AcroForm field names — this PDF's own field names are
  already descriptive English strings, e.g. `"Surname"`,
  `"Citizenship - Spouse, cohabitant or registered partner"` — plus each
  field's type: text/checkbox/radio-button) and `getTextContent()` for the
  full text layer, sorted into reading order by y/x coordinate, across
  pages 1-9, the same rigor already used throughout this registry (e.g.
  `se/transportstyrelsen/vehicle-registration-new-vehicle`,
  `jp/nta/individual-income-tax-final-return`). The PDF carries **159
  AcroForm widgets collapsing to 143 distinct field names** (radio-button
  groups share one field name across multiple option kids); every field's
  own descriptive name and the surrounding section-numbered prose (§1-§16 on
  pages 2-7) were used directly to write each schema field's `label` and
  `description`. Page 1's four mutually-exclusive "what are you applying
  for" blocks (first-time / extension / new-employer / student-employed),
  each with its own artist/athlete-coach/other-profession sub-choice, were
  collapsed into this document's `applicationCategory` field plus four
  parallel `*ProfessionType`/`*Profession` sub-fields, preserving the
  source's own mutual-exclusivity structure within the GSP-0013 flat
  `requiredWhen` condition grammar (no nested-object/array field type
  exists in the v0.3 spec).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| p.1 'Your application': four application-category blocks | `applicationCategory`, `firstTimeProfessionType`, `firstTimeOtherProfession`, `extensionProfessionType`, `extensionOtherProfession`, `newEmployerProfession`, `studentEmployedProfession` |
| p.2 top: permanent-residence-permit checkbox | `applyingForPermanentResidence` |
| p.2, §1 'Stay in Sweden' | `plannedEntryDate`, `workInSwedenFromDate`, `workUntilFurtherNotice`, `workInSwedenUntilDate`, `inSwedenSinceDate`, `reasonForBeingInSweden` |
| p.2, §2 'Personal details' | `surname`, `previousSurname`, `firstNames`, `dateOfBirthOrPersonalId`, `citizenship`, `previousCitizenship`, `placeOfBirth`, `countryOfBirth`, `nativeLanguage`, `otherLanguagesSpoken`, `sex`, `maritalStatus`, `relativesApplyingWithYou` |
| p.2, §3 'Passport details' | `passportType`, `otherPassportType`, `passportIssuedBy`, `passportNumber`, `passportIssuedDate`, `passportValidUntil`, `hasResidencePermitInOtherCountry`, `residencePermitOtherCountry`, `residencePermitOtherCountryValidPeriod` |
| p.3, §4/§4.1 'Contact details' | `contactEmail`, `contactPhone`, `contactStreetAddress`, `contactPostcode`, `contactPlace`, `contactCountry`, `representativeEmail`, `representativeName`, `representativeStreetAddress`, `representativePostcode`, `representativePlace` |
| p.3, §5 'Previous applications' | `previouslyAppliedToComeToSweden`, `previousApplicationYear` |
| p.3, §6 'Previous stays', rows 1-4 | `previousStay1Country`…`previousStay4DepartureDate` (12 fields) |
| p.3-4, §7.1/§7.2 'Your family' (spouse + up to 5 children) | `spouseSurname`…`spouseSex` (8 fields), `child1SurnameFirstName`…`child5Citizenship` (15 fields) |
| p.4, §8 'Work in Sweden' | `employerOrClientName`…`employerProvidesPensionInsurance` (18 fields) |
| p.4, §9 'Previous work in Sweden' | `previousEmployerInSweden`, `previousEmploymentPeriod`, `reasonForEndingPreviousEmployment` |
| p.5, §10 'Previous studies and work experience' | school rows 1-2, university rows 1-3, vocational rows 1-2, previous-employer rows 1-3 (30 fields) |
| p.5, §11 'Comprehensive health insurance' | `registeredInSwedishPopulationRegister`, `hasComprehensiveHealthInsurance`, `healthInsuranceCompany`, `healthInsuranceValidPeriod` |
| p.5, §12 'Temporary Protection Directive' | `requestRevokeCurrentResidencePermit` |
| p.6, §13 'Other information' | `otherInformationForApplication` |
| p.6, §14 'Decision delivery' | `decisionDeliveryAddress` |
| p.7, §16 'Signature' | `placeAndDateOfSignature`, `documents[].applicantSignature` |
| p.6-7, §15 'Enclose the following documents' (main list + 15.1.1-15.1.6 category branches) | `documents[].passportCopyPages`, `employmentContract`, `employmentInformation`, `unionOpinion`, `healthInsuranceProof`, `extensionSupportingDocuments`, `artistContract`, `athleteOrCoachContract`, `studentSupportingDocuments`, `permanentResidenceSupportingDocuments`, `employerVisitCertificate` |
| p.3, §4.1 representative note | `documents[].representativePowerOfAttorney` |

## What is NOT independently confirmed / out of scope

- **No PDF-level `Required` flags checked.** Unlike the DMV/Business
  Formation SE schemas, this cycle did not re-run a bit-level check of each
  widget's `fieldFlags`/`required` property (pdfjs-dist's `getAnnotations()`
  output was consulted for field identity/type, not requiredness); `required`/
  `requiredWhen` assignments here are derived entirely from the form's own
  section-numbered prose and standard work-permit necessity (e.g. passport
  and salary details are always needed; family/education/previous-work rows
  are inherently optional per the form's own blank-row tolerance).
- **The "athletes/coaches exempted" scope note is folded into label text,
  not `requiredWhen`.** The main document list's employment-information and
  union-opinion attachments are stated as always required *except* for
  professional athletes/coaches, but "is this an athlete/coach application"
  spans three different mutually-exclusive top-level paths
  (`firstTimeProfessionType`, `extensionProfessionType`, and the freeform
  `newEmployerProfession` text, which cannot be reliably pattern-matched).
  Rather than build a fragile `requiredWhen` that only covers two of the
  three paths, both documents are modelled as unconditionally `required:
  true` with the exception disclosed in their own `label` text — the same
  "fold an ambiguous trigger into a description instead of a brittle
  condition" mitigation this registry's operating memory already documents
  for the `notEquals`-against-an-absent-optional-field bug class.
- **`workInSwedenUntilDate` vs `workUntilFurtherNotice` is not modelled as a
  `requiredWhen` pair**, for the same reason: `workUntilFurtherNotice` is an
  optional boolean with no PDF Required flag, so gating the end-date field
  on its absence-vs-value state would risk the same class of bug: the
  mutual dependency is disclosed only in `workInSwedenUntilDate`'s own
  `description`.
- **Repeating rows are modelled as explicit numbered fields, not an array
  type.** GovSchema v0.3's field model is flat (`type` is one of
  `string`/`number`/`integer`/`boolean`/`date`/`enum`/`file`/`object`, with
  no array/repeatable-group construct), so the form's own bounded repeating
  blocks (4 previous-stay rows, 5 children, 2 school rows, 3 university
  rows, 2 vocational rows, 3 previous-employer rows) are each modelled as
  the exact number of explicit, individually-optional fields the source PDF
  itself provides — consistent with this registry's existing convention for
  bounded repeating structures (e.g. Transportstyrelsen's plate-combination
  checkboxes).
- **Bundled document descriptions for §15.1.1/§15.1.4/§15.1.5.** The
  extension, student, and permanent-residence document bundles each
  aggregate several distinct enclosure items (e.g. the extension bundle
  covers a tax-return summary, payslips, an employment certificate, and an
  absence statement) into one `documents[]` entry with an itemized `label`,
  rather than one entry per bullet — consistent with this registry's
  convention of not over-fragmenting a source's own always-co-required
  bundle into many single-purpose entries.
- **The GDPR-processing appendix (pages 8-9) is out of scope.** The form's
  own instruction states this appendix "shall not be sent in to the Swedish
  Migration Agency"; it is informational only and contributes no fields or
  documents to this schema.
- **Companion form 133011** ("Application for a permit for family members of
  workers, researchers, athletes or coaches and self-employed persons"),
  which the source explicitly names as the separate form co-applicant
  family members must use, is out of scope — flagged as a future
  companion-schedule candidate.
- **Live e-service parity.** Not screened this cycle; this document is
  sourced entirely from the paper/PDF form, matching this registry's
  existing scoping precedent for other Swedish schemas.

## Scope and jurisdiction notes

- Opens **Sweden's Visa vertical** (3 of 6 verticals now open: Business
  Formation, DMV, Visa). Sweden's other three verticals (Passport, Taxes,
  National ID) remain open: Passport and National ID are confirmed dead
  ends (in-person/biometric-only), while Taxes is a genuinely open but
  currently source-blocked candidate — SKV 4314 is a real, structurally
  strong form, but its only recoverable copy is stale and its live
  generation endpoint is presently unreachable (connection reset); a future
  cycle should retry once either the dynamic servlet becomes reachable or a
  current static mirror is found.
- Distinct from the EU-harmonized Schengen short-stay visa template already
  published elsewhere in this registry — this document models a
  Sweden-national, non-harmonized work-permit process with no field overlap.
- Every `requiredWhen` condition in this document compares only against a
  field that is itself either statically `required: true` (e.g.
  `applicationCategory`, `passportType`, `hasResidencePermitInOtherCountry`
  is optional but gated fields use `equals: true`, the safe direction per
  this registry's own documented "notEquals empty-string absent-field bug"
  memory — an absent optional boolean correctly evaluates `equals: true` as
  false, never misfiring as required) or another already-`requiredWhen`-gated
  enum with a closed value set (`firstTimeProfessionType`,
  `extensionProfessionType`). No condition in this document uses `notEquals`
  or `equals` against a sentinel default (empty string, zero) on an optional
  field.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms the exact
requiredness Migrationsverket enforces on its live e-service equivalent
(the form itself notes "Your employer can initiate the permit application
at www.migrationsverket.se"), and whether that e-service exposes fields
this paper-form sourcing does not — recording the outcome here, shipping a
new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Test run

A mock
`conformance/se/migrationsverket/work-permit-application/1.0.0/application-packet.json`
scenario (Priya Nair, a first-time applicant and software engineer offered
a backend-developer role at a Stockholm tech company, not registered in the
Swedish Population Register and therefore covered by a private comprehensive
health policy, receiving a monthly housing allowance in addition to salary)
was checked with a from-scratch Node.js script
(`/tmp/gov2070-mig149011/check_conformance.mjs`, not committed to the
repository) re-implementing this document's own `required`/`requiredWhen`
condition grammar (GSP-0013: `equals`/`notEquals`/`in`/`greaterThan`/
`lessThan`/`all`/`any`/`not`). Result: **0 errors** across all 143 fields (45
collected, 10 conditionally-gated fields correctly marked not-applicable,
the remainder genuinely optional and left blank) and all 13 documents (6
provided, 7 correctly marked not-applicable), with every conditionally-gated
field and document accounted for exactly once. Four mutation tests confirmed
the condition grammar fires correctly in both directions:

1. Setting `passportType` to `other` correctly required `otherPassportType`.
2. Switching `applicationCategory` to `extension` correctly required
   `extensionProfessionType`.
3. Setting `hasResidencePermitInOtherCountry` to `true` correctly required
   `residencePermitOtherCountry`.
4. Setting either `firstTimeProfessionType` or `extensionProfessionType` to
   `artist` correctly required `documents[].artistContract` in both cases
   (confirming the document's `any`/`all` composed condition spans both the
   first-time and extension paths), while the baseline "other profession"
   scenario correctly left it not required; setting
   `applyingForPermanentResidence` to `true` correctly required
   `documents[].permanentResidenceSupportingDocuments`.

The schema was also validated against the GovSchema v0.3 meta-schema with
`tools/validate-ajv.mjs` (pass, 321/321 documents) and `tools/validate.mjs`
(pass, 321/321 documents), after regenerating
`tools/govschema-client/registry-index.json` via `npm run build-index`.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
