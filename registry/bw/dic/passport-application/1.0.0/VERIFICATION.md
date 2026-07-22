# Verification record — bw/dic/passport-application@1.0.0

## Candidate selection

GOV-4328 ("GovSchema Standard Research", 2026-07-22). Closes Botswana's own
pre-scouted, STRONG banked backlog left open by the GOV-4307 cycle (see
CATALOG.md's Known Gaps entry 0e) — Form PP1 Rev, the last of four
disclosed-STRONG Botswana verticals (Taxes, Visa, DMV, Passport) remaining
unauthored after GOV-4321 authored Visa (`bw/dic/visa-application@1.0.0`).
Opens Botswana's Passport vertical (4 of 6); Botswana's other two screened
verticals (Business Formation, National ID) remain confirmed dead ends per
the GOV-4307 cycle's own six-vertical screening pass.

## Reaching the live source

Independently re-fetched and re-hashed rather than trusted from the prior
cycle's own banked report alone:

- `https://www.botswanaembassy.org/sites/default/files/documents/Botswana_Passport_Application_Form.pdf`
- HTTP 200, `Content-Type: application/pdf`, 123,496 bytes (byte-for-byte
  match with the GOV-4307 cycle's own reported size).
- sha256 `7ea390948b63c0a43aeae95432f5b7abbef62faff999db9e1499c54020abada7`.
- Begins `%PDF-1.4`. Confirmed mechanically: zero `/AcroForm`, `/Widget`,
  and `/FT` occurrences in the raw bytes (a flat, print-and-fill specimen,
  not an interactive AcroForm PDF), and exactly 7 `/Type/Page` objects.
- `gov.bw` itself WAF-blocks this particular form's own hosting path
  directly (per the GOV-4307 cycle's own disclosed finding); this
  Botswana-embassy mirror is unauthenticated and ungated. Its letterhead,
  form number (PP1 Rev), and section structure match the Department of
  Immigration and Citizenship's other Botswana-government-hosted forms
  (Form 1 Visa, Form DL1) in layout convention, corroborating it as the
  standard specimen rather than a stale or altered mirror.

## Extraction method

Text extracted via `pdfjs-dist`'s `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist` from prior cycles), grouped by y-coordinate
row and sorted by x-coordinate. All 7 pages additionally rendered to PNG at
2.5x scale via `pdfjs-dist` + `node-canvas` (vendored at
`/tmp/node_modules/canvas`) and visually cross-checked against the extracted
text for every checkbox grid and box-grouping described in the findings
below — this form's dense multi-column box layout (e.g. Section 2's
Father/Mother columns, Section 4's Chief/Headman box grid) is materially
under-represented by text position alone.

## Document structure

The PDF's 7 pages: page 1 (Passport Type, delivery preference, collection
signature); page 2 (Notes on Completing the Application Form — informational,
no applicant-facing fields); pages 3-5 (Sections 1-5: Personal Details,
Parents' Details, Next of Kin, Traditional Authority, Parent/Legal Guardian's
Consent); page 6 (Section 6: Declaration by the Applicant, plus specimen
signature boxes); page 7 (entirely "For Official Use Only" — excluded, see
Finding 10 below).

Models 72 `fields[]` across 8 steps (Eligibility Gates; Passport Type and
Delivery; Section 1 Personal Details; Section 2 Parents' Details; Section 3
Next of Kin; Section 4 Traditional Authority; Section 5 Parent or Legal
Guardian's Consent; Section 6 Declaration) plus 4 `documents[]` entries.

## Disclosed source-fidelity findings

1. **`passportType` confirmed via rendered image as a genuine 2x2 checkbox
   grid (Local/Official/National/Diplomatic), each with its own printed
   box.** The raw text layer alone ("Local Official" / "National
   Diplomatic" as two text rows) under-represents the true 4-option
   single-select structure; a targeted crop of the rendered PNG confirms
   all four options each carry their own checkbox glyph, unlike the
   sibling `bw/dic/visa-application`'s Sex row (only one option of two
   printed a box). Modelled as a required 4-value enum.
2. **`passportSentToName`/`passportSentToAddress` and
   `collectedByName`/`collectedByAddress` modelled as two independent,
   unconditionally optional blocks, with no selector gating one on the
   other.** Page 1 prints "Passport to be sent to (Name)/Address" and "Or
   Collected by sent to (Name)/Address" as two side-by-side box groups with
   no checkbox choosing between them — an applicant fills in whichever
   delivery method applies and leaves the other blank. This registry's own
   established disclose-rather-than-fabricate convention (e.g.
   `bw/dic/visa-application` Finding 7) is followed rather than inventing
   an unprinted `deliveryMethod` selector or an either/or validation rule
   the source does not state. The signature/date line beneath these blocks
   ("To be signed by the person collecting the Passport at the time of
   collection") is excluded — it is completed later, at physical
   collection, not at application time.
3. **`applicantIsMinor` is a directly-supplied, unprinted boolean
   eligibility gate, not derived from `dateOfBirth`.** Section 5's own
   header reads "Consent of Parent or Legal Guardian: (To be completed if
   the applicant is under 21 years of age)" — the same unprinted-condition
   convention this registry's Zambia (`zm/dnrpc/passport-application`),
   Ethiopia, Malta, and Cyprus passport schemas use for their own
   section-applicability gates, since GSP-0013's `Condition` grammar has
   no date-arithmetic/age-derivation operator to compute this from
   `dateOfBirth` directly. Note 3 on page 2 of the source's own completion
   notes cites this same conditional but mislabels it "Section 1b" ("Legal
   Guardian's consent (Section 1b) to be completed when the applicant is a
   minor under the age of 21 years") — the actual guardian-consent section
   is unambiguously Section 5 per its own printed heading; this
   cross-reference mismatch is disclosed here as a printed error in the
   source's own notes, not resolved or silently corrected.
4. **`applicantOverSixteen` is a second directly-supplied, unprinted
   boolean eligibility gate, drawn from the form's own completion notes
   rather than a section header.** Notes page item 1 (page 2 of the
   source) reads "All applications for Botswana passports in respect of
   applicants over 16 years must be supported by a National Registration
   Identity Card (O Mang). Only in extremely exceptional circumstances
   shall a birth certificate or an affidavit in lieu of birth certificate
   completed by a parent on behalf of the applicant and attested by
   Commissioner of Oaths, be accepted." This gates two mutually exclusive
   `documents[]` entries (`nationalIdOmang` requiredWhen true;
   `birthCertificateOrAffidavit` requiredWhen false) rather than modelling
   a single ambiguous "identity evidence" document.
5. **Section 2 (Parents' Details) fields are modelled as required for both
   Father and Mother, except `fatherPreviousNationality`/
   `motherPreviousNationality`, left optional.** The source prints no
   optionality marker anywhere in Section 2, unlike Section 5's own
   explicit age-based conditional — but "Previous Nationality" only
   logically applies to a parent whose nationality changed (e.g. through
   naturalization), so it is modelled optional as a disclosed judgment
   call, while every other Section 2 field (name, address, date/place/
   country of birth, present nationality) is modelled required per the
   source's own lack of an optionality marker.
6. **Section 4 (traditional-authority particulars: Chief, Headman, Ward,
   Kgotla/Town/Village, District) is modelled as unconditionally
   required**, since the source prints no "if applicable" annotation
   distinguishing it from Sections 1-3 — disclosed here since an urban
   applicant without a personal Chief/Headman affiliation may find this
   section's universal requiredness a practical burden the source itself
   does not address.
7. **`distinguishingMarks` modelled as the sole optional field within
   Section 1's personal-description block.** Unlike
   height/colour-of-hair/colour-of-eyes (universal physical descriptors
   every applicant has an answer for), not every applicant has a
   distinguishing mark — the source prints no optionality marker, but this
   is the same judgment-call convention this registry applies to
   comparable "identifying marks" fields elsewhere (disclosed rather than
   silently defaulted).
8. **`heightMetres`/`heightCentimetres` modelled as two separate integer
   fields**, matching the source's own two adjacent boxes ("Height: [box]
   Metres [box] Cm") and this registry's established precedent for the
   same split in `zm/dnrpc/passport-application`.
9. **`detailsOfLegalCustody` modelled bare-optional, not gated on
   `applicantIsMinor`.** Section 5 prints "(If relationship not father or
   mother circumstances and proof of legal custody must be provided)" as a
   free-standing conditional instruction with no separate checkbox of its
   own — the same disclosed no-printed-signal treatment this registry's
   Zambia/Ethiopia passport schemas use for their own analogous ungated
   optional fields (e.g. `zm/dnrpc/passport-application`'s
   `sponsoringGovernmentDepartment`).
10. **Page 7's entire "For Official Use Only" section is excluded,
    including its own "APPLICANT'S IDENTIFYING DOCUMENTS" checklist**
    (Birth Certificate/National Reg. ID/Marriage Particulars/Adoption
    Papers/Others tick-boxes) — despite its heading naming the applicant's
    documents, the whole page sits beneath the page's own "For Official Use
    Only" banner and is completed by DIC staff recording which documents
    were physically produced, receipt/fee particulars, and
    application-checked-by sign-off, none of which is applicant-supplied
    data.

## Conformance

3 valid mock scenarios (an adult applicant with National ID Omang identity
evidence and no guardian consent triggered; a minor applicant under 21
triggering full guardian consent, with birth-certificate identity evidence;
an adult applicant using the collected-by delivery method with a
distinguishing mark disclosed) plus 14 mutation-control fixtures (a missing
statically-required field for each of `passportType`, `title`, `surname`,
`dateOfBirth`, `nationalStatus`, `fatherSurname`, `motherSurname`,
`nextOfKinSurname`, `nameOfChief`, `district`, and `applicantSignature`; a
missing `requiredWhen`-true `guardianSurname` while `applicantIsMinor` is
true; an invalid `passportType` enum value; and an unknown top-level field)
are committed under `conformance/bw/dic/passport-application/1.0.0/`,
matching this registry's established fixture convention of validating
`fields[]` values only — the `documents[]` array's own two conditional
entries (`nationalIdOmang`/`birthCertificateOrAffidavit`) are exercised by
the two `applicantOverSixteen` branches already covered across the 3 valid
scenarios, not by separate mutation fixtures, since this registry's fixture
format has no document-satisfaction representation.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 17 fixtures: all 3 valid scenarios at 0
errors, all 14 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field reference resolves (0 dangling references).
Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs`, individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
