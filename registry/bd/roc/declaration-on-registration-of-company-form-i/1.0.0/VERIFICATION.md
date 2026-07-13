# Verification record — `bd/roc/declaration-on-registration-of-company-form-i` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2687** (parent research cycle
**GOV-2685**). It opens **Bangladesh's Business Formation vertical (5 of
6)**, using the Registrar of Joint Stock Companies and Firms' (RJSC)
"Form-I: Declaration on Registration of Company", prescribed under section
25 of the Companies Act, 1994. Bangladesh previously had four published
verticals (Taxes — `bd/nbr/individual-income-tax-return-form-it-11ga`; DMV —
`bd/brta/motor-vehicle-registration-application`; Passport —
`bd/dip/e-passport-application-form`; Visa —
`bd/dip/machine-readable-visa-application-form`). Only National ID remains
open backlog after this schema (tracked separately, per the task briefing, in
a sibling issue).

## Reverses a prior "third-party mirror only" finding

This registry's own `CATALOG.md` previously recorded, from an earlier
cycle's screening, that Bangladesh's Business Formation vertical (RJSC's
numbered incorporation forms) was "only mirrored on a third-party
legal-services site, not RJSC's own domain" — left as open backlog rather
than pursued. This cycle (per the parent GOV-2685 research cycle's
re-scouting) found RJSC's own forms portal (`roc.gov.bd`) has since been
rebuilt on the same Oracle Cloud object-storage distribution pattern already
documented elsewhere in this registry for Bangladesh's BRTA/DIP forms, and
now hosts Form-I (and companion forms) first-party. This is the same class
of reversal already recorded for Bangladesh's DMV and Passport verticals
(GOV-2644's BRTA finding; GOV-2666's DIP finding).

## Source verification (independently re-derived, not copied from the task briefing)

- **Forms-index landing page:**
  `https://roc.gov.bd/pages/forms/6922d9b8933eb65569dffa1c` — independently
  re-fetched this cycle via
  `curl -sk -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"`:
  **HTTP 200**, `Content-Type: text/html; charset=utf-8`, **110,032 bytes**.
  Directly grepped the returned HTML for the target PDF's own object-storage
  filename and found it embedded in a `<div class="chip" ... title='ফরম-I'>`
  element ("Form-I" in Bengali) linking to exactly the PDF URL below,
  alongside a sibling chip for "ফরম-III" — independent confirmation this
  specific PDF is RJSC's own published "Form-I", not a coincidental
  same-named file.
- **PDF source:**
  `https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-roc/2024/12/7010afce4927436495e26e4e85703678.pdf`
  — fetched independently this cycle via the same `curl` invocation:
  - **HTTP 200**, `Content-Type: application/pdf`, **83,237 bytes** —
    independently matches the task briefing's own cited byte count exactly.
  - **`sha256`:**
    `de10f506139c9c38984a7f68843eef151647c072e86b2d54b0cbbf8d6deceff7`
    (computed via `sha256sum` on the freshly-downloaded file; the task
    briefing did not itself cite a hash, so this is a first capture, not a
    cross-check, and anchors a future re-verification diff).
  - The response's own `last-modified` header reads `Mon, 05 Jan 2026
    16:51:06 GMT`, captured here to anchor a future re-verification diff.
- **Legacy cross-reference mirror:** the task briefing's cited
  `app.roc.gov.bd/Guidlines/Download/...` path was attempted this cycle
  (`https://app.roc.gov.bd/Guidlines/Download/AttachFormFolder/FormsAndFees/Form-I.pdf`
  → HTTP 404; `https://app.roc.gov.bd/Guidlines/` → HTTP 403) but the exact
  live path was not located this cycle. Per the task briefing's own
  characterization, this mirror is a secondary cross-check only, not the
  primary source, so this schema's derivation does not depend on it; the
  primary `roc.gov.bd` source and its own visual page render (below) were
  sufficient for independent verification.

## PDF structure, independently confirmed via `pdfjs-dist@3` (legacy build) + `node-canvas`

- **1 page**, a plain print-and-fill specimen: `getFieldObjects()` returned
  `null` and `page.getAnnotations()` returned an empty array — **zero
  AcroForm widgets** — confirmed, not assumed from the task briefing's own
  characterization.
- `getTextContent()` returned a full, clean, English-only text layer. Every
  text item's `(x, y)` transform was grouped by rounded `y`-coordinate and
  sorted by `x` to reconstruct the source's own line breaks and blank-line
  positions.
