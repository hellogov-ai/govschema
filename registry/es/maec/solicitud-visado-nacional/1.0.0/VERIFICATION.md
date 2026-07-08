# Verification record — `es/maec/solicitud-visado-nacional` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is a `GovSchema Standard Research` cycle (**GOV-1861**), closing Spain's
own explicitly-flagged Visa gap — CATALOG.md's "Known Gaps" section had
listed Spain's Visa vertical as "an open, unscreened backlog candidate for a
future cycle." Spain currently has 4 of 6 verticals (DMV, Business
Formation, Taxes, National ID via `es/dgp/tarjeta-identidad-extranjero`);
Passport is a confirmed dead end (Policía Nacional's DNI/passport channel is
appointment-only, no downloadable form). This document opens Spain's
**Visa** vertical, giving Spain 5 of its 6 verticals.

## Why this candidate needed a fresh look, not a re-screen

A prior cycle (GOV-1652, the DGT DMV schema's own VERIFICATION.md) had
already examined Spain's national visa form once and set it aside with the
following note: "on close comparison, however, this is the same
EU-harmonized national-visa template already modelled in this registry via
`de/auswaertiges-amt/national-visa-application` ... both forms share the
identical numbered-field structure ... consistent with the EU Regulation
Annex that standardizes this form across Schengen states' national-visa
channels." That characterization was then repeated as an established fact in
three later documents' own VERIFICATION.md files (`pl/mf/zeznanie-pit-37`'s
note on Poland's own visa screening, `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s
"established convention" list, and CATALOG.md's own historical Executive
Summary entries), each citing it rather than independently re-checking it.

Because the task brief for this cycle explicitly named this exact
duplicate-detection convention and asked for the comparison to be shown
"even if the answer here is not a duplicate," this cycle re-did the
comparison from scratch rather than trusting the prior note: both the DE
schema's own committed field list (`registry/de/auswaertiges-amt/national-visa-application/1.0.0/schema.json`,
81 fields) and the DE source PDF itself (re-fetched this cycle directly from
`auswaertiges-amt.de`, re-extracted field-by-field via `pdfjs-dist`) were
read in full, then compared side by side against Spain's own form (also
independently re-fetched and re-extracted this cycle — see Sources examined
below).

