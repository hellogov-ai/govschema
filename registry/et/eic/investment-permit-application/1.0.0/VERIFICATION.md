# Verification record — et/eic/investment-permit-application@1.0.0

## Candidate selection

GOV-4532 ("GovSchema Standard Research"). Ethiopia's Business Formation
candidate — the Ethiopian Investment Commission's (EIC) "Application Form
for New Investment Permit" — had been left as disclosed, ready-to-author
backlog since GOV-4246's own Ethiopia scouting pass (CATALOG.md's Known Gaps
§0c). Ethiopia's other three verticals were already published: Visa
(`et/ics/e-visa-application`), Taxes (`et/mor/individual-tin-registration`,
GOV-4246), and Passport (`et/ics/passport-application`, GOV-4264). This
schema opens the fourth of Ethiopia's six verticals, Business Formation.

## Reaching the live source

Fetched `https://investethiopia.gov.et/wp-content/uploads/2022/11/InvestmentPermitApplicationForm.doc`
directly, independently re-verifying the byte-for-byte identity of the
banked candidate rather than trusting its recorded numbers at face value:

- HTTP 200, `Content-Type: application/msword`, no login/CAPTCHA/WAF gate
  at any point in the retrieval.
- `Content-Length` / downloaded size: **88,576 bytes** — exactly matching
  the banked figure.
- sha256 of the retrieved bytes:
  `ebc7a1a680c137e07e5fa7fbd45a6df41c22a75b38f31f86e9a24a0977de2ec9` —
  exactly matching the banked hash.
- First 8 bytes: `d0 cf 11 e0 a1 b1 1a e1` — the canonical OLE2/Compound
  File Binary (CFB) magic number, confirming this is a genuine legacy Word
  97-2003 `.doc` (not a `.docx` zip archive, and not a scanned image),
  exactly as flagged by the delegating candidate note.
- `Last-Modified: Sun, 19 Nov 2023 23:32:19 GMT` — the file has not changed
  since well before this candidate was originally banked.

## Extraction method

Used the vendored pure-JS OLE2/CFB-aware `.doc` text-run parser at
`/tmp/node_modules/word-extractor` (the same tool this cycle's sibling
`na/bipa/close-corporation-founding-statement` schema used for an identical
legacy-`.doc` source), calling `extract()` against the downloaded file and
then `getBody()`, `getHeaders()`, `getFooters()`, `getFootnotes()`,
`getEndnotes()`, and `getAnnotations()` to recover every text run. Extraction
succeeded cleanly (exit 0): the body text is a complete, readable transcript
of the entire application form, including every section from the cover page
through "FOR OFFICE USE ONLY." Headers/footers contain only page-number
artifacts ("4 / 0 / 6"-style fragments); the sole footnote is the cover
page's own "if the space provided is not sufficient... use supplementary
sheet of paper" note (already covered by the cover page's own instructional
text); annotations and endnotes are both empty. No fabrication or guessing
was needed — every field below was read directly off this transcript.

## Document structure

The document is a flat sequence of caption/blank rows and Word tables (no
AcroForm widgets — this is a legacy Word template, not a fillable PDF):

- **Cover page** — "ETHIOPIAN INVESTMENT COMMMISSION" / "Application Form
  for New Investment Permit" letterhead, followed entirely by instructional
  prose (how to fill the form, the investor's blanket commitment to Ethiopian
  law, the Investment Commission's contact address). Contributes no
  applicant-supplied fields of its own; folded into this schema's own
  `documents[]` entry and field descriptions where relevant (see Scope
  below).
- **Particulars of the Applicant/Investor** — investor/company name;
  nationality/country of incorporation; a 3-row "Ethiopian partners from
  abroad (if any)" table (Name, Country of origin); a 3-row "Partner of
  Ethiopia origin (If any)" table (same shape); "(a) Residential or office
  address in Ethiopia" (Region, City, Sub-city, Zone, Wereda/Kebele, House
  No., Telephone No., Cell phone No., Fax, P.O.Box, Email); "(b) Home
  Address (including Telephone & e-mail)" (Country, Telephone, P.O.Box,
  E-mail); Tax Identification No.; Commercial Registration No.; "Address of
  authorized representative (if any)" (Region, City, Sub-city, Zone,
  Wereda/Kebele, House No., ID No., Tel., Cell Phone, Fax, P.O.Box, E-mail).
