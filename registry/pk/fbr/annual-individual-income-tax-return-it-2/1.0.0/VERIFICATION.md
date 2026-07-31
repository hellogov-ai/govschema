# Verification record — `pk/fbr/annual-individual-income-tax-return-it-2` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-31`

## Why this schema and why now (GOV-5738, "GovSchema Standard Research")

This cycle re-scanned `CATALOG.md` fresh rather than trusting the in-repo
state from memory. Every jurisdiction currently disclosed at 5 of 6
verticals was re-checked against the document's own vertical-history
entries: **AE** (Passport), **BA** (Visa), **BR** (Visa), **CZ** (Passport),
**GR** (National ID), **ID** (National ID), **JM** (National ID), **MK**
(Visa), **MN** (National ID), **MT** (Taxes), **NO** (Passport), **PL**
(Visa), **RW** (Taxes), **SK** (Visa), **TN** (DMV), **TT** (National ID) —
16 in total. Every one of these gaps was independently confirmed, from the
document's own prior-cycle text, to already be a re-screened dead end
(in-person/biometric-only, login/CAPTCHA-gated, or a confirmed duplicate of
an already-modelled EU-harmonized template) rather than a genuinely new,
untested lead — matching the immediately preceding GOV-5731 cycle's own
finding for a largely overlapping set. With no jurisdiction-closing
candidate available, the strongest actually-open, pre-sourced candidate was
this worksheet: both the sibling `pk/fbr/annual-individual-income-tax-return-it-1b`
document's own v1.0.0 (GOV-3104, 2026-07-15) and the
`pk/fbr/wealth-statement` document's own v1.0.0 (GOV-5731, 2026-07-31)
explicitly named the 'IND (BUS PLUS)' worksheet (Form IT-2) as open backlog.
This cycle picked up that pre-flagged companion rather than starting a new
jurisdiction from scratch.

