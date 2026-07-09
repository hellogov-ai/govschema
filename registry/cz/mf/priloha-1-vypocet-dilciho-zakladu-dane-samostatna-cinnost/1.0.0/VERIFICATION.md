# Verification record — `cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up Příloha č. 1

This is the recurring "GovSchema Standard Research" cycle (**GOV-1977**). The
already-published base return, `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`
(GOV-1826), explicitly named and deferred this exact document in its own
`description` and its own VERIFICATION.md's "What is NOT modelled" section:

> "Příloha č. 1 (self-employment/business income, §7 zákona, up to ř. 113) —
> a distinct, larger, independently-published PDF; left as an open backlog
> candidate."

This document closes that gap: a companion schedule to the already-published
base return, the same pattern this registry has used ten times for Canton
Zürich's `ch/zh/sta/hilfsblatt-*` family. It does not open a new vertical or
jurisdiction — the Czech Republic remains at 4 of 6 verticals (Business
Formation, DMV, Visa, Taxes).

## Edition discovery: the two candidate URLs supplied at cycle start were stale

The cycle brief supplied two candidate URLs, found via search, with an
explicit instruction to verify they were current before relying on them:

- `https://financnisprava.gov.cz/assets/cs/prilohy/fs-financni-sprava-cr/priloha-1-k_priznani-z-prijmu-FO.pdf`
- `https://financnisprava.gov.cz/assets/cs/prilohy/dt-upozorneni-mf-k-tiskopisum/25_5405-1_MFin-5405-1_vzor25.pdf`

Both were fetched (HTTP 200 for both) and their own printed text was
extracted and read directly, rather than trusting the URL path alone:

- The first prints, on its own page 1: **"za zdaňovací období 2016 – 25 5405
  MFin 5405 vzor č. 23"** and its own annex-specific edition stamp, **"25
  5405/P1 MFin 5405/P1 - vzor č. 12"**.
- The second prints, on its own page 1: **"25 5405/1 MFin 5405/1 - vzor č.
  25"**, "za zdaňovací období (kalendářní rok) **2017**", referencing a base
  return of "vzor č. 24" — a full nine tax years and roughly a decade behind
  the currently-published base return (tax year 2026, vzor č. 30).

Both candidate URLs were therefore **superseded editions**, not the current
Příloha č. 1. Per the cycle's own instruction, `financnisprava.gov.cz`'s own
"Daňové tiskopisy" listing page,
<https://financnisprava.gov.cz/cs/dane/danove-tiskopisy>, was fetched directly
instead (HTTP 200, 1,182,024 bytes of HTML, no login/CAPTCHA/WAF gate — the
same page every prior CZ cycle has used) and every `href` containing `5405`
was extracted and inspected against its own on-page label/edition-number
columns. This confirms:

- The **base return** is listed as "25 5405 — Přiznání k dani z příjmů
  fyzických osob — vzor č. 30" — matching the already-published schema's own
  `source.documentRef` exactly, confirming the listing page is itself current.
- The **current Příloha č. 1** is listed as "25 5405/P1 — Příloha č. 1 k
  Přiznání k dani z příjmů fyzických osob - výpočet dílčího základu daně z
  příjmů z podnikání a z jiné samostatné výdělečné činnosti (§ 7 zákona) —
  vzor č. 22" (`https://financnisprava.gov.cz/assets/tiskopisy/5405-P1_22.pdf`),
  one edition ahead of an immediately-preceding "vzor č. 21" also listed on
  the same page (i.e. the listing page itself surfaces both the current and
  the prior edition side by side, and vzor č. 22 is unambiguously the higher/
  newer of the two).
