# Verification record — `bg/mvr/zayavlenie-za-izdavane-na-lichna-karta` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2869**. This schema **closes
Bulgaria's National ID & Civic Documents vertical (6 of 6)**, the final open
Bulgaria vertical, following Taxes (two schemas, GOV-2821), Visa
(`bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d`, GOV-2830), DMV
(`bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps`,
GOV-2853), and Passport (`bg/mvr/zayavlenie-za-izdavane-na-pasport`,
GOV-2860). Business Formation was already confirmed a dead end
(GOV-2830/GOV-2837, JS-gated commercial-register portal), so Bulgaria's
remaining five verticals are now all closed and this is the second-to-last
possible schema against this source's civil-identity-document form.

## Provenance of this candidate

GOV-2860's own VERIFICATION.md (the Passport-vertical schema against this same
source) flagged this exact scoping — the same PDF, scoped to its ID-card
pathway instead of its passport-family pathway — as a ready-to-author
candidate for Bulgaria's National ID vertical, and CATALOG.md's own
GOV-2860 entry repeated the same pointer. This cycle acted on that pointer
directly rather than re-scouting for a new source.

## Source verification (independently re-fetched and re-derived this cycle)

- **Fetched file:** `https://mvr.bg/upload/301781/%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%E2%84%96%202%20%D0%9B%D0%9A.pdf`
  — re-fetched fresh this cycle with a browser-like `User-Agent`, not reused
  from any cached copy.
  - **HTTP 200**, **304,847 bytes**.
  - **`sha256`:** `9e18af8b38995e069ee981fdb17262aed327d38a6d91fdc690e8c920e4e2ef97`
    (computed directly against this cycle's own freshly-fetched bytes via
    `sha256sum`) — an exact match against the already-published passport
    schema's own independently-recorded digest, confirming both schemas
    model the identical source PDF, not two different revisions.
  - **2 pages.** Confirmed via `pdfjs-dist@4` (legacy build, Node.js):
    `doc.numPages === 2`.
  - A genuine, non-scanned Cyrillic text layer: every label, checkbox
    caption, and blank-line placeholder extracts as discrete, positioned
    text items, confirmed via a fresh coordinate-sorted (`y` descending, `x`
    ascending) text-content dump of both pages, re-run from scratch this
    cycle rather than reusing the passport schema's own prior extraction
    output.

## Extraction method

Text-layer extraction via `pdfjs-dist@4` (legacy build), reusing this
registry's established Node.js + `pdfjs-dist` technique, run from a disposable
scratch npm project outside `tools/` (`/tmp/bg-idcard`, this repo's own
`tools/` has no `pdfjs-dist` dependency). A coordinate-sorted dump (each text
item's rounded `x`/`y` PDF-space position) was used, rather than a naive
top-to-bottom line-join, to correctly resolve the form's two-column
document-type checkbox block and the marginal note beside the
address-abroad field on page 2.

## Field derivation, by form section

- **Header.** "Вх. номер" and "До" — excluded, matching the passport and
  driving-licence schemas' identical exclusion (no printed blank/dotted entry
  line). "Вид на искания документ" (type of requested document): nine
  checkboxes across two columns. This schema's `requestedDocumentType` enum
  includes only the two ID-card variants — лична карта (national ID card,
  `id-card`) and временна карта за самоличност (temporary ID card,
  `temporary-id-card`); the seven passport-family variants modeled by
  `bg/mvr/zayavlenie-za-izdavane-na-pasport` are out of scope here. "Вид на
  услугата" (service type): three checkboxes (standard/fast/expedited),
  shared verbatim with the passport schema.
- **Personal-data section — shared fields.** National ID number (ЕГН, 10-box
  grid); date and place of birth; Cyrillic name plus a separate
  changed-Cyrillic-name line; Latin-transliteration name plus a separate
  changed-name line; permanent address plus a separate changed-address line;
  sex; height; other nationality and a naturalization-decree number; eye
  colour; phone; email — all reused verbatim from the already-published
  passport schema, since the source form's personal-data section is identical
  regardless of which document-type pathway is selected. The email field's
  description is extended relative to the passport schema's own wording to
  mention the source's own reference to the УЕИ opt-out (see below), which
  is only in scope for this ID-card-scoped schema.
