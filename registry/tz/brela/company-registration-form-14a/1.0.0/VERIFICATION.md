# Verification record — `tz/brela/company-registration-form-14a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3113)

GOV-3113 is a child issue of GOV-3109, itself delegated during the GOV-3104
"GovSchema Standard Research" cycle (Pakistan's FBR IT-1B, which opened
Pakistan's Taxes vertical). GOV-3109's own scouting pass found this Tanzanian
BRELA form — HTTP 200, no login/CAPTCHA gate, a genuine multi-page native
text-layer PDF — as a strong, unauthored candidate, and delegated it as
GOV-3113 rather than authoring it inline. This cycle re-derived everything
from scratch rather than trusting that prior scouting note as-is, per this
registry's standing convention.

## Sources examined

- **Document `(id, version)`:** `tz/brela/company-registration-form-14a` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Business Registrations and Licensing Agency ("BRELA").
- **Primary source:**
  - Form file: <https://www.brela.go.tz/uploads/documents/sw-1621406129-Form%2014a.pdf>
    — fetched directly this cycle: **HTTP 200**, content-type
    `application/pdf`, **263,198 bytes**, sha256
    `d0535d301c8764d40a4a0abec116f4c00e07d2ce544f489908788b7b1633fc35`.
  - A genuine **3-page** native text-layer PDF, confirmed via `pdfjs-dist`'s
    `getTextContent()` (not a scanned image); `getAnnotations()` returned
    **zero** widgets on all 3 pages — no `/AcroForm`, a fill-in-the-blank
    dotted-line template, not an interactive PDF form.
  - Every line of every page was extracted and read in full (line-grouped by
    `y`-coordinate, then cross-checked against a raw `x`/`y` per-glyph dump).
  - The AUTHORISED SHARE CAPITAL table (page 2) required a further
    coordinate-level pass: a 2.5×-scale `node-canvas` render of page 2 was
    pixel-scanned for dark horizontal/vertical rule lines, locating 6 column
    boundaries at `x = 1, 145, 295, 478, 710, 941, 1227`px and 3 row
    boundaries. This confirmed the table's 2-line-wrapped header ("Type of /
    Shares", "Class of / shares", "Total Number of / shares", "Value",
    "Aggregate nominal / value", "Currency" with a fixed, already-printed
    "TZS" directly beneath it) sits over one blank data row and one further
    "Total" row (whose own label sits inside the 4th column's `x`-range, with
    a second fixed "TZS" beneath the Currency column). Modeled as 5 fill-in
    fields (type of shares, class of shares, total number of shares,
    aggregate nominal value, total value) — the "Currency" cells are a
    printed constant (`TZS`), not applicant input, so no separate currency
    field was added.
  - The SHAREHOLDER 2 block (page 3) prints its field labels **without** the
    trailing dotted-blank glyphs every other block on the form has (e.g.
    `"National ID/Passport No:"` with no `……………` after it, vs.
    Shareholder 1's `"National ID/Passport No: ………………………………………………………………….`
    on page 2). A `Warning: TT: undefined function: 32` surfaced from
    `pdfjs-dist`'s font-glyph path generator while rendering that page —
    traced to character code **32 (space)**, not to any of the printed
    labels, ruling out silent text loss as the explanation. Treated as a
    pagination/layout artifact (the block ran out of vertical room for the
    dots, not a content difference): Shareholder 2's field set was
    cross-checked field-for-field against the identically-labeled
    Shareholder 1 block rather than relying on the missing dots.
  - Full-text grep of the extraction for `attach`, `enclos`, `copy of`,
    `certificate`, and `document` returned **zero matches** — the form
    itself prints no enclosures/supporting-documents list anywhere in its 3
    pages, unlike e.g. Pakistan's SECP Form-1. `documents[]` is therefore
    **not modeled** in this schema, rather than fabricating a generic
    placeholder entry.
- **Corroborating source 1 — the Companies Act itself, Cap. 212** (also
  BRELA-hosted): <https://www.brela.go.tz/uploads/documents/sw-1602521545-COMPANIES%20ACT%20(CAP.%20212).pdf>
  — fetched directly this cycle: HTTP 200, sha256
  `9c75e2d0623454942a535e5cddd22898683da877c3f7cbfd5e9a81f1196ef0fd`, 336
  pages, extracted via `pdfjs-dist` and grepped for cardinality rules. Found
  and read in full:
  - **Section 186:** "Every company shall have at least two directors."
  - **Sections 26–27:** a company whose membership falls below two members
    exposes its officers to personal liability for the company's debts
    after six months of continuing to trade below that threshold; the
    Act's own definition of "private company" (s.27) contains **no**
    single-member carve-out.
  - **Section 187:** "Every company shall have a Secretary" — stated as a
    blanket requirement, not limited to public companies; s.187(2)'s extra
    qualification-standard language is specific to *public* company
    secretaries, not a carve-out from the base requirement.
  These three sections together directly explain the form's own fixed
  layout — exactly two Director blocks, exactly two Shareholder blocks, and
  exactly one Company Secretary block — as statutory minimums, not merely a
  print-space convention. This reversed an initial UK/Kenya-style
  assumption (where private companies may have a single director/member and
  no mandatory secretary) that the second-occurrence blocks should be
  modeled optional.
