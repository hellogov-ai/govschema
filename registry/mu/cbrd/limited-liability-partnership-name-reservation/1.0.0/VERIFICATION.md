# Verification record — mu/cbrd/limited-liability-partnership-name-reservation@1.0.0

## Candidate selection

GOV-4995 ("GovSchema Standard Research"). Fresh re-scan of `CATALOG.md`'s
Executive Summary and the Mauritius `## Known Gaps & Opportunities`
sub-entry found GOV-4988's own disclosed backlog explicitly flagging
LLP3 (name-reservation, Limited Liability Partnerships Act) as "the
most likely next candidate" — the direct LLP-Act analogue of the LP1
(Limited Partnerships Act) schema authored that cycle. No open PR
existed from a prior cycle (`gh pr list --state open` empty), so no
handoff was needed before starting fresh.

This cycle re-fetched the live source directly rather than re-trusting
the GOV-4988 cycle's own byte-count note, per this registry's standing
practice of independently re-verifying before authoring.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/RESERVATION-OF-NAME-LLP_LLP3.pdf`

- Independently re-fetched via plain unauthenticated `curl` (a `-I`
  header check, then a full download) — no session/cookie state, no
  CAPTCHA/WAF challenge, the same unauthenticated hosting pattern as
  every other CBRD form this registry has already modelled.
- HTTP 200, **68,215 bytes** (matches the GOV-4988 cycle's own banked
  estimate exactly).
- sha256 of the retrieved bytes:
  `7c0d4109235345e9636bc8ce2f70063636a44b80e88d9279c23eb0f218852f43`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getTextContent()` returned 176 positioned text items — a genuine
  text layer, with every printed label, checkbox-adjacent caption, and
  blank-line dot-leader run recovered cleanly (no AcroForm annotations,
  same as every sibling CBRD schema).
- A supplementary canvas render (`node-canvas`, 3x scale, cropped to
  two regions: the Category-checkbox/proposed-name-rows band, and the
  declaration/Note/"Tick where appropriate" band) independently
  confirmed box/checkbox layout is pixel-for-pixel identical in
  structure to the already-authored LP1 sibling's own confirmed
  layout: three bordered Category checkboxes, and three proposed-name
  rows each pairing a wide entry box with its own narrower office-use
  box. As on every prior CBRD render, glyph rendering failed via a
  Helvetica path-resolution warning (the known `node-canvas`
  font-substitution gap documented in this registry's
  `gov-form-pdf-extraction` practice note) — used for box/layout
  confirmation only, not text confirmation.

### Authority attribution

The form's own header ("LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 19 (1))", form code "S19(1)-F LLP3") and its hosting directly
on the Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD).

## Structural findings

1. **Direct structural twin of the LP1 sibling, differing only in Act
   and section reference.** Every printed label, box position, and
   layout element matches LP1's own confirmed structure field-for-
   field: applicant identification, a three-way Category checkbox,
   three proposed-name rows each with its own office-use box, a
   signature/date declaration line, a "Presented by" block, and the
   Department's own "FOR OFFICE USE" column. The only textual
   differences are "Limited Liability Partnership" for "Limited
   Partnership" throughout, "Limited Liability Partnerships Act 2016"
   for "Limited Partnerships Act 2011", "Section 19(1)" for "Section
   16(1)", and form code "S19(1)-F LLP3" for "S16.F LP1".

2. **Category checkbox is a verbatim match of LP1's own field.** The
   canvas render confirmed three distinct bordered checkboxes beside
   "Domestic" / "Foreign" / "Global Business", identical in wording,
   position, and layout to the LP1 sibling's own `category` field —
   modelled with the same `domestic` / `foreign` / `global_business`
   enum for consistency.

3. **Three proposed-name rows, each paired with its own small
   "(Office Use)" approval box.** The canvas render confirmed each of
   the preferred-choice, first-alternative, and second-alternative
   rows prints a wide applicant-facing entry box immediately followed
   by a narrower Department-only box — labelled "(Office Use)" once
   beside the preferred-choice row, with the first- and second-
   alternative rows repeating the same narrow box unlabelled, an exact
   structural match of LP1's own confirmed finding. None of the three
   office-use boxes are modelled, consistent with this registry's
   standing convention of excluding Department-internal approval
   fields.

4. **"Tick where appropriate." is an orphaned instruction with no
   adjacent checkbox.** Printed as its own line beneath the Note
   section and above the "Presented by" block (text-layer offset
   `x=86, y=182`), a supplementary canvas crop of that band confirmed
   no checkbox, box, or other markable control appears anywhere near
   it — the identical orphaned template artifact already disclosed on
   the LP1 sibling, not modelled as a field.

5. **Vertical sidebar "Application" watermark text.** The extracted
   text stream includes the fragment "Iaa" (y=717, x=352, a rendering
   artifact near the header) and a vertically-split "A" / "pplicat" /
   "ion" running down the left margin at x=50 — the same decorative
   sidebar label reading "Application" top-to-bottom already seen on
   the LP1 sibling and other CBRD forms. Not modelled.

6. **No "director"-for-"partner" boilerplate defect found.** Checked
   the full extracted text stream for the recurring "director"
   boilerplate substitution bug seen on several other CBRD companion
   schemas; none was found — the form consistently uses "applicant"
   throughout, since no partnership yet exists at the name-reservation
   stage, the same as the LP1 sibling's own finding.

## Requiredness and scoping decisions

Mirrors the LP1 sibling's own decisions field-for-field, since the two
forms are structural twins:

- `applicantFullName`, `applicantPostalAddress`: required — the form
  provides no alternative path to identify the applicant.
- `category`: required, following LP1's own precedent for this
  identical checkbox.
- `proposedNamePreferredChoice`: required — a name-reservation
  application is meaningless without at least one requested name.
- `proposedNameFirstAlternative`, `proposedNameSecondAlternative`:
  optional — the form's own top-of-page note treats alternates as a
  fallback, not a requirement ("If there are more names to be
  reserved, please attach a separate sheet...").
- `signatureOfApplicant`, `declarationDate`: required — standard
  declaration block.
- `presentedByName`, `presentedByAddress`: required, following this
  registry's standing "Presented by" convention.
- `presentedByTelephone`: optional — no asterisk or other mandatory
  marking, matching the LP1 sibling's own equivalent field.

## Validation

- `node tools/validate.mjs`: pass.
- `node tools/validate-ajv.mjs`: pass (all schemas, including this
  one).
- Ephemeral conformance check (not committed): 3 valid scenarios
  (preferred-choice-only; preferred plus both alternatives; preferred
  plus telephone supplied) and 8 required-field-omission mutations (one
  per required field) all rejected as expected, plus 1
  unknown-field-rejection and 1 invalid-enum-value rejection
  (`category: "nonexistent"`) — 13 checks total, all passing.
- `npm run build-index` (in `tools/govschema-client/`): registry index
  rebuilt, 690 → 691 documents.

## Scope and disclosed backlog

Mauritius's Business Formation vertical gains a sixteenth schema.
Mauritius remains 4 of 6 verticals open. The Annual Return (LP3) and
the Foundation change-of-name form both remain confirmed-live,
unauthored backlog for a future cycle — the reappeared-but-unverified
consent-of-manager candidate and the confirmed-dead
`NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` link remain unresolved as well.
