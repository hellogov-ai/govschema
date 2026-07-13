# Verification record — `th/mfa/passport-application-royal-thai-embassy-london` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2709**. It opens **Thailand's
Passport vertical (5 of 6)**; Taxes (`th/rd/pit-90-personal-income-tax-return`),
Business Formation (`th/dbd/boj-1-application-to-register-a-limited-company`),
Visa (`th/mfa/non-immigrant-visa-b-application-for-employment`), and DMV
(`th/dlt/vehicle-registration-application`) are already modelled. Only
National ID remains open for Thailand after this cycle.

## Candidate screening this cycle

Two Thailand candidates were scouted in parallel: this passport form, and
Thailand's National ID card (บัตรประจำตัวประชาชน, issued by the Department of
Provincial Administration, DOPA/`bora.dopa.go.th`). National ID was screened
and confirmed a **dead end**: every fetchable PDF found (district/amphoe
office "public service guide" documents, e.g. `tasailuad.go.th/pdf/sg1_4.pdf`
and `kabin.go.th`'s equivalent) is a non-fillable, no-`/AcroForm` process
*manual* ("คู่มือสำหรับประชาชน", the standardized citizen-facing guide format
mandated by Thailand's Government Service Act), not a blank application form.
Independent sources (Thai embassy FAQs, legal guides) confirm the ID-card
issuance process is strictly in-person and counter-only: an officer enters
data directly into the BORA system and captures a live photograph/fingerprint
biometrically, printing the internal บ.ป.1 request form from the system
itself — the applicant never fills out a paper form in advance. BORA's own
download page (`bora.dopa.go.th/download/`) lists only training/legal
material, no citizen-facing application PDF. Not pursued.

## Source verification (independently re-derived)

- **URL:** `https://image.mfa.go.th/mfa/0/umufy3EgqL/Passport/Rev_Form_1_Passport_Application_Form_แบบฟอร์ม_1-คำร้องขอหนังสือเดินทางไปต่างประเทศ.pdf`
  (percent-encoded in `schema.json`'s `source.url` per RFC 3986/the meta-schema's
  `format: uri` requirement, since the filename itself is Thai-script UTF-8).
- Located via web search for the Royal Thai Embassy, London's own passport
  service page (`london.thaiembassy.org/en/page/82038-thai-passport`), which
  links MFA's shared `image.mfa.go.th` CDN asset host — the same CDN/site key
  (`umufy3EgqL`) already hosting the embassy's own site assets, not a
  third-party mirror.
- Fetched independently via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 295714`
    bytes.
  - **`sha256`:** `da567c0215b34de801b6929708819e86a52d81188993cc18a504d73d8a5d36a5`
    (computed via `sha256sum` on the freshly-downloaded file).
- Parsed with `pdfjs-dist@4` (legacy build): `getAnnotations()` confirms
  **0 Widget annotations** on the form's single page (a plain print-and-fill
  form, not an AcroForm); `getTextContent()` confirms a real, fully
  extractable Thai-language text layer (114 text items) — not a scanned
  image. Every field below was read via coordinate-sorted line grouping
  (`getTextContent()` items grouped by rounded `y`, ordered by `x`), the same
  technique used across this registry's other flat-print-form entries (e.g.
  `bd/dip`, `gh/mfa`).
- Also fetched `london.thaiembassy.org`'s own passport-service page and its
  FAQ prose (client-rendered React/Next.js application; the server-delivered
  HTML included the FAQ text quoted in `schema.json`'s own `description`, but
  no static, fetchable supporting-documents checklist) — corroborating an
  appointment-based, in-person, biometric issuance process for which this
  form is the pre-appointment paperwork, not a substitute.

## Document structure and scope

This is a **single-page, embassy-specific specimen**: it prints the Royal
Thai Embassy, London's own address/contact details in its footer, and its own
blanks are explicitly split between a "Thailand" address/contact block and a
"United Kingdom or Ireland" address/contact block — i.e. it is written for
Thai nationals resident in the UK or Ireland applying at this specific
embassy, not a domestic, nationwide specimen. This is disclosed in the
schema's `title` and `description`, consistent with this registry's
`pt/mne/requerimento-passaporte-consular` precedent for a single-consulate-
scoped passport form.

- **`สัญชาติ` (Nationality) is printed as a fixed value ("ไทย"/Thai), not a
  blank** — the embassy's passport service is restricted to Thai nationals by
  definition. Excluded from `fields[]` entirely (not modelled as a redundant
  single-value enum), per this registry's convention of not modelling
  non-fillable printed constants as fields.
- **No `documents[]` checklist is printed anywhere on this specimen**, unlike
  this registry's `gh/mfa` precedent (which prints an explicit
  evidence-of-citizenship/identity list) — and, as noted above, the embassy's
  own requirements page returned no static, fetchable checklist text this
  cycle. No `documents[]` array is modelled in this v1.0.0; this is a
  disclosed scoping decision, not an assumption that no such requirements
  exist.
- **No printed required-field asterisks exist anywhere on the form.** Per
  this registry's `bd/dip`/`th/dlt` precedent for the same gap, only fields
  unconditionally essential to identifying the applicant and processing a
  passport request are marked `required`: `applicationDate`, `applicantName`,
  `ethnicity`, `nationalIdNumber`, `fullNameEnglish`, `birthProvince`,
  `birthDate`, `addressThailand`, `addressUkIreland`, `emailUkIreland`, and
  `phoneUkIreland` (the last two being the embassy's own stated
  appointment-confirmation channel, per its FAQ). `gender`, `age`,
  `heightCm`, `occupation`, the Thailand email/phone pair, both parents'
  name/ID fields, and both reference-contact blocks are modelled but left
  optional — a disclosed judgment call, since a passport applicant may
  reasonably not know or wish to supply a deceased/estranged parent's
  National ID number, for instance, and the form gives no printed cue that
  any of these is mandatory.
- **`deliveryPreference` is genuinely optional, per the form's own printed
  instruction**: "กรุณาใส่เครื่องหมาย X หน้าข้อความที่ท่านมีความประสงค์
  หากไม่ประสงค์ให้เว้นว่างไว้" ("Please mark X in front of the statement you
  wish; leave blank if you wish neither"). Modelled as a two-value `enum`
  (`postal-return` / `in-person-collection`) rather than two independent
  booleans + an `exclusivityGroups` entry, since the source form presents
  these as two prose statements to choose between (no AcroForm checkbox
  widgets exist at all on this specimen), matching this registry's
  established convention for bare "mark X" prose selectors on plain-print
  forms (cf. `gh/mfa`'s `maritalStatus` treatment for the same class of
  source).
- **`collectionContactPhoneNumber`** carries a `requiredWhen`
  (`deliveryPreference equals in-person-collection`), the one field on this
  form the source itself explicitly ties to a specific choice ("...
  สถานเอกอัครราชทูตฯ สามารถติดต่อข้าพเจ้าได้ที่หมายเลขโทรศัพท์ ..." — printed
  directly inside the in-person-collection statement itself, unlike the
  postal-return statement, which carries no such blank).
- **`birthDate`/`applicationDate`** each collapse a dual-calendar printed
  layout (Thai Buddhist Era พ.ศ. alongside Gregorian ค.ศ., or a bare พ.ศ.
  blank for the application date) into a single canonical ISO date, disclosed
  in each field's own description; the consuming agent is expected to perform
  the Buddhist-era conversion (Gregorian year + 543) itself.
- **`nationalIdNumber`/`fatherNationalIdNumber`/`motherNationalIdNumber`**
  are each validated against Thailand's standard 13-digit National ID Card
  number format (`^[0-9]{13}$`), consistent with this registry's other Thai
  schemas (e.g. `th/rd/pit-90`'s `taxpayerTin`).

## Validation runs

- `node tools/validate.mjs registry/th/mfa/passport-application-royal-thai-embassy-london/1.0.0/schema.json` — **passes**.
- `node tools/validate-ajv.mjs registry/th/mfa/passport-application-royal-thai-embassy-london/1.0.0/schema.json` — **passes** (draft 2020-12, spec v0.3 meta-schema).
- A from-scratch conformance-checker script (scratch, not committed —
  evaluates `required`/`requiredWhen`/`validation.pattern`/`maxLength`/`enum`
  against each fixture) found: both `valid-*.json` scenarios raise **0
  errors**; each of 6 `mutation-control-*.json` fixtures raises **exactly 1
  error**. See
  `conformance/th/mfa/passport-application-royal-thai-embassy-london/1.0.0/`.

## Out of scope, disclosed

- `documents[]` — no checklist is printed on this specimen; not modelled
  (see above).
- `สัญชาติ` (Nationality) — printed as a fixed constant, not a fillable
  field; excluded entirely.
- The embassy's live appointment-booking system itself (referenced in its
  FAQ) is out of scope — this schema models only the pre-appointment paper
  form.
