# Verification record — dk/fstyr/samtykkeerklaering-koerekort-under-18@1.0.0

## Why this candidate (GOV-2346, "GovSchema Standard Research")

Denmark's DMV vertical was its last open vertical (5 of 6 already modelled:
Passport, Taxes, National ID, Business Formation, Visa). A prior cycle
(GOV-2253) screened and rejected two DMV candidates: Færdselsstyrelsen's
primary **P23** driving-licence application, a genuine, current AcroForm but
a shared, multi-party 397-field record card filled progressively by driving
schools, police, and kommune staff over the licence's lifetime — not a
citizen-facing intake form — and Motorstyrelsen's vehicle-registration/
re-registration flow, exclusively MitID/TastSelv-login-gated with no static
fallback. This cycle's scouting (completed before this authoring pass; not
redone here) found **P23T**, "Samtykkeerklæring ved ansøgning om kørekort —
Under 18 år" (Consent Declaration for a Driving Licence Application, under
18) — a distinct, narrowly-scoped companion form P23's own under-18 branch
references, containing only the parent/guardian consent declaration with no
kommune/kørelærer/syn institutional fill-in section of any kind, unlike every
previously-rejected DMV candidate. International-permit and form 21.093
candidates were also named and set aside in the prior scouting round (per the
parent research issue) as weaker/non-AcroForm alternatives; P23T was the
clear pick.

## Source fetch

- URL:
  `https://www.fstyr.dk/Media/638161826116299623/Samtykkeerkl%C3%A6ring%20ved%20ans%C3%B8gning%20om%20k%C3%B8rekort%20-%20%20Under%2018%20%C3%A5r%20-%20(P23T).pdf`
- **Judgment call disclosed**: the resolving URL encodes a **double space**
  (`%20%20`) between "kørekort -" and "Under 18" — this is how
  fstyr.dk's own link is itself encoded (confirmed via a fresh web search
  returning this exact URL from the live site), not a typo introduced here.
  The single-space variant given in the initial task brief (`...kørekort -
  Under 18...`) returns HTTP 404; only the double-space variant resolves.
  Both were tested directly with `curl` this cycle.
- HTTP status: 200 (both `www.fstyr.dk` direct fetch; no login/CAPTCHA/WAF
  gate encountered)
- Byte size: 61,834 bytes — matches the pre-authoring scouting figure exactly
- File header: `%PDF-1.7`
- SHA-256 of the fetched bytes: confirmed reproducible: re-fetching and
  re-hashing this cycle's own download is `86efdb6a3799cf9b54475a838e0cd677036eb5a93c4aa6de5c675ae89dc0735d`
  (recorded here for future re-verification cycles to diff against).

## Independent field extraction

Performed fresh with `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`), not
trusted from the scouting pass's own numbers:

- `pdf.numPages` → 1 (single-page form)
- `pdf.getFieldObjects()` → **14** distinct keys (field names), each with
  exactly one associated widget
- Per-page `page.getAnnotations()` → **14** `Widget` annotations on page 1,
  cross-checked 1:1 against `getFieldObjects()`'s own 14 keys — exact match,
  confirming the pre-authoring scouting count of 14 fields.
- Field type breakdown: 10 `Tx` (text) widgets, 4 `Btn` (checkbox) widgets.
  Every `Btn` widget has `checkBox: true` and **`radioButton: false`** with a
  distinct `fieldName` — i.e. the two custody-declaration checkboxes per
  consent-holder column ("ene myndighed" / "med myndighed") are independent,
  non-grouped checkboxes, not a true PDF radio-button group, matching this
  registry's existing dk/um/application-for-danish-passport precedent for
  the same physical pattern (a pair of "sole"/"joint" custody checkboxes).
- Every widget's own `alternativeText` (a Danish instruction string, e.g.
  "Indtast ansøgerens personnummer", "Klik hvis part 1 er eneindehaver af
  forældremyndigheden over kørekortansøgeren") was cross-referenced against
  the page's own printed text (via `getTextContent()`, grouped by
  y-coordinate) to confirm each widget's real-world meaning and section
  placement (header / "Ansøger" / "Samtykke og underskrift" Part 1 / Part 2).

