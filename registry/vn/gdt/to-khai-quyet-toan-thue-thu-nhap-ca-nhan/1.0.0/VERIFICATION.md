# Verification record — `vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-11`

This is a `GovSchema Standard Research` cycle (**GOV-2411**). It opens
Vietnam's **Taxes vertical (2 of 6)**, following
`vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc` (Passport, 1 of 6,
GOV-2404).

## Candidate re-verified and rejected: the pre-scouted easyinvoice.vn PDF

A prior research pass had located and verified a candidate PDF:

- **URL:** `https://easyinvoice.vn/wp-content/uploads/2026/04/mau-so-02-QTT-TNCN-2.pdf`
- **Re-fetched this cycle:** HTTP 200, 440,294 bytes, genuine `%PDF` header.
- **sha256:** `87231af39f67b69a2b020f140ff82a1c9ee7b7bd04aa6ed8f3473ccd0031763c`
- **Pages:** 3 (confirmed via `pdfjs-dist`'s own `doc.numPages`).
- **Text layer:** genuine — `pdfjs-dist`'s `getTextContent()` returns real
  Vietnamese text on every page (not a scanned image).
- **AcroForm widgets:** zero — `page.getAnnotations()` returns an empty
  Widget list on all 3 pages, confirming this is a static print/hand-fill
  template, the same source tier as `jp/houmukyoku`'s registry precedent.

All of this matches the pre-scouted finding. **However**, following this
registry's own source-of-truth-fidelity principle — the same check that
caught `vn/xuatnhapcanh`'s stale X01-vs-TK01 form — a routine legal-currency
search (form number + "sửa đổi"/"thay thế") was run before authoring against
it, and found this candidate PDF models a **superseded** template:

- Its own header text still reads "Ban hành kèm theo Thông tư số 80/2021/TT-BTC
  ngày 29 tháng 9 năm 2021" with **none** of two 2025 amendments applied.
- It still prints the pre-amendment three-tier "Quận/huyện" + "Tỉnh/thành
  phố" address breakdown (chỉ tiêu [07]-[08] and [18]-[19]).
- It carries **no** chỉ tiêu [05a] at all.

Two 2025 circulars amend this exact form:

1. **Thông tư 40/2025/TT-BTC** (Điểm g Khoản 7 Điều 1; hiệu lực 01/07/2025) —
   replaced the Quận/huyện+Tỉnh/thành phố breakdown with a two-tier
   Xã/phường/đặc khu+Tỉnh/thành phố breakdown, reflecting Vietnam's mid-2025
   abolition of the district administrative tier (a nationwide
   administrative reform, independently confirmed via web search, not
   assumed).
2. **Thông tư 94/2025/TT-BTC** (Khoản 3 Điều 1; hiệu lực 14/10/2025) — added
   chỉ tiêu [05a] "Số định danh cá nhân" (personal identification number),
   to synchronize the taxpayer's tax code with their unified citizen
   identification (CCCD) number.

The easyinvoice.vn PDF was therefore **not used** as this schema's source.

## Attempts to reach a first-party gov.vn host

- `https://www.gdt.gov.vn` and `https://canhan.gdt.gov.vn` (the tax
  authority's own domains): both timed out after 20s with no HTTP response
  from this sandbox, on two separate direct-curl attempts — consistent with
  this registry's prior gov.vn-host-unreachable precedent (`dfat.gov.au`,
  `gov.au`).
- A `mof.gov.vn` media-file URL surfaced by a web search for "Thông tư
  94/2025/TT-BTC toàn văn" (`https://www.mof.gov.vn/api/mediafile/media-article/
  fc838360-.../4fad5802-....pdf`) was fetched (HTTP 200, 937,301 bytes,
  genuine `%PDF-1.5` header, sha256
  `4cd530fcae97e962223c2a5408394bf39e66db435230638fdd36562c1ab4d9f3`) and
  found, on `pdfjs-dist` text-content inspection, to be an **unrelated**
  circular on commendation/emulation awards ("Thi đua – Khen thưởng"),
  misattributed by the search index — not the tax circular. Discarded.
- A second candidate, `https://dinre.mae.gov.vn/noidung/Lists/VBQPPL/Attachments/
  1921/Th%C3%B4ng-t%C6%B0-94-2025-TT-BTC.pdf` (a government-adjacent legal-
  document mirror), fetched successfully (HTTP 200, %PDF-1.5, sha256
  `402ba1ee33a5ce24c1d068fa61bec5ec916a18b0e82a89ab1e9c152ae9248cc5`), but
  its 3 pages return **zero** extractable text via `pdfjs-dist`
  `getTextContent()` on every page (a scanned image with no OCR text layer),
  and — being only 3 pages for what is normally a multi-article circular
  with several appendices — evidently does not include the full appendix
  reproducing every amended form. Discarded as unusable for field extraction.

## Source used: thuvienphapluat.vn (explicitly sanctioned fallback)

With both direct gov.vn leads dead and the tax authority's own domains
unreachable, this schema sources the current template from
**thuvienphapluat.vn**, Vietnam's leading legal-document portal — the same
kind of fallback this cycle's own sourcing guidance names alongside
gdt.gov.vn, and disclosed here explicitly, the same way `vn/xuatnhapcanh`
disclosed its own reliance on a provincial-government portal for its
`documents[]` entries.

### Primary source (the form template)

- **URL:** `https://cdn.thuvienphapluat.vn/uploads/tintuc/2026/02/13/M%E1%BA%ABu%2002-QTT-TNCN-80-2021-TT-BTC%20(1).doc`
- **Fetched:** direct `curl` with a browser `User-Agent` header, 2026-07-11.
  **HTTP 200.**
- **Size:** 111,104 bytes.
- **sha256:** `c7de675a16e3382b0d94399298d3e6a0577b6a760ef6b8420a806fb9aa4fd246`
- **Header:** `D0 CF 11 E0 A1 B1 1A E1` — the genuine OLE2/Compound File
  Binary signature for a legacy Microsoft Word `.doc` file.
- **Extraction method:** no `antiword`/`catdoc`/LibreOffice/`python-docx`
  tooling was available in this sandbox (no `pip`, no system package
  manager access). The raw file bytes were instead decoded directly as
  UTF-16LE (the encoding legacy `.doc` files predominantly use for their own
  text runs) via a small Python script, then filtered with a regex for
  printable-Vietnamese-Unicode runs of 10+ characters. This recovered the
  form's full printed text, including its own amendment header note, in
  reading order.
- **What it confirms:** the document opens with, verbatim: "(Mẫu này bị sửa
  đổi, bổ sung bởi Điểm g Khoản 7 Điều 1 Thông tư 40/2025/TT-BTC có hiệu lực
  từ ngày 01/07/2025 và Khoản 3 Điều 1 Thông tư 94/2025/TT-BTC có hiệu lực từ
  ngày 14/10/2025) (Mẫu dưới đây đã bao gồm nội dung sửa đổi, bổ sung)" — i.e.
  the file's own header states it is the amended, currently-in-force
  template — followed by the full chỉ tiêu [01]-[48] layout, including
  [05a] and the new "Xã/ phường/đặc khu" fields this schema models.

