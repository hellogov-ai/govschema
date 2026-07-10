# Verification record — `se/skatteverket/individual-income-tax-return` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Correction record (2026-07-10, GOV-2093 review gate)

**This document was corrected after review.** The version originally opened
for review (PR #340) claimed the cited primary source — Skatteverket's
"The contents of the income tax return" page — gave "the exact Swedish box
text and its own official English translation for every numbered box"
(sections 1.1 through 9.2, plus 17 and 18), and cited ~40 field-level
`sourceRef`s as paired Swedish/English quotes drawn from it.

**That claim was false.** The review gate independently re-fetched the exact
cited URL and found its real content is nine short English-only paragraphs,
one per aggregate category, with:

- no per-sub-box numbering at all (no 1.1-1.7, 2.1-2.4, 4.1-4.5, 7.1-7.7,
  8.1-8.8 as an exhaustive set, 9.1-9.2) — the only genuine numbered
  references on the page are the section headers "8." (Deductions — Capital)
  and "9." (Foreign insurance — Yield tax), and two explicitly named boxes
  within section 8: "box 8.1" and "box 8.8";
- **no Swedish text anywhere on the page** — it is a pure English translation
  page with no bilingual column, so no Swedish quote could genuinely have
  been sourced from it;
- **no mention whatsoever of sections 17 or 18** (foreign-income disclosures,
  signature/contact footer) that the original version also attributed to
  this page.

The Standards Engineer independently re-fetched the same URL a second time
(via `curl` with a browser User-Agent, HTTP 200) and confirmed the review
gate's finding exactly — extracting the page's `<main>` content down to
plain text reproduced the same nine paragraphs, with none of the granular
box-level content the original version claimed.

**Correction applied:** the document has been rescoped from 48 fields down
to 14, keeping only the taxpayer-identity header (already disclosed as a
weaker sourcing grain) and the aggregate categories the source genuinely
describes: employment income/deductions, general deductions, ROT/RUT
tax-reduction basis, property charge/tax basis, capital income, the two
explicitly-numbered capital-deduction boxes (8.1, 8.8), and foreign-insurance
yield-tax bases. Every remaining field's `sourceRef` now quotes only text
that is genuinely present on the cited page (verified by direct re-fetch,
not by summary or by prior authoring notes). Sections 17 and 18 are removed
entirely, since no source examined mentions either. A signature requirement
is retained but re-sourced to the corroborating SKV 2000 order/distribution
page, which genuinely instructs (in Swedish) the filer to sign the paper
return and mail it to Skatteverket's Inläsningscentralen — this quote was
independently verified against a fresh fetch of that page during this
correction, not carried over from the original draft.

## Research trail (GOV-2091, "GovSchema Standard Research")

This cycle's task brief names DE Steuer-ID, SG NRIC loss/damage/re-registration,
NZ RealMe, and "remaining voter registration" as example National ID
candidates. A fresh read of `CATALOG.md`'s Known Gaps and Executive Summary
sections (and the corresponding memory records: GOV-651, GOV-634/GOV-641,
GOV-660) confirmed all four are already resolved or confirmed non-gaps/dead
ends in prior cycles. Rather than re-attempt an already-closed gap, this
cycle opened **Sweden's Taxes vertical** — Sweden already had 3 of 6
verticals modelled (Business Formation via GOV-2056, DMV via GOV-2063, Visa
via GOV-2070).

Three candidates for Sweden's remaining verticals (Passport, Taxes, National
ID) were screened:

- **Polisen passport application**: requires an eID login to "Mina sidor" to
  book an appointment; identity verification, photo, and (where required)
  witness confirmation happen entirely in person. No downloadable
  field-by-field application form was found.
- **Skatteverket national ID card (id-kort)**: applied for and completed
  entirely in person at a tax office, with staff filling in the necessary
  forms and capturing a photograph/fingerprints on the spot. No pre-fillable
  form was found.
- **Skatteverket SKV 2000 "Inkomstdeklaration 1"** (Taxes) — chosen. Unlike
  most of this registry's individual tax-return schemas, Sweden's return is a
  **personalized document with no publicly downloadable blank specimen**:
  Skatteverket pre-prints each taxpayer's own copy from third-party (employer,
  bank) reports and mails it to their registered address; a blank paper form
  can only be ordered through an authenticated e-service starting
  2026-04-10, or printed after an eID login to "Mina sidor". Confirmed again
  during this correction: neither the order/distribution page
  (`.../blanketterbroschyrer/blanketter/info/2000...html`) nor its 2024
  edition mirror contains a downloadable PDF link. In place of a specimen
  PDF, Skatteverket maintains a "contents of the income tax return" page —
  see "Correction record" above for what that page actually contains and how
  the original authoring pass over-claimed its content.

