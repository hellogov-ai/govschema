# Verification record — `mn/gasr/state-registration-limited-liability-company` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3382**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Mongolia opened as this registry's 68th jurisdiction in the immediately
preceding cycle (GOV-3375), with a single vertical modelled — Visa, via
`mn/mfa/evisa-application`. Building out an already-open jurisdiction's next
vertical was preferred over opening a 69th brand-new jurisdiction from
scratch, following this registry's established practice.

A brief re-screen of Mongolia's other three open verticals confirmed each
still a dead end or too weak to author this cycle:

- **Taxes** (`itax.mta.mn`): unreachable this cycle — connection timeout on
  both `https://` and `http://` from this environment. Consistent with the
  prior GOV-3375 cycle's finding of a likely login-gated/unstable service.
- **DMV** (`police.gov.mn/p/3759`): confirmed still narrative-only — a "How
  to obtain a driver's license" informational page, no downloadable
  application form and no field-level wizard.
- **Passport** (`e-mongolia.mn`): confirmed to still require the e-Mongolia
  portal, whose service catalogue sits behind account login plus in-person
  biometric capture, consistent with the prior cycle's finding.
- **Business Formation**: the General Authority for State Registration
  (Улсын бүртгэлийн ерөнхий газар) publishes its Legal Entity State
  Registration template library directly and unauthenticated at
  `burtgel.gov.mn/service/images/les/...`. **Strong candidate — authored
  this cycle.**

## Sources examined

### Primary sources

- **Authority:** Улсын бүртгэлийн ерөнхий газар (General Authority for
  State Registration) — the English name is Form UB-12's own masthead
  translation ("Appendix to order No … of 2020, of the Chairman of General
  Authority for State Registration"), independently corroborated live at
  `https://eng.burtgel.gov.mn/state-registration-of-legal-entities` (the
  same name printed in that page's own footer contact block). "GASR" is
  this registry's own short-form abbreviation of that confirmed name (also
  used by an independent business-registry-guide secondary source) — it
  does not appear verbatim on `burtgel.gov.mn` itself, disclosed here
  rather than presented as a source-printed acronym.
- **Document 1 — Form UB-03 (УБ-03 маягт), "ХУУЛИЙН ЭТГЭЭДИЙН УЛСЫН
  БҮРТГЭЛД БҮРТГҮҮЛЭХ ӨРГӨДӨЛ" (Application for State Registration of a
  Legal Entity).**
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `http://burtgel.gov.mn/service/images/les/ub__03.docx`
  - **File identity:** genuine OOXML `.docx` (confirmed by its own
    `PK\x03\x04` zip-local-file-header magic bytes), 32,073 bytes,
    `sha256:10f78f99e1ab65618735507eedd8876a917ead3910d777baa4a989638009e115`.
  - **Extraction method:** Python's stdlib `zipfile` + `xml.etree` to read
    `word/document.xml` directly and walk every paragraph and nested table
    cell recursively (no `word-extractor` package needed — that package is
    for the legacy binary `.doc` format the prior `am/moj` cycle's sources
    used; this document is modern OOXML, directly parseable as XML).
  - **Structure confirmed:** a single physical form with a common
    identifying header (§1 application date — 8 character-entry boxes; §2
    legal entity registration number — 7 boxes; §3 personal file number —
    10 boxes; §4 legal entity name/form) followed by five checkbox-gated
    transaction-type branches: §5 new-entity registration (5.1 founder
    count; 5.2 share capital amount in MNT; 5.3 operation duration; 5.4
    address/phone; 5.5 business activity type; 5.6 a founders table with 5
    pre-printed rows — No./Name/Registration number/Country/Capital
    contribution amount/Share %, plus its own note directing a same-format
    continuation sheet for founder 6 onward); §6 change registration (6.1
    change details); §7 reorganization (checkboxes for merger/
    consolidation/division/separation/change-of-form, plus 7.1/7.2 tables
    for the ceasing and newly-formed entities); §8 dissolution (8.1
    decision authority/name/date/number); §9 seal-control registration
    (checkboxes for new/re-issued/surrendered); and, common to every
    branch, §10 applicant capacity (10.1, four checkbox options) and
    applicant identity (10.2 — patronymic name, given name, 10-box
    registration number, phone, email), followed by a seal/signature
    block and a legal-notice paragraph.
- **Document 2 — Form UB-12, "APPLICATION FOR REGISTRATION OF BENEFICIAL
  OWNER(S) INFORMATION IN THE STATE REGISTRATION" (official English
  translation).**
  - **URL (directly retrieved, HTTP 200):**
    `http://burtgel.gov.mn/service/images/les/eng/Form-UB-12.pdf`
  - **File identity:** genuine text-layer PDF (confirmed by its own
    `%PDF-1.7` header), 371,488 bytes,
    `sha256:c6867d84ac720f8415d9b4d3cf3a3f09ede974d3200115dcbea71db27889f8c8`.
  - **Extraction method:** `pdfjs-dist`'s `getTextContent()` (installed
    standalone in a scratch directory for extraction only, not added as a
    repository dependency), read in full across all 3 pages.
  - **What it contains:** three beneficial-owner disclosure tables (5.1
    direct owners of ≥33% solely/jointly; 5.2 affiliated-legal-entity
    owners; 5.3 indirect managers), each a variable-length repeating table
    with its own name/registration-number/citizenship/owned-assets/
    address columns, plus an applicant-capacity checkbox block (6.1) and
    applicant identity fields (6.2) structurally parallel to UB-03's own
    §10. **Not expanded into this schema's `fields[]`** — see "Scope and
    disclosed boundaries" below.
