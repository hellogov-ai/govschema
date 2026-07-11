# Verification record — fi/poliisi/huoltajan-suostumus@1.0.0

## Why this candidate (GOV-2397, "GovSchema Standard Research")

Finland stood at 5 of 6 verticals (Business Formation, DMV, Taxes, National
ID, Visa published; Passport open and unscreened as Finland's sole remaining
vertical). Poliisi's own primary adult passport/identity-card application
process (poliisi.fi) was re-confirmed this cycle as online-application-plus-
mandatory-in-person-biometric — no downloadable blank application form exists
for the main flow. This is the same dead-end pattern this registry has
already confirmed for the Czech Republic, Norway, Estonia, Poland, and
Sweden's own passport verticals: a government identity document issued only
via an in-person, biometric appointment has no citizen-facing static form to
model.

There is, however, a genuine, standalone, citizen-facing companion PDF:
Poliisi-Muut-07, "Huoltajan suostumus" (Guardian's consent) — the form a
minor's guardian(s) use to consent to the minor being granted a passport,
identity card, firearms permit, or explosives precursor licence. This is
directly analogous to two existing precedents in this registry:
`se/polisen/medgivande-pass-nationellt-id-kort-minderarig` (GOV-2363, PM
531.2), which closed Sweden's Passport vertical the same way, and
`dk/fstyr/samtykkeerklaering-koerekort-under-18` (GOV-2346, P23T), a narrow
guardian-consent companion form that closed Denmark's DMV vertical.

Three other candidates were screened and set aside this cycle before
settling on this one — see "Candidates considered and not picked" below.

## Source fetch

- Finnish original:
  `https://poliisi.fi/documents/25235045/39994070/Muut+07+fi+-+Huoltajan+suostumus.pdf/759ee9b1-52b5-705b-32ef-055b11b39907?version=1.2&t=1648720607186`
  (form Poliisi-Muut-07, Finnish edition, revision dated 24.3.2022) — fetched
  fresh this cycle: HTTP 200, 743,734 bytes, genuine `%PDF-1.7` header, no
  login/CAPTCHA/WAF gate. SHA-256:
  `b693daeb6877300c43ca0a019522c77aef9ae704c7872013b61927bb6f88f31c`.
- English bilingual sibling:
  `https://poliisi.fi/documents/25235045/45904321/Muut+07+en+-+Guardians+consent.pdf/79c29be7-5bf0-de1c-dff9-7c0e68543d07?version=1.1&t=1648721040515`
  (revision dated 28.3.2022) — fetched fresh this cycle: HTTP 200, 789,231
  bytes, genuine `%PDF-1.7` header. SHA-256:
  `22110a298416f58dd4b74a2f423f5669bc7586504181d06c50bb87c0013a3fbe`. Used
  **only** to cross-check field meaning against a readable English rendering,
  not as the schema's primary source — modelled from the Finnish original,
  per this registry's preference for the native-language authoritative
  document.
- **Fetch gotcha, disclosed rather than silently worked around**: a bare
  `curl` request with no `User-Agent` header, and a URL variant with a
  duplicated `.pdf` path segment (a plausible URL shape this registry's own
  prior scouting pass had used), each returned an HTML "Tila" (Status) error
  page from poliisi.fi's Liferay-based CMS rather than the PDF. Re-fetching
  poliisi.fi's own live forms index (`poliisi.fi/lomakkeet`, `poliisi.fi/en/forms`)
  surfaced the current, correct download URLs (above) which succeeded
  immediately with a realistic desktop browser `User-Agent` string — not a
  bot-mitigation/WAF gate, just a stale/malformed URL from an earlier
  scouting pass.
- Discovery path: `poliisi.fi/lomakkeet` (Finnish forms index) and
  `poliisi.fi/en/forms` (English forms index), both fetched live this cycle,
  list "Huoltajan suostumus" / "Guardian's consent" under the "Muut" (Other)
  forms category.

## Independent field extraction

Performed fresh with `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`, a
throwaway `/tmp` scratch install, not added to this repo's tracked
`package.json`), on **both** the Finnish original and the English sibling
independently:

- `pdf.numPages` → 1 (both editions)
- `doc.getFieldObjects()` → 20 keys; per-page `page.getAnnotations()` → 20
  annotations, all `subtype === 'Widget'`, confirmed on both editions.
- Of the 20 Widget annotations, **4 are non-data UI controls**: `Tyhjenna1`
  (a "Tyhjennä lomake" / clear-form button near the top of the page),
  `Tallenna` (Save), `Tulosta` (Print), and `Tyhjenna2` (a **second**,
  separate "Tyhjennä lomake" clear-form button near the bottom of the page)
  — confirmed via each widget's own `fieldType: "Btn"` with no `checkBox`/
  `radioButton` flag and a `null` `fieldValue`, distinct from the real
  checkbox `Btn` widgets below. **16 applicant-facing data fields remain**,
  not 17 as an earlier scouting pass (which had informally counted "17 real
  data fields (+3 UI buttons)") had estimated — that count missed that the
  form carries **two** separate clear-form buttons (one top, one bottom),
  not one; this cycle's own precise widget-subtype count of 4 non-data
  buttons (not 3) supersedes the earlier estimate.

### Checkbox pairs are independent Btn widgets, not PDF radio groups

Every one of the 8 licence/document-type checkboxes (`Passikylla`/`PassiEi`,
`HKkylla`/`HKei`, `AAkyllä`/`AAei`, `LAkyllä`/`LAei`, and their English
equivalents `PassportYes`/`PassportNo`, etc.) is confirmed via
`radioButton: false` on every widget to be an **independent** checkbox, not
a member of a genuine PDF radio-button parent field — unlike, for example,
`fi/dvv/registration-of-foreigner`'s exclusive-choice groups, which **are**
genuine radio-button parents. Each checkbox's own on-state `exportValue` is
the literal string `"Kyllä"` ("Yes") **regardless of whether it is itself
the Yes or No checkbox for its row** — e.g. `PassiEi` ("Passport, No") still
carries `exportValue: "Kyllä"`. The semantic Yes/No meaning of each widget is
therefore only recoverable from (a) its own `alternativeText` tooltip (e.g.
`"Passi, Kyllä"` vs `"Passi, Ei"`) and (b) the page's own printed column
headers, both independently cross-checked via `page.getTextContent()`
coordinate extraction on both editions:

- Finnish: `"Kyllä"` printed at x≈183, `"Ei"` at x≈261, for every one of the
  four rows (Passi/Henkilökortti/Ampuma-aselupa/Lähtöainelupa).
- English: `"Yes"` printed at x≈230, `"No"` at x≈308, for every one of the
  four rows (Passport/Identity Card/Firearms permit/Explosives Precursor
  Licence).

This is a real, independently-derived finding (the raw `exportValue` string
alone would mislead a naive reader into thinking every checkbox represents
"Yes"), not assumed from the task brief. Each row is modelled as two
independent boolean fields (`<type>ConsentYes`/`<type>ConsentNo`) plus an
`exclusivityGroups` entry (at most one true), following this registry's own
established convention for a printed Yes/No (or multi-option) checkbox-row
pattern (`se/polisen`'s `travel_document_type` group;
`dk/um/application-for-danish-passport`'s `application_type` group) rather
than collapsing to a single unconstrained boolean or a single `enum` field.

## Section headers confirmed via text-layer extraction

`getTextContent()` on both editions confirms the form's own section
structure: `"Huoltajan suostumus"`/`"Guardian's consent"` (title),
`"Alaikäisen tiedot"`/`"Information on minor"`, `"Luvat"`/`"Licenses"` with
instruction text `"Suostun siihen, että alaikäiselle lapselleni voidaan
myöntää seuraavat luvat:"`/`"My consent for permitting following
licenses:"`, and `"Huoltajien allekirjoitukset"`/`"Signatures of guardians"`.
The footer instruction `"Täytä lomake huolellisesti. Puutteelliset tiedot
hidastavat asian käsittelyä."`/`"Carefully fill the form. Incomplete
information may slow down the process."` is a general completeness
admonition, not a specific document-attachment requirement — corroborating
the `documents[]` decision below.

## Two guardian blocks: stacked, not side-by-side; single combined signature line

Unlike Sweden's PM 531.2 (whose two guardian-consent blocks and witness
blocks are laid out side by side, left/right column), this Finnish form's
two `"Huoltajien allekirjoitukset"`/`"Signatures of guardians"` blocks are
laid out **one above the other** (confirmed via `getAnnotations()` widget
`rect` y-coordinates: `Nimi_2`/`Henkilötunnus_2` at y≈399–417 and
`Nimi_3`/`Henkilötunnus_3` at y≈314–331, both left-aligned at the same
x-position). `"first"`/`"second"` in this schema's own field names
(`firstGuardian*`/`secondGuardian*`) is therefore a document-modelling
convention corresponding to top/bottom position, not a label the source
itself prints — disclosed explicitly, following the same disclosure pattern
this registry's `se/polisen` sibling already established for its own
left/right convention.

Each guardian block carries exactly one combined
`"Päiväys, paikka ja allekirjoitus"`/`"Date, place and signature"` `Tx`
widget (confirmed via `getAnnotations()`: a single full-width `rect` per
block, e.g. `[57.14, 358.12, 555.89, 375.69]` for the first guardian) — **not**
three separate date/place/printed-name fields as Sweden's PM 531.2 sibling
prints. This schema models it as one combined `string` field
(`firstGuardianDatePlaceSignature`/`secondGuardianDatePlaceSignature`)
rather than synthetically splitting a field the source itself does not
split.

## Second guardian: no synthetic gating field (same judgment call as the Swedish precedent, independently re-confirmed for this form)

Neither language edition of this form prints any sole-vs-joint-custody
selector field, nor any prose explaining when a second guardian's consent is
required — confirmed by reading the full `getTextContent()` output of both
editions in full (reproduced above; there is no additional prose beyond what
is quoted). This is notably **more** silent than Sweden's PM 531.2, which at
least carries explanatory prose ("Vid gemensam vårdnad ska intyget
undertecknas av båda vårdnadshavarna") even though it too lacks a selector
field to key a `requiredWhen` condition on.

Per this registry's "spec precision over cleverness" and source-fidelity
principles, no synthetic gating field is invented.
`secondGuardianName`/`secondGuardianPersonalIdentityCode`/
`secondGuardianDatePlaceSignature` are each modelled as plainly
`required: false`, with no `requiredWhen`, each field's own `description`
disclosing that a second guardian's consent may be required in practice
(e.g. under joint custody) but that neither edition of this form provides
any fillable indicator or explanatory text this schema could condition a
`requiredWhen` rule on.

## `henkilötunnus` fields: `maxLength` only, reusing existing in-jurisdiction precedent

`minorPersonalIdentityCode`/`firstGuardianPersonalIdentityCode`/
`secondGuardianPersonalIdentityCode` use `maxLength: 20` with no strict
`pattern`, deliberately reusing this registry's own **existing**
`fi/vero/50a-earned-income-and-deductions` and
`fi/migri/residence-permit-employed-person` precedent for the Finnish
henkilötunnus field (both of which also use `maxLength: 20` with no
pattern) — a conservative, already-established convention for this
jurisdiction, not a new invention this cycle. (This form's own widgets carry
no format hint or input mask beyond a plain single-line text box, for either
the minor's or the guardians' henkilötunnus fields — confirmed via
`getAnnotations()` `rect` dimensions and the absence of any `maxLen`
attribute on the field objects.)

## Revision-date discrepancy between the two editions (disclosed, not resolved)

The Finnish edition's own footer reads `"Poliisi-Muut-07 24.3.2022"`; the
English edition's own footer reads `"Poliisi-Muut-07 28.3.2022"` — a
real, 4-day discrepancy between the two editions' own printed revision-date
stamps, confirmed independently via `getTextContent()` on both PDFs (not a
transcription error in this document). This has no bearing on field content:
both editions carry the identical 20 Widget annotations (16 data fields + 4
buttons) in the identical layout, cross-checked field-by-field above.
Disclosed here rather than silently reconciled or ignored.

## `documents[]`

This schema has **no `documents[]` array** — neither language edition's
printed text references any supporting-document/attachment requirement
anywhere (the footer's completeness admonition, quoted above, is general,
not document-specific), matching the `se/polisen/medgivande-pass-
nationellt-id-kort-minderarig` and `dk/fstyr/samtykkeerklaering-koerekort-
under-18` precedent of 0 documents for this class of narrow consent-appendix
form.

## Conformance verification

A one-off checker script (`check_conformance.mjs`, not committed — ad hoc
per this registry's convention) was written to evaluate every fixture in
`conformance/fi/poliisi/huoltajan-suostumus/1.0.0/` against this schema's
`fields[]` (`required`/`validation.maxLength`/`validation.minLength`) and
`exclusivityGroups` rules (no `documents[]` rules to evaluate, per above).
Results:

| Fixture | Errors | Expected |
|---|---|---|
| `single-guardian-passport-and-id-card.json` | 0 | 0 |
| `two-guardians-all-four-licences.json` | 0 | 0 |
| `mutation-control-missing-static-required.json` | 1 (`firstGuardianDatePlaceSignature` missing) | 1 |
| `mutation-control-henkilotunnus-maxlength-violation.json` | 1 (`minorPersonalIdentityCode` exceeds maxLength) | 1 |
| `mutation-control-exclusivity-group-violation.json` | 1 (`passport_consent` both true) | 1 |

All 5 fixtures produced exactly the expected error count. The two valid
scenarios cover both the minimal shape (a single guardian consenting to two
of the four licence types) and the fully populated shape (two guardians,
all four licence types, including exercising the "No" side of one
exclusivity pair); the three mutation controls each isolate exactly one rule
type (plain `required`, `validation.maxLength`, `exclusivityGroups`) by
construction — each mutation fixture is otherwise a fully valid, complete
submission with exactly one deliberate defect introduced, so no fixture can
pass by accidentally satisfying an unrelated rule.

## Registry validation

- `node tools/validate.mjs registry/fi/poliisi/huoltajan-suostumus/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/fi/poliisi/huoltajan-suostumus/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
- `node tools/verify-sources.mjs registry/fi/poliisi/huoltajan-suostumus/1.0.0` → "1 directory, 3 URLs checked, 0 warning(s), 0 allowlisted, all clear"

## Candidates considered and not picked

Three other jurisdictions' open, unscreened verticals were scouted in
parallel this cycle before settling on this Finnish candidate:

- **Spain (ES) Passport**: the main adult flow (`policia.es`) is confirmed
  in-person/biometric-only, same dead-end pattern. A companion form does
  exist —
  `https://www.dnielectronico.es/PDFs/autorizacion_menores_pasaporte.pdf`
  ("Autorización de pasaporte para menores"), a real, unauthenticated,
  fetchable 2-page PDF with a genuine text layer but **zero AcroForm
  widgets** — but its enumerable field set (minor's name; two legal
  representatives, each with name/DNI-NIE-passport-number/place; an
  "observaciones" free-text block) is narrower and less self-documenting
  than the Finnish AcroForm candidate ultimately picked. A viable backlog
  candidate for a future cycle if Spain's Passport vertical is revisited.
- **Argentina (AR) National ID**: RENAPER's DNI process is confirmed
  fully in-person/biometric, with only an internal, office-use "Formulario
  Único de toma de trámite" (not citizen-fillable) found. The only
  genuinely open PDF found in this vertical,
  `padron.gov.ar/cne_reclamos/reclamos/formulario_reclamo.pdf` (an
  electoral-roll correction form, not a DNI application), is a weaker fit
  for the National ID vertical than a direct identity-document application
  — set aside as a weak candidate, not picked.
- **Chile (CL) Passport, Visa, National ID**: all three of Chile's
  remaining open verticals were re-confirmed as dead ends this cycle —
  Passport and National ID (Registro Civil) are in-person biometric-capture
  workflows with no application PDF ever published; Visa's former
  email/paper fallback form (`extranjeria.gob.cl`) has been discontinued in
  favor of a strictly ClaveÚnica-login-gated online portal
  (`serviciomigraciones.cl`), which itself states applicants must not
  submit through any other channel.

## Scope and jurisdiction notes

This closes Finland's Passport vertical, the sole vertical that remained
open for Finland. **Finland now stands at 6 of 6 verticals** (Business
Formation, DMV, Taxes, National ID, Visa, Passport) — no vertical remains
open for Finland.
