# Verification record — `au/nsw/service-nsw/vehicle-registration-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

## Why this schema exists

GOV-960's per-country x per-vertical audit found 7 of this registry's 11
jurisdictions (AU, SG, CA, IE, NZ, IN, NL) had a Drivers-Licence schema but no
Vehicle Registration/Tag/Title schema in the DMV vertical, unlike DE/FR/GB/US
which have both. GOV-968 closed IE's leg (`ie/revenue/vehicle-registration-tax-vrt`,
via a downloadable paper form). `ca/on/mto/vehicle-permit-renewal` remains
blocked (its live wizard requires an already-issued Ontario plate/permit for a
real eligibility lookup). This cycle's own catalog re-audit (GOV-979) confirmed
the remaining gap (AU, SG, CA, NZ, IN, NL) and picked New South Wales as the
next candidate: it already has a published sibling schema from the same
authority (`au/nsw/service-nsw/driver-licence-renewal`), giving this registry a
direct convention (eligibility-gate style, authority naming) to follow.

## Sources examined

- **Document `(id, version)`:** `au/nsw/service-nsw/vehicle-registration-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Transport for NSW (TfNSW), delivered via Service NSW — the
  same authority/delivery-channel split already used for the sibling
  `au/nsw/service-nsw/driver-licence-renewal`.
- **Primary source:** the live `service.nsw.gov.au` "Renew a vehicle
  registration online" guidance page
  (<https://www.service.nsw.gov.au/transaction/renew-a-vehicle-registration>),
  fetched directly as raw HTML via `curl` with a standard desktop user agent,
  2026-07-04. No bot-block was encountered (HTTP 200, full page content).
  There is no downloadable paper form for this process (unlike the VRT/DS-82
  precedents) — Service NSW mails a renewal notice and the transaction is
  online-only or in-person at a service centre.
- **Live transaction walkthrough:** a headless Playwright browser (Chromium,
  desktop user agent) followed the guidance page's "Renew online" link, which
  resolves to `https://registration-renewal.service.nsw.gov.au/find-vehicle`
  — confirmed live, 2026-07-04. Its DOM was inspected directly (not just
  screen-scraped text): exactly one live input field is present, labelled
  "Enter a NSW plate number or billing number" with the helper text "Enter a
  plate number, for example ABC123. Or, enter the 8 digit billing number on
  your renewal notice or Certificate of Registration." A mock plate number
  (`ABC123`) was submitted; the service returned "Registration not found —
  There is no vehicle registration associated with the plate number entered.
  Please check the details and try again." This is a real-time server-side
  lookup against Transport for NSW's registration database, not a generic
  client-side format-validation error — the same class of gate previously
  documented for `ca/on/mto/vehicle-permit-renewal` (Ontario's ServiceOntario
  wizard). No further screens (registration term, CTP, safety inspection,
  payment) could be reached without a real, already-issued NSW plate or
  billing number.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Eligibility — "the vehicle has been unregistered for more than 3 months" | `vehicleUnregisteredOverThreeMonths` |
| Eligibility — "you ordered special number plates... have not received the new plates yet" | `orderedSpecialPlatesNotYetReceived` |
| Eligibility — "the vehicle is registered under the Common Expiry Date (CED) Scheme" | `registeredUnderCommonExpiryDateScheme` |
| Eligibility — "the vehicle is conditionally registered and requires an inspection" | `conditionalRegistrationRequiresInspection` |
| Eligibility — "the vehicle is conditionally registered and requires changes to the operating conditions" | `conditionalRegistrationRequiresOperatingConditionChange` |
| Live `find-vehicle` screen — "Enter a NSW plate number or billing number" (confirmed via headless browser, 2026-07-04) | `vehicleIdentifierOrBillingNumber` |
| Note on conditional registration bundling CTP / auto concessions / no detail changes | `isConditionalRegistration` |
| "What you need" — CTP not required for trailer/caravan/conditional | `vehicleIsTrailerOrCaravan` |
| Introduction — "you may be able to make changes to details like your usage type and the registration term" | `wantsToChangeRegistrationTerm`, `wantsToChangeUsageType` |
| "Registration renewal terms" — 6-month (light, ≤4.5t) vs 3-or-6-month (trailers/heavy, >4.5t) | `registrationTermMonths` |
| Introduction — "If you want to change the term, you must have bought... CTP... for the same term" | `ctpTermMatchesRequestedRegistrationTerm` |
| "Light vehicles and safety inspections" section | `requiresSafetyInspection`, `safetyInspectionReport` document |
| "Payment and fees — How to pay" (BPAY, in-person cash) | `paymentMethod` |
| "Rebates and concessions — Pensioner Concession Card holders" | `pensionerConcessionCardHolder` |
| "More information" — voluntary carbon-offset contribution during renewal | `voluntaryCarbonOffsetContribution` |
| "What you need" — CTP policy (green slip) | `ctpInsurancePolicy` document |

