# Verification record — `us/fl/miami-dade/clerk/marriage-license-preapplication` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

This is GovSchema's **first county/municipal-level schema** — the first to use
the `us/<subdivision>/<locality>/<authority>/<process>` `id` shape and the
`jurisdiction.locality` member, both landed by [GSP-0021](../../../../../../../spec/proposals/0021-municipal-county-jurisdictions.md)
(GOV-667). It models the Miami-Dade County Clerk of the Courts and
Comptroller's online marriage-license **pre-application** — the data-collection
step both prospective spouses complete online before appearing together, in
person, at a Clerk's office to sign, pay, and receive the actual Florida
marriage license (Florida law does not permit fully remote issuance; see
"Access notes").

## Access notes

- The live pre-application form, `https://www2.miamidadeclerk.gov/mlsweb/PreApplication`,
  was fetched directly (plain HTTP GET, no login, no session/cookie, no
  bot-block or WAF challenge — HTTP 200). It is a server-rendered ASP.NET Core
  Razor/Blazor page (`MLSWebMVC8`), so the full field set is present in the
  initial HTML response with no client-side rendering step needed to read it.
- The entire form's HTML was read directly: every `<input>`/`<select>`/radio
  group's `name` attribute, its `<label>`/`<strong>` visible text, `placeholder`
  text, and its jQuery-unobtrusive-validation attributes
  (`data-val-required`, `data-val-regex`/`data-val-regex-pattern`,
  `data-val-length`/`data-val-length-max`, `data-val-range-min`/`-max`,
  `data-val-equalto`/`-other`) were extracted verbatim from the raw response
  body, not inferred or summarized by an intermediate tool. Each field's
  `sourceRef` in `schema.json` quotes the specific `name` attribute and the
  validation attribute(s) that back its `type`/`required`/`validation` claims.
- The three-card structure (`Spouse's Info for the Online Pre-Application`
  ×2, then `General Information`) and the exact field ordering within each
  card were read directly from the DOM order, not reconstructed from a
  screenshot or description.
