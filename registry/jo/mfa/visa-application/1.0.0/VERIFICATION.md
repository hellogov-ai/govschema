# Verification record — `jo/mfa/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2746**. This schema **closes
Jordan's Visa vertical (3 of 6)**, following **GOV-2731** (Taxes, opened
Jordan as the registry's 49th jurisdiction) and **GOV-2739** (Passport,
which also confirmed Business Formation, DMV, and National ID & Civic
Documents as dead ends, and left this MFA Visa candidate open as
well-sourced backlog after finding a competing 23-field embassy AcroForm
only on third-party visa-expediting mirrors, not a first-party government
host).

## Source verification (independently re-derived, not copied from the task briefing)

- **PDF source:**
  `https://www.mfa.gov.jo/documents/300419Jordan%20Visa%20Application%20.pdf`
  — fetched independently this cycle via `curl` with a browser-like
  `User-Agent`/`Accept` header (a bare HEAD request against this host can
  403; a plain GET succeeded cleanly):
  - **HTTP 200**, `Content-Type: application/pdf`, **419,769 bytes** —
    matching the task briefing's expected size exactly.
  - **`sha256`:**
    `665961cc2d7746b6fdb8fa43e9c4153704f18fcb01e995c332223c37bfc7cc71`
    (computed via `sha256sum` on the freshly-downloaded file).
  - `Last-Modified: Tue, 30 Apr 2019 06:41:00 GMT`. Served via Cloudflare
    (`server: cloudflare`, a `cf-ray` header present, a benign `__cf_bm`
    cookie set) but with no JS-challenge/WAF block on this direct GET.
  - Domain `mfa.gov.jo` (Ministry of Foreign Affairs and Expatriates) is the
    correct, official first-party agency for Jordanian visa policy.

## PDF structure, independently confirmed via `pdfjs-dist`

- **2 pages**, a plain print-and-fill specimen. Two independent checks
  confirmed **zero Widget-subtype annotations on either page**:
  1. `pdfjs-dist@4` (legacy ESM build): `page.getAnnotations({intent:
     "display"})` returned 0 annotations on page 1, 1 non-Widget annotation
     on page 2 (a link/goto annotation, not a form field).
  2. `pdfjs-dist@3` (legacy CJS build, used for the image render below):
     confirmed the same 0-Widget count on both pages independently.
  This is a genuine non-AcroForm specimen, consistent with both existing
  Jordan schemas (`jo/istd/pit-return-employee`, `jo/cspd/passport-application`).
- `getTextContent()` returned a full, clean, bilingual (English/Arabic)
  text layer on both pages. Every text item's `(x, y)` transform was
  grouped by rounded `y`-coordinate into rows and sorted by `x` to
  reconstruct the source's own line breaks and column layout — the full
  per-page, per-row transcript (with `x`-coordinates retained) was read in
  full before modeling any field.
- **Page-image cross-check.** `pdfjs-dist@4`'s Node canvas-factory path
  threw `TypeError: Image or Canvas expected` when rendering this
  specimen's embedded photo-placeholder box and coat-of-arms image via a
  custom `NodeCanvasFactory` (a different failure mode from the blank-glyph
  gotcha noted in `jo/cspd/passport-application`'s own record, but the same
  underlying category — a genuinely-imaged PDF needing special handling).
  Switching to `pdfjs-dist@3`'s legacy CJS build (`pdfjs-dist/legacy/build/pdf.js`)
  with `standardFontDataUrl` pointed at its bundled `standard_fonts/`
  directory rendered both pages cleanly via `node-canvas`, with no custom
  canvas factory needed. Both rendered pages were visually inspected and
  confirmed:
  1. **Sex, Marital status, Type of Passport, and Number of Entries are all
     printed as genuine checkbox controls** (☐), matching the task
     briefing's field list and justifying the `enum` typing used for these
     four fields (unlike this specimen's other Y/N-style questions in §6,
     which print no checkbox glyph at all — see below).
  2. **A boxed, consular-only "For Official Use" sidebar** runs the full
     height of page 1's right margin, containing a submitted-documents
     checklist (passport, residency card, invitation letter, official
     memo, medical report, Jordan Pass, bank statement, salary statement,
     employment/student/retirement proof, hotel booking, travel ticket,
     residence proof, spouse's passport, professional license), the
     receiving officer's name, the application receipt date, the amount
     paid, and the decision (grant single/double/multiple-entry visa, or
     refuse) with a notes line. This is genuinely staff/consular-only
     content and is excluded from `fields[]`, consistent with this
     registry's established convention for office-use-only sections (e.g.
     `jo/istd/pit-return-employee`'s "For Official Use" block,
     `jo/cspd/passport-application`'s page-2 "For Department Use Only").
  3. **§6's Y/N questions (6.1, 6.3, 6.5, 6.6, 6.7) print no checkbox
     glyph** — only the question text followed on the next line(s) by "If
     yes, ..." detail-collection lines. This is disclosed as the basis for
     modeling each as a `boolean` field (the underlying answer is
     genuinely binary, and every question must be answered per the form's
     own "incomplete applications will not be processed" instruction) with
     an unrelated, optional detail companion field — rather than as free
     text.
  4. **§5.6 (travel companions) and §6.8 (countries visited) are each
     printed as multiple blank ruled lines** (3 lines and 2 lines
     respectively) rather than a numbered per-entry table — confirming
     these are single free-text fields, not bounded repeating groups like
     this registry's `entrantN`/`childN` precedent.
  5. **§5.7 is a single shared blank box** captioned with two alternative
     instructions — "Full address/telephone number of inviting person/
     Organisation in Jordan" and, immediately below it, "*If tourist, Name
     of hotel, place of stay and telephone number" — confirming this is
     one field, not two.

## Field derivation

The form's structure, reconstructed by row (bilingual, verified via
`getTextContent()` positions and cross-checked against both page renders):

