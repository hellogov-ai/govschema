# Verification record — na/bipa/close-corporation-founding-statement@1.0.0

## Candidate selection

GOV-4515 ("GovSchema Standard Research", child of GOV-4513, itself a
re-discovery cycle following the GOV-4488 rollup). Namibia's Business
Formation candidate (BIPA's CC1 Founding Statement) had been banked since
GOV-4424's original scouting pass but had gone stale twice — the previously
recorded download URL 404'd after BIPA restructured its site, and GOV-4513
re-discovered the current live URL (with a `www.` subdomain requirement)
immediately before delegating this authoring cycle. Namibia's first
vertical, Taxes, is already published as
`na/namra/return-of-income-individuals@1.0.0` (GOV-4491); this schema opens
the second of Namibia's six verticals, Business Formation.

## Reaching the live source

Fetched `https://www.bipa.na/download/cc1-founding-statement/?wpdmdl=6102`
directly (no login/CAPTCHA/WAF gate):

- HTTP 200, `Content-Type: application/msword`,
  `Content-disposition: attachment;filename="CC1  Founding statement.doc"`.
- `Content-Length` / downloaded size: **215,552 bytes**, exactly matching
  the size the delegating issue (GOV-4513) had already re-verified.
- sha256 of the retrieved bytes:
  `f0565d795524968b34a4ded0e98b4cc812c7c4eec7a77e716056abc950d2be02`.
- First 8 bytes: `d0 cf 11 e0 a1 b1 1a e1` — the canonical OLE2/Compound
  File Binary (CFB) magic number, confirming this is a genuine legacy Word
  97-2003 `.doc` (not a modern `.docx` zip archive, and not a scanned
  image). The bare `bipa.na` host (without the `www.` subdomain) 404s, per
  GOV-4513's own disclosed finding, re-confirmed independently this cycle.

The plain-`bipa.na` bare-host 404 and the OLE2 (not zip) container format
were both flagged in advance by the delegating issue; this cycle's own
fetch reproduced both findings exactly rather than trusting them at face
value.

## Extraction method

This session's environment has no `antiword`, `catdoc`, `wvText`, or
`soffice`/LibreOffice binary available (`which` on each returned nothing).
It does have Python's stdlib and a vendored Node.js dependency tree
under `/tmp/node_modules` that includes `word-extractor` (a pure-JS OLE2/
CFB-aware `.doc` text-run parser, `node-word-extractor` upstream) and its
own `cfb` (SheetJS Compound File Binary reader) dependency. Rather than
attempt a from-scratch CFB/`WordDocument`-stream text-run parser, this
cycle used the vendored `word-extractor` package directly (via
`require()` against its `lib/word.js` entry point, since its declared
`package.json` `main` does not resolve cleanly under a plain ESM
`import`), calling `getBody()`, `getHeaders()`, `getFooters()`,
`getFootnotes()`, `getEndnotes()`, and `getAnnotations()` to recover every
text run in the document, including the repeating header/footer text
("REPUBLIC OF NAMIBIA ... CC 1" / section citations) printed on every
page. Extraction succeeded cleanly (exit 0) and produced a complete,
readable, line-broken transcript of the entire 9-logical-page document —
no fabrication or guessing was needed at any point; every field below was
read directly off this transcript.

## Document structure

The document is a flat sequence of blank-and-caption rows (no AcroForm
widgets — this is a legacy Word template, not a fillable PDF), laid out
across 9 logical pages:

- **Page 1** — corporation identity (registration number of corporation,
  date of receipt [office-only], full name, literal translation/shortened
  form of name, description of principal business, date of end of
  financial year, postal address, address of registered office, email
  address), the accounting officer's name/address/consent-attachment
  instruction/professional-association/membership number/signature.
- **Page 2** — "NOTES", a purely instructional page (no fields of its own):
  the form must be in block capitals/typewritten/lithographed/printed in
  legible characters with deep permanent black ink, lodged in triplicate;
  a power of attorney must be attached where a person signs on behalf of a
  member; minors/persons under legal disability must be assisted by a
  parent/guardian/representative with capacity stated; if no identity
  document has been issued, a written statement to that effect must be
  attached; non-compliant forms are rejected; then the "Particulars to be
  furnished under the heading MEMBERS" guidance (full names/surname,
  identity number or date of birth if none issued, registration number if
  a juristic person, percentage of interest, particulars/fair value of
  contribution, residential/postal address, signature).
- **Pages 3-7** — five structurally-identical "PART C — MEMBERS" pages,
  each repeating: corporation name/registration-number header, two full
  member blocks (full names and surname; a single blank serving double
  duty as "Identity number or date of birth (i)" for a natural person or
  "Registration number (ii)" for a juristic person; percentage of
  interest; particulars of contribution; residential address; postal
  address; email address; signature of member or representative), then
  one witness block (witness signature and date of signature, followed by
  the witness's own full names, residential address, business address,
  postal address, email address).
