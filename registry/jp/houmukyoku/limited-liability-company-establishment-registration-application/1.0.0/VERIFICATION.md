# Verification record — `jp/houmukyoku/limited-liability-company-establishment-registration-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2026). Its own
phased brief names four candidates as "focus" areas for the National ID/Civic
Documents vertical (DE Steuer-ID, SG NRIC loss/damage + re-registration, NZ
RealMe, remaining voter registration). All four were re-checked first against
this catalog and the registry, and all were confirmed already resolved by
prior cycles:

- **DE Steuer-ID** → `de/finanzamt/tax-identification-number` (published).
- **SG NRIC loss/damage + re-registration** → `sg/ica/identity-card-replacement`
  + `sg/ica/identity-card-reregistration` (both published).
- **NZ RealMe** → `nz/dia/realme-verified-identity` (published).
- **"Remaining voter registration"** — every jurisdiction's voter-registration
  gap this catalog's own "Known Gaps" section tracks is either already
  published (e.g. `de/bundeswahlleiterin/voter-registration-abroad`,
  `nz/electoral-commission/voter-registration`) or logged as a confirmed dead
  end/legally-closed window (e.g. Colombia's overseas registration microsite no
  longer resolving; Brazil's Título Net nationwide-closed under Lei
  no. 9.504/1997 art. 91 until 2026-11-03) — see CATALOG.md's "Known Gaps &
  Opportunities" and "Confirmed dead ends" sections. This recurring issue's
  generic phased brief is treated, per this registry's own established
  precedent (GOV-1546, GOV-1574, and others), as a prompt to re-scan the
  catalog fresh rather than a literal, always-current to-do list.

CATALOG.md's own "Known Gaps" item 6 (added across GOV-2005/GOV-2012/GOV-2019)
explicitly flagged, as Japan's next candidates, the three sibling Kabushiki
Kaisha (Stock Company) incorporation variants and the Seal Registration
Notification (印鑑届書) — both found on the same `houmukyoku.moj.go.jp` index
page that Japan's existing
`jp/houmukyoku/stock-company-establishment-registration-application` was
sourced from. Re-screening that same index page this cycle turned up a
stronger, previously-unflagged candidate on the identical page: the **Godo
Kaisha (合同会社) Establishment Registration Application** — a wholly distinct
company-type template, not a procedural variant of the Kabushiki Kaisha form,
analogous to how this registry already models more than one company-formation
entity type for other jurisdictions (e.g. Germany's
`de/gewerbeamt/business-registration` and
`de/handelsregister/gmbh-formation-musterprotokoll`). This was judged a
stronger next step than the flagged sibling variants/Seal Registration
Notification (each a narrower delta over an already-modelled template) since
it deepens Japan's Business Formation vertical with a genuinely new company
type used by real, well-known entities (e.g. Amazon Japan G.K., Apple Japan
G.K., both incorporated as Godo Kaisha).

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/limited-liability-company-establishment-registration-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **First fetched, turned out to be a worked example (fetched live, HTTP 200,
  494551 bytes):** <https://houmukyoku.moj.go.jp/homu/content/001252889.pdf> —
  the Legal Affairs Bureau's own filled-in worked example ("記載例") of the
  Godo Kaisha establishment application, 10 pages, using the placeholder
  company name "○○商店合同会社" throughout — not a blank fillable form. This
  is the identical trap GOV-2019 first hit for the Kabushiki Kaisha form (a
  search-indexed PDF resolving to the illustrated "記載例" edition rather than
  the blank "申請書様式").
- **The genuinely blank counterpart template, traced from the index page
  (fetched live, HTTP 200):**
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> ("商業・法人登記の
  申請書様式"), section "１　設立", row "1-5" ("合同会社設立登記申請書"):
  linking to **申請書様式** (application form template), the true blank form
  this document is modelled from:
  <https://houmukyoku.moj.go.jp/homu/content/001249560.pdf> (fetched live,
  HTTP 200, 454977 bytes, 12 pages; a Word edition, `001249513.docx`, is
  linked alongside it and was not separately opened).
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation note

Reconfirms the finding recorded by three prior cycles (GOV-2005, GOV-2012,
GOV-2019): `houmukyoku.moj.go.jp` returns HTTP 403 to a plain default-`curl`
request but HTTP 200 to a request carrying an ordinary desktop-browser
`User-Agent` string (`Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36`) — narrow
bot mitigation keyed on the default-curl signature, not an IP-level block. Both
PDFs cited above, and the guidance index HTML page, were fetched successfully
with that browser User-Agent on the first attempt.
`node tools/verify-sources.mjs registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0`
reports "1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear" —
confirmed directly, immediately before opening this PR.

## Extraction method