- **Corroborating source 2 — a 2021 amendment note**:
  <https://breakthroughattorneys.co.tz/amendment-to-the-companies-act-cap-212/>
  — fetched directly this cycle: HTTP 200. Describes the Written Laws
  (Miscellaneous Amendments) (No. 3) Act, 2021's changes to **section 14(2)
  of the Companies Act** — the exact section this form itself cites
  ("Pursuant to section 14(2) Companies Act Cap. 212") — adding National
  Identification Number, Taxpayer Identification Number ("where
  applicable"), email address, telephone, and passport (for foreigners) as
  required particulars. This matches the form's own field set closely and
  is the basis for modeling every TIN field (company, and each
  director's/secretary's own TIN) as `required: false`: the amendment's own
  qualifier signals a TIN will not always exist at filing time. It also
  confirms the 2021 amendment preserved, not repealed, the mandatory
  Secretary requirement — it eased only a private company secretary's
  professional-qualification standard relative to a public company's.

## Scope decisions

Form 14a is a fixed, non-repeating template — every block on it (Applicant,
Company Information, Registered Office, Business Activities, both numbered
Directors, the Company Secretary, the Authorised Share Capital table, and
both numbered Shareholders) appears exactly once or exactly twice, printed
directly on the form itself. No fields were descoped for repeating-group
reasons (unlike, e.g., Nepal's OCR or Pakistan's SECP schemas), so this
version models the **whole form**:

1. **Both Director blocks and both Shareholder blocks are modeled
   `required: true`**, not optional, per the Companies Act corroboration
   above (ss. 26–27, 186). The Company Secretary block is likewise modeled
   `required: true`, per s.187.
2. **Every TIN field is `required: false`** ("where applicable", per the
   2021 amendment note corroborating source).
3. **`trackingNumber`, `incorporationNumber`, and `incorporationDate` are
   modeled `required: false`.** Unlike every other blank on the form, these
   read as BRELA/ORS-system-assigned references rather than applicant
   input — an incorporation number/date logically cannot exist before the
   very registration this form applies for is granted.
4. **`companyType` and both `Gender` fields are modeled as free-text
   `string`, not `enum`** — the form prints only a blank dotted line for
   each, with no accompanying option list, matching this registry's
   established practice of not fabricating enum values a source does not
   itself enumerate.
5. **`businessActivitiesDescription` is modeled as a single field**, even
   though the form gives 4 dotted lines of writing space (1 labeled line
   plus 3 blank continuation lines) — this is continuation space for one
   free-text answer, not 4 distinct labeled fields.
6. **The Authorised Share Capital table is modeled as 5 fields** (type of
   shares, class of shares, total number of shares, aggregate nominal
   value, total value), reflecting the single blank data row the table's
   own printed structure provides (see coordinate analysis above). The
   table's "Currency" column, fixed to `TZS` in both the header and the
   Total row, is documented in each amount field's own description rather
   than modeled as a separate currency field, since it is a printed
   constant, not applicant input.
7. **The end-of-form Director/Company-Secretary signature, date, and
   seal-or-stamp lines are out of scope** — a physical wet-signature/seal
   attestation mechanism, not data fields, consistent with this registry's
   treatment of physical-signature-only blocks elsewhere (e.g. Pakistan's
   SECP Form-1 witness-signature exclusion).
8. **No `documents[]` is modeled** — the form's 3 pages print no
   enclosures/attachments list and no "attach"/"copy of" instruction
   anywhere (confirmed by a full-text grep of the extraction), so no
   `documents[]` entry is fabricated. `documents` is optional per
   `spec/v0.3/govschema.schema.json`'s own top-level `required[]` list, and
   several existing schemas in this registry omit it for the same reason.

## Conformance fixtures (Phase 3)

6 fixtures committed under
`conformance/tz/brela/company-registration-form-14a/1.0.0/`: 1 valid
scenario (a private company with two directors — the second not empowered
to update ORS data — a company secretary, and two shareholders splitting
100,000 authorised shares 60,000/40,000) plus 5 mutation-control fixtures,
each derived from the valid fixture by a single targeted mutation. All 6
were run against a from-scratch, ephemeral field-by-field conformance
checker (derived directly from this schema's own `fields[]`/`required`/
`validation` rules, not committed to the repo) before being finalized:

- `valid-two-director-two-shareholder-with-secretary.json` — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `companyName`) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets
  `applicantDateOfBirth` to `12/06/1985`, not ISO 8601) — **exactly 1
  error**.
- `mutation-control-negative-share-count.json` (sets
  `shareholder1NumberOfShares` to `-500`, violating `minimum: 1`) —
  **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (sets `director1Email` to
  `"not-an-email"`) — **exactly 1 error**.
- `mutation-control-missing-second-director-name.json` (drops
  `director2Name`, the statutory-minimum-grounded second director block) —
  **exactly 1 error**, confirming the second Director block is enforced as
  required, not optional.

## An inaccuracy caught before committing

An early draft treated the second Director block, the second Shareholder
block, and the Company Secretary block as `required: false` by default,
reasoning from UK/Kenya-style Companies Act norms where a private company
may have a single director/member and no mandatory secretary. Fetching and
reading the Companies Act, Cap. 212 itself (the same BRELA-hosted primary
source) directly contradicted this: s.186 fixes a minimum of **two**
directors for every company, ss.26–27 treat two members as the ordinary
minimum with no single-member carve-out, and s.187 mandates a Secretary for
every company. All three blocks were corrected to `required: true` before
this version was finalized.

## Structural validation

- `node tools/validate.mjs registry/tz/brela/company-registration-form-14a/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/tz/brela/company-registration-form-14a/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **470/470** (up from 469/469 before this document); `node
  tools/validate-ajv.mjs` → **470/470**.
- `node tools/verify-sources.mjs` — clean (no FAIL/WARN on this document's
  changed files).
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure is fully
transcribed from the genuine, currently-served official statutory form (a
fill-in-the-blank template, not an interactive form), corroborated against
the Companies Act, Cap. 212 itself for cardinality, but no live filing
through BRELA's Online Registration System (ORS) was attempted. GovSchema
is an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of Tanzania or BRELA.
