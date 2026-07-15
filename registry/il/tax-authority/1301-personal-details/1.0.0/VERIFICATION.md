# Verification record — `il/tax-authority/1301-personal-details` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3066, delegated from GOV-3062)

The prior GOV-3062 cycle ("GovSchema Standard Research") scouted Israel in
parallel with Georgia, Pakistan, and Egypt while looking for new-jurisdiction
candidates, and found Israel Tax Authority Form 1301 (the annual individual
income tax return) a strong, cleanly-sourced Taxes-vertical candidate — but
judged it too large to author accurately within that same cycle's effort
budget (a dense ~89-numbered-item return, with a known RTL-PDF-extraction
readability problem) and delegated it as a standalone child issue, GOV-3066,
with full pre-verified sourcing (URL, sha256, byte count, page/widget counts,
a suggested Part A/B scoping approach). This cycle (GOV-3070, "GovSchema
Standard Research") found GOV-3066 unclaimed and picked it up directly
rather than re-scouting fresh candidates, since it was already a fully
pre-verified, ready backlog item.

## Sources examined

- **Document `(id, version)`:** `il/tax-authority/1301-personal-details` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Israel Tax Authority (Rashut HaMisim).
- **Primary source:**
  - Direct PDF: <https://www.gov.il/BlobFolder/service/reporting-and-payment-2025-annual-tax-report-for-individuals/he/Service_Pages_Income_tax_annual-report-2026_itc1301-2025.pdf>
    — re-fetched independently this cycle via plain `curl`: HTTP 200,
    `content-type: application/pdf`, **content-length 1,745,508 bytes**,
    sha256 `4a08b47df48805e1577e72c34d0d0b9bc9630499093666e0bfa1585983c87c2a`
    — both figures exactly matching GOV-3066's own pre-recorded sourcing
    notes. No login/CAPTCHA gate on this direct BlobFolder URL, though the
    `gov.il` service landing page itself returns HTTP 403 (Cloudflare
    bot-mitigation), consistent with the WARN raised by
    `tools/verify-sources.mjs` for that one URL — see Structural validation
    below.
  - Extracted via `pdfjs-dist` (legacy CJS build,
    `require('pdfjs-dist/legacy/build/pdf.js')` — the `.mjs` build path
    does not exist in the installed package). Confirmed: **4 pages**;
    522/456/610/619 text items per page (~2,200 total); `getFieldObjects()`
    returns **0** and no `/AcroForm`/`/Widget` markers anywhere in the file
    (a flat, non-fillable "print-and-fill" PDF, matching this registry's
    established convention for several other jurisdictions' Taxes
    schemas); a native (non-scanned) Hebrew text layer, fully extractable.
  - Hebrew is a right-to-left script, and raw `pdfjs-dist` text extraction
    (even after sorting items by y-then-x position) returns a visually
    jumbled reading order — a known RTL-PDF-extraction issue, not unique to
    this form. Because this document's entire scope is page 1 (Parts A and
    B), that page was additionally **rendered to a 2.5×-scale PNG via
    `node-canvas`** and read visually, line-by-line, cross-checked against
    the sorted-text extraction. This caught and corrected an initial
    misreading of the bank-refund block: a text-only pass paired field
    numbers 277/278 with the wrong columns; the rendered image confirmed
    (reading right-to-left) bank code → branch code (**field 277**,
    "סמל סניף") → account number (**field 278**, "מספר חשבון"). Pages 2–4
    (Parts C–O, the ~89 numbered income/deduction/credit line items) were
    extracted as text only — sufficient to confirm the scale and shape of
    the material being excluded, not to individually verify field-by-field
    (out of scope for this version; see below).

## Scope decisions

Form 1301 is a comprehensive annual individual income tax return spanning
far more than a "personal details" section: 4 pages, roughly 89 numbered
line items covering ordinary and special-tax-rate income by category,
capital-gains/land-betterment income, exempt income, personal tax-credit
points, personal deductions and credits, and a final
advances/withholding/land-betterment-tax reconciliation (Parts C through
O). Modeling all of it in one version would require field-by-field
transcription of a very large tax-computation form well beyond what a
single cycle can transcribe and independently cross-check with confidence.
Instead, following GOV-3066's own suggested approach, this v1.0.0 is scoped
to **Part A's basic filing-basis declaration and Part B's personal-details
section in full**:

