# Verification record — `ph/bir/tin-application-corporations-partnerships` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

This document was derived from BIR's own official, current, downloadable
PDF form (BIR Form No. 1903, October 2025 ENCS edition), not a live-browser
walk of BIR's ORUS online registration system (which requires an account
login — see below). It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass, and pending an ORUS
walk-through if a test account ever becomes available.

## Why this document exists

This cycle (GOV-1444, `GovSchema Standard Research`) evaluated candidates in
the order the task brief suggested: (a) a fresh look at IE Form CT1
(re-confirmed a poor candidate — see "Candidates rejected this cycle" below),
then (b) a genuinely new (17th) jurisdiction. The Philippines' Bureau of
Internal Revenue (BIR) publishes its own registration forms directly on its
CDN (`bir-cdn.bir.gov.ph`) as real, current, downloadable PDFs with a
genuine text layer — no login, CAPTCHA, or WAF gate, and no page-rendering/
OCR needed, the strongest sourcing shape available to this cycle among every
candidate examined (see below). BIR Form 1903 is the corporations/
partnerships/GAI/LGU/cooperative/association counterpart to BIR Form 1901
(individuals) for TIN registration, and is this registry's closest Philippine
analogue to `us/irs/employer-identification-number-ss4` and
`mx/sat/preinscripcion-rfc-persona-moral`, so it is classified under Business
Formation the same way. This opens the Philippines as the registry's 17th
jurisdiction.

## Source examined

- **Document `(id, version)`:** `ph/bir/tin-application-corporations-partnerships` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bureau of Internal Revenue (BIR), Republic of the Philippines
- **Primary source:** `https://bir-cdn.bir.gov.ph/BIR/pdf/1903%20October%202025%20ENCS%20-%20Final.pdf`
  — "Application for Registration", BIR Form No. 1903 (October 2025 ENCS —
  Enhanced No Contact Service — edition), 4 pages. HTTP 200, genuine PDF,
  896,172 bytes, fetched directly (no Wayback detour needed — the live host
  is directly reachable from this environment). A canonical listing page for
  this form also exists at
  `https://www.bir.gov.ph/bir-forms?tab=Application+Forms&idTag=BIR1903&datasetCode=3381&label=1903&type=TAB+LINK`
  (confirmed HTTP 200), though the direct CDN PDF link is cited as
  `source.url` since it is the actual document reviewed, consistent with this
  registry's convention of citing the document actually used.
- **Live counterpart not used as source:** BIR's Online Registration and
  Update System (ORUS, `orus.bir.gov.ph`) mirrors much of this same
  registration online, but requires an account/login to use; not walked
  interactively this cycle.
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched the form PDF directly via `curl` (HTTP 200, no redirect, no bot
   mitigation encountered).
2. Extracted the PDF's text layer with `pdfjs-dist` (pinned to `3.11.174`
   per this cycle's own task brief) via `getTextContent`. Unlike several
   prior screenshot-only PDF sources in this registry (e.g.
   `mx/semovi/alta-vehiculo-foraneo`), this form carries a genuine text
   layer across every field label, checkbox option, and instruction on all
   4 pages — the strongest single source examined this cycle.
3. Cross-checked the extracted text against each page rendered to PNG at 3x
   scale via `pdfjs-dist`'s page-rendering API (using the `canvas`
   (node-canvas) backend, consistent with the working technique noted in
   `mx/semovi/alta-vehiculo-foraneo`'s own VERIFICATION.md), to confirm
   checkbox groupings, column pairing (e.g. the two-column, 19-option
   `taxpayerType` layout), and which items are marked "(To be filled out by
   BIR)" versus applicant-entered. The standard font data warnings pdfjs
   emitted during rendering (`fetchStandardFontData`) affected only a few
   bold section-header glyphs' visual rendering, not the separately-extracted
   text layer relied on for every field label in this document, and did not
   affect checkbox/box layout, which was still clearly legible.
