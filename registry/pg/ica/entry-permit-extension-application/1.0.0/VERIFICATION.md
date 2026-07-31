# Verification record — pg/ica/entry-permit-extension-application@1.0.0

## Candidate selection

GOV-5826 ("GovSchema Standard Research"). GOV-5812's own cycle screened
Papua New Guinea's Visa vertical and banked two live, unauthenticated,
genuinely rich AcroForm candidates without authoring either:

1. **"Application to Extend Entry Permit"** (this document's own source) —
   `ica.gov.pg/uploads/media/post_file_2430587-visa-extension-form-new-savable.pdf`
   — HTTP 200, 123,043 bytes, confirmed 62 widgets across 2 pages. A
   follow-on/renewal action for someone already in-country, not a
   first-entry application.
2. **"Application for entry permit"** (first-entry visa application) —
   mirrored at `png.or.jp/wp-content/uploads/2016/01/Application_for_entry_permit_form_new_savable.pdf`
   — HTTP 200, 180,934 bytes, confirmed 102 widgets across 4 pages.

GOV-5819 authored candidate #2, the richer first-entry form, opening the
Visa vertical outright as `pg/ica/entry-permit-application`, and explicitly
left candidate #1 (this document) as unauthored backlog for a future
cycle. This cycle authors it as a companion schema, deepening (not
opening) Papua New Guinea's Visa vertical.

## Reaching the live source

Independently re-fetched
`https://ica.gov.pg/uploads/media/post_file_2430587-visa-extension-form-new-savable.pdf`
directly via plain `curl`, twice, to confirm reproducibility:

- HTTP 200, 123,043 bytes both times — exactly matching the byte count
  GOV-5812's own banked estimate recorded.
- sha256 `884af8c3b170acf103604899c2dc506189956e2d7d06bd05ec9255496e3c2e1d`
  both times, byte-identical (`cmp` confirmed).
- No login, CAPTCHA, or WAF/JS-challenge gate — served directly
  (`content-type: application/pdf`) behind a Cloudflare edge cache
  (`cf-cache-status: HIT`, `age: 145811` seconds at fetch time).
- `Last-Modified: Wed, 30 Oct 2019` — a long-standing, stable specimen, not
  a recent upload.
- Unlike GOV-5819's own first-entry specimen (served only from a
  third-party `png.or.jp` mirror, with the direct `ica.gov.pg`/
  `immigration.gov.pg` path 404ing), this specimen is served directly from
  `ica.gov.pg` itself under its own `/uploads/media/` path — no mirror
  needed.

**Authority naming.** This cycle reuses the existing `registry/pg/ica/`
authority directory and the existing `pg/ica/passport-application` and
`pg/ica/entry-permit-application` authority block verbatim (name
"Immigration and Citizenship Authority", abbreviation "ICA", url
`ica.gov.pg`). This specimen's own page-1 letterhead likewise reads "PNG
Immigration & Citizenship Service Authority" — the same older/alternate
name `pg/ica/entry-permit-application`'s own VERIFICATION.md already
reconciled with a live web search corroborating both names refer to the
same institution; not re-litigated here.

## Extraction method

Extracted with `pdfjs-dist` (vendored install at
`/tmp/mn-passport/extract/node_modules/pdfjs-dist`, CommonJS legacy
build): a full `getAnnotations()` pass per page enumerated every AcroForm
Widget (62 total across 2 pages — page 1: 25; page 2: 37), recording each
widget's internal field name, PDF field type (`Tx`/`Btn`/`Ch`/`Sig`), rect
(bounding box) position, and (for `Btn` widgets) `checkBox`/`radioButton`
flags and `exportValue`, and (for `Ch` widgets) the `options` array; then a
`getTextContent()` pass per page, sorted by descending y then ascending x,
to recover reading order.

Two regions were independently re-checked with a raw per-glyph x/y
re-extraction (narrower y-band, no text joining) before transcribing text
into this schema's own field descriptions/documents statement:

- **The page-1 "Days:/Months/Years" requested-extension-length row.**
  Confirmed the unit labels ("Days:"/"Mo­nths"/"Years") sit at y=308.88,
  above the widget row (y=286.92–303.12), with the caption "How long do
  you wish to stay in PNG:" printed below the boxes at y=290.76 — no
  reading-order ambiguity.
- **The page-2 DECLARATION paragraph.** Confirmed internally consistent
  (no line-joining/sort-order artifact): "...true and correct, and that I
  have disclosed...". This specimen's own DECLARATION paragraph carries no
  equivalent defect to `pg/ica/entry-permit-application`'s own genuine
  source-specimen typo ("...true and correct at I have disclosed...").

`canvas` was not available in this environment (checked `/tmp/node_modules`
and every `node_modules` tree reachable from the working directory; only
`pdfjs-dist` itself was found), so no page was rendered to a PNG; every
field mapping was instead confirmed via rect-position/text-position
cross-checking, consistent with this registry's established practice — no
residual ambiguity required canvas rendering here.

## Requiredness policy