- The form was **not submitted** (no POST performed). This was a deliberate
  choice to avoid creating any real record in the Clerk's system, consistent
  with this registry's convention of never transacting against a live
  government system as part of authoring a schema. Consequently:
  - The content of whatever screen the form's own "Next" button leads to
    (very likely a review/confirmation step and then a handoff to the
    separate appointment-scheduling flow at
    `www2.miamidadeclerk.gov/mlsweb/ApptApplication`, per the site's own
    navigation) was **not observed**.
  - Any server-side validation beyond the client-side `data-val-*` attributes
    captured above (e.g., a real-time lookup, similar to how South Africa's
    IEC VoterPortal rejects a syntactically-valid-but-unregistered ID number —
    see `za/iec/voter-registration`'s VERIFICATION.md) was not tested, since
    testing it would require submitting the form.
- The Clerk's own informational page, `https://www.miamidadeclerk.gov/clerk/marriage-licenses.page`
  ("Marriage Licenses"), was fetched directly (HTTP 200) as a second live
  source. It supplied the context the pre-application form itself does not
  restate inline: the accepted-ID-document list, the SSN/alien-registration
  substitution rule, the previous-marriage disclosure requirement, the 3-day
  waiting-period and premarital-course fee schedule ($86 standard / $61 with
  a completed course), the in-person joint-appearance requirement, and
  accepted payment methods. These are cited in `documents[].sourceRef` and in
  several fields' `description`/`sourceRef`.
- Florida Statutes ss. **741.04** ("Issuance of marriage license") and
  **741.0305** ("Marriage fee reduction for completion of premarital
  preparation course") were checked directly at `leg.state.fl.us` to confirm
  the statutory basis for the SSN-affidavit requirement, the 3-day waiting
  period (waivable for a completed premarital course, for non-residents, or
  for good cause/hardship), and the $32.50 fee reduction tied to the course
  certificate. These statutes are cited in field/document descriptions as
  context, not modelled as their own fields — the pre-application form itself
  does not ask the applicant to select a waiting-period-waiver reason; it
  only records `spouse1TakenPremaritalClass`/`spouse2TakenPremaritalClass`
  (Yes/No) and leaves any waiver/hardship determination to the in-person
  Clerk's-office step.
- The `www2.miamidadeclerk.gov/mlsweb/LicenseSearch`, `.../ApptApplication`,
  `.../CerAppt`, and `.../ProviderList` endpoints were identified (linked from
  the Clerk's informational page) but **not** modelled — they are distinct
  transactions (searching existing recorded licenses, scheduling the
  in-person application/ceremony appointment, and browsing premarital-course
  providers), out of scope for a schema of the pre-application's own data
  collection, per this schema's `description`.

## Sources examined

- **Document `(id, version)`:** `us/fl/miami-dade/clerk/marriage-license-preapplication` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Miami-Dade County Clerk of the Courts and Comptroller
- **Primary source (live, directly reached, no block, full field/validation extraction):**
  <https://www2.miamidadeclerk.gov/mlsweb/PreApplication>
- **Secondary source (live, directly reached, no block):**
  <https://www.miamidadeclerk.gov/clerk/marriage-licenses.page>
- **Cross-check (directly retrieved via leg.state.fl.us):**
  Florida Statutes s. 741.04, "Issuance of marriage license"
- **Cross-check (directly retrieved via leg.state.fl.us):**
  Florida Statutes s. 741.0305, "Marriage fee reduction for completion of
  premarital preparation course"
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Live PreApplication form, First Spouse's Info card — name/suffix/maiden-surname inputs and their `data-val-*` attributes | `spouse1FirstName`, `spouse1MiddleName`, `spouse1LastName`, `spouse1Suffix`, `spouse1MaidenSurname` |
| Live PreApplication form — DOB input, mm/dd/yyyy regex | `spouse1DateOfBirth` |
| Live PreApplication form — State/Country of Birth dropdown | `spouse1BirthPlace` |
| Live PreApplication form — "Do you have a U.S. Social Security Number?" radio group + tooltip | `spouse1HasSocialSecurityNumber` |
| Live PreApplication form — Residence City/County/State inputs + tooltips | `spouse1ResidenceCity`, `spouse1ResidenceCounty`, `spouse1ResidenceState` |
| Live PreApplication form — Identification Type/Number/Verify Number, `data-val-equalto` | `spouse1IdentificationType`, `spouse1IdentificationNumber`, `spouse1IdentificationNumberConfirmation` |
| Live PreApplication form — Number of this Marriage input, range 1–99 | `spouse1MarriageNumber` |
| Live PreApplication form — "How did the Spouse's Last Marriage End" dropdown + "only required if ≥2" tooltip | `spouse1PreviousMarriageEndedType` |
| Live PreApplication form — Date Marriage Ended input | `spouse1PreviousMarriageEndedDate` |
| Live PreApplication form — "Have you taken a premarital Class" radio group + tooltip | `spouse1TakenPremaritalClass` |
| Live PreApplication form — Gender radio group (Male/Female) | `spouse1Gender` |
| Live PreApplication form, Second Spouse's Info card (identical structure/attributes to First Spouse's) | all `spouse2*` fields (mirror of the `spouse1*` set above) |
| Live PreApplication form, General Information card — Mailing Address/City/State-or-Country/Zip inputs | `mailingAddress`, `mailingCity`, `mailingStateOrCountry`, `mailingZipOrPostalCode` |
| Live PreApplication form — US Phone Number input (no `data-val-required` present, unlike every other General Information field) | `mailingPhoneNumber` |
| Live PreApplication form — Email Address/Email Confirmation inputs, `data-val-equalto` | `mailingEmail`, `mailingEmailConfirmation` |
| Clerk 'Marriage Licenses' page — accepted photo-ID list | `spouse1PhotoIdDocument`, `spouse2PhotoIdDocument` |
| Clerk 'Marriage Licenses' page — premarital-course fee reduction and provider directory; s. 741.0305 | `premaritalCourseCertificate` |
| Clerk 'Marriage Licenses' page — fee schedule ($86/$61) and accepted payment methods | `feePayment` |

## What is NOT yet independently verified

- **Anything past the "Next" button.** The pre-application's own multi-step
  continuation (a review/confirmation screen, appointment-scheduling handoff,
  or both) was not observed, since the form was never submitted. If a real
  submission surfaces additional fields, a different validation rule, or a
  different flow than the three cards modelled here, that is a **new schema
  version**, not a correction to this one.
- **Whether any server-side check beyond the client-side `data-val-*`
  attributes exists** — e.g., whether `spouse1IdentificationNumber` is checked
  against a real SSA/DHS/passport lookup the way South Africa's IEC VoterPortal
  checks its ID number in real time (`za/iec/voter-registration`). This
  pre-application's client-side validation was read directly and modelled
  faithfully; no claim is made about server-side behavior beyond it.
- **Whether the in-person appearance, fee payment, and photo-ID check are
  exactly as described on the Clerk's informational page** — `documents[]`
  in this schema (photo ID ×2, premarital-course certificate, fee payment) is
  sourced entirely from the Clerk's static "Marriage Licenses" page, not
  observed at an in-person counter (which, by definition, cannot be
  reached by an automated review).
- **The exact wording and mechanics of the statutory 3-day-waiting-period
  waiver for non-residents/hardship/good-cause** (s. 741.04) — the
  pre-application form itself does not ask about residency status or
  hardship as a distinct field; only Florida residency (inferable from
  `spouse1ResidenceState`/`spouse2ResidenceState` being "Florida," which this
  form does not distinguish from residency-for-waiting-period purposes) and
  premarital-course completion are captured. Documented as a known
  under-modelled nuance in `spouse1ResidenceState`'s `description`, rather
  than inventing a waiver-reason field with no direct source.
- **Whether `spouse1BirthPlace`/`spouse1ResidenceState`/`mailingStateOrCountry`'s
  dropdown option lists are identical to one another** — all three were
  observed to be long (~250-option) US-states-then-countries dropdowns with
  matching visible option text where sampled, but a full byte-for-byte diff
  of all three `<select>` option lists was not performed.
- **Whether a genuinely disqualifying answer (e.g., both applicants being
  close relatives, or an applicant under 18 without parental consent per s.
  741.0405) is asked anywhere in this online flow.** No such question appears
  on the pre-application form itself; Florida's relationship/age restrictions
  appear to be enforced only at the in-person stage per the sources examined.
  Not modelled as a fabricated field.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2) by completing an actual
end-to-end submission with two genuinely fabricated (non-real) applicants —
confirming the "Next" screen's content, any server-side validation, and
whatever flow follows — then resolves any discrepancy from this version's
fields by shipping a **new schema version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Test run

A mock pre-application packet
(`conformance/us/fl/miami-dade/clerk/marriage-license-preapplication/1.0.0/application-packet.json`)
models two fabricated applicants — one on a second marriage (exercising the
`spouse1MarriageNumber`/`spouse1PreviousMarriageEndedType`/`spouse1PreviousMarriageEndedDate`
conditional fields and the `premaritalCourseCertificate` conditional document)
and one on a first marriage, both without a Social Security Number (exercising
the alien-registration identification path). Independently checked with a
from-scratch field-by-field validator (required/`requiredWhen` presence,
`validation.pattern`/`minLength`/`maxLength`/`minimum`/`maximum`/`enum`,
`crossFieldValidation` equality checks): all required fields collected, all
three `crossFieldValidation` rules (`spouse1IdentificationNumberMatchesConfirmation`,
`spouse2IdentificationNumberMatchesConfirmation`, `mailingEmailMatchesConfirmation`)
satisfied, 0 violations. A mutation test confirmed the checker actually
discriminates: setting `spouse2IdentificationNumberConfirmation` to a mismatched
value is correctly flagged by the `spouse2IdentificationNumberMatchesConfirmation`
rule, and dropping `spouse1PreviousMarriageEndedType` while
`spouse1MarriageNumber` is `2` is correctly flagged as a missing conditionally-required
field.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any `source.url`
change, and sooner if the Clerk's office publishes a fee-schedule change (fees
are set by the Clerk and periodically adjusted) or a redesigned pre-application
form.