- **Both documents' shared listing page** (directly retrieved, HTTP 200):
  `http://burtgel.gov.mn/service/index.php/les-newlist/download`, under the
  heading "Template form of State registration of legal entity" — confirms
  both files are current and co-located on the Authority's own site.

### Corroborating source (not modelled as fields, used as the sourcing basis for `documents[]`)

- **New-LLC-registration checklist infographic** (a PNG image, directly
  retrieved, HTTP 200, read visually rather than OCR'd):
  `http://burtgel.gov.mn/service/images/service/les/1/01.png`, linked from
  `http://burtgel.gov.mn/service/index.php/les-newlist/les-new`'s own item
  "1. Хязгаарлагдмал хариуцлагатай компани шинээр бүртгүүлэхэд" (1. Newly
  registering a limited liability company). Lists exactly 7 required items:
  (1) Application forms — explicitly both UB-03 and UB-12 together; (2) the
  legal entity name confirmation certificate page (via `e-business.mn` or
  filed in person); (3) the founding resolution/decision; (4) the company
  charter, 2 copies; (5) proof of capital (bank deposit confirmation or a
  property schedule); (6) proof of the legal entity's registered address
  (immovable-property certificate or lease agreement); (7) the state stamp
  duty and service fee payment receipt. This is the direct sourcing basis
  for this schema's 7-entry `documents[]` array.

### External reference

- **Applicant registration-number format:** confirmed as 2 Cyrillic
  letters followed by 8 digits via Wikipedia's "Citizen Identity Card
  (Mongolia)" article, corroborating the form's own 10 individual
  character-entry boxes for this field. Modelled as
  `^[А-ЯӨҮ]{2}[0-9]{8}$`.

## Scope and disclosed boundaries

This schema models Form UB-03's **new-entity-registration branch** (§5)
plus its common identifying header (§1-4) and common applicant block
(§10), the direct Mongolian counterpart to this registry's own
`am/moj/state-registration-limited-liability-company`. The founders table
is modelled as a **bounded repeating group of up to 5 founders**
(`founder1*`-`founder5*`, each gated `requiredWhen founderCount
greaterThanOrEqual N` beyond founder 1) rather than scoped to a single
founder, because the source table's own structure supports this cleanly —
5 pre-printed numbered rows with its own note instructing a same-format
continuation sheet for founder 6 onward, closely paralleling this
registry's own `gb/hmrc/child-benefit-claim-ch2` bounded-repeating-group
convention (`child2*` gated on `numberOfChildrenClaimed`).

Explicitly out of scope, and disclosed rather than silently omitted:

- Form UB-03's own **change-registration (§6), reorganization (§7),
  dissolution (§8), and seal-control (§9)** branches — each a
  checkbox-selectable alternate transaction type on the very same physical
  form, not a variant of new-entity registration.
- **Form UB-12's own beneficial-owner disclosure field-level detail** —
  three separate variable-length tables (direct owners, affiliated-entity
  owners, indirect managers) plus its own applicant-capacity/identity
  block. It is modelled here only as a required companion `documents[]`
  entry (the Authority's own checklist pairs UB-03 and UB-12 together as
  a single "Application forms" item), not expanded into `fields[]` — a
  distinct, more complex form in its own right, left as a disclosed
  candidate for a future schema/version.
- A founder count above 5, per the source table's own continuation-sheet
  instruction (see above) — not modelled with additional named field
  groups.
- The **`e-business.mn` online submission channel** the checklist
  infographic itself references as an alternative to filing this paper
  form in person — not fetched or driven this cycle.
- **`legalEntityRegistrationNumber`/`legalEntityPersonalFileNumber`**
  (§2/§3) — read directly from the form's own 7-box and 10-box
  character-entry fields, but modelled `required: false` since a brand-new
  legal entity (the pathway this schema models) has not yet been assigned
  either number; the same §1-4 header block is reused unchanged by the
  other four transaction-type branches, where an existing entity's numbers
  are of course already known — the direct textual basis for this
  inference, not a guess.

## Conformance fixtures

12 fixtures are committed under
`conformance/mn/gasr/state-registration-limited-liability-company/1.0.0/`:
2 valid submissions (0 errors each — one single-founder minimal case, one
with 3 founders populated exercising the bounded-repeating-group logic)
and 10 mutation-control fixtures (each expected to raise exactly 1 error):
a missing required `legalEntityNameAndForm`, a missing required
`founder1Name`, an invalid `legalEntityRegistrationNumber` pattern (wrong
digit count), an invalid `applicantRegistrationNumber` pattern (wrong
letter/digit composition), an invalid `applicantEmail` pattern, an
out-of-range `founder1SharePercent` (>100), a non-positive
`shareCapitalAmountMnt`, an invalid `applicantCapacity` enum value, a
missing `founder2Name` when `founderCount` is 2 (the bounded-repeating-
group `requiredWhen` rule), and a missing `applicantPhone`. All 12 were
checked with a from-scratch, throwaway Node mock validator implementing
this schema's own `required`/`requiredWhen`/`validation` rules (not
committed — consistent with this registry's established per-cycle
practice of writing an independent validator rather than reusing the
authoring script). Both `tools/validate.mjs` and `tools/validate-ajv.mjs`
pass at 514/514 across the full registry with this schema added.

## Known gaps

- Mongolia's remaining verticals — Taxes, DMV, and Passport — are
  confirmed dead ends/too-weak this cycle (see "Why this candidate"
  above), consistent with the equivalent findings the GOV-3375 cycle
  recorded. Mongolia now stands at 2 of 6 verticals (Visa, Business
  Formation).
- Form UB-12's own beneficial-owner disclosure detail is a disclosed, open
  backlog candidate for a future companion schema — see "Scope and
  disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary sources directly
and transcribed their fields. No automated re-verification tooling exists
yet for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
