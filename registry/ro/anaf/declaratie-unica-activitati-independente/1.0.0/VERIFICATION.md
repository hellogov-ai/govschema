# Verification record — `ro/anaf/declaratie-unica-activitati-independente` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2797**. This schema **opens
Romania's Taxes vertical** — Romania's first published schema, making Romania
the registry's **50th jurisdiction**.

## Source verification (independently re-derived, not copied from the task briefing)

- **PDF source:** `https://static.anaf.ro/static/10/Anaf/formulare/D_212_2736_2025.pdf`
  — fetched independently this cycle via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, **620,762 bytes**,
    `Last-Modified: Mon, 05 Jan 2026 12:34:53 GMT`.
  - **`sha256`:**
    `fb6822ac5feb35c99ebdb8dd29a74e284a4ab101a6a1431ccaeb42ea4731f9b2`
    (computed via `sha256sum` on the freshly-downloaded file) — matches the
    truncated hash given in this cycle's own pre-authoring briefing
    byte-for-byte (`fb6822ac...4731f9b2`), independently re-derived in full
    rather than trusted verbatim.
  - Confirmed a genuine, static **AcroForm** directly on the raw PDF bytes: the
    literal string `AcroForm` is present, `/XFA` is absent, and
    `NeedsRendering` is absent — not a dynamic XFA form, consistent with (and
    independently re-confirming) this cycle's briefing.

## PDF structure, independently confirmed via `pdfjs-dist@3` (legacy build) + `canvas`

- **14 pages.** `page.getAnnotations({intent: "display"})` (equivalently
  `"any"` — cross-checked, identical counts) returns **189 Widget-subtype
  annotations in total**, distributed across pages 1-10 and 13-14; **pages 11
  and 12 carry zero Widget annotations** — matching this cycle's briefing
  figure of 189 widgets across 12 of 14 fillable pages.
- **Correction to this cycle's own pre-authoring briefing:** the briefing
  described the 2 non-widget pages generically as "instructions, not
  fillable." Independent inspection of pages 11-12's own text layer
  (`getTextContent()`, row-grouped by `y`-coordinate) found this imprecise:
  those 2 pages are not instructional prose at all — they are the form's own
  Secțiunea 4 ("Stabilirea impozitului anual datorat... din activități
  independente, impus în sistem real"), Subsecțiunea 4.1/4.2 (CAS/CASS
  deductibility computation), Secțiunea 5/5.1 (the IP-rights equivalent), and
  Secțiunea 6 (CASS-recalculation-difference tax) worksheets, each with fully
  legible printed row labels and formulas but **zero fillable AcroForm
  widgets**. The practical implication is the same as "not fillable," but the
  reason is different and more specific: these rows appear to be
  auto-computed by ANAF's own e-filing system from data entered in the
  sections this schema does model (Secțiunea 1/Subsecțiunea 1, Secțiunea 3),
  not blank instructional space. This is disclosed here as a materially more
  precise finding than the pre-cycle briefing, not a silent correction.
- **Field-type metadata proved unreliable for this specimen — the visual
  page-render cross-check was load-bearing, not secondary.** The task
  briefing expected `pdfjs-dist`'s own AcroForm field-type extraction
  (`Tx`/`Btn`/`Ch`, `checkBox`/`radioButton` flags) to be more reliable than
  text-position correlation for a genuine AcroForm. In practice, this
  specimen's own Parent/Kids field hierarchy appears malformed: dozens of
  annotations that are visually and semantically obvious single-line text
  boxes (e.g. "Nume," "Strada," every "(lei)" comb-style amount box) report
  `fieldType: "Btn"` with both `checkBox` and `radioButton` false, rather than
  `Tx`. Only 8 of the 189 widgets report `fieldType: "Tx"` in the whole
  document (these correspond to the CNP/CAEN comb-style numeric-ID boxes).
  Every field's true type in this schema was therefore determined from **both
  pages' full page renders** (via `pdfjs-dist` + `node-canvas`, 2.0x scale,
  `standardFontDataUrl` set) **and** the row-grouped text-layer transcript,
  cross-checked against each other — not from the AcroForm's own per-widget
  type metadata, which this cycle found to be unreliable for this specific
  document. The overall widget **count** (189) and **per-page distribution**
  from `getAnnotations()` were still independently useful and are confirmed
  accurate; it is only the per-widget `fieldType`/`checkBox` classification
  that could not be trusted.
