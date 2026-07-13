# Verification record — `bd/brta/motor-vehicle-registration-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2644**. It opens
**Bangladesh's DMV vertical (2 of 6)**, using the Bangladesh Road Transport
Authority's (BRTA) "Form of Application for the Registration of Motor
Vehicle". Bangladesh currently has only its Taxes vertical published
(`bd/nbr/individual-income-tax-return-form-it-11ga`).

## Source verification (independently re-derived, not copied from the task briefing)

- **Form page:** `https://brta.gov.bd/pages/forms/6922d9b3933eb65569dff7ec` —
  independently re-fetched this cycle, **HTTP 200**.
- **PDF source:**
  `https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-brta/2024/12/d4bc1c3b395d434f87240284abeb807a.pdf`
  — fetched independently this cycle via
  `curl -sk -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"`
  (the host's TLS chain fails default certificate verification, consistent
  with the task briefing's note):
  - **HTTP 200**, `Content-Type: application/pdf`, **71911 bytes**.
  - **`sha256`:**
    `96d0e10bcb05988ec2cb31419656121440b5602353493c33e91b38d412721223`
    (computed via `sha256sum` on the freshly-downloaded file).
  - All three figures were independently re-derived this cycle and match the
    prior scouting pass's reported figures exactly.
- Parsed with `pdfjs-dist@6` (legacy build), installed in a scratch directory
  (not a repo dependency):
  - `getFieldObjects()` returned **`null`** — **no AcroForm widgets**, a
    plain print-and-fill document, not a fillable form. This matches the
    prior scouting note's characterization and also matches this cycle's
    independent screening of the driving-licence variant on the same BRTA
    forms page, which was confirmed a dead end (garbled/generic AcroForm
    field names, no legible text layer) and **not** re-attempted here — only
    this vehicle-registration form was in scope.
  - `getTextContent()` returned a full, clean **English** text layer across
    all 3 pages, **4801 characters** total — matching the prior pass's
    reported ~4,801 exactly.
  - Every field below was extracted directly from this text layer.
  - Additionally rendered all 3 pages to PNG at 3x scale via `pdfjs-dist` +
    `@napi-rs/canvas` and visually inspected the images, specifically to
    check for printed checkbox/option lists next to the five items the prior
    scouting pass flagged as possible enums (Sex, Owner type, Vehicle or
    trailer, Class of vehicle, Fuel used). **None of the five had any
    printed checkbox, radio mark, or enumerated option list anywhere on the
    rendered page** — each is simply a label followed by a blank
    colon-terminated line, confirmed visually as well as textually.

## Deviation from the task briefing, disclosed

Given this task's own instruction to identify enum values directly from the
form's own text layer, and finding no printed option list for any of the five
candidate fields, this schema models **`ownerType`, `ownerSex`,
`classOfVehicle`, and `fuelUsed` as free-text `string`, not `enum`** —
deviating from the prior scouting pass's suggestion that these might be
enums. This is consistent with this registry's own established
`th/dlt/vehicle-registration-application` precedent (its `vehicleType`,
`engineType`, and `vehicleUseCategory` are likewise modeled as free-text
because "the source prints each as a blank line with no enumerated options to
choose from"). The sole exception is **`vehicleOrTrailer`, modeled as a
2-value enum** (`vehicle` / `trailer`) — not because a checkbox exists, but
because the printed label itself names exactly two mutually exclusive
options ("Vehicle or trailer").

## Full field-numbering cross-check (own extraction vs. prior scouting note)

Own extraction (pdfjs-dist `getTextContent()`, cross-checked against the
rendered page images) confirms the prior pass's numbering almost exactly:

- Section II (owner information), items 1-13: Name of owner, Date of birth,
  Father/Husband, Nationality, Sex, Guardian's name, Owner's Address (one
  only), Phone No., PO/Bank, Joint owner, Owner type, Hire, Hire purchase.
- Section III (owner information / vehicle specification), items 14-31:
  Vehicle or trailer, Class of vehicle (14a), Prev. Regn. No. (15),
  Maker's name (15a), Type of body, Maker's Country, Color (cabin/body),
  Year of manufacture, Number of cylinders, Chassis number, Engine number,
  Fuel used, Horse power, RPM, Cubic capacity, Seats (incl. driver), No. of
  Standee, Wheel base, Unladen weight (kg), Maximum laden/train weight (kg).
- Section IV (additional information for transport vehicle), items 32-38:
  item 32 is printed verbatim as **"No. of types :"** (not "No. of tyres" —
  see the disclosed `numberOfTyres` field description for why this is almost
  certainly a source-side wording quirk for tyre count, given its position
  immediately before "Tyres size" and "No. of axle"), Tyres size, No. of
  axle, Maximum axle weight (kg) broken into a) Front axle (1)(2), b)
  Central axle (1)(2)(3), c) Rear axle (1)(2)(3), Dimensions (mm): a)
  Overall length b) Overall width c) Overall height, Overhangs (%): a)
  Front b) Rear c) Other, and a vehicle-dimension-drawing attachment line.
