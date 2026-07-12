# Verification record — `th/rd/pit-90-personal-income-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2593**. It opens **Thailand
as this registry's 44th jurisdiction**, via its **Taxes vertical (1 of 6)**,
using the Revenue Department's (RD) "ภ.ง.ด.90" (PIT 90) personal income tax
return, tax year 2568 (2025 CE) edition. Thailand was scouted and screened in
GOV-2591's prior cycle (see that issue's own memory record): Rwanda's
remaining three verticals were confirmed dead ends and Thailand was picked up
as a new-jurisdiction candidate via this PIT 90 source (432 AcroForm fields).

## Source verification (independently re-derived, not copied from the task)

- **URL:** `https://www.rd.go.th/fileadmin/tax_pdf/pit/2568/241268PIT90.pdf`
- Fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 1629183`
    bytes, `Last-Modified: Mon, 12 Jan 2026 03:35:04 GMT`.
  - **`sha256`:**
    `e47796b2b5a5e253407dc6e1d0accebb0ebcf18456ff5ee08396c487786e84e5`
    (computed independently via `sha256sum` on the freshly-downloaded file,
    not copied from the task's cited figure) — **matches exactly**.
- Parsed with `pdfjs-dist@3` (legacy build,
  `getAnnotations({intent:'display'})`, filtered to `subtype === 'Widget'`),
  installed in a scratch directory (not a repo dependency), following this
  registry's established PDF-extraction practice:
  - **5 pages**, **432 AcroForm widgets total**.
  - Per-page breakdown: **76 (page 1) / 95 (page 2) / 112 (page 3) / 78 (page
    4) / 71 (page 5)** — matches the task's cited breakdown exactly.
- Every widget's `fieldName`/`fieldType`/`rect`/`radioButton`/`buttonValue`
  was dumped and correlated against `getTextContent()`'s position-sorted
  text rows (grouped by rounded `y`, sorted by `x` within each row) for all
  five pages, to read every Thai label and confirm each widget's meaning
  before modeling it — not assumed from field names alone. Radio-button
  groups sharing one field name were resolved by reading the printed text at
  the same/adjacent row-and-column position, per this registry's established
  coordinate-correlation technique.

## Scoping decision (per GOV-2593's own explicit permission)

PIT 90 is a wide, multi-schedule return (up to 8 income-type schedules
across pages 2-4, ข้อ 1 through ข้อ 10, plus a personal-deductions
attachment on page 5). This v1.0.0 deliberately scopes to the
**general/salaried-income filing pathway**, modeling:

1. **Page 1** — full taxpayer + spouse identification, marital/filing
   status, the spouse's income-section declaration, the political-party
   tax-donation declaration (taxpayer and spouse), and the refund-request/
   signature/representative block.
2. **ข้อ 1 (page 2)** — income under Revenue Code sections 40(1)-(2)
   (employment/wages/pension and service-fee/commission income): payer TIN,
   the main income line, the 4 numbered deduction sub-lines under section
   40(1), the running total plus attachment-sheet count, the section 40(2)
   line, and the computed subtotal/expense-deduction/net-income lines that
   carry forward to ข้อ 11.
3. **ข้อ 11 (page 4)** — the final tax computation, all 25 numbered
   lines, including the alternative 0.5%-of-gross computation and its
   5,000-baht floor exception, the foreign tax credit, the withholding-tax/
   PIT-93/PIT-94 prepayment credits, and the final due/overpaid amount plus
   surcharge line.
4. **Page 5 attachment** ("ใบแนบแสดงรายละเอียดรายการลดหย่อนและยกเว้นหลังจากหักค่าใช้จ่าย") —
   all 24 numbered deduction/allowance items, including item 3's two child-
   allowance rates (pre-/post-2018 60,000-baht rate), item 4's four parent-
   care ID+amount pairs, item 6's combined health-insurance amount plus four
   parent ID fields, item 7's three insurance sub-lines, item 17's Easy
   E-Receipt 2.0 total plus its four 17.1-17.4 sub-items, item 19's Thai
   ESGX unit-purchase and LTF-switch sub-lines, and item 22's domestic-
   tourism total plus its main-city/secondary-city × e-Tax-invoice/paper-
   invoice four-way split.

### Out of scope, disclosed (per the task's own explicit list)

ข้อ 2 through ข้อ 10 on pages 2-4 are **not modeled**, each because it does
not apply to the general employment/service-income filer this v1.0.0
targets:

- **ข้อ 2** (page 2, y≈543) — section 40(3) royalty/goodwill schedule.
- **ข้อ 3** (page 2, y≈302 / page 4 header text confirms placement) —
  section 40(4) dividend/interest schedule, including its own foreign-
  dividend/digital-token sub-lines and dividend tax credit.
- **ข้อ 4** (page 2, y≈298) — section 40(5) rental-income schedule.
- **ข้อ 5** (page 3, y≈727) — section 40(6) professional-fee schedule
  (medical/law/engineering/architecture/accounting/fine-arts).
- **ข้อ 6** (page 3, y≈469) — section 40(7) contracting-income schedule.
- **ข้อ 7** (page 3, y≈343) — section 40(8) business/commerce/agriculture
  schedule.
- The shared 40(3)/(5)/(6)/(7)/(8) "actual expense" claim sub-form (page 3,
  the repeating "สำหรับเงินได้ตามมาตรา 40(3)/(5)/(6)/(7)/(8)" right-column
  blocks alongside ข้อ 3 through ข้อ 7).
- **ข้อ 8** (page 4, y≈804) — the separate-taxation real-estate-sale
  schedule. Its own bottom-line carry-forward figure into ข้อ 11 line 17
  (`section11CarriedFromRealEstateSchedule`) is still modeled, as an
  optional field, since the in-scope ข้อ 11 sheet itself presents it.
- **ข้อ 9** (page 4, y≈672) — the separate-taxation gift/inheritance-
  income schedule. Its own carry-forward into ข้อ 11 line 19
  (`section11AddFromGiftSchedule`) is likewise modeled as an optional
  pass-through field.
- **ข้อ 10** (page 4, y≈560, and a companion amount-only block found at
  the top-right of page 2 between the ข้อ 1 header and the y≈700 row,
  covering digital-token/crypto gains and RMF/LTF/SSF/Thai-ESG fund
  redemption gains with "ยกเว้น/ไม่ยกเว้น" (exempt/not exempt) elections) —
  income electing exclusion from the aggregate computation for RMF/Thai-
  ESG/pension-insurance purposes. **Disclosed judgment call:** this
  right-hand-column content on page 2 initially looked like it might belong
  to ข้อ 1 (given the shared page-2 top position and the shared "carried to
  ข้อ 11 line 1" destination phrase used in both the left-column ข้อ 1
  computation and this right-column list), but the content itself (crypto/
  token transfer gains, RMF/LTF/SSF/ThaiESG unit-redemption gains with
  cost-basis and exempt-election sub-lines) does not describe salary/wage/
  service income — it matches ข้อ 10's own printed description almost
  verbatim. Confirmed by checking page 4: no AcroForm widget exists between
  ข้อ 10's own header (y≈560) and ข้อ 11's header (y≈509) other than a
  single amount field, consistent with ข้อ 10's real data entry living on
  page 2 rather than page 4. Treated as ข้อ 10 and excluded, per the task's
  own explicit instruction.

## Field-by-field inventory and disclosed judgment calls

### Page 1 (identification, status, donation, refund/signature)

Read from `getTextContent()`'s position-sorted rows and correlated to each
widget's `rect`. Notable disclosed decisions:

- **`incomeEarnerStatus`** (Radio Button48, 6 values) and **`maritalStatus`**
  (Radio Button49, 3 values: single/married/widowed) are two separate,
  nested radio groups under one shared "สถานภาพของผู้มีเงินได้" heading —
  `maritalStatus` sits directly beneath `incomeEarnerStatus`'s option (1)
  "individual" row. Modeled as two independent fields rather than one
  combined enum, since the source presents them as two separately-clickable
  radio groups.
- **`marriedStatusDetail`** (Radio Button44, 4 values) and **`filingStatus`**
  (Radio Button46, 3 values) sit in the address-block's right-hand columns
  under "สถานภาพการสมรส"/"สถานะการยื่นแบบฯ" headers, sharing vertical rows
  with the (unrelated) street-address entry widgets in the same y-range —
  confirmed these are genuinely separate widget groups at different x
  positions on the same rows, not a mapping conflict.
- **Disclosed simplification:** a second, narrower 2-option radio group
  (Radio Button47, under the same "สถานะการยื่นแบบฯ" header, with labels
  "รวมคำนวณภาษี \*" / "แยกยื่นแบบ" plus a further annotation "ประเภทเดียวและ
  แยกยื่นแบบฯ") sits immediately below `filingStatus`'s own widget group.
  Given the compressed, overlapping label layout, this could not be
  confidently correlated to a distinct printed meaning separate from
  `filingStatus` itself, and is **not separately modeled** in this v1.0.0 —
  disclosed here rather than guessed.
- **`spouseIncomeSection`** (Radio Button45, 4 values) is modeled only for
  the spouse; the taxpayer filing this return definitionally always has
  income, so the source carries no equivalent taxpayer-side toggle.
- **`spousePassportNumber`/`spouseNationality`/`spouseForeignCountry`** sit
  under a heading ("กรณีคู่สมรสเป็นคนต่างด้าวและไม่มีเงินได้โปรดระบุ" — "if
  spouse is a foreign national without income, please specify") that has no
  discrete boolean widget of its own. Left optional with no `requiredWhen`,
  since encoding one would require inventing a field the source does not
  present — disclosed rather than silently modeled.
- **`refundRequestedAmount`**: the source has no separate Yes/No widget for
  "do you want a refund" distinct from the amount field itself. Left
  optional, undocumented as a `requiredWhen` trigger for the same reason.
- **Representative block** (`representativeName`/`representativeCapacity`/
  `representativeAddressLine1`/`representativeAddressLine2`/
  `representativeSignatureDate`): no discrete boolean gates this block on
  the source (it is used only when an attorney/guardian/estate
  representative files on the taxpayer's behalf). Left fully optional.
- A page-1 top-right control (`Button1`, `fieldType: Btn`, no
  `radioButton`/`checkBox`, no `buttonValue`) sits beside the "หน้า 1" page
  marker. Not a data field — most likely a barcode/QR-style print control.
  **Not modeled**, disclosed here rather than silently dropped without
  explanation.
- **`summaryExcessTaxPaid`/`summaryAdditionalTaxDue`**: a page-1 recap box
  immediately above the certification/refund block. These mirror ข้อ 11's
  final line (`section11FinalDueOrOverpaid`) rather than being an
  independent computation — modeled as plain optional fields, disclosed as
  a recap rather than a distinct source of truth.

### ข้อ 1 (page 2)

12 fields modeled: `section1PayerTin`, the main section-40(1) income line,
the 4 numbered deduction sub-lines ((1) provident fund excess, (2) GPF, (3)
private-school-teacher fund, (4) severance pay), the running total plus its
own attachment-sheet count, the section 40(2) line, and the computed
subtotal/expense-deduction/net-income-carried-forward lines. All widget
names (`Text31.0.0`, `Text32.0.0`-`Text32.11.0`, `Text3`, `Text61`) were
individually correlated to their printed row text by y-coordinate; no
ambiguity encountered in this section.

### ข้อ 11 (page 4)

29 fields modeled across the 25 numbered lines (line 9 has two sub-fields —
the gross-income base and the resulting 0.5% tax; line 15 has two prepayment
sub-fields for PIT 93/PIT 94; line 18 has its own attachment-sheet-count
sub-field).

**Disclosed simplification:** several of the "ภาษีที่ชำระเพิ่มเติม/ชำระไว้
เกิน" (additional-tax-due / overpaid-tax) lines (16, 17, 18, 23, 25) are
each paired in the source with a small Yes/No radio-button toggle
(`Radio Button89`, `99`, `93`, `105`, `106`) selecting which of the two
applies, alongside an always-non-negative magnitude field. This schema
models each such line as a single **signed** numeric field (positive =
additional tax due, negative = overpaid) rather than a separate toggle plus
magnitude — consistent with how the source's own plain subtraction lines
(e.g. line 3, line 5) are modeled as signed numbers with no paired toggle.
Disclosed rather than silently resolved; a future cycle wanting bit-for-bit
widget parity could reintroduce the toggle fields.

### Page 5 attachment

67 fields modeled (8 header-identification fields + 1 form-type radio + 58
numbered-item fields). Widget-to-label correlation for the repeating
sub-blocks (item 4's four parent ID+amount pairs, item 6's four parent ID
fields, item 17's four Easy-E-Receipt sub-items, item 19's two ESGX
sub-items, item 22's two-city × two-invoice-type four-way split) was done by
matching each widget's `rect` x/y position against the corresponding
sub-item's printed label row, confirmed against the running total feeding
item 24 (`ยกไปรวมในข้อ 11 2. ของแบบภ.ง.ด.90`).

**Disclosed absence:** item 3's (and item 3's post-2018-child variant's)
four blank citizen-ID-number lines per child, printed beneath each
allowance's count/amount fields, have **no corresponding AcroForm widgets**
in the source PDF — confirmed by dumping all widgets in that y-range and
finding none. Not modeled individually; `attachmentItem3ChildCount`/
`attachmentItem3bAdditionalChildCount` capture the count, and
`attachmentItem24Total`'s conformance figures do not depend on the missing
per-child ID fields.

## Conformance run

Two hand-authored valid fixtures under
`conformance/th/rd/pit-90-personal-income-tax-return/1.0.0/`:

- **`valid-single-salaried-employee-refund-due.json`** — a single filer with
  600,000 baht of section 40(1) salary income, the 100,000-baht capped
  expense deduction, 79,000 baht of allowances (personal allowance,
  provident fund, social security), a computed net income of 421,000 baht,
  tax of 19,600 baht computed via Thailand's publicly documented progressive
  bands (0% to 150,000; 5% to 300,000; 10% to 500,000; ... — used here only
  for internal fixture consistency, not asserted as this schema's own
  embedded authority, since the source itself does not print the band table
  within the in-scope pages), 20,000 baht already withheld, resulting in a
  small **refund due** (-400 baht).
- **`valid-married-joint-children-disability-tax-due.json`** — a married
  filer electing joint computation, with section 40(1) salary (1,500,000
  baht) and section 40(2) commission income (80,000 baht), 2 children plus 1
  additional post-2018 child, a disability-care allowance, a life-insurance
  premium, a political-party donation, and the `section11AlternativeTaxBase`/
  `section11AlternativeTaxComputed` fields exercised (nonzero, since
  section 40(2) income is included in that base), resulting in **additional
  tax due** (17,600 baht).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice) validating `required`/`requiredWhen`/
`type`/`validation.{enum,minimum,maximum,pattern,minLength,maxLength}`
directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-single-salaried-employee-refund-due.json \
    valid-married-joint-children-disability-tax-due.json
valid-single-salaried-employee-refund-due.json: 0 error(s)
valid-married-joint-children-disability-tax-due.json: 0 error(s)
```

