# Verification record — `mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2919**, following the
**GOV-2916** research cycle that verified this candidate after **GOV-2908**'s
own pre-scouted backlog for Slovenia/Panama/Morocco turned out to be five
consecutive dead ends on independent re-verification). North Macedonia was
not previously in the registry (53 jurisdictions existed at the start of this
cycle — `ls -d registry/*/ | wc -l` on `main` returns 53). This document opens
North Macedonia as the registry's **54th jurisdiction**, via the Taxes
vertical.

## Why this candidate

North Macedonia's Public Revenue Office (Управа за јавни приходи, УЈП)
publishes its periodic VAT return, Обр. ДДВ-04, directly and unauthenticated
from its own document host. It is a genuine AcroForm PDF — not a static
print/hand-fill template — confirmed both by a raw byte scan (`/AcroForm`
present, `/FT/Tx` and `/FT/Btn` entries throughout the compressed object
streams) and independently via `pdfjs-dist`'s `getFieldObjects()`. The form is
also unusually self-documenting: two of its four pages are the agency's own
field-by-field "УПАТСТВО ЗА ПОПОЛНУВАЊЕ" (filling instructions), explicitly
naming the purpose and governing statute article of every numbered field.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Управа за јавни приходи (УЈП, Public Revenue Office), a body
  within Министерство за финансии (Ministry of Finance).
- **URL:** `https://www.ujp.gov.mk/files/attachment/0000/0967/sl.79_DDV-04_30.03.2022.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl` from scratch (not trusted from the issue's own cited hash).
- **HTTP status:** 200. **Content-Type:** `application/pdf`. **Size:**
  346,155 bytes. **sha256:**
  `2106f99bd113f9599b116f249cd7bef1a7408955b367c5396e046b2882ea3f0e`
  (independently computed this cycle with `sha256sum`) — matches the
  candidate-verification cycle's own independently-derived hash exactly, a
  second independent confirmation that the source is stable and unchanged.
- **Extraction method:** `pdfjs-dist` (`legacy/build/pdf.js`, CommonJS
  `require`, this environment's established technique — no
  `pdftotext`/`pdftoppm`/`pip` available). Used three passes: (1)
  `doc.getFieldObjects()` for the full AcroForm field-name inventory; (2)
  `page.getAnnotations({intent:'display'})` per page for each field's exact
  type, rect, and page location; (3) `page.getTextContent()` per page for the
  form's own printed labels, section headers, and — critically — its
  field-by-field filling instructions.
- **What it confirms:** every field this document models, verbatim,
  including the exact field-by-field descriptions and statute citations
  quoted in `fields[].description` (drawn directly from the form's own
  "Поле NN — ..." instruction lines on pages 3-4), the exact preferential VAT
  rates (10%, 5%), and the form's own footer citation confirming its
  publication in „Службен весник на РСМ“ бр.79/22, effective 30.03.2022.

### Source 2 (`authority.operatedBy.basis`)

Drawn directly from the form's own printed text, not external research: the
form's instructions and field-level notes cite "ЗДДВ" (Закон за данокот на
додадена вредност, VAT Law) repeatedly by abbreviation with specific article
numbers (чл.2 и 14, чл.32, чл.32-а, чл.32 точка 4 и 5, чл.41-б, чл.53 став 10,
чл.55 став 1 и 2, чл.37) — a stronger, form-sourced citation than several
prior registry entries (e.g. `hr/porezna-uprava/prijava-poreza-na-dohodak`)
had to fall back to independent web research for.

## Field inventory (Phase 2) — the 181-vs-161-vs-81 reconciliation

The issue's brief (from the GOV-2916 candidate-verification cycle) reported
"181 real fields across 4 pages," derived from
`doc.getFieldObjects()`'s returned field-name count. Independent
re-verification this cycle found a more precise picture, disclosed here so
the discrepancy is not mistaken for an extraction error:

- **181** is the count of named nodes in the AcroForm field **tree**
  (`Object.keys(fieldObjects).length`), which includes both terminal (leaf)
  fields and non-terminal parent/organizational nodes.
- **161** of those 181 are **terminal leaf fields that actually carry a
  Widget annotation** (confirmed via `page.getAnnotations({intent:'display'})`
  on every page — 161 widgets found, matching exactly). These are the fields
  a filler can actually type into or check.
