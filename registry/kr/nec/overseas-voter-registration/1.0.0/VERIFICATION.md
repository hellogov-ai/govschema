# Verification record — `kr/nec/overseas-voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field in this schema was read directly from the text layer of the
official combined form PDF, and cross-checked against **two** official
filled-in examples covering both of the form's two filing pathways. It
remains `draft`, not `verified`, because a live NEC intake/portal walkthrough
and a second independent reviewer's field-by-field pass have not yet
occurred — see "What is NOT yet independently verified" below.

## Access notes

- All three source PDFs were retrieved directly from the National Election
  Commission's dedicated Overseas Election board
  (`ok.nec.go.kr/site/abroad/ex/bbs/View.do?cbIdx=1196&bcIdx=13837`), HTTP
  200, no login required:
  - `(통합)국외부재자신고서 및 재외선거인등록신청서.pdf` — the blank combined
    form, `[별지 제59호의4서식]`.
  - `국외부재자신고서_작성 예시.pdf` — an official filled-in example for the
    **국외부재자신고서** (overseas absentee notification) pathway, filer
    "홍길동 / HONG GIL-DONG" (Korea's standard specimen-form placeholder
    name, equivalent to "John Doe").
  - `재외선거인등록신청서_작성 예시.pdf` — an official filled-in example for
    the **재외선거인 등록신청서** (overseas voter registration) pathway,
    filer "홍길순 / HONG GIL-SOON" (the standard female specimen name).
- All three are genuine text-layer PDFs (not scanned images); every field,
  checkbox, and instructional note in this schema's `sourceRef` values was
  read from that text layer directly (Claude PDF vision over the extracted
  pages), not inferred from a summary.
- This is a rarer and higher-fidelity sourcing situation than most
  GovSchema candidates: the authority publishes **two** official worked
  examples, one per filing pathway, rather than the more common single
  blank-form-only source. The closest existing registry precedent for this
  "form + official filled-in example" pattern is
  `nz/dia/passport-application-first-adult` (GOV-1051); this document is the
  first in the registry to have **two** distinct official worked examples,
  letting both of the form's branches (`applicantCategory = resident_
  registered` vs. `never_registered`) be verified against real transcribed
  values rather than one branch being purely inferred from the blank form's
  own instructional text.
- The `registration_cancelled` branch (resident registration cancelled after
  moving abroad) has **no** official worked example on this page — neither
  filled-in specimen PDF uses that checkbox. Its fields
  (`cancelledResidentRegistrationNumber`, `lastKoreanAddress`) are modelled
  directly from the blank form's own field labels and its 작성요령
  (item 3), which are unambiguous and structurally identical in shape to the
  `resident_registered` branch's `residentRegistrationNumber`/
  `residentRegisteredAddress` pair (same field types, same
  주민등록번호-format pattern) — a much lower sourcing-fidelity gap than an
  entirely-unexampled field would be. `conformance/`'s third fixture (the
  `registration_cancelled` scenario) is therefore synthetic, not
  transcribed, and is explicitly labelled as such in `application-packet.
  json`'s sibling fixture file used for the mock-data conformance run below.
- The NEC's authoritative English-language "Overseas Election" summary page
  was not separately fetched in this cycle; the authority name/URL/process
  context was sourced from the Korean-language `ok.nec.go.kr` portal itself,
  consistent with `kr/mofa`/`kr/koroad`'s established `jurisdiction.
  country=KR` sourcing convention for this registry.

## Sources examined

- **Document `(id, version)`:** `kr/nec/overseas-voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** National Election Commission (중앙선거관리위원회, NEC), an
  independent constitutional body under Article 114 of the Constitution of
  the Republic of Korea
- **Primary source (directly retrieved, HTTP 200, text layer read in full):**
  <https://ok.nec.go.kr/common/board/Download.do?bcIdx=13837&cbIdx=1196&streFileNm=BBS_202001090915448472.pdf>
  — `[별지 제59호의4서식]` 국외부재자신고서 및 재외선거인등록신청서 (통합)
- **Corroborating sources (directly retrieved, both official filled-in
  examples, text layer read in full):**
  - <https://ok.nec.go.kr/common/board/Download.do?bcIdx=13837&cbIdx=1196&streFileNm=BBS_202001090915345860.pdf>
    (국외부재자신고서_작성 예시.pdf)
  - <https://ok.nec.go.kr/common/board/Download.do?bcIdx=13837&cbIdx=1196&streFileNm=BBS_202001090915575643.pdf>
    (재외선거인등록신청서_작성 예시.pdf)
