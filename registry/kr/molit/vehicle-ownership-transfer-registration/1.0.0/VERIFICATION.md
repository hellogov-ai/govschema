# Verification record — `kr/molit/vehicle-ownership-transfer-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-downloaded primary-source PDF**:
the Motor Vehicle Registration Enforcement Rule's own gazetted "Transfer
Registration Application" form, extracted with a genuine text layer (not
OCR), cross-checked against several secondary administrative sources. It
remains `draft`, not `verified`, pending an independent second reviewer's
field-by-field pass and, ideally, a live walkthrough of the Car365 online
channel by a reviewer who holds a Korean digital certificate.

## Why this document exists

This cycle (`GOV-1400`, the recurring `GovSchema Standard Research` routine)
was scoped to close a DMV/vehicle-registration gap in one of the registry's
thinner jurisdictions (AE, BR, MX, KR). South Korea already has Passport,
Visa, Taxes, Voter Registration, National ID (reissuance), and a driving
*licence* schema, but no vehicle *registration* schema at all — this document
opens that gap.

Two candidates were scouted per the cycle's priority order:

- **South Korea vehicle registration via Car365 (car365.go.kr)** — **chosen.**
  The portal's own guidance pages are public and unauthenticated; actual
  online submission requires a Korean digital-certificate/mobile-carrier/
  financial-certificate login, but the underlying application form itself is
  separately published, in full, as a gazetted attachment form on
  law.go.kr — a genuinely public, field-level, primary legal-text source with
  no login wall at all. Of the three plausible sub-processes (new
  registration, change-of-particulars, transfer), transfer registration
  (이전등록) was picked: it is the highest-volume, most-cited vehicle civil
  transaction on every source consulted, has the richest and best-documented
  conditional-attachment logic (five distinct registration-reason branches),
  and multiple independent secondary sources (see below) describe it in
  enough procedural detail to sanity-check the primary form against.
