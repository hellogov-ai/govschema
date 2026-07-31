# Verification record — `pk/fbr/wealth-statement` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5731, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh rather than trusting the
in-repo state from memory. Every disclosed jurisdiction sitting at 5 of 6
verticals (AE Passport, BA Visa, JM/MN/TT National ID, TN DMV, SK/MK Visa,
GR National ID) turned out to already be a confirmed dead end or an
extensively re-screened weak/unresolved candidate from prior cycles — none
had a genuinely new, untested lead. The strongest actually-actionable,
pre-sourced candidate found instead was this document: the sibling
`pk/fbr/annual-individual-income-tax-return-it-1b` document's own v1.0.0
`description` (GOV-3104, 2026-07-15) explicitly named the same workbook's
"Wealth Statement" worksheet as "a strong companion-schema candidate for a
future cycle" but left it unauthored, and this document's own
`verification.notes` (quoted in full below) even pre-recorded the sheet's
row count (180 rows) and major-line-item count (27). This cycle picked
that pre-flagged, already-open-vertical companion rather than starting a
new jurisdiction from scratch.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/wealth-statement` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx` (same workbook as the sibling IT-1B document):
    <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200,
    **size 104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    identical to the byte count and hash the GOV-3104 cycle recorded for
    this same workbook on 2026-07-15, confirming no revision in the
    intervening year. No login/CAPTCHA gate on this direct
    `download1.fbr.gov.pk` URL.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`, `pip`, or `openpyxl` available in this environment; unzipped
    directly with Python's built-in `zipfile` module. Every worksheet is
    confirmed via `xl/workbook.xml`'s own `<sheets>` element: `IND
    (PROP-CG-OS)` (Form IT-1B, already modeled), `IND (BUS PLUS)` (Form
    IT-2), `Annex-A` through `Annex-F`, and `Wealth Statement` — this
    document's scope, mapped to `xl/worksheets/sheet9.xml` via
    `xl/_rels/workbook.xml.rels`'s `rId9` relationship, and cross-checked
    against the sheet's own printed title row ("WEALTH STATEMENT UNDER
    SECTION 116 OF THE INCOME TAX ORDINANCE, 2001").
  - Parsed `sheet9.xml`'s `sheetData` rows, `xl/sharedStrings.xml`'s shared
    string table, and the sheet's own `dataValidations` block cell-by-cell
    from the raw XML (row 1 through row 180, the sheet's last populated
    row).

## Scope decisions

The "Wealth Statement" worksheet is a 4-printed-page, 180-row, 27-major-
line-item net-worth disclosure — each of the 15 asset/liability categories
(Sr. 1–14 assets, Sr. 18 the sole liability category) is itself a small
table of bounded, roman-numeral-labeled sub-item rows (e.g. Sr. 6
"Investment" has sub-items i through xiii; Sr. 8 "Motor Vehicle" has i
through viii), each sub-item row carrying up to five columns (Form/
Description, Account or Registration No., Institution/Maker Name, Share %
or Capacity, and "Value at Cost").

**The category-total level, not the leaf sub-item level, is this
version's scope**, decided on the same evidentiary basis the sibling
`annual-individual-income-tax-return-it-1b` document's own v1.0.0 used to
exclude its Sr. 1 (Property) sub-item breakdown: the sheet's own
`dataValidations` block carries a `greaterThanOrEqual 0` rule whose `sqref`
union (`J8:J17 J20:J29 J32:J35 J38:J41 J48:J51 J54:J76 J79:J85 J88:J95
J102:J104 J107:J110 J113:J116 J118 J121:J124 J146:J153 J156 J159:J167
J176:J177 J134:J137 J127:J130`) covers every leaf sub-item row across all
fifteen categories but pointedly excludes every category-total row (`J6`,
`J18`, `J30`, `J131`, `J138`, `J154`, and the reconciliation subtotals
`J155`, `J157`, `J158`, `J168`, `J169`, `J174`). Checked each of those
excluded cells directly for a `<f>` formula element (the marker of a true
live-calculated cell): none carries one except `J173` (Unreconciled
Amount, `=SUM(J158)-SUM(J168)-SUM(J169)`, evaluating to `0` in this blank
template). In other words, the leaf rows — not the totals — are the cells
this workbook itself treats as fillable numeric entries; the category
totals are meant to be hand-computed by the filer and are not independently
validated, structurally the same situation IT-1B's own Sr. 1 was in (there,
one category out of many; here, the pattern recurs across all fifteen).

Given GSP-0009 (the repeating-value/array field-type proposal) remains
Proposed and CEO-gated, modeling every leaf row of all fifteen categories
individually would require flattening dozens of same-shaped rows into
several hundred distinct field names for what is fundamentally one
repeating (description, value) table shape repeated fifteen times — a
disproportionate expansion relative to the value delivered, and the same
class of judgment call this registry has made repeatedly for large bounded
tables (see e.g. the Mauritius LP1/LP4 companion schemas' own disclosed
bounded-slot decisions). This version instead models the **category-total
reportable figures** — Sr. 1 through Sr. 27, i.e. exactly the level IT-1B
itself models its own headline income lines at — which fully captures the
statement's actual purpose (the year-over-year net-worth reconciliation)
without fabricating row-level detail the source form does not itself
validate as directly entered. The full leaf-level sub-item breakdown (all
fifteen categories' own repeating rows and their up-to-five columns each)
is left as disclosed, open backlog for a future companion-schema or
minor-version cycle.

**Exception: the Inflows (Sr. 23) and Outflows (Sr. 25) sub-items are
modeled individually, not collapsed to a total-only field.** Unlike the
fifteen asset/liability categories, these two sections are not a repeating
table of same-shaped rows — each of Sr. 23's nine and Sr. 25's three
sub-items is a distinct, uniquely-labeled economic concept (e.g. "Income
declared … subject to normal tax", "Foreign Remittance", "Inheritance",
"Gift", "Loss on Disposal of Assets") with no shared column structure to
flatten. Modeling each as its own named field is both low-cardinality
(12 fields total) and higher-fidelity than a single blended total, and
follows the same principle IT-1B itself used to justify modeling its own
distinct headline income lines (capital gains, other sources, foreign
income, AOP shares) individually rather than collapsing them into one
"Total Income" figure alone.

## Disclosed structural findings

1. **Printed sub-item count vs. actual row count mismatch (Cash, Sr. 12).**
   The category header for Sr. 12 ("Cash (Non-business)") prints the
   bracket label `[Sum of 12 i to 12 x]`, implying ten roman-numeral
   sub-item rows exactly like every sibling category. The sheet, however,
   carries exactly **one** physical row beneath it (row 118, "Notes &
   Coins", no roman-numeral marker at all) — confirmed by checking every
   row between 118 and the next category header (119, "Any Other Asset")
   for a missed cell. Every other category's printed bracket count and
   physical row count agree; this is the one exception. Modeled as a
   single `cashValue` field; the mismatch is disclosed here rather than
   silently resolved.
2. **Missing roman numeral in the source's own numbering (Inflows, Sr.
   23).** The Inflows section's sub-items are labeled i, ii, iii, iv, vi,
   vii, viii, ix, x — **"v" is skipped entirely** between iv (row 162) and
   vi (row 163), confirmed by inspecting every cell in that row range for
   a missed entry. The category's own bracket label reads "23 (i) to
   23(x)", which would imply ten sub-items, but only nine are actually
   printed. This document models the nine sub-items that actually exist
   (`inflowIncomeDeclaredNormalTax` through `inflowOther`) and does not
   fabricate a tenth field for the missing "v".
3. **Unconditionally required Business Address.** Row 5 ("Business
   Address*") carries a printed required-field asterisk with no visible
   conditional qualifier anywhere on the sheet (e.g. no "if applicable" or
   parenthetical), even though not every individual filer necessarily
   operates a business. Modeled as `required: true` per the form's literal
   marking, since no alternative signal (a checkbox, a "N/A" convention, or
   an instruction sheet) was found on this sheet to justify treating it as
   conditional. Disclosed as a plausible over-broad requiredness a future
   cycle could revisit if a filer-facing instruction document surfaces.
4. **CNIC constraint re-confirmed identical to the sibling document.** The
   sheet's own `dataValidations` block carries a `type="whole"` rule on
   `C3:H3` (taxpayer CNIC) and `G178:H178` (declarant CNIC) bounded
   `[1000000000000, 9999999999999]` — the identical 13-digit constraint
   already modeled on `annual-individual-income-tax-return-it-1b`'s own
   `taxpayerCnic`/`declarantCnic` fields, confirming the same NADRA CNIC
   format applies uniformly across both worksheets of this workbook.
5. **No equivalent Sr. 17 bracket-label defect found.** The sibling IT-1B
   document disclosed a genuine printed-formula-label defect on its own
   Sr. 17 (a bracket summing a nonexistent third addend). This sheet's
   equivalent bracket labels — Sr. 17 "Total Assets [15+16]" and Sr. 20
   "Net Assets Current Year [17-19]" — were independently checked
   arithmetically against this document's own field set and found
   internally consistent; no equivalent defect exists on this sheet.
6. **The verification/declaration paragraph (rows 178–179) is modeled as
   a `documents[]` `attestation` entry**, quoted verbatim, following the
   same convention as the sibling IT-1B document. Its blanks — declarant
   name, declarant CNIC, and the printed "Self / Representative" capacity
   choice (referencing section 172 of the Income Tax Ordinance, 2001) —
   are modeled as `declarantName`, `declarantCnic`, and the
   `declarantCapacity` enum, all `required: true`, using the same
   `SELF`/`REPRESENTATIVE` enum values already established by the sibling
   document.
7. **Out of scope for this version, disclosed here rather than silently
   omitted:** the leaf-level sub-item breakdown beneath all fifteen
   asset/liability categories (see "Scope decisions" above); the disposed
   assets (Sr. 27) sub-item breakdown (two generic, unlabeled rows —
   modeled only at the Sr. 27 total level, `disposedAssetsValue`, for the
   same reason); Annexes A through F and the "IND (BUS PLUS)" worksheet
   (Form IT-2), both already disclosed as open backlog by the sibling
   IT-1B document's own v1.0.0.

## Conformance fixtures (Phase 3)

6 fixtures committed under `conformance/pk/fbr/wealth-statement/1.0.0/`: 2
valid scenarios plus 4 mutation-control fixtures, each derived from one of
the valid fixtures by a single targeted mutation. All 6 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`, not committed to
the repo) before being finalized:

- `valid-salaried-modest-portfolio.json` (a salaried individual reporting
  a residential property and a small investment, no liabilities, no
  business address) — **0 errors**.
- `valid-self-employed-with-liability-and-remittance.json` (agricultural
  property, business capital, a motor vehicle, a loan liability, a foreign
  remittance inflow, and a gift outflow) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `businessAddress`)
  — **exactly 1 error**.
- `mutation-control-invalid-enum-declarant-capacity.json` (sets
  `declarantCapacity` to `GUARDIAN`, not in the enum) — **exactly 1
  error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to a
  9-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets
  `nonBusinessRealPropertyValue` to `-12000000`, violating `minimum: 0`) —
  **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — **694/694** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **694/694**.
- `node tools/verify-sources.mjs registry/pk/fbr/wealth-statement/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (694 entries).

## Maturity

`structural-reference`: the source workbook's own printed "Wealth
Statement" structure — identification block, fifteen asset/liability
category totals, the year-over-year net-worth reconciliation, disposed
assets, and the verification declaration — is fully transcribed from the
genuine, currently-served official Tax Year 2024 edition (a fillable Excel
workbook, not a government online-filing system), but no live filing
through FBR's own IRIS e-filing channel was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Islamic Republic of Pakistan or the
Federal Board of Revenue.
