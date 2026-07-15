# Verification record — `do/mirex/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3158)

This candidate was pre-scouted during the [GOV-3152](/GOV/issues/GOV-3152)
"GovSchema Standard Research" cycle, which independently scouted and
live-verified all five of the Dominican Republic's remaining verticals in
parallel with authoring `tz/nida/application-form-2a`. GOV-3152 delegated
this candidate as the standalone child issue GOV-3158, disclosing the source
URL, a preliminary HTTP/PDF-structure check, and four further pre-scouted
candidates for DO's other still-open verticals (DMV, Business Formation,
Visa, National ID). This cycle ([GOV-3162](/GOV/issues/GOV-3162)) picked up
GOV-3158 directly and re-verified the source **from scratch** rather than
trusting the prior scouting note as-is, per this registry's standing
convention. The Dominican Republic already has one published document
(`do/dgii/annual-corporate-income-tax-return-ir-2`, Taxes); this document is
its second, opening the Passport vertical (1 of 6 for that vertical, 2/6
verticals overall for the jurisdiction).

## Sources examined

- **Document `(id, version)`:** `do/mirex/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerio de Relaciones Exteriores (MIREX), via its
  Portal de Servicios Consulares.
- **Primary source:**
  `https://servicios360.mirex.gob.do/pdf/formularios/Pasaportes.pdf` —
  re-fetched fresh this cycle with a plain `curl`, no browser User-Agent or
  session needed: HTTP 200, `Content-Type: application/pdf`, size 182,128
  bytes, sha256
  `1919548330a2d81dbd542e35d55ea145cdd0e6acd9bc884da33abe1f1f178245`, genuine
  `%PDF-1.3` magic bytes. No login/CAPTCHA/WAF gate encountered.
- **Structural check:** `pdfjs-dist` 3.11.174 (installed standalone in a
  scratch directory for this task, **not** added as a repository dependency)
  confirmed 2 pages and `page.getAnnotations()` returning `0` for both pages —
  this is a print-and-fill form with **no AcroForm layer**, consistent with
  the prior scouting note.

## Structure independently re-confirmed — and a text-extraction gap found and worked around