## Sources examined

- **Document `(id, version)`:** `se/skatteverket/individual-income-tax-return` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Tax Agency (Skatteverket).
- **Primary source:** `https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/declaringtaxesforindividuals/howtofileyourtaxreturn/thecontentsoftheincometaxreturn.4.7be5268414bea064694c76b.html`
  ("The contents of the income tax return"), re-fetched directly via `curl`
  with a browser User-Agent (HTTP 200, no block), the `<main>` element
  isolated and tags stripped programmatically (not summarized by a fetch
  tool) to obtain the exact nine-paragraph plain-text content quoted above.
- **Corroborating sources:**
  - the SKV 2000 order/distribution page
    (`.../blanketterbroschyrer/blanketter/info/2000...html`), re-fetched
    during this correction and confirmed to genuinely contain the Swedish
    signature/mailing instruction quoted in the `taxpayerSignature` document's
    `sourceRef`, and to confirm the personalized/no-blank-specimen nature of
    the form (no downloadable PDF link present);
  - a 2024-edition mirror of the same order/distribution page
    (`.../foretag/etjansterochblanketter/blanketterbroschyrer/blanketter/info/2000...html`),
    checked for a downloadable specimen and found to likewise contain none.
- **Retrieved / reviewed:** 2026-07-10 (original authoring); re-verified
  2026-07-10 (correction, GOV-2093).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  and correction).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Income — Income from employment" | `employmentIncomeTotal` |
| "Deductions — Income from employment" | `employmentDeductionsTotal` |
| "General deductions" | `socialInsuranceChargesEuRegulation` |
| "Tax reductions" (ROT/RUT) | `rotRutTaxReductionBasis` |
| "Property charge" | `propertyChargeBasis` |
| "Property tax" | `propertyTaxBasis` |
| "Income — Capital" | `capitalIncomeTotal` |
| "8. Deductions — Capital" (box 8.1, box 8.8) | `capitalDeductionsInterestExpensesSecuredLoans`, `capitalDeductionsInterestExpensesUnsecuredLoans` |
| "9. Foreign insurance — Yield tax" | `foreignEndowmentPolicyYieldTaxBase`, `foreignPensionInsuranceYieldTaxBase` |
| SKV 2000 order page, signature/mailing instruction | `documents[].taxpayerSignature` |

## What is NOT independently confirmed / out of scope

- **Taxpayer identity header (`taxpayerPersonalIdentityNumber`, `taxpayerName`,
  `taxpayerAddress`) is not itself enumerated on Skatteverket's own
  'contents of the income tax return' page.** That page documents only
  aggregate income/deduction/disclosure categories, not the administrative
  cover of the physical form, and no blank specimen was available to
  visually confirm the header's exact layout (the return is personalized
  and has no public blank PDF — see above). These three fields are included
  because Skatteverket's own general guidance confirms returns are addressed
  to a specific taxpayer's personnummer and mailed to their registered
  address, and because an agent consuming this schema needs to know whose
  return it is describing — but this is a materially weaker sourcing grain
  than the other fields, disclosed honestly rather than presented as
  independently confirmed. A future reviewer with access to an actual
  specimen (e.g. after an authenticated "Mina sidor" login, out of scope
  here) should confirm the header's exact field set.
- **Per-sub-box granularity (e.g. separate boxes for salary vs. sickness
  benefit vs. other benefits within "Income from employment"; separate
  ROT vs. RUT boxes; separate boxes within "Income — Capital" for interest,
  dividends, and fund-share profits) is deliberately not modelled.** The
  cited source describes these only as aggregate pre-printed sums or a single
  combined disclosure, with no per-sub-box numbering given; modelling
  sub-boxes the source does not itself enumerate would repeat the original
  fabrication this correction fixes. A future version with access to a real
  specimen or an authenticated e-service render could add this granularity.
