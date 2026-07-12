# Verification record — `vn/bca/to-khai-dang-ky-xe` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2479**). It opens
Vietnam's **DMV vertical (4 of 6)**, following `vn/dangkykinhdoanh` (Business
Formation), `vn/xuatnhapcanh` (Passport), and `vn/gdt` (Taxes).

## Candidate re-verified from scratch, not trusted from the prior cycle

A prior research pass (GOV-2472) had flagged **Mẫu ĐKX10** (vehicle
registration declaration, Thông tư 79/2024/TT-BCA) as a strong, ready-to-
author candidate — genuine, current, freely downloadable as a `.docx`/`.doc`
template, no login gate. This cycle did **not** take that finding on faith:
the source was re-fetched live, re-extracted independently, and a fresh
legal-currency check was run before authoring against it.

## Source used

- **URL:** `https://files.thuvienphapluat.vn/uploads/hopdong/MAU%20DKX10-79-2024-TT-BCA.doc`
- **Fetched:** direct `curl`, 2026-07-12. **HTTP 200.**
- **Size:** 44,032 bytes.
- **sha256:** `eb94a4d2211c7a1817f3eef821a4e3e25fad2c86713c116b06c0257494de781d`
- **Header:** `D0 CF 11 E0 A1 B1 1A E1` — the genuine OLE2/Compound File
  Binary signature for a legacy Microsoft Word `.doc` file (confirmed with
  `od`/`hexdump` on the raw bytes, not assumed from the filename).
- **No login gate:** fetched directly with a plain `curl` GET, no session,
  no authentication.

### Extraction method

No `antiword`/`catdoc`/LibreOffice/`python-docx` tooling was available in
this sandbox (no `pip`, no system package manager access — the same
constraint `vn/gdt`'s own VERIFICATION.md recorded for its own `.doc`
source). The raw file bytes were instead decoded directly as **UTF-16LE**
(the encoding legacy `.doc` files predominantly use for their own text
runs) with a small Python script, then filtered with a regex for
printable-Vietnamese-Unicode runs of 6+ characters. This recovered the
form's full 3-page printed text in reading order, including its own
issuing-circular header line and all 8 numbered footnotes, cleanly
separated from the surrounding OLE2 binary structure (property tables,
font-table entries, `WordDocument`/`1Table`/`SummaryInformation` stream
names) which is easy to tell apart from genuine form text once decoded.

The extracted text opens with, verbatim:

```
Mẫu ĐKX10
Ban hành kèm theo Thông tư số 79/2024/TT-BCA ngày 15/11/2024 của Bộ trưởng Bộ Công an
```

confirming the form's own header attributes it to Thông tư 79/2024/TT-BCA,
15 November 2024, Ministry of Public Security — matching this schema's own
`source.documentRef` and `authority.operatedBy.basis`.

The full extracted text (all 3 pages, footnotes included) was retained
locally for this verification and is the direct source of every
`fields[]`/`documents[]` `sourceRef` in `schema.json`.

## Legal-currency check (the point of this exercise)

Following this registry's own source-of-truth-fidelity principle — the same
kind of check that caught `vn/xuatnhapcanh`'s stale X01-vs-TK01 form and
`vn/gdt`'s stale easyinvoice.vn PDF — a search was run for "Thông tư
79/2024/TT-BCA" together with "sửa đổi"/"thay thế"/"bổ sung" (amend/replace/
supplement) before authoring against this candidate.

This **did** surface a genuine amendment chain to the parent circular:

1. **Thông tư 13/2025/TT-BCA** (28/02/2025, hiệu lực 01/03/2025) — amends
   several circulars on road/rail/inland-waterway traffic order and safety,
   including provisions of Thông tư 79/2024/TT-BCA (notably decentralizing
   first-time vehicle registration to commune-level police).
2. **Thông tư 51/2025/TT-BCA** (30/06/2025, hiệu lực 01/07/2025) — further
   amends Thông tư 79/2024/TT-BCA (as already amended by Thông tư
   13/2025/TT-BCA).
3. **Thông tư 37/2026/TT-BCA** (24/4/2026, hiệu lực 08/6/2026) — amends
   circulars on vehicle registration **and** inspection (kiểm định).

