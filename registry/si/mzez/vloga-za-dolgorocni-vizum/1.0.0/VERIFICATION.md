# Verification record — `si/mzez/vloga-za-dolgorocni-vizum` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3249**). Slovenia already
exists in the registry (opened as the 53rd jurisdiction via Business Formation,
GOV-2910, and expanded through Passport/GOV-2927, National ID/GOV-2928, and
Taxes/GOV-2929); this document opens Slovenia's **Visa vertical (2 of 6)**.

## Why this candidate

The Ministrstvo za zunanje in evropske zadeve (MZEZ, Ministry of Foreign and
European Affairs) publishes a genuine, fillable **long-term (D-category) visa
application** for nationals of third countries seeking stays of longer than 90
days under Article 20 of the Aliens Act (ZTuj-2). This is distinct from the
short-term (C-category) **Schengen visa** template, which Slovenia adopts under
EU Schengen Annex I. The long-term visa is the only national-level visa form
available for this purpose and is a required entry point for extended residence
in Slovenia (e.g., family reunification, employment, education, humanitarian
grounds).

## Anti-duplication verification

**Distinct from EU Schengen Annex I short-stay template:**

The EU-harmonized Schengen visa (short-stay, C-category) form template is
defined in Annex I of the Schengen Visa Code (Regulation (EU) 2015/1998). All
EU member states, including Slovenia, adopt this identical template for 
short-term (up to 90 days) visa applications. This registry publishes that form
as `fr/france-visas/schengen-visa-application` (the French consular version of
the EU-wide template, used as the structural reference).

**This form (long-term D-visa) is distinct because:**

1. **Purpose-of-visa checkboxes:** The long-term form includes 10 Slovenia-specific
   checkboxes for purposes unique to long-term residence (Article 20 categories):
   - a. Family reunification (а. združitev družine)
   - b. Work at diplomatic representation (б. nastop službe na DKP)
   - c. Education/training (в. izobraževanje, izpopolnjevanje)
   - d. Economic interest (г. gospodarski interes RS)
   - e. High education/science (е. interes RS na področju visokog šolstva in znanosti)
   - f. Sports contract (ѓ. šport-pogodba s pravno osebo v RS)
   - g. Journalist accreditation (з. akreditacija poročevalca oz. novinarja)
   - h. Religious/charity work (и. opravljanje duhovniškog ali karitativnog dela)
   - i. Humanitarian reasons (ј. humanitarni i resni poklicni ili osebni razlogi)
   - j. Student employment under international agreement (к. študentsko delo – na podlagi mednarodnega sporazuma)

   The Schengen Annex I short-stay form uses generic C-visa purposes (tourism,
   business, medical treatment) that do not align with these national long-term
   categories.

2. **Required fields:** The long-term form requires:
   - Intended arrival and departure dates
   - Current occupation and employer information
   - Family member name (if family reunification is selected)
   - Company/organisation contact details for relevant purposes
   - A description of the reasons for the visa request

   The Schengen short-stay form does not require these fields in the same way.

3. **Scope and duration:** The long-term D-visa is issued for stays of longer
   than 90 days (typically up to one year), whereas the short-term C-visa is
   for up to 90 days within 180 days. The form instructions and validity periods
   reflect this distinction.

4. **Bilingual content:** This form is published in both Slovenian and English
   on gov.si's consular-affairs (konzularne zadeve) page as a standalone form
   for third-country nationals applying for long-term residence.

**Conclusion:** This form is a **wholly distinct document** from the EU Schengen
Annex I short-stay template and represents Slovenia's unique long-term visa
pathway. No registry duplication risk exists.

## Source re-verification (Phase 1)

- **Authority:** MZEZ (Ministrstvo za zunanje in evropske zadeve), a national
  ministry (consular affairs division).
- **URL:** `https://www.gov.si/assets/ministrstva/MZEZ/Dokumenti/konzularne-zadeve/oddelek-za-vize/vloga_za_dolgorocni_vizum_SI-EN.pdf`
- **Retrieved / reviewed:** 2026-07-16, independently re-fetched this cycle with
  `curl -sL`, not trusted from the issue's own citation as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `185,843` bytes. **sha256:**
  `d8ac15a7429f77fd7a564435c1dff7daff36dcd28c54887975505a5cd1387d93`
  — re-derived from scratch during this PR's own re-verification pass (the
  hash string in the crashed run's original draft was a malformed 62-character
  placeholder, not real `sha256sum` output; every other claim in this section
  — HTTP status, content-type, byte size, page count, bilingual content — was
  independently re-confirmed against a fresh download and is accurate).
