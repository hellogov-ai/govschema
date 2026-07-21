# Verification record — mt/identita/passport-application@1.0.0

## Candidate selection

GOV-4217 ("GovSchema Standard Research", parent GOV-4215). Deepens Malta
past its first published schema
(`mt/jobsplus/self-employed-declaration-of-commencement`, GOV-4172,
Business Formation), opening the Passport vertical (2 of 6) via Identità's
own Form A.

## Reaching the live source

Target: `https://identita.gov.mt/form-a/`, which 301-redirects to
`https://identita.gov.mt/wp-content/uploads/2026/03/Form-A.pdf`.

- Fetched directly with a realistic desktop Chrome User-Agent (no
  intermediate summarizer tooling needed this cycle): HTTP 200,
  `Content-Type: application/pdf`, 621,516 bytes — byte-identical to the
  count in this issue's own scouting description.
- sha256 of the retrieved bytes: `61f2a8860f0cfaa3d5a0f4c096b8549fa2b837e90b4fdb565e3fb70e2cabeb5d`.
- No login, CAPTCHA, or Cloudflare/WAF gate on the asset itself.
- Confirmed mechanically, not asserted from memory: the retrieved bytes
  begin `%PDF-1.4` and contain **zero** `/AcroForm` or `/Widget`
  occurrences — a flat, print-and-fill specimen, not an interactive
  AcroForm PDF. Object-count check confirms exactly 8 `/Type/Page` objects
  (excluding the 1 `/Type/Pages` tree root), matching the issue's own
  "8-page" description.

## Extraction method

This PDF's own text-showing operators use a custom glyph-index font
encoding — a `zlib`-stream/paren-regex read of the raw content streams
renders as garbled glyph runs (e.g. `8931! 112!!355!'+1`), not readable
text. Rather than falling back to a rendered-page-image visual read, this
cycle used `pdfjs-dist` (already vendored at `/tmp/node_modules/pdfjs-dist`
from prior cycles) to run this PDF's own embedded `ToUnicode` CMaps
(present for every one of its 6 Type0/Identity-H font resources) through
its real text-layer extraction path, recovering clean, position-tagged
Unicode text for every one of the 8 pages directly from the PDF's own
glyph-to-Unicode mapping — not an OCR guess or an intermediate
summarizer's paraphrase. Text was rendered per page, grouped by y-coordinate
row and sorted by x-coordinate, to reconstruct each bilingual
(Maltese/English) field label and its layout position.

Field-by-field application-track guidance was additionally cross-referenced
against three of Identità's own service pages, all retrieved directly
(HTTP 200, no login, server-rendered plain English HTML):

- `https://identita.gov.mt/passport-office-adults-first-time/`
- `https://identita.gov.mt/passport-office-adults-renewals/`
- `https://identita.gov.mt/passport-office-minors-first-time-renewal-6-to-9-years/`

Excluded from `fields[]`: pages 6-7 (the form's own bilingual Privacy
Policy, informational prose only, no applicant input) and page 8 ("FOR
OFFICIAL USE ONLY" — front-office/back-office receipt numbers, officer
signatures and stamps, biometric-capturing/database/validation sign-offs),
none of which are applicant-supplied data.

Models 80 `fields[]` across 10 steps mirroring the form's own numbered
sections (01 Applicant's Details; 02 Parents' Details; 03 Details of
Spouse/Partner in Marriage/Civil Union/Legal Cohabitation; 03a Details of
Parents of Spouse/Partner; 04 Details of Citizenship; 05 Previous Passport;
06 Parent's/Tutor's Consent; 07 Declaration of Recommender; 08 Seeing AI on
Passport; 09 Declaration by the Applicant), plus 8 `documents[]` entries (4
physical/attachment documents, 4 attestation statements quoting the form's
own declaration text).

## Disclosed source-fidelity findings

