# Verification record — `am/moj/state-registration-limited-liability-company` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3351**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Armenia opened as this registry's 66th jurisdiction in the immediately
preceding cycle (GOV-3343), with a single vertical modelled — Visa, via
`am/mfa/evisa-application`. Building out an already-open jurisdiction's next
vertical was preferred over opening a 67th brand-new jurisdiction from
scratch, following this registry's established practice.

A research scout (spawned this cycle, research-only) screened all five of
Armenia's remaining verticals:

- **DMV**: `roadpolice.am` (Road Police, Ministry of Internal Affairs) gates
  every registration/licensing action behind the national `YesEm` login;
  the vehicle-sale/registration handoff at `car.mia.gov.am` redirects into
  the same login. No downloadable specimen application form or public
  field-level wizard was found. Confirmed a dead end.
- **Taxes**: the State Revenue Committee's `src.am` publishes only
  general calculation-methodology PDFs, not a specimen declaration with box
  numbers; actual individual filing happens exclusively through the
  `YesEm`-gated `self-portal.taxservice.am`/`file-online.taxservice.am`.
  Confirmed weak/dead end this cycle.
- **Passport** and **National ID**: `migration.e-gov.am`'s own
  service-detail pages for both (`/en/service/first_passporting/info`,
  `/en/service/id_cards/info`) are behind a Radware "Verifying your
  browser" bot-check wall on every fetch attempt; issuance is described
  elsewhere as in-person only. Confirmed dead ends.
- **Business Formation**: the modern `e-register.am`/`e-register.moj.am`
  portal is Radware bot-protected and gates the application itself behind
  `YesEm` login — but its own footer links to a still-live legacy mirror,
  `old.e-register.am`, reachable with plain unauthenticated `curl` (no bot
  wall), which serves the Agency's own downloadable template library
  directly. **Strong candidate — authored this cycle.**

## Sources examined

### Primary sources

- **Authority:** Իրավաբանական անձանց պետական ռեգիստրի գործակալություն
  (State Register of Legal Entities Agency, Staff of the Ministry of
  Justice of the Republic of Armenia) — the registering body named in the
  Charter's own registration-stamp block, not assumed from domain
  reputation alone.
- **Document 1 — Model Charter (Կանոնադրության նմուշային ձև) of a Limited
  Liability Company.**
  - **URL (directly retrieved, HTTP 200):** `https://old.e-register.am/am/docs/302`
  - **File identity:** legacy OLE2 compound-file `.doc` (confirmed by its
    own `D0 CF 11 E0 A1 B1 1A E1` magic bytes, not an HTML error page),
    62,976 bytes, `sha256:2a9be0c8234b6b0b33a3d1ded0cc8c3b64c9f9fd0360d33d3cc34275db9ab63a`.
  - **Extraction method:** the npm `word-extractor` package (no
    antiword/catdoc/LibreOffice available in this environment), full body
    text extracted and read in Armenian.
  - **Structure confirmed:** §1 General Provisions (firm name in 3
    languages × full/abbreviated form, registered address); §2 Participant
    rights (fixed boilerplate); §3 Charter capital (amount, share count,
    nominal value per share); §4 Management (director's authority, fixed
    25%-of-net-assets self-dealing threshold printed directly in the
    template, not a blank — not modelled as a field for that reason); an
    annex participants list (per-participant country of
    incorporation/citizenship, name, "Սոց. քարտի համարը (առկայության
    դեպքում)" — social-card number, explicitly marked "if available" in
    the template's own text — passport/registration data, address, share
    count/percentage).
- **Document 2 — Sole Founder's Decision (Հիմնադրի որոշում).**
  - **URL (directly retrieved, HTTP 200):** `https://old.e-register.am/am/docs/415`
  - **File identity:** same OLE2 `.doc` format, 39,424 bytes,
    `sha256:75986362709182483d6a745b0e39b232198ed5a247d8a7df75e874a66f9a5a47`.
  - **What it adds beyond the Charter:** decision protocol number/city/date;
    confirmation the sole founder owns every share; charter adoption; and,
    uniquely, the director-appointment paragraph's own fuller field set —
    passport series/number, issuing authority, issue date, address, 10-digit
    Public Services Number (ՀԾՀ), email, and the employment contract's term
    in years — none of which the Charter itself collects for the director.