- The general instructions to the base return, "25 5405/1 — Pokyny k
  vyplnění Přiznání k dani z příjmů fyzických osob — vzor č. 34", is the
  identical document (`5405-1_34.pdf`, 222,475 bytes — byte-identical size to
  the file already cited by the base return's own `source`) the base return's
  own schema already cites; this cycle independently re-fetched it and
  confirms it does **not** itself carry per-line explanations for Příloha č.
  1 (see "Sources examined" below) — this annex's own embedded instructions
  are the authoritative explanatory source instead.

This document's own `source.url` therefore cites
`https://financnisprava.gov.cz/assets/tiskopisy/5405-P1_22.pdf` (vzor č. 22),
fetched fresh this cycle, not either of the two originally-supplied URLs.

## Sources examined

- **Document `(id, version)`:** `cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerstvo financí (MFin), operated by Finanční správa
  České republiky — identical to the base return's own `authority`.
- **Primary source:**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405-P1_22.pdf> — "25
  5405/P1 MFin 5405/P1 - vzor č. 22," fetched directly this cycle (HTTP 200,
  **217,704 bytes**, `%PDF-1.6`, 4 pages per its own page count). A raw
  byte-level scan for the literal strings `/AcroForm` and `/Widget` returned
  **zero** matches for both — a flat print/reference facsimile PDF, the same
  shape as the base return itself, confirmed by the same technique the base
  return's own VERIFICATION.md used.
- **This annex's own embedded instructions.** Unlike the base return (which
  needs a separate Pokyny document), pages **3-4** of this same 4-page PDF
  print a self-contained "**POKYNY K PŘÍLOZE č. 1**" section restating every
  numbered line's purpose and statutory basis directly — confirmed by direct
  `pdfjs-dist` text extraction of all 4 pages in one pass. This is this
  document's sole and sufficient explanatory source; no second PDF was needed
  to explain any field on this annex.
- **Cross-check against the base return's own general Pokyny (negative
  finding).** <https://financnisprava.gov.cz/assets/tiskopisy/5405-1_34.pdf>
  ("25 5405/1 MFin 5405/1 - vzor č. 34," 222,475 bytes — the same file the
  base return's own `source` already cites) was independently re-fetched and
  extracted this cycle and searched for "Příloh"/"přílohy" mentions: it
  refers to Přílohy only in the general sense of the base DAP's own
  attachment checklist and page count ("Přílohy DAP – součástí DAP jsou i
  přílohy vyznačené v příslušném tiskopise"), never with per-line, per-ř.
  explanatory content for this specific annex's own ř. 101-113. This confirms
  the annex's own embedded Oddíl "POKYNY K PŘÍLOZE č. 1" (Strany (3)-(4)) is
  not a redundant duplicate of anything already covered elsewhere, and is the
  correct, sufficient source for this document's own field descriptions.
- **Extraction method.** `pdfjs-dist` (`legacy/build/pdf.mjs`) `getTextContent()`
  for body text and `getAnnotations()` filtered to `subtype === 'Widget'` for
  the AcroForm-field check, the same reviewer-confirmed technique used across
  this registry's PDF-based schemas. Both PDFs extracted cleanly across all
  pages with no garbling and zero Widget annotations.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Scope decision: ř. 113 excluded as pure arithmetic; ř. 103/111 excluded as unoccupied

Per this registry's established treatment of a printed line that is a pure
arithmetic function of other already-captured fields (see the base return's
own VERIFICATION.md and its own table of excluded computed lines), **ř. 113**
("Dílčí základ daně (ztráta) z příjmů podle § 7 zákona") is not itself
modelled as a field. Its own printed formula, reproduced here for
completeness and in `differenceIncomeExpensesOrProfitLoss`'s sibling field
descriptions:

```
ř. 113 = ř. 104 + ř. 105 − ř. 106 − ř. 107 + ř. 108 + ř. 109 − ř. 110 + ř. 112
       = differenceIncomeExpensesOrProfitLoss + adjustmentsIncreasingAmount
         − adjustmentsDecreasingAmount − incomeShareAllocatedToCollaboratingPerson
         + expensesShareAllocatedToCollaboratingPerson + incomeShareAsCollaboratingPerson
         − expensesShareAsCollaboratingPerson + partnerShareInPartnership
```

A result below zero is a dílčí ztráta (partial loss) under §7 zákona. This
value transfers to the base return's own ř. 37 (2. oddíl, základní část DAP),
per the annex's own printed instruction ("Údaj přeneste na ř. 37, 2. oddílu,
základní části DAP na stranu 2").

**ř. 103** and **ř. 111** are both printed "(neobsazeno)" (unoccupied/
reserved) on the form, with the annex's own instructions stating plainly "Pro
zdaňovací období 2026 nevyplňujte" (do not complete for the 2026 tax year) —
neither carries any content and neither is modelled.

## Scope decision: ř. 104 is NOT pure arithmetic — a genuine, disclosed exception

Unlike every downstream line on the base return (all pure arithmetic, per
that document's own VERIFICATION.md), this annex's own **ř. 104** ("Rozdíl
mezi příjmy a výdaji (ř. 101 – ř. 102) nebo výsledek hospodaření (zisk,
ztráta)") is **not** always derivable from ř. 101/ř. 102 alone. The annex's
own embedded instructions state explicitly:

> "Poplatníci vedoucí daňovou evidenci a poplatníci, kteří nevedou účetnictví,
> uvedou rozdíl mezi příjmy a výdaji a poplatníci, kteří vedou účetnictví,
> uvedou výsledek hospodaření před zdaněním."

That is: a taxpayer on the **daňová evidence** (tax records) or **výdaje
procentem** (flat-rate expense) method reports ř. 104 as ř. 101 − ř. 102 (pure
arithmetic in that case) — but a taxpayer keeping **full accounting**
(účetnictví) instead enters their own independently-derived accounting
profit/loss (výsledek hospodaření) directly, and the instructions for ř. 101
and ř. 102 themselves both separately confirm the accounting-basis filer
completes ř. 104 directly and may leave ř. 101/ř. 102 blank ("Vedete-li
účetnictví, vyplňte výsledek hospodaření před zdaněním – (zisk, ztráta) do ř.
104"). Because ř. 104 can be a genuinely independent, directly-entered figure
for one of the three record-keeping methods, this document models it as its
own field, `differenceIncomeExpensesOrProfitLoss`, marked `required: true`
(it is always present one way or the other) rather than excluding it as
computed — a disclosed, deliberate departure from the base-return pattern of
excluding every "A minus B" printed line.

## Scope decision: `bookkeepingMethod` models a literally-printed three-way checkbox

Unlike `ch/zh/sta/hilfsblatt-b`'s own `berichtsart` (which had to be added as
an *inferred*, unprinted discriminator), this annex's own record-keeping
method **is** a literal, printed set of three checkboxes ("Vedu daňovou
evidenci" / "Vedu účetnictví" / "Uplatňuji výdaje procentem z příjmů"), with
its own printed footnote confirming single-select: "Z předtištěných možností
v rámečku vyberte odpovídající variantu a označte křížkem" (select the
corresponding option from the pre-printed choices and mark it with a cross).
This document models it directly as the required enum field
`bookkeepingMethod` (`danova-evidence` / `ucetnictvi` / `vydaje-procentem`),
gating: `annualNetTurnover` and the interpretation of
`differenceIncomeExpensesOrProfitLoss`/`incomeSection7`/
`expensesRelatedToSection7Income` (`ucetnictvi`); the entire Oddíl 2.D
tax-records balance-sheet worksheet (`danova-evidence`); and the per-activity
rate/income/expense fields in Oddíl 2.B (`vydaje-procentem`).

## Scope decision: the Oddíl 2.D tax-records worksheet's 9 named rows modelled individually, not collapsed

Oddíl 2.D ("Tabulka pro poplatníky, kteří vedou daňovou evidenci podle § 7b
zákona") prints exactly **9 fixed, named** balance-sheet line items (hmotný
majetek, peněžní prostředky v hotovosti, peněžní prostředky na bankovních
účtech, zásoby, pohledávky, ostatní majetek, dluhy, rezervy, mzdy), each with
a start-of-year and end-of-year column — a small, closed, fixed-category
table, not a filer-named or unbounded one. Per this registry's convention
(collapse only unbounded/filer-named repeating rows; model fixed, small,
named categories individually — see e.g. `ch/zh/sta/hilfsblatt-b`'s own
Ziffer 4 "Besondere Leistungen," modelled field-by-field rather than
collapsed), all 18 values (9 rows × 2 columns) are modelled as individual
fields. Three rows (peněžní prostředky v hotovosti, peněžní prostředky na
bankovních účtech, ostatní majetek) are marked with a printed "*)" footnote,
"Označené údaje jsou nepovinné" (marked data are optional) — those 6 fields
(`cashOnHandStart/End`, `bankAccountBalanceStart/End`, `otherAssetsStart/End`)
therefore carry no `requiredWhen`, unlike the other 12 fields in this section
which are `requiredWhen` `bookkeepingMethod` equals `danova-evidence`.

The annex's own embedded instructions ("K řádku 1" through "K řádku 9")
describe only the **end-of-year** figure's own methodology explicitly for
each row (e.g. "na konci zdaňovacího období se uvádí zůstatková cena hmotného
majetku..."); no equivalent explicit methodology is printed for the
start-of-year column. This document reads the start-of-year column, per this
registry's disclosed convention for an implied opening balance (see e.g.
`ch/zh/sta/hilfsblatt-b`'s own treatment of Ziffer 3.1's Buchwert
Jahresanfang), as the prior year's own closing figure carried forward — a
disclosed, not certain, interpretation, noted individually in each Start
field's own description.

## Scope decision: unbounded/filer-named repeating tables collapsed to free-text summaries

Per this registry's established convention (see the base return's own
`dependentChildrenDetails` and every CH-ZH companion schedule's own
`*Summary` fields), the following printed tables — each either explicitly
extensible via an attached free sheet ("Údaje, pro které nedostačuje
vyhrazené místo, uveďte na volný list a přiložte k tiskopisu") or otherwise
filer-named/open-ended — are collapsed to one free-text field each, rather
than modelled row-by-row:

- **Oddíl 2.B, "Název dalších činností"** (further business activities beyond
  the single main activity) → `otherActivitiesSummary`.
- **Oddíl 2.E, "Úpravy podle § 5, § 23 zákona"** (itemized §5/§23 adjustment
  rows, both the increasing and decreasing tables) → `increasingAdjustmentsSummary`,
  `decreasingAdjustmentsSummary`. Each table's own aggregate total is
  captured individually as `adjustmentsIncreasingAmount` (ř. 105) /
  `adjustmentsDecreasingAmount` (ř. 106), consistent with this registry's
  convention of modelling a bounded aggregate individually even when the
  itemized rows feeding it are collapsed.
- **Oddíl 2.F, "Údaje o společnících společnosti"** (other partners of an
  unincorporated společnost, up to 3 printed rows, extensible) →
  `companyPartnersSummary`.
- **Oddíl 2.G, "Údaje o spolupracující osobě"** (collaborating persons under
  §13 zákona, up to 2 printed rows, extensible) → `collaboratingPersonsSummary`.

## Scope decision: Oddíl 2.H and 2.I modelled as individual fields, not collapsed

Unlike Oddíl 2.F/2.G, **Oddíl 2.H** ("Údaje o osobě, která rozděluje příjmy a
výdaje") and **Oddíl 2.I** ("Údaje o veřejné obchodní společnosti nebo
komanditní společnosti") each print exactly **one** row on the form (a single
allocating person; a single partnership), not a multi-row or extensible
table. Consistent with this registry's practice of modelling a
single-instance block individually rather than collapsing it (the same
distinction `ch/zh/sta/hilfsblatt-b` draws between its own multi-row and
single-row blocks), this document models Oddíl 2.H as
`incomeAllocatorFirstName`/`Surname`/`TaxId`/`SharePercent` and Oddíl 2.I as
`partnershipTaxId`/`partnershipSharePercent`.

## Scope decision: Oddíl 2.B's "Sazba výdajů" legend and the CZ-NACE column are not modelled as fields

The raw text-stream extraction of Oddíl 2.B's own header row reads "B. Druh
činnosti 2) Sazba výdajů  Název hlavní (převažující) činnosti  % z příjmů
Příjmy  Výdaje  CZ - NACE." Because `pdfjs-dist`'s `getTextContent()` returns
text in content-stream order, not necessarily left-to-right/top-to-bottom
visual reading order, this is read as: the section heading "B. Druh
činnosti," followed by a small printed reference legend, "Sazba výdajů,"
which is the same 80/60/40/30% flat-rate table already fully explained in
prose in the annex's own ř. 102 instructions (reproduced in this schema's own
`expensesRelatedToSection7Income` field description) — not a fillable field
in its own right. This is a disclosed judgment call, absent a rendered
visual layout to confirm column boundaries with certainty; see "Judgment
calls" below. The **CZ-NACE** column is unambiguous: the annex's own
instructions state directly, "CZ - NACE – vyplní pouze finanční úřad" (filled
in only by the tax office) — an office-only field, excluded per this
registry's standing convention (see e.g. the base return's own excluded
"Otisk podacího razítka finančního úřadu").

## Field-by-field source mapping

- **Strana (1), header** ("Rodné číslo:") → `birthNumber`.
- **Oddíl 1 (ř. 101-113)** → `incomeSection7` (101), `expensesRelatedToSection7Income`
  (102), `differenceIncomeExpensesOrProfitLoss` (104),
  `adjustmentsIncreasingAmount` (105), `adjustmentsDecreasingAmount` (106),
  `incomeShareAllocatedToCollaboratingPerson` (107),
  `expensesShareAllocatedToCollaboratingPerson` (108),
  `incomeShareAsCollaboratingPerson` (109),
  `expensesShareAsCollaboratingPerson` (110), `partnerShareInPartnership`
  (112). ř. 103/111 unoccupied, ř. 113 pure arithmetic — see scope decisions
  above.
- **Oddíl 2.A ("Údaje o obratu a odpisech")** → `bookkeepingMethod`,
  `annualNetTurnover`, `totalDepreciationClaimed`, `depreciationOfRealEstate`.
- **Oddíl 2.B ("Druh činnosti")** → `mainActivityName`,
  `mainActivityExpenseRatePercent`, `mainActivityIncome`,
  `mainActivityExpenses`, `otherActivitiesSummary`. CZ-NACE and the "Sazba
  výdajů" legend excluded — see scope decision above.
- **Oddíl 2.C ("Údaje o samostatné činnosti")** → `activityStartDate`,
  `activityInterruptionDate`, `activityEndDate`, `activityResumptionDate`,
  `activityMonthsCount`.
- **Oddíl 2.D (ř. 1-9, "Tabulka pro poplatníky, kteří vedou daňovou evidenci
  podle § 7b zákona")** → `tangibleAssetsStart`/`End` (ř. 1),
  `cashOnHandStart`/`End` (ř. 2, optional), `bankAccountBalanceStart`/`End`
  (ř. 3, optional), `inventoryStart`/`End` (ř. 4), `receivablesStart`/`End`
  (ř. 5), `otherAssetsStart`/`End` (ř. 6, optional), `debtsStart`/`End` (ř.
  7), `reservesStart`/`End` (ř. 8), `wagesStart`/`End` (ř. 9).
- **Oddíl 2.E ("Úpravy podle § 5, § 23 zákona")** →
  `increasingAdjustmentsSummary`, `decreasingAdjustmentsSummary`.
- **Oddíl 2.F ("Údaje o společnících společnosti")** →
  `companyPartnersSummary`.
- **Oddíl 2.G ("Údaje o spolupracující osobě")** →
  `collaboratingPersonsSummary`.
- **Oddíl 2.H ("Údaje o osobě, která rozděluje příjmy a výdaje")** →
  `incomeAllocatorFirstName`, `incomeAllocatorSurname`, `incomeAllocatorTaxId`,
  `incomeAllocatorSharePercent`.
- **Oddíl 2.I ("Údaje o veřejné obchodní společnosti nebo komanditní
  společnosti")** → `partnershipTaxId`, `partnershipSharePercent`.

## Mock-data test run

Because this document models a required three-way discriminator
(`bookkeepingMethod`) gating three different sets of downstream fields, three
worked, internally-consistent scenarios were constructed and every
`type`/`required`/`requiredWhen`/`validation` constraint checked by hand
against each, the same style of hand-evaluation the base return's own
VERIFICATION.md used (no live filing wizard exists for this PDF-based annex,
the same limitation the base return itself discloses).

### Scenario 1 — "Jana Nováková," daňová evidence (tax records), craft trade

`birthNumber = "8501015678"`. `bookkeepingMethod = "danova-evidence"`.

- `incomeSection7 = 850000`, `expensesRelatedToSection7Income = 680000`
  (80% flat-rate craft-trade expenses on income of 850,000, i.e.
  0.80 × 850,000 = 680,000 — under the CZK 1,600,000 cap). Wait — Jana
  actually keeps daňová evidence with evidenced (not flat-rate) expenses in
  this scenario, so `expensesRelatedToSection7Income` is her own recorded
  680,000 Kč of actual expenses, coincidentally similar in size; no flat rate
  is applied since `bookkeepingMethod` is `danova-evidence`, not
  `vydaje-procentem`, so `mainActivityExpenseRatePercent`/`mainActivityIncome`/
  `mainActivityExpenses` are correctly left blank (not `requiredWhen`-gated
  for this method).
- `differenceIncomeExpensesOrProfitLoss` = 850,000 − 680,000 = **170,000**.
  Verified: exact.
- `adjustmentsIncreasingAmount = 5000` (a §23 add-back, per
  `increasingAdjustmentsSummary` = "ř.1: neuznatelný náklad na reprezentaci,
  5 000 Kč"). `adjustmentsDecreasingAmount = 0`.
- No collaborating-person or partnership lines apply: `incomeShareAllocatedToCollaboratingPerson`
  through `partnerShareInPartnership` all blank.
- ř. 113 (derived, not stored) = 170,000 + 5,000 − 0 − 0 + 0 + 0 − 0 + 0 =
  **175,000**. Transfers to the base return's own ř. 37.
- `totalDepreciationClaimed = 12000`, `depreciationOfRealEstate = 0`.
- `mainActivityName = "Truhlářství (výroba nábytku na zakázku)"`.
- `activityStartDate` blank (activity predates the tax year).
- `activityMonthsCount = 12`.
- Oddíl 2.D (`requiredWhen bookkeepingMethod = danova-evidence`, so the 12
  non-optional fields are required): `tangibleAssetsStart = 320000`,
  `tangibleAssetsEnd = 340000`; `inventoryStart = 45000`, `inventoryEnd =
  52000`; `receivablesStart = 18000`, `receivablesEnd = 21000`; `debtsStart =
  60000`, `debtsEnd = 55000`; `reservesStart = 0`, `reservesEnd = 0`;
  `wagesStart = 0`, `wagesEnd = 0` (no employees). The 3 optional pairs
  (`cashOnHandStart/End`, `bankAccountBalanceStart/End`, `otherAssetsStart/End`)
  are left blank — permitted, since they carry no `requiredWhen` despite
  `bookkeepingMethod` being `danova-evidence`.
- **Result: OK.** Every `requiredWhen`-triggered field for this method is
  present; every `vydaje-procentem`/`ucetnictvi`-only field is correctly
  absent.

### Scenario 2 — "Petr Dvořák," full accounting (účetnictví), collaborating spouse

`birthNumber = "7203126543"`. `bookkeepingMethod = "ucetnictvi"`.

- `annualNetTurnover = 4200000` (required for this method — present).
- `incomeSection7` and `expensesRelatedToSection7Income` are **both left
  blank**, per this method's own disclosed treatment (see scope decision
  above) — permitted, since neither carries a hard `required: true`.
- `differenceIncomeExpensesOrProfitLoss = 310000` (Petr's own accounting
  profit before tax, entered directly — `required: true`, present).
- `adjustmentsIncreasingAmount = 22000` (statutory add-backs, e.g. non-tax-deductible
  provisions). `adjustmentsDecreasingAmount = 8000` (accounting-vs-tax
  depreciation difference).
- Petr allocates part of his profit to his wife as a spolupracující osoba:
  `incomeShareAllocatedToCollaboratingPerson = 90000`.
  `expensesShareAllocatedToCollaboratingPerson` left blank (no expense-side
  allocation this year). `collaboratingPersonsSummary = "Manželka Ing.
  Dvořáková Lenka, DIČ CZ7503127890, podíl na příjmech 29 %."`
- ř. 113 (derived) = 310,000 + 22,000 − 8,000 − 90,000 + 0 + 0 − 0 + 0 =
  **234,000**. Verified: 310,000+22,000=332,000; −8,000=324,000;
  −90,000=234,000. Exact.
- `totalDepreciationClaimed = 65000`, `depreciationOfRealEstate = 40000`.
- Oddíl 2.D is correctly left entirely blank: `bookkeepingMethod` is
  `ucetnictvi`, not `danova-evidence`, so none of its 12 non-optional fields
  are `requiredWhen`-triggered.
- **Result: OK.**

### Scenario 3 — "Tomáš Beneš," expenses as a percentage of income (vydaje-procentem), spolupracující-osoba recipient

`birthNumber = "9001011234"`. `bookkeepingMethod = "vydaje-procentem"`.

- `mainActivityName = "Zprostředkování obchodu (poradenská činnost)"`,
  `mainActivityExpenseRatePercent = 60`, `mainActivityIncome = 500000`,
  `mainActivityExpenses = 300000` (60% × 500,000 = 300,000, under the CZK
  1,200,000 cap for this rate tier — required for this method, present and
  arithmetically exact).
- `incomeSection7 = 500000`, `expensesRelatedToSection7Income = 300000`.
  `differenceIncomeExpensesOrProfitLoss = 200000`. Verified: 500,000 −
  300,000 = 200,000. Exact.
- Tomáš is himself a spolupracující osoba receiving a share allocated by his
  father: `incomeShareAsCollaboratingPerson = 45000`,
  `expensesShareAsCollaboratingPerson = 27000`. `incomeAllocatorFirstName =
  "Jaroslav"`, `incomeAllocatorSurname = "Beneš"`, `incomeAllocatorTaxId =
  "CZ6001011111"`, `incomeAllocatorSharePercent = 30`.
- ř. 113 (derived) = 200,000 + 0 − 0 − 0 + 0 + 45,000 − 27,000 + 0 =
  **218,000**. Verified: 200,000+45,000=245,000; −27,000=218,000. Exact.
- **Result: OK.**

### Negative control — required field omitted

A payload with `bookkeepingMethod = "danova-evidence"` but
`tangibleAssetsStart`/`tangibleAssetsEnd`/`inventoryStart`/`inventoryEnd`/
`receivablesStart`/`receivablesEnd`/`debtsStart`/`debtsEnd`/`reservesStart`/
`reservesEnd`/`wagesStart`/`wagesEnd` all omitted correctly fails: all 12
fields are reported as **MISSING required field**, confirming `requiredWhen`
is actually enforced for this section rather than trivially passing. A
second payload omitting `differenceIncomeExpensesOrProfitLoss` entirely
(regardless of `bookkeepingMethod`) correctly fails with **MISSING required
field: differenceIncomeExpensesOrProfitLoss**, confirming its static
`required: true` is enforced.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost/1.0.0/schema.json
ok   registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost/1.0.0/schema.json
ok   registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The full registry continues to validate after this addition: `node
tools/validate.mjs` and `node tools/validate-ajv.mjs` (run with no arguments,
scoping the whole registry) both report **308/308 document(s)** passed —
307 pre-existing schema documents plus this one (the mapping.json companions
are unaffected: 3/3 pass both before and after).

## What is NOT modelled (out of scope), and why

- **ř. 113** (dílčí základ daně/ztráta) — pure arithmetic; see scope decision
  above.
- **ř. 103, ř. 111** — printed "(neobsazeno)"; carry no content for the 2026
  tax year.
- **The Oddíl 2.B "Název dalších činností" rows beyond the main activity** —
  collapsed into `otherActivitiesSummary`.
- **The Oddíl 2.E adjustment tables' own itemized rows** — collapsed into
  `increasingAdjustmentsSummary`/`decreasingAdjustmentsSummary`; their own
  bounded totals are `adjustmentsIncreasingAmount`/`adjustmentsDecreasingAmount`
  (ř. 105/106).
- **The Oddíl 2.F/2.G tables' own itemized rows** — collapsed into
  `companyPartnersSummary`/`collaboratingPersonsSummary`.
- **The CZ-NACE classification column** (Oddíl 2.B) — printed as office-only
  ("vyplní pouze finanční úřad").
- **The Oddíl 2.B "Sazba výdajů" reference legend** — read as a printed
  informational rate table, not a fillable field; its own content is fully
  reproduced in prose in `expensesRelatedToSection7Income`'s own description.
  See scope decision above for the disclosed ambiguity in how this was read
  from a linear text-stream extraction.
- **A separate signature/filing-date block** — this annex has none of its
  own; it is filed as a physical/electronic attachment to the base return,
  which alone carries the DAP's one signature (`placeOfFiling`/`dateOfFiling`
  on `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`). Confirmed by searching
  this annex's own extracted text for "podpis"/"datum vyhotovení" — zero
  matches across all 4 pages.
