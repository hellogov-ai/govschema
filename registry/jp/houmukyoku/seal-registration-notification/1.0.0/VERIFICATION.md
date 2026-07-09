# Verification record — `jp/houmukyoku/seal-registration-notification` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2035). Its own
phased brief names the same six generic verticals (DMV, Business Formation,
Visa, Passport, Taxes, National ID & Civic Documents) every prior cycle of
this same recurring issue has already named. Per this registry's established
precedent for this recurring issue (GOV-1546, GOV-1574, GOV-2019, GOV-2026,
and others), the brief was treated as a prompt to re-scan CATALOG.md's own
"Known Gaps & Opportunities" section fresh, not as a literal, always-current
to-do list.

That section's own item 6 (built up across GOV-2005/GOV-2012/GOV-2019/GOV-2026)
already named the strongest, most concretely-sourced open candidate directly:
Japan's **Seal Registration Notification (印鑑届書)**, flagged since GOV-2019
as an open companion-schedule candidate on the same
`houmukyoku.moj.go.jp` index page that both of this registry's published
Houmukyoku company-formation schemas
(`jp/houmukyoku/stock-company-establishment-registration-application`,
`jp/houmukyoku/limited-liability-company-establishment-registration-application`)
were sourced from, and referenced by name in both of those schemas' own
`documents[]`/scope notes as a related-but-out-of-scope filing. This cycle
picked it up directly rather than re-screening for a brand-new candidate,
since it was already confirmed live and well-sourced by two prior cycles'
own screening notes.

## Sources examined

- **Document `(id, version)`:** `jp/houmukyoku/seal-registration-notification` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Legal Affairs Bureau (法務局), Ministry of Justice
  (`houmukyoku.moj.go.jp`).
