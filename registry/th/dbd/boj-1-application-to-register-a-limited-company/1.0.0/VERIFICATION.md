# Verification record — `th/dbd/boj-1-application-to-register-a-limited-company` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2601**, a child issue of
GOV-2599's parallel Thailand-vertical delegation (itself following
GOV-2591/GOV-2593's scouting and Taxes-vertical opening). It opens
**Thailand's Business Formation vertical (2 of 6)**, using the Department of
Business Development's (DBD) "แบบ บอจ.1" (Form บอจ.1).

## Source verification (independently re-derived, not copied from the task)

- **URL:** `https://www.dbd.go.th/download/downloads/03_boj/form_boj1.pdf`
- Fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 801091`
    bytes, `Last-Modified: Mon, 18 Mar 2024 08:42:31 GMT`.
  - **`sha256`:**
    `433aace18e925d75236afe99e08796763744040e5f10f5781445e77d70796f72`
    (computed independently via `sha256sum` on the freshly-downloaded file,
    not copied from the task's cited figure) — **matches exactly**.
- Parsed with `pdfjs-dist@4` (legacy build,
  `getAnnotations({intent:'display'})`, filtered to `subtype === 'Widget'`),
  installed in a scratch directory (not a repo dependency):
  - **2 pages**, **101 AcroForm widgets total**.
  - Per-page breakdown: **45 (page 1) / 56 (page 2)** — matches the task's
    cited breakdown exactly.
- Every widget's `fieldName`/`fieldType`/`rect`/`checkBox`/`exportValue` was
  dumped and correlated against `getTextContent()`'s position-sorted text
  rows, checking text on **both sides** of each widget's `rect` (not only to
  the left) — the task's own flagged gotcha, reproduced once in an early
  scratch pass (checkbox labels came back empty when the correlation window
  was left-only, since this form's checkbox labels sit entirely to the
  right of the checkbox glyph) and then fixed before the extraction used for
  this schema.

## Discovery that reframed this form's actual content

Before authoring, the task's own briefing anticipated fields such as a
registered-office address, objectives/Memorandum reference, registered
capital, share structure, and a ~12+-item document-attachment checklist.
Independent extraction and full-text reading of both pages (not just widget
correlation, but a plain top-to-bottom read of `getTextContent()`) found the
live PDF does not carry those fields as its own AcroForm content:

- **Page 1 is a registrar-facing routing/cover form**, not a
  comprehensive company-details form. Its own printed structure is:
  1. A header block (application receipt reference, company name, existing
     registration numbers).
  2. **Section (1)** — "ข้าพเจ้าขอจดทะเบียนบริษัทจำกัด ตามประมวลกฎหมายแพ่ง
     และพาณิชย์ดังต่อไปนี้" ("I request to register a limited company under
     the Civil and Commercial Code, as follows") — **17 checkboxes**
     (`toggle_600` through `toggle_611`, then `toggle_612` through
     `toggle_616`), each a **different registration action**: registering a
     standalone Memorandum of Association; amending the Memorandum before
     incorporation; **new company formation** (`จัดตั้งบริษัทจำกัด`, this
     schema's supported pathway); partnership-to-company conversion; a
     special resolution for capital increase/decrease/merger; capital
     increase/decrease itself; four distinct Memorandum-clause amendments
     (clause 1 company name, clause 2 office, clause 3 objectives, clause 5
     capital/shares); an Articles-of-Association amendment; a merger; a
     director change; an authorized-signing-director amendment; a head-/
     branch-office relocation; a company-seal amendment; and "other
     matters."
  3. **Section (2)** — "เมื่อนายทะเบียนรับจดทะเบียน ... ข้าพเจ้ามีความ
     ประสงค์ดังนี้" ("once the Registrar has registered [this], I
     additionally wish as follows") — **3 further checkboxes**
     (`toggle_617`-`toggle_619`): submit a copy of labor work rules,
     request trademark registration, and request an importer-exporter ID
     card. These are optional add-on requests, independent of which action
     was selected in section (1).
  4. A two-signatory signature block, then a Registrar/witness
     certification block (out of scope — see below).
  - The checklist the task anticipated ("~12+ sequential checkbox
    `toggle_NNN` fields ... a document checklist") **is this same 17+3=20
    checkbox run**, but its actual meaning is a **registration-action-type
    selector plus post-registration add-on requests**, not a checklist of
    physically attached supporting documents. There is no separate
    "documents attached" checklist elsewhere in this PDF's widgets.
  - The substantive company details a naive reading of "application to
    register a limited company" would expect (registered office address,
    objectives, registered capital, share structure) are **not** captured
    as fillable text on บอจ.1 itself — they live in the companion Memorandum
    of Association (หนังสือบริคณห์สนธิ, referenced by `toggle_600`) and other
    companion documents (Articles of Association, list-of-shareholders
    forms) that are separate DBD filings not bundled into this PDF and thus
    out of scope for this schema version.
- **Page 2 is a bundled "หนังสือรับรอง" (Certificate of Incorporation)
  template** — "ขอรับรองว่าบริษัทนี้ได้จดทะเบียนเป็นนิติบุคคล ..." ("[I]
  certify this company has been registered as a juristic person ...") —
  completed and issued by the **Registrar**, listing the company name, up
  to 10 directors (Thai + English name), registered capital, head-office
  address, and objectives-clause count. This is the DBD's **output**
  document, not something the applicant fills in. Confirmed by reading the
  full page-2 text top-to-bottom: every substantive blank on this page is
  paired with registrar-facing language ("ออกให้ ณ วันที่ ... นายทะเบียน").

Given this, v1.0.0 is scoped to **page 1's applicant-facing content for the
new-incorporation (`จัดตั้งบริษัทจำกัด`) pathway only**, with the full
17-value action-type enum modeled (since it is one self-contained checkbox
group in the source) but only that one value's implications fully supported.

## Scoping decision

### In scope (10 fields + 1 `documents[]` entry, from 26 of the 101 widgets)

1. `applicationReceivedReference` — the registrar-intake receipt
   annotation (disclosed judgment call below).
2. `companyName` — the proposed/existing company name.
3. `existingCompanyBookNumber` / 4. `existingCompanyRegistrationNumber` —
   optional, applicable only to a non-new-incorporation action.
5. `registrationActionType` — the full 17-value enum (`toggle_600` through
   `toggle_616`, 17 widgets folded into 1 field).
6. `laborBylawCopyRequested` / 7. `trademarkRegistrationRequested` /
   8. `importExportCardRequested` — the 3 post-registration add-on
   checkboxes (`toggle_617`-`toggle_619`).
9. `applicantSignatoryName` / 10. `applicantSignatoryName2` — the
   two-signatory signature block.
11. `documents[].falseStatementWarningNotice` — the page-1 footer's
    3-item statutory warning notice ("คำเตือน").

### Out of scope, disclosed

- **The 16 non-new-incorporation `registrationActionType` values' own
  dependent free-text sub-fields** — 14 `Tx` widgets tied to those actions:
  `Text504` (MOA-amendment-before-incorporation item number), `Text505`/
  `Text506` (partnership-conversion name + registration number), `Text576`/
  `Text577` (special-resolution / capital-increase-decrease sub-labels),
  `Text578` (MOA clause 5 capital/shares/share-value sub-label), `Text507`
  (Articles-amendment item number), `Text508`/`Text509`/`Text510`/`Text575`
  (merger — merging and merged-with company names/registration numbers),
  `Text511`/`Text512` (director in/out counts), `Text579` (office-relocation
  sub-label). None apply to the `newIncorporation` pathway this v1.0.0
  targets, since a brand-new company has no prior registration number,
  directors-to-change count, or Memorandum clause to amend yet.
- **The Registrar/witness certification block** (`Text515`-`Text518`):
  "ขอรับรองว่าผู้ขอจดทะเบียนได้ลงลายมือชื่อต่อหน้าข้าพเจ้าจริง บันทึก
  นายทะเบียน" ("I certify the applicant signed in front of me — Registrar's
  record") plus the registered date, Registrar's printed name, and position
  seal. Completed by DBD staff at the counter, not the applicant.
- **All of page 2** (56 widgets) — the bundled "หนังสือรับรอง" Certificate
  of Incorporation template, a Registrar-issued output document (see
  "Discovery" above), not part of the applicant's own submission.
- **`Text580`** — a `Tx` widget whose `rect` coincides almost exactly with
  the static printed heading "ลงลายมือชื่อผู้เริ่มก่อการผู้ขอจดทะเบียน /
  กรรมการผู้มีอำนาจผูกพันบริษัท" itself (rather than a blank-fill area below
  or beside it). **Disclosed judgment call:** could not confidently
  determine what free-text this widget expects the signer to enter beyond
  what `applicantSignatoryName`/`applicantSignatoryName2` already capture;
  not modeled rather than guessed.
- A page-1 top-of-page `Text500`/receipt-line widget spans both a
  "received date" blank and a "request number" blank on one printed line
  with only a single AcroForm widget. **Disclosed judgment call:** modeled
  as one optional `applicationReceivedReference` string rather than
  splitting into two fields the source's own widget layout does not
  support splitting.
- `existingCompanyBookNumber`/`existingCompanyRegistrationNumber` are left
  **unconditionally optional** (no `requiredWhen`) rather than gated on
  `registrationActionType notEquals "newIncorporation"`: since this v1.0.0
  does not model any of the other 16 action types' own required sub-fields
  either, adding conditional-requiredness logic only for these two would be
  inconsistent scope-narrowing rather than a genuine source-driven rule —
  disclosed here rather than silently added.

## Conformance run

Two hand-authored valid fixtures under
`conformance/th/dbd/boj-1-application-to-register-a-limited-company/1.0.0/`:

- **`valid-new-incorporation-single-signatory.json`** — a new-incorporation
  filing with a single applicant signatory and no post-registration
  add-on requests.
- **`valid-new-incorporation-two-signatories-with-addons.json`** — a
  new-incorporation filing with an administrative receipt reference, two
  signatories, and two of the three post-registration add-on requests
  (labor-bylaw copy, trademark) checked.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice) validating `required`/`requiredWhen`/
`type`/`validation.{enum,minimum,maximum,pattern,minLength,maxLength}`
directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-new-incorporation-single-signatory.json \
    valid-new-incorporation-two-signatories-with-addons.json
valid-new-incorporation-single-signatory.json: 0 error(s)
valid-new-incorporation-two-signatories-with-addons.json: 0 error(s)
```