A first-pass `getTextContent()` extraction (grouping items by y-coordinate)
correctly recovered page 1's instructions and page 2's own printed chrome —
section headers, the header box labels (Lugar de Emisión/Solicitud Número/
Fecha de Solicitud), the full 13-item `b) DOCUMENTOS ENTREGADOS` checklist,
the 6-item `c) TIPO DE SOLICITUD` checklist, and the `d) FIRMA Y HUELLA`
captions — but returned **zero text items** for the entire numbered
`a) SOLICITANTE` applicant-data grid (sections 1 through 5). Rather than
concluding those fields don't exist or guessing at labels, this was resolved
by rendering page 2 through `node-canvas` at 3x and then 6x scale (the same
technique used in this registry's il/mot and il/moin cycles) and visually
reading every field label and asterisk directly off the rendered image. This
confirmed the labels are real printed text (not a scanned/rasterized
sub-image — the surrounding table lines and text share the same vector
rendering quality as the chrome pdfjs-dist did extract), just outside the
first extraction pass's naive y-coordinate line-grouping. **Every field name
and requiredness marker in this schema's `a) SOLICITANTE`-derived fields
traces to this high-resolution visual read, not the coarse text-extraction
pass alone** — disclosed here as a genuine tooling gap encountered and
worked around, not glossed over.

The high-resolution render confirmed, section by section:

- **1. Datos Identificación** (all 5 sub-fields carry the source's own `*`):
  1.1 Primer Apellido*, 1.2 Segundo Apellido*, 1.3 Nombres*, 1.4 Sexo*
  (Femenino/Masculino checkboxes), 1.5 Estado Civil* (Casado/Viudo/Soltero/
  Divorciado/Unión Libre checkboxes).
- **2. Documento de Identidad según país del documento*** (header-level
  asterisk only, no per-box asterisks): a two-column grid — 2.1 De la
  República Dominicana (Pasaporte / Cédula de Identidad / Otro, each with an
  adjacent number box) and 2.2 Otro País: ___ (blank line) (Pasaporte /
  Documento de Identidad / Otro, same shape).
- **3. Datos de Nacimiento y de Nacionalidad**: 3.1 Fecha de Nacimiento*
  (three boxes explicitly labeled `dd`/`mm`/`yyyy`), 3.2 País de Nacimiento*,
  3.3 Provincia/Estado/Departamento/Región/Ciudad*, 3.4 Localidad/Municipio/
  Condado*, 3.5 País de Nacionalidad*, 3.6 País de Segunda Nacionalidad (si
  tiene) — **no asterisk**, confirmed optional.
- **4. Datos Educativos y Laborales** (neither sub-field carries an
  asterisk): 4.1 Mayor Grado Académico Alcanzado, 4.2 Ocupación Actual (a la
  que dedica mayor tiempo).
- **5. Ubicación Actual**: 5.1 País* through 5.6 Teléfono fijo/residencial*
  all carry the asterisk; 5.7 Teléfono de trabajo/oficina and 5.8 E-mail/
  correo electrónico do **not** and are modeled as optional. 5.5/5.6/5.7 each
  render as two adjacent boxes with no printed sub-label distinguishing them
  (unlike 3.1's explicitly labeled `dd`/`mm`/`yyyy` triple) — modeled as a
  single free-text phone field per row rather than inventing an unlabeled
  country-code/number split.
- **`* Campos obligatorios`** (the form's own required-field legend) appears
  once, directly beneath section 3, confirming the asterisk convention
  applies uniformly across sections 1-5.

## Scope decisions

1. **Section 2's six-box identity-document grid is collapsed to five
   fields** (`identityDocumentCountry`, `identityDocumentOtherCountryName`,
   `identityDocumentType`, `identityDocumentOtherTypeSpecify`,
   `identityDocumentNumber`) rather than one field per box, since the six
   boxes are mutually exclusive alternatives for entering the same
   underlying identity-document number, not six independently meaningful
   data points. `identityDocumentType`'s `national_id_card` value
   deliberately unifies the source's "Cédula de Identidad" (Dominican
   column) and "Documento de Identidad" (foreign column) as the same
   functional concept — disclosed as a modeling simplification, not a
   confirmed MIREX equivalence.
2. **`b) DOCUMENTOS ENTREGADOS` (13-item checklist) is modeled as a single
   `documents[]` `supporting-evidence` entry** (`supportingDocumentation`)
   with `acceptedTypes` enumerating all 13 source-defined document-type
   slugs, mirroring `mx/sre/passport-application`'s `proofOfMexicanNationality`/
   `proofOfIdentity` entries, rather than as 13 separate boolean fields.
3. **`c) TIPO DE SOLICITUD` (request reason) is modeled as a required
   applicant-facing `enum` field (`requestType`)**, not excluded, even
   though the form's own instructions describe both `b)` and `c)` as
   "Para ser llenado por el funcionario consular" (to be completed by
   consular staff). The underlying value — which of the six service reasons
   the citizen is requesting — is substantive data the officer records on
   the citizen's behalf during the interview, not office-internal
   routing/processing metadata (contrast with item 4 below). This mirrors
   the same judgment call already made for `mx/sre/passport-application`'s
   staff-checked identity/nationality-proof boxes.
4. **Excluded from this version, disclosed rather than silently omitted:**
   - The header box (Lugar de Emisión, Solicitud Número, Fecha de
     Solicitud) — consular-office-assigned tracking metadata, not
     applicant-supplied data, the same treatment this registry gives
     office-assigned file numbers elsewhere.
   - `d) FIRMA Y HUELLA` — wet-ink signature plus two fingerprint captures
     (índice izquierdo/derecho), physical biometric/signature actions
     performed in the presence of consular staff, consistent with this
     registry's treatment of biometric capture in `mx/sre/passport-application`
     and `il/mot/medical-examination-driving-license-renewal`.
   - A separate parent/guardian/legal-representative data block for minor
     applicants: the source form's own page-1 instructions (item 5.a)
     describe a parent, legal representative, or notarized third party as
     the filer when the applicant is under 18, but the form carries no
     distinct field set for that role — the same `a) SOLICITANTE` block is
     completed by whoever is filing. No separate minor-specific fields are
     modeled because none exist on the source form itself.
5. **No field-level `pattern` is claimed for `identityDocumentNumber`** —
   the source form accepts a Dominican passport number, Dominican cédula
   number, or a foreign document number in the same box depending on
   `identityDocumentType`/`identityDocumentCountry`, and no single format
   constraint is confirmed to apply across all three; modeled as an
   unconstrained string (`maxLength: 40`) rather than fabricating a regex.
6. **Country/province/locality fields are modeled as free-text strings**,
   consistent with `mx/sre/passport-application`'s treatment of the same
   kind of field, not as ISO country-code enums — the source form itself
   is a blank line, not a picklist.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/do/mirex/passport-application/1.0.0/`: 2 valid scenarios plus 5
mutation-control fixtures, each derived from one of the valid fixtures by a
single targeted mutation. All 7 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived directly from this schema's own
`fields[]`/`documents[]`, not committed to the repo) before being finalized:

- `valid-first-time-dominican-cedula.json` (first-time request, Dominican
  cédula as the identity document, no second nationality) — **0 errors**.
- `valid-renewal-foreign-document-second-nationality.json` (renewal request,
  a foreign DNI recorded via the "Otro País"/"Otro (especifique)" path, a
  second nationality, and an optional work phone) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `lastNamePaternal`)
  — **exactly 1 error**.
- `mutation-control-invalid-enum-marital-status.json` (sets `maritalStatus`
  to `"in_a_relationship"`, not in the enum) — **exactly 1 error**.
- `mutation-control-missing-conditional-other-country-name.json` (keeps
  `identityDocumentCountry: "other"` but drops
  `identityDocumentOtherCountryName`, testing the `requiredWhen` gate) —
  **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `email` to
  `"not-an-email"`) — **exactly 1 error**.
- `mutation-control-missing-supporting-documentation.json` (sets
  `documents.supportingDocumentation` to `false`, testing the required
  `documents[]` entry) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/do/mirex/passport-application/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/do/mirex/passport-application/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **477/477** (476 documents + this one, plus 3 `mapping.json` companions
  unaffected); `node tools/validate-ajv.mjs` → **477/477**.
- `node tools/verify-sources.mjs registry/do/mirex/passport-application/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source form's own printed applicant-data grid
(sections 1-5), request-reason checklist, and supporting-document checklist
are fully transcribed from the genuine, currently-served form, cross-checked
between a text-extraction pass and an independent high-resolution visual
render, but no live filing through a MIREX consular office was attempted and
no independent second reviewer has yet passed over this field list. GovSchema
is an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Dominican Republic or the Ministerio de
Relaciones Exteriores.
