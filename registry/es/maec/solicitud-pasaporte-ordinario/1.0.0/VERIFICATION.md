# Verification record — `es/maec/solicitud-pasaporte-ordinario` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is **GOV-3358**, "GovSchema Standard Research." Spain currently has 5 of
6 verticals modelled (Business Formation via `es/aeat/declaracion-censal-*`,
DMV via `es/dgt/solicitud-tramites-vehiculo`, Taxes via the same AEAT
schemas, National ID via `es/dgp/tarjeta-identidad-extranjero`, Visa via
`es/maec/solicitud-visado-nacional`). Passport was the sole remaining gap.
This document closes it, giving Spain 6 of its 6 verticals.

## Correcting a prior dead-end finding

`es/maec/solicitud-visado-nacional`'s own VERIFICATION.md (GOV-1861,
2026-07-08) states: "Passport remains a confirmed dead end (appointment-only,
no downloadable form...)". That finding is accurate as far as it goes but
incomplete: it screened only the **domestic** issuance channel (Documento
Nacional de Identidad electrónico / Policía Nacional network, which really is
appointment-only with no public specimen this cycle could find either). It
did not screen the **consular** channel — passport services a Spanish
national living abroad obtains through their local Spanish consulate, a
distinct organizational unit under the same Ministerio de Asuntos Exteriores,
Unión Europea y Cooperación (MAEC) that already publishes this registry's own
`es/maec/solicitud-visado-nacional`. This cycle searched MAEC's own consulate
subdomains directly (the same domain family the visa schema's own source
lives on) and found a genuine, unauthenticated, downloadable "Solicitud de
Pasaporte" specimen. The domestic dead-end finding stands (still no
downloadable specimen found for that channel); the consular channel is a
distinct, previously-unscreened source, and it is a strong one.

## Candidate screening (Phase 1-2)

A research-scout report (this cycle) proposed Estonia's `politsei.ee`
"identity document application" (ID-kaart) as the strongest candidate to fill
Estonia's apparent National ID gap. Independently re-checking CATALOG.md
before acting on it found Estonia had already reached 6 of 6 verticals as of
GOV-1970 (2026-07-09) — its Visa vertical closure explicitly states "closing
Estonia's last remaining vertical gap and bringing it to 6 of 6" — so that
candidate was not a genuine gap (a classifier false positive: the scout's
path-based vertical classifier had not counted `ee/ppa/e-residency-application`
as Estonia's National ID entry, but CATALOG.md's own narrative history
already had). Spain's own Passport gap, also flagged by the same scouting
pass and independently re-confirmed unfilled by scanning `registry/es/`
directly, was picked instead.

### Candidate examined and picked: MAEC's consular "Solicitud de Pasaporte" form

