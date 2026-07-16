# Verification record — `lk/ird/return-of-income-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3267**). Sri Lanka stood
at 4 of 6 verticals (Passport, DMV, Visa, National ID) at the start of this
cycle, with Business Formation and Taxes both open. This document opens
Sri Lanka's **Taxes vertical (5 of 6)**.

## Discovery

A dedicated research pass (delegated to a subagent, results independently
re-verified below) was tasked with finding a stronger Business
Formation or Taxes source than the two candidates already on this
registry's own backlog: a thin, provincial-only Business Formation
specimen (`bnr.wp.gov.lk` BNR-01, ~15 fields) and no Taxes candidate at
all. It located the Inland Revenue Department's own "Downloads" page for
individual income tax, which directly links the current year-of-assessment
Return of Income and its companion Schedules — a national-level,
unauthenticated, currently-published, richly field-labeled specimen, a
clear win over the Business Formation backlog lead.

## Source re-verification (Phase 1)

- **URL:** `https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_001_2025_2026_E.pdf`
- **Retrieved / reviewed:** 2026-07-16, independently re-fetched this cycle
  with plain `curl` (no login/CAPTCHA/WAF gate — the IRD site serves this
  PDF directly from a SharePoint-backed document library).
- **HTTP status:** `200`. **Content-Type:** `application/pdf`.
  **Content-Length:** `778,937` bytes. **Last-Modified:**
  `Thu, 09 Jul 2026 08:39:16 GMT` (current for the 2025/2026 year of
  assessment). **sha256:**
  `d89252750a27800e82139de8543eaa5be0f48236f3c61df47c95dea01aab6161` —
  independently computed against a fresh download, matching the
  subagent-reported figure exactly.
- **Companion document cross-referenced (not modelled in `fields[]`):**
  `https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_002_2025_2026_E.pdf`
  — HTTP 200, `application/pdf`, 3,107,459 bytes, sha256
  `13941f60b8f45824eb5eb5d6d97387dd25c7078ee86c4e35a555b84fbcbb0264`, 12
  pages. Used only to confirm each Schedule's own printed title and
  cage-number range for the Part E checklist labels and the
  cage-cross-reference notes in this document's field descriptions (see
  Field inventory below).
- **File type:** both PDFs are genuine, non-scanned, flat print-and-hand-fill
  specimens — zero `/AcroForm`/`/Widget` markers on either (confirmed via
  `pdfjs-dist` 3.11.174, legacy CJS build, this registry's own pinned
  version) and a real, directly-extractable text layer (not OCR).
- **Visual check for required-field markers:** both pages of Asmt_IIT_001
  were rendered to PNG via `pdfjs-dist` + `node-canvas` at 2.5x scale. The
  embedded TrueType font did not fully rasterize in this renderer (most
  cell labels render blank — a known pdfjs/node-canvas embedded-font
  limitation, not a defect in the source PDF), but the visible cage grid,
  checkbox, and section-divider structure matched the text extraction
  exactly. Combined with a full-text grep of the extracted layer for `*`
  (exactly one hit, an unrelated employment-history footnote — "*If more
  than one person involved, use a separate sheet..." — not a required-field
  marker), this confirms the form carries **no asterisk/required-field
  convention at all**. Every field's `required`/`requiredWhen` value below
  is therefore a disclosed statutory judgment call, not derived from an
  explicit source marking — see Judgment calls disclosed below.

## Field inventory (Phase 2)

**48 `fields[]` + 2 `documents[]`, all traceable to a specific printed cage
number or labelled block on the two-page Asmt_IIT_001 form:**

| Section | Field count | Cage/label range |
|---|---|---|
| Header (year, TIN, address, residency, senior citizen) | 5 | header block |
| Section 01 Part A (income liable to tax) | 5 | cages 10–50 |
| Section 01 Part B (deductions from assessable income) | 7 | cages 60–120 |
| Section 01 Part C (calculation of tax payable) | 8 | cages 130–200 |
| Section 01 Part D (exempt/foreign-currency) | 2 | cages 210, 210A |
| Part E (schedule-attached checklist) | 10 | Sch. 1–10 |
| Section 02 (accountant/preparer disclosure) | 6 | Part A block |
| Section 02 (taxpayer declaration) | 5 | Part B block |

5 + 5 + 7 + 8 + 2 + 10 + 6 + 5 = **48**, matching `schema.json`'s
`fields[]` length exactly. Each person block's combined "Telephone Number
Mobile" cell is modelled as one `*TelephoneOrMobile` field (not split into
separate landline/mobile fields), matching this registry's own convention
on the sibling `il/tax-authority/1301-personal-details` document for an
identical combined-cell layout.

**Schedule cross-references** (used only for field descriptions, not
modelled as separate fields) were independently confirmed against
Asmt_IIT_002's own printed schedule titles: Schedule 1 — Employment Income;
Schedule 2 — Business Income; Schedule 3 — Investment Income; Schedule 4 —
Other Income; Schedule 5 (5A–5E) — Qualifying Payments & Expenditure Relief,
including the solar-panel-relief sub-schedule 5C; Schedule 6 (6A/6B) — WHT
on Final Withholding Payments; Schedule 7 (7A–7C) — Advance Income Tax
(AIT)/Withholding Tax (WHT); Schedule 8 — Tax Calculation; Schedule 9
(9A/9B) — Tax Credits; Schedule 10 — Loss Adjustment.

## Judgment calls disclosed

1. **Requiredness for every Section 01 cage-computation field
   (`employmentIncome` through `taxCredits`) is modelled `required: true`**,
   since these are the return's own running tax-computation lines every
   filer completes (with zero where a category does not apply) and the
   return itself is legally mandatory under section 126 of the Inland
   Revenue Act. This is a statutory-context judgment call, not derived from
   an explicit source marking — see the "no asterisk convention" finding
   above.
