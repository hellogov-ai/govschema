# Verification record — `gh/nia/ghana-card-application-form-1a` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is a GovSchema Standard Research cycle. It opens **Ghana as this
registry's 41st jurisdiction**, via its **National ID & Civic Documents
vertical (1 of 6)**, sourced from NIA's "Ghana Card Application Form 1-A"
("Form One (regulation 3(1))", "NATIONAL IDENTITY CARD APPLICATION FORM").

## Fetch record

- **URL:** `https://nia.gov.gh/wp-content/uploads/Ghana-Card-Application-Form-Form-1-A.pdf`
- Fetched directly via `curl`: **HTTP 200**, `Content-Type: application/pdf`,
  **498,907 bytes**, `Last-Modified: Mon, 16 Feb 2026 12:10:31 GMT`,
  `sha256: 3f401681db2e6d1f39fcc16b78c6b69a71d81a43075789513de29d00593bc5fa`.
- Internal PDF metadata (via `pdfjs-dist getMetadata()`): `PDFFormatVersion:
  1.6`, `Producer: Corel PDF Engine Version 17.0.0.491`,
  `CreationDate: D:20180124110510Z`, `ModDate: D:20181127164114Z`,
  `Title: NEW NIA FORM FINAL 102017 draft.cdr` — i.e. the document's own
  content dates to 2018, even though the web server's `Last-Modified` header
  reflects a 2026 re-upload/re-serve.
- Independently confirmed via a fresh fetch of NIA's own current Forms page
  (`https://nia.gov.gh/forms/`, HTTP 200) that this exact file is still
  directly linked today (`href="https://nia.gov.gh/wp-content/uploads/Ghana-Card-Application-Form-Form-1-A.pdf"`
  appears verbatim in the page's HTML) — i.e. this is the live, currently
  published specimen, not a stale orphaned upload.

### Pre-scouting claim re-verification: the `fims.org.gh` mirror did NOT reproduce

This cycle's pre-scouting note claimed the form was "cross-confirmed
byte-identical against an independent third-party mirror (fims.org.gh)".
Re-verifying this from scratch found the claim does not hold:

- `fims.org.gh` is the **Foreigners Identity Management System**'s own site —
  a *different* NIA-adjacent process (the **Non-Citizen Ghana Card**), not a
  mirror of Form 1-A. It hosts its own, materially different application
  form at `https://fims.org.gh/wp-content/uploads/Application-Form.pdf` and
  `https://fims.org.gh/wp-content/uploads/application_form.pdf` (both HTTP
  200, confirmed live this cycle).
- No file exists at the scouted path
  (`fims.org.gh/wp-content/uploads/Ghana-Card-Application-Form-Form-1-A.pdf`
  returns **HTTP 404**, confirmed this cycle).
- A genuine independent third-party mirror was found instead:
  `https://www.gtlegalafrica.com/wp-content/uploads/2022/07/NIA-APPLICATION-FORM.pdf`
  (HTTP 200, **2,046,733 bytes**,
  `sha256: d16aa57e615e18fb2fc9857efee3a935dfd85246cd739012874362167654d636`).
  `pdfjs-dist` extraction of this mirror shows `PDFFormatVersion: 1.3`,
  `Producer: IJ Scan Utility`, `Creator: Canon SC1011`,
  `IsAcroFormPresent: false`, **0 AcroForm widgets** — a flat *scanned* copy
  of the same 2-page "Form One (regulation 3(1))" specimen (same title, same
  section layout, confirmed by inspecting its own extracted text), not a
  fillable one. This corroborates the form's content/layout independently,
  but not its AcroForm structure — that structural claim rests on NIA's own
  hosted copy alone, which is reasonable since it is NIA's own currently
  linked file.
- This is disclosed as a correction to the pre-scouting note, not silently
  carried forward: NIA's own live Forms-page link is materially stronger
  provenance than any third-party mirror would have been anyway.

## Structural extraction (own re-derivation)

`pdfjs-dist` (`getDocument().promise`, `page.getAnnotations({intent:
"display"})`, `doc.getFieldObjects()`) against NIA's own file confirms:

- **2 pages**, `IsAcroFormPresent: true`, `IsXFAPresent: false`.
- **129 real `Widget` annotations** total — **84 on page 1**, **45 on
  page 2** — `getFieldObjects()` reports **127** distinct field-name keys
  (two field names, `Nationality` and `1`, are each reused across multiple
  rows/widgets, which is why the widget count (129) exceeds the distinct
  field-name count (127) despite each widget being a materially distinct
  printed question).
- **22 widgets are `Btn`** (checkbox/radio): 4 independent checkboxes for
  "TYPE OF APPLICANT", 4 for "TYPE OF REQUEST", 5 for "Marital Status", 5 for
  "Level of Education" (all `radioButton: false`, i.e. technically
  independent checkboxes rather than a native radio group, but each group is
  printed as a single mark-one-of-N choice), plus 2 genuine `radioButton:
  true` pairs ("Is Father alive", "Is Mother alive").
- The remaining **107 widgets are `Tx`** (text), one of which
  (`Signature1_es_:signer:signature`) is the applicant's signature/thumbprint
  capture box.
- Every widget's `rect` was correlated against `page.getTextContent()` items
  at matching y-coordinate to resolve its printed label — necessary because,
  unlike Kenya's Reg. 136A (all-generic `TextField1[N]` names), most of this
  form's own internal field names ARE human-readable (`SURNAME`,
  `FORENAMES`, `OCCUPATION`, etc.), but several are ambiguous or reused
  without coordinate correlation: five repeated `Village`/`Country`/
  `District` widget triples (Place of Birth, Hometown, Residential Address,
  Father's/Mother's Home Town — each widget in fact carries two stacked
  printed labels, e.g. "Village" over "Town", used depending on whether the
  location is domestic or foreign) and 14 bare numeric-named boxes (`"1"`
  through `"14"`) under "LANGUAGE(S) SPOKEN" that carry no semantic field
  name at all.

