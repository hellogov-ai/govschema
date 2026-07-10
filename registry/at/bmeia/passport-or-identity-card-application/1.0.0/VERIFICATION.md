# Verification record — at/bmeia/passport-or-identity-card-application@1.0.0

## Candidate selection

This session's brief was to deepen Austria (GovSchema's 31st jurisdiction,
currently at 3 of 6 verticals — Business Formation, Taxes, National ID, via
GOV-2107/GOV-2114/GOV-2121) into its Passport vertical (4/6). DMV was
screened in a prior cycle and confirmed weak (Kfz-Zulassung is
in-person/counter-driven with no downloadable specimen) and was not
re-screened here. The prior GOV-2121 cycle had already screened Austria's
Passport candidate and confirmed it real and usable: a bilingual German/
English 2-page, 42-widget combined "Antrag auf Ausstellung eines
österreichischen Reisepasses oder Personalausweis" (Application for an
Austrian passport or identity card) fillable-AcroForm PDF, hosted in
BMEIA's own central "Allgemein/Formulare" forms library. This session
re-verified that screening from scratch (fresh fetch, fresh `pdfjs-dist`
extraction, independent field-count reconciliation) rather than trusting
the prior cycle's numbers, and authored this document from it.

## Source

- **Primary:**
  `https://www.bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/Antrag_Reisepass_Personalausweis_Deutsch-Englisch.pdf`
  — fetched with a browser User-Agent: HTTP 200, `content-type:
  application/pdf`, exactly **292,446 bytes**
  (SHA-256 `a54c77ef3bae9ace86a40bf8dcdfb8887c871eec64cbd16ce50d14bd541dcf56`),
  a genuine fillable AcroForm PDF, 2 pages. This is BMEIA's own central
  "Allgemein/Formulare" (General Forms) library host — the same
  central-vs-mission-copy provenance precedent already established by the
  sibling `at/bmi/national-identity-card-application` schema (GOV-2121).
- **Corroborating (applicant-facing context, passport):**
  `https://www.bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-passport`
  (HTTP 200) — a live Austrian embassy citizen-services page confirming:
  all applicants, including children and infants, must be personally
  present when applying; fingerprints are captured for all new passports
  except for children up to 12 and emergency passports; postal
  applications cannot be processed; passports are generally valid 10
  years; and a detailed, jurisdiction-consistent list of supporting
  documents (birth certificate, proof of citizenship, proof of current
  residence, a recent passport photo, proof of not having acquired another
  citizenship, and — if applicable — proof of loss/theft of a previous
  passport).
- **Corroborating (applicant-facing context, identity card):**
  `https://www.bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-identity-card`
  (HTTP 200) — confirms an identity card may be used instead of a passport
  within the EU/Schengen area, serves as proof of Austrian citizenship and
  identity, and that "the same documents are required for applying for an
  identity card as for applying for a passport."