- **Brazil first driving licence (CNH / "primeira habilitação")** —
  **rejected as a dead end.** Every source found describes a process gated
  behind a `gov.br` SSO login from the very first step (downloading the "CNH
  do Brasil" app and filing an initial `Requerimento` through it), followed
  by in-person biometric/medical/psychological exams and a state-fragmented
  DETRAN portal for scheduling (DETRAN-SP, DETRAN-RJ, DETRAN-PE, etc. each
  with their own `gov.br`-authenticated online-services page). No federal,
  unauthenticated, field-level source was found for the RENACH form itself
  (SENATRAN's technical resolutions describe the *card's* security/biometric
  specifications, not the *application* form's fields). Left as a backlog
  candidate only if a future cycle finds a state DETRAN with a genuinely
  public field list (untested this cycle beyond the federal layer).

## Sources examined

- **Document `(id, version)`:** `kr/molit/vehicle-ownership-transfer-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Land, Infrastructure and Transport (MOLIT)
- **Primary source (directly retrieved, HTTP 200, genuine text layer,
  extracted in full with `pdfjs-dist`'s `getTextContent`, not OCR):**
  <https://law.go.kr/LSW/flDownload.do?gubun=&flSeq=137678345&bylClsCd=110202>
  — 자동차등록규칙 [별지 제14호서식] <개정 2018. 12. 19.> 이전등록 신청서
  ("Transfer Registration Application", Attached Form No. 14 of the
  Enforcement Rule on Motor Vehicle Registration), published by the National
  Law Information Center (law.go.kr). Two pages: front (applicant-facing
  fields plus the administrative-information consent block) and back
  (attachment list, fee note, acquisition-tax exemption checkboxes, and
  usage notes including the statutory filing deadlines).
- **Secondary sources, used only to corroborate and to fill two gaps the
  primary form itself does not state (see judgment calls below), never to
  introduce a field not traceable to the primary form or a stated legal
  cross-reference:**
  - <https://www.car365.go.kr/ccpt/cvlcpt/guid/detailGuidance.do?cvlcptCd=4> —
    Car365's own guidance page for this process (channel choice, eligibility
    preconditions, high-level document categories by transaction type).
  - <https://www.car365.go.kr/ccpt/cvlcpt/guid/documentView.do> — Car365's
    downloadable-forms index, confirming this is the form used and listing
    its official Korean title.
  - <https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09006&CappBizCD=15000000370> —
    the Ministry of the Interior and Safety's gov.kr (정부24) civil-service
    listing for this exact process: fee, processing time, application
    channels, and a required-documents summary that includes the vehicle
    registration certificate (자동차등록증) — not found on the primary form
    itself, see judgment calls.
  - <https://www.seongnam.go.kr/city/1000857/10633/contents.do> — Seongnam
    city's vehicle-registration service page: statutory filing deadlines and
    late-filing penalty amounts by registration-reason category (used to
    corroborate, not to source, the deadlines already stated in the primary
    form's own 유의사항 item 3), plus the same 자동차등록증 requirement.
  - <https://www.gangnam.go.kr/board/B_000060/3729/view.do?mid=ID03_010104> —
    Gangnam-gu's service page, itemising seller/buyer document requirements
    by transaction type in plain administrative language (사망, 법원경매,
    법인합병 sub-cases), used to sanity-check that the primary form's five
    registrationReason values are the same taxonomy this and other district
    offices use operationally.
  - <http://www.freeforms.co.kr/view/d4-form100-002989.html> — a private
    forms-directory page (fetch failed with `ECONNREFUSED` this cycle; not
    relied on).
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Located the form via web search cross-referencing car365.go.kr's own
   downloadable-forms listing (which names the form but serves it through a
   JavaScript-driven download action with no static `href` reachable from a
   plain fetch) against law.go.kr's own attached-form archive, which serves
   the same gazetted form directly as a downloadable file at a stable
   `flDownload.do?flSeq=...` URL — no login, CAPTCHA, or JavaScript
   interaction required.
2. Fetched the PDF directly and confirmed it has a genuine embedded text
   layer (not a scanned image) using `pdfjs-dist`'s `getTextContent()` (the
   same technique already used for `kr/mois/resident-registration-card-reissuance`
   and every ZA SARS ITR14 schema in this registry): every field label,
   checkbox option, attachment-list item, fee note, and usage note on both
   pages was extracted and read verbatim in Korean.
3. Cross-read the Car365 guidance page and gov.kr's civil-service listing to
   confirm this is the correct, current, single canonical form for this
   process (both explicitly name and link the same form/process), and to
   surface the vehicle-registration-certificate requirement the primary
   form's own two pages are silent on (see judgment calls).
4. Cross-read the Seongnam, Gangnam-gu, and Jeonju district-office pages to
   confirm the statutory deadlines already stated on the primary form's own
   back page (유의사항 item 3), and to confirm the five registrationReason
   values map onto the same real-world transaction taxonomy (sale, gift,
   court-ordered/judgment transfers, inheritance, other) these operationally
   closer-to-the-counter sources describe independently.
5. Walked the schema's own logic by hand against five illustrative scenarios
   (sale, gift, court-commissioned/auction, inheritance, agent-filed) to
   confirm every `requiredWhen` on `documents[]` produces the correct
   attachment set for that scenario — see Mock-data conformance check below.
   The live Car365 online wizard itself was **not** walked interactively:
   its first meaningful screen past the guidance page requires a Korean
   digital-certificate/mobile-carrier/financial-certificate login this cycle
   had no means to exercise, consistent with `GOVERNANCE.md`'s prohibition on
   submitting or authenticating on anyone's behalf.

## What was confirmed directly (verbatim, from the primary PDF's text layer)

- Every front-page field: 구 소유자(양도인)/신 소유자(양수인) 성명(명칭),
  주민등록번호(법인등록번호), 사용본거지(차고지); 전자우편;
  (휴대)전화번호; 자동차등록번호; 주행거리(km); 신자동차등록번호;
  등록원인 (다섯 개 체크박스: 매매/증여/촉탁/상속/기타); 신청인
  성명/생년월일; and the 행정정보 공동이용 동의서 consent block.
- All six numbered attachment-list items on the back page (자동차양도증명서;
  양도인의 인감증명서/본인서명사실확인서/전자본인서명확인서 발급증, with its
  own three stated exceptions; 증여증서; 매각결정서; 확정판결 등본; 위임장 및
  신분증명서 사본), each item's own stated triggering condition, and the
  fee note (KRW 1,000, or 1,500 when filed outside the vehicle's own
  city/province).
- The four acquisition-tax exemption checkbox categories on the back page
  (disabled person Grade 1-3; national-merit person disability rating Grade
  1-7; May 18 Democracy Movement injured person Grade 1-14; Agent Orange
  after-effects patient) and their legal basis (지방세특례제한법).
- The statutory filing deadlines and legal basis for late-filing penalties
  (유의사항 item 3: sale 15 days from purchase, gift 20 days from receipt,
  inheritance 6 months from the end of the month of death, other 15 days
  from the triggering event; 자동차관리법 제81조제2호, 제85조제1항) —
  recorded in this document's field/document descriptions as prose, since
  GovSchema's v0.3 field/Condition model has no deadline/date-arithmetic
  construct (the same limitation already documented in
  `mx/inm/forma-migratoria-multiple-electronica`'s VERIFICATION.md for its
  180-day-stay rule).
- The email/phone usage note (유의사항 item 4) stating both fields are
  optional and used only for vehicle-management notices such as recalls.

## Interpretive judgment calls flagged for an independent reviewer

1. **`vehicleRegistrationCertificate` is sourced from secondary pages, not
   the primary form.** The primary form's own two pages (front declaration,
   back 제출서류/확인사항 lists) never mention 자동차등록증 as something the
   applicant submits. gov.kr's civil-service listing and the Seongnam/
   Gangnam-gu pages independently list it as a required document (with an
   exception when the transferor, rather than the transferee, is the
   applicant). The most likely explanation is that the certificate is the
   physical document being amended and is presented at the counter as the
   object of the transaction, not enumerated as a supporting "attachment" —
   but this is inference, not something any source states outright. Modelled
   here as `required: true` with the transferor-applies exception described
   in prose rather than gated on a field, since this document has no field
   distinguishing "the transferee is applying" from "the transferor is
   applying" beyond the free-text `applicantName`. A reviewer should
   double-check this against the live Car365 wizard's own document-upload
   step if that ever becomes reachable without a certificate login.
2. **`auctionSaleDecisionDocument` and `certifiedJudgmentCopy`'s mapping onto
   `registrationReason: courtCommission`.** The primary form's attachment
   list states each document's own triggering condition (Article 26(3)
   authority-ordered auction; judgment-based ownership transfer) but never
   explicitly cross-references either condition to one of the five
   `등록원인` checkbox values. `촉탁` (literally "commission" or "official
   request") was chosen as the best-fit mapping for both, since both describe
   an authority formally directing the registration act rather than a
   private-party sale/gift/inheritance — but a reviewer fluent in Korean
   administrative-law usage of `촉탁` in this specific registry context
   should confirm this is the intended reading, rather than, say, `기타`
   (other) being the form's own intended bucket for one or both cases.
3. **`applicationFiledByAgent` is a synthetic gating field, not a form
   checkbox**, introduced only to drive the `agentPowerOfAttorneyAndId`
   document's `requiredWhen`, mirroring the precedent set by
   `mx/inm/forma-migratoria-multiple-electronica`'s `applicantIsMinor` for
   the same class of "the form's own attachment list states a condition with
   no corresponding data field" gap.
4. **`applicantDateOfBirth`'s individual/corporate ambiguity is left
   unresolved**, matching this registry's general practice of describing a
   source's own ambiguity rather than silently resolving it: the primary
   form asks for the applicant's 생년월일 unconditionally, but a corporate
   applicant has no date of birth. No field exists to distinguish an
   individual from a corporate applicant, so this is described in the
   field's own `description` rather than modelled with a fabricated gate.
5. **`registrationFee`'s two-tier amount (KRW 1,000 / 1,500) is only
   partially expressible.** The `documents[].amount` shape is a single fixed
   value in this spec version; the higher, different-city/province amount is
   recorded as descriptive prose instead, the same class of limitation
   `mx/inm/forma-migratoria-multiple-electronica`'s VERIFICATION.md records
   for its own offset-arithmetic date rules.
6. **Downstream acquisition tax and licence-plate fees are out of scope.**
   Seongnam's page states a 4-7% acquisition tax (assessed separately by the
   local tax office, not this form) and a KRW 22,000-34,000 licence-plate
   fee when a new plate is issued; neither is a line item on this
   application form itself, so neither is modelled — consistent with this
   registry's practice of not modelling a separately administered downstream
   fee (the same treatment `br/pf/passport-application` gives its own
   after-the-fact, separately paid fee).
7. **The three stated exceptions to `transferorIdentityVerificationDocument`
   being required** (dealer-brokered sale; court-auction transaction proof
   submitted instead; in-person transferor confirmation at the counter) are
   described in the document's own `description` rather than encoded as a
   `requiredWhen` condition, since none of the three has a corresponding
   field in this document (there is no "is this a dealer-brokered sale?"
   field, for example) — the same treatment given to comparable narrowing
   notes in `kr/mois/resident-registration-card-reissuance`'s `reissuanceFee`
   entry.

## Mock-data conformance check (Phase 4)

A fabricated, non-submitting mock application packet lives at
`conformance/kr/molit/vehicle-ownership-transfer-registration/1.0.0/application-packet.json`
(+ `.txt` rendering): a private used-car sale between two fictitious
individuals in Seongnam, filed by the buyer (transferee) without an agent,
claiming no acquisition-tax exemption. This scenario, plus four documented
variants, were each hand-evaluated against every field's `requiredWhen` and
every `documents[].requiredWhen` to confirm the branch produces the correct
field/document set:

1. **Sale (this packet)** — `vehicleTransferCertificate` and
   `transferorIdentityVerificationDocument` correctly required;
   `giftDeed`/`auctionSaleDecisionDocument`/`certifiedJudgmentCopy`
   correctly not required; `agentPowerOfAttorneyAndId` correctly not
   required (`applicationFiledByAgent: false`).
2. **Gift** — `giftDeed` correctly required; `vehicleTransferCertificate`
   and `transferorIdentityVerificationDocument` correctly not required.
3. **Court-commissioned (auction)** — `auctionSaleDecisionDocument` and
   `certifiedJudgmentCopy` correctly required together (see judgment call 2:
   both share the same `registrationReason` value, so both are required
   whenever it is selected, even though in practice only one would apply to
   a given real case — flagged as an acknowledged over-inclusion following
   from judgment call 2's mapping, rather than silently narrowed further
   without a source basis).
4. **Inheritance** — none of the five reason-specific documents required;
   only the always-required `vehicleRegistrationCertificate` and
   `registrationFee` apply, alongside the base field set.
5. **Agent-filed sale** — `applicationFiledByAgent: true` correctly adds
   `agentPowerOfAttorneyAndId` to the required-document set on top of
   scenario 1's documents.

`vehicleRegistrationCertificate` and `registrationFee` were confirmed
required in all five scenarios (both are unconditional `required: true`
entries). All five scenarios were also checked against `tools/validate.mjs`
and `tools/validate-ajv.mjs` for the schema document itself (structural
validity, not the mock data, which this registry's tooling does not
separately schema-check against `fields`/`documents` — the by-hand
requiredWhen walk above is this cycle's substitute for that).

## What is out of scope for v1.0.0

- **The live Car365 online submission wizard** — login-gated behind a Korean
  digital certificate/mobile-carrier/financial-certificate credential; not
  walked interactively this cycle (see Extraction method step 5).
- **New (first-time) vehicle registration and change-of-particulars
  registration** — both are separate gazetted forms ([별지 제7호서식]/
  [별지 제11호서식] respectively) with their own field sets; only the
  transfer-registration form is modelled here. Left as open backlog
  candidates for a future KR DMV-vertical cycle.
- **Downstream acquisition tax assessment and licence-plate issuance** — see
  judgment call 6.
- **Brazil's "primeira habilitação" (first driving licence)** — scouted this
  cycle and found gov.br-SSO-gated from the first step, with no federal,
  unauthenticated, field-level source; see "Why this document exists" above.
  Left as an open backlog candidate only if a future cycle finds a genuinely
  public state-DETRAN source.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-download the same law.go.kr form (confirming no newer
gazetted revision has superseded [별지 제14호서식]'s 2018-12-19 version),
re-check every `sourceRef` against the extracted text directly, resolve
judgment calls 1 and 2 above ideally by walking the live Car365 wizard with
an authenticated Korean digital certificate to see its own document-upload
step's exact requirement set and registrationReason-to-document mapping, and
confirm the two-tier fee amount and downstream tax/plate-fee figures are
still current.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this is the registry's first Vehicle Registration/DMV-vertical
schema for South Korea and the first schema in this registry sourced
primarily from a gazetted attachment form corroborated by several
independent city/district administrative pages rather than a single
authoritative guide or live wizard, so the shorter end of the cadence is
appropriate until the two flagged judgment calls (documents 1 and 2 above)
are independently confirmed. Re-check the source, and confirm no newer form
revision has been gazetted, on or before that date and on any `source.url`
change.
