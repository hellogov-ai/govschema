# Verification record — `nz/inz/nzeta-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was **derived from and cross-checked against** two classes of
official source (below), but the full field-by-field comparison the practice
requires — confirming *every* published field, type, requiredness, and
constraint directly against the live rendered nzeta.immigration.govt.nz form or
app screen — has **not** been completed. It therefore remains `draft`, not
`verified`.

## Why this candidate was picked up now

Visa is the least-covered of GovSchema's 6 focus verticals (5 of 9 tracked
jurisdictions — US, GB, FR, CA, AU — had a Visa schema before this document; NZ
had none). Unlike the IE/SG/DE Visa gaps, which already had catalog candidates,
**New Zealand's NZeTA was not in `discovery/catalog.json` at all** — a genuine
gap surfaced during this cycle's phase-2 research (online search for government
application portals GovSchema is missing), not just an unauthored existing
candidate. A `discovery/catalog.json` entry was added and immediately flipped to
`published` in the same change, per the discovery README's "from catalog to
registry" procedure.

## Access constraint

`nzeta.immigration.govt.nz` is a client-side-rendered Angular single-page
application: a plain `WebFetch`/`curl` request returns only the loading shell
(`loading_flat.gif` and empty `<app-root>`), with no field markup. This is a
different failure mode than the HTTP-403 blocks recorded for
`passports.gov.au`/`dfat.gov.au`/`immi.homeaffairs.gov.au` (see
`gov-au-wayback-workaround`) — the page loads fine, it simply has nothing to
read until the JavaScript bundle executes in a real browser, which this
environment does not have for this domain.

## Sources examined

- **Document `(id, version)`:** `nz/inz/nzeta-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration New Zealand (INZ)
- **Official overview/eligibility pages (fetched directly, HTTP 200, no
  access block):**
  - <https://www.immigration.govt.nz/new-zealand-visas/visas/visa/nzeta>
  - <https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/>
- **Live application field identifiers (Wayback Machine capture):**
  <http://web.archive.org/web/20260515072858/https://nzeta.immigration.govt.nz/>
  (captured 2026-05-15; live domain confirmed reachable but JS-rendered-empty
  at authoring time, 2026-07-03). The capture's compiled Angular bundle
  (`main.3bef7e920f6f1243.js` plus lazy-loaded chunks `364.8c4c9510e259b392.js`,
  `432.c82603301268331f.js`, `261.645a422205adcd9a.js`,
  `984.9b9f389b84f76aeb.js`, `862.a318d720911d5d00.js`, retrieved via the
  Wayback CDX index) exposes the live form-control field keys verbatim
  (`qPassportGivenName`, `qPassportSurname`, `qOtherGivenName`, `qOtherSurname`,
  `qOtherNames`, `qDOB`, `qGender`, `qCountryOfBirth`, `qPlaceOfBirth`,
  `qCitizenship`, `qIssuingCountry`, `qPassportNumber`, `qPassportExpiryDate`,
  `qNationalID`, `qEmailAddress`, `qConfirmEmailAddress`, `qConvictedEver`,
  `qDeported`, `qProhibitedEntry`, `qMedical`, plus out-of-scope-flow fields
  `qAusPRV`/`qAusPrv`, `qPrvHolder`, `qCruiseShip`, `qCruiseShipTransit`,
  `qTransit`, `qVRTransit`, `qVWTTransit`, `qAmericanSamoa`, `qEtaHolder`,
  `qEtaNumber`) — a stronger signal than a plain-text summary, though the
  associated i18n label text (loaded separately at runtime) was not retrievable
  from the static capture.
- **Third-party sites deliberately excluded:** nzetaonlinevisa.com,
  nz-eta.info, nzetapermit.com, nzeta-visa.org, and similar search results —
  these present as unofficial visa-reseller/markup sites, not government or
  authorized-partner sources; citing them for field wording would violate
  source-of-truth fidelity even where their prose happens to be accurate.
- **Retrieved / reviewed:** 2026-07-03
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Scope decisions

- **Out of scope — transit-only applicants.** Live fields `qTransit`,
  `qVRTransit`, `qVWTTransit` indicate a distinct transit pathway (up to 24
  hours through Auckland International Airport); this document models the
  visiting pathway only.
- **Out of scope — cruise/cargo ship passengers.** Live fields `qCruiseShip`,
  `qCruiseShipTransit` indicate a separate pathway; not modeled.
- **Out of scope — the China/Pacific-Islands-Forum-via-Australia and
  Australian-citizen/permanent-resident pathways.** Live fields `qAusPRV`,
  `qAusPrv`, `qPrvHolder` (Australian permanent resident visa) indicate a
  separate eligibility branch documented on the overview page; not modeled.
- **Out of scope — airline crew members** (5-year validity vs. 2-year for
  travellers) and **existing-NZeTA-holder change requests** (live fields
  `qEtaHolder`, `qEtaNumber`, `qEtaResultHeader`, `qEtaStatusResult` belong to a
  status-check/change-request flow, not a first-time request).
- **Out of scope — more than one other declared name, and group/family
  submissions.** The live application's own field naming (`qOtherGivenName`
  singular, not an array) and the app's documented support for submitting up to
  10 people in one session are both flattened to a single applicant, single
  prior-name pair — the same class of simplification already recorded for
  `au/homeaffairs/eta-application-601`'s single-additional-passport scope note.
- **Out of scope — a discrete "purpose of visit" field, and financial/
  accommodation/departure-proof upload fields.** The official overview
  mentions demonstrating sufficient funds and proof of onward/return travel as
  requirements the traveller must be *able* to satisfy (including, per one
  fetched summary, "at least NZD $1,000 a month, or NZD $400 a month if
  accommodation is already paid for"), but neither the live application's field
  keys nor the primary overview pages show these as data fields collected
  *during* the NZeTA request itself (as opposed to being checked at
  check-in/border). Fabricating specific upload/bank-statement fields not
  evidenced in the live field-key list would repeat the fabricated-quote
  mistake recorded in `gov-source-fidelity-verification`; they are recorded in
  `description` as requirements to be ready to demonstrate, not as `fields`.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Live field keys for passport/identity data | `passportIssuingCountry`, `citizenship`, `passportNumber`, `familyName`, `givenNames`, `dateOfBirth`, `gender`, `countryOfBirth`, `placeOfBirth`, `passportExpiryDate`, `nationalIdNumber` |
| Live field keys for a prior-name declaration | `hasOtherNames`, `otherGivenNames`, `otherFamilyName` |
| Live field keys for contact/email, including a confirm-email step with its own validation | `emailAddress`, `confirmEmailAddress` |
| Live field keys for character declarations (conviction, deportation, prohibited entry) | `hasCriminalConviction`, `criminalConvictionDetails`, `hasBeenDeportedOrRefusedEntry`, `deportationOrRefusalDetails` |
| Live field key for a health/medical declaration, with a conditional follow-up quiz (`showMedicalQuiz`) | `travelingForMedicalTreatmentOrHasCondition`, `medicalDetails` |
| Required documents — "one acceptable photo, or a device capable of taking one" | `applicantPhoto` |
| Passport must be valid "at least 3 months after the date you intend to leave New Zealand" | `passportExpiryDate` description |
| Fee ("From NZD $17"/"$23"), processing ("Allow 72 hours"), validity ("2 years for travellers... 5 years for airline crew members"), stay length (3 months, 6 for UK citizens, capped at 6 months per 12-month period) | Recorded in `description`, not encoded as a data field (same convention as the sibling `gb/homeoffice/eta-application`, `ca/ircc/eta-application`, `au/homeaffairs/eta-application-601`) |

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data,
a representative filled-out request was authored and checked field-by-field
against every `type`/`required`/`validation`/`requiredWhen` constraint in
`schema.json` using a small hand-rolled Node validator (not committed to the
repo):

```json
{
  "passportIssuingCountry": "Republic of Korea",
  "citizenship": "South Korean",
  "passportNumber": "M1234567",
  "familyName": "Kim",
  "givenNames": "Ji-woo",
  "dateOfBirth": "1996-03-11",
  "gender": "female",
  "countryOfBirth": "South Korea",
  "placeOfBirth": "Busan",
  "passportExpiryDate": "2032-01-05",
  "hasOtherNames": false,
  "emailAddress": "jiwoo.kim@example.kr",
  "confirmEmailAddress": "jiwoo.kim@example.kr",
  "hasCriminalConviction": false,
  "hasBeenDeportedOrRefusedEntry": false,
  "travelingForMedicalTreatmentOrHasCondition": false,
  "applicantPhoto": "jiwoo-kim-photo.jpg"
}
```

This models Ji-woo Kim, a South Korean passport holder (a visa-waiver country)
requesting an NZeTA for a two-week visit, with no prior names and no
character/health flags raised, so `otherGivenNames`/`otherFamilyName`,
`criminalConvictionDetails`, `deportationOrRefusalDetails`, and `medicalDetails`
are all correctly omitted, and `nationalIdNumber` is left unset since Korean
passports carry no National ID field. `confirmEmailAddress` is checked for an
exact match against `emailAddress`. The script confirmed every populated field
satisfies its `type`/`validation` constraint, every `requiredWhen` condition is
correctly satisfied or correctly left unset, no required field was left unset,
and every `steps[].fields` entry resolves to a declared field name:

```
PASS — mock adult self-application NZeTA (no other names, no character/health flags, single passport) satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself and pass:

```
$ node tools/validate.mjs registry/nz/inz/nzeta-application/1.0.0/schema.json
ok   registry/nz/inz/nzeta-application/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/nz/inz/nzeta-application/1.0.0/schema.json
ok   registry/nz/inz/nzeta-application/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **The live form/app's exact screen-by-screen wording, field order, and label
  text** were not directly observed rendered in a browser — field identifiers
  were extracted from compiled JavaScript, and the human-readable label
  strings are loaded separately at runtime from a resource this environment
  could not retrieve.
- **`gender`'s exact option set and labels** are not confirmed; the compiled
  bundle exposes `genderOptions`/`genderDiverse` alongside `qGender`, implying
  at least one inclusive option beyond male/female, but the literal label text
  (e.g. "Another gender" vs. some other wording) was not observed.
- **`hasBeenDeportedOrRefusedEntry` may be two separate questions** in the live
  form (`qDeported` and `qProhibitedEntry` are distinct field keys) rather than
  one combined declaration as modeled here.
- **`travelingForMedicalTreatmentOrHasCondition`'s follow-up quiz** content
  (`showMedicalQuiz`) is not modeled — only the top-level yes/no plus a single
  free-text details field.
- **Constraint bounds** (name/string lengths, `criminalConvictionDetails` etc.
  2000-character caps) are reasonable defaults consistent with sibling ETA
  documents in this registry, not citations of a published INZ validation
  rule.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) against the live nzeta.immigration.govt.nz form (or app)
rendered in a real browser with a real test passport, confirms the sources are
still authoritative, resolves any discrepancy by shipping a new schema
**version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the sources on or before that date, on any `source.url`
change, or when Immigration New Zealand ships a new version of the NZeTA
application.
