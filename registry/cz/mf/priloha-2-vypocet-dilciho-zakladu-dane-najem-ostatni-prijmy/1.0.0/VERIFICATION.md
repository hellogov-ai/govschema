# Verification record — `cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Příloha č. 2

This is the recurring "GovSchema Standard Research" cycle (**GOV-1984**). The
already-published base return, `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`
(GOV-1826), explicitly named and deferred this exact document in its own
`description`:

> "It deliberately does NOT model: Příloha č. 1 (self-employment income, §7
> zákona), **Příloha č. 2 (rental and other income, §9/§10 zákona)**, Příloha
> č. 3 (foreign-source income tax computation, §38f zákona), Příloha č. 4
> (separate tax base, §16a zákona), ..."

The already-published Příloha č. 1 (`cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost`,
GOV-1977) independently flagged the same gap as the next open backlog
candidate in its own VERIFICATION.md ("Příloha č. 2, 3, 4 ... still open
backlog candidates") and CATALOG.md's own Known Gaps section. This document
closes the Příloha č. 2 share of that gap: a companion schedule to the
already-published base return, the same pattern this registry has used
eleven times for Canton Zürich's `ch/zh/sta/hilfsblatt-*`/companion-schedule
family and once already for this same base return (Příloha č. 1). It does not
open a new vertical or jurisdiction — the Czech Republic remains at 4 of 6
verticals (Business Formation, DMV, Visa, Taxes).

## Edition discovery

`financnisprava.gov.cz`'s own "Daňové tiskopisy" listing page,
<https://financnisprava.gov.cz/cs/danove-tiskopisy>, was fetched directly
(HTTP 200, no login/CAPTCHA/WAF gate — the same page every prior CZ cycle has
used) and searched for its own Příloha č. 2 entry. This confirms:

- The **current Příloha č. 2** is listed at vzor č. 22
  (`https://financnisprava.gov.cz/assets/tiskopisy/5405-P2_22.pdf`), the same
  edition number as Příloha č. 1 (also vzor č. 22) — both companion annexes
  to the same base return (25 5405 MFin 5405, vzor č. 30).
- An English-language courtesy translation, "Příloha č. 2a," is also listed
  (vzor č. 21) — not itself an authoritative source, and not used here; this
  document is sourced from the Czech-language original.
- Příloha č. 3 (vzor č. 22) and Příloha č. 4 (vzor č. 13) are also listed on
  the same page, confirming they remain the two genuinely open backlog
  candidates in this companion-schedule sequence for a future cycle.

This document's own `source.url` cites
`https://financnisprava.gov.cz/assets/tiskopisy/5405-P2_22.pdf`, fetched
fresh this cycle.

## Sources examined

- **Document `(id, version)`:** `cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerstvo financí (MFin), operated by Finanční správa
  České republiky — identical to the base return's own `authority` and to
  Příloha č. 1's own `authority`.
- **Primary source:**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405-P2_22.pdf> — "25
  5405/P2 MFin 5405/P2 - vzor č. 22," fetched directly this cycle (HTTP 200,
  **164,914 bytes**, `%PDF-1.6`, 2 pages per its own page count). A raw
  byte-level scan for the literal strings `/AcroForm` and `/Widget` returned
  **zero** matches for both — a flat print/reference facsimile PDF, the same
  shape as the base return and Příloha č. 1.
- **This annex's own embedded instructions.** Page **2** of this same 2-page
  PDF prints a self-contained "**POKYNY K PŘÍLOZE č. 2**" section restating
  every numbered line's purpose and statutory basis directly — confirmed by
  direct `pdfjs-dist` text extraction of both pages in one pass. This is this
  document's sole and sufficient explanatory source; no second PDF was needed
  to explain any field on this annex, the same pattern as Příloha č. 1.
- **Extraction method.** `pdfjs-dist` (`legacy/build/pdf.mjs`) `getTextContent()`
  for body text and `getAnnotations()` filtered to `subtype === 'Widget'` for
  the AcroForm-field check, the same reviewer-confirmed technique used across
  this registry's PDF-based schemas (and reused, unmodified, from the same
  `/tmp` working setup Příloha č. 1's own cycle used). Both pages extracted
  cleanly with no garbling and zero Widget annotations.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Scope decision: ř. 203 IS pure arithmetic — a disclosed contrast with Příloha č. 1's ř. 104

Příloha č. 1's own ř. 104 ("Rozdíl mezi příjmy a výdaji (ř. 101 – ř. 102) nebo
výsledek hospodaření (zisk, ztráta)") carries a genuine, disclosed exception:
its own embedded instructions state explicitly that a full-accounting-method
filer enters an independently-derived accounting result directly, bypassing
ř. 101/ř. 102 entirely.

This annex's own **ř. 203** ("Rozdíl mezi příjmy a výdaji (ř. 201 – ř. 202)
nebo výsledek hospodaření před zdaněním (zisk, ztráta)") is worded almost
identically — but its own embedded instructions give no equivalent
alternative-entry language anywhere. The full text of this annex's own ř. 203
instruction reads, in its entirety:

> "ř. 203 Rozdíl mezi příjmy a výdaji (ř. 201 – ř. 202) nebo výsledek
> hospodaření před zdaněním – (zisk, ztráta) – uveďte výpočet podle údajů v
> tiskopisu. Údaje jsou uváděny před úpravou podle § 5, § 23 zákona a ostatní
> úpravy podle zákona. V případě, že výdaje přesahují příjmy nebo výsledek
> hospodaření před zdaněním je ztráta, částku označte znaménkem minus."

"Uveďte výpočet podle údajů v tiskopisu" (enter the calculation per the
form's own data) directs the filer to compute the line from the form's own
data — it does not say, as Příloha č. 1's ř. 104 instructions did, that an
accounting-basis filer instead enters an independent figure and may leave the
inputs blank. This annex also has no record-keeping-method discriminator
checkbox anywhere on it (unlike Příloha č. 1's `bookkeepingMethod`), which
would be the natural place to disclose such a branch if one existed. §9
zákona (rental income) itself does not offer účetnictví (full accounting) as
a distinct method the way §7 (self-employment) does — a landlord may claim
either actual, evidenced expenses or the flat 30% rate, with no third
accounting-basis option — consistent with the absence of any such
instruction here.

**ř. 203 is therefore treated as pure computed arithmetic**
(`rentalIncomeTotal − rentalExpenses`) and excluded as a field, the base-return
convention — a **deliberate, disclosed difference in treatment** from
Příloha č. 1's structurally similar-looking ř. 104, not an oversight or an
inconsistency between the two documents.

## Scope decision: ř. 206 and ř. 209 excluded as pure arithmetic

- **ř. 206** ("Dílčí základ daně, daňová ztráta z nájmu podle § 9 zákona") =
  ř. 203 + ř. 204 − ř. 205 = `(rentalIncomeTotal − rentalExpenses) +
  rentalAdjustmentsIncreasingAmount − rentalAdjustmentsDecreasingAmount`. The
  annex's own instructions direct: "Údaj přeneste na ř. 39, 2. oddílu,
  základní části DAP na str. 2" (transfer to ř. 39 of the base return's own
  basic section — a line the base return's own schema does not itself model,
  consistent with its own documented exclusion of every computed downstream
  line).
- **ř. 209** ("Dílčí základ daně připadající na ostatní příjmy podle § 10
  zákona") = ř. 207 − ř. 208 = `otherIncomeTotal − otherExpensesTotal`. The
  annex's own instructions direct: "Údaj přeneste do ř. 40, 2. oddílu,
  základní části DAP na str. 2" (transfer to ř. 40 there).

Neither is modelled as a field, per this registry's established treatment of
a printed line that is a pure arithmetic function of other already-captured
fields (see Příloha č. 1's own treatment of its ř. 113, and the base return's
own treatment of every downstream computed line).

## Scope decision: the § 10 "type of other income" table collapsed to a free-text summary

The § 10 (ostatní příjmy) table prints exactly 4 numbered data rows (plus one
"Úhrn kladných rozdílů" total row) — a small, bounded row count, but each
row's own "Druh příjmů podle § 10 odst. 1 zákona" (type of income) is a
**filer-composed description** (the annex's own instructions direct the
filer to write out a plain-language description prefixed with one of 8
lettered categories, A through H), not a fixed, pre-printed category label
the way Příloha č. 1's own 9-row Oddíl 2.D balance-sheet worksheet was (each
of those 9 rows names a specific, pre-printed balance-sheet category —
hmotný majetek, peněžní prostředky, etc. — the reason that worksheet was
modelled field-by-field rather than collapsed).

Per this registry's established convention (collapse filer-named/
filer-composed repeating rows; model only fixed, pre-printed category rows
individually), all 4 rows — each carrying a type code/description, income,
expenses, difference, and optional special code — are collapsed into one
free-text field, `otherIncomeItemsSummary`. The two bounded aggregate totals
feeding from that table, ř. 207 (`otherIncomeTotal`) and ř. 208
(`otherExpensesTotal`), are each modelled individually, consistent with
Příloha č. 1's own treatment of `adjustmentsIncreasingAmount`/
`adjustmentsDecreasingAmount` as individually-modelled aggregates over a
collapsed itemization.

## Scope decision: the cadastral-office decision number folded into the § 10 summary, not modelled as its own field

The annex's own instructions state a "Číslo rozhodnutí katastrálního úřadu"
(cadastral office decision number) box must be completed only conditionally —
when the § 10 table includes a category-B (sale of real estate) row, or a row
carrying the special code "n" (gratuitous/gift income that is real estate).
Because this value is intrinsically a per-row detail of the already-collapsed
§ 10 table (relevant to at most some of its rows, never the annex as a
whole), it is folded into `otherIncomeItemsSummary`'s own field description
and worked example, rather than modelled as a separate top-level field that
would be `requiredWhen` a table row-level condition this schema has no way to
express (GovSchema v0.3 has no array/repeating-field type, per GSP-0009 — the
same limitation the base return's own dependent-children fields and Příloha
č. 1's own collapsed tables already work within).

## Field-by-field source mapping

- **Strana (1), header** ("Rodné číslo:") → `birthNumber`.
- **Strana (1), Oddíl 1 header (checkboxes)** → `flatRateRentalExpenseElection`
  ("Uplatňuji výdaje procentem z příjmů (30 %)"), `jointMaritalPropertyRentalIncome`
  ("Dosáhl jsem příjmů ze společného jmění manželů").
- **Oddíl 1 — § 9 nájem (ř. 201-206)** → `rentalIncomeTotal` (201),
  `rentalIncomeFromImmovablePropertyOnly` (201a), `rentalExpenses` (202),
  `rentalAdjustmentsIncreasingAmount` (204), `rentalAdjustmentsDecreasingAmount`
  (205). ř. 203 and ř. 206 pure arithmetic — see scope decisions above.
- **Strana (1), box beside ř. 206 ("Rezervy")** → `rentalPropertyReservesStart`,
  `rentalPropertyReservesEnd`.
- **Oddíl 2 — § 10 ostatní příjmy table (ř. 207-209)** →
  `otherIncomeItemsSummary` (the table's own itemized rows, including the
  conditional cadastral-office decision number), `otherIncomeTotal` (207),
  `otherExpensesTotal` (208). ř. 209 pure arithmetic — see scope decision
  above.

## Mock-data test run

Because this annex has no required discriminator field (a filer may have
rental income only, other income only, or both — every field is
independently optional), one worked, internally-consistent scenario covering
both sections was constructed and every computed line re-derived by hand, the
same style of hand-evaluation Příloha č. 1's own VERIFICATION.md used (no
live filing wizard exists for this PDF-based annex, the same limitation the
base return and Příloha č. 1 both disclose).

### Scenario — "Marie Horáková," rental of an apartment plus a one-off property sale and freelance income

`birthNumber = "8607152345"`.

**§ 9 rental income:**

- `flatRateRentalExpenseElection = true` (Marie claims the flat 30% rate
  rather than actual expenses). `jointMaritalPropertyRentalIncome = false`
  (the apartment is in her sole name).
- `rentalIncomeTotal = 180000` (annual rent received on one apartment).
  `rentalIncomeFromImmovablePropertyOnly = 180000` (the apartment is
  immovable property — the full amount of ř. 201 qualifies).
- `rentalExpenses = 54000` — the flat 30% rate applied to `rentalIncomeTotal`:
  0.30 × 180,000 = 54,000 Kč, under the CZK 600,000 cap. Verified: exact.
- ř. 203 (derived, not stored) = 180,000 − 54,000 = **126,000**.
- `rentalAdjustmentsIncreasingAmount = 0`, `rentalAdjustmentsDecreasingAmount = 0`
  (no §5/§23 adjustments apply this year).
- ř. 206 (derived, not stored) = 126,000 + 0 − 0 = **126,000**. Transfers to
  the base return's own ř. 39.
- `rentalPropertyReservesStart = 0`, `rentalPropertyReservesEnd = 0` (no
  reserves held against the rented property).

**§ 10 other income:**

- `otherIncomeItemsSummary = "1. B – prodej nemovitosti: prodej chaty
  (nebyla obývána jako bydliště, vlastněna méně než 10 let), příjmy 500 000
  Kč, výdaje (pořizovací cena a technické zhodnocení) 420 000 Kč, rozdíl
  80 000 Kč; číslo rozhodnutí katastrálního úřadu V-1234/2026-708. 2. A –
  příležitostná činnost: honorář za jednorázový překladatelský úkol, příjmy
  15 000 Kč, výdaje (prokázané) 15 000 Kč, rozdíl 0 Kč."`
- `otherIncomeTotal = 515000` — sum of each row's own income: 500,000 +
  15,000 = 515,000. Verified: exact.
- `otherExpensesTotal = 435000` — sum of each row's own expenses, each capped
  at that row's own income (neither row's expenses exceed its own income
  here, so both are included in full): 420,000 + 15,000 = 435,000. Verified:
  exact.
