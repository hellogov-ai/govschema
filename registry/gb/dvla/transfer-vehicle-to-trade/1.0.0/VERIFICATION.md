# Verification record — `gb/dvla/transfer-vehicle-to-trade` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against every screen of the live online service — the service could
only be exercised up to and including vehicle look-up (see "What was directly
observed vs. inferred" below). It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/transfer-vehicle-to-trade` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA).
- **Primary source URL:** <https://www.gov.uk/sold-bought-vehicle> — the GOV.UK
  smart-answer wizard "Tell DVLA you've sold, transferred or bought a vehicle".
  Fetched live (curl, raw HTML, HTTP 200, no block), 2026-07-02, resubmitting
  the wizard's own GET-based `response` parameter down the "sold it" →
  "sold it to a motor trader" branch (the sibling "sold it privately" branch
  is modelled separately in `gb/dvla/vehicle-keeper-change-v5c`, GOV-620).
  The terminal guidance page ("Sold your vehicle into the motor trade") and
  its outbound link to the relevant DVLA digital service were captured
  directly.
- **Online service (motor-trade path, modelled here):**
  <https://transfer-vehicle-to-trade.service.gov.uk/seller> — "Sold a vehicle
  to the motor trade", a DVLA Beta digital service, distinct from
  `change-private-vehicle-sale.service.gov.uk` (used by
  `gb/dvla/vehicle-keeper-change-v5c`) but built on the same shared component
  library (form field names share the `wizard_shared_*` prefix, versus that
  service's `wizard_change_keeper_*`). Fetched live, 2026-07-02, walking the
  flow screen by screen with a real session cookie and CSRF
  `authenticity_token` replayed at each step:
  1. **"Provide trader details"** — unauthenticated start screen. Captured
     the exact `<input>` `name`/`id`/`maxLength` for `traderName`.
     `POST`ed a fabricated trader name ("Acme Motor Traders Ltd") and
     advanced.
  2. **"Find trader's address"** — a genuine UK postcode-lookup screen.
     Captured the exact `<input>` `name`/`id`/`maxLength`/input-mask for the
     house-number and postcode inputs. `POST`ed a real, well-known UK
     postcode (`SW1A 1AA`, Buckingham Palace) and received **five real
     candidate addresses back from DVLA's live address-lookup API**
     (`Buckingham Palace, London, SW1A 1AA` and four sub-addresses at the
     same postcode) — confirming this step calls a genuine third-party
     address API, not a stub.
  3. **"Select trader address"** — selected the first candidate
     (`selected_address_id` query parameter on a plain link, not a form
     `POST`) and advanced.
  4. **"Details of the vehicle being sold"** — captured the exact `<input>`
     `name`/`id`/`maxLength`/input-mask for `vehicleRegistrationNumber` and
     `v5cDocumentReferenceNumber`.
  5. A `POST` with a fabricated registration number (`AB12CDE`) and V5C
     reference number (`12345678901`) was submitted (session cookie + CSRF
     token replayed correctly) to exercise the service end to end, per this
     cycle's "complete a test run with valid example mock data" instruction.
     The service correctly redirected to
     `/seller/dropout/unable-to-find-vehicle`, whose page text confirms it
     validates the pair against DVLA's live vehicle record — **there is no
     public test/sandbox mode**, and this schema does not attempt to guess or
     brute-force a real UK vehicle's registration/V5C pair to progress
     further (that would mean probing a live government record-matching
     system with invented identifiers, which this review treats as out of
     scope for a reference-schema authoring pass regardless of technical
     feasibility).
  - A `capture-trader-email-confirmation` route exists between steps 1 and 2
    in the URL scheme but auto-redirected straight through with no visible
    form on this run (no trader email is collected in this flow — plausibly a
    conditional screen this review's fabricated trader name never triggered).
- **Official form id:** V5C (the vehicle log book itself). The guidance also
  references the log book's yellow "sell, transfer or part-exchange your
  vehicle to the motor trade" perforated section as the paper-channel
  equivalent of this online notification; that section was not independently
  opened or extracted (postal fallback, out of scope — see "Scope" below).
- **Retrieved / reviewed:** 2026-07-02 (all sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was directly observed vs. inferred

| Field | Basis |
|---|---|
| `traderName` | **Directly observed**: exact `<input>` `name`, `id`, `maxLength` from the live, unauthenticated "Provide trader details" screen's HTML. |
| `traderAddressLine1`, `traderAddressTown`, `traderPostcode` | **Directly observed end to end**: the postcode-lookup input's exact `name`/`id`/`maxLength`/input-mask were captured, a real postcode was submitted to DVLA's live address-lookup API, and a genuine resolved address ("Buckingham Palace, London, SW1A 1AA") was returned and selected — a stronger sourcing basis than a guidance-inferred address (contrast `gb/dvla/vehicle-keeper-change-v5c`'s `newKeeperAddress*` fields, which could not be screen-verified because that service's flow reaches its own wall before any address screen). |
| `vehicleRegistrationNumber`, `v5cDocumentReferenceNumber` | **Directly observed**: exact `<input>` `name`, `id`, `maxLength`, and input-mask class from the live "Details of the vehicle being sold" screen's HTML, and exercised end to end with a `POST` that produced the expected live-record-validation rejection. |
| `sellerEmailAddress` | **Inferred, not directly observed as a screen field.** The vehicle-lookup step is the last screen of the online service this review could reach (see above); the wizard's own guidance page for this branch states "You'll be sent: an email confirmation (if you gave your email address)", which requires an email-capture screen to exist somewhere past the point this review reached. This is the schema's weakest sourcing point and the first thing a future revision should firm up once the service can be exercised past vehicle look-up (e.g. with an authorised test vehicle, if DVLA ever publishes one, or via direct confirmation from DVLA). |

**Discrepancy noted, not resolved:** the live rejection page for
`v5cDocumentReferenceNumber` describes the number as coming from the V5C's
yellow "sell, transfer or part-exchange your vehicle to the motor trade"
section, while the field's own on-screen label calls it the general "Latest
V5C registration certificate (logbook) document reference number" (the same
wording used by the private-sale service). Both plausibly refer to the one
document-reference number printed on the current V5C, but this review could
not confirm that with an authorised test vehicle — flagged in the field's
`description` for a future reviewer to resolve.

## Scope and jurisdiction notes

- **Whole of the United Kingdom.** DVLA's vehicle registration function is
  UK-wide; `jurisdiction.country` is `GB` per registry convention for
  `gb/dvla/*` sibling entries.
- **Seller-initiated only.** This schema models the person giving up the
  vehicle notifying DVLA — not the trader's own registration/stock-in steps.
- **Private, person-to-person sale or gift is out of scope.** DVLA runs a
  distinct digital service for that,
  `change-private-vehicle-sale.service.gov.uk`, already modelled as
  `gb/dvla/vehicle-keeper-change-v5c` (GOV-620).
- **The postal, no-log-book fallback is out of scope.** When a seller has no
  V5C to reference, the wizard's guidance directs a paper channel instead
  (perforated yellow section, or a letter to DVLA Swansea with name/address,
  registration number, make and model, exact date of sale, and the trader's
  name/address) — a different (postal) channel, not a description of what the
  online service asks for.
- **Vehicle tax is out of scope.** The guidance states tax is cancelled and
  any refund is calculated automatically once DVLA is notified; no tax-related
  input is collected by this schema (see the already-published
  `gb/dvla/vehicle-tax` for the separate tax process).
- **Scrapyard/insurance/finance-company sales share this same online service**
  per the wizard's own guidance prose ("This includes an insurance company,
  finance company, scrap yard or any car buying service") — modelled as a
  single `traderName` field rather than a separate transaction-type
  distinction, since the guidance draws no functional difference between
  these counterparties for this notification.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live
`transfer-vehicle-to-trade.service.gov.uk` flow using a genuine, authorised UK
vehicle and V5C reference number (the one blocker this cycle could not
clear), confirms or corrects the inferred `sellerEmailAddress` field and the
`v5cDocumentReferenceNumber` discrepancy noted above, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
