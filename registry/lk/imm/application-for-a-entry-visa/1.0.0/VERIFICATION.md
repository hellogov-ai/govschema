# Verification record — `lk/imm/application-for-a-entry-visa` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2789**, opening **Sri
Lanka's Visa vertical (4 of 6)**, following Passport
(`lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate`,
GOV-2716, 47th jurisdiction), National ID & Civic Documents
(`lk/drp/application-for-a-national-identity-card`, GOV-2753), and DMV
(`lk/dmt/application-for-a-revenue-licence-for-a-motor-vehicle`, GOV-2781).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i lk-imm` and `git log --all --oneline | grep
-i "entry-visa\|entry_visit_visa\|lk/imm"` before starting — no existing
branch, commit, or PR for this candidate. Also searched the Paperclip board
for any open issue mentioning "Sri Lanka" or "entry visa" beyond the closed
GOV-2716/2753/2781 chain — none found, so no reconciliation was needed.

## Candidate selection

This candidate was disclosed as the strongest ready-to-author backlog item
for Sri Lanka's Visa vertical in `GOV-2781`'s own `VERIFICATION.md`
("**Visa — strong, not authored this cycle, left as backlog.**"). Rather
than re-scouting from scratch, this cycle re-verified that disclosed claim
independently before authoring:

- **Source is still live and unauthenticated**, fetched from scratch via
  `curl -sL`: `https://www.immigration.gov.lk/content/files/visa/entry_visit_visa.pdf`
  — **HTTP 200**, **`Content-Type: application/pdf`**, **359,721 bytes**.
  `sha256`: `78dfa0be2ee5d9afe32cfd37ae8083ab8f3dbe75a53065221614760ee74aa22`
  (computed via `sha256sum`), matching GOV-2781's own independently reported
  hash byte-for-byte. A separate `curl -I` confirms `last-modified: Thu, 29
  Dec 2022 06:43:45 GMT` — a static, long-unchanged specimen, consistent
  with a stable general-purpose entry-visa form rather than a frequently
  revised one.
- **Not superseded by the ETA system, independently re-checked.** Fetched
  `https://eta.gov.lk/slvisa/visainfo/center.jsp?locale=en_US` directly: the
  ETA (Electronic Travel Authorization) online system covers **tourist
  visas only**, for nationals of a fixed list of ETA-eligible countries
  (30-day, double-entry under specified conditions), with diplomatic/
  official/service passport holders exempted from ETA entirely and directed
  to "alternative options." The ETA page has no downloadable static form of
  its own and does not address resident visas, "other purpose" visas, or
  gratis-visa-exemption cases at all — all of which Form B explicitly
  covers (item 16: Tourist / Applied for resident visa / Other Purpose).
  This confirms GOV-2781's claim that Form B "coexists as a separate
  free-of-charge channel" rather than being superseded.
- Domain `immigration.gov.lk` is the correct, official first-party national
  agency (Department of Immigration & Emigration) — the same authority
  (`imm`) already used for this registry's `lk/imm` passport schema.

## PDF structure, independently confirmed via `pdfjs-dist`

- **5 pages.** Confirmed via `pdfjs-dist@3` (legacy build, scratch install
  in `/tmp`, never inside `tools/`): `getFieldObjects()` returned **`none`**
  (no AcroForm fields) on the whole document; zero Widget annotations on
  every page.
- **`getTextContent()` returned zero non-whitespace text items on every
  page** — unlike the sibling `lk/dmt`/`lk/drp` forms (both genuine
  positioned-text PDFs), this specimen is a **scanned/rasterized** document
  with no extractable text layer at all. Confirmed this is not a font-
  loading artifact (the `lk/dmt`/`lk/imm`-passport precedent gotcha where a
  blank-glyph render was actually a missing `standardFontDataUrl`) by
  rendering with `standardFontDataUrl` explicitly set to the installed
  package's `standard_fonts/` directory and still getting zero text items
  from `getTextContent()` — the absence is in the PDF's content stream
  itself (image XObjects, not text operators), not a font-resolution
  failure.
- **Rendered all 5 pages to PNG** via `pdfjs-dist` + `node-canvas` (2x
  scale, custom `NodeCanvasFactory`) and read every field directly off the
  rendered images. Page 1: passport/personal-particulars block with the
  "Affix a photograph" box. Pages 2-4: continuing personal/travel
  particulars, references, and financial-means questions, ending in the
  declaration, date, and signature line. **Page 5 is entirely "Office Use
  Only"**: gratis/visit-visa grant particulars, visa number, correspondence
  number, the overseas-mission officer's name/designation, a visa-
  endorsement box, a duplicate office-copy photograph box, a duplicate
  finger-mark box, and a duplicate "Receives Passport" / signature line —
  every item on page 5 is completed or affixed by the issuing office, not
  the applicant, and is excluded in full from `fields[]`, consistent with
  this registry's established convention for the same class of content
  (e.g. `lk/dmt` page 2, `rs/mup`'s deciding-authority items, `rs/mfa`'s
  consular-only column).

