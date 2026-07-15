# Verification record — `il/moin/mr41-biometric-id-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3128)

Israel's National ID & Civic Documents vertical was the only one of its six
verticals left completely unscouted going into this cycle — Passport
(GOV-3094), Business Formation (GOV-3087), Taxes (GOV-3066), and Visa
(GOV-3101) were already published, but no prior cycle had screened National ID
at all. A dedicated scouting pass this cycle located Form MR/41 — the
Population and Immigration Authority's unified biometric-ID application — as
a genuine, unauthenticated, directly downloadable PDF. This cycle
independently re-fetched and re-verified it from scratch rather than trusting
that scouting note as-is.

## Sources examined

- **Document `(id, version)`:** `il/moin/mr41-biometric-id-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Population and Immigration Authority (Rashut HaOchlusin
  VeHaHagira, PIBA).
- **Primary source:**
  - Direct PDF: <https://www.gov.il/BlobFolder/generalpage/services_forms/he/MR41.pdf>
    — independently re-fetched via plain `curl`: HTTP 200, content-type
    `application/pdf`, content-length **206,497 bytes**, sha256
    `0b466f1d772b4261463b6a757098e855606d14bd0fe6a7dbcb7b44deaa686258`. The
    `gov.il` service landing page itself (e.g.
    `/he/service/biometric_smart_id_request`) returns HTTP 403 (Cloudflare
    bot-mitigation), but this direct `BlobFolder` asset path bypasses that
    challenge entirely — the same pattern already established for
    `il/moin/dr1-passport-application` and `il/tax-authority/1301-personal-details`.
  - Extracted via `pdfjs-dist` (legacy CJS build, pinned to `3.11.174`):
    **1 page**, 405 text items, `getFieldObjects()` returns **null** and
    **0** page annotations — a flat, non-fillable print-and-fill PDF, not
    an interactive AcroForm.
  - Because Hebrew (RTL) text-extraction order does not reliably reflect
    visual reading order for a densely tabular single-page form, the page
    was additionally rendered to a 2.5×-scale PNG via `node-canvas` and
    read visually. This cross-check was decisive for correctly resolving
    the two 7-year name-retention checkboxes' **opposite polarity** (see
    Scope decisions below) — the raw extracted text order alone would have
    been easy to misread as identical opt-in checkboxes.
  - A sibling form, **MR/41א** (age-16 first-time biometric ID, filed
    jointly by a minor applicant and one parent), was also independently
    re-fetched during scouting: HTTP 200, content-type `application/pdf`,
    content-length **105,608 bytes**, sha256
    `61ca67cdafdf5bd20546539c36d797cfe50f09b6a5aa9351d5b6d3062d081225`. It
    is **not modeled in this version** — disclosed as backlog for a future
    companion-schema cycle, per this registry's established
    guardian-consent companion-form pattern (e.g. the GOV-2397 rollup).

## Scope decisions

Form MR/41 is a single page with a printed "לשימוש המשרד" ("for office
use") divider near the bottom:

1. **Everything above the divider is modeled**: the six request-reason
   checkboxes (`requestReason`), applicant identity (current, English,
   previous, and maiden names), birth/personal-status details, the
   Hebrew-birth-date-suppression checkbox, primary address and mobile
   phone, the two mailing-address-registration checkboxes, the delivery
   address for the completed card, the applicant's own
   place/date-of-signature fields, and — conditionally, only when
   `requestReason` is `LOST_STOLEN_DAMAGED_REPLACEMENT` — the loss/theft/
   damage declaration sub-section (date, type, circumstances, location,
   police report, declarant details).
2. **Everything below the divider is out of scope**: the receiving-office
   branch code, intake date, and the names of the receiving/examining
   clerks — none of which the applicant fills in, following this
   registry's established convention for other jurisdictions' clerk-only
   intake sections.
3. **The two 7-year name-retention checkboxes have opposite default
   polarity**, confirmed via the rendered-image cross-check described
   above:
   - `registerPreviousNameDespite7Years` is an **opt-in** — the form's own
     default is to drop a changed (non-maiden) previous name from the ID
     supplement once 7 years have passed since the change, and this
     checkbox keeps it printed despite that. This mirrors Form DR/1's
     identical checkbox exactly.
   - `suppressMaidenNameAfter7Years` is an **opt-out** — the form's own
     default, once 7 years have passed since the maiden name was replaced
     (i.e. since the marriage/name change), is to print the maiden name on
     the ID supplement, and this checkbox suppresses it. This is a
     genuinely different rule from the previous-name checkbox above, not a
     transcription inconsistency — the source text for each was read
     independently from the rendered image and quoted verbatim in each
     field's `sourceRef`.
4. **`paternalGrandfatherName`** (שם הסב, אבי האב) is modeled
   `required: true`: the form prints it as a plain column in the same
   identity table as family/first/father/mother name, with no "if known"
   or optional marker distinguishing it from its neighbors.
5. **`birthDateHebrew` is modeled as a free-text `string`, not `date`**:
   the Hebrew calendar has no ISO-8601 representation and GSP-0013 defines
   no Hebrew-calendar date type. `birthDateGregorian` is modeled as the
   standard `date` type.
6. **General minor-consent gating (as used in Form DR/1's
   `applicantIsMinor`/`consentingParentIdNumber` pair) is deliberately
   NOT modeled here.** This form's own footer states that an application
   for a minor under 16 requires one parent's consent, but — unlike
   DR/1 — MR/41 prints no dedicated general-purpose parent-signature/ID
   line for that requirement anywhere on the form outside the loss/theft/
   damage declaration's own narrower `parentName`/`parentIdNumber` fields
   (themselves `requiredWhen` `declaringOnBehalfOf` is `MINOR_CHILD`,
   itself only reachable when `requestReason` is
   `LOST_STOLEN_DAMAGED_REPLACEMENT`). Inventing a general-purpose consent
   field with no corresponding printed form element would misrepresent
   the form's actual structure; the footer's general minor-consent
   requirement is disclosed here rather than encoded as an unsupported
   field.
7. **Each of the six `requestReason` values carries its own attachment
   requirement**, modeled as a `documents[]` entry `requiredWhen` that
   specific reason (or, for the two reasons sharing an identical
   attachment note, the `in` operator over both): the first-time parent's
   original ID, the current card in full (renewal/worn), supporting
   documents for a personal-details change, an identifying document for a
   loss/theft/damage replacement (the form's own note additionally
   specifies an Israeli passport is mandatory if the applicant holds one —
   disclosed in the document's own `sourceRef` rather than encoded as a
   separate conditional, since GSP-0013 has no "mandatory-if-possessed"
   primitive), and the current ID plus travel document for a cancellation
   replacement.
8. **The loss/theft/damage declaration's closing paragraph** (no longer
   possessing the card; undertaking to return it if found; the criminal
   liability notice under §35(b) of the Population Registry Law
   1965) is modeled as a single `documents[]` attestation
   (`lossDeclarationStatement`), `requiredWhen` `requestReason` is
   `LOST_STOLEN_DAMAGED_REPLACEMENT`, quoting the form's own text verbatim
   — following this registry's established convention for signed/quoted
   declaration blocks — while the substantive structured data within that
   same section (date, type, circumstances, location, police report,
   declarant identity) is modeled as ordinary fields, since a `documents[]`
   attestation cannot itself carry structured applicant-supplied data.
9. **`policeReportLocation` is `requiredWhen` `policeReportFiled` is
   `true`** (not `requiredWhen` the broader loss/theft/damage reason),
   since the source form only asks for the filing location once the
   applicant confirms a report was actually filed.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/il/moin/mr41-biometric-id-application/1.0.0/`: 2 valid
