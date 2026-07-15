# Verification record — `tz/nida/application-form-2a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3152)

GOV-3152 is a "GovSchema Standard Research" cycle delegation. Tanzania
opened this registry as its 61st jurisdiction via Business Formation
(`tz/brela/company-registration-form-14a`, GOV-3113); National ID & Civic
Documents was Tanzania's only other vertical with a strong, pre-identified
candidate — NIDA's own public `docs/` folder publishes Registration Form
2A as a direct, unauthenticated PDF. This cycle independently fetched and
re-derived the schema from scratch rather than assuming any prior scouting
note.

## Sources examined

- **Document `(id, version)`:** `tz/nida/application-form-2a` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** National Identification Authority ("NIDA"), Ministry of
  Home Affairs.
- **Primary source:**
  - Form file: <https://nida.go.tz/docs/APPLICATION-FORM-2A-NIDA.pdf> —
    fetched directly this cycle via plain `curl`: **HTTP 200**,
    content-type `application/pdf`, **948,509 bytes**, sha256
    `ea8f89946c77027c86701cdcb8b45cb4f617c5324854b52ccbe8b2c49a9b2f8e`. File
    header confirmed genuine `%PDF-1.5`.
  - A genuine **2-page** native text-layer PDF, confirmed via `pdfjs-dist`
    (legacy CJS build, pinned to **3.11.174** for `node-canvas` rendering
    compatibility — newer 4.x releases have failed `node-canvas` rendering
    on other PDFs in this registry before). `getAnnotations()` returned
    **zero** widgets on both pages — no `/AcroForm`, a fill-in-the-box,
    non-interactive print-and-fill template, not an interactive PDF form.
  - Every line of both pages was extracted via `getTextContent()` (grouped
    by `y`-coordinate, cross-checked against a raw per-glyph `x`/`y` dump),
    and both pages were additionally rendered to 2.5×-scale PNGs via
    `node-canvas` and visually inspected — this confirmed the box/checkbox
    layout end to end and resolved two regions where raw text-extraction
    order alone would have been ambiguous:
    1. The page-1 top-left corner prints a **bordered administrative box**
       — "BATCH NUMBER:", "POSTCODE:", "VILLAGE / MTAA / SHEHIA:",
       "ENROLLMENT STATION:", "BATCH DATE:" — visually and structurally
       distinct from the letterhead beside it and from the applicant's own
       Section C address fields below. Read together with Section G's
       identical "batch"/"center" administrative vocabulary, this is the
       enrolling office's own intake/filing reference box, not an
       applicant-facing field.
    2. Section E's five personal-reference item pairs (32/33, 34/35, 36/37,
       38/39, 40/41) each carry exactly **one** "( Tick (✓) if Attached )"
       checkbox, positioned beside the **number** item of each pair only
       (32, 34, 36, 38, 40), confirmed via an `x`/`y` coordinate dump —
       the tick gates each document *pair* as a whole, not each line
       independently.
  - A full-page render also confirmed the top checkbox pair "LEGAL
    RESIDENT" / "REFUGEE" ("Put a Tick Mark (✓) in the relevant box") is a
    single mutually-exclusive applicant-type selector, matching this
    form's own caption "(THIS FORM MUST BE FILLED IN BY LEGAL RESIDENTS/
    REFUGEES)" — distinguishing Form 2A from NIDA's separate Form No. 1
    (citizens), which this schema does not model.
  - Every numbered item (1-54) and the top applicant-type checkbox were
    checked against the rendered image for any asterisk, "if applicable",
    or other differentiating mark distinguishing required from optional
    fields. **None exists anywhere on this form** — every blank box in
    sections A-E is presented identically, with no visual or textual
    distinction. All requiredness judgment calls below were therefore made
    in the absence of any such source signal and are disclosed in full.

## Scope decisions

1. **The top-left enrollment/batch box is out of scope.** "BATCH NUMBER:",
   "POSTCODE:", "VILLAGE / MTAA / SHEHIA:", "ENROLLMENT STATION:", "BATCH
   DATE:" read as the enrolling office's own intake/filing reference,
   assigned at or around the point of enrollment, not applicant-supplied
   data — consistent with this registry's treatment of similar
   office-assigned reference boxes elsewhere (e.g. BRELA Form 14a's
   `trackingNumber`/`incorporationNumber`).
2. **Section G ("FOR OFFICIAL USE ONLY.", items 44-54) is entirely out of
   scope** — center number, region/district/ward, center name, application
   date, and five separate officers' name-and-signature lines
   (Registration, Immigration, RITA/RGO, WEO/Employer, NIDA), all
   explicitly captioned as office-only and never filled in by the
   applicant.
3. **Section F's own signature/date lines (items 42-43) are out of
   scope** — a physical wet-signature attestation mechanism, not a data
   field, consistent with this registry's established treatment of
   physical-signature-only blocks. The **declaration statement itself**
   ("I verify that all the information I have given above is correct and
   true to the best of my knowledge and belief.") is modeled as a
   `documents[]` `attestation` entry (`declarationOfAccuracy`,
   `required: true`), per this registry's established convention for
   quoted declaration text (e.g. `il/moin/dr1-passport-application`'s
   `citizenshipAndAccuracyDeclaration`).
4. **`applicantType` (LEGAL_RESIDENT / REFUGEE) is modeled as a required
   enum field**, per the form's own top checkbox pair and its own caption
   restricting this form to legal residents and refugees.
5. **Middle-name fields (applicant, father, mother) and the applicant's
   "Other Names" field are modeled `required: false`.** This is a
   judgment call, not a source-marked distinction: the form gives these
   fields the identical visual/box treatment as every other name field. It
   is modeled optional because a middle name is not culturally universal
   and "Other Names" is by its own label a supplementary catch-all, not a
   primary identifying name. First name, surname/last name for the
   applicant, father, and mother are modeled required.
6. **Section D's five "Address Line" items (27-31) are modeled with only
   line 1 required; lines 2-5 are `required: false`.** Unlike BRELA Form
   14a's single free-text "Name of activities" field (which had unlabeled
   continuation lines with no item numbers), this form gives each address
   line its **own** item number (27 through 31) — literalized here as five
   separate fields rather than collapsed into one — but they are still a
   single permanent address's continuation lines, and a short address will
   not need all five, so lines 2-5 are optional.
