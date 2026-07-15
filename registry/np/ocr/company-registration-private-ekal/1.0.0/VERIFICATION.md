# Verification record — `np/ocr/company-registration-private-ekal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3078)

GOV-3078 ("GovSchema Standard Research") is the same recurring research-cycle
issue as GOV-2167/GOV-3026/GOV-3045/GOV-3049/GOV-3062/GOV-3066. This cycle
opened with the prior GOV-3062/GOV-3066 cycles' own delegated work already
fully landed (Pakistan opened as the 57th jurisdiction, Israel as the 58th).
No unclaimed child issues were open from those cycles, so this cycle
re-scanned `CATALOG.md`'s "Known Gaps & Opportunities" and "Genuinely open,
well-sourced candidates (new jurisdictions)" sections fresh and dispatched
three parallel scouting passes: (1) Pakistan's three remaining unscreened
verticals (Passport, Taxes, Visa), (2) Israel's three remaining unscreened
verticals (Business Formation, Passport, Visa), and (3) fresh candidate
jurisdictions beyond the registry's current 58.

All three scouting passes came back with strong, independently-verified
leads:

- **Pakistan — Taxes**: FBR's "Manual Return" workbook for individuals (Tax
  Year 2024), a genuine multi-sheet `.xlsx` with real coded fields, found at
  `download1.fbr.gov.pk` and downloadable directly from
  `fbr.gov.pk/income-tax-return-form/51147/131234`. Pakistan's Passport
  (`dgip.gov.pk`) and Visa (`visa.nadra.gov.pk`) verticals were both
  re-confirmed dead ends this same pass (Passport: the only static forms are
  citizenship/naturalization forms, not the MRP application, which is
  submitted exclusively through an Akamai-WAF-gated subdomain; Visa: the live
  POVS portal's own downloadable guides are pure screenshot-navigation
  walkthroughs with zero extractable field labels).
