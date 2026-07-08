# Verification record — `es/dgp/tarjeta-identidad-extranjero` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1735**: a follow-up to CATALOG.md's own flagged lead for
Spain's open National ID & Civic Documents gap. That note named the EX-15
foreigner-identity-number form as "a possible lead… not yet picked up." This
cycle screened EX-15 and found a stronger-fitting sibling instead: **EX-17,
Solicitud de Tarjeta de Identidad de Extranjero (TIE)**. EX-15 only assigns a
tax/administrative identifier (the NIE number itself); EX-17 is the
application for the physical foreign-resident identity card — a closer
structural match to already-published national-ID schemas such as
`ae/icp/emirates-id-replacement` and
`kr/mois/resident-registration-card-reissuance`, both of which are
physical-credential issuance/replacement applications rather than bare
number-assignment forms. EX-17 was picked over EX-15 on that basis and not
independently re-screened as a competing candidate this cycle, since the
issue brief had already done that comparison.

## Sources

1. **Primary — the form itself.** `EX-17`, "Solicitud de Tarjeta de
   Identidad de Extranjero (TIE)" (edición "03"), published by the
   Ministerio de Inclusión, Seguridad Social y Migraciones at
   `https://www.inclusion.gob.es/documents/410169/2156469/17-Formulario_TIE.pdf`.
   The live `inclusion.gob.es` domain is WAF-blocked to direct fetch from
   this environment (returns an HTML "Web Application Firewall" block page,
   not the PDF) — the same obstacle class this registry has repeatedly
   worked around for other government domains (see e.g.
   `ee/rik/private-limited-company-foundation`'s VERIFICATION.md for
   `riigiteataja.ee`, and `gov-au-wayback-workaround` for `gov.au`).
   Retrieved instead via a Wayback Machine snapshot,
   `http://web.archive.org/web/20260414195507if_/https://www.inclusion.gob.es/documents/410169/2156469/17-Formulario_TIE.pdf`,
   confirmed HTTP 200 with real `%PDF-1.7` magic bytes. The document's own
   `id`/`source.url` cite the live canonical URL (per this registry's
   sourcing convention), with the Wayback snapshot noted here as the actual
   retrieval method.

   The PDF's AcroForm/widget-annotation layer was inspected via `pdfjs-dist`
   (`page.getAnnotations()`, filtered to `subtype === "Widget"`) and found to
   be a **fillable form**: 70 named widgets (58 on page 1, 12 on page 2; 0 on
   page 3), including checkboxes named `TARJETA INICIAL`, `RENOVACION DE
   TARJETA`, and `DUPLICADO POR ROBO EXTRAVIO DESTRUCCION O INUTILIZ` (the
   exact three `documentRequestType` options), sex/civil-status checkbox
   groups (`H`/`M`/`ChkBox`, `C`/`V`/`D`/`Sp`/`ChkBox-0`), and named text
   fields for the filing-office block (`DIRIGIDA A`, `Codigo DIR3`,
   `PROVINCIA`) and applicant data (`Nombre y apellidos del titular`,
   `Email`, `Provincia`, `CP`, plus a run of generic `Textfield-N` names).
   This corrects an earlier draft of this record, which had misdescribed the
   PDF as a static print/hand-fill template with an empty AcroForm layer —
   flagged in a GOV-1738 review-gate finding and fixed here; the named
   widgets line up with the fields already modelled and did not change the
   schema's field/enum content. Its page-text layer (also extracted via
   `pdfjs-dist`) is fully self-documenting across all 3 pages: page 1 is the
   applicant/representative/notification data, page 2 is the addressee
   header, document-type checkbox, and signature line, and page 3 is a
   numbered instructions key (footnotes (1)-(7)) explaining every checkbox
   and marker referenced on pages 1-2.

