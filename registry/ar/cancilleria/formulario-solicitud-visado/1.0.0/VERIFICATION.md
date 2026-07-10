# Verification record — ar/cancilleria/formulario-solicitud-visado@1.0.0

## Candidate selection

Argentina opened as this registry's 32nd jurisdiction this same cycle via
`ar/afip/inscripcion-cuit-personas-juridicas` (GOV-2169), which disclosed two
already-identified but not-yet-fetched candidates for a future cycle: AFIP's
Formulario 460/F (individual/persona física analogue of the F.460/J) and
Cancillería's Formulario de Solicitud de Visado (FSV, ~50 widgets) for
Argentina's Visa vertical. This document pursues the FSV candidate, opening
Argentina's **Visa vertical (2nd of its 6 verticals)**.

This record does not re-litigate the prior scouting pass's byte counts; it
starts from a fresh, from-scratch re-fetch and re-extraction, matching this
registry's established practice for every authoring cycle.

## Source

- **Primary:** `https://cancilleria.gob.ar/userfiles/servicios/fsv_2024_espanol_editable.pdf`
  — fetched directly with `curl` and a realistic browser User-Agent:
  HTTP 200, `content-type: application/pdf`, exactly **311,233 bytes**
  (SHA-256 `66d7925e90f8b59229232e0f0fd493f278f638f98484d0fc84d7e6db4e7304f7`).
  This byte count independently reproduces the prior scouting pass's number
  — confirmed by re-fetching it in this session, not by trusting the prior
  disclosure.
- **Secondary/cross-check:** `https://cmila.cancilleria.gob.ar/userfiles/fsv_editable_espanol_-_2026_1.pdf`
  (Argentina's Los Angeles consulate's own mirror of the 2026 edition) —
  HTTP 200, `content-type: application/pdf`, exactly **378,338 bytes**
  (SHA-256 `112983a1724b4f47ac4b42b1b6f649164a92ec4f32f1da8ecdb91e58b9f0c3ce`).
  Byte-different from the primary (different PDF producer metadata/embedded
  fonts between the 2024 and 2026 editions), but — per the extraction below —
  structurally identical: same page count, same field count, same per-page
  widget distribution, and the same printed field numbering and text. This
  independently reconfirms the "stable across editions" claim already
  disclosed in the prior scouting pass, rather than assuming it.
- No login, CAPTCHA, or WAF gate was encountered fetching either URL.

## Extraction technique

Both PDFs were processed with `pdfjs-dist` v3.11.174 (`legacy/build/pdf.js`,
Node.js, no browser/canvas dependency needed for text/annotation extraction):

- `getDocument(...).numPages` → **3** on both editions.
- `doc.getFieldObjects()` → exactly **50** distinct field names on both
  editions. Every field name is a generic AcroForm identifier (`Texto1`
  through `Texto50`) carrying no descriptive internal name — labels had to
  be recovered entirely from surrounding page text, not from field names.
- `page.getAnnotations()` per page → **29 / 21 / 0** Widget-subtype
  annotations across pages 1/2/3 respectively, on both editions (50 total).
  Page 3 carries **zero** widgets on both editions — confirmed
  independently, not assumed.
