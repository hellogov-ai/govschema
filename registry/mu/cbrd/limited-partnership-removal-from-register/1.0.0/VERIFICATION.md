# Verification record — mu/cbrd/limited-partnership-removal-from-register@1.0.0

## Candidate selection

GOV-4974 ("GovSchema Standard Research"). The prior cycle (GOV-4967,
authoring the LP6 "Notice of Change of General Partner") disclosed that
the **LP4 removal-from-register form — a confirmed dead link (HTTP 404)
since GOV-4911 — has been resurrected to HTTP 200** (55,979 bytes), not
yet authored. This is the direct Limited Partnerships Act 2011 analogue
of the already-authored `mu/cbrd/limited-liability-partnership-removal-from-register`
(LLP8) schema, and the strongest disclosed banked candidate carried
forward into this cycle: it is a re-linked, previously-dead form now
confirmed live, rather than an unscreened batch item never independently
byte-verified.

## Reaching the live source

This cycle re-fetched CBRD's own downloadable-forms listing fresh
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200,
185,260 bytes) via a plain unauthenticated `curl`, and confirmed the
exact LP4 filename directly from the page's own raw HTML rather than
reusing a banked guess:

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/APPLICATION-FOR-REMOVAL-OF-LIMITED-PARTNERSHIP-FROM-REGISTER-FOR-THE-PURPOSE-OF-TRANFERRING-ITS-REGISTRATION-TO-ANOTHER-COUNTRY_-LP4.pdf`

(note the source's own filename typo, "TRANFERRING", carried verbatim
from the live URL — not a transcription error introduced by this
schema).

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **55,979 bytes** retrieved — exactly matching the byte
  count disclosed by the GOV-4967 cycle's live re-check.
- sha256 of the retrieved bytes:
  `6ac6b206d31a9fea6175ff591f2baa950a620ede2042de861d57c2ac9cedd222`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 74 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly.

### Authority attribution

The form's own header ("LIMITED PARTNERSHIPS ACT 2011", "(Section
65)", form code "S65.F LP4") and its hosting directly on the Corporate
and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

A positional text-layer dump (each item's string plus x/y transform
coordinates) reconstructed the form's row structure — the same method
used on every prior CBRD sibling. Because the "Enclosed herewith:"
block's exact widget type (checkbox vs. plain lettered list) was not
determinable from text alone, a supplementary canvas render
(`node-canvas`, 2.5x scale) was produced. The render dropped every
glyph via the same Helvetica path-resolution warning documented in
this registry's `gov-form-pdf-extraction` practice note (visible in
this document's own render as a garbled "Iaa" artifact over the
"FOR OFFICE USE" shaded header box), but the vector box/line graphics
rendered cleanly. A programmatic zero-dark-pixel scan of the full
interior region between the identification/transfer boxes (image y≈700)
and the signature grid (image y≈1450) confirmed **no checkbox squares
or other fillable-widget graphics anywhere in the "Enclosed herewith"
area** — a genuine structural difference from the LLP8 sibling, whose
own canvas render confirmed three visible checkbox squares in the
equivalent region. See "Document structure" below for how this
difference is modelled.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label, rendered as a garbled glyph
  artifact per the extraction note above) over a "Document Folio" box
  (officer-only, not modelled) | "S65.F LP4" / "LIMITED PARTNERSHIPS
  ACT 2011" (printed form reference codes, not fillable).
- Title block: "TRANSFER OF REGISTRATION" (a kicker heading not present
  on the LLP8 sibling's own title block) / "APPLICATION FOR REMOVAL OF
  LIMITED PARTNERSHIP FROM REGISTER FOR THE PURPOSE OF TRANSFERRING ITS
  REGISTRATION TO ANOTHER COUNTRY" / "(Section 65)" — static, not
  modelled.
- Existing-LP identification block: "Name of Limited Partnership"
  (single-ruled-line box), followed by two small bordered boxes side by
  side — "Category" (left, x≈52) and "Registered No." (right, x≈274).
  The same side-by-side two-box pattern and label order already
  established by the LLP8 sibling, distinct from the LP7 sibling's own
  stacked layout and the LP6 sibling's own abbreviated "LP No." label.
- Transfer-details block: "Proposed jurisdiction of transfer" — a
  third, centered bordered box beneath the Category/Registered No.
  boxes, confirmed via the canvas render. Identical field to the LLP8
  sibling's own transfer-details block.
- Enclosed-documents block: "Enclosed herewith:" followed by three
  lettered items — "(a) Documentary evidence as required under section
  65 (a), (b) and (d) of the Act.", "(b) Written confirmation from
  MRA/Financial Services Commission that there is no objection to the
  Limited Partnership being removed from the register.", and "(c)
  Public Notice under Section 67". **Two genuine structural differences
  from the LLP8 sibling's own equivalent block**: (1) no checkbox
  graphics are printed anywhere in this section (confirmed by the
  zero-dark-pixel scan described above) — this form's three items are a
  plain lettered checklist, not tickable widgets, so they are modelled
  as `documents[]` entries (category `supporting-evidence`) rather than
  boolean `fields[]`, following this registry's established
  non-fillable-checklist convention (e.g. the Thailand MFA visa
  schema's own page-1 checklist); and (2) item (b) merges what the LLP8
  sibling models as two separate checkboxes (an unconditional MRA
  confirmation and a conditional FSC confirmation, gated on holding a
  Category One Global Business License) into a single unconditional
  "MRA/Financial Services Commission" confirmation, with item (c) —
  "Public Notice under Section 67" — a wholly new third item with no
  LLP8 equivalent at all. All three documents are modelled required:
  the form states all three as a flat "Enclosed herewith" list with no
  conditional-language qualifier on any item (unlike LLP8's own
  explicitly conditional FSC item), so no `requiredWhen` gate is used.
- Declaration block: "General Partner (s)" heading (the same LP-Act
  terminology already established by the LP6/LP7 siblings, not
  "Partner (s)", the LLP-Act terminology used by LLP4/LLP5/LLP8), then
  "Full Name(s):" / "Signature(s):" column headers, followed by a
  four-row grid of blank dot-leader pairs, and "Date:…………………………"
  beneath the grid. Column order: "Full Name(s):" at x≈58 (left) then
  "Signature(s):" at x≈346 (right) — matching the LLP8 sibling's own
  column order, the reverse of the LP7 sibling's own
  Signature-before-Full-Name order. Modelled with `generalPartner{n}FullName`
  preceding `generalPartner{n}Signature` in both the `fields` array and
  the `declaration` step's field list, matching this form's own
  left-to-right column order.
- **No "Presented By" block** — confirmed absent by a substring search
  across all 74 extracted text items (no occurrence of "presented"
  anywhere on the page), the same absence already established by the
  LP7/LLP8 siblings. This form ends immediately after the four-row
  signature grid and the `Date:` line.
- No footer "Sheet ___ of ___" line or officer-only checkboxes were
  found on this form (unlike the LLP4/LLP5/LP5 siblings' footers) —
  confirmed by the same substring search and by visual inspection of
  the canvas render, which shows blank margin below the `Date:` line.

## Conformance

No `requiredWhen` gates are used on `fields[]` or `documents[]` —
every field is either unconditionally required, unconditionally
optional (the General Partner 2-4 slots), or optional by the
registry's established bounded-slot convention, and all three
`documents[]` entries are unconditionally required per the source's
own flat, unqualified "Enclosed herewith" list. An ephemeral,
uncommitted Node script exercised:

- 1 valid scenario: all required fields supplied
  (`nameOfLimitedPartnership`, `registeredNo`, `category`,
  `proposedJurisdictionOfTransfer`, `declarationDate`,
  `generalPartner1FullName`, `generalPartner1Signature`), all optional
  fields omitted (General Partner slots 2-4).
- 1 valid scenario: all 11 fields supplied (slots 2-4 filled in).
- 7 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- This closes the LP4 removal-from-register form, the last item
  disclosed as a confirmed dead link since GOV-4911 and resurrected to
  HTTP 200 per the GOV-4967 cycle's live re-check. Mauritius remains at
  4 of 6 verticals (a thirteenth schema within the already-open Business
  Formation vertical, not a new vertical).
- The GOV-4925-surfaced unscreened batch — `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`,
  name-reservation (LP1, LLP3), annual return (LP3), and a Foundation
  change-of-name form — remains unscreened and is now the sole
  remaining disclosed backlog. None of these have been fetched or
  byte-verified since first surfaced; flagged here so a future cycle
  re-scans the listing page directly rather than relying on this
  write-up alone.
- **Consent of Manager** and **Notice of Change of Manager (LLP6 half
  of the LLP6 pair)** remain the two genuine dead links (HTTP 404) on
  the Department's own hosting, not re-tested this cycle.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