### Corroborating source (not modelled, disclosed as out of scope)

- **Document 3 — Firm Name Registration Application (Ֆիրմային անվանման
  գրանցման հայտ).**
  - **URL (directly retrieved, HTTP 200, genuine text-layer PDF):**
    `https://old.e-register.am/am/docs/19`
  - **File identity:** 29,613 bytes, `sha256:fedef43f3befd185a09d13d8e38594d08765a78c1f52a551a0745aaec10aaa42`.
  - **Extraction method:** `pdfjs-dist` (legacy build), `getTextContent()`.
  - Confirms this is a live, government-authored template library (three
    alternative trilingual name options, applicant name/signature, a
    registry-completed acknowledgment block) — used only as corroboration
    that `old.e-register.am` is genuine and current, not folded into this
    schema. It represents a separate, optional name-reservation pre-step,
    and is thin on its own (~10 fields).

### External reference

- **Public Services Number (ՀԾՀ) format:** confirmed as a 10-digit personal
  identifier via Armenia's Migration and Citizenship Service
  (`migration.mia.gov.am`) and secondary explainer sources
  (`move2armenia.am`, `armenian-lawyer.com`), not assumed. Modelled as
  `^[0-9]{10}$`.

## Scope and disclosed boundaries

This schema is deliberately scoped to the **single natural-person founder**
case, the direct Armenian counterpart to this registry's own
`de/handelsregister/gmbh-formation-musterprotokoll` (also single-founder-
scoped). Explicitly out of scope, and disclosed rather than silently
omitted:

- The **multi-founder Charter variant** and its accompanying **Founders'
  Meeting Protocol** (Հիմնադիրների ժողովի արձանագրություն) — the document a
  multi-founder LLC would execute in place of the Sole Founder's Decision.
  This cycle located and downloaded a joint-stock-company (ԲԲԸ) sibling
  category page listing this document by name for that entity type, but did
  not locate/fetch the LLC-specific specimen itself; a future cycle could
  extend this schema with a `founderCount`-gated `requiredWhen` branch once
  that specimen is in hand.
- A **corporate (as opposed to natural-person) sole founder** — the
  Charter's own annex separately supports this via its "Պետությունը, որտեղ
  հիմնադրվել է" (country of incorporation) field, not modelled here.
- The **Firm Name Registration Application** pre-clearance step (see
  Document 3 above).
- The **modern `e-register.am` online submission wizard** itself, which is
  Radware bot-challenge-gated on every page this cycle attempted to fetch,
  including its own root domain.
- The **director's fixed 25%-of-net-assets self-dealing authority
  threshold**, printed directly in the Charter template's own prose (not a
  blank) — background context, not a collected field.

## Conformance fixtures

8 fixtures are committed under
`conformance/am/moj/state-registration-limited-liability-company/1.0.0/`: 2
valid submissions (0 errors each — one minimal-required-fields-only founder,
one with all optional foreign-language name variants and the optional social
card number populated) and 6 mutation-control fixtures (each expected to
raise exactly 1 error): a missing required `companyNameArmenianFull`, a
missing required `founderIdentityDocumentData`, an invalid
`founderPublicServicesNumber` pattern (wrong digit count), an invalid
`directorEmail` pattern, a missing required `decisionNumber`, and a missing
required `directorEmploymentContractTermYears`. All 8 were checked with a
from-scratch, throwaway Node mock validator implementing this schema's own
`required`/`validation` rules (not committed — consistent with this
registry's established per-cycle practice of writing an independent
validator rather than reusing the authoring script). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 510/510 across the
full registry with this schema added.

## Known gaps

- Armenia's remaining verticals — DMV, Passport, Taxes, and National ID —
  are confirmed dead ends this cycle (see "Why this candidate" above),
  consistent with the equivalent dead-end findings the GOV-3343/GOV-3321
  cycles recorded for Georgia's DMV and Passport verticals. Armenia now
  stands at 2 of 6 verticals (Visa, Business Formation).
- The multi-founder LLC path (Founders' Meeting Protocol) is a disclosed,
  open backlog candidate for a future minor-version cycle — see "Scope and
  disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary sources directly
and transcribed their fields. No automated re-verification tooling exists
yet for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
