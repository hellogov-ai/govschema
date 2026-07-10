# Verification record — `jp/houmukyoku/stock-company-establishment-registration-application-public-subscription` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle. CATALOG.md's own
Known Gaps item 6 named the Legal Affairs Bureau's four-row
`houmukyoku.moj.go.jp` stock-company-incorporation index page as this
registry's Japan companion-schedule seam. Three of the four rows were already
published: row 1-3 (no board, incorporation by promoters —
`stock-company-establishment-registration-application`, GOV-2019), row 1-1
(board installed, incorporation by promoters —
`stock-company-establishment-registration-application-board-of-directors`,
GOV-2049), and row 1-2 (board installed, public subscription —
`stock-company-establishment-registration-application-board-of-directors-public-subscription`,
GOV-2152), each disclosing the remaining row as a candidate for a future
cycle. This cycle authors the fourth and last remaining row — **row 1-4, no
board of directors + public subscription** — closing the four-variant set.

No wider-scope opportunity (opening a new vertical rather than deepening
Business Formation) was screened preferentially over this candidate: the
prior cycle (GOV-2152) had already scouted Sweden's and Chile's Passport/
National ID verticals, Chile's Visa vertical, and UAE's Passport vertical and
found each a confirmed in-person/appointment-gated dead end; this cycle
re-confirmed CATALOG.md still lists no newer open lead ahead of this
already-flagged, well-sourced, structurally-parallel candidate, so it was
picked up directly rather than re-screening dead ends a second time.

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/stock-company-establishment-registration-application-public-subscription` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **Blank template (fetched live, HTTP 200, 592185 bytes, with a browser
  User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001249318.pdf> — item 1-4
  ("株式会社設立登記申請書（取締役会を設置しない会社の募集設立）", "Stock
  company with no board of directors, public subscription") of the same
  index page (<https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html>,
  section "１　設立") every other Japan stock-company-incorporation document
  in this registry is sourced from. 21 pages, zero AcroForm/Widget
  annotations on any page (confirmed via pdfjs-dist's `getAnnotations()`;
  the only annotations present, 2 on page 4, are plain `Link` annotations, not
  form fields), a full genuine Japanese text layer.
- **Companion worked example (fetched live, HTTP 200, 651068 bytes, with a
  browser User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001331010.pdf> — the Bureau's
  own filled-in specimen ("記載例") of the identical row 1-4 variant, titled
  on its own first line "（取締役会を設置しない株式会社の募集設立）". 20
  pages, 5 annotations across 3 pages (pages 1, 2, 5 — all confirmed `Link`,
  not `Widget`/AcroForm fields), same placeholder company name
  "○○商事株式会社" throughout as every other Japan document in this registry
  sourced from this index page.
- **The index page itself** (fetched live, HTTP 200, 143773 bytes):
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> — re-confirmed row
  1-4's two linked files (`001249318.pdf` blank template, `001331010.pdf`
  worked example, plus a `.docx` edition not opened) and the full
  four-variant table already recorded in all three already-published
  siblings' own VERIFICATION.md files:

  | Row | Variant | Worked example | Blank template |
  |---|---|---|---|
  | 1-1 | Board of directors installed, incorporation by promoters (発起設立) | `001331097.pdf` | `001249314.pdf` (published, `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`) |
  | 1-2 | Board of directors installed, public subscription (募集設立) | `001252642.pdf` | `001249316.pdf` (published, `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription`) |
  | 1-3 | No board of directors, incorporation by promoters (発起設立) | `001331002.pdf` | `001249317.pdf` (published, `jp/houmukyoku/stock-company-establishment-registration-application`) |
  | **1-4** | **No board of directors, public subscription (募集設立)** | **`001331010.pdf` (this document's worked example)** | **`001249318.pdf` (this document's source)** |

- **Cross-check sources (both re-fetched fresh this cycle):**
  - the no-board/promoter-only sibling's own blank template and worked
    example (`001249317.pdf`, 574954 bytes; `001331002.pdf`, 608301 bytes —
    both byte counts match the figures already recorded in that sibling's own
    VERIFICATION.md, confirming an unchanged live source) — used to isolate,
    line-by-line, exactly what the public-subscription axis changes relative
    to this variant's own no-board baseline;
  - the board-installed/public-subscription sibling's own blank template
    (`001249316.pdf`, 584493 bytes) — used to confirm the public-subscription
    axis change found here is the *same* axis-level change that sibling
    already isolated against its own board-installed baseline, and to
    identify which of that sibling's own fields/attachments are
    board-of-directors-specific and therefore do not carry over here.
  - Neither cross-check source's own claim was re-verified independently;
    that is each already-published sibling's own review gate's
    responsibility (GOV-2022, GOV-2154).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation note

Re-confirms the finding recorded by every prior Japan cycle since GOV-2005:
`houmukyoku.moj.go.jp` returns HTTP 403 to a plain default-`curl` request but
HTTP 200 to a request carrying an ordinary desktop-browser `User-Agent`
string (`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/124.0 Safari/537.36`) — narrow bot mitigation keyed on the
default-curl signature, not an IP-level block. All six files fetched this
cycle (blank template, worked example, both cross-check sibling sources, the
index page) succeeded with that browser User-Agent on the first attempt.
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0`
reports "1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all
clear" — confirmed directly, immediately before opening this PR.

