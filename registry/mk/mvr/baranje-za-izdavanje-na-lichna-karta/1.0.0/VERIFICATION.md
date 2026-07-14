# Verification record — `mk/mvr/baranje-za-izdavanje-na-lichna-karta` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is `GovSchema Standard Research` cycle **GOV-2942** (parent GOV-2937).
North Macedonia was opened as the registry's 54th jurisdiction via Taxes
(GOV-2919). This document opens North Macedonia's National ID & Civic
Documents vertical (4 of 6, alongside Taxes, DMV, and the
concurrently-merged GOV-2939 passport schema).

## Source verification (independently re-fetched and re-derived this cycle)

- **Fetched file:**
  `https://portal.mdt.gov.mk/post-documents/gragjanski-postapki-document-18rr.pdf`
  — re-fetched fresh this cycle via `curl`, not reused from any cached copy.
  - **HTTP 200**, `Content-Type: application/pdf`, **1,394,396 bytes**,
    matching the issue brief's own claim exactly.
  - **`sha256`:**
    `397cdd15d6facac8f849b52ccf0debc2f6bba06e51c33c0313f936b3be570f62`
    (computed directly against this cycle's own freshly-fetched bytes).
  - Confirmed **2 pages** via `pdfjs-dist`.
- **Extracted with `pdfjs-dist`** (`legacy/build/pdf.js`, CommonJS `require`
  — this environment's established technique; note this specific pdfjs-dist
  install ships no `legacy/build/pdf.mjs`, only the CommonJS `pdf.js` build,
  so all scripts this cycle use `require(...)` rather than the `import`
  form used by some earlier cycles' scripts).
  - `doc.getFieldObjects()` returns 0 — **no AcroForm at all**.
    `page.getAnnotations()` confirms 0 `/Widget` annotations on either page.
    This is a genuine print-and-fill specimen, not a flattened AcroForm.
  - `page.getTextContent()` does return a real text layer (331 items on
    page 1, 417 on page 2), but the embedded font uses a non-standard
    encoding: extracted strings are a visually-plausible but wrong
    substitution, e.g. the header's actual printed
    "МИНИСТЕРСТВО ЗА" extracts as the Latin-lookalike string
    `MHHHCTEPCTBO 3A` — and the substitution is not even a clean 1:1
    Cyrillic mapping (`H` stands for both `И` and `Н` depending on
    position, confirmed by comparing the 12-character extracted token
    against the 12-character source word letter-by-letter). Raw text
    extraction is unusable for this specimen; every field in this schema
    was read directly off a rendered image, not off `getTextContent()`.
- **Rendered every page to PNG** via `pdfjs-dist` + `node-canvas`
  (scale 3.0) and read all field labels, checkbox groups, and table
  structure directly off the rendered image. This is the same
  visual-decode gotcha flagged in the issue brief for the sibling
  passport/DMV forms from this same GOV-2937 cycle (GOV-2939/GOV-2940).

## The companion `...-document-5pue.pdf` — re-verified, not a duplicate

The issue brief flagged this file as possibly mis-tagged as "Type B of the
same form" and asked for re-verification before authoring. Independently
re-fetched this cycle:

- **HTTP 200**, `Content-Type: application/pdf`, **1,842,608 bytes** — note
  this does **not** match the issue brief's own claimed size of 869,878
  bytes; the file at this URL has evidently changed since the GOV-2937
  scouting pass (`Last-Modified: Mon, 02 Jun 2025` server-side, so the
  discrepancy predates this cycle rather than being a live edit during it).
  **`sha256`:** `0247109e2a302e7805caaef38952ffafc3b451d733a0e8f753f1699ecf87ad34`.
- Rendered and visually read the same way as the Type A specimen. The
  document is genuinely **Образец бр. 2** ("Form No. 2"), titled
  **"БАРАЊЕ ЗА ИЗДАВАЊЕ НА ЛИЧНА КАРТА / KËRKESË PËR DHËNIE TË
  LETËRNJOFTIMIT, ТИП-Б / LLOJI-B"** — a bilingual Macedonian/Albanian
  specimen of the **same** ID-card application, explicitly self-labelled
  "Type B" in its own header. This confirms the issue brief's suspicion
  that the original "Type B = duplicate" tag was wrong in a different way
  than expected: it is not a duplicate of Type A, and it is not a
  different ID-document type (e.g. not the out-of-scope "посебна лична
  карта" for foreign diplomatic staff) — it is a genuine, distinct,
  officially bilingual companion specimen of this exact form, used in
  municipalities where Albanian has official co-official status per the
  Law on the Use of Languages.
- Field-by-field comparison against Type A (both pages rendered and read):
  Type B keeps every Type A field **except** the two alternate-script
  request checkboxes (turski/vlashki/srpski/romski/bosanski — not needed
  since Type B is already the dedicated Albanian-language specimen), and
  **adds** two fields Type A does not have: "НАЦИОНАЛНА ПРИПАДНОСТ /
  PËRKATËSIA NACIONALE" (ethnic/national affiliation) and "ДРЖАВЈАНСТВО /
  SHTETËSIA" (citizenship).
- **Disposition:** out of scope for this v1.0.0. Modelling Type B requires
  its own source-of-truth-faithful schema (a merged Type A/B hybrid would
  violate this registry's one-schema-per-source-document convention), and
  this issue's own scope is the single "identity card application v1.0.0"
  deliverable. Left as a follow-up candidate rather than silently dropped.

## Field-extraction method (visual read, no AcroForm to correlate against)

With zero widgets on the page, there are no `rect`s to correlate against a
text layer (the coordinate-correlation method used on AcroForm print
specimens elsewhere in this registry does not apply here — there is nothing
to correlate). Every field in `fields[]` was read directly off the rendered
PNG for each page, cross-checked against the printed section numbering
(1, 2, 2.1, 2.2, 3, 4.1–4.3, 5) that structures the form, and against the
(non-widget-backed) blank lines/boxes printed for each entry. The rendered
images were also cross-checked against the bilingual Type B specimen's
Albanian-language captions where a Macedonian label was ambiguous (e.g.
confirming "Податоци за контакт" / "Të dhëna për kontakt" is applicant's own
choice of contact channel, from Type B's own filling instructions, which are
absent on the Type A specimen).

## Field inventory

30 `fields[]` entries plus 5 `documents[]` entries. Every field's exact
source-form section/label reference is listed inline in `schema.json`'s own
`sourceRef`. Summary by section:

| Form section | Fields |
|---|---|
| 1. Причина за барање | `applicationReason` |
| 2.1 Applicant name | `givenName`, `surname` |
| 2.2 Alternate-script requests | `requestedFormLanguage`, `requestedNameLanguage` |
| Married-applicant / parents / birth / residence | `maidenSurname`, `fatherName`, `motherName`, `dateOfBirth`, `placeOfBirth`, `personalNumber`, `sex`, `residenceAddress` |
| 3. Guardian consent (bounded 2-row table) | `guardian1Name`, `guardian1PersonalNumber`, `guardian1Relationship`, `guardian1Signature`, `guardian2Name`, `guardian2PersonalNumber`, `guardian2Relationship`, `guardian2Signature` |
| 4. Previous document | `previousResidenceAddress`, `previousIdCardNumber`, `previousIssuingAuthority` |
| Submission / signoff | `applicationDate`, `applicationPlace`, `applicantSignature`, `contactInfo`, `receivingOfficialSignature` |
| 5. Attachments | `otherRequiredDocumentsDescription` (free-text row) + 5 `documents[]` entries |

## Judgment calls

1. **`applicationReason` modelled as a single 4-value enum, not four
   booleans.** The form's own instruction reads "да се заокружи еден од
   основите" (circle one of the grounds) — no checkbox glyphs are printed
   for 1.1–1.4 (unlike section 2.2's explicit `□` checkboxes), confirming
   single-selection semantics.
2. **`requestedFormLanguage` and `requestedNameLanguage` modelled as two
   independent optional enums, not one.** The form prints two visually
   separate checkbox rows with two separate instructions ("Барам образецот
   да биде изготвен..." vs. "Барам податоците за личното име... да бидат
   испишани..."), each independently stating "се одбира еден" (one is
   selected) — an applicant could request one, both, or neither.
3. **Guardian consent block bounded at 2 rows, not treated as an
   open-ended repeating group.** The printed table shows exactly two
   numbered rows (1, 2) with no continuation notation. Modelled via the
   `guardian1*`/`guardian2*` numbered-field convention already established
   in this registry (e.g. `rw/dgie`'s `child1*`/`child2*`/... fields), all
   `required: false` since the form ties this block to applicant age
   (15–18) with no explicit boolean gate to invent a `requiredWhen`
   condition against.
4. **`applicationDate`/`applicationPlace` modelled as applicant-declared
   (`required: true`), not office-completed.** Unlike the si/mzez sibling
   schema's own administrative-tracking date fields (office-completed,
   `required: false`), this form's "Датум и место на поднесување" line sits
   directly beside the applicant's own signature block, not inside an
   office-only administrative-tracking row — a genuine structural
   difference between the two forms, not a copied assumption.
5. **`documents[]` used for the five starred/unstarred attachment-checklist
   rows, `handling` used instead of a free-text `description` for the
   ex-officio explanation.** The v0.3 meta-schema's `document` def has no
   `description` property (`additionalProperties: false`); an earlier draft
   of this file incorrectly included one and was caught by
   `tools/validate-ajv.mjs` (see Conformance below) before being fixed by
   folding the explanation into `sourceRef` and using the `handling` slug
   (`starred-obtained-ex-officio-by-mvr` / `applicant-provided-not-starred`)
   to distinguish the two categories.
6. **The final attachment-checklist row ("Други документи неопходни за
   постапката ___") modelled as a plain string field
   (`otherRequiredDocumentsDescription`), not a `documents[]` entry.** Unlike
   the other five rows, this row is a blank line for the applicant to name
   an unlisted document, not itself a specific attachment — a
   `documents[]` entry would have no fixed `label`/`category` to describe.
7. **Signature fields modelled as `type: string`.** No signature field is a
   `documents[]` image attachment on this print-and-fill specimen; each
   stands in for a physical signature, per this registry's established
   convention for paper-form signature blocks.
8. **"УПАТСТВО ЗА ПОПОЛНУВАЊЕ..." (filling instructions) excluded
   entirely.** Pure instructional prose on both specimens, not a field.

## Dead ends (carried from the issue brief, not re-screened this cycle)

The МВР "посебна лична карта" (special ID card) form remains confirmed out
of scope — issued only to foreign diplomatic/consular staff accredited in
North Macedonia, not to MK citizens. Not re-verified this cycle; carried
as-is from the GOV-2937 scouting pass.

## Conformance

- `node tools/validate.mjs` — passes (442/442).
- `node tools/validate-ajv.mjs` — passes against the v0.3 meta-schema (this
  document specifically; caught and fixed the `documents[].description`
  additional-property violation described in judgment call 5 above before
  this pass was clean).
- Mock conformance test scenarios authored as real fixtures under
  `conformance/mk/mvr/baranje-za-izdavanje-na-lichna-karta/1.0.0/`, per
  GSP-0016's established `payloads`-style convention (matching the
  fixture-naming pattern already landed this same cycle for the sibling
  `mk/mvr/baranje-za-izdavanje-pasosh` schema): two valid scenarios
  (`valid-first-issuance-adult`, an adult first-issuance case; and
  `valid-duplicate-minor-guardian-language-request`, a minor's guardian
  filing a lost/stolen duplicate with an alternate-script request and the
  previous-document section populated) and three mutation-control cases
  (`mutation-control-missing-static-required-personal-number`,
  `mutation-control-invalid-enum-application-reason`, and
  `mutation-control-invalid-enum-requested-form-language` — the last
  deliberately using `albanian`, a value excluded from this field's enum
  precisely because Albanian has its own dedicated Type B specimen). This
  schema has no `requiredWhen`/conditional logic anywhere (every field's
  requiredness is static — see judgment call 3, guardian block), so no
  conditional-violation fixture applies here, unlike the passport sibling.
  All 5 fixtures independently re-verified against `schema.json` with an
  ad hoc checker (not a permanent repo tool — `tools/conformance-runner.mjs`
  remains out of scope per GSP-0016 §"Out of scope"): both valid scenarios
  produce 0 errors, and each mutation-control scenario produces exactly its
  own declared `expectedErrorCount`/`expectedViolation`.
- `tools/govschema-client/registry-index.json` regenerated via
  `npm run build-index` and diffed — only this document's entry added.

GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of the Republic
of North Macedonia or the Министерство за внатрешни работи.
