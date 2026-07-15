# Verification record — `do/mirex/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3168)

This candidate was pre-scouted during the [GOV-3152](/GOV/issues/GOV-3152)
"GovSchema Standard Research" cycle, which independently scouted and
live-verified all five of the Dominican Republic's remaining verticals in
parallel. GOV-3158 (do/mirex/passport-application, opening DR's Passport
vertical) already landed on the same `servicios360.mirex.gob.do` domain, and
its own follow-up cycle (GOV-3166, DMV) and GOV-3167 (Business Formation)
have since landed as well. This ticket is the disclosed next candidate: DR's
Visa vertical, the fifth of six. Per this registry's standing convention,
the source was re-verified **from scratch** this cycle rather than trusting
the prior scouting note's field count or structure as-is.

## Sources examined

- **Document `(id, version)`:** `do/mirex/visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerio de Relaciones Exteriores (MIREX), via its Portal
  de Servicios Consulares.
- **Primary source:**
  `https://servicios360.mirex.gob.do/pdf/formularios/Formulario_Solicitud_Visado.pdf`
  — re-fetched fresh this cycle with a plain `curl`, no browser User-Agent or
  session needed: HTTP 200, `Content-Type: application/pdf`, size 100,161
  bytes, sha256
  `398cb3629e1844f3064b62e3943563314c3121d50bcfa56ab974055abe0715a4`, genuine
  `%PDF` magic bytes. No login/CAPTCHA/WAF gate encountered.
- **English-language sibling (cross-check only, not the canonical source):**
  `https://servicios360.mirex.gob.do/pdf/formularios/Formulario_Solicitud_Visado_english.pdf`
  — also re-fetched fresh: HTTP 200, `Content-Type: application/pdf`, size
  239,212 bytes, sha256
  `347913db33ac524baf6ef0434c9dacf37ded194e3a0bb7deef53293be697fd97`. Used
  only to confirm field-label meaning and section structure (e.g. confirming
  "Segunda Nacionalidad" is qualified "(if applicable)" in English even
  though the Spanish original leaves that implicit); `source.url` in
  `schema.json` points at the Spanish original, consistent with
  `process.language: "es-DO"` and this registry's treatment of
  do/mirex/passport-application.
- **Structural check:** `pdfjs-dist` 3.11.174 (installed standalone in a
  scratch directory for this task, **not** added as a repository dependency)
  confirmed 2 pages for both editions and `page.getAnnotations()` returning
  `0` for every page — a print-and-fill form with **no AcroForm layer**,
  consistent with the sibling passport document.

## Structure independently re-derived — no text-extraction gap this time, but a different required-marker gap

Unlike do/mirex/passport-application (where the applicant-data grid returned
zero text items from a naive `getTextContent()` pass), this visa form's
`getTextContent()` extraction recovered **every** field label on both pages
of both editions directly, grouped by y-coordinate. This was independently
re-run twice — once against a freshly re-curled copy of each PDF — and the
two extraction passes matched byte-for-byte (ignoring only pdfjs-dist's own
`canvas`-module warning banner), so no fabrication or transcription drift is
possible between "the first pass" and "the schema below."

A programmatic scan of every text item on both pages for the `*` glyph
returned **zero** matches on either page, in either language edition. This
form carries **no asterisk, legend, or any other printed required/optional
marker convention anywhere** — a materially different situation from
do/mirex/passport-application's explicit `* Campos obligatorios` legend.
Rather than inventing a marker the source doesn't have, every section was
additionally cross-checked against a node-canvas render of both pages at 6x
scale to confirm this by direct visual inspection, and two specific fields
were re-examined at this resolution because their sibling document treats
the same concept as an enum:

- **Section 4.1 "Sexo"** is a single blank box with no printed checkbox
  options of any kind (contrast do/mirex/passport-application's "Sexo",
  which reproduces printed Femenino/Masculino options).
- **Section 8.1 "Estado Civil"** is likewise a single blank box with no
  printed options (contrast do/mirex/passport-application's five-option
  Casado/Viudo/Soltero/Divorciado/Unión Libre checkbox row).

Both are modeled as free-text `string` fields rather than fabricated enums.

Every repeating table's exact row count was counted directly off the 6x
render (cropped and re-inspected section by section), not assumed from the
section heading text alone:

- **Section 11** (Datos del empleador y/o centro de estudio actual): **3**
  data rows.
- **Section 13** (¿Ha visitado República Dominicana alguna vez? — prior
  visits): header row (itself fillable) + **3** further blank rows = **4**
  total entries.
