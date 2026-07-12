# Verification record — `rw/rdb/rf-001-domestic-company-application-for-incorporation` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields/documents and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2585**. It authors a
candidate pre-scouted and confirmed strong in **GOV-2569**'s research cycle
(Nigeria's National ID vertical cycle, which also scouted Rwanda's Business
Formation vertical as backlog) but left unauthored until now. This closes
**Rwanda's Business Formation vertical, bringing Rwanda to 3 of 6 verticals**
(DMV, Visa, Business Formation); Passport, Taxes, and National ID remain
open.

## Sources examined

### Source 1 (primary `source`)

- **Authority:** Rwanda Development Board (RDB).
- **Document:** "RF-001 Domestic Company Application Form for Incorporation".
- **URL (directly retrieved, HTTP 200, no login):**
  <https://businessprocedures.rdb.rw/media/2.5_rf-001%20domestic%20company.pdf>
- **File identity:** `sha256:0bbcfa32fc17ea7d38365575bcadf72a7948c029bacd020e505757396700da8b`,
  1,218,128 bytes, `Content-Type: application/pdf`. Matches the GOV-2585
  issue's own cited hash and size exactly — independently re-derived via a
  fresh `curl` rather than trusted.
- **Retrieved / reviewed:** 2026-07-12

### Source 2 — currency check (not a form source — confirms the governing statute)

- Live web search confirmed **Law N° 007/2021 of 05/02/2021 governing
  companies** (Official Gazette N° 04 ter of 08/02/2021) is Rwanda's current
  companies statute (via RDB's own published `COMPANY-ACT-2021.pdf` at
  `rdb.rw/notary/`), and that its three company-type categories (Limited by
  Shares, Limited by Guarantee, Limited by Shares and by Guarantee)
  correspond to this specimen's own printed `Category:` tick-box options —
  corroborating, not just citing, the source's currency. RDB's own
  `org.rdb.rw/business-registration/` page confirms company registration is
  free and completed within hours via the same `businessprocedures.rdb.rw`
  domain this specimen is hosted on.
- **Retrieved / reviewed:** 2026-07-12

## Extraction method

