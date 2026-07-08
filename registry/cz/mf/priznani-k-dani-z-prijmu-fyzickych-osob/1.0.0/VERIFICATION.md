# Verification record — `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Czech Republic's Taxes gap

This is the recurring "GovSchema Standard Research" cycle
([GOV-1826](/GOV/issues/GOV-1826)). The prior CZ cycle (GOV-1819) opened the
Czech Republic's Visa vertical and explicitly flagged Taxes as its strongest
remaining open backlog candidate:

> "Taxes (`financnisprava.gov.cz`'s Form 25 5405 plus its own Pokyny guide) as
> a strong, larger-scope open candidate."

CATALOG.md's own "Known Gaps & Opportunities" section confirmed this was
still current before authoring began: the Czech Republic stood at 3 of 6
verticals (Business Formation, DMV, Visa), with Passport and National ID
confirmed dead ends (GOV-1819) and Taxes the sole open, unscreened-this-cycle
candidate. This document closes that gap, giving the Czech Republic its
**4th of 6 verticals**.

## Sources examined

- **Document `(id, version)`:** `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministerstvo financí (MFin, the form's own printed legal
  issuer — "25 5405 MFin 5405"), operated by Finanční správa České republiky
  (FS ČR / GFŘ), which hosts and publishes the form online.
- **Primary source (the return itself):**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405_30.pdf> — "25 5405
  MFin 5405 - vzor č. 30," the current (2026 tax year) 4-page base return,
  fetched directly (HTTP 200, 678,252 bytes, no login/CAPTCHA/WAF gate) from
  the Finanční správa's own "Daňové tiskopisy" (tax forms) listing page,
  <https://financnisprava.gov.cz/cs/dane/danove-tiskopisy>.
- **Primary source (field-by-field instructions):**
  <https://financnisprava.gov.cz/assets/tiskopisy/5405-1_34.pdf> — "25
  5405/1 MFin 5405/1 - vzor č. 34," the "POKYNY k vyplnění přiznání k dani z
  příjmů fyzických osob" (4 pages, 222,475 bytes), fetched the same way from
  the same listing page. This document restates every numbered line's
  purpose, its statutory basis (with pinpoint § citations to zákon č.
  586/1992 Sb. and zákon č. 280/2009 Sb.), and — critically for the fixed-rate
  personal/spouse/disability/child credits (ř. 64-68, 72) — the exact
  current-year Kč figures, which are not printed on the return itself.
- **Extraction method.** `pdfjs-dist` (v3.11.174, `legacy/build/pdf.js`) text
  extraction succeeded cleanly on both PDFs (a genuine, readable text layer —
  no custom font encoding issue, unlike `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s
  visa form last cycle). A separate annotation-layer check
  (`page.getAnnotations()`, filtered to `subtype === 'Widget'`) returned
  **zero** form-field widgets across all 4 pages of the base return — this is
  a flat print/reference facsimile PDF, not a fillable AcroForm, consistent
  with the instructions' own "Postup při vyplnění DAP" preamble: the return
  is completed on paper in block letters or filed electronically via the
  authenticated `www.mojedane.cz` portal (Elektronická podání), never by
  filling this specific PDF's own form fields. Every field below was read
  from the base return's own printed, numbered lines and cross-checked
  against the corresponding "K *n*. oddílu" explanatory section of the
  instructions document.
- **Retrieved / reviewed:** 2026-07-08.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: base return only, employment/pension filer profile

The base return's own §2. oddíl (partial tax base) references four
annexes by line number — Příloha č. 1 (ř. 113, self-employment income under
§7 zákona), Příloha č. 2 (ř. 206/209, rental and other income under §9/§10
zákona), Příloha č. 3 (ř. 330, foreign-source income tax computation under
§38f zákona), and Příloha č. 4 (ř. 414, separate tax base under §16a
zákona) — each a distinct, larger, independently-numbered PDF (up to ř. 414)
also published unauthenticated at financnisprava.gov.cz's own "Daňové
tiskopisy" page. Modelling all four alongside the base return in one session
would be a substantially larger single-session scope than any other
income-tax schema in this registry (e.g. `pt/at/declaracao-rendimentos-irs-modelo-3`,
which likewise scopes to Rosto + one Anexo, or `cl/sii/formulario-22`, scoped
to the salaried-employee/pensioner case only).

