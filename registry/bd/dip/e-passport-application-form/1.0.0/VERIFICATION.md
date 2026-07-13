# Verification record — `bd/dip/e-passport-application-form` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2666**. It opens
**Bangladesh's Passport vertical (3 of 6)**, using the Department of
Immigration and Passports' (DIP) "e-Passport Application Form (New/Re-Issue)".
Bangladesh previously had two published verticals (Taxes —
`bd/nbr/individual-income-tax-return-form-it-11ga`; DMV —
`bd/brta/motor-vehicle-registration-application`).

## Reverses a prior dead-end verdict

GOV-2591's cycle screened Bangladesh's Passport vertical and characterized it
as weak/dead-end (Bangladesh's e-passport process is primarily an online
portal — epassport.gov.bd — with no fillable PDF specimen located at the
time). This cycle found the Ministry of Foreign Affairs' (MOFA) own forms
portal (`mofa.gov.bd/pages/forms/*`) hosts a genuine, unauthenticated,
interactive AcroForm PDF distributed specifically for offline/embassy
submission of this same process — the same class of reversal already
recorded for Bangladesh's DMV vertical (GOV-2644's BRTA finding).

## Source verification (independently re-derived, not copied from the task briefing)

- **Landing page:** `https://mofa.gov.bd/pages/forms/69959494fcf25ca2d1011a0e`
  — independently re-fetched this cycle via
  `curl -sk -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"`
  (TLS certificate verification fails on this host by default, consistent
  with the task briefing's note and the same pattern already seen for
  BRTA/RJSC/ECS elsewhere in this registry): **HTTP 200**,
  `Content-Type: text/html; charset=utf-8`, **72,484 bytes**.