- **Page 8** — "Certificate of Incorporation": a Registrar-of-Close-
  Corporations-completed certificate (registration number, corporation
  name, an optional "converted from a company" strike-through note with
  that company's registration number, place/date of signing, Registrar's
  signature).
- **Page 9** — a continuation of the Certificate (corporation name/
  registration number header, a repeated "converted from company" note),
  a large blank area, then "MEMBER(S)/WITNESS CONTACT DETAILS": six
  structurally-identical blocks (Name; Land-line number of applicant (if
  available); Mobile number (compulsory); Fax Number (if available);
  E-mail Address (if available)), introduced by its own printed note that
  this information is collected in terms of Section 4 of the Financial
  Intelligence Act, 2012 (Act 13 of 2012) and its Regulations, in addition
  to the Close Corporations Act/Regulations requirements above.

## Scope: fields excluded as Registrar/office-only content

- **"DATE OF RECEIPT"** (page 1) — a BIPA office date stamp, not
  applicant-supplied data.
- **The entire "Certificate of Incorporation"** (page 8) and its page-9
  continuation, including the "converted from a company" caption
  appearing on both pages — excluded in its entirety as Registrar-
  completed post-registration certification, not a blank the applicant
  fills in on the Founding Statement itself. This is a disclosed,
  deliberate scope decision: if Namibian practice in fact expects an
  incorporator to *pre-declare* a same-day conversion-from-company on the
  Founding Statement (as opposed to the Registrar recording it once
  proven), a future PATCH could add `convertedFromCompany`
  (boolean)/`convertedFromCompanyRegistrationNumber` (requiredWhen) fields
  — left out of v1.0.0 given the ambiguity and the page's own framing as
  part of the Certificate, not Part A/B/C of the Founding Statement.
- **Page 2's own instructional/procedural text** (form-format instructions,
  rejection warning, and the "Particulars to be furnished under MEMBERS"
  guidance) contributes no fields of its own — it is prose the applicant
  reads, not a blank they fill in — but is cited via `sourceRef` and
  folded into the relevant Part C field descriptions (e.g. the identity-
  number-or-date-of-birth guidance) and into the two conditionally-
  applicable `documents[]` entries below.

## Scope: bounded-repeating-group decisions

1. **Members are modelled as 10 bounded slots** (`member1`...`member10`),
   matching both (a) the Close Corporations Act, 1988's own statutory
   maximum of ten members, and (b) the source form's own literal printed
   capacity — five structurally-identical Part C pages (3-7), two member
   blocks each — with no "replicate this page for more members"
   instruction anywhere in the source (unlike, e.g.,
   `zm/pacra/company-incorporation`'s own unbounded "Replicate Part B"
   captions), since ten is already the legal ceiling. A synthetic
   `numberOfMembers` count field (not itself printed) drives which slots
   beyond the first are `requiredWhen`-gated (`greaterThanOrEqual`), per
   this registry's established convention.
2. **Each member slot carries an `isBodyCorporate` boolean discriminator**,
   not itself printed on the source. The source prints one blank captioned
   "Identity number or date of birth (i)" (natural person; per the Notes
   page, a date of birth is written here instead if no identity document
   has been issued) directly beside a second blank captioned "Registration
   number (ii)" (juristic person), with no explicit either/or signal
   distinguishing which blank a given member should use. This is the same
   ambiguity class `zm/pacra/company-incorporation` resolved with its own
   `isBodyCorporate` discriminators for Shareholders/Guarantors/Beneficial
   Owners; this schema follows the same pattern. `memberNIdentityNumberOr
   DateOfBirth` is `requiredWhen` `!isBodyCorporate`; `memberNRegistration
   Number` is `requiredWhen` `isBodyCorporate`.
3. **The identity-number-or-date-of-birth blank is modelled as one
   `string` field, not split into separate identityNumber/dateOfBirth
   fields.** The source itself uses a single physical blank for both
   purposes (an ID number normally, a date of birth only if no ID document
   has ever been issued) — modelling two optional fields with no clean
   "at least one of" enforcement mechanism in this spec (GSP-0013's
   `exclusivityGroups` is boolean-only, per SPEC.md §8.4) would understate
   the source's own single-blank structure without adding real validation
   power. The field's own description discloses both accepted forms.
4. **Witnesses are modelled as 5 bounded slots** (`witness1`...`witness5`),
   one per Part C page, each `requiredWhen`-gated on `numberOfMembers
   greaterThanOrEqual` that page's first member index (page holding
   members 2N-1/2N is required once member 2N-1 is populated) — since
   each page's witness attests that page's own two member signatures.
   This is a disclosed judgment call: the source does not print an
   explicit "delete if fewer than N members" instruction for the witness
   blocks the way it does for, e.g., the Certificate's own "converted from
   a company" strike-through note; the mapping used here (one witness per
   physical page, gated on that page's own first member slot) is the most
   literal reading of the repeated page structure.
