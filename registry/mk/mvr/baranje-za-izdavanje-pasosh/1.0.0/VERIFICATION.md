# Verification record — `mk/mvr/baranje-za-izdavanje-pasosh` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2939**, following the
**GOV-2937** research cycle that pre-verified this candidate). North
Macedonia already exists in the registry (opened as the 54th jurisdiction
via Taxes, GOV-2919); this document advances North Macedonia's **Passport
vertical (2 of 6)**. Visa was confirmed a dead end during the same GOV-2937
cycle (sibling scouting note, not re-screened here).

## Source re-verification (Phase 1)

- **Authority:** МВР (Министерство за внатрешни работи, Ministry of
  Internal Affairs), a national ministry.
- **Source page:** `https://mvr.gov.mk/mk-MK/uslugi/gragjanski-postapki`
  (Граѓански постапки / Civil Procedures forms page). Independently
  re-fetched this cycle (`curl -sL`, HTTP 200, 659,532-byte HTML); confirmed
  both candidate PDF links are genuinely present on this live page, each
  anchored by its own visible link label: `...-xE03.pdf` is labelled
  "Барање за издавање пасош тип А" and `...-Ni0J.pdf` is labelled "Барање
  за издавање пасош тип Б" — resolving the Type A/Type B question directly
  from the source page's own markup, not by inference.
- **Modelled candidate (Type A):** `https://portal.mdt.gov.mk/post-documents/gragjanski-postapki-document-xE03.pdf`
  — independently re-fetched this cycle with `curl -sL`. **HTTP status:**
  `200`. **Content-Type:** `application/pdf`. **Size:** `1,440,598` bytes —
  matches the issue's own citation exactly. **sha256:**
  `09e4cf57ee51fc452c60d7317964c2c180d10788a2c0fe0f8590c59608a2d75c` —
  independently computed this cycle with `sha256sum`, matching the issue's
  own citation exactly.
- **Type B mirror (not modelled):** `https://portal.mdt.gov.mk/post-documents/gragjanski-postapki-document-Ni0J.pdf`
  — independently re-fetched this cycle. **HTTP status:** `200`.
  **Content-Type:** `application/pdf`. **Size:** `2,064,363` bytes —
  matches the issue's own citation exactly. **sha256:**
  `e74d30803a0171979e84bfb62b40a434ebcb8f6fa01e43ddcd60cc8525d12351`.
- **File type:** both are genuine PDFs with real embedded fonts and `Tj`/`TJ`
  text-drawing operators (not scanned images) but **zero AcroForm/Widget
  annotations** — confirmed via `pdfjs-dist@3` (`legacy/build/pdf.js`)
  `page.getAnnotations()` returning 0 widgets on every page of both files.
  Both are print-and-lodge specimens, not fillable AcroForms.