- **20** are non-terminal field-tree nodes with **no widget of their own** —
  purely structural artifacts of how the form's authoring tool built up
  fully-qualified field names for a duplicated row template. For example, the
  invoice table's row 18 template was extended via nested parent groups
  (`23.18` → `23.18.1` → `23.18.1.1`) whose actual fillable widgets carry the
  further-qualified names `23.18.0`, `23.18.1.0`, `23.18.1.1.0`, and
  `23.18.1.1.1` (rows 18, 19, 20, and 21 of the printed table). The same
  pattern recurs for columns 24/25/27, and separately for a stray unused
  field `A31_1` (superseded by the real widget `A31_1.0`) and the
  `17`/`17.0`/`17.1` parent nodes above the two real checkbox widgets
  `17.0.0`/`17.1.0`.
- This document's **81 `fields[]` entries** model all 44 leaf fields on the
  main return page (header/identification, the full output-VAT computation
  fields 01-20, and the full input-VAT computation fields 21-32) plus a
  **bounded subset (25 of 105)** of the pre-registration stock schedule's
  leaf fields, plus the schedule's date/total fields, the 2 attachment
  checkboxes, and the 8 preparer/signatory fields — see the cap rationale
  below. 44 + 25 + 1 (`stockScheduleAsOfDate`) + 1
  (`stockScheduleTotalVatAmount`) + 2 (attachments) + 8
  (preparer/signatory) = **81**, wholly independent of `taxIdentificationPrefix`,
  `isCorrection`, `correctedTaxPeriod`, `refundRequested`, and
  `claimAssignmentRequested`, which are already counted within the 44.

Per-page leaf-field breakdown (161 total), independently reconciled against
this document's field count:

| Page | Section | Leaf fields | Modelled |
|---|---|---|---|
| p.1 | Header/identification (Даночен ид. број × 2, назив/адреса, телефон, е-пошта, период од/до, рок, исправка checkbox + reference) | 10 | Full (10) |
| p.1 | Output VAT, поле 01-20 (`A01`-`A19`, `zbir`) | 20 | Full (20) |
| p.1 | Input VAT, поле 21-32 (`A21`-`A30`, `A31`/`A31_1.0`, `A32`/`A32_1`) | 14 | Full (14) |
| p.2 | Pre-registration stock schedule: as-of date + 21 rows × 5 columns + total | 107 | Partial: as-of date + total (2) + 5 of 21 rows × 5 columns (25) |
| p.2 | Attachment checkboxes (`17.0.0`, `17.1.0`) | 2 | Full (2) |
| p.2 | Preparer/signatory (`100`-`103`, `105`-`108`) | 8 | Full (8) |
| **Total** | | **161** | **81** |

## Access notes and judgment calls

1. **The pre-registration stock schedule is capped at 5 of the paper form's
   own 21 numbered rows.** This is a genuinely narrow, one-time-use section:
   per the form's own instructions ("Ова Известување треба да се пополни во
   даночната пријава за првиот даночен период" — this notification is
   completed only in the return for the taxpayer's *first* tax period), it
   only ever applies to a business's very first VAT filing, when claiming
   deduction of VAT embedded in goods held in stock for resale immediately
   before registration. Unlike the return's core output/input VAT
   computation (fields 01-32, modelled in full — every filer completes these
   every period), this schedule is a narrow edge case analogous to this
   registry's established convention of capping large repeating tables at a
   reasonable subset rather than either silently truncating or mechanically
   flattening every possible row (e.g. `hr/porezna-uprava/prijava-poreza-na-dohodak`
   capping dependents/employer rows at 3 of 6-7; `se/migrationsverket/work-permit-application`
   modelling up to 5 children). 5 was chosen (rather than 3) because a
   newly-registering business with meaningful opening stock could plausibly
   have more than a handful of supplier invoices to declare, while flattening
   all 21 rows (105 fields) would have more than doubled this schema's size
   for a section only relevant to a single filing in a taxpayer's lifetime.
   Rows 6-21 are disclosed as deferred, both here and in the schema's own
   `description`.