Five mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops `taxpayerTin`
  (a static `required: true` field) from the single-filer valid fixture.
- **`mutation-control-missing-conditional-spouse-tin.json`** — starts from
  the married valid fixture (`maritalStatus: "married"`) and drops only
  `spouseTin`, isolating the `requiredWhen` violation.
- **`mutation-control-missing-conditional-donation-amount.json`** — starts
  from the married valid fixture (`taxpayerDonationWish:
  "wishesToDonate"`) and drops only `taxpayerDonationAmount`.
- **`mutation-control-invalid-enum-value.json`** — sets `returnFilingType`
  to `"resubmission"`, not one of the enum's two values.
- **`mutation-control-invalid-tin-pattern.json`** — sets `taxpayerTin` to a
  13-character all-letter string (`"ABCDEFGHIJKLM"`), preserving length 13
  so only the `pattern` check (not `minLength`) fires — an earlier draft of
  this fixture used a 6-character value and raised two errors
  (`pattern` + `minLength`) at once; corrected to isolate exactly one.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-missing-conditional-spouse-tin.json \
    mutation-control-missing-conditional-donation-amount.json \
    mutation-control-invalid-enum-value.json \
    mutation-control-invalid-tin-pattern.json
mutation-control-missing-required-field.json: 1 error(s)
  - taxpayerTin: required but missing
