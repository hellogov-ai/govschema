# Verification record — at/gewerbebehoerde/trade-licence-registration@1.0.0

## Candidate selection

Austria was the task brief's first-choice candidate. A prior cycle
(documented in `CATALOG.md`'s Known Gaps section) had tried a *regional*
Austrian host, `tirol.gv.at`, and hit a TCP-level connection timeout/reset —
explicitly flagged there as a network/host-specific issue, not a confirmed
bot block or dead end, alongside a same-session failure to reach
`skatteverket.se`. This session re-tried Austria against **federal** hosts
instead, per the brief's suggestion:

| Host | Result |
|---|---|
| `usp.gv.at` (Unternehmensserviceportal) | HTTP 200, reachable |
| `help.gv.at` | HTTP 301 → redirects to `oesterreich.gv.at` (merged), reachable |
| `oesterreich.gv.at` | HTTP 307 → `/de`, then HTTP 200, reachable |
| `bmaw.gv.at` (Ministry for business/economy) | **Unreachable** — `curl` exit code 6/`HTTP 000` on three separate attempts, consistent with the earlier `tirol.gv.at` symptom (a real host-level networking problem in this research environment, not a WAF/CAPTCHA gate) |
| `land-oberoesterreich.gv.at` (Land Oberösterreich, a regional host, screened once `usp.gv.at`'s own explainer page pointed at Land-published PDF forms) | HTTP 200, reachable |

`usp.gv.at` and `oesterreich.gv.at` being reachable (while `bmaw.gv.at`
timed out exactly like `tirol.gv.at` did previously) confirms the prior
cycle's own read: this is a narrow, host-specific network gap in the
research environment, not a blanket block on Austrian government hosts.

## Source

- **Primary (the fillable form):**
  `https://www.land-oberoesterreich.gv.at/Mediendateien/Formulare/Formulare%20Wirtschaft%20und%20Tourismus/LWLD_Wi_E8_Gewerbeanmeldung.pdf`
  — form **LWLD-Wi/E-8**, "Gewerbeanmeldung" ("Stand: Juli 2021" per its own
  footer), a genuine fillable AcroForm PDF (HTTP 200, 476,128 bytes at this
  session's retrieval; PDF header confirmed as `%PDF-1.6`, not an HTML error
  page or a scanned image).
- **Confirmed current edition, not a stale/superseded specimen:** Land
  Oberösterreich's own "Gewerbeausübung" forms index,
  `https://www.land-oberoesterreich.gv.at/27740.htm` (HTTP 200), lists
  **only** this LWLD-Wi/E-8 PDF under "Gewerbeanmeldung" —
  `<strong>Gewerbeanmeldung</strong> <strong class="text-grau">(LWLD-Wi/E-8)</strong>`
  linking directly to the same URL. An older sibling form, LWLD-Wi/E-7
  ("Gewerbeanmeldung Natürliche Person", "Stand: November 2018"), is still
  reachable by direct URL but is **not** linked from this current index page
  — this document deliberately models the current E-8 edition, not the
  superseded E-7 edition (E-8 additionally covers business-entity
  applicants that E-7 does not).
- **Federal corroboration (process description, legal basis, fees,
  competent-authority routing):**
  `https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html` (HTTP 200) —
  Austria's federal Unternehmensserviceportal (USP), the same portal named
  as a candidate in the task brief. Its own footer states
  "Letzte Aktualisierung: 20. März 2026" and "Für den Inhalt
  verantwortlich: Bundesministerium für Wirtschaft, Energie und Tourismus"
  (content responsibility: the federal Ministry for Economy, Energy and
  Tourism, BMWET) — i.e. this is genuinely federal-government-owned content,
  current as of five months before this session.

Both URLs were re-fetched live immediately before this record was written
(see "Pre-PR re-verification" below) and via `node tools/verify-sources.mjs`.

## Why a Land-published PDF, not a single federal PDF

Austria's trade-licence registration is legislated federally (Gewerbeordnung
1994, GewO) but administered by whichever district authority is locally
competent for the trade's premises — the USP page states this plainly:
"Zuständige Stelle ... Die Gewerbebehörde, die für den Gewerbestandort
örtlich zuständig ist: Die Bezirkshauptmannschaft [i]n Statutarstädten: der
Magistrat". There is no single centrally-published fillable PDF; each Land
publishes and hosts its own edition of the same nationally-legislated
process, addressed to its own set of district authorities. This is the
same registry pattern already established for
`de/gewerbeamt/business-registration` (sourced from Hamburg's own edition
of Germany's nationally-standardized GewA 1 form, cross-checked against two
further Länder editions) and is applied here analogously: this document is
scoped to Land Oberösterreich's edition and its 17 district authorities
(`competentAuthority` enum); a filer whose premises sit in a different
Bundesland would use that Land's own edition of the same underlying GewO
process — not modelled in this version.

Unlike the German precedent, no second or third Land's edition of this exact
PDF was cross-checked field-by-field this session (time-boxed to one
session); the federal USP explainer page instead serves as the
process-level corroboration (legal basis, fee-free filing, competent-
authority routing, procedural steps) that this document's structure and
statutory citations are describing the same nationally-uniform process, not
an Upper-Austria-specific quirk. A future cycle cross-checking a second
Land's own LWLD/-equivalent PDF (e.g. Vienna's or Vorarlberg's own edition)
would strengthen this to the same multi-edition-cross-check standard as the
German schema.

## Extraction technique

The PDF's AcroForm layer was extracted with `pdfjs-dist` (`legacy/build/pdf.mjs`),
calling `page.getAnnotations({ intent: "display" })` per page to enumerate
every `Widget` annotation (name, field type, rect, radio/checkbox flags,
`Ch` dropdown options) and `page.getTextContent()` to extract the
surrounding prose (section headings, instructions, the Beilagen/attachments
checklist, and the two declaration texts) for cross-reference.

- **101 total AcroForm widgets** across the PDF's 8 pages (27, 30, 22, 0, 4,
  3, 15, 0 per page respectively).
