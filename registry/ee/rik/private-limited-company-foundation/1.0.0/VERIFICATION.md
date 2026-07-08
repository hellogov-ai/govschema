# Verification record — `ee/rik/private-limited-company-foundation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1705**: "GovSchema Standard Research" — catalog existing
coverage, research an online government application/document system this
registry is missing, document its fields, run a mock test, and author and
catalog a new schema. Rather than open a brand-new (24th) jurisdiction or
re-screen an older jurisdiction's already-confirmed dead ends, this cycle
picked Estonia's own Business Formation gap: EE was the registry's most
under-built jurisdiction at 1/6 verticals (only `ee/ppa/e-residency-application`,
GOV-1698, National ID & Civic Documents), and its e-Residency programme's
own flagship real-world use — a foreign national forming and remotely
managing an Estonian company — has no corresponding Business Formation
schema yet.

## Candidate screening (Phase 1-2)

### Candidate examined: e-Business Register (e-äriregister) live portal

`ariregister.rik.ee` is the public-facing e-Business Register site
(company search, public data) and its companion filing portal
("ettevõtjaportaal") is where a founding petition is actually submitted.
Multiple secondary sources (RIK's own English "e-Business Register Portal"
page, e-Resident marketplace listings) confirm that submitting a petition
requires digital signature authentication (Estonian ID card, Smart-ID, or
Mobile-ID) before any field renders — an authenticated wizard, structurally
the same kind of gate that blocked a live-field-level view of
`ee/ppa/e-residency-application`'s own `eresident.politsei.ee` SPA. Creating
a throwaway account/session to walk the wizard live was ruled out, per this
registry's standing discipline against creating accounts or submitting
fabricated data against a live government system.

### Picked approach: governing statute as primary source

Rather than a dead end, Estonia's company-formation law is unusually
explicit about the petition's required content: the Commercial Code
(Äriseadustik) §138 states verbatim what a memorandum of association "shall
set out" (9 enumerated items), §139 states what the articles of association
"shall set out" (8 enumerated items, one budget item for expedited-procedure
use), and the Commercial Register Act (Äriregistri seadus, the newer 2023
act that split registry procedure out of the Commercial Code) §§12-14 state
exactly which data items appear on the resulting registry card and
shareholder list. This is the same "governing statute as primary source
when the live application has no field-level transparency" technique this
registry used for `pl/mswia/wniosek-o-wydanie-paszportu` (GOV-1685) and
`ee/ppa/e-residency-application` (GOV-1698) — here applied to a second,
independent EE agency/process, confirming the technique generalizes within
a jurisdiction rather than being a one-off for a single agency's regulation.

## Sources examined

### Source 1 (primary, registry/petition procedure)

- **URL cited in `source.url`:**
  <https://web.archive.org/web/20240521195859/https://www.riigiteataja.ee/en/tolge/pdf/503012023001>
  (Wayback Machine snapshot, 21 May 2024, of Riigi Teataja's official
  English translation of the Commercial Register Act).
- **Why a Wayback snapshot, not a direct link:** every route on
  `riigiteataja.ee` (including the `/en/tolge/pdf/<id>` "official
  translation PDF" route) is now served by a fully client-rendered Angular
  single-page app. Confirmed directly this cycle: a plain `curl` GET of
  both the human-facing consolidated-text page and the `/tolge/pdf/`
  route returns an *identical* 51,744-byte HTML shell (`<html
  data-critters-container>`, a `<title>Riigi Teataja</title>`, and Angular
  bundle references) with `content-type: text/html` — no server-rendered
  legal text and no actual PDF bytes reach an unauthenticated automated
  client. The Wayback Machine's own snapshot (taken by a full browser
  crawl before or during a page-render) captured the underlying document
  as a real, extractable PDF (140,956 bytes, `%PDF-1.4`, produced by Apache
  FOP) — the same "government host hangs/blanks on direct fetch, use a
  Wayback snapshot" workaround this registry has used before for
  `passports.gov.au`/`dfat.gov.au`.
- **Extraction:** the snapshot PDF's 18 pages were extracted with
  `pdfjs-dist`'s text-content layer (no OCR needed — it is a real text
  layer, not a scan).
