# Verification record — `jo/cspd/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2739**. This schema **opens
Jordan's Passport vertical (2 of 6)**, following the prior cycle's
(**GOV-2731**) opening of Jordan as the registry's 49th jurisdiction via its
Taxes vertical.

## Vertical scouting (this cycle)

Jordan's 5 remaining verticals (DMV, Business Formation, Passport, Visa,
National ID & Civic Documents) were scouted in parallel this cycle via 4
independent research passes, each doing real web search and direct fetches
(not guesses):

- **Business Formation — DEAD END.** The Companies Control Department (CCD)
  publishes no fillable registration PDF. `www.ccd.gov.jo` itself returns
  HTTP 451 to a direct fetch; a Wayback capture of its LLC-registration
  service-description PDF confirms the form is submitted entirely online at
  `portal.ccd.gov.jo`, which exposes only `/account/login` and
  `/account/companylogin` — no guest/unauthenticated "new application" path.
  A `usermanual.pdf` on the same portal (1,158,484 bytes, HTTP 200) describes
  the e-registration wizard at category/step level only (no field-by-field
  labels or widget list). No paper/PDF form exists.
- **DMV — DEAD END.** The Drivers and Vehicles License Department (DVLD) is
  unreachable at every domain tried this cycle (`www.dvld.gov.jo`,
  `dvld.gov.jo`, `eservices.dvld.gov.jo`, and the Land Transport Regulatory
  Commission's `form.jordan.gov.jo`/`portal.jordan.gov.jo` service pages all
  timed out). The one reachable candidate, `https://www.gsc.jo/Doc/dll.pdf`
  (HTTP 200, 252KB), is a flat "Required Documents" checklist with no
  `/AcroForm` dictionary — a service-window document list, not an
  application form. DVLD's licensing process is in-person/e-portal-only.
- **National ID & Civic Documents — DEAD END.** CSPD's own smart ID card
  service-guide page (`cspd.gov.jo/EN/ListDetails/Services__Guide/45/20`)
  states the ID card application form is obtainable only in person, and
  requires in-person biometric capture (fingerprints, iris) — no downloadable
  form. Jordan's voter registration (Independent Election Commission,
  `iec.jo`/`entikhabat.jo`) has no applicant-facing registration form at all
  — election cards are auto-generated for every citizen 18+ directly from the
  CSPD civil-status database.
