# Verification record — mu/nlta/vehicle-registration-mark-application@1.0.0

## Candidate selection

GOV-4610 ("GovSchema Standard Research"). Mauritius opened as the
registry's 92nd jurisdiction via `mu/pio/passport-application` (GOV-4603),
which banked three further STRONG verticals as open backlog: DMV (vehicle
registration), Business Formation, and Visa. This schema authors the DMV
candidate that same cycle had already independently byte-verified: the
National Land Transport Authority's "Application for Registration Mark",
`nlta.govmu.org/Documents/Downloads/Procedures%20Forms/Application%20Form%20Reg%20Mark.pdf`.
Per the GOV-4603 record, the driving-licence half of Mauritius's DMV
vertical (Police Form PF31) is in-person-only with no downloadable PDF
found on `police.govmu.org`, and the online learner-licence channel
carries a standing `govmu.org` notice that it remains "temporarily out of
service due to Covid 19 Pandemic" — both confirmed dead ends this cycle by
re-checking the same two sources fresh (no change). This candidate is
therefore scoped to vehicle registration-mark allocation only, not
driver's-licence issuance.

## Reaching the live source

`https://nlta.govmu.org/Documents/Downloads/Procedures%20Forms/Application%20Form%20Reg%20Mark.pdf`

- Plain unauthenticated `curl` request (with `-L` to follow redirects), no
  session/cookie state, no CAPTCHA/WAF challenge.
- HTTP 200, **598,726 bytes** retrieved.
- sha256 of the retrieved bytes:
  `dc757ea9fbb495b9a00117cb04d37a63a90729f51ed6e63bffbdea99d462df89`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations and `getTextContent()` returned
  0 text items — a flat, scanned/rasterized image embedded in the PDF, not
  an interactive AcroForm and not a text-layer specimen.

### Authority attribution

The document's own header reads "NATIONAL LAND TRANSPORT AUTHORITY, MSI
BUILDING, ROYAL ROAD, LES CASSIS, PORT LOUIS", and is hosted directly on
the Authority's own domain (`nlta.govmu.org`). `authority` is attributed to
the National Land Transport Authority (abbreviation NLTA) directly.

## Extraction method

Since neither the text-content nor annotation layers yielded anything (a
pure scanned-image PDF), the single page was rendered to a 1488x2104 PNG at
2.5x scale via `pdfjs-dist` + the vendored `node-canvas` build (per this
registry's own `gov-form-pdf-extraction` precedent for image-only
specimens) and read visually. The scan is clean and high-contrast — every
label, box grid, and checkbox is legibly rendered with no glyph-rendering
failures of the kind this registry has seen on other rasterized specimens.

## Document structure

A single page, five numbered items plus an "OFFICIAL USE" box and a
closing "NOTE TO APPLICANTS":

- **Item 1** — "Full name and address of applicant (Applicable for
  individual applicants)": (a) Title, (b) Surname (Block letters), (c)
  Other names (Block letters), (d) Permanent address (Block letters, three
  ruled lines), (e) National Identity Card Number.
- **Item 2** — "Full name and address of applicant (Applicable for
  registered companies, etc.)": (a) Name (Block letters), (b) Address
  (Block letters, three ruled lines), (c) Registered Corporate Number.
- **Item 3** — "Name of dealer from which the vehicle is to be purchased
  (Block letters)".
- **Item 4** — "Who will be effecting the registration of the vehicle?
  (Please tick as appropriate)": Dealer / Purchaser / Other (please
  specify), three checkbox-style options printed inline.
- **Item 5** — "Declaration": "I apply for registration mark ______"; "I
  undertake to purchase / reserve * the registration mark upon approval of
  the request. (* Delete as appropriate)"; "I, ......, declare that, to the
  best of my knowledge and belief, the particulars given above are true and
  correct."; "Signature of applicant: .......... Status: ..........
  (Applicable for registered companies only)"; "Date: [Date][Month][Year]".
- **OFFICIAL USE** (excluded in its entirety, officer-only): Received on,
  Receipt No, Name of Officer, Signature of Officer, Approved by Deputy
  Road Transport Commissioner, Date Approved.
- **NOTE TO APPLICANTS** (informational, not a field): instructs applicants
  to ensure particulars in Item 1 or 2 are accurate, and states the NLTA
  reserves the right not to allocate a Registration Mark without prejudice
  to the applicant.