1. **`filingScope`** models the form's own mutually-exclusive "הדוח הוא על"
   ("this report covers") checkbox pair — joint income vs. filer's income
   only. The form's own **third**, independently-selectable checkbox in
   the same row ("אני מגיש דוח לשנת מס זו למרות שאיני חייב - בקשה להחזר
   מס" — "I am filing this year's return although not obligated to —
   refund request") is modeled as a **separate boolean**
   (`voluntaryFilingRefundRequest`) rather than folded into the same enum,
   since the source form allows it to be checked independently of either
   filing-scope option.
2. **The remaining ~30 special-situation checkboxes in Part A are out of
   scope** — virtual-currency realizations, trust settlor/beneficiary
   disclosures, kibbutz-member income routing, new-immigrant/returning-
   resident elections, controlled-foreign-company disclosures, reportable
   tax positions, and similar edge-case declarations, none of which are
   needed to identify, address, or route a return.
3. **The form's own "בן הזוג הרשום"/"בן/בת הזוג" person-block labels are
   translated into field-name prefixes `registeredFiler`/`spouse`, not a
   literal "registered spouse"/"spouse" label pair.** The form itself
   defines "בן הזוג הרשום" in its own box caption as "בן/בת הזוג הרשום
   במרשמי רשות המסים כ'בן הזוג הרשום' והאחראי על הגשת הדוח" — i.e. the
   person registered in the Tax Authority's own records as responsible for
   filing, not necessarily the historically-male spouse a literal
   translation might suggest. Every field's `sourceRef` still quotes the
   form's own Hebrew caption verbatim, so the mapping back to source is
   unambiguous despite the renamed prefix.
4. **`maritalStatus`'s five enum values are quoted directly from the
   form's own checkbox row** (רווק/נשוי וחי ביחד עם בן הזוג/גרוש/אלמן/פרוד),
   including the form's own parenthetical qualifier on the last value
   ("בהתאם למרשם רשות המסים" — "per the Tax Authority's own records"),
   disclosed in that field's `description` rather than fabricating a sixth
   option.
5. **`residentialAddress` is modeled `required: false` (not
   `requiredWhen`-gated on residency status).** The form's own printed
   instruction ("ימולא ע"י תושב חוץ בלבד" — "to be filled by non-residents
   only") is a prose qualifier on that specific address row; the form
   supplies no separate residency-status checkbox this document could gate
   on without inventing one.
6. **Registered-filer and spouse work-phone, deductions-file-number, and
   VAT-dealer-number fields are modeled as separate, explicitly-prefixed
   field pairs**, matching the form's own explicit two-column layout for
   each (`registeredFilerWorkPhone`/`spouseWorkPhone`,
   `registeredFilerDeductionsFileNumber`/`spouseDeductionsFileNumber`,
   `registeredFilerVatDealerNumber`/`spouseVatDealerNumber`).
7. **`fileNumber` (מספר תיק) is modeled `required: true`.** It is the Tax
   Authority's own case/file identifier printed at the top of Part B; an
   existing filer always has one. A first-time filer would need to obtain
   a file number from the Tax Authority before this return applies — a
   caveat disclosed in the field's own `description` rather than modeled
   as a conditional, since the source form does not itself distinguish
   first-time from returning filers via a separate field.
8. **`documents[]` (2 entries) models both declaration statements as
   `attestation` entries**, following this registry's established
   convention for signed/quoted declaration text: `filerDeclaration`
   (required, quoting the filer's declaration under section 143 of the
   Income Tax Ordinance verbatim) and `preparerDeclaration` (gated via
   `requiredWhen` on `paidPreparerUsed`, quoting the paid preparer's own
   declaration under sections 143/224 verbatim).
9. **Out of scope for this version, disclosed here rather than silently
   omitted:** all of Parts C–O (~89 numbered items: ordinary/special-rate
   income by category, capital gains/land betterment, exempt income,
   Part XI/XII/XIII additional details and carryforwards, tax credit
   points, personal deductions and credits, and the final
   advances/withholding/land-betterment-tax reconciliation); Form 1301's
   companion appendix Form 1348 (referenced on page 1 for a specific
   non-resident/"presence test" situation, not fetched this cycle); and
   the witness/physical-signature mechanics (this document models only
   `declarationDate`, the fillable date field beside the signature block,
   not the signature itself). Each of Parts C–O is a genuine future
   companion-schema candidate for a dedicated cycle of its own, given the
   scale disclosed above.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/il/tax-authority/1301-personal-details/1.0.0/`: 2 valid
scenarios plus 5 mutation-control fixtures, each derived from one of the
valid fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-single-filer-no-preparer.json` (a single, unmarried filer with no
  spouse, no preparer, minimal Part B fields only) — **0 errors**.
- `valid-joint-filing-with-preparer.json` (a jointly-filing married couple
  with a paid preparer and a bank-refund account, exercising every
  optional field) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `fileNumber`) —
  **exactly 1 error**.
- `mutation-control-missing-spouse-field.json` (drops `spouseIdNumber`
  while `filingScope` is `JOINT_WITH_SPOUSE`) — **exactly 1 error**.
- `mutation-control-missing-preparer-field.json` (drops
  `paidPreparerOfficeName` while `paidPreparerUsed` is `true`) —
  **exactly 1 error**.
- `mutation-control-invalid-enum-marital-status.json` (sets
  `maritalStatus` to `ENGAGED`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets `filingDate` to
  `30/04/2026`, not ISO 8601) — **exactly 1 error**.

The same checker script confirmed every `requiredWhen` field reference in
this schema resolves to a real field name (0 dangling references).

## Structural validation

- `node tools/validate.mjs registry/il/tax-authority/1301-personal-details/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/il/tax-authority/1301-personal-details/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **464/464**; `node tools/validate-ajv.mjs` → **464/464**.
- `node tools/verify-sources.mjs registry/il/tax-authority/1301-personal-details/1.0.0` —
  1 directory, 3 URLs checked, **1 warning** (the `gov.il` service landing
  page itself, HTTP 403 — Cloudflare bot-mitigation, not evidence the
  source doesn't exist; the direct BlobFolder PDF URL that this schema's
  `source.url` actually cites resolves cleanly), **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed Part A/B structure is
fully transcribed from the genuine, currently-served official 2025-edition
form (a flat print-and-fill PDF, not an interactive AcroForm), but no live
filing through the Tax Authority's own channels was attempted. GovSchema is
an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the State of Israel or the Israel Tax
Authority.
