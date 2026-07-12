# Verification record — `gr/mfa/application-for-schengen-visa` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2611**, a child of the
standing research routine (GOV-2609) and a pre-scouted candidate identified
in GOV-2591's prior cycle (see that cycle's own `CATALOG.md` "Known Gaps &
Opportunities" entry and memory record). It opens **Greece as this
registry's 45th jurisdiction**, via its Visa vertical (1 of 6).

## Source verification (independently re-derived, not copied from the task)

- **Primary hosts re-confirmed blocked, this cycle:** `www.mfa.gr` and a
  representative `mfa.gr` document path both returned **HTTP 403** with an
  Akamai `errors.edgesuite.net` "Access Denied" page when fetched directly
  from this sandbox — the same persistent bot-wall the prior cycle (GOV-2591)
  found, re-verified rather than assumed still current.
- **Primary source used (bilingual EN/AR, Greece-attributed edition):**
  `https://www.vfsglobal.com/one-pager/greece/egypt/english/pdf/application-for-schengen-visa.pdf`
  — fetched independently via `curl`: **HTTP 200**, `application/pdf`,
  **726,000 bytes**, **`sha256:
  303a4c28a53a8b2d88ca219a2b1aff3033a14a25f58708b6c7957414cfeaa969`**. This
  is the edition used as the canonical source for this schema, because its
  own page-4 data-protection notice explicitly names **"Ministry of Foreign
  Affairs, 1 Vas. Sofias Ave., 10671, Athens, Tel.+30 210 3681000, fax +30
  210 3681717, www.mfa.gr, e-mail: g04@mfa.gr, st2@mfa.gr"** and the
  **Hellenic Data Protection Authority** (Kifisias str. 1-3, Athens) as the
  data controller/national supervisory authority — proof this specific
  mirror serves Greece's own implementation of the EU-wide form, not a
  generic cross-jurisdiction template.
- **Two independent corroborating mirrors**, fetched and byte-hashed this
  cycle, both serving a near-identical English-only edition of the same
  form (see "Edition difference disclosed" below for the one substantive
  gap found):
  - `https://www.vfsglobal.com/one-pager/greece/jordan/english/pdf/application-form-template-en-oct-2021.pdf`
    — HTTP 200, `application/pdf`, **398,969 bytes**, **`sha256:
    85068e4f8837fd4f21240cf76d5fd16b6592126aadea361f4f0df61d1717b904`**, 8
    pages.
  - `https://www.vfsglobal.com/one-pager/greece/lebanon/english/pdf/application-form-template-en-oct-2021.pdf`
    — HTTP 200, `application/pdf`, **140,666 bytes** (not byte-identical to
    the Jordan mirror — different embedded-font subsetting/page count, 9
    pages including one blank trailing page), **`sha256:
    ee184cec5f4473d58bcff96c7d6602415ea0887434302a8e905af29e1fa1e005`**.
    `pdfjs-dist` text-layer extraction of all 32 numbered items found this
    mirror's printed text **content-identical** to the Jordan mirror
    (verbatim wording match on every field), confirming the same underlying
    template is independently served from two unrelated consulate mirrors
    despite the byte/page-count difference.
- **Other candidates screened and ruled out this cycle:**
  - `visa.vfsglobal.com/one-pager/greece/{uae,qatar}/...` paths returned
    Akamai-style **HTTP 403** JSON error bodies (`{"code":"403201",...}`),
    consistent with the prior cycle's finding that this specific subdomain
    is bot-walled from this sandbox (the sibling `www.vfsglobal.com`
    subdomain is not).
  - `https://www.vfsglobal.com/one-pager/greece/jordan/english/pdf/Greece-Application-2024-Final.pdf`
    (HTTP 200, 1,316,361 bytes, genuine `%PDF-1.7`) is a **flattened/scanned
    PDF with zero extractable text on all 4 pages** (confirmed via
    `pdfjs-dist`'s `getTextContent()`) — ruled out, not used.
  - Two older-style editions (`www.vfsglobal.com/greece/{jordan,bahrain}/pdf/...`,
    a "Please circle one"-style layout rather than checkboxes, field
    numbering only to ~35/47 rather than 32-plus-item-33) were fetched and
    read but not used as the primary source: `bahrain.pdf`'s own printed
    text names **"Embassy of Greece in Kuwait"** rather than Bahrain (an
    internal-template/consulate-mismatch artifact of that specific older
    mirror), and both predate the current EU Annex I structure that the
    egypt/jordan/lebanon mirrors above share.
- Every mirror was parsed with `pdfjs-dist` (legacy build,
  `getTextContent()` and `getAnnotations({intent:'display'})`): **zero
  AcroForm widgets on every page of every mirror** — this document is a
  genuine static text-layer PDF with no fillable form fields, confirmed
  independently, not assumed from the task description.

## Document structure

The source is the EU's own **"Harmonised application form / Application
for Schengen Visa"** (Annex I to the Visa Code, Regulation (EC) No 810/2009
as amended, in its post-Brexit revision referencing "UK nationals who are
Withdrawal Agreement beneficiaries"). Each page is laid out in two columns:
a **left column** of 32 (33 on the bilingual edition) sequentially numbered
applicant-facing items, and a **right column headed "FOR OFFICIAL USE
ONLY"** (Date of application, Application number, File handled by,
Application lodged at: Embassy/consulate/Service provider/Commercial
intermediary/Border/Other, Supporting documents checklist, Visa decision:
Refused/Issued A/C/LTV, validity dates) completed by consulate staff. The
official-use column carries **no data points an applicant fills in** and is
out of scope, consistent with this registry's convention for
consulate/caseworker-only sections (cf. `th/mfa`'s "FOR OFFICIAL USE" block
precedent).