**Page 1** — header (title "Visa Application to Enter the Hashemite Kingdom
of Jordan"; an Applicant Photo placeholder box; an "Incomplete applications
will not be processed..." instruction banner; the "For Official Use"
sidebar, excluded — see above); §1 Personal Details (First name; Father's &
grandfather's name; Family name; Current nationality; Mother's name; Sex;
Date of Birth; Place of Birth; Marital status; Education; Name of spouse;
Spouse's nationality); §2 Passport Details (Type Of Passport; Passport
number; Date of issue; Date of expiry; Issuing authority); §3 Contact
Details (Applicant's full address; Applicant's telephone number;
Applicant's email address); §4 Employment (Current occupation; Name and
full address of the employing Organisation; an asterisked "If Student..."
companion line).

**Page 2** — §5 Trip Information (Main purpose of visit; Number of
Entries; Port of entry; Date of arrival; Date of departure; travel
companion name(s); the combined inviting-person/hotel box); §6 Additional
Information (other nationality + companion lines; Former Nationalities +
companion lines; name-change + companion line; Date of first entry into
country of residence; criminal conviction/trial + companion line; armed
forces service + companion line; expulsion + companion line; countries
visited in the last 10 years); the certification statement ("I hereby
certify that the above information given is true and correct") and a
combined "Name and Signature/ Date" declaration line.

Every printed applicant-facing field was mapped to one of this schema's 48
`fields[]` entries or its 1 `documents[]` entry. See the schema's own
`sourceRef` on each field for the exact page/section/label it was read
from.

## Scoping and modeling judgment calls

- **`currentNationality`, `education`, `spouseNationality`,
  `typeOfPassportOtherSpecify` modeled as free text:** each is printed as a
  blank line with no options text, consistent with this registry's
  established precedent for unprinted-option fields (e.g.
  `jo/istd/pit-return-employee`'s `familyStatus`).
- **`sex`, `maritalStatus`, `typeOfPassport`, `numberOfEntries` modeled as
  `enum`:** all four are printed as genuine checkbox controls with a fixed,
  closed option set — confirmed via the page-image render, not assumed
  from the text transcript alone.
- **`nameOfSpouse`/`spouseNationality` modeled fully optional, no gate:**
  the specimen prints no explicit yes/no gate ahead of this block (only
  married applicants would populate it) — disclosed here rather than
  inventing a `requiredWhen` gate the source doesn't have, matching the
  same judgment call `jo/cspd/passport-application` made for its own
  Husband/Wife Data block.
- **`studentSchoolNameAndAddress` modeled optional, no gate:** the
  specimen prints an asterisked companion line ("* If Student...") with no
  accompanying yes/no control.
- **§6's boolean gate questions (`hasOtherNationality`, `hasChangedName`,
  `hasCriminalConvictionOrTrial`, `hasServedInArmedForces`,
  `hasBeenExpelled`) modeled as required `boolean` fields, each with
  optional, ungated "if yes" detail companion field(s):** although these
  print no checkbox glyph (unlike `sex`/`maritalStatus`/`typeOfPassport`/
  `numberOfEntries`), each is a plain-language yes/no question the form's
  own "incomplete applications will not be processed" instruction requires
  every applicant to answer, so each is modeled `required: true`. Per this
  task's explicit modeling guidance, the "if yes" companion detail fields
  (e.g. `otherNationalityPassportName`, `criminalConvictionDetails`) are
  modeled as plain optional fields with no `requiredWhen` coupling to the
  boolean, even though the source's own "If yes, provide details" phrasing
  could arguably support a `requiredWhen` gate (as this registry's
  `gh/gra` DT0103 precedent does for its own explicitly-gated sections) —
  disclosed here as a deliberate simplification, not an oversight.
- **§6.2 "Former Nationalities" modeled with no accompanying boolean:**
  unlike 6.1/6.3/6.5/6.6/6.7, this sub-section is printed as a plain
  heading ("Former Nationalities") rather than an explicit "Have you
  ...?"/"Do you...?" question, so no `hasFormerNationality`-style field was
  invented — only its two "if yes" companion fields
  (`formerNationalityName`, `formerNationalityPassportNumber`), both
  optional.
- **`travelCompanionNames` and `countriesVisitedLast10Years` modeled as
  single free-text fields, not bounded repeating groups:** confirmed via
  the page-image render that both are printed as multiple blank ruled
  lines (3 and 2 respectively), not a numbered per-entry table — unlike
  this registry's `entrantN`/`childN` precedent for genuinely tabular
  fixed-capacity sections.
- **`invitingPersonOrHotelDetails` modeled as one required field covering
  two alternative instructions:** the source prints "Full address/
  telephone number of inviting person/Organisation in Jordan" and, on the
  line immediately below, "*If tourist, Name of hotel, place of stay and
  telephone number" sharing one blank writable box — confirmed via the
  page-image render rather than assumed from the text transcript alone
  (which could have been misread as two stacked fields).
- **`employerNameAndAddress` scoped to the English caption only:** the
  form's English label reads "Name and full address of the employing
  Organisation," while the adjacent Arabic column's own phrasing
  additionally mentions a telephone number; disclosed in the field's own
  description rather than silently expanding the English-language field's
  scope.
- **`declarantNameAndSignature`/`declarationDate` split from one printed
  caption:** the source's own closing line reads "Name and Signature/
  Date" as a single caption; split into two typed fields (`string` +
  `date`) per this registry's established precedent for combined
  name-and-signature-plus-date declaration lines (e.g.
  `jo/istd/pit-return-employee`'s `taxpayerOrAgentNameAndSignature` +
  `taxpayerDeclarationDate`).