## Extraction method

All PDFs were extracted with `pdfjs-dist` (pinned `3.11.174`, installed into
a throwaway `/tmp` scratch directory, not added to this repo's tracked
`package.json`) via `getTextContent()`, sorting each page's text items by
descending y (row, top to bottom) then ascending x (column, left to right)
before concatenation — the same x/y-coordinate row-grouping technique used
for every other Japan document in this registry sourced from a non-AcroForm
PDF with mixed prose/label-value layout. Zero AcroForm/Widget annotations
were confirmed on every page of both this variant's own PDFs (and,
independently, on the two cross-check sibling PDFs) via `getAnnotations()`.

**A disclosed genuine wording variation, found and cross-checked rather than
silently normalized:** this row's own investigation-report attachment line
reads, in both the blank template and its own worked example alike,
"設立時取締役（及び設立時監査役）の調査報告書**並びに**その附属書類" — using
the conjunction "並びに" — where both already-published sibling documents'
own source PDFs (row 1-3's "…の調査報告書**及び**その附属書類" and row 1-2's
"…の調査報告書**及び**その附属書類") instead use "及び". Because the
variation is consistent between this row's own blank template and its own
worked example (not a single stray row, and not attributable to a
y-coordinate merge artifact of the kind previously disclosed in the
board-installed/public-subscription sibling's own VERIFICATION.md), this is
treated as a genuine, minor idiosyncrasy of this specific government-issued
PDF rather than an extraction error, and is quoted verbatim (with the
variation called out) in this document's own `investigationReportAndAttachmentsFile.sourceRef`
rather than silently corrected to match the siblings' wording.

**The remaining, substantive extraction findings, driving this document's
field/scope decisions**, came from diffing this variant's own blank template
and worked example against both already-published siblings' own source PDFs:

1. **The registered 'matters to be registered' content (登記すべき事項) is
   structurally and substantively identical to the no-board/promoter-only
   sibling's own page-1 content** — same officer-particulars shape
   (directors, promoter-designated representative director, optional
   auditor with no mandatory-appointment rule since there is no board), same
   illustrative values (800 authorized shares, 200 issued shares, ¥10
   million capital) — confirming the public-subscription/promoter-only axis
   has no effect on this content, only on the attachment list (see below)
   and the registration-reason date's own fixed phrase. Unlike the
   board-installed/public-subscription sibling's own blank template (which
   defers this entire body to a separate annex page, "登記すべき事項　別紙の
   とおり"), this no-board variant's blank template prints the body inline on
   page 1, exactly like the no-board/promoter-only sibling's own blank
   template — confirming the annex-vs-inline layout choice tracks the
   board-of-directors axis, not the public-subscription axis.
2. **The registration-reason phrase changes from '発起設立の手続終了' to
   '募集設立の手続終了'**, and the worked example carries a distinct
   explanatory annotation the no-board/promoter-only sibling does not have:
   '創立総会の終了の日等を記載してください。' ('record the date the
   organizational general meeting concluded, etc.'). Unlike the
   board-installed/public-subscription sibling's own equivalent annotation,
   which additionally cites '（会社法第911条第2項参照）' ('see Companies Act
   art. 911(2)'), this row's own printed annotation omits that article
   citation — a genuine difference between the two public-subscription
   siblings' own source text, disclosed here rather than silently
   normalized by copying the citation over from the other sibling. This
   document's `organizationalMeetingCompletionDate` field description still
   grounds the organizational meeting's procedural role in Companies Act
   arts. 87-92 (general background reasoning, not a source quotation).
3. **The attachment list gains the same three items already isolated by the
   board-installed/public-subscription sibling document against its own
   board-installed baseline**, each grounded in the public-subscription
   procedure's own statutory requirements: 株式申込書 (share subscription
   application forms, or a bank/trust-company handling certificate as an
   alternative); 創立総会議事録 (organizational general meeting minutes,
   Companies Act arts. 87-92); and the sibling's plain "払込みを証する書面"
   replaced by the stricter "払込金保管証明書" (Companies Act art. 64's
   funds-custody requirement for solicited funds).
4. **Every other attachment item** (定款, 発起人の同意書,
   設立時代表取締役を選定したことを証する書面,
   設立時取締役（及び設立時監査役）の就任承諾書, 印鑑証明書,
   本人確認証明書, 資本金の額の計上に関する設立時代表取締役の証明書, 委任状)
   **is worded and scoped identically to the no-board/promoter-only
   sibling's own list** (modulo finding 1 above's disclosed wording
   variation on the investigation-report line), confirming the
   board-of-directors axis (already fully modelled by that sibling, and
   independently confirmed absent here) is unaffected by the
   public-subscription axis this document isolates.
5. **The board-installed/public-subscription sibling's own board-specific
   fields do not apply here**, confirmed by their absence from this row's
   own worked example: no board-elected representative director (this
   variant's representative director is designated by a promoters'
   resolution, exactly like the no-board/promoter-only sibling — see the
   worked example's own "設立時代表取締役選定決議書" specimen, page 15); no
   Companies Act art. 327(2) mandatory auditor (this row's own worked
   example shows no auditor at all, and `hasAuditor` is modelled as an
   optional gate exactly like the no-board/promoter-only sibling, not the
   unconditionally-required field the board-installed sibling uses); no
   `auditorScopeLimitedToAccounting` field (absent from this row's own
   source content, since it presupposes an auditor).

## What the application maps to

- **フリガナ / 商号 / 本店** → `companyNameFurigana`, `companyName`,
  `headOfficeAddress` — identical source rows and treatment to all three
  already-published sibling documents.
- **登記の事由** → `organizationalMeetingCompletionDate` (renamed from the
  no-board/promoter-only sibling's `incorporationProcedureCompletionDate` to
  reflect the source's own organizational-meeting framing — extraction
  finding 2 above; same renaming the board-installed/public-subscription
  sibling already applied for its own equivalent field).
- **「公告をする方法」/「目的」/「発行可能株式総数」/「発行済株式の総数並び
  に種類及び数」/「資本金の額」** → `methodOfPublicNotice`, `businessPurposes`,
  `totalAuthorizedShares`, `totalIssuedShares`, `capitalAmount` — unchanged
  from all three already-published sibling documents; confirmed by
  extraction finding 1 above.
- **「株式の譲渡制限に関する規定」** → `hasShareTransferRestriction` +
  `shareTransferRestrictionClause` — unchanged from the no-board/
  promoter-only sibling, including its own disclosed shareholders'-meeting
  default-approving-body note (this document shares that sibling's no-board
  status, not the board-installed siblings' Companies Act art. 139(1)
  board-default note).
- **「役員に関する事項」（取締役／代表取締役／監査役）** → `directorNames`,
  `representativeDirectorName`, `representativeDirectorAddress`,
  `hasAuditor` (optional), `auditorNames` (optional, gated) — unchanged in
  kind and treatment from the no-board/promoter-only sibling document, per
  extraction findings 1 and 5 above (promoter-designated representative
  director; no mandatory-auditor rule).
- **The filing block** (page 2-3 of the blank template) → `applicationDate`,
  `legalAffairsBureauOffice`, `contactPhoneNumber`, `filedByAgent` /
  `agentName` / `agentAddress` — unchanged in kind and treatment from all
  three already-published sibling documents.
- **The attachment list** (「添付書類」) → `documents[]`. Nine of the twelve
  `id`s are the no-board/promoter-only sibling's own `id`s, reused verbatim
  (deliberate reuse, not re-specification, per this registry's
  composability/reuse convention): `articlesOfIncorporationFile`,
  `promotersConsentLetterFile`, `representativeDirectorSelectionDocumentFile`,
  `acceptanceOfAppointmentLettersFile`, `sealCertificatesFile`,
  `identityVerificationDocumentsFile`,
  `investigationReportAndAttachmentsFile`, `capitalAmountCertificateFile`,
  `powerOfAttorneyFile`. Three new `id`s model the public-subscription-only
  attachments disclosed in extraction finding 3 above — reusing the exact
  same `id` names the board-installed/public-subscription sibling already
  minted for the identical attachment types: `shareApplicationFormsFile`,
  `fundsCustodyProofDocumentFile` (replacing `proofOfPaymentDocumentFile`, a
  deliberately distinct `id` since the two attachments are legally distinct
  instruments), and `organizationalMeetingMinutesFile`.

## What is NOT modelled (out of scope), and why

- **Committee-based governance structures** and other board-installed-only
  alternative structures — not applicable to this no-board variant at all
  (Companies Act art. 327(2)'s mandatory-auditor exceptions only ever arise
  for a board-installed company); mirrors the no-board/promoter-only
  sibling's own scope boundary.
- **A promoter/third-party-subscriber split of `totalIssuedShares`, or of
  the capital amount** — neither this document's own source PDF nor either
  cross-check sibling's registered-matters content breaks the issued-share
  total or capital amount down by subscriber category; both are registered
  only as single running totals (extraction finding 1).
- **The internal content of every attached supporting document** (the
  articles of incorporation's own model articles; the promoters' consent
  letter; the share-subscription application forms; the funds-custody
  certificate; the organizational-meeting minutes; the investigation
  report; the capital-amount certificate; the power of attorney) — each
  modelled only as a `documents[]` attachment requirement, not decomposed
  field-by-field, mirroring all three already-published sibling documents'
  own scope decisions.
- **The registration-fee/tax computation** (「課税標準金額」and「登録免許税」)
  — this document's own source PDFs show the identical formula already
  documented in every already-published sibling's own VERIFICATION.md (0.7%
  of `capitalAmount`, ¥150,000 statutory floor, rounded down to the nearest
  ¥100) — a pure arithmetic derivation of `capitalAmount` with no
  independent input, excluded per this registry's established
  excludable-arithmetic-vs-input test.
- **A distinct field or attachment for the branch-office registered matter**
  (「支店番号」「支店の所在地」) — present in this row's own worked example
  (a single branch office is illustrated) but absent from the no-board/
  promoter-only sibling's own worked example, and, on inspection, *also*
  present in the board-installed/public-subscription sibling's own blank
  template (row 1-2, confirmed by re-extraction this cycle) without that
  sibling modelling it as a field either. Since neither of this variant's
  own two closest siblings models a branch-office field, and a branch office
  is not itself a consequence of the public-subscription axis this document
  isolates (any of the four variants' companies may or may not have a
  branch), this is treated as an out-of-scope illustrative detail of this
  particular worked example rather than an axis-defining difference — the
  same scope boundary as both siblings, made explicit here rather than left
  silently unaddressed.
- **「登記記録に関する事項」「設立」** — a fixed, non-variable constant that
  follows automatically from this document's own premise, not an
  independent data point the applicant supplies — the same treatment as
  every already-published sibling document.
- **The "other possible attachments" examples** the worked example's own
  page 3 lists beyond the twelve core attachment types (a share-registrar-
  agent contract, a court-appointed inspector's investigation report and
  related professional certificates for larger in-kind contributions under
  Companies Act art. 33, a market-price certificate for marketable
  securities contributed in kind, a transcript of any court ruling on an
  inspector's report) — narrower, rarer edge cases the source itself frames
  as supplementary examples ("それ以外の添付書類の例"), not part of the
  twelve-item core attachment list any of the four variants' blank
  templates print; left unmodelled, consistent with
  `investigationReportAndAttachmentsFile`'s own existing scope boundary.
- **The Word (`.docx`) edition** of the blank template, linked alongside the
  PDF at the same index-page row — not opened or cross-checked this cycle.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus eight negative controls:

```
PASS [OK]   Scenario 1: worked-example-style values, no-board public-subscription incorporation, filed personally, no auditor
PASS [OK]   Scenario 2: same incorporation with an auditor, filed through a judicial-scrivener agent
PASS [FAIL]   Negative control 1: hasAuditor=true but auditorNames missing
    - MISSING required field: auditorNames
PASS [FAIL]   Negative control 2: missing shareTransferRestrictionClause when hasShareTransferRestriction=true
    - MISSING required field: shareTransferRestrictionClause
PASS [FAIL]   Negative control 3: filedByAgent=true but agentName/agentAddress/powerOfAttorneyFile missing
    - MISSING required field: agentName
    - MISSING required field: agentAddress
    - MISSING required document: powerOfAttorneyFile
PASS [FAIL]   Negative control 4: capitalAmount below minimum (0)
    - INVALID minimum for capitalAmount: 0 < 1
PASS [FAIL]   Negative control 5: missing shareApplicationFormsFile (always required in this variant)
    - MISSING required document: shareApplicationFormsFile
PASS [FAIL]   Negative control 6: missing fundsCustodyProofDocumentFile (always required in this variant)
    - MISSING required document: fundsCustodyProofDocumentFile
PASS [FAIL]   Negative control 7: missing organizationalMeetingMinutesFile (always required in this variant)
    - MISSING required document: organizationalMeetingMinutesFile
PASS [FAIL]   Negative control 8: missing companyName (unconditionally required)
    - MISSING required field: companyName

10/10 scenarios behaved as expected
ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 is an independently-constructed fictional scenario modelled on the
worked example's own illustrative shape (two directors, one also
representative director, no auditor, filed by the representative director
personally — `filedByAgent: false`). Scenario 2 re-uses the same
incorporation but adds a third director, an auditor (`hasAuditor: true` /
`auditorNames` populated), and exercises `filedByAgent` / `agentName` /
`agentAddress` together (filed through a judicial-scrivener agent). The eight
negative controls confirm the check script actually enforces
`required`/`requiredWhen` (for `auditorNames` when `hasAuditor` is true;
`shareTransferRestrictionClause`; the `filedByAgent`-gated agent fields and
`powerOfAttorneyFile`; the three public-subscription-only attachments —
`shareApplicationFormsFile`, `fundsCustodyProofDocumentFile`,
`organizationalMeetingMinutesFile`, each unconditionally required in this
variant; and the unconditionally-required `companyName`) and
`validation.minimum` (rejecting a zero-yen `capitalAmount`) rather than
trivially passing everything. No defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (`find registry -name schema.json | xargs node
tools/validate.mjs`, this document plus every prior document — 333/333
passed) and
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-public-subscription/1.0.0`
("1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Naming decision

The new document's `id`/directory slug is
`stock-company-establishment-registration-application-public-subscription` —
the no-board/promoter-only sibling's own base slug
(`stock-company-establishment-registration-application`, which itself carries
no board-axis suffix, since the no-board case is this registry's established
"bare" baseline for this process) with a `-public-subscription` suffix
appended, exactly parallel to how the board-installed/public-subscription
sibling's own slug
(`stock-company-establishment-registration-application-board-of-directors-public-subscription`)
appends the same `-public-subscription` suffix to *its* own base slug
(`stock-company-establishment-registration-application-board-of-directors`).
In other words: each of the four siblings' slugs is the bare base slug plus
zero, one, or two axis suffixes, applied independently and consistently
(`(none)`, `-board-of-directors`, `-public-subscription`,
`-board-of-directors-public-subscription`) — this document takes the
`-public-subscription`-only combination, the one remaining unused
combination. Confirmed no collision with any existing `registry/jp/`
directory before creating it. This also matches the exact slug this cycle's
own task brief anticipated.

## Scope and jurisdiction notes

- This is Japan's ninth document in the registry (after
  `jp/isa/certificate-of-eligibility-application`,
  `jp/j-lis/individual-number-card-issuing-application`,
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  `jp/houmukyoku/limited-liability-company-establishment-registration-application`,
  `jp/houmukyoku/seal-registration-notification`,
  `jp/nta/individual-income-tax-final-return`,
  `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`,
  and
  `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription`)
  and its fourth in the Business Formation vertical alongside three
  company-type variants — **Japan remains at 4 of its 6 verticals (Visa,
  National ID, Business Formation, Taxes)**; this document deepens rather
  than widens Business Formation coverage. DMV and Passport remain confirmed
  dead ends (GOV-2005). This closes the Legal Affairs Bureau's four-variant
  stock-company-incorporation set on this index page — no further sibling
  variant remains open on `COMMERCE_11-1.html`'s "１　設立" section.
- `version` set to `1.0.0`: this document models one complete, self-contained
  procedural variant in full (every page of its own application template),
  the same basis this registry has used for every other Japan document's
  initial release.
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-10** (6
months). A future review should re-confirm the Legal Affairs Bureau has not
published a fifth incorporation variant or materially revised any of the
four already-published ones (the index page carries an "【R8.5.11更新】"
last-updated marker on every row as of this cycle's fetch), and, more
broadly, that Japan's Business Formation vertical's own four-variant
coverage remains current.
