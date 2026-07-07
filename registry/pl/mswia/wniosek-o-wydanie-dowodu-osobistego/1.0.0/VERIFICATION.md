# Verification record — `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1666**), a general
research-analyst brief covering the full catalog: screen the open gaps it
names, pick the strongest, author it fully, test it, and commit.

## Why this candidate

The brief named four candidate areas: Spain's Passport and Visa gaps, Chile's
Passport/Visa/National ID gaps, or a brand-new 22nd jurisdiction (Portugal,
Poland, or another EU member). All four Spain/Chile candidates were
re-screened first, each confirmed weaker than a genuinely new option found
this cycle.

### Candidates screened and rejected

1. **Spain — Passport (Policía Nacional, DNI).** Re-confirmed a dead end.
   `citapreviadnie.es` and `interior.gob.es` both describe DNI issuance as a
   cita-previa (appointment) process at a Documentation Unit where the
   officer captures the applicant's data in person; no downloadable
   field-level application form or field-by-field guide was found this
   cycle, consistent with three prior cycles' findings (GOV-1624, GOV-1645,
   GOV-1652).
2. **Spain — Visa (national Type-D visa).** Re-confirmed to duplicate an
   already-published schema: `exteriores.gob.es`'s own "Solicitud de visado
   nacional" PDF (`.../20210611-Formulario nacional español-inglés.pdf`) is
   the same EU-harmonized long-stay-visa template already modelled as
   `de/auswaertiges-amt/national-visa-application` (confirmed by GOV-1652).
   No distinct Spanish-specific non-Schengen visa pathway was found this
   cycle. Not picked, per the brief's own explicit caution against
   duplicating that schema.
3. **Chile — Passport/Visa/National ID (Registro Civil e Identificación).**
   Re-checked this cycle for a guide/manual fallback, the same technique
   that resolved Spain's Modelo 036 (GOV-1659) and Indonesia's e-Visa
   (GOV-1581). No such fallback was found: `chileatiende.gob.cl`'s own
   "Pasaporte" and "Cédula de identidad" service pages both route to a
   ClaveÚnica-gated appointment system with no downloadable field-level
   form; the only unauthenticated PDF found (a consulate-hosted
   "Instructivo obtención cédula y pasaporte") is an appointment/
   requirements checklist rendered as embedded photo scans of a physical
   flyer, not a field-by-field walkthrough of any application screen. This
   matches every prior cycle's finding for this gap (GOV-1624, GOV-1638,
   GOV-1645) — confirmed still not viable, not re-authored.

### Candidate picked: Poland, a 22nd jurisdiction