- **Příloha č. 2, 3, 4** (rental/other income, foreign-source tax computation,
  separate tax base) — each a distinct annex, unaffected by this cycle; still
  open backlog candidates per the base return's own VERIFICATION.md.

## Judgment calls

1. **`differenceIncomeExpensesOrProfitLoss` (ř. 104) is modelled as its own
   field, not excluded as pure arithmetic** — a disclosed, genuine exception
   to this registry's usual "A minus B" treatment, since it is an
   independently-entered value for accounting-basis filers. See its own
   scope decision above.
2. **`bookkeepingMethod` models a literal, printed three-way checkbox**
   (unlike `ch/zh/sta/hilfsblatt-b`'s own inferred `berichtsart`), confirmed
   directly by the annex's own printed footnote instructing a single-select.
3. **Oddíl 2.D's start-of-year column is read as the prior year's own
   closing balance**, since the annex's own embedded instructions describe
   only the end-of-year methodology explicitly for each of its 9 rows — a
   disclosed, not certain, interpretation, the same class of judgment call
   `ch/zh/sta/hilfsblatt-b` made for its own Ziffer 3.1 opening balances.
4. **The Oddíl 2.B "Sazba výdajů" legend is read as a printed reference table,
   not a fillable field**, given the ambiguity of a linear text-stream
   extraction without a rendered visual layout. See its own scope decision
   above.
5. **Oddíl 2.H and 2.I are modelled as individual fields (not collapsed
   summaries)**, since each prints exactly one row, unlike the genuinely
   multi-row Oddíl 2.F/2.G tables.
6. **`birthNumber` is modelled as optional**, mirroring the base return's own
   `birthNumber` field and its own disclosed reasoning (a taxpayer may
   instead be identified by a DIČ or office-assigned identifier on the base
   return, of which this annex is a physically-attached part).
7. **Amounts are modelled as plain `number` fields in whole CZK**, per this
   annex's own repeated instruction ("Částky uveďte v celých Kč"), the same
   convention as the base return and every other income-tax schema in this
   registry.
8. **No `crossFieldValidation` rules were added** — every date/amount pair on
   this annex is itself conditionally present (gated by `bookkeepingMethod`
   or simply optional), the same reasoning the base return's own
   VERIFICATION.md gives for omitting `crossFieldValidation` there.
9. **No live submission was attempted** — filing a real Czech personal
   income tax return annex is a real legal act with a real national tax
   authority, not a safe or reversible action to simulate against a live
   government process, consistent with this registry's standing discipline
   (the same reasoning the base return's own VERIFICATION.md gives).

## Access notes

No access blocks: `financnisprava.gov.cz` was reachable directly from this
environment with plain `curl` for the listing page, this annex's own current
and superseded PDF editions, and the general Pokyny document alike — no
TCP-level reset, WAF, or CAPTCHA gate encountered, consistent with the base
return's own cycle's finding for the same domain.

`tools/verify-sources.mjs` was run scoped to this document's own registry
directory and confirms every cited URL is live and independently reachable:

```
$ node tools/verify-sources.mjs registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

## Scope and jurisdiction notes

- This is a companion-schedule addition to an already-published Taxes-vertical
  document (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`), not a new
  vertical or jurisdiction; the Czech Republic remains at 4 of 6 verticals.
- `id` uses the same `cz/mf` authority-directory segment as the base return
  (Ministerstvo financí), with a slug, `priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost`,
  ASCII-folded from the annex's own printed subtitle ("výpočet dílčího
  základu daně z příjmů z podnikání a z jiné samostatné výdělečné činnosti"),
  consistent with this registry's existing CZ naming convention of using the
  form's own official title/subtitle as the slug.
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, the same as every other CZ document in this registry.
- No `edition` member is used, consistent with the base return's own
  treatment (this annex, like the base return, is hosted at a
  version-independent URL that is simply replaced each tax year, not a
  registry-modelled edition axis).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months), the same cadence as the base return. Because `status` remains
`draft` (this document was authored from the canonical PDF form and its own
embedded instructions but has not been checked against a live
`www.mojedane.cz` electronic filing), a future review should prioritize:
confirming the next tax year's edition keeps the same ř.-number scheme and
the same three-way `bookkeepingMethod` treatment of ř. 104, re-confirming the
current flat expense-rate percentages/caps (80/60/40/30%, capped at
1,600,000/1,200,000/800,000/600,000 Kč) have not changed, and re-screening
whether Příloha č. 2, 3, or 4 has become a tractable next-cycle candidate.
