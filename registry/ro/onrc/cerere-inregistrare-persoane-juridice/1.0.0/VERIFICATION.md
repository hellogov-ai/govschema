# Verification record — `ro/onrc/cerere-inregistrare-persoane-juridice` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2813**, opening **Romania's
Business Formation vertical (3 of 6)**, following DMV
(`ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
GOV-2804) and Taxes (`ro/anaf/declaratie-unica-activitati-independente`,
GOV-2797, 50th jurisdiction).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i onrc` and `git log --all --oneline | grep -i
onrc` before starting — no existing `ro/onrc` branch, commit, or PR was
found, so no reconciliation was needed this cycle. (A same-day scratch
directory, `/tmp/onrc/`, was found already present in this sandbox's shared
`/tmp` at session start, containing a byte-identical copy of the source PDF
and several partially-built extraction scripts from an earlier attempt at
this same ticket. No branch, commit, or open PR existed anywhere for this
work, so this was treated as leftover scratch state, not a competing
in-flight run; the extraction scripts were inspected and reused as tooling
scaffolding, but every sourcing claim below — the fetch, the hash, the
pdfjs-dist page/widget counts, and the field-by-field content — was
independently re-derived in this session, not copied from that leftover
state.)

## Source verification — independently fetched and hashed in this session

- **PDF source:** `https://www.onrc.ro/templates/site/formulare/11-10-150.pdf`
  — fetched via `curl -sL`:
  - **HTTP 200**, **`Content-Type: application/pdf`**, **560,332 bytes**.
  - **`sha256`:**
    `a468c682e442b5ed886289b0ba5235407d7ae4fa18443ae66dafc430aa99c243`
    (computed via `sha256sum` on the fetched file).
  - `Last-Modified: Wed, 08 Jan 2025 12:17:59 GMT`.
  - No login, CAPTCHA, or appointment gate encountered.

**Deviation from the task brief's stated expectations, disclosed up front:**
the brief's own estimate of "13 pages, ~445 Widget annotations (~307 text
fields + ~122 checkbox/button fields)" is only partially correct. The
**445 total Widget annotations / 307 text fields** figures are confirmed
**exactly**. The **page count is 4, not 13**, and the **checkbox/button
count is 138, not ~122** (445 − 307 = 138). See "PDF structure" below for
how this was confirmed and why the page-count discrepancy is very likely
explained by the PDF's own incremental-save history.

## PDF structure, independently confirmed via `pdfjs-dist`

- **4 pages** (`doc.numPages === 4`), confirmed via `pdfjs-dist@3` (legacy
  build, `pdfjs-dist/legacy/build/pdf.js`).
- **445 total Widget annotations** across the 4 pages
  (`page.getAnnotations({intent:"display"})`, filtered to `subtype ===
  "Widget"`, summed page-by-page): page 1 = 114, page 2 = 147, page 3 = 140,
  page 4 = 44.
- **By AcroForm `fieldType`: 307 `Tx` (text) + 138 `Btn` (checkbox/button) =
  445**, matching the task brief's total and text-field figures exactly.
- **429 distinct AcroForm field names, not 445.** Cross-checking every
  widget's own `fieldName`, 11 field-name groups on this form share one
  field name across 2–4 widgets each (a total of 27 widgets collapsing to
  11 distinct fields, i.e. 16 "extra" widgets: 445 − 16 = 429). This is the
  standard PDF pattern for a radio-button-style choice implemented as
  same-named checkbox widgets — checking one **automatically** unchecks the
  others in the real PDF, unlike this form's *other* checkboxes (including
  the 8 top-level operation-type checkboxes and the two "împreună/separat"
  pairs), which are independently-named and so are **not** structurally
  exclusive on their own. Of the 11 shared-name groups, only one
  (`CheckBox90_2`, the delivery-method choice: poștă/curier/mijloace
  electronice/sediul O.R.C.T., `exportValue`s `v1`–`v4`) falls inside this
  schema's in-scope sections; the other 10 are all inside the excluded
  "mențiuni" (amendments) section on page 2. `CheckBox90_2` is modeled as a
  single `enum`-typed field (`communicationMethod`), not four independent
  booleans, precisely because the PDF's own structure — not a schema-level
  `exclusivityGroups` addition — already enforces the exclusivity.
