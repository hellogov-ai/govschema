# Verification record — `pt/imt/requerimento-carta-de-conducao` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1750**: "GovSchema Standard Research" — opening **Portugal as
GovSchema's 24th jurisdiction**. The registry's existing 23 jurisdictions are
heavily saturated (DMV, Business Formation, and Taxes are already at 100%
global coverage; Passport ~87%, Visa ~70%), and CATALOG.md's own "Known Gaps"
section explicitly named Portugal as an unscreened candidate worth scouting
for a new jurisdiction slot. This cycle screened all six of Portugal's
verticals and picked IMT's driving-licence Requerimento (Mod. 1-IMT).

## Candidate screening (Phase 1-2)

All six verticals were screened (a dedicated research pass, then independently
re-verified directly by re-fetching and re-extracting the winning candidate
before authoring against it).

### 1. DMV — picked: IMT's Mod. 1-IMT "Requerimento"

`https://www.imt-ip.pt/wp-content/uploads/IMTT/Portugues/Formularios/Documents/Mod1_IMT.pdf`
— confirmed directly this cycle: a plain `curl` GET returns HTTP 200 and
9,277,317 bytes of real `%PDF-1.6` data. `pdfjs-dist`'s AcroForm annotation
layer lists 96 named field entries (108 widget annotations total, since the
12-option "requerimento" radio group and the two-widget "catC1E" checkbox
field each carry multiple widgets under one field name) — a genuine, unauthenticated,
currently-served fillable AcroForm, the strongest source-shape tier this
registry looks for. A companion, self-documenting instructions PDF
(`Mod1_IMT_Instrucoes.pdf`, also HTTP 200, plain text layer, no AcroForm)
explains every numbered section in plain Portuguese prose, including a
verbatim identity-document-type legend (18 lettered document types) and a
citation to Decreto-Lei n.º 138/2012 for the restriction-code table. This is
the only Portuguese candidate examined this cycle that hits the registry's
top preference tier (genuine downloadable AcroForm PDF) cleanly. A second IMT
form for vehicle-registration transactions (Mod9_IMT, "Pretensão Relativa a
Veículos") also exists but was confirmed to carry no AcroForm layer at all (a
static hand-fill template) — weaker than Mod. 1-IMT, and not pursued once
Mod. 1-IMT was confirmed strong.

### 2. Business Formation — screened, weaker

Código das Sociedades Comerciais Art. 9.º (statute) and IRN's "Empresa na
Hora" program were examined. No downloadable AcroForm exists: the "Empresa na
Hora" pacto-social specimen PDFs are scanned images (no extractable text
layer), and the sole-trader "Início de Atividade" route is now a fully
login-gated `acesso.gov.pt` wizard with no PDF fallback found. The statute
itself enumerates a real but comparatively thin field list (~14-16 items).
Weaker than Mod. 1-IMT; left as an open backlog candidate for a future
Portugal-focused cycle.

### 3. Taxes — screened, strong but weaker on source-shape

`https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/modelos_formularios/irs/Documents/Mod_3_rosto.pdf`
(Modelo 3, the annual IRS return cover page) is a genuine, current,
unauthenticated PDF with a rich field surface (100+ items across 14 numbered
Quadros) and article-numbered instructions, the same source shape this
registry has used for `es/aeat` and `pl/mf/zeznanie-pit-37` — but it carries
no AcroForm layer (Portugal's IRS is an e-filing-only regime; this form is a
print/reference facsimile). Genuinely viable for a future cycle, but a rung
below Mod. 1-IMT's true fillable AcroForm on this registry's own source-shape
hierarchy.

### 4. Passport — screened, weak

Decreto-Lei n.º 83/2000 confirms the ordinary Portuguese passport is an
in-person, biometric-only process (Art. 16); IRN's own forms library has no
"Passaporte" category at all, and no citizen-facing paper application form
was found domestically. A promising lead (a consulate-hosted "Requerimento de
Passaporte" PDF) could not be retrieved this cycle (network failure, not a
content gate) — worth a retry in a future cycle, but not pursued further once
Mod. 1-IMT was confirmed strong.