- **5 are non-data controls**, excluded from the field model: a help popup
  ("Hinweise zur Nutzung von PDF-Formularen"), a convenience "copy address"
  button ("Adresse übernehmen") and its associated scratch text field
  ("Adresse", a free-text box the button copies into the structured
  Straße/Nummer/PLZ/Ort fields — not itself part of the submitted data), and
  two form-utility buttons ("Formular zurücksetzen 2", "Formular drucken 2").
- The remaining **96 real data widgets** map onto this document's **86
  fields**. The gap is fully accounted for by 10 places where 2-4 widgets
  sharing one PDF field name make up a single radio-button or checkbox
  group; each such group was modelled as **one** `enum` or `boolean` field
  (never as independent unconstrained booleans — the mismodeling this
  registry has been burned by before, e.g. GOV-1070's SE work-permit radio
  group). The 10 groups: `1.3`/`4.4` "Hauptwohnsitz seit 5 Jahren" (2
  widgets → 1 boolean each, ×2 = saves 2), `1.4` Firmenbucheintrag (3
  widgets → 1 enum, saves 2), `2.1` Unternehmensart (4 widgets → folded into
  the top-level `applicantCategory` enum alongside the implicit
  natural-person branch, saves 3), `3.2` Industriebetrieb (2 widgets → 1
  boolean, saves 1), `3.3` Gewerbeart (2 widgets → 1 enum, saves 1), `4.1`
  Geschäftsführung-Bestellung (2 widgets → 1 enum, saves 1). Total savings:
  10, so 96 − 10 = 86. This arithmetic was checked mechanically (a Python
  build script asserts `len(fields) == 86` against the actual widget dump,
  not asserted from memory).
