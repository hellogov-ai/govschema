# Verification record — `kr/nts/corporation-establishment-and-business-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

## Why this document exists

This cycle (GOV-1483, `GovSchema Standard Research`) began with the task
brief's own phased instructions: catalog the registry, then find a missing
government process to model. Phase 1 (catalog) confirmed 238 schemas across
17 jurisdictions (per `tools/govschema-client/registry-index.json`) and,
cross-referencing `CATALOG.md`'s own per-vertical tables, found the task
brief's explicitly-named "remaining voter registration" gap resolves to two
jurisdictions: Brazil and Mexico (every other jurisdiction with a
functioning democracy already has a voter-registration schema; Singapore's
absence is a confirmed non-gap, GOV-1075).

**Brazil's Título Net (TSE Autoatendimento Eleitoral) was screened first**
and found to be a genuine, fully-online first-time voter registration
(alistamento eleitoral) system — confirmed via a live, unauthenticated
Playwright walk of `tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral`.
That walk surfaced a blocking modal: *"O atendimento remoto via Título Net
está bloqueado entre os dias 07/05/2026 e 02/11/2026, conforme prevê a norma
eleitoral vigente."* A web search confirmed this is not a transient outage
but a nationwide, legally-mandated closure of Brazil's entire electoral
register (`Cadastro Eleitoral`) — both the online self-service system and
every in-person Electoral Justice unit — under art. 91 of the Lei das
Eleições (Lei no. 9.504/1997), which bars any registration/transfer request
within 150 days of an election. Brazil holds municipal elections in October
2026, so the register closed 2026-05-07 and reopens 2026-11-03 (confirmed
via TSE's own news notices, e.g. "Eleitor em Dia: cadastro eleitoral ficará
fechado até 3 de novembro"). A Wayback Machine snapshot from just before the
closure (2026-04-17) was also tried, in case the archived Angular SPA shell
would render the wizard statically; it did not — the app's menu/wizard tiles
depend on a live backend call the archive does not proxy, leaving only the
outer page chrome visible. **This is a hard, dated, well-sourced block, not
a dead end**: left as a strong backlog candidate for any research cycle on
or after 2026-11-03.

**Brazil's DMV vertical** (its other standing open gap, vehicle
registration/RENAVAM) was screened as a fallback candidate. São Paulo's
DETRAN-SP `e-crvsp.sp.gov.br` portal (the strongest state-level candidate
found, given the `br/sp/jucesp` precedent for using a state agency when the
process it feeds is state-administered) redirects immediately to a gov.br
SSO login (`/gever/SGU/login.do?method=iniciarLogin`) with no field-level
content visible pre-authentication — the same wall that already made
`br/cnh` (driving licence) a confirmed dead end in GOV-1400. Not pursued
further this cycle.

**This cycle pivoted to South Korea's Business Formation gap** — the one
remaining vertical KR lacked (Passport, DMV, Visa, National ID, and Taxes
were already closed by prior cycles: `kr/mofa`, `kr/koroad`/`kr/molit`,
`kr/moj`, `kr/nec`/`kr/mois`, `kr/nts` respectively). A search for Korea's
own gazetted corporation/business registration form (mirroring the sourcing
shape already proven for `kr/koroad/driving-licence-application`, a
gazetted Road Traffic Act form via `law.go.kr`) found "법인설립신고 및
사업자등록신청서" (Corporation Establishment Report and Business
Registration Application), Attached Form No. 73 of the Enforcement Rule of
the Corporate Tax Act — directly downloadable from `law.go.kr`, no
login/CAPTCHA/WAF. This closes South Korea's Business Formation gap,
bringing KR to 6/6 verticals.

## Source examined

