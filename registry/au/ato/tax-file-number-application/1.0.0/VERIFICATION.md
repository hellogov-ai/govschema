# Verification record — `au/ato/tax-file-number-application` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

`draft`, not `verified`, because the paper form's field-by-field content
comes from a 2005 edition mirrored by a third party, not a copy fetched
directly from the ATO — see "What was not done" below.

## Sources examined

- **Document `(id, version)`:** `au/ato/tax-file-number-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Australian Taxation Office (ATO).
- **Direct access to `ato.gov.au` returned HTTP 403`** for every path tried
  (`curl`, `WebFetch`), for both the informational TFN-application webpage
  and the forms-and-instructions page — consistent with this registry's
  prior `gov-au-wayback-workaround` finding for other `.gov.au` domains
  (`passports.gov.au`, `dfat.gov.au`).
- **`https://web.archive.org/web/20260302080100if_/https://www.ato.gov.au/_next/data/8pOJ0dPo1XRRQvgXDQ204/en/individuals-and-families/tax-file-number/apply-for-a-tfn/australian-residents-tfn-application.json`**
  — a Wayback Machine snapshot (captured 2026-03-02, four months before this
  review) of the ATO site's own Next.js/Sitecore JSON data endpoint for its
  "Australian residents — TFN application" page. Retrieved via `curl`
  against the Wayback mirror (HTTP 200, 220,649 bytes); page text was
  recovered by walking the JSON tree for `value`/`text` keys. Confirms the
  current application channels (online via a Digital ID such as myID;
  Australia Post retail outlet using an online form followed by an
  in-person identity check; a Services Australia centre using the paper
  form; or by post using the paper form) and that the paper form is
  **NAT 1432** ("Tax file number — application or enquiry for individuals"),
  obtainable only through the ATO's Publications Ordering Service
  (iorder.com.au), not a direct `ato.gov.au` download. Also names the
  NAT 1589 (Aboriginal and Torres Strait Islander people), NAT 2628
  (individual living outside Australia), Individual Auto Registration (IAR,
  for foreign passport holders/permanent migrants/temporary visitors), and
  Norfolk Island alternatives cited in this document's `description` and
  "Out of scope" section.
- **`https://insightaccounting.com.au/wp-content/uploads/2024/03/TFN-Application.pdf`**
  — a third-party accounting firm's mirror of the printable **NAT
  1432-12.2005** form (6 pages), located via web search since the current
  edition is not directly downloadable from `ato.gov.au`. Retrieved via
  `curl` (HTTP 200, 215,014 bytes) and text-extracted with a scratch npm
  install of `pdfjs-dist` (legacy build) — a plain, non-encrypted PDF whose
  standard text-layer extraction recovered the full six-page form: the
  cover instructions, the proof-of-identity document-category table (page
  ii), and the numbered application itself (Questions 1–14 plus the
  declaration and an office-use-only proof-of-identity certification page).
  This is this document's **primary field-level source** — every field
  name, label, enum option, and `sourceRef` is drawn from this mirror's
  text. Following this registry's retired-form-mirror precedent
  (`fr/ants`/`fr/inpi`'s Cerfa mirrors, GOV-742/GOV-749), an older edition of
  a government form obtained via a credible third-party mirror is treated as
  a valid field-level source when the live original cannot be fetched
  directly, provided the live source's own prose (the Wayback-snapshotted
  webpage, in this case) is cross-checked for currency of the surrounding
  process (channels, eligibility, form number) — which it was.

## What was not done — the one honest gap

The field-by-field content of NAT 1432 comes from a **2005 edition**
mirrored by a third party (a Perth-area accounting firm's website), not a
copy fetched directly from the ATO nor a confirmed-current edition. The
Wayback-snapshotted ATO webpage (dated 2026-03-02) still names "NAT 1432" as
the current form number and describes application channels consistent with
the 2005 edition's own guidance (e.g. an applicant unable to apply online
must use the paper form), which is reassuring but not a field-by-field
confirmation that no question has been added, removed, or renumbered in the
21 years since this edition. No live walkthrough of the Australia Post
online-form channel, and no attempt to independently order a current copy
of NAT 1432 through the ATO's Publications Ordering Service
(`iorder.com.au`), were performed in this environment.

A future review should either fetch a more recent edition of NAT 1432 (via
`iorder.com.au` or another mirror) and diff it field-by-field against this
document, or drive the Australia Post online-form channel directly (per the
`ie/irishimmigration` headless-browser technique) to confirm the online
field set matches.

## Test run performed

Phase 4 of this cycle's research brief calls for a test run with valid mock
data. A scratch Node script (`/tmp/au-tfn-test/mocktest.mjs`, not checked
into the registry) implements the GSP-0013 condition grammar
(`equals`/`notEquals`/`all`/`any`/`not`) and resolves
`visibleWhen`/`requiredWhen` against three independent mock applicants:

1. An adult with no prior TFN/tax history, applying because an employer
   requires it, born in Australia, no spouse, no other name, home address
   same as postal address.
2. An adult with prior tax history (exercising the prior-dealing detail
   fields), a name change before marriage (exercising the name-change
   fields and `nameChangeLinkDocument`), a spouse, a home address different
   from the postal address, born overseas, and a registered tax agent.
3. A minor applicant (born 2011) whose parent signs the declaration on
   their behalf (exercising `signedByRepresentative`,
   `representativeProofOfIdentity`, and `relationshipEvidenceDocument`),
   applying for a school-enrolment reason (exercising the `reasonForTfn`
   `other` branch).

