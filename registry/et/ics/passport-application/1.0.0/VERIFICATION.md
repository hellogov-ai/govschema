# Verification record — et/ics/passport-application@1.0.0

## Candidate selection

GOV-4264 ("GovSchema Standard Research"). Deepens Ethiopia past its first
two published schemas (`et/ics/e-visa-application`, GOV-3313, Visa;
`et/mor/individual-tin-registration`, GOV-4246, Taxes), opening the
Passport vertical (3 of 6) via the Immigration And Citizenship Service's
own application form, first banked as an open-backlog candidate during the
GOV-4246 cycle alongside the sibling Ethiopia Business Formation candidate
(the Investment Commission's "Application Form for New Investment
Permit").

The Business Formation candidate was re-screened this cycle and confirmed
a legacy OLE2 binary `.doc` (magic bytes `d0 cf 11 e0`, i.e. the old
Microsoft Compound File Binary format, not OOXML), with no straightforward
extraction path in this environment — no `antiword`, `catdoc`,
`python-docx`, `olefile`, or LibreOffice/`soffice` available. This passport
form was chosen instead as a genuine PDF (`%PDF-1.3` magic bytes), matching
this registry's established `pdfjs-dist`-based extraction precedent.

## Reaching the live source

Target: `https://www.ethiopianembassy.be/wp-content/uploads/Passport-Application-Form.pdf`.

- Fetched directly with a realistic desktop User-Agent: HTTP 200,
  `Content-Type: application/pdf`, 108,133 bytes.
- sha256 of the retrieved bytes: `ad07ad0b94641362be887e419609b3db919e21c9272cdd80bec867677b6ad08f`.
- No login, CAPTCHA, or WAF gate on the asset itself.
- Cross-corroborated as the standard, widely-mirrored official form (not a
  stale or embassy-specific variant): a web search independently turned up
  the identical form mirrored on Scribd and other Ethiopian embassy/
  consulate sites, all under the same "Main Department for Immigration &
  Nationality Affairs" letterhead. A separate web search confirmed this
  letterhead name is the historic name of the same agency lineage now
  called the Immigration And Citizenship Service (ICS) — the bureau's name
  changed twice after the Derg government's removal, ending at "Main
  Department For Immigration & Nationality Affairs" before its 2021
  Proclamation No. 1263/2021 reorganization into ICS.
- The domestic online-portal variant (`passport.ics.gov.et`, discovered
  this cycle as the successor to the previously-checked
  `ethiopianpassportservices.gov.et`, both linked from `ics.gov.et`'s own
  homepage) remains unreachable from this session's tooling — connection
  failure, no TLS handshake completes — even though `ics.gov.et` itself
  resolves and returns HTTP 200. This re-confirms rather than newly
  discovers the caveat the GOV-4246 cycle originally flagged. A future
  cycle with different network access should re-check whether the online
  portal's own form composition has diverged from this printed specimen.

## Extraction method

Used `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, version
3.11.174) via its `legacy/build/pdf.js` CommonJS entry point, reading each
text item's raw string plus its `transform` array's x/y position to
reconstruct the form's true row-by-row and column-by-column layout. The
Amharic glyphs render as mojibake through this library's font substitution
(no Ethiopic font available in this environment), but the interleaved
English labels and every blank-line's position are fully legible — and
sufficient to identify every field, since the form is genuinely bilingual
with an English label alongside (or on the following row from) every
Amharic one.

The single page's 5 numbered sections were confirmed strictly top-to-
bottom by descending y-coordinate of each section heading (Applicant:
563.2; Family Information: 353.2; Marital Status: 251.9; Residence
Address: 206.2; Application Presented By: 91.3), with the document-type
checkbox row (Passport / Laissez-Passer / Pilgrim / Reissue) printed above
Section 1 with no section number of its own.

## Disclosed source-fidelity findings

1. Section 1's Name/Father's Name/Grandfather's Name rows each print a
   bilingual pair of full-width blank lines — one Amharic-labelled, one
   English-labelled — at uniform ~16.5pt row spacing with no other visual
   distinction. Modelled as two separate fields per name component (e.g.
   `applicantGivenName`/`applicantGivenNameLatin`) rather than one shared
   blank, since the form's own layout draws two independent writable lines
   rather than a single line with a bilingual label. Disclosed as an
   interpretation choice, not a printed instruction distinguishing the two
   purposes. These three name components reflect the Ethiopian patronymic
   naming convention (given name / father's given name / grandfather's
   given name) that together make up the applicant's own full legal name —
   distinct from Section 2's `fatherFullName`/`motherFullName` fields,
   which describe the applicant's actual parents as separate people, for
   genealogy/nationality-proof purposes.
2. The three previous-passport fields (`previousPassportNumber`/
   `previousPassportPlaceOfIssue`/`previousPassportValidUntil`, printed
   directly beneath the Section 1 date-of-birth/place-of-birth row) carry
   no printed conditional instruction of their own tying them to the top
   `documentType` checkboxes or to any other field. While they most
   plausibly apply to an applicant selecting Reissue or one who already
   holds a passport, the form prints no explicit gate — modelled
   bare-optional (`required: false`, no `requiredWhen`) rather than
   fabricating an unprinted condition.
3. Section 4's "Local" and "Abroad" column headers have no printed
   checkbox distinguishing which column an applicant should complete —
   modelled as a directly-supplied boolean gate, `residesAbroad` (not
   itself a printed field), the same convention this registry's Malta/
   Cyprus passport schemas use for their own unprinted section-
   applicability conditions.
4. Section 3's "IF OTHER, SPECIFY" free-text field is modelled
   `requiredWhen maritalStatus equals OTHER`, since the form prints only
   SINGLE/MARRIED as named checkboxes plus this catch-all.

## Mock test run

Models 48 `fields[]` across 6 steps (Document Type; Section 1 Applicant;
Section 2 Family Information; Section 3 Marital Status; Section 4
Residence Address; Section 5 Application Presented By) plus 1
`documents[]` attestation entry (the form's own closing declaration
statement).

2 valid mock scenarios committed under
`conformance/et/ics/passport-application/1.0.0/`:
- `valid-local-single-first-time.json` — a local-resident, single,
  first-time Passport applicant presenting their own application.
- `valid-abroad-married-proxy.json` — an abroad-resident, married Reissue
  applicant (with previous-passport particulars filled in) whose
  application is presented by a proxy.

Plus 6 mutation-control fixtures, each expected to raise exactly 1 error:
- `mutation-missing-occupation-required.json` — drops a statically
  required field.
- `mutation-missing-ifotherspecify-requiredwhen.json` — sets
  `maritalStatus` to `OTHER` without supplying `ifOtherSpecify`.
- `mutation-missing-kebele-requiredwhen.json` — `residesAbroad: false`
  without supplying `kebele`.
- `mutation-missing-abroadcity-requiredwhen.json` — `residesAbroad: true`
  without supplying `abroadCity`.
- `mutation-invalid-sex-enum.json` — sets `sex` to a value outside the
  enum.
- `mutation-unknown-field-rejected.json` — adds an undeclared top-level
  field.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 8 fixtures: both valid scenarios at 0
errors, all 6 mutation controls each raising exactly 1 error, and
confirmed every `requiredWhen` field reference resolves (0 dangling
references).

## Registry validation

```
node tools/validate.mjs
```

passes for this document individually and as part of the full registry
run (589 → 590 documents, all passing). `node tools/validate-ajv.mjs` also
passes. `tools/govschema-client/registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