- Pages 1, 2, 3, 4, 9, 10, 13, and 14 (every page this schema's `fields[]`
  cites) were rendered to PNG and visually inspected to confirm layout,
  checkbox-vs-text-box distinction, and comb-box digit counts (13 for the
  domestic/foreign fiscal-ID boxes on page 1, 4 for the CAEN code box on page
  3), consistent with Romania's own CNP (13-digit) and CAEN (4-digit) formats.

## Field derivation

The form's structure (Formulary 212, "Declarație unică..."), reconstructed
from the row-grouped text layer of every page cited and cross-checked against
the corresponding page render:

**Page 1** — §A taxpayer identification (fiscal ID, name, father's initial,
non-resident/country-of-residence, foreign fiscal ID, full address, bank
IBAN, phone/fax/email); §B "Date privind secțiunile completate" — a
top-of-form checklist of which of the form's own Sections/Subsections this
filing completes (amendment-reason checkboxes; Secțiunea 1 Subsecțiunile 1-4;
Secțiunea 2 Subsecțiunile 1-3; Secțiunea 3 Subsecțiunile 1-2; Secțiunile 4,
5, 6, 8).

**Page 2** — Capitolul II's own intro checklist (out of scope) and §C,
identification of an authorized agent/fiscal curator (shared across the
whole declaration, not just Capitolul II).

**Page 3** — Secțiunea 1/Subsecțiunea 1 §A "Date privind activitatea
desfășurată": exemption/regularization checkboxes; point 1 "Categoria de
venit" (17 individual checkboxes spanning categories 1.1 activități
independente through 1.7.4); point 2 "Determinarea venitului net" (sistem
real / cote forfetare de cheltuieli); point 3 "Forma de organizare"; points
4-11 (main activity/CAEN code, business address, authorization/association
contract particulars, activity start/end/suspension dates, disability
exemption days).

**Page 4 (top)** — Secțiunea 1/Subsecțiunea 1 §B "Date privind impozitul
anual datorat," the real-system income/expense worksheet, rows 1-9 (gross
income through annual income tax due), with the form's own footnotes 2 and 3
disclosing that rows 8-9 are not completed by this schema's own target filer
profile (independent-activity income under the real system) except to enter
"0" on row 9 in a loss scenario. (The remainder of page 4 — Subsecțiunea 2,
norma-de-venit taxation — is out of scope.)

**Pages 5-8** — Subsecțiunea 2 (norma de venit) continuation, Subsecțiunea 3
(tourist room rental), Subsecțiunea 4 (agricultural income), and Secțiunea 2
(foreign-sourced income, every category) — all out of scope for this v1.0.0.

**Page 9** — Secțiunea 2/Subsecțiunea 2-3 tail (foreign-sourced
CAS/CASS/pension income, out of scope) then Secțiunea 3/Subsecțiunea 1 "Date
privind contribuția de asigurări sociale datorată" (CAS): the printed A/A.1/
A.2/A.3/B income-threshold-bracket checkboxes, then worksheet rows 1-5 (total
qualifying income through the positive CAS difference).

**Page 10** — Secțiunea 3/Subsecțiunea 2 "Date privind contribuția de
asigurări sociale de sănătate datorată" (CASS): point 2.1 (independent-
activity income, in scope, worksheet rows 1-8) and point 2.2 (every other
income category eligible for CASS, out of scope, with its own separate
threshold checkboxes and table).

**Pages 11-12** — Secțiunea 4, 4.1, 4.2, 5, 5.1, and 6 worksheets: zero
AcroForm widgets (see above); out of scope, not independently fillable on
this static specimen.

