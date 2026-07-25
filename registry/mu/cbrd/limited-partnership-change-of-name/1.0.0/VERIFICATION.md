# Verification record — mu/cbrd/limited-partnership-change-of-name@1.0.0

## Candidate selection

GOV-4925 ("GovSchema Standard Research"). The prior five CBRD Mauritius
Business Formation cycles (GOV-4897/4904/4911/4918) authored LLP1, the
Foundation registration form, LLP2 Consent of Partner, and the LP
Consent of General Partner, disclosing a shrinking backlog of confirmed-
live companion/notice forms on each cycle's own VERIFICATION.md. The
most recent disclosure (GOV-4918) left five items open: LLP4 (Notice of
Change in Registered Office), LLP5 (Notice of Change of Name of a
Limited Liability Partnership), LLP8 (Application for removal of
Limited Liability Partnership from Register), LP5 (Notice of Change of
Name of a Limited Partnership), and LP7 (Notice of Change in Registered
Particulars) — with LP5 and LP7 each independently byte-verified live
twice already (GOV-4911, GOV-4918), the strongest-verified pair in the
backlog.

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200) fresh
rather than trusting the banked list, and confirmed all five disclosed
items are still linked live. It also surfaced forms not previously
disclosed on any prior cycle's VERIFICATION.md, expanding the known
backlog (see "Scope and disclosed backlog" below) — a reminder that the
banked list itself was never a complete inventory of the listing page,
only of items a prior cycle happened to name.

LP5 ("Notice of Change of Name of a Limited Partnership") was picked
over its four siblings because it is the more thoroughly re-verified of
the two double-confirmed items (LP5, LP7), and per this registry's own
"one deliverable per PR" convention is well-scoped as its own schema.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-OF-NAME-OF-A-LIMITED-PARTNERSHIP_LP5.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **46,918 bytes** retrieved — byte-identical to both prior
  disclosures (GOV-4911, GOV-4918).
- sha256 of the retrieved bytes:
  `2fcbee32a4fb31c4297cbe26a1009285d532bc1f161d1e2372370abda978bf46`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 100 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly, including exact `(x, y)` positions per item.
- Unlike its Consent-family siblings, this form's body prints three
  small bordered boxes (Registered No., Category, Date of Registration)
  and two larger bordered single-line entry boxes (present name, new
  name) whose fill-in area is a ruled box rather than a dot-leader line.
  A canvas render at 2.5x scale (`node-canvas`) was used to confirm
  these are simple single-ruled-line boxes, not the ambiguous
  multi-line undivided boxes found on the LLP1/Foundation siblings, and
  to confirm the two unlabeled small squares near the footer are
  positioned immediately beside the "Sheet ___ of ___ (for office use)"
  line — officer-only marks, not applicant fields. The render dropped
  several Helvetica glyphs in the signature/declaration block (a known
  `node-canvas` font-substitution gap distinct from clean text-layer
  extraction, already documented in this registry's own
  `gov-form-pdf-extraction` practice note) — the text layer itself
  supplied those labels without ambiguity, so no field was left
  unmodelled because of the render gap.

### Authority attribution

The form's own header ("THE LIMITED PARTNERSHIPS ACT 2011", "(Section
17(2))") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed on every other CBRD schema in this
registry) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD) directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x, grouped into rows using a 2-point y-tolerance) reconstructed the
form's row structure — the same method used on every prior CBRD sibling.
A supplementary canvas render (see above) confirmed the box/line layout
for the two ambiguous box regions and the footer checkboxes.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (label) | "S17." / "F LP5" (printed form
  reference codes, not fillable) | "Document Folio" (officer-only small
  box beneath it) — none modelled, same officer-only header pattern as
  every sibling CBRD schema.
- Title block: "THE LIMITED PARTNERSHIPS ACT 2011" / "NOTICE OF CHANGE
  OF NAME OF A LIMITED PARTNERSHIP" / "(Section 17(2))" — static, not
  modelled.
