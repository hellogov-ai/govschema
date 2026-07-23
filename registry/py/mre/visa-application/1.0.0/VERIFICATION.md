# Verification record — py/mre/visa-application@1.0.0

## Candidate selection

GOV-4451 ("GovSchema Standard Research"). The GOV-4424 cycle scouted
Paraguay as a brand-new jurisdiction and found it the strongest of three
candidates (4 of 6 verticals STRONG — Taxes, Business Formation, DMV,
Visa; see CATALOG.md's Known Gaps entry 0i). Taxes, Business Formation,
and DMV were authored first (GOV-4427, GOV-4435, GOV-4443); this issue
authors Visa, the fourth and last of the scouting cycle's STRONG
candidates, closing Paraguay's disclosed backlog entirely — Passport and
National ID (cédula) remain confirmed dead ends per the scouting cycle's
own findings.

## Reaching the live source

The scouting cycle's own note already gave the exact document URL and
byte count; both were independently re-verified rather than trusted at
face value:

- `https://www.mre.gov.py/wp-content/uploads/documentacion-dgp/Formulario_de_Visa_Titular_2021..docx`
- HTTP 200, `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  57,591 bytes — matching the banked figure exactly.
- No login, CAPTCHA, or WAF gate — a plain unauthenticated `curl` request
  with a desktop User-Agent reached it cleanly.
- sha256 `1a85502c1a56c457fdb030b56af3c3198426f54d9f99ed5496298bac8b66a115`.

A sibling "Dependiente" (dependent/family-member) form was referenced by
the scouting cycle's own note as forming a ".docx pair" with this Titular
form, but its exact URL slug could not be independently re-derived this
cycle (the obvious `Formulario_de_Visa_Dependiente_2021..docx` guess
404s) — it is left as unverified, open backlog rather than guessed at,
and this schema is scoped to the Titular form only.

## Extraction method

This is a native Office Open XML `.docx`, unlike this registry's usual
scanned/AcroForm PDF Paraguayan specimens. Extracted with Python's
standard-library `zipfile` module (no `pip`/third-party dependency
needed) to unzip the archive, then `xml.etree.ElementTree` to parse
`word/document.xml` and walk its `w:body`/`w:tbl`/`w:tr`/`w:tc`/`w:p`/
`w:r`/`w:t` element tree in document order, recovering every printed
label together with its table position.

An explicit grep of the raw XML confirmed zero `w:sdt` content controls,
zero legacy `w:ffData` form fields, and zero `w:checkBox` elements
anywhere in the document — this specimen carries no structured
form-field widgets of any kind. The only non-text constructs are
decorative `mc:AlternateContent`/`w:pict` VML checkbox-box shapes
preceding a handful of printed option labels (Nueva Expedición/
Renovación; No/Sí) — rendered boxes meant to be marked by hand, not
machine-readable fields. These were used only to identify which printed
labels are mutually-exclusive checkbox options versus plain blank-line
fields; every other field is a blank table cell meant to be typed into
directly, the same "flat, form-tool-generated document with no
structured fields" pattern this registry's other Paraguayan specimens
(`py/suace/business-formalization-individual`, `py/mda/driving-licence-declaration`)
already establish, just via a `.docx` container instead of a PDF.

## Document structure

A single page: a photo-attachment placeholder ("FOTO 5X5 FONDO BLANCO
Pegar Aquí") and header identifying the Ministerio de Relaciones
Exteriores's Dirección General de Protocolo; a request-date line and
"Misión Diplomática/Org. Int." field; a two-way Nueva Expedición/
Renovación checkbox pair; a "DATOS DEL TITULAR" block (name, place and
date of birth, nationality, a Sí/No permanent-residency question with a
conditional Cédula de Identidad number, marital status, sex, home
address/city, passport type-and-number, passport country, passport
validity Desde/Hasta, date of entry into the country, point of entry); a
"DATOS LABORALES" block (rank/grade, function performed, approximate
length of stay, name of predecessor if applicable, work address/city,
work phone, email); a signature block (Firma del Titular, Sello de la
Misión, Jefe de Misión Firma y Aclaración); a "Uso exclusivo de la
Dirección General de Protocolo" office-processing block (Procesado por /
V°B° Jefe de Asuntos Protocolares / Autorizado); and a "NÚMERO DE VISA /
TIPO DE VISA / VISA VALIDA HASTA" block recording the visa the
government ultimately issues.

## Scope: excluded blocks

- **The photo-attachment placeholder** — a physical photograph, not a
  data field.
- **The signature/seal block** ("Firma del Titular", "Sello de la
  Misión", "Jefe de Misión Firma y Aclaración") — physical signatures and
  a physical seal, with no corresponding blank data cell.
- **"Uso exclusivo de la Dirección General de Protocolo"** — internal
  government sign-off (Procesado por / V°B° Jefe de Asuntos
  Protocolares, Inmunidades y Privilegios / Autorizado), not applicant
  input. The same class of exclusion this registry's
  `py/suace/business-formalization-individual` (Finding 8) and
  `py/dnit/individual-income-tax-return` (Finding 5) already draw around
  their own "for official use" blocks.
- **The "NÚMERO DE VISA / TIPO DE VISA / VISA VALIDA HASTA" block** — the
  visa the government issues as output of the process, not applicant
  input.
- **The closing "Los formularios presentados revisten carácter de
  declaración jurada" line** — a printed legal notice, not a field.

## Disclosed findings and interpretation choices

1. **This form is scoped to diplomatic/official/courtesy visas
   specifically**, per its own printed title ("VISA DIPLOMÁTICA –
   OFICIAL – DE CORTESÍA") — it is not Paraguay's general tourist/
   business visa, which the GOV-4424 scouting cycle separately confirmed
   is a distinct login-gated online system excluded from consideration.
   This form is filed by an accrediting diplomatic mission or
   international organization on behalf of the Titular (visa
   beneficiary), not filed directly by an ordinary traveler.
2. **`sexo` is modelled as an `enum` (`masculino`/`femenino`), not free
   text**, even though the source prints a plain blank cell with no
   option list — following this registry's established convention for
   the identical situation on `py/mda/driving-licence-declaration`'s own
   `sexo` field (itself following `do/mirex/passport-application`'s
   precedent).
3. **`estadoCivil` (marital status) is modelled as free-text `string`,
   not `enum`**, since the source prints only a plain blank cell with no
   checkbox group — following `uy/mrree/formulario-unificado-de-visas`'s
   own explicit precedent for the same distinction (a blank line is free
   text; a printed checkbox grid would be an enum, and this form has no
   such grid for marital status).
4. **`tieneResidenciaPermanente` is modelled as `boolean`, not `enum`**,
   since the source's "¿Posee residencia permanente en el Paraguay?"
   question is a plain two-way Sí/No choice, consistent with this
   registry's convention of using `boolean` for two-way Sí/No questions
   (as opposed to `enum` for the form's own `tramiteType`, a genuinely
   different Nueva Expedición/Renovación choice, not a yes/no question).
5. **`tipoNumeroPasaporte` combines passport type and number into one
   field**, since the source prints exactly one blank cell under the
   single label "Tipo y N° de Pasaporte" with no separate boxes — unlike
   `py/suace/business-formalization-individual`'s own three-document-type
   row, this source gives the combined label only one cell, so no split
   is invented.
6. **`nombreAntecesor` (name of predecessor) is modelled as optional
   (`required: false`) with no `requiredWhen` gate**, per the source's
   own footnote instruction "Indicar en el caso de que corresponda a un
   nuevo cargo" (indicate only if this corresponds to a new posting) — a
   genuinely conditional-on-circumstance field with no other form field
   it could be gated against.
7. **`requestDate` (the top-of-form "Fecha:" line) is modelled as a
   required applicant-facing field**, distinct from the separate
   office-processing block's own internal sign-off dates — it sits in
   the form's main body immediately after the header, before the
   office-only block begins, consistent with this being the date the
   submitting mission completes the form.
8. **No field in this source carries an asterisk or other explicit
   required-field marker** (unlike `py/suace/business-formalization-individual`,
   which marks required fields with `*`). Requiredness here is inferred
   from the form's own structural purpose: every identity, passport, and
   employment field a diplomatic mission would need to supply to support
   a visa request is modelled as required, except the two fields the
   source itself marks conditional in wording (`cedulaIdentidadNumero`,
   gated on `tieneResidenciaPermanente`) or by footnote
   (`nombreAntecesor`).

## Conformance

3 valid mock scenarios:

- `valid-nueva-expedicion-sin-residencia` — a new diplomatic-visa request
  for a Titular with no Paraguayan permanent residency.
- `valid-renovacion-con-residencia-permanente` — a renewal for a Titular
  who holds Paraguayan permanent residency, exercising the conditional
  `cedulaIdentidadNumero`.
- `valid-nueva-expedicion-con-antecesor` — a new courtesy-visa request
  exercising the optional `nombreAntecesor` field for a new posting.

8 mutation-control fixtures (one missing statically-required field each
from `requestDate`, `misionDiplomatica`, `tramiteType`, `nombres`,
`fechaNacimiento`, `tieneResidenciaPermanente`, `sexo`,
`correoElectronico`) and one unknown-field-rejected fixture, all
committed under `conformance/py/mre/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving
required/requiredWhen rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 12 fixtures: all 3 valid
scenarios at 0 errors, all 8 mutation controls each raising exactly 1
error, and the unknown-field fixture correctly rejected.

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run
build-index` in `tools/govschema-client/`.