**Page 13** — Secțiunea 7 part IV ("Obligații fiscale de plată/de
restituit," a fillable roll-up of the — themselves zero-widget — parts I-III
computed subtotals) and Secțiunea 8 (early-payment bonus): both disclosed as
a deliberately out-of-scope backlog item (not zero-widget, simply outside
this v1.0.0's declared scope); then Capitolul II (voluntary CASS opt-in for
persons without other income), Secțiunea 1 and the start of Secțiunea 2 — out
of scope.

**Page 14** — Capitolul II Secțiunea 2 continuation and Secțiunea 3 (out of
scope); the annex-count fields ("Anexele nr. ... - ..."); the verbatim
attestation statement; the taxpayer's and authorized-agent's/fiscal
curator's signature fields.

Every in-scope printed field was mapped to one of this schema's 71
`fields[]` entries or its 1 `documents[]` entry. See the schema's own
`sourceRef` on each field for the exact page/row/label it was read from.

## Scoping and modeling judgment calls

- **Scoped to one filer profile of many.** Formulary 212 is a single combined
  declaration covering many mutually distinct income categories and CAS/CASS
  bases in one document. Consistent with this registry's established
  precedent for scoping a v1.0.0 to the dominant filing category rather than
  modeling every branch (e.g. `jo/istd`, `rs/purs`, `gh/gra`), this v1.0.0
  models exactly one profile: independent-activity income (category 1.1)
  taxed under the real accounting system (not the flat-rate expense quota),
  with both CAS and CASS owed, filed by a single individual. Every other
  branch is explicitly disclosed as out of scope in the schema's own
  `description` (IP rights; every rental-income variant; agricultural/
  forestry/fish-farming income; securities transfers; bond interest; the
  art.114 "other sources" categories; income taxed on a fixed norm; tourism-
  rental income; foreign-sourced income of any category; CASS for
  non-independent-activity income; Secțiunea 4/5/6's own recomputation;
  Secțiunea 7/8; and the entirety of Capitolul II).
- **`incomeCategory` and `netIncomeDeterminationMethod` as `requiredWhen`
  gates, consistent with `rs/mup`'s procedure-code-gated precedent.** The
  source prints "1. Categoria de venit" as 17 independent checkboxes (not a
  single radio control) and "2. Determinarea venitului net" as 2 independent
  checkboxes; both are modeled as single enum fields (matching this
  registry's established practice of collapsing a source's own mutually-
  exclusive multi-checkbox selector into one enum), and the income/expense
  worksheet fields are gated `requiredWhen` `{"all": [...]}` both equal their
  in-scope value — the first documented use of the `all` composite condition
  (GSP-0013) in this registry's own `requiredWhen` usage, as opposed to a
  single leaf condition.
- **CAS/CASS's own printed threshold gate modeled directly.** Secțiunea 3/
  Subsecțiunea 1 prints its own A/A.1/A.2/A.3/B income-threshold-bracket
  checkboxes (whether realized income sits between 12-24 minimum wages, at
  least 24, above a recalculated minimum, or below the minimum with a
  voluntary opt-in); modeled as `casIncomeThresholdBracket`, an enum
  `requiredWhen` `owesSocialInsuranceContributionCAS` is `true`. Secțiunea 3/
  Subsecțiunea 2 point 2.1 (CASS for independent-activity income) prints no
  equivalent threshold checkboxes of its own (point 2.2, out of scope, has
  its own separate set) — its worksheet fields are gated only on
  `owesHealthInsuranceContributionCASS`.
- **Section-B "sections completed" toggles modeled as fixed, static
  `required: true` booleans, not a single enum.** Unlike `incomeCategory` (a
  true mutually-exclusive selector) the source's own §B checklist is a
  genuine multi-select (a filer can complete several Sections/Subsections at
  once); `reportsIndependentActivityRealSystemIncome`,
  `owesSocialInsuranceContributionCAS`, and
  `owesHealthInsuranceContributionCASS` are modeled as independent booleans,
  each fixed `true` for this schema's declared single-profile scope, and used
  as the CAS/CASS worksheets' own gates. `isRectifyingChapterI` and
  `isRectifyingDueToComplianceNotice` (the two remaining §B toggles relevant
  to Capitolul I amendments) are modeled as ordinary optional booleans; the
  audit-reserve-annulment amendment reason (`art.105 alin.(6) lit.a)/lit.b)`)
  and every other Section/Subsection's own §B toggle are out of scope,
  consistent with those sections' own worksheets being out of scope.
