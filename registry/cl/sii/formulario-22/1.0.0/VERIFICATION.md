# Verification record — `cl/sii/formulario-22` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is a `GovSchema Standard Research` cycle (**GOV-1744**), closing Chile's
Taxes vertical (3/6). Four prior cycles — GOV-1624 (opened Chile via Business
Formation), GOV-1638 (closed DMV), GOV-1645 (opened Spain, re-screening Chile
along the way), and GOV-1659 (closed Spain's Business Formation, re-screening
Chile again) — had each independently screened SII's Formulario 22 (F-22) and
deferred it every time: a genuine, current, unauthenticated PDF, but SII's
largest, most complex return, with no AcroForm field layer at all. This cycle
was assigned specifically to attempt F-22 rather than defer it a fifth time,
using `pl/mf/zeznanie-pit-37` (GOV-1691, Poland's PIT-37) as the precedent for
how to scope an unbounded national income-tax return down to a single common
taxpayer case.

## Why this candidate

Chile stood at 2/6 verticals (Business Formation, DMV) going into this cycle,
the registry's weakest jurisdiction. Formulario 22 was the assigned
candidate; per the brief, this cycle also lightly re-screened Chile's
remaining gaps (Passport, National ID, Visa) rather than assuming the prior
cycles' findings still held.

### Re-screen: Chile Passport / National ID (Registro Civil)

`registrocivil.cl` was re-fetched directly this cycle. The root domain now
returns an explicit WAF rejection page on a direct, unauthenticated request:

```
HTTP/1.1 200 OK
...
<html><head><title>Request Rejected</title></head><body>The requested URL
was rejected. Please consult with your administrator...
```

This is a *harder*-gated finding than prior cycles reported (a ClaveÚnica
login redirect), but the substantive conclusion is unchanged from GOV-1624,
GOV-1645, and GOV-1666's own re-screens: no unauthenticated, field-by-field
form is reachable. Not a stronger candidate than F-22. Not pivoted to.

### Re-screen: Chile Visa

Both `evisa.minrel.gob.cl` and `tramites.minrel.gob.cl` fail to resolve via
DNS from this environment (`curl: (6) Could not resolve host`). Consistent
with every prior cycle's finding that Chile's Visa channel has never
successfully been reached. Not a stronger candidate than F-22. Not pivoted
to.

Both re-screens confirm the brief's assumption: Formulario 22 remains the
strongest — indeed the only reachable, unauthenticated, field-by-field-source
— open Chile candidate this cycle.

## Sources examined

### Source 1 (primary `source`, the form specimen)

- **Authority:** Servicio de Impuestos Internos (SII).
- **Document:** Formulario 22 (F-22), "Declaración de Renta," Año Tributario
  2026 (the current tax year at review time — Chile's Operación Renta filing
  period runs through April of the year following the "año comercial" the
  return covers).
- **URL (specimen PDF):** <https://www.sii.cl/ayudas/formularios/f22_at2026.pdf>
  — direct `curl`, HTTP 200, no login/CAPTCHA/WAF, `Content-Type:
  application/pdf`, 1,374,257 bytes, 15 pages.
- **Retrieved / reviewed:** 2026-07-08.
- **Extraction method:** downloaded directly, parsed with `pdfjs-dist`
  (`legacy/build/pdf.mjs`). `page.getAnnotations()` returned **zero** Widget
  annotations across all 15 pages — confirming, independently, the same
  finding every one of the four prior cycles reported: F-22's own specimen
  PDF is a static print/reference template, not a fillable AcroForm. Page
  text was then extracted via `page.getTextContent()`, which surfaces every
  printed recuadro/línea/código label, though in a jumbled reading order
  across the form's dense grid layout (SII's own numbered códigos, not
  reading-order text flow, are the authoritative cross-reference for this
  document's `sourceRef`s).
- **What it confirms:** the exact printed labels for Recuadro N°0's
  Información Personal block (`RUT`, `Domicilio`, `Correo electrónico`,
  `Telefóno` — printed without its accent on the source form, reproduced
  verbatim in this document's own field `label` — `Nombre`, `Actividad,
  profesión o giro del negocio`), and the presence/absence of every código
  this document cites, cross-checked against the interactive tool below.

### Source 2 (the interactive per-línea instruction tool — the field-by-field source)

Every prior cycle's screening record (see `cl/sii/aviso-venta-vehiculo`'s own
VERIFICATION.md) treated F-22 as effectively unsourceable beyond the bare
specimen PDF and the topical "Guía Práctica" (a concept/case-study document,
not a bounded per-línea walkthrough). This cycle found a third source SII
itself publishes and none of the four prior cycles had used:

- **Landing page:** <https://www.sii.cl/servicios_online/renta/guia_trib_suplemento_2026.html>
  (HTTP 200, direct fetch, no gate) links to **"Navegar por Formulario de
  Renta (F22)"**, an interactive client-rendered page at
  <https://www.sii.cl/servicios_online/renta/2026/rentaform.html>.
- That page's own `rentaform.js` loads each recuadro's content from a
  **static HTML fragment** at `./secciones/<recuadro_id>.html` (e.g.
  `recuadro_base_imponible.html`, `recuadro_creditos.html`,
  `recuadro_rebajas_renta.html`) — each one a plain HTML table reproducing
  every línea's number, label, and códigos, with a `data-*` attribute naming
  each línea's id (e.g. `l13`, `l46`) for a further per-línea "Instrucción"
  PDF at `./archivos/<línea_id>_instruccion.pdf`.
- All of the following were fetched directly (HTTP 200, no gate) and
  extracted with `pdfjs-dist` the same way as the specimen PDF, confirming
  **zero** Widget annotations on each (these are reference/instructional
  PDFs, not fillable forms, consistent with F-22 itself):
  - `secciones/recuadro_base_imponible.html` — confirms Línea 13's own
    two-code-plus-total structure (códigos 1098/1030/161).
  - `archivos/l13_instruccion.pdf` (2 pages, 10,319 chars extracted) —
    Línea 13's full legal instruction, cited for `sueldosPensionesFuenteNacional`,
    `sueldosRentasFuenteExtranjera`, and `totalRentasLinea13`.
  - `secciones/recuadro_creditos.html` and `archivos/l46_instruccion.pdf`
    (1 page) — Línea 46, cited for `creditoIuscRetenido`.
  - `secciones/recuadro_rebajas_renta.html` and `archivos/l16_instruccion.pdf`,
    `l21_instruccion.pdf`, `l23_instruccion.pdf` — Líneas 16, 21, and 23,
    cited for `donacionesLey16282`, `interesesCreditoHipotecario`,
    `dividendosHipotecariosDFL2`, and `ahorroPrevisionalVoluntario`.
  - `archivos/l41_instruccion.pdf` — Línea 41, cited for
    `creditoGastosEducacion`.
  - `archivos/l15_instruccion.pdf` (Línea 15, Impuesto Territorial) was also
    fetched and read, then excluded from this document's scope — see
    judgment call 4 below.
- **Retrieved / reviewed:** 2026-07-08.

### Source 3 (corroboration — eligibility/scope framing, not field-level detail)

- **"Guía Práctica de Declaración de Renta 2026"** —
  <https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf>,
  fetched directly (HTTP 200, 4,762,216 bytes, 65 pages), extracted with
  `pdfjs-dist` (zero Widget annotations, confirmed). Used only for its own
  "¿Quiénes deben presentar la Declaración de Renta?" section (p.13), which
  states directly the fact pattern this document is scoped to: workers with
  more than one employer during the year "deberán reliquidar el Impuesto
  Único de Segunda Categoría," and single-employer wage earners with
  "obligación tributaria cumplida mensualmente" "pueden declarar
  voluntariamente para acceder a beneficios como el Crédito por Gastos en
  Educación o la Rebaja de Intereses por Créditos con Garantía Hipotecaria" —
  independently confirming this document's scoping choice from SII's own
  prose, not just this cycle's own inference. Not used for any individual
  field's `sourceRef` (Source 2's per-línea instruction PDFs are always
  cited instead, being the more specific, authoritative source for each
  field).

## Field inventory (Phase 2)

All 14 `fields[]` entries and the 1 `documents[]` entry, and their exact
F-22 AT2026 recuadro/línea/código reference, are listed inline in
`schema.json`'s own `sourceRef` per field. Summary by section:

| Section | Fields | Modelled scope |
|---|---|---|
| Recuadro N°0, Información Personal | `rut`, `nombre`, `domicilio`, `correoElectronico`, `telefono`, `actividadProfesionGiro` | Full identification block; the same recuadro's "SELECCIONE LAS FRANQUICIAS TRIBUTARIAS" special-regime checkboxes (Zona Franca, Fomento Forestal, Navarino/Tocopilla, etc.) are out of scope — not relevant to a salaried employee |
| Línea 13 (Sueldos, Pensiones) | `sueldosPensionesFuenteNacional` (1098), `sueldosRentasFuenteExtranjera` (1030), `totalRentasLinea13` (161) | Full |
| Línea 16 (Donaciones) | `donacionesLey16282` (907) | Full |
| Línea 21 (Intereses/dividendos hipotecarios) | `interesesCreditoHipotecario` (750), `dividendosHipotecariosDFL2` (751) | Full |
| Línea 23 (Ahorro previsional) | `ahorroPrevisionalVoluntario` (765) | Full; UF-denominated annual cap not enforced (see judgment call 3) |
| Línea 41 (Crédito gastos educación) | `creditoGastosEducacion` (895) | Full; per-child/50-50-split eligibility rules not re-derived (see judgment call 5) |
| Línea 46 (Crédito IUSC) | `creditoIuscRetenido` (162) | Full |
| Recuadros 1-12, 14-24, and the whole computed-arithmetic chain (base imponible subtotal through IGC tax table, further créditos, PPM/retenciones netting, remanente/devolución and its bank-account block) | — | Entirely out of scope — see judgment call 1 |

Total: **14 fields** plus **1 `documents[]` entry** (a required
supporting-evidence pointer to the employer/payer withholding certificates).
No `crossFieldValidation` rules or `exclusivityGroups` are modelled (unlike
`cl/sii/inicio-actividades-personas-naturales`, this document's fields have
no either/or checkbox pairs).

## Access notes and judgment calls

1. **The entire computed-arithmetic chain is out of scope for v1.0.0, and
   this is the single largest scope decision in this document — the same
   class of exclusion `pl/mf/zeznanie-pit-37` (GOV-1691) applied to PIT-37's
   own §F-K chain.** F-22's own "Recuadro Base Imponible" table has 14
   income-type rows (this document models only row 13); the base-imponible
   subtotal (código 170), the progressive IGC/IUSC tax-table lookup, every
   further crédito (Recuadro Créditos has 21 more lines besides Línea 46),
   the PPM/retenciones netting, and the final remanente/devolución (refund)
   figure and its nominated bank-account block are each either a direct sum
   across all 14 income rows or a further calculation chained from that sum.
   Modelling those figures correctly would require modelling the other 13
   income rows (business/capital/honorarios income, capital gains, rental
   income, etc.) — a materially larger scope. This document omits the whole
   downstream chain rather than fabricate a tax-due or refund figure backed
   by an incomplete input set.
2. **Business income (Primera Categoría), the honorarios/independent-professional
   table (Recuadro N° 1), and every capital-gains schedule (Recuadro N° 2,
   enajenación de bienes raíces/acciones/criptomonedas) are out of scope.**
   These are the return's largest, most complex sections by far (per every
   prior cycle's own finding) and are the reason F-22 was deferred four
   times; this v1.0.0 deliberately does not attempt them.
3. **`ahorroPrevisionalVoluntario`'s statutory annual cap (600 UF) is not
   enforced by this schema's validation.** UF (Unidad de Fomento) is a
   daily-indexed inflation-adjustment unit whose peso value changes every
   day; enforcing a UF-denominated cap in a static schema would require a
   live UF-value lookup this document does not attempt. The field's own
   `description` discloses the cap without enforcing it, the same
   convention `pl/mf/zeznanie-pit-37` used for its own OPP-donation cap
   (judgment call 2 there).
4. **Línea 15 (Impuesto Territorial pagado, código 166) was read but
   excluded.** Its own instruction (§15.2) scopes eligibility to titulares/
   socios/accionistas of entities exploiting bienes raíces agrícolas under
   the renta-presunta regime — a business-ownership fact pattern outside
   this document's salaried-employee scope, unlike Líneas 16/21/23/41/46,
   whose own instructions name ordinary IUSC-affected wage earners as
   eligible filers.
5. **Línea 41's own per-child/50-50-parental-split eligibility mechanics are
   not re-derived.** The línea's own instruction (§41.1) sets out a
   multi-branch rule for which parent may claim the credit when both
   qualify; `creditoGastosEducacion` captures the resulting declared amount
   only, the same simplification this registry's convention already applies
   to conditional/computed sub-rules elsewhere (e.g. `pl/mf/zeznanie-pit-37`'s
   own `publicBenefitOrgDonationAmount`, judgment call 2 there).
6. **No signature/attestation `documents[]` entry is modelled.** Unlike
   `pl/mf/zeznanie-pit-37` (a signed paper form whose own printed closing
   declaration is quoted verbatim in its `documents[].signatureDeclaration`)
   or `cl/sii/inicio-actividades-personas-naturales`/`cl/sii/aviso-venta-vehiculo`
   (both printed, in-person-submitted forms), F-22 is filed through SII's
   own authenticated "Declaración de Renta en línea" web portal, and this
   cycle's specimen PDF carries no printed signature or sworn-declaration
   block to cite verbatim. Rather than fabricate attestation text this
   document did not find in a primary source, no such `documents[]` entry
   is included.
7. **`domicilio` is modelled as a single string, not broken into
   calle/número/comuna/ciudad sub-fields** the way `cl/sii/inicio-actividades-personas-naturales`
   and `cl/sii/aviso-venta-vehiculo` both do for their own domicilio blocks.
   F-22's own Recuadro N°0 prints a single "Domicilio" label with no further
   sub-field breakdown in this specimen (consistent with the field being
   pre-populated from SII's own taxpayer registry when filed online, rather
   than hand-entered on a printed form the way the other two CL schemas'
   forms are).
8. **`telefono` is labelled exactly as printed on the source form,
   `Telefóno`** (with the accent misplaced over the "o" rather than the
   correct "é" of "Teléfono") — reproduced verbatim per this registry's
   convention of not silently correcting a source form's own typography.

## Test run (Phase 3)

No live submission was attempted: F-22 is filed exclusively through SII's
own authenticated "Declaración de Renta en línea" portal (Clave Tributaria/
ClaveÚnica session), and submitting fabricated taxpayer data against Chile's
live tax administration is not a safe or reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory (a Santiago-resident salaried employee
reliquidating IUSC after receiving mortgage-interest and voluntary-pension-savings
benefits, no foreign-source income, no donations or education credit
this year) and validated with a purpose-written script that compiles
`schema.json`'s own `fields[]` (`type`/`validation`/`required`) into a JSON
Schema draft 2020-12 document and checks it with `ajv`, the same technique
`pl/mf/zeznanie-pit-37`'s own Phase 3 used:

```
$ node validate_instance.mjs registry/cl/sii/formulario-22/1.0.0/schema.json mock_f22.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS

OVERALL: PASS
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # rut shortened to "123" — violates the RUT pattern
Static (required/type/pattern/enum) validation: FAIL
 - /rut must match pattern "^[0-9]{7,8}-[0-9Kk]$"

$ # nombre removed — violates required: true
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'nombre'

$ # correoElectronico set to "not-an-email" — violates the email pattern
Static (required/type/pattern/enum) validation: FAIL
 - /correoElectronico must match pattern "^([\w-]+(?:\.[\w-]+)*)@..."
```

This document uses no `requiredWhen` conditions (all conditional-eligibility
rules the source describes — e.g. Línea 41's parental split — are disclosed
as judgment calls rather than encoded as gating conditions), so the
`requiredWhen` evaluator in the shared script trivially passes on every run;
included for parity with the established script, not because this document
exercises it.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/cl/sii/formulario-22/1.0.0/schema.json
ok   registry/cl/sii/formulario-22/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cl/sii/formulario-22/1.0.0/schema.json
ok   registry/cl/sii/formulario-22/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