Located via a general web search for the Spanish passport application form,
which surfaced several Spanish-consulate PDF mirrors on `exteriores.gob.es`
(MAEC's own domain). Four independent consulate copies were fetched and
compared directly this cycle (none via WebFetch summary — every PDF was
downloaded with `curl` and its bytes parsed with `pdfjs-dist` directly):

| Consulate | URL (relative to `exteriores.gob.es`) | Bytes | `Last-Modified` | Pages | AcroForm widgets |
|---|---|---|---|---|---|
| **Buenos Aires (primary)** | `/DocumentosAuxiliaresSC/Argentina/BUENOS%20AIRES%20(C)/Solicitud%20de%20pasaporte.pdf` | 51,856 | 2022-05-12 | 1 | 0 (print-and-fill; text-layer extracted) |
| La Habana | `/DocumentosAuxiliaresSC/Cuba/LA%20HABANA%20(C)/Nacionalidad/SOLICITUD%20PASAPORTE.pdf` | 45,436 | 2022-03-29 | 1 | 0 |
| Asunción | `/Embajadas/asuncion/es/Embajada/Documents/Formularios/FORMULARIO%20DE%20SOLICITUD%20DE%20PASAPORTE%20ESPA%C3%91OL.pdf` | 107,818 | 2022-03-31 | 2 | 0 |
| Miami | `/DocumentosAuxiliaresSC/Estados%20Unidos/MIAMI%20(C)/FORMULARIO%20SOLICITUD%20PASAPORTE.pdf` | 273,618 | 2022-03-22 | 1 | 17 (genuine fillable AcroForm) |

All four were fetched with plain, unauthenticated `curl` GET requests — HTTP
200, real `%PDF-1.x` content confirmed by magic bytes, no login/CAPTCHA/WAF
gate on the GET path (a HEAD request to the Asunción URL returns 403 — the
same WAF-quirk-affecting-only-HEAD pattern already documented in
`solicitud-visado-nacional`'s own VERIFICATION.md — re-confirmed by
immediately re-issuing a GET, which again returned 200).

**Buenos Aires was picked as primary `source`** because it is both the most
recently revised of the four (2022-05-12, roughly six to seven weeks after
the other three) and the most complete: it is the only copy carrying
`Estado Civil` (marital status), `Profesión` (profession), and a `CP`
(postal code) sub-field alongside `Domicilio Residencia`, none of which
appear in the La Habana or Asunción text layers. La Habana's own text is
otherwise a near-verbatim match of Buenos Aires's (same field order, same
labels, same six-option `Motivo` checkbox set), which corroborates the base
form rather than contradicting it — the extra fields read as a later
template revision each consulate adopts on its own schedule, not a
divergent, unrelated form. Miami's copy is the clear outlier: an older,
shorter single-page AcroForm variant (17 widgets) with no `Motivo` checkbox
set at all, but its 17 named widgets (`Nombre della solicitante`,
`Apellidos`, `Lugar de Nacimiento Ciudad Provincia Estado`, `Fecha de
Nacimiento`, `Profesión`, `Estado Civil`, `Nombre de los Padres`, `Domicilio
actual`, three separate phone widgets, `Centro de trabajo`, `Domicilio en
España en su caso`, `Nombre y Apellidos de su cónyuge`, `N DNI`, `N de
Pasaporte anterior`, `Fecha`) independently corroborate every core identity
field this document models from Buenos Aires's text layer — strong
cross-source confirmation that these are genuine applicant-facing fields,
not an artifact of one consulate's own local drafting.

### Corroborating source: Asunción's supplementary instructions and minors' authorization page

Asunción's own two-page copy is the only one of the four carrying (a) a
numbered instructions list describing the required supporting documents, and
(b) a second-page parental travel-authorization annex for minors. Its own
page-1 field layout matches La Habana's and Buenos Aires's (minus `Estado
Civil`/`Profesión`), confirming it is the same base form family. Its
instructions list is the source for this document's `documents[]` entries
(see Field inventory below); its second-page minors' annex is **not**
modelled — see "What is NOT modelled" below.

## Field inventory (Phase 3)

All 22 `fields[]` entries are recorded inline in `schema.json`'s own
`sourceRef` per field, each citing the exact printed Spanish label. Summary:

| Group | Fields | Notes |
|---|---|---|
| Identity | `givenName`, `firstSurname`, `secondSurname`, `dateOfBirth`, `sex` | `secondSurname` optional — a compound-second-surname is not universal in Spanish naming, and neither mirror marks it required |
| Birth details | `placeOfBirth`, `countryOfBirth`, `provinceOfBirth` | `provinceOfBirth` gated `requiredWhen countryOfBirth equals "España"`, per the form's own `"* Sólo nacidos en España"` annotation |
| Personal/contact | `mobilePhone`, `landlinePhone`, `maritalStatus`, `profession`, `email` | `maritalStatus`/`profession` sourced from the Buenos Aires copy only — see Judgment call 1 |
| National ID | `dni`, `dniIssueDate` | Both optional, no `requiredWhen` tie between them — see Judgment call 2 |
| Family | `fatherName`, `motherName` | Both optional; the form gives no indication either is mandatory for an adult applicant |
| Residence | `residenceAddress`, `residencePostalCode`, `residenceCity`, `residenceCountry`, `consularRegistrationStatus` | `residencePostalCode` sourced from the Buenos Aires copy only |
| Application reason | `reasonForApplication` | 6-option enum from the `Motivo` checkbox set |
| Prior passport | `previousPassportNumber`, `previousPassportExpiryDate` | Both gated `requiredWhen reasonForApplication notEquals "Inicial o Renovación"` |

