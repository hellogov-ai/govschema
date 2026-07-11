# Verification record — fi/migri/residence-permit-employed-person@1.0.0

## Candidate selection

This session's brief (GOV-2276, "GovSchema Standard Research") targeted
opening **Finland as GovSchema's 34th jurisdiction**, via Finland's Visa
vertical — one of GovSchema's weakest-covered verticals globally. The
target form, Migri's OLE_TY1 ("Residence permit application for an
employed person", Finnish short name "TTOL"), had already been scouted in
a prior pass as a genuine, unauthenticated, English-language fillable
AcroForm PDF, with a rough estimate of ~205 fields across 14 pages. This
session re-derived the form's structure entirely from scratch rather than
trusting that estimate.

## Source

- **Scouted URL** (from the prior pass): a shorter, un-suffixed
  `migri.fi/documents/5202425/5790178/...` path. Fetched fresh this
  session with a plain HTTP GET: **HTTP 404**. The URL as scouted no
  longer resolves.
- **Corrected, currently-live URL** (found via web search against
  `migri.fi`'s own site, which surfaced the form's full CDN path
  including its UUID suffix):
  `https://migri.fi/documents/5202425/5790178/Ty%C3%B6ntekij%C3%A4n+oleskelulupahakemus+(TTOL),+OLE_TY1+(en)/24dfac76-fe3e-43ab-b61d-94be6f1c6f76/Ty%C3%B6ntekij%C3%A4n+oleskelulupahakemus+(TTOL),+OLE_TY1+(en).pdf`.
  Fetched fresh with a plain HTTP GET: **HTTP 200**, content-type
  `application/pdf`, **477,135 bytes** — matching the prior scouting
  pass's ~477 KB estimate exactly, independently reproduced rather than
  assumed. Confirmed a genuine PDF (`%PDF-1.6` header) with an `/AcroForm`
  dictionary (a genuine, non-flattened fillable form).
- **Landing/guidance pages** (read for context, not for field
  extraction — this form is entirely self-documenting via its own
  printed section numbering 1–13): `migri.fi/en/residence-permit-for-an-employed-person`
  and `migri.fi/en/residence-permit-applications`.

## Extraction technique

`pdfjs-dist` v4 (`legacy/build/pdf.mjs`, installed fresh into a scratch
directory) was used for a three-pass technique matching this registry's
established `is/utl` / `dk/skattestyrelsen` / `dk/erst` precedent:

1. **`page.getAnnotations({ intent: "display" })` per page** — captured
   every `/Widget` annotation's `fieldName`, `fieldType` (`Tx`/`Btn`/`Ch`),
   `rect`, `checkBox`/`radioButton` flags, and export value. Result:
   exactly **10 pages** (not the scouted 14) and exactly **194 distinct
   AcroForm widgets** — 131 `Tx` text fields, 63 `Btn` checkboxes, 0 `Ch`
   choice fields. `annotation.radioButton` was `false` and
   `annotation.checkBox` was `true` for all 63 `Btn` widgets — confirming
   **none** of the checkbox groups on this form share a PDF radio-group
   parent; every checkbox is independently named and independently
   checkable, and mutual exclusivity (e.g. gender, marital status,
   passport type) is a form-design convention only, not a PDF-structural
   one. This is the same situation this registry's `at/bmeia` and
   `se/migrationsverket` schemas already document.
2. **`page.getTextContent()`**, clustered into visual lines by
   y-coordinate (3pt tolerance) and read in page order — reconstructed
   the form's full printed English text for all 10 pages independent of
   any AcroForm metadata. This form's own visible text is entirely in
   English (Migri's English-language edition of OLE_TY1); the underlying
   AcroForm field *keys* are Finnish (e.g. `Sukunimi_1_1`,
   `Etunimet_1_1`) — a deliberate cross-check against relying on the
   field-name strings as if they were English labels.
3. **Cross-reference: every widget's rect x/y range matched against the
   clustered text lines by proximity** (same line for left/right-column
   siblings; nearest line above for label-above-blank-field layouts),
   confirming each field's real label and column order (e.g. `Nainen_1_1`
   ["woman"] sits left of `Mies_1_1` ["man"] at x=201 vs x=278, matching
   the printed "☐ Female ☐ Male" order — not assumed from the Finnish
   variable names alone).

The 194 widgets were consolidated into 134 `fields[]` entries plus 6
`documents[]` entries by exhaustive, script-checked reconciliation (see
below) — not a hand count.

## Widget → field consolidation

Two categories of widget were combined into single fields, both matching
this registry's own established conventions:

