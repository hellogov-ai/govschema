# Verification record — `ie/cro/business-name-registration-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

The document was derived directly from the official Form RBN1 PDF's own text
content, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has not yet been completed
against the live CRO filing channel (RBN1 is a paper/postal form with no
online-filing screens to compare against — see "Path to a `verified` claim"
below). It therefore remains `draft`, not `verified`.

## Why this schema and why now (GOV-4178, GOV-4176)

GOV-4176 is the recurring "GovSchema Standard Research" cycle. Ireland already
has a published Business Formation schema, `ie/cro/company-incorporation`
(Form A1, incorporating a new private company limited by shares), but that
document's own VERIFICATION.md and CATALOG.md both record that Ireland's
individual/sole-trader business-name registration (CRO Form RBN1) was a known,
still-open companion gap — the same category of pairing this registry has
built for other jurisdictions (company incorporation alongside sole-trader/
business-name registration, e.g. `lv/ur/sole-trader-registration-kr2` next to
Latvia's incorporation schema). A prior cycle (recorded in CATALOG.md around
`ca/on/registration/business-incorporation`) had screened `cro.ie` for RBN1
specifically and found the entire domain behind a Cloudflare JavaScript
challenge that blocks both direct fetch and a real headless-browser
`networkidle` wait, and pivoted to Ontario instead, leaving Ireland's RBN1
banked as backlog. This cycle found a working, unauthenticated static mirror
of the same official form (see below), unblocking it.

## Sources examined

- **Document `(id, version)`:** `ie/cro/business-name-registration-individual` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Companies Registration Office (CRO), Ireland.
- **Primary source URL:** `https://www.dlrceb.ie/_fileupload/Downloads/rbn1.pdf`
  — a copy of CRO's own Form RBN1 hosted, unauthenticated, by Dún
  Laoghaire-Rathdown Enterprise Board (a public local enterprise office,
  `dlrceb.ie`), fetched directly this cycle: HTTP 200, `application/pdf`,
  **17,660 bytes**. `cro.ie` itself (which hosts an equivalent RBN1 PDF under
  its own `/-/media/` path) returns a Cloudflare JavaScript-challenge
  interstitial to both a direct fetch and this environment's headless-browser
  tooling from this environment, the same class of block already recorded
  against it in `ie/cro/company-incorporation`'s own VERIFICATION.md; the
  `dlrceb.ie` mirror was used instead as an independent, unauthenticated
  distribution of the identical official document.
- **Retrieval / extraction method:** the PDF's raw bytes were retrieved (not a
  third-party summary — the fetch tool's own text-summarization step
  explicitly could not decode the file's compressed content streams and said
  so). The document's 3 `/Page` objects (`/Kids [ 15 0 R 1 0 R 4 0 R ]`) were
  confirmed directly from the file's cross-reference structure. Every
  `FlateDecode` content stream was independently decompressed with `zlib`, and
  every `Tj`/`TJ` text-showing operator in each stream was walked in document
  order, tracking each operator's `Tm`/`Td`/`TD` text-matrix operands to
  recover the **x/y position** of every field label and every one of the
  form's 8 numbered explanatory notes. This let each note be matched to its
  correct field by physical proximity (the note markers are small
  cross-reference tags printed near, but not always immediately after, their
  field's label in the content stream's own drawing order), rather than
  assumed from the notes' printed reading order on the notes page. No
  external secondary source was used or needed — RBN1's own printed notes are
  self-contained.
