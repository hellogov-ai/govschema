# Verification record — `lk/dmt/application-for-a-revenue-licence-for-a-motor-vehicle` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2781**, opening **Sri
Lanka's DMV vertical (3 of 6)**, following Passport
(`lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate`,
GOV-2716, 47th jurisdiction) and National ID & Civic Documents
(`lk/drp/application-for-a-national-identity-card`, GOV-2753).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i lk-dmt` and `git log --all --oneline | grep
-i "lk/dmt"` before starting — neither found an existing `lk/dmt` branch,
commit, or PR. Also searched the Paperclip board for any open issue
mentioning "Sri Lanka" — none found, so no reconciliation was needed this
cycle.

## Screening: Sri Lanka's four remaining open verticals (DMV, Business
Formation, Taxes, Visa)

Scouted all four in parallel this cycle (four independent subagents, real
WebSearch + `curl`/`WebFetch`, no isolation needed since research-only):

- **DMV — strong, authored (this document).** See below.
- **Business Formation — weak, not authored.** The national company
  incorporation process (Companies Act No. 7/2007, via the Registrar of
  Companies, `drc.gov.lk`) is now **login-gated**: DRC's own forms page
  states "Please Use eROC System Generated Forms for Form 1 and Form 5" — no
  static incorporation-application PDF exists. A genuine unauthenticated PDF
  was found for business-*name* registration instead
  (`bnr.wp.gov.lk/sin/wp-content/uploads/2023/09/application-Thani.pdf`, Form
  BNR-01, Western Province, ~15 fields, scanned/flat 3-page PDF), but it is
  a **provincial** (Western Province only, not national) form — left as
  disclosed backlog for a future cycle rather than authored now, since a
  national-level candidate should be preferred where the choice exists.
- **Taxes — confirmed dead end.** IRD's current Individual Income Tax
  Return (`ird.gov.lk`, `Asmt_IIT_001_2025_2026_E.pdf`, year of assessment
  2025/2026, confirmed current and unauthenticated) states on its own
  printed text: "Filling of tax returns electronically is mandatory for
  every person," with no paper-filing exception found for any taxpayer
  category (checked the corporate/CIT and partnership/PIT IRD forms too —
  same mandatory-e-filing language on each). Actual submission is only
  through the IRD's login-gated RAMIS e-Services portal. Logged as a
  confirmed dead end under this registry's e-filing-mandatory precedent
  (same reasoning as several other jurisdictions' Taxes dead ends).
- **Visa — strong, not authored this cycle, left as backlog.** The
  Department of Immigration & Emigration's "Entry Visa" (Form B, Regulations
  6, `immigration.gov.lk/content/files/visa/entry_visit_visa.pdf`, HTTP 200,
  359,721 bytes) is confirmed current and not superseded by the ETA online
  system (which coexists as a separate free-of-charge channel for 40
  countries and has no downloadable static form of its own). ~45-55 fields
  across 4 applicant-facing pages (flat/scanned, vector-drawn digit-box
  grids, no AcroForm). Left open as the strongest ready-to-author backlog
  item for Sri Lanka's Visa vertical in a future cycle, since only one
  vertical was authored this cycle per the registry's usual pacing.

DMV was selected as this cycle's authored vertical: it is the vertical
listed first in the GOV-2781 brief's own priority order, and its strongest
candidate (below) is a clean, national-level, first-party source with a
moderate, well-defined field count.

## Source verification — independently re-fetched, not trusted from a
subagent's report alone

- **PDF source:** the Department of Motor Traffic's (DMT) "Application for
  a Revenue Licence for a Motor Vehicle — Section 30(1)" form, printed
  CMT 11 / M.T.A. 11:
  `https://dmt.gov.lk/images/PDF/Downloads/Forms/mta11_6.pdf`
  — fetched via `curl -sL`:
  - **HTTP 200**, **`Content-Type: application/pdf`**, **100,140 bytes**.
  - **`sha256`:**
    `c24259f9f021b0122bcdcf22138275bee2de9aa0d651cca8fb4e633b284618c4`
    (computed via `sha256sum`), matching the scouting subagent's
    independently reported hash byte-for-byte.
  - A separate `curl -I` confirms `last-modified: Mon, 03 Feb 2025
    11:53:33 GMT` — a relatively recent upload of the currently-linked
    edition (not a stale, years-old mirror), and the file is linked from
    DMT's own current Downloads/Forms page
    (`dmt.gov.lk/index.php?option=com_content&view=article&id=17&Itemid=133&lang=en`).
  - Domain `dmt.gov.lk` (Department of Motor Traffic) is the correct,
    official first-party national agency for Sri Lankan vehicle
    registration/licensing.
  - A sibling form (MTA 6/8, ownership-transfer/change-of-possession) was
    also fetched and considered
    (`dmt.gov.lk/images/PDF/Downloads/Forms/mta6mta8_5.pdf`, HTTP 200,
    120,799 bytes) but not selected: it is a 5-page multi-copy
    carbon-style form (copies A/A1/B/B1/C/C1) whose repeated-copy layout
    would need more disclosed judgment calls to de-duplicate into a clean
    field set than CMT 11's single-copy, single-page applicant form.

