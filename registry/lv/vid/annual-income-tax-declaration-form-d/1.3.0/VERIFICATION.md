# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.3.0

## Candidate selection

GOV-4163 ("GovSchema Standard Research"). Both v1.1.0 (GOV-4144) and v1.2.0
(GOV-4154) explicitly banked Annex D1¹ (income excluded from the non-taxable
minimum and reliefs) as the single most likely next candidate after their own
picks (D2, then D2¹): it shares Annex D1's and Annex D2's real-HTML-table
rendering, unlike D3/D3¹/D4/DK/GD, which either lack a rendered table or
bundle in business-activity accounting this registry's narrow-scoping
precedent already excludes. This cycle picks up that exact candidate.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, 365,651 bytes — the identical byte
count v1.0.0, v1.1.0, and v1.2.0 all recorded. Per those versions' own
established fidelity signal for this source (its sha256 is unstable because
one obfuscated bot-detection `<script>` token changes value on every fetch
while the regulation text and Annex 1 tables stay byte-for-byte identical),
byte-count stability, not sha256, is the correct re-verification check —
confirmed unchanged.

## Extraction method

Located the instructional section "III. Deklarācijas D1¹ pielikuma
aizpildīšanas kārtība" (§§16–17, paragraphs 17.1–17.10) by searching the raw
HTML for the tag-split string `D1<SUP>1</SUP> pielikuma aizpildīšanas
kārtība` — a literal `<SUP>1</SUP>` tag renders the exponent, so a naive
plain-text search for "D1¹" as a single string does not find it, exactly as
this document's own prior versions' extraction notes flagged. Read the
paragraph text directly (not the issue's own summary) to independently
re-derive the 10-column structure:

- 16: who files it — a taxpayer who, during the tax year, earned taxable
  income in Latvia or abroad to which the non-taxable minimum and reliefs do
  not apply (e.g. standing-forest/timber sale income; real-estate
  rental/lease income where the taxpayer exercises the right under Section
  11(12) of the law "Par iedzīvotāju ienākuma nodokli" not to register
  economic activity; income-equated loans; and non-capital-gains capital
  income).
- 17.1: column 1, "Ienākumu gūšanas vieta un veids" — the income source
  (including the payer's name/registration code, or name/personal code) and
  income type.
- 17.2: column 2, "Bruto ieņēmumi" — the taxable income earned during the
  tax year, in monetary terms.
- 17.3: column 3, "Izdevumu norma – 25 %" — filled in only for standing-forest
  sale income; the expense amount tied to forest regeneration, at a 25%
  norm of gross income.
- 17.4: column 4, "Izdevumu norma – 50 %" — filled in only for timber sale
  income; the expense amount tied to preparing/selling the timber, at a 50%
  norm of gross income. Columns 3 and 4 are mutually-exclusive alternatives.
- 17.5: column 5, "Izdevumi, kas saistīti ar ienākumu gūšanu" — documented
  expenses, filled in only if neither column 3 nor column 4 is filled for the
  same row.
- 17.6: column 6, "Apliekamie ienākumi" — gross income (column 2) minus
  whichever expense figure applies (column 3, 4, or 5).
- 17.7: column 7, "Nodokļa likme" — the applicable tax rate; a taxpayer who
  is the lender's employee/board member/council member on the loan-issue
  date adds the Section 15(11) additional rate for an income-equated loan.
- 17.8: column 8, "Aprēķinātais nodoklis" — taxable income (column 6)
  multiplied by the tax rate (column 7).
- 17.9: column 9, "Avansā samaksātais (ieturētais) nodoklis" — advance-paid
  or withheld tax, including foreign tax paid, capped at column 8.
- 17.10: column 10, "Maksājamais vai pārmaksātais nodoklis" — computed tax
  (column 8) minus advance-paid/withheld tax (column 9); an overpayment is
  entered with a minus sign prefixed before the number.

This matches the issue's own summary of the 10 columns — a genuine
independent confirmation, since the paragraph text was read fresh from the
raw HTML rather than assumed.

Found Annex D1¹'s own data-entry `<TABLE>` markup in the same combined
docx-sourced HTML bundle (Form D + D1 + D1¹ + D2 + D2¹ + D3 + D3¹ + D4) that
D1's, D2's, and D2¹'s own tables were extracted from at v1.0.0–v1.2.0 —
located it by searching for the exact printed column-3/4 super-header text
("Izdevumu norma augoša meža vai kokmateriālu pārdošanai"), then walking
backward to the enclosing `<TABLE>` tag and forward to its matching
`</TABLE>`. Confirmed the table sits directly after the printed title
"TAKSĀCIJAS GADĀ GŪTIE IENĀKUMI, KURIEM NEPIEMĒRO GADA NEAPLIEKAMO MINIMUMU
UN ATVIEGLOJUMUS" (Annex D1¹'s own heading) and directly before its
signature-block table and the "D2" marker box, so there is no ambiguity
about which annex's table this is. Extracted with the same from-scratch
Python `html.parser.HTMLParser` DOM walk used for D1, D2, and D2¹,
respecting `colspan`/`rowspan`. The table's own 3 header rows (the
COLSPAN=2 super-header over columns 3/4, the "25 %"/"50 %" sub-header, then
the numbered 1–10 row) cross-check exactly against §17.1–17.10's own column
captions and purposes — an exact match, confirming no column was
mis-ordered by the walk.

## Structure modelled

70 new `fields[]` (7 income-entry rows × 10 columns) plus 6 `Kopā`
(totals-row) fields, in a new `income_excluded_from_reliefs` step, inserted
between the existing `lv_sourced_income` (Annex D1) and `foreign_sourced_income`
(Annex D2) steps — matching the regulation's own section order (II. D1,
III. D1¹, IV. D2, V. D2¹) and its own fill order. Total document field
count: 231 → 307.