- Existing-partnership identification block: "Present name of Limited
  Partnership" (single-ruled-line box), followed by three small
  bordered boxes stacked vertically — "Registered No.", "Category",
  "Date of Registration" — **a genuine structural feature not seen on
  any prior CBRD Business Formation schema in this registry**: every
  prior schema (LP2, LLP1, Foundation, LLP2 Consent, LP Consent) is a
  first-filing form describing a partnership/foundation not yet
  registered, so none needed a positive-identification block for an
  *existing* record. This notice form, being a post-registration
  amendment, requires the filer to state the partnership's own
  registered number, category, and original date of registration so
  the Department can match the notice to the correct existing record —
  all three modelled required, since the notice cannot be processed
  without identifying which registered Limited Partnership is being
  renamed.
- New-name block: "Name of Limited Partnership" (single-ruled-line box)
  — the new name being requested, modelled as `newNameOfLimitedPartnership`
  to distinguish it from `presentNameOfLimitedPartnership` above (the
  source prints both under the near-identical label "Name of ... Limited
  Partnership" / "Present name of ... Limited Partnership", disambiguated
  here only by field position and this schema's own naming).
- Declaration block: "Signature of general partner(s): ______", "Name of
  general partner(s): ______", "Date: ______" — unlike the Consent-family
  siblings, **this form prints no "attach a separate sheet" boilerplate**
  for multiple general partners, despite using the same plural "(s)"
  wording; each is modelled as a single field matching the form's own
  single printed line, disclosed as a scope note rather than an
  either/or or multi-value field the source does not itself provide for.
- "Presented by:" block (filer, applicant-fillable): "Name: ______" (two
  printed lines, modelled as one field), "Address: ______" (two printed
  lines, modelled as one field), "Reference: ______" (one line,
  optional) — same convention as every sibling CBRD schema.
- "(For office use)" column, printed alongside "Presented by:": "Other
  fees :... ....." (fee schedule, three unlabeled rows), "Officer's
  Name:", "Sig:", "Date:" — all officer-only, not modelled.
- Footer: "Sheet ___ of ___ (for office use)" plus two small unlabeled
  checkboxes positioned immediately beside it (confirmed via canvas
  render, see above) — officer-only administrative marks, not modelled.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required or unconditionally optional
(`presentedByReference`), unlike the either/or BRN/ID No. pattern on
the Consent-family siblings, which this form does not print. An
ephemeral, uncommitted Node script exercised:

- 1 valid scenario: all required fields supplied, `presentedByReference`
  omitted.
- 9 required-field-omission mutations (one per required field:
  `presentNameOfLimitedPartnership`, `registeredNo`, `category`,
  `dateOfRegistration`, `newNameOfLimitedPartnership`, `declarationDate`,
  `signatureOfGeneralPartner`, `nameOfGeneralPartner`, `presentedByName`,
  `presentedByAddress` — 10 required fields total, each independently
  rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- **Notice of Change in Registered Particulars** (LP7, 47,636 bytes,
  HTTP 200) — the other double-verified item from the GOV-4918
  disclosure, re-confirmed still linked on this cycle's fresh fetch of
  the listing page but not independently re-byte-verified this cycle.
  Left open, disclosed backlog.
- Their Limited Liability Partnership Act 2016 analogues, previously
  disclosed and not re-fetched this cycle: **Notice of Change of Name
  of a Limited Liability Partnership** (LLP5), **Notice of Change in
  Registered Office** (LLP4), **Application for removal of Limited
  Liability Partnership from Register** (LLP8). Left open, disclosed
  backlog.
- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle.
- **Newly surfaced this cycle, not disclosed on any prior CBRD schema's
  VERIFICATION.md** — the listing page hosts a further set of LP/LLP
  companion forms never previously named as banked backlog:
  `NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LLP7.pdf` (an LLP-family
  "Registered Particulars" notice distinct from the LP7 form already
  banked above — the listing page reuses "LP7" and "LLP7" as separate
  form codes, easy to conflate), `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf`,
  `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`,
  `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`,
  `APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
  `RESERVATION-OF-NAME-LLP_LLP3.pdf`, `Annual-Return_LP3.pdf`, and
  `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`. None of these were
  fetched or byte-verified this cycle; flagged here so a future cycle
  re-scans the listing page directly rather than only the previously
  banked candidate names.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