- Section V (page 2), items 39-41: Hire purchase/hypothecation information
  (Name, Date, Address), Insurance information (Policy no., Type of policy,
  Insurer's name & address, Date of expiry — printed with a duplicated "b)"
  label for both "Type of policy" and "Date of expiry", disclosed on the
  `insurancePolicyExpiryDate` field), Joint owner information (two columns,
  "a)"/"b)", each with Name and Father/Husband).
- Section VI (page 2), items 42-46: Declaration by owner, Registered
  dealer's certificate, certificate by the Inspector of Motor Vehicles,
  Registration Status, Fees and Tax Accounts — see scoping decision below.
- Page 3, "Owner's Particulars/Specimen Signature": a 13-item duplicate
  identity/vehicle-ID card (Name, Father/Husband, Address, Sex, Phone No.,
  Nationality, Date of Birth, Guardian's Name, Chassis No., Engine No., Year
  of Mfg., Prev. Regn. No., P.O./Bank), a "3 Copies Photograph" + "Stamp
  Size Color Pic" box, and 4 specimen-signature boxes.

This confirms the prior scouting pass's field list essentially verbatim; the
only correction is the exact printed wording of item 32 ("No. of types", not
"No. of tyres") and the discovery that items 39-41 are genuinely
applicant-supplied particulars (not office-only), which are modeled as
in-scope fields below.

## Scoping decision

### In scope (63 `fields[]` + 3 `documents[]` entries)

All of Section II (owner information, items 1-13), Section III (vehicle
identification and technical specification, items 14-31), Section IV
(transport-vehicle-specific technical detail, items 32-38, modeled as
optional given no dedicated boolean gates whether a vehicle is a "transport
vehicle"), and Section V (hire-purchase/hypothecation, insurance, and
joint-owner particulars, items 39-41) — all owner-supplied content. Item 38's
drawing-attachment line is modeled as a `documents[]` entry
(`vehicleDimensionDrawing`) plus two companion fields carrying the approver
name and date. Item 42 (Declaration by owner) is modeled as a `documents[]`
attestation entry (`ownerDeclarationAttestation`), mirroring this
jurisdiction's own `bd/nbr/individual-income-tax-return-form-it-11ga`
precedent for modeling a sworn owner declaration as an attestation document
rather than a plain field. Page 3's 3-copies-photograph requirement is
retained as a `documents[]` entry (`ownerPhotograph`).

Bounded repeating structures, modeled as flat numbered-suffix fields (per
this registry's own established `child1`/`child2`-style convention, e.g.
`ng/firs/fct-irs-personal-income-tax-return-form-a`), not unbounded arrays:

- **Axle weights** (item 35): `frontAxleWeightKg1`/`2` (source prints 2
  blanks), `centralAxleWeightKg1`/`2`/`3` (3 blanks), `rearAxleWeightKg1`/
  `2`/`3` (3 blanks) — 8 fields total, each bound exactly to the source's own
  printed `(1) (2) (3)` markers, not an invented cap.
