# Verification record — `kr/mois/resident-registration-card-reissuance` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every field in this schema was read directly from the text layer of the
official two-page form PDF. It remains `draft`, not `verified`, because a
live intake walkthrough at an Eup/Myeon office or Dong community centre and
a second independent reviewer's field-by-field pass have not yet occurred —
see "What is NOT yet independently verified" below.

## Access notes

- The form was retrieved directly from `law.go.kr`'s own form-download
  endpoint (`flDownload.do`), HTTP 200, `Content-Type: application/pdf`, no
  login or CAPTCHA required. The response's `Content-Disposition` header
  confirms the file as `[별지 제32호서식] 주민등록증 재발급신청서(주민등록법
  시행령).pdf`.
- This is a genuine text-layer PDF (not a scanned image): every field,
  checkbox, and instructional note in this schema's `sourceRef` values was
  extracted with `pdfjs-dist` (legacy build, text-content mode, grouped by
  y-coordinate into reading-order lines) and read directly, not inferred
  from a summary or OCR.
- The PDF's own header identifies it as amended `2016. 12. 30.`; a second,
  older `2014. 12. 31.` amendment of the same attached form number was also
  found during search but not used, since the 2016 revision is the current
  version served by `law.go.kr`'s own By-law info page for this form
  (`lsBylInfoPLinkR.do?...&bylNo=0032`).
- No official filled-in worked example (like the two `kr/nec` specimen
  PDFs) was found for this form; the conformance packet below is therefore
  a synthetic fixture built directly from the blank form's own field labels
  and instructional notes, not a transcription of a real filled example.

## Sources examined

- **Document `(id, version)`:** `kr/mois/resident-registration-card-reissuance` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of the Interior and Safety (행정안전부, MOIS),
  which administers the Resident Registration Act (주민등록법); the form is
  filed in practice at the applicant's local 읍ㆍ면사무소 (Eup/Myeon office)
  or 동 주민센터 (Dong community centre), not directly with MOIS.
- **Primary source (directly retrieved, HTTP 200, text layer read in full):**
  <https://www.law.go.kr/flDownload.do?gubun=&flSeq=29752997&bylClsCd=110202>
  — 주민등록법 시행령 [별지 제32호서식] <개정 2016. 12. 30.> 주민등록증재발급신청서
- **By-law listing page:**
  <https://www.law.go.kr/LSW/lsBylInfoPLinkR.do?bylBrNo=00&lsNm=%EC%A3%BC%EB%AF%BC%EB%93%B1%EB%A1%9D%EB%B2%95+%EC%8B%9C%ED%96%89%EB%A0%B9&bylCls=BF&bylNo=0032>
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| 신청인 block (성명(한글), 주민등록번호, 주소 (시ㆍ도/시ㆍ군ㆍ구), 연락처) | `applicantNameKorean`, `applicantResidentRegistrationNumber`, `applicantAddress`, `applicantContact` |
| 재발급 사유 checkbox grid (11 boxes incl. 그 밖의 사유) | `reissueReason`, `reissueReasonOtherText` |
| 첨부서류 item 2 exceptions (가–마: 분실, 영주귀국/재외국민 with prior surrender, 3년/1년 미수령 파기) | `previousIdCardSurrenderedBeforeDeparture`, `previousIdCard` document |
| 주민등록증 발급신청 확인서 [ ] 교부 [ ] 미교부 | `applicationConfirmationIssuance` |
| 주민등록증 수령 방법 (신청 기관 방문/주민등록기관 방문/등기우편) | `receiptMethod` |
| 주민등록증 수령 안내 SMS 서비스 [ ] 신청 [ ] 미신청 | `smsReceiptNotification` |
| 등기우편 수령 주소 block + '주민등록 주소와 같음' + postal-code note | `registeredMailSameAsRegisteredAddress`, `registeredMailPostalCode`, `registeredMailAddress` |
| Main declaration date line (년 월 일) | `applicationDate` |
| 방문 재발급 신청인 block (성명, 주민등록번호, 주소, 연락처) + 첨부서류 item 3 | `isVisitIssuanceForSeverelyDisabled`, `visitReissuanceApplicantName`, `visitReissuanceApplicantResidentRegistrationNumber`, `visitReissuanceApplicantAddress`, `visitReissuanceApplicantContact`, `disabilityProofDocument` document, `visitReissuanceApplicantIdDocument` document |
| Page 2 fee-exemption consent paragraph + 8-category checkbox row + date line | `consentToAdministrativeInfoVerification`, `basicLivingSecurityRecipient`, `personOfIndependenceMerit`, `personOfNationalMerit`, `agentOrangeAftereffectPatient`, `warVeteran`, `may18DemocracyMovementMeritPerson`, `specialMissionPerformer`, `singleParentFamilyProtectionRecipient`, `consentDate` |
| 첨부서류 item 1 (photo spec) | `photo` document |
| Fee column ("수수료 5,000원") + page 2 유의사항 item 7 (fee-charging cases) | `reissuanceFee` document |

