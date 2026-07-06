# Verification record — `ae/icp/visa-single-entry-long-stay-pleasure` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read primary source**: ICP's own
official Smart Services user guide, retrieved as a PDF and read page-by-page
via PDF-to-image rendering (its embedded text layer is sparse — mostly step
captions and instructional prose, not the on-screen field labels themselves).
It remains `draft`, not `verified`, pending an independent second reviewer's
field-by-field pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1421](../../../../GOV-1421)). The United Arab Emirates currently only
has Taxes-vertical schemas (`ae/fta/vat-registration`,
`ae/fta/corporate-tax-registration`); this document opens **AE's 2nd
vertical (Visa)** via a single-entry, long-stay "pleasure" (visit) entry
visa sponsored by a UAE resident for a dependent/visitor, filed through the
ICP (Federal Authority for Identity, Citizenship, Customs & Port Security)
Smart Services platform.

## Source examined

- **Document `(id, version)`:** `ae/icp/visa-single-entry-long-stay-pleasure` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Authority for Identity, Citizenship, Customs & Port
  Security (ICP), United Arab Emirates
- **Primary source URL:** <https://icp.gov.ae/wp-content/uploads/2022/01/Jan2022-_-ICA_-TAH-_Smart-Services-_Individuals-Services_-En_-UM-_-V0.1.pdf>
- **Official document title:** "Federal Authority for Identity & Citizenship,
  Customs & Port Security (Smart Services) User Guide – Individuals
  Services", Version 0.1, dated January 2022
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

The guide is a plain, directly downloadable PDF from icp.gov.ae's own
WordPress media library — no login, no CAPTCHA. It is **49 pages, almost
entirely UI screenshots**: pdfjs-dist's extractable text layer yields only
step captions and instructional prose (e.g. "Enter the address information
in the required fields"), not the actual on-screen field labels visible in
each screenshot (e.g. "Shareholding Percentage"-style specifics, here things
like "Qualification", "Faith", "Local Flat Number"). Every field in this
schema was therefore read directly off the **rendered screenshots**, not the
text layer: each PDF page was rasterized to a PNG (`pdfjs-dist@3.11.174`
legacy build + `node-canvas`, using a custom `NodeCanvasFactory` — the
current `pdfjs-dist@6.x` default export throws `TypeError: Image or Canvas
expected` when painting inline/JPEG images under `node-canvas` in this
environment, so the older 3.x line was used instead) and read with Claude's
own vision capability, the same technique this registry has used for
`ae/fta/vat-registration` and `ae/fta/corporate-tax-registration`.

The live Smart Services wizard itself requires an authenticated Individuals
Services account (UAE ID / email+password login, per pp.6-14 of the guide);
this is expected and out of scope — the guide's own screenshots (taken from
an already-logged-in "Test User" sponsor session) and the downloadable PDF
require no login to read.

## What was confirmed directly (verbatim, from the rendered screenshots)

The guide's "Submit a Request" section (pp.20-32) walks a single worked
example end-to-end: selecting Department → Module ("Visa") → Service
("Single Entry") → Sub Service ("Long Stay Pleasure") → Service Action
("Issue New Visa") on p.20-21, then completing the resulting 5-stage wizard
(`Applicant Info → Address Info → Attachments Info → Review Application →
Application Fees`, shown as a numbered 1-5 stepper inside a 3-labelled-step
shell on every wizard screenshot):

- **p.22-23, First Step – Applicant Info:** the "Personal Information For
  Sponsored (Service Beneficiary)" accordion panel (Relationship, Name
  English/Arabic, Current/Previous Nationality, Gender, Date Of Birth, Birth
  Country, Marital Status, Place Of Birth English/Arabic, Mother Name
  English/Arabic, Qualification, Professions, Religion, Faith, Visit Reason)
  and the "Passport Information" panel (Passport Type, No, Issue Place
  English/Arabic, Issue Date, Expire Date, Issue Country). A read-only
  "Host Information" block above them (the sponsor's own English/Arabic
  name, nationality, Host Number, UAE Unified No., passport no./expiry,
  Category "Residence Sponsor", Emirates ID, DOB) is **not modelled** — it is
  the logged-in sponsor's own pre-populated account data, not applicant
  input this schema collects.