scenarios plus 6 mutation-control fixtures, each derived from one of the
valid fixtures by a single targeted mutation. All 8 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-first-time-adult.json` (a first-time adult applicant, no
  previous/maiden name, no delivery-address override, no loss-declaration
  fields) — **0 errors**.
- `valid-lost-card-declared-for-minor-child-with-delivery-address.json`
  (an adult declaring a card lost on behalf of their minor child, a police
  report filed, and a delivery address distinct from the primary address)
  — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `fatherName`) —
  **exactly 1 error**.
- `mutation-control-missing-parent-id-number.json` (drops
  `parentIdNumber` while `declaringOnBehalfOf` is `MINOR_CHILD`) —
  **exactly 1 error**.
- `mutation-control-missing-police-report-location.json` (drops
  `policeReportLocation` while `policeReportFiled` is `true`) —
  **exactly 1 error**.
- `mutation-control-missing-loss-declaration-document.json` (drops the
  `lossDeclarationStatement` document while `requestReason` is
  `LOST_STOLEN_DAMAGED_REPLACEMENT`) — **exactly 1 error**.
- `mutation-control-invalid-enum-request-reason.json` (sets
  `requestReason` to `FIRST_TIMEE`, not in the enum) — **exactly 1
  error**.
- `mutation-control-invalid-date-format.json` (sets `applicationDate` to
  `15/07/2026`, not ISO 8601) — **exactly 1 error**.

The same checker script confirmed every `requiredWhen` field reference in
this schema resolves to a real field name (0 dangling references).

## Structural validation

- `node tools/validate.mjs` (full registry, post-add) — **473/473**.
- `node tools/validate-ajv.mjs` (full registry, post-add, ajv 2020-12
  against `spec/v0.3`) — **473/473**.
- `node tools/verify-sources.mjs` — checked, see result recorded at commit
  time; the direct `BlobFolder` PDF URL this schema's `source.url` cites
  resolves cleanly on a fresh fetch.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure (above the
form's own office-use divider) is fully transcribed from the genuine,
currently-served official form (a flat print-and-fill PDF, not an
interactive AcroForm), but no live filing through the Population and
Immigration Authority's own channels was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the State of Israel or the Population and
Immigration Authority.
