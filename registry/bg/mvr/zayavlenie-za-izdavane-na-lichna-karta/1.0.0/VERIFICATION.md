# Verification record — `bg/mvr/zayavlenie-za-izdavane-na-lichna-karta` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2869** (child of the
recurring cycle **GOV-2867**). This schema **closes Bulgaria's National ID &
Civic Documents vertical, bringing Bulgaria to 6 of 6 verticals** — Taxes
(two schemas, GOV-2821), Visa (`bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d`,
GOV-2830), DMV (`bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps`,
GOV-2853), Passport (`bg/mvr/zayavlenie-za-izdavane-na-pasport`, GOV-2860),
and now National ID (this schema, GOV-2869).

## Provenance of this candidate

GOV-2860's own VERIFICATION.md explicitly flagged this candidate: the
passport schema models MVR's shared civil-identity-document application
(upload id `301781` on `mvr.bg`, filed as "Приложение № 2" — see the full
URL cited under "Source verification" below) scoped only
to its passport-family checkbox pathway, and named the ID-card pathway
(лична карта / national ID card, and временна карта за самоличност /
temporary ID card) plus every field the source ties explicitly to it as a
"genuine, ready-to-author candidate for a future Bulgaria National ID
schema." This cycle authors exactly that companion schema, against the
identical source file, scoped the other way.

## Source verification (independently re-fetched and re-derived this cycle)

- **Fetched file:** `https://mvr.bg/upload/301781/%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%E2%84%96%202%20%D0%9B%D0%9A.pdf`,
  re-fetched fresh this cycle via `curl` with a browser-like `User-Agent`
  against the live `mvr.bg` origin (not reused from the passport cycle's
  own bytes).
  - **HTTP 200**, `Content-Type: application/pdf`, **304,847 bytes**.
  - **`sha256`:** `9e18af8b38995e069ee981fdb17262aed327d38a6d91fdc690e8c920e4e2ef97`
    — computed independently this cycle via `sha256sum` against the freshly
    fetched bytes, and it **matches exactly** the digest already recorded in
    `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s own VERIFICATION.md,
    confirming this is the same underlying source file, not a superseded or
    edited edition.
  - **2 pages.** Confirmed via `pdfjs-dist@4` (legacy build, Node.js):
    `doc.numPages === 2`.
- **Extraction re-derived from scratch**, not trusted from the passport
  schema's own prior extraction: `pdfjs-dist@4` legacy build was installed
  into a disposable scratch npm project at `/tmp/pdfextract` (outside
  `tools/`, which has no `pdfjs-dist` dependency), and a coordinate-sorted
  (`y` descending, `x` ascending) text-content dump of both pages was
  produced independently this cycle. Every field claim below was checked
  against this fresh dump, not against the passport schema's own
  description of what it excluded.

## Extraction method

Identical technique to the passport schema: `pdfjs-dist@4` legacy build,
Node.js, coordinate-sorted (`y` descending, `x` ascending) text-item dump,
run from `/tmp/pdfextract` (a disposable scratch project, never touching
`tools/`'s committed dependency set). This correctly resolves the header's
two-column, nine-option document-type checkbox block (left column: лична
карта, паспорт, дипломатически паспорт, служебен паспорт, моряшки паспорт;
right column: временна карта за самоличност, временен паспорт, служебен
открит лист за преминаване на границата, врем. паспорт за окончателно
напускане на РБ) and every other multi-column layout on the form.

## Field derivation, by form section

- **Header.** "Вх. номер" / "До" — excluded (office-intake, no printed
  blank/dotted entry line; identical exclusion already established for the
  passport and driving-licence schemas). "Вид на искания документ": this
  schema's `requestedDocumentType` enum includes only the two ID-card-family
  checkbox options confirmed in the fresh coordinate-sorted dump — `y=720
  x=343 "лична карта"` and `y=720 x=449 "временна карта за самоличност"` —
  the seven passport-family options are out of scope (already modeled by
  the companion passport schema). "Вид на услугата" (`y=656`/`y=644`):
  three checkboxes (обикновена/бърза/експресна), reused verbatim as a
  required enum, identical to the passport schema's own `serviceType`.
  **New, ID-card-specific header fields, confirmed directly against the
  fresh extraction:**
  - `y=630 x=331 "Място на получаване на ЛК при експресна услуга:"`,
    `y=618` row reading `"СДВР" "ДБДС" ":" "ЦАО Младост" "ЦАО Лъвов мост"` —
    modeled as `expeditedCollectionOffice`, an optional enum of the two
    printed office options (both administrative-service centres of СДВР
    ДБДС, the Sofia Directorate of Interior's identity-documents
    directorate).
  - `y=599 x=27 "Избор на срок на валидност на лична карта за граждани,
    навършили 70 г.:"` with two options printed on the same line, `x=391
    "10 години"` and `x=468 "30 години"` — modeled as
    `idCardValidityPeriodFor70Plus`, an optional enum. **This is not a
    permanent/indefinite-validity election** — the source prints two
    concrete numeric durations (10 years / 30 years), a genuinely different
    pair of options from the passport schema's own analogous 18+ election
    (5 years / 10 years), confirmed by direct read of the extracted text
    rather than assumed.
  - `y=561 x=27 "Отказвам издаването и записването на удостоверение за
    електронна идентичност (УЕИ) в личната карта"` — modeled as
    `eidCertificateOptOut`, an optional `boolean`. The extracted text layer
    carries no separate checkbox caption beyond this declarative sentence
    itself (unlike the two-option rows above, this is a single yes/no
    opt-out declaration), consistent with how this registry models other
    single declarative opt-out checkboxes (e.g. `mx/semovi`'s
    `hasDischargeDocument`-style booleans).
