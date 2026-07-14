# Verification record — `bg/mvr/zayavlenie-za-izdavane-na-pasport` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2860**. This schema **opens
Bulgaria's Passport vertical (4 of 6)**, following Taxes (two schemas,
GOV-2821), Visa (`bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d`,
GOV-2830), and DMV (`bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps`,
GOV-2853).

## Provenance of this candidate

CATALOG.md's Known Gaps section listed Bulgaria's Passport vertical as open,
unscreened backlog after GOV-2853 (Bulgaria's DMV cycle) — the same cycle's
own note flagged Bulgaria's National ID vertical as "spot-checked weak ... for
the ID-card application specifically (GOV-2821)" while leaving Passport
unscreened. This cycle screened Passport fresh via a subagent scout tasked
with finding a genuine, unauthenticated, first-party source, then
independently re-derived every claim from scratch before authoring.

The scout found that Bulgaria's passport-issuing directorate is the same
Дирекция "Български документи за самоличност" (DBDS) already used for the
driving-licence schema, and that DBDS's own "Бланки и образци" (Forms and
specimens) static page links a specimen titled "Заявление за издаване на
документи за самоличност на български граждани - образец" (Application for
issuance of identity documents for Bulgarian citizens — specimen) — a
**shared identity-document application form**, distinct from the
driving-licence form ("Приложение № 2а"), that this schema treats as
"Приложение № 2" per its file name. As a two-in-one civil-identity-document
form (offering both a national-ID-card pathway and a six-variant
passport-family pathway on the same page), this single source could open
*either* Bulgaria's Passport vertical *or* its National ID vertical depending
on how the `requestedDocumentType` scope is drawn — this schema scopes it to
the passport-family pathway only. This resolves the apparent tension with
GOV-2821's "spot-checked weak" National ID note: that note was about a
different (or narrower) ID-card-specific candidate, not this form, which was
never previously screened for either vertical this cycle's scout could find.

## Source verification (independently fetched and re-derived this cycle)

- **Forms-and-specimens page:** `https://mvr.bg/dbds/%D0%B4%D0%B5%D0%B9%D0%BD%D0%BE%D1%81%D1%82%D0%B8/%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE-%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B2%D0%B0%D0%BD%D0%B5/blanki`
  — fetched fresh this cycle with a browser-like `User-Agent`, **HTTP 200**.
  The page's own HTML lists, alongside the already-modeled driving-licence
  specimen (upload id `301782`), a directly adjacent link at upload id
  `301781` with anchor text "Заявление за издаване на документи за
  самоличност на български граждани - образец" — confirming both this
  schema's source and the already-published driving-licence schema's source
  are linked from the same DBDS static-forms page, independently re-derived
  rather than assumed from a prior cycle's own note.
- **Fetched file:** `https://mvr.bg/upload/301781/%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%E2%84%96%202%20%D0%9B%D0%9A.pdf`
  (file name literally "заявление приложение № 2 ЛК.pdf" — "ЛК" being the
  Bulgarian abbreviation for лична карта/ID card, presumably because the ID
  card is this shared form's most common use case; the form's own printed
  title and checkbox set confirm it is not ID-card-only).
  - **HTTP 200**, `Content-Type: application/pdf`, **304,847 bytes**.
  - **`sha256`:** `9e18af8b38995e069ee981fdb17262aed327d38a6d91fdc690e8c920e4e2ef97`
    (computed directly against the fetched bytes via `sha256sum`), matching
    the independent scout subagent's own separately-computed digest —
    cross-checked across two independent fetches of the live `mvr.bg`
    origin.
  - **2 pages.** Confirmed via `pdfjs-dist@4` (legacy build, Node.js):
    `doc.numPages === 2`.
  - A genuine, non-scanned Cyrillic text layer: every label, checkbox
    caption, and blank-line placeholder extracts as discrete, positioned
    text items (confirmed via a coordinate-sorted (`y` descending, `x`
    ascending) text-content dump of both pages, not merely a flat
    line-by-line transcript, to correctly resolve the form's two-column
    checkbox layout).

## Extraction method

