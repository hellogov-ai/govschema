# Verification record — `il/moin/dr1-passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3094)

The GOV-3078 cycle ("GovSchema Standard Research") screened all of Israel's
remaining verticals and found the Population and Immigration Authority's
Form DR/1 ("Application for Passport / Travel Document") a genuine,
unauthenticated, native-text PDF at a direct `gov.il` BlobFolder URL — but
left it as disclosed backlog (a one-cycle authoring budget already spent on
Nepal that same cycle), noting it as the ready-to-author candidate for
Israel's Passport vertical. This cycle (GOV-3094, "GovSchema Standard
Research") re-scanned `CATALOG.md`'s own "Genuinely open, well-sourced
candidates" section, found this exact pre-scouted candidate still open, and
independently re-fetched and re-verified it from scratch (not trusted
as-is) before authoring.

## Sources examined

- **Document `(id, version)`:** `il/moin/dr1-passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Population and Immigration Authority (Rashut HaOchlusin
  VeHaHagira, PIBA).
- **Primary source:**
  - Direct PDF: <https://www.gov.il/BlobFolder/service/apply_for_passport/he/dr1_20.pdf>
    — re-fetched independently this cycle via plain `curl`: HTTP 200,
    **content-length 209,935 bytes**, sha256
    `cc9cfd6011e1131b4d871b8bf14cb3cd4a16e884fd3a7d50d6b95477bd3ac315`. No
    login/CAPTCHA gate on this direct BlobFolder URL, though the `gov.il`
    service landing page itself returns HTTP 403 (Cloudflare
    bot-mitigation) — see Structural validation below.
  - Extracted via `pdfjs-dist` (legacy CJS build, pinned to `3.11.174` for
    `canvas`-rendering compatibility — the latest `pdfjs-dist` major throws
    `TypeError: Image or Canvas expected` when rendering this PDF's inline
    photo-placeholder image object with `node-canvas`). Confirmed: **1
    page**; 515 text items; `getFieldObjects()` returns **null** and **0**
    page annotations (a flat, non-fillable print-and-fill PDF, matching
    this registry's convention for `il/tax-authority/1301-personal-details`
    and several other jurisdictions' civil-registry forms); a native
    (non-scanned) Hebrew text layer, fully extractable.
  - Hebrew is a right-to-left script, and raw `pdfjs-dist` text extraction
    (even after grouping into y-bands and sorting each band right-to-left
    by x) returns fragmented digit/letter runs for this form's own internal
    print-position codes (e.g. the digits of "18" and the following "B"
    marker for field 18 arrive as separate stream tokens interleaved with
    neighboring fields' tokens). Because this document's entire scope is
    the form's single page, it was additionally **rendered to a
    2.5×-scale PNG via `node-canvas`** and read visually, cross-checked
    line-by-line against the position-sorted text dump. This confirmed the
    form's own numbered markers (bare digit run + "B", e.g. "0 B", "49 B")
    are print-layout position codes for table-column headers, not a
    one-per-applicant-field numbering scheme — several header cells pair a
    label code with a second, separate code for the adjacent blank input
    box (`42 B` labels "הלשכה ב-" and `43 B` is that field's own blank
    box), and a multi-column table row (e.g. `48 B`, the prior-travel-
    document detail row) carries a single shared code covering every
    column in that row. Fields in this schema were derived from the
    visually-confirmed table/column structure itself, using the numbered
    markers only to cross-check label placement and grouping, never as a
    literal field count.

## Scope decisions

Form DR/1 is printed as a single page with a printed perforation line
("✂ ... לשימוש המשרד", "for office use") roughly two-thirds of the way
down the page:

1. **Everything above the perforation is modeled**: request type
   (`documentType`: passport vs. travel document), request reason
   (`requestReason`: first-time / replace-lost / renewal / replace-damaged
   / replace-stolen, each carrying the form's own "personal presence
   mandatory" qualifier except renewal), applicant identity (current and,
   where applicable, previous/maiden names in both Hebrew and Latin
   script), birth and personal-status details, residential address and
   phone numbers, the two independent address-registration opt-in
   checkboxes (`registerAsMailingAddress`,
   `alsoRegisterForMinorChildren`), the delivery address for the completed
   document, the minor-applicant consent block, and the applicant's own
   declaration/signature fields (`applicationPlace`, `applicationDate`).
2. **Everything below the perforation is out of scope**: receiving-office
   branch code, intake date, clerk name, the prior-travel-document and
   newly-issued-document tracking tables (document type/number/issue
   date/fate/receipt number; validity/references), the
   checked-by/approved-by/signed-by sign-off fields, and the
   postal-handover/personal-handover delivery fields. None of these are
   filled in by the applicant — they are recorded by the issuing clerk
   during and after processing, the same convention this registry applies
   to other jurisdictions' clerk-only intake/approval sections.
3. **`registerPreviousNameDespite7Years`/`registerMaidenNameDespite7Years`
   model the form's own two independent opt-in checkboxes** governing
   whether a changed previous/maiden name is still printed on the new
   document once more than 7 years have passed since the change — the
   form's own default, absent either checkbox, is to omit the old name
   after 7 years.
4. **`registerAsMailingAddress`/`alsoRegisterForMinorChildren` model the
   form's own two address-registration opt-in checkboxes** under the "שים
   לב" ("note") paragraph, which govern the Population Registry's own
   separate "mailing address" field — independent of, and not to be
   confused with, the applicant's registered residential address.
5. **`immigrantRegistrationDate` (תאריך רישום כעולה) is modeled
   `required: false`**, not gated on an immigrant-status field, since the
   source form provides it as one column among several personal-status
   columns with no separate checkbox restricting it to new immigrants
   (olim) — it is simply left blank by applicants to whom it does not
   apply.
6. **`consentingParentIdNumber` is modeled as a single field**,
   `requiredWhen` `applicantIsMinor` is `true`, rather than as separate
   father/mother ID fields. The form's own consent block prints one
   signature/ID-number line for the father and one for the mother, but its
   own instruction requires only **one** parent's consent ("על אחד ההורים
   לחתום על בקשה זו" — "one of the parents must sign this application").
   Modeling both lines as independently `requiredWhen` would incorrectly
   demand both parents' ID numbers on every minor application;
   GSP-0013's `requiredWhen` condition grammar has no "at least one of N
   fields" primitive to express the true either/or constraint directly, so
   a single field naming whichever parent actually signs was used instead.
7. **`applicantIsMinor` is not itself a printed checkbox on the form** — an
   applicant's minor status is inferred implicitly by the issuing office
   from the applicant's own date of birth. It is modeled here as an
   explicit boolean field the applicant/agent supplies directly, since
   GSP-0013's `requiredWhen` grammar has no built-in age-from-date
   computation to derive it from `dateOfBirth`.
8. **`documents[]` (3 entries) model the form's own declaration/attestation
   text verbatim**, following this registry's established convention for
   signed/quoted declaration blocks rather than encoding the statement
   itself as a field: `citizenshipAndAccuracyDeclaration` (required,
   quoting the citizenship-status and accuracy-of-details declaration),
   `policeRecordCheckConsent` (required, quoting the consent to a police
   criminal-record-database check), and `parentalConsentDeclaration`
   (`requiredWhen` `applicantIsMinor`, quoting the minor-applicant
   parental-consent paragraph).
9. **Out of scope, disclosed here rather than silently omitted**: the
   photo-specification requirements printed in the form's own "הדרכה"
   ("instructions") box (photo count, dimensions, background) are
   guidance text, not a data field the applicant fills in, and are not
   modeled; the applicant's own signature (mentioned throughout the form)
   is never modeled as a field per this registry's established convention
   — only the co-located date/place fields are.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/il/moin/dr1-passport-application/1.0.0/`: 2 valid scenarios
