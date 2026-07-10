# Verification record — `ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo` v1.0.0

## Candidate selection

This session's brief (GOV-2204, child of the recurring research issue
GOV-2202, itself a continuation of GOV-2167/GOV-2185) was to author the
sibling motovehículo (motorcycle) variant of the already-published
`ar/dnrpa/solicitud-tipo-08-transferencia-automotor` (GOV-2187, PR #355).
That prior cycle's own VERIFICATION.md explicitly named `08M.pdf` as a
follow-on candidate, deferred rather than fetched or extracted at the time.
This document deepens Argentina's DMV vertical (still 3/6 verticals; DMV
coverage now spans both the automóvil and motovehículo procedure variants)
rather than opening a new one.

GOV-2202 also re-screened Argentina's Taxes vertical (AFIP Ganancias/Bienes
Personales) this cycle and confirmed it a dead end: both F.711 and F.762
are output-only artifacts generated after completing an authenticated
Clave-Fiscal-gated web declaration — no blank AcroForm or numbered
instructivo exists anywhere for either. That screening does not recur here;
see GOV-2202's own CATALOG.md update for the full sourcing record.

## Source

- **Primary:** `https://www.dnrpa.gov.ar/nuevodigesto/documentos/st/08M.pdf`
  — fetched fresh this session with a browser User-Agent
  (`curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **1,341,697 bytes**, SHA-256
  `9d66a0d3863954ca8ce94ff58a351b70a3f03abed2377f1297cf794feea7fddb`.
  `Last-Modified: Sat, 30 Jul 2022 01:04:28 GMT` per the server's own
  response header — one second earlier than the automóvil sibling's
  `08A.pdf` (`01:04:36 GMT`), consistent with both specimens having been
  uploaded to the server in the same batch. No login, CAPTCHA, or WAF/bot-
  mitigation challenge was encountered — a plain `curl` with a browser
  `User-Agent` succeeded on the first attempt.
- **General completion rules (cited throughout this document's field
  descriptions, same standing rules the automóvil sibling relies on):**
  `https://www.dnrpa.gov.ar/concursos_publicos/digesto12-04-2017/T1C1S2.htm`
  — DNRPA's Digesto, Título I, Capítulo I, Sección 2ª ("Requisitos a
  Cumplimentar", arts. 1-13). Re-fetched fresh this session: **HTTP 200**,
  `content-type: text/html`.
- **Authority homepage:** `https://www.dnrpa.gov.ar` — fetched fresh this
  session: **HTTP 200**, `content-type: text/html`.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo/1.0.0`
re-fetched all 3 cited URLs (including the spec's own `$schema` URL)
immediately before finalizing this record: 1 directory, 3 URLs checked, 0
warnings, 0 allowlisted, all clear. No entry was added to
`tools/verify-sources-allowlist.json` — this domain needs none.

## Extraction method

Like its automóvil sibling, this specimen is a **genuinely flat/scanned
image PDF**, confirmed programmatically with `pdfjs-dist`
(`legacy/build/pdf.js`, Node ESM) before any visual work began — this was
checked independently rather than assumed from the sibling's own findings:

- `doc.getFieldObjects()` → `null` (no AcroForm at all).
- `page.getAnnotations({ intent: 'display' })` → **0 widgets** on both of
  the document's 2 pages.
- `page.getTextContent()` → **0 text items** on both pages (the same
  `"TT: undefined function: 32"` warning seen on the automóvil sibling
  recurs here, again consistent with an embedded non-standard font used
  only for the pre-printed serial number).

Every field in this document was catalogued by **rasterizing both pages to
PNG at 3x scale** (`pdfjs-dist` + `node-canvas`,
`page.render({ canvasContext, viewport })`) and visually transcribing every
printed box, in reading order, cross-checked against the form's own
left-margin section labels (identical tag set to the automóvil sibling:
"INSTRUCCIONES", "DOMICILIOS", "PERSONAS FISICAS", "ENTES JURIDICOS",
"RESERVADO PARA EL REGISTRO") and right-margin annotations on page 2.

The fetched PDF is labelled, in its own top-left corner, **"08 ORIGINAL
PARA LEGAJO 'B'"** and carries its own independent pre-printed serial
number series with an **"M" prefix** (`Nº M 06760780 *`) — DNRPA's own
internal numbering distinguishing motovehículo-series forms from the
automóvil series (which carries no letter prefix). This is a different ply
(*Original*/Legajo B) than the automóvil specimen fetched previously
(*Duplicado*/Legajo A); per the same carbon-copy-design reasoning applied
in the automóvil VERIFICATION.md, every ply of a DNRPA Solicitud Tipo
carries identical fields, so this is a structurally complete and
representative specimen despite being a different ply than its sibling.

### Field-by-field comparison against the automóvil sibling

This document was **not** assumed to match `08A.pdf` structurally. Every
section was independently re-transcribed from `08M.pdf`'s own rendered
pages, then cross-checked field-by-field against the already-published
`ar/dnrpa/solicitud-tipo-08-transferencia-automotor` schema (a Python diff
comparing both fields arrays by name confirmed the result below).

**The two documents are identical across 81 of 83 fields** — same section
lettering (A, D, E, F, H, I, J, K, L, M, O), same field count per section,
same enums, same `required`/`requiredWhen` structure. The **only
substantive difference** is in sección "F" ("VEHICULO QUE SE TRANSFIERE"):

- The automóvil form asks for **"MARCA DE CHASIS"** / **"N° DE CHASIS"**
  (`chassisMake`/`chassisNumber`).
- The motovehículo form asks for **"MARCA DE CUADRO"** / **"N° DE CUADRO"**
  instead — modelled here as **`frameMake`**/**`frameNumber`**, since a
  motorcycle's load-bearing structure is a "cuadro" (frame), not a "chasis"
  (chassis); reusing the automóvil sibling's field names would misrepresent
  what this form actually asks for.
- This same substitution recurs in the section's own left-margin
  completion instruction: "COMPLETAR LOS NUMEROS DE MOTOR Y **CUADRO**
  OMITIENDO LAS SERIES..." here, vs "...MOTOR Y **CHASIS**..." on the
  automóvil sibling — independently confirmed by rendering and reading
  both left-margin instruction blocks at high resolution, not inferred
  from the section-header text alone.

No other textual, structural, or layout difference was found between the
two specimens' 2 pages each, including the header boilerplate ("Sr.
Vendedor: Recuerde..."), the Ministerio/DNRPA title block, and every
other section's field set, labels, and left-margin instructions.

### Section-by-section field reconciliation

Since sections A, D, E, H, I, J, K, L, M, and O are field-for-field
identical to the already-published automóvil schema, this reconciliation
focuses on confirming that identity and detailing section F's difference;
see the automóvil sibling's own VERIFICATION.md for the full per-field
rationale on shared sections, which applies unchanged here.

- **"A" (contrato):** 2 fields — `contractPlaceAndDate`, `purchasePrice` —
  identical to the automóvil sibling, including the `DOMINIO` cross-
  reference box (see Scope decisions).
- **"D" (comprador/adquirente):** 20 fields (`buyer*`) — identical set and
  order to the automóvil sibling.
- **"E" (condómino en la compra):** 20 fields (`coBuyer*`) — identical
  mirror of "D", as on the automóvil sibling.
- **"F" (vehículo que se transfiere):** 9 fields — `vehicleLicensePlate`,
  `vehicleMake`, `vehicleType`, `vehicleModel`, `engineMake`,
  `engineNumber`, **`frameMake`**, **`frameNumber`**, `vehicleUse` — same
  count and position as the automóvil sibling's section F, with the two
  renamed fields being the one substantive difference in this document
  (see above).
- **"H" (deudas y gravámenes declarados por el vendedor):** 3 fields,
  identical to the automóvil sibling.
- **"I" (vendedor o transmitente):** 5 core + 4 attorney fields, identical
  to the automóvil sibling — including the seller's own national-identity-
  document number being absent (see Scope decisions).
- **"J" (condómino en la venta):** mirrors "I", identical to the automóvil
  sibling.
- **"K"/"L" (comprador/condómino — signature/attorney block):** 4+4
  fields, identical to the automóvil sibling.
- **"M" (observaciones):** 1 field, identical to the automóvil sibling.
- **"O" (autorización a un tercero):** 2 fields, identical to the
  automóvil sibling.

**83 fields modelled in total** (same total as the automóvil sibling: 81
shared fields, unchanged, plus 2 renamed section-F fields in place of the
automóvil's `chassisMake`/`chassisNumber`).

## Scope decisions and judgment calls

All of the automóvil sibling's scope decisions were independently
re-verified against this specimen's own rendered pages (not assumed to
carry over) and hold unchanged here:

- **Section "A"'s duplicate `DOMINIO` box is not a separate field** — same
  reasoning as the automóvil sibling; confirmed present and identical on
  this specimen.
- **The seller's own national-identity-document number is deliberately
  absent from this document.** Re-confirmed by inspecting every text
  position in and around sections "I"/"J" on this specimen at high
  resolution — sections "I"/"J" here ask only for name, ownership share,
  and marital status, exactly as on the automóvil sibling.
- **Persona-física-specific and ente-jurídico-specific buyer/co-buyer
  fields are `required: false`, not gated by a fabricated
  `buyerIsLegalEntity` boolean** — same reasoning as the automóvil sibling;
  this specimen has no natural-person-vs-legal-entity selector box either.
- **Composite address fields, not exploded sub-boxes** — same convention
  as the automóvil sibling; this specimen's four address groups are
  printed identically (calle+número+piso+dep+código postal; localidad;
  partido/departamento+provincia).
- **`buyerMaritalStatus`/`sellerMaritalStatus`/`coBuyerMaritalStatus`/
  `coSellerMaritalStatus` combine two visually-adjacent printed concepts
  into one enum**, identical checkbox group (soltero/casado/viudo/
  divorciado) confirmed present on this specimen.
- **`authorizedAgentDocumentTypeAndNumber` is deliberately *not* gated
  with `requiredWhen`** against `authorizedAgentName` — same
  sentinel-comparison pitfall as the automóvil sibling (GSP-0013 has no
  field-presence operator); avoided here for the same reason.
- **Document-type enum values combine nationality status and document
  type** — identical 6-option checkbox group confirmed present in every
  section of this specimen that carries one (D, E, I/apoderado, J/
  apoderado, K, L).
- **Buyer's CUIT/CUIL/CDI (`buyerTaxId`) is `required: true`; the
  equivalent seller field does not exist on this form at all** — same
  Digesto art. 13 basis as the automóvil sibling; `coBuyerTaxId` remains
  `required: false`.
- **Every wet-ink signature line and every notary/certifying-official
  block is out of scope** — confirmed present and excluded identically on
  this specimen (sections I/J/K/L/O all carry "FIRMA" lines and
  "Certificación de Firma" / "Fecha, Sello y Firma del Certificante"
  blocks, matching the automóvil sibling).
- **The "apoderado del cónyuge" sub-sub-block is out of scope.** This
  specimen's sections "I"/"J" both carry a full "APELLIDO Y NOMBRES DEL
  APODERADO DEL CONYUGE" row (with its own D.N.I./L.E./L.C./C.I./PASAP.
  checkbox group and certificación-de-firma block) — confirmed present,
  identical to the automóvil sibling's own copy of this box. Consistent
  with that sibling's own scope decision (a further nested proxy-for-the-
  spouse identity, one layer deeper than this document's party-level
  attorney-in-fact scope boundary), this box is excluded here too, for
  consistency across both variants of this form.
- **Registry-only boxes excluded:** the form's pre-printed serial number
  (top-right, this specimen's own `Nº M 06760780 *`), sections "B" and
  "C", the "OPTA SI/NO ART. 11 DEC. LEY 6582/58" checkbox, and section "N"
  are all confirmed present and out of scope, identical to the automóvil
  sibling.
- **`vehicleLicensePlate` reuses the "A"-section cross-reference and the
  "F"-section primary box as one field** — identical to the automóvil
  sibling.
- **`frameMake`/`frameNumber` are new field names, not a reuse of
  `chassisMake`/`chassisNumber`** — the one deliberate naming departure
  from the automóvil sibling, made for source-fidelity to this document's
  own "CUADRO" terminology (see Extraction method above). Their
  `validation.maxLength` values (100 each) match the automóvil sibling's
  `chassisMake`/`chassisNumber` bounds, since both fields occupy visually
  identical box sizes on their respective forms.

## Mock conformance test

A standalone Node script (`conformance.mjs`, adapted from the automóvil
sibling's own harness with motorcycle-appropriate mock data — plate
formats, make/model, and `frameMake`/`frameNumber` in place of
`chassisMake`/`chassisNumber` — not committed, ad hoc verification harness
matching this registry's usual practice) evaluates required-field
presence (including `requiredWhen`), `enum` membership, `date` format, and
`minLength`/`maxLength`/`minimum`/`maximum` bounds.

- **Valid mock 1** — the simplest real-world case: a single natural-person
  buyer (unmarried, 100% ownership, no co-buyer) and a single
  natural-person seller (unmarried, no co-seller, no attorneys, no
  declared prior liens), with a Honda CB 125F as the transferred vehicle.
  **0 errors.**
- **Valid mock 2** — the maximal case: two legal-entity co-buyers (60%/40%
  split, full "ENTES JURIDICOS" data for both), two married co-sellers
  with spousal-consent names, a co-seller's attorney-in-fact, a buyer's
  attorney-in-fact, a declared prior lien, third-party filing
  authorization, and a Yamaha XTZ 250 as the transferred vehicle. **0
  errors.**
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

A Python diff of both schemas' `fields` arrays (by name) additionally
confirmed programmatically that the only field-name differences between
the two schemas are `chassisMake`/`chassisNumber` (automóvil) vs.
`frameMake`/`frameNumber` (motovehículo), and that every other field is
byte-identical apart from the expected `sourceRef` document-label prefix
change ("Solicitud Tipo 08" → "Solicitud Tipo 08 (motovehículo)").

## Tooling run

- `node tools/validate.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo/1.0.0` → 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months), matching the automóvil sibling. This closes
the follow-on candidate that sibling's own VERIFICATION.md named; re-check
both the `08M.pdf` and Digesto URLs, confirm no newer specimen has replaced
either one, and confirm no third DNRPA Solicitud Tipo 08 variant (e.g. for
trailers/acoplados, which DNRPA's own document index may list separately)
exists before this date and on any `source.url` change.