- **On the 13-vs-4 page-count discrepancy:** the PDF's own metadata records
  `CreationDate: D:20241231104202+02'00'` and
  `ModDate: D:20250108141759+02'00'` (confirmed via `doc.getMetadata()`),
  i.e. this Microsoft Word-produced PDF (`Creator`/`Producer`: "Microsoft®
  Word 2016") was saved, then incrementally re-saved at least once more
  eight days later. A raw byte-level regex scan of the file
  (`/Type\s*\/Page[^s]/`) finds **12** `Page`-typed objects in the raw byte
  stream, but the file's own `%%EOF`/`startxref` markers appear **6** times
  and `/Prev` **11** times — i.e. this file carries **6 incremental-save
  revisions**, and the raw byte count includes orphaned objects from
  earlier revisions that the *current* cross-reference table (which
  `pdfjs-dist` correctly follows) no longer references. `pdfjs-dist`'s
  `doc.numPages` reflects the live, current page tree (4 pages); the raw
  12-object count is stale revision debris, not a hidden 12-page document.
  The PDF's own `Title` metadata, `"CERERE - înregistrare în registrul
  comerțului - PJ"` ("PJ" = persoane juridice), and the page-1 heading
  `"ANEXA Nr. 2a ... CEREREînregistrareîn registrul comerțului -persoane
  juridice-"`, both independently confirm this is genuinely the target form
  (Anexa nr. 2a) and not a different/wrong document.
- **Rendering note:** `pdfjs-dist` + `node-canvas` rendering of this
  specimen's body text failed (glyph path errors — `"Requesting object that
  isn't resolved yet Times_path_X"` — for the embedded/subset font used for
  ordinary Latin letters; only diacritic-only characters and vector shapes
  like checkbox-border rectangles rendered). This is a rendering-pipeline
  limitation specific to this embedded font in this Node/pdfjs/canvas
  environment, not evidence about the source PDF's own validity — the
  AcroForm structure, annotation list, and full x/y-positioned text layer
  (`page.getTextContent()`) all extracted cleanly and were used as the
  primary source of truth throughout. Rendering *was* used successfully for
  one specific, disclosed purpose: confirming that three small checkbox
  glyphs exist beside the "1.", "2.", and "3." section headings (see next
  section) — checkbox borders are vector paths drawn independently of the
  broken font, so they rendered correctly even though the surrounding label
  text did not.

## Scope decision: legal-entity registration only (request types 1–3 of 8)

The form's own top **"solicit:" (I request:)** list is a single
"one-of-eight" choice (eight independently-named checkboxes, `CheckBox1`
through `CheckBox7` plus `CheckBox7_08.01.2025_1` — the latter's field name
literally embeds the `08.01.2025` incremental-save date, confirming it was
added in that January 2025 revision, consistent with the CAEN Rev.3
classification update it corresponds to having a 2024 legal basis per the
form's own footnote citing Ordinul INS nr. 377/2024):

1. **înmatriculare** — registration of a new legal entity
2. **înregistrare sucursală persoană juridică română** — registration of a
   branch of a Romanian legal entity
3. **înregistrare sucursală persoană juridică străină** — registration of a
   branch of a foreign legal entity
4. **înscriere mențiuni** — amendments to an already-registered entity (its
   own large sub-checklist of dozens of specific amendment types: name
   change, legal-form change, registered-office change, share-capital
   change, dissolution, insolvency, and many more — page 2 of the source)
5. **înscriere operațiuni comunicate de autoritatea/instituția publică** —
   registering operations communicated by a public authority
6. **radiere** — deregistration
7. **îndreptare eroare materială** — correction of a material error
8. **actualizare obiect de activitate conform CAEN Rev.3** — updating the
   business-activity (CAEN) classification

Per the task brief, this v1.0.0 is scoped to **legal-entity registration
only**: request types **(1), (2), and (3)** above, modeled as a single
`exclusivityGroups` entry, `requestedOperationType`
(`requestNewLegalEntityRegistration`,
`requestRomanianLegalEntityBranchRegistration`,
`requestForeignLegalEntityBranchRegistration`). Request types (4)–(8) are
**post-registration lifecycle operations on an already-registered entity**
— amendments, authority-communicated operations, deregistration, material-
error correction, and classification updates are conceptually distinct from
*registering* a legal entity or its branch, and modeling them here would
roughly double the schema's size (they account for **225 of the 445**
source widgets — pages 2 and most of page 3). This is disclosed as a
**deferred backlog candidate** for a future, separately-versioned schema
(e.g. an eventual `ro/onrc/cerere-mentiuni-persoane-juridice`), not modeled
in this v1.0.0.

