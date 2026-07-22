# Verification record — zm/dnrpc/passport-application@1.0.0

## Candidate selection

GOV-4278 ("GovSchema Standard Research", 2026-07-22). The GOV-4271 cycle
(opening Zambia as the registry's 77th jurisdiction via
`zm/pacra/company-incorporation@1.0.0`, Business Formation) banked Zambia's
Passport candidate as pre-scouted, disclosed STRONG backlog: a Ministry of
Foreign Affairs and International Cooperation (MOFAIC) Diaspora Portal PDF,
`PASSPORT-FORM-A-WITH-FORM-N.pdf`. This cycle authors that candidate,
opening Zambia's Passport vertical (2 of 6). Zambia's Taxes candidate (ZRA's
19-page Individual Income Tax Return, Form ITF 46_1 V001) remains open
backlog for a future cycle, left unauthored this cycle in favor of this
smaller-scope Passport candidate, per the GOV-4271 cycle's own disclosed
size comparison.

## Reaching the live source

Fetched
`https://www.mofaic.gov.zm/diasporaportal/wp-content/uploads/2025/09/PASSPORT-FORM-A-WITH-FORM-N.pdf`
directly:

- HTTP 200, `Content-Type: application/pdf`, 2,526,667 bytes.
- No login, CAPTCHA, or WAF gate blocks reaching or reading this file —
  confirmed via a plain unauthenticated `curl` request with no session/cookie
  state (only a TLS certificate-verification bypass was needed to reach the
  host from this session's network egress; the certificate itself is not
  otherwise implicated in this finding).
- sha256 `6f581eb23e4fc6d51c02cd8fb51088958f6a7df93aea80ea9526a036bbc94d80`.
- PDF header `%PDF-1.5` at byte 0, 5 `/Type/Page` objects — a genuine
  native (searchable-text) PDF, not a scanned image.