All three scenarios: (a) supply every field that is required given its
resolved visibility, (b) pass each field's own `validation` (pattern/enum/
min-max), and (c) contain no reference to a field name absent from
`fields[]` across every `visibleWhen`, `requiredWhen`, `documents[]`
`requiredWhen`, and `steps[].fields` entry. All three passed on the first
run; no schema defect was found by this test.

The schema also validates against both the zero-dependency structural
checker (`tools/validate.mjs`) and the full JSON Schema draft 2020-12
meta-schema via ajv (`tools/validate-ajv.mjs`).

## Modelling decisions

- **Models the standard individual/family paper application (NAT 1432)
  only**, not the online Digital-ID/myID channel or the Australia Post
  online-form channel. Neither publishes its field set outside an
  authenticated or in-person session, so the paper form — which every
  channel converges on for anyone unable to use Digital ID — is the
  faithful, fully field-documented source, matching this registry's general
  preference for a paper/PDF form over an unreachable live wizard when both
  collect materially the same information (cf. `in/eci/voter-registration`).
- **`hasPriorTfnOrTaxHistory` modelled as a three-value enum
  (`no`/`not_sure`/`yes`)**, not a boolean, because the source form itself
  prints three boxes ("No" / "Not sure" / "Yes") for this single question,
  and both `not_sure` and `yes` trigger the identical prior-dealing detail
  fields — so `requiredWhen` gates on `notEquals: "no"` rather than
  `equals: true` the way a plain boolean would.
- **`homeAddressSameAsPostal` is an inferred gating boolean**, not a printed
  form field. The source form instead says "write 'As above' if same as
  postal address at question 8" as a free-text shortcut on the same
  address-line field; this document follows this registry's convention
  (e.g. `au/aec/voter-enrolment`'s `nameChanged`/`addressChanged`,
  `in/eci/voter-registration`'s `hasDisability`) of adding an explicit
  boolean gate where GovSchema's `visibleWhen`/`requiredWhen` grammar needs
  one but the paper form only implies it.
- **`signedByRepresentative` is likewise an inferred gating boolean.** The
  source form's declaration section only conditionally asks "please provide
  your full name" for a signer other than the applicant, without a printed
  yes/no box; the age-based signing rule (12 or under: parent/guardian must
  sign; 13–15: applicant or parent/guardian; 16+: applicant) is documented
  in `declaration`'s own description rather than encoded as a `required`
  condition on age, since GSP-0013's grammar has no clean way to express an
  age-threshold comparison against `dateOfBirth` as of an unspecified
  "today" (the same class of gap noted in
  `in/eci/voter-registration`'s VERIFICATION.md for its own at-least-one-of
  rule).
- **Proof-of-identity documents modelled via `documents[]`, not inline
  `file`-type fields** (unlike this registry's `ie/dsp/pps-number-
  application` sibling, which inlines its identity/evidence documents as
  `file` fields directly). Both approaches are valid under the spec; this
  document uses `documents[]` per GSP-0014's intent for document/evidence
  requirements as its own first-class array, matching
  `in/eci/voter-registration`'s pattern. The Category A/Category B
  combination rule (one A + one B, or one A + two different Bs; different
  rules for under-16 applicants) is documented in the `applicantProofOfIdentity`
  document's `handling`/`sourceRef` rather than modelled as a further
  structured field, since GovSchema has no construct for "N of category X
  AND M of category Y" document-count rules.
- **Prior-dealing details (`priorFamilyName`, `priorFirstGivenName`,
  `priorPostalAddress*`) omit the "Other given names at that time" and
  district-level detail present in some other schemas' address blocks**,
  matching the source form's own reduced field set for this historical
  recall section (it asks for family/first name and a State/Postcode/Suburb
  address only, not a full current-style address block).
- **Office-use-only fields (page 3–4 of the source: office stamp, CLK/DVA
  customer reference numbers, officer's signature, document codes) not
  modelled.** These are completed by Centrelink/DVA/Tax Office staff
  processing the application, not by the applicant.

## Out of scope

- **NAT 1589** (Tax file number application for Aboriginal and Torres
  Strait Islander people) — a distinct form used when the applicant cannot
  provide enough identity documents to meet NAT 1432's requirements; it adds
  a referee proof-of-identity reference not present in NAT 1432.
- **NAT 2628** (Tax file number application for an individual living
  outside Australia) — a distinct form for non-residents who need a TFN for
  purposes other than employment.
- **Individual Auto Registration (IAR)** — the online TFN application
  pathway for foreign passport holders, permanent migrants, and temporary
  visitors already holding a valid Australian visa; a different eligibility
  population and channel from this document's Australian-resident scope.
- **Norfolk Island residents' alternative process** — a distinct pathway
  for applicants on Norfolk Island unable to apply online.
- **The Australia Post online-form channel and the Digital-ID (myID)
  online channel** — neither publishes a field-by-field form outside an
  authenticated/in-person session; see "Modelling decisions" above.
- **TFN enquiry** (recovering a lost/forgotten TFN without a fresh
  application) — the source form's own title covers both "application" and
  "enquiry," but this document models the application path only.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-03** (6
months). Attempt to obtain a current-edition copy of NAT 1432 (via
`iorder.com.au` or a fresher third-party mirror) and diff it field-by-field
against this document; if no material change is found, or once confirmed
current, promote `status` to `verified`.
