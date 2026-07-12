# Verification record — `ng/cac/cac-1-1-application-for-registration-of-company` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2518**. It opens **Nigeria as
GovSchema's 42nd jurisdiction** (confirmed by counting `ls registry/` before
and after — 41 directories before this schema, 42 after), via the Business
Formation vertical (1 of 6), using the Corporate Affairs Commission (CAC)'s
Form 1.1, "Application for Registration of Company". A prior scouting pass
(GOV-2507) had flagged this form as reachable and cited a hash, byte size, and
widget count; **nothing from that prior report was trusted without an
independent re-fetch/re-derivation**, and doing so surfaced one material
correction (the choice-widget count) — see "Sources examined" below.

## Sources examined

### Source 1 — the CAC Form 1.1 PDF (chosen as `source.url`)

- **URL:** <https://nigeriainfotrade.fmiti.gov.ng/media/CAC%20Form%201.1.pdf>
  — the Federal Ministry of Industry, Trade and Investment's Nigeria Trade
  Information Portal, a genuine `.gov.ng` domain. Direct CAC's own domain
  (`cac.gov.ng`) returned **HTTP 403** on every direct fetch attempted this
  cycle (both bare `curl` and via `WebFetch`), consistent with a WAF blocking
  this sandbox's network egress rather than the document being withdrawn —
  disclosed as a limitation, not silently worked around. A candidate
  `news.cac.gov.ng/forms/` page (surfaced via web search) was fetched and
  found to be an empty/parked WordPress page with no actual form listing —
  not a usable alternative source.
- Fetched directly via `curl`: **HTTP 200**, `Content-Type: application/pdf`,
  **415,060 bytes**, `Last-Modified: Thu, 11 May 2017 16:49:12 GMT`,
  `ETag: "caff3c8476cad21:0"`, `sha256:
  b0c57c0d8b9fc48e0fa5c944e2c8a9e04e8b9ad58b6c4cc2b9c348f86092c07e`. This
  matches the prior scouting pass's cited hash and byte size exactly — a
  case where the pre-scout held up under independent re-verification, unlike
  several other cycles' pre-scouted claims in this registry's history.
- `pdfjs-dist`'s `getDocument().promise` confirms a genuine 4-page AcroForm
  PDF (`IsAcroFormPresent: true` via `getFieldObjects()`).

### Source 2 — `pdfjs-dist` structural extraction (own re-derivation)

- `page.getAnnotations()` across all 4 pages found **87 real Widget
  annotations**: 23 on page 1, 49 on page 2, 15 on page 3, **0** on page 4
  (page 4 is a plain, non-fillable "Notes" page — lettered notes (a)–(k)
  describing required attachments and filing rules, extracted via
  `getTextContent()` for the `documents[]` sourcing below).
- By type: **75 `Tx` (text)**, **9 `Ch` (choice/combobox)**, **3 `Btn`
  (checkbox)** = 87. **This corrects the prior scouting pass's cited figure
  of "3 button, 2 choice"** — the actual choice-widget count is **9, not
  2**, confirmed independently via both `getAnnotations()`'s per-widget
  `fieldType` tally and a second, independent `getFieldObjects()` pass
  grouping by fully-qualified field name (see field-name-reuse finding
  below). The button (checkbox) count of 3 was correct.
- Every widget's generic AcroForm name (`Text4`, `ComboBox1`, `CheckBox1`,
  etc.) was mapped to its printed caption by rendering each page with
  `pdfjs-dist` + `node-canvas` at 2.5x scale (`page.render()` to a canvas,
  written to PNG) and visually cross-checking each widget's `rect` against
  the nearest printed text, additionally cross-checked against each text
  item's own `transform`-matrix `x`/`y` coordinate from `getTextContent()` —
  the same coordinate-correlation technique this registry has used
  repeatedly for out-of-order/generic-named AcroForms (cf.
  `dk/skattestyrelsen` GOV-2253, `ke/nrb` GOV-2500). Both the rendered PNGs
  and the raw widget/text coordinate dumps were inspected directly, not
  inferred from labels alone.