### 5. Visa — screened, confirmed duplicate

`vistos.mne.gov.pt`'s national (long-stay) visa application form was compared
against the already-published `de/auswaertiges-amt/national-visa-application`
and confirmed to share the same harmonized EU long-stay-visa field
numbering/sequence — a duplicate, not an open gap, consistent with this
registry's established finding for Poland's and Spain's equivalent national
visa forms. A non-duplicate alternative exists — AIMA's Modelo 1 (residence
permit request/renewal, ~30 fields, HTTP 200 confirmed) — genuinely
Portugal-specific, but a flat (non-AcroForm) PDF; left open as a real backlog
candidate for a future cycle since Mod. 1-IMT was already confirmed stronger.

### 6. National ID — screened, weak-medium

Lei n.º 7/2007 (Cartão de Cidadão) enumerates the data a citizen card carries
by article, and a consulate-hosted application PDF (`req_cc.pdf`) was located
with 42 distinct field labels — but it is consular-only (the domestic,
in-Portugal Cartão de Cidadão process has no downloadable form; it is issued
via an in-person, biometric appointment) and required a proxy workaround to
retrieve directly. Weaker than Mod. 1-IMT; left as an open backlog candidate.

## Field inventory (Phase 3)

34 `fields[]` entries and 3 `documents[]` entries, every one carrying a
`sourceRef` citing either the AcroForm's own field name (independently
re-extracted via `pdfjs-dist`, both the annotation layer and a 3x-zoom
`canvas` render used to visually confirm every checkbox-to-label mapping) or
the companion Instruções PDF's own section text. Summary by step:

| Step | Fields | Source |
|---|---|---|
| Title requested | `documentRequested` | AcroForm field `requerimento` (12-option radio group; scoped to values 0-2) |
| 1 - Pretensão | `requestIssuance`, `requestDuplicate`, `requestAddressChange`, `requestRenewal`, `requestExchange`, `requestReplacement`, `requestReplacementDetail`, `requestOther`, `requestOtherDetail` | AcroForm fields `emissao`, `Via2`, `altmorada`, `revalidacao`, `troca`, `substituicao`, `txtOutra[1]`, `outra`, `txtOutra[0]` |
| 2/3 - Categorias e Restrições | `licenceCategory`, `medicalRestrictionCodes` | 19 checkboxes, printed labels AM/A1/A2/A/B1/B/BE/C1/C/C1E/CE/D1/D/DE/D1E/Ciclomotores/Tratores Agrícolas I-II-III, cross-matched to their internal AcroForm field names by widget-rect coordinate (see judgment call 4 — the internal names do not reliably match their printed position); `restricao1`..`restricao5`; Decreto-Lei n.º 138/2012, Anexo I, secção B |
| 4 - Documento Atual | `currentlyHoldsLearnerPermit`, `currentlyHoldsProvisionalLicence`, `currentlyHoldsDrivingLicenceCard`, `currentDocumentNumber`, `currentDocumentIssuer` | AcroForm fields `licenca1`/`licenca2`/`licenca3`, `nTitCond` (+ duplicate `ccL1`/`ccL2`/`ccN1`..`ccN14`), `emissorTitCond` |
| 5 - Identificação | `taxIdentificationNumber`, `identityDocumentType`, `identityDocumentNumber`, `identityDocumentValidity`, `identityDocumentIssuer`, `surname`, `givenNames`, `dateOfBirth`, `placeOfBirth`, `nationality` | AcroForm fields `nContribuinte` (+ duplicate `contribuintefinal`), `tipo` (+ duplicate `tipoDoc`), `numero` (+ duplicate `docId1`..`docId15`/`DocumentDC`), `validade`, `emissorDI`, `apelido`, `nome1`/`nome2`, `dataNascimento`, `naturalidade`, `nacionalidade` |
| Endereço e contacto | `currentAddressStreet`, `currentAddressLocality`, `postalCode`, `postalCodeLocality`, `email`, `mobilePhone` | AcroForm fields `moradaActual`, `localidadeActual`, `codPostal4`/`codPostal3`, `localidadeCP`, `email`, `telemovel` |
| Data do pedido | `dateOfRequest` | AcroForm field `dataPedido` |