`pdfjs-dist` (legacy build, v3, `require`'d via `createRequire`) was used for
both `page.getAnnotations()` (confirming **0 `Widget` annotations across all
10 pages** — like `rw/dgie/visa-application` and unlike
`rw/rra/vrf-e06-motor-vehicle-registration-form`'s genuine AcroForm/XFA, this
is a flat, print-and-hand-fill specimen, despite its 1.2MB size) and
`page.getTextContent()` (position-sorted by `item.transform[4]`/`[5]` for
x/y) to read the form's full printed text directly. The 1.2MB size comes
from embedded fonts/graphics, not a scanned raster: every page carries a
real, position-anchored text layer, confirmed by reading full per-page text
and cross-checking item counts against the form's own 18 numbered sections.

**Content-stream vs. visual reading order:** this specimen's multi-column
pages interleave columns in the underlying content stream. For example,
page 10 draws Sections 14 (Employment) through 18 (Attachments) — each a
single-column block — in one content-stream pass, then the two-column
Attachments checkbox list and the Certification statement in a separate
pass; naively concatenating `getTextContent()` items in stream order
recovers the *wrong* section sequence. Every page was re-sorted by y
descending (and x ascending within a y-band) before reading, and every
section/field placement in the table below was verified this way rather
than assumed from stream order.

## Field inventory

All 18 numbered sections were accounted for. 256 `fields[]` entries were
derived:

| Section | Content | Schema field(s) |
|---|---|---|
| header | "Registration:" (8-option tick-box) / "Category:" (6-option tick-box) | `registrationType`, `category` |
| 1. Identification | Company code / Name reservation ID / Company name / Abbreviation | `companyCode`, `nameReservationId`, `companyName`, `companyAbbreviation` |
| 2. Applicant | Applicant position + full identity/address block | `applicantPosition` + 17-field `applicant*` block |
| 3. Head office address | Country/Province/District/Sector/Cell/Street/Phone/Email/P.O.Box/Working hours | 12 `headOffice*` fields |
| 4. Chairman of the board (Optional) | Full identity/address block | 17-field `chairman*` block (all optional) |
| 5. Managing director | Full identity/address block | 17-field `managingDirector*` block (required) |
| 6. Company employee / secretary | Full identity/address block | 17-field `companySecretary*` block (optional) |
| 7. Member of the board | 2 printed slots ("Add more pages as needed" for a 3rd+) | 2×17-field `boardMember1*`/`boardMember2*` blocks (optional) |
| 8. Auditor | Type (Person/Organization) + person or org sub-block + shared address | 20-field `auditor*` block (optional) |
| 9. Accountant | Same structure as Auditor | 20-field `accountant*` block (optional) |
| 10. Business activities | RCPA Code / Name, ~17 unbounded dashed rows | 6 `businessActivity{1-3}*` fields (bounded to 3 slots) |
| 11. Capital information | 5-subtype share table (Number/Par value/Total) + Total row; Guarantee type/Amount + Total | 17 `capital*` share fields + 3 `capital*Guarantee*` fields |
| 12. Subscribers | Type (Person/Organization) + person/org block + share table | 20-field `subscriber1*` identity/address block + 17-field `subscriber1*` share table |
| 13. Guarantor | Type (Person/Organization) + person/org block + Guarantee type/Amount table | 20-field `guarantor1*` identity/address block + 3 `guarantor1*Guarantee*` fields |
| 14. Employment | Date of hiring first employee / Number of employees on registration date | `dateOfHiringFirstEmployee`, `numberOfEmployeesOnRegistrationDate` |
| 15. Amalgamation | Amalgamated company code | `amalgamatedCompanyCode` |
| 16. Declaring to be dormant | Dormant resolution/start date; cessation resolution/date | `dormantResolutionDate`, `dormantStartDate`, `cessationResolutionDate`, `cessationDate` |
| 17. Dissolution / liquidation | Resolution date / Operation end date | `dissolutionResolutionDate`, `dissolutionOperationEndDate` |
| 18. Attachments | 18-item tick-box checklist | 18 `documents[]` entries |
| (Certification, page 10) | Printed statement beside the unwidgeted signature line | `applicationCertification` (attestation) + `certificationSigningDate` |

**256 = 2 (header) + 4 (§1) + 1 + 17 (§2) + 12 (§3) + 17 (§4) + 17 (§5) + 17
(§6) + 34 (§7, 2×17) + 20 (§8) + 20 (§9) + 6 (§10) + 20 (§11, 17 share + 3
guarantee) + 37 (§12, 20 identity/address + 17 share) + 23 (§13, 20
identity/address + 3 guarantee) + 2 (§14) + 1 (§15) + 4 (§16) + 2 (§17) + 1
(certification signing date)** — reconciles exactly.

## Scoping and disclosure judgment calls

1. **`registrationType`/`category` model the source's full printed breadth
   rather than narrowing to the incorporation-only pathway named in this
   schema's own title.** RDB uses one shared RF-001 specimen for new
   incorporation, subsequent particulars changes, dormancy, dissolution,
   amalgamation, correction, and court-ordered filings alike — matching this
   registry's established full-breadth-over-narrowing precedent (cf.
   `ng/nis` Form C1's `reasonForApplication`). `category`'s own printed
   asymmetry (an "Unlimited public" option with no "Unlimited private"
   counterpart; a "Limited by guarantee private" option with no public
   counterpart) is taken verbatim rather than symmetrized — the source
   itself does not offer a symmetrical set.
2. **Bounded repeating groups**, matching this registry's established
   convention (cf. `ng/cac`'s 4 director slots, `fi/migri`'s bounded
   groups):
   - Section 7 (Member of the board): the base specimen prints exactly 2
     slots before its own "(Add more pages as needed)" note — bounded to 2,
     not invented.
   - Section 10 (Business activities): the source prints an unbounded
     ~17-blank-row dashed table with no per-row numbering; flattened to 3
     numbered slots.
   - Sections 12 (Subscribers) and 13 (Guarantor): the base specimen prints
     exactly 1 slot each, also followed by "(Add more pages as needed)" —
     bounded to 1 slot per entity this cycle.
3. **Auditor/Accountant/Subscriber/Guarantor are each a Person-or-Organization
   alternative**: a `Type` enum selector gates person-only fields
   (`requiredWhen Type=person`) and organization-only fields
   (`requiredWhen Type=organization`) independently; the shared address/
   contact sub-block (captioned "Person resident address /Organization
   registered office address" on the source itself) is not duplicated per
   branch.
4. **Capital share tables (company-level and Subscriber-1-level): only the
   Ordinary-share row's `Number of shares` field is `requiredWhen`-gated to
   the table's own applicability condition; the other 4 printed share-
   subtype rows are left fully optional.** A company issuing share capital
   is expected to hold at least ordinary shares, but the other 4 rows are
   additional, genuinely optional share classes, not co-required as a
   group. **This was caught during this cycle's own conformance-fixture
   testing**: an earlier draft gated all 5 subtypes identically to the same
   `requiredWhen` condition; the first from-scratch positive fixture (a
   single-ordinary-share-class incorporation) correctly flagged 8 spurious
   `MISSING_REQUIRED` errors against that draft, which was then fixed
   before this schema was finalised — see "Test run" below.
5. **`businessActivity{2,3}Name` fields are deliberately NOT
   `requiredWhen`-gated on their sibling RCPA-code field via `notEquals`
   empty-string.** An unused slot's `businessActivity{2,3}RcpaCode` field is
   *absent* (`undefined`) when unused, not an empty string, and gating
   `requiredWhen` on `notEquals: ""` against a value that may be absent
   risks this registry's own documented misfire class (cf.
   `rw/dgie/visa-application`'s `child1Gender` precedent, which
   established the same avoidance for an analogous optional-sibling-field
   case). Disclosed in each field's own `description` instead of
   machine-gated.
6. **Section 18 (Attachments)'s 18 checklist items are individually
   `requiredWhen`-gated only where the mapping to a specific
   `registrationType`/`applicantPosition` value is unambiguous** —
   `amalgamationProposal`/`amalgamationResolution` to
   `registrationType=amalgamation`, `resolutionToDeclareCompanyDormant` to
   `registrationType=declaring_to_be_dormant`,
   `resolutionToCeaseBeingDormant` to
   `registrationType=cessation_to_be_dormant`, `resolutionOfLiquidation` to
   `registrationType=dissolution`, `powerOfAttorney` to
   `applicantPosition=power_of_attorney`, and `memorandum`/`articles` to
   `registrationType=new`. **7 attachments tied to a `change_of_particulars`
   filing** (resolution to change the name, alter/revoke the articles, open
   a branch, issue shares, divide/subdivide/consolidate shares, reduce
   share capital, or convert between limited/unlimited) are left optional
   with no `requiredWhen` gate at all: a single `change_of_particulars`
   filing addresses only one specific particular, and this schema has no
   separate selector identifying which one, so gating all 7 to
   `registrationType=change_of_particulars` would wrongly co-require every
   one of them whenever any single particular changes. Disclosed via each
   entry's own `handling` string rather than silently guessed.
7. **`evidenceOfPaymentOfFee` and `othersAttachment` are left optional with
   no `requiredWhen` gate**: the source's own checklist does not tie either
   to one specific `registrationType`/`applicantPosition` value.

## Test run

No live submission was attempted — this is a structural-reference specimen,
completed at (or submitted to) an RDB counter/office, not a self-service API
GovSchema can exercise. Verification here is against the schema's own
structural rules (`tools/validate.mjs`, `tools/validate-ajv.mjs`) plus a
hand-rolled, from-scratch conformance-fixture checker (implementing the
`Condition` grammar directly from `spec/v0.3/SPEC.md` §8.1) exercising both
`fields[]` requiredness/validation and `documents[]` requiredness.

Fixtures under
`conformance/rw/rdb/rf-001-domestic-company-application-for-incorporation/1.0.0/`:

| Fixture | Scenario | Expected | Actual |
|---|---|---|---|
| `new-incorporation-limited-by-shares-single-subscriber.json` | Valid: new incorporation, Limited by shares private, single individual subscriber holding only ordinary shares, 0 employees | 0 errors | 0 errors |
| `new-incorporation-limited-by-guarantee-full-officers.json` | Valid: new incorporation, Limited by guarantee private, full officer roster (Chairman, Company secretary, 2 Board members, an organization Auditor, a person Accountant), an organization Subscriber, a person Guarantor, applicant using a passport ID document | 0 errors | 0 errors |
| `mutation-control-missing-required-field.json` | Drops `companyName` from the first valid fixture | 1 error (`MISSING_REQUIRED: companyName`) | 1 error |
| `mutation-control-invalid-enum-value.json` | Sets `applicantGender` to `"other"` (not in `["female","male"]`) | 1 error (`ENUM_VIOLATION`) | 1 error |
| `mutation-control-missing-conditional-capital-field.json` | Drops `capitalOrdinarySharesNumber` (requiredWhen `category` is share-inclusive) | 1 error (`MISSING_REQUIRED: capitalOrdinarySharesNumber`) | 1 error |
| `mutation-control-invalid-date-format.json` | Sets `applicantDateOfBirth` to `"04/12/1988"` (not ISO 8601) | 1 error (`DATE_FORMAT_VIOLATION`) | 1 error |
| `mutation-control-missing-required-document.json` | Empties `applicationCertification` from `documents[]` | 1 error (`MISSING_REQUIRED_DOCUMENT`) | 1 error |

All 7 fixtures matched their expectation exactly (after the item-4 fix
above was applied — the first draft's positive fixture surfaced 8 spurious
errors before the share-table gating was corrected). Both registry
validators pass with 0 errors on this document.

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`) and now includes this document.

## What was NOT fully resolved (disclosed, not silently guessed)

- The exact requiredness of Sections 8 (Auditor) and 9 (Accountant) under
  Rwandan company law (e.g. whether either becomes mandatory above a
  size/type threshold) was not independently researched this cycle; both
  are modelled as fully optional blocks, consistent with the source's own
  print (no asterisk/"(Optional)"/"(Mandatory)" marker on either section,
  unlike Section 4's explicit "(Optional)").
- Section 12 (Subscribers) and Section 13 (Guarantor) are bounded to 1
  printed slot each this cycle; a company with multiple subscribers or
  guarantors would need this schema extended (or a v1.1.0 with additional
  slots) to capture them individually — the source's own "(Add more pages
  as needed)" note is preserved as a disclosed limitation, not silently
  worked around.
- Rwanda's remaining open verticals (Passport, Taxes, National ID) were not
  re-scouted this cycle; see `rw/rra/vrf-e06-motor-vehicle-registration-form`'s
  and `rw/dgie/visa-application`'s own VERIFICATION.md files for the prior
  cycles' dead-end findings on Rwanda's other verticals.
