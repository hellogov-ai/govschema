# Verification record — `mx/sre/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from **direct text-layer extraction of Form OP-5**,
the Secretaría de Relaciones Exteriores' (SRE) own "Solicitud de pasaporte
ordinario mexicano en las Oficinas Consulares," fetched from two independent
official mirrors. It remains `draft`, not `verified`, pending an independent
second reviewer's field-by-field pass and a future mock-data test run against
a rendering of the real form (e.g. a filled specimen) rather than this
document's own dry run (see "Mock test run" below).

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1504](../../../../GOV-1504)). Prior cycles (GOV-1414, GOV-1428,
GOV-1435; see `CATALOG.md`) opened Mexico and modelled four of its six
verticals (Business Formation, Visa, Taxes, DMV), each time noting Mexico's
Passport vertical as "open-but-weak" because "SRE passport (in-person
appointment only)" was screened as a weak candidate — the same posture the
Philippines' passport gap was in before GOV-1497 picked it back up (see
`gov1497-ph-dfa-passport-application-scarce-appointment-ethics` memory). This
cycle re-examined that assumption instead of treating it as settled: every
Mexican passport in this registry's other jurisdictions (`ph/dfa`, `kr/mofa`,
`br/pf`, `us/dos/passport-application-ds11`) is likewise ultimately an
in-person biometric process, and in-person collection has never on its own
disqualified a candidate here — what disqualified prior Mexican attempts was
not having found a genuine, directly downloadable, unauthenticated *form*
documenting the applicant-data fields. This cycle found one: Form OP-5.

## Source examined

