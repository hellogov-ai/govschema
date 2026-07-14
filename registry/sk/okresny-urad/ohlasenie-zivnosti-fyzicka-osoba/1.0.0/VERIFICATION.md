# Verification record — `sk/okresny-urad/ohlasenie-zivnosti-fyzicka-osoba` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2995**). Slovakia opened
in the registry the same day via GOV-2981's Taxes schema
(`sk/financna-sprava/dpfoav25-individual-income-tax-return`, 1 of 6). This
document deepens Slovakia's coverage with its **Business Formation vertical
(1 of 6)**.

## Scouting handoff

A parallel scouting agent in this same cycle screened two independent
tracks for Slovak business-entity registration:

1. **Obchodný register (Commercial Register — companies, e.g. s.r.o.)** —
   confirmed a **dead end** for unauthenticated authoring. `sluzby.orsr.sk`
   and the Ministry of Justice's own "vzor" pages state that new-entity
   proposals must be filed electronically with a qualified electronic
   signature via the OR SR e-services portal; only non-fillable PDF
   *samples* exist for viewing (per Vyhláška MS SR č. 25/2004 Z.z.).
2. **Živnostenský register (Trade Licensing Register — sole traders)** —
   the winning candidate, modelled in this document. A genuine,
   unauthenticated, first-party specimen exists at
   `slovensko.sk`, requiring no login/CAPTCHA/WAF/qualified-signature gate
   to retrieve.

## Source re-verification (Phase 1)

- **Authority (as printed on the form):** Okresný úrad (District Office),
  odbor živnostenského podnikania (Department of Trade Licensing). The
  form's own printed code, `T MV SR 2007/60`, attributes it to the Ministry
  of Interior of the Slovak Republic (Ministerstvo vnútra SR); okresné
  úrady are territorial units of state administration operating under MV SR
  per Act No. 180/2013 Z.z. §2-§3, and their trade-licensing departments
  administer this filing under §3a of Act No. 455/1991 Zb. (živnostenský
  zákon). Modelled here via `authority.name` (the printed filing office)
  plus `authority.operatedBy` (MV SR, with the citation above as `basis`) —
  a disclosed inference, since the form's own body text never spells out
  "Ministerstvo vnútra" beyond the form-code prefix.
- **URL:** `https://www.slovensko.sk/_img/CMS4/podnikanie/ohlasenie_zivnosti_FO.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL`, not trusted from the scouting agent's report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `531,643` bytes — matches the scouting report's own figure exactly.
  **sha256:** `a78451f134a72785e3e0553b36d1c207be68af8104f88c4fcb157341360fe286`
  — independently computed this cycle with `sha256sum` against a fresh
  download, matching the scouting report's own hash exactly.
