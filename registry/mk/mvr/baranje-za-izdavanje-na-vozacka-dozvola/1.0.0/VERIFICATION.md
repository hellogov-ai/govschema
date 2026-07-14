# Verification record — `mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2940**, following the
**GOV-2937** research cycle that pre-verified this candidate). North
Macedonia already exists in the registry as of this cycle's start (opened at
54th jurisdiction by GOV-2919, via Taxes) with one schema. This document
advances North Macedonia's **DMV vertical (1 of 6, opening it)**.

## Why this candidate

The Ministry of Internal Affairs (МВР) links this form directly and
unauthenticated from its own public "Граѓански постапки" (Civil Procedures)
service page, under the driving-licence-issuance section. It is served from
`portal.mdt.gov.mk`, the Ministry of Digital Transformation's shared
document CMS used across multiple MK ministries — a first-party government
host, not a third-party aggregator. No login/CAPTCHA/eID wall stands between
the service page and the PDF.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Министерство за внатрешни работи (МВР, Ministry of
  Internal Affairs).
- **URL:** `https://portal.mdt.gov.mk/post-documents/gragjanski-postapki-document-Ddz8.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl` from scratch (not trusted from the issue's own cited hash).
- **HTTP status:** 200. **Content-Type:** `application/pdf`. **Size:**
  1,716,897 bytes. **sha256:**
  `6cc5484a461065ea5a4c20d9960ef7ca125019429ac14bf7596d3ee3f9bf471a`
  (independently computed this cycle with `sha256sum`) — matches the
  GOV-2937 candidate-verification cycle's own independently-derived size
  exactly, a second independent confirmation that the source is stable and
  unchanged.
- **Mirror check:** the issue also flagged a near-identical mirror at
  `...-document-P4TM.pdf`. Independently re-fetched: 1,716,896 bytes, sha256
  `6e1bda6999aac677aa64f65659d7e8ccfc128be87dfbed056fa0fa409b8372e5`. `cmp`
  against the Ddz8 copy shows the two are byte-identical up to the point the
  shorter file ends — the P4TM mirror is the *same edition*, truncated by
  exactly one trailing byte, not a distinct form. Ddz8 (the copy actually
  linked from mvr.gov.mk's own service page) is treated as canonical; P4TM
  is not independently cited.
- **Extraction method:** `pdfjs-dist` (`legacy/build/pdf.js`) confirms 2
  pages, `doc.getFieldObjects()` returns 0 entries, and
  `page.getAnnotations()` returns 0 `Widget` annotations on either page — a
  genuine print-and-fill form, no AcroForm. `page.getTextContent()` returns a
  real, dense text layer (~2,600 characters/page), but the embedded font's
  ToUnicode/CID mapping is broken: the extracted strings do not decode to
  the actual Cyrillic content (the same gotcha disclosed on this cycle's
  passport sibling, GOV-2937/GOV-2939). Raw text extraction was therefore
  unusable for field labels. Instead, both pages were rendered to PNG at
  3x scale via `node-canvas` + `pdfjs-dist`'s `page.render()`, and every
  field/label/instruction in this schema was read directly off the
  rendered image, with the text layer's glyph x/y coordinates used only to
  confirm row/column/table-boundary structure (never as a source of
  character content).
- **What it confirms:** every field this document models, verbatim,
  transcribed from the rendered page images: the 11-way procedure-reason
  list (Part 1), the applicant identity/residence block and its five
  independent name-transliteration-language checkboxes (Part 2), the
  regular/urgent procedure choice (Part 3), the previous-licence reference
  block (Part 4), the 12-item required-attachment checklist (Part 5), the
  ex-officio-data-use consent checkbox (Part 6), and the closing filing
  date/place, contact-details, and signature lines, plus the form's own
  "УПАТСТВО ЗА ПОПОЛНУВАЊЕ" (filling instructions) at the foot of page 2.

### Source 2 (service page, context only)

- **URL:** `https://mvr.gov.mk/mk-MK/uslugi/gragjanski-postapki`
- Fetched this cycle to check for a citable legal basis (law/rulebook name
  or number) for this procedure. None is stated on the page — it lists
  required documents and fees per sub-procedure but no statute reference.
  The PDF itself likewise carries no footer/footnote statute citation
  (contrast with `mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost`,
  whose form footer cites the Official Gazette issue and article numbers
  directly). Accordingly, `authority.operatedBy` is omitted from this
  document rather than asserting an unconfirmed citation, following the
  precedent set by `bg/mvr/zayavlenie-za-izdavane-na-svidetelstvo-za-upravlenie-na-mps`
  (a sibling MVR driving-licence schema with the same gap).

## Corrections to the GOV-2937 scouting note

Independent re-verification found two inaccuracies in the GOV-2940 issue's
own scouting-cycle description of the form content, both corrected in this
schema rather than carried forward:

1. **Sub-procedure list.** The issue described the form as covering "first
   licence (1.1), moped (1.2), new category (1.3), replacement-worn (1.4),
   replacement-expired (1.5), foreign-exchange (1.6), duplicate (1.7)" — a
   7-item list. The rendered page 1 actually shows an **11-item** list
   (1.1-1.11) with different content throughout: 1.2 is foreign-to-Macedonian
   exchange (not moped), 1.3 is expiry-replacement (not new category), and so
   on — see `procedureReason`'s `description` for the full, independently
   re-read list. The scouting note's guess was not usable as a basis for
   authoring and was fully discarded in favor of this cycle's own reading.
2. **Transliteration languages.** The issue described the name-transliteration
   checkboxes as "Turkish/Albanian/Serbian/Romani/Bosnian." The rendered page
   1 actually shows **Turkish/Vlach/Serbian/Romani/Bosnian** — item 2 is
   "Влашки јазик и писмо" (Vlach/Aromanian), not Albanian (which would read
   "албански" and looks nothing like "влашки" even under the source's broken
   text encoding). Modelled as `nameInVlach`, not an Albanian field.

The issue's core sourcing claims (URL, HTTP 200, PDF magic bytes, file size,
0 AcroForm widgets, garbled text layer) were all independently reconfirmed
and are accurate.

## Disclosed judgment calls

- **`residenceLocality` / `residenceAddress` cell boundary.** Part 2's
  bottom row prints two column headers, "Живеалиште/Престојувалиште" and
  "Место/Адреса," each followed by a tall blank cell with no further
  sub-labelling. The precise intended semantic split between the two cells
  (e.g. "registered municipality" vs. "street address," or a single address
  split arbitrarily across two writing areas) is not fully disambiguated by
  the source's own layout. Modelled literally as two distinct string
  fields, one per printed header, rather than merged into one field or
  guessed apart further.
- **`existingDrivingLicence` document's 1.4 exception.** Part 5 item 3
  requires the existing licence for procedures "1.2., 1.3., 1.4. (освен при
  губење на возачка дозвола), 1.5., 1.6., 1.8. и 1.9." — i.e. 1.4 EXCEPT
  when the reason for that 1.4 filing specifically is loss (not wear or
  damage). Procedure 1.4 itself ("ЗАМЕНА ... ПОРАДИ ГУБЕЊЕ, ДОТРАЕНОСТ ИЛИ
  ОШТЕТЕНОСТ") bundles loss/wear/damage into one `procedureReason` code with
  no sub-field distinguishing which of the three applies, so this exception
  cannot be expressed as a machine-checkable `requiredWhen` at this
  schema's field granularity. Disclosed on the document entry's `sourceRef`
  rather than silently dropped or silently over-included.
- **`medicalFitnessCertificate` / `proofOfForeignLicenceVehicleCategories`
  conditions.** Both documents' printed trigger conditions (age ≥ 75; a
  specific set of licence categories; validity restrictions; an unclear
  foreign-licence text) depend on data this form does not itself collect as
  a field (age, requested/held vehicle category). Left as plain optional
  documents without a `requiredWhen`, with the condition documented in each
  entry's `sourceRef` for a consuming agent to apply out-of-band.