- Three `Ch` (dropdown/choice) widgets carry an explicit `options` array in
  the extraction output: `Auswahl Bezirksverwaltungsbehörde` (17 named
  district authorities, modelled as `competentAuthority`) and the three
  `Geschlecht` (gender) dropdowns on pages 1, 3, and 7 (each offering
  'männlich' / 'weiblich' / 'keine Angabe' — modelled as
  `naturalPersonGender` / `managingDirectorGender` /
  `influentialPersonGender`, each `enum: [male, female, unspecified]`).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Page 1 dropdown, addressee stamp | `competentAuthority` |
| Section 1 heading + branch instruction, Section 2.1 Unternehmensart | `applicantCategory` |
| 1.1 Persönliche Daten | `naturalPersonFirstName` … `naturalPersonBirthPlace` (9 fields) |
| 1.2 Kontaktdaten | `naturalPersonEmail`, `naturalPersonPhone`, `naturalPersonMobile` |
| 1.3 Wohnsitz | `naturalPersonAddressStreet` … `naturalPersonMainResidenceFiveYears` (5 fields) |
| 1.4 Firmenbucheintrag | `naturalPersonCommercialRegisterStatus`, `naturalPersonCommercialRegisterName`, `naturalPersonCommercialRegisterNumber` |
| 2.1 Unternehmensdaten | `entityName`, `entityLegalForm`, `entityRegisterNumber` |
| 2.2 Kontaktdaten | `entityEmail`, `entityPhone`, `entityMobile` |
| 2.3 Standort | `entityAddressStreet` … `entityAddressCity` (4 fields) |
| 2.4 Vertretungsbefugtes Organ | `entityRepresentativeFirstName` … `entityRepresentativeSocialSecurityNumber` (5 fields) |
| 3.1-3.4 Angaben zum Gewerbe | `tradeDescription`, `isIndustrialOperation`, `tradeCategory`, `earliestEffectiveDate`, `premisesAddressStreet` … `premisesLocationDescription` (9 fields) |
| 4.1 Bestellung | `managingDirectorBasis` |
| 4.2-4.4 Geschäftsführung Persönliche/Kontakt/Wohnsitz-Daten | `managingDirectorFirstName` … `managingDirectorMainResidenceFiveYears` (18 fields) |
| 5. Anmerkungen | `remarks` |
| Page 5 signature block | `applicationSignaturePlace`, `applicationSignatureDate` |
| Anhang 1 bullet 9 + signature block | `managingDirectorWeeklyHours`, `managingDirectorDeclarationPlace`, `managingDirectorDeclarationDate` |
| Anhang 1 bullets 1-8 | `documents[].managingDirectorDeclarationSection39` (attestation) |
| Anhang 2 "Angaben zur Person mit maßgeblichem Einfluss" + signature block | `influentialPersonFirstName` … `materialInfluenceDeclarationDate` (15 fields) |
| Anhang 2 bullets 1-8 | `documents[].declarationOfNoExclusionGrounds` (attestation) |
| Page 4/5 Beilagen checklist, items 1, 2, 15 | `documents[].applicantIdentityDocument`, `capabilityProof`, `managingDirectorIdentityDocument` |
| usp.gv.at "Rechtsgrundlagen" | `§§ 13, 39, 333a, 339-348 GewO 1994` cited in `title`/`description`/`source.documentRef` |
| usp.gv.at "Kosten" | "Es sind keine Stempelgebühren und Bundesverwaltungsabgaben zu entrichten" — no `payment` document modelled, disclosed below |

Every `sourceRef` on every field cites the exact widget field name printed
in the extraction dump (e.g. `"1.1 Vorname"`, `"4.2 Dienstgebernummer"`),
which is itself the PDF's own internal field identifier — the strongest
form of source fidelity available for an AcroForm, short of a screenshot.

## Quoted phrases — verbatim cross-check

Every phrase this record or `schema.json` places in quotation marks was
grepped against the raw `pdfjs-dist` text extraction
(`getTextContent()` output, saved to a scratch file) or the raw
`usp.gv.at` HTML (fetched via `curl`, tags stripped, whitespace collapsed)
immediately before this record was finalized:

| Quote | Found verbatim in |
|---|---|
| "Befindet sich der Hauptwohnsitz seit mind. 5 Jahren in Österreich?" | PDF text |
| "Die Gewerbeanmeldung erfolgt für die Ausübung in Form eines Industriebetriebes" | PDF text |
| "Anmeldung soll frühestens wirksam werden mit" / "wenn gewünscht" | PDF text |
| "Nähere Bezeichnung des Standortes" / "wenn die Angabe einer Straße oder Hausnummer nicht möglich ist" | PDF text |
| "Als gewerbeberechtigte Geschäftsführung ist bestellt" | PDF text |
| "Ich werde mich im Betrieb mit" / "Stunden wöchentlich betätigen" / "nur Unternehmen" | PDF text |
| "Angaben zur Person mit maßgeblichem Einfluss" / "nur auszufüllen für Unternehmen" | PDF text |
| "Diese Erklärungen gelten auch für den das Gewerbe anmeldenden Rechtsträger" | PDF text |
| "Zuständige Stelle" / "Die Bezirkshauptmannschaft" / "In Statutarstädten" / "der Magistrat" | usp.gv.at |
| "Es sind keine Stempelgebühren und Bundesverwaltungsabgaben zu entrichten" | usp.gv.at |
| "Letzte Aktualisierung: 20. März 2026" | usp.gv.at |
| `<strong>Gewerbeanmeldung</strong> <strong class="text-grau">(LWLD-Wi/E-8)</strong>` | land-oberoesterreich.gv.at/27740.htm raw HTML |

One near-miss, corrected before it shipped: an early draft of
`applicantCategory`'s `description` quoted the PDF's own branch instruction
sentence directly ("Wenn Sie diesen Antrag nicht als natürliche Person
stellen: weiter zu Punkt 2"). The raw text-layer extraction actually reads
`"Wenn Sie diesen Antrag   nicht   als natürliche Person stellen: weiter
zu   Punkt 2"` — extra inter-word spaces, an artifact of how `pdfjs-dist`
spaces out bold/regular text runs within the same sentence. Rather than
either (a) keeping a quote that doesn't match the raw extraction
byte-for-byte, or (b) silently "fixing" the spacing and presenting it as a
verbatim quote, the description was rewritten as a paraphrase with no
quotation marks, and `sourceRef` now says so explicitly ("paraphrased here
due to PDF text-extraction spacing artifacts"). The two long declaration
texts (Anhang 1 §39, Anhang 2 §13) have the same kind of artifact at a
handful of line-wrapped hyphenated words (e.g. "maßge -  bender" for
"maßgebender", "erforder -  lichen" for "erforderlichen") — for the same
reason, `documents[].statement` on both attestations is written as a
faithful English translation of the German bullets (matching the existing
convention already used for `se/bolagsverket/aktiebolag-formation`'s own
`declarationStatement`/`signerHandwrittenSignature` documents, which are
themselves English renderings of a non-English source), not a claimed
byte-exact transcription of the original German.

## Deliberate scope decisions (disclosed, not silently dropped)

- **Single Land, not all nine.** This version models Land Oberösterreich's
  own edition and its 17 district authorities only. A filer with premises
  in another Bundesland uses that Land's own PDF of the same GewO process —
  a real, open, easy fast-follow candidate for a future cycle (mirroring
  how `de/gewerbeamt/business-registration` cross-checked three Länder
  editions of one nationally-standardized form; this version does not reach
  that same multi-edition bar).
- **`applicantCategory` is a GovSchema-synthesized top-level selector**, not
  a single checkbox on the source — it merges the implicit "you're filing
  Section 1" natural-person default with the 4-way `2.1 Unternehmensart`
  checkbox group, since the source form itself expresses the choice as
  "which section did you fill in", not one dedicated field. Disclosed in
  the field's own `description`.
- **`managingDirectorBasis` used as its own gate**, rather than adding a
  separate synthetic yes/no "is a managing director appointed" field: the
  source's own `4.1` field is already a 2-option selector that is simply
  left blank when no managing director is appointed, so `requiredWhen`
  conditions on Section 4's other fields test `managingDirectorBasis`'s
  membership in `[employee, authorized_representative]` directly. An absent/
  unanswered enum field correctly evaluates as not `in` that list, so this
  avoids the `notEquals`-against-an-absent-field footgun this registry has
  hit before (`notequals-empty-string-absent-field-bug` in project memory) —
  `in`/`equals` against concrete values, never `notEquals ""`, gates every
  conditional field in this document.
- **`capabilityProof`'s exemption is not encoded as a `requiredWhen`.** The
  source's own proviso — "entfällt bei freien Gewerben bzw. bei Bestellung
  einer gewerbeberechtigte Geschäftsführung" (not needed for an unrestricted
  trade, or when a trade-law-responsible managing director is appointed) —
  spans two fields (`tradeCategory` and `managingDirectorBasis`) in a
  plain-language exemption, and this document leaves the document as
  `required: false` with the condition described in prose (`handling`)
  rather than asserting a compound expression that might not exactly match
  how the authority actually applies the exemption in practice. Disclosed
  as a known simplification, not silently dropped.
- **`influentialPerson*` fields are optional even though visible for every
  entity applicant.** Anhang 2's "Angaben zur Person mit maßgeblichem
  Einfluss" block is captioned "nur auszufüllen für Unternehmen" (only for
  businesses) but the paper form provides exactly **one** such row, while a
  real entity can have several persons of material influence (the Beilagen
  checklist for entities lists four distinct categories: the representative
  organ, a controlling shareholder, an unlimited personally-liable partner,
  and other influential persons e.g. of a parent company). Rather than
  invent an unbounded repeating-row convention this spec's field `type`
  enum does not support (no `array` type exists in `spec/v0.3` — see
  `$defs.field.properties.type`), these fields are left optional with the
  limitation disclosed, matching this registry's established pattern for
  single-row paper forms describing a potentially-multiple real-world
  relationship (e.g. `is/skatturinn/simplified-individual-tax-return`'s
  numbered `employer1`/`employer2` fields for its own bounded-row limit).
  The declaration itself (`documents[].declarationOfNoExclusionGrounds`)
  remains unconditionally `required: true` regardless, since bullet 7 of its
  own text states the declaration binds "den das Gewerbe anmeldenden
  Rechtsträger" (the trade-registering legal entity) even when no distinct
  person of material influence is separately named.
