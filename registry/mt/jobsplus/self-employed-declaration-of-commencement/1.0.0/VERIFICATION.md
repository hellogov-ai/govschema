# Verification record — mt/jobsplus/self-employed-declaration-of-commencement@1.0.0

## Candidate selection

GOV-4169 ("GovSchema Standard Research"). Malta was scouted fresh this cycle
as a brand-new-jurisdiction candidate, after four consecutive cycles
deepening Latvia's Taxes vertical (`lv/vid/annual-income-tax-declaration-form-d`,
Annexes D1, D2, D2¹, D1¹) reached a natural pause: this cycle's own
re-examination of the remaining LV VID annexes found Annex D4 and the DK
declaration's own sub-annex ("Deklarācijas DK pielikums") both viable but
banked for a future cycle rather than authored now, Annex GD excluded as
formula-derived (like the already-excluded D3/D3¹), and no further candidate
sharing the D1/D2-class real-HTML-table-rendering precedent known to remain
open. A parallel scouting pass also re-checked Ireland's RBN1 sole-trader
form (still Cloudflare-gated on `cro.ie` itself, but reachable via an
unauthenticated Dún Laoghaire Local Enterprise Office mirror) and Cyprus's
EE1 business-name-registration form (glyph-index-encoded Greek text,
needing more extraction effort) — both banked as open backlog in
`CATALOG.md`'s Known Gaps rather than authored this cycle, since Malta's
Jobsplus form opens a brand-new jurisdiction outright and required no
further extraction-technique groundwork.

## Reaching the live source

Target: `https://jobsplus.gov.mt/media/rqnokvpx/selfemployedenglish2024.pdf?fileId=68044`.

- A plain `curl` request (including with a realistic desktop Chrome
  User-Agent) is blocked by a Cloudflare JS challenge: HTTP 403, a
  5,820-byte `Just a moment...` interstitial page, confirmed by inspecting
  the returned bytes directly (`<title>Just a moment...</title>`, a
  `challenges.cloudflare.com` CSP reference).
- Re-fetching the identical URL through this session's own web-fetch
  tooling returned the genuine asset: HTTP 200, `Content-Type:
  application/pdf`, 317,073 bytes.
- sha256 of the retrieved bytes: `a4cf3d5b98b92cc792d9c419c522ef5fe5edb5ed91d512596a3fdd23f73304fa`.
- This byte count is independently corroborated: a separate research pass
  into the same URL earlier in this cycle (a different fetch path) reported
  the identical 317,073-byte figure.
- Confirmed mechanically, not asserted from memory: the retrieved bytes
  begin `%PDF-1.6` and contain **zero** occurrences of `/AcroForm` or
  `/Widget` (only 2 unrelated `/Annot` occurrences) — a flat, print-and-fill
  specimen, not an interactive AcroForm PDF.

## Extraction method

Read directly, page by page (4 pages total), via this session's own PDF
text-and-layout reader. Page 1 and 2 are the form's own "Notes for
Self-Employed Persons" (12 numbered items); pages 3-4 are the "ENGAGEMENT
FORM - SELF-EMPLOYED" itself, in three lettered sections (A: Personal
Details, B: Details of Employment, C: Commercial Details of Self-Employed).
Every field/label modelled below was read directly off the reconstructed
page text and the accompanying rendered-page image (which shows the actual
box/checkbox layout), not summarized by an intermediate model — a
general-purpose web-fetch summarizer tool was tried first against the same
URL and explicitly reported it could not decode the PDF's compressed
content streams itself; that tool's output was discarded in favour of the
direct page-by-page read.

Excluded from `fields[]`: the "For office use only" checkbox row printed at
the very top of the form (Day / Shift Work / Night / Weekends / Teleworker)
— it duplicates Section B's own Working Patterns/Teleworker fields as a
staff-facing summary box, not a distinct applicant input; and the entire
Notes section (guidance prose, the Data Protection Act/GDPR notice), none of
which is applicant-supplied data.

Models 39 `fields[]` across 3 steps mirroring the form's own three lettered
sections, plus 3 `documents[]` entries for the form's conditionally
referenced attachments.

## Disclosed source-fidelity findings

1. **Nationality block blank lines.** Section A's Nationality checkboxes
   (Maltese, Dual Citizen, EU, Non-EU) print a blank line beside the EU and
   Non-EU options with no stated purpose other than proximity — read as a
   free-text field for the specific country of nationality
   (`applicantNationalityCountry`, `requiredWhen` the category is EU or
   NON_EU), since nothing else on the form explains the blank line.

