# Verification record — dk/um/application-for-danish-passport@1.1.0

## Why this version exists (GOV-2242, "GovSchema Standard Research")

`1.0.0` (GOV-2244, merged as commit `a85d509`) modelled Section D's four
always-collected string fields per consent-holder column (child's name,
name, Civil Registration number, date-and-signature) as
`requiredWhen: { field: "applicantIsMinor", equals: true }` for **both**
the first- and second-parent columns equally — i.e. any minor applicant
was modelled as needing both consent-holder columns filled in.

A concurrent, independent authoring pass on this same candidate (also
GOV-2242-derived, racing `1.0.0`'s own authoring session — see
[[gov2177-duplicate-concurrent-run-same-issue]]-style collision) built its
own mock-conformance harness and found this incorrect: a minor applicant
whose first parent/guardian holds **sole** legal custody
(`firstParentHasSoleCustody: true`) has, by definition, only one legal
consent-holder — there is no second parent/guardian whose name, CPR
number, or signature the form could require. Modelling both columns as
unconditionally required whenever `applicantIsMinor` is `true` would
reject a genuinely valid, common submission.

This was checked against a source the `1.0.0` cycle did not consult: the
Ministry of Foreign Affairs' own citizen-facing guidance page (a distinct
`um.dk` subdomain, not the application PDF itself),
`https://um.dk/storbritannien/en/travel-and-residence/how-to-apply-for-a-danish-passport/passport-requirements/passports-for-children-under-18-years-old/`,
fetched fresh (HTTP 200, no login/CAPTCHA/WAF gate), which states verbatim:

> "According to Danish law, both parents must give their consent every
> time they apply for a Danish passport for their child until he/she
> reaches the age of 18."
>
> "If one parent has acquired sole custody/parental responsibility,
> documentation to this effect must be presented together with the
> passport application **and only one consent must be given**."

This confirms the sole-custody/joint-custody distinction the application
PDF's own two parallel Section D columns structurally encode (each column
asks "I hold [ ] sole [ ] joint legal custody of the child") is the
correct gate, not `applicantIsMinor` alone. `1.0.0` remains published and
immutable per VERSIONING.md §3 — it is not edited by this document, and
its own claim (both columns always required for a minor) is a genuine,
disclosed defect, not merely a documentation slip. `1.1.0` re-gates the
second-parent column's four core fields
(`secondParentName`, `secondParentCivilRegistrationNumber`,
`secondParentSectionChildName`, `secondParentDateAndSignature`) on
`requiredWhen: { field: "firstParentHasJointCustody", equals: true }`
instead — the first parent's own custody-type selection is what the form's
structure uses to signal whether a second consent-holder exists at all.
The first-parent column's four core fields remain
`requiredWhen: { field: "applicantIsMinor", equals: true }`, unchanged:
whenever the applicant is a minor, at least one parent/guardian's consent
is always required, per the same guidance page's first sentence quoted
above.

This is a validation-**loosening** change (previously-required fields
become conditionally optional; no previously-valid submission becomes
invalid) — a MINOR bump per VERSIONING.md §1, not a MAJOR.

The out-of-scope "documentation to this effect must be presented"
requirement (i.e. proof of sole custody, e.g. a court order) referenced
in the guidance page above is **not** modelled as a `documents[]` entry in
this version — the source PDF itself does not name or itemize such a
document the way it does for `lostPassportPoliceReport`, and inventing an
unbounded "proof of custody" document type without the form's own
itemization would be a genuinely new scope decision, left for a future
cycle to source properly rather than guessed here.

Everything below this point (candidate selection, source, extraction
technique, widget accounting, checkbox/exclusivity modelling,
`documents[]`, verbatim-quote cross-check) is unchanged from `1.0.0` and
reproduced here per this registry's convention of each version directory
carrying its own complete, self-contained verification record.

## Candidate selection

