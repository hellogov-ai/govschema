# Verification record — `ng/frsc/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3227)

GOV-3227 targets Nigeria's last open vertical: DMV. Nigeria already has
Passport (`ng/nis/application-for-nigeria-standard-passport`), Business
Formation, Taxes, Visa (`ng/nis/application-for-visa-entry-permit`), and
National ID open (5 of 6). This document opens DMV via the Federal Road
Safety Corps' (FRSC) National Vehicle Identification System (NVIS),
**closing Nigeria to full 6/6 coverage**.

The assigning issue's own description was independently re-verified rather
than trusted as-is — re-fetched the live page fresh this cycle and read
every field/enum/requiredness claim directly from the raw HTML rather than
carrying the prior scouting summary forward unchecked. Several of the
prior summary's specific counts turned out to be off (see "Corrections to
the prior scouting summary" below).

## Source

- **URL:** `https://nvis.frsc.gov.ng/VehicleManagement/RegisterVehicle`
- **Retrieved:** 2026-07-15T22:11:41Z, fetched directly with `curl -L`.
  `HTTP/2 200`, `content-type: text/html; charset=utf-8`, `server: Kestrel`,
  `x-powered-by: ASP.NET`. No `Location` redirect header, no login page,
  no CAPTCHA/WAF interstitial — the form itself renders directly. A
  `.AspNetCore.Antiforgery.*` cookie is set (a CSRF token for the page's
  own POST, standard ASP.NET behavior for any form, not an auth gate).
- **Byte size:** 153,370 bytes.
- **sha256:** `fe00305563a5fbb3c8259252e8df50b0d8f21ab4e7ca29a57253f24bbf31ab50`
- Confirmed FRSC branding: the page's own nav bar renders
  `/vat-assets/images/logofrsc.jpg`, and the nav groups this page
  ("New Vehicle Registration") alongside sibling flows "Verify Number
  Plate" and "Vehicle Revalidation", plus a separate "Login" link that is
  **not** required to reach this registration form.
- The page is a plain server-rendered HTML form (ASP.NET MVC, Razor view
  with unobtrusive client validation), not an AcroForm/PDF — every field
  below was read directly from the raw HTML's `<label>`/`<input>`/
  `<select>`/`<textarea>` elements and their `data-val*` attributes, not
  any rendered/screenshot pass.

## Corrections to the prior scouting summary

The assigning issue's field description, re-verified against the live
page, needed several corrections:

- **VehicleTypeId: 11 options, not 12.** Bus, Crane, Motor cycle, Pick up,
  Salon, SUV, Tractor, Tricycle, Truck, Van, Wagon — counted directly from
  the raw `<option>` elements.
- **EngineCapacityId: 4 bands, not 5.** Below 1.6; Between 1.6 and 2.0;
  Between 2.1 and 3.0; Above 3.0.
- **OwnersTypeId: 5 options, not 6**, and with a gap: the live `<option
  value="...">` set is `{1, 2, 3, 4, 6}` — value `5` does not appear
  anywhere on the page (a gap in the source's own numbering, not a
  GovSchema omission).
- **Title: 14 labels are visually offered, but only 9 are genuinely
  distinct** — see the dedicated finding below. The prior summary's count
  of 15 does not match either number.
- **StateId: 38 options, not 39.** Nigeria's 36 states + FCT (Federal
  Capital Territory, value `15`) + a `"Federal Government"` pseudo-entry
  (value `38`) — counted directly from the raw `<option>` elements on both
  `stateSelect` and `VehicleInfoModel_PlateNoStateId`.
- **YearOfManufacture: 47 years (1981–2027), not 48.**
- **VehicleMakeId and Lgaid counts were confirmed accurate**: 1,569 and 780
  `<option>` elements respectively, each counted directly
  (`grep -c "<option"` scoped to each `<select>` block).