Text-layer extraction via `pdfjs-dist@4` (legacy build), reusing this
registry's established Node.js + `pdfjs-dist` technique, run from a disposable
scratch npm project outside `tools/` (this repo's own `tools/` has no
`pdfjs-dist` dependency). A coordinate-sorted dump (each text item's rounded
`x`/`y` PDF-space position) was used, rather than a naive top-to-bottom
line-join, specifically to correctly resolve this form's two-column
document-type checkbox block (left column: лична карта, паспорт,
дипломатически паспорт, служебен паспорт, моряшки паспорт; right column:
временна карта за самоличност, временен паспорт, служебен открит лист за
преминаване на границата, врем. паспорт за окончателно напускане на РБ — nine
checkbox options total, which a naive line-join would have interleaved
incorrectly).

## Field derivation, by form section

- **Header.** "Вх. номер" and "До" — excluded (office-intake, no printed
  blank/dotted entry line, matching this registry's identical exclusion
  already established for the driving-licence schema's own header). "Вид на
  искания документ" (type of requested document): nine checkboxes across two
  columns. This schema's `requestedDocumentType` enum includes only the seven
  passport-family variants (паспорт, временен паспорт, дипломатически
  паспорт, служебен паспорт, моряшки паспорт, служебен открит лист за
  преминаване на границата, врем. паспорт за окончателно напускане на РБ);
  лична карта and временна карта за самоличност are out of scope for this
  Passport-vertical schema. "Вид на услугата" (service type): three
  checkboxes (standard/fast/expedited), modeled as a required `enum`.
- **Personal-data section.** National ID number (ЕГН, 10-box grid); date and
  place of birth; Cyrillic name plus a separate changed-Cyrillic-name line;
  Latin-transliteration name plus a separate changed-name line; permanent
  address plus a separate changed-address line; sex (М/Ж, required enum);
  height ("Ръст," modeled as `integer` with no invented min/max bound — the
  source prints a bare blank line with no unit or range indicated); other
  nationality and a naturalization-decree number (both optional, mirroring
  the driving-licence schema's own `otherNationality`/`citizenshipDecreeNumber`
  pair); eye colour (eight checkboxes, required enum); phone; email (the
  form's own printed note: an applicant who supplies an email is notified
  when the document is ready and before its validity expires).
  **ID-card-only fields, excluded from this Passport-scoped schema:** an
  expedited-service ID-card collection-office selector ("Място на получаване
  на ЛК при експресна услуга" — the source's own text specifies "на ЛК," i.e.
  of the ID card specifically); a validity-period election for an ID card
  held by a citizen who has turned 70 ("Избор на срок на валидност на лична
  карта за граждани, навършили 70 г."); and a declaration declining issuance
  of an electronic-identity certificate on the ID card ("Отказвам
  издаването и записването на удостоверение за електронна идентичност (УЕИ)
  в личната карта" — again explicitly scoped to "личната карта," the ID
  card). **Modeled for this Passport-scoped schema:** a passport-specific
  validity-period election for a citizen who has turned 18 ("Избор на срок на
  валидност на паспорт за граждани, навършили 18 г.," 5 or 10 years),
  modeled as an optional enum (not completed by or on behalf of a minor
  applicant, per the form's own age qualifier).
  **Six "Вярно/Невярно" (True/False) confirmation-checkbox pairs** are printed
  adjacent to the national-ID, date-of-birth, place-of-birth, Cyrillic-name,
  Latin-name, and address fields respectively — the identical count and
  pattern already established for the driving-licence schema's own six such
  pairs, confirmed independently this cycle by direct count against the
  coordinate-sorted text dump (pairs at PDF-space `y` values 731/720,
  677/665, 545, 508, 432, and 369, each appearing immediately alongside one
  of the six fields named above). Tied by the form's own explanatory
  paragraph to the same system-assisted, in-person counter workflow already
  documented for the driving-licence schema ("the application contains
  automatically filled current civil-status data from NBD 'Population' / via
  NAIF 'НРБЛД,' as well as a photo and signature from the last-issued
  Bulgarian personal document") — out of scope for the same reason already
  established there.
- **Page 2, parent/guardian declaration block.** "Долуподписаните родители на
  лица под 18 годишна възраст, настойници, попечители или други законни
  представители заявяваме издаването на документ за самоличност" (the
  undersigned parents of persons under 18 years of age, guardians,
  custodians, or other legal representatives declare the issuance of an
  identity document) introduces a bounded, two-row repeating block, each row
  offering name, EGN, presented ID-card number and issue date, declaration
  date, and signature. Modeled as `guardian1*`/`guardian2*`, all
  unconditionally optional — the form prints no explicit boolean gate tying
  this block to an applicant's age, consistent with this registry's
  established convention for "fill in only if applicable" instructions with
  no explicit checkbox (e.g. the driving-licence schema's own
  `authorizedPersonName` precedent, immediately below).
- **"Данни за упълномощено лице" (authorized-person/proxy) block.** "Попълва
  се, само ако заявения/те документ/и за самоличност ще се получава/т от
  упълномощено лице" (completed only if the requested identity document(s)
  will be received by an authorized person) — all six fields (name, EGN,
  ID-card number and issue date, authorization date, and the applicant's own
  authorizing signature) modeled as unconditionally optional, no invented
  gate, matching the driving-licence schema's identical judgment call for the
  same block on its own source form.
- **Address-abroad block, excluded.** "Попълва само от лица, живеещи предимно
  в чужбина при подаване на заявление за издаване на лична карта" (completed
  only by persons living predominantly abroad when submitting an application
  for issuance of an ID card) — the source's own text scopes this block
  explicitly to ID-card applications ("за издаване на лична карта"), so it is
  out of scope for this Passport-scoped schema.
- **"Родители" (parents) table.** "Попълва се в случай на първо издаване на
  документ за самоличност" (completed in case of first issuance of an
  identity document) — a fixed two-row table (майка/mother, баща/father),
  each row offering a name and a date of birth. Unlike the address-abroad
  block above, this table's own gating text refers generically to "документ
  за самоличност" (identity document), not to the ID card specifically, so it
  is in scope and modeled as `motherFullName`/`motherDateOfBirth`/
  `fatherFullName`/`fatherDateOfBirth` — flat, named fields rather than an
  array, since mother and father are two fixed, distinctly-labelled roles
  rather than an open-ended repeating list.
- **Submission section.** The ID card presented at submission (number and
  issue date); the submission date; the printed name of the person appearing
  in person to submit the application and the accompanying truthfulness
  declaration (applicant or proxy); and the final signature line.
- **Excluded as office-only.** "Имена на служителя, приел заявлението" /
  "Подпис на служителя" (the name/signature of the employee who received the
  application), the form's own final row on page 2 — matching this
  registry's established office-only-content exclusion convention.

46 `fields[]` entries in total, plus 3 `documents[]` entries: the applicant
photograph ("Снимка 3,5/4,5"), a signature specimen box printed in the left
margin below the photo box (a physical signature specimen reproduced on the
issued document itself, distinct from the typed-name `applicantSignature`/
`authorizationSignature`/`guardian1Signature`/`guardian2Signature`/
`authorizationSignature` attestation fields), and the form's own printed
criminal-liability truthfulness declaration under Art. 313 of the Penal Code.

## Scoping and modeling judgment calls

- **A single shared civil-identity-document form is scoped to the Passport
  vertical only.** This is the central judgment call of this schema: the
  source form offers both an ID-card pathway and a passport-family pathway
  on one page. Rather than model the whole form (which would blur this
  registry's one-schema-per-vertical convention) or arbitrarily pick a
  narrower title, this schema restricts `requestedDocumentType`'s enum to the
  seven passport-family checkbox options and excludes every field the form's
  own text ties explicitly to the ID-card pathway (see "Field derivation"
  above). A future Bulgaria National ID schema could model this same source
  scoped the other way (ID-card-only `requestedDocumentType`, plus the
  ID-card-specific fields excluded here), at which point the two schemas
  would share an identical `source.url`/`sha256` while remaining disjoint in
  scope — consistent with how this registry already permits two schemas
  against the same underlying regulation Annex when they model genuinely
  distinct application pathways.
- **The six "Вярно/Невярно" confirmation checkboxes are out of scope, not
  modeled as fields.** Identical reasoning and judgment-call disclosure as
  the driving-licence schema's own equivalent note: these checkboxes
  presuppose a system-assisted counter workflow that does not arise when
  independently filling in this blank specimen from scratch.
- **`height` modeled as `integer` with no invented min/max.** The source
  prints a bare blank line with no unit or numeric range indicated;
  inventing a bound (e.g. 50–250) would add a constraint the source itself
  does not state.
- **`passportValidityPeriod` modeled as optional, not `requiredWhen` gated on
  age.** The form ties this election to citizens who have turned 18, but
  prints no explicit date-of-birth-derived boolean field an agent could
  evaluate a `requiredWhen` condition against; matching this registry's
  established avoidance of inventing derived gating conditions not present on
  the source.
- **Guardian block and parents table modeled as fixed-arity named fields
  (`guardian1*`/`guardian2*`, `motherFullName`/`fatherFullName`), not
  arrays.** Both blocks are printed as a fixed, small number of distinctly
  labelled rows (two guardian rows; one mother row and one father row), not
  an open-ended repeating list, matching this registry's convention for
  bounded, small-N repeating groups.
- **No `edition` axis.** A standing application form, not a dated annual
  filing.
- **`process.type` is `application`**, matching this registry's convention
  for first-issuance application forms.

## Conformance run

No PDF/AcroForm widget-count cross-check applies (the source is a flat
text-layer specimen, not an AcroForm). In its place, two hand-authored mock
instances were built and checked against `schema.json`'s own
`required`/`validation.enum`/`validation.maxLength`/`validation.pattern`
grammar with a disposable, from-scratch Python checker (not committed, per
this registry's established practice of not committing one-off verification
scripts):

- **`adult-single-applicant`** — a Bulgarian-citizen adult applicant, standard
  passport, standard service tier, no proxy, no guardians. 17 of 46 fields
  populated. **PASS.**
- **`minor-first-issuance-with-proxy`** — the same base applicant recast as a
  minor on a first-time issuance, additionally populating the full guardian1
  block, the mother/father particulars table, and the full authorized-person
  (proxy) block. 32 of 46 fields populated. **PASS.**

Three mutation-control checks confirmed the checker actually enforces the
grammar rather than passing vacuously: dropping `nationalId` (unconditionally
required — correctly flagged missing); setting `sex` to an out-of-enum value
(correctly flagged as an enum violation); and dropping `submissionDate`
(unconditionally required — correctly flagged missing). Each mutation raised
exactly its one expected error.

```
$ node tools/validate.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-pasport/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-pasport/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-pasport/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-pasport/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` was installed fresh this cycle via `npm ci
--include=dev` (ajv/ajv-formats). `pdfjs-dist@4` was installed to a disposable
scratch npm project outside the repo (`/tmp/pdfextract`), never touching
`tools/`'s committed dependency set.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/` — see the diff in this PR for
the updated jurisdiction/document counts (429 total entries).

## Scope and jurisdiction notes

- Opens Bulgaria's **Passport vertical** (4 of 6): Taxes (two schemas,
  GOV-2821), Visa (GOV-2830), DMV (GOV-2853), Passport (this schema). National
  ID & Civic Documents remains Bulgaria's sole open vertical — this same
  source, scoped to its ID-card pathway instead, is a ready-to-author
  candidate for that vertical in a future cycle (see "Scoping and modeling
  judgment calls" above).
- `jurisdiction.level` is `national` — MVR is Bulgaria's national Ministry of
  Interior and sole passport-issuing authority.
- `process.type` is `application`, matching this registry's convention for
  first-issuance application forms.
- `process.language` is `bg`: unlike the driving-licence specimen (which
  carries bilingual Bulgarian/English glosses throughout), this form's text
  layer is Bulgarian-only with no English secondary captions found anywhere
  on either page.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming the source PDF has
not been superseded by a newer edition; (2) authoring Bulgaria's National ID
vertical from this same source, scoped to its ID-card pathway (the sole
remaining open Bulgaria vertical after this cycle); and (3) re-confirming
this schema's own `requestedDocumentType` scoping decision holds up against
any future revision of the underlying MVR regulation.