**Aside, disclosed for the record:** a separate, non-schema markdown
document (`GovSchema_Research_Status_2026-07-31.md`, merged directly by a
human recovering a crashed background agent's commit, PR #758) was found in
the repository root this cycle, claiming Brazil is "missing from ALL 6
verticals." This is independently contradicted by both `CATALOG.md`'s own
`## By Jurisdiction` table (`BR` — 6 schemas, 5 of 6 verticals: Passport,
DMV, Business Formation, Taxes, National ID all ✓, only Visa a confirmed
dead end) and the registry contents on disk (`registry/br/pf`,
`registry/br/sp/jucesp`, `registry/br/mg/detran`,
`registry/br/rfb`, `registry/br/tse`, `registry/br/pr/iipr`). The PR's own
description already flags this and other figures in that document as stale
and directs readers to treat `CATALOG.md`, not that document, as the source
of truth — no further correction was needed this cycle.

## Sources examined

- **Document `(id, version)`:** `pk/fbr/annual-individual-income-tax-return-it-2` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Board of Revenue (FBR).
- **Primary source:**
  - Direct `.xlsx` (the same workbook already modelled twice, as
    `annual-individual-income-tax-return-it-1b` and `wealth-statement`):
    <https://download1.fbr.gov.pk/Docs/2024791373958696MANUALRETURN2024-NEW24-6-2024.xlsx>
    — independently re-fetched this cycle via plain `curl`: HTTP 200,
    **size 104,097 bytes**, sha256
    `4e2f9874e9a910713fae9a182fc5c5a578bcfd2649d2031f8144c8b5fba96b9f` —
    byte-identical to the figures both the GOV-3104 (2026-07-15) and
    GOV-5731 (2026-07-31) cycles recorded for this same workbook,
    confirming no revision. No login/CAPTCHA gate on this direct
    `download1.fbr.gov.pk` URL.
  - Native Office Open XML `.xlsx` (a zip archive of XML parts), not a PDF.
    No `unzip`, `pip`, or `openpyxl` available in this environment;
    unzipped directly with Python's built-in `zipfile` module. The
    worksheet `IND (BUS PLUS)` (Form IT-2, this document's scope) is
    confirmed via `xl/workbook.xml`'s own `<sheets>` element
    (`<sheet name="IND (BUS PLUS)" sheetId="3" r:id="rId2"/>`), mapped to
    `xl/worksheets/sheet2.xml` via `xl/_rels/workbook.xml.rels`'s `rId2`
    relationship, and cross-checked against the sheet's own printed title
    row (" RETURN OF TOTAL INCOME / STATEMENT OF FINAL TAXATION UNDER THE
    INCOME TAX ORDINANCE, 2001 (IT-2)").
  - Parsed `sheet2.xml`'s `sheetData` rows (row 1 through row 170, the
    sheet's last populated row, spanning two printed pages within the one
    worksheet), `xl/sharedStrings.xml`'s shared string table, and the
    sheet's own `dataValidations` block (4 rules) cell-by-cell from the raw
    XML.

## Scope decisions

The `IND (BUS PLUS)` worksheet is structurally the business-income sibling
of the already-modelled `IND (PROP-CG-OS)` worksheet (Form IT-1B): the same
identification block, the same headline-income-line shape, and a nearly
identical verification/declaration block, but for individuals deriving
income under the head Business (plus any head other than Salary) rather
than Property/Capital Gains/Other Sources.

**In scope, at the level the sheet's own `dataValidations` confirm is
directly fillable, mirroring IT-1B's own scope boundary exactly where the
two sheets share structure:**

- Identification: `taxpayerName`, `taxpayerCnic`, `taxpayerNtn`,
  `taxpayerAddress`, `taxYear`.
- Sr. 11–13: `businessIncome`, `capitalGainsIncome`, `otherSourcesIncome`
  (the Sr. 13 headline total).
- Sr. 14–25 (Other Sources sub-items): `otherSourcesReceipts`,
  `royaltyIncome`, `profitOnDebt`, `profitOnDebtExceeding36Million`,
  `groundRent`, `subLeaseRent`, `leaseRentWithPlantAndMachinery`,
  `annuityPension`, `otherReceipts`, `otherSourcesDeductions`,
  `accountingDepreciation`, `otherDeductions`.
- Sr. 26–30 (Foreign Income and its four sub-categories):
  `foreignIncome`, `foreignBusinessIncomeLoss`, `foreignPropertyIncomeLoss`,
  `foreignCapitalGainIncomeLoss`, `foreignOtherSourcesIncomeLoss`.
- Sr. 31–33: `aopUntaxedIncomeShare`, `aopTaxedIncomeShare`, `totalIncome`.
- Sr. 34–38 (Deductible Allowances and its three components, plus Taxable
  Income): `deductibleAllowancesTotal`, `zakatDeduction`,
  `workersWelfareFundDeduction`, `educationExpensesDeduction`,
  `taxableIncome`.
- The verification/declaration block: `declarantName`, `declarantCnic`,
  `declarantCapacity`, `declarationDate`.

**A genuine structural difference from IT-1B, not a scope narrowing:** the
IT-1B sheet has no Other Sources sub-item breakdown at all (its own Sr. 12
"Income / (Loss) from Other Sources" is a single line with no feeding rows)
and no Foreign Income sub-categories (its own Sr. 13 "Foreign Income" is
likewise a single line). This sheet's own rows 21–37 print twelve
individually labelled Other Sources sub-items and four individually
labelled Foreign Income sub-categories, each validated fillable by the
sheet's own `dataValidations` (decoded below). These are modelled
individually — the same registry convention already used for Deductible
Allowances (a headline total plus its named components, present in both
this document and IT-1B) and for Wealth Statement's own Inflows/Outflows
exception — rather than collapsed into their respective headline totals
alone, since each is a fixed, small, uniquely labelled line item, not a
repeating table shape (which would require GSP-0009, still Proposed and
CEO-gated).

**Out of scope, mirroring IT-1B's own scope boundary exactly:**

- The Property income sub-item breakdown (Sr. 1–10, rows 8–17). Row 8's
  own F8/G8/H8 cells carry **no** data-validation rule at all — the
  identical computed-subtotal signal IT-1B's own Sr. 1 (row 9) carried,
  confirming Property remains a computed subtotal on this sheet too, with
  no direct-entry validation of its own.
- The workbook's own per-line three-column split (`F`/`G`/`H` — "Total
  Amount" / "Amount Exempt from Tax or Subject to Fixed/Final Tax" /
  "Amount Subject to Normal Tax"). Not modelled reliably: the sheet's own
  data-validation ranges cover the three columns inconsistently. For
  example, row 18 (Sr. 11, Business Income) validates all three columns
  (`F18:H18`), but rows 33–37 (Sr. 26–30, the Foreign Income total and its
  four sub-categories) validate only `F` and `H` — the `G` column is
  **not** validated for any of these five rows (`G21:G32`, the sheet's
  only decimal-typed validation rule, stops at row 32, one row short of
  Sr. 26 at row 33). This is the same class of per-row column-validation
  inconsistency IT-1B's own verification record already documented for its
  own sheet, not fabricated or corrected here — this document reports a
  single headline figure per line, as IT-1B does.
- The Computations/tax-liability section (Sr. 39–62, rows 47–70): tax
  chargeable, normal income tax, tax credits, four distinct minimum-tax
  adjustment lines, six turnover-tax lines at named statutory percentages
  (0.25% through 1.5% under section 113), tax on high-earning persons
  (u/s 4C), tax on deemed income (u/s 7E), advance/admitted/refundable/
  demanded income tax, a refund-adjustment line, Workers' Welfare Fund, and
  agriculture income/tax — arithmetic derived from the return, not primary
  taxpayer-supplied data, the same exclusion basis IT-1B applied to its own
  Sr. 21–33.
- The Final/Fixed/Minimum/Average/Relevant/Reduced Tax withholding
  schedule — a second printed page (rows 74–169, confirmed by the
  worksheet's own page-2 header at row 74 and a "2/2" page-number cell),
  roughly 150 individually named withholding-tax-rate categories spanning
  sections 148 (imports), 150 (dividends), 152 (non-resident payments),
  153–156 (goods/services/contracts/prizes), 233–236Z (brokerage,
  utilities, tolls, petroleum, bonus shares, capital gains on immovable
  property and securities at named holding-period bands and rates), and
  156A/233A (commission/brokerage). All confirmed fillable by the sheet's
  own `dataValidations` (`F80:G146`, `H80:H169`, `F148:G169` — unlike the
  Property subtotal, these rows genuinely are data-entry cells, not
  computed), but excluded on the same disproportionate-expansion basis
  IT-1B's own verification record already applied to this identical
  schedule (there, ~30 rows counted from IT-1B's own sheet; here, roughly
  five times as many) — a schedule of this size would require either
  GSP-0009 (repeating-value fields, still Proposed and CEO-gated) or
  flattening ~150 distinct field names for a single companion-schema
  cycle, a disproportionate expansion relative to the value delivered.
- Annexes A through F, which remain this workbook's own disclosed,
  cross-schema backlog (shared with the sibling IT-1B and Wealth Statement
  documents).

## Disclosed structural findings

1. **`NTN` is required here, unlike the sibling IT-1B document.** This
   sheet's own row 5 label reads `"NTN*"` (with an asterisk), while
   IT-1B's own row 5 reads `"NTN"` (unstarred, and modelled
   `required: false`). The underlying data-validation rule on the NTN cell
   (`H5`, whole number 1–99,999,999) is otherwise identical in shape to
   IT-1B's own `J5` rule. `taxpayerNtn` is modelled `required: true` here,
   a genuine and disclosed difference driven by the source form's own
   printed marking, not a judgment call.
2. **Tax Year internal inconsistency.** The workbook's own title
   (`Individual Paper Return for Tax Year 2024`) and this sheet's own
   second-page repeated header (row 76, cell `H76`, pre-filled `2024`)
   both read 2024, but this same sheet's own first-page header (row 4,
   cell `H4`) is itself pre-filled the literal numeric value `2023` — a
   genuine internal inconsistency in the source spreadsheet. Disclosed
   here and in the `taxYear` field's own description; not corrected by
   this schema. (The sibling IT-1B sheet's own row 4 is consistently
   pre-filled `2024` with no equivalent defect.)
