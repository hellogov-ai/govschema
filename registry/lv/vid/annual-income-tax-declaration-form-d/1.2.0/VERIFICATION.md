# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.2.0

## Candidate selection

GOV-4154 ("GovSchema Standard Research"). v1.1.0 (GOV-4144) deepened
Latvia's Taxes vertical with Annex D2 (foreign-sourced income) and
explicitly named D2¹ (seafarer foreign income) and D1¹ (income excluded
from the non-taxable minimum/reliefs) as the two most likely next
candidates, since both share Annex D2's real-HTML-table rendering (unlike
D3/D3¹/D4/DK/GD, which either lack a rendered table or bundle in
business-activity accounting this registry's narrow-scoping precedent
already excludes). This cycle picked Annex D2¹ over D1¹: D2¹'s own
instructional paragraph (§ 20) is a single, self-contained provision with
a fully worked formula chain (columns 1–8, each with its own sub-paragraph
20.1–20.8), giving the same independent formula cross-check D1 and D2 both
had: D1¹ remains open backlog for the same reason it was banked at v1.1.0.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, 365,651 bytes — the identical
byte count v1.0.0 and v1.1.0 both recorded. Per those versions' own
established fidelity signal for this source (its sha256 is unstable
because one obfuscated bot-detection `<script>` token changes value on
every fetch while the regulation text and Annex 1 tables stay byte-for-byte
identical), byte-count stability, not sha256, is the correct
re-verification check — confirmed unchanged.

## Extraction method

Located the instructional section "V. Deklarācijas D2¹ pielikuma
aizpildīšanas kārtība" (§ 20, paragraphs 20.1–20.8) by searching the raw
HTML for `D2<SUP>1</SUP> pielikuma aizpildīšanas kārtība` — a literal
`<SUP>1</SUP>` tag renders the exponent, so a naive plain-text search for
"D2¹" as a single string does not find it, exactly as the prior versions'
own extraction notes flagged for "D1¹"/"D2¹"/"D3¹" generally. Read the
paragraph text directly (not the issue's own summary) to independently
re-derive the 8-column structure:

- 20.1: column 1, "Personas (jūrnieka)...ienākumu gūšanas vieta" — the
  country whose flag the vessel flies, plus the payer's (employer's) name
  and address.
- 20.2: column 2, "Bruto ieņēmumi" — all income earned during the tax year
  working aboard the vessel, in monetary terms.
- 20.3: column 3, "Ienākumu gūšanas periods" — the employment period's
  start and end date; a separate row per period if the taxpayer worked
  multiple periods with breaks during the year.
- 20.4: column 4, "Mēneša minimālajai darba algai piemērojamais
  koeficients" — the coefficient applied to the monthly minimum wage:
  2.5 for officers (virsniekiem), 1.5 for other personnel (pārējam
  personālam), per the law "Par iedzīvotāju ienākuma nodokli" section 8,
  fourth part.
- 20.5: column 5, "Nodarbinātības periodā ar nodokli apliekamais
  ienākums" — the taxable income for the period, computed as the monthly
  minimum wage × the column 4 coefficient × the employment period
  (expressed in months and days); a partial month is prorated by dividing
  the monthly norm by the number of calendar days in that month.
- 20.6: column 6, "Aprēķinātais nodoklis...— nodokļa likme" — the Latvia
  tax rate, calculated per subparagraph 6.3.
- 20.7: column 7, "...— summa" — the computed tax amount: column 5
  multiplied by column 6.
- 20.8: column 8, "Ārvalstī samaksātais nodoklis" — foreign tax paid;
  filled in only if tax was actually withheld/paid abroad on the
  employee's income ("Ja nodoklis ārvalstī nav ieturēts (samaksāts), 8.
  aili neaizpilda").

This exactly matches the issue's own summary — a genuine independent
confirmation, not a rubber stamp, since the paragraph text was read fresh
from the raw HTML rather than assumed.

Found Annex D2¹'s own data-entry `<TABLE>` markup in the same combined
docx-sourced HTML bundle (Form D + D1 + D1¹ + D2 + D2¹ + D3 + D3¹ + D4)
that D1's and D2's own tables were extracted from at v1.0.0/v1.1.0 —
located it by searching for the literal printed column-1 header text
("Personas (jūrnieka), kas ir nodarbināta...ienākumu gūšanas vieta (valsts,
izmaksātāja nosaukums, adrese)"), then walking backward to the enclosing
`<TABLE>` tag and forward to its matching `</TABLE>`. Extracted with the
same from-scratch Python `html.parser.HTMLParser` DOM walk used for D1 and
D2, respecting `colspan`/`rowspan`. The table's own 3 header rows
(sub-headers "no"/"līdz" for the period columns and "nodokļa likme"/"summa"
for the tax-calculation columns, then the numbered 1–8 row) cross-check
exactly against § 20.1–20.8's own column captions and purposes — an exact
match, confirming no column was mis-ordered by the walk.