None of these corrections change which vertical opens or the overall
scope; they are disclosed here because the assigning issue explicitly
asked for independent re-verification rather than trust-as-is.

## Disclosed-cap fields (per the assigning issue's own guidance)

- **`vehicleMakeId`** (Vehicle Make): 1,569 `<option>` entries. Critically,
  the dropdown's own `value` attribute equals the make name text itself
  (e.g. `<option value=" BMW 5251"> BMW 5251</option>`), not an opaque
  numeric code — so this is genuinely free-text vehicle-make data, not a
  reference-table ID. The raw list carries visible data-quality noise: stray
  leading/trailing whitespace and literal tab characters (`&#x9;`) baked
  into several values (e.g. `" 100&#x9;"`), and outright duplicate entries
  (e.g. `"YAMAHA"` appears 10 times, `"BLUE/BIRD"` 6 times). This is a
  genuine artifact of FRSC's own live reference data, not introduced by
  this schema. Modeled as `type: "string"` with a documented note in the
  field's own `description`, per the issue's guidance not to enumerate
  ~1,569 options.
- **`ownerLgaId`** (Local Government): 780 `<option>` entries. Nigeria has
  774 LGAs by common count; the live select's 780 entries likely reflect a
  few additional non-LGA administrative entries FRSC's own reference table
  includes (not independently reconciled against an authoritative federal
  LGA list this cycle — disclosed as unverified). The static page load
  renders **all** 780 at once rather than scoping to a single state (no
  visible AJAX re-population tied to `ownerStateId` in the raw HTML;
  whether the live site re-fetches a filtered list client-side after a
  state is chosen was not executed/confirmed). Modeled as `type: "string"`
  with a documented note, per the issue's guidance not to enumerate ~780
  options; the field's own description flags that valid values are
  state-dependent within FRSC's live reference data.

## Required-field derivation

Requiredness follows the source's own `data-val-required` attribute,
field-by-field — not a blanket assumption. Fields carrying
`data-val-required` on the live page: `CategoryId`, `SubCategoryId`,
`VehicleMakeId`, `Model`, `FuelType`, `YearOfManufacture`,
`VehicleTypeId`, `ChasisNo` (also `data-val-length-min="15"`/
`data-val-length-max="17"`), `EngineCapacityId`, `TankCapacity`,
`IdentificationNo`, `City`, `MobileNo`, `StateId`, `Lgaid`, and the
`FancyCheck` checkbox (see the disclosed override below). That is 15
`required: true` fields (14 plus the disclosed override on `FancyCheck`,
which nets back out — see below).

Two disclosed judgment calls diverge from a literal mechanical read of
`data-val-required`:

- **`requestFancyNumberPlate` (the `FancyCheck` checkbox) carries
  `data-val-required` on the live page, but this is modeled
  `required: false`.** The page also renders a paired hidden input,
  `<input name="VehicleInfoModel.FancyCheck" type="hidden" value="false">`
  — the standard ASP.NET `Html.CheckBoxFor()` output for a non-nullable
  `bool` model property, which always lets an unchecked box submit a
  valid, well-formed `false`. The `data-val-required` attribute here is
  MVC scaffolding boilerplate (it is generated automatically for any
  non-nullable `bool` property, regardless of whether the checkbox is
  actually meant to be mandatory), not a genuine "you must check this"
  business rule. Modeling it as `required: false` is a disclosed judgment
  call overriding the raw attribute, not a blind mechanical read.
- **Fields the prior scouting summary assumed required, but which carry no
  `data-val-required` attribute on the live page, are modeled
  `required: false`**: `ownerIdentificationTypeId` (`OwnersTypeId`),
  `ownerTitle` (`Title`), `ownerFirstName`/`ownerLastName`/
  `ownerCompanyName`, and `plateNumberStateId`
  (`PlateNoStateId` — contrast `ownerStateId`/`StateId`, which *does*
  carry the attribute). This is a straightforward, disclosed deviation
  from the prior summary rather than an interpretive call.

