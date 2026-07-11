# Verification record — `dk/um/application-for-danish-passport` v1.0.0

## Candidate selection

GOV-2244 ("GovSchema Standard Research"): opens Denmark as this registry's
33rd jurisdiction, via the Ministry of Foreign Affairs of Denmark's
(Udenrigsministeriet, UM) "Application for Danish passport" — a genuine,
directly downloadable, currently-referenced fillable AcroForm PDF with no
login/CAPTCHA/WAF gate. This session re-fetched and re-extracted the source
from scratch rather than trusting the brief's own prior-pass numbers (this
registry's standing convention, per GOV-2167's routine notes); the
independent re-extraction reproduced the raw widget count (86) but
corrected two of the brief's own structural assumptions and fixed one real
`requiredWhen` modelling bug found in an already-drafted schema.json this
session inherited from a prior, uncommitted pass in the shared checkout
(no commits existed to lose; see "What this session found and fixed"
below).

## Source

- **Primary:** `https://um.dk/media/vd0fpauc/application_for-danish_passport_2026_03_web.pdf`
  — fetched fresh this session with a plain HTTP GET, no browser-UA
  spoofing, no login, no CAPTCHA, no WAF/bot-mitigation challenge: **HTTP
  200**, `122,515` bytes, SHA-256
  `87b7049de89a69cda5e512c91c8e74e038d6e217f5b93b81b8c0dffae48c8ac5`.
- **Edition evidence:** both pages print `(03/2026)` in the bottom-left
  corner and `Page 1 of 2` / `Page 2 of 2` in the bottom-right — the
  2026-03 edition named in the brief, confirmed directly rather than
  assumed from the URL slug alone. No separate form number is printed
  anywhere on the document.
- **Retrieved:** 2026-07-11.
- **Reviewer:** GovSchema Engineering (Standards Engineer), GOV-2244.

## Extraction method

Confirmed programmatically with `pdfjs-dist` (`legacy/build/pdf.js`, Node
CommonJS — the ESM/browser build is a known repo gotcha and was not used):

- `doc.numPages` → **2**.
- `doc.getFieldObjects()` → exactly **86** distinct keys (field names).
- `page.getAnnotations()` per page → **42** Widget annotations on page 1,
  **44** on page 2, summing to the same **86**.
- Every `Btn` widget's own `radioButton` flag is `false` and each carries
  its own unique field id/name with no `Parent`/`Kids` grouping — this
  document contains **zero genuine linked PDF radio-button groups**,
  confirmed by inspecting the raw field-object dump directly rather than
  assumed from the visual layout.
- Every widget's field name, type, rect, and (for `Btn` widgets)
  `exportValues` was dumped, then cross-walked to its printed label using a
  position-aware (x/y proximity) script against `page.getTextContent()`
  output — items sorted by descending y then ascending x and interleaved
  with the widget list at the same coordinates, the same technique this
  registry's `is/thjodskra`, `is/samgongustofa`, `at/bmeia`, and
  `se/migrationsverket` schemas describe using.
- `doc.getOptionalContentConfig()` returned `null` (no optional-content
  layers/groups) — checked specifically because of the first structural
  finding below, to rule out a hidden Danish-language layer rather than
  assume monolingual English from the visible text alone.

## Structural findings — corrections to this cycle's own scouting brief

1. **The document is English-only, not bilingual Danish/English, despite
   Danish-language internal AcroForm field names.** Every printed label,
   heading, and instruction on both pages (`getTextContent()` dumped in
   full) is English — "Surname", "Civil Registration number", "Given and
   middle names", "Does the applicant hold Danish nationality?", "How was
   kinship established?", etc. The internal field names (`pasansoeger`,
   `foraelder`, `slaegtskab`, `samtykkeindehaver`, ...) are Danish, but no
   Danish text is rendered anywhere a filer would read, and
   `getOptionalContentConfig()` confirms there is no hidden alternate-
   language layer. Two internal textual cues corroborate this is the
   Ministry's own consular/embassy edition for applicants abroad, not a
   bilingual domestic form: "Please refer to the relevant Embassy's
   homepage for information regarding requirements..." and "The Danish
   Mission reserves the right to ask for further documentation, if
   necessary." This corrects this cycle's own scouting brief, which assumed
   printed Danish labels; `process.language` is set to `"en"` accordingly,
   and every field's `label`/`sourceRef` cites the actual printed English
   text, not a guess from the Danish internal field name.
