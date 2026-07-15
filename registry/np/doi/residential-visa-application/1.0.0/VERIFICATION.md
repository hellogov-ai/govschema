# Verification record — `np/doi/residential-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3237, scouted from GOV-3235)

Nepal stood at 3/6 verticals (Passport, Business Formation, National ID)
going into this cycle. GOV-3078 had already confirmed Nepal's DMV
(`applydlnew.dotm.gov.np`, quota-gated online portal, no static form) and
Taxes (`taxpayerportal.ird.gov.np`, pure online e-form, no manual) as dead
ends. Visa was the one remaining unscreened vertical, per CATALOG.md's own
most recent Nepal entry (GOV-3217): "Nepal's Visa vertical remains
unscreened, open backlog for a future cycle." This issue screens and opens
it.

## Sources screened

### Dead ends / not used

- **`nepaliport.immigration.gov.np`** (Department of Immigration's Online
  Visa Application system) — a login/session-gated wizard
  (`/onlinevisa-mission/application`), no field-by-field static fallback.
  Excluded per the issue brief's own instruction not to use login-gated
  wizards.
- **`immigration.gov.np`'s two general "Download" PDFs** (linked from the
  site's Visa/Rules/Download pages, HTTP 200, no gate):
  - "आगमन प्रस्थान विवरण फाराम" (Arrival/Departure Detail Form,
    `get-file/downloads/Downloads-202605081615396407.pdf`) — a short letter
    template addressed to the Director General requesting one's own
    arrival/departure record, 6 blank lines total (passport no., contact
    no., purpose, name, signature). Not a visa application.
  - "स्वघोषणा फारम (भिजिट भिसामा बिदेश जाने प्रयोजन)" (Self-Declaration Form,
    for the purpose of going abroad on a visit visa,
    `get-file/downloads/Downloads-202605081620562536.pdf`) — a genuine
    scanned (raster, no text layer) declaration filed by **outbound Nepali
    citizens** travelling abroad on a visit visa, not an application for a
    visa **to** Nepal. Confirmed via `pdfjs-dist` (`getTextContent()`
    returns zero items on its one page) and a node-canvas 3×-scale render.
- **Department of Consular Services** (`nepalconsular.gov.np`, MOFA's
  consular channel named in the issue brief) — scoped to document
  attestation/authentication and citizenship/legal services; no visa
  application form.
- **Embassy of Nepal, New Delhi** (`in.nepalembassy.gov.np/pages/Visa-1/`,
  a genuine `.gov.np` diplomatic-mission domain) — HTTP 200, but its Visa
  page and Download category list only Citizenship Verification and Medical
  Treatment application forms; the page itself directs applicants to the
  same `nepaliport.immigration.gov.np` online portal for visa applications,
  no static form of its own.
- **Immigration Rules 2051, Schedule-6** (अनुसूची-६, relating to Rule 16(1)),
  "विदेशीहरुका लागि आगमन फाराम" (Arrival Form for Foreigners) — found in the
  same source PDF as the schema used below (pages 41–42). A genuine,
  richly-structured 18-item form, but it is an **arrival/entry-control
  record** completed at the port of entry (its own fields 6(क)/6(ख) assume
  an entry-visa number and validity date already exist), not a "निवेदन
  फाराम" (application form) requesting a visa — considered and set aside in
  favour of Schedule-4's explicit application form, consistent with this
  registry's convention (established by `tz/immigration/visa-application`,
  `vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam`, `il/mfa/entry-visa-application`)
  that the Visa vertical models an application **for** a visa, not an
  arrival/exit card. Left as disclosed backlog for a future companion-schema
  cycle, alongside the Schedule-6-companion Nepali-citizen departure/arrival
  forms on the same pages (अनुसूची-६क/६ग, ७, ७क).

### Source used

**Immigration Rules, 2051 (1994), as amended — Schedule-4 (अनुसूची-४,
relating to Rule 11(4)), "आवासीय भिसाका लागि निवेदन फाराम" (Application Form
for Residential Visa), pages 36–37.**

