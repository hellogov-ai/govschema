# Verification record — `ca/cra/individual-income-tax-and-benefit-return-t1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from the official CRA "5000-R" T1 General
fillable PDF, but from the **2022 tax year edition**, not the current (2025
tax year) edition — see "A note on source currency" below. It remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `ca/cra/individual-income-tax-and-benefit-return-t1` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Canada Revenue Agency ("CRA").
- **Primary source:** the "5000-R" T1 General fillable PDF (8 pages) —
  <https://www.canada.ca/content/dam/cra-arc/formspubs/pbg/5000-r/5000-r-fill-22e.pdf>
  — retrieved via the Internet Archive Wayback Machine capture at
  `20240807184338` (the most recent successful capture of this exact asset;
  see currency note below), and its companion plain-text extract
  `5000-r-22e.txt` via capture `20230602164705`.
- **Field-name cross-check:** the fillable PDF's AcroForm field objects,
  enumerated with `pdfjs-dist`'s `getDocument().getFieldObjects()` (532 field
  objects across 8 pages). Most text-field internal names directly embed the
  official 5-digit CRA line number (e.g. `Line_10100_Amount`,
  `Line_20700_Amount`), which independently confirmed the line-number-to-box
  mapping read from the plain-text extract; checkbox/radio fields (marital
  status, Elections Canada questions A/B, foreign property, tax-exempt
  Indian Act income) were confirmed as single-select groups with the
  expected number of options.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## A note on source currency (access constraint)

Direct retrieval of `canada.ca` content under `/en/revenue-agency/...` and
`/content/dam/cra-arc/...` is blocked from this environment: HTTP/2 requests
to these paths reset the stream immediately (curl exit 92) and HTTP/1.1
requests hang until timeout, while the bare `canada.ca` root and other
domains resolve normally — consistent with a WAF/bot-mitigation rule
targeting this specific path prefix rather than a general network outage.
`WebFetch` independently hit the same block (HTTP 403). The Internet
Archive's own crawler has hit the identical wall since late 2023: its most
recent *successful* capture of the `5000-r.html` package page is
2023-11-29T15:22:41Z; every attempt after that (2024-09-20, 2025-01-30,
2026-03-10) recorded a failed or `403` capture.

Consequently, the most recent T1 General edition independently retrievable
from this environment is the **2022 tax year** ("5000-r-22e.pdf"/
"-fill-22e.pdf"), not the current 2025 tax year edition. The T1 jacket's
core structure (identification, total income, net income, taxable income,
federal tax, refund/balance owing) has been stable across recent tax years
with mostly incremental line-content changes (new/retired credit lines,
updated dollar thresholds), so this remains a legitimate, source-derived
schema — but a reviewer with unblocked access to canada.ca (or a fresh
Wayback capture, once one succeeds) should diff this document against the
2025-tax-year "5000-r" package before advancing past `draft`, per
"Path to a `verified` claim" below. This is the same category of access
constraint already recorded for `au/apo/passport-application-first-adult`
and `gov-au-wayback-workaround` (Wayback Machine as a fallback for gov sites
that hang or block direct fetch from this environment), now observed for a
Canadian federal domain as well.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Page 1 Identification: name, mailing/residential address, email, SIN, date of birth/death, marital status, language, BIC/residence info, spouse/CLP info | `firstName` through `spouseUccbRepayment` |
| Page 2 Elections Canada questions A/B, Indian Act exempt income, foreign property (line 26600) | `isCanadianCitizen` through `ownedForeignPropertyOver100k` |
| Step 2 Total income, lines 1-31 (10100-15000) | `employmentIncome` through `totalIncome` |
| Step 3 Net income, lines 32-54 (20600-23600) | `pensionAdjustment` through `netIncome` |
| Step 4 Taxable income, lines 55-66 (24400-26000) | `cafPersonnelAndPoliceDeduction` through `taxableIncome` |
| Step 5 Part A/B Federal tax and non-refundable credits, lines 67-115 (30000-35000) | `federalTaxOnTaxableIncome` through `totalFederalNonRefundableTaxCredits` |
| Step 5 Part C Net federal tax, lines 116-139 (40400-42000) | `federalTaxOnSplitIncome` through `netFederalTax` |
| Step 6 Refund or balance owing, lines 140-164 (42100-48500), certification, tax-professional info | `cppContributionsPayableSelfEmployment` through `taxProfessionalPhoneNumber` |
| Declaration statement, quoted verbatim | `documents[].declarationAttestation` |
| Form T1135 (line 26600) and Form T90 (Indian Act exempt income) as gated attached documents | `documents[].t1135ForeignIncomeVerificationStatement`, `documents[].t90IncomeExemptFromTaxUnderIndianAct` |

