# Verification record — `ph/bi/non-immigrant-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read primary source**: the Bureau
of Immigration's own Consolidated General Application Form (CGAF) PDF,
downloaded directly from `immigration.gov.ph` (HTTP 200, no login/CAPTCHA/WAF
gate) and read directly — it carries a genuine, legible text layer (confirmed
by reading the PDF natively; unlike several other sources in this registry,
no zlib/regex or pdfjs-dist/screenshot extraction was needed). It remains
`draft`, not `verified`, pending an independent second reviewer's field-by-field
pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1490](../../../../GOV-1490)). The Philippines currently has three
verticals modelled (`ph/comelec` — National ID & Civic Documents;
`ph/bir` ×2 — Taxes) but no Visa-vertical schema. The prior cycle's own
catalog note (GOV-1466, `CATALOG.md`) explicitly flagged the Bureau of
Immigration's CGAF forms (`immigration.gov.ph`) as "a genuine, unblocked,
directly downloadable candidate" not yet picked up — this document acts on
that flagged candidate, opening the Philippines' 4th vertical (Visa).

## Source examined

- **Document `(id, version)`:** `ph/bi/non-immigrant-visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bureau of Immigration (BI), Department of Justice, Republic
  of the Philippines
- **Primary source URL:** <https://immigration.gov.ph/wp-content/uploads/2025/03/BOC04.QF_.002-CGAF-FOR-NON-IMMIGRANT-VISA-SWP-AND-PWP.pdf>
- **Official document title/reference:** "Consolidated General Application
  Form for Non-Immigrant Visa, Special Work Permit and Provisional Work
  Permit", form code `BOC04.QF.002 Rev. Lev. 0`, effective 05 AUG 2024
- **Located via:** `immigration.gov.ph/forms/bi-forms-2/` ("BI Forms" listing
  page), which lists all current CGAF variants (Immigrant Visa, Non-Immigrant
  Visa/SWP/PWP, Student Visa/Special Study Permit, Extension of Temporary
  Visitor's Visa, Transfer/Amendment/Correction of Admission Status,
  Information on Applicant's Child(ren), Quota Immigrant Visa, Special Visa
  for Employment Generation) — this cycle picked the Non-Immigrant Visa/SWP/PWP
  variant as the single broadest-applicability CGAF for a first Visa-vertical
  Philippine schema.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access and extraction method

`immigration.gov.ph` returned HTTP 200 directly (no login, CAPTCHA, or WAF
challenge observed on the root domain, the `/forms/` listing pages, or the PDF
itself). The PDF has no `/AcroForm`/`/Widget` entries (it is a static,
print-and-fill form, not a fillable PDF) but a genuine embedded text layer —
read directly (not via zlib/regex or pdfjs-dist, both of which were
unnecessary here since the tool used to read the PDF renders text-layer PDFs
natively). Every field's label and section membership were read directly off
the form's own two pages (`Page 1 of 2`, `Page 2 of 2`), cross-checked against
a full-page visual render of both pages to resolve one extraction ambiguity
(see "Judgment calls" #1 below).

## What was confirmed directly (verbatim, from the source form)

- **Section I. Application Information (p.1):** Present Immigration Status,
  Type of Application (Conversion/Extension/Inclusion/Permit checkboxes), Type
  of Visa/Permit, Number of Months/Years Applied For (3 Months/6 Months/1
  Year/2 Years/3 Years checkboxes), Method of Application
  (Personal/Authorized Representative checkboxes), BI Accreditation Number,
  Name of Authorized Representative, Position in the Company/Institution.
- **Section II. Applicant's Travel Information (p.1):** Passport Number, Date
  of Latest Arrival, Expiry Date/Valid Until, Place of Issuance, Last Day of
  Authorized Stay — all with the form's own `[DD MMM YYYY e.g. 01 JAN 1990]`
  format hint.
- **Section III. Applicant's Personal Information (p.1-2):** Last/First/Middle
  Name, two rows of Other Name(s)/Alias(es), Date of Birth, Sex (M/F), Country
  of Birth, Country of Citizenship, Civil Status (Single/Separated/Married/
  Annulled/Widowed/Divorced), Height (cm), Weight (kg), Profession/Occupation,
  TIN, Contact Number(s) in the Philippines (Landline/Mobile), Residential
  Address in the Philippines (address line, Barangay, Municipality/City,
  Province+Zip), E-mail Address, Residential Address Abroad (address line,
  Subdivision/Village, City+State, Country+Zip), Name of Spouse, two rows of
  spouse Other Name(s)/Alias(es), two rows of Name(s) of Child(ren) and
  Date(s) of Birth (with the form's own note: "If the applicant has more than
  two (2) children, use Consolidated General Application Form for Information
  on Applicant's Child(ren)"), and a "Character References in the Philippines"
  block (name, address line, Municipality/City, Province+Zip).
- **Section IV. Petitioner's Information (p.2):** Spouse Name, Contact
  Number(s) (Landline/Mobile) and E-mail, Company Name, Registration Number,
  Nature of Institution (Commercial/Religious/Others [Please specify]),
  Registered Address in the Philippines, and a second Contact Number(s)
  (Landline/Mobile)/E-mail block tied to the registered address.
- **Section V. Applicant's Other Information (p.2):** Position in the
  Organization, Expiration of Contract, Alien Employment Permit (AEP) Number,
  AEP Expiry Date/Valid Until, Actual Monthly Gross Salary in Philippine
  Currency.
- **Section VI. ACR I-Card (p.2):** Alien Certificate of Registration (ACR)
  Number, Date of Issuance, Expiry Date/Valid Until, Certificate of Residence
  Number (CRN).
- **Certification and Consent (p.2):** the numbered certification paragraph
  ("I/We certify that: (1)...(4)...") and the Data Privacy Act consent
  paragraph ("I, ___, personally or through my agent/representative ___,
  voluntarily and freely consent to: (1)...(3)..."), both transcribed verbatim
  into `documents[]` as `category: attestation` entries with the exact source
  text in `statement`, per the precedent set by
  `au/asic/proprietary-company-registration`'s signed-declaration document.
- **ACR I-Card release checklist (p.2, boxed note):** "ACR I-CARD WILL ONLY BE
  RELEASED UPON COMPLIANCE/SUBMISSION OF THE FOLLOWING" — four items,
  transcribed verbatim into `documents[]`: (1) Photocopy of passport bio-page
  of the ACR I-Card holder, (2) Valid ID of either parent claiming the ACR
  I-Card, if applicant is a minor, (3) Photocopy of the BI-Accreditation ID
  card, if claimed by a travel agent or law firm, (4) Special Power of
  Attorney (SPA), if claimed by an authorized representative other than the
  parent or BI accredited entity.
- **Date [DD MMM YYYY]** field accompanying the Petitioner's/Applicant's
  signature block at the very bottom of page 2 — modelled as `dateSigned`.

## What was deliberately NOT modelled (and why)

1. **The physical "APPLICANT'S ACR I-CARD CLAIM STUB" (bottom of p.1) and the
   representative/claimant sub-block below the release checklist (bottom of
   p.2).** Both are parts of a perforated tear-off stub used only when the
   ACR I-Card is later physically claimed at a BI counter (its own Applicant's
   Name/ACR Number/Visa Type/Height/Weight/TIN restatement, plus — if claimed
   by someone other than the applicant — Name of Representative, Accredited
   Travel Agency/Law Office, BI Accreditation No., Contact No., Residential/
   Office Address, and a Claimant signature line). This is a downstream
   card-collection step, not application-filing data, and every value on the
   claim-stub restatement duplicates a field already modelled elsewhere on
   the application proper — out of scope for v1.0.0, consistent with this
   registry's convention of not modelling a form's own read-only recap/
   claim-time sections (e.g. `ae/icp/visa-single-entry-long-stay-pleasure`'s
   Review Application step).
2. **Type-specific documentary checklists** (e.g. `V-NI-005` Conversion to
   Student Visa, `V-NI-007`/`V-NI-009` Pre-arranged Employee Visa Commercial/
   Non-Commercial, `COM02.QF.SWP01`/`SWP02` Special Work Permit,
   `COM02.QF.002` Provisional Work Permit) are each separate BI-published PDF
   checklists (confirmed via `immigration.gov.ph/forms/checklist-of-
   documentary-requirements-2/`) that this CGAF form itself does not
   enumerate — inventing a single universal checklist from a different
   publication would misrepresent what this one form actually states.
   `documents[]` therefore only includes what the CGAF form itself prints
   (the ACR I-Card release checklist and the two certification/consent
   statements above), not a per-visa-type requirements list.
3. **Fee amounts.** The form itself states no fee schedule (unlike, e.g., the
   ICP/EmaraTax sources in this registry, which print an itemised fee table);
   none is modelled.

## Judgment calls / scope cuts (read before reviewing)

1. **Raw PDF text-extraction order does not match the form's visual
   layout — the visually-rendered page was treated as authoritative.** A
   first-pass, non-visual text read of page 1 surfaced address-block labels
   ("Municipality/City", "Province, Zip Code", "Subdivision/Village", "City,
   State", "Country, Zip Code") clustered together near the top of the
   extracted text, ahead of the section headings they actually belong to —
   a common PDF content-stream ordering artifact (see
   [[gov-form-pdf-extraction]] for other instances of this class of issue).
   The schema's actual field layout (which four address-line fields belong to
   "Residential Address in the Philippines" vs. "Residential Address Abroad",
   and that "Expiry Date/Valid Until" plus "Certificate of Residence Number
   (CRN)" belong to Section VI, not to the Character References block) was
   confirmed against the **visually rendered** page image, not the raw
   extraction order. A reviewer re-deriving this schema should likewise
   render the page visually (not just extract text) before trusting field
   groupings.
2. **No repeating/array field type (GSP-0009).** GovSchema v0.3 has no
   repeating-group type. Three repeating structures on the source form are
   each bounded to their first instance only: (a) the applicant's own "Other
   Name(s)/Alias(es)" (2 rows on the form → modelled as one
   `otherNameOrAlias` field), (b) the spouse's "Other Name(s)/Alias(es)" (2
   rows → one `spouseOtherNameOrAlias` field), and (c) "Name(s) of
   Child(ren) and Date(s) of Birth" (2 rows → one `childFullName`/
   `childDateOfBirth` pair) — the form's own note directs applicants with
   more than two children to a separate CGAF, which is not modelled here.
3. **No explicit required/optional markers on the source form.** Unlike some
   sources in this registry (e.g. red-asterisked required fields), this CGAF
   prints no asterisk or "(Required)"/"(Optional)" convention anywhere on its
   own two pages. `required: true` was asserted only for fields structurally
   necessary to identify the applicant and process any of the four
   application types (name, date of birth, sex, country of birth/
   citizenship, civil status, passport number/expiry/place of issuance,
   arrival/authorized-stay dates, Philippine address core fields, and the
   Section I application-type/duration/method fields) plus the date-signed
   field; every other field is `required: false`. A reviewer with access to
   BI's own internal processing checklist (not found this cycle) should
   confirm or correct this inferred required set.
4. **`methodOfApplication`/`civilStatus`-gated fields use `requiredWhen`.**
   `biAccreditationNumber` and `authorizedRepresentativeName` are gated on
   `methodOfApplication == authorized_representative`; `spouseName` is gated
   on `civilStatus == married`; `petitionerNatureOfInstitutionOtherSpecify`
   is gated on `petitionerNatureOfInstitution == other` — all per GSP-0013's
   `requiredWhen` mechanism, none independently confirmed as a mandatory
   BI-processing rule beyond the plain-English reading of the form's own
   layout (e.g. the Authorized Representative name/BI Accreditation Number
   fields sit directly beneath the Method of Application checkboxes with no
   independent statement that they are conditionally mandatory).
5. **`petitionerSpouseName` vs. company fields modelled as two coexisting,
   both-optional sub-groups, not a single mutually-exclusive choice.** Section
   IV's layout shows a "Spouse Name" field followed immediately by a Company
   Name/Registration Number/Nature of Institution block — the form does not
   state whether a petitioner is always exactly one of "an individual spouse"
   or "a company", so both sub-groups are modelled as independently optional
   rather than forced into an `exclusivityGroup`, avoiding an unstated
   business rule. A reviewer with access to BI's own filing guidance should
   confirm whether these are in fact mutually exclusive.
6. **`belongsTo` assignment on the ACR I-Card release-checklist documents is
   inferred, not stated.** The Special Power of Attorney document's `other`
   party (the representative other than a parent/BI-accredited entity) is
   tagged `responsible-party` per this registry's established convention
   (`ae/icp/visa-single-entry-long-stay-pleasure` judgment call #4); the
   parent's valid ID is tagged `other` since a parent is neither the
   applicant nor a party the spec's closed `belongsTo` vocabulary otherwise
   names.
7. **`typeOfVisaOrPermit` is an open string, not an enum.** The form's own
   box for this field is a blank free-text row; no dropdown or checklist of
   valid visa/permit codes is printed on the form itself (the actual valid
   values — e.g. 9(g), 9(f), SWP, PWP — live in BI's separate visa-code
   classification, not on this form), so no enum is asserted.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the PDF from `immigration.gov.ph` and re-read each
   cited section, confirming every field's label, section membership, and
   `sourceRef` against the actual form.
2. Confirm BI has not since published a newer form revision superseding
   `BOC04.QF.002 Rev. Lev. 0` (effective 05 AUG 2024) — check
   `immigration.gov.ph/forms/bi-forms-2/` for a higher revision level.
3. If feasible, obtain BI's own internal processing checklist or a completed
   worked example to confirm or correct the inferred `required`/`requiredWhen`
   judgment calls in items 3-5 above, and to confirm whether the petitioner
   spouse-vs-company fields are in fact mutually exclusive.

## Mock test run (phase 4)

A throwaway Node script (not committed) built a mock application — a foreign
national on a 9(a) Temporary Visitor's Visa converting to a 9(g) Pre-arranged
Employment Visa, filed personally, married to a Filipino citizen petitioner —
and checked every populated field against its `type`/`validation` constraint,
every `requiredWhen`-gated field's effective requiredness given the mock's own
answers (`methodOfApplication: personal` correctly left the Authorized
Representative fields not required; `civilStatus: married` correctly required
and populated `spouseName`), and both `crossFieldValidation` rules
(`passportExpiryDate >= dateOfLatestArrival`, `acrExpiryDate >=
acrDateOfIssuance`, the latter vacuously satisfied since the mock leaves the
ACR I-Card section empty — the applicant does not yet hold one, consistent
with a first conversion request). Result: **PASS**, 68 fields modelled, 30
populated in the mock, 6 documents, 7 flow steps.

## Review-gate correction (2026-07-06, GOV-1493)

Independent re-derivation via a fresh pdfjs-dist text-layer extraction with
`y`/`x` coordinates (not just visual row-clustering) found that the
originally-authored field set mis-sourced Section IV's single Contact
Number(s)/E-mail block and, separately, dropped the equivalent block that
does exist on the Character References sub-section:

- **Removed** `petitionerIndividualContactLandline`,
  `petitionerIndividualContactMobile`, `petitionerIndividualEmail`. Their
  `sourceRef`s claimed a Contact Number(s) (Landline/Mobile)/E-mail block
  tied to the Petitioner's "Spouse Name" row. Coordinate-level extraction of
  page 2 shows only **one** Contact Number(s)/E-mail block in Section IV,
  positioned beside "Registered Address in the Philippines" — already
  correctly captured as `petitionerCompanyContactLandline` /
  `petitionerCompanyContactMobile` / `petitionerCompanyEmail`. The
  "Individual" trio duplicated that same block under fabricated coordinates.
- **Added** `characterReferenceContactLandline`,
  `characterReferenceContactMobile`, `characterReferenceEmail`. The
  "Character References in the Philippines" block (page 2, above Section IV)
  is laid out in two columns: address fields on the left (already modelled)
  and a genuine Contact Number(s) (Landline/Mobile)/E-mail Address block on
  the right (at the same `y` range as the address fields) — present on the
  source form but absent from the original field set.

Net field count is unchanged at 68 (3 removed, 3 added). `fields[]` names,
`steps[].fields` references, and the affected `sourceRef`s were corrected in
`schema.json`; no other section showed a discrepancy against this coordinate-
level re-extraction. This is the same class of raw-order-vs-visual-layout
artifact disclosed in judgment call #1 above, just affecting a second,
previously-uncaught field grouping.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer form revision has been
published, on or before that date and on any `source.url` change.