All 32/33 applicant-facing items were read directly from the position-sorted
text layer (no widgets exist to correlate against). This v1.0.0 models
**items 1-16 and 19-33** (31 of 32/33 numbered items) plus the closing
place/date declaration, deliberately **excluding items 17-18** — see
"Out of scope, disclosed" below.

## Field-by-field inventory and disclosed judgment calls

- **Checkbox groups modelled as independent booleans + `exclusivityGroups`
  (11 groups total):** `sex` (2), `civil_status` (7), `travel_document_type`
  (6), `resides_in_other_country` (2), `purpose_of_journey` (10),
  `number_of_entries_requested` (3), `fingerprints_previously_collected`
  (2), `cost_covered_by` (2), `cost_applicant_means_of_support` (6),
  `cost_sponsor_identification` (2), `cost_sponsor_means_of_support` (5).
  The source renders every option as an independent `☐` checkbox glyph in
  the text layer (no shared field name/radio-group mechanism, since there
  is no AcroForm at all), so each is modelled as an independent optional
  boolean with an `exclusivityGroups` entry expressing "at most one",
  matching this registry's established convention for the same
  independently-clickable-checkbox pattern (e.g. `th/mfa`, `gh/nia`,
  `ng/cac` precedents).
- **`*`-marked items (21, 22, 30, 31, 32) and the deferred EU-family-member
  exemption:** the source's own footnote reads "Family members of EU, EEA
  or CH citizens or of UK nationals who are Withdrawal Agreement
  beneficiaries shall not fill in fields no. 21, 22, 30, 31 and 32." No
  discrete boolean/selector field exists elsewhere on the form to key a
  `requiredWhen` exemption on for this sub-population (the only related
  data, items 17-18, is itself excluded from this v1.0.0 — see below); these
  five items are therefore modelled as required/relevant for the **standard
  (non-EU-family-member) applicant pathway** that this v1.0.0 scopes to,
  with the exemption disclosed in each affected field's own description
  rather than silently resolved.
- **`currentOccupation`/`employerOrSchoolDetails`** (items 21, 22): each is
  a single printed blank line with no sub-labels; modelled as one field per
  item, matching the printed structure.
- **`invitingPersonOrHotelName`/`invitingCompanyNameAddress`** (items 30 vs.
  31): the source provides no discrete selector distinguishing the
  private-host/hotel pathway (item 30) from the inviting-company pathway
  (item 31) — an applicant fills in whichever applies. Both sets of fields
  are modelled as optional with a disclosed either/or relationship in their
  descriptions, consistent with this registry's convention for disclosed
  either/or requirements (cf. `th/mfa`'s `workPermitOrApprovalEvidence`
  precedent for a document-level either/or; here applied at the field
  level since both pathways are printed directly on the applicant-facing
  form, not as alternative attached documents).
