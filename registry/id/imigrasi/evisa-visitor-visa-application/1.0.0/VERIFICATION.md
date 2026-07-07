# Verification record — `id/imigrasi/evisa-visitor-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1581**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

CATALOG.md's own "Known Gaps" record flagged Indonesia's Visa vertical as
"ready-to-author backlog for an immediate follow-up cycle" (GOV-1567): the
official manual is well-sourced for the visa-type-selection wizard and
payment/verification/issuance steps, but its own "Fill Form → Personal
Information" screen renders only as an unlabelled wireframe (dashed
placeholder boxes, no field labels, at any resolution the manual's own
screenshot allows) — confirmed again this cycle by directly re-reading the
same PDF (see "Source 1" below). Rather than treat that gap as settled, this
cycle searched independently for a second source that might resolve it, and
found one: a US college's own study-abroad/international-programs office
publishes a genuine walkthrough of the same live platform, filled with a real
worked example, showing every "Fill Form" field's actual on-screen label (see
"Source 2" below). Combining both closes the gap the prior cycles left open.

Before committing to this candidate, this cycle also spot-checked the
registry's current jurisdiction/vertical coverage (19 jurisdictions, DMV and
Passport near-complete) and confirmed Indonesia's Visa gap remained the
single strongest, best-evidenced, not-yet-superseded candidate on the "Known
Gaps" list.

## Sources examined

### Source 1 (primary `source`, process/wizard structure)

- **Authority:** Directorate General of Immigration (Direktorat Jenderal
  Imigrasi)
- **Document:** "User Manual e-Visa"
- **URL (directly retrieved, HTTP 200, no login):**
  <https://kemlu.go.id/files/submenu/additional_file/1733965620675a373403bfd_User_Manual_E___Visa_Indonesia.pdf>
  — a 19-page official guide, hosted unauthenticated on the Ministry of
  Foreign Affairs' (Kemlu) own file server. The live platform itself,
  `evisa.imigrasi.go.id`, is WAF-blocked to a direct unauthenticated fetch:
  every page tried this cycle (`/`, `/web/application_bvk_step`,
  `/front/info/evoa`) returned HTTP 403 "Request blocked" from both `curl`
  and `WebFetch`, matching the "no login/CAPTCHA/**WAF**" caveat already on
  record for this gap.
- **Extraction method:** the `Read` tool renders PDFs natively (multimodal);
  used directly, page by page. No pdfjs-dist/zlib extraction was needed —
  every page's screenshot and prose was legible directly.
- **Retrieved / reviewed:** 2026-07-07
- **What it confirms:** the overall wizard shape (5-box visa-type-selection
  step: passport country → main/sub purpose → visa type → length of stay),
  the passport/photo upload step's own terms-and-conditions text, the
  "Fill Form" step's section headings (Visa Type Information, Payment Method,
  Personal Information, Document Requirement) as blank wireframe placeholders
  only, the Review step, both payment channels (Credit Card and Simponi) with
  their own on-screen radio option labels, the verification/decision states
  (Pending/Reject/Recommended/Decision), and the visa-issuance/download step.
  Its own worked example follows a **Golden Visa/Investment** pathway (p.10:
  "sub purpose... Golden Visa", "choose a visa... Investment", "planning to
  stay... Individual Investor", "Length of Stay... 5 years") — a different,
  more complex top-level branch than this document's scope (see judgment call
  1 below).

### Source 2 (field-by-field "Fill Form" content)

- **Publisher:** Principia College (Elsah, Illinois, USA), International
  Programs / study-abroad office — a third-party, non-governmental source,
  not the Direktorat Jenderal Imigrasi itself.
- **Document:** "Indonesia E-Visa Guide" (E-Visa Step by Step Guide)
- **URL (directly retrieved, HTTP 200, no login):**
  <https://resources.finalsite.net/images/v1762787416/principiacollegeedu/bfybersrl5dckk3qaqeb/IndonesiaVisaApplicationGuide.pdf>
  — a 7-page guide written for the college's own students, walking a real
  worked example (a B1 – 30 Day Visitor visa, for a study-abroad cruise
  itinerary docking at the Port of Bali) end-to-end with full-resolution,
  legible screenshots of the live `evisa.imigrasi.go.id` application, not a
  wireframe.
- **Extraction method:** the `Read` tool rendered this PDF directly; every
  field label, required-field asterisk, and worked-example value below was
  read directly off its own screenshots.
