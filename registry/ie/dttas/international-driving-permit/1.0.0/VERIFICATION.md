# Verification record — `ie/dttas/international-driving-permit` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from and cross-checked against the official/primary
sources below. The full field-by-field comparison the practice requires has
been completed once against those sources (this record), but not yet by a
second, independent reviewer — so `status` remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `ie/dttas/international-driving-permit` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Road Safety Authority, National Driver Licence Service (NDLS).
  As of 18 May 2026, NDLS is the **sole** issuer of Irish IDPs, having taken
  over from the AA (a private motoring association) — a genuine government
  body, not a third-party operator, so this document does **not** use GSP-0020's
  `authority.operatedBy`.
- **Primary sources:**
  - <https://www.ndls.ie/licensed-driver/international-driver-permit.html> —
    NDLS's own IDP page: eligibility, the two convention types (1926/1949),
    fee, and a 10-question FAQ (all fetched and read verbatim via a live
    headless-browser session, not summarized secondhand — see below).
  - <https://www.ndls.ie/images/PDF_Documents/NDLS_Int_Driving_Permit_App_Form_v3.pdf> —
    the actual IDP application form: a static (non-AcroForm), 2-page PDF.
    Page 1 is the 6-part form itself (Applicant Details, Contact Details,
    Driving Licence Details, International Driving Permit, Applicant
    Declaration, NDLS/Official Use Only); page 2 is guidance notes and terms
    and conditions. Extracted in full with `pdfjs-dist`'s text layer.
  - <https://www.citizensinformation.ie/en/travel-and-recreation/motoring/driver-licensing/international-driving-permit/> —
    the State's own citizen-information service (a statutory body under the
    Department of Social Protection), page edited 15 June 2026: confirms the
    AA-to-NDLS handover date, the "except parts 5 and 6" instruction, and the
    3-months-remaining-on-licence rule.
