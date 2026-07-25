# Verification record — mu/cbrd/limited-liability-partnership-change-of-name@1.0.0

## Candidate selection

GOV-4939 ("GovSchema Standard Research"). The prior seven CBRD Mauritius
Business Formation cycles (GOV-4897/4904/4911/4918/4925/4932) authored
LLP1, the Foundation registration form, LLP2 Consent of Partner, the LP
Consent of General Partner, LP5 (Notice of Change of Name of a Limited
Partnership), and LP7 (Notice of Change in Registered Particulars),
disclosing a shrinking backlog of confirmed-live companion/notice forms
on each cycle's own VERIFICATION.md. The most recent disclosure
(GOV-4932) left three items open: LLP4 (Notice of Change in Registered
Office), LLP5 (Notice of Change of Name of a Limited Liability
Partnership), and LLP8 (Application for removal of Limited Liability
Partnership from Register) — alongside a further unscreened batch
surfaced on the GOV-4925 cycle (a distinct LLP7 "Registered
Particulars" notice, change-of-general-partner, change-of-manager/
partner (LLP6), name-reservation (LP1, LLP3), annual return (LP3), and
a Foundation change-of-name form).

LLP5 was picked over its five disclosed/unscreened siblings because it
is the direct Limited Liability Partnerships Act 2016 analogue of the
already-authored LP5 (Notice of Change of Name of a Limited
Partnership, GOV-4925) — the same relationship that made the LLP2/LP
Consent pair (GOV-4911/GOV-4918) and the (still-banked) LLP4/LP4 pair
natural companions. Modelling a direct Act-for-Act analogue of an
already-published schema is the fastest path to a correct schema this
registry has repeatedly found reliable, while still surfacing genuine
terminology differences between the two Acts (see "Document structure"
below).

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-OF-NAME-OF-A-LIMITED-LIABILITY-PARTNERSHIP_LLP5.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- CBRD's own downloadable-forms listing page
  (`https://companies.govmu.org/cbrd/downloadable-forms/`) was re-fetched
  fresh this cycle (HTTP 200, 185,260 bytes) and its HTML grepped for
  the exact `LLP5` filename, confirming the URL above byte-for-byte
  rather than reusing a banked guess.
- HTTP 200, **47,107 bytes** retrieved.
- sha256 of the retrieved bytes:
  `adc86d07611430acc318600dde83871f5659c1509771c1f55761d8f2b23c1428`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 123 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly, including exact `(x, y)` positions per item.
- A canvas render at 2.5x scale (`node-canvas`) confirmed the form's
  body prints three small bordered boxes (Registered No., Category,
  Date of Registration) stacked beneath a single-ruled-line box
  ("Present name of Limited Liability Partnership"), then a second
  single-ruled-line box ("Proposed Name of Limited Liability
  Partnership") — the identical three-box identification-block layout
  already modelled on the LP5 sibling, not the two-box layout on the
  LP7 sibling. The render also confirmed two small unlabeled
  checkboxes positioned beside the footer's "Sheet ___ of ___ (for
  office use)" line, matching the officer-only marks already disclosed
  on LP5. As on every prior CBRD render, several Helvetica glyphs
  dropped from the declaration block (the known `node-canvas`
  font-substitution gap, already documented in this registry's own
  `gov-form-pdf-extraction` practice note) — the text layer itself
  supplied those labels without ambiguity, so no field was left
  unmodelled because of the render gap.

### Authority attribution

The form's own header ("THE LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 20)") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed on every other CBRD schema in this
registry) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD) directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x, grouped into rows using a 2-point y-tolerance) reconstructed the
form's row structure — the same method used on every prior CBRD sibling.
A supplementary canvas render (see above) confirmed the box/checkbox
layout.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (label) | "S20 - F LLP5" (printed form
  reference codes, not fillable) | "Document Folio" (officer-only small
  box beneath it) — none modelled, same officer-only header pattern as
  every sibling CBRD schema.
- Title block: "THE LIMITED LIABILITY PARTNERSHIPS ACT 2016" / "NOTICE
  OF CHANGE OF NAME OF A LIMITED LIABILITY PARTNERSHIP" / "(Section
  20)" — static, not modelled.