## Scope: fields and sections excluded

- The "OFFICIAL USE" box in its entirety — Received on, Receipt No, Name
  and Signature of Officer, Deputy Road Transport Commissioner approval and
  date — all filled by NLTA staff, not the applicant, the same
  "officer-only, not applicant-supplied data" convention this registry
  applies elsewhere (e.g. `mu/pio/passport-application`'s own excluded
  "OFFICIAL USE" boxes).
- The "NOTE TO APPLICANTS" closing text — informational only, no blank or
  box to complete.

## Scope: judgment calls on requiredness

This source carries no asterisk/mandatory-marking convention at all (its
one asterisk, on Item 5's "purchase / reserve *", is a delete-as-
appropriate instruction, not a required-field marker), so requiredness was
assigned by engineering judgment:

1. **`applicantType` discriminator, not itself a printed field.** The form
   provides two mutually exclusive sections captioned "Applicable for
   individual applicants" and "Applicable for registered companies, etc.".
   Modelled the same way as `tt/rgd/partnership-beneficial-ownership-statement`'s
   `declarantCategory` — an explicit selector gating which section's
   fields are `requiredWhen` that value, rather than making both sections'
   fields unconditionally optional.
2. **`individualTitle` modelled as free text, not an enum.** Unlike
   `mu/pio/passport-application`'s `title` field, this specimen prints no
   enumerated options (Mr/Mrs/Miss) next to the boxed letters — just a run
   of blank boxes captioned "Title" — so this schema does not invent
   options the source does not itself show.
3. **`individualPermanentAddress`/`companyAddress` modelled as a single
   free-text field, not split into line1/line2/line3.** The three ruled
   lines beneath each caption carry no distinct sub-labels (e.g.
   street/town/district) on this specimen, unlike some other registry
   address fields that do print such sub-captions — modelled here matching
   this form's own undifferentiated layout.
4. **`dealerName` modelled optional.** Item 3 is not gated on Item 4's
   answer anywhere on the form, and Item 4 itself offers "Purchaser" and
   "Other" as alternatives to "Dealer", implying a dealer is not always
   party to the transaction (e.g. a private resale or personal import of
   an already-registered vehicle needing a new mark) — so this field is
   not marked unconditionally required.
5. **`registeringParty`/`registrationMarkApplied`/`undertakingType`/
   `declarantFullName`/`signatureOfApplicant`/`declarationDate` modelled
   required**, as the form's own core operative content (which the
   declaration explicitly swears to and which the Authority needs to
   process any registration-mark request), consistent with this registry's
   standard approach of treating a document's own declaration/signature
   block as required absent contrary evidence.
6. **`signatoryStatus` gated required on `applicantType` = `company`**,
   matching the field's own printed qualifier, "(Applicable for registered
   companies only)".

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]` conditions (not committed as fixture files, following this
registry's own precedent for single flat-image DMV/short-form specimens,
e.g. `tt/rgd/partnership-beneficial-ownership-statement`): (1) an
individual applicant buying a used car directly from another private
individual with no dealer involved, self-registering — `applicantType` =
`individual` requires `individualTitle`/`individualSurname`/
`individualOtherNames`/`individualPermanentAddress`/
`individualNationalIdentityCardNumber`; `companyName`/`companyAddress`/
`companyRegisteredCorporateNumber` and `signatoryStatus` correctly not
required; `dealerName` left blank (optional); `registeringParty` =
`purchaser`, so `registeringPartyOtherSpecify` not required; (2) a
registered company purchasing a new vehicle from a named dealer, with the
dealer effecting registration — `applicantType` = `company` requires
`companyName`/`companyAddress`/`companyRegisteredCorporateNumber` and
`signatoryStatus`; the individual-track fields correctly not required;
`dealerName` populated; `registeringParty` = `dealer`. Every
`requiredWhen` condition in this schema (`applicantType` twice,
`registeringParty`) was exercised at least once true and once false across
the two scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3/govschema.schema.json`).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 17 `fields[]` across 4 steps. No `documents[]` entries — this
specimen discloses no supporting-document checklist anywhere on its single
page, unlike this registry's other Mauritius schema
(`mu/pio/passport-application`), which does print one.
