# Verification record — `th/dlt/vehicle-registration-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2637**, a child issue of
**GOV-2635**'s scouting cycle. It closes **Thailand's DMV vertical (4 of 6)**,
using the Department of Land Transport's (DLT) "แบบคำขอจดทะเบียนรถ" (Vehicle
Registration Application, form code ขส.บ. 10 ท.-9).

## Source verification (independently re-derived, not copied from the task)

- **Primary source:** `https://www.sc-broker.com/attachments/download/?attach_id=256280`
  ("คำขอจดทะเบียนรถ+บันทึกตรวจสภาพรถ.pdf"). The task's briefing named only the
  hosting domain and a print-shop-mirror description, not this exact URL; it
  was independently located this cycle by searching `sc-broker.com` for the
  form title, landing on
  `https://www.sc-broker.com/17313338/...` (a Thai-language forms-index page),
  which listed three vehicle-registration-adjacent PDFs. Of the three, only
  this one ("คำขอจดทะเบียนรถ+บันทึกตรวจสภาพรถ.pdf", i.e. "vehicle registration
  application + vehicle inspection record") matches the task's own two-page,
  ~20/~30-field breakdown; the other two (a plain "คำขอจดทะเบียนรถ.pdf" and a
  "แบบคำขอจดทะเบียนรถ_ตามกฎหมายว่าด้วยรถยนต์.pdf") were not fetched further
  once this one's content matched.
- Fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **548979 bytes**.
  - **`sha256`:**
    `be2e766645a299990c9d6d557f2a59bb652f7c094782abed6ae54d6811580213`
    (computed via `sha256sum` on the freshly-downloaded file).
- The Department's own e-form portal, `dlt.go.th`, was independently
  re-attempted this cycle: `curl --max-time 10 https://www.dlt.go.th` and
  `https://web.dlt.go.th` both returned a TLS/connection failure (curl exit
  code 35, `HTTP:000`) — confirming the task's claim that this environment
  cannot reach the primary portal, not merely trusting it.
- Parsed with `pdfjs-dist@4` (legacy build), installed in a scratch
  directory (not a repo dependency):
  - `getAnnotations({intent:'display'})` returned **zero Widget-subtype
    annotations on either page** — this is a **plain print-and-fill
    document, not a fillable AcroForm** (unlike the other recent `th/*`
    schemas, which were all AcroForms).
  - `getTextContent()` returned a garbled character stream on both pages
    (e.g. `":!'tuYl"` where Thai text should be) — the embedded font subset
    carries vector glyph outlines but no usable `ToUnicode`/cmap, so the
    text layer does not decode to real characters even though the page
    renders correctly.
  - Worked around this by rendering both pages to PNG at 2.5x scale via
    `pdfjs-dist` + `@napi-rs/canvas` and reading the rendered glyphs
    directly (visually) to extract the true field list, rather than relying
    on `getTextContent()`.
  - Page 1's printed footer reads **"ขส.บ. 10 ท.-9"**, confirming the task's
    cited form code exactly.

## Independent corroboration (and a ruled-out false lead)

- **Corroborating source:**
  `https://chaiyaphumdlt.go.th/fileupload/611792.pdf` — "คู่มือสำหรับ
  ประชาชน: การจดทะเบียนรถ รถใหม่ รถเปลี่ยนประเภท รถที่แจ้งไม่ใช้ตลอดไป (N)"
  (Chaiyaphum Provincial Land Transport Office's own citizen-service manual
  for exactly the new-vehicle/type-change registration process this form
  covers, under the Motor Vehicle Act B.E. 2522 — the same two options,
  "รถใหม่" / "รถเปลี่ยนประเภท", printed on this form's own
  `registrationPurpose` checkbox line). Fetched independently: **HTTP 200**,
  `application/pdf`, **97854 bytes**, `sha256:
  11d27992812879c548e7e6dca5a7fab8504a16caa9e339953b63acdb2adb7bbb`. Its
  final page's own "แบบฟอร์ม ตัวอย่างและคู่มือการกรอก" (forms/examples/
  filling-guide) section lists, by name: (1) "แบบคำขอจดทะเบียนรถ" (this
  form), (2) "แบบคำขออื่นๆ", (3) "หนังสือมอบอำนาจ" (power of attorney) — the
  last of which matches this form's own `powerOfAttorney` document-checklist
  entry.
