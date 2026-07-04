# Verification record — `ie/dttas/motor-tax-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

## Why this schema exists

GOV-960's per-country x per-vertical audit found 7 of this registry's 11
jurisdictions (AU, SG, CA, IE, NZ, IN, NL) had a Drivers-Licence schema but no
Vehicle Registration/Tag/Title schema in the DMV vertical. GOV-968 closed one
leg of IE's gap with `ie/revenue/vehicle-registration-tax-vrt` — but VRT is a
one-time import/first-registration tax, not the recurring annual/periodic
motor tax every Irish vehicle must carry to be used on a public road. This
GOV-993 research cycle's own audit confirmed IE still had no schema for that
recurring renewal (the direct counterpart to `gb/dvla/vehicle-tax`,
`de/kba/vehicle-registration`'s renewal leg, `au/nsw/service-nsw/vehicle-registration-renewal`,
and `us/*/dmv/vehicle-registration-renewal`), and picked Motor Tax Online
(motortax.ie) as the next candidate: it is Ireland's single national online
channel for this process (unlike driving-licence renewal's NDLS-run system),
with live, unauthenticated guidance pages describing exactly what the online
service needs.

## Sources examined

- **Document `(id, version)`:** `ie/dttas/motor-tax-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Transport, whose Driver and Vehicle Computer
  Services Division (DVCSD) maintains the National Vehicle and Driver File;
  motor tax is collected by local authorities' motor tax offices, jointly
  operating Motor Tax Online with the Department (see `authority.operatedBy`,
  GSP-0020).
- **Primary source:** the live `motortax.ie` login page
  (<https://www.motortax.ie/OMT/omt.do>), fetched directly as raw HTML via
  `curl` with a standard desktop user agent, 2026-07-04. No bot-block was
  encountered (HTTP 200, full page content, including the "What do I need to
  tax my vehicle online?" and "What types of vehicle can be taxed online?"
  sections used as the field-level source below).
- **Secondary source:** the Department of Transport's gov.ie publication
  "Motortax: Payments, Renewals and Refund information"
  (<https://www.gov.ie/en/department-of-transport/publications/motortax-payments-renewals-and-refund-information/>),
  fetched directly as raw HTML, 2026-07-04 (HTTP 200; a prior `WebFetch`
  attempt at the same URL returned a tool-level 403, but a direct `curl` with
  a desktop user agent succeeded — the page itself is not authenticated or
  bot-blocked). This is the most detailed public description of the renewal
  process, including the tax-period rules, the commercial-vehicle
  roadworthiness/RF111A prerequisites, and the online "what you need" list.
- **Tertiary source:** citizensinformation.ie's motor tax coverage, found via
  web search (the page itself returned HTTP 403 to direct `WebFetch`; only
  the search-result summary was used, and only for values also independently
  confirmed in the two primary/secondary sources above).
- **Live login attempt:** a fabricated registration number (`12D34567`) and
  PIN (`123456`) were submitted to `motortax.ie/OMT/login.do` (with the
  page's CSRF token and session cookie). The service returned "Details
  Incorrect (please see below) — The combination of registration number and
  PIN entered was not valid" — a real server-side lookup against DVCSD's
  vehicle/PIN records, not a generic client-side format-validation error.
  This is the same class of gate already documented for
  `ca/on/mto/vehicle-permit-renewal` and
  `au/nsw/service-nsw/vehicle-registration-renewal`: no screen beyond login
  (vehicle confirmation, tax-period selection, payment) could be reached
  without an already-issued, real Irish vehicle registration and PIN.
- **Form investigated and excluded:** `RF111` (the downloadable
  "Change of Particulars" form, fetched and text-extracted via `pdfjs-dist`)
  was initially considered as a possible field-level source, since it is the
  only motor-tax PDF form readily downloadable from motortax.ie. On review it
  is a **different service** — notifying a change of name/address, vehicle
  colour, body type, or tax class — not an application to renew tax, and
  none of its fields were used here.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| motortax.ie — "What types of vehicle can be taxed online?" list; gov.ie — "The following tax classes are available for online processing" | `vehicleTaxClass` |
| motortax.ie login page (live) — registration-number field `loginRegNo`, maxlength 11 | `vehicleRegistrationNumber` |
| motortax.ie login page (live) — PIN field `loginPin`; gov.ie — PIN issuance and first-time-taxing VIN exception | `pin` |
| gov.ie — "Motor tax discs are issued for periods of three, six, or 12 whole calendar months... Vehicles with an annual tax of EUR119 or less can only be taxed for a 12-month period" | `taxPeriodMonths` |
| gov.ie — "in the case of light goods vehicles... the owner must have already submitted form RF111A... to the local motor tax office" | `isLightGoodsVehicle`, `lightGoodsDeclarationSubmitted` |
| gov.ie — "Vehicles must have a current roadworthiness certificate" (commercial/goods vehicles renewing online) | `roadworthinessCertificateHeld` |
| motortax.ie login page — "What do I need to tax my vehicle online? ... Email address" | `contactEmailAddress` |
| gov.ie — "your vehicle insurance details (name of insurer, policy number and expiry date)" | `insuranceCompanyName`, `insurancePolicyNumber`, `insurancePolicyExpiryDate` |
| motortax.ie login page / gov.ie — "details of your payment card (Visa or MasterCard)" | `paymentCardType` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **No screen beyond login was independently reached.** As with the Ontario
  and NSW vehicle-registration precedents, the live transaction is gated
  behind a real registration-number/PIN pair. The tax-class list, tax-period
  rules, commercial-vehicle prerequisites, and "what you need" list are
  transcribed from the login page and the Department of Transport's guidance
  publication, not independently screen-captured past login.
- **Whether Motor Tax Online still asks for insurance details is disputed
  between sources.** A third-party blog surfaced during web search claimed
  insurance details are "no longer" required online; the Department of
  Transport's own gov.ie publication (last updated 2025-04-12, more
  authoritative and more recently updated than the blog) explicitly lists
  insurer name, policy number, and expiry date under "What do I need to tax
  my vehicle online?" This schema follows the gov.ie source and models
  insurance as required; a future review should re-check this directly
  against a live, authenticated OMT session if access becomes available.
- **`paymentCardType`'s enum (Visa/MasterCard only) is a direct quote**, not
  an inference — unlike `au/nsw/service-nsw/vehicle-registration-renewal`'s
  analogous field, both sources here name the accepted card brands
  explicitly. Card number, expiry, and CVV are out of scope by design (PCI
  DSS data, not a GovSchema field-collection concern).
- **Scope excludes first-time taxing (RF100/dealer-mediated), change of
  particulars (RF111), off-road declaration (RF150), refunds (RF120), and
  replacement documents (RF134)** — each a distinct motor-tax service named
  in the gov.ie publication but out of scope for a renewal-only schema.

## Worked example (mock data, not a live submission)

**Scenario:** an individual renewing a standard private car's motor tax
online for 12 months, with a current insurance policy and no commercial
(goods) vehicle requirements.

| Field | Mock value |
|---|---|
| `vehicleTaxClass` | `private_car` |
| `vehicleRegistrationNumber` | `12D34567` |
| `pin` | `123456` |
| `isLightGoodsVehicle` | *(not asked — vehicleTaxClass is not goods_vehicle)* |
| `lightGoodsDeclarationSubmitted` | *(not asked)* |
| `roadworthinessCertificateHeld` | *(not asked)* |
| `taxPeriodMonths` | `12` |
| `contactEmailAddress` | `aoife.murphy@example.ie` |
| `insuranceCompanyName` | `Example Insurance Ireland DAC` |
| `insurancePolicyNumber` | `EI-2026-0456789` |
| `insurancePolicyExpiryDate` | `2027-06-30` |
| `paymentCardType` | `visa` |

Walking this data through the modelled `steps[]`: `vehicle_tax_class`'s
transition does not fire (vehicleTaxClass is not `other_not_listed`), so the
flow proceeds to `log_in` → `commercial_vehicle_checks` (all three fields
correctly left unset, since `vehicleTaxClass` is not `goods_vehicle`) →
`tax_period` → `contact_and_insurance` → `payment`, the final step. This is a
self-consistency check of the schema's own branching and conditional-
requirement logic, not a substitute for a live renewal transaction — see the
honesty flags above. See `conformance/ie/dttas/motor-tax-renewal/1.0.0/` for
the machine-readable rendering of this same walkthrough.

## Path to `verified`

1. Obtain a real (or realistically complete) Irish vehicle registration
   number and current PIN to walk the live `motortax.ie` transaction past
   login and confirm the vehicle-confirmation, tax-period, and payment
   screens field-by-field.
2. Independently re-confirm whether the online flow still collects
   insurance details, resolving the disputed-source flag above directly
   against a live, authenticated session.
3. Consider companion schemas for first-time taxing (RF100), change of
   particulars (RF111), the off-road declaration (RF150), and refunds
   (RF120), each explicitly out of scope here.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date and on any `source.url`
change.
