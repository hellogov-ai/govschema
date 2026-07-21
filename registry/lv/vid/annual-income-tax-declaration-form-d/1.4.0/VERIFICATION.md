# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.4.0

## Candidate selection

GOV-4184 ("GovSchema Standard Research"), delegated to child issue GOV-4186.
CATALOG.md's own Known Gaps section (item 0b, re-examined in the GOV-4169
cycle) explicitly named Annex D4 ("Attaisnotie izdevumi par izglītību,
ārstnieciskajiem pakalpojumiem, ziedojumiem un dāvinājumiem" — deductible
expenses for education, medical services, donations and gifts) as "the
single most likely next candidate" once D1¹ was closed: "genuine `<TABLE>`
with 12 numbered columns, ~5 data rows — viable, same class as
D1/D2/D1¹/D2¹." This cycle picks up that exact candidate. D3/D3¹ remain
excluded (business-activity accounting, too formula-derived/broad per
GOV-4136); DK, the DK pielikums, and GD remain out of scope as their own
structurally distinct standalone declarations, not further Form D annexes.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, 365,651 bytes — the identical byte
count every prior version (v1.0.0–v1.3.0) recorded. Per this document's own
established fidelity signal, byte-count stability (not sha256, which is
unstable due to an obfuscated bot-detection `<script>` token) is the correct
re-verification check — confirmed unchanged.

## Extraction method

Located the instructional section "VIII. Deklarācijas D4 pielikuma
aizpildīšanas kārtība" (paragraphs 32–37) by searching the raw HTML for the
anchor `<a name='n8' class='satura_raditajs'>` / the literal heading text —
read the paragraph text directly (not any prior issue's own summary) to
independently derive the column structure:

- 32: who files it — a taxpayer with tax-year education, medical-service,
  donation/gift, or political-party-donation expenses who wants them
  included in the income-tax computation, using supporting documents (e.g.
  receipts, checks, payment orders, credit-institution account statements).
  A separate Annex D4 is filed per person (self, and one per family member).
  Per its own third sentence, a family member's included expenses are
  restricted to education and medical services only — not donations/gifts.
- 33.1–33.9: the 12 numbered columns and the "Taksācijas gada attaisnotie
  izdevumi kopā" (this tax year's totals) row's own fill rule for each.
- 34: the two-tier cap on columns 10 and 11 — donations/gifts (including to
  a political party) capped at the 600-euro limit under Section 10(1.3) of
  the law "Par iedzīvotāju ienākuma nodokli" (para. 34.1); the taxpayer's own
  expenses deducted before a family member's; and a 50%-of-taxable-income
  ceiling under the same Section 10(1.3) (para. 34.3).
- 35: the "Attaisnotie izdevumi, kas pārcelti no iepriekšējiem gadiem"
  (carried forward from prior years) row's own fill rule — column 1 (prior
  tax year), column 7 (the amount carried from that year's own column 12),
  column 11 (filled only if this tax year's own expenses did not already
  exceed the norm), and column 12 (this row's own carry-forward-again
  amount).
- 36: the "Kopā" (grand total) row — sums columns 10 and 11 of the
  this-year-totals row, plus column 11 of the carried-forward row.
- 37: the "Nodokļa maksātāja ģimenes locekļa dati" (taxpayer's family member
  data) section is filled in only when declaring a family member's
  education/medical expenses.

Found Annex D4's own data-entry `<TABLE>` markup in the same combined
docx-sourced HTML bundle (Form D + D1 + D1¹ + D2 + D2¹ + D3 + D3¹ + D4) that
D1's, D2's, D2¹'s, and D1¹'s own tables were extracted from at
v1.0.0–v1.3.0 — located it by searching for the printed "D4" page marker
box (`<P STYLE="font-weight: bold; text-align: right">D4</P>`) that
immediately precedes it, then walking forward through the raw `<TABLE>`
markup to the `Nodokļa maksātāja ģimenes locekļa dati` family-member
sub-table that immediately follows it (the same page-marker-box boundary
convention this document's own D1¹/D2/D2¹ extractions already established,
so there is no ambiguity about which annex's table this is).

Extracted with a from-scratch Python regex/DOM walk over `<TR>`/`<TD>`
elements, respecting `COLSPAN`. The table has 13 `<TR>` rows across 2
`<TABLE>` blocks (a small "Personas kods" header box, then the main data
table): 3 header rows (the two-level column-group super-header, then the
numbered 1–12 row), 2 blank current-year data-entry rows, the "Taksācijas
gada attaisnotie izdevumi kopā" totals row, a "pārcelti no iepriekšējiem
gadiem" section-label row, 3 blank prior-year carry-forward rows (labelled
"1.", "2.", "3." in the source), and the final "Kopā" row. This matches
CATALOG.md's own pre-scouted "~5 data rows" figure (2 current-year entries +
3 carry-forward rows) and cross-checks exactly against paragraphs 33.1–33.9
and 35.1–35.4's own column captions and purposes.