`documents[]`: `photograph` (the form's own "Fotografia (colada)" box),
`statePaymentFee` (EUR 30, confirmed via IMT's own "Substituição da carta de
condução" service page), `signedDeclaration` (the form's own printed oath
text, verbatim).

## Access notes and judgment calls

1. **Scoped to the ordinary citizen's driving-title track (3 of the form's 12
   "requerimento" options), excluding the other 9.** The same Mod. 1-IMT form
   also covers taxi-driver aptitude certification (CAP Táxi), the driver
   qualification certificate (CQM), CITV vehicle-inspection-centre inspector,
   driving examiner, driving instructor, and driving-school director/deputy-
   director tracks — all professional/institutional qualifications distinct
   from an ordinary citizen requesting or maintaining a Licença de
   Aprendizagem, Licença de Condução, or Carta de Condução. `documentRequested`
   is scoped to the latter three only.
2. **A first-time learner's-permit application is out of scope.** IMT's own
   "Primeira Carta de Condução" service page states the first-issuance
   request is made by the driving school on the applicant's behalf (the
   applicant's own role is limited to confirming biometric data online) — not
   a citizen-initiated Mod. 1-IMT submission. This document instead models
   the transactions an individual files directly: renewal, duplicate,
   replacement, exchange, address change, and (per the instructions' own
   worked example) requesting a new category added to an already-held title.
3. **`licenceCategory` is modelled as a single-select enum, though the form's
   own checkboxes are not exclusive.** The instructions state "as categorias
   pretendidas devem ser assinaladas" (all intended categories must be
   marked) — in principle more than one checkbox may be ticked in a single
   submission (e.g. requesting both a car and a motorcycle category
   together). The v0.3 meta-schema has no multi-select/array field type, and
   19 independent boolean fields (one per category) was judged to produce an
   awkward, low-signal field set for what is overwhelmingly a single-category
   request in practice. Modelled as a single enum; a genuinely multi-category
   submission is a disclosed scope limitation of this v1.0.0.
