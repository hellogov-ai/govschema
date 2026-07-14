# Verification record — `lt/registrucentras/individualios-imones-registravimas` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-3000**, a child issue of
**GOV-2995**). Lithuania previously covered only Taxes (`lt/vmi`'s GPM311 and
GPM311C, from GOV-2969/GOV-2982). This document opens Lithuania's **Business
Formation vertical (1 of 6)**.

## Handoff from GOV-2995's scouting note

GOV-2995's own scouting cycle located three of the four companion forms JAR-1
prints as mandatory for an individuali įmonė (sole proprietorship) filing —
JAR-VO-V, JAR-S, and KD-1 — via Wayback Machine capture, after confirming the
live site `registrucentras.lt` returns HTTP 403 (Cloudflare bot-challenge) on
every direct fetch attempt. It explicitly flagged the fourth mandatory
companion, **JAR-T**, as not located, and instructed this document to either
locate it or disclose it as an un-modeled backlog item. Per this task's own
instruction not to trust the scouting cycle's own figures as given, every
figure below (byte counts, hashes, page counts, order citations) was
independently re-derived this cycle from freshly re-fetched bytes, not copied
from the scouting note.

## Source re-verification (Phase 1)

All five candidate URLs were checked against the Wayback Machine's
`availability` and `cdx` APIs (`archive.org/wayback/available?url=...` via
`WebFetch`, `web.archive.org/cdx/search/cdx?url=...` via `curl` — the
`web.archive.org` snapshot URLs themselves fetched with `curl`, never
`WebFetch`, which hard-fails on `archive.org` URLs). The freshest available
capture of each form was used (all under
`registrucentras.lt/bylos/dokumentai/jar/e-gidas/`, not `.../jar/formos/`,
which only has a stale 2017 capture of JAR-1):

| Form | Capture used | HTTP status | Bytes | sha256 |
|---|---|---|---|---|
| JAR-1 | `20251108001851` | 200 | 352,968 | `8eb399a1d842e5ff7e5df450f7714b10006b1152ee74f9393fbfde7605a93f86` |
| JAR-VO-V | `20251108004116` | 200 | 216,327 | `fb8129ffa2ba14dc14dea172626363f12629712ef9b24ac14c0ac281c3e56829` |
| JAR-S | `20240625152902` | 200 | 106,182 | `3bb5e1d876ad351d406891170d2e5fcf11b9ed1de7a9cbfccaf95d88ef7b0bb9` |
| KD-1 | `20240308101405` | 200 | 173,756 | `31d8b935b2b4fa481eb2ba7e9b223665d74448b4c2cabe8165660aa3c7d8690c` |
| JAR-T | `20251108012527` | 200 | 185,005 | `9854ca875f5c5fbd41fdd025eaed0ea16b79ebf2987fd611fc4dda26c3fe75bd` |

**JAR-T was located this cycle** via
`web.archive.org/cdx/search/cdx?url=registrucentras.lt/bylos/dokumentai/jar/*&output=json&filter=urlkey:.*jar-t.*`,
which surfaced a `.../jar/e-gidas/JAR-T.pdf` capture history GOV-2995's own
search did not turn up (its search evidently only checked the `.../jar/formos/`
path, which has no JAR-T history at all — only a `.docx` variant). All five
files were independently hashed with `sha256sum` against the bytes actually
downloaded this cycle.

- **File type (all five):** genuine PDFs (`%PDF-1.7` for JAR-1/JAR-VO-V/JAR-S/KD-1,
  `%PDF-1.5` for JAR-T), **no AcroForm** — confirmed via `pdfjs-dist@5`'s
  `getFieldObjects()` returning `null` on every file, and `page.getAnnotations()`
  returning zero `Widget`-subtype annotations on every page of every file (a
  small number of non-widget annotations exist on some pages — link/markup
  annotations, not form fields). All are flat, print-and-hand-fill specimens.
- **Extraction method:** `pdfjs-dist@5` `getTextContent()` run against every
  page of all five files, from a clean scratch directory, this cycle.
