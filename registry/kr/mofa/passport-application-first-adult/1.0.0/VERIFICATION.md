# Verification record — `kr/mofa/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

The document was derived from a **directly-read primary source**: the full text
of the official current passport application form (여권 발급 신청서, 별지
제1호서식, amended 2025-10-09), plus the Ministry's own filled-in example of the
same form, both read page by page. It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass.

## Why this document exists

South Korea was not previously modelled in the registry (12 jurisdictions: AU,
CA, DE, FR, GB, IE, IN, NL, NZ, SG, US, ZA). `GOV-1289`'s research cycle
(2026-07-05) scouted three candidate 13th jurisdictions — Brazil, South Korea,
and the UAE — against all six GovSchema verticals, screening specifically for
unauthenticated, field-level sourceable material. South Korea rated strongest
overall: 5 of 6 verticals (Passport, DMV, Visa, Taxes, National ID) have
official, unauthenticated, field-level sources, several with an official
filled-in example. Passport was chosen to author first because its source is
the cleanest of all six: a single official form plus an official filled-in
sample, both freely downloadable with no login.

## Source examined

- **Document `(id, version)`:** `kr/mofa/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Foreign Affairs, Republic of Korea (외교부) — Passport Policy Division
- **Primary source URL:** <https://www.passport.go.kr/home/kor/applicationForm/index.do?menuPos=42> ("신청 서식" / Application Forms page)
- **Official form id:** 여권법 시행규칙 제3조 별지 제1호서식 (Passport Act Enforcement Rule Article 3, Attached Form No. 1), revision dated **2025-10-09** (표시: `<개정 2025. 10. 9.>`)
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

Both the blank current form and its filled-in example are served through
**StreamDocs**, a JavaScript canvas/blob-image document viewer with no static
text layer, no direct PDF URL, and download links wired to an
`onclick="kssFileDownloadForKeyAct('<key>')"` JS handler rather than a plain
`href`. A direct `curl`/`WebFetch` of the viewer page returns only an empty
`"StreamDocs"` shell — this is a new blocker class distinct from the
CAPTCHA/IP-block/certificate-login gates recorded elsewhere in this registry
(see `[[gov-form-pdf-extraction]]` in engineering memory).

Worked around with the browser-automation setup recorded in
`[[browser-screenshots-setup]]` (Playwright-core + Chromium, `LD_LIBRARY_PATH`
pointed at `/paperclip/chrome-sysroot`, already installed at `/tmp/shotter` from
a prior cycle):

1. Loaded the "신청 서식" list page, located the row for item 13 (여권 발급
   신청서, blank form) and item 14 (여권 발급 신청서(작성예시), filled example)
   via `document.querySelectorAll` text match against their table rows.
2. For the filled example, its `streamdocsId` was already visible in a prior
   web search result and fetched directly:
   `https://www.passport.go.kr/streamdocs/view/sd;streamdocsId=Qn2KMrmAJnU1_Sb45McJuMPSyFy24ylntf6T0-kPnxI`.
3. For the blank form, the download `onclick` handler
   (`kssFileDownloadForKeyAct('6e57f236505dee5c16969e7d08288d58')`) was invoked
   directly via `page.evaluate`, which opens a new tab
   (`streamdocsId=MHxB3uqbYFlywmvH7v4ZnpujiHctGa_pXWM3BwBXuko`) with the current
   2025-10-09 edition.
4. The viewer renders each page as a `<img>` with a `blob:` URL (no `<canvas>`);
   `page.screenshot({ fullPage: true })` captured both the front page (data
   fields) and back page (유의사항 / notes) of the blank form, and the single
   front page of the filled example, as full-resolution PNGs.
5. Every field label, section heading, checkbox option, and instructional note
   cited in this schema's `sourceRef` values was read directly from those
   screenshots (vision), not inferred from prose summaries or search-result
   snippets.

Two supporting pages were fetched directly (no block, plain HTML):

- `passport.go.kr` — "여권신청·발급 > 재발급 > 유효기간 만료에 따른 재발급"
  (reissuance-for-expiry FAQ): confirms the online 정부24/KB스타뱅킹 channels
  are available only to "people who have received a passport at least once
  before" — i.e. first-time applicants cannot use them and must apply with
  this same paper form in person, corroborating the document's scope.

