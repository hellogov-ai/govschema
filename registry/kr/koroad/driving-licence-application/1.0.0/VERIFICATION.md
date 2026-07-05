# Verification record — `kr/koroad/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field, document, and instructional note was read directly from the text
layer of the official Form 42-2 PDF (a gazetted attachment to the Road Traffic
Act Enforcement Rule). It remains `draft`, not `verified`, because a live
KoROAD test-centre intake walkthrough, and a second independent reviewer's
field-by-field pass, have not yet occurred — see "What is NOT yet
independently verified" below.

## Access notes

- The form was retrieved directly from the National Law Information Center
  (`law.go.kr`), the Korean government's own statutes/forms portal, at
  <https://www.law.go.kr/LSW/flDownload.do?flSeq=129740389&bylClsCd=110202>,
  HTTP 200, no login required. This is the same portal used for
  `kr/mofa/passport-application-first-adult`, so the two schemas share a
  consistent `jurisdiction.country=KR` sourcing convention.
- The returned file (`■ 도로교통법 시행규칙 [별지 제42호의2서식] <개정 2022. 1.
  21.>`) is a genuine text-layer PDF, not a scanned image — every field cited
  in this schema's `sourceRef` values was read from that text layer directly
  (Claude PDF vision over the extracted pages), not inferred from a summary.
- A companion form, Form 42 (`flSeq=152755989`, most recently amended 2024-12-
  20), covers Class 1 Large/Special licences on the same law.go.kr portal; it
  is a distinct document out of scope for this schema (see `description`).
- KOROAD's own English-language site (`koroad.or.kr/eng`,
  `safedriving.or.kr`) was used only to confirm the authority's current
  official English name ("Korea Road Traffic Authority", abbreviated
  KoROAD) and general driving-test-process context; it does not host a
  field-level form download, consistent with the original candidate research
  (GOV-1291).
- A `safedriving.or.kr` fetch found no fee schedule page for the test-
  application fee; this matches the form's own text, which states the fee is
  separately determined and announced by KoROAD with National Police Agency
  Commissioner approval (`도로교통법` 제139조제2항), not fixed on the form. A
  web search surfaced third-party aggregator figures (~10,000 KRW written /
  ~25,000 KRW functional / ~30,000 KRW road test, as cited by non-government
  blogs in 2026) but these were not corroborated against a primary KoROAD fee
  notice, so `applicationFee` is modeled without a fixed `amount`, consistent
  with `za/rtmc/driving-licence-application`'s precedent for a
  separately-gazetted, non-form-stated fee.

## Sources examined

