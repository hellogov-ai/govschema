# Verification record — `ee/transpordiamet/vehicle-transfer-notification` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1728**: "GovSchema Standard Research" — Estonia had 4 of 6
verticals published entering this cycle (National ID, `ee/ppa/e-residency-application`,
GOV-1698; Business Formation, `ee/rik/private-limited-company-foundation`,
GOV-1705; Passport, `ee/ppa/passport-application`, GOV-1712; Taxes,
`ee/emta/income-tax-return-form-a`, GOV-1721). The issue's own screening
order named DMV (via Transpordiamet, the Estonian Transport Administration)
as this cycle's top-priority candidate, and it turned out strong enough that
neither the ES National ID fallback nor a new-24th-jurisdiction candidate was
ever screened this cycle.

## Candidate screening (Phase 1-2)

### Authenticated portals screened and ruled out as primary sources

- `https://eteenindus.mnt.ee/main.jsf?lang=en` — Transpordiamet's e-service
  portal. Fetched directly: it is a server-rendered login page ("Please log
  on to carry out the desired transaction") with ID-card/Mobile-ID/Smart-ID/
  bank login options; the actual first-registration, ownership-transfer, and
  driving-licence transactions all live behind this login and are not
  visible unauthenticated.
- `https://dire.transpordiamet.ee/public` — the "digital vehicle
  registration" environment referenced from
  `https://transpordiamet.ee/en/vehicle-digital-registration`. Fetched
  directly: it is a client-rendered Angular/React-style SPA that returns only
  a bare page title ("Sõidukite digiregistreerimine") to an unauthenticated
  fetch, no field-level content — the same class of obstacle this registry
  has repeatedly found for gov.au, riigiteataja.ee, and other client-rendered
  SPAs (see e.g. `ee/rik/private-limited-company-foundation`'s
  VERIFICATION.md).

### Candidate examined and picked: Transpordiamet's "Forms" (taotlused-blanketid) page

Transpordiamet publishes a plain, server-rendered "Forms" listing at
`https://www.transpordiamet.ee/taotlused-blanketid` with dozens of
downloadable PDF/DOCX application forms (vehicle, driving-licence, aviation,
maritime). Two vehicle-register forms were downloaded and their AcroForm
layer inspected directly with `pdfjs-dist` (`npm install pdfjs-dist` in a
scratch directory, per this registry's standard workaround since neither
`pdftotext` nor `pdftoppm` is available in this environment):

- `Taotlus sõiduki kustutamiseks.pdf` ("Application to delete a vehicle from
  the register") — a real, ~15-field AcroForm, confirmed via direct `curl`
  (HTTP 200, real `%PDF-1.6` bytes) and `pdfjs-dist` widget extraction.
- **`Võõrandamisest teatamise avaldus.pdf`** ("Notice of Vehicle Disposal") —
  picked. A real, richer AcroForm (67 named text/radio widgets across a
  single page) confirmed the same way: direct `curl` returns HTTP 200,
  90,671 bytes of real `%PDF-1.6` data (not a scanned image), and
  `pdfjs-dist`'s AcroForm annotation layer lists 67 real, named widgets
  (`Text Box 1`, `Text Box 2`..`Text Box 2_33`, `Text Box 3`..`Text Box
  3_16`, `Text Box 4`..`Text Box 4_17`, and a 4-way `Option Button 1` radio
  group). This form is the closer analogue of `cl/sii/aviso-venta-vehiculo`
  (GOV-1638) — a citizen-facing "notice of vehicle sale/transfer" schema
  already an established, accepted shape in this registry for the DMV
  vertical — and captures a materially richer transaction (owner data,
  optional authorized representative, vehicle identification, the disposal
  contract itself, and the new owner's data) than the simpler deletion form.

Both forms are unauthenticated, directly downloadable AcroForm PDFs (no
login, no session, no wizard) — the strongest source shape this registry
recognizes, and a step up from the "governing statute as primary source"
technique all four prior EE schemas relied on for at least part of their
sourcing.

### Field-to-label mapping method: y/x-coordinate matching

The AcroForm's own field names are generic (`Text Box 1`, `Text Box 2_12`,
etc.), not semantic — so each widget's meaning was established by
cross-referencing its `rect` (bounding box) against the page's text-content
items, each with their own `(x, y)` position, extracted via
`page.getTextContent()`. The form's own layout consistently places a blank
entry box **above** its own printed caption (verified against the `ALLKIRI`/
`KUUPÄEV` signature row, where the caption sits below a widget and the
`/allkirjastatud digitaalselt/` note sits below that) — every one of the 67
widgets was matched to its caption this way, and every match was corroborated
by an internal consistency check: the 11-box owner/authorized-person/new-owner
identifier clusters each have exactly 11 boxes (matching the 11-digit
Estonian isikukood), and the VIN cluster has exactly 17 boxes (matching the
17-character VIN standard) — a strong signal the coordinate-based mapping is
correct, not a coincidental alignment.

### Governing statute: Road Traffic Act (Liiklusseadus)

The Act's official English translation was retrieved to source the legal
basis for the transaction (amending the motor register's owner-of-record
data) that this notice performs. Same `riigiteataja.ee` SPA-shell obstacle as
every prior EE schema: a direct `curl` of
`https://www.riigiteataja.ee/en/tolge/pdf/522122025002` (the current,
17.12.2025-in-force consolidated English translation) returns only the
Angular shell, not the statutory text. Resolved via the Wayback Machine
(`http://web.archive.org/web/20260123135944/https://www.riigiteataja.ee/en/tolge/pdf/522122025002`),
which resolved to a real, extractable 575,931-byte `%PDF-1.4` (144 pages,
real text layer, `pdfjs-dist`-extracted, no OCR needed). Confirmed:

- **§76** ("Registration of motor vehicle and its trailer") — registration is
  "an act whereby [Transport Administration] enters the details of a motor
  vehicle or its trailer... and the persons related to it into the motor
  register," and vehicles are "registered or a decision to refuse
  registration is made... by the Transport Administration" (§76(7)).
- **§77(2)-(3)** ("Refusal to register motor vehicle and its trailer,
  amendments to register data and deletion from register") — "Amending
  register data means changing, adding or omitting data about a motor
  vehicle and its trailer and persons relating thereto," and "In order to
  amend register data, the owners, their representatives or other entitled
  persons of a motor vehicle and its trailer must submit a valid application
  to the Transport Administration within five working days of the
  occurrence of the amendment" — this is the statutory basis for the notice
  this document models: a change of owner is an amendment to register data.
- **§77(9)** — "In the event of transfer, change of user or deletion from
  the register of a motor vehicle or its trailer encumbered with a
  restriction on transfer, a written consent of the person who imposed the
  restriction must be submitted" — confirms "transfer" (võõrandamine) is the
  Act's own term for the transaction this form's title names.

No English translation of the underlying ministerial regulation
("Mootorsõiduki ja selle haagise registreerimise tingimused ja kord," the
implementing regulation for §76-77) was found on `riigiteataja.ee` — only
Estonian-language versions are published for this instrument, unlike the
primary Act. The Act's own English sections above were sufficient to source
the legal basis for the transaction; the form itself, not the regulation,
sources every individual field.

## Candidates not screened

Per this cycle's own priority order, the ES National ID fallback (the EX-15/
NIE-related candidate) and opening a new 24th jurisdiction were never
screened, since the EE DMV vertical turned out genuinely well-sourced on the
second candidate examined on Transpordiamet's own forms page. Visa remains
EE's only unscreened vertical (lowest priority per this registry's standing
finding that EU/Schengen visa applications tend to duplicate an
already-modelled template) — the last remaining gap for EE's own 6/6.

## Field inventory (Phase 3)

22 `fields[]` entries and 2 `documents[]` entries, every one carrying its own
`sourceRef` citing the AcroForm's own widget name and the form's printed
caption, or a specific Road Traffic Act section. Summary by step:

| Step | Fields | Source |
|---|---|---|
| Registered owner's data | `ownerName`, `ownerIdentifierType`, `ownerPersonalIdCode`, `ownerRegistryCode`, `ownerCounty`, `ownerCityOrParish`, `ownerStreetAddress`, `ownerPhone`, `ownerEmail` | Application form, REGISTRIJÄRGSE OMANIKU ANDMED section |
| Authorized person (if needed) | `authorizedPersonGivenName`, `authorizedPersonSurname`, `authorizedPersonPersonalIdCode` | Application form, VOLITATUD ISIK section |
| Vehicle data | `vehicleMake`, `vehicleCommercialName`, `registrationPlate`, `vin` | Application form, SÕIDUKI ANDMED section |
| Disposal contract data | `contractType`, `contractDate`, `contractNumber` | Application form, LEPINGU ANDMED section |
| New owner's data | `newOwnerName`, `newOwnerIdentifierType`, `newOwnerPersonalIdCode`, `newOwnerRegistryCode` | Application form, UUE OMANIKU ANDMED section |
| Signature and date | `applicationDate` | Application form, ALLKIRI/KUUPÄEV row |
| Documents | `disposalContractDocument`, `signatureAttestation` | Application form header instruction; signature row note |

## Access notes and judgment calls

1. **Scoped to the e-mail submission channel the form itself instructs.**
   The form's own header reads "Palume täita hallid lahtrid, allkirjastada
   digiallkirjaga, lisada skaneeritud võõrandamisleping ja saata
   info@transpordiamet.ee" ("Please fill in the grey fields, sign with a
   digital signature, attach a scanned disposal contract, and send to
   info@transpordiamet.ee"). This is a distinct channel from the
   authenticated `eteenindus.mnt.ee` self-service portal or the
   `dire.transpordiamet.ee` digital-registration environment, both of which
   remain out of scope (see "Candidates screened and ruled out" above).
2. **`ownerIdentifierType`/`newOwnerIdentifierType` model an "OR" alternative
   as an enum gating two conditionally-required fields, not two independent
   optional fields.** The form itself prints "Eesti isikukood **või**
   Registrikood" (personal code **or** registry code) with distinct widget
   shapes for each (11 single-digit boxes vs. one wide alphanumeric box) —
   the same modelling technique `ee/ppa/passport-application`'s
   `citizenshipProofMethod` used for its own form's "OR" alternative.
3. **`ownerName`/`newOwnerName` are single combined fields, not split
   given-name/surname pairs.** The form's own widget for this row is one
   text box captioned "Nimi (ees- ja perekonnanimi)/ Ärinimi" ("Name (first
   and last name)/Business name") — a single field on the source, unlike
   `authorizedPersonGivenName`/`authorizedPersonSurname`, which the form
   splits into two separate boxes captioned "Eesnimi"/"Perekonnanimi".
   Modelled to match the source's own granularity in each case.
4. **Signature is not modelled as a text field.** The row captioned
   "ALLKIRI KUUPÄEV" ("SIGNATURE DATE") has only one fillable widget (`Text
   Box 3_16`, positioned under "KUUPÄEV"); the note directly below,
   "/allkirjastatud digitaalselt/" ("digitally signed"), confirms the
   signature itself is a cryptographic digital signature applied to the
   submitted file as a whole, not typed into a box — the same reasoning
   `ee/ppa/passport-application`'s VERIFICATION.md applied to fingerprinting.
   Modelled as `documents.signatureAttestation` (category `attestation`),
   paralleling that schema's `dataAccuracyAttestation`.
5. **`contractNumber` is optional.** The source form provides a box for it
   (captioned "Number", alongside "Sõlmimise kuupäev"/date of conclusion),
   but a private disposal agreement between two individuals (a common case
   for `contractType: sale-agreement`/`gift-agreement`) is not always
   assigned a formal reference number, and nothing on the form marks this
   box mandatory (unlike, e.g., `ownerPhone`, which the form's grey-shading
   convention and instruction line treat as required alongside the other
   grey fields).
6. **No state fee is modelled.** Unlike the sibling "Taotlus sõiduki
   kustutamiseks" (deletion) and "Taotlus väikelaeva või jeti
   registreerimiseks" (watercraft registration) forms — both of which
   explicitly print a `riigilõiv` (state fee) payment-reference section —
   this disposal-notice form's own text contains no fee mention at all. The
   Road Traffic Act's own §76(14) ties a state fee to registration-plate
   issuance and register entries "regarding a motor vehicle and its
   trailer," but nothing found this cycle ties a specific fee figure to a
   bare change-of-owner notice under §77(2)-(3); rather than invent one,
   this document has no `documents[]` payment entry.
7. **`vin` and the two 11-digit identifier fields carry a pattern derived
   from the box count, not from explicit form text.** The form does not
   print "17 characters" or "11 digits" anywhere; the pattern is inferred
   from directly counting each cluster's AcroForm widgets (17 boxes for
   `Text Box 4`..`Text Box 4_17`; 11 boxes for each `Text Box 2` cluster),
   cross-checked against the well-known external VIN (ISO 3779, 17
   characters, no I/O/Q) and Estonian isikukood (11-digit) formats.
