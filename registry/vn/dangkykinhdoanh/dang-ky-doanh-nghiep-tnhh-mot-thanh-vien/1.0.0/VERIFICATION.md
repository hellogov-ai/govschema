# Verification record — `vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a `GovSchema Standard Research` cycle (**GOV-2443**, a follow-on to
**GOV-2441**). It opens Vietnam's **Business Formation vertical (3 of 6)**,
following `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc`
(Passport, 1 of 6, GOV-2404) and
`vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan` (Taxes, 2 of 6, GOV-2411).

## Attempt to reach the primary first-party host

GOV-2441's background research named `dangkykinhdoanh.gov.vn` (Vietnam's
National Business Registration Portal) as reachable unauthenticated this
cycle, citing successful fetches of sibling forms on the same host. This
cycle's own attempts, however, found the opposite:

- `curl` (both a browser `User-Agent` and a bare one) against
  `https://dangkykinhdoanh.gov.vn/vn/tin-tuc/download.aspx` and
  `https://dangkykinhdoanh.gov.vn/vn/Pages/Noidunghuongdan.aspx?lhID=3&htID=18`
  (the portal's own single-member-LLC procedural-guidance page) both returned
  `HTTP:000` (no TCP connection) after a 25-30s timeout, on two separate
  attempts.
- `WebFetch` against the same guidance-page URL failed with `unable to
  verify the first certificate` — a TLS handshake failure, not a content
  error.

This matches this registry's own prior gov.vn-host-unreachable precedent
(`gdt.gov.vn`, `canhan.gdt.gov.vn`, `dfat.gov.au`/`gov.au`) rather than
GOV-2441's own "confirmed reachable" note; the earlier finding evidently does
not hold for this specific page/session. Per this cycle's own sourcing
guidance, the fallback path was used instead.

## Source used: the Official Gazette of the Government of Vietnam (congbao.chinhphu.vn)

Rather than falling back to `cms.luatvietnam.vn` (GOV-2441's named fallback
mirror), this cycle located and used a **stronger** first-party source: the
Circular's own promulgation record in Công báo (the Official Gazette of the
Government of Vietnam), reached via `congbao.chinhphu.vn`'s own citation
page for Thông tư 68/2025/TT-BTC.

- **Citation page:** `https://congbao.chinhphu.vn/van-ban/thong-tu-so-68-2025-tt-btc-45617/57815.htm`
  — fetched with a browser `User-Agent`, **HTTP 200**, 155,129 bytes. Its own
  `<title>` reads "Thông tư số 68/2025/TT-BTC ban hành biểu mẫu sử dụng
  trong đăng ký doanh nghiệp, đăng ký hộ kinh doanh." and links to four PDF
  parts hosted on `congbaocdn.chinhphu.vn` (the Gazette's own CDN), each
  covering roughly 50-95 pages of the full circular-plus-appendices.
- **Part used (Part 1 of 4):**
  `https://congbaocdn.chinhphu.vn/CongBaoCP/VanBan/2025/7/45617/57815-1-2025985-98668-2025-tt-btc.pdf`
  — fetched directly, **HTTP 200**, 583,707 bytes, genuine `%PDF-1.4`
  header, **sha256:** `0f660eed7202ad23d398342b2e151691e4d14df87ea644278ccee965e45c527c`,
  50 pages. Printed masthead: "CÔNG BÁO/Số 985 + 986/Ngày 27-7-2025."
- The other three parts
  (`57818-1-2025987-98868-2025-tt-btc.pdf`, `57821-1-2025989-99068-2025-tt-btc.pdf`,
  `57824-1-2025991-99268-2025-tt-btc.pdf`) were also fetched (HTTP 200 each,
  734,059 / 739,052 / 532,770 bytes, all genuine `%PDF-1.4`) to confirm Part 1
  contains the complete Mẫu số 2 template rather than a truncated excerpt;
  Part 1's own page 29 (Công báo page 75) ends with "(Xem tiếp Công báo số
  987 + 988)" immediately after Mẫu số 2's own closing signature block and
  before Mẫu số 3 begins on the very next page — confirming Mẫu số 2 is
  captured in full within Part 1 alone.