- **`consentToExOfficioDataUse` requiredness.** The source form does not
  mark this checkbox as unconditionally mandatory in the printed text, so it
  is modelled as a plain optional boolean rather than `required: true`,
  even though several ex-officio-marked `documents[]` entries reference it
  functionally.
- **No `authority.operatedBy`/legal-basis citation** — see Source 2 above.

## Field inventory

- **Fields:** 21 (`fields[]`), covering Parts 1, 2, 3, 4, 6, and the closing
  block.
- **Documents:** 12 (`documents[]`), covering Part 5's full attachment
  checklist, including the two conditionally-required and one always-required
  categories, three ex-officio-obtained (`*`) entries, and the free-text
  catch-all.
- **Exclusivity groups:** 1 (`procedureUrgencyChoice`, over
  `isRegularProcedure`/`isUrgentProcedure`).

## Conformance testing

Six fixtures under `conformance/mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola/1.0.0/`
were checked against this schema's `required`/`requiredWhen`/`validation`/
`exclusivityGroups` rules with a throwaway local evaluator (not committed —
ad hoc, per this registry's established mock-conformance-testing practice):

- `valid-first-time-issuance.json` — procedure 1.1, regular processing: no
  rule violations.
- `valid-foreign-licence-exchange-urgent.json` — procedure 1.2, urgent
  processing, two transliteration-language checkboxes set: no rule
  violations.
- `mutation-control-missing-applicant-first-name.json` — omits the required
  `applicantFirstName`: correctly flagged missing.
- `mutation-control-invalid-procedure-reason-enum.json` — sets
  `procedureReason` to `"1.12"`, outside the 11-value enum: correctly
  flagged.
- `mutation-control-invalid-personal-id-number-pattern.json` — sets
  `personalIdNumber` to a 5-digit value against the 13-digit pattern:
  correctly flagged.
- `mutation-control-both-procedure-urgency-checkboxes.json` — sets both
  `isRegularProcedure` and `isUrgentProcedure` to `true`: correctly flagged
  by the `procedureUrgencyChoice` exclusivity group.

All six behaved as expected. This document is authored at
`structural-reference` maturity: the form's own printed structure is fully
transcribed and machine-checkable where the source data permits, but no live
MVR submission was attempted.

## Meta-schema validation

```
$ node tools/validate-ajv.mjs registry/mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola/1.0.0/schema.json
ok   registry/mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
