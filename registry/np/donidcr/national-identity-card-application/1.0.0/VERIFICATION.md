# Verification record — `np/donidcr/national-identity-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3217, scouted from GOV-3212)

GOV-3212 ("GovSchema Standard Research") found Nepal at 2/6 verticals
(Passport, Business Formation), with DMV and Taxes confirmed dead ends (DMV:
fully gated behind `applydlnew.dotm.gov.np`'s quota-based online portal, no
static/manual fallback; Taxes: PAN registration is a pure online e-form via
`taxpayerportal.ird.gov.np`, no static form found). Visa and National ID were
open, unscreened backlog. This issue opens National ID via the Department of
National ID and Civil Registration's (DoNIDCR) own National Identity Card
application form.

## Source

- **Content page:**
  `https://donidcr.gov.np/content/271/details-registration-application-form-for-national-identity/`
  — HTTP 200, no login/CAPTCHA/WAF. The PDF is **not** linked via any plain
  `<a href>` on this page; it is embedded through a flipbook viewer that reads
  a `var pdf = '...'` JavaScript string literal in the page's raw HTML. This
  was independently re-confirmed this cycle by fetching the page directly with
  `curl` and grepping its HTML source for the `var pdf` assignment, per the
  issue brief's own note.
- **Direct PDF:**
  `https://giwmscdnone.gov.np/media/pdf_upload/NID%20form%20eidited%20on%2077-6-7_rd2muyw.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, `application/pdf`, 509,556 bytes —
  matching the issue brief's own recorded byte size exactly.
- **sha256:** `122e2e6b04a64385b70e993aa0ecc9ba71d0fb15d28655691be019bb5052d6f6`
  — independently re-derived this cycle via a fresh `curl` fetch. The brief
  did not record a prior sha256 to cross-check against, so this is the first
  hash on record for this exact file.
- Fetched directly, no login/CAPTCHA/WAF gate encountered at any point.
- Genuine 2-page PDF with a real text layer (not scanned) and **zero**
  AcroForm widgets — every blank line, comb-style date grid, and checkbox is
  static page content the applicant marks by hand, not a fillable form field.
  Confirmed via `pdfjs-dist` (`legacy/build/pdf.js`, pinned 3.11.174):
  `page.getAnnotations()` returns an empty array on both pages;
  `page.getTextContent()` returns 500 text items on page 1 and 370 on page 2.

### Confirmed dead end (not the source used)

`enrollment.donidcr.gov.np`, the department's online pre-enrollment/biometric
portal, is login/biometric-gated with no field-by-field static fallback —
independently re-confirmed this cycle, consistent with the issue brief. The
paper application form above is the correct primary source.

### Weaker candidates on the same domain (disclosed backlog, not used here)

Two other forms surfaced via the same JS-embedded-PDF delivery mechanism on
`donidcr.gov.np`: a scanned "Card Replacement Form" (lost-card/details-change,
thinner) and a scanned correction/rejection-handling form. Both are genuinely
scanned raster PDFs (unlike this schema's genuine text-layer source) and are
left as disclosed backlog for a future companion cycle, per the issue brief.

## Extraction method: page render, not text extraction, for the primary-language content

Direct text extraction via `pdfjs-dist` cleanly recovers this form's small set
of bilingual **English** labels ("First Name", "Middle Name", "Last Name",
"Date of Birth (AD)", "NIN") verbatim, but its primary-language **Devanagari**
(Nepali) text — the overwhelming majority of the form's content, including
every section heading, field label, and checkbox caption — extracts as
garbled, mismapped glyph sequences (e.g. `राि Õů य प å रचयप ý`), and pdfjs logs
`Warning: TT: undefined function: 32` while decoding the embedded font's
glyph table. This is a font-encoding/glyph-mapping gap in the embedded
TrueType font's character mapping, not a scanned-image gap — the text items
are real, positioned, extractable strings; they just do not map to the
correct Unicode code points through this font's own (apparently
non-standard/incomplete) encoding.

Because of this, the full field list, section structure, and the presence or
absence of any required-field marking convention were confirmed **visually**,
from a `node-canvas` 3×-scale render of each full page (`page.render()`
against a `NodeCanvasFactory`), followed by several 6×-scale targeted crops
of every section on both pages specifically to rule out small printed
asterisks or other requiredness markers that a lower-resolution render might
miss. The Nepali label text quoted in `fields[].sourceRef` throughout this
schema was transcribed directly from these renders, not from the garbled
extracted text.

## No required/optional convention on this source at all

Unlike this registry's other Nepal schemas — `np/dop/mrp-offline-application-form`'s
explicit `*` asterisk on every required field, and
`np/ocr/company-registration-private-ekal` — a full-page 3×-scale render of
both pages, plus a further series of 6×-scale crops covering every section
(including the citizenship-type checkbox row, the address blocks, and the
declaration/thumbprint/signature footer), found **not one** printed asterisk,
bold marker, or other required-field convention anywhere on this two-page
form.

Requiredness below is therefore a disclosed judgment call, not read directly
off the source, anchored to the one piece of textual evidence the form does
provide: its own "आवश्यक कागजातहरु" (required documents) checklist at the foot
of page 2 lists six supporting documents, (क) through (च):

- (क) नेपाली नागरिकताको प्रमाणपत्रको सक्कल — original of the Nepali
  citizenship certificate. **No conditional qualifier.**
- (ख) बाबु/आमाको नागरिकताको प्रतिलिपि उपलब्ध भएसम्म — copy of father's/
  mother's citizenship certificate, "as available" (उपलब्ध भएसम्म).
- (ग) नागरिकताको प्रमाणपत्रमा जन्ममिति नखुलेको हकमा सो खुल्ने प्रमाण पत्र वा
  गाउँपालिका/नगरपालिकाको सिफारिस — "in case of" (हकमा) the citizenship
  certificate not showing a date of birth.
- (घ) राहदानी लिएको भए सोको सक्कल वा प्रतिलिपि — "if" (भए) a passport was
  obtained.
- (ङ) बसाईं-सराइ गरेकाहरुको हकमा बसाइसराई प्रमाणपत्र — "in case of" (हकमा)
  migration.
- (च) विवाहितको हकमा नागरिकतामा पति/पत्नीको नाम उल्लेख नभएमा विवाह दर्ता
  प्रमाणपत्र अनिवार्य — "in case of" (हकमा) being married and "if not"
  (नभएमा) the spouse's name is on the citizenship certificate.

Item (क) is the **only** item with no conditional qualifier; every other item
is explicitly conditional. Requiredness is modelled on this asymmetry: the
applicant's own core identity and citizenship-basis data that item (क)'s
unconditional document requirement implicates — `firstName`, `lastName`,
`dateOfBirth`, `placeOfBirth`, `citizenshipCertificateNumber`,
`citizenshipCertificateIssueDate`, `citizenshipCertificateIssuingDistrict`,
`citizenshipType` — plus the applicant's own permanent address
(`permanentAddress*`, the only location data every applicant must have; the
form's temporary address block is explicitly gated "only if different", see
below) are modelled `required: true`. Every other field — including `sex`,
`caste`, `religion`, `maritalStatus`, `occupation`, `educationalQualification`,
and the entire father/mother/grandparent/spouse blocks (whose own supporting
documents are explicitly qualified "as available"/"in case of" in checklist
items ख–च) — is modelled `required: false`.

This follows this registry's existing precedent for sources that provide no
printed required/optional convention at all: `md/asp/vehicle-registration`
disclosed a structural-necessity judgment call in the same situation, rather
than either fabricating asterisks that are not there or defaulting every
field to optional regardless of the source's own textual signals.

`middleName` is modelled optional despite being part of the applicant's own
name, since Nepali given names commonly omit a middle name and the form
treats First/Middle/Last identically (no distinguishing signal).

## Date/calendar modelling

- **`dateOfBirth`:** the form prints this date twice, in two parallel
  calendars, as two side-by-side 8-box Year/Month/Day comb grids — जन्म मिति
  (वि.सं.) (Bikram Sambat, the calendar in official use in Nepal) and "Date of
  Birth (AD)" (Gregorian). Modelled as one canonical ISO `dateOfBirth`
  (`type: date`), consistent with this registry's established
  parallel-calendar merge technique (`np/dop/mrp-offline-application-form`,
  `th/mfa/passport-application-royal-thai-embassy-london`).
- **`citizenshipCertificateIssueDate`** (and the equivalent
  `fatherCitizenshipCertificateIssueDate`/`motherCitizenshipCertificateIssueDate`),
  and **`previousCitizenshipRenunciationDate`:** each an 8-box YYYYMMDD comb
  grid printed with **no calendar label at all** — no वि.सं. or AD marker
  anywhere near them, unlike Date of Birth. Modelled as free-form `string`
  fields (not `type: date`), disclosing rather than fabricating an assumed
  calendar; in practice these are almost certainly Bikram Sambat, consistent
  with standard Nepali citizenship-certificate dating convention, but the
  form's own text does not confirm this.
- **`declarationDate`:** the date beside the applicant's handwritten
  signature on the declaration is a plain blank dotted line with no
  digit-box structure and no calendar label at all — modelled as a free-form
  `string`, the loosest of the three date-like treatments on this form,
  matching its own loosest visual structure.

## `sex`, `citizenshipType`, `maritalStatus`

- **`sex`** (लिङ्ग) is a blank single-line box with no printed instruction key
  defining accepted values, laid out identically to its neighbouring जात
  (caste) and धर्म (religion) free-text boxes. This contrasts with
  `np/dop/mrp-offline-application-form`'s own Sex field, which carries an
  explicit "M for Male, F for Female" key. Modelled as free-text `string`,
  not a fabricated `enum`, since the source draws no distinction between this
  field and its visually identical neighbours that would justify treating it
  differently.
- **`citizenshipType`** (नागरिकताको किसिम) and **`maritalStatus`** (वैवाहिक
  स्थिति) are modelled `enum` because the source itself draws that boundary
  with explicit checkboxes (6 and 3 respectively) — independent of, and using
  a different signal than, the requiredness judgment call above (both remain
  `required: false`, since neither is implicated by checklist item (क)).
  `citizenshipType`'s six checkboxes, in source order: जन्मसिद्ध (by birth),
  जन्मको आधारमा (on the basis of birth), वंशज (by descent), सम्मानार्थ
  (honorary), अंगीकृत (naturalized), वैवाहिक अंगीकृत (naturalized by
  marriage) — mapped to `by-birth`, `on-basis-of-birth`, `by-descent`,
  `honorary`, `naturalized`, `naturalized-by-marriage`.

## Grandparent sections carry no paternal/maternal qualifier

The source labels sections 7 and 8 only "हजुरबुबाको विवरण" (Grandfather's
details) and "हजुरआमाको विवरण" (Grandmother's details) — a targeted crop of
both headings found no "बाबुतर्फको"/"आमातर्फको" (paternal-side/maternal-side)
qualifier anywhere near either one. Modelled as plain `grandfather`/
`grandmother` name-only fields (First/Middle/Last name, matching the source's
own field set for these two sections exactly) rather than fabricating a side
the source does not state.

## `guardianName`

"पितृत्वको ठेगान नभएको हकमा संरक्षकको नाम" — "in case there is no
trace/record of paternity, name of the guardian" — modelled as a plain
optional `string`, provided in place of the father's details when the
applicant's paternal lineage cannot be established. The form has no boolean
field indicating whether a given applicant is in this situation, so it is not
gated with `requiredWhen` against the father's-details fields.

## Address blocks gated "only if different" have no boolean to condition on

The form's own instruction for the applicant's temporary address
("स्थायी ठेगाना भन्दा फरक भएमा मात्र भर्नुहोस्" — "fill in only if different
from the permanent address") and, separately, for each of the father's,
mother's, and spouse's address blocks ("आवेदकको ठेगाना भन्दा फरक ठेगाना भएमा
मात्र भर्नुहोस्" — "fill in only if different from the applicant's address")
each describe a conditional in prose, but none of the four blocks has an
accompanying Yes/No checkbox or other boolean field on the source to key a
`requiredWhen` condition off of. All four blocks (`temporaryAddress*`,
`fatherAddress*`, `motherAddress*`, `spouseAddress*`) are therefore modelled
as unconditionally optional, consistent with this registry's treatment of
similarly prose-only-gated fields elsewhere (e.g. `ng/nimc/nin-enrolment-form`'s
Section B, gated only by a section heading with no boolean trigger).

## No photo field

Unlike this registry's passport schemas (e.g. `np/dop/mrp-offline-application-form`,
`au/apo/passport-application-first-adult`), this form has no photo-attachment
box of any kind — confirmed by grepping both pages' extracted text for
"फोटो"/"Photo" (zero matches) in addition to the visual render. Consistent
with National ID photograph/biometric capture happening live at the DoNIDCR
enrollment counter rather than via a photo submitted with the paper
application.

## Excluded as out of scope

Consistent with this registry's established treatment of biometric/wet-ink
capture on print-and-fill government forms (`np/dop/mrp-offline-application-form`,
`do/mirex/passport-application`, `il/mot/medical-examination-driving-license-renewal`):

- **औंठाको छाप (Thumbprint), Right (दायाँ) and Left (बायाँ)** — physical
  biometric capture, excluded outright.
- **निवेदकको दस्तखतः (Applicant's Signature)** — a physical handwritten
  signature mark, excluded outright. Its accompanying date is retained as
  `declarationDate`, since that date is itself a distinct data value, not a
  physical mark.
- **रुजु गर्ने अधिकारीः (Verifying Officer)** — position/signature/date block,
  department-staff attestation performed after submission, not
  applicant-supplied data.
- **आवश्यक कागजातहरु (Required Documents), items (क)–(च)** — informational
  text describing what supporting documents to attach; the source provides no
  checkbox or blank alongside any list item, so this is not itself a field
  the applicant completes (it is, however, the basis for the requiredness
  judgment call above).
- The form's title, salutation ("श्रीमान् महानिर्देशकज्यू..."), subject line,
  and declaration prose ("मैले माथि उल्लेख गरेको व्यहोरा साँचो हो...") are
  boilerplate, not data fields.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/enum rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran the following fixtures in
`conformance/np/donidcr/national-identity-card-application/1.0.0/`:

- `valid-full-application.json` (all 13 required fields, plus the large
  majority of optional fields including full father/mother/grandparent/spouse
  blocks, populated) — **0 errors**.
- `valid-minimal-required-only.json` (only the 13 required fields populated)
  — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `lastName`) —
  **exactly 1 error**.
- `mutation-control-invalid-enum-citizenship-type.json` (`citizenshipType`
  set to `foreign-born`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-enum-marital-status.json` (`maritalStatus` set to
  `engaged`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (`dateOfBirth` set to a
  non-ISO string) — **exactly 1 error**.

This schema has no `requiredWhen` rules — every conditionally-worded field on
the source lacks a boolean to key a condition on, as discussed above — and no
required `documents[]` entries, so no fixtures target those.

## Structural validation

- `node tools/validate.mjs` — full registry, **489/489** document(s) passed
  after adding this document (3/3 `mapping.json` companions also passed).
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) — full
  registry, **489/489** document(s) validated (3/3 `mapping.json` companions
  also validated).
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: every field traces to a specific labelled blank,
comb grid, or checkbox visually confirmed on a high-resolution render of the
genuine, currently-served official form, but no live filing at a DoNIDCR
office was attempted. GovSchema is an independent, non-profit standards body
and is not affiliated with, endorsed by, or operated by the Government of
Nepal or the Department of National ID and Civil Registration.
