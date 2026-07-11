# Verification record — `it/agenzia-entrate/modello-730` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-11`

This is a `GovSchema Standard Research` cycle (**GOV-2382**). Italy was not
previously in the registry (35 jurisdictions live before this cycle). This
document opens Italy as the **36th jurisdiction**, via its Taxes vertical,
sourced from Agenzia delle Entrate's Modello 730/2026 — the flagship annual
income tax return for employees/pensioners.

## Sources examined and fetched fresh

### Source 1 (primary `source`, the form)

- **Authority:** Agenzia delle Entrate (AdE).
- **Document:** Modello 730/2026, "Redditi 2025" — the current version as
  published on `agenziaentrate.gov.it`'s own "730-2026 — Modello e istruzioni"
  landing page at the time of this cycle's retrieval.
- **URL:**
  `https://www.agenziaentrate.gov.it/portale/documents/20143/9764684/730_modello_2026.pdf`
  (direct PDF); landing page:
  `https://www.agenziaentrate.gov.it/portale/730-2026/modello-e-istruzioni`
  (HTTP 200, confirmed live 2026-07-11 — an earlier draft of this document
  cited a different, now-404 URL path for this landing page; corrected after
  CI's `verify-sources` check caught it).
- **Fetched:** direct `curl` from this sandbox, 2026-07-11. **HTTP 200**, no
  login/CAPTCHA/WAF gate, no `WebFetch` fallback needed (unlike some other
  gov PDF hosts this registry has previously hit timeouts against).
- **Size:** 1,054,909 bytes (matches the pre-scouted ~1.05MB figure).
- **sha256:** `e7fa9aa859e165878a5093e9c1ae23ee4c463d05dd25d738d63982088be257d9`
- **Pages:** 24 (confirmed via `pdfjs-dist`'s own `doc.numPages`, matching the
  pre-scouted figure).
- **Extraction method:** `pdfjs-dist` 4.10.38, `legacy/build/pdf.mjs`.
  `page.getAnnotations()` returned **zero** Widget annotations across all 24
  pages — a static, print/hand-fill template, not a fillable PDF (confirmed
  independently in this cycle, matching the pre-scouted finding). A first pass
  used `page.getTextContent()` directly (PDF content-stream reading order),
  which is legible for simple sections but interleaves columns unpredictably
  in the dense multi-column Quadro C/Quadro E grids. A second pass grouped
  each page's text items by their own `transform` y-coordinate into rows
  (rounded to a 3-unit bucket) and sorted each row by x-coordinate — a
  coordinate-based reading-order reconstruction, the same technique this
  registry has used before for other out-of-order generic-grid forms (e.g.
  `dk/skattestyrelsen/oplysningsskemaet`) — which reliably recovered the
  form's own printed casella sequence (A1-A6, B1-B12, C1-C18, D1-D5, E1-E83,
  F1-F15, ...) in correct visual reading order.
- **What it confirms:** every casella code and printed label this schema's
  `fields[]`/`documents[]` cite, in place, cross-checked against the
  istruzioni's own field-by-field explanation (Source 2).

### Source 2 (companion, the istruzioni)

- **Document:** "730/2026, ISTRUZIONI PER LA COMPILAZIONE" (aggiornate al 28
  maggio 2026).
- **URL:**
  `https://www.agenziaentrate.gov.it/portale/documents/20143/9764684/730_2026_istruzioni_+agg+28+05+2026.pdf`
- **Fetched:** direct `curl`, 2026-07-11. **HTTP 200**, no gate.
- **Size:** 3,552,969 bytes.
- **sha256:** `0f09c12914f1132f8114cf22e836915d4f9f8fabe99888923bdb1316ffcfe8e6`
- **Pages:** 175 (a much larger document than the form itself, since it
  covers every quadro's field-by-field instructions, appendix tables, and
  worked examples).
- **Extraction method:** same `pdfjs-dist` pipeline as Source 1 (plain
  `getTextContent()` reading order, sufficient for this document's
  predominantly single-column prose layout).