2. **Corroborating — the Policía Nacional's own official procedure page.**
   `https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php`,
   titled "Tarjeta inicial o renovación residencia o residencia y trabajo."
   Fetched directly with no WAF/gate issue (a different subdomain than
   `inclusion.gob.es`). Confirms:
   - **Purpose:** "Documento destinado a identificar al extranjero a los
     efectos de acreditar su situación legal en España."
   - **Who:** residents in Spain authorized to reside there, once they have
     entered the country (or, for a renewal, once a favorable
     residence-authorization renewal has been notified).
   - **Filing channel — in-person only:** "La solicitud junto con la
     documentación que debe acompañarla deberá ser presentada en cualquier
     Oficina de Extranjería o Comisaría de Policía correspondientes" — this
     matches the form's own header notice (see judgment call 1 below).
   - **Required documentation:** the EX-17 form itself, plus "Justificante
     de pago Tasa modelo 790 Código 012" (fee-payment proof) — modelled as
     `documents.feePaymentProof`.
   - **Issuing/competent authority:** Dirección General de la Policía (DGP).
   - **Procedure code:** 994694.
   - **Governing regulation:** cites Real Decreto 1155/2024, de 19 de
     noviembre, alongside Ley Orgánica 4/2000, de 11 de enero — see judgment
     call 2 below for the discrepancy this creates against the form's own
     printed citation.

## Field inventory

52 `fields[]` entries plus 2 `documents[]` entries, grouped into 6 `steps[]`
matching the form's own section structure:

| Step | Fields | Source |
|---|---|---|
| Datos del extranjero/a | `identifierType`, `identifierNumber`, `firstSurname`, `secondSurname`, `givenName`, `sex`, `dateOfBirth`, `placeOfBirth`, `countryOfBirth`, `nationality`, `civilStatus`, `fatherName`, `motherName`, `residentialAddress`, `residentialAddressNumber`, `residentialAddressFloor`, `residentialLocality`, `residentialPostalCode`, `residentialProvince`, `applicantMobilePhone`, `applicantEmail`, `applicantLegalRepresentativeId`, `applicantLegalRepresentativeTitle` | EX-17 p.1, §1 |
| Datos del representante a efectos de presentación (si procede) | `submitterName`, `submitterId`, `submitterAddress`, `submitterAddressNumber`, `submitterAddressFloor`, `submitterLocality`, `submitterPostalCode`, `submitterProvince`, `submitterMobilePhone`, `submitterEmail`, `submitterLegalRepresentativeId`, `submitterLegalRepresentativeTitle` | EX-17 p.1, §2, footnote (5) |
| Domicilio a efectos de notificaciones | `notificationRecipientName`, `notificationRecipientId`, `notificationAddress`, `notificationAddressNumber`, `notificationAddressFloor`, `notificationLocality`, `notificationPostalCode`, `notificationProvince`, `notificationMobilePhone`, `notificationEmail`, `electronicNotificationConsent` | EX-17 p.1, §3, footnote (6) |
| Oficina a la que se dirige la solicitud | `filingOfficeName`, `filingOfficeDir3Code`, `filingOfficeProvince` | EX-17 p.2, header row |
| Datos relativos a la solicitud | `documentRequestType` | EX-17 p.2, §4.1, art. 210 |
| Lugar, fecha y firma | `applicationPlace`, `applicationDate` | EX-17 p.2, closing line |

Plus `documents[]`: `feePaymentProof` (Tasa 790 Código 012, sourced from the
Policía Nacional procedure page) and `signatureAttestation` (the form's own
closing signature line).

## Judgment calls and access notes

