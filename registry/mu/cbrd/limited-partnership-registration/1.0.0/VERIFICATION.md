# Verification record — mu/cbrd/limited-partnership-registration@1.0.0

## Candidate selection

GOV-4624 ("GovSchema Standard Research"). Mauritius opened as the
registry's 92nd jurisdiction via `mu/pio/passport-application` (GOV-4603),
which banked three further STRONG verticals as open backlog: DMV, Business
Formation, and Visa. DMV (`mu/nlta/vehicle-registration-mark-application`,
GOV-4610) and Visa (`mu/pio/visa-application`, GOV-4617) have since been
authored, leaving Business Formation the sole remaining item in that
banked backlog. This schema authors it: the Corporate and Business
Registration Department (CBRD)'s own downloadable-forms page,
`companies.govmu.org/cbrd/downloadable-forms/`, which GOV-4603 had already
independently verified hosts dozens of real, unauthenticated PDFs, naming
a Limited Partnership registration form (~60,000 bytes) as the specific
candidate. Full company incorporation itself routes through the
login-gated CBRIS portal with no static/downloadable equivalent found
(re-confirmed this cycle, no change), so — as GOV-4603 scoped it — this
candidate is the directly-downloadable Limited Partnership registration
form, not company incorporation proper.

The same downloadable-forms page also lists a Limited Liability
Partnership registration form (`LLP1.pdf`) and a Foundation registration
form as siblings; the Limited Partnership form (`LP2.pdf`) was selected as
the one GOV-4603 had already byte-verified and banked by name.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/APPLICATION-FOR-REGISTRATION-OF-A-LIMITED-PARTNERSHIP_LP2.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — the listing page itself (`/cbrd/downloadable-forms/`)
  returned HTTP 200 with no bot-mitigation headers, and the PDF link was
  read directly out of its HTML.
- HTTP 200, **60,153 bytes** retrieved — matching the "~60,000 bytes"
  figure GOV-4603 banked for this candidate.
- sha256 of the retrieved bytes:
  `788c50b20dc7a82c52dc7f751e541151bcec65443164c6777a5d83cfff9e5403`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — not an
  interactive AcroForm.
- `getTextContent()` returned 112 text items on page 1 and 114 on page 2 —
  a genuine text layer, unlike this registry's other three Mauritius
  schemas (all flat scanned images). Every printed label and blank-line
  run (rendered as runs of "." dot characters) was recovered cleanly as
  text, including exact `(x, y)` positions per item.

### Authority attribution

The form's own footer/heading data ("THE LIMITED PARTNERSHIPS ACT 2011",
"S19. F LP2") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed for this registry's scoping record in
GOV-4603) attribute `authority` to the Corporate and Business Registration
Department (abbreviation CBRD) directly.

## Extraction method

