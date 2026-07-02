# Verification record — `gb/dvla/vehicle-keeper-change-v5c` v1.0.0

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
recorded against every screen of the live online service — only its first,
unauthenticated screen was directly observed (see "What was directly observed vs.
inferred" below). It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/vehicle-keeper-change-v5c` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA).
- **Primary source URL:** <https://www.gov.uk/sold-bought-vehicle> — the GOV.UK
  smart-answer wizard "Tell DVLA you've sold, transferred or bought a vehicle".
  Fetched live (curl, raw HTML, HTTP 200, no block), 2026-07-02. **Every branch
  of the wizard was walked** by resubmitting its GET-based `response` parameter:
  - Step 1, "Are you a motor trader?" → `yes` / `no`
  - Step 2 (trader path), "Have you bought or sold a vehicle?" (not pursued
    further — out of scope; motor-trade transactions use a different DVLA
    service, see below)
  - Step 2 (non-trader path), "What have you done with your vehicle?" →
    `sold-it` / `put-it-into-someone-else-s-name...` / `scrapped-it-or-it-s-been-
    written-off` / `bought-it`
  - Step 3 (sold-it path), "Did you sell the vehicle privately, or to a motor
    trader?" → `sold-it-privately-to-a-person-or-business` /
    `sold-it-to-a-motor-trader`
  - Each terminal page's guidance prose and its outbound link to the relevant
    DVLA digital service were captured directly.
- **Online service (private/gift path, modelled here):**
  <https://change-private-vehicle-sale.service.gov.uk/> — "Private sale of a
  vehicle (Keeper to keeper)", a DVLA Beta digital service. Linked from both the
  "Sold your vehicle to a private individual or business" and "Put your vehicle
  into someone else's name" terminal pages of the wizard above (same URL for
  both). Fetched live, 2026-07-02:
  - The unauthenticated start page ("Details of the vehicle being sold") was
    read directly as raw HTML, capturing the exact `<input>` `name`/`id`
    attributes, `maxLength`, and client-side input masks (`alphanumericOnly`,
    `numericOnly`) for `vehicleRegistrationNumber` and
    `v5cDocumentReferenceNumber`.
  - A `POST` with a fabricated registration number (`AB12CDE`) and V5C reference
    number (`12345678901`) was submitted (session cookie + CSRF
    `authenticity_token` captured and replayed correctly) to exercise the
    service end to end, per this cycle's "complete a test run with valid
    example mock data" instruction. The service correctly redirected to
    `/change-keeper/dropout/unable-to-find-vehicle`, whose page text confirms
    it validates the pair against DVLA's live vehicle record — **there is no
    public test/sandbox mode**, and this schema does not attempt to guess or
    brute-force a real UK vehicle's registration/V5C pair to progress further
    (that would mean probing a live government record-matching system with
    invented identifiers, which this review treats as out of scope for a
    reference-schema authoring pass regardless of technical feasibility).
  - `/accessibility?locale=en` was also fetched to confirm the service's own
    name ("Private sale of a vehicle (Keeper to keeper)") and Beta status.
- **Related, out-of-scope DVLA digital service identified during discovery:**
  <https://transfer-vehicle-to-trade.service.gov.uk/seller> — linked from both
  the "sold it to a motor trader" and "scrapped it or it's been written off"
  terminal pages of the wizard. Not fetched beyond confirming the URL; a
  genuinely different DVLA service with its own field set, and a natural
  candidate for a future, separate schema (see "Scope" below).
