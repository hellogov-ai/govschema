# Verification record — bz/doi/passport-application@1.0.0

## Candidate selection

GOV-5805 ("GovSchema Standard Research"). A prior cycle (GOV-5791,
2026-07-31) scouted 18 new-jurisdiction candidates in parallel and banked
Belize as one of 16 countries with at least one reachable, unauthenticated
candidate document ("Belize ePassport"), without authoring any of the 16
(Papua New Guinea's Form A-17 was judged the strongest single candidate
that cycle, and the Democratic Republic of the Congo's Visa AcroForm the
strongest of the remainder in the following cycle, GOV-5798). This cycle
re-scouted Belize specifically and confirmed its Department of Immigration
hosts a genuine, unauthenticated, recently-updated (V2, revised July 3,
2025) AcroForm passport-application PDF directly on its own official
domain — the strongest of the remaining banked candidates checked this
cycle (Suriname's individual income tax return requires portal
pre-registration since 2025-01-01 per the tax authority's own site;
Malawi's MRA taxpayer-registration form is a KYC data-collection sheet
rather than a fillable AcroForm; Guyana's own Ministry of Foreign Affairs
states no downloadable form exists for in-country applications). Opens
Belize as the registry's 103rd jurisdiction, via the Passport vertical (1
of 6).

## Reaching the live source

Target: `https://immigration.gov.bz/wp-content/uploads/2025/08/Belize-ePP-PP-Application-form_LETTER_v2_Jun_03-2025.pdf`
("Application for Passport", V2 Revised July 3, 2025, Department of
Immigration).

- Re-fetched directly: HTTP 200, `Content-Type: application/pdf`, **510,208
  bytes**, `Last-Modified: Fri, 29 Aug 2025 14:21:47 GMT`.
- sha256 of the retrieved bytes: `afb776dbf18c4a80a189d881f18be66cc2785b1653b7296406c4f57bf6d00c94`.
- No login, CAPTCHA, or WAF gate on the asset itself, nor on the hosting
  page `https://immigration.gov.bz/passport/passport-forms/` or
  `https://immigration.gov.bz/passport/passport-adult-application/`.
- The Department's own site root (`https://immigration.gov.bz`, "Belize —
  Official Immigration Website", operated under the Ministry of
  Immigration, Governance & Labour per its own page-footer text) is used as
  `authority.url` (the passport-specific landing page,
  `https://immigration.gov.bz/passport/`, specifically).
- A companion child/minor-applicant form
  (`passportForm-Children-version-1A.pdf`, "version 1A", last touched
  2020) and an older, superseded adult form
  (`passportForm-Adults-version-1.pdf`, "version 1", also 2020) are hosted
  on the same domain; this schema targets the newer, unified V2 (July 2025)
  form, which the site's own "Passport Adult Application" landing page
  links first and which supersedes both by scope (New/Renewal/Replacement/
  Lost-or-Stolen in one form) and recency.
- Confirmed mechanically via `pdfjs-dist`: the document is a genuine
  AcroForm (not a flat/print-and-fill specimen) with 3 pages, 40 form-field
  annotations on page 1, 57 on page 2, and 2 on page 3 (99 total raw
  widgets — `Btn` radio groups and `Tx` text fields), each carrying an
  internal PDF field name independently extracted via
  `page.getAnnotations()`.

## Extraction method

`pdfjs-dist` (`getAnnotations()` for the 99 raw form-field widgets;
`getTextContent()`, read per page and cross-referenced by (x, y)
coordinates against each widget's own `rect`, for the surrounding printed
labels/instructions/section headers) — no glyph-index or `canvas` rendering
workaround was needed; the embedded fonts decode cleanly to readable
English text (two harmless `pdfjs-dist` warnings, "TT: invalid function
id"/"TT: undefined function", relate to unused embedded TrueType hinting
instructions and do not affect text or field extraction). Each raw widget
was matched to its printed label and section (1–8, following the form's
own numbering) by this rect-to-label cross-reference; the form places each
field's box a small, consistent vertical offset below (rarely, as in the
signature/date lines, above) its own printed label, confirmed as a
consistent pattern across all three pages before being relied on to
disambiguate ambiguous internal field names (see below).

## Field modelling and disclosed findings

Models 72 `fields[]` across 8 steps mirroring the form's own layout (an
unnumbered "APPLICATION DETAILS" box, followed by its own numbered Sections
1–8), 1 `documents[]` entry, and 1 `crossFieldValidation` rule.