No printed required/optional signal of any kind exists anywhere on this
specimen (no asterisk, no "(required)"/"(optional)" caption, confirmed by
a full page-by-page text-layer read) — the same constraint
`pg/ica/passport-application`, `pg/ica/entry-permit-application`, and
`cd/maeci/visa-application` each faced. This schema follows the same
policy those three adopted: required only the fields necessary to identify
the applicant and the substance of the extension request (full name, date
of birth, sex, marital status, nationality, country of birth, passport
particulars, the stated reason for extension, every field in the EXISTING
ENTRY PERMIT DETAILS block, the primary in-PNG address line, the
Declaration's date, and the two background-screening yes/no questions),
and bare-optional for secondary address/phone detail, the stay-funding
checklist, and the sponsor block's own secondary contact fields, with
every genuinely conditional block gated by `requiredWhen` wherever the
form's own layout or prose states a real conditional relationship.

## Disclosed scoping decisions

1. **This specimen's own "Signature" widget is a genuine PDF `/FT /Sig`
   field, not a text field or an image-insertion pushbutton.**
   `getAnnotations()` reports `fieldType: "Sig"` for this widget (page 2,
   beside "Signature of Applicant, Parent or Guardian"), distinct from
   every other widget on the form (all `Tx`, `Btn`, or `Ch`) and distinct
   from `pg/ica/entry-permit-application`'s own two image-insertion
   pushbutton (`Btn`, `pushButton:true`) widgets. Consistent with this
   registry's established convention for a genuine `/FT /Sig` field (see
   `tz/immigration/visa-application`'s own `declarationCertification`
   precedent), it is modelled as the `applicantDeclaration` `documents[]`
   entry (category `attestation`), not a `fields[]` entry of type `file`
   or `string`.

2. **No photograph widget or box of any kind exists anywhere on this
   specimen** — a genuine content difference from both
   `pg/ica/passport-application` (which requires a photograph per its own
   printed Instruction 9) and `pg/ica/entry-permit-application` (which
   carries a real photograph-insertion pushbutton widget); confirmed by a
   full page-by-page text-layer and widget-list read finding no
   "photograph"/"photo" text or matching widget. No photograph field is
   modelled for that reason.

3. **Instruction 1 states "Where the application is in respect of a child
   under 16 years of age, both parents must sign the application", but
   only one Signature widget exists on the entire specimen** — the same
   genuine content gap `pg/ica/entry-permit-application`'s own
   VERIFICATION.md discloses for its own, structurally distinct,
   two-image-widget case. Disclosed rather than invented;
   `applicantDeclaration` models the one signature capture point that
   exists.