- **p.24, First Step – Address Info:** the full "Inside UAE Address" block
  (Emirate, City, Area, Detailed Address, Building/Hotel, Local Flat Number,
  P.O. Box, UAE Mobile Number with country-code prefix, Residence Tel with
  country-code prefix, Email) and "Address outside UAE" block (Abroad
  Country, Detailed Address Outside UAE, Permanent Mobile Number with
  country-code prefix). An "Add New Address" button is visible next to
  "Inside UAE Address", implying a repeating address list (see "Out of
  scope" below).
- **p.25-26, Second Step – Attachments Info:** all **14** named document
  checklist items, each with an explicit (Required)/(Optional) tag, read
  verbatim: (1) Copy of the Sponsor's Passport valid for minimum of six
  months (Required), (2) Colored Photo (Required), (3) Copy of Sponsor's
  Passport (Required), (4) Place of Residence (Rent Contract or Hotel
  Reservation) - Mandatory for residents only (Optional), (5) Proof of
  Kinship (Optional), (6) Health Insurance covers the period of stay
  (Optional), (7) Birth Certificates of children which shall be duly
  attested (Optional), (8) Salary Certificate (Optional), (9) Copy of Trade
  License (Investor) (Optional), (10) A copy of the Sponsor's Residence
  (Optional), (11) Electricity Bill (Optional), (12) Copy of the Traveling
  Return Ticket (Optional), (13) Certified Account Statement (Optional),
  (14) A copy of Deposit Paper (in case of old system payment) (Optional).
  Also confirmed: a blue info callout listing the 7 government authorities
  whose systems some attachments are auto-fetched from (Abu Dhabi
  Municipality, Health Authority of Abu Dhabi, Emirates Identity Authority,
  Department of Economic Development Abu Dhabi, Abu Dhabi Police, Abu Dhabi
  Water and Electricity Authority, Ministry of Health), the Daman-insurance
  carve-out note, and the upload constraints ("Attachment max size 2 mega
  byte"; "Allowed Types: .jpeg, .jpg, .pdf") — both encoded in each
  document's `constraints`.
- **p.27-28, Second Step – Review Application:** a pure read-only recap of
  every prior step's entered values (Host Information, Personal Information,
  Passport Information, Addresses Info, Attachments Info) — **not modelled**
  as fields, consistent with this registry's convention of not modelling
  read-only summary views.
- **p.29-31, Third Step – Application Fees:** the fee schedule table (Urgent
  Service Fees, Request Fees, Issue Fees, Security Deposits, E-Services
  Fees, ICA Fees — all source-computed amounts, not applicant input, so not
  modelled as fields), the "Healthy Insurance" selector (a red-asterisked,
  required choice between two named providers shown simultaneously,
  "Dhafra Insurance Fees" and "ADNIC Insurance Fees"), the "I Agree to the
  Terms and Conditions" checkbox, and the "Pay using" step offering two
  distinct, simultaneously-visible payment options ("Amwal" branded credit
  card, or "Pay Later"). p.31's "Payment Details" screen (Card Type
  Visa/Mastercard, Card Number, Expiration Month/Year, CVN) is a
  third-party Amwal-hosted payment-gateway page — **not modelled**, the same
  way no other schema in this registry models a raw card-entry field.
- **p.32:** a receipt sample (read-only) — not modelled.

## Judgment calls / scope cuts (read before reviewing)

1. **Undocumented dropdown option lists.** Almost every dropdown field in
   this guide (Relationship, Current/Previous Nationality, Gender, Birth
   Country, Marital Status, Qualification, Profession, Religion, Faith,
   Passport Type, Passport Issue Country, City, Area, Abroad Country) shows
   only its **selected value** in the worked example's screenshot — the
   guide never expands any of these dropdowns to show the full option list
   (unlike, say, `ae/fta/vat-registration`'s Entity Type field, whose full
   12-item list was printed verbatim in a source "Note" callout). Per the
   discipline already established by `au/aec/voter-enrolment`'s `gender`
   field, this schema does **not** invent an enum for any of these — they
   are all modelled as `type: "string"` with a description stating only the
   confirmed selected value from the screenshot. A reviewer with access to
   the live (authenticated) wizard should check whether any of these are
   worth promoting to `enum` once the real option lists can be confirmed.
2. **`insideUaeEmirate` enum reused by analogy, not independently
   re-confirmed.** This is the one dropdown modelled as `enum` rather than
   `string`. The guide's own screenshot only shows "Abu Dhabi" selected, not
   an expanded list. The 7-value enum (`abu_dhabi`, `dubai`, `sharjah`,
   `ajman`, `umm_al_quwain`, `ras_al_khaimah`, `fujairah`) is carried over
   from the sibling `ae/fta/vat-registration` document's own confirmed
   "Emirates" dropdown (its full 7-item list was independently verified
   there). This is a deliberate judgment call — the 7 Emirates are a small,
   fixed, universally known real-world list independent of any one
   government form, so the risk of divergence is low, but a reviewer should
   flag this if the live ICP wizard's Emirate list differs (e.g. omits or
   orders differently) from the FTA one.
