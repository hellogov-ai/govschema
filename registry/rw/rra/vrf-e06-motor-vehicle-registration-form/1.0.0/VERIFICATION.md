# Verification record — `rw/rra/vrf-e06-motor-vehicle-registration-form` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2526**. It opens **Rwanda as
GovSchema's 43rd jurisdiction** (confirmed by counting `registry/` directories
before and after — 42 jurisdiction directories before this schema, 43 after),
via the DMV vertical (1 of 6), using the Rwanda Revenue Authority (RRA)'s
Motor Vehicle Registration Form. A prior scouting pass (GOV-2507) had flagged
this form as reachable and cited an HTTP status, byte size, and widget-type
breakdown; **nothing from that prior report was trusted without an
independent re-fetch/re-derivation**, and doing so surfaced one material
correction (the widget-type breakdown) — see "Sources examined" below.

## Sources examined

### Source 1 — the RRA Motor Vehicle Registration Form PDF (`source.url`)

- **URL:** <https://rra.gov.rw/fileadmin/user_upload/mvregistrationform.pdf> —
  a genuine `rra.gov.rw` domain, reached directly with no login/CAPTCHA/WAF
  gate.
- Fetched directly via `curl`: **HTTP 200**, `Content-Type: application/pdf`,
  **191,913 bytes**, `Last-Modified: Mon, 25 Jul 2022 09:16:50 GMT`,
  `sha256: 1c580d7766fb2c7dad73aa627d5e634256e27f1475e104fb8e9728137a3337b7`.
  The byte size matches the prior scouting pass's cited figure exactly — a
  case where the pre-scout held up under independent re-verification.
- `pdfjs-dist`'s `getDocument().promise` confirms a genuine single-page
  AcroForm/XFA PDF (root field `form1[0]`, an Adobe LiveCycle/XFA-authored
  form; `IsAcroFormPresent: true`).

### Source 2 — `pdfjs-dist` structural extraction (own re-derivation)

- `page.getAnnotations()`/`getFieldObjects()` on the form's single page found
  **46 real Widget annotations**: **37 `Tx` (text)**, **5 `Btn`
  (radio button)**, **4 `Sig` (signature)** = 46. **This corrects the prior
  scouting pass's cited breakdown of "42 text, 3 signature, 1
  button/radio"** — the actual composition is 37 text + 4 signature + 1
  radio-button *field object* (whose 5 widget kids carry 5 distinct export
  values, `1`–`5`); the prior pass's total widget count of 46 was exactly
  right, but its per-type tally undercounted signature widgets by 1 and
  overcounted text widgets by 5. This was confirmed by two independent
  passes: `getAnnotations()`'s per-widget `subtype`/`fieldType` tally, and a
  second `getFieldObjects()` pass grouping by fully-qualified field name.
- Nearly every `Tx`/`Sig` widget on this specimen carries its own
  `alternativeText` tooltip (e.g. `"Identity card Number"`, `"Frame No:"`,
  `"Autorised Signature of the owner"`) — an unusually complete set of
  built-in labels for this registry's typical XFA/AcroForm specimen. These
  tooltips were cross-checked, not simply trusted, against a
  `getTextContent()` dump of every printed caption on the page, correlated by
  matching each widget's `rect` and each text item's `transform` x/y
  coordinates to the nearest printed label — the same coordinate-correlation
  technique this registry has used repeatedly for generic/ambiguous AcroForms
  (cf. `dk/skattestyrelsen` GOV-2253, `ng/cac` GOV-2518). Every tooltip
  matched its nearest printed caption; no tooltip was found to be misleading
  or stale.
- The form itself prints five lettered section headings directly on the
  page: **A- OWNER IDENTIFICATION**, **B- REGISTRATION INFORMATION**,
  **C- VEHICLE INFORMATION**, **D- CERTIFICATION**, **E- FOR RRA USE ONLY**.
  Every widget was assigned to a section by its `rect`'s y-coordinate falling
  within that section heading's vertical band on the page.