This document therefore models the base return **only**, for the
filer profile that needs none of the four annexes: an employment- and/or
pension-income taxpayer (§6 zákona) with, optionally, capital income not
taxed at source (§8 zákona, ř. 38 — a line directly on the base return, not
an annex reference). Left out, as open backlog candidates for a future
cycle: Příloha č. 1 (self-employment), Příloha č. 2 (rental/other income),
Příloha č. 3 (foreign-source tax computation), Příloha č. 4 (separate tax
base), and the mandatory accounting-statement attachment for taxpayers who
keep double-entry books (irrelevant to a non-self-employed filer).

## Scope decision: computed lines excluded

Per this registry's established treatment of income-tax schemas elsewhere
(`pt/at/declaracao-rendimentos-irs-modelo-3`, `cl/sii/formulario-22`, the ZA
SARS ITR14 family), a line that is a **pure arithmetic function of other
lines already captured as fields** is not itself modelled as a field — an
agent consuming this schema is expected to derive it, per the form's own
printed formula (reproduced in this schema's own field `description`s where
the formula matters, and restated below for completeness):

| Line(s) | Formula (per the form / Pokyny) | Why excluded |
|---|---|---|
| ř. 34 | ř. 31 − ř. 33 | pure arithmetic of `totalEmploymentIncome`/`foreignTaxPaidOnEmploymentIncome` |
| ř. 36 | = ř. 34 | pure transcription |
| ř. 41 | ř. 37 + ř. 38 + ř. 39 + ř. 40 (37/39/40 out of scope, see above; only `capitalIncomeTaxBase` (ř. 38) applies in this schema's scope) | pure arithmetic |
| ř. 42, 45 | ř. 36 + max(ř. 41, 0); ř. 42 − ř. 44 (ř. 44, loss carryforward, is a business-only concept out of this schema's employment/pension scope) | pure arithmetic |
| ř. 54-58, 60 | sums/roundings/statutory-rate application of ř. 46-53 and ř. 45 | pure arithmetic / rate table, no new input |
| ř. 61 | = ř. 41, absolute value | pure transcription |
| ř. 70, 71, 73-77 | sums/caps of ř. 62-69b and ř. 72 against ř. 60/71 | pure arithmetic |
| ř. 79, 80, 82, 83 | transfers/differences of ř. 77/77a/61 against ř. 78/81 | pure arithmetic, amended-return-only |
| ř. 91 | ř. 77 − ř. 77a − ř. 84 − ř. 85 − ř. 86 − ř. 87 − ř. 87a − ř. 88 + ř. 89 − ř. 90 | pure arithmetic, the return's own final balance |

Lines ř. 32, 43, 59, 69, 69a, 69b are themselves printed "Neobsazeno"
(unoccupied/reserved) on the form and carry no content at all.

## Field-by-field source mapping

- **Form header** (tax office, territorial workplace, DAP type/distinction
  code, tax-advisor/auditor flags, tax year, partial period) →
  `taxOfficeName` through `partialPeriodTo`. `dapType`'s four values
  (`radne`/`opravne`/`dodatecne`/`opravne-dodatecne`) follow the Pokyny's own
  ř. 03 explanation of which boxes are checked together for each scenario.
  `taxTypeDistinctionCode`'s six-letter enum (A/B/G/I/N/O) is copied verbatim
  from the Pokyny's own ř. 04 explanation, each letter's own §-citation
  preserved in the field `description`.
- **ř. 01-02** (DIČ / rodné číslo) → `taxIdentificationNumber` /
  `birthNumber`, both optional per the Pokyny's own fallback chain (DIČ, else
  rodné číslo, else an office-assigned VČP) — documented in
  `taxIdentificationNumber`'s own `description` rather than modelled as a
  third field, since a VČP is assigned *by* the tax office, not chosen by the
  taxpayer.
- **ř. 06-11** (surname, birth surname, first names, title, nationality,
  passport number) → `surname` through `passportNumber`. `passportNumber` is
  `required: false` with a description noting it applies only to a tax
  non-resident, since the base form has no separate resident/non-resident
  boolean field to `requiredWhen` against (residency is inferred from other
  context, e.g. whether `nonResidentCountryCode` is completed) — the same
  disclosed-ambiguity treatment this registry used for
  `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s own conditionally-applicable,
  ungated fields.
- **ř. 12-18** (residence address at filing date) → `residenceMunicipality`
  through `residenceCountry`, all required except phone/email (marked
  optional on the form itself).
- **ř. 19-22** (residence address at calendar year end, if different) →
  `yearEndMunicipality` through `yearEndPostalCode`, all optional — the
  Pokyny states this block is completed "pouze v případě, že adresa...je
  rozdílná" (only if different), with no separate gating boolean on the form.
- **ř. 23-28** (usual-stay address in the Czech Republic, for a taxpayer with
  no Czech domicile) → `usualStayMunicipality` through `usualStayEmail`, all
  optional for the same reason.
- **ř. 29-30** (non-resident country code, worldwide income, related-party
  transactions) → `nonResidentCountryCode` through
  `transactionsWithForeignRelatedParties`. As with the visa document's own
  coded fields, the Pokyny states the code list is published at
  financnisprava.cz but does not itself specify which standard (e.g. ISO
  3166-1) applies, so `nonResidentCountryCode` is modelled as a plain string
  with a generous `maxLength`, not a `pattern`.
- **ř. 31, 33, 35** (employment income, foreign tax paid on it, foreign
  income not subject to withholding) → `totalEmploymentIncome`,
  `foreignTaxPaidOnEmploymentIncome`, `foreignSourceEmploymentIncomeNotWithheld`.
- **ř. 38** (capital income tax base, §8 zákona) → `capitalIncomeTaxBase` —
  the one §-income-category line that sits directly on the base return
  rather than requiring an annex.
- **ř. 46-51** (donation value, mortgage/building-savings interest, pension
  contributions, life insurance, long-term investment product, long-term
  care insurance) → `donationValue` through `longTermCareInsurancePremiums`.
  Each field's `description` reproduces the Pokyny's own cap (e.g. the
  shared CZK 48,000 aggregate cap across ř. 48-51, per §15 odst. 5 zákona;
  the 2%-of-tax-base/CZK-1,000 floor and 30%-of-tax-base ceiling on
  donations).
- **ř. 62a, 64** (stayed-execution credit, basic personal credit) →
  `stayedExecutionCredit`, `basicPersonalTaxCredit` — the latter
  `required: true` since every taxpayer is entitled to it, with the fixed
  CZK 30,840/year statutory amount quoted directly from the Pokyny (the
  return itself prints no amount, only the line label and §-citation).
  Line 62 (slevy za zaměstnávání osob se zdravotním postižením — an employer
  hiring-disabled-workers credit) and ř. 63 (§35a/35b investment-incentive
  credit) are out of this schema's employment/pension-filer scope (both are
  business-owner-specific reliefs) and are not modelled.
- **Tab. č. 1 + ř. 65a/65b** (spouse/registered-partner identity and
  credit) → `claimSpouseAllowance` (a gating boolean this schema introduces,
  since the form itself has no single box for "claiming this credit," only
  the presence of the Tab. č. 1 data and a ř. 65a/65b amount) through
  `spouseAllowanceAmount`. `spouseHasZTPPCard` plus one shared
  `spouseAllowanceAmount` field collapse the form's own two mutually-distinct
  amount lines (65a for a spouse without a ZTP/P card, 65b for one who holds
  one) into a single amount field whose applicable line and current
  CZK 24,840/49,680 per-year (or CZK 2,070/4,140 per-month, prorated) figures
  are fully documented in the field's own `description` — chosen over two
  separate always-present fields because a taxpayer completes at most one of
  65a/65b per the Pokyny's own explanation, never both simultaneously for the
  same spouse.
- **ř. 66-68** (disability credits: 1st/2nd-degree pension, 3rd-degree
  pension, ZTP/P card) → `disabilityCreditDegree1Or2`,
  `disabilityCreditDegree3`, `ztppHolderCredit` — kept as three independent
  optional fields (not collapsed) because, unlike the spouse credit, the
  Pokyny does not state these are mutually exclusive: a taxpayer with a
  3rd-degree disability pension *and* a ZTP/P card can claim both ř. 67 and
  ř. 68 concurrently.
- **Tab. č. 2** (dependent children table: name, birth number, months
  claimed per child/tier/ZTP-status) → `dependentChildrenDetails`, collapsing
  the table's repeating rows (up to 4 printed, more on an attached free
  sheet per the Pokyny) into one free-text field — the same treatment this
  registry uses elsewhere for small repeating tables (e.g.
  `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s own `childrenDetails`).