- **Document `(id, version)`:** `kr/koroad/driving-licence-application` /
  `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Korea Road Traffic Authority (한국도로교통공단, KoROAD), a
  quasi-governmental special corporation under the National Police Agency
- **Primary source (directly retrieved, HTTP 200, text layer read in full):**
  <https://www.law.go.kr/LSW/flDownload.do?flSeq=129740389&bylClsCd=110202> —
  도로교통법 시행규칙 별지 제42호의2서식 (개정 2022. 1. 21.), "자동차운전면허시험(제1종보통ㆍ제2종)
  응시원서"
- **Cross-check (directly retrieved):** <https://www.koroad.or.kr/eng> and
  <https://www.safedriving.or.kr/main.do> — official English authority name,
  general test-process context, fee-page absence check
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Front-left, 성명(한글)/국적/주민등록번호/전화번호/주소/전자우편 | `koreanName`, `nationality`, `residentRegistrationNumber`, `phoneNumber`, `address`, `email` |
| Front-left, '운전면허증 발급' 실물/모바일 rows | `licenceCardLanguage`, `wantsMobileLicence`, `mobileLicenceIssuanceMethod` |
| Front-left, 성명(영문) 성/이름 + note restricting it to English-card applicants | `surnameEnglish`, `givenNameEnglish` |
| Front-left, '신청내용' tick-box list | `applicationPurpose` |
| Front-left, '응시면허' / '응시차량' | `licenceClassApplying`, `testVehicleTransmission`, `usesSpeciallyManufacturedOrApprovedVehicle` |
| Front-left, '보유면허' table (제1종 대형/보통/특수, 제2종 보통/소형/원자, 면허번호) | `hasExistingLicence`, `existingLicenceNumber`, `existingClass1Large`, `existingClass1Regular`, `existingClass1Special`, `existingClass2Regular`, `existingClass2Small`, `existingClass2Moped` |
| Front-left, '면허조건' row (10 remaining checkbox items after de-duplicating 자동변속/특수제작ㆍ승인차 against `testVehicleTransmission`/`usesSpeciallyManufacturedOrApprovedVehicle`) | `usesProstheticHand`, `usesProstheticLeg`, `usesHandOperatedBrake`, `usesHandOperatedAccelerator`, `usesHearingAid`, `hasHearingImpairedDriverSign`, `usesConvexMirror`, `usesLeftSideAccelerator`, `usesMultiWheeledMoped`, `otherLicenceConditions` |
| Front-left, submission line and '행정정보 공동이용 동의서' / fingerprint-verification / info-notification consent notes | `declarationDate`, `declarationSignature`, `consentsToAdministrativeInfoSharing`, `consentsToElectronicFingerprintIdentification`, `consentsToLicenceInfoNotifications` |
| Back-right, 질병(疾病)ㆍ신체에 관한 신고서 items 1-9 (mental-health history) | `hasDementiaHistory`, `hasSchizophreniaHistory`, `hasSchizoaffectiveDisorderHistory`, `hasBipolarDisorderHistory`, `hasRecurrentDepressiveDisorderHistory`, `hasIntellectualDisabilityHistory`, `hasEpilepsyHistory`, `hasSubstanceDependencyHistory`, `hasOtherMentalIllnessHistory` |
| Back-right, items 10-12 (vision/colour/hearing) | `hasCentralVisualFieldScotomaOrHemianopia`, `colorPerception`, `hearingLevel` |
| Back-right, body-diagram physical-disability section | `hasPhysicalDisabilityAffectingLimbsOrTorso`, `physicalDisabilityDetails` |
| Back-right, false-declaration penalty note and signature line | `diseaseDeclarationTrueAndAccurate`, `diseaseDeclarationSignature` |
| 신청인 제출서류 (front-left) items 1-5 | `identityDocument`, `applicantPhotographs`, `medicalExaminationResult`, `powerOfAttorneyAndAgentId` |
| Fee note (back-left) | `applicationFee` |

Office-assigned fields (접수번호/접수일자 receipt number/date on both the front
application and the 응시표 exam-ticket side; the blank 필기/기능/도로주행 test-result
score grids; 판정관 의견 examiner's opinion; hospital/physician confirmation
lines) were deliberately excluded, consistent with prior GovSchema precedent
of modeling only applicant-facing fields.

## What is NOT yet independently verified

- A live KoROAD test-centre intake walkthrough (in person or via
  `safedriving.or.kr`'s session-based booking flow) has not been performed;
  this document is sourced entirely from the gazetted form and the
  authority's own English-language informational pages.
- Whether `email`, and each individual contact/consent field, is mandatory in
  practice at intake — the form itself carries no asterisk or other
  required/optional marking distinguishing these from the unambiguously
  required identity/address fields, so this document conservatively models
  only the fields the form's own structure (a plain, unconditional box) makes
  required, and treats undesignated contact/consent items as optional.
- The exact, current **test-application fee** — no single authoritative
  KoROAD fee notice was found during this review (only third-party
  aggregator figures, not cross-checked against a primary source); modeled
  without a fixed `amount`.
- Whether the `면허조건` (licence-condition) checkbox row is applicant-
  self-declared at application time versus confirmed/overridden by the
  examiner after the medical exam — this document models it as applicant
  input, consistent with its position on the applicant-facing side of the
  form, but the final printed licence condition codes may be authoritative
  only once confirmed by KoROAD.
- This document covers the **new licence, Class 1 Regular/Class 2** pathway
  primarily; the `applicationPurpose` values `integration`,
  `aptitude_test_not_taken_or_failed`, `military_licence`, and
  `foreign_licence` appear on the same form but their own distinct document
  requirements are out of scope, per `description`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live
KoROAD test-centre intake or an authoritative KoROAD-published field-level
checklist; resolves any discrepancy by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5); and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-05** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