- **Independently cross-checked by rendering the page to a PNG** (via
  `pdfjs-dist` + `node-canvas` at 3x scale) and visually inspecting every
  blank's position and length against the reconstructed text — both methods
  agree exactly, including the location of every underline/blank relative to
  its surrounding printed text, and the verbatim double "and and" text
  immediately after the officer-branch company-name blank (see "Field
  derivation" below) — ruling out a text-extraction artifact.

## Field derivation

The form's full text, reconstructed by line (English-only, verified via
`getTextContent()` positions and the rendered-page cross-check):

```
Form-I
Declaration on Registration of Company
THE COMPANIES ACT, 1994
(See Section 25)

Name of the Company ________________________________________________________

        Declaration of compliance with the requirements of the companies act, 1994 made
pursuant to section 25 (2) on behalf of a company proposed to be Registered as the
___________________________________________________________________________

        Presented for filing by  _____________________________________________________
I, _______________________________of  _________________________________
____________________________________________________________________________
do solemnly and sincerely declare that I am an Advocate* / Attorney/ A Pleader entitled
to appear before High Court who is engaged in the formation of the company/ a
person named in the Articles as a Director/ Manager/ Secretary of the
____________________________________________and and that all the requirements of
the Companies Act, 1994 in respect of matters precedent to the registration of the said
company and incidental there to have been complied with, save only the payment to
the fees and sums payable on registration and I make the solemn declaration
conscientiously believing the same to be true.

                                                                    Signature

Note: The declaration need not to be-
     (a) Signed before a magistrate or an officer competent to administer others or
     (b) Stamps as a affidavit

________________________________________________________________________________

              * Strike out the portion which does not apply
```

Every blank line was mapped to a field or (for the closing declaratory
paragraph and signature) a `documents[]` attestation entry:

- **`companyName`** — the header caption's own blank ("Name of the Company
  ___").
- **`proposedRegisteredName`** — a second, separate full-width blank in the
  body's own opening sentence ("...proposed to be Registered as the ___").
  **Disclosed judgment call:** this is likely completed with the same or a
  closely related legal name as `companyName` in ordinary practice (the
  source gives no further disambiguating instruction), but since the form
  prints two independent blanks, both are modeled as separate fields rather
  than one being silently dropped as redundant.
