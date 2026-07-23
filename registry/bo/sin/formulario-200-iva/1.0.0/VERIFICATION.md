# Verification record — bo/sin/formulario-200-iva@1.0.0

## Candidate selection

GOV-4460 ("GovSchema Standard Research", child of GOV-4458). A parallel
scouting pass under GOV-4458, run after Paraguay's remaining Passport and
National ID verticals were confirmed dead ends (Policía Nacional's own
Departamento de Identificaciones handles both in person, with no
downloadable form or itemized field guide for either), identified
Bolivia's Servicio de Impuestos Nacionales (SIN) monthly IVA declaration
(Formulario 200 v.5) as a genuinely downloadable, unauthenticated PDF with
a page-by-page instructivo covering every casilla. This schema opens
Bolivia as the registry's 86th jurisdiction, Taxes vertical (1 of 6).

## Reaching the live source

Independently re-fetched and re-hashed rather than trusting the scouting
note's own description at face value:

- `https://www.impuestos.gob.bo/wp-content/uploads/2025/10/200v5.pdf`
- HTTP 200, `Content-Type: application/pdf`, `Last-Modified: Thu, 16 Oct
  2025 20:59:14 GMT`, `Content-Length: 609,640` bytes.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with no session/cookie state reached it cleanly.
- sha256
  `1f1e2f4d08cef95cb93fffe953875788c6a90299d8bb9fa0121d0940494eb5a2`.
- PDF header confirmed by clean `pdfjs-dist` text-layer extraction across
  all 5 pages, no OCR/scan-image fallback needed.

## Material discrepancy from this cycle's own scouting estimate

Disclosed up front, since it materially changes this schema's scope from
what was expected going in. The issue that delegated this authoring cycle
described "~52 numbered casillas across 8 rubros ... plus datos
informativos, datos pago SIGMA." The actual live PDF at the given URL is
titled, in its own printed header, "Formulario 200 V.5 **Resumido**"
(abbreviated/summary edition) and contains only 30 numbered filas across 4
rubros. An exhaustive grep of the full extracted text layer for
"RECTIF", "SIGMA", and "informativ" returned zero hits anywhere in the
document.

A web search independently found third-party commentary
(boliviaimpuestos.com) referencing a longer "extendido" edition of this
same form with roughly 52 casillas, including a SIGMA-payment-related
casilla 8883 — suggesting a fuller edition may exist, most likely inside
SIN's own authenticated Oficina Virtual e-filing portal, distinct from
this specific publicly-downloadable PDF.

Per this registry's source-of-truth-fidelity principle, this schema is
authored strictly against the actual bytes at the cited URL — the
Resumido edition — not the pre-authoring estimate. This is disclosed here
rather than silently reconciled, so a future cycle revisiting Bolivia's
Taxes vertical knows the fuller "extendido" edition remains unauthored
backlog if it can ever be located at an unauthenticated URL.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
CommonJS build at `build/pdf.js`). `getAnnotations()` was run against
every page first and returned zero `/Widget` annotations throughout — a
genuine flat (non-AcroForm) specimen. `getTextContent()` then read every
text item's raw string and its `transform` x/y position across all 5
pages, grouped into lines by rounded y-coordinate, to reconstruct the
form's own fila numbering, casilla (Cód.) numbers, and header column
layout.

## Document structure

The 5-page PDF is three physical copies of the same 1-page form (page 1
"ORIGINAL SIN", page 3 "COPIA CONTRIBUYENTE", page 5 "TALÓN ENTIDAD
FINANCIERA" — a carbonless multi-part declaration, standard practice for
SIN paper/bank-window filing) interleaved with two copies of the same
2-page instructivo (pages 2 and 4, identical content, doubled to sit
behind each of the first two form copies for print purposes).

Each form copy carries:

- An unlabelled header block ("DATOS DE CABECERA" per the instructivo's
  own heading) with NIT, taxpayer name/razón social, período mes/año, the
  "DD.JJ. ORIGINAL" (Cód. 534) indicator, a system/office-assigned NÚMERO
  DE ORDEN, and a FOLIO box explicitly reserved for the receiving Entidad
  Financiera or Colecturía.
- Sección B, RUBRO 1: Determinación del Débito Fiscal y Crédito Fiscal
  (filas 1-5).
- RUBRO 2: Determinación del Saldo Definitivo a Favor del Fisco o del
  Contribuyente (filas 6-19).
- RUBRO 3: Determinación de la Deuda Tributaria, printed "(En caso de
  presentación fuera de plazo)" — only completed on a late filing (filas
  20-24).
- RUBRO 4: Saldo Definitivo e Importe de Pago (filas 25-30).
- Sección C, Datos del Sujeto Pasivo o Tercero Responsable — a
  sworn-accuracy declaration citing Artículo N.22 and Artículo N.78
  Parágrafo I of Ley N.2492, with a printed name line, signature line,
  and C.I. line.
