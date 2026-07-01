# Verification record — `ie/dttas/driving-licence-renewal` v1.0.0

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
recorded against the live, authenticated online flow at `ndls.ie` (which sits
behind a Public Services Card / MyGovID sign-in). It therefore remains `draft`,
not `verified`.

## Access constraint

`ndls.ie` returns **HTTP 403** to direct automated requests (both the `WebFetch`
tool and a direct `curl`), as does `citizensinformation.ie`. Every source page
below was instead retrieved through a **Wayback Machine snapshot**
(`web.archive.org`), following the pattern already used for `passports.gov.au`
(see the `gov-au-wayback-workaround` precedent): a cheap
`curl "http://archive.org/wayback/available?url=<path>"` check to find the
closest snapshot, followed by a direct `curl` of the returned
`web.archive.org/web/<timestamp>/...` URL. All snapshots resolved on the first
or second attempt and returned full, current-looking HTML (not a JS shell or a
bot-challenge page), except `ndls.ie/licensed-driver/fees.html` and
`ndls.ie/how-to-apply/applying-online.html`, whose snapshots captured only a
Cloudflare "One moment, please..." challenge page — those two pages were not
used as sources; the fee amounts and payment-method list were instead confirmed
from the "Renew My Driving Licence" page itself (which restates them) and from
`citizensinformation.ie`'s cost table.

## Sources examined