- **Field-name-reuse finding (verified via `getFieldObjects()`, not merely
  assumed from a naming pattern):** the field
  `form1[0].#subform[0].RadioButtonList[0]` is genuinely **one shared
  AcroForm field object** with **5 widget kids**, spanning **two unrelated
  printed questions**:
  - 3 kids (export values `1`, `2`, `5`) sit in Section C beside the printed
    caption **"Steering Wheel :"** and its own printed options **"Left"**
    (x≈133), **"Right"** (x≈190), **"N/A"** (x≈247) — confirmed by matching
    each radio widget's x-coordinate against the nearest printed option
    label at the same y-band (y≈382–392).
  - 2 kids (export values `3`, `4`) sit in Section B beside the printed
    caption **"Customs Regime"** and its own printed options
    **"Consumption"** (x≈135) and **"Suspension"** (x≈234) — confirmed the
    same way at y-band ≈535–545.
  In an actual PDF viewer, since PDF radio-button widgets sharing one
  fully-qualified field name are mutually exclusive across their *entire*
  combined kid set (not just within their own printed row), selecting
  "Left"/"Right"/"N/A" for the steering wheel would silently clear whichever
  of "Consumption"/"Suspension" had been selected for the customs regime, and
  vice versa — a genuine authoring defect in the source PDF (most plausibly
  an XFA-authoring artefact where two originally-separate radio groups ended
  up sharing one generated field name), not a rendering artefact. **This
  schema does not preserve that bug**: the two questions are modelled as two
  independent `enum` fields (`steeringWheelPosition`,
  `customsRegime`), since the printed form unambiguously intends two
  independent single-select questions — disclosed here rather than silently
  "fixed" without comment, per the analogous field-name-reuse-across-rows
  precedent from `GOV-2338` (`no/brreg`) and `GOV-2518` (`ng/cac`).
- **28 of the 46 widgets are modelled as `fields[]`** (26 `Tx`-derived fields
  covering Sections A–D, plus 2 `enum` fields derived from the 5 shared radio
  widgets). No widget is silently dropped without explanation.

### Source 3 — Section E ("FOR RRA USE ONLY") and all 4 signature widgets: excluded

- **Section E is entirely office-only** and excluded from `fields[]`: 11 `Tx`
  widgets (`Yellow Plate Number`, `White Plate Number`, `Status`, `Yellow
  Card Number`, `Received`, `Assessment No.`, `Amount Paid`, `By`, `Payment
  Date`, `DOC ID`, `Receipt No`) and 3 `Sig` widgets (two beside a printed
  "Checked By:" caption at y≈181–232, one more beside the "By"/"Payment
  Date"/"Receipt No" row at y≈37–90, plausibly the receiving cashier's
  signature) — all sit strictly below the "E- FOR RRA USE ONLY" heading
  (y<236), confirmed by checking every widget's `rect` y-coordinate against
  that heading's y-position (235.7), the same section-heading-scoping
  technique this registry used for `dk/cpr`'s "udfyldes af kommunen" boxes
  (GOV-2260).
- **The one remaining `Sig` widget — Section D's "Autorised Signature of the
  owner"** — is also excluded from `fields[]`, per this registry's
  established convention of not modelling raw signature capture as a data
  field (GovSchema v0.3's own field `type` enum has no `signature` value;
  cf. `co/runt`'s and `ng/cac`'s identical exclusion of their own
  signature-capture widgets). The certification statement this signature
  accompanies is instead captured as a `documents[]` attestation entry
  (`ownerCertificationAttestation`), per the `ng/cac`
  `directorConsentToActAttestation` precedent.
- Total excluded: 11 (Section E text) + 4 (all signature widgets, 3 office +
  1 applicant) = 15 widgets. 46 widgets − 15 excluded = 31 widgets feeding
  28 logical `fields[]` entries (the 5-widget shared radio field collapses
  to 2 logical enum fields) — reconciles exactly.

## Field inventory and scoping/disclosure decisions