## Other disclosed judgment calls

- **`ownerTitle` — confirmed live source defect.** The `Title` dropdown
  visually offers 14 options: Mr., Miss, Ms, Mrs., Dr., Prof., Engr.,
  Chief, Rev., Alhaji, Alhaja, Imam, Pastor, Engineer. Reading the raw
  HTML: the last five (`Alhaji.`, `Alhaja.`, `Imam.`, `Pastor.`,
  `Engineer.`) each render as `<option value="Rev.">Alhaji. </option>`,
  `<option value="Rev.">Alhaja. </option>`, etc. — their `value` attribute
  is the literal string `"Rev."`, identical to the separately-labeled
  `<option value="Rev.">Rev. </option>` immediately before them. A live
  form submission choosing "Alhaji" from the dropdown would actually POST
  `Title=Rev.`, indistinguishable server-side from choosing "Rev.",
  "Alhaja", "Imam", "Pastor", or "Engineer". This schema's `ownerTitle`
  enum models the 9 genuinely distinct submittable values (`Mr.`, `Miss`,
  `Ms`, `Mrs.`, `Dr.`, `Prof.`, `Engr.`, `Chief`, `Rev.`) rather than
  fabricating 14 separately-submittable values the live site cannot
  actually produce. Disclosed in the field's own `description` as well.
- **`ownerFirstName`/`ownerLastName`/`ownerCompanyName` individual-vs-
  company inference.** The Owner Information panel wraps Title/First
  Name/Last Name in a container `<div id="identitywithInfo">` and Company
  Name in a separate `<div id="identitycompanyName">`, structurally
  suggesting the page's own client-side script toggles between them based
  on `ownerIdentificationTypeId` (individual identity types vs. "Company
  RC Number"). This inference was **not** confirmed by executing the
  page's JavaScript this cycle (no browser session was driven against the
  live site — the field list was read from the static HTML only). Since
  none of the three fields carry `data-val-required` regardless, and the
  toggle condition itself is unconfirmed, all three are modeled
  `required: false` with the inference disclosed in each field's own
  `description` rather than an asserted `requiredWhen` this document
  cannot attribute to confirmed behavior.
- **`fancyPlateNumber` visibility/requiredness inference.** The "Request
  Fancy Number?" text input + "Check Available" button sit in a container
  `<div id="IsfancyCheck">`, strongly suggesting it is shown only once
  `requestFancyNumberPlate` is checked. Modeled with `visibleWhen`/
  `requiredWhen: { field: "requestFancyNumberPlate", equals: true }` on
  that basis — disclosed as inferred from the container's own naming, not
  confirmed by executing client-side script.
- **`vehicleSubCategoryId` is a cascading, AJAX-populated dropdown.** The
  live page renders `<select id="vehicleSubCategoryId" ...>` with only its
  placeholder `<option>` — its real option set is populated client-side
  once a Vehicle Category is chosen, and was not independently enumerated
  this cycle (no browser session was driven to trigger the AJAX call).
  Modeled as a required opaque `string` rather than an unverified enum.
