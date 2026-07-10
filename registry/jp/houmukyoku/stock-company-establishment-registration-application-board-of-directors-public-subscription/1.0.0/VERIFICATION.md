# Verification record — `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2152). The task
brief itself is generic (catalog what exists, research what is missing, author
a schema for a genuinely open gap). Per this registry's established pattern
(see e.g. `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`'s
own VERIFICATION.md), the brief's own named National ID candidates (DE
Steuer-ID, SG NRIC loss/damage/re-registration, NZ RealMe, "remaining voter
registration") were re-checked first against CATALOG.md and confirmed already
resolved by prior cycles (`de/finanzamt/tax-identification-number`,
`sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
`nz/dia/realme-verified-identity`; every tracked voter-registration gap is
either published or a confirmed dead end/legally-closed window) — the same
finding every recent cycle of this issue has independently reached.

Before committing to this candidate, several genuinely open, unscreened
verticals were scouted fresh this cycle to check for a wider-scope opportunity
(opening a new vertical rather than deepening an existing one):

- **Sweden's Passport and National ID verticals** — both the Polisen
  passport/national-ID-card process and the Skatteverket ID-card process were
  searched. Both are confirmed to be fully appointment-based, in-person,
  biometric-capture processes with the application itself completed
  electronically at the counter — `polisen.se`'s own forms library lists only
  a minors' appendix form (`531-2`) and a citizenship-establishment
  investigation form (`531-1`), neither a general passport/ID-card
  application; `skatteverket.se`'s own English-language ID-card guide
  confirms "the application is completed electronically at the service
  centre" with no downloadable form. Consistent with this registry's
  established in-person-issuance dead-end pattern (e.g. CZ Passport/National
  ID, PT domestic Passport); not pursued further this cycle.
- **Chile's Passport and National ID (cédula) verticals** — Registro Civil e
  Identificación's own `chileatiende.gob.cl` guidance and a third-party
  "INSTRUCTIVO" PDF were checked. The INSTRUCTIVO PDF turned out to be a
  scanned-image specimen (0 extractable characters via `pdfjs-dist`, matching
  this registry's established scanned-image dead-end pattern, e.g. IRN's
  Portuguese pacto-social specimens); the PDI's own habilitación/renewal form
  for foreign nationals returned HTTP 403. Both processes are confirmed
  ClaveÚnica-login-gated appointment bookings with fingerprint/photo capture
  entirely in person, no field-level form. Not pursued further this cycle.
- **Chile's Visa vertical** — the National Migration Service's
  `tramites.extranjeria.gob.cl` portal was checked; it is the same class of
  authenticated online-portal gate already found for Chile's ClaveÚnica-based
  services in prior cycles, with no downloadable field-by-field guide found
  this cycle. Not pursued further this cycle.
- **UAE Passport** — ICP's own `icp.gov.ae`/`u.ae` pages confirm the process
  runs entirely through the "UAEICP" smart app / online smart-services
  platform, with no downloadable PDF application form referenced anywhere.
  Not pursued further this cycle.

None of these produced a stronger, ready-to-author source than CATALOG.md's
own standing Known Gaps item 6, which explicitly names the Legal Affairs
Bureau's two remaining sibling stock-company-incorporation variants (rows 1-2
and 1-4 of the same `houmukyoku.moj.go.jp` index page already sourced for the
two already-published siblings, rows 1-3 and 1-1) as this registry's sole
open, well-sourced Japan companion-schedule candidates — and explicitly flags
row 1-2 (board installed + public subscription) as the natural next pick
"once this simpler board-axis variant establishes the officer-particulars/
auditor pattern" (GOV-2049's own VERIFICATION.md), which GOV-2049 did. This
cycle picked up that named candidate directly.

Row 1-2 (board installed, public subscription) was picked over the remaining
row 1-4 (no board, public subscription) because it combines with an
already-published sibling on only one axis at a time — the board-of-directors
axis is already fully modelled (GOV-2049), so this document isolates and
tests only the second axis (public subscription vs. incorporation by
promoters) against that same board-installed baseline, rather than changing
two axes from the no-board/promoter-only baseline at once. Row 1-4 remains a
real, open, well-sourced candidate for a future cycle.

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **Blank template (fetched live, HTTP 200, 584493 bytes, with a browser
  User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001249316.pdf> — item 1-2
  ("株式会社設立登記申請書（取締役会を設置する株式会社の募集設立）", "Stock
  company with a board of directors, public subscription") of the same index
  page (<https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html>, section
  "１　設立") every other Japan stock-company-incorporation document in this
  registry is sourced from. 23 pages, zero AcroForm/Widget annotations on
  every page (confirmed via pdfjs-dist's `getAnnotations()`), a full genuine
  Japanese text layer.
- **Companion worked example (fetched live, HTTP 200, 659157 bytes, with a
  browser User-Agent):**
  <https://houmukyoku.moj.go.jp/homu/content/001252642.pdf> — the Bureau's
  own filled-in specimen ("記載例") of the identical row 1-2 variant, titled
  on its own first line "（取締役会を設置する株式会社の募集設立）". 21 pages,
  2 annotations (both non-form callout markers, confirmed not
  `Widget`/AcroForm fields), same placeholder company name "○○商事株式会社"
  throughout as every other Japan document in this registry sourced from this
  index page.
- **The index page itself** (fetched live, HTTP 200, 143773 bytes):
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> — re-confirmed row
  1-2's two linked files (`001249316.pdf` blank template, `001252642.pdf`
  worked example, plus a `.docx` edition not opened) and the full four-variant
  table already recorded in both already-published siblings' own
  VERIFICATION.md files:

  | Row | Variant | Worked example | Blank template |
  |---|---|---|---|
  | 1-1 | Board of directors installed, incorporation by promoters (発起設立) | `001331097.pdf` | `001249314.pdf` (published, `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`) |
  | **1-2** | **Board of directors installed, public subscription (募集設立)** | **`001252642.pdf` (this document's worked example)** | **`001249316.pdf` (this document's source)** |
  | 1-3 | No board of directors, incorporation by promoters (発起設立) | `001331002.pdf` | `001249317.pdf` (published, `jp/houmukyoku/stock-company-establishment-registration-application`) |
  | 1-4 | No board of directors, public subscription (募集設立) | `001331010.pdf` | `001249318.pdf` |

- **Cross-check source:** the board-installed/promoter-only sibling's own
  blank template, re-fetched fresh this cycle (`001249314.pdf`, 623400
  bytes) — used only to isolate, line-by-line, exactly what differs between
  the two board-installed variants (promoter-only vs. public subscription),
  not re-verified independently as its own claim (that document's own review
  gate, GOV-2051, already covered that).
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation note

Re-confirms the finding recorded by every prior Japan cycle since GOV-2005:
`houmukyoku.moj.go.jp` returns HTTP 403 to a plain default-`curl` request but
HTTP 200 to a request carrying an ordinary desktop-browser `User-Agent`
string (`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/124.0 Safari/537.36`) — narrow bot mitigation keyed on the
default-curl signature, not an IP-level block. All four files (blank
template, worked example, cross-check sibling blank template, index page)
were fetched successfully with that browser User-Agent on the first attempt.
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0`
reports "1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all
clear" — confirmed directly, immediately before opening this PR.

## Extraction method

Both PDFs were extracted with `pdfjs-dist` (pinned `3.11.174`, installed into
a throwaway `/tmp` scratch directory, not added to this repo's tracked
`package.json`) via `getTextContent()`, sorting each page's text items by
descending y (row, top to bottom) then ascending x (column, left to right)
before concatenation — the same x/y-coordinate row-grouping technique used
for every other Japan document in this registry sourced from a non-AcroForm
PDF with mixed prose/label-value layout. Zero AcroForm/Widget annotations
were confirmed on every page of both PDFs via `getAnnotations()`.

**A disclosed text-positioning artifact, found and cross-checked rather than
silently modelled as fact:** the blank template's own attachment-list row for
"定款" (articles of incorporation) renders, via naive y-coordinate row
grouping, as a garbled merged string "定款人の同意書 １通" — closer
inspection of the raw per-item x/y coordinates shows two text runs sharing an
identical y-value (333.9): "定款" at x=104.4 and "人の同意書" at x=127.2 (the
"発起" glyphs of what should read "発起人の同意書" on their own, separate
row are simply missing from the extracted text, not merely mispositioned).
The very next row (y=317.6) renders "発起人の同意書" correctly and
completely on its own line. Rather than trust this ambiguous row, the
companion worked example (`001252642.pdf`) was checked for the same two
list items and renders them cleanly as two separate, correctly-spaced rows:
"定款 １通" (y=256) and "発起人の同意書 ○通" (y=240) — matching, item for
item, the already-published board-installed/promoter-only sibling's own
"定款 １通" / "発起人の同意書 通" pair. This document's own `documents[]`
entries for `articlesOfIncorporationFile` and `promotersConsentLetterFile`
are modelled on the worked example's clean two-row reading (and disclose the
blank template's own artifact in their `sourceRef`), not on the blank
template's own garbled single row — the same class of font/text-positioning
artifact this registry has previously disclosed rather than silently trusted
(e.g. the AT/BMI national-identity-card cycle's own disclosed font artifact).

**The remaining, substantive extraction findings, driving this document's
field/scope decisions**, came from diffing this variant's own blank template
and worked example against the board-installed/promoter-only sibling's own
source PDFs:

1. **The registered 'matters to be registered' content (登記すべき事項) is
   structurally and substantively identical to the board-installed/
   promoter-only sibling's own annex** — same officer-particulars shape
   (directors, board-elected representative director, mandatory auditor with
   optional accounting-only scope limitation), same branch-office and
   board-/auditor-installed-company registered-matter lines, and the same
   illustrative values (800 authorized shares, 200 issued shares initially in
   the sibling vs. this document's own worked example showing the identical
   figures) — confirming the public-subscription/promoter-only axis has no
   effect on this content, only on the attachment list (see below) and the
   registration-reason date's own fixed phrase.
2. **The registration-reason phrase changes from '発起設立の手続終了' to
   '募集設立の手続終了'**, and the worked example carries a distinct
   explanatory annotation this variant's sibling does not have: '創立総会の
   終了の日等を記載してください（会社法第911条第2項参照）' ('record the date
   the organizational general meeting concluded, etc. — see Companies Act
   art. 911(2)') — grounding this document's `organizationalMeetingCompletionDate`
   field name and description in the source's own reference to the
   organizational meeting as the date's basis, distinct from the sibling's
   own promoter-completion-date framing.
3. **The attachment list gains three items not on the board-installed/
   promoter-only sibling's own list**, each grounded in the public-
   subscription procedure's own statutory requirements: 株式申込書 (share
   subscription application forms, or a bank/trust-company handling
   certificate as an alternative — needed because third-party subscribers
   must formally apply for shares, unlike promoter-only incorporation);
   創立総会議事録 (organizational general meeting minutes — Companies Act
   arts. 87-92 require a meeting of all subscribers before a 募集設立
   incorporation is complete, with no counterpart step under 発起設立); and
   the sibling's plain "払込みを証する書面" (a simple payment certificate) is
   replaced by the stricter "払込金保管証明書" (a custody certificate
   prepared by a bank or trust company handling the payment, per its own
   attachment note '銀行等の払込みを取り扱う機関が作成したものです') —
   Companies Act art. 64's own heightened funds-custody requirement for
   funds solicited from third-party subscribers, versus art. 34's simpler
   payment-certification standard for promoter-only funding.
4. **Every other attachment item (定款, 発起人の同意書,
   設立時代表取締役を選定したことを証する書面,
   設立時取締役、設立時代表取締役及び設立時監査役の就任承諾書, 印鑑証明書,
   本人確認証明書, 設立時取締役及び設立時監査役の調査報告書及びその附属書類,
   資本金の額の計上に関する設立時代表取締役の証明書, 委任状) is worded and
   scoped identically to the board-installed/promoter-only sibling's own
   list**, confirming the board-of-directors axis (already fully modelled in
   that sibling) is unaffected by the public-subscription/promoter-only axis
   this document isolates.

## What the application maps to

- **フリガナ / 商号 / 本店** → `companyNameFurigana`, `companyName`,
  `headOfficeAddress` — identical source rows and treatment to both
  already-published sibling documents.
- **登記の事由** → `organizationalMeetingCompletionDate` (renamed from the
  sibling's `incorporationProcedureCompletionDate` to reflect the source's
  own organizational-meeting framing — extraction finding 2 above).
- **「公告をする方法」/「目的」/「発行可能株式総数」/「発行済株式の総数並び
  に種類及び数」/「資本金の額」** → `methodOfPublicNotice`, `businessPurposes`,
  `totalAuthorizedShares`, `totalIssuedShares`, `capitalAmount` — unchanged
  from both already-published sibling documents; confirmed by extraction
  finding 1 above.
- **「株式の譲渡制限に関する規定」** → `hasShareTransferRestriction` +
  `shareTransferRestrictionClause` — unchanged from the board-installed/
  promoter-only sibling, including its own disclosed Companies Act art.
  139(1) default-approving-body note (this document shares that sibling's
  board-installed status, not the no-board sibling's shareholders'-meeting
  default).
- **「役員に関する事項」（取締役／代表取締役／監査役）** → `directorNames`,
  `representativeDirectorName`, `representativeDirectorAddress`, `hasAuditor`
  (required), `auditorNames` (required), `auditorScopeLimitedToAccounting` —
  unchanged in kind and treatment from the board-installed/promoter-only
  sibling document, per extraction finding 1 above (same board-election
  mechanism for the representative director; same mandatory-auditor
  Companies Act art. 327(2) reasoning).
- **The filing block** (page 2-3 of the blank template) → `applicationDate`,
  `legalAffairsBureauOffice`, `contactPhoneNumber`, `filedByAgent` /
  `agentName` / `agentAddress` — unchanged in kind and treatment from both
  already-published sibling documents.
- **The attachment list** (「添付書類」) → `documents[]`. Nine of the twelve
  `id`s are the board-installed/promoter-only sibling's own `id`s, reused
  verbatim (deliberate reuse, not re-specification, per this registry's
  composability/reuse convention): `articlesOfIncorporationFile`,
  `promotersConsentLetterFile`, `representativeDirectorSelectionDocumentFile`,
  `acceptanceOfAppointmentLettersFile`, `sealCertificatesFile`,
  `identityVerificationDocumentsFile`,
  `investigationReportAndAttachmentsFile`, `capitalAmountCertificateFile`,
  `powerOfAttorneyFile`. Three new `id`s model the public-subscription-only
  attachments disclosed in extraction finding 3 above:
  `shareApplicationFormsFile`, `fundsCustodyProofDocumentFile` (replacing the
  sibling's `proofOfPaymentDocumentFile` — a deliberately distinct `id`,
  since the two attachments are legally distinct instruments, not merely a
  relabeling of the same one), and `organizationalMeetingMinutesFile`.

## What is NOT modelled (out of scope), and why

- **The remaining sibling variant** (no board of directors + public
  subscription, row 1-4 of the same index-page section) — its own distinct
  template, left as a candidate for a future companion-schedule cycle, per
  the "Why this candidate, this cycle" reasoning above.
- **Committee-based governance structures** (指名委員会等設置会社,
  監査等委員会設置会社) and **the non-public-company-with-accounting-advisor
  exception** to Companies Act art. 327(2) — neither source PDF examined this
  cycle documents either alternative structure; this document models only
  the plain board-of-directors-plus-company-auditor case its own worked
  example actually shows, the same scope boundary as the board-installed/
  promoter-only sibling document.
- **A promoter/third-party-subscriber split of `totalIssuedShares`, or of
  the capital amount** — neither source PDF's own registered-matters content
  breaks the issued-share total or capital amount down by subscriber category;
  both are registered only as single running totals (extraction finding 1).
- **The internal content of every attached supporting document** (the
  articles of incorporation's own model articles; the promoters' consent
  letter; the share-subscription application forms; the funds-custody
  certificate; the organizational-meeting minutes; the investigation report;
  the capital-amount certificate; the power of attorney) — each modelled
  only as a `documents[]` attachment requirement, not decomposed
  field-by-field, mirroring both already-published sibling documents' own
  scope decisions.
- **The registration-fee/tax computation** (「課税標準金額」and「登録免許税」)
  — both source documents show the identical formula already documented in
  both already-published siblings' own VERIFICATION.md files (0.7% of
  `capitalAmount`, ¥150,000 statutory floor, rounded down to the nearest
  ¥100) — a pure arithmetic derivation of `capitalAmount` with no
  independent input, excluded per this registry's established
  excludable-arithmetic-vs-input test.
