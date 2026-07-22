# Verification record — ge/napr/llc-founding-agreement-standard-statute@1.0.0

## Candidate selection

GOV-4246 ("GovSchema Standard Research", 2026-07-21) scouted Georgia's
National Agency of Public Registry (NAPR) Founding Agreement templates
alongside Ethiopia's Business Formation and Passport candidates while
deepening Ethiopia's Taxes vertical, found the NAPR LLC template a genuine,
unauthenticated, real field-level candidate, but authored Ethiopia's TIN
registration form instead that cycle and left Georgia as disclosed backlog
(see this registry's own CATALOG.md "Known Gaps & Opportunities" section,
entry 0c, "Georgia Business Formation"). This cycle (GOV-4255) picked it up
and authored it. Georgia already had one published schema
(`ge/mfa/evisa-application`, GOV-3321); this opens its Business Formation
vertical, bringing it to 2 of 6.

## Reaching the live source

Fetched `https://napr.gov.ge/en/page/sample-documents/business-registration`
directly with a standard desktop Chrome User-Agent string:

- HTTP 200, `Content-Type: text/html; charset=utf-8`, 107,326 bytes.
- No login, CAPTCHA, or WAF gate blocks reaching or reading this page.

The page is a client-rendered document-library listing under
`/uploads/Business registration/21/`. It links 19 distinct `.docx`
templates, each carrying its own descriptive `aria-label`
(`"Download file: <label> - docx file"`) rather than a filename that names
the template — the hash-named files themselves (e.g.
`618e68ad75f32513541e3ae9768d9c870245ae7f.docx`) give no clue to their
content without reading the surrounding markup. Labels found (verbatim):

- NNLE – Founding Agreement (Initial Registration)
- NNLE – Founding Agreement / Statute – Corporately Organized (Amended Registration)
- NNLE – Founding Agreement / Statute – Membership-Based (Amended Registration)
- NNLE – Founding Agreement / Statute – Membership-Based (Initial Registration)
- NNLE – Founding Agreement – (Registration of Amendments)
- NNLE – Founding Agreement / Statute – Corporately Organized (Initial Registration)
- **LLC – Founding Agreement under the Standard Statute** ← this schema
- LLC – Founding Agreement under the Standard Statute (Without Capital)
- LLC – Founding Agreement with an Individual Statute
- Branch – Founding Agreement
- General Partnership – Founding Agreement under the Standard Statute
- General Partnership – Founding Agreement with an Individual Statute
- (plus further NNLE/other-entity variants not relevant here)

The entry chosen is the only LLC template with no "(Amended Registration)"
or "(Registration of Amendments)" suffix — i.e. the base initial-registration
variant, matching the CATALOG.md backlog entry's own description ("a
downloadable 'Founding Agreement' `.docx` template for LLC registration").

Fetched the file itself directly:

- `https://napr.gov.ge/uploads/Business%20registration/21/618e68ad75f32513541e3ae9768d9c870245ae7f.docx`
- HTTP 200, 36,094 bytes, sha256
  `d08a2587699c707e191cdec45713e1e0e5f35133db6e9a3650a2e54a75cb74d3`.
- Zip local-file-header magic `50 4b 03 04` confirmed at byte 0 — a genuine
  Office Open XML `.docx`, **not** the legacy OLE2 binary `.doc` format
  (magic `d0 cf 11 e0 a1 b1 1a e1`) that Ethiopia's own Investment Permit
  Application form (`investethiopia.gov.et`, a sibling candidate this same
  GOV-4246 cycle banked but did not author) turned out to use — confirmed by
  directly inspecting that file's own header bytes this cycle before
  choosing between the two. The OLE2 format has no straightforward zip/XML
  extraction path with this session's tooling (no `antiword`/`catdoc`/
  `python-docx`/`word-extractor` package available), which was one factor
  favoring this Georgia candidate over the Ethiopia one this cycle.
- `docProps/core.xml`: `dc:creator` "Rusudani", `cp:lastModifiedBy`
  "Author", `cp:revision` "252" (a long-maintained template),
  `dcterms:created` 2021-12-14T08:52:00Z, `dcterms:modified`
  2026-05-06T09:55:00Z — recent, confirming this is the current revision,
  not a stale archival copy.
- `docProps/app.xml`: `Pages` 3, `Words` 1155, `Characters` 6585.

## Extraction method

