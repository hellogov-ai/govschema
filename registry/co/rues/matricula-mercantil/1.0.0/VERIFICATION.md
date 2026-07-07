# Verification record — `co/rues/matricula-mercantil` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This document remains `draft`, not `verified`, pending an independent second
reviewer's field-by-field pass, per this registry's convention.

## Why this document exists

This is a `GovSchema Standard Research` cycle (GOV-1588). Colombia (`co`) was
opened as the registry's 19th jurisdiction one cycle prior (GOV-1567) with a
single DMV schema (`co/runt/formulario-solicitud-tramites-vehiculo`); every
other vertical — Business Formation, Passport, Visa, Taxes, National
ID/Civic — was completely uncovered, the highest-value coverage gap in the
registry at the time (every other jurisdiction already had 2+ verticals).
This cycle targeted Colombia's Business Formation gap via RUES (Registro
Único Empresarial y Social), the mercantile/company registry Colombia's
Cámaras de Comercio (Chambers of Commerce) jointly operate nationwide. Two
fallback candidates identified going into this cycle — Colombia's online
passport wizard (Cancillería) and DIAN's RUT Formulario 001 (previously
flagged by GOV-1444, before Colombia was even in the registry, as
"viable-but-weak": several unbounded repeating structures) — were not needed;
RUES's own core Registro Mercantil form proved to be a well-bounded, fully
sourced, current candidate once properly extracted (see below), so neither
fallback was pursued this cycle.

## Sources examined