7. **Section E's ten document-number/expiry-date fields (items 32-41) are
   all modeled `required: false`, with no `requiredWhen` link to
   `applicantType` or to their own "tick if attached" checkbox.** Section
   E is captioned "PERSONAL REFERENCES," and which of the five document
   types (passport; resident permit/exemption certificate/dependant pass;
   work/authority permit; refugee ID card/ration card; convention travel
   document/certificate of identity) an applicant actually holds plainly
   depends on their own legal status and history — a refugee is unlikely
   to hold a passport, for example — but **the form itself never states
   this dependency**: no "if legal resident" / "if refugee" qualifier
   appears anywhere near items 32-41, unlike, e.g., `il/moin/mr41`'s
   `requestReason`-gated documents, which the source form explicitly pairs
   with each checkbox's own printed attachment instruction. Modeling an
   implicit `requiredWhen` link here (either to `applicantType` or between
   each number/expiry pair and its own tick-mark) would be inventing a
   conditional the source does not itself state. This is disclosed rather
   than resolved silently; a future version could add such gating if a
   NIDA implementation guide or internal procedure surfaces one.
   Conformance fixture
   `control-passport-number-without-attachment-tick-not-an-error.json`
   demonstrates this deliberately: a passport number/expiry supplied with
   no corresponding `passportCopyAttached` document raises **zero**
   errors.
8. **The five Section E "tick if attached" checkboxes are modeled as
   `documents[]` entries** (category `identity-document`, one per document
   pair), separate from the number/expiry data fields, since the tick
   itself represents a physical attachment, not a data value.
9. **`employmentStatus` (item 11, printed header "OCCUPATION:") is modeled
   as a 3-value enum, not a free-text job title** — the form provides only
   three checkboxes ("EMPLOYEED", "SELF EMPLOYEED", "UNEMPLOYEED") under
   that heading, no blank line for a job title. The source's own
   checkbox-label spelling is preserved verbatim in each field's
   `sourceRef`; enum values are normalized to standard English spelling
   (`EMPLOYED` / `SELF_EMPLOYED` / `UNEMPLOYED`).
10. **`maritalStatus`'s "WIDOW / WIDOWER" checkbox is normalized to a
    single gender-neutral `WIDOWED` enum value**, consistent with this
    registry's practice of not encoding a source form's own gendered
    checkbox pairs as two separate enum values when they denote one civil
    status.
11. **`nationality` and `placeOfBirth` are modeled as free-text strings,
    not enums** — the form prints only a blank box row for each, with no
    accompanying option list, matching this registry's established
    practice of not fabricating enum values a source does not itself
    enumerate.

## Conformance fixtures (Phase 3)

8 fixtures committed under `conformance/tz/nida/application-form-2a/1.0.0/`:
2 valid scenarios plus 6 control fixtures (5 error-raising
mutation-controls, and 1 deliberately non-error control demonstrating
Scope decision 7 above). All 8 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived directly from this schema's own
`fields[]`/`documents[]`/`required`/`requiredWhen`/`validation` rules, not
committed to the repo) before being finalized:

- `valid-legal-resident-with-resident-and-work-permit.json` (a single,
  employed legal resident from Zambia with a resident permit and work
  permit attached) — **0 errors**.
- `valid-refugee-with-refugee-id-and-travel-document.json` (a married,
  unemployed refugee from Burundi with a refugee ID card and convention
  travel document attached, a full name including middle/other names, and
  a 3-line permanent address) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `surname`) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets `dateOfBirth` to
  `14/03/1988`, not ISO 8601) — **exactly 1 error**.
- `mutation-control-invalid-gender-enum.json` (sets `gender` to `"OTHER"`,
  not in the form's own two-value checkbox enum) — **exactly 1 error**.
- `mutation-control-invalid-applicant-type-enum.json` (sets
  `applicantType` to `"CITIZEN"`, a value this form's own checkbox pair
  does not offer) — **exactly 1 error**.
- `mutation-control-missing-declaration-attestation.json` (drops the
  required `declarationOfAccuracy` document) — **exactly 1 error**.
- `control-passport-number-without-attachment-tick-not-an-error.json`
  (adds a `passportNumber`/`passportExpiryDate` with no corresponding
  `passportCopyAttached` document) — **0 errors** (by design; see Scope
  decision 7).

## Structural validation

- `node tools/validate.mjs registry/tz/nida/application-form-2a/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/tz/nida/application-form-2a/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **476/476** (up from 475/475 before this document); `node
  tools/validate-ajv.mjs` → **476/476**.
- `node tools/verify-sources.mjs` — clean (no FAIL/WARN on this document's
  changed files).
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure is fully
transcribed from the genuine, currently-served official form (a
fill-in-the-box template, not an interactive form), but no live submission
through any NIDA registration channel was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the United Republic of Tanzania, its Ministry
of Home Affairs, or NIDA.
