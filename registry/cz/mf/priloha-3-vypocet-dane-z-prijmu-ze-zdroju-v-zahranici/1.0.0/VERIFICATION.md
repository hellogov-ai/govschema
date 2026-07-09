# Verification record — `cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Příloha č. 3

This is the recurring "GovSchema Standard Research" cycle (**GOV-1991**). The
already-published base return, `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`
(GOV-1826), explicitly named and deferred this exact document in its own
`description`:

> "It deliberately does NOT model: Příloha č. 1 (self-employment income, §7
> zákona), Příloha č. 2 (rental and other income, §9/§10 zákona), **Příloha
> č. 3 (foreign-source income tax computation, §38f zákona)**, Příloha č. 4
> (separate tax base, §16a zákona), ..."

The already-published Příloha č. 2 (`cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy`,
GOV-1984) independently flagged the same gap as one of the two sole remaining
open backlog candidates in its own `description`/`verification.notes` and
CATALOG.md's own Executive Summary update ("Příloha č. 3-4 (foreign-source
income, separate tax base) now the sole remaining open backlog candidates in
this companion-schedule sequence"). This document closes the Příloha č. 3
share of that gap: a companion schedule to the already-published base return,
the same pattern this registry has used eleven times for Canton Zürich's
`ch/zh/sta/hilfsblatt-*`/companion-schedule family and twice already for this
same base return (Přílohy č. 1-2). It does not open a new vertical or
jurisdiction — the Czech Republic remains at 4 of 6 verticals (Business
Formation, DMV, Visa, Taxes).

## Edition discovery

`financnisprava.gov.cz`'s own "Daňové tiskopisy" listing page,
<https://financnisprava.gov.cz/cs/dane/danove-tiskopisy>, was fetched directly
(HTTP 200, no login/CAPTCHA/WAF gate — the same page every prior CZ cycle has
used) and searched for its own Příloha č. 3 entry. This confirms:

- The **current Příloha č. 3** is listed at vzor č. 22
  (`https://financnisprava.gov.cz/assets/tiskopisy/5405-P3_22.pdf`), the same
  edition number as Přílohy č. 1-2 (also both vzor č. 22) — all three
  companion annexes to the same base return (25 5405 MFin 5405, vzor č. 30).
- Příloha č. 4 (vzor č. 13) is also listed on the same page, confirming it
  remains the sole genuinely open backlog candidate in this companion-schedule
  sequence for a future cycle.

This document's own `source.url` cites
`https://financnisprava.gov.cz/assets/tiskopisy/5405-P3_22.pdf`, fetched fresh
this cycle.

## Sources examined

