# Verification record — `us/fl/doc/llc-formation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived directly from** the live official sources below, but the
full field-by-field comparison the practice requires (confirming *every* published
field, type, requiredness, and constraint against the live form/interview —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified against an actual screen-by-screen run of the e-filing interview. It
therefore remains `draft`, not `verified`. Consumers SHOULD treat this as an
accurate, source-grounded structural reference, not a load-bearing description of
the live process.

## Sources examined

- **Document `(id, version)`:** `us/fl/doc/llc-formation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of State, Division of Corporations (Sunbiz)
- **Primary source URL:** <https://dos.fl.gov/sunbiz/start-business/efile/fl-llc/instructions/>
  ("Instructions for Articles of Organization (FL LLC)") — fetched directly via
  `curl` and parsed as plain HTML text (not summarized by an intermediary model),
  so every quoted field label and statutory citation below is verbatim from the
  live page.
- **E-filing entry / FAQ page:** <https://dos.fl.gov/sunbiz/start-business/efile/fl-llc/>
  — same domain, fetched directly — supplied the fee schedule and the online
  signature/payment mechanics ("What are my payment options...", "How do I sign
  the online form?").
- **Paper form:** *Articles of Organization for Florida Limited Liability Company*
  (PDF), <http://form.sunbiz.org/pdf/cr2e047.pdf> — downloaded directly (`curl`,
  HTTP 200, no CDN block encountered, unlike the CA LLC-1 precedent). Parsed with
  the repo's usual zlib-inflate-stream + parenthesized-`Tj`/`TJ` extraction
  convention (`node:zlib` `inflateSync` over each `stream`/`endstream` block, then
  regex over `(...)Tj` and `[...]TJ` operators) — no ad hoc PDF library needed.
  The recovered text has loose inter-letter spacing (a glyph/kerning artifact, not
  missing content) but is legible; it was used only to confirm the Article I–V
  statutory structure (name, principal/mailing address, registered agent,
  manager/authorized representative, effective date) already described in
  plain, clean prose by the Instructions page.
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer) — initial authoring
  source-review

## Not a time-versioned (edition) form

Articles of Organization is a one-time initial filing made once per LLC, not filed
"for" a recurring tax/award year — applying the GSP-0005 §2 coexistence test,
there is no scenario where two editions of the data model need to coexist for the
same applicant. This document is therefore authored at the plain (non-edition)
registry path, `registry/us/fl/doc/llc-formation/1.0.0/`. A future field-set change
ships as a new `version`, not an edition.

## Authority slug decision: `doc`, not `dos`

The issue that scoped this document (GOV-682) left the exact authority slug to the
author's judgment, with the one constraint that it be consistent with the sibling
Sunbiz annual-report schema. This document uses `doc` (Division of Corporations)
rather than `dos` (Department of State) because:

- The live source itself brands the office as the **"Division of Corporations"**
  throughout (page titles, breadcrumbs: "Division of Corporations - Florida
  Department of State"), with "Department of State" appearing only as the parent
  cabinet-level agency in the footer address block.
- Sunbiz filings — Articles of Organization, the annual report, corporate/LP/LLP
  filings, fictitious name registration, UCC — are all administered by this one
  Division, not by the Department of State's other divisions (Elections,
  Historical Resources, Library and Information Services, Arts & Culture), so a
  `doc`-scoped authority slug is the more precise and more reusable identifier
  for the whole Sunbiz family of schemas.
- This mirrors the existing `us/ca/sos/*` convention of naming the authority
  segment after the specific office that runs the filing, not a broader parent
  department.

**Convention for follow-on Sunbiz schemas (e.g. the FL annual report, FL.5 in the
GOV-664 plan):** use the same `us/fl/doc/<process>` id shape.

## What was confirmed against the source

- **Form identity and purpose, and total fees.** Articles of Organization filed
  online or by mail with the Division of Corporations to form an LLC, pursuant to
  s. 605.0201, F.S. Fee table confirmed verbatim from the live "New Florida
  Limited Liability Company Fees" table: Articles of Organization $100.00,
  Registered Agent Designation $25.00, Certified Copy (optional) $30.00,
  Certificate of Status (optional) $5.00, TOTAL $160.00 (i.e. the two optional
  add-ons are excluded from the mandatory $125.00 base).
- **LLC name requirements** (`llcType`, `llcName`): the distinguishability
  requirement, the standard vs. professional LLC name-suffix branch ("Limited
  Liability Company", "LLC", "L.L.C." vs. "Chartered", "Professional Limited
  Liability Company", "P.L.L.C.", "PLLC"), and the "do not assume the name is
  approved" caution — all transcribed verbatim from the Instructions page's
  "Limited Liability Company Name" section.
- **Principal and mailing address** (`principalAddress*`, `mailingAddress*`): the
  street-address-only requirement for the principal office (no P.O. Box
  restriction stated, and — unlike the registered agent — no in-state
  restriction), and the P.O.-Box-acceptable optional mailing address, transcribed
  verbatim from "Principal Place of Business Address" and "Mailing Address".
- **Registered agent** (`registeredAgentName`/`registeredAgentStreetAddressLine1`/
  `registeredAgentCity`/`registeredAgentState`/`registeredAgentZipCode`/
  `registeredAgentSignatureName`): the individual-or-entity eligibility rule, the
  "cannot serve as its own registered agent" rule, the Florida-physical-address
  (no P.O. Box) requirement, and the full signature mechanics (s. 605.0113(3)
  acceptance-of-obligations statement, s. 15.16 online-typed-signature validity,
  s. 831.06 forgery warning) — all transcribed verbatim from "Registered Agent
  Name and Address" and "Registered Agent's Signature".
- **Manager/Authorized Representative** (`representativeDesignation`/
  `representativeName`/`representativeAddress*`): the fully optional nature of
  this item, the MGR/AR designation vocabulary and s. 605.0102(8), F.S. citation
  for "Authorized Representative", the "do not list members" instruction, and the
  workers'-comp-exemption/bank-account note — transcribed verbatim from
  "Manager/Authorized Representative".
- **Effective date** (`effectiveDateOption`/`effectiveDate`): the
  receipt-date-is-default rule, the ±5-business-days-prior/90-days-after window,
  and the January-1-effective-date annual-report-deferral tip — transcribed
  verbatim from "Effective Date".
- **Signature and correspondence** (`authorizedSignerName`/`correspondenceName`/
  `correspondenceEmail`): the "at least one person acting as the authorized
  representative" signing rule and the online-typed-signature mechanics from
  "Signature"; the correspondence name/email purpose (filing acknowledgment,
  future email communications) from "Correspondence Name and Email".
- **Optional add-ons** (`wantsCertificateOfStatus`/`wantsCertifiedCopy`): purpose
  and $5.00/$30.00 fees transcribed verbatim from "Certificate of Status" and
  "Certified Copy".
- **Payment methods** (`documents[].methods`): credit card (Visa, MasterCard,
  American Express, Discover), debit card (Visa or MasterCard), Prepaid Sunbiz
  E-File Account (online), or check/money order (by mail) — from the e-filing
  FAQ's "What are my payment options to file the Articles of Organization
  online?" and "I don't want to file online. Can I print and mail my application
  and payment?".
- **Paper-form cross-check.** The extracted PDF text for Articles I–V (name;
  principal/mailing address; registered agent name/address/signature obligation;
  manager/authorized-representative MGR/AR designation and "do not list members";
  effective-date window) matches the Instructions page's prose description of the
  same items in substance, confirming the Instructions page (used as the primary,
  cleanly-parseable source) accurately reflects the statutory form.

## Mock-data test run

A representative filled-out filing was authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`validation` constraint in
`schema.json` with a small one-off Node script (`node:fs`, no committed
dependency):

```json
{
  "llcType": "standard",
  "llcName": "Sawgrass Creative Studio LLC",
  "principalAddressLine1": "1401 Riverplace Blvd, Suite 800",
  "principalAddressCity": "Jacksonville",
  "principalAddressState": "FL",
  "principalAddressZipCode": "32207",
  "registeredAgentName": "Denise M. Alvarez",
  "registeredAgentStreetAddressLine1": "1401 Riverplace Blvd, Suite 800",
  "registeredAgentCity": "Jacksonville",
  "registeredAgentState": "FL",
  "registeredAgentZipCode": "32207",
  "registeredAgentSignatureName": "Denise M. Alvarez",
  "effectiveDateOption": "on_filing",
  "correspondenceName": "Denise M. Alvarez",
  "correspondenceEmail": "denise@sawgrasscreative.example",
  "authorizedSignerName": "Denise M. Alvarez",
  "wantsCertificateOfStatus": true
}
```

This models a single-member, standard (non-professional) LLC that uses its own
member as registered agent, does not designate a voluntary Manager/Authorized
Representative, takes the default (on-filing) effective date, and requests an
optional Certificate of Status. The scenario exercises the `llcType: standard`
path (so `llcPurpose` correctly stays unrequired), the `effectiveDateOption:
on_filing` path (so `effectiveDate` correctly stays unrequired), and the
`representativeName`-absent path (so `representativeDesignation`/
`representativeAddress*` correctly stay unrequired), while omitting the optional
differing mailing address:

```
PASS — mock standard single-member LLC filing (own registered agent, effective on
filing, requests Certificate of Status) satisfies all field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/fl/doc/llc-formation/1.0.0/schema.json
ok   registry/us/fl/doc/llc-formation/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/fl/doc/llc-formation/1.0.0/schema.json
ok   registry/us/fl/doc/llc-formation/1.0.0/schema.json [v0.3]
```

## What is NOT yet independently verified

- **The live e-filing interview's actual screen-by-screen flow** (question order,
  exact on-screen wording, dynamic branching) was not directly observed; this
  document is sourced from the Instructions/FAQ prose and the paper PDF form,
  which the Instructions page states cover "the minimum requirements for filing
  Articles of Organization" common to both channels.
- **Constraint patterns** (string length maximums, the FL-fixed registered-agent
  state enum) are reasonable encodings consistent with the sourced field
  descriptions, not citations of a published Sunbiz field-length validation rule.
- **The ±5-business-day/90-day effective-date window** is described in
  `effectiveDate`'s field description but not structurally enforced (it depends
  on the filing's actual receipt date, which is unknown at authoring/consumption
  time).
- **Downstream/related filings** (the annual report due January 1 – May 1 of the
  following calendar year, the LLC operating agreement, the federal EIN, and
  federal beneficial ownership information reporting) are out of scope; this
  document covers the initial Articles of Organization filing only.
- **Multiple Managers/Authorized Representatives and multiple registered
  agents/organizers** beyond the single optional Manager/Authorized
  Representative modelled here are out of scope, mirroring the same
  single-item scoping decision made for `ca/on/registration/business-incorporation`.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against an **observed run of the live dos.fl.gov/sunbiz e-filing
interview** (not just its Instructions/FAQ prose) and the then-current paper form,
confirms the sources are still authoritative, resolves any newly discovered
discrepancy by shipping a new schema **version** (immutability — VERSIONING §3,
practice Procedure step 5), and records the outcome here plus sets `status:
verified` with a current `verification.lastVerifiedAt` / `nextReviewBy`. This
v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when
the Division of Corporations publishes a new revision of the Articles of
Organization form or instructions.