- **Rows 8-9 of the real-system worksheet modeled `required: false` with an
  explanatory `description`, not excluded.** The specimen's own footnotes 2
  and 3 (page 4) state row 8 applies only to disabled-exemption filers under
  other categories and row 9 is not completed at all for this schema's own
  target profile (the authoritative computation instead happens in Secțiunea
  4, which is zero-widget — see above) except to enter "0" in a loss
  scenario. Rather than silently excluding these two printed rows, they are
  kept in `fields[]`, `required: false`, with the footnote's own caveat
  quoted in `description` — consistent with this registry's `jo/istd`
  precedent of disclosing a printed footnote caveat in-line rather than
  dropping the row.
- **CNP/foreign-fiscal-ID/CAEN comb boxes collapsed to single string
  fields.** The source implements these as 13-cell (fiscal ID) or 4-cell
  (CAEN) comb-style entry boxes, each a single logical value; modeled as one
  pattern-constrained string field per box, consistent with this registry's
  standard treatment of comb-style numeric-ID boxes.
- **Authorized-agent/fiscal-curator identification modeled minimally.** Only
  name and fiscal ID are modeled from §C's own address block (page 2),
  consistent with `jo/istd`'s minimal `taxAgentTin`/`taxAgentNationalId`
  precedent for a non-primary declarant's particulars.
- **No `edition` axis used, despite this being an annual filing.** Unlike
  the US 1040/FAFSA-style forms this registry's `edition` axis (GSP-0005)
  targets, and consistent with this registry's own `jo/istd` precedent for
  another annual personal-tax-return schema, the tax year is modeled as an
  ordinary `taxYear` field (pattern `^[0-9]{4}$`) rather than a path-level
  `edition`, since this registry has not yet established an edition-tracking
  discipline for this specific form family.

## Conformance run

Two hand-authored valid fixtures under
`conformance/ro/anaf/declaratie-unica-activitati-independente/1.0.0/`:

- **`valid-standard-independent-activity-filer.json`** — a resident
  individual, original (non-amending) filing, independent-activity income
  under the real system, individual organization form, owing both CAS (at
  or above the 24-minimum-wage bracket) and CASS.
