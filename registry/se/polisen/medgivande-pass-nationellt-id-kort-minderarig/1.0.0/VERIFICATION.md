# Verification record — se/polisen/medgivande-pass-nationellt-id-kort-minderarig@1.0.0

## Why this candidate (GOV-2363, "GovSchema Standard Research")

Sweden was at 4 of 6 verticals (Business Formation, DMV, Visa, Taxes
published; Passport and National ID open and unscreened per CATALOG.md's
"Known Gaps & Opportunities" section). Polisen's own primary adult
passport/national-identity-card application process (polisen.se) was
re-confirmed this cycle as appointment-based, in-person, and biometric
(fingerprints are captured for a national identity card) — no downloadable
blank application form exists for the main flow. This is the same dead-end
pattern this registry has already confirmed for Finland, Norway, Estonia, and
Poland's own passport verticals: a government identity document that is
issued only via an in-person, biometric appointment has no citizen-facing
static form to model.

There is, however, a genuine, standalone, citizen-facing companion PDF: the
guardian-consent appendix required whenever a minor (under 18) applies for a
passport and/or national identity card and needs custodian consent — form
PM 531.2. Polisen's own guidance page,
<https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/barn-och-ungdomar-pass/>
(fetched live this cycle, HTTP 200), explicitly names this PDF as one of
three accepted ways a custody holder can give consent (the other two being
an e-legitimation-gated online portal and consenting in person at a police
service office) — establishing it as the genuine citizen-facing artifact,
not an internal/staff form. This is directly analogous to Denmark's
`dk/fstyr/samtykkeerklaering-koerekort-under-18` (GOV-2346, form P23T): a
narrow guardian-consent companion form closed Denmark's DMV vertical the same
way this document closes Sweden's Passport vertical.

## Source fetch

- Swedish original:
  `https://polisen.se/siteassets/blanketter/polisens-blanketter-531-2-skriv-ut.pdf`
  (form PM 531.2) — fetched fresh this cycle: HTTP 200, 170,418 bytes,
  genuine `%PDF-1.6` header, no login/CAPTCHA/WAF gate. SHA-256:
  `838f5076eebba4cf982c8e657bfb41f28b891da79c425828f2cdcbf3b8c16c93`.
- English bilingual sibling:
  `https://polisen.se/siteassets/blanketter/polisens-blanketter-531-13-engelska-skriv-ut.pdf`
  (form PM 531.13) — fetched fresh this cycle: HTTP 200, 159,821 bytes,
  genuine `%PDF-1.6` header. SHA-256:
  `958d8ebfbd3e06877c131120c26a79f6b054bebfcd2dafc8ebc6f8e24abd2f67`.
  Used **only** to cross-check field meaning against a readable English
  rendering, not as the schema's primary source — modelled from the Swedish
  original, per this registry's preference for the native-language
  authoritative document.
- Discovery path:
  `https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/barn-och-ungdomar-pass/`
  (fetched live, HTTP 200) explicitly names this PDF as one of three ways a
  guardian can give consent for a minor's passport/national-ID-card
  application.

## Independent field extraction

Performed fresh with `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`, a
throwaway `/tmp` scratch install, not added to this repo's tracked
`package.json`):

- `pdf.numPages` → 1 (both the Swedish original and the English sibling)
- Per-page `page.getAnnotations()` → **0** `Widget` annotations on the single
  page, cross-checked against `getFieldObjects()` (also 0 keys) — this is a
  **print-and-fill form, not a fillable AcroForm PDF**, confirmed
  independently rather than trusted from the task brief.
- Following this registry's existing `jp/houmukyoku/*` precedent (e.g.
  `jp/houmukyoku/seal-registration-notification`) for "no AcroForm but a
  rich extractable text layer" documents, `getTextContent()` was used
  instead, with each text item's own x/y coordinates extracted to resolve
  the printed layout (which distinguishes the minor's personal-identity-number
  digit-box grid from the two guardian columns' own personnummer lines, and
  confirms the left/right (first/second) column ordering — see below).
- **0 AcroForm widgets → 39 schema `fields[]` entries**, a text-layer-only
  mapping (not a 1:1 widget mapping, since there are no widgets to map from).

