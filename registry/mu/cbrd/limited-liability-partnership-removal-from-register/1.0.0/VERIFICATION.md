# Verification record — mu/cbrd/limited-liability-partnership-removal-from-register@1.0.0

## Candidate selection

GOV-4953 ("GovSchema Standard Research"). The GOV-4946 cycle (the most
recent prior CBRD Mauritius cycle) left one confirmed-live, disclosed
backlog item open: **removal-from-register (LLP8)** — re-linked on
every cycle since GOV-4911 but not authored — alongside the
GOV-4925-surfaced unscreened batch (an LLP7 "Registered Particulars"
notice distinct from the already-authored LP7, change-of-general-
partner, change-of-manager/partner (LLP6), name-reservation (LP1,
LLP3), annual return (LP3), and a Foundation change-of-name form) and
the two dead-linked forms (consent-of-manager, LP4 removal). LLP8 was
picked as the last remaining disclosed, confirmed-live companion form
from the original five-item backlog first surfaced on GOV-4911 —
closing that backlog entirely — over the unscreened batch, since it
carries a stronger verification history (independently re-confirmed
live on GOV-4911, GOV-4918, GOV-4925, GOV-4932, and GOV-4939) than any
item in the unscreened batch, none of which has been independently
byte-verified since first surfaced.

## Reaching the live source

This cycle re-fetched CBRD's own downloadable-forms listing fresh
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200,
185,260 bytes) via a plain unauthenticated `curl` and grepped its raw
HTML for the exact LLP8 filename rather than reusing a banked guess,
confirming:

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/APPLICATION-FOR-REMOVAL-OF-LIMITED-LIABILITY-PARTNERSHIP-FROM-REGISTER-FOR-THE-PURPOSE-OF-TRANSFERRING-ITS-REGISTRATION-TO-ANOTHER-COUNTRY-_-LLP-8.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **54,643 bytes** retrieved.
- sha256 of the retrieved bytes:
  `a80bded581b66cc12a34e5dfdfd0fa0e06dd68137697f76a392ed3a6bc5975d4`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 96 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly.

### Authority attribution

The form's own header ("LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 32)", form code "S32(a)-F LLP8") and its hosting directly on
the Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

A positional text-layer dump (each item's string plus x/y transform
coordinates) reconstructed the form's row structure — the same method
used on every prior CBRD sibling. Because the "Enclosed herewith:"
block's exact widget type (checkbox vs. ruled line) was not
determinable from text alone, a supplementary canvas render
(`node-canvas`, 2.5x scale) was produced. The render dropped every
glyph via the same Helvetica path-resolution warning documented in
this registry's `gov-form-pdf-extraction` practice note, but the
vector box/line/checkbox graphics rendered cleanly, showing:

- A single wide box (name entry), two smaller boxes side by side
  beneath it (Category, Registered No.), and a third centered box
  beneath those (proposed jurisdiction of transfer) — all confirmed
  boxed-entry fields, not plain ruled lines.
- **Three small square checkboxes**, stacked vertically with a visible
  gap separating the first pair from the third — confirmed to align,
  by y-coordinate, with the three "Enclosed herewith:" text items
  extracted from the text layer (checkbox 1 at documentary-evidence
  text y=441.07; checkbox 2 at MRA-confirmation text spanning
  y=413.47/385.87; checkbox 3, after the visible gap, at
  FSC-confirmation text spanning y=358.25/330.65). This is the first
  checkbox-modelled field on any CBRD schema in this registry — every
  prior sibling (LP7, LLP4, LLP5, LP5, LLP2, LP, LLP1, Foundation) uses
  only ruled free-text lines and/or a bounded-slot signature grid, never
  a checkbox.
- A four-row grid of dot-leader pairs at the bottom of the page
  (the "Partner (s)" signature block), with no checkbox or box borders,
  confirmed via the same render.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label) over a "Document Folio" box
  (officer-only, not modelled) | "S 32 (a) - F LLP 8" / "LIMITED
  LIABILITY PARTNERSHIPS ACT 2016" (printed form reference codes, not
  fillable).
- Title block: "APPLICATION FOR REMOVAL OF LIMITED LIABILITY
  PARTNERSHIP FROM REGISTER FOR THE PURPOSE OF TRANSFERRING ITS
  REGISTRATION TO ANOTHER COUNTRY" / "(Section 32)" — static, not
  modelled.
