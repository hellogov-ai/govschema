# Verification record — `us/fl/miami-dade/tc/local-business-tax-receipt` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was **derived directly from** the live official sources below (via
Internet Archive Wayback Machine snapshots — see "Access note" below), but the
full field-by-field comparison the practice requires against an actual
screen-by-screen run of the BTExpress online first-time application interview
has **not** yet been independently performed. It therefore remains `draft`, not
`verified`.

## Access note: direct fetch blocked, Wayback Machine used

Both `WebFetch` and a direct `curl` (with a browser `User-Agent`) against
`mdctaxcollector.gov` returned **HTTP 403 Forbidden** from this authoring
environment for every URL tried (the service page, the requirements page, and
the application PDF). This is the same class of gov-site access gap logged
before for `passports.gov.au`/`dfat.gov.au` (see the repo's Wayback-workaround
convention). All sources below were instead retrieved as direct, unsummarized
content from **Internet Archive Wayback Machine** snapshots (`web.archive.org`,
fetched via `curl` with the `id_` no-toolbar modifier so the raw page/PDF bytes
are returned, not a wrapped viewer), each within the timestamp cited per source.
This is a read of the actual page/PDF content at that snapshot date, not an
AI-summarized version of it.

## Sources examined

- **Document `(id, version)`:** `us/fl/miami-dade/tc/local-business-tax-receipt` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Miami-Dade County Office of the Tax Collector, Local Business Tax Section
- **Local Business Tax Receipt service page:**
  <https://mdctaxcollector.gov/services/local-business-tax-receipt>, Wayback
  snapshot `20260103190712` (2026-01-03) — application methods (BTExpress
  online for first-time applicants, or the printed application by mail/in
  person), the one-place-of-business/one-classification-per-receipt rule, the
  Oct 1 – Sept 30 receipt year, the municipality-also-needs-a-city-receipt
  rule, the prominent-display requirement, and the transferability rule, all
  transcribed from the page's own prose.
- **Requirements page:** <https://mdctaxcollector.gov/requirements>, Wayback
  snapshot `20260417145123` (2026-04-17) — the "have this information ready"
  checklist (real estate/tangible account numbers, fictitious-name/corporate
  proof, NAICS code, FEIN/Tax ID/SSN), the unincorporated-area Certificate of
  Use and Occupancy requirement, and the home-based-business pointer.
- **Local Business Tax Categories page:**
  <https://mdctaxcollector.gov/services/local-business-tax-categories>, Wayback
  snapshot `20260508081934` (2026-05-08) — confirms the tax is assessed by
  business type, incorporated/unincorporated location, and
  employees/seats/units/square-footage-type characteristics, with per-category
  detail split across six alphabetical-range sub-pages (A-B through S-Z) rather
  than one flat fee table — this is why `localBusinessTaxFeePayment`
  (`documents[]`) carries no `amount` member (§9.1 permits an `amount`-less
  `payment` entry; see the `de/gewerbeamt/business-registration` precedent for
  a fee set by a source other than the form itself).
- **Exemptions page:** <https://mdctaxcollector.gov/business-exemptions>,
  Wayback snapshot `20260417161100` (2026-04-17) — confirms the
  nonprofit/disability-or-senior/veteran-or-military-spouse/public-assistance
  fee exemptions are separate application pathways, out of scope for this base
  application schema.
- **Application PDF:** *Local Business Tax receipt application*,
  <https://mdctaxcollector.gov/storage/forms/lbt/local-business-tax-receipt-application.pdf>,
  Wayback snapshot `20250519083714` (2025-05-19) — downloaded directly (`curl`,
  HTTP 200 from the Wayback replay). Parsed with the repo's usual
  zlib-inflate-stream + parenthesized-`Tj`/`TJ` extraction convention
  (`node:zlib` `inflateSync` over each `stream`/`endstream` block, then regex
  over `(...)Tj` and `[...]TJ` operators). Recovered text is legible and
  supplied the verbatim §1a–§4 field layout, the numbered instruction notes,
  and the Social Security Number confidentiality/public-records statement
  (citing Fla. Stat. 205.0535).
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (Standards Engineer) — initial authoring
  source-review