- **Index page (fetched live, HTTP 200):**
  <https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html> ("商業・法人登記の
  申請書様式") — its own dedicated 印鑑届書 row links one blank template plus
  thirteen separate per-entity-type worked-example ("記載例") PDFs, each
  labeled distinctly from the blank-template link itself (unlike the
  incorporation-application rows this registry's two sibling schemas were
  sourced from, where the first PDF linked from each row turned out on
  inspection to be a worked example).
- **Blank template (fetched live, HTTP 200, 81174 bytes, 1 page):**
  <https://houmukyoku.moj.go.jp/homu/content/001188212.pdf> — labeled on the
  index page as the stock/共通 template ("様式") common to every entity type
  the Bureau registers, not tied to one specific company type. An Excel
  edition (`001206590.xlsx`) is linked alongside it and was not separately
  opened.
- **Worked example, stock company (fetched live, HTTP 200, 243835 bytes):**
  <https://houmukyoku.moj.go.jp/homu/content/001188608.pdf> — "第１　株式会社"
  section, used to cross-check the blank template's field labels against a
  filled specimen for the simplest (individual submitter, no corporate
  representative) case.
- **Worked example, membership company / 持分会社 (fetched live, HTTP 200,
  346332 bytes, 6 pages):**
  <https://houmukyoku.moj.go.jp/homu/content/001188610.pdf> — "第３　持分会社"
  section, the category covering Godo Kaisha (合同会社), whose own worked
  examples specifically illustrate the corporate-representative-member/
  performing-officer (職務執行者) scenario this document scopes out (see
  below) across four of its own six pages, plus a page-6 reference table of
  each membership-company subtype's own capacity-title vocabulary.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

### Bot-mitigation note

Unlike three prior Japan cycles' finding that `houmukyoku.moj.go.jp` returns
HTTP 403 to a plain default-`curl` User-Agent, this cycle's direct `curl -I`
check against the blank template's own URL (no browser User-Agent) returned
HTTP 200 on the first attempt — a narrower gate than previously assumed, not
applied uniformly across every path on this domain. A browser User-Agent
(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/124.0 Safari/537.36`) was used regardless, for consistency with
the sibling schemas' documented workaround and to avoid re-testing the
boundary of which specific paths are gated.
`node tools/verify-sources.mjs registry/jp/houmukyoku/seal-registration-notification/1.0.0`
reports "1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear" —
confirmed directly, immediately before opening this PR.

## Extraction method

The blank template has zero AcroForm/Widget annotations (confirmed via
`pdfjs-dist`'s `getAnnotations()` on its single page) but a full, genuine
Japanese text layer, extracted with `pdfjs-dist` (a throwaway `/tmp` scratch
install, not added to this repo's tracked `package.json`) via
`getTextContent()` — the same technique already used for this registry's
other Japan documents. Both worked examples were extracted the same way and
diffed against the blank template's own field labels to confirm every row's
meaning and to identify which annotated notes ((注１)–(注４), printed at the
foot of the form) govern which row:

- **(注１)** — the physical seal impression's own size constraint (a
  1cm–3cm square), not a data field.
- **(注２)** — seal-card carry-over instructions → `sealCardCarriedOver`,
  `priorSealCardNumber`, `predecessorName`.
- **(注３)** — instructions distinguishing the submitter-files-in-person case
  from the agent-files case (who signs, whose personal seal is affixed) →
  `filedByAgent` and the embedded power-of-attorney block.
- **(注４)** — the personal seal certificate attachment requirement, and its
  waiver when reusing the certificate already attached to a simultaneous
  registration application → `reuseSealCertificateFromIncorporationApplication`
  and the `personalSealCertificateFile` document entry.

An internal form-tracking code printed in one corner ("（乙号・８）", a
form-numbering convention analogous to a page/exhibit code) and the office-use
processing boxes ("印鑑処理番号", "受付 調査 入力 校合") are Bureau-internal,
not applicant-supplied data, and are excluded as non-fields — the same
treatment this registry gives every other document's office-use-only box.

## What the form maps to

- **商号・名称 / 本店・主たる事務所** → `entityName` / `headOfficeAddress` —
  the header's own entity-identity rows, worded to cover both a company (商号)
  and a non-company entity such as an NPO or incorporated association/
  foundation (名称), since the blank template is common to every entity type
  the Bureau registers, not company-specific.
- **会社法人等番号** → `corporateNumber`, optional; the worked stock-company
  example's own annotation states it is filled in only if already known and
  is unnecessary when this notification accompanies a brand-new entity's own
  establishment registration (no number has yet been assigned at that point) —
  directly parallel to how a brand-new entity has no seal card yet to carry
  over (`sealCardCarriedOver: false`).
- **資格** → `submitterCapacity`, modelled as free text rather than an enum.
  The blank template itself prints a baseline choice (代表取締役・取締役・
  代表理事・理事) plus a blank parenthetical for any other capacity; the
  membership-company worked example's own page-6 reference table fills in
  that parenthetical's meaning for 合名会社/合資会社/合同会社 (社員／代表社員／
  無限責任社員／有限責任社員／清算人／代表清算人, varying by subtype), but no
  single source examined enumerates every entity type's own full title set
  (e.g. NPOs', cooperatives', and school/medical corporations' own capacity
  titles are not covered by that table) — free text was chosen for the same
  reason `methodOfPublicNotice` was modelled as free text in the sibling
  incorporation schemas.
- **印鑑提出者「住所」「氏名」「フリガナ」「生年月日」** →
  `submitterAddress`/`submitterName`/`submitterNameFurigana`/
  `submitterDateOfBirth` — the seal submitter is always a natural person, even
  when standing in for a corporate representative member/director (see scope
  note below), so `submitterDateOfBirth` is a plain `date` field throughout.
- **印鑑カードの引継ぎ checkboxes** → `sealCardCarriedOver` (boolean),
  gating `priorSealCardNumber`/`predecessorName` via `requiredWhen` —
  irrelevant (false) for a brand-new entity, since no seal card yet exists.
- **届出人 checkboxes (印鑑提出者本人／代理人)** → `filedByAgent` (boolean),
  gating the notification's own embedded power-of-attorney block
  (`agentName`, `agentAddress`, `powerOfAttorneyDate`,
  `delegatesSealNotification`, `delegatesDocumentReturnRequest`) via
  `requiredWhen`. Unlike the sibling incorporation schemas' own agent/proxy
  fields (sourced only from a worked example, since the incorporation
  templates' blank forms either omit or under-annotate that row), this seal
  notification's blank template itself prints the complete power-of-attorney
  box verbatim, including both of its own independent delegated-power
  checkboxes — a stronger, directly-blank-template-sourced finding than either
  sibling schema's own agent/proxy fields.
- **市区町村長作成の印鑑証明書は，登記申請書に添付のものを援用する checkbox**
  → `reuseSealCertificateFromIncorporationApplication` (boolean), gating the
  `personalSealCertificateFile` document via `requiredWhen` (`equals: false`)
  — the form's own explicit waiver of a separate certificate attachment when
  filed simultaneously with a registration application that already encloses
  one.
- **（地方）法務局 支局・出張所 / 年月日届出** →
  `destinationLegalAffairsBureauOffice` / `notificationDate` — the filing
  block, directly parallel to the sibling schemas' own
  `legalAffairsBureauOffice`/`applicationDate` fields.

## What is NOT modelled (out of scope), and why

- **The corporate-representative-member (職務執行者) scenario** — when the
  entity's representative (e.g. a Godo Kaisha's 代表社員) is itself a
  corporation, the individual acting in its stead (職務執行者, "performing
  officer") files this notification instead, with materially different
  attachment requirements the membership-company worked example documents
  across four of its own six pages: a registered-matters certificate for the
  corporate representative member (waivable by citing its own company/
  corporate number, the same waiver this registry's
  `jp/houmukyoku/limited-liability-company-establishment-registration-application`
  sibling schema already models for its own `corporateMemberRegisteredMattersCertificateFile`);
  and, specifically when the performing officer is *not* itself the corporate
  member's own representative, an additional 保証書 ("guarantee letter") from
  that corporate member's own representative certifying the performing
  officer's seal — a distinct supporting-document type this document does not
  model at all. The source itself treats this as a clearly bounded, separate
  filing scenario (its own worked-example set gives it four dedicated pages,
  distinct from the individual-submitter case's own one page), so it is
  scoped out entirely for this v1.0.0 rather than partially modelled, and
  flagged here as a well-sourced candidate for a future companion-schedule
  cycle (the same worked example, `001188610.pdf`, already identifies and
  illustrates it).
- **The Excel (`.xlsx`) edition** of the blank template (`001206590.xlsx`,
  linked alongside the PDF at the same index-page row) — not opened or
  cross-checked this cycle; the PDF's text-layer content is the basis for
  this document.
- **The physical seal impression itself (届出印)** — printed on the template
  as a box for the actual ink stamp, not data the applicant supplies as text;
  excluded as a non-field, consistent with how this registry excludes every
  other document's physical-signature/stamp box.
- **Office-use-only boxes** (印鑑処理番号; 受付 調査 入力 校合; the
  「（乙号・８）」 internal form-tracking code) — Bureau-internal, not
  applicant-supplied; excluded as non-fields.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus four negative controls:

```
[PASS] Scenario A: brand-new Godo Kaisha, seal submitted alongside incorporation
       application, submitter files in person, no seal card yet, cert reused
       from incorporation filing
[PASS] Scenario B: existing stock company changing its seal, agent files,
       seal card carried over, own seal certificate attached
[PASS] Negative 1: filedByAgent true but agentName/agentAddress/
       powerOfAttorneyDate/delegatesSealNotification/
       delegatesDocumentReturnRequest missing
    errors: missing required field: agentName; missing required field:
    agentAddress; missing required field: powerOfAttorneyDate; missing
    required field: delegatesSealNotification; missing required field:
    delegatesDocumentReturnRequest
[PASS] Negative 2: sealCardCarriedOver true but priorSealCardNumber/
       predecessorName missing
    errors: missing required field: priorSealCardNumber; missing required
    field: predecessorName
[PASS] Negative 3: reuseSealCertificateFromIncorporationApplication false but
       no cert attached
    errors: missing required document: personalSealCertificateFile
[PASS] Negative 4: missing top-level required field (entityName)
    errors: missing required field: entityName

All scenarios behaved as expected.
```

Scenario A models a brand-new Godo Kaisha ("夢見合同会社") filing this
notification alongside its own establishment registration application — no
seal card yet (new entity), submitter files personally, and the personal
seal certificate is waived via `reuseSealCertificateFromIncorporationApplication`
since it already accompanies the registration application. Scenario B models
an unrelated, already-existing stock company ("丙山物産株式会社", reusing the
membership-company worked example's own fictional corporate name for
continuity) changing its representative's seal years after incorporation —
seal card carried over from a named predecessor, filed through an agent
(exercising the embedded power-of-attorney block in full), with its own
personal seal certificate actually attached. The four negative controls
confirm the check script enforces every `requiredWhen` gate (agent block,
seal-card carry-over, certificate waiver) and a top-level `required` field
rather than trivially passing everything. No defects were found in the schema
itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate-ajv.mjs registry/jp/houmukyoku/seal-registration-notification/1.0.0/schema.json
ok   registry/jp/houmukyoku/seal-registration-notification/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/jp/houmukyoku/seal-registration-notification/1.0.0`
("1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear") was
re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's fifth document in the registry (after
  `jp/isa/certificate-of-eligibility-application`, GOV-2005;
  `jp/j-lis/individual-number-card-issuing-application`, GOV-2012;
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  GOV-2019; and
  `jp/houmukyoku/limited-liability-company-establishment-registration-application`,
  GOV-2026) and its second in the `houmukyoku` authority segment's own
  Business Formation vertical, but this document is a **companion/supporting
  filing**, not a new company-type application — Japan's vertical count
  remains 3 of 6 (Visa, National ID, Business Formation), unchanged by this
  cycle.
- Reuses the existing `houmukyoku` (法務局, Legal Affairs Bureau) authority
  segment already established by both sibling company-formation schemas.
  `jurisdiction.level` is `national` for the same reason as those siblings
  (the Legal Affairs Bureau system operates nationwide, even though a specific
  notification is filed at a local branch/sub-office selected via
  `destinationLegalAffairsBureauOffice`).
- `process.type` is `filing` (この届書 — "this notification/filing"), distinct
  from the sibling schemas' `registration`, since this document itself does
  not register a new entity — it registers or changes a seal, whether or not
  that happens to coincide with an entity's own establishment registration.
- `version` set to `1.0.0`: this document models one complete, self-contained
  procedural template in full for its own scoped scenario (individual seal
  submitter, with or without an agent) — the Legal Affairs Bureau publishes
  only one blank 印鑑届書 template common to every entity type, so there is no
  sibling-variant ambiguity to flag, unlike the Kabushiki Kaisha incorporation
  application's four board/subscription-method variants.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should prioritize the three sibling Kabushiki Kaisha
incorporation variants still flagged as open in CATALOG.md's own Known Gaps
section, and this document's own out-of-scope corporate-representative-member
(職務執行者) scenario as a companion-schedule candidate, both on the same
`houmukyoku.moj.go.jp` index page.
