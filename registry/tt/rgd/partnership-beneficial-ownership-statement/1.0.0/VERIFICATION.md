# Verification record — tt/rgd/partnership-beneficial-ownership-statement@1.0.0

## Candidate selection and re-scoping

GOV-4589 ("GovSchema Standard Research"). CATALOG.md's Known Gaps entry 0m
banked Trinidad and Tobago's Business Formation vertical as open, STRONG
backlog since the GOV-4568 cycle, describing two candidates: the Companies
Registry's "Form 1" (`legalaffairs.gov.tt/forms/newForms/Form1_P.pdf`,
376,476 bytes) and a companion "Form 6 sole-proprietor/individual-firm
statement" (confirmed image-only). Re-examining both this cycle surfaced
that the prior characterization did not match either document's actual
content:

- **Form1_P.pdf is not a company/business-name registration form.** Its own
  header reads "THE PARTNERSHIP ACT CHAP. 81:02 [Section 20C(1),(2)] —
  FORM 1 — STATEMENT IN RESPECT OF BENEFICIAL OWNERSHIP OF A FIRM". It is a
  beneficial-ownership disclosure statement, filed pursuant to the
  Registration of Business Names Act, Chap. 82:85, by a single partner,
  corporate-partner officer, or non-partner beneficial owner of an
  already-registered firm/business name.
- **Form 6 (`Statement - Form 6.pdf`) is not the initial sole-proprietor
  registration either.** Rendering its one page to an image (it carries no
  extractable text layer, confirmed via `pdfjs-dist`'s `getTextContent()`
  returning zero items) and reading it directly shows its own printed
  title: "Statement pursuant to Section 8 of [the Registration of Business
  Names Act] of Nature of Change in the Particulars registered by an
  Individual and Date of Change" — a post-registration amendment form with
  exactly two free-text fields (business name; nature/date of change) plus
  a date and signature, not a field-rich initial-registration candidate.
- **The actual initial "Application for Registration by an Individual"
  (styled "Form No.1" in the Companies Registry's own online-services
  guidance, distinct from Form1_P.pdf above) is filed exclusively through
  `legalaffairs.gov.tt`'s login-gated CRA e-filing portal** (a personal
  account requiring a birth certificate, two photo IDs, and a selfie
  upload) — confirmed via `legalaffairs.gov.tt/registerbusiness.php` (HTTP
  200, 33,146 bytes) linking only to `PrivacyPolicy.pdf`/
  `TermsAndConditions.pdf`, no registration form itself; and via live web
  search describing the same CRA-account e-filing requirement. This is the
  same class of login-gated-e-filing dead end this registry has documented
  for other jurisdictions' core business-registration systems.

Given the core registration system is genuinely e-filing-only, and Form 6
is a thin amendment form, **Form1_P.pdf is the strongest genuine Business
Formation candidate remaining** for Trinidad and Tobago: it is a real,
currently-in-force, legally mandatory filing (the Partnership Act's
beneficial-ownership provisions took effect alongside the Companies Act's
own 14 October 2024 beneficial-ownership amendments, per the Office of the
Registrar General's own published FAQ, `RGDFAQBeneficialOwnership.pdf`,
Version 1.0, 12 February 2025 — a distinct Companies Act framework
document, fetched only to corroborate that beneficial-ownership disclosure
is a live, current TT compliance regime and that "Office of the Registrar
General" is the correct authority name, not itself a source for this
schema's fields). This schema authors Form1_P.pdf under a corrected
`authority`/`title`, and CATALOG.md's Known Gaps entry is updated
accordingly rather than left describing a mismatched candidate.

## Reaching the live source

- `https://legalaffairs.gov.tt/forms/newForms/Form1_P.pdf` (the
  non-`www` host; `https://www.legalaffairs.gov.tt/...` returns HTTP 503
  from this session's tooling, `legalaffairs.gov.tt` itself does not) —
  HTTP 200, `376,476` bytes.
- sha256: `1ee51892fce2fb54478bac65ca2e8a1ea2ca65931597ac339666320c1b801498`.
- Byte count matches the figure independently banked in CATALOG.md's Known
  Gaps entry 0m since the GOV-4568 cycle, confirming the source has not
  changed.
- PDF header `%PDF`, 4 pages (3 form pages plus a printed "Instructions"
  page); no login/CAPTCHA/WAF gate.
- `getAnnotations()` returned zero named AcroForm fields on every page — a
  flat, non-interactive PDF (printed labels beside blank underscored lines
  and ruled table cells), unlike this cycle's own sibling DMV schema
  (`tt/mowt/driving-permit-application`, a genuine AcroForm).

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item across all 4 pages, grouped into printed lines by
y-coordinate. The document's embedded fonts extracted cleanly as plain
text (no glyph-mapping workaround needed), but because it is a flat/ruled
form rather than an AcroForm, table and checkbox *structure* (which blank
belongs to which table row, whether a `□` glyph is its own selectable
option) was confirmed by additionally rendering all 4 pages to PNG via
`pdfjs-dist` + the vendored `canvas` package (`/tmp/node_modules/canvas`,
`page.render()` at 2.5x scale) and reading each page directly as an image —
the same rasterization-plus-direct-visual-read technique this registry has
used before for other non-AcroForm/scanned sources. This confirmed each
"Particulars" table (partner, corporate partner, non-partner beneficial
owner, and the "other person" disclosed under Item 3.2) is printed with
exactly **one row per person**, not a repeating grid — the form is
completed once per individual declarant about themselves (or, for a
corporate partner, once by one director/secretary on the corporation's
behalf), not once per firm covering every partner at once. This ruled out
the bounded-repeating-slot pattern this registry uses elsewhere
(e.g. `zm/pacra/company-incorporation`) as unnecessary here.

## Document structure

- **Items 1-2** (page 1): Name of Firm, Business No. — common header fields
  regardless of declarant type.
- **Item 3** (pages 1-2): completed by "a partner of the firm who is an
  individual" (per the form's own printed Instructions, Item 3). Item 3.1
  is that partner's own particulars (name, address, nationality,
  occupation, form/number/country/expiry of identification). Item 3.2 is a
  two-way beneficial-ownership-status declaration: either the partner
  confirms **I am** a beneficial owner (selecting one or more of three
  printed reasons, two of which carry their own free-text "particulars"
  disclosure), or **I am not**, in which case the partner discloses another
  person's particulars plus that other person's own "Nature of Beneficial
  Interest" (the same three reasons, minus none — this repeats sub-table
  spans pages 1-2).
