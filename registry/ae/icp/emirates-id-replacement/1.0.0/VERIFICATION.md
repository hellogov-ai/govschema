# Verification record — `ae/icp/emirates-id-replacement` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read primary source**: ICP's own
official Smart App user manual (Citizen Category, v5.23), retrieved as a PDF
and read page-by-page via direct decompression of each page's embedded JPEG
screenshot (zlib + DCTDecode) — the PDF's text layer uses custom-subsetted
fonts and does not recover legibly. It remains `draft`, not `verified`,
pending an independent second reviewer's field-by-field pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1474](../../../../GOV-1474)). The United Arab Emirates previously had
only Taxes-vertical (`ae/fta/vat-registration`,
`ae/fta/corporate-tax-registration`) and Visa-vertical
(`ae/icp/visa-single-entry-long-stay-pleasure`) schemas — 2 of 6 verticals.
This cycle scouted all four of the UAE's remaining gaps (Passport, DMV,
Business Formation, National ID) before picking this candidate:

- **National ID (Emirates ID replacement/renewal, via ICP)** — **STRONG**.
  Both the citizen- and resident-category Smart App user manuals are directly
  downloadable PDFs (no login/CAPTCHA/WAF), genuinely screenshot-driven, and
  confirmed (by rendering and visually reading dozens of embedded
  screenshots) to walk a real, field-level wizard end-to-end. Picked this
  cycle.
- **DMV (vehicle registration renewal, via RTA)** — medium/leaning strong. An
  RTA-branded "Vehicle Renewal User Guide v1.0" (24 pages, 68 screenshots)
  was found and one full-resolution screenshot confirmed genuine field-level
  UI capture, but only via a third-party mirror
  (`professionallawyer.me`) — the exact official `rta.ae` URL for this
  specific guide could not be located this cycle (sibling manuals at a
  similar `rta.ae` path pattern are still live, suggesting the source
  document moved or was renamed rather than being taken down). Left as a
  strong open backlog candidate for a future cycle that re-searches
  `rta.ae` directly for the current live equivalent.
- **Passport (via ICP)** — weak/unresolved. The public service-detail page is
  checklist-level only (5 generic steps, 1 document, 4 fee lines), and a
  231-page "Service Card Guide" PDF is a per-service text catalog (37 images
  across 231 pages), not a screenshot walkthrough. The same Smart App manual
  used for this document lists "Issue new passport (New\Renew)" only as a
  menu action inside the read-only Family Book viewer, never as an expanded
  field wizard. Left as an open backlog candidate; a future cycle should do
  a deeper page-by-page pass of the same manual before giving up on it.
- **Business Formation (DED/Basher/Invest in Dubai/MOEC)** — confirmed still
  WEAK, unchanged from the GOV-1289/GOV-1371 cycles a year prior in
  research-time: no downloadable field-level PDF manual found at DED, ADDED,
  SEDD, or MOET; Basher requires UAE Pass login; `app.invest.dubai.ae`
  returns HTTP 403; `ded.ae` service-detail pages fail with a TLS/SNI error
  suggesting active bot-mitigation. Not an open candidate without new
  sourcing.

## Source examined

- **Document `(id, version)`:** `ae/icp/emirates-id-replacement` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Authority for Identity, Citizenship, Customs & Port
  Security (ICP), United Arab Emirates
- **Primary source URL:** <https://icp.gov.ae/ica_files/smart_app/pdf/5.23_user_manual_english_version_of_the_application_citizen_category.pdf>
- **Secondary/corroborating source URL:** <https://icp.gov.ae/ica_files/smart_app/pdf/5.23_user_manual_english_version_of_the_application_resident_category.pdf>
- **Official document title:** "Smart App – User Manual, English Version of
  the Application, Citizen Category", v5.23 (and its Resident Category
  sibling, same version)
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

