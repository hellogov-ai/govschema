# Verification record — `co/runt/formulario-solicitud-tramites-vehiculo` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This document was derived directly from RUNT's own published `.xls` form, not
a live-browser walk of any wizard (RUNT's public-facing services for this
form are a physical/PDF intake process at a transit-authority counter, not a
live online wizard — see "Why this document exists" below). It remains
`draft`, not `verified`, pending an independent second reviewer's
field-by-field pass.

## Why this document exists

This is a `GovSchema Standard Research` cycle (GOV-1567). Phase 1 catalogued
the registry's existing 18 jurisdictions and confirmed DMV, Business
Formation, and Taxes are each already closed to 18/18 (100%); the only open
verticals are Passport (16/18), Visa (14/18, three confirmed dead ends), and
National ID (15/18, remaining gaps legally blocked or in-person/biometric
only — see CATALOG.md). Phase 2 research re-screened those existing-jurisdiction
gaps (findings logged separately in CATALOG.md this same cycle: Indonesia's
Passport and Visa gaps both reversed from a prior cycle's "not viable" finding
to newly-viable backlog candidates) and separately evaluated whether a strong,
well-sourced candidate existed to open a **19th jurisdiction**, per this
registry's charter that GovSchema's scope is global/multi-jurisdictional from
the start (`AGENTS.md`). Colombia's DIAN RUT (Formulario 001, Business
Formation) had been flagged by a prior cycle (GOV-1444) as a viable-but-weak
backlog candidate — current here still fails this registry's boundedness bar
(three of its six sub-sections are explicitly unbounded repeating groups,
"puede agregar tantas páginas como necesite"). This cycle instead found RUNT's
own **"Formulario de Solicitud de Trámites del Registro Nacional Automotor"**
(DMV vertical) to be a materially stronger candidate: a static, two-page,
fully-bounded form (zero unbounded repeating sections) with minimal external
code-table dependence, hosted directly and unauthenticated on `runt.gov.co`.
This document opens Colombia as the registry's 19th jurisdiction via its DMV
vertical.

## Source examined

- **Document `(id, version)`:** `co/runt/formulario-solicitud-tramites-vehiculo` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Registro Único Nacional de Tránsito (RUNT), operated under
  Colombia's Ministerio de Transporte; the paper form is filed at any of
  Colombia's decentralised local transit authorities (organismos de
  tránsito), each of which feeds the single national RUNT registry.
- **Primary source:**
  `https://www.runt.gov.co/sites/default/files/documentos/ftrunt_0.xls` —
  fetched directly (`curl`, User-Agent `Mozilla/5.0`). HTTP 200,
  `Content-Type: application/vnd.ms-excel`, `Content-Length: 668160`,
  `Last-Modified: Tue, 25 Apr 2023 16:26:35 GMT`. Re-fetched a second time
  from a fresh connection and confirmed byte-for-byte identical
  (SHA-256 `3b1a222f6fef53bdf424a12cc2a0a5f451d453a7fe52da93c9e7b64acb958f05`),
  ruling out a per-request dynamically-generated file. No login, CAPTCHA, or
  WAF gate on this URL. `runt.gov.co`'s own site does not serve a text-layer
  PDF of this exact form directly, but the identical form is independently
  mirrored — as PDFs matching this same layout — on multiple official
  municipal transit-authority (`.gov.co`) sites (e.g. `transitoitagui.gov.co`,
  `movilidadpereira.gov.co`, `cundinamarca.gov.co`), corroborating this is the
  single, current, nationally-standard RNA form, not a superseded or
  locally-modified variant.
