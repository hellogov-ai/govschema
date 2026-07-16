# Verification record — `mn/mta/simplified-individual-income-tax-report` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3396**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Mongolia opened as this registry's 68th jurisdiction three cycles ago
(GOV-3375, Visa) and has since added Business Formation (GOV-3382) and
Passport (GOV-3389), each cycle's own research notes flagging further
backlog leads for a future cycle. That prior research (GOV-3389) named two
specific author-ready candidates for Mongolia's two remaining verticals:

- **MN DMV** — `burtgel.transdep.mn`, described as a live, unauthenticated
  license-plate-ordering form with roughly 20 fields. Re-fetched fresh this
  cycle (live, HTTP 200 with a standard desktop User-Agent) and found
  materially more complex than that summary implied: the visible field
  surface is not a flat applicant form but a category-dependent
  plate-character-combination builder (separate `<select>` groups for
  person/company/foreign registrants, each with its own set of
  single-character dropdowns) plus a weekday appointment-slot picker, behind
  a Cloudflare Turnstile CAPTCHA gating the final submit. Genuinely open and
  live, but not authored this cycle — left as a disclosed, more-involved
  backlog candidate requiring a live/Playwright walk to map which selects
  apply to which `registeroption` branch, rather than a static-fetch
  candidate.
- **MN Taxes** — `mta.gov.mn`'s own PDF filing guide for the simplified
  individual income tax report. Re-fetched fresh this cycle, confirmed
  strong, and **authored this cycle** — see below.

## Sources examined

### Primary source

- **Authority:** Татварын ерөнхий газар — official English name "Mongolian
  Tax Administration" (MTA), confirmed live at `https://mta.gov.mn/en/home`
  (`<title>Mongolian Tax Administration</title>`, plain unauthenticated
  fetch, HTTP 200).
- **Document — filing guide "Хялбаршуулсан горим ашиглан хувь хүний
  орлогын албан татварын тайлан гаргах, төлбөрийн баримт шивэх гарын
  авлага"** (Guide: filing the personal income tax report and entering
  payment receipts using the simplified regime).
  - **URL (directly retrieved, HTTP 200, plain unauthenticated `curl`, no
    User-Agent override needed):**
    `https://mta.gov.mn/files/pdf/8js8gu1qfpj/63e49c9ace968129f232141d.pdf`
  - **File identity:** genuine text-layer PDF (confirmed by its own
    `%PDF-1.7` header), 7 pages, 726,660 bytes,
    `sha256:174f94c63d90fb9ecbdb39c9cf08d273d7fbd83519851b35ae6f9bb1d89e8230`.
    `Last-Modified: Thu, 09 Feb 2023` per the server's own response header.
  - **Extraction method:** `pdfjs-dist`'s `getTextContent()` across all 7
    pages (installed standalone in a scratch directory for extraction only,
    not added as a repository dependency), cross-checked by independently
    rendering pages 4 and 7 to PNG via `pdfjs-dist` + `node-canvas` to
    visually confirm the printed field layout matches the extracted text.
  - **What it contains:** pages 1-3 explain simplified-regime eligibility
    (Хувь хүний орлогын албан татварын тухай хуулийн 15.7 — prior-year
    taxable operating income under MNT 50 million, not VAT-withholding-agent
    registered) and the request/registration process via the login-gated
    `etax.mta.mn` e-filing system; page 4 shows a **blank specimen** of Form
    ТТ-06-ХГ with its full field layout (header fields, an 8-row income
    table, signature block); pages 5-6 walk through issuing a payment
    receipt via `ebarimt.mn` (a distinct system, not part of this schema);
    page 7 gives a **fully worked numeric example** — a fictional individual
    "Иргэн А" with MNT 2,000,000 professional-service income (teaching)
    plus MNT 3,000,000 production/sales income (selling goods to a company),
    totalling MNT 5,000,000 total operating income and MNT 50,000 tax
    payable at the stated flat 1% rate — filled into the identical form
    layout as page 4.
- **Corroborating source — Mongolia's official legal-information portal:**
  `https://legalinfo.mn/mn/detail?lawId=15659` (directly retrieved, HTTP
  200), reproducing General Department of Taxation (MTA) Order А/125, dated
  2020-08-13, Ulaanbaatar: "ХУВЬ ХҮНИЙ ОРЛОГЫН АЛБАН ТАТВАРЫН
  ХЯЛБАРШУУЛСАН ТАЙЛАН"-ГИЙН МАЯГТ /ТТ-06-ХГ/-ЫГ ... БАТЛАСУГАЙ (approving
  the Simplified Individual Income Tax Report form ТТ-06-ХГ as an annex).
  Used to independently confirm the form's own designation — see "Disclosed
  source discrepancy" below.

### Disclosed source discrepancy