- **What it confirms:** the exact numbered-`Rigo`/`Colonna` explanation for
  every casella this schema models (e.g. "Righi da C1 a C3 - Redditi di
  lavoro dipendente e assimilati", "Rigo E21 - Contributi previdenziali e
  assistenziali"), the enum values for every coded column, the eligibility
  thresholds (e.g. EUR 129.11/EUR 6,197.48 for medical-expense reliefs), and
  the verbatim signature-declaration text.

## Casella-to-field mapping method

For every field this schema models, the same three-step process was used:

1. Locate the casella's printed code (e.g. `E21`) and its immediately
   adjacent printed label in the coordinate-reconstructed Modello 730 text
   (Source 1).
2. Locate the istruzioni's own numbered explanation for that exact code
   (e.g. `grep -n "Rigo E21"` against the istruzioni's plain-text extraction,
   Source 2), which states the field's meaning, its column breakdown (when a
   rigo has multiple columns), any coded-enum values, and any eligibility
   caps/thresholds.
3. Cross-check the two: the form's own printed label plus the istruzioni's
   fuller explanation, and only then write the field's `label`/`description`/
   `validation`/`sourceRef`. This is the same "printed casella self-documents
   the position, istruzioni self-documents the meaning" method already
   applied to `pl/mf/zeznanie-pit-37` and
   `es/aeat/declaracion-censal-personas-fisicas-modelo-030`, both also
   non-AcroForm, fully self-labelled static templates.

## Scope: what v1.0.0 models and what it defers

Modello 730/2026 is a large, multi-quadro return (24 pages covering land
income, building income, employment/pension income, capital/miscellaneous
income, deductions, tax credits, advance payments, and more). Per this
registry's established convention for large annual-return forms (Denmark's
Oplysningsskemaet, Finland's 50A, South Africa's ITR14 family), v1.0.0 scopes
to the common salaried-employee/pensioner core and explicitly defers the
rest, rather than attempting all 24 pages in one version or silently
omitting sections without disclosure.

**Modelled in v1.0.0:**

| Section | Representative fields | Modelled scope |
|---|---|---|
| Frontespizio, Tipo di dichiarazione | `taxReturnFilingMode`, `integrativeReturnCode`, `jointFiling`, `firstFilingDeclaration` | Full for the primary taxpayer module |
| Frontespizio, Dati del contribuente | `taxpayerTaxId`, `surname`, `firstName`, `sex`, `dateOfBirth`, `birthPlace`, `birthProvince` | Full |
| Frontespizio, Residenza anagrafica | `residenceComune`, `residenceProvince`, `residencePostalCode`, `residenceAddress` | Full (block itself is conditionally relevant only when residence changed or first filing, per the form's own instruction — modelled as always-available optional fields) |
| Frontespizio, Domicilio fiscale | `domicilioFiscale2025Comune/Provincia` (required), `domicilioFiscale2026Comune/Provincia` (optional) | Full |
| Frontespizio, Telefono e posta elettronica | `phone`, `mobile`, `email` | Full |
| Frontespizio, Situazioni particolari | `specialTaxpayerSituation` | Only the primary-module casella; see judgment call 1 |
| Familiari a carico | `spouseTaxId`/`spouseMonthsAsDependent` + 4 bounded dependent slots (`dependentNRelationship`/`Disability`/`TaxId`/`MonthsAsDependent`/`DeductionPercentage`) | Simplified; see judgment call 2 |
| Quadro C, Sezione I | `employmentIncomeRowN{Type,ContractType,Amount}` (rows 1-3, caselle C1-C3) | Full for the 3-row income table |
| Quadro C, Sezione III-IV | `irpefWithheld`, `ritaSubstituteTaxWithheld`, `regionalSurtaxWithheld`, `municipalSurtaxAdvance2025`, `municipalSurtaxBalance2025`, `municipalSurtaxAdvance2026` (C9-C13) | Full |
| Quadro E, Sezione I | `medicalExpensesExemptPathologies`/`medicalExpenses` (E1), `medicalExpensesForNonDependentFamilyMembers` (E2), `medicalExpensesForDisability` (E3), `mortgageInterestContractCode`/`mortgageInterestAmount` (E7) | Only these 4 righi of Sezione I's ~14 righi |
| Quadro E, Sezione II | `mandatoryPensionContributions` (E21) | Only this 1 rigo of Sezione II's ~13 righi |
| Firma della dichiarazione | `documents[].signatureDeclaration` | Modelled as an attestation, not a field |

Total: **67 `fields[]` entries** and **4 `documents[]` entries**.

**Explicitly deferred (out of scope for v1.0.0):**

- **Quadro A** (redditi dei terreni — land income) and **Quadro B**
  (redditi dei fabbricati — building/property income), including the rental
  cedolare-secca election and IMU-related fields. Property income is common
  but a materially separate v1.1.0-scale addition (Quadro B alone runs to
  13 columns across 5 righi plus 3 sub-sections on registered lease
  contracts).
- **Quadro C, Sezione II** (other assimilated income: co.co.co-style
  compensation, family allowances) and **Sezioni V-VIII** (welfare
  aziendale/fringe-benefit reductions, impatriate-worker/researcher tax
  regimes, tip taxation for the tourism/hospitality sector, in-kind
  benefits) — niche relative to ordinary wage/pension income.
- **Quadro D** (redditi di capitale, lavoro autonomo, redditi diversi —
  capital gains, self-employment income, and miscellaneous other income)
  in its entirety.
- **Quadro E, remainder** — vehicle/guide-dog expenses for disability (E4,
  E5), previously-instalmented medical expenses (E6), leasing payments
  (E14), the entire E22-E83 catalog of coded "altri oneri deducibili"/
  "altre detrazioni" (spousal alimony, building-renovation/superbonus/
  sismabonus incentives, energy-efficiency incentives, rent-relief
  deductions for tenants, and more) — by far the largest deferred section
  by row count, but each individual rigo is a narrow, rarely-applicable
  case relative to the four modelled here.
- **Quadro F** (acconti, ritenute, eccedenze — advance-payment
  reconciliation, other withholding, prior-year credit carryforwards) and
  **Quadro G onward** (tax credits, RITA, additional data, regional-surtax
  computation, cryptoasset/foreign-asset reporting, etc.).
- **The 8x1000/5x1000/2x1000 tax-destination elections** (choice of
  religious confession / non-profit / political-party recipient for a
  fraction of IRPEF) — a distinct signature-gated election block, not part
  of the income/deduction core.
- **The second frontespizio module** used when a legal representative,
  guardian, or heir files on behalf of the taxpayer (its own identifying
  data block) — see judgment call 1.
- **Every downstream computed-arithmetic result** (Mod. 730-3, the
  settlement worksheet the withholding agent/Caf/professional produces from
  these inputs) — this schema captures declared inputs only, consistent
  with this registry's established convention (e.g. `pl/mf/zeznanie-pit-37`
  omitting its own computed-arithmetic chain) of not fabricating a
  downstream total from an admittedly incomplete input set.