1. **`amountPaidRwf`** sits in the applicant-facing Section B (Registration
   Information), on the same printed row as `registrationDate` and
   `vehicleUsage` — distinct from a second, differently-labelled "Amount
   Paid" `Tx` widget inside Section E (For RRA Use Only), which is excluded.
   Both widgets happen to share the same printed caption text ("Amount
   Paid"); they were told apart by section (y-coordinate), not by name, since
   both instantiate the AcroForm field name `TextField13[0]`
   (office one) vs. `NumericField1[0]` (Section B one) — genuinely distinct
   fields, not a reused name.
2. **`vehicleUsage` and `vehicleType`** are modelled as free-text strings,
   not enums: both are printed as plain, unruled text boxes with no visible
   checkbox/option list anywhere on this one-page specimen (unlike, e.g.,
   `co/runt`'s `vehicleClass`, which has 14 printed checkboxes to read
   option values from).
3. **`consumptionEntryNo`** — the source prints only a bare **"No"** caption
   for this box (`TextField5[5]`), positioned immediately beside
   "Consumption Date". Labelled `consumptionEntryNo` by inference from
   position/context (a customs consumption-entry reference number) rather
   than left as an unhelpful literal "No." — disclosed as an interpretive
   judgment call, not a printed label taken verbatim.
4. **No `requiredWhen` gating was added for the customs/import-specific
   fields** (`invoiceNo`, `dealerTin`, `acquisitionDate`, `consumptionDate`,
   `consumptionEntryNo`, `clearingAgentTin`, `customsRegime`), even though
   they plainly apply only to an imported (vs. domestically-acquired)
   vehicle: this one-page specimen has no boolean/enum field anywhere
   ("is this vehicle imported?") to gate a `requiredWhen` condition on, so
   these are left `required: false` field-by-field with the applicability
   condition disclosed in each field's own `description`, per this
   registry's "spec precision over cleverness" precedent (cf. `ng/cac`'s
   Section D/D1 secretary disclosure, `se/skatteverket`'s dual-address
   disclosure).
5. **`steeringWheelPosition`/`customsRegime` field-name-reuse defect** — see
   Source 2 above for the full finding; both are modelled as independent
   `enum` fields with the underlying PDF's shared-field defect disclosed
   rather than preserved.
6. **Two of the five radio export values (`1`=Left, `2`=Right, `5`=N/A) map
   to `steeringWheelPosition`'s `["left", "right", "na"]`; the other two
   (`4`=Consumption, `3`=Suspension) map to `customsRegime`'s
   `["consumption", "suspension"]`** — verified by the coordinate
   correlation in Source 2, not assumed from export-value numbering order
   (which is not sequential per question: Left=1, Right=2, Suspension=3,
   Consumption=4, N/A=5).