## PDF structure, independently confirmed via `pdfjs-dist`

- **2 pages.** Confirmed via `pdfjs-dist@3` (legacy build):
  `getFieldObjects()` returned **`none`** (no AcroForm fields) on the whole
  document.
- **Extracted the full x/y-positioned text layer** for both pages via
  `getTextContent()`. Page 1 (562 text items) is the applicant-facing
  application: a trilingual (Sinhala/Tamil/English) caption-and-blank-line
  layout, with the canonical field content given in the **English**
  paragraph/labels (Sinhala and Tamil repeat the same content, consistent
  with this registry's own precedent for the sibling `lk/imm`/`lk/drp`
  schemas). Page 2 (544 text items) is **entirely** a Sinhala/Tamil "for use
  in CMT's office / Kachcheri" block: printed licence fee and additional-fine
  blanks, and seven numbered (i-vii) office-verification items (route
  permit, insurance certificate, fitness certificate, private-hire-car
  permit, route/seasonal/temporary bus-service permits), each completed by
  the issuing clerk — confirmed by the page's own heading translating to
  "for use in CMT's office / Kachcheri" and by every item's own text
  describing a permit/certificate the **office** verifies, not a blank the
  applicant fills. Page 2 is excluded from `fields[]` in full, consistent
  with this registry's established convention for office-only content
  (e.g. `rs/mup`'s deciding-authority items, `rs/mfa`'s consular-only
  column).
