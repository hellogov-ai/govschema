# Verification record — `in/mca/company-incorporation-spice-plus` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

`draft`, not `verified`, because no live walkthrough of the MCA21 portal
wizard was performed — see "What was not done" below. This schema is
sourced from the MCA's own downloadable instruction kits plus a very recent
Wayback Machine capture of the live Adaptive Form HTML itself.

## Sources examined

- **Document `(id, version)`:** `in/mca/company-incorporation-spice-plus` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Corporate Affairs, Government of India (MCA21
  portal), under the *Companies Act, 2013* and the *Companies (Incorporation)
  Rules, 2014*.
- **Direct access attempts to `mca.gov.in` all failed with HTTP 403**
  (`curl`, `WebFetch`, and a headless Playwright pass with a realistic
  desktop user agent all returned Akamai's `Access Denied` edge page,
  `errors.edgesuite.net`). This is an IP/ASN-level WAF block, not a
  JavaScript bot-challenge — the same class of permanent block previously
  hit at `nzta.govt.nz` and `i-kfz.de` (see `gov474-dmv-business-formation-
  vertical-and-xfa-extraction` in prior-cycle notes) — so a real browser
  from this environment's egress does not defeat it.
- **`https://web.archive.org/web/20230331084143/https://www.mca.gov.in/content/dam/mca-aem-forms/instructionkits/Instruction%20Kit_SPICe+Part%20A.pdf`**
  — "Instruction Kit for webform SPICe+ Part A (Name Reservation)" (11
  pages). Retrieved via `curl` against the Wayback Machine mirror (HTTP 200,
  499,364 bytes), text-extracted with a scratch npm install of `pdfjs-dist`
  (legacy build). Supplies the name-reservation field-level instructions
  (proposed name rules, NIC-code search, fee schedule) referenced by
  `proposedName1`/`proposedName2`/`nicCode1..3`.
- **`https://web.archive.org/web/20230714092841/https://www.mca.gov.in/content/dam/mca-aem-forms/instructionkits/Instruction%20Kit_SPICe%20+%20Part%20B.pdf`**
  — "Instruction Kit for Form No. SPICe+ Part B" (19 pages). Retrieved and
  decoded the same way (HTTP 200, 439,593 bytes). Supplies the numbered
  field-level validation rules quoted in several `description`s (e.g.
  `entrenchmentArticleCount`'s 88-article cap for a Private OPC, the
  authorized/subscribed-capital comparison rule, OPC eligibility criteria
  under Rule 3, DIN-count caps).
- **`https://web.archive.org/web/20260109225642/https://www.mca.gov.in/content/forms/af/mca-aem-forms/spice-part-b/spice-plus-part-b.html`**
  — a Wayback Machine snapshot of the **live SPICe+ Part B Adaptive Form
  HTML itself**, captured 2026-01-09 (six months before this review),
  retrieved via `curl` (HTTP 200, 5,730,099 bytes as served by
  `web.archive.org`). Unlike the two instruction kits (which only narrate
  "fields that require detailed instructions," per their own stated scope),
  this capture's rendered DOM text contains the **complete field-by-field
  structure** of the actual portal form: every section heading, numbered
  sub-section (1(a), 3A(i), 4A/4B/4C, 5, 6A/6B/6C, 7A/7B/7C/7D, 8A/8B, 9A/9B,
  10, 11, 12, 13), every printed field label, every dropdown's enumerated
  options, and every mandatory-field asterisk. This is this document's
  **primary field-level source** — every field name, label, enum option,
  and `sourceRef` in this schema is drawn from this capture's text (a
  Python regex-stripped rendering of the archived HTML's visible DOM text,
  saved to a scratch file and read section-by-section; no client-side
  JSON/AEM guide metadata was present in the archived capture, only the
  server-rendered text nodes).
