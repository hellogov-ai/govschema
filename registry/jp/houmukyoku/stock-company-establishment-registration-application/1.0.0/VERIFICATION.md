# Verification record — `jp/houmukyoku/stock-company-establishment-registration-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2019). Two
prior cycles had already screened and flagged this exact candidate rather
than pursuing it:

- GOV-2005 (opening Japan, Visa vertical): "Business Formation (company
  registration). `moj.go.jp` and its Legal Affairs Bureau subdomain
  `houmukyoku.moj.go.jp` return HTTP 403 to a plain fetch but HTTP 200 to a
  request carrying an ordinary desktop-browser `User-Agent`... A genuinely
  strong candidate, flagged for a future cycle, not chosen this cycle."
- GOV-2012 (Japan's National ID vertical): re-confirmed the same candidate
  still open and still live, again not pursued in favor of the National ID
  form.

This cycle executed directly on that already-screened candidate rather than
re-screening Japan's remaining gaps from scratch, per this recurring issue's
established pattern once a specific candidate has already been identified
across two prior cycles.

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/stock-company-establishment-registration-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **The task brief's own flagged source (fetched live, HTTP 200, 608301
  bytes — matching the byte count both prior cycles recorded when they first
  found it):**
  <https://houmukyoku.moj.go.jp/homu/content/001331002.pdf> — turned out on
  inspection to be the Legal Affairs Bureau's own **filled-in worked example**
  ("記載例") of one specific procedural variant, titled on its own first line
  "（取締役会を設置しない株式会社の発起設立）" ("Stock company with no board
  of directors, incorporation by promoters"), 17 pages, using the placeholder
  company name "○○商事株式会社" throughout — not a blank fillable form.
- **The genuinely blank counterpart template, traced from the worked
  example's own index page (fetched live, HTTP 200):**
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> ("商業・法人登記の
  申請書様式" — "Commercial/corporate registration application forms"),
  section "１　設立" ("1. Incorporation"), row "1-3":
  "株式会社設立登記申請書（取締役会を設置しない会社の発起設立）" — linking
  to **申請書様式** ("application form template"), the true blank form this
  document is modelled from:
  <https://houmukyoku.moj.go.jp/homu/content/001249317.pdf> (fetched live,
  HTTP 200, 574954 bytes, 18 pages — a Word edition,
  `001249253.docx`/`001249317.pdf`, is linked alongside it and was not
  separately opened).
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

### Confirming the index page lists four distinct variants, and this is the correct one

The same index-page section ("１　設立") lists four separate rows, each with
its own worked-example + blank-template pair:

| Row | Variant | Worked example | Blank template |
|---|---|---|---|
| 1-1 | Board of directors installed, incorporation by promoters (発起設立) | `001331097.pdf` | `001249314.pdf` |
| 1-2 | Board of directors installed, public subscription (募集設立) | `001252642.pdf` | `001249316.pdf` |
| **1-3** | **No board of directors, incorporation by promoters (発起設立)** | **`001331002.pdf` (the task brief's flagged source)** | **`001249317.pdf` (this document's source)** |
| 1-4 | No board of directors, public subscription (募集設立) | `001331010.pdf` | `001249318.pdf` |

This confirms the task-brief-flagged PDF and this document's cited blank
template are companion publications of the identical procedural variant
(row 1-3), not different forms — the worked example is simply the
"illustrated, pre-filled" edition of the same template. The other three
variants (1-1, 1-2, 1-4) are distinct published templates, each its own
candidate for a future companion-schedule cycle (see "What is NOT modelled"
below).

### Bot-mitigation note

Confirms the finding both prior cycles (GOV-2005, GOV-2012) already
recorded: `houmukyoku.moj.go.jp` returns HTTP 403 to a plain default-`curl`
request but HTTP 200 to a request carrying an ordinary desktop-browser
`User-Agent` string (`Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36`) — narrow
bot mitigation keyed on the default-curl signature, not an IP-level block.
Both PDFs cited above, and the guidance index HTML page, were fetched
successfully with that browser User-Agent on the first attempt.
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0`
reports "1 directory, 6 URLs checked, 0 warning(s), 0 allowlisted, all
clear" — confirmed directly, immediately before opening this PR.

## Extraction method

Both PDFs have zero AcroForm/Widget annotations on every page (confirmed via
`pdfjs-dist`'s `getAnnotations()` — `widgets: 0` on all 17/18 pages of the
worked example and blank template respectively) but a full, genuine Japanese
text layer, extracted with `pdfjs-dist` (pinned `3.11.174`, installed into a
throwaway `/tmp` scratch directory, not added to this repo's tracked
`package.json`) via `getTextContent()`. Because the source PDFs lay out each
page in a mix of single-column prose and label/value pairs at different x/y
positions (labels and instructional side-notes interleaved with the form's
own content), each text item's `transform[4]`/`transform[5]` (x/y position)
was used to sort items by descending y (row, top to bottom) then ascending x
(column, left to right) before concatenation, reproducing genuine visual
reading order — the same technique GOV-2005 used for the Certificate of
Eligibility's purpose-of-entry grid.

**The critical extraction finding**, driving several of this document's
field/scope decisions: the two PDFs were extracted and diffed line-by-line.
The blank template's own header block (フリガナ／商号／本店／登記の事由 date)
is genuinely blank in `001249317.pdf` (no placeholder text after the label),
but its 登記すべき事項 ("matters to be registered") body — 「商号」から
「登記記録に関する事項」まで — retains the **identical** `○○商事株式会社`
placeholder content seen in the worked example, verbatim, including the same
share counts (800/200), capital amount (¥10,000,000), and officer names. This
is not a bug in either PDF; it reflects a real feature of the underlying
process: `登記すべき事項` is not written directly into boxes on this printed
page at all. It is a passage the applicant drafts separately and submits
either as an attached printout, on a CD-R, or via the Legal Affairs Bureau's
own online registration/deposit filing system — confirmed from the Bureau's
own linked guidance pages on the same index page:
<https://www.moj.go.jp/MINJI/minji06_00051.html> ("登記・供託オンライン
申請システムによる登記すべき事項の提出について" — "Submitting matters to be
registered via the Registration and Deposit Online Application System") and
<https://www.moj.go.jp/MINJI/MINJI50/minji50.html> ("登記すべき事項を記録し
た電磁的記録媒体（ＣＤ－Ｒ等）の提出について" — "Submitting an electromagnetic
recording medium (CD-R, etc.) recording the matters to be registered"). What
both PDFs print under `登記すべき事項` is therefore the Bureau's own worked
example of the *required content and format* of that separately-submitted
passage, not a set of literal boxes to write into on this page — this
document's `fields[]` nonetheless model every distinct data point that
passage requires, since an agent assembling a real submission needs each one
regardless of which channel (attached printout, CD-R, or online system)
ultimately carries it.

## What the application maps to

- **フリガナ / 商号 / 本店 / 登記の事由** (the blank template's own genuinely
  blank header fields) → `companyNameFurigana`, `companyName`,
  `headOfficeAddress`, `incorporationProcedureCompletionDate`.
  `companyName`/`headOfficeAddress` are reused (not modelled twice) for their
  restatement in the `登記すべき事項` passage and again in the signature/
  filing block — all three occurrences of each value are cited in the
  relevant field's `sourceRef`.
- **「公告をする方法」** (method of public notice) → `methodOfPublicNotice`,
  modelled as free text, not an enum. Company law (会社法第939条) recognizes
  several statutory methods (Official Gazette, a daily newspaper, or
  electronic public notice), but neither source document examined this cycle
  itself enumerates those other methods — both show only "官報に掲載してする"
  ("by publication in the Official Gazette"), the default when a company's
  articles do not specify otherwise. Modelling a 3-value enum from outside
  knowledge of the Companies Act, rather than from what these two source
  documents themselves print, would risk exactly the kind of unsourced
  enum-value fabrication this registry's `verify-sources.mjs` and review-gate
  process exist to catch — so this is disclosed here as a deliberate,
  conservative scope decision instead.
- **「目的」** (business purposes) → `businessPurposes`, one free-text field
  per this registry's established GSP-0009 treatment of a source's own
  numbered/repeating list (no native array type in GovSchema v0.3).
- **「発行可能株式総数」/「発行済株式の総数並びに種類及び数」** →
  `totalAuthorizedShares` / `totalIssuedShares`. The issued-shares heading
  itself also asks for share "type(s)" when more than one class is issued;
  both source documents populate only a single running total, consistent
  with a single class of ordinary shares (普通株式) — the common case for a
  small closely-held incorporation. A multi-class share breakdown is
  disclosed as out of scope below.
- **「資本金の額」** → `capitalAmount`. No statutory minimum capital applies
  in Japan since the 2006 Companies Act reform, so `validation.minimum` is
  set to `1` (a positive amount) rather than any specific floor.
- **「株式の譲渡制限に関する規定」** → `hasShareTransferRestriction`
  (boolean) + `shareTransferRestrictionClause` (`requiredWhen`
  `hasShareTransferRestriction` is `true`). Both source documents show the
  identical standard clause requiring the company's approval to acquire
  shares by transfer — modelled as a boolean gate (since a company could in
  principle omit this registered matter) plus the clause text itself.
- **「役員に関する事項」** (officer particulars) → `directorNames` (every
  director's name, semicolon-separated, per the same GSP-0009 repeating-table
  treatment used elsewhere in this registry, e.g.
  `jp/isa/certificate-of-eligibility-application`'s `familyInJapanDetails`)
  plus `representativeDirectorName` / `representativeDirectorAddress` for
  the director separately designated to represent the company (registered a
  second time together with an address, since a representative director's
  address — unlike an ordinary director's — is itself a public registration
  item). `hasAuditor` / `auditorNames` are modelled as an optional
  extension, grounded not in the worked example itself (which has no
  auditor) but in the source's own attachment note explicitly addressing the
  auditor case (see `documents[].identityVerificationDocumentsFile`'s
  `sourceRef`).
- **The filing block** (page 2 of the blank template) → `applicationDate`,
  `legalAffairsBureauOffice`, `contactPhoneNumber` (modelled optional,
  consistent with this registry's treatment of an unmarked contact-number
  line elsewhere in Japanese government forms), and the agent/proxy fields
  `filedByAgent` / `agentName` / `agentAddress` (`requiredWhen` `filedByAgent`
  is `true`), the latter three sourced from the *worked example's* own
  annotation on the agent row (the blank template's page 2 prints the row
  itself but not that explanatory annotation).
- **The attachment list** (「添付書類」) → `documents[]`, ten attachment
  requirements, several `required: false` or `requiredWhen`-gated per the
  source's own explanatory notes (e.g. the promoters' consent letter is only
  needed when certain matters are not already fixed in the articles of
  incorporation; the capital-amount certificate is unnecessary when
  incorporation capital is cash-only; the power of attorney is needed only
  when `filedByAgent` is `true`).

## What is NOT modelled (out of scope), and why

- **The other three published variants** of this same application (board of
  directors installed + incorporation by promoters, board of directors
  installed + public subscription, no board of directors + public
  subscription — rows 1-1, 1-2, 1-4 of the same index-page section) — each
  its own distinct template, a candidate for a future companion-schedule
  cycle, mirroring how this registry already splits Japan's own
  `jp/isa/certificate-of-eligibility-application` cover sheet from its
  category-specific supplements, and the Czech Republic's base tax return
  from its four Přílohy annexes.
- **The internal content of every attached supporting document** (the
  articles of incorporation's own 28 model articles; the promoters'
  consent/resolution letters; the investigation report; the capital-payment
  proof; the capital-amount certificate; the power of attorney) — each is
  modelled only as a `documents[]` attachment requirement, not decomposed
  field-by-field. These illustrative specimens are printed on pages 4-18 of
  both source PDFs purely as guidance for drafting each attachment, and are
  themselves candidates for future companion-schedule cycles.
- **The registration-fee/tax computation** (「課税標準金額」and
  「登録免許税」, page 2 of both source PDFs) — both source documents show
  課税標準金額 exactly equal to `capitalAmount`, and give 登録免許税's own
  formula in full: 0.7% of `capitalAmount`, with a ¥150,000 statutory floor,
  rounded down to the nearest ¥100 ("資本金の額の１０００分の７の額です。
  ただし、この額が１５万円に満たない場合は、１５万円になります。また、
  １００円未満の端数があるときは、その端数金額は切り捨てます。"). Both
  values are purely arithmetic derivations of `capitalAmount` with no
  independent input, so — per this registry's established
  excludable-arithmetic-vs-input test (refined across the Czech Republic's
  Příloha č. 3/4 tax-annex cycles) — neither is modelled as its own field.
- **「登記記録に関する事項」「設立」** — a fixed constant printed on every
  filing of this kind ("設立" / "Incorporation"), not a variable the
  applicant supplies; excluded as a non-field constant rather than modelled.
- **印鑑届書 (Seal Registration Notification)** — a related but legally
  separate filing, referenced in the worked example's own opening annotation
  ("代表取締役が申請書又は委任状に印鑑を押印する場合は、登記所に提出した
  印鑑を押印しなければなりません。印鑑の提出は、印鑑届書により行います。"),
  with its own distinct template/worked-example pair linked from the same
  index page (`001188608.pdf`/`001188212.pdf`) — out of scope for this
  document, a candidate for a future cycle.
- **The Word (`.docx`) edition** of the blank template
  (`001249253.docx`, linked alongside the PDF at the same index-page row) —
  not opened or cross-checked this cycle; the PDF's text-layer content is the
  basis for this document.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus three negative controls:

```
PASS [OK]   Scenario 1: worked-example values, filed by representative director personally
PASS [OK]   Scenario 2: sole-director incorporation with auditor, filed via agent
PASS [FAIL] Negative control 1: missing shareTransferRestrictionClause when required
    - MISSING required field: shareTransferRestrictionClause
PASS [FAIL] Negative control 2: missing agentName/agentAddress when filedByAgent=true
    - MISSING required field: agentName
    - MISSING required field: agentAddress
PASS [FAIL] Negative control 3: capitalAmount below minimum (0)
    - INVALID minimum for capitalAmount: 0 < 1

ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 reproduces the source's own worked-example values (fictional
company "○○商事株式会社" rendered here as the illustrative "○○商事株式会社"
placeholder itself, two directors, one also representative director, no
auditor, filed by the representative director personally — `filedByAgent:
false`). Scenario 2 is an independently-constructed fictional scenario (a
sole-founder incorporation, "藤崎コンサルティング株式会社", with an auditor
appointed and the application filed through a judicial-scrivener agent —
exercising `hasAuditor`/`auditorNames` and `filedByAgent`/`agentName`/
`agentAddress` together). The three negative controls confirm the check
script actually enforces `requiredWhen` (twice, for
`shareTransferRestrictionClause` and for the `filedByAgent`-gated agent
fields) and `validation.minimum` (rejecting a zero-yen `capitalAmount`)
rather than trivially passing everything. No defects were found in the
schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (314/314 including this document, plus 3/3
`mapping.json` companions) and
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0`
("1 directory, 6 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's third document in the registry (after
  `jp/isa/certificate-of-eligibility-application`, GOV-2005, and
  `jp/j-lis/individual-number-card-issuing-application`, GOV-2012), and its
  first in the Business Formation vertical — **Japan now stands at 3 of its
  6 verticals (Visa, National ID, Business Formation)**. DMV and Passport
  remain confirmed dead ends (GOV-2005).
- Agency slug `houmukyoku` (法務局, Legal Affairs Bureau) is a new JP
  authority segment, distinct from `isa` and `j-lis`; `jurisdiction.level` is
  `national` (the Legal Affairs Bureau system operates nationwide, even
  though a specific application is filed at a local branch/sub-office
  selected via `legalAffairsBureauOffice`).
- `id`/process slug `stock-company-establishment-registration-application`
  uses English, following this registry's established convention for a
  Japanese-only source with no official English name printed on the source
  itself (the same convention `jp/j-lis/individual-number-card-issuing-application`
  used, in that case for a source that also had an official English title).
- `version` set to `1.0.0`: like `jp/j-lis/individual-number-card-issuing-application`,
  this document models one complete, self-contained procedural variant in
  full (every page of its own application template, not a partial cover
  sheet awaiting an indispensable companion page from a different
  template) — the same basis this registry has used elsewhere for a `1.0.0`
  initial release.
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should prioritize the three sibling incorporation
variants (board of directors installed + incorporation by promoters or
public subscription; no board of directors + public subscription) and the
Seal Registration Notification (印鑑届書) as companion documents, all flagged
above as strong, unpursued leads on the same `houmukyoku.moj.go.jp` index
page.