- **`otherVehicleMake` (the "Others" free-text field beside Vehicle
  Make).** No `data-val-required` attribute; modeled optional. Its
  relationship to `vehicleMakeId` (shown when the make is not in the list
  — the make list's own last entry is literally `"OTHERS "`) is disclosed
  in its own `description` without an asserted `visibleWhen`, since the
  exact client-side toggle trigger was not independently confirmed.
- **`ownerEmail` carries no format-validation attribute at all** — no
  HTML5 `type="email"`, no `data-val-email`/`data-val-regex`. Modeled as
  plain `type: "string"` with no `pattern`, faithfully matching the
  source's own (lack of) validation rather than inventing an email-shape
  constraint the live form does not itself enforce.
- **No `documents[]` array.** A full-text grep of the raw HTML for
  `type="file"`, `upload`, and `attach` returned zero matches — this form
  has no file-upload input anywhere. Consistent with the page's own submit
  button reading "Preview" rather than "Submit"/"Register", implying
  supporting-document upload (if any) happens at a later step this
  single-page form does not itself expose.
- **Scope: single-page data-entry form only.** The submit button is
  labeled "Preview" (`<button class="find-car" type="submit">... Preview
  </button>`), implying a further confirmation/payment step beyond this
  page. This schema scopes to the data collected on this page, consistent
  with GOV-3227's own description of the confirmed live source.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/visibleWhen/pattern/minLength/maxLength/enum/range rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran the following fixtures in
`conformance/ng/frsc/vehicle-registration/1.0.0/`:

- `valid-toyota-lagos-individual.json` (an individual owner in Lagos
  registering a used Toyota, National ID Card identification, no fancy
  plate request) — **0 errors**.
- `valid-company-abuja-fancy-plate.json` (a company owner in the FCT
  registering a commercial truck, Company RC Number identification, with
  `requestFancyNumberPlate: true` and a populated `fancyPlateNumber`) —
  **0 errors**.
- `mutation-control-missing-vehicle-category.json` (drops
  `vehicleCategoryId`) — **exactly 1 error**.
- `mutation-control-missing-vehicle-sub-category.json` (drops
  `vehicleSubCategoryId`) — **exactly 1 error**.
- `mutation-control-missing-vehicle-make.json` (drops `vehicleMakeId`) —
  **exactly 1 error**.
- `mutation-control-missing-vehicle-model.json` (drops `vehicleModel`) —
  **exactly 1 error**.
- `mutation-control-missing-fuel-type.json` (drops `fuelType`) —
  **exactly 1 error**.
- `mutation-control-missing-year-of-manufacture.json` (drops
  `yearOfManufacture`) — **exactly 1 error**.
- `mutation-control-invalid-year-of-manufacture-range.json` (sets
  `yearOfManufacture` to `1975`, below the `minimum: 1981` bound) —
  **exactly 1 error**.
- `mutation-control-missing-vehicle-type.json` (drops `vehicleTypeId`) —
  **exactly 1 error**.
- `mutation-control-invalid-chassis-number-length.json` (sets
  `chassisNumber` to a 10-character string, below `minLength: 15`) —
  **exactly 1 error**.
- `mutation-control-missing-engine-capacity.json` (drops
  `engineCapacityId`) — **exactly 1 error**.
- `mutation-control-missing-tank-capacity.json` (drops `tankCapacity`) —
  **exactly 1 error**.
- `mutation-control-missing-identification-number.json` (drops
  `ownerIdentificationNumber`) — **exactly 1 error**.
- `mutation-control-missing-city.json` (drops `ownerCity`) — **exactly 1
  error**.
- `mutation-control-missing-mobile-number.json` (drops
  `ownerMobileNumber`) — **exactly 1 error**.
- `mutation-control-missing-state.json` (drops `ownerStateId`) —
  **exactly 1 error**.
- `mutation-control-missing-lga.json` (drops `ownerLgaId`) — **exactly 1
  error**.
- `mutation-control-fancy-plate-requested-but-number-missing.json` (sets
  `requestFancyNumberPlate: true` but omits `fancyPlateNumber`, exercising
  `requiredWhen`) — **exactly 1 error**.

19 fixtures total (2 valid, 17 mutation-control).

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **491/491** (up from 490/490).
- `node tools/verify-sources.mjs` run clean against the new document's
  source URL.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (491 entries).

## Maturity

`structural-reference`: the source form's own printed field labels,
`data-val-required`/`data-val-length` attributes, and `<option>` legend
values are fully transcribed from the genuine, currently-served live
NVIS page, but no live filing (submitting the form and observing the
resulting "Preview"/payment flow) was attempted. GovSchema is an
independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of the Federal Republic of
Nigeria or the Federal Road Safety Corps.