- **Field-name-reuse finding (verified via `getFieldObjects()`, not merely
  assumed from a naming pattern):** the choice widget named `ComboBox1` (the
  "ID. Type" dropdown) is genuinely the **same fully-qualified AcroForm
  field**, reused across all 4 director slots (Section C, items 1–4) *and*
  the individual secretary (Section D) — 5 widget "kids" sharing one field
  name. `ComboBox2` (the "Gender" dropdown) is likewise reused across all 4
  director slots — 4 widget kids sharing one field name. In an actual PDF
  viewer, since PDF form fields are keyed by fully-qualified name, filling in
  one of these dropdowns would set the *same* value on every other widget
  sharing that name — i.e. selecting Director 2's ID type would silently
  overwrite Director 1's, 3's and 4's ID type too, a genuine authoring defect
  in the source PDF, not a rendering artifact (confirmed by
  `getFieldObjects()` returning one shared field entry per name with
  multiple `id`/`page` kids, exactly the same shape PDF viewers use to
  synchronize duplicate-named fields). **This schema does not preserve that
  bug**: each director/secretary slot's ID-type and gender is modelled as
  its own independent `enum` field (`director1IdType` … `director4IdType`,
  `secretaryIndividualIdType`, `director1Gender` … `director4Gender`), since
  the printed form unambiguously intends one independent selection per
  person — disclosed here rather than silently "fixed" without comment, per
  the analogous field-name-reuse-across-repeating-rows precedent from
  GOV-2338 (`no/brreg`).
- The `Ch` widgets' own printed option lists were read directly off the one
  widget instance per field name that `pdfjs-dist` populated with a full
  `options` array (a `pdfjs-dist` quirk when multiple widget kids share one
  field name — only one kid's parsed object carries the merged option list;
  confirmed by checking every instance of `ComboBox1`/`ComboBox2` and finding
  the same 4-value/2-value option lists on whichever instance did carry
  them): ID type = `Driver License` / `International ID Card` /
  `International Passport` / `Voter Card`; Gender = `Female` / `Male`.
- The 3 `Btn` (checkbox) widgets — `CheckBox1`/`CheckBox2`/`CheckBox3` — sit
  immediately after the printed "LIMITED BY SHARES" / "LIMITED BY GUARANTEE"
  / "UNLIMITED" captions respectively (confirmed by comparing each
  checkbox's `rect` x-coordinate against each caption's text-item x-range in
  the rendered page-1 image), each independently `checkBox:true`,
  `radioButton:false`, `exportValue:"Yes"` — i.e. 3 genuinely independent
  Btn widgets representing one intended mutually-exclusive selection, not a
  native PDF radio-button group. Modelled as three boolean fields
  (`typeOfCompanyLimitedByShares`/`typeOfCompanyLimitedByGuarantee`/
  `typeOfCompanyUnlimited`) in an `exclusivityGroups` entry, per this
  registry's `se/polisen`/`fi/poliisi` precedent for the same class of
  independently-checkable Btn triplet.
- **2 widgets excluded from `fields[]`**: two plain `Tx` boxes, one each in
  Section D ("Particulars of Secretary (Individual)") and Section D1
  ("Particulars of Secretary (Firm/Corporation)"), sit directly under a
  printed "Signature:" caption. Per this registry's convention of not
  modelling raw signature capture as a data field, these are excluded —
  even though, unlike the 4 individual directors' own "Signature: ___ Date:
  ___" lines (which this specimen gives **no widget at all**, confirmed by
  checking every widget `rect` against each director block's y-coordinate
  range and finding none below the last data field in each block), these
  two Secretary-section boxes are genuine fillable Tx widgets — plausibly
  because the form's own header instruction is "Form Must be typed and not
  Handwritten", so a typed name in a "Signature:" box may have been intended
  as a typed attestation rather than a captured signature. Disclosed as a
  judgment call: excluded regardless, for consistency with how every other
  signature-labelled element on this same form (and this registry's general
  practice) is handled.
