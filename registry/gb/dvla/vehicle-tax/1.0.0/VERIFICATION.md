# Verification record — `gb/dvla/vehicle-tax` v1.0.0

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
screen-by-screen against the live DVLA "Tax your vehicle" service (behind a
"Start now" interactive journey). It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `gb/dvla/vehicle-tax` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA)
- **Primary source URL:** <https://www.gov.uk/vehicle-tax>
- **Service entry point:** <https://vehicletax.service.gov.uk/>
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Tax a vehicle using a **reference number** from a recent DVLA tax reminder / 'last chance' letter (V11) | `referenceSource` = `v11_reminder`, `referenceNumber` |
| …or from the **vehicle log book (V5C)**, which must be in your name | `referenceSource` = `v5c_logbook`, `referenceNumber` |
| …or from the green **'new keeper' slip (V5C/2)** if you have just bought it | `referenceSource` = `v5c2_new_keeper_slip`, `referenceNumber` |
| Pay by **Direct Debit, debit card, or credit card** | `paymentMethod` |
| Direct Debit can be **monthly, 6-monthly, or annual** | `paymentPeriod` |
| The **amount of tax depends on the vehicle** | NOT encoded — see "Time-versioning" below |

## Time-versioning: why this schema needs no tax-year axis

The discovery catalog flagged vehicle tax with an "annual axis" caveat, alongside
the genuinely tax-year-versioned forms (IRS 1040, HMRC Self Assessment, FAFSA)
that the discovery README says need a year axis raised via `spec/proposals` before
authoring.

That caveat does **not** apply to this schema, for a concrete reason: the
**process** an individual carries out — choose the reference document, enter the
reference number, choose a payment period and method — is **stable** and carries
**no annually-versioned data**. Vehicle Excise Duty *rates* do change (set each
year), but the **amount is computed by DVLA from the vehicle record**; the citizen
never enters a rate. The amount is therefore treated like other time-sensitive
pricing in the registry (cf. the USPS identity-verification fee in
`us/usps/change-of-address`): **deliberately not encoded as data**, looked up
against the live source instead.

Because the document stores nothing that varies by tax year, it needs **no
tax-year axis in `id` or metadata**, and this v1.0.0 does not pre-empt the wider
time-versioning spec decision for the return-style forms. This authoring choice is
reversible (it is a `draft`; if the time-versioning decision later mandates a year
axis for rate-bearing schemas it would not retroactively require one here) and is
**flagged for Founding Engineer confirmation**.

## Conditional requiredness (not encoded structurally in v0.1)

- `bankAccountHolderName`, `bankSortCode`, and `bankAccountNumber` are required
  only when `paymentMethod` is `direct_debit`.
- `paymentMethod` must be `direct_debit` when `paymentPeriod` is
  `monthly_direct_debit`.

These cross-field rules are declared `required: false` with the rule in the field
`description` — the v0.1 conditional-required limitation tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md).

## What is NOT yet independently verified

- The exact **field order and labels** of the live flow were not captured
  screen-by-screen; annotations are indicative.
- The **reference-number length pattern** (`^[0-9]{11,16}$`) spans the V11 (16),
  V5C (11), and V5C/2 (12) digit lengths; it does not enforce the per-source length
  because v0.1 has no conditional constraint. A `verified` revision could tighten
  this once each source's length is re-confirmed.
- **Northern Ireland** has additional requirements (paper insurance certificate /
  MOT evidence). This schema scope is Great Britain (DVLA); NI is noted here, not
  modelled.

## Path to a `verified` claim (next step)

Apply `manual-source-review-v1` (Procedure step 2 field-by-field, step 3 flow)
against the live service, resolve any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and record the outcome here with
`status: verified` and a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months);
VED rates are set annually, so re-check the source on or before that date, on any
`source.url` change, and after each Budget that changes the duties.
