# Verification record — `ca/on/mto/drivers-licence-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official ontario.ca driver's-licence
guidance pages listed below. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `ca/on/mto/drivers-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ontario Ministry of Transportation ("MTO"), delivered
  through ServiceOntario.
- **Primary source:** "Renew your driver's licence" —
  <https://www.ontario.ca/page/renew-drivers-licence> (fetched live,
  2026-07-02) — the online-eligibility gates (full G/M/GM/combination class,
  not cancelled/suspended, no address change in 90 days, no vision/written/
  road test required, no new medical condition, no outstanding fines, no new
  photo/signature needed), the required online identifiers (licence number,
  7-digit trillium number, postal code), the 5-year validity period and $90
  base fee, the temporary-validation-document rule for renewals at/after
  expiry, and the photo requirements (new photo mandatory every 10 years or
  on demand for $35.75).
- **Secondary source (scope boundary, not modelled):** "Renew an expired
  driver's licence" — <https://www.ontario.ca/page/renew-expired-drivers-licence>
  (fetched live, 2026-07-02) — describes a **separate, out-of-scope** path
  for a licence expired long enough to require a vision test (1-3 years),
  vision + written + two road tests (3-10 years), or full reapplication as a
  new driver (over 10 years). Used only to confirm this schema's scope
  boundary (the standard renewal modelled here assumes none of those test
  tiers apply — captured by the `requiresVisionWrittenOrRoadTest` gate,
  which exits the flow rather than attempting to model the test regime).
- **Secondary source (scope boundary, not modelled):** "Renew your G driver's
  licence: 80 years and over" —
  <https://www.ontario.ca/page/renew-g-drivers-licence-80-years-and-over>
  (fetched live, 2026-07-02) — describes a separate, in-person-only, biennial
  program (vision screening or a recent optometrist's report, a cognitive
  clock-drawing screening exercise, mandatory senior-driver education
  material, a $36 fee). Used only to source the `turns80OrOlderAtRenewal`
  eligibility gate, which exits the flow rather than modelling that program.
- **Secondary source (licence class names):** "Driver's licence" —
  <https://www.ontario.ca/page/drivers-licence> (fetched live, 2026-07-02) —
  confirmed the G (car/van/small truck) and M (motorcycle) class names and
  the existence of commercial classes (A, D) and combination classes,
  corroborating the `licenceClass` enum.
- **Field extraction method:** these are prose guidance pages, not a
  fillable form or PDF; field names and enum values were derived from the
  pages' own wording (quoted in each field's `sourceRef`), not extracted
  from a PDF/AcroForm/XFA structure the way the sibling
  `ca/on/registration/business-incorporation` schema was.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "License isn't cancelled or suspended" | `licenceCancelledOrSuspended` |
| "Haven't updated your address within 90 days" / "Recent movers cannot renew online within 90 days" | `addressChangedWithinLast90Days` |
| "Don't require vision, written, or road tests" | `requiresVisionWrittenOrRoadTest` |
| "Have no new medical conditions affecting driving ability" | `hasNewMedicalCondition` |
| "Don't have outstanding fines or penalties" | `hasOutstandingFinesOrPenalties` |
| "If you are not eligible to renew online, or if you need a new photo or signature, visit any ServiceOntario centre"; photo mandatory every 10 years / on demand for $35.75 | `requiresNewPhotoOrSignature` |
| "full licence (G, M or GM class)"; "Combination classes (G1M, G2M, GM1, GM2) can renew online, though only the full portion will be renewed online" | `licenceClass` |
| "An Ontario driver's licence is valid for 5 years"; temporary validation document at/near expiry | `currentLicenceExpiryDate` |
| "Driver's licence number" (Required Documents) | `licenceNumber` |
| "The 7-digit trillium number is printed on the back of your driver's licence" | `trilliumNumber` (validated as exactly 7 digits — the one field-level format this source states precisely) |
| "you'll need to enter your licence number, trillium number, and postal code" | `postalCode` |
| "$90 for a 5-year licence" | `paymentMethod` (fee amount itself intentionally not modelled as authoritative data, consistent with every other schema in this registry) |
| Renewal frequency every 2 years once 80; vision/cognitive screening; in person only | `turns80OrOlderAtRenewal` |

## What is NOT independently confirmed / out of scope

- **The live, authenticated online renewal service itself**
  (services.ontario.ca) was not reachable pre-authentication during this
  authoring pass — unlike the CA business-incorporation schema, which
  extracted an actual PDF form, this schema's field list is drawn entirely
  from the ontario.ca guidance pages' own prose, not a screen-by-screen walk
  of the live service. This is a materially different, weaker sourcing
  posture than a form-derived schema and is the primary reason `status`
  remains `draft` and `maturity.level` is `structural-reference` rather than
  anything higher.
- **`licenceNumber` format.** Third-party (non-official) sources describe a
  15-character structure (a letter derived from surname followed by 14
  digits, allegedly encoding date of birth and sex) commonly rendered as
  `X1234-56789-01234`. This structure is not confirmed against any official
  MTO/ontario.ca publication, and encoding demographic attributes in an
  identifier is exactly the kind of unconfirmed, sensitive claim this
  registry avoids asserting from a weak source (same discipline as
  `numberNameLegalElement` in the sibling business-incorporation schema).
  `licenceNumber` is therefore modelled as an opaque string with only a
  generous length bound (`maxLength: 20`), not a `pattern`. The conformance
  packet's example value uses the commonly-seen dashed format for
  plausibility only, not as an asserted requirement.
- **Accepted card brands for online payment.** The source states the fee
  amount but not which specific card networks the online service accepts;
  `paymentMethod` is therefore a generic `credit_card`/`debit_card` enum
  (unlike `gb/dvla/driving-licence-first-provisional`'s `paymentMethod`,
  whose `debit_or_credit_card` value and accepted networks were both stated
  by its gov.uk source).
- **Fee amounts and prorating.** The $90 base fee and its variation for
  shorter remaining validity periods or the 80+ program's $36 fee are
  mentioned only in prose (a third-party summary reported "variations for
  partial renewal periods or drivers over 76", a figure this review could
  not corroborate against an official MTO fee schedule and does not repeat
  here). Fees are intentionally not modelled as authoritative data,
  consistent with every other schema in this registry.
- **Combined driver's-licence-and-health-card renewal (DLHC).** ontario.ca
  and services.ontario.ca both reference this combined product, but the
  services.ontario.ca product page returned only a client-rendered
  "Loading" placeholder to this review's fetch tooling and no ontario.ca
  guidance page describing its specific fields was found. Out of scope;
  flagged for a future revision with a reviewer able to drive the live,
  JavaScript-rendered page.
- **Sex-designation changes, address changes, and photo/signature updates**
  as their own flows. All three are mentioned on ontario.ca as in-person-only
  services distinct from renewal and are out of scope here, consistent with
  the eligibility-gate design (each has a corresponding boolean gate that
  exits the flow rather than modelling the in-person process itself).
- **G1/G2/M1/M2 learner licences and commercial classes (A, D, etc.)** are
  out of scope; this schema renews only a full G/M/GM licence (or the full
  portion of a combination class).
- **The 80-years-and-over renewal program and the "expired more than the
  online-eligible window" renewal path** are deliberately out of scope, each
  a distinct service per the secondary sources above; both are represented
  only as eligibility gates that exit this flow.

## Scope and jurisdiction notes

- Driver licensing is provincial in Canada, unlike the single-authority
  GB/IE model — matching the catalog candidate's note that this schema pairs
  with `us/ca/dmv/drivers-license-renewal`, `gb/dvla/driving-licence-renewal-photocard`,
  and `ie/dttas/driving-licence-renewal` to show the same process across
  four jurisdictions.
- `steps[0]` ("eligibility") uses GSP-0013's `transitions`/`exitReason`
  branching (the `gb/dvla/driving-licence-first-provisional` precedent):
  every gate field that would route the applicant to an in-person service
  ends the flow with a distinct `exitReason` slug rather than proceeding to
  collect the remaining fields.
- This is the **first** GovSchema DMV schema for Ontario/Canada, closing one
  of the five AU/CA/DE/NZ/SG DMV gaps identified in the GOV-474 cycle (see
  `spec/proposals/` history is not affected; this is a registry-only
  addition). CA DMV is a tier-1 catalog candidate; AU (NSW), DE, NZ, and SG
  DMV renewal candidates remain open.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer drives the live, authenticated
`services.ontario.ca` driver's-licence renewal service with a mock account
(or obtains an official MTO-published field list), confirms the exact
`licenceNumber` format and the accepted online payment card brands noted
above as unconfirmed, and records the outcome here — shipping a new schema
version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
