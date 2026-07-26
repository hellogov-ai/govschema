# Verification record — `ch/zh/migrationsamt/gesuch-einreisebewilligung` v1.0.0

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-26`

This is **GOV-5076** ("GovSchema Standard Research").

## Candidate selection

A fresh re-scan of `CATALOG.md` this cycle found Mauritius's Business
Formation vertical (the prior seventeen cycles' recurring deliverable)
structurally exhausted for a genuinely new-vertical-opening move: the
Annual Return (LP3), the sole disclosed backlog item, carries three
partner tables that are each an undivided, unruled box with no printed
row count — and this registry has no `array`/repeating-structure type to
represent an unbounded table at all (GSP-0009, "Composite & repeating
values", remains **Proposed**, explicitly flagged in its own text as
"the single biggest model change" of the GOV-61 spec-evolution set,
routed to the CEO for acceptance and not yet accepted into any published
spec version). Authoring an eighteenth Mauritius Business Formation
companion would not move Mauritius past its own confirmed-capped 4 of 6
verticals (Taxes and National ID were confirmed dead ends back at
GOV-4603 — MRA's individual-return filing is a login-gated e-filing
portal with no blank form, and the National Identity Card Unit publishes
no standard first-issue application form).

Rather than deepen an already 17-companion-deep, vertical-capped
jurisdiction further, this cycle re-examined `CATALOG.md`'s own "Known
Gaps" record for jurisdictions sitting at 5 of 6 verticals, where a
single further schema would close the jurisdiction outright — the
highest-value shape of deliverable available. Of the thirteen
jurisdictions found at exactly 5/6 (AE, BA, BR, CH, CZ, GR, ID, JM, MK,
MN, MT, NO, PL), all but one had their remaining gap already confirmed a
hard dead end in a prior cycle (duplicate EU-harmonized visa templates,
CAPTCHA/WAF-gated portals, or confirmed no-application-form processes).
**Switzerland (CH)'s own Visa entry (`spec/proposals` notwithstanding) was
the one explicit exception**: GOV-1774's own disclosed finding
(`CATALOG.md`, "Genuinely open, well-sourced candidates") states that
SEM's national (Type D) and short-stay Schengen (Type C) visa PDFs are
confirmed duplicates of already-modelled EU-harmonized templates, **but**
explicitly flags as untested "whether a cantonal residence-permit process
(Switzerland's cantons administer residence permits, not SEM centrally)
offers a genuinely distinct, non-duplicate pathway." This cycle tested
that exact hypothesis.

## Reaching the live source

A web search for a cantonal migration-office entry-permit application
form led to Canton Zürich's own Migrationsamt (part of the
Sicherheitsdirektion), whose public forms page
(`https://www.zh.ch/de/sicherheitsdirektion/migrationsamt/formulare-broschueren-weisungen-des-migrationsamts.html`)
links a directly-hosted PDF titled "Einreisegesuch für
Drittstaatsangehörige" (Entry application for third-country nationals):

`https://www.zh.ch/content/dam/zhweb/bilder-dokumente/organisation/sicherheitsdirektion/migrationsamt/gesuche/Einreisegesuch%20f%C3%BCr%20Drittstaatsangeh%C3%B6rige.pdf`

- Fetched directly and unauthenticated via plain `curl` (no
  session/cookie state, no CAPTCHA/WAF challenge).
- HTTP 200, **49,072 bytes**.
- sha256 of the retrieved bytes:
  `cfb1a6c8918e9ff52fa13279cc852ab83d661548d9443811765ee1cee4c90ae9`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned no usable AcroForm fields (a single empty,
  untyped annotation on page 2) — a flat, non-fillable text-layer PDF,
  the same pattern as every CBRD-family schema already in this registry.
- `getTextContent()` recovered 182 positioned text items on page 1 and
  131 on page 2, with every printed label and checkbox-adjacent option
  cleanly recovered (no glyph-substitution garbling).

### Distinct-from-SEM confirmation

This form is the Migrationsamt's own cantonal intake process — filed
with the canton, not with SEM directly — covering personal/family data,
prior stays, and (on a second, employer-completed page) the
gainful-employment particulars that gate a Swiss work permit. It shares
no field-for-field structure with either SEM PDF GOV-1774 examined
(neither the short-stay Schengen template nor the national D-visa
template): those two model a single applicant's own visa-category
choice, sponsor, and travel-itinerary questions; this document instead
centers on family circumstances (parents, spouse/registered partner
status, accompanying family, family remaining abroad) and an
employer-completed labour-market section (salary, working hours,
collective-labour-agreement status, RAV job-centre reporting) that
neither SEM form asks for at all. Confirmed a genuinely distinct,
non-duplicate pathway, resolving GOV-1774's own disclosed open question.