4. **The "2 - CATEGORIAS" checkboxes' internal AcroForm field names do NOT
   reliably match their printed grid position — confirmed by independently
   re-extracting the widget rects and cross-checking against a rendered
   bitmap of the page (`pdfjs-dist` + `canvas`, 3x zoom), not by trusting the
   field names alone.** A coordinate-by-coordinate pairing of each checkbox's
   rect against the nearest printed label reveals the internal field named
   `catA` sits at the printed "AM" checkbox, `catA1` at "B1", `catMoto` at
   "C1E", `catB` at "A1", `catB1` at "B", `catBE` at "C", a generically-named
   `Check Box2` at "D1E", `catC` at "A2", `catC1` at "BE", `catC1E` (one of
   two widgets carrying that field name) at "D", `catD` at "A", `catD1` at
   "C1", `catDE` at "D1", and `catD1E` at "DE" — only `catCE`↔"CE",
   `catCiclo`↔"Ciclomotores", and the three `catVeicAgrI`/`II`/`III`↔"Tratores
   Agrícolas I"/"II"/"III" fields are name-consistent with their printed
   label. (A second, stray widget also named `catC1E` appears far from the
   category grid, inside the personal-identification section around
   'Nacionalidade' — an apparent form-authoring artifact, not modelled as
   anything.) Since `licenceCategory`'s `validation.enum` values are the
   category codes themselves (matching the printed grid, e.g. "AM", "B1"),
   not the PDF's internal field-name strings, this finding does not change
   the schema's field values — but it would have produced a silently wrong
   mapping had this document cited internal field names as its category
   `sourceRef`s without the coordinate/render cross-check, the same class of
   catch this registry has made before for generically-named widget sets
   (e.g. `ee/transpordiamet/vehicle-transfer-notification`'s `Text Box N`
   fields, `cl/sii/aviso-venta-vehiculo`'s `Texto1`..`Texto54`) — except here
   the names are not generic placeholders but genuine, plausible-looking
   category codes that happen to be wrong for their position, a more
   dangerous variant of the same failure mode.
5. **Three genuinely redundant on-form representations were each collapsed
   into one logical field, not modelled as separate fields.** The form
   repeats the identity-document number, the current driving-title number,
   and the tax number a second time as individual-character box grids
   (visually resembling an optical-reading/OCR strip) at the bottom of the
   page. `pdfjs-dist`'s own AcroForm field list confirms these are genuinely
   separate, additional field objects (`docId1`..`docId15`/`DocumentDC`,
   `ccL1`/`ccL2`/`ccN1`..`ccN14`) carrying the same values as `numero` and
   `nTitCond` respectively — except the third, `contribuintefinal` (the
   bottom "NÚMERO DE CONTRIBUINTE" grid), which turned out on inspection to
   be a single wide text field despite its printed box-grid styling, not
   genuinely per-character AcroForm fields. All three are cited as
   duplicate `sourceRef`s on their one logical field (`identityDocumentNumber`,
   `currentDocumentNumber`, `taxIdentificationNumber`) rather than modelled
   twice.
6. **`taxIdentificationNumber` carries no digit-count `pattern`.** A
   Portuguese NIF is publicly known to be a 9-digit number, but — unlike the
   identity-document and driving-licence numbers, which the form itself
   splits into individually-counted AcroForm character boxes confirming their
   length — the form's own "Nº Contribuinte" fields (`nContribuinte`,
   `contribuintefinal`) are each a single, unconstrained text widget. Rather
   than assert a digit-count the source itself does not structurally enforce,
   this field is left as a plain string, the same reasoning
   `ee/ppa/passport-application` applied to `personalIdentificationCodeOrDateOfBirth`.
7. **`medicalRestrictionCodes` is not required, even conditionally.** The
   instructions state restrictions from the applicant's medical certificate
   must be indicated "se pretender a emissão de um título de condução" and
   only when such restrictions in fact exist on that certificate — a
   real-world fact this schema has no other field to gate on. Rather than
   fabricate a `requiredWhen` rule (e.g. tied to `requestIssuance`) the source
   does not itself state as a checkable condition — the same class of bug
   this registry has previously caught and corrected (see
   `notequals-empty-string-absent-field-bug` in project memory) — it is left
   optional, disclosed here instead.
8. **`currentDocumentIssuer` and the `currentlyHolds*`/`currentDocumentNumber`
   fields are not universally required.** The instructions state the current
   document must be indicated "quando necessário à pretensão" (when necessary
   to the request) — genuinely conditional on agency discretion rather than a
   fixed rule. This document only enforces the one clean, source-stated
   dependency it could confirm: `currentDocumentNumber` is `requiredWhen` any
   of the three `currentlyHolds*` booleans is `true` (if you say which title
   you hold, you must give its number). It does not attempt to derive when
   the `currentlyHolds*` booleans themselves become required, since the
   source states this is contextual, not a fixed rule.
9. **`statePaymentFee.amount` states only the confirmed Substituição fee (EUR
   30).** IMT's own "Substituição da carta de condução" service page
   confirms EUR 30 at a physical counter (EUR 27 with the platform's own 10%
   online-submission discount, not applicable to this paper-form scope). A
   secondary (non-`imt-ip.pt`) source reports a different fee (~EUR 35) for
   the 2ª via/duplicado pretensão specifically, which this cycle did not
   independently confirm against a primary IMT page — disclosed here rather
   than asserted as this document's single `amount`, the same handling
   `ee/ppa/passport-application` applied to its own multi-tier fee schedule.
