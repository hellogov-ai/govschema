# Verification record — `us/dos/passport-name-change-ds5504` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records
a mock-data check of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against two independent live
sources** (the process page and the fillable form PDF, itself extracted two
independent ways — see below), but the full field-by-field comparison the
practice requires has not yet been re-confirmed by a second, independent
reviewer pass. It therefore remains `draft`, not `verified`. Consumers SHOULD
treat this as an accurate, source-grounded structural reference, not a
load-bearing description of the live process.

## Why this document (GOV-678, plan GOV-664 §2 F1.8)

[GOV-664](/GOV/issues/GOV-664)'s approved federal passport/immigration wave
names Form DS-5504 as completing the U.S. Department of State passport form
family: `us/dos/passport-application-ds11` (first-time/replacement),
`us/dos/passport-renewal-ds82` (routine mail-in renewal), and
`us/dos/lost-or-stolen-passport-ds64` (lost/stolen report) were already
published; DS-5504 (name change / data correction / limited replacement) was
the one remaining sibling in this family.

## Sources examined

- **Document `(id, version)`:** `us/dos/passport-name-change-ds5504` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (DOS)
- **Primary source URL:**
  <https://travel.state.gov/content/travel/en/passports/have-passport/change-correct.html>
  ("Change or Correct a Passport") — retrieved 2026-07-02. States the
  eligibility windows (name change within one year of both events; data/print
  correction; limited-replacement) and the required attachments (current
  passport, name-change document or error evidence, one photo, no fee).
- **Official form id:** `Form DS-5504` (`DS-5504 04-2025`), OMB Control No.
  1405-0160, expiration 06/30/2028.
- **Form PDF:** <https://eforms.state.gov/Forms/ds5504_pdf.PDF> — fetched
  directly with a plain `curl` request; HTTP 200, no access block, consistent
  with the sibling `us/dos/passport-application-ds11`,
  `us/dos/passport-renewal-ds82`, and `us/dos/lost-or-stolen-passport-ds64`
  documents also sourced from `eforms.state.gov`. Extracted two independent
  ways, following the same method `us/dos/passport-renewal-ds82` v2.0.0 used:
  - **Page text**, via `pdfjs-dist`'s `getTextContent()` (all 6 pages: 4
    instruction pages + 2 application pages), giving the printed wording of
    Section A's three eligibility statements and Section C's numbered field
    instructions (items 1–9).
  - **AcroForm field structure**, via `pdf-lib`'s form-field API (79 named
    widgets: text fields, checkboxes, and radio groups), further
    cross-referenced by widget page number and rectangle position (which page
    and where on the page each widget sits) to resolve fields the printed
    instructions do not itemize by number.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## Not a time-versioned (edition) form

A name change / data correction / limited replacement is a one-time filing
tied to a specific passport and a specific error or life event, not filed
"for" a recurring period — applying the GSP-0005 §2 coexistence test, there is
no scenario where two editions of the DS-5504 data model need to coexist for
the same applicant. This document is therefore authored at the plain
(non-edition) registry path, `registry/us/dos/passport-name-change-ds5504/1.0.0/`,
the same as its sibling `us/dos/lost-or-stolen-passport-ds64`.

## What was confirmed against the source

- **Eligibility gate is "any of three", not "all of".** Unlike
  `us/dos/passport-renewal-ds82`'s six-statement "answer Yes to ALL" gate, Form
  DS-5504 Section A reads "You are eligible to use this form if you can answer
  'Yes' to **any** of the statements below" — confirmed against the printed
  instruction text and modeled as three independent boolean fields
  (`fieldRole: eligibility`) rather than a single combined condition, since an
  applicant may qualify via exactly one statement while answering "No" to the
  other two.
- **The three eligibility statements are each echoed a second time on
  Application Page 2** (items 20/22/23, as `Name Change`/`Printed
  Incorrectly`/`Limited` checkboxes) purely to route the applicant to the
  matching correction sub-section. Confirmed via widget position (all three
  Page-2 checkboxes sit directly above their respective correction fields;
  the Page-1 radio groups are the Section A eligibility statements themselves).
  Modeled as the *same* logical field, not duplicated — the same reasoning
  `us/dos/passport-renewal-ds82` v2.0.0 applied to its own page-2 identity
  repeat fields.
- **Full applicant identity, address, contact, and physical-description field
  set** (Application Page 1 and 2) — transcribed from the AcroForm widget set
  and cross-checked against the numbered Section C instructions where they
  exist (items 1–9: name, DOB, sex, place of birth, SSN, mailing address,
  other names used, email, phone). The **Permanent Address**, **Emergency
  Contact**, **Travel Plans**, and **physical description** (height/hair/eye
  color/occupation/employer) blocks have no corresponding printed instruction
  — the same gap `us/dos/passport-renewal-ds82` v2.0.0 found in its own AcroForm
  review — and are modeled from the AcroForm field names and their on-page
  position alone.
- **The six-field correction block** (Application Page 2, item 22): each of
  last name, first name, middle name, date of birth, place of birth, and sex
  marker has its own "needs correction" checkbox (`Misprinted Last Name` /
  `First Name` / `Middle Name` / `DOB` / `POB` / `Sex`) paired with its own
  corrected-value widget. Modeled as six independent
  `misprinted*`/`corrected*` field pairs, each `corrected*` field's
  `requiredWhen` referencing its own `misprinted*` checkbox — this is a more
  granular structure than DS-64's simple "list what changed" free-text
  approach, and reflects what the live AcroForm actually enumerates.
