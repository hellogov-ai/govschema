# Verification record — `sg/iras/corporate-income-tax-return-form-cs` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

Every field and document was read directly from the text layer of IRAS' own
current-cycle Form C-S materials for Year of Assessment (YA) 2026. It remains
`draft`, not `verified`, because the live myTax Portal wizard could not be
walked interactively — see "What is NOT yet independently verified" below.

## Access notes

- `https://www.iras.gov.sg/docs/default-source/uploadedfiles/pdf/explanatory-notes-to-ya-2026-form-c-s.pdf`
  ("Explanatory Notes to Form C-S for Year of Assessment (YA) 2026") was
  fetched directly, HTTP 200, genuine text layer, extracted in full with
  `pdfjs-dist`'s `getTextContent` (13 pages, no OCR needed). This is the
  primary source: it documents every numbered Item on Form C-S, the three
  Part A qualifying conditions, and a fully worked "Computation of Tax
  Payable Annex" example.
- `https://www.iras.gov.sg/docs/default-source/uploadedfiles/pdf/user-guide-(tp)_file-form-c-s....pdf`
  ("User Guide (Company): File Form C-S/ Form C-S (Lite)", published 5 May
  2026) was fetched directly, HTTP 200, genuine text layer, extracted in
  full (41 pages). It is a screenshot-plus-caption walkthrough of the actual
  myTax Portal wizard; used to confirm each Part's on-screen grouping and
  step order, the Form Type Selection revenue gate, which line items the
  portal computes automatically (so they are correctly excluded from
  `fields[]`, see below), and the Confirmation Page's declaration/filer
  fields and Submit vs. Submit-to-Approver branching.
- `https://www.iras.gov.sg/taxes/corporate-income-tax/form-c-s-form-c-s-(lite)-form-c-filing/overview-of-form-c-s-form-c-s-(lite)-form-c`
  and the sibling `.../guidance-on-filing-form-c-s-form-c-s-(lite)-form-c`
  page were both fetched directly as raw HTML (HTTP 200) and stripped of
  markup in this sandbox — not summarized by an intermediate small model —
  per this project's established discipline (see memory:
  `gov-source-fidelity-verification`) of not trusting a `WebFetch` summary
  alone for a field-bearing government page; a first WebFetch call on the
  overview page returned only navigation-menu boilerplate and explicitly
  said the field/eligibility content "was not included in the excerpt",
  confirming that discipline was necessary here, not just precautionary.
- `mytax.iras.gov.sg` (the live portal) requires Singpass/Corppass
  authentication and was not reached in this sandbox — the same constraint
  already recorded for `sg/iras/individual-income-tax-return-formb1`,
  `sg/ica/passport-application`, and `sg/acra/sole-proprietorship-registration`.

## Sources examined

- **Document `(id, version)`:** `sg/iras/corporate-income-tax-return-form-cs` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Inland Revenue Authority of Singapore (IRAS)
- **Primary source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):** "Explanatory Notes to Form C-S for Year of
  Assessment (YA) 2026"
- **Corroborating source (directly retrieved, HTTP 200, text layer extracted
  verbatim with pdfjs-dist):** "User Guide (Company): File Form C-S/ Form
  C-S (Lite)", published 5 May 2026