- **Visa — open candidate, not selected.** A genuine 23-field AcroForm
  ("Visa Application for US & EU countries," a Jordanian embassy's own form)
  was found and independently re-verified via `pdfjs-dist`, but only hosted
  on third-party visa-expediting mirrors (`traveldocument.com`,
  `traveldocs.com`), not a first-party Jordanian government domain. Per this
  registry's source-of-truth-fidelity practice, this Passport candidate
  (fetched directly and unauthenticated from CSPD's own `cspd.gov.jo` domain)
  was preferred instead. The embassy-visa-form candidate is left as an open,
  well-sourced backlog item for a future cycle if a first-party government
  mirror can be located, or if the third-party-hosted copy is judged
  acceptable after review.
- **Passport — STRONG CANDIDATE, selected.** See below.

## Source verification (independently re-derived, not copied from the scouting pass)

- **PDF source:**
  `https://www.cspd.gov.jo/ebv4.0/root_storage/en/eb_list_page/passport.pdf`
  — fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **322,949 bytes**,
    `Last-Modified: Tue, 15 Feb 2022 08:16:34 GMT`.
  - **`sha256`:**
    `5ce6f4c47e42b2ac89914c98fcf3bd1a61bcfeb6ce3322fb5ccce9251d7aa4f4`
    (computed via `sha256sum` on the freshly-downloaded file).
  - No Cloudflare/JS-challenge/WAF block — a benign `TS...` session cookie is
    set alongside the 200, consistent with a normal load-balancer, not a
    bot-mitigation gate.
  - Domain `cspd.gov.jo` (Civil Status and Passports Department, under the
    Ministry of Interior) is the correct, official first-party agency for
    Jordanian passports.

## PDF structure, independently confirmed via `pdfjs-dist@3` (legacy build) + `node-canvas`

- **2 pages**, a plain print-and-fill specimen: `page.getAnnotations({intent:
  "display"})` returned **zero Widget-subtype annotations on both pages** —
  a genuine non-AcroForm specimen, confirmed rather than assumed (the initial
  scouting pass had speculated a "checkbox-style" Passport Application Type
  selector; this independent re-derivation corrects that — see below).
- `getTextContent()` returned a full, clean, English-only text layer on both
  pages. Every text item's `(x, y)` transform was grouped by rounded
  `y`-coordinate into rows and sorted by `x` to reconstruct the source's own
  line breaks and column layout.
- **Page-image cross-check** (`pdfjs-dist` + `node-canvas`, 2x scale, with
  the bundled `standard_fonts/` data supplied via `standardFontDataUrl` —
  without it, this specimen's non-embedded base fonts render every glyph
  blank, a gotcha worth flagging for future PDF-image renders that come back
  looking empty): confirmed the form's own table/box layout matches the
  text-row transcript, and resolved one structural question the transcript
  alone left ambiguous — **"Passport Application Type" is a plain blank
  dotted line** (`………………………`), not a checkbox/radio control as an earlier,
  text-only-based scouting pass had guessed. This is disclosed and corrected
  here rather than silently carried forward.
- **Page 2 confirmed entirely "For Department Use Only"** via both the text
  transcript and the rendered image: Passport Data in case of Renewal (Old
  Passport Info., Acceptance Officer Explanations), Employee's Seal and
  Signature, and a staff table (Acceptance Officer, Passport Fees, Current
  Passport No., Archiving Officer, Office Secretary) — no applicant-fillable
  content, excluded from `fields[]` consistent with this registry's
  established convention for office-use-only sections.

## Field derivation

**Page 1** (applicant-facing) — header (Form No. PASS-ALL-01; Ministry of
Interior; Civil Status and Passports Department; Passport Application Type
blank line); Application Office; "Concerned Person's Data" (National/
Personal No., Location of the Concerned Person, Full Name in English —
First/Father/Grandfather/Family, Place of Birth, Date of Birth, Mother's Name
in English), followed by "Attention" explanatory prose about the
Department's own English-name-resolution policy (not a field — informational
only, not an instruction to supply a document); "Husband/ Wife Data"
(National/Personal No., Name In English — First/Father/Grandfather/Family);
"In case the concerned person holds Bridge crossing cards" (Card Type, Card
Code and No.); "Applicant Data if the application is submitted by other than
its holder" (Relationship, National/Personal No., Name and Signature); and
the closing Declaration (its own attestation sentence, Name and Signature,
Phone No.).

Every printed applicant-facing field was mapped to one of this schema's 21
`fields[]` entries or its 1 `documents[]` entry. See the schema's own
`sourceRef` on each field for the exact page/section/label it was read from.

## Scoping and modeling judgment calls

- **`passportApplicationType` modeled as free text:** the specimen prints no
  options — just a blank dotted line — so it is modeled as an unconstrained
  string rather than an invented enum (e.g. first-time/renewal/replacement),
  consistent with this registry's established precedent for unprinted-option
  fields (`jo/istd/pit-return-employee`'s `familyStatus`).
- **Husband/Wife Data, Bridge-crossing-card, and Applicant-Data
  (representative) blocks modeled fully optional:** the specimen prints no
  explicit yes/no gate ahead of any of these three blocks (unlike, e.g.,
  fields gated by an explicit printed checkbox elsewhere in this registry).
  Disclosed here rather than inventing a `requiredWhen` gate the source
  doesn't have — matching the same judgment call made for
  `jo/istd/pit-return-employee`'s end-of-service-indemnity/National
  Contribution blocks.
- **"Name and Signature" columns modeled as plain `string` fields:** the form
  prints these as a single fillable blank/column (not a digital-signature
  capture widget), so both `representativeNameAndSignature` and
  `declarantNameAndSignature` are modeled as text, per this registry's
  established precedent (`jo/istd/pit-return-employee`'s
  `taxpayerOrAgentNameAndSignature`).
- **`dateOfBirth` typed `date`:** the specimen prints a genuine date-of-birth
  field (day/month/year), distinct from `jo/istd/pit-return-employee`'s
  year-only `taxPeriod`, which is why this field uses the schema's `date`
  type rather than a pattern-constrained string.
- **"Attention" prose excluded:** the paragraph explaining how CSPD resolves
  an applicant's English name (from a prior ID card, or its own
  e-dictionary) is instructional text about departmental process, not an
  applicant-fillable field or a document the applicant must supply —
  excluded from both `fields[]` and `documents[]`.
- **Page 2 "For Department Use Only" block excluded:** consistent with this
  registry's established precedent for office-use-only sections (e.g.
  `jo/istd/pit-return-employee`'s "For Official Use" block,
  `rw/rra/vrf-e06-motor-vehicle-registration-form`'s "For RRA Use Only"
  section).