**Finding: the prior "field-for-field duplicate" characterization does not
hold up.** The two forms' identity blocks (Spain's items 1-9: surname,
surname at birth, first names, date/place/country of birth, nationality,
sex, marital status) do follow the same Schengen-harmonized numbering
convention already documented elsewhere in this registry as shared boilerplate
across EU visa forms (see `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s own
VERIFICATION.md, which independently reached the same "shared opening block,
diverges sharply afterward" conclusion for the Czech form against this same
German template). But past that opening block the two forms have almost no
structural overlap:

- **Germany's own form** (re-extracted this cycle, `de_visa.pdf`, 5 pages,
  81 modelled fields) has: a full spouse-details section (surname, former
  surname, first names, DOB, place/country of birth, nationality, place of
  residence); a children table; an unconditional parents section (father
  and mother, each with name/DOB/place-of-birth/nationality/residence); a
  "have you been to Germany before, list your last five stays" block; an
  accommodation-type question (single room/apartment with N rooms/
  collective accommodation); a "do you intend to keep a permanent residence
  outside Germany" question; a "will family members accompany you"
  question; references in Germany; means of subsistence; health-insurance
  coverage; and, uniquely to Germany, a criminal-conviction disclosure
  (in Germany / abroad, each with when/where, reason, and penalty) and a
  notifiable-disease disclosure. None of this has any counterpart on
  Spain's form.
- **Spain's own form** (re-extracted this cycle, `spain_visa_es.pdf`, 4
  pages, 110 AcroForm widgets) has, past its own item 9: a minors'
  guardian block (item 10); national-identity-number and travel-document
  fields (items 11-16, present in similar form on both — an ordinary
  overlap, not evidence of republication); contact/residence/occupation
  (items 17-19, likewise ordinary overlap with nearly every visa form in
  this registry); Spain's own 12-option residence-purpose taxonomy (item
  20 — residence without a work permit, family reunification, employment,
  self-employment, seasonal employment, investor/entrepreneur, study,
  internship, research, residence recovery, accreditation, other); intended
  arrival date, number of entries, and address in Spain (items 21-23); a
  prior-immigration-ruling NIE/notification-date pair (items 24-25); and
  three fully structured, purpose-conditional blocks with no German
  counterpart at all — a family-reunification sponsor ("reagrupante") block
  with 9 fields including the sponsor's own NIE/DNI (item 26); an
  employer/company block with 6 fields including the company's own CIF tax
  ID (item 27); and an educational-establishment block with 6 fields (item
  28) plus a distinct "temporary displacement of minors for educational
  purposes under third-party sponsorship" block (item 29).

Net: Spain's form shares only its opening ~9-item Schengen-harmonized
identity block with Germany's, the same kind of shared boilerplate this
registry already treats as expected convergence rather than duplication
(see the CZ precedent above). Past that block the two forms diverge
completely in both directions — Germany has extensive content (spouse,
children, parents, prior-Germany-stays, accommodation, health, criminal
history) absent from Spain's form, and Spain has extensive content (its own
12-category residence-purpose taxonomy, the sponsor/employer/school blocks)
absent from Germany's form. This is a genuine, distinct national form, not a
republication — the prior screening note is corrected by this document.

**Spain's own Schengen (Type C) short-stay visa form, by contrast, is
confirmed as a genuine duplicate — not modelled.** Fetched this cycle
(`schengen_es.pdf`, from a Spanish consulate's own site) and compared
against `fr/france-visas/schengen-visa-application`: the two match
field-for-field, including the destination-Member-State fields, the
fingerprints-previously-collected question, the inviting-person-or-hotel
block, and the "cost of travel funded by applicant/sponsor" section with
matching means-of-subsistence checkbox sets — all present verbatim in the
same order, consistent with the EU Regulation 810/2009 Annex I harmonized
template that genuinely is binding across all Schengen states for the
short-stay visa (unlike the national long-stay visa, which each member
state designs independently). This confirms the same pattern already
established for Poland's, Portugal's, Czechia's, and Switzerland's own
Schengen short-stay forms. Not authored.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Ministerio de Asuntos Exteriores, Unión Europea y
  Cooperación (MAEC)
- **Document:** "Solicitud de visado nacional" / "Application for a
  national visa"
- **URL (as cited in `source.url`):**
  <https://www.exteriores.gob.es/DocumentosAuxiliaresSC/M%C3%A9xico/M%C3%89XICO%20(C)/VIS/SolicitudVisadoNacional_ES.pdf>
  (the same document is mirrored, byte-for-byte identical, at dozens of
  Spanish consulates' own subdomains — e.g. `exteriores.gob.es/Consulados/nuevayork/...`,
  `exteriores.gob.es/Consulados/nador/...`, and the unified public-administration
  portal `one.gob.es/sites/default/files/2025-12/Solicitud%20de%20visado%20nacional.pdf`,
  the latter dated 2025-12, corroborating this is the current, still-live
  edition).
- **Access note:** fetched directly this cycle, HTTP 200, no login/CAPTCHA/WAF
  gate. A HEAD request to the same URL returns 403 (a WAF quirk affecting
  only HEAD requests — re-confirmed by immediately re-issuing a plain GET,
  which again returned HTTP 200 with an identical SHA-256 to the first
  fetch: `42549bddfe9ccc5512538b2fa6787b119ad41cff33f4e66717fc462dfb469a3a`,
  122,651 bytes).
- **Extraction method:** `pdfjs-dist@3.11.174`, `legacy/build/pdf.js`.
  `getAnnotations()` was used for the AcroForm widget layer — this edition
  of the form is a genuine fillable AcroForm PDF (110 widgets across 4
  pages: 52 on page 1, 40 on page 2, 16 on page 3, 2 on page 4), with mostly
  descriptive Spanish field names (e.g. `"24 Número de Identificación de
  Extranjero NIE4"`, `"Apellidos y nombre del reagrupante"`), not generic
  `dato.X`-style names. `getTextContent()` was combined with each widget's
  own rect (bounding box) into a y-descending, x-ascending ordered list per
  page, so every widget could be attributed to its printed label and
  numbered item by direct coordinate adjacency — the same method this
  registry used for `es/dgt/solicitud-tramites-vehiculo`.
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** every field's exact printed Spanish label and its
  native AcroForm type (text/checkbox/radio); the 12-option purpose-of-journey
  checkbox grid (item 20); the "reagrupante"/employer/school blocks (items
  26-28); and that the "PARTE RESERVADA A LA ADMINISTRACIÓN" (reserved for
  administration) column running down the right margin of pages 1-2 — the
  application-number/case-handler/decision/validity/entries-granted fields
  the consulate itself fills in — is a distinct set of widgets from the
  applicant-facing fields, excluded from `fields[]` accordingly (see
  Judgment call 1 below).

### Source 2 (corroborating, "still current" check)

- `one.gob.es/sites/default/files/2025-12/Solicitud%20de%20visado%20nacional.pdf`
  (fetched this cycle, HTTP 200, 131,163 bytes) — a flat (non-AcroForm)
  copy of the same 30-item form hosted on Spain's unified public-administration
  portal, dated December 2025 per its own URL path. Its own text content was
  extracted and cross-checked word-for-word against Source 1's own text for
  every numbered item; both match. This corroborates Source 1 as the
  current, still-live edition rather than a stale mirror.

### Source 3 (Schengen short-stay comparison, confirming a duplicate — not modelled)

- `exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Documents/Schengen%20Application%20Form.pdf`
  (fetched this cycle, HTTP 200) — Spain's own Schengen (Type C) short-stay
  visa application, bilingual Spanish/English. Compared field-for-field
  against `fr/france-visas/schengen-visa-application`'s own committed field
  list — a full match (see "Why this candidate needed a fresh look" above
  for the detail). Confirms the established duplicate; not authored.

### Source 4 (duplicate-detection comparison target)

- `de/auswaertiges-amt/national-visa-application`'s own source PDF,
  re-fetched this cycle directly from
  `auswaertiges-amt.de/resource/blob/207850/f9342033f2933dc05da54151efe283db/aufenthalten-data.pdf`
  (HTTP 200, 496,828 bytes), plus the schema's own committed `schema.json`
  (81 fields). Both were read and compared in full against Spain's own form
  — see "Why this candidate needed a fresh look" above for the field-by-field
  comparison this produced.

## Field inventory (Phase 3)

All 60 `fields[]` entries and their exact source item number are recorded
inline in `schema.json`'s own `sourceRef` per field. Summary by step:

| Step | Fields | Source items | Notes |
|---|---|---|---|
| `applicant_identity` | 12 | 1-9 | The Schengen-harmonized opening identity block; `maritalStatus` modelled as one enum from 7 independent checkbox widgets (see Judgment call 2) |
| `minor_and_travel_document` | 8 | 10-16 | `guardianDetails` (item 10) left ungated — see Judgment call 3 |
| `contact_and_residence` | 6 | 17-19 | `homeAddressAndEmail` modelled as one field, matching the source's own single combined box (see Judgment call 4) |
| `journey_details` | 5 | 20-23 | `purposeOfJourney`, Spain's own 12-option residence-purpose taxonomy, modelled as one enum from 12 independent checkbox widgets |
| `prior_extranjeria_resolution` | 2 | 24-25 | Both left ungated per the source's own footnote — see Judgment call 5 |
| `family_reunification_sponsor` | 9 | 26 | `requiredWhen purposeOfJourney == "family-reunification"`, per the item's own printed header |
| `employer_or_company` | 6 | 27 | `requiredWhen purposeOfJourney in [residence-and-employment, residence-and-self-employment, seasonal-employment, internship]`, per the item's own printed header ("en caso de solicitar un visado de residencia y trabajo/prácticas") |
| `educational_establishment` | 6 | 28 | `requiredWhen purposeOfJourney in [study, research]`, per the item's own printed header |
| `minor_temporary_educational_displacement` | 5 | 29 | Left ungated — a distinct scenario from item 28, no explicit gating checkbox on the source (see Judgment call 6) |
| `signature` | 1 | 30 | Physical signature itself not modelled, per this registry's standing convention |

Total: **60 fields**, **7 `documents[]` entries**, **2 `crossFieldValidation`**
rules.

## Access notes and judgment calls

1. **The entire "PARTE RESERVADA A LA ADMINISTRACIÓN" (reserved for
   administration) column is excluded from `fields[]`.** This right-margin
   block on pages 1-2 (application date, application number, case handler,
   the documents-received checklist, the visa decision, validity dates, and
   entries/days granted) is filled in by the consulate, not the applicant —
   the same class of exclusion this registry applies elsewhere to
   internal-marker or office-use-only widgets (e.g. `es/dgt`'s own excluded
   "Imprimir" button and stray margin widget). The documents-received
   checklist within this column, however, genuinely does describe the
   supporting-document types the consulate expects, so it is separately
   captured in `documents[]` (see Judgment call 7).
2. **Every choice-of-one section (`maritalStatus`, `travelDocumentType`,
   `purposeOfJourney`, `numberOfEntriesRequested`, `sponsorRelationship`) is
   modelled as a single `enum` field, not a set of booleans with an
   `exclusivityGroups` entry.** Each of these is a set of independent
   AcroForm checkbox widgets (confirmed via `getAnnotations()`:
   `radioButton: false, checkBox: true` on every one), not a native
   radio-button group — unlike `residesInCountryOtherThanNationality` (item
   18), which genuinely is a native radio pair (`radioButton: true`) and is
   modelled as a `boolean` accordingly. Modelling the checkbox groups as a
   single enum follows the precedent `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`
   set for this exact situation (its own `sex`, `maritalStatus`, and
   `purposeOfStay` fields), rather than the boolean-plus-`exclusivityGroups`
   convention `es/aeat`'s Modelo 030/036 used for its own independent
   checkboxes — both are established patterns in this registry; this
   document follows the one set by its closer sibling (same vertical, same
   registry cycle's own reference example).
3. **`guardianDetails` (item 10) is left `required: false` with no gating
   condition.** The form's own instruction ("en caso de menores de edad")
   makes this conditional on the applicant being a minor, but no separate
   "is the applicant a minor?" field or checkbox exists on the form to gate
   on — fabricating one would assert a condition the source does not
   itself state as a checkable field.
4. **`homeAddressAndEmail` (item 17) merges postal address and e-mail
   address into one field**, because the source itself presents them as a
   single combined free-text AcroForm box
   (`"17 Domicilio postal y dirección de correo electrón..."`), not two
   separate boxes — splitting it would fabricate a structure the source
   does not have, the same non-fabrication discipline `es/dgt` applied to
   its own combined NIF/NIE/CIF box.
5. **`nieNumber` and `extranjeriaResolutionNotificationDate` (items 24-25)
   are both left ungated.** The form's own footnote states these are
   "imprescindibles cuando exista una resolución previa dictada por el
   órgano de extranjería competente" (indispensable when a prior ruling by
   the competent immigration authority already exists) — a condition about
   the applicant's immigration history, not something any other field on
   this form states or gates on, so no `requiredWhen` was fabricated for it.
6. **The item 29 minor-temporary-educational-displacement block is left
   ungated**, for the same reason as `guardianDetails`: it describes a
   distinct scenario (a minor travelling under a public
   administration/non-profit/foundation-sponsored educational program, as
   opposed to their own parent/guardian) with no separate checkbox
   distinguishing it from the ordinary `study`/`research` purpose values,
   and applies to a minor rather than the primary applicant regardless of
   `purposeOfJourney`.
7. **`documents[]` derives from the administration's own "documents
   presented" checklist**, the same way this registry has previously
   treated comparable office-use checklists as a source for required
   supporting documents (e.g. `cz/mzv`'s own checklist-derived
   `documents[]`). Of the checklist's ten checkbox items (travel document;
   governmental authorization; application for governmental authorization;
   means of subsistence; proof of accommodation; medical certificate;
   criminal-record certificate; travel medical insurance; nota verbal;
   other), four map to universal, unconditional entries this cycle judged
   confidently required for every application (`applicantPhoto`, sourced
   separately from the form's own page-1 "FOTO" header rather than the
   checklist; `travelDocument`; `subsistenceMeansProof`;
   `accommodationProof`), and three map to entries this cycle could not
   confirm a universal trigger for and so modelled as optional
   (`medicalCertificate`, `criminalRecordCertificate`,
   `travelMedicalInsurance`) — the checklist itself does not state which
   `purposeOfJourney` value(s), if any, make each mandatory. "Autorización
   gubernativa" / "Solicitud de autorización gubernativa" (a narrow
   nationality-specific prior-authorization requirement) and "Nota Verbal"
   (a diplomatic-channel document) were judged too narrow/edge-case for a
   v1.0.0 `documents[]` entry and are not modelled.
