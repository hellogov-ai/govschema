# Verification record — `ie/dsp/pps-number-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from** the sources below, but the full field-by-field
comparison the practice requires (`manual-source-review-v1` → Procedure step 2)
has not been completed against the live, authenticated MyWelfare online screens
— only against the published guidance and the downloadable REG1 paper form. It
therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `ie/dsp/pps-number-application` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Department of Social Protection (DSP), Ireland
- **Primary source URL:** <https://www.gov.ie/en/department-of-social-protection/services/get-a-personal-public-service-pps-number/>
- **Official form:** REG1, edition `00K 04-22` (April 2022) —
  <https://assets.gov.ie/static/documents/application-form-pps-number-reg1.pdf>
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

**Note on the catalog's original candidate source.** `discovery/catalog.json`
originally listed `.../services/how-to-apply-for-a-personal-public-service-pps-number/`
as this candidate's `candidateSource`. That path now returns HTTP 404; the live
page is `.../services/get-a-personal-public-service-pps-number/` (confirmed
`200`, matching title "Get a Personal Public Service (PPS) Number"). This
document was authored against the live page and the catalog entry has been
corrected to match.

## What was confirmed against the source

- **Channel and residency branching** (`applicationChannel`, `residency`):
  confirmed from the gov.ie "How to Apply" section — online (MyWelfare +
  MyGovID) is available to residents of the island of Ireland and to residents
  abroad; REG1 by post is the fallback and the third-party channel.
- **REG1 item set (items 1-19).** Extracted directly from the REG1 PDF's
  decompressed content-stream text (no PDF-to-text tool was available; streams
  were zlib-inflated and `Tj`/`TJ` parenthesis-strings decoded manually, per
  the established extraction method used for other paper-form schemas in this
  registry). Confirmed items: title, surname, first names, birth first
  names/surname, mother's birth surname, date of birth, gender, address
  (with county and Eircode), telephone numbers, email, reason for application,
  nationality, country of birth (and county of birth if Ireland), most recent
  prior country of residence and its identifier, pre-1979 Irish National
  Insurance Number, and previous Irish address.
- **Reason-for-application options** (`reasonForApplication` enum): confirmed
  from the gov.ie "Why you need a PPS Number" list (employment, driving
  licence, social welfare payment, registering a child's birth, SAFE PASS
  training, other public services, education enrolment, Irish passport
  application, marriage and residence, specified-body service).
- **Identity-evidence categories** (`identityBasis`, `identityDocument`):
  confirmed from the gov.ie "Evidence of your identity" rules, which branch by
  citizenship basis (Irish-born, Irish born in NI/UK-born, naturalised,
  foreign-birth-registered, other EU/EEA, non-EU/EEA) each with distinct
  accepted documents.
- **Address-evidence rules** (`addressEvidenceDocument`): confirmed — a
  document showing name and address, no older than 3 months, from the listed
  document types.
- **Overseas-applicant extras** (`reasonEvidenceDocument`,
  `overseasApplicantQuestionnaireDocument`, `authoriseThirdPartyToReceiveNumber`,
  `thirdPartyConsentDocument`): confirmed from "Applying for a PPS Number if
  you are living outside Ireland" — evidence of the reason, a completed RM2
  questionnaire, and a signed consent form if the number is to be released to
  a third-party representative.
- **The Declaration block (signature, date, witness signature/date) and the
  "For official use" block (CAP ID, date PPS Number allocated) were
  deliberately excluded from `fields`**, consistent with this registry's
  convention (e.g. `us/irs/individual-income-tax-return-1040`'s signature
  block): they are part of the act of signing/submission or are government-only
  outputs, not applicant-supplied data an agent collects.

## What is NOT yet independently verified

- **Field requiredness for items without an explicit conditional note**
  (e.g. `mothersBirthSurname`, telephone numbers) was inferred from the form's
  layout, not confirmed against an authoritative field-by-field requiredness
  specification. The REG1 PDF marks conditional items in prose ("if
  different", "if applicable") but does not tag every item as strictly
  required or optional.
- **The MyWelfare online screens themselves** were not reviewed (the service
  is authenticated and requires a MyGovID account); this document is derived
  from the guidance describing the online channel and the paper REG1 form,
  not an independently captured screen-by-screen review of MyWelfare, mirroring
  the caveat already recorded for `ie/dfa/passport-renewal-adult`.
- **Eircode validation pattern** (`^[A-Za-z0-9]{3} ?[A-Za-z0-9]{4}$`) reflects
  the general public Eircode format, not a pattern cross-checked against the
  REG1 form or MyWelfare's own input validation.
- **Form REGM1** (child PPS Number application) and the birth-registration
  automatic-allocation path are out of scope for this document; see
  `discovery/catalog.json` for a potential future sibling schema.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer with an active
MyGovID/MyWelfare account applies `manual-source-review-v1` (Procedure step 2
field-by-field comparison against the live authenticated online screens, step 3
flow comparison), resolves the requiredness caveats above, ships any resulting
change as a new schema version per
[VERSIONING.md](../../../../../VERSIONING.md) (immutability — never edit a
published version), and records the outcome here with `status: verified` and a
current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays
as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): identity-document rules and channel availability are the kind of
detail that changes with policy updates. Re-check the source on or before that
date and on any `source.url` change.