## Conformance run

Two hand-authored valid fixtures under
`conformance/jo/cspd/passport-application/1.0.0/`:

- **`valid-first-time-self-filed.json`** — a single applicant filing for
  themself, no spouse, no bridge-crossing card, no representative —
  exercising the schema's minimal required-field path.
- **`valid-renewal-by-representative-with-bridge-card.json`** — a renewal
  filed by a representative (brother) on the concerned person's behalf,
  exercising the optional spouse block, the optional bridge-crossing-card
  block, and the optional representative block all at once.

Four mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-application-office.json`** — drops
  `applicationOffice` (static `required: true`) from the self-filed valid
  fixture.
- **`mutation-control-missing-concerned-person-national-id.json`** — drops
  `concernedPersonNationalId` (static `required: true`).
- **`mutation-control-missing-declarant-phone-no.json`** — drops
  `declarantPhoneNo` (static `required: true`).
- **`mutation-control-invalid-date-of-birth.json`** — sets `dateOfBirth` to
  `"not-a-date"`, violating the field's `date` type.

All six fixtures were checked with a from-scratch Node conformance checker
(`check-conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`type`(`date`)/`validation.enum`/`validation.pattern` grammar
directly:

```
$ node check-conformance.mjs schema.json conformance/jo/cspd/passport-application/1.0.0
PASS mutation-control-invalid-date-of-birth.json: expected 1 error(s), got 1 -> invalid date for dateOfBirth: not-a-date
PASS mutation-control-missing-application-office.json: expected 1 error(s), got 1 -> missing required field: applicationOffice
PASS mutation-control-missing-concerned-person-national-id.json: expected 1 error(s), got 1 -> missing required field: concernedPersonNationalId
PASS mutation-control-missing-declarant-phone-no.json: expected 1 error(s), got 1 -> missing required field: declarantPhoneNo
PASS valid-first-time-self-filed.json: expected 0 error(s), got 0
PASS valid-renewal-by-representative-with-bridge-card.json: expected 0 error(s), got 0
```

All four negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the schema document and pass:

```
$ node tools/validate.mjs registry/jo/cspd/passport-application/1.0.0/schema.json
ok   registry/jo/cspd/passport-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jo/cspd/passport-application/1.0.0/schema.json
ok   registry/jo/cspd/passport-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client/` dependencies were restored via `npm ci
--include=dev` (no separate `npm install <pkg> --no-save` was run inside
this directory this cycle — the scratch `pdfjs-dist`/`canvas` install for
PDF extraction was done in an isolated `/tmp` scratch directory instead,
avoiding this registry's documented `ajv`/`ajv-formats`-wipe gotcha
entirely).

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Jordan's **Passport vertical (2 of 6)**. Business Formation, DMV,
  and National ID & Civic Documents are confirmed dead ends this cycle (see
  above); Visa has one well-sourced but third-party-hosted candidate left as
  open backlog.
- `jurisdiction.level` is `national` — CSPD is Jordan's national civil-status
  and passports authority, under the Ministry of Interior.
- `process.type` is `application`, matching this form's own nature as a
  single coded specimen covering first-time issuance, renewal, and
  replacement.
- `process.language` is `en`: this specimen's full text layer is entirely in
  English (CSPD's own English-language distribution of the form); an
  Arabic-language original/parallel edition was not located this cycle and
  is disclosed as an open gap rather than assumed identical in structure.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming whether an
Arabic-language original of this form exists and, if its structure differs,
whether a companion schema is warranted; (2) re-attempting Jordan's Business
Formation and DMV verticals if a bot-mitigation-workaround technique or a
newly published paper form is found; (3) revisiting the Visa candidate
(embassy-issued 23-field AcroForm, currently only found on third-party
visa-expediting mirrors) if a first-party Jordanian government host can be
located.
