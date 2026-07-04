# Verification record — `nl/rdw/vehicle-ownership-transfer` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records
a mock-data test run of the field set, and states the current verification
claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from RDW's own service pages describing the online
"Voertuig overschrijven" (transfer registration) process — eligibility
conditions, the 9-digit tenaamstellingscode, and the fee. The actual
DigiD-gated `voertuigoverschrijven.rdw.nl` wizard screens themselves could not
be reached or walked through end to end, so the full field-by-field comparison
the practice requires (Procedure step 2) has **not** been completed. It
therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `nl/rdw/vehicle-ownership-transfer` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Netherlands Vehicle Authority (Rijksdienst voor het
  Wegverkeer, RDW).
- **Primary sources (fetched directly, HTTP 200):**
  - <https://www.rdw.nl/kopen-of-verkopen/kenteken-overschrijven-op-naam-van-een-persoon>
    — "Kenteken voertuig overschrijven" (register a vehicle in your name):
    the buyer's eligibility conditions (18+, registered in the BRP with a
    Dutch address, valid ID document, DigiD app with ID-check), the seller's
    document conditions (valid registration card/temporary document number
    plus the complete tenaamstellingscode — paper-only documents require an
    in-person counter visit instead), the three channels (online, counter,
    dealership), and the flat EUR 13.10 fee "the same across all channels."
  - <https://www.rdw.nl/het-kentekenbewijs/tenaamstellingscode-kwijt> —
    "Tenaamstellingscode kwijt": confirms the tenaamstellingscode is a 9-digit
    code issued to the new owner in 2 parts, used for transfer, suspension,
    export, or scrapping, distinct from the insurance-purposed "meldcode"
    (last 4 digits of the VIN), and describes the EUR 1.25 online replacement
    service (DigiD for private individuals, eHerkenning for businesses) if
    lost.
  - <https://voertuigoverschrijven.rdw.nl/particulier/> — the online service's
    own landing page, confirmed reachable (HTTP 200) but renders as a
    JavaScript loading shell ("Aan het laden... een moment geduld a.u.b.") to
    non-interactive fetch tooling; the actual DigiD-gated wizard screens
    behind it were not reached.
  - Secondary corroboration (WAM liability-insurance requirement, not used
    for field wording): general web search results confirming Dutch law
    (Wet Aansprakelijkheidsverzekering Motorrijtuigen) requires WA insurance
    on a registered vehicle from the moment of registration, and that RDW
    checks this electronically against insurers' notifications rather than
    collecting an insurer name on the transfer form itself.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| RDW 'Kenteken voertuig overschrijven' — buyer conditions | `buyerAge18OrOlder`, `buyerRegisteredInBrpWithNlAddress`, `buyerHasValidIdDocument`, `buyerHasDigidAppWithIdCheck` |
| RDW 'Kenteken voertuig overschrijven' — seller document condition | `sellerHasValidRegistrationCardAndCode` |
| RDW 'Tenaamstellingscode kwijt' — 9-digit code | `registrationTransferCode` |
| RDW 'Kenteken voertuig overschrijven' — buyer enters the vehicle to start the transfer | `licencePlateNumber` |
| RDW 'Kenteken voertuig overschrijven' — EUR 13.10 fee, iDEAL/Wero | `documents[].transferFee` |
| WAM electronic-insurance-check guidance | `buyerHasValidLiabilityInsuranceDeclaration` |

## What is NOT independently confirmed / out of scope

- **The mijn RDW / voertuigoverschrijven.rdw.nl wizard screens themselves.**
  The exact screen order, whether `licencePlateNumber` and
  `registrationTransferCode` are entered on the same screen or in sequence,
  and whether any additional field (e.g. odometer reading, sale price, or an
  explicit insurer name) is collected online could not be confirmed — the
  landing page is a client-rendered shell this session's fetch tooling could
  not execute JavaScript against. This document is transcribed from RDW's own
  service-page prose, the same discipline `nl/rdw/drivers-licence-renewal`
  and `sg/lta/vehicle-ownership-transfer` applied to their own gated online
  services.
- **`licencePlateNumber`'s exact format.** Dutch licence plates have used
  several distinct letter/digit patterns across successive registration
  series since the 1970s (e.g. `99-99-AA`, `AA-999-A`, `9-AAA-99`); no single
  source consulted here states the current pattern precisely enough to
  assert a tight regex, so `validation.pattern` is a loose 6-8 character
  uppercase-alphanumeric-with-hyphens bound rather than a series-specific
  pattern. A future reviewer with access to RDW's own kenteken-format
  reference page should tighten this.
- **`registrationTransferCode`'s "in 2 parts" split.** RDW's page states the
  code is issued "in 2 delen" (in 2 parts) but does not describe which digits
  belong to which part or why (likely a fraud-prevention measure so the full
  code is only assembled once the registration card is physically handed
  over); this document models it as a single 9-digit field the buyer enters
  in full, consistent with how the online service is described as accepting
  "de complete en geldige tenaamstellingscode."
