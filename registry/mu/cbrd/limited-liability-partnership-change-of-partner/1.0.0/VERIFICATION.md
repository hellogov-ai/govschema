# Verification record — mu/cbrd/limited-liability-partnership-change-of-partner@1.0.0

## Candidate selection

GOV-4981 ("GovSchema Standard Research"). Fresh re-scan of `CATALOG.md`
this cycle found the two most-recently-opened jurisdictions structurally
capped for the moment: Türkiye (100th, opened GOV-4818) has all eleven
NVI VAT-series National ID forms authored with no further candidate
banked, and its other five verticals were confirmed dead ends the same
opening cycle; Eswatini (99th, opened GOV-4783) is at 3/6 with Business
Formation, Visa, and Passport all confirmed dead ends, leaving no
further vertical to open. Mauritius's Business Formation vertical
(4/6 jurisdictions open) carries the only disclosed, *confirmed-live*
unauthored candidate left banked from any prior cycle: the GOV-4967
cycle re-checked every item in its own disclosed backlog and found
`NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf` live (HTTP 200) — distinct from
its sibling filename `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf`, which
remains a confirmed dead link (HTTP 404, not re-tested this cycle since
it falls outside this cycle's single-deliverable scope). This is the
direct Limited Liability Partnerships Act 2016 analogue of the
already-authored LP6 sibling (`mu/cbrd/limited-partnership-change-of-general-partner`,
Limited Partnerships Act 2011, Section 22) — picked over the remaining
unscreened batch (name-reservation LP1/LLP3, annual return LP3, a
Foundation change-of-name form) for the same "confirmed-live,
same-Act-family sibling exists" reasoning used to select every prior
CBRD companion schema in this registry.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/NOTICE-OF-CHANGE-OF-PARTNER_LLP6.pdf`

- Independently re-fetched via plain unauthenticated `curl` (`-I` HEAD
  request, then a full download) — no session/cookie state, no
  CAPTCHA/WAF challenge, the same unauthenticated hosting pattern as
  every other CBRD form this registry has already modelled.
- HTTP 200, **48,078 bytes** — an exact match to the byte count
  reported when GOV-4967 first re-confirmed this file live.
- sha256 of the retrieved bytes:
  `360e3e695b843fcb811f0095f687ce9f9df42803d7de778062b1f298df4f2401`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getTextContent()` returned 112 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly (no AcroForm annotations, same as every sibling
  CBRD schema).
- A supplementary canvas render (`node-canvas`, 3x scale) independently
  confirmed the box layout, cropped to the identification and
  partner-particulars rows. As on every prior CBRD render, glyph
  rendering failed via a Helvetica path-resolution warning (the known
  `node-canvas` font-substitution gap documented in this registry's
  `gov-form-pdf-extraction` practice note) — used for box/layout
  confirmation only, not text confirmation.

### Authority attribution

The form's own header ("THE LIMITED LIABILITY PARTNERSHIPS ACT 2016",
"(Section 44(5))", form code "S44(5)-F LLP6") and its hosting directly
on the Corporate and Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
every other CBRD schema in this registry) attribute `authority` to the
Corporate and Business Registration Department (abbreviation CBRD)
directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x) reconstructed the form's row structure — the same method used
on every prior CBRD sibling. A supplementary canvas render (see above)
confirmed the box/line layout where the text layer alone left ambiguity
about box boundaries, specifically the "ID No. /BRN" field (see below).

## Document structure

**Page 1** (single page, 112 extracted text items):

- Header: "FOR OFFICE USE" (shaded label) | "S44 (5) - F LLP6" (printed
  form reference code, not fillable) | "Document Folio" (officer-only
  small box beneath it) — none modelled, same officer-only header
  pattern as every sibling CBRD schema.
- Title block: "THE LIMITED LIABILITY PARTNERSHIPS ACT 2016" / "NOTICE
  OF CHANGE OF PARTNER" / "(Section 44(5))" — static, not modelled.
- **Recurring boilerplate defect, disclosed in a new position**: "If
  there is more than one director, please attach a separate sheet or
  sheets with the consent and certificate of the additional director
  or directors set out in the prescribed format." — the same
  "director"-for-"partner" copy-paste artifact already disclosed on
  this registry's Consent-family and LP6 CBRD schemas, but here printed
  immediately below the section-reference line (y≈713/702) and *above*
  the existing-LLP identification block (y≈677) — i.e. before any field
  identifying the partnership or partner even appears, let alone the
  single signature line the boilerplate's own "additional
  director/directors" language implies a multi-row grid for. This form
  provides no such grid (see `signatureOfPartner` below), the same
  mismatch already disclosed on the LP6 sibling, but positioned even
  further from the field it purports to describe. Not modelled — a
  static print defect, noted on the `signatureOfPartner` field's own
  `description`.