- **Section 14** (visas previously granted to the Dominican Republic),
  **Section 15** (visas granted by other countries), **Section 17** (denied
  Dominican visa detail), and **Section 19** (petition filed by someone
  else): **2** data rows each.
- **Section 18** (intent to work/study): **2** lettered blocks, `a` and `b`,
  each with its own 7-field sub-grid (activity, name, phone, province,
  locality, street, number).
- **Section 20** (accompanying persons): header row (itself fillable) + **2**
  further blank rows = **3** total entries.

## Scope decisions

1. **No printed required-field marker exists anywhere on this form** (see
   above). Requiredness is therefore asserted from context rather than a
   source convention: (a) core biographic/passport/current-location/contact
   fields are modeled `required: true`; (b) fields the source itself
   qualifies as conditional or supplementary — `otherLastNamesUsed`,
   `otherNamesUsed`, `secondaryNationality` ("if applicable" per the English
   edition), `highestEducationLevel`, apartment-specific address sub-fields
   (`currentFloor`/`currentStaircase`/`currentDoor`), `currentWorkPhone`,
   `currentFax`, `workEmail`, all of Section 7 (a wholly optional secondary
   identity document), all of Section 12 (explicitly "si es usted mismo, no
   llenar" — if it is you yourself, do not fill in) — are modeled optional;
   (c) the first row of each Si/No-gated repeating block (Sections
   13/14/17/18/19) is `requiredWhen` the corresponding boolean gate is
   `true`, while additional rows beyond the first are modeled as plain
   optional entries, per this registry's established `entrantN` convention
   (e.g. dk/cpr/notification-of-entry) rather than chained/compounded
   conditions; (d) Sections 15 and 20 carry no Si/No gate field of their own
   on the source form (they are plain listing headings, not conditional
   blocks), so every row in those two sections is a plain optional field
   with no `requiredWhen`. This overall approach mirrors the precedent this
   registry already set for a visa form with the same no-marker situation —
   see `uy/mrree/formulario-unificado-de-visas`, judgment call 4.
2. **`maritalStatus` (8.1) is modeled as free-text `string`, not an enum**
   (no printed options — see above), and as a direct consequence
   **`spouseFullName`/`spouseDateOfBirth`/`spouseNationality` (8.2-8.4) are
   modeled fully optional** rather than `requiredWhen`-gated against
   `maritalStatus`, since there is no reliable enum value to key a condition
   on. This is the same reasoning already applied in
   `uy/mrree/formulario-unificado-de-visas` (judgment call 4) to its own
   free-text marital-status field.
3. **Section 10's street sub-grid has a genuine source numbering artifact,
   disclosed rather than silently resolved:** the printed labels read
   "10. 7 Tipo de Vía   10.8 Nombre de la Vía   10. 8 Número   10.9 Código
   Postal" — i.e. the box captioned "Número" duplicates the immediately
   preceding "Nombre de la Vía" box's own "10.8" label, confirmed identical
   in both the Spanish and English editions (the English edition shows the
   same duplicate-"10.8" artifact). Modeled as four distinct fields
   (`accommodationStreetType`, `accommodationStreetName`,
   `accommodationStreetNumber`, `accommodationPostalCode`) keyed to each
   box's own caption and grid position, not collapsed or renumbered.
4. **Section 11 (employer/centro de estudio) is modeled fully optional,
   including its first row** — unlike the `entrantN`/Si-No-gated pattern
   used elsewhere in this document — because the section's own heading
   qualifier ("anotar más de uno si existen" — note more than one *if they
   exist*) discloses that even a single employer/institution entry may not
   apply to every applicant (e.g. a retired or independently-supported
   traveler), and the section carries no boolean gate field to key a
   `requiredWhen` condition on.
5. **The 36-item "Indicar documentos que acompañan esta solicitud" checklist
   (Section, unnumbered, page 2 footer) is modeled as a single `documents[]`
   `supporting-evidence` entry** (`supportingDocumentation`) with
   `acceptedTypes` enumerating all 36 source-defined document-type slugs
   (transcribed column-by-column directly off the render: 12 in each of the
   three printed columns), mirroring the same modeling choice already used
   for `do/mirex/passport-application`'s `supportingDocumentation` entry and
   `mx/sre/passport-application`'s document entries, rather than as 36
   separate boolean fields.
6. **Excluded from this version, disclosed rather than silently omitted:**
   - The "Información Interna (No llenar)" box (Expediente/Resolución
     Número/Fecha/Lugar/Estatus) — explicitly marked "do not fill in" on the
     form itself, consular-office tracking metadata, the same treatment this
     registry gives office-assigned file numbers elsewhere (contrast
     do/mirex/passport-application's header box, which carries no such
     explicit instruction but is treated the same way by inference).
   - "Firma Solicitante" / "Dedo 1 (Índice Izquierdo)" / "Dedo 2 (Índice
     Derecho)" — wet-ink signature plus two fingerprint captures, physical
     biometric/signature actions performed in the presence of consular
     staff, consistent with this registry's treatment of biometric capture
     in do/mirex/passport-application, mx/sre/passport-application, and
     il/mot/medical-examination-driving-license-renewal.
   - The "Fotografía" photo box printed at the top of page 1 is not modeled
     as a standalone field: "Fotografía" already appears as one of the
     36 `acceptedTypes` slugs in `documents[]`, and a standalone photo-slot
     field would duplicate that same underlying fact.
