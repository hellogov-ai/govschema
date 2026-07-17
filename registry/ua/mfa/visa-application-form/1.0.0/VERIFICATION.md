# Verification record — `ua/mfa/visa-application-form` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is **GOV-3523** (child of **GOV-3520**, "GovSchema Standard Research"),
deepening the GOV-3513 cycle's own disclosed Visa backlog candidate for
Ukraine, the registry's 73rd jurisdiction (opened via Business Formation).

## Why this candidate

GOV-3513's own cycle scouted Ukraine's remaining five verticals in parallel
while authoring the Business Formation schema and found Visa, Passport, and
Taxes all "STRONG" (directly downloadable, government-published forms) —
disclosed as open, ready-to-scope backlog rather than authored that cycle.
This issue picks up the Visa candidate specifically: the Ministry of Foreign
Affairs' own English-language Visa Application Form PDF.

## Sources examined

### Source 1 (primary `source`)

- **Authority:** Ministry of Foreign Affairs of Ukraine (MFA)
- **Document:** "VISA APPLICATION FORM", English-language edition
- **Cited URL:** `https://mfa.gov.ua/storage/app/sites/1/2018-02-02-visapp-en.pdf`
- **Actually fetched via:** `https://web.archive.org/web/2018/https://mfa.gov.ua/storage/app/sites/1/2018-02-02-visapp-en.pdf`
  (direct fetch of `mfa.gov.ua` returns HTTP 403 in this sandbox, matching
  the GOV-3513 cycle's own experience with `minjust.gov.ua`/`mfa.gov.ua`).
- **Retrieved:** 2026-07-17, HTTP 200
- **File:** 149,185 bytes,
  `sha256:0fa40d9f59cdf9115ab320c6e580cf552d14d73ca16a21c1bccce4be6a66ee74`
- **Structure confirmed:** `/Type /Pages /Count 2` (genuine 2-page PDF,
  byte-for-byte confirmed); no AcroForm widgets (a flat/print specimen, not
  a fillable form).
- **Extraction method:** each page's own `/Contents` stream object was
  located from its `Page` dictionary and `zlib`-decompressed independently
  (page 1 = object 4, page 2 = object 19), so the field/page split below is
  confirmed structurally, not inferred from reading order alone. The content
  stream's text-showing operators (`Tj`/`TJ`, with `Td`/`TD`/`T*` treated as
  line breaks) were interpreted directly, per this registry's established
  raw-stream PDF-extraction technique (`gov-form-pdf-extraction`). This
  source splits its own text across **two distinct string encodings** in
  the same content stream: literal `(...)Tj` ASCII strings for most text,
  and hex `<...>TJ` strings under a Type0/Identity-H CID-keyed font for a
  second subset of runs — including **every checkbox glyph** (rendered as
  CID `0x0191`) and several field labels (including field 16's, see below).
  The embedded font's own `/ToUnicode` CMap (PDF object 341 — a
  `bfchar`/`bfrange` table) was extracted and used to decode every hex
  string (e.g. CID `0x0191` → U+25A1 `□`; CID `0x0024` → `A`, etc., via the
  CMap's own ranges). Decoding only the literal strings and skipping the hex
  ones — the initial extraction pass this cycle ran — silently dropped
  roughly a third of the form's own visible text, including field 16's own
  label and every checkbox marker; this was caught by cross-checking the
  literal-only pass's field count against the issue's own 36-item inventory
  before treating the extraction as complete, and fixed by decoding the
  hex-string runs too.

## Field inventory (Phase 3)

Page 1 (fields 1–22) and page 2 (fields 23–36 + declaration/signature) were
independently confirmed by decompressing and reading each page's own content
stream in isolation.

| Field (schema `name`) | Label (source) | Field no. / page |
|---|---|---|
| `surname` | Surname(s) / Family name(s) | 1, p.1 |
| `surnameAtBirth` | Surname(s)/Family name(s) at birth / Previous surname(s) | 2, p.1 |
| `givenNames` | Name(s) / Given name(s) | 3, p.1 |
| `dateOfBirth` | Date of birth (day-month-year) | 4, p.1 |
| `placeOfBirth` | Place of birth | 5, p.1 |
| `countryOfBirth` | Country of birth | 6, p.1 |
| `currentNationality` | Current nationality | 7, p.1 |
| `nationalityAtBirthIfDifferent` | Nationality at birth (if different) | 7 sub-line, p.1 |
| `sex` | Sex | 8, p.1 |
| `maritalStatus` | Marital status | 9, p.1 |
| `nationalIdentityNumber` | National identity/personal number (if applicable) | 10, p.1 |
| `passportType` / `passportTypeOtherDescription` | Type of the passport document | 11, p.1 |
| `passportNumber` | Passport document's series/number | 12, p.1 |
| `passportIssueDate` | Issue date | 13, p.1 |
| `passportValidUntil` | Valid until | 14, p.1 |
| `passportIssuedBy` | Issued by / authority | 15, p.1 |
| `applicantPostalAddressAndEmail` | Applicant's postal address and email address | **16, p.1** |
| `applicantTelephoneNumbers` | Telephone number(s) including international dial codes | 17, p.1 |
| `residesInOtherCountry` + `residencePermitDetails`/`residencePermitValidFrom`/`residencePermitValidUntil` | Residence in a country other than the country of current nationality | 18, p.1 |
| `currentOccupation` | Current occupation | 19, p.1 |
| `employerOrEducationalEstablishmentDetails` | Employer's name/address/telephone/fax/email; for students, educational establishment's own | 20, p.1 |
| `purposeOfTravel` | Purpose of travel/stay | 21, p.1 |
| `numberOfEntriesRequested` | Number of entries requested | 22, p.1 |
| `hasPreviousUkrainianVisa` + `previousVisaValidFrom`/`previousVisaValidUntil` | Previous Ukrainian visas (issued during recent three years) | 23, p.2 |
| `crimeaSevastopolEntrySince2015` + 4 sub-fields | Entry to Ukraine's temporarily occupied territories of Crimea and Sevastopol after 10 June 2015 | 24, p.2 |
| `hasEntryPermitForFinalDestination` + 5 sub-fields | Entry permit (or equivalent) for the final country of destination | 25, p.2 |
| `intendedArrivalDateUkraine` | Intended date of arrival into Ukraine | 26, p.2 |
| `intendedDepartureDateUkraine` | Intended date of departure from Ukraine | 27, p.2 |
| `intendedStayFromUkraine` / `intendedStayUntilUkraine` | Intended period of stay in Ukraine | 28, p.2 |
| `residenceAddressInUkraine` | Applicant's residence address in Ukraine | 29, p.2 |
| `invitingPersonDetails` | Surname/name of the inviting person in Ukraine | 30, p.2 |
| `invitingEntityDetails` | Name of the inviting entity/organisation | 31, p.2 |
| `invitingEntityContactPersonDetails` | Surname/name of the contact person of the inviting entity/organisation | 32, p.2 |
| `expensesCoveredBy` | Expenses ... covered by | 33, p.2 |
| `minorOrIncapacitatedGuardianDetails` | Minor/incapacitated applicant's parent/legal guardian details | 34, p.2 |
| `signaturePlace` / `signatureDate` | Date and place | 35, p.2 |
| (documents[] `applicantOrGuardianSignature`) | Applicant's signature | 36, p.2 |

`documents[]`: `applicantPhoto` (the photo placeholder box, top of p.1) and
`applicantOrGuardianSignature` (an `attestation` paraphrasing the
declaration paragraph preceding field 36).

## Access notes and judgment calls

1. **Field 16, missing from this issue's own field inventory (flagged there
   as "unlabeled ... verify against the actual PDF page layout"), is
   resolved this cycle as `applicantPostalAddressAndEmail`** — "Applicant's
   postal address and email address", confirmed on page 1 immediately before
   field 17's telephone-number heading. It was one of the field labels
   encoded as hex `<...>TJ` strings under the embedded CID font (see
   Extraction method above); the issue's own prior extraction attempt had
   evidently not decoded that string subset, which is exactly why the field
   read as blank/unlabeled to it. Modelled as one combined free-text field,
   matching the single heading and single blank-line box printed on the
   source (not split into separate address/email fields, since the source
   presents them as one box).
