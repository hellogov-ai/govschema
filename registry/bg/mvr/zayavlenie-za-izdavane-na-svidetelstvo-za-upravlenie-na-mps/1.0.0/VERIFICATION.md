# Verification record — `bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2853** (parent **GOV-2851**).
This schema **opens Bulgaria's DMV vertical (3 of 6)**, following the Taxes
vertical opened in GOV-2821 (NRA's Form ОКД-5 and Обр. 2001, PRs #466/#467)
and the Visa vertical opened in GOV-2830 (MVnR's Type-D national visa
application, PR #469).

## Pre-scouted candidate, independently re-verified

The prior GOV-2837 cycle screened this exact candidate while scouting for a
Romania authoring target and logged it in `CATALOG.md` (~line 13625,
"Correction (GOV-2837)") as a genuine, ready-to-author DMV lead for a future
Bulgaria cycle — distinguishing it from Bulgaria's already-confirmed
vehicle-registration dead end (system-generated at the counter, per
GOV-2830's own VERIFICATION.md; the two are different MVR forms covering
different DMV processes, not the same source). Per this issue's own
instruction, that prior cycle's byte count was **not** trusted blindly —
the source was independently re-fetched, re-hashed, and re-extracted fresh
this cycle.

## Source verification (independently fetched this cycle)

- **Source page:** `https://mvr.bg/dbds/дейности/административно-обслужване/blanki`
  ("Бланки и образци" — Forms and specimens), MVR's own static-forms page.
  Fetched directly, HTTP 200, 74,186 bytes of static HTML (no JavaScript
  needed — all specimen links are plain `<a href="...">` anchors in the raw
  response). The page lists two distinct MVR ID-document specimens side by
  side: "заявление приложение № 2 ЛК.pdf" (лична карта / national ID card)
  and "заявление приложение № 2a СУМПС.pdf" (свидетелство за управление на
  МПС / driving licence) — this schema models the latter (СУМПС), matching
  the issue's "Приложение № 2а" description; the former (ЛК) is a distinct,
  separate specimen already spot-checked weak for National ID in GOV-2821
  and out of scope here.
- **Fetched file:** `https://mvr.bg/upload/301782/%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%E2%84%96%202a%20%D0%A1%D0%A3%D0%9C%D0%9F%D0%A1.pdf`
  (percent-encoded form of "заявление приложение № 2a СУМПС.pdf"; this
  schema's `source.url`).
  - **HTTP 200**, `Content-Type: application/pdf`, **382,212 bytes** — byte-
    for-byte identical to the count the prior GOV-2837 cycle recorded,
    confirmed by an independent fresh `curl` fetch this cycle rather than
    assumed.
  - **`sha256`:** `e633ee22c10e650186b69b5c2278a51c02eb8fb7c413fee875c724066cec9576`.
  - **1 page.** Confirmed via `pdfjs-dist@6` (legacy build, Node.js): a
    genuine text-layer PDF (not a scanned image) — every label and blank-line
    placeholder extracts as a discrete, correctly-positioned text item.
    **Zero AcroForm `Widget` annotations** (`page.getAnnotations()` returned
    an empty array) — this is a flat specimen, not a fillable AcroForm PDF,
    so field boundaries were derived from printed labels and their x/y
    text-item coordinates rather than widget names.
  - The PDF's 4 embedded `FontFile2` (TrueType) programs confirmed fonts are
    embedded (not a font-substitution risk). A full-page render was attempted
    via `pdfjs-dist` + `node-canvas` (as this registry's established
    render/extract technique) but came back blank (0 non-white pixels) in
    this sandboxed environment despite embedded fonts and a supplied
    `standardFontDataUrl` — disclosed here as an environment limitation
    rather than silently omitted. Field derivation instead relied entirely
    on the text-layer's coordinate data (row-grouped by rounded y, columns
    ordered by x), which is unambiguous for a flat, single-column-per-row
    static form like this one.

## Extraction method

Text-layer extraction via `pdfjs-dist@6` (legacy build), reusing this
registry's established Node.js + `pdfjs-dist` extraction technique. Every
text item's string, x, and y were dumped and grouped into rows by rounded y
(items on the same visual row share a y within ~1pt due to minor baseline
offsets between adjacent font runs), then ordered left-to-right by x within
each row. No AcroForm widget correlation was possible (zero widgets present),
so field boundaries were read directly off this coordinate-grouped transcript
— each printed label, blank line ("......"), boxed grid (the 10-box `ЕГН/ЛНЧ/ЛН`
identifier), and checkbox row was matched to its adjacent label text.

## Field derivation, by section

- **Header.** A processing-tier checkbox row (`serviceType`: обикновена/
  бърза/ускорена — standard/fast/expedited) and a 10-box national-identifier
  grid (`nationalId`: ЕГН/ЛНЧ/ЛН). The incoming/office-reference-number field
  (`Вх. номер`) and its adjoining `До` (addressee) caption are office-intake
  only and excluded.
- **Personal-data section.** Date and place of birth; full name printed twice
  in parallel — once in Cyrillic (`namesInCyrillic`) and once transliterated
  to Latin script (`namesInLatin`), both required per this form's own
  dual-script layout (Bulgarian ID documents print both scripts on the
  physical document) — plus a structured breakdown into `familyName` and
  `otherNames`; address; sex (`М`/`Ж` checkboxes); an "other nationality"
  field with an adjoining naturalization-decree-number field
  (`citizenshipDecreeNumber`, per the printed `Указ / Decree` label); optional
  phone/email (the form's own printed note states email is used only for
  optional readiness/expiry notifications); and the office where the
  finished document should be collected (`placeOfReceiving`).
- **Authorized-person (proxy) block — `Данни за упълномощено лице`.** The
  form's own printed instruction restricts this entire block to the case
  where the finished document will be collected by an authorized person
  rather than the applicant. It prints no explicit boolean/checkbox gate
  tying the block to a specific yes/no question, so — per this registry's
  established precedent for un-gated conditional blocks (e.g. GOV-2739's
  `jo/cspd` guardian block) — all seven fields in this block
  (`authorizedPersonName`, `authorizedPersonNationalId`,
  `authorizedPersonDocumentType`, `authorizationDate`,
  `authorizedPersonDocumentNumber`, `authorizedPersonDocumentIssueDate`,
  `authorizationSignature`) are modeled as unconditionally optional rather
  than an invented `requiredWhen` gate.
- **Category-renunciation section.** A free-text field
  (`categoriesToDecline`) for an applicant voluntarily renouncing previously
  held driving-licence categories, per the form's own "Fill in categories
  which you would like to decline to" instruction — optional, since renouncing
  a category is not the form's primary purpose.
- **Submission section.** The identity document presented at submission —
  either a Bulgarian ID card (`idCardNumber`) or, for a foreign-national
  applicant/proxy, a residence permit (`residencePermitNumber` +
  `residencePermitIssueDate`) — printed as two alternative lines with no
  checkbox distinguishing which applies; both modeled as optional rather than
  inventing an exclusivity rule the source does not print. `submissionDate`
  and the final `applicantSignature` (name standing in for a physical
  signature, per this registry's established paper-form-signature
  convention) are required, as is `submitterName` — the printed name of
  whoever appears in person to submit the application (the applicant or their
  designated proxy), which precedes the identity-document row and is
  distinct from the civil-registry name fields captured earlier in the
  personal-data section.
- **Excluded — office/civil-registry-verification-only content.** Five
  "Вярно/Невярно" (True/False) checkbox pairs are printed throughout the
  personal-data section, each immediately adjacent to a field the form's own
  explanatory paragraph says is normally auto-filled from Bulgaria's civil-
  population and ID-document registries ("НБД „Население‟" and "НАИФ
  „НРБЛД‟") for MVR staff to confirm against the civil registry at the
  counter — not applicant-fillable, so excluded, consistent with this
  registry's established office-only-column exclusion precedent (e.g.
  `bg/mvnr`, `rs/mfa`, `gr/mfa`). The `от МВР` issuing-authority caption is
  static text (MVR is the sole issuer) and excluded. `Имена на служителя,
  приел заявлението` / `Подпис на служителя` (the receiving official's own
  name/signature) are also office-only and excluded.
- **`documents[]`.** A passport-style photograph (`applicantPhoto`, "Снимка
  3,5/4,5", top-left of the page); a signature specimen reproduced on the
  physical licence (`signatureSpecimen`, a small "Подпис" box in the left
  margin, aligned with the place-of-birth row — distinct from the
  `applicantSignature`/`authorizationSignature` fields, which are this
  application's own typed-name attestations, not the licence's stored
  signature image); and the form's own printed criminal-liability
  truthfulness declaration (`truthfulnessDeclaration`, citing Art. 313 of the
  Penal Code).

## Validation

```
$ node tools/validate.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps/1.0.0/schema.json
ok   registry/bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Both were also run against the full registry (428/428 documents, 3/3
mapping.json companions) with this schema included, confirming no regression
elsewhere.

## Conformance check

A throwaway Node.js script built a synthetic instance from this schema's own
`fields[]` (one valid sample value per field, respecting each field's `type`/
`enum`/`pattern`) and checked it against a small hand-rolled validator
(required-field presence, enum membership, pattern/maxLength) mirroring
what a consuming agent would enforce:

- A fully-populated valid instance passed with zero errors.
- Removing a required field (`familyName`) was correctly flagged as missing.
- Setting `sex` to an out-of-enum value (`"unspecified"`) was correctly
  flagged as an enum violation.
- Setting `nationalId` to a value violating its `^[0-9A-Za-z]{1,15}$` pattern
  was correctly flagged.
- An instance containing only the 14 `required: true` fields (all 15
  optional fields omitted) passed with zero errors, confirming the optional
  fields are genuinely optional and not accidentally load-bearing.

`tools/node_modules` was regenerated via `npm ci --include=dev` (ajv/
ajv-formats only, no wipe of `pdfjs-dist`/`canvas` since those were installed
to a scratch directory outside `tools/`, `/tmp/pdf-extract`, specifically to
avoid the previously-documented `npm install <pkg>` wipe-of-devDependencies
gotcha). `tools/package.json`/`package-lock.json` are unchanged by this
cycle.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/` — see the diff in this PR for
the updated jurisdiction/document counts.

## Scope and jurisdiction notes

- **Opens Bulgaria's DMV vertical (3 of 6).** Passport, Business Formation,
  and National ID & Civic Documents remain open, unscreened Bulgaria backlog
  (Business Formation was screened and found a dead end for a first-party,
  unauthenticated, non-JavaScript fetch in GOV-2830; National ID was
  spot-checked weak in GOV-2821). Not re-screened this cycle, which was
  scoped to authoring this pre-identified DMV candidate.
- `jurisdiction.level` is `national` — MVR is Bulgaria's national Ministry of
  Interior and sole issuer of Bulgarian driving licences.
- `process.type` is `application`, matching this registry's convention for
  licence/permit application forms.
- `process.language` is `bg`: the modeled edition is the sole Bulgarian-
  language specimen found on this source page (unlike the MVnR visa source
  page, no other-language editions of this MVR form were found).
- `authority` is MVR (Министерство на вътрешните работи, Ministry of
  Interior) — distinct from MVnR (Министерство на външните работи, Ministry
  of Foreign Affairs), the issuer of GOV-2830's visa schema; the two
  abbreviations differ by one letter and are easy to conflate, so this is
  called out explicitly.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) re-confirming the source
PDF's byte count/hash have not changed (no `Last-Modified` header was
returned by this fetch to anchor a specific publish date); (2) re-attempting
a full-page visual render once a font-rendering-capable environment is
available, to positively confirm the `Подпис` signature-specimen box's exact
boundaries rather than relying on coordinate inference alone; (3) whether
Bulgaria's remaining unscreened verticals (Passport, Business Formation with
a JavaScript-executing browser, National ID) should be scouted for a future
cycle.
