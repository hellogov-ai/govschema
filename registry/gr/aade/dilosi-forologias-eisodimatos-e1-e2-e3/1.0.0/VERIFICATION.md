# Verification record — `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2621**, a child of the
standing research routine (GOV-2609). It opens **Greece's Taxes vertical (2 of
6)** via the Independent Authority for Public Revenue's (AADE) Form Ε1 annual
personal income tax return. Greece itself opened as this registry's 45th
jurisdiction via GOV-2611's Visa schema (`gr/mfa/application-for-schengen-visa`,
PR #426); this is Greece's second published schema.

## Source verification (independently re-derived, not copied from the task)

- **Primary host re-confirmed blocked, this cycle:** `www.aade.gr` is
  Akamai-403-gated from this sandbox, consistent with this registry's
  established pattern for Greek government hosts (`gr/mfa`'s own
  VERIFICATION.md documents the identical `mfa.gr`/`aade.gr` Akamai wall for
  the same sandbox).
- **Source used (Wayback Machine mirror):**
  `https://web.archive.org/web/20260413015535/https://www.aade.gr/sites/default/files/2026-03/Odigies_E1_2026_0.pdf`
  — independently re-fetched this session via `curl`: **HTTP 200**,
  `Content-Type: application/pdf`, **1,169,825 bytes**, **`sha256:
  6055bc761a7ea193657176e80bbc0be68369f31aa26708c469b5c529310a3235`** —
  computed independently via `sha256sum` on the freshly re-downloaded file,
  matching exactly.
- Parsed with `pdfjs-dist@3` (legacy build, `getTextContent()`, items grouped
  into rows by rounded `y` and sorted by `x`): **153 pages** confirmed
  independently.
