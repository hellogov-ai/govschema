# Verification record — no/brreg/samordnet-registermelding@1.0.0

## Candidate selection

This session's brief (GOV-2316, "GovSchema Standard Research") opens Norway
as the registry's 35th jurisdiction, via its Business Formation vertical.
Norway had been named as a parallel Nordic scouting candidate across at
least two prior cycles (GOV-2276, which opened Finland via a three-way
Norway/Finland/Belgium scouting pass, and GOV-2292). This cycle picked up
Brønnøysundregistrene's own central, multi-purpose coordinated
registration form (BR-1010BM, "Samordnet registermelding") directly, since
it is Norway's single shared intake for registering a business or company
with the Central Coordinating Register for Legal Entities
(Enhetsregisteret), the Register of Business Enterprises
(Foretaksregisteret), NAV's Employer/Employee Register, Statistics
Norway's Register of Business and Enterprises, the Register of
Foundations, and the Directorate of Taxes' register of non-personal
taxpayers, across most Norwegian legal entity types in one document.

## Source

- **URL:** `https://www.brreg.no/wp-content/uploads/BR-1010BM.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `2,313,349` bytes — matching this issue's own pre-recorded figure
  exactly. Confirmed a genuine PDF (`%PDF-1.6` header), 6 pages, no
  login/CAPTCHA/WAF gate anywhere on `brreg.no`.
- **Edition:** the form's own footer prints "BR – 1010B - 2026" on every
  page — the currently live 2026 edition as of this cycle.

## Extraction technique

`pdfjs-dist` v4 (`legacy/build/pdf.mjs`, this package version only ships
ESM builds — no `legacy/build/pdf.js` CJS entry point existed in the
locally installed version, so a plain `import` in a `.mjs` script was used
rather than the `require()`-in-`.cjs` pattern some prior cycles needed)
was used for a two-pass extraction:

1. **Per-page `getAnnotations({ intent: 'display' })`** resolved every
   `/Widget` annotation's `fieldName`, `fieldType` (`Tx`/`Btn`),
   `alternativeText` (tooltip), `exportValue`, and `rect` (bounding box) —
   **380 raw widgets across 6 pages** (207 `Tx`, 173 `Btn`, 0 `Ch`).
2. **A separate `doc.getFieldObjects()` cross-check** resolved **386
   distinct field names** — matching this issue's own pre-recorded figure
   exactly. The 386-vs-380 gap reconciles exactly: 7 of the 386 names are
   non-terminal radio-group **parent** names whose child widgets are
   separately, individually named (e.g. parent name `"Check Box70"` has
   kid widgets named `"Check Box70.0"`, `".1"`, `".4"`, each already
   counted among the 380 raw widgets) — confirmed by checking each of the
   7 names absent from the widget list against a prefix search of the
   widget list's own field names. The remaining 379 distinct widget-linked
   names include exactly **one non-unique name**: `"Postnummer7"` is
   assigned, apparently by a PDF-authoring error, to **two different
   widgets on the same row** (page 2) — a narrow ~47pt-wide box and a
   wide ~213pt-wide box. 379 (widget-linked names) + 7 (parent-only
   names) = 386, reconciling the getFieldObjects() count exactly.
3. **Per-page `getTextContent()`**, extracted twice — first as
   y-coordinate-clustered lines (a coarse first pass), then re-extracted
   with **per-item x-coordinates preserved** after the coarse pass was
   found to merge adjacent same-line column headers into a single
   ambiguous string (see the `headOfficeMobileNumber` quirk below) — used
   to identify section headings and to decode the many checkbox groups
   whose own AcroForm names are generic (`"Check Box30"`, `"Boks35"`,
   etc.) with no `alternativeText` tooltip, by cross-referencing each
   checkbox's `rect` x/y position against the nearest printed label text
   at the matching x-coordinate.

Every one of the 380 widgets was mapped to exactly one of: a `fields[]`
entry, a disclosed out-of-scope deferred section, or a confirmed
non-rendering artifact, via a disposable reconciliation script
(`/tmp/no-brreg-extract/reconcile.mjs`, not committed) that asserts zero
unmapped and zero double-mapped widgets. The script confirmed:

- **318 widgets → 191 `fields[]` entries**
- **61 widgets → deferred, out-of-scope sections** (see Scope below)
- **1 widget → excluded as a non-rendering artifact**: `"Check Box84"`
  has a zero-height rect (`[499,170,514,170]`, top y equals bottom y),
  rendering no visible checkbox anywhere on the page — excluded as
  non-data-collecting, the same class of exclusion this registry's
  `fi/prh` precedent applied to page-navigation/utility controls, though
  here the artifact is a broken/invisible widget rather than a chrome
  button.
- **380 = 318 + 61 + 1, 0 unmapped, 0 double-mapped.**

This document has **0 `documents[]` entries**: unlike this registry's
`fi/prh` precedent (which modelled a 7-checkbox "Enclosures" appendix-form
checklist as `documents[]`), this specimen has no fillable
enclosure-checklist widget group naming specific attachments. The form's
own final-page note ("Husk de nødvendige vedleggene. Se veiledningen for
oversikt." — "Remember the necessary attachments. See the guidance for an
overview.") points to external, non-form-embedded guidance instead. This
is a disclosed structural fact, not an oversight — matching this
registry's `fi/vero/50a-earned-income-and-deductions` precedent's own
zero-`documents[]` rationale.

## Scope: what this document models, and what it deliberately defers

This coordinated form is Brønnøysundregistrene's single shared intake for
many Norwegian legal entity types at once: sole proprietorship
(enkeltpersonforetak), general partnership with joint or divided liability
(ANS/DA), limited partnership (KS), private/public limited company
(AS/ASA), foreign branch (Norskregistrert utenlandsk foretak, NUF),
foundation (stiftelse), cooperative (samvirkeforetak, SA), savings bank,
and 18 further named types, selected via one 26-value checkbox grid
(field 8). Per this cycle's brief, and consistent with this registry's
precedent of modelling a coordinated form's core plus its most common
entity type in full rather than exhaustively branching on every entity
type (matching e.g. ZA SARS ITR14's and FI Vero 50A's own precedent),
this schema models:

- **The entity-type-independent core** (sections 1-13): name/organisation
  number, notification type, other-register registration, four address
  blocks (head office, postal, sub-unit location, submitter),
  establishment/sub-unit-transfer dates and parties, activity description,
  two contact-person slots, and written-language preference. These apply
  identically regardless of which of the 26 legal entity types is
  selected.
- **The governance sections that apply broadly across most registered
  entity types** (sections 19, 20, 21, 22, 23, 25, 26, 27, 28): the
  11-slot board/participants table, signature-right arrangement,
  procuration arrangement, auditor, accountant, corporate-group flags,
  free-text remarks, notification addresses, and the final 12-slot
  signatory block. These are the sections a private limited company (AS)
  — Norway's most common formally-registered business type that uses
  this form's fuller governance apparatus — actually needs to complete,
  and they are not restricted to AS alone (associations, foundations, and
  cooperatives all need board/signature/auditor information too).

In total: **191 `fields[]` entries**.

This schema explicitly does **not** model six entity-type- or
event-specific sub-sections, disclosed here as deferred,
out-of-scope companion-schedule candidates for a future cycle rather than
silently dropped:

1. **Section 14, Vedtekter/selskapsavtale** (articles of
   association/partnership agreement) — 2 widgets. Relevant only once a
   company/foundation is registered, or is to be registered, in the
   Register of Business Enterprises and/or Register of Foundations.
2. **Section 15, Kapital** (share/partnership capital in a limited
   company, public limited company, limited partnership, or foundation)
   — 7 widgets. AS/ASA/KS/foundation-specific.
3. **Section 16, Vedtak om kapitalnedsettelse** (capital reduction
   decision) — 15 widgets. AS/ASA-specific, and event-specific (only
   relevant on an actual capital reduction).
4. **Section 17, Fusjon** (merger) — 11 widgets. Event-specific.
5. **Section 18, Fisjon** (demerger) — 16 widgets. Event-specific.
6. **Section 24, Navn og adresse med mer for virksomheten i Norge** (name
   and address etc. for the business in Norway) — 10 widgets. Applies
   only to a Norwegian-registered foreign enterprise (NUF).

Together these 6 sections account for **61 of the specimen's 380 widgets
(16%)**. The form's own page-3 instruction states plainly that a sole
proprietorship skips fields 14-20 entirely ("Enkeltpersonforetak skal
ikke fylle ut feltene 14-20" — "Sole proprietorships shall not fill in
fields 14-20"), underscoring that these deferred sections are genuinely
entity-type-gated, not universal, structure — consistent with this
task's own instruction not to model every entity type's full detail
disproportionately.

## Field consolidation

- **Notification type** (4 independent checkboxes: business not
  registered before / changes-or-new-information / dissolution decision /
  deletion of business) → one `notificationType` enum field.
- **Legal entity type** (26 independent checkboxes in a 3-column grid) →
  one `legalEntityType` enum field, `requiredWhen: notificationType equals
  "new_business"` per the source's own "fylles bare ut ved melding om
  virksomhet som ikke er registrert tidligere" instruction.
- **Register-in-Foretaksregisteret?** and **has/expects
  employees?** (2 independent Yes/No checkbox pairs) → two boolean
  fields.
- **9a/9b establishment/transfer/discontinuation questions** (4
  independent Yes/No checkbox pairs, each paired with its own split
  date/year widgets) → 4 boolean fields plus 4 merged ISO-date fields,
  each `requiredWhen` its own boolean equals `true`.
- **Contact-person role** (5-checkbox group for slot 1: Innehaver/Daglig
  leder/Forretningsfører/Norsk representant/Annen kontaktperson; 4-checkbox
  group for slot 2, missing the Innehaver column) → two enum fields,
  `contactPerson1Role` (5 values) and `contactPerson2Role` (4 values),
  the asymmetry disclosed in `contactPerson2Role`'s own description
  rather than silently normalised to 5 values for both.
- **Board/participant role** (7-checkbox group per row: Styrets
  leder/Nestleder/Styremedlem/Varamedlem/Observatør/Komplementar/Deltaker)
  → one `boardMemberNRole` enum field per slot, flattened across the
  source's own printed **11-row** bounded repeating table (not 10 — see
  the disclosed correction below) into `boardMember1`..`boardMember11`
  numbered slots, matching this registry's established bounded
  repeating-group flattening convention (the source form's own printed
  bound, not an invented cap).
- **Signature-right arrangement** (11 independent "standard alternative"
  checkboxes) → one `signatureArrangement` enum field, plus a free-text
  `otherSignatureProvision` field for a non-standard arrangement.
- **Procuration arrangement** (2 independent checkboxes) → one
  `procuraArrangement` enum field, plus a free-text
  `otherProcuraProvision` field.
- **Signatory printed name** (12 independent block-letter text widgets,
  "Gjenta med blokkbokstaver") → flattened to `signatoryPrintedName1`
  through `signatoryPrintedName12`, matching the source form's own
  printed 12-slot bound. Only `signatoryPrintedName1` is modelled
  `required: true`, since at least one signatory is always needed but
  GovSchema v0.3 has no direct "at least one of N slots" primitive.
- **Split date/year widgets** throughout (establishment date, activity
  change date, audit-waiver decision date, signature date, and each of
  the four 9a/9b sub-question dates) were merged into single ISO `date`
  fields per this registry's established split-widget consolidation
  convention.

## Judgment calls and disclosed quirks

- **The `Postnummer7` shared-name defect**: two structurally distinct
  widgets on the same printed row (the "10b. Overdragelse av underenhet
  til" — transfer-to-party — address block) share the identical AcroForm
  field name `"Postnummer7"`, one a narrow ~47pt box consistent with a
  postal code and the other a ~213pt-wide box consistent with a place
  name. Modelled as two distinct fields, `transferToPostalCode` and
  `transferToTown`, disambiguated by widget geometry rather than by name
  (since the name alone is ambiguous), with the naming defect disclosed
  in each field's own `description` rather than silently merged into one
  field or silently treated as though uniquely named.
- **The 11-row, not 10-row, board/participants table**: this cycle's own
  first extraction pass assumed a 10-row table, based on the visible
  `Ansvarsdel`/`Spesielle opplysninger` numbering reaching only as high as
  suffix 10 in a quick scan. The disposable reconciliation script's own
  zero-unmapped-widgets assertion caught 2 unmapped widgets on that first
  pass — an 11th row (`Fødselsnummer23`/`Navn23`/`Adresse23`/`Postnr23`/
  `Poststed23`, itself using a *different* numeric suffix convention than
  the rest of that row's own `Ansvarsdel11`/`Spesielle opplysninger11`
  pair) — corrected before finalizing. Flagged here as a concrete
  illustration of why this registry's own "assert zero unmapped, don't
  eyeball a widget count" discipline matters in practice, not just in
  principle.
- **`legalEntityType`'s own "must be specified in field 26" notes**: four
  of the 26 legal-entity-type values (`public_sector`,
  `european_company_or_grouping`, `other_legal_person`, and — per this
  specimen's own inconsistent print layout — ambiguously,
  `pension_fund`) carry a printed "(må spesifiseres i felt 26)" note
  beside them on the source form. Field 26 (`otherRemarks`) is in scope,
  so this dependency is satisfiable, but it is not mechanically enforced
  via `requiredWhen`, since GovSchema v0.3 has no direct way to make one
  field's content conditionally required based on a sibling enum field's
  *specific value* without inventing a synthetic boolean the source does
  not itself print. For `pension_fund` specifically, this cycle's own
  x-coordinate-based text extraction could not confirm with full
  confidence whether the "(må spesifiseres i felt 26)" note is actually
  attached to that value or to its neighbouring column entry — disclosed
  here as an extraction-fidelity gap rather than silently resolved either
  way.
- **`headOfficeMobileNumber`'s unlabelled widget**: this widget's own
  AcroForm name is a generic `"Text14"` with no `alternativeText`
  tooltip, unlike its neighbouring fields. Its identity as the mobile
  telephone number field was inferred from its x-coordinate position
  beneath the printed column header "Mobiltelefonnummer Telefonnummer
  Hjemmeside" — confirmed only after a dedicated per-item x-coordinate
  re-extraction, since this cycle's first, coarser y-only line-clustering
  pass had merged the three header words into a single ambiguous string
  ("Mobiltelefonnummer Telefonnummer Hjemmeside" read as one run, in an
  order that did not match the widgets' own left-to-right positions).
  Disclosed as a labelling gap in the source, not a structural fact
  silently assumed.
- **`contactPerson2Role` has 4 options, not 5**: the second contact-person
  row's own checkbox group has no "Innehaver" (owner) column on the
  specimen itself, consistent with sole ownership being nameable only
  once (in `contactPerson1Role`). Disclosed in the field's own
  description rather than silently normalised to match slot 1.
- **Employee board representation** ("merk disse med A for «valgt av de
  ansatte»" — mark these with "A" for "elected by the employees") is a
  hand-annotation convention described in the form's own instructions,
  with no corresponding fillable widget on this specimen. Not modelled as
  schema-level structure; disclosed in each `boardMemberNRole`'s own
  description rather than silently ignored.
- **No ink-signature widgets**: the auditor's and accountant's own printed
  "Jeg bekrefter ... (underskrift)" ("I confirm ... (signature)") lines,
  and the final section 28 "Underskrift" line itself, require a physical
  ink signature with no corresponding fillable widget anywhere on this
  specimen (the form must be printed and hand-signed; the source states
  an original signature is required in all cases and that a copy or
  digital signature is not accepted). Only the adjoining printed-name
  repetition ("Gjenta med blokkbokstaver") is modelled, matching this
  registry's `fi/prh` `signatureAndPrintedName` precedent for the same
  class of gap.

## Mock conformance run

Two scenarios were built and checked against this schema's own
`required`/`requiredWhen`/`crossFieldValidation` grammar with a
from-scratch interpreter script (`/tmp/no-brreg-extract/conformance-check.mjs`,
not committed — walks `fields[]`, `documents[]`, and
`crossFieldValidation[]` directly against a candidate data object):

1. **`minimal-sole-proprietorship-new-registration.json`** — a sole
   proprietorship's first-time registration, exercising only the
   statically-required fields (`legalName`, `notificationType`,
   `headOfficeStreetAddress`/`PostalCode`/`Town`, `activityDescription`,
   `signatureDate`, `signatoryPrintedName1`) plus `legalEntityType` and
   both notification-address fields, each conditionally required by
   `notificationType equals "new_business"`. **0 errors.**
2. **`private-limited-company-full-governance.json`** — a private
   limited company (AS)'s change-of-registration notification, exercising
   `organisationNumber` (required for a non-new-business notification via
   `notificationType in [...]`), a 3-member board with 3 distinct roles,
   a signature arrangement, an auditor, an accountant, and both
   corporate-group flags. **0 errors.**

**4 mutation controls**, each expected to raise exactly 1 error, all
confirmed:

- Dropping `legalName` (a statically-required field) from scenario 1 →
  1 error (`MISSING REQUIRED FIELD: legalName`).
- Setting `notificationType: "new_business"` (scenario 1) while omitting
  `legalEntityType` → 1 error (`MISSING REQUIRED FIELD: legalEntityType`).
- Setting `notificationType: "new_business"` (scenario 1) while omitting
  `notificationEmail` → 1 error (`MISSING REQUIRED FIELD:
  notificationEmail`).
- Setting `establishmentDate` later than `signatureDate` (scenario 2) →
  1 error (`CROSS-FIELD VIOLATION:
  signatureDateNotBeforeEstablishmentDate`).

The checker script additionally walks every `requiredWhen`/
`crossFieldValidation` field reference in the document and confirms each
resolves to a real `fields[]` entry (0 dangling references). This
document has 0 `documents[]` entries, so no `documents[]`-requiredness
path applies here — see the Extraction technique section above for why
that is a disclosed structural fact about the source form, not a gap in
this checker.

## Validation

`node tools/validate.mjs registry/no/brreg/samordnet-registermelding/1.0.0/schema.json`
and `node tools/validate-ajv.mjs` (same path) both pass individually and
as part of a full-registry run from a clean checkout of this branch (353
documents total). `node tools/verify-sources.mjs` confirms this
document's own `source.url` resolves.