## What was confirmed directly (verbatim, from the form's own text)

- **여권 선택란 (Passport selection):** the five passport-type checkboxes
  (일반/관용/외교관/긴급/여행증명서 with 왕복/편도 sub-choice); the
  passport-period checkboxes (10년/단수(1년)/잔여기간/담당자 문의 후 선택 with
  5년/5년 미만); the page-count checkboxes (26/58) and the "default to 58-page,
  10-year if unmarked" note.
- **필수 기재란 (Required entry section):** the photo specification box
  verbatim (6-month recency, colour, plain white background, no
  glasses/hats, 3.5×4.5cm, 3.2-3.6cm head length); 한글성명, 주민번호 (with
  the exact `771127-1111111`-shaped example value from the filled sample),
  본인연락처 (digits-only note), and the 긴급연락처 sub-block (성명/관계/전화번호,
  confirmed optional because the Ministry's own filled example leaves it
  blank).
- **추가 기재란 (Additional entry section):** the romanized name fields (성/이름,
  with the filled example's `HONG` / `GILDONG` values) and 등록기준지
  (only if the officer requests it) — plus all 4 romanization-specific caution
  items from the back page (syllable-by-syllable transliteration method,
  family-member-surname-matching recommendation, correction/change
  restrictions).
- **선택 기재란 (Optional entry section):** spouse romanized surname (with its
  "spouse of [SURNAME]" print-format note), Braille passport (sighted/visually
  impaired distinction), postal delivery (with the "상세주소 기재" free-text
  note), and SMS notification consent (with its Enforcement Decree
  Articles 45-46 data-sharing citation) — all read from both the blank form and
  cross-checked against the filled example's own tick marks (희망 안 함/동의
  ticked in the sample).
- **Declaration and 행정정보 공동이용 동의서 (administrative information
  joint-use consent):** both declaration paragraphs verbatim, the
  Passport Act Article 9/11 citation, and the E-Government Act Article 36
  citation plus its enumerated list of records the consent covers (military
  service, family-relation register, resident registration, immigration
  control, disability certificate).
- **뒤쪽 유의사항 (back-side notes):** all 14 numbered cautions were read in
  full; items 4 and 10 directly ground this document's two eligibility fields
  (`hasExistingUnexpiredPassport`, `isEighteenOrOlder`).

## What is out of scope for v1.0.0

- **Non-general passport types** (official, diplomatic, emergency, travel
  certificate): gated out via `passportType`'s `eligibleValues: ["general"]`.
  Each requires separate institutional sponsorship or emergency-issuance
  criteria not documented on this form beyond the checkbox itself.
- **Applicants under 18:** gated out via `isEighteenOrOlder`. The legal
  representative consent form (법정대리인 동의서) and guardian consent form
  (보호자 동의서) are separate downloadable PDFs on the same "신청 서식" page,
  not modelled here.
- **Reissuance / renewal pathways** (early renewal, damage replacement, name
  change, online 정부24/KB스타뱅킹 reissuance): gated out via
  `hasExistingUnexpiredPassport`. These share the same physical form but add
  an existing-passport-surrender step and, for the online channel, an
  independently-unobserved wizard field set.
- **Loss reporting** (여권 분실 신고서) and other adjacent forms listed on the
  same page (기재사항변경, 로마자성명 변경, 실효확인, 사실증명, 위임장, 비자
  노트): separate documents/processes, not read for this cycle.
- **Passport fee schedule:** intentionally not encoded as schema data (fees
  change); not stated on the form itself either.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-render the same StreamDocs viewer (or a fresh fetch, if
passport.go.kr ever exposes a static PDF), re-check every `sourceRef` against
it field by field, and confirm no newer form revision has superseded the
2025-10-09 edition. Record the outcome here before setting `status: verified`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months): this is the registry's first Korean-language, first Korea-jurisdiction
document, sourced through a viewer technology (StreamDocs) not previously
extracted in this registry, which argues for the shorter end of the cadence
until the technique is independently confirmed repeatable. Re-check the
source, and confirm no newer form edition has been published, on or before
that date and on any `source.url` change.