## Judgment calls

1. **`specialTaxpayerSituation` models only the primary taxpayer's own
   frontespizio casella, not the second frontespizio module.** Per the
   istruzioni ("Dichiarazione presentata da soggetto diverso dal
   contribuente"), when a representative/guardian/heir files on behalf of
   the taxpayer, the paper form requires a *second* frontespizio module
   identifying that other person (their own codice fiscale, name, address,
   etc.) and, for an heir, an additional "Data carica erede" field and a
   "Mod. 730 dipendenti senza sostituto" casella. Modelling that second
   module would roughly double the frontespizio's field count for a
   comparatively rare filing scenario; this v1.0.0 discloses the gap rather
   than silently omitting it, and keeps only the single-casella signal
   (`specialTaxpayerSituation`) on the primary module, matching this
   registry's precedent of a disclosed narrower scope over a fabricated
   full model (e.g. `pl/mf/zeznanie-pit-37`'s joint-filing spouse columns).
2. **The Familiari a carico (dependents) table is simplified relative to
   the live form.** The paper form's row 1 (coniuge/spouse) and rows 2-5
   (up to 4 further dependents) share one physical checkbox-column set
   (C/F1/F/G/D/P) whose available values differ by row (row 1 offers only
   `C`; rows 2-5 offer `F1`/`F`/`G`/`D`/`P`, with `F1` only meaningful on
   row 2 since it denotes the *eldest* dependent child). This schema
   flattens that into a bounded `dependent1`..`dependent4` set (the same
   bounded repeating-group flattening convention this registry has used for
   DK's entrant/child rows and FI's custody-of-children-outside-Finland
   rows), with `dependent1Relationship` offering `primo_figlio` and
   `dependent2-4Relationship` omitting it (since only the first dependent
   row can be the eldest child). The disability flag (`D`) is modelled as
   an independent boolean per the istruzioni's own statement that it "non è
   necessario barrare anche la casella 'F'" when marked — i.e., it is not
   strictly a modifier of the F/F1 checkbox, so keeping it a separate field
   is the more faithful reading. Not modelled: the finer sub-flags for
   pre-adoptive foster placement (affido preadottivo) and the columns
   distinguishing "100%" single-parent detraction claims and joint-custody
   percentage splits beyond the plain `dependentNDeductionPercentage`
   figure — these are real but comparatively narrow refinements on top of
   the modelled core.
3. **`taxReturnFilingMode` is derived from the absence/presence of the
   letter "A" in the "730 senza sostituto" casella, not a directly-labelled
   enum on the form.** The ordinary case (a withholding agent performs the
   year-end adjustment) corresponds to the casella being left blank; this
   schema makes that an explicit `con_sostituto` enum value rather than
   requiring a consumer to infer "blank means ordinary" — a deliberate
   translation of a presence/absence casella into a positive two-value
   enum, disclosed here rather than left implicit.
4. **Money fields use `type: "number"` with only a `minimum: 0` constraint**,
   matching this registry's established convention (e.g.
   `pl/mf/zeznanie-pit-37` judgment call 5) of modelling a split
   euro/cent-box currency amount as one decimal number, rather than a
   stricter cent-precision pattern.
5. **`taxpayerTaxId`/`spouseTaxId`/`dependentNTaxId` use a generic
   16-character alphanumeric pattern (`^[A-Z0-9]{16}$`)**, not the
   full structural codice-fiscale regex (which encodes surname/name
   consonants, birth year/month/day, sex offset, and comune belfiore code
   with a checksum letter). The generic pattern is deliberately chosen to
   avoid silently rejecting a syntactically valid but structurally unusual
   codice fiscale (e.g. a provisionally-assigned numeric-only code for a
   foreign national); this is disclosed rather than presented as a full
   checksum validator.
6. **No `requiredWhen`/conditional-gating rule was fabricated for a
   constraint the sources state only in prose with no actual keyable form
   field.** For example, the istruzioni states dependents' relief
   percentages must sum to specific splits between parents (50/50 by
   default, or 100/0 by agreement) — a real constraint, but not backed by
   any single casella this schema could gate on without inventing a
   synthetic field; it is disclosed in `dependent1DeductionPercentage`'s own
   `description` instead of encoded as a fabricated `crossFieldValidation`
   rule.
7. **`documents[].medicalExpenseDocumentation` and
   `.mortgageInterestDocumentation` use `requiredWhen` with a `greaterThan:
   0` numeric condition**, not a `notEquals ""` string condition against an
   optional field — deliberately avoiding the notEquals-empty-string
   absent-field bug this registry has previously caught (an absent numeric
   field is `undefined`, which `greaterThan` correctly treats as not
   satisfying the condition, unlike a `notEquals ""` check against a field
   that may legitimately be entirely absent).

## Test run (Phase 3)

No live submission was attempted: Modello 730 senza sostituto is filed
through Agenzia delle Entrate's own authenticated portal (via SPID/CIE/CNS
digital identity) or through a Caf/professional intermediary, and the con
sostituto route is filed through the taxpayer's own employer/pension-fund
payroll system — submitting fabricated taxpayer data against Italy's live
tax administration is not a safe or reversible action.

