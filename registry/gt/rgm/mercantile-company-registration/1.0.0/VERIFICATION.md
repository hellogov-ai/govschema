# Verification record — gt/rgm/mercantile-company-registration@1.0.0

## Candidate selection

GOV-4631 ("GovSchema Standard Research"). Guatemala was first scouted as a
runner-up new-jurisdiction candidate during GOV-4568's parallel scout
alongside Trinidad and Tobago and Mauritius (both since opened and built
out to 5/6 and 4/6 respectively). That pass found Guatemala's Business
Formation vertical STRONG — the Registro Mercantil's own live,
unauthenticated multi-section web form at
`servicios.registromercantil.gob.gt/formatoSolicitudes/Solicitudes/satrm_02`
— but banked it rather than authoring it immediately, since Guatemala's
other five verticals came back weak/Cloudflare-gated (Visa) or fully
dead-end (DMV, Passport, Taxes, National ID all route through SAT's
login-gated Declaraguate e-filing system or are in-person/booking-only),
leaving Guatemala at only 1 of 6 STRONG verticals versus Mauritius's 4 of 6
— GOV-4603 chose Mauritius first on that basis. Mauritius's entire banked
backlog is now closed (GOV-4624, 4/6: Passport, DMV, Business Formation,
Visa). This cycle re-scanned CATALOG.md's Known Gaps for the next
actionable item and found Guatemala's own banked Business Formation
candidate the strongest still-open item — re-verified live this cycle
before authoring.

## Reaching the live source

`https://servicios.registromercantil.gob.gt/formatoSolicitudes/Solicitudes/satrm_02`

- Plain unauthenticated `curl` with a realistic desktop User-Agent, no
  session/cookie state, no CAPTCHA/WAF challenge: HTTP 200,
  `text/html; charset=utf-8`, 127,192 bytes (title: "Solicitudes - ").
- Unlike every other schema this registry has authored to date, this
  candidate is not a PDF/DOCX specimen but a **live, server-rendered HTML
  form** — the form's own `<form>` tag posts to
  `/formatoSolicitudes/Solicitudes/pdfsatrm_02`, which the page's own
  "ENVÍE SU SOCIEDAD EN LÍNEA GRATIS A TRAVÉS DE EPORTAL" banner and a
  "Exportar a PDF" submit button confirm renders the completed submission
  to a PDF server-side — i.e. this HTML *is* the authoritative live
  channel for Form SAT-RM-02, not a mirror or preview of a separate static
  document. Every field name, label, numbered item marker, `maxlength`,
  and `onclick` validation script was read directly out of the served
  HTML/inline `<script>` blocks — no PDF text-layer or canvas-render step
  was needed for this specimen.

### Authority attribution

The form's own heading ("SOLICITUD DE INSCRIPCIÓN DE SOCIEDADES MERCANTILES
ANTE LA SUPERINTENDENCIA DE ADMINISTRACIÓN TRIBUTARIA Y EL REGISTRO
MERCANTIL"), its "SAT-RM-02" code, its hosting on the Mercantile Registry's
own `registromercantil.gob.gt` domain, and its footer copyright ("© 2026 -
Registro Mercantil General de la República") together attribute `authority`
to the **Registro Mercantil General de la República** (abbreviation RGM)
directly, notwithstanding that the form's own content and the resulting
registration also carry SAT tax-registration effect (see "Document
structure" below).

## Document structure

The form is a single continuous page organized into six roman-numeraled
sections plus an "INSCRIPCIÓN A IMPUESTOS" (tax registration) block and a
closing declaration/signature — every field is printed with its own
sequential item number (1 through 74, with one genuine numbering defect
disclosed below):

- **I. Datos de Identificación del Solicitante** (Items 1-14) — the
  applicant's own name, nationality, identification document (passport or
  DPI — a genuine mutually-exclusive pair, confirmed via the page's own
  `opcion_documento()` script, which disables the sibling checkbox/hides
  the sibling number field), place of issue, capacity in which they act
  (Notario / Representante Legal / Socio — confirmed mutually exclusive via
  `opcion_actua()`), NIT, phone, email.
- **II. Datos para Inscripción de Sociedades Mercantiles** (Items 15-43) —
  the company's own name, trade name, duration, fiscal address, purpose
  (a 2000-character free-text area), capital structure (authorized capital,
  number of shares, nominal share value, subscribed capital, paid capital),
  incorporation-deed citation, three checkbox groups for the company's
  administration body / oversight body / legal-representation cargo (all
  three confirmed **not** mutually exclusive — their own
  `org_administrador()`/`organo_fiscalizacion()`/
  `cargo_representacion_legal()` scripts only set `value=true` on check,
  never disabling siblings, unlike the identification-type/capacity pairs
  above), the authorizing notary's own particulars, and an optional
  complementary/amending-deed citation.
- **III. Datos del Representante Legal** (Items 43-52) — the legal
  representative's own name, contact details, identification (passport/DPI,
  again confirmed mutually exclusive via `identificacion_representante()`),
  nationality, address, NIT, title/cargo (free text), and the notarial act
  of appointment's date and term.
