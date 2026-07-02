# Verification record — `au/ato/individual-tax-return-mytax` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the ATO's own guidance page describing myTax
and the official paper equivalent form it mirrors. The full field-by-field
comparison the practice requires against the **live, authenticated myTax
online screens** (Procedure step 2) has not been completed, so this remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `au/ato/individual-tax-return-mytax` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Australian Taxation Office ("ATO").
- **Primary source (flow/eligibility):**
  <https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-online-with-mytax>
  ("Lodge your tax return online with myTax", last updated 24 April 2026 per
  the page itself). Direct fetch of this URL returned **HTTP 403** from both
  a raw `curl` request and the `WebFetch` tool in this sandbox — add
  `ato.gov.au` to the same WAF/bot-protection-blocked domain list as
  `nzta.govt.nz` ([[gov474-dmv-business-formation-vertical-and-xfa-extraction]])
  and `canada.ca`. Recovered via the Wayback Machine's CDX API
  (`web.archive.org/cdx/search/cdx?...&output=text&fl=timestamp`), which
  returned a capture at `20260616083509` — 16 days old at authoring time, not
  a stale fallback. The capture itself required `curl --compressed` (the
  archived response is gzip-encoded; a plain `curl` without that flag returns
  unreadable compressed bytes) — worth trying before assuming a Wayback fetch
  failed.
- **Secondary source (field-by-field detail):** the official "Tax return for
  individuals 2026" (NAT 2541-06.2026), downloaded directly (HTTP 200, no
  access block) from `iorder.com.au` (the ATO's own Publications Ordering
  Service, linked from `ato.gov.au/forms-and-instructions/tax-return-for-individuals-2026/how-to-get-the-individual-tax-return-2026`),
  12 pages. This is a **static (non-fillable) PDF** — `pdfjs-dist`'s
  `getFieldObjects()` returns `null` and there is no `/AcroForm` or `/XFA`
  marker in the raw bytes — the same shape as NZTA's DL1 form
  ([[gov474-dmv-business-formation-vertical-and-xfa-extraction]]), so fields
  were reconstructed from the text layer's x/y position data (items sorted
  by y descending then x ascending; each numbered item/question's boxes and
  single-letter box codes read off their printed position) rather than
  AcroForm field names.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Access to myTax" (myGov account linked to the ATO) | `hasMyGovAccountLinkedToAto` |
| Page 1-2: TFN, residency, name, postal/home address, contact details, EFT details | `taxFileNumber` through `bankAccountName` |
| Page 2-3, items 1-12 (salary/wages through employee share schemes) and page 3 totals | `salaryOrWagesOccupation` through `totalIncomeOrLoss` |
| Page 4, D1-D10 deductions, L1 losses, taxable income | `workRelatedCarExpenses` through `taxableIncomeOrLoss` |
| Page 5, T1-T2 tax offsets and total | `seniorsPensionersTaxOffsetCode` through `totalTaxOffsets` |
| Page 6-7, M1-M2 Medicare levy questions and private health insurance policy details | `medicareLevyReductionOrExemptionClaimed` through `healthInsuranceTaxClaimCode` |
| Page 7, A1-A4 adjustments | `under18Income` through `workingHolidayMakerHomeCountry` |
| Page 8, IT1-IT8 income tests | `reportableFringeBenefitsExempt` through `numberOfDependentChildrenIt8` |
| Page 8-9, spouse details (married or de facto) | `spouseFamilyName` through `familyAssistanceConsentSignatureDate` |
| Page 10, taxpayer's declaration questions and signature | `requiresSupplementarySection` through `declarationDate` |
| Page 10 "I declare that: ..." bullet list, quoted verbatim and combined into one statement | `documents[].declarationAttestation` |
| ato.gov.au: myGov/ATO account linkage requirement, pre-fill sources (employers, banks, government agencies, health funds, third parties, myDeductions uploads), 31 October lodgment due date | `hasMyGovAccountLinkedToAto` field description; document `description` |

## What is NOT independently confirmed (out of scope), and three sourcing caveats

- **The separate "Tax return for individuals (supplementary section) 2026"**
  (pages 13-16 of the same publication, referenced repeatedly on pages 1-10
  as a distinct attachment) is entirely out of scope — business income and
  expenses, capital gains, foreign income and assets, partnership/trust
  distributions, and rental schedules live there, not in this document. This
  mirrors `gb/hmrc/self-assessment-tax-return-sa100`'s SA101-SA109 exclusion
  and `nz/ird/individual-tax-return-ir3`'s IR3G-worksheet exclusion.
  `requiresSupplementarySection` (page 10, declaration question 1) is
  modelled as a gate field but the supplementary section's own fields are
  not.
- **Multiple concurrent employers.** Item 1 (Salary or wages) prints five
  repeating payer rows (TYPE codes visible in the extracted text layer). This
  is a repeating third-party structure the flat v0.3 field model (GSP-0009)
  cannot express — the same limitation already recorded for
  `ie/revenue/self-assessment-tax-return-form11s` (Panels C/L) and
  `nz/ird/individual-tax-return-ir3` (Boxes 38C-38H). This document models a
  single payer/employer line (`salaryOrWagesPayerAbn`, `salaryOrWagesTaxWithheld`,
  `salaryOrWagesIncome`, `salaryOrWagesOccupation`); a filer with more than
  one employer in the year is only partially served by v1.0.0.
- **Multiple concurrent private health insurance policies.** The private
  health insurance policy details block prints four repeating policy rows
  with identical fields. Same GSP-0009 limitation as above; this document
  models a single policy.
