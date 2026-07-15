# Verification record — `il/corporations-authority/company-registration-form-1` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3087, following on from GOV-3078)

The prior GOV-3078 cycle ("GovSchema Standard Research") screened all of
Israel's then-unscreened verticals and found Form 1 (Application for
Company Registration) the strongest of three leads by field richness and
native form-field markup (154 `FORMTEXT` + 19 `FORMCHECKBOX` fields in the
raw `.doc`), but deferred authoring given that cycle's one-cycle effort
budget already spent on opening Nepal. This cycle (GOV-3087) independently
re-fetched and re-verified the source from scratch — not trusted as
pre-recorded — before authoring against it.

## Sources examined

- **Document `(id, version)`:** `il/corporations-authority/company-registration-form-1` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Registrar of Companies, Israeli Corporations Authority (Ministry of Justice).
- **Primary source:**
  - Direct `.doc`: <https://www.gov.il/BlobFolder/servicequestionnaire/company_registration/he/companyregistrationform2%20(2).doc>
    — fetched via plain `curl`: HTTP 200, **content-length 441,856 bytes**,
    sha256 `302bb540d3c970d7fe9bd5f53f03221ee6ebbfdb334fc55cb2e808b3c9feada5`.
    No login/CAPTCHA gate on this direct BlobFolder URL.
  - Magic-byte check confirmed a genuine legacy OLE/Compound-File-Binary
    Word `.doc` (`D0 CF 11 E0 A1 B1 1A E1`), not a renamed or mismatched
    file — this registry has previously been burned by a URL serving
    unrelated content under a plausible-looking filename (see
    `lk/bnr.wp.gov.lk`'s Philippines-BNR mismatch, GOV-3062's correction to
    the Sri Lanka Business Formation entry), so this check was done before
    any extraction was trusted.
  - Extracted via the `word-extractor` npm package (v1.0.4)'s `getBody()`
    API, which recovers the full run of table-cell and paragraph text in
    document order, including every `FORMTEXT` field's literal blank-run
    placeholder. This library exposes no bookmark/`FFData` API for legacy
    binary `.doc` (unlike `.docx`'s `w:sdt` content controls, which several
    other schemas in this registry have parsed directly), so this document's
    field identity, scope, and grouping were derived from the label text and
    table structure immediately adjacent to each blank in the extracted
    body — the same label-proximity technique already established in this
    registry for other non-AcroForm/flat sources. Every field's `sourceRef`
    quotes the governing Hebrew label verbatim.

## Scope decisions