- **Web search** confirmed OPC eligibility (Section 3, Companies Act 2013;
  Rule 3, Companies (Incorporation) Rules, 2014 — natural person, Indian
  citizen, resident in India, one nominee required) and the AGILE-PRO-S
  linked-form scope (GSTIN/EPFO/ESIC/PTEC-PTRC/Shops & Establishment/bank
  account) cited in this schema's top-level `description` and "Out of
  scope" section below — used only to state those rules in prose, not as a
  field-level source.

## What was not done — the one honest gap

No live walkthrough of the MCA21 portal's SPICe+ wizard was performed.
`mca.gov.in` returned HTTP 403 (Akamai WAF) for every access path attempted
in this environment — direct `curl`, `WebFetch`, and a headless Playwright
browser session with a realistic desktop Chrome user agent. This is
consistent with prior-cycle findings for the same domain (GOV-887: "MCA21
(mca.gov.in) 403-blocks direct WebFetch/curl, the same class of block hit at
nzta.govt.nz/i-kfz.de"). Because the block operates at the IP/ASN level
rather than via a JavaScript challenge, a real browser did not change the
outcome — this rules out the `ie/irishimmigration`-style bot-check-defeat
technique for this particular source.

A future review with different network egress, or MCA account credentials
for an authenticated session, should drive the live wizard directly to
confirm on-screen field ordering, client-side validation masks, and whether
the OTP-verification steps noted in this schema's field descriptions
(`companyMobileNumber`, `companyEmail`, and each person's mobile/email) match
the modelled fields exactly.

## Test run performed

Phase 4 of this cycle's research brief calls for a test run with valid mock
data. Since the live wizard could not be reached, this was performed as a
structural test: a scratch Node script (`/tmp/spice-test/mocktest.mjs`, not
checked into the registry) implements the GSP-0013 condition grammar
(`equals`/`in`/`all`/`any`/`not`) and resolves `visibleWhen`/`requiredWhen`
against three independent mock OPC incorporations:

1. A retail-trading OPC with a single founder and nominee, e-stamp duty paid
   electronically through MCA21, and a Company Secretary as the certifying
   professional.
2. The same OPC but with an entrenched AOA (`entrenchmentArticleCount`
   gated field), manually-paid (non-electronic) stamp duty (four
   conditionally-required fields), and an Advocate as the certifying
   professional (exercising `professionalMembershipCategory`'s
   `requiredWhen` — not required for an Advocate).
3. The same OPC with `sourceOfIncome` set to `no_income` (so
   `businessProfessionCode` is correctly *not* required) and both optional
   second/third NIC codes and a second proposed name supplied.

All three scenarios: (a) supply every field that is required given its
resolved visibility, (b) pass each field's own `validation`
(pattern/enum/min-max), and (c) contain no reference to a field name absent
from `fields[]` across every `visibleWhen`, `requiredWhen`, `documents[]`
`requiredWhen`, and `steps[].fields` entry. All three passed on the first
run; no schema defect was found by this test.

The schema also validates against both the zero-dependency structural
checker (`tools/validate.mjs`) and the full JSON Schema draft 2020-12
meta-schema via ajv (`tools/validate-ajv.mjs`).

## Modelling decisions

- **Scoped to a One Person Company (OPC), not a Private/Public/Producer/
  Section 8/Nidhi company or a Part I LLP-to-company conversion.** SPICe+ is
  one generic web form spanning every Indian company type; modelling every
  branch in one document would require enumerating each type's distinct
  subscriber/capital/nomination rules. OPC is chosen as the closest Indian
  analogue to a single-founder LLC formation — the same scoping instinct
  `gb/companies-house/company-incorporation-in01` used picking "the common
  case where one person is the sole director, the sole initial
  shareholder/subscriber" for GB's IN01. An OPC's structural minimum (one
  individual subscriber-cum-director, one mandatory nominee, one share
  class) also keeps the subscriber/director particulars in §§6–7 to a single
  block (§7B) instead of the form's repeating non-individual/multiple-
  subscriber tables.
- **`typeOfCompany` is not modelled as a field.** The live form's dropdown
  offers Private (OPC)/Private/Public/Producer/Part I Others/etc., but since
  this document's scope is fixed to OPC, the dropdown's other branches would
  never be exercised — same precedent as `gb/companies-house/company-
  incorporation-in01`, which likewise omits a "type of company" field
  because its scope is fixed to private-limited-by-shares.
- **Founder modelled as "not having valid DIN" (§7B), not "having valid
  DIN" (§7A).** A first-time solo founder incorporating their first company
  does not yet hold a Director Identification Number — SPICe+ itself is how
  DIN gets allotted (Companies Act 2013 s.7 read with s.153/154). The
  "having DIN" branch (§7A) is the case of someone who already directs
  another company and is out of scope.
- **`founderNationality`/`nomineeNationality` enums restricted to
  `["india"]`, and `founderCitizenOfIndia`/`founderResidentInIndia` fixed to
  `true` via `validation.enum: [true]`.** Rule 3, Companies (Incorporation)
  Rules, 2014 restricts OPC eligibility (as subscriber or nominee) to a
  natural person who is an Indian citizen resident in India. Rather than
  model these as free enums that could accept a value this document's scope
  can't otherwise support (a non-Indian OPC subscriber is not legally
  possible), the constraint is encoded directly in `validation`, following
  this registry's convention of using `enum: [true]`/`enum: [<value>]` to
  pin a field to its only legally-possible value for the documented scope
  (see also `hasShareCapital`, `addressIsRegisteredOffice`, and each
  person's `PresentAddressSameAsPermanent` below).
- **`hasShareCapital`, `addressIsRegisteredOffice`, and each person's
  `PresentAddressSameAsPermanent` are real printed form fields, pinned to
  their common-case value (`true`) via `validation.enum: [true]`, rather
  than omitted.** Unlike `typeOfCompany` (a branch-selector this document's
  scope makes moot), these three are genuine yes/no questions every OPC
  filer answers, and the `false` branch in each case leads to real,
  additional on-screen fields (a company limited by guarantee's member-count
  table at §3B; a registered office distinct from the correspondence
  address; a present address distinct from the permanent one) that this
  version does not model. Pinning the field with `validation.enum: [true]`
  keeps the question itself faithful to the source form while making the
  scope boundary machine-checkable rather than only prose-documented.
- **Preference share capital (§3A(ii)) not modelled.** Optional and rare for
  a newly-incorporated OPC (which typically issues only equity shares);
  omitted along with the "not having share capital"/§3B member-count branch.
- **Entrenchment sub-table (Sr. No./Article number/description, under
  §1(b)) not modelled beyond the boolean gate and article count.** A rare
  edge case (custom AOA entrenchment clauses) whose repeating-row detail
  would add a disproportionate number of fields for a first version; the
  gating boolean and numeric cap are kept since they are simple, always-
  visible-on-the-form fields.
- **Duration-of-stay-less-than-one-year → previous-residence-address
  branch (§7B(i), §8B) not modelled.** An edge case (a founder or nominee
  who moved within the last year); `DurationOfStayYears`/`Months` are
  collected, but the conditional previous-address sub-block is out of scope
  for this version.
- **PAN/TAN jurisdiction codes (`panAreaCode`/`AoType`/`RangeCode`/`AoNumber`
  and their TAN counterparts) modelled as free-form strings, not enums.**
  These are official area/AO/range codes assigned by the Income Tax
  Department based on the registered office's jurisdiction (a large,
  address-dependent lookup table not published in either instruction kit or
  captured in the Adaptive Form snapshot), so no closed enum could be
  sourced faithfully; left as validated strings per this registry's
  practice of not inventing enum values the source does not publish.