This session's brief (GOV-2244), delegated from the GOV-2242 "GovSchema
Standard Research" cycle, was to author Denmark as GovSchema's 33rd
jurisdiction, opening with its Passport vertical (1/6). GOV-2242 had
scouted three new-jurisdiction candidates in parallel (Norway, Denmark,
Belgium) and found Denmark the strongest: genuine, fresh, unauthenticated
AcroForm PDFs across three verticals, with Passport judged the strongest
single source to open with. This session re-verified that scouting from
scratch — a fresh fetch, a fresh `pdfjs-dist` extraction independent of the
scouting agent's own numbers, and a fresh field-by-field design pass —
rather than assuming the prior cycle's figures still held.

## Source

- **Primary:** `https://um.dk/media/vd0fpauc/application_for-danish_passport_2026_03_web.pdf`
  — the Ministry of Foreign Affairs of Denmark's (Udenrigsministeriet, UM)
  "Application for Danish passport" form, edition dated 03/2026 (printed at
  the foot of both pages: `(03/2026)`). Fetched with a plain HTTP GET using
  a realistic browser User-Agent: **HTTP 200**, `content-type:
  application/pdf`, exactly **122,515 bytes**
  (SHA-256 `87b7049de89a69cda5e512c91c8e74e038d6e217f5b93b81b8c0dffae48c8ac5`),
  a genuine fillable AcroForm PDF, 2 pages. No login, CAPTCHA, or WAF gate
  of any kind — a direct, unauthenticated download from the Ministry's own
  `um.dk` media library.
- No separate form-number is printed anywhere on the document; it is
  referred to here by its own printed title, "Application for Danish
  passport."

The PDF was re-fetched a second time at the end of this session (see
"Pre-PR re-verification" below); the byte length and SHA-256 were
identical both times.

## Extraction technique

The PDF's AcroForm layer was extracted with `pdfjs-dist` v3.11.174
(`legacy/build/pdf.js`, loaded via `createRequire`, per this registry's
documented Node-environment requirement), calling
`page.getAnnotations({ intent: "display" })` on each page to enumerate
every `Widget` annotation, `doc.getFieldObjects()` to group widgets by
their true, distinct PDF field name, and `page.getTextContent()` (with
each item's `transform[4]`/`transform[5]` x/y coordinates preserved) to
reconstruct the surrounding printed prose and labels by position, in the
same style used by this registry's `at/bmeia`/`is/*` cycles.

- **86 total AcroForm widgets** — 42 on page 1, 44 on page 2.
- `getFieldObjects()` returns **86 distinct field-name keys** — i.e. no two
  widgets in this document share a field name anywhere. Every `Btn`
  (checkbox) widget's own `radioButton` flag is `false` (checked across
  all 30 `Btn` widgets programmatically, not eyeballed). **This document
  contains zero genuine PDF radio-button groups.**
- **Zero widgets carry a shared field name across the split
  Civil-Registration-number (CPR/personnummer) digit boxes** — each of the
  30 digit-box widgets (3 groups of 10, see "Split-digit merges" below) is
  its own distinct field name (`pasansoeger personnr 1_2` .. `1_11`,
  `foraelder personnummer 2_2` .. `2_11`, `foraelder personnummer 3_2` ..
  `3_11`), consistent with the split-box pattern already documented for
  other jurisdictions in this registry (e.g. Iceland's kennitala/kerfiskennitala
  forms).

## Widget-to-field accounting (86 → 58, fully disclosed)

| Category | Widgets | Fields | Net |
|---|---:|---:|---:|
| Excluded (official-use-only) | 2 | 0 | −2 |
| Split-digit CPR merges (3 groups × 10) | 30 | 3 | −27 |
| All other widgets (1:1) | 54 | 54 | 0 |
| Synthesized (no backing widget) | 0 | 1 | +1 |
| **Total** | **86** | **58** | |

`54 + 3 + 1 = 58`, matching `schema.json`'s own `fields.length` (checked
mechanically: `python3 -c "import json; print(len(json.load(open('schema.json'))['fields']))"` → `58`).

### Excluded widgets (2)

Both are printed under the form's own header "For official use only"
(top-right of page 1) and are explicitly the issuing authority's own
fields, not applicant data:

- `modtaget dato 2` ("Date received")
- `hoejde 2` ("Height in cm")

Consistent with this registry's convention (see e.g. `at/bmeia`,
`de/bmi`) of not modelling fields the source document itself marks as
staff-only/office-computed.