Raw field list (internal PDF field name → this schema's field name):

| PDF field name | Type | Schema field |
|---|---|---|
| `kommune navn adresse` | Tx | `presentedAtMunicipalityNameAndAddress` |
| `ansoeger personnr` | Tx | `applicantPersonalIdentityNumber` |
| `ansoeger fornavn` | Tx | `applicantFirstName` |
| `ansoeger efternavn` | Tx | `applicantLastName` |
| `part 1 navn` | Tx | `firstGuardianName` |
| `part 1 personnr` | Tx | `firstGuardianPersonalIdentityNumber` |
| `part 1 ene myndighed` | Btn | `firstGuardianHasSoleCustody` |
| `part 1 med myndighed` | Btn | `firstGuardianHasJointCustody` |
| `part 1 dato underskrift` | Tx | `firstGuardianDateAndSignature` |
| `part 2 navn` | Tx | `secondGuardianName` |
| `part 2 personnr` | Tx | `secondGuardianPersonalIdentityNumber` |
| `part 2 ene myndighed` | Btn | `secondGuardianHasSoleCustody` |
| `part 2 med myndighed` | Btn | `secondGuardianHasJointCustody` |
| `part 2 dato underskrift` | Tx | `secondGuardianDateAndSignature` |

14 PDF widgets → 14 schema `fields[]` entries, a clean 1:1 mapping with no
merging, splitting, or exclusion of any widget.

## Custody-branching design

The form's own body text (extracted via `getTextContent()`) reads: "Når en
kørekortansøger er under 18 år, skal forældremyndighedsindehaver(e) give
samtykke til, at der kan udstedes kørekort til kørekortansøgeren" ("When a
driving-licence applicant is under 18, the holder(s) of parental custody
must consent to the licence being issued to the applicant") — the plural
"(e)" on "indehaver(e)" itself signals that either one (sole-custody) or two
(joint-custody) consent holders may need to sign, mirrored by the form's own
two parallel "Part 1"/"Part 2" columns. Each column's own declaration text
reads "Jeg erklærer ... at jeg er eneindehaver / medindehaver af
forældremyndigheden over kørekortansøgeren" ("I declare ... that I am the
sole/joint holder of parental custody over the applicant").

This is structurally identical to the two-column consent pattern this
registry already modelled in `dk/um/application-for-danish-passport@1.1.0`,
whose own VERIFICATION.md documents a real, disclosed defect found and fixed
between `1.0.0` and `1.1.0`: a sole-custody declaration by the first
consent-holder means, by definition, no second consent-holder exists, so
the second column's core fields cannot be unconditionally required — they
must be `requiredWhen` the first column declares **joint** custody. This
schema applies that same precedent from `1.0.0` rather than repeating the
`1.0.0`/`1.1.0` mistake-then-fix cycle: `secondGuardianName`,
`secondGuardianPersonalIdentityNumber`, and `secondGuardianDateAndSignature`
are each `requiredWhen: { field: "firstGuardianHasJointCustody", equals:
true }`, not unconditionally required. The two custody checkboxes per column
are each left `required: false` and grouped into an `exclusivityGroups`
entry (at most one of "sole"/"joint" may be true per column), consistent
with this registry's convention of not forcing an answer onto an
independent, non-grouped checkbox pair (per the same passport-schema
precedent, `notEquals: ""` against an optional sibling is never used as a
gating condition here either).

## Disclosed judgment call: `presentedAtMunicipalityNameAndAddress`

The form's top field, printed under the heading "Forevist kommunen" ("Shown
to the municipality"), has `alternativeText` "Indtast kommunens navn og
adresse" ("Enter the municipality's name and address") — a plain fill-in
instruction, not phrased as a staff annotation. Unlike the excluded
institutional sections of P23/P22/P23A (which carry their own
caseworker-notes/signature blocks), this form has no such staff-only block
anywhere else, and this field is the form's only ambiguous one. It is kept
in `fields[]`, marked `required: false`, and described as ambiguous between
an applicant/guardian pre-filling the destination office and a kommune
staff member's own presentation-confirmation stamp, rather than silently
excluded (which would misrepresent the widget count) or forced required
(which would overstate confidence in its completion party).

## `documents[]`

This schema has **no `documents[]` array** — the form itself references no
supporting document requirement (no ID/court-order/proof-of-custody
itemization anywhere in its printed text or field `alternativeText`), unlike
`dk/um/application-for-danish-passport`'s `lostPassportPoliceReport` entry.
This is a disclosed structural fact, not an oversight: this registry has
previously found conformance checkers can silently skip `documents[]`
requiredness checks, but with zero `documents[]` entries here that blind
spot has no surface to hide in. Explicitly noted rather than left implicit.

## Conformance verification

A one-off checker script (`node check_conformance.mjs`, not committed —
ad hoc per this registry's convention, mirroring prior cycles) was written
to evaluate every fixture in `conformance/dk/fstyr/
samtykkeerklaering-koerekort-under-18/1.0.0/` against this schema's
`fields[]` (`required`/`requiredWhen`/`validation.pattern`/`minLength`/
`maxLength`) and `exclusivityGroups` rules (no `documents[]` rules to
evaluate, per above). Results:

| Fixture | Errors | Expected |
|---|---|---|
| `application-packet-sole-custody-single-guardian.json` | 0 | 0 |
| `application-packet-joint-custody-two-guardians.json` | 0 | 0 |
| `mutation-control-missing-static-required.json` | 1 (`firstGuardianDateAndSignature` missing) | 1 |
| `mutation-control-conditional-second-guardian-violation.json` | 1 (`secondGuardianDateAndSignature` requiredWhen violated) | 1 |
| `mutation-control-exclusivity-group-violation.json` | 1 (`first_guardian_custody_type` both true) | 1 |
| `mutation-control-personnummer-pattern-violation.json` | 1 (pattern mismatch) | 1 |

All 6 fixtures produced exactly the expected error count. The two valid
scenarios (sole custody / joint custody) cover both branches of the
custody-gating logic; the four mutation controls each isolate exactly one
rule type (plain `required`, `requiredWhen`, `exclusivityGroups`,
`validation.pattern`) by construction — each mutation fixture is otherwise
a fully valid, complete submission with exactly one deliberate defect
introduced, so no fixture can pass by accidentally satisfying an unrelated
rule.

## Registry validation

- `node tools/validate.mjs registry/dk/fstyr/samtykkeerklaering-koerekort-under-18/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/dk/fstyr/samtykkeerklaering-koerekort-under-18/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