- Sección D, a bank-only "Sello y Refrendo Entidad Financiera" stamp box.

## Scope: fields excluded as purely computed from other same-form casillas

Unlike this registry's precedent for e-filing systems that explicitly
write "El Sistema calculará/trasladará automáticamente" (e.g. Paraguay's
IRP, Zambia's ITR), every one of this form's own instructivo lines uses
the imperative "Consignar el resultado de la siguiente operación..."
("record the result of the following operation") even for filas that are
nonetheless 100% arithmetically determined by other same-form casillas,
with zero independent taxpayer judgment. This schema treats determinism,
not automation wording, as the GSP-0013 §7 exclusion test — consistent
with how this registry already excludes system-automated fields
elsewhere. Excluded on this basis:

- Fila 2 (Cód. 1002, C13×13%)
- Fila 4 (Cód. 1004, C26×13%)
- Fila 5 (Cód. 909, C1002−C1004)
- Fila 6 (Cód. 693, C1004−C1002)
- Fila 9 (Cód. 1001, C909−C635−C648)
- Fila 11 (Cód. 629, a same-form C1001/C621 comparison)
- Fila 14 (Cód. 643, C622+C640−C629)
- Fila 15 (Cód. 468, C629−C622−C640)
- Fila 18 (Cód. 467, C465+C466−C468)
- Fila 19 (Cód. 996, C468−C465−C466)
- Fila 24 (Cód. 955, sum of filas 20-23)
- Fila 25 (Cód. 592, C693+C635+C648−C909)
- Fila 27 (Cód. 747, C643−C955)
- Fila 28 (Cód. 646, a same-form C996/(C955−C643) choice)
- Fila 30 (Cód. 576, C646−C678)

Also excluded on the narrower sub-case of a same-form casilla carried
forward verbatim under a new number with no arithmetic at all:

- Fila 20 (Cód. 924, "Consignar el importe de la Casilla C996" — a pure
  same-form copy of fila 19)
- Fila 26 (Cód. 469, "Consignar el resultado de la siguiente operación
  (C467) Si es mayor a cero" — a pure same-form copy of fila 18's
  threshold-gated value)

## Scope: fields included despite referencing another casilla

Included because the reference is not a same-form computation:

- Fila 7 (Cód. 635) and fila 13 (Cód. 640) are each explicitly sourced
  from the **prior period's own filed return** ("C592 del Formulario del
  período anterior"; "C747 del Formulario del período anterior") — a
  different document's own value, not a same-form computation — so both
  are included as directly-supplied, mirroring this registry's own
  precedent in `py/dnit/individual-income-tax-return` (Finding 3) for
  prior-year/prior-period carryforward amounts.
- Fila 17 (Cód. 466) is likewise sourced from the prior period's own
  casilla C469, included on the same basis.
- Fila 8 (Cód. 648) and fila 21 (Cód. 925) both require the taxpayer to
  independently calculate a UFV (Unidad de Fomento de Vivienda)
  value-adjustment factor using an external index the instructivo does
  not itself tabulate ("en función a la variación de la Unidad de Fomento
  de Vivienda (UFV) ... utilice la Calculadora Tributaria en el sitio
  web") — genuinely external data, not a same-form arithmetic
  combination, so both are included.
- Fila 22 (Cód. 938) requires an interest-rate calculation per Artículo
  47 of Ley N.2492 over an elapsed-day count between the statutory due
  date and the actual payment date — external legal/temporal facts this
  form does not itself capture — so it is included, not excluded as
  computed.
- Fila 23 (Cód. 954) is a late-filing administrative penalty ("Multa por
  Incumplimiento al Deber Formal") assessed per the sanctions regime in
  force, an external fact (how late the filing is) this form does not
  itself capture, so it is included, mirroring this registry's own
  precedent for late-filing penalties in `py/dnit/individual-income-tax-return`
  (Finding 4) and `jm/taj/individual-income-tax-return`.
- Fila 29 (Cód. 678) is a taxpayer-elected amount of an existing FAP
  (Facilidad de Apoyo al Pago / accumulated favorable balance) credit the
  taxpayer chooses to apply, "sujeto a verificación y confirmación por el
  SIN" — an election, not a same-form arithmetic result — so it is
  included.

## Scope: header/office-only fields excluded

- **NÚMERO DE ORDEN** is excluded as a system/office-assigned tracking
  number generated on submission, not applicant-supplied data — the same
  class of exclusion this registry's `py/dnit/individual-income-tax-return`
  (Finding 5) draws around its own "Número de Orden".
- **FOLIO** is excluded per the instructivo's own explicit text: "Casilla
  de uso exclusivo para la Entidad Financiera o Colecturía" ("box for the
  exclusive use of the Financial Entity or Collection Office") — not
  applicant-supplied.
- **Sección D, Sello y Refrendo Entidad Financiera** (the receiving
  bank/office's own stamp and endorsement) is excluded in its entirety as
  third-party-supplied, not applicant data.

## Disclosed findings and interpretation choices

1. **"DD.JJ. ORIGINAL" (Cód. 534) is excluded, not modelled as an
   `isOriginalDeclaration` boolean.** The instructivo's own text reads:
   "Se consigna por defecto una 'X' cuando la DD.JJ. es original (primera
   DD.JJ. presentada por el período fiscal)" — "an X is entered **by
   default** when the DD.JJ. is original." This describes a value the
   e-filing/printing system itself pre-populates based on the taxpayer's
   own filing history for the period, not a box the taxpayer actively
   marks on this form — the same class of exclusion this registry's own
   GSP-0013 §7 precedent draws around system-auto-populated indicators.
   This Resumido specimen also prints no adjacent "Rectificativa"
   alternative box, so there is no visible taxpayer-facing choice here to
   model.
2. **The header's "1234567890" numeral (printed near the NÚMERO DE ORDEN
   label) is a generic illustrative placeholder, not a labelled field of
   its own** — it carries no adjacent caption distinguishing it from
   decorative example content, and NÚMERO DE ORDEN is itself already
   excluded as office-assigned.
3. **`taxpayerName` is modelled as a single free-text field**, matching
   the source's own single combined label "NOMBRE (S) Y APELLIDO (S) O
   RAZÓN SOCIAL DEL CONTRIBUYENTE" printed as one blank line with no
   internal subdivision.
4. **`periodMonth` is modelled `type: string` with a 2-digit pattern, not
   `type: integer`**, per the instructivo's own explicit formatting
   instruction: "el formato de llenado deberá ser de dos dígitos (mm),
   Ej.: 03 para marzo" — a printed format constraint this schema encodes
   literally rather than reinterpreting as a numeric range.
5. **All RUBRO 1/2/3/4 monetary fields are modelled `required: false`**,
   since the source's own header instruction ("EN BOLIVIANOS SIN
   CENTAVOS") confirms every casilla is a plain whole-currency amount,
   but the instructivo gives no explicit zero/blank convention
   distinguishing a genuinely-zero casilla from an inapplicable one, and
   RUBRO 3 in particular is printed as applying "sólo si la presentación y
   pago son realizados después del vencimiento" (only on a late filing) —
   the same not-every-filer-has-every-line convention this registry's
   `py/dnit/individual-income-tax-return` (Finding 10) and
   `zm/zra/individual-income-tax-return` already apply to their own
   income/expense/penalty lines.
6. **Every monetary field is modelled `type: integer` with
   `validation.minimum: 0`**, per the form's own printed column header
   "(EN BOLIVIANOS SIN CENTAVOS)" ("in Bolivianos without cents"),
   confirming whole-Boliviano amounts, and no fila's own text describes a
   possible negative value.
7. **Sección C's sworn-declaration text ("JURO LA EXACTITUD DE LA
   PRESENTE DECLARACIÓN", citing Artículo N.22 and Artículo N.78
   Parágrafo I of Ley N.2492) is modelled as a `documents[]` attestation
   entry**, not a `fields[]` boolean, consistent with this registry's own
   precedent for sworn-declaration/signature blocks (e.g.
   `ae/fta/vat-registration`'s "Declaration attestation",
   `bw/burs/individual-tax-return`'s Section G declaration). The physical
   signature mark itself is not separately modelled as data (it is
   captured by the attestation's own `required: true`); the printed name
   ("Aclaración de Firma") and national ID number ("C.I.") that accompany
   the signature per the instructivo's own explicit list ("firma,
   aclaración de firma, número de documento de identidad") are modelled
   as ordinary required `fields[]` entries, since they are typed/written
   data distinct from the signature act itself.

## Conformance

3 valid mock scenarios — `valid-original-return-domestic-sales` (a
straightforward on-time original monthly filing with domestic sales/
purchases and a prior-period tax-credit carryforward, no RUBRO 3
late-filing casillas populated); `valid-return-with-siete-rg-advance-payments`
(a filing exercising the SIETE-RG 5%-advance-payment casillas and their
own prior-period carryforward); and `valid-late-filed-return-with-penalty`
(a late filing exercising all three RUBRO 3 casillas — value adjustment,
interest, and penalty — plus a FAP credit-balance payment) — plus 4
mutation-control fixtures (one missing statically-required field from
each of `nit`, `taxpayerName`, `periodMonth`, `periodYear`) and one
unknown-field-rejected fixture, committed under
`conformance/bo/sin/formulario-200-iva/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all fixtures: all 3 valid scenarios at 0 errors, all 4
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