- **What it confirms:** §9 (register comprises registry-card, public-file,
  registry-file data); §10 (personal-data submission rule — Estonian
  personal identification code, or in its absence a foreign code and date
  of birth; address to building/part-of-building accuracy); §12 (registry
  card data on a legal person — name, registry code, legal form, articles
  of association's effective date, registered office/address/e-mail,
  contact-person data, management board members' names and personal
  identification codes, financial-year note, other data); §13 (additional
  private/public limited company registry-card data — share capital
  amount, procurator data, register-of-securities notations); §14 (list of
  shareholders — names, personal identification codes, nominal values of
  shares); §40 (form and manner of delivery of a petition — notarised or
  digitally signed, submitted via the e-Business Register, not by post/
  e-mail once electronic submission is possible); §§41-43 (registrar's
  review, 5-working-day standard timeline, and the specific requirements
  for the optional expedited 1-working-day procedure).

### Source 2 (primary, memorandum/articles-of-association content)

- **URL:**
  <http://web.archive.org/web/20230810103145/https://www.riigiteataja.ee/en/tolge/pdf/509012023001>
  (Wayback Machine snapshot, 10 August 2023, of Riigi Teataja's official
  English translation of the Commercial Code, Äriseadustik).
- **Why a Wayback snapshot:** same `riigiteataja.ee` SPA-shell problem as
  Source 1; the Wayback snapshot again resolved to a real, extractable PDF
  (621,189 bytes, 168 pages, same Apache FOP producer).