**Entity types**: unlike some registries' incorporation forms, this
particular ONRC request form does not itself carry a checkbox selection of
legal *forms* (SRL/SA/SNC/etc.) — that classification is fixed by the
entity's own constitutive act (a companion document, not part of this
request form), and this form only fixes the *operation* choice quoted
above. The three in-scope operations are best read as the three
"legal-entity registration" *sub-types* the form itself structurally
distinguishes: registering a wholly new entity, versus registering a branch
of an existing Romanian entity, versus registering a branch of an existing
foreign entity — each with its own dedicated data block (Section 1/2/3 of
the source) and now its own `requiredWhen`-gated field group in this
schema.

## Excluded companion forms (not folded in, per task instructions)

Per the task brief's explicit instruction, none of the following were
folded into this schema; each is a separate ONRC/ANAF form outside this
document's scope:

- **Name-reservation request** (`11-10-181.pdf`, cerere de verificare
  disponibilitate și/sau rezervare firmă) — a prerequisite step, filed
  before this request, not part of it.
- **Fiscal-registration annex** (`anexa_1_inregistrare_fiscala.pdf`, Anexa
  1 privind înregistrarea fiscală) — a companion annex some registrations
  must also file, covering tax-registration data this form does not ask
  for.
- **Sworn declaration** (`11-10-141.pdf`, declarația pe propria răspundere
  privind îndeplinirea condițiilor de funcționare) — the source form's own
  Section 4.3 *references* this declaration by name ("Solicitantul trebuie
  să depună, odată cu cererea de înregistrare, și declarația pe propria
  răspundere...", footnote 3) as a required companion filing, but that
  declaration is itself a separate document with its own fields, not
  reproduced here.

## Duplicate section-header checkboxes — a disclosed, deliberate exclusion

Beyond the top-level "solicit:" list, the source form carries a **second,
smaller checkbox** immediately beside each of sections **"1."**, **"2."**,
and **"3."**'s own numbered headings (AcroForm field names `CheckBox7_bg`,
`CheckBox7_bis`, and `CheckBox11` respectively — the odd/collided naming is
itself evidence of Word's auto-naming during incremental edits, not a
functional difference). Confirmed these are genuine, separate, positioned
checkbox widgets — not a text-extraction artifact — via a targeted
`node-canvas` render crop of the area immediately before "1.Înmatriculare"
(rendering the checkbox border succeeded even though the surrounding label
text did not, per the rendering note above): a real empty checkbox square
renders there. **These three widgets are not modeled as separate schema
fields.** They duplicate the top-level `requestedOperationType`
`exclusivityGroups` selector's own semantic meaning (which of the three
registration types is being requested) with no additional information of
their own, and modeling both would let an agent set one without the other,
producing an internally inconsistent filled form with no way for this
schema to express or prevent that inconsistency. This is a disclosed
judgment call, not an oversight: **3 of the 445 source widgets are
knowingly left unmodeled here even though they sit inside the otherwise
in-scope sections 1–3**, all three being this exact duplicate-marker
pattern.

## Bounded repeating group: submitted-documents manifest (Section IX)