- **legal form of the business** — a single-select checkbox group: Sole
  proprietorship / Business Organization / Public Enterprise / Cooperative
  Society.
- **Type of Ownership** — a single-select checkbox group: Domestic Investor
  / Foreign Investor / Joint investment (Foreign & Local Investor) / Branch,
  followed by "If it is branch, address of the parent company:".
- **Profile of Proposed Investment** — project title/investment activity;
  project location (Region, Zone, Wereda); land requirement by project type
  (Industrial, Agricultural, Service, in Sq. M. or Ha.); utility requirements
  at full capacity (Electric Power in Kw, Water in m3/year, Others if any);
  a free-text project objective/major-activities description.
- **Estimated investment cost (in million US$ and Birr)** — a two-column
  (In US$ / In Birr) table over five categories (Land; Building and civil
  works; Machinery/equipment; Other fixed capital cost; Initial working
  capital) plus a Total row.
- **Source of finance** — Equity, Loan, Others (specify), Total — each
  printed with a single amount blank (see Scope §3 below on why no
  US$/Birr or foreign/domestic column split is asserted here, unlike the
  investment-cost table immediately above it).
- **Estimated number of employees at full capacity** — a 2-column
  (Permanent employees / Temporary employees) x 3-row (Local / Expatriate /
  Total) table, plus a free-text note asking whether the project creates
  employment for women, disabled, or other underprivileged groups.
- **Estimated annual production/service rendering... and marketing plan**,
  and **Raw material requirements (applicable to manufacturing and
  agricultural projects only)** — two open-ended, multi-row tables with no
  derivable bounded row count (see Scope §1 below — excluded).
- **PROJECT IMPLEMENTATION PLAN** — expected commencement/completion dates
  of the project; a fixed, pre-printed 10-row "Details of project activities
  and their date of completion" table (each row a numbered, named activity
  with its own completion-date blank; row 9 is itself "Any other (please
  indicate)"); a note about documents to be submitted within 3 months of
  permit issuance (post-approval, excluded — see Scope §2); a free-text
  environmental-impact/mitigation description; a single-select "where did
  you learn about the investment opportunity" checkbox group with three
  "(specify)" sub-options.
- **Declaration and Signature of Applicant** — Name of Applicant,
  Responsibility, Signature, Date.
- **FOR OFFICE USE ONLY** — Permitted/Rejected checkboxes, rejection
  reasons, and the reviewing/approving official's own name/signature/date —
  excluded in its entirety as EIC-internal, not applicant-supplied, content
  (Scope §4 below).

## Scope: exclusions