Total: **22 fields**, **4 `documents[]` entries**, **0 `crossFieldValidation`**
rules (no two date/numeric fields on this form have a stated ordering
relationship to check).

## Access notes and judgment calls

1. **`maritalStatus` and `profession` are modelled even though two of the
   four mirrors (La Habana, Asunción) omit them.** Buenos Aires's copy is
   the most recently revised (see table above), and Miami's independent
   AcroForm widget set (`Estado Civil`, `Profesión`) confirms these are
   genuine, recurring fields on this form family rather than a Buenos
   Aires-specific addition — so this document follows the fuller, more
   corroborated, more recently dated source rather than the older/shorter
   copies.
2. **`dniIssueDate` carries no `requiredWhen` tie to `dni`, even though the
   form visually pairs them.** `dni` itself is optional (annotated `"* Si lo
   posee"` — if held) and no instruction states the issue date is only
   required when a DNI is given. Gating `dniIssueDate`'s requiredness on
   `dni`'s presence would need a comparison against `dni`'s absence — this
   registry's own established convention is that `notEquals`/`in` checks
   against an *optional* field's absence, rather than against another
   *required* field's value, risk misfiring when the paired field is simply
   never supplied (a distinct outcome from it being deliberately set to a
   sentinel value). Rather than construct that fragile tie for a dependency
   the source itself does not explicitly assert, `dniIssueDate` is left
   independently optional. Every `requiredWhen` this document does assert
   (`provinceOfBirth`, `previousPassportNumber`,
   `previousPassportExpiryDate`, and the two conditional `documents[]`
   entries) is instead gated on a field that is itself always `required:
   true` (`countryOfBirth` or `reasonForApplication`), so none of them carry
   this risk.
3. **`consularRegistrationStatus`'s enum values (`"Residente"`,
   `"No Residente"`) are inferred from the shorthand `"RES. O NO RES."`
   printed on the La Habana and Asunción copies** (Buenos Aires's own text
   layer shows only the field label with no visible option text at the
   coordinates extracted) — the two shorter labels are the natural
   full-word expansion of the same abbreviation, not a guess at unrelated
   wording.
4. **The Asunción mirror's page-2 parental travel-authorization annex is not
   modelled.** It appears on only one of the four mirrors compared (absent
   from Buenos Aires, La Habana, and Miami), so this cycle treats it as a
   local addition by that one consulate rather than part of the base form
   every consulate uses — consistent with this registry's standing
   non-fabrication discipline (model what the primary, most-corroborated
   source states, not what a single outlier mirror adds).
