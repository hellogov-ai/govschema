# Verification record — `cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Příloha č. 4

This is the recurring "GovSchema Standard Research" cycle (**GOV-1998**). The
already-published base return, `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`
(GOV-1826), explicitly named and deferred this exact document in its own
`description`:

> "It deliberately does NOT model: Příloha č. 1 (self-employment income, §7
> zákona), Příloha č. 2 (rental and other income, §9/§10 zákona), Příloha č. 3
> (foreign-source income tax computation, §38f zákona), **Příloha č. 4
> (separate tax base, §16a zákona)**, ..."

The already-published Příloha č. 3 (`cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici`,
GOV-1991) independently flagged this exact document as the sole remaining open
backlog candidate in its own `description`/`verification.notes` and
CATALOG.md's own Executive Summary update ("Příloha č. 4 (separate tax base,
§16a zákona) is now the sole remaining open backlog candidate in this
companion-schedule sequence"). This document closes that gap: a companion
schedule to the already-published base return, the same pattern this registry
has used eleven times for Canton Zürich's `ch/zh/sta/hilfsblatt-*`/companion-
schedule family and three times already for this same base return (Přílohy č.
1-3). It does not open a new vertical or jurisdiction — the Czech Republic
remains at 4 of 6 verticals (Business Formation, DMV, Visa, Taxes). This
closes the base return's own companion-schedule backlog (Přílohy č. 1-4)
entirely.

## Edition discovery

`financnisprava.gov.cz`'s own "Daňové tiskopisy" listing page,
<https://financnisprava.gov.cz/cs/dane/danove-tiskopisy>, was fetched directly
(HTTP 200, no login/CAPTCHA/WAF gate — the same page every prior CZ cycle has
used) and searched for its own Příloha č. 4 entry. This confirms:

- Two editions of `25 5405/P4` are currently listed: **vzor č. 12**
  (`5405-P4_12.pdf`) and **vzor č. 13** (`5405-P4_13.pdf`). Following the same
  convention established by Přílohy č. 1-3 (each of which also listed two
  editions on this page, e.g. Příloha č. 3's vzor č. 21 alongside its current
  vzor č. 22), the **higher-numbered edition, vzor č. 13, is the current
  one** — confirmed directly by its own printed cover text, "za zdaňovací
  období 2026 – 25 5405 MFin 5405 vzor č. 30" (the same base-return edition
  Přílohy č. 1-3 all cite as current).
- An English-language variant, `5405-P4a_12.pdf`, is also listed, one edition
  behind the current Czech vzor č. 13 — the same one-edition lag Příloha č.
  3's own `5405-P3a_21.pdf` (vs. current vzor č. 22) showed.

This document's own `source.url` cites
`https://financnisprava.gov.cz/assets/tiskopisy/5405-P4_13.pdf`, fetched fresh
this cycle.

## Sources examined

