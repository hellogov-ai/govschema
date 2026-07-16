# Verification record — `ec/sri/declaracion-impuesto-renta-personas-naturales-formulario-102a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3336**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Ecuador has opened two of its six verticals in the three cycles preceding
this one — Visa (GOV-3305, `ec/cancilleria/formulario-solicitud-visa`) and
Business Formation (GOV-3328, `ec/sri/inscripcion-ruc-persona-natural`).
GOV-3328's own VERIFICATION.md confirmed `www.sri.gob.ec` responds normally
this cycle, so this cycle continued directly on SRI's own domain rather than
re-screening the other three Ecuadorian verticals (Passport, DMV, National
ID) GOV-3328 had already re-confirmed weak/gated that same cycle — see
"Known gaps" below for a summary carried forward rather than re-derived from
scratch.

SRI publishes Formulario 102 (for natural persons/undivided estates
*obligated* to keep accounting records) and Formulario 102A (for those *not*
obligated to). Form 102's own instructivo documents over 100 numbered
casilleros spanning full balance-sheet/income-statement transposition,
construction-contract accounting, deferred-tax generation/reversal, transfer
pricing, and ZEDE-operator tariff reductions — a scope closer to a corporate
return than an individual one, and judged too broad for a single-session
schema on this registry's own established bar (the same reasoning that has
repeatedly set aside Ireland's Form CT1 and similarly broad corporate-return
candidates). Formulario 102A, by contrast, is scoped to the ordinary
individual case (employees, independent professionals, landlords) and has
its own dedicated 25-page SRI instructivo — a genuinely different, narrower
document, not a subset extracted by judgment call from the 102 instructivo.
This schema is built from that dedicated 102A instructivo.

## Sources examined

### Primary source

- **Authority:** Servicio de Rentas Internas (SRI)
- **Document:** "Formulario 102A en Línea / Instructivo (Versión 1.2) — Guía
  para contribuyentes" — SRI's own dedicated instructivo for Formulario 102A
  (Declaración del Impuesto a la Renta para personas naturales y sucesiones
  indivisas **no** obligadas a llevar contabilidad).
- **URL (directly retrieved, HTTP 200, `application/pdf;charset=UTF-8`):**
  `https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/90ae5b65-c791-4c9d-a357-e95692a4076b/GUIA+DEL+CONTRIBUYENTE+FORMULARIO+102A.pdf`
- **File identity:** `sha256:54ca8359dbaff37a852e9916e212d0c6843e5fc8b38c7e44a3acf94b67fd24a5`,
  1,881,040 bytes, `content-disposition: attachment; filename=GUIA DEL
  CONTRIBUYENTE FORMULARIO 102A.pdf`.
- **Extraction method:** `pdfjs-dist` (legacy build, `getTextContent()` per
  page) — a genuine text-layer PDF, no OCR needed. 26 pages.
- **What it documents:** the dedicated "Formulario 102A – Guía declaración de
  Impuesto a la Renta Personas Naturales y Sucesiones Indivisas no Obligadas
  a llevar Contabilidad" section (pp.13-25) defines, casillero by casillero
  with its own Ley de Régimen Tributario Interno (LRTI)/Reglamento (RALRTI)
  article citations: taxable income by type (703/704 avalúos, 481 business
  income, 710 banana-production income (informativo), 711/712
  professional/artisanal income, 713/714 rental income, 716 royalties, 717
  foreign income, 718 financial yields, 719 dividends, 720 capital gains,
  491/721-724/731 attributable deductions, 749/769 computed subtotals, 741
  employment income, 751 IESS contributions); personal-expense deductions
  (767 arts/culture, 768 Galápagos, casillas 771-775 the five personal-
  expense categories, 776 elderly exemption, 740/750/760/777
  beneficiary-type/disability fields, 770/778 conjugal-partnership income
  attribution); other exempt income (781/783 lottery, 782/784 inheritance,
  787 other exempt); the RESUMEN IMPOSITIVO tax-computation summary
  (839/840/842/847/848/850/851/852/857/858); next year's advance-tax
  calculation (880/881/882/879/871/872); prior-payment tracking (890); and
  payment method/credit-note details (903/904/908/910/912/915/916/918/920,
  and the "Forma de pago" three-way choice).

### Corroborating source

- **Document:** "Formulario 102 – Instructivo" (the sibling instructivo for
  the accounting-obligated regime), fetched this cycle purely to confirm
  three identification casilleros the 102A instructivo's own text does not
  restate a box number for, and one worked-example casillero (859).
- **URL (directly retrieved, HTTP 200, `application/pdf`):**
  `https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/a936a1f3-2699-4a35-8423-1c054565f477/Instructivo+Formulario+102.pdf`
- **File identity:** `sha256:941b3a224b270d9a8f3a8d41569d6747a1d5cd4a135494ee54dce7dba82ac99b`,
  932,322 bytes, 25 pages.