5. **`documents[]` derives from the Asunción mirror's own eight-item
   numbered instructions list**, since neither Buenos Aires, La Habana, nor
   Miami print an equivalent checklist in the extracted text. Of its eight
   items: item 2 (photo) is universal and modelled unconditionally
   (`applicantPhoto`); item 3 (prior passport/DNI copy) is modelled gated on
   `reasonForApplication notEquals "Inicial o Renovación"`
   (`previousDocumentCopy`) since it only makes sense when a document is
   being renewed/replaced, not on first issuance; item 5 (local police
   report) is modelled gated on `reasonForApplication in ["Robo",
   "Extravío"]` (`policeReport`), matching the instruction's own explicit
   "en el caso de extravío/robo" (in case of loss/theft) condition; item 7
   (literal Spanish birth certificate, for those born abroad and registered
   in a foreign Civil Registry) is modelled as optional
   (`birthCertificate`) since this cycle could not independently confirm
   the exact trigger against a field on the form itself (there is no
   `wasRegisteredAbroad`-style field to gate on). Item 4 (Paraguayan Cédula
   de Identidad) is Asunción-consulate-specific (only relevant to applicants
   resident in Paraguay) and not modelled; item 6 (consular fee) is a
   payment, not a document; item 8 (minors' parental authorization) ties to
   the unmodelled page-2 annex (Judgment call 4) and is not modelled.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national passport-issuing authority, and submitting fabricated identity data
into a real government system is not a safe or reversible action.

Instead, a hand-constructed mock record was built from this document's own
field inventory
(`conformance/es/maec/solicitud-pasaporte-ordinario/1.0.0/renewal-valid.json`,
a renewal scenario) and a second, minimal first-issuance scenario
(`initial-issuance-valid.json`), then independently checked with a
standalone, from-scratch rule-tracing script (not committed — reads
`schema.json`'s own `required`/`requiredWhen`/`validation.pattern`/
`validation.enum`/`validation.maxLength` and evaluates them against each
mock record).

**Scenario 1 — Marisol Fernández Ibáñez, a Spanish national resident in
Buenos Aires renewing an expiring ordinary passport.**
`reasonForApplication: "Inicial o Renovación"` — the two `previousPassport*`
fields and the `previousDocumentCopy` document are populated even though not
strictly required for this reason value (a renewal in practice always has a
prior document to hand); `policeReport` correctly stays absent (not gated on
this reason value). Passes with zero errors.

**Scenario 2 — Tomás Reyes Aguirre, born in Asunción to a Spanish father,
applying for his first-ever Spanish passport.** `reasonForApplication:
"Inicial o Renovación"`, `dni` and `previousPassportNumber` both correctly
absent (optional, and not gated for this reason value), `countryOfBirth:
"Paraguay"` correctly leaves `provinceOfBirth` absent (the `requiredWhen`
only fires for `"España"`). Passes with zero errors.

**Six negative controls** (each run against a copy of Scenario 1, expected to
fail exactly one rule): (a) removing `givenName` — correctly flagged as a
missing required field; (b) `sex: "Otro"` — correctly flagged as a
`validation.enum` violation; (c) `dni: "1234567X"` (7 digits, not 8) —
correctly flagged as a `validation.pattern` violation; (d)
`countryOfBirth: "España"` with `provinceOfBirth` removed — correctly
flagged as a missing `requiredWhen`-gated field; (e)
`reasonForApplication: "Robo"` with `policeReport` removed — correctly
flagged as a missing `requiredWhen`-gated document; (f)
`reasonForApplication: "Extravío"` with `previousPassportNumber` removed —
correctly flagged as a missing `requiredWhen`-gated field. All six negative
controls were correctly rejected; no defects were found in the schema
itself.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/es/maec/solicitud-pasaporte-ordinario/1.0.0/schema.json
ok   registry/es/maec/solicitud-pasaporte-ordinario/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/es/maec/solicitud-pasaporte-ordinario/1.0.0/schema.json
ok   registry/es/maec/solicitud-pasaporte-ordinario/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- **The domestic issuance channel** (Documento Nacional de Identidad
  electrónico / Policía Nacional network) — re-confirmed this cycle as still
  appointment-only with no downloadable specimen found, matching the prior
  GOV-1861 finding for that specific channel.
- **The Asunción mirror's page-2 parental travel-authorization annex** — see
  Judgment call 4.
- **Consulate-specific supporting-document requirements** not universal
  across consulates (e.g. Asunción's own requirement for a Paraguayan Cédula
  de Identidad copy from Paraguay-resident applicants) — see Judgment call 5.
- **The consular fee itself** — a payment, not a document or data field.

## Scope and jurisdiction notes

This document gives Spain 6 of its 6 verticals (Business Formation, DMV,
Taxes, National ID, Visa, Passport) — Passport was the last of the six to be
modelled, closing Spain to full coverage.