- **Personal-data section.** National ID number (ЕГН, 10-box grid); date and
  place of birth; Cyrillic name plus a separate changed-name line; Latin
  name plus a separate changed-name line; permanent address plus a separate
  changed-address line; sex; height; other nationality and naturalization
  decree number; eye colour; phone; email — all reused verbatim (identical
  `label`/`type`/`classification`/`validation`/`sourceRef` shape) from the
  passport schema, since this is the same personal-data block on the same
  source page, re-confirmed against this cycle's own fresh extraction
  before copying rather than copied blind. **`email`'s description text was
  extended** (not just copied) to reflect this form's own printed note that
  email notifications also cover the УЕИ electronic-identity certificate
  "if no opt-out was made" (`y=213`–`y=201`: "...във връзка с УЕИ в личната
  карта, ако не е направен отказ за издаването и записването му"),
  language the passport-scoped schema had no reason to surface.
  **Six "Вярно/Невярно" confirmation-checkbox pairs** are printed alongside
  the national-ID, date-of-birth, place-of-birth, Cyrillic-name, Latin-name,
  and address fields — the identical count, positions, and out-of-scope
  reasoning already independently confirmed for the passport schema
  (system-assisted in-person counter workflow with NBD/НРБЛД civil-registry
  auto-fill); re-confirmed directly against this cycle's own extraction
  rather than assumed.
- **Page 2, parent/guardian declaration block.** Identical wording to the
  passport schema's own citation ("Долуподписаните родители на лица под 18
  годишна възраст... заявяваме издаването на документ за самоличност" — a
  generic "identity document," not passport- or ID-card-specific), the
  identical bounded two-row block (name, EGN, presented ID-card number and
  issue date, declaration date, signature per row). Reused verbatim as
  `guardian1*`/`guardian2*`, unconditionally optional (no printed boolean
  gate), matching the passport schema's own judgment call.
