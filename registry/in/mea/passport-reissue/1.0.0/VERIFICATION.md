# Verification record — `in/mea/passport-reissue` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this candidate, why now

GOV-1224's "GovSchema Standard Research" cycle reviewed the existing registry
catalog and found that `in/mea/passport-application-first-adult` (GOV-869)
only covers fresh/first-time adult applications (Case I(A)(1) of the MEA's
applicant-category table). It flagged re-issue of an existing passport as
the highest-volume real-world passport transaction — every passport holder
returns to this pathway roughly every 10 years on ordinary expiry, and
routinely sooner on exhausted visa pages, damage, loss/theft, or a change of
personal particulars — and filed GOV-1227 to close that gap. GOV-1224's own
research notes anticipated the new fields this schema would need (old
passport number, date/place/office of issue, a reason-for-reissue enum,
police complaint reference for lost/stolen cases, and an old-passport
surrender declaration) and flagged that `passportindia.gov.in/psp/*` is a
client-rendered Angular/React SPA needing a live Playwright pass, the same
technique used for `in/mha/evisa-etourist` and `nl/denhaag/voter-
registration-abroad` (GOV-1121).

## Sources examined

- **Document `(id, version)`:** `in/mea/passport-reissue` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of External Affairs (MEA), Government of India,
  under the Passports Act, 1967. Applications are processed through the
  Passport Seva system (Regional Passport Offices, Passport Seva Kendras,
  Post Office PSKs, District Passport Cells, Speed Post Centres, and Citizen
  Service Centres) — identical infrastructure to the fresh-application
  pathway.