Because `getTextContent()` returned a genuine, positioned text layer, the
primary extraction was a positional read: every item's string plus its
`transform` matrix's `(x, y)` origin was dumped and used to reconstruct the
form's two-column and repeating-row layout (grouping same-`y` items into
label/value pairs, and same-`x` runs into repeating rows). A supplementary
canvas render (via `pdfjs-dist` + the vendored `node-canvas` build, this
registry's standard image-only fallback) was also attempted at 2.5x scale
to visually cross-check checkbox positions, but **failed to rasterize most
glyphs** — the rendered pages show the ruled-line grid, checkbox boxes, and
curly-brace groupings clearly, but almost all letterforms are missing
(a `getPathGenerator` "requesting object that isn't resolved yet" warning
was logged for nearly every character). This is a distinct failure mode
from this registry's prior `gov-form-pdf-extraction` cases: there, clean
text extraction and clean rendering both succeeded or both failed
together; here, text extraction succeeded cleanly while rendering failed —
confirming this registry's own caution that "node-canvas can fail to
render glyphs even when text-layer extraction is clean" applies to this
specimen too. The positional text dump, not the render, is the source of
truth for this schema's field order and grouping.

## Document structure

**Page 1** — a declaration preamble followed by the Section 19 particulars
of the proposed Limited Partnership:

- Preamble: "We, the undersigned, being the general partner(s) of the
  proposed Limited Partnership ______, hereby apply for registration as a
  Limited Partnership, and for that purpose supply the following
  particulars, pursuant to section 19 of the Limited Partnerships Act
  2011, and hereby declare that the information contained in the
  application is true and correct." The blank line falls grammatically
  between "of the proposed Limited Partnership" and the comma before
  "hereby apply" — i.e. it calls for the partnership's own proposed name,
  not the general partner's name — so it is modelled as restating
  `nameOfLimitedPartnership`, not as a distinct field.
- Two-column particulars table (label left, blank/checkbox right):
  - "The Name of Limited Partnership" — blank line.
  - "Category" — "Domestic" / "Foreign" / "Global Business" (three
    checkboxes, confirmed against the rendered image, which — unlike the
    glyph text — did rasterize the checkbox squares themselves cleanly).
  - "The General Nature of the Business" — blank line.
  - "The Principal Place of Business" / "The Registered Office:" — two
    separate blank lines.
  - "The duration, if any, for which the Limited Partnership is entered
    into, and the date of its commencement" (a 3-line label spanning two
    fields, grouped by a curly brace in the render) — pairs with "Duration
    (if any) [or N/A] ___ Years" (same row) and "Date of Commencement"
    (own row, its value position not captured by either the text or the
    render, treated as a plain date entry per this registry's usual `date`
    typing).
  - "If no definite duration the conditions of existence of the Limited
    partnership" (a second curly-brace-grouped label) — blank line,
    modelled as the durationless alternative to `durationYears`.
  - "State whether the Limited Partnership have a legal personality" —
    "Yes" / "No" (two checkboxes, confirmed in the render).
  - "FOR OFFICE USE" / "Document Folio" — a top-right officer-only box,
    excluded (same "officer-only, not applicant-supplied" convention this
    registry applies elsewhere, e.g.
    `mu/nlta/vehicle-registration-mark-application`'s own excluded
    "OFFICIAL USE" box).

**Page 2** — "Full Name and Address of each of the Partners", two
repeating-row tables:

- **GENERAL PARTNERS (Full Name)** — 7 blank-ruled rows (positionally
  confirmed: 7 distinct `y` values, each a full-width dotted line), each
  paired at the same `y` with an **Address** blank line in a second column
  further right.
- **LIMITED PARTNERS (Full Name)** — a second, identically laid-out block
  of 7 blank-ruled rows, each again paired with an **Address** column.
  Immediately preceding this block's Address column, positioned at the
  same `y`-range, is a third pair of columns: "Amount contributed or
  undertaken to be contributed by each Limited Partner, and whether paid
  or to be paid in cash or how otherwise" — headed "Capital Contribution",
  "Cash (Rs)" / "Non Cash (Rs)". This column pair sits only alongside the
  Limited Partners rows, not the General Partners rows — consistent with
  capital contribution being a defining feature of a *limited* partner's
  role (as opposed to a general partner's unlimited-liability management
  role) under the Limited Partnerships Act 2011.
- Closing: "Signature of general partner(s): ______", "Date: ______",
  "Issue No. 1 of 16.01.2012" (a form-revision footer, not a field).

## Field model: bounded partner slots

Per this registry's `spec/proposals/0009-repeating-groups.md` (still a
proposal, not yet folded into the ratified v0.3 meta-schema), unbounded
arrays are not representable; repeating structures are modelled as
bounded, explicitly numbered field slots, the same convention this
registry established for `zm/pacra/company-incorporation`'s
`director1*`/`director2*` fields. This form prints exactly 7 blank rows
for General Partners and 7 for Limited Partners (positionally counted, not
estimated), so this schema models `generalPartner1..7FullName`/`Address`
and `limitedPartner1..7FullName`/`Address`/`CashContribution`/
`NonCashContribution` — 14 + 28 = 42 of this schema's 53 total fields.

