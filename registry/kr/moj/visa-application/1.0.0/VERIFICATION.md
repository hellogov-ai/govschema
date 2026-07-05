# Verification record — `kr/moj/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

The document was derived from a **directly-read primary source**: the full
text of the Ministry of Justice's gazetted, bilingual Visa Application Form,
retrieved as a static PDF with a real text layer. It remains `draft`, not
`verified`, pending an independent second reviewer's field-by-field pass.

## Why this document exists

South Korea's Visa vertical was flagged as a strong, unauthenticated candidate
during `GOV-1289`'s new-jurisdiction research cycle (2026-07-05), which opened
South Korea as the registry's 13th jurisdiction and filed four follow-up child
issues for its remaining verticals. `GOV-1291` (DMV) and `GOV-1294` (National
ID) were authored first; this document (`GOV-1292`) closes Visa, leaving only
`GOV-1293` (Taxes) open for South Korea. Picked up under `GOV-1321`'s standing
research routine.

## Source examined

- **Document `(id, version)`:** `kr/moj/visa-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Justice, Republic of Korea — Korea Immigration Service
- **Primary source URL:** <https://www.visa.go.kr/downfile/VisaapplicationForm_EN.pdf>
- **Official form id:** 출입국관리법 시행규칙 별지 제17호서식 (Enforcement Rule
  of the Immigration Act, Attached Form No. 17), revision dated
  **2022-02-07** (표시: `<개정 2022. 2. 7.>`)
- **Retrieved / reviewed:** 2026-07-05
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

Unlike `kr/mofa/passport-application-first-adult` and
`kr/koroad/driving-licence-application` (both served through JS
canvas/blob-image viewers with no static text layer), this form is hosted as a
**plain, directly downloadable PDF** at a stable URL
(`visa.go.kr/downfile/VisaapplicationForm_EN.pdf`), retrieved with a single
`curl` request and read with a genuine text layer — no browser automation, no
CAPTCHA, no login. This is the cleanest source of the four South Korean
documents authored to date. The live HiKorea e-Application portal
(hikorea.go.kr), which digitises the same underlying process, was not used as
a source: reaching its data-entry wizard requires an ARC/account login (the
same login-gated-portal class already recorded for
`de/auswaertiges-amt/national-visa-application` and
`nz/dia/realme-verified-identity`), so this document models the standalone
form's own field set instead, per source-of-truth fidelity.

## What was confirmed directly (verbatim, from the form's own text)

All five pages of the form were read in full (Korean and English text both
present verbatim, side by side). Every field's `sourceRef` cites the specific
numbered item (e.g. `Item 3.7(a)`) it was transcribed from:

- **Page 1 — Personal Details / Details of Visa Application:** all 9 items
  under section 1 (name, sex, DOB, nationality, country of birth, national ID
  number, prior-other-names gate, dual-nationality gate), and section 2's
  long/short-term period-of-stay checkboxes. The "FOR OFFICIAL USE ONLY" block
  (기본사항/접수사항/허가사항/결재) that follows on the same page was read and
  confirmed to be diplomatic-mission-only content — explicitly excluded from
  `fields`, consistent with this registry's convention of modelling only
  applicant-supplied data.
- **Page 2 — Passport Information / Contact Information / Marital Status and
  Family Details / Education:** all passport-type checkboxes and the
  "other valid passport" conditional block (3.7); home/current address split
  (4.1/4.2); the emergency-contact sub-block (4.5 a–d); marital-status
  checkboxes and the spouse conditional block (5.2 a–f); children gate (5.3);
  and the four education-level checkboxes (6.1) plus school name/location
  (6.2/6.3).
- **Page 3 — Employment / Details of Visit:** the eight occupation checkboxes
  (7.1) and the employment-details sub-block (7.2 a–d); the eleven
  purpose-of-visit checkboxes (8.1); intended period/date of entry/address in
  Korea/contact number (8.2–8.5); and the two 5-year travel-history gates
  (8.6 Korea, 8.7 other countries) with their repeating-row tables.
- **Page 4 — Details of Visit (cont'd) / Details of Invitation / Funding
  Details / Assistance with this Form:** the two family-in-Korea/
  travelling-with-family gates (8.8/8.9) with their repeating-row tables and
  the "Scope of family members" footnote (spouse, children, parents,
  siblings) verbatim; the invitation-details conditional block (9.1 a–e); the
  funding-details block (10.1/10.2 a–d); and the form-assistance conditional
  block (11.1).
- **Page 5 — Notice / Declaration / Procedure:** all 7 numbered notices (extra
  space, passport-change notification duty, no-guaranteed-entry caveat, C-visa
  no-status-change rule citing Enforcement Rule Article 9(1), false-information
  penalty, missing-document delay/denial, and the visa-portal result-checking
  procedure); the full declaration paragraph and its Immigration Act
  compliance clause; the under-17 parent/guardian signature note; and the
  5-stage processing flow diagram (Application → Reception → Review →
  Approval → Issuance, all four post-application stages performed by the
  Diplomatic Mission).

## What is out of scope for v1.0.0

- **Confirmation of Visa Issuance** (사증발급인정신청서, Attached Form No. 21):
  a related but structurally different process filed by a sponsor/inviter
  already resident in Korea (rather than the applicant abroad), on its own
  gazetted form — not modelled here, a candidate for a future sibling
  document.
- **HiKorea e-Application portal** (hikorea.go.kr): its authenticated wizard
  was not reached (ARC/account login required); this document models the
  standalone paper form only.
- **Purpose-specific supporting-document list** (Enforcement Rule Article 76(1)
  and Annex 5): the form's own "ATTACHMENT" line references this annex, which
  enumerates different required documents per visa purpose category (roughly
  30 categories); encoded here only as a single generic
  `categorySpecificSupportingDocuments` document requirement rather than
  itemised per category — itemising all ~30 would be its own large project.
- **Repeating rows beyond the first/most recent:** four items on the form
  (8.6, 8.7, 8.8, 8.9) provide a multi-row table for, respectively, prior
  Korea visits, prior other-country trips, family in Korea, and accompanying
  family. GovSchema v0.3's field model is flat with no array/repeating-group
  type yet (`spec/v0.3/SPEC.md` §6.1; GSP-0009 proposes one but is not yet
  adopted), so each is modelled as a single "most recent/first entry" field
  set — the same precedent `in/mha/evisa-etourist` already established for
  its `previousVisaType`/`previousVisaPlaceOfIssue`/`previousVisaDateOfIssue`
  fields. A future MINOR version could add full repeating-row support once
  the spec does.
- **`statusOfStay` (Item 2.2) as a closed enum:** the form leaves this field a
  blank box rather than a checkbox list — it is the specific visa
  status/category code (e.g. C-3, D-2, E-7) determined by the applicant's
  purpose and eligibility, of which Korea has dozens. Modelled as free text
  rather than an enumerated list, since no single source consulted this cycle
  enumerates the full current code list authoritatively.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-fetch `visa.go.kr/downfile/VisaapplicationForm_EN.pdf`,
re-check every `sourceRef` against it field by field, and confirm no newer
form revision has superseded the 2022-02-07 edition. Record the outcome here
before setting `status: verified`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months), consistent with the other three South Korean documents authored this
research cycle. Re-check the source, and confirm no newer form edition has
been published, on or before that date and on any `source.url` change.