- **Text-extraction caveat confirmed:** the source's font subsetting lacks a
  proper ToUnicode CMap. `page.getTextContent()` on both files returns
  glyph-garbled strings (e.g. Cyrillic б/а/р/а/њ/е comes back as
  `Ilpluor`/`6p.7` fragments) — unusable directly. Per the issue brief's own
  guidance, this cycle instead independently rendered every page of both
  candidates to a PNG image (`pdfjs-dist@3` + `node-canvas`, scale 2.5,
  using a `NodeCanvasFactory` — pdfjs-dist v4's `legacy/build/pdf.mjs`
  crashed on this file's inline JPEG XObjects with `TypeError: Image or
  Canvas expected`; downgrading to `pdfjs-dist@3.11.174`'s CommonJS
  `legacy/build/pdf.js` build resolved it) and read every field directly
  off the rendered image. This is a full visual read, not a
  coordinate-correlation exercise (there are no AcroForm widget rects to
  correlate against), since neither candidate has any fillable widgets.

## Type A vs. Type B disambiguation

Both candidates share the same seven-section structure (reason for
application, applicant/parent data, minor-guardian consent, previous-document
data, processing tier, submission, and an attachment checklist plus
data-use consent), but they are a **genuinely distinct pair of editions**,
not a redundant duplicate:

- **Type A** (Прилог бр. 7, `xE03.pdf`, 2 pages, 790 raw text items) is
  printed in Macedonian only, and its Section 2.2 offers three independent
  checkbox groups requesting Turkish/Vlach/Serbian/Roma/Bosnian-language
  processing of the resulting document, the applicant's own name data, or
  the form's data generally.
- **Type B** (Прилог бр. 8, `Ni0J.pdf`, 2 pages, 1,423 raw text items) is
  printed bilingually in Macedonian and Albanian throughout (every field
  label, heading, and instruction line is duplicated: `ИМЕ/EMRI`,
  `ПОЛ/GJINIA`, etc.), drops Type A's Section 2.2 minority-language
  checkboxes entirely, and adds a field with no Type A counterpart:
  `НАЦИОНАЛНА ПРИПАДНОСТ / PËRKATËSIA NACIONALE` (national/ethnic
  affiliation).

Type A is modelled in this document as the general-purpose specimen: its
own Section 2.2 checkbox list (Turkish/Vlach/Serbian/Roma/Bosnian) notably
does **not** offer Albanian, which is presumably why the bilingual Type B
exists as its own dedicated pathway specifically for applicants requesting
Albanian-language processing. Type B is disclosed here as a real, sourced,
out-of-scope candidate for a possible future companion schema; it is not
modelled in this cycle, per this registry's one-deliverable-per-issue
convention.

## Field inventory (Phase 2)

All 31 `fields[]` entries and 9 `documents[]` entries are listed inline in
`schema.json` with a `sourceRef`/`sourceRef`-equivalent citation to the exact
section and label on the rendered page image. Section-by-section:

| Section (Type A) | Modelled as |
|---|---|
| 1. Причина за барање (7 checkboxes) | `reasonForApplication` (enum) |
| 2.1 ИМЕ / ПРЕЗИМЕ | `givenName`, `surname` |
| 2.2 three language-preference checkbox rows | `formLanguageRequest`, `personalNameLanguageRequest`, `dataLanguageRequest` (each enum) |
| Personal-data block | `marriedSurnameBeforeMarriage`, `dateOfBirth`, `placeOfBirth`, `personalIdNumber`, `sex`, `residenceAddress`, `citizenship` |
| Parent-data block | `fatherName`, `motherName` |
| 3. Guardian consent table (2 rows × 4 columns) | `guardian1Name`/`guardian1PersonalIdNumber`/`guardian1Relationship`/`guardian1Signature`, and the `guardian2*` equivalents |
| 4. Previous-document data | `previousPassportNumber`, `previousPassportIssuingAuthority` |
| 5. Processing tier (2 checkboxes) | `processingTier` (enum) |
| Footer (submission/signature/contact/receiving-official) | `submissionDate`, `submissionPlace`, `applicantSignature`, `contactDetails`, `receivingOfficialSignature` |
| 6. Attachment checklist (8 checkbox rows, spanning pages 1-2) | 8 `documents[]` entries, `identity-document`/`supporting-evidence` |
| 7. Personal-data-use consent checkbox | 1 `documents[]` entry, `category: attestation`, with the exact printed statement text |

## Judgment calls

1. **Reason-for-application modelled as a single `enum`, not seven
   independent booleans.** The form's own instruction ("се одбира еден од
   основите", one of the grounds is selected) states the seven checkboxes
   are mutually exclusive, matching this registry's established
   single-`enum` convention for this shape (e.g.
   `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s `requestedDocumentType`/
   `serviceType`).
2. **Three Section 2.2 language-preference rows modelled as three separate
   optional `enum` fields, not one.** Each row carries its own distinct
   printed request sentence (form itself / personal-name data / form's
   data generally) and each is independently selectable — a single
   applicant could plausibly tick different languages on different rows —
   so collapsing them into one field would lose real information.
3. **Guardian consent block (Section 3) modelled unconditionally
   `required: false`, with no invented gating field.** The form prints no
   explicit boolean checkbox tying this table to minor/ward status (unlike
   the reason-for-application or processing-tier checkboxes, which are
   genuine widgetless-but-explicit checkbox groups); consistent with this
   registry's established convention for this exact pattern (see
   `si/mzez/vloga-za-pridobitev-potnega-lista`'s legal-representative
   block and its own judgment call 2).
