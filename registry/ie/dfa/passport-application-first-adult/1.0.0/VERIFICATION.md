# Verification record — `ie/dfa/passport-application-first-adult` v1.0.0

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
recorded. As with the sibling `ie/dfa/passport-renewal-adult`, Passport Online
(`passportonline.ie`) is an authenticated, JavaScript-driven application with no
downloadable form to check against. It therefore remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `ie/dfa/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Department of Foreign Affairs, Passport Service (DFA), Ireland
- **Primary source URL:** <https://www.ireland.ie/en/dfa/passports/how-to-apply-for-a-passport/first-adult-passport/>
- **Supporting sources:**
  - <https://www.dfa.ie/passports/passport-information/first-passport-adult/> (mirror of the primary source on the dfa.ie domain; fetched successfully when ireland.ie returned 403)
  - <https://www.ireland.ie/en/dfa/passports/how-to-get-your-application-witnessed/> / <https://www.dfa.ie/passports/how-to-get-your-application-witnessed/> (witness eligibility, Identity Verification Form, work-landline requirement)
  - <https://www.citizensinformation.ie/en/travel-and-recreation/passports/applying-for-or-renewing-an-irish-passport/> (documents by citizenship route, photo/witness-signing detail)
  - <https://www.citizensinformation.ie/en/moving-country/irish-citizenship/becoming-an-irish-citizen-through-naturalisation/> (naturalisation certificate must precede a passport application)
  - <https://www.citizensinformation.ie/en/moving-country/irish-citizenship/foreign-births-register/> (Foreign Birth Registration certificate as citizenship evidence)
- **Official form id:** none — see "Why no form" below.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

**Why no form.** As with `ie/dfa/passport-renewal-adult` and `gb/dvla/vehicle-tax`,
there is no downloadable, fillable application form to transcribe field-by-field;
Passport Online is the sole channel, and this document is built from DFA guidance
prose and citizensinformation.ie's summaries of the online screens and required
evidence, not an independently captured screen-by-screen review of
`passportonline.ie`. One source page,
<https://www.ireland.ie/en/dfa/passports/documentary-requirements/adult/>, could
not be retrieved (HTTP 403 to automated fetch); the documentary-evidence fields
below are sourced from citizensinformation.ie and DFA guidance pages instead.

## What was confirmed against the source

- **Eligibility boundary vs. the renewal sibling**: a first-time applicant, or one
  whose most recent passport was issued more than 15 years ago, must use this
  document rather than `ie/dfa/passport-renewal-adult` — confirmed via
  `dfa.ie/passports/passport-information/first-passport-adult/`. This mirrors the
  `us/dos/passport-application-ds11` / `us/dos/passport-renewal-ds82` and
  `gb/hmpo/passport-application-first-adult` / `gb/hmpo/passport-renewal-adult`
  precedent of first-time and renewal being separate documents.
- **Witnessing is mandatory for a first-time application** (unlike the renewal,
  which needs no witness) — confirmed via `how-to-get-your-application-witnessed`:
  a member of An Garda Síochána for applicants resident in Ireland, or one of a
  published list of professions for applicants outside Ireland. Modelled as
  `residencyLocation` and `witnessType`.
- **Witness contact detail**: a work **landline** phone number is required
  (mobile numbers are explicitly rejected, since the Passport Service phones the
  witness to verify identity) — modelled as `witnessWorkLandlinePhone`.
- **Photograph count and witness-signing detail**: 4 identical photographs, 2 of
  which the witness signs on the back and annotates with the application form
  number — confirmed via citizensinformation.ie and folded into the `photos`
  field description rather than split into separate fields, since the document
  model treats the 4-photo bundle as one submitted item.
- **Citizenship-evidence routes**: a full original civil birth certificate
  (including parents' names) is required of every first-time applicant;
  naturalisation applicants must already hold their naturalisation certificate
  before applying; Foreign Birth Registration applicants submit their FBR
  certificate (original or solicitor/notary-certified colour copy) — confirmed
  via citizensinformation.ie's naturalisation and Foreign Births Register pages.
  Modelled as `citizenshipBasis` gating `naturalisationCertificate` /
  `foreignBirthRegistrationCertificate`, alongside the always-required
  `birthCertificate`.
- **Product options**: standard 10-year (34-page) book, large 66-page 10-year
  book, and a standard-book-plus-card bundle — confirmed via
  `dfa.ie/passports/passport-information/first-passport-adult/`, which lists
  these three priced options; a first-time applicant cannot apply for the
  passport card alone (bundle only). Modelled as `productRequested`.
- **Fee and processing-time facts were deliberately excluded from `fields`**
  (per the `us/dos/passport-renewal-ds82` / `ie/dfa/passport-renewal-adult`
  convention): current published fees (e.g. €75 standard book, €105 large book,
  €100 book-and-card bundle, plus a postal surcharge outside Ireland) and
  turnaround times change independently of the data model and are out of scope
  for `fields`; consumers should read them from the live source.

## What is NOT yet independently verified

- **The full list of acceptable witnesses outside Ireland.** Search results
  surfaced a list (school principal/teacher, clergy, doctor, lawyer, bank/credit
  union manager, elected representative, notary public/commissioner for oaths,
  peace commissioner, accountant, dentist, vet, nurse, physiotherapist, speech
  therapist, lecturer, pharmacist, chartered engineer) but the source page itself
  was not independently fetched to confirm this is exhaustive or current. The
  `witnessType` enum includes an `other_published_witness` escape value for this
  reason and should be cross-checked against the live list before `verified`.
- **Documentary-requirements/adult page (403 on fetch).** Proof-of-address and
  proof-of-name document types (`proofOfAddress`, `proofOfName`) are modelled
  from a third-party search summary of that page's content, not a direct read of
  the DFA source. This is the leading gap to close on the next review pass.
- **Whether a mailing/delivery address is a distinct online-application field.**
  As with the renewal sibling, no address field is modelled beyond the
  proof-of-address *document*; it is not confirmed whether Passport Online
  separately collects a structured postal address for return of the physical
  evidence and photos. No address fields are invented in this version.
- **Photo specification detail** (dimensions, background, format) is not
  restated field-by-field here; `photos` cross-references the same photo
  standard as the renewal sibling but was not independently re-confirmed for
  this document.
- **`ppsNumber` and passport-number-adjacent formats** carry the same caveats as
  `ie/dfa/passport-renewal-adult` (general Irish PPSN shape, not cross-checked
  against this specific screen).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer with an active
Passport Online account applies `manual-source-review-v1` (Procedure step 2
field-by-field comparison against the live authenticated screens, step 3 flow
comparison), successfully retrieves and cross-checks
`documentary-requirements/adult/` and the full acceptable-witness list, resolves
the open items above, ships any resulting change as a new schema version per
[VERSIONING.md](../../../../../VERSIONING.md) (immutability — never edit a
published version), and records the outcome here with `status: verified` and a
current `verification.lastVerifiedAt`/`nextReviewBy`. This v1.0.0 record stays as
the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months): passport application is a fee/policy-sensitive process, and this
document in particular carries more open items than the DS-11/HMPO precedents.
Re-check the source on or before that date and on any `source.url` change.
