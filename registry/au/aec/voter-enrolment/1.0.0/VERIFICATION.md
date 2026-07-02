# Verification record — `au/aec/voter-enrolment` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

`draft`, not `verified`, because the live online enrolment wizard
(`enrol.aec.gov.au`) could not be reached from this environment — see "What
was not done" below. This schema is instead sourced directly from the AEC's
own downloadable, fillable PDF enrolment form, decoded field-by-field.

## Sources examined

- **Document `(id, version)`:** `au/aec/voter-enrolment` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Australian Electoral Commission (AEC), administering the
  Commonwealth electoral roll under the *Commonwealth Electoral Act 1918*,
  used jointly with state/territory electoral authorities under Joint Roll
  Arrangements.
- **`https://www.aec.gov.au/enrol/`** — "Enrol to vote". Fetched live via
  `WebFetch`, 2026-07-02 (HTTP 200). Supplies the top-level eligibility
  statement (Australian citizen, 18+, lived at the address at least one
  month; 16-17 year-olds may enrol early), the accepted identity-document
  list (driver's licence, passport, Medicare, citizenship certificate, or
  person-confirms-identity), and the existence of separate special-category
  enrolment forms (silent elector, overseas, no-fixed-address, etc.).
- **`https://www.aec.gov.au/enrol/form.htm`** — "I need a paper or PDF
  enrolment form". Fetched live (HTTP 200), 2026-07-02. Supplies the direct
  per-state/territory PDF download URLs for form ER016w.
- **`https://www.aec.gov.au/enrol/files/er016w-nsw.pdf?v=1.0`** — form
  ER016w, NSW edition (`ER016w_NSW_230123`), the **primary field-level
  source** for this document. Downloaded directly via `curl` (HTTP 200,
  1,019,854 bytes), 2026-07-02. This is a fillable AcroForm PDF; its field
  names and static label text were extracted directly from the file's
  compressed content and object streams (`zlib`-inflating every
  `stream…endstream` block, then regex-matching `/T(fieldName)` AcroForm
  field-name declarations and parenthesised text-showing operators), the
  same technique used for other glyph/stream-encoded government PDFs in this
  registry. This yielded 79 named form fields plus their surrounding label
  text (section headers "1 Your current name" … "6 Evidence of your
  identity", the citizenship-status and evidence-of-identity branch option
  labels, and the closing declaration text), quoted directly into each
  field's `sourceRef` above.
- **`https://www.aec.gov.au/enrol/files/er016w-vic.pdf?v=1.1`** — form
  ER016w, Victoria edition. Downloaded and decoded the same way, 2026-07-02,
  **specifically to cross-check that the NSW edition's fields reflect the
  nationally-standardised Commonwealth form** rather than a NSW-only
  variant. Result: 78 of 79 AcroForm field names are byte-identical between
  the two editions. The one difference — a `2Occupation` field present in
  the NSW edition and absent from the Victoria edition — is **excluded**
  from this schema for that reason (see "Modelling decisions" below).
- **`https://www.aec.gov.au/faqs/enrolment.htm`** — "Enrolment — frequently
  asked questions". Fetched live (HTTP 200), 2026-07-02. Corroborated the
  identity-document list; did not add field-level detail beyond the PDF.

## What was not done — the one honest gap

