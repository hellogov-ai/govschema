# Verification record — `pe/sunat/formulario-virtual-709-declaracion-renta` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

GOV-2465, assigned directly by a prior "GovSchema Standard Research" cycle
(GOV-2456, 2026-07-12), which pre-scouted and logged this candidate as
CATALOG.md's own Known Gaps item 15: Peru's Taxes vertical, SUNAT's
Formulario Virtual N° 709, "Declaración de Renta Persona Natural" (the
individual annual income tax return). Peru stood at 3 of 6 verticals (Visa,
Business Formation, DMV) going into this cycle; this document opens the
Taxes vertical, bringing Peru to 4 of 6.

## Sources examined

- **Document `(id, version)`:** `pe/sunat/formulario-virtual-709-declaracion-renta` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Superintendencia Nacional de Aduanas y de Administración
  Tributaria (SUNAT).

### Legal-currency check overturned the issue's own named source

The issue brief named the 2024-edition guide
(`AYUDA%20FV_%20709_2024__0.pdf`) pre-scouted by GOV-2456. This cycle's
mandatory legal-currency check (step 2 of the issue's own authoring steps)
found that edition superseded before starting field modelling:

- `renta.sunat.gob.pe`'s own portal home page (fetched live, HTTP 200,
  2026-07-12) is currently running a **"Renta 2025"** campaign banner
  ("RENTA ANUAL 2025", "Renta Anual 2025", `renta-anual-2025`), not a 2024
  one.
- `renta.sunat.gob.pe/personas/ayuda-para-el-registro-del-formulario-ndeg-709`
  (fetched live, HTTP 200) — SUNAT's own dedicated guide page for this form —
  links only **`AYUDA_FV_%20709_2025.pdf`** (no 2024 link remains on that
  page) alongside `RS%20386-2025-SUNAT.pdf` (fetched live, HTTP 200 headers
  confirmed), the underlying Superintendencia resolution for the 2025
  campaign.
- The 2025 edition (fetched live, HTTP 200, 514013 bytes,
  `sha256:740f62f08e673a4671eb343eef30c741d735b4705fc4263a4f2e74e675fe0324`)
  states throughout its own text "Declaración Jurada Anual Persona Natural
  **2025**" and "durante el año **2025**" — this is the current, in-force
  edition, and is what this document is authored against, **not** the 2024
  edition named in the issue's own brief.
- **Retrieved / reviewed:** 2026-07-12.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

### Structural stability check across editions

Both the 2024 edition (fetched for comparison, HTTP 200, 648313 bytes,
`sha256:7b0fb84b13281352501146986c52c01fc29180461308882cac1c627c9458b6b4`)
and the current 2025 edition were extracted with `pdfjs-dist` (pinned 3.x,
a throwaway `/tmp` scratch install, not added to this repo's tracked
`package.json`) via `getTextContent()`, then programmatically diffed:

- Both are 36 pages.
- Both reference an **identical set of 67 distinct casilla numbers**
  (extracted via regex and diffed — zero differences), confirming the
  casilla-numbering scheme is stable year-over-year and this document's own
  `sourceRef` casilla citations will remain valid across future ejercicio
  editions.
- Only UIT-indexed monetary constants changed: the UIT itself is
  S/. 5,350 for 2025 (vs. S/. 5,150 for 2024); the cuarta-categoría 24-UIT
  deduction cap is S/. 128,400 (vs. S/. 123,600); the fixed 7-UIT deduction
  is S/. 37,450 (vs. S/. 36,050); the additional-deduction cap is 3 UIT =
  S/. 16,050 (vs. S/. 15,450); and the article-53 progressive-rate UIT
  brackets shifted accordingly (the 2025 edition's own bracket table is
  internally consistent — 45 UIT × S/. 5,350 = S/. 240,750 — unlike the 2024
  edition's own printed table, which had an internal arithmetic error at the
  45-UIT bracket, S/. 180,250 instead of the correct S/. 231,750; not
  material here since this document does not encode the 2024 figures).
- The Sección Informativa's own Rentas Exoneradas (Casilla 200) and Rentas
  Inafectas (Casilla 201) reference lists each grew by one and two items
  respectively between the two editions (the 2025 edition added a capital-
  gains-up-to-100-UIT exemption category and two Treasury-bond/ETF-related
  inafectación categories). This document's own `totalRentasExoneradas` and
  `totalRentasInafectas` fields model each casilla's own declared total, not
  each individual reference-list item underneath it, so this growth has no
  effect on the field surface — a schema authored this way remains valid
  even as SUNAT's own list of exempt/non-taxable income categories expands.

