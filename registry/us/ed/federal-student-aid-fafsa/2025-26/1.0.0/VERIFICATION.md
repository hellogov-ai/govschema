# Verification record — `us/ed/federal-student-aid-fafsa` (2025-26) v1.0.0

This file is the **source-review record** for this document edition/version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`edition`:** `award-year` / `2025-26`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live online FAFSA flow. It therefore remains `draft`, not
`verified`.

## Source examined

- **Document `(id, edition, version)`:** `us/ed/federal-student-aid-fafsa` / `2025-26` / `1.0.0`
- **Spec version:** GovSchema `0.2.0` (edition axis, GSP-0005)
- **Authority:** U.S. Department of Education, Federal Student Aid (FSA)
- **Primary source URL:** <https://studentaid.gov/h/apply-for-aid/fafsa>
- **Form reference:** FAFSA (Free Application for Federal Student Aid), 2025-26 award year
- **Authoritative layout source:** 2025-2026 Federal Student Aid Handbook, Application
  and Verification Guide, **Chapter 2 — Filling Out the FAFSA Form**
  (<https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2025-2026/application-and-verification-guide/ch2-filling-out-fafsa-form>)
- **Award year / tax year:** 2025-26 award year; income uses the **2023** (prior-prior) tax year
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| The form is organised by **contributor** (student; student spouse; parent; parent spouse/partner), each completing their own section, consenting, and signing | `parent*`, `consentApprovalToRetrieveFederalTaxInfo`, `studentSignatureFsaId` |
| **Student Identity Information** — name, date of birth, SSN (blank if none) | `studentFirstName`, `studentMiddleName`, `studentLastName`, `studentDateOfBirth`, `studentSsn` |
| **Student Contact Information** — email, mobile phone, permanent mailing address | `studentEmail`, `studentMobilePhone`, `addressLine1`/`addressLine2`/`addressCity`/`addressState`/`addressPostalCode`/`addressCountry` |
| **Marital status**, **state of legal residence**, **citizenship** (with A-Number for eligible noncitizens) | `studentMaritalStatus`, `studentStateOfLegalResidence`, `studentCitizenshipStatus`, `studentAlienRegistrationNumber` |
| **Student Personal Circumstances** / **Homelessness Status** — the questions that establish dependency | `isGraduateOrProfessionalStudent`, `isActiveDutyOrVeteran`, `hasDependentsOtherThanSpouse`, `isOrphanWardOrFosterCare`, `isEmancipatedOrInLegalGuardianship`, `isUnaccompaniedHomelessYouth` |
| **Parent Identity / Contact Information** (dependent students invite the parent contributor) | `parentFirstName`, `parentLastName`, `parentSsn`, `parentDateOfBirth`, `parentEmail` |
| **Family Size**, **Number in College**, **Federal Benefits Received** | `familySize`, `numberInCollege`, `receivedMeansTestedBenefits` |
| **Tax Filing Status** and **manually-entered** financial items: child support received and **Assets** (cash/savings/checking, investment net worth, business/farm net worth) | `studentTaxFilingStatus2023`, `annualChildSupportReceived`, `assetsCashSavingsChecking`, `assetsInvestmentsNetWorth`, `assetsBusinessFarmNetWorth` |
| **Colleges** — up to 20 schools online (10 on paper), by Federal School Code | `federalSchoolCodes` |
| **Consent, Approval, and Signature** — FTI consent via FA-DDX is mandatory for every contributor; signature via FSA ID; Statement of Educational Purpose | `consentApprovalToRetrieveFederalTaxInfo`, `studentSignatureFsaId` |

## Modelling decisions (scope of this document)

- **FA-DDX-transferred tax values are not modelled as collected inputs.** When a
  contributor consents, federal tax information (AGI, taxes paid, untaxed
  distributions, etc.) is transferred automatically from the IRS via the FUTURE Act
  Direct Data Exchange and is **not entered** on the form. Modelling those as input
  fields would misrepresent the 2025-26 process. They are summarised in the
  `studentTaxFilingStatus2023` description and the schema `description`. Only the
  **manually-entered** financial items (assets, child support) are modelled as fields.
- **Spouse and parent-spouse/partner sub-sections** (AVG Questions 25-29 and the
  parent-spouse mirror) are represented through the contributor/consent model rather
  than as a full duplicate field set, to keep the reference document readable; the
  consent gate and signature requirement that apply to every contributor are encoded.

## Conditional requiredness (not encoded structurally in v0.2)

Several FAFSA rules are conditional and are recorded in field `description`s, not as
constraints (v0.2 has no conditional-required mechanism — tracked in
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md)):

- **Parent fields** (`parent*`) are required only for **dependent** students; the
  dependency questions in the `dependency_status` step determine this.
- **`studentAlienRegistrationNumber`** is required only when
  `studentCitizenshipStatus` is `eligible-noncitizen`.
- **Manual financial entry** applies only when FA-DDX data is unavailable
  (IRS response codes 203/206/212/214) or does not reflect current circumstances;
  **assets are always manually entered**.
- **Spouse contributor** participation is required only when the student is married
  and did not file 2023 taxes jointly with the current spouse.

## What is NOT yet independently verified

- The exact **question numbering and on-screen labels** of the live 2025-26 online
  FAFSA were not transcribed screen-by-screen; `sourceRef` numbers follow the AVG
  Chapter 2 structure and are indicative, not a verbatim capture of the web form.
- **Federal School Code** format is described, not pattern-constrained, because the
  field accepts multiple codes (or a name/address fallback); consumers should not
  rely on a single regex.
- The set of **means-tested federal benefits** and the **dependency-determination
  logic** are summarised in descriptions, not encoded as decision data.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live online FAFSA and the AVG Chapter 2,
step 3 flow), confirms the source is authoritative, resolves any discrepancy by
shipping a **new schema version** within this edition (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Editions

This is the **2025-26** edition. A new FAFSA edition is published each award year
(GSP-0005 / SPEC §5.7); editions coexist under
`registry/us/ed/federal-student-aid-fafsa/<award-year>/<version>/`. The year-agnostic
`id` (`us/ed/federal-student-aid-fafsa`) is shared across editions.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
the 2026-27 FAFSA opens late in 2025/2026 and the online form, benefit list, and
FA-DDX behaviour change between award years. Re-check the source on or before that
date and on any `source.url` change.