- **`presentedForFilingBy`** — "Presented for filing by ___".
- **`declarantName`** — "I, ___".
- **`declarantAddress`** — "of ___" continuing onto the following full blank
  line. The blank genuinely spans two printed lines (confirmed via both the
  text layer's line-grouping and the rendered-page image), modeled as one
  free-text field rather than two, since the source provides no internal
  structure (e.g. a separate district/line-1/line-2 breakdown) within it.
- **`declarantCapacity`** — the declaration's central strike-out
  construction, footnoted "* Strike out the portion which does not apply":
  the declarant is either an Advocate, Attorney, or Pleader "entitled to
  appear before High Court who is engaged in the formation of the company",
  or "a person named in the Articles as a Director/ Manager/ Secretary" of
  the company being formed. Modeled as a single 6-value `enum`
  (`ADVOCATE`/`ATTORNEY`/`PLEADER`/`DIRECTOR`/`MANAGER`/`SECRETARY`) — the
  mutually-exclusive set of printed titles a filer strikes down to one of —
  consistent with this registry's own established precedent for
  slash-separated printed choice lists (e.g. `bd/dip/e-passport-application-
  form`'s `passportType`/`gender` fields).
- **`declarantCompanyName`** — the officer branch's own trailing blank
  ("...Director/ Manager/ Secretary of the ___"). `requiredWhen`
  `declarantCapacity` is one of `DIRECTOR`/`MANAGER`/`SECRETARY`: a filer
  selecting the Advocate/Attorney/Pleader branch instead strikes out this
  entire clause, blank included, so the blank is only meaningfully completed
  under the officer branch. **Verbatim source artifact, independently
  confirmed twice** (text layer and rendered page image): this blank is
  immediately followed by the word "and" twice in succession ("___ and and
  that all the requirements") — disclosed here as printed in the source PDF
  itself, not a GovSchema transcription error.
- **Closing declaratory paragraph + signature line** — modeled as a single
  `attestation`-category `documents[]` entry (`declarationAttestation`,
  `required: true`), consistent with this registry's own `bd/dip` precedent
  for a form's own declaratory statement text, rather than as data fields.
- **Not modeled:** the form prints no date blank anywhere (unlike
  `bd/dip/e-passport-application-form`'s dedicated declaration-date widget),
  so no date field is invented. The closing "Note" (the declaration need not
  be signed before a magistrate, nor stamped as an affidavit) is procedural
  boilerplate, not a fillable field, and the footnote itself
  ("* Strike out the portion which does not apply") is disclosed above as
  the instruction governing `declarantCapacity`, not modeled as its own
  field.

## Scoping decision

### In scope (6 `fields[]` + 1 `documents[]` entry)

This is a genuinely short, single-page statutory declaration — every printed
blank on the form is modeled; there is no narrower sub-pathway to scope out.

### Out of scope, disclosed

- **Companion forms** available the same way on RJSC's rebuilt portal — Form
  IX (Consent of Director) and Form XII (Particulars of Directors), per the
  task briefing — are distinct forms serving distinct purposes in the
  incorporation packet, not sections of this form; left as candidate future
  companion schemas, consistent with this registry's own companion-schema
  precedent (e.g. the CH-ZH Hilfsblatt series, the GR AADE Ε1/Ε2/Ε3 forms).
- **The legacy `app.roc.gov.bd/Guidlines/...` mirror** — not resolved to a
  working path this cycle (see "Source verification" above); not needed,
  since the primary `roc.gov.bd` source was independently verified in full.

## Language

`process.language` is `en`: the form's full text layer, independently
confirmed via `getTextContent()`, is entirely in English with no Bengali
anywhere on the page — unlike `bd/dip`'s bilingual passport/visa forms, this
form (and the forms-index page's own Bengali chip label aside) is an
English-only specimen, consistent with `bd/nbr` and `bd/brta`.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/`:

- **`valid-advocate-declarant.json`** — an Advocate-capacity declarant;
  `declarantCompanyName` is correctly left absent (not required under this
  branch).
- **`valid-director-declarant.json`** — a Director-capacity declarant,
  exercising the `declarantCompanyName` `requiredWhen` gate (present and
  populated).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen`/`type`/`validation.enum` grammar directly against
`spec/v0.3/SPEC.md`'s rules:

```
$ node check_conformance.mjs schema.json \
    valid-advocate-declarant.json \
    valid-director-declarant.json
valid-advocate-declarant.json: 0 error(s)
valid-director-declarant.json: 0 error(s)
```

Three mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-company-name.json`** — drops `companyName` (a
  static `required: true` field) from the advocate-declarant valid fixture.
- **`mutation-control-invalid-enum-declarant-capacity.json`** — sets
  `declarantCapacity` to `"LAWYER"`, not one of the enum's 6 values.
- **`mutation-control-missing-conditional-declarant-company-name.json`** —
  starts from the director-declarant valid fixture and drops only
  `declarantCompanyName`, isolating the `requiredWhen` violation (since
  `declarantCapacity` is still `"DIRECTOR"`).

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-company-name.json \
    mutation-control-invalid-enum-declarant-capacity.json \
    mutation-control-missing-conditional-declarant-company-name.json
mutation-control-missing-company-name.json: 1 error(s)
  - companyName: required but missing
mutation-control-invalid-enum-declarant-capacity.json: 1 error(s)
  - declarantCapacity: value "LAWYER" not in enum ["ADVOCATE","ATTORNEY","PLEADER","DIRECTOR","MANAGER","SECRETARY"]
mutation-control-missing-conditional-declarant-company-name.json: 1 error(s)
  - declarantCompanyName: required but missing
```

All three negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
ok   registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
ok   registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv`/`ajv-formats` present in this
worktree at the start of this cycle; ran `npm ci --include=dev` inside
`tools/` first, per this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Bangladesh's **Business Formation vertical (5 of 6)**; Taxes, DMV,
  Passport, and Visa are already published. Only National ID remains open
  backlog after this schema, tracked separately per the task briefing.
- `jurisdiction.level` is `national` — RJSC is Bangladesh's national
  company-registration authority.
- `process.type` is `registration`, matching the form's own title
  ("Declaration on Registration of Company") and statutory basis (Companies
  Act, 1994, section 25).
- Companion candidates for a future cycle: RJSC's Form IX (Consent of
  Director) and Form XII (Particulars of Directors), both disclosed above as
  reachable the same way on RJSC's rebuilt portal.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the
object-storage-hosted PDF has not been silently replaced with a revised
edition (this cycle captured its `last-modified: Mon, 05 Jan 2026 16:51:06
GMT` header to anchor a future diff); (2) re-attempting to locate a working
path on the legacy `app.roc.gov.bd/Guidlines/...` mirror for a fuller
cross-check; (3) whether a future cycle wants to author Form IX/Form XII as
companion schemas alongside this one.
