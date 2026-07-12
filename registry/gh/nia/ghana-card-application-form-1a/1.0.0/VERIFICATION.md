# Verification record — `gh/nia/ghana-card-application-form-1a` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2510** (child of GOV-2507).
It opens **Ghana as the registry's 41st jurisdiction**, via the National ID
& Civic Documents vertical, sourced from the National Identification
Authority's (NIA) "Form One" (regulation 3(1)), the "NATIONAL IDENTITY CARD
APPLICATION FORM" — commonly the "Ghana Card Application Form 1-A."

## Sources examined

### Source 1 — the PDF itself (chosen as `source.url`)

- **URL:** <https://nia.gov.gh/wp-content/uploads/Ghana-Card-Application-Form-Form-1-A.pdf>
  — NIA's own site. Fetched directly via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **498,907 bytes**,
  `Last-Modified: Mon, 16 Feb 2026 12:10:31 GMT`,
  `sha256: 3f401681db2e6d1f39fcc16b78c6b69a71d81a43075789513de29d00593bc5fa`.
  Re-checked live at verification time (`curl -o /dev/null -w '%{http_code}'`)
  — still **HTTP 200**, unauthenticated, no login/paywall gate.

### The child-issue's "byte-identical mirror" claim did not hold up — disclosed correction

The GOV-2510 issue description, inherited from GOV-2507's scouting pass,
asserted this form was "cross-confirmed byte-identical against a third-party
mirror (fims.org.gh)." This schema's own re-verification found that claim
**inaccurate** and did not rely on it:

- A direct fetch of the literal path implied
  (`fims.org.gh/wp-content/uploads/Ghana-Card-Application-Form-Form-1-A.pdf`)
  returns **HTTP 404** (a generic WordPress 404 page, confirmed by reading the
  response body — not a PDF at all).
- A web search of `fims.org.gh`'s actual published forms shows that site hosts
  a **different form entirely**: FIMS ("Foreigner Identification Management
  System") publishes the *Non-Citizen Ghana Card* application ("Form One"
  under regulation 3(1), for refugees/non-citizens specifically), a distinct
  document from NIA's own Form 1-A for the general citizen/resident
  population, at `fims.org.gh/wp-content/uploads/application_form.pdf` /
  `Application-Form.pdf` — not a mirror of this schema's source PDF.
- This schema therefore cites **only** the direct NIA fetch (Source 1) as
  `source.url`, with no second-mirror byte-hash cross-check performed or
  claimed. The **129-widget field count** the issue also asserted, however,
  **did independently reproduce** exactly against this schema's own
  from-scratch `pdfjs-dist` extraction (below) — so that specific claim from
  the scouting pass held up even though the "byte-identical mirror" detail
  did not. This distinction — verifying each sub-claim independently rather
  than accepting or rejecting an inherited claim as a single unit — follows
  this registry's established practice (cf. GOV-2489's finding on a
  similarly mixed corroboration).

### Source 2 — `pdfjs-dist` structural extraction (own re-derivation)

- `getDocument().promise` + `page.getAnnotations({intent:"display"})` across
  both pages confirms **129 real Widget annotations** — **84 on page 1, 45 on
  page 2** — matching the issue's own count. `getFieldObjects()` confirms
  `IsAcroFormPresent`-style structure with 127 distinct field-name keys (two
  of which, `Is Father alive` and `Is Mother alive`, are genuine two-option
  AcroForm **radio button** fields — each backed by 2 widgets sharing one
  field name — accounting for the 129-widgets/127-names difference).
