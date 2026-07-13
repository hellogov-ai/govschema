# Verification record — `gr/aade/individual-income-tax-return-form-e1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2621**. It opens **Greece's
Taxes vertical (2 of 6)** — Greece's 1st vertical, Visa, opened via
`gr/mfa/application-for-schengen-visa` (GOV-2611, PR #426).

## Source verification (independently re-derived, not copied from the task)

- **Live host re-confirmed blocked, this cycle:** `www.aade.gr` returns an
  Akamai bot-wall from this sandbox, the same persistent gating already
  documented for `gr/mfa/application-for-schengen-visa`'s own
  `VERIFICATION.md`. `tools/verify-sources.mjs` (run below) independently
  reproduces this as an HTTP 403 WARN, not a FAIL, per that established
  precedent.
- **Source used:** the Wayback Machine snapshot
  `https://web.archive.org/web/20260413015535/https://www.aade.gr/sites/default/files/2026-03/Odigies_E1_2026_0.pdf`,
  fetched independently via `curl` this cycle:
  - **HTTP 200**, `Content-Type: application/pdf`, **1,169,825 bytes**
    (`x-archive-orig-content-length: 1169825`, `x-archive-orig-last-modified:
    Mon, 16 Mar 2026 12:49:46 GMT`, `memento-datetime: Mon, 13 Apr 2026
    01:55:35 GMT`).
  - **`sha256`:**
    `6055bc761a7ea193657176e80bbc0be68369f31aa26708c469b5c529310a3235`
    (computed independently via `sha256sum` on the freshly-downloaded file).
  - This is genuine cached content of AADE's own official document, not a
    third-party mirror: the archived headers carry AADE's own original
    `Last-Modified`/`ETag`/`Content-Length` from the live `aade.gr` origin,
    and the document's own front matter (page 1-2) prints "ΑΝΕΞΑΡΤΗΤΗ ΑΡΧΗ
    ΔΗΜΟΣΙΩΝ ΕΣΟΔΩΝ (ΑΑΔΕ)" and "Οδηγίες για τη Συμπλήρωση της Δήλωσης
    Φορολογίας Εισοδήματος Φυσικών Προσώπων Φορολογικού Έτους 2025", "1η
    έκδοση, Αρχική, Μάρτιος 2026", signed by the AADE Governor (Γιώργος Ι.
    Πιτσιλής).
- Parsed with `pdfjs-dist@6` (legacy build, `getTextContent()`), installed in
  a scratch directory (not a repo dependency), following this registry's
  established PDF-extraction practice: position-sorted text rows (grouped by
  rounded `y`, sorted by `x` within row). Confirmed **153 pages**. The
  document is a prose instructions manual — there is no embedded facsimile
  or AcroForm copy of the Ε1 form itself anywhere in this source (confirmed
  by reading every page's text; the manual explains how to complete each
  numbered box/code, but does not reproduce the box layout as an image or
  form widget).
- **Table of contents cross-check:** the source's own page 4 table of
  contents (`Πίνακας Περιεχομένων`) gives each subsection's own starting
  page number; every `Κωδικοί`/`Κωδικός` heading and page citation in this
  schema's `fields[].sourceRef` was cross-checked against that
  table-of-contents listing and against the corresponding body-text section,
  not read from the TOC alone.

## Scoping decision (per GOV-2621's own explicit permission)

The full instructions manual spans **Πίνακας 1** through **Πίνακας 8** plus
extensive appendices (imputed-income/objective-expense tables for vehicles,
boats, etc.). This v1.0.0 deliberately scopes to the **individual/salaried
taxpayer filing pathway**, modeling:

1. **Πίνακας 1** (§2.1, p.26-29): taxpayer identification — ΑΦΜ, ΑΜΚΑ,
   surname/first name/father's name, home address, business-activity
   address (source-fidelity only), e-mail, tax-residency-abroad fields
   (country, ΑΦΤ, foreign address), the ΕΓΓΑΜΟΣ/ΜΣΣ marital-status
   checkbox, spouse/ΜΣΣ identification and ΑΦΜ/ΑΜΚΑ (joint filing),
   representative/tax-representative fields, and the separate-spousal-
   filing field.