- **Multi-paragraph declaration blocks (§12 "Declaration", §13 "Declaration
  and Certification by Professional") each combined into one or two boolean
  fields** (`nameAndRegistrationDeclaration`,
  `directorDisqualificationDeclaration`), rather than one field per
  sentence, since each block is attached to a single digital signature on
  the live form — the same discipline used for `in/eci/voter-registration`'s
  `declarationAndConsent` and `nz/dia/passport-renewal-adult`'s combined
  declaration fields.
- **OTP verification (mobile/email, throughout §§4A, 7B, 8B) not modelled
  as separate fields.** The OTP itself is a live-session runtime
  verification step performed against the value already collected in the
  mobile/email field, not a further piece of applicant-supplied data —
  documented in each affected field's `description` instead.
- **`borderingCountryNationalSecurityClearance` retained even though this
  document's `founderNationality` is pinned to `india`.** This declaration
  is a printed, always-asked yes/no on the live form regardless of the
  signing director's own nationality (it exists to cover cases where a
  *different* proposed director is a bordering-country national), so it
  remains a real field; its `true` branch requires the
  `borderingCountrySecurityClearanceDocument` attachment (`documents[]`,
  `requiredWhen`).
- **Comb/derived/system-computed amounts omitted.** `Total classified/
  unclassified authorized share capital` (§3A) and the §9B(i) auto-computed
  stamp-duty-payable table are system-calculated from other collected
  values (number of shares × nominal value; authorized capital → fee
  schedule) rather than independently applicant-supplied, so — consistent
  with how this registry omits purely derived/prefilled fields elsewhere —
  they are not modelled; only the inputs that drive those computations are.