- **What it confirms:** Chapter 18 "Foundation" (§§137-145): §137 (a
  private limited company may be founded by one or several natural or
  legal persons); §138 (memorandum-of-association content, 9 enumerated
  items — this document's core field source, and the source of the
  single-founder scoping decision below); §138(5) (a sole founder's
  memorandum of association is substituted by a notarised foundation
  resolution — modelled as an alternative form of the same
  `memorandumOfAssociation` document); §139 (articles-of-association
  content, 8 enumerated items, including legal reserve and management
  board representation rights); §139¹ (the simplified "articles of
  association used upon expedited procedure" — confirms that the
  standalone expedited pathway needs only a bounded subset of §139's items,
  informing which items this document treats as always-required); §140-141
  (payment for shares — must be paid in full before the petition is
  submitted; monetary contributions go into a bank account opened in the
  founding company's own name); §142-143 (non-monetary contribution rules
  and valuation, including the EUR 25,000 auditor-verification threshold);
  §145 (additional registry-card data specific to a private limited
  company, including the financial year's beginning and end).

### Source 3 (corroborating, registrar identity and portal operator)

- **URL:**
  <https://www.kohus.ee/en/estonian-courts/estonian-court-system/district-courts/tartu-maakohus/land-registry-and-registration>
  and <https://www.rik.ee/en/e-business-register/e-business-register-portal>
  (both retrieved directly this cycle, HTTP 200, no login).
- **What it confirms:** the commercial register and the register of
  non-profit associations and foundations are maintained by the
  Registration Department of Tartu County Court (the statutory
  "registrar"); the e-Business Register (e-äriregister) portal — the
  system through which a petition is actually submitted — is developed and
  managed by the Centre of Registers and Information Systems (RIK) on the
  registrar's behalf. Modelled via `authority`/`authority.operatedBy`,
  matching the meta-schema's existing shape for exactly this
  registrar-versus-portal-operator split.

### Source 4 (checked, not used as a primary citation — the state fee amount)

- Multiple secondary/practitioner sources (a legal-services blog, a
  chamber-of-commerce Q&A) converge on a EUR 200 standard / EUR 265
  expedited-procedure state fee for entry of a private limited company, but
  this cycle could not retrieve the State Fees Act's (Riigilõivuseadus) own
  current fee-schedule section from a primary source within the same
  `riigiteataja.ee` SPA-shell obstacle, and no Wayback snapshot of the
  specific PDF/section carrying today's amount was located and confirmed.
  **Disclosed rather than asserted:** `documents[].stateFeePayment` is
  modelled as a required payment with no `amount` sub-object, and its
  `sourceRef` explicitly names this non-confirmation rather than silently
  omitting the caveat. The `foundation-petition.json` conformance fixture's
  `projectedFoundationCosts` value (EUR 265) is drawn from these secondary
  sources for realism only and is not asserted as a schema-level fact.

## Field inventory (Phase 3)

29 `fields[]` entries and 4 `documents[]` entries, every one carrying its
own `sourceRef` inline in `schema.json`, citing a specific Commercial
Code/Commercial Register Act section. Summary by step:

| Step | Fields | Source |
|---|---|---|
| Company identity | `businessName`, `registeredOfficeAddress`, `contactEmail` | CC §138(2)(1); CRA §12(1),(5) |
| Founder | `founderFullName`, `founderResidenceAddress`, `founderPersonalIdentificationCode` | CC §138(2)(2); CRA §10(1) |
| Share capital and contribution | `shareCapitalAmount`, `numberOfShares`, `nominalValuePerShare`, `contributionType`, `nonMonetaryContributionDescription`, `nonMonetaryContributionValuationMethod`, `sharesPaidInFull` | CC §136, §138(2)(3)-(6), §140-143 |
| Management board, supervisory board, procurator, auditor | `managementBoardMemberFullName`, `managementBoardMemberPersonalIdentificationCode`, `managementBoardRepresentationRule`, `hasSupervisoryBoard`, `supervisoryBoardMemberFullName`, `supervisoryBoardMemberPersonalIdentificationCode`, `hasProcurator`, `procuratorFullName`, `procuratorPersonalIdentificationCode`, `hasAuditor`, `auditorNameOrFirm` | CC §138(2)(7)-(8), §139(1)(7¹); CRA §12(7), §13(2) |
| Foundation costs, legal reserve, financial year | `projectedFoundationCosts`, `foundationCostsPaymentProcedure`, `legalReserveAmount`, `financialYearStartMonthDay`, `financialYearEndMonthDay` | CC §138(2)(9), §139(1)(7), §145(1)(7) |
| Documents | `memorandumOfAssociation`, `articlesOfAssociation`, `nonMonetaryContributionValuationDocuments` (conditional), `stateFeePayment` | CC §138(1),(3)-(5), §139, §142-143; Riigilõivuseadus |

## Access notes and judgment calls

1. **Scoped to a single founder.** The Commercial Code allows one or
   several founders (§137(1)), and §138(2)(4)'s "division [of shares]
   among the founders" only becomes a genuinely multi-valued data
   structure once a second founder exists. The v0.3 meta-schema's `field`
   type has no repeating-group/array primitive, so modelling more than one
   founder cleanly would require either N parallel flat field sets (an
   arbitrary, unbounded cap) or a `documents[]`-style "list of founders"
   escape hatch this meta-schema does not currently offer. Rather than
   force either, this document models the single-founder case explicitly
   — also the flagship real-world scenario this registry's own
   `ee/ppa/e-residency-application` schema exists to serve (an e-Resident
   forming and remotely managing their own one-person OÜ) — and defers
   multi-founder/co-founder scope to a future v1.1.0 or v2.0.0.
2. **`managementBoardRepresentationRule` is optional (`required: false`),
   not `requiredWhen`-gated.** The Commercial Code states this data point
   is only meaningful "where the management board has more than one
   member" (§139(1)(7¹)), a fact this document does not otherwise track as
   a field (a single management-board-member scenario, matching the
   single-founder scope, makes a representation-rights choice moot). Left
   as a plain optional field rather than inventing an unconfirmed
   board-member-count field purely to gate it.
3. **Assigned/derived registry outputs are excluded from `fields[]`.** The
   registry code (§22), the articles of association's own effective date
   once entered (§12(4)), and any registrar-assigned entry number are all
   outputs the registrar produces upon making the entry — never
   applicant-submitted data — and are not modelled, consistent with this
   registry's applicant-input-only convention.
4. **EMTAK activity classification and the e-Resident-specific "contact
   person" and virtual-office-address obligations are deliberately
   out of scope.** Both are real, commonly-cited practical requirements
   (EMTAK is Estonia's statistical activity-classification code; a
   non-resident director/shareholder needs a registered contact person
   under a separate provision), but neither appears in the Commercial
   Code §§138-145 or Commercial Register Act §§9-14 sections this document
   cites as its primary source — including them here would mean sourcing
   them from a different, unreviewed statute this cycle did not verify.
   Left as a disclosed gap for a future revision rather than asserted on
   secondary-source authority alone.
5. **The exact current state fee amount is disclosed as unconfirmed, not
   asserted.** See Source 4 above — `documents[].stateFeePayment` has no
   `amount` sub-object for this reason, unlike, e.g.,
   `ee/ppa/e-residency-application`'s confirmed EUR 150 fee.
6. **`financialYearStartMonthDay`/`financialYearEndMonthDay` use a MM-DD
   string, not the meta-schema's `date` type.** A financial year's
   start/end (Commercial Code §145(1)(7)) is a recurring month-and-day
   pair, not a specific calendar date with a year component the way a
   `date`-typed field elsewhere in this registry (e.g. a document's issue
   date) would be; a `pattern`-validated `MM-DD` string avoids implying a
   fixed one-off year that does not exist in the source concept.
7. **The expedited (1-working-day) procedure is referenced in field
   `sourceRef`s (§139¹, §42) but not modelled as a separate exclusivity
   branch.** §139¹'s simplified standard articles impose additional
   constraints this cycle chose not to fully encode (share capital "set
   out as a specific amount" only, no additional company-specific clauses
   permitted) since doing so correctly would require a second parallel
   articles-of-association field set — a real but separately-scoped
   extension, left for a future revision rather than half-modelled here.

## Test run (Phase 4)

No live submission was attempted: the e-Business Register's actual filing
portal requires an Estonian ID card, Smart-ID, or Mobile-ID digital
signature session before any field renders, and even a successful petition
creates a real, fee-liable legal entity in Estonia's commercial register —
not a safe or reversible action to simulate against a live government
system, consistent with this registry's standing discipline (the same
reasoning `ee/ppa/e-residency-application` and
`pl/mf/zeznanie-pit-37` both documented for their own live/authenticated
channels).

