# Verification record — pg/ica/passport-application@1.0.0

## Candidate selection

GOV-5812 ("GovSchema Standard Research"). Re-scanned `CATALOG.md` fresh
first: the Executive Summary's own three most recent entries (GOV-5791,
GOV-5798, GOV-5805) show Papua New Guinea opened as the registry's 101st
jurisdiction via Business Formation only
(`pg/ipa/business-name-registration@1.0.0`, 1 of 6 verticals), and the Known
Gaps `0t.` entry explicitly banks PG's other five verticals (DMV, Visa,
Passport, Taxes, National ID) plus a sibling IPA Form A-2 as open,
unscreened backlog for a future cycle. This cycle screened all five PG
verticals directly, each with an actual `WebSearch`/`curl`/`pdfjs-dist`
confirmation, not a memory-based guess:

- **Passport** — found and authored (this document). See below.
- **National ID** — the Papua New Guinea Civil and Identity Registry's
  (PNGCIR) own NID/birth registration forms
  (`pngcir.gov.pg/wp-content/uploads/2020/03/Births-NID-Registration-form_new_Citizenship_Form.pdf`,
  HTTP 200, 836,266 bytes; and
  `pngcir.gov.pg/wp-content/uploads/2020/01/Form-1-Birth.pdf`, HTTP 200,
  475,527 bytes) are live and unauthenticated, but both confirmed via
  `pdfjs-dist` to carry **zero** AcroForm widgets — flat PDFs with no
  fillable fields at all, weaker than the Passport form's genuine 93-widget
  AcroForm. Not authored this cycle.
- **Visa** — two candidates found, both live, unauthenticated, and
  genuinely rich AcroForms: the ICA's own "Application to Extend Entry
  Permit"
  (`ica.gov.pg/uploads/media/post_file_2430587-visa-extension-form-new-savable.pdf`,
  HTTP 200, 123,043 bytes, confirmed 62 widgets across 2 pages) and a
  first-entry "Application for entry permit" mirrored by the PNG-Japan
  Society
  (`png.or.jp/wp-content/uploads/2016/01/Application_for_entry_permit_form_new_savable.pdf`,
  HTTP 200, 180,934 bytes, confirmed 102 widgets across 4 pages, itself
  watermarked "Downloaded from www.immigration.gov.pg"). Both are real
  candidates for a future cycle, but not authored this cycle: the Passport
  candidate (93 widgets, hosted directly on `ica.gov.pg` with no
  third-party mirror at all) was judged the stronger single pick, and this
  cycle's own scope is one deliverable.
- **DMV** — the Road Traffic Authority's (RTA) driver-licence Forms 1 and 2
  (`rta.gov.pg/pdfs/forms/Form1.pdf` and `Form2.pdf`, both HTTP 200) are
  live and unauthenticated but both confirmed via `pdfjs-dist` to carry
  zero AcroForm widgets; the RTA's "Road Traffic Rules — Licensing of
  Drivers 2017"
  (`rta.gov.pg/pdfs/licences&approvals/RTR_LicensingOfDrivers2017.pdf`,
  HTTP 200, 1,450,313 bytes) is a 26-page regulatory document, not an
  application form at all, and likewise carries no widgets. No viable DMV
  candidate found this cycle.
- **Taxes** — the Internal Revenue Commission's (IRC) own downloads page
  (`irc.gov.pg/downloads/`) returned HTTP 403 to both `WebFetch` and a
  direct fetch attempt; no direct static individual-income-tax-return form
  URL was found by search (only a GST/Goods & Services Tax form,
  `static.irc.gov.pg/.../G1-Goods-Services-Tax-Return.pdf`, a business tax,
  not individual income tax). Other sources point only to the `myIRC`
  online portal, which this cycle could not confirm is reachable without a
  login. No viable Taxes candidate found this cycle.

The Passport candidate — ICA's Form FA 81, "Application for a Travel
Document" — was the clear winner of the five screened: hosted directly on
the Immigration and Citizenship Authority's own official domain
(`ica.gov.pg`, no third-party mirror), no login/CAPTCHA/WAF gate, and a
genuine 93-widget AcroForm across 4 pages — richer than every other PG
vertical candidate found this cycle, including both Visa candidates (62 and
102 widgets), which remain open, unauthored backlog. PG's own sibling Form
A-2 (overseas company registration, banked in GOV-5791 as a weaker Business
Formation companion) was not re-screened this cycle, since a stronger
candidate (Passport) was found first among the five verticals actually in
scope for this cycle.

## Reaching the live source

Independently re-fetched
`https://ica.gov.pg/uploads/media/post_file_5437896-passport-application-form-fillable-savable.pdf`
directly via plain `curl`, twice, to confirm reproducibility:

- HTTP 200, 327,603 bytes, both times.
- sha256 `a61da176b95c22f05cd554b36d635791bbf7e867bd1e41a12514e902a2c2cf28`,
  both times.
