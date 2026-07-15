# Verification record — `il/mot/medical-examination-driving-license-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3133, delegated from GOV-3128)

A prior "GovSchema Standard Research" cycle (GOV-3128) opened Israel's
National ID vertical and, while scouting, found Israel's DMV vertical
(the only one still missing, 5 of 6) already had a strong, unauthenticated,
directly downloadable candidate — the Ministry of Transport's medical
examination form for driving-license renewal — and filed it as an unclaimed
child issue (GOV-3133) rather than authoring it in the same cycle. This
cycle (GOV-3138) picked up that unclaimed issue instead of re-scouting,
since the source was already confirmed live, and independently re-verified
and authored it from scratch.

## Sources examined

- **Document `(id, version)`:** `il/mot/medical-examination-driving-license-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Transport and Road Safety, Licensing Bureau
  (Agaf HaRishui).
- **Primary source:**
  - Direct PDF: <https://www.gov.il/BlobFolder/service/driving_license_renewal/ar/MedicinalExaminationPrati.pdf>
    — independently re-fetched via plain `curl` with a realistic desktop
    User-Agent: HTTP 200, content-type `application/pdf`, content-length
    **10,428,537 bytes**, sha256
    `a8c97a153617458b4e85c828bbb71f823424dd39c9bacdb4cffdc62961cca7f7`. The
    `gov.il` service landing page itself (`/he/service/driving_license_renewal`)
    returns HTTP 403 (Cloudflare bot-mitigation), but this direct
    `BlobFolder` asset path bypasses that challenge entirely — the same
    pattern already established for every other `gov.il`-hosted form in
    this registry (Form DR/1, Form 1301, Form MR/41, the entry-visa
    application).
  - Extracted via `pdfjs-dist` (legacy build, pinned to `3.11.174` after the
    4.x line failed to render this PDF through `node-canvas` with a
    `TypeError: Image or Canvas expected` in `paintImageMaskXObject`):
    **2 pages**, `getFieldObjects()` returns **null**, and page 2 has only
    **1** non-data annotation (a hyperlink) — a flat, non-fillable
    print-and-fill PDF, not an interactive AcroForm.
  - Because this is a dense, right-to-left, two-column tabular form (a
    parallel applicant-declaration column and physician-questionnaire
    column covering the same 14 clinical topics, plus a per-eye vision-test
    grid), raw text-extraction order alone was insufficient to resolve
    column/row membership unambiguously. Both pages were additionally
    rendered to 2.5×-scale PNGs via `node-canvas` and read visually,
    cross-referenced against the coordinate-sorted raw text extraction
    (partitioning items by x-coordinate: physician column `x<300pt`,
    applicant column `x>=300pt`) — the same row-offset bilingual/parallel-
    column grid-reading technique established in the GOV-3101 (Israel
    entry-visa) cycle. This was decisive: the two columns' item numbers
    are visually offset from each other (e.g. the applicant column's item 5
    sits at the same visual row band as the physician column's item 3)
    because of differing line-wrap heights, even though they cover the
    same clinical topic.
  - Sibling forms confirmed live this cycle: `MedicinalExaminationMassa.pdf`
    (truck/bus categories, HTTP 200, `application/pdf`) and
    `HafkadatRisayon.pdf` (Vehicle License Deposit Request, ~10 fields,
    confirmed live in the prior scouting note). **Neither is modeled in
    this version** — disclosed as backlog for a future companion-schema
    cycle.

## Scope decisions

1. **Header/identification** (`idNumber`, `licenseGrade`, `licenseNumber`,
   `birthYear`, `renewalDate`, `existingRestrictions`) is modeled directly
   from the form's own top-of-page identification box.
2. **Section A's leftmost box is boilerplate certifying text ending in a
   signature line, not a checkbox** — confirmed via the rendered image,
   which shows no checkbox glyphs in that cell (only the vision-test grid's
   own cells have checkboxes). It is modeled only as
   `visionExaminerStampAndSignature`/`visionExamDate`.
3. **The "מס' עצמים מזוהה" (number of objects identified) column's printed
   reference counts (2, 2, 3, 4) are static labels**, not applicant-facing
   input — only the adjacent כן/לא checkbox per row is a real field
   (`binocularVisionDiplopiaTestRow1`-`Row4`). The fourth row carries no
   per-eye label (unlike rows 1-3, labeled ימין/שמאל/יחד) and, confirmed via
   the rendered image, applies only to this column — no checkboxes are
   drawn for the acuity/field columns on that row.
4. **Both the applicant's self-declaration column and the physician's
   clinical-questionnaire column are modeled as distinct fields**
   (`applicantQ{N}...` / `physicianQ{N}...`) for each of the form's 14
   numbered clinical topics, since they are genuinely completed by two
   different people and the form's own instructions do not treat one as a
   subset of the other.
5. **Sub-item breakdowns differ by column and are modeled as printed**,
   not forced into a uniform shape: topic 6 (diabetes) has 4 lettered
   sub-items on the applicant column (diagnosed / on insulin / recent
   hypoglycemia / retinopathy surgery) but only 2 on the physician column
   (recent hypoglycemia / retinopathy surgery); topic 11 (sleep disorders)
   has the same 3 lettered sub-items on both columns (excessive daytime
   sleepiness / sleep apnea / narcolepsy).
6. **Topic 4's "circle one" degenerative-disease list** (Parkinson's/MS/
   ALS/other) is modeled as an `enum` (`applicantQ4DegenerativeDiseaseType`)
   plus a conditional `OTHER`-specify string, on the applicant column only
   — the physician column's parallel item does not repeat the "circle one"
   list as a separate fillable element and is modeled as a single boolean.
7. **Item 14** ("מצורפים סיכומי ביקור עדכניים מרופאים יועצים רלוונטיים")
   appears only on the applicant column, as a general confirmation
   checkbox (`applicantQ14SupportingDocumentsAttached`); the physician
   column has no corresponding 14th numbered item.
8. **Both `documents[]` entries** the Section B header instructs to attach
   "for a positive answer to any item" (a specialist consultation-summary
   document and a signed medical-confidentiality-waiver attestation) use a
   `requiredWhen.any` condition (spec v0.3 GSP-0013) listing all 18 of the
   applicant column's own top-level boolean questions. The physician-column
   fields are deliberately excluded from this trigger: the instruction is
   printed directly under the applicant-declaration header, addressed to
   the applicant completing that column, not the physician's own separate
   follow-up note (a referral action, not an attachment requirement).
9. **The physician's basis-of-knowledge declaration** ("אישור הרופא") —
   three mutually-exclusive checkboxes for being the applicant's regular
   treating physician of 3+ years, treating a recent immigrant of under 3
   years, or having reviewed the applicant's records at every HMO from the
   past 3 years — is modeled as `physicianKnowledgeBasis`, with a
   conditional `hmoName` required under the first two options (which each
   print a "בקופ״ח ___" blank; the third option does not).
10. **Page 2 is excluded**: it is a purely instructional cover letter
    (submission deadline, mailing address, phone/website contact, and
    branch-visit guidance) with no fillable fields, following this
    registry's established convention of excluding purely instructional
    pages/sections.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/il/mot/medical-examination-driving-license-renewal/1.0.0/`: 2