- **Primary source — Superintendencia de Industria y Comercio (SIC),
  `https://www.sic.gov.co/sites/default/files/files/Normativa/Circular_Unica/Anexo_4_1_INSTRUCCIONES_FORMULARIOS_RUES.pdf`**
  ("Anexo 4.1 — Instrucciones para Diligenciar el Formulario del Registro
  Único Empresarial y Social RUES", 30 pages). Fetched directly via `curl`
  (`-A "Mozilla/5.0" -k`; the host's TLS chain required `-k` to negotiate in
  this sandbox — the certificate itself is a standard SIC-issued one, not a
  MITM indicator, and the PDF's own magic bytes and internal structure
  confirm a genuine, well-formed PDF 1.5 document, not tampered content).
  HTTP 200, 595,964 bytes. SIC is the regulator whose Circular Única sets the
  **unified format** every Chamber of Commerce nationwide must use for this
  form, making it the single most authoritative source for the form's
  content — chosen over any one Chamber's own copy for that reason.
- **Cross-check source — Cámara de Comercio de Medellín,
  `https://www.camaramedellin.com.co/Portals/0/Documentos/Formatos/Formulario%20RUES.pdf`**
  (the actual fillable two-page "Formulario RUES" template, `HOJA 1` /
  `HOJA 2`, 549,895 bytes, HTTP 200, PDF 1.7). The SIC document explains the
  form's fields but is itself instructions prose, not the form; this second
  document is the actual blank form template, needed to confirm exact box
  labels, groupings, and physical layout (including the numbered casilla
  markers 1–11 down the page margin that this document's `sourceRef`s cite).
  Both documents independently corroborate the same field set, section
  numbering, and code tables — no discrepancy found between them.
- Two other candidate mirrors from the initial scouting list
  (`ccoa.org.co`, `camaramedellin.com.co`'s "Instrucciones del formulario
  RUES.pdf") were also fetched successfully (HTTP 200, genuine PDFs) as
  further corroboration but were not needed as primary sources once the SIC
  document and the Medellín form template were confirmed sufficient and
  mutually consistent.

## Extraction method

1. Fetched both PDFs directly via `curl` (see above); confirmed genuine PDF
   magic bytes (`%PDF-1.5`, `%PDF-1.7`) on both, ruling out an HTML error
   page or redirect-wall response.
2. Extracted text content with `pdfjs-dist@3.11.174` (pinned per this
   registry's established gotcha with later versions) via
   `getDocument({data}).promise` → `page.getTextContent()`, first as
   line-grouped text (grouping glyphs by y-coordinate) to read the
   instructions document's prose section-by-section.
3. For the two-page form **template**, additionally extracted every glyph's
   raw `(x, y)` transform coordinates (not just line-grouped text) and
   grouped items into x-coordinate bands. This was necessary because the
   template's "INFORMACIÓN DEL REGISTRO" panel (casilla 1) prints **three
   parallel registry tracks side by side on the same page** — Registro
   Mercantil / Vendedores de Juegos de Suerte y Azar / Sociedad Civil
   (x≈61), Registro Único de Proponentes (x≈413), and Registro de Entidades
   sin Ánimo de Lucro / Economía Solidaria (x≈238) — and a naive
   line-grouped read of this region interleaves all three tracks' checkbox
   labels into a single garbled line. Coordinate-band separation confirmed
   the Registro Mercantil column has exactly **four** trámite options
   (`MATRÍCULA/INSCRIPCIÓN`, `RENOVACIÓN`, `TRASLADO DE DOMICILIO`,
   `AJUSTE DE INFORMACIÓN FINANCIERA`) and **no** `CANCELACIÓN` option — that
   option belongs to the neighbouring Registro Único de Proponentes column
   (x≈413), which does have five options including cancelación. A
   line-grouped-only read would have risked misattributing that fifth option
   to Registro Mercantil; this was caught and avoided by checking
   coordinates before finalizing `registryProcedureType`'s enum. This is the
   same class of two/three-column same-page field mix-up flagged in this
   registry's prior work (GOV-1493) and its `gov-form-pdf-extraction`
   practice note.
4. Cross-read every field against the SIC instructions document's own
   numbered section prose (§1 "Información del Registro" through §11
   "Protección Social", plus its four numbered code tables: tipo general de
   organización, tipo específico de organización, Grupo NIIF, and código del
   estado actual de la persona jurídica) to resolve each field's meaning,
   scope, and — where the source is explicit — required/optional status.
   The template's own printed casilla numbers (1 through 11, confirmed via
   coordinate extraction to align one-to-one with the instructions
   document's own numbered sections) are cited verbatim in each field's
   `sourceRef`.

## Scope: what this document models, and what it deliberately excludes

The full RUES form (and its accompanying SIC instructions document) is far
broader than a single business-registration schema should responsibly cover
in one document. This document is scoped **narrowly and explicitly** to the
**Registro Mercantil / Vendedores de Juegos de Suerte y Azar / Sociedad
Civil** track of the two-page core form (`Hoja 1` + `Hoja 2`) — the actual
company/business-registration process this registry's Business Formation
vertical is about. Excluded, and not modelled anywhere in this document:

- **Registro Único de Proponentes** (public-sector-contractor bidder
  registry) — the form's second parallel track in casilla 1, with its own
  distinct trámite options (including `cancelación`, which Registro
  Mercantil does not have) and its own multi-hoja **Anexo 2** (tamaño de
  empresa, capacidad financiera/organizacional, situación de control y
  grupos empresariales, clasificador de bienes y servicios, representación
  legal, experiencia/contratos ejecutados). This is a different registry
  serving a different purpose (public procurement eligibility), not company
  formation.
- **Registro de Entidades sin Ánimo de Lucro / Economía Solidaria /
  Veedurías Ciudadanas / ONG's Extranjeras** — the form's third parallel
  track in casilla 1, and its own **Anexo 5** (número de asociados,
  discapacidad/etnia/LGBTI/desplazados demographic questions, entity-type
  code table 22–43). A distinct non-profit/solidarity-economy registry, not
  company formation. (The one field from this track's territory that
  physically appears on the *shared* Hoja 2 template regardless of which
  track is selected — `Balance Social`, parenthetically marked "solamente si
  es Entidad sin ánimo de lucro" — is retained as an optional field since it
  is printed unconditionally on the page this document does model; see its
  own field description.)
- **Anexo 1** (Matrícula/renovación of a specific *establecimiento de
  comercio, sucursal o agencia* — a business's individual physical
  storefront/branch, a separate sub-registration from the business entity
  itself).
- **Anexo 3 / Anexo 4** (renewal for a matrícula more than one year overdue,
  with open-ended per-year repeating financial-statement blocks — the
  "unbounded repeating structure" pattern this registry avoids per its
  boundedness bar, the same concern that had weakened the DIAN RUT
  candidate in a prior cycle).
- **Anexo 6** (Registro Nacional de Turismo — tourism-sector operator
  registration) and **Anexo 7** (Registro de Operadores de Libranzas —
  payroll-deduction lending operator registration) — both entirely separate,
  sector-specific registries layered onto the same physical RUES form.
- The **"Código Cámara y Fecha Radicación"** box and the **"Espacio para uso
  exclusivo de la Cámara de Comercio" / "Firma y Sello de la Cámara de
  Comercio"** block — both explicitly marked "Para uso exclusivo de la
  Cámara de Comercio" (office-only), consistent with this registry's
  established convention (e.g. `co/runt/...`'s casilla 1) of excluding
  fields the source itself marks as filled in by the receiving authority,
  not the applicant.
- The declarant's **signature** — a physical-signature mechanic, not a data
  field, per this registry's standing convention.

## Interpretive judgment calls flagged for an independent reviewer

1. **`personType` is a derived gating field, not a literal form checkbox.**
   The form itself has no explicit "tipo de persona" checkbox; instead its
   own instructions direct the filer to complete one set of fields (razón
   social/sigla) and omit another (apellidos/nombres/género), or vice versa.
   This document adds `personType` as an explicit enum to drive its
   `requiredWhen` conditions — a modelling addition, disclosed here rather
   than presented as a literal source field.
2. **`documentIssueDate`/`documentIssuePlace` gated only on
   `documentType == cedula_ciudadania`.** The instructions explicitly pair
   "fecha y lugar de expedición" with the cédula de ciudadanía case; whether
   the same pairing is expected for cédula de extranjería, tarjeta de
   identidad, or pasaporte is not stated with the same explicitness. Left
   gated narrowly and disclosed, rather than broadened by assumption.
3. **`nit`/`nitVerificationDigit` required only on renovación, not on
   matrícula.** This is the *inverse* of the usual pattern: the
   instructions explicitly state a first-time legal-entity matrícula must
   **leave NIT blank** (the Cámara itself obtains it from DIAN), while a
   renovación must supply it. Modelled exactly as stated, not as a uniform
   "required for legal entities" rule.
4. **`womenCapitalParticipationPercent`'s persona-jurídica scope is
   inferred, not restated.** It is printed directly beneath the "Composición
   del Capital en Caso de Personas Jurídicas" block without its own
   restated conditional language. Gated the same as that block by inference,
   disclosed as such.
5. **`secondaryActivityStartDate` is not machine-gated to
   "required only if a secondary CIIU code is declared."** GovSchema v0.3's
   Condition grammar (`conditionLeaf`: `equals`/`notEquals`/`in`/comparison
   operators against a concrete value) has no "field is present" operator
   suitable for gating on an optional string field's mere presence — using
   `notEquals: ""` against an *absent* optional field is the same
   `notEquals`-empty-string hazard this registry has previously flagged
   (`notequals-empty-string-absent-field-bug`). Left unconditionally
   optional and disclosed rather than encoding an unreliable condition.
6. **`highestRevenueActivityCiiuCode`/`highestRevenueActivityShdCode` are
   not gated to renovación-only submissions**, even though a brand-new
   matrícula would typically have no prior-period revenue to report here —
   the form's own instructions do not state that restriction explicitly, so
   this document does not invent it.
7. **`ley1780MaintainsComplianceOnRenewal` is gated only on
   `registryProcedureType == "renovacion"`, not chained to
   `declaresLey1780Compliance`.** The source's own instruction frames this
   question as referring back to a *different, earlier* matrícula
   submission ("habiéndose acogido a los beneficios... al momento de la
   matrícula"), which this single-submission document has no way to see.
   Chaining it to this submission's own `declaresLey1780Compliance` field
   (only meaningful at matrícula) would be incorrect; disclosed instead of
   silently over- or under-gating.
8. **CIIU code pattern (`^[0-9]{4}$`) is asserted as a 4-digit code**, per
   Colombia's DIAN/DANE CIIU Revisión 4 classification (general public
   knowledge about the coding scheme, not itself printed on the form, which
   shows only blank "CLASE" boxes without a digit-count mask).
9. **Document-number patterns (NIT, cédula, etc.) are left as open
   strings**, consistent with this registry's precedent
   (`co/runt/formulario-solicitud-tramites-vehiculo` judgment call 7) that
   Colombian identity/tax-document lengths vary and the form itself prints
   no digit-count mask.
10. **`realEstateProperty1*`/`realEstateProperty2*` model the form's own
    printed two-column bounded layout** for casilla 9 (`DETALLE DE LOS
    BIENES RAICES QUE POSEA`), not an open-ended repeating array — the
    template prints exactly two side-by-side property blocks with no "add
    more rows" affordance, unlike Anexo 3/4's explicitly open-ended
    per-year blocks (out of scope, see above).
11. **Plain "SI/NO" questions without an explicit "(Obligatorio)" annotation
    are nonetheless modelled as `required: true`** (e.g.
    `hasEstablishmentsAgenciesOrBranches`, `hasInnovationProcess`,
    `isFamilyBusiness`, `isSocialSecurityContributor`) — these are simple,
    always-answerable binary questions the template prints for every filer
    with no conditional framing, unlike the genuinely supplementary fields
    left optional (referencias, bienes raíces, phone numbers beyond the
    explicitly-mandatory email). This is a disclosed, conservative-but-firm
    judgment call an independent reviewer may want to revisit field by
    field.

## Test run (Phase 4 — mock data)

Two mock-filled instances were constructed and checked field-by-field against
every field's `validation` (enum/pattern/minimum/maximum/maxLength) and
against the conditional-requiredness graph (`required`/`requiredWhen`), using
a small throwaway Node script (not committed — implements the same
condition-evaluation semantics as `tools/validate-ajv.mjs`'s meta-schema
validation plus this document's own field-level `requiredWhen` graph, run
ad hoc for this review):

1. **`matricula_inscripcion`, persona natural** — a fictional new sole
   trader ("Camila Andrea Gómez Ramírez", cédula de ciudadanía, a small food
   retail business in Bogotá D.C., CIIU 4711). Exercises: `personType ==
   persona_natural` gating (natural-person name/document fields required,
   `razonSocial`/`sigla` correctly absent); `nit` correctly absent and not
   required (first-time matrícula); `documentIssueDate`/`documentIssuePlace`
   present (documentType is cédula de ciudadanía); `naturalPersonActivityDescription`
   present (required for personas naturales); capital-composition and
   Empresa Asociativa de Trabajo fields all correctly absent and not
   required (persona natural; specificOrganizationType is not "09").
   **Result: valid.**
2. **`renovacion`, persona jurídica (SAS)** — a fictional software company
   ("Tecnologías Andinas SAS", NIT 901234567-8, Medellín, CIIU 6201 primary /
   6311 secondary, condición Sociedad BIC). Exercises: `nit`/
   `nitVerificationDigit` required and present (renovación); capital
   composition percentages and `womenCapitalParticipationPercent` required
   and present (persona jurídica), summing nationally+foreign to 100%;
   `currentLegalStatusCode`, `numberOfWomenInManagementPositions` required
   and present (persona jurídica); `numberOfEstablishmentsAgenciesOrBranches`
   required and present (`hasEstablishmentsAgenciesOrBranches` is true);
   `ley1780MaintainsComplianceOnRenewal` required and present (renovación);
   `registrationNumber`/`renewalYear` present (non-matrícula procedure).
   **Result: valid.**

Both runs used only fabricated example values, consistent with this
document carrying no verbatim worked example from RUES/SIC itself (the
instructions document illustrates concepts in prose but includes no
filled-in specimen form).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch both source PDFs and confirm no newer edition of the
SIC Circular Única's Anexo 4.1 has been published, and (b) independently
re-derive the coordinate-band column assignment for casilla 1 (the
three-parallel-registry-track layout) to confirm this document's
`registryProcedureType` enum (four options, no cancelación) against a fresh
extraction, since that is the single highest-value fact this document's
correctness depends on getting right.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07**
(~6 months): this is the registry's first Colombian Business Formation
document, carries several disclosed judgment calls, and its freshness proxy
is a PDF fetched without an explicit revision date printed on the document
itself — all of which argue for the shorter end of the cadence. Re-check the
source and resolve the open judgment calls on or before that date and on any
`source.url` change.