2. **`balanceTaxPayable` (cage 190) and `refundClaimed` (cage 200) are both
   modelled `required: false`, disclosed as mutually exclusive in their own
   `description` rather than `requiredWhen`-gated on each other.** The
   source's own printed instructions make each conditional on a numeric
   comparison between `totalTaxPayable` (cage 170) and `taxCredits` (cage
   180) — "If 170>180, Then 170–180" / "If 170<180, Then 180–170" —  and
   GovSchema's `requiredWhen` condition grammar (§6.4) only supports
   simple field-equality/comparison conditions against a single other
   field's value, not a comparison expression between two other fields.
   Modelling this accurately would require fabricating a condition the spec
   does not support; disclosing the exclusivity in prose was judged more
   honest than a `requiredWhen` that could not actually express it.
3. **`totalExemptExcludedIncome` (cage 210) and
   `foreignCurrencyRemittedAmount` (cage 210A) are modelled `required:
   false`**, since both are conditional disclosures that apply only when
   the filer has exempt/excluded income or remitted foreign currency,
   respectively — the source form itself provides no separate yes/no
   checkbox gating either cage that this schema could key a `requiredWhen`
   off, so leaving both optional (rather than fabricating a gate) matches
   this registry's established convention of not inventing fields the
   source does not expose.
4. **The Part E schedule-attached checklist (Sch. 1–10) is modelled as ten
   independent booleans**, since GovSchema v0.3 has no native multi-select/
   repeating-checkbox-group construct (GSP-0009 not yet adopted) and each
   checkbox is independently markable on the source form — a filer only
   attaches the schedules relevant to their own income types, so all ten
   are `required: false`.
5. **`accountantTelephoneOrMobile` and `declarantTelephoneOrMobile` each
   model the source's combined "Telephone Number Mobile" cell as one
   field**, rather than splitting it into separate landline/mobile fields,
   since the source form itself prints both labels inside a single
   undivided cage with no visual separator distinguishing two distinct
   entry boxes.
6. **`declarantTelephoneOrMobile` and `declarantEmail` are modelled
   `required: false`** (contact fields on the mandatory declaration block),
   while `declarantFullName`, `declarantNicOrPassportNumber`, and
   `declarationDate` are modelled `required: true` — the identity/
   attestation core of the declaration versus its contact-information
   cells, matching the same required/optional split this registry's sibling
   `il/tax-authority/1301-personal-details` document already established
   for its own analogous declaration-block contact fields.
7. **`Date of Issue` and `Due Date`, printed in the same header block as the
   TIN/Address cage, are excluded entirely** as IRD-populated administrative
   fields (the return is issued to a specific filer with these pre-printed),
   not filer-entered data — consistent with this registry's convention of
   excluding office-only content. The general statutory due date (30
   November following the year of assessment) is separately stated in the
   form's own footer instructions and is not a per-filer variable, so it is
   not modelled as a field either.
8. **Business Formation was re-screened this cycle and remains a confirmed
   dead end at the national level**, superseding this vertical's prior
   framing as open backlog. The Department of the Registrar of Companies'
   (`drc.gov.lk`) core incorporation pathway (Form 1 reservation, Form 5
   incorporation) is exclusively system-generated through the authenticated
   eROC portal (`eroc.drc.gov.lk`, confirmed live) with no static blank
   specimen; its only downloadable static forms are secondary filings (Form
   18/19 director/secretary consent, Form 20 director/secretary changes,
   Form 40 re-registration of a company already incorporated under the 1982
   Companies Act) — none is a first-time company-formation application. No
   national-level sole-proprietorship/partnership registration form exists
   either; that function is genuinely decentralized to provincial
   registrars, consistent with the already-known thin Western-Province-only
   BNR-01 candidate left on backlog by a prior cycle.

## Conformance fixtures

7 fixtures committed under
`conformance/lk/ird/return-of-income-individual/1.0.0/`:

- **2 valid scenarios**: a resident salaried employee with no preparer and a
  refund claimed (`valid-resident-salaried-refund.json`); a self-employed
  filer using a paid preparer with solar-panel relief and a balance tax
  payable (`valid-self-employed-with-preparer-balance-due.json`).
- **5 mutation-control fixtures**, each a single-field/single-document
  mutation of one of the two valid scenarios: a missing unconditionally-
  required field (`declarantFullName`), a missing conditionally-required
  accountant field (`accountantName`, with `preparedByApprovedAccountant:
  true`), an invalid `residencyStatus` enum value, an invalid `taxYear`
  pattern (`"2025-2026"` instead of `"2025/2026"`), and a missing required
  `taxpayerDeclaration` document.

All 7 fixtures were run this cycle through a from-scratch mock validator (a
standalone script implementing this spec's `required`/`requiredWhen`
condition grammar, `type`, `validation.enum`, `validation.pattern`, and
`documents[].required`/`requiredWhen` semantics directly against
`schema.json`, independent of `tools/validate-ajv.mjs`, which validates the
schema document's own meta-schema conformance rather than instance
payloads): both valid scenarios raised **0 errors**, and each of the 5
mutation-control fixtures raised **exactly 1 error**. The same script
confirmed every `requiredWhen` field reference resolves (0 dangling
references).

`schema.json` itself passes both `tools/validate-ajv.mjs` and
`tools/validate.mjs` against `spec/v0.3/govschema.schema.json` (497/497
registry-wide).

## Non-affiliation

GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of Sri Lanka or
the Inland Revenue Department.
