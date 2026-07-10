# Verification record — `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2049). The task
brief itself is generic (catalog what exists, research what is missing, author
a schema for a genuinely open gap) — per this registry's established pattern
(see e.g. `jp/houmukyoku/limited-liability-company-establishment-registration-application`'s
own VERIFICATION.md), the brief's own named National ID candidates (DE
Steuer-ID, SG NRIC loss/damage/re-registration, NZ RealMe, "remaining voter
registration") were re-checked first against CATALOG.md and confirmed already
resolved by prior cycles (`de/finanzamt/tax-identification-number`,
`sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
`nz/dia/realme-verified-identity`; every tracked voter-registration gap is
either published or a confirmed dead end/legally-closed window). CATALOG.md's
own Known Gaps item 6 was then re-read fresh and found to still flag the same
three open Japan companion-schedule candidates it has flagged since GOV-2019:
the Legal Affairs Bureau's three remaining sibling stock-company-incorporation
variants (rows 1-1, 1-2, 1-4 of the `houmukyoku.moj.go.jp` index page already
sourced for the published no-board sibling, row 1-3) and the Seal Registration
Notification's own corporate-representative-member scenario (a narrower,
already-partially-modelled companion, closed by GOV-2035 for its main case).

Of the three sibling incorporation variants, row 1-1 (board of directors
installed, incorporation by promoters) was picked over row 1-2 (board
installed, public subscription) and row 1-4 (no board, public subscription)
because it is the strongest, most clearly differentiated candidate: installing
a board of directors changes two things the application form itself surfaces
as genuinely new fields/attachments relative to the already-published no-board
sibling (a board-elected, rather than directly-designated, representative
director; a Companies Act art. 327(2)-mandated auditor), whereas row 1-4 only
changes the *subscription* mechanism (promoter-only vs. public), a distinction
this specific application form does not itself surface as any distinct
field — its only visible effect would be on the internal content of the
articles of incorporation and promoters' consent documents, both already out
of scope as undecomposed `documents[]` attachments. Row 1-2 (board installed +
public subscription) would combine both axes but was not picked this cycle,
left as a candidate for a future cycle once this simpler board-axis variant
establishes the officer-particulars/auditor pattern.

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **Blank template (fetched live, HTTP 200, 623400 bytes, with a browser
  User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001249314.pdf> — item 1-1
  ("株式会社設立登記申請書（取締役会を設置する株式会社の発起設立）", "Stock
  company with a board of directors, incorporation by promoters") of the same
  index page (<https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html>, section
  "１　設立") the already-published no-board sibling document is sourced from
  (item 1-3). 20 pages, zero AcroForm/Widget annotations on every page
  (confirmed via pdfjs-dist's `getAnnotations()`), a full genuine Japanese text
  layer.
- **Companion worked example (fetched live, HTTP 200, 756356 bytes, with a
  browser User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001331097.pdf> — the Bureau's own
  filled-in specimen ("記載例") of the identical row 1-1 variant, titled on its
  own first line "（取締役会を設置する株式会社の発起設立）". 20 pages, zero
  AcroForm/Widget annotations, same placeholder company name
  "○○商事株式会社" throughout as every other Japan document in this registry
  sourced from this same index page.
- **The index page itself** (fetched live, HTTP 200, 143773 bytes):
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> — re-confirmed row
  1-1's two linked files (`001249314.pdf` blank template, `001331097.pdf`
  worked example, plus a `.docx` edition not opened) and the full four-variant
  table already recorded in the no-board sibling's own VERIFICATION.md:

  | Row | Variant | Worked example | Blank template |
  |---|---|---|---|
  | **1-1** | **Board of directors installed, incorporation by promoters (発起設立)** | **`001331097.pdf` (this document's worked example)** | **`001249314.pdf` (this document's source)** |
  | 1-2 | Board of directors installed, public subscription (募集設立) | `001252642.pdf` | `001249316.pdf` |
  | 1-3 | No board of directors, incorporation by promoters (発起設立) | `001331002.pdf` | `001249317.pdf` (already published, `jp/houmukyoku/stock-company-establishment-registration-application`) |
  | 1-4 | No board of directors, public subscription (募集設立) | `001331010.pdf` | `001249318.pdf` |

- **Cross-check source:** the already-published no-board sibling's own two
  source PDFs, re-fetched fresh this cycle (`001249317.pdf` blank template,
  574954 bytes; the sibling's worked example was not re-fetched since its own
  VERIFICATION.md already records the full extraction) — used only to isolate,
  line-by-line, exactly what differs between the two variants, not
  re-verified independently as its own claim (that document's own review gate
  already covered that).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation note

Re-confirms the finding recorded by every prior Japan cycle since GOV-2005:
`houmukyoku.moj.go.jp` returns HTTP 403 to a plain default-`curl` request but
HTTP 200 to a request carrying an ordinary desktop-browser `User-Agent` string
(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/124.0 Safari/537.36`) — narrow bot mitigation keyed on the
default-curl signature, not an IP-level block. All three files (blank
template, worked example, index page) were fetched successfully with that
browser User-Agent on the first attempt.
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0`
reports "1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all
clear" — confirmed directly, immediately before opening this PR.

## Extraction method

Both PDFs were extracted with `pdfjs-dist` (pinned `3.11.174`, installed into a
throwaway `/tmp` scratch directory, not added to this repo's tracked
`package.json`) via `getTextContent()`, sorting each page's text items by
descending y (row, top to bottom) then ascending x (column, left to right)
before concatenation — the same x/y-coordinate row-grouping technique used
for every other Japan document in this registry sourced from a non-AcroForm
PDF with mixed prose/label-value layout. Zero AcroForm/Widget annotations were
confirmed on every page of both PDFs via `getAnnotations()`.

**The critical extraction finding, driving this document's field/scope
decisions**, came from diffing this variant's own blank template and worked
example against each other and against the already-published no-board
sibling's own two source PDFs:

1. **The blank template defers its entire 登記すべき事項 (matters to be
   registered) body to a separate annex page** ("別紙のとおり（※別紙は４
   ページ参照。）", page 1) — unlike the no-board sibling's own blank
   template, which embeds that body directly and fully on page 1 itself. The
   annex page (page 4 of the blank template) nonetheless still carries the
   identical `○○商事株式会社` placeholder content seen in the worked
   example's own annex (page 5), the same underlying reality already
   documented in the no-board sibling's own VERIFICATION.md (`登記すべき事項`
   is a passage the applicant drafts and submits separately, not literal boxes
   printed on the page) — this document's structural presentation differs
   from its sibling, but the substance does not.
2. **The attachment list's own wording for the officer's-acceptance and
   investigation-report items changes from parenthetical/optional auditor
   phrasing to unconditional auditor phrasing.** The no-board sibling's blank
   template prints "設立時取締役（及び設立時監査役）の就任承諾書" and "設立時
   取締役（及び設立時監査役）の調査報告書及びその附属書類" — the auditor
   bracketed as an "if any" case. This variant's blank template instead prints
   "設立時取締役、設立時代表取締役及び設立時監査役の就任承諾書" and "設立時
   取締役及び設立時監査役の調査報告書及びその附属書類" — no brackets, and the
   representative director named as a third, distinct party alongside
   ordinary directors and the auditor. This is independent, source-printed
   corroboration (not outside legal knowledge) that a board-installed
   company's auditor is not merely optional the way it is for the no-board
   sibling.
3. **The worked example's own officer block (登記すべき事項, annex page 5)
   additionally shows a 監査役 (auditor) entry, an auditor audit-scope
   registered-matter pair, and a 「監査役設置会社に関する事項」 line** — none
   of which appear anywhere in the no-board sibling's own worked example
   (which the sibling's own VERIFICATION.md explicitly records as having "no
   auditor"). Combined with finding 2 above, this document treats the
   auditor as required rather than optionally gated — see "What the
   application maps to" below for the full disclosed reasoning, including the
   Companies Act art. 327(2) statutory backdrop and its narrow, out-of-scope
   exceptions.
4. **The representative director is selected by the incorporation-time
   directors' own board resolution**, not designated directly by the
   promoters/shareholders as in the no-board sibling. The worked example's own
   specimen packet (pages 12-13) shows a two-step process: first a
   "設立時取締役、設立時監査役選任及び本店所在場所決議書" (a promoters'
   resolution appointing the incorporation-time directors and auditor), then a
   separate "設立時代表取締役選定決議書" (a resolution of those
   already-appointed directors electing one of themselves as representative
   director) — the same two-document structure the no-board sibling's own
   attachment list already names
   (`representativeDirectorSelectionDocumentFile`), but there that document is
   only conditionally required ("more than one director is appointed and one
   of them is separately selected"), whereas here it is unconditionally
   printed on the attachment list and therefore modelled as always required.

## What the application maps to

- **フリガナ / 商号 / 本店 / 登記の事由** → `companyNameFurigana`,
  `companyName`, `headOfficeAddress`, `incorporationProcedureCompletionDate` —
  identical source rows and treatment to the no-board sibling document.
- **「公告をする方法」/「目的」/「発行可能株式総数」/「発行済株式の総数並び
  に種類及び数」/「資本金の額」** → `methodOfPublicNotice`, `businessPurposes`,
  `totalAuthorizedShares`, `totalIssuedShares`, `capitalAmount` — unchanged
  from the no-board sibling document; the board-of-directors distinction has
  no effect on any of these registered matters, confirmed by both variants'
  worked examples printing the identical illustrative values (800 authorized
  shares, 200 issued shares, ¥10,000,000 capital).
- **「株式の譲渡制限に関する規定」** → `hasShareTransferRestriction` +
  `shareTransferRestrictionClause`. Both variants' worked examples print the
  identical standard clause text, but the *default approving body* differs by
  operation of law even though neither source PDF prints it explicitly:
  Companies Act art. 139(1) makes the board of directors the default approver
  for a board-installed company (this document), versus the shareholders'
  meeting for a no-board company (the sibling) — disclosed in the field's own
  `description` rather than modelled as a separate field, since it is not
  itself a data point either source document asks the applicant to supply.
- **「役員に関する事項」（取締役）** → `directorNames`, unchanged in kind from
  the no-board sibling, though this variant's own worked example lists three
  directors rather than two.
- **「役員に関する事項」（代表取締役）** → `representativeDirectorName` /
  `representativeDirectorAddress`, unchanged in kind, but their `description`
  fields are updated to disclose the board-election mechanism (see extraction
  finding 4 above) in place of the no-board sibling's direct-designation
  mechanism.
- **「役員に関する事項」（監査役）** → `hasAuditor` (now `required: true`,
  changed from the no-board sibling's `required: false`) + `auditorNames`
  (now unconditionally `required: true` rather than `requiredWhen`-gated).
  Grounded in extraction findings 2 and 3 above: Companies Act art. 327(2)
  requires a board-installed company to appoint an auditor unless it instead
  adopts a committee-based governance structure (指名委員会等設置会社/監査
  等委員会設置会社) or is a non-public company with an accounting advisor
  (会計参与) installed — neither alternative structure is modelled by this
  document (see "What is NOT modelled" below), so within this document's own
  scope the auditor is not optionally gated. This is a deliberate, disclosed
  departure from the no-board sibling's own field shape, not an oversight —
  the two documents' `hasAuditor` fields are intentionally different
  (optional vs. required) because the underlying legal requirement itself
  differs by company structure.
- **「役員に関する事項」（監査役の監査の範囲に関する事項）** → new field
  `auditorScopeLimitedToAccounting` (boolean, optional), with no counterpart
  on the no-board sibling document (whose own worked example has no auditor at
  all to have a scope-of-audit registered matter for). Sourced from the
  worked example's own annex line "監査役の監査の範囲を会計に関するものに
  限定する旨の定款の定めがある".
- **The filing block** (page 2 of the blank template) → `applicationDate`,
  `legalAffairsBureauOffice`, `contactPhoneNumber`, `filedByAgent` /
  `agentName` / `agentAddress` — unchanged in kind and treatment from the
  no-board sibling document.
- **The attachment list** (「添付書類」) → `documents[]`, the same ten
  attachment requirements as the no-board sibling document, by the same
  `id`s (deliberate reuse, not re-specification, per this registry's
  composability/reuse convention), but with two `required`/description
  changes disclosed above:
  `representativeDirectorSelectionDocumentFile` changes from conditionally
  required to unconditionally required (extraction finding 4), and
  `acceptanceOfAppointmentLettersFile` / `investigationReportAndAttachmentsFile`
  have their `label`/`sourceRef` updated to the unconditional (non-
  parenthetical) auditor wording this variant's own source PDFs print
  (extraction finding 2).

## What is NOT modelled (out of scope), and why

- **The two remaining sibling variants** (board installed + public
  subscription, no board + public subscription — rows 1-2 and 1-4 of the same
  index-page section) — each its own distinct template, left as candidates
  for a future companion-schedule cycle, per the "Why this candidate, this
  cycle" reasoning above.
- **Committee-based governance structures** (指名委員会等設置会社,
  nomination-committee company; 監査等委員会設置会社, audit-and-supervisory-
  committee company) and **the non-public-company-with-accounting-advisor
  exception** to Companies Act art. 327(2) — each a distinct, rarer governance
  structure under which a board-installed company's auditor requirement is
  replaced or waived. Neither source PDF examined this cycle documents either
  alternative structure; this document models only the plain
  board-of-directors-plus-company-auditor case its own worked example
  actually shows.
- **The internal content of every attached supporting document** (the
  articles of incorporation's own model articles; the promoters'
  consent/resolution letters; the investigation report; the capital-payment
  proof; the capital-amount certificate; the power of attorney) — each
  modelled only as a `documents[]` attachment requirement, not decomposed
  field-by-field, mirroring the no-board sibling document's own scope
  decision.
- **The registration-fee/tax computation** (「課税標準金額」and「登録免許税」)
  — both source documents show the identical formula already documented in
  the no-board sibling's own VERIFICATION.md (0.7% of `capitalAmount`, ¥150,000
  statutory floor, rounded down to the nearest ¥100) — a pure arithmetic
  derivation of `capitalAmount` with no independent input, excluded per this
  registry's established excludable-arithmetic-vs-input test.
- **「登記記録に関する事項」「設立」** and, when `hasAuditor` is `true`,
  **「監査役設置会社に関する事項」「監査役設置会社」** — both fixed,
  non-variable constants that follow automatically from this document's own
  premise (this is the board-installed variant; a `true` `hasAuditor` implies
  the company is, by definition, an auditor-installed company) rather than
  independent data points the applicant supplies. Likewise「取締役会設置会社
  に関する事項」「取締役会設置会社」is a fixed constant of this specific
  document (every filing against this template installs a board of
  directors, unlike the no-board sibling, where the equivalent statement
  is simply absent).
- **The "other possible attachments" examples** the worked example's own page
  2 lists beyond the ten core attachment types (a share-registrar-agent
  contract, when one is appointed; a court-appointed inspector's investigation
  report and related professional certificates, for larger in-kind
  contributions requiring court inspection under Companies Act art. 33) — both
  narrower, rarer edge cases the source itself frames as supplementary
  examples ("それ以外の添付書類の例"), not part of the ten-item core
  attachment list either variant's blank template prints; left unmodelled,
  consistent with `investigationReportAndAttachmentsFile`'s own existing scope
  boundary (ordinary directors'/auditor's investigation report, not a
  court-appointed inspector's).
- **The Word (`.docx`) edition** of the blank template, linked alongside the
  PDF at the same index-page row — not opened or cross-checked this cycle.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus five negative controls:

```
PASS [OK]   Scenario 1: worked-example values, board-installed, filed by representative director personally
PASS [OK]   Scenario 2: sole-promoter incorporation with agent filing
PASS [FAIL]   Negative control 1: missing hasAuditor/auditorNames (required in this board-installed variant)
    - MISSING required field: hasAuditor
    - MISSING required field: auditorNames
