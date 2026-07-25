# Verification record — mu/cbrd/foundation-registration@1.0.0

## Candidate selection

GOV-4904 ("GovSchema Standard Research"). The prior cycle (GOV-4897)
authored the sibling `mu/cbrd/limited-liability-partnership-registration`
(Form LLP1) and, in comparing it against the CBRD downloadable-forms page's
other untouched sibling, found the Foundation registration form weaker on a
first pass (4 pages, 95 text items, "mostly boilerplate/instructions" per
that cycle's own note) and banked it as open, disclosed backlog rather than
authoring it immediately.

This cycle re-scanned `CATALOG.md`'s Known Gaps section fresh: Türkiye's
entire NVI VAT-series backlog was already closed as of GOV-4890, Mauritius's
own LP2/LLP1 companion notice forms (consent-of-partner, consent-of-manager,
change-of-name, change-of-registered-office, removal-from-register) were the
next disclosed candidates but are all secondary notice filings rather than a
primary registration form, and the Foundation form itself — while sparser
than LLP1 — was never independently re-examined field-by-field, only
compared by raw item count. This cycle did that examination directly:
re-fetched the live PDF, ran both a positional text-layer extraction and a
canvas render (page images), and confirmed the form carries ten distinct,
real, substantive fields (particulars, founder, beneficiary, secretary,
council, registered office, period) plus its own eight-item accompanying-
document checklist — a small but genuine, non-boilerplate registration
form, not merely instructions. Authored as this cycle's schema rather than
scouting a brand-new jurisdiction, since it closes a specifically disclosed,
already-open-vertical backlog item with a known-good source.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/11/APPLICATION-FORM-FOR-THE-REGISTRATION-OF-A-FOUNDATION.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — the same `/cbrd/downloadable-forms/` listing page already used
  by the LP2/LLP1 siblings (HTTP 200, no bot-mitigation headers), with the
  PDF link read directly out of its HTML.
- HTTP 200, **52,376 bytes** retrieved.
- sha256 of the retrieved bytes:
  `87868a6ba5ae35b97cbce04fe60b70188819412dea7dac418bfa7e9e2abf054e`.
- Note: this cycle's re-fetch resolved a **2025/11**-dated upload path,
  distinct from the **2025/08**-dated paths the LP2/LLP1 siblings resolved to
  on the same listing page — the Department re-uploads/re-dates individual
  forms independently, not the whole page at once. Confirmed this is still
  the Foundation form (not a silently-swapped different document) by its own
  printed heading and page count matching the GOV-4897 cycle's banked
  description (4 pages).
- 4 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on every page — not an
  interactive AcroForm, same as both CBRD siblings.
- `getTextContent()` returned 22/16/9/48 text items across pages 1-4
  respectively (95 total, matching the GOV-4897 cycle's banked count) — a
  genuine text layer, every printed label recovered cleanly with exact
  `(x, y)` positions per item.

### Authority attribution

The form's own heading ("FOUNDATIONS ACT 2012", "APPLICATION FORM FOR THE
REGISTRATION OF A FOUNDATION ... In accordance with Section 23 of the Act")
and its hosting directly on the Corporate and Business Registration
Department's own domain (`companies.govmu.org/cbrd/`, the same authority
already attributed on both the LP2 and LLP1 siblings) attribute `authority`
to the Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

Because `getTextContent()` returned a genuine, positioned text layer, the
primary extraction was a positional read: every item's string plus its
`transform` matrix's `(x, y)` origin was dumped (not just line-grouped) to
recover the exact numbered-item structure, including two checklist items
((vi) and (vii)) that a coarser line-grouping pass had initially collapsed
into unnumbered continuation text of item (v) — caught and corrected before
authoring by re-dumping raw per-item coordinates rather than trusting the
first grouped read.

A supplementary canvas render (via `pdfjs-dist` + the vendored `node-canvas`
build) was run at 2.5x scale per page to visually confirm the ruled-box
layout the text layer alone cannot describe. Glyph rasterization failed for
a handful of characters (`getPathGenerator "requesting object that isn't
resolved yet"` warnings on pages 1 and 4 only, a handful of glyphs each) —
consistent with this registry's own `gov-form-pdf-extraction` precedent —
but ruled lines and table borders rendered cleanly on every page, which is
what this render was consulted for.

### Genuine finding: undivided, unruled entry boxes (distinct from the LLP1 finding)

The LLP1 sibling's own VERIFICATION.md discloses an "undivided
capital-contribution box" — a single ruled rectangle standing in for what a
column header implies should be a per-row grid. This form's structural
quirk is different and more basic: **items (v) Name & address of
Founder(s), (vi) Details of Beneficiary, (vii) Name & address of Secretary,
and (Viii) Names & address of members of Council are each printed as one
plain ruled rectangle with no internal ruling of any kind** — not even the
five numbered blank lines LP2/LLP1 print for their own partner/manager
grids. There is no way to bind separate "Founder 1"/"Founder 2" or
"Council Member 1"/"Council Member 2" fields to this source, because the
source itself draws no such division — every occupant of the box, however
many, is handwritten into one undivided space. Each of these four items is
therefore modelled as a single aggregate free-text field
(`founderNameAndAddress`, `beneficiaryDetails`, `secretaryNameAndAddress`,
`councilMembersNameAndAddress`), not a bounded numbered-slot series. This is
a weaker, less structured source document than either CBRD sibling, and is
disclosed here rather than papered over with an invented slot count.

Item (v) also carries a **sub-label mid-box** ("Service address", confirmed
at a distinct y-coordinate roughly a third of the way down the same ruled
rectangle) splitting it into two conceptually separate answers with no
ruling of its own between them — modelled as two fields
(`founderNameAndAddress` / `founderServiceAddress`) since the source itself
prints two distinct captions, even though neither sub-area is separately
ruled.

### Genuine finding: no signature/declaration block on the form itself

Both CBRD siblings (LP2, LLP1) print their own signature/declaration block
directly on the form ("Signature of applicant", "Name", "Date", etc.). This
Foundation form prints **no such block anywhere across all 4 pages** —
confirmed by dumping every text item on every page and finding no
signature/declaration caption at all. Item (ii) of the form's own
accompanying-document checklist — "Declaration made by applicant that the
information provided in the application is true and correct" — instead
requires this attestation as its own **separate attached document**, not a
field on the form proper. Modelled as the `applicantDeclaration` document
entry (category `attestation`, with the verbatim checklist wording as its
`statement`), not as applicant-signature fields the source does not print.

### Genuine finding: an 8-item checklist, not 5

A first line-grouped read of page 4 mis-collapsed the checklist to what
looked like 5 numbered items with two trailing unnumbered notes. Re-dumping
raw per-item `(x, y)` coordinates showed the checklist is actually **8**
independently numbered items, (i) through (viii):

1. Legal Certificate
2. Declaration that the application's information is true and correct
3. List of names & addresses of first officers (if any)
4. Consent of Secretary
5. Consent of members of the Council
6. Fee note: "the fees payable at the time of registration is Rs9000 + Rs100
   (Certificate)"
7. Letter stating whether the Foundation has a beneficial owner
8. "BRF3 - Application For Business Registration Card"

Items 1-2 and 4-7 are modelled as `documents[]` entries (categories
`supporting-evidence`, `attestation` ×4, and `payment` respectively). Item 3
is modelled `required: false`, mirroring this form's own "(if any)"
qualifier convention already used on the `amendmentToCharter`/
`dateOfArticles` fields (no requiredWhen gate — no checkbox or discriminator
is printed to condition on). **Item 8 (BRF3) is deliberately not modelled**:
it is its own separate application form (a Business Registration Card
application), not a document accompanying this Foundation registration, and
is out of this schema's scope.

## Document structure

**Page 1** — heading plus the first three particulars: (i) Name of
Foundation; (ii)(a) Date of Charter, (ii)(b) Amendment to Charter (if any);
(iii) Purposes and objects (the remainder of page 1 is this item's own
large ruled answer box).

**Page 2** — (iv) Date of Articles (if any); (v) Name & address of
Founder(s), with the "Service address" sub-label roughly a third of the way
down the same box; (vi) Details of Beneficiary.

**Page 3** — (vii) Name & address of Secretary; (Viii) Names & address of
members of Council (box continues onto page 4).

**Page 4** — (ix) Address of registered office; (x) Period of Foundation;
then the free-standing 8-item accompanying-documents checklist described
above.

## Conformance

No `requiredWhen` gates are used in this schema (the two "(if any)" fields
and the one "(if any)" document are all modelled simply optional, with no
discriminator field the source prints to condition on — same convention as
both CBRD siblings' own duration fields). An ephemeral, uncommitted Node
script (`validateInstance`, checking required fields/documents and rejecting
unknown field keys) exercised:

- 2 valid scenarios: (a) a minimal filing with every optional field/document
  omitted, (b) the same filing with both optional fields
  (`amendmentToCharter`, `dateOfArticles`) and the one optional document
  (`firstOfficersList`) included.
- 10 required-field-omission mutations (one per required field:
  `nameOfFoundation`, `dateOfCharter`, `purposesAndObjects`,
  `founderNameAndAddress`, `founderServiceAddress`, `beneficiaryDetails`,
  `secretaryNameAndAddress`, `councilMembersNameAndAddress`,
  `registeredOfficeAddress`, `periodOfFoundation`), each independently
  rejected as expected.
- 6 required-document-omission mutations (one per required document:
  `legalCertificate`, `applicantDeclaration`, `secretaryConsent`,
  `councilMembersConsent`, `registrationFeeReceipt`,
  `beneficialOwnerLetter`), each independently rejected as expected.
- 1 unknown-field-rejection mutation, rejected as expected.

19/19 scenarios and mutations behaved as expected. Both
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass against the
full registry with this schema included, and `node tools/verify-sources.mjs`
re-fetched and confirmed all 3 URLs this document and this record cite (the
live PDF plus the two CBRD sibling schemas' own already-verified source
URLs referenced above), 0 warnings.

## Scope and disclosed backlog

This schema does not model: full company incorporation (login-gated CBRIS
portal, no static equivalent); the BRF3 Business Registration Card
application referenced by this form's own checklist item (viii), a separate
application in its own right; or any of the LP2/LLP1 companion/notice forms
visible on the same downloadable-forms listing (consent-of-partner,
consent-of-manager, change-of-name, change-of-registered-office,
removal-from-register) — all open, disclosed backlog for a future Mauritius
Business Formation companion-schema cycle. This closes the last of the
three CBRD forms (LP2, LLP1, Foundation) identified as primary registration
forms on the Department's downloadable-forms page; Mauritius remains at 4/6
verticals (a third schema within the already-open Business Formation
vertical, not a new vertical).
