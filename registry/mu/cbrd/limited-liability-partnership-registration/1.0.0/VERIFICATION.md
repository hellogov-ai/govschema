# Verification record — mu/cbrd/limited-liability-partnership-registration@1.0.0

## Candidate selection

GOV-4897 ("GovSchema Standard Research"). The prior cycle (GOV-4890) closed
the registry's entire banked Türkiye NVI VAT-series backlog (all 11 forms
authored), leaving no banked candidate open in that jurisdiction. This
cycle re-scanned `CATALOG.md`'s `## By Jurisdiction` table for the fastest
remaining path to closing an open vertical, and re-screened the two
strongest-looking single-vertical gaps with fresh live evidence:

- **Tunisia DMV** (`attt.com.tn`) — re-confirmed unreachable this cycle
  (direct `curl` times out; the only Wayback Machine snapshot is from
  2012, too stale to be a live-source specimen), unchanged from the
  GOV-4638/GOV-4673/GOV-4748 findings across three prior cycles. Not
  pursued further.
- **Lesotho's three remaining verticals** (DMV, Passport, Visa), left as
  "soft backlog, not hard-confirmed dead ends" by GOV-4748/4755/4762/4783
  because those cycles only used `WebFetch`/`curl`, never a real rendered
  browser — following this registry's own precedent (GOV-4783/GOV-4797)
  that a real Chromium/Playwright session has previously overturned
  `curl`-only "dead end" findings. This cycle ran a real headless Chromium
  session (recipe documented in the `browser-playwright-sandboxed-env-setup`
  memory) against all three:
  - `mopwt.gov.ls` renders fully (HTTP 200, real WordPress site, 49 links
    enumerated) but its "Departments" section lists only Administration,
    Building Design Services, and Roads Directorate — no Traffic and
    Transport Department — and neither its "Documents" nor "Other
    Downloads" pages (also fetched fresh) list any driving-licence or
    vehicle-registration form. **DMV is now a confirmed dead end**
    (upgraded from soft backlog).
  - `passports.homeaffairs.gov.ls` renders as a single-page "Lesotho
    Passport Status" application-number checker with exactly one link
    ("Need Help?") — confirming, with a real browser, GOV-4783's own
    `curl`-based finding that this domain is genuinely just a status
    checker, not an application form. **Passport is now a confirmed dead
    end** (upgraded from soft backlog).
  - `evisa.gov.ls` fails outright at the DNS level
    (`net::ERR_NAME_NOT_RESOLVED`) even under a real browser. **Visa is
    now a confirmed dead end** (upgraded from soft backlog).
  - Net result: **Lesotho's real ceiling is 2 of 6** (Business Formation,
    Taxes) — its DMV/Passport/Visa backlog is now exhausted, not merely
    unscreened. This is a genuine, useful negative finding (recorded in
    `CATALOG.md`) even though it produced no new schema.

With both re-screened leads exhausted, this cycle fell back to a
disclosed, already-open-vertical companion candidate instead of scouting
a brand-new jurisdiction: the sibling `mu/cbrd/limited-partnership-registration`
(Form LP2, GOV-4624)'s own VERIFICATION.md discloses that the same CBRD
downloadable-forms page also lists a Limited Liability Partnership
registration form (`LLP1.pdf`) and a Foundation registration form as
untouched siblings. Both were re-fetched and compared this cycle
(`pdfjs-dist` positional text-layer extraction): LLP1 (2 pages, 255 text
items) is substantially denser than the Foundation form (4 pages, 95 text
items, mostly boilerplate/instructions) — the same widget/field-count-bar
selection precedent this registry uses elsewhere — so LLP1 was selected.
The Foundation registration form remains open, disclosed backlog for a
future Mauritius Business Formation companion-schema cycle.

## Reaching the live source

`https://companies.govmu.org/cbrd/wp-content/uploads/2025/08/APPLICATION-FOR-REGISTRATION-OF-A-LIMITED-LIABILITY-PARTNERSHIP_-LLP1.pdf`

