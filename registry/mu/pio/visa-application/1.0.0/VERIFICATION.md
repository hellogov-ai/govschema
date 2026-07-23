# Verification record — mu/pio/visa-application@1.0.0

## Candidate selection

GOV-4617 ("GovSchema Standard Research"). Mauritius opened as the
registry's 92nd jurisdiction via `mu/pio/passport-application` (GOV-4603),
which banked three further STRONG verticals as open backlog: DMV, Business
Formation, and Visa; DMV was authored next (GOV-4610,
`mu/nlta/vehicle-registration-mark-application`). This schema authors the
Visa candidate that same GOV-4603 record had already independently
byte-verified: the Passport and Immigration Office's own bilingual
"Application for a Visa for Mauritius / Demande de Visa pour Maurice",
`passport.govmu.org/passport/?mdocs-file=712`. A sibling link on the same
site (`?mdocs-file=887`) is a red herring — a 36-page Occupation/Residence
Permit guideline booklet, not a form — and was not used.

## Reaching the live source

`https://passport.govmu.org/passport/?mdocs-file=712`

- Plain unauthenticated `curl -L` with a desktop User-Agent, no
  session/cookie state, no CAPTCHA/WAF challenge.
- HTTP 200, **296,537 bytes** retrieved — an exact byte-for-byte match to
  the figure GOV-4603 banked for this candidate.
- sha256 of the retrieved bytes:
  `44510201619e427ee1a20237fca13486fa8de1b8c73180e46eb303a54144d7de`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations; `getTextContent()` returned
  only the repeated date-box header glyphs ("D J M M Y A" x6) — a flat,
  scanned/rasterized image embedded in the PDF, not an interactive AcroForm
  and not a text-layer specimen (same pattern as this registry's other two
  Mauritius schemas).

### Authority attribution

The document's own header reads "REPUBLIC OF MAURITIUS" with the national
coat of arms, and is hosted directly on the Passport and Immigration
Office's own domain (`passport.govmu.org`), the same authority already
attributed for `mu/pio/passport-application`. `authority` is attributed to
the Passport and Immigration Office (abbreviation PIO) directly.

## Extraction method

Since neither the text-content nor annotation layers yielded a usable
field-level specimen (a pure scanned-image PDF), the single page was
rendered via `pdfjs-dist` + the vendored `node-canvas` build (per this
registry's own `gov-form-pdf-extraction` precedent for image-only
specimens), at both a full-page 2.5x-scale pass and several higher-scale
(4x/6x) cropped re-renders to confirm small print (date-box header letters,
checkbox layout). The scan is clean and high-contrast — every label, box
grid, and checkbox is legibly rendered with no glyph-rendering failures of
the kind this registry has seen on other rasterized specimens.

## Document structure

A single page, five titled sections (no numbered items), bilingual
English/French throughout:

- **Personal Particulars** (untitled top block): Title, Reference Number
  (For Official Use), Surname, First Name(s), Maiden Name, Date of Birth,
  Profession, Country of Birth, Nationality, Permanent Address (two-row box
  grid), Tel., Fax Number, E-mail.
- **Particulars of Residence Permit (For person not residing in his/her
  country of origin)**: Date of Issue, Date of Expiry.
- **Particulars of Passport or Other Travel Document**: Type of Document,
  Date of Issue, Number, Date of Expiry, Country of Issue.
- **Particulars of Visit**: Purpose of Visit, Duration of Stay, "In the
  case of transit, do you have a permit to enter the country of your final
  destination? Yes/No", Expected Date of Travel, Flight No., Address in
  Mauritius (two-row box grid), Tel., Financial Means for your Upkeep
  during your Stay, Indicate Currency.
- **Declaration**: a single sworn statement, then Date and Signature.
- A top-right corner box, outside the ruled form grid: "TO SUBMIT TWO
  PHOTOS. / A SOUMETTRE DEUX PHOTOS."

## Scope: fields and sections excluded

- **Reference Number (For Official Use)** — explicitly marked "For
  Official Use" in the form's own printed caption; officer-only, not
  applicant-supplied, the same convention this registry applies to other
  excluded official-use boxes (e.g. `mu/nlta/vehicle-registration-mark-application`'s
  "OFFICIAL USE" box).

## Scope: judgment calls on requiredness

