# Verification record — `vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2486**). It opens
Vietnam's **Visa vertical (5 of 6)**, following `vn/dangkykinhdoanh`
(Business Formation), `vn/xuatnhapcanh` (Passport), `vn/gdt` (Taxes), and
`vn/bca/to-khai-dang-ky-xe` (DMV).

## The candidate had already gone stale since it was scouted

A prior research pass (GOV-2479) flagged **Mẫu NA1** (Vietnamese Visa
Application Form, then cited to its original **Thông tư 04/2015/TT-BCA
ngày 05/01/2015**) as a strong, ready-to-author candidate: genuine, freely
downloadable via a third-party `.doc` mirror, no login gate. This cycle
re-verified it from scratch rather than trusting that finding — and the
re-verification caught that the pre-scouted source had gone stale in the
interim.

### Step 1 — re-fetching the pre-scouted 2015-era source

- **Official-Gazette CDN URL** given in the prior cycle's notes
  (`g7.cdnchinhphu.vn/api/download/stream?...`) was retried with `curl -k`
  and returned **HTTP 400** (`"The Url field is required."` — the URL's own
  `document_source_id` query parameter appears to have been a
  reconstruction, not copied verbatim, and no longer resolves). This URL is
  **not** used as this schema's source.
- **Third-party mirror**, `https://www.xuatnhapcanh.com.vn/upload/mau-na1-to-khai-de-nghi-cap-thi-thuc-viet-nam.doc`:
  fetched directly with `curl -sk`, **HTTP 200**, **59,392 bytes**,
  **sha256** `2386cf6db0dba28ea815a9cbdb5ae16e49f3c4b39e9a36aa02c999201d199de3`,
  genuine OLE2/Compound-File-Binary header `D0 CF 11 E0 A1 B1 1A E1`. No
  login gate. Decoded as UTF-16LE (same technique
  `vn/bca/to-khai-dang-ky-xe`'s own VERIFICATION.md documents — no
  `antiword`/`catdoc`/LibreOffice/`python-docx` tooling available in this
  sandbox) and filtered for printable-Unicode runs, recovering the full
  20-item form text, including the header line:
  ```
  Mẫu (Form) NA1
  Ban hành kèm theo thông tư số 04 /2015/TT-BCA
  ngày 05 tháng 01 năm 2015
  ```
  This mirror's own reproduction **omits** the form's official numbered
  footnotes (1)-(5) and substitutes its own promotional footer (a private
  visa-agency phone number/website/email, with an instruction to "delete
  this info when printing") — it is not a faithful, complete reproduction
  of the government form, only of its fillable-blanks structure.

### Step 2 — the legal-currency check surfaced a live, in-force amendment

Following this registry's own source-of-truth-fidelity principle, a search
was run for "Thông tư 04/2015/TT-BCA" together with "mẫu NA1" and
"sửa đổi"/"thay thế"/"còn hiệu lực" before authoring against the
pre-scouted 2015 candidate. This surfaced:

1. **Thông tư 57/2020/TT-BCA** (hiệu lực 01/7/2020) — amends
   Thông tư 04/2015/TT-BCA's forms, but not NA1 itself (per multiple
   corroborating summaries; not independently re-derived this cycle since
   it is superseded in relevance by finding 3 below).
2. **Thông tư 22/2023/TT-BCA** (hiệu lực 15/8/2023) — amends 10 named
   sibling forms (NA1a, NA3, NA5, NA7, NA11, NA13, NA15, NB8, NC2, NC2a),
   confirmed via `WebFetch` of `luatvietnam.vn`'s own page for this
   circular, which explicitly lists all 10 form codes and states **NA1 is
   not among them**.
3. **Thông tư 70/2026/TT-BCA ngày 25/5/2026, hiệu lực 01/7/2026** — **this
   one does amend Mẫu NA1 itself**, already in force as of this
   verification date (11 days after its own effective date).

Finding 3 is the significant one: it means the pre-scouted 2015-era
candidate (and its `.doc` mirror) was stale by the time this cycle started
authoring. This claim was **independently corroborated three separate
ways** before being trusted — a deliberate extra step, given this
registry's own prior gotcha in the immediately preceding VN cycle
(GOV-2479: a WebSearch AI summary once hallucinated a same-number,
different-year superseding circular that turned out not to exist). That
prior incident involved trusting a single unverified WebSearch summary;
here, three independently-fetched, directly-read documents were checked
before accepting the claim:

1. **`luatvietnam.vn`'s own article page** for the circular
   (`https://luatvietnam.vn/xuat-nhap-canh/thong-tu-70-2026-tt-bca-sua-doi-quy-dinh-nhap-canh-xuat-canh-cho-nguoi-nuoc-ngoai-438452-d1.html`):
   fetched directly with `curl -sk -A "Mozilla/5.0 ..."`, **HTTP 200**,
   **809,846 bytes**, **sha256**
   `063ec7e2dca536a77ddcdd7770a19cdf4cdca10e932ba48e03b205fd42130637`. The
   page embeds machine-readable `schema.org` `Legislation` structured data
   with `"legislationIdentifier": "70/2026/TT-BCA"`,
   `"datePublished": "2026-06-24"`, `"dateModified": "2026-07-10T13:15:47+07:00"`,
   `"legislationPassedBy": "Bộ Công an"` — not just prose that could be a
   summarization artifact. Stripping the raw HTML's tags directly (not
   relying on `WebFetch`'s own AI summary) surfaced the circular's own
   article text, including:
   ```
   Điều 1. Sửa đổi, bổ sung một số mẫu giấy tờ ban hành kèm theo
   1. Sửa đổi, bổ sung mẫu giấy tờ quy định về Tờ khai đề nghị cấp thị thực
      Việt Nam (NA1).
   ...
   Điều 8. Điều khoản thi hành
   1. Thông tư này có hiệu lực từ ngày 01 tháng 7 năm 2026.
   ```
   and, further down the same page, the **complete new NA1 template text
   verbatim** (all 20 items and footnotes (1)-(5)) — this is the direct
   source of every `fields[]`/`documents[]` `sourceRef` in `schema.json`.
2. **Two independent official provincial-police (Công an) government
   portals**, fetched directly with `curl -sk`:
   - `https://congan.laichau.gov.vn/thong-bao/xuat-nhap-canh-ap-dung-bieu-mau-moi-tu-01-7-2026-5427.html`
     — **HTTP 200**, sha256
     `de8a2c87f5df92fae812f6cdea5fef79ae5bd71fdaf3687af0fe28911dcd17ad`.
     States: "Ngày 25/5/2026, Bộ trưởng Bộ Công an đã ban hành Thông tư số
     70/2026/TT-BCA... Tờ khai đề nghị cấp thị thực Việt Nam (NA1)..."
   - `https://congan.ninhbinh.gov.vn/quy-dinh-moi-ve-mau-giay-to-lien-quan-den-viec-nhap-canh-xuat-canh-cu-tru-cua-nguoi-nuoc-ngoai`
     — **HTTP 200**, sha256
     `1e2e0049570feeb87c1b7faab5274981587a7f9965f8025e656373cb02051945`.
     States: "Từ ngày 01/7/2026, Thông tư số 70/2026/TT-BCA ngày 25/5/2026
     của Bộ Công an sửa đổi, bổ sung một số mẫu giấy tờ... chính thức có
     hiệu lực."
   Two separate provincial-level `.gov.vn` hosts, independently reporting
   the identical circular number, issue date, and effective date, is
   materially stronger corroboration than a single search-engine summary.
3. A third-party visa-guidance blog, `tanvanlang.com`, independently
   titled its own guidance page "Mẫu NA1 2026" and separately confirmed the
   same 25/5/2026 issue date / 01/7/2026 effective date (`WebFetch`,
   non-authoritative but consistent with 1 and 2).

**Conclusion: as of this verification date, Mẫu NA1's live, in-force
template is the one republished by Thông tư 70/2026/TT-BCA (25/5/2026,
hiệu lực 01/7/2026), not the original 2015 template the prior cycle had
scouted.** This schema is authored against the 2026 template.

### `congbao.chinhphu.vn` (Official Gazette) reachability

`https://congbao.chinhphu.vn` itself resolves and returns **HTTP 200** at
its root from this sandbox (unlike some other `.gov.vn` hosts this
registry has found unreachable, e.g. `csgt.vn`) — but its document
search/detail routing is client-side rendered (the static HTML returned by
`curl` carries no results list), and a guessed sequential detail-page ID
resolved instead to an **adjacent, different circular** (Thông tư
71/2026/TT-BCA, a travel-ban/entry-refusal guidance circular — confirmed by
its own `<title>` tag), not 70/2026/TT-BCA. Locating the exact Official
Gazette URL for Thông tư 70/2026/TT-BCA was not achieved within reasonable
effort this cycle. This is disclosed rather than blocking on it, consistent
with this registry's established precedent (e.g. `to-khai-dang-ky-xe`'s own
VERIFICATION.md disclosing `csgt.vn`'s unreachability and relying on a
corroborating secondary source instead) — here, three independently
corroborating sources (§ above) stand in its place.

