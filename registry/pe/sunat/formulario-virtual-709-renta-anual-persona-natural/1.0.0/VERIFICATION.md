# Verification record — `pe/sunat/formulario-virtual-709-renta-anual-persona-natural` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This cycle authors against CATALOG.md's own "Known Gaps & Opportunities"
section, item 15 (the GOV-2456 cycle's own note), which had independently
scouted and vetted SUNAT's Formulario Virtual 709 as Peru's strongest
pre-scouted Taxes candidate, ready to author in a future cycle.

## Why this candidate

Item 15 named the source as
`https://renta.sunat.gob.pe/sites/default/files/inline-files/AYUDA%20FV_%20709_2024__0.pdf`
— a genuine, unauthenticated (HTTP 200, no login/CAPTCHA/WAF), 36-page prose
guide ("Ayuda FV-709") walking through Formulario Virtual N° 709's numbered
casillas field-by-field. Formulario Virtual N° 709 itself is filed through
SUNAT Operaciones en Línea, authenticated with a Clave SOL login — no live
AcroForm/HTML form exists to extract directly. This is therefore a
**structural-reference schema**, authored from the guide's own casilla-numbered
walkthrough, the same tier as this registry's existing `jp/houmukyoku` and
`pe/sunat/solicitud-inscripcion-ruc-persona-natural` precedents.

## Legal-currency check (this cycle's own re-verification, not trusting the prior cycle's citation)

Re-fetching the exact URL item 15 cited returned a PDF (`sha256` below) whose
own embedded metadata reads `CreationDate: 2025-03-10`, `ModDate: 2025-03-31` —
consistent with a guide published to support the **2025 filing season for tax
year 2024** ("Renta 2024", filed by taxpayers in 2025), not a currently-open
filing season. A web search for the current edition surfaced:

- `https://renta.sunat.gob.pe/sites/default/files/inline-files/AYUDA_FV_%20709_2025.pdf`
  ("Ayuda para el Registro del Formulario Virtual N° 709 — Renta Anual
  Persona Natural 2025"), and
- `https://renta.sunat.gob.pe/landing/formulario-709` and
  `https://renta.sunat.gob.pe/personas/cronograma-de-declaracion-renta-anual-2025-formulario-ndeg-709`,
  both live pages under SUNAT's current "Renta 2025" campaign microsite,
  confirming Formulario Virtual N° 709 — Renta Anual 2025 has been available
  in SUNAT Operaciones en Línea since 31 March 2026, under legal basis
  **Resolución de Superintendencia N° 386-2025/SUNAT**.

Fetching the 2025-edition URL directly returned a PDF whose own embedded
metadata reads `CreationDate: 2026-02-13`, `ModDate: 2026-02-13` — created
ahead of the form's own 31 March 2026 launch date, and internally self-titled
throughout as "Persona Natural 2025" (e.g. p.2: "Pasos para el llenado de la
Declaración Jurada Anual Persona Natural 2025 mediante el Formulario Virtual
Nº 709"). **This document is authored from the 2025 edition, not the 2024
edition item 15 originally named** — the same "always re-check for a newer
edition before authoring" discipline this registry's `vn/xuatnhapcanh` and
`vn/gdt` cycles established for superseded circulars. Both editions were kept
for the diff (see Source 1/2 below); no field, casilla number, or UIT-derived
constant differs between the two beyond the tax year and its UIT-indexed peso
amounts (UIT for 2025 is S/ 5,350, unchanged from 2024), so this is a genuine
same-shape edition refresh, not a restructuring — but the 2025 copy is the one
actually cited throughout this document's `fields[]` and `source.url`.

No further superseding resolution (a hypothetical 2026-edition guide, or a
resolution amending FV-709's structure mid-campaign) was found; the "Renta
2025" campaign is the current one as of this review (2026-07-12).

## Sources examined

### Source 1 (primary `source`, current 2025-edition guide)

- **Authority:** Superintendencia Nacional de Aduanas y de Administración
  Tributaria (SUNAT)
- **Document:** "Ayuda para el Registro del Formulario Virtual N° 709 — Renta
  Anual Persona Natural" (2025 edition)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://renta.sunat.gob.pe/sites/default/files/inline-files/AYUDA_FV_%20709_2025.pdf>
- **File identity:** `sha256:740f62f08e673a4671eb343eef30c741d735b4705fc4263a4f2e74e675fe0324`,
  514,013 bytes, PDF 1.6, `IsAcroFormPresent: false`, 0 AcroForm widgets across
  all 36 pages (confirmed via `pdfjs-dist` `page.getAnnotations()`).
  `CreationDate: 2026-02-13`, `Creator: Acrobat PDFMaker 25 para Word`,
  `Producer: Adobe PDF Library 25.1.192`.
- **Extraction method:** `pdfjs-dist` (legacy build, v3.11.174)
  `page.getTextContent()`, position-sorted by `transform` y/x and grouped into
  lines by y-coordinate proximity, run across all 36 pages.
- **Retrieved / reviewed:** 2026-07-12

### Source 2 (prior edition, examined for the legal-currency check only, not used as primary)

- **URL:** <https://renta.sunat.gob.pe/sites/default/files/inline-files/AYUDA%20FV_%20709_2024__0.pdf>
  (the exact URL CATALOG.md item 15 cited)
- **File identity:** `sha256:7b0fb84b13281352501146986c52c01fc29180461308882cac1c627c9458b6b4`,
  648,313 bytes, PDF 1.6, `IsAcroFormPresent: false`, 0 AcroForm widgets.
  `CreationDate: 2025-03-10`, `Creator: Acrobat PDFMaker 24 para Word`,
  `Producer: Adobe PDF Library 24.5.175`.
- **Why not used as primary:** superseded by Source 1 — a 2024-tax-year
  edition of the same guide, current for the 2025 filing season, not the
  2026 filing season this review falls within. Retained only to diff against
  Source 1 for the legal-currency check above.
- **Retrieved / reviewed:** 2026-07-12

### Source 3 (companion instructions booklet, cross-reference for scope/eligibility prose)

- **URL:** <https://renta.sunat.gob.pe/sites/default/files/inline-files/Cartilla%20Instrucciones%20Personas%20(1)_0.pdf>
  ("Rentas de Personas Naturales — Cartilla de Instrucciones 2025 — Declara y
  Paga")
- **File identity:** `sha256:1928d5d2e85b3e2372b02f6a36981ee5fe8eb1cd1623f87c404296b4ef368ce4`,
  381,007 bytes, PDF 1.7, 0 AcroForm widgets, 30 pages.
  `CreationDate`/`ModDate: 2025-12-19`, `Creator: Adobe InDesign 21.0
  (Macintosh)`, `Producer: Adobe PDF Library 18.0`.
- **Used for:** the `ejercicioGravable` field's own sourcing (§1 Generalidades:
  "Ejercicio Gravable: Del 1 de enero al 31 de diciembre de 2025"; "Unidad
  Impositiva Tributaria (UIT): Cinco mil trecientos cincuenta y 00/100 soles
  (S/ 5,350)"), and general who-must-file/contributor-type background
  (personas naturales, sucesión indivisa, sociedad conyugal) — not itself a
  source of casilla-numbered field detail, which comes entirely from Source 1.
- **Retrieved / reviewed:** 2026-07-12

### Source 4 (web search corroboration for the legal-currency check)

- Search results confirming the 2025-edition guide, the live "Renta 2025"
  campaign microsite (`renta.sunat.gob.pe/landing/formulario-709`,
  `renta.sunat.gob.pe/personas/ayuda-para-el-registro-del-formulario-ndeg-709`,
  `renta.sunat.gob.pe/personas/cronograma-de-declaracion-renta-anual-2025-formulario-ndeg-709`),
  and the legal basis (Resolución de Superintendencia N° 386-2025/SUNAT) and
  31 March 2026 availability date for Formulario Virtual N° 709 — Renta Anual
  2025 in SUNAT Operaciones en Línea.
- **Retrieved / reviewed:** 2026-07-12

## Field inventory (Phase 3)

All casilla numbers below are cited from Source 1 (`AYUDA_FV_709_2025.pdf`)
unless otherwise noted. Every `fields[]` entry's `sourceRef` in `schema.json`
cites its own casilla number and section (Sección Informativa / Rentas de
Trabajo y/o Fuente Extranjera / Determinación de la Deuda).

| Field (schema `name`) | Casilla | Notes |
|---|---|---|
| `ejercicioGravable` | — | Sourced from the Cartilla (Source 3), not a distinct FV-709 casilla |
| `tipoDeclaracion` | Tipo de Declaración | Original / Sustitutoria-Rectificatoria |
| `tieneRentasExoneradas` / `totalRentasExoneradas` | Casilla 200 | Both explicitly marked "la respuesta es obligatoria" for the boolean gate |
| `tieneRentasInafectas` / `totalRentasInafectas` | Casilla 201 | Same obligatoriedad pattern |
| `dividendosPercibidos` | Casilla 998 | |
| `rentaFuenteExtranjeraConvenioDobleImposicion` | Casilla 999 | |
| `liberalidadDonacionRecibida` / `liberalidadAnticipoLegitimaRecibido` / `liberalidadHerenciaRecibida` / `liberalidadOtrosMonto` / `liberalidadOtrosDetalle` | Casilla 902 | Four registrable sub-categories of one casilla, flattened per this registry's bounded-repeating-group convention |
| `rentaBrutaCuartaCategoria` | Casilla 107 | |
| `deduccionCuartaCategoria` | Casilla 507 | Computed, capped at 24 UIT = S/ 128,400 for 2025 |
| `rentaNetaCuartaCategoriaIndividual` | Casilla 508 | Computed = 107 − 507 |
| `otrasRentasCuartaCategoria` | Casilla 108 | |
| `totalRentasCuartaCategoria` | Casilla 509 | Computed = 508 + 108 |
| `totalRentaQuintaCategoria` | Casilla 111 | |
| `totalRentasCuartaQuintaCategoria` | Casilla 510 | Computed = 509 + 111 |
| `deduccion7UIT` | Casilla 511 | Computed, fixed at 7 UIT = S/ 37,450 for 2025 |
| `deduccionAdicional3UIT` | Casilla 514 | Aggregate of the Anexo's 5 itemized categories, see judgment call below |
| `totalRentaNetaCuartaQuintaCategoria` | Casilla 512 | Computed = 510 − 511 − 514 |
| `deduccionITF` | Casilla 522 | |
| `gastosPorDonaciones` | Casilla 519 | |
| `subtotalRentaNetaTrabajo` | Casilla 513 | Computed = 512 − (522 + 519) |
| `totalRentaNetaFuenteExtranjera` | Casilla 116 | |
| `totalRentaImponibleTrabajoFuenteExtranjera` | Casilla 517 | Computed = 513 + 116 |
| `impuestoRentaTrabajoFuenteExtranjera` | Casilla 120 | Computed via Article 53 LIR progressive rates on 517 |
| `creditoImpuestoRentaFuenteExtranjera` | Casilla 122 | |
| `subtotalImpuestoTrabajoFuenteExtranjera` | Casilla 158 | Computed = 120 − 122 |
| `saldoAFavorEjercicioAnteriorTrabajo` | Casilla 125 | |
| `pagoDirectoCuartaCategoria` | Casilla 127 | |
| `pagoDirectoQuintaCategoria` | Casilla 128 | |
| `retencionCuartaCategoria` | Casilla 130 | |
| `rucAgenteRetencionCuartaCategoria` | Casilla 130 (asistente) | |
| `retencionQuintaCategoria` | Casilla 131 | |
| `indicadorSaldoAFavorTrabajo` | (Indicador, no casilla number given) | Obligatoriedad condition disclosed as a judgment call below |
| `saldoDeudaTributariaTrabajo` | Casilla 146 | Computed |
| `importeAPagarTrabajo` | Casilla 168 | |

## Scoping and disclosure

This schema is deliberately narrower than the full FV-709. The guide itself
documents four "pestañas" (tabs) under its Sección Determinativa:

1. **Rentas de Capital — Primera Categoría** (rental/lease income; Casillas
   100, 102, 557, 558, 501, 502, 515, and their own Determinación de la Deuda
   sub-block, Casillas 153/367/156/133/161/162/163/164/166) — **out of scope**.
   This tab has its own extensive repeatable-assistant data model (tenant
   identity/document, property type, plate/registration numbers, per-payment
   period detail) structurally unrelated to the labor/foreign-income path,
   and would roughly double this schema's field count for a tenant-facing
   income type distinct from wage/independent-service income.
2. **Rentas de Capital — Segunda Categoría** (securities capital gains/losses;
   Casillas 350, 353, 354, 355, 385, 356, and their own Determinación de la
   Deuda sub-block, Casillas 357/388/358/359/360/362/363/364/365/366) — **out
   of scope**, for the same reason: a securities-disposal-specific repeatable
   data model (fund/exchange venue, MILA cross-border rules, cost basis vs.
   net proceeds) unrelated to the labor/foreign-income path this schema
   covers.
3. **Rentas de Trabajo y/o Fuente Extranjera** (fourth/fifth-category labor
   income and/or foreign-source income) — **in scope**, per this cycle's
   brief: this is both the path the guide documents most thoroughly in
   narrative terms and the one applicable to the largest share of individual
   filers (wage earners and independent professionals, with or without
   foreign income).
4. **Determinación de la Deuda** — modelled only for the Rentas de Trabajo
   y/o Fuente Extranjera slice (Casillas 120/122/158/125/127/128/130/131/
   146/168 and the saldo-a-favor indicator); the Primera and Segunda
   Categoría slices of this same tab are out of scope for the same reason
   as (1)/(2) above.

**Casilla 203** ("Resultado por actividades generadoras de rentas de 3ra
categoría"), which pulls a figure from the separate Formulario Virtual N°
710 — Renta Anual — Tercera Categoría for a natural person who also runs a
sole-proprietorship business, is explicitly out of scope: that figure
originates entirely in a different return this registry does not yet model,
matching this cycle's brief to disclose "business/rentas de tercera
categoría" as out of scope rather than force-fitting a cross-form dependency.

**No `documents[]` array is modelled.** Unlike this registry's paper-form or
consular schemas, FV-709 requires no document upload: every supporting
figure (electronic receipts via SEE-SOL, withholding certificates, RUC-linked
payments) is validated by SUNAT against its own internal database of already-
registered comprobantes before the taxpayer edits/confirms it, per the guide's
own repeated "siempre que este formulario/comprobante exista en la base de
SUNAT" language for the Casilla 514 additional-deduction assistants — there is
no applicant-supplied file for SUNAT to receive. This mirrors
`pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s own "no documents[]"
disclosure (for a different reason — an in-person exhibited ID there, vs. an
internally-validated electronic comprobante here). No sworn-declaration/
attestation statement text (e.g. a "declaro bajo juramento..." clause) appears
anywhere in the guide's own text, so this schema does not fabricate an
`attestation`-category `documents[]` entry either; submission is authenticated
entirely by the taxpayer's own Clave SOL login, not a separate signed
statement captured in the guide.

## Judgment calls

1. **`deduccionAdicional3UIT` (Casilla 514) is modelled as one aggregate
   number, not decomposed into its five itemized categories** (alquileres de
   inmuebles at 30%, aportaciones EsSalud de trabajadores del hogar at 100%,
   servicios profesionales/recibos por honorarios at 30%, hoteles y
   restaurantes at 15%, per the guide's own Anexo). Each category carries its
   own comprobante-type validation rules (RHE, BVE, Formulario 1676, FV
   1683) that would roughly double this already-scoped section's field
   count for a deduction that, once computed, feeds into Casilla 512 as a
   single number regardless of its composition. Disclosed as a deliberate
   scope trim, following this cycle's brief to avoid bloating the schema
   with narrow sub-sections.
2. **`indicadorSaldoAFavorTrabajo`'s true obligatoriedad condition (triggered
   whenever the guide's own referenced "Casilla 141" yields a credit
   balance) is not encoded as a `requiredWhen`.** The guide references
   Casilla 141 only in passing ("La respuesta es obligatoria en caso resulte
   un saldo a favor del contribuyente en la casilla 141") without ever
   walking through it with its own "● Casilla 141 (...)" heading the way
   every other casilla in this document is introduced — unlike Casilla 146
   (saldo de la deuda, the debt-owed mirror case), which the guide does
   spell out in full and which this schema does use for `importeAPagarTrabajo`'s
   `requiredWhen`. Rather than infer an unstated formula for Casilla 141
   (plausibly the negative-branch complement of Casilla 146's computation),
   this field is modelled as optional with its real conditional
   obligatoriedad disclosed here in prose — a deliberate, disclosed judgment
   call rather than a silently fabricated condition.
3. **`totalRentaNetaFuenteExtranjera` (Casilla 116) is modelled with
   `minimum: 0`**, even though the guide describes it as the *net* result of
   summing and compensating potentially many individual foreign-income-source
   entries (each of which, per Casilla 116's own assistant, can itself be
   negative for a loss). The guide is explicit that the casilla itself is
   populated "únicamente si de dichas operaciones resultara una renta neta"
   (only if a net positive results) — i.e. Casilla 116 is defined to never be
   negative even though its component entries can be, so `minimum: 0` on the
   modelled aggregate is faithful to the source, not a simplification.
4. **The `crossFieldValidation` rule (`importeAPagarNotGreaterThanSaldoDeuda`)
   is sourced directly from Casilla 168's own instruction**: "Ingrese aquí el
   importe a pagar por rentas del trabajo y fuente extranjera. El monto que se
   registre no puede ser mayor al que figura en la casilla 146" — the same
   "importe a pagar must not exceed the computed balance owed" instruction
   pattern the guide repeats for the equivalent casilla on each of the other
   two renta-type tabs (Casillas 166 and 366), which this schema does not
   model since those tabs are out of scope.
5. **Peru's other two open verticals (National ID, Passport) remain
   appointment/biometric-gated** per this registry's prior cycles' findings,
   unchanged this cycle. Peru now stands at 4 of 6 verticals (Visa, Business
   Formation, DMV, Taxes).

## Test run (Phase 4)

No live submission was attempted: Formulario Virtual N° 709 is filed through
SUNAT Operaciones en Línea, which requires an authenticated Clave SOL login —
there is no unauthenticated endpoint to submit fabricated data against, the
same reasoning already documented for this registry's other login-gated
government e-filing schemas.

Instead, two independent worked mock records were built from this document's
own field inventory and checked with a purpose-written script
(`_tmp_validate_instance.mjs`, not committed — mirrors the approach used by
`pe/sunat/solicitud-inscripcion-ruc-persona-natural` and
`vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`): compiles `schema.json`'s
`fields[]` into a JSON Schema draft 2020-12 document checked with `ajv`, plus
a from-scratch evaluator for the shared Condition grammar (covering
`equals`/`notEquals`/`in`/`greaterThan`/`greaterThanOrEqual`/`lessThan`/
`lessThanOrEqual` and `all`/`any`/`not` composition, used by this document's
`requiredWhen` conditions) and this document's single `crossFieldValidation`
`compare` rule. This document has no `documents[]`, so the checker's
documents[]-requiredness pass (included for parity with this registry's own
documents-blind-spot postmortem) is a no-op here, not skipped outright.

```
$ node _tmp_validate_instance.mjs registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json \
    conformance/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/asalariado-quinta-categoria-sin-saldo.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
crossFieldValidation: PASS
OVERALL: PASS

$ node _tmp_validate_instance.mjs registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json \
    conformance/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/independiente-fuente-extranjera-con-deducciones.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS
crossFieldValidation: PASS
OVERALL: PASS
```

The first scenario is a simple wage-only (Quinta Categoría) filer with no
fourth-category income, no exonerated/inafecta income, and a withholding that
exactly matches the computed tax (zero balance). The second is an independent
professional (Cuarta Categoría) with fourth-category withholding, foreign-
source income, the additional 3-UIT deduction, an ITF deduction, a donation
deduction, and a resulting balance owed.

**Mutation controls** — three negative fixtures, each targeting a distinct
validation rule, every one raising exactly one error:

```
$ # mutation-control-missing-required-field.json: 'totalRentasCuartaCategoria' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'totalRentasCuartaCategoria'
requiredWhen/documents[] conditional validation: PASS
crossFieldValidation: PASS
OVERALL: FAIL

$ # mutation-control-ruc-pattern-violation.json: 'rucAgenteRetencionCuartaCategoria' set to 'ABC123'
Static (required/type/pattern/enum) validation: FAIL
 - /rucAgenteRetencionCuartaCategoria must match pattern "^[0-9]{11}$"
requiredWhen/documents[] conditional validation: PASS
crossFieldValidation: PASS
OVERALL: FAIL

$ # mutation-control-missing-conditional-ruc-field.json: 'retencionCuartaCategoria' > 0 retained,
$ # but 'rucAgenteRetencionCuartaCategoria' (requiredWhen retencionCuartaCategoria greaterThan 0) removed
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - field 'rucAgenteRetencionCuartaCategoria' is required (requiredWhen matched) but not provided
crossFieldValidation: PASS
OVERALL: FAIL
```

The third case specifically exercises a `requiredWhen` condition using the
`greaterThan` operator (as opposed to the more common `equals`/`in`) — a
validator that only understands equality-based conditions would incorrectly
accept this fixture, which is exactly the gap this fixture exists to catch.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json
ok   registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json
ok   registry/pe/sunat/formulario-virtual-709-renta-anual-persona-natural/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators also passed clean (377/377 documents,
including 3 `mapping.json` companions), and
`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` (in `tools/govschema-client/`, after `npm ci --include=dev`
since a plain `npm ci` under a local `NODE_ENV=production` skips `ajv`'s
devDependency install) to include this document's entry.

## Peru's remaining two verticals (screened this cycle, not authored)

Peru now stands at 4 of 6 verticals (Visa, Business Formation, DMV, Taxes).
National ID (RENIEC DNI) and Passport (Migraciones) remain
appointment/biometric-gated, per this registry's prior-cycle findings —
unchanged this cycle, since this cycle's focus was the pre-scouted Taxes
candidate from CATALOG.md item 15.