- Existing-partnership identification block: "Present name of Limited
  Liability Partnership" (single-ruled-line box), followed by three
  small bordered boxes stacked vertically — "Registered No.",
  "Category", "Date of Registration" — directly analogous to the
  existing-record identification block already modelled on the LP5
  sibling, for the same reason: this notice is a post-registration
  amendment, not a first-filing form, so the Department needs the
  partnership's own registered number, category, and original date of
  registration to match the notice to the correct existing record. All
  three modelled required, same as LP5.
- New-name block: "Proposed Name of Limited Liability Partnership"
  (single-ruled-line box) — **a genuine wording difference from the
  LP5 sibling**: LP5's equivalent field is labelled only "Name of
  Limited Partnership" on the form itself (this registry's schema
  disambiguates it as `newNameOfLimitedPartnership` since the source
  reuses "Name of ... Partnership" for both the present- and new-name
  fields), whereas this form explicitly prints "Proposed Name of
  Limited Liability Partnership", removing any labelling ambiguity at
  the source. Modelled as `proposedNameOfLimitedLiabilityPartnership`,
  matching the form's own explicit wording.
- Declaration block: "Signature of partner(s): ______", "Name of
  partner(s): ______", "Date: ______" — **a second genuine wording
  difference**: the LP5 sibling (Limited Partnerships Act 2011) prints
  "general partner(s)" throughout, reflecting that Act's distinction
  between general and limited partners; this Limited Liability
  Partnerships Act 2016 form prints only "partner(s)", since the 2016
  Act has no general-partner role. Modelled as `signatureOfPartner` /
  `nameOfPartner` (not `...GeneralPartner`) to match the source's own
  terminology. As with LP5, the form prints no "attach a separate
  sheet" boilerplate for multiple partners despite the plural "(s)"
  wording; each is modelled as a single field matching the form's own
  single printed line.
- "Presented by:" block (filer, applicant-fillable): "Name: ______" (two
  printed lines, modelled as one field), "Address: ______" (two printed
  lines, modelled as one field), "Reference: ______" (one line,
  optional) — same convention as every sibling CBRD schema.
- "(For office use)" column, printed alongside "Presented by:": "Other
  fees :... ....." (fee schedule, three unlabeled rows), "Officer's
  Name:", "Sig:", "Date:" — all officer-only, not modelled.
- Footer: "Sheet ___ of ___ (for office use)" plus two small unlabeled
  checkboxes positioned immediately beside it (confirmed via canvas
  render, see above) — officer-only administrative marks, not modelled,
  same as LP5.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required or unconditionally optional
(`presentedByReference`), same pattern as the LP5 sibling. An
ephemeral, uncommitted Node script exercised:

- 2 valid scenarios: (1) all required fields supplied,
  `presentedByReference` omitted; (2) all fields including
  `presentedByReference` supplied.
- 9 required-field-omission mutations (one per required field:
  `presentNameOfLimitedLiabilityPartnership`, `registeredNo`,
  `category`, `dateOfRegistration`,
  `proposedNameOfLimitedLiabilityPartnership`, `declarationDate`,
  `signatureOfPartner`, `nameOfPartner`, `presentedByName`,
  `presentedByAddress` — 10 required fields total, each independently
  rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- **Notice of Change in Registered Office** (LLP4) and **Application
  for removal of Limited Liability Partnership from Register** (LLP8)
  — the two remaining Limited Liability Partnerships Act 2016
  companion forms disclosed since GOV-4911, re-confirmed still linked
  on this cycle's fresh fetch of the listing page but not
  independently re-byte-verified this cycle. Left open, disclosed
  backlog.
- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle.
- **Surfaced on the GOV-4925 cycle, still unscreened**: a distinct
  `NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LLP7.pdf` (an LLP-family
  "Registered Particulars" notice distinct from the already-authored
  LP7), `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf`,
  `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`,
  `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`,
  `APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
  `RESERVATION-OF-NAME-LLP_LLP3.pdf`, `Annual-Return_LP3.pdf`, and
  `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`. None of these were
  fetched or byte-verified this cycle; flagged here again so a future
  cycle re-scans the listing page directly rather than only the
  previously banked candidate names.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
