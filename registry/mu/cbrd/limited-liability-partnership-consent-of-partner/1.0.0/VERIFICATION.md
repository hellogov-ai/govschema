# Verification record — mu/cbrd/limited-liability-partnership-consent-of-partner@1.0.0

## Candidate selection

GOV-4911 ("GovSchema Standard Research"). The prior cycle (GOV-4904) closed
the last of the three primary CBRD Business Formation registration forms
(LP2, LLP1, Foundation), leaving Mauritius at 4 of 6 verticals with no
further primary-registration candidate open, but its own disclosed backlog
named five LLP1/LP2 companion/notice forms still unauthored:
consent-of-partner, consent-of-manager, change-of-name,
change-of-registered-office, and removal-from-register.

This cycle re-fetched CBRD's own downloadable-forms listing
(`https://companies.govmu.org/cbrd/downloadable-forms/`, HTTP 200) fresh
rather than trusting the prior cycle's disclosure alone, and located all
five real form links under the "Limited Liability Partnerships Act 2016"
heading plus four Limited Partnerships Act 2011 siblings under the LP
heading. Two links were byte-verified:

- `CONSENT-OF-PARTNER_LLP2.pdf` — HTTP 200, 48,793 bytes, a genuine,
  small (1 page) consent form.
- `CONSENT-OF-MANAGER-_LLP2.pdf` — HTTP 404 on direct fetch (both plain
  `curl` and with a browser `User-Agent` header), despite being linked
  live from the listing page's own HTML three separate times. The
  Department's own CDN/webserver appears to reject this specific
  filename (the trailing hyphen before the underscore in
  `CONSENT-OF-MANAGER-_LLP2.pdf` is one plausible cause, but not
  confirmed) — a genuine, disclosed dead link, not a scoping choice.
  Left as open, unscreened backlog for a future cycle in case the
  Department's own hosting is fixed or a mirror surfaces.

Between the two remaining reachable candidates from the LLP1 family
tried this cycle, "Consent of Partner" was picked: it is the first-named
item in this schema's own disclosed backlog list and, once fetched, was
confirmed to be a clean single-page form suitable for a single,
well-scoped PR (per this registry's own "one deliverable per PR"
convention) rather than batching multiple companion forms together.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/CONSENT-OF-PARTNER_LLP2.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — same unauthenticated hosting pattern as every other CBRD
  form this registry has already modelled.
- HTTP 200, **48,793 bytes** retrieved.
- sha256 of the retrieved bytes:
  `fcae66cd8ae626626a6fc7936f0aef684d64b61ae96839dab6a7d8e46945b349`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 form-field annotations — not an
  interactive AcroForm, same as every sibling CBRD schema.
- `getTextContent()` returned 114 positioned text items — a genuine
  text layer, with every printed label and blank-line dot-leader run
  recovered cleanly, including exact `(x, y)` positions per item. No
  canvas render was needed: unlike the LP2/LLP1/Foundation siblings,
  this form has no checkbox or ruled-grid layout ambiguous enough to
  require visual confirmation — every field is a simple labelled blank
  line.

### Authority attribution

The form's own header ("S23-F LLP2 THE LIMITED LIABILITY PARTNERSHIP ACT
2016") and its hosting directly on the Corporate and Business
Registration Department's own domain (`companies.govmu.org/cbrd/`, the
same authority already attributed on the LP2/LLP1/Foundation siblings)
attribute `authority` to the Corporate and Business Registration
Department (abbreviation CBRD) directly.

## Extraction method

A single positional text-layer dump (sorted by descending y-coordinate,
then x) was sufficient to reconstruct the form's row structure. Items
were grouped into visual rows using a 2-point y-tolerance.

## Document structure

**Page 1** (single page):

- Header/title: "FOR OFFICE USE" box (top right) and "CONSENT OF
  PARTNER (Section 23)" title, both officer-only or non-fillable — not
  modelled.
- Two disclosed-but-unmodelled boilerplate notes: "If there is more than
  one Partner, please attach a separate sheet or sheets with the consent
  of the additional Partners set out in the approved format" (an
  instruction, not a field), immediately preceded on the same page by a
  near-identical sentence referring to "director" instead of "Partner" —
  **a genuine finding**: Limited Liability Partnerships have partners and
  managers, never directors, under the Limited Liability Partnerships
  Act 2016; this second sentence is evidently boilerplate carried over
  unedited from a companies-registration consent-of-director template.
  Disclosed here rather than silently corrected or omitted; it does not
  correspond to any fillable field either way.
- Partner/partnership identification block: "Name of proposed Limited
  Liability Partnership" (blank); "Full name of Partner" (blank) paired
  on the same row with "BRN." (blank, right side, for a body-corporate
  partner); "ID No." (blank, right side, for a natural-person partner);
  "Full address" (blank). See `partnerBrn`'s own field description in
  `schema.json` for the mutually-exclusive-alternate rationale — the
  form prints no discriminator checkbox distinguishing a natural-person
  from a body-corporate partner.
- Consent declaration: "I consent to act as Partner of the above
  proposed Limited Liability Partnership." (a static assertion, not a
  field to fill in) followed by "Date: ______" and "Signature:
  ______" on the same row.
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
either/or-pair convention already used on the LP2/LLP1 siblings'
duration fields). An ephemeral, uncommitted Node script exercised:

- 2 valid scenarios: (a) a natural-person partner supplying `partnerIdNo`
  and omitting `partnerBrn`, (b) a body-corporate partner supplying
  `partnerBrn` and omitting `partnerIdNo`.
- 8 required-field-omission mutations (one per required field:
  `nameOfProposedLimitedLiabilityPartnership`, `partnerFullName`,
  `partnerFullAddress`, `declarationDate`, `signatureOfPartner`,
  `presentedByName`, `presentedByAddress`) each independently rejected as
  expected.
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model any of the other companion/notice forms on
the same downloadable-forms listing, each re-verified this cycle:

- **Consent of Manager** (LLP2 sibling form) and **Application for
  Removal of Limited Partnership from Register** (LP4) — both linked
  live from the listing page's own HTML, but both **404 on direct
  fetch** (`CONSENT-OF-MANAGER-_LLP2.pdf` and
  `...-TRANFERRING-...-LP4.pdf` respectively) — genuine dead links on
  the Department's own hosting, not a scoping choice. Left open,
  unscreened backlog.
- **Notice of Change of Name of a Limited Liability Partnership**
  (LLP5, 47,107 bytes, HTTP 200), **Notice of Change in Registered
  Office** (LLP4, 47,286 bytes, HTTP 200), and **Application for
  removal of Limited Liability Partnership from Register** (LLP8,
  54,643 bytes, HTTP 200) — confirmed live and byte-verifiable this
  cycle. Left open, disclosed backlog for future companion-schema
  cycles.
- Their Limited Partnerships Act 2011 analogues, also confirmed live
  this cycle: **Consent of General Partner** (48,599 bytes, HTTP 200),
  **Notice of Change of Name of a Limited Partnership** (LP5, 46,918
  bytes, HTTP 200), **Notice of Change in Registered Particulars** (LP7,
  47,636 bytes, HTTP 200). Left open, disclosed backlog for future
  companion-schema cycles.

Full company incorporation itself remains out of scope (login-gated
CBRIS portal, no static equivalent, per every prior CBRD schema's own
disclosed scope).