**Mission-variant note (screened, not chased further, per this session's
brief):** the Canberra embassy's own passport page in fact names its own
locally-numbered forms ("Reisepassantrag Erwachsene" / "Personenstandserklärung
Erwachsene" for adults; "Reisepassantrag Minderjährige" / "Personenstandserklärung
Minderjährige" for minors) rather than this session's central bilingual
combined PDF by name, and the Canberra identity-card page instead links a
*different* central PDF — BMEIA's dedicated single-page Personalausweis-only
form already modelled as `at/bmi/national-identity-card-application`
(`file:260935` on that page, matching the `_ANTRAGSFORMULAR_Personalausweis.pdf`
specimen cited in that sibling's own VERIFICATION.md). This confirms the
"individual Austrian missions publish their own bespoke local variants"
pattern flagged in this issue's brief: at least one mission (Canberra)
appears to route passport applicants to its own locally-numbered forms and
identity-card applicants to the *other*, dedicated central PDF, rather than
to this session's combined bilingual specimen. The combined
`Antrag_Reisepass_Personalausweis_Deutsch-Englisch.pdf` specimen used here
is nonetheless a real, live, currently-hosted document directly in BMEIA's
own central forms library (not a mission's own subfolder, not a third-party
mirror), consistent with this registry's practice of preferring a central
specimen — its use by a given mission on a given day was not further
chased, per this issue's explicit instruction not to pursue mission
variants beyond noting them.

All URLs above were re-fetched live a second time in this same session
immediately before this record was finalized (see "Pre-PR re-verification"
below); the PDF's byte length and SHA-256 were identical both times.

## Extraction technique

The PDF's AcroForm layer was extracted with `pdfjs-dist` v3.11.174
(`legacy/build/pdf.js`, loaded via `createRequire`), calling
`page.getAnnotations({ intent: "display" })` to enumerate every `Widget`
annotation per page, `doc.getFieldObjects()` to group widgets by their true,
distinct PDF field name (confirming whether any widgets share a field name
— the defining test for a genuine PDF radio-button group), and
`page.getTextContent()` (with each item's `transform[4]`/`transform[5]` x/y
coordinates preserved) to reconstruct the surrounding prose and labels by
position.

- **42 total AcroForm widgets** (33 on page 1, 9 on page 2).
- `getFieldObjects()` returns **42 distinct field-name keys** — i.e. no two
  widgets in this document share a field name anywhere. Every `Btn`
  (checkbox-type) widget's own `radioButton` flag is `false` (confirmed
  across all 20 `Btn` widgets, individually printed and grep-counted, not
  eyeballed). **This document contains zero genuine PDF radio-button
  groups** — a materially different structure from this registry's sibling
  `at/bmi/national-identity-card-application` (2 genuine radio groups) and
  a more general finding than this issue's brief anticipated (the brief
  flagged only the document-type selector as independent/non-grouped;
  every multi-option selector on this specimen turns out to share that
  same non-grouped structure — self-vs-child, gender, existing-passport
  status, lost-vs-stolen, and the 7-option legal-representation basis).
- **Zero widgets were excluded as non-data controls.** Unlike this
  registry's prior AT cycles (`at/bmi`: 7 of 34 excluded; `at/bmf`: 15 of
  90; `at/gewerbebehoerde`: 5 of 101), a widget-by-widget review of all 42
  found none whose own default value duplicates a printed heading, none
  near-zero-area, and none carrying only a footer reference code or
  page-count stamp. Every widget maps onto genuine, distinct applicant
  data. **42 widgets → 42 fields, with zero merges and zero exclusions.**
  This was checked mechanically (`len(schema['fields'])` after parsing
  `schema.json` as JSON), not asserted from memory.

### Modelling the non-grouped checkboxes (the issue's flagged wrinkle, generalized)

Per this issue's explicit instruction to model non-grouped checkboxes
honestly rather than forcing a radio-group shape they don't have, every
multi-option selector below is modelled as **independent optional boolean
fields**. Where real-world mutual exclusivity is evident (even though the
PDF itself does not enforce it structurally), a GSP-0013 `exclusivityGroups`
entry is declared — the same mechanism, and the same disclosed-in-`description`
convention, already used by this registry's `us/uscis/employment-authorization-i765`
schema for its own non-grouped `applicantCanReadEnglish`/`usedInterpreter`
pair:

| Selector | Widgets | Fields | `exclusivityGroups`? | Why / why not |
|---|---|---|---|---|
| Document type (Notpass / weiterer Reisepass / Personalausweis) | 3, independent | `emergencyPassportRequested`, `additionalPassportRequested`, `identityCardRequested` | **No** | An applicant may legitimately request more than one document type in one filing (e.g. an emergency passport now, plus a standing identity-card application) — this is the literal wrinkle flagged in the issue brief, and is left ungrouped for that reason. |
| Applicant-vs-named-child | 2, independent | `applicationForSelf`, `applicationForNamedChild` | Yes (`who_the_application_is_for`) | A single filing is for one document holder — either the adult signing, or one named child — not both. |
| Gender | 2, independent (PDF field names `undefined`/`undefined_2`, no shared name, `radioButton:false`) | `genderFemale`, `genderMale` | Yes (`gender`) | Real-world mutual exclusivity, but — unlike the sibling `at/bmi` schema's true 2-option radio group — this pair is **not** a PDF radio group; modelled as independent optional booleans plus a disclosed exclusivity group, not forced into a single `enum`. |
| Existing-passport status | 2, independent | `hasNoPassportYet`, `hasExistingPassport` | Yes (`existing_passport_status`) | An applicant either already holds a passport or does not. |
| Lost vs stolen | 2, independent | `previousDocumentLost`, `previousDocumentStolen` | Yes (`lost_or_stolen`) | A specific prior document is reported as one or the other, not both. |
| Legal-representation basis (page 2, minor branch) | 7, independent | `legalBasisMarriageWithOtherParent`, `legalBasisBirthMotherCustodySection177`, `legalBasisGuardianshipCourtDecision`, `legalBasisOtherParentDeceased`, `legalBasisOtherParentWhereaboutsUnknown`, `legalBasisGuardianWrittenConsent`, `legalBasisOther` | Yes (`legal_representation_basis`) | Exactly one statutory/factual basis applies to a given legal representative. |

