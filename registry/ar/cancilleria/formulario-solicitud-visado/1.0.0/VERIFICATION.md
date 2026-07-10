# Verification record — `ar/cancilleria/formulario-solicitud-visado` v1.0.0

## Candidate selection

This session's brief (GOV-2179, child of the recurring research issue
GOV-2167) was to author Argentina's Visa vertical using the Cancillería's
Formulario de Solicitud de Visado (FSV), a candidate already named and
scouted in GOV-2177 (itself following GOV-2169's opening of Argentina as
this registry's 32nd jurisdiction, Business Formation only). GOV-2177
reported the FSV as a genuine fillable AcroForm PDF, 3 pages, 50 text
(`/Tx`) widgets, no login/CAPTCHA/WAF gate, unauthenticated HTTP 200 —
that lead was **independently re-verified from scratch** this session
(fresh `curl` fetch of two independent specimens, fresh `pdfjs-dist`
extraction, own field-count reconciliation, own field-to-campo-number
correlation) rather than trusted outright.

A second candidate was named in the same brief and explicitly scoped
**out**: AFIP's Formulario 460/F (the individual/persona física analogue
of the already-modelled Formulario 460/J), re-confirmed this cycle to
have 0 AcroForm widgets — a flat/printed form requiring box-by-box visual
extraction. Left open as a future Business-Formation-deepening candidate,
not picked this cycle since the FSV is strictly simpler to extract (a
real AcroForm) and opens a new vertical rather than deepening an existing
one.

## Source

- **Primary:**
  `https://cancilleria.gob.ar/userfiles/servicios/fsv_2024_espanol_editable.pdf`
  ("2024 edition") — fetched fresh this session with a browser
  User-Agent (`curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`):
  **HTTP 200**, `content-type: application/pdf`, exactly **311,233
  bytes**, SHA-256
  `66d7925e90f8b59229232e0f0fd493f278f638f98484d0fc84d7e6db4e7304f7`.
  Confirmed genuine `%PDF-1.6` content by inspecting the file's own
  leading bytes (`%PDF-1.6\r%âãÏÓ\r\n`), not merely by trusting the
  `Content-Type` header. No login, CAPTCHA, or WAF/bot-mitigation
  challenge was encountered — a plain `curl` with a browser `User-Agent`
  succeeded on the first attempt. `Last-Modified: Mon, 25 Mar 2024
  17:12:58 GMT` per the server's own response header.
