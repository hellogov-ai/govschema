# Verification record — no/skatteetaten/notification-of-move-within-norway@1.0.0

## Candidate selection

GOV-2323 ("GovSchema Standard Research") is the latest firing of this
registry's recurring standard-research routine. CATALOG.md's own "Known
Gaps & Opportunities" section (item 8) had already pre-scouted three
open Norway candidates from the GOV-2316 parent cycle (Business Formation
opened Norway as the registry's 35th jurisdiction), each confirmed to have
a live, unauthenticated, directly-downloadable form:

- **National ID**: Skatteetaten's RF-1400B, "Flyttemelding" (move
  notification), ~63 widgets (pre-scout estimate).
- **DMV**: Statens vegvesen's driving-licence application, ~82 widgets.
- **Visa**: UDI's form GP7028, ~328 widgets, disclosed by the pre-scout as
  UDI's legacy/paper fallback rather than its primary online-portal path.

RF-1400B was picked: it is the smallest and most tightly-scoped of the
three, closes Norway's National ID & Civic Documents vertical (Norway's
actual national ID card is an in-person/biometric-issuance process with no
downloadable application form — this civil-registration-of-address-change
form is the closest analogue, the same pattern this registry's
`fi/dvv/registration-of-foreigner` precedent established for Finland), and
needed no further live-portal-vs-paper-fallback question mark the way
GP7028 did.

## Source

