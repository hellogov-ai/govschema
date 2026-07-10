# Verification record — at/bmi/national-identity-card-application@1.0.0

## Candidate selection

This session's brief was to screen Austria's three remaining unscreened
verticals — Passport, Visa, and National ID — and author one schema from
the strongest candidate. Austria (GovSchema's 31st jurisdiction) already
has Business Formation (`at/gewerbebehoerde/trade-licence-registration`) and
Taxes (`at/bmf/employee-tax-assessment`); DMV was screened and confirmed
weak in a prior cycle (Kfz-Zulassung is in-person/counter-driven with no
downloadable specimen).

- **Passport (`bmeia.gv.at`, `bmi.gv.at`)**: Austria's domestic passport
  process is confirmed in-person/counter-driven for the applicant
  themselves (all applicants, including infants, must be personally
  present at a Passbehörde or, abroad, an embassy/consulate — fingerprints
  are captured live). A genuine bilingual combined
  "Antrag auf Ausstellung eines österreichischen Reisepasses oder
  Personalausweises" (Application for an Austrian passport or identity
  card) fillable-AcroForm PDF does exist
  (`bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/Antrag_Reisepass_Personalausweis_Deutsch-Englisch.pdf`,
  292,446 bytes, 2 pages, 42 AcroForm widgets, confirmed with `pdfjs-dist`)
  and is a real, usable candidate — but individual Austrian missions
  publish their own bespoke local variants of what is nominally the "same"
  form (see below), so a single central specimen's currency/precedence is
  harder to pin down than the dedicated identity-card form described next.
- **Visa (`bmeia.gv.at`)**: the standard EU/Schengen uniform "Formular C1"
  application form (`Antragsformular_Visum_C_NEU.pdf`, 285,208 bytes, 4
  pages) is genuinely field-numbered (37 numbered fields, no AcroForm
  layer — a flat/print specimen, like this registry's prior
  `is/skatturinn` numbered-line extraction) and well documented, but it is
  the identical EU-wide template every Schengen state uses under Regulation
  (EC) No 810/2009 Annex I, not an Austria-specific design — a real,
  legitimate, open candidate for a future cycle, but a comparatively
  thinner "Austria" story than the other two verticals this session.
- **National ID (`bmi.gv.at`, `bmeia.gv.at`, `oesterreich.gv.at`)**: the
  strongest candidate found. A dedicated, single-page
  "Antrag auf Ausstellung eines Personalausweises" (Application for
  issuance of an identity card) fillable-AcroForm PDF is hosted directly
  by `oesterreich.gv.at` on its own federal content-delivery host, and is
  byte-identical to the copy in BMEIA's central forms library, which is in
  turn linked by name from a live Austrian embassy citizen-services page.
  It contains two genuine PDF radio-button groups (gender, legal-
  representation basis) — a cleaner, more precisely-modellable structure
  than the independent (non-grouped) checkboxes found on the combined
  passport/identity-card specimen. This is what this document models.

Selected: **National ID**, via the dedicated Personalausweis application
form. This gives Austria its 3rd of 6 verticals (Business Formation, Taxes,
National ID); Passport and Visa remain open, screened-and-still-viable
backlog candidates for a future cycle (see "Scope and jurisdiction notes"
below and the accompanying CATALOG.md update).

## Source

- **Primary:**
  `https://www.oesterreich.gv.at/dam/jcr:97e7a2ac-f901-4956-af98-65e114194c1b/persausw.pdf`
  — confirmed by direct `curl` fetch with a browser User-Agent: HTTP 200,
  `content-type: application/pdf;charset=UTF-8`, exactly **2,036,464 bytes**,
  a genuine fillable AcroForm PDF (34 total `Widget` annotations, confirmed
  with `pdfjs-dist`), single page. This URL was found via a web search for
  the exact form title and confirmed to be hosted directly on
  oesterreich.gv.at's own federal "dam" (digital asset management) content
  host, not a third-party mirror.