- **Primary source 1 (fetched directly, HTTP 200 — the same PDF used by
  `in/mea/passport-application-first-adult`, re-examined for its re-issue
  content):**
  <https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf>
  — the MEA's own 21-page "Instructions for Filling of Passport Application
  Form and Supplementary Form" booklet. This pass re-extracted the PDF with
  `pdfjs-dist` (the same CID-keyed-font technique GOV-869 established) and
  searched specifically for:
  - **Column 1.2** ("If reissue, specify reason(s)"): the narrative list of
    reissue reasons (expiry within 10 years before/3 years after, expiry
    more than 3 years ago, change of particulars, exhausted pages, lost,
    damaged) — modelled as `reasonForReissue`.
  - **Table 2(II) "Re-issue of Passport"**: the 16-row case table — row A
    (exhaustion of visa pages), row B with 6 sub-cases of expiry, row C
    (damaged), row D (lost/damaged beyond recognition/stolen), and row E
    with 15 sub-cases of change in particulars — each with its own
    Normal/Tatkaal document-number list. Modelled as `reasonForReissue` +
    `particularsChangeType` plus the `documents[]` gated on them.
  - **Table 3 "Overall List of Documents"**: the specific document numbers
    Table 2(II) references — Doc 5 (old passport original), Doc 10 (Pension
    Payment Order), Doc 28 (police report), Doc 29 (old-passport photocopy,
    lost/stolen case), Doc 36 (recent photograph), Doc 49 (Annexure F
    loss/damage affidavit), Doc 50 (Annexure G NOC), Doc 51 (Annexure H
    Prior Intimation Letter), Doc 56 (Annexure J joint photo declaration),
    Doc 57 (divorce decree), and others.
  - The caution notice on page 1 ("Passport is a government property and
    should be surrendered when demanded... Loss of passport should be
    immediately reported to the nearest Police Station") — used as the
    sourcing basis for `oldPassportSurrenderDeclaration` and
    `policeComplaintReference`.
- **Primary source 2 (live-rendered, this cycle's new technique for this
  document):**
  <https://services2.passportindia.gov.in/psp/docAdvisor/reissuePassport> —
  the Passport Seva Online Portal's own public "Document Advisor" tool for
  re-issue. A raw `curl` fetch confirmed this URL (and
  `passportindia.gov.in/psp/ApplyReissue`) serve only an empty
  `<div id="root">` shell with a deferred JS bundle — a genuine
  client-rendered React SPA, invisible to a static fetch or WebFetch. No
  MCP browser tool was available in this environment, so a scratch Node
  script drove Playwright directly against the locally-available Chromium
  binary at `/paperclip/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`
  (launched with `LD_LIBRARY_PATH` pointed at
  `/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu` to satisfy a missing
  `libglib-2.0.so.0`, the same sysroot this registry's browser-screenshot
  tooling uses). The rendered page's full visible text and every
  input/select/radio/button element were dumped. This confirmed, live and
  unauthenticated:
  - The exact live question set: Type of Application (Normal/Tatkaal),
    Applicant Category (Minor/Adult), Employment Type (Government/PSU/
    Statutory Body, Retired Government Official, Others), "Is applicant's
    present address different from that in the existing Passport?"
    (Yes/No), "Is applicant eligible for Non-ECR category?" (Yes/No).
  - That proof of present address is **conditional on an address change**
    for re-issue — unlike the fresh pathway (`in/mea/passport-application-
    first-adult`), where it is unconditional. Modelled as
    `presentAddressSameAsOldPassport` gating `documents[].proofOfPresentAddress`.
  - The employment-type categories used for re-issue document gating
    (Government/PSU/Statutory Body; Retired Government Official; Others),
    matching the first-adult schema's existing `employmentType` enum
    exactly, so that field was reused rather than re-invented.
- **Primary source 3 (live-rendered, same Playwright pass):**
  <https://www.passportindia.gov.in/psp/ApplyReissue> — the "Apply For
  Re-Issue of Ordinary Passport" informational page. Confirmed the
  Ordinary-vs-Diplomatic/Official routing boundary verbatim: "if you
  have/held a Diplomatic (or Official) Passport but do not have/held an
  Ordinary Passport... choose the Reissue category if applying for
  Diplomatic (or Official) Passport" — modelled as the `oldPassportType`
  eligibility field, scoping this document to Ordinary-passport re-issue
  only.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| ApplyReissue live page — Ordinary vs. Diplomatic/Official routing | `oldPassportType` |
| Column 1.2 — reissue reasons (expiry, exhaustion, damage, loss, particulars change) | `reasonForReissue` |
| Table 2(II) Section E, rows 1-15 — change-in-particulars sub-cases | `particularsChangeType` |
| Column 6.1 — Passport Details (self-explanatory column) | `oldPassportNumber`, `oldPassportDateOfIssue`, `oldPassportDateOfExpiry`, `oldPassportPlaceOfIssue` |
| Caution notice — loss reported to Police Station; Table 3 Doc 28 | `policeComplaintReference`, `documents[].policeReportOriginal` |
| Table 3, Document No. 49 (Annexure F) | `circumstancesOfLossOrDamage`, `documents[].lossOrDamageAffidavit` |
| Caution notice — passport is government property, must be surrendered; Table 3 Doc 5 | `oldPassportSurrenderDeclaration`, `documents[].oldPassportOriginal` |
| Live Document Advisor — "Is applicant's present address different...?" | `presentAddressSameAsOldPassport`, `documents[].proofOfPresentAddress` |
| Table 3, Document No. 29 | `documents[].oldPassportPhotocopyIfAvailable` |
| Table 2(II) row B.4 (Govt/PSU/Statutory, still serving); Table 3 Docs 50/51 | `documents[].noObjectionCertificate`, `documents[].priorIntimationLetter` |
| Table 2(II) row B.5 (Retired government official); Table 3 Doc 10 | `documents[].pensionPaymentOrder` |
| Table 2(II) row E.1/E.13; Table 3 Docs 14/56 | `documents[].marriageCertificateOrJointDeclaration` |
| Table 2(II) row E.2/E.3; Table 3 Docs 32/33/57 | `documents[].divorceDecree` |
| Table 2(II) row E.8; Table 3 Doc 36 | `documents[].recentPhotograph` |
| Column 2.15 narrative — minor auto-Non-ECR vs. adult reissue proof requirement | `eligibleForNonECR` description; `documents[].proofOfNonECRCategory` |
| Columns 2.1-2.17, Column 3, Column 4, Column 5, Column 7, Columns 1.4/1.5 (shared with the fresh pathway) | `surname` through `passportBookletType` — reused verbatim from `in/mea/passport-application-first-adult`, since both categories share the same physical/online form |

## What is NOT independently confirmed / out of scope

- **A live, authenticated Passport Seva Online Portal walkthrough of the
  actual entry form.** The Document Advisor and the ApplyReissue
  informational page are public and were rendered live; the actual
  application-entry screens sit behind a Login/Register wall not
  reached this cycle — the same unresolved gap `in/mea/passport-
  application-first-adult` carries.
- **Minor applicants (still under 18 at the time of the reissue
  application).** Requires Annexure D (parent/guardian consent) and a
  different supporting-document set — out of scope, a candidate for a
  future schema. This document's adult scope is deliberately wide enough
  to still cover the common "minor-to-major" transaction (a passport
  issued to a minor, reissued once its holder turns 18), since the
  applicant is an adult at the time of *this* application.
- **Diplomatic/Official passport reissue** — a distinct MEA process,
  scoped out via the `oldPassportType` eligibility field.
- **Renewal of a Short-Validity Passport (Table 2(II) row B.3)** and **the
  going-abroad-for-studies document variant (row B.6)** — narrow
  sub-cases of the `expiry` reason with their own extra document (Doc 26
  or Doc 27 respectively); not modelled as separate fields/documents in
  this pass, to keep the schema's scope comparable to the first-adult
  schema's. A future MINOR revision could add them.
- **11 of the 15 `particularsChangeType` sub-cases have no dedicated
  `documents[]` entry.** Only `name_change_marriage` /
  `addition_of_spouse_name` (marriage certificate/Annexure J),
  `name_change_divorce_or_separation` / `name_change_remarriage` (divorce
  decree), and `change_of_appearance` (recent photograph) are modelled at
  the document level. The remaining eight (`minor_name_change`,
  `major_name_change`, `name_change_government_employee`, `change_of_sex`,
  `change_of_date_of_birth`, `change_of_place_of_birth`,
  `change_of_current_address`, `change_of_signature`,
  `change_of_parent_name`, `ecr_deletion`) are captured as classification
  values only (an agent can still tell which reason applies) but their
  document requirements (e.g. Docs 34/35 for sex change, 37/38 for date/
  place-of-birth correction, 39/40 for parent-name change) are not yet
  encoded — flagged here honestly rather than guessed, per this registry's
  "spec precision over cleverness" discipline.
- **The Tatkaal (expedited) restriction is not hard-validated.** Table
  2(II) bars several reissue cases (SVP renewal, `major_name_change`,
  `change_of_sex`, `change_of_signature`, `change_of_parent_name`) from the
  Tatkaal scheme entirely. This is a joint constraint across
  `particularsChangeType` and `processingSpeed` that the current spec's
  single-condition `requiredWhen`/`eligibleValues` grammar cannot express
  without a cross-field validation rule risking a false rejection on
  legitimate combinations; disclosed in `processingSpeed`'s own
  description instead of encoded as validation.
- **`educationalQualification`'s exact closed option list** — same
  unresolved gap as the first-adult schema (booklet says "put a cross in
  the appropriate box" without listing the labels).
- **Fee amounts** — Table 4's fee figures are not encoded as a single
  authoritative amount, the same convention used throughout this registry.

## Scope and jurisdiction notes

- This is India's second `in/mea` registry entry, sitting alongside
  `in/mea/passport-application-first-adult`. Both share the great majority
  of their applicant/family/address/service-option fields verbatim, since
  MEA's Passport Application Form is a single physical/online form used
  for both Fresh and Re-issue categories (selected via Column 1.1/1.2) —
  this registry has no schema-composition mechanism (spec v0.3 has no
  `$ref`/shared-field-type facility), so the duplication here matches the
  established per-schema self-containment convention used elsewhere in
  the registry.
- `discovery/catalog.json` was updated with a new `published` candidate
  entry for `in/mea/passport-reissue`.
- Conditional flow uses `requiredWhen` (GSP-0013) throughout — every
  `notEquals`/`in` condition here is gated on an always-required field
  (`reasonForReissue`, `employmentType`, `particularsChangeType` gated on
  `reasonForReissue`, etc.), never on an optional/absent field, avoiding
  the `notEquals`-against-an-optional-field misfire this registry has hit
  before (GOV-763, GOV-1045).
- `oldPassportNumber`, `dateOfBirth`, `aadhaarNumber`, `panNumber`,
  `policeComplaintReference`, and `voterIdNumber` are marked
  `classification: sensitive-pii`; the remaining name/address/contact
  fields are marked `classification: pii`, per GSP-0006's advisory
  vocabulary — consistent with the first-adult schema.
- A from-scratch condition-evaluator script (inline `equals`/`notEquals`/
  `in` interpreter, no dependency on the registry's own tooling) exercised
  three positive profiles — (1) plain expiry, address unchanged, private
  employment; (2) lost/stolen, government employee, address changed,
  married; (3) change-of-particulars (marriage name change), retired
  government official — plus all three `eligibility` step exits. Every
  `requiredWhen`/`transitions` branch resolved as intended: profile 1
  correctly required only `oldPassportOriginal` (not the lost/stolen
  documents) and no address-change proof; profile 2 correctly required
  `policeComplaintReference`, `circumstancesOfLossOrDamage`,
  `policeReportOriginal`, `lossOrDamageAffidavit`, `proofOfPresentAddress`,
  and the two government-employee documents while correctly *not*
  requiring `oldPassportOriginal` or `oldPassportSurrenderDeclaration`;
  profile 3 correctly required `previousGivenName`, `pensionPaymentOrder`,
  and `marriageCertificateOrJointDeclaration`. The three eligibility exits
  (never held a passport, minor applicant, non-Ordinary passport type) and
  the eligible pass-through all resolved to the correct step/exitReason.
  No script is checked into the registry (structural-reference schemas in
  this registry do not carry conformance fixtures — GSP-0016 fixtures are
  used once a schema reaches `verified`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with a genuine Passport Seva
Online Portal account completes an actual online re-issue application
walkthrough (or obtains independent confirmation from someone who has),
confirming: the exact Column 6 "Passport Details" sub-field layout, the
`educationalQualification` closed option list, whether the online and
paper forms are field-identical for re-issue as they are for fresh
applications, and the current fee figures. A future MINOR revision should
also consider adding the SVP-renewal and going-abroad-for-studies
sub-cases and the remaining `particularsChangeType` document mappings
flagged above.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