- **File type:** a genuine PDF (`%PDF-1.4` header, PDF/A-1 per the
  scouting report), **no AcroForm** — independently confirmed this cycle via
  `pdfjs-dist`'s `getFieldObjects()`, which returns `null`/an empty map on
  this document. It is a flat, print-and-hand-fill specimen, official
  template code `T MV SR 2007/60-1` through `-7` (one code per page,
  visible in each page's footer).
- **Extraction method:** `pdfjs-dist@5` `getTextContent()` run against
  every one of the document's 7 pages, from a clean scratch directory,
  independently this cycle (not trusted from the scouting agent's summary
  as-is). Confirmed **7 pages**, matching the scouting report's own claim.

## Field inventory (Phase 2)

All 192 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Summary by page/part:

| Part (page) | Representative fields | Modelled scope |
|---|---|---|
| Header (p.1) | `isNonEuOecdCertificateRequest` | Full — the footnote-1 filing-variant distinction |
| A.1 Podnikateľ — identity (p.1) | `applicantSurname`, `applicantGivenName`, `applicantPersonalNumber`, `applicantGender`, `applicantBirthPlace`/`applicantBirthDate`, `applicantNationality`, `applicantResidencePermitUntil` | Full |
| A.1 Bydlisko/Miesto podnikania/Adresa pre doručovanie/Splnomocnenec (p.1) | `residence*`, `business*`, `mailing*`, `representative*` address blocks, `businessNameSuffix`, `existingBusinessId`, `healthInsuranceCompanyName` | Full |
| A.2 Fyzická osoba s bydliskom v zahraničí (p.2) | `srResidence*`, `foreignEnterpriseName`/`foreignEnterpriseBranchName`, `activityAddress*`, `manager*` | Full |
| A.3 Ostatné údaje (p.2) | `alsoFilesFirstCommercialRegisterEntry`, `signaturePlace`/`signatureDate`, `administrativeFeeAmount`, plus 5 `documents[]` (fee proof, professional-competence evidence, premises-use evidence, declaration, signature) | Full |
| B Predmety podnikania ×4 (p.3) | `businessActivity1..4`, `businessActivityStartDate1..4`/`EndDate1..4`, `businessActivityHasResponsibleRepresentative1..4`, `businessActivityPremises1..4` | Full — the form's own 4-row printed capacity |
| B.1 Súhlas zodpovedného zástupcu (p.4) | `responsibleRepresentative*`, plus 1 `documents[]` (consent/declaration) | Full — one representative, the form's own single-block capacity |
| C Výpis z registra trestov ×4 (p.5) | `criminalRecordPerson{Surname,GivenName,PersonalNumber,BirthDistrict,BirthCountry,PreviousGivenName,PreviousSurname,FatherGivenName,FatherSurname,MotherGivenName,MotherSurname,MotherBirthSurname}1..4` | Full — the form's own 4-block printed capacity |
| D Prihláška na zdravotné poistenie (p.6) | `foreignIdOrPassportNumber`, `isResidentInsured`/`isNonResidentSelfEmployedInsured`, `healthInsuranceSubmitter*`, plus 1 `documents[]` (signature) | Full, excluding the page's own surname/given-name/personal-number cross-link fields (see judgment call 2) |
| E Prihláška k registrácii daňovníka (p.7) | `domesticBankName`/`domesticBankAccountIban`, `foreignBankAccountIban`/`foreignBankSwiftCode`, `otherOrganizationalUnitAddress`/`Type`, plus 1 `documents[]` (signature) | Full, excluding the page's own cross-link fields (see judgment call 2) |

Total: **192 `fields[]`** entries (17 unconditionally `required: true`, the
rest `required: false` — some with `requiredWhen`) plus **8 `documents[]`**
entries, **4 `crossFieldValidation`** rules (one per business-activity
block, end date not before start date), and **1 `exclusivityGroup`** (Part
D's resident vs. non-resident-self-employed insured-person designation).

### Per-page tally (independent cross-check against the 192-field claim)

- Page 1 (A.1, header): 1 (header) + 11 (identity) + 8 (residence address) +
  9 (business address) + 6 (mailing address) + 11 (representative) + 1
  (health-insurance name) = 47
- Page 2 (A.2, A.3): 5 (SR-residence address) + 2 (foreign designation) + 8
  (activity address/contact) + 10 (manager) + 6 (manager residence) + 4
  (A.3 fields) = 35
- Page 3 (B): 5 fields × 4 blocks = 20
- Page 4 (B.1): 18
- Page 5 (C): 12 fields × 4 blocks = 48
- Page 6 (D): 1 + 2 + 7 (submitter identity) + 6 (submitter address) + 1
  (signature date) = 17
- Page 7 (E): 7
- 47 + 35 + 20 + 18 + 48 + 17 + 7 = **192**, matching the schema's own
  `fields[]` length exactly.

## Judgment calls disclosed

1. **OR-requirements not machine-enforced.** Several footnoted rules on the
   source form take the shape "field X is required only if field Y is
   absent" (e.g. `applicantBirthPlace`/`applicantBirthDate` required only
   when `applicantPersonalNumber` is not given; a domestic representative
   required only for an applicant permanently resident abroad). The shared
   `Condition` grammar (GSP-0013) has no field-absence leaf operator, and
   this registry's own prior incident (a `notEquals ""` misfire against an
   optional, possibly-absent field) counsels against approximating absence
   with `notEquals` on an empty string. These rules are therefore disclosed
   in the affected fields' own `description`, not encoded as `requiredWhen`.
