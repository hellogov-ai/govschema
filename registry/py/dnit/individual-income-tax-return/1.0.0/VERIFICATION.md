# Verification record — py/dnit/individual-income-tax-return@1.0.0

## Candidate selection

GOV-4427 ("GovSchema Standard Research", child of GOV-4424). The GOV-4424
cycle scouted Paraguay as a brand-new jurisdiction alongside Namibia and
Tajikistan and found it the strongest of the three (4 of 6 verticals STRONG
— Taxes, Business Formation, DMV, Visa — the strongest new-jurisdiction
showing since Botswana; see CATALOG.md's Known Gaps entry 0i). Taxes was
delegated to this issue as the first vertical to author, opening Paraguay
as the registry's 85th jurisdiction; Business Formation, DMV, and Visa
remain open STRONG backlog for future cycles, and Passport/National ID
(cédula) are confirmed dead ends (both routed through a login-gated e-gov
portal or an in-person office, per the scouting cycle's own findings).

## Reaching the live source

The scouting cycle's own note already gave the exact document URL and byte
count; both were independently re-verified rather than trusted at face
value:

- `https://www.dnit.gov.py/documents/d/global/formulario-n-515-irp-rentas-derivadas-de-la-prestacion-de-servicios-personales-version-1`
- HTTP 200, `Content-Type: application/pdf`, 704,170 bytes — matching the
  banked figure exactly.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with no session/cookie state reached it cleanly.
- sha256 `221a33b936afc802ab9296615426e0c51a3881c2b1f98befae55dc867fc7d956`.
- PDF header confirmed by clean `pdfjs-dist` text-layer extraction across
  all 3 pages, no OCR/scan-image fallback needed.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
CommonJS build at `legacy/build/pdf.js`). `getAnnotations()` was run against
every page first and returned zero `/Widget` annotations throughout — a
genuine flat (non-AcroForm) specimen. `getTextContent()` then read every
text item's raw string and its `transform` x/y position across all 3 pages.
Because several sections use a genuinely ambiguous multi-column casilla
layout (RUBRO 1 and RUBRO 5's twin `-I-`/`-II-` columns; the Anexo's Cuadro
1/Cuadro 2 grids on page 3), page 3 was additionally rendered to a 2.5x
PNG via `pdfjs-dist` + `node-canvas` and visually inspected to confirm cell
and column semantics that x/y-position sorting alone left ambiguous — this
directly resolved what would otherwise have been a guess about Cuadro 2's
per-category slot counts (1 ID slot for Cónyuge vs. up to 10 for Hijos
menores de edad, etc.).

## Document structure

- **Page 1**: header/identification block (casillas 01-05, plus
  un-numbered RUC/DV/Razón Social/Nombres fields), RUBRO 1 - Ingresos
  Obtenidos por la Prestación de Servicios Personales (casillas 10-14, two
  columns: `-I-` EXONERADOS/exempt and `-II-` GRAVADOS/taxed), RUBRO 2 -
  Egresos Deducibles del Ejercicio Fiscal (casillas 15-24), and RUBRO 3 -
  Resultado Obtenido luego de Aplicar las Deducciones Admitidas (casillas
  25-32).
- **Page 2**: RUBRO 4 - Pérdida Fiscal Arrastrable por la Adquisición de un
  Inmueble para la Vivienda (casillas 33-39) and RUBRO 5 - Determinación
  del Impuesto y Liquidación Final (casillas 40-51, two columns: `-I-`
  CONTRIBUYENTE and `-II-` FISCO).
- **Page 3**: ANEXO — Cuadro 1, Préstamos y Remanente de los Ingresos
  Gravados de Ejercicios Fiscales Anteriores (a fixed 10-row x 5-column
  grid, casillas 52-101, plus TOTAL casilla 102), and Cuadro 2, Familiares
  a Cargo del Contribuyente (an 8-category identity-document grid with a
  different maximum slot count per category, casillas 103-154).

This PDF is the return itself, not an instructivo; the separate
instructivo referenced in the form's own header ("PARA LLENAR LEA EL
INSTRUCTIVO DISPONIBLE EN LA WEB") was not fetched — it is hosted
separately and was not needed to determine the scope decisions below,
which rest entirely on this document's own printed casilla text.

## Scope: RUBRO 3 excluded in its entirety (100% system-computed)

Every one of RUBRO 3's eight casillas (25-32) is either explicitly
computed/carried by the e-filing system ("El Sistema
calculará/trasladará/consignará automáticamente") or fully determined by
other same-form casillas with no independent taxpayer input, so the entire
RUBRO is excluded from `fields[]` rather than partially modelled:

- Casilla 25, Ingresos brutos gravados del ejercicio fiscal (El Sistema
  trasladará automáticamente el monto de la casilla 14 del Rubro 1)
- Casilla 26, Menos: Egresos deducidos del ejercicio fiscal (El Sistema
  trasladará automáticamente el monto de la casilla 22, limitado hasta el
  monto de los ingresos gravados registrados en la casilla 25)
- Casilla 27, Resultado después de descontar los Egresos Deducibles (El
  Sistema calculará automáticamente la diferencia entre las casillas 25 y
  26)
- Casilla 28, Menos: Egreso personal por la adquisición al contado de un
  inmueble para la vivienda (Proviene de la casilla 23, aunque solamente
  hasta el monto registrado en la casilla 27) — the only RUBRO 3 line
  without explicit "El Sistema" wording (see Finding 1), but still fully
  determined as min(casilla 23, casilla 27)
- Casilla 29, SUBTOTAL Renta Neta Imponible (El Sistema calculará
  automáticamente la diferencia entre las casillas 27 y 28)
- Casilla 30, Monto total o porción de los préstamos/financiaciones... (El
  Sistema trasladará automáticamente el monto registrado en la casilla 102
  del Anexo, condicional a superar el valor de la casilla 27)
- Casilla 31, Saldo de egresos por adquisición de un inmueble no
  arrastrable (El Sistema consignará automáticamente el monto...)
- Casilla 32, Pérdida Fiscal por adquisición de un inmueble, arrastrable al
  siguiente ejercicio fiscal (El Sistema calculará automáticamente el
  monto...)

## Scope: other excluded computed/derived casillas outside RUBRO 3

- Casilla 14, TOTAL INGRESOS BRUTOS GRAVADOS PERCIBIDOS EN EL EJERCICIO
  FISCAL — unambiguously the total of the GRAVADOS-column entries directly
  above it (casillas 12 and 13); see Finding 2.
- Casilla 22, EGRESOS DEDUCIDOS EN EL EJERCICIO FISCAL (Sumatoria de las
  casillas 15 al 21)
- Casilla 24, TOTAL DE EGRESOS DEDUCIBLES EN EL EJERCICIO FISCAL (Suma de
  las casillas 22 y 23)
- Casilla 33, Pérdida Fiscal arrastrable... producida en el ejercicio
  fiscal que se liquida (Se trasladará automáticamente el monto de la
  casilla 32)
- Casilla 35, Acumulado de Pérdida Fiscal (El Sistema calculará
  automáticamente la sumatoria de las casillas 33 y 34)
- Casilla 37, Saldo de Pérdida Fiscal arrastrable susceptible de ser
  compensado (El Sistema calculará automáticamente la diferencia entre las
  casillas 35 y 36)
- Casilla 39, Saldo de Pérdida Fiscal arrastrable susceptible de ser
  trasladado (El Sistema calculará automáticamente la diferencia entre las
  casillas 37 y 38)
- Casilla 45, RENTA NETA IMPONIBLE (Diferencia entre las casillas 29 y 38)
- Casillas 46/47/48, IMPUESTO DETERMINADO A LA TASA DEL 8%/9%/10% — each a
  published-rate calculation applied to a portion of casilla 45
- Casilla 43, SUBTOTAL Columna I (Sumatoria de las casillas 40 al 42)
- Casilla 50, SUBTOTAL Columna II (Sumatoria de las casillas 46 al 49)
- Casilla 44, SALDO A FAVOR DEL CONTRIBUYENTE (Diferencia entre las
  casillas 43 y 50, cuando 43 sea mayor)
- Casilla 51, SALDO A INGRESAR A FAVOR DEL FISCO (Diferencia entre las
  casillas 50 y 43, cuando 50 sea mayor)

## Scope: Anexo (Cuadro 1 and Cuadro 2) excluded

Cuadro 1 (Préstamos y Remanente, casillas 52-101 plus TOTAL casilla 102) is
a fixed 10-row x 5-column grid whose sole function on this form is to feed
the already-excluded auto-carried casilla 30. Modelling its 50 individual
cells would only supply detail behind a computed field this schema already
excludes.

Cuadro 2 (Familiares a Cargo, casillas 103-154) is a per-dependent-category
identity-document grid — 8 categories, each with a different maximum
number of ID-number slots (1 for Cónyuge, up to 10 across two sub-rows for
Hijos menores de edad, 2 for Padres/Suegros, 4 for Abuelos, etc., confirmed
only by rendering page 3 to an image, since x/y-position text extraction
alone could not distinguish each category's actual slot count from a
uniform 5-column grid) — that supplies identity-document backup for the
deduction amounts already captured at summary level in casillas 16/17
(Egresos personales y a favor de familiares a cargo), not a new
tax-liability-determining figure in its own right.

Neither Cuadro has a repeating-row/array construct available in the v0.3
field model (`type` is a flat scalar enum — string/number/integer/
boolean/date/enum/file/object; see `spec/v0.3/govschema.schema.json`), so
exhaustively naming all ~52-102 individual cells would not add new
computational surface over what casillas 16/17/30 already capture — the
same class of exclusion this registry's `kg/gns/unified-tax-declaration`
already applies to its own excluded computed-cell triplets and unbounded
advance-payment appendix (GOV-4399).

## Disclosed findings and interpretation choices

1. **Casilla 28 is excluded despite lacking the explicit "El Sistema"
   automation wording every other RUBRO 3 line carries.** Its own text
   reads "(Proviene de la casilla 23, aunque solamente hasta el monto
   registrado en la casilla 27)" — "comes from casilla 23, though only up
   to the amount registered in casilla 27" — a min(23, 27) operation with
   no independent degree of freedom beyond two already-modelled/excluded
   same-form casillas, so it is excluded on the same GSP-0013 §7 basis as
   its siblings even without the identical phrasing.
2. **Casilla 14 is excluded as a computed TOTAL despite lacking casilla
   24's explicit "(Suma de...)" parenthetical.** Its own label ("TOTAL
   INGRESOS BRUTOS GRAVADOS...") and position — directly below the two
   GRAVADOS-column entries (casillas 12, 13) it totals — make the same
   TOTAL-line convention this form itself makes explicit elsewhere
   (casilla 24) unambiguous here too.
3. **Casillas 34, 36, 38, and 40 are included as directly-supplied fields,
   not excluded as computed**, despite each referencing another casilla or
   an external limit, because each is either sourced from a *different*
   fiscal year's own return (34: prior-year loss balance; 40: "Proviene de
   la casilla 44 del presente Rubro de la Declaración Jurada del ejercicio
   fiscal anterior", i.e. the PRIOR year's own filing, not this form) or is
   a taxpayer-determined/elected amount the source itself distinguishes
   from system automation: casilla 36's own text states "Este monto deberá
   ser calculado y registrado por el contribuyente" ("this amount must be
   calculated and registered BY THE TAXPAYER", explicitly not by El
   Sistema), and casilla 38 ("que se compensa con la renta neta... limitada
   al 20%") is a taxpayer election of how much prior-year loss to offset,
   up to a cap, not a deterministic same-form formula result. This mirrors
   this registry's own precedent for schedule/table-sourced or
   filer-elected values in `jm/taj/individual-income-tax-return` (that
   document's Finding 2) and `bw/burs/individual-tax-return`.
4. **Casilla 49 (Multa por presentar la Declaración Jurada con
   posterioridad al vencimiento — late-filing penalty) is included, not
   excluded**, because it is not derived from any other same-form casilla
   by addition/subtraction/rate application — a late-filing penalty is
   computed from the filing date relative to the statutory due date, an
   external fact this form does not otherwise capture, so it fails the
   GSP-0013 §7 exclusion test even though an e-filing system would
   typically auto-calculate it.
5. **The top-of-form "Número de Orden" (Order Number) is excluded as a
   system/receipt-assigned tracking number, not applicant-supplied data**,
   distinct from the adjacent RUC/Razón Social/Nombres identity fields
   (which are also un-numbered but are the taxpayer's own enduring
   identity data, needed to know who is filing regardless of who pre-fills
   this specific PDF cosmetically). "Número de Orden" has no meaning
   before this specific declaration is submitted — it is this submission
   instance's own generated tracking ID, the same class of exclusion this
   registry's `jm/taj/individual-income-tax-return` draws around its own
   "FOR OFFICIAL USE" block (that document's Finding 8).
6. **`declarationType` (casillas 01/02) is modelled as a single required
   enum, not two independent booleans**, unlike this registry's own
   precedent for Jamaica's New-Address/Revised-Return tick boxes
   (`jm/taj/individual-income-tax-return` Finding 5): Original and
   Rectificativa are inherently, logically mutually exclusive filing-type
   states (a return cannot be both), so an enum is the more precise
   machine-first representation here, per this repo's own "spec precision
   over cleverness" convention.
7. **`isActivityCessationReturn` (casilla 05) is modelled as an
   independent boolean**, since the source gives no indication it is
   mutually exclusive with `declarationType` — a rectifying return can
   equally be a cessation-of-activities return.
8. **`secondSurname` is modelled `required: false`**, since not every
   individual taxpayer carries two surnames under Paraguay's own naming
   conventions, and the source prints no explicit requiredness marker
   distinguishing it from the required `razonSocialOrFirstSurname`.
9. **No signature/declaration block is present in this specimen** — unlike
   this registry's other individual-income-tax-return schemas (e.g.
   Jamaica's own Section E), this PDF's final content after RUBRO 5 is a
   closing informational note to the taxpayer (Ley N° 125/1991, Art. 162)
   rather than a signature/attestation field, consistent with this being a
   Marangatu e-filing system output whose authentication occurs via the
   taxpayer's own login session rather than a printed signature block.
10. **All RUBRO 1/2/4/5 income, expense, and credit lines are modelled
    `required: false`**, since no individual filer has every category in a
    given year and the form provides no explicit zero/NONE convention
    distinguishing a genuinely-zero casilla from an omitted one — the same
    convention this registry's `jm/taj/individual-income-tax-return`
    (Finding 6) and `zm/zra/individual-income-tax-return` already apply to
    their own income/expense lines.
11. **Every monetary field is modelled `type: integer` with
    `validation.minimum: 0`**, per the form's own printed header
    instruction "LOS IMPORTES SE CONSIGNARÁN SIN CÉNTIMOS" ("amounts will
    be recorded without cents") confirming Paraguayan guaraní amounts on
    this form are always whole numbers, and no line's own text describes a
    possible negative value (unlike, e.g., Jamaica's
    `adjustments`/`donations`).

## Conformance

3 valid mock scenarios — `valid-original-return-employment-income` (an
original return with RUBRO 1 taxable personal-services income and RUBRO 2
direct/social-security deductions, no rectification or prior-year
carryforwards); `valid-rectifying-return-with-housing-and-loss-carryforward`
(a rectifying return exercising `rectifiedDeclarationOrderNumber`, the
housing-acquisition deduction casilla 23, and RUBRO 4's prior-year loss
carryforward casillas); and
`valid-cessation-return-with-credits-and-penalty` (an activity-cessation
return exercising withholding/perception credits, a prior-year credit
balance, and a late-filing penalty) — plus 5 mutation-control fixtures (one
missing statically-required field from each of `ruc`,
`razonSocialOrFirstSurname`, `names`, `declarationType`, `fiscalYear`) and
one unknown-field-rejected fixture, committed under
`conformance/py/dnit/individual-income-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all fixtures: all 3 valid scenarios at 0 errors, all 5
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