8. **`registrationPlate` and `vehicleMake`/`vehicleCommercialName` carry no
   `validation.pattern`.** The form's own boxes for these are plain
   free-text entry lines with no visible character-count constraint (unlike
   the isikukood/VIN clusters, which are visibly pre-segmented into
   individual-character boxes) — left unconstrained rather than inventing a
   pattern the source does not show.
9. **"TEENINDUSBÜROO MÄRKUSED" (service-bureau notes) section excluded.**
   The form's final section (staff name, staff signature, staff date) is
   completed by a Transpordiamet employee upon receipt, not by the
   applicant — excluded per this registry's standing applicant-input-only
   convention (the same reasoning `ee/ppa/passport-application` applied to
   fingerprinting and `ee/rik/private-limited-company-foundation` applied to
   registrar-assigned outputs).
10. **The unlabelled "Arhiivitunnus" (archive/reference code) printed at the
    very top of the form has no corresponding AcroForm widget** (confirmed:
    all 67 widgets are accounted for by the mapping in "Field inventory"
    above, none positioned near it) — it is a static caption for an internal
    archival classification stamp applied by Transpordiamet's own records
    system, not an applicant-supplied value, and is excluded.

## Test run (Phase 4)

No live submission was attempted: e-mailing a digitally-signed real
ownership-transfer notice to `info@transpordiamet.ee` would attempt to
amend Estonia's actual motor register — not a safe or reversible action to
simulate against a live government process, consistent with this registry's
standing discipline (the same reasoning every prior EE schema documented).

