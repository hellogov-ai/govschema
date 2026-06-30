# Verification record — `gb/hmrc/marriage-allowance` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed
screen-by-screen against the live HMRC apply flow (which requires sign-in). It
therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `gb/hmrc/marriage-allowance` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** His Majesty's Revenue and Customs (HMRC)
- **Primary source URL:** <https://www.gov.uk/marriage-allowance>
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| **The lower earner applies** (pays no Income Tax / income below the Personal Allowance) | `applicantIsLowerEarner` |
| Partner must be a **basic-rate** Income Tax payer | `partnerNationalInsuranceNumber` (described) |
| Must be **married or in a civil partnership** (not merely living together) | `relationshipType` |
| Both partners' **National Insurance numbers** are needed | `applicantNationalInsuranceNumber`, `partnerNationalInsuranceNumber` |
| Identity confirmed with **one piece of evidence** (passport, payslip, P60, etc.) | `applicantIdentityEvidence` |
| Claims can be **backdated up to 4 tax years** | `backdateClaim`, `backdateFromTaxYearStart` |

## Time-versioned figures: deliberately not encoded

The **Personal Allowance** (£12,570) and the basic-rate band (the £12,571–£50,270
range the source cites) are set **each tax year**. They are described in field text
but **not encoded as data**, consistent with the time-versioning treatment in
`gb/dvla/vehicle-tax` and the discovery README's position that tax-year-versioned
figures should not be frozen inside a schema. The eligibility *structure* (lower
earner / basic-rate partner) is stable and is what this schema captures.

## Conditional requiredness (not encoded structurally in v0.1)

- `backdateFromTaxYearStart` is required only when `backdateClaim` is true.

Declared `required: false` with the rule in the field `description` — the v0.1
conditional-required limitation tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md).

## What is NOT yet independently verified

- The exact **field order and labels** of the live sign-in flow were not captured
  screen-by-screen; annotations are indicative, derived from the guidance page.
- The `applicantIdentityEvidence` enum lists the evidence types HMRC commonly
  accepts; the precise current option set should be re-confirmed at `verified` time.
- `backdateFromTaxYearStart` is modelled as the calendar year a UK tax year begins
  (6 April–5 April); the live service may present a labelled tax-year picker
  instead. The `minimum: 2015` floor is a generous structural bound, not a citation
  of the current 4-year backdating window (which the field `description` states).

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service, resolve any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months);
the thresholds change each tax year, so re-check the source on or before that date,
on any `source.url` change, and after each tax-year change to the allowances.