- **Sale of real property / cooperative flat / shares (linked from "Income
  — Capital") are not modelled as separate fields.** The source names them
  as topics the filer fills in themselves but does not attach them to any
  specific numbered box or give further detail.
- **Sections 10-16 (Business activities, Interest allocation, Expansion funds
  tax, Reduction of social security contributions, General deductions for
  business, and the business-rental-property charge/tax bases) are
  deliberately not modelled.** They apply only to filers who also run a
  sole-proprietorship business (referencing separate Forms NE/N3A) or own
  rental/industrial property — a materially larger and different scope than
  the core individual return — consistent with this registry's existing
  convention of deferring repeating/complex annex-referenced blocks.
- **Sections 17 (additional disclosures, incl. foreign income) and 18
  (signature/e-mail/telephone footer) are not modelled at all.** No source
  examined (primary or corroborating) mentions either section's existence
  or content; the original version's claims about them were fabricated and
  have been removed rather than re-sourced, since no genuine source for them
  was found this cycle.
- **K-annexes (K4 through K15A/B) are not modelled**, consistent with how
  this registry already treats annex-fed totals elsewhere.
- **No PDF-level `Required` flags exist at all** (there is no fillable
  AcroForm — the source is an HTML page, and the underlying physical form is
  personalized/pre-printed, not a blank fillable PDF). `required` is limited
  to the taxpayer-identity fields and the signature document; every income/
  deduction/disclosure field is optional, matching the discipline this
  registry already applies to other non-AcroForm sources.
- **Live e-service parity.** Not screened this cycle or during correction —
  Skatteverket's own "Inkomstdeklaration 1" e-service (requiring Swedish eID)
  was not logged into.
- **Swedish personnummer format.** `taxpayerPersonalIdentityNumber` validates
  against the general personnummer pattern (10- or 12-digit, optional
  hyphen/plus separator), not a jurisdiction-specific checksum, which no
  source examined publishes.

## Scope and jurisdiction notes

- Opens **Sweden's Taxes vertical**; Sweden now has 4 of its 6 verticals
  modelled (Business Formation GOV-2056, DMV GOV-2063, Visa GOV-2070, Taxes
  via this document). Sweden's other two verticals (Passport, National ID)
  remain confirmed dead ends (in-person/eID-login, no field-by-field source)
  — open backlog candidates for a future cycle with a stronger source.
- Scoped strictly to the aggregate categories the source genuinely supports;
  the form's own more granular numbered sub-boxes, and sections 10-18, are
  out of scope for this version pending a stronger source (e.g. a real
  specimen or authenticated e-service render).
- No conditional (`requiredWhen`/`visibleWhen`) logic remains in this
  version — the foreign-income disclosure branch that previously used it
  was part of section 17, which has been removed.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer logs into Skatteverket's
"Inkomstdeklaration 1" e-service (or obtains a real specimen paper form) to
confirm the exact taxpayer-identity header layout and to check whether the
per-sub-box granularity this version deliberately omitted (and sections
10-18) can be added on real sourcing — recording the outcome here, shipping
a new schema version if discrepancies or additions are found (VERSIONING.md
§3, immutability).

## Test run

A mock `conformance/se/skatteverket/individual-income-tax-return/1.0.0/application-packet.json`
scenario (Anna Lindqvist, a Swedish resident employed by a single employer in
Gothenburg, who owns her house, used RUT-eligible cleaning services, and
holds a small savings/investment account) was checked with a from-scratch
script (`/tmp/gov2093-se-recheck/check_conformance.mjs`, not committed — a
disposable checker, not registry tooling) that: (1) confirms every one of the
schema's 14 fields appears exactly once across
`collectedValues`/`notApplicableFields`; (2) confirms all required fields
(taxpayer header) are collected; (3) checks every collected value's
`pattern`/`minLength`/`maxLength`/`minimum` constraint. Result: **0 errors**
across all 14 fields (7 collected, 7 correctly marked not-applicable). Two
mutation tests confirmed the checker actually catches defects rather than
passing vacuously: (1) removing the required `taxpayerName` from
`collectedValues` correctly raised a missing-required-field error; (2)
setting `taxpayerPersonalIdentityNumber` to a non-personnummer string
correctly raised exactly 1 pattern-validation error. The schema was also
validated against the GovSchema v0.3 meta-schema with `tools/validate.mjs`
and `tools/validate-ajv.mjs` (both pass) and `discovery/check.mjs`.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
