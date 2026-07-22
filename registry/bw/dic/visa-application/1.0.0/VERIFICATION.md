# Verification record — bw/dic/visa-application@1.0.0

## Candidate selection

GOV-4321 ("GovSchema Standard Research", 2026-07-22). Rather than scouting a
new jurisdiction from scratch, this cycle deepened Botswana's own
pre-scouted, STRONG banked backlog left open by the GOV-4307 cycle (see
CATALOG.md's Known Gaps entry 0e): Form 1, "Application for a Visa" — one of
two STRONG-but-unauthored Botswana verticals remaining (Visa, Passport) after
the GOV-4314 cycle authored DMV (`bw/drts/driving-licence-application`).
Opens Botswana's Visa vertical (3 of 6).

## Reaching the live source

Fetched
`https://www.gov.bw/sites/default/files/2026-03/Application%20for%20a%20VISA%20Form%201_2.pdf`
directly with a plain unauthenticated `curl` request (no session/cookie
state, no CAPTCHA/WAF challenge):

- HTTP 200, `Content-Type: application/pdf`, 477,256 bytes — a byte-for-byte
  match with the GOV-4307 cycle's own reported size, confirming the source
  is unchanged since it was banked.
- PDF header `%PDF-1.4` at byte 0.
- Confirmed mechanically: zero `/AcroForm`, `/Widget`, and `/FT` occurrences
  in the raw bytes — a flat, print-and-fill specimen, not an interactive
  AcroForm PDF.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`), reading each page's `getTextContent()`
output directly, grouped by y-coordinate row (±2pt tolerance) and sorted by
x-coordinate to reconstruct column order. Both of the document's 2 pages
were additionally rendered to PNG via `pdfjs-dist` + `node-canvas` at 2.5x
scale — unlike the sibling `bw/drts/driving-licence-application` PDF, this
document's embedded fonts rasterized cleanly with no glyph-mapping failure,
so every checkbox grid and field layout below was visually cross-checked
against the rendered image, not inferred from the text layer alone.

## Document structure

A 2-page, single form: "APPLICATION FOR A VISA" (Form 1), under the
Immigration Act (Cap. 25:02, Regulation 7(1)). 14 numbered items (items 1-14,
no numbering gaps), an unnumbered "For Official Use Only"/File Number box
(office-completed, excluded), a "Photo 3cm x 4cm" placeholder, and a closing
declaration/signature block.

## Fields modelled

49 `fields[]` across 11 steps (Applicant identity; Visa details; Addresses;
Occupation; Travel details; Visa validity; References; Financial means;
Passport details; Communication; Declaration) plus 1 `documents[]` entry (the
form's own photo placeholder).

## Disclosed source-fidelity findings

1. **`sex` modelled as a required enum (`MALE`, `FEMALE`) despite the source
   printing a checkbox after "Female" only.** A targeted crop of the
   rendered PNG confirms "Sex: Male    Female☐" — a printed checkbox glyph
   immediately follows "Female" but no corresponding box follows "Male"
   anywhere on the row. This is a genuine printing asymmetry in the source,
   not an extraction artifact (confirmed via the rasterized image, not just
   the text layer); modelled as an ordinary two-value enum since the
   intended semantics (tick one of Male/Female) are unambiguous despite the
   missing box glyph. The registry's own `bw/drts/driving-licence-application`
   disclosed an analogous checkbox-grid asymmetry (Finding 1) in the same
   jurisdiction the prior cycle.
2. **`age` modelled as an optional integer, distinct from and not
   cross-validated against `dateOfBirth`.** Item 2 prints "Age:" with its own
   3-box entry field captioned `Y Y Y` immediately to the left of "Date of
   Birth:" (which carries its own 8-box `D D M M Y Y Y Y` entry, confirmed at
   the expected DDMMYYYY date-box convention used elsewhere on this form). The
   `Y Y Y` caption under the Age boxes does not follow that same
   day/month/year convention and most plausibly denotes a 1-3 digit
   age-in-years value, but the form gives no further explanation. Modelled as
   its own optional field per the source's own distinct box, without
   fabricating a cross-check against `dateOfBirth`.
3. **`visaTypeRequired` (item 4(a)) modelled as a single-select required enum
   with 10 options, and `numberOfEntries` (item 4(b)) as its own separate
   single-select required enum with 2 options.** The rendered image confirms
   each of the 10 visa-type options (Diplomatic, Official, Employment,
   Business, Investment, Tourist, Visitor, Study, Transit, Emergency) and
   both entries options (Single, Multiple) carries its own printed checkbox
   square. The two questions are printed side by side but are structurally
   independent selections, per this registry's own established
   single-selection-enum convention for tick-one-of-many rows (e.g.
   `bw/drts/driving-licence-application` Finding 1), since GSP-0009's
   field-type vocabulary has no multi-select/array primitive.
4. **Item 11 ("References in Country of Destination") modelled as two
   independent, unconditionally optional free-text fields
   (`reference1Details`, `reference2Details`).** The rendered image shows a
   single boxed area split into two side-by-side blank sub-boxes labelled
   only "(1)" and "(2)", captioned once at the section heading with "(with
   Names, Physical Address, Telephone No, Residence Permit No, ID No)" — no
   further column sub-division is printed inside either box, so each is
   modelled as one combined free-text field per the source's own layout,
   matching this registry's precedent for an ungated, unlabelled repeatable
   block (e.g. `pa/migracion/tourist-visa-application`'s
   `relative1NameRelationAddress`/`relative2NameRelationAddress`).
5. **Item 12 ("Please indicate what money or cash (amount) will be at your
   disposal") modelled as four independent, unconditionally optional amount
   fields (`amountUSD`, `amountEUR`, `amountZAR`, plus `otherCurrencyName`
   and `otherCurrencyAmount`), not a single-select currency enum.** The
   rendered image confirms each of "USD", "EUR", "ZAR", and "Other: …" is
   immediately followed by its own independent boxed amount-entry field, not
   a shared checkbox choice — an applicant may in principle declare funds in
   more than one currency. `otherCurrencyName` and `otherCurrencyAmount` are
   left independently optional rather than one gating the other, per this
   registry's own established avoidance of fabricating a `requiredWhen` tie
   between two co-located but not explicitly cross-referenced optional
   fields (see, e.g., `bw/drts/driving-licence-application` Finding 3's
   discussion of the `notEquals ""` anti-pattern for absent-field detection).
6. **Item 13's `passportValidUntil` and `returnVisaTo` fields modelled as
   unconditionally optional, disclosing an unexplained ambiguity.** Beneath
   the clearly-labelled "Date of Issue"/"Date of Expiry" pair, the source
   prints a further "Valid Until:" date box (own 8-box `D D M M Y Y Y Y`
   entry) and a separate "Return Visa to:" free-text line, with no
   accompanying explanatory text distinguishing either from the passport's
   own already-captured expiry date or from the visa's own already-captured
   requested validity period (item 10). Modelled as their own distinct
   fields per the source's own distinct boxes, without fabricating an
   interpretation the source does not state.
7. **`preferredCommunicationMethod` (item 14) modelled as a required
   single-select enum (`EMAIL`, `SMS`, `POST`), with `emailAddress`,
   `cellPhoneNumber`, `telephoneNumber`, and the four Present Postal Address
   sub-fields all modelled as unconditionally optional rather than gated via
   `requiredWhen` on the selected method.** The source visually groups the
   postal-address block under "Post" and situates "Cell phone Number"/
   "Telephone Number" on the same row as "SMS", but prints no explicit
   conditional cross-reference tying any contact field's requiredness to a
   specific checkbox selection — following the same disclose-rather-than-
   fabricate precedent as Finding 5 above.
8. **All Botswana-address and country-of-domicile-address sub-fields
   (Town/Village, Street/Ward, Plot/House No., Country) are modelled as
   required**, since items 5 and 6 print no optionality marker and, unlike
   the sibling `bw/drts/driving-licence-application`'s Postal Address (a
   genuinely secondary block there), both addresses here are core to a visa
   applicant's own identity and travel particulars.
9. **The "For Official Use Only"/"File Number" box is excluded** as an
   office-completed field, not applicant-supplied. **The "Photo 3cm x 4cm"
   placeholder is modelled as a `documents[]` entry** (`photograph`,
   category `identity-document`, required), following the same treatment
   this registry gives an explicitly printed photo-affixing box elsewhere
   (e.g. `mx/sre/passport-application`'s `photograph` document).

## Conformance

3 valid mock scenarios — `valid-single-entry-tourist` (an unmarried,
single-entry tourist applicant preferring e-mail contact, no financial or
reference fields beyond the required minimum); `valid-multiple-entry-business-two-currencies-and-references`
(a married business applicant requesting multiple entries, declaring funds
in both USD and ZAR, and supplying both destination-country references); and
`valid-transit-sms-contact` (a divorced transit applicant preferring SMS
contact, exercising `cellPhoneNumber`/`telephoneNumber`, the full Present
Postal Address block, `otherCurrencyName`/`otherCurrencyAmount`,
`passportValidUntil`, and `returnVisaTo`) — plus 15 mutation-control fixtures
(a missing-required-field fixture for each of `surname`, `firstName`,
`dateOfBirth`, `sex`, `maritalStatus`, `nationality`, `visaTypeRequired`,
`numberOfEntries`, `botswanaAddressTownVillage`, `occupation`,
`reasonForTravel`, `passportNumber`, and `preferredCommunicationMethod`; an
invalid-enum fixture for `visaTypeRequired`; and an unknown-field-rejected
fixture) are committed under `conformance/bw/dic/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/enum rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 18 fixtures: all 3 valid scenarios at 0 errors, and all 15
mutation controls each raising exactly 1 error of the expected kind.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run (598/598 documents,
including this one). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