- **AGILE-PRO-S, eMoA/eAoA, INC-9, and URC-1 linked web forms not
  modelled.** SPICe+ Part B's submission enables access to these as
  *separate* linked forms (GSTIN/EPFO/ESIC/PTEC-PTRC/Shops & Establishment
  registration and bank-account opening via AGILE-PRO-S; electronic MOA/AOA;
  declaration-in-lieu-of-affidavit via INC-9; Part I company conversion via
  URC-1) — each is its own webform with its own field set, out of scope for
  this version. Per Annexure A of the SPICe+ Part B instruction kit, e-MoA/
  e-AoA is used automatically (not a manual attachment) whenever total
  subscribers ≤ 7, which is always true for an OPC's single subscriber, so
  `documents[]` omits a manual MOA/AOA attachment entry for this scope.

## Out of scope

- **Private (non-OPC), Public, Producer, Section 8, and Nidhi companies**,
  and **Part I LLP-to-company conversions** — each has distinct subscriber-
  count minimums, capital-structure rules, and/or additional licensing
  fields (e.g. Section 8's license application) not modelled here.
- **Non-individual (corporate) subscribers and multiple individual
  subscribers/directors** (SPICe+ Part B §§6A, 6B, 6C, 7A, 7C, 7D) — an OPC
  has exactly one subscriber-cum-director by definition, so this document
  models only §7B.
- **Companies not having share capital** (§3B) and **preference share
  capital** (§3A(ii)).
- **A registered office address distinct from the correspondence address**,
  and **a present address distinct from the permanent address** for the
  founder or nominee — both pinned to their common-case `true` value (see
  Modelling decisions).
- **AGILE-PRO-S, eMoA/eAoA, INC-9, and URC-1 linked forms** (GSTIN, EPFO,
  ESIC, PTEC/PTRC, Shops & Establishment registration, bank account opening)
  — separate webforms with their own field sets; a natural candidate for a
  future GovSchema document once SPICe+ Part B itself is promoted past
  `draft`.
- **Foreign Exchange Management Act (FEMA) non-debt-instruments
  declarations** (printed throughout §§6–7 for subscribers subscribing to
  shares) — not applicable given `founderNationality`/`nomineeNationality`
  are pinned to `india`.
- **Resubmission flow** (a rejected/`Resubmission Required` SRN resubmitted
  with corrections) — this document models only the initial-submission data
  shape.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-03** (6
months). Re-check whether `mca.gov.in` is reachable from a different
network egress or via an authenticated MCA account session, and attempt a
live walkthrough of the SPICe+ Part A + Part B wizard; if successful,
promote `status` to `verified` and confirm the Adaptive Form snapshot used
here has not since changed field structure.