### Corroborating source (advisory article)

- **URL:** `https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/tu-van-phap-luat/105609/mau-to-khai-truc-tiep-quyet-toan-thue-tncn-nam-2026-mau-02-qtt-tncn`
- **Fetched:** direct `curl` with a browser `User-Agent` header, 2026-07-11.
  **HTTP 200**, size 165,631 bytes. (`WebFetch` itself returned HTTP 403 on
  this domain — both on this URL and on two other thuvienphapluat.vn URLs
  tried; the browser-`User-Agent` `curl` route worked every time, so was
  used throughout this cycle for this domain.)
- **What it confirms:** explains every chỉ tiêu [01]-[48] in prose,
  including "[05a] Số định danh cá nhân: Ghi rõ ràng, đầy đủ 12 chữ số, số
  định danh cá nhân là số Căn cước công dân..." and "[07] Xã/ phường/đặc
  khu: Ghi xã/ phường/đặc khu thuộc tỉnh/thành phố nơi cá nhân cư trú (sau
  sáp nhập)" — verbatim agreement with the primary .doc source on every
  field label and instruction sentence checked.

Both extractions (the raw UTF-16LE decode of the .doc, and the HTML-stripped
advisory article) were retained locally for this verification, alongside
the 3-page text/line extraction of the superseded easyinvoice.vn PDF.

## Documents[] sourcing (dossier composition)

