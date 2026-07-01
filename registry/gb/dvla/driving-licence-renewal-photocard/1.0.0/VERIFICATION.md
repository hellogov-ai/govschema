# Verification record — `gb/dvla/driving-licence-renewal-photocard` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live authenticated flow at
`apply-for-driving-licence.service.gov.uk`. It therefore remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `gb/dvla/driving-licence-renewal-photocard` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Driver and Vehicle Licensing Agency (DVLA).
- **Primary source URL:** <https://www.gov.uk/renew-driving-licence>
- **Secondary sources:**
  - <https://www.gov.uk/renew-photo-driving-licence> ("Change the photo on your
    driving licence" — a near-duplicate answer page for the same online service
    entered via a different task, used to cross-check the photo-reuse/upload
    rule and the fee/channel rules)
  - <https://apply-for-driving-licence.service.gov.uk/before-you-start?locale=en>
    and its `before-you-continue` step — the online service's own pre-login
    screens, reachable without authenticating, confirmed live at retrieval time
  - <https://www.gov.uk/driver-vehicles-account> (consulted to confirm the
    online service is reached through DVLA's GOV.UK-One-Login-backed account,
    not a driving-licence-number/National-Insurance-number/postcode lookup —
    that three-factor lookup belongs to the separate `view-driving-licence`
    "check code" service and was **not** carried into this document)
  - <https://www.gov.uk/id-for-driving-licence> (identity-document evidence for
    a driving licence application; read to confirm it applies to the
    name/title-change **postal** path, not the online renewal flow — see Scope
    notes below)
- **Official form id:** none for the online or Post Office channels. A paper
  "D1 pack" exists (obtained in person from a Post Office, not downloadable), so
  — like `gb/dvla/vehicle-tax` and `gb/hmpo/passport-application-first-adult` —
  this document is transcribed from GOV.UK guidance prose and the online
  service's own pre-login screens, not an independently captured screen-by-screen
  review of the full authenticated flow.
- **Retrieved / reviewed:** 2026-07-01 (all sources fetched live via the GOV.UK
  Content API and direct HTTP requests at authoring time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why GOV.UK guidance prose (plus pre-login screens) was used as the field-level source

Like `gb/dvla/vehicle-tax` and `gb/hmpo/passport-application-first-adult`, the
online renewal sits behind a GOV.UK-One-Login-backed DVLA account with no
published field-by-field specification of its authenticated screens. Two things
went beyond those precedents here: (1) the same task is documented on two
near-identical GOV.UK answer pages (`renew-driving-licence` and
`renew-photo-driving-licence`), which cross-confirmed the fee, channel, and
photo rules; and (2) the online service's `before-you-start` and
`before-you-continue` screens were reachable and readable without signing in,
directly confirming the photo-reuse-from-passport-vs-upload step
(`photoSource`/`photoFile`) rather than relying on guidance prose alone for that
part of the flow.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Renew your: full driving licence / provisional driving licence" (page title, both renew through the same service) | `licenceType` |
| "If your name or title has changed since you got your current driving licence, you must apply by post. You cannot renew it online or at a Post Office." | `nameOrTitleChangedSinceLicence`, `applicationChannel` |
| Three renewal routes: online (`Start now` → `apply-for-driving-licence.service.gov.uk`), Post Office (reminder letter or photocard + fee), by post (D1 pack) | `applicationChannel` |
| "If you have a valid UK passport, we may be able to use your passport photo on your licence" / "you will need to upload a new one" — confirmed live on the service's own `before-you-continue` screen | `photoSource`, `photoFile` |
| "DVLA will send you a confirmation email once you've applied" | `email` |
| Online fee £14, paid by MasterCard/Visa/Electron/Delta debit or credit card; no fee if over 70 or on a medical short-period licence | `paymentMethod`, `feeExemptionReason` |
| Post Office: reminder letter, or photocard if no reminder letter, plus the £21.50 fee | `hasReminderLetter`, `currentPhotocardPresented` |
| By post (D1 pack): a recent printed passport-type photo (back not signed), current photocard if held, cheque or postal order for £17 payable to DVLA | `printedPassportTypePhoto`, `currentPhotocardIncluded`, `paymentInstrument` |
| "You might be asked to take part in research by email, but you can opt out" | `researchContactOptIn` |

## Scope and jurisdiction notes

- **Great Britain residents only.** The source states "there's a different
  service in Northern Ireland"; this document models the GB (England, Scotland,
  Wales) online/Post-Office/post service only. `jurisdiction.level` is
  `national`, matching the `gb/dvla/vehicle-tax` precedent for a GB-wide DVLA
  process. Northern Ireland residency is not modelled as a field. It is a hard
  eligibility gate, not a branch within this service.
- **Renewal only.** A first-ever provisional licence (never previously held one,
  or applied before 1 March 1973) is a separate `apply-first-provisional-driving-licence`
  service and is out of scope; so are the dedicated 70-or-over
  (`renew-driving-licence-at-70`), medical short-term
  (`renew-medical-driving-licence`), and 5-year bus/lorry (`renew-lorry-bus-coach-licence`)
  renewal services, each with its own GOV.UK page. `feeExemptionReason`'s
  `over_70`/`medical_short_period_licence` values reflect only the no-fee note
  stated on **this** service's own page, not those dedicated services' rules.
- **Name/title-change identity evidence is out of scope.** A change forces
  `applicationChannel = post` per the source, but the specific identity
  documents required (per `gov.uk/id-for-driving-licence`) are not modelled as
  fields in this version. That page's branching (UK-passport-number entry,
  UKVI share code, or a substantial by-post document list with further
  name/gender-change sub-branches) is complex enough to warrant its own review
  pass. A future minor version can add it once independently reviewed.
- **Address is not modelled.** Changing the address on a licence is a distinct
  GOV.UK service (`change-address-driving-licence`); nothing in the retrieved
  sources suggests the renewal flow re-collects or re-confirms the applicant's
  address, so no address field is included.
- **Fees are intentionally not encoded as amounts**, consistent with other
  reference schemas (e.g. `gb/dvla/vehicle-tax`, `gb/hmpo/passport-application-first-adult`).
  DVLA fees change periodically and are out of scope for a field-collection
  schema; they are described qualitatively in field/document descriptions only.
- **Not time-versioned.** Applying GSP-0005 §2's coexistence test: the process
  does not encode a year-varying value and its "editions" would not meaningfully
  coexist, so this is a plain `v1.0.0` document, not an edition-axis schema.
- Conditional requiredness that v0.2's flat/linear model cannot express (fields
  gated by `applicationChannel`, `photoSource`, `hasReminderLetter`, or
  `feeExemptionReason`) is documented in field descriptions, per the limitation
  tracked in GSP-0004.

## What is NOT yet independently verified

- The exact **screen order and wording** past the `before-you-continue` photo
  step (e.g. declarations, review, and payment screens) were not captured
  screen-by-screen, since they sit behind GOV.UK One Login sign-in.
- Whether the online service asks the applicant to reconfirm any existing
  personal details (e.g. medical conditions, licence categories) before
  renewal was not confirmed in the retrieved sources and is not modelled here.
- The **Post Office** channel's exact in-branch process (e.g. whether a new
  photo is captured in branch) was not independently confirmed beyond the
  reminder-letter/photocard/fee requirements stated on the source pages.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live authenticated online flow
specifically, step 3 flow), confirms the source is authoritative, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