Each was checked for whether it touches **Mẫu ĐKX10 itself** (the form
template this schema models), not just the parent circular in general:

- **Thông tư 51/2025/TT-BCA**, fetched via `WebFetch`
  (`luatvietnam.vn/giao-thong/thong-tu-51-2025-tt-bca-...`): its own text
  states it replaces **Phụ lục số 02** (license-plate-symbol appendix) and
  removes the phrase "trực thuộc Trung ương" from **Mẫu ĐKX07, ĐKX08, và
  ĐKX09** — three sibling forms, not ĐKX10. No mention of ĐKX10 appears
  anywhere in the circular's own text.
- A **consolidated text** (văn bản hợp nhất) current through 01/07/2025,
  fetched via `WebFetch`
  (`xaydungchinhsach.chinhphu.vn/van-ban-hop-nhat-thong-tu-...`), confirms
  **Mẫu ĐKX10/79** is still listed at Điều 34 as originally issued, with
  footnote [25] noting only that it "được in từ cổng dịch vụ công hoặc hệ
  thống đăng ký, quản lý xe hoặc tự in" (may be printed from the
  public-service portal, the registration/management system, or
  self-printed) — an operational note about how the blank form is obtained,
  not a content amendment. No amendment to ĐKX10 is recorded.
- **Thông tư 37/2026/TT-BCA**, fetched via `WebFetch`
  (`luatvietnam.vn/giao-thong/thong-tu-37-2026-tt-bca-...`): introduces one
  new template, **Mẫu KĐ23a** (a technical/environmental inspection
  certificate), plus VNeID/VNeTraffic digital-integration and terminology
  changes ("Công an tỉnh, thành phố trực thuộc Trung ương" →
  "Công an tỉnh, thành phố"). No mention of ĐKX10.
- A **pending draft circular** further amending vehicle registration/
  inspection rules, published on `bocongan.gov.vn`'s own policy portal and
  out for public comment as of this cycle (fetched via `WebFetch`), was also
  checked: it proposes VNeID/VNeTraffic integration and postal/in-person
  delivery-of-results options, and is explicitly still a draft, not yet in
  force. It likewise makes no mention of ĐKX10.

**Conclusion: Mẫu ĐKX10 is current and unamended as of this verification
date (2026-07-12)**, despite three amending circulars to its parent
Thông tư since publication — none of which touches this specific appendix.

## Reachability of gov.vn hosts

- `https://csgt.vn` (the traffic-police-specific domain): timed out after
  20s with no HTTP response from this sandbox on a direct `curl` attempt —
  consistent with this registry's prior gov.vn-host-unreachable precedent
  (`dfat.gov.au`, `gdt.gov.vn`/`canhan.gdt.gov.vn`).
- `https://bocongan.gov.vn` (the Ministry of Public Security's own top-level
  domain) and `https://dichvucong.bocongan.gov.vn` (its public-service
  portal): both directly reachable, **HTTP 200**, no login gate. These are
  cited as this schema's `authority.url`/`authority.operatedBy.url`.

## Corroborating source

- **URL:** `https://luatvietnam.vn/bieu-mau/giay-khai-dang-ky-xe-moi-nhat-571-19654-article.html`
- **Fetched:** `WebFetch`, 2026-07-12.
- **What it confirms:** independently attributes Mẫu ĐKX10 to Thông tư
  79/2024/TT-BCA (Bộ Công an) and quotes the same field labels this schema
  models (e.g. "Loại giấy tờ", "Cơ quan cấp" under Mã định danh; "Nguồn gốc"
  as footnote-gated field (5); "Lý do" as field (6)), plus the same
  declaration line ("Tôi xin cam đoan về nội dung khai trên là đúng") this
  schema's `declarationAttestation` document entry quotes. `thuvienphapluat.vn`'s
  own advisory article on this exact form
  (`thuvienphapluat.vn/banan/tin-tuc/mau-giay-khai-dang-ky-xe-moi-nhat-nam-2025-mau-dkx10-va-cach-viet-12615`)
  was also attempted as a second corroborating source but returned an
  HTTP 403 Cloudflare interstitial challenge on every attempt (both
  `WebFetch` and a browser-`User-Agent` `curl`) — unlike `vn/gdt`'s cycle,
  where the browser-`User-Agent` route worked on this same domain for a
  different URL path; this one is disclosed as unreachable rather than
  worked around, since `luatvietnam.vn`'s independent corroboration was
  already sufficient.

