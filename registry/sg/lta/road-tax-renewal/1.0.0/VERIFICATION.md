# Verification record — `sg/lta/road-tax-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the live OneMotoring **guidance
page**, not from a downloadable form or an independently captured screen
flow, because neither exists for this process. The live transactional
"Renew Road Tax" digital service is Singpass-gated with no public test/
sandbox mode, so the full field-by-field comparison `manual-source-review-v1`
(Procedure step 2) requires against a live portal has **not** been
completed. It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `sg/lta/road-tax-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Land Transport Authority (LTA), Singapore.
- **Primary source URL:**
  <https://onemotoring.lta.gov.sg/content/onemotoring/home/owning/ongoing-car-costs/road-tax.html>
  ("Road Tax") — fetched directly with `curl`, HTTP 200, a genuine
  server-rendered page (not a JS SPA shell). Read in full, including the
  "Understanding road tax", "Renewal prerequisites", "Road tax surcharge for
  vehicles over 10 years", "Where to renew your road tax" (the 4 payment
  channels: Online, AXS Services, GIRO, Road Tax Collection Centres), and
  "Late renewal fees" sections.
- **Transactional service checked and found unusable as a direct source:**
  <https://onemotoring.lta.gov.sg/content/onemotoring/home/digitalservices/Renew_Road_Tax.html>
  — fetched directly, HTTP 200, but the response body is only a
  client-side redirect stub ("LTA | Renew Road Tax / redirecting...") into
  a Singpass-authenticated session, consistent with the same Singpass-gating
  already documented for `sg/lta/vehicle-ownership-transfer`.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `vehicleRegistrationNumber` | **Directly observed**, "How to check the road tax amount to pay — You can check how much road tax to pay by entering your Vehicle Registration Number". |
| `isWeekendOffPeakOrRevisedOffPeakCar`, `renewalPeriodMonths` (12-month restriction) | **Directly observed**, verbatim: "For Weekend Cars/Off-Peak Cars/Revised Off-Peak Cars and Heavy Vehicles, there may also be additional prerequisites to meet. The road tax of Weekend Cars/Off-Peak Cars/Revised Off-Peak Cars can only be renewed on a 12-monthly basis." The 12-month restriction itself is recorded only in the field `description` (not a `validation` keyword), since GSP-0013's condition grammar gates `required`/`visible`, not a specific allowed *value* of another field. |
| `isHeavyVehicle` | **Directly observed**, verbatim list of the four heavy-vehicle criteria under "For heavy vehicles". |
| `insuranceCoverageConfirmed` | **Directly observed**, "Renewal prerequisites — Vehicle insurance coverage — Make sure your vehicle is covered by insurance for the entire period you are paying road tax. The vehicle insurance must cover third-party liability for deaths and bodily injury." |
| `vehicleInspectionDue`, `vehicleInspectionPassed` | **Directly observed**, "Vehicle inspection (if one is due) — If your vehicle is due for periodic inspection, you will receive an inspection notice about 3 months before your road tax expires." and the "Pass the required vehicle inspection, if it is due" prerequisite bullet. |
| `noOutstandingFinesConfirmed` | **Directly observed**, "Outstanding fines from LTA, HDB, URA and Traffic Police (TP) — If your vehicle has outstanding fines or warrants from LTA, HDB, URA and TP, it may prevent you from renewing your road tax." |
| `numberPlateSealInspected` | **Directly observed**, "For Weekend Cars / Off Peak Cars / Revised Off Peak Cars — Inspect your vehicle number plate seals at an LTA-Authorised Inspection Centre." |
| `validVehicleParkingCertificate` | **Directly observed**, "For heavy vehicles — Heavy vehicles must have a valid Vehicle Parking Certificate (VPC)." |
| `paymentMethod` | **Directly observed**, "There are 4 different ways to renew your road tax: ... Online / AXS Services / GIRO / Road Tax Collection Centres", corroborated by the "Where to renew your road tax" section's numbered list. |
| `onlinePaymentInstrument` | **Directly observed**, "1. Online at OneMotoring ... You will need: ... A valid credit or debit card (VISA or MasterCard only) or an Internet Banking account with DBS/POSB, OCBC/Plus!, Standard Chartered Bank or UOB (eNETS Debit)." |
| `axsPaymentInstrument` | **Directly observed**, "2. AXS Services ... At AXS Stations, you can pay by: ... For AXS m-Station & e-Station, you can pay by: ..." (all six listed instruments transcribed verbatim into the enum). |
| `documents[].motorInsuranceCertificatePrintout`, `documents[].vehicleInspectionCertificatePrintout` | **Directly observed**, "4. At Road Tax Collection Centres — Meet all renewal prerequisites in advance and bring along the original prerequisite documents. e.g. printout of your motor insurance certificate and vehicle inspection certificate." The inspection-certificate document is additionally gated on `vehicleInspectionDue` being true, since an inspection not due has no certificate to print. |
| `documents[].roadTaxPayment` | **Directly observed reference** (the surcharge table under "Road tax surcharge for vehicles over 10 years" and the four late-renewal-fee tables under "Late renewal fees"); amount not encoded as a fixed field value, since LTA computes the base rate, surcharge, and any late fee automatically from the vehicle's engine capacity, age, and days past expiry — none of which the applicant enters directly in this transaction. |

## Explicitly out of scope for v1.0.0

- **Enrolling in a new GIRO arrangement.** The source describes GIRO
  enrolment as a distinct "How to apply" flow via eGIRO (bank-login-gated,
  with a paper fallback "online form" for ineligible banks/foreign passport
  holders) that, once approved, causes *future* renewals to happen
  automatically without a manual transaction. `paymentMethod: giro` in this
  schema represents renewing via an *already-existing* arrangement (one of
  the source's own "4 ways to renew"), not the enrolment application
  itself.
- **First-time vehicle registration/import** and **road-tax proration on
  sale/deregistration** (transfer-following-the-vehicle and refund on
  deregistration) — both explicitly described on the same page as distinct
  events, not renewals.
- **Computing the exact amount payable.** The surcharge and late-fee tables
  are transcribed into `documents[].roadTaxPayment.sourceRef` for reference
  but not modelled as enterable fields, consistent with this registry's fee
  convention on schemas where a government authority computes the amount
  from data it already holds (cf. `in/morth/vehicle-registration-renewal`'s
  `renewalFee`).

## Test run with mock data

A mock renewal packet was assembled at
`conformance/sg/lta/road-tax-renewal/1.0.0/application-packet.json` for an
ordinary (non-Weekend/Off-Peak, non-heavy) private car renewing for 6
months online by credit/debit card — a fabricated vehicle registration
number, not a real vehicle. Following the scripted-conformance-check
technique introduced for `in/morth/vehicle-registration-renewal`, a small
ad hoc script re-implementing the schema's own `required`/`requiredWhen`/
`eligibleValues`/`validation.enum` evaluation (GSP-0013 condition grammar
`all`/`any`/`not`/leaf-compare) was run against the packet's
`collectedValues`: 16 field/document entries evaluated, 0 violations. The
packet exercises the online/no-inspection-due/ordinary-vehicle branch; the
`axs`, `giro`, and `collection_centre` payment branches, the
Weekend/Off-Peak-Car branch, the heavy-vehicle branch, and the
inspection-due branch were reasoned through manually against the source
text rather than exercised in a second packet. No value was submitted to
any government system: the live OneMotoring "Renew Road Tax" service is a
Singpass-gated transactional portal with no public test/sandbox mode, so —
consistent with this registry's treatment of other credential-gated live
services — this review did not attempt to exercise a live wizard end to
end.

## Scope and jurisdiction notes

This closes Singapore's DMV "Registration/Tag" renewal gap flagged as open
in `in/morth/vehicle-registration-renewal`'s VERIFICATION.md: per the
GOV-960 audit lineage, India, New Zealand, and Singapore were the three
jurisdictions with a published Drivers-Licence schema but no recurring
Vehicle Registration/Tag renewal schema (as opposed to the one-time Title/
ownership-transfer schema, already published for all three). New Zealand
remains open for a future cycle. CA/Ontario's `ca/on/mto/vehicle-permit-renewal`
also remains open, a `candidate` twice blocked on a live-wizard eligibility
lookup requiring a real, already-issued plate/permit pair.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live OneMotoring "Renew Road
Tax" service using a genuine Singpass login and an actual registered
vehicle, confirms the exact AXS/online payment-instrument options still
offered, resolves any discrepancy by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