- Existing-LLP identification block: "Name of Limited Liability
  Partnership" (single-ruled-line box), followed by two small bordered
  boxes side-by-side — "Category" (x≈61) and "Registered No." (x≈374),
  confirmed at nearly identical y-coordinates (599.5 vs. 596.4, 3.1
  points apart) both by the text-layer extraction and the canvas
  render. This is a genuine structural pairing with the LP6 sibling's
  own side-by-side "Category"/"LP No." row (not the LLP7/LP7 siblings'
  stacked layout), but this form retains the fuller "Registered No."
  label rather than LP6's abbreviated "LP No." — a combination not seen
  on any other CBRD schema in this registry. Both boxes are modelled
  required, since the notice cannot be processed without identifying
  which registered Limited Liability Partnership's partner is changing.
- Partner-particulars block: "*Full name" (single wide ruled-line box)
  and, in the same row, "ID No. /BRN" over a **single** small bordered
  box — confirmed by a cropped canvas render showing exactly one box
  beneath the combined label, not two. This is a genuinely different
  pattern from the LLP2 consent-of-partner sibling's own two separate
  boxes ("BRN." and "ID No." as distinct either/or fields): here the
  form combines both identifiers under one label over one blank,
  modelled as a single `partnerIdNoOrBrn` field rather than splitting
  into two fields the source does not print as two boxes. "Full
  address" follows as its own wide ruled-line box.
- Date block: "** Date of appointment" and "** Date on which partner
  ceased to hold office", each its own small bordered box, printed
  side-by-side. Both footnote-marked with a double asterisk referencing
  the same "Note:" heading — which prints with **no body text at all**
  on the live source (confirmed absent in both the text-layer
  extraction and the canvas render, the identical blank-footnote defect
  already disclosed on the LP6 sibling). No checkbox or other
  discriminator distinguishes an appointment notice from a cessation
  notice; both are modelled optional with no `requiredWhen` gate, the
  same either/or convention already used on the LP6 sibling.
- Declaration block: "Signature of partner(s): ______", "Name of
  partner(s): ______", "Date ______" — three single dotted lines, not a
  repeatable grid (confirmed by the absence of any second "Signatures"/
  "Full names" column header pair anywhere in the 112 extracted items,
  unlike the LLP7 sibling's own 4-row grid). This form's declaration
  section structurally mirrors the LP6 sibling (single signature line,
  no grid) rather than the LLP7 sibling (4-row grid, no Presented By
  block) — a genuine cross-cutting finding that this LLP6 notice
  follows LP6's own layout family despite being filed under the LLP Act
  rather than the LP Act.
- "Presented by" block: "Name: ______" (two printed lines), "Address
  :______" (two printed lines), "Reference: ______" (one line) —
  confirmed present, matching the LP6/LP5/LLP5/LLP4/LLP8 siblings, not
  the LLP7/LP7 siblings' own disclosed absence of this block.
- Officer-only "(For office use)" column (Officer's Name, Sig, Date)
  and footer "Sheet ___ of ___ (for office use)" — both present,
  neither modelled, same officer-only pattern as every sibling CBRD
  schema.

## Conformance

No `requiredWhen` gates are used — every field on this form is either
unconditionally required or unconditionally optional (the mutually
exclusive `dateOfAppointment`/`dateOfCessation` pair, and the optional
`presentedByReference`). An ephemeral, uncommitted Node script
(`/tmp/gov4981/conformance.mjs`, not committed) exercised:

- 3 valid scenarios: an appointment filing (no `presentedByReference`),
  a cessation filing (with `presentedByReference`), and a filing with
  neither `dateOfAppointment` nor `dateOfCessation` supplied (both are
  optional with no gate, so this is a valid — if degenerate — payload
  per the schema's own field-level requiredness).
- 11 required-field-omission mutations (one per required field, each
  independently rejected as expected).
- 1 unknown-field-rejection mutation, rejected as expected.

All 15 checks passed. Both `node tools/validate.mjs` (689/689) and
`node tools/validate-ajv.mjs` (689/689 against the v0.3 meta-schema)
pass against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing:

- `NOTICE-OF-CHANGE-OF-MANAGER_LLP6.pdf` — the LLP6-coded sibling
  filename to this form, confirmed a genuine dead link (HTTP 404) as of
  the GOV-4967 cycle; not re-tested this cycle.
- Name-reservation (`APPLICATION-FOR-RESERVATION-OF-LIMITED-PARTNERSHIP-NAME_LP1.pdf`,
  `RESERVATION-OF-NAME-LLP_LLP3.pdf`), annual return
  (`Annual-Return_LP3.pdf`), and a Foundation change-of-name form
  (`APPLICATION-TO-CHANGE-NAME-OF-A-FOUNDATION.pdf`) — surfaced on the
  GOV-4925 cycle, still not independently re-verified by any cycle.
- `CONSENT-OF-MANAGER-_LLP2.pdf` — reappeared in the listing's own HTML
  as of the GOV-4960 cycle after being a confirmed dead link since
  GOV-4911; not re-tested live this cycle.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