- **Retrieved / reviewed:** 2026-07-07
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the `.xls` file directly from `runt.gov.co` (see above).
2. Parsed it with the `xlsx` (SheetJS) npm package — the file is a genuine
   Excel Binary File Format (`.xls`, OLE2 compound document; confirmed by its
   `D0 CF 11 E0 A1 B1 1A E1` magic bytes), not a renamed CSV/HTML file. It
   contains three sheets (`Hoja1`, `Hoja2`, `Hoja3`); `Hoja1` (294 rows) is
   the two-page form layout itself with every label as a cell value, exactly
   as it would print; `Hoja2` and `Hoja3` are empty/unused print-layout
   artifacts and are not sourced from.
3. Converted `Hoja1` to CSV and read it cell-by-cell against the visual grid
   it represents, cross-referencing every field against the form's own
   23-item numbered `INSTRUCCIONES` (Instructions) key printed on the same
   sheet (rows 79–112), which the form itself directs the filer to ("NOTA:
   VER INSTRUCCIONES AL RESPALDO" — see instructions on the back). Every
   field's label, grouping, and — where the instruction text is explicit —
   its scope/required nuance in this document is read from this combination
   of the printed box label and its own paired instruction, not inferred
   from general DMV-form conventions.

## What was confirmed directly (verbatim, from the form's own cells)

- The form's own title and issuing authority: "MINISTERIO DE TRANSPORTE ...
  FORMULARIO DE SOLICITUD DE TRAMITES DEL REGISTRO NACIONAL AUTOMOTOR".
- All 18 `tramiteType` options and their exact printed order/numbering
  (casilla 3): Matrícula/Registro, Traspaso, Traslado Matrícula/Registro,
  Radicado Matrícula/Registro, Cambio de Color, Cambio de Servicio, Regrabar
  Motor, Regrabar Chasis, Transformación, Duplicado Licencia Tránsito,
  Inscripc. Prenda, Levanta. Prenda, Cancelación Matrícula/Registro, Cambio
  de Placas, Duplicado de Placas, Rematrícula, Cambio de Carrocería, Otros.
- All 14 `vehicleClass` options (casilla 4), all 8 `fuelType` options
  (casilla 7, individually numbered 1–8), all 6 `serviceType` options
  (casilla 18), all 5 `alertType` options (casilla 20), and the 8
  document-type codes shared by casillas 21/22 (`C`=C.C, `N`=NIT,
  `X`=N.N., `P`=Pasaporte, `E`=C.Extranj., `T`=T.Identi., `U`=NUIP,
  `D`=C.Diplomático).
- Instruction §1's own explicit statement that casilla 1 ("1. ORGANISMO DE
  TRÁNSITO") is office-only: "NO ESCRIBA EN ESTE ESPACIO DEBE SER
  DILIGENCIADO POR EL ORGANISMO DE TRANSITO" (do not write in this space, it
  must be filled in by the transit authority) — this is why
  `transitAuthorityName`/`City`/`Code` are **not** modelled as applicant
  fields at all (see "What is out of scope" below), unlike every other
  casilla on the form.