2. **Πίνακας 2** (§2.2, p.28-36): a **bounded, disclosed subset** of the 24
   `Κωδικοί`/`Κωδικός` code-groups — the ones genuinely completed by the
   applicant (not by the Tax Administration) and relevant regardless of
   income category (i.e., a salaried/pensioner filer could plausibly tick
   them), excluding business/agricultural-income-specific codes,
   Tax-Administration-only codes, admin-pre-filled special-tax-regime
   codes, and codes requiring a multi-option sub-panel or repeating
   sub-table beyond a simple Yes/No. See "Πίνακας 2 — modeled vs. excluded"
   below for the full code-by-code breakdown.
3. **Υποπίνακας 4Α** (§2.5, p.40-47): the full "Εισόδημα από μισθωτή
   εργασία & συντάξεις – παρακρατηθέντες φόροι & μειώσεις" sub-table — all
   19 `Κωδικοί` code-pairs, Κωδικοί 301-302 through 397-398.

### Πίνακας 1 — a disclosed sourcing limitation

Unlike Πίνακας 2/Υποπίνακας 4Α, **Πίνακας 1 carries no `Κωδικός` numbering
scheme in this source** — §2.1 is written as general/edge-case prose
(registry corrections, spouse/ΜΣΣ identification conventions, tax-resident-
abroad confirmation duties, representative capacity, joint-vs-separate
spousal filing), not a box-by-box numbered walkthrough. This instructions
manual also contains **no facsimile image or AcroForm copy of the Ε1 form
itself** (that lives only in the separate ΦΕΚ Β' 1280/09.03.2026 gazette
publication of decision Α.1062/2026, which was not independently fetched
this cycle). This schema's Πίνακας 1 field list is therefore **inferred**
from the instructions' own explicit references to specific data points (e.g.
"το επώνυμο του/της μη υπόχρεου/ης συζύγου", "η διεύθυνση κατοικίας
συμπληρώνεται υποχρεωτικά από όλους", "συμπληρώνει υποχρεωτικά τον αριθμό
φορολογικής ταυτοποίησης στην αλλοδαπή (ΑΦΤ)"), not from a printed box
inventory — a disclosed judgment call, not a silently-resolved one. A future
review pass fetching the gazette's own form facsimile would let this field
list be independently cross-checked against the actual printed box layout.

### Πίνακας 2 — modeled vs. excluded (24 code-groups total)

**Modeled (7 groups, 13 discrete codes)** — genuinely applicant-ticked,
simple Yes/No, relevant independent of income category:

- Κωδικοί 013-014 (pensioner born ≤31-12-1960) — directly salaried/pension-
  relevant.
- Κωδικοί 015-016 (diplomatic/EU-institution/international-organization
  imputed-income exemption).
- Κωδικοί 023-024 (electronic-payment-expenditure exemption — age/
  disability/judicial-assistance/foreign-residence/minor/military-service/
  small-locality/minimum-income/hospitalization/imprisonment).
- Κωδικοί 029-030 (foreign income/assets/financial-account holder) — top-
  level flag only; the source's own country/category (income vs. 3
  sub-types of property) breakdown is a repeating sub-table, disclosed as
  out of scope.
- Κωδικοί 011-012 (MP/MEP political-party financier).
- Κωδικοί 905-906 (disability ≥80%).
- Κωδικός 079 (new for tax year 2025: qualifying adult dependent child,
  single code, no taxpayer/spouse pair).

**Excluded, disclosed (17 groups, 31 discrete codes):**

- **Κωδικοί 327-328** (first-time business income, 50%-reduced advance
  payment) — business-income-specific, out of scope.