4. **Two directly-supplied boolean gates without a backing widget of their
   own** — `hasChangedNameOrAlias` and `hasOtherPassport` — split the same
   combined page-2 prose sentence `pg/ica/entry-permit-application`'s own
   VERIFICATION.md discloses ("If you have ever change your name, are
   known by an alias, or own another passport, please provide details:"),
   preceding the same two visually distinct subsections (PREVIOUS
   NAMES/ALIAS DETAILS: and OTHER PASSPORTS:) on this specimen. Modelled
   with the same field names and same split-gate rationale as the sibling
   schema, for cross-schema consistency.

5. **`hasOrganisationalSponsor` is a third directly-supplied gate for the
   ORGANISATIONAL SPONSOR/EMPLOYER block**, which this specimen's own
   printed heading marks "(IF APPLICABLE)" — an explicit textual
   conditional signal, stronger than `pg/ica/entry-permit-application`'s
   own inferred-only equivalent (that sibling's own heading carries no
   "(if applicable)" qualifier). `organisationalSponsorName` and
   `sponsorLotAndSectionNo` (this specimen's own PNG-convention
   street-address-equivalent field, printed as a single combined text box)
   are gated required when true; `sponsorAgentName`, `sponsorTownVillage`,
   `sponsorProvince`, `sponsorPostalAddress`, `sponsorTelephone`, and
   `sponsorEmail` remain bare-optional even within a true branch,
   consistent with this registry's policy of not over-requiring secondary
   contact detail absent its own printed signal. Unlike the sibling
   entry-permit-application's own sponsor block, this specimen's sponsor
   block carries no separate country field.

6. **The four "how will you be funding your stay in PNG" checkboxes
   (`fundedBySalary`/`fundedByOwnFunds`/`fundedByCompanySponsor`/
   `fundedByFamily`) are left entirely ungated (bare-optional, no
   `requiredWhen`)**, for the identical reason
   `pg/ica/entry-permit-application`'s own VERIFICATION.md discloses for
   its own equivalent checklist: independent, mutually non-exclusive
   checkboxes with no "tick one"/"at least one" instruction, and this
   spec's `requiredWhen` grammar cannot express an "at least one of these
   four" constraint without overreaching what the form itself states.

7. **`previousSex` and `previousMaritalStatus` are genuine `Ch`
   (combo-box) dropdown widgets**, each with a blank first option
   (`exportValue` `" "`) followed by the real choices (F/M for sex;
   Married/Never married/Divorced/De-facto/Widowed for marital status) —
   the blank option is not modelled as a valid enum value, and both enums
   are normalised to the same `MALE`/`FEMALE` and
   `MARRIED`/`NEVER_MARRIED`/`DIVORCED`/`DE_FACTO`/`WIDOWED` vocabulary
   already established by `pg/ica/entry-permit-application`'s own
   equivalent fields, for cross-schema consistency, rather than preserving
   the dropdown's own raw single-letter/differently-cased export values
   verbatim.

8. **The requested-extension-length row sits between its own printed unit
   labels and its own caption printed below the boxes** — confirmed by a
   raw per-glyph x/y re-extraction of that row (see Extraction Method
   above), ruling out any reading-order ambiguity before modelling
   `requestedExtensionDays`/`Months`/`Years` as three alternative unit
   boxes joined by "or", mirroring `pg/ica/entry-permit-application`'s own
   identical `requestedStayDays`/`Months`/`Years` pattern.

9. **This specimen's own EXISTING ENTRY PERMIT DETAILS block has no
   equivalent on `pg/ica/entry-permit-application`** (a first-entry
   application, with no existing permit to reference) —
   `entryPermitNumber`, `entryPermitExpiryDate`, `dateOfLastEntryIntoPNG`,
   `entryPermitType`, `entryPermitClass`, `entryPermitIssueDate`, and
   `entryPermitPlaceOfIssue` are unique to this extension schema, each a
   direct transcription off the applicant's own already-issued entry
   permit, and all required per this document's own required-fields
   policy above.

10. **Instruction 3 states "The completed form and the applicant's
    passport should be sent to: The Chief Migration Officer, Immigration
    and Citizenship Service Authority, PO Box 1790, BOROKO NCD, Papua New
    Guinea"**, the same wording `pg/ica/entry-permit-application`'s own
    VERIFICATION.md quotes for its own `applicantPassport` `documents[]`
    entry — modelled identically here (physical passport accompanies the
    submitted form, distinct from the `passportNumber`/
    `passportExpiryDate` `fields[]` entries that model the printed
    particulars).

11. **No application fee of any kind is printed anywhere on this
    specimen**, confirmed by a full page-by-page text-layer read for
    "fee"/currency-amount mentions finding none — no `documents[]` payment
    entry is modelled.

12. **Office-use fields (Date Received/BY/File No./Group/Receipt/ICD
    Clear/BMS Registered on/Decision/Applicant Notified on, page 1
    instruction box) carry no AcroForm widgets of any kind**, confirmed by
    cross-checking every one of these printed labels against the full
    62-widget `getAnnotations()` list finding no match — excluded in full,
    consistent with this registry's standard office-use-section
    treatment.

## Structure

Models 56 `fields[]` across 10 steps (3 of the 56 —
`hasChangedNameOrAlias`, `hasOtherPassport`, `hasOrganisationalSponsor` —
are directly-supplied gates without a backing widget; the other 53
collapse this specimen's own 61 non-signature AcroForm widgets, since 13
widgets across 5 checkbox-group/pair collapses — `sex` [2→1],
`maritalStatus` [5→1], `agreeToEmailContact` [2→1],
`hasCriminalConviction` [2→1], `hasBeenDeportedOrRefusedEntry` [2→1] —
each collapse into one enum/boolean field; the 62nd widget, the genuine
`/FT /Sig` Signature field, is modelled as the `applicantDeclaration`
`documents[]` entry, not a `fields[]` entry), 2 `documents[]` entries (the
applicant's own physical passport, and the Declaration attestation
carrying the genuine Sig-field signature capture point), and no
`crossFieldValidation` rules (this specimen's own passport-particulars
block carries only `passportNumber` and `passportExpiryDate`, with no
separate `passportIssueDate` to compare against, unlike
`pg/ica/entry-permit-application`'s own `passportExpiryNotBeforeIssue`
rule).

## Conformance

2 valid mock scenarios —
`valid-extension-minimal-no-conditional-history` (a minimal applicant
exercising the false/absent branch of every one of this schema's 5
conditional gates) and `valid-extension-full-conditional-history` (an
applicant exercising the true branch of all 5 conditional gates
simultaneously, including the full organisational-sponsor,
previous-name/alias, other-passport, criminal-conviction, and deportation
blocks) — plus 14 mutation-control fixtures (7 missing-required fixtures
spanning a string, a date, an enum, and a boolean/gate field across
different steps; 5 missing-`requiredWhen` fixtures, one per conditional
branch; an invalid-enum-value fixture against `maritalStatus`; and an
unknown-field-rejected fixture) — are committed under
`conformance/pg/ica/entry-permit-extension-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 16 fixtures: both valid scenarios at 0
errors, all 14 mutation controls each raising exactly 1 error. Validated
clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run.

## Outcome

Companion schema for Papua New Guinea's Visa vertical — deepens, does not
open (Papua New Guinea stays 3 of 6). DMV and Taxes remain confirmed dead
ends per GOV-5812's own screening; National ID and the sibling IPA Form A-2
remain open, unauthored backlog for a future cycle.