## What is NOT independently confirmed / out of scope

- **The 2025 tax year's exact line content**, per the currency note above —
  this document models the 2022 edition's line set and box numbering. Some
  lines may have been added, retired, or renumbered by the CRA since (the
  CRA has historically kept the 5-digit line numbering stable year to year
  more often than not, but this has not been independently confirmed for
  2025).
- **Provincial/territorial Form 428** (line 42800) — every province except
  Quebec attaches a separate Form 428 computing provincial/territorial tax;
  only the resulting total is modelled (`provincialOrTerritorialTax`), not
  Form 428's own line-by-line calculation. Quebec residents file a wholly
  separate provincial return (TP-1) with Revenu Québec, out of scope
  entirely, consistent with the catalog candidate's note.
- **The Federal tax on taxable income worksheet (Part A, lines 67-72 per
  bracket column)** — a 5-column, hardcoded-constant worksheet specific to
  the tax year (thresholds $50,197/$100,392/$155,625/$221,708 and rates
  15%/20.5%/26%/29%/33% for 2022). Modelling every column's constants would
  bake stale tax-year-specific numbers into the schema and requires a MAJOR
  version bump every time bracket thresholds change; only the worksheet's
  final result (`federalTaxOnTaxableIncome`) is captured, the same scoping
  decision already applied to the PIE and tax-calculation worksheets
  excluded from `nz/ird/individual-tax-return-ir3`.
