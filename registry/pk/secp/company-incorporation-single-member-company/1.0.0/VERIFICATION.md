# Verification record — `pk/secp/company-incorporation-single-member-company` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3062)

GOV-3062 ("GovSchema Standard Research") is the same recurring research-cycle
issue as GOV-2167/GOV-3026/GOV-3045/GOV-3049. This cycle opened with the
prior GOV-3049 cycle's own delegated work already fully landed (Greece's
Passport vertical, Italy's National ID vertical, both merged). A fresh
gap-audit of `CATALOG.md`'s 56-jurisdiction "By Jurisdiction" table found
that almost every remaining `✗` cell across existing jurisdictions is already
a documented "confirmed dead end" or "confirmed duplicate" from prior
cycles (re-checked this cycle for Croatia, Jordan, Kenya, Czech Republic,
Uruguay, Slovakia, Sri Lanka, and Nigeria — see below). Two candidates were
independently re-verified as stale/dead this cycle:

- **Sri Lanka Business Formation** (the Western Province BNR-01 candidate
  flagged "ready-to-author" by GOV-2781/GOV-2789): the cited
  `bnr.wp.gov.lk` S3 PDF (`BN+Application+Form.pdf`) was re-fetched and
  found, via `pdfjs-dist` text extraction, to actually be the **Philippines**
  DTI's "BUSINESS NAME REGISTRATION SOLE PROPRIETORSHIP APPLICATION FORM"
  (BNR Form No. 01-2018) — confirmed via the S3 object's own
  `Last-Modified: Thu, 28 Feb 2019` header that this has been the file
  served at that URL since well before the GOV-2781 cycle's own citation,
  meaning that citation's "~15 fields, scanned/flat 3-page PDF" description
  was never actually verified against the real content. This candidate is
  **not viable** — do not re-attempt without a genuinely new, correctly-
  targeted source.
- **Nigeria DMV** (the `nigeriadriverslicence.frsc.gov.ng/license/new/{token}`
  candidate flagged "not yet ready" by GOV-2976): re-confirmed this cycle —
  step 1 of the live flow requires a `test_certificate_number` plus a
  `McdlCaptcha` CAPTCHA before any further step is reachable. Genuinely
  CAPTCHA-gated past step 1, consistent with the prior finding; still not a
  viable candidate this cycle.

