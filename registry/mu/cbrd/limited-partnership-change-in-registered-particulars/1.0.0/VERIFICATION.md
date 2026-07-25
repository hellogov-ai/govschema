# Verification record — mu/cbrd/limited-partnership-change-in-registered-particulars@1.0.0

## Candidate selection

GOV-4932 ("GovSchema Standard Research"). The prior six CBRD Mauritius
Business Formation cycles (GOV-4897/4904/4911/4918/4925) authored LLP1,
the Foundation registration form, LLP2 Consent of Partner, LP Consent
of General Partner, and LP5 (Notice of Change of Name), disclosing a
shrinking backlog of confirmed-live companion/notice forms on each
cycle's own VERIFICATION.md. The most recent disclosure (GOV-4925) left
four items open — LLP4 (Notice of Change in Registered Office), LLP5
(Notice of Change of Name of a Limited Liability Partnership), LLP8
(Application for removal of Limited Liability Partnership from
Register), and LP7 (Notice of Change in Registered Particulars) — plus
a further unscreened batch surfaced that same cycle but not yet
independently re-verified by any prior cycle (an LLP7 "Registered
Particulars" notice distinct from this LP7, change-of-general-partner,
change-of-manager/partner (LLP6), name-reservation (LP1, LLP3), annual
return (LP3), and a Foundation change-of-name form).

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200) fresh
via a live `WebFetch` rather than trusting the banked list, and
confirmed LP7, LP4 (removal), LLP4, LLP7, and LLP8 are all still linked.
LP7 was picked over its siblings because it is the most thoroughly
re-verified item in the backlog (independently byte-confirmed on three
separate cycles now: GOV-4911, GOV-4918, and this one, all returning
the identical 47,636-byte document) and, as the direct Limited
Partnerships Act 2011 analogue already flagged alongside LP5 in the
GOV-4925 disclosure, is a natural next pick after last cycle's LP5.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LP7.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **47,636 bytes** retrieved — byte-identical to the size
  disclosed on both prior cycles (GOV-4911, GOV-4918), and now also
  independently re-confirmed via a fresh `curl -I` HEAD request
  (`content-length: 47636`) and a full download.
- sha256 of the retrieved bytes:
  `2ce4d1b518009bf5d6541f7bcb894b79714f99487d557b7f9ca11af90ddfc578`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 78 positioned text items — a genuine text
  layer, with every printed label and blank-line dot-leader run
  recovered cleanly. Items were sorted by descending y-coordinate (then
  x) and grouped into rows using a 1-point y-tolerance to reconstruct
  the form's exact top-to-bottom, left-to-right layout, disambiguating
  the two-column "Signatures" / "Full names" grid by each item's own
  x-position (signature column at x≈72, full-name column at x≈360).
- A supplementary canvas render (`node-canvas`, 2.5x scale) confirmed
  the box layout: a single wide box with one ruled line ("Name of
  Limited Partnership"), two small bordered boxes beneath it
  ("Registered No.", "Category"), then unboxed free-text ruled lines
  and the signature grid — no checkbox or undivided-box ambiguity
  anywhere on the page. The render dropped every glyph via a Helvetica
  path-resolution warning (a more severe instance of the known
  `node-canvas` font-substitution gap already documented in this
  registry's own `gov-form-pdf-extraction` practice note, distinct from
  the clean text-layer extraction that supplied every field label and
  position without ambiguity), so the render was used for layout/box
  confirmation only, not text confirmation.

### Authority attribution

The form's own header ("THE LIMITED PARTNERSHIPS ACT 2011", "(Section
22)") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed on every other CBRD schema in this
registry) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD) directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x, grouped into rows using a y-tolerance) reconstructed the form's
row structure — the same method used on every prior CBRD sibling. A
supplementary canvas render (see above) confirmed the box/line layout
where the text layer alone left ambiguity about box boundaries.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label) | "S22." / "F LP7" (printed
  form reference codes, not fillable) | "Document Folio" (officer-only
  small box beneath it) — none modelled, same officer-only header
  pattern as every sibling CBRD schema.