## Structure modelled

40 new `fields[]` in a new `seafarer_foreign_income` step, inserted
between the existing `foreign_sourced_income` (Annex D2) and
`tax_calculation_summary` steps — matching the regulation's own fill order.
Total document field count: 191 → 231.

1. **4 income-entry rows** (`seafarerIncomeEntry{1-4}...`), 9 fields each:
   country and payer, gross income, employment-period start date,
   employment-period end date, the monthly-minimum-wage coefficient, the
   computed taxable income for the period, the Latvia-rate tax rate, the
   computed tax amount, and foreign tax paid. The table itself has only 4
   blank data rows (unlike Annex D2's 6), followed directly by its own
   "Kopā" row with no spacer row — the same row-count gradient this
   registry has already disclosed elsewhere across companion schedules
   (e.g. the KZ 250.0X series, GOV-4085).
2. **4 `seafarerIncomeTotal...` fields** for the "Kopā" row: gross income
   (column 2), taxable income (column 5), tax rate (column 6), and tax
   amount (column 7). See Finding 3 below for why columns 1, 3, 4, and 8
   have no corresponding total field.

The employment-period columns (`PeriodStart`/`PeriodEnd`) are modelled as
`type: "date"` fields following this registry's own existing
period-start/end convention (e.g. `fi/vero/50a-earned-income-and-deductions`'s
`taxAtSourceEmploymentPeriod{N}Start`/`...End`), rather than splitting the
printed table's 6 period sub-columns (3 for "no", 3 for "līdz") into
individual digit-box fields — the printed sub-column split does not map
cleanly onto day/month/year boxes (see Finding 2 below), so the coarser,
already-established date-pair convention was used instead.

The coefficient column is modelled as `type: "number"` with
`validation.enum: [1.5, 2.5]`, following this registry's own existing
convention for fixed-choice numeric fields (e.g.
`ch/zh/sta/versicherungspraemien`'s `marriedMaxDeductionStateTax` with
`validation.enum: [5800, 8700]`), rather than a string `enum` type — the
printed form instructs the filer to write in the numeral itself
("norādīt 1,5 vai 2,5"), and the value is used directly as a multiplier in
the column 5 formula, so keeping it numeric avoids an unnecessary
string-to-number conversion step for any downstream consumer.

Two of Form D's own tax-calculation-summary fields, whose printed formulas
reference Annex D2¹, were updated to cite the new fields instead of the
"D2¹ ... out of scope" placeholder language v1.1.0 used: `taxableIncomeEarnedAbroad`
(row 2, now citing `seafarerIncomeTotalTaxableIncome`) and
`advancePaidOrWithheldTax` (row 23, now citing `seafarerIncomeTotalTaxAmount`
for the column-7 term — see Finding 3 for why the column-8 alternative
still has no field to cite). Annex D1¹, D3, and D3¹ terms in those same
formulas remain disclosed as out of scope, unchanged. `attachedAnnexNumbers`'s
description was updated to list D2¹ among the in-scope annexes.
`totalNonTaxableIncome` and `mandatorySocialInsuranceDeduction` (the two
other Form D rows v1.1.0 updated for Annex D2) do not reference D2¹ in
their own printed formulas at all — confirmed by re-reading both
descriptions and the regulation's own paragraph text for those rows — so
neither needed a change this cycle.

## Disclosed source-fidelity findings

1. **The taxable-income column does not arithmetically derive from the
   gross-income column, unlike every other income table in this
   document.** In Annex D1 and Annex D2, the taxable-income column is a
   straight subtraction formula applied to the gross-income column on the
   same row. Annex D2¹ is structurally different: column 5 ("Nodarbinātības
   periodā ar nodokli apliekamais ienākums") is a notional amount computed
   from the *statutory monthly minimum wage* × the column 4 coefficient ×
   the employment period — entirely independent of column 2's actual gross
   income figure. This means a seafarer's real earnings (column 2) and the
   amount Latvia actually taxes (column 5) can differ substantially, by
   design; both columns are modelled as independent fields with no
   cross-field arithmetic relationship asserted between them, since the
   regulation itself asserts none.
2. **The employment-period column's own sub-column layout does not split
   cleanly into per-date digit boxes.** The printed table's row-2 sub-header
   splits column 3 into "no" (start, `colspan="3"`) and "līdz" (end,
   `colspan="3"`) — 6 total sub-column units. But the actual data row's
   `<TD>` layout is 5 cells with widths 3%/3%/3%(`colspan="2"`, containing a
   printed "–")/3%/3%, i.e. the middle sub-column pair is merged into one
   cell holding a static dash rather than a fillable box, and the boundary
   between the "no" and "līdz" halves does not align with any natural
   day/month/year split. Rather than fabricate a 6-box digit layout the
   table's own markup does not support, `PeriodStart`/`PeriodEnd` are
   modelled as two whole-date fields (this registry's own established
   convention for period start/end pairs elsewhere), with this cell-layout
   ambiguity disclosed here instead of encoded into the field structure.
3. **Annex D2¹'s own "Kopā" row omits a total box for column 8 (foreign tax
   paid), unlike Annex D2's own Kopā row, which totals its analogous
   column.** The printed Kopā row marks columns 1 (label only), 3 (period,
   both sub-column groups), 4 (coefficient), and 8 (foreign tax paid) with
   an "X" (not applicable) — leaving only columns 2, 5, 6, and 7 with
   fillable/total boxes. Column 8's own omission means Form D's own row-23
   formula ("Annex D2¹ column 7 or 8") has no corresponding modelled total
   field for its "or column 8" alternative, even though each individual
   row's `seafarerIncomeEntry{N}ForeignTaxPaid` value is captured — disclosed
   in `advancePaidOrWithheldTax`'s own description rather than fabricating a
   total the source form itself does not provide a box for.
4. **The tax-rate column is modelled as a 0–1 decimal fraction, not a 0–100
   percentage**, for the same reason as Annex D2's own tax-rate column at
   v1.1.0: the printed column-7 formula and header ("summa (5. x 6. aile)")
   multiply column 5 directly by column 6 with no separate `/100`
   conversion term, so column 6 must already be expressed as a fraction for
   the arithmetic to balance — `validation.maximum` is set to `1`
   accordingly, disclosed in the field's own description since the printed
   form does not state the convention explicitly.
5. **Column 8's conditional-fill rule is disclosed, not enforced as a hard
   requiredWhen/crossFieldValidation rule.** Per § 20.8, column 8 is only
   filled in if foreign tax was actually withheld/paid on the employee's
   income; if no such tax was withheld, the column is left blank. Because
   there is no other field on this schedule that reliably signals whether
   foreign withholding occurred (unlike Annex D2's column-4 exemption rule,
   which at least references a specific different-row/different-annex
   split), this is disclosed in the field's own description rather than
   encoded as a rule that could wrongly reject an otherwise-valid filing
   with genuinely no foreign withholding.

## Scope boundaries

Annexes D1¹, D3, D3¹, D4, DK, the DK annex, and GD remain open backlog,
unchanged from v1.1.0's own Known Gaps list (see that version's
`VERIFICATION.md` for the full per-annex breakdown of which Form D rows
reference each). D1¹ (income excluded from the non-taxable
minimum/reliefs) remains the single most likely next candidate, since it
shares Annex D1's and Annex D2's real-HTML-table rendering; it was the one
of the two v1.1.0-flagged candidates not picked up this cycle.