- **Official form id:** Form RBN1 ("Registration of Business Name by an
  individual"), issued under section 4 of the Registration of Business Names
  Act 1963.
- **Retrieved / reviewed:** 2026-07-21.
- **Reviewer:** GovSchema Engineering (Standards Engineer), initial authoring
  source-review.

## What was confirmed against the source

Every field/note mapping below was independently re-derived from the raw
content-stream text and its coordinate data (see "Retrieval / extraction
method"), not read off the notes' printed order:

| Source label | Note | Field(s) |
|---|---|---|
| Business name | note one | `businessName` |
| Other business name(s) under which this business is conducted | — (no numbered note attached) | `otherBusinessNames` |
| Nature of business | note two | `natureOfBusinessDescription` |
| Principal place of business | note three | `principalPlaceOfBusinessAddress` |
| Date of adoption of business name | note four | `dateOfAdoption` |
| Surname / Forename(s) / Former surname(s) / Former forename(s) | note six (referenced twice, once per column) | `applicantSurname`, `applicantForenames`, `applicantFormerSurnames`, `applicantFormerForenames` |
| Residential address | — (no numbered note attached) | `applicantResidentialAddress` |
| Business occupation | — (no numbered note attached) | `applicantBusinessOccupation` |
| Nationality | — (no numbered note attached) | `applicantNationality` |
| Directorship(s) — Company name / Company number | note seven | `applicantDirectorshipCompanyName`, `applicantDirectorshipCompanyNumber` |
| Presenter details (Name/Address/Telephone number/Fax number/Email/DX number/DX exchange/Reference number) | note five | `presenterName`, `presenterAddress`, `presenterTelephoneNumber`, `presenterFaxNumber`, `presenterEmail`, `presenterDxNumber`, `presenterDxExchange`, `presenterReferenceNumber` |
| Certification declaration + Signature | note eight | `certificationDeclarationConfirmed` |
| Name in block letters or typescript | — (no numbered note attached) | `certificationNameInBlockLetters` |
| Date (certification) | — (no numbered note attached) | `certificationDate` |

The two general, unnumbered form-wide instructions — "Where 'not applicable',
'nil' or 'none' is appropriate, please state" and the continuation-sheet
instruction for when the printed space is inadequate — were read but are not
modelled as data fields; they describe how to fill in the form's other
fields, not data of their own.

## Scope narrowing and why

- **Address fields are modelled as single free-text strings, not
  line1/line2/town/county sub-fields.** Unlike `ie/cro/company-incorporation`'s
  Form A1, whose source separately labels a registered office's address
  lines, Form RBN1 prints its `Principal place of business`, `Residential
  address`, and `Presenter details — Address` fields each as one ruled,
  multi-line writing box under a single label, with no internal sub-labels.
  This document follows the source form's own actual layout rather than
  imposing the sibling schema's line1/line2 convention where the source
  itself doesn't split the field — precision over cross-schema consistency
  where the two source forms genuinely differ.
- **`applicantDirectorshipCompanyName`/`applicantDirectorshipCompanyNumber`
  are flat, non-repeating fields**, even though their source boxes are tall
  enough to list more than one directorship. GovSchema v0.3 fields have no
  array/repeating-group construct (`GSP-0009` tracks a future addition), so —
  consistent with this registry's established precedent for repeatable
  source blocks (e.g. `ie/cro/company-incorporation`'s single-director
  scoping) — only one directorship pair is modelled; see the field
  descriptions for the disclosure.
- **Form RBN1A (partnership applicant), Form RBN1B (body corporate
  applicant), Form RBN2 (amendment of registered particulars), and Form RBN3
  (cessation of a registered business name)** are all distinct CRO forms
  referenced on RBN1's own "Further information"/"Changes" page but are
  entirely out of scope of this document, which models Form RBN1 (the
  individual applicant's initial registration) only.
- **Office-use-only fields** (the CRO-assigned Business Number and the CRO
  receipt date stamp) are server/back-office assigned, not applicant input,
  and are excluded — consistent with this registry's general boundary.
- **The prescribed fee** (referenced only via "please make the fee payable to
  the Companies Registration Office" and a further-information note that the
  fee amount is available from `www.cro.ie` or `info@cro.ie`, with neither the
  amount itself printed on the form) is payment metadata, not applicant-
  collected data, consistent with how this registry treats fees elsewhere
  (e.g. `ie/cro/company-incorporation`).
- **The signature itself is modelled as a boolean declaration
  (`certificationDeclarationConfirmed`)**, not as file/image data, following
  this registry's established convention for wet-ink signature requirements
  (cf. `ie/cro/company-incorporation`'s `formA1WetSignatureConfirmed`).

## What is NOT yet independently verified

- **Which presenter sub-fields are truly mandatory.** Note five states that
  the presenter section "must be completed by the person who is presenting
  the application form," but does not itself state which of the eight
  presenter sub-fields (name, address, telephone, fax, email, DX number, DX
  exchange, reference number) are individually mandatory versus optional
  alternative contact channels. This document marks `presenterName` and
  `presenterAddress` required and the remaining six optional, by analogy with
  this registry's `ng/cac/cac-1-1-application-for-registration-of-company`
  precedent (whose source form does print an explicit mandatory/optional
  split for its own presenter block) rather than from an explicit marking on
  RBN1 itself — flagged here for a future reviewer to confirm against a
  version of the form with visible required-field markers (this specimen's
  print layout does not use asterisks or similar markers anywhere on the
  form, unlike, e.g., Malta's Jobsplus engagement form).
- **Whether any field on this form is itself marked mandatory by an asterisk
  or similar convention.** This RBN1 specimen prints no asterisks or "*"
  markers next to any label (confirmed by the absence of any `*` glyph in the
  decompressed text streams for the field-label sections). Required/optional
  judgments in this document are therefore derived from each note's own
  wording (e.g. "where applicable" for directorships) or, absent an explicit
  note, from whether the underlying fact is one every registrant must have
  (e.g. a business name, a principal place of business) versus one that may
  genuinely not apply (e.g. other business names, former names, a
  directorship).
- **Online/CORE filing screen order and wording.** RBN1 is presented on
  `cro.ie` as a downloadable PDF for postal/hand delivery, not as an online
  CORE filing screen (unlike Form A1); this review did not find, and does not
  assert the existence of, an online RBN1 filing flow to cross-check the
  `steps[]` grouping against. The `steps[]` order instead mirrors the printed
  form's own page layout (business/trade details, then the individual
  applicant, then presenter details, then certification).
- **The exact byte-identity of the `cro.ie`-hosted RBN1 PDF against this
  cycle's `dlrceb.ie` mirror.** Both are represented as the same official
  form, but `cro.ie` itself could not be fetched this cycle to confirm a
  byte-for-byte match; a future reviewer with access to a Cloudflare-challenge
  workaround should re-confirm the two are identical (or note any revision).

## Mock test run (phase 4)

Two realistic payloads and one deliberately invalid payload were checked
field-by-field against every field's `type`/`required`/`validation` rule and
`steps[].fields` referential completeness (every field appears in exactly one
step; no step references an undeclared field), using an independently
hand-written mock validator (not the registry's shared `tools/validate.mjs`,
to cross-check it independently).

1. **Sole trader with no other business names, no former names, no
   directorships, and a full presenter contact set** — an individual
   registering a single trading name, principal place of business in Dublin,
   date of adoption given, all core fields populated, all optional fields
   (`otherBusinessNames`, `applicantFormerSurnames`,
   `applicantFormerForenames`, `applicantDirectorshipCompanyName`,
   `applicantDirectorshipCompanyNumber`, and all six optional presenter
   sub-fields) omitted. **Result: valid.**
2. **Individual with a former surname (a married woman's previous surname), a
   directorship of another company, and a presenter acting on the
   applicant's behalf via a document exchange service** — exercises
   `applicantFormerSurnames`, `applicantDirectorshipCompanyName` +
   `applicantDirectorshipCompanyNumber` together, and
   `presenterDxNumber`/`presenterDxExchange` together, with a presenter
   distinct from the individual applicant. **Result: valid.**
3. **Deliberately invalid payload** — an empty `businessName` (fails
   `minLength: 1`), a `natureOfBusinessDescription` of `""` (fails
   `minLength: 1`), missing `principalPlaceOfBusinessAddress` (fails
   `required`), missing `applicantSurname` and `applicantForenames` (fail
   `required`), a `presenterName` omitted while `presenterAddress` is given
   (fails `required` on `presenterName`), and `certificationDeclarationConfirmed`
   omitted (fails `required`). **Result: correctly rejected** — all 7 induced
   errors were caught independently.

All three payloads were also checked against `schema.json`'s `steps` array:
every field is reachable from `steps[0]` through `next` chaining, and no field
is orphaned from a step.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) against a `cro.ie`-hosted copy of Form RBN1 directly (once
a Cloudflare-challenge workaround is available), confirms it is byte-identical
(or notes any revision) to the `dlrceb.ie` mirror used here, resolves the two
open items above (presenter sub-field mandatoriness; absence of any asterisk
convention on this specimen), resolves any discrepancy by shipping a **new
schema version** (immutability — VERSIONING §3), and records the outcome here
plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-21** (6
months). Re-check the source on or before that date and on any `source.url`
change.
