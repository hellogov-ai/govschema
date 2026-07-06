# Verification record — `ae/rta/vehicle-registration-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from **direct visual reading of RTA's own
screenshot-driven user manual**, fetched directly from `rta.ae` with no
login/CAPTCHA/WAF gate. It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass — several fields in this
document have no legible on-screen label anywhere in the source at any
resolution tried (see "What was inferred" below), making this a weaker
starting point than most `manual-source-review-v1` documents in this
registry, and it is flagged as such.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle ([GOV-1512](../../../../GOV-1512)).
`CATALOG.md`'s own "Known Gaps" section (as of GOV-1474, 2026-07-06) named the
UAE's DMV vertical as its strongest remaining open candidate: "RTA's 'Vehicle
Renewal User Guide' is a strong, field-rich candidate but only confirmed via a
third-party mirror, not the current `rta.ae` URL." This cycle re-searched for
that guide and instead found a different, official, first-party PDF hosted
directly on `rta.ae` itself — RTA's own April-2018 "Renew Vehicle Ownership
User Manual" — resolving the exact provenance gap the prior cycle's note
flagged. This opens the UAE's fourth vertical (DMV), alongside its existing
Taxes, Visa, and National ID & Civic Documents schemas.

## Source examined

- **Document `(id, version)`:** `ae/rta/vehicle-registration-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Roads and Transport Authority (RTA), Dubai, United Arab
  Emirates
- **Primary source URL:** <https://www.rta.ae/links/lic-services/links/Renew-Vehicle-Ownership.pdf>
  ("Renew Vehicle Ownership User Manual", April 2018 — a 20-page PDF: 10
  English pages followed by 10 mirrored Arabic pages of the same content)
- **Also located, not used as primary source:** a longer, more granular
  "Vehicle Renewal User Guide Roads & Transport Authority Version 1.0"
  (23 pages) hosted at `professionallawyer.me/blog/wp-content/uploads/2021/01/Vehicle-Renewal.pdf`
  — this is very likely the same document GOV-1474's own research cycle
  found (its catalog note describes "a 24-page, 68-screenshot 'Vehicle Renewal
  User Guide'"), still only reachable via this third-party mirror, not a live
  `rta.ae` URL, in this cycle's own search as well. The shorter, official,
  first-party `rta.ae`-hosted manual was used instead specifically because it
  resolves the exact provenance weakness the prior cycle flagged, even though
  it documents a narrower/older UI capture with fewer legible field labels —
  see "What was inferred" below for where this trade-off shows up.
- **Located via:** web search for RTA vehicle renewal service guide PDFs,
  cross-checked with `curl -I` against both candidate URLs before download.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access and extraction method

`https://www.rta.ae/links/lic-services/links/Renew-Vehicle-Ownership.pdf`
returned HTTP 200 directly (confirmed via both `curl -I` and a full download,
1.9 MB, `Last-Modified: Thu, 02 Aug 2018`), no login gate, no CAPTCHA, no WAF
block — a materially stronger provenance chain than the third-party-mirror-only
finding of the prior AE DMV screening (GOV-1474).