- **Joint owner** (item 41): `jointOwner1Name`/`jointOwner1FatherOrHusbandName`
  (`requiredWhen jointOwner == true`) and `jointOwner2Name`/
  `jointOwner2FatherOrHusbandName` (unconditionally optional, since the
  source's single `jointOwner` boolean does not further distinguish whether
  a second joint owner is mandatory given a first) — matching the source's
  own two-column "a)"/"b)" layout exactly.

### Out of scope, disclosed

- **Section-1's office-only intake box** (Regn No., Issue No., Diary No.,
  Customer ID, District, Vehicle ID, Veh. Description, Call non date,
  Refusal date/Code/Refused by, P.O./Bank, Index, Remarks, Index No.) —
  completed by the BRTA office at intake, not the applicant, per the
  source's own "To be filled in by the office" heading immediately above it.
- **Section VI, items 43-46** — Registered dealer's certificate (signed by
  the selling dealer, not the applicant), certificate by the Inspector of
  Motor Vehicles (office-generated after in-person inspection), Registration
  Status (the registering authority's own adjudication), and Fees and Tax
  Accounts (a payment-receipt line completed at the counter). None of these
  four is applicant-supplied input.
- **Page 3's duplicate identity/vehicle-ID data and specimen-signature/stamp
  boxes** — every one of its 13 numbered items (Name, Father/Husband,
  Address, Sex, Phone No., Nationality, Date of Birth, Guardian's Name,
  Chassis No., Engine No., Year of Mfg., Prev. Regn. No., P.O./Bank)
  duplicates a field already modeled in Section II/III above; the 4
  specimen-signature boxes and the "Stamp Size Color Pic" box are wet-ink/
  physical-artifact placeholders with no fillable data content. Only the
  page's "3 Copies Photograph" requirement is retained, as the
  `ownerPhotograph` document entry, since it is a genuine supporting-artifact
  requirement not captured anywhere else on the form.
- **No signature-only lines modeled as fields.** "Signature of owner" (item
  42(a), 43, 46) and "Signature of dealing assistant"/"Counter signature by
  the registering authority" (item 46) are wet-ink lines with no adjacent
  fillable date sub-line of their own (each date is already captured
  separately, e.g. `hirePurchaseAgreementDate`, or belongs to an excluded
  office-only block) — consistent with this registry's established
  convention (`th/dlt/vehicle-registration-application`'s own precedent) of
  not inventing a field for a bare signature line.
- **Section IV (items 32-38) has no dedicated "is this a transport vehicle?"
  boolean gate on the form itself**, so all of Section IV's fields are
  modeled as optional rather than encoding a fabricated `requiredWhen`
  condition against a field the source does not provide.
- **Insurance particulars (item 40) have no dedicated boolean gate either**,
  unlike `hirePurchase` and `jointOwner` (items 13 and 10, each printed as
  their own labeled line), so `insurancePolicyNumber`/`insurancePolicyType`/
  `insurerNameAndAddress`/`insurancePolicyExpiryDate` are left optional.
- **`ownerType`, `ownerSex`, `classOfVehicle`, `fuelUsed` modeled as
  free-text `string`, not `enum`** — see "Deviation from the task briefing"
  above.
- **`numberOfTyres`'s label is the source's own verbatim "No. of types"
  wording**, not silently corrected to "tyres" — see the field's own
  description and the field-numbering cross-check above.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/brta/motor-vehicle-registration-application/1.0.0/`:

- **`valid-private-individual-owner.json`** — a private individual owner
  registering a new sedan-class vehicle, no hire purchase, no joint owner,
  no transport-vehicle-specific data populated (Section IV left absent, all
  optional).
- **`valid-company-hire-purchase-owner.json`** — a company/organization
  owner with `hirePurchase: true` (exercising the Section V hire-purchase
  `requiredWhen` fields), `jointOwner: true` (exercising both joint-owner
  `requiredWhen` fields plus the optional second joint-owner slot), and a
  fully populated Section IV transport-vehicle technical block (tyres,
  all 8 axle-weight fields, dimensions, overhangs, and the
  `vehicleDimensionDrawing` document with its two companion fields).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) validating
`required`/`requiredWhen`/`type`/`validation.{enum,minimum,maximum,pattern,
minLength,maxLength}` directly against `spec/v0.3/SPEC.md`'s own rules:

```
$ node check_conformance.mjs schema.json \
    valid-private-individual-owner.json \
    valid-company-hire-purchase-owner.json
valid-private-individual-owner.json: 0 error(s)
valid-company-hire-purchase-owner.json: 0 error(s)
```

Five mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-owner-name.json`** — drops `ownerName` (a
  static `required: true` field) from the private-individual valid fixture.
- **`mutation-control-missing-chassis-number.json`** — drops
  `chassisNumber`.
- **`mutation-control-invalid-enum-vehicle-or-trailer.json`** — sets
  `vehicleOrTrailer` to `"motorcycle"`, not one of the enum's 2 values.
- **`mutation-control-invalid-type-year-of-manufacture.json`** — sets
  `yearOfManufacture` to the string `"twenty twenty-five"` instead of an
  integer.
- **`mutation-control-missing-hire-purchase-financier-name.json`** — starts
  from the company/hire-purchase valid fixture and drops only
  `hirePurchaseFinancierName`, isolating the `requiredWhen` violation (since
  `hirePurchase` is still `true` in that fixture).

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-owner-name.json \
    mutation-control-missing-chassis-number.json \
    mutation-control-invalid-enum-vehicle-or-trailer.json \
    mutation-control-invalid-type-year-of-manufacture.json \
    mutation-control-missing-hire-purchase-financier-name.json
mutation-control-missing-owner-name.json: 1 error(s)
  - ownerName: required but missing
mutation-control-missing-chassis-number.json: 1 error(s)
  - chassisNumber: required but missing
mutation-control-invalid-enum-vehicle-or-trailer.json: 1 error(s)
  - vehicleOrTrailer: value "motorcycle" not in enum ["vehicle","trailer"]
mutation-control-invalid-type-year-of-manufacture.json: 1 error(s)
  - yearOfManufacture: expected type integer, got "twenty twenty-five"
mutation-control-missing-hire-purchase-financier-name.json: 1 error(s)
  - hirePurchaseFinancierName: required but missing
```

All five negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/brta/motor-vehicle-registration-application/1.0.0/schema.json
ok   registry/bd/brta/motor-vehicle-registration-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/brta/motor-vehicle-registration-application/1.0.0/schema.json
ok   registry/bd/brta/motor-vehicle-registration-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv` present in this worktree at the
start of this cycle; ran `npm ci --include=dev` inside `tools/` first, per
this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Bangladesh's **DMV vertical (2 of 6)**; Taxes is already published.
  National ID, Passport, Business Formation, and Visa remain
  screened/backlog per prior cycles.
- `jurisdiction.level` is `national` — BRTA is Bangladesh's national road
  transport authority.
- `process.type` is `registration`; `process.language` is `en` — the source
  PDF's own text layer is entirely in English (unlike
  `bd/nbr/individual-income-tax-return-form-it-11ga`, whose 2023 edition is
  also English; Bangladesh's official-language forms typically have separate
  Bengali editions this schema does not address).
- The driving-licence variant on the same BRTA forms page was screened and
  confirmed a dead end this cycle (garbled/generic AcroForm field names, no
  legible text layer) and is not re-attempted here; only the vehicle
  registration form was in scope for GOV-2644.
- Companion candidates for a future cycle: Bangladesh's remaining National
  ID, Passport, Business Formation, and Visa verticals, still
  screened/backlog; and, if a future cycle wants to model
  government-generated certificate/inspection content, the Section VI
  dealer/inspector certificates excluded here (an open scope question, not
  resolved in this cycle, mirroring similar unresolved questions raised in
  `th/dbd/boj-1` and `th/dlt/vehicle-registration-application`'s own
  VERIFICATION.md files).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the
object-storage-hosted PDF has not been silently replaced with a revised
edition (no `Last-Modified` header was captured this cycle to anchor a
future diff, since the header set returned by this object-storage host does
not include one); (2) re-attempting the BRTA forms page directly, in case a
fillable/AcroForm edition is published in the future; (3) whether a future
cycle wants to model Section VI's dealer/inspector certificates as separate
government-generated-content schemas.