Both PDFs have zero AcroForm/Widget annotations on every page (confirmed via
`pdfjs-dist`'s `getAnnotations()` — `widgets: 0` on all 10/12 pages of the
worked example and blank template respectively) but a full, genuine Japanese
text layer, extracted with `pdfjs-dist` (pinned `3.11.174`, installed into a
throwaway `/tmp` scratch directory, not added to this repo's tracked
`package.json`) via `getTextContent()`, sorting each page's text items by
descending y (row) then ascending x (column) to reproduce genuine visual
reading order — the same technique already used for
`jp/houmukyoku/stock-company-establishment-registration-application` and
`jp/isa/certificate-of-eligibility-application`.

**The blank template and worked example were diffed line-by-line**, surfacing
one finding that reproduces the Kabushiki Kaisha sibling schema's own
extraction finding and one genuine distinction from it — both disclosed as
sourcing caveats rather than silently resolved:

1. **The blank template's `登記すべき事項` body is byte-for-byte identical
   placeholder content to the worked example**, not genuinely blank — the
   same pattern already documented for the Kabushiki Kaisha sibling schema,
   not a discrepancy from it. Both PDFs' `登記すべき事項` passages read
   identically from 「商号」○○商事合同会社 through the same 「目的」 list,
   the same `資本金の額` (金５００万円), and the same managing/representative
   member and performing-officer names. The **only** difference between the
   two PDFs' `登記すべき事項` bodies is the trailing `課税標準金額`/
   `登録免許税` tax-computation line immediately after it: the blank template
   leaves the amount unfilled (`金 円`), while the worked example fills it in
   (`金５００万円`) with an explanatory annotation ("資本金の額を記載します。").
   This is the same underlying feature the Kabushiki Kaisha sibling schema's
   VERIFICATION.md already documents and explains: `登記すべき事項` is not
   written into boxes on the printed page at all — it is drafted separately
   and submitted as an attachment, on a CD-R, or via the Legal Affairs
   Bureau's own online filing system, so the Bureau's blank template prints
   the worked example's placeholder text as a drafting guide rather than
   leaving the passage empty.