- **Item 4** (page 2): completed by "a partner of the firm who is a
  corporation" (Instructions, Item 4), via one of its own directors or
  secretary. Item 4.1 covers the corporation's own particulars (corporate
  name, registered office, jurisdiction of incorporation/formation, status)
  plus the completing officer's own particulars (name, Director/Secretary
  title checkbox, identification). Item 4.2 discloses the beneficial
  owner(s) of the firm pursuant to section 20A(d)(i) of the Partnership Act
  — a single-row Name/Address/Nationality/Occupation table, with no
  "Nature of Beneficial Interest" reason sub-section (unlike Items 3.2 and
  5.2), since this is a direct disclosure rather than a self-declaration.
- **Item 5** (pages 2-3): completed by "an individual (natural person) who
  is a beneficial owner of the firm and is not a partner" (Instructions,
  Item 5). Item 5.1 is that individual's own particulars (identical shape
  to Item 3.1). Item 5.2 is a beneficial-ownership-status declaration with
  only **two** reasons printed (the "a natural person who is a partner of
  the firm" reason is absent, since Item 5 is by definition completed by a
  non-partner) — confirmed by direct visual comparison of the page 3 render
  against page 1's three-reason Item 3.2 list.
- **Signature block** (page 3, common to every declarant type): "Dated the
  ___ day of ___, ___", a signature line, and printed "Name:"/"Title:"
  labels. The form's own Instructions state the person making the
  statement signs the form, or — for a corporate partner — the director or
  secretary signs on the corporation's behalf, indicating the capacity in
  which they sign.
- **Page 4**: the printed Instructions used throughout this write-up and
  the schema's own `sourceRef`s; not itself a data-collection page.

## Scope and disclosed interpretation choices

1. **`declarantCategory` is an explicit discriminator field, not itself
   printed on the form** — the form provides three mutually exclusive
   completion paths (Items 3, 4, 5) selected by who the declarant is, with
   no single printed toggle field naming the choice. Modelled the same way
   this registry's `zm/pacra/company-incorporation` schema models
   `isBodyCorporate` for an analogous either/or the source prints as
   parallel sections rather than a single selector.
2. **One row per person, no bounded-repeating-slot pattern** — see
   "Extraction method" above; every "Particulars" table on the source
   prints exactly one row, confirmed visually across all 4 rendered pages.