The PDF carries a genuine (non-scanned) text layer, extracted via
`pdfjs-dist`, but that text layer is **narrative step captions only**
("Click the Confirm button", "Enter your 'Delivery address' details") — the
actual on-screen field labels are legible only inside the manual's embedded
UI screenshots, which the text layer does not reproduce. Each of the 10
English pages was therefore rendered to a high-resolution PNG (`pdfjs-dist` +
`node-canvas`, scale factor 2.5-6.0x depending on the region) and read
visually, cropping to specific screenshot regions at up to 6x native PDF
scale where the base render was still too small to read (the "Delivery
Contact Information" block in particular — see below).

## What was confirmed directly (from the source's embedded screenshots)

- **Step 1 vehicle/fee display**: Model information (plate number, model
  details, vehicle category, expiry), Insurance information (company,
  number, type, valid-until), Vehicle test information (test center, date,
  result), Mortgage Information (name, reference, date), and a Fee Summary
  (Total Service Fees Due, Total Fines Due, Total amount due excluding
  delivery) — all confirmed present, all read-only/system-displayed (see
  "What was deliberately NOT modelled").
- **The exact "Optional extras" wording**: "Would you like to change your
  plate number?" / "Would you like to change your plate design?", each with
  its own registration-fee-cost consequence (an unspecified add-on amount for
  plate number; an explicit "400 AED" for plate design) — both directly
  legible.
- **The exact "Select plate style — Front / Back" structure**: Front offers
  3 radio-selectable thumbnails (confirmed via a 6x-scale crop spanning the
  full row), the third one captioned "(Luxury plate size)"; Back offers 2 —
  confirmed by locating the screenshot's own right-hand border and finding no
  further option beyond it.
- **The exact "Choose delivery method" three-way split** (Courier Delivery
  to your door — 20 AED/package, 7-10 days; Collection from RTA office — no
  fee, ~7 days; Collection from kiosk — no fee, 7-10 days depending on
  kiosk), each fee/timing figure read directly off the Step 9 screenshot.
- **The exact "Delivery Address" field labels and mandatory markers** for the
  courier path: "Contact Name*", "Emirate:*", "Area:*", "Address Line 1*",
  "Address Line 2*", all under the source's own "Fields marked with (*) are
  mandatory" caption — confirmed at 6x scale (`page07_crop_courier.png`
  equivalent render). Both address lines carry an asterisk in this source,
  unlike most renewal schemas elsewhere in this registry where a second
  address line is optional.
- **No date-selection control on the kiosk path**: Step 12's screenshot
  ("Collection from kiosk") shows a kiosk-location pick list, a map, and
  "Delivery Contact Information" only — no delivery/collection date field,
  unlike Steps 10 (courier) and 11 (RTA office), which both show one. This is
  corroborated by Step 9's own kiosk info tile text, "7-10 days depending on
  kiosk" (a range, not a chosen date).
- **A single payment channel**: Step 13's Confirm screen shows only one radio
  option, "E-Payment" — there is no genuine payment-method choice to model
  (see "What was deliberately NOT modelled").
- **The Interim Vehicle Registration Notice and payment receipt** (Steps 14-16)
  are RTA-generated outputs following successful payment, confirmed via their
  own screenshots, not applicant-input data.

## What was inferred (not independently confirmed) and why