## Field-by-field mapping

Every `fields[]`/`documents[]` entry's `sourceRef` cites the exact printed
label and, where the form itself numbers it, the footnote (1)-(8) it is
gated by. Highlights of the mapping method:

1. **`procedureType`** translates footnote (1)'s semicolon-separated
   enumeration ("Đăng ký xe lần đầu; Đăng ký sang tên, di chuyển xe; cấp đổi
   chứng nhận đăng ký xe, biển số xe; cấp lại chứng nhận đăng ký xe, biển số
   xe; Đăng ký xe tạm thời") into a closed `enum` — the footnote reads as a
   genuine enumeration of allowed values on the source itself, the same
   translation this registry's `it/agenzia-entrate/modello-730` and
   `vn/gdt`'s own `refundMethod` precedent apply to a checkbox/instruction
   list.
2. **`ownerIdDocumentType`**/**`ownerIdNumber`** decompose footnote (2)'s
   own enumerated list of identity-document categories for an individual
   (personal ID, diplomatic/official/consular/honorary-consular ID, CMT,
   foreign-national ID, temporary/permanent residence card, police/army ID)
   and for an organization (electronic org ID code, tax code, or
   establishment-decision number) into a closed `enum`, rather than leaving
   `ownerIdDocumentType` free text.
3. **`originType`** translates footnote (5)'s "nhập khẩu/sản xuất lắp ráp/
   tịch thu theo quy định của pháp luật" into a 3-value `enum`.
4. Page 2 and page 3's "DỮ LIỆU ĐIỆN TỬ" (electronic data) blocks are
   modelled only for the genuinely new data they carry (dossier linkage
   codes, import/customs particulars, registration-fee amounts, e-invoice
   details) — the vehicle-characteristics fields those blocks repeat
   (brand, model, engine/chassis number, weights, seating, year of
   manufacture) are **not** re-declared as separate fields, since they are
   the same declared vehicle already captured in page 1's own vehicle-
   characteristics block, just echoed back from the linked origin/fee
   database for cross-check. This is the same kind of disclosed scope
   decision `vn/gdt`'s own VERIFICATION.md made for a source form's
   internally-duplicated block, applied here to a duplicated data table
   rather than a duplicated companion schedule.
5. The registration-agency-side content — the "CÁN BỘ ĐĂNG KÝ XE" signature
   line and footnote (8) (which explains the approving officer's title at
   each administrative level: Cục trưởng at the Ministry, Trưởng phòng at
   provincial level, Trưởng Công an at district/commune level) — and the
   physical "Nơi dán bản chà số máy"/"Nơi dán bản chà số khung" (engine-/
   chassis-number rubbing-impression) areas are **not** modelled as
   `fields[]`: the former is registration-office-internal content, not
   applicant-supplied data (the same kind of exclusion this registry's
   other government-form schemas apply to an office-use-only verification
   block), and the latter is a physical affixing area with no keyable text
   content at all.

## Scope: what v1.0.0 models and what it defers

**Modelled in v1.0.0** (78 `fields[]`, 2 `documents[]`):

| Section | Representative fields |
|---|---|
| Procedure/plates | `procedureType`, `onlineDossierCode`, `oldPlateNumber`/`Color`, `newPlateNumber`/`Color` |
| Owner identity | `ownerName`, `ownerAddress`, `ownerPhone`, `ownerIdNumber`, `ownerIdDocumentType`, `ownerIdIssuingAgency`, `ownerIdIssueDate` |
| Agent (optional) | `agentName`, `agentIdNumber`, `agentPhone` |
| Transport-business license (optional) | `transportBusinessLicenseNumber`/`IssuingAgency`/`IssueDate` |
| Vehicle characteristics | `vehicleBrand`, `vehicleModel`, `vehicleType`, `engineDisplacementCc`, `enginePowerKw`, `engineNumber`, `chassisNumber`, `paintColor`, `loadCapacityKg`, `seatingCapacity`, `standingCapacity`, `berthCapacity`, `yearOfManufacture`, `curbWeightKg`, `grossWeightKg`, `towedWeightKg`, `originType`, `registrationFeeDocumentCode`, `reasonForRequest`, `attachedDocumentsDescription` |
| Declaration | `declarantName`, `declarationPlace`, `declarationDate` |
| Electronic origin data (page 2) | `originDossierCode`, `manufacturerOrImporterName`, `importDeclarationNumber`/`Date`, `importCheckpoint` |
| Electronic fee data (page 2) | `registrationFeeDossierCode`, `feePayerName`/`Address`/`IdNumber`/`IdDocumentType`/`IdIssuingAgency`/`IdIssueDate`, `taxManagingAgencyName`, `assetValueForFeeCalculation`, `registrationFeeAmountPayable`, `registrationFeePaymentDate`, `registrationFeeExemptionBasis`, `taxAuthorityNoticeDate` |
| E-invoice data (page 3) | `invoiceIssueDate`, `invoiceFormNumber`, `invoiceSerialSymbol`, `invoiceNumber`, `invoiceType`, `sellerName`/`TaxCode`/`Address`, `buyerName`/`OrganizationName`/`OrganizationUnit`/`Address`/`IdNumberOrTaxCode`, `goodsOrServiceName`, `invoiceTaxAmount`, `invoiceTotalAmount`, `invoiceTotalAmountInWords` |
| Documents | `declarationAttestation` (attestation), `ownershipTransferChainDocuments` (conditional supporting evidence) |

**Explicitly deferred (out of scope for v1.0.0):**

- **Page 2/page 3's duplicated vehicle-characteristics values** (brand,
  model, engine/chassis number, displacement, power, weights, seating,
  year) — modelled once, on page 1, not re-declared per electronic block.
- **The registration agency's internal verification/approval block**
  ("CÁN BỘ ĐĂNG KÝ XE" and footnote (8)) — registration-office-side, not
  applicant-side, content.
- **The physical engine-/chassis-number rubbing-impression areas** ("Nơi
  dán bản chà số máy"/"Nơi dán bản chà số khung") — a physical affixing
  area, not a keyable data field.

## Judgment calls

1. **`oldPlateNumber`/`oldPlateColor` and `newPlateNumber`/`newPlateColor`
   are all modelled as optional**, with no `requiredWhen` gate against
   `procedureType`. The source's own instructions (footnote (1) and the
   page-1 layout) imply old-plate fields are populated for
   ownership-transfer/replacement/reissuance/relocation and left blank for
   a first-time registration, and new-plate fields are typically
   agency-completed — but the form states no crisp, keyable rule (e.g. it
   does not say "leave blank when procedureType = new_registration"), so
   rather than fabricate a `requiredWhen` gate not actually printed on the
   source, both pairs are left optional and the relationship is described
   in each field's own `description`.
2. **`reasonForRequest` is modelled as optional, not gated by
   `procedureType`.** Footnote (6)'s trigger is narrower than any single
   `procedureType` value (only the auctioned-plate or incomplete-documents
   sub-case of an ownership transfer, not every ownership transfer, plus
   the replacement/reissuance procedures) and the form has no separate
   boolean field to key a precise condition on. Disclosed rather than
   modelled as an over- or under-triggering `requiredWhen` gate — the same
   kind of decision `vn/gdt`'s own judgment call 4 documents for a
   relationship the source states in prose but does not print as a
   checkable instruction.
3. **`ownershipTransferChainDocuments` is modelled with `required: false`
   and no `requiredWhen`**, for the same reason as judgment call 2: its
   footnote (7) trigger (ownership passed through multiple parties with
   incomplete transfer documents) has no dedicated boolean field on the
   form to gate on. Disclosed via its own `handling` value rather than a
   fabricated gate, per this registry's `notEquals`-empty-string-absent-
   field-bug precedent (never gate `requiredWhen` on an optional field's
   presence/absence as a proxy for a condition the source doesn't key).
4. **`engineDisplacementCc`/`enginePowerKw`/`loadCapacityKg`/
   `seatingCapacity`/`standingCapacity`/`berthCapacity`/`curbWeightKg`/
   `grossWeightKg`/`towedWeightKg` are all modelled as optional.** None of
   these carry a "(nếu có)" tag on the source, but they are not universal
   across every vehicle type this form covers (e.g. a motorcycle has no
   towed-weight rating; a non-passenger specialized machine has no seating
   figures) — modelled as optional on the same disclosed convention
   `vn/gdt` applied to its own non-universal chỉ tiêu fields, rather than
   forcing a false universal requirement.
5. **All of page 2/page 3's electronic-data fields are modelled as
   optional.** The form's own page-2 heading states this data is populated
   automatically from linked government databases ("Trang 2: Dữ liệu điện
   tử về hồ sơ đăng ký xe kèm theo; trường hợp không có dữ liệu điện tử thì
   điền đầy đủ các thông tin còn thiếu" — if there is no electronic data,
   fill in all missing information completely), meaning whether any given
   field is actually required depends on a runtime linkage state
   ("có dữ liệu điện tử hay không") this schema cannot observe structurally.
   Modelling every one of these as `required: true` would misrepresent the
   common case (electronic linkage present, most fields auto-populated and
   not manually re-keyed); modelling them as optional and describing the
   conditional-completeness rule in prose matches this registry's
   preference for a disclosed judgment call over a fabricated blanket
   requirement.
6. **Money fields (`assetValueForFeeCalculation`,
   `registrationFeeAmountPayable`, `invoiceTaxAmount`,
   `invoiceTotalAmount`) use `type: "number"` with only a `minimum: 0`
   constraint**, matching this registry's `it/agenzia-entrate/modello-730`/
   `vn/gdt` convention of modelling a currency amount as one decimal number
   rather than a stricter cent-precision pattern.
7. **`declarationPlace` is modelled as a separate `string` field from
   `declarationDate`**, both `required: true`, decomposing the combined
   "………, ngày…….tháng ……năm………" line the same way `vn/gdt`'s own
   `declarationPlace`/`declarationDate` pair does for its own signature
   block.

## Test run (Phase 3)

No live submission was attempted: this form is filed either through the
public-service portal (`dichvucong.bocongan.gov.vn`, gated by VNeID/level-2
electronic-identity login) or on paper at a vehicle-registration office —
submitting fabricated owner/vehicle data against Vietnam's live vehicle-
registration system is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and validated with a purpose-written script
(mirroring `it/agenzia-entrate/modello-730`'s/`vn/gdt`'s own
`validate_instance.mjs` approach: compiles `schema.json`'s `fields[]` into a
JSON Schema draft 2020-12 document checked with `ajv`, plus a from-scratch
evaluator for the shared Condition grammar that checks both
`fields[].requiredWhen` and every `documents[]` entry's static
`required`/`requiredWhen` status against a `documents: [{id, provided}]`
array — checking `documents[]` requiredness explicitly, since this
registry's own accumulated experience is that conformance checkers
routinely skip it):

```
$ node validate_instance.mjs registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json \
    conformance/vn/bca/to-khai-dang-ky-xe/1.0.0/first-time-registration-full-electronic-linkage.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS

$ node validate_instance.mjs registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json \
    conformance/vn/bca/to-khai-dang-ky-xe/1.0.0/ownership-transfer-with-agent-and-incomplete-chain-of-sale.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'chassisNumber' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'chassisNumber'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-origintype-enum-violation.json: 'originType' set to 'stolen_recovered'
Static (required/type/pattern/enum) validation: FAIL
 - /originType must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'declarationAttestation' (required: true) omitted from documents[]
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'declarationAttestation' is required but not provided
OVERALL: FAIL
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json
ok   registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json
ok   registry/vn/bca/to-khai-dang-ky-xe/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Vietnam's remaining verticals

Vietnam now stands at **4 of 6** verticals (Business Formation, Passport,
Taxes, DMV). **Visa** and **National ID** remain open. Visa has a
pre-scouted candidate flagged in the prior GOV-2472 cycle (Mẫu NA1, Circular
04/2015/TT-BCA — genuine, current, freely downloadable, no login gate).
National ID was independently re-confirmed a dead end in that same cycle
(Luật Căn cước 2023 replaced the old citizen-form CC01 with a fully
system/officer-generated workflow — no downloadable applicant-facing form).