### Position-based field attribution (no font-extraction artifact found)

A specific font-encoding bug (dropped letters, e.g. "F") was found and
disclosed in the sibling `at/bmi/national-identity-card-application`
cycle. This specimen's text layer was checked for the same class of bug
with a disposable grep for truncated German words expected to appear
verbatim in this form (`amilie`, `eld`, `arbe`, `assbild`, `assport`) —
**no matches were found; no font-artifact was detected in this
specimen.** This was a deliberate check, not an absence-of-evidence
assumption.

However, several `Text1`–`Text12` widgets in this PDF carry **no**
`/TU` alternate-text tooltip of their own (pdfjs reports an empty string),
unlike the form's other, fully self-describing widgets (e.g.
`"Familienname  Surname max 33 Zeichen  characters"`). These were
attributed to their nearest printed label by comparing each widget's own
`rect` (x/y bounding box) against the `getTextContent()` item positions
recovered from the same page, not by widget name. Each such attribution is
disclosed in the corresponding field's own `description` in `schema.json`:

- `Text1` → `heightCm` (positioned between the `"Körpergröße / Height"`
  label and the `"cm"` unit marker printed immediately after it).
- `Text2` → `phone` (positioned under `"TELEFON / PHONE"`, immediately
  left of the differently-named widget that is actually the email field
  — see next item).
- The widget whose own internal field name is `"TELEFON  PHONE EMAIL"` →
  `email` (its rect starts immediately after the printed `"E-MAIL"` label
  and contains the printed `"@"` hint character within its bounds; its own
  internal name misleadingly combines both neighbouring labels even
  though it is positioned under only one of them — disclosed rather than
  presented as a single contiguous printed phrase).