- **"For Official Use" sidebar excluded:** consistent with this registry's
  established precedent for office/consular-use-only sections (see PDF
  structure section above).
- **Classification:** name pieces, address, phone, email, date/place of
  birth, spouse's name, travel-companion names, and the declarant's own
  name-and-signature are tagged `pii`; passport numbers (own, other-
  nationality, former-nationality) are tagged `sensitive-pii`, matching
  this registry's established precedent (e.g. `jo/istd/pit-return-employee`'s
  `nationalIdOrPassport`); criminal-conviction/trial details and expulsion
  details are also tagged `sensitive-pii` given their legal/criminal
  nature, a judgment call made this cycle rather than a copied precedent.
  Plain enumerated/free-text demographic fields (`sex`, `maritalStatus`,
  `currentNationality`, `spouseNationality`) are left unclassified,
  consistent with `jo/istd/pit-return-employee`'s own unclassified
  `nationality`/`residency` enum fields.

## Conformance run

Two hand-authored valid fixtures under
`conformance/jo/mfa/visa-application/1.0.0/`:

- **`valid-tourist-single-entry.json`** — a single, unmarried tourist
  applicant with a single-entry visa request, no other/former nationality,
  no name change, no criminal/military/expulsion history — exercising the
  schema's minimal required-field path (the hotel branch of
  `invitingPersonOrHotelDetails`).
- **`valid-business-multiple-entry-with-optional-blocks.json`** — a
  married business-trip applicant requesting multiple entries, exercising
  the optional spouse fields, an "Other" passport type with its "specify"
  companion, a travel companion, and all of §6's optional "if yes"
  companion blocks (other nationality, former nationality, name change,
  armed forces service).

