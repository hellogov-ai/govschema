# Verification record — `bd/dip/machine-readable-visa-application-form` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2675** (child issue
**GOV-2677**). It opens **Bangladesh's Visa vertical (4 of 6)**, using the
Department of Immigration and Passports' (DIP) "Machine Readable Visa
Application Form" (D.I.P Form-4). Bangladesh's DMV, Taxes, and Passport
verticals are already published.

## Candidate scouting (this cycle)

Three candidates were scouted in parallel this cycle: Bangladesh Business
Formation (via RJSC's company-incorporation forms), Bangladesh Visa (this
schema), and Greece's Passport vertical. Bangladesh Visa was the strongest:
an official government-portal PDF with a clean text layer, independently
corroborated by a byte-near-identical embassy mirror. RJSC's incorporation
forms were a viable but weaker candidate (the numbered forms themselves are
only mirrored on a third-party legal-services site, not served directly from
`rjsc.gov.bd`/`app.roc.gov.bd`, though the official RJSC FAQ page corroborates
their content) — left as an open backlog candidate for a future cycle.
Greece's Passport vertical is a confirmed weak/likely-dead-end candidate:
the application process is strictly in-person at Hellenic Police stations,
and the only downloadable artifact is a non-fillable scanned specimen image
(zero AcroForm/text layer); the online `myPhoto` adjunct is SSO-gated and
photo-only. Not pursued.

## Source verification (independently re-derived, not copied from the scouting pass)

- **Source PDF:** `https://visa.gov.bd/Img/MRV_FORM.pdf` — fetched
  independently this cycle via a plain `curl` (no TLS-verification workaround
  needed, unlike several other Bangladesh government hosts already in this
  registry):
  - **HTTP 200**, `Content-Type: application/pdf`, **124451 bytes**.
  - **`sha256`:**
    `fb2d675a5a98f7ed9a06a11699cdf426cb6a8a26d34ca1c2da89fd58fa353f7d`
    (computed via `sha256sum` on the freshly-downloaded file).
- **Corroborating mirror:** `https://www.bangladeshembassy.org.sa/downloads/visa_Form.pdf`
  — also independently fetched this cycle: **HTTP 200**,
  `Content-Type: application/pdf`, **124473 bytes**,
  sha256 `2c3701d45a47600eb44b1fc6dc0254812d82fcc11b3b8ed740f1842a242f38f2`.
  Not byte-identical to the primary source (22-byte difference), consistent
  with an embedded metadata/producer-string difference between two
  independently-hosted copies of the same form, but the near-identical byte
  size and matching page content confirm this is genuinely the same DIP
  Form-4, not a coincidentally similar document.
- Parsed the downloaded PDF with `pdfjs-dist@3.11.174` (legacy build),
  installed fresh in a scratch directory (not a repo dependency):
  - `getFieldObjects()` returned **`null`** — **no AcroForm**.
  - `getAnnotations()` returned **0** for every one of the 4 pages — a plain
    print-and-fill document, not a fillable form.
  - `getTextContent()` returned a full, clean **English** text layer across
    all 4 pages: 1259 / 1309 / 1093 / 1278 characters (4939 total).
  - Every field below was extracted directly from this text layer;
    `sourceRef` citations quote the source's own item numbers and printed
    labels verbatim.
  - Grepped the full extracted text for the `*` character (a common
    required-field marker in this registry's other Bangladesh-sourced forms,
    e.g. `bd/dip/e-passport-application-form`): **zero occurrences**. This
    form prints no required-field asterisks or other requiredness markup
    anywhere.

## Form structure and scoping decision

This is a single physical 4-page form reused across five distinct
application pathways, selected by which section the applicant fills in:

- **Page 1:** Personal Details (items 1-10), Travel Document Details (items
  11-20), Payment Details (items 21-24) — common to every pathway.
- **Page 2:** New Visa (items 25-28), Extension of Visa (items 29-38), No
  Visa Required/NVR (items 39-50), Transit/On Arrival Visa (items 51-56).
- **Page 3:** a shared supporting-document Check List, a Declaration
  statement + Place/Date/Signature line, a Police Verification block, and a
  "For Official Use" block.
- **Page 4:** General Instructions (photograph spec, fee non-refundability,
  submission process) — informational only.

### In scope (36 `fields[]` + 8 `documents[]` entries)

This v1.0.0 scopes to the **New Visa** pathway only — the pathway a
first-time foreign applicant uses to request a new Bangladeshi visa:
Personal Details, Travel Document Details, Payment Details, and the New
Visa section (items 25-28). This is the pathway matching this registry's
"Online VISA's to destination countries from origin countries" research
brief.