## Scope: initial entry only, explicitly excluding NA5 and NA1a

- **Mẫu NA5** ("Tờ khai đề nghị cấp thị thực, gia hạn tạm trú") is the
  separate form used by a foreigner **already inside Vietnam** to request a
  visa/temporary-stay extension. This is a distinct process for a distinct
  applicant population (in-country, not pre-entry) and is **not modelled**
  by this schema, per this cycle's brief.
- **Mẫu NA1a** ("Thông tin đề nghị cấp thị thực điện tử" / e-Visa
  application information) is also amended by the same Thông tư
  70/2026/TT-BCA (Điều 1 khoản 2) and its full text is embedded on the same
  `luatvietnam.vn` page immediately after NA1's own text. NA1a is the
  **electronic-visa channel's own information form**, structurally
  distinct from NA1 (different field set — e.g. NA1a carries e-Visa
  validity/duration fields NA1 does not print, and a passport-type block
  keyed slightly differently). NA1 and NA1a are two different templates for
  two different application channels (paper/consular-or-checkpoint vs.
  electronic); this schema models **NA1 only**. NA1a would be a legitimate,
  disclosed candidate for a future companion schema.

## Field-by-field mapping

Every `fields[]`/`documents[]` entry's `sourceRef` cites the exact item
number (1)-(20) or footnote (1)-(5) from the 2026 NA1 template text
extracted in Step 2 above. Highlights of the mapping method:

1. **`sex`**, **`familyMemberNSex`**, and **`accompanyingChildNSex`** all
   translate the "Nam □ Nữ □" / "Male Female" checkbox pair into a
   2-value `enum`, matching this registry's `vn/xuatnhapcanh` precedent for
   the same Vietnamese civic-form checkbox convention.
2. **`passportOrTravelDocumentType`** translates footnote (5)'s own
   enumeration ("Ghi rõ loại hộ chiếu phổ thông, công vụ, ngoại giao hoặc
   giấy tờ có giá trị đi lại quốc tế") into a 4-value closed `enum`
   (`ordinary`/`official`/`diplomatic`/`other_international_travel_document`),
   the same footnote-to-`enum` translation this registry's
   `vn/bca/to-khai-dang-ky-xe` (`originType`, `procedureType`) and
   `vn/gdt` (`refundMethod`) precedents apply to a footnote that reads as a
   genuine enumeration on the source itself.
3. **`visaEntryFrequency`** translates item 19's "một lần □ nhiều lần □" /
   "Single Multiple" checkbox pair into a 2-value `enum`
   (`single_entry`/`multiple_entry`).
4. **`currentNationality`**'s new footnote (3) — the one substantive
   content change the 2026 republication makes versus the 2015 original —
   is captured in the field's own `description` as informational legal
   context (quoting Vietnam's 2025-amended Luật Quốc tịch and Luật Xuất
   cảnh, nhập cảnh provisions on dual-nationality recognition), not
   modelled as a separate keyable field, since the footnote states a legal
   notice rather than asking for additional input.
5. **Item 11's family-members table** ("Thân nhân / Family members":
   relationship gated by footnote (4), full name, sex, date of birth,
   nationality, permanent address) is flattened into a **bounded,
   disclosed repeating group** of 3 rows
   (`familyMember1...`/`familyMember2...`/`familyMember3...`), the same
   numbered-slot convention `fi/migri/residence-permit-employed-person`'s
   own VERIFICATION.md documents for its own `child1`...`child3` group.
   **The row count could not be independently confirmed**: the extracted
   text recovers the table's column headers but not a printed row count
   (blank grid cells carry no extractable text), so 3 is a disclosed,
   representative bound rather than a directly-observed one — see
   Judgment call 1 below.