- 85 of the 87 widgets are modelled 1:1 as `fields[]` entries (87 − 2
  excluded signature boxes = 85); no widget is silently dropped without
  explanation and no field is invented without a corresponding widget or an
  explicitly disclosed cross-reference (see the `documents[]` notes below,
  which are sourced from page 4's plain-text Notes rather than any widget).

### Source 3 — page 4 "Notes" (plain text, no widgets — sourced for `documents[]`)

Extracted via `getTextContent()`. Eleven lettered notes (a)–(k) describe
attachment/eligibility rules, several of which name concrete supporting
documents used to build `documents[]`:

- (a) ID copy (passport data page / driver's licence / national ID card) for
  every individual director, subscriber and secretary; non-Nigerians:
  passport data page only.
- (b) directors must be ≥18 (CAMA 2020 s.257 grounds of disqualification).
- (c)/(d) minors may subscribe (with ≥2 other qualified persons); a minor
  subscriber's birth certificate (National Population Commission) or
  passport data page must be attached.
- (e) a corporate-body subscriber/director-nominator needs a board
  resolution attached; a corporate body registered outside Nigeria needs its
  certificate of registration (translated if not in English) attached.
- (f) minimum share capital (NGN 10,000 private / NGN 500,000 public; ≥25%
  of nominal share capital issued at all times) — a validation-relevant rule,
  not itself a document.
- (g) a company limited by guarantee must not be registered with a share
  capital; the Commission refers the memorandum to the Attorney-General for
  approval.
- (h) foreign directors/subscribers using a Nigerian address must attach a
  residence-permit copy; other foreigners use their residential address in
  their country of residence.
- (i) the form must be accompanied by duly signed and stamped copies of the
  memorandum and articles of association, adopting the applicable CAMA
  Table 'A' model articles unless modified.
- (j) a first director/subscriber may now prepare and present the
  incorporation documents directly — accredited professionals are "no
  longer necessary" for this step (material to the Section E/presenter
  scoping decision below).
- (k) "All asterisked fields on the form are mandatory." **Checked and not
  reproducible**: a full-text scan of every text item on pages 1–3
  (`getTextContent()`) found **zero** `*` characters anywhere in the
  extracted caption text. The form's own instructions reference an
  asterisk-based required-field convention that does not actually appear in
  this specimen's current text layer — disclosed as an unresolved
  discrepancy rather than silently assumed away; this schema's own
  `required`/`requiredWhen` judgment calls (below) are made independently of
  this unusable convention, based on CAMA 2020's own minimum-viable-company
  rules and each section's own internal structure instead.

### Source 4 — legal-currency and current-process check

- Web search confirms the **Companies and Allied Matters Act, 2020** (CAMA
  2020, Act No. 3 of 2020) is the currently governing companies statute,
  repealing the Companies and Allied Matters Act, Cap. C20, Laws of the
  Federation of Nigeria, 2004 (itself the successor to the "Companies and
  Allied Matters Act 1990" this specimen's own cover page still cites,
  consistent with the form's 2017 last-modified date predating the 2020
  reform). This schema cites CAMA 2020 throughout (`description`, field
  descriptions for directors' minimum age and the guarantee-company
  share-capital bar) rather than the stale cover-page year — the same class
  of "specimen cites an outdated statute year, current schema cites the
  actually-governing one" correction this registry made for
  `ke/brs/cr1-application-to-register-a-company`.
- Web search independently confirms CAC's incorporation process is now
  primarily conducted through CAC's own login-gated **Company Registration
  Portal** (iCRP, `icrp.cac.gov.ng`, "CRP 3.0" as of 2026), requiring an
  account tied to a mobile phone number or National Identification Number
  (NIN); the portal captures name reservation, document upload, and fee
  payment, and issues an electronic certificate of registration —
  consistent with this registry's established **"structural reference over
  a now-primarily-online process"** framing (cf.
  `pe/sunat/formulario-virtual-709-declaracion-renta`,
  `uy/dgi/inscripcion-actualizacion-empresas-formulario-0351`,
  `ke/brs/cr1-application-to-register-a-company`). Form 1.1 itself remains
  currently and unauthenticated reachable (per Source 1) and is still
  described by multiple current (2026-dated) third-party
  company-registration guides as "the official consolidated registration
  document" — one initial WebSearch AI-generated summary claimed Form 1.1
  had been "replaced" outright by the online form; per this registry's own
  documented gotcha about WebSearch's own AI summary occasionally
  overstating a supersession (cf. GOV-2479's hallucinated Vietnamese
  circular), this claim was checked against two direct-fetched pages rather
  than trusted — one (pdfFiller) titles the form "2017-2026 ... Form CAC
  1.1", the other (a Medium walkthrough) describes it as still "the
  official consolidated registration document" filed via a filing agent —
  neither corroborates an outright replacement. The correct, disclosed
  framing is: the paper/PDF specimen is a structural reference for what
  incorporation data CAC collects; the live transaction itself happens on
  iCRP.

## Field inventory and scoping/disclosure decisions

1. **Type of Company (`typeOfCompanyLimitedByShares` /
   `typeOfCompanyLimitedByGuarantee` / `typeOfCompanyUnlimited`)** — 3
   independent boolean fields in one `exclusivityGroups` entry (see Source 2
   above for why these are 3 independent Btn widgets, not a native radio
   group or a single enum). Each field is individually `required: false`
   (an applicant selects one), matching this registry's `se/polisen`
   precedent for the same class of printed 3-option checkbox row — the
   business rule that *some* option must be selected is disclosed here in
   prose rather than modelled with a fabricated cross-field rule, since
   GovSchema v0.3's `exclusivityGroups` only expresses "at most one", not
   "at least one".