1. **7 income-entry rows** (`reliefsExcludedIncomeEntry{1-7}...`), 10 fields
   each: source/type, gross income, the 25% forest-sale expense norm, the
   50% timber-sale expense norm, documented expenses, taxable income, tax
   rate, computed tax, advance-paid/withheld tax, and payable/overpaid tax.
2. **6 `reliefsExcludedIncomeTotal...` fields** for the "Kopā" row: gross
   income (column 2), documented expenses (column 5), taxable income
   (column 6), computed tax (column 8), advance-paid/withheld tax
   (column 9), and payable/overpaid tax (column 10). Columns 3, 4, and 7
   have no corresponding total field — see Finding 2.

**Cross-field validation — genuinely encoded, not just disclosed.** Unlike
every prior conditional-fill rule this document has modelled so far (e.g.
Annex D2's column-4 exemption rule, Annex D2¹'s column-8 foreign-tax rule),
this cycle's mutually-exclusive column 3/4/5 relationship *is* fully
expressible with the existing `crossFieldValidation` vocabulary, using the
same numeric "greater-than-zero-as-filled" convention this exact document
already established at v1.2.0 (`pensionerAnnualNonTaxableMinimum`'s and
`refundAccountIban`'s own `requiredWhen: {"greaterThan": 0}` rules). Added 4
`crossFieldValidation` rules per row (28 total, `schema.json`'s new
top-level `crossFieldValidation` array):

- Three pairwise `requireAbsent` rules per row
  (`reliefsExcludedIncomeEntry{N}ForestNormExcludesOthers`,
  `...TimberNormExcludesOthers`, `...DocumentedExpensesExcludesNorms`): when
  any one of columns 3/4/5 is `greaterThan: 0`, the other two must be
  absent. Reasoned through carefully before encoding: the source's own rule
  ("5. ailē ... norāda ... ja nav aizpildīta 3. vai 4. aile") states a
  *necessary* condition for column 5 ("column 5 filled ⟹ columns 3 and 4
  both absent"), not a requirement that column 5 *must* be filled whenever
  3 and 4 are empty (a row may legitimately have no deductible expenses at
  all) — so this is exactly the shape three pairwise `requireAbsent` rules
  capture, with no over-claiming in either direction.
- One `compare` rule per row
  (`reliefsExcludedIncomeEntry{N}AdvanceTaxWithinComputedTax`): the
  advance-paid/withheld tax (column 9) must be `lessThanOrEqual` the
  computed tax (column 8), per the regulation's own para. 17.9 cap.

Two of Form D's own tax-calculation-summary fields, whose printed formulas
reference Annex D1¹, were updated to cite the new fields instead of the
"D1¹ ... out of scope" placeholder language v1.0.0–v1.2.0 used:
`taxOnOtherIncomeAndMinimumBusinessTax` (row 19, now citing
`reliefsExcludedIncomeTotalPayableOrOverpaidTax` for the Annex D1¹ term —
the minimum-tax-on-business-activity term stays out of scope, since it
depends on Annex D3/D3¹) and `incomeSubjectToAdditionalTaxRate` (row 21, now
citing `reliefsExcludedIncomeTotalTaxableIncome` for the Annex D1¹ term).
`attachedAnnexNumbers`'s description was updated to list D1¹ among the
in-scope annexes. The 6 `foreignIncomeEntry{1-6}ExemptIncome` fields (Annex
D2, column 4), whose descriptions noted a filer might split income "between
Annex D2 and Annex D1¹ (out of scope for this schema version)", had that
parenthetical removed since D1¹ is now in scope — the underlying disclosure
(this schema cannot observe from either annex's own fields which one a
filer chose to carry the remainder) is unchanged and still applies, so the
rest of the sentence is kept.

## Disclosed source-fidelity findings

1. **This cycle's own source issue (GOV-4163) stated the table has 9 blank
   data rows; independent re-parsing this cycle found 7.** The issue's own
   text read: "Confirmed: 9 blank data rows + 1 'Kopā' (Total) row." A
   from-scratch Python `html.parser` walk of the raw `<TABLE>`...`</TABLE>`
   markup (verified via three independent methods: an `HTMLParser` DOM
   walk counting `<TR>` elements per section, a raw regex count of `<TR`
   occurrences, and a manual visual read of the table with `<TR>` boundaries
   marked) all agree: 11 total `<TR>` rows — 3 header rows (the COLSPAN=2
   super-header, the 25%/50% sub-header, and the numbered 1–10 row), 7
   identical blank data rows, and 1 "Kopā" row. The table's own column
   headers and the Kopā row's "X" marks on columns 3, 4, and 7 (both
   correctly anticipated by the issue) leave no doubt this is the correct
   table — Annex D1's own table (`lv_sourced_income`, modelled at v1.0.0)
   has 9 rows, and it is plausible that count was carried over by mistake
   from Annex D1 to Annex D1¹ when the source issue was drafted. Modelled
   7 income-entry rows accordingly, per this cycle's own independent count,
   not the issue's stated count.
2. **The Kopā row's column-1 label cell and the 1, 3, 4, and 7 columns have
   no corresponding total field**, following the same per-column-fidelity
   convention D1/D2/D2¹ already disclosed: column 1 is a static "Kopā" label
   (not a data box); columns 3, 4, and 7 are marked "X" (not applicable) on
   the printed Kopā row, since a 25%/50% expense-norm total or an averaged
   tax rate is not a meaningful figure to sum across rows with different
   income types. Only columns 2, 5, 6, 8, 9, and 10 have fillable total
   boxes, and only those 6 have a modelled `reliefsExcludedIncomeTotal...`
   field.
3. **The taxable-income (column 6), computed-tax (column 8), and
   payable/overpaid-tax (column 10) formulas are disclosed in each field's
   own description, not enforced via `crossFieldValidation`.** Column 6's
   formula subtracts *whichever one* of three mutually-exclusive alternative
   fields (columns 3, 4, or 5) is populated from column 2 — the
   `crossFieldValidation` vocabulary's `compare` shape only supports a
   direct two-field comparison, not a conditional three-way alternative
   subtraction, so this is disclosed rather than force-fit into an
   incorrect rule (the same class of gap this registry has already
   disclosed elsewhere, e.g. GOV-4037's "crossFieldValidation can't express
   a stated multiplication formula"). Column 8 (a genuine two-term
   multiplication, column 6 × column 7) and column 10 (a genuine two-term
   subtraction, column 8 − column 9) are likewise not arithmetic-checked,
   for the same reason — the vocabulary has no computed/derived-value
   concept, only presence/comparison rules.
4. **The tax-rate column is modelled as a 0–1 decimal fraction, not a 0–100
   percentage**, for the same reason as this document's existing Annex D2
   and Annex D2¹ tax-rate columns: the printed column-8 formula ("6. x 7.
   aile") multiplies column 6 directly by column 7 with no separate `/100`
   conversion term, so column 7 must already be expressed as a fraction for
   the arithmetic to balance — `validation.maximum` is set to `1`
   accordingly, disclosed in the field's own description since the printed
   form does not state the convention explicitly.
5. **Column 10 (payable/overpaid tax) is modelled with no
   minimum/maximum bound**, unlike this table's other numeric columns
   (all `minimum: 0`), because the regulation's own para. 17.10 explicitly
   instructs the filer to prefix an overpayment with a minus sign — the one
   column in this table that can genuinely hold a negative value.

## Scope boundaries

Annexes D3, D3¹, D4, DK, the DK annex, and GD remain open backlog. D3/D3¹
(business-activity income schedules) are excluded by this registry's own
established narrow-scoping precedent for large multi-schedule tax forms
(too formula-derived/broad — see GOV-4136); D4, DK, and GD were not
re-examined this cycle beyond the standing v1.0.0–v1.2.0 disclosure that
they remain unscoped. With Annex D1¹ now closed, no annex candidate sharing
this document's own real-HTML-table-rendering precedent is known to remain
open — any further deepening of this document would need to re-evaluate
whether D3/D3¹/D4/DK/GD's own narrow-scoping exclusion still holds, rather
than simply picking the next flagged-as-likely candidate the way the last
four cycles (v1.0.0 → v1.3.0) each did.

## Conformance

The 18 fixtures already committed at v1.2.0 (7 valid + 11 mutation controls)
were carried forward unchanged into
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.3.0/`, since
every new field in this release is optional and additive: none of those
fixtures reference Annex D1¹, and all remain valid/invalid for the same
reasons under v1.3.0. Three new fixtures were added:

- `valid-forest-timber-and-rental-income-excluded-from-reliefs.json` — a
  taxpayer with 3 Annex D1¹ rows (standing-forest sale using the 25% norm,
  timber sale using the 50% norm, and unregistered rental income using
  documented expenses), demonstrating all three mutually-exclusive
  column-3/4/5 alternatives across separate rows plus the Kopā totals.
- `mutation-invalid-reliefsexcludedincomeentry1-expense-norms-both-filled.json`
  — both the 25% forest-sale norm and the 50% timber-sale norm filled on the
  same row, exercising the new mutual-exclusivity `crossFieldValidation`
  rules. This fixture raises **2** rule violations, not 1: because the
  pairwise rules are symmetric (each of the two populated columns' own rule
  requires the other absent), a single two-column conflict trips both
  rules' own `requireAbsent` check. Documented here rather than
  understating it as a single-error case.
- `mutation-invalid-reliefsexcludedincomeentry1-advance-tax-exceeds-computed-tax.json`
  — advance-paid/withheld tax set higher than the row's own computed tax,
  exercising the new `compare`-shaped cap rule; raises exactly 1 error.

21 fixtures total (8 valid + 13 mutation controls).

An ephemeral, from-scratch Python conformance checker (deriving
required/`requiredWhen`/`validation`/`crossFieldValidation` rules directly
from this schema's own `fields[]`/`crossFieldValidation[]`, discarded after
use, not committed) ran all 21: all 8 valid scenarios at 0 errors, all 13
mutation controls each raising 1 or more errors as expected (12 raise
exactly 1, the mutual-exclusivity fixture raises 2 as explained above), and
confirmed every `requiredWhen`/`crossFieldValidation` field reference
resolves (0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass,
individually and as part of the full registry run (573/573 documents, after
regenerating `tools/govschema-client/registry-index.json`).