- **"Данни за упълномощено лице" (authorized-person/proxy) block.**
  Identical generic gating text ("...документ/и за самоличност ще се
  получава/т от упълномощено лице") and identical six-field shape (name,
  EGN, ID-card number/issue date, authorization date, applicant's
  authorizing signature). Reused verbatim as `authorizedPerson*`,
  unconditionally optional, matching the passport schema's own judgment
  call.
- **Address-abroad block, in scope for this schema (excluded by the
  passport schema).** Confirmed directly against the fresh extraction on
  page 2: `y=414`–`y=398`: "Попълва само от лица, живеещи предимно в
  чужбина при подаване на заявление за издаване на лична карта." (completed
  only by persons living predominantly abroad when submitting an
  application for issuance of an ID card — the source's own text scopes
  this explicitly to "за издаване на лична карта," matching the ID-card
  pathway this schema models). Below that instruction: `y=366`–`y=343`,
  a further printed note, "С попълването на това поле не се заявява
  настоящ адрес." (filling in this field does not constitute declaring a
  current address); a dotted blank entry line at `y=342`; and, printed
  *below* the blank line, the field's actual caption at `y=331`: "Адрес на
  територията на държавата, където пребивават." (address in the territory
  of the state where they reside). This is a **single free-text field**,
  not a structured multi-component address — the source prints exactly one
  blank line with one caption, unlike the structured `address` field
  elsewhere on the form (which explicitly enumerates область/община/
  населено място/бул./ул./номер/вход/етаж/апартамент as sub-components).
  Modeled as `addressAbroad`, optional, `maxLength` 200 (no source-printed
  bound; chosen in line with this registry's convention of a conservative,
  round bound for single-line free-text address fields where no explicit
  length constraint is printed — see `otherNationality` on the companion
  schema for the identical judgment call already made there). No part of
  this block's wording or structure was uncertain in the fresh extraction;
  it is modeled with full confidence, not a guess.
- **"Родители" (parents) table.** Identical generic gating text ("Попълва
  се в случай на първо издаване на документ за самоличност" — not ID-card-
  specific), identical fixed two-row table (майка/mother, баща/father; name
  and date of birth each). Reused verbatim as `motherFullName`/
  `motherDateOfBirth`/`fatherFullName`/`fatherDateOfBirth`.
- **Submission section.** The ID card presented at submission (`idCardNumber`/
  `idCardIssueDate` — the card the submitter already holds, a distinct
  concept from `requestedDocumentType`, the document being requested);
  submission date; the printed name of the person submitting in person
  (applicant or proxy); the final signature line. Reused verbatim.
- **Excluded as office-only.** "Имена на служителя, приел заявлението" /
  "Подпис на служителя" — matching this registry's established
  office-only-content exclusion convention.