- **Ruled-out false lead:** an earlier same-domain candidate,
  `https://www.chaiyaphumdlt.go.th/fileupload/272054.pdf`, was fetched and
  read first (it was the top search hit for a query combining the domain and
  the form's Thai title) but does **not** corroborate this form. It is a
  citizen-service manual titled "การจดทะเบียนรถ (พ.ร.บ.การขนส่งทางบก พ.ศ.
  2522) (N)" — governing registration under the **Land Transport Act**
  (commercial/transport-operator vehicles: buses, trucks-for-hire), a
  different legal basis from this form's **Motor Vehicle Act** scope — and
  its own forms section on page 7 explicitly states **"ไม่มีแบบฟอร์ม"** ("no
  form provided"). Disclosed here rather than silently swapped for the
  correct citation, since it demonstrates why the exact corroborating
  document had to be independently re-derived rather than assumed from the
  domain alone.

## Discovery that reframed this form's actual content

The task's own briefing described page 2 as "~30 more fields (vehicle
inspection record: weight, engine specs, lighting, brakes, tires,
emissions)" without further characterizing who completes them. Independent
reading of the rendered page 2 found it is **"บันทึกการตรวจสภาพรถ" (Vehicle
Condition Inspection Record)**, a 27-item checklist across four numbered
inspection stations:

- **จุดตรวจที่ 1** (items 1-8): chassis number/address, engine
  type/fuel/number/address, cylinder count/cc/hp/kW/axles/wheels/tyres,
  hand/foot brakes, exhaust-noise-and-emissions system (noise level in dB,
  CO%/smoke opacity, HC in ppm, catalytic converter), horn, speedometer.
- **จุดตรวจที่ 2** (items 9-13): headlamp high/low beam, turn/tail/stop
  lamps, plate-illumination/other lamps, windscreen wipers, windscreen/rear
  glass and tint film (light transmission %).
- **จุดตรวจที่ 3** (items 14-18): front-wheel alignment, steering
  system/wheel, wheels and tyres, fuel tank and lines, undercarriage.
- **จุดตรวจที่ 4** (items 19-27): vehicle color, body/frame condition,
  doors and floor, dimensions, seating/seat count, weight, load/axle weight,
  gross weight, other.

Every item has only a pass/fail result column (**ผล**) and each of the four
stations ends with an **inspector's own signature line** ("ผู้ตรวจ"). The
page then closes with a **"สรุปผลการตรวจสภาพรถและข้อบกพร่อง"** (summary of
inspection results and defects) pass/fail checkbox pair, signed by a
**"ผู้วินิจฉัยผล"** (the DLT officer who adjudicates the result) — followed
only by a final line where the **applicant** acknowledges having been
informed of the inspection result by signing.

This is **entirely government-generated content produced during in-person
vehicle inspection at the land transport office**, not applicant-submitted
data — structurally the same kind of discovery as `th/dbd/boj-1`'s bundled
Registrar-issued certificate template, or `in/morth/vehicle-registration`'s
excluded transport-vehicle extra items: content a naive reading of the
task's field-count estimate might expect to model as applicant-facing
`fields[]`, but which the source itself frames as staff output, not input.
Page 1 itself likewise closes with a **"เฉพาะเจ้าหน้าที่" (staff only)**
block (7 numbered items: evidence verification, plate-number issuance,
account-record verification, fee calculation, final sign-off), separate
from the applicant's own submission above it.

## Scoping decision

### In scope (21 `fields[]` + 7 `documents[]` entries, all from page 1's
applicant-facing content)