6. **Item 18's accompanying-children table** ("Trẻ em dưới 14 tuổi đi cùng
   hộ chiếu (nếu có)": full name, sex, date of birth) is flattened into a
   bounded repeating group of **2** rows
   (`accompanyingChild1...`/`accompanyingChild2...`). Unlike the family
   table, this bound **is** directly evidenced by the source text: the
   extraction recovers exactly **two** "Ảnh - photo 4cm x 6cm (Under 14
   years old) See notes (2)" photo-box placeholders printed immediately
   above the table, one per child slot the form itself provisions space
   for.
7. **`declarationPlace`/`declarationDate`** decompose the combined
   "Làm tại: ................ ngày ........tháng ….... năm ............."
   signature-block line, the same way `vn/bca/to-khai-dang-ky-xe`'s own
   `declarationPlace`/`declarationDate` pair does for its signature block.

## Scope: what v1.0.0 models and what it defers

**Modelled in v1.0.0** (55 `fields[]`, 4 `documents[]`):

| Section | Representative fields |
|---|---|
| Personal particulars (items 1-10) | `fullName`, `sex`, `dateOfBirth`, `placeOfBirth`, `nationalityAtBirth`, `currentNationality`, `religion`, `occupation`, `employerAndBusinessAddress`, `permanentResidentialAddress`, `contactPhoneOrEmail` |
| Family members (item 11, bounded x3) | `familyMember1RelationshipToApplicant`/`FullName`/`Sex`/`DateOfBirth`/`Nationality`/`PermanentAddress`, `familyMember2...`, `familyMember3...` |
| Passport/travel document (item 12) | `passportOrTravelDocumentNumber`, `passportOrTravelDocumentType`, `passportIssuingAuthority`, `passportExpiryDate` |
| Entry history/plan (items 13-16) | `previousEntryDate`, `intendedEntryDate`, `intendedLengthOfStayDays`, `purposeOfEntry`, `intendedTemporaryAddressInVietnam` |
| Hosting organisation/individual (item 17) | `hostingOrganizationName`/`Address`, `hostingIndividualFullName`/`Address`/`RelationshipToApplicant` |
| Accompanying children under 14 (item 18, bounded x2) | `accompanyingChild1FullName`/`Sex`/`DateOfBirth`, `accompanyingChild2...` |
| Visa request (item 19) | `visaEntryFrequency`, `visaValidFromDate`, `visaValidToDate` |
| Other requests / declaration (items 20, signature) | `otherRequests`, `declarationPlace`, `declarationDate` |
| Documents | `passportOrTravelDocumentCopy`, `applicantPhotos`, `accompanyingChildPhotos` (conditional), `declarationAttestation` |

**Explicitly deferred (out of scope for v1.0.0):**

- **Mẫu NA5** (in-country visa/stay extension) — a separate form/process,
  per this cycle's brief.
- **Mẫu NA1a** (electronic-visa information form) — a structurally distinct
  template for the e-Visa channel, amended by the same circular but not the
  same document; a disclosed candidate for a future companion schema.