- **Corroborating (byte-identical):**
  `https://www.bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/_ANTRAGSFORMULAR_Personalausweis.pdf`
  — fetched separately (HTTP 200, `application/pdf`, 2,036,464 bytes) and
  confirmed **SHA-256-identical** to the oesterreich.gv.at copy
  (`327379fbe896743423dd5586379c9578950e8d03381fefb3186fd7be1d2d4172` for
  both files). This is BMEIA's own central "Allgemein/Formulare" (General
  Forms) library, distinct from any single mission's own local subfolder.
- **Corroborating (live context):**
  `https://www.bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-identity-card`
  (HTTP 200) — a live, current (fetched 2026-07-10) Austrian embassy
  citizen-services page that states: "You can apply for an Austrian
  Identity Card (Personalausweis) at the Austrian Embassy Canberra and at
  selected Consulates... The same documents are required for applying for
  an identity card as for applying for a passport," and links the exact
  central-library file above by name, "Forms PDF: Application Form
  Identity Card (Personalausweis)".
- **Corroborating (domestic-process context):**
  `https://www.oesterreich.gv.at/de/themen/persoenliche_dokumente_und_bestaetigungen/personalausweis/Seite.030100`
  (HTTP 200) — oesterreich.gv.at's own "Personalausweis – Neuausstellung"
  page, confirming: Austrian citizenship is a precondition; the competent
  domestic authority (Passbehörde) is the Bezirkshauptmannschaft (or, in
  statutory cities, the Magistrat; in Vienna, a Magistratisches
  Bezirksamt); the application "muss persönlich eingebracht werden" (must
  be submitted in person); and a separate chapter, "Ausstellung eines
  Personalausweises – Auslandsösterreicher" (issuance of an identity card
  for Austrians living abroad), covers the consular channel this specific
  PDF specimen serves.

Two other specimens found this session for the same general topic were
screened and **not** used as this document's source:

- A bilingual German/English 2-page, 42-widget combined
  "Antrag auf Ausstellung eines österreichischen Reisepasses oder
  Personalausweises" form
  (`bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/Antrag_Reisepass_Personalausweis_Deutsch-Englisch.pdf`,
  292,446 bytes) — a real, usable specimen, but its document-type
  selector (emergency passport / additional passport / identity card) is
  implemented as three independent, non-grouped PDF checkbox fields
  (confirmed via `getAnnotations()`: distinct field names, no shared
  radio-group name), a less precisely machine-modellable structure than
  the dedicated form's true radio groups.
- A trilingual German/English/Hebrew 2-page, 74-widget consular variant
  specific to the Austrian Embassy in Zagreb
  (`bmeia.gv.at/fileadmin/user_upload/Vertretungen/Agram/Dokumente/Antrag_Reisepass_DE-EN_ab_11_2025.pdf`,
  2,593,778 bytes, dated "ab 11/2025" in its filename) — this specimen
  carries a stray, apparently miscopied Hebrew caption on several of its
  German/English field labels (e.g. a Hebrew phrase inside the label for
  "Erwachsene / Adult"), evidence that individual missions' own local
  document folders reuse and lightly re-edit templates across missions
  without always fully adapting them — exactly the kind of per-mission
  inconsistency this registry's sourcing practice (preferring a central,
  canonical specimen over a single mission's own copy) is meant to avoid.