Unlike `de/finanzamt/tax-identification-number` (verified by directly
operating BZSt's unauthenticated live form with Playwright), **no live
walkthrough of the online enrolment wizard at `enrol.aec.gov.au` was
performed.** A direct fetch of that host failed at DNS resolution
(`getaddrinfo ENOTFOUND enrol.aec.gov.au`) from this environment — the same
class of network block previously encountered at `nzta.govt.nz` (see the
GB/DMV vertical's verification history), not an authentication wall as with
`nz/dia/realme-verified-identity`.

Consequently, this schema's field inventory is derived from the AEC's own
**downloadable PDF enrolment form** rather than the live online form. The
AEC's own site states the online and paper channels collect the same
information ("You can complete this form online today at www.aec.gov.au"),
and the two-state cross-check above (NSW vs. Victoria) gives confidence the
PDF's fields reflect the nationally-standardised Commonwealth form, not a
state-specific artifact — but this is one sourcing grain below a direct
field-by-field comparison against the live wizard itself (no confirmation of
on-screen field ordering within a step, client-side validation masks, or
whether the online flow presents any field the paper form does not).
`status` stays `draft`; re-verify by live walkthrough if `enrol.aec.gov.au`
becomes reachable, or by a third state/territory PDF cross-check otherwise.

## Modelling decisions

- **Comb-style digit-box dates and numbers collapsed to one field each.**
  The source form renders `dateOfBirth` (§2), `medicareCardNumber`,
  `medicareCardValidTo`, and `personConfirmingDateOfBirth` (all §6) as
  sequences of single-character AcroForm boxes (e.g. `2DOB_D`, `2DOB_DD`,
  … `2DOB_YYYY`; `6MedicareNumber1`…`6MedicareNumber10`). Each sequence is
  modelled as one logical field, consistent with this registry's existing
  comb-field convention (e.g. `nz/dia/passport-renewal-adult`).
- **`occupation` excluded.** The NSW edition of the form has a `2Occupation`
  field; the Victoria edition of the same form, decoded the same way, does
  not. Since this document models the nationally-administered AEC process
  (not a NSW-specific one) and the two editions otherwise agree on every
  other field name, `occupation` is treated as a NSW-specific addition and
  left out rather than asserted as a national requirement. Worth
  re-examining if a future review finds it is in fact collected online
  nationally.
- **`nameChanged`, `addressChanged`, and
  `postalAddressDifferentFromResidential` are inferred gating booleans, not
  named form fields.** The paper form has no literal yes/no tick-box for
  any of these three — the previous-name box, previous-address box, and
  postal-address box are each simply left blank when not applicable — but
  GovSchema's `visibleWhen`/`requiredWhen` grammar needs a field to
  condition on, so each conditional group is given an explicit boolean gate
  rather than being modelled as unconditionally-optional flat fields. This
  mirrors how `nz/dia/realme-verified-identity` models DIA's referee step,
  which is also determination-driven rather than a printed tick-box.
- **`citizenshipStatus` as a three-way enum, not two separate boolean
  branches.** The form prints "Australian citizen by birth" and "I have
  become an Australian citizen" as the two Australian-citizen options and
  "British subject who was enrolled on 25 January 1984" as a third,
  separately-boxed option; modelled as one mutually-exclusive enum plus
  per-branch conditional fields (`nameOnCitizenshipCertificate` +
  `citizenshipCertificateNumber` for the naturalised-citizen branch;
  `townOfBirth` + `birthState` + `countryOfBirth` for the citizen-by-birth
  branch; `britishSubjectName` + `britishSubjectCountryOfBirth` for the
  British-subject branch), following the field-name grouping in the
  extracted AcroForm data (`5NameOnCitizenshipCertificate`,
  `5CitizenshipCertificateNumber` vs. `5TownOfBirth`, `5BirthState`,
  `5CountryofBirth` vs. `5BritishSubjectName`,
  `5BritishSubjectCountryofBirth`).
- **`citizenshipCertificateNumber`'s identity-evidence exemption is
  documented in prose, not encoded as a condition.** The form states that
  supplying a citizenship certificate number at Question 5 exempts the
  applicant from Question 6 (`evidenceOfIdentity`) entirely. `evidenceOfIdentity`
  remains `required: true` unconditionally in this schema because the
  exemption is a business rule about a field *elsewhere* being populated,
  not a `visibleWhen`/`requiredWhen` branch on `evidenceOfIdentity`'s own
  antecedent field (`citizenshipStatus`) — the exemption applies only to one
  specific sub-case (having entered a certificate *number*, not merely
  having chosen the `became_australian_citizen` branch) and GSP-0013's
  condition grammar has no clean way to express "field X is required unless
  field Y is non-empty" against a field from an earlier, independent step.
  Documented in `citizenshipCertificateNumber`'s own description instead, in
  keeping with this registry's practice of naming a rule in prose rather
  than forcing an imprecise encoding.
- **`gender` modelled as an unconstrained one-character string, not a closed
  enum.** The AcroForm field definition confirms `MaxLen 1`, but the source
  form prints no on-page code list. The AEC publicly records `M`, `F`, or
  `X` on the electoral roll, but asserting that as a schema-level `enum`
  would go beyond what this specific form actually prints — the same
  discipline `nz/dia/realme-verified-identity` used for its own `gender`
  field.
- **`personConfirmingDateOfBirth` — flagged interpretive call.** See the
  field's own `description`: this schema's best reading, based on its
  AcroForm field name (`6DateOfBirth*`, distinct from the applicant's own
  `2DOB_*` fields) and its position alongside the confirming person's
  name/address box, is that it collects the *confirming person's* date of
  birth. The static-PDF text extraction technique used here recovers
  parenthesised text-showing strings but not guaranteed visual reading
  order, so this reading is named as an inference rather than asserted with
  full confidence — a future review with direct visual access to the
  rendered PDF page should confirm or correct it.
- **No `documents[]` member.** Enrolment carries no fee (confirmed by
  `aec.gov.au/enrol/` describing enrolment as a citizen obligation with no
  charge), and no file upload is modelled — the online channel accepts
  identity-document *numbers*, not uploaded scans, matching how this
  registry omits `documents[]` when a process only asks for reference
  numbers rather than attached files.
- **No signature/file field for the declaration.** `declarationAndConsent`
  is modelled as a single boolean, consistent with how this registry treats
  a final consent-to-terms action elsewhere (e.g.
  `nz/dia/realme-verified-identity`'s `agreesToTermsOfUse`), rather than
  a scanned-signature file field — the AEC's own site states the form can
  be completed fully online, where a wet signature is not the applicable
  mechanism.

## Out of scope

- **Special-category enrolment** — silent elector, overseas elector,
  itinerant/no-fixed-address elector, prisoner, or a declarant physically
  unable to sign — each uses a distinct AEC form not examined here. A
  candidate for future, separate schemas if this vertical is revisited.
- **16-/17-year-old early enrolment mechanics beyond the fields already
  modelled** — the AEC allows enrolment from age 16 with voting deferred to
  18; this schema does not add an age-branch beyond the citizenship/identity
  fields already collected, since the source form does not print a
  separate under-18 field set.
- **Roll removal, objection, and non-enrolment penalty processes** —
  distinct AEC/Commonwealth processes, not modelled here.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check the NSW PDF's `v=` query parameter for a version bump, and
attempt `enrol.aec.gov.au` again in case the network block has lifted; if
reachable, re-verify by direct wizard walkthrough and promote `status` to
`verified`, per `de/finanzamt/tax-identification-number`'s precedent.
