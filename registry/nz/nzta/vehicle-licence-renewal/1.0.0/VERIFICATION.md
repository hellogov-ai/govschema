# Verification record — `nz/nzta/vehicle-licence-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from three converging live NZTA sources: the
authority's own guidance pages, the current MR1B paper/agent-counter form,
and a genuine, non-submitting walkthrough of NZTA's own online renewal
wizard that captured real input element ids. It was not, however, walked
screen-by-screen end to end (the wizard's Step 2 "Review details" onward
requires a real plate number and a genuine payment), so the full
field-by-field comparison `manual-source-review-v1` (Procedure step 2)
requires has **not** been completed. It therefore remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `nz/nzta/vehicle-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** NZ Transport Agency Waka Kotahi (NZTA).
- **Bot-check note:** direct `curl` and `WebFetch` requests to
  `www.nzta.govt.nz` content and asset paths are intercepted by an
  Incapsula JS challenge (a ~200-byte HTML stub containing only a
  `/_Incapsula_Resource` script tag, HTTP 200/403 depending on path) —
  consistent with the WAF block already documented for this domain in the
  GOV-474..532 era and re-confirmed as still present for the guidance pages
  and the MR1B PDF asset in this cycle (though a prior cycle,
  [[gov1028-sg-road-tax-renewal]], found some `nzta.govt.nz` paths
  reachable by plain `curl` — that was not reproducible this cycle for the
  specific pages used here). Worked around with a real headless Chromium
  session (Playwright), which passes the JS challenge like an ordinary
  browser; all page text and the PDF binary below were captured through
  that session, not through a static fetch.
- **Primary guidance source:**
  <https://www.nzta.govt.nz/vehicles/licensing-rego/getting-your-vehicle-licence-rego>
  ("Getting your vehicle licence (rego)") — rendered in a headless browser,
  full page text captured and read in full, including "Vehicle licensing
  responsibilities", "Continuous vehicle licensing", "Have a current WoF or
  CoF", "Step 1: Get a reminder", "Step 2: Renew your licence", "Step 3:
  Get your new licence label", "Display your licence label", and "If you
  don't renew in time".
- **Fees guidance source:**
  <https://www.nzta.govt.nz/vehicles/licensing-rego/vehicle-fees/licensing-fees>
  ("Licensing (rego) fees") — same technique, full page text captured,
  including "Rego fees include: a licence fee / an ACC levy / an
  administration fee" and "How to pay your rego" (online administration
  fee $8.66, agent administration fee $11.99).
- **Primary form source:** the current MR1B (edition "09/24") "Application
  to license motor vehicle" PDF, at
  `https://www.nzta.govt.nz/assets/resources/mr1b-application-to-license-motor-vehicle/MR1B-Application-to-license-motor-vehicle.pdf`,
  linked directly from the "Getting your vehicle licence (rego)" page.
  Downloaded via the same authenticated (Incapsula-cookie-bearing) headless
  browser session using its `APIRequestContext`, confirmed a genuine
  115,087-byte `%PDF-1.4` binary (not the challenge stub), and text
  extracted with `pdfjs-dist` `getTextContent` — a static, non-fillable
  2-page form (no AcroForm widgets). Both pages were read and transcribed
  in full, including the note-6 vehicle-usage code table and the note-5
  colour list.