- **Official form id:** V5C (the vehicle log book itself; also referenced as
  V5C/2 "new keeper supplement" and V5C/3 "notification of sale or transfer of
  a motor vehicle" in DVLA's paper process, per the wizard's guidance text, but
  neither sub-form was independently opened or extracted this cycle — the
  wizard's prose was the source for what each contains).
- **Retrieved / reviewed:** 2026-07-02 (all sources confirmed live at authoring
  time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was directly observed vs. inferred

| Field | Basis |
|---|---|
| `soldToMotorTraderOrGarage` | Directly quoted warning banner on the online service's own start screen. |
| `buyerRegisteringVehicleAbroad` | Directly quoted from the "sold privately" terminal guidance page. |
| `vehicleRegistrationNumber`, `v5cDocumentReferenceNumber` | **Directly observed**: exact `<input>` `name`, `id`, `maxLength`, and input-mask class from the live, unauthenticated start screen's HTML. |
| `transactionType` | Directly inferred from the wizard's own routing: both "sold it" (privately) and "put it into someone else's name" terminal pages link to the *same* online service URL, and the "transfer" page explicitly instructs treating a gift the same as a sale for this purpose. |
| `newKeeperFullName` | Directly quoted instruction ("Use the new keeper's name as the person you've 'sold' the vehicle to..."). |
| `newKeeperAddressLine1` / `newKeeperAddressTown` / `newKeeperPostcode` | **Inferred, not directly observed as a screen field.** The vehicle-lookup step is the only screen of the online service this review could reach (see above); everything past it — including whether the new keeper's address is collected as three separate fields, a single free-text block, or a postcode-lookup widget — is reconstructed from the stated outcome ("a new log book within 5 to 7 working days" is sent to the new keeper, which requires DVLA to hold an address for them). This is the schema's weakest sourcing point and the first thing a future revision should firm up once the online service can be exercised past vehicle look-up (e.g. with an authorised test vehicle, if DVLA ever publishes one, or via direct confirmation from DVLA). |
| `sellerEmailAddress`, `newKeeperEmailAddress` | Directly quoted ("an email confirmation (if you gave your email address)" / "(if you gave their email address)"). |

## Scope and jurisdiction notes

- **Whole of the United Kingdom.** DVLA's vehicle registration function is
  UK-wide; `jurisdiction.country` is `GB` per registry convention for `gb/dvla/*`
  sibling entries (matching `gb/dvla/vehicle-tax`).
- **Seller-initiated only.** This schema models the person giving up the
  vehicle notifying DVLA — not the buyer's own registration steps (which use
  the green "new keeper slip" and, if the seller never tells DVLA online, a
  posted V5C with section 2 or 6 completed instead).
- **Motor-trade and scrappage transactions are out of scope for v1.0.0.** DVLA
  runs a distinct digital service for those,
  `transfer-vehicle-to-trade.service.gov.uk`, with its own start page and
  (very likely) its own field set — not confirmed in this pass. This is a
  strong candidate for a follow-up schema (e.g.
  `gb/dvla/vehicle-trade-transfer`) once that service is examined the same way
  this one was.
- **The postal, no-log-book fallback is out of scope.** When a seller has no
  V5C to reference, the guidance directs them to write to DVLA (Swansea) with
  their own name/address, the registration number, the make and model, the
  exact date of sale, and the new keeper's name/address. Because that fallback
  exists specifically for sellers who cannot supply the V5C reference number
  the online service requires, its field list is a different (postal) channel,
  not a description of what the online service asks for, and is not folded
  into this schema's field set.
- **Vehicle tax is out of scope.** The wizard states tax is not transferred and
  must be handled separately (see the already-published `gb/dvla/vehicle-tax`).
- **Retaining the registration number** (a private-plate retention) is
  mentioned as something the seller must do *before* using this service, if
  wanted — a separate, prerequisite DVLA process, not modelled as a field
  here.
- **Buyer-side ("bought it") flow is out of scope.** The wizard's "bought a
  vehicle" terminal page describes the buyer filling in log-book section 2 or
  6 themselves and posting it, or relying on the seller's online notification
  — a distinct, buyer-initiated action this schema does not model.
- Conditional requiredness (the two eligibility exits) is expressed
  structurally via `steps[].transitions` (GSP-0013/§7.2), matching the pattern
  used in `us/ca/dmv/real-id-application`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live
`change-private-vehicle-sale.service.gov.uk` flow using a genuine, authorised
UK vehicle and V5C reference number (the one blocker this cycle could not
clear), confirms or corrects the inferred new-keeper-address fields, resolves
any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus
sets `status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