- **Document `(id, version)`:** `cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerstvo financí (MFin), operated by Finanční správa
  České republiky — identical to the base return's own `authority` and to
  Přílohy č. 1-3's own `authority`.
- **Primary source:**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405-P4_13.pdf> — "25
  5405/P4 MFin 5405/P4 - vzor č. 13," fetched directly this cycle (HTTP 200,
  **153,862 bytes**, `%PDF`, 2 pages per its own page count). A raw
  byte-level scan for the literal strings `/AcroForm` and `/Widget` returned
  **zero** matches for both — a flat print/reference facsimile PDF, the same
  shape as the base return and Přílohy č. 1-3.
- **This annex's own embedded instructions.** Page **2** of this same 2-page
  PDF prints a self-contained "**POKYNY K PŘÍLOZE č. 4**" section restating
  every numbered line's purpose and statutory basis directly — confirmed by
  direct `pdfjs-dist` text extraction of both pages in one pass. This is this
  document's sole and sufficient explanatory source; no second PDF was needed
  to explain any field on this annex, the same pattern as Přílohy č. 1-3.
- **Extraction method.** `pdfjs-dist` v3 (`legacy/build/pdf.js`, loaded via a
  scratch npm install since the repo's own `tools/` workspace does not vendor
  it) `getTextContent()` for body text and `getAnnotations()` filtered to
  `subtype === 'Widget'` for the AcroForm-field check, the same
  reviewer-confirmed technique used across this registry's PDF-based
  schemas. Both pages extracted cleanly with no garbling and zero Widget
  annotations.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Line-by-line classification (ř. 401-414)

- **ř. 401** — raw taxpayer-entered amount, no formula →
  **`foreignPartnershipIncomeSection7`** (field).
- **ř. 401a** — raw taxpayer-entered amount; its own instructions describe a
  netting the filer applies before entry (loan/credit interest, net of
  interest paid to fund that loan/credit), but no formula referencing another
  numbered line → **`foreignCapitalIncomeSection8`** (field).
- **ř. 402** — raw taxpayer-entered amount, no formula →
  **`foreignOtherIncomeSection10`** (field).
- **ř. 403** — raw taxpayer-entered amount (expenses), no formula →
  **`expensesForPrizeIncomeSection10`** (field).
- **ř. 404** — raw taxpayer-entered amount, no formula →
  **`foreignSettlementLiquidationIncome`** (field).
- **ř. 405** — raw taxpayer-entered amount (expenses), no formula →
  **`expensesForSettlementLiquidationIncome`** (field).
- **ř. 406** ("Úhrn dílčího samostatného základu daně podle § 7 a dílčího
  samostatného základu daně podle § 8 zákona (ř. 401 + ř. 401a po snížení
  podle § 8 odst. 9 zákona)") — see the dedicated scope decision below: **not**
  treated as pure arithmetic → **`section7Section8CombinedBase`** (field).
- **ř. 407** ("Dílčí samostatný základ daně z příjmů podle § 10 odst. 1 písm.
  h) bod 1, ch) a o) zákona (ř. 402 – ř. 403)") — formula references *only*
  ř. 402 and ř. 403, both already-modelled fields on this same annex, with no
  external operand and no "nebo" branching → **excluded** as pure arithmetic
  (`foreignOtherIncomeSection10 − expensesForPrizeIncomeSection10`).
- **ř. 408** ("Dílčí samostatný základ daně z příjmů podle § 10 odst. 1 písm.
  f) a písm. g) zákona (ř. 404 – ř. 405)") — formula references *only* ř. 404
  and ř. 405, both already-modelled fields → **excluded** as pure arithmetic
  (`foreignSettlementLiquidationIncome − expensesForSettlementLiquidationIncome`).
- **ř. 409** ("Součet dílčích základů daně (ř. 406 + ř. 407 + ř. 408)
  zaokrouhlený na celá sta Kč dolů") — formula references ř. 406 (an
  already-modelled field), ř. 407, and ř. 408 (both excluded above but
  purely derivable from other already-modelled fields on this same annex) —
  no operand outside this document → **excluded** as pure arithmetic
  (`section7Section8CombinedBase + (foreignOtherIncomeSection10 −
  expensesForPrizeIncomeSection10) + (foreignSettlementLiquidationIncome −
  expensesForSettlementLiquidationIncome)`, rounded down to whole hundreds of
  CZK).
- **ř. 410** ("Daň se sazbou 15 % ze součtu dílčích základů daně (ř. 409) -
  uveďte vypočtenou daňovou povinnost") — formula references *only* ř. 409
  (excluded above, itself purely derivable), multiplied by the fixed 15%
  statutory rate — no external operand, no branching → **excluded** as pure
  arithmetic.
- **ř. 411** — raw taxpayer-selected subset, no unconditional formula (see
  the dedicated scope decision below) → **`incomeEligibleForForeignTaxCredit`**
  (field).
- **ř. 412** — raw taxpayer-entered amount, no formula →
  **`foreignTaxPaidOnCreditEligibleIncome`** (field).
- **ř. 413** ("Daň uznaná k zápočtu (ř. 412 maximálně do výše 15 % z částky
  uvedené na ř. 411)") — `min(foreignTaxPaidOnCreditEligibleIncome, 0.15 ×
  incomeEligibleForForeignTaxCredit)`, both already-modelled fields on this
  same annex, no external operand → **excluded** as pure arithmetic.
- **ř. 414** ("Daň ze samostatného základu daně podle § 16a zákona (ř. 410 –
  ř. 413)") — both ř. 410 and ř. 413 are excluded above but purely derivable
  from other already-modelled fields on this same annex, with no external
  operand and no "nebo" branching → **excluded** as pure arithmetic. Its own
  instructions direct the filer to carry this result, rounded up to whole
  CZK, to the base return's own ř. 74a, 5. oddíl — a cross-document transfer,
  not modelled here (consistent with every other CZ annex's own treatment of
  its own transfer-out line).

## Scope decision: ř. 406 is modelled as its own field, not pure arithmetic

Every other pure-sum/difference line on this annex (ř. 407, 408, 409, 413,
414) is excluded because it is **fully and unconditionally** derivable from
other already-modelled fields on this same document, with no operand this
registry does not capture anywhere. Ř. 406 is different: its own printed
formula is "ř. 401 + ř. 401a **po snížení podle § 8 odst. 9 zákona**" (after
reduction per §8 odst. 9 zákona) — a reduction applied **at this line**,
distinct from the loan/credit-interest netting `foreignCapitalIncomeSection8`'s
(ř. 401a's) own instructions already describe for entering that line. No
field on this annex captures the §8 odst. 9 expense amount itself; it is
never a separately printed line anywhere on this 2-page document. Because
this line's own formula depends on an adjustment this registry has no
field to hold, `ř. 401 + ř. 401a` alone cannot be guaranteed to equal ř. 406
in every case — the same reasoning Příloha č. 3 applied to its own ř. 314
(excluded from pure-arithmetic treatment because one of its operands, an
odčitatelné-položky amount, is never captured as its own field). `ř. 406` is
therefore modelled as its own field, **`section7Section8CombinedBase`**, one
the filer computes off this schema and enters directly — the more
conservative reading, and the one this document's own field description
discloses. A future review should re-examine whether §8 odst. 9 zákona's own
expense categories are common enough among likely filers of this annex to
warrant modelling as a dedicated field of their own.

## Scope decision: ř. 411 is modelled as its own field, not derived from ř. 406-408

Ř. 411's own label ("Úhrn příjmů, u nichž se uplatní zápočet – z příjmů
uvedených na ř. 406, ř. 407 a ř. 408") reads, at first glance, like an
aggregate of ř. 406 + 407 + 408. It is not: it is the **taxpayer-selected
subset** of that combined income for which the ordinary foreign-tax-credit
method is actually being claimed. A taxpayer may hold foreign-source income
within this annex's scope for which no foreign tax was withheld at all (so no
credit is claimed for that portion), meaning ř. 411 can be strictly less than
ř. 406 + ř. 407 + ř. 408. This annex's own instructions confirm the
plain-language framing ("uveďte úhrn příjmů, tj. dílčích samostatných základů
daně ... u nichž se uplatní zápočet" — "state the sum of the partial separate
tax bases ... for which the credit is applied"), not a printed arithmetic
formula with a "(ř. X + ř. Y)" notation the way every genuinely pure-arithmetic
line on this annex carries. `ř. 411` is therefore modelled as its own field,
**`incomeEligibleForForeignTaxCredit`**.

## Field-by-field source mapping

- **Strana (1), header** ("Rodné číslo:") → `birthNumber`.
- **1. Výpočet daně ze samostatného základu daně podle § 16a zákona (ř.
  401-414)** → `foreignPartnershipIncomeSection7` (401),
  `foreignCapitalIncomeSection8` (401a), `foreignOtherIncomeSection10` (402),
  `expensesForPrizeIncomeSection10` (403), `foreignSettlementLiquidationIncome`
  (404), `expensesForSettlementLiquidationIncome` (405),
  `section7Section8CombinedBase` (406), `incomeEligibleForForeignTaxCredit`
  (411), `foreignTaxPaidOnCreditEligibleIncome` (412). Ř. 407, 408, 409, 410,
  413, and 414 pure arithmetic — see classification above.

## Mock-data test run

This annex has no discriminator field (a filer reports whichever of the three
income categories applies), and no live filing wizard exists for this
PDF-based annex — the same limitation the base return and Přílohy č. 1-3 all
disclose. One worked, internally-consistent scenario was constructed instead,
and every excluded line re-derived by hand.

### Scenario — "Hana Dvořáková," German dividend income (§8) and a UK lottery prize (§10)

`birthNumber = "8002151234"`.

- `foreignPartnershipIncomeSection7 = 0` — no §7 odst. 14 partnership income
  this scenario.
- `foreignCapitalIncomeSection8 = 300000` — dividend income from a German
  public company, converted to CZK, electing the flat 15% separate-tax-base
  rate under §16a zákona instead of folding it into the base return's own
  progressive computation (so it is *not* also entered on the base return's
  own `capitalIncomeTaxBase`, ř. 38).
- `foreignOtherIncomeSection10 = 150000` — a UK National Lottery prize,
  converted to CZK.
- `expensesForPrizeIncomeSection10 = 0` — no remuneration-for-work-use
  component in a lottery prize (unlike, e.g., a public-competition prize for
  an entered creative work), so no offsetting expense.
- `foreignSettlementLiquidationIncome = 0`, `expensesForSettlementLiquidationIncome = 0`
  — no §10 odst. 1 písm. f)/g) income this scenario.
- `section7Section8CombinedBase = 300000` — ř. 401 (0) + ř. 401a (300,000),
  with no §8 odst. 9 zákona reduction applicable this scenario (the dividend
  income is not within §8 odst. 1 písm. e)/f) zákona), so this field equals
  the unadjusted sum. Verified: consistent with the formula given no
  applicable §8/9 reduction this scenario.
- ř. 407 (derived, not stored) = 150,000 − 0 = **150,000**.
- ř. 408 (derived, not stored) = 0 − 0 = **0**.
- ř. 409 (derived, not stored) = round-down-to-hundreds(300,000 + 150,000 +
  0) = **450,000** (already a round hundred).
- ř. 410 (derived, not stored) = 450,000 × 15 / 100 = **67,500**.
- `incomeEligibleForForeignTaxCredit = 150000` — only the UK lottery prize had
  foreign tax withheld this scenario (the German dividend's own withholding
  was separately reclaimed under the CZ-DE treaty and is not credited here,
  by this taxpayer's choice); the credit-eligible subset is therefore strictly
  less than ř. 406 + ř. 407 + ř. 408 (450,000), confirming ř. 411 is not a
  pure aggregate — see the scope decision above.
- `foreignTaxPaidOnCreditEligibleIncome = 30000` — 20% UK withholding on the
  lottery prize, evidenced by HMRC's own confirmation of payment.
- ř. 413 (derived, not stored) = min(30,000, 0.15 × 150,000) = min(30,000,
  22,500) = **22,500** (the credit is capped; 7,500 Kč of UK tax is not
  creditable this scenario).
- ř. 414 (derived, not stored) = 67,500 − 22,500 = **45,000**, rounded up to
  whole CZK (already whole) — transferred by the filer to the base return's
  own ř. 74a.
- **Result: OK.** Every excluded line (ř. 407-410, 413, 414) re-derives
  correctly by hand from this scenario's own field values, and the scenario
  specifically exercises the case the scope decision above flags —
  `incomeEligibleForForeignTaxCredit` strictly less than the sum of ř. 406-408
  — confirming that field cannot be safely treated as derived.

### Negative control — §7 partnership income only, no credit claimed

A taxpayer with only `foreignPartnershipIncomeSection7` populated (say,
80,000 Kč) and every other field left blank/zero validates structurally
against this schema (every field is `required: false`, no
`requiredWhen`), since ř. 409 (450,000 → n/a here, would instead be 80,000
rounded down to hundreds) and ř. 410 (12,000) still derive correctly from
that single field, and `incomeEligibleForForeignTaxCredit`/
`foreignTaxPaidOnCreditEligibleIncome` are correctly left unset when no
foreign tax was withheld on this income at all. This confirms the schema
does not force a filer using only one of the three income categories to
populate fields belonging to the others, nor to claim a credit that does not
apply.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane/1.0.0/schema.json
ok   registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane/1.0.0/schema.json
ok   registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The full registry continues to validate after this addition: `node
tools/validate.mjs` and `node tools/validate-ajv.mjs` (run with no arguments,
scoping the whole registry) both report **311/311 document(s)** passed — 310
pre-existing schema documents plus this one (the mapping.json companions are
unaffected: 3/3 pass both before and after).

## What is NOT modelled (out of scope), and why

- **ř. 407, ř. 408, ř. 409, ř. 410, ř. 413, ř. 414** — each a pure arithmetic
  function of other fields already captured on this same annex; see the
  line-by-line classification above.
- **The §8 odst. 9 zákona expense reduction applied at ř. 406** — not its own
  field; the annex prints no dedicated line for it, and it is subsumed into
  the filer-entered `section7Section8CombinedBase` value — see the dedicated
  scope decision above.
- **The cross-document transfer to the base return** (ř. 414's result to ř.
  74a) — the base return's own schema does not model that destination line,
  per its own documented exclusion of every downstream computed line;
  consistent with every other CZ annex's own treatment of its own
  transfer-out line.
- **The mutual-exclusivity relationship with the base return's own
  `capitalIncomeTaxBase` (ř. 38)** — described in
  `foreignCapitalIncomeSection8`'s own field description and this document's
  top-level `description`, but not enforced as a `crossFieldValidation` rule,
  since the two are fields on two separate documents this spec version has no
  cross-document constraint mechanism for.
- **A separate signature/filing-date block** — this annex has none of its
  own; it is filed as a physical/electronic attachment to the base return,
  which alone carries the DAP's one signature. Confirmed by searching this
  annex's own extracted text for "podpis"/"datum vyhotovení" — zero matches
  across both pages, the same finding Přílohy č. 1-3's own cycles made.

## Judgment calls

1. **Ř. 407, 408, 409, 410, 413, 414 are excluded as pure arithmetic**, each
   derivable entirely from other fields already modelled on this same annex
   with no external/base-return operand and no "nebo" branching — see the
   line-by-line classification above for the full reasoning per line.
2. **Ř. 406 is modelled as its own field** despite carrying a printed
   "(ř. 401 + ř. 401a ...)" formula, because that same formula also names a
   further §8 odst. 9 zákona reduction this registry has no field for — the
   more conservative reading; see the dedicated scope decision above.
3. **Ř. 411 is modelled as its own field**, not derived from ř. 406-408,
   because it is the taxpayer's own selected credit-eligible subset of that
   combined income, not a printed sum of those lines — see the dedicated
   scope decision above.
4. **`birthNumber` is modelled as optional**, mirroring the base return's and
   Přílohy č. 1-3's own `birthNumber` field and its own disclosed reasoning.
5. **Amounts are modelled as plain `number` fields in whole CZK**, per this
   annex's own repeated instruction ("Částky uveďte v celých Kč") for
   entered amounts, the same convention as the base return and Přílohy č.
   1-3.
6. **No `crossFieldValidation` rules were added** — every field on this
   annex is independently optional (a filer may hold income under any
   combination of the three source categories, or none), the same reasoning
   the base return's and Přílohy č. 1-3's own VERIFICATION.md give for
   omitting `crossFieldValidation`.
7. **No live submission was attempted** — filing a real Czech personal
   income tax return annex is a real legal act with a real national tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `financnisprava.gov.cz` was reachable directly from this
environment with plain `curl` for the listing page and this annex's own
current PDF edition — no TCP-level reset, WAF, or CAPTCHA gate encountered,
consistent with the base return's and Přílohy č. 1-3's own findings for the
same domain.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is a companion-schedule addition to an already-published Taxes-vertical
  document (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`), not a new
  vertical or jurisdiction; the Czech Republic remains at 4 of 6 verticals.
