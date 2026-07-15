# Verification record — `il/mfa/entry-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3101)

The GOV-3094 cycle ("GovSchema Standard Research") screened all of Israel's
remaining verticals and found the Ministry of Foreign Affairs' "Entry Visa
to Israel - Application Form" a genuine, unauthenticated, native-text PDF at
a direct `embassies.gov.il` URL — but left it as disclosed backlog (a
one-cycle authoring budget already spent on the Passport vertical that same
cycle), noting it as the ready-to-author candidate for Israel's Visa
vertical. This cycle (GOV-3101, "GovSchema Standard Research") re-scanned
`CATALOG.md`'s own "Genuinely open, well-sourced candidates" section, found
this exact pre-scouted candidate still open, and independently re-fetched
and re-verified it from scratch (not trusted as-is) before authoring.

## Sources examined

- **Document `(id, version)`:** `il/mfa/entry-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Foreign Affairs, Global Consular Service
  (Sherut Konsulari Olami).
- **Primary source:**
  - Direct PDF: <https://embassies.gov.il/sites/default/files/media_upload/application_form_for_granting_an_entry_visa_to_israel-tourist.pdf>
    — re-fetched independently this cycle via plain `curl`: HTTP 200,
    **content-length 375,167 bytes**, sha256
    `3936353b36b102d6190496edc3b77a0c08a6cedcec1a7883c90cfe9cd2baf6bc`. No
    login/CAPTCHA gate on this direct `media_upload` URL.
  - Extracted via `pdfjs-dist` (legacy CJS build, pinned to `2.16.105`, the
    same build already used for `il/moin/dr1-passport-application`).
    Confirmed: **3 pages**; `getFieldObjects()` returns **null** and **0**
    page annotations on every page (a flat, non-fillable print-and-fill
    PDF, matching this jurisdiction's other two schemas). The text layer is
    native (not OCR/scanned), bilingual Hebrew (RTL) and English (LTR).
  - As with the DR/1 schema, raw text-content extraction (even after
    grouping into y-bands and sorting each band by x) returns Hebrew
    fragments in a visually jumbled order. All 3 pages were additionally
    **rendered to 2.5×-scale PNGs via `node-canvas`** and read visually,
    cross-checked against the position-sorted text dump.
  - A full-text scan of all 3 pages for `*`, `חובה` ("mandatory"), and
    `חייב` ("required") returned **zero matches** — this form carries no
    explicit required/optional marker anywhere, unlike this jurisdiction's
    other two schemas (see Scope decisions, required/optional judgment
    call).

## Scope decisions

1. **Bilingual mirrored checkboxes are collapsed to a single field per
   choice.** The form prints several choices as two structurally
   independent checkbox pairs — one under a Hebrew label (read
   right-to-left) and one under the equivalent English label (read
   left-to-right) — for the same underlying option, rather than one
   checkbox per option. `documentType` (Passport / Laissez-Passer),
   `gender` (Male / Female), and `familyStatus` (Married / Single /
   Widowed / Divorced) each follow this pattern and are modeled as a
   single enum field per choice, following the identical convention this
   registry already established for `il/moin/dr1-passport-application`.
2. **`residencePermitCategory` required a coordinate-level pass** —
   `pdfjs-dist` `getTextContent()` item x/y positions, not just
   line-joined text — to resolve unambiguously, since the two-column,
   three-row Hebrew checkbox grid and its English gloss column are offset
   by roughly one display row. The Hebrew grid's right column reads
   (top-to-bottom) "ביקור", "ארעי", "עבודה" at x≈262–290pt; its left
   column reads "תושב", "עולה" at x≈207–231pt (each row confirmed by
   shared y-coordinates, e.g. row 1 at y=394.7). The English gloss column
   prints "Visitor"/"Resident" on row 1 (y=394.4, matching the Hebrew row
   above), a single combined phrase "Temporary Resident" on row 2
   (y=379.7, glossing that row's own "ארעי"), and "Immigrant"/"Work" on
   row 3 (y=365.2 — "Immigrant" glosses row 2's own "עולה", offset down by
   one display row from its Hebrew counterpart, while "Work" aligns with
   row 3's own "עבודה"). This yields 5 distinct categories — Visitor,
   Resident, Temporary Resident, Immigrant, Work — consistent with
   Israel's own real-world entry/residence-status taxonomy for a consular
   entry-visa form; modeled as a single required enum field rather than
   guessed from line-joined text alone.
3. **Two identically-labeled contact-detail boxes are modeled as two
   generically-ordered fields, not guessed apart.** The form prints two
   "מס' טלפון נייד" / "Mobile No." columns and two "E-mail" / "כתובת
   אלקטרונית" boxes, each pair sharing the exact same label with no
   distinguishing sub-text anywhere on the page (confirmed via a
   coordinate dump of that row, not assumed from line-joined text).
   Modeled as `mobilePhoneNumber1`/`mobilePhoneNumber2` and
   `emailAddress1`/`emailAddress2`, in the form's own left-to-right column
   order, rather than inventing a distinguishing purpose the form itself
   does not state.
4. **`returnVisaDetails` is `requiredWhen` `documentType` equals
   `LAISSEZ_PASSER`**, following the form's own instruction ("אם ברשותך
   תעודת מעבר שהוצאה על ידי מדינת ישיבתך הקבועה... אנא ציין אם הוענקה לך
   אשרת חזרה ומה תוקפה") directing this question specifically at
   applicants travelling on a laissez-passer issued by their state of
   permanent residence.
5. **Required/optional judgment call, disclosed.** Unlike
   `il/tax-authority/1301-personal-details` and
   `il/moin/dr1-passport-application`, this form carries no asterisk,
   bolding, or any other explicit required-field marker on any of its 3
   pages (confirmed by the full-text scan noted above). In the absence of
   any such marker, core applicant identity, current travel-document,
   permanent-address-abroad, visit-purpose/detail, residence-permit-
   category, and signature-block fields are modeled `required: true`,
   while fields describing family members, additional contacts, or a
   second phone/email box are modeled optional. This is a judgment call,
   disclosed here rather than left implicit.
6. **Bounded repeating groups, not open-ended ones.** The "ילדים עד גיל
   18" (Children under the Age of 18) table prints a fixed 6-row grid
   (given name, place of birth, date of birth), and the "קרובים / מכרים
   בישראל" (Family/Acquaintances in Israel) table prints a fixed 4-row
   grid (name, relation, address); both are closed, bounded tables, not
   open-ended repeating structures. GovSchema's repeating-groups proposal
   (GSP-0009) is not yet part of the accepted v0.3 specification, so each
   is modeled as its own bounded per-row field set (`child1`..`child6`,
   `contact1`..`contact4`), following the same bounded-repeating-group
   convention already used elsewhere in this registry. All spouse, child,
   and contact fields are optional since they apply only when the
   applicant has a dependent or contact to declare.
7. **`documents[]` (3 entries) model the page-3 "הצהרה" (Declaration)
   text verbatim**, following this registry's established convention for
   signed/quoted declaration blocks rather than encoding the statements as
   fields: `accuracyAndGoodConductDeclaration` (required, accuracy of the
   submitted details and absence of any criminal offense/threat/illness),
   `noExpulsionOrEntryRefusalDeclaration` (required, absence of any
   expulsion order or prior entry refusal), and
   `visaDoesNotOverrideMoiAuthorityAcknowledgement` (required,
   acknowledgement that a granted visa does not override the Ministry of
   Interior's own authority to deny entry if the visa was obtained on
   false information).
8. **`applicantNameAtSignature` models the signature block's own
   re-printed "שם המבקש" (Applicant's Name) blank**, distinct from the
   `familyName`/`givenName` fields captured on page 1 — the form prints
   this as a separate blank next to the signature line. The applicant's
   own signature is not modeled as a field, per this registry's
   established convention — the 3 declaration attestations above already
   carry the substance of what is being attested to.
9. **Out of scope, disclosed here rather than silently omitted**: the
   dotted-border box at the foot of page 3, headed "לשימוש משרדי" ("for
   office use") — visa grant number, visa type, validity period and
   duration, single/multiple-entry designation, and consular remarks — is
   consular-office-only processing data the applicant never supplies, and
   is out of scope, the same convention this registry applies to other
   jurisdictions' clerk-only intake/approval sections (including this
   jurisdiction's own DR/1 and Form 1301 schemas). The form-instructions
   box on page 1 (photo requirements, "complete in Hebrew or English") is
   guidance text, not a data field, and is not modeled.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/il/mfa/entry-visa-application/1.0.0/`: 2 valid scenarios plus