- **Corroborating source (directly retrieved, HTTP 200, raw HTML stripped of
  markup):** "Overview of Form C-S/ Form C-S (Lite)/ Form C" and "Guidance
  on Filing Form C-S/ Form C-S (Lite)/ Form C" guidance pages
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Overview page — Form C-S/ Form C-S (Lite)/ Form C eligibility-threshold table | schema `description`; `revenueForPeriod` eligibility framing |
| User Guide "How to File Form C-S/ Form C-S (Lite)", Step 1 | `hasCorppassApproverOrPreparerAccess`, `companyUen` |
| User Guide "Form Type Selection", Steps 1-2 | `revenueForPeriod` |
| Explanatory Notes Part A, Notes 1/2/3a-3d | `qualifiesRevenueThreshold`, `qualifiesOnlyStandardRateIncome`, `qualifiesNoExcludedClaims` |
| Explanatory Notes / User Guide Part A — "Particulars of Person who Reviewed the Return" | `returnReviewedByAccreditedTaxProfessional`, `reviewerName`, `reviewerScptMembershipNumber` |
| Explanatory Notes Part A — financial period statement | `financialPeriodStartDate`, `financialPeriodEndDate`, `yearOfAssessment` |
| Explanatory Notes Item 19a; User Guide "Functional Currency & Contact Information" | `functionalCurrency` |
| Explanatory Notes Part B, Items 1-4, 6-8, 10-16, 18-19b | `netProfitOrLossBeforeTax`, `separateSourceIncome`, `nonTaxableIncome`, `nonTaxDeductibleExpenses`, `renovationRefurbishmentDeductionS14N`, `enterpriseInnovationSchemeDeductions`, `item8FurtherOrOtherDeductions`, `balancingCharge`, `unutilisedCapitalAllowancesBroughtForward`, `currentYearCapitalAllowances`, `unutilisedLossesBroughtForward`, `grossRentalIncome`, `deductibleRentalExpenses`, `interestIncome`, `otherTaxableIncome`, `unutilisedDonationsBroughtForward`, `currentYearDonations`, `currentYearOverseasDonations` |
| Explanatory Notes Part C, Items 24-32 | `revenue`, `grossProfitOrLoss`, `directorsFeesAndRemuneration`, `totalRemunerationExcludingDirectorsFees`, `medicalExpenses`, `transportTravellingExpenses`, `entertainmentExpenses`, `inventories`, `tradeReceivables` |
| Explanatory Notes Part C, Items 33-35 | `changeInPrincipalActivities`, `substantialChangeInShareholders`, `waiverOfShareholdingTestApplied` |
| Explanatory Notes Part C, Item 36 | `claimsStartupTaxExemption` |
| Explanatory Notes Part C, Item 37 | `item37DeductionForRnDExpenditure`; `rndClaimForm` document (Item 8 note) |
| Explanatory Notes Part C, Item 40 | `hasTradingStockAppropriationOrConversion`; `acReportingForm` document |
| Explanatory Notes Part C, Item 41 | `foreignAssetDisposalGains10L`, `foreignAssetDisposalGainsAmount`, `foreignAssetDisposalGainsRemitted` |
| Overview page — "not required to submit financial statements and tax computation together with Form C-S... should prepare these documents and be ready to submit them upon IRAS' request" | `financialStatements`, `taxComputation` documents |
| User Guide "Confirmation Page [Form C-S]", Steps 1-3 | `declarationConfirmed`, `filerName`, `filerDesignation`, `filerContactNumber`, `filerEmailAddress`, `submissionRole` |

## Fields deliberately NOT modelled (auto-computed by myTax Portal)

The User Guide's own Part B/Part C captions state: *"The following line
items will be computed automatically"* and list exactly these five —
confirmed against the Explanatory Notes' own "Computed as: ..." formulas for
each:

| Form C-S item | Computation | Why excluded |
|---|---|---|
| Item 5 — Adjusted Profit/Loss before Other Deductions | Item1 − Item2 − Item3 + Item4 | portal-computed, no input box |
| Item 9 — Adjusted Profit/Loss before Capital Allowances | Item5 − Item6 − Item7 − Item8 | portal-computed |
| Item 14c — Net Rental Income | Item14a − Item14b | portal-computed |
| Item 17 — Total Income/Losses before Donations | (Item9+Item10) − (Item11..13) + (Item14c..16) | portal-computed |
| Item 20 — Total Income/Losses after Donations | Item17 − Item18 − Item19 | portal-computed |

This follows the registry's existing discipline of not modelling
calculated/derived fields (spec v0.3 §16, "deferred from v0.3 by founder
decision") and the precedent in `ie/revenue/self-assessment-tax-return-form11s`
("Tax payable... computed by ..."). By contrast, Items 11/13/18 (unutilised
capital allowances/losses/donations brought forward) ARE modelled as fields
even though myTax Portal pre-fills them from IRAS' own record, because both
source documents describe an editable "Company's Declaration" override box
for each — the filer can and sometimes must correct IRAS' record, so these
are genuine (optional) inputs, not read-only projections.

## Scope cuts (deferred to a future version)

1. **Enterprise Innovation Scheme (EIS) per-activity breakdown — Items
   44-48.** The source itself frames these as opt-in: *"please complete
   this section only if the company is making a claim and has met the
   qualifying conditions"* (User Guide, Part B and Part C EIS steps). This
   document keeps `enterpriseInnovationSchemeDeductions` (Item 7) and
   `currentYearCapitalAllowances`'s EIS-allowance component (Item 12) in
   scope as plain optional totals — they sit inline in Part B's base
   numbering — but not the five per-activity qualifying-cost/enhanced-claim
   breakdowns (Training; Innovation Projects with Partner Institutions;
   IPR acquisition; IPR licensing; IP registration; R&D undertaken in
   Singapore) that would require a nested/repeating field model spec v0.3
   does not have (§16, "Nested field model... still undecided").
2. **Section 14C R&D deduction sub-breakdown — Items 38-39.** Item 37 (the
   total Section 14C deduction) is in scope; the Singapore-only portion
   (Item 38) and the staff-cost-and-consumables cap breakdown in excess of
   the $400,000 Enhanced Innovation Scheme threshold (Item 39) are out of
   scope for the same opt-in-claim reason.
3. **Form C-S (Lite) and Form C.** Both are structurally distinct forms
   (Form C-S (Lite) has only 6 essential fields per IRAS' own comparison
   table; Form C requires full financial-statement and tax-computation
   submission alongside the return) and are deferred to future documents
   rather than modelled as editions of this one, consistent with this
   registry's one-document-per-distinct-process practice.

## What is NOT yet independently verified

- The **live `mytax.iras.gov.sg` wizard** was not walked screen-by-screen
  this cycle: it requires Singpass (individual) plus Corppass (company
  authorisation) login, which could not be exercised in this sandbox. Field
  labels here are the Explanatory Notes' and User Guide's own quoted
  wording/captions, not the wizard's live HTML field IDs.
- **Item 41's three-scenario FSDG reporting table** (Explanatory Notes,
  page 9-10: how foreign-sourced disposal gains land in different Items
  depending on whether they are chargeable, when they are remitted, and
  whether the entity is excluded under section 10L(8)) is genuinely complex
  routing logic; this document models only the three input fields
  (`foreignAssetDisposalGains10L`/`Amount`/`Remitted`) the filer actually
  types, not the table's own downstream Item-12/14/16-adjustment routing,
  which is describing bookkeeping practice rather than a distinct form
  field.