### Full widget accounting (all 129 confirmed, none left unexplained)

- **103 widgets map 1:1** to a `fields[]` entry.
- **22 widgets (the 6 checkbox/radio groups) consolidate to 6 enum/boolean
  fields** (`applicantType`, `requestType`, `maritalStatus`,
  `levelOfEducation`, `isFatherAlive`, `isMotherAlive`) — matching this
  registry's established convention of modelling a printed mark-one-of-N
  checkbox group as a single `enum` field rather than exploding it into N
  independent booleans plus an `exclusivityGroups` entry (cf.
  `ar/dnrpa/solicitud-tipo-08-transferencia-automotor`'s civil-status
  checkbox group). `exclusivityGroups` (spec §8.4) only constrains "at most
  one of these booleans is true" — it does not itself express "the source
  form only ever means exactly one of these", so an `enum` is the more
  faithful and more directly validated encoding here.
- **4 widgets are deliberately excluded** from `fields[]`:
  - `M` (labelled "MRW Number*") — an NIA-staff/administrative reference
    number, printed in the unnumbered "Registration" header block alongside
    the interviewer's own details, not applicant-supplied data.
  - `Interviewer` (labelled "Interviewer NID No.*") — the interviewing NIA
    officer's own national ID number.
  - `Centre Number` (labelled "Centre Number*") — the registration centre's
    own identifier.
  - `Signature1_es_:signer:signature` — the applicant's raw
    signature/thumbprint capture widget, excluded per this registry's
    established practice of not modelling raw signature/thumbprint capture
    as a data field (cf. `ke/nrb/application-for-identity-card`,
    `se/polisen/medgivande-pass-nationellt-id-kort-minderarig`).
- Two further printed areas — "Printing Sequence Number [ ]" and
  "Interviewer's Signature" (both on page 2, beside the applicant's own
  signature block) — carry **no widget at all**, confirmed independently via
  `getAnnotations()` rather than inferred from their position, and are
  therefore genuinely out of scope rather than merely deprioritized.

`22 (consolidated) + 4 (excluded) + 103 (1:1) = 129` — every widget is
accounted for.

## Field inventory and disclosed judgment calls

- **The five `Village`/`Town`, `Region`/`Country`, `District`/`State`
  widget triples** (Place of Birth, Hometown, Residential Address, Father's
  Home Town, Mother's Home Town) are each modelled as one field per widget
  position (e.g. `hometownVillageOrTown`, `hometownRegionOrCountry`,
  `hometownDistrictOrState`), disclosing in each field's own `description`
  that the source prints two stacked labels on the same widget depending on
  whether the location is domestic or foreign — rather than inventing two
  separate fields the source provides only one widget for.
- **Every "Nationality"-labelled field, plus the `RegionOrCountry` half of
  each triple above, is constrained to `maxLength: 3` with pattern
  `^[A-Z]{3}$`.** This is not a printed instruction — the form names no code
  standard — but every one of these widgets' own `maxLen` (per
  `getAnnotations()`) is exactly 3, physically too short for a spelled-out
  country/region name. Modelled as a short code (ISO 3166-1 alpha-3 is the
  closest fit) rather than unconstrained free text, and disclosed as an
  inference from the widget's own physical constraint, not a literal source
  instruction.