5 mutation-control fixtures, each derived from one of the valid fixtures by
a single targeted mutation. All 7 were run against a from-scratch,
ephemeral field-by-field conformance checker (derived directly from this
schema's own `fields[]`/`documents[]`/`requiredWhen` conditions, not
committed to the repo) before being finalized:

- `valid-tourist-passport-holder.json` (a passport-holding tourist
  applicant travelling alone, no dependents or additional Israel contacts
  declared) — **0 errors**.
- `valid-laissez-passer-holder-with-family.json` (a laissez-passer-holding
  applicant who states their return-visa details, with a spouse, 2
  children, and 2 Israel-based contacts declared) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `familyName`) —
  **exactly 1 error**.
- `mutation-control-missing-return-visa-details.json` (drops
  `returnVisaDetails` while `documentType` is `LAISSEZ_PASSER`) —
  **exactly 1 error**.
- `mutation-control-missing-required-document.json` (drops the
  `accuracyAndGoodConductDeclaration` document) — **exactly 1 error**.
- `mutation-control-invalid-enum-document-type.json` (sets `documentType`
  to `ID_CARD`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets `dateOfBirth` to
  `14/02/1990`, not ISO 8601) — **exactly 1 error**.

The same checker script confirmed the one `requiredWhen` field reference
(`documentType`) resolves to a real field name (0 dangling references).

## Structural validation

- `node tools/validate.mjs` (full registry, post-add) — **468/468**.
- `node tools/validate-ajv.mjs` (full registry, post-add, ajv 2020-12
  against `spec/v0.3`) — **468/468**.
- `node tools/verify-sources.mjs registry/il/mfa/entry-visa-application/1.0.0` —
  1 directory, 3 URLs checked, **0 warnings, 0 failures**, all clear.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source PDF's own printed structure (above the
form's own "לשימוש משרדי" office-use box) is fully transcribed from the
genuine, currently-served official form (a flat print-and-fill PDF, not an
interactive AcroForm), but no live filing through the Ministry of Foreign
Affairs' own channels was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the State of Israel or the Ministry of Foreign Affairs.