1. **`mobileNumber`, `landlineNumber`, `poBoxNumber`, `email`, `confirmEmail`
   — no legible field labels.** The "Delivery Contact Information" block
   (Steps 10, 11, and 12 all show the identical block) displays only
   pre-filled sample values with no visible placeholder/label text at any
   render resolution tried, up to 6x native PDF scale — this is a genuine
   limitation of the source screenshot's own resolution, not a rendering
   artifact (re-confirmed by cropping progressively tighter regions and
   observing the blur does not resolve into legible text). The five fields
   modelled are inferred from the **shape** of the three numeric sample
   values (`0509558138` — a 10-digit UAE mobile number, `05` prefix;
   `026565656` — a 9-digit landline number with a `02` [Dubai] area code;
   `5454` — a short standalone numeric value, inferred as a P.O. Box number
   given UAE addresses' common reliance on P.O. Box delivery) and the two
   adjacent, identically-formatted email-shaped values (inferred as an
   email/confirm-email retype pair). This inference is corroborated,
   independently, by a WebSearch result summarizing this same manual's
   content during this cycle's own research, which paraphrased the block as
   "email address (typed and re-entered)" — but that paraphrase is itself a
   third-party summary, not a second independent visual read, so it is
   corroborating rather than dispositive. **This is the weakest-sourced part
   of this document; a reviewer with a native-resolution or live capture of
   this screen should confirm or correct these five field names and which of
   `required: true` (mobileNumber, email, confirmEmail) vs. `required: false`
   (landlineNumber, poBoxNumber) is actually enforced by the live wizard —
   the source's own "Fields marked with (*) are mandatory" caption is not
   legible next to this specific block, unlike the Delivery Address block
   directly above it.**
2. **`plateStyleFront` / `plateStyleBack` enum values.** The three (Front) and
   two (Back) style thumbnails have no adjacent text captions in the
   source — each is a plate-graphic image only. Values (`bordered_standard`,
   `bilingual_stacked`, `luxury_size`) are this document's own descriptive
   naming of what is visually shown (a black-bordered single-line style; an
   unbordered, two-language stacked style; a physically larger plate for the
   Front-only third option), not verbatim source labels. A reviewer with a
   live render of this screen (where hovering/selecting a thumbnail may
   reveal a tooltip or caption) should confirm or rename these values.
3. **`emirate` enum (7 values).** The dropdown's own rendered option list is
   not visible in the source screenshot (only the placeholder text
   "Emirate:*"). The 7 values used are the United Arab Emirates' complete,
   externally stable, definitionally closed set of emirates (Abu Dhabi,
   Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah) — this is
   treated differently from an assumed application-specific catalog (like
   `area`, `collectionOfficeLocation`, or `kioskLocation` below, all left as
   open strings) because the value set itself is a fixed external fact, not
   something RTA could plausibly define more narrowly or broadly.
4. **`area`, `collectionOfficeLocation`, `kioskLocation` modelled as open
   strings.** Each is a dependent/dynamic pick list (area-per-emirate; the
   RTA office directory; the kiosk directory) shown in the source with only
   one example value each ("Area:*" placeholder only; "Delivery Center -
   Diera Licensing"; "kiosk Deira Customer Service Center") — consistent with
   this registry's existing practice of not inventing an unsourced full
   option list (e.g. `ph/comelec/overseas-voter-registration`'s
   `registeredCityMunicipality`, several `mx/semovi/alta-vehiculo-foraneo`
   dropdowns).
5. **`plateNumber` modelled as an identifying field.** The applicant selects
   an existing vehicle from their authenticated "My Vehicles" list rather
   than typing a plate number into a text box — modelled the same way
   `sg/lta/road-tax-renewal`'s `vehicleRegistrationNumber` is: as the
   identifying value for which vehicle this transaction applies to, even
   though the live UI captures it via selection rather than free text entry.
6. **No repeating/array field type (GSP-0009) needed.** Not applicable — no
   repeating structure was found in the field inventory (a single vehicle,
   single delivery/collection detail block per transaction).

## What was deliberately NOT modelled (and why)

1. **Login and vehicle selection from the "My Vehicles" dashboard** (Steps
   1-4). A pre-existing authenticated RTA account session, not
   renewal-transaction data — consistent with how this registry excludes the
   login/account step elsewhere (e.g. `ae/icp/emirates-id-replacement`'s
   Smart App login).
2. **Vehicle insurance / technical inspection / mortgage-redemption status**
   (the "Insurance information", "Vehicle test information", and "Mortgage
   Information" blocks on the Step 7 screenshot). These are read-only,
   system-displayed from RTA's own vehicle record and checked automatically
   before the "Vehicle Renewal" button is even shown to the applicant — the
   manual's own "Why Can't I Proceed with the Service?" section confirms this
   ("If you have no valid Insurance Details for the selected vehicle" / "no
   valid Test Details") is a gate the system enforces, not a declaration the
   applicant makes in this transaction. This differs from
   `sg/lta/road-tax-renewal`'s modelling of equivalent prerequisites as
   applicant-declared eligibility booleans — that document was authored from
   a guidance page with no UI capture available, so declaration was the only
   modellable proxy; here, an actual screen capture shows these values are
   system-supplied, not applicant-entered, so no corresponding fields are
   modelled.
3. **The broader vehicle-ownership eligibility statement** ("UAE nationals,
   or GCC nationals, or Residency in UAE") from the "Requirements to Renew
   Vehicle Ownership" page. This describes who may hold an RTA account and
   register a vehicle in Dubai at all — an account-level precondition, not a
   field collected during this specific renewal transaction.
4. **The plate-selection sub-flow behind `changePlateNumber`.** Choosing to
   "save your selection plate" cross-references a separate RTA service
   ("Buy Plate"/"Request Plate", visible as menu items on the Licensing
   Services dashboard in Step 4's screenshot) for reserving/purchasing a
   specific plate combination before this renewal transaction. This document
   models only the boolean opt-in and its fee consequence, not that separate
   plate-selection service's own field-by-field flow.
5. **`paymentMethod`.** The Step 13 Confirm/Pay screen shows exactly one
   radio option, "E-Payment" — with no second value to distinguish, modelling
   it as a field would add no information; the fee itself is captured as the
   `renewalFeePayment` document instead.
6. **RTA-generated output documents**: the payment receipt (Step 14, "Your
   payment has been submitted", showing a Request Reference Number) and the
   Interim Vehicle Registration Notice (Step 16, a two-tab
   "Registration Card Replacement" / "Interim License" printable document).
   Both are system-generated confirmations produced after a successful
   transaction, not applicant-submitted input — consistent with how this
   registry excludes generated receipts/certificates elsewhere (e.g.
   `mx/sre/passport-application` excludes the consular office's internal
   processing checklist).

## Path to a `verified` claim (next step)

1. Obtain a live or higher-resolution capture of the "Delivery Contact
   Information" block (Steps 10-12) to confirm or correct the five inferred
   field names/requiredness in item 1 above — this is the single highest-value
   next step for this document.
2. Confirm or rename the `plateStyleFront`/`plateStyleBack` enum values
   (item 2) against a live render, ideally one where hovering/selecting each
   thumbnail reveals a caption.
3. Confirm the `emirate` field's dropdown against a live render (item 3),
   even though the 7-value set itself is not expected to change.
4. Cross-check this document against the longer, more granular
   "Vehicle Renewal User Guide Version 1.0" (23 pages) found at
   `professionallawyer.me` this cycle — if a future cycle locates that guide's
   *own* first-party `rta.ae` URL, re-verify this document against it, since
   it very likely resolves several of the "not legible" gaps above.
5. Confirm RTA has not since revised this service's screen flow (the primary
   source is dated April 2018).

## Mock test run (phase 4)

A throwaway Node script (not committed) built three mock scenarios against
this document's `fields`/`steps`, one per `deliveryMethod` branch, and
checked every populated field against its `type`/`validation` constraint and
every `requiredWhen`-gated field's effective requiredness given each mock's
own answers:

- **Courier scenario**: `deliveryMethod: courier_to_door`, `changePlateDesign:
  true` — correctly required `deliveryDate`, `contactName`, `emirate`, `area`,
  `addressLine1`, `addressLine2`, `plateStyleFront`, `plateStyleBack`; left
  `collectionOfficeLocation`, `collectionDate`, `kioskLocation` not required.
- **RTA office scenario**: `deliveryMethod: rta_office_collection`,
  `changePlateDesign: false` — correctly required `collectionOfficeLocation`,
  `collectionDate`; correctly left `plateStyleFront`/`plateStyleBack` not
  required (changePlateDesign false); correctly left the courier-only address
  fields not required.
- **Kiosk scenario**: `deliveryMethod: kiosk_collection` — correctly required
  `kioskLocation` only, no date field, matching the source's own missing
  date-selection control for this path.

All three scenarios reached the terminal `pay` step with `mobileNumber`,
`email`, and `confirmEmail` (unconditionally required) present and matching
their `pattern` constraints. **Result: PASS**, 19 fields modelled across 5
flow steps, 1 document modelled. This is a data-shape dry run only — it does
not constitute execution of the live system: the live wizard requires an
authenticated RTA account and a real Dubai-registered vehicle to reach any of
these screens, which this cycle deliberately did not attempt to obtain or
use, consistent with this registry's practice of not exercising real citizen
accounts or holding real government resources (the same posture applied to
scarce appointment slots in `ph/dfa/passport-application`,
GOV-1497). See `conformance/ae/rta/vehicle-registration-renewal/1.0.0/` for
the committed mock application packet (the courier scenario).

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06**
(~6 months). Re-check the source, and confirm no structural change to the
live wizard or this manual's field set, on or before that date and on any
`source.url` change.
