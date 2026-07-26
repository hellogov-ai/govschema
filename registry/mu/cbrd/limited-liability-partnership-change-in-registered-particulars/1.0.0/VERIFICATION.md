# Verification record — mu/cbrd/limited-liability-partnership-change-in-registered-particulars@1.0.0

## Candidate selection

GOV-4960 ("GovSchema Standard Research"). The prior ten CBRD Mauritius
Business Formation cycles (GOV-4897 through GOV-4953) authored LLP1,
the Foundation registration form, LLP2 Consent of Partner, LP Consent
of General Partner, LP5 (Change of Name), LP7 (Change in Registered
Particulars), LLP5 (Change of Name), LLP4 (Change of Registered
Office), and LLP8 (Removal from Register) — closing the original
five-item companion/notice backlog first disclosed on GOV-4911. Every
cycle since GOV-4925 has carried forward, unauthored, a further batch
surfaced that same cycle but never independently re-verified: an LLP7
"Registered Particulars" notice distinct from the already-authored LP7
(the listing page reuses "LP7" and "LLP7" as separate form codes),
change-of-general-partner, change-of-manager/partner (LLP6),
name-reservation (LP1, LLP3), annual return (LP3), and a Foundation
change-of-name form.

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200,
185,260 bytes) fresh via `curl` and grepped its raw HTML for every
`.pdf` link, confirming all items in the GOV-4925-surfaced batch are
still linked: `NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LLP7.pdf`,
`APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
`Annual-Return_LP3.pdf`, `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf`,
`NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`,
`NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`,
`RESERVATION-OF-NAME-LLP_LLP3.pdf`, and
`APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`. This cycle also
noticed `CONSENT-OF-MANAGER-_LLP2.pdf` now appears in the listing's own
HTML for the first time since the GOV-4911 cycle disclosed it as a
genuine dead link (HTTP 404) — flagged below for a future cycle to
re-test live, not re-tested this cycle since it falls outside this
cycle's single-deliverable scope.

The LLP7 "Registered Particulars" notice was picked over the rest of
the unscreened batch because it is the direct Limited Liability
Partnerships Act 2016 analogue of the already-authored LP7 (Limited
Partnerships Act 2011), the same "next natural pick after last cycle's
sibling" reasoning already used to select LP7 after LP5 (GOV-4932) and
LLP5 after LP5's own LLP-Act analogue relationship — the fastest path
to a low-ambiguity companion schema versus the four other unscreened
candidates (LP1/LLP3 name-reservation, LP3 annual return, LLP6, LP
change-of-general-partner, and the Foundation change-of-name form),
none of which yet have a same-registry sibling to model against.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LLP7.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **45,904 bytes** retrieved (confirmed independently via
  both a `curl -I` HEAD request — `content-length: 45904` — and a full
  download). This is the first cycle to byte-verify this specific file;
  no prior banked estimate existed to cross-check against.
- sha256 of the retrieved bytes:
  `c9bf7b48d80b019fa619094be73643ff9f8234484ea02e57f3db397b2ed654bd`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 95 positioned text items — a genuine text
  layer, with every printed label and blank-line dot-leader run
  recovered cleanly. Items were sorted by descending y-coordinate (then
  x) and grouped into rows to reconstruct the form's exact top-to-bottom
  layout, disambiguating the two-column "Signatures" / "Full names"
  grid by each item's own x-position (signature column at x≈72,
  full-name column at x≈360 — the same left-to-right order as the LP7
  sibling).
- A supplementary canvas render (`node-canvas`, 2.5x scale, cropped to
  the header/identification region) independently confirmed the box
  layout: a single wide box with one ruled line ("Name of Limited
  Liability Partnership"), then two small bordered boxes stacked
  vertically beneath it ("Registered No." above "Category") — the same
  two-box (not three-box) pattern as the LP7/LLP4 siblings, not the
  three-box pattern used by the LLP5/LP5 change-of-name siblings. The
  render dropped every glyph via a Helvetica path-resolution warning
  (the same known `node-canvas` font-substitution gap documented in
  this registry's `gov-form-pdf-extraction` practice note), so it was
  used for box/layout confirmation only, not text confirmation — the
  clean text-layer extraction supplied every field label and position.

### Authority attribution

The form's own header ("THE LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 44)", form code "S44-F LLP7") and its hosting directly on the
Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x) reconstructed the form's row structure — the same method used
on every prior CBRD sibling. A supplementary canvas render (see above)
confirmed the box/line layout where the text layer alone left ambiguity
about box boundaries.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label) | "S44-F LLP7" (printed form
  reference code, not fillable) | "Document Folio" (officer-only small
  box beneath it) — none modelled, same officer-only header pattern as
  every sibling CBRD schema.
- Title block: "THE LIMITED LIABILITY PARTNERSHIPS ACT 2016" / "NOTICE
  OF CHANGE IN REGISTERED PARTICULARS" / "(Section 44)" — static, not
  modelled.
- Existing-LLP identification block: "Name of Limited Liability
  Partnership" (single-ruled-line box), followed by two small bordered
  boxes stacked vertically — "Registered No.", "Category". **Matches
  the LP7 sibling's own two-box pattern** (no third "Date of
  Registration" box, unlike the LP5/LLP5 change-of-name siblings),
  confirmed both by the clean text-layer extraction (no "Date of
  Registration" string anywhere in the 95 extracted items) and the
  canvas render. Both boxes are modelled required, since the notice
  cannot be processed without identifying which registered Limited
  Liability Partnership's particulars are changing.
- Change(s)-filed block: "The following change (s) in information
  stated in the declaration referred to in Section 44 is/are filed with
  the Registrar:" followed by four blank ruled lines with no further
  structure (no per-item labels, no repeatable table) — modelled as a
  single free-text field (`changesFiled`), the same convention already
  used for the LP7 sibling's own equivalent field. Transcribed verbatim
  from the source; the form cites "Section 44" for both the notice
  itself and the underlying declaration, unlike the LP7 sibling's own
  paragraph, which cites two distinct sections ("11(1) or 19(2)(d)") of
  the Limited Partnerships Act 2011 — a genuine drafting difference
  between the two Acts, not a transcription simplification.
- Declaration block: "Date: ______", then "Partner (s)" / "Signatures:"
  / "Full names:" column headers followed by a four-row grid of blank
  ruled-line pairs. **A genuine terminology difference from the LP7
  sibling**: this form prints "Partner (s)", not "General Partner (s)"
  — the same LLP-vs-LP terminology difference already disclosed between
  the LLP5 and LP5 siblings ("partner(s)" vs. "general partner(s)").
  Modelled using this registry's established bounded-slot convention
  (slot 1 required, slots 2-4 optional, no requiredWhen gate, since the
  source prints no count/checkbox field to gate on) — the same pattern
  already used for the LP7/LLP8 signature grids. The Signature column
  prints on the left (x≈72) and the Full-name column on the right
  (x≈360), matching the LP7 sibling's own column order and **the
  reverse of the LLP8 sibling's own reversed order** (Full Name before
  Signature) — confirmed independently by each item's own x-position.
- **No "Presented By" block and no "(For office use)" fee/officer
  column** — confirmed absent by a substring search across all 95
  extracted text items (no occurrence of "presented" anywhere on the
  page), matching the LP7 sibling's own disclosed finding. This form
  ends immediately after the four-row signature grid.
- No footer "Sheet ___ of ___" line or checkboxes were found on this
  form, confirmed by the same substring search and by visual inspection
  of the canvas render, which shows blank margin below the signature
  grid.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required (slot 1 of the identification and signature
blocks) or unconditionally optional (slots 2-4 of the signature grid).
An ephemeral, uncommitted Node script exercised:

- 1 valid scenario: all required fields supplied
  (`nameOfLimitedLiabilityPartnership`, `registeredNo`, `category`,
  `changesFiled`, `declarationDate`, `partner1Signature`,
  `partner1FullName`), all three optional slot-2/3/4 field pairs
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

- **Surfaced on the GOV-4925 cycle, still not independently re-verified
  by any cycle**: `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf` (a
  distinct form from the already-authored LP Consent of General
  Partner), `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` and
  `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf` (two separate LLP6-coded
  files, not yet screened to determine whether they are two distinct
  forms or a duplicate listing),
  `APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
  `RESERVATION-OF-NAME-LLP_LLP3.pdf`, `Annual-Return_LP3.pdf`, and
  `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`. All eight filenames
  were re-confirmed still linked on the listing page's own HTML this
  cycle (see "Candidate selection" above), but none have been fetched
  or byte-verified since first surfaced.
- `CONSENT-OF-MANAGER-_LLP2.pdf` now reappears in the listing's own
  HTML for the first time since the GOV-4911 cycle disclosed it as a
  genuine dead link (HTTP 404) on the Department's own hosting — not
  re-tested live this cycle; flagged for a future cycle to re-check
  whether the Department has fixed the link.
- **Application for Removal of Limited Partnership from Register**
  (LP4) remains the second genuine dead link (HTTP 404) first disclosed
  on the GOV-4911 cycle, not re-tested this cycle.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