Five mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-company-name.json`** — drops `companyName`
  (a static `required: true` field) from the single-signatory valid
  fixture.
- **`mutation-control-missing-registration-action-type.json`** — drops
  `registrationActionType`.
- **`mutation-control-missing-signatory-name.json`** — drops
  `applicantSignatoryName`.
- **`mutation-control-invalid-enum-registration-action-type.json`** — sets
  `registrationActionType` to `"companyDissolution"`, not one of the
  enum's 17 values.
- **`mutation-control-invalid-type-boolean-addon.json`** — sets
  `laborBylawCopyRequested` to the string `"yes"` instead of a boolean.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-company-name.json \
    mutation-control-missing-registration-action-type.json \
    mutation-control-missing-signatory-name.json \
    mutation-control-invalid-enum-registration-action-type.json \
    mutation-control-invalid-type-boolean-addon.json
mutation-control-missing-company-name.json: 1 error(s)
  - companyName: required but missing
mutation-control-missing-registration-action-type.json: 1 error(s)
  - registrationActionType: required but missing
mutation-control-missing-signatory-name.json: 1 error(s)
  - applicantSignatoryName: required but missing
mutation-control-invalid-enum-registration-action-type.json: 1 error(s)
  - registrationActionType: value "companyDissolution" not in enum [...]
mutation-control-invalid-type-boolean-addon.json: 1 error(s)
  - laborBylawCopyRequested: expected type boolean, got "yes"
```