The task brief anticipated a possible unbounded repeating group (e.g. an
associates/shareholders list) that would need an artificial cap. **This
form itself does not contain an associates/shareholders list** — detailed
shareholder/associate data belongs to the entity's own constitutive act (a
companion document filed alongside this request, not reproduced on this
request form). The one genuinely repeating structure this form *does*
contain is **Section IX, "OPIS DE DOCUMENTE DEPUSE"** (manifest of
submitted documents, page 4): a table the source itself prints with
**exactly 7 numbered rows** ("1." through "7.") followed by a "Total file"
line — confirmed by counting the AcroForm widgets in that table
(4 fields for row 1, whose "Denumirea actului" column is pre-printed
"Hotărâre adunare generală/ Directorat / Decizie CA" rather than blank, plus
its own manuscript character/page-count sub-fields; 3 fields — name,
reference, page count — for each of rows 2 through 7; plus one
"Total file" field: 4 + 3×6 + 1 = 23 fields total). **This is a fixed
row count printed by the source, not an unbounded list this schema had to
cap** — modeled as `document1`…`document7`, matching the source's own row
count exactly, with the bound disclosed here for completeness rather than
because it required an arbitrary choice.

## Field-count reconciliation

- **445** total source Widget annotations (307 `Tx` + 138 `Btn`), confirmed
  independently via `pdfjs-dist`.
- **429** distinct AcroForm field names (11 shared-name radio-style groups
  collapse 27 widgets to 11 fields).
- Of those 429 distinct fields, this schema models **221** as `fields[]`.
  The gap (429 − 221 = 208) is accounted for by:
  - **~200 fields** inside the out-of-scope request types 4–8 (mențiuni,
    operațiuni comunicate, radiere, îndreptare eroare, actualizare CAEN) —
    the large majority of the exclusion, per the scope decision above.
  - **8 fields**: the 5 out-of-scope top-level operation checkboxes
    (`CheckBox4`–`CheckBox7`, `CheckBox7_08.01.2025_1`, corresponding to
    request types 4–8) plus 3 duplicate section-header checkboxes
    (`CheckBox7_bg`, `CheckBox7_bis`, `CheckBox11`, all disclosed above).
- This same **221** figure is used consistently in this file, in the
  schema's own top-level `description`, and in the PR description (see
  GOV-2801's own memory of a prior description/prose count mismatch this
  registry has caught before — checked all locations here before opening
  the PR).

## Section XII (depositor) — modeled as optional, per the source's own footnote

Section XII's own footnote (12) reads: "Se va completa de către deponent
numai dacă este altă persoană decât semnatarul cererii." (To be completed by
the depositor only if they are a different person than the signer of the
request.) This means the entire depositor block — `depositorSurname`
through `depositorGdprAcknowledgementDate` — is conditional in the source,
not universally required: when the person filing the paperwork *is* the
same person as the Section IV applicant/signer, this block is left blank on
the paper form. The form itself prints no separate yes/no checkbox
distinguishing the two cases (only the footnote's prose states the
condition), so — consistent with this registry's explicit guidance against
fabricating a `requiredWhen` keyed to a non-existent field (the same
reasoning `ro/dgpci`'s own VERIFICATION.md applied to its optional
secondary-user block) — this entire block is modeled as `required: false`
with no `requiredWhen`, rather than either forcing it always-required or
inventing a synthetic gating field. An earlier draft had incorrectly marked
`depositorSurname`/`depositorGivenName`/`depositorIdNumber`/
`depositorCapacity`/`depositorGdprAcknowledgementDate` as unconditionally
`required: true`; caught and corrected before opening the PR once the
footnote was re-read against the modeled fields.

## Conformance fixtures

Under `conformance/ro/onrc/cerere-inregistrare-persoane-juridice/1.0.0/`:

- `valid-new-entity-registration.json` — a natural-person applicant
  requesting new-entity registration (`requestNewLegalEntityRegistration:
  true`, the other two operation booleans explicitly `false`), full
  applicant/new-entity/contact/billing/documents/depositor detail.
- `valid-foreign-branch-registration.json` — an applicant acting under a
  power of attorney, requesting registration of a branch of a foreign
  (German) legal entity (`requestForeignLegalEntityBranchRegistration:
  true`), exercising the foreign-entity, foreign-entity-representative, and
  branch-operations-representative field groups, the
  `foreignBranchRepPowers` exclusivity pair (`separate` selected), the
  certified-copies request path, and the postal delivery method.