- **Not authored against the v0.3 edition axis.** Singapore's Year of
  Assessment fits none of the closed `edition.scheme` enum
  (`us-tax-year`/`gb-tax-year`/`award-year`, GSP-0005) — the same GSP-0019
  gap already flagged for `sg/iras/individual-income-tax-return-formb1` and
  four other jurisdictions' individual returns (see
  `spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`). A
  future YA's Form C-S would ship as a new major version of this document.

## Mock-data test run (Phase 4)

A complete, illustrative mock filing — "Tiong Bahru Provisions Pte. Ltd.", a
Singapore general wholesale trading company, YA 2026, basis period 1 Jan
2025-31 Dec 2025, revenue S$850,000 — is recorded in
[`conformance/sg/iras/corporate-income-tax-return-form-cs/1.0.0/application-packet.json`](../../../../../conformance/sg/iras/corporate-income-tax-return-form-cs/1.0.0/application-packet.json).

The Part B/Part C tax-adjustment figures (Items 1-4, 11-15, 18-19a)
deliberately reproduce, unchanged, the worked "Computation of Tax Payable
Annex" example printed in the Explanatory Notes themselves (net profit
$150,000 through to a published tax-payable figure of $7,898.15) — a
same-numbers-in, same-numbers-out check that this schema's field set is
sufficient to carry IRAS' own worked example without alteration. The
`computedForReference` block in the packet re-derives every intermediate
IRAS-computed subtotal (Items 5, 9, 14c, 17, 20, the Partial Tax Exemption,
the CIT Rebate, and the final tax payable) from only this schema's fields,
and the final `taxPayable` figure of $7,898.15 matches the source exactly.

**Discrepancy found and corrected during this test run:** the Annex's
worked calculation actually resolves through the automatic **Partial Tax
Exemption** available to all companies (75% on the first $10,000 of
chargeable income + 50% on the next $190,000, footnote reference "v" on
those two lines), reaching chargeable income after exempt amount of
$69,390 and, from there, the published $7,898.15 tax payable. A separate
explanation on the following page, also marked "v", shows what the
exemption amount would instead be *if* the company claimed the **New
Start-up Companies** scheme (Item 36) against the same $143,780 chargeable
income before exempt amount — a materially larger $96,890 exempt amount —
but explicitly as an "if applicable" illustration, not the calculation that
produces the Annex's own published tax-payable figure. An earlier draft of
the conformance packet conflated the two, setting `claimsStartupTaxExemption:
true` and citing the $96,890 start-up figure as if it were part of the main
worked chain; re-reading the Annex's own footnote wiring during this test
run caught the conflation before it shipped, and the packet was corrected to
`claimsStartupTaxExemption: false` with the Partial Tax Exemption's $74,390
figure (which is not itself a schema field — Partial Tax Exemption, unlike
the New Start-up scheme, is automatic and carries no eligibility question on
Form C-S).

`totalFields: 55`, `collectedCount: 50`, `notApplicableCount: 5`, `errors: 0`
— verified programmatically by re-deriving every field's effective
requiredness from its `required`/`requiredWhen` member and checking exact
1:1 coverage against the packet's `collectedValues`/`notApplicableFields`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) by walking the live
`mytax.iras.gov.sg` "File Form C-S/ Form C-S (Lite)" wizard end to end with
a Singpass+Corppass-authorised test session, for a company matching this
document's Form-C-S-qualifying scope; resolves any discrepancy by shipping a
new schema version (immutability — VERSIONING §3); and records the outcome
here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months) — ahead of the YA 2027 Explanatory Notes/User Guide revisions that
will supersede this cycle's sources. Re-check the sources on or before that
date and on any `source.url` change.