4. No worked fictional example is provided by this source (it is a blank
   form, not a filled-in guide/manual with one applicant's values carried
   through, unlike e.g. `mx/sat/preinscripcion-rfc-persona-moral`'s
   "LA CAPERUCITA ROJA" guide) — example values in this document's own field
   descriptions/labels are GovSchema's own plausible values, not transcribed
   from the source.

## What was confirmed directly (verbatim, from the form's own text/layout)

- The three registering-office pathways (Head Office/Branch Office/Facility)
  and that this document models only the Head Office pathway (p.1 header).
- The full 19-option `taxpayerType` checkbox list (p.1, Item 5), confirmed
  both from the extracted text and the rendered two-column layout.
- The ten-component `businessAddress` block (p.1, Item 10): Unit/Room/Floor/
  Building No., Building Name/Tower, Lot/Block/Phase/House No., Street Name,
  Subdivision/Village/Zone, Barangay, Town/District, Municipality/City,
  Province, ZIP Code — and that the identical ten-component block recurs
  for the authorized representative's address (Item 21).
- That Items 2 ("BIR Registration Date"), 4 ("RDO Code (For Taxpayer with
  existing TIN)"), 12 ("Municipality Code"), 27A ("Facility Code"), and the
  entirety of Item 28 ("Tax Types...this portion determines your tax
  liability/ies") are each explicitly printed on the form itself as "(To be
  filled out by BIR)" — none of these is modelled in `fields[]`, since they
  are not applicant input. This is a directly-confirmed textual fact, not an
  inference.
- The single-contact-number-plus-type-checkbox pattern (rather than three
  separate landline/fax/mobile fields) used identically at Item 14 (business),
  Item 22 (representative), confirmed both in the extracted text and the
  rendered layout (one blank entry line beneath three type checkboxes).
- The full Documentary Requirements section (p.4) for a Head Office
  registration: the SEC/CDA/HLURB/DOLE certificate-of-registration
  alternatives; the representative-authorization and representative-ID
  requirements ("if transacting through a Representative"); the BIR Printed
  Invoice/own-invoice-sample requirement; and the P30.00 loose DST
  payment-proof note.
- The perjury/Data Privacy Act (R.A. No. 10173) declaration text (p.3),
  modelled as the boolean `declarationAccepted` field.

## Interpretive judgment calls flagged for an independent reviewer

1. **Scoped to the Head Office pathway only.** `registeringOfficeType` is
   modelled as a 3-value enum for structural completeness, but the Branch
   Office and Facility pathways' own additional fields (Part V, "Facility
   Details", Items 27A-27C, and the branch-specific documentary requirements
   listed separately on p.4) are entirely out of scope for this v1.0.0.
2. **Part VI (Tax Types, Item 28) is excluded in full.** The form's own text
   states this section "determines your tax liability/ies" and is
   "(To be filled out by BIR)" — it is a BIR-internal determination based on
   the taxpayer's other answers, not an applicant-completed field, so no
   `fields[]` entry models it.
