# Verification record — mu/cbrd/limited-partnership-change-of-general-partner@1.0.0

## Candidate selection

GOV-4967 ("GovSchema Standard Research"). The most recent prior cycle
(GOV-4960) disclosed a shrinking unscreened batch of CBRD Mauritius
Business Formation forms surfaced since GOV-4925 but not yet
independently re-verified: change-of-general-partner (this form),
change-of-manager/partner (LLP6, two distinct filenames), name-
reservation (LP1, LLP3), annual return (LP3), and a Foundation change-
of-name form — plus a one-item dead-link backlog (LP4 removal) and a
re-relinked-but-unverified consent-of-manager form.

This cycle re-fetched CBRD's own downloadable-forms listing fresh
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200) and
grepped its raw HTML for every `.pdf` link, then independently checked
the HTTP status of every item in the disclosed batch:

- `NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf` — HTTP 200, 48,014 bytes
- `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf` — HTTP 200, 48,078 bytes
- `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` — HTTP 404 (still dead)
- `APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf` — HTTP 200, 67,647 bytes
- `RESERVATION-OF-NAME-LLP_LLP3.pdf` — HTTP 200, 68,215 bytes
- `Annual-Return_LP3.pdf` — HTTP 200, 51,203 bytes
- `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf` — HTTP 200, 63,218 bytes
- `APPLICATION-FOR-REMOVAL-OF-LIMITED-PARTNERSHIP-FROM-REGISTER-FOR-THE-PURPOSE-OF-TRANFERRING-ITS-REGISTRATION-TO-ANOTHER-COUNTRY_-LP4.pdf`
  (the previously-confirmed-dead LP4 removal form) — **now HTTP 200,
  55,979 bytes, resurrected since GOV-4911's original 404 finding** —
  flagged here for a future cycle to pick up, not independently
  byte-verified beyond this HEAD/status check.
- `CONSENT-OF-MANAGER-_LLP2.pdf` — still HTTP 404, confirmed still dead
  despite reappearing in the listing's own HTML since GOV-4960.

`NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf` was picked over its
siblings as the direct Limited Partnerships Act 2011 analogue of the
already-authored `limited-partnership-change-in-registered-particulars`
(LP7) and `limited-partnership-change-of-name` (LP5) schemas, continuing
the LP-Act notice-form family and closing the largest remaining gap in
that specific sub-series before the LLP6/LP1/LLP3/LP3/Foundation items.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-OF-GENERAL-PARTNER_LP.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **48,014 bytes** retrieved.
- sha256 of the retrieved bytes:
  `b60429ef60f0c7e3022490b6d0285487984b9f1d7ed712009e3e950a3df6d60b`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` was not called explicitly this cycle, but
  `getTextContent()` returned every printed label and blank-line
  dot-leader run as ordinary positioned text items (no widget/form-field
  behavior observed), consistent with every sibling CBRD schema's own
  finding of a non-interactive, text-layer-only PDF.
- `getTextContent()` returned 105 positioned text items. Items were
  sorted by descending y-coordinate (then x) and grouped into rows to
  reconstruct the form's exact top-to-bottom, left-to-right layout.
- A supplementary canvas render (`node-canvas`, 2.5x scale) confirmed
  the box layout (an unruled long box for the partnership name, a
  side-by-side two-box identification row, a long box plus small box
  for the general partner's name/ID, a long box for address, a
  side-by-side two-box date row, three dotted signature/name/date
  lines, and a two-column Presented-By/office-use footer). The render
  dropped the large majority of text glyphs via repeated
  `Helvetica_path_*` resolution warnings — a more severe instance of the
  known `node-canvas` font-substitution gap already documented in this
  registry's own `gov-form-pdf-extraction` practice note — so the render
  was used for box/layout confirmation only, never for text
  confirmation, which relied entirely on the clean text-layer dump.

### Authority attribution

The form's own header ("THE LIMITED PARTNERSHIPS ACT 2011", "(Section
22 of the Act)") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed on every other CBRD schema in this
registry) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD) directly.

**No form-reference code found.** Every other CBRD Limited
Partnership/LLP schema in this registry discloses a small printed
form code near its "FOR OFFICE USE" header (e.g. LP7's "S22." / "F
LP7", LLP7's "S44" / "F LLP7"). A substring search across all 105
extracted text items on this form found no comparable code string
("S22", "F LP", "LP6", etc. all absent) — the header box that would
normally carry it renders as a blank bordered box in the canvas
render too. This schema's title and `id` therefore do not assert a
specific form number (e.g. "LP6"); the form is identified only by its
own printed title, "NOTICE OF CHANGE OF GENERAL PARTNER", and its
section-22 statutory citation, consistent with the precedent already
set by this registry's `mu/cbrd/foundation-registration` schema (whose
title also carries no form-code parenthetical).

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x) reconstructed the form's row structure — the same method used
on every prior CBRD sibling. A supplementary canvas render (see above)
confirmed the box/line layout where the text layer alone left ambiguity
about box boundaries and row grouping.

## Document structure

**Page 1** (single page):

- Header: "FOR OFFICE USE" (shaded label) over "Document Folio"
  (officer-only small box) — no form-reference code visible (see
  Authority attribution above) — none modelled, same officer-only
  header pattern as every sibling CBRD schema.
- Boilerplate note (top of page, static, not modelled): "If there is
  more than one director, please attach a separate sheet or sheets with
  the consent and certificate of the additional director or directors
  set out in the prescribed format." — the same "director"-for-"partner"
  copy-paste artifact already disclosed on this registry's Consent-
  family CBRD schemas (`limited-liability-partnership-consent-of-
  partner`, `limited-partnership-consent-of-general-partner`), now
  confirmed recurring on a third, distinct CBRD form.
- Title block: "THE LIMITED PARTNERSHIPS ACT 2011" / "NOTICE OF CHANGE
  OF GENERAL PARTNER" / "(Section 22 of the Act)" — static, not
  modelled.
- Existing-partnership identification block: "Name of Limited
  Partnership" (single-ruled-line long box), followed by a **side-by-
  side row of two small bordered boxes** — "Category" (left, x≈61) and
  "LP No." (right, x≈418, printed as two glyph runs "L P" then "No.").
  **A genuine structural difference from the LP7 sibling**: LP7's own
  equivalent two boxes ("Registered No.", "Category") are stacked
  vertically at the same x-coordinate (27 points apart), not side-by-
  side — confirmed independently on both forms by each item's own
  x/y-position. This form's box is also labelled "LP No.", not the
  fuller "Registered No." printed by the LP5/LP7 siblings — a genuine
  label difference, not merely a layout difference.
- General partner particulars block: "*Full name" (long ruled-line
  box) and "ID No." (small box, same row) identify the general partner
  whose appointment or cessation is being notified, followed by "Full
  address" (long ruled-line box). Unlike the sibling `limited-
  partnership-consent-of-general-partner` schema, no "BRN." box is
  printed anywhere on this page (confirmed by a substring search) — this
  form has no body-corporate identifier alternative.
- Date-of-change row: a side-by-side pair of small boxes, "** Date of
  appointment" (left) and "** Date on which general partner ceased to
  hold office" (right) — the form prints no checkbox or discriminator
  selecting which applies; both are modelled optional (mutually
  exclusive in practice).
- **The "*" and "**" footnote markers on the above fields reference a
  "Note:" heading printed lower on the page (y≈242) — but no body text
  follows that heading anywhere in the 105 extracted items, and the
  canvas render shows only blank space in that region.** The intended
  footnote content (presumably qualifying which of the two date fields
  is mandatory, or defining "Full name"/"ID No." further) cannot be
  recovered from this document; flagged as a genuine print/layout
  defect on the live source, not an extraction gap.
- Declaration block: "Signature of general partner(s): ______" /
  "Name of general partner(s): ______" / "Date ______" — a single line
  each, not a bounded multi-row grid. **A genuine three-way split now
  disclosed across the LP-family siblings**: LP5 prints neither the
  "attach a separate sheet" boilerplate nor a multi-row grid; LP7 prints
  no such boilerplate but does print an explicit bounded 4-row grid;
  this form prints the boilerplate (see above) yet still provides only
  a single signature/name line, like LP5.
- "Presented by:" block — "Name:" (two printed lines), "Address:" (two
  printed lines), "Reference:" (one line) — same structure and
  modelling convention as every other CBRD Limited Partnership/LLP
  schema in this registry.
- "(For office use)" column (Officer's Name, Sig, Date) and "Sheet ___
  of ___" footer with two small unlabelled boxes (office-use
  checkboxes, no substring label found) — officer-only, not modelled.

## Conformance

No `requiredWhen` gates are used — dateOfAppointment and dateOfCessation
are both modelled unconditionally optional (mutually exclusive in
practice, no discriminator printed), the same either/or convention
already used for this registry's generalPartnerBrn/generalPartnerIdNo
fields on the sibling consent-of-general-partner schema. Every other
field is either unconditionally required (the identification block, the
general partner's own name/ID/address, the declaration signature/name/
date, and presentedByName/presentedByAddress) or unconditionally
optional (dateOfAppointment, dateOfCessation, presentedByReference). An
ephemeral, uncommitted Node script exercised:

- 1 valid scenario: appointment notice — all required fields supplied
  plus `dateOfAppointment`, `dateOfCessation` omitted.
- 1 valid scenario: cessation notice — all required fields supplied
  plus `dateOfCessation` instead of `dateOfAppointment`.
- 1 valid scenario: both dates supplied together (the form does not
  forbid this).
- 9 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing, all independently re-checked live
this cycle (see Candidate selection above):

- **Confirmed still live, unscreened**: `NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`
  (the LLP-Act analogue of this form), `APPLICATION-FOR-RESERVATION-OF-
  LIMITED-PARTNERSHIP-NAME_LP1.pdf`, `RESERVATION-OF-NAME-LLP_LLP3.pdf`,
  `Annual-Return_LP3.pdf`, `APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`.
- **Confirmed still dead (HTTP 404)**: `CONSENT-OF-MANAGER-_LLP2.pdf`,
  `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`.
- **Resurrected since GOV-4911's original dead-link finding**: the LP4
  removal-from-register form now returns HTTP 200 (55,979 bytes) —
  flagged for a future cycle to author, not independently byte-verified
  beyond this status check.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