## Scope: what is modeled as `fields[]`, and what is excluded

**Included** (pages 1-4, applicant-facing, 61 fields): present/previous
passport particulars, full name, nationality, naturalization detail,
gender, date/place/country of birth, civil status with a conditional spouse
block (`spouseFullName`/`spouseNationality`/`spousePostalAddress`/
`spousePassportNumber`/`spousePassportDateOfExpiry`, all gated
`requiredWhen civilStatus == married`), height, identification marks,
domicile and Sri Lanka addresses, profession/employer/business detail,
contact numbers, object of visit (with a conditional "other, specify"),
route/mode of travel, requested visa period, an optional "previously in Sri
Lanka" block (last residence, date of leaving, and the last visa obtained's
own sub-block — type, conditional specify, issue date, validity, and a
conditional resident-visa number), a free-text prior-refusal narrative, two
fixed reference-contact blocks (a person in Sri Lanka; a responsible person
in the applicant's home country — each flattened to
name/address/contactNumber/relationship fields rather than a generic table,
matching this registry's established precedent for a fixed, small number of
named contacts, e.g. `in/mha/evisa-etourist`'s
`referenceName/Address/PhoneIndia` + `.../HomeCountry` pairing), funds
available in US$, optional credit-card detail, an optional supporting-
reason narrative, and the application date.

**Excluded:** page 5 in full (office-only content, see above); the
"Signature of applicant" line and the "Finger mark of the applicant" box
(both physical marks, not structured data — consistent with this registry's
convention of modeling only surrounding metadata, e.g. `applicationDate`,
never the mark/signature itself); the "For office use only" `Application
No` / `Visa exemption No` boxes on page 1 (explicitly labeled office-use in
the printed text).

**One disclosed printed-form artifact:** the source's own roman-numeral
sub-item labels repeat `iii)` across the page 1/page 2 boundary — page 1
ends item 10 ("If Married") with `iii) Postal Address`, and page 2 opens
with a further `iii) Passport Number` / `iv) Date of expiry` continuing the
same spouse block. This is modeled as two additional spouse fields
(`spousePassportNumber`, `spousePassportDateOfExpiry`), both gated the same
way as the rest of item 10, rather than treated as a duplicate or dropped —
disclosed here rather than silently resolved.