- **Document `(id, version)`:** `cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerstvo financí (MFin), operated by Finanční správa
  České republiky — identical to the base return's own `authority` and to
  Přílohy č. 1-2's own `authority`.
- **Primary source:**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405-P3_22.pdf> — "25
  5405/P3 MFin 5405/P3 - vzor č. 22," fetched directly this cycle (HTTP 200,
  **142,013 bytes**, `%PDF`, 2 pages per its own page count). A raw
  byte-level scan for the literal strings `/AcroForm` and `/Widget` returned
  **zero** matches for both — a flat print/reference facsimile PDF, the same
  shape as the base return and Přílohy č. 1-2.
- **This annex's own embedded instructions.** Page **2** of this same 2-page
  PDF prints a self-contained "**POKYNY K PŘÍLOZE č. 3**" section restating
  every numbered line's purpose and statutory basis directly — confirmed by
  direct `pdfjs-dist` text extraction of both pages in one pass. This is this
  document's sole and sufficient explanatory source; no second PDF was needed
  to explain any field on this annex, the same pattern as Přílohy č. 1-2.
- **Extraction method.** `pdfjs-dist` (`legacy/build/pdf.mjs`) `getTextContent()`
  for body text and `getAnnotations()` filtered to `subtype === 'Widget'` for
  the AcroForm-field check, the same reviewer-confirmed technique used across
  this registry's PDF-based schemas. Both pages extracted cleanly with no
  garbling and zero Widget annotations.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Structural note: this annex references base-return lines the base return itself does not model

Every formula printed on this annex (ř. 311-330) is expressed in terms of
either (a) another line on this same annex, or (b) a line on the **base
return** (ř. 36, 41, 42, 44, 54, 56, 57) — but the base return's own schema
explicitly excludes every one of those lines as a downstream computed
subtotal (confirmed by grepping that document's own `sourceRef` values: no
`ř. 36`, `ř. 41`, `ř. 42`, `ř. 44`, `ř. 54`, `ř. 56`, or `ř. 57` appears
anywhere in `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/schema.json`).
This means an "A minus B" or "A divided by B" formula printed on this annex
cannot always be treated as pure arithmetic derivable from already-modelled
fields — in most cases here, one or both operands are values this registry
does not model anywhere. The rule this document applies, adapted from the
same principle Přílohy č. 1-2 used (exclude a line only when it is fully and
unconditionally derivable from *other fields already captured on this same
document*):

- If a line's formula references **only fields already modelled on this
  annex**, with no external/base-return operand and no "ř. X nebo ř. Y"
  branching, it is **excluded** as pure arithmetic.
- If a line's formula references **any base-return line** (never modelled
  anywhere in this registry) or uses "**ř. X nebo ř. Y**" (or) branching
  between an external line and an internal one, it is **modelled as its own
  field** — the filer computes it off-schema using the base return's own
  figures and enters the result, the same treatment this annex's own
  instructions assume ("na tomto řádku uveďte ...").

## Line-by-line classification (ř. 311-330)

**Section 1 — exemption with progression reservation (§38f odst. 7 zákona):**

- **ř. 311** — formula references ř. 36 (base return, unmodelled) →
  **`exemptForeignIncomeAfterSection6`** (field).
- **ř. 312** — formula references ř. 41 (base return, unmodelled) →
  **`exemptForeignIncomeAfterSection7To10`** (field). Its own instructions
  state a negative result is a loss, carried by the filer to the base
  return's own ř. 61 — a cross-document transfer, not modelled here (the same
  treatment as every other CZ annex's own cross-document transfer lines).
- **ř. 313** ("Základ daně po vynětí ... (ř. 311 + kladný ř. 312)") — formula
  references *only* ř. 311 and ř. 312, both already-modelled fields on this
  same annex, with no external operand and no "nebo" branching → **excluded**
  as pure arithmetic (`exemptForeignIncomeAfterSection6 +
  max(0, exemptForeignIncomeAfterSection7To10)`).
- **ř. 314** — formula references ř. 313 (internal, excluded) minus ř. 54 and
  ř. 44 (both base return, unmodelled) → **`taxBaseAfterExemptionNetOfDeductions`**
  (field).
- **ř. 315** ("Sazba celkového daňového zatížení (ř. 57 děleno ř. 56)") —
  formula references *only* ř. 57 and ř. 56, both base return, unmodelled →
  **`overallTaxRatePercent`** (field).
- **ř. 316** ("Daň ze základu daně po vynětí ... (ř. 314 násobeno ř. 315,
  děleno 100)") — formula references *only* ř. 314 and ř. 315, both
  already-modelled fields on this same annex → **excluded** as pure
  arithmetic (`taxBaseAfterExemptionNetOfDeductions × overallTaxRatePercent /
  100`).
- Ř. 317-320 are printed "neobsazeny" (unoccupied/reserved) — not modelled,
  the same treatment Příloha č. 1 gave its own ř. 103/ř. 111.

**Section 2 — ordinary tax-credit method (§38f odst. 8 zákona):**

- **Kód státu** (country-code header, associated with this whole section) →
  **`countryCode`** (field).
- **ř. 321-323** — raw taxpayer-entered amounts, no formula → **`foreignIncomeCreditMethod`**,
  **`foreignExpensesCreditMethod`**, **`foreignTaxPaidCreditMethod`** (fields).
- **ř. 324** ("Koeficient zápočtu (ř. 321 – ř. 322) děleno (ř. 42 nebo ř.
  313) ...") — the denominator branches between ř. 42 (base return,
  unmodelled) and ř. 313 (internal, but itself excluded as arithmetic) — since
  the ř. 42 branch is possible and ř. 42 is never modelled anywhere, this line
  is not unconditionally derivable from already-modelled fields alone →
  **`creditCoefficientPercent`** (field). Its own instructions also disclose a
  floor-at-zero override for a negative result, beyond pure arithmetic.
- **ř. 325** ("... {(ř. 57 nebo ř. 316) násobeno ř. 324 děleno 100}") — the
  first operand branches between ř. 57 (base return, unmodelled) and ř. 316
  (internal, excluded) → **`maxCreditableForeignTax`** (field).
- **ř. 326** ("Daň uznaná k zápočtu (ř. 323 maximálně však do výše ř. 325)")
  — `min(foreignTaxPaidCreditMethod, maxCreditableForeignTax)`, both already
  modelled fields on this same annex, no external operand → **excluded** as
  pure arithmetic.
- **ř. 327** ("Rozdíl řádků (ř. 323 – ř. 326)") — `foreignTaxPaidCreditMethod
  − ř.326`, both terms resolvable purely from already-modelled fields on this
  same annex (ř. 326 itself being excluded-but-derivable) → **excluded** as
  pure arithmetic.
- **ř. 328** ("Daň uznaná k zápočtu (úhrn řádků 326 i ze samostatných
  listů)") — an aggregate across this annex's own ř. 326 **and** the
  equivalent line of every supplementary per-country Samostatný list Přílohy
  č. 3, a repeating structure this registry does not model (GovSchema v0.3
  has no array/repeating-field type, per GSP-0009) → not derivable purely
  from this single document instance → **`totalCreditedTaxAllCountries`**
  (field).
- **ř. 329** ("Daň neuznaná k zápočtu (úhrn řádků 327 i ze samostatných
  listů)") — same reasoning as ř. 328 (an aggregate across an unmodelled
  repeating structure) → **`totalNonCreditedTaxAllCountries`** (field).
- **ř. 330** ("Vypočtená částka [(ř. 57 nebo ř. 316) – ř. 328]") — the first
  operand again branches between ř. 57 (base return, unmodelled) and ř. 316
  (internal, excluded) → **`finalForeignSourceTaxComputationResult`** (field).
  Its own instructions direct the filer to carry this result to the base
  return's own ř. 58 — a cross-document transfer, not modelled here.

## Field-by-field source mapping

- **Strana (1), header** ("Rodné číslo:") → `birthNumber`.
- **Oddíl 1 — vynětí s výhradou progrese (ř. 311-316)** →
  `exemptForeignIncomeAfterSection6` (311), `exemptForeignIncomeAfterSection7To10`
  (312), `taxBaseAfterExemptionNetOfDeductions` (314), `overallTaxRatePercent`
  (315). Ř. 313 and ř. 316 pure arithmetic — see classification above.
- **Strana (1), Oddíl 2 header** ("Kód státu") → `countryCode`.
- **Oddíl 2 — zápočet daně zaplacené v zahraničí (ř. 321-330)** →
  `foreignIncomeCreditMethod` (321), `foreignExpensesCreditMethod` (322),
  `foreignTaxPaidCreditMethod` (323), `creditCoefficientPercent` (324),
  `maxCreditableForeignTax` (325), `totalCreditedTaxAllCountries` (328),
  `totalNonCreditedTaxAllCountries` (329), `finalForeignSourceTaxComputationResult`
  (330). Ř. 326 and ř. 327 pure arithmetic — see classification above.

## Mock-data test run

Because this annex has no required discriminator field (a filer may use the
exemption method only, the credit method only, or both, per country), one
worked, internally-consistent scenario covering both sections was constructed
and every excluded line re-derived by hand — no live filing wizard exists for
this PDF-based annex, the same limitation the base return and Přílohy č. 1-2
both disclose.

### Scenario — "Pavel Novotný," German employment income (exemption method) and Austrian dividend/royalty income (credit method)

`birthNumber = "7503241122"`.

**Section 1 — exemption with progression (German employment income exempted under the CZ-DE treaty, Art. 22):**

- `exemptForeignIncomeAfterSection6 = 420000` (the base return's own ř. 36,
  after excluding the German-source employment income already exempted).
- `exemptForeignIncomeAfterSection7To10 = 60000` (the base return's own ř.
  41, after the same exclusion — no foreign §7-§10 income exempted this
  scenario beyond what is already reflected, a positive figure here).
- ř. 313 (derived, not stored) = 420,000 + max(0, 60,000) = **480,000**.
- `taxBaseAfterExemptionNetOfDeductions = 477600` — 480,000 minus the
  taxpayer's own §15/§34 deductions (2,400 Kč total this scenario), rounded
  down to whole hundreds: 477,600 (already a round hundred). Verified: exact.
- `overallTaxRatePercent = 15.00` — the base return's own ř. 57 (72,000 Kč)
  divided by ř. 56 (480,000 Kč), times 100 = 15.00%. Verified: exact
  (72,000 / 480,000 × 100 = 15).
- ř. 316 (derived, not stored) = 477,600 × 15.00 / 100 = **71,640**.

**Section 2 — ordinary tax credit (Austrian dividend/royalty income, CZ-AT treaty):**

- `countryCode = "AT"`.
- `foreignIncomeCreditMethod = 100000`, `foreignExpensesCreditMethod = 10000`
  (no expenses claimed against the royalty portion beyond a flat 10,000 Kč).
- `foreignTaxPaidCreditMethod = 12000` (12% Austrian withholding, evidenced
  by the Austrian tax authority's own confirmation).
- `creditCoefficientPercent = 18.75` — (100,000 − 10,000) divided by ř. 313
  (480,000, since the exemption method above was also used this scenario),
  times 100 = 90,000 / 480,000 × 100 = 18.75%. Verified: exact.
- `maxCreditableForeignTax = 13432.50` — ř. 316 (71,640, since the exemption
  method above was also used) × 18.75 / 100 = 13,432.50. Verified: exact.
- ř. 326 (derived, not stored) = min(12,000, 13,432.50) = **12,000** (the
  full Austrian tax is creditable, since it does not exceed the cap).
- ř. 327 (derived, not stored) = 12,000 − 12,000 = **0** (nothing left
  uncredited from this country).
- `totalCreditedTaxAllCountries = 12000` — no supplementary per-country
  sheets this scenario (only Austria), so this equals ř. 326 exactly.
  Verified: exact.
- `totalNonCreditedTaxAllCountries = 0` — likewise equals ř. 327 exactly, no
  supplementary sheets. Verified: exact.
- `finalForeignSourceTaxComputationResult = 59640` — ř. 316 (71,640, since the
  exemption method above was also used) minus totalCreditedTaxAllCountries
  (12,000) = 59,640. Verified: exact. Transferred by the filer to the base
  return's own ř. 58.
- **Result: OK.** Every excluded line (ř. 313, 316, 326, 327) re-derives
  correctly by hand from this scenario's own field values; the "nebo"
  branching on ř. 324/ř. 325/ř. 330 correctly resolves to the internal ř.
  313/ř. 316 branch (not the external ř. 42/ř. 57 branch) because this
  scenario uses both relief methods together, exercising the case the
  instructions themselves flag as the more complex of the two branches.

### Negative control — single-country credit method only, no exemption method used

A filer with only Austrian dividend income and no exempted foreign employment
income leaves every Section 1 field blank and instead computes
`creditCoefficientPercent`/`maxCreditableForeignTax`/`finalForeignSourceTaxComputationResult`
from the base return's own ř. 42/ř. 57 directly (the external branch of each
"nebo," per that field's own description) — structurally valid against this
schema, since every field is `required: false` and none carries a
`requiredWhen`. This confirms the schema does not force a filer using only one
relief method to populate fields belonging to the other.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici/1.0.0/schema.json
ok   registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici/1.0.0/schema.json
ok   registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The full registry continues to validate after this addition: `node
tools/validate.mjs` and `node tools/validate-ajv.mjs` (run with no arguments,
scoping the whole registry) both report **310/310 document(s)** passed — 309
pre-existing schema documents plus this one (the mapping.json companions are
unaffected: 3/3 pass both before and after).

## What is NOT modelled (out of scope), and why

- **ř. 313, ř. 316, ř. 326, ř. 327** — each a pure arithmetic function of
  other fields already captured on this same annex; see the line-by-line
  classification above.
- **Ř. 317-320** — printed "(neobsazeny)" (unoccupied/reserved) with no
  content, the same treatment Příloha č. 1 gave its own ř. 103/ř. 111.
- **The itemized detail of any supplementary per-country Samostatný list
  Přílohy č. 3** — a separate sheet per additional foreign country, a
  repeating structure this registry has no way to express (GSP-0009); its own
  aggregate contribution is captured in `totalCreditedTaxAllCountries`/
  `totalNonCreditedTaxAllCountries`.
- **The cross-document transfers to the base return** (ř. 312's loss to ř.
  61; ř. 330's result to ř. 58) — the base return's own schema does not model
  either destination line, per its own documented exclusion of every
  downstream computed line; consistent with every other CZ annex's own
  treatment of its own transfer-out lines.
- **A separate signature/filing-date block** — this annex has none of its
  own; it is filed as a physical/electronic attachment to the base return,
  which alone carries the DAP's one signature. Confirmed by searching this
  annex's own extracted text for "podpis"/"datum vyhotovení" — zero matches
  across both pages, the same finding Přílohy č. 1-2's own cycles made.
- **Příloha č. 4** (separate tax base, §16a zákona) — a distinct annex,
  unaffected by this cycle; still the sole open backlog candidate.

## Judgment calls

1. **Ř. 313, 316, 326, 327 are excluded as pure arithmetic**, each derivable
   entirely from other fields already modelled on this same annex with no
   external/base-return operand and no "nebo" branching — see the line-by-line
   classification above for the full reasoning per line.
2. **Ř. 311, 312, 314, 315, 324, 325, 330 are modelled as their own fields**,
   despite each carrying a printed formula, because each formula's operands
   include a base-return line this registry never models (ř. 36, 41, 42, 44,
   54, 56, 57 — confirmed absent from the base return's own `sourceRef`
   values) or branch ("nebo") to such a line — the filer computes these off
   this schema using the base return's own figures and enters the result,
   consistent with how this annex's own instructions describe each line
   ("na tomto řádku uveďte ...", never "vypočte se automaticky").
3. **`totalCreditedTaxAllCountries`/`totalNonCreditedTaxAllCountries` are kept
   as explicit aggregate fields** rather than derived, since each is defined
   by the annex's own instructions as a sum across this document and any
   number of supplementary per-country sheets this registry cannot represent
   as a repeating structure (GSP-0009) — the same reasoning Příloha č. 2 gave
   for keeping its own `otherIncomeTotal`/`otherExpensesTotal` as explicit
   aggregates over a collapsed table.
4. **`countryCode` is modelled as a single field**, describing in its own
   text that a filer with income from more than one foreign country repeats
   ř. 321-327 (but not ř. 328-330, which are annex-wide totals) on a separate
   Samostatný list per additional country — the same "collapse repeating
   structure, describe the multiplicity in prose" convention this registry
   has used since Příloha č. 1's own additional-activities table.
5. **`birthNumber` is modelled as optional**, mirroring the base return's and
   Přílohy č. 1-2's own `birthNumber` field and its own disclosed reasoning.
6. **Amounts are modelled as plain `number` fields in whole CZK** (except
   `creditCoefficientPercent`/`overallTaxRatePercent`, both percentages, and
   `maxCreditableForeignTax`, which this annex's own printed formula can
   yield as a non-whole-Kč intermediate value before final rounding), per
   this annex's own repeated instruction ("Částky uveďte v celých Kč") for
   final entered amounts, the same convention as the base return and Přílohy
   č. 1-2.
7. **No `crossFieldValidation` rules were added** — every field on this annex
   is either independently optional (a filer may use one relief method,
   both, or neither if no foreign income exists) or, where a formula spans
   fields, the formula is documented in that field's own `description` rather
   than expressed as an enforceable rule, the same reasoning the base
   return's and Přílohy č. 1-2's own VERIFICATION.md give for omitting
   `crossFieldValidation`.
8. **No live submission was attempted** — filing a real Czech personal
   income tax return annex is a real legal act with a real national tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `financnisprava.gov.cz` was reachable directly from this
environment with plain `curl` for the listing page and this annex's own
current PDF edition — no TCP-level reset, WAF, or CAPTCHA gate encountered,
consistent with the base return's and Přílohy č. 1-2's own findings for the
same domain.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is a companion-schedule addition to an already-published Taxes-vertical
  document (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`), not a new
  vertical or jurisdiction; the Czech Republic remains at 4 of 6 verticals.