- **NETFILE eligibility/transmission mechanics** — NETFILE is a CRA-approved
  third-party software channel, not a government-built portal form (the
  catalog candidate's own note); this document models the T1 jacket's field
  content only, independent of any specific filing channel.
- **Referenced schedules and standalone forms** whose own detail is not
  modelled, only the totals the T1 jacket itself directs a filer to
  transfer onto it: Schedule 1 (retired; replaced by the Federal Worksheet),
  Schedule 2 (spousal/partner amounts transferred), Schedule 3 (capital
  gains), Schedule 5 (dependants), Schedule 6 (CWB), Schedule 7 (RRSP),
  Schedule 8 (CPP/QPP), Schedule 9 (donations), Schedule 11
  (tuition/education/CTC), Schedule 13 (EI self-employment), Form 479
  (provincial/territorial credits), and standalone Forms T90, T657, T691,
  T778, T929, T1032, T1-M, T1135, T1206, T1212, T1223, T1229, T2038(IND),
  T2039, T2043, T2203, T2209, GST370, RC381.
- **Pure page-carry restatement boxes.** The paginated T1 jacket repeats
  several running totals across page breaks purely for arithmetic
  continuity (e.g. "Line 32: Enter the amount from line 31 of the previous
  page", and similarly Lines 55, 82, 116, 119, 140, 146). These restate an
  already-captured value with no new information and no distinct 5-digit
  CRA line number of their own, so they are intentionally **not** modelled
  as separate fields — the canonical value is captured once (e.g.
  `totalIncome` at line 31/15000), consistent with avoiding fabricated
  duplication.
- **Intermediate worksheet-only subtotals with no 5-digit CRA line number**
  (e.g. Lines 19, 25, 26, 81, 94, 96, 99, 104, 106, 107, 108, 112, 122, 125,
  127, 129) are likewise excluded on the same basis — they are pure
  arithmetic scaffolding toward a dual-numbered checkpoint (e.g. line
  110/33200), not first-class CRA-tracked reporting lines. Every dual-
  numbered line (a step-local "Line NN" *and* a 5-digit CRA line, e.g.
  "Line 110 and line 33200") and every genuinely new taxpayer-supplied input
  (regardless of whether it carries a 5-digit number, e.g. Line 124's
  federal surtax) is modelled.

## Time-versioning and the `edition` axis (flagged spec gap)

The T1 General is genuinely time-versioned — the CRA reissues a fresh
edition each tax year with year-specific dollar thresholds, rates, and
sometimes added/retired lines — the same shape as
`gb/hmrc/self-assessment-tax-return-sa100`,
`us/irs/individual-income-tax-return-1040`,
`ie/revenue/self-assessment-tax-return-form11s`, and
`nz/ird/individual-tax-return-ir3`. Canada's tax year is the calendar year
(1 January-31 December), the same shape as the existing `us-tax-year`
scheme — but spec v0.3's `edition.scheme` enum (SPEC.md §5.7) is **closed**
to the three named schemes `us-tax-year` / `gb-tax-year` / `award-year`,
each coined for a specific jurisdiction rather than as a generic
"calendar-year" label. Reusing `us-tax-year` for a Canadian filing would
misattribute the scheme to the wrong jurisdiction even though the calendar
shape matches; unilaterally extending a closed, one-way-door enum is not
this author's call to make.

This is the **third** reference schema (after IE Form 11S and NZ IR3) to
hit the `edition.scheme` gap recorded in
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` — and
the first to do so despite sharing NZ/IE's non-fit for a different reason
(a same-shaped-but-differently-named scheme, rather than a genuinely
different tax-year shape like NZ's April-March cycle). This further
strengthens the case for GSP-0019 to generalize the scheme vocabulary
rather than leave it enumerating jurisdictions one at a time. Consistent
with the IE and NZ precedent, this document is published at the **plain,
non-edition** registry path
(`registry/ca/cra/individual-income-tax-and-benefit-return-t1/1.0.0/schema.json`)
for this cycle. A future tax year would therefore require a MAJOR version
bump rather than a coexisting edition, until the scheme vocabulary is
generalized.

See the GOV-430/GOV-442/GOV-457 issue threads for the routing to the
Founding Engineer/CEO.

## Scope and jurisdiction notes

- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  targeting spec v0.3.
- `isCanadianCitizen` and `ownedForeignPropertyOver100k` are marked
  `fieldRole: eligibility`: both are forced binary ("1 Yes or 2 No") gate
  questions on the source form that route to a subsequent question
  (`authorizeElectionsCanadaDisclosure`) or a subsequent document
  requirement (`t1135ForeignIncomeVerificationStatement`), following the
  same GSP-0014 convention already used by
  `ie/revenue/self-assessment-tax-return-form11s` and
  `nz/ird/individual-tax-return-ir3`.
- Front-page identity fields (`firstName`, `lastName`, `mailingAddress`,
  `city`, `provinceOrTerritory`, `postalCode`, `sin`, `dateOfBirth`,
  `maritalStatus`, `languageOfCorrespondence`,
  `provinceOrTerritoryOfResidence`) are marked `required: true` even though
  the live paper form only asks a *returning* filer to correct a
  pre-printed label — an agent assembling a return from scratch has no
  pre-printed label and must always supply them, the same reasoning already
  applied in `nz/ird/individual-tax-return-ir3`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with unblocked access to
canada.ca applies `manual-source-review-v1` Procedure step 2 against the
current (2025 tax year) T1 General package and the live NETFILE-certified
software experience, confirms whether the 2022-to-2025 line set changed,
and records the outcome here — shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2026 tax year's edition of the T1 is
published, since the source content itself changes annually and this
version is already known to lag the current edition.