Instead, two fully hand-constructed mock records were built from this
document's own field inventory and validated with a purpose-written script
(`validate_instance.mjs`) that compiles `schema.json`'s own `fields[]`
(`type`/`validation`/`required`) into a JSON Schema draft 2020-12 document
and checks it with `ajv`, plus a from-scratch evaluator for the shared
Condition grammar (leaf `field`/operator, and `all`/`any`/`not`
composition) that checks both `fields[].requiredWhen` and every
`documents[]` entry's static `required`/`requiredWhen` status against a
`documents: [{id, provided}]` array — deliberately checking `documents[]`
requiredness explicitly rather than only `fields[]`, since this registry's
own accumulated experience is that conformance checkers routinely pass "0
errors" while silently skipping `documents[]` altogether.

```
$ node validate_instance.mjs registry/it/agenzia-entrate/modello-730/1.0.0/schema.json \
    conformance/it/agenzia-entrate/modello-730/1.0.0/employed-single-filer-minimal-required-only.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS

$ node validate_instance.mjs registry/it/agenzia-entrate/modello-730/1.0.0/schema.json \
    conformance/it/agenzia-entrate/modello-730/1.0.0/pensioner-with-dependents-mortgage-and-medical-expenses.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: PASS

OVERALL: PASS
```

**Mutation controls** — five negative fixtures, each targeting a distinct
validation rule, run against the same script to confirm it actually catches
violations rather than passing vacuously:

```
$ # mutation-control-missing-required-field.json: 'surname' (required: true) removed
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'surname'
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-missing-required-document.json: 'signatureDeclaration' document omitted
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'signatureDeclaration' is required (static required:true) but not provided
OVERALL: FAIL

$ # mutation-control-missing-conditional-document.json: mortgageInterestAmount/medicalExpenses
$ # both > 0 but medicalExpenseDocumentation/mortgageInterestDocumentation not provided
Static (required/type/pattern/enum) validation: PASS
requiredWhen/documents[] conditional validation: FAIL
 - document 'medicalExpenseDocumentation' is required (requiredWhen matched) but not provided
 - document 'mortgageInterestDocumentation' is required (requiredWhen matched) but not provided
OVERALL: FAIL

$ # mutation-control-enum-violation.json: 'sex' set to 'X' (only 'M'/'F' valid)
Static (required/type/pattern/enum) validation: FAIL
 - /sex must be equal to one of the allowed values
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-pattern-violation.json: 'taxpayerTaxId' shortened to 5 characters
Static (required/type/pattern/enum) validation: FAIL
 - /taxpayerTaxId must match pattern "^[A-Z0-9]{16}$"
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL

$ # mutation-control-range-violation.json: 'dependent1DeductionPercentage' set to 150 (max 100)
Static (required/type/pattern/enum) validation: FAIL
 - /dependent1DeductionPercentage must be <= 100
requiredWhen/documents[] conditional validation: PASS
OVERALL: FAIL
```

The `mutation-control-missing-conditional-document.json` case is the one
that specifically exercises `documents[].requiredWhen` (as opposed to the
plain static-`required` case in `mutation-control-missing-required-document
.json`) — a validator that only checks static `required: true` documents
and ignores conditional `requiredWhen` rules would incorrectly accept this
fixture, which is exactly the gap this fixture exists to catch.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/it/agenzia-entrate/modello-730/1.0.0/schema.json
ok   registry/it/agenzia-entrate/modello-730/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/it/agenzia-entrate/modello-730/1.0.0/schema.json
ok   registry/it/agenzia-entrate/modello-730/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run of both validators (362 documents total, including this
one) also passed clean, and `tools/govschema-client/registry-index.json` was
regenerated via `npm run build-index` (in `tools/govschema-client/`, after
`npm ci --include=dev` since a plain `npm ci` under a local `NODE_ENV=
production` skips `ajv`'s devDependency install) to include this document's
entry.

## Italy's other five verticals (screened this cycle, not authored)

- **DMV**: a strong pre-scouted follow-on candidate exists — Modello
  TT2119, Ministero delle Infrastrutture e dei Trasporti /
  `ilportaledellautomobilista.it`, confirmed unauthenticated, ~13 pages,
  real embedded text layer, no AcroForm widgets, its own lettered/coded
  operation-type table. Not authored this cycle (one-deliverable-per-PR
  convention); tracked in CATALOG.md's Known Gaps section as this cycle's
  next candidate.
- **Passport** (Polizia di Stato Modello 308): the form's actual fillable
  pages are a scanned image with zero extractable text (confirmed via
  `pdfjs-dist` returning no text-content items for those pages); only the
  separate instructions page carries real text. A dead end for this
  specific publishing pattern.
- **Business Formation** (Registro Imprese ComUnica): digital-signature/
  telematic-only, filed via commercialisti (accountant) intermediaries
  through the Camere di Commercio's own telematic channel; no plain
  downloadable fillable modulo for direct citizen use.
- **National ID** (Carta d'Identità Elettronica): fully appointment-based
  at the comune with mandatory in-person biometric capture; no downloadable
  application form for the main flow.
- **Visa** (Farnesina's national D-visa form): a confirmed field-for-field
  duplicate of the already-modelled
  `de/auswaertiges-amt/national-visa-application` EU-harmonized template,
  the same finding this registry has already reached for Poland's and
  Spain's equivalent forms.

See CATALOG.md's Known Gaps & Opportunities section for the full disclosure
of all five.