3. **Item 3.2's three reason checkboxes (`individualPartnerReasonIsPartner`/
   `ReasonExercisesControl`/`ReasonOnWhoseBehalf`) are each modelled as an
   independent optional boolean**, not a single-select enum — the form's
   own instruction is "Select the option that is applicable" beside a list
   of `□` checkboxes (not a radio-button glyph), and nothing on the source
   states only one may be selected. The two reasons carrying their own
   printed "particulars of which are" blank lines
   (`individualPartnerControlParticulars`/`individualPartnerTransaction
   Particulars`) are `requiredWhen` their own reason boolean is `true`. The
   spec's `mutuallyExclusiveGroups` construct (GSP-0013 §5, "at most one of
   N") was deliberately not applied here, since the source does not state
   an at-most-one constraint; there is no construct in this spec version
   for an "at least one of N" constraint, so that weaker printed
   expectation is left as a `description` note rather than a validation
   rule, consistent with this registry's standing practice of not
   inventing enforcement the source and spec do not support.
4. **Item 5.2 reuses the same two-reason pattern as the "other person"
   branch of Item 3.2, minus the "is a partner" reason** — disclosed above
   under "Document structure"; confirmed by direct visual comparison, not
   assumed by analogy.
5. **`corporateOfficerTitle` is modelled as a two-option enum
   (`director`/`secretary`)**, matching the form's own printed two-column
   checkbox ("Director" / "Secretary") rather than free text — the same
   convention this registry applies to other explicit small-checkbox-group
   fields.
6. **`individualPartnerIdentificationType`/`corporateOfficerIdentification
   Type`/`nonPartnerOwnerIdentificationType` share one three-option enum
   vocabulary** (`national_identification_card`/`drivers_permit`/
   `passport`), taken verbatim from the printed Instructions text common to
   Items 3.1(b), 4.1(f), and 5.1(b) ("whether the national identification
   card, driver's permit or passport") — modelled as three separate field
   instances (one per declarant track) rather than one shared field, since
   each belongs to a different `requiredWhen`-gated section.
7. **`declarationDate` is modelled as a single `date` field** despite the
   source printing it in prose form ("Dated the ___ day of ___, ___" —
   day/month-name/year across three separate blanks) — the same
   simplification this registry's own `tt/mowt/driving-permit-application`
   schema applied to its `applicationDate` field (also a plain dated-line
   printed near a signature, with no distinct interactive field on either
   source). Splitting into day/month/year sub-fields was considered and
   rejected as unwarranted granularity for a single conceptual date value.
8. **`businessNumber` is `required: false` with no `requiredWhen` gate** —
   the form's own Instructions (Items 1, 2) state it is entered "if a
   business number has been assigned", a condition the source does not tie
   to any other field an applicant supplies elsewhere on this form.
9. **`classification: "pii"`** is applied to every name/address/
   identification-number field across all three declarant tracks, plus
   `signatureOfDeclarant`/`declarantName`, consistent with this registry's
   standing convention; `corporateName`/`corporateRegisteredOfficeAddress`/
   `corporateJurisdictionOfIncorporation`/`corporateStatus` are not
   classified `pii` since they describe a corporate entity, not a natural
   person, matching the same distinction `zm/pacra/company-incorporation`
   draws between its natural-person and body-corporate fields.

## Conformance

4 valid mock scenarios, one per meaningfully distinct completion path:
`valid-individual-partner-beneficial-owner` (an individual partner who is a
beneficial owner for two of the three reasons, exercising the `isPartner`
and `exercisesControl` checkboxes plus `individualPartnerControlParticulars`);
`valid-individual-partner-not-beneficial-owner` (an individual partner who
is not a beneficial owner, disclosing another person's particulars and the
`onWhoseBehalf` reason plus its particulars); `valid-corporate-partner` (a
corporate partner completed by its Secretary, with a disclosed beneficial
owner); and `valid-non-partner-beneficial-owner` (a non-partner beneficial
owner exercising the `exercisesControl` reason). Plus 14 mutation-control
fixtures — 6 covering each statically `required: true` field
(`firmName`, `declarantCategory`, `declarationDate`, `signatureOfDeclarant`,
`declarantName`, `declarantTitle`) and 8 covering the `requiredWhen`-gated
entry point of each of the three declarant tracks plus their own nested
conditional fields (`individualPartnerName`, `individualPartnerControl
Particulars`, `otherOwnerName`, `otherOwnerTransactionParticulars`,
`corporateName`, `corporateBeneficialOwnerName`, `nonPartnerOwnerName`,
`nonPartnerOwnerControlParticulars`) — plus one `invalid-unknown-field-
rejected` fixture, 19 total, committed under
`conformance/tt/rgd/partnership-beneficial-ownership-statement/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/visibleWhen rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 19: all 4 valid scenarios at 0
errors, all 14 mutation-control fixtures each raising exactly 1 error, the
unknown-field fixture correctly rejected, and 0 dangling `requiredWhen`/
`visibleWhen` field references. Validated clean with `node tools/
validate.mjs` and `node tools/validate-ajv.mjs`, individually and as part
of the full registry run.