### Font-encoding glyph artifact (independently reproduced, not merely trusted from the task brief)

Two runs of extracted text render as garbled strings:

- `FHQWLPHWHU`, printed immediately after "Längd" (height)
- `6YHQVNWSHUVRQQXPPHUVDPRUGQLQJVQXPPHU` and `6ZHGLVKSHUVRQDO,'QXPEHUGDWHRIELUWK`
  / `6ZHGLVK3HUVRQDO,GHQWLW\&RRUGLQDWLRQ1XPEHU`, printed near the two
  guardian columns' own personnummer lines (Swedish original and English
  sibling respectively)

Applying a Caesar-style alphabetic shift of **−3 letter positions** (each
resolvable uppercase letter maps to a lowercase letter three positions
earlier in the alphabet) decodes `FHQWLPHWHU` to **`centimeter`** exactly —
an exact, reproducible confirmation, not a guess. The same shift applied to
the tail strings yields a broken-but-recognizable `6venskt personnummer
samordningsnummer` / `6wedishpersonal,'numberdateofbirth` / `6wedish
3ersonal ,dentit\&oordination 1umber` — the leading digit-like glyph
(likely the subset font's own encoding for a capital "S"), a few other
capitalized first letters, and a handful of punctuation marks fall outside
the simple per-letter shift and
remain unresolved (most likely a distinct subset-font glyph range used for
capitals), but the decodable remainder corroborates the readable English
sibling's own plain-English labels ("centimetres"; a "Swedish personal ID
number/date of birth" footnote gloss) closely enough to confirm this is a
broken/non-standard glyph-to-Unicode ToUnicode CMap in this PDF's own
embedded subset font, not real content requiring translation. This is the
same kind of embedded-font glyph artifact already disclosed for
`dk/motorstyrelsen` (GOV-2355) and `fi/traficom` (GOV-2356) in this registry
— disclosed here explicitly rather than silently "fixed" or ignored.

## Layout resolution via coordinates

Per-glyph x/y coordinate extraction (not just concatenated text) was used to
resolve two structural questions the flattened text stream alone could not
answer:

1. **The minor's own personal-identity-number field** is laid out as an
   8-box-plus-4-box digit grid: four "Å" placeholder glyphs (x≈47–90), two
   "M" (x≈103–118), two "D" (x≈132–146), a dash (x≈162), then four "N"
   (x≈175–217) — i.e. **ÅÅÅÅMMDD-NNNN**, a full 4-digit-century format. This
   is genuinely different from the two guardian columns' own personnummer
   line, which prints as a single text run reading literally
   `"Personnummer (ÅÅMMDD-NNNN)"` — a 2-digit-year format. This is a real,
   independently-derived finding, not assumed from the task brief (which
   only suggested a single `^[0-9]{6}-[0-9]{4}$` pattern).
2. **Column ordering**: the two guardian-consent blocks, and the two witness
   blocks beneath them, are laid out side by side — left column starting at
   PDF x≈45, right column at x≈307 — with every field label printed twice,
   verbatim and completely unnumbered. Unlike Denmark's P23T, this source
   form prints **no "Part 1"/"Part 2" (or "Del 1"/"Del 2") numbering
   anywhere**. This schema's own `firstGuardian*`/`secondGuardian*` and
   `firstWitness*`/`secondWitness*` field-name prefixes are a
   document-modelling convention corresponding to left/right position, not a
   label the source itself prints — disclosed explicitly.

## Personnummer pattern: reused, not invented, cross-jurisdiction precedent

Rather than introducing two different regular expressions for the same
underlying Swedish personal-identity-number concept (an 8-digit-year form
for the minor vs. a 6-digit-year form for the guardians, per the coordinate
finding above), this schema reuses this registry's **existing**
`se/skatteverket/individual-income-tax-return` precedent pattern:

```
^(19|20)?[0-9]{6}[-+]?[0-9]{4}$
```

This pattern already accommodates an optional 2-digit century prefix, an
optional `-`/`+` separator (Swedish convention: `+` replaces `-` once the
holder turns 100), and both digit-count variants this form itself prints —
applied uniformly to `minorPersonalIdentityNumber`,
`firstGuardianPersonalIdentityNumber`, and
`secondGuardianPersonalIdentityNumber`. Disclosed here as a deliberate
cross-jurisdiction-consistency choice, not an oversight of the box-grid
finding above.

## Document-type selection: three booleans + exclusivityGroups, not enum

The mutually exclusive travel-document-type selection (`ENDAST PASS` /
`ENDAST NATIONELLT ID-KORT` / `BÅDE PASS OCH NATIONELLT ID-KORT`), a single
printed line of three checkbox-style options, is modelled as three
independent boolean fields (`travelDocumentTypePassportOnly`,
`travelDocumentTypeNationalIdCardOnly`, `travelDocumentTypeBoth`) plus an
`exclusivityGroups` entry (`travel_document_type`, at most one true) —
following this registry's own precedent for an **identical single-line,
three-option printed pattern**:
`pt/imt/requerimento-carta-de-conducao`'s `currentDocumentTypeGroup`, and the
general convention (`dk/um/application-for-danish-passport`'s
`application_type`, 5 fields) of using boolean-plus-exclusivityGroups rather
than a single `enum` field for a printed multi-choice checkbox row. The
form's own instruction ("Typ av resehandling måste fyllas i av
vårdnadshavare" — "Type of travel document must be filled in by the
guardian") is cited in each field's own `description`, but — consistent with
every existing `exclusivityGroups` precedent in this registry — is **not**
itself encoded as a forced-required constraint, since `exclusivityGroups`
semantics are "at most one true", not "exactly one required"; there is no
GovSchema v0.3 mechanism for the latter without inventing a synthetic
always-required field, which this schema deliberately does not do.

## Guardian-2/witness-1/witness-2 optionality: no synthetic gating field

The form's own body text reads "Vid gemensam vårdnad ska intyget
undertecknas av båda vårdnadshavarna" ("In case of joint custody, the
certificate must be signed by both custodians") — implying a single custody
holder suffices under sole custody, and both are required only under joint
custody. **Unlike** Denmark's P23T (which prints an explicit sole/joint
custody checkbox pair this registry's DK sibling schema gates
`secondGuardian*` fields' `requiredWhen` on), this Swedish form prints **no
dedicated sole-vs-joint-custody selector field anywhere** to condition a
`requiredWhen` gate on.

Per this registry's "spec precision over cleverness" and source-fidelity
principles — and per this cycle's own task brief, which explicitly named
this as the preferred option when no printed field exists to key a
`requiredWhen` condition on — **no synthetic gating field is invented**.
`secondGuardianPlace`/`secondGuardianDate`/`secondGuardianPrintedName`/
`secondGuardianPersonalIdentityNumber`/`secondGuardianStreetAddress`/
`secondGuardianPostcode`/`secondGuardianTownCity`/
`secondGuardianDaytimePhone` are each modelled as plainly `required: false`,
with no `requiredWhen`, each field's own `description` explaining that a
second custody holder's consent may be required in practice under joint
custody but the form provides no fillable indicator this schema can
condition on.

The two witness blocks (`firstWitness*`, `secondWitness*`) are likewise left
optional. For `firstWitness*` this is a distinct, separately-disclosed
judgment call: whether witnessing is mandatory for every submission, or is
an alternative path to the passport authority's own in-person identity
check of the custody holder (the excluded "Passmyndighetens
identitetskontroll av vårdnadshavare" staff boxes, see below), is not
resolved anywhere in the form's own printed text — there is no "was this
witnessed?" indicator field either. `secondWitness*` is optional for the
same reason as `secondGuardian*` (relevant only when a second custody holder
exists) compounded with the same `firstWitness*` reasoning.

## Excluded (not modelled), and why

- **`Datum` / `Diarienummer`** — the form's own top-of-page office-use header
  boxes (date, case reference number), with no accompanying applicant-facing
  instruction text anywhere near them (unlike DK P23T's ambiguous
  `presentedAtMunicipalityNameAndAddress`, which had its own plain fill-in
  `alternativeText`). Excluded as staff-facing, per the established DK/NO
  precedent of excluding unaccompanied office-use header boxes.
- **`Passmyndighetens identitetskontroll av vårdnadshavare`** ("The passport
  authority's identity check of the custodian") — two `ID-kontroll (Typ av
  ID-handling och handlingens nr)` boxes, explicitly the passport authority's
  *own* check, not applicant/guardian-supplied data. Excluded as
  institutional/staff-only, consistent with this registry's
  `dk/fstyr/samtykkeerklaering-koerekort-under-18` precedent for its own
  equivalent excluded institutional sections.
- **`Namnteckning`** (signature) — appears once per guardian column and once
  per witness column; not modelled as data anywhere on this form, consistent
  with this registry's convention for print-and-sign Nordic forms (the
  surrounding printed fields — place, date, printed name, personnummer,
  address, phone — are modelled; the physical ink signature itself is not).
- **The three witnessing constraint notes** printed at the form's foot
  ("Medgivandet får inte vara äldre än en månad när det lämnas till
  passexpeditionen" — the consent may not be older than one month;
  "En vårdnadshavare får inte bevittna den andre vårdnadshavarens
  namnteckning" — one custodian may not witness the other's signature;
  "Den ansökan avser får inte bevittna sin vårdnadshavares namnteckning" —
  the minor applicant must not witness their own custodian's signature) are
  business rules stated only in prose, with no corresponding fillable field
  or cross-referenceable data pair the form itself provides a mechanism to
  check. Cited in this document's own top-level `description` rather than
  fabricated as a `validation`/`crossFieldValidation` rule the source form
  does not support.
- **The English bilingual sibling (form PM 531.13)** — used only to
  cross-check field meaning and corroborate the glyph-artifact decoding
  above; not the schema's primary source.

## `minorHeightCentimeters` bound

Modelled as a plain `number` with a light `minimum`/`maximum` sanity bound
(20–250 cm) applied as an editorial convenience; the source form itself
prints no plausibility bound for this field (it is a plain blank next to
"Längd").

## `documents[]`

This schema has **no `documents[]` array** — the form itself references no
supporting-document/attachment requirement anywhere in its printed text,
matching the `dk/fstyr/samtykkeerklaering-koerekort-under-18` precedent of 0
documents.

## Conformance verification

A one-off checker script (`check_conformance.mjs`, not committed — ad hoc
per this registry's convention) was written to evaluate every fixture in
`conformance/se/polisen/medgivande-pass-nationellt-id-kort-minderarig/1.0.0/`
against this schema's `fields[]` (`required`/`requiredWhen`/
`validation.pattern`/`minLength`/`maxLength`/`minimum`/`maximum`) and
`exclusivityGroups` rules (no `documents[]` rules to evaluate, per above).
Results:

| Fixture | Errors | Expected |
|---|---|---|
| `application-packet-sole-custody-single-guardian.json` | 0 | 0 |
| `application-packet-joint-custody-two-guardians.json` | 0 | 0 |
| `mutation-control-missing-static-required.json` | 1 (`firstGuardianDaytimePhone` missing) | 1 |
| `mutation-control-personnummer-pattern-violation.json` | 1 (`minorPersonalIdentityNumber` pattern mismatch) | 1 |
| `mutation-control-exclusivity-group-violation.json` | 1 (`travel_document_type` both true) | 1 |

All 5 fixtures produced exactly the expected error count. The two valid
scenarios (sole-custody-like single guardian and witness; joint-custody-like
two guardians and two witnesses) cover both the minimal and the fully
populated shape of this schema; the three mutation controls each isolate
exactly one rule type (plain `required`, `validation.pattern`,
`exclusivityGroups`) by construction — each mutation fixture is otherwise a
fully valid, complete submission with exactly one deliberate defect
introduced, so no fixture can pass by accidentally satisfying an unrelated
rule.

## Registry validation

- `node tools/validate.mjs registry/se/polisen/medgivande-pass-nationellt-id-kort-minderarig/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/se/polisen/medgivande-pass-nationellt-id-kort-minderarig/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
- `node tools/verify-sources.mjs registry/se/polisen/medgivande-pass-nationellt-id-kort-minderarig/1.0.0` → "1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear"

## Scope and jurisdiction notes

This closes Sweden's Passport vertical, bringing Sweden to **5 of 6**
(Business Formation, DMV, Visa, Taxes, Passport). **National ID remains
Sweden's sole open, unscreened vertical** for a future cycle — not screened
in this pass.