### Bot-mitigation note

`renta.sunat.gob.pe` returned HTTP 200 to a browser User-Agent
(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/124.0 Safari/537.36`) on every fetch attempted this cycle — no
login, CAPTCHA, or WAF challenge encountered on the guide PDF, the guide's
own landing page, the portal home page, or the cited resolution PDF.

## Extraction method

Both editions were extracted with `pdfjs-dist`'s `getTextContent()` across
all 36 pages (full text, no OCR needed — both are genuine text-layer PDFs).
Casilla numbers were cross-referenced by regex (`/[Cc]asilla\s*\d{2,4}/`)
across both editions to produce the structural-stability diff described
above.

## What the form maps to

Formulario Virtual 709 is divided into a Sección Informativa and a Sección
Determinativa, itself split into four tabs (Rentas de Capital – Primera
Categoría, Rentas de Capital – Segunda Categoría, Rentas de Trabajo y/o
Fuente Extranjera, and Determinación de Deuda, computed per income
category). This document models:

- **Sección Informativa — Tipo de Declaración:** `tipoDeclaracion` (system-
  determined original vs. substitute/amending declaration),
  `declaraRentasTrabajoYFuenteExtranjera` (the source's own "Tipo de Renta
  que se declara" checkbox (c), this document's own scope anchor — see
  below), and `modalidadDeclaracion` (Personal vs. Sociedad Conyugal).
- **Sección Informativa — Otros Ingresos:** `tieneRentasExoneradas` /
  `totalRentasExoneradas` (Casilla 200), `tieneRentasInafectas` /
  `totalRentasInafectas` (Casilla 201), `resultadoActividadesTerceraCategoria`
  (Casilla 203), `dividendosPercibidos` (Casilla 998),
  `rentaFuenteExtranjeraExclusivaCDI` (Casilla 999), the four
  `liberalidadRecibida*` fields plus `liberalidadRecibidaOtrosDescripcion`
  (Casilla 902's own four named sub-options), and `totalIngresosEjercicio`
  (Casilla 518, the source's own auto-calculated total, modelled per this
  registry's convention of including a source's own casilla-level totals
  even when system-calculated — see the `vn/gdt` precedent).
- **Rentas de Trabajo (Cuarta y Quinta Categoría) y/o Fuente Extranjera:**
  all fifteen casillas from `rentaBrutaCuartaCategoriaEjercicioIndividual`
  (Casilla 107) through `totalRentaImponibleTrabajoYFuenteExtranjera`
  (Casilla 517), covering cuarta-categoría gross/net income, otras rentas
  cuarta categoría (director/síndico/etc.), quinta-categoría remuneration,
  the fixed 7 UIT and additional-up-to-3-UIT deductions, ITF and donation
  deductions, and net foreign-source income.
- **Determinación de Deuda — Rentas de Trabajo y/o Fuente Extranjera:** all
  fourteen casillas from `impuestoRentaTrabajoYFuenteExtranjera`
  (Casilla 120) through `importeAPagar` (Casilla 168), covering the tax
  computed at article 53's progressive rates, the foreign-tax credit, prior-
  ejercicio credit balances, direct payments and withholdings, the
  refund-vs-apply election, moratory interest, and the final balance due/
  amount paid.
- **`saldoFavorContribuyenteTrabajoFuenteExtranjera` (Casilla 141)** is a
  disclosed departure from every other casilla in this section: the guide
  references it only inline, while describing `indicadorUsoSaldoFavor`'s own
  gating condition ("La respuesta es obligatoria en caso resulte un saldo a
  favor del contribuyente en la casilla 141..."), rather than in its own
  dedicated numbered `● Casilla NNN (...)` paragraph as it does for every
  other Determinación de Deuda casilla. It is still modelled, since the
  guide's own text makes its meaning and role (gating
  `indicadorUsoSaldoFavor`) unambiguous.

## What is NOT modelled (out of scope), and why

- **Rentas de Capital – Primera Categoría** (rental/lease income from real
  or personal property, Casillas 100, 102, 557, 558, 133, 153, 156, 159,
  161-166, and the "indicador de utilización del saldo a favor" for that
  category) and **Rentas de Capital – Segunda Categoría** (capital gains
  from the sale of securities, Casillas 350, 353-359, 362-366, 385) — both
  are genuinely distinct income categories from rentas de trabajo, each with
  their own multi-step wizards (arrendatario/bien identification, Bolsa de
  Valores vs. Fondos y Fideicomisos sourcing, costo computable vs. precio de
  venta comparisons) that this issue's own scope note (rentas de trabajo,
  rentas de fuente extranjera, deductions) does not name. A well-bounded
  companion-schedule candidate for a future cycle, flagged in the schema's
  own top-level `description`.
- **Sección Informativa's own Condóminos / Alquileres Pagados / Atribución
  de Gastos sub-sections** — all three are specific to Primera Categoría
  rental income (co-ownership shares, tenant payment detail, and
  spousal/concubine expense attribution over those same rental payments),
  so they are out of scope for the same reason as Primera Categoría itself,
  not independently scoped out.
- **The "Personal" vs. "Sociedad Conyugal" sub-question specific to Primera
  Categoría** ("¿Las rentas obtenidas de Primera Categoría, incluye su
  participación como Sociedad Conyugal?", with its own conditional cónyuge
  tipo/número de documento fields) — this is a Primera-Categoría-specific
  refinement of `modalidadDeclaracion`, not the general declaration-modality
  setting itself (which this document does model), and is out of scope for
  the same Primera Categoría exclusion.
- **Per-transaction wizard detail behind every "asistente"-fed casilla** —
  e.g. the individual recibos por honorarios behind Casilla 107, the
  monthly remuneraciones behind Casilla 111, the per-country foreign-tax
  credits behind Casilla 122, the per-formulario direct payments behind
  Casillas 127/128/130/131/144. Each of these wizards accepts an open-ended
  number of entries (unlike this registry's established bounded-repeating-
  group convention for a fixed small N, e.g. `tributo1`/`tributo2` in
  `pe/sunat/solicitud-inscripcion-ruc-persona-natural`), so this document
  models each casilla's own declared total only — a disclosed judgment call
  consistent with how `totalIngresosEjercicio` (Casilla 518) and every other
  "casilla no editable" total in this document is modelled.
- **Casilla 514's own five expense sub-categories** (Alquileres at 30%,
  EsSalud trabajadores del hogar at 100%, servicios profesionales at 30%,
  hoteles y restaurantes at 15%, and servicios médicos y odontólogos — this
  fifth category's own rate is not stated anywhere in the guide's own
  36 pages, which end mid-detail on the hoteles/restaurantes category) —
  modelled as a single `deduccionAdicional3UIT` total, for the same
  open-ended-wizard reason above; each sub-category's own detailed
  per-receipt validation rules are documented on SUNAT's separate
  "Plataforma de Deducción de Gastos Deducibles" portal, which this guide
  itself points to rather than fully restating.
- **No `documents[]` array** — unlike this registry's `pe/cancilleria` and
  `pe/sunat` (RUC) sibling schemas, FV 709 is filed entirely through SUNAT's
  online Clave-SOL portal against SUNAT's own pre-populated "información
  referencial" (comprobantes already registered through the Sistema de
  Emisión Electrónica); the 36-page guide contains no instruction to attach,
  upload, or scan any supporting document. Confirmed by a full-text search
  of both editions for "adjunt", "anexe", "sustente"/"sustento", and
  "escaneado" — every hit found refers to a legal-basis citation ("sustento
  legal el artículo 36° de la LIR") or a receipt type the wizard already
  references electronically (a "comprobante" already in SUNAT's own SEE
  system), never an applicant-side file upload. This is why this document's
  mutation-control set (below) does not include a documents[]-requiredness
  control — the registry's established documents[]-blind-spot convention
  applies only "if the schema has one" (per this issue's own phrasing), and
  this one does not.
- **The taxpayer's own identity (RUC/DNI)** — implicit in the Clave-SOL
  authenticated session under which FV 709 is filed; the guide's own
  36 pages never ask the filer to re-enter their own identity document,
  unlike a form filed anonymously or on behalf of a third party.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against two realistic
scenarios plus three negative controls, all committed under
`conformance/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0/`:

```
[PASS-0-ERR] scenario-a-independiente-cuarta-categoria-deuda.json
[PASS-0-ERR] scenario-b-dependiente-quinta-categoria-devolucion.json
[ERRORS:1] mutation-control-missing-required-field.json
    missing required field: declaraRentasTrabajoYFuenteExtranjera
[ERRORS:1] mutation-control-missing-conditional-exonerada-field.json
    missing required field: totalRentasExoneradas
[ERRORS:1] mutation-control-missing-conditional-saldo-favor-field.json
    missing required field: indicadorUsoSaldoFavor
```

- **Scenario A** models an independent professional (only cuarta categoría
  income, e.g. a consultant issuing recibos por honorarios) filing an
  original declaration, no exempt/non-taxable income, no foreign income, no
  prior credit balance, and a small resulting balance due
  (`saldoDeudaTributaria` = 76, `importeAPagar` = 76).
- **Scenario B** models a dependent employee (quinta categoría) also
  reporting exempt income, non-taxable income, dividends, and a cash
  donation received, plus net foreign-source income, filing a substitute/
  amending declaration under sociedad conyugal modality, with sufficient
  withholdings and a prior-ejercicio credit balance to produce a resulting
  credit balance in the taxpayer's own favor (`saldoFavorContribuyenteTrabajoFuenteExtranjera`
  = 3110, `indicadorUsoSaldoFavor` = `DEVOLUCION`), and no balance due
  (`saldoDeudaTributaria` = 0, so `importeAPagar` is correctly absent).
- **Mutation control 1** (top-level `required` field) removes
  `declaraRentasTrabajoYFuenteExtranjera` from Scenario A.
- **Mutation control 2** (`requiredWhen`/`equals`) flips Scenario A's
  `tieneRentasExoneradas` to `true` without adding the now-required
  `totalRentasExoneradas`.
- **Mutation control 3** (`requiredWhen`/`greaterThan` — this document's own
  first use of that operator in this registry, exercised deliberately since
  it is otherwise untested) removes `indicadorUsoSaldoFavor` from Scenario B
  while `saldoFavorContribuyenteTrabajoFuenteExtranjera` remains positive.

All three negative controls raised exactly one error each, and no scenario
raised an unexpected error — no defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate-ajv.mjs registry/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0/schema.json
ok   registry/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/validate.mjs registry/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0/schema.json
ok   registry/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0/schema.json
1/1 document(s) passed.
```

`node tools/verify-sources.mjs registry/pe/sunat/formulario-virtual-709-declaracion-renta/1.0.0`
was re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Peru's Taxes vertical's first document, bringing Peru to 4 of 6
  verticals (Visa, Business Formation, DMV, Taxes) — Passport (Migraciones)
  and National ID (RENIEC DNI) remain appointment/biometric-gated, per this
  registry's existing findings.
- `jurisdiction.level` is `national` — SUNAT is Peru's national tax
  administration.
- `process.type` is `filing`, consistent with this registry's other annual
  tax-return schemas (e.g. `fi/vero/50a-earned-income-and-deductions`), not
  `application` or `registration`.
- `version` set to `1.0.0`: this document models one complete, self-
  contained procedural scope (the rentas de trabajo y/o fuente extranjera
  path) in full for the ejercicio the current guide edition covers; the
  excluded rentas de capital tabs are a disclosed companion-schedule
  candidate, not a sibling-variant ambiguity.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-12** (6
months). A future review should prioritize: (1) the excluded Rentas de
Capital – Primera y Segunda Categoría tabs as a companion-schedule
candidate on this same FV 709 guide; and (2) re-confirming which guide
edition (2025, or a newer one) is current at that time, given this cycle's
own finding that the 2024 edition named in its source issue had already
been superseded.

## Review-gate correction (GOV-2467)

Independent re-derivation (fresh PDF re-fetch of both editions matching
the claimed sha256 hashes byte-for-byte, own `pdfjs-dist` text extraction,
and an own from-scratch conformance checker reproducing all 5 fixture
results) found the schema's field surface, casilla-formula cross-checks,
and every mutation-control result to be accurate. One stale citation was
found and fixed: `saldoFavorEjercicioAnteriorReferencial`'s `sourceRef`
quoted "Casilla 167 (Saldo a favor del ejercicio **2023**...)" — the 2024
edition's own wording — left over from before this document was pivoted to
the current 2025 edition, which reads "...ejercicio **2024**..." (confirmed
directly against both freshly re-fetched PDFs). Corrected in `schema.json`;
no other fields were affected.