- ř. 209 (derived, not stored) = 515,000 − 435,000 = **80,000**. Transfers to
  the base return's own ř. 40.
- **Result: OK.** Every field's arithmetic re-derives correctly by hand;
  `otherIncomeItemsSummary`'s row 2 (difference = 0) exercises the "expenses
  equal income" edge case ř. 208's own instruction addresses (a loss on one
  row may not offset a gain on another; here there is simply no loss to
  offset).

### Negative control — no fields present

An entirely empty payload (no rental or other-income fields at all) is
structurally valid against this schema: every field is `required: false` and
none carries a `requiredWhen`, correctly reflecting that this annex is filed
only by a taxpayer who has rental and/or other income in the first place —
consistent with the base return's own treatment of every annex as
conditionally attached, not with every annex field as unconditionally
present.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy/1.0.0/schema.json
ok   registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy/1.0.0/schema.json
ok   registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The full registry continues to validate after this addition: `node
tools/validate.mjs` and `node tools/validate-ajv.mjs` (run with no arguments,
scoping the whole registry) both report **309/309 document(s)** passed —
308 pre-existing schema documents plus this one (the mapping.json companions
are unaffected: 3/3 pass both before and after).

## What is NOT modelled (out of scope), and why

- **ř. 203** (rozdíl mezi příjmy a výdaji z nájmu, or výsledek hospodaření) —
  pure arithmetic per this document's own disclosed contrast with Příloha č.
  1's ř. 104; see scope decision above.