- **Document `(id, version)`:** `ie/dttas/driving-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Road Safety Authority (RSA), National Driver Licence Service
  (NDLS) — the single nationwide driver-licensing authority (NDLS replaced the
  county-council-run system in 2013).
- **Primary source URL:** <https://www.ndls.ie/licensed-driver/renew-my-driving-licence.html>
  (retrieved via `web.archive.org/web/20260520152741/...`)
- **Secondary/supporting sources (all retrieved via Wayback):**
  - <https://www.ndls.ie/medical-fitness/do-i-need-to-submit-a-medical-report.html>
    (`web.archive.org/web/20251115173139/...`) — the five medical-report
    triggers (category, age, notation code 101, alcoholism/epilepsy history,
    regular medication, and the full reportable-condition list) and the
    Part 1/Part 2 D501 form structure.
  - <https://www.ndls.ie/about/licence-categories-and-codes.html>
    (`web.archive.org/web/20260314093459/...`) — the full licence category
    table (AM, A1, A2, A, B, BE, W, C, C1, C1E, CE, D, D1, D1E, DE) and the
    Column-12 restriction-code table, used to define the Group 1/Group 2 split.
  - <https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driver-licensing/renewing-a-full-driving-licence/>
    (`web.archive.org/web/20250517190710/...`) — the "How to renew your driving
    licence" guide: the eligibility rule (within 3 months of expiry, or expired
    less than 10 years), the validity-duration-by-age table, the eyesight
    report form (D502) trigger, and the fee table (€65 standard / €35 for a
    3-year renewal / free for a 1-year medical renewal / free at 70+).
- **Official form ids:** `D501` (Driving Licence Medical Report Form), `D502`
  (Driving Licence Eyesight Report Form). Both are downloadable PDFs referenced
  from the medical-fitness page; neither was itself parsed field-by-field for
  this version. The report-content facts modelled (Part 1 applicant
  declaration, Part 2 doctor certification, one-month submission window,
  5-year maximum term for Group 2) come from the guidance prose describing them.
- **Retrieved / reviewed:** 2026-07-01 (Wayback snapshots dated between
  2025-05-17 and 2026-05-20; each checked for staleness against the live page's
  own "last reviewed"-style content and found materially current — no
  conflicting fee, eligibility, or category information across snapshots of
  different vintage).
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Two renewal routes: online (ndls.ie, PSC + verified MyGovID, no forms/appointment) or in person (book an appointment, photo/signature captured digitally) | `applicationChannel` |
| "You can apply to renew your driving licence if it is expiring within 3 months or it expired less than 10 years ago" / "If your licence expired more than 10 years ago, you must complete a Driver Theory Test..." | `eligibleWithinRenewalWindow` |
| "Proof of your address dated within the last six months if your current address differs from the one you provided when you applied for your PSC" (both channels) | `currentAddressDiffersFromPSC`, `addressProofDocument` |
| "Proof that you are normally resident in Ireland if your place of birth and nationality are outside the EU/EEA/Switzerland/UK/Northern Ireland" | `birthplaceAndNationalityOutsideEUEEASwitzerlandUKOrNI`, `residencyProofDocument` |
| Licence category table (Group 1: AM/A1/A2/A/B/BE/W; Group 2: C/C1/CE/C1E/D/D1/DE/D1E) and the validity-duration table (10 years Group 1, 5 years Group 2, capped further by age) | `includesGroup2Category` |
| "A medical report form is required ... where the driving licence or learner permit they are renewing expires the day before their 75th birthday" / age-75-or-over 3-year-or-1-year term rule | `agedSeventyFiveOrOver` |
| Five medical-report triggers: C/D-category (Group 2); disability/condition for Group 1; notation code 101; alcoholism/epilepsy history; regular medication; the full reportable-condition list (diabetes on insulin, stroke/TIA, brain surgery, pacemaker/ICD, neurological conditions, memory/psychiatric problems, Parkinson's, sleep apnoea, narcolepsy, eyesight/hearing conditions, adapted/automatic-only restriction) | `medicalReportRequired`, `medicalReportForm` |
| "You will need a Driving Licence Eyesight Report Form if you no longer need glasses or contact lenses to drive (for example, if you've had laser eye surgery)" | `eyesightReportRequired`, `eyesightReportForm` |
| In-person requirement: "Proof of your personal public services number (PPSN)" | `ppsnProofPresented` |
| In-person requirement: "Your current or most recent driving licence. If your licence has been lost, stolen or damaged you must also bring valid photo ID with you" | `physicalLicenceAvailable`, `photoIdDocument` |
| "Application fee of €65.00 ... If you are aged 70 years or over you are exempt from paying the fee" | `feeExemptionReason` |
| Online: credit/debit card only. In person: credit/debit card, Google Pay, Apple Pay, or Payzone voucher. Cost table: €65 (10-year/5-year), €35 (3-year), free (1-year medical) | `paymentMethod` |

## Cross-source discrepancy noted and resolved

`ndls.ie`'s own "Renew My Driving Licence" page states the residency-proof
trigger as **place of birth AND nationality** being outside the
EU/EEA/Switzerland/UK/Northern Ireland. `citizensinformation.ie`'s guide
simplifies this to "if you are not an EU or EEA citizen" — a narrower,
citizenship-only test that also omits the Switzerland/UK/Northern Ireland
carve-outs. Per source-of-truth fidelity, the primary `ndls.ie` wording was
followed for `birthplaceAndNationalityOutsideEUEEASwitzerlandUKOrNI`'s
description; the secondary source's simplification is noted in the field
description itself so a future reviewer isn't confused by the discrepancy if
they consult citizensinformation.ie directly.

## Scope and jurisdiction notes

- **Renewal only.** A first-time driving licence, adding a category to an
  existing licence, exchanging a foreign licence, and a lost/stolen/damaged
  licence replacement are each documented as distinct NDLS services on their
  own guidance pages and are out of scope for this document.
- **Licence categories are not enumerated as data.** The current spec (v0.2)
  field model is flat (§6.1) with no accepted repeating-value or `array` type
  (GSP-0009 is proposed, not accepted, and flagged as the highest-complexity,
  most one-way-door item pending explicit CEO consideration). A driving licence
  can carry multiple categories at once, and NDLS's own guidance groups them as
  "Group 1" and "Group 2" for the two purposes that actually matter to a
  renewal (medical-report trigger and validity-duration cap) rather than
  itemizing the full category list per applicant. This document follows that
  same Group 1/Group 2 flattening (`includesGroup2Category`) instead of
  inventing a fixed-cardinality set of per-category boolean fields, and does
  not model the "Add a Category to My Driving Licence" service at all. A future
  minor version could add per-category detail once GSP-0009 is accepted.
- **No applicant name/date-of-birth fields.** Like `gb/dvla/vehicle-tax` and
  `gb/dvla/driving-licence-renewal-photocard`, the online channel is reached
  through an existing digital-identity account (Public Services Card + verified
  MyGovID) that already carries the applicant's identity and address on file;
  this document models the yes/no *deltas* the service asks about (address
  changed, medical report needed, etc.), not the underlying identity data
  itself. The in-person channel likewise authenticates by presenting the
  physical licence (or photo ID) and PPSN proof, not by re-entering personal
  details as form fields.
- **Fees are described qualitatively, not encoded as a price list**, consistent
  with other reference schemas (e.g. `gb/dvla/vehicle-tax`). NDLS fees change
  periodically and are out of scope for a field-collection schema; the fee
  amounts appear only in field descriptions for context.
- **Not time-versioned.** Applying GSP-0005 §2's coexistence test: the process
  does not encode a year-varying value (the fee/duration bands are age-based,
  not calendar-year-based) and its "editions" would not meaningfully coexist,
  so this is a plain `v1.0.0` document, not an edition-axis schema.
- Conditional requiredness that v0.2's flat/linear model cannot express (fields
  gated by `applicationChannel`, `currentAddressDiffersFromPSC`,
  `birthplaceAndNationalityOutsideEUEEASwitzerlandUKOrNI`,
  `medicalReportRequired`, `eyesightReportRequired`, or `feeExemptionReason`) is
  documented in field descriptions, per the limitation tracked in GSP-0004.

## What is NOT yet independently verified

- The exact **online screen order and wording** past the initial requirements
  list (e.g. declarations, review, and payment screens) were not captured
  screen-by-screen, since the online service sits behind PSC/MyGovID sign-in.
- The `D501` and `D502` PDF forms themselves were not parsed field-by-field for
  this version (unlike, e.g., `ie/dsp/pps-number-application`'s REG1
  extraction); their content is modelled from guidance prose describing them.
- `ndls.ie/licensed-driver/fees.html` and
  `ndls.ie/how-to-apply/applying-online.html` could not be read (their Wayback
  snapshots captured only a bot-challenge page); the fee and payment-method
  facts modelled here rely on the "Renew My Driving Licence" page's own
  restatement and on `citizensinformation.ie`'s cost table instead.

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