3. **Duplicate-looking passport-copy attachment items.** Attachment items
   (1) "Copy of the Sponsor's Passport valid for minimum of six months"
   (Required) and (3) "Copy of Sponsor's Passport" (Required) both name the
   Sponsor's passport and are both marked Required — this looks redundant,
   but it is read verbatim, twice, from the source screenshot (confirmed at
   4.5x and cropped for legibility). It has not been "corrected" or merged
   into one document; a reviewer should re-check this isn't a rendering
   artifact by re-fetching and re-rendering p.25 independently.
4. **`belongsTo` assignment on attachments is inferred, not stated.** The
   spec's `belongsTo` enum (`applicant`, `dependent`, `responsible-party`,
   `other`) has no dedicated "sponsor" value. This schema treats the
   sponsored beneficiary (the person the visa is actually issued to) as
   `applicant`, and the UAE-resident sponsor/Host (the account holder who
   files the request) as `responsible-party`. Documents explicitly named
   "Sponsor's ..." (passport ×2, Residence, Salary Certificate, Trade
   License, Electricity Bill, Certified Account Statement) are tagged
   `responsible-party`; identity/insurance/ticket documents about the
   sponsored person are tagged `applicant`; Proof of Kinship and the
   old-system Deposit Paper are tagged `other` since neither party
   exclusively "owns" them. None of this ownership split is stated
   explicitly in the source guide — it is inferred from each label's
   plain-English meaning and this vertical's usual UAE-sponsorship pattern,
   and a reviewer should sanity-check each assignment.
5. **No array/repeating-field type (GSP-0009).** GovSchema v0.3 has no
   array/repeating-group type. Two repeating structures are visible in the
   source but modelled only as their first/bounded instance: (a) the
   sponsor may sponsor **multiple dependents** in principle (the whole
   "Sponsored" feature, pp.35-41, manages many sponsored individuals per
   account), but this document — like `ae/fta/vat-registration`'s
   analogous repeating groups — models exactly one sponsored
   beneficiary/applicant per schema instance (i.e., one application =
   one beneficiary), matching the worked example itself; (b) the "Inside
   UAE Address" panel's own "Add New Address" button (p.24) implies more
   than one inside-UAE address can be attached to a single application —
   only the first/primary address is modelled here.
6. **Collapsed, never-expanded panels are out of scope.** Two accordion
   panels visible above "Personal Information For Sponsored" on p.22 —
   "Notes" and "Identification Information For Sponsored (Service
   Beneficiary)" — are shown collapsed (a "+" toggle) throughout the guide
   and never expanded/screenshotted. Their contents (plausibly, by analogy
   with the Host Information block, something like "does the beneficiary
   already have a UAE Emirates ID / Unified Number?") are **not modelled**,
   since nothing about their actual fields is directly confirmable from this
   source. A reviewer with live-wizard access should expand and document
   these if the schema is to advance toward `verified`.
7. **`requestUrgentService` semantics are ambiguous.** The Application Fees
   screenshot (p.29) shows "URGENT SERVICE FEES" with its checkbox unchecked
   and its whole row struck through (visually similar to a disabled/
   unavailable state, not merely "left unchecked"). It isn't possible to
   tell from a single static screenshot whether urgent service was simply
   not selected in this example or is categorically unavailable for this
   particular service/scenario. Modelled here as an ordinary optional
   boolean; a reviewer with live-wizard access should confirm which reading
   is correct.
8. **Payment-gateway fields excluded.** The Amwal-hosted "Payment Details"
   screen (p.31: Card Type, Card Number, Expiration Month/Year, CVN) is a
   third-party PCI-scope payment page, not ICP's own application data model
   — excluded the same way no other schema in this registry models raw
   card-entry fields. Only the wizard's own `paymentMethod` choice
   (credit card vs. "Pay Later") is modelled.
9. **Fee-schedule line items are not modelled as fields.** Request Fees,
   Issue Fees, Security Deposits, E-Services Fees, and ICA Fees on p.29 are
   source-computed, read-only amounts (not applicant-editable), so — like
   every other schema in this registry — they are described in prose only,
   not as `fields`.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the guide PDF and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual screenshot.
2. Confirm ICP has not since published a newer guide revision superseding
   V0.1 (Jan 2022) — this platform's UI may have evolved materially since
   2022, and only this one guide version was found this cycle.
3. If feasible, obtain access to the live (authenticated) Smart Services
   wizard to confirm or replace the `string`-typed dropdown fields with real
   `enum` option lists, expand the two collapsed accordion panels noted
   above, and resolve the `requestUrgentService` and duplicate-passport-copy
   ambiguities noted above.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer guide revision has been
published, on or before that date and on any `source.url` change.