- Plain unauthenticated `curl`, no session/cookie state, no CAPTCHA/WAF
  challenge — the listing page itself (`/cbrd/downloadable-forms/`)
  returned HTTP 200 with no bot-mitigation headers, and the PDF link was
  read directly out of its HTML alongside the already-authored LP2 and
  the still-open Foundation form.
- HTTP 200, **61,101 bytes** retrieved.
- sha256 of the retrieved bytes:
  `d334c4eac7637cdbdf6fe113bc5c41e2a8d508207e97165913674cab96beee3f`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — not an
  interactive AcroForm, same as the LP2 sibling.
- `getTextContent()` returned 143 text items on page 1 and 112 on page 2 —
  a genuine text layer, with every printed label and blank-line run
  (rendered as runs of "." dot-leader characters) recovered cleanly as
  text, including exact `(x, y)` positions per item.

### Authority attribution

The form's own footer/heading data ("THE LIMITED LIABILITY PARTNERSHIPS
ACT 2016", "S23. F LLP1") and its hosting directly on the Corporate and
Business Registration Department's own domain
(`companies.govmu.org/cbrd/`, the same authority already attributed on
the LP2 sibling) attribute `authority` to the Corporate and Business
Registration Department (abbreviation CBRD) directly.

## Extraction method

Because `getTextContent()` returned a genuine, positioned text layer
(same as LP2), the primary extraction was a positional read: every item's
string plus its `transform` matrix's `(x, y)` origin was dumped and used
to reconstruct the form's particulars table, the two bounded partner/
manager grids, and the closing declaration block.

A supplementary canvas render (via `pdfjs-dist` + the vendored
`node-canvas` build, `LD_LIBRARY_PATH=/tmp/node_modules/canvas/build/Release`)
was run at 2.5x scale to visually cross-check the "Category" checkboxes
and the capital-contribution table's ruled-line grid. As with the LP2
sibling, **glyph rasterization failed almost entirely** (`getPathGenerator
"requesting object that isn't resolved yet"` warnings for nearly every
character) while ruled lines, table borders, and the three checkbox
squares rendered cleanly — the same "clean text extraction, failed
render" split already disclosed as a distinct failure mode on the LP2
sibling and in this registry's own `gov-form-pdf-extraction` precedent.
The positional text dump is the source of truth for field order and
grouping; the render was consulted only for checkbox layout and the
finding described next.

### Genuine finding: undivided capital-contribution entry area

Page 2's column header — "Full Name and Address of each of the Partners"
/ "Amount contributed or undertaken to be contributed by each Partner,
and whether paid or to be paid in cash or how otherwise" / "Capital
Contribution (Rs) — Cash / Non Cash" — is worded almost identically to
the LP2 sibling's own limited-partner table header, and by its own text
implies a per-partner entry. But the canvas render shows the ruled
Cash/Non-Cash box is a **single undivided rectangle spanning the full
height of both the PARTNERS (5 rows) and MANAGER (5 rows) tables below
it**, with no internal horizontal ruling dividing it by row at all — a
different (and more ambiguous) rendering than LP2, where each limited
partner's own row carries its own printed Cash/Non-Cash cells. This
schema does not fabricate a per-partner or per-manager division the
source does not print; `totalCashContribution`/`totalNonCashContribution`
are modelled as one aggregate declaration each, both optional, with the
finding disclosed on both fields' own `description`.

## Document structure

**Page 1** — preamble declaration plus the Section 23 particulars of the
proposed Limited Liability Partnership:

- Preamble: "We, the undersigned, being the partner(s) of the proposed
  Limited Liability Partnership ______, hereby apply for registration as
  a Limited Liability Partnership, and for that purpose supply the
  following particulars, pursuant to section 23 of the Limited Liability
  Partnerships Act 2016, and hereby declare that the information
  contained in the application is true and correct." Restates
  `nameOfLimitedLiabilityPartnership`, per the same grammatical-parse
  convention already used on the LP2 sibling.