- Instruction §18's explicit "en ambos casos" (in both cases) framing for the
  import/auction document city, and its explicit statement that the
  customs/aduana "Código" box is filled in by the transit office, not the
  applicant ("SERA SUMINISTRADO POR LA OFICINA DE TRANSITO
  CORRESPONDIENTE").
- Instruction §22's explicit "persona indeterminada" (undetermined person)
  provision for a traspaso whose buyer is not a specific identified person.
- Instruction §23's explicit framing that `generalNotes` is used, among other
  things, to write out and clarify the word "OTRO" wherever it was checked
  elsewhere on the form, and to describe a `transformacion` modification.
- The two "IMPRONTAS" (rubbing-impression) boxes near casillas 12–13/16
  (`IMPRONTAS DEL MOTOR O SERIE`, `IMPRONTAS CHASIS O SERIAL`) — physical
  ink/pencil-rubbing impression areas for the transit office to take a
  physical imprint of the vehicle's stamped numbers, confirmed by their
  large blank-grid layout and total absence of any instruction referencing
  them as an applicant input; excluded as a physical mechanic, not a data
  field, the same category of exclusion this registry already applies to
  login/CAPTCHA steps on other documents.
- The owner's and buyer's signature lines ("FIRMA DEL PROPIETARIO", "FIRMA
  DEL COMPRADOR") — a physical-signature mechanic, not a data field.

## Interpretive judgment calls flagged for an independent reviewer

1. **The import/auction documentation sub-table (casilla 17) is read from a
   visibly merged/garbled cell region.** The raw spreadsheet cells for this
   sub-table concatenate a label with a bare digit across a line break inside
   a single cell (e.g. a cell reading `"MANIF. O ACTA\n1"`), consistent with
   the original spreadsheet's merged-cell layout not surviving CSV
   flattening cleanly. This document's reading — `importDocumentType` as a
   two-value choice between "manifiesto o acta" and "declaración de
   importación", plus `auctionEntity` and the shared `importOrAuctionCity` —
   is a best-effort reconstruction cross-checked against instruction §18's
   own prose ("SI EL VEHICULO ES IMPORTADO INDIQUE CON UNA EQUIS (X) EL
   DOCUMENTO RESPECTIVO, SI ES DE REMATE INDIQUE LA ENTIDAD, EN AMBOS CASOS
   LA CIUDAD..."), which does independently confirm the three-part shape
   (document-type-if-imported / entity-if-auctioned / city-in-both-cases).
   A reviewer with access to the original spreadsheet's merged-cell metadata
   (rather than this document's CSV-flattened reading) or a genuine filled
   specimen should confirm the exact `importDocumentType` option labels.
2. **`ownerDocumentIssueDate`'s meaning is not fully confirmed.** A
   `DIA/MES/AÑO` triplet appears in the row immediately below "No.
   DOCUMENTO" inside casilla 21's cell region, but nothing on the form labels
   what date this represents (a document issue date is a plausible reading,
   consistent with similar Colombian ID-collection forms, but this form does
   not state it explicitly the way it does for `Fecha de trámite` at the very
   top of the form). Modelled as optional (`required: false`) rather than
   omitted, with this ambiguity disclosed rather than asserted with
   confidence.
3. **`bodyworkCode`/`bodyworkType` and `importOrAuctionCity`'s office-code
   sibling are left as open strings, not closed enums**, because RUNT's own
   bodywork-code and city/organismo-de-tránsito code tables are external to
   this form and are not reproduced anywhere on it — consistent with this
   registry's established precedent for external-code-table dependence (e.g.
   `mx/semovi/alta-vehiculo-foraneo`'s `previousPlateState`).
4. **`affiliatedCompanyName`/`affiliatedCompanyNit` are not gated by
   `serviceType`.** Domain knowledge suggests an "empresa vinculadora" is
   typically only relevant for a public-service vehicle, but the form's own
   instruction (§20) states no such conditional ("ESPECIFIQUE EL NOMBRE DE LA
   EMPRESA VINCULADORA Y SU CORRESPONDIENTE NIT", with no "cuando aplique" or
   service-type qualifier), so no `requiredWhen`/`visibleWhen` gate is
   asserted here without direct textual support.
5. **`plateLetters`/`plateNumbers` patterns (3 letters / 2–3 digits) follow
   Colombia's well-known standard civilian plate format** (this is general
   public knowledge about Colombian vehicle plates, not something stated on
   the form itself, which shows only blank boxes); left `required: false`
   since a brand-new `matricula_registro` vehicle has no plate yet.
6. **VIN pattern validation uses the standard 17-character ISO 3779 VIN
   shape** (excluding I/O/Q), a generic international standard, since the
   form does not publish its own VIN format rule.
7. **Document-number patterns for Colombian cédula/NIT/etc. are not
   asserted** (modelled as open strings) since the form's own boxes carry no
   printed format mask and Colombian identity-document number lengths vary
   by document type; asserting a specific digit-count pattern here would be
   this document's own invention, not a source-derived fact.

## What is out of scope for v1.0.0

- **Casilla 1 ("Organismo de Tránsito" — name/city/code)** — explicitly
  office-only per the form's own Instruction §1; not an applicant field.
- **The customs/aduana "Código" box inside casilla 17** — explicitly
  office-only per Instruction §18.
- **The two "IMPRONTAS" physical rubbing-impression boxes** — a physical
  mechanic, not a data field (see above).
- **The owner's and buyer's signature lines** — a physical-signature
  mechanic, not a data field.
- **The third-party aditamentos/pickup or any downstream RUNT processing,
  payment, or appointment-scheduling step** — this form is itself the
  complete, single-page intake artifact; RUNT's own subsequent internal
  processing of a submitted form is out of scope, consistent with this
  registry's standing convention of modelling the applicant-facing
  data-entry artifact, not government-side back-office processing.
- **The full "persona indeterminada" (undetermined buyer) designation** — the
  form's own instruction confirms this exists as a way of completing the
  buyer section for a traspaso with no identified buyer, but does not
  describe it as a distinct enumerable field value (see judgment call under
  `buyerDocumentType`'s own description); this document does not add a
  fabricated enum value for it.

## Test run (Phase 4 — mock data)

Two mock-filled instances were constructed and checked field-by-field against
every field's `validation` (pattern/enum/minimum/maximum) and against the
conditional-requiredness graph (`required`/`requiredWhen`), using a small
throwaway Node script (not committed — equivalent logic to
`tools/validate-ajv.mjs`'s per-field checks, run ad hoc for this review):

1. **`matricula_registro` (first-time registration)** — a fictional new
   private automobile (Chevrolet Spark GT, 2026, gasoline, white/grey,
   1200cc, 85hp, sedan bodywork, plausible-format engine/chassis/serial/VIN
   all matching, particular service) filed by owner "Juan Carlos Gómez
   Pérez" (cédula de ciudadanía). All populated fields passed their
   `validation`; every field with `required: true` (unconditional) was
   present; no `requiredWhen` condition evaluated true for a missing field
   (`tramiteType` ≠ `traspaso`, `isArmored`/`isArmorRemoved` absent/false,
   `importOrAuctionType` absent, `alertType` absent). Result: **valid**.
2. **`traspaso` (ownership transfer)** — a fictional used Renault Logan
   (2019, plates `ABC123`) being transferred from owner "Ana María Ramírez"
   to buyer "Luis Fernando Torres" (both cédula de ciudadanía). This exercises
   the `requiredWhen tramiteType == "traspaso"` gate on
   `buyerDocumentType`/`buyerDocumentNumber`/`buyerFirstSurname`/
   `buyerGivenNames`, each supplied and passing validation; unconditional
   required fields were all present. Result: **valid**.

Both runs used only fabricated example values, consistent with this document
carrying no verbatim worked example from RUNT itself (this static form
carries no filled-in specimen, unlike a screenshot-driven user-guide source).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch `ftrunt_0.xls` and confirm no newer edition has been
published (only a `Last-Modified` HTTP header, 2023-04-25, is available as a
freshness proxy — the form carries no visible revision date of its own), (b)
resolve judgment call 1 (the import/auction sub-table) against either the
original spreadsheet's own merged-cell structure (opened in a real
spreadsheet application rather than CSV-flattened) or a genuine filled
specimen, and (c) confirm `ownerDocumentIssueDate`'s meaning (judgment call
2) against RUNT's own procedural regulations or a filled specimen.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07** (~6
months): this is the registry's first Colombian document, carries two
materially uncertain fields (judgment calls 1–2), and its freshness proxy is
an HTTP `Last-Modified` header rather than a dated, versioned manual — all of
which argue for the shorter end of the cadence. Re-check the source and
resolve the open judgment calls on or before that date and on any
`source.url` change.