- **IV. Datos para Inscripción de Empresa Mercantil de la Sociedad** (Items
  53-60) — the company's first mercantile business establishment: its own
  address, municipality/department, contact details, SAT economic-activity
  code, capital, and purpose (a second 2000-character free-text area).
- **V. Datos del Contador** + **INSCRIPCIÓN A IMPUESTOS** (Items 61-73) —
  the appointed accountant's own particulars, then SAT tax-regime
  elections: IVA (Pequeño Contribuyente vs. Régimen General — an
  undiscriminated either/or pair, no selector checkbox, only two amount
  fields), ISR (Régimen sobre las Utilidades, its own two non-exclusive
  calculation-method checkboxes, the Régimen Opcional Simplificado, and
  Retención Definitiva), inventory-valuation system (five non-exclusive
  checkboxes), accounting system (Devengado/Percibido, two non-exclusive
  checkboxes), the vehicle-circulation tax field, and the Impuesto de
  Solidaridad (ISO) credit-interplay pair.
- **VI. Habilitación / Autorización de Libros** (Item 74) — a single table
  registering the company's statutorily required accounting books. The
  first four rows (INVENTARIO, DIARIO, MAYOR, ESTADOS FINANCIEROS) print
  fixed, `readonly` book names — these are the four books every merchant
  must maintain under Guatemala's Commercial Code (Código de Comercio,
  Decreto 2-70, Art. 368) — each with an applicant-editable page-count
  ("No. De Hojas") field. Seven further rows (initially `hidden`,
  revealed via an on-page "+" control up to a hard cap of 11 total rows,
  confirmed by the table's own `newROW(true, 11)` handler) offer editable
  book-name and page-count pairs for any additional books the company
  chooses to register. Each row also carries "Electrónicos"/"Físicos"
  medium checkboxes — but the table's own `fisico_elcectronico()` script
  confirms these are **not** independent per-row choices: checking
  "Electrónicos" on row 1 (INVENTARIO) disables "Físicos" on that row *and*
  enables the "Electrónicos" checkbox for every other row (rows 2-11),
  while leaving every other row's own checkbox unchecked until the
  applicant acts on it — i.e. the medium is a single global election
  applying uniformly to the whole set of registered books, not a per-book
  attribute. Modelled as one `bookMedium` discriminator rather than 22
  individual checkboxes.
- **Closing declaration and signature** — a sworn-declaration paragraph
  citing Arts. 459/460 of the Código Penal (perjury/false testimony) and
  Art. 13 of the Ley para la Simplificación de Requisitos y Trámites
  Administrativos, followed by a single "Firma" signature line. A
  preceding sentence ("Ninguna dependencia podrá exigir la presentación de
  Declaraciones Juradas...") is boilerplate legal notice, not a field.

### Disclosed numbering defect

The form's own printed item numbers skip **42** entirely and instead reuse
**43** twice — once for "NOMBRE DE NOTARIO AUTORIZANTE" at the end of
Section II, and again, immediately after, for "NOMBRE DEL REPRESENTANTE
LEGAL" at the start of Section III. This is a genuine defect in the live
source's own numbering (confirmed by reading the raw HTML in document
order, not a transcription error here) and is disclosed on the affected
field (`complementaryDeedNotaryName`'s own `sourceRef`) rather than
silently renumbered.

## Discriminator fields: what the source itself enforces vs. does not

This form's inline `<script>` blocks let this schema distinguish genuinely
mutually-exclusive checkbox pairs/triplets (the source's own JS disables
the sibling control(s) on selection) from checkbox groups the source
leaves independently toggleable (the JS handler only sets `value=true` on
the checked box, never touching its siblings):

- **Enforced exclusive (modelled as `enum` discriminators):**
  `applicantIdentificationType` (`opcion_documento()`), `applicantCapacity`
  (`opcion_actua()`), `representativeIdentificationType`
  (`identificacion_representante()`), and `bookMedium`
  (`fisico_elcectronico()`, which additionally cascades across all 11
  book-table rows rather than gating just one pair).
- **Not enforced exclusive (modelled as independent `boolean` fields):**
  the Item 31/32/33 administration/oversight/legal-representation body
  groups (`org_administrador()`, `organo_fiscalizacion()`,
  `cargo_representacion_legal()`), the Item 66-71 ISR-calculation-method,
  inventory-valuation, and accounting-system groups (all sharing one
  `impuesto_s_renta()` handler), and the Item 73 ISR/ISO credit pair
  (`otros_impuesto()`). Forcing these into enums would assert an
  exclusivity constraint the live source itself does not enforce — a
  company could, per the source's own permissiveness, in principle check
  more than one, even if real-world practice would not.

## Scope: fields and sections excluded

- The "Número Formato" / "Código" boxes at the very top of the page
  (`correlativo`, disabled/pre-filled, plus one unnamed adjacent input) —
  office-assigned form-tracking numbers, not applicant-supplied data, the
  same "office-internal control block" convention this registry applies
  elsewhere (e.g. `mx/sre/passport-application`'s "Campos de control").
- The boilerplate legal notice immediately preceding the signature line and
  the "Exportar a PDF" / "Ingrese su correo para enviarle una copia..."
  UI chrome — not printed form content.

## Scope: judgment calls on requiredness

This source carries no asterisk/mandatory-marking convention, no HTML
`required` attributes, and no blocking client-side validation before
submission (confirmed: zero `required=` occurrences in the served HTML,
and the submit button's own `onclick="regresar()"` only manages a
download-progress modal, performing no field-completeness check) — so
requiredness was assigned by engineering judgment, following this
registry's standard approach of treating a document's own core declared
content as required absent contrary evidence:

1. **Core identity/particulars fields modelled required**: the applicant's
   first surname/name, nationality, identification type and place of
   issue, capacity, NIT, phone, email; the company's name, fiscal address,
   municipality/department, purpose, full capital structure, and
   incorporation-deed citation; the authorizing notary's own particulars;
   the legal representative's name, identification, nationality, address,
   NIT, title, and appointment date; the business establishment's address,
   municipality/department, SAT activity code, capital, and purpose; the
   accountant's name, NIT, and appointment date; `bookMedium`; and the four
   statutorily fixed books' page counts. All are either the operative legal
   content of a mercantile-company registration or a document the
   Commercial Code itself requires.
2. **Explicitly-marked-optional fields left optional**: `applicantMarriedSurname`
   ("(OPCIONAL)") and `establishmentEmail` ("(OPCIONAL)") — the form's own
   printed text, not inferred.
3. **Contact-detail fields (phone/email at the company, notary, legal
   representative, and business-establishment levels) modelled optional.**
   Several of these fields default to a printed `value="0"` in the source's
   own HTML (e.g. `TELEFONO_S`, `TELEFONO_NOTARIO_S`, `TELEFONO_RL`,
   `TELEFONO_E`) rather than being left blank — a strong signal the source
   itself does not expect every one of these boxes to carry a genuine value
   — while the applicant's own Item 13/14 phone/email (no such default) are
   modelled required.
4. **`companyDuration`/`representativeAppointmentTerm` (\"PLAZO\") left
   optional.** Both are short free-text fields (15- and 12-character limits
   respectively) with no printed default and no explicit "indefinido"
   checkbox alternative; per this registry's own
   `notequals-empty-string-absent-field-bug` practice, no `requiredWhen`
   gate was invented for either.
5. **`complementaryDeedNumber`/`Place`/`Date`/`complementaryDeedNotaryName`
   modelled optional as a group, with no `requiredWhen` gate on the primary
   incorporation-deed fields.** A complementary/amending deed exists only
   where the incorporation was later amended before registration — not
   every filing has one, and the source itself prints no checkbox
   indicating "yes, a complementary deed exists" to gate on.
6. **All eleven checkbox-group fields (administration/oversight/legal-
   representation bodies; IVA regime amounts; ISR profit regime,
   calculation method, simplified regime, definitive withholding;
   inventory valuation; accounting system; vehicle-circulation tax; ISR/ISO
   credit pair) modelled optional.** None carries a printed asterisk, and
   — per the "Discriminator fields" section above — none of these groups is
   even enforced mutually exclusive by the source's own script, so no
   single option can be inferred as universally mandatory.
7. **`vehicleCirculationTaxRegistration` modelled as a free-text `string`,
   not a `boolean` or `number`.** The source prints only a bare text input
   under "OTROS IMPUESTOS" with no further label detail (unlike every other
   field in this section, which is either an amount field with an
   adjoining regime label or a plain checkbox) — see this registry's
   standing "don't invent structure/typing the source doesn't show"
   practice (cf. `mu/nlta/vehicle-registration-mark-application`'s
   `individualTitle` free-text-not-enum judgment call).
8. **Additional-book slots (`additionalBook1..7Name`/`PageCount`) modelled
   optional with no gating field**, per this registry's established
   bounded-repeating-group convention (e.g.
   `mu/cbrd/limited-partnership-registration`'s `generalPartner1..7`
   slots) — the source prints no "number of additional books" count field
   to condition on, only the expandable row mechanism itself (capped at 7
   additional rows beyond the four fixed rows, confirmed via the table's
   own `newROW(true, 11)` limit argument).

## Conformance

Two mock scenarios were reasoned through programmatically against this
schema's own `fields[]` conditions (required/requiredWhen/enum rules; not
committed as fixture files, following this registry's precedent for other
recently authored specimens without committed fixtures, e.g.
`mu/cbrd/limited-partnership-registration`):

1. **A DPI-holding partner applicant registering a small-taxpayer sociedad
   anónima, electing electronic books, with only the four statutorily
   fixed books (no additional books).** Every required field populated
   (`applicantIdentificationType` = `dpi` with `applicantDpiNumber` set and
   `applicantPassportNumber` correctly left blank; `applicantCapacity` =
   `partner`; `representativeIdentificationType` = `dpi`; `bookMedium` =
   `electronic`; all four `book{1-4}PageCount` populated); no additional-book
   slots or complementary-deed fields populated — validates cleanly.
2. **A passport-holding notary applicant/representative registering two
   additional books under a physical-medium election.** Same base facts as
   scenario 1 but with `applicantIdentificationType`/
   `representativeIdentificationType` = `passport` (their respective
   `*PassportNumber` fields populated, `*DpiNumber` fields correctly left
   blank), `applicantCapacity` = `notary`, `bookMedium` = `physical`, and
   `additionalBook1Name`/`PageCount` and `additionalBook2Name`/`PageCount`
   both populated — validates cleanly.
3. **Three mutation controls**, each independently confirmed to raise
   exactly one error against scenario 1's baseline: (a) blanking
   `companyName` → missing-required error on `companyName` alone; (b)
   flipping `applicantIdentificationType` to `passport` without supplying
   `applicantPassportNumber` (while `applicantDpiNumber` remains populated
   from the DPI track) → missing-required error on
   `applicantPassportNumber` alone, confirming the `requiredWhen` gate
   tracks the discriminator's current value rather than either number
   field's mere presence; (c) setting `bookMedium` to an invalid value
   (`"both"`, outside the `electronic`/`physical` enum) → an enum-violation
   error alone.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 113 `fields[]` across 9 steps. No `documents[]` entries — this
specimen's own supporting-document requirements (if any) are not disclosed
anywhere on the live form itself, unlike this registry's PDF/DOCX
specimens that print an explicit checklist.

**Opens Guatemala as the registry's 93rd jurisdiction (Business
Formation, 1 of 6).** Guatemala's other five verticals were screened
during GOV-4568's own scouting pass and found weak/dead-end: Visa (WEAK —
real forms exist on `minex.gob.gt`/`igm.gob.gt` per an archived snapshot,
but both live hosting domains sit fully behind a Cloudflare Managed
Challenge that stalled indefinitely under a real Playwright/Chromium
session; not confirmed downloadable); DMV (vehicle registration and
driver's licensing both route through SAT's login-gated Declaraguate
e-filing system or are in-person-only); Passport (issuance is
booking-only via a Cloudflare-blocked portal, no static form); Taxes
(every ISR form is generated only inside the login-gated Declaraguate
portal); National ID (RENAP's DPI is in-person-only for first issue, with
only a login-gated portal for replacement/certifications) — all not
re-screened this cycle, carried forward from GOV-4568's own record.