The form's own text carries no attachment checklist (the same situation
`vn/xuatnhapcanh` disclosed for its own `documents[]`). The dossier
composition for `documents[].dependentDeductionScheduleBkQtt`,
`.withholdingCertificates`, `.dependentRegistrationDossier`, and
`.charitableDonationProof`/`.foreignTaxPaidProof` is instead sourced from a
professional tax-advisory site's own published guidance:

- **URL:** `https://gonnapass.com/huong-dan-dien-khai-quyet-toan-thue-tncn-mau-02-qtt-tncn/`
- **Fetched:** direct `curl` with a browser `User-Agent` header, 2026-07-11.
  HTTP 200, size 165,088 bytes.
- **What it confirms:** "Hồ sơ khai thuế của cá nhân khai trực tiếp với cơ
  quan thuế ... Mẫu số 02/QTT-TNCN ... Bảng kê 02-1/BK-QTT-TNCN (Phụ lục
  bảng kê giảm trừ gia cảnh cho người phụ thuộc) ... Bản sao Giấy chứng
  nhận khấu trừ thuế ... Hồ sơ đăng ký người phụ thuộc quy định tại khoản
  9.11 Phụ lục I ban hành kèm theo Nghị định số 126/2020/NĐ-CP (nếu tính
  giảm trừ cho người phụ thuộc tại thời điểm quyết toán thuế đối với người
  phụ thuộc chưa thực hiện đăng ký người phụ thuộc) ... bản sao các hóa đơn,
  chứng từ xác nhận đóng góp vào các quỹ từ thiện, nhân đạo, quỹ khuyến học
  (nếu có) ... Bản sao chứng từ ngân hàng đối với số thuế đã nộp ở nước
  ngoài có xác nhận của người nộp thuế trong trường hợp cơ quan thuế nước
  ngoài không cấp giấy xác nhận."

## Authority name correction: Tổng cục Thuế → Cục Thuế

This cycle's own initial brief named the issuing authority "Tổng cục Thuế"
(General Department of Taxation). An independent search (not assumed) found
this is itself now stale: **Tổng cục Thuế was renamed Cục Thuế (Tax
Department) effective 1 March 2025**, per Thông báo 275/TB-TCT, while
remaining organizationally under the Ministry of Finance and continuing to
operate under the `gdt.gov.vn` domain. This schema's `authority.name`
reflects the current name (`Cục Thuế`); `authority.abbreviation` (`GDT`) and
this registry's own `vn/gdt/...` id path segment are retained from the
domain/pre-rename English gloss, since the domain and abbreviation
themselves did not change.

## Field-by-field mapping

Every `fields[]`/`documents[]` entry's `sourceRef` cites the exact chỉ tiêu
number (e.g. `[05a]`, `[34]`) or printed instruction sentence from the
primary .doc source. Highlights of the mapping method:

1. Each chỉ tiêu `[NN]` on the form was matched to its own instruction
   sentence in the same .doc extraction (e.g. `[34] Số thuế đã khấu trừ tại
   tổ chức trả thu nhập`) and cross-checked against the corroborating
   advisory article's own prose explanation of the same chỉ tiêu.
2. The chỉ tiêu [20]-[48] income/deduction/tax-liability table's own printed
   arithmetic relationships (e.g. `[20]=[21]+[23]`, `[42]=([32]-[33]-[39])>0`)
   are quoted verbatim in each field's own `description`, matching this
   registry's `it/agenzia-entrate/modello-730` precedent of not fabricating
   a computed-arithmetic constraint beyond what the source itself states.
