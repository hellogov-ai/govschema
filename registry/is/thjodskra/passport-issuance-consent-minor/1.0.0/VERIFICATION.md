# Verification record — `is/thjodskra/passport-issuance-consent-minor` v1.0.0

## Candidate selection

This session's brief (GOV-2226, "GovSchema Standard Research") re-scanned
CATALOG.md's "Known Gaps & Opportunities" fresh. Iceland stood at 4 of 6
verticals (Business Formation, Taxes, Visa, DMV); Passport and National ID
remained open. A prior cycle (GOV-2219, 2026-07-10) had already scouted both
remaining gaps and left a named, well-sourced candidate for Passport:
Þjóðskrá's Form V-901, "found on the skra.is forms index, 21 fields" — but
left it unauthored. That candidate was re-screened fresh this session rather
than assumed still valid (the URL, byte size, and hash were all
independently re-confirmed; see "Source" below), and authored here.

Iceland's actual passport *application* process is confirmed (GOV-2084,
GOV-2219) to be in-person and biometric via island.is pre-registration, with
no downloadable field-by-field form — that finding is unchanged and this
document does not contradict it. V-901 is a distinct, narrower, genuine
standalone paper form embedded within that process: a custodian-consent
document used when a child's custodian(s) cannot jointly attend in person,
confirmed by the server's own `Content-Disposition` filename (see below),
not just the form's printed title.

## Source

