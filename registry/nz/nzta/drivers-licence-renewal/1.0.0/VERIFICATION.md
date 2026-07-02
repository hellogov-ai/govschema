# Verification record — `nz/nzta/drivers-licence-renewal` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the official DL1 form listed below. It remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `nz/nzta/drivers-licence-renewal` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** NZ Transport Agency Waka Kotahi ("NZTA").
- **Primary source:** DL1, "Application for new, reissue or renewal of driver
  licence" (12/25 edition) —
  <https://www.nzta.govt.nz/assets/resources/application-for-driver-licence-dl1/docs/dl1.pdf>.
  `nzta.govt.nz` returns an Incapsula WAF challenge page to direct fetch
  tooling in this sandbox (the same class of block recorded for
  `canada.ca` in `ca/cra/individual-income-tax-and-benefit-return-t1`'s
  VERIFICATION.md), so the form was retrieved from its most recent Wayback
  Machine capture instead:
  <https://web.archive.org/web/20260525034142/https://www.nzta.govt.nz/assets/resources/application-for-driver-licence-dl1/docs/dl1.pdf>
  (captured 2026-05-25, a current capture of what the source review confirmed
  is the same 12/25 edition NZTA currently publishes — this is not a stale
  Wayback fallback the way the CA T1 schema's 2022-edition source was).
- **Secondary source (non-gating field descriptions only):** "New Zealand
  driver licence classes: what you can drive" —
  <https://www.nzta.govt.nz/driver-licences/getting-a-licence/licences-by-vehicle-type/what-you-can-drive>
  — also WAF-blocked to direct fetch in this sandbox; summarized via
  automated fetch-and-summarize tooling rather than a direct extraction (a
  weaker method than the primary source's pdfjs-dist extraction below). Used
  only to write the non-gating, informational part of `licenceClassAppliedFor`'s
  `description`; the schema does not assert vehicle-weight thresholds as its
  own claim, and the field's `validation.enum` (the numbers 1-6) is confirmed
  directly from the DL1 form itself, not from this secondary source.
- **Field extraction method:** DL1 is a **static (non-fillable) PDF** — unlike
  `ca/on/registration/business-incorporation`'s dynamic XFA form, `pdfjs-dist`'s
  `getFieldObjects()` returns `null` and there is no `/AcroForm` or `/XFA`
  marker in the raw PDF bytes. Field names, numbering, and checkbox option
  labels were extracted from the page's text layer with position (x/y)
  data preserved, then reconstructed into each numbered question's option set
  by reading left-to-right, top-to-bottom within each question's y-band. This
  is the same general prose/print-form extraction discipline as
  `ca/on/mto/drivers-licence-renewal`, but applied to a genuine downloadable
  government PDF form rather than a guidance web page.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) / `documents[]` entry |
|---|---|
| §1, "New Zealand driver licence number (if you know it)" | `licenceNumber` |
| §2, "Surname" / "First name" / "Middle names" | `surname`, `firstName`, `middleNames` |
| §3, "Are the names on this form different to any of the names on your ID?" / "Previous name" | `namesDifferFromId`, `previousName` |
| §4, "Gender" | `gender` (see caveat below) |
| §5, "Would you be willing to donate organs in the event of your death?" | `organDonationWillingness` |
| §6, "Date of birth" | `dateOfBirth` |
| §7, "Place of birth" — Town/city / Country | `placeOfBirthTown`, `placeOfBirthCountry` |
| §8, "If you have one of these, this is all you need" (NZ photo driver licence or NZ passport) vs. "you'll need one primary ID and one supporting ID" | `identityPathway`, `primaryIdentityDocument`, `supportingIdentityDocument` |
| §8, list of 9 primary ID types (Refugee travel document, NZ passport, Overseas passport, Firearms licence, Citizenship certificate, Emergency travel document, Full birth certificate issued from 1 Jan 1998, Certificate of identity (Passports Act 1992), Certificate of identity (Immigration Act 2009)) | `primaryIdentityDocument.acceptedTypes` |
| §8, list of 10 supporting ID types (Kiwi Access/18+ card, Community services card, SuperGold card, Veteran SuperGold card, Student photo ID card, Employee photo ID card, Electoral roll record, Inland revenue number, Utility bill or bank statement, Overseas driver licence, Steps to freedom form) | `supportingIdentityDocument.acceptedTypes` |
| §8, "If neither of your forms of ID has a photo: Identity referee document attached (DL26)" | `neitherIdentityDocumentHasPhoto`, `identityRefereeDocumentDL26` |
| §9, "Name change document" and its 7 accepted types | `nameChangeDocument` |
| §10/§11, "Physical address" / "Mailing address (if different from above)" | `physicalAddress`, `mailingAddress` |
| §12, "Address printed on licence" — No/Yes, Physical address or Mailing address | `addressPrintedOnLicence`, `addressPrintedOnLicenceSource` |
| §13, "Mobile phone" / "Other phone" | `mobilePhone`, `otherPhone` |
| §14, "Email address" | `emailAddress` |
| §15, "What type of licence are you applying for?" — Class 1-6 grid, with Restricted offered only for Class 1 and Class 6 | `licenceClassAppliedFor`, `licenceStageAppliedFor` |
| §16, "Do you have a medical condition or disability that could affect your ability to drive safely?" / "Has that condition or disability affected your ability to drive safely in the last 5 years?" | `hasMedicalConditionAffectingDriving`, `medicalConditionAffectedDrivingLast5Years` |
| Page 3, "What to bring" — medical certificate required for class 2/3/4/5 or turning 75+ or an affecting condition in the last 5 years | `turning75OrOlderAtRenewal`, `medicalCertificate` (`requiredWhen` combines all three triggers with `any`) |
| Page 2, "Declaration" (three declaration sentences, verbatim) | `declarationAttestation` |

## What is NOT independently confirmed / out of scope

- **`gender`'s selectable options.** The DL1 form's own gender question
  renders its answer options as graphical checkbox elements the pdfjs-dist
  text layer did not capture as readable text (unlike every Yes/No question
  on the form, which the extraction captured cleanly as "No"/"Yes" text
  items). Rather than guess a plausible enum (e.g. assuming a
  male/female/another-gender set from general knowledge of NZ government
  forms), this field is modelled as a free-text `string` with no `enum` —
  the same discipline `ca/on/mto/drivers-licence-renewal` applied to its
  `licenceNumber` format and `ca/on/registration/business-incorporation`
  applied to `directorAddressForService`.
- **Fee amounts.** DL1's own pages state only that fees vary by application
  type and licence class ("The fee will depend on the type of application
  you're making"); no fee schedule is transcribed and no `documents[]`
  `payment` entry is modelled, consistent with every other schema in this
  registry.
- **Licence class vehicle-weight definitions.** DL1 itself lists only class
  numbers 1-6, with no on-form definition of what each class covers. This
  schema's `licenceClassAppliedFor.description` briefly summarizes NZTA's
  separate "what you can drive" guidance page for context, sourced via
  weaker fetch-and-summarize tooling (see Sources above) rather than a
  direct extraction, and is explicitly not asserted as this schema's own
  authoritative claim — a consumer needing exact weight thresholds should
  follow the cited nzta.govt.nz page directly.
- **The `licenceStageAppliedFor` / `licenceClassAppliedFor` pairing.** The
  source form's own grid restricts "Restricted" to Class 1 and Class 6 only
  (Classes 2-5 offer only Learner/Full). The v0.3 field model has no
  mechanism to express a conditional enum restriction between two `enum`
  fields (`crossFieldValidation`, §8.3, supports `compare`/`requireAbsent`/
  `requirePresent`, not a value-subset rule keyed on another field's value),
  so this constraint is documented in `licenceStageAppliedFor.description`
  as prose guidance rather than enforced structurally. Flagged as a
  potential future `crossFieldValidation` or richer-enum extension
  ([GSP-0003], labelled enum options, is the closest tracked proposal but
  does not cover this case either).
- **The driver licensing agent network itself.** DL1 is submitted in person
  to a driver licensing agent (a third-party network NZTA accredits), not
  online to NZTA directly. This schema models the form's fields only, not
  the agent-network channel, appointment booking, or in-person eyesight
  check the source pages describe.
- **Test/lapse scenarios and the 80-years-and-over program.** DL1 covers new,
  reissue, and renewal applications in one form; a licence lapsed long
  enough to require a vision/written/road test, and the separate biennial
  80-years-and-over renewal considerations beyond the `turning75OrOlderAtRenewal`
  medical-certificate trigger, are out of scope for this version — consistent
  with how `ca/on/mto/drivers-licence-renewal` scoped out its own 80+ program
  and test-required paths via eligibility gates. This schema does not use
  GSP-0013 `transitions`/`exitReason` gates at the step level because DL1's
  own fields don't describe an online eligibility screen the way Ontario's
  and GB's driving-licence renewal services do; scope is instead bounded by
  the field list itself and this document's `description`.

## Scope and jurisdiction notes

- Driver licensing in New Zealand is a single national authority (NZTA),
  unlike the provincial/state model in `ca/on/mto/drivers-licence-renewal`
  and `au/nsw/service-nsw/driver-licence-renewal` (still an open candidate).
  It pairs with `us/ca/dmv/drivers-license-renewal`,
  `gb/dvla/driving-licence-renewal-photocard`, `ie/dttas/driving-licence-renewal`,
  and `ca/on/mto/drivers-licence-renewal` to show the same process across
  five jurisdictions.
- This closes the **NZ** DMV catalog candidate identified in the GOV-474
  cycle. Remaining open DMV candidates: AU (NSW), DE, SG.
- `documents[]` ([GSP-0014]) is used for every ID/evidence/attestation
  requirement rather than modelling the ID-type lists as `enum` fields — the
  same pattern `ca/on/registration/business-incorporation` and
  `sg/acra/sole-proprietorship-registration` used for their own
  identity/attestation requirements.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms this record against a
freshly retrieved live copy of DL1 once `nzta.govt.nz` is reachable from the
review environment (or via an official NZTA-published copy through another
channel), specifically re-checking: the gender question's actual selectable
options (to decide whether a closed `enum` can replace the current free-text
`gender` field), and the exact fee schedule if it is ever intended to be
modelled. Ship a new schema version if discrepancies are found
(VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