2. **The Civil Registration (CPR/personnummer) split-box groups are each
   10 single-digit boxes, not 11.** The scouting brief described
   `pasansoeger personnr 1_2` through `_11` as "11 boxes"; enumerating the
   actual suffixes gives `_2, _3, _4, _5, _6, _7, _8, _9, _10, _11` — **10**
   distinct widgets, matching the genuine Danish CPR format (`DDMMYY-XXXX`,
   6+4 = 10 digits; the hyphen is printed static artwork between box 6 and
   7, not a widget). The same 10-box (not 11-box) shape recurs identically
   for both `foraelder personnummer 2_2..2_11` and `3_2..3_11` on page 2.
   Unlike this registry's `ar/afip/inscripcion-cuit-personas-juridicas`
   precedent (whose split CUIT boxes each carry `maxLen: 1`), these DK
   digit boxes report `charLimit: 0` (unrestricted) via
   `getFieldObjects()` — the merge here is instead confirmed by each box's
   narrow, contiguous rect width (~9-21pt) and strictly sequential numeric
   suffix at one shared y-coordinate, a positional rather than
   `maxLen`-based signal, disclosed as a distinct verification technique
   from the AR precedent.
3. **Two page-1 widgets belong to a "For official use only" box, not the
   applicant.** `modtaget dato 2` ("Date received") and `hoejde 2` ("Height
   in cm") sit inside the same top-strip box as the printed heading "For
   official use only" and "Deliver/pick up" (which itself has no backing
   widget at all in this specimen). These 2 widgets are excluded from the
   applicant-facing field model as clerk/office-recorded data, consistent
   with this registry's established practice of excluding staff-only
   sections (e.g. `is/thjodskra`'s office-stamp block,
   `pl/mswia`'s "Adnotacje urzędowe" block).
4. **A real `requiredWhen` bug found and fixed via this session's own
   mutation testing.** An earlier, uncommitted draft of this schema.json
   (already present in the shared working tree when this session started,
   with no VERIFICATION.md and no commits — nothing to lose by revising it
   in place) gated the second consent-holder's core fields
   (`secondParentSectionChildName`, `secondParentName`,
   `secondParentCivilRegistrationNumber`, `secondParentDateAndSignature`)
   on `requiredWhen: { field: "applicantIsMinor", equals: true }` alone.
   Building a mutation fixture for the realistic, common **sole-custody**
   case (one parent, `firstParentHasSoleCustody: true`, no second
   consent-holder at all) against that draft produced 4 false
   "required but missing" errors — a minor applicant with a single
   custodial parent should never need a second parent's name/CPR/signature.
   Fixed by re-gating all 4 fields on
   `requiredWhen: { field: "firstParentHasJointCustody", equals: true }`
   instead: a second consent holder's own block is only required when the
   first parent's own declared custody type is `joint`, mirroring this
   registry's `is/thjodskra/passport-issuance-consent-minor` precedent
   (`custodian2` fields gated on `custodyType equals two_custodians`, not
   on a synthetic "is this a minor" fact alone). This is the same class of
   catch the brief's own SE GOV-2070 precedent describes (a
   requiredWhen/exclusivity assumption verified wrong only once real
   mutation data was run against it) — see "Mock conformance test" below
   for the fixture that exposed it and the fixture now committed to
   confirm the fix.
