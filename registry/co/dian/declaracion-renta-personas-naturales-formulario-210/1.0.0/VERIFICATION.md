# Verification record — `co/dian/declaracion-renta-personas-naturales-formulario-210` v1.0.0

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

This is a `GovSchema Standard Research` cycle (GOV-1595). Colombia (`co`) had
2 of its 6 verticals modelled going into this cycle — DMV
(`co/runt/formulario-solicitud-tramites-vehiculo`, GOV-1567) and Business
Formation (`co/rues/matricula-mercantil`, GOV-1588) — with Passport, Visa,
Taxes, and National ID all open backlog candidates. This cycle screened all
three of Colombia's remaining sourceable candidates (Passport via
Cancillería, Visa via the Foreign Ministry's e-visa portal, and Taxes via
DIAN's Formulario 210) and selected Formulario 210 as the strongest: a
genuinely public, unauthenticated, text-layer PDF with a full casilla-by-
casilla instructivo, no login/CAPTCHA/WAF gate, versus Passport's narrow
~15-field renewal-only scope and Visa's thin public pre-check page with the
real per-subtype fields locked behind a live AJAX-driven wizard session (see
"Candidates screened and not picked" below).

## Sources examined

- **Primary source — DIAN,
  `https://www.dian.gov.co/atencionciudadano/formulariosinstructivos/Formularios/2025/Formulario_210_2025.pdf`**
  ("Instructivo para el diligenciamiento de la Declaración de Renta y
  Complementario Personas Naturales y Asimiladas Residentes y Sucesiones
  Ilíquidas de Causantes Residentes, Año Gravable 2023 y siguientes",
  Formulario 210 edición 2025, 21 pages, legal basis Resolución 000044 del 14
  de marzo de 2024, instructivo modificado por la Resolución 000120 del 31 de
  julio de 2024 para las filas 40/52/68/85). Fetched directly via `curl`
  (`-A "Mozilla/5.0"`), HTTP 200, 1,186,472 bytes, genuine PDF magic bytes —
  DIAN's own government domain, no third-party mirror needed.