- **Document `(id, version)`:** `mx/sre/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Secretaría de Relaciones Exteriores (SRE), United Mexican
  States
- **Primary source URL:** <https://www.gob.mx/cms/uploads/attachment/file/220463/OP-5_Consulares.pdf>
- **Corroborating mirror:** <https://sre.gob.mx/images/stories/imgpasaportes/op5.pdf>
  (a 2-page variant of the same form, base template dated "Mayo-2008," which
  additionally states the form's régimen jurídico and confirms it covers four
  named trámites: adult first-time/renewal (A, C) and minor/incapacitated
  first-time/renewal (B, D))
- **Located via:** web search for the official SRE passport application form
  (`"Solicitud de pasaporte ordinario mexicano (OP-5)"`), landing on both the
  gob.mx CMS mirror and the legacy sre.gob.mx path, plus a third-party
  municipal-government mirror (`atlacomulco.gob.mx`) hosting the same file
  under a 2025-dated "Catálogo de Formatos" listing, corroborating the form is
  still current and in active circulation.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access and extraction method

Both `gob.mx` and `sre.gob.mx` URLs returned HTTP 200 directly, no login gate,
no CAPTCHA, no WAF block. Both PDFs carry a genuine text layer (not a scanned
image) — confirmed by extracting each page's text content via `pdfjs-dist`
directly (no OCR/vision step needed). The single-page `gob.mx` variant was
used as the primary source since it lays out the complete field set (fields
1-25) on one page; the 2-page `sre.gob.mx` variant was used to corroborate the
form's régimen jurídico, free-of-charge status, and the four-trámite scope
statement quoted above.

The **"Filiación" (physical-description) section (field 24)** is a dense
five-column checkbox grid (Tez / Complexión / Color de cabello / Tamaño de
cabello + Tipo de cabello / Color de ojos) that a naive linear text-extraction
pass would misattribute, since PDF text-extraction order does not always
follow visual column order. To recover the correct grouping, every text
item's exact glyph `x`/`y` coordinates were extracted (via each item's
`transform` matrix) and sorted, confirming:

- **Tez** (x≈53-60): Amarilla, Blanca, Morena clara, Morena obscura, Negra,
  Rosada, Otra — 7 options.
- **Complexión** (x≈109-122, y 478-451): Delgada, Media, Robusta — only 3
  options; no "Otro" renders at this column's x-position at any y (confirmed
  by scanning the full item list for any "Otro"/"otra" token at x≈109-122;
  none found below y=451).
- **Color de cabello** (x≈175-193): Negro, Castaño obscuro, Castaño claro,
  Entrecano, Cano, Rubio, Otro — 7 options.
- **Tamaño de cabello** (x≈245-264, y 478-442.8): Corto, Mediano, Largo, Otro
  — 4 options — and, in the **same x-column but a distinct, separately
  headed field placed directly below it** (header "Tipo de cabello" at
  y=421.8, i.e. below Tamaño de cabello's own last option row at y=442.8):
  **Tipo de cabello**: Calvo/rapado, Ondulado, Lacio, Rizado — 4 options.
  These are modelled as two separate schema fields (`hairLength`, `hairType`)
  because the source's own two headers ("Tamaño de cabello" and "Tipo de
  cabello") are distinct, not because of an assumption.
- **Color de ojos** (x≈327-335): Azules, Café claro, Café obscuro, Grises,
  Negros, Verdes, Otro — 7 options.
- **Estatura** ("Metros: ____") and **Peso** ("Kilos: ____") are free
  write-in values, not checkbox enums, each placed in its own labelled
  sub-box within the Filiación section.

**Fields 1 (Lugar/Oficina Consular) and the top-of-form "Fecha" (form
completion date)** were confirmed present via the same coordinate extraction
but are deliberately not modelled as `fields[]` (see "What was deliberately
NOT modelled" below).

**The bottom "Nacionalidad"/"Identificación" checkbox blocks (bearing field
9's "Identificación que presenta" label) and the "Campos de control"
processing checklist** were confirmed, via the same coordinate data, to sit
inside two boxes each headed "Uso exclusivo SRE" (for SRE internal use only)
— i.e. these are ticked by consular staff recording which document the
applicant physically presented and which internal processing steps
(Recepción/Revisión/Digitalización/Entrega/etc.) have been completed, not
boxes the applicant fills in on their own copy. The two identification-proof
checkbox lists are nonetheless modelled as `documents[]` entries (the
applicant must still bring one of each listed document type), while the
"Campos de control" checklist is excluded entirely as pure office-internal
workflow tracking (see "What was deliberately NOT modelled").

## What was confirmed directly (verbatim, from the source text layer)

- **All 25 numbered field labels** (1 through 25), in their literal Spanish
  wording, each independently cited in `fields[]`/`documents[]` `sourceRef`
  values.
- **The Filiación grid's exact 5-column, 7-field structure** and every
  option's exact spelling, as detailed above.
- **Three explicit textual qualifiers** used to set `required`/`requiredWhen`:
  field 13's "(sólo para renovación)" (previousPassportNumber requiredWhen
  applicationType=canje), field 23's "(dato opcional)" (email optional), and
  field 2's own instructional page 2 text "en caso de contar con la misma"
  (CURP conditional, modelled optional).
- **The three-way trámite categorization** (Primera vez / Canje /
  Reposición) and three-way vigencia categorization (1 año / 3 años / 6 años),
  both under the shared "Tipo de pasaporte" heading.
- **The two-option civilStatus checkbox set** (Soltero(a)/Casado(a)) — a
  full-page keyword scan for "Viudo", "Divorci", "Unión libre" across every
  page of both PDF mirrors found no match, confirming (rather than merely
  assuming) that no wider option set is present in this form's text layer.
- **The data-disclosure consent clause's exact legal citation** (Ley Federal
  de Transparencia y Acceso a la Información Pública Gubernamental, arts.
  18-19) and the sworn-declaration attestation's exact statement text
  (Código Penal Federal, art. 247 fracción I), both quoted verbatim in
  `documents[]`/`fields[]`.

## What was inferred (not independently confirmed) and why

1. **`curp` required/optional status.** The form's own page-2 instructions
   frame CURP as conditional ("en caso de contar con la misma"); modelled as
   `required: false`. A third-party summary of the *separate* citas.sre.gob.mx
   online-booking account-registration flow states that flow requires an
   "active CURP" up front — that is a different system's account-creation
   gate, not independently confirmed against this form itself, so it was not
   used to override this document's own required marker. A reviewer with
   access to that booking flow should confirm whether a citizen who has no
   CURP has any account-registration path at all, and if so, correct this
   field.
2. **`stateOfBirth`/`municipalityOfBirth`/`localityOfBirth` required
   status.** Modelled as optional because the form does not visibly gate
   these on `countryOfBirth`, and this registry's `Condition` grammar
   (GSP-0013) can only compare against a fixed value, not express "only
   applicable when country is Mexico" against a free-text country field
   without hard-coding a literal country string this document did not
   observe being required to match exactly (e.g. "México" vs "Mexico").
3. **`heightMeters`/`weightKilos` bounds.** No minimum/maximum is published
   on the form; none is asserted in `validation`, consistent with this
   registry's practice of not inventing unsourced bounds.
4. **`build` (Complexión) having only 3 options, no "Otro."** Directly
   observed (see extraction method above) but flagged here since every other
   Filiación column has an "Otro"/"Otra" catch-all and this one's absence is
   slightly surprising; a reviewer with a physical/rendered copy of the form
   should double check this is not a text-extraction artifact (e.g. an
   "Otro" option rendered as a checkbox glyph with no adjacent text label
   that pdfjs-dist's text-content API would not surface).
5. **`documents[]` `acceptedTypes` slugs** (e.g. `mcas`, `ife`,
   `credencial_del_inapam`) are this document's own snake_case slugging of
   the source's literal option labels, consistent with this registry's
   existing MX convention (`mx/semovi/alta-vehiculo-foraneo`'s
   `ownerPersonType`/`vehicleOrigin` enums use the same slugging style for
   Spanish-language source options).
6. **No repeating/array field type (GSP-0009).** Not applicable — no
   repeating structure was found in the field inventory.

## What was deliberately NOT modelled (and why)

1. **Field 1 (Lugar / Oficina Consular) and the form's own completion
   date.** These identify which specific consular office is processing the
   request and when the paper was filled in — office/session logistics, not
   passport-application data, consistent with how this registry excludes
   office/branch/date-of-visit selection elsewhere (`ph/dfa/passport-
   application`'s Site Location/Date and Time steps; `kr/mofa/passport-
   application-first-adult`'s office selection).
2. **"Campos de control" / internal processing checklist** (Recepción,
   Revisión, Digitalización, Entrega, Captura, Biométricos, Impresión,
   Ensamble) and the "Autorizó" sign-off line. Confirmed via coordinate data
   to sit inside "Uso exclusivo SRE" boxes — SRE's own internal
   request-tracking workflow, not applicant-submitted data.
3. **Wet-ink signature and fingerprint capture** ("Firma del solicitante,"
   "Índice izquierdo," "Índice derecho"). Physical biometric/signature
   actions performed in the consular officer's presence, not form-field data
   — the same exclusion this registry applies to every other in-person
   biometric passport/ID process (e.g. `ae/icp/emirates-id-replacement`'s
   fingerprint capture, `ph/dfa/passport-application`'s photo capture at the
   appointment).
4. **Minor / legally-incapacitated applicant path (trámites B and D).** The
   `sre.gob.mx` mirror's page 2 confirms Form OP-5 also covers "Menores de
   edad o incapacitados" and "Canje de pasaporte ordinario a menores de edad
   o incapacitados," which require an additional parent/guardian/legal-
   representative consent and identification block not modelled here. This
   document is scoped to an adult (18+) applicant, consistent with every
   other first-time/renewal passport schema in this registry drawing the
   same adult/minor boundary.
5. **The separate citas.sre.gob.mx online-appointment-booking flow's own
   account-registration and slot-selection data** (site, date, time,
   session/CSRF tokens). That is a different system from Form OP-5 itself;
   modelling it would require its own source-review pass against that live
   system, which this cycle did not perform (see "Path to a `verified`
   claim" below).
6. **The "Hoja de Datos Complementarios" supplementary sheet** encountered
   during this cycle's research (a 2025-dated form hosted by a municipal
   mirror, alongside the same "Solicitud de pasaporte.pdf" filename)
   appears to use a *more granular*, differently-worded trámite
   categorization (Vigente / Mutilado o deteriorado / Vencido / Modificación
   de datos / Sin hojas útiles / Por extravío / Por robo) than Form OP-5's
   three-way Primera vez/Canje/Reposición. Rather than merge two
   differently-categorized sources into one hybrid schema, this document
   models Form OP-5 alone, coherently. Reconciling whether that supplementary
   sheet reflects a newer official categorization that should supersede
   Form OP-5's own trámite field in a future version is left as an open
   question for the next reviewer.

## Path to a `verified` claim (next step)

1. Independently re-confirm every field label and option set against the
   source PDF's text layer (or, ideally, a physically filled specimen).
2. Resolve the CURP required/optional question (item 1 above) by examining
   the citas.sre.gob.mx account-registration flow directly.
3. Confirm whether `build` (Complexión) genuinely has no "Otro" option (item
   4 above).
4. Determine whether the "Hoja de Datos Complementarios" sheet (item 6 above)
   reflects a newer official trámite categorization that should be
   incorporated in a future MINOR/MAJOR version.
5. Confirm SRE has not since revised Form OP-5's field numbering or layout.

## Mock test run (phase 4)

A throwaway Node script (not committed) built a mock application — an adult
Mexican national born in Guadalajara, Jalisco, applying for a **first-time**
(`primera_vez`) 6-year passport, single, residing in Los Angeles, California
— and checked every populated field against its `type`/`validation` constraint
and every `requiredWhen`-gated field's effective requiredness given the
mock's own answers (`applicationType: primera_vez` correctly left
`previousPassportNumber` not required; `civilStatus: soltero` correctly left
`spouseName` not required). A second mock — a divorced-in-practice applicant
renewing (`canje`) a passport, forced to pick `civilStatus: soltero` since no
other option exists in the source's own checkbox set — confirmed
`previousPassportNumber` becomes required as expected. Result: **PASS**, 42
fields modelled across 5 flow steps, 4 documents modelled. This is a
data-shape dry run only — it does not constitute execution of the live
system, per the deliberate scope limit above (Form OP-5 is a paper form
completed in person; there is no live web wizard to execute against).

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06**
(~6 months). Re-check the source, and confirm no structural change to Form
OP-5 or its field numbering, on or before that date and on any `source.url`
change.