With the in-registry backlog effectively dry, this cycle dispatched four
parallel scouting passes across jurisdictions **not yet in the registry**
(Georgia, Israel, Pakistan, Egypt). Georgia's Business Formation candidate
came back a dead end (NAPR only publishes non-fillable instructional PDFs
and Word legal-document templates; the actual application is filed via the
CAPTCHA-gated `my.gov.ge` portal or in person). Israel's Tax Authority Form
1301 (Annual Individual Income Tax Return) came back a strong, cleanly-
sourced candidate but is a dense ~89-item comprehensive return with a
RTL-garbled `pdfjs-dist` text layer — high risk of transcription error
within a single cycle's effort budget; **delegated as a child issue**
(see below) rather than authored here, to give it focused, comparison-
checked effort of its own. Egypt's strongest candidate (a UK-consulate-
hosted visa PDF with real AcroForm `/Widget` fields but no extractable text
layer over its scanned background) was judged a weaker primary source (a
third-party consular mirror, not the issuing ministry's own domain) and was
not pursued further this cycle. Pakistan's SECP Form-1 — clean `.docx`,
directly from `secp.gov.pk`, no login/CAPTCHA gate, fully extractable
English text — was the strongest verified candidate and is authored here,
opening **Pakistan** as this registry's 57th jurisdiction.

## Sources examined

- **Document `(id, version)`:** `pk/secp/company-incorporation-single-member-company` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Securities and Exchange Commission of Pakistan ("SECP").
- **Primary source:**
  - Listing page: <https://www.secp.gov.pk/company-formation/formsapplications-schedule-of-filling-of-returns/statutory-forms/>
    — fetched directly (HTTP 200, `text/html`), no login/CAPTCHA gate. Lists
    dozens of SECP statutory forms via WordPress Download Manager links.
  - Form file: <https://www.secp.gov.pk/document/form-1-application-for-company-incorporation/?wpdmdl=56457>
    — "Form-1, Application for Company Incorporation [Pursuant to Section 16
    of the Companies Act, 2017 read with Regulations 8 & 30 of the Companies
    Regulations, 2024]". Fetched directly: HTTP 200, content-type
    `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
    **162,301 bytes**, sha256
    `5e34cf31a6590936726abe70fdfacb9c07e8c2ba32ecdec22430f4d27e5ac75c` —
    independently re-downloaded a second time this cycle and confirmed
    byte-identical (same sha256).
  - This is a native `.docx`, not a PDF. Unzipped directly (`python3
    zipfile`) and every `<w:t>` text run in `word/document.xml` was
    extracted via regex and read in full — Parts I, II (Sections A–E),
    IIA, and III, plus the Enclosures list and the witness block — not
    summarized from a rendering. Confirmed **no** `w:sdt`/`FORMTEXT`
    interactive form controls exist anywhere in the document (a
    fill-in-the-blank template, not a native Word form).
  - Every `<w:tbl>` in the document was also parsed structurally
    (`<w:tr>`/`<w:tc>` counts and per-cell text) to confirm table shapes:
    the subscriber/director table (2.10) has 17 columns, each with a
    lettered footnote marker (a)–(q) attached to the *column header itself*
    (e.g. `(a)` next to "Name and surname", `(b)` next to "CNIC/NICOP...")
    — confirming these are per-column footnote references, not 17 separate
    repeatable data rows. The UBO table (2A.1) has 13 columns and a
    pre-filled Sr.no. row running 1 through 13; the "Additional UBO
    information" (indirect-control) table has 10 columns with a pre-filled
    Sr.no. row running 1 through 10 — both are genuine wide, many-row
    repeating tables in the live form.

## Scope decisions

GovSchema's repeating-groups/array proposal (GSP-0009) is not yet accepted
into the v0.3 specification this document targets. Modeling Form-1's own
subscriber/director table and its two UBO tables faithfully would require
either an unbounded array (not representable in v0.3) or an arbitrary
numeric cap not printed anywhere on the form itself (fabricating structure,
not just scope). Rather than do either, this v1.0.0 is scoped to the
**Single Member Company (SMC)** pathway — a real, commonly used Pakistani
company type (not a toy example), and the only pathway on this form whose
subscriber/director table and direct-ownership UBO table both reduce to
exactly one row without any cap being invented:

1. **Subscriber/director/CEO (2.10) modeled as exactly one natural person**,
   per SECP's own minimum-directors table at 2.9 ("Single Member Company:
   01"). The "Designation (Director/Subscriber/CEO) Please specify" field
   is modeled as a single-select enum using the three literal labels
   printed on the form, even though in the SMC pathway the same person
   functionally holds all three roles at once — the schema captures the
   one value the source form's own "Please specify" instruction calls for,
   not an invented compound label.
2. **Nominee (2.11) modeled in full** — mandatory only for SMCs, and the
   only place this form itself supplies a genuinely closed, literal
   enumerated list (the "Relationship of Nominee with subscriber" field's
   validation enum is quoted verbatim from the section heading: "a spouse,
   father, mother, brother, sister and son or daughter").
3. **UBO (2A.1) modeled as exactly one entry** — the sole subscriber's own
   particulars, covering the direct-ownership case. The **"Additional UBO
   information" table for indirect/layered control (Regulation 13(3)) is
   out of scope** for this version — a genuine future companion-schema
   candidate for a multi-subscriber pathway once GSP-0009 lands or a
   disclosed bounded-cap convention is adopted for this form specifically.
4. **`gender` (subscriber and UBO) is modeled as a free-text `string`, not
   an `enum`** — the form's own table column supplies a bare "Gender"
   header with no printed value list, so no enum options are fabricated.
5. **The registered-office (2.1) / correspondence-address (2.2) conditional
   relationship is disclosed here in prose, not encoded as a
   `requiredWhen`.** The form's own instruction reads: "Information
   regarding Correspondence address is to be provided only if the company
   has not given its registered office at the time of incorporation in 2.1
   above." Encoding this would require inventing a boolean gate field the
   source form does not itself print as a distinct checkbox (2.1 is headed
   "if any", not a yes/no question) — both address blocks are instead
   modeled with `required: false`.
6. **Minimum Subscription (2.7) is out of scope** — the form's own text
   marks it "Applicable in case of Public Companies", which this SMC-scoped
   version is not.
7. **The witness-signature block is out of scope** — the form's own
   heading reads "(Only for the documents submitted in physical form)",
   and this version assumes online e-Services filing, which the form's own
   text states is "signed electronically."
8. **`documents[]` (7 entries)** is derived directly from the form's own
   numbered Enclosures list. The Part III declaration text (3.3) is quoted
   **verbatim** into the `declarationStatement` attestation entry's
   `statement` field. `articlesOfAssociationCustom` and
   `specializedBusinessNoc` are gated via `requiredWhen` matching the
   form's own conditional instructions at 2.13 and 2.8 respectively.
   `feePaymentEvidence` is modeled `required: false`, matching the
   Enclosures list's own parenthetical: "(not applicable in case of online
   filing)".

## Conformance fixtures (Phase 3)

6 fixtures committed under
`conformance/pk/secp/company-incorporation-single-member-company/1.0.0/`: 1
valid scenario (a Single Member Company incorporation with a spouse
nominee, `TABLE_A_PART_II` articles, not a specialized business, declarant
= the director) plus 5 mutation-control fixtures, each derived from the
valid fixture by a single targeted mutation. All 6 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`/`documents[]`/`requiredWhen`
conditions, not committed to the repo) before being finalized:

- `valid-single-member-company-spouse-nominee.json` — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `companyName`) —
  **exactly 1 error**.
- `mutation-control-missing-required-document.json` (drops
  `memorandumOfAssociation` from `documents`) — **exactly 1 error**.
- `mutation-control-invalid-enum-identity-document-type.json` (sets
  `subscriberIdentityDocumentType` to `DRIVERS_LICENSE`, not in the
  enum) — **exactly 1 error**.
- `mutation-control-missing-conditional-document.json` (sets
  `articlesOfAssociationTable` to `CUSTOM` without attaching
  `articlesOfAssociationCustom`) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (sets
  `subscriberIdentityDocumentIssueDate` to `15-03-2021`, not ISO 8601) —
  **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/pk/secp/company-incorporation-single-member-company/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/pk/secp/company-incorporation-single-member-company/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **463/463**; `node tools/validate-ajv.mjs` → **463/463**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: the source `.docx`'s own printed structure is fully
transcribed from the genuine, currently-served official statutory form (a
fill-in-the-blank template, not an interactive form), but no live filing
through SECP's e-Services portal was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of Pakistan or SECP.
