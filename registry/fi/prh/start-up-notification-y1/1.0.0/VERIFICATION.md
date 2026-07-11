# Verification record — fi/prh/start-up-notification-y1@1.0.0

## Candidate selection

This session's brief (GOV-2292, "GovSchema Standard Research") re-scanned
CATALOG.md's own "Known Gaps & Opportunities" section fresh rather than
re-deriving the backlog from memory. Finland (opened as the registry's
34th jurisdiction via GOV-2276, `fi/migri/residence-permit-employed-person`,
Visa) had three confirmed-strong, unscreened backlog candidates flagged
directly in that cycle's own CATALOG.md update: Business Formation
(PRH/YTJ form Y1), Taxes (Vero form 3023e), and National ID (DVV's
foreign-national population-register form) — each independently
identified during GOV-2276's three-way Nordic scouting pass (Norway,
Finland, Belgium) as a genuine, live, unauthenticated fillable AcroForm
PDF. This cycle picked up the Business Formation candidate (form Y1)
directly rather than re-screening Finland's other verticals, since a
prior cycle had already done the comparative screening and flagged all
three as strong.

## Source

- **URL:** `https://www.prh.fi/material/sites/ytj/attachments/saavutettavat-y-lomakkeet/en/rqkm38u88/Y1-form.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `287,294` bytes. Confirmed a genuine PDF (`%PDF-1.7` header), 4 pages,
  no login/CAPTCHA/WAF gate anywhere on `prh.fi`.
- **Edition:** the form's own footer prints "YTJ 1001e 1.2026" on every
  page (January 2026 edition) — the currently live edition as of this
  cycle.
- **Cross-check document (read for context, not for field extraction):**
  `https://www.ytj.fi/material/collections/1Vi9Zbnte/bu0g3tFqs/y1instructions_foreign_enterprise.pdf`
  (HTTP 200, 567,393 bytes), PRH/Vero's own English-language filling
  instructions for foreign enterprises. This document describes an older
  or foreign-enterprise-specific edition of the Y1 form that includes a
  page-3 "Confirm your language selection - ENGLISH" checkbox with no
  counterpart anywhere in the actual January-2026 specimen's 102
  substantive AcroForm widgets (confirmed absent by a case-insensitive
  name search across the full widget list) — this schema follows the
  specimen actually fetched, not the instructions document, and discloses
  the discrepancy here rather than silently reconciling it.

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.mjs` v4, installed fresh to a disposable
`/tmp` directory) was used for a two-pass extraction:

1. **Per-page `getAnnotations({ intent: 'display' })`** resolved every
   `/Widget` annotation's `fieldName`, `fieldType` (`Tx`/`Btn`),
   `radioButton`/`checkBox` flags, `exportValue`, and `alternativeText`
   (tooltip) — **110 raw widgets across 4 pages** (56 `Tx`, 54 `Btn`), of
   which **8 are page-navigation/utility controls** ("Reset form", three
   "To the next page (N)" buttons, three "To the first page" buttons,
   "Print") excluded as non-data-collecting UI chrome, leaving **102
   substantive widgets**.
2. **Per-page `getTextContent()`**, clustered into visual lines by
   y-coordinate, cross-referenced against each widget's own printed
   section heading and surrounding label text — used to confirm section
   boundaries (e.g. "Address information for public use", "Type of
   enterprise", "Enclosures: select at least one, as appropriate for your
   legal entity form") and to disambiguate widgets whose field *names*
   already **are** the visible English label text (this specimen's own
   AcroForm field names are self-documenting English strings, not
   Finnish internal keys — unlike this registry's `fi/migri` precedent,
   no name/tooltip decoding step was needed here).

Every one of the 102 substantive widget names was mapped to exactly one
`fields[]`/`documents[]` entry via a disposable reconciliation script
(`/tmp/fi-prh-extract/build-schema.mjs`, not committed) that asserts zero
unmapped and zero double-mapped widgets — the same exhaustive-accounting
discipline established by this registry's `fi/migri` and `dk/erst`
cycles. The script confirmed **102/102 widgets mapped, 0 unmapped**,
consolidating to **78 `fields[]` + 7 `documents[]` entries**.

## Field consolidation

- **5-digit TOL industry code** (5 separate single-digit text widgets:
  "First/Second/Third/Fourth/Fift[h] number of five-digit TOL code") →
  one `mainSectorTolCode` string field, `pattern: ^[0-9]{5}$`, per this
  registry's established split-widget consolidation convention.
- **Company-name language** (2 independent checkboxes, "Finnish"/
  "Swedish") → one `companyLanguage` enum field.
- **Requesting registration in** (2 independent checkboxes, "The Trade
  Register"/"Register of Foundations") → one `registrationRegister` enum
  field.
- **Type of enterprise** (7 independent checkboxes: Limited company,
  Public limited company, Foundation, Branch of a foreign enterprise,
  Co-operative, Foreign company, Other type) → one `legalEntityType`
  enum field, with `legalEntityTypeOtherText` gated
  `requiredWhen: legalEntityType equals "other"`.
- **Annual turnover bracket** (3 independent checkboxes: "€30,000 max" /
  "€30,001 to €100,000" / "higher than €100,000") → one `turnoverBracket`
  enum field.
- **Desired VAT tax period length** (3 independent checkboxes: year /
  quarterly / monthly) → one `vatTaxPeriodLength` enum field; **desired
  employer-contributions tax period length** (2 independent checkboxes:
  quarterly / monthly) → one `employerContributionsTaxPeriodLength` enum
  field — kept as two separate fields, not merged together, since the
  specimen itself prints them as two independent elections (VAT and
  employer contributions can run on different period lengths).
- The remaining ~10 independent VAT-basis/VAT-status-requested/
  VAT-exclusion-justification checkboxes (page 3) were each kept as
  their own `boolean` field rather than consolidated, since the source
  explicitly allows selecting **more than one** simultaneously in each of
  those three groups (multi-select, not mutually-exclusive single-choice
  like the groups above).
- **7 "Enclosures" checkboxes** (page 2, "select at least one, as
  appropriate for your legal entity form", numbered 1/2/3/4/5/11A/6204 —
  each naming which numbered PRH/Vero appendix form to attach for a given
  legal entity type) → modelled as **`documents[]` entries**, not
  `fields[]`, per this registry's established supporting-document-
  checklist convention (matching `fi/migri`'s own attachment-checklist
  treatment). 5 of the 7 (limited/public-limited company, co-operative,
  branch of a foreign enterprise, foundation, foreign company) map
  cleanly onto a `legalEntityType` enum value and are gated
  `requiredWhen` accordingly; the remaining 2 ("Mutual insurance
  company..." and "Right-of-occupancy association...") name legal forms
  with **no corresponding value** in the "Type of enterprise" checkbox
  group above them on the specimen itself — a gap in the source form's
  own two lists, not something this schema invents a synthetic
  `legalEntityType` value to paper over. Both are modelled `required:
  false` with no `requiredWhen`, disclosed in each entry's own `label`
  rather than silently gated on an invented condition.

## Judgment calls and disclosed quirks

- **"Postal or street address is mandatory"**: the specimen's own section
  heading states this as an either/or requirement between the postal
  address block (`postalAddress`, with a PO Box option) and the street
  address block (`streetAddress`, no PO Box). GovSchema v0.3 has no
  "at least one of" cross-field primitive (`crossFieldValidation` only
  expresses `requireAbsent`/`requirePresent` gated by a triggering
  condition, or a two-field comparison — neither expresses "at least one
  of these two is present" directly without inventing a synthetic gating
  field the source does not print). This schema resolves the ambiguity
  editorially by modelling `postalAddress` (plus its postal code and
  town/city) as `required: true` — the block printed first, and the only
  one of the two that can carry a PO Box — and `streetAddress` as
  optional. Disclosed here as an editorial choice, not a structural fact.
- **Tooltip/field-name copy-paste artifact**: the two "Requesting
  registration in" checkboxes' underlying AcroForm field names are "The
  amended details are for Trade Register (enclose receipt proving you
  paid the fee)" and "The amended details are for Register of
  Foundations" — boilerplate that reads as though copied from an
  unrelated *amendment*-notification form template, even though this
  form's own visible printed text reads "Requesting registration in ☐
  The Trade Register ☐ Register of Foundations" with no "amended
  details" framing anywhere on the page. Modelled by the visible printed
  label (`registrationRegister`), with the field-name mismatch disclosed
  here rather than silently followed or silently corrected — the same
  class of finding this registry's `dk/erst` and `dk/skattestyrelsen`
  cycles each made on their own specimens.
- **`continuesPreviousBusiness`** gates `previousCompanyName`/
  `previousCompanyBusinessId` via `requiredWhen`; the specimen's own
  instruction to also "Complete the Personal Data Form" in that case
  names a second, separate PRH/Vero form (Henkilötietolomake) that is
  out of scope for this schema (Y1 only) and is disclosed in
  `continuesPreviousBusiness`'s own `description` rather than silently
  omitted.
- **Two distinct non-profit/religious-entity VAT bases** exist on the
  same page: `vatStatusRequestedNonProfitReligious` (§12.1, VAT Act, a
  basis for *requesting* VAT-taxpayer status) and
  `vatExclusionJustificationNonProfitReligious45` (§4-5, VAT Act, a
  justification for VAT *exclusion*) — same plain-language label,
  different statutory section, different section of the form, modelled
  as two distinct fields with the section/paragraph distinction stated
  in each field's own `description`.
- The `y1instructions_foreign_enterprise.pdf` cross-check document's
  "CONFIRM YOUR LANGUAGE SELECTION – ENGLISH" section (describing a
  third company-language option, English, on what it calls "page 3")
  has no counterpart anywhere in the 102-widget specimen this schema is
  built from — flagged above under Source rather than incorporated,
  since it is not confirmed present on the actual currently-live
  edition.

## Mock conformance run

Two scenarios were built and checked against this schema's own
`required`/`requiredWhen`/`documents[].requiredWhen`/
`crossFieldValidation` grammar with a from-scratch interpreter script
(`/tmp/fi-prh-extract/conformance-check.mjs`, not committed — walks
`fields[]`, `documents[]`, and `crossFieldValidation[]` directly against
a candidate data object, rather than reusing any prior cycle's own
checker):

1. **`foundation-registration-minimal-required-only.json`** — a
   foundation, filling only the 8 statically-`required: true` fields
   plus the one conditionally-required document
   (`appendixFoundation`, via `legalEntityType: "foundation"`). **0
   errors.**
2. **`limited-company-continuing-sole-trader-full-tax-registration.json`**
   — a limited company continuing a previous sole trader's business,
   electing VAT/employer/prepayment registration and a non-VAT rental
   income disclosure, exercising `continuesPreviousBusiness`'s
   conditional fields, `vatExclusionJustificationOtherApplicable`'s
   conditional text field, and the `appendixLimitedOrPublicLimitedCompany`
   conditional document. **0 errors.**

**5 mutation controls**, each expected to raise exactly 1 error, all
confirmed:

- Dropping `companyName` (a statically-required field) → 1 error
  (`MISSING REQUIRED FIELD: companyName`).
- Removing the `appendixFoundation` document from scenario 1's
  `documents[]` list entirely (not just marking it unprovided) → 1 error
  (`MISSING REQUIRED DOCUMENT: appendixFoundation (listed=false)`) —
  confirming the checker's `documents[]` requiredness path is actually
  exercised, not just its `fields[]` path (a documents-blind-spot bug
  this registry's tooling has hit before).
- Setting `firstAccountingPeriodEndDate` earlier than `establishmentDate`
  → 1 error (`CROSS-FIELD VIOLATION:
  firstAccountingPeriodEndNotBeforeEstablishmentDate`).
- Setting `continuesPreviousBusiness: true` while omitting
  `previousCompanyName` → 1 error (`MISSING REQUIRED FIELD:
  previousCompanyName`).
- Setting `vatExclusionJustificationOtherApplicable: true` while
  omitting `vatExclusionJustificationOtherText` → 1 error (`MISSING
  REQUIRED FIELD: vatExclusionJustificationOtherText`).

The checker script additionally walks every `visibleWhen`/`requiredWhen`/
`crossFieldValidation` field reference in the document and confirms each
resolves to a real `fields[]` entry (0 dangling references).

## Validation

`node tools/validate.mjs registry/fi/prh/start-up-notification-y1/1.0.0/schema.json`
and `node tools/validate-ajv.mjs` (same path) both pass individually and
as part of a full-registry run from a clean checkout of this branch.
