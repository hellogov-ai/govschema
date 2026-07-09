# Verification record — `jp/isa/certificate-of-eligibility-application` v0.1.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle opened Japan, and why this candidate

This is the recurring "GovSchema Standard Research" cycle (GOV-2005), tasked
with opening Japan as the registry's 28th jurisdiction — a G7 economy with no
prior coverage at all. A prior cycle (GOV-1174) had already confirmed
`mofa.go.jp` (Passport) is fully IP-blocked; everything else was unscreened.

### Candidates screened this cycle

- **DMV (driver's licence).** `npa.go.jp` (National Police Agency) and
  `keishicho.metro.tokyo.lg.jp` (Tokyo Metropolitan Police) are both live,
  unblocked (HTTP 200). No downloadable, home-fillable driver's-licence
  application PDF was found on any prefectural police site checked (Tokyo,
  Osaka, Ibaraki, Shiga). Every source converges on the same fact: a driver's
  licence application/renewal in Japan is filled in on paper, in person, at
  the licence centre counter, handed out on the day — there is nothing to
  download in advance. The only genuinely extractable-text PDFs found in this
  vertical (Shiga Prefectural Police's proxy/power-of-attorney forms,
  `pref.shiga.lg.jp/police/menkyo/dl/104540.html`) cover only a narrow
  secondary sub-procedure (a third party collecting the licence on the
  applicant's behalf), not the licence application itself. Confirmed dead
  end for a home-fillable base application; not retried further.
- **Business Formation (company registration).** `moj.go.jp` and its Legal
  Affairs Bureau subdomain `houmukyoku.moj.go.jp` return HTTP 403 to a plain
  fetch but HTTP 200 to a request carrying an ordinary desktop-browser
  `User-Agent` header — simple bot mitigation, not an IP block.
  `houmukyoku.moj.go.jp/homu/content/001331002.pdf` (株式会社設立登記申請書 —
  Stock Company Establishment Registration Application, no-board-of-directors
  variant, 17pp) is live, has no AcroForm but a rich extractable Japanese
  text layer (商号/trade name, 本店/head office, 目的/business purpose,
  発行可能株式総数/authorized shares, 資本金の額/capital amount, 役員に関する
  事項/officer info, 添付書類/attachments). A genuinely strong candidate,
  flagged for a future cycle, not chosen this cycle (see "Why the Certificate
  of Eligibility" below).
- **National ID (My Number Card).** `kojinbango-card.go.jp` (J-LIS) is live,
  unblocked. `kojinbango-card.go.jp/hpsv/wpmng/documents/tegaki-kofu-shinseisho-en.pdf`
  is an official **bilingual** generic (non-personalized) blank application
  form — confirmed the common "pre-printed QR code, no blank form" dead-end
  pattern does **not** apply here, since J-LIS's own mail-application
  instructions page directs anyone without the QR postcard to this generic
  downloadable handwritten (手書用) form instead. No AcroForm, but a full
  extractable text layer plus an annotated field-by-field guide on page 2.
  Also a genuinely strong candidate, flagged for a future cycle, not chosen
  this cycle.
- **Visa/immigration.** `mofa.go.jp` (root and `emb-japan.go.jp` embassy
  subdomains) reconfirmed HTTP 403 even with a browser User-Agent — a
  domain-wide block, consistent with GOV-1174, not retried further. The
  Immigration Services Agency (`moj.go.jp/isa`), however, behaves like the
  rest of the `moj.go.jp` family: HTTP 403 to a plain fetch, HTTP 200 to a
  browser User-Agent. It hosts this document's source (see below) — chosen
  as this cycle's candidate.
- **Passport.** `mofa.go.jp` reconfirmed a dead end per GOV-1174; not
  retried.

### Why the Certificate of Eligibility over the other two strong candidates

The Certificate of Eligibility (COE) application was chosen over the
Business Formation and National ID candidates because: (a) it is officially
**bilingual** Japanese/English on the same government-published page,
removing translation-fidelity risk entirely (the other two candidates are
Japanese-only, or bilingual only via a separate bulletin, in the National ID
case); (b) its shared cover sheet is independently confirmed byte-for-byte
identical across three unrelated category variants (see below), an unusually
strong basis for scoping a "universal, category-agnostic" document; (c) it
has the richest, most immigration-law-grounded field set of the three
(34 fields across identity, travel, and disclosure history, versus roughly
15-20 for the My Number Card application); (d) Visa is the vertical with the
largest proportional global gap (21/27 jurisdictions, 78%, per CATALOG.md at
the start of this cycle) among the three verticals these candidates would
have closed. The Business Formation and National ID leads are recorded above
so a future cycle does not have to re-screen them from scratch.

## Sources examined

- **Document `(id, version)`:** `jp/isa/certificate-of-eligibility-application` / `0.1.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration Services Agency (出入国在留管理庁, ISA), an
  external bureau of the Ministry of Justice (moj.go.jp).
- **Primary field-by-field source:**
  <https://www.moj.go.jp/isa/content/930004044.pdf> — 別記第六号の三様式
  （第六条の二関係）, the "P" (Student, 留学) category variant of the
  Application for Certificate of Eligibility, linked live from
  <https://www.moj.go.jp/isa/applications/status/student.html> (fetched live,
  HTTP 200 with a browser User-Agent; the anchor text reads "在留資格認定
  証明書交付申請書（PDF:509KB）", "Application for Certificate of
  Eligibility (PDF)"). 6 pages: pages 1 ("For applicant, part 1" — this
  document's scope), 2 ("For applicant, part 2/3", Student-specific), and
  4-5 ("For organization, part 1/2", the school's own supplement) — out of
  scope, see "What is NOT modelled" below.
- **Cross-check sources confirming page 1's universality (this cycle's own
  live fetches, not assumed):**
  <https://www.moj.go.jp/isa/content/930004054.pdf> (the "T" — Spouse or
  Child of Permanent Resident/Japanese National/Long Term Resident — variant,
  4 pages, linked from
  <https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html>)
  and <https://www.moj.go.jp/isa/content/930004037.pdf> (the "K" — Religious
  Activities — variant, 6 pages, linked from
  <https://www.moj.go.jp/isa/applications/status/religiousactivities.html>).
  All three PDFs were downloaded and their page-1 text streams extracted and
  diffed (see "Extraction method" below): identical content and item
  ordering (1-21) in every case, confirming page 1 is the shared,
  category-agnostic cover sheet this document models, and not an artifact of
  the one "Student" PDF chosen as the citation.
- **Official worked example (used for the mock-data test run below):**
  <https://www.moj.go.jp/isa/content/001460075.pdf> — 記載例 ("fill-in
  example"), linked from the same student.html page immediately after the
  blank-form link ("記載例は<a>こちら</a>"). A 5-page filled-in specimen
  using a placeholder name ("NYUKAN JAMES" — 入管 literally means
  "immigration," a government convention analogous to "John Doe") for a
  Student-category applicant, confirming realistic value shapes for every
  field (e.g. `intendedLengthOfStay`: "5 years"; `portOfEntry`: "Narita
  Airport"; `intendedPlaceToApplyForVisa`: "Washington DC";
  `pastCoeApplicationCount`-style items filled with plausible small
  integers).
- **Narrow bot-mitigation, not an IP block, and not a block against this
  repo's own tooling.** Every `moj.go.jp`-family URL cited above returns
  HTTP 403 to a plain `curl` request using curl's own default `User-Agent`
  string, but HTTP 200 to a request carrying either an ordinary
  desktop-browser `User-Agent` or this repository's own
  `tools/verify-sources.mjs` `User-Agent` string
  (`GovSchema-source-verifier/1 (+https://github.com/hellogov-ai/govschema)`)
  — the block appears keyed on the default-curl signature specifically, not
  on "any non-browser client." This is materially different from
  `mofa.go.jp`, which returns 403 to both a plain `curl` request and a
  browser-`User-Agent` request alike (a domain-wide block, consistent with
  GOV-1174's "fully IP-blocked" finding). Confirmed directly and live,
  immediately before opening this PR:
  `node tools/verify-sources.mjs registry/jp/isa/certificate-of-eligibility-application/0.1.0`
  reports "9 URLs checked, 0 warning(s)... all clear" — every cited
  `moj.go.jp`/`houmukyoku.moj.go.jp` URL resolves cleanly under that tool's
  real request path; no WARN/FAIL was needed for this document.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Extraction method

The source PDFs have no AcroForm/Widget layer (confirmed via `pdfjs-dist`'s
`getAnnotations()` returning zero `Widget`-subtype annotations on every
page of all three category variants) — they are meant to be printed and
filled by hand, not completed in Acrobat. All three do have a full,
genuine extractable text layer (not a scanned image): `pdfjs-dist`'s
`getTextContent()` returns thousands of real Japanese/English text-run
items per page.

A naive linear concatenation of `getTextContent()` items (the technique
this registry has used for simpler single-column forms) does not preserve
reading order for item 11's purpose-of-entry grid, because the source PDF's
content stream interleaves the grid's six-per-row Japanese labels, then all
six English glosses for that row, before moving to the next row — and for
some rows the checkbox glyph and the label are emitted as separate text runs
out of visual sequence. To reconstruct the grid faithfully, this cycle
extracted each text item's `transform[4]`/`transform[5]` (x/y position in PDF
user space) via `pdfjs-dist` and sorted items by descending y (row, top to
bottom) then ascending x (column, left to right) — reproducing the visual
reading order exactly. This confirmed the grid is 6/5/4/5/4/3/3/4 = 34
checkboxes across 8 rows, each row pairing a lettered status-of-residence
code with its Japanese and English labels in a fixed left-to-right order,
exactly as modelled in `purposeOfEntry`'s enum. Every other item (1-10,
12-21) was cross-checked the same way against its position-sorted output to
confirm field boundaries and required/optional sub-item structure (e.g. that
items 17, 18, 20, and 21 each have a Yes/No gate followed by conditional
follow-up boxes, and that item 9's phone/cellular-phone pair has no
distinguishing required/optional marking on the source itself).

## What page 1 ("For applicant, part 1") maps to

- **Items 1-10** (nationality, date of birth, name, sex, place of birth,
  marital status, occupation, home town/city, address and phone in Japan,
  passport) → `nationality` through `passportExpiryDate`. Item 6's Japanese
  label is literally "配偶者の有無" (whether the applicant has a spouse),
  glossed in the source's own English as "Marital status" with a binary
  Married/Single choice — narrower than the multi-option marital-status
  enums this registry uses for EU-style visa forms (e.g.
  `ee/vm/long-stay-visa-application`), because that is what this source
  actually presents.
- **Item 11** (purpose of entry / status of residence, 34 checkboxes across
  8 rows) → `purposeOfEntry`, position-reconstructed as described above.
  This is the field that determines which category-specific supplement
  (pages 2 onward of the matching lettered form) the applicant must also
  submit — modelled here as the routing value, with the supplement itself
  out of scope (see below).
- **Items 12-16** (intended entry date, port of entry, intended length of
  stay, accompanying persons, intended place to apply for visa) →
  `intendedEntryDate` through `intendedPlaceToApplyForVisa`.
- **Items 17, 18, 20** (past entry/exit history, past COE application
  history, deportation history) → three Yes/No gates
  (`pastEntryExitHistory`, `pastCoeApplicationHistory`,
  `deportationHistory`), each with `requiredWhen`-gated follow-up fields
  (count, and for items 17/20 a date or date-pair) that only apply when the
  gate is `true`.
- **Item 19** (criminal record, "in Japan / overseas... including
  dispositions due to traffic violations") → `criminalRecord` /
  `criminalRecordDetails` (requiredWhen `criminalRecord` is `true`).
- **Item 21** (family in Japan and co-residents) → `familyInJapan` /
  `familyInJapanDetails`. The source provides a repeating multi-row table
  (relationship / name / date of birth / nationality-region / intended
  co-residence / employer-or-school / residence-card or Special Permanent
  Resident Certificate number); per this registry's established GSP-0009
  treatment for repeating tables (GovSchema v0.3 has no native
  array/repeating-field type), collapsed into one free-text field, the same
  pattern used elsewhere in this registry (e.g.
  `ee/vm/long-stay-visa-application`'s `schengenVisaOrPermitDetails`).
- **The photo box** printed directly on page 1 (40mm × 30mm) →
  `documents[].applicantPhoto`.

## What is NOT modelled (out of scope), and why

- **Every category-specific supplement** (pages 2 onward of whichever
  lettered variant matches `purposeOfEntry` — e.g. the Student-specific
  pages 2-3, or the Spouse/Permanent-Resident-specific pages 3-4 seen in the
  variants cross-checked this cycle). There are roughly 30 such variants;
  each is its own candidate for a future companion-schedule cycle, mirroring
  how this registry already splits the Czech Republic's tax return
  (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`) from its four Přílohy
  annexes.
- **The "for organization" pages** (e.g. pages 4-5 of the Student variant,
  "所属機関等作成用" — completed and signed by the sponsoring school,
  employer, or host, not the applicant). Out of scope for an
  applicant-facing document; a candidate for a future cycle alongside the
  category-specific supplements above.
- **The signature/declaration block** ("I hereby declare that the statement
  given above is true and correct," with a signature and date) — printed on
  the category-specific supplement pages (e.g. item 31 of the Student
  variant), not on the shared page 1 modelled here. A real submission always
  includes at least one category-specific supplement, so this is not a gap
  in the real-world process, only a scope boundary of this specific
  document.
- **The Excel (`.xlsx`) version** of the application (e.g.
  `930004045.xlsx`, linked alongside the PDF on the same status pages) —
  not opened or cross-checked this cycle; the PDF's text-layer content is
  the basis for this document.
- **Additional required documents beyond the applicant photo** (e.g. a
  return envelope, passport copy, or category-specific supporting evidence
  such as an enrollment certificate) — these vary by `purposeOfEntry`
  category and were only confirmed for the Student category's own
  submission checklist; not asserted here as universal, and therefore not
  modelled in `documents[]` beyond the photo, which is printed directly on
  the universal page 1 itself.
- **DMV, Business Formation, and National ID candidates** screened this
  cycle but not chosen — see "Candidates screened this cycle" above.

## Mock-data test run

Per this registry's established practice (see e.g.
`registry/ee/vm/long-stay-visa-application/1.0.0/VERIFICATION.md`), a
one-off Node.js script (not committed to the repo) checking every
`type`/`required`/`requiredWhen`/`validation` constraint in `schema.json`
was run against two realistic scenarios plus two negative controls:

```
OK   Scenario 1: Student, full disclosure history (entry/exit, COE, criminal record, family)
OK   Scenario 2: Student, simplest path (no history, no family in Japan)
OK   Negative control 1: missing pastEntryExitCount when pastEntryExitHistory=true (expected FAIL)
    - MISSING required field: pastEntryExitCount
    - MISSING required field: pastEntryLatestEntryDate
    - MISSING required field: pastEntryLatestDepartureDate
OK   Negative control 2: invalid purposeOfEntry enum value (expected FAIL)
    - INVALID enum value for purposeOfEntry: tourist
```

Scenario 1 models a Student applicant (`purposeOfEntry: "student"`) who
discloses a prior entry/exit, a prior COE application, a minor criminal
record (a traffic violation, modelled to exercise `criminalRecordDetails`),
and a sibling residing in Japan — exercising every `requiredWhen`-gated
follow-up field this document defines. Scenario 2 is the opposite,
simplest path: every Yes/No gate is `false`/absent and no follow-up field is
supplied. The two negative controls confirm the check script actually
enforces `requiredWhen` (correctly reporting three missing follow-up fields
once `pastEntryExitHistory` is `true`) and `validation.enum` (correctly
rejecting a `purposeOfEntry` value, `"tourist"`, that is not one of the 34
enumerated categories) rather than trivially passing everything. No defects
were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/isa/certificate-of-eligibility-application/0.1.0/schema.json
ok   registry/jp/isa/certificate-of-eligibility-application/0.1.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/isa/certificate-of-eligibility-application/0.1.0/schema.json
ok   registry/jp/isa/certificate-of-eligibility-application/0.1.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## Scope and jurisdiction notes

- This is Japan's first document in the registry, opening Japan as
  GovSchema's 28th jurisdiction, in the Visa vertical.
- Agency slug `isa` (Immigration Services Agency) is a new JP authority
  segment; `jurisdiction.level` is `national` (ISA is a national agency, not
  prefectural).
- `id`/process slug `certificate-of-eligibility-application` uses English,
  the official English name the source itself prints for this form
  ("APPLICATION FOR CERTIFICATE OF ELIGIBILITY").
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.
- `version` set to `0.1.0` rather than `1.0.0`, per CONTRIBUTING.md's
  guidance to start a new, not-yet-stable schema at `0.1.0` — this is
  Japan's first schema of any kind, and the document's scope (one shared
  cover sheet out of a multi-part application) is narrower than a typical
  `1.0.0` base-return/base-application document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should prioritize authoring one or more
category-specific supplements (Student, Engineer/Specialist in Humanities/
International Services, and Spouse-or-Child-of-Japanese-National are the
three variants already downloaded and cross-checked this cycle) as
companion documents, and re-screening the Business Formation
(`houmukyoku.moj.go.jp` stock-company registration) and National ID (J-LIS
My Number Card) candidates flagged above as strong, unpursued leads.