mutation-control-missing-conditional-spouse-tin.json: 1 error(s)
  - spouseTin: required but missing
mutation-control-missing-conditional-donation-amount.json: 1 error(s)
  - taxpayerDonationAmount: required but missing
mutation-control-invalid-enum-value.json: 1 error(s)
  - returnFilingType: value "resubmission" not in enum ["normal","amended"]
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - taxpayerTin: value "ABCDEFGHIJKLM" does not match pattern ^[0-9]{13}$
```

All five negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/th/rd/pit-90-personal-income-tax-return/1.0.0/schema.json
ok   registry/th/rd/pit-90-personal-income-tax-return/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/th/rd/pit-90-personal-income-tax-return/1.0.0/schema.json
ok   registry/th/rd/pit-90-personal-income-tax-return/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`node tools/verify-sources.mjs registry/th/rd/pit-90-personal-income-tax-return/1.0.0`
was run clean immediately before opening this PR (1 directory, 3 URLs
checked, 0 warnings, 0 allowlisted). The full registry (all 389
`schema.json` documents, including this one) was also re-validated with
both `tools/validate.mjs` and confirmed to pass, to check this PR did not
regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (389 entries, up from
388 before this cycle).

## Scope and jurisdiction notes

- Opens Thailand as this registry's **44th jurisdiction**, via its **Taxes
  vertical (1 of 6)**. `jurisdiction.level` is `national` — the Revenue
  Department is Thailand's national tax authority.
- No `edition` member: GovSchema v0.3's `edition.scheme` vocabulary is
  closed to `us-tax-year`/`gb-tax-year`/`award-year` (§5.7), none of which
  fit a Thai Buddhist-Era tax year, and extending that closed vocabulary is
  a one-way-door spec change out of scope for this cycle. Consistent with
  `ke/kra/it1-individual-resident-return`'s own precedent (also an annual
  return with no `edition` member), the tax-year identity is instead
  modeled via a plain `taxYear` field and disclosed in `source.documentRef`.
- `process.type` is `filing`; `process.language` is `th` (the source form is
  entirely in Thai).
- `documents[]` carries the printed certification statement (`attestation`)
  and the refund-request supporting evidence (`supporting-evidence`,
  disclosed as not machine-gated for the same reason as
  `refundRequestedAmount` above).
- Companion-schedule candidates for a future cycle, in priority order:
  ข้อ 8 (real-estate-sale separate taxation), ข้อ 4-7 (rental/professional-
  fee/contracting income), ข้อ 3 (dividend/interest), ข้อ 9 (gift/
  inheritance), and ข้อ 10 (RMF/Thai-ESG/pension-insurance exclusion
  election) — largest-to-smallest by expected filer incidence.
- Two runner-up Thailand candidates from this cycle's scouting (GOV-2591)
  remain open backlog for a future Business Formation/Visa vertical cycle:
  DBD Form บอจ.1 (Business Formation, 101 AcroForm fields, `dbd.go.th`) and
  the MFA Non-Immigrant Visa B/Employment application (58 AcroForm fields,
  served from an `mfa.go.th` CDN). Thailand's DMV, Passport, and National ID
  verticals were screened this cycle and found weak/dead-end: each is an
  in-person/biometric process (vehicle registration via the Department of
  Land Transport, passport issuance via the Department of Consular Affairs,
  and the national ID card via the Department of Provincial Administration)
  with no unauthenticated fillable specimen found.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) independently confirming
Thailand's currently legislated personal income tax bands and the 0.5%
alternative-computation threshold, since this schema's conformance fixtures
use the publicly documented band table for internal consistency only, not
as an asserted-current legal figure encoded in the schema itself; (2) the
ข้อ 8 real-estate-sale schedule as the strongest companion-schedule
candidate, since it is the schedule with its own dedicated carry-forward
line already modeled in ข้อ 11; (3) the two disclosed Thailand
candidates (DBD Form บอจ.1, MFA Non-Immigrant Visa B) for opening Thailand's
Business Formation and Visa verticals.