10. **`givenNames` combines two AcroForm fields (`nome1`/`nome2`) into one
   logical value.** The form splits the applicant's given name(s) across two
   visual box-rows with no distinct second label, to accommodate longer
   Portuguese given-name sequences — modelled as one field, consistent with
   `ee/ppa/passport-application`'s handling of a similarly split field.
11. **No live submission was attempted.** Submitting this form in person or
    by post triggers a real state fee and a real change to the applicant's
    legal driving-title record — not a safe or reversible action to simulate
    against a live government process, consistent with this registry's
    standing discipline for every prior cycle's schema.

## Test run (Phase 4)

Two fully hand-constructed mock records were built from this document's own
field inventory (not committed to the registry; this registry's convention
keeps `registry/` to `schema.json` + `VERIFICATION.md` only):

1. A fictional applicant (Ana Maria Ferreira Santos) requesting simultaneous
   **address change and replacement** of an existing Carta de Condução
   (category B, one restriction code), exercising the `requestReplacement` →
   `requestReplacementDetail` `requiredWhen` branch, the
   `currentlyHoldsDrivingLicenceCard` → `currentDocumentNumber`
   `requiredWhen` branch, and the `currentDocumentTypeGroup`
   `exclusivityGroups` rule (only one `currentlyHolds*` boolean `true`).
2. A fictional applicant (João Carlos Pereira) requesting **issuance** of a
   new Licença de Aprendizagem for the agricultural-tractor category (Group
   II), with no title currently held, filed under the "Outra" pretensão
   (exercising the `requestOther` → `requestOtherDetail` `requiredWhen`
   branch and the `tratores_agricolas_ii` `licenceCategory` enum value), and
   confirming `currentDocumentNumber` is correctly **not** required when
   every `currentlyHolds*` boolean is `false`.

Both were checked with a small ad hoc Node script (not committed) that
compiles `schema.json`'s own `required`/`requiredWhen`/`validation` rules
(the shared `Condition` grammar's `equals`/`any` leaves) and
`exclusivityGroups`/`documents[].required`/`requiredWhen` rules, and evaluates
them directly against each fixture:

```
$ node check.mjs registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json mock1.json
All required/requiredWhen/enum/pattern checks passed against mock1.json
$ node check.mjs registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json mock2.json
All required/requiredWhen/enum/pattern checks passed against mock2.json
```

**Negative controls** (each run against a variant of one of the two
fixtures, not committed as separate files), confirming the script actually
catches violations rather than passing vacuously:

- (a) `requestReplacementDetail` removed while `requestReplacement: true` —
  caught: `FIELD requestReplacementDetail: required but missing`.
- (b) `postalCode: "4050262"` (no hyphen) — caught: fails the
  `^\d{4}-\d{3}$` pattern.
- (c) `identityDocumentType: "Z"` — caught: not in the 18-letter enum.
- (d) `email: "not-an-email"` — caught: fails the e-mail pattern.
- (e) `surname` removed entirely — caught: `FIELD surname: required but
  missing`.
- (f) `documents.statePaymentFee` removed — caught: `DOCUMENT
  statePaymentFee: required but missing`.
- (g) `currentDocumentNumber` removed while
  `currentlyHoldsDrivingLicenceCard: true` — caught: `FIELD
  currentDocumentNumber: required but missing`.
- (h) `currentlyHoldsProvisionalLicence: true` added on top of an existing
  `currentlyHoldsDrivingLicenceCard: true` — caught: `EXCLUSIVITY
  currentDocumentTypeGroup: more than one ... is true`.
- (i) `requestAddressChange: "yes"` (a string, not a boolean) — caught:
  `FIELD requestAddressChange: expected boolean, got string`.
- (j) `requestOtherDetail` removed while `requestOther: true` — caught:
  `FIELD requestOtherDetail: required but missing`.
- (k) `licenceCategory: "X1"` — caught: not in the 19-value enum.

All eleven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json
ok   registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json
ok   registry/pt/imt/requerimento-carta-de-conducao/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