- Unlike several other jurisdictions' forms in this registry (Kenya, Vietnam),
  **this form's widgets carry descriptive, largely self-documenting internal
  field names** (`SURNAME`, `Full Name of Father`, `SSNIT No`, etc.), not
  generic XFA-style tokens — so most fields did not require the
  coordinate-correlation technique used elsewhere. It was still needed for:
  repeated generic names re-used across sections (`Village`/`Village_2`/
  `Village_3`/`Village_4`/`Village_5`, `Country`/`Country_2`.../`District`/
  `District_2`...), the numbered blank grids (`"1"`–`"14"` for languages
  spoken; `"1_2"`–`"4_2"`/`"1_3"`–`"2_3"` for local/foreign phone numbers),
  and two ambiguous fields (`M`, `undefined_18`) with no obvious printed
  label of their own. `getTextContent()` per page (using each item's
  `transform` matrix for PDF-space x/y) was extracted and every widget's
  `rect` correlated against the nearest text at matching y-coordinate to
  resolve these.
- **`getFieldObjects()`'s per-widget `charLimit`** (the AcroForm's own combed
  text-field character limit) was read for every `Tx` widget and used
  directly as this schema's `validation.maxLength` — a stronger, more
  source-faithful basis than estimating from rendered widget width. This
  surfaced a material, disclosed pattern: **all nine `Nationality*` widgets
  and the `Other Nationality` widget carry `charLimit: 3`**, `SEX` carries
  `charLimit: 2`, and each of the 14 language-spoken blanks carries
  `charLimit: 3` — physical constraints too narrow for free-text country
  names, full sex words, or most language names, indicating the form expects
  short codes/abbreviations in these boxes rather than free text. This
  schema follows that physical evidence (`maxLength: 3` on nationality/
  language fields, an `M`/`F` enum on `sex`) rather than inventing full-text
  semantics the AcroForm itself does not accommodate.
- `OCCUPATION` (`charLimit: 4`) and `Disability` (`charLimit: 3`) are
  similarly narrow; both are modelled as short strings with a description
  disclosing the narrow-width inference rather than presenting them as
  ordinary free-text fields, consistent with the form's own combed-field
  design (independently confirmed at a uniform ≈15pt-per-character combed
  width across every checked field, e.g. `Colour of Eyes` at 90.6pt/6 chars
  and `Disability` at 45.48pt/3 chars).

### Source 3 — legal-currency and administering-body check

- Confirmed via a fresh web search that the **National Identification
  Authority Act, 2006 (Act 707)** establishes NIA (the form's administering
  authority), and that the **National Identity Register Act, 2008 (Act 750)**
  — the exact instrument the form's own declaration text cites ("liable to
  prosecution in accordance with Section 40 of the National Identity Register
  Act, 2008 (Act 750)") — remains the governing statute for the identity
  register. Independent reporting from 2026 (NIA marking "20 years since its
  establishment" under Act 707, and a July–August 2026 IOM-partnered border
  registration exercise) confirms NIA is a live, currently operating agency,
  not a dormant or superseded one.
- `https://nia.gov.gh/` itself returns **HTTP 200** on a fresh direct fetch.

## Field inventory and scoping/disclosure decisions

- **129 widgets → 123 modelled `fields[]` + 1 `documents[]` entry.** The
  reconciliation: 4 widgets are deliberately excluded as **staff-populated,
  not applicant-supplied** — `M` ("MRW Number*:"), `Interviewer` ("Interviewer
  NID No.*:"), and `Centre Number` ("Registration Centre Number*:"), all
  printed in the form's administrative header strip alongside the
  applicant-facing Date of Application/Existing NID Number fields, and
  `Signature1_es_:signer:signature` (the raw signature/thumbprint capture
  widget) — consistent with this registry's general practice of excluding
  officer/witness/interviewer fields (cf. `ke/nrb`, GOV-2500) and raw
  signature-capture widgets. The two genuine 2-widget radio fields (`Is
  Father alive`, `Is Mother alive`) each collapse to **1** boolean field.
  129 − 4 (excluded) − 2 (radio-pair collapse) = **123**, matching the field
  count published.
- **Four mutually-exclusive checkbox groups** (`TYPE OF APPLICANT *`, `TYPE
  OF REQUEST*`, `Marital Status *`, `Level of Education *`) are each backed
  by independent `Btn`-type checkbox widgets in the AcroForm, **not** a
  single radio field — confirmed via `getFieldObjects()` (each carries its
  own distinct field name, unlike the true `Is Father/Mother alive` radios).
  Each group is modelled as N independently optional boolean fields plus an
  `exclusivityGroups` entry (SPEC §8.4) enforcing "at most one true" —
  machine-checked. The form marks all four groups mandatory with a printed
  `*`, i.e. "**exactly** one must be true," but `exclusivityGroups` only
  expresses the "at most one" half; the "at least one" half is not
  machine-checkable with this field model's flat boolean groups and no
  `when`-triggered `requirePresent`, so it is disclosed here in prose only —
  the same disclosed-not-encoded pattern as `ke/nrb`'s "at least one
  supporting document" constraint (GOV-2500).
- **`sex`** is modelled as `enum: ["M", "F"]`, not free-text `string` — a
  deliberate departure from this registry's usual "no printed options → keep
  as string" default (cf. `ke/nrb`'s `maritalStatus`), justified here by the
  widget's own **`charLimit: 2`**, a structural AcroForm fact (not a visual
  estimate) that makes any answer beyond a 1–2 letter code physically
  unenterable in the live PDF.