2. **Section B (authorized share capital) is gated `requiredWhen: { any:
   [typeOfCompanyLimitedByShares equals true, typeOfCompanyUnlimited equals
   true] } }`, not gated on `typeOfCompanyLimitedByGuarantee`.** Per Note
   (g), a company limited by guarantee must not be registered with a share
   capital, so Section B does not apply to that type; an unlimited company
   *can* have share capital under CAMA 2020 ("unlimited" describes members'
   liability, not whether the company has shares), so Section B applies to
   both the shares and unlimited paths. This positive `any` composition was
   deliberately used instead of `{ field: typeOfCompanyLimitedByGuarantee,
   notEquals: true }` — a negation against an optional boolean that could
   evaluate `true` (and thus wrongly force Section B as required) whenever
   the field is simply absent/unanswered, the same class of bug this
   registry has already flagged for `notEquals ""` against an optional
   string field. The positive-composition form has no such absent-field
   ambiguity.
3. **Section C (first directors) has exactly 4 printed slots on the base
   form itself** — no synthetic repeating-group cap was invented; this is
   the literal number of numbered director blocks (1–4) printed on pages 1–2.
   `director1*` fields are `required: true` (CAMA 2020 s.18/s.271 permits a
   single director for a small private company, so at least one director's
   full particulars are required); `director2*`–`director4*` are fully
   optional, since a company may have only one director.
4. **`director{N}IdType`/`secretaryIndividualIdType` enums use the dropdown's
   own printed option list verbatim** (`Driver License`, `International ID
   Card`, `International Passport`, `Voter Card`) — not a value set invented
   by this schema. Likewise `director{N}Gender` (`Female`, `Male`).
5. **Sections D ("Particulars of Secretary (Individual)") and D1
   ("Particulars of Secretary (Firm/Corporation)") are both modelled fully
   optional, field-by-field, with no requiredness gate between them.** CAMA
   2020 no longer requires every company to have a secretary (small
   companies are exempt), and the two sections are mutually-exclusive
   alternatives (an individual secretary vs. a corporate secretary) with no
   printed selector field on the form to gate a `requiredWhen` on — the same
   class of gap this registry's `se/skatteverket` schema disclosed for its
   dual Swedish/foreign contact-address blocks. Rather than fabricate a
   synthetic "hasSecretary"/"secretaryType" field with no corresponding
   widget, this is disclosed in prose here, per this registry's "spec
   precision over cleverness" precedent.
6. **Section E (Statutory Declaration of Compliance by a Legal
   Practitioner) is modelled fully optional, field-by-field.** Per Note (j),
   a first director/subscriber may now present the incorporation documents
   directly without an accredited professional — CAMA 2020's own
   liberalization of who may file. The form itself has no "N/A, self-filed"
   toggle for this section, so its optionality is a disclosed judgment call
   rather than a literal instruction, consistent with Note (j)'s substance.
   `commissionerOrNotaryName` (the "Before Me:" line) is completed by the
   Commissioner of Oaths/Notary Public administering the oath, not the
   applicant, and is likewise optional/only relevant when Section E is used.
7. **"Presented for filing by" is modelled as the mandatory closing block**
   (`presenterName`/`presenterAddress`/`presenterPhoneNo`/`presenterDate`
   `required: true`; `presenterEmail`/`presenterAccreditationNo` optional,
   the latter explicitly marked "(Where Applicable)" by the source) —
   someone must present the completed application to CAC regardless of
   whether Section E's legal-practitioner declaration is used, consistent
   with Note (j) naming either a first director/subscriber or an accredited
   professional as the presenter.
8. **`documents[]`** — 6 entries sourced from page 4's Notes (a)/(e)/(h)/(i)
   above (2 unconditionally `required: true` — the per-person ID copy and
   the memorandum/articles of association, both flatly stated by the Notes
   with no qualifying condition; 4 conditional documents left `required:
   false` with the triggering condition disclosed via `handling` prose
   rather than a fabricated `requiredWhen`, since this schema's per-slot
   director fields carry no boolean flag for "is a minor"/"is a corporate
   body"/"is foreign with a Nigerian address" to gate on — the same
   documented convention this registry used for
   `ke/brs/cr1-application-to-register-a-company`'s
   `officerKraPinCertificateCopy`), plus 2 `attestation`-category entries:
   the director's verbatim consent statement (printed identically under
   all 4 director slots, `required: true`) and the deponent's verbatim
   statutory-declaration oath (`required: false`, in step with Section E's
   own optionality).
9. **Email-pattern validation** (`^[^@\s]+@[^@\s]+\.[^@\s]+$`) applied to
   every email field, matching this registry's standard convention
   (`ke/brs`, `se/skatteverket`, et al.), not a pattern printed on the form
   itself.