4. **Section 6's attachment checklist modelled as `documents[]`, not
   `fields[]`.** Per GSP-0014, these are document/evidence requirements,
   not applicant-entered data. Two entries (`birthOrMarriageRegistryExtract`,
   for reasons 1.1/1.3; `lostMissingStolenPassportReport` and
   `passportInvalidationProof`, for reason 1.5) carry a `requiredWhen`
   condition directly against `reasonForApplication`, mirroring the form's
   own printed `(*)` annotations ("за 1.1 и 1.3", "за 1.5"). The remaining
   attachment items (`parentalConsentOrPowerOfAttorney`, `guardianshipProof`,
   `guardianshipAuthorityConsentForMinorNameChange`) are left
   `required: false` with no `requiredWhen`, for the same reason as
   judgment call 3 above — no explicit form-printed gate exists to attach
   a condition to.
5. **Section 7's consent checkbox modelled as a `documents[]` entry with
   `category: attestation`, not a boolean `fields[]` entry.** This follows
   this registry's established convention for a single sworn/consent
   checkbox with fixed printed text (see `mx/sre/passport-application`'s
   `swornTruthfulnessAndNationalityDeclaration`); the `statement` field
   carries the exact Macedonian text verbatim.
6. **All signature fields modelled as `type: string`.** Consistent with
   this registry's established convention for paper-form signature blocks
   on non-AcroForm specimens.
7. **Office-only fields modelled with `required: false`, not omitted.**
   `receivingOfficialSignature` is completed by MVR staff, not the
   applicant, but is modelled per the instruction to model every printed
   field faithfully.

## Conformance verification

A one-off checker script (`check_conformance.mjs`, not committed — ad hoc
per this registry's convention, mirroring prior cycles, e.g.
`dk/fstyr/samtykkeerklaering-koerekort-under-18`) was written to evaluate
every fixture in `conformance/mk/mvr/baranje-za-izdavanje-pasosh/1.0.0/`
against this schema's `fields[]` (`required`/`requiredWhen`/`validation.enum`)
and `documents[]` (`required`/`requiredWhen`) rules. Results:

| Fixture | Errors | Expected |
|---|---|---|
| `valid-first-issuance-adult.json` | 0 | 0 |
| `valid-duplicate-lost-passport-minor-guardian.json` | 0 | 0 |
| `mutation-control-missing-static-required-reason.json` | 1 (`reasonForApplication` missing) | 1 |
| `mutation-control-invalid-enum-reason.json` | 1 (`reasonForApplication` value not in enum) | 1 |
| `mutation-control-missing-conditional-document-first-issuance.json` | 1 (`birthOrMarriageRegistryExtract` requiredWhen violated) | 1 |
| `mutation-control-missing-conditional-document-duplicate.json` | 1 (`lostMissingStolenPassportReport` requiredWhen violated) | 1 |
| `mutation-control-missing-attestation.json` | 1 (`dataProcessingConsentDeclaration` missing) | 1 |

All 7 fixtures produced exactly the expected error count. The two valid
scenarios cover both a reason requiring the birth/marriage extract
(first-issuance) and a reason requiring the two duplicate-passport
documents (lost/missing/stolen) plus the guardian block; the five mutation
controls each isolate exactly one rule type (plain `required` on a field,
`validation.enum`, two independent `requiredWhen` conditions on
`documents[]`, and plain `required` on a `documents[]` attestation entry) by
construction.

## Shared-checkout note

Two sibling in-progress schemas from concurrent GOV-2937 child issues
(`mk/mvr/baranje-za-izdavanje-na-lichna-karta`,
`mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola`) were present as untracked
files under `registry/mk/mvr/` in this shared checkout while this document
was authored. They were temporarily moved aside before running
`npm run build-index` so this document's own `registry-index.json`
regeneration would not prematurely include their still-in-progress entries,
then restored unmodified immediately after. This document's own git history
touches only `baranje-za-izdavanje-pasosh`.

## Registry validation

- `node tools/validate.mjs registry/mk/mvr/baranje-za-izdavanje-pasosh/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/mk/mvr/baranje-za-izdavanje-pasosh/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
- `tools/govschema-client/registry-index.json` regenerated via `npm run build-index` (440 entries, +1) and diffed — only this document's entry added.
