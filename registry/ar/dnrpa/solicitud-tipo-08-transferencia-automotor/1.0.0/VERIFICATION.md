# Verification record — `ar/dnrpa/solicitud-tipo-08-transferencia-automotor` v1.0.0

## Candidate selection

This session's brief (GOV-2187, child of the recurring research issue
GOV-2185, itself a continuation of GOV-2167) was to open **Argentina's DMV
vertical (3rd of 6)** using DNRPA's (Registro Nacional de la Propiedad del
Automotor) Solicitud Tipo 08 — the national form used to record a private
motor-vehicle ownership transfer ("Contrato de Transferencia - Inscripción
de Dominio"). The brief named the automóvil variant
(`https://www.dnrpa.gov.ar/nuevodigesto/documentos/st/08A.pdf`) as this
cycle's target, with the sibling motovehículo variant (`08M.pdf`) explicitly
scoped **out** as a future follow-on, not this cycle's target. Neither
candidate had been fetched or extracted before this session; both were
re-derived from scratch.

Argentina's Passport and National ID verticals were re-confirmed dead ends
in the prior cycle (GOV-2169/GOV-2179 lineage): RENAPER is an in-person,
appointment-booked process with no downloadable field-level form. This
document does not re-attempt those.

## Source

- **Primary:** `https://www.dnrpa.gov.ar/nuevodigesto/documentos/st/08A.pdf`
  — fetched fresh this session with a browser User-Agent
  (`curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **1,505,318 bytes**, SHA-256
  `14d48d150f7be7a8ba4ba1aa6e506b5050faee51d2c5ccc752144b1fc5c8b04b`.
  `Last-Modified: Sat, 30 Jul 2022 01:04:36 GMT` per the server's own
  response header. No login, CAPTCHA, or WAF/bot-mitigation challenge was
  encountered — a plain `curl` with a browser `User-Agent` succeeded on the
  first attempt.
- **General completion rules (cited throughout this document's field
  descriptions):**
  `https://www.dnrpa.gov.ar/concursos_publicos/digesto12-04-2017/T1C1S2.htm`
  — DNRPA's Digesto, Título I, Capítulo I, Sección 2ª ("Requisitos a
  Cumplimentar", arts. 1-13), the standing rules for filling in any
  Solicitud Tipo. Fetched fresh this session: **HTTP 200**,
  `content-type: text/html`, 23,747 bytes.
- **Authority homepage:** `https://www.dnrpa.gov.ar` — fetched fresh this
  session: **HTTP 200**, `content-type: text/html`.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-automotor/1.0.0`
re-fetched all 3 cited URLs a second time immediately before finalizing this
record: 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
No entry was added to `tools/verify-sources-allowlist.json` — this domain
needs none.

## Extraction method

This specimen is a **genuinely flat/scanned image PDF**, confirmed
programmatically with `pdfjs-dist` (`legacy/build/pdf.js`, Node ESM) before
any visual work began:

- `doc.getFieldObjects()` → `null` (no AcroForm at all).
- `page.getAnnotations({ intent: 'display' })` → **0 widgets** on both of
  the document's 2 pages.
- `page.getTextContent()` → **0 text items** on both pages (a
  `"TT: undefined function: 32"` warning during parsing is consistent with
  an embedded, non-standard font used only for the pre-printed serial
  number, not a real text layer).

This is a stricter "flat" than this registry's other AR specimens: AFIP's
460/J and 460/F are non-interactive but at least carry *some* PDF structure;
this DNRPA specimen has none. Every field in this document was therefore
catalogued by **rasterizing both pages to PNG at 3x scale** (`pdfjs-dist` +
`node-canvas`, `page.render({ canvasContext, viewport })`) and visually
transcribing every printed box, in reading order, cross-checked against the
form's own left-margin section labels ("INSTRUCCIONES", "DOMICILIOS",
"PERSONAS FISICAS", "ENTES JURIDICOS", "RESERVADO PARA EL REGISTRO") and
right-margin annotations on page 2, which the form itself uses to scope
each row group.

The fetched PDF is labelled, in its own top-left corner, **"08 DUPLICADO
PARA LEGAJO 'A'"** — one ply of DNRPA's multi-ply carbon-form design
(Original + Duplicado, at minimum). Since every ply of a DNRPA Solicitud
Tipo is a carbon copy capturing identical data (confirmed by this specimen
containing the form's full section set, A through O, with no fields
omitted relative to what the printed instructions describe), this is a
structurally complete and representative specimen despite being one
numbered copy rather than "the" original.

### Section-by-section field reconciliation

The form's own printed structure (sections lettered "A" through "O", per
the left/right margin category tags) maps to this document's fields as
follows:

- **"A" (contrato):** 2 fields — `contractPlaceAndDate`, `purchasePrice`.
  Section "A" also carries a second `DOMINIO (N° DE CHAPA O PATENTE)` box,
  used purely as a cross-reference to the vehicle identified in full in
  section "F" — modelled as the single `vehicleLicensePlate` field rather
  than a duplicate, since both boxes capture the identical value (see
  "Scope decisions" below).
- **"D" (comprador/adquirente):** 20 fields (`buyer*`) — ownership
  percentage, name/denomination, email, phone, two composite addresses
  (legal/real), then a `PERSONAS FISICAS`-tagged sub-block (profession,
  document type/number/authority, CUIT-CUIL-CDI, birthplace/birthdate,
  marital status + marriage record number + spouse name) and an `ENTES
  JURIDICOS`-tagged sub-block (legal-capacity grant, registration
  number/date, "CETA").
- **"E" (condómino en la compra):** 20 fields (`coBuyer*`), an exact mirror
  of "D" — DNRPA's own general rules (Digesto art. 3) confirm the first two
  co-owners share one set of Solicitudes Tipo (this document's "D"/"E"
  pair); a third or further co-owner requires an entirely separate,
  identical set of forms, out of scope for this document.
- **"F" (vehículo que se transfiere):** 9 fields (`vehicleLicensePlate`,
  `vehicleMake`, `vehicleType`, `vehicleModel`, `engineMake`,
  `engineNumber`, `chassisMake`, `chassisNumber`, `vehicleUse`) — all
  required, per Digesto art. 11's instruction that these be transcribed
  verbatim from the vehicle's título/legajo.
- **"H" (deudas y gravámenes declarados por el vendedor):** 3 fields
  (`priorLienRegistrationDate`, `priorLienAmount`, `priorLienCreditor`),
  all optional — the section's own printed text is itself a sworn
  declaration that the vehicle carries no undeclared debts, and the
  left-margin instruction confirms this block is completed only if a
  pre-existing lien in fact exists.
- **"I" (vendedor o transmitente):** 5 core fields
  (`sellerOwnershipPercentage`, `sellerNameOrDenomination`,
  `sellerMaritalStatus`, `sellerMarriageRecordNumber`, `sellerSpouseName`)
  plus 4 attorney-in-fact fields (`sellerAttorneyName`,
  `sellerAttorneyDocumentType`, `sellerAttorneyDocumentNumber`,
  `sellerAttorneyIssuingAuthority`).
- **"J" (condómino en la venta):** mirrors "I" — 5 core + 4 attorney fields
  (`coSeller*`), applicable only if there is a second seller.
- **"K" (comprador — signature/attorney block):** 4 fields
  (`buyerAttorney*`) — this section on page 2 captures *only* the buyer's
  attorney-in-fact, since the buyer's own data is already fully captured in
  "D".
- **"L" (condómino en la compra — signature/attorney block):** 4 fields
  (`coBuyerAttorney*`), mirroring "K".
- **"M" (observaciones):** 1 field (`observations`).
- **"O" (autorización a un tercero):** 2 fields (`authorizedAgentName`,
  `authorizedAgentDocumentTypeAndNumber`), applicable only if the titular
  or their attorney-in-fact does not appear in person to file/collect the
  documentation.

**83 fields modelled in total.**

## Scope decisions and judgment calls

- **Section "A"'s duplicate `DOMINIO` box is not a separate field.** It
  recurs verbatim from section "F" for the registry's own cross-referencing
  convenience; modelling it as a second field would misrepresent it as
  independently-variable data rather than the same value entered twice on
  one physical page.
- **The seller's own national-identity-document number is deliberately
  absent from this document.** Sections "I"/"J" ask only for the seller's
  name, ownership share, and marital status — not a document
  type/number/authority for the seller *themselves* (only for their
  attorney-in-fact, if used). This was checked by inspecting every text
  position in and around both sections at high resolution to rule out a
  missed box. This is consistent with the seller already being the
  registry's on-file titular (matched via the vehicle's `dominio`), whose
  identity is confirmed at signing via notarized signature certification
  rather than re-declared here — distinct from the buyer sections ("D"/"E"),
  which do ask for full identity/document data since the buyer is a new
  party to the registry's records for this vehicle.
- **Persona-física-specific and ente-jurídico-specific buyer/co-buyer
  fields are `required: false`, not gated by a fabricated
  `buyerIsLegalEntity` boolean.** The source form has no explicit
  natural-person-vs-legal-entity selector box; the distinction is conveyed
  only by which of the two mutually-exclusive sub-blocks (tagged
  "PERSONAS FISICAS" vs "ENTES JURIDICOS" in the form's own left margin)
  the filer completes. Inventing a boolean field not printed on the form
  would violate source-fidelity; each affected field's `description`
  instead states its applicability in prose, matching this registry's
  established practice (e.g. `employer`/`spouseDetails` in
  `ar/cancilleria/formulario-solicitud-visado`) for real-world-conditional,
  not printed-conditional, optionality.
- **Composite address fields, not exploded sub-boxes.** Each of the four
  address groups (buyer/co-buyer × legal/real domicile) is printed as three
  visual rows (calle+número+piso+dep+código postal; localidad; partido/
  departamento+provincia). Spec v0.3's `field.type` enum has no structured
  object/sub-property schema, and exploding each address into ~6 discrete
  fields would roughly double this document's already-large field count for
  marginal gain. Modelled as a single composite string per address, matching
  the established precedent in `ar/cancilleria/formulario-solicitud-visado`
  (`homeAddress`) and other sibling schemas in this registry.
- **`buyerMaritalStatus`/`sellerMaritalStatus`/`coBuyerMaritalStatus`/
  `coSellerMaritalStatus` combine two visually-adjacent printed concepts
  into one enum**, matching the form's own single "Marcar con X lo que
  corresponda" checkbox group (soltero/casado/viudo/divorciado). Their
  respective `*MarriageRecordNumber` fields use `requiredWhen … equals:
  "casado"` — a safe closed-enum comparison, not a sentinel-default
  comparison against an absent field.
- **`authorizedAgentDocumentTypeAndNumber` is deliberately *not* gated with
  `requiredWhen` against `authorizedAgentName`.** The condition grammar
  (GSP-0013) has no field-presence operator, and comparing an optional
  field against a sentinel value like `""` misfires: an *absent* field
  evaluates as `undefined`, and `undefined !== ''` is `true`, which would
  make the target field appear required for every applicant rather than
  only those who filled in `authorizedAgentName`. This was caught before
  shipping, not after — the field's `description` states the conditional
  relationship in prose instead.
- **Document-type enum values combine nationality status and document
  type** (`dni-argentino-nativo-o-naturalizado`, `le-libreta-de-
  enrolamiento`, `lc-libreta-civica`, `dni-extranjero`, `ci-extranjero`,
  `pasaporte-extranjero`), mirroring the form's own single 6-option
  checkbox group ("ARGENTINOS NATIVOS O NATURALIZ." options 1-3 vs
  "EXTRANJEROS" options 4-6) rather than splitting nationality-status and
  document-type into two separate fields not printed as such.
- **Buyer's CUIT/CUIL/CDI (`buyerTaxId`) is `required: true`; the
  equivalent seller field does not exist on this form at all** (see above).
  DNRPA's general completion rules (Digesto art. 13) explicitly require
  acquirers/adquirentes petitioning a title-transfer inscription to prove
  their CUIT/CDI/CUIL to the Registro Seccional and to note that number
  "en el espacio libre a la derecha del dato correspondiente al porcentaje
  del automotor que se inscribe o adquiere" — i.e. right next to the
  ownership-percentage field this document already models — giving this
  one `required: true` a source-asserted basis distinct from the
  structural-judgment-call `required` values elsewhere in this document.
  `coBuyerTaxId` remains `required: false` since the whole co-buyer block
  is itself conditional on a co-buyer existing.
- **Every wet-ink signature line and every notary/certifying-official block
  ("Certificación de Firma" / "Fecha, Sello y Firma del Certificante") is
  out of scope.** These are produced by a third party (the signer, or the
  notary/bank official certifying the signature) at the moment of physical
  execution, not authored by the applicant when assembling the transfer
  packet — consistent with this registry's established practice of
  excluding wet-ink signature lines (e.g. `ar/cancilleria/formulario-
  solicitud-visado`'s campo 51).
- **The "apoderado del cónyuge" (attorney-in-fact acting specifically for
  a spouse's own consent signature) sub-sub-block is out of scope.** The
  spouse's own consent is already captured via `sellerSpouseName`/
  `coSellerSpouseName`; a further nested proxy-for-the-spouse identity is a
  low-frequency edge case one layer deeper than this document's chosen
  scope boundary (party-level attorneys-in-fact for buyer/co-buyer/
  seller/co-seller, all included).
- **Registry-only boxes excluded:** the form's pre-printed serial number
  (top-right, "Nº ... * RESERVADO PARA EL REGISTRO"), sections "B" (Cargo)
  and "C" (Arancel), the "OPTA SI/NO ART. 11 DEC. LEY 6582/58" checkbox
  (tagged "RESERVADO PARA EL REGISTRO" in the form's own left margin), and
  section "N" (the Registro Seccional's own processing statement) are all
  completed by DNRPA staff, not the applicant, and are out of scope.
- **`vehicleLicensePlate` reuses the `A`-section cross-reference and the
  `F`-section primary box as one field** (see above) — its `sourceRef`
  cites section "F" as the primary location.

## Mock conformance test

A standalone Node script (`conformance.mjs`, not committed — ad hoc
verification harness matching this registry's usual practice) evaluates
required-field presence (including `requiredWhen`), `enum` membership,
`date` format, and `minLength`/`maxLength`/`minimum`/`maximum` bounds.

- **Valid mock 1** — the simplest real-world case: a single natural-person
  buyer (unmarried, 100% ownership, no co-buyer) and a single natural-person
  seller (unmarried, no co-seller, no attorneys, no declared prior liens).
  **0 errors.**
- **Valid mock 2** — the maximal case: two legal-entity co-buyers (60%/40%
  split, full "ENTES JURIDICOS" data for both), two married co-sellers with
  spousal-consent names, a co-seller's attorney-in-fact, a buyer's
  attorney-in-fact, a declared prior lien, and third-party filing
  authorization. **0 errors.**
- **Negative control 1** — buyer's marital status set to `casado` without
  supplying `buyerMarriageRecordNumber`. **Fails** with that field flagged
  missing, confirming the `requiredWhen` gate fires correctly.
- **Negative control 2** — `buyerDocumentType` set to an out-of-enum value
  (`"green-card"`). **Fails** on enum-membership, as expected.
- **Negative control 3** — `vehicleLicensePlate` and
  `sellerNameOrDenomination` removed from mock 1. **Fails** with both
  flagged missing, as expected.
- **Negative control 4** — seller's marital status set to `casado` without
  supplying `sellerMarriageRecordNumber`. **Fails** as expected, confirming
  the seller-side gate (independent from the buyer-side gate) also fires
  correctly.

## Tooling run

- `node tools/validate.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-automotor/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-automotor/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-automotor/1.0.0` → 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this is a from-scratch opening of Argentina's
DMV vertical using the registry's first genuinely widget-free/text-layer-free
AR specimen, with a materially larger field count (83) than any prior AR
schema and several structurally-inferred (not source-asserted) `required`
judgment calls around the natural-person/legal-entity branch. Re-check the
cited PDF and Digesto URLs, confirm no newer specimen has replaced either
one, and consider picking up the sibling `08M.pdf` (motovehículo variant,
explicitly deferred this cycle) as a follow-on cycle, on or before that date
and on any `source.url` change.