2. **The agent/proxy (代理人) pathway has no distinct labeled row on the blank
   template at all.** The blank template's entire filing block — attachment
   list, signature block, destination Legal Affairs Bureau, and contact phone
   number — fits on its page 2 (`grep`-verified: no occurrence of "代理人"
   anywhere in the blank template's extracted text). The worked example, by
   contrast, spreads the identical filing block across its own pages 2–3 and
   its extra page 3 carries the 代理人 row, its explanatory note ("代理人が
   申請する場合にのみ記載し、代理人の印鑑（認印）を押します。この場合、
   代表社員の押印は、必要ありません。"), and a worked value ("上記代理人
   ○○○○"). This differs from the Kabushiki Kaisha sibling's finding (whose
   blank template prints the 代理人 row itself, just without the explanatory
   annotation) — here the row is absent from the blank template outright.
   `filedByAgent`/`agentName`/`agentAddress` are modelled as optional fields on
   the strength of the worked example's own evidence that this is a real,
   supported filing pathway (the same Legal Affairs Bureau system that accepts
   an agent-filed Kabushiki Kaisha application would have no reason to
   categorically bar an agent-filed Godo Kaisha one), but this caveat is
   disclosed rather than silently treated as equivalent to the sibling
   schema's finding.

## What the application maps to

- **フリガナ / 商号 / 本店 / 登記の事由** (the blank template's own genuinely
  blank header fields) → `companyNameFurigana`, `companyName`,
  `headOfficeAddress`, `incorporationProcedureCompletionDate`. `companyName`/
  `headOfficeAddress` are reused (not modelled twice) for their restatement in
  the `登記すべき事項` passage and again in the filing block.
- **「公告をする方法」** → `methodOfPublicNotice`, modelled as free text for
  the identical reason disclosed in the Kabushiki Kaisha sibling schema:
  neither source document here enumerates Company Act art. 939's other
  statutory public-notice methods, only the default (Official Gazette).
- **「目的」** → `businessPurposes`, one free-text field per this registry's
  established GSP-0009 treatment of a source's own numbered/repeating list.
- **「資本金の額」** → `capitalAmount`. No statutory minimum capital applies
  in Japan since the 2006 Companies Act reform, so `validation.minimum` is set
  to `1`. The source's own registration-tax line (「登録免許税」) computes 0.7%
  of this amount with a **¥60,000** statutory floor — distinct from the
  ¥150,000 floor the Kabushiki Kaisha sibling schema documents for its own
  registration tax — but, per this registry's established
  excludable-arithmetic-vs-input test (refined across the Czech Republic's
  Příloha annex cycles), this is a pure arithmetic derivation of `capitalAmount`
  with no independent input and is not modelled as its own field. The
  differing floor is disclosed here in `capitalAmount`'s own description for
  completeness, not modelled.
- **「社員に関する事項」（業務執行社員／代表社員／職務執行者）** — the Godo
  Kaisha structure's central difference from the Kabushiki Kaisha sibling
  schema: a Godo Kaisha has no shareholders, shares, directors, or board; it is
  run by 社員 ("members"), any of whom — unlike a kabushiki-gaisha's directors
  — may itself be a corporation rather than an individual. Modelled as:
  `managingMemberNames` (every managing member's name, semicolon-separated,
  the same repeating-table convention `directorNames` uses in the sibling
  schema) plus `representativeMemberName`/`representativeMemberAddress` for
  the member separately designated to represent the company (registered a
  second time together with an address, exactly parallel to the sibling
  schema's `representativeDirectorName`/`representativeDirectorAddress`).
  `representativeMemberIsCorporation` (boolean) and `hasCorporateManagingMember`
  (boolean) capture the two distinct "a member is itself a corporation" cases
  the source's own attachment notes address differently (see documents[]
  below); `performingOfficerName`/`performingOfficerAddress`
  (`requiredWhen` `representativeMemberIsCorporation` is `true`) model the
  individual (職務執行者, "performing officer") a corporate representative
  member must designate to act in its stead, since a corporation cannot act
  in that capacity in person.
- **The filing block** (page 2 of the blank template) → `applicationDate`,
  `legalAffairsBureauOffice`, `contactPhoneNumber` (present, unmarked, on the
  blank template's own page 2 — modelled optional per this registry's
  established treatment of an unmarked contact-number line), and the
  agent/proxy fields `filedByAgent`/`agentName`/`agentAddress`
  (`requiredWhen` `filedByAgent` is `true`), sourced from the worked example's
  own page 3 only, per the sourcing caveat disclosed above.
- **The attachment list** (「添付書類」) → `documents[]`, nine attachment
  requirements. `corporateMemberRegisteredMattersCertificateFile` uses a
  composite `requiredWhen` (`any` of `representativeMemberIsCorporation` or
  `hasCorporateManagingMember`, GSP-0013's Condition grammar), reflecting the
  source's own note that a registered-matters certificate is needed whichever
  kind of corporate member is involved, while
  `performingOfficerSelectionDocumentFile`/
  `performingOfficerAcceptanceOfAppointmentFile` gate on
  `representativeMemberIsCorporation` alone (the source's own note limits
  those two documents to the corporate-*representative*-member case, not a
  corporate managing member generally) — this distinction is stated explicitly
  in the source's own attachment note: "（合同会社を代表する社員が法人である
  場合には、次の①から③までの書面が必要です。また、業務執行社員が法人であ
  る場合には、次の①の書面が必要です。）", present on both the blank template
  and worked example.

## What is NOT modelled (out of scope), and why

- **The internal content of every attached supporting document** (the
  articles of incorporation's own model articles; the representative-member/
  head-office/capital decision document; the proof-of-payment document; the
  capital-amount certificate; the power of attorney) — each is modelled only
  as a `documents[]` attachment requirement, not decomposed field-by-field,
  mirroring the identical scope decision in the Kabushiki Kaisha sibling
  schema. These illustrative specimens are printed on pages 5-12 of the blank
  template purely as guidance for drafting each attachment, and are themselves
  candidates for future companion-schedule cycles.
- **The registration-fee/tax computation** (「課税標準金額」and「登録免許税」)
  — both source documents give the formula in full (0.7% of `capitalAmount`,
  ¥60,000 statutory floor, rounded down to the nearest ¥100) — a pure
  arithmetic derivation of `capitalAmount` with no independent input; excluded
  per this registry's established excludable-arithmetic-vs-input test.
- **「登記記録に関する事項」「設立」** — a fixed constant printed on every
  filing of this kind ("設立" / "Incorporation"), not a variable the applicant
  supplies; excluded as a non-field constant.
- **印鑑届書 (Seal Registration Notification)** — a related but legally
  separate filing, referenced in the worked example's own opening annotation
  (page 1: "代表社員が申請書又は委任状に印鑑を押印する場合は、登記所に提出
  した印鑑を押印するしなければなりません。印鑑の提出は、印鑑届書により行い
  ます。"), with its own distinct template/worked-example pair linked from the
  same index page — out of scope for this document, still a candidate for a
  future cycle (as already flagged in CATALOG.md's Known Gaps for the
  Kabushiki Kaisha sibling).
- **The Word (`.docx`) edition** of the blank template (`001249513.docx`,
  linked alongside the PDF at the same index-page row) — not opened or
  cross-checked this cycle; the PDF's text-layer content is the basis for this
  document.
- **Multiple representative members** — Japanese law permits more than one
  代表社員, but neither source document models more than one at a time;
  `representativeMemberName`/`Address` are modelled as singular fields,
  consistent with the sibling schema's singular `representativeDirectorName`.
  A multi-representative-member scenario is out of scope for this v1.0.0.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`
(including the composite `any` condition)/`validation` constraint in
`schema.json` was run against two realistic scenarios plus four negative
controls:

```
PASS [OK]   Scenario 1: worked-example values, corporate representative member, filed personally
PASS [OK]   Scenario 2: individual members only, filed via judicial scrivener agent
PASS [FAIL] Negative control 1: representativeMemberIsCorporation=true but performingOfficerName/Address missing
    - MISSING required field: performingOfficerName
    - MISSING required field: performingOfficerAddress
    - MISSING required document: performingOfficerSelectionDocumentFile
    - MISSING required document: performingOfficerAcceptanceOfAppointmentFile
PASS [FAIL] Negative control 2: filedByAgent=true but agentName/powerOfAttorneyFile missing
    - MISSING required field: agentName
    - MISSING required field: agentAddress
    - MISSING required document: powerOfAttorneyFile
PASS [FAIL] Negative control 3: capitalAmount below minimum (0)
    - INVALID minimum for capitalAmount: 0 < 1
PASS [FAIL] Negative control 4: hasCorporateManagingMember=true but registered-matters certificate missing
    - MISSING required document: corporateMemberRegisteredMattersCertificateFile

ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 reproduces the worked example's own values (fictional company
"○○商店合同会社", a corporate representative member "○○商事株式会社" with
its own designated performing officer, one further individual managing
member, filed by the representative member's performing officer personally —
`filedByAgent: false`). Scenario 2 is an independently-constructed fictional
scenario (a two-individual-member Godo Kaisha, "藤崎コンサルティング合同会社",
no corporate member anywhere, filed through a judicial-scrivener agent —
exercising `filedByAgent`/`agentName`/`agentAddress` together with both
corporate-member booleans left `false`). The four negative controls confirm
the check script actually enforces `requiredWhen` (three times, including once
for the composite `any` condition) and `validation.minimum` rather than
trivially passing everything. No defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0/schema.json
ok   registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0/schema.json
ok   registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation and
`node tools/verify-sources.mjs registry/jp/houmukyoku/limited-liability-company-establishment-registration-application/1.0.0`
("1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's fourth document in the registry (after
  `jp/isa/certificate-of-eligibility-application`, GOV-2005;
  `jp/j-lis/individual-number-card-issuing-application`, GOV-2012; and
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  GOV-2019) and its second in the Business Formation vertical — Japan's
  vertical count remains 3 of 6 (Visa, National ID, Business Formation); this
  document deepens the Business Formation vertical with a second company type
  rather than opening a new vertical.
- Reuses the existing `houmukyoku` (法務局, Legal Affairs Bureau) authority
  segment already established by the sibling Kabushiki Kaisha schema.
  `jurisdiction.level` is `national` for the same reason as that sibling
  schema (the Legal Affairs Bureau system operates nationwide, even though a
  specific application is filed at a local branch/sub-office selected via
  `legalAffairsBureauOffice`).
- `id`/process slug `limited-liability-company-establishment-registration-application`
  uses "Limited Liability Company" as the English rendering of 合同会社 (Godo
  Kaisha) — the term used by real Godo Kaisha entities themselves in their own
  English trade names (e.g. "Amazon Japan G.K.", "Apple Japan G.K.", where
  "G.K." abbreviates "Godo Kaisha"), consistent with this registry's
  established convention for a Japanese-only source with no single official
  English name printed on the source itself.
- `version` set to `1.0.0`: like its Kabushiki Kaisha sibling, this document
  models one complete, self-contained procedural template in full (every page
  of its own application template, not a partial cover sheet awaiting an
  indispensable companion page from a different template) — the Legal Affairs
  Bureau publishes only one Godo Kaisha establishment template (unlike
  Kabushiki Kaisha's four board/subscription-method variants), so there is no
  sibling-variant ambiguity to flag for this entity type.
- Conditional requiredness uses `requiredWhen` (GSP-0013), including one
  composite `any` condition (`corporateMemberRegisteredMattersCertificateFile`)
  — the first use of GSP-0013's boolean composition grammar in this
  registry's Japan documents, consistent with every other recent document's
  use of the shared Condition grammar.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should still prioritize the three sibling Kabushiki
Kaisha incorporation variants and the Seal Registration Notification (印鑑届書)
flagged by the immediately prior cycle (GOV-2019), both still open, unpursued,
well-sourced candidates on the same `houmukyoku.moj.go.jp` index page.