7. **Country/province/locality/phone/address fields are modeled as free-text
   strings**, consistent with `do/mirex/passport-application`'s treatment of
   the same kind of field, not as ISO country-code enums — every instance on
   the source form is a blank line, not a picklist.
8. **`purposeOfVisit` (9.3) is modeled as an `enum`**, not free text, because
   — unlike Sections 4.1/8.1 — this field's ten options (Placer, Estudio,
   Negocio, Trabajo, Dependencia, Oficial, Diplomático, Residencia, Cortesía,
   Otros) are genuinely printed on the form as a checkbox-style list with
   blank-line marks ("__"), the same textual-checkbox convention this
   registry already treats as enum-worthy elsewhere (e.g.
   do/mirex/passport-application's `requestType`).

## Conformance fixtures (Phase 3)

9 fixtures committed under `conformance/do/mirex/visa-application/1.0.0/`: 2
valid scenarios plus 7 mutation-control fixtures, each derived from one of
the valid fixtures by a single targeted mutation. All 9 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived directly
from this schema's own `fields[]`/`documents[]`, not committed to the
repo) before being finalized:

- `valid-first-time-single-applicant.json` (first-time applicant, no prior
  DR visits/visas, traveling alone for Placer, no secondary ID document, no
  employer/institution rows filled in) — **0 errors**.
- `valid-repeat-visitor-with-history.json` (prior DR visit, a previously
  granted DR visa, work/study intent, an accompanying companion, a
  third-party expense payer, and a secondary identity document) — **0
  errors**.
- `mutation-control-missing-required-field.json` (drops
  `lastNameAsInPassport`) — **exactly 1 error**.
- `mutation-control-invalid-enum-purpose.json` (sets `purposeOfVisit` to
  `"vacation"`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `personalEmail` to
  `"not-an-email"`) — **exactly 1 error**.
- `mutation-control-missing-conditional-previous-visit.json` (keeps
  `visitedDominicanRepublicBefore: true` but drops `previousVisit1Date`,
  testing the `requiredWhen` gate) — **exactly 1 error**.
- `mutation-control-missing-conditional-purpose-other.json` (sets
  `purposeOfVisit: "otros"` but drops `purposeOfVisitOtherSpecify`) —
  **exactly 1 error**.
- `mutation-control-missing-supporting-documentation.json` (sets
  `documents.supportingDocumentation` to `false`, testing the required
  `documents[]` entry) — **exactly 1 error**.
- `mutation-control-wrong-type-length-of-stay.json` (sets
  `lengthOfStayDays` to a non-integer string) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/do/mirex/visa-application/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/do/mirex/visa-application/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → all documents pass (prior full-registry count plus this one); `node
  tools/validate-ajv.mjs` → all documents pass (see repo-root validator
  output captured in the PR for the exact before/after counts).
- `node tools/verify-sources.mjs registry/do/mirex/visa-application/1.0.0` —
  clean (0 warnings, 0 failures) for this document's directory.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source form's own 20 numbered applicant-facing
sections plus its supporting-document checklist are fully transcribed from
the genuine, currently-served form, cross-checked between an independent
text-extraction pass and a high-resolution visual render (including an exact
row-count of every repeating table), but no live filing through a MIREX
consular office was attempted and no independent second reviewer has yet
passed over this field list. GovSchema is an independent, non-profit
standards body and is not affiliated with, endorsed by, or operated by the
Dominican Republic or the Ministerio de Relaciones Exteriores.