- **Retrieved / reviewed:** 2026-07-07
- **What it confirms:** the exact "Fill Form" field labels the official
  manual's own wireframe could not show — Personal Information (Full name,
  Sex, Place of Birth, Date of Birth, Phone Number), Passport (or other
  travel document) Information (Document Type, Document No., Nationality,
  Date of Expiry, Issuing Country), Address in Indonesia (Residence Type,
  Address, Postal Code, plus auto-populated Province/City/District/Village/
  Immigration Office), the Visa Type Information recap panel, the Payment
  Types radio, the Main Document (Return Ticket) and Support Document
  upload slots, and the Applicant Contact Confirmation (Email/Email
  Confirmation) panel — every one with its own required-field asterisk (or
  lack of one) visible on-screen.

## Field inventory (Phase 3)

| Field (schema `name`) | Label (source) | Source / page | Example valid value |
|---|---|---|---|
| `passportCountry` | Passport/Country/Region | Source 2, p.2 | `"UNITED STATES OF AMERICA"` |
| `mainPurpose` | The main purpose of my visit to Indonesia is | Source 2, p.2 | `"General, Family, or Social"` |
| `subPurpose` | The sub purpose of my visit to Indonesia is | Source 2, p.2 | `"Tourism, Family Visit, and Transit"` |
| `visaType` | I want to explore & choose a visa | Source 2, p.2 | `"B1 - Tourist (Visa On Arrival)"` |
| `lengthOfStay` | I am planning to stay | Source 2, p.2 | `"30 Days"` |
| `paymentMethod` | Payment Types | Source 1 p.13; Source 2 p.5 | `"CREDIT CARD / DEBIT CARD (Foreign Bank)"` |
| `fullName` | Full name | Source 2, p.5 | `"Jane Doe"` |
| `sex` | Sex | Source 2, p.5 | `"FEMALE"` |
| `placeOfBirth` | Place of Birth | Source 2, p.5 | `"Springfield, Illinois"` |
| `dateOfBirth` | Date of Birth | Source 2, p.5 | `"1998-12-05"` |
| `phoneNumber` | Phone Number | Source 2, p.5 | `"+15551234567"` |
| `documentType` | Document Type | Source 2, p.6 | `"Passport"` |
| `documentNumber` | Document No. | Source 2, p.6 | `"AA1234567"` |
| `nationality` | Nationality | Source 2, p.6 | `"AMERIKA SERIKAT"` |
| `dateOfExpiry` | Date of Expiry | Source 2, p.6 | `"2030-05-01"` |
| `issuingCountry` | Issuing Country | Source 2, p.6 | `"United States of America"` |
| `residenceType` | Residence Type | Source 2, p.6 | `"OTHERS"` |
| `address` | Address | Source 2, p.6 | `"OCEANIA CRUISES REGATTA AT PORT OF BALI"` |
| `postalCode` | Postal Code | Source 2, p.6 | `"80222"` |
| `province` | Province | Source 2, p.6 | `"BALI"` |
| `city` | City | Source 2, p.6 | `"KOTA DENPASAR"` |
| `district` | District | Source 2, p.6 | `"DENPASAR SELATAN"` |
| `village` | Village | Source 2, p.6 | `"PEDUNGAN"` |
| `immigrationOffice` | Imigration Office (sic) | Source 2, p.6 | `"KANTOR IMIGRASI KELAS I DENPASAR"` |
| `email` | Email | Source 2, p.7 | `"jane.doe@example.edu"` |
| `emailConfirmation` | Email Confirmation | Source 2, p.7 | `"jane.doe@example.edu"` |

`documents[]`:

| Document `id` | What it is | Required? |
|---|---|---|
| `passportDataPage` | Passport data-page photo | Yes |
| `applicantPhoto` | Recent chest-up formal photo | Yes |
| `returnTicket` | Return/onward ticket (PDF) | Yes |
| `travelDocumentValidityDocument` | "Passport Valid for at Least 6 Months" support document | No |

## Access notes and judgment calls

