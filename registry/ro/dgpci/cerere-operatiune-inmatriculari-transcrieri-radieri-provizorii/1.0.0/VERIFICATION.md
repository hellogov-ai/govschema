# Verification record — `ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2804**, opening **Romania's
DMV vertical (2 of 6)**, following Taxes
(`ro/anaf/declaratie-unica-activitati-independente`, GOV-2797, 50th
jurisdiction).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i ro-dgpci`, `git branch -a | grep -i dgpci`,
and `git log --all --oneline | grep -i "ro/dgpci"` before starting — none
found an existing `ro/dgpci` branch, commit, or PR, so no reconciliation was
needed this cycle.

## Source verification — independently re-fetched, not trusted from the task brief alone

- **PDF source:**
  `https://db.prefectura.mai.gov.ro/wp-content/uploads/sites/43/2023/07/CERERE-OPERATIUNE-INMATRICULARI-TRANSCRIERI-RADIERI-PROVIZORII.pdf`
  — re-fetched via `curl -sL`, independently of the task brief's own claimed
  byte size/hash:
  - **HTTP 200**, **`Content-Type: application/pdf`**, **201,447 bytes**
    (matches the task brief's figure byte-for-byte).
  - **`sha256`:**
    `4669a2bd525ae3b3d3efe551c0ddea17e4e4e41bb51c13e52a3a8c8dc60ecc8e`
    (computed via `sha256sum` on the independently re-fetched file).
  - File starts `%PDF-1.7`; object 1's dictionary contains
    `/AcroForm 150 0 R /Pages 2 0 R ...` — a genuine fillable PDF, confirmed
    independently (not just trusted from the brief's own byte-regex claim).
  - `Last-Modified: Thu, 13 Jul 2023 11:47:03 GMT` (per response headers),
    i.e. this specimen has been stable/unauthenticated at this URL for three
    years.

## Agency-code decision: why `dgpci`, not `db`/`prefectura`/`spcrpciv`

The hosting domain, `db.prefectura.mai.gov.ro`, belongs to the **Instituția
Prefectului Județul Dâmbovița** (the Dâmbovița County Prefecture; "db" is
Dâmbovița's own county abbreviation — confirmed via the page's own
`<title>Instituția Prefectului – JUDEȚUL DÂMBOVIȚA</title>`). The form itself
is listed on that site under "**Formulare tipizate gestionate la nivelul
SPCRPCIV Dâmbovița**" (standardized forms managed at the level of SPCRPCIV
Dâmbovița — the Serviciul Public Comunitar Regim Permise de Conducere și
Înmatriculare a Vehiculelor, the county-level operational unit that actually
processes these requests, administered under the Prefecture). However, this
is the **same nationally-uniform, identically-formatted request form** used
by every county's SPCRPCIV — it is a DGPCI-designed "formular tipizat," not a
Dâmbovița-specific document, and the same site's own form list separately
references "**CERERE RESTITUIRE TAXE DIRECȚIA GENERALA PERMISE DE CONDUCERE
ȘI ÎNMATRICULĂRI**" (a fee-refund request form addressed to DGPCI by name),
confirming DGPCI's role as the national design/policy authority behind this
whole family of forms. Per this registry's established convention of
attributing a nationally-uniform form to its **national** issuing authority
even when a county/local operational unit hosts or administers it (e.g.
`rs/mup`: a single national Ministry-published Rulebook annex, administered
locally by police stations; `co/runt`'s own precedent for a nationally
uniform, locally-administered form), the chosen agency code is **`dgpci`**
(Direcția Generală Permise de Conducere și Înmatriculări,
`dgpci.mai.gov.ro`), the task brief's own stated national policy owner —
not `db`/`prefectura` (the specific county mirror that happened to host this
copy) and not `spcrpciv` (the operational unit named on the county page, but
itself a `dgpci`-subordinate unit with no independent public web presence of
its own; `dgpci.mai.gov.ro`'s own `<title>` confirms "Direcția Generală
Permise de Conducere și Înmatriculări" as the umbrella authority).

## PDF structure, independently confirmed via `pdfjs-dist`

- **1 page.** Confirmed via `pdfjs-dist@3` (legacy build):
  `page.getAnnotations({intent: "display"})` returned **34 Widget-subtype
  annotations**, all on this single page.
- **25 text (`Tx`) widgets + 9 checkbox (`Btn`/`checkBox`) widgets = 34
  total**, matching the document's own field count exactly (see field-count
  reconciliation below).
- **All 34 widgets sit in "Caseta B"** (the applicant-completed half of the
  page, per the page's own printed heading "Rubricile din caseta B se
  completează de către solicitant" — the fields in box B are completed by
  the applicant). **"Caseta A"** (per the page's own printed heading
  "Rubricile din caseta A se completează de către autoritatea de
  înmatriculare" — completed by the registration authority) carries **zero**
  Widget annotations of its own on this specimen — confirmed directly from
  the annotation list, not inferred from layout alone. Caseta A's own
  printed columns are: (1) the registration number assigned by the
  authority, (2) the rank/name/signature of the officer who performed the
  operation, (3) the date the operation was performed, and (4) observations
  — all authority-completed, not applicant-submitted content, and excluded
  from this schema for that reason, consistent with this registry's
  established convention for the same class of content (`rs/mup`'s excluded
  deciding-authority items, `rs/mfa`'s excluded consular column).
- **Extracted the full x/y-positioned text layer** for the page and
  cross-checked every widget's own `rect` (x/y) against the text layer's own
  line order, since **the 9 checkbox widgets are named non-sequentially by
  the PDF's own internal numbering** (`Check Box0`, `Check Box1`, `Check
  Box3`, `Check Box2`, `Check Box4`, `Check Box5`, `Check Box6`, `Check
  Box7`, `Check Box8` — note `Box3` printed before `Box2`). Re-deriving the
  true top-to-bottom order from each widget's own `rect[1]` (y-coordinate)
  against the text layer's own top-to-bottom line order gives, unambiguously:
  `Check Box0` = "înmatricularea", `Check Box1` = "înmatricularea
  temporară", `Check Box3` = "transcrierea transmiterii dreptului de
  proprietate", `Check Box2` = "eliberarea unui duplicat al certificatului
  de înmatriculare", `Check Box4` = "eliberarea unui nou certificat ca
  urmare a modificării datelor înscrise", `Check Box5` = "radierea", `Check
  Box6` = "autorizarea provizorie pentru o perioadă de ... zile" (with the
  adjacent `Nr zile` text-widget positioned directly beneath it), `Check
  Box7` = "duplicat placă nr. înmatriculare/placă suplimentară ... buc"
  (with the adjacent `Nr buc` text-widget positioned directly beneath it),
  `Check Box8` = "păstrarea combinației numărului de înmatriculare". All
  nine are independent `Btn`/`checkBox` widgets (`"radioButton": false,
  "checkBox": true` on every one) — not a single radio-button field — so
  nothing in the PDF's own AcroForm structure enforces mutual exclusivity;
  this schema adds that constraint itself via `exclusivityGroups`, matching
  the form's own single "solicit:" (I request:) sentence, which reads
  naturally as a one-of-nine selection even though the widgets are
  technically independent (the same modeling choice as this registry's
  `rs/apr` precedent for its own exclusivity-constrained boolean pair).
- The multi-purpose scope disclosed in the task brief ("registration OR
  transfer OR provisional deregistration") undercounts the actual form: the
  form's own checkbox list has **nine** operation types, not three — the
  title's three named operation families ("Înmatriculări, Transcrieri,
  Radieri Provizorii") are the three headline categories, but the form
  itself also lets an applicant request a duplicate certificate, a new
  certificate after a data change, a duplicate/supplementary plate, or
  retention of the existing plate combination, none of which are literally
  "registration," "transfer," or "(provisional) deregistration." This
  schema models the full nine-way choice as found, not narrowed to the
  title's three-word summary.
- The `Data1` widget's own `alternativeText` metadata is `"dd.mm.yyyy"`,
  confirming the vehicle-acquisition-date field's source format
  independently of the surrounding text layer.
- The **"Semnătura ( ştampilă )" (signature/stamp)** text printed beside the
  declaration date carries **no fillable widget of its own** on this
  specimen (only the adjacent `Data` text widget does) — confirmed directly
  from the 34-widget annotation list, which contains no widget positioned at
  or near the signature line's own coordinates. Not modeled as a field,
  consistent with this registry's practice of only modeling fields an agent
  can actually populate.
- The printed **"NOTĂ DE INFORMARE"** (GDPR data-protection notice) is prose
  text the applicant is asked to acknowledge ("Am luat cunoştinţă de
  conţinutul Notei de Informare" — printed directly above the `Data`/
  signature line, itself not a separate widget) — not a fillable field, and
  not modeled.

## Scope: what is modeled as `fields[]`, and what is excluded

**Included** (all 34 of the form's own Widget annotations, one modeled
field per widget):
- Applicant identity/address/contact block (name-or-company, CNP/CUI,
  locality, street, street number, block/staircase/floor/apartment,
  sector/county, e-mail, phone). E-mail and phone are modeled `required:
  false` per the form's own printed footnote explicitly stating both are
  optional ("Am luat cunoștință că adresa e-mail și numărul de telefon sunt
  opționale"); block/staircase/floor/apartment are left optional since they
  apply only to a block-of-flats address, matching this registry's standard
  treatment of the same class of sub-address component (e.g. `rs/mup`'s
  optional secondary address fields).
- The nine mutually-exclusive operation-type checkboxes (`exclusivityGroups`
  entry `operationTypeSelection`), plus the two operation-specific blanks
  they gate via `requiredWhen` (`provisionalAuthorizationDays`,
  `duplicatePlateQuantity`).
- The vehicle-description block (brand, type, VIN, year of manufacture,
  existing registration number if any) and its acquisition detail
  (acquisition date, mode, and the party acquired from) — the last three are
  left optional since the form prints no explicit yes/no gate ahead of them
  and they are not equally relevant to every one of the nine operation
  types (e.g. a duplicate-certificate or duplicate-plate request does not
  inherently involve a new acquisition), consistent with this registry's
  practice of not inventing a synthetic gate where the source itself prints
  none.
- The optional "point 2" secondary-user block (name/CNP-CUI of a person
  other than the owner recorded as entitled to use the vehicle), left
  optional per the same no-explicit-gate reasoning — the source's own
  instruction text ("Se completează doar în cazul...") states the condition
  in prose but the form provides no separate checkbox/field to gate on, so
  no synthetic gating field was invented (per this registry's explicit
  guidance against fabricating a `requiredWhen` keyed to a non-existent
  field).
- The declaration date (`declarationDate`).

**Excluded**, with reasons (see "PDF structure" above for the
independently-confirmed zero-widget basis):
- **Caseta A** in its entirety (authority-assigned registration number,
  processing officer's rank/name/signature, date of processing,
  observations) — office-only content, zero widgets of its own.
- The **signature/stamp line** beside `Data` — no widget of its own.
- The **GDPR "NOTĂ DE INFORMARE"** prose — not a fillable field.

## `documents[]` — deliberately omitted, disclosed rather than fabricated

This form itself prints **no attachment checklist** (unlike this registry's
`rs/mup` precedent, where the governing Rulebook's own Article 5 legally
itemized a numbered list of mandatory attachments). A canonical, currently
maintained document-requirements list does exist on DGPCI's own site
(`dgpci.mai.gov.ro/documents-and-forms/inmatriculari`), but that site is an
Angular single-page application: a plain `curl` fetch (with a standard user
agent, and separately with a Googlebot user agent) returns only the empty
`<cbn-root></cbn-root>` app shell with no server-rendered content, and the
one available Wayback Machine snapshot
(`web.archive.org/web/20260218004949/...`) is the same empty shell (Wayback's
own crawler does not execute the page's JavaScript either). A WebSearch
query surfaced a plausible-looking checklist (contract vânzare-cumpărare,
talon, CIV, viză fiscală, RAR Auto Pass, RCA, CAF, act de identitate, dovadă
domiciliu) via a third-party aggregator site (`dosar-auto.ro`), not DGPCI
directly, and was **not used** as a `documents[]` source: this registry's
practice requires each `documents[]` entry to trace to a directly verified
first-party source, and an unverified secondary aggregator's summary does
not meet that bar (this is the same category of risk as this registry's
documented general caution against trusting a WebSearch/WebFetch AI summary
without direct re-verification). **Disclosed as a known gap**: a future
review with either direct browser-rendered access to
`dgpci.mai.gov.ro/documents-and-forms/inmatriculari` or a first-party PDF/DOC
checklist should add a `documents[]` array grounded in that verified source.

## Field-count reconciliation

The source PDF's own AcroForm exposes **34 Widget annotations, all on Caseta
B** (Caseta A has zero). This schema models **34 `fields[]`** — a 1:1 mapping
from widget to field, with none merged, split, or left unmodeled. This same
figure (34) is used consistently in this file, in the schema's own top-level
`description`, and in the PR description, to avoid the field-count drift
this registry has previously caught in review (see GOV-2801's own memory of
a description/prose count mismatch).

## Conformance fixtures

Two valid scenarios (0 errors each), under
`conformance/ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii/1.0.0/`:
- `valid-registration-owner-only.json` — a natural-person applicant
  requesting plain registration (`operationRegistration: true`, every other
  operation boolean explicitly `false`), full vehicle/acquisition detail, no
  secondary user, minimal address (no block/staircase/floor/apartment,
  since the address is a house, not a flat).
- `valid-provisional-authorization-with-secondary-user.json` — a
  legal-entity applicant (a CUI, a full block/staircase/floor/apartment
  address, optional e-mail/phone both provided) requesting provisional
  authorization (`operationProvisionalAuthorization: true`,
  `provisionalAuthorizationDays: 30`), an existing registration number (no
  fresh acquisition data), and a populated secondary-user block.

Six mutation controls, each raising exactly one error:

```
$ node check.mjs schema.json mutation-control-missing-required-field.json
["vehicleBrand: required but missing"]
$ node check.mjs schema.json mutation-control-invalid-date-format.json
["declarationDate: expected type date, got string (\"13.07.2026\")"]
$ node check.mjs schema.json mutation-control-invalid-type-year-of-manufacture.json
["vehicleYearOfManufacture: expected type integer, got string (\"2024\")"]
$ node check.mjs schema.json mutation-control-value-below-minimum.json
["vehicleYearOfManufacture: 1850 below minimum 1900"]
$ node check.mjs schema.json mutation-control-missing-conditional-provisional-days.json
["provisionalAuthorizationDays: required but missing"]
$ node check.mjs schema.json mutation-control-exclusivity-group-violation.json
["exclusivityGroup operationTypeSelection: more than one field set (operationRegistration, operationDeregistration)"]
```

`check.mjs` is a scratch, from-scratch conformance checker (built in
`/tmp/pdfscratch/`, never committed) that walks `fields[]`,
`required`/`requiredWhen` (evaluating the shared `Condition` grammar: `all`/
`any`/`not`/`equals`/`notEquals`/`in`/`truthy`), `type` (including the
`date` `YYYY-MM-DD` format), `validation` (`enum`/`minimum`/`maximum`/
`minLength`/`maxLength`/`pattern`), `exclusivityGroups` (at most one
`true`-valued member per group), `documents[]` (none present in this
schema), and an unknown-field check. All eight fixtures (two valid, six
mutation controls) were run against it; both valid fixtures returned `[]`
and every mutation control returned an array of exactly one error string,
matching the transcript above exactly.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
421/421 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
421/421 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

(Registry count was 420/420 before this schema; 421/421 after, consistent
with adding exactly one new schema and no others.)

The scratch `pdfjs-dist`/`canvas` install used for PDF extraction was done
in an isolated `/tmp/pdfscratch/` scratch directory, never inside `tools/`
or `tools/govschema-client/`. Running `node tools/validate-ajv.mjs` itself
required a one-time `npm ci --include=dev` inside `tools/` (its `ajv`/
`ajv-formats` devDependencies were not yet installed in this worktree) —
this is `tools/`'s own `package.json`-declared dependency set, not a scratch
install, and is the documented workaround for this registry's own "local
NODE_ENV=production makes `npm ci` skip ajv" gotcha.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Romania's **DMV vertical (2 of 6)**. Passport, Business Formation,
  Visa, and National ID & Civic Documents remain open, unscreened backlog
  candidates for Romania — not screened this cycle.
- `jurisdiction.level` is `national` — this is a DGPCI-designed, nationally
  uniform request form used identically by every county's SPCRPCIV, even
  though the operational processing happens at county level and this
  particular copy is mirrored on one county Prefecture's own document host.
- `process.type` is `registration`, matching `rs/mup`'s own convention for
  the equivalent multi-purpose DMV-vertical form type (a single form
  spanning registration, transfer, and deregistration operations).
- `process.language` is `ro`, since the source is monolingual Romanian.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) obtaining direct
browser-rendered (or otherwise first-party) access to
`dgpci.mai.gov.ro/documents-and-forms/inmatriculari` to add a verified
`documents[]` array; (2) screening Romania's remaining four verticals
(Passport, Business Formation, Visa, National ID & Civic Documents) for a
ready-to-author candidate.