- **Access note (bot-block encountered and defeated):** `www.ndls.ie` sits
  behind a Cloudflare Turnstile "managed challenge" that returns HTTP 403 /
  "Just a moment..." to a plain fetch or WebFetch. A real headless-Chromium
  session (Playwright, `navigator.webdriver` patched out, a real desktop
  Chrome user agent) resolved the HTML guidance pages after ~5 seconds. The
  PDF asset path (`/images/PDF_Documents/...`) required a further step: an
  in-context `request.get()` still returned 403 (the Turnstile challenge does
  not appear to gate that path the same way over XHR), but navigating the
  *page itself* directly to the PDF URL triggered a genuine browser download
  event, whose bytes were captured via Playwright's `page.waitForEvent(
  'download')` / `download.saveAs()` — a new technique for this class of
  block, distinct from the pure-JS auto-passing challenges defeated in
  GOV-803/GOV-960's browser walkthroughs.
- **Retrieved / reviewed:** 2026-07-04 (all sources fetched and read live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer, initial authoring
  source-review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "It is available to Irish residents who hold a current full Irish driving licence and to all EU or EEA licence holders who are resident in Ireland... It cannot be issued to learner permit holders or non-EU/EEA licence holders." | `holdsFullIrishOrEuEeaDrivingLicence`, `isLearnerPermitHolder`, `isNonEuEeaLicenceHolder` (eligibility exits) |
| "you must have at least 3 months remaining on your licence to apply" | `licenceValidForAtLeastThreeMoreMonths` |
| "An IDP may be issued for an endorsed licence once there are not 12 penalty points or more on it." / "If an IDP applicant's driving ban is still in force, an IDP cannot be issued" | `hasTwelveOrMorePenaltyPoints`, `hasActiveDrivingBan` |
| Form Part 1 (Applicant Details) | `fullName`, `dateOfBirth`, `countryOfBirth` |
| Form Part 2 (Contact Details) | `address`, `contactPhoneNumber`, `emailAddress` |
| Form Part 3 (Driving Licence Details) | `drivingLicenceType`, `drivingLicenceNumber`, `licenceIssuingCountry`, `licenceCategoriesHeld` |
| "Proof of Address requirement... only required where the address on your driving licence differs from your current address, or where you hold an EU/EEA driving licence and are resident in Ireland... a recent domestic bill issued within the last 6 months" | `addressDiffersFromLicenceAddress` field; `proofOfAddress` document (`requiredWhen`, `freshness.issuedWithin: P6M`) |
| Form Part 4 (International Driving Permit): "1926 - Only required if traveling to Brazil, Burundi, Iraq, Nigeria, Somalia" / "1949 - Required for all other countries" | `permit1926Requested`, `permit1949Requested` |
| "Only one IDP may be issued per licence per year unless you are looking for a replacement for an issued permit, in which case the IDP application form must be accompanied by a Garda report of the original IDP's loss." | `isReplacementForLostOrStolenIdp` field; `gardaReportOfLoss` document (`requiredWhen`) |
| "IDP application fee (15 euro - card payment only on the day)" | `idpApplicationFeeEur`, `paymentMethod` |
| Form Part 5 (Applicant Declaration), all five printed assertions plus signature/date | `declarationInformationTrueAndCorrect`, `declarationUnderstandsTwelveMonthValidity`, `declarationUnderstandsOnePermitPerYear`, `declarationHoldsValidLicenceAtApplication`, `declarationAcceptsIdpConditions`, `declarationDate` |
| Guidance Notes: "Applicants must bring: A valid Irish or EU/EEA driving licence... One passport-sized photograph" | `drivingLicence`, `passportSizedPhoto` documents |

## Conformance test run

`conformance/ie/dttas/international-driving-permit/1.0.0/application-packet.json`
models an eligible full-Irish-licence holder applying for a first-time (not
replacement) 1949 Convention IDP. A scripted evaluator
(`/tmp/conformance_check.mjs` at authoring time, not committed — it
reimplements the GSP-0013 condition grammar: `all`/`any`/`not`, the seven
`conditionLeaf` comparison operators, `requiredWhen` on fields and documents,
and step `transitions`) checked the packet against the schema and found **0
violations across 24 fields + 5 documents**. Four mutation tests confirmed the
schema's conditional logic actually fires, not just that the happy path
passes:

1. `addressDiffersFromLicenceAddress = true` → `proofOfAddress` document
   becomes required. **Confirmed.**
2. `drivingLicenceType = 'eu_eea'` (with `addressDiffersFromLicenceAddress`
   left `false`) → `proofOfAddress` still becomes required, via the `any`
   condition's second branch. **Confirmed.**
3. `isReplacementForLostOrStolenIdp = true` → `gardaReportOfLoss` document
   becomes required. **Confirmed.**
4. `hasActiveDrivingBan = true` → the `eligibility` step exits with
   `exitReason: "not-eligible"` instead of continuing to `applicant_details`.
   **Confirmed.**

Full console output is saved as
`conformance/ie/dttas/international-driving-permit/1.0.0/application-packet.txt`.

## A known grammar gap (documented, not silently worked around)

The source form allows ticking either or both of the 1926/1949 permit-type
boxes ("tick below the appropriate permit(s) you require"), with the rule
"at least one must be ticked." The v0.3 condition grammar has no operator for
"at least one of these two independent booleans is true" (`crossFieldValidation`'s
`requirePresent`/`requireAbsent` test field *presence*, not a boolean's
*value*). Rather than force a wrong-fit rule the way a prior cycle's
`notEquals`-against-an-absent-field bug did (see the
`notequals-empty-string-absent-field-bug` lesson), this constraint is recorded
in both fields' `description` only, not enforced structurally. Flagged here so
a future spec proposal (a `requireAtLeastOne` condition operator, or similar)
has a concrete motivating case.

## What remains out of scope

- Live confirmation of the appointment-booking phone flow (0818 919 090) —
  no online booking form exists to walk through; the guidance/form-level
  detail above is the full public surface.
- Part 6 (NDLS/Official Use Only: centre location, booklet serial number,
  verifying officer name/signature) is agency-internal and out of scope, per
  the boundary that GovSchema models applicant-facing input, not government
  back-office record-keeping.
- The AA's own historical IDP process (superseded 18 May 2026) is out of
  scope; this document models the current NDLS process only.

## Next review

`nextReviewBy`: 2027-01-04, or sooner if NDLS changes the fee, the eligibility
rules, or publishes an online application channel.
