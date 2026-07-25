# Verification record — mu/cbrd/limited-partnership-consent-of-general-partner@1.0.0

## Candidate selection

GOV-4918 ("GovSchema Standard Research"). The prior cycle (GOV-4911)
authored the Limited Liability Partnership analogue of this form
(`mu/cbrd/limited-liability-partnership-consent-of-partner`, Form LLP2)
and disclosed six further CBRD companion/notice forms as confirmed-live,
open backlog: LLP4 (Notice of Change in Registered Office), LLP5 (Notice
of Change of Name of a Limited Liability Partnership), LLP8 (Application
for removal of Limited Liability Partnership from Register), and their
Limited Partnerships Act 2011 analogues — Consent of General Partner
(LP), LP5 (Notice of Change of Name of a Limited Partnership), and LP7
(Notice of Change in Registered Particulars).

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200) fresh
and located all six disclosed links again, byte-verifying three of them
directly:

- `CONSENT-OF-GENERAL-PARTNER-LP.pdf` — HTTP 200, 48,599 bytes,
  byte-identical to the GOV-4911 cycle's own disclosed estimate.
- `NOTICE-OF-CHANGE-OF-NAME-OF-A-LIMITED-PARTNERSHIP_LP5.pdf` — HTTP 200,
  46,918 bytes, byte-identical to the prior disclosure.
- `NOTICE-OF-CHANGE-IN-REGISTERED-PARTICULARS_LP7.pdf` — HTTP 200, 47,636
  bytes, byte-identical to the prior disclosure.

"Consent of General Partner" was picked as the direct Limited
Partnerships Act 2011 analogue of the LLP2 form already authored last
cycle: it is the first-named item in the disclosed backlog's LP-family
list, of comparable size/simplicity to its LLP2 sibling (both single-page,
~48KB forms), and per this registry's own "one deliverable per PR"
convention is well-scoped as its own schema rather than batched with the
other five remaining companion forms.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/CONSENT-OF-GENERAL-PARTNER-LP.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **48,599 bytes** retrieved.
- sha256 of the retrieved bytes:
  `0bcafc20f00a278a4bdfc19ba941873e897e16e82e731557b931e2cd70d4aac6`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 98 positioned text items — a genuine text
  layer, with every printed label and blank-line dot-leader run
  recovered cleanly, including exact `(x, y)` positions per item. No
  canvas render was needed: like its LLP2 sibling, this form has no
  checkbox or ruled-grid layout ambiguous enough to require visual
  confirmation — every field is a simple labelled blank line.

### Authority attribution

The form's own header ("THE LIMITED PARTNERSHIP ACT 2011", "S 19(2)(9)")
and its hosting directly on the Corporate and Business Registration
Department's own domain (`companies.govmu.org/cbrd/`, the same authority
already attributed on every other CBRD schema in this registry) attribute
`authority` to the Corporate and Business Registration Department
(abbreviation CBRD) directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x) was sufficient to reconstruct the form's row structure. Items
were grouped into visual rows using a 2-point y-tolerance — the same
method already used on the LLP2 sibling.

## Document structure

**Page 1** (single page):

- Header/title: "FOR OFFICE USE" box (top right, with "S 19(2)(9)",
  "Document Folio", "Category", "Partnership No.") and "CONSENT OF
  GENERAL PARTNER" title, both officer-only or non-fillable — not
  modelled.
- Two disclosed-but-unmodelled boilerplate notes, in the same defective
  pattern already found on the LLP2 sibling: "If there is more than one
  director, please attach a separate sheet or sheets with the consent
  and certificate of the additional director or directors set out in
  the prescribed format." — **a genuine finding, recurring across both
  CBRD "Consent" companion forms**: Limited Partnerships have general
  partners and limited partners, never directors, under the Limited
  Partnerships Act 2011; this sentence is evidently boilerplate carried
  over unedited from a companies-registration consent-of-director
  template, identical in substance to the finding already disclosed on
  the LLP2 sibling's own VERIFICATION.md. It is immediately followed by
  a second, correctly-worded sentence: "If there is more than one
  General Partner, please attach a separate sheet or sheets with the
  consent of the additional General Partners set out in the approved
  format." Both are disclosed here rather than silently corrected or
  omitted; neither corresponds to any fillable field.
- Partnership/general-partner identification block: "Name of proposed
  Limited Partnership" (blank); "Full name of General Partner" (blank)
  paired on the same row with "BRN." (blank, right side, for a
  body-corporate general partner); "ID No." (blank, right side, for a
  natural-person general partner); "Full address" (blank). See
  `generalPartnerBrn`'s own field description in `schema.json` for the
  mutually-exclusive-alternate rationale — the form prints no
  discriminator checkbox distinguishing a natural-person from a
  body-corporate general partner, same as the LLP2 sibling.
- Consent declaration: "I consent to act as General Partner of the above
  proposed Limited Partnership." (a static assertion, not a field to
  fill in) followed by "Date: ______" and "Signature: ______" on the
  same row.
- "Presented by:" block: "Name: ______" (two printed lines, modelled as
  one field), "Address: ______" (two printed lines, modelled as one
  field), "Reference: ______" (one line, optional — a filer's own
  internal reference, distinct from the Department's own office-use
  box).
- "(For office use)" box: "Officer's Name:", "Sig:", "Date:" — officer-
  only, not modelled.
- Footer: "Sheet ___ of ___ (for office use)" — officer-only, not
  modelled.

## Conformance

No `requiredWhen` gates are used (the BRN/ID No. pair has no printed
discriminator field to gate on, per this registry's own standing
either/or-pair convention already used on the LLP2/LP2/Foundation
siblings). An ephemeral, uncommitted Node script exercised:

- 2 valid scenarios: (a) a natural-person general partner supplying
  `generalPartnerIdNo` and omitting `generalPartnerBrn`, (b) a
  body-corporate general partner supplying `generalPartnerBrn` and
  omitting `generalPartnerIdNo`.
- 7 required-field-omission mutations (one per required field:
  `nameOfProposedLimitedPartnership`, `generalPartnerFullName`,
  `generalPartnerFullAddress`, `declarationDate`,
  `signatureOfGeneralPartner`, `presentedByName`, `presentedByAddress`)
  each independently rejected as expected.
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing, re-verified this cycle:

- **Notice of Change of Name of a Limited Partnership** (LP5, 46,918
  bytes, HTTP 200) and **Notice of Change in Registered Particulars**
  (LP7, 47,636 bytes, HTTP 200) — both confirmed live and byte-identical
  to the GOV-4911 cycle's own disclosure. Left open, disclosed backlog
  for future companion-schema cycles.
- Their Limited Liability Partnership Act 2016 analogues, previously
  disclosed and not re-fetched this cycle since already byte-verified
  last cycle: **Notice of Change of Name of a Limited Liability
  Partnership** (LLP5), **Notice of Change in Registered Office**
  (LLP4), **Application for removal of Limited Liability Partnership
  from Register** (LLP8). Left open, disclosed backlog.
- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) remain the two
  genuine dead links (HTTP 404) on the Department's own hosting first
  disclosed on the GOV-4911 cycle, not re-tested this cycle. Left open,
  unscreened backlog for a future cycle in case the Department's own
  hosting is fixed or a mirror surfaces.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
