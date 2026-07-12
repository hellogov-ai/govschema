# Verification record — `th/mfa/non-immigrant-visa-b-application-for-employment` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2602**, a child of the
standing research routine (GOV-2599) and a pre-scouted, ready-to-author
candidate identified in GOV-2593's prior cycle (see that cycle's own
`CATALOG.md` Executive Summary update and its own memory record). It opens
**Thailand's Visa vertical (2 of 6)**, via the Ministry of Foreign Affairs'
(MFA) Non-Immigrant Visa (B) for Employment publishing path. Taxes is already
open (`th/rd/pit-90-personal-income-tax-return`, GOV-2593); Business
Formation is being authored concurrently by a sibling child issue (GOV-2601)
of the same parent cycle — no file overlap is expected beyond `CATALOG.md`
and `tools/govschema-client/registry-index.json`, both re-diffed against
`main` immediately before opening this PR.

## Source verification (independently re-derived, not copied from the task)

- **URL:**
  `https://image.mfa.go.th/mfa/0/3fsjzRYZ2e/VISA_FORM/NON-IMMIGRANT_VISA_(B)_FOR_EMPLOYMENT_-_To_be_employed_in_Thailand-new.pdf`
- The task's own description names only a widget count (58 AcroForm fields)
  and the general topic (MFA Non-Immigrant Visa B/Employment) — no specific
  URL. This URL was independently located this cycle via a fresh web search
  restricted to `mfa.go.th`, then confirmed as the correct specimen by
  independently re-deriving its AcroForm widget count with `pdfjs-dist` and
  finding it matches the task's cited figure exactly (below); two sibling
  candidates found in the same search (a bare "APPLICATION FOR VISA" PDF
  with 0 widgets — non-fillable — and a different visa-application PDF with
  103 widgets) were fetched and screened first and ruled out precisely
  because their widget counts did not match.