- **`undefined_18`** (`verificationDocumentAdditionalNumber`): a combed `Tx`
  widget (`charLimit: 16`) positioned immediately beneath the "Document No. /
  NID" field, with **no printed text label anywhere on the page** at its
  position — confirmed by full-page `getTextContent()` review, not merely
  absence at first glance. Modelled as an optional string with its
  undefined status disclosed in the field's own `description`, the same
  disclosure pattern `ke/nrb` used for its unlabelled "R.Number" fields
  (GOV-2500).
- **`M`** ("MRW Number*:", `charLimit: 4`) is excluded from `fields[]`
  entirely (see above) rather than modelled with a disclosed-unknown
  description, because — unlike `undefined_18` — it sits inside the
  administrative header block alongside Centre Number/Interviewer NID No.,
  where the surrounding fields are unambiguously staff-populated; the
  acronym's exact meaning is not defined by the source and is not asserted.
- **Non-citizen-only fields** (`NON CITIZEN ONLY :` — residence-permit dates,
  employer name/address/telephones) and **dual-citizenship-only fields**
  (`DUAL CITIZENSHIP ONLY :` — other nationality, dual-nationality
  certificate no., naturalization/registration cert. no.) each carry a
  `visibleWhen` condition keyed off `applicantTypeCitizen`
  (`{"not": {"field": "applicantTypeCitizen", "equals": true}}` for the
  former, `{"field": "applicantTypeCitizen", "equals": true}` for the
  latter) — a disclosed inference from the section headings and the
  `applicantTypeCitizen` boolean this schema itself defines, not a printed
  cross-reference on the form (the form does not explicitly say "only if
  applicantTypeCitizen is unchecked"), but a direct, defensible reading of
  what "NON CITIZEN ONLY"/"DUAL CITIZENSHIP ONLY" mean against this schema's
  own applicant-type field model.
- **Spouse list bounded at 5** (`spouse1FullName`…`spouse5Nationality`,
  flattened per this registry's numbered-field convention since v0.3's field
  model is flat, §6.1): the form's own footnote directly under the list
  reads "*(Note: In case of more than five (5) Spouses, please use Spouses
  Form)*" — a disclosed, printed escape hatch to a companion form outside
  this schema's scope, the same pattern as several other bounded
  repeating-group forms in this registry (e.g. `dk/cpr`'s entrant/child
  convention, GOV-2260).
- **Languages spoken (14 blanks)**, **local phone numbers (4 blanks)**, and
  **foreign phone numbers (2 blanks)** are each flattened to N independently
  optional fields (`languageSpoken1`…`languageSpoken14`,
  `localPhoneNumber1`…`localPhoneNumber4`, `foreignPhoneNumber1`/`2`) for the
  same flat-field-model reason.