## Structure modelled

38 new `fields[]`, in a new `deductible_expenses` step inserted between the
existing `seafarer_foreign_income` (Annex D2¹) and `tax_calculation_summary`
(Declaration D) steps — matching the regulation's own section order (II. D1
through VIII. D4, then IX. Declaration D). Total document field count:
307 → 345.

1. **2 current-year entry rows** (`deductibleExpenseEntry{1-2}...`), 8
   fields each: document date, document number, provider registration
   number/personal code, provider name, education expenses, medical
   expenses, donations/gifts expenses, and political-party donations/gifts
   expenses. Columns 7, 10, 11, and 12 have no per-row field — the
   regulation's own para. 6.1 explicitly excludes them from the per-entry
   fill instruction ("izņemot ... D4 pielikuma 10., 11. un 12. aili"; column
   7 is likewise only ever filled at the totals-row level per para. 33.9.3),
   so these columns are only computed at the "Taksācijas gada attaisnotie
   izdevumi kopā" row.
2. **8 `deductibleExpenseTotal...` fields** for the "Taksācijas gada
   attaisnotie izdevumi kopā" row: education expenses (column 5), medical
   expenses (column 6), total expenses (column 7), donations expenses
   (column 8), political-party donations expenses (column 9), donations
   capped at limit (column 10), education/medical capped at limit
   (column 11), and carry-forward to next years (column 12).
3. **3 prior-year carry-forward entries**
   (`deductibleExpenseCarryForwardEntry{1-3}...`), 3 fields each: prior year
   (column 1), total expenses carried (column 7), and education/medical
   capped at limit (column 11).
4. **2 `deductibleExpenseGrandTotal...` fields** for the "Kopā" row:
   donations capped at limit (column 10) and education/medical capped at
   limit (column 11).
5. **3 family-member fields** (`deductibleExpenseFamilyMember...`): full
   name, personal code, and degree of kinship, for the "Nodokļa maksātāja
   ģimenes locekļa dati" section.

**Cross-field validation.** Added 5 new `crossFieldValidation` rules
(33 total, up from 28), following this document's own established
"capped-value cannot exceed the uncapped total" `compare` shape (the same
pattern as v1.2.0's `pensionerAnnualNonTaxableMinimum` cap and v1.3.0's
`reliefsExcludedIncomeEntry{N}AdvanceTaxWithinComputedTax`):

- `deductibleExpenseTotalEducationMedicalCappedWithinTotalExpenses`: column
  11 (this-year total, capped) `lessThanOrEqual` column 7 (this-year total,
  uncapped), per para. 33.9.7's own "ne vairāk par" (no more than) language.
- `deductibleExpenseTotalCarryForwardWithinTotalExpenses`: column 12
  (carry-forward to next years) `lessThanOrEqual` column 7 (this-year total),
  since para. 33.9.8 defines column 12 as column 7 minus column 11 (a
  non-negative capped value cannot exceed the total it's subtracted from).
- `deductibleExpenseCarryForwardEntry{1-3}CappedWithinTotalExpenses`: each
  carry-forward row's own column 11 (capped) `lessThanOrEqual` its own
  column 7 (carried total), for the same reason as the this-year-total pair
  above, applied per para. 35.3/35.4's row-level version of the same rule.

No `crossFieldValidation` rule enforces the column-10 donations cap or the
column-7 = column-5 + column-6 sum, for the same disclosed reason as every
prior version's own totals fields (v1.0.0's Annex D1, v1.3.0's Annex D1¹):
the vocabulary's `compare` shape only supports a direct two-field
comparison, not a multi-term sum — see Finding 3 below.

## Disclosed source-fidelity findings

1. **The 600-euro donations/gifts cap and the education/medical expense
   norm are both cross-referenced, not restated, by this regulation's own
   text.** Para. 34.1 names the "likuma 'Par iedzīvotāju ienākuma nodokli'
   10. panta 1.3 daļā noteiktais ierobežojums" (the limit set by Section
   10(1.3) of the Personal Income Tax law) for donations/gifts, without
   printing the euro figure directly in this annex's own paragraph text —
   the 600-euro figure is stated once, in passing, inside para. 34.1's own
   worked-example sentence ("Ja attaisnotie izdevumi ... pārsniedz 600 euro
   ierobežojumu..."), which is how it was recovered here. The
   education/medical norm is cross-referenced to "Ministru kabineta
   noteikumos par attaisnotajiem izdevumiem par izglītību un ārstnieciskajiem
   pakalpojumiem" (a separate Cabinet Regulation on education/medical
   deductible-expense norms) with no figure given in this regulation at all.
   Both cross-references are disclosed in the relevant fields' own
   descriptions (`deductibleExpenseTotalDonationsCappedAtLimit`,
   `deductibleExpenseTotalEducationMedicalCappedAtLimit`) rather than
   asserting a specific number this document does not itself state.
