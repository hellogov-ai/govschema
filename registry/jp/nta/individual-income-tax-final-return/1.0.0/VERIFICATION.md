# Verification record — `jp/nta/individual-income-tax-final-return` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2042). Its own
generic phased brief lists National ID candidates (DE Steuer-ID, SG NRIC
loss/damage + re-registration, NZ RealMe) and "remaining voter registration"
that a prior cycle (GOV-2026) already re-checked and confirmed resolved. Per
this registry's established pattern for this recurring issue, CATALOG.md's
own Known Gaps section was re-scanned fresh instead of treating that list as
a literal to-do. Japan's own history in that section was the clearest lead:
GOV-2005 (opening Japan) screened DMV (confirmed dead end, in-person-only),
Business Formation (flagged, since closed via GOV-2019/GOV-2026), and
National ID (flagged, since closed via GOV-2012) — but its own closing note
says plainly "Business Formation and Taxes remain unscreened," and no
subsequent Japan cycle (GOV-2012, GOV-2019, GOV-2026, GOV-2035) ever touched
Taxes. That made Japan's Taxes vertical this cycle's strongest, most directly
flagged, ready-to-screen candidate.

## Sources examined

- **Document `(id, version)`:** `jp/nta/individual-income-tax-final-return` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** National Tax Agency (国税庁, NTA).
- **Primary source (blank form, fetched live, HTTP 200, browser User-Agent,
  4 pages, 303680 bytes):**
  <https://www.nta.go.jp/taxes/shiraberu/shinkoku/yoshiki/01/shinkokusho/pdf/r07/01.pdf>
  — 申告書第一表・第二表【令和７年用】 (Form 1 and Form 2, tax year 2025 edition),
  linked from the NTA's own annual index page
  <https://www.nta.go.jp/taxes/shiraberu/shinkoku/syotoku/r07.htm>. A second
  attachment-only companion sheet (申告書第二表（添付資料用）,
  <https://www.nta.go.jp/taxes/shiraberu/shinkoku/yoshiki/01/shinkokusho/pdf/r07/02.pdf>,
  162361 bytes) was also fetched but not used — it is an overflow sheet for
  taxpayers with more spouse/dependent/insurance-policy rows than Form 2's
  own rows accommodate, out of this v1.0.0's scope (see below).
- **English-language field-explanation source (2024 edition, the most recent
  whose individual per-section PDFs extract as genuine selectable text):**
  <https://www.nta.go.jp/english/taxes/individual/incometax_2024.htm>,
  specifically sections 09-14
  (`https://www.nta.go.jp/english/taxes/individual/pdf/incometax_2024/{09,10,11,12,13,14}.pdf`),
  "How to Fill Out Return Form" through "Other Page 1 Items" — a genuine,
  detailed field-by-field walkthrough keying each instruction to the exact
  Japanese bracketed label printed on the form (e.g. `[現在の住所]`,
  `[生命保険料控除]`), not just a box number.
- **The matching tax-year-2025 English guide was fetched too, but its own
  individual-section PDFs
  (`https://www.nta.go.jp/english/taxes/individual/pdf/incometax_2025/{09,10,11,12,13,14}.pdf`)
  render their prose pages as outline/vector glyphs with no extractable text
  layer** (`pdfjs-dist`'s `getTextContent()` returns a single 2-character page
  number and nothing else per page, despite the PDF's `getOperatorList()`
  reporting over 16,000 drawing operators per page — i.e. genuine content is
  present but rendered as un-selectable vector paths, not text; likely
  deliberate copy-protection introduced for this edition). Only the pages
  that are still genuine data tables (e.g. the 2025 guide's own era/age
  reference table) extract as real text. This is disclosed as a source
  limitation, not a broken link: `verify-sources.mjs` only checks the 2024
  edition and blank-form URLs actually cited in `schema.json`'s `source`
  field, so this limitation does not affect that check.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

### Reconciling the 2024 guide's box numbers against the actual 2025 (r07) form

Two real edition-to-edition changes make the 2024 guide's own printed line
numbers unsafe to copy directly onto the tax-year-2025 form this document is
sourced from:

1. Tax year 2024 carried a one-time flat-amount income tax cut (定額減税,
   "Special Income Tax Deduction for 2024"), occupying its own box between
   "再差引所得税額" and "復興特別所得税額." This does not recur for tax year
   2025 — the r07 form's own text contains no "定額減税" label anywhere.
