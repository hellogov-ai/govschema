# Verification record — `us/eac/voter-registration-national-mail-form` v1.0.0

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

- **Document `(id, version)`:** `us/eac/voter-registration-national-mail-form` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Election Assistance Commission (EAC), a federal
  independent agency created by the Help America Vote Act (HAVA), which
  publishes and maintains this form under the National Voter Registration
  Act of 1993 (NVRA).
- **Primary sources:**
  - <https://www.eac.gov/voters/national-mail-voter-registration-form> —
    landing page: purpose, format, who must accept it.
  - <https://www.eac.gov/sites/default/files/eac_assets/1/6/Federal_Voter_Registration_ENG.pdf> —
    the fillable form and instructions booklet itself (27 pages: cover,
    General Instructions, Application Instructions, the fillable
    Application form (pp. 4/6, duplicated per sheet), and per-State
    Instructions covering all 50 States, D.C., and the territories the
    booklet lists).
  - <https://www.eac.gov/voters/national-mail-voter-registration-form-faqs> —
    confirmatory FAQ (not separately cited per-field; consistent with the
    booklet).
- **Official form id:** none printed on the form itself; identified by its
  OMB Control No. 3265-0015 and referred to by the EAC as the "National
  Mail Voter Registration Form."
- **Extraction method:** the PDF's own AcroForm field annotations were read
  programmatically with `pdfjs-dist` (`page.getAnnotations()`), giving the
  exact field labels (`alternativeText`) and checkbox/radio export values
  (e.g. `TXT-0055` / "Courtesy Titles" / `Mr`, `Mrs.`, `Miss`, `Ms.`) —
  the same technique used for prior encrypted/complex-AcroForm sources (see
  memory: pdfjs-dist for encrypted AcroForms). The General Instructions,
  Application Instructions, and five sample State Instructions pages
  (Alabama, Alaska, Arizona, Arkansas, California, Wisconsin, Wyoming) were
  read as plain text layer output, verbatim, not summarized secondhand.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer, initial authoring
  source-review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Top-of-form citizenship/age gating questions | `isUSCitizen`, `willBe18ByElectionDay` |
| Box 1 — Name (title, last/first/middle, suffix) | `courtesyTitle`, `lastName`, `firstName`, `middleNames`, `nameSuffix` |
| Box 2 — Home address | `homeAddressStreet`, `homeAddressAptOrLot`, `homeAddressCity`, `homeAddressState`, `homeAddressZip` |
| Box 3 — Mailing address if different | `hasMailingAddressDifferentFromHome`, `mailingAddressStreet`, `mailingAddressCity`, `mailingAddressState`, `mailingAddressZip` |
| Box 4 — Date of birth | `dateOfBirth` |
| Box 5 — Telephone number (optional) | `telephoneNumber` |
| Box 6 — ID number, and the State-varying DL/State-ID vs. last-4-SSN vs. "NONE" pattern (confirmed identical across all five sampled States: AL, AK, AZ, AR, CA) | `idNumberType`, `idNumber` |
| Box 7 — Choice of party, and its State-varying applicability (required in none of the five sampled States; several explicitly "do not complete") | `partyChoice` |
| Box 8 — Race or ethnic group, and its State-varying applicability (all five sampled States: "leave blank" except Alabama, which requests but does not require it) | `raceOrEthnicGroup` |
| Box 9 — Oath, signature, and date | `oathAffirmed`, `signatureFullName`, `signatureDate` |
| Box A — Previous name (name-change applicants) | `isNameChange`, `previousFullName` |
| Box B — Previous registration address | `isFirstTimeRegisteringAtThisAddress`, `previousRegistrationAddressStreet/City/State/Zip` |
| Box C — Rural/no-street-address map | `hasNoStreetAddress`, `ruralLocationDescription` |
| Box D — Assistance for an applicant unable to sign | `signedByApplicant`, `assistantName`, `assistantAddress`, `assistantPhone` |
| General Instructions — "First Time Voters Who Register by Mail" (HAVA ID requirement) | `identificationProofAttached` |
| General Instructions — North Dakota has no registration; Wyoming does not permit mail registration; New Hampshire/Wisconsin accept only as a request for their own process | `homeAddressState` description; `applicant_name_and_address` step transitions (`state-not-supported` / `state-alternate-process-required`) |

## What remains out of scope

- The per-State instructions for all 50 States, D.C., and the territories
  (24 pages of the source booklet) are not modeled field-by-field; only a
  5-State sample (Alabama, Alaska, Arizona, Arkansas, California) plus the
  four named exceptions (North Dakota, Wyoming, New Hampshire, Wisconsin)
  were read verbatim to confirm the *pattern* item 6/7/8 follow. Per-State
  registration deadlines, felony-disqualification rules, and the exact Box 9
  oath wording are State-specific and are not encoded as data, consistent
  with how `gb/dvla/international-driving-permit` leaves a country-dependent
  lookup table (150+ destination countries) as applicant-supplied choice
  rather than enumerated data.
- No `mapping.json` — the source is a static, downloadable PDF with no live
  web form/screen to map selectors against.
- This document does not model the separate Federal Post Card Application
  (for military/overseas citizens) — the booklet explicitly directs that
  population elsewhere ("Use the Federal Postcard Application available to
  you from military bases, American embassies, or consular offices").

## Next review

`nextReviewBy`: 2027-01-04, or sooner if the EAC revises the form (it is
updated periodically; the sampled State-instruction pages carry individual
"Updated" dates from 2006 through 2025) or a State's item 6/7/8 treatment
changes.