### Extraction method

`pdfjs-dist` (`legacy/build/pdf.mjs`, reused from a prior cycle's cached
`node_modules`) was used to extract each page's `getTextContent()` in
reading order. A keyword scan for "Mẫu số 02" / "một thành viên" across all
four parts located the form: the Table of Contents (Part 1, p.3, Công báo
p.49) lists "Mẫu số 2 — Giấy đề nghị đăng ký doanh nghiệp - Công ty trách
nhiệm hữu hạn một thành viên," and the form's own full text was found on
Part 1, pages 18-29 (Công báo pages 64-75), immediately preceded by Mẫu số 1
(sole proprietorship, ending p.17/Công báo p.63) and immediately followed by
Mẫu số 3 (multi-member LLC, beginning p.30/Công báo p.76).

## Legal-currency check

Per this cycle's own instructions (Vietnamese forms have twice been caught
stale in this registry: X01→TK01, and the pre-2025-amendment PIT template),
a currency check was run before authoring:

- A web search for "Thông tư 68/2025/TT-BTC sửa đổi thay thế 2026" found no
  amending or superseding circular for Phụ lục I as of 2026-07-12. The only
  "68/2026" result found (Thông tư 68/2026/TT-BTC, on science/technology/
  digital-transformation) is an unrelated circular that merely shares next
  year's sequence number — not a successor to 68/2025/TT-BTC.
- Search results independently confirm Thông tư 68/2025/TT-BTC itself
  **repeals and replaces** Phụ lục I of the short-lived Thông tư
  43/2025/TT-BTC (17/06/2025) — i.e. 68/2025 is already the second iteration
  within its own effective month, and no third iteration has followed.
- A companion decree, Nghị định số 168/2025/NĐ-CP (30/6/2025, effective
  01/7/2025, replacing Nghị định 01/2021/NĐ-CP and Nghị định 122/2020/NĐ-CP),
  governs the underlying registration procedure and dossier composition; its
  effective date matches Thông tư 68/2025/TT-BTC's, and no search result
  surfaced any amendment to it either.