- **Field-by-field reconciliation:** every field modeled in `fields[]` was
  matched against its exact printed English label and x/y position on page
  1's text-content transcript; the `sourceRef` on each field quotes that
  label. The one printed reference this schema could not resolve —
  "Class of Vehicle (vide Note B)" — points to an explanatory note not
  included anywhere in this 2-page PDF (no "Note A"/"Note B" legend appears
  on either page), so `vehicleClass` is modeled as free text rather than an
  invented enum, consistent with this registry's established convention for
  the same situation (e.g. `rs/mup`'s `vehicleType`/`fuelOrDriveType`).

## Scope: what is modeled as `fields[]`, and what is excluded

**Included** (page 1, applicant-facing, 19 fields): vehicle identification
(`vehicleNumber`, `vehicleClass`, `fuelType`), the licensing-authority
addressee (`licensingAuthorityOffice`), the registered owner's name/address
(`registeredOwnerName`/`registeredOwnerAddress`), the licence year sought
(`licenceYear`), chassis/engine numbers, date of first registration,
passenger-seat count, the vehicle's tare weight broken into its printed
imperial (`tareCwt`/`tareQr`/`tareLbs`) and metric (`tareKg`) components,
tyre type, the delivery preference and conditional delivery address
(`deliveryPreference`/`deliveryAddress`, gated via `requiredWhen` — an
`equals` check against a real enum value, per this registry's documented
`requiredWhen` gotcha, never `notEquals ""` against an optional field), and
the application date.

**Excluded:** page 2 in full (office-only content, see above); the
"Signature of Owner" line itself (a physical wet-signature action, not
structured data — consistent with this registry's convention of modeling
only the surrounding metadata, e.g. `applicationDate`, not the mark itself,
matching e.g. `se/transportstyrelsen`'s own `signatureDate`/`signaturePlace`
precedent of modeling signature *metadata* rather than the signature); the
office-only `Control No.` box on page 1 (labeled "For Office Use Only" in
the printed text itself).

## Documents

`documents[]` models the six supporting documents required for a Revenue
Licence application per the Northern Provincial Council's own published
list (`np.gov.lk/documents-for-revenue-licence/`, page states "updated on
29 Nov 2024") — cited because Sri Lanka's nine **Provincial Councils**, not
DMT itself, are the actual Revenue-Licence-issuing authorities under the
13th Amendment to the Constitution (Provincial Councils Act No. 42 of
1987); DMT's own downloads page (`id=17`) lists only the form, with no
accompanying documents-required list of its own. Independently re-fetched
this page directly (`curl`, HTTP 200) and confirmed its exact text matches
the scouting subagent's own independent citation verbatim:

1. `registrationCertificateOrExtract` — required unconditionally (item 1 of
   the source list; matches CMT-52/MTA-11 or a certified CR photocopy).
2. `previousYearRevenueLicense` — modeled `required: false` (item 2). The
   source page requires this "of the Previous Year" for what is clearly a
   *renewal*, but this form's own page 1 prints no dedicated yes/no gate
   distinguishing a first-time revenue licence (immediately following first
   registration) from a renewal, so this schema does not invent one; left
   optional rather than unconditionally required, disclosed in the entry's
   own `sourceRef`.
3. `validInsurancePolicyCertificate` — required unconditionally (item 3).
4. `validEmissionCertificate` — required unconditionally (item 4), though
   the source states an exemption "(except land vehicle)"; not modeled as
   a `requiredWhen` gate since `vehicleClass` is free text, not an enum
   (same reasoning as the field-level "vide Note B" judgment call above).
5. `fitnessCertificateForCommercialVehicles` — modeled `required: false`
   (item 5), applicable only to specific commercial vehicle classes listed
   on the source page; same free-text-`vehicleClass` reasoning as above.
6. `passengerServicePermitForOmniBus` — modeled `required: false` (item 6),
   applicable only to omnibuses; same reasoning.

One disclosed judgment call, common to items 4-6: a stricter design could
model `vehicleClass` as an `enum` (e.g. `["motor_car", "motor_lorry",
"omni_bus", ...]`) to support proper `requiredWhen` gates on these three
documents. This schema does not do so because the form's own printed text
gives no such enumerated value list (only the "vide Note B" reference,
whose note is not present in this 2-page specimen) — inventing one would
violate this registry's "read directly from the source, never invent an
enum" convention. A future review that locates DMT's "Note B" (e.g. in a
separate circular or the Motor Traffic Act's own vehicle-class schedule)
should reconsider tightening these three documents' gating.

## Field-count note

19 fields is toward the lower end of this registry's typical range for a
DMV-vertical form (contrast `rs/mup`'s 64), which tracks the underlying
form's own genuine simplicity: a Revenue Licence application is a single
annual-tax renewal action referencing an already-registered vehicle, not a
multi-procedure lifecycle document like `rs/mup`'s Obrazac 1. This was
disclosed and cross-checked against the scouting subagent's own independent
field-count estimate ("~15-25 fields, moderate field count") before
authoring, not adjusted to hit any external target.

## Conformance fixtures

Two valid scenarios (0 errors each):
- `valid-renewal-issued-to-applicant.json` — a private motor car,
  `deliveryPreference: issued_to_applicant` (no `deliveryAddress` needed),
  all four unconditionally required documents provided, both conditional
  documents correctly omitted (not a commercial/omnibus vehicle).
- `valid-first-time-omnibus-sent-to-address.json` — an omnibus,
  `deliveryPreference: sent_to_address` with `deliveryAddress` provided,
  exercising both conditional documents (`fitnessCertificateForCommercialVehicles`,
  `passengerServicePermitForOmniBus`) as provided, and
  `previousYearRevenueLicense` correctly omitted (a same-year first
  licence, `dateOfFirstRegistration` matching `licenceYear`).

Seven mutation controls, each raising exactly one error:

```
$ node check.mjs schema.json mutation-control-missing-required-field.json
["chassisNumber: required but missing"]
$ node check.mjs schema.json mutation-control-invalid-enum-value.json
["fuelType: value \"electric\" not in enum [petrol, diesel, kerosene]"]
$ node check.mjs schema.json mutation-control-invalid-type-passenger-seats.json
["passengerSeats: expected type integer, got string (\"five\")"]
$ node check.mjs schema.json mutation-control-invalid-date-format.json
["dateOfFirstRegistration: expected date (YYYY-MM-DD), got \"15/03/2020\""]
$ node check.mjs schema.json mutation-control-value-below-minimum.json
["tareKg: -10 below minimum 0"]
$ node check.mjs schema.json mutation-control-missing-required-document.json
["document validInsurancePolicyCertificate: required but not provided"]
$ node check.mjs schema.json mutation-control-requiredwhen-missing-delivery-address.json
["deliveryAddress: required but missing"]
```

`check.mjs` is a scratch, from-scratch conformance checker (built in `/tmp`,
never committed) that walks `fields[]`/`documents[]`, `required`/
`requiredWhen` (evaluating the shared `condition` grammar's `field`/`equals`/
`notEquals`/`in`/`greaterThan(OrEqual)`/`lessThan(OrEqual)`/`all`/`any`/`not`
shape), `type`, and `validation` (`enum`/`minimum`/`maximum`/`minLength`/
`maxLength`/`pattern`), plus an unknown-field check. All nine fixtures (two
valid, seven mutation controls) were run against it; both valid fixtures
returned `[]` and every mutation control returned an array of exactly one
error string, matching the results above. (First draft of this checker used
a `{field, operator, value}` condition shape by mistake and silently passed
the `requiredWhen` mutation with `[]` — caught by checking the tool's own
output against expectation rather than assuming a checker that runs without
crashing is correct; fixed to the spec's actual `{field, equals: ...}` leaf
shape before trusting any of its other results.)

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against this new schema individually
and pass:

```
$ node tools/validate.mjs registry/lk/dmt/application-for-a-revenue-licence-for-a-motor-vehicle/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/lk/dmt/application-for-a-revenue-licence-for-a-motor-vehicle/1.0.0/schema.json
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

One ajv finding was fixed before this run: four `documents[]` entries
initially carried a `description` property, which the v0.3 `document`
`$def` does not permit (`additionalProperties: false`) — the explanatory
prose was folded into each entry's own `sourceRef` instead.

The scratch `pdfjs-dist`/`canvas` install used for PDF extraction and the
scratch conformance checker were both done in an isolated `/tmp` scratch
directory, never inside `tools/` or `tools/govschema-client/`. Running
`node tools/validate-ajv.mjs` itself required a one-time `npm ci
--include=dev` inside `tools/` (its `ajv`/`ajv-formats` devDependencies were
not yet installed in this worktree) — this registry's documented "local
NODE_ENV=production makes `npm ci` skip ajv" gotcha.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Sri Lanka's **DMV vertical (3 of 6)**. Business Formation, Taxes,
  and Visa remain open: Taxes is a confirmed dead end this cycle
  (e-filing-mandatory, no exception found); Business Formation has only a
  provincial (not national) candidate; Visa has a strong, ready-to-author
  national candidate (Form B entry visa) left as backlog — see the
  screening section above and `CATALOG.md`'s "Known Gaps & Opportunities"
  for the full disclosed record.
- `jurisdiction.level` is `national` — DMT is Sri Lanka's national roads/
  motor-traffic authority and sets the licensing form nationally, even
  though the nine Provincial Councils administer actual issuance
  (mirroring `rs/mup`'s own "nationally uniform form, locally administered"
  precedent).
- `process.type` is `application`, matching the form's own printed title
  ("APPLICATION FOR A REVENUE LICENCE FOR A MOTOR VEHICLE").
- `process.language` is `en` — while the source PDF is trilingual (Sinhala/
  Tamil/English), the canonical field content is legible in English on the
  same specimen, matching `lk/imm`'s and `lk/drp`'s own convention for this
  jurisdiction's bilingual/trilingual forms.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) authoring Sri Lanka's Visa
vertical from the disclosed Form B backlog candidate; (2) locating DMT's
referenced "Note B" (vehicle-class legend) to potentially tighten
`vehicleClass` to an enum and gate the three vehicle-class-dependent
documents accordingly; (3) re-screening Business Formation if DRC ever
publishes a national incorporation form outside the eROC portal, or
revisiting the provincial BNR-01 business-name-registration candidate as a
lower-bar alternative.