- **Nationality-family fields** (`nationalityAtBirth`, `currentNationality`,
  `otherCountryOfNationality`, `fathersNationality`, `mothersNationality`,
  `spouse1Nationality`…`spouse5Nationality`, and the region/country half of
  every "Village/Town, Region/Country, District/State" triple) are all
  modelled as `maxLength: 3` strings per the `charLimit: 3` finding above,
  described as "a short code" without asserting a specific standard (e.g.
  ISO 3166-1 alpha-3) the source itself does not name.
- **`height`** is modelled as `integer` (not `string`), `minimum: 0`,
  `maximum: 999` — the 3-digit combed-field structural cap, not an invented
  "realistic human height" range.
- **Email pattern**: `emailAddress` carries a basic
  `^[^@\s]+@[^@\s]+\.[^@\s]+$` validation pattern, exercised by a dedicated
  mutation-control fixture (see below).
- **`applicantDeclaration`** (`documents[]`, category `attestation`) quotes
  the form's own declaration paragraph verbatim, including its citation of
  "Section 40 of the National Identity Register Act, 2008 (Act 750)"
  (independently confirmed current, Source 3 above) and its reference to an
  applicant whose "hand was guided to make my mark" — which also motivates
  modelling the adjacent `applicantIsChallenged` ("Challenged :") checkbox
  as a boolean field, disclosed as an inference from its position
  immediately above that declaration text rather than a fully explained
  printed instruction.
- **No `documents[]` entry models the signature/thumbprint or a payment
  fee** — the source PDF prints no fee schedule on the form itself, and the
  signature/thumbprint widget is excluded per this registry's general
  raw-biometric-capture practice (see above).

## Conformance run

Two valid fixtures were built against `schema.json` with a from-scratch,
ajv-free checker script (evaluates `required`/`requiredWhen` with visibility
gating, per-type `validation` keywords, `exclusivityGroups`, and `documents[]`
`required`/`requiredWhen` directly against the meta-schema's own rules) — not
any author-provided tooling, since no shared `tools/conformance-runner.mjs`
exists yet in this repo:

- `citizen-first-time-issuance-single.json` — an unmarried female Ghanaian
  citizen applying for first-time issuance, with a dual-citizenship
  disclosure (exercising the `applicantTypeCitizen`-gated `visibleWhen`
  fields). **0 errors.**
- `permanent-resident-update-married-with-spouse.json` — a married male
  permanently-resident non-citizen applying to update an existing card, with
  spouse, non-citizen-only (residence permit/employer), verification
  document, and several institutional-ID fields populated (exercising the
  opposite `visibleWhen` branch). **0 errors.**

Five mutation-control fixtures, each a single deliberate violation of the
first valid fixture, each correctly raised **exactly 1 error**:

- `mutation-control-missing-required-field.json` — removes `surname`
  (required) → 1 error.
- `mutation-control-missing-required-document.json` — omits the
  `applicantDeclaration` document → 1 error.
- `mutation-control-sex-enum-violation.json` — sets `sex` to `"X"` (not in
  the `["M","F"]` enum) → 1 error.
- `mutation-control-email-pattern-violation.json` — sets `emailAddress` to
  `"not-an-email"` → 1 error (pattern violation).
- `mutation-control-exclusivity-violation.json` — sets both
  `applicantTypeCitizen` and `applicantTypePermanentlyResident` to `true`
  → 1 error (`exclusivityGroups` "at most one" violation), the one rule
  category the two prior KE/VN-cycle conformance write-ups in this registry
  had not yet exercised.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (JSON Schema
draft 2020-12 meta-schema conformance) both pass clean for
`registry/gh/nia/ghana-card-application-form-1a/1.0.0/schema.json`.

## Backlog note

Ghana now stands at **1 of 6 verticals** (National ID & Civic Documents).
Passport, DMV, Business Formation, Taxes, and Visa all remain open for a
future cycle; none were screened this cycle (this cycle's GOV-2510 scope was
limited to authoring the pre-identified National ID candidate from GOV-2507).