- **Listing/index page:**
  <https://ok.nec.go.kr/site/abroad/ex/bbs/View.do?cbIdx=1196&bcIdx=13837>
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Top checkbox pair (국외부재자신고서 / 재외선거인등록신청서) + '신분에 따른 구분' status group | `applicantCategory` |
| 성명 (한글/영문 대문자), 여권번호 | `koreanName`, `englishName`, `passportNumber` |
| '주민등록이 있는 사람' row (주민등록번호, 주소) | `residentRegistrationNumber`, `residentRegisteredAddress` |
| '주민등록이 말소된 사람' row (말소된 주민등록번호, 대한민국 최종주소지) | `cancelledResidentRegistrationNumber`, `lastKoreanAddress` |
| '처음부터 주민등록이 없었던 사람' row (생년월일, 성별, 등록기준지, 부모 성명) | `dateOfBirth`, `gender`, `registrationBaseAddress`, `fatherName`, `motherName` |
| '연락처' block (전화번호, 휴대전화번호, 전자우편) | `phoneNumber`, `mobilePhoneNumber`, `email` |
| '국외거소' block (거류국명, 우편번호, 주소, 공관을 거소로 신고할 사람) | `countryOfResidence`, `postalCode`, `overseasResidenceAddress`, `wantsEmbassyAsResidence` |
| '투표예정공관' | `plannedVotingEmbassy` |
| '외국국적 보유여부' block (예/아니오, 국적보유 국가명, 취득사유, 기타) | `hasForeignNationality`, `foreignNationalityCountry`, `foreignNationalityAcquisitionReason`, `foreignNationalityAcquisitionReasonOther` |
| Declaration paragraph ('본인은 「국적법」에 따른...') | `nationalityAndPersonalInfoConsent` |
| Submission date line | `declarationDate` |

Office-assigned fields (접수번호/접수일자/접수자 receipt fields) were
deliberately excluded, consistent with prior GovSchema precedent of modeling
only applicant-facing fields (e.g. `kr/koroad/driving-licence-application`).
The routing line at the form's foot (addressed to either "중앙선거관리위원회
귀중" or "○○구·시·군의 장 귀하" depending on where the notification/
application is filed) is administrative routing, not an applicant-supplied
field, and is not modelled.

## Mock-data conformance run

A from-scratch GSP-0013 condition evaluator (`requiredWhen`/`visibleWhen`,
supporting `equals`/`notEquals`/`in`/`greaterThan(OrEqual)`/`lessThan(OrEqual)`
plus `all`/`any`/`not` composition) was written against this schema and run
over four fixtures, mirroring the technique used for the ZA SARS ITR14
Annexures (GOV-1268/1275/1282):

1. **`valid_resident_registered`** — the exact field values transcribed from
   the official 국외부재자신고서 filled-in example (홍길동). 0 missing/invalid
   fields, 0 unexpectedly-present hidden fields.
2. **`valid_never_registered`** — the exact field values transcribed from
   the official 재외선거인등록신청서 filled-in example (홍길순). 0
   missing/invalid fields, 0 unexpectedly-present hidden fields.
3. **`valid_registration_cancelled`** — a synthetic filing (no official
   example exists for this branch) exercising the third `applicantCategory`
   value. 0 missing/invalid fields, 0 unexpectedly-present hidden fields.
4. **`invalid_missing_conditional_fields`** — a deliberately broken
   `resident_registered` filing omitting `residentRegistrationNumber` and
   `residentRegisteredAddress`. The evaluator correctly flagged both as
   missing required fields, confirming the `requiredWhen` gates evaluate as
   intended rather than passing vacuously.

All three valid fixtures also passed the repo's structural validator
(`tools/validate.mjs`) and full JSON Schema draft 2020-12 meta-schema
validator (`tools/validate-ajv.mjs`) for the schema document itself.
`conformance/kr/nec/overseas-voter-registration/1.0.0/application-packet.
json`/`.txt` publish fixture 1 (the `resident_registered` scenario) as the
committed demoable packet, per this registry's `application-packet.json`
convention (GSP-0016).

## What is NOT yet independently verified

- A live NEC intake walkthrough (in person at a diplomatic mission, or via
  the internet-based `ova.nec.go.kr` registration/notification system) has
  not been performed; this document is sourced entirely from the gazetted
  form and its two official worked examples.
- The `registration_cancelled` branch's two fields have no official
  filled-in example to check against (see "Access notes" above) — modelled
  directly from the blank form's own field labels and 작성요령 instead.
- Whether `phoneNumber`/`mobilePhoneNumber`/`email` are mandatory in
  practice at intake — the form marks the box requiring entry "inside the
  dotted line" but carries no asterisk distinguishing these from the
  unambiguously required identity/residence fields, so this document
  conservatively models them as optional, consistent with
  `kr/koroad/driving-licence-application`'s precedent for the same kind of
  undesignated contact field.
- The "at least one of `fatherName`/`motherName`" constraint (작성요령 item
  4) is documented in both fields' `description` but not machine-enforced —
  GSP-0013's `requiredWhen` grammar has no "at least one of" (OR-presence)
  shape today; see each field's description for the exact constraint.
- Whether `postalCode` is truly optional for every destination country, or
  whether NEC treats its absence differently depending on the destination
  country's own postal-code system.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live NEC
intake channel (a diplomatic mission or the `ova.nec.go.kr` online system) or
an authoritative NEC-published field-level checklist; resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5); and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