5. **The Member(s)/Witness Contact Details section (page 9) is modelled as
   6 bounded slots** (`contactDetail1`...`contactDetail6`), matching its
   own printed capacity exactly, gated by an independent synthetic
   `numberOfContactDetailsEntries` count field rather than reusing
   `numberOfMembers` — disclosed as a judgment call, since the source
   states this section serves "MEMBER(S)/WITNESS" collectively (i.e. it
   may cover witnesses as well as members, or fewer entries than the
   member count if some members' contact details are already complete
   elsewhere) with no explicit 1:1 correspondence to Part C's own member
   numbering.
6. **Within each contact-details entry, only Name and Mobile Number are
   `requiredWhen`-gated on the entry being active.** Land-line, Fax, and
   Email are each modelled always-bare-optional (no `requiredWhen` at
   all), per their own printed "(if available)" qualifiers — mirroring
   this registry's established treatment of a bare-optional field whose
   applicability the source itself never conditions on anything (e.g.
   `zm/pacra/company-incorporation`'s own `directorNLandlinePhone`
   fields). Mobile Number is the one field in this section the source
   itself marks "(compulsory)".

## Other disclosed findings

1. **`dateOfEndOfFinancialYear` is modelled as a `string` in `DD/MM`
   format, not `type: date`.** The source prints no year component
   alongside this caption — a close corporation's financial year end
   recurs annually — so a full ISO date (which this registry's own
   `validate.mjs` enforces as `YYYY-MM-DD` for `type: date` fields) would
   fabricate a year the source never asks for; mirrors this registry's
   precedent of splitting day/month-only source captions into a
   non-`date` type rather than forcing a full calendar date (e.g.
   `na/namra/return-of-income-individuals`'s own
   `child1BirthMonth`/`child1BirthYear` split for the same reason).
2. **`accountingOfficerName`/`accountingOfficerAddress` are modelled as
   two separate fields**, even though the source's single "Name and
   address of accounting officer" caption spans both concepts across
   several shared blank lines with no sub-caption distinguishing them —
   matching this registry's convention of splitting a composite label into
   separate fields when it names two distinct concepts (name vs. address),
   consistent with how this schema also keeps `postalAddress` and
   `addressOfRegisteredOffice` as two separate corporation-level address
   fields rather than merging them.
3. **Signature fields are modelled as `type: string` "signature-name
   attestation" fields**, following `zm/pacra/company-incorporation`'s own
   established convention for a printed signature line with no separate
   digital-signature mechanism disclosed by the source.
4. **`emailAddress`-family fields all reuse this registry's own
   single-escaped email pattern** (`^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$`, one
   backslash per JSON string, not two), specifically to avoid the
   double-escaped-regex defect this registry has previously caught and
   fixed (`py/suace/business-formalization-individual`, GOV-4437).
5. **`registrationNumberOfCorporation` (page 1) is modelled optional, not
   required**, since a brand-new Founding Statement (this schema's primary
   scenario) has no registration number yet — BIPA assigns it upon
   incorporation, per the excluded Certificate of Incorporation page —
   while an amendment to an already-registered corporation would populate
   it. Disclosed as a judgment call in the absence of an explicit printed
   instruction distinguishing new-registration from amendment use of this
   form.
6. **`memberNPercentageOfInterest` is modelled `type: number` with
   `minimum: 0`/`maximum: 100`**, not cross-validated to sum to 100 across
   active member slots — this registry's `crossFieldValidation` grammar
   (SPEC.md §8.3) only compares two named fields or checks presence, with
   no aggregate-sum-across-a-variable-length-slot-set operator available,
   so no such rule is asserted; each slot's own individual bound is
   enforced instead.

## Conformance

3 valid mock scenarios — `valid-single-member-cc` (the statutory minimum,
one member, one witness, one contact-detail entry); `valid-four-members-
two-pages-with-juristic-member` (4 members spanning both Part C pages 3
and 4, exercising 2 witness blocks, one juristic-person member using
`memberNRegistrationNumber`, and 3 contact-detail entries); and
`valid-ten-members-full-form-existing-registration-number` (the full
10-member/5-witness/6-contact-detail form, an existing
`registrationNumberOfCorporation` populated as an amendment scenario, and
a second juristic-person member) — plus 12 mutation-control fixtures
(6 missing-static-required fixtures across corporation/officer/member/
witness/contact-details fields, 4 missing-`requiredWhen`-gated fixtures
exercising the member-identity/registration-number branch, the witness-page
gate, and the contact-details mobile-number gate, one out-of-range
fixture, one invalid-type fixture) and one unknown-field-rejected fixture
— 16 fixtures total, committed under
`conformance/na/bipa/close-corporation-founding-statement/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 16: all 3 valid scenarios at 0 errors
(confirming the bounded-slot `requiredWhen` logic resolves correctly for a
complete valid fill-through at 3 different member counts, including both
natural-person and juristic-person members and every witness/contact-
details gate), all 6 missing-required-field mutations each raising exactly
1 error, all 4 missing-`requiredWhen`-gated mutations each raising exactly
1 error, the out-of-range and invalid-type mutations each raising at least
1 error, and the unknown-field mutation correctly rejected. Validated
clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run (624/624 documents,
3/3 mapping companions). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