- No login, CAPTCHA, or WAF/JS-challenge gate blocks reaching or reading
  this file — served directly by Cloudflare (`server: cloudflare`) with a
  permissive `cache-control: max-age=2592000` header.
- `Last-Modified: Tue, 12 Mar 2019 06:01:54 GMT` — a long-standing, stable
  specimen, not a recent upload, corroborating this as the Authority's own
  settled canonical form rather than a draft in flux.

Confirmed via `pdfjs-dist` to be a genuine native (searchable-text) PDF, not
a scanned image: a clean text-layer extraction across all 4 pages recovered
every printed label with no glyph-mapping or OCR workaround needed.

## Extraction method

Extracted with `pdfjs-dist` (vendored install at `/tmp/node_modules`,
CommonJS build at `legacy/build/pdf.js`): first a full `getAnnotations()`
pass per page to enumerate every AcroForm Widget (93 total: page 1 — 0,
a pure cover/instructions page; page 2 — 39; page 3 — 38; page 4 — 16),
recording each widget's internal field name, PDF field type (`Tx`/`Btn`/
`Ch`), and rect (bounding box) position; then a `getTextContent()` pass per
page, sorted by descending y then ascending x, to recover genuine reading
order; then, for every checkbox group (documentType's 5 boxes,
previousDocumentStatus's 5 boxes, and every yes/no pair) and the two
Section-14 combo-box dropdowns, a `canvas`-rendered PNG of the page (2x
scale) to visually confirm option-to-checkbox and label-to-widget mapping
rather than trusting rect-position inference alone. The two dropdowns'
own `options` arrays were read directly off the `Ch`-type annotations:
Dropdown1 is an ordinal day-of-month combo box (blank, then "1st"
through "31st"); Dropdown2 is a month-name combo box (blank, then
"January" through "December").

## Structure and scoping decisions

Models 79 `fields[]` across 8 steps, 7 `documents[]` entries, and 1
`crossFieldValidation` rule. Disclosed scoping decisions:

1. **No fillable signature widget exists anywhere on this specimen.**
   Every "Signed"/"Signature"/"Signature of Witness"/"Signature or Mark"
   line across all 4 pages (Section 9's two consent rows, Section 13's
   certificate, Section 14's declaration, and Section 15's interpreter/
   witness row) was checked against the full page annotation dump and
   confirmed to have **zero** backing AcroForm widget — only the
   accompanying Date field (where one exists) is a real widget. This
   differs from both `bz/doi/passport-application` (one signature widget,
   `submitterSignature`) and `tt/imd/passport-application-first-adult` (one
   signature widget) — this registry's own convention of only modelling
   signature capture where a genuine widget exists therefore means **no**
   signature field is modelled in this schema at all, not even a single
   one.

2. **This entire specimen prints no required/optional signal of any
   kind** — no asterisk, no "(required)"/"(optional)" caption, on any of
   its 4 pages (confirmed by a full page-by-page text-layer read). Absent
   any printed signal, this schema follows the same policy the DR Congo
   visa schema (`cd/maeci/visa-application`) adopted under an identical
   constraint: required only the fields necessary to identify the
   applicant and the substance of the application (document type, full
   name, sex, date of birth, birth province/country, occupation, marital
   status, residential address, the mandatory Section 13 certificate and
   Section 14 declaration fields, and the Attachment A citizenship-status
   questions), and bare-optional for physical-description minutiae,
   secondary addresses, travel-logistics detail, and every conditional
   block (parental consent, previous-travel-document history, interpreter/
   witness), which are instead gated by `requiredWhen` wherever the form's
   own prose states a real conditional relationship.

3. **Two directly-supplied boolean gates** (`applicantUnder17`,
   `applicantCannotReadWriteEnglish`) were added to model conditions the
   form states in prose without a printed checkbox of their own —
   Instruction 8 ("Applicants under 17 years of age must furnish the
   consent of their parents or legal guardians") and Section 15's own
   header ("Applicants who cannot read or write English") — mirroring this
   registry's own `hasSponsor`/`hasHostInMalta` convention
   (`cd/maeci/visa-application`; `mt/identita/long-stay-visa-application`).
   Neither is invented eligibility logic: both conditions are stated
   outright on the form itself, just without a backing widget of their
   own.

4. **`otherParentFullName` (Section 9's second consent block) is left
   bare-optional**, not gated on `applicantUnder17`, since the form
   provides two parent/guardian consent blocks but neither Instruction 8
   nor Section 9's own header states unambiguously that both must always
   be completed (a sole-custodial or sole-surviving parent could not
   otherwise satisfy a hard `requiredWhen` gate here) — consistent with
   this registry's standing lesson never to gate requiredness on an
   otherwise-optional trigger absent an explicit either/or signal (see
   `notequals-empty-string-absent-field-bug`).

5. **Several internal PDF field names are generic auto-numbered
   artifacts** ("Text10", "Text13" through "Text39", "Date_2" through
   "Date_7", "Full name_2", "Occupation_2"/"Occupation_3", "Address_2",
   "Telephone number_2"), disambiguated throughout by rect position and
   cross-checked against the canvas-rendered page images, not by internal
   name.

6. **Two page-4 fields are printed as single combined boxes**, not
   separate ones: "Full name and date of birth of mother" and "Place of
   birth and Citizenship of mother" (and the equivalent father fields) are
   each backed by exactly one AcroForm widget, modelled as one combined
   field each (`motherFullNameAndDateOfBirth`,
   `motherPlaceOfBirthAndCitizenship`, and the father equivalents), not
   decomposed into name/date-of-birth or place/citizenship sub-fields the
   source itself does not separate.

7. **Attachment A's own two "Are you a citizen..." questions are printed
   with a grammatical typo** ("Are you are citizen of Papua New Guinea?" /
   "Are you are citizen of foreign country?") — quoted verbatim (*sic*) in
   `sourceRef` rather than silently corrected.

8. **Five independent AcroForm checkboxes model `documentType` and five
   model `previousDocumentStatus`** — neither is a single PDF radio-button
   field (each checkbox is its own independent `Btn` widget with generic
   `exportValue` "Yes"), so both are modelled as mutually-exclusive enums
   rather than as five separate boolean fields, consistent with this
   registry's established convention for this checkbox-group pattern (see
   e.g. `cd/maeci/visa-application`'s `maritalStatus`/`passportType`).

9. **One `crossFieldValidation` rule**
   (`travelDocumentExpiryNotBeforeIssue`) checks the previous travel
   document's own expiry date is not before its issue date — a genuine
   structural date-sanity rule, not invented eligibility logic, mirroring
   `bz/doi/passport-application`'s own `reportDateNotBeforeDateOfLoss`
   rule.

Models 79 `fields[]` across 8 steps (2 of the 79 —
`applicantUnder17`/`applicantCannotReadWriteEnglish` — are directly-supplied
gates without a backing widget; the other 77 collapse this specimen's 93
total AcroForm widgets, since 16 widgets across 10 checkbox groups —
`documentType` [5→1], `sex` [2→1], `hasChangedName` [2→1],
`maritalStatus` [2→1], `previouslyIssuedTravelDocument` [2→1],
`previousDocumentStatus` [5→1], `lossReportedToPolice` [2→1],
`livedAllLifeInPNG` [2→1], `isCitizenOfPNG` [2→1],
`isCitizenOfForeignCountry` [2→1] — each collapse into one enum/boolean
field), 7 `documents[]` entries (the K100 fee payment; two passport
photographs; evidence-of-citizenship documents; the conditional previous
travel document; and three attestations — the Section 13 certificate, the
Section 14 declaration, and the conditional Section 9 parental consent),
and 1 `crossFieldValidation` rule.

## Conformance

3 valid mock scenarios —
`valid-minimal-adult-no-previous-document-english-literate` (a minimal adult
applicant, no previous travel document, full English literacy),
`valid-under17-lost-passport-with-police-report` (an under-17 applicant
exercising both parental-consent blocks and a lost-previous-passport branch,
including the police-report sub-branch), and
`valid-illiterate-in-english-full-interpreter-witness-block` (an applicant
who cannot read or write English, exercising the full interpreter/witness
block) — plus 13 mutation-control fixtures (7 missing-required fixtures,
one per statically-required field spanning every step that has one; 3
missing-`requiredWhen` fixtures, one per conditional branch
[`lodgingParentFullName`, `travelDocumentNumber`, `explainedInLanguage`];
an invalid-enum-value fixture against `documentType`; an
unknown-field-rejected fixture; and a `crossFieldValidation`-violation
fixture with the previous travel document's expiry date set before its
issue date) — are committed under
`conformance/pg/ica/passport-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen`/`crossFieldValidation` rules directly from this schema's own
`fields[]`, discarded after use, not committed) ran all 16 fixtures: all 3
valid scenarios at 0 errors, all 13 mutation controls each raising exactly
1 error. Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run (705/705 documents pass both validators with this file
included).

## Outcome

Opens Papua New Guinea's Passport vertical (2 of 6 verticals now open,
alongside Business Formation via `pg/ipa/business-name-registration`). DMV
and Taxes are confirmed dead ends this cycle (no viable static-form
candidate found); Visa has two live, unauthenticated, genuinely rich
AcroForm candidates (62 and 102 widgets) banked as unauthored backlog for a
future cycle; National ID has two live but flat (zero-widget) candidates,
weaker than a genuine AcroForm, also banked as backlog. PG's own sibling
Form A-2 was not re-screened this cycle.