1. **The "Estimated annual production/service rendering... and marketing
   plan" table and the "Raw material requirements" table are excluded
   entirely.** Both are genuine Word tables whose cells extracted as long
   runs of empty lines with no distinguishing row markers — unlike the two
   partner tables above them, which print an explicit, countable 3-row
   block of dotted blanks, these two tables give no signal (no statutory
   cap, no repeated-page structure, no numbered rows) from which to derive
   a bounded slot count. This is consistent with the cover page's own
   invitation to use a free-form "supplementary sheet of paper" if the
   printed space is insufficient. The Raw Material table is additionally
   explicitly conditional ("applicable to manufacturing and agricultural
   projects only") and uses a mark-to-select-cell format not modelled
   elsewhere in this schema. Neither table is part of this schema's own
   field inventory.
2. **The Project Implementation Plan's own "3.2." note** ("The following
   documents should be submitted in 3 (three) months time after getting the
   investment permit and the land..., List of capital goods: machinery,
   laboratory equipment") is excluded as a post-approval submission
   requirement, not a document attached to this application itself —
   mirroring this registry's established convention of excluding
   Registrar/office-post-approval content (e.g.
   `na/bipa/close-corporation-founding-statement`'s own excluded Certificate
   of Incorporation).
3. **The "FOR OFFICE USE ONLY" block is excluded in its entirety** as
   EIC-internal reviewing/approving-official content, not applicant-supplied
   data — the same exclusion class as the note above.
4. **The cover page's own instructional/procedural prose contributes no
   fields of its own** but its one concrete, applicant-facing obligation —
   "The applicant is required to attach relevant documents about an
   investor's previous business background" — is modelled as this schema's
   sole `documents[]` entry (`previousBusinessBackgroundDocuments`). The
   cover page's other, more generic clause ("This application form should
   be submitted together with other legal required documents") names no
   specific document and is not modelled as a second `documents[]` entry,
   to avoid fabricating a specific attachment the source itself does not
   name.

## Scope: bounded-repeating-group decisions

1. **Both partner tables (Ethiopian partners from abroad; Partner of
   Ethiopian origin) are modelled as 3 bounded slots each**
   (`partnerAbroad1..3`, `partnerEthiopianOrigin1..3`), matching the source
   form's own literal printed capacity — exactly 3 dotted-blank rows under
   each heading, with no "add more rows" instruction anywhere nearby. Both
   tables are captioned "(if any)"/"(If any)" with no compulsory marking, so
   every slot's Name/Country-of-origin pair is modelled bare-optional (no
   `requiredWhen` gate at all, and no synthetic count field), per this
   registry's convention for a genuinely optional repeating block with no
   printed count-driven gate of its own (contrast the gated
   `numberOfMembers`-driven slots in `na/bipa/close-corporation-founding-
   statement`, whose source instead prints a hard statutory member cap).
2. **The Project Implementation Plan's 10-row activity table is modelled as
   10 fixed fields** (`activity1CompletionDate`...`activity10Completion
   Date`), not a repeating slot pattern — because, unlike the member/witness
   tables in this registry's other bounded-slot schemas, each row here has
   its own distinct, non-repeating printed label (e.g. "Land acquisition,"
   "Testing of machinery and equipment"), so this is a fixed checklist, not
   an applicant-populated repeating group. Row 9 ("Any other (please
   indicate)") is the one row whose label the applicant supplies; modelled
   as an additional `activity9Description` field, left bare-optional
   alongside its own `activity9CompletionDate` (both optional, not gated on
   each other, per this registry's documented notEquals/requiredWhen-
   against-an-absent-optional-field bug class — see
   `notequals-empty-string-absent-field-bug` in this registry's own prior
   findings).
3. **Row 4 ("Public utility acquisition") is modelled as a single
   `activity4CompletionDate` field**, not split into four sub-dates for its
   own printed sub-items (Electricity, Water, Telecom, Others if any). The
   underlying Word table appears to use merged/irregular cells at this row
   (the sub-item lines extracted with no distinguishing per-item date
   blanks of their own, unlike, e.g., the clean two-column "Estimated
   investment cost" table's explicit "In US$ / In Birr" header row); rather
   than invent an unverified four-way split, this row is modelled the same
   as every other single-date activity row, with the sub-items folded into
   the field's own description.

## Other disclosed findings

1. **The "Source of Finance" table (Equity/Loan/Others/Total) is modelled
   with one amount field per category, not a US$/Birr (or foreign/domestic)
   column split.** The linear word-extractor transcript shows an
   inconsistent, apparently merged-cell table at this specific section (the
   tab-count pattern differs row to row in a way the clean, unambiguous
   two-column "Estimated investment cost" table immediately above it does
   not), so no reliable second-column split could be reconstructed from
   this extraction. This is a disclosed, conservative judgment call: this
   schema's own delegating candidate description characterized this section
   as having a "foreign/domestic" breakdown, but that characterization does
   not reproduce in this cycle's own independent re-extraction of the raw
   document, so it is not asserted here.
2. **`legalFormOfBusiness` and `ownershipType` are each modelled as a
   single-select `enum`**, matching the source's own single checkbox-group
   presentation for each; `ownershipType`'s own "Joint investment (Foreign &
   Local Investor)" option is retained as one printed literal value (not
   decomposed into two boolean flags), since the source presents it as one
   checkbox alongside the two single-party options.