- **Content page:** `https://immigration.gov.np/detail/136` ("अध्यागमन
  नियमावली-२०५१", reachable from the site's own `/rule` navigation page) —
  HTTP 200, no login/CAPTCHA/WAF.
- **Direct PDF:**
  `https://immigration.gov.np/doi-notice-file/Notices-202605082109391297.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, `application/pdf`, 1,054,626 bytes.
- **sha256:** `56481cf965bfd9b9f26d4a9471ec7d65bb736debd69c5a0d7cd643801d1e1875`
  — independently derived via two separate `curl` fetches in this session,
  byte-identical both times.
- Fetched directly over TLS (`curl -k`; the certificate chain did not verify
  cleanly through this sandbox's trust store, the same class of issue
  disclosed on `th/mfa`'s `authority.url` in GOV-3228 — the file itself
  downloads correctly and its content is unaffected).
- `pdfjs-dist` (`legacy/build/pdf.js`, pinned 3.11.174) confirms a genuine
  68-page PDF with a real text layer, zero AcroForm widgets on any page
  (`getAnnotations()` returns an empty array throughout) — every blank line
  and the photo box on pages 36–37 are static page content, not fillable
  form fields.

## Extraction method: page render, not text extraction

Direct text extraction via `pdfjs-dist` returns positioned but visually
mis-ordered Devanagari glyph sequences for this document (a `TT: undefined
function: 21` warning is logged while decoding the embedded font), the same
class of gap this registry has already documented for
`np/donidcr/national-identity-card-application`. The full field list,
section numbering, and the presence or absence of any required-field
convention were instead confirmed **visually**: a node-canvas 4×-scale
render of pages 36–37, followed by a further 6×-scale targeted crop of
Section 10 (items क–घ) specifically to rule out small printed checkboxes or
asterisks that a lower-resolution render might miss. The Nepali label text
quoted in `fields[].sourceRef` was transcribed directly from these renders.

## No required/optional convention on this source at all

A full-page 4×-scale render of both pages, plus the 6×-scale crop of Section
10, found **not one** printed asterisk, bold marker, or other required-field
convention anywhere on this two-page form — consistent with
`np/donidcr/national-identity-card-application` and unlike
`np/dop/mrp-offline-application-form`'s explicit asterisk convention.

Requiredness is therefore a disclosed judgment call, anchored to the form's
own structure rather than any printed marker:

- **Required:** the applicant's core identity and passport particulars that
  every applicant, regardless of filing channel or declared basis, must
  supply to be identifiable at all — `fullName`, `nationality`,
  `placeOfBirth`, `permanentAddress`, `occupation`, `passportNumber`,
  `passportIssueDate`.
- **Optional:** `addressInNepal` — an applicant filing from abroad via a
  diplomatic mission, before ever entering Nepal, has none to give (see the
  dual Ambassador/Director-General addressee choice printed at the top of
  the form).
- **Optional:** `lastVisaValidityDate`, `priorNepalResidenceDuration`,
  `priorNepalEngagementSector` (items 8, 9(क), 9(ख)) — item 8 carries the
  source's own inline qualifier "(नेपाल प्रवेश गरिसकेको भए)" / "if already
  entered Nepal"; items 9(क)/9(ख) are the natural continuation of the same
  precondition. The form provides no separate yes/no checkbox for prior
  entry to bind a `requiredWhen` condition to, so these are modelled as
  plain optional fields rather than fabricating a boolean gate the source
  does not print.
- **Optional:** `areaOfEminence`, `intendedContributionSector`,
  `investedOverUsd1MillionOnce`, `otherBasisForVisa` (Section 10, items
  क–घ) — four alternative declared bases for the residential-visa request;
  an applicant ordinarily completes whichever applies to their own
  circumstances, not all four, but the source imposes no mutual-exclusivity
  marker (no radio-button/single-select convention, no "choose one of the
  following" instruction), so none is fabricated as an `exclusivityGroups`
  constraint here.
- **Optional:** `numberOfFamilyMembers`, `additionalRemarks`,
  `attachedDocumentsDescription`, `photo` — open-ended disclosure items with
  no textual signal of mandatoriness.

## Field-modelling notes

- **`fullName`:** the form prints "नाम, थर" (Name, Surname) as a single line
  label over one blank line — unlike this registry's other Nepal schemas
  (e.g. `np/donidcr`'s separate First/Middle/Last boxes), there is only one
  blank here, so it is modelled as one field rather than a fabricated split.
- **`investedOverUsd1MillionOnce`:** item 10(ग) is printed as a completed
  declarative statement ending in a full stop ("।"), not a colon-terminated
  fill-in blank like its sibling items 10(क)/10(ख)/10(घ), and carries no
  checkbox glyph (confirmed at 6×-scale crop) — modelled as `boolean` since
  the underlying fact (did the applicant make a single investment exceeding
  USD 1 million) is inherently yes/no, unlike the open-ended "which area"
  questions in 10(क)/10(ख).
- **`otherBasisForVisa`:** item 10(घ) ("अन्य" / Other) is followed on the
  next page by three blank continuation lines bulleted with the Devanagari
  vowel letters (अ)(आ)(इ) — these are generic continuation-line markers, not
  three distinct sub-questions with their own labels, so they are modelled
  as one multi-line text field.
- **`attachedDocumentsDescription`:** item 13 ("संलग्न कागजातहरू" / Attached
  Documents) gives three blank lines (क)(ख)(ग) for the applicant to name
  whatever papers accompany the application. Unlike
  `np/donidcr/national-identity-card-application`'s own printed
  required-documents checklist (which that schema correctly excludes as
  informational, not applicant-entered data), this source names no fixed
  document list of its own — the three lines are the applicant's own
  free-form input, so they are modelled as one data field rather than
  excluded.
- **`photo`:** a photo box (फोटो) is printed top-right, not backed by an
  AcroForm widget, consistent with every other item on this form carrying
  no fillable-widget backing.
- **Excluded — recipient salutation line:** "श्री महामहिम राजदूतज्यू/श्री
  महावाणिज्यदूतज्यू, श्री वाणिज्यदूतज्यू/श्री महानिर्देशकज्यू" (His
  Excellency the Ambassador/Consul General, Consul/Director General) is a
  fixed printed choice of addressee reflecting where the application is
  filed (a diplomatic mission abroad, or the Department directly in Nepal),
  not applicant-supplied data — excluded as form letterhead, consistent
  with this registry's treatment of salutation/addressee lines.
- **Excluded — applicant's signature:** "निवेदकको हस्ताक्षर" is a
  handwritten wet-ink mark, excluded consistent with this registry's
  established treatment of physical signature lines on print-and-fill
  government forms (`np/dop/mrp-offline-application-form`,
  `np/donidcr/national-identity-card-application`,
  `do/mirex/passport-application`). Unlike those schemas, this form's
  signature line carries no adjacent date field of its own to retain (the
  only date field on the form, item 7(ख), is the passport issue date).

## `process.language`

Set to `ne` (Nepali), diverging from this registry's other three Nepal
schemas (`np/dop`, `np/ocr`, `np/donidcr`), which are all set to `en` despite
being substantially or entirely Devanagari-language sources. This form's two
pages contain **zero** English-language tokens anywhere (confirmed via both
the page renders and the raw extracted, if mis-mapped, text stream) — a BCP-47
language tag of `ne` is the more spec-accurate reading of "language tag of
the source form" (per the spec's own field description) for this
specific document. Not a change to the other three schemas, which are out of
scope for this issue.

## Validation run

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against spec/v0.3) both pass on the full registry after adding this
  document.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json`.
- An ephemeral, from-scratch conformance checker (deriving required/type
  rules directly from this schema's own `fields[]`, discarded after use, not
  committed) ran the fixtures in this version's `conformance/` directory.