- Cross-corroborated via web search: the same file is independently listed
  on MOFAIC's own Diaspora Portal "Documents" index page
  (`https://www.mofaic.gov.zm/diasporaportal/?page_id=1271`), confirming it
  is the standard, currently-published form rather than a stale or
  third-party mirror.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/gov3030/node_modules`, plus its own `canvas` peer dependency
copied in from `/tmp/gov3216/node_modules/canvas` for page rendering),
reading each text item's raw string and its `transform` x/y position, and
separately rendering each of the 5 pages to a PNG at 2x scale via
`node-canvas` to visually confirm true table/column layout (the raw
text-position extraction alone under-represents this form's dense
multi-column, ruled-table structure). All 5 pages visually inspected as
rendered images before finalizing the field list.

## Document structure

The PDF is two documents stapled into one file:

- **Pages 1-4: Form 'A'** — "APPLICATION FOR A ZAMBIAN PASSPORT FOR PERSONS
  OVER SIXTEEN YEARS OF AGE" (a separate Form 'B' covers applicants under
  16, per page 1's own Note 1 — out of scope for this schema). Page 1 is
  pure instructions/notes; pages 2-4 carry the numbered Sections 1-10.
- **Page 5: Form N** — "AFFIDAVIT OF BIRTH", Ministry of Home Affairs,
  Department of National Registration, Passport and Citizenship (DNRPC)
  letterhead. Note 4(h) on page 1 states "All applicants must attach duly
  completed sworn birth affidavit using from N" — Form N is mandatory for
  every applicant, not a conditional attachment, which is why this schema
  models it as an always-required step rather than gating it.

Page 1's own Note 1 states which of Form A's ten numbered sections are
universal versus conditional: "Section 1,3,5,6 and 7 of this form must be
completed in english by all applications for new passports and renewals,
section 2 and 4 must also be completed by those to whom these sections
apply" — directly justifying this schema's step-level required/conditional
split for Sections 1-4 (Section 2's own header, "MARRIED WOMEN... applying
must complete this section", and Section 4's own header, "TO BE COMPLETED
BY ALL PERSONS BORN OUTSIDE ZAMBIA", corroborate the same split). Sections
8, 9, and 10 are not covered by this note; their own conditionality is
inferred from their own printed headers/notes (see Disclosed findings
below).

## Disclosed findings and interpretation choices

1. **Four directly-supplied, unprinted boolean eligibility gates.** None of
   `isMarriedWoman`, `bornOutsideZambia`, `hasLostPreviousPassport`, or
   `applicantIsMinor` is a printed checkbox — each is inferred from a
   section header or note stating the section's own applicability (see
   Document structure above, and Note 4(f) — "Children under 18 years of
   age may not be granted passports without the written consent of the
   legal guardian, or parent, except where the person under 18 is married"
   — for `applicantIsMinor`). This is the same convention this registry's
   Ethiopia (`residesAbroad`), Malta, and Cyprus passport schemas use for
   their own unprinted section-applicability conditions.
2. **Guardian consent (Section 10) uses a compound `requiredWhen`.** Gated
   on `{ all: [{ field: "applicantIsMinor", equals: true }, { field:
   "maritalStatus", notEquals: "MARRIED" }] }`, directly encoding Note
   4(f)'s stated married-minor exception rather than gating on
   `applicantIsMinor` alone.
3. **Two nested nested-conditions.** `husbandFatherPlaceDateOfBirth`
   (Section 2) requires both `isMarriedWoman` and a second, section-local
   gate `husbandBornOutsideZambia` (itself only meaningful when
   `isMarriedWoman` is true); `consulateNameAndPlace`/
   `consulateRegistrationDate` (Section 4(a)) require both `bornOutsideZambia`
   and `birthRegisteredAtConsulateAbroad`. `parentRegistrationCertNo`/
   `parentRegistrationPlaceDateOfIssue` (Section 4(a)) require both
   `bornOutsideZambia` and `nationalStatusOfParent` equalling
   `REGISTRATION` (reusing Section 1's own parent-citizenship-basis field
   rather than introducing a duplicate).
4. **`sponsoringGovernmentDepartment` and
   `previousPassportOrTravelDocumentNumber` are bare-optional, not gated.**
   Section 5 prints "If sponsored by a Government state name of Department"
   and Section 6's Declaration point C prints "...other than passport or
   travel document No..............which is now attached..." — both are
   free-standing conditional instructions with no separate printed
   yes/no checkbox to gate on, so both are modelled `required: false` with
   no `requiredWhen`, the same disclosed no-printed-signal treatment this
   registry's Ethiopia passport schema (`et/ics/passport-application`) uses
   for its own analogous fields.
5. **`affidavitKnowledgeBasis` requiredWhen `affidavitHasBirthCertificate`
   equals `false`.** Form N always prints "8. My knowledge of the details
   of my birth is based on...." directly beneath question 7's "I am
   in/not in possession of a Birth Certificate...", with no explicit
   conditional connecting the two — modelled as a disclosed interpretation
   choice (a birth-certificate holder has an obvious, unstated basis; an
   applicant without one is the case the question is actually aimed at).
6. **Form N's three school rows (Primary/Secondary/Post Secondary), each
   with a Name/From/To triple, are all left bare-optional.** Not every
   applicant reaches post-secondary education, and the form prints no
   conditional signal (e.g., a "did you attend?" checkbox) tying the
   From/To date columns to whether a row is filled in.
7. **`title` and `maritalStatus` are modelled as closed enums reflecting
   the form's own printed delete-non-applicable option lists** (Dr/Mr/Mrs/
   Miss; Single/Married/Widowed/(Divorced)), matching this registry's
   established convention for "cross out words which do not apply" fields
   over free-text.
8. **The DNRPC has no independent website.** Form N's own letterhead names
   "MINISTRY OF HOME AFFAIRS, DEPARTMENT OF NATIONAL REGISTRATION, PASSPORT
   AND CITIZENSHIP" as the issuing authority, but a web search for an
   official DNRPC domain returned only a Facebook page and third-party
   citations — no dedicated department website. `authority.url` is set to
   the MOFAIC Diaspora Portal (`https://www.mofaic.gov.zm/diasporaportal/`),
   the live government site that hosts and distributes this form, per the
   same convention this registry uses when an issuing agency has no
   dedicated web presence of its own.
9. **Excluded as official/witness-only fields, not applicant-supplied
   data:** the page 1 "File No." box and "Stocked by CPO" circle, page 3's
   "FOR OFFICIAL USE ONLY / DOCUMENTS PRODUCED TO BE NOTED HERE" checklist
   table, page 4's "FOR OFFICIAL USE ONLY / Amount of fee paid" box, and
   Form N's "Commissioner for Oaths" signature line — none of these are
   values the applicant supplies.

## Scope

Models 117 `fields[]` across 13 steps (Eligibility Gates; Section 1
Personal Details; Section 1 Personal Description; Section 2 Married Women;
Section 3 National Status; Section 4 Born Outside Zambia; Section 5 Travel
Details; Section 6 Declaration; Section 7 Recommender; Section 8 Lost
Passport Particulars; Section 9 Supplementary Information; Section 10
Parent of Legal Guardian's Consent; Form N Affidavit of Birth). 3 valid
mock scenarios (a single adult applicant with no conditional sections
triggered; a married woman born outside Zambia whose husband was also born
outside Zambia and whose birth was registered at a consulate abroad,
exercising every nested `requiredWhen` branch; a minor applicant with a
lost previous passport reported to the police, requiring guardian consent)
plus 11 mutation-control fixtures (one missing statically-required field,
seven missing individual `requiredWhen`-true fields spanning every
conditional family including both nested-condition pairs, an invalid enum
value, and an unknown top-level field) are committed under
`conformance/zm/dnrpc/passport-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 14 fixtures: all 3 valid scenarios at 0
errors, all 11 mutation controls each raising exactly 1 error, and
confirmed every `requiredWhen` field reference resolves (0 dangling
references). Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run.