- A second, independently spawned research pass (see "Independent
  cross-check" below) re-fetched the same PDF and additionally rendered
  **page 1** (the printed form grid itself, not just the instructivo prose)
  to a 3x-scale PNG via `pdfjs-dist` + `node-canvas`, to visually resolve
  which casilla numbers genuinely exist on this form edition versus merely
  being absent from the instructivo's own narrative.

## Extraction method

1. Fetched the PDF directly via `curl`; confirmed genuine PDF magic bytes.
2. Extracted text content with `pdfjs-dist@3.11.174` (pinned per this
   registry's established gotcha with later versions), first via a naive
   single-stream per-page join (`content.items.map(i => i.str).join(' ')`).
   This read cleanly for most of the document, but a regex-based casilla-
   number scan against the joined text produced an implausible sequence
   around casillas 108–123 (numbers appearing out of order, some missing
   entirely, e.g. 111 never matched, `118` appearing before `112`).
3. Diagnosed this as a **two-column page layout** the instructivo prints
   throughout the document (a genuinely narrower, "newspaper-style" text
   column on the left and a wider cross-reference column on the right,
   *not* one column per row-concept — both columns can and do contain live
   casilla definitions on the same page). Re-extracted every instructivo
   page (2–19) by reading each glyph's raw `(x, y)` transform coordinate,
   splitting at `x = 300`, sorting each side by descending `y`, and
   concatenating left-column-then-right-column per page — the same
   coordinate-band technique this registry has used before for
   parallel-track/multi-column PDF layouts (see `gov-form-pdf-extraction`
   practice note). This produced a clean, fully-ordered casilla-1-through-141
   narrative with zero gaps or out-of-order numbers once re-parsed.
4. Cross-read every casilla against the instructivo's own numbered prose
   (`N. Label: description...`), noting for each: its section, whether it is
   user-entered, RUT-auto-populated, or system-computed (and its formula in
   terms of other casilla numbers, reproduced verbatim from the source even
   where — see judgment call 1 below — the formula reads as dimensionally
   unusual), its data type, and any enum values the text states explicitly
   (only casilla 25's correction code — `1`/`2`/`3` — is a real enum; every
   other coded field, e.g. `mainEconomicActivityCode`/`sectionalDirectorateCode`/
   `representationCode`, references an external DIAN/RUT code table not
   reproduced in this instructivo and is modelled as an open string).

## Independent cross-check

A second, independently spawned research pass re-fetched the same PDF from
scratch and additionally **rendered page 1 at 3x scale to a PNG and visually
inspected the printed form grid**, rather than relying on the instructivo's
narrative alone. This resolved two open questions definitively:

- **Casillas 2, 3, 11, and 13–23 do not exist on this form edition at all**
  — confirmed by direct visual inspection of the printed grid, not merely
  "undocumented in the instructivo." The form's own numbering simply skips
  these numbers (the "Datos del declarante" row reads, left to right: `5`,
  `6`, `7`, `8`, `9`, `10`, `12` — no boxes for `11` or `13`–`23` anywhere on
  the page). This registry's own initial regex-based casilla scan had
  produced false-positive matches for "2." and "3." — these are reused
  generic list-item numbers from an unrelated "otras deducciones imputables"
  example list appearing repeatedly throughout the document (e.g. "2. Pagos
  por salud", "3. Deducción por dependientes económicos"), not casilla
  definitions.
- **Casilla 983 ("No. Tarjeta profesional") exists** as a visual-only field
  directly beneath casilla 982 on the printed form, with **zero** narrative
  coverage anywhere in the 21-page instructivo text. Modelled here
  (`accountantProfessionalCardNumber`) on the strength of this visual
  confirmation alone.

Both raw-text extraction passes (this document's own coordinate-based
re-extraction, and the independently spawned cross-check's page-by-page
dump) agree character-for-character with each other everywhere they
overlap — no discrepancy was found in any casilla's label, formula, or
described treatment.

## Scope: what this document models, and what it deliberately excludes

- **Casillas 2, 3, 11, 13–23** — do not exist on this form edition (see
  "Independent cross-check" above); not a gap, simply absent numbering.
- **Casillas 996–997** (`Espacio para el número interno de la DIAN/adhesivo`,
  `Espacio exclusivo para el sello de la entidad recaudadora`) — explicitly
  marked as reserved for DIAN/collecting-entity internal use, consistent
  with this registry's established convention of excluding office-only
  fields the source itself marks as filled in by the receiving authority,
  not the filer.
- **Hidden, PDF-invisible casillas** the instructivo mentions but states are
  never shown on this printed form (e.g. 268, 269, 297, 299, 355, 356) —
  these exist only inside DIAN's authenticated MUISCA e-filing system (the
  "SI de Diligenciamiento"), which this document does not model, consistent
  with this registry's precedent of modelling the published form/instructivo
  rather than an authenticated e-filing UI (e.g. `mx/sat/declaracion-anual-sueldos-salarios`,
  the ZA SARS ITR14 set).
- **The renta presuntiva (casilla 98) worksheet itself** (E.T. art. 189's
  multi-step patrimonio-líquido depuration and proportional exempt-income
  allocation, illustrated only by a fully worked numeric example on PDF page
  21) is modelled as a single computed/user-supplied currency field with its
  governing rule summarized in the field description, not decomposed into
  its own sub-casillas — the instructivo does not assign separate casilla
  numbers to the worksheet's intermediate steps.
- **The signature mechanic itself** (a physical/electronic signing act, not
  a data field) is out of scope, per this registry's standing convention.

## Interpretive judgment calls flagged for an independent reviewer

1. **Casilla 111's formula is reproduced verbatim despite reading as
   dimensionally unusual.** The instructivo prints it as "base casillas 97 o
   98 + 103 + 107 + 108 - 118)" and its own prose confirms: "esta casilla es
   el resultado de sumar al mayor valor entre las casillas 97... y 98..., el
   valor de las casillas 103..., 107... y 108... menos el resultado de la
   casilla 118." Casilla 118 is itself a *tax amount* computed later in the
   Liquidación Privada section (from a different, non-income base — the
   article 240 E.T. corporate rate applied to casilla 108), not an income
   figure of the same kind as 97/98/103/107/108. Subtracting a downstream
   tax amount from an upstream income base is unusual, but two independent
   extractions of the source (this document's own coordinate-based
   re-extraction and an independently spawned cross-check's separate
   pdfjs-dist pass) agree on the exact same formula string character for
   character, so it is reproduced as printed rather than "corrected" against
   a modeller's own arithmetic expectation. Flagged here for a reviewer with
   deeper Colombian tax-law familiarity to confirm this is not a
   transcription artifact in DIAN's own published document.
2. **The `accountantOrFiscalAuditorCode`/`accountantProfessionalCardNumber`/
   `signedWithReservations` trio is intentionally left `required: false`
   with no `requiredWhen`, description-gated instead.** The real trigger —
   "patrimonio bruto or gross income for the year exceeds 100,000 UVT and
   the taxpayer is obligated to keep accounting books" — is expressed in UVT
   (a value re-set annually by DIAN, not a fixed peso figure), so no static
   `requiredWhen` condition against a concrete number can correctly express
   it across tax years. An earlier draft of this schema gated
   `accountantOrFiscalAuditorCode` on `{field: totalGrossWorth, greaterThan:
   0}`, which a mock-data test run (see below) revealed would incorrectly
   mark it required for virtually every filer (almost everyone has *some*
   net worth above zero) — caught and fixed before this version shipped,
   per this registry's `notequals-empty-string-absent-field-bug` memory's
   broader principle: don't force an unreliable condition into the grammar
   when the real trigger doesn't cleanly fit it.
3. **`priorFormNumber` is gated on `correctionCode` `in` `["1","2","3"]`,
   an enum-vs-fixed-value comparison** — safe under this registry's
   `notEquals`/absent-field hazard (per the memory note above) because
   `correctionCode` is a closed three-value enum, not an open string with an
   ambiguous absent-vs-sentinel state.
4. **Coded/external-table fields are modelled as open strings, not
   enums.** `mainEconomicActivityCode` (CIIU), `sectionalDirectorateCode`,
   and `representationCode` all reference DIAN/RUT code tables the
   instructivo names but does not reproduce (e.g. "código de la dirección
   seccional... según lo informado en la casilla 12 del RUT" — the sectional-
   office code table itself lives inside the RUT system, not this form).
   Consistent with this registry's established precedent for external code
   tables not reproduced in the source (e.g. `co/rues/matricula-mercantil`'s
   CIIU handling).
5. **Computed/system-calculated casillas are modelled as ordinary `number`
   fields with `required: true` and their formula stated in the
   description**, not a distinct "computed" field type — GovSchema's spec
   has no dedicated computed-field construct, and this registry's existing
   tax-return schemas (MX SAT's `declaracion-anual-sueldos-salarios`, the ZA
   SARS ITR14 set) follow the same pattern.
6. **The four "Ingresos brutos" entry-point casillas (32, 43, 58, 74) are
   modelled as unconditionally `required: true` with `minimum: 0`**, even
   though a given filer may have zero income in 3 of the 4 cédula general
   sub-schedules — the printed form always shows all four boxes
   unconditionally (unlike the exemption/deduction casillas immediately
   downstream of each, which the instructivo explicitly describes as
   conditionally enabled "si el valor de la casilla X es mayor que cero"),
   so "always present, value may be zero" is the more faithful reading than
   treating them as conditionally absent.
7. **`taxableIncomeOther` (casilla 96) is modelled as a single free-form
   currency field**, not decomposed into its three named sub-concepts
   (undeclared-assets/non-existent-liabilities, wealth-comparison income,
   presumed-purchase-omission income) — the instructivo names all three in
   one casilla's prose without assigning them separate box numbers.

## Test run (Phase 4 — mock data)

Two mock-filled instances were constructed and checked field-by-field
against every field's `validation` (enum/minimum) and against the
conditional-requiredness graph (`required`/`requiredWhen`), using a small
throwaway Python script (not committed — implements the same leaf-condition
evaluation semantics as `tools/validate-ajv.mjs`'s meta-schema validation
plus this document's own field-level `requiredWhen` graph, run ad hoc for
this review):

1. **Salaried employee, labor income only** — a fictional resident
   taxpayer with COP 80,000,000 gross labor income and no independent-labor,
   capital, non-labor, pension, or dividend income; net worth well under the
   100,000-UVT accountant-signature threshold. Exercises: all four "Ingresos
   brutos" entry points present (labor > 0, the other three explicitly 0);
   every downstream exempt/deduction casilla gated `greaterThan: 0` on its
   schedule's own net-income casilla correctly resolves as not-required when
   that schedule's net income is 0; `accountantOrFiscalAuditorCode` and its
   dependents correctly not required. **First pass surfaced a genuine
   schema defect** (judgment call 2 above): `accountantOrFiscalAuditorCode`
   had been gated on `{field: totalGrossWorth, greaterThan: 0}`, which this
   scenario's own non-zero net worth (COP 150,000,000) incorrectly flagged
   as required — fixed by removing the unreliable condition and
   description-gating instead, then re-run to a clean pass.
2. **Dividends + capital income + occasional gain + accountant
   signature** — the same taxpayer profile extended with COP 40,000,000
   gross capital income, a 2nd-sub-cédula dividend distribution, a COP
   15,000,000 occasional gain, and a net worth (COP 11,500,000,000) large
   enough to plausibly trigger the accountant-countersignature obligation,
   with `accountantOrFiscalAuditorCode`/`accountantProfessionalCardNumber`/
   `signedWithReservations` all supplied. **Result: valid** (no missing
   required fields, no enum/minimum violations) on the second run.

Both runs used only fabricated example values, consistent with this
document carrying no verbatim worked example from DIAN's own instructivo
casilla set (the instructivo's own worked example, on PDF page 21, walks
through the renta-presuntiva/rentas-exentas proration procedure with sample
numbers, not a full filled return).

## Candidates screened and not picked

- **Colombia Passport (Cancillería)** — the online renewal/change-of-data
  form (`tramitesmre.cancilleria.gov.co/tramites/enlinea/pasaporte/solicitar.xhtml`)
  is unauthenticated with real field IDs, but is legally restricted to
  renewal/change only (first-time applicants and minors are in-person-
  appointment-only with no field-level document), has only ~15 fields, and
  one key dropdown (`inputMotivoSolicitud`) is AJAX-populated so its exact
  coded option values are not present in the static HTML. Left as an open
  backlog candidate for a future cycle if a fuller source surfaces.
- **Colombia Visa (Cancillería e-visa)** — the public pre-check page
  (`solicitarVisa.xhtml`) exposes only a thin ~13-field lookup step; the real
  per-subtype field sets (Colombia has ~15–20 visa subtypes) live behind
  further AJAX-loaded panels requiring a live browser session. A 2018 "Guía
  de Usuario" PDF has real field tables but is fragmented across all
  subtypes and may be stale relative to the live 2026 wizard. Left as an
  open backlog candidate.
- **Colombia National ID/voter registration** — already screened in a prior
  cycle (GOV-1574) and confirmed a non-viable near-term candidate: the
  Registraduría's overseas-voter-registration microsite no longer resolves
  (election-cycle-scoped infrastructure whose 2026 registration deadlines
  have passed). Not re-attempted this cycle.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch the source PDF and confirm no newer edition has been
published, (b) independently re-derive the left/right coordinate-column
split for at least the casillas-108–123 range to confirm this document's
casilla ordering against a fresh extraction, and (c) have a reviewer with
Colombian tax-law familiarity assess judgment call 1 (the casilla 111
formula) against DIAN's own MUISCA system behavior or a further authoritative
source, since that is the single highest-uncertainty fact this document's
correctness depends on.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07**
(~6 months): this is the registry's first Colombian Taxes document, is the
largest single document authored for Colombia to date (132 fields), and
carries several disclosed judgment calls (including one flagged as
genuinely uncertain, judgment call 1) — all of which argue for the shorter
end of the cadence. Re-check the source and resolve the open judgment calls
on or before that date and on any `source.url` change (DIAN republishes this
form annually with a new edition year in the URL path).