8. **`nieNumber`'s `validation.pattern` (`^[XYZ][0-9]{7}[A-Z]$`) covers only
   the NIE format**, unlike `es/dgt`'s combined NIF/NIE/CIF regex — this
   form's own item 24 box is explicitly labelled "Número de Identificación
   de Extranjero (NIE)" alone, not a unified identity-document box.
9. **`crossFieldValidation` models two checks**: `travelDocumentValidUntil`
   after `travelDocumentDateOfIssue` (the same check
   `de/auswaertiges-amt/national-visa-application` and
   `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza` both already model), and
   `studiesEndDate` after `studiesStartDate` (new to this document, since
   this form is the first in this registry's Visa vertical to model a
   distinct start/end date pair for a course of study).
10. **The MAEC's own authenticated online channels (e.g. the visa-tracking
    portal referenced on consulate pages, and any Sede Electrónica
    submission flow) are out of scope for this v1.0.0** — this document
    models the paper/PDF form's own field set, the live source is always
    authoritative, consistent with this registry's standing scope
    convention for form-vs-portal candidates.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national visa-issuing authority, and submitting fabricated identity data
into a real government system is not a safe or reversible action.

Instead, a fully hand-constructed mock record was built from this document's
own field inventory
(`conformance/es/maec/solicitud-visado-nacional/1.0.0/application-packet.json`)
and independently checked with a standalone, ajv-free rule-tracing script
(not committed — reads `schema.json`'s own `required`/`requiredWhen`/
`validation.pattern`/`validation.enum`/`validation.maxLength`/
`crossFieldValidation` and evaluates them against each mock record), in
addition to the repo's own validators.