PASS [FAIL]   Negative control 2: missing shareTransferRestrictionClause when required
    - MISSING required field: shareTransferRestrictionClause
PASS [FAIL]   Negative control 3: missing agentName/agentAddress when filedByAgent=true
    - MISSING required field: agentName
    - MISSING required field: agentAddress
PASS [FAIL]   Negative control 4: capitalAmount below minimum (0)
    - INVALID minimum for capitalAmount: 0 < 1
PASS [FAIL]   Negative control 5: missing representativeDirectorSelectionDocumentFile (always required in this variant)
    - MISSING required document: representativeDirectorSelectionDocumentFile

ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 reproduces the worked example's own illustrative values (three
directors, one also representative director, one auditor with scope limited
to accounting, filed by the representative director personally —
`filedByAgent: false`). Scenario 2 is an independently-constructed fictional
scenario (a two-director incorporation, "藤崎コンサルティング株式会社", filed
through a judicial-scrivener agent — exercising `filedByAgent`/`agentName`/
`agentAddress` together, with a different auditor-scope choice). The five
negative controls confirm the check script actually enforces
`required`/`requiredWhen` (for `hasAuditor`/`auditorNames`, unconditionally
required in this variant unlike the no-board sibling;
`shareTransferRestrictionClause`; the `filedByAgent`-gated agent fields; and
`representativeDirectorSelectionDocumentFile`, unconditionally required in
this variant) and `validation.minimum` (rejecting a zero-yen `capitalAmount`)
rather than trivially passing everything. No defects were found in the schema
itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (this document plus every prior document) and
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0`
("1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's seventh document in the registry (after
  `jp/isa/certificate-of-eligibility-application`,
  `jp/j-lis/individual-number-card-issuing-application`,
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  `jp/houmukyoku/limited-liability-company-establishment-registration-application`,
  `jp/houmukyoku/seal-registration-notification`, and
  `jp/nta/individual-income-tax-final-return`) and its second in the Business
  Formation vertical alongside a company-type variant — **Japan remains at
  4 of its 6 verticals (Visa, National ID, Business Formation, Taxes)**; this
  document deepens rather than widens Business Formation coverage. DMV and
  Passport remain confirmed dead ends (GOV-2005).
- `id`/process slug
  `stock-company-establishment-registration-application-board-of-directors`
  reuses the already-published sibling's own base slug with a `-board-of-
  directors` suffix, following this registry's established suffix convention
  for a same-authority, same-underlying-process variant (e.g. ZA SARS's
  ITR14 Annexure family: `-dormant`, `-micro-business`, `-body-corporate`,
  `-small-business`, `-medium-large-business`).
- `version` set to `1.0.0`: this document models one complete,
  self-contained procedural variant in full (every page of its own
  application template), the same basis this registry has used for every
  other Japan document's initial release.
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-10** (6
months). A future review should prioritize the two remaining sibling
incorporation variants (board installed + public subscription; no board +
public subscription) as companion documents, both flagged above as the
registry's remaining open Japan companion-schedule candidates on the same
`houmukyoku.moj.go.jp` index page.
