# Verification record — `sk/policajny-zbor/ziadost-o-udelenie-vodicskeho-opravnenia` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-3010**). Slovakia opened
in the registry via GOV-2981's Taxes schema and stood at 2 of 6 verticals
(Business Formation, Taxes) at the start of this cycle. This document opens
Slovakia's **DMV vertical (1 of 6)**.

## Scouting handoff

A parallel scouting agent in this same cycle screened all four of Slovakia's
remaining verticals:

1. **Passport** — confirmed a **dead end**. Domestic issuance is mandatory
   in-person biometric capture (per `slovensko.sk`'s own life-situation page:
   "Každý občan, ktorému má byť cestovný pas vydaný, musí byť pri podaní
   žiadosti osobne prítomný"); the only electronic channel
   (`portal.minv.sk`) is gated behind eID + qualified electronic signature
   and does not cover a standalone civilian passport application.
2. **National ID** — a **strong candidate** was found (`slovensko.sk`'s
   `MZV.RequestIdentityCard` eForm, "Žiadosť o občiansky preukaz" filed via
   embassy/consulate) and delegated as a separate child issue rather than
   authored here, to keep this document scoped to one deliverable.
3. **DMV** — the winning candidate, modelled in this document. A genuine,
   unauthenticated, first-party specimen exists as a binding legislative
   annex on `static.slov-lex.sk`, requiring no login/CAPTCHA/qualified-
   signature gate to retrieve.
4. **Visa** — confirmed a **duplicate, not a candidate**. Slovakia's
   "Žiadosť o udelenie národného víza" (national visa application) is,
   field-for-field, the same EU-harmonized Schengen Annex I template already
   modelled elsewhere in this registry — verbatim numbered-field set (1-37),
   same layout, differing only in the title line and the official-use
   decision-box wording. No structurally distinct Slovak national-visa form
   exists.

## Source re-verification (Phase 1)

- **Authority (as printed on the form):** the form is Annex 2a to Vyhláška
  Ministerstva vnútra Slovenskej republiky č. 9/2009 Z. z. (the Ministry of
  Interior's implementing decree to Act No. 8/2009 Z.z. on Road Traffic),
  filed with a Police Force (Policajný zbor) traffic inspectorate under
  §77/§87 of that Act. Modelled here via `authority.name` (the receiving
  Police Force body) plus `authority.operatedBy` (MV SR, with this citation
  as `basis`).
- **URL:** `https://static.slov-lex.sk/pdf/prilohy/SK/ZZ/2009/9/20210831_4591484-2.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL`, not trusted from the scouting agent's report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `165,180` bytes — matches the scouting report's own figure exactly.
  **sha256:** `a82d13d4a0cada2216d88f63b072e25ce9142c6e960e06005cea4284b3dfbdd0`
  — independently computed this cycle with `sha256sum` against a fresh
  download.
- **File type:** a genuine PDF (`%PDF-1.4` header). Independently confirmed
  this cycle via `pdfjs-dist`'s `getFieldObjects()`, which returns exactly
  **2 entries** — two blank signature/timestamp annotation placeholders, not
  a full interactive AcroForm. It is a print-and-hand-fill legislative
  annex, consistent with many other paper-form jurisdictions already in the
  registry.
- **Extraction method:** `pdfjs-dist@5` `getTextContent()` run against both
  of the document's 2 pages, from a clean scratch directory, independently
  this cycle (not trusted from the scouting agent's summary as-is).
  Confirmed **2 pages**, matching the scouting report's own claim, and every
  section/field the scouting report described (applicant section, legal-
  representative consent block, sworn declaration a/b/c, physician
  certification with a three-way fitness result) verbatim against the
  form's own printed text.

## Field inventory (Phase 2)

All 33 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Summary by section:

| Section (page) | Representative fields | Modelled scope |
|---|---|---|
| Header (p.1) | `protocolSequenceNumber` | Full — filled by the Police body, not the applicant |
| Vypĺňuje žiadateľ — applicant (p.1) | `applicantGivenName`/`Surname`/`BirthSurname`/`BirthDate`/`BirthPlace`/`PersonalNumber`/`ResidenceAddress`, `existingDrivingAuthorizationGroup`/`existingDrivingLicenceNumberAndCountry`, `requestedDrivingAuthorizationGroup`, `applicationBasis`, `applicantSignaturePlace`/`Date` | Full |
| Vypĺňuje zákonný zástupca — legal representative (p.1) | `legalRepresentativeGivenName`/`Surname`/`PersonalNumber`/`ConsentGroup`/`SignaturePlace`/`SignatureDate` | Full — completed only when the applicant is a minor (see judgment call 1) |
| Čestné vyhlásenie — sworn declaration (p.2) | `declarationNoConcurrentApplication`, `declarationHabitualResidenceSlovakia`, `declarationMeetsEligibilityConditions`, `declarationPlace`/`Date` | Full — one occurrence of the place/date pair (see judgment call 2) |
| Potvrdenie o výsledku lekárskej prehliadky — physician certification (p.2) | `physicianApplicantGivenName`/`Surname`/`BirthDate`, `assessedDrivingGroup`, `medicalFitnessResult`, `medicalFitnessResultGroups`, `physicianExamDate`, `physicianNameAddressStamp` | Full — one three-way result plus its own group field (see judgment call 3) |

Total: **33 `fields[]`** entries (23 unconditionally `required: true`, the
remaining 10 all belonging to the legal-representative block or the two
starred/optional applicant fields) plus **1 `documents[]`** entry (the
administrative-fee payment-proof space, `category: payment`, `required:
true`).

### Per-section tally (independent cross-check against the 33-field claim)

- Header: 1
- Applicant section: 7 (identity/birth/residence) + 2 (existing
  authorization/licence) + 1 (requested group) + 1 (basis) + 2
  (signature place/date) = 13
- Legal-representative section: 6
- Sworn declaration: 3 (booleans) + 2 (place/date) = 5
- Physician certification: 3 (applicant identity) + 1 (assessed group) + 1
  (fitness result) + 1 (fitness-result groups) + 1 (exam date) + 1
  (name/address/stamp) = 8
- 1 + 13 + 6 + 5 + 8 = **33**, matching the schema's own `fields[]` length
  exactly.

## Judgment calls disclosed

1. **Legal-representative block is not gated by `requiredWhen`.** The form
   itself prints no minor/adult flag field to condition on — a minor
   applicant's status is not separately declared anywhere else on the form
   — so encoding a fabricated gating condition would misrepresent what the
   form structurally expresses. Each of the six legal-representative fields
   instead carries a `description` disclosing that it applies only when the
   applicant is a minor, consistent with this registry's established
   caution around approximating an unstated condition (the prior `notEquals
   ""` incident).
2. **The sworn-declaration section's three identical blank signature lines
   are modelled once, not three times.** Page 2 prints "V ... dňa ...
   podpis žiadateľa" three times beneath its three declared conditions
   (a/b/c), with no further text explaining a distinct purpose for each of
   the three occurrences beyond the section's own header note ("Čestné
   vyhlásenie podáva žiadateľ v deň vykonania skúšky z odbornej
   spôsobilosti/osobitnej skúšky alebo v deň konania o udelení vodičského
   oprávnenia na základe osobitného výcviku" — submitted on the day of the
   exam, or the special-training granting proceeding). Modelling three
   separate place/date pairs would assert an unstated multiple-occasion
   semantic the source text does not support; one `declarationPlace`/
   `declarationDate` pair is modelled instead.
3. **`medicalFitnessResult` is one three-way `enum`, and
   `medicalFitnessResultGroups` is one field, not three.** The form prints
   "na vedenie motorových vozidiel skupiny**" once under each of its three
   mutually-exclusive fitness-result options (spôsobilý bez obmedzenia /
   nespôsobilý / spôsobilý s podmienkou). Since exactly one result applies
   per applicant, and that result's own group blank is the only one filled
   in, one `enum` field plus one companion group field models the form's
   actual mutual exclusivity more directly than three parallel
   always-present group fields would.
4. **`applicantBirthSurname`/`existingDrivingAuthorizationGroup`/
   `existingDrivingLicenceNumberAndCountry`** are `required: false`: each is
   marked with the form's own "**" footnote ("nehodiace sa preškrtnúť" /
   strike out if not applicable), meaning they are completed only when
   applicable (a surname change, or an already-held authorization/licence).
5. **`administrativeFeeProof` is modelled as a `documents[]` payment entry,
   not a plain field.** Page 2 prints a blank space ("Miesto na preukázanie
   zaplatenia správneho poplatku") for affixing fee-payment proof, matching
   this registry's established `category: payment` document pattern rather
   than a fillable text field.

## Conformance fixtures (Phase 3)

10 fixtures committed under
`conformance/sk/policajny-zbor/ziadost-o-udelenie-vodicskeho-opravnenia/1.0.0/`:
2 valid (an adult applicant applying via a driving course and competence
exam with an unrestricted fitness result, and a minor applicant applying via
special training with legal-representative consent and a conditional
fitness result) plus 8 mutation-control fixtures, each derived from the
adult valid fixture by a single targeted mutation. All 10 were run against a
from-scratch, ephemeral field-by-field conformance checker (derived from
this schema's own `fields[]`/`documents[]`, not committed to the repo)
before being finalized: both valid fixtures produced **0 errors**, and each
of the 8 mutation-control fixtures produced **exactly 1 error** — a missing
required field (×3, covering the applicant section, the physician-stamp
field, and the fitness-result-groups field), an invalid enum value (×2,
covering both `applicationBasis` and `medicalFitnessResult`), an invalid
date format, an invalid boolean type, and a missing required document.

## Structural validation

- `node tools/validate.mjs registry/sk/policajny-zbor/ziadost-o-udelenie-vodicskeho-opravnenia/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/sk/policajny-zbor/ziadost-o-udelenie-vodicskeho-opravnenia/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **453/453**; `node tools/validate-ajv.mjs` → **453/453**.

## Maturity

`structural-reference`: the form's own printed structure is fully
transcribed, but no live filing at a Police Force traffic inspectorate was
attempted. GovSchema is an independent, non-profit standards body and is
not affiliated with, endorsed by, or operated by the Government of the
Slovak Republic, the Ministry of Interior of the Slovak Republic, or the
Policajný zbor.