## Extraction method

A positional text-layer dump (sorted by descending y-coordinate, then
x) reconstructed both pages' row/section structure. A supplementary
canvas render (`node-canvas`, 2.5x scale) was used to independently
count ruled-line and checkbox-row structure where the text layer alone
left row cardinality ambiguous (items 10 and 11 below) — as on every
prior cycle, glyph rendering itself failed via a Helvetica
path-resolution warning (the known `node-canvas` font-substitution gap
documented in this registry's `gov-form-pdf-extraction` practice note),
so the render was used for line/box-layout confirmation only, never for
text confirmation.

## Document structure

**Page 1** ("Gesuch um Einreisebewilligung", 16 numbered items):

- Header: "ZEMIS-Nr.:" and "ZH-Nr.:" — two Department-internal reference
  boxes preceding item 1, structurally analogous to the "FOR OFFICE USE"
  boxes already excluded on every Mauritius CBRD schema in this
  registry. **Excluded** as authority-internal, not applicant-supplied.
- Items 1–4: name(s), birth name, date of birth, sex (2-option
  checkbox), nationality, place/country of birth, and an 8-option
  marital-status checkbox row (confirmed by direct text-item count
  across the three printed lines: ledig/verheiratet/geschieden,
  verwitwet/gerichtlich getrennt/eingetragene Partnerschaft, durch Tod
  aufgelöste Partnerschaft/gerichtlich aufgelöste Partnerschaft).
- Item 5: parents' names and nationalities.
- Item 6: three independent nein/ja rows about the spouse/registered
  partner (Swiss citizenship, EU/EFTA citizenship, settlement-permit
  status). The form prints no checkbox or `requiredWhen`-style gate
  tying these to `maritalStatus`; modelled ungated (all three optional)
  rather than fabricating a conditional relationship the source does
  not state.
- Items 7–9: foreign residential address; whether the applicant is
  currently in Switzerland (nein/ja + "seit" date + address, modelled
  with two `requiredWhen` gates on the boolean); the Swiss representation
  abroad to authorize for visa issuance if visa-subject.
- **Item 10 — "Miteinreisende Familienangehörige" (accompanying family
  members):** a table confirmed **bounded to exactly 4 rows** by
  directly counting 4 printed "w"/"m" checkbox pairs (both the raw
  text-item y-coordinates and the canvas render agree). Modelled as 4
  bounded slots (`accompanyingFamilyMember1..4{FullName,DateOfBirth,Sex,
  Nationality,RelationshipDegree}`) per this registry's established
  bounded-slot convention for a fixed, printed row count — the same
  convention already used for, e.g., the LP2 sibling's 3 ruled partner
  rows.
- **Item 11 — "Familienangehörige im Ausland" (family remaining
  abroad):** shares one column header (Name und Vorname/Geburtsdatum/
  Wohnort/Staatsangehörigkeit) across two labelled rows, "Ehegatte:"
  (spouse) and "Kinder:" (children). Unlike item 10, no checkboxes mark
  row count directly, so this cycle measured the printed rule spacing
  instead: a supplementary canvas crop (`crop3.png`, cropped tightly
  around this section) confirmed the "Kinder:" label is followed by
  **two further ruled, unlabelled continuation lines** before item 12's
  own header begins — i.e. a 1-labelled-plus-2-unlabelled, 3-row bounded
  table sharing the same 4-column header. Modelled as
  `spouseAbroad{FullName,DateOfBirth,Residence,Nationality}` (1 row) and
  `childAbroad1..3{FullName,DateOfBirth,Residence,Nationality}` (3
  rows), all optional.
- Items 12–16: previous stays in Switzerland (single row: place,
  from/to dates, purpose); desired duration of stay and planned place of
  residence; precise purpose of entry; the filer's own name/address/
  phone; and the applicant's declaration (date, signature). Items
  13/14/16 plus the core identity block (items 1–4) and the filer's name
  are the only fields modelled `required: true` — see "Requiredness"
  below.

**Page 2** ("Aufnahme einer Erwerbstätigkeit" — taking up employment,
items 17–21, completed by the prospective employer):

- Item 17: employer particulars (company, address, postal code/city,
  responsible person, phone, fax, e-mail) plus a second, side-by-side
  billing-address block "printed only "(wenn abweichend Arbeitgeber)" —
  if different from the employer — with no separate yes/no toggle; left
  blank when the addresses coincide, so modelled optional/ungated.
- Item 18: whether the employer is bound by a collective labour
  agreement (nein/ja + name), modelled with one `requiredWhen` gate.
- Item 19: GATS intra-company-transfer flag; employment duration
  (from/to dates, or "unbefristet"/indefinite — modelled with a
  `requiredWhen` gate making `employmentEndDate` conditional on
  `employmentIndefinite` being `false`); date of taking up the position;
  place of assignment; a 3-option education-level checkbox
  (Hilfstätigkeit/Berufsabschluss/Fach-Hochschule).
- Item 20: guaranteed gross salary (amount + a 4-option pay-period
  checkbox: pro Jahr/Monat/Tag/Stunde), additional salary
  components/expenses, weekly working hours, and a genuinely
  **asymmetric** checkbox: "Wurde die Stelle beim zuständigen RAV
  gemeldet? Ja (Stellennummer)" — only a single "Ja" checkbox plus a
  job-posting-number blank is printed; no counterpart "Nein" checkbox
  appears anywhere in the row (confirmed via the positional text dump —
  no second option token follows "Ja"). Disclosed as an opt-in-only
  field rather than fabricating a symmetric boolean the source does not
  print; `regionalEmploymentCenterJobNumber` is gated on this boolean via
  `requiredWhen`.
- Item 21: free-text remarks; the employer's own signature/stamp and
  place/date.
- "Beilagen" (enclosures): three plain bulleted items with no adjacent
  checkboxes (Kopie Arbeitsvertrag, Lebenslauf, Kopie Diplom) — modelled
  as `documents[]` entries, category `supporting-evidence`, all
  `required: false`, the same un-checkboxed-enclosure-list pattern
  already disclosed on this registry's
  `mu/cbrd/limited-partnership-removal-from-register` schema (GOV-4974).
- The remainder of page 2 (a contact footer for the Amt für Wirtschaft
  and a note that work-permit applications can be filed online at
  `www.zh.ch/arbeitsbewilligungen`) is static boilerplate, not modelled.

## Requiredness — disclosed judgment call

Unlike the Mauritius CBRD forms (which mark required fields with a
printed asterisk), this source prints **no** asterisk or other
required-field marker anywhere on either page. Absent that signal,
`required: true` was applied only to the fields that are unambiguously
the substantive minimum for any application — the core identity block
(name, date of birth, sex, nationality, place/country of birth, marital
status), the purpose/duration-of-stay fields (items 13–14), the filer's
own name/address, and the final declaration (date, signature). Every
other field, including the entire employer-completed page 2 (since the
form provides no toggle field indicating whether the applicant intends
to take up employment at all — the page's own applicability is
circumstantial, not something the form itself gates with a field), is
modelled `required: false`. This is a disclosed judgment call, not a
source-observed fact.

## Conformance checks

An ephemeral (uncommitted) Node script built a field-name/`requiredWhen`
map from the published schema and exercised 11 scenarios:

1. A minimal valid document (all `required: true` fields present, every
   `requiredWhen` boolean false) — **PASS**.
2. `currentlyInSwitzerland: true` with `presentInSwitzerlandSince`/
   `addressInSwitzerland` omitted — **FAIL as expected**, then supplied
   — **PASS**.
3. `subjectToCollectiveLaborAgreement: true` with
   `collectiveLaborAgreementName` omitted — **FAIL as expected**, then
   supplied — **PASS**.
4. `employmentIndefinite: false` with `employmentEndDate` omitted —
   **FAIL as expected**, then supplied — **PASS**.
5. `reportedToRegionalEmploymentCenter: true` with
   `regionalEmploymentCenterJobNumber` omitted — **FAIL as expected**,
   then supplied — **PASS**.
6. A core required field (`purposeOfEntry`) omitted from an otherwise
   valid document — **FAIL as expected**.
7. Every `enum`-typed field (8 total) confirmed to carry a
   `validation.enum` array of 2+ values.
8. A field-name-hygiene check confirming no stray fixture-only field
   name leaked into the published schema.

All 11 checks passed as expected. No duplicate field names across 96
fields (confirmed programmatically). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass (693/693, meta-schema v0.3); the registry
index (`tools/govschema-client/registry-index.json`) was regenerated
(693 entries).

## Outcome

Opens Switzerland's Visa vertical (6th of 6), closing Switzerland to
**6 of 6 verticals** — Passport, DMV, Business Formation, Taxes, Visa,
and National ID all now have at least one published schema. No further
CH vertical gap remains open per `CATALOG.md`'s own record; a companion
cantonal schema for a different canton's own Einreisegesuch, or a
deeper pass extracting the "Beilagen" or civil/birth-register-extract
requirements referenced in item 10's own instruction, would be the next
candidate for a future cycle, disclosed here as open backlog rather than
fabricated.
