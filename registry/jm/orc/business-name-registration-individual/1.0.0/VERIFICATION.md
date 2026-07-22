# Verification record — `jm/orc/business-name-registration-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-22`

The document was derived directly from the official ORC PDF's own text
content, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has not yet been completed
against a live ORC filing counter or e-service (this is a paper/in-person or
postal filing form with no online-filing screens to compare against). It
therefore remains `draft`, not `verified`.

## Why this schema and why now (GOV-4360)

GOV-4360 is the recurring "GovSchema Standard Research" cycle. This cycle
scouted Jamaica as a brand-new jurisdiction: no `registry/jm/` directory
existed prior to this document. Six-vertical scouting found ORC's Form BN 1
(sole-proprietor business name registration) STRONG, unauthenticated, and
unblocked (once the WAF/DNS wrinkle described below is worked around), and it
was authored this cycle, opening Jamaica's Business Formation vertical (1 of
6). Five other STRONG candidates were also banked this cycle as open backlog
for future cycles — see the Known Gaps & Opportunities entry accompanying
this document in `CATALOG.md` for DMV, Visa, Passport, and Taxes sources, and
the confirmed National ID dead end.

## Sources examined

- **Document `(id, version)`:** `jm/orc/business-name-registration-individual` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Office of the Registrar of Companies (ORC), operating as the
  Companies Office of Jamaica.
- **Primary source URL:**
  `https://www.orcjamaica.com/CompForms/bn1%20rev%201.2011.pdf`
  — fetched directly this cycle: HTTP 200, `application/pdf`, **135,017
  bytes**, sha256
  `114f76d039d8ae7c74cfac03c90b54991d28437ccebc26313d904bee03ba1b84`. This
  matches this cycle's own initial scouting report ("HTTP 200, 135,017
  bytes") exactly.
- **DNS/WAF wrinkle and workaround:** `orcjamaica.com` sits behind an Oracle
  Cloud WAF (server header `ZENEDGE`). The sandbox's default resolver returns
  SERVFAIL for the domain, and the site's own HTML pages (homepage,
  `/CompForms/` directory listing, forms-listing pages) return a small
  JS-challenge stub rather than real content when fetched without a browser.
  The underlying static PDF assets under `/CompForms/` are, however,
  genuinely unauthenticated once DNS resolves: this cycle resolved
  `orcjamaica.com` via Cloudflare's DNS-over-HTTPS endpoint
  (`https://cloudflare-dns.com/dns-query?name=orcjamaica.com&type=A`, which
  returned `147.154.3.128`), then fetched the PDF directly with
  `curl --resolve orcjamaica.com:443:147.154.3.128` and a standard desktop
  User-Agent string — this returned a clean 200 with no login or CAPTCHA
  challenge on the document itself.
- **Retrieval / extraction method:** the PDF's raw bytes were retrieved
  directly (not a third-party summary) and text was extracted with
  `pdfjs-dist` (legacy Node build), walking each page's text-run items and
  grouping by y-position to reconstruct the form's own printed line order.
  All 3 pages extracted cleanly with no glyph-mapping failures. Pages 1 and 2
  were additionally rendered to raster PNGs via `pdfjs-dist` +
  `node-canvas` and visually inspected, to confirm the printed table/box
  structure referenced in "Scope narrowing and why" below (in particular,
  which address blocks are genuinely separate labelled boxes vs. a single
  free-text writing area).
- **Official form title/number:** "Form BN 1 Rev 1.2011 — Registration of
  Business Names Act — Application for Registration by Sole Proprietor
  (Pursuant to Section 3)".
- **Retrieved / reviewed:** 2026-07-22.
- **Reviewer:** GovSchema Engineering (Standards Engineer), initial authoring
  source-review.

### Companion form fetched for comparison (not modelled by this document)