- **Document `(id, version)`:** `kr/nts/corporation-establishment-and-business-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** National Tax Service (NTS), Republic of Korea (the form is
  filed with, and gazetted for use by, the local District Tax Office under
  NTS, even though its parent statute — the Corporate Tax Act — is a
  Ministry of Economy and Finance-administered law; this mirrors the
  existing registry convention used for `kr/nts/year-end-tax-settlement-income-deduction-report`,
  also an NTS-administered Enforcement Rule form).
- **Primary source:** `https://www.law.go.kr/LSW/flDownload.do?flSeq=153980319&bylClsCd=110202`
  — 법인세법 시행규칙 [별지 제73호서식] <개정 2025. 3. 21.>, a 2-page PDF,
  86,153 bytes, HTTP 200, fetched directly with no redirect or bot
  mitigation. A `law.go.kr` search also surfaced two older editions
  (amended 2023-03-20 and 2014-10-31) and the form's own listing page at
  National Law Information Center — the 2025-03-21 edition is the current
  one and is the one this document models.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the form PDF directly via `curl` (HTTP 200, `Content-Disposition:
   attachment`, no login/CAPTCHA/WAF encountered).
2. Confirmed the PDF carries no `/AcroForm`/`/Widget`/`/Annots` — it is a
   flat, non-interactive gazetted form, like most other law.go.kr sources
   in this registry.
3. Extracted the PDF's text layer with `pdfjs-dist` (pinned to `3.11.174`)
   via `getTextContent`, position-sorted (y descending, then x ascending)
   to approximate reading order across the form's dense multi-column tables.
4. Cross-checked the extracted text against both pages rendered to PNG at
   3x scale via `pdfjs-dist`'s page-rendering API (`canvas`/node-canvas
   backend) to visually confirm every checkbox grouping — most importantly
   the dense §2 "법인성격" (Corporation Character) matrix, whose reading
   order the text extraction alone left ambiguous (a 10-cell classification
   spanning 내국법인/외국법인 sub-groups), and the §5 사업장현황 table's
   column pairing (자가/타가 area boxes, 임대차 계약 기간 date-blank
   layout, 공동대표/각자대표 blank-parenthesis pair).

## What was confirmed directly (verbatim, from the form's own text/layout)

- The form's dual identity as both a corporation-establishment report and a
  business-registration application, and its third, foreign-corporation-only
  pathway ("국내사업장설치신고서(외국법인)"), from the form's own two-line
  title checkbox header.
- The full ten-option "법인성격" classification (내국법인: 영리일반/영리
  외투/신탁재산/비영리/국가·지방자치단체/법인으로 보는 단체(승인법인/기타);
  외국법인: 지점(국내사업장)/연락사무소/기타), confirmed both from the
  extracted text and the rendered two-tier table layout.