- **Primary:** `https://www.skra.is/lisalib/getfile.aspx?itemid=d7b8075a-8643-11e6-943e-005056851dd2`
  — reached via skra.is's own forms index
  (`skra.is/umsoknir/eydublod-umsoknir-og-vottord/`), item "V-901 — Umsókn —
  Útgáfa vegabréfs - undir 18 ára" ("Issuance of passport - under 18
  years"). Fetched fresh this session with a browser User-Agent (`curl -A
  "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **193,261 bytes**, SHA-256
  `cb4fefe4faa842cb3402b5acc81d8b361b38225a5f7831c87c5a26679baaed60`.
  `Last-Modified: Tue, 18 Apr 2023 15:17:38 GMT` per the server's own
  response header — the specimen is ~3 years old but still directly listed
  and served from the authority's own current, unauthenticated forms index,
  the same "still on the live index" currency signal this registry's
  `is/skatturinn/simplified-individual-tax-return` record used.
  `Content-Disposition: inline; filename="V-901-samthykki forsjarmanna
  vegna utgafu vegabrefs undir 18 ara.pdf"` — the server's own internal
  filename translates to "V-901-consent of custodians regarding issuance of
  passport under 18 years," independently corroborating the document's true
  subject (custodian consent) beyond just its printed on-page title. No
  login, CAPTCHA, or WAF/bot-mitigation challenge was encountered.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/is/thjodskra/passport-issuance-consent-minor/1.0.0`
re-fetched the cited URLs a second time immediately before finalizing this
record: 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
No entry was added to `tools/verify-sources-allowlist.json` — this domain
needs none.

## Extraction method

Confirmed programmatically with `pdfjs-dist` (`legacy/build/pdf.js`, Node
CommonJS) before any field cataloguing began:

- `doc.numPages` → **1** (a genuinely single-page form).
- `page.getAnnotations()` → exactly **21 Widget annotations**, all
  `fieldType: "Tx"` (plain text fields) — **no checkbox or radio widgets at
  all** on this specimen, despite the printed page visibly containing a
  two-option checkbox choice (see the structural finding below). This
  matches the prior GOV-2219-cycle scouting note's own field-count claim
  ("21 fields") exactly.

Every widget's field name, type, and rect was dumped, then cross-walked to
its printed label using a position-aware (x/y proximity) script:
`page.getTextContent()` items were sorted by descending y then ascending x
and paired against each widget's rectangle by visual column/row alignment —
the same technique this registry's `is/samgongustofa`, `is/utl`,
`at/bmeia`, and `se/migrationsverket` schemas describe using, rather than
eyeballing the rendered page alone. (A headless-Chromium visual render was
also attempted per this registry's usual secondary-confirmation practice,
but the available `chrome-linux64` build's headless PDF viewer produced only
a blank screenshot in this environment — a tooling limitation, not a source
concern; the position-aware text-layer cross-walk alone was sufficient here
since every field sits on an unambiguous single printed label line, unlike
`is/samgongustofa`'s multi-checkbox grid, which needed the extra visual
pass to resolve.)

## One non-obvious structural finding

**A printed two-option checkbox choice has no backing AcroForm widget at
all.** The printed declaration "Hér með staðfestist að upplýsingar sem hér
eru gefnar um forsjá barns eru réttar og að útgáfa vegabréfs er samþykkt"
("It is hereby confirmed that the information given here about the child's
custody is correct and that issuance of the passport is approved.") is
immediately followed by two options — "☐ Barnið hefur tvo forsjáraðila*"
("The child has two custodians") and "☐ Barnið hefur einn forsjáraðila"
("The child has one custodian") — but `page.getTextContent()` renders both
"☐" glyphs as ordinary static text content, and neither has a corresponding
entry in `page.getAnnotations()`'s 21-widget list. This is confirmed as a
genuine upstream authoring gap (the PDF's own form fields simply do not
cover this choice at all, unlike `is/samgongustofa`'s prior finding of
unnamed-but-present widgets), not an extraction artifact. Since this choice
is substantively required to complete the form correctly (it governs
whether a second custodian's block is expected to be filled at all) and
this registry's charter is to model the government *process*'s fields for
agent consumption, not merely whatever a specific PDF's AcroForm happens to
expose, it is modelled as `custodyType`, an `enum` field with no
`sourceRef` widget name to cite (disclosed as such in the field's own
`sourceRef`, which cites the printed checkbox line instead of a widget
name).

A second, smaller ambiguity: the widget literally named `"Forsjáraðilar"`
in the source PDF's own AcroForm sits at the same y-band as that word's
printed section-header text, rather than beside a data-entry label of its
own (unlike every other field on this form, which sits directly beside a
printed field-specific label such as "Nafn:" or "Kennitala:"). It is
modelled as `custodyArrangementNote`, an optional free-text field, with the
ambiguity disclosed directly in the field's own `description` rather than
guessed at confidently.

## Field reconciliation (21 widgets + 1 semantic-only field → 22 schema fields)

- **Child (3 fields, 3 widgets):** `childFullName` ("Fullt nafn barns"),
  `childNationalId` ("Kennitala"), `childLegalResidence` ("Lögheimili").
- **Custody declaration (2 fields, 1 widget + 1 semantic-only field):**
  `custodyArrangementNote` (the ambiguous `"Forsjáraðilar"` widget, see
  finding above), `custodyType` (the unnamed two-option checkbox choice,
  see finding above — no widget).
- **Custodian 1 (6 fields, 6 widgets):** `custodian1DateAndPlace`
  ("Dagsetning og staður"), `custodian1Name` ("Nafn"),
  `custodian1NationalId` ("Kennitala"), `custodian1Phone` ("Símanúmer"),
  `custodian1Address` ("Lögheimili"), `custodian1Email` ("Netfang") — the
  left/first-printed column of the two side-by-side custodian blocks.
- **Custodian 2 (6 fields, 6 widgets):** the mirrored right/second-printed
  column (`_2`-suffixed widget names), each `requiredWhen custodyType
  equals two_custodians`.
- **Witnesses (5 fields, 5 widgets):** `witnessDateAndPlace` (shared,
  single field for both witnesses — unlike the custodian blocks, this date/
  place line is not duplicated per witness), `witness1Name`/`witness2Name`
  ("Nafn", left/right columns), `witness1NationalId`/`witness2NationalId`
  ("Kennitala", left/right columns).

**22 fields modelled: 21 backed 1:1 by an AcroForm widget, plus 1
(`custodyType`) modelled as a semantic-only field with no backing widget**
(see the structural finding above).

## Scope decisions and judgment calls

- **Custodian 1's six fields (date/place, name, kennitala, phone, address,
  email) are all `required: true`.** None carries an explicit "(valkvætt)"/
  optional annotation the way `is/samgongustofa`'s `salePrice` does, and
  they sit in the form's primary declaration block — the same
  no-explicit-optionality-marker-means-required convention this registry's
  `is/samgongustofa` VERIFICATION.md already establishes for this
  jurisdiction's forms.
- **Custodian 2's six fields are gated `requiredWhen custodyType equals
  two_custodians`, not statically required.** The form's own printed
  structure makes clear a second custodian block only applies when
  `custodyType` is `two_custodians`; when the child has only one custodian,
  the second column is inapplicable, matching the spec's `requiredWhen`
  mechanism (GSP-0013 §2) rather than a fabricated always-required field.
- **Witness fields are left `required: false` with no `requiredWhen`
  condition, not gated against a synthetic boolean.** The form's own
  printed applicability note ("aðeins ef annar forsjáraðilinn er
  fjarverandi myndatökuna" — "only if one of the custodians is absent
  during the photo-taking") describes a real-world fact about a specific
  appointment (attendance at the child's passport photograph session) that
  is distinct from `custodyType` (which only states how many custodians
  the child has) and has no dedicated field or checkbox of its own
  anywhere on the form to gate against. Per this registry's established
  practice (`is/samgongustofa`'s co-owner/second-party fields, `ar/dnrpa`'s
  co-buyer/co-seller blocks) of not inventing a fabricated gating field
  where the source provides none, this conditional applicability is stated
  in each witness field's own `description` instead of encoded as
  `requiredWhen`.
- **Kennitala fields share the registry's standard pattern**
  (`^[0-9]{6}-?[0-9]{4}$`), matching every other `is/*` schema's kennitala
  fields.
- **Email fields use the same RFC-shaped `pattern`** already established in
  this registry (e.g. `mx/inm/forma-migratoria-multiple-electronica`),
  reused here rather than inventing a new one.
- **`witnessDateAndPlace` is one shared field, not two.** Unlike the
  custodian blocks (each of which repeats "Dagsetning og staður" once per
  column), the witnesses section prints this label only once, and its
  matching widget's rect spans the section's full width rather than being
  split into two half-width columns — confirmed via the position-aware
  text/widget cross-walk, not assumed by symmetry with the custodian
  blocks.
- **Out of scope:** every wet-ink signature line ("Undirskrift," appearing
  four times — once per custodian, once per witness), the printed
  declaration/attestation sentences themselves (fixed prose the signature
  satisfies, not fillable fields), the introductory explanatory paragraph
  (criminal-liability warning under Act No. 136/1998 on Passports, and the
  note that only one custodian need attend to collect a completed
  passport), and the final "Undirritun starfsmanns embættis og stimpill"
  (office employee's signature and stamp) block — all Þjóðskrá's own
  printed guidance or staff-executed content, not applicant-authored data,
  consistent with this registry's established practice.

## Mock conformance test

A standalone Node script (`conformance.mjs`, not committed — ad hoc
verification harness matching this registry's usual practice) evaluates
required/`requiredWhen` presence, `enum` membership, and `pattern`/
`minLength`/`maxLength` bounds.

- **Valid mock 1** — the simplest real-world case: `custodyType:
  "one_custodian"`, only custodian 1's block filled, no witnesses. **0
  errors.**
- **Valid mock 2** — the maximal case: `custodyType: "two_custodians"`,
  both custodian blocks filled (one in Reykjavík, one in Akureyri),
  `custodyArrangementNote` populated, and both witnesses filled (the
  custodian-absent-from-photo-appointment scenario). **0 errors.**
- **Negative control 1** — mock 2 with `custodian2Name`/
  `custodian2NationalId` removed while `custodyType` remains
  `"two_custodians"`. **Fails** with both flagged missing, confirming the
  `requiredWhen` conditional-required mechanism fires correctly.
- **Negative control 2** — mock 1 with `childNationalId` set to a
  non-kennitala string and `custodyType` set to an out-of-enum value
  (`"three_custodians"`). **Fails** with both flagged (`childNationalId`:
  pattern mismatch; `custodyType`: not in enum), as expected.

## Tooling run

- `node tools/validate.mjs registry/is/thjodskra/passport-issuance-consent-minor/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/is/thjodskra/passport-issuance-consent-minor/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/is/thjodskra/passport-issuance-consent-minor/1.0.0` → 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this is a from-scratch opening of Iceland's
Passport vertical with one non-obvious structural finding (a printed
two-option choice with no backing AcroForm widget at all) and one smaller
field-naming ambiguity (`custodyArrangementNote`). Re-check the cited PDF
URL and hash, confirm no newer specimen has replaced it on skra.is's forms
index, and re-attempt a visual render of the source (this session's
headless-Chromium attempt did not succeed — see "Extraction method" above)
to further corroborate the two disclosed judgment calls, on or before that
date and on any `source.url` change.