Both manuals are plain, directly downloadable PDFs from icp.gov.ae's own
`ica_files` media path — no login, no CAPTCHA. The citizen-category manual is
72 pages (reconstructed via the PDF's page-tree object order, since it
carries no legible printed page-footer numbering recoverable from its
custom-subsetted fonts), of which 40 pages carry a unique embedded
screenshot. Every field in this schema was read directly off those
**rendered screenshots** (each page's embedded JPEG decompressed via
zlib+DCTDecode and read with Claude's own vision capability), not the PDF's
sparse/garbled text layer — the same discipline already used for
`ae/icp/visa-single-entry-long-stay-pleasure`, `ae/fta/vat-registration`, and
`ae/fta/corporate-tax-registration`.

## What was confirmed directly (verbatim, from the rendered screenshots)

The manual's worked example walks: Home dashboard → "Most Used Services"
popup → Department selection → **"Replace"** screen (two option cards,
"Family Members" / "Sponsored") → **"Select Family Member"** (a scrollable
list of family-book cards, each showing Relationship, Unified Number,
Identity Number, EIDA Card Expiry Date, with a Select button — this
selection screen is a navigation step, not modelled as applicant-input
fields, the same way the sibling visa document does not model its own
preceding Department → Module → Service selection screens) → the 5-sub-step
**"Application Data"** wizard (tab ①):

- **p.15, Step 1/5 Basic Information:** Preferred Language (dropdown, only
  selected value "ARABIC" visible), UAE Unified No (locked-style input,
  pre-filled from the selected family member — "511681" in the worked
  example, matching the family member "Fadl Nayef Ghanem Al-Nsaa" selected
  on the preceding screen), Applicant Class (locked-style input, fixed
  "UAE Citizen").
- **p.16, Step 2/5 Beneficiary Information:** First Name English ("FADL"),
  First Name Arabic ("فضل"), Second Name English ("NAYEF") — the screenshot
  is an un-scrolled single mobile viewport and cuts off immediately after
  Second Name English, so any further name fields below the fold (e.g. a
  Second Name Arabic, or Third/Family Name pair) are not confirmed and not
  modelled.
- **p.17, Step 3/5 Passport Information:** Passport Type (dropdown, only
  "ORDINARY PASSPORT" visible), Passport Number ("264R5773"), Passport Issue
  Date ("01/02/2020") — again cut off before an expected Passport Expiry
  Date field (present in the sibling visa document's own Passport
  Information panel), which is not confirmed here and not modelled.
- **p.18, Step 4/5 Delivery Address Information:** Delivery Method (dropdown,
  only "Deliver to specific address" visible), Delivery Company
  (locked-style input, fixed "Tawzea" — the UAE's national last-mile
  delivery operator), Delivery Emirates (dropdown, only "ABU DHABI"
  visible).
- **p.19, Step 5/5 Residence Information:** no labelled input field — only a
  read-only address card (Emirate: DUBAI, City: DUBAI, UAE Phone number:
  26655442, Detailed Address: blank, Address Source: UserProfile) and an
  "Add New Address" button. Modelled with an empty `fields` list at this
  step, the same convention this registry uses for read-only/navigation-only
  steps (e.g. the sibling visa document's own "Review Application" step) —
  no input field is directly confirmed here beyond a button whose own
  target sub-form was never expanded/screenshotted.
- **p.20, Attachments (tab ②):** two toggle tabs "Required"/"Optional"
  (Required active), showing exactly **one** generic upload item labelled
  "Supporting documents" with an ✕ (remove) control — no further
  itemization. This is thinner than the sibling resident-category manual's
  analogous "Renew Emirates ID" Attachments step, which shows an itemized
  checklist ("PASSPORT COPY", "ORIGINAL ENTRY PERMISSION", "Emirates ID Card
  - Front", plus at least one further item cut off) — those items are
  residency-specific (e.g. "Original Entry Permission" presupposes an
  immigration entry event that does not apply to a citizen) and are
  deliberately **not** folded into this citizen-scoped document (see
  judgment call 3 below).
- **p.21, Review Application (tab ③, first screen):** a pure read-only
  accordion recap (User Data, Basic Information, Beneficiary Information,
  Passport Information, Delivery Address Information) — not modelled as
  fields, consistent with this registry's convention.
- **p.22, fee-summary screen:** "Emirates ID Services - Citizens - ID for
  Citizen - Replace Emirates ID" fee table (Card Issuance 300 AED, ICA Fees
  40 AED, Total 340 AED, Refund Amount in case of Rejection 0 AED) —
  source-computed amounts, not applicant input, so not modelled as fields.
  The screenshot cuts off immediately after this table, before any
  Terms-and-Conditions checkbox would appear (see judgment call 2 below).
- **p.23, Fees Payment screen:** Card Type (radio, Visa/Mastercard), Card
  Number, Expiration Month/Year, CVN, and an order-total line
  ("344.64 AED") — a card-entry screen, excluded from this schema the same
  way no other document in this registry models raw card-entry fields (see
  the sibling visa document's own Amwal-payment exclusion).
- **p.24-25:** a success screen and a Tax Invoice PDF receipt (Federal
  Authority for Identity & Citizenship letterhead) — both read-only, not
  modelled. The receipt confirms a **two-stage fee** behavior worth flagging
  for any future execution-testing pass: the fee-summary screen's displayed
  total (340 AED) is not the final charged amount — an "ELECTRONIC PAYMENT
  FEES" surcharge (4.42 AED) plus its VAT (0.22 AED) is injected between the
  fee-summary screen and the actual payment screen, raising the real charge
  to 344.64 AED.

## Judgment calls / scope cuts (read before reviewing)

1. **Scoped to Replace, not first-time issuance.** Neither the citizen- nor
   the resident-category manual shows a genuine first-time/new Emirates ID
   issuance wizard expanded past its "Issue New Emirates ID" menu-tile
   label — it never becomes a field-entry screen in either 72-page or
   57-page document. This schema is deliberately scoped to the confirmed
   "Replace Emirates ID" (citizen) pathway only. A reviewer with live-app
   access should check whether a first-time-issuance wizard exists and is
   simply un-screenshotted in both manuals, or whether first-time issuance
   in the UAE is handled through an entirely separate, non-app channel (e.g.
   at birth/naturalization registration).
2. **`termsAndConditionsAccepted` folded in from the sibling resident
   manual, not directly visible in this document's own citizen capture.**
   The citizen Replace ID fee-review screenshot (p.22) is cut off
   immediately before where a Terms-and-Conditions checkbox would sit. The
   resident-category manual's analogous "Renew Emirates ID" fee-review
   screen — confirmed to share the same UI components as steps 3-5 of the
   citizen flow (in one case even showing the same example Request
   Number) — explicitly shows a labelled "I Agree To The Terms And
   Conditions" checkbox at this position. This document treats that as
   strong indirect evidence the same control exists in the citizen flow
   too, the same kind of by-analogy inference already used in the sibling
   visa document for its `insideUaeEmirate` enum. A reviewer should confirm
   this directly against the live app or a citizen-category screenshot that
   captures this exact screen without being cut off.
3. **Resident-manual's itemized document checklist deliberately NOT folded
   in.** Unlike the Terms-and-Conditions checkbox (a generic UI control
   reasonably assumed shared across services), the resident manual's
   Attachments checklist (Passport Copy, Original Entry Permission,
   Emirates ID Card - Front, +1 more) contains residency-specific items that
   do not obviously apply to a citizen replacing their own ID. This document
   models only the one generic "Supporting documents" upload item the
   citizen manual itself actually shows, and flags in-schema that the true
   citizen document requirement may be richer than this single generic slot
   suggests — a reviewer with live-app access should confirm the real
   citizen-flow document checklist.
4. **Undocumented dropdown option lists.** Preferred Language, Applicant
   Class, Passport Type, and Delivery Method each show only their selected
   value in the worked example's screenshot — no full option list is ever
   expanded on-screen. Per the discipline already established by
   `au/aec/voter-enrolment`'s `gender` field and the sibling visa document,
   none of these are modelled as `enum`; each is `type: "string"` with a
   description stating only the confirmed selected value.
5. **`deliveryEmirate` enum reused by analogy, not independently
   re-confirmed.** As with the sibling visa document's `insideUaeEmirate`
   field, the manual's own screenshot shows only "ABU DHABI" selected, not
   an expanded list. The 7-value enum is carried over from
   `ae/fta/vat-registration`'s and
   `ae/icp/visa-single-entry-long-stay-pleasure`'s own confirmed "Emirates"
   dropdowns.
6. **Below-the-fold fields not modelled.** Every wizard screenshot in this
   manual is a single un-scrolled mobile viewport. Beneficiary Information
   (p.16) and Passport Information (p.17) both visibly cut off right after
   their last modelled field, strongly suggesting additional fields exist
   below the fold in the live app (e.g. a Second Name Arabic / Third or
   Family Name pair, a Passport Expiry Date). This document models only the
   confirmed-visible minimum, not a completed guess at the full field set —
   see the individual field `description`s for each specific cutoff.
7. **Payment/card-entry fields excluded.** The Fees Payment screen (p.23:
   Card Type, Card Number, Expiration Month/Year, CVN) is excluded the same
   way the sibling visa document excludes the Amwal-hosted payment-gateway
   screen — no other document in this registry models raw card-entry
   fields.
8. **`uaeUnifiedNumber` modelled as applicant input despite being
   pre-filled/locked in the source.** The field is shown in a
   greyed/locked visual style (pre-populated from the family member
   selected on the unmodelled prior screen) rather than freely typed, but
   it is the sole beneficiary-identifying value this schema instance needs
   to be complete and is modelled as a required input for that reason,
   consistent with how `applicantClass` and `deliveryCompany` (also
   locked-style in the source) are handled.
9. **No array/repeating-field type (GSP-0009).** The "Select Family Member"
   screen (p.13) implies a citizen's family book may contain multiple
   members, any of whom could be the beneficiary of a given Replace ID
   application — this document models exactly one beneficiary per schema
   instance (the worked example's own scope), the same discipline already
   used by the sibling visa document for its one-sponsored-beneficiary
   scope.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch both manuals and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual screenshot.
2. Confirm ICP has not since published a newer manual revision superseding
   v5.23.
3. If feasible, obtain access to the live Smart App to: confirm or replace
   the `string`-typed dropdown fields with real `enum` option lists;
   determine whether any fields exist below the fold on the Beneficiary
   Information and Passport Information screens; directly confirm the
   `termsAndConditionsAccepted` checkbox's presence in the citizen (not just
   resident) flow; and confirm the true citizen-flow document checklist.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer guide revision has been
published, on or before that date and on any `source.url` change.
