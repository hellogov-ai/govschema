# Verification record — et/mor/individual-tin-registration@1.0.0

## Candidate selection

GOV-4246 ("GovSchema Standard Research"). This cycle re-scanned CATALOG.md's
own Known Gaps section and By-Jurisdiction table fresh, re-confirmed the
routine's 4 standing National ID candidates (DE Steuer-ID, SG NRIC loss/
damage + re-registration, NZ RealMe, remaining voter registration) all
remain resolved, and found that Malta (the most recently deepened
jurisdiction) had reached 5 of 6 verticals with only Taxes remaining as a
confirmed dead end — i.e. essentially exhausted for this cycle. Rather than
force a re-screen of a gated Malta Taxes source, this cycle instead scouted
3 single-vertical-published jurisdictions (Georgia, Ethiopia, Uzbekistan —
each already in the registry with only its Visa vertical authored) across
their 5 remaining verticals apiece, via 3 parallel research passes:

- **Georgia**: Business Formation (NAPR's downloadable LLC founding-agreement
  `.docx` template) came back STRONG; Taxes came back WEAK (a real
  Ministry-of-Finance-ordered declaration form likely exists in law, but its
  rendered field content was not pinned down this cycle); Passport and
  National ID both came back WEAK/DEAD END (prose-only process pages, no
  downloadable form, real filing is via a login-gated e-service); DMV came
  back a hard DEAD END (exam-booking only, no form artifact of any kind).
  Left as disclosed, ready-to-author backlog — see CATALOG.md's Known Gaps
  section.