3. **Verification block reassembled from three separate text fragments,
   not one paragraph.** Unlike IT-1B's own verification block (a single
   contiguous cell range at rows 76–77), this sheet's declaration spans
   row 71 (`"Verification"`, a blank name cell, `", CNIC No."`, the
   `F71:G71` CNIC input cells, `", in my capacity"`, a blank capacity
   cell), row 72 (the long `"as Self / Representative (as defined in
   section 172 of the Income Tax Ordinance, 2001) of the Taxpayer named
   above, do solemnly declare..."` continuation, a separate shared-string
   entry), and row 73 (`"Signature:"` / `"Date:"`). Reassembled verbatim
   into `documents[].statement`; the underlying legal text is otherwise
   identical in substance to IT-1B's own.
4. **Foreign Income sub-category `G`-column validation gap.** As noted
   under "Scope decisions" above: Sr. 26 (Foreign Income total, row 33)
   and its four sub-categories (Sr. 27–30, rows 34–37) are validated
   fillable on columns `F` and `H` but not `G` — the sheet's only
   decimal-typed validation rule (`G21:G32`) stops one row short. Disclosed
   as a real, observed data-validation gap, not a fabricated or corrected
   value.
5. **A likely source-document typo, quoted verbatim and disclosed, not
   corrected.** Sr. 27's own printed label reads `"Foreign Bussiness
   Income/Loss"` (double "s" in "Bussiness") — quoted exactly as printed
   in the field's `sourceRef`, with `[sic]` noted, rather than silently
   corrected to "Business."