Checkbox-printed option groups with no AcroForm widget but an explicit,
exhaustive, mutually-exclusive printed option list are modeled as `enum`,
consistent with this registry's own `bd/dip/e-passport-application-form`
`gender` precedent (a printed option list is sufficient corroboration even
without a checkbox widget): `sex` (Male/Female/Others), `maritalStatus`
(Unmarried/Married/Widower-Widow/Divorced — "Widower/Widow" is printed as
one combined option), `purposeOfVisit` (9 options including an "Others
(Please Specify)" catch-all, gating `purposeOfVisitOtherSpecify` via
`requiredWhen`), and `intendedNumberOfEntries` (Single/Re-Entry/Multiple).

Fields with only a blank line and no printed option list (`typeOfPassport`,
`presentNationality`, `nationalityAtBirth`, `occupation`,
`durationOfProposedStay`) are modeled as free-text `string`, consistent with
this registry's `bd/brta`/`th/dlt` precedent of not inventing enum value
sets for blank lines with no printed options.

Item 23's "Amount deposited (Taka/ US\$)" prints its unit as a parenthetical
covering two possible currencies with no separate selector — the amount and
currency cannot be disentangled from a single printed blank, so no separate
currency field is modeled; `amountDeposited` is a plain `number`.

The Declaration statement (page 3) is modeled as an attestation document
(`declarationAttestation`), with its printed Place/Date companions modeled as
`declarationPlace`/`declarationDate` fields, mirroring this jurisdiction's
own `bd/dip/e-passport-application-form` and `bd/brta` precedent for modeling
a sworn declaration as an attestation document rather than a plain field.

Page 3's Check List (19 checkbox items shared by all five pathways) is
modeled for the subset applicable to a general New Visa applicant:
`passportCopyWithLastVisaAndArrivalPage` (required — universal), page 1's
photograph-placement box plus page 3's "Photo" checklist item, folded into
one `applicantPhotograph` document (required — universal), `paymentSlip`
(optional — some nationalities/purposes are visa-fee-exempt),
`recommendationLetterFromMinistryOrAuthority` (optional — typically
Official/Diplomatic/Business), `workPermit` (optional — Employment
purpose), `tradeLicenseOfSponsoringCompany` (optional — Business/Investment
purpose sponsored by a Bangladeshi company), and `otherSupportingDocument`
(a catch-all).

### Requiredness judgment call, disclosed

The source prints **no required-field asterisks or other requiredness
markup anywhere** (confirmed by the zero-occurrence `*` grep above), unlike
this jurisdiction's own `bd/dip/e-passport-application-form`. Given this
task's own instruction to base requiredness on the source, and finding none,
only fields **unconditionally essential to any visa request** are marked
`required: true`: applicant identity (`firstGivenName`, `lastSurname`,
`dateOfBirth`, `sex`, `placeOfBirth`, `presentNationality`), passport
particulars (`passportNumber`, `passportPlaceOfIssue`,
`passportDateOfIssue`, `passportDateOfExpiry`), and the requested visa's own
particulars (`purposeOfVisit`, `durationOfProposedStay`,
`tentativeDateOfArrival`, `intendedNumberOfEntries`). Every other field
(addresses, contact details, marital status, occupation, nationality at
birth, payment particulars, and previous-visit/previous-visa history) is
left optional. This is a disclosed judgment call, consistent with this
registry's own `bd/brta/motor-vehicle-registration-application` and
`th/dlt/vehicle-registration-application` precedent for source forms without
printed requiredness markup.

### Out of scope, disclosed

- **Extension of Visa (items 29-38), No Visa Required/NVR (items 39-50),
  Transit/On Arrival Visa (items 51-56)** — alternate uses of this same
  physical form for different applicant categories/processes, not the
  first-time New Visa request this v1.0.0 scopes to. Flagged as candidates
  for a future revision, not modeled here.
- **Check List items tied to specific applicant categories not modeled**:
  Marriage Certificate, Birth Certificate, a parent's/spouse's Visa or
  Passport Copy, an Affidavit, a No Objection Certificate from the Sri
  Lankan High Commission (nationality-specific), Income Tax
  Certificate/TIN/TIN certificate of a sponsoring company, a Bi-Lateral/
  Multilateral Agreement reference, Security Clearance/Security Certificate,
  and an Overstay payment slip — each tied to a specific applicant category
  (spousal dependents, a specific nationality, or a company-sponsored
  investor scenario) or to the NVR/Extension pathways this v1.0.0 excludes.
- **Police Verification block (page 3)** — completed by a Bangladeshi police
  Inquiry Officer during processing, not applicant-supplied.
- **"For Official Use" block (page 3)** — Reference No., Fee amount, Visa
  No./Date/Expiry, entry-type adjudication, and Authorized Signature — all
  completed by DIP/consular staff at issuance, not applicant-supplied.