- Particulars table: Name of Limited Liability Partnership (blank);
  Category (Domestic/Foreign/Global Business checkboxes); General Nature
  of the Business (blank, two printed lines); Principal Place of Business
  (blank, two printed lines); Registered Office (blank, two printed
  lines); **Service Address** (blank, two printed lines — a field with no
  equivalent on the LP2 sibling, which prints no separate service-address
  row of its own); Duration (if any, or N/A, in years) paired with "if no
  definite duration, the conditions of existence" (both optional, no
  requiredWhen gate — printed as an either/or pair with no checkbox
  discriminator, same convention as LP2's own duration fields); Date of
  Commencement.
- Unlike the LP2 sibling, this form prints **no** "does the partnership
  have a legal personality" question — consistent with the Limited
  Liability Partnerships Act 2016 treating every LLP as a body corporate
  with separate legal personality by default, not an elective choice as
  under the Limited Partnerships Act 2011. Not modelled, since the source
  does not print it.

**Page 2** — bounded partner/manager grids, capital contribution, and
declaration:

- **PARTNERS** — "(Full Name)" / "Address" column headers, 5 blank-ruled
  rows. At least one partner is a legal precondition of an LLP, so slot 1
  is required; slots 2-5 are optional (no printed count/checkbox
  discriminator), per this registry's standing bounded-slot convention.
- **MANAGER** — "(Full Name)" / "Address" column headers, 5 blank-ruled
  rows (rows 3-5 print the address column as two adjoining dotted-line
  text runs rather than one, a font-width text-extraction artifact, not a
  third column — confirmed by their combined x-span matching rows 1-2's
  single address column). At least one manager is a legal precondition of
  an LLP under the Act (the LLP's equivalent of a company director), so
  slot 1 is required; slots 2-5 are optional, same convention.
- **Capital Contribution (Rs) — Cash / Non Cash** — see the "genuine
  finding" section above; modelled as `totalCashContribution`/
  `totalNonCashContribution`, both optional.
- **Declaration** — "Signature of applicant: ______", "Name: ______",
  "Residential address/Registered Office: ______" (one combined caption
  accommodating either a natural-person applicant or a body-corporate
  partner/manager acting as applicant, modelled as one field), "Service
  address: ______", "Date: ______". A footer line ("Issue No. of 2016")
  is a form-version stamp, not an applicant-facing field, and is not
  modelled.

## Conformance

No `requiredWhen` gates are used in this schema (all conditional-seeming
fields — durationYears/conditionsOfExistenceIfIndefinite — are printed as
an unconditioned either/or pair with no discriminator field, matching the
LP2 sibling's own precedent for the same pair). An ephemeral, uncommitted
Node script exercised:

- 2 valid scenarios: (a) a minimal single-partner/single-manager LLP with
  a fixed duration, (b) a multi-partner/multi-manager global-business LLP
  with an indefinite duration and both cash and non-cash capital
  contributions declared.
- 11 required-field-omission mutations (one per required field:
  `nameOfLimitedLiabilityPartnership`, `category`,
  `generalNatureOfBusiness`, `principalPlaceOfBusiness`,
  `registeredOffice`, `serviceAddress`, `dateOfCommencement`,
  `partner1FullName`, `partner1Address`, `manager1FullName`,
  `manager1Address`, `signatureOfApplicant`, `applicantName`,
  `applicantResidentialAddressOrRegisteredOffice`,
  `applicantServiceAddress`, `declarationDate`) each independently
  rejected as expected.
- 1 unknown-field-rejection mutation, rejected as expected.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass
against the full registry with this schema included.

## Scope and disclosed backlog

This schema does not model: the Foundation registration form (the other
disclosed CBRD sibling, banked as open backlog for a future cycle); full
company incorporation (login-gated CBRIS portal, no static equivalent);
or any of the LLP1 companion/notice forms visible on the same
downloadable-forms listing (e.g. LLP1's own consent-of-partner/
consent-of-manager companions, change-of-name, change-of-registered-
office, and removal-from-register notices) — all open, disclosed backlog
for a future Mauritius Business Formation companion-schema cycle.
