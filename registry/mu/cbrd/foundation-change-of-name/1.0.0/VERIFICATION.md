# Verification record — mu/cbrd/foundation-change-of-name@1.0.0

## Candidate selection

GOV-5069 ("GovSchema Standard Research"). Fresh re-scan of `CATALOG.md`'s
Executive Summary found the two most-recently-authored CBRD schemas
(GOV-4988's LP1 name-reservation, GOV-4995's LLP3 name-reservation) both
disclosing the same remaining backlog: the Annual Return (LP3), the
Foundation change-of-name form, the reappeared-but-unverified
consent-of-manager candidate, and the confirmed-dead
`NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`.

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`) fresh and
independently re-verified all four items live via direct `curl`:
`Annual-Return_LP3.pdf` (HTTP 200, 51,203 bytes),
`APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf` (HTTP 200, 63,218
bytes), `CONSENT-OF-MANAGER-_LLP2.pdf` (HTTP 404, confirmed still dead),
and `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` (HTTP 404, confirmed still
dead).

**The Foundation change-of-name form** was picked over the Annual
Return (LP3) per this registry's "one deliverable per PR" convention.
Both were extracted and compared before choosing: the Annual Return's
three partner tables (General Partners, Former General Partners,
Limited Partners) are each a single **undivided, unruled** box per
column with no internal row lines at all (confirmed via canvas render —
a genuine structural difference from the already-authored LP2
registration form's own 7 explicit ruled lines per partner list), so
the form itself prints no fixed slot count to bind this registry's
standing bounded-slot convention to. Fabricating a slot count (e.g.
matching LP2's own 7) would not be source-faithful. The Foundation
change-of-name form, by contrast, is a clean, fully-bounded single-page
form with no such ambiguity, so it was authored this cycle; the Annual
Return remains banked, open backlog for a future cycle pending a
scoping decision on how to model its unruled partner tables (candidate
approaches: a single free-text field per table, or an aggregate field
per column matching the Foundation-registration schema's own
`founderNameAndAddress`-style single-undivided-box precedent).

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/11/APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`

- Independently re-fetched via plain unauthenticated `curl` — no
  session/cookie state, no CAPTCHA/WAF challenge, the same
  unauthenticated hosting pattern as every other CBRD form this
  registry has already modelled.
- HTTP 200, **63,218 bytes**.
- sha256 of the retrieved bytes:
  `99a66677ba6707fc1f26953512b6b99c377478186ebabd7052c7bd90afeca281`.
- `pdfjs-dist`'s `numPages` reports **1 page**, despite the document's
  own footer printing "Page 1 of 2" (see Structural findings below).
- `getTextContent()` returned 70 positioned text items — a genuine text
  layer, with every printed label, instruction, and dotted-line-leader
  caption recovered cleanly (no AcroForm annotations, same as every
  sibling CBRD schema). Verified the file is not a truncated/corrupted
  download: the PDF's own trailer/`%%EOF`/xref structure is well-formed
  and closes cleanly.
- A supplementary canvas render (`node-canvas`, 2.5x scale, cropped to
  three regions: the Secretary/date declaration block, the enclosure
  instruction area, and the header/Foundation-No area) independently
  confirmed box layout. As on every prior CBRD render, glyph rendering
  failed via a Helvetica path-resolution warning (the known
  `node-canvas` font-substitution gap documented in this registry's
  `gov-form-pdf-extraction` practice note) — used for box/layout
  confirmation only, not text confirmation.

### Authority attribution