All four cited URLs above were re-fetched live a second time in this same
session immediately before this record was finalized (see "Pre-PR
re-verification" below).

## Extraction technique

The PDF's AcroForm layer was extracted with `pdfjs-dist` v3.11.174
(`legacy/build/pdf.js`, loaded via `createRequire` since this version ships
no `.mjs` entry point), calling `page.getAnnotations({ intent: "display" })`
to enumerate every `Widget` annotation (field name, field type,
checkbox/radio flags, export values, rect) and `page.getTextContent()`
(with each item's `transform[4]`/`transform[5]` x/y coordinates preserved)
to reconstruct the surrounding prose and labels by position.

- **34 total AcroForm widgets**, all on the PDF's single page.
- **7 are non-data controls**, excluded from the field model:
  - Two widgets named `Familien-/Nachname Ue1` / `Familien-/Nachname Ue2`
    whose own default `fieldValue` is literally the string
    `" Familien-/Nachname"` — i.e. their value *is* their own printed
    heading label, evidence they are duplicate heading-label widgets
    rather than applicant-editable data fields (analogous to the prior
    `at/bmf` cycle's excluded running-header display widget).
  - `Text10` (rect width ≈2.6pt, height ≈5.3pt) — a near-zero-area stray
    widget positioned entirely inside the `Ort der Geburt` widget's own
    rect, with no adjacent label of its own.
  - `Text26` (default value a single space `" "`) — positioned overlapping
    the `Hauptwohnsitz` label/box boundary, with no distinct label of its
    own.
  - `Text5000` — positioned overlapping the page's own instructional note
    text ("Bitte beachten Sie auch die Hinweise auf der Rückseite.", see
    below), not under any field-specific label.
  - `Text22` (default value literally `"HELP.GV.AT/persauswausfuell1_010514"`)
    and `Text23` (default value literally `"Seite 1 von 1"`) — footer
    widgets carrying the form's own internal reference code and
    page-count stamp, not applicant data.
- The remaining **27 real data widgets** map onto this document's **23
  fields**: two genuine PDF radio-button groups — confirmed via
  `getAnnotations()`'s `radioButton: true` flag together with a single
  shared field name across their widgets (`Geschlecht (zutreffendes
  ankreuzen)`, 2 widgets; `Gesetzliche Vertretungsbefugnis ist gegeben
  (Zutreffendes ankreuzen)`, 4 widgets) — were each merged into a single
  `enum` field (`gender`, `legalRepresentativeBasis`) rather than modelled
  as independent unconstrained booleans, the mismodeling this registry has
  been burned by before. Total savings: 1 + 3 = 4 widgets, so
  27 − 4 = 23. This is a materially cleaner structure than the combined
  passport/identity-card specimen screened and set aside above, whose
  analogous document-type selector is three *independent*, non-grouped
  checkbox fields (no shared radio-group name) — correctly left unmerged
  in that specimen, had it been used, per the same principle applied in
  reverse.
- The two stacked "Familien-/Nachname" text-entry widgets (each with its
  own duplicate "Ue" heading widget directly above it, per the excluded
  controls above) were modelled as two separate fields, `surnameLine1` and
  `surnameLine2`, matching the form's own two-physical-line design for a
  long or compound German surname — the same bounded-repeatable-line
  convention already established by this registry's `at/bmf`
  `occupationalFlatRateCode1`/`2` fields and `is/skatturinn`'s
  `employer1`/`employer2` fields.

## Font-extraction artifact (disclosed, not silently corrected)

A specific font used for this PDF's heading/note text drops the letter
"F" from certain rendered words in `pdfjs-dist`'s `getTextContent()`
output — confirmed independently (not asserted from a single instance) by
comparing against reliably-encoded string data elsewhere in the same PDF
(the excluded `Ue1`/`Ue2` widgets' own literal `fieldValue` strings, which
are read directly from the PDF's field dictionary, not rendered through
the buggy font):

| Rendered (buggy) | Reliable source | Confirmed correct form |
|---|---|---|
| `"amilienname"` | `Familien-/Nachname Ue1`/`Ue2` widget `fieldValue` | `Familienname` |
| `"amilienname zur Zeit der Geburt"` | `Familienname zur Zeit der Geburt` widget's own `alternativeText` | `Familienname zur Zeit der Geburt` |
| `"arbe der Augen"` | (context: an illustrative legend of what appears on the finished card, not a fillable field — see below) | `Farbe der Augen` (eye colour) |
| `"...elder in Blockschrift ausfüllen."` | (general instruction, not a field `sourceRef`) | `Felder` |
| `"...gekennzeichneten "eldes unterschreiben!!!"` | quoted span shortened to end before the artifact in this document's `applicantOrRepresentativeSignature` document entry | `Feldes` |

No field or document `sourceRef` in `schema.json` quotes a string affected
by this artifact: the `gender`/`legalRepresentativeBasis` and all plain
labels above were quoted from either (a) the widget's own reliable
`alternativeText`/field-name metadata, or (b) a text-layer run that this
programmatic cross-check confirmed is unaffected (e.g. `weiblich`,
`männlich`, all three `Gesetzliche Vertretungsbefugnis` option texts).
Where a quoted instruction's continuation would have crossed into an
affected word (the signature instruction), the quoted span was shortened
to end before the artifact and the remainder paraphrased, per this
registry's established practice (`at/bmf` cycle).

The `"Farbe der Augen"` ("eye colour") text is not tied to any AcroForm
widget — positioned in the page's upper-right corner near an illustrative
"EU-Passbild" (photo) callout, it is part of a legend showing what
information appears printed on the *finished* identity card, not a
fillable field on the *application*, and so is not modelled.

## Internal-field-name vs. printed-text disclosures

Two widgets' own internal PDF field names combine or paraphrase what is
actually printed as separate, non-contiguous text runs on the page —
disclosed explicitly in each field's own `description` and `sourceRef`
rather than presented as one contiguous printed phrase:

- `gender`: the page prints the heading `"Geschlecht *)"`, with a separate
  page footnote `"*) Zutreffendes ankreuzen"` ("mark the applicable
  option"); the widget group's own internal field name expands this to
  `"Geschlecht (zutreffendes ankreuzen)"`.
- `heightCm`: the page prints `"Körpergröße"` as a label and `"cm"` as a
  separate unit marker beside the entry box (confirmed at different x/y
  positions in the text layer); the widget's own internal field name
  combines them as `"Körpergröße in cm"`.

## Verbatim-quote cross-check

Every phrase this record or `schema.json` places in single quotation marks
was checked programmatically against a `pdfjs-dist` `getTextContent()`
dump of the entire page (item strings joined with single spaces,
whitespace-collapsed) with a disposable Python script, not by eye.
Representative results (see the font-artifact table above for the
exceptions, all of which were quoted from reliable widget metadata instead
of the affected text-layer run):

| Quote | Result |
|---|---|
| `frühere Namen` / `Vorname(n)` / `akademischer Grad/Standesbezeichnung Ingenieur` / `Geburtsdatum` / `Ort der Geburt` | exact |
| `Hauptwohnsitz (Postleitzahl/Ort/Straße/Hausnummer/Stiege/Türnummer)` / `Zustelladresse (Postleitzahl/Ort/Straße/Hausnummer/Stiege/Türnummer)` | exact |
| `Geburtsurkunde (Ausstellungsbehörde, Zahl, Datum)` / `Heiratsurkunde (Ausstellungsbehörde, Zahl, Datum)` | exact |
| `Nachweis der österreichischen Staatsbürgerschaft (Art des Nachweises, Ausstellungsbehörde, Zahl, Datum)` | exact |
| `Nachweis des akademischen Grades und/oder der Standesbezeichnung Ingenieur` | exact |
| `Identitätsnachweis erbracht durch (Reisepass, amtlicher Lichtbildausweis, Zeuge/Zeugin)` | exact |
| `Datum` / `Name des gesetzlichen Vertreters/der gesetzlichen Vertreterin` / `Ausgewiesen durch (Reisepass, amtlicher Lichtbildausweis)` / `Anschrift` / `weil` | exact |
| `weiblich` / `männlich` | exact |
| `infolge aufrechter Ehe mit dem anderen Elternteil;` | exact |
| `gemäß § 166 ABGB, weil ich die leibliche Mutter bin und bestätige, dass seitens des Gerichts kein anderer gesetzlicher Vertreter oder keine andere gesetzliche Vertreterin für mein Kind bestellt worden ist;` | exact (spans a printed line wrap; joined with a single space, matching the source's own word boundary) |
| `trotz nicht mehr aufrechter Ehe, weil eine gerichtlich genehmigte Vereinbarung oder eine gerichtliche Entscheidung noch nicht vorliegt;` | exact |
| `Gesetzliche Vertretungsbefugnis ist gegeben *)` | exact |
| `Eigenhändige Unterschrift des Dokumenteninhabers/der Dokumenteninhaberin` | exact |
| `Bitte erst vor dem Sachbearbeiter/der Sachbearbeiterin und innerhalb des durch Winkel gekennzeichneten` (quote span shortened before the font-artifact word `Feldes`) | exact |
| `EU-Passbild` | exact |

## Field-count reconciliation

23 fields, reconciled against 34 total / 27 real / 23-after-merge widgets
as detailed above (34 − 7 excluded = 27; 27 − 4 merge-savings = 23). This
arithmetic was checked mechanically by parsing `schema.json` as JSON and
counting `len(schema['fields'])` (23) and `len(schema['documents'])` (2),
not asserted from memory.

## Deliberate scope decisions (disclosed, not silently dropped)

- **The four-way identity-proof branch is not encoded as a `requiredWhen`
  matrix.** oesterreich.gv.at's own "Personalausweis – Neuausstellung"
  page describes four alternative required-document scenarios depending
  on what the applicant already holds (old ID / passport / other official
  photo ID / neither, requiring an identity witness), each pulling in a
  different combination of the `birthCertificateReference`,
  `citizenshipProofReference`, and `identityProofProvidedBy` fields. The
  form itself does not encode this branch as a single field an agent could
  condition on (no "which prior document do you hold" selector widget
  exists), so encoding a precise `requiredWhen` matrix here would assert a
  machine-checkable rule the source does not itself state as one — all
  four reference fields are left optional/required per their own general
  relevance, with the branch disclosed in prose (the same "don't assert an
  expression the grammar can't state precisely" principle as
  `at/bmf`'s `bankBic`).
- **`legalRepresentativeName`/`legalRepresentativeIdProofType`/
  `legalRepresentativeAddress` are optional, not gated by a `requiredWhen`.**
  The form has no separate "this application is for a minor" flag distinct
  from filling in the legal-representative block itself (unlike the
  combined passport/identity-card specimen's own explicit
  "for the following child" checkbox) — so there is no boolean an agent
  could condition on without inventing one not present in the source.
- **`legalRepresentativeBasisOtherDescription`'s `requiredWhen` uses
  `equals: "other"` against its own sibling enum field**, not `notEquals`
  against an optional field's absent/default value — deliberately
  avoiding the `notEquals`-against-an-optional-field bug this registry has
  been bitten by before (an absent/undefined field always satisfies
  `notEquals`, silently misfiring as "always required").
- **No national-identity-number field.** Unlike some other jurisdictions'
  national-ID schemas in this registry, this application form does not
  itself capture or display an existing national identity number; the
  Personalausweis's own number is assigned upon issuance, not chosen or
  entered by the applicant.
- **`declarationDate` captures only the date, not the signature itself.**
  Like every paper-form signature in this registry, a handwritten
  signature cannot be represented as a GovSchema field value; it is
  instead captured structurally via the `documents[]` attestation entry
  (`applicantOrRepresentativeSignature`), matching the established
  convention (e.g. `at/bmf/employee-tax-assessment`'s own
  `declarationDate` + attestation-document pairing).
- **`applicantOrRepresentativeSignature`'s `statement` is a paraphrase of
  a procedural instruction, not an invented accuracy/completeness
  declaration.** Unlike `at/bmf/employee-tax-assessment` (whose source form
  prints an explicit "I confirm all information given is true" clause),
  this identity-card form prints only a procedural instruction to sign in
  person before the caseworker within a marked field — no accuracy
  declaration is printed on this specimen, and none is invented here.
- **Not modelled at all:** the domestic appointment-booking step some
  Passbehörden require; the "Ausweis Erinnerungsservice" (renewal
  reminder) convenience feature mentioned on oesterreich.gv.at; and, as
  noted above, the distinct bilingual combined
  "Antrag auf Ausstellung eines österreichischen Reisepasses oder
  Personalausweises" consular form (a related, open companion-schema
  candidate for a future cycle, alongside the Schengen Visa "Formular C1"
  screened this session — see "Scope and jurisdiction notes").

## Mock conformance test run

Two scenarios were built under
`conformance/at/bmi/national-identity-card-application/1.0.0/` and checked
against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]` grammar with a disposable checker script
(`/tmp/gov-at-verticals/check_conformance.mjs`, not committed — mirrors the
technique used for `at/bmf/employee-tax-assessment`, GOV-2114):

- **`application-packet-adult-first-issuance.json`**: Petra Wagner, adult,
  first-time Personalausweis application at the Passbehörde in Graz, no
  prior ID card, providing her passport as identity proof, no academic
  degree, no name change, not a minor (no legal-representative block).
  **10 fields collected, 13 correctly not-applicable, 0 errors**; both
  required `documents[]` entries (`passportPhoto`,
  `applicantOrRepresentativeSignature`) provided.
- **`application-packet-minor-legal-representative.json`**: an application
  for a 9-year-old child, submitted by the child's mother as legal
  representative under the birth-mother-custody basis (§ 166 ABGB),
  populating `legalRepresentativeName`, `legalRepresentativeIdProofType`,
  `legalRepresentativeAddress`, and `legalRepresentativeBasis:
  birth_mother_custody_section166`. **14 fields collected, 9 correctly
  not-applicable, 0 errors**.
- **Six mutation/negative controls (three per scenario)**, each derived
  from a base scenario with exactly one defect introduced, run through the
  same checker script (`/tmp/gov-at-verticals/check_conformance.mjs`, not
  committed) and each correctly raised exactly one error (confirming the
  checker is not vacuously passing):
  1. Removing the required `firstNames` from scenario 1 →
     `missing-required` error.
  2. Setting `heightCm` to `350` on scenario 1 (violates the `maximum: 300`
     bound) → `range-violation` error.
  3. Setting `gender` to `"unspecified"` on scenario 1 (not in its
     2-option `enum`) → `enum-violation` error.
  4. On scenario 2, forcing `legalRepresentativeBasis` to `"other"` while
     leaving `legalRepresentativeBasisOtherDescription` unset →
     `requiredWhen` conditional-required violation (`missing-required` on
     `legalRepresentativeBasisOtherDescription`), confirming the
     conditional gate actually fires.
  5. Removing the required `passportPhoto` document from scenario 1 →
     `missing-required-document` error.
  6. Removing the required `applicantOrRepresentativeSignature` document
     from scenario 1 → `missing-required-document` error.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass),
and against
`node tools/verify-sources.mjs registry/at/bmi/national-identity-card-application/1.0.0`
(0 warnings, 6 URLs checked, 0 allowlisted).

## Pre-PR re-verification

Immediately before finalizing this record, all four cited URLs were
re-fetched live a second time in this same session, with a realistic
browser User-Agent:

- `oesterreich.gv.at/dam/jcr:97e7a2ac-f901-4956-af98-65e114194c1b/persausw.pdf`
  — HTTP 200, `application/pdf;charset=UTF-8`, 2,036,464 bytes,
  SHA-256-identical to the first fetch.
- `bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/_ANTRAGSFORMULAR_Personalausweis.pdf`
  — HTTP 200, `application/pdf`, 2,036,464 bytes, SHA-256-identical to the
  oesterreich.gv.at copy.
- `bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-identity-card`
  — HTTP 200.
- `oesterreich.gv.at/de/themen/persoenliche_dokumente_und_bestaetigungen/personalausweis/Seite.030100`
  — HTTP 200.

`node tools/verify-sources.mjs registry/at/bmi/national-identity-card-application/1.0.0`
reports all clear (0 warnings) on this same re-verification pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm with the issuing authority which of the four identity-proof
scenarios' document combinations is truly mandatory versus merely
customary, so a precise `requiredWhen` matrix could be proposed as a spec
extension if the current Condition grammar proves insufficient; and
resolve whether the bilingual combined passport/identity-card consular
form (screened and set aside above) should be authored as a distinct,
separate companion schema for missions that use it instead of this
dedicated specimen.

## Scope and jurisdiction notes

Gives Austria (GovSchema's 31st jurisdiction, previously at 2 of its 6
verticals — Business Formation, Taxes) its **3rd of 6 verticals**,
National ID, via this identity-card application document. Passport was
screened this session and found to have a real, usable combined
passport/identity-card candidate (see "Candidate selection" above) —
left as an open, still-viable backlog candidate rather than pursued this
cycle, since only one schema was authored per this registry's
one-deliverable-per-cycle convention. Visa was screened this session and
found to have a real, usable EU-standard "Formular C1" candidate — also
left open. DMV remains a confirmed weak/dead-end candidate from a prior
cycle (in-person/counter-driven, no downloadable specimen).