- **Κωδικοί 319-320** — the source states these are "Συμπληρώνονται από τη
  Φορολογική Διοίκηση" (completed BY the Tax Administration itself), not
  applicant-facing.
- **Κωδικός 329** (filed by guardian of a vacant estate/receiver/temporary
  administrator/bankruptcy trustee/judicial liquidator), **Κωδικός 330**
  (filed as guardian/custodian of a minor/judicial assistant), **Κωδικός
  331** (filed as heir of a deceased taxpayer) — special representative-
  capacity filing scenarios, out of scope for the standard self-filing
  individual pathway this v1.0.0 targets (consistent with excluding
  `representativeName`/`representativeCapacity` from this v1.0.0's required
  set — they remain modeled as optional Πίνακας 1 fields for source
  fidelity).
- **Κωδικοί 017-018** (first business activity from 1-1-2023) and **Κωδικοί
  019-020** (single/near-single-client freelancer issuing ΑΠΥ without
  commercial-trader status) — business-income-specific.
- **Κωδικοί 021-022** (e-ΕΦΚΑ/ex-ΟΓΑ agricultural insurance, pre-filled),
  **Κωδικοί 037-038** (professional-farmer identification), **Κωδικοί
  035-036** (agricultural-income tax exemption under Law 4935/2022) —
  agricultural-income-specific.
- **Κωδικοί 385-386** (EU/EEA-resident tax-reduction exemption under ΚΦΕ
  art. 20) — requires a foreign tax authority's own certificate of worldwide
  income or of a low-taxable-income entitlement; a non-resident-specific
  pathway, out of scope for the resident-salaried case this v1.0.0 targets.
