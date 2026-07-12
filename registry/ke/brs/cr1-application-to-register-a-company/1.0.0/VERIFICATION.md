# Verification record — `ke/brs/cr1-application-to-register-a-company` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2493**. It opens **Kenya as
GovSchema's 40th jurisdiction** (confirmed by counting `ls registry/` before
and after — 39 directories before this schema, 40 after), via the Business
Formation vertical (1 of 6). A prior session had scouted Kenya's Business
Registration Service (BRS) Form CR1 as reachable; **nothing from that prior
report was trusted without an independent re-fetch/re-derivation**, and doing
so surfaced a material discrepancy the prior pass missed — see "The
docx-vs-PDF discovery" below.

## Sources examined

### Source 1 — BRS's own current Forms page and its CR1 download (chosen as `source.url`)

- **URL (forms index page):** <https://brs.go.ke/forms/> — fetched directly
  via `curl`, HTTP 200. This is BRS's own, currently-live forms listing; its
  table row for CR1 reads: *"CR1 | Application to register a company - [section
  13 of the companies Act, 2015]"*, linking to the docx below.
- **URL (CR1 docx download):** <https://brs.go.ke/wp-content/uploads/2022/11/CR1.docx>
- Fetched directly via `curl -L`: **HTTP 200**,
  `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  **37,952 bytes**, `Last-Modified: Wed, 21 Dec 2022 09:53:57 GMT`,
  `sha256:45e367a6eb47c49fef17bc32cec18bd99d281f7ee61715b3eb19ba2968174a8d`.
- The docx's own internal OOXML metadata (`docProps/core.xml`) records
  `dcterms:created`/`dcterms:modified` = **2017-11-13**, authored by
  "Margaret Wangu" — i.e. the *document content* dates to shortly after the
  Companies Act, 2015 and the Registrar of Companies (Forms) Rules, Legal
  Notice 103 of 2017 took effect, even though the file was last *uploaded* to
  brs.go.ke in 2022-11.
- Extracted with a custom Python script (no `pip`/`pandoc` in this sandbox)
  that unzips the `.docx` (it's a zip of XML parts), reads
  `word/document.xml`, and reconstructs paragraph/table-row/table-cell
  boundaries from the raw `<w:p>`/`<w:tr>`/`<w:tc>` markup before stripping
  tags — necessary because a naive `<w:t>`-only text join collapses table
  structure and loses which label goes with which blank.

### Source 2 — the older PDF specimen (cross-checked, NOT chosen as primary; both disclosed)

- **URL:** <https://eprocedures.investkenya.go.ke/media/CR-1-APPLICATION-TO-REGISTER-COMPANY-LIMITED-BY-SHARES-OR-GUARANTEE-OR-IS-UNLIMITED%20(5).pdf>
  (Kenya Investment Authority's eProcedures/eRegulations portal, also a
  `.go.ke` government domain).
- Fetched directly via `curl`: **HTTP 200**, `Content-Type: application/pdf`,
  **192,752 bytes**, `Last-Modified: Tue, 02 Feb 2016 13:30:42 GMT`,
  `sha256:0772ddb41d4511159fab22ba1fc11194bb0957a06d3388a0270833773e997100`.
- `pdfjs-dist`'s (`legacy/build/pdf.mjs`) `getDocument().promise` metadata
  reports `PDFFormatVersion: "1.5"`, `IsAcroFormPresent: false`,
  `IsXFAPresent: false`, `Producer: "Microsoft® Word 2010"`,
  `CreationDate`/`ModDate: D:20160202163027+03'00'`.
- **AcroForm widget count, re-confirmed independently (not trusted from the
  prior report):** `page.getAnnotations()` on both of the PDF's 2 pages
  returns **0 annotations, 0 widgets** on each page — **0 widgets total**,
  matching `IsAcroFormPresent: false`. This is a genuine printed, blank-line
  fill-in-the-blank text specimen, not an interactive PDF form — confirmed,
  not assumed.
- Full text extracted with `getTextContent()`, item-by-item, keeping each
  glyph run's `transform` matrix (`x`,`y`) so the printed layout/line-spacing
  could be inspected directly (see "The docx-vs-PDF discovery" below).

### The docx-vs-PDF discovery

The task brief's prior-session framing was that the PDF and docx were the
same form in two formats, differing only in upload date (2016 vs 2022), and
that this registry's usual "prefer the static PDF" convention should apply
with both disclosed. **That framing turned out to be wrong on inspection —
the two documents have materially different content, not just format.**

The 2016 PDF specimen's item 2 prints only **one** branch of the
private/public choice: *"The company is a private company; or"* — with no
second line, no checkbox glyph, and no visible "public company" alternative
anywhere in the coordinate-ordered text dump (confirmed by dumping every
text item's `y`/`x` position; the gap after item 2 before item 3 is
consistent with ordinary paragraph spacing, not a missing/invisible second
line of content). Item 7 similarly prints only *"The liability of the members
is limited by shares"* with no guarantee/unlimited alternative visible. Raw
zlib-decompressed content-stream inspection (the `stream...endstream` bytes,
decompressed and grepped for `Tj`/`TJ` text-show operators) confirms this is
not a font-substitution or extraction artifact — the operators for those two
items literally contain no more text than what `getTextContent()` reported.
This specimen appears to be an early, apparently-truncated draft — dated
2016-02, *before* Legal Notice 103 of 2017 (the Forms Rules that formally
prescribe CR1) was even gazetted.

The BRS docx, by contrast, has an **explicit, fully-resolved** mechanism for
both distinctions:

- Item 2, "Type of company: (select the type of company that applies)",
  lists all **four** options as its own paragraphs: *"Public company limited
  by shares"*, *"Private company limited by shares"*, *"Company limited by
  guarantee"*, *"Private unlimited company"*. Inspecting the raw
  `word/document.xml` around this item shows each option is paired with its
  own floating `<w:drawing>` anchor — a small (~0.3in × 0.26in) empty
  rectangle shape (`<a:prstGeom prst="rect">`) positioned immediately to its
  left. This is a genuine mark-one-of-four selection mechanism (an empty box
  to hand-tick), not an AcroForm field and not a rendering artifact — the
  docx has **0** `w:checkBox`/`w:sdt` content controls (checked via regex
  count), confirming these are drawn boxes, not interactive form fields
  either.
- Item 3, "Articles of association ... (select the option that applies)",
  resolves the second ambiguity the same way, with three options: *"has
  prepared its own articles of association"*, *"will adopt the model
  articles of association applicable to the type of company selected
  above"*, *"will adopt some of those model articles and has prepared its
  own articles of association to supplement or modify those model articles"*.

**Decision: this schema's primary source is the BRS docx, not the PDF**,
despite this registry's general preference for a static PDF over a docx when
the two are parallel copies of the same content. That general preference
does not cleanly apply here because the discrepancy is about *scope and
currency of content*, not format: the docx is (a) hosted as BRS's own
currently-linked download on its own live Forms page today, (b) internally
dated to shortly after the 2015 Act/2017 Forms Rules took effect (versus the
PDF's 2016-02 date, which precedes the 2017 Forms Rules), and (c) the only
one of the two that actually resolves the private/public and
shares/guarantee/unlimited selection cleanly, rather than leaving one
ambiguous. The PDF is still fetched, hashed, and disclosed in
`schema.json`'s `description`/`source.documentRef` and here, and several of
its own sections (see "Cross-source synthesis" below) are used where the
docx compresses detail the PDF states more fully.

Given the docx cleanly resolves **both** original ambiguities via one
`companyType` enum, this schema does **not** need to scope down to a
"private company limited by shares only" path — all four company types are
modelled, with Part III (share capital) and Part IV (guarantee) gated by
`companyType` via `requiredWhen`.

### Source 3 — legal-currency check (Companies Act 2015 / Legal Notice 103 of 2017)

- Web search confirmed the **Companies Act, 2015** remains in force (Kenya
  Law's consolidated edition current to 2024-12-27) and the **Registrar of
  Companies (Forms) Rules, Legal Notice 103 of 2017** remains in force,
  amended but not repealed (Kenya Law's consolidated edition current to
  2022-12-31; it itself revoked the prior 2015 forms rules, L.N. 254/2015).
- Attempting to fetch Kenya Law's own gazette PDF of L.N. 103/2017 directly
  (`new.kenyalaw.org/akn/ke/act/ln/2017/103/eng@2022-12-31/source.pdf`) was
  blocked by a WAF (**HTTP 403** on both `curl` and `WebFetch`) — disclosed
  here as a limitation rather than silently worked around; the in-force
  determination above rests on Kenya Law's own search-indexed page metadata
  and independent secondary confirmation (see next bullet), not a direct
  read of the gazette text.
- Multiple current (2025/2026-dated) Kenyan legal-practice guides
  (e.g. wka.co.ke, muteamuthuriadvocates.com) independently list **CR1**
  among the standard company-incorporation forms still in use (alongside
  CR2, CR8, and the Statement of Nominal Capital), confirming CR1 has not
  been withdrawn or replaced as of 2026.
- These same sources confirm that registration is now filed **electronically
  through BRS on the eCitizen platform** — company incorporation in Kenya is
  effectively a digital-first process today. Per this registry's established
  "structural reference over a now-primarily-online process" framing (see
  `pe/sunat/formulario-virtual-709-declaracion-renta`,
  `uy/dgi/inscripcion-actualizacion-empresas-formulario-0351`), BRS's own CR1
  template remains the authoritative field-by-field specification of what a
  company registration requires, even though applicants rarely fill in this
  literal document by hand any more. This is disclosed, not treated as
  disqualifying.

### Source 4 — the Business Registration Service itself

- Web search confirms BRS is a **State Corporation** established under the
  **Business Registration Service Act, 2015** (Cap 499B), operating under the
  **Office of the Attorney-General and Department of Justice**, consolidating
  functions previously fragmented across the old Companies Registry,
  Registrar of Business Names, etc. `authority.name` is set to "Business
  Registration Service" (abbreviation "BRS"), matching brs.go.ke's own
  self-description; the Attorney-General/DOJ affiliation is noted in this
  file rather than in `authority` itself, since BRS (not the AG's office) is
  the form-publishing body.

## Field inventory and scoping/disclosure decisions

CR1 (docx) has five parts. This v1.0.0 models all five (Parts I–V); the
"For official use only" / "Companies registry — Checked by" block at the end
is registrar-internal and explicitly out of scope, per the task brief.

1. **`companyType` (Part I, item 2) is the single field resolving both the
   private/public and shares/guarantee/unlimited distinctions**, per the
   docx's four mark-one-of-four options described above:
   `public_company_limited_by_shares`, `private_company_limited_by_shares`,
   `company_limited_by_guarantee`, `private_unlimited_company`. Part III
   (Statement of Capital/initial shareholding) is gated `requiredWhen
   companyType in [public_company_limited_by_shares,
   private_company_limited_by_shares]`, matching the source's own instruction
   ("Please complete this part if the company has a share capital. If the
   company does not have a share capital, please go to part IV below.");
   Part IV (Statement of Guarantee) is gated `requiredWhen companyType equals
   company_limited_by_guarantee`, matching its own instruction ("Please
   complete this part if the company is limited by guarantee"). A
   `private_unlimited_company` is left ungated by either Part III or Part IV
   — Kenyan private unlimited companies can be registered with or without
   share capital and the source form does not spell out which of Parts
   III/IV such a company completes, so this schema does not force either —
   a disclosed edge-case looseness rather than a guess.
2. **`registeredOfficeCounty`'s enum is Kenya's 47 counties** (Constitution
   of Kenya, 2010, First Schedule) — a well-known, independently-verifiable
   closed list added by this schema for validation value, since the source
   form itself leaves a plain blank rather than printing the county list
   (the same convention `uy/dgi`'s `domicilioFiscalDepartamento` used for
   Uruguay's 19 departments).
3. **Officer/director table bounded to a cap of 2 slots
   (`officer1*`/`officer2*`).** Both source editions agree the *printed* base
   form itself has exactly **one** row/slot: the docx's own instruction reads
   "Compete [sic] a separate sheet for each director, secretary (if
   applicable) or authorised signatory," and the 2016 PDF specimen's officer
   table likewise shows only a single numbered "1" row with a footnote to add
   further rows by continuation sheet. This schema's second slot
   (`officer2*`) is a disclosed schema-authoring convenience — following this
   registry's established bounded-repeating-group convention (e.g.
   `no/brreg`'s 2–3-row board tables, `uy/dgi`'s owner-plus-second-person
   pair) — not a second row actually printed on the base form. All of
   `officer2*`'s fields are optional; only `officer1*` carries `required:
   true` (or `requiredWhen`, for the passport sub-fields).
4. **`officer1Role`/`officer2Role` collapse the source's own multi-role
   footnote ("state whether the person is a director, secretary and/or
   authorised signatory") into a 5-value best-effort enum** — GovSchema v0.3
   fields are flat/scalar with no multi-select primitive, so
   `director`/`secretary`/`authorised_signatory`/`director_and_secretary`/
   `director_secretary_and_authorised_signatory` covers the realistic
   combinations without a full role-flags cross-product. Per the docx's own
   footnote 3, a private company only needs a secretary once its paid-up
   capital reaches KES 5,000,000; this schema does not gate the
   secretary-related enum values on paid-up capital — disclosed rather than
   modelled with a fabricated `requiredWhen`.
5. **`officer1IdentityDocumentType`/`officer2IdentityDocumentType` are
   fields this schema adds, not fields literally printed on the source.**
   The source has one blank labelled "Identity cord [sic] or passport
   number" with a footnote ("If a passport number is provided, please also
   indicate the issuing country and place and date of issue of the
   passport") but no separate document-type selector. This schema adds the
   discriminator so `officer{N}PassportIssuingCountry`/`...Place`/`...Date`
   can be cleanly gated with `requiredWhen … equals "passport"` rather than
   inferring document type from the number's format (which would be
   guesswork) or fabricating a `requiredWhen: notEquals ""` against an
   optional field (the known-buggy pattern this registry has already
   documented and this cycle deliberately avoids).
6. **Share-class table (Part III, item 8) bounded to a cap of 2 slots
   (`shareClass1*`/`shareClass2*`), plus one `totalNumberOfSharesAllClasses`/
   `totalAggregateNominalValueAllClassesKes` pair for the table's own
   "TOTALS" row.** The docx's table prints **3** blank data rows before the
   TOTALS row; this schema caps at 2, disclosed, since most companies
   registering at incorporation have only one class of shares ("ordinary"),
   occasionally two.
7. **Statement of initial shareholding (Part III, item 9) bounded to a cap
   of 2 subscriber slots (`subscriber1*`/`subscriber2*`).** The docx prints
   a genuinely numbered **10-row** table (rows literally labelled "1." through
   "10."); this schema caps at 2 for conciseness, disclosed, following the
   same bounded-repeating-group convention as the officer table above. A
   company with more than 2 initial subscribers is not fully representable
   by this v1.0.0 — a real limitation, not silently glossed over.
8. **Statement of Guarantee (Part IV) bounded to a cap of 2 slots
   (`guarantor1*`/`guarantor2*`).** The docx prints a numbered **4-row**
   table; this schema caps at 2, disclosed, for the same reason as above.
9. **"Rights attached to each class of shares" (Part III, item 9 in the
   docx's own numbering — confusingly the same numeral used twice, once for
   the shareholding statement and once here; this schema's field names
   disambiguate by content) is modelled as four free-text description
   fields** (`votingRightsDescription`, `dividendRightsDescription`,
   `capitalReturnRightsDescription`, `redemptionTermsDescription`) mirroring
   the source's own four row labels (voting rights / dividend or
   distribution rights / right to participate in a return of capital /
   redemption terms), none marked obligatory by the source beyond the
   general "set out below particulars" instruction.
10. **`lodgedByAddress` and `lodgedByCapacity` are synthesized from the older
    2016 PDF specimen, not the chosen-primary docx.** The docx's closing
    section reads only "Lodged on behalf of the company by:" followed by a
    single blank, immediately preceding the registrar-internal "OFFICIAL
    USE / Companies registry / Checked by: Name/Address/Signature/Capacity/
    Date" block (confirmed by inspecting the raw `word/document.xml` — these
    Name:/Address:/Signature:/Capacity:/Date: blanks belong to the "Checked
    by:" registrar block, not to the applicant's lodging statement, and are
    out of scope per the task brief's registrar-internal exclusion). The
    2016 PDF specimen has a fuller applicant-side closing section — "This
    application is lodged by: ______", "Address of the person lodging this
    application: ______", "(Subscriber/Agent) (Strike out whichever does not
    apply)" — which this schema draws on for `lodgedByAddress`/
    `lodgedByCapacity` specifically, a disclosed cross-source addition
    rather than a field literally printed on the docx. `lodgedByName` itself
    is sourced from the docx (required); the other two are optional.
11. **`holdingCompanyPin`/`acquisitionAmalgamationCompanyPin` use a KRA PIN
    format pattern** (`^[A-Z][0-9]{9}[A-Z]$` — one letter, nine digits, one
    letter), the standard Kenya Revenue Authority Personal Identification
    Number shape, independently well-known rather than itself printed on
    CR1.
12. **`documents[]` — the docx's own Part II instruction**: "attach the
    following documents for each [director/secretary/authorised signatory]:
    Copy of Kenyan national identification card or passport; Copy of PIN
    certificate issued by Kenya Revenue Authority (not applicable to persons
    who are not Kenyan residents); and Coloured passport-sized photograph."
    The 2016 PDF specimen's page-2 header independently corroborates the
    same three-document list ("Attach copies of national I.D, KRA-PIN and
    passport photograph"). All three are modelled as `required: true`
    top-level documents (this schema's flattened `officer1`/`officer2` model
    has no clean single boolean to gate a per-person nationality carve-out
    on); the KRA-PIN-certificate document's `handling` field discloses the
    "not applicable to non-Kenyan-resident persons" carve-out in prose
    rather than fabricating a `requiredWhen`, following this registry's
    established convention for a condition too narrow for this schema's
    flattened repeating-group model to gate cleanly (precedent:
    `vn/bca/to-khai-dang-ky-xe`'s `ownershipTransferChainDocuments`). The
    officers' consent statement ("I/We hereby consent to act as director/
    secretary of the company") is modelled as an `attestation`-category
    document, not a boolean field, per this registry's convention for
    verbatim consent statements.

## Test run (Phase 4)

No live submission was attempted — CR1 is filed as part of an eCitizen/BRS
online incorporation dossier, not a self-service API GovSchema can exercise.
Verification here is against the schema's own structural rules
(`tools/validate.mjs`, `tools/validate-ajv.mjs`) plus a hand-rolled,
from-scratch conformance-fixture check (not reused from any other schema's
checker) that explicitly exercises **both** `fields[]` and `documents[]`
requiredness — the latter is a known blind spot past conformance passes in
this registry have skipped.

Fixtures under `conformance/ke/brs/cr1-application-to-register-a-company/1.0.0/`:

| Fixture | Scenario | Expected | Actual |
|---|---|---|---|
| `private-company-limited-by-shares-single-director.json` | Valid: private company limited by shares, one officer (director+secretary), one share class, one subscriber, national-ID officer | 0 errors | 0 errors |
| `company-limited-by-guarantee-two-officers-passport-holder.json` | Valid: company limited by guarantee, two officers (one passport holder with issuing country/place/date filled), two guarantee members | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` | Drops `companyName` from the first valid fixture | 1 error (`MISSING_REQUIRED: companyName`) | 1 error |
| `mutation-control-email-pattern-violation.json` | Sets `contactEmailAddress` to `"not-an-email-address"` | 1 error (`PATTERN_VIOLATION`) | 1 error |
| `mutation-control-missing-conditional-passport-field.json` | Drops `officer1PassportIssuingCountry` while `officer1IdentityDocumentType` is `"passport"` | 1 error (`MISSING_REQUIRED`, conditional) | 1 error |
| `mutation-control-missing-required-document.json` | Removes the `officerPassportPhoto` entry from `documents[]` | 1 error (`MISSING_REQUIRED_DOCUMENT`) | 1 error |

All 6 fixtures matched their expectation exactly. Both registry validators
pass with 0 errors:

```
$ node tools/validate.mjs
377/377 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
377/377 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`) and now includes this document.

## What was NOT fully resolved (disclosed, not silently guessed)

- Kenya Law's own gazette PDF of Legal Notice 103 of 2017 could not be
  directly fetched (WAF 403 on both `curl` and `WebFetch`); the in-force
  determination rests on Kenya Law's indexed metadata plus independent
  secondary legal-practice sources, not a direct read of the gazette text
  itself.
- The private-unlimited-company path's interaction with Parts III/IV is not
  fully specified by the source form itself and is left ungated in this
  schema (see judgment call 1).
- Bounded-repeating-group caps (2 officers, 2 share classes, 2 subscribers,
  2 guarantee members) mean a company with more directors/subscribers/
  guarantee members than these caps cannot be fully represented by this
  v1.0.0 — a real, disclosed scope limit, not a defect.