- **ř. 72** (dependent-child tax allowance) → `dependentChildTaxAllowance`,
  with the current CZK 15,204/22,320/27,840 per-year tiered rates (doubled
  for a ZTP/P-card-holding child) quoted from the Pokyny directly into the
  field description, since — like the spouse and disability credits — the
  return itself prints no amount, only the §-citation.
- **ř. 78, 81** (last known tax / last known tax loss, amended-return-only)
  → `lastKnownTaxAmount` (`requiredWhen` `dapType` is `dodatecne` or
  `opravne-dodatecne`), `lastKnownTaxLossAmount` (optional, since a taxpayer
  amending from a tax position, not a loss position, leaves this one blank
  per the Pokyny's own "jinak tento řádek proškrtněte" instruction).
- **ř. 84-90** (withheld employment-tax advances, taxpayer-paid advances,
  lump-sum-regime advances, §36(6)/(7) withholding, secured tax, monthly tax
  bonuses paid, prepaid tax under §38gb) → `totalWithheldEmploymentTaxAdvances`
  through `prepaidTaxSection38gb`.
- **Page 4 header** (overpayment refund request) →
  `requestTaxOverpaymentRefund` through `refundAccountCurrency`.
  `refundDeliveryMethod`'s two values map to the form's own two delivery
  options ("Přeplatek zašlete na adresu" / "nebo vraťte na účet"); the
  Pokyny's own note that a self-employed taxpayer (podnikající fyzická
  osoba) may only be refunded by bank transfer, per §155a odst. 2 písm. b)
  daňového řádu, is preserved in `refundDeliveryMethod`'s `description`
  rather than enforced as a hard constraint, since this schema's scope
  excludes self-employment status as a modelled field.