1. `officeIntakeReference` — the intake box's request no./received
   date/receiving officer (disclosed judgment call below).
2. `applicationDate` — the day/month-name/Buddhist-year header line.
3. `applicantFullName` / 4. `applicantAge` / 5. `applicantNationality` —
   applicant identity.
6-12. `addressHouseNumber`, `addressMoo`, `addressSoi`, `addressRoad`,
   `addressSubdistrict`, `addressDistrict`, `addressProvince`,
   `phoneNumber` — the applicant's address block, split field-by-field
   per the source's own separate blanks.
13. `registrationPurpose` — the 2-value checkbox (new vehicle / type or
    characteristic change).
14. `existingRegistrationPlateNumber` — `requiredWhen`
    `registrationPurpose` is `typeOrCharacteristicChange`, per the
    source's own single checkbox-plus-blank line.
15-19. `vehicleType`, `chassisNumber`, `engineType`, `engineNumber`,
    `vehicleUseCategory` — vehicle/engine identification.
20. `otherAttachmentDescription` — the free-text companion to the
    checklist's "อื่นๆ" (other) option.
21. `documents[]` (7 entries) — the page-1 supporting-document checklist:
    hire-purchase agreement, payment receipt, a combined ID-card-copy +
    house-registration-copy entry (modeled as one entry per the source's
    own single checkbox line), the "other" option, sale/transfer notice,
    power of attorney, and buyer's juristic-person registration
    certificate.

### Out of scope, disclosed

- **The office-only intake reference is a single combined field, not
  three.** The source prints "คำขอที่.../รับวันที่.../ผู้รับ..." as three
  visually distinct blanks in one header box; since this is a plain
  print-and-fill form (no AcroForm widget layout to defer to), they *could*
  be split, but they were combined into one `officeIntakeReference` string,
  consistent with `th/dbd/boj-1`'s own precedent for this exact kind of
  registrar-completed intake annotation. Disclosed as a judgment call.
- **Page 1's "เฉพาะเจ้าหน้าที่" (staff-only) block** (7 numbered items:
  evidence check, plate-number issuance, account verification, fee
  calculation, final sign-off) — completed by DLT staff at the counter, not
  the applicant.
- **The entirety of page 2** ("บันทึกการตรวจสภาพรถ", 27 inspection items
  across 4 stations plus a pass/fail adjudication) — see "Discovery" above.
  Entirely inspector/officer-generated, not applicant input.
- **No signature field modeled.** The applicant's signature line ("ลงชื่อ
  ....... ผู้ยื่นคำขอ") has no adjacent date sub-line on this form (the
  filing date is already captured by `applicationDate` at the top) and no
  fillable mechanism exists (this is a wet-ink line on a print-and-fill
  form) — consistent with this registry's established convention
  (`th/mfa/non-immigrant-visa-b-application-for-employment`'s
  `refundDeclarationDate`/`touristTransitDeclarationDate` precedent) of not
  inventing a field for a bare signature line.
- **`documents[]` requiredness.** None of the 7 checklist items are marked
  `required: true`; the source form itself presents them as a plain
  checklist with no asterisks or explicit per-scenario requirement rules
  (which combination applies depends on how the vehicle was acquired — cash
  purchase, hire-purchase, import, transfer — a determination the form
  leaves to the applicant's own circumstances, not a rule this schema can
  encode without inventing logic the source doesn't state). Disclosed here
  rather than guessed with fabricated `requiredWhen` conditions.
- **`vehicleType`, `engineType`, and `vehicleUseCategory` are modeled as
  free-text `string`, not `enum`.** The source prints each as a blank line
  with no enumerated options to choose from.

## Conformance run

Two hand-authored valid fixtures under
`conformance/th/dlt/vehicle-registration-application/1.0.0/`:

- **`valid-new-vehicle-individual-applicant.json`** — a `newVehicle`
  registration by an individual applicant, with an ID-card/house-
  registration copy and a payment receipt attached.
- **`valid-type-change-with-poa-and-other-doc.json`** — a
  `typeOrCharacteristicChange` registration (exercising
  `existingRegistrationPlateNumber`), filed via a power of attorney, with an
  "other" supporting document and its free-text description.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice) validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-new-vehicle-individual-applicant.json \
    valid-type-change-with-poa-and-other-doc.json