Page 4 of the guide PDF prints the form's own header as "Маягт ТТ-**02**-ХГ"
— a single stray digit. Every other occurrence of the form's name in the
same document reads "ТТ-**06**-ХГ": the guide's own prose on page 3
("...ХХОАТ - ын ТТ - 06 - ХГ тайлан гаргахдаа"), the caption above page 7's
worked example ("Хялбаршуулсан ТТ 06 тайлан гаргах"), and page 7's own form
header itself. This was confirmed by extracting the raw per-glyph text
tokens (not just the joined string) for both page 4 and page 7's "Маягт
ТТ-\_\_-ХГ" header, which returned the literal token `"02"` on page 4 and
`"06"` on page 7 — ruling out a text-extraction/OCR artifact. Independently
corroborated by `legalinfo.mn`'s reproduction of Order А/125 above, which
names the approved form exactly "ТТ-06-ХГ". Treated as a stray typo in the
guide's own page-4 specimen, disclosed here rather than silently corrected;
this schema's `id`, `title`, and `source.documentRef` all use "ТТ-06-ХГ".

## Scope and disclosed boundaries

This schema models Form ТТ-06-ХГ's full field surface as published in the
guide: the header identification block, the 8-row income-and-tax table, and
the declarant/accountant signature block. Explicitly out of scope, and
disclosed rather than silently omitted:

- **The "Татварын улсын байцаагч" (tax state inspector, received)**
  signature line in the form's own footer — filled in by the tax authority
  upon receipt, not applicant-provided, so not modelled as a field.
- **The live `etax.mta.mn` e-filing system** the guide's own pages 1-3
  describe as the actual submission channel (login with the taxpayer's own
  username/password) — this schema models the specimen form's field surface
  as published, not a driven walkthrough of that authenticated system. No
  live `etax.mta.mn` account was created or required to author this schema.
- **The `ebarimt.mn` electronic payment-receipt system** (guide pages 5-7) —
  a distinct system for issuing sales receipts, not part of the tax report
  itself; not modelled.
- **`reportQuarter`'s exact semantics** — the guide's own prose describes
  this report as annual and cumulative from the start of the year (due 15
  February of the following year), yet the form's header prints a labelled
  "улирал" (quarter) box. This schema models the field as it is printed (2
  character-entry boxes, `minimum: 1, maximum: 4`) without asserting
  further meaning the source itself does not state — disclosed as an open
  question for a future cycle with access to a live filled ТТ-06-ХГ record.
- **MN DMV's plate-ordering candidate** (`burtgel.transdep.mn`) — screened
  this cycle, confirmed live and genuinely open, but not authored; see "Why
  this candidate" above.

## Conformance fixtures

9 fixtures are committed under
`conformance/mn/mta/simplified-individual-income-tax-report/1.0.0/`: 2 valid
submissions (0 errors each — a minimal required-fields-only filing, and a
full filing exercising every optional field plus a two-category income
breakdown reproducing the guide's own worked example) and 7 mutation-control
fixtures (each expected to raise exactly 1 error): a missing required
`taxpayerName`, an invalid `taxpayerNumber` pattern (wrong digit count), an
invalid `phoneNumber` pattern (wrong digit count on an optional field, once
provided), an out-of-range `reportQuarter` (5, exceeding the maximum of 4),
a negative `professionalServiceIncome` (violating `minimum: 0`, isolated
from the `totalOperatingIncome`/`taxableIncome` pair so exactly one rule
fires), a `taxableIncome`/`totalOperatingIncome` mismatch (the
`taxableIncomeEqualsTotalOperatingIncome` `crossFieldValidation` rule), and
a missing required `declarantName`. All 9 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`validation`/`crossFieldValidation` rules (not committed —
consistent with this registry's established per-cycle practice of writing an
independent validator rather than reusing the authoring script). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 516/516 across the
full registry with this schema added, and `tools/verify-sources.mjs` reports
0 warnings/0 failures across all 4 URLs cited in this schema and this file.

## Known gaps

- Mongolia's remaining vertical — DMV — is a genuinely open, live backlog
  candidate (`burtgel.transdep.mn`), not a dead end, but was found more
  complex than a prior cycle's summary implied; see "Why this candidate"
  above. Mongolia now stands at 4 of 6 verticals (Visa, Business Formation,
  Passport, Taxes). National ID was confirmed a dead end by the GOV-3389
  cycle (both `e-mongolia.mn` and `burtgel.gov.mn` in-person/biometric-only
  per Government Resolution 396/2018, no annexed form template).
- `reportQuarter`'s exact real-world semantics (see "Scope and disclosed
  boundaries" above) is an open question for a future cycle.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields, cross-checked against a second independent
corroborating source (Mongolia's official legal-information portal) for the
form's own designation. No automated re-verification tooling exists yet for
this schema; `nextReviewBy` is set 6 months out per the practice's default
cadence.