- `getAnnotations({intent:'display'})` confirmed **zero AcroForm widgets on
  every page** — this source is a genuine static-text instructions manual, not
  a fillable-form PDF. Unlike `gr/mfa`'s Schengen-visa source (a facsimile with
  32 sequentially-numbered applicant-facing items printed directly on the
  form), this AADE source is one level removed: a 153-page manual
  ("Οδηγίες Συμπλήρωσης Δήλωσης Ε1 2025", edition dated 16 March 2026, under
  AADE decision Α.1062/2026, ΦΕΚ Β' 1280/09.03.2026) that documents each
  Κωδικός (code) pair's meaning, label, and eligibility rules in narrative
  prose, organized under numbered subsections — it does not print or depict
  the physical Ε1 form's boxes itself. The Ε1 return is filed on paper or via
  the myAADE e-filing portal, not distributed as a standalone fillable PDF.
- The PDF's own page 4-7 table of contents was extracted this session and used
  to navigate directly to every in-scope section (PDF page N = printed page
  label N-1): Section 2.1 "Συμπλήρωση Πίνακα 1" (PDF pages 27-29), Section 2.2
  "Συμπλήρωση Πίνακα 2" with its 24 numbered subsections 2.2.1-2.2.24 (PDF
  pages 29-38), Section 2.4 "Συμπλήρωση Πίνακα 4" intro (PDF page 39), and
  Section 2.5 "Υποπίνακας 4Α" with its 19 numbered subsections 2.5.1-2.5.19
  (PDF pages 41-48). All of these pages were read directly from the
  position-sorted text layer this session, not assumed from any prior
  summary.

## Scoping decision (per GOV-2621's own explicit permission)

Form Ε1 is a wide, multi-schedule annual return (Πίνακες 1-9, with Πίνακας 4
alone carrying seven income sub-tables 4Α/4Β/4Γ1/4Γ2/4Δ1/4Δ2/4Ε). This v1.0.0
deliberately scopes to the **salaried-employment/pension-income filing
pathway**, modeling:

1. **Πίνακας 1** (Section 2.1) — taxpayer and spouse/civil-partner
   identification: ΑΦΜ, name, ΑΜΚΑ, e-mail, home address, tax-residence
   country, foreign-tax-resident fields (foreign ΑΦΤ, foreign address),
   marital-status marker, spouse ΑΦΜ/ΑΜΚΑ/surname/address, the
   separate-spouse-return field, and the legal/tax-representative fields.
2. **Πίνακας 2** (Section 2.2) — all 24 informational/clearance Yes-No code
   subsections (2.2.1-2.2.24), read individually rather than assumed from the
   code numbers.
3. **Υποπίνακας 4Α** (Section 2.5) — all 19 employment/pension income and
   withheld-tax code pairs (2.5.1-2.5.19).

### Out of scope, disclosed (per the task's own explicit list)

- **Πίνακας 3** (Section 2.3, Κωδικοί 001-002/005-006/009-010) — the
  67%-disability tax-reduction table. Not modeled; distinct from, and not to
  be confused with, the 80%-disability declaration under Πίνακας 2's Κωδικοί
  905-906, which *is* in scope (`disabilityEightyPercentOrMoreCode905`) since
  it lives in Πίνακας 2, not Πίνακας 3.
- **Υποπίνακας 4Β** (Section 2.6, Κωδικοί 255-256 through 271-272) —
  seafarers'/aviators' autonomously-taxed income and other autonomously-taxed
  employment/pension income. Not modeled.
- **Υποπίνακας 4Γ1** (Section 2.7, Κωδικοί 461-462 through 469-470) —
  agricultural business income. Not modeled.
- **Υποπίνακας 4Γ2** (Section 2.8, Κωδικοί 401-402 through 441-442) —
  (non-agricultural) business income. Not modeled.
- **Υποπίνακας 4Δ1** (Section 2.9, Κωδικοί 291-292 through 683-684) —
  dividends, interest, royalties. Not modeled.
- **Υποπίνακας 4Δ2** (Section 2.10, Κωδικοί 101-102 through 175-176) — rental
  (real-estate) income — this is Form Ε2's own territory. Not modeled.
- **Υποπίνακας 4Ε** (Section 2.11, Κωδικοί 829-830 through 875-876) —
  capital-gains income from transfer of capital. Not modeled.
- **Πίνακας 5** (Section 2.12) — annual deemed/imputed-expense determination
  (τεκμήρια: residences, vehicles, boats, aircraft, pools, private-school
  tuition, domestic staff). Not modeled.
- **Πίνακας 6** (Section 2.13) — additional income amounts and other
  informational codes (e.g. the Article 5Γ/5Α/5Β prefilled exempt amounts this
  schema's 4Α section repeatedly cross-references, and the 80%-disability
  exempt amounts). Not modeled — this schema's 4Α fields disclose the
  cross-reference in their own descriptions (e.g.
  `quasiEmploymentServiceIncomeNet`, `article5cNewEmploymentPositionExemption`)
  without asserting Πίνακας 6's own amounts.
- **Πίνακας 7** (Section 2.14) — deductible expenses and amounts subtracted
  from total income or from tax. Not modeled.
- **Πίνακες 8-9** (dependants; further informational codes, per the TOC past
  the pages read this cycle) — not modeled; Πίνακας 8 is cross-referenced only
  narratively by this schema's `hostingAdultLiablePersons` and the
  Πίνακας-3-adjacent Κωδικοί 005-006 text, neither of which is itself modeled.
- **Form Ε2** (rental-income declaration) and **Form Ε3** (business-activity
  statement) — named in the issue title as Form Ε1's companion declarations,
  explicitly out of scope for this v1.0.0. The Ε1 instructions manual itself
  cross-references Ε3 directly (e.g. Section 2.5.5's Article 5Γ ΚΦΕ note: "οι
  αντίστοιχοι κωδικοί του Εντύπου Ε3" feed 50% of new-employment-position net
  income into Κωδικοί 307-308) — disclosed as a live companion-schema
  candidate for a future cycle, along with Ε2's own rental-income schedule
  (Υποπίνακας 4Δ2's territory).

## Field-by-field inventory and disclosed judgment calls

### Πίνακας 1 (17 fields)

Unlike `gr/mfa`'s Schengen-visa source (a facsimile with 32 sequentially
numbered items), Section 2.1 of this source is pure narrative prose with **no
form facsimile and no item numbers** — it discusses correcting/confirming
pre-populated registry data and lists several conditionally-relevant fields in
running text rather than as a numbered list of boxes. This schema's Πίνακας 1
field list is therefore built directly from every concrete field-level
statement the manual's own prose makes (each field's `sourceRef` quotes or
cites the relevant sentence), not re-derived from a physical form image this
source does not contain. Disclosed judgment calls:

- **`taxpayerAmka`/`spouseAmka`**: the source states ΑΜΚΑ is mandatory
  ("αναγράφεται υποχρεωτικά") but carves out an exemption for anyone who does
  not wish to disclose it for sensitive-personal-data reasons (for themselves
  or dependants), plus Black Sea Trade and Development Bank employees. No
  discrete boolean exists on the source to gate this distinction via
  `requiredWhen`; left optional rather than inventing one, per this registry's
  established convention (cf. `gr/mfa`'s `parentalAuthorityOrGuardianDetails`
  precedent for the same disclosed-gate-instead-of-invented-boolean pattern).
- **`foreignTaxIdNumber`/`foreignHomeAddress`**: mandatory in the source only
  for a filer who is a tax resident abroad, but the source expresses this
  narratively (tied to the `taxResidenceCountry` declaration) rather than via
  a discrete Yes/No widget. Rather than key a `requiredWhen` off
  `taxResidenceCountry notEquals "Greece"` — the exact kind of fragile,
  string-literal-dependent gate this registry's own operating notes warn
  against for optional/free-text fields — these are left optional, disclosed.
- **`maritalStatusMarried`** is the one genuine gating checkbox Section 2.1
  describes ("επιλέξτε 'X' πάνω στη λέξη 'ΕΓΓΑΜΟΣ/ΜΣΣ'... μην επιλέξετε 'X' αν
  είστε διαζευγμένος/η ή βρίσκεστε σε χηρεία ή σε διάσταση"), so `spouseTin`
  and `spouseSurname` are `requiredWhen`-gated on it; `spouseAmka` and
  `spouseAddress` are left optional for the same reasons as the taxpayer-side
  AMKA/foreign-address fields above.
- **`spouseSurname`**'s description discloses, but does not separately model,
  the source's note that widowed/separated/divorced women who have not
  updated their identity document should replace a former husband's name with
  their father's name in this same field — a registry-correction nuance, not a
  distinct data point.
- **`representativeDetails`/`taxRepresentativeTin`**: the source lists five
  special filing circumstances (non-resident with a Greek-source-income tax
  representative; minor/judicial-assistance ward; deceased taxpayer's heirs;
  vacant estate; sequestrated/litigated/bankruptcy assets) sharing one
  representative-details block, plus a separate ΑΦΜ box specific to the tax
  representative. No discrete boolean gates either field; both left optional,
  disclosed, consistent with `gr/mfa`'s identical reasoning for its own
  representative block.
- **Deliberately not modeled**: the business-activity address (διεύθυνση
  άσκησης επιχειρηματικής δραστηριότητας), which the source itself says is
  completed "μόνο από όσους αποκτούν εισόδημα από αυτήν την κατηγορία" —
  i.e. only by business-income filers, an out-of-scope population for this
  v1.0.0 (Υποπίνακες 4Γ1/4Γ2 are out of scope). Home address
  (`taxpayerHomeAddress`) is separately confirmed mandatory for every filer
  regardless of income category and is modeled.

### Πίνακας 2 (24 subsections → 39 fields)

Each of the 24 numbered subsections (2.2.1-2.2.24) was read individually,
per the task's own instruction not to assume simple-boolean modeling from the
code numbers alone. **20 of the 24 map to a single boolean field.** Four do
not — the ones worth calling out:

- **Κωδικοί 029-030** (`hasForeignIncomeOrAssets`, Section 2.2.15): the source
  describes a country-plus-category sub-panel, not a plain Yes/No — "επιλέγεται
  ή συμπληρώνεται η χώρα, καθώς και μία από τις κάτωθι κατηγορίες" with four
  named categories (foreign income; real estate/other property abroad;
  financial account abroad; foreign-issued product via a domestic custodian,
  itself requiring that custodian's own ΑΦΜ). Modeled as
  `hasForeignIncomeOrAssets` (boolean) +
  `foreignIncomeOrAssetsCountry` (string, `requiredWhen`) +
  `foreignIncomeOrAssetsCategory` (enum, `requiredWhen`) +
  `domesticCustodianTin` (string, `requiredWhen` on the fourth enum value) —
  four fields for one code pair. **Disclosed simplification:** the source's
  real-world use may involve multiple countries/categories at once (a
  repeating structure); this v1.0.0 models a single selected country/category,
  disclosed rather than silently assumed complete.
- **Κωδικοί 007-008** (`hostingAdultLiablePersons`, Section 2.2.18): the
  source names three concrete data points that accompany the Yes/No mark —
  "ο ΑΦΜ του φιλοξενούμενου, οι μήνες φιλοξενίας και τα τετραγωνικά μέτρα" —
  modeled as `hostingAdultLiablePersons` + `hostedPersonTin` +
  `hostingMonths` (integer, 1-12) + `hostingAreaSquareMeters` (number),
  the latter three all `requiredWhen`-gated. **Disclosed simplification:**
  single hosted person per this v1.0.0's scope, not a repeating structure.
- **Κωδικοί 045-046** (Section 2.2.22): the source itself presents this as a
  6-item selectable sub-panel ("μπορείτε να επιλέξετε: α)...στ)"), not a
  single Yes/No — modeled as six independent optional booleans (one per
  lettered ground: insurance intermediary; small-village café operator;
  press sub-distributor/sub-agent; itinerant lottery vendor; new
  mother/adoptive-or-foster parent; limited-duration business activity).
  **Disclosed:** not modeled as an `exclusivityGroups` "at most one" set,
  since the source does not state these grounds are mutually exclusive.
- **Κωδικοί 047-048** (Section 2.2.23): likewise a 5-item selectable
  sub-panel (large family/orphaned child; single-parent family with minors;
  taxi operator ≤25% ownership; small-population professional
  seat/residence; school-canteen operator) — modeled as five independent
  optional booleans, same disclosed non-exclusivity reasoning. **Disclosed
  cross-code interaction, not enforced structurally:** the source states a
  school-canteen operator may not simultaneously select ground (στ) of
  Κωδικοί 045-046 from tax year 2025 onward; noted in both fields'
  descriptions rather than encoded as a rule spanning two unrelated code
  pairs.
- **Κωδικός 319-320** (`foreignTaxResidentAdminMarker`, Section 2.2.2) and
  the three other administration-prefilled markers in this table (Κωδικοί
  021-022, 037-038, 039-040, 041-042, 043-044) are explicitly stated by the
  source to be system-populated, not applicant-entered — modeled as ordinary
  optional booleans (matching this schema's own scope of "what the return
  ultimately carries"), each disclosed in its own description as
  administration/system-derived rather than a genuine applicant input.
- **Κωδικοί 329, 330, 331, 079** are each a **single code**, not a pair (the
  source's own subsection headers read "Κωδικός 329" etc., not
  "Κωδικοί XXX-YYY") — modeled as single boolean fields, not duplicated.

### Υποπίνακας 4Α (19 subsections → 41 fields)

Every one of the 19 code pairs genuinely represents **two parallel columns**
on the physical Ε1 form — one for the filer (υπόχρεος), one for the
spouse/civil partner (σύζυγος/ΜΣΣ) — which is precisely why AADE calls them
"Κωδικοί XXX-YYY" pairs rather than single codes. This schema therefore models
each pair as two fields (`...Filer` / `...Spouse`), consistent with the
physical form's real column structure (unlike `th/rd`'s PIT-90, whose page-2
income lines are not spouse-paired the same way — a different source
structure, not an inconsistent modeling choice). Disclosed judgment calls:

- **Κωδικοί 651-652** (`foreignTaxPaidCreditFiler`/`...Spouse`, Section
  2.5.13) carries an additional **shared** selector the source describes for
  *every* foreign-tax-credit code on the whole Ε1 form (not just 4Α's):
  whether the amount was withheld/paid in a treaty country whose treaty
  itself prescribes the credit method, or any other case. Modeled once, as
  `foreignTaxCreditBasis` (enum), scoped explicitly in its own description to
  this schema's only in-scope foreign-tax-credit line — the source's parallel
  selectors for other income categories' equivalent codes (265-266, 469-470,
  653-654, 683-684, 867-868) are not modeled, since those categories
  themselves are out of scope.
- **Κωδικοί 395-396** (Section 2.5.16) is documented as **two amounts, not
  one**: the post-1.1.2024-accrued pension-insurance benefit (the code pair
  itself) plus a separately-declared pre-31.12.2023-accrued portion taxed
  under the prior regime. Modeled as
  `foreignPensionInsuranceLumpSumPost2024{Filer,Spouse}` +
  `foreignPensionInsuranceLumpSumPre2024{Filer,Spouse}` — four fields for
  this one subsection, disclosed rather than compressed to two.
- **Κωδικοί 325-326, 359-360** and the five article-5Α/5Β/5Γ Πίνακας-2
  markers are explicitly administration-prefilled per the source ("Οι
  κωδικοί προσυμπληρώνονται από τη Φορολογική Διοίκηση"); modeled as ordinary
  optional numeric/boolean fields with this disclosed in each description,
  consistent with the same pattern used in Πίνακας 2 above.
- **`taxWithheldOnCertifiedIncome` (Κωδικοί 347-348)** description explicitly
  cross-references that it must exclude any amount already prefilled under
  `incomeTaxWithheld` (Κωδικοί 315-316) — modeled as the source itself states
  it, as two independent fields rather than one combined figure, since the
  source distinguishes them by which certificate/case they originate from.

## `documents[]`

One entry, `taxResidenceCertificate` (`identity-document`, `required: false`):
Section 2.1 states foreign-tax-resident filers must produce a tax residence
certificate **only if requested** by the tax authority, to prove their
declared country of tax residence — a demand-driven audit check, not a
fixed filing-time attachment, so it is not `requiredWhen`-gated off
`taxResidenceCountry`, consistent with this schema's disclosed reasoning for
leaving `foreignTaxIdNumber`/`foreignHomeAddress` optional above. No other
required-attachment list is described by the manual for this scoped pathway
(Section 1.7's general "no documents are attached at e-filing time, only
retained and produced on request" rule was read but is a process-level note,
not a specific document requirement, so it is not modeled as its own
`documents[]` entry).

## Conformance run

Two hand-authored valid fixtures, checked with a from-scratch Node
conformance checker (`check_conformance.mjs`, not committed — disposable
per this registry's own established practice) validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}`/`exclusivityGroups` directly against `spec/v0.3/SPEC.md`'s
own rules:

- **`valid-single-filer-salaried-employee.json`** — an unmarried filer with
  straightforward salaried employment income (€24,000 net,
  €3,200 withheld), no foreign income/assets, no hosting declaration, no
  disability declaration.
- **`valid-married-couple-mixed-income.json`** — a married joint filing with
  full spouse identification, a foreign financial account declared (Κωδικοί
  029-030, exercising `foreignIncomeOrAssetsCountry`/`...Category`), an adult
  liable person hosted for 6 months in an 85m² home (Κωδικοί 007-008,
  exercising all three companion fields), employment income for both filer
  and spouse, and foreign-source pension income with a treaty-credit-method
  foreign tax credit (exercising `foreignTaxCreditBasis`).

```
$ node check_conformance.mjs schema.json \
    valid-single-filer-salaried-employee.json \
    valid-married-couple-mixed-income.json
valid-single-filer-salaried-employee.json: 0 error(s)
valid-married-couple-mixed-income.json: 0 error(s)
```

Five mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops `taxpayerTin`
  (a static `required: true` field) from the single-filer valid fixture.
- **`mutation-control-missing-conditional-spouse-tin.json`** — starts from
  the married valid fixture (`maritalStatusMarried: true`) and drops only
  `spouseTin`, isolating the `requiredWhen` violation.
- **`mutation-control-invalid-enum-value.json`** — sets
  `foreignIncomeOrAssetsCategory` to `"crypto-abroad"`, not one of the four
  enum values.
- **`mutation-control-invalid-tin-pattern.json`** — sets `taxpayerTin` to a
  9-character all-letter string (`"ABCDEFGHI"`), preserving length 9 so only
  the `pattern` check (not a length check) fires.
- **`mutation-control-invalid-hosting-months-maximum.json`** — sets
  `hostingMonths` to `13`, violating the field's `maximum: 12`.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-missing-conditional-spouse-tin.json \
    mutation-control-invalid-enum-value.json \
    mutation-control-invalid-tin-pattern.json \
    mutation-control-invalid-hosting-months-maximum.json
mutation-control-missing-required-field.json: 1 error(s)
  - taxpayerTin: required but missing
mutation-control-missing-conditional-spouse-tin.json: 1 error(s)
  - spouseTin: required but missing
mutation-control-invalid-enum-value.json: 1 error(s)
  - foreignIncomeOrAssetsCategory: value "crypto-abroad" not in enum ["foreign-source-income","real-estate-and-other-property-abroad","financial-account-abroad","foreign-issued-product-via-domestic-institution"]
mutation-control-invalid-tin-pattern.json: 1 error(s)
  - taxpayerTin: value "ABCDEFGHI" does not match pattern ^[0-9]{9}$
mutation-control-invalid-hosting-months-maximum.json: 1 error(s)
  - hostingMonths: value 13 greater than maximum 12
```

All five negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3/1.0.0/schema.json
ok   registry/gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3/1.0.0/schema.json
ok   registry/gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

The full registry (all 394 `schema.json`/`mapping.json` documents, including
this one) was re-validated with both `tools/validate.mjs` and
`tools/validate-ajv.mjs` immediately before opening this PR, to confirm this
addition did not regress any other document — both passed 394/394 (plus
3/3 `mapping.json` companions).

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Greece's **Taxes vertical (2 of 6)**. `jurisdiction.level` is
  `national` — AADE is Greece's national tax authority.
- No `edition` member: GovSchema v0.3's `edition.scheme` vocabulary is
  closed to `us-tax-year`/`gb-tax-year`/`award-year` (§5.7), none of which
  fit a Greek tax year, and extending that closed vocabulary is a one-way-door
  spec change out of scope for this cycle — consistent with `th/rd`'s own
  identical precedent (also an annual return with no `edition` member, tax
  year instead modeled via a plain `taxYear` field).
- `process.type` is `filing`; `process.language` is `el` (the source is
  entirely in Greek).
- 98 `fields[]` entries (7 statically `required`, several more conditionally
  `requiredWhen`-gated), 1 `documents[]` entry, no `exclusivityGroups` (no
  genuinely mutually-exclusive checkbox set was found in the in-scope
  sections — Πίνακας 2's multi-select sub-panels, per the disclosure above,
  are explicitly not mutually exclusive per the source's own text).
- Companion-schema candidates for a future cycle, in priority order: Form Ε2
  (rental-income declaration, Υποπίνακας 4Δ2's territory), Form Ε3
  (business-activity statement, directly cross-referenced by this schema's
  own `quasiEmploymentServiceIncomeNet` and
  `article5cNewEmploymentPositionExemption` fields), Υποπίνακας 4Γ1/4Γ2
  (agricultural/business income), Υποπίνακας 4Δ1 (dividends/interest/
  royalties), Πίνακας 3 (disability tax reduction), Πίνακας 5 (deemed-expense
  determination), and Υποπίνακας 4Β (seafarers/aviators).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-confirming this edition is
still current once tax year 2026's own Ε1 instructions manual is published
(AADE republishes this manual annually); (2) Form Ε3 as the strongest
companion-schema candidate, given the direct cross-references already found
in this cycle's in-scope sections; (3) independently sourcing a genuine
blank/fillable Ε1 form specimen (paper or e-filing screenshot) if one becomes
available, to cross-check this schema's Πίνακας-1 field list against the
physical form's own layout, since this cycle's source is a narrative manual
with no form facsimile of its own.