- **No `payment` document.** usp.gv.at states directly: "Es sind keine
  Stempelgebühren und Bundesverwaltungsabgaben zu entrichten" (no stamp
  duties or federal administrative fees are payable) — this process is
  fee-free per the federal source, unlike most other Business Formation
  schemas in this registry, so no `documents[]` entry of category
  `payment` exists here. This is a confirmed absence, not an oversight.
- **Not modelled at all:** the online GISA-Express e-service and ID Austria
  electronic-authentication channel (usp.gv.at's "Authentifizierung und
  Signatur" section lists both as alternatives to the paper/PDF channel this
  document sources); the Betriebsanlagengenehmigung (business-premises
  licensing) procedure that some trades additionally require; appeal to the
  Landesverwaltungsgericht against a negative decision; and the exhaustive,
  largely circumstance-specific Beilagen items beyond the four `documents[]`
  entries modelled (EEA/third-country residence titles, insurance-
  intermediation-specific proofs, foreign-registration particulars, EU-
  establishment notifications) — these are all real, out-of-scope
  candidates for a future MINOR version, not silent gaps.

## Pre-PR re-verification

Immediately before opening the PR, both cited URLs were re-fetched live a
second time in this same session (beyond the initial retrieval) with a
realistic browser User-Agent:

- `land-oberoesterreich.gv.at/Mediendateien/.../LWLD_Wi_E8_Gewerbeanmeldung.pdf` — HTTP 200.
- `usp.gv.at/gruendung/EAP/gewerbeanmeldung.html` — HTTP 200.
- `land-oberoesterreich.gv.at/27740.htm` — HTTP 200, still lists only the E-8 edition.

