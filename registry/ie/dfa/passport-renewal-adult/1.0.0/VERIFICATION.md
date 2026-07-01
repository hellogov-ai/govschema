# Verification record — `ie/dfa/passport-renewal-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from** the sources below, but the full field-by-field
comparison the practice requires (confirming *every* published field, type,
requiredness, and constraint against the live application screens —
`manual-source-review-v1` → Procedure step 2) has **not** been completed and
recorded, because Passport Online (`passportonline.ie`) is an authenticated,
JavaScript-driven application with no published field-by-field specification and
no downloadable form to check against (see below). It therefore remains `draft`,
not `verified`.

## Source examined

- **Document `(id, version)`:** `ie/dfa/passport-renewal-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Department of Foreign Affairs, Passport Service (DFA), Ireland
- **Primary source URL:** <https://www.ireland.ie/en/dfa/passports/how-to-apply-for-a-passport/renew-adult-passport/>
- **Supporting sources:**
  - <https://www.citizensinformation.ie/en/travel-and-recreation/passports/renewing-an-irish-passport/> (renewal eligibility, fees, processing times)
  - <https://www.citizensinformation.ie/en/travel-and-recreation/passports/applying-for-or-renewing-an-irish-passport/> (general Passport Online process)
  - <https://www.ireland.ie/en/dfa/passports/documentary-requirements/adult/> (name-change and conditional documents)
  - <https://www.dfa.ie/irish-embassy/great-britain/passports/top-passport-questions/what-is-your-ppsn-on-the-passport-application-form/> (PPSN field)
  - <https://ie.iasservices.org.uk/irish-passport-application/irish-passport-renewal/> (third-party summary of the online screens and photo spec)
- **Official form id:** none — see "Why no form" below.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

**Why no form.** Ireland's paper `APS1`/`APS2` passport application forms were
discontinued for public download; since 1 December 2025 the Passport Service no
longer accepts them, and forms are issued only case-by-case through the Passport
Assist Service. Passport Online is now the sole channel for an eligible adult
renewal. This mirrors `gb/dvla/vehicle-tax`: with no form or published field
spec, the document is transcribed from GOV/DFA-adjacent guidance prose and
third-party summaries rather than an independently captured screen flow.

## What was confirmed against the source

- **Renewal eligibility window and routing**, modelled as `currentPassportExpiredMoreThan5YearsAgo`
  and `renewalBasis`: a passport expired more than 5 years is a first-time
  application, not a renewal (out of scope here, per the same convention as
  `gb/hmpo/passport-application-first-adult` / `us/dos/passport-application-ds11`
  being separate documents from their renewal siblings). Confirmed via
  citizensinformation.ie's "How to renew an Irish passport as an adult".
- **No witness/countersignatory required for a standard adult renewal** (unlike
  first-time application) — confirmed and therefore correctly *not* modelled as
  a field, unlike `us/dos/passport-application-ds11`'s witness-adjacent fields.
- **Lost/stolen/damaged declaration** is answered inline in the online
  application, with no extra witnessing step for that path — modelled as
  `lostStolenOrDamaged`.
- **Photo specification** (colour, ≥715×951px, JPG/JPEG, within 6 months, head to
  mid-torso) — confirmed via the iasservices.org.uk summary of the current DFA
  photo standard; not cross-checked against the live upload screen itself.
- **Fee and processing time facts were deliberately excluded from `fields`**
  (per the same convention as `us/dos/passport-renewal-ds82`): standard online
  renewal is €75 (vs. €80 + €9.50 by post), simple online renewals take
  approximately 10 working days, complex ones approximately 15 working days.
  These change independently of the data model and are out of scope for
  `fields`; consumers should read them from the live source.

## What is NOT yet independently verified

- **`mostRecentPassportNumber` format.** Unlike US (6–9 alphanumeric) and UK (9
  digits) passport numbers, the exact character length/pattern of an Irish
  passport number was not confirmed from an authoritative source in this pass.
  No `pattern` was encoded; only a generous `maxLength` bound.
- **Whether a mailing/delivery address is collected as a distinct field.**
  Passport Online applicants renew from an online account and current guidance
  did not clearly state whether a full address is re-entered per application or
  carried from account/previous-passport data on file. No address fields are
  modelled in this version to avoid inventing an unconfirmed structure; this is
  the leading candidate gap for the next review pass.
- **`ppsNumber` exact format** (`maxLength: 9`) reflects the general Irish PPSN
  format (7 digits + 1–2 letters) but was not cross-checked against the
  passport application screen specifically.
- **"Post Passport" (An Post-assisted) channel** — an approximately 8-week
  post-office-assisted channel distinct from the direct Passport Online
  self-service flow — was noted in search results but not modelled; this
  document describes the direct Passport Online self-service application only.
- The **passport card** eligibility/restrictions (e.g. EU/EEA-travel-only use)
  are noted in `productRequested`'s description but not independently confirmed
  field-by-field.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer with an active
Passport Online account applies `manual-source-review-v1` (Procedure step 2
field-by-field comparison against the live authenticated screens, step 3 flow
comparison), resolves the open items above (address collection in particular),
ships any resulting change as a new schema version per
[VERSIONING.md](../../../../../VERSIONING.md) (immutability — never edit a
published version), and records the outcome here with `status: verified` and a
current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as
the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): passport renewal is a fee/policy-sensitive process, and this document
in particular carries more open items than the DS-82/HMPO precedents. Re-check
the source on or before that date and on any `source.url` change.