- **「登記記録に関する事項」「設立」，「取締役会設置会社に関する事項」
  「取締役会設置会社」and「監査役設置会社に関する事項」「監査役設置会社」**
  — each a fixed, non-variable constant that follows automatically from this
  document's own premise (this is the board-installed variant; a `true`
  `hasAuditor` implies the company is, by definition, an auditor-installed
  company), not an independent data point the applicant supplies — the same
  treatment as the board-installed/promoter-only sibling document.
- **The "other possible attachments" examples** the worked example's own
  page 2 lists beyond the twelve core attachment types (a
  share-registrar-agent contract, when one is appointed; a court-appointed
  inspector's investigation report and related professional certificates,
  for larger in-kind contributions requiring court inspection under
  Companies Act art. 33) — both narrower, rarer edge cases the source itself
  frames as supplementary examples ("それ以外の添付書類の例"), not part of
  the twelve-item core attachment list either variant's blank template
  prints; left unmodelled, consistent with
  `investigationReportAndAttachmentsFile`'s own existing scope boundary
  (ordinary directors'/auditor's investigation report, not a court-appointed
  inspector's).
- **The Word (`.docx`) edition** of the blank template, linked alongside the
  PDF at the same index-page row — not opened or cross-checked this cycle.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus seven negative controls:

```
PASS [OK]   Scenario 1: worked-example-style values, board-installed public-subscription incorporation, filed personally
PASS [OK]   Scenario 2: same incorporation filed through a judicial-scrivener agent
PASS [FAIL]   Negative control 1: missing hasAuditor/auditorNames
    - MISSING required field: hasAuditor
    - MISSING required field: auditorNames
PASS [FAIL]   Negative control 2: missing shareTransferRestrictionClause when required
    - MISSING required field: shareTransferRestrictionClause
PASS [FAIL]   Negative control 3: missing agentName/agentAddress when filedByAgent=true
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

ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 is an independently-constructed fictional scenario modelled on the
worked example's own illustrative shape (three directors, one also
representative director, one auditor with scope limited to accounting,
filed by the representative director personally — `filedByAgent: false`).
Scenario 2 re-uses the same incorporation but exercises `filedByAgent` /
`agentName` / `agentAddress` together (filed through a judicial-scrivener
agent) and flips `auditorScopeLimitedToAccounting` to `false`. The seven
negative controls confirm the check script actually enforces
`required`/`requiredWhen` (for `hasAuditor`/`auditorNames`, unconditionally
required in this variant; `shareTransferRestrictionClause`; the
`filedByAgent`-gated agent fields and `powerOfAttorneyFile`; and the three
public-subscription-only attachments — `shareApplicationFormsFile`,
`fundsCustodyProofDocumentFile`, `organizationalMeetingMinutesFile`, each
unconditionally required in this variant) and `validation.minimum`
(rejecting a zero-yen `capitalAmount`) rather than trivially passing
everything. No defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0/schema.json
ok   registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (`find registry -name schema.json | xargs node
tools/validate.mjs`, this document plus every prior document — 332/332
passed) and
`node tools/verify-sources.mjs registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription/1.0.0`
("1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's eighth document in the registry (after
  `jp/isa/certificate-of-eligibility-application`,
  `jp/j-lis/individual-number-card-issuing-application`,
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  `jp/houmukyoku/limited-liability-company-establishment-registration-application`,
  `jp/houmukyoku/seal-registration-notification`,
  `jp/nta/individual-income-tax-final-return`, and
  `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`)
  and its third in the Business Formation vertical alongside two company-type
  variants — **Japan remains at 4 of its 6 verticals (Visa, National ID,
  Business Formation, Taxes)**; this document deepens rather than widens
  Business Formation coverage. DMV and Passport remain confirmed dead ends
  (GOV-2005).
- `id`/process slug
  `stock-company-establishment-registration-application-board-of-directors-public-subscription`
  reuses the already-published board-installed sibling's own base slug with
  a further `-public-subscription` suffix, following this registry's
  established suffix convention for a same-authority, same-underlying-process
  variant (e.g. ZA SARS's ITR14 Annexure family:
  `-dormant`, `-micro-business`, `-body-corporate`, `-small-business`,
  `-medium-large-business`; CH-ZH's Hilfsblatt-A pair:
  `-vereinfachte-buchfuehrung`, `-kaufmaennische-buchfuehrung`).
- `version` set to `1.0.0`: this document models one complete,
  self-contained procedural variant in full (every page of its own
  application template), the same basis this registry has used for every
  other Japan document's initial release.
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-10** (6
months). A future review should prioritize the one remaining sibling
incorporation variant (no board of directors + public subscription, row 1-4
of the same `houmukyoku.moj.go.jp` index page) as a companion document, the
registry's last remaining open Japan stock-company-incorporation candidate on
this index page.