`node tools/verify-sources.mjs registry/at/gewerbebehoerde/trade-licence-registration/1.0.0`
reports all clear (0 warnings). Every quoted phrase in this record was
re-grepped against the same-session extraction files, not against memory of
an earlier fetch (see the table above).

## Test run

Two mock scenarios were built against the schema's own 86-field/5-document
model with a disposable checker script
(`/tmp/atschema/check_conformance.mjs`, not committed — mirrors the
technique used for `is/skatturinn/simplified-individual-tax-return`,
GOV-2084) that: (1) confirms every field appears exactly once across
`collectedValues`/`notApplicableFields`; (2) evaluates every field's
`visibleWhen`/`requiredWhen` condition (the shared `all`/`any`/`not`/
`equals`/`notEquals`/`in` grammar) against the scenario's collected values
and flags any required-but-missing field; (3) checks every collected
value's `enum`/`pattern`/`minLength`/`maxLength`/`minimum`/`maximum`
constraint; (4) evaluates each `documents[]` entry's `required`/
`requiredWhen` against the scenario's document-provided flags.

- **Scenario A** (`conformance/at/gewerbebehoerde/trade-licence-registration/1.0.0/application-packet-natural-person.json`):
  Maria Huber, an Austrian citizen resident in Linz for over 5 years,
  registers a new unrestricted retail trade at her own home address,
  personally holding the trade's requirements (no managing director
  appointed). **26 fields collected, 60 correctly not-applicable, 0
  errors** across all 86 fields; both required `documents[]` entries
  (`applicantIdentityDocument`, `declarationOfNoExclusionGrounds`)
  satisfied.
- **Scenario B** (`.../application-packet-business-entity.json`):
  Alpenblick Handels GmbH, represented by Thomas Gruber, registers a
  regulated electrical-installation trade in Vöcklabruck, appointing an
  employee, Sabine Wimmer, as the trade-law-responsible managing director.
  **40 fields collected, 46 correctly not-applicable, 0 errors**; all three
  required `documents[]` entries for this branch
  (`managingDirectorIdentityDocument`, `declarationOfNoExclusionGrounds`,
  `managingDirectorDeclarationSection39`) satisfied.
- **Five mutation/negative controls**, each derived from Scenario A or B
  with exactly one defect introduced, each correctly raised exactly one
  error (confirming the checker is not vacuously passing):
  1. Removing the required `naturalPersonLastName` → `missing-required` error.
  2. Setting `naturalPersonAddressPostalCode` to `"AB12"` (violates the
     4-digit `pattern`) → `pattern-violation` error.
  3. Setting `tradeCategory` to `"some_other_category"` (not in its `enum`)
     → `enum-violation` error.
  4. In Scenario B (managing director appointed), removing
     `managingDirectorFirstName` → `missing-required` error, confirming the
     `requiredWhen` conditional gate on Section 4's fields actually fires,
     not just Section 1/3's unconditional `required: true` fields.
  5. Removing the `declarationOfNoExclusionGrounds` document from Scenario
     A's `documents[]` → `missing-required-document` error.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass, both
against the full registry of 327 documents including this one, and
individually against this document's own path), and against
`node tools/verify-sources.mjs` (see above).

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: cross-check a second Land's own edition of this same GewO process
field-by-field (matching the three-edition standard already set by
`de/gewerbeamt/business-registration`); confirm with Austria's own GISA
system documentation (not screened this session) exactly which fields the
electronic GISA-Express channel treats as mandatory versus this paper
form's own conventions; and resolve the `capabilityProof`/
`influentialPerson*` scope simplifications disclosed above against a
primary source that states the exemption/multiplicity rules more precisely
than this session found.

## Scope and jurisdiction notes

Opens **Austria as a new jurisdiction** in the registry (the 31st), with
**1 of its 6 verticals** modelled — Business Formation, via this trade-
licence-registration document. Austria's other five verticals (Passport,
DMV, Taxes, Visa, National ID) are open, unscreened backlog candidates for
a future cycle.