Unlike the ZM precedent, this form prints no accompanying "number of
partners" count field or "additional partner?" checkbox to gate slots 2-7
on — it simply offers 7 blank lines with no explicit indication of how
many will be used. Rather than invent a discriminator field the source
itself does not show (this registry's standing "don't invent fields the
source doesn't show" practice, e.g. `mu/nlta/vehicle-registration-mark-
application`'s `individualTitle` free-text-not-enum judgment call), slot 1
of each partner type is modelled `required: true` — a limited partnership
by definition under the Limited Partnerships Act 2011 must have at least
one general partner and at least one limited partner — while slots 2-7 are
modelled `required: false` with no `requiredWhen` gate at all.

## Scope: fields and sections excluded

- The "FOR OFFICE USE" / "Document Folio" box (page 1, top right) —
  officer-only.
- "Issue No. 1 of 16.01.2012" (page 2 footer) — a form-revision/print
  identifier, not applicant-supplied data.

## Scope: judgment calls on requiredness

This source carries no asterisk/mandatory-marking convention anywhere
(confirmed across both the text dump and the render), so requiredness was
assigned by engineering judgment:

1. **`nameOfLimitedPartnership`, `category`, `generalNatureOfBusiness`,
   `principalPlaceOfBusiness`, `registeredOffice`, `dateOfCommencement`,
   `hasLegalPersonality`, `signatureOfGeneralPartner`, `declarationDate`
   modelled required** — the form's own core operative content (the
   Section 19 particulars the Limited Partnerships Act itself requires,
   plus the closing signature/date), consistent with this registry's
   standard approach of treating a document's own core declared content
   as required absent contrary evidence.
2. **`durationYears`/`conditionsOfExistenceIfIndefinite` both modelled
   optional, with no `requiredWhen` gate between them.** The form frames
   these as alternatives in prose ("Duration (if any) [or N/A]" vs. "if no
   definite duration, the conditions of existence") but prints no
   checkbox or other selectable field to gate one on the other's absence —
   and this registry's own `notequals-empty-string-absent-field-bug`
   practice specifically warns against gating `requiredWhen` on an
   optional field being empty/absent. Both are left optional rather than
   inventing such a condition.
3. **`generalPartner1FullName`/`Address` and
   `limitedPartner1FullName`/`Address` modelled required; slots 2-7 of
   each modelled optional with no gate.** See "Field model: bounded
   partner slots" above.
4. **`limitedPartner{1-7}CashContribution`/`NonCashContribution` all
   modelled optional.** A limited partner may contribute entirely in cash,
   entirely in kind, or a mix of both; the form does not print an asterisk
   or other mandatory marking on either contribution column, so neither is
   forced required (which would otherwise wrongly demand a "0" entry in
   whichever column a given partner did not use).

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]` conditions (not committed as fixture files, following this
registry's own precedent for other Mauritius specimens, e.g.
`mu/nlta/vehicle-registration-mark-application`): (1) a two-person
domestic Limited Partnership with a fixed term — one general partner
(slot 1 only) and one limited partner (slot 1 only) contributing entirely
in cash, `category` = `domestic`, `durationYears` = `"10"`,
`conditionsOfExistenceIfIndefinite` left blank, `hasLegalPersonality` =
`no` — every slot-1 required field populated, every slot 2-7 field and
`limitedPartner1NonCashContribution` correctly left blank/optional; (2) a
Global Business Limited Partnership with an indefinite term and three
general partners plus two limited partners, one of whom contributes a mix
of cash and in-kind property — `category` = `global_business`,
`durationYears` left as `"N/A"`, `conditionsOfExistenceIfIndefinite`
populated, `hasLegalPersonality` = `yes`, `generalPartner1-3FullName`/
`Address` and `limitedPartner1-2FullName`/`Address` populated (slots 4-7
general, 3-7 limited correctly left blank), `limitedPartner1CashContribution`
and `limitedPartner1NonCashContribution` both populated for the mixed
contributor. Both scenarios validate cleanly against this schema with no
`requiredWhen` conditions to exercise (this schema has none — see judgment
calls above) and no field left inconsistently required/optional across the
two runs.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 53 `fields[]` across 4 steps. No `documents[]` entries — this
specimen discloses no supporting-document checklist anywhere across its
two pages, the same as `mu/nlta/vehicle-registration-mark-application`.

This schema closes Mauritius's entire GOV-4603-banked backlog: DMV,
Business Formation, and Visa are now all authored, alongside Passport —
Mauritius stands at 4 of 6 verticals. Taxes (MRA's individual-return
filing is login-gated) and National ID (the National Identity Card Unit's
own site has no standard first-issue application form) remain confirmed
dead ends per GOV-4603/GOV-4617's own scouting record.