Office-assigned fields (접수 번호/접수일, 처리 기간) were deliberately
excluded, consistent with prior GovSchema precedent of modeling only
applicant-facing fields (e.g. `kr/koroad/driving-licence-application`,
`kr/nec/overseas-voter-registration`). The routing line at the form's foot
("읍ㆍ면ㆍ동장 및 출장소장 귀하") is administrative routing, not an
applicant-supplied field, and is not modelled. Signature/seal marks
accompanying both date lines are a physical signing-event detail, not a
data field, and are not modelled — consistent with `kr/moj/visa-application`'s
precedent for the same kind of line.

Two interpretive judgment calls, made explicit here for a future reviewer:

1. **`방문 재발급 신청인` scope.** The form's second name/RRN/address/contact
   block, combined with 첨부서류 item 3's requirement for disability-proof
   material plus the applicant's own ID, is modelled here as the *severely
   disabled applicant's own* confirmation block for a home/counter-visit
   issuance accommodation — not a distinct proxy/representative's block.
   `isVisitIssuanceForSeverelyDisabled` gates it. No source text explicitly
   labels this a "home-visit" service by that name; this is the most
   literal reading of "방문 재발급" (visit reissuance) consistent with item
   3's attachment requirement, but an independent reviewer should confirm
   this against MOIS guidance before promoting to `verified`.
2. **Fee logic granularity.** 유의사항 item 7 narrows the `damaged` and
   `appearanceChange` fee triggers to exclude natural wear and
   disaster/accident causes respectively, and a checked fee-exemption
   category may waive the fee entirely. Neither narrowing is separately
   encoded as its own field — `reissuanceFee`'s `requiredWhen` is
   reason-level only, with both caveats documented in its `sourceRef`. This
   mirrors `sg/ica/identity-card-replacement`'s precedent of not encoding a
   fee amount/condition more precisely than the source form's own checkbox
   structure supports.

## Mock-data conformance run

A from-scratch GSP-0013 condition evaluator (`requiredWhen`/`visibleWhen`,
supporting `equals`/`notEquals`/`in`/`greaterThan(OrEqual)`/`lessThan(OrEqual)`
plus `all`/`any`/`not` composition) was written against this schema and run
over seven fixtures:

1. **Lost card, counter pickup, no fee exemption** — `previousIdCard`
   correctly NOT required (lost is an explicit exception); `reissuanceFee`
   correctly required. 0 violations.
2. **Name change, registered mail to a different address** —
   `previousIdCard` correctly required; `reissuanceFee` correctly NOT
   required (name change is not a fee-triggering reason);
   `registeredMailPostalCode`/`registeredMailAddress` correctly required. 0
   violations.
3. **Permanent return, previous card already surrendered before
   departure** — `previousIdCard` correctly NOT required. 0 violations.
4. **Permanent return, previous card NOT surrendered** —
   `previousIdCard` correctly required. 0 violations.
5. **Home/counter-visit issuance for a severely disabled applicant, with a
   fee-exemption category claimed** — all four visit-applicant fields, both
   visit-specific documents, and the exemption/consent fields correctly
   required and satisfied. 0 violations.
6. **`reissueReason: other` with `reissueReasonOtherText` omitted** — the
   evaluator correctly flagged the missing conditional field (plus the
   correctly-still-required `previousIdCard`, since `other` is not one of
   the old-card exceptions).
7. **`isVisitIssuanceForSeverelyDisabled: true` with the visit block and its
   two documents omitted** — the evaluator correctly flagged all six
   missing required fields/documents.

Fixtures 1–5 also passed the repo's structural validator (`tools/validate.
mjs`) and full JSON Schema draft 2020-12 meta-schema validator (`tools/
validate-ajv.mjs`) for the schema document itself (both run directly against
`schema.json`, which fixtures 1–5 do not modify).
`conformance/kr/mois/resident-registration-card-reissuance/1.0.0/
application-packet.json`/`.txt` publish fixture 1 (the lost-card, counter-
pickup scenario) as the committed demoable packet, per this registry's
`application-packet.json` convention (GSP-0016).

## What is NOT yet independently verified

- A live intake walkthrough at an Eup/Myeon office or Dong community centre
  has not been performed; this document is sourced entirely from the
  gazetted blank form (no official filled-in worked example was found for
  this specific form).
- The `방문 재발급 신청인` scope judgment call (see above) is a reasonable
  but not source-explicit reading and should be confirmed against MOIS's
  own operational guidance before promoting to `verified`.
- The fee-exemption category list's actual waiver effect (whether checking
  a category always fully waives the KRW 5,000 fee, or only waives it
  conditional on the reissue reason) is not stated on the form itself and
  is not machine-enforced here — see "Fee logic granularity" above.
- Whether `applicantContact`/`visitReissuanceApplicantContact` are
  mandatory in practice at intake — the form provides a labelled box but no
  asterisk distinguishing it from the unambiguously required identity
  fields; this document conservatively models it as required, consistent
  with the block's own visual grouping alongside name/RRN/address, but this
  is a judgment call, not a form-marked requirement.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live MOIS
or local-office intake channel, or an authoritative MOIS-published
field-level checklist; resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5); and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