- The form's own printed footnotes cite Nghị định 168/2025/NĐ-CP by number
  throughout (e.g. footnote 3's "khoản 7 Điều 28 Nghị định số 168/2025/NĐ-CP
  ngày 30/6/2025"), confirming the Gazette copy is not merely contemporary
  with but was drafted specifically to align with the current decree.

**Conclusion:** Thông tư 68/2025/TT-BTC, Phụ lục I, Mẫu số 2, is the current,
in-force template as of 2026-07-12. No superseding circular was found.

## Authority naming

Vietnam's mid-2025 government restructuring merged the Ministry of Planning
and Investment (Bộ Kế hoạch và Đầu tư) — which had operated the national
business-registration function via its own Cục Quản lý đăng ký kinh doanh —
into the Ministry of Finance (Bộ Tài chính). A targeted search (not assumed)
found the function is now performed by Bộ Tài chính's own **Cục Phát triển
doanh nghiệp tư nhân và kinh tế tập thể** (Agency for Private Enterprise
Development and Collective Economy), per that agency's own institutional
page (`dangkykinhdoanh.gov.vn/vn/gioi-thieu/216/Cuc-quan-ly-dang-ky-kinh-doanh.aspx`)
and a corroborating professional-advisory summary of Bộ Tài chính's own
`Công văn 7984/BTC-DNTN 2025`. `authority.name` reflects this current name;
`authority.abbreviation` (`DKKD`) and this registry's own
`vn/dangkykinhdoanh/...` id path segment are tied to the unchanged
`dangkykinhdoanh.gov.vn` domain instead — the same convention `vn/gdt`
followed for its own Tổng cục Thuế→Cục Thuế rename.

## Scoping decision: single-member LLC only

Phụ lục I of Thông tư 68/2025/TT-BTC is one 80-template appendix covering
every Vietnamese enterprise-registration scenario. Per this cycle's own
brief, this schema models **only Mẫu số 2** (the single-member LLC
template) and explicitly does not decompose:

- **Mẫu số 1** (sole proprietorship), **Mẫu số 3** (multi-member LLC),
  **Mẫu số 4** (joint-stock company), **Mẫu số 5** (partnership) — sibling
  company-type templates sharing this form's overall shape but each adding
  its own member-list/founding-shareholder-list companion forms (**Mẫu số
  6-9**) that structurally cannot apply to a one-owner company. Confirmed by
  direct comparison: Mẫu số 3's own text (Part 1, pp.30-38) is near-identical
  to Mẫu số 2's except its owner section is replaced by a member list
  reference, matching this registry's expectation.
- **Mẫu số 10** (Danh sách chủ sở hữu hưởng lợi của doanh nghiệp) and
  **Mẫu số 11** (Kê khai thông tin để xác định chủ sở hữu hưởng lợi) — the
  beneficial-owner-detail companion forms Mẫu số 2's own footnote 14
  references by number ("...thì kê khai theo Mẫu số 10 Phụ lục I ban hành
  kèm theo Thông tư này") without reproducing. Disclosed only as a
  conditionally required document (`beneficialOwnerDeclarationForm`), per
  this registry's `vn/gdt` precedent (its own Phụ lục 02-1/BK-QTT-TNCN
  disclosure) for a companion form referenced by number but not reproduced.
- **Household-business-conversion and social-protection-establishment/
  fund-conversion sub-blocks** (each printing roughly 10 further fields:
  predecessor registration certificate number/date/place, predecessor tax
  code, predecessor address, predecessor owner/representative identity and
  legal-document details) — triggered only by the narrow
  `household_business_conversion`/`social_fund_conversion` values of
  `establishmentStatus`. Disclosed only in prose (this schema's own
  `predecessorEntityName`/`predecessorEntityTaxCode` fields cover the common
  denominator across the broader division/spin-off/merger/type-conversion
  paths, but not these two narrower conversion dossiers), matching this
  registry's `it/agenzia-entrate/modello-730` precedent for deferring a
  granular conditional sub-block rather than fully decomposing it.
- **Multiplicity beyond one** for the legal representative(s), the
  organizational owner's authorized representative(s), the director, and
  the chief accountant. The form itself allows repeating each of these
  blocks (footnote 9: "Ghi thông tin của tất cả người đại diện theo pháp
  luật trong trường hợp công ty có nhiều hơn 01 người đại diện theo pháp
  luật"); this v1.0.0 schema models one bounded instance of each, per this
  registry's own bounded-repeating-group convention (no `"type": "array"`
  field exists anywhere in this registry today — confirmed by
  `grep -rn '"type": "array"' registry/`, zero matches).
- **Non-primary business lines.** The source prints an unbounded
  STT/Tên ngành/Mã ngành table; only the row marked "chính" (principal) is
  modelled as its own field (`primaryBusinessLineName`/`Code`).
- **Per-row percentage columns** on the charter-capital-sources table
  (Nguồn vốn điều lệ) and the contributed-assets table (Tài sản góp vốn) —
  only each row's amount is modelled; the source's own percentage column is
  not separately captured, a disclosed simplification for field-count
  economy given this schema's already-large scope.

## Judgment calls

1. **`ownerType` is a synthesized selector field, not itself a printed
   checkbox.** The source prints two alternative fill-in blocks ("a) Đối với
   chủ sở hữu là cá nhân" / "b) Đối với chủ sở hữu là tổ chức") with no
   explicit yes/no indicator distinguishing them; `ownerType` is needed to
   gate which block's `requiredWhen` conditions apply. Disclosed here as a
   judgment call, in the same spirit as `vn/gdt`'s own `declarantRole`
   field (itself keyed off which of two signature blocks is used, though
   that case did have a printed either/or choice).
2. **Personal contact/permanent-residence addresses are collapsed to a
   single free-text field** (`registrantContactAddress`,
   `registrantPermanentResidenceAddress`, `ownerContactAddress`,
   `ownerPermanentResidenceAddress`, `ownerOrgHeadOfficeAddress`,
   `legalRepresentativeAddress`, `legalRepresentativePermanentResidenceAddress`)
   rather than broken into the same four structured sub-fields
   (street/ward/province/country) the source prints. `headOfficeAddressStreet`/
   `WardOrCommune`/`Province` — the company's own single most important
   registered address — is kept fully structured instead. This asymmetry is
   a disclosed field-count-economy decision: this form prints five distinct
   address blocks (registrant, owner-individual, owner-organization, legal
   representative, head office), and fully structuring all five would have
   added roughly 12 more near-duplicate fields without adding structural
   insight beyond what the head-office address already demonstrates.
3. **The three "no personal ID number" fallback blocks** (for the
   registrant, the individual owner, and the legal representative — each
   printed near-verbatim on the source at pp.64, 68-69, and 72 respectively)
   are modelled as optional fields with no `requiredWhen` gate, rather than
   invented negation logic against the corresponding `*PersonalIdNumber`/
   `*IdNumber` field. The Condition grammar (`spec/v0.3/govschema.schema.json`
   `$defs/conditionLeaf`) has no "field is absent" operator, and this
   registry's own `notEquals`-empty-string-absent-field-bug precedent warns
   against faking one with `notEquals: ""` against a field that could
   legitimately be empty. Since each of `registrantPersonalIdNumber`,
   `ownerPersonalIdNumber` (when `ownerType` is `individual`), and
   `legalRepresentativeIdNumber` is itself modelled as required (or
   `requiredWhen`-required) in this schema, the fallback block's own
   triggering condition ("no personal ID number") never actually arises
   under this schema's own mainline modelling — so leaving it optional and
   undisclosed-by-gate, rather than fabricating a rule, is the more honest
   choice. The two `documents[]` entries that reference this same condition
   (`legalDocumentCopies`, `investmentRegistrationCertificateCopy`) were
   likewise de-conditioned for the same reason after an initial draft
   incorrectly used `notEquals: ""` against `registrantPersonalIdNumber`
   (a static-required field, making the condition trivially always-true —
   caught and fixed before this document was finalized) and against
   `ownerInvestmentCertificateProjectCode` (a genuinely optional field,
   which would have reproduced the exact bug this registry's own memory
   warns about). See the `documents[]` entries themselves for the corrected
   prose-only disclosure.
4. **`authorizedRepresentativeDelegatedCapitalAmount`/`Percentage` are kept
   as genuine fields, not collapsed away**, despite belonging to a table the
   source allows to repeat across multiple authorized representatives, because
   for a single-member LLC with exactly one bounded representative instance
   (this schema's own scope) the percentage is always 100 and the amount
   always equals `charterCapitalAmount` — a fact worth keeping visible in the
   modelled data rather than only in prose, following `vn/gdt`'s own
   convention of not fabricating a derived-value constraint the source
   itself does not print as a checkable arithmetic instruction, while still
   surfacing the value.
5. **`fiscalYearStart`/`fiscalYearEnd` use a `DD/MM` string pattern**, not a
   `date` type, since the source's own chỉ tiêu 10.6 prints only a
   recurring day/month pair with no year ("Áp dụng từ ngày...../.....
   đến ngày...../....."), consistent with a fiscal year that recurs
   annually rather than pinning a single calendar year.
6. **Money fields use `type: "number"` with only a `minimum: 0`
   constraint**, matching `it/agenzia-entrate/modello-730`'s and `vn/gdt`'s
   own convention of modelling a currency amount as one decimal number.
7. **`predecessorEntityTaxCode` uses the same
   `^[0-9]{10}(-[0-9]{3})?$` pattern** as this registry's other Vietnamese
   tax-code fields, but `ownerOrgRegistrationNumber` is left as free text
   (`maxLength` only), since the source itself prints it as "Mã số doanh
   nghiệp/**Số Quyết định thành lập**" — an establishment-decision number is
   not guaranteed to follow the 10-digit tax-code format.

## Conformance test run

Two mock valid scenarios were built from this schema's own field inventory
and checked with a purpose-written script (`validate_instance.mjs`, following
this registry's own established pattern from `vn/gdt`'s and other prior
cycles' verification records: compiles `schema.json`'s `fields[]` into a
JSON Schema draft 2020-12 document checked with `ajv` (`ajv/dist/2020.js`,
since this sandbox's cached `ajv@8.20.0` requires the explicit 2020-12
entry point rather than the package's default export), plus a from-scratch
evaluator for the shared Condition grammar that checks both `fields[].requiredWhen`
and every `documents[]` entry's static `required`/`requiredWhen` status
against a `documents: [{id, provided}]` array — checking `documents[]`
requiredness explicitly, per this registry's own conformance-checker
documents-blind-spot postmortem):

```
$ node validate_instance.mjs schema.json individual-owner-new-establishment.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS

$ node validate_instance.mjs schema.json organization-owner-type-conversion-with-beneficial-owner.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
OVERALL: PASS
```

The two scenarios deliberately exercise different branches: the first is an
individual owner registering a brand-new single-member LLC (VAT method and
social-insurance method both required, per `establishmentStatus ==
new_establishment`); the second is an organization owner registering via a
type-conversion from a pre-existing multi-member LLC, with an authorized
representative, a Members'-Council-vs-Company-President choice
(`company_president`), a beneficial-owner declaration, and neither VAT
method nor social-insurance method populated (both correctly inapplicable
under this schema's own `requiredWhen` gates for a type-conversion
establishment).

**Mutation controls** — four negative fixtures, each independently
targeting one distinct validation rule and producing exactly one error:

```
$ # mutation-control-missing-required-field.json: 'companyName' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'companyName'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-personal-id-pattern-violation.json: 'registrantPersonalIdNumber' set to 'ABC12'
Static (required/type/pattern/enum) validation: FAIL
 - /registrantPersonalIdNumber must match pattern "^[0-9]{12}$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-type-conversion-reason.json: establishmentStatus is
$ # 'type_conversion' but 'typeConversionReason' (requiredWhen establishmentStatus equals
$ # type_conversion) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'typeConversionReason' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-missing-beneficial-owner-document.json: 'hasBeneficialOwner' set to true
$ # but documents[] does not include a provided 'beneficialOwnerDeclarationForm' entry
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'beneficialOwnerDeclarationForm' is required (requiredWhen matched) but not provided
OVERALL: FAIL
```

The last two mutations specifically exercise `fields[].requiredWhen` and
`documents[].requiredWhen` respectively (as opposed to the plain static-
`required`/pattern cases in the first two) — a validator that only checks
static `required: true` fields/`type`/`pattern` and ignores conditional
`requiredWhen` rules, or that ignores `documents[]` entirely, would
incorrectly accept these two fixtures.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien/1.0.0/schema.json
ok   registry/vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien/1.0.0/schema.json
ok   registry/vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (370/370, then 371/371 after this
document was added) also passed clean, and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Field/document counts

- **126 `fields[]`**, spanning: filing header (3), registrant identity (13),
  establishment status (4), company name (3), head office (14), business
  lines (2), owner — individual and organization paths, authorized
  representative, organization model (35), charter capital/sources/
  contributed assets (16), legal representative (14), tax registration
  (19), social insurance (1), beneficial-owner declaration + closing
  signature (2).
- **7 `documents[]`**: `companyCharter` (always required), `legalDocumentCopies`
  and `investmentRegistrationCertificateCopy` (disclosed in prose, not
  gated), `authorizedRepresentativeAppointmentDocument` (requiredWhen
  `ownerType` is `organization`), `beneficialOwnerDeclarationForm`
  (requiredWhen `hasBeneficialOwner` is `true`), `socialGoalCommitment`
  (requiredWhen `socialEnterprise` is `true`), and `signatureDeclaration`
  (attestation, always required).

## Vietnam's remaining verticals

Vietnam now stands at **3 of 6 verticals** (Passport, Taxes, Business
Formation). DMV and Visa remain open, unscreened-or-weak backlog candidates
from the GOV-2404 cycle. National ID was confirmed a dead end in the
GOV-2411 cycle (in-person/biometric CCCD issuance only, no downloadable
form) and remains closed to future scouting absent a new lead.
