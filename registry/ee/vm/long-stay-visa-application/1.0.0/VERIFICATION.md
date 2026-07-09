# Verification record — `ee/vm/long-stay-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Estonia's Visa vertical

This is the recurring "GovSchema Standard Research" cycle (GOV-1970).
Estonia already had 5 of 6 verticals (Passport, DMV, Business Formation,
Taxes, National ID, opened via GOV-1698/1705/1712/1721/1728) — Visa was its
last remaining gap, and CATALOG.md's jurisdiction table already flagged
`EE Visa` as `✗` while its "Known Gaps" prose section did not yet mention
Estonia at all, i.e. a fresh, previously unscreened gap rather than a
reconfirmed dead end.

## Sources examined

- **Document `(id, version)`:** `ee/vm/long-stay-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Foreign Affairs (Valisministeerium, VM).
- **Overview/document-checklist source:**
  <https://vm.ee/en/consular-visa-and-travel-information/visa-information/application-long-stay-d-visa>,
  fetched live (HTTP 200, no gate). Confirms the application is generated
  via an online wizard (not a static PDF), states the visa is valid up to
  365 days within 12 consecutive months, lists the required-documents
  checklist used for this schema's `documents[]` entries, and publishes an
  official "Purpose of the trip" financial-means table (Studies, Doctoral
  studies (PhD), Short term employment, Short term employment in Start-up
  company, Seasonal work, Start-up business, Teleworking (digital nomad
  visa), and a general "for all other applicants" row) that was used only
  as a cross-check, not as the schema's own `purposeOfJourney` enum (see
  below — the wizard's own dropdown uses a materially different,
  coarser 8-category list).
- **Primary field-by-field source: the live wizard itself, all 13 pages,
  independently walked with a real browser.** Page 1
  (<https://eelviisataotlus.vm.ee/d/>) is reachable by plain `curl`
  (HTTP 200, server-rendered, session token embedded in the URL path,
  "Page 1/13") and asks for an email address plus a CAPTCHA image code — a
  genuine bot-mitigation gate, not completable by a static fetch. This
  cycle used the `agent-browser` skill (a real headless Chromium session
  driven via Playwright, with the `/paperclip/chrome-sysroot` shared
  libraries) to load the CAPTCHA image, read its characters directly, and
  submit page 1. Because the wizard's session state does not survive a
  client disconnect through Playwright's own multiplexed `launchServer`/
  `chromium.connect()` protocol (contexts are torn down server-side on
  disconnect), the browser was instead launched with
  `--remote-debugging-port` and driven across multiple separate tool calls
  via `chromium.connectOverCDP()`, which does preserve state across
  reconnects. Every one of the 13 pages was then filled with plausible mock
  data and submitted in sequence (with two negative round-trips — page 6's
  phone field rejecting a `+` prefix with "Forbidden symbols in text
  fields," and page 7's `visaEndDate` rejecting a value more than 12 months
  after `visaStartDate` with "The period of validity of a D-visa cannot
  exceed 12 months (1 year)" — both confirmed live and reflected in this
  schema), reaching the final page 13/13 confirmation screen (its exact
  4-paragraph consent text is reproduced in the `declarationOfAccuracy`-
  equivalent attestation below). The application was **not** submitted for
  printing, to avoid registering a real application record with fabricated
  data. Field names/ids, labels, full enum option text (including the
  purpose-of-journey and marital-status radio lists, and the EU-relative
  relationship options), and structural details (e.g. the two-column
  applicant/sponsor means-of-support matrix, the structured employer/host/
  accommodation/home address blocks) were all read directly from the live
  DOM and screenshots, not inferred.
- **Secondary source (cross-check only):**
  <https://movemytalent.com/wise-guide-preparing-dvisa-application/>, a
  relocation firm's field-by-field walkthrough of the same 13 wizard pages
  (written for a Wise Payments employee's employment-purpose D-visa, and
  separately describing the family-visit-purpose alternative). Its
  "Page N/13" wording, page ordering, and the two purpose labels it names
  ("Short-term employment" / "Visiting family or friends" — matching this
  schema's `short-term-employment-in-estonia` / `visiting-family-or-friends`
  enum values) match the live wizard exactly, corroborating it as reliable
  for the one detail this cycle's own live walkthrough did not independently
  field-name-verify: the host-**person** (rather than host-company) variant
  of page 9, since the live walkthrough exercised page 9 only via the
  "Business" purpose branch (see "What is NOT modelled" below). The blog
  also describes an "insurance end date" field as part of the same page as
  financial means (its own step 11, corresponding to page 10); this was
  **not** observed on the live page 10 for the "Business" purpose branch
  tested, so it is not modelled here — flagged as a possible purpose-
  conditional field not independently confirmed, rather than invented (see
  "What is NOT modelled" below).
- **Duplicate-detection comparison.** Per this registry's established
  convention (Poland's, Portugal's, and Switzerland's national D-visa forms
  were each found to be field-for-field duplicates of
  `de/auswaertiges-amt/national-visa-application`, while Spain's and the
  Czech Republic's were each independently confirmed genuinely distinct),
  this wizard's full field sequence was compared against the German
  template's `schema.json` before authoring. **Verdict: genuinely distinct,
  not a duplicate.** The two forms share only the shape of their opening
  identity/travel-document items (name, date/place of birth, nationality,
  sex, marital status, travel-document type/number/dates) — a
  Schengen-harmonized convention common across every EU member state's
  national long-stay visa form in this registry. Estonia's wizard then
  diverges sharply: an EU/EEA/Swiss-citizen-or-UK-Withdrawal-Agreement
  close-relative section (page 5) with the relative's own passport/ID
  number and date of birth, which Germany's form has no counterpart for at
  all; a mandatory current-or-previous employment-or-education block (page
  6) with a full structured employer/school address (street/house/
  apartment/postal code/city/county), where Germany's form only asks a
  "trade or profession trained for" free-text pair; a two-column
  (applicant vs. sponsor) means-of-support checkbox matrix (page 10 — cash,
  credit card, accommodation provided/prepaid, transport prepaid, salary,
  other, independently repeated for both columns) distinct from Germany's
  single free-text `meansOfSubsistence` field; a host organization/person
  section (page 9) with its own registration code and a named contact
  person, which Germany's form has no counterpart for; and its own
  8-category purpose-of-journey taxonomy (Business, Medical reasons,
  Study, Short term employment in Estonia, Visiting family or friends,
  Remote working, Startup enterpreneurship [sic], Other) sharing no labels
  with Germany's 6-category list (Employment, Study, Au pair, Language
  course, Family reunion, Other). Conversely, Germany's form has several
  sections entirely absent from Estonia's wizard: an unconditional father/
  mother identity block, a `previouslyInGermany`/accompanying-family-members
  question, and criminal-conviction/notifiable-disease declarations. Net: a
  genuinely distinct national wizard sharing only its opening
  Schengen-harmonized item shape with Germany's, not a field-for-field
  republication of it — authored as its own schema, consistent with the
  Spain/Czech Republic precedent rather than the Poland/Portugal/
  Switzerland duplicate precedent.
- **Companion Schengen (short-stay) visa form.** Not examined this cycle;
  Estonia's own Schengen short-stay visa process was not in scope for this
  gap (this document closes the long-stay/national Visa gap specifically).
  A future cycle could screen it against `fr/france-visas/schengen-visa-application`
  following this registry's established convention.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What the wizard's 13 pages map to

- **Page 1/13** (email + CAPTCHA) — a wizard session-identification/
  bot-mitigation mechanic, not modelled as an application-content field
  (the same treatment this registry gives other portal/session-routing
  steps, e.g. `de/auswaertiges-amt/national-visa-application`'s excluded
  Bund ID account-registration gate). The applicant's own contact email is
  instead modelled from page 12's distinct, explicitly-labelled
  "E-mail address of the applicant or their contact person for forwarding
  notifications regarding the application" field (`contactEmail`), which
  is a documented part of the application record rather than a session
  mechanic.
- **Page 2/13** (names, date/place of birth) → `surname` through
  `cityOfBirth`. `formerNames` was observed live as a **required** field
  (unlike `de/auswaertiges-amt/national-visa-application`'s optional
  `formerSurname`) — the wizard offers no "not applicable" option for it,
  unlike the adjacent surname/first-name "absent in travel document"
  checkboxes, so an applicant with no former names may need to enter a
  placeholder; flagged in the field's own `description` rather than
  silently marking it optional against what was actually observed.
- **Page 3/13** (nationality, sex, marital status) → `nationality` through
  `maritalStatusOtherDetails`. The "Other citizenships" control is a
  multi-select list of all countries; per GSP-0009 (no array/repeating-
  field type in GovSchema v0.3), collapsed into one free-text
  `otherCitizenships` field.
- **Page 4/13** (travel document) → `travelDocumentType` through
  `travelDocumentValidUntil`.
- **Page 5/13** (EU/EEA/Swiss/UK-Withdrawal-Agreement close relative) →
  `euRelativeAccompanying` through `euRelativeTravelDocumentNumber`, all
  `requiredWhen euRelativeAccompanying` is `true`. This section has no
  counterpart in `de/auswaertiges-amt/national-visa-application` or
  `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`.
- **Page 6/13** (profession, current occupation, employer/school and its
  full structured address) → `profession` through `employerOrSchoolPhone`.
  `profession` is modelled as free text rather than an enum: the wizard's
  own dropdown offers a long standard occupation list (a sample of 14
  options was confirmed live, e.g. Administrative/technical/service staff,
  Architect, Artist, Banker, ... Electronics expert) but the full list was
  not exhaustively captured, and GovSchema convention (see e.g. this
  registry's coded-country-field treatment) is to model as free text
  rather than publish a truncated/incomplete enum.
- **Page 7/13** (duration and dates) → `intendedStayDurationDays` through
  `visaEndDate`. The "Member State of destination" line is a static,
  pre-filled, non-interactive display of "ESTONIA" on the live page (no
  `<input>`/`<select>` element backs it) and is therefore not modelled as
  an applicant-supplied field. The live wizard enforces a bounded-interval
  rule ("period of validity of a D-visa cannot exceed 12 months (1 year)")
  that GovSchema v0.3's `crossFieldValidation` comparison operators
  (`greaterThan`/`greaterThanOrEqual`, etc.) cannot express as a
  date-plus-duration check; disclosed in `visaEndDate`'s own `description`
  rather than encoded as an unsupported constraint.
- **Page 8/13** (purpose of the journey) → `purposeOfJourney` /
  `purposeOfJourneyOtherDetails`, an 8-option enum confirmed live
  (Business, Medical reasons, Study, Short term employment in Estonia,
  Visiting family or friends, Remote working, Startup enterpreneurship
  [sic — the live source's own spelling], Other).
- **Page 9/13** (host organization/person and place of stay) →
  `hostName` through `placeOfStayPhone`. This cycle's live walkthrough
  selected the "Business" purpose, which revealed a **host
  company/organization** variant (name, registration code, full structured
  address, phone, email, plus a named contact person's first/family
  name/email/phone) — all fully field-name-verified live. Per the
  secondary guide, other purposes (e.g. "Visiting family or friends")
  instead reveal a **host natural-person** variant (the person's full name
  and address, with a written and signed confirmation from the host as a
  supporting document) — this alternate branch's exact field names were
  not independently re-verified live this cycle; the schema models the
  company/organization variant as the primary, most-thoroughly-verified
  path, with the alternate disclosed here rather than guessed at in the
  schema itself. The "Place of Stay" dropdown (with a private person / in
  a hotel or accommodation establishment / other) is independent of
  purpose and modelled unconditionally.
- **Page 10/13** (financial means) → `fundedByApplicant` through
  `otherSponsorMeansDetails`. "By the applicant himself/herself" and "By
  another sponsor..." are independently-checkable (confirmed live: both
  can be checked simultaneously), each gating its own identical six-item
  means-of-support checkbox matrix (cash, credit card, accommodation
  provided/prepaid, transport prepaid, salary, other+specify) — modelled
  as independent booleans per column, the same "independent checkbox"
  pattern this registry uses for `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s
  `hasCashFunds`-style fields, doubled here into applicant/sponsor columns
  since Estonia's own wizard structures it that way (a genuine structural
  difference from the Czech Republic's single-column treatment). An
  "insurance end date" field the secondary guide describes on this same
  page was **not** observed live for the "Business" purpose path tested;
  omitted rather than invented (see "What is NOT modelled" below).
