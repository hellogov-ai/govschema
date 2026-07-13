# Verification record — `th/dlt/vehicle-registration-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2637**. It closes Thailand's
DMV vertical gap, bringing Thailand to **4 of 6 verticals** (Taxes,
Business Formation, Visa were already open; National ID and Passport remain
open backlog).

## Source verification (independently re-derived, not copied from the task)

### Primary source: sc-broker.com mirror of ขส.บ. 10

- **URL:** `https://www.sc-broker.com/attachments/view/?attach_id=330468`
- An **initial fetch attempt this cycle returned an HTTP 404 HTML error
  page**, not a PDF — disclosed here rather than silently retried away.
  **Three subsequent retries all returned HTTP 200** with a real
  `application/pdf` response, `Content-Length: 1025611` bytes,
  **`sha256`: `0b73ac4ad06c9430dd46ece1cf0863b7127ff5f62a08bf7516fcba548d5f4d55`**
  (computed independently via `sha256sum` on the freshly-downloaded file).
  This is treated as a **transient availability blip on the mirror's side**
  (a session/WAF hiccup), not the source being dead, because:
  - All three retries agreed byte-for-byte.
  - A **Wayback Machine snapshot** of the identical URL, taken 2025-09-17
    (`http://web.archive.org/web/20250917024900/https://www.sc-broker.com/attachments/view/?attach_id=330468`),
    independently fetched this cycle, is **byte-identical**
    (same sha256) to the live retries — meaning the document at this URL has
    not changed in nearly a year, further supporting that it is a stable,
    genuine document rather than an artifact of the momentary 404.
  - The task's own briefing separately confirmed reaching this same document
    in a prior cycle.
- **dlt.go.th** (the DLT's own e-form portal) was **unreachable this cycle**:
  `curl` returned exit code 35 (SSL/TLS connect error) against
  `https://www.dlt.go.th` directly, consistent with the task's own note that
  a prior sandbox hit the same failure. This is recorded as a network/TLS
  issue on this environment's path to dlt.go.th, not evidence the form does
  not exist on the official portal. If dlt.go.th becomes reachable in a
  future review, it should be preferred as the canonical `source.url`.
- Parsed with `pdfjs-dist@3` (legacy build, `getTextContent()`), installed in
  a scratch directory (not a repo dependency):
  - **2 pages**, real extractable vector text (not a scanned image) — page 1
    yielded 3339 characters of Thai text top-to-bottom, page 2 yielded 3628
    characters.
  - **Page 1** confirmed to be the applicant-facing request: opens with
    "เรียน นายทะเบียน ข้าพเจ้า..." (an address to the Registrar naming the
    applicant), followed by age, nationality, an address broken into house
    number/moo/soi-lane/road/tambon/amphoe/changwat/phone, a
    new-vehicle-vs-type-change registration choice (the latter carrying an
    existing plate number), vehicle type, chassis number, engine
    type/number, intended-use purpose, a supporting-evidence checklist
    ("หลักฐานประกอบคำขอ ดังนี้ ..."), and an applicant certification/signature
    line. The remainder of page 1's text (fee computation in บาท/สตางค์,
    a numbered sequence of registrar-office review/verification steps, and
    the eventual issuance of a new registration number) is explicitly
    DLT-staff-facing ("เฉพาะเจ้าหน้าที่ ขส.บ. 10 ..."), confirming it is out
    of scope for an applicant-input schema.
  - **Page 2** confirmed to be a vehicle-inspection record ("บันทึกการตรวจ
    สภาพรถ"): vehicle weight, engine cc/kW, number of axles/wheels/tires,
    brakes, an emissions block (noise in dB(A), CO%/HC ppm, catalytic
    converter), lighting (high/low beam, turn, tail, stop, plate-illumination
    lamps), horn, speedometer, body condition, seating capacity, windshield
    film light-transmittance percentage, and a numbered 1-27 checkpoint grid
    with pass/fail ("ผ่าน"/"ไม่ผ่าน") — all completed and signed by DLT
    inspection staff ("ผู้ตรวจ", "ผู้วินิจฉัยผล"). The **only** applicant-facing
    text on page 2 is a single acknowledgment line at the end: "ได้รับทราบผล
    การตรวจสภาพแล้ว ลงชื่อ...(ผู้ยื่นคำขอ)" ("Acknowledged the inspection
    result — Signed (applicant)"). This is disclosed explicitly (see Scoping
    decision) rather than silently dropped.

### Corroborating source: Chaiyaphum provincial DLT office citizen manual