- **Personal-data section — ID-card-only fields, modeled here (excluded from
  the passport schema).**
  - `expeditedCollectionOffice` — "Място на получаване на ЛК при експресна
    услуга: СДВР ДБДС : ЦАО Младост   ЦАО Лъвов мост." The prefix "СДВР ДБДС"
    (Sofia Directorate of Interior's Bulgarian Identity Documents Directorate)
    names the issuing authority common to both options, not a third checkbox
    choice; the two selectable administrative service centres are ЦАО
    "Младост" and ЦАО "Лъвов мост," modeled as a two-value enum
    (`tsao-mladost`/`tsao-lavov-most`).
  - `idCardValidityPeriod70Plus` — "Избор на срок на валидност на лична
    карта за граждани, навършили 70 г.: 10 години   30 години." Modeled as
    an optional two-value enum (`10-years`/`30-years`), the direct ID-card
    analogue of the passport schema's own `passportValidityPeriod` (5/10
    years for citizens 18+), which this schema drops as out of scope.
  - `eidCertificateOptOut` — "Отказвам издаването и записването на
    удостоверение за електронна идентичност (УЕИ) в личната карта." A
    genuine opt-out election (not a mandatory attestation), modeled as
    `boolean`, matching this registry's established convention for the same
    pattern (e.g. `mx/sre/passport-application`'s `consentToDataDisclosure`).
- **Page 2, parent/guardian declaration block.** Identical bounded two-row
  block already modeled by the passport schema (`guardian1*`/`guardian2*`,
  all unconditionally optional, no invented age-derived gate), reused
  verbatim — the source's own printed instruction ("Долуподписаните родители
  на лица под 18 годишна възраст...") is document-type-agnostic.
- **"Данни за упълномощено лице" (authorized-person/proxy) block.** Identical
  six-field block already modeled by the passport schema, reused verbatim
  (unconditionally optional, no invented gate).
- **Address-abroad block, modeled here (excluded from the passport schema,
  where its field list was not yet detailed — freshly extracted this
  cycle).** "Попълва само от лица, живеещи предимно в чужбина при подаване на
  заявление за издаване на лична карта" (completed only by persons living
  predominantly abroad when submitting an application for issuance of an ID
  card) gates a **single** field, not a multi-field address block: a blank
  entry line labelled "Адрес на територията на държавата, където пребивават"
  (address in the territory of the country where they reside), with an
  adjacent marginal note "С попълването на това поле не се заявява настоящ
  адрес" (completing this field does not constitute declaring a current
  address) — confirmed by direct coordinate inspection (label at PDF-space
  `y=331`, blank line at `y=342`, marginal note at `y=366-343 x=459`, distinct
  from the `x=27-56` column used by every other field on the page). Modeled
  as `addressAbroad`, a single optional string field with `maxLength: 300`
  matching this schema's other free-text address fields.
- **"Родители" (parents) table.** Identical fixed two-row table already
  modeled by the passport schema (`motherFullName`/`motherDateOfBirth`/
  `fatherFullName`/`fatherDateOfBirth`), reused verbatim — its own gating
  text ("документ за самоличност," identity document generically) is
  document-type-agnostic.
- **Submission section.** Identical to the passport schema: the ID card
  presented at submission (number and issue date); the submission date; the
  printed name of the person appearing in person to submit the application;
  and the final signature line.
- **Excluded as office-only.** "Имена на служителя, приел заявлението" /
  "Подпис на служителя," matching this registry's established exclusion.
- **Six "Вярно/Невярно" confirmation-checkbox pairs**, out of scope for the
  same reason already established for the driving-licence and passport
  schemas' own equivalents (a system-assisted in-person counter workflow, not
  the plain paper-form completion this schema models).

49 `fields[]` entries in total (45 fields shared verbatim with the passport
schema, minus its `passportValidityPeriod`, plus four ID-card-only fields:
`expeditedCollectionOffice`, `idCardValidityPeriod70Plus`,
`eidCertificateOptOut`, `addressAbroad`), plus 3 `documents[]` entries: the
applicant photograph, a signature specimen, and the form's own printed
criminal-liability truthfulness declaration under Art. 313 of the Penal Code
— all three reused verbatim from the passport schema, since the photo/
signature/declaration requirements are identical regardless of document-type
pathway.

## Scoping and modeling judgment calls

- **Same shared civil-identity-document form, scoped to the National ID
  vertical this time.** This schema and `bg/mvr/zayavlenie-za-izdavane-na-pasport`
  share an identical `source.url`/`sha256` while remaining disjoint in scope
  — the ID-card `requestedDocumentType` enum here has zero overlap with the
  passport-family enum there, and every field either schema models as
  document-type-specific (`passportValidityPeriod` there;
  `expeditedCollectionOffice`/`idCardValidityPeriod70Plus`/
  `eidCertificateOptOut`/`addressAbroad` here) is excluded from the other,
  consistent with how this registry already permits two schemas against the
  same underlying regulation Annex when they model genuinely distinct
  application pathways.
- **`expeditedCollectionOffice` modeled as a two-value enum, not a free-text
  office name.** The source prints exactly two selectable checkboxes (ЦАО
  Младост, ЦАО Лъвов мост) under a shared "СДВР ДБДС" authority label, not an
  open-ended office directory.
