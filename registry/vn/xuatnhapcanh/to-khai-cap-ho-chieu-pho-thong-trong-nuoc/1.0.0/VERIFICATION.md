# Verification record — vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc@1.0.0

## Why this candidate (GOV-2404, "GovSchema Standard Research")

This registry's existing open gaps were all re-confirmed dead ends this
cycle before scouting new jurisdictions: Italy's remaining four verticals
(Passport, Business Formation, National ID, Visa — all confirmed dead-end
in GOV-2382) and Argentina/Chile/Spain's remaining verticals (re-confirmed
dead-end in GOV-2397) offered no genuinely open path forward. Three fresh
candidate jurisdictions were scouted in parallel: Greece, Peru, and Vietnam.
Vietnam's Passport vertical won on source strength — see "Candidates
considered and not picked" below for the Greece/Peru comparison.

## Source fetch — and a legal-currency correction mid-cycle

The first scouting pass located `https://hochieu.xuatnhapcanh.gov.vn/docs/FORM_TO_KHAI_X01.pdf`
("Mẫu/Form X01"), live and unauthenticated: HTTP 200, 252,823 bytes, genuine
`%PDF-1.6` header, SHA-256
`3e8830d25e97a919d02c54b665770d86b7bdec51f98dc0f1e3192847135eace9`
(independently re-fetched and re-hashed this cycle, matching the scouting
pass's own figures exactly). Independent `pdfjs-dist@3.11.174` extraction
confirmed a genuine AcroForm: 41 `/Widget` annotations across 39 distinct
field names on a single page (2 fields — `gioi_tinh`, `gioi_tinh_con` — are
radio-button pairs sharing one field name each), every field carrying a
self-documenting Vietnamese `alternativeText` tooltip (e.g. `"Nhập thông tin
họ và tên"` — "Enter full name information"). By AcroForm-richness alone,
this was the strongest single source found across all three scouted
jurisdictions this cycle.

Before authoring against it, however, a routine legal-currency check (this
registry's own source-of-truth-fidelity principle: a schema is only valid
if it matches the *current* live government source) found form X01 was
issued under Circular (Thông tư) 29/2016/TT-BCA and has been superseded
three times since:

1. **Circular 73/2021/TT-BCA** (2021-06-29) renamed the form TK01.
2. **Circular 31/2023/TT-BCA** (2023-07-20) restated TK01 with QR-code and
   updated photo provisions, and split the under-14 case into a distinct
   sibling form, TK01a.
3. **Circular 69/2026/TT-BCA** (2026-05-22, effective **2026-07-01** — ten
   days before this schema's own retrieval date) replaced the TK-series
   templates outright, per its own Điều 1 ("Thay thế các biểu mẫu ban hành
   kèm theo Thông tư số 31/2023/TT-BCA" — "Replace the forms issued under
   Circular 31/2023/TT-BCA"), naming TK01 (14+, domestic) first among nine
   replaced forms.

X01's continued live availability at its original government URL is a
publishing-lag artifact — the download link on `xuatnhapcanh.gov.vn` simply
has not been updated — not evidence of continued legal validity. Authoring
against it would have modelled a form that ceased to be the operative
template ten days before this cycle even started. **This schema does not
use X01 at all**; it models the current TK01 exclusively.

The current TK01 template was located inside Circular 69/2026/TT-BCA's own
full-text PDF, fetched directly from the Ministry of Public Security's own
domain:

- `https://bocongan.gov.vn/media/bca-media/library-20260605162947-b5b3b663-47e8-48b9-8dbc-431d44435183-thong-tu-69-2026-tt-bca-hc-gth.pdf`
  — HTTP 200, 3,590,521 bytes, genuine `%PDF-1.5` header, SHA-256
  `aa110281eebb5eed459bd83a9a9000393f4adfb8a0efe56154ca46df5bd2bb19`, no
  login/CAPTCHA/WAF gate.
- Discovery path: a web search for the circular's own number and date
  surfaced `bocongan.gov.vn`'s own document library entry directly; a
  secondary confirmation came from `thuvienphapluat.vn` and `luatvietnam.vn`
  (Vietnamese legal-database mirrors), which corroborated the circular
  number, date, and "replaces 9 forms, effective 2026-07-01" characterization
  independently of the primary-source PDF.

## Extraction technique: full-page rendering of a mixed-codec scanned gazette

This 12-page PDF is a scanned, signed gazette document. `pdfjs-dist`'s own
`getTextContent()` returns 0 characters on every page except the cover
(itself only a garbled-font-encoding operative-text page, page 1). The
remaining 11 pages are scanned images split across **two different
compression codecs within the same PDF**: a raw byte scan for JPEG
SOI/EOI markers found 8 `DCTDecode` (JPEG) image objects, but the PDF's own
object dictionary revealed 4 more images encoded `JBIG2Decode` (a bi-level
fax-style codec commonly used for black-and-white scanned text, invisible
to a JPEG-marker byte scan). Rather than hand-decode two different image
codecs, `node-canvas` + `pdfjs-dist` full-page rendering (`page.render()` at
`scale: 2.0`) was used to rasterize every page of the PDF to PNG directly —
pdfjs's own worker handles both codecs internally during rendering. This is
a new extraction technique for this registry, distinct from both the
AcroForm-widget route (`fi/poliisi`, `se/skatteverket`) and the raw-JPEG-
object-stream route (`it/mit`, GOV-2389) used in prior cycles, needed here
specifically because this source mixes codecs within one document.

Page 4 of the rendered set is Mẫu TK01 in full, legible at 2x scale (see
the field-by-field transcription below). Five sibling pages were also
visually confirmed en route while locating TK01, cross-checking Điều 1's
own enumerated list of nine replaced forms: TK01a (`page_img_3`/rendered
page 3, under-14 domestic), TK02 (rendered page 5, 14+ abroad), TK02a
(rendered page 6, under-14 abroad), TK03 (rendered page 7, identity
confirmation for a citizen abroad reporting a lost passport), and TK06
(rendered page 1 in JPEG-blob extraction order, "statement regarding
failure to collect a passport"). Only TK01 is modelled in this schema.

No `/Widget` annotations exist anywhere in this PDF (a signed, flattened,
print-and-fill gazette scan) — all 30 fields were identified directly from
the rendered page's own printed layout and numbered items, following this
registry's `jp/houmukyoku`/`se/polisen` precedent for a source with a
genuine text-or-image layer but no fillable widgets to key field names off
of.

## Field-by-field transcription (Mẫu TK01)

| Item | Printed Vietnamese | Modelled field(s) |
|---|---|---|
| 1 | Họ...... Chữ đệm và tên...... | `familyName`, `middleAndGivenName` |
| 2 | Giới tính: Nam ☐ Nữ ☐ | `sex` |
| 3 | Sinh ngày...tháng...năm... Nơi sinh (tỉnh, thành phố) | `dateOfBirthDay`, `dateOfBirthMonth`, `dateOfBirthYear`, `placeOfBirth` |
| 4 | Số định danh cá nhân [12 digit boxes] | `personalIdentificationNumber` |
| 5 | Dân tộc | `ethnicity` |
| 6 | Tôn giáo | `religion` |
| 7 | Số điện thoại | `phoneNumber` |
| 8 | Nơi thường trú | `permanentResidence` |
| 9 | Nơi tạm trú | `temporaryResidence` |
| 10 | Nơi ở hiện tại | `currentResidence` |
| 11 | Nghề nghiệp | `occupation` |
| 12 | Tên và địa chỉ cơ quan (nếu có) | `employerNameAndAddress` |
| 13 | Cha: họ và tên...sinh ngày | `fatherFullName`, `fatherDateOfBirth` |
| 13 | Mẹ: họ và tên...sinh ngày | `motherFullName`, `motherDateOfBirth` |
| 13 | Vợ/chồng: họ và tên...sinh ngày | `spouseFullName`, `spouseDateOfBirth` |
| 14 | Hộ chiếu phổ thông cấp lần gần nhất (nếu có): Số...cấp ngày | `oldPassportNumber`, `oldPassportIssueDate` |
| 15 | Số tài khoản hoàn lệ phí (nếu có) / Tên chủ tài khoản / Tên ngân hàng | `feeRefundAccountNumber`, `feeRefundAccountHolderName`, `feeRefundBankName` |
| 16 | Nội dung đề nghị | `requestDetails` |
| 16 | Cấp hộ chiếu có/không gắn chíp điện tử | `passportWithChip`, `passportWithoutChip` |

All 19 printed numbered items map onto exactly 30 modelled fields; nothing
on the form's own face is excluded (the photo boxes and QR code carry no
applicant-entered data, and the signature line/declaration clause are not
data fields, per this registry's standard signature-line convention).

## Differences from the superseded X01 — followed exactly, not carried over

The new TK01 differs materially from the superseded X01 (whose AcroForm
this cycle also fully extracted before setting it aside — see above). This
schema follows the *new* form's own structure in every case, disclosed
here rather than silently reconciled against the old one:

1. **Identity number**: X01's separate CMND/CCCD-number-plus-issue-date-
   plus-issue-place block (3 fields: `so_cmnd`, `ngay_cap_cmnd`,
   `noi_cap_cmnd`) is replaced by a single 12-digit `Số định danh cá nhân`
   field — modelled as `personalIdentificationNumber` with
   `pattern: ^[0-9]{12}$` — reflecting Vietnam's post-2021 shift to the
   unified Citizen Identification (CCCD) numbering scheme.
2. **Address structure**: X01's three-part Phường/xã–Quận/huyện–Tỉnh/TP
   breakdown for both permanent and temporary residence (8 fields total:
   `dctt_xa`/`dctt_huyen`/`dctt_tinh`, `dcta_xa`/`dcta_huyen`/`dcta_tinh`,
   plus the two street-line fields) is gone. The new TK01 prints one
   free-text blank each for permanent residence, temporary residence, and
   current residence (a third address concept X01 did not carry at all) —
   modelled as three flat string fields (`permanentResidence`,
   `temporaryResidence`, `currentResidence`), not a synthetic address
   sub-object reconstructing the old breakdown.
3. **Employer block**: X01's separate employer-name (`ten_co_quan`) and
   employer-address (`dia_chi_co_quan`) boxes are merged into one printed
   blank — modelled as one combined optional field,
   `employerNameAndAddress`, not force-split back into two fields the
   current form does not itself distinguish.
4. **No child-inclusion section**: X01's entire "child under 9 to be
   included in this passport" block (6 fields: name, sex, day/month/year
   of birth, place of birth) has no counterpart on the new TK01. The
   under-14 case is now exclusively routed through the separate TK01a form
   (rendered page 3, visually confirmed this cycle — see its own header,
   "TỜ KHAI Đề nghị cấp hộ chiếu phổ thông ở trong nước dành cho người chưa
   đủ 14 tuổi"), out of scope for this schema.
5. **Two wholly new field clusters**, with no X01 precedent at all: a
   fee-refund bank-account block (item 15 — account number, account-holder
   name, bank name, all optional per the form's own "(nếu có)" tag),
   reflecting a digital fee-refund channel; and a mutually exclusive
   chip/no-chip e-passport choice (item 16's own two checkboxes), per the
   form's own footnote (4) instruction ("Đề nghị cấp hộ chiếu có (hoặc
   không) gắn chíp điện tử thì đánh dấu (X) vào ô tương ứng" — "mark X in
   the corresponding box").

## Judgment calls disclosed

- **`fatherDateOfBirth`/`motherDateOfBirth`/`spouseDateOfBirth` are typed
  `date`, not `string`.** This is a deliberate departure from this
  registry's `fi/poliisi` precedent for a superficially similar field:
  that Finnish form's own AcroForm `alternativeText` tooltip explicitly
  allowed a literal "deceased" value in place of a date
  (`"...nếu đã mất thì ghi đã mất"` equivalent). This Vietnamese form's
  rendered page carries no equivalent allowance anywhere in its own
  footnoted instructions (items 1-5) — absent that evidence on this
  specific source, the field is modelled as a clean `date` rather than
  assuming the same carve-out applies here too.
- **`temporaryResidence` is optional (`required: false`)** despite
  carrying no printed "(nếu có)" tag on the form itself. Disclosed
  judgment call: unlike `permanentResidence` and `currentResidence`, a
  separate temporary-residence registration is not universal in Vietnam's
  own residence-registration system (Luật Cư trú), and this registry's own
  established practice (e.g. `se/skatteverket/samordningsnummer-ansokan`'s
  optional contact-address fields) is to leave a structurally-conditional-
  but-untagged field optional rather than invent a `requiredWhen` gate the
  source itself does not support.
- **`spouseFullName`/`spouseDateOfBirth` are optional.** The form prints no
  marital-status selector field anywhere to condition this on, so — per
  this registry's established convention (e.g. `fi/poliisi`'s second-
  guardian fields) — plain optionality is disclosed rather than a
  synthetic gating field invented.
- **`ethnicity`/`religion`/`phoneNumber` are modelled `required: true`**,
  matching every other unmarked numbered item on the form; `religion`'s own
  description notes "Không" (none) is itself a valid entry, consistent
  with common practice on this class of Vietnamese civic form.

## `documents[]`

The form's own printed text carries no attachment checklist. Two entries
were sourced instead from a first-party provincial police portal's own
published procedure guidance — `conganthanhhoa.gov.vn` (Công an tỉnh Thanh
Hóa), which cites Circular 31/2023/TT-BCA. This is one circular generation
behind 69/2026, but 69/2026's own Điều 1 states it replaces only the
TK-series *templates* themselves, not the underlying documents-required
regulation, so the checklist is treated as still current:

- `photograph` (required: true) — matches the new TK01's own printed note
  (1) exactly: ≤6 months old, 4x6cm, white background, bare head, clear
  face and ears, no glasses, formal attire.
- `priorPassportOrLossReport` (required: false) — required only when the
  applicant currently holds or previously held a passport (the reissue
  case) or must submit a police loss report if the previous passport was
  lost; not required for a genuine first-time applicant. Disclosed as
  conditionally applicable in prose rather than gated by an invented
  `requiredWhen`, consistent with this registry's own convention for a
  non-form-sourced `documents[]` entry (see e.g.
  `se/skatteverket/samordningsnummer-ansokan`'s residence-permit-card
  entry).

## Conformance verification

A one-off checker script (`check_conformance.mjs`, not committed — ad hoc
per this registry's convention) evaluated every fixture in
`conformance/vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc/1.0.0/`
against this schema's `fields[]` (`required`/`validation.pattern`) and
`exclusivityGroups` rules (no `documents[].requiredWhen` rules to evaluate,
per above — `photograph` is statically required and was included in both
valid fixtures). Results:

| Fixture | Errors | Expected |
|---|---|---|
| `first-time-applicant-minimal.json` | 0 | 0 |
| `renewal-applicant-with-temp-residence-and-refund-account.json` | 0 | 0 |
| `mutation-control-missing-static-required.json` | 1 (`occupation` missing) | 1 |
| `mutation-control-personal-id-pattern-violation.json` | 1 (`personalIdentificationNumber` fails pattern) | 1 |
| `mutation-control-exclusivity-group-violation.json` | 1 (`chip_choice` both true) | 1 |

All 5 fixtures produced exactly the expected error count. The two valid
scenarios cover a minimal first-time applicant (no prior passport,
temporary residence, spouse, or fee-refund account) and a fuller renewal
applicant (prior passport, temporary residence, spouse, and a fee-refund
bank account, exercising every optional field); the three mutation controls
each isolate exactly one rule type (`required`, `validation.pattern`,
`exclusivityGroups`) by construction.

## Registry validation

- `node tools/validate.mjs registry/vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
- `node tools/verify-sources.mjs registry/vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc/1.0.0` → see command output in the PR

## Candidates considered and not picked

- **Greece**: DMV (in-person only), Business Formation (telematic ComUnica-
  style channel, no citizen-fillable PDF), Passport (a downloadable
  "sample" PDF exists but is 6 embedded scanned JPEGs with zero font
  references, and the site itself states category-specific forms are only
  printed in person), and National ID (appointment-only via `id.gov.gr`)
  were all found weak or dead-end. The one strong candidate found — the
  Greek MFA's national/Schengen visa application form — is a genuine
  text-layer static PDF, but the primary `mfa.gr` host returned an Akamai
  edge block from this sandbox; only a VFS Global consulate mirror
  (`vfsglobal.com/greece/bahrain/...`) was independently fetchable. Left as
  a viable backlog candidate for a future cycle, ideally re-fetching the
  primary `mfa.gr` copy from a different network first.
- **Peru**: Passport (Migraciones) and National ID (RENIEC DNI) were
  re-confirmed appointment/biometric-gated, matching a prior scouting
  pass's finding. Taxes (SUNAT) is Clave-SOL-login-gated with only
  instructional cover-sheet PDFs downloadable, not a fillable form.
  Business Formation (SUNARP incorporation) is web-portal-login-gated, but
  a sibling SUNAT form, RUC registration (Formulario 2119), is a genuine
  unauthenticated static text-layer PDF. DMV (MTC driver's-licence
  application) and Visa (Cancillería's DGC-005 form) are both genuine
  unauthenticated static text-layer PDFs as well, with DGC-005 the
  cleanest of the three (single page, bilingual, ~10 fields). All three
  are real, viable backlog candidates for a future Peru-opening cycle, but
  none carry genuine AcroForm widgets — weaker by this registry's own bar
  than Vietnam's TK01 candidate.

## Scope and jurisdiction notes

This opens Vietnam as this registry's **37th jurisdiction**, via the
Passport vertical. Vietnam now stands at 1 of 6 verticals (Passport);
Business Formation, DMV, Taxes, Visa, and National ID remain open,
unscreened backlog candidates for a future cycle.