- **URL:** `https://www.chaiyaphumdlt.go.th/fileupload/611792.pdf`
  ("คู่มือสำหรับประชาชน: การจดทะเบียนรถ" — "Citizen's manual: vehicle
  registration").
- Independently fetched this cycle: **HTTP 200**, `Content-Type:
  application/pdf`, `Content-Length: 97854` bytes,
  `Last-Modified: Thu, 13 May 2021`, **`sha256`:
  `11d27992812879c548e7e6dca5a7fab8504a16caa9e339953b63acdb2adb7bbb`**.
  Parsed the same way with `pdfjs-dist`: 4 pages, real extractable text.
- **Page 4**, under its own "แบบฟอร์ม ตัวอย่างและคู่มือการกรอก" ("Forms,
  samples, and filling guide") section, explicitly lists **"แบบคำขอจด
  ทะเบียนรถ"** ("Vehicle Registration Application Form") as item 1 of the
  office's own official forms — directly corroborating that this is a
  current, real DLT form, not a stale or unofficial document.
- **Page 3**'s supporting-documents table separately lists a national ID
  card requirement ("บัตรประจำตัวประชาชน ฉบับจริง 1 ฉบับ", noted as
  applicable "เฉพาะกรณีผู้ถือกรรมสิทธิ์รถมาดำเนินการด้วยตนเอง เท่านั้น" — "only
  when the vehicle's title-holder appears in person") and a corporate
  registration certificate requirement, for the general vehicle-registration
  process this provincial office describes (new vehicle / type change / not-
  in-use notification bundled together), not specifically keyed to ขส.บ. 10's
  own text. This is used here **only as corroborating context**, not copied
  into a field-level conditional rule this document's own form text does not
  itself encode (see `documents[].nationalIdCardOrCopy`'s `sourceRef`).

## Scoping decisions

### In scope (18 fields + 8 `documents[]` entries, from page 1 of ขส.บ. 10)

- Applicant particulars: `applicantFullName`, `applicantAge`,
  `applicantNationality`.
- Address, broken into the form's own components:
  `addressHouseNumber` (required), `addressMoo`/`addressSoi`/`addressRoad`
  (optional — not every Thai address has a village number, lane, or named
  road), `addressTambon`/`addressAmphoe`/`addressChangwat` (required — the
  three-level administrative address needed to identify a location),
  `applicantPhoneNumber` (optional).
- `registrationType` (enum: `new_vehicle` / `type_or_characteristic_change`)
  and `existingPlateNumber` (`requiredWhen` a type/characteristic change).
- Vehicle identification: `vehicleType`, `chassisNumber`, `engineType`,
  `engineNumber`, `vehicleUsagePurpose`.
- The page-1 supporting-evidence checklist, modeled as 7 `documents[]`
  entries (`hirePurchaseContract`, `noticeOfSale`, `paymentReceipt`,
  `powerOfAttorney`, `nationalIdCardOrCopy`, `corporateRegistrationCertificate`,
  `otherEvidence`) plus a paired `otherEvidenceAttached`/
  `otherEvidenceDescription` field pair for the checklist's free-text
  "other" item.
- `documents[].applicantSignature` (`attestation`, required) — the
  applicant's certification to comply with road-use law, immediately
  preceding the signature line.

### Out of scope, disclosed

- **All of page 2** (the vehicle-inspection record) — completed by DLT
  inspection staff, not an applicant input. This includes the single
  applicant-facing acknowledgment-of-inspection-result signature line
  noted above: it is contingent on a completed staff inspection outcome
  this schema does not model (there is no field capturing the inspection's
  pass/fail result for the acknowledgment to logically attach to), so
  modeling it in isolation would imply a data point (the inspection result)
  this v1.0.0 does not otherwise carry. Flagged as a companion-schema
  candidate for a future cycle (a DLT-staff-facing vehicle-inspection-record
  schema) rather than modeled here.
- **The DLT-staff-only bottom portion of page 1** — fee computation (tax,
  plate fee, registration-booklet fee, etc.), the registrar office's
  document-verification/certification steps, and the eventual issuance of a
  new registration number. All explicitly marked "เฉพาะเจ้าหน้าที่" (staff
  only) in the source text.
- **`vehicleType`/`engineType` modeled as free-text strings, not enums** —
  unlike some sibling Thai/Swedish DMV-vertical schemas whose source forms
  present these as discrete checkboxes with a documented code list, ขส.บ.
  10's own page-1 text presents both as plain blank fill-in lines with no
  accompanying option list; inventing an enum not evidenced by this form's
  own text would be a fabrication, so both remain `type: string`.
- **The supporting-evidence checklist's requiredness is left
  unconditional/optional for every item** — the source presents this as one
  flat checklist ("หลักฐานประกอบคำขอ ดังนี้ ...") without tying any item to
  `registrationType` or any other single field in the form's own text (e.g.
  whether a hire-purchase contract, a notice of sale, or neither applies
  depends on the specific transaction behind the registration, which the
  form does not ask about directly). The corroborating Chaiyaphum manual's
  in-person-appearance condition on the national-ID-card item was
  considered but **not** encoded as a `requiredWhen`, since (a) it comes from
  a secondary/generic source describing the office's broader process, not
  ขส.บ. 10's own text, and (b) this schema does not model an
  "appearing-in-person-vs-via-representative" field for it to gate on.
  Disclosed here rather than invented.
- **The applicant's address is not modeled with a postal code field** —
  ขส.บ. 10's own address block does not include one.

## Conformance run

Two hand-authored valid fixtures under
`conformance/th/dlt/vehicle-registration-application/1.0.0/`:

- **`valid-new-vehicle-registration.json`** — a new-vehicle registration in
  Bangkok, no optional checklist items beyond the applicant's own signature.
- **`valid-type-change-with-other-evidence.json`** — a type/characteristic
  change carrying an existing plate number, with a power-of-attorney and a
  free-text "other evidence" item both attached.

Four mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-chassis-number.json`** — drops `chassisNumber`
  (a static `required: true` field) from the new-vehicle valid fixture.
- **`mutation-control-missing-existing-plate-number.json`** — a
  `type_or_characteristic_change` registration with `existingPlateNumber`
  omitted, violating its `requiredWhen`.
- **`mutation-control-invalid-enum-registration-type.json`** — sets
  `registrationType` to `"used_vehicle_transfer"`, not one of the enum's two
  values.
- **`mutation-control-invalid-type-applicant-age.json`** — sets
  `applicantAge` to the string `"สามสิบห้า"` instead of an integer.

Both valid fixtures and all four mutation-control fixtures were checked with
a from-scratch, disposable Node conformance checker
(`check_conformance_dlt.mjs`, not committed — this registry's own
established practice) validating `required`/`requiredWhen`/`type`/
`validation.{enum,minimum,maximum,pattern,minLength,maxLength}` and
`documents[].required`/`requiredWhen` directly against `spec/v0.3/SPEC.md`'s
own rules:

```
$ node check_conformance_dlt.mjs schema.json \
    valid-new-vehicle-registration.json \
    valid-type-change-with-other-evidence.json
valid-new-vehicle-registration.json: 0 error(s)
valid-type-change-with-other-evidence.json: 0 error(s)

$ node check_conformance_dlt.mjs schema.json \
    mutation-control-missing-chassis-number.json \
    mutation-control-missing-existing-plate-number.json \
    mutation-control-invalid-enum-registration-type.json \
    mutation-control-invalid-type-applicant-age.json
mutation-control-missing-chassis-number.json: 1 error(s)
  - chassisNumber: required but missing
mutation-control-missing-existing-plate-number.json: 1 error(s)
  - existingPlateNumber: required but missing
mutation-control-invalid-enum-registration-type.json: 1 error(s)
  - registrationType: value "used_vehicle_transfer" not in enum ["new_vehicle","type_or_characteristic_change"]
mutation-control-invalid-type-applicant-age.json: 1 error(s)
  - applicantAge: expected type integer, got "สามสิบห้า"
```

All four negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/th/dlt/vehicle-registration-application/1.0.0/schema.json
ok   registry/th/dlt/vehicle-registration-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/th/dlt/vehicle-registration-application/1.0.0/schema.json
ok   registry/th/dlt/vehicle-registration-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens/closes Thailand's **DMV vertical (4 of 6)**; Taxes, Business
  Formation, and Visa were already open (GOV-2621/GOV-2601/GOV-2602 and
  their predecessors). National ID and Passport remain open backlog.
- `jurisdiction.level` is `national` — DLT is Thailand's national land
  transport authority.
- `process.type` is `registration`; `process.language` is `th` (the source
  form is entirely in Thai).
- Confirmed dead end, per the task's own briefing and not re-investigated
  further this cycle: Thailand's driver's-license application has no
  downloadable form — it is issued via in-person DLT Smart Queue booking
  where staff complete the application on the applicant's behalf. This
  schema does not model driver's licensing.
- Companion candidates for a future cycle, in priority order: (1) a
  DLT-staff-facing vehicle-inspection-record schema modeling ขส.บ. 10's own
  page 2, if GovSchema decides to model inspector/registrar-completed
  output documents at all (an open scope question also flagged by
  `th/dbd/boj-1-application-to-register-a-limited-company`'s own
  VERIFICATION.md for its Certificate-of-Incorporation page); (2) the other
  16 possible registration-related actions the wider DLT vehicle-registry
  process supports (transfer of ownership, deregistration, annual tax
  renewal) which ขส.บ. 10 itself does not cover; (3) re-attempting
  dlt.go.th directly in a future review, to move off the third-party mirror
  onto the DLT's own canonical `source.url` if the TLS/network issue
  resolves.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-attempting dlt.go.th
directly, to replace the sc-broker.com mirror `source.url` with the DLT's
own canonical page if it becomes reachable; (2) re-fetching
`https://www.sc-broker.com/attachments/view/?attach_id=330468` to confirm
whether the transient 404 observed once this cycle recurs (which would
raise the question of the mirror's own reliability) or was truly a one-off;
(3) the vehicle-inspection-record (page 2) and driver's-license backlog
items noted above.