- **Page 4 (General Instructions)** — informational prose (photograph
  specification, fee non-refundability, submission process), not a
  data-entry section.
- **No signature-only line modeled as a field.** The applicant's signature
  on page 3 has no adjacent fillable date sub-line of its own beyond the
  already-modeled `declarationDate`, consistent with this registry's
  established convention of not inventing a field for a bare signature line.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/dip/machine-readable-visa-application-form/1.0.0/`:

- **`valid-tourist-first-time-applicant.json`** — a first-time tourist
  applicant, single entry, minimal optional fields populated (no previous
  visit/visa history, no payment-particulars block).
- **`valid-business-returning-applicant.json`** — a returning business
  applicant exercising previous-visit/previous-visa fields, marital status,
  payment particulars, the declaration Place/Date companions, and the
  `tradeLicenseOfSponsoringCompany` document.

Both were checked with a from-scratch Node conformance checker
(`conformance-check.mjs`, not committed — a disposable script, per this
registry's own established practice) validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node conformance-check.mjs schema.json \
    valid-tourist-first-time-applicant.json \
    valid-business-returning-applicant.json
valid-tourist-first-time-applicant.json: 0 error(s)
valid-business-returning-applicant.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-first-given-name.json`** — drops
  `firstGivenName` (a static `required: true` field) from the tourist valid
  fixture.
- **`mutation-control-missing-passport-number.json`** — drops
  `passportNumber`.
- **`mutation-control-invalid-enum-sex.json`** — sets `sex` to
  `"Unspecified"`, not one of the enum's 3 values.
- **`mutation-control-invalid-enum-entries.json`** — sets
  `intendedNumberOfEntries` to `"Unlimited"`, not one of the enum's 3
  values.
- **`mutation-control-invalid-type-date-arrival.json`** — sets
  `tentativeDateOfArrival` to the string `"next month"` instead of a
  `YYYY-MM-DD` date.
- **`mutation-control-missing-purpose-other-specify.json`** — sets
  `purposeOfVisit` to `"Others"` without providing the
  `requiredWhen`-gated `purposeOfVisitOtherSpecify` companion field.

```
$ node conformance-check.mjs schema.json \
    mutation-control-missing-first-given-name.json \
    mutation-control-missing-passport-number.json \
    mutation-control-invalid-enum-sex.json \
    mutation-control-invalid-enum-entries.json \
    mutation-control-invalid-type-date-arrival.json \
    mutation-control-missing-purpose-other-specify.json
mutation-control-missing-first-given-name.json: 1 error(s)
  - firstGivenName: required but missing
mutation-control-missing-passport-number.json: 1 error(s)
  - passportNumber: required but missing
mutation-control-invalid-enum-sex.json: 1 error(s)
  - sex: 'Unspecified' not in enum ["Male","Female","Others"]
mutation-control-invalid-enum-entries.json: 1 error(s)
  - intendedNumberOfEntries: 'Unlimited' not in enum ["Single","Re-Entry","Multiple"]
mutation-control-invalid-type-date-arrival.json: 1 error(s)
  - tentativeDateOfArrival: expected YYYY-MM-DD date string
mutation-control-missing-purpose-other-specify.json: 1 error(s)
  - purposeOfVisitOtherSpecify: required but missing
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/dip/machine-readable-visa-application-form/1.0.0/schema.json
ok   registry/bd/dip/machine-readable-visa-application-form/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/dip/machine-readable-visa-application-form/1.0.0/schema.json
ok   registry/bd/dip/machine-readable-visa-application-form/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full registry validation run (`node tools/validate.mjs` with no argument,
covering every published document) passes: **401/401 document(s), 3/3
mapping.json companions.**

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (401 entries).

## Scope and jurisdiction notes

- Opens Bangladesh's **Visa vertical (4 of 6)**; DMV, Taxes, and Passport are
  already published. Business Formation and National ID remain
  screened/backlog.
- `jurisdiction.level` is `national` — DIP is Bangladesh's national
  passport/visa authority.
- `process.type` is `application`; `process.language` is `en` — the source
  PDF's own text layer is entirely in English.
- Companion candidates for a future cycle: this cycle's own RJSC
  Business-Formation lead (open backlog, see "Candidate scouting" above);
  Bangladesh's National ID gap (not screened this cycle); and, for this
  schema specifically, a future revision modeling the Extension of
  Visa/NVR/Transit pathways this v1.0.0 excludes.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming
`visa.gov.bd/Img/MRV_FORM.pdf` has not been silently replaced with a revised
edition; (2) checking whether the Online MRV Portal has moved to a genuine
online-submission workflow beyond this print-and-fill PDF; (3) whether a
future cycle wants to model the Extension of Visa/NVR/Transit pathways
excluded here as companion schemas or additional scope on this same
document.