- **Page 4 signature block** (place/date of filing, third-party signatory
  details) → `placeOfFiling` through `signingPersonRelationToLegalEntity`.
  `signingPersonBirthDateOrRegistrationNumber` collapses the form's own
  single printed line ("Datum narození / Evidenční číslo osvědčení daňového
  poradce / IČ právnické osoby") into one field, since the form itself
  prints these three alternatives on one shared line, not three separate
  boxes.
- **Přílohy DAP checklist** (page 4, attachment-count table) → the 11
  `documents[]` entries with a `category: supporting-evidence`, each
  `requiredWhen` its corresponding declared amount/dependent-return-type
  field is present — e.g. `employerIncomeCertificate` `requiredWhen`
  `totalEmploymentIncome` `greaterThan` `0`. Checklist rows tied to
  out-of-scope annexes (accounting statements, the Příloha 1-4 fields
  themselves, the double-taxation-exclusion list under §38f odst. 10
  zákona) are not modelled, consistent with the base-return-only scope
  decision above.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`greaterThanOrEqual`/`all`/`any`/`not`
`Condition` grammar as GSP-0013 checked every `type`/`required`/
`requiredWhen`/`validation` constraint and every `documents[].requiredWhen`
in `schema.json` against four scenarios:

```
OK   Scenario 1: single employed taxpayer, small donation, bank refund
OK   Scenario 2: married w/ spouse+2 children, amended return, tax advisor
FAIL Negative control: missing refundAccountOwnerName while bank-account refund (expected FAIL)
    - MISSING required field: refundAccountOwnerName
    - MISSING required document: employerIncomeCertificate
FAIL Negative control 2: claimSpouseAllowance=true but missing spouse fields (expected FAIL)
    - MISSING required field: spouseSurnameFirstNameTitle
    - MISSING required field: spouseBirthNumberOrDateOfBirth
    - MISSING required field: spouseHasZTPPCard
    - MISSING required field: spouseAllowanceAmount
    - MISSING required document: employerIncomeCertificate
```

Scenario 1 exercises the single-filer path (donation deduction, bank-account
refund, employer-certificate document requirement). Scenario 2 exercises the
amended-return path (`dapType: dodatecne` gating `lastKnownTaxAmount` and the
`reasonsForAdditionalReturnDocument`), the spouse-allowance block, the
dependent-children collapsed-table field, and the third-party-signatory
block. The two negative controls confirm the evaluator actually enforces
`requiredWhen` on both fields and documents (correctly reporting a missing
bank-account-owner name, and correctly reporting every spouse-block field as
missing once `claimSpouseAllowance` is `true`) rather than trivially passing
everything. (Both negative-control payloads also correctly flag
`employerIncomeCertificate` missing, since neither includes a `documents`
object at all — expected, and consistent with the primary point each
negative control targets.) No defects were found in the schema itself.

Both registry validators were run against the schema document itself and pass:

```
$ node tools/validate.mjs registry/cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/schema.json
ok   registry/cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/schema.json
ok   registry/cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/schema.json [v0.3]
```

The full registry continues to validate after this addition (see PR for the
exact before/after document counts).

## What is NOT modelled (out of scope), and why

- **Příloha č. 1** (self-employment/business income, §7 zákona, up to ř.
  113) — a distinct, larger, independently-published PDF; left as an open
  backlog candidate.
- **Příloha č. 2** (rental income under §9 zákona and other income under
  §10 zákona, up to ř. 209/206) — same reason.
- **Příloha č. 3** (foreign-source income tax computation under §38f
  zákona, up to ř. 330) — same reason.
- **Příloha č. 4** (separate tax base under §16a zákona, up to ř. 414) —
  same reason.
- **The mandatory accounting-statement attachment** for taxpayers who keep
  double-entry books (účetní závěrka, per §18 odst. 1 zákona č. 563/1991
  Sb.) — inapplicable to this schema's non-self-employed filer scope.
- **ř. 62** (employer's credit for employing disabled workers, §35 odst. 1
  zákona) and **ř. 63** (§35a/§35b investment-incentive credit) — both
  business-owner-specific reliefs, out of this schema's employment/pension
  scope.
- **ř. 44** (loss carryforward) — a business-income concept (losses arise
  under §7 zákona, out of this schema's scope) requiring its own separate
  attachment per §34 odst. 1 zákona.
- **Every pure computed/arithmetic line** — see the table above.
- **The office-only "Otisk podacího razítka finančního úřadu"** (tax office's
  own filing-stamp box, printed on pages 1 and 4) — completed by the tax
  office, not the taxpayer.

## Scope and jurisdiction notes

- This is the Czech Republic's first Taxes-vertical document, giving it 4 of
  its 6 verticals (Business Formation, DMV, Visa, Taxes); Passport and
  National ID remain confirmed dead ends per GOV-1819.
- `id` uses `mf` (Ministerstvo financí, the form's own printed "MFin" issuer
  code) as the authority-directory segment, distinct from `cz/mzv`, `cz/md`,
  and `cz/mpo` already in the registry — the same `authority`/`operatedBy`
  split this registry uses for `pt/at` (Ministério das Finanças, operated by
  Autoridade Tributária e Aduaneira).
- `id`'s own slug, `priznani-k-dani-z-prijmu-fyzickych-osob` (ASCII-folded
  from "Přiznání k dani z příjmů fyzických osob"), is the return's own
  official title, consistent with this registry's existing CZ naming
  (`zadost-o-udeleni-dlouhodobeho-viza`, `zadost-o-zapis-silnicniho-vozidla`,
  `jednotny-registracni-formular-fyzicka-osoba`).
- Conditional requiredness uses `requiredWhen` (GSP-0013), targeting spec
  v0.3, the same as every other CZ document in this registry. No
  `crossFieldValidation` rules were added: unlike this registry's other CZ
  documents (which each compare two always-required date fields), this
  return has no pair of always-present fields where a direct `compare` rule
  would be safe to apply unconditionally — every date/amount pair here is
  itself conditionally present.
- Amounts are modelled as plain `number` fields in whole CZK, per the
  Pokyny's own instruction ("Částky...uveďte v celých Kč"), with the unit
  noted in each field's own `label`/`description` rather than a separate
  currency sub-field — the same convention `pt/at/declaracao-rendimentos-irs-modelo-3`
  and `cl/sii/formulario-22` use for their own local-currency amounts.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-08** (6
months). Because `status` remains `draft` (this document was authored from
the canonical PDF form and its own instructions but has not been checked
against a live `www.mojedane.cz` electronic filing), a future review should
prioritize: confirming the tax year's own statutory Kč figures for the
fixed-rate credits (ř. 64-68, 72) have not changed for the following tax
year, and re-screening whether any of Příloha č. 1-4 has become a tractable
single-session candidate.
