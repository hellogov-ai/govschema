# Verification record — no/brreg/samordnet-registermelding@1.0.0

## Candidate selection

GOV-2316 is a direct follow-on to GOV-2314 ("GovSchema Standard Research"),
which scouted Norway, Belgium, and Luxembourg in parallel via three
general-purpose subagents doing real WebSearch+fetch across all 6 verticals
for each. Norway rated the strongest opening: genuine unauthenticated
AcroForm PDFs in 4 of its 6 verticals (Business Formation ~380 widgets,
Visa ~328, DMV ~82, National ID ~63); Passport and Taxes were pre-scouted as
weak/dead-end (Norway's tax return has been fully digital/pre-filled with no
paper fallback since 2022; the passport process is online/in-person-only
with no downloadable application PDF). Belgium's candidates were all flat
non-fillable PDFs (no AcroForm widgets in any of the 6 verticals). Luxembourg
had 2 strong candidates (Taxes 1128 widgets, DMV 42 widgets) but 4 of 6
weak/dead. Norway's 4-of-6 hit rate made it the stronger overall opening,
matching this registry's Finland precedent (GOV-2276).

This document opens Norway (the registry's 35th jurisdiction) via Business
Formation — Brønnøysundregistrene's (BRREG) "Samordnet registermelding"
(Coordinated Register Notification), form BR-1010B — the richest of the
4 pre-scouted candidates, matching this registry's precedent of opening a
new jurisdiction via its strongest vertical (e.g. Finland/GOV-2276,
`fi/migri/residence-permit-employed-person`).

## Source

- **URL:** `https://www.brreg.no/wp-content/uploads/BR-1010BM.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `2,313,349` bytes — matching this issue's own pre-recorded figure exactly.
  Confirmed a genuine PDF (`%PDF-1.6` header), 6 pages, no login/CAPTCHA/WAF
  gate anywhere on `brreg.no`.
- **Edition:** the form's own footer prints "BR–1010B-2026" on every page
  (the 2026 edition, currently live as of this cycle). Note the source
  filename on the BRREG web server is `BR-1010BM.pdf` (with a trailing "M"),
  while the form's own internally-printed identifier reads "BR–1010B-2026"
  (no "M") — a disclosed filename/internal-identifier discrepancy, not
  incorporated into this document's own `id` (which follows this registry's
  own `<agency>/<process-name>` convention, not the source's internal form
  number).

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.mjs` v4, installed fresh to a disposable
`/tmp` directory) was used for a three-pass extraction:

1. **`doc.getFieldObjects()`** resolved **386 distinct field names**, matching
   this issue's own pre-recorded figure exactly.
