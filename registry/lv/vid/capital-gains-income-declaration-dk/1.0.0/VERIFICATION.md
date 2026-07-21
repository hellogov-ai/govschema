# Verification record — `lv/vid/capital-gains-income-declaration-dk` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

Derived directly from the regulation's own printed Annex 1 template and
completion instructions (§§3, 54-59). Not yet cross-checked against VID's own
live EDS (Elektroniskā deklarēšanas sistēma) online-filing screens for this
specific declaration — see "Path to a `verified` claim" below.

## Why this schema and why now (GOV-4193, "GovSchema Standard Research")

This registry's LV VID Taxes vertical has been deepened across several prior
cycles from Form D alone (GOV-4138, v1.0.0) through Annexes D2 (GOV-4144),
D2¹ (GOV-4154), D1¹ (GOV-4163), and D4 (GOV-4184/GOV-4186). The GOV-4169 and
GOV-4184 cycles' own re-examination of the remaining candidates (D3, D3¹, DK,
the DK pielikums, GD) found Declaration DK "viable, same class as
D1/D2/D1¹/D2¹" but explicitly "as its own schema/track, not a further Form D
annex step", since the regulation's own para. 3 lists Declaration DK, the
Declaration DK pielikums, and the ienākuma precizēšanas deklarācija GD as
three separate documents under the "deklarācija par ienākumu no kapitāla
pieauguma" umbrella — none of them numbered as a Form D pielikums the way
D1/D1¹/D2/D2¹/D4 are. This cycle authors Declaration DK as that new top-level
schema, closing the single most likely remaining candidate this registry's
own prior cycles had banked.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, **365,651 bytes** — the identical
byte count every prior lv/vid/annual-income-tax-declaration-form-d version
(v1.0.0-v1.4.1) has recorded, confirming this cycle reads the same live
regulation text.

## Extraction method

Not a summarizer tool: the raw HTML was searched directly for the paragraph
anchors governing Declaration DK (`data-num="54"` through `data-num="59"`) and
for the rendered Annex 1 `<TABLE>` markup itself. The table's raw `<TR>`/`<TD>`
structure was walked directly (not tag-stripped prose) to recover the exact
row/column layout:

- **Header rows** (`Vārds, uzvārds`; `Personas kods` — 6-digit + dash +
  5-digit boxes, matching Form D's own printed layout; the row-3 period block
  with a year field, a `(mēnesis)` month field, four quarter checkboxes, and a
  `Nerezidents` checkbox).
- **Main table**: a 9-column repeating-entry table (columns 1-9, confirmed by
  the literal `1|2|3|4|5|6|7|8|9` header row) with exactly **2 blank data
  rows** before a `Kopā` (Total) row whose own only non-"X"-blocked cells are
  columns 3, 5, and 9 — confirmed against §54.11-54.13's own explicit
  column-3/5/9-only Kopā instructions.
- **A second, fully parallel section**, `Ienākumi no darījumiem ar
  kriptoaktīviem` (Income from crypto-asset transactions), with the identical
  9-column layout except column 2 (income type) is printed "X"-blocked (no
  code needed, since every row in this section is implicitly a crypto-asset
  transaction) — again exactly 2 blank data rows plus its own `Kopā` row. This
  section's existence and its "completed separately, if any crypto-asset
  transactions occurred" condition (§54.1¹) is a genuine structural finding
  distinct from any Form D annex authored so far: no annex modelled prior to
  this schema has a second, independently-totalled parallel table on the same
  document.
- **Footnotes** 1 (income-type codes N/A/C/J/M plus modifiers R/F/L), 2 (the
  installment-payment condition shared by columns 4 and 6), and 3 (the
  withheld-at-source override for column 9) were read in full and matched to
  the field descriptions they govern.

## Disclosed finding: income-type code ambiguity

Footnote 1 reads (verbatim): "Ja tiek maksāta rokasnauda vai avanss,
ienākuma kodam **pievieno** kodu R. Ja deklarācijā DK darījumam piemērots
likuma \"Par iedzīvotāju ienākuma nodokli\" pārejas noteikumu 50. punkts,
**ieraksta** kodu F. Ja ... piemērots ... 196. punkts, ienākuma kodam
**pievieno** kodu L." R and L are explicitly **appended** ("pievieno") to the
base N/A/C/J/M code; F is instead **entered** ("ieraksta"), using a different
verb, which could mean F replaces the base code outright rather than
appending to it. The printed text does not disambiguate this. Rather than
silently pick one reading, `capitalAssetEntry{N}IncomeType`'s
`validation.pattern` (`^[NACJM][FLR]{0,3}$`) accepts either interpretation
(F combined with a base code, or F following the same append convention as
R/L) and the field's own `description` states the ambiguity explicitly. This
is the same category of disclosed-not-resolved finding this registry has
recorded before (e.g. the Annex D4 carry-forward row tension recorded in
`lv/vid/annual-income-tax-declaration-form-d`'s own v1.4.0 VERIFICATION.md).

## Scope boundaries

- **In scope:** Declaration DK's own two sections — regular capital-asset
  transactions and the separate crypto-asset-transactions section — per
  §§54, 54.1¹, 54.2-54.13.
- **Out of scope, open backlog:**
  - **The Declaration DK pielikums** ("Informācija par darījumiem, kas
    uzsākti, bet nav pabeigti vienā taksācijas gadā" — information on
    transactions begun but not completed within one tax year, §§58-61), a
    genuinely different 6-column table (confirmed this cycle: `Darījuma
    uzsākšanas diena`, `Darījuma veids*`, `Darījuma partnera reģistrācijas
    numurs`, `Darījuma partnera nosaukums`, `Informācija par darījuma
    partneri`, `Sagaidāmā ienākuma gūšanas gads, mēnesis`) with its own
    income/transaction-type footnote that includes a `K` (crypto-asset) code
    absent from Declaration DK's own footnote 1. Per the GOV-4169 cycle's own
    finding, this is its own top-level schema/track, not a further version of
    this document.
  - **The ienākuma precizēšanas deklarācija GD** (annual capital-gains
    correction declaration, §§62-63) — excluded as a formula-derived
    recomputation, the same reasoning already applied to Form D's own Annexes
    D3/D3¹.

## Conformance

14 fixtures committed at
`conformance/lv/vid/capital-gains-income-declaration-dk/1.0.0/` (3 valid + 11
mutation controls), covering: required-field omission (name, personal code),
pattern violations (personal code, income-type code), range violations (tax
year, the `Kopā` calculated-tax total's zero floor per §54.13), an enum
violation (quarter), the nonresident/quarter mutual-exclusivity
`crossFieldValidation` rule, the nonresident-month `requiredWhen` rule, the
installment received/attributable-portion pairing `crossFieldValidation`
rule, and unknown-field rejection.

An ephemeral, from-scratch Python conformance checker (deriving
required/`requiredWhen`/`validation`/`crossFieldValidation` rules directly
from this schema's own `fields[]`/`crossFieldValidation[]`, discarded after
use, not committed) ran all 14 fixtures: all 3 valid fixtures pass with zero
errors, and all 11 mutation fixtures fail with exactly the expected
violation.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass on
`schema.json` individually and as part of the full registry run, after
regenerating `tools/govschema-client/registry-index.json`.

## Path to a `verified` claim

VID's EDS (Elektroniskā deklarēšanas sistēma) online-filing screens for
Declaration DK were not compared field-by-field this cycle (EDS requires an
authenticated Latvian e-identity session, the same access barrier already
recorded against every other EDS-filed LV VID document in this registry).
A future cycle with EDS access could upgrade this to `verified`.
