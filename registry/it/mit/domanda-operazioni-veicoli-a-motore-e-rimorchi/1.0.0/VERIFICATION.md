# Verification record — `it/mit/domanda-operazioni-veicoli-a-motore-e-rimorchi` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-11`

This is a `GovSchema Standard Research` cycle (**GOV-2389**), authoring the
pre-scouted DMV follow-on candidate the prior cycle (GOV-2382, which opened
Italy as the registry's 36th jurisdiction via Taxes) flagged in CATALOG.md's
Known Gaps section: Modulario TT 2119, Ministero delle infrastrutture e dei
trasporti (MIT) / `ilportaledellautomobilista.it`.

## Source examined and fetched fresh

- **Authority:** MIT — Direzione Generale per la Motorizzazione, per i
  Servizi ai Cittadini e alle Imprese in materia di Trasporti e Navigazione.
- **Document:** Modulario TT 2119 (Mod. 29OTT010045), "Domanda per operazioni
  relative ai veicoli a motore e loro rimorchi (esclusi i ciclomotori)".
- **URL:**
  `https://www.ilportaledellautomobilista.it/documents/56611/128846273/TT2119.pdf`
- **Fetched:** direct `curl` from this sandbox, 2026-07-11. **HTTP 200**, no
  login/CAPTCHA/WAF gate.
- **Size:** 998,509 bytes.
- **sha256:** `e12e797d3ee167e397e7f2d240b04807cf9b1b04f4366263243aaf06c1d98c07`
- **Pages:** 13 (confirmed via `pdfjs-dist`'s `doc.numPages`).

## Correcting the prior cycle's pre-scouting note

CATALOG.md's Known Gaps entry (written during GOV-2382, before this form was
actually opened and inspected) described TT 2119 as "a genuine embedded text
layer and no AcroForm widgets, its own lettered/coded operation-type table
self-documenting the form's sections." That characterization is **only
partially correct** and this cycle corrects it:

- `page.getAnnotations()` (via `pdfjs-dist` 4.10.38, `legacy/build/pdf.mjs`)
  confirmed **zero** `/Widget` annotations across all 13 pages — the
  "no AcroForm widgets" half of the prior note holds.
- However, `page.getTextContent()` returned **zero text items** on pages
  4-7 (the form's own "4/8" through "7/8" — the actual applicant data-entry
  pages), not a genuine text layer. An `operatorList` dump for those four
  pages showed only `paintImageXObject` calls (op code 85), no text-showing
  operators at all. Grepping the raw PDF bytes independently confirmed four
  `/Subtype /Image` objects (object numbers 151, 162, 172, 178), each
  `/ColorSpace /DeviceGray`, `1239x1754` px, `/Filter [/FlateDecode
  /DCTDecode]` — i.e. **four full-page scanned images**, not text.
- Pages 1-3, 8, and 9-13 (cover, the operation-code table, a PagoPA-attachment
  instruction, the numbered field-notes legend plus two lookup tables, and
  the GDPR privacy notice) genuinely do carry an extractable vector-text
  layer — this is where the prior cycle's characterization came from, but it
  did not distinguish these pages from the four scanned core pages.

**New extraction technique for this registry:** since the four scanned pages
carry no text and no widgets, the only way to read their actual field layout
was to view them as images. `node-canvas`-based `pdfjs-dist` page rendering
failed in this sandbox for any page containing an image XObject (a
`TypeError: Image or Canvas expected` deep inside `pdfjs-dist`'s
`paintInlineImageXObject`, reproducing the same page-rendering limitation
this registry's GOV-2316 cycle already found with both a Chromium and a
`node-canvas` route). Rather than fight that rendering pipeline further, the
four JPEG streams were extracted **directly from the PDF's own object
stream**: each object's raw stream bytes were located by byte offset,
`zlib.inflateSync`'d (the outer `FlateDecode` layer), and the result — a
valid `%FFD8FF` JPEG — was written straight to disk and viewed directly. This
recovered a fully legible, high-resolution scan of the form with no rendering
pipeline involved at all. All four scanned pages are confirmed **identical
carbon-copy layers of the same single-page form** (footer labels read "COPIA
INPUT", "COPIA UFFICIO", and two further copies), each printed with the same
1-40 numbered field markers cross-referenced against page 8/8's own footnote
legend — so this schema models the field layout once, sourced from the
"COPIA INPUT" copy (object 151).

The operation-code table on page 2/8 ("Tabella riassuntiva delle operazioni")
*is* genuine vector text, but its two-column layout defeats simple
reading-order concatenation (`getTextContent()`'s default item order
interleaves the two columns mid-entry). It was re-extracted by grouping text
items by `transform` y-coordinate (9-unit tolerance, to merge a code's two
character glyphs which print roughly 2pt apart vertically) and sorting each
row by x-coordinate — the same coordinate-based reading-order technique this
registry has used for other multi-column/out-of-order layouts (e.g.
`dk/skattestyrelsen/oplysningsskemaet`, `it/agenzia-entrate/modello-730`).
This surfaced two genuine same-code-different-meaning duplicates the source
table itself prints, independently confirmed via per-glyph codepoint dumps
(not a rendering artifact, not a column-merge bug in this cycle's own
extraction — both letters of each duplicate were re-verified at their exact
`(x, y)` coordinates):

- Code **`D A`** is printed twice: once in the table's left column
  ("Aggiornamento carta di circolazione per variazioni riguardanti
  l'intestatario") and once in the right column ("Cambio destinazione o
  uso").
- Code **`R V`** is printed twice, both in the right column ("Rinnovo
  immatricolazione rimorchi agricoli" and "Rinnovo immatricolazione veicoli
  atipici").

Both are disclosed in `operationCode`'s own field description rather than
silently resolved or guessed at — consistent with this registry's established
practice for genuine source-print irregularities (e.g. `se/polisen`'s
font-encoding artifact, GOV-2363's Caesar-shift decode).

## Field inventory and scope

36 `fields[]` entries, plus 2 `documents[]` entries. In scope: the
operation-selection code (36-entry closed enum); the requesting party's own
declared capacity; the vehicle owner's registry/identity data (campi 5-15);
vehicle identification (campi 17-24, `usageType`/`thirdPartyUsageDetail` as
a `requiredWhen` pair); the previous-plate block for renewal/nationalization
(campi 25-30); the unnumbered goods-transport/rental-licence block; and the
unnumbered-but-explicitly-footnoted agricultural-machine-company block
(campi 31-39, with `agriculturalCompanyTypeCode` as a 3-value enum and
`umaDeclarationPre1979Flag` as a boolean per nota 37's single-letter "U"
flag).

**Deliberately out of scope:**

- The vehicle technical-specification block occupying the lower half of
  pages 4-7 (fiscal/actual power, body code, seats, dimensions, masses,
  axle count/spacing, tyre and brake data, tow-hook and dual-fuel-conversion
  checkboxes ["field 40" per nota 40], "REVISIONE" inspection date). This
  block is a near-exact field-for-field match to page 2/8's own explicitly
  labelled "SPAZIO RISERVATO ALL'UFFICIO PER LA VISITA DEL VEICOLO" (space
  reserved for the office for the vehicle inspection), itself signed "FIRMA
  DEL FUNZIONARIO TECNICO" (technical official's signature) — excluded on
  the same office-reserved-content basis as this registry's `dk/cpr` and
  `se/skatteverket` precedents (an authority-completed section, not
  applicant-facing).
- The "CAUSALE AGGIORNAM." box (explicitly "16) Riservato all'Ufficio" per
  the form's own numbered note) and the "COD. USO" box (explicitly "23a) Il
  codice uso è riservato all'Ufficio").
- The two large external lookup tables page 8/8 itself prints in full — a
  ~50-entry "Tabella denominazioni" (legal-form/ownership-interest codes) and
  a ~25-entry "Tabella codici categorie macchine agricole" (agricultural
  machine category codes). Both are referenced by `validation.pattern`
  (`^[A-Z]{2,3}$`) and described in the relevant field's own `description`
  (`ownerLegalFormCode`, `agriculturalMachineCategory`) rather than fully
  reproduced as enums — a disclosed scope decision given their size relative
  to the rest of the form, the same tier of decision this registry has made
  for other large external code tables.
- Both signature blocks ("FIRMA DEL FUNZIONARIO CHE HA CONTROLLATO LA
  DOCUMENTAZIONE"; "IL DICHIARANTE"). The document carries zero AcroForm
  widgets of any kind, so — per this registry's established convention —
  a wet-ink signature line with no data-entry box of its own is not modelled
  as a schema field.
- `existingPlateNumber` (the top-of-form "TARGA" box) is included as an
  **optional** field despite carrying no cross-reference to any of the
  form's own 40 numbered notes, unlike almost every other applicant-facing
  box on the form — a disclosed judgment call, included because it is
  plainly the vehicle-identifying field an applicant would complete for any
  operation concerning an already-registered vehicle.

## Documents

- `pagopaPaymentReceipt` (payment, required) — sourced directly from page
  3/8's own printed instruction, "ALLEGARE A QUESTO DOCUMENTO L'ATTESTAZIONE
  DI VERSAMENTO PAGOPA" (attach the PagoPA payment confirmation to this
  document).
- `falseDeclarationLiabilityAttestation` (attestation, required) — the
  verbatim criminal-liability declaration under art. 76 D.P.R. 445/2000 the
  applicant makes by signing, quoted in full in the `statement` field.

## Conformance testing

Two mock scenarios run against `tools/validate.mjs`'s conformance checker:

1. `private-individual-motorcycle-first-registration.json` — a natural
   person registering a motorcycle for the first time (`operationCode: IM`,
   `usageType: proprio`, no previous-plate block, no agricultural block). **0
   errors.**
2. `company-agricultural-tractor-renewal.json` — a farming business
   (`ownerLegalFormCode: SPA` on the owner block is not used here; instead
   the agricultural-company block is populated directly) renewing an
   agricultural tractor's registration (`operationCode: RG`, previous-plate
   block populated, `agriculturalCompanyTypeCode: AA`). **0 errors.**

Four mutation controls, each hand-derived from a passing scenario by
introducing exactly one violation:

1. `mutation-control-missing-required-field.json` — deletes
   `chassisNumber`. **1 error** (missing required field).
2. `mutation-control-enum-violation.json` — sets `operationCode` to `"ZZ"`
   (not in the 36-entry enum). **1 error.**
3. `mutation-control-pattern-violation.json` — sets `ownerResidenceProvince`
   to `"Roma"` (fails the `^[A-Z]{2}$` province-code pattern). **1 error.**
4. `mutation-control-missing-required-document.json` — removes
   `pagopaPaymentReceipt` from `documents[]`. **1 error** (missing required
   document) — deliberately exercising this registry's own previously-found
   conformance-checker `documents[]` blind spot (GOV-2179 and others).

All four mutation controls raised exactly the expected single error; the two
passing scenarios raised zero.