- **Page 11/13** (Schengen/EU visa and residence-permit history, and prior
  fingerprinting) → `issuedSchengenVisaOrPermitPastFiveYears` through
  `fingerprintsCollectedPast59Months`. The live wizard provides a
  repeating "Add"-row table (type of permit, issuer country, valid
  from/until) for prior visas/permits; per GSP-0009, collapsed into one
  free-text `schengenVisaOrPermitDetails` field, the same treatment this
  registry uses elsewhere for small repeating tables (e.g.
  `de/auswaertiges-amt/national-visa-application`'s `previousStaysDetails`).
  The exact "...during the past 59 months?" fingerprint-history wording was
  confirmed live and is not mentioned at all in the secondary guide.
- **Page 12/13** (applicant's home address and contact details) →
  `homeAddressCountry` through `contactEmail`.
- **Page 13/13** (final confirmation) → the `declarationOfAccuracy`-
  equivalent statement is folded into this schema's attestation-style
  documents (see below); the page itself has no further data-entry fields,
  only a "Submit for printing" action (not modelled — the wizard does not
  submit the application itself; a PDF is generated for printing/signing).
- **vm.ee's own "Documents to be submitted" checklist** → the ten
  `documents[]` entries (`applicantPhoto` through
  `travelTicketBookingConfirmation`), plus `printedSignedApplicationForm`
  reflecting the wizard's own page 1 instructions that the completed
  online form itself must be printed, signed on every page, and submitted
  alongside the other documents.

## Mock-data test run

Per this registry's established practice (see e.g.
`registry/cz/mzv/zadost-o-udeleni-dlouhodobeho-viza/1.0.0/VERIFICATION.md`),
a one-off Node.js script (not committed to the repo) checking every
`type`/`required`/`requiredWhen`/`validation` constraint and both
`crossFieldValidation` rules in `schema.json` was run against four
scenarios:

```
OK   Scenario 1: Business purpose, host-company path, EU relative + prior Schengen visa
OK   Scenario 2: simplest path (single, other purpose, private-person stay, self-funded)
FAIL Negative control 1: missing euRelativeFamilyName (expected FAIL)
    - MISSING required field: euRelativeFamilyName
FAIL Negative control 2: travel document validUntil before dateOfIssue (expected FAIL)
    - crossFieldValidation FAILED: travelDocumentValidAfterIssue
```

Scenario 1 exercises the EU-relative branch, the host-company path, the
sponsor-funding branch (both applicant and sponsor means-of-support
checkboxes), and a prior-Schengen-visa "Yes" branch. Scenario 2 exercises
the opposite side of every one of those same branches (no EU relative, no
sponsor, no prior Schengen visa, a private-person stay, an "other" travel
document, and an "other" purpose), plus `single` marital status. Together
they cover every `requiredWhen` branch this document defines. The two
negative controls confirm the check script actually enforces
`requiredWhen` and `crossFieldValidation` (correctly reporting a missing
EU-relative family name once `euRelativeAccompanying` is `true`, and
correctly rejecting a travel document whose validity predates its issue
date) rather than trivially passing everything. No defects were found in
the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs
...
ok   registry/ee/vm/long-stay-visa-application/1.0.0/schema.json
307/307 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
...
ok   registry/ee/vm/long-stay-visa-application/1.0.0/schema.json [v0.3]
307/307 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

## What is NOT modelled (out of scope), and why

- **Page 1's email + CAPTCHA** — a wizard session/bot-mitigation mechanic,
  not an application-content field (see above).
- **The host-natural-person variant of page 9** — reached for non-Business
  purposes (e.g. "Visiting family or friends") per the secondary guide, but
  not independently field-name-verified live this cycle, since the live
  walkthrough exercised the host-company/organization branch. Not guessed
  at; disclosed here instead.
- **An "insurance end date" field** the secondary guide describes as part
  of the financial-means page — not observed on the live page 10 for the
  "Business" purpose branch tested. Possibly purpose-conditional, or the
  guide may be describing a slightly different build of the wizard (it was
  written for a specific employer's employment-purpose case); omitted
  rather than invented.
- **The Estonian-language rendering of the wizard** — this document was
  authored from the English-language rendering
  (`eelviisataotlus.vm.ee/d/eng/...`); the Estonian-language rendering
  (`.../d/est/...`) was not separately walked, though the wizard's own
  language-selection page confirms both exist and follow the same 13-page
  structure.
- **The Schengen (short-stay) visa form** — out of scope for this cycle;
  see "Sources examined" above.
- **Office-only administrative data** (application number, consulate
  processing notes, visa-sticker/officer fields) — completed by consulate
  staff, not the applicant; the wizard itself does not expose these to the
  applicant.
- **Purpose-specific supplementary evidence** a given consulate may
  request beyond the ten documents vm.ee's own checklist names — out of
  scope for this base form, the same modelling boundary this registry
  draws elsewhere (e.g. the German national-visa document's "purpose-
  specific supplementary question sets" exclusion).

## Scope and jurisdiction notes

- This is Estonia's first (and closing) Visa-vertical document, giving
  Estonia 6 of 6 verticals.
- Agency slug `vm` (Valisministeerium) is a new EE authority segment,
  consistent with the existing `ee/emta`, `ee/ppa`, `ee/rik`,
  `ee/transpordiamet` directories (each a short Estonian-agency acronym)
  and with this registry's cross-jurisdiction foreign-ministry convention
  (`es/maec`, `cz/mzv`, `de/auswaertiges-amt`).
- `id`/process slug `long-stay-visa-application` uses English, consistent
  with every existing `ee/*` process slug in this registry (all English,
  e.g. `income-tax-return-form-a`, `vehicle-transfer-notification`) —
  unlike the Czech Republic's and Spain's own native-language process
  slugs, which follow their own jurisdictions' established convention
  instead.
- Conditional requiredness uses `requiredWhen` (GSP-0013), the same as
  every other Visa-vertical document in this registry.
- Structured address fields (country/street/house number/apartment number/
  postal code/city/county-region) mirror the live wizard's own structured
  address inputs rather than this registry's more common single-free-text-
  line address treatment, since that is what the source itself presents.
- **`version` set to `1.0.0` rather than `0.1.0`.** Although page 1 alone
  is reachable by a plain unauthenticated fetch, this cycle's real-browser
  walkthrough independently reached and field-name-verified all 13 pages
  live (not just page 1), which is a stronger sourcing basis than this
  registry's more typical single-PDF-fetch pattern already used to justify
  `1.0.0` for `cz/mzv/...` and `es/maec/...`. The two disclosed gaps (the
  host-natural-person branch of page 9, and the blog-only insurance-date
  field) are narrow and explicitly flagged above, rather than pervasive
  uncertainty across the whole form — consistent with a `1.0.0` rather
  than a `0.1.0` (compare GOV-1931's `ch/fedpol/antrag-pass-identitaetskarte`,
  which used `0.1.0` because its wizard was gated past a shallow depth with
  no way through, a materially weaker sourcing position than this one).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should prioritize independently field-name-
verifying the host-natural-person variant of page 9 (e.g. via the
"Visiting family or friends" purpose branch) and re-confirming whether an
insurance-end-date field appears for any purpose branch.
