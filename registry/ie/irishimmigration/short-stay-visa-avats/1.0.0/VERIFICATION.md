# Verification record — `ie/irishimmigration/short-stay-visa-avats` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`
- **`maturity.level`:** `verified-schema`

## Why this cycle picked up Ireland's AVATS visa application

This is the recurring "GovSchema Standard Research" cycle
([GOV-803](/GOV/issues/GOV-803)). Visa remains the registry's weakest vertical:
after `nz/inz/nzeta-application` (GOV-795) closed NZ's gap, Visa stood at 6/9
jurisdictions, with IE, SG, and DE the only gaps left — all three already
recorded as `candidate`-status catalog entries from a prior discovery pass
(`ie/irishimmigration/short-stay-visa-avats`, `sg/ica/visa-application-save`,
`de/auswaertiges-amt/national-visa-consular-services-portal`). Of the three,
Ireland's AVATS was judged the most tractable: a single applicant-facing
online wizard (not a Singpass-intermediary flow like SAVE, and not a
28-purpose portal like Germany's Consular Services Portal), so this cycle
authored it first. This document closes the IE x Visa cell (Visa now 7/9;
SG and DE remain).

## Sources examined

- **Document `(id, version)`:** `ie/irishimmigration/short-stay-visa-avats` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration Service Delivery, Department of Justice, Home
  Affairs and Migration.
- **Primary source (field-by-field walkthrough):**
  <https://www.irishimmigration.ie/coming-to-visit-ireland/giving-your-details-on-avats-for-a-visa-preclearance-application/>,
  Immigration Service Delivery's own detailed guide to giving AVATS details
  section by section (Nationality; Reason for Travel; Type of Visa or
  Preclearance; Single or Multiple Journey Visa; Purpose of Travel; Passport
  Details; Proposed Dates; Personal details; Application Number; Biometric
  information and exemptions; Immigration history and criminal record;
  Passport issue and expiry; Employment and college; Travelling with others;
  Contact/Host in Ireland; Your Family; Employment/Study Visa Application;
  Assistance with this form; Declaration; Submission of application and
  documents), last updated 2025-10-14, fetched directly with no access block.
- **Secondary source (required documents):**
  <https://www.irishimmigration.ie/wp-content/uploads/2021/03/Required-documents-Short-Stay-C-Visa.-faq.pdf>,
  fetched directly (HTTP 200, no access block) and text-extracted with a
  zlib-stream + parenthesis-regex technique (the PDF is a plain printed-form
  text layer). Used for the `documents[]` checklist: application summary
  form, passport/travel document, previous passports, 2 passport photographs,
  proof of fee payment/exemption, residence-permission evidence (where
  applicable), documentation on previous refusals/immigration
  issues/convictions, travel/medical insurance, a signed application letter
  with specified content, an itinerary, proof of accommodation, and financial
  evidence.
- **Live system verification.** Direct `curl`/`WebFetch` of
  `visas.inis.gov.ie/avats/OnlineHome.aspx` serves a JavaScript
  bot-verification interstitial — the same access-block class already
  recorded for other jurisdictions' portals in this registry (e.g.
  `france-visas.gouv.fr`). A headless Playwright/Chromium session with a
  realistic desktop user agent passes the challenge and reaches the real
  AVATS wizard. A mock application (an adult Indian national, "Visit -
  Tourist" reason, "Short Stay (C)", single journey, surname "Sharma",
  forename "Anita") was driven **field by field, with no data submitted**,
  through every page from the Welcome screen to the Family Details page:
  - Before-you-apply screen → privacy/terms checkbox
    (`ctl00_ContentPlaceHolder1_CheckBoxRead`) → "AVATS Online Application
    Form" button — matches the guidance's "General information page" exactly.
  - Eligibility/reason/passport/dates page
    (`ApplicantPersonalDetails`-preceding page): confirmed live controls
    `ddlCountryOfNationality`, `ddlVisaCategory` (full picklist captured —
    see below), `rdblstVisaStayType` (`Short Stay (C)` / `Long Stay (D)`),
    `rdblstJourney` (`Single`/`Multiple`), `txtPurposeOfTravel`,
    `ddlPassportType` (full picklist captured), `txtPassportNo`,
    `txtEntryDate`, `txtExitDate`.
  - `ApplicantPersonalDetails.aspx`: confirmed `txtSurname`, `txtForename`,
    `txtOtherName`, `txtDOB`, `rdblstGender` (`Male`/`Female`),
    `ddlCtryOfBirth`, `ddlCurrentLocation`, `txtAddressln1-4`, `txtPhone`,
    `txtEmail`.
  - `GeneralApplicantInfo.aspx` (immigration history/biometrics/criminal
    record): confirmed `lstNoOfYears`/`lstNoOfMonths`, `rdblstPermission`,
    `rdblstBiometric`, `rdblstVisaApply`, `rdblstVisaIssue` + `txtrefNo`,
    `rdblstRefusedVisa` + `txtlocOfAppRefuse`, `rdblstPreviousTripToIreland` +
    `txtPurposeOfTrip`/`txtDjelrRefNo`/`txtGnibNo`/`txtPPSNo`,
    `rdblstFamilyInIreland` + `txtSurnameFamilyInIreland`/
    `txtForenamesFamilyInIreland`/`txtDOB`/`ddlRelationToApplicant`
    (picklist captured)/`txtDjelrNoFamilyInIreland`, `rdblstRefusedPerm`,
    `rdblstDeporation`, `rdblstRefusedVisaOtherCtry`,
    `rdblstDeportedOtherCtry` + `txtDetailsRefuseDeport`,
    `rdblstcriminalConvictions` + `txtConvictionDtls`/`txtConvictionLoc`/
    `txtConvictionSentence`. The page also displays the applicant's unique
    8-digit Application Number at the top (confirmed, e.g. `84706962`),
    matching the guidance's separate "Application Number" section — modelled
    here as descriptive text only, not a field, since it is system-generated.
  - `ApplicantPassportDetails.aspx`: confirmed `txtPassportNo`,
    `ddlTravelDocType` (a read-only echo of the earlier `ddlPassportType`
    choice — not modelled as a second field), `txtIssuingAuthority`,
    `txtIssueDate`, `txtExpDate`, `rdblstFirstPPT`, and — when "No" is
    selected — **two** previous-passport slots (`txtPPTNo1/2`,
    `txtIssueAuth1/2`, `txtIssueDate1/2`, `txtExpDate1/2`), **none of which
    carry a mandatory-field asterisk**, confirmed by screenshot.
  - `EmploymentCollegeDetails.aspx`: confirmed `rdblstCurrentlyEmployed`,
    `rdblstStudentCurrently`.
  - `TravellingCompanion.aspx`: confirmed `rdblstTravellingCo`.
  - `ContactHostInfo.aspx`: confirmed `txtAddressln1-4` (**four** lines, not
    three), `txtPhone`, `rdblstIsHostKnown`, and — on the "Yes" (personally
    known) branch — `txtSurname`, `txtForename`, `ddlNationality`,
    `txtOccupation`, `txtRelation` (free text, not a picklist),
    `txtDjelrRefNo`, `txtDOB` (optional), `txtEmail` (optional). The "No"
    branch's exact live field name was not independently reached in this
    pass and is modelled from the prose guidance alone.
  - `ApplicantFamilyDetails.aspx`: confirmed `ddlPersonalStatus` (picklist:
    `Single`/`Married`/`Widowed`/`Divorced`/`Separated`/`Unmarried
    Partner`/`Civil Partnership` — exact match to the reviewed prose),
    `rdblstIsPartnerTraveling`, `lstNoOfChildren`, and — on the "Married"
    branch — `txtSpouseSurname`, `txtSpouseForename`, `txtSpouseOtherName`,
    `txtSposeDateOfBirth` [sic, live control's own typo], `rdblstOwnPassport`,
    `txtSpousePPTNo`, `rdblstGender`, `ddlCountry`.
  - **Not reached in this pass:** the Form Assistance and Declaration pages
    (the flow's final two steps — modelled from the prose guidance alone,
    including the Declaration's exact attestation wording, which the
    guidance itself says is shown only within the live session), and the
    per-child repeating sub-fields once `lstNoOfChildren` is set above zero
    (modelled as a single collapsed free-text field, the same treatment used
    for `familyMembersInIreland`'s single-contact cap and
    `travellingWithOthers`' four-companion cap).
  - The AVATS homepage itself disclosed a fact not in the reviewed guidance:
    a phased online visa-fee-payment facility began 8 December 2025, with
    country coverage expanding over time — recorded on the
    `proofOfFeePayment` document entry.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review, including live-system verification).

## Corrections the live verification made to the prose-guidance reading

Live-system evidence is authoritative over the (accurate but occasionally
ambiguous) prose guidance per **source-of-truth fidelity**. This pass caught
and fixed:

1. **`previouslyGrantedIrishVisaOrPreclearance` / `previouslyRefusedIrishVisaOrPreclearance`** are independently mandatory questions (`rdblstVisaIssue`, `rdblstRefusedVisa`), not conditioned on `previouslyAppliedForIrishVisaOrPreclearance` as the prose ("If you have been granted a visa... If you have been refused a visa...") reads.
2. The grant/refusal detail sub-answers are each a **single free-text field** (`txtrefNo`, `txtlocOfAppRefuse`), not three separate city/reference/year fields as originally modelled — collapsed into `previousGrantDetails`/`previousRefusalDetails`.
3. **`biometricsExempt`** is always asked (mandatory, with a "Checklist of Biometric Exemptions" link), not conditioned on the applicant's current-location country as the prose implies.
4. **Two** previous passports are accepted (`txtPPTNo1/2` etc.), not one — and critically, **none of the previous-passport fields are actually mandatory** even when `isFirstPassport` is false.
5. The host/contact address has **four** lines (`txtAddressln1-4`), not three, and the personally-known branch carries optional date-of-birth and email fields not mentioned in the reviewed prose.
6. The criminal-conviction section has **no separate trial-date input** — only reason, location, and sentence-length free-text fields; the standalone `convictionTrialDate` field was removed.
7. Family-in-Ireland surname/forename are **separate** fields, not one combined name field.
8. `familyMemberRelationship` and (already correctly modelled) `personalStatus` are **closed enumerations** picked from a dropdown, not free text — the exact `ddlRelationToApplicant` picklist was captured live.
9. `reasonForTravel`'s and `passportType`'s exact live picklists were captured and encoded as `eligibleValues`/`validation.enum` respectively, replacing free-text placeholders.
10. `spouseHasOwnPassport` is an explicit gating question (`rdblstOwnPassport`) the reviewed prose did not separately call out; `spousePassportNumber`'s `requiredWhen` was tightened to depend on it.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, this was done in two ways:

**1. Live system.** The exact mock applicant used for the schema-level check
below (Anita Sharma, Indian national, Visit - Tourist, Short Stay (C), single
journey) was entered field-by-field into the real, live AVATS wizard via a
headless Playwright browser (see above) — the strongest form of test run
available, short of final submission (which was never performed; no data
was submitted to Immigration Service Delivery).

**2. Schema-level condition evaluator.** A one-off Python script (not
committed to the repo) implementing the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `Condition` type checked two scenarios against every
`type`/`required`/`requiredWhen`/`visibleWhen`/`validation.enum` constraint
in `schema.json`:

**Scenario 1 — solo tourist, no branch triggers** (mirrors the live AVATS
session above; 46/109 fields populated): Anita Sharma, Indian national,
"Visit - Tourist", Short Stay (C), single journey, no prior Irish visa
history, no family in Ireland, not employed/student, travelling alone, host
not personally known ("Not arranged" accommodation), single.

**Scenario 2 — branch-heavy case** (69/109 fields populated): the same
applicant instead answers "Other" to Reason for Travel with elaboration;
claims a biometric exemption; has a prior granted **and** a prior refused
Irish visa/preclearance; has visited Ireland before; has a family member in
Ireland; was once refused entry to Ireland; has a (minor) criminal
conviction; is not on her first passport; is employed; is travelling with
her spouse; has a personally-known host in Ireland; is married with a
travelling spouse who holds their own passport, and one dependent child; and
received agent assistance completing the form.

```
OK   Scenario 1: solo Indian tourist, no branch triggers (mirrors live AVATS test session)
OK   Scenario 2: branch-heavy case (prior visa history, family in Ireland, conviction, married w/ child, agent-assisted)
```

Scenario 2 exercised every `requiredWhen`-gated field this document defines,
each correctly required once its gating field was set and correctly *not*
required in Scenario 1. The two `crossFieldValidation` rules
(`exitNotBeforeEntry`, `passportExpiryAfterIssue`) were checked against both
scenarios' date pairs and held. No defects were found in this pass.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ie/irishimmigration/short-stay-visa-avats/1.0.0/schema.json
ok   registry/ie/irishimmigration/short-stay-visa-avats/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/ie/irishimmigration/short-stay-visa-avats/1.0.0/schema.json
ok   registry/ie/irishimmigration/short-stay-visa-avats/1.0.0/schema.json [v0.3]
```

The full registry (151/151 schema documents, 3/3 `mapping.json` companions)
continues to validate after this addition.

## What is NOT modelled (out of scope), and why

- **Preclearance applications** (offered instead of a visa to non-visa-required nationalities) — a structurally distinct application category the system routes to based on nationality; out of scope.
- **Long Stay (D) visas** (e.g. Join Family, Employment, Study when the proposed stay exceeds 90 days) — a different `rdblstVisaStayType` value with, per the guidance, additional questions; out of scope.
- **The Free Movement Directive pathway** for a family member of an EU/EEA/Swiss/UK national — a distinct, narrower application category; out of scope, the same exclusion `fr/france-visas/schengen-visa-application` makes for its own boxes 17-18.
- **An application completed by a parent/legal guardian on behalf of an applicant under 18** — the guidance states the same person who completes and signs the form must be that parent/guardian; out of scope, the same minor exclusion used elsewhere in this registry.
- **The additional Employment Visa Application and Study Visa Application question sets** (Employment Permit/Atypical Working Authorisation reference, course acceptance/fees/English-language proficiency/educational history/study sponsor) — each a substantial additional branch off `reasonForTravel`; out of scope for this initial Short Stay (C) visit/tourism/business schema, and each a candidate for its own future schema or a MINOR-version extension.
- **The generated Application Form and Declaration's exact wording** — produced by the live system at submission time and not reproduced in the reviewed guidance; the `declarationAttestation` document entry records the requirement without inventing wording it cannot confirm.

## Scope and jurisdiction notes

- This is Ireland's first Visa-vertical document. `ie/dfa/*`, `ie/dttas/*`, `ie/revenue/*`, `ie/dsp/*`, and `ie/cro/*` cover Passport/DMV/Taxes/National ID/Business Formation respectively; this document opens a fifth IE authority segment, `ie/irishimmigration/*`.
- `id` uses the `irishimmigration` authority segment (the branded name Immigration Service Delivery uses for its own public-facing site, `irishimmigration.ie`) rather than a department-name segment, the same convention already used for `gb/ukvi/standard-visitor-visa` (a directorate/service name, not its parent department).
- Conditional requiredness/visibility uses `requiredWhen`/`visibleWhen` (GSP-0013), targeting spec v0.3, the same as every other Visa-vertical document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-01** (6 months).
Because this document's `status` is `verified` from a partial (not
end-to-end-through-Declaration) live pass, a future review should prioritize
reaching the Form Assistance and Declaration pages and the dependent-children
repeating sub-fields, and re-confirming the online-payment country-coverage
note, which the AVATS homepage itself describes as an expanding rollout.