- **Transferring a refund to a different taxpayer's account.** Not present on
  the core pages reviewed (unlike the IR3's Boxes 38C-38H, the NAT 2541 core
  return has no such section); noted here only because the document
  description excludes it for completeness, matching the IR3 precedent's
  phrasing style. No corresponding field exists to omit.
- **Three genuine box-boundary ambiguities in the extracted text layer,
  recorded rather than resolved by guessing** (same discipline as the NSW
  interlock/Q-condition negation gap and the DE i-Kfz 10-day/14-day figure
  conflict, [[gov474-dmv-business-formation-vertical-and-xfa-extraction]]):
  1. `superLumpSumTaxableComponentUntaxed` (item 8) — a third dollar box sits
     immediately above item 9's label in the extracted position data; its
     precise identity (a third component of item 8, versus a running
     tax-withheld subtotal carried from earlier items) could not be
     confirmed with certainty from position data alone.
  2. `costOfManagingTaxAffairs` (D10) — a "Litigation costs" label is printed
     directly above D10's own boxes; whether it names a component amount
     within D10 or a separate, unlabelled figure is not resolved.
  3. `incomeFromInvestmentPartnershipOtherSources`,
     `otherIncomeFromEmploymentAndBusiness`, and
     `otherDeductionsFromBusinessIncome` — three dollar boxes printed
     directly below A3 (Government super contributions) carry letter codes
     but no A-numbered question label of their own in the extracted text;
     they may belong to A3 or to an unlabelled adjustment block the
     extraction did not capture a heading for.
  Each affected field's own `description` repeats the relevant caveat so a
  consumer is not misled into treating the association as settled.
- **A possible home-address street line.** The printed form's home-address
  block (page 1, "Print your home address below") captures only
  Suburb/town/locality, State/territory, Postcode and Country in the text
  layer, unlike the postal address block a few lines above it which has an
  explicit free-text address line. It is plausible a street-address box
  exists there as a graphical element the text layer did not capture as
  readable text (the same class of gap as the gender checkboxes on NZTA's
  DL1 form) rather than a genuine absence. `homeSuburbOrTown` only models
  what the extraction evidences; no `homeAddressLine` field was invented.

## Why every field here is optional except the compulsory few

Unlike a blank-form-fill-in document (e.g. `us/irs/individual-income-tax-return-1040`),
myTax's defining shape is **reviewing a pre-filled return**: the ATO says it
will "pre-fill most information from your employers, banks, government
agencies, health funds and third parties by late July" before the individual
ever opens the return. A field being optional here therefore reflects both
(a) genuine applicability (most items apply only to some taxpayers, exactly
as on the paper form) and (b) the pre-fill shape itself — myTax may populate
a value the individual never manually types, so `required: true` would
wrongly imply the applicant must supply it by hand. The form's own compulsory
markings are honored directly: M2 (Medicare levy surcharge) is printed
"THIS QUESTION IS COMPULSORY FOR ALL TAXPAYERS", and the declaration/signature
are required to lodge — those are the only fields with `required: true`
besides the core identity/access fields (myGov linkage, TFN, residency, name,
postal address details, EFT details) that every lodgment genuinely needs.
This is the first published GovSchema document exercising this "review a
pre-filled return" shape, also shared by the still-open DE ELSTER and SG
myTax Portal/Form B1 tax-return candidates
([[gov430-taxes-vertical-and-gsp0019]]).

## Time-versioning and the `edition` axis (flagged spec gap)

The NAT 2541 is genuinely time-versioned — the ATO reissues a fresh edition
every income year (the form's own footer reads "NAT 2541-06.2026" and "1 July
2025 to 30 June 2026" throughout) — the same shape as
`gb/hmrc/self-assessment-tax-return-sa100`, `us/irs/individual-income-tax-return-1040`,
`ie/revenue/self-assessment-tax-return-form11s`, and
`nz/ird/individual-tax-return-ir3`. Spec v0.3's `edition.scheme` enum is
**closed** to `us-tax-year` / `gb-tax-year` / `award-year` (SPEC.md §5.7) —
none of which is correct for Australia, whose income year runs 1 July to 30
June (neither a calendar year nor the UK's April-to-April year). Rather than
mislabeling the scheme or unilaterally extending a closed enum, this document
is published at the **plain, non-edition** registry path
(`registry/au/ato/individual-tax-return-mytax/1.0.0/schema.json`), consistent
with the IE and NZ workaround. This is the **fourth** reference schema to hit
this exact gap (after IE Form 11S, NZ IR3, and — for the same reason —
implicitly blocking DE ELSTER and SG Form B1 from the edition axis too),
further reinforcing
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md` as a
genuinely cross-jurisdictional need, not a one-off.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3.
- The `hasMyGovAccountLinkedToAto` gate uses a `to: null` /
  `exitReason: "no-mygov-account-linked"` transition (GSP-0013 §4), the same
  eligibility-gate pattern used by `ca/on/mto/drivers-licence-renewal` and
  `de/kba/vehicle-registration` for other myGov/portal-linkage
  preconditions. A taxpayer without a linked myGov account still has a
  paper-lodgment or registered-tax-agent path; those channels are a
  different process not modelled by this document (myTax-only), so the exit
  is presentational, not a claim that no other lodgment channel exists.
- The declaration (page 10 bullet list) is modelled as a single `documents[]`
  attestation entry (GSP-0014 §1) with the combined statement text, plus
  `declarationSigned`/`declarationDate` fields in the flow — the same split
  `nz/ird/individual-tax-return-ir3` and `de/kba/vehicle-registration` use.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated myTax online screens,
resolves the three box-boundary ambiguities above by cross-checking the
ATO's "Individual tax return instructions 2026" companion publication (not
reviewed this cycle), and records the outcome here — shipping a new schema
version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2027 income year's edition of the NAT
2541 is published, since the source content itself changes annually.