Instead, one fully hand-constructed mock record was built from this
document's own field inventory — a fictional Finnish freelance consultant
(the same kind of cross-border, remote-management scenario
`ee/ppa/e-residency-application` exists to serve) founding a single-member
OÜ with a EUR 2,500 monetary-only contribution, no supervisory board, no
procurator, no auditor — and is committed as this document's conformance
fixture (`conformance/ee/rik/private-limited-company-foundation/1.0.0/foundation-petition.json`).
It was checked with a small ad hoc Node script (not committed) that
compiles `schema.json`'s own `required`/`requiredWhen`/`validation` rules
(including the shared `Condition` grammar's `equals` leaf) and every
`documents[].required`/`requiredWhen` rule, and evaluates them directly
against the fixture:

```
$ node check.mjs registry/ee/rik/private-limited-company-foundation/1.0.0/schema.json conformance/ee/rik/private-limited-company-foundation/1.0.0/foundation-petition.json
All required/requiredWhen/enum/pattern checks passed against conformance/ee/rik/private-limited-company-foundation/1.0.0/foundation-petition.json
```

**Negative controls** (each run against a variant payload, not committed as
separate fixture files), confirming the script actually catches violations
rather than passing vacuously:

- (a) `contactEmail: "not-an-email"` — caught: fails the e-mail `pattern`.
- (b) `contributionType: "crypto"` — caught: not in
  `["monetary","non-monetary"]`.
- (c) `businessName` removed entirely — caught: `FIELD businessName:
  required but missing`.
- (d) `contributionType: "non-monetary"` with
  `nonMonetaryContributionDescription`/`nonMonetaryContributionValuationMethod`
  omitted — caught: both flagged as `required but missing`, **and** the
  `nonMonetaryContributionValuationDocuments` document's own `requiredWhen`
  correctly fires (`DOCUMENT nonMonetaryContributionValuationDocuments:
  required but missing`) — confirming a field-level `requiredWhen` and a
  document-level `requiredWhen` gated on the *same* condition both
  evaluate consistently.
- (e) `documents.stateFeePayment` omitted — caught: `DOCUMENT
  stateFeePayment: required but missing`.
- (f) `sharesPaidInFull: "yes"` (a string, not a boolean) — caught:
  `FIELD sharesPaidInFull: expected boolean, got string`.
- (g) `shareCapitalAmount: -5` — caught: `FIELD shareCapitalAmount: below
  minimum 0.01`.

All seven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/rik/private-limited-company-foundation/1.0.0/schema.json
ok   registry/ee/rik/private-limited-company-foundation/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/rik/private-limited-company-foundation/1.0.0/schema.json
ok   registry/ee/rik/private-limited-company-foundation/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
