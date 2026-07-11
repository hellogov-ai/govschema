# Verification record — dk/cpr/notification-of-entry@1.0.0

## Candidate selection

This session's brief (GOV-2260, "GovSchema Standard Research") picked up
Denmark's remaining vertical backlog. Denmark stood at 2/6 verticals
(Passport via `dk/um/application-for-danish-passport`, GOV-2244/GOV-2242;
Taxes via `dk/skattestyrelsen/oplysningsskemaet`, GOV-2253); CATALOG.md's
own Known Gaps section (item 4) named Business Formation (Erhvervsstyrelsen
/ `virk.dk`), Visa, and National ID & Civic Documents (Denmark's CPR
system) as open, unscreened candidates, noting the CPR personnummer already
reused throughout the Passport and Taxes schemas.

All three were screened fresh this cycle, in parallel:

- **Business Formation**: `virk.dk` form 40.110 ("Virksomhedsregistrering"
  / Registration of Foreign Business) is a genuine unauthenticated AcroForm
  PDF — the explicit paper fallback Erhvervsstyrelsen offers to applicants
  without MitID ("Hvis du ikke har MitID, kan du bruge blanket 40.110 i
  stedet for selvbetjeningsløsningen") — but it is scoped narrowly to
  foreign businesses/owners without a Danish CVR number, is entirely in
  Danish with no official English guide found, and the mainstream Danish
  ApS/A/S/enkeltmandsvirksomhed formation path is confirmed
  MitID/NemID-login-gated with no static fallback.
- **Visa**: the pure Schengen short-stay visa route
  (`applyvisa.um.dk`) is a JS-rendered SPA with no static form, and its
  underlying paper template is the pan-Schengen Annex I form already
  duplicated against `fr/france-visas/schengen-visa-application` and
  several other Schengen jurisdictions in this registry. SIRI's own
  `nyidanmark.dk` work-permit form (AR8) is genuinely Denmark-specific and
  unauthenticated, but is a fill-by-hand PDF with no AcroForm widget layer
  at all.
- **National ID & Civic Documents**: KL's (Kommunernes Landsforening)
  form FR 050, "Anmeldelse af indrejse" (Notification of Entry), used to
  register entry to Denmark in CPR (Det Centrale Personregister). A
  genuine, current, unauthenticated AcroForm with a real widget layer, a
  single national template used uniformly by all Danish kommuner (not a
  local variant), and an official English cross-check translation
  (FR 050_ENG) — the strongest of the three by this registry's own bar.
  **Picked.**

## Source

- **Danish:** `https://www.klxml.dk/KLB/Blanket/Gaelder/fr050.pdf`
- **English (cross-check only, not the schema's primary source):**
  `https://www.klxml.dk/KLB/Blanket/Gaelder/fr050_eng.pdf`
- Both fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `85,513` bytes (Danish) / `88,602` bytes (English), confirmed genuine
  PDFs containing an `/AcroForm` dictionary — no login/CAPTCHA/WAF gate on
  either.
- **Edition:** both specimens print `FR 050 (12/2025)` / `FR 050_ENG
  (12/2025)` in their footer — December 2025 edition, current as of this
  cycle.
- Listing page: `https://www.kl.dk/blanketter/blanketsamling/folkeregistrering`
  (KL's own form library for folkeregistrering/civil-registration forms).
- Process background confirmed directly against CPR-administrationen's own
  published guidance: `https://www.cpr.dk/borgere/kan-jeg-faa-et-personnummer/tilflytning-naar-jeg-flytter-til-danmark-1-gang`
  (fetched this session) — states the bopælskommune determines CPR
  entry-registration eligibility under CPR-lovens §16-17, and that a
  personnummer and sundhedskort (health-insurance card) follow from that
  registration.

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.mjs`, installed fresh to a scratch
`/tmp/pdfscratch` directory this session) was used per page via
`page.getAnnotations()` (widget rects, field names, `alternativeText`
tooltips) and `page.getTextContent()` (printed labels with x/y
coordinates), on both the Danish and English specimens independently.

Unlike the Skattestyrelsen tax form screened in a prior cycle, this
specimen's field names are **self-documenting** (`indrejse dato`,
`fraflytningsland`, `personnummer`, `personnummer 1` .. `personnummer 5`,
etc.) rather than generic `Text field #N` placeholders, so a coordinate
cross-reference was not strictly required to establish field identity —
it was still used to confirm each field's row position against the
page's own printed column headers (`Personnummer`, `Efternavn`, `Samtlige
fornavne og mellemnavne`, `Køn`, `Fødested`, `Statsborgerforhold`, `Medlem
af folkekirken`) and against the printed row numbers `1 2 3 4 5 6` next to
the six-row entrant table, on both the Danish and English pages, which
match exactly.

- **Page 1**: 80 annotations — 78 `Tx` text-field widgets, 12 `Btn`
  checkbox widgets (a Ja/Nej pair for each of 6 entrants' "Medlem af
  folkekirken" question), and other link/note widgets.
- **Page 2**: 2 annotations — a link annotation to `Datatilsynet.dk` and
  one free-text "kommune noteringer" field (a blank space for the
  municipality's own notes, not applicant-facing).

## The "municipality-only section" scoping decision (disclosed, not assumed)

Page 1 of the specimen carries its own printed section heading, **"Andre
oplysninger (udfyldes af kommunen)"** ("Other information, to be filled in
by the municipality") — confirmed identically on the English specimen as
**"Other information (to be filled in by the municipality)"** — directly
above a second block of fields: Ægteskabelig status (marital status),
Myndighed/dato og sted (marriage-authorizing authority, date, place),
Dokumenteret (documented), Ægtefælles personnummer (spouse's CPR number),
Tidligere adresse i Danmark (previous Danish address), Udrejsedato (date of
departure from Denmark), Politiets udlændingenummer (police alien
registration number) ×2, Fars/Mors personnummer (father's/mother's CPR
number), Lægevalg (choice of physician), Evt. bemærkninger (caseworker
remarks), Kontaktperson (municipal contact person), and Dato og
underskrift (date and the municipality's own signature).

Each of these fields' own `alternativeText` independently confirms the
same scoping (e.g. `"aegteskabelig status"` → *"Ægteskabelig status på de
indrejsende udfyldes af kommunen"*; `"far personnummer"` → *"Farens
personnummer udfyldes af kommunen"*). This schema therefore models **only**
the section above that heading — the section the applicant themselves
fills in — and deliberately excludes every field in the municipality-only
block. This mirrors the same class of finding the prior DK Taxes cycle
made for "Felt låst" rows: a hard, disclosed structural fact about the
specimen's own division of labor, not an editorial exclusion choice.

## Field structure: shared block + bounded 6-entrant repeating table

The specimen's own table prints row numbers `1` through `6` for "Alle
personer, der indrejser" ("All persons entering Denmark") — a bounded
repeating group, not an unbounded list. Since the GovSchema v0.3 field
`type` enum has no array/list primitive, this schema follows this
registry's existing precedent for bounded repeating groups (e.g.
`se/migrationsverket/work-permit-application`'s `child1FieldName` ..
`child5FieldName` convention) and flattens the table into
`entrant1FieldName` .. `entrant6FieldName`, 8 fields per entrant
(`CivilRegistrationNumber`, `Surname`, `GivenNames`, `Gender`,
`PlaceOfBirth`, `Citizenship`, `MemberOfFolkekirken`,
`CivilRegistrationNumberInCountryOfDeparture`) = 48 fields, plus 12 shared
entry-date/departure/destination-address fields = **60 fields total**.

Only entrant 1's core identity fields (`Surname`, `GivenNames`, `Gender`,
`PlaceOfBirth`, `Citizenship`) are `required: true` — a notification must
describe at least one person entering. Entrants 2-6 are left fully
optional, matching the specimen's own open-ended "up to 6, however many
apply" table design. `entrant1CivilRegistrationNumber` and every other
entrant's personnummer field are left optional for every entrant (not just
2-6) — see the next section for why.

## Two disclosed modelling decisions

1. **`entrantNCivilRegistrationNumber` is optional even for entrant 1.**
   CPR-administrationen's own guidance (cpr.dk, fetched this session)
   states plainly: *"Når du registreres som indrejst i CPR, får du
   tildelt et personnummer"* ("When you are registered as entered in CPR,
   you are assigned a personnummer") — i.e. this very notification is
   frequently the mechanism by which a first-time entrant obtains a
   personnummer, so the field cannot be assumed pre-filled/mandatory on
   the applicant's side; it is genuinely populated only for entrants who
   already hold one (returning residents, prior Udlændingestyrelsen/SIRI
   case holders, etc.).
2. **`entrantNMemberOfFolkekirken` is modelled as a single boolean**, even
   though the source PDF implements the question as two independent
   checkbox widgets (a "Ja" box and a "Nej" box — confirmed via
   `radioButton: false` on both, i.e. not a true mutually-exclusive radio
   group) that happen to share the identical AcroForm export value `"ja"`
   on both widgets — a specimen quirk disclosed here rather than silently
   corrected. `classification: "sensitive-pii"` is applied since religious
   affiliation is special-category personal data.

## Mock conformance test run

Two scenarios were built under
`conformance/dk/cpr/notification-of-entry/1.0.0/` and checked against this
schema's `required`/`validation` grammar with a disposable checker script
(`/tmp/check_conformance.mjs`, not committed — same technique used across
this registry's other v1.0.0 cycles):

- **`application-packet-minimal-required-only.json`**: a single entrant
  (Danish returnee moving from Sweden) with only the required shared and
  entrant-1 identity fields filled. **13 fields collected, 47 correctly
  not-applicable, 0 errors.**
- **`application-packet-full-family-of-two.json`**: a family of two
  (parent + child) moving from Sweden, with optional fields filled —
  personnummer, folkekirke membership (one true, one false), Nordic
  country-of-departure identification for both, and destination-address
  detail (floor, side/door number, city name, c/o address). **27 fields
  collected, 33 correctly not-applicable, 0 errors.**
- **A mutation/negative control**, derived from the minimal scenario with
  three defects introduced simultaneously and independently confirmed
  each raised its own expected error: removing the required
  `entrant1Surname` → `missing-required`; setting `movingToPostalCode` to
  `"ABCDE"` (violates `pattern: ^[0-9]{4}$`) → `pattern-violation`;
  setting `entrant1Gender` to `"X"` (violates `validation.enum:
  ["M","K"]`) → `enum-violation`. All three were correctly flagged in one
  run, confirming the checker script itself is discriminating rather than
  trivially passing every input.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate-ajv.mjs` (passes standalone) and `node
tools/validate.mjs` (passes against the full registry, 346/346 documents
after this addition, 3/3 mapping.json companions).

## Scope and jurisdiction notes

This document opens Denmark's National ID & Civic Documents vertical (3/6
for Denmark; Business Formation and Visa remain open, screened-and-set-aside
candidates per the "Candidate selection" section above — see CATALOG.md's
Known Gaps section for the full detail on each). It does not submit the
notification on the entrant's behalf, and does not replace the in-person
attendance and identity/residence documentation CPR-lovens §16-17 requires
at the applicant's own bopælskommune; the live source (kl.dk / the
applicant's own kommune) is always authoritative. GovSchema is independent
and is not affiliated with, endorsed by, or operated by the Kingdom of
Denmark, KL, or any Danish kommune.
