# Verification record — `vn/bca/phieu-de-nghi-giai-quyet-thu-tuc-ve-can-cuoc-dc02` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields and states the current verification
claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2986**). It opens
Vietnam's **National ID vertical (6 of 6)**, following `vn/dangkykinhdoanh`
(Business Formation), `vn/xuatnhapcanh` (Passport), `vn/gdt` (Taxes),
`vn/bca/to-khai-dang-ky-xe` (DMV), and
`vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam` (Visa).

## The pre-scouted candidate (Mẫu CC01) turned out to be a dead end

A prior cycle (GOV-2976) delegated a child issue (**GOV-2980**) proposing
Mẫu CC01, "Tờ khai Căn cước công dân" (Citizen ID Declaration), citing a
directly-downloadable specimen at
`https://dichvucong.bocongan.gov.vn/public_dir/tttl/10/giayto/2020_11/1604372463_Mau_CC01.doc`.

### Step 1 — re-fetching and re-extracting the pre-scouted source

Independently re-fetched via `curl`: **HTTP 200**, `application/msword`,
**57,856 bytes**, **sha256**
`cb94e3ea5cbf3eab155f8728a6037cb215b2f9267fd36c34fee50a8403ac466b`,
`Last-Modified: Thu, 24 Apr 2025`. A legacy OLE2 `.doc`, decoded via a
UTF-16LE byte-scan.

**Extraction-technique correction:** this registry's established UTF-16LE
scan (accept only ASCII code units with a zero high byte) garbled the
Vietnamese text — diacritic characters (e.g. `ộ`, `ư`, `ế`) fall outside
that range and every run broke on the first one, yielding fragments like
`NG HO` / `I CH` / `A VI` instead of `CỘNG HOÀ ... VIỆT NAM`. Broadened the
scan to a regex over the full `utf-16-le` decode accepting the Latin
Extended-A/B and combining-diacritic ranges Vietnamese actually uses
(`[A-Za-z0-9À-ỹ\s.,;:()/\-%'"]{6,}`), which recovered clean, complete text:
22 numbered items (full name, DOB, gender, old CMND/CCCD number,
ethnicity, religion, nationality, marital status, blood type, place of
birth registration, hometown, permanent/current residence, occupation,
education level, father/mother/spouse/legal-representative/household-head
blocks, and an issue/replace/reissue request block with an optional home-
delivery address), plus a police-only "KẾT QUẢ XÁC MINH" verification
section, footnotes (1)-(5), and the form's own legal citation:

```
Mẫu CCO1 ban hành kèm theo
Thông tư số 41/2019/TT-BCA ngày 01/10/2019
```

### Step 2 — the legal-currency check found the citation itself is dead

Following this registry's source-of-truth-fidelity principle, the cited
circular's currency was checked rather than assumed. `WebSearch` + a direct
`curl` of luatvietnam.vn's own article on Thông tư 17/2024/TT-BCA
(**HTTP 200**, **555,346 bytes**, **sha256**
`45ad081469154359626335142dba8660f7fca13df2bf81993978118052ac5d2e`) quotes
Điều 16 verbatim:

> "Các thông tư sau đây hết hiệu lực kể từ ngày Thông tư này có hiệu lực thi
> hành: ... b) Thông tư số 66/2015/TT-BCA...; c) Thông tư số 41/2019/TT-BCA..."

Thông tư 17/2024/TT-BCA took effect **01/7/2024** — the same date Luật Căn
cước 26/2023/QH15 (Law on Identification) replaced "Căn cước công dân"
(Citizen Identification) with "Căn cước" (Identification) nationwide. So
the CC01 candidate's own cited legal basis expired nearly two years before
this verification date, despite the `.doc` file itself still being served
live with a recent `Last-Modified` timestamp — a government host serving a
stale, superseded document under a still-reachable, still-200-status URL,
not a "confirmed dead end" the source itself would have flagged.

**This finding was corroborated, not trusted from a single AI-search
summary alone** — this registry has been burned by exactly that failure
mode before (GOV-2486's own memory note, a WebSearch AI summary
hallucinating a superseding circular in an earlier VN cycle). Here, the
repeal was verified against the *repealing circular's own* verbatim Điều 16
text, independently re-fetched.

### Step 3 — the new circular reuses "CC01" for a structurally different document

Thông tư 17/2024/TT-BCA's own Điều 8 introduces five forms and, critically,
reuses the symbol "CC01" for a *different* document:

> "1. Phiếu thu nhận thông tin căn cước (ký hiệu là CC01)
> Phiếu thu nhận thông tin căn cước được cơ quan quản lý căn cước nơi tiếp
> nhận hồ sơ ... tạo lập trên cơ sở trích xuất thông tin của công dân ...
> trong Cơ sở dữ liệu quốc gia về dân cư, Cơ sở dữ liệu căn cước khi thực
> hiện thủ tục."

I.e. the new CC01 is generated *by the receiving office itself*, by
extracting the citizen's already-on-file record from the National
Population Database — not a blank template a citizen independently
completes. Điều 10 khoản 2 confirms this operationally:

> "Các biểu mẫu CC01, CC02, CC03, CC04, DC03 được tích hợp trong phần mềm
> hệ thống ... và in trực tiếp từ máy tính để sử dụng."

CC01 is one of the five forms "in trực tiếp từ máy tính" (printed directly
from the case-management computer system) — the opposite of a
citizen-fillable application. **The pre-scouted CC01 candidate is
therefore a genuine dead end** for a citizen-facing GovSchema document
under the current legal regime: not because the process it represents
disappeared, but because the specific artifact (a blank, citizen-completed
declaration bearing that name) no longer exists — its successor with the
same symbol is an internal system printout.

### Step 4 — finding the actual current citizen-facing successor (Mẫu DC02)

Điều 9 khoản 2 of the same circular names the genuine citizen/representative-
completed successor:

> "2. Phiếu đề nghị giải quyết thủ tục về căn cước (ký hiệu là DC02)
> Phiếu đề nghị giải quyết thủ tục về căn cước được sử dụng khi công dân,
> người gốc Việt Nam chưa xác định được quốc tịch thực hiện thủ tục cấp,
> cấp đổi, cấp lại thẻ căn cước; xác nhận thông tin số chứng minh nhân dân
> 09 số, số định danh cá nhân; hủy, xác lập lại số định danh cá nhân; khai
> thác thông tin trong Cơ sở dữ liệu quốc gia về dân cư; khai thác thông
> tin trong Cơ sở dữ liệu căn cước; điều chỉnh thông tin trong Cơ sở dữ
> liệu quốc gia về dân cư; tích hợp thông tin vào thẻ căn cước; thu thập,
> cập nhật thông tin vào Cơ sở dữ liệu căn cước."

Điều 10 khoản 2's system-generated-forms list ("CC01, CC02, CC03, CC04,
DC03") deliberately **excludes** DC01 and DC02 — the two forms not
auto-printed from the case-management system, consistent with DC02 being
the genuine paper/typed citizen request.