All five negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/th/dbd/boj-1-application-to-register-a-limited-company/1.0.0/schema.json
ok   registry/th/dbd/boj-1-application-to-register-a-limited-company/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/th/dbd/boj-1-application-to-register-a-limited-company/1.0.0/schema.json
ok   registry/th/dbd/boj-1-application-to-register-a-limited-company/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Thailand's **Business Formation vertical (2 of 6)**; Taxes opened
  Thailand as the registry's 44th jurisdiction via GOV-2593.
  `jurisdiction.level` is `national` — DBD is Thailand's national business
  registration authority.
- `process.type` is `filing`; `process.language` is `th` (the source form
  is entirely in Thai).
- `documents[]` carries the page-1 footer's 3-item statutory
  false-statement/late-filing warning notice, modeled as an `attestation`
  the applicant implicitly acknowledges by signing and submitting the form
  (the source itself frames it as a warning notice rather than a
  first-person "I certify" statement — disclosed here as a framing
  difference from `th/rd/pit-90-personal-income-tax-return`'s own
  first-person `certificationStatement` entry).
- Companion candidates for a future cycle, in priority order: a dedicated
  schema for the Memorandum of Association (หนังสือบริคณห์สนธิ) itself,
  which would carry the registered-office address/objectives/capital/share
  fields a reader might expect from บอจ.1; the other 16
  `registrationActionType` pathways (amendments, mergers, conversions,
  director changes), each of which would need its own dependent sub-fields
  modeled; and the "หนังสือรับรอง" Certificate of Incorporation as a
  separate registrar-output schema, if GovSchema decides to model
  registrar-issued outputs at all (a scope question for the project, not
  resolved here).
- Thailand's DMV, Passport, National ID, and Visa verticals remain
  screened/backlog per GOV-2591/GOV-2593's prior-cycle notes (Visa was
  scouted and left as an open candidate — MFA Non-Immigrant Visa B/
  Employment, 58 AcroForm fields — delegated in parallel to GOV-2602).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) the Memorandum of
Association (หนังสือบริคณห์สนธิ) as the strongest companion-schema
candidate, since it is the document that actually carries the registered
office address/objectives/capital/share-structure fields a reader of this
document might otherwise expect; (2) confirming whether the DBD's current
published edition of บอจ.1 (last modified 2024-03-18 per this cycle's
`Last-Modified` header) has changed since this review; (3) a possible
future companion schema modeling the merger/conversion/amendment pathways
of `registrationActionType`, if a future cycle wants deeper
non-formation coverage of this same form.