No `unzip`, Python `zipfile`, or `adm-zip`-equivalent package was available
in this session's environment. Wrote a small (~40-line) Node.js script that
walks the zip's own End-Of-Central-Directory record and Central Directory
entries directly, locates each entry's local-file-header data offset, and
inflates it with `zlib.inflateRawSync` (the same registry-established
zlib-based extraction technique previously used for gated PDF sources,
applied here to a zip container instead) — no third-party dependency
needed. Used this to pull `word/document.xml`, `word/footnotes.xml`,
`word/endnotes.xml`, `docProps/core.xml`, and `docProps/app.xml` out of the
`.docx` directly.

Two independent passes were run over `word/document.xml`:

1. A plain paragraph/run walk (`<w:p>`/`<w:t>` tokens in document order),
   producing a flattened, human-readable rendering of the whole document's
   text — used to read all prose fields, section headers, and asterisk
   ("mandatory") annotations.
2. A second, cell-aware walk (`<w:tbl>`/`<w:tr>`/`<w:tc>`/`<w:p>`/`<w:t>`
   tokens, tracking table/row/cell boundaries explicitly) — run specifically
   because the first pass alone flattens both partner tables' cells into
   ambiguous run-on text with no visible row/column boundaries. This second
   pass confirmed: **exactly two tables**, each with one header row (columns
   "Partner(s) *" / "Amount of share *" / "Share participation of partners
   in the issued capital *") and **exactly three pre-numbered data rows**
   (1, 2, 3) — no continuation note or "attach an additional page for more
   partners" instruction was found anywhere in the extracted text, unlike
   `mn/gasr/state-registration-limited-liability-company`'s UB-03 form,
   which explicitly instructs attaching a same-format page for a sixth
   founder onward.

Also confirmed directly: this document contains **no** `<w:sdt>`
content-control elements, **no** OOXML checkbox form fields, and **no**
`w:sym`/Wingdings glyph runs anywhere. Every conditional on this form
(capital fields marked "if applicable", the second partners table gated on
"In case of placement of issued shares...") is prose-only — this is a plain
print-and-fill template, with field requiredness derived entirely from the
form's own stated convention ("* - Fields marked with a symbol are
mandatory") and surrounding prose, the same read-the-cells approach this
registry uses for other non-fillable sources.

`word/footnotes.xml` and `word/endnotes.xml` are both present in the
package but contain no footnote/endnote text (empty `<w:t>` content),
confirmed by direct extraction — no hidden caveats were dropped by not
surfacing them.

The document contains **no Georgian-script characters** at all (checked
directly against the Georgian Unicode block, U+10A0–U+10FF) — this
particular template is a fully English-language administrative form,
despite the page's own informational banner elsewhere on the site noting
"the indicated information is accessible in the Georgian language" (which
evidently refers to other templates on the same page, not this one).

## Disclosed source-fidelity findings

1. **No printed partner-count field.** Neither partners table prints an
   explicit "number of partners" field the way `mn/gasr`'s UB-03 form does
   (its own §5.1 "Number of founders"). Rather than inventing a
   non-printed count discriminator, `partner1*`/`redistributionPartner1*`
   are modelled required (a founding agreement always names at least one
   partner) and `partner2*`/`partner3*`/`redistributionPartner2*`/
   `redistributionPartner3*` are modelled `required: false` with no
   `requiredWhen` gate — the same bare-optional convention
   `lv/ur/sole-trader-registration-kr2` uses for its own unlabelled second
   signature block, rather than guessing an unstated trigger.
2. **Combined "identification data" cell, not split columns.** The
   "Partner(s) *" column is printed as a single table cell whose
   instructions read, verbatim, "For a natural person – name, surname,
   personal identification number, residential address; For a legal
   entity – firm name, identification code, legal address (hereinafter:
   identification data)". The template's own parenthetical names this
   combined concept "identification data", so each partner is modelled as
   one free-text `partnerNIdentificationData` field rather than split into
   separate name/ID/address sub-fields the way `mn/gasr`'s UB-03 table
   (which prints those as genuinely separate columns) is modelled.
3. **A second, distinct "issued shares" prompt pair.** The template prints
   a second "Number of issued shares ... (if applicable)" / "Nominal value
   of issued shares (if applicable)" pair immediately after the
   "Authorized number of shares" / "Nominal value of authorized shares"
   fields and immediately before the redistribution table. Read as the
   post-placement issued-share count/value resulting from placing some of
   the authorized shares, and modelled as distinct fields
   (`issuedSharesAfterPlacementCount`,
   `nominalValueOfIssuedShareAfterPlacementGel`) from the
   initial-registration `numberOfIssuedShares`/`nominalValueOfIssuedShareGel`
   fields earlier in the document, since the template repeats the same two
   prompts in two structurally distinct places rather than referring back
   to the first pair.
4. **Redistribution table is bare-optional, not synthetically gated.** The
   redistribution table's own intro sentence — "In case of placement of
   issued shares, redistribution of partners' shares and percentage
   participation in the capital:" — is conditional prose with no printed
   checkbox. Modelled the same bare-optional way as the authorized/
   post-placement share fields immediately preceding it (no synthetic
   boolean discriminator invented), consistent with finding 1's reasoning.
5. **Governing-body name is unmarked; members are mandatory, bounded to
   three.** "Governing Body ...." (the body's own name/title, e.g.
   Director, Directorate, Board of Directors) is printed with no asterisk
   and is modelled `required: false`, while the immediately following
   "* Member(s) of the governing body" is asterisked and modelled with
   `governingBodyMember1` required and `governingBodyMember2`/
   `governingBodyMember3` optional — the template prints exactly three
   dotted blank lines for this item, no fourth.
6. **Authorized-person block is two independently-asterisked items, not
   one.** "Person authorized for management and representation" and the
   following "Email address and telephone number of the person authorized
   for management and representation" are each independently asterisked as
   their own mandatory items — modelled as three required fields
   (`personAuthorizedForManagementAndRepresentationName`,
   `authorizedPersonEmail`, `authorizedPersonPhone`) rather than one
   combined field. The printed "+ 995 5" phone-number prefix hint (Georgia's
   country code plus a mobile-operator leading digit) is documented in
   `authorizedPersonPhone`'s description rather than encoded as a
   validation pattern, since the template itself specifies no full format.

This schema also excludes the template's own fixed "Charter" clause — a
statement that the standard, Minister-of-Justice-approved statute applies
(definitional to this specific template variant, distinguishing it from
the sibling "Individual Statute" template) — since it is not
applicant-supplied data.

## Conformance

3 valid mock scenarios — a single-partner LLC with only the mandatory
fields and no authorized-share/redistribution/optional-representative
content (`valid-single-partner-minimal.json`); a three-partner LLC with
authorized capital, a subsequent placement of issued shares, and a full
three-row redistribution table (`valid-three-partners-with-placement.json`);
and a two-partner LLC with a general commercial representative and a
partner's-share manager both filled in
(`valid-with-optional-representatives.json`) — plus 12 mutation-control
fixtures (a missing-required fixture for each of this schema's 10
statically-required fields, an invalid-type fixture for
`numberOfIssuedShares` given as a string instead of an integer, and an
unknown top-level field) are committed under
`conformance/ge/napr/llc-founding-agreement-standard-statute/1.0.0/`.

An ephemeral, from-scratch mock validator (deriving required rules
directly from this schema's own `fields[]`, not committed) ran all 15
fixtures: all 3 valid scenarios at 0 errors, all 12 mutation controls each
raising exactly 1 error, and confirmed this document has no `requiredWhen`
references at all (0 dangling references — every conditional field here is
bare-optional per findings 1 and 4 above).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass for
the full registry, individually and as part of the full run.

## Scope boundaries

This document models the applicant-facing data fields of NAPR's LLC
Founding Agreement under the Standard Statute: the firm's Georgian- and
English-language names, its registered legal address, authorized/issued
share capital, up to three initial partners and their share participation,
an optional later placement of authorized shares with the resulting
redistribution (again up to three partners), the governing body's name and
up to three members with their representative-authority scope, the person
authorized for management and representation with their contact details,
an optional general commercial representative/procurator and an optional
partner's-share manager, and up to three signature blocks plus a single
execution date. It excludes the template's own fixed "Charter" clause and
does not fabricate a fourth partner/member/signatory slot beyond the three
the template itself prints, since the source includes no continuation
instruction for additional rows. Filing this agreement is a founder/
notary-or-authorized-representative action performed with NAPR (in person,
by post, or via NAPR's own e-services); this schema does not file the
agreement itself, and the live source is always authoritative. GovSchema is
independent and is not affiliated with, endorsed by, or operated by
Georgia or its National Agency of Public Registry.