- `id` uses the same `cz/mf` authority-directory segment as the base return
  and Přílohy č. 1-2 (Ministerstvo financí), with a slug,
  `priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici`, ASCII-folded from
  the annex's own printed subtitle ("výpočet daně z příjmů ze zdrojů v
  zahraničí"), consistent with this registry's existing CZ naming convention
  of using the form's own official title/subtitle as the slug.
- Conditional requiredness (`requiredWhen`) is not used in this document —
  like Příloha č. 2, this annex has no discriminator field gating groups of
  other fields; every field is independently, unconditionally optional.
- No `edition` member is used, consistent with the base return's and Přílohy
  č. 1-2's own treatment (this annex, like all three, is hosted at a
  version-independent URL that is simply replaced each tax year, not a
  registry-modelled edition axis).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the base return and Přílohy č. 1-2. Because
`status` remains `draft` (this document was authored from the canonical PDF
form and its own embedded instructions but has not been checked against a
live `www.mojedane.cz` electronic filing), a future review should prioritize:
confirming the next tax year's edition keeps the same ř.-number scheme and
the same set of base-return lines (ř. 36, 41, 42, 44, 54, 56, 57) still
absent from that document's own schema, re-confirming the credit-coefficient
floor-at-zero override and the §34 odst. 1 loss-deduction cap on ř. 314 have
not changed, and re-screening whether Příloha č. 4 has become a tractable
next-cycle candidate.