### Split-digit merges (3 groups, 30 widgets → 3 fields)

Each of the applicant and up to two parents/guardians has their 10-digit
Danish CPR number (personnummer) split across ten separate single-digit
text widgets on the source PDF, confirmed via each widget's own `/TU`
alternate text (e.g. `"Insert first digit of applicant's Civil
registration number"` through `"...tenth digit..."`). Per this registry's
established split-digit/split-component box convention, each group of 10
merges into one field with a `^[0-9]{10}$` pattern:

- `pasansoeger personnr 1_2` .. `1_11` → `applicantCivilRegistrationNumber`
- `foraelder personnummer 2_2` .. `2_11` → `firstParentCivilRegistrationNumber`
- `foraelder personnummer 3_2` .. `3_11` → `secondParentCivilRegistrationNumber`

### Duplicate-value fields kept unmerged (disclosed, not a merge)

Section D's two parallel parent/guardian columns each carry their own
`Tx` widget asking for the applying child's name (`barn foraelder 2` /
`barn foraelder 3`, both with the identical `/TU` alternate text "Insert
name of child who is applying for a passport"). Unlike the CPR digit
groups — which jointly encode ten fragments of one number — these two
widgets are **literal, independent duplicate write-in boxes**, each on a
different consent-holder's own signature block on the physical form, not
a split encoding of a single value. They are modelled as two distinct
fields, `firstParentSectionChildName` and `secondParentSectionChildName`,
per this registry's convention of not merging genuinely duplicate
write-in boxes purely because they happen to ask for the same underlying
fact; see the corresponding field descriptions in `schema.json`.

### Synthesized field (1, no backing widget)

Section D's own printed header reads: **"D: Declaration of consent (This
section shall be completed if the applicant is under 18 years of age)."**
The source form has no explicit age/minority checkbox anywhere (a Danish
CPR number itself encodes date of birth, which likely explains why the
form does not separately collect a date-of-birth field at all — there is
none on this document). Without a real field to gate Section D's own
`requiredWhen` visibility, a semantic-only field `applicantIsMinor`
(`type: boolean`, `required: true`, no `sourceRef` widget) was added,
disclosed here as **not backed by any AcroForm widget** — the same class
of judgment call already used by this registry's
`is/thjodskra/passport-issuance-consent-minor` (GOV-2226) cycle.

## Non-grouped checkbox modelling (12 `exclusivityGroups`)

Every multi-option selector in this document is a set of independent,
non-grouped PDF checkboxes (confirmed via `getFieldObjects()`/`radioButton`
as above), modelled as independent optional boolean fields with a
disclosed `exclusivityGroups` entry where real-world mutual exclusivity is
evident — the same convention already established by
`us/uscis/employment-authorization-i765` and generalized across this
registry's `at/bmeia` cycle:

| Group | Fields |
|---|---|
| `application_type` | firstPassportRequested, renewalRequested, provisionalRequested, extensionRequested, extraPassportRequested |
| `applicant_sex` | applicantIsMale, applicantIsFemale |
| `danish_nationality_status` | applicantHoldsDanishNationality, applicantDoesNotHoldDanishNationality |
| `other_nationality_status` | applicantIsOrWasNationalOfAnotherCountry, applicantIsNotAndWasNeverNationalOfAnotherCountry |
| `previous_danish_passport_status` | applicantPreviouslyHeldDanishPassport, applicantNeverHeldDanishPassport |
| `current_passport_reason` | currentPassportExpiringOrExpired, currentPassportLost, currentPassportOtherReason |
| `first_parent_custody_type` | firstParentHasSoleCustody, firstParentHasJointCustody |
| `first_parent_other_nationality_status` | firstParentAcquiredOtherNationalityBefore2015, firstParentDidNotAcquireOtherNationalityBefore2015 |
| `first_parent_kinship_basis` | firstParentKinshipBiological, firstParentKinshipAdoptive, firstParentKinshipOther |
| `second_parent_custody_type` | secondParentHasSoleCustody, secondParentHasJointCustody |
| `second_parent_other_nationality_status` | secondParentAcquiredOtherNationalityBefore2015, secondParentDidNotAcquireOtherNationalityBefore2015 |
| `second_parent_kinship_basis` | secondParentKinshipBiological, secondParentKinshipAdoptive, secondParentKinshipOther |