- Title block: "THE LIMITED PARTNERSHIPS ACT 2011" / "NOTICE OF CHANGE
  IN REGISTERED PARTICULARS" / "(Section 22)" — static, not modelled.
- Existing-partnership identification block: "Name of Limited
  Partnership" (single-ruled-line box), followed by two small bordered
  boxes stacked vertically — "Registered No.", "Category". **A genuine
  structural difference from the LP5 sibling**: LP5 prints a third box,
  "Date of Registration", which this form does not print at all —
  confirmed both by the clean text-layer extraction (no "Date of
  Registration" string anywhere in the 78 extracted items) and the
  canvas render (only two small boxes visible beneath the name entry,
  not three). Both remaining boxes are modelled required, since the
  notice cannot be processed without identifying which registered
  Limited Partnership's particulars are changing.
- Change(s)-filed block: "The following change (s) in information
  stated in the declaration referred to in Section 11(1) or 19(2) (d)
  is/are filed with the Registrar:" followed by four blank ruled lines
  with no further structure (no per-item labels, no repeatable table) —
  modelled as a single free-text field (`changesFiled`) matching the
  form's own single logical entry spanning multiple ruled lines, the
  same convention used for other multi-line free-text blocks in this
  registry.
- Declaration block: "Date: ______", then "General Partner (s)" /
  "Signatures:" / "Full names:" column headers followed by a four-row
  grid of blank ruled-line pairs. **A genuine structural difference from
  the LP5 sibling**: LP5 prints only a single "Signature of general
  partner(s): ______" / "Name of general partner(s): ______" line pair
  with no "attach a separate sheet" boilerplate, whereas this form
  prints an explicit four-row grid for up to four general partners to
  sign directly on the page. Modelled using this registry's established
  bounded-slot convention (slot 1 required, slots 2-4 optional, no
  requiredWhen gate, since the source prints no count/checkbox field to
  gate on) — the same pattern already used for the LP1/LLP1 partner and
  manager grids.
- **No "Presented By" block and no "(For office use)" fee/officer
  column** — confirmed absent by a substring search across all 78
  extracted text items (no occurrence of "presented" anywhere on the
  page), a further genuine structural difference from the LP5 sibling
  and every other CBRD Business Formation schema in this registry, all
  of which print a "Presented by:" section. This form ends immediately
  after the four-row signature grid.
- No footer "Sheet ___ of ___" line or checkboxes were found on this
  form (unlike the LP5 sibling's footer) — confirmed by the same
  substring search and by visual inspection of the canvas render, which
  shows blank margin below the signature grid.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required (slot 1 of the identification and signature
blocks) or unconditionally optional (slots 2-4 of the signature grid),
unlike the either/or BRN/ID No. pattern on the Consent-family siblings,
which this form does not print. An ephemeral, uncommitted Node script
exercised:

- 1 valid scenario: all required fields supplied
  (`nameOfLimitedPartnership`, `registeredNo`, `category`,
  `changesFiled`, `declarationDate`, `generalPartner1Signature`,
  `generalPartner1FullName`), all four optional slot-2/3/4 fields
  omitted.
- 1 valid scenario: all 13 fields supplied (slots 2-4 filled in).
- 7 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- Their Limited Liability Partnership Act 2016 analogues, previously
  disclosed and re-confirmed still linked this cycle but not
  independently re-byte-verified: **Notice of Change of Name of a
  Limited Liability Partnership** (LLP5), **Notice of Change in
  Registered Office** (LLP4), **Application for removal of Limited
  Liability Partnership from Register** (LLP8). Left open, disclosed
  backlog.
- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle.
- **Surfaced on the GOV-4925 cycle, not yet independently re-verified
  by any cycle since**: `NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LLP7.pdf`
  (an LLP-family "Registered Particulars" notice distinct from this LP7
  — the listing page reuses "LP7" and "LLP7" as separate form codes,
  easy to conflate), `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf`,
  `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`,
  `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`,
  `APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
  `RESERVATION-OF-NAME-LLP_LLP3.pdf`, `Annual-Return_LP3.pdf`, and
  `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`. None of these have
  been fetched or byte-verified since first surfaced; flagged here so a
  future cycle re-scans the listing page directly rather than relying
  on this write-up alone.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