- **The name-change sub-section** (item 21, `Changed Last/First/Middle Name`)
  is required only when `nameChangedWithinOneYear` is true, per the printed
  instruction ("If yes, and your submitted passport book and/or card is less
  than one year old, please complete this section with your new name").
- **The "Acts or Conditions" attestation** (Instruction Page 4) — the
  sex-offender-registration / federal-drug-offense / outstanding-warrant
  declaration the applicant agrees to by signing — has no dedicated AcroForm
  widget (this is a print-and-sign paper form; the declaration is bound to the
  wet-ink signature, not a checkbox). Modeled as a single required boolean
  field, `actsOrConditionsDeclarationConfirmed`, with the declaration's exact
  text quoted in the field `description`, following the same pattern used for
  `us/dos/passport-application-ds11`'s `acceptanceFacilityAcknowledged` and
  `sg/ica/identity-card-reregistration`'s `declarationConfirmed`.

## Intentionally not modeled

- **`Selection`** (3 widgets, Application Page 1) and **`Additional #`
  / `Additional # 2`** (2 checkboxes each, Application Page 2). Their purpose
  could not be confidently determined from the widget name, the surrounding
  page text, or position relative to labelled fields — the same class of
  ambiguous checkbox `us/dos/passport-renewal-ds82` v2.0.0 found on its own
  form (`Additional # 1`/`Additional # 2`, identically named) and left
  unmodeled rather than guessed at. A future reviewer with a rendered view of
  the form should resolve what these represent.
- **Fees, processing times, and mailing addresses for submission** remain
  deliberately excluded as data (SPEC's guidance on fee/policy volatility),
  consistent with every other DOS document in this registry.

## Mock-data check

A representative filled-out application was checked field-by-field against
every `type`/`required`/`requiredWhen`/`validation` constraint in
`schema.json`:

```json
{
  "nameChangedWithinOneYear": true,
  "identifyingInfoPrintedIncorrectly": false,
  "passportLimitedForOtherReason": false,
  "nameOnMostRecentPassport": "Maria Alejandra Ruiz",
  "requestedNameLast": "Torres",
  "requestedNameFirst": "Maria",
  "requestedNameMiddle": "Alejandra",
  "dateOfBirth": "1990-03-14",
  "sexMarker": "F",
  "placeOfBirth": "San Diego, California",
  "socialSecurityNumber": "123456789",
  "mailingAddressLine1": "482 Harbor View Drive, Suite 210",
  "mailingAddressCity": "San Diego",
  "mailingAddressState": "CA",
  "mailingAddressPostalCode": "92101",
  "mostRecentPassportBookNumber": "123456789",
  "passportBookIssueDate": "2025-11-01",
  "changedNameLast": "Torres",
  "changedNameFirst": "Maria",
  "changedNameMiddle": "Alejandra",
  "actsOrConditionsDeclarationConfirmed": true
}
```

This models the same Maria Alejandra Torres scenario used across this
registry's other U.S. mock scenarios (e.g.
`us/dos/lost-or-stolen-passport-ds64`), here applying for DS-5504 to update her
married surname on a passport book issued eight months ago (within the
one-year window on both edges), exercising the
`nameChangedWithinOneYear: true` → `changedNameLast`/`changedNameFirst` (both
`requiredWhen`-gated) path while leaving the correction (`misprinted*`) and
limited-replacement branches at their unrequired defaults. Every populated
field satisfies its `type`/`validation` constraint; every field made required
by a true `requiredWhen` condition (`changedNameLast`, `changedNameFirst`) is
present.

Both registry validators were run against the schema document itself and pass:

```
$ node tools/validate.mjs registry/us/dos/passport-name-change-ds5504/1.0.0/schema.json
ok   registry/us/dos/passport-name-change-ds5504/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/us/dos/passport-name-change-ds5504/1.0.0/schema.json
ok   registry/us/dos/passport-name-change-ds5504/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **The `Selection`/`Additional #` checkboxes** noted above.
- **Constraint patterns** (SSN, ZIP code, E.164 phone, 2-letter state) are
  reasonable encodings consistent with the sibling DOS documents in this
  registry, not citations of a published DOS validation rule.
- **`mailingAddressState`/`mailingAddressPostalCode` are modeled `required:
  true`** even though `mailingAddressCountry` is optional (implying a foreign
  address is possible) — the same latent inconsistency already present in
  `us/dos/passport-renewal-ds82` v2.0.0, carried here for consistency rather
  than independently resolved; a future reviewer should decide the correct
  shape for both documents together.
- **The online/e-Service submission channel**, if the U.S. Department of
  State later exposes one for this form, was not observed; this document is
  sourced entirely from the paper/PDF Form DS-5504.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3
flow comparison) as an independent second pass against the live Form DS-5504
PDF, resolves the `Selection`/`Additional #` ambiguity and the
mailing-address-country inconsistency (ideally alongside
`us/dos/passport-renewal-ds82`), confirms the sources are still authoritative,
ships any discrepancy as a new schema **version** (immutability — VERSIONING
§3), and records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as the
authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date, on any `source.url`
change, or when the U.S. Department of State publishes a new Form DS-5504
revision.