3. The page-3 refund-payment-detail and budget-offset-detail blocks (both
   introduced by conditional headers reading "Trường hợp người nộp thuế đề
   nghị hoàn trả/bù trừ ... tại chỉ tiêu [46]/[47] thì ghi thêm các thông
   tin sau:") are modelled with `requiredWhen` gates directly on the
   triggering numeric chỉ tiêu (`refundToTaxpayer`/
   `offsetAgainstOtherBudgetObligation` `greaterThan: 0`), not a
   `notEquals ""` check against an optional field — deliberately avoiding
   the `notEquals`-empty-string absent-field bug this registry has
   previously caught.

## Scope: what v1.0.0 models and what it defers

**Modelled in v1.0.0** (70 `fields[]`, 6 `documents[]`):

| Section | Representative fields |
|---|---|
| Period/filing type | `taxPeriodYear`, `firstTimeFiling`, `supplementaryFilingNumber`, `disasterOrIllnessReliefAttached` |
| Taxpayer identity | `taxpayerName`, `taxpayerTaxCode`, `taxpayerPersonalIdNumber` ([05a]), `taxpayerAddress`, `taxpayerWardOrCommune`, `taxpayerProvince`, `taxpayerPhone`/`Fax`/`Email` |
| Tax agent (optional) | `taxAgentName`, `taxAgentTaxCode`, `taxAgentContractNumber`/`Date` |
| Income payer (optional) | `incomePayerName`, `incomePayerTaxCode`, `incomePayerAddress`/`WardOrCommune`/`Province` |
| Income/deduction/tax table | `totalTaxableIncome` … `totalOffsetCarriedToNextPeriod` (chỉ tiêu [20]-[48], full) |
| Refund-payment detail | `refundAmountInFigures`, `refundMethod`, bank-transfer/cash sub-fields, `refundReceivingTreasuryOffice` |
| Budget-offset detail | `offsetDebtDescription`, `offsetCurrency` (top-level description only — see deferred, below) |
| Signature block | `declarantRole`, `declarantName`, `taxAgentPracticingCertificateNumber`, `declarationPlace`/`Date` |

**Explicitly deferred (out of scope for v1.0.0):**

- **Phụ lục 02-1/BK-QTT-TNCN**, the dependent-deduction schedule — a
  distinct companion form the source form only references by number
  (never reproduces); disclosed as a conditionally required document
  (`documents[].dependentDeductionScheduleBkQtt`) rather than decomposed
  field-by-field, per this registry's `it/agenzia-entrate/modello-730`
  precedent for an out-of-scope companion schedule.
- **The granular 13-column budget-offset breakdown table** chỉ tiêu [47]
  can trigger (per-item tax code, managing tax office, administrative area,
  chương/tiểu mục budget codes, tax period/due date, and multiple amount
  columns) — modelled here only as a single descriptive
  `offsetDebtDescription` field, the same kind of disclosed scope-limiting
  decision `it/agenzia-entrate/modello-730` made for its own deferred
  quadri.
- **The separate joint-organization-finalization pathway** (an income
  payer performing the year-end adjustment on the taxpayer's behalf) — this
  schema covers only the individual-self-filing pathway the form's own
  title specifies ("áp dụng đối với cá nhân cư trú...").

## Judgment calls

1. **`taxpayerPersonalIdNumber` ([05a]) is modelled as required.** The
   source instruction text ("Ghi rõ ràng, đầy đủ 12 chữ số...") carries no
   explicit "bắt buộc" (mandatory) keyword, but also no "(nếu có)" tag,
   unlike genuinely optional chỉ tiêu on this same form (e.g. [12] "Tên đại
   lý thuế (nếu có)"). Per this registry's own convention (a field without
   a "(nếu có)" tag defaults to required unless independently disclosed as
   structurally conditional), and given this field's own stated purpose —
   synchronizing tax-code and citizen-ID records government-wide — it is
   modelled as required.
2. **`taxpayerFax`/`taxpayerEmail` are modelled as optional** despite
   carrying no "(nếu có)" tag either, on the disclosed judgment that a fax
   number/email address is not a channel every individual taxpayer
   maintains, consistent with `it/agenzia-entrate/modello-730`'s own
   `phone`/`mobile`/`email` fields (also all optional).
3. **`foreignTaxDuplicatedByOverlapYearFinalization` (chỉ tiêu [37]),
   `taxPaidDuplicatedByOverlapYearFinalization` ([38]), and
   `taxPayableDuplicatedByOverlapYearFinalization` ([40])** are modelled as
   optional. These three chỉ tiêu exist only to correct for double-counting
   in the narrow "quyết toán vắt năm" (overlap-year finalization) case — a
   non-calendar-year taxpayer (typically a foreign national) whose two
   consecutive finalizations share a few months of the same calendar year.
   Not tagged "(nếu có)" on the source, but structurally non-universal, so
   modelled as optional per the same convention as
   `vn/xuatnhapcanh`'s own `temporaryResidence` field.
4. **`totalTaxStillPayable` ([42]) and `totalTaxOverpaid` ([44]) are both
   modelled as optional, not required.** The two chỉ tiêu are mutually
   alternative outcomes of the same underlying arithmetic sign ([32]-[33]-
   [39]): exactly one is populated (or, at the boundary, both are zero),
   never both with a nonzero value. Rather than fabricate a
   `crossFieldValidation` "exactly one of these two" rule the source itself
   does not print as a checkable instruction, this schema leaves both
   optional and lets the description carry the relationship, matching
   `it/agenzia-entrate/modello-730`'s judgment call 6 (no fabricated
   conditional-gating rule without a keyable source field to gate on).
5. **`refundMethod` uses a two-value `enum` (`bank_transfer`/`cash`)**
   rather than an `exclusivityGroups`-gated boolean pair, even though the
   source prints it as a checkbox pair (`□ Chuyển khoản ... □ Tiền mặt`).
   This follows `it/agenzia-entrate/modello-730`'s own
   `taxReturnFilingMode` precedent (a checkbox choice translated to a
   positive enum) rather than `vn/xuatnhapcanh`'s `exclusivityGroups`
   precedent (two independently-labelled boolean checkboxes) — the
   `refundMethod` checkbox pair, unlike the passport's chip/no-chip pair,
   is really one single-select choice with two options, so an enum is the
   more direct model.
6. **Money fields use `type: "number"` with only a `minimum: 0`
   constraint**, matching `it/agenzia-entrate/modello-730`'s own convention
   of modelling a currency amount as one decimal number rather than a
   stricter cent-precision pattern.
7. **`taxpayerTaxCode`/`taxAgentTaxCode`/`incomePayerTaxCode` use
   `^[0-9]{10}(-[0-9]{3})?$`**, matching Vietnam's 10-digit mã số thuế
   format with an optional 3-digit dependent-unit suffix (e.g.
   `0102345678-001`), rather than a single fixed length — disclosed rather
   than silently rejecting a syntactically valid branch/dependent-unit tax
   code.

## Test run (Phase 3)

No live submission was attempted: this form is filed either through the tax
authority's own authenticated eTax portal (`thuedientu.gdt.gov.vn`, gated by
tax-code/VNeID login) or on paper at the tax office — submitting fabricated
taxpayer data against Vietnam's live tax administration is not a safe or
reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and validated with a purpose-written script
(mirroring `it/agenzia-entrate/modello-730`'s own `validate_instance.mjs`
approach: compiles `schema.json`'s `fields[]` into a JSON Schema draft
2020-12 document checked with `ajv`, plus a from-scratch evaluator for the
shared Condition grammar that checks both `fields[].requiredWhen` and every
`documents[]` entry's static `required`/`requiredWhen` status against a
`documents: [{id, provided}]` array — checking `documents[]` requiredness
explicitly, since this registry's own accumulated experience is that
conformance checkers routinely skip it):