Six mutation controls, each raising exactly one error:

```
$ node check.mjs schema.json mutation-control-missing-required-field.json
["applicantSurname: required but missing"]
$ node check.mjs schema.json mutation-control-invalid-date-format.json
["declarationDate: expected type date, got string (\"13.07.2026\")"]
$ node check.mjs schema.json mutation-control-invalid-type.json
["documentsTotalPageCount: expected type integer, got string (\"seven\")"]
$ node check.mjs schema.json mutation-control-value-below-minimum.json
["document1PageCount: 0 below minimum 1"]
$ node check.mjs schema.json mutation-control-missing-conditional-field.json
["newEntityName: required but missing"]
$ node check.mjs schema.json mutation-control-exclusivity-group-violation.json
["exclusivityGroup requestedOperationType: more than one field set (requestNewLegalEntityRegistration, requestRomanianLegalEntityBranchRegistration)"]
```

`check.mjs` is a scratch, from-scratch conformance checker (built in
`/tmp/pdfscratch/`, never committed) that walks `fields[]`,
`required`/`requiredWhen` (evaluating the shared `Condition` grammar: `all`/
`any`/`not`/`equals`/`notEquals`/`in`/`truthy`), `type` (including the
`date` `YYYY-MM-DD` format), `validation` (`enum`/`minimum`/`maximum`/
`minLength`/`maxLength`/`pattern`), `exclusivityGroups` (at most one
`true`-valued member per group), `documents[]` (none present in this
schema), and an unknown-field check. All 8 fixtures (2 valid, 6 mutation
controls) were run against it; both valid fixtures returned `[]` and every
mutation control returned an array of exactly one error string, matching
the transcript above exactly.

**A modeling bug caught and fixed during this same authoring session,
before opening the PR:** the first draft applied each section's
`requiredWhen` gate to *every* field in that section's identity/address
block, including sub-fields that should remain always-optional (e.g.
`bloc`/`scara`/`etaj`/`ap.`, which only apply to a block-of-flats address).
Running the two valid fixtures against the from-scratch checker
immediately surfaced this (`required but missing` errors for fields that
should never be required) — fixed by restricting each block's
`requiredWhen` gating to only its name/core-identity fields
(`*Name`/`*Surname`/`*GivenName`/core office `Locality`/`Street`) and
leaving every other sub-field simply `required: false` with no
`requiredWhen` at all. This is exactly why both valid fixtures need to
independently return `[]` before a PR is opened, not just the mutation
controls.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
422/422 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
422/422 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

(Registry count was 421/421 before this schema; 422/422 after, consistent
with adding exactly one new schema and no others.)

Running `node tools/validate-ajv.mjs` itself required a one-time `npm ci
--include=dev` inside `tools/` (its `ajv`/`ajv-formats` devDependencies were
not yet installed in this worktree) — the documented workaround for this
registry's own "local `NODE_ENV=production` makes `npm ci` skip ajv"
gotcha, not a scratch install.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Romania's **Business Formation vertical (3 of 6)**. Passport,
  Visa, and National ID & Civic Documents remain open, unscreened backlog
  candidates for Romania — not screened this cycle.
- `jurisdiction.level` is `national` — ONRC is Romania's national trade
  register authority; the county Trade Register Offices (ORCT) that
  actually receive and process this request are ONRC's own local
  operational units, not a separate level of government (the request
  itself names the addressee ORCT as a fillable field,
  `addresseeTradeRegisterOffice`, rather than fixing the schema to one
  county).
- `process.type` is `registration`, matching this registry's convention for
  a legal-entity-registration request form.
- `process.language` is `ro`, since the source is monolingual Romanian.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) authoring the deferred
mențiuni/operațiuni-comunicate/radiere/îndreptare-eroare/CAEN-update
operations (request types 4–8) as a separate, later schema version or
sibling document, since they account for roughly half of this form's own
widgets; (2) screening Romania's remaining three verticals (Passport, Visa,
National ID & Civic Documents) for a ready-to-author candidate.