## Test run

No live submission was attempted — CAC's Form 1.1 is a structural-reference
specimen; the live transaction is now conducted through CAC's own
login-gated iCRP portal, not a self-service API GovSchema can exercise (see
Source 4). Verification here is against the schema's own structural rules
(`tools/validate.mjs`, `tools/validate-ajv.mjs`) plus a hand-rolled,
from-scratch conformance-fixture checker (implementing the `Condition`
grammar — `equals`/`notEquals`/`in`/`greaterThan` family/`all`/`any`/`not` —
directly from `spec/v0.3/SPEC.md` §8.1, not reused from any other schema's
checker) that explicitly exercises both `fields[]` requiredness/validation
**and** `documents[]` requiredness **and** `exclusivityGroups` — the first
two are a known blind spot past conformance passes in this registry have
skipped; the exclusivity check was added specifically because this schema
is one of the few in this registry to actually use `exclusivityGroups`.

Fixtures under
`conformance/ng/cac/cac-1-1-application-for-registration-of-company/1.0.0/`:

| Fixture | Scenario | Expected | Actual |
|---|---|---|---|
| `private-company-limited-by-shares-single-director.json` | Valid: company limited by shares, single director, share-capital block filled, no secretary/Section E | 0 errors | 0 errors |
| `company-limited-by-guarantee-two-directors-and-secretary.json` | Valid: company limited by guarantee (no share-capital block), two directors, individual secretary, Section E legal-practitioner declaration filled | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` | Drops `companyName` from the first valid fixture | 1 error (`MISSING_REQUIRED: companyName`) | 1 error |
| `mutation-control-email-pattern-violation.json` | Sets `companyEmailAddress` to `"not-an-email-address"` | 1 error (`PATTERN_VIOLATION`) | 1 error |
| `mutation-control-enum-violation.json` | Sets `director1IdType` to `"Something Invalid"` (not in the dropdown's own printed option list) | 1 error (`ENUM_VIOLATION`) | 1 error |
| `mutation-control-missing-required-document.json` | Removes the `memorandumAndArticlesOfAssociation` entry from `documents[]` | 1 error (`MISSING_REQUIRED_DOCUMENT`) | 1 error |
| `mutation-control-exclusivity-violation.json` | Sets both `typeOfCompanyLimitedByShares` and `typeOfCompanyLimitedByGuarantee` to `true` | 1 error (`EXCLUSIVITY_VIOLATION`) | 1 error |

All 7 fixtures matched their expectation exactly. Both registry validators
pass with 0 errors:

```
$ node tools/validate.mjs
380/380 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
380/380 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

(Both counts include this schema; the ajv run initially failed with 379/380
until a first-draft `validation.min`/`.min` keyword typo on the three
share-capital numeric fields was corrected to the meta-schema's actual
`minimum` keyword — caught by `validate-ajv.mjs` itself, not silently
missed.)

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`, after `npm ci --include=dev` to ensure `ajv` is
actually installed — this registry's own documented gotcha about a local
`NODE_ENV=production` making a bare `npm ci` skip dev dependencies) and now
includes this document.

## What was NOT fully resolved (disclosed, not silently guessed)

- CAC's own domain (`cac.gov.ng`) could not be fetched directly from this
  sandbox (HTTP 403 on every attempt) — the chosen source is a mirror on a
  different, but still genuine, Nigerian federal government domain
  (fmiti.gov.ng), consistent with the prior scouting pass's finding.
- Note (k)'s "asterisked fields are mandatory" instruction does not
  correspond to any asterisk actually present in this specimen's extracted
  text — this schema's requiredness calls are made independently or the
  form's own internal structure and CAMA 2020's minimum-viable-company
  rules, not from that unusable convention.
- The "at least one of the 3 Type-of-Company checkboxes must be selected"
  business rule, and the "Sections D/D1 are mutually exclusive alternatives"
  and "at least one document among Section D/D1/none may apply" business
  rules, are disclosed in prose only — GovSchema v0.3 has no
  "require-at-least-one" primitive across independent optional
  fields/sections, the same documented gap this registry noted for
  `se/skatteverket`'s dual contact-address blocks.
- The 4 conditional `documents[]` entries (minor's birth certificate,
  corporate-subscriber board resolution, foreign-corporate-subscriber
  certificate of registration, foreign-director/subscriber residence
  permit) have no clean boolean field in this schema to gate a
  `requiredWhen` on, since this schema's director/secretary slots do not
  capture subscriber-minority, corporate-subscriber, or
  foreign-Nigerian-address status as distinct fields — disclosed via each
  document's own `handling` prose rather than fabricated.
