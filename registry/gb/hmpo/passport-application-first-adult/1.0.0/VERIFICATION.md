# Verification record — `gb/hmpo/passport-application-first-adult` v1.0.0

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
recorded against the live online application at HMPO's authenticated application
portal. It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/hmpo/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** His Majesty's Passport Office (HMPO).
- **Primary source URL:** <https://www.gov.uk/apply-first-adult-passport>
- **Secondary sources:**
  - <https://www.gov.uk/apply-first-adult-passport/apply-online> (online
    application steps, what you need, identity confirmation, payment)
  - <https://www.gov.uk/apply-first-adult-passport/what-documents-you-need-to-apply>
    (birth-certificate, parental/grandparental nationality evidence, naturalisation
    and registration evidence, name-change evidence)
  - <https://www.gov.uk/countersigning-passport-applications> (who can confirm
    identity, eligibility and exclusion rules, passport-holding requirement)
- **Official form id:** none for the online channel. HMPO's online first-adult
  service is an authenticated web application with no downloadable, fillable form
  equivalent to the DS-82/ITR-E precedents; a paper-form channel exists (per the
  landing page, at a higher fee) but was not reviewed and is out of scope for this
  document (see below).
- **Retrieved / reviewed:** 2026-07-01 (all sources confirmed live at authoring
  time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why GOV.UK guidance prose was used as the field-level source

Like `gb/dvla/vehicle-tax`, the first-adult passport online service has no
paper-form equivalent to extract field-by-field — it sits behind an authenticated
HMPO portal with no published field-by-field specification of its screens. The
GOV.UK guidance pages (the landing page, "Apply online", and "What documents you
need to apply") are the most authoritative public description of what the service
collects, so this document transcribes those into fields. It is a
**guidance-derived**, not a **form-derived**, schema, and that distinction is
recorded so consumers weigh its confidence accordingly.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Birth certificate required for everyone; parental nationality evidence required only if born on/after 1 Jan 1983 | `nationalityEvidenceRoute`, `birthOrAdoptionCertificate` |
| Parent's UK birth/adoption certificate, naturalisation/registration certificate, or British passport (valid at birth, or passport number only) as nationality evidence | `parentNationalityEvidenceParent`, `parentNationalityEvidenceType` |
| "If you send documents relating to your father, you must also send your parents' marriage certificate" | `parentsMarriageCertificate` |
| "If your parents were born after 1982 or outside the UK, your grandparents' details will also be required" | `grandparentEvidenceRequired`, `grandparentNationalityEvidence` |
| Naturalisation/registration certificate must already be held; passport used to enter the UK or foreign passport applicant is included on | `naturalisationOrRegistrationCertificate`, `passportUsedToEnterUK` |
| Evidence of name changes since birth (marriage/civil partnership certificate, deed poll, statutory declaration) | `nameChangeEvidence` |
| Applicant name, date of birth, contact/address details collected on the online form | `lastName`, `firstNames`, `dateOfBirth`, `email`, `addressLine1`, `addressTown`, `postcode` |
| Digital photo uploaded as part of the online application | `photoFile` |
| Identity confirmer must have known the applicant 2+ years, be able to identify them, and cannot be a relative, partner, or cohabitant; must hold a current British or Irish passport (UK-resident case) and provides their passport number during their own online confirmation step | `identityConfirmerFullName`, `identityConfirmerPassportType`, `identityConfirmerPassportNumber` |
| Standard 34-page vs 50-page "frequent traveller" passport option; card payment only | `productRequested`, `paymentMethod` |

## Scope and jurisdiction notes

- **Online channel only.** GOV.UK's landing page names a paper-form channel (at a
  higher fee) alongside the online service; this document models only the online
  application, which is the primary path the guidance itself steers applicants
  toward. A future minor version could add a `applicationChannel` axis if the
  paper channel's fields are independently reviewed.
- **Identity confirmer scoped to UK residents.** `identityConfirmerPassportType`'s
  enum covers only `british`/`irish`, which the countersigning guidance states is
  required "if you are in the UK." A broader set of accepted nationalities applies
  when the confirmer is resident overseas; that branch was not independently
  reviewed and is out of scope for this version.
- **Fees are intentionally not encoded**, consistent with other reference schemas
  (e.g. `gb/dvla/vehicle-tax`, `us/ca/dmv/drivers-license-renewal`) — HMPO fees
  change periodically (most recently under the Passport (Fees) Regulations 2022)
  and are out of scope for a field-collection schema.
- **Not time-versioned.** Applying GSP-0005 §2's coexistence test: the process
  does not encode a year-varying value and its "editions" would not meaningfully
  coexist (there is no annual re-filing cycle), so this is a plain `v1.0.0`
  document, not an edition-axis schema.
- Conditional requiredness that v0.2's flat/linear model cannot express (the
  nationality-evidence branch, the father/marriage-certificate condition, the
  grandparent-evidence condition) is documented in field descriptions, per the
  limitation tracked in GSP-0004.

## What is NOT yet independently verified

- The exact **screen order and wording** of the live online application were not
  captured screen-by-screen; this document is derived from the surrounding
  GOV.UK guidance pages, which describe what the service needs but not its literal
  screen text.
- The **paper-form channel** (£115.50 per the landing page) was not reviewed and
  is excluded from this version.
- The **overseas identity-confirmer** nationality list (British, Irish, EU, US, or
  Commonwealth passports, per the countersigning guidance) was not independently
  confirmed field-by-field and is excluded pending a follow-up review.
- Whether a separate **place of birth** field is collected on the online form
  (as opposed to being read from the birth certificate) was not confirmed; it is
  omitted here on the assumption HMPO resolves it from the submitted certificate.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live online application specifically,
step 3 flow), confirms the source is authoritative, resolves any discrepancy by
shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5), and records the outcome here plus sets `status: verified` with
a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