## Not a time-versioned (edition) form

A first-time Local Business Tax Receipt application is a one-time filing made
once per place of business/classification (the annual Oct 1 – Sept 30 period
is a *renewal-time* concept, applying to an already-issued receipt, not to this
first-time application) — applying the GSP-0005 §2 coexistence test, there is
no scenario where two editions of this data model need to coexist for the same
applicant. This document is therefore authored at the plain (non-edition)
registry path, `registry/us/fl/miami-dade/tc/local-business-tax-receipt/1.0.0/`.

## First use of the GSP-0021 locality layer

This is the first document authored against [GSP-0021](../../../../../../../spec/proposals/0021-municipal-county-jurisdictions.md)
(`jurisdiction.locality`, accepted 2026-07-06, GOV-667), and the first to use
the `us/fl/miami-dade/<authority>/<process>` `id` path layer. `jurisdiction`
carries `locality: { "name": "Miami-Dade County", "slug": "miami-dade" }` and
`level: "municipal"`, and the `id`'s locality segment (`miami-dade`) equals
`locality.slug`, per §5.4/§13 rule 2. The authority slug `tc` (Tax Collector)
was set by GOV-687's issue description ("Author
`us/fl/miami-dade/tc/local-business-tax-receipt` (Tax Collector)"); this is the
convention to reuse for any other Miami-Dade Tax Collector schema (e.g. a
future homestead-exemption or marriage-license schema uses a different
authority slug for its own office, per GOV-664 plan §4/§6).

## What was confirmed against the source

- **Application channels and receipt mechanics.** BTExpress online system for
  first-time applicants, or the printed application by mail/in person to 200
  NW 2nd Ave, Miami, FL 33128; one receipt per place of business and per
  separate local business tax classification at the same location; Oct 1 –
  Sept 30 receipt year; municipality-located businesses also need a city
  receipt; unincorporated-area businesses also need a Certificate of Use and
  Occupancy from Planning & Zoning — all transcribed from the service page and
  Requirements page.
- **Business information (§1a-g / `businessName` through `emailAddress`).**
  The business name/fictitious name/DBA field, the fictitious-name and
  corporate-registration proof notes (1a, 1c), the business and mailing/owner
  address blocks with phone numbers, the location-description checkboxes
  (Office/Store/Warehouse/Home Office), the FEIN-or-SSN identification block
  and its Fla. Stat. 205.0535 citation and confidentiality note (1e), the
  business start date, and the e-mail address — all transcribed from the
  application PDF's §1 block.
- **Nature of business and survey (§2-3 /
  `natureOfBusinessDescription` through `naicsCode`).** The nature-of-business
  description, the four classification-basis counts (employees,
  machines/equipment, seats, rooms/apartments), the NAICS-code request citing
  census.gov/naics, and the State/County-regulated-business active-license
  note — transcribed from the application PDF's §2-3 block.
- **Identification (§4 / `applicantName` through `driverLicenseState`).** The
  applicant name/title/signature fields and the driver's license number and
  state fields — transcribed from the application PDF's §4 block.
- **Requirements-page-only fields.** `realEstateAccountNumber` and
  `tangiblePersonalPropertyAccountNumber` appear only in the Requirements
  page's "have this ready" checklist, not on the application PDF itself; both
  are modeled as optional since the Requirements page states them as
  "if applicable."
- **Fee.** Confirmed the fee is classification/count/location-dependent (via
  the Local Business Tax Categories page and the Tax Collector's own Fee
  Calculator tool, not a single published table), so
  `localBusinessTaxFeePayment` is authored without an `amount` member,
  following the `de/gewerbeamt/business-registration` precedent for a
  source-set, non-form-published fee.

## Mock-data test run

Two representative filings were authored and checked field-by-field against
every `type`/`required`/`requiredWhen`/`validation` constraint in `schema.json`
with a small one-off Node script (`node:fs`/inline `require`, no committed
dependency):