Instead, one fully hand-constructed mock record was built from this
document's own field inventory — a fictional sale of a Toyota Corolla
between two natural persons, both identified by an Estonian isikukood, with
no authorized representative — and is committed as this document's
conformance fixture
(`conformance/ee/transpordiamet/vehicle-transfer-notification/1.0.0/car-sale-natural-persons.json`).
It was checked with a small ad hoc Node script (not committed) that compiles
`schema.json`'s own `required`/`requiredWhen`/`validation` rules (including
the shared `Condition` grammar's `equals` leaf) and every
`documents[].required`/`requiredWhen` rule, and evaluates them directly
against the fixture:

```
$ node check.mjs registry/ee/transpordiamet/vehicle-transfer-notification/1.0.0/schema.json conformance/ee/transpordiamet/vehicle-transfer-notification/1.0.0/car-sale-natural-persons.json
All required/requiredWhen/enum/pattern checks passed against conformance/ee/transpordiamet/vehicle-transfer-notification/1.0.0/car-sale-natural-persons.json
```

**Negative controls** (each run against a variant payload, not committed as
separate fixture files), confirming the script actually catches violations
rather than passing vacuously:

- (a) `vin: "TOO-SHORT"` — caught: fails the 17-character VIN `pattern`.
- (b) `contractType: "lease-agreement"` — caught: not in
  `["sale-agreement","gift-agreement","exchange-agreement","other"]`.
- (c) `ownerName` removed entirely — caught: `FIELD ownerName: required but
  missing`.
- (d) `ownerIdentifierType: "personal-code"` with `ownerPersonalIdCode`
  omitted — caught: `FIELD ownerPersonalIdCode: required but missing`.
- (e) `documents.disposalContractDocument: false` — caught: `DOCUMENT
  disposalContractDocument: required but missing`.
- (f) `applicationDate: "22/06/2026"` (wrong date format) — caught: fails
  the `YYYY-MM-DD` date check.
- (g) `newOwnerIdentifierType` switched to `"registry-code"` with
  `newOwnerPersonalIdCode` removed and no `newOwnerRegistryCode` supplied —
  caught: `FIELD newOwnerRegistryCode: required but missing`, confirming the
  gating enum correctly flips which alternative is required.

All seven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/transpordiamet/vehicle-transfer-notification/1.0.0/schema.json
ok   registry/ee/transpordiamet/vehicle-transfer-notification/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/transpordiamet/vehicle-transfer-notification/1.0.0/schema.json
ok   registry/ee/transpordiamet/vehicle-transfer-notification/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