- **File type:** a genuine PDF with embedded text content (`%PDF` header).
- **Extraction method:** `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`), run from
  scratch this cycle in a clean scratch directory against the freshly
  re-fetched PDF: text extraction via `page.getTextContent()` for each of the
  3 pages. Confirmed **3 pages** and a structured bilingual (Slovenian/English)
  form with **21 numbered form fields** (plus office-only decision section
  excluded per registry convention).

## Field inventory (Phase 2)

All 35 `fields[]` entries in the schema (covering applicant identification,
travel document, residence, employment, intended stay dates, visa purpose, and
signature) are accounted for and sourced from the form text:

| Form field (numbered) | Modelled as | Notes |
|---|---|---|
| 1. Priimek / Surname | `surname` | Required |
| 2. Priimek ob rojstvu / Surname at birth | `surnameAtBirth` | Optional |
| 3. Ime / First name(s) | `givenName` | Required |
| 4. Datum rojstva / Date of birth | `dateOfBirth` | Required |
| 5. Kraj rojstva / Place of birth | `placeOfBirth` | Required |
| 6. Država rojstva / Country of birth | `countryOfBirth` | Required |
| 7. Sedanje državljanstvo / Current nationality | `currentNationality` | Required |
| 7. Državljanstvo ob rojstvu / Nationality at birth | `nationalityAtBirth` | Optional |
| 8. Spol / Sex | `sex` | Required enum: moški/ženski |
| 9. Zakonski stan / Marital status | `maritalStatus` | Required enum: samski/poročen/živi ločeno/razvezan/vdovec/vdova |
| 10. Guardian data (minors) | `guardianInformation` | Optional opaque object (surname/givenName/address/nationality carried in `description`, not as a nested schema — GovSchema v0.3's `field` definition has no `properties` keyword) |
| 11. Vrsta potne listine / Travel document type | `travelDocumentType` | Required |
| 11. Številka potne listine / Number | `travelDocumentNumber` | Required |
| 11. Organ, ki jo je izdal / Issued by | `travelDocumentIssuingAuthority` | Required |
| 11. Datum izdaje / Date of issue | `travelDocumentDateOfIssue` | Required date |
| 11. Veljavna do / Valid until | `travelDocumentValidUntil` | Required date |
| 12. Bivališče v drugem kraju / Other residence | `residenceInOtherCountry` | Required boolean |
| 12. Dovoljenje za prebivanje / Residence permit | `residencePermitNumber` | Optional (conditional) |
| 12. Velja do / Valid until | `residencePermitValidUntil` | Optional date (conditional) |
| 13. Domači naslov / Home address | `homeAddress` | Required |
| 13. E-pošta / Email | `emailAddress` | Required |
| 13. Telefonska(-e) številka(-e) / Telephone | `telephoneNumbers` | Required |
| 14. Sedanji poklic / Current occupation | `currentOccupation` | Optional |
| 15. Delodajalec / Employer | `employerNameAndAddress` | Optional |
| 15. Telefonska številka / Employer phone | `employerPhoneNumber` | Optional |
| 17. Predvideni datum prihoda / Arrival date | `intentedDateOfArrival` | Required date |
| 17. Predvideni datum odhoda / Departure date | `intentedDateOfDeparture` | Required date |
| 16. Razlog za vizum / Visa purpose | `purposeOfVisa` | Required `enum` (single-select among the form's 10 lettered purpose checkboxes a-j) |
| 16. Opis razlogov / Purpose description | `purposeDescription` | Optional |
| 18. Družinski član / Family member | `familyMemberName` | Optional (for family reunification) |
| 19. Naziv podjetja/organizacije / Company | `companyOrganisationName` | Optional |
| 19. Telefon in faks / Company phone/fax | `companyPhoneAndFax` | Optional |
| 19. Kontaktna oseba / Contact person | `contactPersonDetails` | Optional opaque object (surname/givenName/address/phone/fax/email carried in `description`) |
| 20. Kraj in datum / Place and date | `placeAndDateOfApplication` | Required |
| 21. Podpis / Signature | `applicantSignature` | Required |

## Judgment calls

1. **Purpose-of-visa modelling as a required single-select `enum`, not an object
   with 10 boolean properties.** The form displays 10 checkboxes (labeled a–j)
   for purposes under Article 20 of the Aliens Act, and its own instructions
   ("Exactly one of the 10 purpose categories must be selected") describe a
   single-select choice, not 10 independent flags. An earlier draft of this
   schema (produced by a run that crashed before completing validation) had
   modelled `purposeOfVisa` as `type: "object"` with 10 boolean `properties` —
   this fails GovSchema v0.3's meta-schema, since the `field` definition has no
   `properties` keyword at all (object-type fields are carried opaquely; see
   `ca/on/registration/business-incorporation`'s `incorporatorAddress` for the
   established precedent). Caught during independent re-validation
   (`node tools/validate-ajv.mjs`) before this PR was opened, and re-modelled as
   `type: "enum"` with the 10 lettered categories as `validation.enum` values —
   a more accurate reading of the source's own "exactly one" instruction than
   the crashed draft's object shape, not merely a mechanical fix. The same
   pass also corrected `dateOfBirth` and four other date fields (previously
   `type: "string"` + a disallowed `format: "date"` combination — GovSchema
   has no `format` keyword either; the correct spelling is `type: "date"`),
   `sex`/`maritalStatus` (previously `type: "string"` + a disallowed top-level
   `enum` array — moved into `type: "enum"` + `validation.enum`), and
   `emailAddress` (previously `format: "email"`, replaced with a `validation.pattern`
   regex, per this registry's established `format`-is-unsupported convention).

2. **Conditional fields modelled as optional.**
   Fields like `residencePermitNumber`, `residencePermitValidUntil`,
   `familyMemberName`, and company/contact details are conditional on other
   selections (e.g., visa purpose, residence in another country). Per the registry's
   established convention (see `bg/mvr/zayavlenie-za-izdavane-na-pasport`), these
   are marked `required: false` without added `requiredWhen` conditions, to avoid
   over-constraining the schema and to defer conditional validation to
   implementation-layer validation rules.

3. **Office-only decision section excluded.**
   The form includes a decision section (at the top, filled by MZEZ staff during
   processing) with:
   - Vrsta odločitve (decision type: approval/rejection/issuance)
   - Validity period (from/to dates)
   - Allowed days of stay
   - Signature of responsible official

   Per the registry's convention of excluding office-only sections (see the
   Passport form's treatment of DKP registration fields), these fields are
   **not included** in the schema. The schema models only applicant-submitted
   and applicant-provided fields.

4. **Bilingual form unified in schema.**
   The form is published in both Slovenian and English (SI-EN version). The
   schema's `label` fields use Slovenian text (the primary form language), and
   the `sourceRef` fields cite both Slovenian and English labels for clarity.

## Fixture design rationale

Three conformance fixtures are included:

1. **`valid-family-reunification.json`:** A complete valid application for family
   reunification (purpose a). Includes all required fields, a family member name,
   and represents a common use case.

2. **`valid-student-employment.json`:** A complete valid application for student
   employment under international agreement (purpose j). No family member or
   company contact fields (not applicable). Demonstrates an alternative purpose
   selection.

3. **`invalid-missing-required-purpose.json`:** An invalid fixture that omits
   the required `purposeOfVisa` field entirely (no purpose selected). Raises
   exactly one error (`required` on `purposeOfVisa`), independently confirmed
   via an ad hoc ajv check built from this schema's own `fields[]`
   (`required`/`type`/`validation.enum`/`validation.pattern`) — see
   "Verification summary" below.

## Verification summary

- **Source authenticity:** Government of Slovenia official consular-affairs form,
  published on gov.si.
- **Field extraction:** All 21 numbered applicant-submission fields extracted
  and modelled faithfully.
- **Anti-duplication:** Confirmed distinct from EU Schengen Annex I short-stay
  form via 10 unique Slovenia-specific purpose categories.
- **Bilingual:** Correctly documented as bilingual (SI/EN).
- **Office-only sections:** Decision section appropriately excluded.
- **Maturity:** Structural-reference (draft status) — schema captures the form's
  published structure without execution testing or agent-ready validation.
- **Meta-schema conformance:** `node tools/validate.mjs` and
  `node tools/validate-ajv.mjs` both pass 494/494 documents (this schema
  included) after the field-shape corrections above. All 3 conformance
  fixtures independently re-checked against an ad hoc ajv schema built from
  this document's own `fields[]`: both valid fixtures raise 0 errors, the
  mutation-control fixture raises exactly 1 (`required` on `purposeOfVisa`).

## Commit metadata

- **Issue:** GOV-3249 (Slovenia Visa vertical authoring)
- **Branch:** `gov-3249-si-visa-application`
- **Cycle:** GovSchema Standard Research (weekly)
- **Related issues:** GOV-3246 (Slovenia research plan, GOV-3248/GOV-3249 delegation),
  GOV-2910 (Business Formation, Slovenia 1st jurisdiction), GOV-2927 (Passport,
  Slovenia 2/6), GOV-2928 (National ID, Slovenia 3/6), GOV-2929 (Taxes,
  Slovenia 4/6).

---

**Next steps:** Schema validation against both ajv and govschema-conformance
validators, fixture validation, CATALOG.md update (separate PR), and registry
merge via review-gate process.