- **PDF source:**
  `https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-mofa/2026/1/a04a6c52-75cf-4edb-820c-0f4dd0f9ecfe.pdf`
  — fetched independently this cycle via the same insecure-TLS `curl`
  invocation (this object-storage host also fails default certificate
  verification):
  - **HTTP 200**, `Content-Type: application/pdf`, **4,114,743 bytes**.
  - **`sha256`:**
    `477e229ac2869691f6bd2a09be01af0d7ebb22cdae0e4591db7687e6ac7dd862`
    (computed via `sha256sum` on the freshly-downloaded file).
  - All three figures were independently re-derived this cycle and match the
    task briefing's own cited figures exactly.
  - The response's own `last-modified` header reads `Wed, 18 Feb 2026
    10:29:40 GMT`, captured here to anchor a future re-verification diff.
- The form's own footer text confirms the issuing agency: "Government of the
  People's Republic of Bangladesh, Department of Immigration and Passports,
  www.dip.gov.bd" — MOFA is merely the offline-distribution host, not the
  issuing agency, hence `registry/bd/dip/`, not `registry/bd/mofa/`.

## PDF structure, independently confirmed via `pdfjs-dist@4` (legacy build)

- **3 pages**, matching the task briefing.
- `getFieldObjects()` returned **111 distinct field names** across the
  document's AcroForm Widget annotations (the task briefing's own count of
  114 widgets is also consistent: a handful of field names — e.g.
  `Road_block_info` — repeat across multiple widget rectangles, since they
  are decorative per-section "ⓘ" info-icon push buttons appearing next to
  more than one field, not distinct data-bearing fields; `getFieldObjects()`
  groups these under one name).
- `getTextContent()` returned a full, clean, bilingual (Bengali primary,
  English secondary) text layer across all 3 pages. Every printed item
  number (1-87), label, and required-field asterisk was read directly from
  this text layer, position-sorted into rows, and cross-checked against the
  task briefing's own transcription — it matches field-for-field, including
  every asterisk placement.

## A significant data-quality finding: AcroForm field names do not track printed item numbers

Independently correlating every Widget annotation's `page`/`rect`
coordinates against the position-sorted text layer (grouping widgets into
rows by rounded y-coordinate, then left-to-right by x, which reproduces the
form's own reading order and therefore its own item numbering) revealed that
the PDF's internal AcroForm field **names** — mostly plain numeric strings —
do **not** reliably correspond to the form's own printed item numbers. For
example, in the (out-of-scope) Previous-Passport/Re-Issue row:

- Printed item **9** ("Previous Passport No.") is internal field name `"9"` —
  matches.
- Printed item **10** ("Date of Issue") is internal field name `"11"`.
- Printed item **11** ("Date of Expiry") is internal field name `"12"`.
- Printed item **12** ("Reason for Re-Issue") is internal field name `"10"`.

Similar scrambles recur in the (out-of-scope) "Additional Information for
Official and Diplomatic Passport" block (items 32-37) and, more importantly,
**within the in-scope Permanent/Present Address blocks** (e.g. printed item
38 "District" is internal field name `"37"`; printed item 44 "Country" is
internal field name `"42"`). Given this, **every field in this schema was
identified by its on-page position and printed label, never by trusting the
internal PDF field name** — the field's own `name` in this schema.json is a
GovSchema-authored camelCase key, not copied from the AcroForm.

Two auxiliary widgets were also excluded on this basis: an internal field
named `"0"` (a tiny widget at the very bottom of page 1, value `"0.90"`,
evidently an internal PDF/form-version marker) and an internal field named
`"88"` positioned between printed items 3 and 4 with no printed label of its
own and a default value of `"N/A"` — excluded as a non-conforming artifact
widget, alongside items 1-3 (see below).

## Combobox option-list check

`getFieldObjects()` exposes each combobox's embedded `/Opt` option array (via
its `options` member). All 33 combobox-typed fields in this document returned
`options: null` — **no embedded option list on any of them** — so, per this
registry's own established convention (`bd/brta`, `th/dlt`), none is modeled
as `enum` purely on the basis of being rendered as a dropdown. Two disclosed
exceptions:

- **`passportType`** — modeled as a 3-value `enum` (`ordinary`/`official`/
  `diplomatic`) because two independent pieces of the form's own text
  corroborate a closed 3-way set: the combobox's own default value is
  `"ORDINARY"`, and the form's own "Additional Information for **Official**
  and **Diplomatic** Passport" section heading (items 32-37) independently
  names the other two categories.
- **`gender`** — modeled as a 3-value `enum` (`female`/`male`/`other`)
  because its own printed Bengali parenthetical translation literally lists
  the three options ("নারী/ পুরুষ / অন্যান্য" — "Female/Male/Other"), the
  same class of exception this registry already uses for `bd/brta`'s
  `vehicleOrTrailer` field (a printed label naming exact mutually-exclusive
  options, even without a checkbox/radio widget).

Every other combobox-typed item (`numberOfPages`, `durationOfPassport`,
`typeOfDelivery`, `countryOfBirth`, `districtOfBirth`, `religion`,
`typeOfCitizenship`, `countryOfOtherCitizenship`, `maritalStatus`,
`profession`, and every address-block District/Police-Station/Post-Office/
Country field) is modeled as free-text `string`, each disclosed in its own
`description`. Several of these (e.g. `numberOfPages` default `"48 PAGES"`,
`durationOfPassport` default `"5 YEARS"`, `typeOfDelivery` default
`"REGULAR"`, `typeOfCitizenship` default `"BY BIRTH"`) have a plausible,
publicly-known closed set (Bangladesh e-passports are commonly issued at
48/68 pages, 5/10-year validity, Regular/Express/Super-Express delivery), but
because no second part of *this form's own text* corroborates those option
sets the way it does for `passportType`, this schema does not invent an enum
for them — only the field's own observed default value is recorded.

## Split-widget fields

Three printed items are genuinely **two adjacent AcroForm widgets**, not
one, and are modeled as two fields each:

- **Item 30** ("Contact No.") — a country-code combobox (default `"880"`,
  Bangladesh's own calling code) plus a free-text number field →
  `contactCountryCode` + `contactNumber`.
- **Item 76** ("Contact No.", Emergency Contact) — the same pattern →
  `emergencyContactCountryCode` + `emergencyContactNumber`.
- **Item 87** ("Paid Amount") — a free-text amount field plus an adjacent
  blank-default combobox with no distinguishing printed sub-label of its
  own. Only the amount (`paidAmount`) is modeled; the companion combobox is
  excluded as unclear, the same treatment given to the unlabeled `"88"`
  widget above.

## Scoping decision

### In scope (71 `fields[]` + 5 `documents[]` entries)

This v1.0.0 scopes to the **first-time (new) applicant** pathway of this
combined New/Re-Issue form:

- **Passport request** (items 4-8): Passport Office/Bangladesh Mission,
  Passport Type, Number of Pages, Duration of Passport, Type of Delivery.
  Items 1-3 (Online Registration ID/Payment Reference/Payment Amount) are
  **excluded**: their own embedded default field values read
  `"OFFLINE APPLICATION"`, `"N/A"`, `"N/A"` respectively, directly confirming
  (from the PDF's own data, not inference) that these are online-system
  auto-fill fields inapplicable to this offline specimen — not data the
  applicant themselves enters.
- **Personal Information** (items 13-31): Full Name, Given Name, Surname,
  Date of Birth, Country/District/Place of Birth, Gender, Religion, National
  ID No., Birth Registration No., Type of Citizenship, Dual Citizenship
  Status, Country of Other Citizenship, Foreign Passport No., Marital
  Status, Profession, Contact No. (2 fields), E-mail.
- **Permanent Address** (items 38-43) and **Present Address** (items 44-50)
  — 6 and 7 fields respectively.
- **Parental Information** (items 51-58): Father's/Mother's Name,
  Nationality, National ID No., Profession.
- **Guardian Information** (items 59-62): modeled, but **unconditionally
  optional**. The source's own item 59 label reads "Guardian's Name – if
  applicable (as per NID/BRC)", and the page-3 declaration's signature line
  reads "Signature of Applicant/Guardian (**if Applicant is minor**)" —
  together implying this block is meant for a minor applicant — but the form
  provides **no dedicated age/minor boolean field** anywhere to gate a
  `requiredWhen` condition against, so a fabricated gate is not invented;
  all four guardian fields are left optional, consistent with this
  registry's convention of not inventing conditions the source does not
  itself provide.
- **Spouse Information** (items 63-66): all four fields, none printed with
  an asterisk (applicable only if married).
- **Emergency Contact** (items 67-77): Name, Relationship, Country,
  District, Police Station, Post Office, Postal Code, City/Village/House,
  Road/Block/Sector, Contact No. (2 fields), E-mail.
- **Bank Payment Information** (items 84-87): Bank Name, Payment Reference
  No., Payment Date, Paid Amount. **Deviation from the task briefing's own
  suggested scoping**: the task flagged this block as possibly a
  system/office-generated payment receipt rather than applicant-entered
  data. Independent inspection found no "for office use"/"to be filled in by
  the office" heading anywhere near these four items (unlike
  `bd/brta/motor-vehicle-registration-application`'s own genuinely
  office-only Section-1 intake box, which *is* headed that way) — these are
  ordinary fillable AcroForm widgets, consistent with Bangladesh's common
  practice of paying a government fee via a manually-completed bank challan
  and then citing that receipt's own bank name/reference/date/amount on the
  application itself. They are therefore modeled as applicant-supplied
  fields, all optional (none carry a printed asterisk).
- **List of Attachments** (4 of the printed checklist's 10 checkboxes):
  Photocopy of National ID, Photocopy of Birth Registration Certificate,
  Photocopy of Marriage Certificate, Other — modeled as `documents[]`
  entries, all `required: false`. The form's own instruction header ("Please
  fill up the application form page 1 to 3 as per National ID/Birth
  Registration Certificate") implies at least one of National ID or Birth
  Registration Certificate is expected from every applicant; this is
  disclosed in each document entry's `handling` text rather than
  machine-encoded, consistent with this registry's established convention
  for source-disclosed-but-ungated "at least one of" business rules (e.g.
  `rw/dgie/passport-application-first-adult`'s phone-or-email precedent).
- **Declaration** (page 3): modeled as a `documents[]` attestation entry
  (`declarationAttestation`, `required: true`) carrying the declaration's
  verbatim statement text, plus a companion `declarationDate` field. This
  last is a disclosed judgment call: a genuine AcroForm text widget (internal
  name `"200"`) was found in the page-3 declaration/signature area, but its
  rect sits roughly 70-90pt below the printed "Date ___ Signature ___" line
  rather than directly beneath either blank. It is nonetheless the only
  unclaimed fillable widget anywhere in that region of page 3, so it is
  modeled here as the date accompanying the applicant's/guardian's
  signature, left optional (no printed asterisk is visible for it either
  way).

### Out of scope, disclosed

- **Items 1-3** (Online Registration ID, Online Payment Reference, Online
  Payment Amount) — confirmed online-system auto-fill fields via their own
  embedded default values (`"OFFLINE APPLICATION"`/`"N/A"`/`"N/A"`), not
  applicant-entered data on this offline specimen.
- **Items 9-12** (Previous Passport No., Date of Issue, Date of Expiry,
  Reason for Re-Issue) — re-issue-only; the form's own page-1 note states
  re-issue-without-change applicants need only fill items 1-37, implying
  these are populated when the applicant already holds — and is re-issuing —
  a passport, which cannot apply to a first-time applicant.
- **Items 32-37** ("Additional Information for Official and Diplomatic
  Passport": GO/NOC/Others, Issuing Authority, Reference No., Date, Date of
  Retirement, Passport Application for) — a narrower official/diplomatic
  sub-pathway, out of scope for this general first-time-applicant v1.0.0. A
  future companion schema could model this sub-pathway, mirroring this
  registry's own established companion-schema pattern (e.g. the CH-ZH
  Hilfsblatt series, the GR AADE Ε2/Ε3 forms).
- **Items 78-79** ("Pre-Police Clearance Information **if applicable**") —
  the source itself flags this as conditional but discloses no gating field,
  and it is plausibly tied to specific occupational/re-issue scenarios; left
  out of scope per the task's own suggestion, disclosed here as an open
  question for a future cycle rather than resolved.
- **Items 80-83** ("Information for Lost/Stolen Passports") — by definition
  a re-issue-only scenario (a first-time applicant has never held, and
  therefore cannot have lost or had stolen, a passport).
- **6 of the 10 List-of-Attachments checkboxes**: Photocopy of Previous
  Passport (re-issue-only), NOC and GO (tied to the official/diplomatic
  sub-pathway, items 32-33), Retirement Document (tied to item 36, Date of
  Retirement, itself official-passport-only), Pre-Police Clearance
  Certificate and G.D. (tied to the excluded items 78-83 above).
- **The companion combobox behind item 87** ("Paid Amount") — see "Split-widget
  fields" above.
- **Decorative "ⓘ" info-icon push-button widgets** (`Perm_addr_info`,
  `Curr_addr_info`, `Guardian_info`, `District_info`, `Road_block_info` ×4,
  `Lost_info`) — confirmed via `pdfjs-dist`'s own "Push buttons without
  action dictionaries are not supported" warning: these are non-interactive
  decorative icons with no associated action, not data-bearing fields.
- **The page-1 barcode/QR annotation** (`Barcode`) — confirmed via
  `pdfjs-dist`'s own "Barcodes are not supported" warning: an image-bearing
  annotation, not applicant input.

## Language

`process.language` is set to `bn` (Bengali): the form's own title block
leads with the Bengali title ("ই-পাসেপাটর্ আেবদন ফরম") before the English
translation, and the issuing government's own official language is Bengali,
distinguishing this schema from `bd/nbr` and `bd/brta` (both genuinely
English-only text layers). Every field label on this form is bilingual
(English first, Bengali parenthetical, on most rows) — this is disclosed as
a judgment call, since the form is functionally usable in either language.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/dip/e-passport-application-form/1.0.0/`:

- **`valid-single-first-time-applicant.json`** — an unmarried, single-
  citizenship applicant applying for an ordinary passport at a domestic
  passport office; no guardian/spouse/bank-payment data populated (all
  optional, left absent).
- **`valid-married-dual-citizen-applicant-with-guardian.json`** — a married,
  dual-citizen applicant applying for a diplomatic passport at an overseas
  mission, exercising `dualCitizenshipStatus: true`'s `requiredWhen` gate on
  `countryOfOtherCitizenship`/`foreignPassportNo`, plus a fully populated
  spouse block, guardian block, bank payment block, and `declarationDate`.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` grammar directly against `spec/v0.3/SPEC.md`'s rules:

```
$ node check_conformance.mjs schema.json \
    valid-single-first-time-applicant.json \
    valid-married-dual-citizen-applicant-with-guardian.json
valid-single-first-time-applicant.json: 0 error(s)
valid-married-dual-citizen-applicant-with-guardian.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-full-name.json`** — drops `fullName` (a static
  `required: true` field) from the single-applicant valid fixture.
- **`mutation-control-missing-permanent-district.json`** — drops
  `permanentDistrict`.
- **`mutation-control-invalid-enum-gender.json`** — sets `gender` to
  `"unknown"`, not one of the enum's 3 values.
- **`mutation-control-invalid-enum-passport-type.json`** — sets
  `passportType` to `"tourist"`, not one of the enum's 3 values.
- **`mutation-control-invalid-email-pattern.json`** — sets `email` to
  `"not-an-email"`, violating its regex pattern.
- **`mutation-control-missing-conditional-foreign-passport-no.json`** —
  starts from the dual-citizen valid fixture and drops only
  `foreignPassportNo`, isolating the `requiredWhen` violation (since
  `dualCitizenshipStatus` is still `true` and `countryOfOtherCitizenship` is
  still present in that fixture).

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-full-name.json \
    mutation-control-missing-permanent-district.json \
    mutation-control-invalid-enum-gender.json \
    mutation-control-invalid-enum-passport-type.json \
    mutation-control-invalid-email-pattern.json \
    mutation-control-missing-conditional-foreign-passport-no.json
mutation-control-missing-full-name.json: 1 error(s)
  - fullName: required but missing
mutation-control-missing-permanent-district.json: 1 error(s)
  - permanentDistrict: required but missing
mutation-control-invalid-enum-gender.json: 1 error(s)
  - gender: value "unknown" not in enum ["female","male","other"]
mutation-control-invalid-enum-passport-type.json: 1 error(s)
  - passportType: value "tourist" not in enum ["ordinary","official","diplomatic"]
mutation-control-invalid-email-pattern.json: 1 error(s)
  - email: value "not-an-email" does not match pattern ^[^@\s]+@[^@\s]+\.[^@\s]+$
mutation-control-missing-conditional-foreign-passport-no.json: 1 error(s)
  - foreignPassportNo: required but missing
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/dip/e-passport-application-form/1.0.0/schema.json
ok   registry/bd/dip/e-passport-application-form/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/dip/e-passport-application-form/1.0.0/schema.json
ok   registry/bd/dip/e-passport-application-form/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv`/`ajv-formats` present in this
worktree at the start of this cycle; ran `npm ci --include=dev` inside
`tools/` first, per this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Bangladesh's **Passport vertical (3 of 6)**; Taxes and DMV are
  already published. Business Formation, Visa, and National ID remain
  open backlog per prior cycles' screening.
- `jurisdiction.level` is `national` — DIP is Bangladesh's national passport
  and immigration authority.
- `process.type` is `application`; see "Language" above for the
  `process.language: bn` judgment call.
- Companion candidates for a future cycle: (1) the official/diplomatic
  sub-pathway (items 32-37) excluded here, as its own companion schema,
  mirroring this registry's CH-ZH Hilfsblatt / GR AADE Ε2-Ε3 companion-
  schedule precedent; (2) the re-issue pathway (items 9-12, 78-83), which
  would need this same form modeled from the opposite (holder-already-has-
  a-passport) angle; (3) Bangladesh's remaining Business Formation, Visa,
  and National ID verticals.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the
object-storage-hosted PDF has not been silently replaced with a revised
edition (this cycle captured its `last-modified: Wed, 18 Feb 2026 10:29:40
GMT` header to anchor a future diff, unlike the BRTA cycle's PDF host, which
returned no such header); (2) re-attempting DIP's own site
(`dip.gov.bd`)/the online e-passport portal (`epassport.gov.bd`) directly,
in case a more authoritative first-party specimen becomes reachable in the
future; (3) whether a future cycle wants to model the official/diplomatic
sub-pathway or the re-issue pathway as separate companion schemas.