6. **CNIC constraint re-confirmed identical across all three documents
   from this workbook.** The sheet's own `dataValidations` block carries
   one `type="whole"` rule spanning both `C5` (taxpayer CNIC) and
   `F71:G71` (declarant CNIC), bounded `[1000000000000, 9999999999999]` —
   the identical 13-digit constraint already modelled on both
   `annual-individual-income-tax-return-it-1b` and `wealth-statement`,
   confirming the same NADRA CNIC format applies uniformly across every
   worksheet of this workbook.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/pk/fbr/annual-individual-income-tax-return-it-2/1.0.0/`: 2
valid scenarios plus 5 mutation-control fixtures, each derived from one of
the valid fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`, not committed to
the repo) before being finalized:

- `valid-self-filer-business-income-only.json` (a self-filing business
  individual reporting only Business Income and Total/Taxable Income, no
  Other Sources/Foreign/AOP detail) — **0 errors**.
- `valid-representative-filed-full-breakdown.json` (a full Other Sources
  sub-line breakdown, a Foreign Income sub-category, both AOP share types,
  and all three deductible-allowance components, filed via a
  representative) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops
  `taxpayerAddress`) — **exactly 1 error**.
- `mutation-control-missing-required-ntn.json` (drops `taxpayerNtn` —
  statically required here, unlike the sibling IT-1B document) —
  **exactly 1 error**.
- `mutation-control-invalid-cnic-pattern.json` (sets `taxpayerCnic` to an
  11-digit value) — **exactly 1 error**.
- `mutation-control-negative-amount.json` (sets `businessIncome` to
  `-3200000`, violating `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-enum-declarant-capacity.json` (sets
  `declarantCapacity` to `GUARDIAN`, not in the enum) — **exactly 1
  error**.

## Structural validation

- `node tools/validate.mjs` — **695/695** (full registry, this document
  included).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) —
  **695/695**.
- `node tools/verify-sources.mjs registry/pk/fbr/annual-individual-income-tax-return-it-2/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (695 entries).

## Maturity

`structural-reference`: the source workbook's own printed "IND (BUS PLUS)"
(Form IT-2) structure — identification block, the headline income lines
and their Other Sources/Foreign Income sub-categories, the Deductible
Allowances total and its three components, and the verification
declaration — is fully transcribed from the genuine, currently-served
official Tax Year 2024 edition (a fillable Excel workbook, not a
government online-filing system), but no live filing through FBR's own
IRIS e-filing channel was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the Islamic Republic of Pakistan or the Federal Board of
Revenue.
