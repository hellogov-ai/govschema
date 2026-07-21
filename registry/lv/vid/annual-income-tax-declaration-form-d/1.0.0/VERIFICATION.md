# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.0.0

## Candidate selection

GOV-4138 ("GovSchema Standard Research"). The State Revenue Service's (VID)
annual personal income tax declaration was banked as Latvia's open Taxes
candidate during the GOV-4121/GOV-4129 cycles (`CATALOG.md` Known Gaps item
0a) — Latvia's other four verticals (DMV, Visa, Passport, National ID) were
already screened and found weaker during GOV-4121. This cycle authored the
declaration, deepening Latvia (the registry's 75th jurisdiction, opened via
`lv/ur/sole-trader-registration-kr2`, GOV-4129) to its second vertical.

## Reaching the live source

Fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html`, 365,651 bytes. No login, CAPTCHA, or WAF gate on
the page — the regulation's own Annex 1 (1. pielikums) renders the actual
declaration forms as real HTML `<TABLE>/<TR>/<TD>` markup, not just prose.

Re-fetched the same URL a second time this cycle to cross-check fidelity. The
byte count was stable across both fetches (365,651 bytes both times) but the
sha256 was **not** stable (`86daa64b…` vs `9c83f778…`), and neither matches
the sha256 the issue description cited (`e91fce06…`). A byte-for-byte diff of
the two fetches isolates the entire difference to one line: an obfuscated
`<script>eval(…)</script>` token that changes value on every request while
staying the same length — a bot-detection/analytics nonce unrelated to the
regulation's substantive content. The surrounding regulation text and every
Annex 1 table are byte-for-byte identical between fetches. **Byte-count
stability, not an exact sha256 match, is therefore the correct fidelity
signal for this source** — recorded here for future re-verification.

## Extraction method

Extracted with a from-scratch Python `html.parser.HTMLParser` subclass
walking the `<TABLE>/<TR>/<TD>` DOM in document order, respecting `colspan`/
`rowspan`, and treating `<IMG SRC=".../KVADRATS.GIF">` runs as either a
digit-box placeholder or an inline checkbox glyph depending on context (a
standalone `KVADRATS.GIF` cell is a digit box; one sitting inline inside a
paragraph of prose is a checkbox). This directly follows the issue's own
extraction warning: a naive tag-stripping regex
(`re.sub('<[^>]+>', ' ', html)`) was confirmed to flatten Annex 1's
`<SUP>1</SUP>` superscripts into the preceding text with no separating
space, turning every "D1¹"/"D2¹"/"D3¹" annex cross-reference into the
misleading strings "D11"/"D21"/"D31" — verified directly against the raw
markup, e.g. Form D row 19's formula prints literally as
`(<B>D1<SUP>1</SUP></B> 10.&nbsp;ailes kopsumma + …)`. The DOM-respecting
parser used here instead marks each `<SUP>` span explicitly, so every
formula reference in this schema's field descriptions correctly cites
"D1¹"/"D2¹"/"D3¹", not the naive-extraction artifact.

Annex D1's own column numbering was independently cross-checked against the
regulation's own formula cross-references, as the issue also directed:
Annex D1's column 8 is headed "Apliekamie ienākumi, neatskaitot darba devēja
veiktās iemaksas (2. – 3. – 6. – 7. aile)" — columns 2, 3, 6, 7 — matching
this schema's `incomeEntry{N}TaxableIncome` fields exactly; and Form D's own
row 1 formula, "D1 8. ailes summa + D3 11. rinda + D3¹ 13. rinda", confirms
column 8 is the taxable-income column feeding the cover declaration,
independently corroborating the column order recovered from the table's
2-header-row, 9-column layout (row 1: location & type [rowspan 2], gross
income [rowspan 2], non-taxable income [rowspan 2], justified expenses
[colspan 3, with 3 sub-columns in row 2: employee social-insurance
contributions / private-pension-fund and life-insurance contributions /
author's expenses], income-related expenses [rowspan 2], taxable income
[rowspan 2], advance-paid/withheld tax [rowspan 2]; row 3: plain column
numbers 1–9).

## Structure modelled

130 `fields[]` across 4 steps, plus 1 `documents[]` attestation entry:

1. **Identification** — taxation year, full name, personal code, phone
   number (Form D's own header).
2. **D1 pielikums** — Annex D1's 9-row income table (source & type, gross
   income, non-taxable income, 3 justified-expense sub-columns, income-
   related expenses, taxable income, advance-paid/withheld tax) plus the
   schedule's own "Kopā" totals row (8 columns; the income-source/type
   column has no total).
3. **Nodokļa aprēķins** — Form D's 27-row (plus 2 lettered sub-rows)
   tax-calculation summary: taxable income (Latvia/abroad/increase/total),
   non-taxable income, justified-expense deductions, the annual non-taxable
   minimum (general and pensioner variants), the 4 relief categories, total
   tax (with its progression-threshold breakdown), tax on other
   income/minimum business tax, tax on professional-athlete income, the
   additional-tax-rate mechanism, advance-paid/withheld tax, the
   budget-payable/refund result, the payment deadline, and the grand total.
4. **Pārmaksas atmaksa un iesniegšana** — the overpayment refund amount and
   IBAN, the count of attached document pages, a free-text list of attached
   annex numbers, a free-text list of attached expense-supporting documents,
   and a single signature/date pair.

## Disclosed source-fidelity findings

1. **The repeated page-footer signature is modelled once, not per page.**
   Form D's own "(datums)" / "(nodokļa maksātāja paraksts)" footer is
   reprinted identically at the foot of every physical page of Form D and
   of every one of its 7 companion schedules (11 occurrences counted across
   the full Annex 1 chunk) — modelled as a single `signatureDate`/
   `signature` field pair for the whole declaration packet, since this is a
   repeated print-page footer, not a distinct signature act per page. The
   regulation's own note 2 to Annex 1, verbatim, "Dokumenta rekvizītus
   \"datums\" un \"paraksts\" neaizpilda, ja elektroniskais dokuments ir
   sagatavots atbilstoši normatīvajiem aktiem par elektronisko dokumentu
   noformēšanu" ("the 'date' and 'signature' particulars are not filled in
   if the electronic document is prepared in accordance with the
   regulations on the design of electronic documents"), is why both fields
   are modelled `required: false` — the same e-signature carve-out
   convention this registry already established on
   `lv/ur/sole-trader-registration-kr2`'s own footnote-gated signature
   fields.
2. **Row 12 is the only summary row with an inline checkbox.** "GADA
   NEAPLIEKAMAIS MINIMUMS PENSIONĀRAM" is the only one of Form D's 27
   numbered summary rows whose label itself embeds a `KVADRATS.GIF`
   checkbox glyph inline in prose ("Tiek piemērota likuma \"Par
   iedzīvotāju ienākuma nodokli\" 12. panta četrpadsmitā daļa") rather than
   being a plain formula-derived amount row — modelled as two fields, a
   boolean `pensionerNonTaxableMinimumApplied` checkbox and a numeric
   `pensionerAnnualNonTaxableMinimum` amount gated `requiredWhen` the
   checkbox is `true`. Every other `KVADRATS.GIF` occurrence within the
   Form D + Annex D1 chunk (19 of 21 total occurrences in the full Annex 1
   document) is a plain digit-box placeholder in the identification header
   (11 boxes for the personal code, 8 for the phone number); the one
   remaining occurrence beyond the Form D/Annex D1 range falls inside the
   out-of-scope D3/D3¹ section and was not further investigated.
3. **Rows 26 and 27 are the only two rows with a 3-cell split.** "NODOKĻA
   SAMAKSAS TERMIŅŠ" (row 26, tax payment deadline) and "KOPĒJĀ NODOKĻA
   SUMMA KOPĀ" (row 27, total tax amount) are the only two of the 27 rows
   printed with 3 separate adjoining blank cells (widths 6%/6%/7%) instead
   of the single wide blank cell every other row uses, and neither prints
   sub-column labels distinguishing the 3 cells. Read as a day/month/year
   split for row 26 (modelled as `type: date`) but as page-width visual
   alignment reused from the row above for row 27, a plain bold-labelled
   amount row (modelled as `type: number`) — a disclosed judgment call in
   the absence of any labelling.

## Scope boundaries

Scoped to Form D (cover/identification and the tax-calculation summary)
plus Annex D1 (taxation-year income earned in Latvia, excluding
business-activity income and excluding income to which the annual
non-taxable minimum and reliefs do not apply — confirmed directly against
Annex D1's own printed subtitle, "(izņemot ienākumus no saimnieciskās
darbības vai ienākumus, kam nepiemēro gada neapliekamo minimumu un
atvieglojumus)"), matching this registry's existing narrow-scoping
precedent for large multi-schedule tax forms (e.g. CL Formulario 22,
GOV-1744).

**Known Gaps — explicitly out of scope, not fabricated:**

- **Annex D1¹** — "Taksācijas gadā gūtie ienākumi, kuriem nepiemēro gada
  neapliekamo minimumu un atvieglojumus" (income to which the annual
  non-taxable minimum and reliefs do not apply). Referenced by Form D rows
  19 and 21.
- **Annex D2** — "Fiziskās personas (rezidenta) ārvalstīs gūtie ienākumi"
  (a resident's foreign-earned income). Referenced by Form D rows 2, 5, 6,
  and 23.
- **Annex D2¹** — a seafarer's foreign-earned income aboard an
  internationally-operating vessel. Referenced by Form D rows 2 and 23.
- **Annex D3** — "Ienākumi no saimnieciskās darbības" (business-activity
  income, single-entry bookkeeping). Referenced by Form D rows 1, 5, and
  23.
- **Annex D3¹** — business-activity income under double-entry bookkeeping.
  Referenced by Form D rows 1, 5, and 23.
- **Annex D4** — justified expenses for education, medical services,
  donations and gifts. Referenced by Form D row 8.
- **DK, the DK annex, and GD** — these are not part of the 7-schedule list
  Annex 1's own "Deklarācijas pielikumi" section names (D1, D1¹, D2, D2¹,
  D3, D3¹, D4); they were named as backlog in the originating issue and are
  recorded here as still unscreened.

Every Form D summary row whose printed formula references one of the
out-of-scope annexes above is still modelled as a plain numeric field (so
the total the filer computes and transcribes can be captured); the
out-of-scope terms of each such formula are disclosed in that field's own
`description` rather than fabricated as separate modelled schedules.

This document also does not model the annual differentiated non-taxable
minimum's own calculation (row 11) — the regulation does not print a
formula for it; VID calculates and communicates it to each taxpayer
separately based on prior-year income.

## Conformance

5 valid mock scenarios — a salaried employee with a single Latvian employer
and no reliefs (`valid-salaried-employee-single-employer.json`); a pensioner
opting into row 12's non-taxable-minimum regime
(`valid-pensioner-nontaxable-minimum.json`); a taxpayer with 3 separate
Latvian income sources populating 3 Annex D1 rows plus the schedule's own
"Kopā" totals (`valid-three-income-sources-with-totals.json`); a taxpayer
requesting an overpayment refund to an LV IBAN
(`valid-overpayment-refund-iban.json`); and a taxpayer claiming all 4 relief
categories (`valid-all-reliefs-claimed.json`) — plus 9 mutation-control
fixtures (each of the 3 statically-required fields missing in turn, an
invalid `applicantPersonalCode` format, an invalid `taxationYear` below its
minimum, a missing `refundAccountIban` while `refundAmount` is positive, an
invalid `refundAccountIban` format, a missing
`pensionerAnnualNonTaxableMinimum` while `pensionerNonTaxableMinimumApplied`
is `true`, and an unknown top-level field) are committed under
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`/
`documents[]`, discarded after use, not committed) ran all 14 fixtures: all
5 valid scenarios at 0 errors, all 9 mutation controls each raising exactly
1 error, and confirmed every `requiredWhen` field reference resolves (0
dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass,
individually and as part of the full registry run.