**Two disclosed apparent typos, preserved verbatim in `label`, explained in
`description`:** item 12's printed label reads "Any identification Marks of
**Pecularities**" (a misspelling of "Peculiarities"); item 14(i)'s printed
label reads "Name and address of **employee**, if any" where context (this
item follows "Profession/Occupation" and precedes "If in business, where
business is") makes clear the source means the applicant's *employer*, not
their own employee. Both are printed exactly as-is in `label` per this
registry's "read directly from the source" convention, with the likely
intent noted in `description` rather than silently corrected.

**No invented boolean gates**, per this registry's documented precedent:
several sections (naturalization, "previously in Sri Lanka," the prior-
refusal narrative, the last-visa-obtained sub-block) are printed with no
preceding yes/no checkbox on this specimen, only a descriptive lead-in
("if any" / "if so" / "If So:-"). These are modeled as plain optional
fields rather than gated on an invented boolean condition field that does
not exist in the source. `creditCardAmountSpent` follows the same
reasoning: left optional and ungated rather than a `requiredWhen` keyed off
`creditCardNames` via `notEquals ""`, per this registry's documented
`notEquals`-empty-string-on-an-optional-field gotcha.

## Documents

`documents[]` models one entry: `passportPhotograph` (category
`supporting-evidence`, `belongsTo: applicant`, `required: true`), sourced
directly from page 1's own "Affix a photograph" box. Checked
`immigration.gov.lk/pages_e.php?id=24` (the Department's own Applications
page) for any separate documents-required checklist accompanying Form B,
matching `lk/dmt`'s precedent of citing an external checklist where one
exists — none was found; the page offers only the downloadable form itself,
with no accompanying document list. `documents[]` is therefore limited to
what the form itself prints, rather than an invented general "supporting
documents" list.

## Conformance fixtures

Two valid scenarios (0 errors each):
- `valid-single-tourist.json` — a single, first-time visitor applying for
  a tourist visa; no spouse block, no naturalization block, no "previously
  in Sri Lanka" block, no credit-card detail — every conditional field
  correctly omitted.
- `valid-married-resident-visa-with-prior-visit.json` — a naturalized,
  married applicant applying for a resident visa, with a previous passport,
  a full spouse block, a full "previously in Sri Lanka" / last-visa-
  obtained block (resident type, with its conditional `specify` and
  resident-visa-number fields both present), and credit-card detail —
  exercising every conditional field this schema defines.

Eight mutation controls, each raising exactly one error:

```
$ node check.mjs schema.json mutation-control-missing-required-field.json
["fullNameAsInPassport: required but missing"]
$ node check.mjs schema.json mutation-control-invalid-enum-value.json
["gender: value \"other\" not in enum [male, female]"]
$ node check.mjs schema.json mutation-control-invalid-type-height.json
["heightCm: expected type integer, got string (\"tall\")"]
$ node check.mjs schema.json mutation-control-invalid-date-format.json
["dateOfBirth: expected date (YYYY-MM-DD), got \"20/05/1990\""]
$ node check.mjs schema.json mutation-control-value-below-minimum.json
["fundsAvailableUSD: -100 below minimum 0"]
$ node check.mjs schema.json mutation-control-missing-required-document.json
["document passportPhotograph: required but not provided"]
$ node check.mjs schema.json mutation-control-requiredwhen-missing-spouse-name.json
["spouseFullName: required but missing"]
$ node check.mjs schema.json mutation-control-requiredwhen-in-missing-visa-specify.json
["visaLastObtainedSpecify: required but missing"]
```

The last of these specifically exercises the `in` operator of the shared
`condition` grammar (`visaLastObtainedSpecify`'s `requiredWhen` is
`{"field": "visaLastObtainedType", "in": ["resident_visa", "other",
"multiple"]}`), not just `equals` — this registry's `lk/dmt` precedent only
exercised `equals`, so this schema's own fixture set deliberately adds `in`
coverage.

`check.mjs` is a scratch, from-scratch conformance checker (built in `/tmp`,
never committed) that walks `fields[]`/`documents[]`, `required`/
`requiredWhen` (evaluating the shared `condition` grammar's `field`/
`equals`/`notEquals`/`in`/`greaterThan(OrEqual)`/`lessThan(OrEqual)`/`all`/
`any`/`not` shape), `type`, and `validation` (`enum`/`minimum`/`maximum`/
`minLength`/`maxLength`/`pattern`), plus an unknown-field check. It reads
fixtures in this registry's established flat-field-plus-`documents`-array
shape (matching `lk/dmt`'s and `rs/mfa`'s own fixture format — top-level
field keys, `documents: [{id, provided}, ...]`), not the `{fields:
{...}}`-nested shape a first draft of this schema's fixtures mistakenly
used before being corrected to match precedent. All ten fixtures (two
valid, eight mutation controls) were run against it; both valid fixtures
returned `[]` and every mutation control returned an array of exactly one
error string, matching the results above.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against this new schema individually
and pass:

```
$ node tools/validate.mjs registry/lk/imm/application-for-a-entry-visa/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/lk/imm/application-for-a-entry-visa/1.0.0/schema.json
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

The scratch `pdfjs-dist`/`canvas` install used for PDF rendering and the
scratch conformance checker were both done in an isolated `/tmp` scratch
directory, never inside `tools/` or `tools/govschema-client/`. Running
`node tools/validate-ajv.mjs` itself required a one-time `npm ci
--include=dev` inside `tools/` (its `ajv`/`ajv-formats` devDependencies were
not yet installed in this worktree) — this registry's documented "local
NODE_ENV=production makes `npm ci` skip ajv" gotcha.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Field-count note

61 fields is toward the higher end of this registry's typical range for a
Visa-vertical form, reflecting Form B's genuine breadth as a general-
purpose entry-visa application covering tourist, resident, and "other
purpose" pathways in one instrument (unlike, e.g., a single-purpose transit
or tourist-only visa form). This tracks GOV-2781's own disclosed estimate
("~45-55 fields across 4 applicant-facing pages") — modestly higher once
every printed sub-item (spouse passport continuation, business fax/email,
duplicate contact rows, last-visa-obtained sub-block) was counted
individually; disclosed here rather than trimmed to fit the earlier
estimate.

## Scope and jurisdiction notes

- Opens Sri Lanka's **Visa vertical (4 of 6)**. Business Formation and
  Taxes remain open: Taxes is a confirmed dead end (per GOV-2781:
  e-filing-mandatory, no paper exception found); Business Formation has
  only a provincial (Western Province BNR-01), not national, candidate —
  see GOV-2781's own `VERIFICATION.md` and `CATALOG.md`'s "Known Gaps &
  Opportunities" for the full disclosed record.
- `jurisdiction.level` is `national` — the Department of Immigration &
  Emigration is Sri Lanka's national visa-issuing authority; unlike
  `lk/dmt`'s Provincial-Council-administered licensing, there is no
  sub-national issuing-authority wrinkle here.
- `process.type` is `application`, matching the form's own printed title
  ("APPLICATION FOR A ENTRY VISA").
- `process.language` is `en` — the source PDF is monolingual English
  (unlike `lk/dmt`'s/`lk/drp`'s trilingual Sinhala/Tamil/English forms),
  consistent with this being the Department's general-purpose form for
  foreign-national applicants rather than a domestic-facing one.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) re-screening Business
Formation if the Registrar of Companies (DRC) ever publishes a national
incorporation form outside the eROC portal, or revisiting the provincial
BNR-01 business-name-registration candidate as a lower-bar alternative; (2)
re-screening Taxes if IRD ever publishes a paper-filing exception; (3)
confirming whether a documents-required checklist for Form B is published
elsewhere (e.g. by individual overseas missions) that would let
`documents[]` grow beyond the single photograph requirement modeled here.