5. **Checkbox groups are modelled as independent boolean fields plus
   `exclusivityGroups`, not `enum`.** Every multi-option checkbox cluster
   on this form (application-type reason, sex, the four yes/no pairs,
   current-passport reason, each consent-holder's custody type, each
   consent-holder's kinship basis) is implemented in the source PDF as
   independent `Btn` widgets with `radioButton: false` and no shared
   `Parent` — confirmed directly via `getFieldObjects()`, not assumed. Each
   cluster is real-world mutually exclusive (an application has exactly one
   reason, an applicant has exactly one recorded sex marker, a custody
   declaration is either sole or joint, etc.), so each is declared as a
   GSP-0013 §5 `exclusivityGroups` entry rather than left as ordinary
   independent optional booleans with no stated relationship — the same
   modelling choice this registry's `at/bmeia/passport-or-identity-card-
   application` (GOV-2128) already applied to its own independent-widget
   checkbox clusters.

## Field reconciliation (86 raw widgets → 58 modelled fields)

- **Page 1: 42 raw widgets** → **31 widget-backed fields** (40 raw widgets,
  including the 10-box→1-field Civil Registration Number merge) **+ 2
  widgets excluded** (the "For official use only" box, finding 3 above)
  **+ 1 semantic-only field** (`applicantIsMinor`, no backing widget —
  gates Section D's visibility per its own printed header, "This section
  shall be completed if the applicant is under 18 years of age"; the
  source form has no explicit age/date-of-birth field of its own since a
  Danish CPR number already encodes date of birth in its first 6 digits).
  **32 page-1-related fields total.**
- **Page 2: 44 raw widgets** → **26 widget-backed fields** (13 per
  consent-holder column × 2 columns, each column's own 10-box Civil
  Registration Number group merged to 1 field). **No exclusions on page
  2** — every widget resolves to a modelled field.
- **Total: 58 fields** (32 + 26), covering all 86 raw widgets: 84
  widget-backed (40 + 44) across 57 fields, plus 2 deliberately excluded
  and 1 added semantic-only field. 30 raw digit-box widgets (3 × 10) merge
  into 3 logical Civil Registration Number fields, a net reduction of 27.

### Section-by-section summary

- **Application type** (5 widgets → 1 `exclusivityGroups` cluster of 5
  booleans): First passport / Renewal / Provisional / Extension / Extra
  passport.
- **A: Applicant** (`applicantSurname` through `applicantPhoneNumber`):
  name, 10-digit Civil Registration Number, place of birth registration
  (town/parish/municipality + country), sex, Danish-nationality and
  other-nationality history (with country/date detail gated on the
  relevant yes/no pair), prior-Danish-passport history, current address,
  email, phone.
- **B: Current passport**: passport number, reason for a new passport
  (expiring/expired, lost, other — the "lost" branch gates the
  `lostPassportPoliceReport` document requirement), and the "other" reason's
  free-text detail.
- **C: Signature**: one combined date-and-signature field.
- **D: Declaration of consent** (applicable only when the applicant is a
  minor; two mirrored, independently-completable consent-holder columns):
  per column, custody type (sole/joint), the child's name as re-entered in
  that column, whether that consent holder acquired another nationality
  before 1 September 2015 (+ country if yes), the consent holder's own
  name and Civil Registration Number, kinship basis (biological/adoptive/
  other, + free-text detail if "other"), and a date-and-signature field.
  The second column's core fields (name, CPR, child's-name-copy, date and
  signature) are `requiredWhen firstParentHasJointCustody equals true`
  (see finding 4 above); the two columns' own custody-type and other-
  nationality-yes/no checkboxes are left ungated (independent optional
  booleans within their own `exclusivityGroups`), consistent with this
  registry's convention of not forcing an answer onto an
  independent, non-grouped checkbox pair the source itself leaves
  optional.

## Documents (`documents[]`) — scope decision

Only **one** document requirement is modelled:
`lostPassportPoliceReport` ("a declaration of lost passport together with
a police report must be enclosed"), `requiredWhen currentPassportLost
equals true` — a clean, directly-stated, cleanly-gateable requirement.

The page-2 "Information regarding passport application" prose separately
lists several further conditional supporting-document requirements
(original birth certificate; parents' passports if under 18; a parents'
marriage certificate "only required if born abroad before 1 July 2014 and
only your father was a Danish citizen"; a Certificate of Danish Nationality
"if you have previously been issued one"; for renewal, the applicant's most
recent passport), split across two different pathways ("first passport or
if your current passport expired more than two years ago" vs. "a passport
renewal (if current passport has expired less than two years ago or is
about to expire)"). None of these has a clean, unambiguous field to gate
on in this v1.0.0 — the first/renewal split depends on elapsed time since
expiry, a fact this form has no field for (only `currentPassportStatus`-
equivalent booleans for expired/lost/other, not "how long ago"), and the
marriage-certificate condition depends on facts ("born abroad", "father
was a Danish citizen") this form never separately collects. Rather than
fabricate a `requiredWhen` gate the source does not itself support (per
this registry's established caution, e.g. `pl/mswia`'s correspondence-
address disclosure, `is/thjodskra`'s witness-field disclosure), these five
further document types are left unmodelled in v1.0.0 and disclosed here as
a genuine, well-sourced follow-on candidate for a future review of this
document.

## Mock conformance test

A standalone Node script (not committed — ad hoc verification harness
matching this registry's usual practice) evaluates `required`/
`requiredWhen` presence, `exclusivityGroups` (at most one field per group
set `true`), and `pattern`/`minLength`/`maxLength` bounds, against the 3
committed fixtures under `conformance/dk/um/application-for-danish-
passport/1.0.0/`:

- **`application-packet-adult-renewal.json`** — an adult renewing an
  existing passport, Danish national, no other nationality, current
  passport expiring/expired. **0 errors.**
- **`application-packet-minor-both-parents-consent.json`** — a first
  passport for a minor whose custody is **joint**: both consent-holder
  columns filled (one with an "other" kinship basis requiring its
  free-text detail). **0 errors.**
- **`application-packet-minor-sole-custody-single-parent.json`** — a first
  passport for a minor with a single custodial parent (**sole** custody);
  no second consent-holder data at all. **0 errors** — this is the exact
  scenario that exposed the bug fixed in finding 4 above; it fails against
  the pre-fix schema and passes against the fixed one.

Six negative controls, each expected to fail and confirmed to fail exactly
as expected:

1. **Bad Civil Registration Number pattern** (letters instead of 10
   digits) on the adult-renewal mock → `applicantCivilRegistrationNumber`
   pattern violation flagged.
2. **Missing `secondParentName`** on the joint-custody mock (where
   `firstParentHasJointCustody: true`) → flagged as required-but-missing,
   confirming the fixed `requiredWhen` gate fires correctly.
3. **`exclusivityGroups` violation** — both `applicantIsMale` and
   `applicantIsFemale` set `true` on the adult-renewal mock → flagged as
   more than one field set in the `applicant_sex` group.
4. **`currentPassportLost: true` with no `lostPassportPoliceReport`
   document supplied** → flagged as a missing required document.
5. **Missing `applicantEmail`** (a plain statically-required field) on the
   adult-renewal mock → flagged as required-but-missing.
6. **The sole-custody mock, mutated to declare `firstParentHasJointCustody:
   true` without adding any second-parent data** → all 4 gated
   second-consent-holder fields flagged as required-but-missing, further
   confirming the fix is not merely accidentally permissive.

## Tooling run

- `node tools/validate.mjs registry/dk/um/application-for-danish-passport/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/dk/um/application-for-danish-passport/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-01** (~6 months): this is a from-scratch opening of a new
jurisdiction with one corrected structural assumption (English-only text),
one corrected digit-box count (10, not 11), and one fixed `requiredWhen`
bug. Re-check the cited PDF URL, byte size, and hash, confirm the `03/2026`
edition has not been superseded, and re-examine whether the five
disclosed-but-unmodelled supporting-document requirements (birth
certificate, parents' passports, marriage certificate, Certificate of
Danish Nationality, most recent passport) can be cleanly gated once a
clearer source for the first/renewal elapsed-time distinction is found, on
or before that date and on any `source.url` change.