- **`valid-nonresident-association-with-loss-carryforward.json`** — a
  non-resident filer (exercising `countryOfResidence`/`foreignFiscalId`),
  organized as an association without legal personality (exercising
  `associationContractNumber`/`associationContractDate`), an amending
  ("rectificativă") filing with a current-year fiscal loss and a prior-year
  loss carryforward partially offset, CAS owed under the below-minimum
  opt-in bracket, an attached annex, and a declaration filed through an
  authorized agent (exercising `authorizedAgentName`/`authorizedAgentFiscalId`/
  `authorizedAgentOrFiscalCuratorSignature`).

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-taxpayer-fiscal-id.json`** — drops
  `taxpayerFiscalId` (static `required: true`) from the standard valid
  fixture.
- **`mutation-control-invalid-enum-income-category.json`** — sets
  `incomeCategory` to `"agricultural_activities_invalid"`, not one of the
  enum's 17 values.
- **`mutation-control-invalid-pattern-caen-code.json`** — sets `caenCode` to
  `"12"` (2 digits), violating the field's `^[0-9]{4}$` pattern.
- **`mutation-control-missing-conditional-country-of-residence.json`** —
  starts from the non-resident valid fixture (`nonResident: true`) and drops
  only `countryOfResidence`, isolating the `requiredWhen` violation.
- **`mutation-control-missing-conditional-cas-due.json`** — starts from the
  standard valid fixture (`owesSocialInsuranceContributionCAS: true`) and
  drops only `casDue`, isolating the CAS-worksheet `requiredWhen` violation.
- **`mutation-control-invalid-pattern-tax-year.json`** — sets `taxYear` to
  `"25"` (2 digits), violating the field's `^[0-9]{4}$` pattern.

All eight fixtures were checked with a from-scratch Node conformance checker
(`check-conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen` (including the `all`/`any`/`not` composite
`Condition` grammar)/`type`/`validation.enum`/`validation.pattern`/
`validation.minimum`/`validation.maximum` grammar directly:

```
$ node check-conformance.mjs schema.json conformance/ro/anaf/declaratie-unica-activitati-independente/1.0.0
PASS mutation-control-invalid-enum-income-category.json: expected 1 error(s), got 1 -> invalid enum value for incomeCategory: agricultural_activities_invalid
PASS mutation-control-invalid-pattern-caen-code.json: expected 1 error(s), got 1 -> invalid pattern for caenCode: 12
PASS mutation-control-invalid-pattern-tax-year.json: expected 1 error(s), got 1 -> invalid pattern for taxYear: 25
PASS mutation-control-missing-conditional-cas-due.json: expected 1 error(s), got 1 -> missing required field: casDue
PASS mutation-control-missing-conditional-country-of-residence.json: expected 1 error(s), got 1 -> missing required field: countryOfResidence
PASS mutation-control-missing-taxpayer-fiscal-id.json: expected 1 error(s), got 1 -> missing required field: taxpayerFiscalId
PASS valid-nonresident-association-with-loss-carryforward.json: expected 0 error(s), got 0
PASS valid-standard-independent-activity-filer.json: expected 0 error(s), got 0
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's ajv-based meta-schema validator was run against the schema
document and passes:

```
$ node tools/validate-ajv.mjs registry/ro/anaf/declaratie-unica-activitati-independente/1.0.0/schema.json
ok   registry/ro/anaf/declaratie-unica-activitati-independente/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` did not have `pdfjs-dist`/`canvas` present in this
worktree at the start of this cycle (nor `ajv`/`ajv-formats`, since
`node_modules` did not exist at all yet). `npm ci --include=dev` installed
`ajv`/`ajv-formats`; a subsequent bare `npm install pdfjs-dist@3 canvas
--no-save` then silently removed both — reproducing this registry's own
documented gotcha, here traced specifically to this sandbox's global
`NODE_ENV=production`, which makes a plain `npm install` treat
devDependencies as extraneous and prune them even though `--no-save` was
given. Recovered by re-running `npm ci --include=dev`, then installing
`pdfjs-dist`/`canvas` with the environment variable explicitly cleared for
that one command (`NODE_ENV= npm install pdfjs-dist@3 canvas --no-save
--include=dev`), after which `ajv`, `ajv-formats`, `pdfjs-dist`, and `canvas`
were all simultaneously present.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`: 420 total schema documents
(up from 419), 50 jurisdictions (up from 49), with the new
`ro/anaf/declaratie-unica-activitati-independente` entry present.

## Scope and jurisdiction notes

- Opens Romania's **Taxes vertical** — Romania's first published schema,
  making Romania the registry's **50th jurisdiction**. Passport, DMV,
  Business Formation, Visa, and National ID & Civic Documents are all open,
  unscreened backlog candidates for Romania — not screened this cycle.
- `jurisdiction.level` is `national` — ANAF is Romania's national tax
  authority.
- `process.type` is `filing`, matching the form's own nature as an annual
  combined self-assessment declaration.
- `process.language` is `ro`: the specimen's full text layer is entirely in
  Romanian; no English-language parallel edition was located or expected for
  a domestic self-assessment form of this kind.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming whether the 2026
tax year has produced a new edition of Formulary 212 at a new URL (ANAF
typically republishes this form annually); (2) whether a future cycle wants
to author one or more of this v1.0.0's disclosed out-of-scope categories
(IP rights and rental income are likely the next-most-common, after
independent activities) as a companion version or schema; (3) whether
Romania's other five verticals (Passport, DMV, Business Formation, Visa,
National ID & Civic Documents) should be scouted in a future cycle.