- `Text3`/`Text4`/`Text5` → `addressLine1`/`addressLine2`/`addressLine3`
  (three stacked full-width blank lines under the single heading
  `"Adresse / Permanent residence:"`, with no further sub-labels of their
  own — matching this registry's established bounded-repeatable-line
  convention, e.g. the sibling `at/bmi` schema's `surnameLine1`/`surnameLine2`).
- `Text6` → `lossOrTheftDetails` (positioned directly under
  `"Angaben zu Verlust/Diebstahl (Datum, Ort, Umstände) / Details of
  loss/theft (Date, Place, Circumstances):"`).
- `Text7` → `existingPassportNumber` (positioned immediately right of
  `"Ich besitze den Reisepass Nr."`).
- `Text8` → `existingPassportIssuingAuthority` (positioned under
  `"ausgestellt von / issued by"`).
- `Text9` → `existingPassportValidUntil` (positioned under
  `"gültig bis / valid until"`).
- `Text10` → `existingPassportIssuedOn` (positioned under
  `"ausgestellt am / valid from"`).
- `Text11`/`Text12` → `legalBasisOtherReasonDe`/`legalBasisOtherReasonEn`
  (two separate blank underlines within the single bilingual sentence
  `"Weil ... (siehe Niederschrift) / Because ... (see transcript)"` — one
  per language column, implemented as two distinct widgets rather than
  one shared field; disclosed rather than merged, since they are genuinely
  two separate PDF widgets).

### The `applicationForSelf` checkbox: reused title text, disclosed rather than silently renamed

The very first checkbox on the page (immediately preceding
`"Antrag auf Ausstellung eines österreichischen Reisepasses oder
Personalausweis"`, the form's own printed title/heading sentence) is a
genuine, distinct `Btn` widget with its own real `Off`/`On` value — **not**
a text field whose *default value* duplicates a heading (the exclusion
pattern used in the sibling `at/bmi` cycle for its own duplicate
heading-label widgets). Its `/TU` tooltip, however, is literally the full
document title rather than a short distinct label, evidently because the
form's author reused the page's own title sentence as the first of two
"who is this for" options (paired with the very next line,
`"Ich beantrage ... für das nachstehende Kind"`, "for the following
child"). This is disclosed in `applicationForSelf`'s own `description`
rather than presented as though the widget had a distinct, purpose-built
label of its own.

### A decorative artifact, not a field: repeated "Unterschrift"/"Signature" text

The page-1 text layer contains the string `"Unterschrift"` (letter-spaced:
`"U n t e r s c h r i f t"`) repeated four times and `"Signature"` three
times, tiled across x=244–509 at a single y-coordinate (729.4), directly
above the `"Eigenhändige Unterschrift des Dokumenteninhabers/der
Dokumenteninhaberin"` instruction and the EU-Passbild photo-box
instructions. No AcroForm widget exists at this position — this is page
decoration (most plausibly a tiled visual "sign here" guide/watermark
spanning the signature line's full width), not four separate signature
fields or four separate data points. Disclosed here so a future reader of
the raw text-layer dump does not mistake it for a repeated-field artifact;
it has no effect on the field or `documents[]` model.

## Field-count reconciliation

**42 fields**, reconciled 1:1 against 42 total widgets (0 excluded, 0
merged: 42 − 0 = 42). Checked mechanically by parsing `schema.json` as
JSON and counting `len(schema['fields'])` (42) and `len(schema['documents'])`
(3), not asserted from memory.

## Deliberate scope decisions (disclosed, not silently dropped)

- **The staff-only "Vorgelegte Nachweise" (evidence presented) checklist
  and consular-fee tariff table on page 2 are not modelled at all**, as
  either fields or `documents[]` entries. This section is explicitly
  headed `"Vom Antragsteller nicht auszufüllen / Not to be filled out by
  the applicant"` and carries **zero** AcroForm widgets of its own
  (confirmed: no widget rect falls below y≈628 on page 2). Modelling its
  listed evidence categories (Reisepass, Personalausweis, Identitätszeuge,
  Geburtsurkunde, Staatsbürgerschaftsnachweise, Heiratsurkunde,
  Scheidungsurkunde, Namensänderungsbescheid, Nachweis akademischer Grad,
  etc.) as applicant-facing `documents[]` entries would assert a
  structured applicant declaration the source itself does not present to
  the applicant — it is a caseworker's own post-hoc checklist. The
  Canberra citizen-services pages (cited above) independently corroborate
  that documents like a birth certificate and proof of citizenship are in
  fact required in practice; this is disclosed as real-world context, not
  encoded as a field or document requirement here, per the same
  "don't assert a rule the grammar/source can't state precisely"
  principle used by the sibling `at/bmi` cycle for its own four-way
  identity-proof branch.
- **No dedicated "regular first-time passport" checkbox exists.** Of the
  three document-type checkboxes, none corresponds to an ordinary,
  non-emergency, non-additional, first-time passport — that (most common)
  case is represented by leaving all three unchecked, relying on the
  general `applicationForSelf`/`applicationForNamedChild` toggle alone.
  Disclosed in `identityCardRequested`'s own `description`.
- **The child branch is asymmetric with the self branch.** The self branch
  has both a "no passport yet" and a "holds passport no. X" (with 4
  detail fields) checkbox/field pair; the child branch has only a mirrored
  "child does not have a passport yet" checkbox (`childHasNoPassportYet`)
  — there is no equivalent "the child already holds passport no. X"
  checkbox or detail fields anywhere on the form. This asymmetry is
  disclosed in `childHasNoPassportYet`'s own `description` rather than
  invented to achieve false self/child symmetry.
- **`existingPassportNumber`/`existingPassportIssuingAuthority`/
  `existingPassportIssuedOn`/`existingPassportValidUntil` use
  `requiredWhen: { field: "hasExistingPassport", equals: true }`**, a
  boolean-`equals` condition against a field that may legitimately be
  absent — never `notEquals` against an absent/optional field, avoiding
  the bug this registry has been bitten by before (an absent field always
  satisfies `notEquals`, silently misfiring as "always required").
  The same pattern is used for `lossOrTheftDetails` (`requiredWhen`
  `previousDocumentWasLostOrStolen equals true`) and
  `legalBasisOtherReasonDe` (`requiredWhen` `legalBasisOther equals true`).
- **`legalBasisOtherReasonEn` (the English half of the bilingual "other
  reason" blank) is left fully optional, not `requiredWhen`-gated.** Only
  the German blank (`legalBasisOtherReasonDe`) is gated as conditionally
  required when `legalBasisOther` is checked, since a German-language
  official process would reasonably expect the German entry at minimum;
  requiring both would assert a stricter rule than the source's own
  layout implies.
- **No national-identity-number field.** As with the sibling `at/bmi`
  schema, this application does not itself capture or display an existing
  national identity number.
- **`declarationDate` captures only the date, not the signature itself** —
  matching this registry's established convention (see the
  `applicantOrRepresentativeSignature`/`legalRepresentativeConsent`
  `documents[]` entries).
- **`legalRepresentativeConsent` uses `requiredWhen: { field:
  "applicationForNamedChild", equals: true }`** rather than being
  unconditionally required, since page 2 (headed "FÜR MINDERJÄHRIGE
  PERSONEN UNTER 18 JAHREN BITTE UMBLÄTTERN" / "PLEASE TURN PAGE FOR
  MINORS UNDER THE AGE OF 18") only applies when the document holder is a
  minor. Its `statement` quotes the page's own consent sentence verbatim
  ("Ich stimme der antragsgemäßen Erledigung zu. / I agree to the
  processing of the application and the issuance of a passport."); the
  parent/guardian's own role (Mutter/Vater/Other) is selected only by
  which of three printed dotted signature lines is physically signed —
  there is no digital widget for it, so it is not modelled as a separate
  field.
- **Not modelled at all:** the mission-specific appointment-booking step;
  the separate, dedicated single-page Personalausweis-only form (already
  `at/bmi/national-identity-card-application`); and, as noted above, any
  mission's own locally-numbered bespoke variant forms.

## Verbatim-quote cross-check

Every phrase this record or `schema.json` places in single quotation marks
was checked programmatically against a `pdfjs-dist` `getTextContent()`
dump of both pages (item strings preserved with x/y position, not just
concatenated) using a disposable Node script
(`/tmp/gov-at-bmeia/text.mjs` + `/tmp/gov-at-bmeia/extract.mjs`, not
committed). All quoted German/English strings — including the full
7-option legal-representation-basis sentences on page 2, the
`"Zutreffendes bitte ankreuzen / Mark with a cross where applicable"` and
`"Die grauen Felder in Blockschrift ausfüllen! / Please complete the form
in block capitals!"` general instructions, and the document-type,
gender, and address/contact labels — matched the extracted text layer
exactly, with no line-wrap-hyphenation or font-artifact discrepancies
found (see "Position-based field attribution" above for the explicit,
negative check for the sibling cycle's font bug).

## Mock conformance test run

Two scenarios were built under
`conformance/at/bmeia/passport-or-identity-card-application/1.0.0/` and
checked against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]`/`exclusivityGroups` grammar with a disposable checker script
(`/tmp/gov-at-bmeia/check_conformance.mjs`, not committed — extends the
technique used for the sibling `at/bmi`/`at/bmf` cycles with explicit
`exclusivityGroups` enforcement, since this is the first AT cycle to use
that construct):

- **`application-packet-adult-self-first-passport.json`**: an adult
  applicant applying for herself at an embassy abroad, requesting an
  identity card, with no prior passport. **14 fields collected, 28
  correctly not-applicable, 0 errors**; both required `documents[]`
  entries (`passportPhoto`, `applicantOrRepresentativeSignature`)
  provided; `legalRepresentativeConsent` correctly not required (not a
  minor application).
- **`application-packet-minor-legal-representative.json`**: an application
  for a 6-year-old child's identity card and additional passport, filed by
  the birth mother as legal representative under § 177 Abs 2 ABGB, with
  the child's previous passport reported lost. **15 fields collected, 27
  correctly not-applicable, 0 errors**; all three `documents[]` entries
  provided, including the conditionally-required
  `legalRepresentativeConsent`.
- **Eight mutation/negative controls**, each derived from a base scenario
  with exactly one defect introduced, run through the same checker script
  and each correctly raised at least one error (confirming the checker is
  not vacuously passing):
  1. Removing the required `firstNames` → `missing-required`.
  2. Setting `heightCm` to `400` (violates `maximum: 300`) →
     `range-violation`.
  3. Setting both `genderFemale` and `genderMale` to `true` →
     `exclusivity-violation` on the `gender` group.
  4. Setting `hasExistingPassport: true` (and `hasNoPassportYet: false`)
     without any of the four existing-passport detail fields → 4
     `missing-required` errors (`existingPassportNumber`,
     `existingPassportIssuingAuthority`, `existingPassportIssuedOn`,
     `existingPassportValidUntil`), confirming all four `requiredWhen`
     gates fire correctly together.
  5. On the minor scenario, forcing `legalBasisOther: true` while leaving
     `legalBasisBirthMotherCustodySection177` unset and
     `legalBasisOtherReasonDe` absent → `missing-required` on
     `legalBasisOtherReasonDe`, confirming that conditional gate fires.
  6. Removing the required `passportPhoto` document from scenario 1 →
     `missing-required-document`.
  7. Removing the conditionally-required `legalRepresentativeConsent`
     document from scenario 2 → `missing-required-document`.
  8. Setting both `previousDocumentLost` and `previousDocumentStolen` to
     `true` (with `previousDocumentWasLostOrStolen: true` but
     `lossOrTheftDetails` left unset) → 2 errors: an
     `exclusivity-violation` on the `lost_or_stolen` group **and** a
     `missing-required` on `lossOrTheftDetails`, confirming both
     mechanisms fire independently and correctly on the same packet.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass, run
from the repository root against this document specifically and against
the full registry), and against
`node tools/verify-sources.mjs registry/at/bmeia/passport-or-identity-card-application/1.0.0`
(0 warnings).

## Pre-PR re-verification

Immediately before finalizing this record, the primary PDF and both
Canberra citizen-services pages were re-fetched live a second time in this
same session, with a realistic browser User-Agent:

- `bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/Antrag_Reisepass_Personalausweis_Deutsch-Englisch.pdf`
  — HTTP 200, `application/pdf`, 292,446 bytes, SHA-256-identical to the
  first fetch (`a54c77ef3bae9ace86a40bf8dcdfb8887c871eec64cbd16ce50d14bd541dcf56`).
- `bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-passport`
  — HTTP 200.
- `bmeia.gv.at/en/austrian-embassy-canberra/citizen-services/austrian-identity-papers-and-other-documents/austrian-identity-card`
  — HTTP 200.

`node tools/verify-sources.mjs registry/at/bmeia/passport-or-identity-card-application/1.0.0`
reports all clear (0 warnings) on this same re-verification pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm with BMEIA/an Austrian mission which evidence categories
from the staff-only "Vorgelegte Nachweise" checklist are strictly
mandatory per applicant scenario (the same open question the sibling
`at/bmi` cycle left for its own four-way identity-proof branch); and
resolve, for a specific mission, whether this central bilingual combined
form or a mission's own locally-numbered variant (as found for the
Canberra mission, see "Mission-variant note" above) is actually the
current in-use specimen for that mission's passport applicants.

## Scope and jurisdiction notes

Gives Austria (GovSchema's 31st jurisdiction, previously at 3 of its 6
verticals — Business Formation, Taxes, National ID) its **4th of 6
verticals**, Passport, via this combined passport-or-identity-card
application document. DMV remains a confirmed weak/dead-end candidate from
a prior cycle (in-person/counter-driven, no downloadable specimen); Visa
remains an open, screened-and-viable backlog candidate (the EU-standard
"Formular C1", identified and screened in the GOV-2121 cycle) for a future
cycle.