valid scenarios plus 6 mutation-control fixtures, each derived from a valid
fixture by a single targeted mutation. All 8 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-clean-medical-history.json` (no positive Section B answers) —
  **0 errors**.
- `valid-diabetes-and-sleep-apnea-history.json` (positive diabetes/
  hypoglycemia and sleep-apnea history, triggering the conditional
  hypoglycemia-event-date field and both `requiredWhen` documents) —
  **0 errors**.
- `mutation-control-missing-required-field.json` (drops `licenseNumber`) —
  **exactly 1 error**.
- `mutation-control-missing-degenerative-disease-type.json` (drops
  `applicantQ4DegenerativeDiseaseType` while
  `applicantQ4DegenerativeDiseaseDiagnosed` is `true`) — **exactly 1
  error**.
- `mutation-control-missing-hypoglycemia-event-date.json` (drops
  `applicantQ6HypoglycemiaLastEventDate` while
  `applicantQ6RecentHypoglycemia` is `true`) — **exactly 1 error**.
- `mutation-control-missing-hmo-name.json` (drops `hmoName` while
  `physicianKnowledgeBasis` is `REGULAR_TREATING_PHYSICIAN_3_YEARS`) —
  **exactly 1 error**.
- `mutation-control-invalid-license-grade.json` (sets `licenseGrade` to
  `C`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets `renewalDate` to
  `09/01/2026`, not ISO 8601) — **exactly 1 error**.

The same checker script confirmed every `requiredWhen` field/document
reference in this schema resolves to a real field name (0 dangling
references).

## Structural validation

- `node tools/validate.mjs` (full registry, post-add) — **474/474**.
- `node tools/validate-ajv.mjs` (full registry, post-add, ajv 2020-12
  against `spec/v0.3`) — **474/474**.
- `node tools/verify-sources.mjs` — checked; the direct `BlobFolder` PDF
  URL this schema's `source.url` cites resolves cleanly on a fresh fetch.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure (both
pages) is fully transcribed from the genuine, currently-served official
form (a flat print-and-fill PDF, not an interactive AcroForm), but no live
filing through the Ministry of Transport's own channels was attempted.
GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the State of Israel or the
Ministry of Transport and Road Safety.