- **The insurance declaration's exact mechanism.** No RDW source consulted
  states whether the online wizard itself presents an explicit "I have
  insurance" checkbox, or whether RDW's electronic cross-check with insurers
  happens silently after registration with no buyer-facing screen at all.
  `buyerHasValidLiabilityInsuranceDeclaration` is modelled as a precondition
  declaration on the conservative assumption that some form of buyer
  attestation exists, mirroring `sg/lta/vehicle-ownership-transfer`'s
  `newOwnerInsuranceValidDeclaration`; a live-portal walkthrough should
  confirm or remove this field.
- **The `meldcode`** (last 4 digits of the VIN, used when arranging
  insurance) is out of scope: RDW's own page distinguishes it from the
  tenaamstellingscode and describes it as serving the insurer-facing
  insurance-arrangement step, not the RDW transfer submission itself.
- **Motorcycle/moped transfers, business/dealer transfers, paper-document-only
  sellers, export, and scrappage** are out of scope, consistent with this
  registry's one-schema-per-distinct-process convention. The seller's own
  role (physically handing over the registration card and tenaamstellingscode)
  is described only in the scope note, not modelled as a separate step, since
  the seller does not interact with RDW's online service themselves in this
  flow (unlike `gb/dvla/vehicle-keeper-change-v5c` and
  `sg/lta/vehicle-ownership-transfer`, where the seller initiates or confirms
  online).
- **The two output documents** the parties receive after a successful
  transfer — the vrijwaringsbewijs (discharge certificate, for the seller)
  and the tenaamstellingsverslag (registration report, for the buyer) — are
  mentioned in the schema `description` only, not modelled as `documents[]`
  entries, since they are outputs of the process rather than something the
  buyer submits or provides.

## Scope and jurisdiction notes

- This closes one of the three remaining Vehicle Registration/Tag/Title gaps
  flagged by the GOV-960 per-country x per-vertical audit (CA, NZ, NL had a
  Drivers-Licence schema but no Vehicle Registration/Tag/Title schema); CA and
  NZ remain open. NZ's equivalent process (NZTA form MR13B, "Change of
  registered person - buyer") was investigated first and found to have no
  independently downloadable/fillable form — `nzta.govt.nz`'s own Forms page
  and every Wayback capture of it describe MR13A/MR13C as online-only
  transactions and MR13B only as a form "completed and presented to an NZTA
  agent," with no PDF asset ever located on the domain (confirmed by CDX
  search across the whole `nzta.govt.nz` domain for any URL containing
  `mr13b`, zero results) — a genuine sourcing dead end, not merely a WAF
  block, worth recording for whoever picks up NZ next. Ontario's general
  transfer process was also investigated: its "Application for Transfer" is
  printed on the back of the physical ownership permit (not independently
  downloadable), and the two standalone downloadable PDF forms that do exist
  — 1155E (Sworn Statement for the Transfer of a Used Motor Vehicle) and
  1157E (Sworn Statement for a Family Gift) — are narrow Retail-Sales-Tax
  exemption declarations for specific transfer reasons, not the general
  arm's-length private-sale form, so neither is a clean structural match for
  a general "vehicle ownership transfer" schema; a future cycle should decide
  whether to model the exemption-declaration shape instead or find a better
  primary source.
- `fieldRole: "eligibility"` (GSP-0014) is used for every precondition
  question, matching `nl/rdw/drivers-licence-renewal`'s convention.
  `buyerHasValidLiabilityInsuranceDeclaration` carries
  `classification: "financial"` per GSP-0006's advisory vocabulary.
- Conditional flow uses `steps[].transitions` with `exitReason` (GSP-0013 §4)
  for the five eligibility gates that exit this online flow to the unmodelled
  in-person counter process, the same pattern
  `nl/rdw/drivers-licence-renewal` uses for its three eligibility gates.

## Review-gate correction (GOV-1016)

Re-fetching both primary sources during review found two `sourceRef` quotes
that did not match the live page text verbatim and corrected them prior to
merge (the underlying eligibility conditions themselves were unaffected):

- `buyerRegisteredInBrpWithNlAddress`: the live page reads "U staat in de
  Basisregistratie Personen (BRP) ... met een woonadres of briefadres in
  Nederland" (no "ingeschreven"; "briefadres" — a correspondence address, not
  "postadres"/mailing address as originally quoted). Field `label` and
  `description` were reworded from "mailing address" to "correspondence
  address" to match, and the `sourceRef` quote corrected.
- `buyerHasValidIdDocument`: the live page reads "U heeft een geldig
  legitimatiebewijs" (not "U hebt een geldig identiteitsbewijs" as originally
  quoted — both terms mean "valid identity/legitimation document" in Dutch
  administrative usage, but the quote must match the source verbatim).
- `buyerHasDigidAppWithIdCheck`: corrected "U hebt" to "U heeft" to match the
  live page's conjugation exactly.

All other sourceRef quotes (18+ condition, seller's kentekencard/
tenaamstellingscode condition, the 9-digit code, the EUR 13.10 fee/iDEAL-Wero
payment line, and the JS-shell wizard-page claim) were re-verified against the
live pages during this review and match verbatim.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Dutch DigiD
account, an eligible vehicle, and its tenaamstellingscode completes an actual
`voertuigoverschrijven.rdw.nl` online transfer (or has independent
confirmation from someone who has), confirming: the exact screen order and
field set, `licencePlateNumber`'s validation pattern against RDW's own
kenteken-format reference, whether an explicit insurance-declaration screen
exists, and the current fee and accepted payment methods.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