A working specimen was located (`WebSearch`) and independently re-fetched
via `curl`: `https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2024/NTH/22062024/M%E1%BA%ABu%20DC02.docx`
— **HTTP 200**,
`application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
**38,416 bytes**, **sha256**
`435c3001e6c6f1d95ffa3cc8e87e2fc778167378a73b570d25b91f0792c76713`,
`Last-Modified: Fri, 27 Mar 2026`. A genuine OOXML `.docx` (`PK\x03\x04` ZIP
header), extracted cleanly via Python's `zipfile` module over
`word/document.xml` plus a tag-stripping regex (no OCR/image step needed —
native text-layer Word content). The document's own first line reads:

```
Mẫu DC02 ban hành kèm theo Thông tư số 17/2024/TT-BCA ngày 15/5/2024
```

— directly citing the currently-in-force circular identified in Step 2,
closing the loop.

## Field inventory

The extracted text gives a single-page form in three sections plus a
signature block:

- **Kính gửi (1)** — addressee (the receiving identification office).
- **I. THÔNG TIN NGƯỜI ĐỀ NGHỊ** (Applicant information) — full name, DOB,
  gender, personal identification number, place of residence.
- **II. THÔNG TIN NGƯỜI ĐẠI DIỆN THỰC HIỆN THỦ TỤC (nếu có)** (Representative
  information, if any) — full name, DOB, gender, personal identification
  number.
- **III. NỘI DUNG ĐỀ NGHỊ (3)** (Request content — "select one or more") —
  nine checkboxes: (1) issue/replace/reissue card, (2) confirm personal
  ID vs. old 9-digit CMND, (3) confirm personal ID vs. a cancelled personal
  ID, (4) cancel/re-establish personal ID, (5) extract National Population
  DB info, (6) extract Identification DB info, (7) adjust National
  Population DB info, (8) integrate info onto an issued card, (9) collect/
  update Identification DB info (voice-biometric consent implication per
  footnote (6)) — plus (10) free-text specific-content elaboration and
  (11) result-delivery address.
- Signature block: place/date, "NGƯỜI ĐỀ NGHỊ" (Requester).

## Scope decisions

1. **Modelled the full nine-checkbox breadth**, not narrowed to item 1
   (card issuance/replacement/reissuance) alone, following this registry's
   `ro/dgpci` precedent of modelling a multi-purpose government request
   slip's complete printed breadth rather than an arbitrary narrowing to
   the vertical's namesake transaction. Item 1 is the transaction most
   directly analogous to what closes the National ID vertical; the other
   eight are secondary procedures the same unified form also serves.
2. **No `exclusivityGroups`** on the nine request-type booleans: the form's
   own footnote (3) reads "Lựa chọn một hoặc nhiều nội dung đề nghị"
   (select one or more), i.e. not mutually exclusive — unlike `ro/dgpci`'s
   own single-select checkbox block.
3. **Representative block (Section II) modelled `required: false`** across
   all four sub-fields: the form itself marks it "(nếu có)" (if
   applicable), consistent with this registry's established convention for
   optional family/representative blocks (cf. `ro/dgep`'s
   `fathersFirstName`/`mothersFirstName`, both `required: false` with no
   conditional gate).
4. **Gender modelled as a binary enum** (`male`/`female`) for both the
   applicant and representative, consistent with this registry's
   established convention for Vietnamese government forms (cf.
   `vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam`'s own `sex` field), even
   though this specimen prints only a blank line after "Giới tính:" with no
   visible checkbox glyphs.
5. **`personalIdNumber` fields use `pattern: ^\d{12}$`**, Vietnam's
   standard 12-digit personal-identification-number format established
   under Luật Căn cước.
6. **Footnote (8)'s five lettered consent-channel sub-methods are not
   modelled as separate fields** — they describe alternative *channels* by
   which the data subject's consent can be recorded (in-person signature on
   this form, the national ID app, a separate written consent document, a
   legal representative's signature, or left blank when the requester is
   the data subject), not additional data entered into the form itself.
7. **No `documents[]`**: DC02 prints no attachment checklist of its own —
   Điều 10 khoản 1 covers only its physical paper format (A4, black ink on
   white paper) — consistent with this registry's `ro/dgpci` precedent of
   omitting `documents[]` rather than sourcing a checklist from an
   unverified third party when the form itself carries none.

## Test run (Phase 4)

No live submission was attempted: DC02 is filed in person (or via an
authenticated online public-service channel gated behind national ID app
login) at a local Công an office as part of an in-person identification
procedure — there is no anonymous online submission channel, and
submitting fabricated applicant data against a live government process is
not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and validated with a purpose-written,
uncommitted script (`validate_instance.mjs`, mirroring this registry's
established approach): compiles `schema.json`'s `fields[]` into a JSON
Schema draft 2020-12 document checked with `ajv` (via `ajv/dist/2020.js`
for the 2020-12 dialect).

```
$ node validate_instance.mjs registry/vn/bca/phieu-de-nghi-giai-quyet-thu-tuc-ve-can-cuoc-dc02/1.0.0/schema.json \
    conformance/vn/bca/phieu-de-nghi-giai-quyet-thu-tuc-ve-can-cuoc-dc02/1.0.0/self-filed-card-reissuance.json
Static (required/type/pattern/enum) validation: PASS
OVERALL: PASS

$ node validate_instance.mjs registry/vn/bca/phieu-de-nghi-giai-quyet-thu-tuc-ve-can-cuoc-dc02/1.0.0/schema.json \
    conformance/vn/bca/phieu-de-nghi-giai-quyet-thu-tuc-ve-can-cuoc-dc02/1.0.0/representative-filed-card-issuance-with-integration.json
Static (required/type/pattern/enum) validation: PASS
OVERALL: PASS
```

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule:

```
$ # mutation-control-missing-required-field.json: 'applicantFullName' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'applicantFullName'
OVERALL: FAIL

$ # mutation-control-personal-id-pattern-violation.json: 'applicantPersonalIdNumber' set to '12345' (not 12 digits)
Static (required/type/pattern/enum) validation: FAIL
 - /applicantPersonalIdNumber must match pattern "^\d{12}$"
OVERALL: FAIL

$ # mutation-control-gender-enum-violation.json: 'applicantGender' set to 'unspecified'
Static (required/type/pattern/enum) validation: FAIL
 - /applicantGender must be equal to one of the allowed values
OVERALL: FAIL
```

## Disclosed gaps

- No live test submission (see above) — this is a `structural-reference`
  maturity document, not an `execution-tested-schema`.
- Footnote (8)'s consent-channel options and the "Ý KIẾN CỦA CHỦ THỂ THÔNG
  TIN" opinion block are documented above but not modelled as fields (see
  scope decision 6).