2. **Field 7's nationality-at-birth sub-line is confirmed genuinely
   unnumbered in the source** (no printed "7b" or any other sub-number) —
   modelled as `nationalityAtBirthIfDifferent`, optional, with no
   `requiredWhen` tie to field 7 (the source states no explicit gating
   condition beyond "if different").
3. **This form's own right-column "For official use only" panel is
   confirmed, by its position in the extracted content stream, to include
   a "Submitted documents" checkbox list** (passport document / medical
   insurance policy / means to cover expenses / document confirming purpose
   of travel / other) **interleaved directly among undisputed officer-only
   fields** — Visa application no., Date of application, Visa decision,
   category (B/C/D), validity dates, day/entry counts, expedited-service
   flag, vignette number, issue/print date, passport-return date, and the
   visa officer's own signature line. This is the receiving officer's own
   receipt checklist of what was physically submitted, not an
   applicant-facing checkbox on this specific form. Per this issue's own
   instruction to model the official-use block as read-only/out-of-scope,
   it is **not** modelled as a `documents[]` entry. (A self-declared
   supporting-documents checklist published by the MFA independently of
   this form — e.g. on a consular-services page — would be a legitimate
   companion-schema candidate for a future cycle, not modelled here.)
4. **No required-field asterisks or other visual requiredness markers exist
   anywhere in this source's extracted text layer**, for any of the 36
   numbered fields — confirmed both by direct text search (no visible `*`
   character appears within any decoded string literal) and by checking that
   every raw `*` byte in the content stream is either a path-fill operator
   (`f*`) or falls inside binary image-XObject data, never inside a
   string-showing operand. Requiredness was therefore determined
   structurally: a field with no printed conditional qualifier ("if
   applicable", "if different", "please specify", or a parent yes/no gate)
   is modelled `required: true`, consistent with this being a mandatory
   consular application form where an incomplete unconditional field blocks
   processing; every field with a printed conditional qualifier is modelled
   `required: false` with `requiredWhen`/`visibleWhen` tied to its own
   parent boolean/enum.
5. **Fields 20, 29, 30, 31, 32, and 34 are each modelled as one composite
   string field**, matching the source's own single heading and single
   blank-line box per item (e.g. field 30's "Surname/name of the inviting
   person in Ukraine (postal/residence address, telephone(s) and fax
   number(s), email address(es))" is one field, not four) — the same
   discipline already used in this registry's
   `co/cancilleria/visa-application-individual` and
   `at/bmeia/schengen-visa-application` schemas for analogous composite
   fields.
6. **Field 34 (minor/incapacitated-applicant guardian details) has no
   dedicated "is the applicant a minor or incapacitated?" gating field
   printed anywhere else on the form** to key a `requiredWhen` against, so
   it is modelled `required: false` unconditionally, per its own printed
   "in cases where applicant is a minor or an incapacitated person, please
   specify ..." framing — the same treatment `at/bmeia/schengen-visa-application`
   gives its own structurally analogous field 10.
7. **`maritalStatus`'s enum collapses the source's single printed
   "divorced/separated" checkbox option into one value**
   (`divorced-or-separated`), since the source itself offers exactly one
   checkbox for both, not two.
8. **Fields 24 and 25's own special-permit/entry-permit validity dates and
   authority sub-fields are modelled `visibleWhen`, not `requiredWhen`,
   against their parent boolean** (`crimeaSevastopolEntrySince2015`,
   `hasEntryPermitForFinalDestination`), while each parent's own
   "please specify the purpose"/"type, issued by/authority" free-text
   sub-field is modelled `requiredWhen` — since not every "yes" answer
   implies a special permit or transit dates were actually issued/needed,
   but the source does explicitly instruct the applicant to specify a
   purpose whenever the parent question is answered "yes".
9. **`purposeOfTravel`'s enum values carry the source's own parenthetical
   day thresholds in their field `description`** (short-term stay: up to 90
   days; long-term stay: more than 90 days), rather than as a separate
   `validation` rule, since the 90-day threshold is not independently
   enforceable from this field alone (it depends on the applicant's own
   requested date range, which this schema does not cross-validate against
   the enum choice).

## Test run (Phase 4)

No live submission was attempted: this is Ukraine's own foreign-facing
consular application to a real, currently-operating government, and there
is no safe, reversible way to test a real submission against it — the same
reasoning already documented for this registry's other live government-visa
schemas (e.g. `id/imigrasi/evisa-visitor-visa-application`).

Instead, a small purpose-built Python interpreter for this schema's own
`required`/`requiredWhen`/`visibleWhen` (`Condition` grammar), `enum`
validation, and `crossFieldValidation` rules was run against 9 fixtures in
`conformance/ua/mfa/visa-application-form/1.0.0/`:

- `minimal-required-only-valid.json` — every conditional block left
  untriggered (all gating booleans `false`); passes with zero errors.
- `fuller-conditional-blocks-triggered-valid.json` — every conditional block
  triggered (`residesInOtherCountry`, `hasPreviousUkrainianVisa`,
  `crimeaSevastopolEntrySince2015`, `hasEntryPermitForFinalDestination` all
  `true`; `passportType` = `other`), with every field the trigger makes
  required/visible filled in; passes with zero errors.
- 7 mutation-invalid fixtures, each derived from the minimal-valid record
  with exactly one targeted violation, and each correctly rejected for
  exactly that reason: a missing unconditional required field (`surname`),
  an invalid `enum` value (`sex: "other"`), three `requiredWhen` violations
  (`residencePermitDetails`, `crimeaVisitPurpose`,
  `passportTypeOtherDescription`, each left absent while their own parent
  condition is triggered), and two `crossFieldValidation` violations
  (departure date before arrival date; passport valid-until before its own
  issue date).

Both meta-schema validators (`tools/validate.mjs` and
`tools/validate-ajv.mjs`) were run against the finished document and pass
clean (534/534 and 534/534 respectively, alongside every other document
already in the registry).