2. **Per-page `page.getAnnotations({ intent: 'display' })`** resolved every
   `/Widget` annotation's `fieldName`, `fieldType` (`Tx`/`Btn`),
   `checkBox`/`radioButton` flags, `exportValue`, and `alternativeText`
   (tooltip, where present), and `rect` (position) — **380 raw widgets
   across 6 pages** (207 `Tx` text, 173 `Btn` checkbox, 0 `Ch`), matching
   this issue's own pre-recorded figure exactly. 379 distinct widget
   `fieldName`s among the 380 widgets: one raw name (`Postnummer7`, page 2)
   is reused by two independent widgets at different positions — a
   disclosed source-form authoring duplicate/typo (see "Judgment calls and
   disclosed quirks" below), not a repeated/kids-of-one-field structure.
3. **Per-page `getTextContent()`**, clustered into visual lines by
   y-coordinate and cross-referenced by x-coordinate against each widget's
   own `rect` — used to decode this specimen's own field names, which
   (unlike this registry's `fi/prh` precedent) are a mix of self-documenting
   Norwegian words (`Navn1`, `Organisasjonsnummer`, `Adresse2`) and fully
   generic sequential names (`Check Box16`...`Check Box150`, `Boks14`...
   `Boks50`, `Text14`...`Text38`) with no `alternativeText` tooltip on the
   generic ones. Every generic checkbox/text widget's semantic meaning was
   derived from its `rect` x/y position relative to the nearest printed
   label, cross-checked against consistent left-to-right/top-to-bottom
   reading-order and checkbox-before-label offset patterns (typically
   17-25pt) observed across every *confidently verifiable* group on this
   specimen (e.g. the 26-option organisational-form grid in field 8, whose
   3-column/9-row checkbox-to-label mapping was independently re-derived by
   x-position and cross-checked against the section's own printed
   3-column layout).

A rendering attempt via a headless-Chromium/Playwright pipeline (using this
environment's cached `playwright-core` + `chromium-1228` binary against
`/paperclip/chrome-sysroot`'s shared libraries) failed: Chromium's built-in
PDF viewer crashed on this specimen. A second attempt rendering each page
to a PNG canvas via `pdfjs-dist` + `node-canvas` (with `standardFontDataUrl`
and `cMapUrl` correctly configured) produced only the AcroForm widget
rectangles with **no glyph text at all** on every page attempted — consistent
with this specimen's visible page content being a background raster image
(not vector text) that `node-canvas`'s image-decoding path could not paint,
while the *invisible* OCR text layer above it (the actual source of every
`getTextContent()` result used throughout this extraction) rendered fine as
data but not as pixels. This means the coordinate-based inference below was
**not** cross-checked against a rendered visual of the specimen; every
mapping is disclosed as either confidently reproducible (consistent,
verifiable offset patterns; the large majority of this form) or explicitly
flagged as lower-confidence (two specific checkbox rows, below).

A disposable reconciliation script (`/tmp/no-brreg-extract/gen/reconcile.mjs`,
not committed) mapped all 379 distinct widget names to this document's
`fields[]`/`documents[]` entries and confirmed: **378/379 mapped, 1 disclosed
exclusion** (`Check Box84`, page 2 — a stray widget positioned directly
under the "Kryss av" ("Tick") column-header text for section 12's contact-
person role grid, with no adjacent label of its own and no tooltip;
excluded as a non-data-collecting artifact, the same treatment this
registry's `fi/prh` precedent gave its form's page-navigation/utility
buttons, disclosed here rather than silently dropped). The remaining 378
names consolidate to **240 `fields[]` entries and 6 `documents[]` entries**.

## Field consolidation

- **26-option organisational form** (section 8, "Organisasjonsform") — every
  legal entity type Enhetsregisteret accepts (sole proprietorship through
  public limited companies, foundations, cooperatives, public-sector bodies,
  etc.), printed as a 3-column checkbox grid — consolidated into one
  `legalEntityType` enum field, with `legalEntityTypeOtherText` gated
  `requiredWhen` on the 3 values whose own printed label says "må
  spesifiseres i felt 26" (must be specified in field 26).
- **Notification type** (4 checkboxes: not registered before / changes /
  dissolution decision / deletion) → one `notificationType` enum, since
  these are mutually-exclusive purposes of a single submission.
- **Ja/Nei checkbox pairs** throughout (e.g. 3.1, 3.2, the four sub-unit
  establishment/transfer questions in 9a/9b) → single `boolean` fields
  (`true` = "Ja" ticked), per this registry's established convention.
- **11 repeating board/participant rows** (section 19, "Styre, deltakere og
  annet") → flattened to `boardMember1`...`boardMember11`, each with
  `IdNumber`/`Name`/`Role`/`ResponsibilityShare`/`SpecialInformation`/
  `Address`/`PostalCode`/`Place`. This is the largest bounded-repeat
  flattening in this registry to date (prior largest: 3 rows, `fi/vero`);
  justified because the source specimen itself prints exactly 11 rows and
  a company's board is a first-class, frequently-multi-member concept this
  schema would otherwise materially under-represent. The 7-role column
  grid (Styrets leder/Nestleder/Styremedlem/Varamedlem/Observatør/
  Komplementar/Deltaker) is confidently mapped: its own column headers are
  self-documenting printed text directly above 7 consistently-positioned
  checkboxes repeated identically across all 11 rows.
- **12 repeating signatory-printed-name slots** (section 28) →
  `signatoryPrintedName1`...`signatoryPrintedName12` (only the actual
  hand-signature is unfillable in a PDF; the "repeat in block letters"
  printed-name slot is the fillable counterpart).
- **2 contact-person rows** (section 12) → `contactPerson1`/`contactPerson2`,
  each with an `IdNumber`/`Name`/`Role`/`Address`/`PostalCode`/`Place`. Row
  2's source specimen has only 4 role checkboxes (no "Innehaver"/owner
  option), a disclosed asymmetry versus row 1's 5 — matching this registry's
  established precedent that such per-row option-set differences are
  convention, not a bug (cf. `dk/siri`'s `previousEmployment1-3` `visibleWhen`
  asymmetry, GOV-2288).
- **Sub-unit establishment/transfer** (9a/9b/10a/10b) — a two-column,
  multi-row block with generic `Text33`-`Text38`/`Dato1`-`Dato2#1`/
  `Check Box57`-`Check Box64` names — decoded via the shared "Har
  virksomheten [-startet ny aktivitet?] / [-overtatt underenhet?]" stem
  spanning both columns, cross-referenced against each row's own Ja/Nei
  checkbox x-position (leftmost = "Ja", per the printed "JaNei" reading
  order) to yield 4 boolean+date pairs (`newActivityStarted`,
  `activityDiscontinued`, `subUnitTakenOver`, `subUnitTransferred`) plus
  the previous/new owner detail blocks (10a/10b).

## Judgment calls and disclosed quirks

- **Two checkbox rows modelled with lower confidence** (disclosed in each
  field's own `description`): section 17's ("Fusjon"/merger)
  `mergerResolutionType` (3 values, from `Check Box9`/`10`/`11`) and section
  18's ("Fisjon"/demerger) `demergerDecisionType` (5 values, from `Check
  Box28`/`29`/`56`/`66` and `Boks21`). Both rows carry generic sequential
  `Btn` names with no `alternativeText` tooltip, spread across a densely
  wrapped 2-line, multi-column label that even the coordinate/reading-order
  technique used everywhere else on this form could not fully disambiguate
  with certainty (attempts to render the actual page visually to confirm,
  described above, did not succeed). The enum value sets and their
  left-to-right ordering are a best-effort inference, not a tooltip- or
  visual-confirmed mapping — flagged for a future cycle to re-verify against
  a properly rendered page image. Every other checkbox group on this form
  (including the 26-option organisational-form grid, the 7-role board
  grid, and all Ja/Nei pairs) was independently confirmed via consistent,
  verifiable x/y offset patterns and is not subject to this caveat.
- **`Postnummer7` naming duplicate** (page 2, section 10b): two independent
  widgets at different positions (postal-code column, then post-town column)
  share the identical raw AcroForm field name — an authoring
  duplicate/typo in the source specimen. Modelled as two distinct schema
  fields (`newOwnerPostalCode`, `newOwnerPlace`) by their printed position,
  disclosed in each field's own `description` rather than silently merged
  or silently treated as one shared value.
- **`Check Box84` exclusion** (page 2): a stray widget with no adjacent
  label or tooltip, positioned directly under the "Kryss av" column-header
  text above section 12's contact-person role grid — excluded as
  non-data-collecting, disclosed above under "Extraction technique" rather
  than silently dropped.
- **Section 12 vs. section 19 "at least one contact" gap**: whether a
  business fills in section 12 (owner/managing director/business
  manager/Norwegian representative/other contact — the natural fit for
  simpler entity types) or section 19's full board/participants table (the
  natural fit for AS/ASA-type companies) is entity-type-dependent, and the
  source form does not gate one on the other with a checkbox this schema
  could reference. GovSchema v0.3's `crossFieldValidation` has no "at least
  one of these two sections" primitive (only two-field `compare` or a
  `when`-gated `requireAbsent`/`requirePresent`). Neither
  `contactPerson1Name` nor `boardMember1Name` is therefore modelled as
  unconditionally `required: true`; disclosed here rather than guessed,
  matching this registry's `fi/prh` precedent for its own "postal or street
  address is mandatory" either/or gap.
- **Narrative-conditional `documents[]` entries**: `newBoardMemberConfirmationLetter`
  and `partnerConsentDeclaration` (section 28's own instructions) are each
  conditioned on whether a specific person "has not signed the notification"
  — a fact this schema has no corresponding field for (signing is physical,
  not data-captured per-signatory). Modelled with `required: false` and no
  `requiredWhen`, disclosed in each entry's own `sourceRef` rather than
  gated on an invented condition.
- **`capitalReductionUse*`/section 16 "Beløpet skal anvendes til" checkboxes**
  modelled as 5 independent `boolean` fields rather than one enum, since a
  capital reduction can plausibly be applied to more than one use
  simultaneously (e.g. partial repayment and partial fund allocation) —
  the source does not print these as mutually exclusive.
- **`crossFieldValidation`** (`capitalReductionToLessThanFrom`,
  `demergerCapitalToLessThanFrom`) each compare two optional amount fields
  that are only meaningfully populated together (a capital reduction/
  demerger scenario); this document's own mock conformance interpreter (see
  below) treats a `compare` rule as vacuously satisfied when either side is
  absent, consistent with how `fi/prh`'s own date-ordering rule behaves when
  its own compared fields are unset.

## Mock conformance run

Two scenarios were built and checked against this document's own
`required`/`requiredWhen`/`documents[].requiredWhen`/`crossFieldValidation`
grammar with a from-scratch interpreter script
(`/tmp/no-brreg-extract/gen/conformance-check.mjs`, not committed — walks
`fields[]`, `documents[]`, and `crossFieldValidation[]` directly against a
candidate data object):

1. **`sole-proprietorship-minimal-required-only.json`** — a sole
   proprietorship (`enkeltpersonforetak`) new registration, filling only the
   10 statically-`required: true` fields plus the one conditionally-required
   field this scenario triggers (`notificationEmail`, via
   `notificationType: "not_registered_before"`). **0 errors.**
2. **`limited-company-board-capital-and-audit-exemption.json`** — an AS
   (aksjeselskap) new registration exercising a 2-member board, share
   capital, an audit-exemption resolution (with its conditionally-required
   resolution date), and the `articlesOfAssociationOrPartnershipAgreement`
   conditional document. **0 errors.**

**5 mutation controls**, each expected to raise exactly 1 error, all
confirmed:

- Dropping `businessName` (a statically-required field) → 1 error
  (`MISSING REQUIRED FIELD: businessName`).
- Dropping `notificationEmail` while `notificationType` is
  `"not_registered_before"` → 1 error (`MISSING REQUIRED FIELD:
  notificationEmail`).
- Removing `articlesOfAssociationOrPartnershipAgreement` from scenario 2's
  `documents[]` list entirely (not just marking it unprovided) → 1 error
  (`MISSING REQUIRED DOCUMENT: articlesOfAssociationOrPartnershipAgreement
  (listed=false)`) — confirming the checker's `documents[]` requiredness
  path is actually exercised, not just its `fields[]` path (a
  documents-blind-spot bug this registry's tooling has hit before).
- Setting `capitalReductionToAmount` greater than
  `capitalReductionFromAmount` → 1 error (`CROSS-FIELD VIOLATION:
  capitalReductionToLessThanFrom`).
- Setting `auditExempted: true` while omitting
  `auditExemptionResolutionDate` → 1 error (`MISSING REQUIRED FIELD:
  auditExemptionResolutionDate`).

The checker script additionally walks every `visibleWhen`/`requiredWhen`/
`crossFieldValidation` field reference in the document and confirms each
resolves to a real `fields[]` entry (0 dangling references).

## Validation

`node tools/validate.mjs registry/no/brreg/samordnet-registermelding/1.0.0/schema.json`
and `node tools/validate-ajv.mjs` (same path) both pass individually and as
part of a full-registry run from a clean checkout of this branch.
