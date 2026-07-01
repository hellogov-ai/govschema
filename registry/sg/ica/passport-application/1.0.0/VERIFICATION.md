# Verification record — `sg/ica/passport-application` v1.0.0

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
recorded, because the domestic MyICA e-Service flow is Singpass-authenticated
and has no published field-by-field specification. It therefore remains
`draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `sg/ica/passport-application` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Immigration & Checkpoints Authority (ICA), Singapore
- **Primary source URL:** <https://www.ica.gov.sg/documents/passport/apply>
- **Official form id:** IMM(E)11, "Application for Singapore Biometric Passport Submitted Overseas"
- **Form source URL:** <https://www.ica.gov.sg/docs/default-source/ica/forms/forms_form_imme_11_os.pdf> (fetched directly as a real PDF, HTTP 200; a `?sfvrsn=` cache-busted variant of the same path returned a stale 404 HTML error page, so the plain path without the query string was used)
- **Supporting sources:**
  - <https://www.ica.gov.sg/photo-guidelines> (online photo dimensions, formats, size limit)
  - <https://www.mfa.gov.sg/-/media/Images/MFA/OverseasMission/Xiamen-CN/Consular-Services/Application-of-Singapore-Biometric-Passport/forms_form_imme_11_os.pdf> (an overseas-mission mirror of the same form, useful if `ica.gov.sg`'s own copy moves)
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Why a paper form, when the primary channel is online

Singapore's own guidance states residents apply exclusively online via MyICA
(Singpass login); citizens residing overseas may use the same online e-Service
**or** submit IMM(E)11 in person at a Singapore Overseas Mission. IMM(E)11 is
therefore not this schema's primary channel, but it is the only place ICA
publishes the passport application's data fields in an independently
inspectable form — the same "no form for the online flow, so ground the fields
in the closest inspectable analogue" situation as `gb/dvla/vehicle-tax` and
`ie/dfa/passport-renewal-adult`, except here a genuine paper analogue exists
and was decoded directly (PDF `stream`/`endstream` blocks were
zlib-inflated and their parenthesized `Tj`/`TJ` strings concatenated; see
[gov-form-pdf-extraction practice notes] for the general method). The online
apply page's own "Documents Required", "Fees", and "Photo Guidelines" sections
were used to confirm the online e-Service collects the same underlying
particulars, reason for applying, and payment step as the paper form.

## Modelling decision: one document covers first-time, renewal, and replacement

Unlike the US/GB/IE convention in this registry of authoring a first-time
application and a renewal as separate documents, Singapore's own "Apply for
Passport" page and IMM(E)11 both present first-time application, renewal, and
replacement (lost/damaged/pages-full) as **one flow**, distinguished only by
the applicant's answer to a single reason question. Splitting this into
separate documents would not match the live source's own structure
(source-of-truth fidelity), so `applicationReason` carries that distinction
inside a single schema instead.

## Modelling decision: scoped to applicants aged 16 and above

IMM(E)11 Part II(e) has a distinct parent/legal-guardian consent block "to be
completed by parent/legal guardian of applicants below 16 years old" (guardian
name, NRIC number, and a separate consent statement). Rather than bolt a
partially-confirmed minor sub-flow onto this version, this document is scoped
to applicants 16 and above and the guardian-consent branch is left for a future
minor-specific version — the same "clean scope boundary + note" pattern used in
`gb/hmpo/passport-application-first-adult` (paper-channel exclusion) and
`gb/dvla/driving-licence-renewal-photocard` (identity-evidence branch
exclusion).

## What was confirmed against the source

- **The four reasons for applying** (`applicationReason`): first-time, page
  expiring/expired, pages full, lost, damaged, other — cross-checked between
  the apply page's "You may apply for a passport online if" bullets and
  IMM(E)11 Part II(d)'s checkbox list, which matched except that IMM(E)11 has
  no first-time checkbox (a person replacing an existing passport is IMM(E)11's
  only audience for that question).
- **Full particulars block** (`fullName`, `identityDocumentType`,
  `identityDocumentNumber`, `dateOfBirth`, `placeOfBirth`, `sex`, `address`,
  `mobileNumber`, `homeTelephoneNumber`, `email`) — transcribed directly from
  IMM(E)11 Part I's decoded PDF text. `identityDocumentType`'s three values
  (NRIC/BC/CC) are the form's own "NRIC/BC/CC No." label, expanded into an
  explicit enum plus a separate number field per this registry's convention
  (see `de/bmi/residence-registration`'s `identityDocumentType`), rather than
  left as a single ambiguous string.
- **Other-citizenship declaration** (`hasOtherCitizenship`,
  `otherCitizenshipCountry`) — IMM(E)11 Part II(c), a Yes/No plus
  "state country/place" text box.
- **Declaration statement** (`declarationInformationTrue`, `declarationDate`)
  — IMM(E)11 Part II(a) and the signature/date line, modelled as boolean +
  date per this registry's convention (see `gb/co/register-to-vote`'s
  `declarationAddressConfirmed`/`declarationDate`).
- **Photo specification** (`photo`) — confirmed from the dedicated Photo
  Guidelines page (Q3): 400×514 pixels for e-Service upload; jpg, jpeg, heic,
  heif, png; max 8MB; no editing/enhancement.
- **Online payment methods** (`paymentMethod`) — confirmed from the apply
  page's "Fees" section, which lists the accepted online methods by name
  (Visa/MasterCard, AMEX, named-bank internet direct debit, PayNow).
- **Fee amounts and processing times were deliberately excluded from
  `fields`** (same convention as `us/dos/passport-renewal-ds82` and
  `ie/dfa/passport-renewal-adult`): S$70 online / S$80 over-counter, plus
  non-refundable replacement penalties, change independently of the data model
  and are out of scope; consumers should read them from the live source.
- **The IMM(E)11 "For Official Use" block (Part III)** — system outcome,
  passport clerk/officer sign-off, dates of issue/expiry — is agency-internal
  output, not applicant-submitted data, and is correctly not modelled.

## What is NOT yet independently verified

- **Whether the domestic MyICA online screens collect exactly this field set,
  or additionally pre-fill some particulars via Singpass/MyInfo.** A general
  web search suggests MyICA supports auto-populating some particulars from
  Singpass, but no ICA-published, field-by-field confirmation of *which*
  fields are pre-filled (versus applicant-entered) was found. Unlike
  `us/ed/federal-student-aid-fafsa`'s FA-DDX (where specific tax fields are an
  authoritative pull the applicant never enters or overrides, and are
  therefore excluded from `fields` entirely), a Singpass/MyInfo prefill is
  editable convenience auto-fill of data the applicant still submits, so this
  version keeps the full particulars set as fields rather than guessing which
  subset to exclude. Confirming the exact prefill behaviour against the live
  authenticated screens is the leading candidate gap for the next review pass.
- **`mobileNumber`/`homeTelephoneNumber` format** — no explicit numbering
  pattern (e.g. 8-digit Singapore mobile) was encoded; only a generous
  `maxLength` bound, since the form shows blank lines rather than a boxed
  format.
- **Whether `email` is compulsory on IMM(E)11 itself** — the form's own layout
  does not visibly mark the email line as required, but the apply page states
  outcome notification is by email for both local and overseas processing, so
  it is modelled as required here; this should be re-checked against the live
  e-Service screen.
- **The minor (under-16) guardian-consent branch** (IMM(E)11 Part II(e)) is
  out of scope for this version — see "Modelling decision" above.
- **The over-the-counter (in-person, ICA Services Centre) channel** and its
  S$80/cash-inclusive payment options are out of scope; this document
  describes the online MyICA e-Service and its overseas paper-form field
  analogue only.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer with an active
Singpass and MyICA account applies `manual-source-review-v1` (Procedure step 2
field-by-field comparison against the live authenticated screens, step 3 flow
comparison), resolves the open items above (Singpass/MyInfo prefill behaviour
in particular), ships any resulting change as a new schema version per
[VERSIONING.md](../../../../../VERSIONING.md) (immutability — never edit a
published version), and records the outcome here with `status: verified` and a
current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays
as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): passport application is a fee/policy-sensitive process, and this
document in particular has open items around channel and prefill behaviour.
Re-check the source on or before that date and on any `source.url` change.