- **Ethiopia**: Taxes (this schema, the Ministry of Revenue's TIN
  Registration Form) and Business Formation (the Ethiopian Investment
  Commission's Investment Permit Application) both came back STRONG;
  Passport came back STRONG-with-caveat (a consular-embassy-mirrored copy of
  the same underlying form, not the current domestic online-portal variant,
  worth double-checking before authoring); National ID (Fayda/NIDP) and
  Driving Licence both remain DEAD ENDs (in-person biometric enrollment
  only; no field-level downloadable form found for either, confirming the
  prior cycle's own "weaker" characterization). Business Formation and
  Passport are left as disclosed, ready-to-author backlog for a future
  cycle — see CATALOG.md's Known Gaps section.
- **Uzbekistan**: all 5 remaining verticals confirmed WEAK/DEAD END this
  cycle. `my.gov.uz`'s services are consistently unauthenticated at the
  description/overview level but require a login/digital-signature session
  for any actual field-level form, across Taxes, Business Formation,
  Passport, National ID, and Driving Licence alike — extending and
  confirming the prior cycle's own partial finding to cover all 5
  verticals, not just some.

Picked Ethiopia's TIN Registration Form as the strongest, cleanest
candidate: a directly downloadable PDF served from the Ministry of
Revenue's own public `/api/forms` listing, with no login/CAPTCHA/WAF gate
at any point in retrieval. Opens Ethiopia's Taxes vertical (2 of 6; Visa,
`et/ics/e-visa-application`, was already published).

## Reaching the live source

Target: `https://www.mor.gov.et/Forms/1758114796961-717652740-form-TIN%20Registration%20Form%20For%20individual%2027.7.2017%20-%20Copy.pdf`.

- The Ministry of Revenue's own public forms API,
  `https://www.mor.gov.et/api/forms`, was fetched directly and lists this
  form as entry id 8: title "በግብር ከፋይነት ለመመዝገብ (ግለሰብ) የሚቀርብ ማመመልከቻ ቅፅ"
  ("Application form for registering as an individual taxpayer"), category
  "የታክስ ከፋዮች ምዝገባ ቅፆች" / "Tax Payers Registration Forms", with a direct
  `pdfFile` URL matching the target above.
- `mor.gov.et`'s TLS certificate chain required an insecure-mode (`-k`)
  bypass from this sandbox's CA trust store to connect at all, but once
  connected the served content itself carries no login/CAPTCHA/WAF gate of
  any kind — confirmed by fetching both the API listing and the PDF itself
  directly.
- HTTP 200, `Content-Type: application/pdf`, 1,162,355 bytes.
- sha256 of the retrieved bytes: `fc664f2147b2631821535a8a93023f722dd08db66795dcfc9840cb9c0224a292`.
  Independently re-fetched and re-hashed this cycle (not trusted from any
  prior scouting pass's report alone), consistent with this registry's
  standing skepticism practice.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.5`. All 4 pages
  return `page.getAnnotations()` with 0 entries — a flat, print-and-fill
  specimen, not an interactive AcroForm PDF.

## Extraction method

`pdfjs-dist`'s standard `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist/legacy/build/pdf.js`, the CommonJS legacy
build) decodes both the Amharic and English text cleanly — no custom
glyph-index font encoding or ToUnicode CMap workaround needed, the same
outcome this registry has now confirmed for every Ethiopian and Maltese
flat/scanned PDF screened to date. Text was rendered per page, grouped by
y-coordinate row (3-unit tolerance) and sorted by x-coordinate, to
reconstruct each bilingual field label in its printed layout position;
raw per-item x/y coordinates were also inspected directly to disambiguate
section boundaries (e.g. confirming the three Type of Application options
are stacked vertically as separate checkbox-style lines, not a single run
of text).

Page 1 was independently confirmed to carry 0 extractable text items and
only 8 drawing operators (a cover/letterhead page bearing the national
emblem, no applicant-facing content) — excluded from field extraction on
that basis, not merely assumed empty.

Models 34 `fields[]` across 6 steps (Registration & Occupation; Personal
Details; Additional Personal Details; Residential Address; Business
Address; Certification) plus 3 `documents[]` entries.

## Disclosed source-fidelity findings

1. **The form's own blanket "fill all fields / use N/A" instruction drives
   `required: true` for the great majority of fields.** The printed
   instructions read, verbatim: "Fill all fields ... Mark 'N/A' for not
   relevant." Because "N/A" is itself a valid literal value satisfying a
   `required: true` string field, every field without a *more specific*
   printed conditional of its own — including the Ethiopian Digital ID
   (Fayda) number (a still-rolling-out national program, not yet
   universally issued, confirmed by this cycle's own separate Ethiopia
   National-ID scouting pass), and the entire Spouse Name and Business
   Address blocks (both plainly headed, with no printed marital-status or
   business-ownership checkbox of their own) — is modelled `required: true`
   per this blanket instruction, rather than left optional by an assumption
   the printed text does not support. This is a deliberate departure from
   this registry's more typical practice of leaving a plausibly-inapplicable
   field optional absent a printed gate; here the form's own instruction
   text explicitly accounts for inapplicability via a literal fill-in value,
   so `required: true` is the more source-faithful choice.

2. **The two "(For non-Ethiopians)" fields carry a narrower, more specific
   printed conditional, and are `requiredWhen`-gated accordingly.**
   Citizenship and Work Permit No. are each printed with the qualifier
   "(ለውጭ ሀገር ዜጎች) / (For non-Ethiopians)" — a condition narrower than the
   form's general fill-all/N/A instruction and specific to a fact
   (non-Ethiopian citizenship) the form does not otherwise ask directly.
   Modelled as `requiredWhen` a directly-supplied `isNonEthiopianCitizen`
   boolean gate is true — the same directly-supplied-boolean-gate
   convention this registry's own `mt/identita/national-identity-card-application`
   (`addressHasChanged`) established for a printed conditional with no
   checkbox of its own. The accompanying `workPermitDocument` attachment is
   gated the same way, reflecting the Attachments block's own closing
   clause, "work permit (for foreigners)."

3. **Ethiopian personal-name convention, not a Western surname split.**
   Ethiopian names follow a given-name/father's-name/grandfather's-name
   convention rather than a Western given-name/surname split. Modelled as
   `firstName`/`middleName`/`lastName` for both the applicant's own name and
   mother's name, with `lastName` representing the paternal grandfather's
   given name per this convention — disclosed here rather than silently
   mismatched against a Western surname assumption a consuming agent might
   otherwise bring to a `lastName` field.

4. **Certification block's "Full Name" line excluded as redundant.** Page
   4's Certification block reprints a "ስም ከነአያት/ Full Name" line alongside
   the signature and date; this is excluded as a redundant restatement of
   `firstName`/`middleName`/`lastName` already captured in Personal Details,
   rather than modelled as a duplicate field.

5. **Office-use reverse side of page 4 excluded as back-office data.** The
   block printed under the heading "በታክስ ባለስልጣኑ ባለሙያ ብቻ የሚሞላ/ TO BE USED BY
   TAX AUTHORITY ONLY" — the registering officer's name/employee ID/
   signature/date, the authorizing official's name/employee ID/signature/
   date, the tax-center name, the assigned TIN, and the file number — is
   excluded in full, since none of it is applicant-supplied.

## Conformance

2 valid mock scenarios and 7 mutation-control fixtures committed under
`conformance/et/mor/individual-tin-registration/1.0.0/`:

- `valid-ethiopian-trader-with-business-address.json` — an Ethiopian
  citizen, Trader occupation, a real business address, no citizenship/work-
  permit fields supplied (gate false).
- `valid-non-ethiopian-employee.json` — a non-Ethiopian citizen (Ghanaian),
  Employee occupation, citizenship and work-permit number supplied (gate
  true), the entire Business Address block filled with the literal "N/A"
  per the form's own fill-all/N/A convention.
- 7 mutation controls: a missing statically-required field
  (`mutation-missing-firstname-required.json`); an invalid `applicationType`
  enum value (`mutation-invalid-applicationtype-enum.json`); an invalid
  `occupation` enum value (`mutation-invalid-occupation-enum.json`); a
  missing `citizenship` while `isNonEthiopianCitizen` is true
  (`mutation-missing-citizenship-requiredwhen.json`); a missing
  `workPermitNumber` while `isNonEthiopianCitizen` is true
  (`mutation-missing-workpermitnumber-requiredwhen.json`); a missing
  `signature` (`mutation-missing-signature-required.json`); and an unknown
  top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 9: both valid scenarios at 0 errors, all
7 mutation controls each raising exactly 1 error, and confirmed every
`requiredWhen` field reference resolves (0 dangling references).

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(586/586 both), individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/` (585 → 586 entries).