Form 1 is a general-purpose company-registration application supporting
any number of founders/shareholders, multiple share classes, and both
natural-person and corporate founders. Modeling all of that would require
open, many-row repeating tables (the shareholder/share-allocation table,
the share-capital-by-class table, and the founder-declaration block, which
the extracted body shows repeated **4 times** in the source's own blank
template). GovSchema's array/repeating-group proposal, GSP-0009, is not yet
part of the accepted v0.3 specification. Following the identical precedent
set by `pk/secp/company-incorporation-single-member-company` (which
collapsed a wide multi-subscriber/multi-UBO table to a Single Member
Company's exactly-one-person pathway rather than fabricate a row cap), this
version is scoped to:

1. **A single natural-person founder** who is simultaneously the company's
   sole applicant and sole initial shareholder. The form's own alternative
   corporate-founder path ("שם התאגיד" / "מס' תאגיד") is out of scope.
2. **One class of shares**, collapsing the source's own share-capital table
   (four blank rows in the template) and share-allocation table to a single
   `shareTypeName`/`shareParValuePerShare` pair.
3. **`sharesHaveParValue`** models the form's own real either/or
   distinction — "\_\_\_ מניות ללא ערך נקוב / בסך כולל של \_\_\_ ₪" ("\_\_\_
   shares with no par value / with total value of \_\_\_ ₪") — as a
   boolean gate for the value-dependent fields
   (`registeredShareCapitalTotalValue`, `shareParValuePerShare`,
   `allocatedShareCapitalTotalValue`), since the form itself presents this
   as a real fork, not an invented one.
4. **`companyPurposeType`** models the form's own four-option §32 purpose
   block as an enum; **`companyPurposeDetail`** is gated `requiredWhen`
   `companyPurposeType` `notEquals` `LAWFUL_BUSINESS_UNRESTRICTED`, since
   three of the four options (§32(2), §32(3), and the public-purpose
   option) each print their own blank detail lines while the unrestricted
   §32(1) option prints none.
5. **The three restriction/no-restriction blocks** (share-transfer
   restriction, public-offering prohibition, fifty-shareholder cap) each
   model the form's own "mark the applicable alternative and detail the
   governing articles sections" instruction as a boolean plus a
   `requiredWhen`-gated sections field — the same pattern used three times
   running in the source itself.
6. **One row is disclosed as out of scope rather than guessed at.** A
   checkbox row's own heading, referencing section 175 of the Companies
   Law (a balance-sheet-attachment exemption contingent on the three
   restriction checkboxes above being ticked a certain way), came back from
   `word-extractor` with a garbled, partially duplicated text fragment
   ("הור הוב הוראות בתקנון לפי סעיף 175 לחוק") that could not be
   confidently reconstructed into a single, unambiguous field without
   fabricating its exact semantics. This registry's convention favors
   disclosing a genuine extraction gap over inventing a plausible-sounding
   field; a future cycle with cleaner source access (e.g. a rendered visual
   pass, the technique already used elsewhere in this registry for
   RTL/garbled text) should resolve it.
7. **`founderHasIsraeliId`** models a real either/or distinction the form's
   own prose draws ("היה החותם מי שאינו בעל ת\"ז ישראלית, יציין מספר
   דרכונו..." — "should the signer be someone who does not hold an Israeli
   ID, they shall state their passport number...") gating
   `founderPassportNumber`/`founderPassportIssuingCountry` and the
   `nonIsraeliIdCertifiedCopy` document — unlike cases elsewhere in this
   registry where a conditional was deliberately *not* modeled for lack of
   a real boolean gate on the source (e.g. `il/tax-authority/1301-personal-details`'s
   `residentialAddress`).
8. **The certifying-attorney fields and `attorneyCertificationDeclaration`
   document are modeled `required: true` (not gated behind a boolean),**
   since this form provides no alternative unwitnessed filing pathway — the
   attorney's certification is mandatory on every filing under this form,
   unlike e.g. `il/tax-authority/1301-personal-details`'s paid-preparer
   block, which the source form itself makes optional.
9. **`documents[]` (5 entries)** models the two plain attachment checkboxes
   ("ומצרף בזה") as `supporting-evidence` (the directors'-fitness
   declaration is a distinct standalone document this form only references
   by title, not text this form itself states verbatim), the founder's own
   sworn first-shareholder declaration and the attorney's own certification
   as `attestation` entries with statement text quoted verbatim from the
   extracted body, and the non-Israeli-ID passport copy as an
   `identity-document` entry gated on `founderHasIsraeliId`.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/il/corporations-authority/company-registration-form-1/1.0.0/`:
2 valid scenarios plus 5 mutation-control fixtures, each derived from a
valid fixture by a single targeted mutation. All 7 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-limited-by-shares-no-par-value.json` (a single Israeli-ID-holding
  founder, no-par-value shares, unrestricted §32(1) purpose, limited
  shareholder liability) — **0 errors**.
- `valid-unlimited-professional-non-israeli-founder.json` (a non-Israeli-ID
  founder providing a passport number/country, par-value shares, all three
  restriction blocks active, unlimited professional-company liability —
  exercising every optional/conditional field) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `founderIdNumber`)
  — **exactly 1 error**.
- `mutation-control-missing-conditional-share-transfer-sections.json`
  (sets `shareTransferRestricted` to `true` without
  `shareTransferRestrictionSections`) — **exactly 1 error**.
- `mutation-control-missing-conditional-passport-fields.json` (sets
  `founderHasIsraeliId` to `false`, supplies
  `founderPassportIssuingCountry` and the `nonIsraeliIdCertifiedCopy`
  document, but omits `founderPassportNumber`) — **exactly 1 error**.
- `mutation-control-missing-required-document.json` (drops the
  `founderDeclaration` document) — **exactly 1 error**.
- `mutation-control-invalid-enum-shareholder-liability-type.json` (sets
  `shareholderLiabilityType` to `PARTIALLY_LIMITED`, not in the enum) —
  **exactly 1 error**.

The same checker script confirmed every `requiredWhen` field/document
reference in this schema resolves to a real field name (0 dangling
references).

## Structural validation

- `node tools/validate.mjs registry/il/corporations-authority/company-registration-form-1/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/il/corporations-authority/company-registration-form-1/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **466/466**; `node tools/validate-ajv.mjs` → **466/466**.
- `node tools/verify-sources.mjs` — clean run against the full registry
  including this document's `.doc` source URL.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source `.doc`'s own printed structure is fully
transcribed from the genuine, currently-served official form, scoped to a
single-founder/single-shareholder pathway, but no live filing through the
Registrar's own channels was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the State of Israel, the Ministry of Justice, or the Israeli
Corporations Authority.