- `id` uses the same `cz/mf` authority-directory segment as the base return
  and Přílohy č. 1-3 (Ministerstvo financí), with a slug,
  `priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane`, ASCII-folded from
  the annex's own printed subtitle ("výpočet daně ze samostatného základu
  daně"), consistent with this registry's existing CZ naming convention of
  using the form's own official title/subtitle as the slug.
- Conditional requiredness (`requiredWhen`) is not used in this document —
  like Přílohy č. 2-3, this annex has no discriminator field gating groups of
  other fields; every field is independently, unconditionally optional.
- No `edition` member is used, consistent with the base return's and Přílohy
  č. 1-3's own treatment (this annex, like all four, is hosted at a
  version-independent URL that is simply replaced each tax year, not a
  registry-modelled edition axis).
- This closes the base return's own companion-schedule backlog (Přílohy č.
  1-4) entirely; the Czech Republic's own remaining open verticals are
  Passport and National ID, both confirmed dead ends (in-person-only, no
  citizen-facing application form) per GOV-1819/GOV-1826's own findings.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the base return and Přílohy č. 1-3. Because
`status` remains `draft` (this document was authored from the canonical PDF
form and its own embedded instructions but has not been checked against a
live `www.mojedane.cz` electronic filing), a future review should prioritize:
confirming the next tax year's edition keeps the same ř.-number scheme,
re-confirming the §8 odst. 9 zákona reduction and the credit-cap floor
described above have not changed, and re-examining whether §8 odst. 9
zákona's own expense categories are common enough to warrant their own
dedicated field (see the ř. 406 scope decision above).