- **What it corroborates:** its own "IDENTIFICACIÓN, REGISTROS Y REFERENCIAS
  LEGALES" section defines casillero 102 ("Año.- Período al que corresponde
  la declaración"), 104 ("N° Formulario que sustituye"), and 198 ("Cédula de
  Identidad"). The 102A instructivo's own screenshots describe the same
  three data points appearing on Formulario 102A's own entry screen
  ("aparece su número de identificación, el concepto del formulario... En
  caso de tratarse de una declaración sustitutiva, además aparecerá el
  número del último formulario enviado") without restating their box
  numbers — every other casillero number that recurs in both instructivos
  (703, 704, 839, 840, 842, 847, 848, 850-852, 857, 858, 880-882, 879, 871,
  872, 890) is worded identically in both, so citing 102/104/198 from the
  sibling document is a disclosed, reasoned inference rather than an
  assumption. Casillero 859 ("Impuesto a la Renta a Pagar", the final
  tax-payable line) is likewise cited from Form 102's own worked numeric
  example, since the 102A instructivo's prose does not repeat a worked
  example but shares the identical RESUMEN IMPOSITIVO structure.

### External reference

- **RUC/cédula format:** a natural person's 13-digit RUC equals their
  10-digit cédula plus a fixed `001` establishment suffix — a widely
  published SRI convention, cross-checked against multiple independent
  secondary sources this cycle since neither instructivo states the digit
  count itself. `taxpayerIdNumber` models the 10-digit cédula (per casillero
  198's own description), not the derived 13-digit RUC.

## Known gaps / disclosed scope boundaries

- **Fields 705/715/725** (Form 102's own instructivo: "vigentes para
  ejercicios fiscales anteriores al 2008") and **843** (explicitly: "Utilice
  este casillero siempre que el período declarado sea anterior al 2010. No
  registre valores en este casillero si la declaración corresponde al 2010 o
  a un período posterior.") are dead casilleros for any current filing and
  are excluded rather than modelled as legacy/unused fields.
- **Boxes 845/846** are referenced only obliquely, inside the 871/872
  installment formula ("...menos las retenciones... casilleros 845, 846 y
  848"), with no independent defining paragraph in either instructivo. Left
  unmodelled rather than guessed at — a future cycle that can read the live
  rendered SRI en Línea form directly (with a real or test-provisioned
  account) could recover their exact definitions.
- **Casillas 771-775** (the five personal-expense categories: vivienda,
  educación, alimentación, vestimenta, salud) are modelled as five distinct
  fields (`personalExpenseHousing`/`Education`/`Food`/`Clothing`/`Health`),
  but the source's own prose lists the five categories and the box range
  together as a set without pairing each individual box number to a specific
  category. This schema's category-to-field assignment is therefore a
  disclosed judgment call, not an independently confirmed one-to-one numeric
  mapping.
- **Casilleros 908/910/912** (credit-note numbers) are modelled as three
  slots per the instructivo's own "Notas de Crédito No." label; any paired
  amount sub-fields the live rendered form might carry alongside them are
  not named in this text-only source and are left unmodelled.
- **Anexo de Gastos Personales**: modelled as a conditional `documents[]`
  entry (`required: false`, with a `handling` note) rather than a structured
  `requiredWhen`, since its trigger — personal expenses exceeding 50% of the
  annually-republished basic tax-exempt fraction — depends on an external
  value not itself modelled as a field.
- **No live SRI en Línea account was used**, and no submission was made, to
  author this schema — Formulario 102A is a login-gated, online-only system
  with no downloadable blank specimen. A future cycle with valid
  test/sandbox credentials could walk the live rendered wizard directly and
  upgrade this schema's `maturity` beyond `structural-reference`.
- Ecuador's remaining verticals — DMV (ANT vehicle registration, re-confirmed
  weak: a stale 2020 Wayback snapshot of mostly commercial-transport
  paperwork), Passport (Registro Civil, login-gated with no field-level
  fallback), and National ID (Registro Civil "Duplicado de cédula Express",
  CAPTCHA-plus-real-citizen-data-gated after a 3-field search step) — remain
  open, previously-screened backlog candidates carried forward from GOV-3328
  rather than re-screened from scratch this cycle.

## Conformance fixtures

8 fixtures are committed under
`conformance/ec/sri/declaracion-impuesto-renta-personas-naturales-formulario-102a/1.0.0/`:
2 valid filings (0 errors each — a salaried employee with no special claims
filing an original declaration, and an independent professional with rental
income, personal-expense deductions, and a disability exemption filing a
substitutive declaration) and 6 mutation-control fixtures (each expected to
raise exactly 1 error): a missing required `taxpayerIdNumber`, a missing
required `paymentMethod`, an invalid `taxpayerIdNumber` pattern (9 digits
instead of 10), an invalid `beneficiaryType` enum value, a `requiredWhen`
violation (`beneficiaryType: "U"` without `disabledPersonIdentification`),
and a `crossFieldValidation` violation (both `elderlyExemption` and
`disabilityExemption` claimed simultaneously). All 8 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation`/`crossFieldValidation` rules (not
committed — consistent with this registry's established per-cycle practice
of writing an independent validator rather than reusing the authoring
script). Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass at
508/508 across the full registry with this schema added, and
`tools/govschema-client/registry-index.json` was regenerated to include it.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