- `page.getTextContent()` per page, with each text run's x/y position, was
  used to recover the form's own printed numbering ("1." through "51.") and
  cross-walk it against each widget's rectangle. Every widget on pages 1-2
  sits immediately below (lower y, PDF bottom-up coordinates) or beside its
  own numbered caption, with no ambiguous or overlapping assignment: all 50
  widgets map one-to-one to printed items 1-50, with item 51 ("Firma del
  solicitante y aclaración") being the only numbered item with no widget of
  its own (a wet-ink signature line).

No field label, numbering, or option set was taken from prior knowledge of
this specific form without confirming it against this session's own
extraction.

## Field model

The source's own numbering (1-50) is used directly as each field's
`sourceRef` anchor, following this registry's established convention for a
form whose print layout and interactive layer share one numbering scheme.
Three fields combine what could be considered two logically-distinct pieces
of information into one modelled field, because the **source itself**
provides only one blank box (one rectangle, one widget) for both, with no
separate sub-box:

- `passportIssuingCountryAndDate` (field 17: "PAÍS EMISOR Y FECHA DE
  EMISIÓN") — issuing country and issue date share one box.
- `signaturePlaceAndDate` (field 50: "CIUDAD Y FECHA DE LA SOLICITUD") —
  city and date share one box.
- `maritalStatus` (field 21) has no printed checkbox options at all (unlike,
  say, the AT Schengen visa's own enumerated marital-status list) — the
  applicant writes it in freely — so it is modelled as `type: string`, not
  `enum`.

No `exclusivityGroups` or radio-group reconciliation was needed: unlike the
sibling `ar/afip` cycle's 351-widget specimen, every one of this form's 50
widgets is a plain `/Tx` text field (`getFieldObjects()` confirms
`type: "text"` on all 50, no `/Btn` checkboxes or radio groups anywhere in
the AcroForm), so there is no independent-checkbox-vs-single-choice
reconciliation question to resolve.

**Disclosed technique — "boolean" fields sourced from free-text `/Tx`
widgets, not checkboxes.** Eleven items (fields 32, 35, 41-49) are yes/no
questions per their own printed hint text ("SI o NO"), but the underlying
AcroForm widget is a plain text field, not a checkbox/radio button — the
applicant is expected to type the literal string "SI" or "NO" into a blank
box, not tick one. These are modelled as `type: boolean` per SPEC.md §6.2
("Yes/no"), since that is the field's real-world semantic, but each such
field's own `description` discloses the underlying free-text mechanism
explicitly, so a consumer is never misled into assuming a checkbox/radio
widget exists in the source that does not.

**Disclosed scope decision — nine fields modelled as optional despite the
form's own "complete up to field 50" instruction.** Page 1 carries the
instruction "► Completar hasta campo 50" ("Complete through field 50"),
which is the closest thing this specimen has to a source-asserted
required/optional signal (there is no `/Ff` Required bit set on any of the
50 widgets — checked programmatically across all 50 — and no printed
asterisk-required convention either). Read literally, that instruction asks
for an entry in every one of fields 1-50. Nine fields are nonetheless
modelled here as optional (`required: false`, no `requiredWhen`), because
their content is inherently inapplicable to a real subset of applicants and
the source form provides no distinct "N/A" affordance or per-field
applicability gate of its own:

1. `otherNamesOrAliases` (field 3) — maiden/religious/professional name or
   alias; inapplicable to applicants with none.
2. `lebaneseFamilyRegistryNumber` (field 11) — the **only** one of these
   nine that is a genuine **source-stated** exemption: the box's own hint
   text reads "sólo en caso de origen libanés" ("only if of Lebanese
   origin").
3. `employer` (field 19), `workPhone` (field 20), and `activityAndPosition`
   (field 23) — inapplicable to retirees, students, homemakers, and other
   non-employed applicants.
4. `referencesInArgentina` (field 26) — many first-time visitors have no
   personal/business references in Argentina to list.
5. `spouseDetails` (field 30) — inapplicable to unmarried applicants.
6. `childrenDetails` (field 31) — inapplicable to applicants with no
   children.
7. `relativesResidingInArgentina` (field 39) — inapplicable to applicants
   with no such relatives; this field's own hint text ("quién, dirección,
   teléfono") also calls for a descriptive free-text answer rather than the
   plain "SI o NO" toggle used by the genuinely-universal declaration
   questions (41-49), reinforcing that it is not meant as a mandatory
   yes/no gate.

Only field 11's exemption is a literal source citation; the other eight are
a disclosed authoring judgment call, not a claim that the source itself
marks them optional — flagged here explicitly per this registry's
fabrication-avoidance convention.

**`crossFieldValidation`.** One rule: the intended departure date from
Argentina must be on or after the intended arrival date (fields 28-29).

**Conditional block (fields 33-38).** Fields 33 ("¿Cuándo la solicitó?") and
34 ("¿Dónde la solicitó?") are modelled `requiredWhen`
`previouslyAppliedArgentineVisa` (field 32) `equals true`. Field 35 ("¿Ingresó
con la visa?") has no gating field of its own printed on the source — it is
positioned immediately after the field-32/33/34 block with no independent
"did you apply?" caption repeated — so it is modelled `requiredWhen` the same
field-32 condition, on the reasoning that a "did you enter with that visa"
question is only meaningful once a prior application is disclosed. Fields 36
("¿Cuándo ingresó?"), 37 ("Plazo de esa estadía"), and 38 ("Motivo de esa
visita") are in turn modelled `requiredWhen` `enteredWithPreviousVisa` (field
35) `equals true`. This mirrors the same "disclosed judgment call, not a
source-printed conditional-logic gate" pattern already used for the nine
optional fields above.

**Page 3 — consular-officer-only section, out of scope.** Page 3 is headed
"Espacio para uso exclusivo del funcionario consular" ("space reserved
exclusively for the consular officer") and lists: visa category
(permanent/temporary/transitory), migratory criteria, visa validity period,
authorized length of stay, entry type (single/multiple), and the consul's
own opinion. `getAnnotations()` confirms **zero** widgets on page 3 on both
editions — independently reconfirmed, not assumed — consistent with this
being filled in by consular staff, not the applicant, and it is therefore
excluded from this applicant-facing schema.

**Documents.** Page 3 also carries a "Foto color" / "4x4 cm" / "fondo
blanco" placeholder box (a required colour photograph, 4x4cm, white
background) with no AcroForm widget of its own, consistent with the flat
placeholder nature of a photo box — modelled as a required `documents[]`
entry (`applicantPhoto`). Field 51 ("Firma del solicitante y aclaración") —
signature plus printed name, with no AcroForm widget — is modelled as a
required `documents[]` attestation (`applicantSignature`), citing the form's
own page-1 banner: "DECLARACIÓN JURADA. SU FALSEDAD CONLLEVA EXPULSIÓN Y
PROHIBICIÓN DE REINGRESO" ("Sworn declaration. Any falsehood carries
expulsion and a ban on re-entry.") — this is the entirety of the form's
declaration text (a one-line banner, not a multi-paragraph consent
paragraph like the AT Schengen visa's own declaration), so it is
paraphrased in the `statement`, not split further.

**Supporting-documents checklist — deliberately not invented.** Page 3's own
prose states the required-documentation list is furnished to the applicant
through a separate channel, not printed on this specimen: "El listado de esa
documentación ha sido proporcionado previamente al solicitante de la visa."
No supporting-document checklist (proof of funds, itinerary, invitation
letter, etc.) is therefore modelled beyond the photograph and signature —
inventing one would not be traceable to this source.

## Mock conformance test run

Two scenarios were built under
`conformance/ar/cancilleria/formulario-solicitud-visado/1.0.0/` and checked
against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]`/`crossFieldValidation` grammar with a disposable checker
script (`/tmp/gov2179-fsv/check_conformance.mjs`, not committed — same
technique used by the `at/bmeia` and `ar/afip` cycles this same period):

- **`application-packet-tourist-single-entry.json`**: Marina Alvarez, a
  Colombian tourist applying for a single-entry visit, no employer/spouse/
  children/references/Lebanese-registry data supplied (all correctly
  optional and absent), no prior Argentine visa application. **35 fields
  collected, 15 correctly not-applicable, 0 errors**; both required
  `documents[]` entries provided.
- **`application-packet-returning-business-visitor.json`**: Ivan Petrov, a
  Bulgarian national resident in Argentina, married with one child
  travelling with him, a business visitor with a prior Argentine visa
  application (populating the full 32→33→34→35→36→37→38 conditional chain),
  employed with employer/work-phone/activity-and-position all populated.
  **49 fields collected, 1 correctly not-applicable** (the Lebanese family
  registry number, genuinely inapplicable), **0 errors**.
- **Eight mutation/negative controls**, each derived from the tourist
  scenario with exactly one defect introduced, each correctly raising the
  expected error (confirming the checker is not vacuously passing):
  1. Removing the required `surname` → `missing-required`.
  2. Setting `homePhone` to a 124-character string (exceeds
     `maxLength: 100`) → `range-violation`.
  3. Setting `sex` to `"unspecified"` (not in its 2-option `enum`) →
     `enum-violation`.
  4. Setting `previouslyAppliedArgentineVisa` to `true` while leaving
     `previousVisaApplicationDate`/`previousVisaApplicationPlace`/
     `enteredWithPreviousVisa` unset → three `missing-required` violations
     on the conditional chain, confirming `requiredWhen` cascades correctly
     through fields 33/34/35.
  5. Removing the required `applicantPhoto` document →
     `missing-required-document`.
  6. Removing the required `applicantSignature` document →
     `missing-required-document`.
  7. Setting `departureDateFromArgentina` to a date before
     `arrivalDateInArgentina` → `cross-field-violation` on
     `departureNotBeforeArrival`.
  8. Setting `deniedEntryExpelledOrReentryBanned` to the string `"no"`
     (not a JSON boolean) → `type-violation`.

The schema was also validated with this registry's own tooling:
`node tools/validate.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0/schema.json`
(1/1 pass) and
`node tools/validate-ajv.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0/schema.json`
(1/1 pass against the GovSchema v0.3 meta-schema, ajv draft 2020-12), and
`node tools/verify-sources.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0`
(0 warnings, 4 URLs checked, 0 allowlisted, all clear).

## Pre-PR re-verification

Both source PDFs were re-fetched live a second time in this same session
immediately before finalizing this record: both returned HTTP 200 with
`content-type: application/pdf`, and both were byte-for-byte
SHA-256-identical to the first fetch
(`66d7925e90f8b59229232e0f0fd493f278f638f98484d0fc84d7e6db4e7304f7` for the
2024 primary, `112983a1724b4f47ac4b42b1b6f649164a92ec4f32f1da8ecdb91e58b9f0c3ce`
for the 2026 mirror).
`node tools/verify-sources.mjs registry/ar/cancilleria/formulario-solicitud-visado/1.0.0`
reports all clear (0 warnings, 4 URLs checked) on this same re-verification
pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would confirm with Cancillería or an Argentine consulate whether any
mission-specific variant (beyond the byte-different-but-structurally-
identical 2024/2026 editions already cross-checked here) exists, and
whether the supporting-documentation checklist referenced obliquely on page
3 ("proporcionado previamente al solicitante") has a canonical published
form worth citing directly in a future version.

## Scope and jurisdiction notes

Gives Argentina (GovSchema's 32nd jurisdiction, opened this same cycle via
GOV-2169) its **2nd of 6 verticals** (Business Formation, Visa). AFIP's
sibling Formulario 460/F (individual/persona física analogue of the F.460/J,
~148 widgets per the prior scouting pass, not yet fetched or verified)
remains an open, identified backlog candidate for a future cycle. Argentina's
remaining verticals (Passport, DMV, Taxes, National ID) are open,
unscreened backlog candidates.