Six mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-passport-number.json`** — drops
  `passportNumber` (static `required: true`) from the tourist valid
  fixture.
- **`mutation-control-missing-date-of-birth.json`** — drops `dateOfBirth`
  (static `required: true`).
- **`mutation-control-missing-declaration-date.json`** — drops
  `declarationDate` (static `required: true`).
- **`mutation-control-invalid-enum-sex.json`** — sets `sex` to `"other"`,
  not one of the enum's 2 values.
- **`mutation-control-invalid-enum-marital-status.json`** — sets
  `maritalStatus` to `"engaged"`, not one of the enum's 4 values.
- **`mutation-control-invalid-type-has-other-nationality.json`** — sets
  `hasOtherNationality` to the string `"no"` instead of a JSON boolean.

All eight fixtures were checked with a from-scratch Node conformance
checker (`check-conformance.mjs`, not committed — a disposable script, per
this registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.enum`/`validation.pattern`
grammar directly:

```
$ node check-conformance.mjs schema.json conformance/jo/mfa/visa-application/1.0.0
PASS mutation-control-invalid-enum-marital-status.json: expected 1 error(s), got 1 -> invalid enum value for maritalStatus: engaged
PASS mutation-control-invalid-enum-sex.json: expected 1 error(s), got 1 -> invalid enum value for sex: other
PASS mutation-control-invalid-type-has-other-nationality.json: expected 1 error(s), got 1 -> invalid type for hasOtherNationality: expected boolean, got string
PASS mutation-control-missing-date-of-birth.json: expected 1 error(s), got 1 -> missing required field: dateOfBirth
PASS mutation-control-missing-declaration-date.json: expected 1 error(s), got 1 -> missing required field: declarationDate
PASS mutation-control-missing-passport-number.json: expected 1 error(s), got 1 -> missing required field: passportNumber
PASS valid-business-multiple-entry-with-optional-blocks.json: expected 0 error(s), got 0
PASS valid-tourist-single-entry.json: expected 0 error(s), got 0
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the schema document and pass:

```
$ node tools/validate.mjs registry/jo/mfa/visa-application/1.0.0/schema.json
ok   registry/jo/mfa/visa-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jo/mfa/visa-application/1.0.0/schema.json
ok   registry/jo/mfa/visa-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/node_modules` and `tools/govschema-client/node_modules` were both
missing at the start of this cycle; both were restored via `npm ci
--include=dev` run separately inside each directory (not `npm install
<pkg> --no-save`, which has previously wiped `ajv`/`ajv-formats`
devDependencies in this repo). The scratch `pdfjs-dist`/`canvas` installs
used for PDF extraction and rendering were both done in isolated `/tmp`
scratch directories, never inside `tools/` or `tools/govschema-client/`.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/` (413 → 414 entries).

## Scope and jurisdiction notes

- Closes Jordan's **Visa vertical (3 of 6)**. Business Formation, DMV, and
  National ID & Civic Documents were confirmed dead ends in the prior
  `jo/cspd/passport-application` (GOV-2739) cycle; combined with this
  schema and the existing Taxes/Passport schemas, all 6 of Jordan's
  verticals are now either built or confirmed dead ends — Jordan has
  reached its practical maximum coverage under this registry's current
  sourcing standards unless a dead-end vertical's underlying blocker
  (login-gated e-service, in-person/biometric-only process) changes.
- `jurisdiction.level` is `national` — MFA is Jordan's national foreign-
  affairs and visa-policy authority.
- `process.type` is `application`, matching this registry's established
  convention for visa forms (e.g. `gr/mfa/application-for-schengen-visa`,
  `th/mfa/non-immigrant-visa-b-application-for-employment`).
- `process.language` is `en`: although the specimen's own text layer is
  bilingual (English/Arabic), this schema's field labels/descriptions
  follow the English column throughout, consistent with this registry's
  existing Jordan schemas (both of which also declare `en` despite their
  own bilingual or Ministry-of-Finance-Arabic-adjacent source specimens).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming whether the
previously-scouted third-party-hosted 23-field embassy AcroForm
("Visa Application for US & EU countries") has since appeared on a
first-party Jordanian government host, which could warrant a companion or
successor schema; (2) re-attempting Jordan's Business Formation, DMV, and
National ID & Civic Documents verticals if a bot-mitigation-workaround
technique or a newly published paper form is found; (3) confirming whether
an official Arabic-primary edition of this form differs in structure from
the bilingual specimen used here.