- **Κωδικοί 007-008** (hosting adult dependent taxpayers) — requires a
  repeating sub-table (guest's ΑΦΜ, months hosted, square meters), out of
  scope; a companion-schedule candidate for a future cycle.
- **Κωδικοί 039-040** (article 5Α ΚΦΕ alternative taxation for relocating
  high-net-worth individuals), **Κωδικοί 041-042** (article 5Β ΚΦΕ
  alternative taxation for relocating foreign pensioners), **Κωδικοί
  043-044** (article 5Γ ΚΦΕ impatriate-employment relief) — the source
  states these codes are "προσυμπληρωμένοι" (pre-filled) by the Tax
  Administration based on a prior approval decision, not applicant-ticked.
- **Κωδικοί 045-046** (six-way sub-panel of minimum-imputed-income
  exemptions: insurance intermediaries, small-locality kafenia, newspaper
  sub-distributors, itinerant lottery vendors, mothers in the birth/
  adoption/fostering year and following two years, limited-duration business
  activity) and **Κωδικοί 047-048** (four-way sub-panel: large families,
  single-parent families, ≤25%-share taxi operators, small-locality
  professional/residential seat) — each a multi-option sub-panel rather than
  a simple Yes/No, out of scope; companion-schedule candidates.

## Υποπίνακας 4Α — full field-by-field notes

All 19 code-pairs (Κωδικοί 301-302 through 397-398) are modeled as `number`
fields with `minimum: 0`, matching this registry's established pattern for
income-computation lines (e.g. `bd/nbr`, `th/rd/pit-90`). Only
`netSalaryAndWageIncome` (301-302) is `required: true` — the single line
guaranteed applicable to every filer this v1.0.0 targets (a salaried
individual); every other line (main/supplementary pensions, board-fee
income, single-client-contractor income, work vouchers, e-ΕΦΚΑ statement
income, unprefilled-certificate income, self-paid insurance contributions,
withheld tax, and the six foreign-source/athlete/severance lines) is
modeled as an optional pass-through, 0/absent for a filer with no such
income — consistent with how `bd/nbr/individual-income-tax-return-form-it-11ga`
modeled its own out-of-scope-adjacent income lines.

**Disclosed simplifications:**

- `netBoardMemberOrManagerFeeIncome` (325-326), `domesticAthleteOrCoachIncome`
  (359-360), and the article-5Α/5Β/5Γ-adjacent pre-filled lines are, per the
  source, populated by the Tax Administration from its own electronic
  records (decision Α.1099/2019) when available — modeled here as ordinary
  applicant-facing amount fields for schema completeness, since a filer
  without electronic pre-fill (or correcting a pre-filled figure) still
  needs the field to exist.
- `netForeignSourceSalaryOrPensionIncomeGreeceTaxable` (389-390) and
  `foreignTaxPaidCreditOnForeignSalaryOrPensionIncome` (651-652) are
  modeled as plain numbers; the source's own further per-country
  ΣΑΔΦ-credit-method selector ("credit-method treaty" vs. "other cases") is
  not separately modeled — disclosed as an out-of-scope simplification,
  since it is a classification of the credit computation, not a distinct
  income or tax amount.
- `selfPaidMandatoryInsuranceContributions` (351-352) is a **deduction**,
  not income — its own field `description` discloses this explicitly so a
  consumer does not sum it into gross/net income totals.

## Field-by-field inventory and disclosed judgment calls (Πίνακας 1)

- **`taxpayerAmka`/`spouseAmka`**: the source states ΑΜΚΑ is mandatory on
  the return for both the taxpayer and spouse/ΜΣΣ, **except** for taxpayers
  who decline for sensitive-personal-data reasons (for themselves or
  dependents) and for Black Sea Trade & Development Bank employees.
  Modeled as `required: false` given that disclosed carve-out, with an
  11-digit pattern (DDMMYY + 5 digits, the standard Greek ΑΜΚΑ format) —
  consistent with this registry's practice of encoding an external,
  official numbering-scheme fact not itself printed digit-by-digit in this
  specific source (cf. `bd/nbr`'s own disclosed reasoning for its 12-digit
  e-TIN pattern).
- **`taxpayerFatherName`**: inferred from two edge-case references in the
  source (the widow/divorced-woman name-replacement instruction, and the
  military/police/coastguard/fire-service service-ID convention) rather
  than from a direct "here is the father's-name box" statement — a
  disclosed inference, not a fabrication, since both edge cases only make
  sense if such a field exists.
- **`spouseTaxRegistrationNumber`**: the source states married/ΜΣΣ
  taxpayers filing a **joint** return must complete this with the OTHER
  spouse's own ΑΦΜ. Left `required: false` (not `requiredWhen`-gated on
  `isMarriedOrCivilPartnership`) because the further condition — filing
  *jointly* as opposed to *separately* (which instead populates
  `separateSpousalFilingOtherSpouseTin`) — has no discrete boolean field on
  the source to key a condition on. Disclosed rather than silently
  resolved, and consistent with this registry's own known
  `notEquals`-against-an-optional-field pitfall (not invoked here, since no
  `requiredWhen` was written at all for this field).
- **`representativeName`/`representativeCapacity`**: the source describes
  several distinct representative scenarios (guardian of a vacant estate,
  agent/proxy, judicial assistant, temporary administrator, bankruptcy
  trustee, judicial liquidator, tax representative of a non-resident) as
  prose, not as a closed set of separately labeled checkboxes — modeled as
  two free-text fields (name + capacity) rather than an enum, since the
  source provides no fixed option list to enumerate. These special-filer
  scenarios are outside this v1.0.0's primary standard-individual scope
  (see the excluded Κωδικοί 329/330/331 above) but are still modeled as
  optional Πίνακας 1 fields for source fidelity, consistent with how
  `bd/nbr`'s v1.0.0 modeled its own out-of-scope-adjacent
  firm/partnership fields.
- **`taxResidencyCountry`/`foreignTaxIdentificationNumber`/
  `foreignResidentialAddress`**: all three are, per the source, mandatory
  only for a tax resident of a foreign country. Left optional (no
  synthetic "is a foreign tax resident" gating field invented), matching
  this registry's established convention of not inventing a boolean the
  source itself does not present as a discrete field.