Disclosed findings, all confirmed directly against the raw annotation/text
extraction rather than assumed:

1. **No printed required/optional signal anywhere on the form.** Like
   `cd/maeci/visa-application`, this specimen marks no field as mandatory
   or optional with any printed asterisk or symbol. Every field's
   required/optional status here is a disclosed domain judgment call: core
   identity, citizenship-basis, and application-routing questions are
   modelled required; supplementary contact detail (international phone,
   email), the current address block, and free-text comments fields are
   modelled optional.
2. **The "APPLICATION DETAILS" box is printed "(for office use only)" but
   its own fields require applicant-only information the office could not
   supply unprompted** — who is submitting, why, and which document/
   processing-time/priority tier is being requested (all of which the
   form's own fee table, printed immediately above the box, prices
   differently). Modelled as applicant-facing fields regardless of the
   header's wording, consistent with the fact that these are genuine
   fillable `Btn`/`Tx` AcroForm widgets on the same specimen — the "(for
   office use only)" caption is treated as informational/administrative
   framing, not an exclusion signal, and disclosed as such rather than
   silently reinterpreted.
3. **`email` is internally named `PERMANENT ADDRESS`** on the raw AcroForm
   despite sitting directly under the printed "Email:" label and directly
   above the actual Permanent/Current Address block — a source-side
   field-naming artifact (the widget was very likely auto-named after the
   heading immediately following it during the form's original design),
   not a schema modelling choice. Disambiguated by rect position (y≈672–687,
   matching the "Email:" label's own y≈677, distinct from the Permanent
   Address block's own first row at y≈642–656).
4. **Three further internal PDF field names are generic, non-semantic
   placeholders (`Text8`, `Text9`, `Text10`, `Text11`, `Text12`)** rather
   than reused/mismatched real labels: `Text8`/`Text9` are height-in-feet/
   height-in-inches (Section 1); `Text10`/`Text11`/`Text12` are the
   spouse's date of birth/nationality/place of birth (Section 4). All five
   disambiguated by rect position against their own row's printed label,
   not by internal name.
5. **`childDateOfBirth` and `guardianPlaceOfBirth` (Section 6) carry
   internal names that concatenate two adjacent rows' printed text**
   (`Date of Birth DDMMYYYYSingle Married Divorced Widower` and `Single
   Married Divorced WidowerPlace of Birth` respectively) — the same
   naming-artifact pattern already seen in Section 2's `email` field,
   here affecting two fields at once because Section 6 stacks three short
   label rows (Relationship to Child + Date of Birth; Marital Status; Place
   of Birth + Nationality) in quick succession. Disambiguated by rect
   position against each field's own row.
6. **No checkbox field exists for the "Same as permanent address" note**
   next to the Current Address header (Section 2) — confirmed by
   enumerating every `Btn` widget on page 2 and finding none positioned
   near that note's own coordinates. The five Current Address fields
   (`currentAddressStreetVillage`/`PoBox`/`City`/`DistrictState`/`Country`)
   remain independently optional text fields, each described as leavable
   blank when identical to the Permanent Address, per the source's own
   printed instruction — not modelled as a boolean gate, since the source
   provides no corresponding control to formally flag it.
7. **Section 7's own five declaration items (A–E, "check all that apply")
   have no selectable checkbox widgets at all** — confirmed by finding only
   2 raw widgets on page 3 total, neither positioned near items A–E's own
   text. Applicants must hand-mark these on a printed/scanned copy; this
   registry cannot model a control that does not exist on the live
   AcroForm. The single free-text widget associated with that paragraph
   block (capturing whichever of item D's or item E's own blanks — a
   previously-issued-but-not-surrendered passport's number/place/date of
   issue, or an unavailable-for-presentation passport's equivalent) is
   modelled as `lostOrStolenDeclarationDetails`, disclosing that this
   schema cannot determine from the AcroForm alone which of D or E the
   applicant intends.
8. **`certificationDate`** (the date accompanying the applicant's general
   "I certify that the above particulars are correct..." declaration) is
   modelled required, since it applies to every application, even though
   the source's own layout places it directly beneath Section 5 (Lost or
   Stolen Passport) rather than in a numbered section of its own — a
   form-layout quirk, disclosed rather than silently re-sectioned into a
   step that doesn't match the source's own visual order.
9. **`submitterIdType`/`submitterIdNumber`** (Section 6, "SUBMITTER"
   column) are gated `requiredWhen submittedBy in [PARENT_LEGAL_GUARDIAN,
   AUTHORIZED_PERSON]` rather than tied only to the Parent/Legal Guardian
   path, since the "SUBMITTER" column heading applies to whoever other than
   the applicant is submitting — a disclosed scope judgment call, not
   directly printed as a rule on the form itself.
10. **One signature field is modelled; the rest, plus the photo box, are
    not.** The specimen's own "SIGNATURE BOX," the general "I certify..."
    declaration's signature line, and the Section 6 guardian-consent
    signature line's own accompanying date, plus the "PHOTO BOX (for office
    use only)," carry no corresponding data-entry widgets beyond the dates
    already modelled alongside them — consistent with this registry's
    convention of not modelling physical signature/photo capture as data
    fields where the source provides no fillable widget for it. **Section
    6's own SUBMITTER-row signature line is the one exception**: a
    genuine `Tx` widget (raw id `169R`) sits directly beneath the printed
    "Signature" label there, at the same row as the "SUBMITTER" column
    heading over `submitterIdType`/`submitterIdNumber` — confirmed by
    rect position (widget rect y≈91–106, immediately below the "Signature"
    label's own y≈113 and the blank signature rule at y≈127, and gated
    identically to `submitterIdType`/`submitterIdNumber`'s own
    `requiredWhen submittedBy in [PARENT_LEGAL_GUARDIAN,
    AUTHORIZED_PERSON]`). Modelled as `submitterSignature`, per this
    registry's convention of modelling a signature only where the source
    itself supplies a fillable widget (see e.g.
    `tt/imd/passport-application-first-adult`'s own
    `applicantSpecimenSignature` exception). The widget's own raw tooltip
    (`Signature_ID No.:`) splices this column's "Signature" label onto the
    neighboring column's "ID No.:" label — the same internal-field-naming
    artifact already disclosed at findings 3–5 above, not a compound
    field.
11. **`statutoryDeclarationOfLossOrTheft`** is modelled as the schema's
    sole `documents[]` entry, `requiredWhen replacementReason in [LOST,
    STOLEN]`, per Section 7 Item E's own text ("Unavailable for
    presentation... I have attached a Statutory Declaration attesting to
    its loss, destruction or being stolen"). No other attachment checklist
    appears anywhere on the specimen (unlike, e.g., `cd/maeci/
    visa-application`'s own Section A checklist); the citizenship
    certificate referenced in Section 3 is captured by its own number/
    place/date-of-issue text fields rather than as a separate attachment,
    since the form itself asks only for those details, not for an uploaded
    copy.

## Conformance testing

3 valid mock scenarios (a single, first-time ePassport applicant applying
in person; a married applicant replacing a lost temporary passport, with
a spouse and a police report on file; a divorced applicant renewing their
ePassport through an authorized person) plus 12 mutation-control fixtures
(a missing statically-required field; a missing `ePassportType` while
`documentType` is `EPASSPORT`; a missing `replacementReason` while
`applicationReason` is `REPLACEMENT`; a missing `titleOther` while `title`
is `OTHER`; a missing `spouseSurname` while `maritalStatus` is `MARRIED`;
a missing `dateOfLoss` while `replacementReason` is `LOST`; a missing
`relationshipToChild` while `submittedBy` is `PARENT_LEGAL_GUARDIAN`; a
missing `submitterIdType` while `submittedBy` is `AUTHORIZED_PERSON`; a
missing `submitterSignature` while `submittedBy` is `AUTHORIZED_PERSON`;
an invalid `gender` enum value; an unknown top-level field; and a
`crossFieldValidation` violation with `reportDate` before `dateOfLoss`),
committed under `conformance/bz/doi/passport-application/1.0.0/`. An
ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules, enum validation, and the crossFieldValidation rule
directly from this schema's own `fields[]`/`crossFieldValidation[]`,
discarded after use, not committed) ran all 15: all 3 valid scenarios at 0
errors, all 12 mutation controls each raising exactly 1 error, confirmed
every `requiredWhen` field reference resolves (0 dangling references), and
separately confirmed the sole `documents[].requiredWhen` gate
(`statutoryDeclarationOfLossOrTheft`) evaluates `true` only for the
lost-passport scenario and `false` for the other two. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full 704-document registry run. Registry index rebuilt
via `npm run build-index` in `tools/govschema-client/`.