- **`sex` is modelled as `enum: ["M", "F"]`**, not the spelled-out
  `"male"`/`"female"` used by `ke/nrb/application-for-identity-card`'s
  otherwise-similar field, because this widget's own `maxLen` is 2 — too
  short for a spelled-out word. Source-fidelity here means respecting what
  the box can actually hold, not importing a sibling schema's convention
  wholesale.
- **`occupation` has `maxLength: 4`** — again the widget's own `maxLen`,
  too short for most occupation titles written in full. Disclosed as likely
  expecting a short occupation code NIA does not publish a table for, not
  silently modelled as unqualified free text.
- **`verificationDocumentAdditionalReference`** (Section 12, beside "Date
  Issued") corresponds to a widget the source prints **no label** for at
  all — disclosed explicitly rather than silently dropped, following this
  registry's practice for unlabelled widgets (cf. `ke/nrb`'s undefined
  "R.Number" fields).
- **`requiredWhen` is used exactly once** —
  `nonCitizenFirstResidenceInGhanaDate`, gated
  `{"field": "applicantType", "notEquals": "citizen"}`, matching the
  source's own "NON CITIZEN ONLY" heading and this field's own printed
  asterisk. `applicantType` is itself a `required: true` enum field with no
  `visibleWhen` of its own, so it is always present in a conforming
  submission — this `notEquals` comparison is never evaluated against an
  absent/optional field, avoiding the `notEquals`-against-a-sentinel bug
  this registry has hit before.
- **`required: true` is asserted only where the source itself prints an
  asterisk** (the form's own legend: `"* : Mandatory to fill"`). A full
  grep of the extracted text for every `*` confirmed the complete list of
  22 required fields/sections (`TYPE OF APPLICANT`, `TYPE OF REQUEST`,
  `Date of Application`, `SURNAME`, `SEX`, `FORENAMES`, `Marital Status`,
  `Height`, `Colour of Eyes`, `Colour of Hair`, `Level of Education`,
  `DATE OF BIRTH`, `Nationality at Birth`, `Current Nationality`,
  `HOMETOWN`, `OCCUPATION`, `RESIDENTIAL ADDRESS`,
  `APPLICANT'S PARENTAGE`, `Date of First Residence in Ghana` [non-citizen
  only]) plus the interviewer/centre-number/MRW/thumbprint fields already
  excluded as administrative. Notably, **"PLACE OF BIRTH" carries no
  asterisk while "HOMETOWN" does** — modelled faithfully as optional vs.
  required respectively, rather than assuming they share the same
  requiredness because they look structurally similar. Under
  "APPLICANT'S PARENTAGE *", only `fatherFullName`/`motherFullName` are
  marked `required: true`; the surrounding nationality/hometown/alive-status
  sub-fields carry no independent asterisk and are modelled `required:
  false`, rather than inflating the section-level asterisk onto every
  field beneath it.
- **The "SPOUSE(S) LIST" is bounded at 5 entries**, matching the form's own
  printed note: *"(Note: In case of more than five (5) Spouses, please use
  Spouses Form)"* — a disclosed companion-form escape hatch, consistent
  with this registry's established bounded-repeating-group convention (cf.
  `vn/xuatnhapcanh`'s 2-child bound, `ke/nrb`'s precedent).
- **`heightCm` is `type: integer` with `validation.maximum: 999`** — derived
  from the widget's own 3-digit `maxLen`, not an asserted business rule
  about plausible human height.
- **`challenged`** (Section 16, immediately before the applicant's
  declaration) is modelled as a boolean, its `description` linking it to the
  declaration's own text — *"...before my hand was guided to make my
  mark"* — since the form provides no further definition of what
  "Challenged" means beyond this juxtaposition.

## Legal-currency and administering-body check

Fresh web search (2026-07-12) confirms:

- **National Identification Authority Act, 2006 (Act 707)** establishes the
  NIA ("to establish an Authority responsible for the issue of national
  identity cards").
- **National Identity Register Act, 2008 (Act 750)** governs the National
  Identity Register; its own **Section 40** (offences/penalties) is quoted
  verbatim in the form's own declaration text.
- **National Identity Register Regulations, 2012 (L.I. 2111)** prescribe
  "Form One" under **regulation 3(1)** — matching the citation printed on
  the form itself ("Form One (regulation 3(1))").
- All three instruments confirmed current via a live fetch of
  `https://nia.gov.gh/legal-and-regulations/` (HTTP 200) with no repeal or
  replacement found.
- A separate online registration portal (`register.nia.gov.gh`, confirmed
  live, HTTP 200) exists as a parallel digital enrolment channel, but the
  paper Form 1-A remains directly linked from NIA's own current Forms page
  today, so it is not treated as superseded by that channel.

## Vertical scouting (Ghana's other five verticals)

Screened in parallel this cycle, per the task's pre-scouting pass:

- **DMV** — Ghana's DVLA operates exclusively through the login/sign-in-
  gated `online.dvla.gov.gh` portal (independently re-confirmed live, HTTP
  200, this pass) or in person; no downloadable specimen form was found.
  **Confirmed dead end.**
- **Visa** — `evisa.immigration.gov.gh` (independently re-confirmed live,
  HTTP 200, this pass) is a fully online e-visa portal (per the prior
  scouting note: Cloudflare Turnstile + Sumsub biometric verification +
  payment gate, no static specimen form); visa-on-arrival requires only a
  handwritten letter, not a form. **Confirmed dead end.**
- **Passport** — Ghana MFA's `mfa.gov.gh/wp-content/uploads/2018/10/passport-form.pdf`
  is independently re-confirmed live this pass (HTTP 200); a text-layer-only
  specimen with no AcroForm, per the prior scouting note. **Open backlog
  candidate, ready to author.**
- **Business Formation** — RGD/ORC's `orc.gov.gh/forms-fees/` ("Form 3" for
  private limited company registration) could **not** be independently
  re-confirmed this pass: a direct refetch returned a transient **HTTP
  500** this cycle. This claim (a ~571KB genuine text layer, 0 AcroForm
  fields) is carried over from the prior scouting note only, not
  independently re-verified — re-check before authoring.
- **Taxes** — GRA's `DT_0104`/`DT_0104a` provisional self-assessment forms
  (per the prior scouting note: genuine AcroForms, 27/29 fields, but a
  narrower "provisional estimate" scope than an annual actual return) were
  not independently re-fetched this pass either.

Business Formation, Taxes, and Passport are all flagged as **ready-to-author
backlog candidates for a future cycle**, not dead ends — Business Formation
and Taxes specifically need a fresh independent re-fetch before authoring,
since this pass could not reconfirm them.

## Conformance run

A from-scratch, ajv-free checker script (evaluates `required`/`requiredWhen`,
per-type `validation` keywords, and `documents[]` `required` directly against
the schema's own rules — no shared `tools/conformance-runner.mjs` exists yet
in this repo) was run against 7 fixtures:

- `citizen-married-first-time-issuance.json` — a married Ghanaian citizen,
  first-time issuance, exercising the full parentage/hometown/institutional-
  ID field set. **0 errors.**
- `refugee-replacement-with-non-citizen-residence-history.json` — a
  non-citizen (refugee) replacement application, exercising the
  `nonCitizenFirstResidenceInGhanaDate` `requiredWhen` gate and the
  non-citizen employer/verification-document fields. **0 errors.**
- `mutation-control-missing-required-field.json` — removes `surname`
  (required) → **1 error.**
- `mutation-control-email-pattern-violation.json` — sets `emailAddress` to
  `"not-an-email"` → **1 error** (pattern violation).
- `mutation-control-missing-required-document.json` — empties the
  `documents[]` array, omitting `applicantDeclaration` → **1 error**
  (`documents[]` requiredness explicitly exercised, not just assumed clean).
- `mutation-control-sex-enum-violation.json` — sets `sex` to `"X"` (not in
  `["M","F"]`) → **1 error.**
- `mutation-control-missing-conditional-non-citizen-residence-date.json` —
  removes `nonCitizenFirstResidenceInGhanaDate` from the refugee fixture,
  where `applicantType` (`"refugee"`) makes it conditionally required →
  **1 error** (the sole `requiredWhen` gate on this schema, explicitly
  exercised both positively, in the base refugee fixture, and negatively,
  here).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (JSON Schema
draft 2020-12 meta-schema conformance) both pass clean for
`registry/gh/nia/ghana-card-application-form-1a/1.0.0/schema.json`
(379/379 documents, 3/3 mapping.json companions).

## Backlog note

Ghana now stands at **1 of 6 verticals** (National ID). Passport, Business
Formation, and Taxes remain open, flagged backlog for a future cycle —
Business Formation and Taxes need a fresh re-fetch (this pass's refetch of
`orc.gov.gh` hit a transient HTTP 500; GRA's forms were not re-fetched at
all). DMV and Visa are confirmed dead ends per this pass's own live
re-fetches.
