# Verification record — `rs/mfa/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2760**, authoring the Serbia
Visa candidate pre-scouted and left open in **GOV-2753**'s own screening
pass (`CATALOG.md`'s "Known Gaps & Opportunities"), alongside a Taxes
candidate (PPDG-2R). This schema **opens Serbia's Visa vertical (2 of 6)**,
following Business Formation (`rs/apr/jrpps-pr-sole-proprietor-registration`,
GOV-2725, 48th jurisdiction).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i rs-mfa` and `gh pr list --state all --search
"rs/mfa"` before starting — neither found an existing `rs/mfa` branch or PR,
so no reconciliation was needed this cycle.

## Source verification — independently re-fetched, not trusted from the prior cycle's own notes

GOV-2753's own memory record named only the host (`mfa.gov.rs`) and a general
description ("visa application form"), not an exact URL, so this cycle
re-derived the source from scratch via `WebSearch`, then fetched it directly:

- **PDF source:**
  `https://mfa.gov.rs/sites/default/files/inline-files/visaform_lat3.pdf`
  — fetched via `curl -sL`:
  - **HTTP 200**, **280,901 bytes**.
  - **`sha256`:**
    `427776bc0cfd58ef509ec973b6f3858ecb29b838102aa26af0d5539af012d146`
    (computed via `sha256sum` on the freshly-downloaded file).
  - Domain `mfa.gov.rs` (Ministry of Foreign Affairs) is the correct,
    official first-party agency for Serbian visa policy.
- The competing Taxes candidate named in the same GOV-2753 record
  (`purs.gov.rs`'s PPDG-2R, `https://purs.gov.rs/upload/media/2025/2/4/609132/ObrazacPPDG-2R.pdf`)
  was also independently re-fetched this cycle to confirm it remains live
  (HTTP 200, 254,833 bytes) — left as an open, ready-to-author backlog item
  for a future cycle since this Visa candidate was selected instead.

## PDF structure, independently confirmed via `pdfjs-dist`

- **2 pages**, a plain print-and-fill specimen. Confirmed via
  `pdfjs-dist@3` (legacy build): `page.getAnnotations({intent: "display"})`
  returned **0 Widget-subtype annotations on either page** — a genuine
  non-AcroForm specimen, consistent with this registry's `jo/mfa/visa-application`
  precedent for the same form type.
- `getTextContent()` returned a full, clean, bilingual (Serbian
  Cyrillic/English) text layer on both pages, read in full before modeling
  any field.
- **Page-image cross-check.** Rendered both pages via `pdfjs-dist@3`'s
  legacy build + `node-canvas`, with `standardFontDataUrl` pointed at the
  bundled `standard_fonts/` directory. The Cyrillic text (this specimen's
  embedded font) rendered cleanly; the English text (relying on the
  standard Helvetica substitution) rendered as blank glyphs in this
  environment — a variant of the blank-glyph gotcha this registry has
  hit before (e.g. `jo/cspd/passport-application`'s own record), except
  here only the Latin-script half of the bilingual text failed to
  rasterize while the Cyrillic half did not. This did not block
  verification since (a) every printed label's meaning was already
  confirmed from the full bilingual text-layer transcript, and (b) the
  Cyrillic half alone was sufficient to independently confirm every
  checkbox group's layout and option count and the exact boundary of the
  consular-only column, described next.
  1. **A boxed, consular-only "Испуњава амбасада/односно конзулат" (For
     embassy/consulate use only) column** runs the full height of both
     pages' right margin, containing the receipt date, responsible
     officer, a supporting-documents checklist (valid travel document,
     financial means, invitation, means of travel, travel insurance,
     other), the visa decision (refused/issued), visa type/category/
     number-of-entries checkboxes, and a validity-period line. This is
     genuinely staff-only content and is excluded from `fields[]`,
     consistent with this registry's established convention for
     office/consular-use-only sections (e.g. `jo/mfa/visa-application`'s
     own "For Official Use" sidebar).
  2. **Every checkbox group's option count was visually confirmed against
     the render**, matching the text-layer transcript exactly: Sex (2),
     Marital status (6), Type of travel document (7), Type of visa (4),
     Visa category (2), Number of entries requested (3), Purpose of
     travel (13, including "Initial Visa" and "Other reasons"), Who pays
     (3), and Means of support (5 checkboxes plus a visually distinct 6th
     travel/health-insurance checkbox with its own "Valid until" line).
  3. **Item 34's host block** is confirmed via the render to be four
     separately boxed sub-fields (Name; Phone and telefax; Full address;
     E-mail) rather than one combined free-text block.
  4. **Item 42's children table** is confirmed via the text-layer
     transcript to print 3 numbered rows ("1. 2. 3.") beneath the
     Surname/First name/Date of birth column headers — a bounded
     repeating group, matching this registry's established `entrantN`/
     `childN` precedent (e.g. `jo/istd/pit-return-employee`'s
     `dependentN` fields), sized to this form's own printed capacity of 3
     rather than the 6 used by that precedent.
  5. **Item 46 ("Место и датум"/"Place and date") and item 47
     ("Потпис"/"Signature")** are confirmed via the render to occupy two
     visually distinct, side-by-side cells in the same row — not one
     combined field — so they are modeled as two separate fields
     (`placeAndDateOfApplication`, `signature`).

## Field derivation

The form's structure, reconstructed by numbered item (bilingual, verified
via `getTextContent()` and cross-checked against both page renders):

**Page 1** — header (title "Захтев за издавање визе / Visa Application
Form"; a photograph placeholder box; the mission-selection line; the
consular-only column, excluded); items 1-21 personal/passport/contact
particulars; items 22-28 trip/visa particulars.

**Page 2** — items 29-36 travel details; items 37-42 optional spouse and
children particulars; items 43-47 the closing declaration, applicant's
address/phone/e-mail, place-and-date, and signature.

Every printed applicant-facing item was mapped to one of this schema's 71
`fields[]` entries or its 2 `documents[]` entries. See the schema's own
`sourceRef` on each field for the exact page/item/label it was read from.

## Scoping and modeling judgment calls

- **`currentNationality`, `originalNationality`, `currentOccupation`,
  `countryOfDestination`, `borderPostOfEntry`, `meansOfTransport` modeled
  as free text:** each is printed as a blank line with no options text.
- **`sex`, `maritalStatus`, `travelDocumentType`, `visaType`,
  `visaCategory`, `numberOfEntriesRequested`, `purposeOfTravel`,
  `travelCostPayer` modeled as `enum`:** all are printed as genuine
  checkbox controls with a fixed, closed option set, confirmed via the
  page-image render.
- **`meansOfSupportCash`/`meansOfSupportTravellersCheques`/
  `meansOfSupportCreditCards`/`meansOfSupportAccommodation`/
  `meansOfSupportOther`/`hasTravelOrHealthInsurance` modeled as six
  independent booleans rather than one enum:** the source prints these as
  independently checkable boxes (an applicant could plausibly check both
  "cash" and "credit cards"), matching this registry's established
  multi-checkbox convention (e.g. `rs/apr/jrpps-pr-sole-proprietor-registration`'s
  own disclosed AcroForm-quirk precedent, applied here to a non-AcroForm
  but structurally equivalent checkbox group).
- **`hasReturnPermit` (item 18) and `hasTransitEntryPermitForNextCountry`
  (item 27) modeled as required booleans with `requiredWhen`-gated
  companion fields:** both are printed as explicit Yes/No checkbox
  questions (unlike, e.g., `jo/mfa/visa-application`'s §6 gate questions,
  which print no checkbox glyph at all) with an immediately adjacent
  companion field only relevant to the "Yes" branch — a clean
  `requiredWhen` mapping, not an invented gate.
- **`maidenName`, `otherVisasLastThreeYears`, `previousVisitsToSerbia`, and
  the entire spouse/children block modeled fully optional, no gate:** the
  specimen prints no explicit yes/no gate ahead of any of these — a
  married or childless applicant would simply leave them blank — matching
  this registry's established precedent for unprinted-gate conditional
  blocks (e.g. `jo/cspd/passport-application`'s Husband/Wife Data).
- **Children (item 42) modeled as a bounded 3-row repeating group
  (`child1`/`child2`/`child3` × Surname/First name/Date of birth), all
  optional:** matches the form's own printed 3-row capacity and its own
  instruction that a separate application must be submitted per child's
  passport (so this form's own children table records accompanying minors
  travelling on a parent's passport, not additional applicants).
- **Item 45's combined "Phone, E-mail" caption split into two fields**
  (`applicantPhone` required, `applicantEmail` optional) for consistency
  with item 34's own separately-boxed Phone-and-telefax/E-mail fields —
  disclosed as a judgment call rather than merged into one free-text
  field, since the render could not fully resolve whether item 45 uses one
  shared writable area or two (the "E-mail" sub-label is itself
  Latin-script text that failed to rasterize in this environment's
  Helvetica substitution — see the page-image cross-check note above).
- **Item 46 ("Place and date") kept as one combined field:** unlike item
  45, item 46's cell shows no internal division in the render, and the
  source provides no separate caption for a "place" vs. "date" sub-box.
- **"Additional documents" checklist (item: valid travel document,
  financial means, invitation, means of travel, travel insurance, other)
  not modeled as `documents[]`:** this checklist prints entirely inside
  the consular-only column as the receiving officer's own record of what
  was submitted at intake, not an applicant-facing instruction list —
  disclosed here rather than invented as required supporting documents
  the form itself does not actually instruct the applicant to attach.
- **Classification:** name pieces, date/place of birth, addresses, phone,
  email, spouse's and children's particulars, host name/address, and the
  applicant's own signature are tagged `pii`; passport number and national
  ID number are tagged `sensitive-pii`, matching this registry's
  established precedent (e.g. `jo/mfa/visa-application`'s own passport-
  number classification). Plain enumerated/free-text demographic and
  itinerary fields (`sex`, `maritalStatus`, `currentNationality`,
  `visaType`, `purposeOfTravel`) are left unclassified.

## Conformance run

Two hand-authored valid fixtures under
`conformance/rs/mfa/visa-application/1.0.0/`:

- **`valid-tourist-single-entry.json`** — a single, unmarried tourist
  applicant requesting a short-stay single-entry visa, no return permit,
  no transit permit, no spouse/children — exercising the schema's minimal
  required-field path.
- **`valid-family-transit-with-optional-blocks.json`** — a married
  applicant travelling with two children, requesting a transit visa with
  both the return-permit and transit-entry-permit "Yes" branches, an
  "Other" travel-document type and an "Other" purpose-of-travel with their
  respective "specify" companions, and an "Other" means-of-support
  checkbox with its own companion — exercising every `requiredWhen`-gated
  field in the schema at once.

Eight mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops `firstName`
  (static `required: true`).
- **`mutation-control-invalid-enum-value.json`** — sets `sex` to
  `"other"`, not one of the enum's 2 values.
- **`mutation-control-invalid-date-format.json`** — sets `dateOfBirth` to
  `"22-03-1994"`, not the required `YYYY-MM-DD` shape.
- **`mutation-control-invalid-type-length-of-visit-days.json`** — sets
  `lengthOfVisitDays` to the string `"ten"` instead of an integer.
- **`mutation-control-missing-conditional-return-permit.json`** — sets
  `hasReturnPermit` to `true` without its `returnPermitNumberAndValidity`
  companion.
- **`mutation-control-missing-conditional-transit-permit.json`** — sets
  `hasTransitEntryPermitForNextCountry` to `true`, supplies
  `transitEntryPermitIssuingAuthority`, but omits
  `transitEntryPermitValidUntil`.
- **`mutation-control-missing-conditional-travel-document-other.json`** —
  sets `travelDocumentType` to `"other"` without its
  `travelDocumentTypeOtherSpecify` companion.
- **`mutation-control-missing-required-document.json`** — sets the
  `photograph` document's `provided` flag to `false`.

All ten fixtures were checked with a from-scratch Node conformance checker
(`validate_conformance.mjs`, not committed — a disposable script run from
an isolated `/tmp` scratch directory, per this registry's own established
practice since no committed conformance-fixture validator exists)
implementing this schema's own `required`/`requiredWhen`/`type`/
`validation.enum`/`validation.pattern`/`validation.minimum`/
`documents[].required` grammar directly:

```
$ node validate_conformance.mjs registry/rs/mfa/visa-application/1.0.0/schema.json conformance/rs/mfa/visa-application/1.0.0
OK   mutation-control-invalid-date-format.json  errors=["dateOfBirth: invalid date format \"22-03-1994\", expected YYYY-MM-DD"]
OK   mutation-control-invalid-enum-value.json  errors=["sex: value \"other\" not in enum [\"male\",\"female\"]"]
OK   mutation-control-invalid-type-length-of-visit-days.json  errors=["lengthOfVisitDays: expected type integer, got string (\"ten\")"]
OK   mutation-control-missing-conditional-return-permit.json  errors=["returnPermitNumberAndValidity: required but missing"]
OK   mutation-control-missing-conditional-transit-permit.json  errors=["transitEntryPermitValidUntil: required but missing"]
OK   mutation-control-missing-conditional-travel-document-other.json  errors=["travelDocumentTypeOtherSpecify: required but missing"]
OK   mutation-control-missing-required-document.json  errors=["document photograph: required but not provided"]
OK   mutation-control-missing-required-field.json  errors=["firstName: required but missing"]
OK   valid-family-transit-with-optional-blocks.json  errors=[]
OK   valid-tourist-single-entry.json  errors=[]
```

All eight negative controls raised exactly one error each, and neither
valid scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
415/415 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
415/415 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

The scratch `pdfjs-dist`/`canvas` install used for PDF extraction and
rendering was done in an isolated `/tmp` scratch directory, never inside
`tools/` or `tools/govschema-client/` — avoiding this registry's
previously-documented `npm install`/`node_modules`-wipe gotcha.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Serbia's **Visa vertical (2 of 6)**, following Business Formation
  (GOV-2725). DMV, Taxes, National ID, and Passport remain open,
  unscreened-this-cycle backlog candidates — Serbia's Taxes vertical in
  particular has a strong pre-identified candidate (PPDG-2R, re-confirmed
  live this cycle — see Source verification above).
- `jurisdiction.level` is `national` — MFA is Serbia's national foreign-
  affairs and visa-policy authority.
- `process.type` is `application`, matching this registry's established
  convention for visa forms (e.g. `jo/mfa/visa-application`,
  `th/mfa/non-immigrant-visa-b-application-for-employment`).
- `process.language` is `sr`, matching `rs/apr/jrpps-pr-sole-proprietor-registration`'s
  own convention for this jurisdiction, since the source's primary/first-
  printed column throughout is Serbian Cyrillic (the English column is a
  secondary translation on the same lines).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) authoring the pre-scouted
Taxes candidate (PPDG-2R) to continue building out Serbia; (2) confirming
whether item 45's "Phone, E-mail" caption is genuinely one shared writable
area or two, ideally via a render pipeline that can rasterize this
specimen's Latin-script text (the Helvetica-substitution blank-glyph issue
noted above prevented full resolution this cycle); (3) screening Serbia's
remaining DMV and National ID verticals.
