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
pending live-app execution testing (per this registry's `structural-reference`
maturity convention — see the `ae/icp/visa-single-entry-long-stay-pleasure`
sibling, whose own `status`/`maturity` remained `draft`/`structural-reference`
after its review gate too).

## Independent review-gate re-verification (GOV-1477, 2026-07-06)

An independent reviewer re-fetched both the citizen- and resident-category
v5.23 manuals directly from `icp.gov.ae` (both downloaded cleanly, confirming
no login/CAPTCHA/WAF gate — same access profile as the original authoring
pass) and re-extracted every embedded screenshot using the same
zlib+DCTDecode technique, additionally parsing the PDF's page-tree and
content-stream `Do` (XObject paint) operators to programmatically map each
embedded image to its exact page and on-page pixel position, rather than
relying on manual visual sequencing.

**Finding: every wizard-step page in the citizen manual embeds *two* stacked
screenshots, not one — the initial authoring pass only read the first.**
Cross-referencing each page's `/XObject` resource dictionary against its
content stream's placement matrices (`cm`) showed that pages 15–19 and 22 each
place two images with contiguous (touching, zero-gap) vertical bounding boxes
— i.e. the manual's own screen-capture tooling split one continuous
scrollable-screen capture into two separate embedded JPEGs per PDF page, not
two visually distinct screens. The original authoring pass extracted and read
only the first (top) image of each such pair, which is why the below-the-fold
content flagged as "not confirmed" in the original judgment calls 2 and 6
below was in fact directly recoverable from the same source, just not
inspected.

Re-reading the second (bottom) image of each pair recovered **8 additional
confirmed fields**, now added to the schema:

- **Basic Information (p.15):** `familyBookIssuanceDate` (date, required,
  worked-example value "21/06/1995") and `replacementReason` (dropdown,
  required, worked-example value "Lost / Stolen").
- **Beneficiary Information (p.16):** `changeIdentityPersonalPhoto` (Yes/No
  toggle, required, defaulted "No" in the worked example).
- **Passport Information (p.17):** `passportIssueCountry` (dropdown,
  required, worked-example value "UNITED ARAB EMIRATES").
- **Delivery Address Information (p.18):** `uaeMobileNumber` (required,
  pre-filled "00971"+"544099705" in the worked example) and
  `secondMobileNumber` (optional, blank/unfilled in the worked example — the
  only field of the eight without a visible required-asterisk).
- **Residence Information (p.19):** `residencePhoneNumber` and
  `residenceEmail` (both required) — this step was previously modelled with
  an **empty `fields` list**, on the belief that the screen showed only a
  read-only address-summary card. The second image shows the same screen
  also contains a genuinely editable confirmation sub-form (pre-filled "UAE
  Phone number" and "Email") below that card. The step's `fields` array in
  `steps[]` is updated accordingly.

**`termsAndConditionsAccepted` is now directly confirmed in the citizen
manual's own capture**, on the fee-summary screen's second (below-the-fold)
image — an "Agree To The Terms And Conditions" checkbox, exactly where
judgment call 2 (below) predicted it would be if the screenshot weren't cut
off. This retires the by-analogy inference from the resident-category
manual: `sourceRef` now points to the citizen manual directly, and the
`label` is corrected from "I Agree To The Terms And Conditions" (the resident
manual's wording, previously carried over by analogy) to "Agree To The Terms
And Conditions" (the citizen manual's own, verbatim wording — confirmed to
lack the leading "I").

**Two further fields are confirmed to exist but are deliberately NOT
modelled, pending label confirmation:**

1. A dropdown field between `secondNameEnglish` and
   `changeIdentityPersonalPhoto` on the Beneficiary Information screen,
   worked-example value "PRODUCER" (contextually a profession/occupation-type
   field).
2. A field between `passportIssueDate` and `passportIssueCountry` on the
   Passport Information screen, worked-example value an Arabic-script string
   (contextually plausible as a passport issue-place field, but not
   confirmed).

In both cases the field's own label row falls in the **exact pixel seam**
between the manual's two stacked screenshots (confirmed by cropping and
re-rendering the boundary region at native resolution: the first image ends
mid-field, immediately after the *previous* field's input box, and the second
begins with only the dropdown/input control itself, no label above it) —
there is no crop offset that recovers it from this source. Rather than invent
a label, this document leaves both fields unmodelled. A future reviewer
should either find a differently-paginated render of the same manual (e.g. a
version where the scroll-capture boundary falls elsewhere), or confirm the
label directly against the live Smart App.