- **URL:** `https://www.skatteetaten.no/globalassets/skjema/alltid/rf1400b-flytte-i-norge.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `238,950` bytes, genuine `%PDF` header, served via Cloudflare with no
  login/CAPTCHA/WAF gate.
- **Edition:** the form's own footer prints "RF1400B - 2019" on both pages
  (the 2019 edition, currently the live download as of this cycle).

## Extraction technique

`pdfjs-dist` v3.11.174 (`legacy/build/pdf.js`, installed fresh to a
disposable `/tmp` directory) was used via `page.getAnnotations()` per page:

- **Page 1: 43 Widget annotations** (40 `Tx` text fields, 2 `Btn` checkbox
  fields for the street/property address-type choice, all with
  self-documenting Norwegian `fieldName`s — no generic/sequential names on
  this specimen).
- **Page 2: 18 Widget annotations** (15 `Tx` text fields, 3 `Btn` checkbox
  fields for the identification-type choice).
- **61 widgets total**, close to but not identical to the GOV-2316
  pre-scout's own approximate figure of ~63 — a quick-scout estimate, not
  a discrepancy requiring reconciliation.

`page.getTextContent()` was also extracted per page and read in full to
recover the form's own section lettering (A through I) and every printed
instruction, confirming the semantic grouping used below.

## Field mapping (61 widgets → 55 fields + 1 documents[] entry)

The 61 raw widgets were consolidated into 55 schema fields via three
disclosed, source-justified collapses (all following this registry's own
established precedent for multi-widget/single-concept forms, e.g.
`dk/cpr/notification-of-entry`'s single boolean from a Ja/Nej checkbox
pair):

1. **Move date** (`Dag`/`Måned`/`År`, 3 widgets) → single `moveDate` date
   field, matching this registry's own `dk/cpr` `entryDate` precedent.
2. **Address-type choice** (`Gateadresse (fyll ut adresse D)` /
   `Stedsadressegårds og bruksnummer fyll ut adresse E`, 2 Btn widgets) →
   single `addressType` enum field (`street` / `property`), gating the
   street-address block (section D) and property-address block (section
   E) via `visibleWhen`/`requiredWhen`, since the form's own instruction
   text ("Velg én" — "Choose one") and the mutually-exclusive D/E layout
   make clear this is a single either/or choice, not two independent
   questions.
3. **Identification-type choice** (`Kopi av pass` / `Kopi av førerkort` /
   `Kopi av annen legitimasjon som inneholder`, 3 Btn widgets) → single
   `documents[]` entry (`identificationCopy`, category
   `identity-document`) with an `acceptedTypes` array, following this
   registry's own `mx/sre/passport-application` precedent for a
   checkbox-selection group of acceptable ID-document types.

Every other widget maps one-to-one to a schema field. The repeating
"Hvem melder du flytting for?" table (up to 7 rows, each a Navn +
Fødselsnummer pair) is modelled with this registry's established bounded
repeating-group convention (`movingPersonN...`, matching `dk/cpr`'s
`entrantN...` and `fi/migri`'s equivalent pattern): only `movingPerson1`'s
two fields are `required: true` (the form is always reporting a move for
at least one person); `movingPerson2` through `movingPerson7` are all
optional, with no `visibleWhen`/`requiredWhen` chaining between rows —
matching the `dk/cpr` precedent exactly, since the source form imposes no
such sequencing rule itself (a sender could, in principle, leave row 2
blank and fill row 3, though the form's own top-to-bottom layout makes
that unlikely in practice).

The two mailing-address blocks (section G — domestic-in-Norway vs.
foreign) are each modelled as fully optional field groups. Unlike the
addressType choice in section B, the source form has **no dedicated
choice widget** distinguishing "domestic" from "foreign" mailing address —
its own instruction text just says to fill in one block or the other. This
schema discloses that mutual exclusivity in each field's own `description`
rather than inventing a synthetic choice field or a `crossFieldValidation`
rule not backed by an actual source widget, consistent with this
registry's "spec precision over cleverness" convention of not modelling
structure the source form itself does not express.

The signature widget itself (`Underskrift(-er)`, printed in section I) has
**no corresponding AcroForm field** on this specimen — a wet-ink/physical
signature line, not a fillable widget — so no schema field models it,
matching the same absence in this registry's `dk/cpr` and `dk/um`
precedents. The form's own confirmation clause ("Jeg/vi bekrefter at
informasjonen i skjemaet er riktig") is modelled as an `attestation`
category `documents[]` entry instead, with the exact clause text preserved
verbatim in `statement`.

## Conformance run

Two mock scenarios were authored with valid synthetic (non-real) data and
checked against a disposable checker script that evaluates every field's
`required`/`requiredWhen`/`visibleWhen`/`validation` (pattern, enum,
maxLength, date format) **and** every `documents[]` entry's
`required`/`requiredWhen` — the latter specifically because a prior cycle
on this registry (`fi/migri/residence-permit-employed-person`, GOV-2280/
GOV-2282) found that a disposable checker limited to `fields[]` alone can
report a false "0 errors" on a schema with unconditionally-required
documents:

- `single-person-street-address-minimal.json` — one sender, one moving
  person, the street-address path (section D), no mailing-address
  override. **0 errors.**
- `joint-family-property-address-with-foreign-mailing.json` — two joint
  senders, three moving persons (a couple plus a child), the
  property-address path (section E, gårdsnummer/bruksnummer), and a
  foreign mailing address filled in (section G). **0 errors.**

Both fixtures also pass `node tools/validate.mjs` and
`node tools/validate-ajv.mjs` (structural + meta-schema conformance) for
the schema document itself; `registry-index.json` was regenerated via
`npm run build-index` and the full registry re-validated at 354/354
documents passing (up from 353 before this addition).

## Disclosed judgment calls

- **Bruksenhetsnummer fields** (`newStreetUnitNumber`,
  `propertyUnitNumber`, `mailingDomesticUnitNumber`) are left optional in
  every case, even though the form's own footnote states it must be filled
  in whenever the building has more than one dwelling — a condition this
  schema has no other field to test against (no unit/dwelling-count field
  exists on the form itself), so it is disclosed in each field's own
  description rather than enforced structurally, matching this registry's
  established pattern for conditions the source form states in prose but
  provides no gating field for (e.g. `fi/dvv`'s `maritalStatus`).
- **Mailing-address mutual exclusivity** (domestic vs. foreign) is
  disclosed in prose, not a `crossFieldValidation` rule, since no source
  widget expresses the choice structurally (see "Field mapping" above).
- **`fødselsnummer` pattern** (`^[0-9]{11}$`) follows Norway's standard
  11-digit personal-identity-number format (6-digit date of birth + 5-digit
  personal number), consistent with this registry's existing Nordic
  precedents' own national-identity-number patterns (e.g. Denmark's
  10-digit CPR-nummer, Finland's henkilötunnus format).