7. **`documents[]`** has exactly one entry: `ownerCertificationAttestation`,
   category `attestation`, `required: true`, carrying the certification
   statement printed verbatim in Section D ("I certify that the information
   provided above is true and correct in accordance with the Motor Vehicle
   Law articles discussing the registration of Motor Vehicle and that I'm an
   authorized representative of the vehicle's owner."). This specimen has no
   separate supporting-document notes page (unlike, e.g., `ng/cac`'s page 4
   Notes), so no `identity-document`/`supporting-evidence` entries are
   modelled — not a silent omission, there is simply no such instruction
   printed anywhere on this one-page form.
8. **No `exclusivityGroups`** are modelled: unlike `ng/cac`'s independently-
   checkable Btn triplet, this form's only multi-option selectors are the
   two genuine (if defectively-shared) native radio-button groups, each
   already expressed as a single closed `enum` field, which is
   inherently mutually-exclusive by construction — no separate
   `exclusivityGroups` entry is needed.

## Rwanda's other 5 verticals — re-checked this cycle, not merely re-cited

Per the prior scouting note (GOV-2507, "NG/RW scouted"), Rwanda's other
verticals were flagged as routing through the login/payment-gated IremboGov
one-stop portal. This cycle's own re-check via live web search:

- **Business Formation** — confirmed dead end. Business registration is
  performed by RDB's Office of the Registrar General, exclusively online via
  `businessprocedures.rdb.rw`/`org.rdb.rw`/IremboGov, requiring a mobile-
  number-linked account (OTP login) — no standalone fillable PDF form was
  found.
- **National ID** — confirmed dead end. NIDA's own support documentation
  ("How to Apply for a National ID", "Frequently Asked Questions About
  National ID Application") directs all applicants to IremboGov's online
  application flow; no fillable PDF equivalent was found.
- **Passport** — confirmed dead end. NIDA/Directorate General of
  Immigration and Emigration guidance states e-passport applications are
  "completed and submitted online through the Irembo Portal only", with a
  National ID as a prerequisite — no fillable PDF equivalent.
- **Taxes** — confirmed dead end (distinct from the DMV form, which is also
  an RRA form but for a different tax-administration function). RRA's own
  site states its published income-tax "forms are just samples"; actual
  declaration forms are obtained in person at RRA offices or filed through
  RRA's own login-gated online declaration service — no standalone
  applicant-fillable PDF.
- **Visa** — **not a clean dead end; flagged as an unresolved candidate for
  a future cycle rather than force-fitted into this cycle's schema.** Two
  PDF candidates surfaced (a Rwandan-embassy-in-UK mirror, Last-Modified
  2021-03-22, and an RDB-hosted "Proposed New visa application form",
  Last-Modified 2013-11-14) both returned HTTP 200 with `Content-Type:
  application/pdf`. Neither was verified this cycle for AcroForm field
  content, and Rwanda's Directorate General of Immigration and Emigration's
  own current support article is titled "How to Apply for a Visa on
  IremboGov", directing applicants to the same online portal as the other
  verticals — suggesting these PDFs are likely stale embassy-consular
  mirrors of a superseded paper process rather than the current live form,
  but this was not conclusively confirmed either way. Disclosed honestly as
  unresolved rather than asserted as either a confirmed live source or a
  confirmed dead end.

## Test run

No live submission was attempted — this is a structural-reference specimen,
completed at (or submitted to) an RRA counter, not a self-service API
GovSchema can exercise. Verification here is against the schema's own
structural rules (`tools/validate.mjs`, `tools/validate-ajv.mjs`) plus a
hand-rolled, from-scratch conformance-fixture checker (implementing the
`Condition` grammar directly from `spec/v0.3/SPEC.md` §8.1) exercising both
`fields[]` requiredness/validation and `documents[]` requiredness.

Fixtures under
`conformance/rw/rra/vrf-e06-motor-vehicle-registration-form/1.0.0/`:

| Fixture | Scenario | Expected | Actual |
|---|---|---|---|
| `domestic-vehicle-registration.json` | Valid: domestically-acquired vehicle, no customs/import fields, certification attestation provided | 0 errors | 0 errors |
| `imported-vehicle-registration-with-customs.json` | Valid: imported vehicle with the full customs/clearing-agent block and `customsRegime: "consumption"` filled | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` | Drops `frameNo` from the first valid fixture | 1 error (`MISSING_REQUIRED: frameNo`) | 1 error |
| `mutation-control-enum-violation.json` | Sets `steeringWheelPosition` to `"middle"` (not in `["left","right","na"]`) | 1 error (`ENUM_VIOLATION`) | 1 error |
| `mutation-control-missing-required-document.json` | Empties `documents[]`, dropping `ownerCertificationAttestation` | 1 error (`MISSING_REQUIRED_DOCUMENT`) | 1 error |
| `mutation-control-numeric-range-violation.json` | Sets `yearOfManufacture` to `1899` (below `validation.minimum: 1900`) | 1 error (`RANGE_VIOLATION`) | 1 error |

All 6 fixtures matched their expectation exactly. Both registry validators
pass with 0 errors:

```
$ node tools/validate.mjs
381/381 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
381/381 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`, after `npm ci --include=dev` to ensure `ajv` is
actually installed — this registry's own documented gotcha about a local
`NODE_ENV=production` making a bare `npm ci` skip dev dependencies) and now
includes this document.

## What was NOT fully resolved (disclosed, not silently guessed)

- `vehicleUsage`'s exact intended value space (the form gives no printed
  option list) — modelled as free text rather than an invented enum.
- `consumptionEntryNo`'s exact meaning is inferred from its position next to
  "Consumption Date" rather than from its own (bare "No") printed caption.
- The customs/import-specific fields' applicability is disclosed in prose
  only, since the form has no boolean/enum "is this vehicle imported?"
  field to gate a `requiredWhen` condition on.
- Rwanda's Visa vertical is left as an open, unresolved candidate (not a
  confirmed dead end) for a future research cycle — see above.
