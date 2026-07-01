# Verification record — `de/bmi/residence-deregistration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded by a second reviewer. It therefore remains `draft`, not `verified`.

## Why this candidate was advanced now

`de/bmi/residence-deregistration` was already a tier-1 candidate in
`discovery/catalog.json`, explicitly flagged as the sibling to the published
`de/bmi/residence-registration` and noting that "deregistration is not required
for a purely domestic move ... only for leaving Germany altogether or keeping no
further German dwelling — that distinction needs confirming at authoring time."
This cycle confirmed that distinction directly from the official source (see
below) and authored the document.

## Sources examined

- **Document `(id, version)`:** `de/bmi/residence-deregistration` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Meldebehörde (local registration office), under the
  Bundesmeldegesetz (BMG)
- **Primary source URL:** <https://service.berlin.de/dienstleistung/120335/>
  ("Abmeldung einer Wohnung" — Berlin's official service page) — fetched
  directly with a plain `curl` request, HTTP 200, no access block. Its raw HTML
  was read directly (not summarized) to extract the deregistration-required
  conditions, the 7-day-before/14-day-after time window, the fee-free status,
  the legal basis (BMG), the in-writing-only submission channel note ("Bitte
  schriftlich erledigen. Die Abmeldung kann auch auf dem Postweg erfolgen."),
  the required-documents note (a copy of ID card or passport when mailing), and
  the 3-person-per-form limit.
- **Official form PDF:** linked directly from the service page —
  `https://www.berlin.de/formularverzeichnis/?formular=/labo/zentrale-einwohnerangelegenheiten/_assets/mdb-f402609-20151120_abmeldung.pdf`
  ("Abmeldung", form id `ABM_Blanko`) — fetched directly, HTTP 200, no access
  block. Parsed with the `pdf-parse` npm package (`PDFParse.getText()`); the
  single-page form extracted as clean, legible text and was transcribed
  field-by-field from that output.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

A deregistration is a one-time filing tied to a specific move-out event, not
filed "for" a recurring tax/award year — applying the GSP-0005 §2 coexistence
test, there is no scenario where two editions of the Abmeldung data model need to
coexist for the same applicant. This document is therefore authored at the plain
(non-edition) registry path, `registry/de/bmi/residence-deregistration/1.0.0/`.
A future form revision that changes the field set ships as a new `version`, not
an edition.

## Scope decisions

- **Modeled:** the previous-dwelling section, the future-dwelling section
  (including the case where the future dwelling is a foreign address, or where
  no future German dwelling exists at all), the additional-German-dwellings
  section, the primary registrant's personal details, and the
  submission/signature section.
- **Out of scope — family members 2 and 3 on the same Meldeschein.** The form's
  own footer note ("Bei mehr als 3 abzumeldenden Personen benutzen Sie bitte
  weitere Meldescheine") confirms the form supports up to 3 people per sheet
  (with a relationship-to-registrant field on persons 2/3); this document
  models only the primary registrant, consistent with the scoping decision
  already made in the sibling `de/bmi/residence-registration` document.
  Tracked under GSP-0009 (composite/repeating values), not yet accepted.
- **Out of scope — the "Tagesstempel der Meldebehörde" / "Amtl. Vermerke"
  boxes** at the top of the form, and the Gemeindekennzahl (municipality key
  number) fields — office-use/administrative fields, not applicant-entered
  data.

## Fix-up: independent review finding (GOV-334)

An independent reviewer (Review Engineer) re-derived the field set directly
from the primary sources — not from this document's own transcription — by
fetching the Berlin service page and the Abmeldung PDF and parsing the PDF's
text layer and AcroForm field/annotation objects with `pdfjs-dist`. That
review confirmed the CI validation, the domestic-move exception, the
no-online-channel claim, the timing window, the fee-free status, the
`identityDocumentCopy` rule, the 3-person cap, and the `gender`-enum
disclosure above, but found one blocking gap:

- **`Passname` is a separate, independently-fillable field on the source
  PDF**, distinct from `Familienname, ggf. Doktorgrad`, with its own label and
  its own rect in the AcroForm layer — meaning a registrant whose passport
  name differs from their civil family name had no field to record it in.
  Fixed by adding a new optional `passportName` field and narrowing
  `lastName`'s label/sourceRef to the family-name field alone.

- **Non-blocking parity note (also addressed here):** the PDF's "Weitere
  Wohnungen (in Deutschland)" section repeats 3 times on the form (like the
  person 1/2/3 repetition already disclosed above), but this document models
  only one instance of it, consistent with the primary-registrant-only scope
  decision. This scope choice was previously undocumented for that
  specifically; it is now recorded here for parity with the 3-person-per-form
  disclosure.

## What was confirmed against the source

- **Process identity and requirement conditions.** Deregistration is required
  only when moving abroad for good (not a temporary stay abroad, e.g. for
  study) or when giving up a main/secondary residence without moving into
  another German dwelling; a purely domestic move requires only a new
  Anmeldung. Confirmed verbatim (in translation) from the service page's own
  prose, and recorded in the document `description`.
- **Timing, fee, and legal basis.** The 7-day-before/14-day-after filing
  window, the fee-free status, and the Bundesmeldegesetz legal basis are
  confirmed directly from the service page and recorded in the document
  `description` and `moveOutDate`'s description.
- **Submission channel.** The service page states deregistration must be done
  "schriftlich" (in writing) — either in person at a Bürgeramt or by post — and
  explicitly does **not** offer an online (Elektronische Wohnsitzanmeldung)
  channel, unlike the sibling registration document. Modeled as the
  `submissionChannel` enum, with the by-mail path additionally requiring
  `identityDocumentCopy` per the service page's required-documents note.
- **Full form field set.** The previous-dwelling address and dwelling-type
  fields, the future-dwelling address/country/dwelling-type/
  already-existed fields, the additional-dwellings-in-Germany fields, the
  registrant's personal-details fields (name, birth name, gender, date/place/
  country of birth, religious affiliation, nationality, religious/artistic
  name), and the signature field are all transcribed field-by-field from the
  decoded PDF text.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out deregistration was authored and checked field-by-field
against every `type`/`required`/`validation` constraint in `schema.json` (string
length, regex pattern, enum membership, date format, boolean type, and the
conditional-field notes called out in field descriptions):

```json
{
  "moveOutDate": "2026-08-15",
  "previousAddressPostalCode": "10115",
  "previousAddressMunicipality": "Berlin",
  "previousAddressStreet": "Torstraße",
  "previousAddressHouseNumber": "12",
  "previousDwellingType": "sole_dwelling",
  "hasFutureGermanDwelling": true,
  "futureAddressCountry": "United States",
  "futureAddressPostalCode": "92101",
  "futureAddressMunicipalityOrDistrict": "San Diego, California",
  "futureAddressStreet": "Harbor View Drive",
  "futureAddressHouseNumber": "482",
  "futureDwellingAlreadyExisted": false,
  "futureDwellingType": "sole_dwelling",
  "lastName": "Torres",
  "firstNames": "Maria Alejandra",
  "gender": "female",
  "dateOfBirth": "1990-03-14",
  "placeOfBirth": "San Diego",
  "countryOfBirth": "United States",
  "nationality": "American",
  "submissionChannel": "by_mail",
  "signatureDate": "2026-08-10"
}
```

This models Maria Alejandra Torres — the same individual used in the sibling
`us/ca/sos/business-entity-llc-formation`, `us/ca/sos/corporation-formation-arts-gs`,
`us/irs/employer-identification-number-ss4`, `us/ca/dmv/vehicle-title-transfer`,
`us/dos/lost-or-stolen-passport-ds64`, and `ca/ircc/eta-application` mock scenarios
— deregistering her sole Berlin dwelling before permanently relocating back to
San Diego, California, submitting by mail (hence `identityDocumentCopy` applies).
The scenario exercises the `hasFutureGermanDwelling: true` → `futureAddress*`
conditional group with a foreign (non-German) future address, and the
`submissionChannel: by_mail` → `identityDocumentCopy` pair, while omitting the
optional additional-German-dwelling fields, `birthName`, and
`religiousAffiliation`/`religiousOrArtisticName`. A one-off Node script
(`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type` and `validation` constraint
and that no required field was left unset:

```
PASS — mock emigration deregistration (sole dwelling, moving abroad) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/de/bmi/residence-deregistration/1.0.0/schema.json
ok   registry/de/bmi/residence-deregistration/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/de/bmi/residence-deregistration/1.0.0/schema.json
ok   registry/de/bmi/residence-deregistration/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **`gender`'s option list was not independently re-confirmed against this
  specific PDF.** Unlike the sibling `de/bmi/residence-registration` document,
  which confirmed the M/W/D/o.A. codes from a Munich Meldeschein PDF's own
  field-tooltip metadata, this Berlin Abmeldung PDF did not expose equivalent
  tooltip text in the extraction. The same four values are reused here by
  analogy (the M/W/D/o.A. convention is standard across German Meldebehörde
  forms nationally under Personenstandsgesetz §22 Abs. 3), but this is a
  reasonable inference, not an independent re-confirmation against this
  specific document. A reviewer should confirm directly if possible.
- **Whether every German municipality's Abmeldung form matches this exact
  field layout.** Registration/deregistration forms are issued per-Land or
  per-municipality in Germany (confirmed already for the sibling registration
  document); this document is sourced from Berlin's form specifically, per the
  established precedent of using Berlin as the reference municipality.
- **The Gemeindekennzahl (municipality key number) fields** appear on the raw
  PDF text but were not modeled — treated as administrative/office-use data
  rather than applicant input, an inference not independently confirmed against
  official guidance describing who completes that field.
- **Constraint patterns** (postal code format) are reasonable encodings, not
  citations of a published Meldebehörde validation rule.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Abmeldung form and service page, resolves the
`gender`-option and Gemeindekennzahl open questions above, confirms the sources
are still authoritative, resolves any discrepancy by shipping a new schema
**version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
Berlin publishes a new Abmeldung form revision.