valid-new-vehicle-individual-applicant.json: 0 error(s)
valid-type-change-with-poa-and-other-doc.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-applicant-name.json`** — drops
  `applicantFullName` (a static `required: true` field) from the
  new-vehicle valid fixture.
- **`mutation-control-missing-house-number.json`** — drops
  `addressHouseNumber`.
- **`mutation-control-missing-registration-purpose.json`** — drops
  `registrationPurpose`.
- **`mutation-control-invalid-enum-registration-purpose.json`** — sets
  `registrationPurpose` to `"usedVehicleImport"`, not one of the enum's 2
  values.
- **`mutation-control-invalid-type-applicant-age.json`** — sets
  `applicantAge` to the string `"thirty-five"` instead of an integer.
- **`mutation-control-missing-existing-plate-number.json`** — starts from
  the type-change valid fixture and drops only
  `existingRegistrationPlateNumber`, isolating the `requiredWhen`
  violation.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-applicant-name.json \
    mutation-control-missing-house-number.json \
    mutation-control-missing-registration-purpose.json \
    mutation-control-invalid-enum-registration-purpose.json \
    mutation-control-invalid-type-applicant-age.json \
    mutation-control-missing-existing-plate-number.json
mutation-control-missing-applicant-name.json: 1 error(s)
  - applicantFullName: required but missing
mutation-control-missing-house-number.json: 1 error(s)
  - addressHouseNumber: required but missing
mutation-control-missing-registration-purpose.json: 1 error(s)
  - registrationPurpose: required but missing
mutation-control-invalid-enum-registration-purpose.json: 1 error(s)
  - registrationPurpose: value "usedVehicleImport" not in enum ["newVehicle","typeOrCharacteristicChange"]
mutation-control-invalid-type-applicant-age.json: 1 error(s)
  - applicantAge: expected type integer, got "thirty-five"
mutation-control-missing-existing-plate-number.json: 1 error(s)
  - existingRegistrationPlateNumber: required but missing
```

All six negative controls raised exactly one error each, and neither valid
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

- Closes Thailand's **DMV vertical (4 of 6)**; Taxes, Business Formation,
  and Visa are already published. National ID and Passport remain
  screened/backlog per prior cycles.
- `jurisdiction.level` is `national` — DLT is Thailand's national land
  transport authority, operating through provincial/Bangkok offices.
- `process.type` is `registration`; `process.language` is `th`.
- The driver's-licence application was separately screened in this cycle's
  parent research (GOV-2635) and confirmed a dead end (in-person only,
  staff-filled, no downloadable specimen) — not re-attempted here.
- Companion candidates for a future cycle: a dedicated schema for
  "บันทึกการตรวจสภาพรถ" (the Vehicle Condition Inspection Record) itself, if
  GovSchema decides to model government-generated inspection-output
  documents (an open scope question, not resolved here, mirroring the
  unresolved Certificate-of-Incorporation question raised in
  `th/dbd/boj-1`'s own VERIFICATION.md); and Thailand's remaining Passport
  and National ID verticals, still screened/backlog.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-attempting `dlt.go.th`
directly, since this schema is sourced from an unauthenticated third-party
mirror rather than the Department's own site; (2) confirming the
print-shop-hosted PDF has not been silently replaced with a revised edition
(no `Last-Modified` header was available from this mirror to anchor a
future diff against, unlike `th/dbd/boj-1`'s own source); (3) whether a
future cycle wants to model the page-2 inspection record and/or a
personalized driver's-licence schema once/if a fillable specimen surfaces.
