# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.1.0

## Candidate selection

GOV-4144 ("GovSchema Standard Research"). v1.0.0 (GOV-4138) opened Latvia's
Taxes vertical with Form D plus Annex D1, and explicitly banked its own
remaining companion schedules — D1¹, D2, D2¹, D3, D3¹, D4, DK, GD — as open
backlog in its own Known Gaps section. This cycle re-scanned that backlog:
every other single-vertical gap in `CATALOG.md` is already a confirmed dead
end, so this cycle deepened the open Latvia Taxes backlog directly rather
than scouting a new jurisdiction, per this routine's standing procedure.
Annex D2 ("Fiziskās personas (rezidenta) ārvalstīs gūtie ienākumi" — a
resident's foreign-earned income) was picked over the other six remaining
annexes because it is broadly applicable (any Latvian resident with foreign
income, not a narrow carve-out like D1¹ or D2¹'s seafarer case), and its own
table renders as real HTML markup exactly like Annex D1's, making its column
structure independently verifiable against the regulation's own formula
cross-references the same way D1's was in v1.0.0.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html`, 365,651 bytes — the identical byte count v1.0.0
recorded. Per v1.0.0's own established fidelity signal for this source (its
sha256 is unstable because one obfuscated bot-detection `<script>` token
changes value on every fetch while the regulation text and Annex 1 tables
stay byte-for-byte identical), byte-count stability, not sha256, is the
correct re-verification check — confirmed unchanged.

## Extraction method

Extracted Annex D2's table with the same from-scratch Python
`html.parser.HTMLParser` DOM walk used for Annex D1 in v1.0.0, respecting
`colspan`/`rowspan`. Annex D2's header spans 2 rows over 9 columns:

- Column 1 (rowspan 2): "Valsts, kurā gūti ienākumi, un ienākuma
  izmaksātājs" (country and payer) — no sub-header.
- Columns 2–3 (colspan 2 over "Ārvalstī gūtie ienākumi"): "ienākuma veids"
  (income type) / "summa" (amount).
- Column 4 (rowspan 2): "Ienākums, kas atbrīvots no aplikšanas ar nodokli"
  (tax-exempt income) — no sub-header.
- Column 5 (rowspan 2): "Valsts sociālās apdrošināšanas maksājumi" (state
  social insurance payments) — no sub-header.
- Column 6 (rowspan 2): "Autoru izdevumi un citi izdevumi" (author and other
  expenses) — no sub-header.
- Column 7 (rowspan 1, own row-2 sub-header): "Ārvalstī samaksātais
  nodoklis" / "summa" (foreign tax paid — amount).
- Columns 8–9 (colspan 2 over "Nodoklis no ārvalstī gūtajiem ienākumiem
  (pēc Latvijas Republikā noteiktās likmes)"): "nodokļa likme" (tax rate) /
  "summa ((3. – 6.) x 8. aile)" (amount, printed formula inline in the
  header itself).

This column map was independently cross-checked against the regulation's
own instructional paragraphs 19.1–19.10 (`XX. aile "..." norāda ...`), which
name each column's caption and purpose in the same order — an exact match,
confirming no column was mis-ordered by the colspan/rowspan walk. The table
has 6 blank income-entry rows above its own "Kopā" (total) row, with no
trailing spacer-row artifact (unlike Annex D1's table, which had 9 data rows
plus one purely-cosmetic all-blank spacer row below them).

## Structure modelled

61 new `fields[]` in a new `foreign_sourced_income` step, inserted between
the existing `lv_sourced_income` (Annex D1) and `tax_calculation_summary`
steps — matching the regulation's own fill order (§ "Deklarāciju D aizpilda
šādā kārtībā": fill the D pielikumi first, then Form D's own rows). Total
document field count: 130 → 191.

1. **6 income-entry rows** (`foreignIncomeEntry{1-6}...`), 9 fields each:
   country and payer, income type, foreign income amount, tax-exempt
   income, state social insurance payments, author and other expenses,
   foreign tax paid, the Latvia-rate tax rate, and the computed tax amount.
2. **7 `foreignIncomeTotal...` fields** for the "Kopā" row — columns 3
   through 9 (foreign income amount, exempt income, social insurance
   payments, author/other expenses, foreign tax paid, tax rate, tax
   amount). Column 1 (country/payer) and column 2 (income type) are both
   free text with no total; the printed "Kopā" row itself renders their two
   cells as a single merged, unlabelled blank box (see Finding 2 below).

Four of Form D's own tax-calculation-summary fields, whose printed formulas
reference Annex D2, were updated to cite the new fields instead of the
"D2 ... out of scope" placeholder language v1.0.0 used: `taxableIncomeEarnedAbroad`
(row 2), `totalNonTaxableIncome` (row 5), `mandatorySocialInsuranceDeduction`
(row 6), and `advancePaidOrWithheldTax` (row 23). Annex D2¹, D3, and D3¹
terms in those same formulas remain disclosed as out of scope, unchanged.
`attachedAnnexNumbers`'s description was updated to list D2 among the
in-scope annexes.

## Disclosed source-fidelity findings

1. **Column 4's mutual-exclusivity rule is disclosed, not enforced as a
   hard cross-field rule.** Per the regulation's own para. 19.4, if column
   4 (tax-exempt income) is filled for a row, columns 5–9 are left blank
   for that same row; per para. 19.5, if the exemption covers only part of
   the income, the taxable remainder is declared on a *different* Annex D2
   row, or split between Annex D2 and the out-of-scope Annex D1¹. Because
   the split can legitimately land on an out-of-scope annex this schema
   version doesn't model, this is disclosed in column 4's own field
   `description` rather than encoded as a `crossFieldValidation`/
   `requiredWhen` rule that could reject an otherwise-valid filing.
2. **The "Kopā" row's own column-8 total box has no stated arithmetic
   meaning, but is modelled anyway.** The printed "Kopā" row reserves a
   blank box in every column position, including column 8 (the per-row
   Latvia tax rate) — but the regulation's text never states how multiple
   rows' tax rates should be combined into a single total (unlike every
   other totalled column, which is a plain sum). Modelled
   `foreignIncomeTotalTaxRate` as an optional field matching the printed
   box, with the ambiguity disclosed in its own description, rather than
   silently omitted or a summing formula fabricated.
3. **The printed "Kopā" row visually merges columns 2 and 3 into one blank
   cell** (a `colspan="2"` cell, unlike every other Kopā-row cell, which is
   `colspan="1"`) — read as the layout consequence of column 2 (income
   type) having no total value to print, not as evidence that column 3's
   total is itself ambiguous; `foreignIncomeTotalForeignIncomeAmount`
   (column 3) is modelled as a plain sum like the registry's other total
   columns.
4. **The tax-rate column is modelled as a 0–1 decimal fraction, not a
   0–100 percentage.** Column 9's printed formula multiplies column
   (3 − 6) directly by column 8 with no `/100` term ("apliekamos ienākumus
   (3.–6. aile) reizinot ar nodokļa likmi (8. aile)"), so column 8 must
   already be the rate expressed as a fraction for the arithmetic to
   balance — `validation.maximum` is set to `1` accordingly, disclosed in
   the field's own description since the printed form does not state the
   convention explicitly.

## Scope boundaries

Annexes D1¹, D2¹, D3, D3¹, D4, DK, the DK annex, and GD remain open backlog,
unchanged from v1.0.0's own Known Gaps list (see that version's
`VERIFICATION.md` for the full per-annex breakdown of which Form D rows
reference each). D2¹ (seafarer foreign income) and D1¹ (income excluded from
the non-taxable minimum/reliefs) are the two most likely next candidates,
since both share Annex D2's real-HTML-table rendering.

## Conformance

The 5 fixtures already committed at v1.0.0 (4 valid + 9 mutation controls —
14 total files) were carried forward unchanged into
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.1.0/`, since
every new field in this release is optional and additive: none of those
fixtures reference Annex D2, and all remain valid/invalid for the same
reasons under v1.1.0. Two new fixtures were added: a valid scenario with one
Annex D1 row and one Annex D2 row populated together
(`valid-foreign-income-single-country.json`, a Latvian salaried employee
with a second employer in Germany), and a mutation control
(`mutation-invalid-foreignincomeentry1taxrate-above-maximum.json`) exercising
the new `foreignIncomeEntry{N}TaxRate` field's `validation.maximum: 1`
constraint with a rate of `1.5`. 16 fixtures total (6 valid + 10 mutation
controls).

An ephemeral, from-scratch Python conformance checker (deriving
required/`requiredWhen`/`validation` rules directly from this schema's own
`fields[]`/`documents[]`, discarded after use, not committed) ran all 16:
all 6 valid scenarios at 0 errors, all 10 mutation controls each raising
exactly 1 error, and confirmed every `requiredWhen` field reference resolves
(0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass,
individually and as part of the full registry run.