1. **Asterisk convention differs from this registry's other Identità-family
   form.** This form's asterisks do not mark required fields (unlike
   `mt/jobsplus/self-employed-declaration-of-commencement`, where an
   asterisk does mean mandatory). The only two field-level asterisks
   (`Sex*`/`Marital status*`) sit beside a footnote reading "Tick the box
   as necessary" — i.e. the asterisk here flags a checkbox-style field, not
   a required one; a third asterisk beside "Signature*" in Section 9
   carries its own distinct footnote ("*Applicants under 18 years of age
   need not sign this declaration"). Since Section 01 therefore carries no
   printed required/optional signal for any of its fields,
   `surname`/`name`/`sex`/`dateOfBirth`/`identityCardNumber`/`placeOfBirth`/
   `countryOfBirth`/`maritalStatus`/`address`/`cityTown`/`postalCode` are
   modelled `required: true` as the core demographic/identity particulars
   necessary to process any passport application, while
   `email`/`telephoneNumber`/`mobileNumber` are modelled `required: false`
   as convenience contact fields, absent any printed distinguishing signal
   either way.

2. **Section 02 (Parents' Details) modelled unconditionally required.**
   This section carries no conditional note anywhere on the form (unlike
   Sections 3/4/5/6, each of which opens with an explicit "to be completed
   only if..." instruction), and Identità's own per-track service pages
   (Adults First-Time, Adults Renewals, and the Minors 6-9-years track)
   each list "Form A with sections 1, 2, ..." among their required
   sections regardless of track. Every field in Section 02, including the
   applicant's two grandparents' name/surname/country-of-birth, is
   therefore modelled `required: true` unconditionally — the same
   "whole-section-required, no printed within-section distinction"
   treatment `cy/crmd/passport-application` gave its own Sections II/III.

3. **Section 03's compound eligibility condition modelled as a
   directly-supplied boolean gate.** Section 03's own note reads,
   verbatim: "This part must be filled in only by those who are married,
   in a civil union, in a legal cohabitation, widowed or separated and who
   are applying for the first time, or by those who changed their
   name/surname since the issue of the last passport held. However, if you
   already had a passport issued after 01.01.1998 and your personal
   details remained unchanged, go to Section 5." This compound condition
   (a marital-status category AND (first application OR a name/surname
   change) AND NOT already holding an unchanged post-01.01.1998 passport)
   has no single GSP-0013 `requiredWhen` primitive to express directly, so
   it is modelled as a directly-supplied boolean gate, `spouseSectionApplies`
   — the same convention `cy/crmd/passport-application` established for its
   own `applicantIsMinor` — with the full compound condition disclosed here
   rather than partially encoded against `maritalStatus` alone. Section 03a
   ("Details of Parents of Spouse/Partner") is gated on the same
   `spouseSectionApplies`, since it is structurally the continuation of the
   same party's details the Section 03 note scopes.

4. **Section 04's citizenship-acquisition condition, same treatment.**
   Section 04's own note ties the whole section to becoming "a Maltese
   citizen through Registration, Naturalisation, Dual Nationality, upon
   marriage or civil union to a citizen of Malta" — modelled as a
   directly-supplied boolean gate, `citizenshipSectionApplies`, again not a
   printed checkbox, since no single field on the form distinguishes
   "citizen by birth" from these other routes. The section's own two
   mutually exclusive checkbox-style declarations ("I am also a citizen of
   (state country)" with a blank line; "I am not a citizen of any other
   country", no blank line) are modelled as `dualCitizenshipStatus` (enum)
   plus a dependent `otherCitizenshipCountry`, the same
   enum-plus-dependent-text-field convention
   `mt/jobsplus/self-employed-declaration-of-commencement` used for its own
   `applicantNationalityCategory`/`applicantNationalityCountry` pair.

5. **Section 05's implicit condition, same treatment.** Section 05's own
   note ("If you already have a passport, please submit it with this
   application and write down the number, date and country from where the
   passport was issued.") has no printed checkbox either — modelled as a
   directly-supplied boolean gate, `hasPreviousPassport`, the same
   convention `cy/crmd/passport-application` used for its own
   `hasOtherCyprusPassport`/`hasForeignPassport`/`hasLostCyprusPassport`
   fields.

6. **Section 07 gated on Section 06's own printed cross-reference, with the
   adult-track trigger disclosed rather than encoded.** Section 06's own
   printed instruction states the recommender "must sign this part
   [Section 6] and section 7 only after establishing the identity of the
   two parents" whenever Section 6 applies — so every Section 07 field is
   modelled `requiredWhen applicantIsMinor equals true`, directly per this
   printed tie between the two sections. Identità's own "Adults
   First-Time"/"Adults Renewals" service pages additionally require
   Section 7 from an *adult* applicant who resides abroad without a valid
   Maltese ID card (an alternative, recommender-endorsed-photo path) — a
   condition with no corresponding field anywhere on the printed form
   itself, so this adult-track trigger is disclosed as informational
   context rather than encoded as a second `requiredWhen` path, the same
   "disclose rather than fabricate an unprinted field" treatment
   `mt/jobsplus/self-employed-declaration-of-commencement`'s own Finding 4
   (Employment Licence sub-categories) and `cy/crmd/passport-application`'s
   own Finding 4 (guardian-instead-of-parents alternative) each gave an
   analogous external-guidance-only condition.

7. **Combined name-and-surname boxes for grandparents.** The "Grandparent's
   name and surname of applicant (first/second parent)" rows (Section 02)
   and their Section 03a counterparts print a single combined
   name-and-surname box per grandparent, with no separate
   given-name/surname split — modelled as one `...NameAndSurname` field per
   grandparent rather than splitting into two, since the form itself does
   not split it.

## Conformance

2 valid mock scenarios and 8 mutation-control fixtures committed under
`conformance/mt/identita/passport-application/1.0.0/`:

- `valid-adult-first-time-single-no-history.json` — an adult, first-time
  applicant, single, born a Maltese citizen, with no previous passport and
  no spouse/civil-union details to declare.
- `valid-minor-with-parental-consent-and-recommender.json` — a minor
  applicant whose parent/tutor consent and recommender declaration are both
  completed, and who does not sign the Section 9 declaration per its own
  footnote.
- 8 mutation controls: a missing statically-required field
  (`mutation-missing-surname-required.json`); a missing `spouseName` while
  `spouseSectionApplies` is true
  (`mutation-missing-spousename-requiredwhen.json`); a missing
  `registrationOrNaturalizationCertificateNumber` while
  `citizenshipSectionApplies` is true
  (`mutation-missing-registrationcertnumber-requiredwhen.json`); a missing
  `otherCitizenshipCountry` while `dualCitizenshipStatus` is
  `HAS_OTHER_CITIZENSHIP`
  (`mutation-missing-othercitizenshipcountry-requiredwhen.json`); a missing
  `previousPassportNumber` while `hasPreviousPassport` is true
  (`mutation-missing-previouspassportnumber-requiredwhen.json`); a missing
  `minorApplicantFullName` while `applicantIsMinor` is true
  (`mutation-missing-minorapplicantfullname-requiredwhen.json`); an invalid
  `sex` enum value (`mutation-invalid-sex-enum.json`); and an unknown
  top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`/`documents[]`,
discarded after use, not committed) ran all 10: both valid scenarios at 0
errors, all 8 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field reference resolves (0 dangling references).

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(581/581 both), individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/` (580 → 581 entries).