## Honesty flags (deliberate, recorded rather than glossed over)

- **`paymentMethod`'s `card_online` value is an inference, not a directly
  sourced label.** The guidance page's "How to pay" section names BPAY and
  in-person cash explicitly, but does not separately describe the online
  renewal transaction's own card-payment screen (the live transaction itself
  could not be reached past the vehicle-lookup gate — see above). `card_online`
  is included by analogy to every other online vehicle-registration/tax
  renewal already in this registry (e.g. `gb/dvla/vehicle-tax`,
  `us/ca/dmv/vehicle-registration-renewal`), which all take an online card
  payment as their default method. Flagged as inference-by-analogy, the same
  discipline recorded for `ie/revenue/vehicle-registration-tax-vrt`'s `vin`
  length.
- **`wantsToChangeUsageType` has no enumerated usage-type values.** The source
  states only that usage type can be changed during renewal, without naming
  the possible values (e.g. private/business/primary-producer), so this
  schema models the yes/no choice to change it rather than inventing an
  unsourced enumeration.
- **`registrationTermMonths`'s 12-month baseline is inferred, not a quoted
  figure.** The guidance page's "Registration renewal terms" section only
  describes the 6-month and 3-month *alternative* terms; it never states the
  standard/default term length directly on this page. 12 months is modelled
  as the implicit baseline by domain convention (an annual registration is
  the norm this page is describing exceptions to), consistent with how every
  other annual-cycle vehicle process in this registry treats its default
  term.
- **No live transaction beyond the vehicle-lookup screen was reachable.**
  Exactly as recorded for `ca/on/mto/vehicle-permit-renewal`, the real
  server-side lookup at `registration-renewal.service.nsw.gov.au/find-vehicle`
  requires an already-issued NSW plate or billing number that does not exist
  for a fabricated test case. Registration term selection, the CTP/safety
  inspection screens, and the payment screen are transcribed from the
  guidance page's prose, not independently screen-captured — the same
  sourcing shape as `gb/dvla/vehicle-tax` (which also has no downloadable
  form and no independently reachable live wizard).
- **Scope excludes re-registration, CED-scheme handling, conditional
  registrations that need an inspection/condition change, special-plate
  ordering, and the toll-relief rebate**, per the eligibility gates and the
  catalog candidate's own scope note — each is a distinct process requiring
  its own schema.

## Worked example (mock data, not a live submission)

**Scenario:** an individual renewing a standard (non-conditional) passenger
car's 12-month registration online, keeping the same term and usage type, with
CTP already held and no safety inspection required.

| Field | Mock value |
|---|---|
| `vehicleUnregisteredOverThreeMonths` | `false` |
| `orderedSpecialPlatesNotYetReceived` | `false` |
| `registeredUnderCommonExpiryDateScheme` | `false` |
| `conditionalRegistrationRequiresInspection` | `false` |
| `conditionalRegistrationRequiresOperatingConditionChange` | `false` |
| `vehicleIdentifierOrBillingNumber` | `BFG47T` |
| `isConditionalRegistration` | `false` |
| `vehicleIsTrailerOrCaravan` | `false` |
| `wantsToChangeRegistrationTerm` | `false` |
| `wantsToChangeUsageType` | `false` |
| `requiresSafetyInspection` | `false` |
| `paymentMethod` | `card_online` |
| `pensionerConcessionCardHolder` | `false` |
| `voluntaryCarbonOffsetContribution` | `false` |

Walking this data through the modelled `steps[]`: all five
`eligibility_to_renew_online` gates are `false`, so the flow falls through to
`find_vehicle` (no exit triggered) → `registration_details`, where
`registrationTermMonths` and `ctpTermMatchesRequestedRegistrationTerm` are
correctly left unset because `wantsToChangeRegistrationTerm` is `false` →
`safety_inspection` → `payment`, the final step, with `ctpInsurancePolicy`
correctly required in `documents[]` (neither `isConditionalRegistration` nor
`vehicleIsTrailerOrCaravan` is true) and `safetyInspectionReport` correctly
not required. This is a self-consistency check of the schema's own branching
and conditional-requirement logic (also run mechanically — see
`conformance/au/nsw/service-nsw/vehicle-registration-renewal/1.0.0/`), not a
substitute for a live renewal transaction — see the honesty flags above.

## Path to `verified`

1. Obtain a real (or realistically complete) NSW registration renewal notice
   to walk the live `registration-renewal.service.nsw.gov.au` transaction past
   the vehicle-lookup screen and confirm the registration-term, CTP,
   safety-inspection, and payment screens field-by-field.
2. Confirm the online renewal transaction's actual payment-method screen
   (card type, saved-payment-method support) rather than relying on the
   card-payment inference recorded above.
3. Consider a companion schema for re-registering a vehicle unregistered more
   than 3 months, and for the Common Expiry Date (CED) scheme, both explicitly
   out of scope here.