2. Tax year 2025 introduces a brand-new deduction box, 特定親族特別控除
   ("specific-relative special deduction," for a relative aged 19-22 whose
   own income exceeds the ordinary dependent-exemption threshold — part of
   Japan's 2025 tax reform raising the so-called "103万円 wall"), which did
   not exist in 2024. This shifts every subsequent 所得から差し引かれる金額
   deduction-column box number by +1 relative to 2024's own sequence, in the
   *opposite* direction from change 1 above.

Rather than trust either edition's own printed numbers by themselves (which
would risk exactly the kind of off-by-one box-reference error this
registry's review process exists to catch), every line number modelled in
this document was independently confirmed via a **position-based (x/y
coordinate) re-extraction** of the actual current (r07, tax-year-2025) blank
Form 1, reconstructing each row's own box-to-label adjacency directly from
the PDF's own text-item coordinates — the same technique GOV-2005 used to
confirm the Certificate of Eligibility's 34-option purpose-of-entry grid, and
GOV-2019 used for the Stock Company application. A one-off Node.js script
(not committed to the repo) grouped `pdfjs-dist`'s `getTextContent()` items
by descending y (row) then ascending x (column) within three x-coordinate
bands corresponding to the page's three visual columns (収入金額等/所得金額等
labels, 所得から差し引かれる金額 labels, 税金の計算 labels), confirming this
exact sequence directly from the current form itself:

- 収入金額等 (earnings, before deduction): ア 営業等, イ 農業, ウ 不動産,
  エ 配当, **オ 給与**, **カ 公的年金等**, キ 雑（業務）, ク 雑（その他）,
  ケ 総合譲渡（短期）, コ 総合譲渡（長期）, サ 一時. (No lettered earnings box
  exists for 利子/interest — its earnings figure and income figure are
  identical, confirmed by the English guide's own item 3.)
- 所得金額等 (income): ① 営業等, ② 農業, ③ 不動産, ④ 利子, ⑤ 配当,
  **⑥ 給与**, **⑦ 公的年金等**, ⑧ 業務, ⑨ その他, ⑩ (⑦-⑨ 計), ⑪ 総合譲渡・
  一時, ⑫ 合計（①-⑥の計＋⑩＋⑪）.
- 所得から差し引かれる金額 (deductions): **⑬** 社会保険料控除, **⑭** 小規模
  企業共済等掛金控除, **⑮** 生命保険料控除, **⑯** 地震保険料控除,
  **⑰〜⑱** 寡婦・ひとり親控除, **⑲〜⑳** 勤労学生・障害者控除, **㉑〜㉒**
  配偶者（特別）控除, **23** 扶養控除, **24 特定親族特別控除 (confirmed new
  for tax year 2025 — absent from the 2024 guide entirely)**, **25** 基礎
  控除, 26 (⑬〜25 の計), **27** 雑損控除, **28** 医療費控除, **29** 寄附金
  控除, 30 合計（26＋27＋28＋29）.
- 税金の計算 (tax computation, entirely out of scope for this v1.0.0 — see
  below): 31 課税される所得金額（⑫－30）, 32 上記に対する税額, 33 配当控除,
  34 (classification/investment-tax-credit box), 35 住宅借入金等特別控除,
  36〜38 政党等寄附金等特別控除, 39〜41 住宅耐震改修特別控除等, 42 差引所得
  税額, 43 災害減免額, 44 再差引所得税額（基準所得税額）, 45 復興特別所得税額
  （44×2.1%）, 46 所得税及び復興特別所得税の額, 47〜48 外国税額控除等,
  49 源泉徴収税額, 50 申告納税額, 51 予定納税額, 52 納める税金, 53 還付され
  る税金, 54〜55 修正申告関係, 56〜59 各種合計額の内訳, 60〜62 源泉徴収税額・
  繰越損失関係, 63〜64 平均課税関係, 65〜66 延納関係, plus the refund
  bank-account block (no box number).

Every box this document's `fields[]` cites (⑥, ⑦, ⑬-㉒, 23-25, 27-29) is
confirmed directly from this transcript, not carried over from the 2024
guide's own (differently-numbered) sequence.

Both PDFs have zero AcroForm/Widget annotations (confirmed via
`getAnnotations()` on every page) — a print/reference facsimile, the same
shape as this registry's other JP and CZ tax-authority forms — but a full,
genuine Japanese text layer.

## What the application maps to

- **Header block** (税務署長／令和 年 月 日／納税地／個人番号／生年月日／
  フリガナ／氏名／職業／屋号・雅号／世帯主／令和8年1月1日の住所／電話番号／
  種類 checkboxes／特農の表示) → `taxOfficeName`, `filingDate`, `taxYear`,
  `taxpayerAddress`, `addressAsOfJan1Following`, `individualNumber`,
  `dateOfBirth`, `nameKana`, `name`, `occupation`, `businessNameOrPenName`,
  `householderName`, `relationshipToHouseholder`, `phoneNumber` +
  `phoneNumberType`, `isBlueReturn`, `isAmendedReturn`,
  `specialAgriculturalIncomeIndicator`.
- **収入金額等／所得金額等, オ／カ and ⑥／⑦ only** → `employmentEarnings` +
  `employmentIncome`, `publicPensionEarnings` + `publicPensionIncome` — the
  two most common income-source pairs for an individual taxpayer (salaried
  employees and pensioners), chosen the same way
  `pl/mf/zeznanie-pit-37`'s own scope note picked "the two most common
  income-source line items" from a form whose full income-source table this
  registry likewise does not fully model.
- **所得から差し引かれる金額, boxes ⑬-㉙** → one plain `number` field per
  box (`socialInsuranceDeduction`, `smallBusinessMutualAidDeduction`,
  `lifeInsuranceDeduction`, `earthquakeInsuranceDeduction`,
  `widowSingleParentDeduction`, `workingStudentOrDisabilityDeduction`,
  `spouseDeduction`, `dependentDeduction`, `specificRelativeSpecialDeduction`,
  `basicDeduction`, `casualtyLossDeduction`, `medicalExpenseDeduction`,
  `donationDeduction`), each carrying the box's own statutory amount
  table/cap in its `description` rather than decomposed into the guide's own
  full sub-worksheets (e.g. the life-insurance deduction's three-tier
  old/new-policy sliding-scale calculation, or the disability exemption's
  per-person breakdown) — consistent with how this registry's CZ Přílohy
  model each annex line as one field carrying its own formula in prose,
  not a fully re-derived computation.
- **医療費控除 / 寄附金控除** additionally map to two `documents[]` entries
  (`medicalExpenseStatement`, `donationReceipts`), `requiredWhen` their
  corresponding deduction amount is greater than zero, per the English
  guide's own explicit instruction ("Please submit the 'Detailed statement
  of deduction for medical expenses' with your final return").

## What is NOT modelled (out of scope), and why

- **The other seven 収入金額等／所得金額等 income-type row pairs** (business,
  agriculture, real estate, interest, dividend, business-related
  miscellaneous, other miscellaneous, capital gains, occasional income) —
  each requires its own separate financial statement (青色申告決算書 /
  収支内訳書) or capital-gains schedule the guide's own item-by-item
  walkthrough describes at length; each is a candidate for a future
  companion-schedule cycle, the same treatment this registry gave the Czech
  Republic's self-employment/rental/foreign-income/separate-tax-base
  annexes.
- **The entire 税金の計算 tax-computation chain** (boxes 31-66): taxable
  income, the seven-bracket progressive income-tax table, the dividend
  credit, housing-loan credit, political-party/NPO/public-interest-donation
  credits, anti-earthquake-home-improvement credits, the 2.1% special income
  tax for reconstruction, foreign-tax credit, withholding-tax reconciliation,
  estimated-tax-installment reconciliation, and the refund bank-account
  block — every one of these is either a pure arithmetic function of
  unmodelled income-type totals (excluded per this registry's established
  excludable-arithmetic-vs-input test) or its own standalone lookup-table/
  credit computation this v1.0.0 does not attempt, mirroring how
  `pl/mf/zeznanie-pit-37` excludes "every downstream computed-arithmetic
  section" wholesale rather than partially modelling it.
- **総所得金額 (`totalIncome`, box ⑫) and the two deduction subtotals**
  (`⑬から25までの計`, box 26; `合計`, box 30) — each is a pure sum of
  fields already modelled above (within this schema's narrowed scope);
  excluded per the same excludable-arithmetic-vs-input test this registry
  applied to the Czech Republic's Přílohy pure-sum lines (e.g. GOV-1998's
  ř. 407-410/413/414). The CZ base return (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`)
  is this registry's own precedent for omitting a grand-total income field
  entirely from an income-tax-return schema.
- **第二表's own per-dependent/per-policy itemization** (name, Individual
  Number, relationship, and date of birth for each spouse/dependent; the
  life/earthquake-insurance premium breakdown by policy type; the
  employment-income breakdown by payer) — Form 1's own aggregate deduction
  amounts are modelled instead; no repeating-group/array type exists in
  GovSchema v0.3 (per this registry's GSP-0009 note), and collapsing a
  variable-length per-dependent list into a single scalar field per box (as
  this document does for the aggregate amounts themselves) would not
  faithfully represent per-person detail the way it does for a single
  summed figure, so it is disclosed as excluded rather than modelled
  imprecisely.
- **申告書第二表（添付資料用）**, the overflow attachment sheet for
  taxpayers with more spouse/dependent/policy rows than Form 2
  accommodates — out of scope for the same reason as Form 2's own
  itemization above.
- **第三表 (separate self-assessment taxation)** and **第四表 (loss-return
  form)** — apply only to taxpayers with income types or loss positions
  entirely outside this schema's scope (listed-share/real-estate capital
  gains taxed separately, or a net loss carried forward), so neither page is
  triggered by anything this v1.0.0 models.
- **The classification/proxy-filing checkboxes for 分離課税 (separate
  taxation), 損失 (loss return), and 国外転出時課税 (exit tax)** on the same
  「種類」row as `isBlueReturn`/`isAmendedReturn` — each signals exactly one
  of the out-of-scope pages above (Page 3 or Page 4) and so is not modelled;
  a taxpayer whose return needs one of these boxes checked is outside this
  v1.0.0's scope entirely.
- **振替継続希望** (the bank-transfer-payment continuation checkbox in the
  header) — procedurally tied to the tax-payment/refund mechanics excluded
  above; a minor, rarely-relevant checkbox disclosed as out of scope rather
  than modelled in isolation from the payment section it belongs to.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` — including the two
`documents[].requiredWhen` entries — was run against two realistic scenarios
plus four negative controls:

```
[OK] Scenario 1: salaried employee, basic deduction only, no special reliefs
[OK] Scenario 2: retiree, pension income, spouse+medical+donation deductions
[FAIL] Negative control 1: missing required basicDeduction
    - MISSING required field: basicDeduction
[FAIL] Negative control 2: medicalExpenseDeduction claimed without medicalExpenseStatement
    - MISSING required document: medicalExpenseStatement
[FAIL] Negative control 3: individualNumber not 12 digits
    - PATTERN mismatch for individualNumber: 12345
[FAIL] Negative control 4: lifeInsuranceDeduction exceeds 120,000 cap
    - INVALID maximum for lifeInsuranceDeduction: 150000 > 120000

ALL SCENARIOS BEHAVED AS EXPECTED
```

Scenario 1 is a straightforward full-time salaried employee with only the
most common deductions (social insurance, life/earthquake insurance, basic
deduction) and no dependents. Scenario 2 is an independently-constructed
retiree scenario exercising `publicPensionEarnings`/`publicPensionIncome`,
`spouseDeduction`, `medicalExpenseDeduction` (together with its required
`medicalExpenseStatement` document), and `donationDeduction` (together with
its required `donationReceipts` document) simultaneously. The four negative
controls confirm the check script actually enforces the universally-required
`basicDeduction` field, the two deduction-triggered `documents[].requiredWhen`
gates, the `individualNumber` 12-digit pattern, and the `lifeInsuranceDeduction`
statutory cap — rather than trivially passing everything. No defects were
found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/nta/individual-income-tax-final-return/1.0.0/schema.json
ok   registry/jp/nta/individual-income-tax-final-return/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/nta/individual-income-tax-final-return/1.0.0/schema.json
ok   registry/jp/nta/individual-income-tax-final-return/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (317/317 including this document, plus 3/3
`mapping.json` companions) and
`node tools/verify-sources.mjs registry/jp/nta/individual-income-tax-final-return/1.0.0`
("1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear") were
both re-run clean immediately before opening this PR.

## Scope and jurisdiction notes

- This is Japan's fifth document in the registry (after
  `jp/isa/certificate-of-eligibility-application`, GOV-2005;
  `jp/j-lis/individual-number-card-issuing-application`, GOV-2012;
  `jp/houmukyoku/stock-company-establishment-registration-application`,
  GOV-2019; `jp/houmukyoku/limited-liability-company-establishment-registration-application`,
  GOV-2026; and `jp/houmukyoku/seal-registration-notification`, GOV-2035),
  and its first in the Taxes vertical — **Japan now stands at 4 of its 6
  verticals (Visa, National ID, Business Formation, Taxes)**. DMV and
  Passport remain confirmed dead ends (GOV-2005).
- New JP authority segment `nta` (National Tax Agency), distinct from `isa`,
  `j-lis`, and `houmukyoku`; `jurisdiction.level` is `national`.
- `id`/slug `individual-income-tax-final-return` uses English, following
  this registry's established convention for a Japanese-only source with no
  single official English form title (the NTA's own English guide calls it
  a "Final Return" throughout, informing the slug's own wording).
- `version` set to `1.0.0` despite the substantial, disclosed scope
  narrowing (two of nine income types; the deduction column only; no tax
  computation) — consistent with `pl/mf/zeznanie-pit-37`'s own precedent of
  shipping a heavily-scoped income-tax-return base as `1.0.0` rather than a
  pre-1.0 draft, since every field actually modelled is complete and
  independently verified, and the exclusions are fully disclosed rather than
  silent.
- Conditional requiredness uses `requiredWhen` (GSP-0013), including on two
  `documents[]` entries, consistent with every other recent document in this
  registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months out), consistent with this registry's other recent Japan documents.
Tax year 2025's own English-language guide should be re-checked at that time
in case the NTA's outline/vector-glyph rendering of its prose pages (see
above) is resolved, which would allow a fuller cross-check of tax year 2025's
own guide prose directly rather than via the 2024 edition plus independent
position-based re-extraction of the current form.