**Committed scenario — Ngozi Okafor, a Nigerian nurse applying for a
family-reunification visa to join her spouse (a Spanish national) already
resident in Madrid.** `purposeOfJourney: "family-reunification"` correctly
requires the full `sponsorFullName`…`sponsorEmail` block (via the
`requiredWhen` tie) while leaving the `employerOrCompany*` and
`educationalEstablishment*` blocks absent. Passes with zero errors.

**Two further scenarios (traced only, not committed as separate fixture
files):** (1) Wei Chen, a Chinese student applying under
`purposeOfJourney: "study"` with the `educationalEstablishment*` block and
`studiesStartDate`/`studiesEndDate` populated, sponsor and employer blocks
absent — passes with zero errors. (2) João Silva, a Brazilian software
engineer applying under `purposeOfJourney: "residence-and-employment"` with
the `employerOrCompany*` block populated — the first run of this scenario
correctly caught a gap in the *test data* (a missing
`employerOrCompanyRepresentativeIdNumber`, required whenever
`purposeOfJourney` is one of the four work-related values), not a schema
defect; corrected before the final run, which passes with zero errors.

**Five negative controls** (each expected to fail exactly one rule, run
against the committed family-reunification packet): (a) removing
`sponsorFullName` while `purposeOfJourney` is `"family-reunification"` —
correctly flagged as a missing required field; (b) setting
`purposeOfJourney: "vacation"` — correctly flagged as a `validation.enum`
violation; (c) `nieNumber: "1234567"` (7 digits, no letters) — correctly
flagged as a `validation.pattern` violation; (d) swapping
`travelDocumentDateOfIssue`/`travelDocumentValidUntil` so the document is
valid before it was issued — correctly flagged as a `crossFieldValidation`
violation; (e) `residesInCountryOtherThanNationality: true` with no
`residencePermitNumber`/`residencePermitValidUntil` supplied — correctly
flagged as two missing required fields (the `requiredWhen` tie fires on
both). All five negative controls were correctly rejected; no defects were
found in the schema itself.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/es/maec/solicitud-visado-nacional/1.0.0/schema.json
ok   registry/es/maec/solicitud-visado-nacional/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/es/maec/solicitud-visado-nacional/1.0.0/schema.json
ok   registry/es/maec/solicitud-visado-nacional/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- Spain's own Schengen (Type C) short-stay visa form — confirmed a
  field-for-field duplicate of `fr/france-visas/schengen-visa-application`
  (see "Why this candidate needed a fresh look" above).
- CIRCE's Documento Único Electrónico, MAEC's own authenticated visa-tracking
  portal, and any purpose-specific supplementary annex (e.g. an
  investor/entrepreneur visa's own economic-activity plan) a consulate may
  request in addition to this base form.
- The "PARTE RESERVADA A LA ADMINISTRACIÓN" column (application
  number/case-handler/decision/validity-granted fields) — office-use-only,
  not applicant-facing (see Judgment call 1).
- The physical signature itself (item 30's second half) — per this
  registry's standing convention.

## Scope and jurisdiction notes

This document gives Spain 5 of its 6 verticals (DMV, Business Formation,
Taxes, National ID, Visa); Passport remains a confirmed dead end
(appointment-only, no downloadable form — see `es/dgt/solicitud-tramites-vehiculo`'s
own VERIFICATION.md).