- Fetched independently via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 270415`
    bytes.
  - **`sha256`:**
    `8e61fcc80bd6260f83f86b01d5443f54a75eda4ef915c3c5449e498b8b2600d4`
    (computed via `sha256sum` on the freshly-downloaded file).
  - Note: the CDN's `Last-Modified` response header reflects the fetch time
    (a `cloudflare`-fronted `image.mfa.go.th` asset host, not an origin
    file-mtime signal) and is not treated as evidence of the document's
    edition/vintage; the document's own footer text (page 2:
    `mfavisaform 10 09 2007`) is the only in-document dating signal and is
    quoted verbatim in this schema's own field-level `sourceRef`s.
- Parsed with `pdfjs-dist@3` (legacy build,
  `getAnnotations({intent:'display'})`, filtered to `subtype === 'Widget'`),
  installed in a scratch directory (not a repo dependency), following this
  registry's established PDF-extraction practice:
  - **2 pages**, **58 AcroForm widgets total** — **0 on page 1**, **58 on
    page 2** — matching the task's cited widget count exactly.
- Every widget's `fieldName`/`fieldType`/`rect`/`checkBox`/`exportValue` was
  dumped and correlated against `getTextContent()`'s position-sorted text
  items (sorted by rounded `y` descending, then `x` ascending) to read every
  printed label and confirm each widget's meaning before modeling it — not
  assumed from field names alone (the source's own field names are the
  generic auto-numbered `Text1`...`Text51`/`Check Box2`...`Check Box16`, with
  no self-documenting names to lean on).

## Document structure

Page 1 is a **non-fillable checklist** ("Checklist — Please complete and
submit together with the application form — Application with incomplete
documents cannot be accepted"), titled "NON-IMMIGRANT VISA (B) FOR
EMPLOYMENT — Purpose of visit: To be employed in Thailand", naming 10
required-document line items (with sub-items 5.1-5.3 and 6.1-6.5) plus a
visa-fee note and a set of numbered applicant-declaration bullets. It carries
**zero AcroForm widgets** — confirmed via `pdfjs-dist` — and is modeled
entirely as `documents[]` (10 entries), not `fields[]`.

Page 2 is the MFA's own **generic "APPLICATION FOR VISA" AcroForm**
(footer-stamped `mfavisaform 10 09 2007`), used across the Ministry's/Royal
Thai Consulate-General's full range of visa categories — the page itself
prints a "Please Indicate Type of Visa Requested" selector spanning
Diplomatic/Official/Courtesy/Non-Immigrant/Tourist/Transit, not a form
dedicated solely to Non-Immigrant Visa (B). Because this specimen is served
under the MFA's Non-Immigrant Visa (B) for Employment publishing path
(distinguishing it from the sibling "FOR BUSINESS PURPOSE" and "FOR
EMPLOYMENT AS TEACHER" specimens found during sourcing, which share the same
underlying page-2 AcroForm), this v1.0.0 discloses (rather than silently
resolves) that the AcroForm itself does not encode Non-Immigrant-B/Employment
specificity — see the `visaTypeNonImmigrant` and `purposeOfVisitBusiness`
field descriptions below.

All 58 page-2 widgets were mapped to a printed label via `rect`/text-row
correlation. **2 widgets are excluded from `fields[]`** as non-substantive
artifacts:

- **`Text4`** — `rect: [94, 593, 95, 598]`, a 1pt-wide, 5pt-tall degenerate
  widget sitting between the "Former Name (if any)" row (`Text2`,
  y≈603-617) and the "Nationality" row (`Text3`, y≈580-593), with no
  adjacent printed label of its own.
- **`Text13`** — `rect: [226, 479, 226, 484]`, a genuinely **zero-width**
  widget sitting between the "Issued at" row (`Text12`, y≈466-480) and the
  "Date of Issue" row (`Text15`, y≈443-458), likewise with no adjacent
  printed label.

Both are consistent with leftover/duplicated artifact fields from the
source's own PDF authoring tool rather than data-entry points a filer could
plausibly use; excluding them follows this registry's convention of only
modeling substantively fillable widgets (cf. `se/skatteverket`'s precedent
of excluding read-only signature-line placeholders for a different reason —
non-fillability rather than non-existent screen real estate).

The remaining 56 widgets collapse into **57 `fields[]` entries**: 42
single-widget fields, 3 multi-widget checkbox groups collapsed into 3
`exclusivityGroups` entries (6 + 3 + 5 = 14 widgets, expressed as 14
independent boolean fields per this registry's established convention — see
e.g. `gh/nia`, `dk/um`, `ng/cac` precedents — since the source's checkboxes
are independently-clickable `Btn` widgets, not a single shared-name radio
group), plus **`numberOfEntriesRequested`**, a printed blank
("Number of Entries Requested _____") with **no corresponding AcroForm
widget at all** — modeled for completeness of the printed form's data
points and disclosed as unbacked by a fillable field, consistent with this
registry's precedent for the same class of gap (e.g. `se/skatteverket`'s
`documents[]`-only gating disclosures).

## Field-by-field inventory and disclosed judgment calls

- **Checkbox groups modeled as independent booleans + `exclusivityGroups`:**
  `visa_type_requested` (`visaTypeDiplomatic`/`visaTypeOfficial`/
  `visaTypeCourtesy`/`visaTypeNonImmigrant`/`visaTypeTourist`/
  `visaTypeTransit`, Check Box3/6/5/4/7/2 respectively), `title`
  (`titleMr`/`titleMrs`/`titleMiss`, Check Box14/15/16), and
  `purpose_of_visit` (`purposeOfVisitTourism`/`purposeOfVisitTransit`/
  `purposeOfVisitBusiness`/`purposeOfVisitDiplomaticOfficial`/
  `purposeOfVisitOther`, Check Box8/9/11/10/13). All three groups are
  confirmed via `getAnnotations()` to be `checkBox:true`/`radioButton:false`
  independent widgets (no shared field name), so — per this registry's
  established convention — they are modeled as independent optional
  booleans with an `exclusivityGroups` entry expressing "at most one",
  rather than a single `enum` field.
- **Disclosed judgment call — no printed option says "Employment":** none
  of the 6 "Type of Visa Requested" options or the 5 "Purpose of Visit"
  options is literally worded "Employment". `visaTypeNonImmigrant` and
  `purposeOfVisitBusiness` are each disclosed in their own field
  `description` as the closest applicable printed option for this
  document's stated Employment purpose — not asserted as a canonical
  mapping, since the source itself provides none.
- **`occupationPosition`/`occupationEmployer`** (`Text17`/`Text18`): the
  printed label reads "Occupation (specify present position and name of
  employer)" over **two** consecutive full-width blank lines with no
  further sub-labels distinguishing them. Modeled as two required fields
  (position, then employer), matching the label's own two-part instruction
  in printed order — a disclosed interpretation, since the PDF itself does
  not separately caption the two lines.
- **Multi-line address/name blocks** (`currentAddressLine1/2`,
  `permanentAddressLine1/2/3`, `proposedAddressInThailandLine1/2/3`,
  `localGuarantorNameAddressLine1/2`,
  `guarantorInThailandNameAddressLine1/2`,
  `minorChildrenInfoLine1/2`): each source label sits above 2-3 consecutive
  full/near-full-width blank lines with no distinguishing sub-labels between
  them; modeled as sequentially-numbered line fields (first line required
  where the base label carries no "if applicable/if different" qualifier,
  continuation lines optional), consistent with this registry's convention
  for the same "one printed label, several blank writing lines" pattern
  (cf. `th/rd/pit-90`'s multi-line address handling).
- **`proposedAddressInThailandLine1` (`Text36`) vs. `Line2` (`Text37`) vs.
  `Line3` (`Text38`):** `Text36`'s `rect` (`y≈564-579`) straddles the
  "Proposed Address in Thailand" label's own baseline (`y≈567`) and is
  narrower (`x≈452-576`) than the two widgets below it (`Text37`
  `x≈325-576`, `Text38` `x≈324-577`) — read as a short first-line blank
  positioned inline with the label itself, followed by two full-width
  continuation lines. Disclosed here since this inline-with-label placement
  differs from every other multi-line block on this page (which all place
  their first blank line entirely below the label).
- **`permanentAddress*` fields left fully optional, no `requiredWhen`:** the
  printed label reads "Permanent Address (if different from above)" but the
  source provides no discrete boolean/selector widget to key a
  `requiredWhen` condition on — consistent with this registry's established
  convention (and the `notEquals`-against-an-optional-field pitfall
  documented in this registry's own operating practice) of not inventing a
  synthetic gating field where the source has none; see
  `se/skatteverket/samordningsnummer-ansokan`'s identical disclosed
  reasoning for its own contact-address block.
- **`purposeOfVisitOtherDescription`** (`Text34`) is the one field in this
  schema with a real `requiredWhen` (gated on `purposeOfVisitOther equals
  true`), since the source's own printed instruction ("Other (please
  specify)") explicitly ties the blank to that specific checkbox.
- **`refundDeclarationDate`/`touristTransitDeclarationDate`** (`Text50`/
  `Text51`): each sits beside a printed "Signature ___ Date ___" line under
  one of the form's two printed declarations. Only the **Date** half of
  each line has a fillable widget — no `Signature` widget exists in the
  source for either line, consistent with a wet-ink signature mark having
  no AcroForm mechanism (the same pattern as `se/skatteverket`'s excluded
  read-only `Underskrift` placeholders, except here there is no widget at
  all, substantive or read-only, standing in for the signature).
  `refundDeclarationDate` is modeled as required (the refund-non-request
  declaration applies to every applicant regardless of visa type, per its
  own printed text); `touristTransitDeclarationDate` is modeled as optional,
  since its declaration is explicitly captioned "Attention for Tourist and
  Transit Visas Applicants" and this document's Employment purpose falls
  outside that caption.
- **The "FOR OFFICIAL USE" block** (page 2, lower third: Application/
  Reference No., Visa No., a second "Type of Visa:" row, "Category of
  Visa:", "Number of Entries:" with Single/Double/Multiple Entries options,
  Date of Issue/Fee/Expiry Date, "Documents Submitted", "Authorized
  Signature and Seal") is confirmed via `pdfjs-dist` to carry **no AcroForm
  widgets whatsoever** in this range — every one of the 58 total widgets
  maps to the applicant-facing rows above this block. Out of scope,
  consistent with this registry's convention for consulate/caseworker-only
  sections with no fillable mechanism (contrast `se/skatteverket`'s
  page 2, which is caseworker-only but *does* carry widgets and is
  disclosed as out of scope for that reason instead).

## `documents[]`

All 10 entries are sourced from page 1's checklist (not from the AcroForm
text layer, which carries none of this content):

1. `completedVisaApplicationForm` — item 1 (this schema's own `fields[]`,
   printed and signed).
2. `originalPassport` — item 2.
3. `passportCopy` — item 3.
4. `passportPhoto` — item 4.
5. `workPermitOrApprovalEvidence` — item 5's three either/or sub-items
   (5.1-5.3), modeled as one required document per this registry's
   convention for disclosed either/or evidence requirements (the source
   itself introduces them with "Any of the followings", not discrete
   selectable options).
6. `jobOfferLetter` — item 6.1.
7. `companyRegistrationCopy` — item 6.2.
8. `shareholderListCopy` — item 6.3.
9. `balanceSheetCopy` — item 6.4.
10. `vatRegistrationCopy` — item 6.5.

Items 6.1-6.5 are tagged `belongsTo: "responsible-party"` (the sponsoring
employer), matching this schema's `guarantorInThailandNameAddressLine1`
field description tying that guarantor block to the employer for this
visa's Employment purpose.

## Validation runs

- `node tools/validate.mjs registry/th/mfa/non-immigrant-visa-b-application-for-employment/1.0.0/schema.json` — **passes**.
- `node tools/validate-ajv.mjs registry/th/mfa/non-immigrant-visa-b-application-for-employment/1.0.0/schema.json` — **passes** (draft 2020-12, spec v0.3 meta-schema).
- A from-scratch conformance-checker script (scratch, not committed — evaluates
  `required`/`requiredWhen`/`validation.minLength`/`exclusivityGroups` against
  each fixture) found: both `valid-*.json` scenarios raise **0 errors**; each
  of 5 `mutation-control-*.json` fixtures raises **exactly 1 error**. See
  `conformance/th/mfa/non-immigrant-visa-b-application-for-employment/1.0.0/`.

## Out of scope, disclosed

- Page 2's "FOR OFFICIAL USE" block (see above) — no AcroForm mechanism
  exists for it.
- `Text4`/`Text13` — excluded degenerate/artifact widgets (see above).
- No canonical mapping is asserted between this document's Employment
  purpose and the generic form's "Type of Visa Requested"/"Purpose of
  Visit" printed options, since the source provides none (see above).