- **ř. 206, ř. 209** (dílčí základ daně z nájmu; dílčí základ daně z
  ostatních příjmů) — both pure arithmetic; see scope decision above.
- **The § 10 table's own itemized per-row detail** (type code/description,
  income, expenses, difference, special code, cadastral decision number) —
  collapsed into `otherIncomeItemsSummary`; its own bounded totals are
  `otherIncomeTotal`/`otherExpensesTotal` (ř. 207/208).
- **A separate signature/filing-date block** — this annex has none of its
  own; it is filed as a physical/electronic attachment to the base return,
  which alone carries the DAP's one signature. Confirmed by searching this
  annex's own extracted text for "podpis"/"datum vyhotovení" — zero matches
  across both pages, the same finding Příloha č. 1's own cycle made.
- **Příloha č. 3, 4** (foreign-source income tax computation, separate tax
  base) — each a distinct annex, unaffected by this cycle; still open
  backlog candidates.

## Judgment calls

1. **ř. 203 is excluded as pure arithmetic**, a deliberate, disclosed
   departure from Příloha č. 1's own treatment of its structurally
   similar-looking ř. 104 (modelled as its own field there) — see the scope
   decision above for the full textual comparison underpinning this
   difference.
2. **The § 10 income-type table's 4 rows are collapsed to one free-text
   field**, since each row is filer-composed (a written description plus a
   letter-category prefix), unlike Příloha č. 1's own Oddíl 2.D worksheet
   (9 fixed, pre-printed category rows, modelled individually).