To resolve the scope questions described in "Scope narrowing and why" below,
this cycle also fetched ORC's sibling partnership form. Its filename does not
follow the same naming convention as Form BN 1's own filename (`bn1 rev
1.2011.pdf`); a same-pattern guess (`bn2 rev 1.2011.pdf`) 404'd, and the
correct filename (`BN 2 FORM Rev 01. 2011.pdf`) was recovered from the
Wayback Machine's CDX index for `orcjamaica.com/CompForms/*` rather than
guessed:
`https://www.orcjamaica.com/CompForms/BN%202%20FORM%20Rev%2001.%202011.pdf`
(HTTP 200, `application/pdf`, 113,707 bytes, sha256
`e0cf03aa65b84f4088d7647f5d397ed98d67a19ba8c9863bccf5605ec00da50a`), extracted
with the same `pdfjs-dist` method. Form BN 2, "Application for Registration
by Partnership", shares Section A (Business Information) and Section B
(Certification) verbatim in structure and wording with Form BN 1, but its
Section C ("Particulars of Applicants") is printed as two side-by-side
`APPLICANT #1` / `APPLICANT #2` columns (each repeating the same
name/address/contact/TRN/nationality fields Form BN 1 asks once), plus a
closing checkbox "Schedule with particulars of additional partners attached"
and its own page-3 instructions state the form "provides space for only two
partners however your partnership may be comprised of up to twenty persons
... between individuals, individuals & corporation or between corporations"
with a company's "legal name, registered office, registration number,
contact and TRN" to be supplied by schedule when a corporate partner is
involved. This confirms Form BN 1 is genuinely the single-applicant variant
(no partner-count or corporate-partner concept appears anywhere in its own
text), consistent with its own title, "APPLICATION FOR REGISTRATION BY SOLE
PROPRIETOR", and justifies not modelling any repeating-partner concept in
this document.

## What was confirmed against the source

Every field below was independently re-derived from the raw extracted text
and the rendered page images (see "Retrieval / extraction method"), matched
to the form's own numbered items across Sections A–D:

| Source item | Field(s) |
|---|---|
| 1 – Name of the business | `businessName` |
| 2 – Date of commencement (DD MM YY, not a future date) | `dateOfCommencement` |
| 1B – Other proposed names (if item 1 refused) | `otherProposedBusinessNames` |
| "REGISTRATION # (FOR RENEWALS)" box | `isRenewalApplication` (unprinted gate), `renewalRegistrationNumber` |
| 1C – Other business name under which business will be carried out (where applicable) | `otherBusinessNameCarriedOutUnder` |
| 3 – Justification of proposed business name (where applicable) | `businessNameJustification` |
| 4A/4B – General nature of business: Sale of / Type of Service | `natureOfBusinessSaleOf`, `natureOfBusinessServiceType` |
| 5 – Principal address of the business (Street/District/Shop#/Plaza; Post Office; City/Town; Parish) | `principalAddressStreetDistrict`, `principalAddressPostOffice`, `principalAddressCityTown`, `principalAddressParish` |
| 6 – Contact numbers (Tel #, Tel #2, Fax#) | `businessContactTelephone`, `businessContactTelephone2`, `businessContactFax` |
| 7 – Branches: Yes/No + 7A/7b/7c | `hasBranches`, `branchName`, `branchAddressStreetDistrict`, `branchAddressPostOffice`, `branchAddressTown`, `branchAddressParish`, `branchNatureOfBusiness` |
| Section B – Certification (field/profession, expiry, certifying body, cert #, provided Y/N) | `certificationApplicable` (unprinted gate), `certificationFieldOrProfession`, `certificationExpiryDate`, `certifyingBody`, `certificationNumber`, `certificationProvided` |
| Section C, 1 – Name of Applicant (Christian/Middle/Surname) | `applicantChristianName`, `applicantMiddleName`, `applicantSurname` |
| Section C, 1a – Any former Christian or surname (+ Marriage/Deed poll checkboxes) | `applicantFormerChristianName`, `applicantFormerSurname`, `applicantFormerNameChangeReason` |
| Section C, 2 – Place of residence (Street/District; Post Office; Town; Parish) | `applicantResidentialAddressStreetDistrict`, `applicantResidentialAddressPostOffice`, `applicantResidentialAddressTown`, `applicantResidentialAddressParish` |
| Section C, 3 – Contact Numbers (Tel #, Tel #2) | `applicantContactTelephone`, `applicantContactTelephone2` |
| Section C, 4 – Taxpayer Registration Number (TRN) | `applicantTRN` |
| Section C, 5 – Other business occupation (if any) | `applicantOtherOccupation` |
| Section C, 6/6a – Present Nationality / Nationality of origin (if different) | `applicantNationality`, `applicantNationalityOfOrigin` |
| Section C, 7 – Declaration, Signature, Date | `applicantSignature`, `applicationDate` |
| Section D – Particulars of individual/company filing form with the Registrar (Name, Address, Contact, Email address) | `filerName`, `filerAddress`, `filerContactNumber`, `filerEmailAddress` |

**"FOR OFFICIAL USE ONLY"** (Valid Identification Type, Proof of residential
address, Verification of TRN, Proof of certification, Work Permit, and the
COJ Officer's own signature/stamp and date) is Registrar-side processing
metadata recorded at the filing counter, not applicant-supplied data, and is
excluded — consistent with this registry's established boundary for
officiant/examiner blocks (cf. `ug/ursb/business-name-registration-
individual`'s exclusion of the Magistrate/Commissioner for Oaths' own
signature block, and `bw/dic/passport-application`'s exclusion of the
issuing-officer block).

## Scope narrowing and why

- **This document models exactly one individual applicant**, matching Form
  BN 1's own title ("APPLICATION FOR REGISTRATION BY SOLE PROPRIETOR") and
  confirmed by the sibling Form BN 2 comparison above: Form BN 2's own
  Section C is structurally built for two-or-more partners (side-by-side
  `APPLICANT #1`/`APPLICANT #2` columns plus an "additional partners"
  schedule checkbox and its own instructions on partnerships of up to twenty
  persons and/or corporate partners), none of which appears anywhere in Form
  BN 1's text. GovSchema v0.3 also has no array/repeating-group field
  construct (`GSP-0009` tracks a future proposal for one), so an unbounded
  partner list could not be modelled faithfully in this document regardless.
  A future reviewer authoring the BN 2 partnership variant should treat it as
  a **separate schema** (`jm/orc/business-name-registration-partnership` or
  similar), not a version bump of this one.
- **`isRenewalApplication` and `certificationApplicable` are both unprinted
  boolean gates**, not checkboxes on the source form, introduced to key
  `requiredWhen` off a condition the form's own layout implies but does not
  print as a yes/no question: the "REGISTRATION # (FOR RENEWALS)" box has no
  adjacent "is this a renewal?" checkbox, and Section B's own heading states
  it is "Only to be completed by applicants required to present
  certification..." without a printed yes/no gate either. Both conditions
  are things the applicant themself already knows at filing time (whether
  they are renewing an existing registration; whether their proposed
  business name contains a regulated word), which is the same basis this
  registry has used elsewhere for unprinted gates (e.g.
  `ug/ursb/business-name-registration-individual`'s
  `applicantOfNonEuropeanOrigin`/`signedByApplicantInPerson`).
- **`otherProposedBusinessNames` (item 1B) is deliberately left an
  unconditional optional field, not gated behind an unprinted boolean.** Item
  1B's own parenthetical, "(IF THE NAME AT ITEM 1 IS REFUSED)", is a
  Registrar-side contingency that has not yet happened at the time the
  applicant is completing the form — the applicant cannot truthfully declare
  in advance whether the Registrar will refuse their name. This is the one
  place this review deliberately did **not** introduce an unprinted boolean
  gate, to keep the "gate only what the applicant already knows" principle
  (previous bullet) from being applied to a condition that fails it.
- **Item 4's own "OR" between 4A ("Sale of") and 4B ("Type of Service") is
  disclosed but not mechanically enforced.** GovSchema v0.3's
  `crossFieldValidation`/`exclusivityGroups` machinery (GSP-0013) has no "at
  least one of these two string fields must be non-empty" primitive
  (`exclusivityGroups` only bounds boolean fields to *at most* one `true`,
  the opposite direction), so `natureOfBusinessSaleOf` and
  `natureOfBusinessServiceType` are both modelled as independently optional,
  with the OR relationship recorded here as a known, disclosed gap rather
  than silently mis-encoded as a hard requirement on one specific field.
- **Address fields (principal business address, branch address, applicant
  residential address) are each modelled as four separate fields** —
  Street/District(/Shop#/Plaza), Post Office, (City/)Town, Parish — matching
  the source form's own four separately ruled and labelled table rows per
  address block, confirmed by the rendered page images (not a single
  free-text writing area, unlike the single-box addresses this registry has
  modelled as one field elsewhere, e.g. `ug/ursb/business-name-registration-
  individual`'s `principalPlaceOfBusinessAddress`).
- **`applicantFormerNameChangeReason` is modelled as an `enum`** (`Marriage`
  / `Deed poll`), matching the two printed checkboxes next to the
  former-name boxes in Section C, item 1a.
- **`applicantTRN`'s validation pattern** (`^\d{3}-?\d{3}-?\d{3}$`) reflects
  the printed box grouping visible on the rendered page image (three groups
  of three digit-boxes separated by two dash characters), while still
  accepting a plain 9-digit string without dashes.
- **Section D ("Particulars of individual/company filing form with the
  Registrar") fields are modelled as optional**, since neither the form nor
  its page-3 instructions state whether this section must always be
  completed (e.g. duplicating the applicant's own particulars when the
  applicant self-files) or is meant only for a third-party filer (an
  attorney or agent submitting on the applicant's behalf) — see "What is NOT
  yet independently verified" below.
- **No asterisk or similar mandatory-field marker appears anywhere in the
  extracted text**, apart from the two `*` footnote markers on "6. Present
  Nationality*" / "6a. Nationality of origin*" which key a footnote about
  work permits, not a required/optional distinction. Required/optional
  judgments are instead derived from each item's own wording (e.g. "(if
  any)", "(if applicable)", "(where applicable)", "(optional)", "(for
  renewals)" phrasing marks a field optional or conditionally required; a
  plain, unqualified item is marked required), the same basis
  `ug/ursb/business-name-registration-individual`'s own VERIFICATION.md
  records for its own, unmarked specimen. Page 3's general instruction that
  "All the fields on the form are to be filled out with the relevant
  information except where not applicable, the words 'NONE' or 'N/A' should
  be written" further supports treating plain, unqualified items as
  required.
- **Primary telephone numbers (`businessContactTelephone`,
  `applicantContactTelephone`) are modelled as required, while the form's own
  second contact numbers (`Tel #2`) and fax are modelled as optional** — the
  form prints one Tel# box first followed by a supplementary Tel #2/Fax#, and
  no instruction marks even the first Tel# optional, but nor is a phone
  number as unambiguously mandatory as a name/address/signature. This is
  disclosed as a judgment call, not a certainty, consistent with mixed
  precedent for single-vs-multiple contact-number fields elsewhere in this
  registry (e.g. `au/apo/passport-application-first-adult`'s single `phone`
  is required, while multi-field contact blocks elsewhere mark secondary
  numbers optional).

## What is NOT yet independently verified

- **Whether ORC's in-person/postal filing counter enforces any of this
  document's `requiredWhen` gates (`renewalRegistrationNumber`, the six
  branch fields, the four certification detail fields) or the judgment-call
  required fields above (Section D, primary telephone numbers) as strictly
  as modelled here**, since this is a paper/postal form with no online
  filing screen to cross-check field-level enforcement against.
- **Whether Section D ("Particulars of individual/company filing form with
  the Registrar") is in current ORC practice always completed (even by a
  self-filing sole proprietor) or only by a third-party filer** — see "Scope
  narrowing and why" above.
- **Whether Form BN 1 is, in current ORC practice, ever also used where the
  form is completed by an attorney or company secretary rather than the
  individual proprietor personally** — this review found no live ORC
  guidance page confirming or ruling that out (orcjamaica.com's own guidance
  pages return a JS-challenge stub to non-browser fetches, per the DNS/WAF
  wrinkle above), only the form's own text and the Form BN 2 comparison.
- **Whether the Companies Office of Jamaica currently accepts this exact Rev
  1.2011 revision of Form BN 1**, or has since issued a newer revision not
  yet surfaced by this review; the filename and in-form revision marker
  ("Rev 1.2011") are the only evidence of currency examined this cycle.

## Mock test run (phase 4)

Three realistic payloads and multiple deliberately invalid payloads were
checked field-by-field against every field's `type`/`required`/`validation`/
`requiredWhen` rule and `steps[].fields` referential completeness, using an
independently hand-written mock validator (not the registry's shared
`tools/validate.mjs`, to cross-check it independently) plus this registry's
own committed conformance fixtures (see `conformance/jm/orc/
business-name-registration-individual/1.0.0/`):

1. **Minimal sole trader providing a service, no renewal, no branches, no
   certification** — the minimal valid case; all optional fields and all
   three conditional blocks (renewal, branches, certification) omitted.
   **Result: valid.**
2. **Renewal application with a second branch and an applicable, already-
   provided certification** — exercises `isRenewalApplication: true` +
   `renewalRegistrationNumber`, `hasBranches: true` + all five branch detail
   fields, and `certificationApplicable: true` + all four certification
   detail fields together, plus a former name changed by marriage and a
   filer's own particulars. **Result: valid.**
3. **Non-Jamaican applicant with a deed-poll former name and a certification
   that has not yet been provided** — exercises
   `applicantFormerNameChangeReason: "Deed poll"`, a stated
   `applicantNationalityOfOrigin` different from `applicantNationality`, and
   `certificationApplicable: true` with `certificationProvided: false`, no
   branches, not a renewal. **Result: valid.**
4. **Deliberately invalid payloads (one induced error each)** — missing each
   of the 21 unconditionally required fields in turn (`businessName`,
   `dateOfCommencement`, `isRenewalApplication`, `principalAddressStreetDistrict`,
   `principalAddressPostOffice`, `principalAddressCityTown`,
   `principalAddressParish`, `businessContactTelephone`, `hasBranches`,
   `certificationApplicable`, `applicantChristianName`, `applicantSurname`,
   `applicantResidentialAddressStreetDistrict`,
   `applicantResidentialAddressPostOffice`, `applicantResidentialAddressTown`,
   `applicantResidentialAddressParish`, `applicantContactTelephone`,
   `applicantTRN`, `applicantNationality`, `applicantSignature`,
   `applicationDate`); one `requiredWhen` violation per conditional group
   (`isRenewalApplication: true` with `renewalRegistrationNumber` omitted;
   `hasBranches: true` with `branchName` omitted; `certificationApplicable:
   true` with `certificationFieldOrProfession` omitted); and an unknown field
   injected. **Result: all correctly rejected**, per
   `node /tmp/check_conformance.mjs` (an independent from-scratch checker
   written this cycle) run against all 28 committed fixture files.

All payloads were also checked against `schema.json`'s `steps` array: every
field is reachable from `steps[0]` through `next` chaining, and no field is
orphaned from a step. `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv, JSON Schema draft 2020-12) both pass against
`schema.json` itself.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) against an ORC in-person filing counter or a future ORC
e-service (none exists today for this form), resolves the open items above
(Section D applicability; requiredWhen enforcement at the counter; current
form-revision currency), resolves any discrepancy by shipping a **new schema
version** (immutability — VERSIONING §3), and records the outcome here plus
sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-22** (6
months). Re-check the source on or before that date and on any `source.url`
change.