**Also checked and found accurate, no changes:** the Attachments step's
single generic "Supporting documents" upload item (p.20) — its own screenshot
has substantial blank space below the item with no second embedded image,
confirming the screen is genuinely single-item and was not itself
truncated. No newer manual revision superseding v5.23 was found at the
`icp.gov.ae` source URL or via web search.

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
2. ~~`termsAndConditionsAccepted` folded in from the sibling resident
   manual, not directly visible in this document's own citizen capture.~~
   **Superseded by the GOV-1477 review-gate pass:** the citizen manual's
   fee-summary screen (p.22) is itself a two-image scrollable capture, and
   its second (below-the-fold) image directly shows an "Agree To The Terms
   And Conditions" checkbox. The field is now sourced directly from the
   citizen manual; the by-analogy inference from the resident manual
   described below is retired (kept here for history: the resident-category
   manual's analogous "Renew Emirates ID" fee-review screen — confirmed to
   share the same UI components as steps 3-5 of the citizen flow, in one
   case even showing the same example Request Number — is what the original
   authoring pass reasoned from, the same kind of by-analogy inference used
   in the sibling visa document for its `insideUaeEmirate` enum).
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
6. ~~Below-the-fold fields not modelled (every wizard screenshot in this
   manual is a single un-scrolled mobile viewport).~~ **Superseded by the
   GOV-1477 review-gate pass:** each wizard page in fact embeds two stacked
   screenshots covering the full scroll, not one — the original authoring
   pass only read the first. Re-reading the second recovered 8 fields (see
   the "Independent review-gate re-verification" section above):
   `familyBookIssuanceDate`, `replacementReason`,
   `changeIdentityPersonalPhoto`, `passportIssueCountry`,
   `uaeMobileNumber`, `secondMobileNumber`, `residencePhoneNumber`,
   `residenceEmail`. Two further fields (a profession-type dropdown after
   `secondNameEnglish`; an Arabic-script field after `passportIssueDate`)
   are confirmed to exist but remain unmodelled because their exact labels
   fall in the crop seam between the two screenshots and are not
   recoverable from this source — a genuinely unresolved gap, not merely an
   unconfirmed guess. A Second Name Arabic / Third-or-Family-Name pair and a
   Passport Expiry Date remain unconfirmed and unmodelled too (no further
   embedded image exists on either page to check).
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

Items 1, 2, and most of item 3 below were completed by the GOV-1477
review-gate pass (see above). To advance this document further, a future
reviewer needs to:

1. ~~Independently re-fetch both manuals and re-render/re-read each cited
   page, confirming every field `sourceRef` against the actual
   screenshot.~~ Done (GOV-1477).
2. ~~Confirm ICP has not since published a newer manual revision superseding
   v5.23.~~ Done (GOV-1477) — none found.
3. Obtain access to the live Smart App to: confirm or replace the
   `string`-typed dropdown fields with real `enum` option lists; recover the
   exact labels of the two still-unmodelled fields (the profession-type
   dropdown after `secondNameEnglish` and the Arabic-script field after
   `passportIssueDate`); confirm whether a Second Name Arabic /
   Third-or-Family-Name pair and a Passport Expiry Date exist beyond what
   either embedded screenshot shows; and confirm the true citizen-flow
   document checklist (see judgment call 3).
4. Per this registry's `structural-reference` maturity convention, advancing
   `maturity.criteria.verifiedSchema`/`agentReadySchema` beyond a second
   reviewer's field-by-field pass requires live-app execution testing, not
   just source re-verification.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer guide revision has been
published, on or before that date and on any `source.url` change.