2. **The 50%-of-taxable-income ceiling (para. 34.3) is disclosed but not
   separately modelled as its own field or validation rule** — it is a
   second, alternative cap that only binds when the taxpayer's total
   education/medical/donations expenses (including family members') exceed
   half of Declaration D's own row-3 taxable-income figure, a cross-annex
   condition this schema version does not attempt to encode structurally,
   consistent with this document's own precedent of disclosing rather than
   force-fitting multi-field arithmetic conditions the `crossFieldValidation`
   vocabulary cannot express (see GOV-4037's "crossFieldValidation can't
   express a stated multiplication formula" and this document's own v1.3.0
   Finding 3).
3. **Column 7 (this-year total expenses, column 5 + column 6) and column 12
   (carry-forward, column 7 − column 11) are documented in each field's own
   description, not arithmetic-checked**, for the same reason as v1.3.0's
   Finding 3: the `crossFieldValidation` vocabulary has no computed/derived-
   value concept, only two-field presence/comparison rules, so a genuine
   sum or difference is disclosed rather than encoded as an inequality that
   would only partially capture the constraint.
4. **The carry-forward-row-level column 1 ("prior year") is rendered in the
   source as a placeholder row number ("1.", "2.", "3."), not the actual
   year value**, in the combined docx-sourced HTML table's own merged
   COLSPAN=2 label cell. Modelled per the regulation's own para. 35.1 text
   (which is unambiguous that column 1 holds "pirmstaksācijas gadu" — the
   pre-tax year) rather than the rendering artifact, the same class of
   docx→HTML conversion quirk this document's own D1¹ extraction already
   flagged for a different column pair.
5. **No field models a boolean "declaring for a family member" flag.** The
   source's para. 37 states the family-member section "aizpilda, ja..."
   (is filled in if...) a condition, not a printed checkbox — there is no
   controlling field to attach a `requiredWhen` to, so the 3
   `deductibleExpenseFamilyMember...` fields are modelled `required: false`
   with the condition disclosed in each field's own description, consistent
   with how conditional-but-flagless sections are modelled elsewhere in this
   registry.

## Scope boundaries

Annexes D3, D3¹, DK, the DK pielikums, and GD remain open backlog. D3/D3¹
(business-activity income schedules) are excluded by this registry's own
established narrow-scoping precedent for large multi-schedule tax forms
(too formula-derived/broad — see GOV-4136). DK is a standalone companion
declaration on begun-but-not-completed capital-asset transactions (its own
schema/track, not a further Form D annex step, per the GOV-4169 cycle's own
re-examination); the DK pielikums is DK's own genuine sub-annex, structurally
distinct for the same reason; GD is a formula-derived tax recomputation,
excluded for the same reasoning as D3/D3¹. With Annex D4 now closed, no
further candidate sharing this document's own real-HTML-table-rendering
precedent is known to remain open — any future deepening of this document
would need to scope DK/the DK pielikums as their own top-level schema(s)
rather than a further version bump of this one.

## Conformance

The 21 fixtures already committed at v1.3.0 (9 valid + 12 mutation controls)
were carried forward unchanged into
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.4.0/`, since every
new field in this release is optional and additive: none of those fixtures
reference Annex D4, and all remain valid/invalid for the same reasons under
v1.4.0. 5 new fixtures were added:

- `valid-education-medical-donations-with-carryforward.json` — a taxpayer
  with 2 current-year Annex D4 entries (education and medical expenses,
  plus donations and political-party donations), this-year totals, and 1
  prior-year carry-forward row, demonstrating the full multi-row/multi-tier
  structure.
- `valid-family-member-education-expenses.json` — a taxpayer declaring a
  family member's (son's) education expenses via the family-member section,
  with no donations/medical component (per para. 32's own restriction).
- `mutation-invalid-deductibleexpensetotal-educationmedicalcapped-exceeds-total.json`,
  `mutation-invalid-deductibleexpensetotal-carryforward-exceeds-total.json`,
  `mutation-invalid-deductibleexpensecarryforwardentry1-capped-exceeds-total.json`
  — one violation per new `crossFieldValidation` rule, each setting a capped
  column to a numeric value exceeding the uncapped total it must not exceed.

All 9 valid fixtures and 14 mutation fixtures (the full v1.4.0 set) were
re-run this cycle against a from-scratch Python mock validator (independent
of `tools/validate.mjs`/`validate-ajv.mjs`, which check meta-schema shape
only, not field-level semantics) implementing required/requiredWhen/type/
pattern/min-max/crossFieldValidation checks read directly from this
version's own `schema.json`: all 9 valid fixtures pass with zero errors, and
all 14 mutation fixtures fail with exactly the expected violation. Both
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass on
`schema.json` itself (576/576 registry documents, up from 575, after this
addition).