- **`costCoveredByApplicant`/`costCoveredBySponsor`** (item 32) each gate a
  distinct means-of-support checkbox set with **different printed option
  values** (applicant: Cash/Traveller's cheques/**Credit card**/Pre-paid
  accommodation/Pre-paid transport/Other; sponsor: Cash/**Accommodation
  provided**/**All expenses covered during the stay**/Pre-paid
  transport/Other) — modelled as two separate `exclusivityGroups`
  (`cost_applicant_means_of_support`, `cost_sponsor_means_of_support`)
  rather than one shared set, since the source itself does not share the
  option values between the two sub-cases. The sponsor path additionally
  carries its own identification sub-choice ("referred to in field 30 or
  31" vs. "other (please specify)"), modelled as
  `cost_sponsor_identification`.
- **Four `requiredWhen`-gated "please specify" fields**, each tied to its
  own "Other" boolean per the source's own explicit "(please specify)"
  instruction: `civilStatusOtherDescription`, `travelDocumentTypeOtherDescription`,
  `purposeOtherDescription`, `costApplicantMeansOtherDescription`,
  `costSponsorIdentificationOtherDescription`,
  `costSponsorMeansOtherDescription` (six total).
- **`parentalAuthorityOrGuardianDetails`** (item 10, "in case of minors")
  and **`invitingPersonOrHotelName`/`invitingCompanyNameAddress`
  either/or**: left fully optional, no synthetic gating field invented,
  consistent with this registry's established convention (and the
  `notEquals`-against-an-optional-field pitfall documented in this
  registry's own operating practice) of not inventing a boolean the source
  itself does not provide — see `th/mfa`'s identical disclosed reasoning
  for its own "Permanent Address (if different from above)" block.
- **`fingerprintsCollectionDate`/`previousVisaNumber`** (item 28): both are
  explicitly qualified "if known" by the source rather than tied to a
  strict conditional, so both are left optional (relevant only when
  `fingerprintsPreviouslyCollectedYes` is checked, disclosed in each
  description) rather than `requiredWhen`-gated.
- **Wording variance across mirrors, disclosed:** the bilingual (Egypt,
  primary) and English-only (Jordan/Lebanon) mirrors label the same item-28
  blank differently — "Number of the visa, if known" (Egypt) vs. "Visa
  sticker number, if known" (Jordan/Lebanon). Modelled as one field
  (`previousVisaNumber`) using the primary source's wording, with the
  variance disclosed in the field's own description rather than treated as
  two different data points.
- **Declaration place/date:** the source's closing declaration block
  (data-protection consent, accuracy/false-statement, and
  departure-undertaking clauses) ends with a single printed "Place and
  date: Signature:" line — no separate widget or text-layer mechanism exists
  for the wet-ink signature itself, consistent with this registry's
  convention for signature lines (cf. `th/mfa`'s identical disclosed
  reasoning). Modelled as `declarationPlace` (string) + `declarationDate`
  (date), split for machine-readability rather than kept as one free-text
  field, per this registry's general preference for typed date fields
  where the printed content cleanly separates.

## `documents[]` — intentionally omitted

No `documents[]` array is included in this v1.0.0. A separate "Documents
Checklist" PDF exists at the same VFS Global site
(`visa.vfsglobal.com/one-pager/Greece/Lebanon/english/pdf/Greece-Documents-Checklist.pdf`)
but was not fetched or verified this cycle — it is a distinct document from
the application form itself, and adding an unverified `documents[]` list
would overstate this schema's own verification scope. Deferred as a
candidate follow-up (a future `1.1.0` or a separate schema), disclosed here
rather than fabricated.

## Out of scope, disclosed

- **The right-column "FOR OFFICIAL USE ONLY" block** on every page
  (application number, file-handling notes, application-lodged-at channel,
  supporting-documents checklist, visa decision/validity) — no applicant
  data point exists there; consulate/caseworker-only, per this registry's
  established convention.
- **Items 17-18** (personal data and family relationship of an EU/EEA/CH
  citizen or UK national Withdrawal Agreement beneficiary the applicant
  depends on) — this data, and the corresponding exemption from items
  21/22/30/31/32 that it would unlock, applies only to a smaller
  family-member sub-category of applicant. Deferring this entire sub-path
  keeps v1.0.0 scoped to the standard third-country-national applicant
  pathway (the common case), per the task's own instruction to scope to a
  clearly bounded pathway and disclose what is deferred. A future minor
  version could add these two items plus `requiredWhen`-based exemptions
  for 21/22/30/31/32 keyed on a new synthetic
  "is a qualifying EU/EEA/CH/UK family member" boolean, since the source
  itself provides no such discrete field to reuse.
- **Item 33** ("Surname and first name of the person filling in the
  application form, if different from the applicant") is present only on
  the bilingual (Egypt) edition used as the primary source; the
  corroborating English-only mirrors (Jordan/Lebanon) omit it entirely.
  Modelled here (as `personFillingFormName`/`personFillingFormAddressEmail`/
  `personFillingFormTelephone`, all optional) since the primary source
  includes it — disclosed as a minor cross-mirror edition difference, not
  evidence the primary source is wrong.
- A separate "Documents Checklist" companion PDF exists but was not
  fetched/verified this cycle — see "`documents[]` — intentionally
  omitted" above.

## Validation runs

- `node tools/validate.mjs registry/gr/mfa/application-for-schengen-visa/1.0.0/schema.json` — **passes**.
- `node tools/validate-ajv.mjs registry/gr/mfa/application-for-schengen-visa/1.0.0/schema.json` — **passes** (draft 2020-12, spec v0.3 meta-schema).
- A from-scratch conformance-checker script (scratch, not committed —
  evaluates `required`/`requiredWhen`/`validation.minLength`/
  `exclusivityGroups` against each fixture) found: both `valid-*.json`
  scenarios (`valid-tourist-single-entry-self-funded.json`,
  `valid-business-multiple-entry-sponsored.json`) raise **0 errors**; each
  of the 5 `mutation-control-*.json` fixtures raises **exactly 1 error**.
  See `conformance/gr/mfa/application-for-schengen-visa/1.0.0/`.
- 97 `fields[]` entries (20 required for the standard pathway), 11
  `exclusivityGroups`.
