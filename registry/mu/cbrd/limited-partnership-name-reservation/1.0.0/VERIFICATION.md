# Verification record — mu/cbrd/limited-partnership-name-reservation@1.0.0

## Candidate selection

GOV-4988 ("GovSchema Standard Research"). Fresh re-scan of `CATALOG.md`'s
Executive Summary found the two most-recently-authored CBRD schemas
(GOV-4974's LP4 removal, GOV-4981's LLP6 change-of-partner) both
disclosing the same remaining backlog: name-reservation forms LP1
(Limited Partnerships Act) and LLP3 (Limited Liability Partnerships
Act), the Annual Return (LP3), and a Foundation change-of-name form —
none of these four re-verified live by any prior cycle, only named.

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200)
fresh and confirmed all four are still linked and live:
`APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf` (HTTP
200, 67,647 bytes), `RESERVATION-OF-NAME-LLP_LLP3.pdf` (HTTP 200,
68,215 bytes), `Annual-Return_LP3.pdf` (HTTP 200, 51,203 bytes), and
`APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf` (HTTP 200, 63,218
bytes). The confirmed-dead `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` link
was also re-tested and remains HTTP 404.

**LP1** ("Application for Reservation of Limited Partnership Name") was
picked over its three siblings per this registry's "one deliverable per
PR" convention: it is the direct Limited Partnerships Act 2011
counterpart of the already-authored LP2 (registration) schema, sharing
LP2's own "Category" (Domestic/Foreign/Global Business) checkbox
verbatim, and is a natural companion to file immediately before LP2 in
an actual applicant's own filing sequence (reserve a name, then
register the partnership). LLP3, Annual-Return LP3, and the Foundation
change-of-name form remain open backlog for a future cycle.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`

- Independently re-fetched via plain unauthenticated `curl` (a `-o
  /dev/null -w` byte-count check, then a full download) — no
  session/cookie state, no CAPTCHA/WAF challenge, the same
  unauthenticated hosting pattern as every other CBRD form this
  registry has already modelled.
- HTTP 200, **67,647 bytes**.
- sha256 of the retrieved bytes:
  `375c648f588d1babd274a26d48c5c3cee0433acc6fbe756fa73e4308d71bee18`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getTextContent()` returned 131 positioned text items — a genuine
  text layer, with every printed label, checkbox-adjacent caption, and
  blank-line dot-leader run recovered cleanly (no AcroForm annotations,
  same as every sibling CBRD schema).
- A supplementary canvas render (`node-canvas`, 3x scale, cropped to
  four regions: the Category checkbox row, the "Tick where appropriate"
  instruction, the applicant-identification boxes, and the three
  proposed-name rows) independently confirmed box/checkbox layout. As
  on every prior CBRD render, glyph rendering failed via a Helvetica
  path-resolution warning (the known `node-canvas` font-substitution
  gap documented in this registry's `gov-form-pdf-extraction` practice
  note) — used for box/layout confirmation only, not text confirmation.

### Authority attribution

The form's own header ("LIMITED PARTNERSHIPS ACT 2011", "(Section
16(1))", form code "S16.F LP1") and its hosting directly on the
Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD).

## Structural findings

1. **Category checkbox is a verbatim match of LP2's own field.** The
   canvas render confirmed three distinct bordered checkboxes beside
   "Domestic" / "Foreign" / "Global Business", identical in wording and
   layout to the already-authored `limited-partnership-registration`
   (LP2) schema's own `category` field — modelled with the same
   `domestic` / `foreign` / `global_business` enum for consistency.

2. **Three proposed-name rows, each paired with its own small
   "(Office Use)" approval box.** The canvas render confirmed each of
   the preferred-choice, first-alternative, and second-alternative rows
   prints a wide applicant-facing entry box immediately followed by a
   narrower Department-only box (visible once, labelled "(Office Use)",
   beside the preferred-choice row; the first- and second-alternative
   rows repeat the same narrow box unlabelled). None of the three
   office-use boxes are modelled, consistent with this registry's
   standing convention of excluding Department-internal approval
   fields.

3. **"Tick where appropriate." is an orphaned instruction with no
   adjacent checkbox.** Printed as its own line beneath Note (3) and
   above the "Presented by" block, a wider canvas crop (y=1550-1950 at
   3x scale) confirmed no checkbox, box, or other markable control
   appears anywhere near it — it is not modelled as a field. The most
   likely reading is that it is leftover boilerplate referring back to
   the Category checkboxes higher on the page (the form's only
   checkboxes), printed in a fixed template position rather than
   directly beside them.

4. **Vertical sidebar "Application" watermark text.** The extracted
   text stream includes fragments "Iaa" (y=717.1, x=352.4, likely a
   rendering artifact near the header) and a vertically-split "A" /
   "pplicat" / "ion" running down the left margin at x=50.4 — a
   decorative sidebar label reading "Application" top-to-bottom, the
   same non-field template decoration seen on other CBRD forms. Not
   modelled.

5. **No "director"-for-"partner" boilerplate defect found.** Unlike
   several prior CBRD companion schemas, this form's text was checked
   for the recurring "director" boilerplate substitution bug and none
   was found — the form consistently uses "applicant" throughout, since
   no partnership yet exists at the name-reservation stage.

## Requiredness and scoping decisions

- `applicantFullName`, `applicantPostalAddress`: required — the form
  provides no alternative path to identify the applicant.
- `category`: required, following LP2's own precedent for this
  identical checkbox.
- `proposedNamePreferredChoice`: required — a name-reservation
  application is meaningless without at least one requested name.
- `proposedNameFirstAlternative`, `proposedNameSecondAlternative`:
  optional — the form's own top-of-page note treats alternates as a
  fallback, not a requirement ("If there are more names to be reserved,
  please attach a separate sheet...").
- `signatureOfApplicant`, `declarationDate`: required — standard
  declaration block.
- `presentedByName`, `presentedByAddress`: required, following this
  registry's standing "Presented by" convention (see LP5's own
  VERIFICATION.md).
- `presentedByTelephone`: optional — no asterisk or other mandatory
  marking, and the LP5 sibling's equivalent-position "Reference" field
  is likewise optional.

## Validation

- `node tools/validate.mjs`: pass.
- `node tools/validate-ajv.mjs`: pass (all schemas, including this one).
- Ephemeral conformance check (not committed): 3 valid scenarios
  (preferred-choice-only; preferred plus both alternatives; preferred
  plus telephone supplied) and 8 required-field-omission mutations (one
  per required field) all rejected as expected, plus 1
  unknown-field-rejection and 1 invalid-enum-value rejection (`category:
  "nonexistent"`) — 13 checks total, all passing.
- `npm run build-index` (in `tools/govschema-client/`): registry index
  rebuilt, 689 → 690 documents.

## Scope and disclosed backlog

Mauritius's Business Formation vertical gains a fifteenth schema.
Mauritius remains 4 of 6 verticals open. LLP3 (name reservation, LLP
Act), Annual-Return LP3, and the Foundation change-of-name form all
remain confirmed-live, unauthored backlog for a future cycle — LLP3 is
the most likely next candidate, as the direct LLP-Act analogue of this
schema.