1. **In-person filing only; no online/telematic channel modelled.** The
   form's own header prints, in capitals: "ATENCIÓN: LA PRESENTACIÓN DE ESTE
   FORMULARIO SOLAMENTE PUEDE REALIZARSE DE FORMA PERSONAL ANTE LA UNIDAD
   COMPETENTE DE POLICÍA NACIONAL. NO ESTA ADMITIDA SU PRESENTACIÓN POR
   MEDIOS TELEMÁTICOS O REGISTROS PÚBLICOS." The Policía Nacional's own
   procedure page independently confirms the same constraint ("La solicitud…
   deberá ser presentada en cualquier Oficina de Extranjería o Comisaría de
   Policía"). This document models the paper/in-person submission only —
   there is no separate telematic channel to scope out, unlike some other
   schemas in this registry that had to explicitly exclude a parallel
   authenticated portal.

2. **Disclosed citation mismatch: RD 1155/2024 vs. the form's own printed RD
   557/2011.** The form's own header cites its legal basis as "(LO 4/2000 y
   RD 557/2011)". The Policía Nacional's live procedure page, however, cites
   the current governing rules as "LEY ORGÁNICA 4/2000, de 11 de enero" and
   "Real Decreto 1155/2024, de 19 de noviembre" — RD 1155/2024 replaced RD
   557/2011's implementing regulation. This means the published PDF has not
   been reprinted/updated since the 2024 regulatory renumbering. This
   document's title/description cite the form's own printed legal basis
   verbatim (since that is what is physically printed on the source PDF
   being modelled), but this VERIFICATION.md and the `verification.notes`
   field both flag RD 1155/2024 as the current governing implementing
   regulation per the live procedure page. Nothing found this cycle suggests
   the field set or process has substantively changed as a result of the
   renumbering — the mismatch is a citation/printing lag, not a scope
   change — but a future review cycle should re-check whether a newer form
   edition citing RD 1155/2024 has since been published.

3. **`sex` enum's "X" (unspecified) value carries a narrower meaning than a
   general third-option/nonbinary marker.** Footnote (1) states: "X-
   Indefinido: Esta casilla solo podrá marcarse por aquellas personas que lo
   tengan reconocido en su país de origen" (this box may only be checked by
   people who have this [marker] officially recognized in their own country
   of origin). It is not a free "prefer not to say" option — modelled as
   `unspecified` with this qualification spelled out in the field's own
   `description`, since GovSchema fields cannot themselves encode an
   eligibility precondition like this beyond a text note (no dependent
   country-of-origin field exists on the form to gate it structurally).

4. **Representative/notification blocks are optional with asymmetric
   sourcing for their conditional applicability.** Section 2 (submitter)
   carries an explicit footnote (5): "Rellenar sólo en el caso de ser
   persona distinta del solicitante" (fill in only if [the submitter is] a
   person distinct from the applicant) — so every `submitter*` field is
   modelled as optional with that footnote cited directly. Section 3
   (notification address) carries **no equivalent explicit "only if
   different" footnote** in the transcribed source; this schema still
   models every `notification*` field as optional, by analogy with Section
   2's own shape and because nothing on the form marks any of these fields
   mandatory — but this is this schema's own inference, not a directly
   cited instruction, and is called out here rather than silently assumed.
   Similarly, `applicantLegalRepresentativeId`/`Title` and
   `submitterLegalRepresentativeId`/`Title` are both optional: each is
   captioned "en su caso" ("if applicable") directly on the form itself,
   applicable when the applicant is a minor/incapacitated person (Section
   1) or when the submitter itself needs its own legal representative
   (Section 2, e.g. a legal entity).

5. **`filingOfficeDir3Code` left optional, applicant-fill status
   unconfirmed.** The page-2 header row prints "DIRIGIDA A ……. Código
   DIR3……. PROVINCIA …….". `filingOfficeName` and `filingOfficeProvince` are
   modelled as required (the request must be addressed somewhere), but
   whether the DIR3 code (Spain's common public-sector administrative-unit
   directory code) is something the applicant looks up and writes in, or
   something DGP staff fill in upon receipt, is not stated anywhere in the
   transcribed source — modelled as optional rather than guessing a
   requiredness the source does not state.

6. **Page 2's "Nombre y apellidos del titular" running-header caption is not
   modelled as a separate field.** It is a repeat of the applicant's own
   name, already captured by `firstSurname`/`secondSurname`/`givenName` in
   Section 1 — the same page-2-running-header pattern this registry has
   treated as non-substantive elsewhere (e.g. a repeated caption, not a
   distinct data point).