- The registration/consular-office-side content (any internal
  processing/approval marks — none were found printed on NA1 itself, unlike
  `to-khai-dang-ky-xe`'s "CÁN BỘ ĐĂNG KÝ XE" block; NA1's own text runs
  straight from item 20 to the applicant's own signature line).

## Judgment calls

1. **`familyMember1`...`familyMember3` (3 rows) is a disclosed, unverified
   bound.** The form's own table headers ("Quan hệ", "Họ tên", "Giới
   tính", "Ngày tháng năm sinh", "Quốc tịch", "Địa chỉ thường trú") were
   recovered from the extracted text, but the table's blank data-row grid
   lines carry no extractable text, so the actual printed row count could
   not be directly confirmed this cycle. 3 is chosen as a representative,
   disclosed bound (matching `fi/migri`'s own 3-row `child1`...`child3`
   precedent for an analogous unverified-row-count table), not a
   source-confirmed one. All 18 fields in this group are `required: false`
   since the source form has no separate "no family members" indicator to
   gate a `requiredWhen` on, consistent with this registry's
   `notEquals`-empty-string-absent-field-bug precedent (never fabricate a
   conditional gate the source itself doesn't key).
2. **`accompanyingChild1`/`accompanyingChild2` (2 rows) is a
   source-evidenced bound**, unlike judgment call 1: the extracted text
   shows exactly two "Ảnh - photo ... (Under 14 years old)" photo-box
   placeholders printed for item 18, one per child. All 6 fields are
   `required: false` (item 18 itself is marked "(nếu có)" / "if any").
3. **`hostingOrganizationName`/`Address` and `hostingIndividualFullName`/
   `Address`/`RelationshipToApplicant` are all modelled as optional, with
   no `exclusivityGroup` or `requiredWhen` gate between the two blocks.**
   The form's own item 17 heading ("Cơ quan, tổ chức hoặc cá nhân tại Việt
   Nam mời, bảo lãnh" / "Hosting organisation/individual") implies an
   either/or relationship in prose, and the amending circular's own Điều 6
   text (quoted in `authority.operatedBy.basis`'s legal-currency notes)
   confirms a hosting organization/individual sponsor is generally
   required by law (Điều 16 of Vietnam's Luật Nhập cảnh, xuất cảnh...) —
   but the form itself prints no boolean checkbox pair for `spec/v0.3`'s
   `exclusivityGroups` mechanism (§8.4, which requires `type: boolean`
   fields) to attach to, and provides no other keyable indicator to gate a
   `requiredWhen` on. Disclosed in each field's own `description` rather
   than fabricated as a formal gate, per this registry's own
   `notEquals`-empty-string-absent-field-bug precedent.
4. **`accompanyingChildPhotos` (`documents[]`) is modelled with
   `required: false` and no `requiredWhen`.** Its actual trigger condition
   (one or more accompanying children declared in item 18) has no
   dedicated boolean field on the form to gate on — the same reasoning as
   judgment call 3 — so the condition is disclosed in the document entry's
   own `handling` prose instead of a fabricated gate.
5. **`religion` is modelled as `required: true`, matching `vn/xuatnhapcanh`'s
   own precedent** that Vietnamese civic forms of this kind treat "Tôn
   giáo" as a required field accepting "Không" (none) as a valid answer,
   not an optional field.
6. **`intendedLengthOfStayDays` uses `type: integer` with `minimum: 1`**,
   translating the form's "tạm trú ở Việt Nam .......ngày" blank (a count
   of days) into a natural-number constraint, since the form itself gives
   no explicit maximum.

## Test run (Phase 3)

No live submission was attempted: this form is filed either at a
Vietnamese diplomatic mission abroad (in person or by post) or in person at
an international border-checkpoint immigration unit — there is no online
submission channel for NA1 itself (that is precisely what the separate NA1a
e-Visa form is for), and submitting fabricated applicant data against a
live consular/immigration process is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and validated with a purpose-written,
uncommitted script (`validate_instance.mjs`, mirroring
`to-khai-dang-ky-xe`'s own documented approach): compiles `schema.json`'s
`fields[]` into a JSON Schema draft 2020-12 document checked with `ajv`
(via `ajv/dist/2020.js` for the 2020-12 dialect), plus a from-scratch
evaluator for the shared `Condition` grammar that checks both
`fields[].requiredWhen` and every `documents[]` entry's static
`required`/`requiredWhen` status against a `documents: [{id, provided}]`
array — checking `documents[]` requiredness explicitly, since this
registry's own accumulated experience is that conformance checkers
routinely skip it:

```
$ node validate_instance.mjs registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json \
    conformance/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/single-entry-tourist-no-family-or-children.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS

$ node validate_instance.mjs registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json \
    conformance/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/multiple-entry-work-purpose-with-spouse-and-one-child.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'passportOrTravelDocumentNumber' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'passportOrTravelDocumentNumber'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-sex-enum-violation.json: 'sex' set to 'unspecified'
Static (required/type/pattern/enum) validation: FAIL
 - /sex must be equal to one of the allowed values
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
$ node tools/validate.mjs registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json
ok   registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json
ok   registry/vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean (376/376
documents, 3/3 `mapping.json` companions), and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev` in
both `tools/` and `tools/govschema-client/` since a plain `npm ci` under a
local `NODE_ENV=production` skips `ajv`'s devDependency install) to include
this document's entry.

## Vietnam's remaining verticals

Vietnam now stands at **5 of 6** verticals (Business Formation, Passport,
Taxes, DMV, Visa). **National ID** is the sole remaining open vertical, and
was independently re-confirmed a dead end in the prior GOV-2479 cycle
(Luật Căn cước 2023 replaced the old citizen-form CC01 with a fully
system/officer-generated workflow — no downloadable applicant-facing
form). No fresh re-scouting of that finding was performed this cycle; it
should be re-confirmed, not assumed, before the next VN cycle closes it out
as a genuine dead end.