```json
{
  "businessName": "Sawgrass Creative Studio LLC",
  "usesFictitiousOrDbaName": false,
  "businessAddressLine1": "1401 NW 17th Ave",
  "businessAddressCity": "Miami",
  "businessAddressState": "FL",
  "businessAddressZipCode": "33125",
  "businessPhone": "(305) 555-0142",
  "locationDescription": "office",
  "ownerOrCorporationName": "Sawgrass Creative Studio LLC",
  "isCorporationOrLLC": true,
  "mailingAddressLine1": "1401 NW 17th Ave",
  "mailingAddressCity": "Miami",
  "mailingAddressState": "FL",
  "mailingAddressZipCode": "33125",
  "mailingPhone": "(305) 555-0142",
  "identificationNumberType": "federal_employer_id",
  "federalEmployerId": "59-1234567",
  "businessStartDate": "2026-08-01",
  "emailAddress": "denise@sawgrasscreative.example",
  "natureOfBusinessDescription": "Graphic design and branding studio",
  "maxEmployees": 4,
  "naicsCode": "541430",
  "isStateOrCountyRegulated": false,
  "applicantName": "Denise M. Alvarez",
  "applicantTitle": "Managing Member",
  "applicantSignatureName": "Denise M. Alvarez",
  "driverLicenseNumber": "A123456789012",
  "driverLicenseState": "FL"
}
```

This models an LLC using its own EIN, a non-fictitious business name, an
office location, and no state/county regulatory license. A second scenario
was run over the same base data with `ownerOrCorporationName` changed to an
individual, `isCorporationOrLLC: false`, `usesFictitiousOrDbaName: true`,
`identificationNumberType: "social_security_number"` (with `socialSecurityNumber`
supplied and `federalEmployerId` omitted), and `locationDescription:
"home_office"`. Both scenarios exercise every `requiredWhen` branch
(`federalEmployerId`/`socialSecurityNumber` on `identificationNumberType`):

```
PASS — mock LLC filing (EIN, office, no fictitious name) satisfies all field-level constraints.
PASS — mock individual filing (SSN, home office, fictitious/DBA name) satisfies all field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/fl/miami-dade/tc/local-business-tax-receipt/1.0.0/schema.json
ok   registry/us/fl/miami-dade/tc/local-business-tax-receipt/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/fl/miami-dade/tc/local-business-tax-receipt/1.0.0/schema.json
ok   registry/us/fl/miami-dade/tc/local-business-tax-receipt/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **The live BTExpress online first-time application's actual screen-by-screen
  flow** (question order, exact on-screen wording, dynamic branching) was not
  directly observed; this document is sourced from the service/requirements
  prose and the paper PDF form, which the source states cover the same
  underlying data for both channels.
- **`mdctaxcollector.gov` could not be reached directly** from this authoring
  environment (HTTP 403 on every direct/`WebFetch` attempt); all content was
  read from Wayback Machine snapshots instead. A future re-verification pass
  should retry direct access, since a 403 from an automated tool does not
  necessarily mean the live page has changed.
- **Constraint patterns** (phone/ZIP/EIN/SSN formats, string length maximums)
  are reasonable encodings consistent with the sourced field descriptions, not
  citations of a published Tax Collector field-length validation rule.
- **The exact local business tax fee** is not modeled as a fixed `amount`
  (§9.1 permits this); it depends on the business's classification and
  count-basis and is only available in full via the Tax Collector's Fee
  Calculator or the six alphabetical Local Business Tax Categories sub-pages,
  which were not individually enumerated here.
- **Downstream/related processes** — the annual renewal, the separate
  Certificate of Use and Occupancy application, any city-level business tax
  receipt, the fee-exemption applications (nonprofit, disability/senior,
  veteran/military-spouse/public-assistance), and the home-based business tax
  receipt's additional home-occupation rules — are all out of scope; this
  document covers the first-time County application only.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) against an **observed run of the live BTExpress online
first-time application** (not just the service/requirements prose and the
paper form) and the then-current paper form, confirms the sources are still
authoritative (retrying direct `mdctaxcollector.gov` access rather than only
Wayback snapshots), resolves any newly discovered discrepancy by shipping a
new schema **version** (immutability — VERSIONING §3, practice Procedure step
5), and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when the Tax Collector publishes a new revision of the Local
Business Tax receipt application form.
