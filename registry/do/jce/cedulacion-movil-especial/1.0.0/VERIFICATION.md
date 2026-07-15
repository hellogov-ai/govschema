# Verification record — `do/jce/cedulacion-movil-especial` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3169)

[GOV-3152](/GOV/issues/GOV-3152) (2026-07-15) independently scouted and
live-verified all five of the Dominican Republic's then-remaining verticals
in parallel with authoring `tz/nida/application-form-2a`. GOV-3158 (Passport)
was picked up directly; its four siblings were delegated as standalone child
issues, disclosing this candidate — the JCE's mobile cédula
("Cedulación Móvil Especial", FO06/PRO-DNC-001) form — as the National ID
candidate, along with a preliminary field count (39) and a note about a
Zenedge CDN in front of the asset. This issue (GOV-3169, picked up from
GOV-3158's backlog) re-verified the source **from scratch** rather than
trusting the prior scouting note's field count as-is, per this registry's
standing convention.

**Correction to this issue's own brief:** GOV-3169's task description
states landing this document "closes the Dominican Republic to full 6/6
vertical coverage." This was checked directly against `CATALOG.md`'s
By-Jurisdiction table rather than taken on faith, and found to be stale: as
of this cycle the Dominican Republic (`DO`) row shows Passport✓/DMV✓/
Business✓/Taxes✓/Visa✗/National ID✗ — 4 of 6, with **both** Visa and
National ID still open (Business Formation opened only very recently, via
GOV-3167/`do/camara-comercio-la-vega/registro-mercantil`, in the same
2026-07-15 research cycle this issue's brief was written from, and Visa
(GOV-3168) is a separate still-open child issue, not yet landed). This
document opens the Dominican Republic's National ID vertical, bringing it
to **5 of 6** — not 6/6. This discrepancy is disclosed in this issue's
comments and in the review-gate description rather than silently
overwriting the brief's premise or fabricating a false "6/6" catalog claim.

## Sources examined

- **Document `(id, version)`:** `do/jce/cedulacion-movil-especial` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Junta Central Electoral (JCE), Dirección Nacional de
  Cedulación.
- **Primary source (the form itself):**
  `https://jce.gob.do/LinkClick.aspx?fileticket=rLckmEs6dfQ%3D&portalid=0` —
  fetched fresh this cycle with a plain `curl` (no browser User-Agent or
  session needed): HTTP 200, `Content-Type: application/pdf`, size 605,231
  bytes, sha256
  `5e0468004d1f02f028ee63d7086e63ff160dbece56b0cd2e5ed73639c5d46b57`, genuine
  `%PDF-1.6` magic bytes (`%PDF-1.6\r%â㣏Ó\r\n`). No login/CAPTCHA/WAF gate
  encountered — the prior scouting note's mention of a Zenedge CDN reflects
  jce.gob.do's general front-end infrastructure, not an access control on
  this specific asset.
- **Secondary sources (published intake-requirement guidance, used only to
  resolve requiredness where the form itself carries no marker — see below),
  both independently fetched this cycle:**
  - `https://jce.gob.do/Cedulacion-Movil` — the JCE's own service page,
    describing eligibility ("ciudadanos y ciudadanas que por su condición de
    salud, discapacidad o envejecimiento no puede trasladarse") and required
    submissions ("Certificado médico o fotografía en donde se visualice la
    condición"; a copy of the representative's own cédula; and, per the
    citizen's cédula request type, the standard supporting documents for
    that request type).
  - `https://www.elcaribe.com.do/panorama/tramites/cedulacion-movil-especial-quienes-califican-requisitos-y-como-solicitar-el-servicio/`
    — independent press coverage confirming the same requirement in near
    identical language ("Certificado médico o fotografía que evidencie la
    condición del solicitante") and the two submission channels (email to
    `cedulacionmovil@jce.do`, or in person at any cedulación center).
- **Structural check:** `pdfjs-dist` 3.11.174 (installed standalone in a
  scratch directory for this task, **not** added as a repository dependency)
  confirmed a **single-page genuine AcroForm**: `page.getAnnotations()`
  returned exactly **39** `Widget` annotations, matching the prior scouting
  note's count. This count was independently re-derived this cycle field by
  field (name, type, rect) — not re-quoted from the scouting note — via a
  from-scratch extraction script, cross-referenced against `getTextContent()`
  label positions and a node-canvas 4x-scale visual render of the page.

## Field-by-field reconciliation (39 raw widgets → 24 schema fields)

The 39 widgets split into 26 applicant-facing widgets and 13 out-of-scope
widgets (office-internal block + 2 signature lines):

- **Header date grid** (3 widgets): `Fecha`/`Mes`/`Año` (see consolidation
  note below).
- **Datos del Solicitante** (6 widgets): `Nombres`, `Apellidos`, `Cédula`,
  `Parentesco`, `Teléfono`, `Cel` — 9 widgets total together with the date
  grid.
- **Datos del Ciudadano que recibirá el servicio** (10 widgets):
  `Nombres_2`, `Apellidos_2`, `Cédula_2`, `Teléfono_2`, `Cel_2`, `Calle`,
  `casaapt`, `Sector`, `Municipio`, `Provincia`.
- **Motivos Cedulación Móvil** (4 widgets): `Enfermedad`, `Envejeciente`,
  a checkbox internally named `Persona con discapacidad  Tipo de
  discapacidad`, and a large multi-line text box whose internal AcroForm
  field name is **literally the string `"undefined"`** — confirmed via
  `typeof`/`JSON.stringify` on the raw annotation, not a `null`/absent name
  rendered as the word "undefined" by this schema's own tooling. This is a
  genuine naming artifact in the source PDF (most likely left over from
  whatever authoring tool produced this AcroForm), disclosed here rather
  than silently renamed without comment.
- **Documentos aportados** (3 widgets): a checkbox internally named
  `toggle_1` (visually labeled "Certificado médico"), `Fotos`, and
  `Otros documentos` (multi-line text).
- **Out of scope (13 widgets, see Scope decisions):** `Nueva inscripción`,
  `Duplicado de cédula`, `Renovación de cédula`, `Cambio de datos`, `Otro`,
  `Impresión solicitud`, `Renovación extranjero`, `Duplicado extranjero`,
  `Captura de biométricos para` (declaración tardía), `disponible`,
  `Observaciones`, `Firma del Solicitante`, `Recibido por`.

9 + 10 + 4 + 3 + 13 = 39, reconciling exactly against the structural check.
The 26 applicant-facing widgets consolidate to **24 schema fields**: the
3-widget `Fecha`/`Mes`/`Año` grid collapses to a single `requestDate` field,
consistent with this registry's established date-grid consolidation
precedent (e.g. `do/mirex/passport-application`'s `dateOfBirth`).

A rect-level cross-check against `getTextContent()` label positions resolved
one non-obvious layout point: the header row prints "Día", "Mes", "Año" as
column labels (in that left-to-right visual order), but the underlying
AcroForm field for the leftmost ("Día") box is itself internally named
`"Fecha"` — i.e. the source PDF's own field-naming does not match its visual
column order. Confirmed by comparing each field's `rect` x-coordinate against
the nearest label's x-coordinate, and independently re-confirmed via the
node-canvas visual render. This is a source quirk, not a modeling choice.

## A note on the "PARA USO INTERNO" boundary

Unlike `do/mirex/passport-application` (where the analogous staff-facing
checkbox block was described only as "completed by consular personnel" in
free-flowing instructional text, and was ultimately modeled as an
applicant-facing field per that document's own reasoning), this form's
internal block is set apart by an explicit, bolded section header —
**"PARA USO INTERNO PERSONAL DE CEDULACIÓN"** ("FOR INTERNAL USE BY
CEDULACIÓN PERSONNEL") — and by a printed dashed rule visually separating it
from the applicant-facing content above (independently confirmed via the
node-canvas 4x render). Because the header itself declares the entire block
internal (not merely a note that staff perform the data entry, as in the
MIREX case), all 11 non-signature widgets inside it (service-type
classification checkboxes, the "Otro" override, and "Observaciones") are
excluded here as office-workflow/processing metadata, a different judgment
call than MIREX's `requestType` field, and disclosed as such rather than
mechanically applying the MIREX precedent to a materially different source
layout.

## Scope decisions

1. **Requiredness is asserted primarily from published secondary sources and
   functional necessity, not from the form itself** — the source carries
   **no printed required-field asterisk, legend, or any other requiredness
   marker anywhere on the page**, confirmed by both a full `getTextContent()`
   scan for `*`/`obligatorio`/`requerido`/`necesari` (no matches) and a
   4x-scale node-canvas visual render (see Sources examined). This differs
   from `do/mirex/passport-application` and
   `do/dgii/vehicle-transfer-sworn-declaration-fi-vhm-308`, both of which had
   at least a partial printed asterisk convention to follow. With no
   per-field signal at all, the closest precedent in this registry is
   `co/registraduria/duplicado-cedula-ciudadania`, which likewise applied
   `required: true` based on a source's own imperative/eligibility text
   rather than a per-field marker, explicitly disclosing this as a genuine
   source limitation rather than a confirmed per-field JCE determination.
   The same approach is used here: identity fields for both the requester
   and the beneficiary, the requester's relationship to the beneficiary
   (establishing standing to file), and the beneficiary's core locating
   address fields (street, sector, municipio, provincia) are modeled
   required as the minimum data genuinely necessary for JCE to process the
   request and dispatch a mobile team; phone numbers, the house/apartment
   number, and the three qualifying-reason checkboxes are modeled optional.
2. **`documents[0]` (`conditionEvidence`) is modeled `required: true`** based
   on the two independently-fetched secondary sources (jce.gob.do/Cedulacion-
   Movil, elcaribe.com.do), each describing a medical certificate or a
   photograph evidencing the condition as a submitted requirement, even
   though the form's own `Certificado médico`/`Fotos` checkboxes carry no
   asterisk. This is disclosed as reasoning from outside the primary PDF
   source, not glossed over as if the form itself marked it required.
3. **The representative's own identity-document copy — described in both
   secondary sources ("copia de la cédula del representante") as a
   submission requirement — is deliberately NOT modeled as a separate
   `documents[]` entry.** The form's own printed content has no checkbox or
   checklist item corresponding to it (only the `requesterCedula` *number*
   field, which is modeled); adding a document requirement not evidenced on
   the primary AcroForm source itself would go beyond what this schema's
   primary-source-fidelity convention supports. Disclosed here as a
   deliberately excluded scope item, not silently dropped.
4. **`reasonIllness`/`reasonElderly`/`reasonDisability` are modeled as three
   independent optional booleans, not a single `enum`** — the underlying
   PDF widgets are ordinary (non-radio) checkboxes, so the source itself
   permits multiple simultaneous selections (e.g. an elderly applicant who
   is also ill). No cross-field "at least one" rule is fabricated; the
   expectation that at least one reason applies is disclosed in prose
   instead (see `reasonIllness`'s field-level `description`), consistent
   with this registry's standing practice of disclosing unenforceable
   conditions rather than encoding a fragile approximation of them (see the
   `notEquals`-empty-string precedent this registry has hit before).
5. **`disabilityTypeDetail` is gated `requiredWhen reasonDisability equals
   true`** — the large ruled box sits directly beneath the "Persona con
   discapacidad - Tipo de discapacidad:" checkbox/label with no other
   plausible referent, and only that one reason category prints a qualifier
   inviting further detail.
6. **`beneficiaryCedula` is modeled `required: true`** even though a
   first-time enrollment applicant (per the excluded "Nueva inscripción"
   internal checkbox) would not yet have a cédula number to enter. The
   source form provides no distinct "N/A"/first-time affordance in this box,
   so this is disclosed as a known edge case rather than modeled with a
   fabricated conditional.
7. **No format `pattern` is asserted for `requesterCedula`/`beneficiaryCedula`**
   — the source boxes carry no printed format mask, consistent with the same
   judgment call already made for `do/mirex/passport-application`'s
   `identityDocumentNumber` and `do/dgii/vehicle-transfer-sworn-declaration-
   fi-vhm-308`'s `sellerCedulaRnc`.
8. **Excluded from this version, disclosed rather than silently omitted:**
   - The entire `PARA USO INTERNO PERSONAL DE CEDULACIÓN` block (11
     non-signature widgets: service-type classification checkboxes, the
     `Otro`/free-text override, and `Observaciones`) — explicitly
     header-labeled and rule-delimited as office-internal processing data,
     per the note above.
   - `Firma del Solicitante` and `Recibido por` — wet-ink signature lines
     (the requester's own signature and the receiving staff member's
     signature/name), excluded consistent with this registry's established
     treatment of physical signature capture elsewhere (`do/mirex/passport-
     application`, `il/mot/medical-examination-driving-license-renewal`).
   - The representative's identity-document copy (see judgment call 3
     above).

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/do/jce/cedulacion-movil-especial/1.0.0/`: 2 valid scenarios plus
6 mutation-control fixtures, each derived from one of the valid fixtures by a
single targeted mutation. All 8 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived directly from this schema's own
`fields[]`/`documents[]`, not committed to the repo) before being finalized:

- `valid-illness-medical-certificate.json` (requester filing for an ill
  beneficiary, medical certificate provided) — **0 errors**.
- `valid-disability-with-detail-and-photo.json` (disability reason checked
  with a `disabilityTypeDetail` description, photo evidence provided, an
  optional house number and both phone numbers present) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops
  `beneficiaryGivenNames`) — **exactly 1 error**.
- `mutation-control-missing-relationship.json` (drops
  `requesterRelationshipToBeneficiary`) — **exactly 1 error**.
- `mutation-control-missing-beneficiary-address.json` (drops
  `beneficiaryAddressMunicipio`) — **exactly 1 error**.
- `mutation-control-missing-conditional-disability-detail.json` (keeps
  `reasonDisability: true` but drops `disabilityTypeDetail`, testing the
  `requiredWhen` gate) — **exactly 1 error**.
- `mutation-control-missing-condition-evidence.json` (sets
  `documents.conditionEvidence` to `false`, testing the required
  `documents[]` entry) — **exactly 1 error**.
- `mutation-control-cedula-too-long.json` (sets `beneficiaryCedula` to a
  25-character string, exceeding `maxLength: 20`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/do/jce/cedulacion-movil-especial/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/do/jce/cedulacion-movil-especial/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **485/485** documents (plus 3 `mapping.json` companions unaffected);
  `node tools/validate-ajv.mjs` → **485/485** documents (plus 3 `mapping.json`
  companions).
- `node tools/verify-sources.mjs registry/do/jce/cedulacion-movil-especial/1.0.0` —
  1 directory, **5 URLs checked** (the primary form URL, the JCE authority
  URL, and the secondary sources cited in `verification.notes`), **0
  warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source form's own printed applicant-data
sections (Datos del Solicitante, Datos del Ciudadano que recibirá el
servicio, Motivos Cedulación Móvil, Documentos aportados) are fully
transcribed from the genuine, currently-served AcroForm, cross-checked
between annotation extraction, text-position extraction, and an independent
high-resolution visual render. Requiredness relies partly on published
secondary sources rather than the form's own (entirely absent) marking
convention — disclosed above as a genuine limitation. No live filing through
the JCE's Dirección Nacional de Cedulación was attempted and no independent
second reviewer has yet passed over this field list. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Dominican Republic or the Junta Central
Electoral.