3. **The cadastral-office decision number is folded into
   `otherIncomeItemsSummary`** rather than given its own top-level field,
   since it is conditional on a specific row of the already-collapsed § 10
   table, not on the annex as a whole.
4. **`birthNumber` is modelled as optional**, mirroring the base return's and
   Příloha č. 1's own `birthNumber` field and its own disclosed reasoning.
5. **Amounts are modelled as plain `number` fields in whole CZK**, per this
   annex's own repeated instruction ("Částky uveďte v celých Kč"), the same
   convention as the base return and Příloha č. 1.
6. **No `crossFieldValidation` rules were added** — this annex's fields are
   either independently optional or (in the case of `otherIncomeItemsSummary`'s
   own conditional sub-detail) not independently addressable given the
   collapsed-table modelling, the same reasoning the base return's and
   Příloha č. 1's own VERIFICATION.md give for omitting `crossFieldValidation`.
7. **No live submission was attempted** — filing a real Czech personal
   income tax return annex is a real legal act with a real national tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline.

## Access notes

No access blocks: `financnisprava.gov.cz` was reachable directly from this
environment with plain `curl` for the listing page and this annex's own
current PDF edition — no TCP-level reset, WAF, or CAPTCHA gate encountered,
consistent with the base return's and Příloha č. 1's own findings for the
same domain.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is a companion-schedule addition to an already-published Taxes-vertical
  document (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`), not a new
  vertical or jurisdiction; the Czech Republic remains at 4 of 6 verticals.
- `id` uses the same `cz/mf` authority-directory segment as the base return
  and Příloha č. 1 (Ministerstvo financí), with a slug,
  `priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy`, ASCII-folded
  from the annex's own printed subtitle ("výpočet dílčích základů daně z
  příjmů z nájmu (§ 9 zákona) a z ostatních příjmů (§ 10 zákona)"), consistent
  with this registry's existing CZ naming convention of using the form's own
  official title/subtitle as the slug.
- Conditional requiredness (`requiredWhen`) is not used in this document —
  unlike Příloha č. 1, this annex has no discriminator field gating groups of
  other fields; every field is independently, unconditionally optional.
- No `edition` member is used, consistent with the base return's and Příloha
  č. 1's own treatment (this annex, like both, is hosted at a
  version-independent URL that is simply replaced each tax year, not a
  registry-modelled edition axis).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the base return and Příloha č. 1. Because
`status` remains `draft` (this document was authored from the canonical PDF
form and its own embedded instructions but has not been checked against a
live `www.mojedane.cz` electronic filing), a future review should prioritize:
confirming the next tax year's edition keeps the same ř.-number scheme and
the same treatment of ř. 203 (no accounting-basis exception), re-confirming
the flat rental expense rate (30%, capped at 600,000 Kč) has not changed, and
re-screening whether Příloha č. 3 or Příloha č. 4 has become a tractable
next-cycle candidate.