3. **`branchParentCompanyAddress` is `requiredWhen ownershipType equals
   "BRANCH"`**, directly gated on the immediately-adjacent printed
   conditional ("If it is branch, address of the parent company:").
4. **`infoSourceAboutInvestmentOpportunity` and its three "(specify)"
   companion fields are modelled bare-optional/`requiredWhen`-gated on that
   enum's own value**, since this is a supplementary market-research
   question ("Please indicate where you have got information...") with no
   compulsory marking and no bearing on permit approval.
5. **`homeAddressAbroadCountry`/`Telephone`/`PoBox`/`Email` are modelled
   bare-optional**, since this block (printed immediately after the
   Ethiopian residential/office address, with no "(if any)" qualifier but
   also no compulsory marking) is primarily applicable to a foreign investor
   or partner rather than a purely domestic one; no directly-adjacent
   checkbox conditions this block, so it is left ungated rather than
   speculatively tied to the later, structurally distant `ownershipType`
   field.
6. **`taxIdentificationNumber` and `commercialRegistrationNumber` are
   modelled optional**, since a first-time investment-permit applicant
   would not yet hold either — mirroring this registry's established
   treatment of a pre-registration identifier field (e.g.
   `na/bipa/close-corporation-founding-statement`'s own
   `registrationNumberOfCorporation`).
7. **`totalInvestmentCostUsd`/`Birr`, `totalFinanceAmount`, and
   `totalPermanentEmployees`/`totalTemporaryEmployees` are each modelled as
   ordinary required numeric fields**, matching the source's own printed
   "Total" blank in each table, but this schema asserts no cross-field sum
   validation against the individual category fields above them — this
   registry's `crossFieldValidation` grammar only compares two named fields
   or checks presence, with no aggregate-sum-across-a-variable-length-set
   operator available (the same disclosed limitation
   `na/bipa/close-corporation-founding-statement` recorded for its own
   `memberNPercentageOfInterest` fields).
8. **Signature fields (`applicantSignature`) are modelled as `type: string`
   "signature-name attestation" fields**, per this registry's established
   convention for a printed signature line with no separate digital-
   signature mechanism disclosed by the source.
9. **Email fields reuse this registry's own single-escaped email pattern**
   (`^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$`, one backslash per JSON string), per
   this registry's documented double-escaped-regex defect class
   (`py/suace/business-formalization-individual`, GOV-4437).

## Conformance

3 valid mock scenarios — `valid-domestic-sole-proprietorship` (a domestic
sole-proprietor investor with no partners, no home address abroad, no
representative, and the "Any other" activity row left blank);
`valid-joint-investment-with-partners-and-representative` (a joint
foreign/local investment exercising both partner tables at full 3-row
capacity, a home address abroad, an authorized representative, and the
"Any other" activity row populated); and
`valid-branch-of-foreign-company` (a branch of a foreign company, exercising
`branchParentCompanyAddress` and the `infoSourceAboutInvestmentOpportunity`
"Other Gov't institutions" branch) — plus 9 mutation-control fixtures (6
missing-static-required fixtures across investor/address/legal-form/project/
investment-cost/declaration fields, 2 missing-`requiredWhen`-gated fixtures
exercising the branch-parent-company-address gate and the info-source
"specify" gate, 1 invalid-enum fixture) and 1 unknown-field-rejected fixture
— 13 fixtures total, committed under
`conformance/et/eic/investment-permit-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13: all 3 valid scenarios at 0 errors, all
9 mutation controls each raising exactly 1 error, and the unknown-field
mutation correctly rejected; confirmed every `requiredWhen` field reference
resolves (0 dangling references). Validated clean with
`node tools/validate.mjs`, individually and as part of the full registry
run. `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