- **Page counts (independently confirmed via `doc.numPages`):** JAR-1 **6
  pages** (not 5, as GOV-2995's own note stated — see the correction below),
  JAR-VO-V 1 page, JAR-S 1 page, KD-1 1 page, JAR-T 1 page.

### Correction: JAR-1's approving-order citation

GOV-2995's scouting note cited JAR-1 as "approved by Registrų centras
director's order 2016-01-06 No. V-4." The freshly re-fetched JAR-1's own
printed header reads (transcribed verbatim from page 1's extracted text):

> "PATVIRTINTA valstybės įmonės Registrų centro generalinio direktoriaus 2020
> m. balandžio 28 d. įsakymu Nr. VE-293(1.3E) (valstybės įmonės Registrų
> centro generalinio direktoriaus 2024 m. gruodžio 20 d. įsakymo VE-828(1.3E)
> redakcija)"

i.e. **approved 2020-04-28 by order No. VE-293(1.3E), as amended 2024-12-20 by
order No. VE-828(1.3E)** — not the 2016 V-4 order the scouting note cited.
`schema.json` and this record cite the order actually printed on the
independently re-fetched bytes. The other four forms' citations in this
task's own brief matched the freshly re-fetched text exactly and required no
correction:

| Form | Base order (all five forms) | Form-specific amendment |
|---|---|---|
| JAR-1 | 2020-04-28 No. VE-293(1.3E) | 2024-12-20 No. VE-828(1.3E) |
| JAR-VO-V | 2020-04-28 No. VE-293(1.3E) | 2024-08-30 No. VE-527(1.3E) |
| JAR-S | 2020-04-28 No. VE-293(1.3E) | none printed |
| JAR-T | 2020-04-28 No. VE-293(1.3E) | none printed |
| KD-1 | 2020-04-28 No. VE-293(1.3E) | 2023-08-21 No. VE-444(1.3E) |

All five forms share the same base approving order (VE-293(1.3E),
2020-04-28); JAR-1, JAR-VO-V, and KD-1 have each since been individually
re-issued in an amended "redakcija" (edition), while JAR-S and JAR-T remain at
their original 2020 text.

## Field inventory (Phase 2)

All 65 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Per-form tally (independent cross-check, counted directly from
`schema.json`'s own `sourceRef` prefixes):

| Source form | Fields modelled |
|---|---|
| JAR-1 (main application, scoped to the individuali įmonė selection) | 29 |
| JAR-S (owner data) | 13 |
| JAR-VO-V (single-member management body) | 14 |
| JAR-T (representation rule) | 1 |
| KD-1 (contact information) | 8 |
| **Total** | **65** |

29 + 13 + 14 + 1 + 8 = **65**, matching the schema's own `fields[]` length
exactly. Of these, **35** are unconditionally `required: true` and **1**
(`soleManagementBodyPositionTitle`) carries a `requiredWhen`. Plus **4**
`documents[]` entries (3 unconditionally required, 1 conditionally required
via `requiredWhen`) and **1** `crossFieldValidation` rule (the limited
activity period's end date not preceding the founding document's own date).

## Judgment calls disclosed

1. **JAR-1 is a generic, all-legal-forms application; this document scopes it
   to the individuali įmonė checkbox only.** JAR-1's own section 5 prints
   roughly 27 selectable legal forms, each with its own companion-form list;
   sections that only apply to *other* legal forms (JAR-1's own section 6,
   "Juridinio asmens padalinys" — branch/representative-office data, N/A to a
   sole proprietorship which has no separate legal personality units) or only
   to entities with collegial governance (section 12.2 "Kolegialus valdymo
   organas" through 12.8 "Kiti organai" — supervisory board, administration
   organ, loan committee, audit commission, etc., none of which an individuali
   įmonė has) are intentionally **not modelled**, consistent with this
   document's own explicit scope.
2. **Sections marked "Pildoma registruojant pakeitimus" (completed only when
   registering changes) are out of scope.** JAR-1's own section 1 (existing
   entity code/name) and section 7 (legal-status change — reorganization,
   restructuring, bankruptcy, etc.) apply only to an already-registered
   entity filing an amendment, not to this document's own scope of an
   *initial* individuali įmonė registration. KD-1's own item 1 ("Kodas") is
   the one exception kept as an optional field, since KD-1's own printed text
   carries no such change-only footnote (unlike JAR-1's own section 1) and
   the same contact-info form is plausibly also filed post-registration once
   a code exists.
3. **Section 8 (franchise/sub-franchise contract registration) is out of
   scope.** This section registers the fact of a franchise agreement's
   execution/amendment/termination via a separate form (JAR-FR), an optional
   event unrelated to the entity's own initial formation; not modelled.
4. **Section 11.2 (Register of Legal Acts object identification code) is out
   of scope.** The form's own footnote 4 restricts this field to public legal
   entities operating under Civil Code article 2.46(3) or a state/municipal
   institution's own founding act — categories an individuali įmonė (a
   private commercial sole-proprietorship) does not fall into.
5. **KD-1's own item 5 ("Interneto svetainės adresas", website address) is
   intentionally omitted, not merely marked optional.** The form's own
   footnote 1 states it is "Pildoma akcinėms bendrovėms, uždarosioms akcinėms
   bendrovėms, Europos bendrovėms" (completed for public/private joint-stock
   companies and European companies) — legal forms this document's own scope
   explicitly excludes. Modelling it as an always-irrelevant optional field
   would misrepresent the source form's own applicability, so it is left out
   entirely (the same treatment as judgment call 1's excluded JAR-1
   sections).
6. **OR-style "additionally required only for a foreign natural person"
   conditions are not machine-enforced.** JAR-S items 4-5
   (`ownerBirthDate`/`ownerIdIssuingCountry`) and JAR-VO-V items 4-5
   (`managerBirthDate`/`managerIdIssuingCountry`) are each printed "Jei
   užsienio fizinis asmuo (nurodoma papildomai)" (additionally indicated if a
   foreign natural person) — a condition keyed to the person's own
   nationality, which is not itself a modelled field. Consistent with this
   registry's established caution (a prior incident gating requiredness on
   `notEquals ""` against an optional, possibly-absent field), these are left
   `required: false` with the condition disclosed in each field's own
   `description` rather than approximated with a field-absence leaf the
   shared `Condition` grammar does not support.