## Conformance

The 16 fixtures already committed at v1.1.0 (6 valid + 10 mutation
controls) were carried forward unchanged into
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.2.0/`, since
every new field in this release is optional and additive: none of those
fixtures reference Annex D2¹, and all remain valid/invalid for the same
reasons under v1.2.0. Two new fixtures were added: a valid scenario with
one Annex D2¹ row populated (`valid-seafarer-foreign-income.json`, a
Latvian seafarer employed for 6 months on a Panama-flagged vessel, with
"other personnel" coefficient 1.5, no foreign tax withheld — demonstrating
both the notional minimum-wage-based taxable-income computation, which is
deliberately far below the seafarer's actual gross income per Finding 1,
and the legitimate blank column-8 case per Finding 5), and a mutation
control (`mutation-invalid-seafarerincomeentry1coefficient-not-enum.json`)
exercising the new `seafarerIncomeEntry{N}Coefficient` field's
`validation.enum: [1.5, 2.5]` constraint with an out-of-range value of
`2.0`. 18 fixtures total (7 valid + 11 mutation controls).

An ephemeral, from-scratch Python conformance checker (deriving
required/`requiredWhen`/`validation` rules directly from this schema's own
`fields[]`/`documents[]`, discarded after use, not committed) ran all 18:
all 7 valid scenarios at 0 errors, all 11 mutation controls each raising
exactly 1 error, and confirmed every `requiredWhen` field reference
resolves (0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass,
individually and as part of the full registry run (572/572 documents,
after regenerating `tools/govschema-client/registry-index.json`).
