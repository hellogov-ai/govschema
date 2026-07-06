# Verification record — `mx/sat/declaracion-anual-sueldos-salarios` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

This document was derived from SAT's own official screenshot-driven
step-by-step "Guía de llenado" PDF, not a live-browser walk of the actual
Declaraciones y Pagos wizard (which requires an authenticated, personalized
session — see below, and is not a bot-mitigation workaround the way the
sibling RFC-preinscription document's sourcing was). It remains `draft`, not
`verified`, pending an independent second reviewer's field-by-field pass.

## Why this document exists

CATALOG.md's "Known Gaps" section explicitly flagged Mexico's Taxes vertical
as still needing "a distinct income-tax-return/filing candidate", separate
from `mx/sat/preinscripcion-rfc-persona-moral` (GOV-1414, classified under
Business Formation, mirroring `us/irs/employer-identification-number-ss4`).
This cycle picks up that flagged gap: SAT's Declaración Anual (annual
individual income tax return) for the Régimen de Sueldos y Salarios e
Ingresos Asimilados a Salarios (salaries/wages, Mexico's most common
personal-income regime) is sourced from SAT's own official guide PDF for
that regime. This closes Mexico's Taxes-vertical gap and gives Mexico its
third modelled vertical (alongside Business Formation and Visa).

## Source examined

- **Document `(id, version)`:** `mx/sat/declaracion-anual-sueldos-salarios` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Servicio de Administración Tributaria (SAT)
- **Live tool (not used as source — see below):**
  `https://www.sat.gob.mx/declaracion` (and the broader Declaraciones y Pagos
  service) — returns **HTTP 403** to a direct fetch, the same WAF/bot-
  mitigation signature already documented for SAT's RFC preinscription
  wizard. Independently of that gate, the live tool is *inherently*
  personalized: it requires RFC + Contraseña (or e.firma) login and loads
  each filer's own SAT-held third-party income data (CFDI de nómina,
  retenedor records) before any field can be usefully filled — an annual
  return does not make sense to walk anonymously the way a registration
  wizard does. So the guide is the *correct* source shape for this process,
  not a workaround for an otherwise-avoidable gate.
- **Primary source actually used:**
  `https://www.sat.gob.mx/minisitio/DeclaracionAnual/Personas/documentos/GuiaLlenado_SueldosSalarios.pdf`
  — "Guía de llenado — Declaración Anual, Régimen de Sueldos y Salarios e
  Ingresos Asimilados a Salarios" (ejercicio fiscal 2025 edition), 65 pages.
  Downloaded directly (HTTP 200), no login required for the guide itself.
  Confirmed genuine PDF content with a real, directly-extractable text
  layer — unlike the sibling `mx/sat/preinscripcion-rfc-persona-moral`
  guide, whose screenshots carried no text layer and required page-image
  rendering to read visually. Text was extracted directly via
  `pdfjs-dist` (pinned `3.11.174`, per this environment's known rendering
  regression in newer versions) using `getTextContent()` per page, then read
  in full (all 65 pages) before authoring any field.
- **Index/landing page confirming sibling guides exist:**
  `https://www.sat.gob.mx/minisitio/DeclaracionAnual/Personas/tutoriales_guias.html`
  — lists separate guides for other income regimes (Actividad Empresarial y
  Servicios Profesionales, Plataformas Tecnológicas Digitales, Arrendamiento,
  Decreto Plan México, ISSIF), each an open candidate for a future cycle.

## Judgment calls (disclosed for an independent reviewer)