7. **`vatPayerEffectiveDate` is not gated by `requiredWhen` on
   `wantsVatPayerStatus`.** JAR-1's own footnote 7 limits this field to cases
   where the desired VAT-effective date does not coincide with the
   registration date — a condition this document cannot evaluate (the
   registration date is assigned by the registrar, not entered on the form).
   Both fields are `required: false`, with the relationship disclosed in
   `vatPayerEffectiveDate`'s own `description`.
8. **`jarTPageCount` and `kd1PageCount` are modelled even though JAR-1's own
   section 14 grid does not print a KD-1 row.** Section 14's printed grid
   ("Formos, lapų skaičius") enumerates only the JAR-series companion forms;
   KD-1 is required separately by section 5's own individuali įmonė
   instruction ("...JAR-T, KD-1"), with its page count evidently recorded
   elsewhere on the physical bundle (e.g. a cover sheet) rather than in
   section 14's own grid. `kd1PageCount` is modelled analogously to the
   JAR-series page-count fields for consistency, with this distinction
   disclosed in the field's own `description`.
9. **`legalForm` and `representationRule` are modelled as single-choice
   `enum` fields, matching each source form's own mutually-exclusive
   checkbox/choice structure** (JAR-1 section 5's 27-way legal-form checkbox,
   scoped here to its one relevant value; JAR-T's two-way sole-vs-joint
   representation choice) — consistent with this registry's convention of
   modelling mutually exclusive selections as an enum rather than independent
   booleans.
10. **`dataProcessingConsent` is modelled as an optional two-value `enum`**
    (KD-1's "Sutinku"/"Nesutinku" checkboxes), since the form's own text
    frames this as a genuinely optional, revocable choice — not a condition
    of registration — so neither value is required and omitting the field
    entirely is valid (the applicant declines to answer either way).

## Conformance fixtures (Phase 3)

12 fixtures committed under
`conformance/lt/registrucentras/individualios-imones-registravimas/1.0.0/`: 2
valid (a minimal domestic sole owner/manager filing with no VAT/notary/consent
election, and a foreign-owner filing electing VAT-payer status, notary
transmission, a limited activity period, and GDPR consent) plus 10
mutation-control fixtures, each derived from one of the two valid fixtures by
a single targeted mutation. All 12 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived directly from this schema's own
`fields[]`/`documents[]`/`crossFieldValidation`, not committed to the repo)
before being finalized: both valid fixtures produced **0 errors**, and each of
the 10 mutation-control fixtures produced **exactly 1 error** — missing
required field (`ownerPersonalCode`), invalid enum value (×2, covering both
`representationRule` and `legalForm`), missing required document
(`foundingDocumentEvidence`), a conditionally required field missing
(`soleManagementBodyPositionTitle`), a conditionally required document
missing (`dataProcessingConsentSignature`), a cross-field-validation failure
(`limitedActivityEndDate` preceding `foundingDocumentDate`), an invalid date
format (`foundingDocumentDate`), a page-count value below its minimum
(`jarVoVPageCount`), and an invalid pattern match (`financialYearStartDate`).

## Structural validation

- `node tools/validate.mjs registry/lt/registrucentras/individualios-imones-registravimas/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs ../registry/lt/registrucentras/individualios-imones-registravimas/1.0.0/schema.json` (from `tools/`, ajv 2020-12 against `spec/v0.3`) — **ok**.

## Maturity

`structural-reference`: the five source forms' own printed structure is fully
transcribed and every machine-expressible rule is encoded, but no live filing
with Registrų centras was attempted. GovSchema is an independent, non-profit
standards body and is not affiliated with, endorsed by, or operated by the
Government of the Republic of Lithuania, the Ministry of Economy and
Innovation, or Valstybės įmonė Registrų centras.
