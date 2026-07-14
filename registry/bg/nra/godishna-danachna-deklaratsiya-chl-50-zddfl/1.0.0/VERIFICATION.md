# Verification record — `bg/nra/godishna-danachna-deklaratsiya-chl-50-zddfl` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2821**. This schema **adds a
second schema to Bulgaria's Taxes vertical**.

**Duplicate-concurrent-run note, added after this schema was first
authored:** a separate, independent execution of the same authoring run
also produced a schema for GOV-2821 — `bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse`
(NRA Form ОКД-5, self-employed-person registration), merged first as PR
[#466](https://github.com/hellogov-ai/govschema/pull/466) — before this
schema (PR [#467](https://github.com/hellogov-ai/govschema/pull/467)) was
aware of it. Per this registry's established duplicate-concurrent-run
reconciliation practice, the two are kept as separate, non-overlapping
schemas rather than one being discarded, since they model genuinely
different NRA forms and the registry does not cap one schema per vertical
per jurisdiction. #466 carries the "opens Bulgaria (51st jurisdiction)"
claim in `CATALOG.md`; this document is presented as an addition to the
Taxes vertical it already opened. See `CATALOG.md`'s Executive Summary for
both updates.

## Jurisdiction/vertical screening this cycle

The cycle's own primary lead — NRA's "Декларация за регистрация на
самоосигуряващо се лице" (self-employed-person registration declaration,
Business Formation) — was screened first. The direct `nra.bg` content page
for it (`https://nra.bg/wps/portal/nra/documents/insurance/naredba.obshtestveno.osiguryavane.morski.litsa/ee0b7711-f4dc-4d2b-ac21-3e6366c4eedd`)
is a WebSphere Portal navigation shell with no fillable-document attachment
of its own (unlike the Taxes lead below, its underlying `wcm/connect` content
page carries no `vp-download-attachments` block at all) — a genuine dead end
for a first-party fetch, not merely hard to navigate. Third-party mirrors
(`hamixbg.com`, `trox-bg.com`, `tera-bg.com`) named in this cycle's briefing
were not pursued further once the Taxes lead below turned out to be a
first-party, unauthenticated, substantially richer source.

The Taxes lead — NRA's annual individual income tax return, Обр. 2001,
"Годишна данъчна декларация по чл. 50 от ЗДДФЛ" — was fetched directly from
`nra.bg`'s own document page and found to be a strong, genuine, unauthenticated,
first-party source (see below), so it was chosen over further-screening DMV
(МВР/КАТ), Visa (МВнР), Passport (МВР), and National ID (МВР) leads. National
ID was spot-checked anyway (search-only, no fetch) via МВР's own published
process description, which states the application "се попълва и разпечатва
на гишето" (is filled in and printed at the counter) with civil-registry data
auto-populated by staff — a staff-completed, non-independently-fillable
source, consistent with this registry's other MVR/counter-service dead ends;
not pursued further. DMV, Visa, and Passport were not independently fetched
this cycle once the Taxes lead's strength was confirmed — logged as open,
unscreened Bulgaria backlog candidates for a future cycle.

## Source verification (independently fetched this cycle)

- **Source page:** `https://nra.bg/wps/portal/nra/documents/documents_priority/0db5e77f-4b35-419e-85ce-99927af497fb`
  ("Годишна данъчна декларация по чл. 50 от ЗДДФЛ") — the WebSphere Portal
  wrapper page carries no direct `href` to the attachment in its rendered
  HTML (confirmed: no `.pdf`/`.doc`/`.zip` href present in the fetched page
  source); the actual download link was found by fetching the underlying
  `wcm/connect` content fragment directly:
  `https://nra.bg/wps/wcm/connect/agency/site/documents/documents_priority/0db5e77f-4b35-419e-85ce-99927af497fb`,
  which renders a `vp-download-attachments` block with one attachment link.
- **Fetched file:** `https://nra.bg/wps/wcm/connect/nra.bg25863/cc035cb3-1ede-4600-bd2c-c7d8174b5e1d/Декларация+по+чл.+50+за+2025+г.+всички+приложения.zip?MOD=AJPERES`
  (this schema's `source.url`, with the CACHEID query parameter dropped:
  independently re-fetched both with and without it and confirmed byte-identical,
  so `source.url` records the shorter, stable form).
  - **HTTP 200**, `Content-Type: application/zip`, **638,754 bytes**.
  - **`sha256` (whole ZIP):** `f68db65db877e5607a3da2c248f076208064eb5915399c6ba5ccb5622a42ead2`.
  - Page's own "Дата на публикуване" (publication date): **Dec 29, 2025**.
  - The ZIP contains the current declaration (`образец 2001-1.doc`), its
    deceased-person variant (`образец 2001в.doc`), and 13 numbered annex/
    companion-form `.doc`/`.docx` files, plus a nested ZIP of the insurable-
    income reference (Обр. 2004). Extracted with Python's `zipfile` module
    (no `unzip` binary available in this sandbox).
- **Modeled file:** `образец 2001-1.doc` (Обр. 2001, the root declaration,
  distinct from `образец 2001в.doc` — a deceased-person variant this v1.0.0
  does not model).
  - **`sha256`:** `036d08164ba52cc0c1259bdf087663170d21c1dd620bc101c59c3b225294886e`.
  - **303,616 bytes.**

## Extraction method — no PDF/AcroForm technique applies to this source

NRA distributes Обр. 2001 and every sibling annex only as Microsoft Word
`.doc`/`.docx` files, not as an AcroForm PDF (independently confirmed: no PDF
edition was found on `nra.bg` itself or on any of several third-party
accounting-site mirrors turned up by search, e.g. `tita.bg`,
`schetovodnakantoravarna.com` — all of which also serve `.doc`). The
`pdfjs-dist`/render-and-widget-correlation technique this registry uses for
scanned/AcroForm PDFs therefore does not apply here; there is no `pdftotext`,
`antiword`, `catdoc`, `LibreOffice`/`soffice`, or Python `python-docx` in this
sandbox to lean on either. Text was extracted with the npm package
`word-extractor@1.0.4` (installed standalone in a scratch directory, not
committed), which parses the legacy OLE/Compound-File `.doc` binary format
directly:

```
$ node extract.js "образец 2001-1.doc" > obr2001-1.txt
```

**A material, disclosed extraction limitation:** `.doc`'s printed checkbox
glyphs are rendered from a symbol font (e.g. Wingdings), and `word-extractor`
(like every other text-only `.doc` reader available in this sandbox) does not
render symbol-font glyphs — they extract as blank/whitespace, while the
surrounding label text survives. This was directly observable for the
declaration's own checkbox items (e.g. "6. Местно лице >>", "7. Чуждестранно
лице >>" — the `>>` mark for these two is itself literal cross-reference
notation printed in the template, distinct from the actual checkbox glyph
which is invisible in extraction) and, more materially, for **three explanatory
notes describing when Part II (authorized-proxy/legal-representative
identification) must be completed** — the source text makes clear these are
three real, distinct conditions ("деклараторът е чуждестранно физическо лице
и декларацията се подава чрез пълномощник с постоянен адрес в страната";
"деклараторът е малолетно, непълнолетно или поставено под запрещение...";
"декларацията се подава от пълномощник"), each presumably tied to its own
checkbox glyph somewhere in the header area, but the exact per-condition
label/position of each checkbox could not be independently confirmed from
plain-text extraction alone, and no PDF/rasterizable edition of this specific
`.doc` could be produced in this sandbox (no LibreOffice/soffice available)
to visually cross-check. **Modeling decision, disclosed rather than
guessed away:** collapsed the three conditions into a single boolean,
`filedByRepresentative`, gating Part II's own required fields — see
`schema.json`'s own field `description` for the verbatim disclosure. This is
the one place in this schema where the field-level structure is inferred
from the instructions text rather than directly read off an unambiguous
per-widget position, and it is called out here for a future reviewer with
LibreOffice/an equivalent rasterizer available to confirm or refine.

Everything else in the document — every numbered Part I/II/III/IV/V item,
every printed footnote, every row code (4001-4012, 40121-401245) — was mapped
directly from the extracted text, which preserves the original table-cell
tab-separation cleanly enough to reconstruct the row/column structure by
inspection (`repr()`-level inspection of raw lines, not just a visual dump,
to confirm tab boundaries where the printed layout was ambiguous).

## Field derivation, by form part

- **Part I — Данни за данъчно задълженото лице (taxpayer identification).**
  Tax year; a one-time-correction-after-deadline flag (Art. 53(2)); the
  taxpayer's ID number + a 5-value ID-type code (EGN/LN/LNCh/NRA service
  number/EIK); name (given/patronymic/family); an optional correspondence
  address (5 sub-fields, printed as applicable "only when different from the
  permanent address" already on file); optional phone/email; a resident/
  non-resident boolean (the source's own items 6 "Местно лице" and 7
  "Чуждестранно лице" collapsed into one boolean, consistent with this
  registry's `ro/anaf` `nonResident` precedent); self-insured-person,
  Art. 40(5)-health-insured, and Art. 51(1)-activity-report-obligated
  booleans (items 8-10); a foreign address (items 11.1-11.3, `requiredWhen`
  `isNonResident`); and the collapsed `filedByRepresentative` flag (see
  extraction-limitation note above).
- **Part II — Данни за упълномощеното лице или законния представител
  (representative identification).** Mirrors Part I's identification block
  (ID/ID-type/name/address/contact) for the proxy or legal representative;
  the four core identity fields are `requiredWhen` `filedByRepresentative`.
- **Part III — Приложения към декларацията (attachment checklist, 18
  rows).** Modeled as one boolean per printed row: 13 numbered annexes
  (Приложения № 1-13, each a full companion NRA form this v1.0.0 does not
  itself model — see Scoping below), a current-year and a past-years
  insurable-income-reference flag (row 14.1/14.2, the latter with its own
  `pastYearsReferenceYears` free-text field for the year(s) it covers), two
  child-tax-relief companion-declaration flags (rows 15-16), an
  annual-activity-report flag with its own reference-number field (row 17,
  `requiredWhen` on the flag), and a count of other attached documents (row
  18, `integer`, `minimum: 0`).
- **Part IV — Изчисляване на данъка върху общата годишна данъчна основа (root
  tax computation).** The 12 numbered worksheet rows (codes 4001-4012:
  aggregate annual tax base, total tax reliefs, overall tax base, tax due,
  cashless-payment relief, deductible taxes, net tax due, advance tax paid,
  tax due for additional payment, early-e-filing discount, final tax due,
  overpaid tax); a refund-under-DOPK-Art.128-130 flag (40121) with its own
  bank-details/account-holder sub-block, each `requiredWhen` that flag; and
  an offset-under-DOPK-Art.130a flag (40122) with its own EUR-conversion
  total (40123) and 5-way allocation breakdown (401241-401245, central-budget
  taxes / DOO pension contributions / NZOK health contributions / DZPO
  supplementary-pension contributions / forced collection of public
  receivables), each `requiredWhen` that second flag.
- **Part V — Информация за трансгранични данъчни схеми (cross-border tax
  scheme disclosure, DOPK Art. 143ya3(7)).** A boolean flag plus exactly the
  2 numbered scheme-reference-number rows the source itself prints (modeled
  as a bounded pair, `crossBorderSchemeNumber1`/`2`, per this registry's
  bounded-repeating-group convention — not an unbounded list).
- **Signature block.** Declaration date; the taxpayer's signature (name
  standing in for a physical signature, per this registry's `ro/anaf`/
  `ro/dgpci` precedent); the representative's signature, `requiredWhen`
  `filedByRepresentative`.

86 `fields[]` entries in total, plus 1 `documents[]` entry (the verbatim
criminal-liability attestation printed above the signature block: "За
деклариране на неверни данни се носи наказателна отговорност по Наказателния
кодекс.").

## Scoping and modeling judgment calls

- **Models the root declaration (Обр. 2001) only — no annex content.**
  Обр. 2001 is an omnibus "root" form: every individual files this one
  document and checks off which of 13 numbered Приложения (each its own
  separate NRA form, covering one income category — employment, sole-trader
  business, rental, capital transfers, foreign assets, tax reliefs, loans,
  etc.) accompany it. This v1.0.0 models only the root document's own 86
  fields (identification, the attachment checklist itself, the root-level
  tax computation, and the cross-border-scheme/signature blocks) — not the
  field-by-field content of any annex. This mirrors this registry's existing
  precedent for other jurisdictions with a root-form-plus-annexes structure
  (e.g. `ch/zh`'s Hilfsblatt series, `ro/anaf`'s own Anexa companion forms):
  each annex is a natural candidate for its own, separately-versioned
  companion schema in a future cycle, disclosed here rather than silently
  dropped.
- **`образец 2001в` (deceased-person variant) is a different document, out
  of scope.** Fetched and diffed against `образец 2001-1.doc` this cycle to
  confirm it is a structurally distinct form (its own Part I is "Данни за
  декларатора," with an heir/legatee selector absent from the standard
  declaration) rather than a mere cosmetic variant — genuinely a separate
  schema candidate, not this v1.0.0's concern.
- **Part IV's worksheet rows modeled `required: false`, not excluded.** Every
  row 1-12 formula explicitly aggregates figures from one or more of the
  out-of-scope annexes (e.g. row 1's own printed formula references Annexes
  1, 3, 4, 5, 6). Since this v1.0.0 does not model those annexes, a filer
  with no annexes attached would leave most of Part IV blank/zero; rather
  than silently drop these rows, they are kept as ordinary optional
  `number` fields with the source's own formula quoted in `description`,
  consistent with this registry's `ro/anaf` precedent of disclosing a
  printed footnote/formula rather than omitting the row it belongs to.
- **The three Part-II-triggering conditions collapsed to one boolean.** See
  the Extraction method section above — a disclosed, not invented, gate.
- **Resident/non-resident collapsed to one boolean (`isNonResident`).** The
  source prints "6. Местно лице" and "7. Чуждестранно лице" as two adjoining
  checkboxes for what is, on its own terms, a single binary choice; modeled
  as one boolean per this registry's `ro/anaf` `nonResident` precedent,
  rather than two independent (and redundant) booleans.
- **Comb-style/free-text ID fields kept as unconstrained or loosely
  patterned strings.** Unlike Romania's fixed-width CNP/CAEN comb boxes,
  `taxpayerId` covers five structurally different identifier types (EGN, LN,
  LNCh, an NRA service number, or a foreign EIK) selected via
  `taxpayerIdTypeCode`, so it is modeled as a loosely bounded alphanumeric
  string (`^[0-9A-Za-z]{1,15}$`) rather than a single fixed-digit pattern —
  a deliberately looser constraint than this registry's usual practice for a
  single-format national ID, disclosed here rather than silently
  over-constrained to the EGN's own 10-digit shape.
- **No `edition` axis used, despite being an annual filing.** Consistent with
  this registry's `ro/anaf`/`jo/istd` precedent for other annual personal-tax
  returns, the tax year is modeled as an ordinary `taxYear` field rather than
  a path-level `edition`.

## Conformance run

No PDF/AcroForm widget-count cross-check applies (see Extraction method).
In its place, two hand-authored mock instances were built and checked
against `schema.json`'s own `required`/`requiredWhen`/`validation.pattern`/
`validation.enum`/`validation.minimum` grammar with a disposable, from-scratch
Python checker (not committed, per this registry's own established practice
of not committing one-off verification scripts):

- **`standard-resident-filer`** — a resident individual, non-amending filing,
  Annex 1 (employment income) attached, self-insured/Art.40(5)/Art.51(1) all
  false, no representative, no refund/offset election, no cross-border
  scheme. 47 of 86 fields populated. **PASS.**
- **`nonresident-via-representative-with-refund`** — a non-resident filer
  (exercising `foreignAddressCountry`/`foreignAddressSettlement`/
  `foreignAddressStreet`), a one-time post-deadline correction, filed through
  a representative (exercising the full Part II block and
  `representativeSignature`), Annex 4 (rental income) and a past-years
  insurable-income reference attached, an overpaid-tax refund election under
  Art. 128-130 (exercising the full bank-details/account-holder block), and
  a cross-border tax scheme disclosure. 58 of 86 fields populated. **PASS.**

Two mutation-control checks confirmed the checker actually enforces the
gates rather than passing vacuously: dropping `taxpayerId` from the first
instance, and dropping `refundBankIban` from the second (with
`refundUnderArt128To130` still `true`), each correctly raised exactly the one
expected missing-required-field error.

```
$ node tools/validate.mjs registry/bg/nra/godishna-danachna-deklaratsiya-chl-50-zddfl/1.0.0/schema.json
ok   registry/bg/nra/godishna-danachna-deklaratsiya-chl-50-zddfl/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bg/nra/godishna-danachna-deklaratsiya-chl-50-zddfl/1.0.0/schema.json
ok   registry/bg/nra/godishna-danachna-deklaratsiya-chl-50-zddfl/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` did not exist in this worktree at the start of this
cycle; `npm ci --include=dev` installed `ajv`/`ajv-formats` cleanly with no
wipe. `word-extractor`/`pdfjs-dist` were installed in an unrelated scratch
directory (`/tmp/docparse`, outside the repo) rather than inside `tools/`, so
this cycle's own extraction tooling could not collide with `tools/`'s
committed dependency set at all.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/` — see the diff in this PR for
the updated jurisdiction/document counts.

## Scope and jurisdiction notes

- Adds a second schema to Bulgaria's **Taxes vertical** — PR #466
  (`bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse`)
  opened Bulgaria as the registry's 51st jurisdiction and this vertical, and
  merged first; see the duplicate-concurrent-run note above. DMV, Business
  Formation, Visa, Passport, and National ID & Civic Documents are all open,
  unscreened (Business Formation and National ID were screened and found
  weak/dead-end this cycle — see above) backlog candidates for Bulgaria —
  DMV, Visa, and Passport not independently fetched this cycle.
- `jurisdiction.level` is `national` — NRA is Bulgaria's national revenue
  authority.
- `process.type` is `filing`, matching the form's own nature as an annual
  self-assessment declaration.
- `process.language` is `bg`: the specimen's full text is entirely in
  Bulgarian; no English-language parallel edition was located or expected
  for a domestic self-assessment form of this kind.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming whether the 2026
tax year has produced a new edition of Обр. 2001 at a new URL (NRA
republishes this ZIP bundle annually, per the Ministry of Finance order
cadence observed this cycle — Order № ЗМФ-1780/20.12.2024, Държавен вестник
issue 109/28.12.2024, approved forms 2001/2021/2031/2051/2010/2013 for the
2025 filing season); (2) whether a future cycle wants to author one or more
of the 13 numbered annexes (Приложение № 2, sole-trader business income, is
likely the next-most-common after employment income) as companion schemas;
(3) re-attempting the three-condition Part-II-trigger checkbox disambiguation
with a rasterizer (LibreOffice/soffice) available, rather than plain-text
extraction alone; (4) whether Bulgaria's other four unscreened verticals
(DMV, Visa, Passport, National ID already screened weak) should be scouted.