plus 5 mutation-control fixtures, each derived from one of the valid
fixtures by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-first-time-adult.json` (a first-time adult applicant, no
  previous name, no delivery-address override) — **0 errors**.
- `valid-minor-with-previous-name-and-delivery-address.json` (a minor
  applicant replacing a lost travel document, a previous family name
  carried past the 7-year mark, and a delivery address distinct from the
  residential address) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `fatherName`) —
  **exactly 1 error**.
- `mutation-control-missing-consenting-parent-id.json` (drops
  `consentingParentIdNumber` while `applicantIsMinor` is `true`) —
  **exactly 1 error**.
- `mutation-control-missing-parental-consent-attestation.json` (drops the
  `parentalConsentDeclaration` document while `applicantIsMinor` is
  `true`) — **exactly 1 error**.
- `mutation-control-invalid-enum-request-reason.json` (sets
  `requestReason` to `REPLACE_EXPIRED`, not in the enum) — **exactly 1
  error**.
- `mutation-control-invalid-date-format.json` (sets `dateOfBirth` to
  `12/03/2005`, not ISO 8601) — **exactly 1 error**.

The same checker script confirmed every `requiredWhen` field reference in
this schema resolves to a real field name (0 dangling references).

## Structural validation

- `node tools/validate.mjs` (full registry, post-add) — **467/467**.
- `node tools/validate-ajv.mjs` (full registry, post-add, ajv 2020-12
  against `spec/v0.3`) — **467/467**.
- `node tools/verify-sources.mjs registry/il/moin/dr1-passport-application/1.0.0` —
  1 directory, 3 URLs checked, **1 warning** (the `gov.il` service landing
  page itself, HTTP 403 — Cloudflare bot-mitigation, not evidence the
  source doesn't exist; the direct BlobFolder PDF URL that this schema's
  `source.url` actually cites resolves cleanly), **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure (above the
form's own office-use perforation) is fully transcribed from the genuine,
currently-served official form (a flat print-and-fill PDF, not an
interactive AcroForm), but no live filing through the Population and
Immigration Authority's own channels was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the State of Israel or the Population and
Immigration Authority.