- That Section 3 ("법인과세 신탁재산의 수탁자") is explicitly captioned
  "법인과세 신탁재산의 설립에 한함" (applicable only to the establishment of
  corporate-taxed trust property) and Section 4 ("외국법인 내용 및 관리책임
  자") is explicitly captioned "외국법인에 한함" (foreign corporations only)
  — both directly-confirmed scope boundaries, not inferences.
- The 11-item Documentary Requirements list (p.2), including which items are
  conditioned on corporation type ("외국법인만 해당합니다"), on premises
  status ("사업장을 임차하거나 전차한 경우에만 첨부합니다"), or on a specific
  election ("사업자단위과세 적용을 신청한 경우만 해당합니다").
- The declaration text and its four cited statutory provisions (Corporate
  Tax Act art. 75-12(3)/109/111, its Enforcement Decree arts. 152-154, its
  Enforcement Rule art. 82(7)(11), and the Commercial Building Lease
  Protection Act art. 5(2)), modelled as the boolean `declarationAccepted`
  field.
- The three-way `신청 구분` (Application Type) radio group and its
  conditional free-text `확정일자 번호` (Fixed Date Number) sub-field,
  modelled as `applicationType`/`fixedDateNumber` with a `requiredWhen`.

## Interpretive judgment calls flagged for an independent reviewer

1. **Scoped to a domestic, for-profit, general corporation.** `corporationType`
   is modelled as a 10-value enum for structural completeness (mirroring
   this registry's established pattern, e.g. `ph/bir/tin-application-corporations-partnerships`'s
   `registeringOfficeType`), but only the `domestic_general_for_profit`
   pathway is exercised end-to-end. Selecting `domestic_trust_property`
   implies Section 3 (trustee identity) applies; selecting any `foreign_*`
   value implies Section 4 (foreign-corporation content/manager-in-charge)
   applies — neither section's own fields are modelled in `fields[]` for
   this v1.0.0.
2. **Section 3 (corporate-taxed trust property trustee) is entirely out of
   scope**, gated behind the informational `corporateTaxedTrustPropertyApplicable`
   boolean. This is a narrow sub-population (trust-property corporations
   specifically, not ordinary corporate trusts) and modelling its own
   four-field trustee-identity block would not serve the base registration
   pathway most registrants use.
3. **Section 4 (foreign-corporation content and manager-in-charge) is
   entirely out of scope**, gated behind the `corporationType` enum's
   `foreign_*` values. A foreign corporation reporting a domestic place of
   business is a materially different sub-population (it does not hold a
   Korean court-registered Corporation Registration Number the way a
   domestic corporation does) from this v1.0.0's baseline domestic-corporation
   scope.
4. **Public-interest-corporation sub-fields (사업유형/business type,
   주무부처명/supervising ministry, 출연자산여부/contributed-assets flag)
   are out of scope**, collapsed to the single `publicInterestCorporationApplicable`
   boolean. These three sub-fields apply only when that boolean is true, a
   narrow sub-population, consistent with this registry's convention of
   scoping out narrow conditional sub-blocks (e.g. the PH schema's Items
   25-26 incentive-details exclusion).
5. **Division-established-corporation fields (분할신설법인: 본점 사업자
   등록번호/분할 전 사업자등록번호/분할연월일) are out of scope entirely** —
   not modelled even as a gated boolean, since this is a narrow corporate-
   reorganization scenario distinct from a first-time registration.
6. **Foreign-invested-corporation nationality/investment-ratio (외국·외투
   법인: 국적/투자비율) are out of scope**, consistent with judgment calls 1
   and 3 (the foreign-corporation content this pair of fields belongs to is
   already excluded).
7. **`representationType` (공동대표( )/각자대표( )) is modelled as a single
   enum choice, not two counts.** The form prints an empty pair of
   parentheses after each label without further captioning whether the
   blank is meant for a representative headcount or a checkmark; rather
   than guess a numeric interpretation, this is modelled as a binary
   enum with the ambiguity disclosed in the field's own description.
8. **`additionalRepresentativeName`/`additionalRepresentativeResidentRegistrationNumber`/`additionalRepresentativeRole`
   (대표자 현황) are bounded to a single additional representative**, though
   the form's own table shows two side-by-side representative columns
   (implying more may be listed on an attached sheet for larger boards) —
   following this registry's established convention for repeating
   structures pending GSP-0009 (composite/repeating values; e.g. the PH
   schema's own `stockholderName`/`stockholderTin` scope cut).
9. **`fiscalYearStart`/`fiscalYearEnd` are modelled as `MM-DD` strings, not
   `date` values.** The form's own "사업연도 월 일 〜 월 일" row has no year
   component (a fiscal year recurs annually), so a full ISO date would
   assert information the source form does not collect.
10. **`businessAddress` is modelled as a single string**, not decomposed
    into the jurisdiction-specific components some other national schemas
    use (e.g. the PH schema's ten-component address block), since the KR
    form itself presents this as one open write-in line (plus separate
    `층`/`호` floor and unit boxes, modelled as their own fields).
11. **No format regex is asserted for `businessPhoneNumber`, `mobilePhoneNumber`,
    `landlordPhoneNumber`, `agentPhoneNumber`, `mainBusinessCode`, or
    `secondaryBusinessCode`**, since the form itself prints no canonical
    format string for any of these (unlike the Resident/Corporation
    Registration Number fields, which the form's own layout shows split by
    a literal hyphen into a 6-digit and 7-digit box group).
12. **PII/sensitive-PII/financial `classification` hints** follow this
    registry's established convention: personal names, addresses, and
    contact details are tagged `pii`; Resident Registration Numbers
    (individual, government-issued) are tagged `sensitive-pii`; monetary
    figures (`capitalAmount`, lease amounts, the financial-position block)
    are tagged `financial`. `corporationRegistrationNumber` and
    `closureBusinessRegistrationNumber`/`landlordBusinessRegistrationNumber`
    are left unclassified, since they identify a legal entity rather than
    a natural person, consistent with this registry's practice of reserving
    `pii`/`sensitive-pii` for natural-person data.

## What is out of scope for v1.0.0

- **Section 3, corporate-taxed trust property trustee** — judgment call 2.
- **Section 4, foreign-corporation content and manager-in-charge** —
  judgment call 3.
- **Public-interest-corporation business type / supervising ministry /
  contributed-assets sub-fields** — judgment call 4.
- **Division-established-corporation registration numbers and date** —
  judgment call 5.
- **Foreign-invested-corporation nationality and investment ratio** —
  judgment call 6.
- **Additional representatives beyond one, and additional secondary
  business types/items beyond one** — pending GSP-0009. See judgment call 8.
- **NTS's Hometax online filing portal (`hometax.go.kr`)**, which also
  accepts this same registration electronically per the form's own header
  note ("홈택스(www.hometax.go.kr)에서도 신고할 수 있습니다") but requires a
  Korean public/financial certificate login; not walked interactively this
  cycle. This document models the gazetted paper/PDF form's own fields, not
  Hometax's live wizard.

## Candidates rejected or deferred this cycle

- **Brazil, National ID & Civic Documents (voter registration, TSE Título
  Net):** confirmed a genuine, real, fully-online first-time-registration
  system, but nationwide-closed 2026-05-07 through 2026-11-03 under Lei no.
  9.504/1997 art. 91's pre-election blackout — see "Why this document
  exists" above for the full citation trail. Not a dead end; reopens
  2026-11-03.
- **Brazil, DMV (RENAVAM/DETRAN vehicle registration):** DETRAN-SP's
  `e-crvsp.sp.gov.br` requires gov.br SSO login on every path tried, no
  field-level content visible pre-authentication — the same wall as the
  already-confirmed `br/cnh` dead end (GOV-1400).
- **Mexico, National ID & Civic Documents (INE voter credential):** not
  re-screened this cycle (already flagged in `CATALOG.md` as
  in-person/biometric-appointment-only); Brazil was screened first per the
  task brief's own listed candidate order and found to have a stronger
  (if temporarily closed) online form, so Mexico was not re-examined.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch the same PDF (`flSeq=153980319`) and confirm no newer
edition has since superseded the 2025-03-21 amendment, (b) obtain a Hometax
test account (certificate-based login) and attempt a live walk of its
online counterpart to resolve judgment call 7 (공동대표/각자대표 blank
interpretation) and confirm whether Hometax's own UI treats any of this
v1.0.0's optional fields as conditionally required, and (c) consider a
follow-up v1.1.0 that models Section 3 or Section 4 in full, or the
additional-representatives/business-types repeating structures, once
GSP-0009 lands.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this is a first-authoring pass sourced from an unusually strong PDF
(genuine text layer, current 2025-03-21 edition, no Wayback detour needed),
but it has no independent second review yet and carries a materially large
number of disclosed scope cuts (12 judgment calls, 5 whole sections/blocks
excluded) — both arguing for the shorter end of the cadence. Re-check the
source, retry Hometax for a test account, and confirm no newer form edition
has been published, on or before that date and on any `source.url` change.