- **Cross-check specimen:**
  `https://cmila.cancilleria.gob.ar/userfiles/fsv_editable_espanol_-_2026_1.pdf`
  ("2026 consulate-mirrored edition") — also fetched fresh this session:
  **HTTP 200**, `content-type: application/pdf`, exactly **378,338
  bytes**, SHA-256
  `112983a1724b4f47ac4b42b1b6f649164a92ec4f32f1da8ecdb91e58b9f0c3ce`,
  genuine `%PDF-1.6`. `Last-Modified: Wed, 14 Jan 2026 14:38:30 GMT`.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0`
re-fetched both cited URLs (plus the authority homepage) a second time
immediately before finalizing this record: 3 URLs checked, 0 warnings,
0 allowlisted, all clear. No entry was added to
`tools/verify-sources-allowlist.json` — this domain needs none.

## Extraction method

Extracted with `pdfjs-dist` (`legacy/build/pdf.js`, Node ESM):

- `getFieldObjects()` on the 2024 specimen resolves to exactly **50
  distinct field names** (`Texto1`..`Texto50`).
- `page.getAnnotations()` across all 3 pages: **29 widgets on page 1, 21
  on page 2, 0 on page 3** — 50 total, a clean **1:1 widget:field ratio**
  with no split-digit-box groups and no mirrored Original/Duplicado
  structure (unlike several sibling AR/AFIP and AT specimens already in
  this registry). All 50 widgets are text (`/Tx`) fields; none carry the
  `/Ff` Required bit (checked programmatically across all 50 widgets in
  both specimens) and neither specimen uses an asterisk-required
  convention.
- Page 3 carries no widgets at all — inspecting its `getTextContent()`
  output confirms it holds only a standing informational notice to the
  applicant ("El funcionario consular dará inicio al trámite de visado al
  recibir este formulario completado y firmado...") with no further
  numbered campos.
- **Field-to-label correlation:** the raw AcroForm field names
  (`Texto1`..`Texto50`) carry no `alternativeText`/tooltip, so each
  widget's label was reconstructed via `getTextContent()` x/y-position
  correlation — for every widget, the nearest text item positioned above
  the widget's top edge within an overlapping x-range was treated as its
  candidate label, then cross-checked by hand against the form's own
  visible numbered structure. The form's top instruction block
  explicitly reads "► Completar hasta campo 50" (complete through field
  50) and "► Firmar y aclarar en campo 51" (sign and print name at field
  51) — confirming the form has exactly 51 numbered campos, of which only
  1-50 carry fillable widgets (campo 51 is a wet-ink signature line with
  no AcroForm widget, consistent with the 50-widget count). Independently
  verified, via x-coordinate column-overlap analysis against each
  campo's printed number and hint text, that the field names' own numeric
  suffix corresponds **exactly** to the form's own printed campo
  numbering in reading order for all 50 fields (i.e. `Texto{N}` = campo
  `{N}` for every `N` from 1 to 50) — including the two-column layouts on
  campos 32-38, where the naive nearest-label heuristic sometimes picked
  a hint line (e.g. "SI o NO", "dd/mm/aaaa") rather than the numbered
  header directly above it, but the widget's own x-range always fell
  within that hint's column, confirming the correct campo assignment
  either way.
- **Stability cross-check:** the 2026 mirror specimen was independently
  fetched and diffed field-by-field against the 2024 specimen —
  identical field names (`Texto1`..`Texto50`), identical widget
  geometry (rects match to sub-pixel precision), identical printed
  labels and hints on every page. The only textual difference across
  every extracted text item on all 3 pages of both specimens is the
  page-margin form-code/edition stamp (`"FSV-...-2021-"` on the 2024
  specimen vs `"CMILA-2026-..."` on the 2026 mirror) — confirming this is
  a stable, unchanged form rather than a stale specimen.

## Field reconciliation

50 raw widgets → 50 distinct field names → **50 modelled fields**
(1:1:1, the simplest reconciliation of any AR schema in this registry to
date — no split-digit boxes, no mirrored copies, no merges).

## Scope decisions and judgment calls

- **`required` is a structural judgment call, not source-asserted**, with
  one disclosed exception: campo 11 (`lebaneseFamilyRegistryNumber`)
  carries its own explicit printed exemption ("sólo en caso de origen
  libanés" — only in the case of Lebanese origin), so it alone is
  `required: false` on a *source-asserted* basis. All other
  `required: false` fields (`otherNames`, `mobilePhone`, `employer`,
  `workPhone`, `spouseDetails`, `childrenDetails`) are inferred from
  ordinary real-world applicability (not every applicant has an alias,
  a second phone, an employer, a spouse, or children) rather than any
  printed marker, since this specimen has none.
- **Campos 32-38 modelled as a cascading `requiredWhen` chain.** Campo 32
  ("¿Solicitó usted visa argentina anteriormente?") is the gate: campos
  33-34 (`requiredWhen` campo 32 = true) and campo 35 (`requiredWhen`
  campo 32 = true) are only answerable if the applicant previously
  applied. Campo 35 ("¿Ingresó con la visa?") is itself the gate for
  campos 36-38 (`requiredWhen` campo 35 = true) — only answerable if the
  applicant actually entered Argentina under that prior visa. This
  mirrors the `requiredWhen` convention already used in
  `at/bmeia/schengen-visa-application` for similarly conditional
  follow-up questions.
- **Campo 39 modelled as a single free-text field, not split into a
  boolean + detail pair**, unlike campos 32/35/41-49 (all of which carry
  their own separate "SI o NO" hint line). Every text item in campo 39's
  surrounding coordinate range was inspected and no separate "SI o NO"
  hint exists next to its own hint ("quién, dirección, teléfono") — an
  applicant with no such relatives is expected to state so within the
  same free-text box, so it is modelled as `type: string`, `required:
  true`, not `type: boolean`.
- **Campos 43-49 (7 integrity/eligibility "SI o NO" questions) use their
  full printed question text as `label`** rather than a shortened
  paraphrase, since Cancillería's own numbering scheme does not give
  these questions a short caption the way the identity/travel fields
  do (e.g. "APELLIDOS", "SEXO") — abbreviating them risked losing the
  precise legal scope of each question (trafficking, war crimes,
  terrorism, false documentation, prostitution-related offenses,
  facilitating illegal entry, and a catch-all migratory-impediment
  question). `sourceRef` cites the campo number for each; the full
  Spanish text is reproduced verbatim from the PDF's own text layer.
- **Campo 51 (signature and printed name) is out of scope** — it carries
  no AcroForm widget in either specimen (confirmed programmatically:
  only `Texto1`-`Texto50` exist) and the form's own instructions direct
  it to be completed by hand ("Firmar y aclarar en campo 51"), consistent
  with this being a paper form meant to be printed, signed, and
  physically filed at a consulate alongside supporting documents. Page 3
  (a standing informational notice, no numbered campos) is also out of
  scope for the same reason — no widgets, no additional data fields.
- This document models only the shared cover-application cover sheet.
  The specific visa category and its supporting-documentation checklist
  are determined by the consular officer from the stated `travelPurpose`
  (campo 24) and are not part of this specimen's own AcroForm layer —
  consistent with how `jp/isa/certificate-of-eligibility-application`
  models only its shared cover sheet and defers category-specific
  supplements.

## Mock conformance test

A standalone Node script (`conformance.mjs`, not committed — ad hoc
verification harness matching this registry's usual practice) checks:
required-field presence (including `requiredWhen` evaluation), `enum`
membership, `date` format (`YYYY-MM-DD`), and `maxLength`/`minLength`
bounds, against two independent valid mocks and three negative controls.

**Valid mock 1** — a first-time applicant (Uruguayan tourist, no prior
Argentine visa, no spouse/children/employer/second phone/alias/Lebanese
registry number): all 32 applicable fields present, no `requiredWhen`
fields triggered (`previouslyAppliedArgentineVisa: false`). **0 errors.**

**Valid mock 2** — an applicant of Lebanese origin who previously applied
for and entered Argentina under a prior visa, exercising every optional
field and the full `requiredWhen` cascade (`previouslyAppliedArgentineVisa:
true` → campos 33/34/35 present; `enteredArgentinaWithPreviousVisa: true`
→ campos 36/37/38 present), plus `lebaneseFamilyRegistryNumber`,
`otherNames`, `mobilePhone`, `employer`, `workPhone`, `spouseDetails`, and
`childrenDetails` all populated. **0 errors.**

**Negative control 1 — `requiredWhen` cascade violated:** same as valid
mock 2 but with `previousVisaApplicationDate`, `previousVisaApplicationLocation`,
`enteredArgentinaWithPreviousVisa`, `previousEntryDate`,
`previousStayDuration`, and `previousVisitPurpose` all stripped while
`previouslyAppliedArgentineVisa` remains `true`. **Fails validation** with
3 errors — `previousVisaApplicationDate`, `previousVisaApplicationLocation`,
and `enteredArgentinaWithPreviousVisa` are all flagged missing (their
gate, campo 32, is `true`). Note that removing `enteredArgentinaWithPreviousVisa`
itself correctly makes its own dependents (36/37/38) *not* required —
their gate is now absent/false, demonstrating the cascade evaluates each
link independently rather than assuming the whole chain must be filled.

**Negative control 2 — invalid `enum` value:** same as valid mock 1 but
with `"sex": "X"` (not `"M"` or `"F"`). **Fails validation** on the `enum`
membership check, as expected.

**Negative control 3 — missing required fields:** same as valid mock 1
but with `surname` and `argentinaReferences` removed. **Fails validation**
with both flagged missing, as expected.

## Tooling run

- `node tools/validate.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0` → 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is
set to **2027-01-10** (~6 months): this is a from-scratch opening of a
new vertical for Argentina with no independent second-reviewer pass yet,
several structurally-inferred (not source-asserted) `required` judgment
calls, and the position-based label-correlation technique (rather than
a source-embedded tooltip) as the main source of residual risk. Re-check
both cited URLs, confirm no newer specimen has replaced either one, and
consider whether AFIP's Formulario 460/F (individual persona física CUIT
registration, deferred this cycle as a flat/printed form) is ready to
pick up as a follow-on cycle, on or before that date and on any
`source.url` change.