2. **Parts D and E's own cross-link fields are not re-modelled.** Both
   pages print a small block (surname/given name/personal number) whose
   own text states its sole purpose is "Previazanosť medzi základnou časťou
   A formulára zabezpečujú položky priezvisko, meno, rodné číslo" (linking
   this physically separate page back to Part A) — not new data collection.
   Modelling them again as separate fields would create ambiguous
   duplicate identity data with no independent meaning, so they are
   intentionally omitted; `applicantSurname`/`applicantGivenName`/
   `applicantPersonalNumber` already cover this identity once.
3. **Part A.2's "OZNAČENIE" designation** is modelled as two independent
   optional string fields (`foreignEnterpriseName`/
   `foreignEnterpriseBranchName`) rather than a boolean exclusivity pair,
   since the flat specimen presents this as a name/designation to write in
   (per footnote 2), not as two checkbox widgets to choose between — there
   is no AcroForm to confirm widget independence either way on this static
   form.
4. **`activityAddressStreet`/`HouseNumber`/`Municipality`** print their own
   "(povinný údaj)" (mandatory field) annotation directly on the form, but
   only within Part A.2's own scope (foreign natural person / foreign
   enterprise's branch only) — modelled as `required: false` with the
   mandatory-in-context caveat disclosed in each field's own `description`,
   consistent with judgment call 1's general treatment of section-scoped
   requirements this registry's Condition grammar cannot cleanly express.
5. **Part C's per-person fields** are `required: false` even for person 1:
   the form's own note restricts Part C to persons with Slovak state
   nationality in specific roles (applicant/responsible
   representative/foreign-branch manager/statutory-body member) — a
   foreign national applicant (e.g. this document's own
   `valid-with-responsible-representative-and-branch-activity` conformance
   fixture) may have no Part C entries at all, so no field in this
   repeating group is unconditionally required.
6. **Administrative fee amount** (`administrativeFeeAmount`) is modelled
   as a plain field rather than a fixed `documents[].amount`, since the
   form itself prints a blank ("v hodnote ______") rather than a published
   fee schedule.

## Conformance fixtures (Phase 3)

10 fixtures committed under
`conformance/sk/okresny-urad/ohlasenie-zivnosti-fyzicka-osoba/1.0.0/`: 2
valid (a minimal domestic sole-trader filing, and a filing with a second
business activity requiring a responsible representative's consent) plus 8
mutation-control fixtures, each derived from one of the two valid fixtures
by a single targeted mutation. All 10 were run against a from-scratch,
ephemeral field-by-field conformance checker (derived from this schema's
own `fields[]`/`documents[]`/`crossFieldValidation`/`exclusivityGroups`,
not committed to the repo) before being finalized: both valid fixtures
produced **0 errors**, and each of the 8 mutation-control fixtures produced
**exactly 1 error** — missing required field, invalid enum value (×2,
covering both `applicantGender` and `otherOrganizationalUnitType`), missing
required document, a conditionally-required field/document each missing
(responsible-representative surname and consent statement), an
exclusivity-group violation, and a business-activity end-date-before-start
cross-field-validation failure.

## Structural validation

- `node tools/validate.mjs registry/sk/okresny-urad/ohlasenie-zivnosti-fyzicka-osoba/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs ../registry/sk/okresny-urad/ohlasenie-zivnosti-fyzicka-osoba/1.0.0/schema.json` (from `tools/`, ajv 2020-12 against `spec/v0.3`) — **ok**.

## Maturity

`structural-reference`: the form's own printed structure is fully
transcribed and every machine-expressible rule is encoded, but no live
filing at an Okresný úrad was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the Government of the Slovak Republic, the Ministry of
Interior of the Slovak Republic, or any Okresný úrad.