- **14 printed day/month/year date splits** (`dd.mm.yyyy` across 3
  separate text widgets each — 42 widgets total): `dateOfBirth`,
  `passportDateOfIssue`, `passportDateOfExpiry`,
  `intendedMoveToFinlandDate`, `arrivalInFinlandDate`,
  `spouseDateOfBirth`, `child1DateOfBirth`, `child2DateOfBirth`,
  `child3DateOfBirth`, `payPeriodFrom`, `payPeriodTo`, `crimeDate`,
  `suspectedCrimeDate`, `signatureDate` — each combined into a single
  `type: "date"` field, per `dk/cpr/notification-of-entry`'s and
  `is/utl/other-residence-permit-application`'s own precedent for split
  date widgets, with the split disclosed in each field's `description`.
- **15 mutually-exclusive independent-checkbox groups** (42 widgets
  total): `applicationType` (2), `gender` (2), `maritalStatus` (6),
  `preferredContactLanguage` (3), `passportType` (6),
  `hasDigitalPassportPhoto` (2), `spouseGender`/`child1Gender`/
  `child2Gender`/`child3Gender` (2 each = 4 groups), `workingTimeBasis`
  (4), `paymentBasis` (3), `convictedOfCrimeAbroad`/
  `suspectedOfCrimeAbroad`/`hasOrHadEntryBan` (2 each = 3 groups) — each
  combined into a single `enum` or `boolean` field, since no PDF
  radio-group parent exists to group them structurally.

A disposable reconciliation script
(`/tmp/fi-migri-extract/reconcile.mjs`, not committed) mapped every one
of the 194 extracted widget names to exactly one of: a grouped field, a
1:1 single field, or a `documents[]` checklist widget — with **0
leftover and 0 double-counted** widget names, confirmed by set-difference
against the full widget list extracted directly from the PDF.