## Conformance run

Two hand-authored valid fixtures under
`conformance/gr/aade/individual-income-tax-return-form-e1/1.0.0/`:

- **`valid-single-salaried-resident.json`** — a single, non-married Greek
  tax resident with €24,000 net salary income and €2,400 withheld tax, no
  pension/foreign/other income, all Πίνακας 2 declarations left false.
- **`valid-married-joint-pensioner-with-foreign-income.json`** — a married
  taxpayer (joint filing, spouse ΑΦΜ/ΑΜΚΑ completed) who is a pre-1961-born
  pensioner claiming the electronic-payment-expenditure exemption, with
  main + supplementary pension income, self-paid insurance contributions,
  a foreign-source pension amount with a partial foreign-tax credit, and
  the foreign-income/assets flag ticked (029) while the spouse's own flag
  (030) is false.

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script per this
registry's own established practice, evaluating `required`/`requiredWhen`/
`type`/`validation.{pattern,minLength,maxLength,minimum,maximum,enum}`/
`exclusivityGroups` directly against `spec/v0.3/govschema.schema.json`'s own
rules):

```
$ node check_conformance.mjs schema.json \
    valid-single-salaried-resident.json \
    valid-married-joint-pensioner-with-foreign-income.json
valid-single-salaried-resident.json: 0 error(s)
valid-married-joint-pensioner-with-foreign-income.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-required-field.json`** — drops
  `taxpayerTaxRegistrationNumber` (the sole static `required: true` string
  field) from the single-filer valid fixture.
- **`mutation-control-invalid-afm-pattern.json`** — sets
  `taxpayerTaxRegistrationNumber` to `"12345678A"` (9 characters, preserving
  length so only `pattern`, not `minLength`/`maxLength`, fires).
- **`mutation-control-invalid-amka-pattern.json`** — sets `taxpayerAmka` to
  `"0101901234A"` (11 characters, same length-preserving technique).
- **`mutation-control-invalid-email-pattern.json`** — sets `email` to
  `"not-an-email"`.
- **`mutation-control-negative-income-amount.json`** — sets
  `netSalaryAndWageIncome` to `-500`, violating its `minimum: 0` constraint.
- **`mutation-control-wrong-type-boolean.json`** — sets
  `isMarriedOrCivilPartnership` to the string `"yes"` instead of a boolean.

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-required-field.json \
    mutation-control-invalid-afm-pattern.json \
    mutation-control-invalid-amka-pattern.json \
    mutation-control-invalid-email-pattern.json \
    mutation-control-negative-income-amount.json \
    mutation-control-wrong-type-boolean.json
mutation-control-missing-required-field.json: 1 error(s)
  - taxpayerTaxRegistrationNumber: required but missing
mutation-control-invalid-afm-pattern.json: 1 error(s)
  - taxpayerTaxRegistrationNumber: value "12345678A" does not match pattern ^[0-9]{9}$
mutation-control-invalid-amka-pattern.json: 1 error(s)
  - taxpayerAmka: value "0101901234A" does not match pattern ^[0-9]{11}$
mutation-control-invalid-email-pattern.json: 1 error(s)
  - email: value "not-an-email" does not match pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$
mutation-control-negative-income-amount.json: 1 error(s)
  - netSalaryAndWageIncome: value -500 below minimum 0