2. **The `stockScheduleTotalVatAmount` field's exact column alignment is a
   disclosed judgment call.** The schedule's single `Vkupno` (Total) widget's
   rect (`x:379-480`) sits under the x-range shared with the per-row `IN`
   fields (invoice payment date, `x:378-479`) rather than cleanly under the
   `27.N` (VAT amount, `x:481-571`) or `25.N` (invoice amount, `x:241-378`)
   column. Since a running total of payment *dates* makes no arithmetic
   sense, and the form's own instructions state this schedule's total VAT
   figure is what transfers once into поле 30 ("Вкупниот пријавен данок на
   додадена вредност за одбивка се истакнува, еднократно ... во полето 30"),
   this document models `Vkupno` as a total VAT amount rather than a total
   invoice amount — the semantically coherent reading, even though its rect
   is not perfectly column-aligned with the per-row VAT-amount fields.
3. **`taxIdentificationPrefix` (field `1`, the narrow 2-character box) is
   optional, while `taxIdentificationNumber` (field `2`) is required.** The
   form's own instructional note states only VAT-registered taxpayers enter
   "MK" in this first box; taxpayers filing solely as unregistered tax
   debtors under чл.32 точки 3 и 4 ЗДДВ (who must also file this return per
   the form's own opening instructions) would leave it blank.
4. **`correctedTaxPeriod` is gated with `requiredWhen: {field: "isCorrection",
   equals: true}`**, per the p.4 instructions text: "Доколку поднесувате
   исправка на претходно поднесена ДДВ-пријава, означете го полето
   'Исправка на ДДВ-пријава' ... и наведете го даночниот период за кој се
   врши исправката" (if filing a correction, mark the field and state the
   tax period being corrected). This condition uses `equals: true` on a
   boolean field, not `notEquals` against an optional string field — avoiding
   this registry's known `notEquals`-against-absent-optional-field pitfall.
5. **`claimAssignmentAmount` is gated with `requiredWhen: {field:
   "claimAssignmentRequested", equals: true}`**, the amount box that only
   applies when the taxpayer marks поле 32 to assign part of a VAT credit to
   settle another taxpayer's debt.
6. **`taxDueOrCredit` (поле 31) is the only field in the core return marked
   `required: true` besides the header identification fields.** This mirrors
   the form's own explicit instruction that if fields 01-29 are otherwise
   left blank, поле 31 alone must still be entered, with the value "0" — it
   is the one field every filing, with or without reportable transactions,
   must always carry a value for.
7. **Signature ("Потпис") boxes are not modelled as fields**, consistent with
   this registry's established convention (e.g. the HR/RO precedents) of
   treating a physical signature as an attestation outside the data-field
   model rather than a `string`/`file` field — confirmed here directly from
   the AcroForm: the "Потпис" cells (would-be fields `104` and a second cell
   beside `108`) have no corresponding Widget annotation at all, i.e. the
   form's own author did not make them fillable AcroForm fields either.
8. **Money fields use `type: "number"` with only a `minimum: 0` constraint**,
   consistent with this registry's established convention for
   currency-denominated amounts, rather than a stricter integer/decimal
   pattern — even though the form's own instructions state amounts are
   expressed in whole denars ("Износите се искажуваат во денари, без дени"),
   disclosed in `otherTaxesAndAdjustments`'s context rather than encoded as a
   `multipleOf` constraint, since negative values are explicitly permitted
   ("Доколку внесувате негативни износи, истите ставете ги со предзнакот
   '-'") and several fields (e.g. `otherTaxesAndAdjustments`, `taxDueOrCredit`)
   can legitimately be negative — `minimum: 0` is therefore intentionally
   omitted from those two fields only.
9. **No `documents[]` entries are modelled.** Unlike several prior registry
   entries, this form's instructions do not print any explicit attestation
   statement text (e.g. an "I certify..." declaration line) alongside its
   signature blocks — only the bare "Потпис" label — so there is no
   verbatim statement text to capture in a `documents[].statement`.

## Test run (Phase 3)

No live submission was attempted: UJP's e-Porezna equivalent, `etax.ujp.gov.mk`
(named in the form's own instructions as the mandatory electronic filing
channel), is an authenticated, session-based system requiring a registered
taxpayer's real credentials — submitting fabricated taxpayer data against
North Macedonia's live tax administration is not a safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost/1.0.0/schema.json
ok   registry/mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost/1.0.0/schema.json
ok   registry/mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run (after regenerating `tools/govschema-client/registry-index.json`
via `npm run build-index`) confirms no regression:

```
$ node tools/validate.mjs
436/436 document(s) passed. 3/3 mapping.json companion(s) passed.
```

(Up from 435/435 immediately before this document was added — independently
re-confirmed by moving this branch's new `registry/mk/` directory aside and
re-running the validator against the working tree without it, rather than
trusting a prior count.)