- **Israel — Business Formation**: Form 1 (טופס 1), "Application for Company
  Registration," a native fillable `.doc` (154 `FORMTEXT` + 19
  `FORMCHECKBOX` fields with Hebrew tooltip labels) at
  `gov.il/BlobFolder/servicequestionnaire/company_registration/he/...`, with
  a "Sole Company" simplified companion template already identified for a
  future single-member cycle. Israel's Passport (Form DR/1, 50 numbered
  fields) and Visa (MFA's tourist-visa application form) were also both
  independently confirmed strong, unauthenticated, genuine sources this same
  pass — good secondary candidates for a future cycle.
- **New jurisdictions**: of three jurisdictions screened (Georgia, Ukraine,
  Nepal), **Nepal** produced the strongest, most directly citable candidate —
  the Office of Company Registrar's own official, unauthenticated,
  field-by-field "New Company Registration" user manual — while Georgia's
  `.gov.ge` portals are client-rendered SPAs needing a future browser-tooling
  pass, and Ukraine's `.gov.ua` estate is broadly Cloudflare/Akamai-WAF-gated
  (a wartime security posture, confirmed on both the MFA visa PDF and the
  Tax Service's individuals page) and is recommended for deprioritization
  until a non-gated subdomain is found.

Given three strong leads and a one-cycle authoring budget, this cycle
**authored the new-jurisdiction candidate (Nepal)** — the registry's charter
prioritizes global jurisdiction coverage, and Nepal's source is the most
directly author-ready of the three (a genuine field-by-field walkthrough,
versus IL Form 1's much larger 154+19-field surface and PK's multi-sheet
coded-return workbook, both of which merit their own dedicated authoring
cycle). Israel's Business Formation/Passport/Visa findings and Pakistan's
Taxes finding are **delegated as fully-sourced child issues** of this cycle
rather than authored inline — see the parent issue's child-issue links.

## Source

- **URL:**
  `https://application.ocr.gov.np/resources/Manual/New%20Registration.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 3272267`, `Last-Modified: Wed, 14 May 2025 17:07:16 GMT`.
- **sha256:**
  `3ef9b2d5152c96d03e004432a39bdfc4e5af100e1ee2ad6875911afed46159f8`
- Fetched directly with `curl` (the `-k` flag was needed only because the
  local CA bundle in this environment is missing an intermediate certificate
  for `application.ocr.gov.np` — this is a TLS-chain quirk of the fetching
  environment, not a login/CAPTCHA/WAF gate on the source itself: no
  authentication or challenge was presented at any point).
- Genuine 28-page **text-layer** PDF (not a scanned image), confirmed via
  `pdfjs-dist`'s `getTextContent()` returning real, non-empty extracted text
  on every page.
- The manual itself documents an *online* e-service (`camis.ocr.gov.np` /
  `ocr.gov.np/CRO`) that requires a user account to actually submit a
  registration — but the manual describing that service's fields is itself
  freely downloadable with no login/CAPTCHA/WAF gate, the same
  manual-as-source pattern already established for several other schemas in
  this registry (e.g. Indonesia's M-Paspor and e-Visa guides, GOV-1567/
  GOV-1574/GOV-1581).

## Extraction method and column-order check

All 28 pages were extracted with `pdfjs-dist`'s `getTextContent()` and
concatenated in reading order for an initial read. Because a prior cycle's
Hebrew-RTL schema (Israel Form 1301, GOV-3066) was caught misreading a field
order due to naive linear text-stream extraction, this cycle additionally
re-extracted the seven most field-dense pages (14–20, covering Company
Details, Branch Details, Capital Details, Company Share Holder Details, and
Witness Details) with each text item's own `(x, y)` transform coordinates
preserved, grouped into rows by `y` and sorted by `x` within each row. The
result confirmed a genuine single-column layout with no interleaved-column
scrambling — the original linear extraction was already correct, and every
field list transcribed into `schema.json` was cross-checked against this
coordinate-aware re-extraction before being finalized.

## Scoping decisions

- **Company Type — "Private Ekal" only.** The manual's own Capital Structure
  walkthrough (Figure 32) illustrates only the "Private Ekal" (single-
  shareholder private) company type; the dropdown's other option labels are
  never printed in the source. `companyType` is modeled as a single-value
  enum (`PRIVATE_EKAL`) rather than a free-text or multi-option dropdown, to
  avoid fabricating unseen option labels.
- **Exactly one shareholder, Person type only.** The Company Share Holder
  Details step is a genuinely open-ended repeating dialogue (a user can
  invoke "Add Company Share Holder" any number of times, and can choose
  either "Person" or "Company" as the shareholder type). Since GovSchema's
  repeating-group proposal (GSP-0009) is not yet accepted into v0.3, this
  version models exactly one shareholder, using the "Person" sub-form (the
  "Company" shareholder-type sub-form, Figure 42, is out of scope for a
  future cycle).
- **Exactly one branch (optional).** Branch Details (Step 2) is optional and
  independently repeatable ("if you wish to add more branches, repeat the
  same process"); this version models at most one branch as four
  independent optional fields.
- **Exactly one witness.** The manual's own worked example under Witness
  Details describes a dynamic "No. of Witness Person" count control that
  adds rows on demand ("if you want to add another 3 witness... three rows
  will be added"). No minimum witness count is printed anywhere in the
  source. This version models exactly one witness (the bounded minimum),
  disclosed here rather than fabricating a specific legal minimum this
  source does not state.
- **`shareholderGender` is free text, not an enum** — the source's own
  "Select Gender" instruction supplies no printed option list, matching the
  precedent set for Pakistan's SECP Form-1 schema (GOV-3062).
- **`shareholderType` enum includes "Jurisdiction" verbatim.** Figure 38's
  own caption lists four Share Holder Type options: Director, Founder,
  Shareowner, Jurisdiction. The first three are natural-person roles;
  "Jurisdiction" does not obviously fit alongside them, and no other part of
  the source manual clarifies its intended meaning. It is transcribed
  exactly as printed rather than omitted, reinterpreted, or silently
  dropped — a future cycle with a corroborating source (e.g. the live portal
  itself, or Nepal's Companies Act, 2063) should revisit this if a clearer
  meaning surfaces.
- **`documents[]` has exactly one, optional, generic entry.** Step 6
  ("Document Details") is a generic file-upload utility; unlike, for
  example, Pakistan's SECP Form-1 (which prints a numbered Enclosures list
  naming specific required documents), this manual names no specific
  document types at all. Modeling one optional `supporting-evidence` entry
  reflects exactly what the source documents, without fabricating specific
  document names it does not print.
- **Telephone/Fax/Email/Address are all required.** The manual's own Company
  Details step groups these four together explicitly: "You have to fill
  other required details in the Company Details form which includes
  Telephone No, Fax No, Company Email and Company Address" — taken at face
  value rather than assuming Fax is conventionally optional.
- The Name Reservation Request Form's own preceding account-creation/login
  steps (Sections 2.1–2.2) are portal-access mechanics, not registration
  data, and are excluded from `fields[]`.

## Verticals also screened this cycle, not authored

- **Nepal — DMV**: driving-licence issuance is fully gated behind
  `applydlnew.dotm.gov.np`'s quota-based online portal; `dotm.gov.np` has no
  discoverable static form or manual. Confirmed dead end this cycle.
- **Nepal — Taxes**: PAN registration is a pure online e-form via
  `taxpayerportal.ird.gov.np`, national-ID-linked auto-populate, no static
  form or manual found. Confirmed dead end this cycle.
- **Nepal — Passport**: the Department of Passports' MRP Offline
  Application Form (`verification1.nepalpassport.gov.np`) is a genuine,
  strong AcroForm PDF (337 text-field widgets on a single page), but every
  widget uses a flat, semantically meaningless internal naming scheme
  (`sur1`..`sur337`) rather than one field per named datum — the ~27 logical
  fields would need to be reconstructed from widget geometry and label
  proximity, meaningfully more effort than this manual. Left as strong,
  disclosed backlog for a dedicated future cycle.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/enum rules directly from this schema's own `fields[]`/
`documents[]`, discarded after use, not committed) ran the following fixtures
in `conformance/np/ocr/company-registration-private-ekal/1.0.0/`:

- `valid-private-ekal-nepali-director.json` (a Private Ekal company with a
  Nepali-citizen sole shareholder acting as Director) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops
  `companyNameEnglish`) — **exactly 1 error**.
- `mutation-control-invalid-enum-company-type.json` (sets `companyType` to
  `PRIVATE_MULTI`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-enum-shareholder-type.json` (sets
  `shareholderType` to `CHAIRMAN`, not in the enum) — **exactly 1 error**.
- `mutation-control-requiredwhen-foreigner-missing-passport.json` (sets
  `shareholderIsForeigner` to `true`, drops the citizen-branch fields, and
  does not supply `shareholderPassportNumber`) — **exactly 1 error**.
- `mutation-control-requiredwhen-citizen-missing-citizenship-number.json`
  (drops `shareholderCitizenshipNumber` while `shareholderIsForeigner`
  remains `false`) — **exactly 1 error**.

This schema has no `type: date` fields (so no invalid-date-format fixture
applies) and its sole `documents[]` entry is optional rather than required
(so no missing-required-document fixture applies).

## Structural validation

- `node tools/validate.mjs registry/np/ocr/company-registration-private-ekal/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/np/ocr/company-registration-private-ekal/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **465/465**; `node tools/validate-ajv.mjs` → **465/465**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source manual's own printed field descriptions
are fully transcribed from the genuine, currently-served official user
guide, but no live filing through OCR's `camis.ocr.gov.np` e-Services portal
was attempted (it requires a registered account). GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of Nepal or the Office of
Company Registrar.