1. **Scope is deliberately narrowed to the General/Family/Social → B1
   Visitor-visa branch.** The wizard's first two boxes (`mainPurpose`,
   `subPurpose`) gate a materially different downstream flow for other
   top-level categories — most visibly, Source 1's own worked example
   follows a **Golden Visa/Investment** pathway, which its own prose
   describes with an apparent extra sub-classification step ("I am planning
   to stay?... Individual Investor") distinct from the simple duration
   selector this document models, plus multi-year stay options (5/10 years)
   in place of the 30-day option modelled here. Neither source walks the
   Golden Visa/Investment branch's own "Fill Form" screen field-by-field, so
   it is not modelled. A future minor version could add it once a
   comparably strong field-level source for that branch is found.
2. **`visaType`'s "(Visa On Arrival)" naming is a known trap — disclosed,
   not silently resolved.** Source 1 independently confirms Indonesia
   operates a **separate**, genuinely-instant "e-VOA" product ("A Visit on
   Arrival visa can be applied for by foreigners **without having an
   account**... instant visa", p.9) that is not the flow modelled here. The
   "B1 - Tourist (Visa On Arrival)" product Source 2 walks is, despite its
   name, obtained through the same full account/upload/verification/
   payment e-Visa process every other product in this schema uses — Source
   2's own guide confirms an account, passport/photo upload, and a
   multi-day verification wait, none of which the true e-VOA requires. This
   document models the full e-Visa flow only; the separate instant e-VOA
   product is out of scope and would need its own document if authored.
3. **`sex` is modelled as a 2-value enum; most other dropdowns are modelled
   as open strings.** `sex` is a genuine two-option radio group with both
   option labels ("MALE"/"FEMALE") rendered on-screen regardless of
   selection — the same disclosure discipline already used for this
   registry's other confirmed-both-values radio/dropdown fields (e.g.
   `id/imigrasi/passport-application-first-adult`'s `gender`). Every other
   dropdown (`passportCountry`, `nationality`, `documentType`,
   `residenceType`, `mainPurpose`, `subPurpose`, `visaType`, `lengthOfStay`)
   shows only its own selected value on-screen with a chevron affordance
   implying more options exist, so none of these assert an enum.
4. **`documentType`'s further values are named in source text but never
   shown selected.** The Support Document upload's own description names
   "emergency passports" and "documents of identity" as alternative
   travel-document types — real, textual evidence more `documentType` values
   exist beyond the confirmed default "Passport" — but the dropdown itself
   is never shown open or set to any other value, so `documentType` remains
   an open string rather than a fabricated enum.
5. **`paymentMethod` combines two sources for its two enum values.** Source 1
   is the only one of the two to show both "Credit Card" and "Simponi" as
   simultaneous on-screen radio options; Source 2's own worked example (a
   foreign cardholder) shows only the credit/debit-card option selected,
   with its own more specific label ("CREDIT CARD / DEBIT CARD (Foreign
   Bank)"). Both values are used verbatim from whichever source rendered
   them more precisely.
6. **`nationality`'s dropdown renders in Indonesian ("AMERIKA SERIKAT") even
   though the rest of the live UI is in English.** Confirmed directly in
   Source 2's own screenshot, not an authoring transcription error — flagged
   here so a consuming agent does not "correct" it.
7. **`postalCode`'s 5-digit pattern is asserted from the confirmed worked
   example plus Indonesia's own well-established 5-digit postal-code
   standard**, not inferred from a single example alone.
8. **`province`/`city`/`district`/`village`/`immigrationOffice` are modelled
   as `required: false`.** The source's own text states these are
   auto-populated once `residenceType`/`address`/`postalCode` are entered,
   not independently keyed by the applicant — they are included because a
   consuming agent should expect them in the resulting record, not because
   the applicant supplies them directly.
9. **`travelDocumentValidityDocument`'s label and description state two
   different validity periods for what the source presents as one upload
   slot** ("Passport Valid for at Least 6 Months" as the label, "must be
   valid for 12 months" in its own description prose) — preserved verbatim
   rather than silently reconciled, since neither source clarifies which
   governs.
10. **The Review & Submit step's own checkbox-attestation screen is out of
    scope.** Source 2's own stepper names this step ("Review & Submit, tick
    in each checkboxes for review") but neither source renders it on-screen,
    so no attestation `document` entry is fabricated for it — the same
    discipline `ae/icp/visa-single-entry-long-stay-pleasure` already applies
    to its own "Review Application" step.
11. **Account registration/sign-in is out of scope**, consistent with every
    other account-gated document in this registry (e.g.
    `id/imigrasi/passport-application-first-adult`).
12. **The third-party credit-card payment-gateway entry screen is out of
    scope.** Source 2's own step 11 names only a generic "credit card
    information" screen with an approximate USD fee, no field-level detail.

## Test run (Phase 4)

No live submission was attempted: `evisa.imigrasi.go.id` requires full
account registration (passport-photo/personal-photo upload plus email
verification) before any application screen is reachable, and a real
submission would create a real record in a foreign government's immigration
system and could not be safely withdrawn — the same reasoning already
documented for `id/imigrasi/passport-application-first-adult` and
`ph/dfa/passport-application`. Instead, this document's own worked mock
example (the "Example valid value" column above) was checked programmatically
against every field's own `validation` keyword (`enum`, `pattern`,
`maxLength`) and `required`, the `emailConfirmation` cross-field rule was
checked against a matching and a mismatching pair, and both meta-schema
validators (`tools/validate.mjs` and `tools/validate-ajv.mjs`) were run
against the finished document and pass clean.