- **`eidCertificateOptOut` modeled as `boolean`, not `enum`.** A genuine
  yes/no opt-out declaration (checkbox present or absent), matching this
  registry's established convention for the identical pattern elsewhere in
  the registry (e.g. `mx/sre/passport-application`).
- **`idCardValidityPeriod70Plus` modeled as optional, not `requiredWhen`
  gated on age.** Same reasoning as the passport schema's own
  `passportValidityPeriod`: the form ties this election to citizens 70+ but
  prints no explicit date-of-birth-derived boolean field an agent could
  evaluate a `requiredWhen` condition against.
- **`addressAbroad` modeled as a single field, not a structured address
  block.** Direct coordinate inspection of the source (see "Field
  derivation" above) confirmed the address-abroad section prints exactly one
  blank entry line under one label, not a multi-line address grid like the
  form's own `address`/`changedAddress` fields — this resolves the open
  question flagged in the passport schema's own exclusion note ("needs fresh
  extraction — its field list was not detailed").
- **`height` modeled as `integer` with no invented min/max**, reused verbatim
  from the passport schema for the same reason (the source prints a bare
  blank line with no unit or range indicated).
- **Guardian block and parents table modeled as fixed-arity named fields**,
  reused verbatim from the passport schema (both are printed as a fixed,
  small number of distinctly labelled rows, not an open-ended repeating
  list).
- **No `edition` axis.** A standing application form, not a dated annual
  filing.
- **`process.type` is `application`**, matching this registry's convention
  for first-issuance application forms.

## Conformance run

No PDF/AcroForm widget-count cross-check applies (the source is a flat
text-layer specimen, not an AcroForm). In its place, three hand-authored mock
instances were built and checked against `schema.json`'s own
`required`/`validation.enum`/`validation.maxLength`/`validation.pattern`
grammar with a disposable, from-scratch Python checker (not committed, per
this registry's established practice of not committing one-off verification
scripts):

- **`adult-single-applicant`** — a Bulgarian-citizen adult applicant,
  standard ID-card request, standard service tier, no proxy, no guardians.
  16 of 49 fields populated. **PASS.**
- **`elderly-expedited-with-proxy`** — an applicant aged 76 requesting
  expedited service, populating `idCardValidityPeriod70Plus`,
  `eidCertificateOptOut`, `expeditedCollectionOffice`, `addressAbroad`, and
  the full authorized-person (proxy) block. 26 of 49 fields populated.
  **PASS.**
- **`minor-first-issuance`** — a temporary-ID-card request for a minor on a
  first-time issuance, populating the full guardian1 block and the
  mother/father particulars table. 26 of 49 fields populated. **PASS.**

Four mutation-control checks confirmed the checker actually enforces the
grammar rather than passing vacuously: dropping `nationalId` (unconditionally
required — correctly flagged missing); setting `sex` to an out-of-enum value
(correctly flagged as an enum violation); dropping `submissionDate`
(unconditionally required — correctly flagged missing); and setting
`requestedDocumentType` to `passport` (correctly flagged as an enum
violation — confirms the ID-card/passport scoping boundary between this
schema and `bg/mvr/zayavlenie-za-izdavane-na-pasport` is actually enforced,
not merely asserted in prose). Each mutation raised exactly its one expected
error.

```
$ node tools/validate.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-lichna-karta/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` was already installed (ajv/ajv-formats). `pdfjs-dist@4`
was installed to a disposable scratch npm project outside the repo
(`/tmp/bg-idcard`), never touching `tools/`'s committed dependency set.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/` — see the diff in this PR for
the updated jurisdiction/document counts.

## Scope and jurisdiction notes

- Closes Bulgaria's **National ID & Civic Documents vertical (6 of 6)**:
  Taxes (two schemas, GOV-2821), Visa (GOV-2830), DMV (GOV-2853), Passport
  (GOV-2860), National ID (this schema). Business Formation was already
  confirmed a dead end (GOV-2830/GOV-2837). **Bulgaria now stands at 6 of 6
  verticals** — the second non-original jurisdiction (after Colombia) to
  reach full coverage.
- `jurisdiction.level` is `national` — MVR is Bulgaria's national Ministry of
  Interior and sole ID-card-issuing authority.
- `process.type` is `application`, matching this registry's convention for
  first-issuance application forms.
- `process.language` is `bg`: this form's text layer is Bulgarian-only, with
  no English secondary captions found anywhere on either page (same finding
  as the passport schema's own record).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) confirming the source PDF has
not been superseded by a newer edition; (2) re-confirming this schema's own
`requestedDocumentType` scoping boundary against `bg/mvr/zayavlenie-za-izdavane-na-pasport`
holds up against any future revision of the underlying MVR regulation; and
(3) now that Bulgaria has reached 6 of 6 verticals, considering whether any
of its five schemas would benefit from a second review pass focused on
upgrading `maturity.level` beyond `structural-reference`.