**Total: 134 `fields[]` + 6 `documents[]` entries.** Arithmetic: 14 date
groups (42 widgets) + 15 checkbox groups (42 widgets) = 29 grouped
fields, consuming 84 widgets; the remaining 110 widgets split into 105
singleton `fields[]` (1 widget = 1 field each) and 5 `documents[]`
checklist widgets (section 11.1's fixed attachment list, see below). 29 +
105 = 134 `fields[]`; 5 + 1 (the attestation entry with no widget of its
own, also below) = 6 `documents[]`. The script's own printed output —
`field count (groups + singles): 134`, `document checklist widgets: 5`,
`leftover widgets (0)`, `names referenced but not found in PDF (0)` — is
the authoritative source for these counts; `schema.json` was generated
directly from this mapping, not hand-transcribed from it.

## documents[]

5 of section 11.1's fixed attachment-checklist checkboxes were modelled
as `documents[]` entries (matching `is/utl/other-residence-permit-application`'s
established convention for checklist blocks) rather than invented
per-item boolean fields: `colorCopyOfPassportPages`,
`passportPhotoOrRetrievalCode`, `proofOfLegalStayInCountryOfApplication`,
`formMP1` (conditionally needed only for a first-permit applicant already
in Finland, per the form's own note), and `termsOfEmploymentForm`
(required unless the employer holds Migri's own employer certification,
per section 8's own note). A 6th `documents[]` entry,
`applicantSignatureDeclaration` (category `attestation`), quotes the
section 13 declaration paragraph verbatim; it has no corresponding
AcroForm widget of its own — the physical signature line is not a
fillable text field on this specimen, only the date/place/name-in-block-letters
fields are.

Section 11.1's 4 free-form "other attachment" rows (a checkbox + a
free-text name field per row) are, by contrast, modelled as ordinary
bounded-repeating-group `fields[]` (`otherAttachment1Included`/
`otherAttachment1Description` … `otherAttachment4...`), since they are
applicant-named, not fixed document types.

## Disclosed scope decisions

- **Section 5 ("Residence in Finland")** carries the form's own printed
  instruction "Fill in this section only if you are applying for a first
  residence permit." Since `applicationType` (first_permit /
  extended_permit) already exists as a field on this form, this gating is
  expressed structurally via `visibleWhen`/`requiredWhen` against
  `applicationType`, not left as prose alone.
- **Section 8 ("Terms of employment")** carries the form's own printed
  instruction "Fill in section 8 only if your employer has no employer
  certification." Unlike section 5, there is no corresponding "is my
  employer certified?" field anywhere on the form to gate against
  structurally, so this remains disclosed in the field
  `description`/`sourceRef` only; all section 8 fields are modelled as
  `required: true`, matching the more common case (a first-time
  applicant's employer, not yet Migri-certified).
- **Gender** is modelled as a 2-value enum (`female`/`male`) — this form
  prints no third option, unlike `is/utl/other-residence-permit-application`'s
  3-option ("Female"/"Male"/"Non binary/Other") D-110 form. Confirmed by
  reading the raw text stream at every gender checkbox row on this
  specimen (applicant, spouse, and all 3 child rows): none print a third
  option.
- **Children (section 6.2)** and **"other attachments" (section 11.1)**
  are each disclosed, bounded repeating groups — 3 rows and 4 rows
  respectively, matching the source's own printed row counts exactly —
  flattened to numbered slots (`child1`…`child3`, `otherAttachment1`…
  `otherAttachment4`) per this registry's established repeating-group
  convention, since GovSchema's flat field model (SPEC.md §6.1) has no
  array/nested-object field type.

## Mock conformance test run

Two scenarios and eight mutation/negative controls were built and checked
against this schema's own `required`/`requiredWhen`/`visibleWhen`/
`validation`/`crossFieldValidation` grammar with a disposable checker
script (`/tmp/fi-migri-extract/check_conformance.mjs`, not committed —
same technique as this registry's other recent cycles):

- **`application-minimal-extended-permit-no-dependents.json`**: a
  Finnish applicant renewing/extending their own permit (`applicationType:
  extended_permit`, so section 5 is not visible/required), with no
  spouse, no children, an ordinary passport with no digital photo, a
  monthly-paid software-developer role, and no criminal-history/entry-ban
  disclosures. **44 fields collected, 90 correctly not-applicable
  (spouse/children detail fields, section 5's first-permit-only fields,
  fringe-benefit rows, working-time/pay-basis alternatives not chosen,
  criminal/entry-ban detail fields, other-attachment rows), 0 errors.**
- **`application-full-coverage-first-permit-with-family.json`**: a
  maximal-coverage scenario — an Indian software engineer applying for a
  first residence permit (`applicationType: first_permit`, activating
  section 5) to work for a Finnish employer, with a spouse and 2 children
  applying simultaneously, a digital passport photo, 2 fringe-benefit
  rows, a disclosed minor foreign conviction (all 4 conditional
  crime-detail fields populated), and 2 "other attachment" rows.
  **96 fields collected, 38 correctly not-applicable (the 3rd child slot,
  the suspected-crime and entry-ban detail fields since those questions
  were answered "no", the 3rd fringe-benefit row, the 2 unused
  working-time/pay-basis alternatives and their conditional detail
  fields, otherAttachment rows 3–4), 0 errors.**
- **Eight mutation/negative controls**, each derived from the
  full-coverage scenario with exactly one defect introduced, each
  correctly raising exactly one error:
  1. Removing the required `lastName` → `missing-required`.
  2. Setting `gender` to `"unspecified"` (not in its 2-option `enum`) →
     `enum-violation`.
  3. Setting `monthlyPayRate` to `-500` (violates `validation.minimum: 0`)
     → `minimum-violation`.
  4. Setting `noSpouse` to `false` while removing `spouseLastName` →
     `missing-required` (`requiredWhen` conditional-required violation).
  5. Setting `paymentBasis` to `seasonal_piece_project` with
     `payPeriodFrom: "2026-06-01"` and `payPeriodTo: "2026-01-01"`
     (return before departure) → `cross-field-violation` on
     `payPeriodToNotBeforePayPeriodFrom` — confirming
     `crossFieldValidation` actually fires.
  6. Removing the required `signatureNameInBlockLetters` →
     `missing-required`.
  7. Setting `otherAttachment1Included` to `true` while removing
     `otherAttachment1Description` → `missing-required` (`requiredWhen`
     conditional-required violation).
  8. Setting `lastName` to a 300-character string (violates
     `validation.maxLength: 200`) → `maxLength-violation`.
  9. Removing `termsOfEmploymentForm` from `documents` (violates a
     `documents[].required: true` entry with no `requiredWhen`) →
     `missing-required-document`.

**Correction (independent re-check, review gate):** the disposable
checker script above only checked `fields[]` against
`required`/`requiredWhen`/`visibleWhen`/`validation`/`crossFieldValidation`
— it never checked `documents[]` requiredness, and neither committed
scenario originally carried a `documents` key at all. Both scenarios were
therefore silently missing all 5 of this schema's unconditionally-required
`documents[]` entries (`colorCopyOfPassportPages`,
`passportPhotoOrRetrievalCode`, `proofOfLegalStayInCountryOfApplication`,
`termsOfEmploymentForm`, `applicantSignatureDeclaration`), which a
from-scratch re-check (extending the checker to also evaluate
`documents[].required`/`requiredWhen`, matching this registry's own
established `documents`-array convention — e.g. `at/gewerbebehoerde`,
`dk/um/application-for-danish-passport`) confirmed by raising exactly 5
`missing-required-document` errors on each scenario as originally
committed. Both scenario files were corrected to include a `documents`
array marking these 5 entries `provided: true` (mutation control 9 above
added to cover the gap going forward); the re-check now confirms 0 errors
on both scenarios with the corrected fixtures, and field collection counts
(44/90 and 96/38) are unchanged. `formMP1`, the schema's one optional
`documents[]` entry, is intentionally omitted from both scenarios.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` — both pass,
individually and as part of the full 348-document registry run (347
pre-existing + this one; no other document affected).

## Pre-PR re-verification

The corrected PDF URL was re-fetched a final time immediately before
finalizing this record with `curl -sSL -o /dev/null -w "%{http_code}
%{size_download}"`, confirming HTTP 200 and 477,135 bytes remain stable
and reproducible.