The form's own header ("FOUNDATION ACT", "(Section 21(1)(a))") and its
hosting directly on the Corporate and Business Registration
Department's own domain (`companies.govmu.org/cbrd/`, the same
authority already attributed on every other CBRD schema in this
registry) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD). No distinct alphanumeric
form code (e.g. LP1's "S16.F LP1") is printed anywhere on the page —
consistent with this registry's already-authored
`foundation-registration` sibling, which likewise prints no form code;
Foundations Act 2012 forms appear not to use the Partnerships Acts'
"S.../F" numbering convention.

## Structural findings

1. **The document's own footer claims "Page 1 of 2", but the served
   PDF is genuinely one page.** Confirmed three independent ways: (a)
   `pdfjs-dist`'s `numPages` reports 1; (b) a raw byte scan found
   exactly one `/Type/Page` object; (c) the file's trailer/xref/`%%EOF`
   structure is well-formed and complete, ruling out a truncated
   download. All of the form's own content — application details,
   enclosure list, Secretary declaration, and the Department's
   "(For Office Use)" footer — reads as complete and self-contained on
   this single page. Treated as a leftover print-template artifact
   (the same class of defect as the LP1/LLP3 siblings' own orphaned
   "Tick where appropriate" instruction), not as evidence of missing
   content.

2. **"*Tick where applicable" is an orphaned instruction with no
   adjacent checkbox anywhere on the page.** The canvas render was
   cropped across the full page (header, name-entry boxes, enclosure
   area, and declaration block) and no checkbox, box, or other
   markable control was found anywhere. Not modelled as a field.

3. **An unlabelled blank rectangle box sits beside the declaration
   date's comb boxes, with no adjacent caption.** The date entry itself
   is a set of three two-digit comb-box pairs (day/month/year) captioned
   "(DD/MM/YYYY)"; immediately to their right, a separate undivided
   rectangular box is printed with no caption or nearby label
   distinguishing its purpose, and it sits outside the bordered
   "(For Office Use)" column (confirmed via the canvas render and by
   cross-referencing every extracted text item's x-position against the
   box's own pixel bounds). Left unmodelled as an orphaned widget.

4. **Likely recurrence of this registry's own "director"-boilerplate
   defect, applied to a Foundation.** The enclosure instruction reads
   "If there is more than one director, please attach a separate sheet
   or sheets with the consent and certificate of the additional
   director or directors set out in the prescribed format." The
   Foundations Act 2012 defines a Foundation's governing body as its
   Council (with a Secretary) — not "directors", a company-law term
   this registry has already flagged as leftover boilerplate on other
   CBRD partnership forms (e.g. the LLP6 change-of-partner schema's own
   disclosed "director"-for-"partner" finding). Modelled per the form's
   own printed wording (via the document entry's `statement` field)
   rather than corrected, consistent with this registry's standing
   practice of transcribing the source as printed; the finding is
   disclosed here rather than silently normalized.

5. **Present/Proposed name entry boxes each span two printed comb-box
   rows.** Confirmed via canvas render: both the "Present name of
   Foundation" and "Proposed name of Foundation" items print two rows
   of ~35 boxes each (accommodating a longer name), not one — modelled
   as a single string field per item, matching the source's own single
   logical entry, the same convention as every other multi-line CBRD
   entry box in this registry (e.g. the LP5 sibling's own
   `presentedByName`/`presentedByAddress` two-line entries).

## Requiredness and scoping decisions

- `foundationNo`: required — the Department needs the existing
  Foundation's own number to identify the record being renamed. Printed
  in the main applicant-facing content area (below the header's own
  "FOR OFFICE USE" box), not inside any Department-internal region, so
  modelled as applicant-supplied.
- `presentNameOfFoundation`, `proposedNameOfFoundation`: required — a
  change-of-name application is meaningless without both the existing
  and the requested name.
- `secretarySignature`, `secretaryName`, `declarationDate`: required —
  the form's only signature/declaration block; a Foundation Secretary
  is the form's designated signatory (no alternative signatory role is
  printed).
- `copyOfResolutionOfCouncil`: required — the form's own enclosure list
  prints it as item 1 with no "(if any)" or other qualifier.
- `consentAndCertificateOfAdditionalDirectors`: modelled `required:
  false` — the instruction's own "If there is more than one director"
  conditions it explicitly, and (per Structural finding 4) the printed
  role name itself is of uncertain applicability to a Foundation.

## Validation

- `node tools/validate.mjs`: pass.
- `node tools/validate-ajv.mjs`: pass (692/692 documents, including this
  one).
- Ephemeral conformance check (not committed): 1 valid scenario (all 6
  required fields, both documents), 6 required-field-omission mutations
  (one per required field), 1 unknown-field check, 1 invalid-date-shape
  check, and 2 document-requiredness checks — 11 checks total, all
  passing.
- `npm run build-index` (in `tools/govschema-client/`): registry index
  rebuilt, 691 → 692 documents.

## Scope and disclosed backlog

Mauritius's Business Formation vertical gains a seventeenth schema.
Mauritius remains 4 of 6 verticals open. The Annual Return (LP3)
remains confirmed-live, unauthored backlog for a future cycle, pending
the scoping decision on its unruled partner tables described above
under Candidate selection. The reappeared-but-unverified
consent-of-manager candidate (`CONSENT-OF-MANAGER-_LLP2.pdf`) is now
confirmed dead (HTTP 404) — no longer open backlog. The already-dead
`NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` link was re-tested and remains
dead.