1. **Login/authentication step excluded.** The guide's own Section II
   (Acceso al sistema, p.3-4) describes reaching the wizard via RFC +
   Contraseña + captcha, or via e.firma (.cer/.key + password). This is
   modelled as an out-of-scope prerequisite, consistent with how this
   registry treats login/account-holder authentication elsewhere (e.g. the
   AE ICP visa document excludes the sponsor's own account login).
2. **`declaresAsimiladosASalarios` / `declaresIngresosSeguroRetiro` /
   `declaresIndemnizacionOrJubilacion` are interpretive stand-ins for the
   Configuración step's own "Ingresos a declarar" checkboxes.** Page 8 of
   the guide states that the wizard shows pre-selected checkboxes for "the
   type of income you received", but the guide's screenshot at that point
   does not render the checkbox list's actual labels — it only becomes
   concrete later, when the wizard's income-type *tabs* are named
   (Asimilados a salarios, Indemnización, Jubilación en parcialidades,
   Jubilación pago único, Ingresos del seguro de retiro — p.16, p.19). I
   modelled one boolean gate per tab-group actually detailed in the guide,
   rather than guessing at the full original checkbox catalog. Flagged for
   a reviewer to re-confirm against a live wizard screenshot if one becomes
   accessible.
3. **Indemnización, Jubilación en parcialidades, and Jubilación pago único
   income sub-types are out of scope beyond their downstream aggregate
   effect.** Unlike Asimilados a salarios and Ingresos del seguro de
   retiro — both of which the guide walks as full worked examples with
   named input fields (p.19-21) — these three are only named as tab
   headings (p.16, p.19) and referenced by their effect on two aggregate
   fields: `nonAccruableIncome` ("Ingresos no acumulables", p.25, which the
   guide ties to indemnización and jubilación pago único specifically — not
   jubilación en parcialidades) and `isrNonAccruableIncomeTax` ("ISR de
   sueldos y salarios por ingresos no acumulables", p.45, which the guide
   ties to all three). I modelled a single combined gating boolean,
   `declaresIndemnizacionOrJubilacion`, covering all three for simplicity,
   rather than inventing three separate un-sourced field sets — this is a
   simplification a reviewer should be aware of, since the source itself is
   not perfectly consistent about which of the three specifically drives
   `nonAccruableIncome`.
4. **Per-withholding-agent and per-CFDI-deduction records are bounded to one
   instance each.** The live wizard supports adding multiple salary-income
   records (one per employer/retenedor, p.16-17) and multiple personal-
   deduction CFDI records per deduction type (p.32-34). GovSchema v0.3 has
   no native repeating-group field type (GSP-0009), so both are modelled as
   a single bounded record (`withholdingAgentRfc`/`withholdingAgentName`/
   `salaryIncomeFromWithholdingAgent`/`exemptIncomeFromWithholdingAgent` for
   the former; `deductionIssuerRfc`/`deductionIssuerName`/
   `deductionIssueDate`/`deductionPaymentMethod`/`deductionDescription`/
   `deductionTotalAmount`/`deductionDeductibleAmount`/
   `deductionRecoveredExpenseAmount` for the latter), with the true
   aggregate totals (`annualIncome`, `totalDeductibleAmount`, etc.) still
   modelled as their own system-computed fields.
5. **`personalDeductionType` and `deductionPaymentMethod` (Forma de pago)
   are modelled as free strings, not enums.** The guide names three example
   deduction categories (honorarios médicos/dentales y gastos hospitalarios,
   gastos funerales, colegiaturas) plus the 2025-new "Sin clasificación"
   bucket, and separately instructs the filer to "select the Tipo de
   Deducción according to the options shown" (p.33) without rendering that
   dropdown's full option list on screen. Since SAT's personal-deduction
   catalog (aligned to the Ley del ISR's Art. 151) is known to include more
   categories than the three named examples (e.g. donativos, aportaciones
   complementarias de retiro, primas de seguros de gastos médicos, intereses
   reales por créditos hipotecarios), asserting a closed enum from an
   unconfirmed subset would risk under-representing real values, so both
   fields are left as open strings pending a reviewer confirming the full
   catalog against the Visor de Deducciones Personales or Art. 151 itself.
   Likewise `period` (Periodo, Configuración step, p.8) and
   `reportableTaxSchemeType` (Tipo de esquema reportable, p.54) are left as
   open strings for the same "dropdown named but not rendered" reason.
6. **Offset/compensation source-declaration sub-dialog left as an
   aggregate only.** Page 57-58 describes an "Agregar" sub-dialog for
   registering the specific prior declaration(s) that generated a saldo a
   favor being compensated, but only says to "capture each field that is
   enabled with the corresponding information" — no field labels are shown.
   Only the resulting aggregate fields (`offsetDetailAmount`,
   `totalApplicationsAmount`) are modelled; the per-record sub-dialog itself
   is out of scope for v1.0.0.
7. **No explicit "filed after the deadline" boolean models
   `updatedPortionAmount` (Parte actualizada) / `surchargesAmount`
   (Recargos).** The guide states these two fields are "enabled" when the
   declaration is filed after the legal deadline (p.55-56), computed from
   the gap between the due date and the actual payment date, but names no
   corresponding applicant-facing field for "are you filing late" — so both
   are modelled as optional, uncondition-gated numeric fields with a
   description explaining the real trigger, rather than inventing a
   synthetic boolean gate with no source backing.
8. **`balanceInFavorAmount` and `balanceDueAmount` are modelled as two
   separate, both-optional fields rather than one polarity-signed amount.**
   The guide presents them as two mutually exclusive named fields
   ("Impuesto a favor del ejercicio", p.47; "Impuesto a cargo del
   ejercicio", p.50) depending on which way the year's computation resolves,
   matching the source's own structure rather than synthesizing a combined
   signed-amount field the guide never uses.
9. **`maxDeductibleLimitAmount`'s $206,368.00 MXN cap is fiscal-year-2025-
   specific.** The guide states this figure explicitly (p.27) as the cap
   alternative to "15% of total income" for the ejercicio the guide covers;
   a future edition of this document (or a `us-tax-year`-style `edition`
   axis, per GSP-0005) would need to update this figure for a later fiscal
   year, since SAT republishes this guide annually with the year's own
   updated peso figures and ISR tariff table.
10. **`crossFieldValidation`'s `totalDeductibleWithinLimit` rule** (asserting
    `totalDeductibleAmount <= maxDeductibleLimitAmount`) is inferred from the
    guide's own description of `maxDeductibleLimitAmount` as "the limit
    amount that results as the lesser of [...]" (p.27) — the guide does not
    state the inequality as an explicit validation rule the way a field-level
    citation would, but it follows directly from the two fields' own defined
    meanings.

## Explicitly out of scope for v1.0.0

- The SAT portal login/authentication step (RFC + Contraseña + captcha, or
  e.firma) preceding the wizard.
- Indemnización, Jubilación en parcialidades, and Jubilación pago único
  income sub-types' own detailed input fields (only their downstream
  aggregate effect is modelled — see judgment call 3).
- Repeating per-withholding-agent income records and repeating per-CFDI
  personal-deduction records beyond one bounded instance each (GSP-0009).
- The offset/compensation source-declaration per-record sub-dialog (p.57-58
  — see judgment call 6).
- The read-only Vista previa / Revisar / Enviar declaración review-and-
  submit screens (they only echo prior steps) and the Acuse de recibo
  receipt output (a generated PDF, not an input form).
- Every other SAT income regime (Actividad Empresarial y Servicios
  Profesionales, Plataformas Tecnológicas Digitales, Arrendamiento, Decreto
  Plan México, ISSIF) — each has its own sibling guide on the same landing
  page and is an open candidate for a future cycle.

## Validation

```
node tools/validate-ajv.mjs registry/mx/sat/declaracion-anual-sueldos-salarios/1.0.0/schema.json
```

Result: `ok`.