7. **No fee amount field is modelled.** The Policía Nacional's own procedure
   page names "Justificante de pago Tasa modelo 790 Código 012" as a
   required accompanying document — modelled as `documents.feePaymentProof`
   (category `payment`) — but does not itself state the fee amount. A
   publicly reported figure (approximately EUR 16.08 for the initial TIE as
   of 2026) was found via non-government secondary sources during this
   cycle's research but is **deliberately not modelled** as an authoritative
   field value: fee schedules change, and this figure was not confirmed
   from a primary government source this cycle. Only the document
   requirement itself is modelled, per this registry's standing discipline
   against inventing/asserting unconfirmed authoritative values (the same
   reasoning `es/aeat/declaracion-censal-alta-actividad-economica-modelo-036`'s
   VERIFICATION.md applied to its own fee figures).

8. **`applicationPlace`/`applicationDate` split from one printed line.** The
   closing signature line prints "……., a ….. de ……. de ……." (place, then a
   day/month-name/year date) as one continuous fill-in-the-blank sentence.
   Modelled as two separate fields (`applicationPlace` string,
   `applicationDate` ISO 8601 date), consistent with this registry's
   general practice of modelling a compound place+date line as its two
   logical values rather than one free-text field.

9. **No signature text field.** The closing "FIRMA DEL SOLICITANTE (o
   representante legal, en su caso)" line has no separate fillable field
   distinguishable from the physical signature itself — modelled as
   `documents.signatureAttestation` (category `attestation`), the same
   treatment `ee/transpordiamet/vehicle-transfer-notification` and
   `ee/ppa/passport-application` gave their own forms' signature lines.

## Test run

No live submission was attempted: physically filing a TIE application
in-person with a real Oficina de Extranjería/Comisaría de Policía is not a
safe or reversible action to simulate against a live government process —
consistent with this registry's standing discipline for in-person-only
government processes.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory — a fictional Romanian national's initial-TIE
application, filed by the applicant themself (no distinct submitter, no
distinct notification address) with a fake passport-style identifier — and
committed as this document's conformance fixture
(`conformance/es/dgp/tarjeta-identidad-extranjero/1.0.0/initial-tie-application.json`).
It was checked with a small ad hoc Node script (not committed) that compiles
`schema.json`'s own `required`/`requiredWhen`/`validation` rules (the shared
`Condition` grammar's `equals`/`notEquals`/`in`/comparison leaves) and every
`documents[].required`/`requiredWhen` rule, and evaluates them directly
against the fixture:

```
$ node check.mjs registry/es/dgp/tarjeta-identidad-extranjero/1.0.0/schema.json conformance/es/dgp/tarjeta-identidad-extranjero/1.0.0/initial-tie-application.json
All required/requiredWhen/enum/pattern checks passed against conformance/es/dgp/tarjeta-identidad-extranjero/1.0.0/initial-tie-application.json
```

**Negative controls** (each run against a variant payload, not committed as
separate fixture files), confirming the script actually catches violations
rather than passing vacuously:

- (a) `documentRequestType: "lost_card"` — caught: not in
  `["initial_card","renewal","duplicate_theft_loss_destruction_unusable"]`.
- (b) `firstSurname` removed entirely — caught: `FIELD firstSurname:
  required but missing`.
- (c) `applicationDate: "08/07/2026"` (wrong date format) — caught: fails
  the `YYYY-MM-DD` date check.
- (d) `documents.feePaymentProof: false` — caught: `DOCUMENT
  feePaymentProof: required but missing`.
- (e) `applicantEmail: "not-an-email"` — caught: fails the e-mail `pattern`.
- (f) `sex: "other"` — caught: not in `["male","female","unspecified"]`.

All six negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs
ok   registry/es/dgp/tarjeta-identidad-extranjero/1.0.0/schema.json
275/275 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
ok   registry/es/dgp/tarjeta-identidad-extranjero/1.0.0/schema.json [v0.3]
275/275 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```