```
$ node validate_instance.mjs registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json \
    conformance/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/first-time-filer-no-dependents-small-refund-by-bank-transfer.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json \
    conformance/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/supplementary-filing-dependents-foreign-tax-and-budget-offset.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'taxpayerTaxCode' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'taxpayerTaxCode'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-personal-id-pattern-violation.json: 'taxpayerPersonalIdNumber' set to 'ABC12'
Static (required/type/pattern/enum) validation: FAIL
 - /taxpayerPersonalIdNumber must match pattern "^[0-9]{12}$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-refund-field.json: refundMethod is 'bank_transfer'
$ # but 'refundAccountNumber' (requiredWhen refundMethod equals bank_transfer) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'refundAccountNumber' is required (requiredWhen matched) but not provided
OVERALL: FAIL
```

The `mutation-control-missing-conditional-refund-field.json` case
specifically exercises `fields[].requiredWhen` (as opposed to the plain
static-`required` case in `mutation-control-missing-required-field.json`) —
a validator that only checks static `required: true` fields and ignores
conditional `requiredWhen` rules would incorrectly accept this fixture,
which is exactly the gap this fixture exists to catch.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json
ok   registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json
ok   registry/vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Vietnam's other four verticals (screened in the prior GOV-2404 cycle, not authored)

- **Business Formation**: only weak pre-scouted leads found.
- **DMV**: inconclusive — the relevant gov host returned HTTP 503 during
  prior scouting.
- **Visa**: only weak pre-scouted leads found.
- **National ID**: confirmed a dead end — in-person/biometric CCCD issuance
  only, no downloadable form.

Vietnam now stands at 2 of 6 verticals (Passport, Taxes); these four remain
open, unscreened-or-weak backlog candidates for a future cycle.