Per this registry's established practice (see `at/bmeia`
VERIFICATION.md), none of the individual boolean options within these
groups carry their own `requiredWhen` — only the genuine conditional
*detail* fields do (e.g. `applicantOtherNationalityCountry` gated on
`applicantIsOrWasNationalOfAnotherCountry`, `currentPassportOtherReasonDetails`
gated on `currentPassportOtherReason`, `firstParentOtherNationalityCountry`
gated on `firstParentAcquiredOtherNationalityBefore2015`,
`firstParentKinshipOtherDetails` gated on `firstParentKinshipOther`, and
their `secondParent` mirrors). An earlier draft of this schema mistakenly
applied `requiredWhen: { field: "applicantIsMinor", equals: true }` to
every Section D boolean option (custody, nationality-acquisition,
kinship-basis) — this was caught during authoring by a mock conformance
test run, which showed the minor scenario failing with spurious
`missing-required` errors on fields that are optional non-grouped
checkboxes, not mandatory answers. The `requiredWhen` gate on
`applicantIsMinor` was corrected to apply only to the genuine
always-collected string fields per consent holder (child's name, name,
Civil Registration number, date-and-signature) — not to the checkbox
options themselves.

**`1.1.0` correction:** as described in "Why this version exists" above,
`1.0.0` still applied that `applicantIsMinor`-only gate to **both**
consent-holder columns' four core string fields equally. `1.1.0` narrows
the second-parent column's four core fields
(`secondParentName`, `secondParentCivilRegistrationNumber`,
`secondParentSectionChildName`, `secondParentDateAndSignature`) to
`requiredWhen: { field: "firstParentHasJointCustody", equals: true }` —
only required when the first parent's own custody selection indicates a
second consent-holder exists at all. The first-parent column's four core
fields are unchanged (`requiredWhen: applicantIsMinor equals true`).

## `documents[]` (1 entry)

- `lostPassportPoliceReport` — `requiredWhen: currentPassportLost == true`,
  sourced from the form's own parenthetical: **"Lost (a declaration of
  lost passport together with a police report must be enclosed)"**.

## Verbatim-quote cross-check