mutation-control-wrong-type-boolean.json: 1 error(s)
  - isMarriedOrCivilPartnership: expected boolean, got string
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/gr/aade/individual-income-tax-return-form-e1/1.0.0/schema.json
ok   registry/gr/aade/individual-income-tax-return-form-e1/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gr/aade/individual-income-tax-return-form-e1/1.0.0/schema.json
ok   registry/gr/aade/individual-income-tax-return-form-e1/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`node tools/verify-sources.mjs registry/gr/aade/individual-income-tax-return-form-e1/1.0.0`
was run immediately before opening this PR: 1 directory, 4 URLs checked, 2
WARN (the known `aade.gr` Akamai 403 gate — WARN, not FAIL, matching the
`gov-au-wayback-workaround`-style precedent already established for
`gr/mfa/application-for-schengen-visa`), 0 allowlisted, **all clear**. The
full registry (all 394 `schema.json`/`mapping.json` documents, including
this one) was also re-validated with `tools/validate.mjs` and
`tools/validate-ajv.mjs` and confirmed to pass (394/394 both), to check this
PR did not regress any other document.

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/` (394 entries, up
from 393 before this cycle).

## Scope and jurisdiction notes

- Opens **Greece's Taxes vertical (2 of 6)**. `jurisdiction.level` is
  `national` — AADE is Greece's national tax authority.
- No `edition` member: GovSchema v0.3's `edition.scheme` vocabulary is
  closed to `us-tax-year`/`gb-tax-year`/`award-year` (§5.7), none of which
  fit a Greek tax year, consistent with `bd/nbr`, `ke/kra`, and
  `th/rd/pit-90`'s own precedent (also annual returns with no `edition`
  member). Unlike those schemas, Form Ε1 does not itself carry a
  fillable tax-year field either (each tax year ships as its own separate
  gazetted decision and PDF, e.g. this cycle's Α.1062/2026 for tax year
  2025) — the tax-year identity is instead disclosed via `source.documentRef`
  and this document's own `title`/`description`.
- `process.type` is `filing`; `process.language` is `el` — the source is
  entirely in Greek (unlike, e.g., `bd/nbr`'s English-language edition).
- `documents[]` carries three supporting-evidence entries tied to in-scope
  fields: the employer/insurance-fund salary-or-pension certificate (whose
  figures the in-scope Υποπίνακας 4Α income/withholding fields must
  reconcile with), a tax-residence certificate for a foreign-tax-resident
  filer, and a diplomatic/international-organization employment-status
  certificate supporting Κωδικοί 015-016. All three are `required: false`
  since none are submitted with an e-filing itself — each is retained by
  the taxpayer and produced only if the Tax Administration requests it
  (§1.7).
- Companion-schedule/statement candidates for a future cycle, in priority
  order: Πίνακας 3 (disability tax reduction — a compact 3-code-group table
  directly adjacent to this v1.0.0's scope), the Κωδικοί 029-030
  foreign-income/assets country/category sub-table, Κωδικοί 007-008
  (hosting adult dependents), Κωδικοί 045-046/047-048 (minimum-imputed-
  income exemption sub-panels), Υποπίνακας 4Β (seafarer/aircrew income),
  then Υποπίνακες 4Γ1/4Γ2 (agricultural/business income) and the companion
  Ε2 (rental income)/Ε3 (business financial statement) forms.
- Greece's other four verticals (Business Formation, DMV, National ID,
  Passport) were not re-screened this cycle; per GOV-2611's own prior-cycle
  characterization (see `gr/mfa`'s memory record), they remain confirmed
  dead-end/weak until a future cycle re-confirms or reverses that finding
  independently — this registry's own "dead-end reversals need an
  independent search too" lesson (GOV-2516/GOV-2517) applies here as well.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) independently fetching the
ΦΕΚ Β' 1280/09.03.2026 gazette publication of decision Α.1062/2026 itself
(the actual prescribed form-and-content text), to cross-check this
schema's inferred Πίνακας 1 field list against the form's own printed box
layout, since this cycle's source is an instructions manual with no
facsimile; (2) Πίνακας 3 (disability tax reduction) as the strongest
adjacent companion-schedule candidate, given its compact size and direct
relevance to the disability-related Πίνακας 2 codes already modeled here
(905-906); (3) the Κωδικοί 029-030 foreign-income/assets country/category
breakdown; and (4) re-screening Greece's other four verticals before
treating GOV-2611's prior dead-end findings as permanent.
