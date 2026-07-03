# Verification record — `gb/hmrc/child-benefit-claim-ch2` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

`draft`, not `verified`, because the online/HMRC-app claim channel was not
walked through (it requires a Government Gateway sign-in) — see "What was
not done" below. This schema is sourced directly from HMRC's own
downloadable, current-edition CH2 form.

## Sources examined

- **Document `(id, version)`:** `gb/hmrc/child-benefit-claim-ch2` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** HM Revenue and Customs (HMRC).
- **`https://www.gov.uk/government/publications/child-benefit-claim-form-ch2`**
  — reachable directly (HTTP 200, no bot-block encountered), linking to
  three PDFs on `assets.publishing.service.gov.uk`:
  - **`CH2_online_form.pdf`** — the claim form itself, edition **HMRC
    04/26** (i.e. April 2026 — the current edition at the time of this
    review, not a retired or third-party-mirrored one). Retrieved via
    `curl` (HTTP 200, 413,586 bytes) and text-extracted with a scratch npm
    install of `pdfjs-dist` (legacy build) — a plain, non-encrypted 9-page
    PDF whose standard text-layer extraction recovered the full form:
    Section 1 (About you, Q1–13), the residency/immigration branch
    (Q14–20), Q21–22, marital status (Q23), Section 2 (About your partner,
    Q24–33), Section 3 (Children you want to claim for, Q34–61, covering
    up to 2 children on the base form), Section 4 (Higher income earners,
    Q62), Section 5 (How you want to be paid, Q63–65), Section 6 (Bank
    details, Q66–71), the Declaration, and the CH3 address label page. This
    is this document's **primary field-level source** — every field name,
    label, enum option, and `sourceRef` is drawn from this PDF's text.
  - **`CH2_Notes.pdf`** — the companion "Child Benefit: Getting your claim
    right" notes, retrieved and decoded the same way (HTTP 200, 352,666
    bytes). Cross-checked for the "Additional children" continuation-page
    reference (page 7) cited in this document's scope boundary, and for
    the birth-certificate/passport/adoption-certificate document
    requirements cited in `documents[]`.
  - `CH2_CS.pdf` (a continuation/supplementary sheet, referenced by the
    publication page but not separately fetched this cycle — see "What was
    not done").
- **`https://www.gov.uk/child-benefit/how-to-claim`** and
  **`https://www.gov.uk/child-benefit-tax-charge`**-adjacent prose (fetched
  as part of the CH2 form's own page 1 introduction) confirm the online/
  HMRC-app channel exists as a faster alternative and that the High Income
  Child Benefit Charge (Q62's gating context) is a live, current HMRC
  policy, not something specific to the retrieved edition.

## What was not done — the one honest gap

No live walkthrough of the online/HMRC-app "Claim Child Benefit" channel
was performed — GOV.UK's own guidance states it requires signing in
(creating Government Gateway credentials if the applicant doesn't have
them) and may require identity verification via photo ID, none of which is
publicly field-documented outside an authenticated session. The paper CH2
form is described by HMRC itself as collecting the same underlying claim
information regardless of channel ("It's quick and easy to claim online...
If you cannot claim online, fill in this form"), so this document treats
the paper form as the faithful, fully field-documented source — the same
choice made for `au/ato/tax-file-number-application` and
`in/eci/voter-registration` when an online channel's field set isn't
independently published.

`CH2_CS.pdf` (a continuation/supplementary sheet linked from the same
publication page) was not fetched or examined this cycle; a future review
should check whether it duplicates or supplements the "Additional children"
continuation content already scoped out of this version.

## Test run performed

Phase 4 of this cycle's research brief calls for a test run with valid mock
data. A scratch Node script (`/tmp/ch2-test/mocktest.mjs`, not checked into
the registry) implements the GSP-0013 condition grammar
(`equals`/`notEquals`/`in`/`all`/`any`/`not`) and resolves
`visibleWhen`/`requiredWhen` against two independent mock claimants:

1. A single parent with no partner, one child born in England (registered
   birth, English/Welsh system number branch), a first-time claim, opting
   into weekly payment as a single parent, paid into her own account.
2. A married couple (exercising the "About your partner" section, gated by
   the inferred `hasPartnerSection` boolean), claiming for 2 children — one
   born and registered in England, one born abroad and adopted (exercising
   `child2BirthRegisteredInGreatBritain`'s `false` branch and the
   `child2AdoptionCertificate` document's `requiredWhen`) — who are a
   higher-income household opting out of Child Benefit payments to protect
   State Pension only (`isHigherIncomeHousehold: true`,
   `wantsToBePaidChildBenefit: false`, which correctly skips the bank
   details section per `alreadyGetsChildBenefit`'s `requiredWhen`).

Both scenarios: (a) supply every field that is required given its resolved
visibility, (b) pass each field's own `validation` (pattern/enum/min-max),
and (c) contain no reference to a field name absent from `fields[]` across
every `visibleWhen`, `requiredWhen`, `documents[]` `requiredWhen`, and
`steps[].fields` entry. Both passed on the first run; no schema defect was
found by this test.

The schema also validates against both the zero-dependency structural
checker (`tools/validate.mjs`) and the full JSON Schema draft 2020-12
meta-schema via ajv (`tools/validate-ajv.mjs`).

## Modelling decisions

- **Models the base CH2 form's inline capacity of up to 2 children.** The
  source form itself prints "Child 1" and "Child 2" blocks (Q36–48 and
  Q49–61) and directs claimants with more children to a separate
  "Additional children" continuation page (CH2 Notes, page 7) — out of
  scope for this version (see "Out of scope"). `numberOfChildrenClaimed` is
  capped at 2 (`maximum: 2`) to reflect this.
- **`child2*` fields use `visibleWhen`/`requiredWhen` gated on
  `numberOfChildrenClaimed == 2`.** Matches this registry's convention for
  a repeating block whose cardinality is itself a collected field (cf.
  `us/dos/immigrant-visa-ds260`'s multi-applicant pattern), rather than an
  array/object type GovSchema v0.3 doesn't natively support for repeating
  field groups.
- **`hasPartnerSection` is an inferred gating boolean**, not a printed form
  field, following this registry's convention (`au/aec/voter-enrolment`,
  `in/eci/voter-registration`) for adding an explicit boolean where
  GovSchema's `visibleWhen`/`requiredWhen` grammar needs one but the source
  form only implies it through its own section structure ("2 About your
  partner" only applies given a `maritalStatus` of
  `married_or_civil_partnership` or `living_with_partner`).
- **`employmentStatus`/`partnerEmploymentStatus` modelled as single-value
  enums, not multi-select.** The source form explicitly allows ticking more
  than one employment-status box ("Tick the box or boxes that apply"), but
  GovSchema's `enum` validation keyword accepts one value; documented in
  each field's own description as a simplification rather than modelled as
  an array-of-enum (which the spec's `nonFileValidation` keyword set does
  not support for a `string`/`enum` type).
- **Birth-registration branch (`child*BirthRegisteredCountry`) doubles as
  the trigger for the birth-certificate/passport/travel-document
  attachments**, since the source form's own logic is "if birth NOT
  registered in England, Wales, or Scotland, send the documents" — modelled
  as `requiredWhen: { field: "childNBirthRegisteredInGreatBritain", equals:
  false }` on the relevant `documents[]` entries, which is a faithful
  restatement of the form's own printed instruction rather than an
  independent inference.
- **Adoption-certificate requirement gated on `relationship == adopted_child`**,
  a broader condition than the source's narrower "if your child was adopted
  *abroad*" — GovSchema has no field distinguishing domestic from
  international adoption in this document, so the condition is deliberately
  over-inclusive (may flag the document as required for a domestic adoption
  where it is not strictly needed) rather than silently under-inclusive;
  documented here rather than modelled as a further undocumented field.
- **Bank sort code and account number given fixed UK-format patterns**
  (`^[0-9]{2}-[0-9]{2}-[0-9]{2}$` and `^[0-9]{8}$` respectively) since the
  source form prints boxed digit groups for both, consistent with standard
  UK bank account/sort code formats and this registry's comb-field
  convention.
- **National Insurance number pattern** (`^[A-Z]{2}[0-9]{6}[A-Z]$`) reused
  from this registry's existing UK NI-number-adjacent conventions (two
  letters, six digits, one letter — the standard NI number format).
- **CH3 address label (page 9 of the source PDF) not modelled.** It is a
  postal-logistics label for returning original documents to the applicant,
  not applicant-supplied claim data.
- **Office-use-only markings** (page 8's "For official use only" boxes:
  Corres/Traced/CLI, document-return tracking) **not modelled** — completed
  by HMRC staff processing the claim, not by the applicant.

## Out of scope

- **The online/HMRC-app claim channel** — requires a Government Gateway
  sign-in and does not publish a field-by-field form outside an
  authenticated session; see "What was not done" above.
- **The "Additional children" continuation page** (CH2 Notes, page 7) — used
  when claiming for a 3rd or subsequent child; a distinct repeating-block
  form not modelled here.
- **`CH2_CS.pdf`** (a continuation/supplementary sheet linked from the same
  publication page) — not examined this cycle.
- **Reporting a change of circumstances to an existing Child Benefit
  claim**, and **cancelling or objecting to a Child Benefit decision** —
  both distinct HMRC processes with their own forms/channels, not the
  first-claim process this document models.
- **Married Couple's Allowance** — a separate HMRC allowance for couples
  where one partner was born before 6 April 1935, referenced in passing by
  the source material but not itself a Child Benefit process.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-03** (6
months). Re-fetch the CH2 form and Notes to check for an edition update
(the HMRC 04/26 edition implies an annual refresh cycle), and attempt a
live walkthrough of the online/HMRC-app claim channel if credentials become
available; if the field set matches, promote `status` to `verified`.