- Existing-LLP identification block: "Name of Limited Liability
  Partnership" (single-ruled-line box), followed by two small bordered
  boxes side by side — "Category" (left) and "Registered No." (right).
  The same two-box identification pattern already established by the
  LP7 and LLP4 siblings, not the three-box pattern (adding "Date of
  Registration") used by the LLP5/LP5 change-of-name siblings.
  Confirmed both by the clean text-layer extraction (no "Date of
  Registration" string anywhere in the 96 extracted items) and the
  canvas render (only two small boxes visible beneath the name entry).
- Transfer-details block: "Proposed jurisdiction of transfer" — a
  third, centered bordered box beneath the Category/Registered No.
  boxes, confirmed via the canvas render. A field genuinely unique to
  this form among the CBRD siblings modelled so far (no prior CBRD
  schema names a destination jurisdiction).
- Enclosed-documents block: "Enclosed herewith:" followed by three
  checkbox items — "Documentary evidence as required under section 33
  and 35 of the Act.", "Written confirmation from MRA that there is no
  objection to the Limited Liability Partnership being removed from the
  register.", and "Written confirmation from Financial Services
  Commission in case Limited Liability Partnership hold a Category One
  Global Business License." The first two are stated unconditionally
  (modelled required); the third is explicitly conditional ("in case
  ... hold a Category One Global Business License") with no
  discriminator field printed on the form to gate on, so it is modelled
  optional with no `requiredWhen` gate — the same "don't invent an
  unstated discriminator field" convention already established by this
  registry's LP7 bounded-slot rationale and the Consent-family
  either/or BRN/ID No. pattern.
- Declaration block: "Partner (s)" heading, then "Full Name(s):" /
  "Signature(s):" column headers, followed by a four-row grid of blank
  dot-leader pairs, and "Date:…………………………" beneath the grid. **A
  genuine column-order finding**: this form's column headers read
  "Full Name(s):" at x≈58 (left) then "Signature(s):" at x≈346
  (right) — the reverse of the LP7 sibling's own grid, which prints
  Signatures on the left (x≈72) and Full names on the right (x≈360).
  Confirmed independently by each item's own x-position in the 96
  extracted items; modelled with `partner{n}FullName` preceding
  `partner{n}Signature` in both the `fields` array and the `declaration`
  step's field list, matching this form's own left-to-right column
  order (unlike LP7's schema, which lists Signature before FullName to
  match LP7's own reversed column order). "Partner (s)" (not "General
  Partner(s)") is the same LLP-Act terminology already established by
  the LLP4/LLP5 siblings.
- **No "Presented By" block** — confirmed absent by a substring search
  across all 96 extracted text items (no occurrence of "presented"
  anywhere on the page), the same absence already established by the
  LP7 sibling (and unlike LLP4/LLP5/LP5, which all print one). This
  form ends immediately after the four-row signature grid and the
  `Date:` line.
- No footer "Sheet ___ of ___" line or officer-only checkboxes were
  found on this form (unlike the LLP4/LLP5/LP5 siblings' footers) —
  confirmed by the same substring search and by visual inspection of
  the canvas render, which shows blank margin below the `Date:` line.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required, unconditionally optional (the FSC checkbox
and partner slots 2-4), or optional by the registry's established
bounded-slot/unstated-discriminator convention. An ephemeral,
uncommitted Node script exercised:

- 1 valid scenario: all required fields supplied
  (`nameOfLimitedLiabilityPartnership`, `registeredNo`, `category`,
  `proposedJurisdictionOfTransfer`, `enclosedDocumentaryEvidence`,
  `enclosedMraConfirmation`, `declarationDate`, `partner1FullName`,
  `partner1Signature`), all optional fields omitted
  (`enclosedFscConfirmation`, partner slots 2-4).
- 1 valid scenario: all 16 fields supplied (FSC checkbox true, slots
  2-4 filled in).
- 9 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- **This closes the original five-item companion/notice backlog first
  disclosed on the GOV-4911 cycle** (LLP5, LLP4, LLP8, LP5, LP7 — all
  now authored). Mauritius remains at 4 of 6 verticals (a tenth schema
  within the already-open Business Formation vertical, not a new
  vertical).
- The GOV-4925-surfaced unscreened batch remains unscreened and is now
  the sole remaining disclosed backlog: an LLP7 "Registered
  Particulars" notice distinct from the already-authored LP7,
  change-of-general-partner, change-of-manager/partner (LLP6),
  name-reservation (LP1, LLP3), annual return (LP3), and a Foundation
  change-of-name form. None of these have been fetched or byte-verified
  since first surfaced; flagged here so a future cycle re-scans the
  listing page directly rather than relying on this write-up alone.
- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