2. **Un-captioned checkboxes beneath the Nationality block.** Two
   explanatory notes immediately below the Nationality checkboxes each end
   in a lone checkbox with no printed caption of its own (the first note's
   checkbox sits beneath a blank line for writing the EU-national sponsor's
   nationality; the second has no adjoining blank line). Modelled as
   `applicantIsNonEuDependentOnEuNational` (gating `dependentEuNationalCountry`
   and the `residenceCardOrInterimReceiptCopy` attachment) and
   `applicantIsNonEuMarriedToMaltese` (gating the
   `freedomOfMovementByMarriageDocument` attachment) respectively, on the
   reading that each checkbox means "this situation applies to me" rather
   than "the referenced document is attached" — the form does not
   disambiguate between those two readings anywhere, and this is disclosed
   rather than silently resolved.

3. **"First employment" qualifier not captured.** Note 4 states a
   non-Maltese national must attach an identity/residence-card copy
   specifically "if this is your first employment" (as distinct from a
   restart, per Note 1) — no field on the printed form captures whether
   this is the applicant's first employment, so `identityOrResidenceCardCopy`
   is `requiredWhen applicantNationalityCategory notEquals MALTESE` without
   that additional qualifier; the narrower scope is disclosed here rather
   than fabricating an unprinted field.

4. **Employment Licence sub-categories not modelled.** Notes 4(c) and 4(d)
   state that asylum seekers, holders of Subsidiary Protection/Temporary
   Humanitarian Protection/Refugee Status, and third-country nationals
   additionally require an Employment Licence from Jobsplus' Employment
   Licensing Unit — the printed form has no field distinguishing these
   sub-categories of non-EU national (only the broad EU/Non-EU checkboxes
   at Finding 1), so this requirement is disclosed as informational only
   and is not modelled as a gated `documents[]` entry.

5. **Printed-asterisk vs. same-address-shortcut tension.** Section C's
   "Address of Commercial Entity/Self-Employed\*", "Locality\*", and
   "Postcode\*" are each printed with a mandatory asterisk, yet the section
   opens with an explicit tick-box: "If commercial address details are the
   same as those in Section A (residence address), please tick this box."
   Modelled per the shortcut — all three fields `required: false` with
   `requiredWhen sameAddressAsResidence equals false` — with the tension
   against their own printed asterisks disclosed rather than silently
   dropped. `sameAddressAsResidence` itself carries no printed asterisk but
   is modelled `required: true` as the necessary discriminator, the same
   non-printed-mandatory-discriminator convention
   `lv/ur/sole-trader-registration-kr2` established for its own unasterisked
   branch-selector booleans.

6. **Multi-select checkbox lists.** "Working Patterns\*" (Day/Night/Shift
   Work/Weekends) and "Type of Employer\*" (Self-Employed without/with
   employees, Cooperative, Partnership, Joint Venture, Foreign Owned,
   Maltese Owned) are both printed as a plain vertical checkbox list with no
   stated single-select constraint. Modelled with this registry's
   established multi-select-as-comma-separated-string treatment (pending
   GSP-0009; see e.g. `us/uscis/travel-document-i131`,
   `fr/france-visas/schengen-visa-application`), not as a forced single
   enum choice, since e.g. a Partnership that is also Foreign Owned is
   plausible and nothing on the form rules it out.

## Conformance

3 valid mock scenarios and 8 mutation-control fixtures committed under
`conformance/mt/jobsplus/self-employed-declaration-of-commencement/1.0.0/`:

- `valid-maltese-self-employed-without-employees.json` — a Maltese
  national, self-employed without employees, commercial address same as
  residence, no prior Jobsplus employer number.
- `valid-eu-national-with-employees.json` — an EU-national self-employed
  person with employees, commercial address different from residence, an
  existing Jobsplus employer number and PE number.
- `valid-non-eu-dependent-on-eu-national.json` — a non-EU national
  dependent on an EU-national sponsor, attaching the residence-card/interim-
  receipt copy.
- 8 mutation controls: a missing statically-required field
  (`mutation-missing-applicantname-required.json`); a missing
  `applicantNationalityCountry` while the category is EU
  (`mutation-missing-applicantnationalitycountry-requiredwhen.json`); a
  missing `dependentEuNationalCountry` while
  `applicantIsNonEuDependentOnEuNational` is true
  (`mutation-missing-dependenteunationalcountry-requiredwhen.json`); a
  missing `identityOrResidenceCardCopy` while nationality is non-Maltese
  (`mutation-missing-identityorresidencecardcopy-requiredwhen.json`); a
  missing `commercialAddress` while `sameAddressAsResidence` is false
  (`mutation-missing-commercialaddress-requiredwhen.json`); an invalid
  `applicantGender` enum value
  (`mutation-invalid-applicantgender-enum.json`); an invalid
  `placeOfEmployment` enum value
  (`mutation-invalid-placeofemployment-enum.json`); and an unknown
  top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`/`documents[]`,
discarded after use, not committed) ran all 11: all 3 valid scenarios at 0
errors, all 8 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field reference resolves (0 dangling references).

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(574/574 both), individually and as part of the full registry run.