- **Excluded as out of scope for this ID-card-scoped schema.** The five
  passport-family-only `requestedDocumentType` checkbox options (паспорт,
  дипломатически паспорт, служебен паспорт, моряшки паспорт, служебен
  открит лист за преминаване на границата — временен паспорт and врем.
  паспорт за окончателно напускане на РБ are the remaining two of the
  seven, all out of scope here) and the passport-specific 18+
  validity-period election ("Избор на срок на валидност на паспорт за
  граждани, навършили 18 г.," 5/10 years) — both already modeled by
  `bg/mvr/zayavlenie-za-izdavane-na-pasport`.

49 `fields[]` entries in total (43 reused verbatim from the companion
passport schema, plus `requestedDocumentType`/`serviceType` re-scoped to the
ID-card pathway, plus four new ID-card-specific fields:
`expeditedCollectionOffice`, `idCardValidityPeriodFor70Plus`,
`eidCertificateOptOut`, `addressAbroad`), plus 3 `documents[]` entries: the
applicant photograph ("Снимка 3,5/4,5"), a signature specimen box printed in
the left margin below the photo box, and the form's own printed
criminal-liability truthfulness declaration under Art. 313 of the Penal
Code — all three identical in wording and position to the passport schema's
own `documents[]` entries; the fresh extraction found no ID-card-specific
variation in the photo/signature specs or the declaration text (both
document-type pathways share page 1's photo box, signature box, and
declaration paragraph).

## Scoping and modeling judgment calls

- **A single shared civil-identity-document form is now modeled by two
  disjoint schemas sharing an identical `source.url`/`sha256`.** This
  schema is the National-ID-scoped companion the passport schema's own
  VERIFICATION.md explicitly anticipated. `requestedDocumentType`'s enum is
  restricted to the two ID-card-family checkbox options; every field the
  form's own text ties explicitly to the ID-card pathway is now in scope
  here (and correspondingly out of scope on the passport schema); every
  field tied explicitly to the passport-family pathway remains out of
  scope here.
- **`idCardValidityPeriodFor70Plus` modeled as optional, not `requiredWhen`
  gated on age.** Same reasoning as the passport schema's own
  `passportValidityPeriod`: the form ties this election to citizens who
  have turned 70 but prints no age-derived boolean field a `requiredWhen`
  condition could evaluate against.
- **`eidCertificateOptOut` modeled as `boolean`, not `enum`.** The source
  prints a single declarative opt-out sentence with no alternative
  affirmative-choice wording alongside it (unlike the two-way
  `expeditedCollectionOffice`/`idCardValidityPeriodFor70Plus` rows, which
  print two named options each) — a checked/unchecked declaration is the
  more faithful `type` for a single opt-out statement, matching this
  registry's established `boolean`-for-single-declaration convention (e.g.
  `mx/semovi/alta-vehiculo-foraneo`'s `hasDischargeDocument`).
- **`addressAbroad` modeled as a single string field, not a structured
  address object.** The source prints exactly one blank entry line and one
  caption ("Адрес на територията на държавата, където пребивават"), with no
  sub-component breakdown printed (unlike the structured `address` field
  elsewhere on the same form) — modeling it as an object with invented
  sub-fields would add structure the source itself does not provide.
- **`height` modeled as `integer` with no invented min/max`, `guardian1*`/
  `guardian2*`/`motherFullName`/`fatherFullName` modeled as fixed-arity
  named fields, and `process.type`/`jurisdiction.level`/no `edition` axis**
  — all identical judgment calls to the passport schema's own, reused here
  since they concern form sections shared unchanged between both schemas'
  scopes; see the passport schema's own VERIFICATION.md for the original
  reasoning, independently re-confirmed against this cycle's own fresh
  extraction rather than merely copied.
- **The "second non-original jurisdiction to reach 6/6" framing, checked
  rather than assumed.** GOV-2869's own brief asserted Bulgaria would be
  "the second non-original jurisdiction after Colombia" to reach full
  coverage. Checking CATALOG.md's own record: Colombia
  (`co/registraduria/duplicado-cedula-ciudadania`, GOV-1616) is confirmed as
  the **first** non-original jurisdiction to reach 6/6 (CATALOG.md's own
  National ID & Civic Documents section, GOV-1616 entry, explicitly says so).
  However, CATALOG.md's own text **also** already credits Portugal
  (`pt/at/declaracao-inicio-atividade-pessoas-singulares`, GOV-2143) as "the
  **second** non-original jurisdiction in this registry to reach 6/6 (after
  Colombia)" in two separate places (its own Business Formation-vertical
  update and its Executive Summary entry), and several further
  jurisdictions — Iceland, Finland, Sweden, Norway, Denmark, the
  Philippines, South Korea, Bangladesh — have each separately reached 6/6
  since, without CATALOG.md consistently maintaining a running "Nth
  non-original jurisdiction" ordinal for every one of them. Bulgaria
  reaching 6/6 this cycle is accurately reported as **following Colombia's
  precedent of reaching full coverage as a non-original jurisdiction**, but
  the specific claim "Bulgaria is *the* second" is not literally true against
  CATALOG.md's own prior record (that title was already given to Portugal);
  this schema's own `description` field and CATALOG.md's update both
  disclose this discrepancy rather than silently repeating the brief's
  unverified ordinal claim.

## Conformance run

No PDF/AcroForm widget-count cross-check applies (the source is a flat
text-layer specimen, not an AcroForm). In its place, two hand-authored mock
instances were built and checked against `schema.json`'s own
`required`/`validation.enum`/`validation.maxLength`/`validation.pattern`
grammar with a disposable, from-scratch Node.js checker (not committed, per
this registry's established practice of not committing one-off verification
scripts):

- **`adult-expedited-applicant`** — a Bulgarian-citizen adult applicant,
  national ID card, expedited service tier with a collection-office
  election, no proxy, no guardians. 19 of 49 fields populated. **PASS.**
- **`minor-first-issuance-with-guardian`** — a minor applicant on a
  first-time issuance, standard service tier, the full guardian1 block, and
  the mother/father particulars table. 26 of 49 fields populated. **PASS.**

Three mutation-control checks confirmed the checker actually enforces the
grammar rather than passing vacuously: dropping `nationalId`
(unconditionally required — correctly flagged missing); setting `sex` to an
out-of-enum value (correctly flagged as an enum violation); and dropping
`submissionDate` (unconditionally required — correctly flagged missing).
Each mutation raised exactly its one expected error.

```
$ node tools/validate.mjs
430/430 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` and `tools/govschema-client/node_modules` were
installed fresh this cycle via `npm ci --include=dev` (ajv/ajv-formats), the
same known gotcha already documented for this registry (`NODE_ENV=production`
in this environment otherwise makes a plain `npm ci` skip ajv).
`pdfjs-dist@4` was installed to a disposable scratch npm project outside the
repo (`/tmp/pdfextract`), never touching `tools/`'s committed dependency
set. `tools/govschema-client/registry-index.json` was regenerated via `npm
run build-index` inside `tools/govschema-client/`: **430 total entries**,
exactly one more than the 429 recorded before this cycle (confirmed via
`node tools/validate.mjs`'s own whole-repo document count, matching the
increase of exactly this one new schema — the same denominator-integrity
check this registry's own PR #474 previously had to fix after a prior
cycle's miscount).

## Scope and jurisdiction notes

- Closes Bulgaria's **National ID & Civic Documents vertical**, bringing
  **Bulgaria to 6 of 6 verticals**: Taxes (two schemas, GOV-2821), Visa
  (GOV-2830), DMV (GOV-2853), Passport (GOV-2860), National ID (this
  schema, GOV-2869). No vertical remains open for Bulgaria.
- Colombia (`co/registraduria/duplicado-cedula-ciudadania`, GOV-1616) is
  confirmed, via CATALOG.md's own record, as the first non-original
  jurisdiction in this registry to reach 6/6. Bulgaria follows that same
  precedent this cycle, though — per the "Scoping and modeling judgment
  calls" section above — CATALOG.md's own text has already separately
  credited Portugal as "the second" such jurisdiction, and several more
  have reached 6/6 in between; this record discloses that rather than
  asserting an unverified strict ordinal.
- `jurisdiction.level` is `national` — MVR is Bulgaria's national Ministry
  of Interior and sole ID-card-issuing authority.
- `process.type` is `application`, matching this registry's convention for
  first-issuance application forms.
- `process.language` is `bg`: Bulgarian-only text layer, no English
  secondary captions found on either page (identical finding to the
  passport schema's own note).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming the source PDF
has not been superseded by a newer edition (both this schema and the
companion passport schema share the same source, so a future edition change
would need to be checked against both); and (2) re-confirming this schema's
own ID-card-pathway scoping decision, and the passport schema's own
passport-pathway scoping decision, both still correctly partition the
shared form's document-type checkbox set with no gap or overlap.
