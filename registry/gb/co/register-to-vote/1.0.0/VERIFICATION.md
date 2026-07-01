# Verification record — `gb/co/register-to-vote` v1.0.0

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
recorded against the live online registration flow at gov.uk. It therefore remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `gb/co/register-to-vote` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Cabinet Office, Electoral Registration policy; applications are
  processed by local Electoral Registration Officers.
- **Primary source URL:** <https://www.gov.uk/register-to-vote>
- **Secondary source (form structure):** the ITR-E paper application ("Individual
  Electoral Registration", Standard form, England edition), a fillable PDF
  published under `assets.publishing.service.gov.uk`, linked from GOV.UK's
  "Register to vote (paper forms)" collection.
- **Official form id:** none for the online service; the equivalent paper form is
  **ITR-E** (England, Standard). GOV.UK's online service has no published form
  number of its own.
- **Retrieved / reviewed:** 2026-07-01 (both sources confirmed live at authoring
  time)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why the paper form was used as the field-level source

The gov.uk/register-to-vote landing page describes the online service in prose
("you'll be asked for your National Insurance number", "it usually takes about 5
minutes") but does not publish a field-by-field specification of its screens. The
**ITR-E** fillable PDF is the Electoral Commission's own paper equivalent of the
same underlying registration data model (name, date of birth, nationality,
National Insurance number, address) and was extracted **field-by-field from its
AcroForm structure** (widget names and tooltip text recovered from the PDF's
decompressed content streams), giving an authoritative, numbered-section field
list. This mirrors the approach already used for `gb/hmrc/self-assessment-tax-return-sa100`
(PDF-derived transcription) and `us/sss/selective-service-registration` (online
service with no form number).

## What was confirmed against the source

| Source element (ITR-E section) | Field(s) |
|---|---|
| 1 — Your address: name, address, postcode, "another address?", email, phone | `firstNames`, `lastName`, `addressLine1/2`, `addressTown`, `postcode`, `livesAtAnotherAddress`, `email`, `phone` |
| 2 — Previous address (moved in last 12 months), overseas-voter sub-question | `movedInLastYear`, `previousAddress`, `previousAddressPostcode`, `previousAddressWasOverseasRegistered` |
| 3 — Nationality (free text; "if more than one, include them all") | `nationality` |
| 4 — Your immigration status (EU Settlement Scheme continuity since 31 Dec 2020, for EU nationals other than Denmark/Luxembourg/Poland/Portugal/Spain) | `euSettledStatusContinuousSince2020` |
| 5 — Date of birth, with an age-band fallback if unknown | `dateOfBirth`, `dateOfBirthUnknownRange` |
| 6 — National Insurance number (5-part boxed entry; optional) | `nationalInsuranceNumber` |
| 7 — Previous name and date of change (optional) | `previousName`, `previousNameChangeDate` |
| 8 — The open register opt-out | `openRegisterOptOut` |
| 9 — Voting at the polling station / postal or proxy interest | `votingMethodInterest` |
| 10 — Reason if NI number / DOB / nationality cannot be given | `cannotProvideDetailsReason` |
| 11 — Declaration and today's date | `declarationAddressConfirmed`, `declarationDate` |

The gov.uk landing page separately confirmed: the ~5-minute completion time
(informational, not modelled), the age floors (16 in England/Northern Ireland, 14
in Scotland/Wales — recorded in `dateOfBirth`'s description), and the open-register
opt-out mechanism (Section 8, matches the PDF).

## Scope and jurisdiction notes

- **Great Britain only.** `gov.uk/register-to-vote` covers England, Scotland, and
  Wales. **Northern Ireland** maintains a separate, permanent electoral register
  via the Electoral Office for Northern Ireland (nidirect.gov.uk), which is a
  different service with different mechanics and is **out of scope** of this
  document. `jurisdiction.level` is `national` per the discovery catalog entry;
  a future minor version could tighten this to explicitly exclude Northern
  Ireland if that proves ambiguous to consumers.
- **Age eligibility varies by nation** (16 in England/NI, 14 in Scotland/Wales at
  the point of registration, though voting itself requires 18); this is recorded
  in the `dateOfBirth` field description rather than modelled as a per-nation
  branch, consistent with the flat v0.2 field model.
- The ITR-E is the **England** edition of the paper form; Scotland (ITR-S) and
  Wales (ITR-W) editions exist with the same field set and differing eligibility
  text. The field set was treated as nation-invariant for this document; this is
  a reasonable but not independently confirmed assumption.
- **Nationality is free text, not an enum.** The source explicitly instructs
  applicants to write in their nationality/nationalities rather than choosing from
  a fixed list, so `nationality` is modelled as `type: string`, matching the
  source's own field type.
- The **full EU member-state list** gating `euSettledStatusContinuousSince2020`
  (the source names it applies to citizens of any EU country other than Denmark,
  Luxembourg, Poland, Portugal, and Spain, which are eligible on a separate basis)
  was only partially recoverable from the retrieved source text; the field
  description states the rule qualitatively rather than asserting a closed country
  list GovSchema has not itself confirmed.

## What is NOT yet independently verified

- The exact **screen order and wording** of the live `gov.uk/register-to-vote`
  online flow were not captured screen-by-screen; `sourceRef` annotations cite the
  ITR-E paper form's section numbers, which the online service's data model is
  believed to mirror but which was not independently confirmed field-by-field.
- Constraint patterns (National Insurance number, UK postcode, phone) reuse
  patterns already established elsewhere in the registry
  (`gb/hmrc/self-assessment-tax-return-sa100`) for consistency, not citations of a
  published Cabinet Office validation rule.
- The address model splits the source's single free-text address block into
  `addressLine1`/`addressLine2`/`addressTown`/`postcode`, per registry convention;
  this is a GovSchema normalization, not a 1:1 transcription of the source form.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live `gov.uk/register-to-vote`
online flow specifically, step 3 flow), confirms the source is authoritative,
resolves any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