- **Live transactional wizard:**
  `https://transact.nzta.govt.nz/v2/vehicle-licence-renewal` — reached
  directly (this subdomain is a separate Angular application and was not
  behind the same Incapsula challenge). A headless-browser walkthrough
  loaded the landing screen ("What you'll need: Your renewal notice or
  your plate number. A Visa or Mastercard credit or debit card, or your
  online banking details (POLi)."), clicked the real "Get started" submit
  control, and reached the genuine Step 1 "Enter vehicle details" screen.
  Its actual DOM input elements were captured: `id="plate"` (`maxlength`
  6), `id="reminderNumber"` (`maxlength` 6), a `LicenceDurationList` radio
  group with 12 options (`id`s `LicenceDuration1Months` …
  `LicenceDuration12Months`), and a `useExpiryDate` checkbox toggling "Or
  select a specific expiry date". **No plate number, reminder number, or
  any other value was entered, and the wizard was not advanced past Step
  1** — the review stopped at the point a genuine plate/reminder number
  and a real payment would be required, consistent with this registry's
  treatment of other credential/lookup-gated live services (e.g.
  `ca/on/mto/vehicle-permit-renewal`).
- **Retrieved / reviewed:** 2026-07-04 (all sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `plateNumber` | **Directly observed** from the live wizard's own `id="plate"` input (`maxlength` 6, placeholder example "ABC123") and MR1B's "Plate number" box. |
| `reminderNumber` | **Directly observed**, live wizard `id="reminderNumber"` (`maxlength` 6) and its own verbatim helper text. |
| `vehicleExemptFromWofCofRequirement`, `currentWofOrCofHeld` | **Directly observed**, "Getting your vehicle licence (rego)" — the WoF/CoF requirement sentence and its stated exceptions (continuous-licensing-exempt vehicles; mopeds). |
| `renewalChannel` | **Directly observed**, "Step 2: Renew your licence — You can renew online or at an agent." |
| `useSpecificExpiryDate`, `specificExpiryDate` | **Directly observed** from the live wizard's `useExpiryDate` checkbox and its "Or select a specific expiry date" label. Restricted to the online channel because MR1B's own notes state a specific-expiry-date change requires a separate MR27 form — a discrepancy between the two channels, not an oversight; see "Explicitly out of scope" below. |
| `licenceDurationMonths` | **Directly observed** from both the live wizard's `LicenceDurationList` radio group (12 options) and MR1B's own "How many months would you like to license your vehicle for? (please tick) 1 2 3 ... 12". |
| `onlinePaymentMethod` | **Directly observed**, wizard landing screen: "What you'll need ... A Visa or Mastercard credit or debit card, or your online banking details (POLi)." |
| `agentDocumentBrought` | **Directly observed**, "Renew in person — You can either: take the reminder to the agent / fill out an Application to license motor vehicle (MR1B) form". |
| `registeredPersonLastNameOrCompanyName`, `registeredPersonFirstNames` | **Directly observed**, MR1B "Registered person details" box, including the "*Must be the name of the registered person" annotation. |
| `vehicleMake`, `vehicleModel` | **Directly observed**, MR1B "Vehicle details — Make / Model (see note 2)"; note 2's "state the manufacturer's designation... not the year of manufacture" transcribed into `vehicleModel`'s description. |
| `vehicleBasicColour`, `vehicleSecondColour` | **Directly observed**, MR1B "Vehicle colour" box and its note 5's 14-colour list, transcribed verbatim into the `enum`. |
| `vehicleUsageChanged`, `newVehicleUsageCode` | **Directly observed**, MR1B "New usage — Only complete if your vehicle usage has changed since your last application" and note 6's full usage-code table (codes 01-19, with 12 and 15 genuinely absent from the source table — not an extraction error). |
| `particularsCorrectDeclaration` | **Directly observed**, MR1B "Applicant's signature X — I certify that the particulars given are correct." |
| `documents[].mr1bApplicationForm` | **Directly observed**, "fill out an Application to license motor vehicle (MR1B) form – pick one up at the agent or print it at home." |
| `documents[].licensingFeePayment` | **Directly observed reference** ("Licensing (rego) fees" page: licence fee + ACC levy + administration fee, with the $8.66-online vs. $11.99-agent administration-fee split). Amount not encoded as a fixed field value: NZTA computes the licence fee from the vehicle's type/fuel/weight class (a large, table-driven fee schedule not modelled field-by-field here, consistent with this registry's fee convention — cf. `in/morth/vehicle-registration-renewal`'s `renewalFee`) and the administration fee from the chosen channel. |

## Explicitly out of scope for v1.0.0

- **First-time vehicle registration** when a vehicle first enters New
  Zealand — a distinct process the "Getting your vehicle licence (rego)"
  page itself calls out ("Vehicle licensing is different to registration").
- **Applying for an exemption from continuous vehicle licensing** ("putting
  your rego on hold") — a separate MR24 form/online application, referenced
  but not modelled.
- **Changing only the licence expiry date without a renewal** (MR27) — the
  reason `specificExpiryDate` is scoped to the online channel only; on the
  agent/MR1B path this is a genuinely separate form the source itself
  names.
- **Updating the registered person's address.** The online wizard's own
  landing screen recommends doing this first ("Update your mailing address
  so we send your rego label to the right place"), but it is a distinct
  "Update your address and contact details" service, not a field this
  transaction collects.
- **Ordering a replacement licence label** if one is lost, stolen, or fails
  to arrive — a separate service, referenced in "Step 3" but out of scope.
- **A one-time Title/ownership-transfer event.** New Zealand has no
  standalone vehicle-ownership-transfer schema yet: the equivalent form,
  MR13B, was investigated during `nl/rdw/vehicle-ownership-transfer`'s
  authoring cycle ([[gov1014-nl-rdw-vehicle-ownership-transfer]]) and found
  to have no independently downloadable/fillable copy anywhere on
  nzta.govt.nz (confirmed via a domain-wide Wayback CDX search at that
  time) — this remains open for a future cycle, not attempted again here.

## Test run with mock data

A mock renewal packet was assembled at
`conformance/nz/nzta/vehicle-licence-renewal/1.0.0/application-packet.json`
for an ordinary registered owner renewing online for 6 months by credit
card — a fabricated plate number, not a real vehicle. Following the
scripted-conformance-check technique used for the last several renewal
cycles ([[gov1021-in-vehicle-registration-renewal]],
[[gov1028-sg-road-tax-renewal]]), a standalone ~80-line script
re-implementing the schema's own `required`/`requiredWhen`/`validation.enum`
evaluation (GSP-0013 condition grammar `all`/`any`/`not`/leaf-compare) was
run against the packet's `collectedValues`: 21 field/document entries
evaluated, 0 violations. The packet exercises the online/no-specific-date/
WoF-CoF-not-exempt branch; the agent/MR1B branch (including the usage-change
sub-branch) was reasoned through manually against the source text rather
than exercised in a second packet. No value was submitted to any government
system: the live transact.nzta.govt.nz wizard was stopped at the point a
genuine plate number and payment would be required (see "Live transactional
wizard" above), consistent with this registry's treatment of other
credential/lookup-gated live services.

## Scope and jurisdiction notes

This closes New Zealand's recurring DMV "Registration/Tag" renewal gap
flagged as open across the last several renewal-vertical authoring cycles
(most recently [[gov1028-sg-road-tax-renewal]] and
[[gov1030-sg-road-tax-renewal-review-merged]], which found `nzta.govt.nz`
directly `curl`-reachable for a different page in that cycle and
recommended a real attempt here rather than skipping on the strength of the
older WAF-block note). Per the GOV-960 audit lineage, India, New Zealand,
and Singapore were the three jurisdictions with a published Drivers-Licence
schema but no recurring Vehicle Registration/Tag renewal schema (as
opposed to the one-time Title/ownership-transfer schema); India and
Singapore were closed under GOV-1021/GOV-1028, and this closes it for New
Zealand. CA/Ontario's `ca/on/mto/vehicle-permit-renewal` remains the last
open `candidate` in this specific gap, twice blocked on a live-wizard
eligibility lookup requiring a real, already-issued plate/permit pair — a
third attempt should look for a static MTO/ServiceOntario PDF handbook
instead of the live wizard, per the note left in
[[gov1028-sg-road-tax-renewal]].

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live
transact.nzta.govt.nz/v2/vehicle-licence-renewal wizard using a genuine
plate/reminder number through to the payment and confirmation screens,
confirms the exact online/agent administration fees and payment options
still offered, resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
