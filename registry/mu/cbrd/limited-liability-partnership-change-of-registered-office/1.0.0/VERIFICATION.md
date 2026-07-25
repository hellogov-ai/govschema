# Verification record — mu/cbrd/limited-liability-partnership-change-of-registered-office@1.0.0

## Candidate selection

GOV-4946 ("GovSchema Standard Research"). The GOV-4939 cycle (the most
recent prior CBRD Mauritius cycle) left two confirmed-live, disclosed
backlog items open: **change-of-registered-office (LLP4)** and
**removal-from-register (LLP8)**, alongside a further unscreened batch
(LLP7 distinct from the already-authored LP7, change-of-general-
partner, change-of-manager/partner (LLP6), name-reservation (LP1,
LLP3), annual return (LP3), and a Foundation change-of-name form) and
the two dead-linked forms (consent-of-manager, LP4 removal). LLP4 was
picked as the strongest banked candidate — confirmed live and
byte-verifiable since first disclosed on GOV-4911, the direct Limited
Liability Partnerships Act 2016 analogue of the two-box, no-"Presented
By" LP7 sibling already authored (GOV-4932), giving a useful
cross-check on whether that structural pattern carries over across
Acts.

## Reaching the live source

This cycle re-fetched CBRD's own downloadable-forms listing fresh
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200,
185,260 bytes) via a plain unauthenticated `curl` and grepped its raw
HTML for the exact LLP4 filename rather than reusing a banked guess,
confirming:

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-IN-REGISTERED-OFFICE-LLP4.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **47,286 bytes** retrieved.
- sha256 of the retrieved bytes:
  `cc5fdb3754343231447f3375942ca2f17b4d75fcac23a7b25b31bab20d1abda7`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 119 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly.

### Authority attribution

The form's own header ("THE LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 42)", form code "S42-F LLP 4") and its hosting directly on
the Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

A positional text-layer dump (each item's string plus x/y transform
coordinates) reconstructed the form's row structure. Because this
form's boxed fields are not distinguishable from ruled free-text lines
by text alone, a supplementary canvas render (`node-canvas`, 2.5x
scale) was produced **with a text-baseline overlay**: a horizontal red
line was drawn across the full page width at every distinct text
y-coordinate, labelled with that y-value, directly on top of the
rendered page graphics (box borders, ruled lines). This let every box's
top/bottom edge be read off directly against the known text
y-coordinates rather than estimated from two separate uncorrelated
renders — a refinement over the plain box-confirmation renders used on
prior CBRD cycles. The render itself dropped every glyph via a
Helvetica path-resolution warning (the same `node-canvas`
font-substitution gap documented in this registry's own
`gov-form-pdf-extraction` practice note), so glyphs were never relied
upon in the render; only vector box/line graphics plus the overlaid
text-coordinate gridlines were used to confirm layout.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label) over a "Document Folio" box
  (officer-only, not modelled) | "S42-F LLP 4" / "THE LIMITED LIABILITY
  PARTNERSHIPS ACT 2016" (printed form reference codes, not fillable).
- Title block: "NOTICE OF CHANGE IN REGISTERED OFFICE" / "(Section 42)"
  — static, not modelled.
- Existing-partnership identification block: "Name of Limited
  Liability Partnership" (single-ruled-line box spanning y=677 to
  y=580), followed by two small bordered boxes side by side at the
  y=580 gridline — "Category" (left) and "Registered No." (right).
  **A genuine structural finding**: this form prints only these two
  boxes, not the three-box pattern (adding "Date of Registration")
  used by the LLP5 change-of-name sibling within the same Act — instead
  matching the two-box pattern already established by the LP7 (Limited
  Partnerships Act) sibling. Confirmed both by the clean text-layer
  extraction (no "Date of Registration" string anywhere in the 119
  extracted items) and the annotated canvas render (only two small
  boxes visible at the y=580 gridline, both textually confirmed by the
  overlaid label).
- New registered office block: "Address of the New Registered Office"
  — a second single-ruled-line box (y=533 to roughly y=460), the same
  single-line convention as the name-entry box above it, not a
  multi-line address block.
- Effective-date block: the running two-line sentence "The change in
  the registered office of the Limited Liability Partnership takes
  effect on *" (y=433/y=412), paired with a small bordered box
  confirmed via the annotated render to sit in the same right-hand
  column as the Registered No. box above it, vertically overlapping
  both text lines of the sentence. **A further genuine finding**: a
  footnote below the declaration block ("Note: * The change shall take
  effect on the date the register being amended to that effect
  (Section 42 (3)).", y=232) explains that the asterisked date is
  subject to the Department's own register-amendment date — modelled
  as a required `effectiveDate` field with this caveat disclosed in its
  own description, since the form provides no other mechanism to state
  an intended date and no prior CBRD sibling schema in this registry
  has needed to model an analogous boxed-value-inside-a-sentence field.
- Declaration block: "Signature of partner(s): ______" (y=363), "Name
  of partner(s): ______" (y=335), "Date: ______" (y=307) — the same
  "partner(s)" (not "general partner(s)") terminology already
  established by the LLP5 sibling, confirming the Limited Liability
  Partnerships Act 2016 does not distinguish a general-partner role.
  Modelled in the registry's established `declarationDate`,
  `signatureOfPartner`, `nameOfPartner` field order (matching the LLP5
  and LP5 siblings' own field ordering), not the page's own top-to-
  bottom print order.
- **A "Presented By" block is present** (y=201 "Presented by:" through
  y=99 "Reference:", plus a "(For office use)" officer column at
  Officer's Name/Sig/Date, and a "Sheet ___ of ___ (for office use)"
  footer with two small unlabeled checkboxes, confirmed via the
  annotated render to be officer-only administrative marks, same as
  every other CBRD schema with this block) — **unlike the LP7 sibling,
  which prints no Presented By block at all.** This form therefore
  combines the two-box identification pattern (like LP7) with a full
  Presented By block (like LLP5/LP5), a genuine cross-form structural
  combination not seen on any single prior CBRD schema in this
  registry.

## Conformance

No `requiredWhen` gates are used — every field on this form is
unconditionally required or unconditionally optional, unlike the
either/or BRN/ID No. pattern on the Consent-family siblings, which this
form does not print. An ephemeral, uncommitted Node script exercised:

- 2 valid scenarios: all 11 fields supplied; all required fields
  supplied with `presentedByReference` (the only optional field)
  omitted.
- 10 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- **Removal-from-register (LLP8)** remains disclosed, confirmed-live,
  open backlog — re-linked on this cycle's fresh listing re-fetch but
  not independently re-byte-verified.
- The GOV-4925-surfaced unscreened batch remains unscreened: an LLP7
  "Registered Particulars" notice distinct from the already-authored
  LP7, change-of-general-partner, change-of-manager/partner (LLP6),
  name-reservation (LP1, LLP3), annual return (LP3), and a Foundation
  change-of-name form.
- **Consent of Manager** (LLP2 sibling form) and the Limited
  Partnerships Act 2011 **removal-from-register (LP4)** remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