Poland was not yet in the registry. Its national identity card (dowód
osobisty) application form, "Wniosek o wydanie dowodu osobistego" (form code
DO/W/1), is a genuine, currently-maintained, fully unauthenticated AcroForm
PDF attached directly to the gov.pl "Uzyskaj dowód osobisty" service page —
no login, CAPTCHA, or WAF gate. Its 47 form-field widgets across 2 pages
already carry complete, self-documenting Polish names (e.g. "Numer PESEL",
"Imię ojca (pierwsze)", "powód ubiegania się o wydanie dowodu - pierwszy
dowód"), extracted directly via `pdfjs-dist`'s own annotation layer with no
coordinate-matching or page-rendering needed — every field's label is
already its own internal PDF field name. This is a materially stronger
single-pass source than any of the three rejected candidates above, none of
which had a genuine field-level form or walkthrough available this cycle.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Ministerstwo Spraw Wewnętrznych i Administracji (MSWiA)
- **Document:** "Wniosek o wydanie dowodu osobistego" (form DO/W/1)
- **URL:** <https://www.gov.pl/attachment/6fd84906-d6cb-47d5-87f8-01bf7c984b3a>
  (directly retrieved, HTTP 200, no login), linked from the gov.pl service
  page <https://www.gov.pl/web/gov/uzyskaj-dowod-osobisty>.
- **Retrieved / reviewed:** 2026-07-07.
- **Extraction method:** downloaded directly via `curl`, then parsed with
  `pdfjs-dist` (`legacy/build/pdf.mjs`) — both `page.getAnnotations()` (for
  every AcroForm widget's own field name, type, checkbox export value, and
  rect) and `page.getTextContent()` (for the form's own instructional prose,
  section headers, and the "DO/W/1" form-code footer stamp) were read in
  full for both of the form's 2 pages. No rendering to a bitmap was
  attempted (an initial attempt via `pdfjs-dist` + `canvas` failed on an
  embedded inline image the form's own background uses — `TypeError: Image
  or Canvas expected` — but was not needed: every field name is already a
  complete label, unlike forms this registry has previously had to
  coordinate-match, e.g. `cl/sii/aviso-venta-vehiculo`'s generic
  `Texto1`…`Texto54` widgets).
- **What it confirms:** all 47 field widgets' own names, types (`Tx` text
  boxes vs. `Btn` checkboxes), and checkbox export values (all `"Tak"`); the
  form's own 6 numbered sections ("1. Dane osoby, która ma otrzymać dowód",
  "2. Dane kontaktowe wnioskodawcy", "3. Powód ubiegania się o wydanie
  dowodu", "4. Fotografia osoby, która ma otrzymać dowód", "5. Certyfikat
  podpisu osobistego", "6. Oświadczenie, podpis"); the explicit "nie jest
  obowiązkowy" (not obligatory) callouts for the phone and email fields; and
  the separate, clerk-only "Adnotacje urzędowe (wypełnia urzędnik)" block on
  page 2.

### Source 2 (corroborating, the governing regulation)

- **Document:** Rozporządzenie Ministra Spraw Wewnętrznych i Administracji z
  dnia 23 lipca 2025 r. w sprawie wzoru dowodu osobistego, jego wydawania i
  odbioru oraz utraty, uszkodzenia, unieważnienia i zwrotu (Dz. U. z 2025 r.
  poz. 1031).
- **URL:** <https://api.sejm.gov.pl/eli/acts/DU/2025/1031/text.pdf> (Sejm's
  own ELI act-text API, HTTP 200, no login), cross-checked against
  <https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001031> and
  independent secondary legal-reference sources (inforlex.pl, e-druki.pl)
  describing the same regulation and confirming form DO/W/1's own template
  is set by this regulation's Załącznik nr 2 (this cycle's own extraction of
  the regulation PDF's raw text repeated annex-boundary content in an
  overlapping way that made the annex numbering unreliable to read directly
  from the extraction; the "Załącznik nr 2" attribution is taken from these
  independent secondary sources rather than the raw extraction).
- **What it confirms:** this regulation is current (published 2025-07-29,
  effective 2025 — implementing EU Regulation 2025/1208 on strengthened
  identity-card security features) and supersedes an equivalently-titled
  2021 regulation; and, in its §5 ust. 1-2, the two distinct photo
  specifications this document's own `photo` document entry models — printed
  35 x 45 mm photographic paper for an in-person filing, vs. a digital file
  of at least 492 x 633 px and at most 2.5 MB (keeping the same 35 x 45 mm
  proportions) for an electronic filing under art. 24 ust. 2a of the
  underlying Ustawa o dowodach osobistych.

### Source 3 (corroborating, the live gov.pl service description)

- **URL:** <https://www.gov.pl/web/gov/uzyskaj-dowod-osobisty> (HTTP 200, no
  login).
- **What it confirms:** the online (profil zaufany / mObywatel / qualified
  e-signature) filing channel is authenticated and, per this page's own
  text, does not require the applicant to prepare any paper form at all
  ("Nie musisz przygotowywać żadnego papierowego wniosku... Urzędnik
  przygotuje twój elektroniczny wniosek w systemie") — the clerk instead
  prepares an equivalent electronic application from PESEL-registry data
  plus the same categories of information the DO/W/1 form itself collects
  (reason for applying, pickup office, personal-signature-certificate
  election, photo upload, contact details). This corroborates that DO/W/1's
  own field set matches what is actually collected end to end, even though
  neither this cycle nor a typical citizen ever submits the literal PDF to
  the authenticated online channel — the same "legally-authoritative wzór,
  not necessarily the literal submitted artifact" sourcing shape already
  established in this registry for gazetted forms (e.g.
  `kr/nts/corporation-establishment-and-business-registration`,
  `id/korlantas/international-driving-permit-registration`).

## Field inventory (Phase 2)

All 26 `fields[]` entries and the 1 `documents[]` entry, and their exact
source AcroForm field name, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Fields | Required for this v1.0.0? |
|---|---|---|
| §1 Dane osoby, która ma otrzymać dowód | `pesel`, `imiona`, `nazwisko`, `nazwiskoRodowe`, `dataUrodzenia`, `miejsceUrodzenia`, `obywatelstwoPolskie`, `plec`, `imieOjca`, `imieMatki`, `nazwiskoRodoweMatki` | All required — no "not obligatory" callout appears anywhere in this section |
| §2 Dane kontaktowe wnioskodawcy | `ulicaKorespondencyjna`...`miejscowoscKorespondencyjna`, `numerTelefonu`, `adresEmail`, `zgodaDanychKontaktowych`, `zgodaTelefonKomorkowy`, `zgodaAdresEmail`, `adresEpuap` | All optional (see judgment call 1 below) |
| §3 Powód ubiegania się | `powodUbieganiaSie` | Required (see judgment call 2 below) |
| §4 Fotografia | `photo` (documents[]) | Required |
| §5 Certyfikat podpisu osobistego | `certyfikatPodpisuOsobistego` | Optional |
| §6 Oświadczenie, podpis | `miejscowoscOswiadczenia`, `dataOswiadczenia` | Required |

Total: **26 fields** plus **1 `documents[]` entry** (the photo). No
`exclusivityGroups` or `crossFieldValidation` rules are modelled — every
conditional relationship this cycle found is either an unconditional
requirement or an advisory dependency disclosed in prose (judgment call 3
below), not a structural gate this cycle could independently confirm.

## Access notes and judgment calls

1. **The entire §2 "Dane kontaktowe wnioskodawcy" block (street through
   email) is modelled as optional, even though the form's own explicit "nie
   jest obowiązkowy" (not obligatory) callout text is printed only next to
   the phone and email fields, not the address fields.** Reasoning: a
   dowód osobisty applicant's registered residence for pickup-office
   purposes is already known to the receiving office via the PESEL
   registry; this section is titled "Dane kontaktowe" (contact details, as
   opposed to §1's identity data) and groups the address fields with phone
   and email under one shared heading and one shared instructional sentence
   ("Wpisz poniżej adres do korespondencji" — simply "write your
   correspondence address below," with no obligatory marker). No source
   examined this cycle states the correspondence address itself is
   mandatory. Disclosed here for a future reviewer to re-confirm against a
   filled specimen or a walkthrough guide, the same discipline
   `es/aeat/declaracion-censal-personas-fisicas-modelo-030` applies to its
   own unconfirmed `sexoInteresado` enum.
2. **`powodUbieganiaSie` (reason for applying) is modelled as a single enum,
   even though the PDF implements its 14 options as 14 independent checkbox
   widgets, not one native PDF radio-button group** (unlike, e.g., DGT's
   Modelo 01 `tramiteType`, whose export values GOV-1652 confirmed formed
   real linked radio groups). A citizen filing a genuine application has
   exactly one operative reason at a time (a card cannot simultaneously be
   a first-ever issuance and a loss report), so this document follows this
   registry's established convention of modelling a shared multi-purpose
   form's mutually-exclusive procedure list as one enum
   (`co/runt/formulario-solicitud-tramites-vehiculo`'s `tramiteType`,
   `es/dgt/solicitud-tramites-vehiculo`'s procedure enums) rather than 14
   independent booleans plus an `exclusivityGroups` entry. Disclosed as an
   inference from real-world semantics, not from a PDF-native grouping
   this cycle could technically confirm.
3. **`zgodaTelefonKomorkowy` and `zgodaAdresEmail` are modelled as
   independent optional booleans, with their logical dependency on
   `zgodaDanychKontaktowych` disclosed only in prose, not as a
   `requiredWhen`/`visibleWhen` gate.** The form's own sentence structure
   ("Wyrażam zgodę na przekazanie... imienia, nazwiska, numeru PESEL oraz: [
   ] numeru telefonu komórkowego [ ] adresu poczty elektronicznej") reads as
   one consent statement with two extension checkboxes, but nothing in the
   source states what happens if a sub-checkbox is marked while the parent
   consent is not — rather than fabricate a gate the source does not
   itself state, this document leaves all three independently settable,
   consistent with `es/aeat/declaracion-censal-alta-actividad-economica-
   modelo-036`'s own preference for leaving an unconfirmed structural rule
   out rather than inventing one.
4. **The clerk-only "Adnotacje urzędowe" block (page 2) is entirely out of
   scope.** It records the identity-verification method used, a parent's/
   guardian's/carer's name and surname when filing on behalf of a child or
   ward under 12, the identity document the clerk used, and whether
   fingerprints were taken — all completed by the receiving official, not
   supplied by the applicant, mirroring how `es/aeat/declaracion-censal-
   alta-actividad-economica-modelo-036` excludes its own physical-signature
   line as non-applicant-supplied data.
5. **The minor/ward (under-12, or a person unable to sign) application
   pathway is out of scope.** The form's own "Adnotacje urzędowe" block
   references a parent/guardian/carer filing on a child's or ward's behalf,
   and Rozdział 2 of the governing regulation describes fingerprint
   collection only for applicants who have completed their 12th year of
   life — this document models the general (adult/standard) applicant
   pathway only; the distinct minor/no-fingerprint pathway and its own
   representative-identity fields are a candidate for a future revision.
6. **No freshness window is modelled for the `photo` document.** The
   regulation excerpt examined this cycle (§5 ust. 1-2) states the photo's
   format/resolution/size requirements but not a maximum age (a general
   "current photo" recency rule for Polish identity documents lives in the
   underlying Ustawa o dowodach osobistych's own art. 29, not the
   regulation excerpt read this cycle) — left absent rather than fabricated,
   consistent with this registry's convention of omitting an unconfirmed
   `freshness.issuedWithin` value rather than guessing one (e.g.
   `kr/mois/resident-registration-card-reissuance`'s own confirmed `P6M`
   value was read directly from its source and is not a default to copy
   elsewhere).
7. **No `mediaTypes` constraint is modelled for the `photo` document.** The
   regulation excerpt gives a resolution, aspect ratio, and byte-size limit
   for the digital-filing pathway but does not name an accepted file
   format/media type in the portion read this cycle.
8. **`kodPocztowyKorespondencyjny` and `dataUrodzenia`/`dataOswiadczenia`
   are each modelled as one normalized field, even though the PDF's own
   AcroForm splits each into multiple boxes** (a 2-digit + 3-digit postal
   code pair; day/month/year date triples) — consistent with this
   registry's established convention for split date-of-birth and similar
   multi-box fields (e.g. `es/aeat/declaracion-censal-alta-actividad-
   economica-modelo-036`'s single `fechaInicioActividad` date field).

## Test run (Phase 3)

No live submission was attempted: the form's own paper-filing channel
requires an in-person appointment at a gmina office, and the authenticated
online channel (profil zaufany / mObywatel) requires a real Polish
electronic-identity credential — submitting fabricated applicant data
against Poland's live national identity register is not a safe or
reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory and manually checked against every field's
`required`/`validation` rule; it is committed as this document's conformance
fixture
(`conformance/pl/mswia/wniosek-o-wydanie-dowodu-osobistego/1.0.0/application-packet.json`).

**Scenario (committed fixture) — adult Polish citizen applying for her
first-ever dowód osobisty, correspondence address and both contact-data
consents partly supplied, no personal-signature certificate requested.**
`pesel: "92030512345"` (11 digits), `imiona: "Katarzyna Maria"`,
`nazwisko: "Nowak"`, `nazwiskoRodowe: "Nowak"`, `dataUrodzenia:
"1992-03-05"`, `miejsceUrodzenia: "Kraków"`, `obywatelstwoPolskie: true`
(satisfies the field's own `eligibleValues: [true]`), `plec: "kobieta"`
(a valid enum member), `imieOjca: "Andrzej"`, `imieMatki: "Barbara"`,
`nazwiskoRodoweMatki: "Wiśniewska"`, a full correspondence-address block
(`kodPocztowyKorespondencyjny: "31-021"`, matching the `NN-NNN` pattern),
`numerTelefonu`/`adresEmail` populated (`adresEmail` matches the field's
email pattern), `zgodaDanychKontaktowych: true` with
`zgodaTelefonKomorkowy: true` and `zgodaAdresEmail: false` (both
independently settable per judgment call 3), `powodUbieganiaSie: "pierwszy
dowód"` (a valid enum member), `certyfikatPodpisuOsobistego: false`,
`miejscowoscOswiadczenia: "Kraków"`, `dataOswiadczenia: "2026-07-07"`, and
the `photo` document supplied. A small Python script re-checked every
`required` field is present and every `validation.pattern`/`validation.enum`
rule is satisfied against `schema.json` directly (not just eyeballed) —
zero errors.

**Negative controls** (each traced by hand against `schema.json`, not
committed as separate fixture files): (a) `pesel: "1234"` — violates the
11-digit `validation.pattern`; (b) `plec: "K"` — violates
`validation.enum` (only the literal `"kobieta"`/`"mężczyzna"` values are
accepted, not an abbreviation); (c) `kodPocztowyKorespondencyjny: "31021"`
(no hyphen) — violates the `NN-NNN` `validation.pattern`; (d)
`adresEmail: "not-an-email"` — violates the email `validation.pattern`; (e)
`obywatelstwoPolskie: false` — a well-formed boolean, but outside the
field's own `eligibleValues: [true]`, so a consumer should treat it as an
eligibility/routing outcome rather than a data error, per GSP-0018; (f)
omitting `powodUbieganiaSie` entirely — violates the field's own
`required: true`. All six negative controls were correctly identified as
rule violations by manual rule-tracing against `schema.json`.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pl/mswia/wniosek-o-wydanie-dowodu-osobistego/1.0.0/schema.json
ok   registry/pl/mswia/wniosek-o-wydanie-dowodu-osobistego/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pl/mswia/wniosek-o-wydanie-dowodu-osobistego/1.0.0/schema.json
ok   registry/pl/mswia/wniosek-o-wydanie-dowodu-osobistego/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