3. **Part VII (Invoices, Items 29-30, Authority to Print Invoices) is
   entirely out of scope.** This is a distinct, optional sub-process (whether
   the taxpayer will use BIR-printed invoices vs. its own accredited-printer
   invoices, and that printer's own accreditation details) layered on top of
   the base registration; modelling it would roughly double this document's
   already-large field count for a sub-process most registrants do not need
   at the point of initial registration. The base Documentary Requirements'
   own invoice-sample requirement (`invoiceSampleFile`) is modelled since it
   is listed as a general registration requirement independent of Part VII's
   own field set.
4. **Items 25-26 (Incentive Details / Details of Registration-Accreditation,
   e.g. PEZA, BOI investment-promotion registration) are out of scope.**
   These apply only to entities with a separate investment-promotion-agency
   accreditation, a materially different sub-population from a baseline new
   registration.
5. **Part V (Facility Details, Items 27A-27C) is out of scope** — see
   judgment call 1.
6. **`taxEffectivityDate` (Item 9's "Effectivity Date" column) is modelled
   as its own field with an acknowledged captioning ambiguity.** The form
   groups "Accounting Start Month (For Fiscal Year Only)" and "Effectivity
   Date (MM/DD/YYYY)" under the same Item 9 heading, on the same row, without
   further clarifying prose about what the effectivity date is effective
   for. Rather than assuming it duplicates `dateOfIncorporation` or
   `fiscalYearStartMonth`, it is modelled as a distinct, always-optional
   field with this ambiguity disclosed in its own description.
7. **`representativeAddress` (Item 21) is modelled as a single string field,
   not broken into the same ten components as `businessAddress`,** even
   though the form's own layout repeats the identical ten-box address block
   for the representative. This is a scope-management judgment call to keep
   an already-large document (61 fields) tractable; a future version could
   re-derive the ten components identically. Disclosed directly in the
   field's own description.
8. **`stockholderName`/`stockholderTin` (Item 31) are bounded to a single
   representative instance**, though the form's own table shows five
   repeatable rows plus an "attach additional sheet/s if necessary" note —
   following this registry's established convention for repeating structures
   pending GSP-0009 (composite/repeating values; see e.g.
   `mx/sat/preinscripcion-rfc-persona-moral`'s six analogous scope cuts).
9. **`primaryIndustryTradeName`/`primaryIndustryLineOfBusiness` are modelled
   as required, while their Secondary counterparts and the remaining
   sub-fields (Regulatory Body, Business Registration Number/Date) are
   modelled as optional.** The form's own layout does not print explicit
   asterisks/required-markers next to Item 24's Industry sub-fields the way
   it does for many Part I fields (e.g. Item 6's `registeredName`), but a
   Primary trade name and line of business are a logical minimum for any
   registrant to state what business it is in; this is a judgment call, not
   a directly-confirmed requiredness cue, and is flagged here accordingly.
10. **`existingTin` is modelled as optional/free**, since the form shows the
    TIN box pre-templated with a placeholder branch-code pattern ("0 0 0 0
    0") for a brand-new Head Office registration rather than an
    applicant-entered value in that scenario; it is genuinely applicant-input
    only for a Branch/Facility registration under an existing TIN, which
    this v1.0.0 does not otherwise model in full (judgment call 1).
11. **PII/sensitive-PII `classification` hints** follow this registry's
    established convention: names, addresses, and contact details are
    tagged `pii`; TIN fields (a Philippine government-issued taxpayer
    identifier) are tagged `sensitive-pii`, mirroring how MX schemas tag
    CURP/RFC-shaped fields in this same registry.
12. **No jurisdiction-specific format regex is asserted for Philippine TIN,
    contact numbers, or the SBN/PBN**, since the form itself does not publish
    a canonical format string for any of them (unlike, say, a fixed-length
    national ID format elsewhere in this registry) — modelled as open
    strings rather than a guessed pattern.

## What is out of scope for v1.0.0

- **Branch Office and Facility registration pathways** (Part V, Items
  27A-27C, and their own documentary-requirement variants) — see judgment
  calls 1 and 5.
- **Part VI, Tax Types (Item 28)** — BIR-internal determination, not
  applicant input. See judgment call 2.
- **Part VII, Invoices (Items 29-30, Authority to Print Invoices)** — see
  judgment call 3.
- **Items 25-26, Incentive Details/Registration-Accreditation** (PEZA/BOI
  investment-promotion registration) — see judgment call 4.
- **Additional stockholders/partners/members beyond the first**, and
  **additional primary/secondary industries beyond one of each** — pending
  GSP-0009. See judgment calls 8 and (secondaryIndustry description).
- **Part X, Payment Order Form for New Business Registrant (BIR Form No.
  0605)** — a BIR-internal payment-processing form embedded at the bottom of
  Form 1903 itself ("For BIR Payment Acceptance Only. Not to be filed in
  AABs"), not an applicant data-entry section.
- **Non-Resident Foreign Corporation (NRFC), GAI/LGU, Foreign Embassy, and
  International Organization-specific alternate Documentary Requirements**
  (p.4's own separate lists for each) — only the general/baseline Head
  Office requirements are modelled in `documents[]`.
- **BIR's ORUS online counterpart** (`orus.bir.gov.ph`) — requires an
  account/login; this document models the gazetted paper/PDF form's own
  fields, not that system's live wizard.

## Candidates rejected this cycle

Per the task brief, before authoring this document the following candidates
were evaluated and rejected:

- **IE Form CT1 (Irish corporation tax return), re-examined fresh:**
  Confirmed the prior cycle's assessment still holds. Revenue.ie publishes
  only year-specific Tax and Duty Manuals (e.g. Part 38-02-01I for the 2024
  Form CT1, fetched and read directly — a genuine 38-page PDF with a real
  text layer) that are "what's new"/change-log documents summarizing updates
  to ROS panels (e.g. "New section for state aid under De Minimis
  regulations"), not a full field-by-field walkthrough of the entire
  return — its own Table of Contents lists updated sub-sections only, most
  panels (Trading Results, Capital Gains, Deductions/Reliefs/Credits, R&D
  Credit, Close Company Surcharge, etc.) are described only where something
  changed that year, not exhaustively. The base manual (Part 38-02-01,
  reviewed November 2025, also fetched directly) confirms explicitly that
  "Help notes are available by using the 'form help' icon on the ROS form
  CT1" — i.e. the actual field-level help text lives inside the
  login-gated ROS online-filing system itself, with no public downloadable
  specimen/blank paper CT1 form found as an alternative (unlike, say, BIR's
  forms, which are genuinely downloadable PDFs). Re-confirmed as a poor
  candidate; not attempted.
- **Indonesia (OSS/NIB business registration):** not reached in detail this
  cycle — the Philippines candidate was found and confirmed strong enough
  on the first alternative search that further jurisdictions were not
  screened. Left as an open, unscreened candidate for a future cycle rather
  than a confirmed dead end.
- **Colombia (DIAN RUT, Registro Único Tributario, Formulario 001):** a
  genuine, directly downloadable, current official PDF was found
  (`dian.gov.co/Documents/RUT_1_4_0.pdf`, extracted via `pdfjs-dist`) and
  was a real contender — it is DIAN's own combined individual/business tax-ID
  registration form. Not picked over BIR Form 1903 because its own text
  layer is comparatively degraded for this purpose: field labels extract
  correctly but almost all of its ~173 numbered items reference external
  code tables (document-type codes, economic-activity codes, "Tipo de
  documento" codes, etc.) not reproduced anywhere in the form PDF itself,
  and it has substantially more unbounded repeating structures (up to 5
  legal representatives, 5 socios/partners, 3 revisor fiscal/contador
  blocks, 3 establishments, all continuing via numbered "Hoja" attachment
  pages) than BIR Form 1903's more modest single stockholder-table
  repetition — a weaker source shape by this registry's own established
  bar for a first-authoring pass. Left as a viable, well-sourced backlog
  candidate for the Philippines/Colombia's own jurisdiction-opening or
  Colombia-specific future cycle (Colombia is not yet in this registry).

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to (a)
independently re-fetch the same PDF and confirm no newer edition has since
been published (BIR revises this form periodically — this cycle's edition
is "October 2025 ENCS"), (b) obtain a BIR ORUS test account and attempt a
live walk of its online registration counterpart to resolve judgment calls
6, 7, and 9 with direct system confirmation (in particular whether ORUS's
own UI marks Item 24's sub-fields as required, and what its own field
grouping/validation for Item 9's Effectivity Date actually is), and (c)
confirm whether a newer BIR issuance clarifies the Item 9 ambiguity
(judgment call 6) via an official FAQ or RMC (Revenue Memorandum Circular).

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): although this document is sourced from an unusually strong PDF
(genuine text layer, current edition, no Wayback detour needed), it is the
first document for a brand-new jurisdiction with no independent second
review yet, carries a materially large number of disclosed scope cuts and
judgment calls (12), and BIR is known to revise this exact form periodically
(the form's own header shows a January 2024 edition superseded by this
October 2025 one) — all of which argue for the shorter end of the cadence.
Re-check the source, retry ORUS for a test account, and confirm no newer
form edition has been published, on or before that date and on any
`source.url` change.