Every phrase this record or `schema.json` places in single quotation
marks was checked against this session's own `pdfjs-dist`
`getTextContent()` dump of both pages (item strings preserved with x/y
position, via a disposable script at `/tmp/gov2244/text.js`, not
committed) — every quoted label, section heading, and instruction
(including the Section C attestation text referencing "Section 163 of
the Danish Criminal Code" and the Section D consent/custody sentences)
matched the extracted text layer exactly, with no line-wrap or
font-artifact discrepancies found.

## Mock conformance test run

Three scenarios live under
`conformance/dk/um/application-for-danish-passport/1.1.0/` (the first two
carried forward unchanged from `1.0.0`; the third added in this version),
checked against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]`/`exclusivityGroups` grammar with a disposable checker script
(same technique used across this registry's other cycles, extended here
with explicit `exclusivityGroups` enforcement):

- **`application-packet-adult-renewal.json`**: an adult applicant renewing
  an existing Danish passport, a Danish national with no other
  nationality and no lost/stolen history. **20 fields collected, 38
  correctly not-applicable, 0 errors**; `currentPassportNumber` correctly
  required (previously held a passport); all Section D fields correctly
  not required (`applicantIsMinor: false`).
- **`application-packet-minor-both-parents-consent.json`**: a first
  passport for a minor applicant, filed with both parents completing
  Section D — the first parent has sole custody, is the biological
  parent, and did not acquire another nationality before 1 September
  2015; the second parent has joint custody, did acquire another
  nationality before that date (triggering the conditional country
  field), and establishes kinship on an "other" basis (triggering the
  conditional details field). **34 fields collected, 24 correctly
  not-applicable, 0 errors.** (Note: the first parent's `sole` selection
  alongside a second parent's `joint` selection in this fixture is
  internally inconsistent as a real-world custody arrangement — carried
  forward unchanged from `1.0.0` rather than rewritten, since the fixture
  still exercises the intended structural coverage, both columns
  populated, and this document does not cross-validate the two columns'
  custody-type answers against each other.)
- **`application-packet-minor-sole-custody-single-parent.json`** (new in
  `1.1.0`): a first passport for a minor applicant whose first
  parent/guardian holds sole legal custody — no second parent/guardian
  data is supplied at all. **25 fields collected, 33 correctly
  not-applicable, 0 errors** under `1.1.0`. Re-run against the superseded
  `1.0.0` schema (same fixture, `1.0.0`'s own `schema.json`): **4 spurious
  `missing-required` errors** (`secondParentName`,
  `secondParentCivilRegistrationNumber`, `secondParentSectionChildName`,
  `secondParentDateAndSignature`) — this is the defect this version fixes,
  reproduced directly rather than only asserted.
- **Nine mutation/negative controls**, each derived from a base scenario
  with exactly one defect introduced, run through the same checker script
  and each correctly raised at least one error:
  1. Removing the required `applicantSurname` → `missing-required`.
  2. Setting both `applicantIsMale` and `applicantIsFemale` to `true` →
     `exclusivity-violation` on the `applicant_sex` group.
  3. Setting `applicantCivilRegistrationNumber` to `"12345"` (violates
     `pattern: ^[0-9]{10}$`) → `pattern-violation`.
  4. Removing `currentPassportNumber` from the renewal scenario (where
     `applicantPreviouslyHeldDanishPassport: true`) →
     `missing-required`, confirming that `requiredWhen` gate fires.
  5. Setting `currentPassportLost: true` on the renewal scenario (which
     already has `currentPassportExpiringOrExpired: true`) → 2 errors: an
     `exclusivity-violation` on `current_passport_reason` **and** a
     `missing-required-document` on `lostPassportPoliceReport`,
     confirming both mechanisms fire independently and correctly on the
     same packet.
  6. Removing `secondParentKinshipOtherDetails` from the minor scenario
     (while `secondParentKinshipOther: true` remains) →
     `missing-required`, confirming that nested conditional gate fires.
  7. Setting `applicantIsMinor: true` on the adult-renewal scenario
     without filling any Section D fields → **4** `missing-required`
     errors (the first-parent column's four always-collected string
     fields: child's name, name, Civil Registration number,
     date-and-signature) — confirming the `applicantIsMinor` gate fires
     for exactly the first-parent column, no more, no fewer (under the
     superseded `1.0.0` gate this same mutation raised 8 errors, both
     columns; see "Why this version exists" above).
  8. Removing `applicantDateAndSignature` from the minor scenario →
     `missing-required`.
  9. Setting `firstParentHasJointCustody: true` on the new sole-custody
     fixture (in place of `firstParentHasSoleCustody`) without adding any
     second-parent data → 4 `missing-required` errors (the second-parent
     column's four core fields), confirming the `1.1.0` gate correctly
     *does* fire once joint custody is asserted, not just that it stays
     silent for sole custody.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass,
run from the repository root against this document specifically and
against the full registry — 344/344 documents pass after this addition).

## Pre-PR re-verification

Immediately before finalizing this record, the primary PDF was re-fetched
live a second time in this same session: HTTP 200, `application/pdf`,
122,515 bytes, SHA-256-identical to the first fetch
(`87b7049de89a69cda5e512c91c8e74e038d6e217f5b93b81b8c0dffae48c8ac5`).

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm with a Danish mission or `um.dk`'s own citizen-facing
guidance which supporting documents (photo, prior passport, birth
certificate, etc.) this form's own instructions require per applicant
scenario, since this form itself is silent on that beyond the lost
passport / police report note modelled here; and check whether a
Danish-language-only companion guidance page changes any of the
conditional-document requirements disclosed above.

## Scope and jurisdiction notes

Opens Denmark as GovSchema's **33rd jurisdiction**, with its Passport
vertical (1/6). DMV and Taxes were flagged by the GOV-2242 scouting cycle
as genuine, fresh, unauthenticated AcroForm-PDF candidates for future
cycles; Business Formation, Visa, and National ID remain unscreened
backlog candidates for a future cycle.