This source carries no asterisk/mandatory-marking convention anywhere on
the page, so requiredness was assigned by engineering judgment:

1. **Core identity, travel-document, and declaration fields modelled
   required** — surname, first name(s), date of birth, profession, country
   of birth, nationality, permanent address, all five travel-document
   fields, purpose of visit, duration of stay, expected date of travel,
   both financial-means fields, and the declaration date/signature — the
   form's own operative content, without which the Office cannot process a
   visa request, consistent with this registry's standard approach.
2. **Maiden Name, and both Residence Permit fields, left optional and
   ungated.** Each is explicitly conditional in its own printed heading
   ("Maiden Name" applies to married women; the Residence Permit section is
   captioned "For person not residing in his/her country of origin"), but
   the form provides no marital-status/sex/residency discriminator field to
   gate on (unlike `mu/pio/passport-application`'s own `maritalStatus`
   field) — so these are left unconditioned to match the source's own
   layout rather than fabricating a gate the form does not itself express.
3. **`hasTransitEntryPermit` left optional and ungated**, for the same
   reason: it is explicitly conditional ("In the case of transit...") but
   `purposeOfVisit` is a free-text field, not an enum/checkbox, so there is
   no structured value to gate on.
4. **`travelDocumentType` modelled as free text, not an enum.** The section
   header ("PARTICULARS OF PASSPORT OR OTHER TRAVEL DOCUMENT") implies more
   than one accepted document type, but the form prints no checkbox list or
   enumerated options next to the boxed entry — just a run of blank boxes
   captioned "Type of Document" — so this schema does not invent options
   the source does not itself show.
5. **`durationOfStay` modelled as a string, not a number.** The box grid is
   short with no printed unit (e.g. days vs. months); rather than assume a
   unit the source does not state (contrast `bw/dic/visa-application`'s own
   `proposedLengthOfStayDays`, whose source form does print "Days"), this
   field stays free text.
6. **`permanentAddress`/`addressInMauritius` each modelled as a single
   field, not split into line1/line2.** Each prints as a two-row box grid
   with no distinct sub-captions on the continuation row, matching this
   form's own undifferentiated layout (same reasoning as
   `mu/nlta/vehicle-registration-mark-application`'s address fields).
7. **`financialMeansCurrency` modelled as free text, not a fixed-currency
   enum.** Unlike `bw/dic/visa-application`'s own USD/EUR/ZAR/Other
   multi-field pattern, this form prints one generic "Indicate Currency"
   box with no currency options listed, so a single free-text
   amount+currency pair was modelled to match the source's own single
   field pair.
8. **`flightNumber` modelled optional.** Not always known at the time of
   application (e.g. before a flight is booked); the form does not mark
   this conditional, but this registry treats such booking-dependent
   fields as optional absent a stronger source signal.
9. **Fax Number and E-mail modelled optional**, per this registry's
   standard treatment of auxiliary contact channels alongside a primary
   Tel. field, consistent with `mu/pio/passport-application`'s own
   `officeTelNo`/`emailAddress` fields.

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]` conditions (not committed as fixture files, following this
registry's own precedent for single flat-image short-form specimens, e.g.
`mu/nlta/vehicle-registration-mark-application`): (1) a single adult
tourist applying for a short holiday visa, residing in her country of
origin, travelling directly (no transit) with a booked flight — Residence
Permit fields left blank (optional, correctly not required),
`hasTransitEntryPermit` left blank, `flightNumber` populated,
`financialMeansAmount`/`financialMeansCurrency` populated; (2) a married
woman resident abroad transiting through a third country en route to
Mauritius, applying before booking her onward flight — `maidenName`
populated, both Residence Permit fields populated (applicable since she
does not reside in her country of origin), `hasTransitEntryPermit` = true,
`flightNumber` left blank (optional, correctly not required). No
`requiredWhen`/`visibleWhen` conditions exist in this schema (per the
requiredness judgment calls above), so both scenarios instead exercise the
full set of fields this registry chose to model as optional, confirming
none silently reject a legitimate blank value.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3/govschema.schema.json`).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 30 `fields[]` across 5 steps, plus 1 `documents[]` entry (two
passport-style photographs, per the form's own top-right corner
instruction). Business Formation remains Mauritius's only open, STRONG
banked backlog item (the Corporate and Business Registration Department's
downloadable-forms page, per GOV-4603's/GOV-4610's own record).
