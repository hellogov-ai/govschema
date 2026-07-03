# Verification record — `nl/kvk/sole-proprietorship-registration-eenmanszaak` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Sources examined

- **Document `(id, version)`:** `nl/kvk/sole-proprietorship-registration-eenmanszaak` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Netherlands Chamber of Commerce ("KVK", Kamer van Koophandel).
- **Primary source:** KVK Form 1 (Formulier 1) — "Register an eenmanszaak
  (sole proprietorship)", English translation of version August 2025,
  downloaded directly from
  <https://production-site-en.kvk.bloomreach.cloud/binaries/content/assets/kvkwebsite-en/categorie/registration/01-sole-proprietorship.pdf>
  (linked from
  <https://www.kvk.nl/en/about-the-business-register/download-form-1-registration-eenmanszaak-sole-proprietorship/>).
  This is a genuine, official, fillable AcroForm PDF, retrieved with a
  direct `curl` fetch (HTTP 200, no block).
- **Cross-referenced pages:**
  - <https://www.kvk.nl/en/starting/how-to-complete-the-online-registration-form-for-an-eenmanszaak/>
    — confirms the form's fields and the general registration flow narrative.
  - <https://www.kvk.nl/en/registration/registering-a-dutch-eenmanszaak-and-making-an-appointment/>
    — confirms the in-person KVK appointment requirement.
- **Field extraction method:** `pdfjs-dist`'s `getAnnotations()` (AcroForm
  field names, types, checkbox export values, and each field's PDF-level
  `required` flag) and `getTextContent()` (visible label/instruction text),
  run against every page of the PDF — the same rigor as
  `ca/on/registration/business-incorporation` and
  `de/gewerbeamt/business-registration`'s static-PDF extractions, and
  stronger than `sg/acra/sole-proprietorship-registration`'s
  automated-fetch-and-summarize sourcing (Bizfile has no downloadable form
  at all). The PDF is bilingual: pages 1-5 are the English translation
  (this document's primary source for field labels/descriptions), pages 6-10
  are the authoritative Dutch original: `getAnnotations()` on both page sets
  confirmed **identical field names and checkbox export values** across the
  English/Dutch mirror (e.g. `1.1_onderneming`, `2.4.1_verkoop-1`), which is
  what the form's own "About the English version of this form" section
  states ("If you answer a question in the digital English form, the same
  answer is automatically filled in on the Dutch form").
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Form 1, §1.1: start/continue choice and dates | `registrationType`, `startDate`, `existingBusinessName`, `existingBusinessLocation`, `existingBusinessKvkNumber`, `continuationDate` |
| Form 1, §1.1 (continued, page 2): original establishment date | `originalEstablishmentDate` |
| Form 1, §2.1: trade name(s) | `primaryTradeName`, `hasAdditionalTradeNames`, `additionalTradeNames` |
| Form 1, §2.2-2.3: activities | `businessActivities`, `mainBusinessActivity` |
| Form 1, §2.4: retail/consumer sales and channels | `sellsToConsumersRetail`, `retailInShop`, `retailAtMarket`, `retailViaStreetTrading`, `retailViaInternet`, `retailFromHome`, `retailOtherChannel`, `retailOtherChannelDescription` |
| Form 1, §2.5-2.7: wholesale/import/export | `sellsWholesale`, `importsGoods`, `exportsGoods` |
| Form 1, §2.8-2.10: visiting/postal address, shielding | `businessVisitingAddress`, `hasDifferentPostalAddress`, `businessPostalAddress`, `shieldVisitingAddress` |
| Form 1, §2.11: contact details | `businessPhoneNumber1`, `businessPhoneNumber2`, `businessWebsiteUrl`, `businessEmailAddress` |
| Form 1, §2.12: staff numbers | `employeeCount15PlusHoursPerWeek`, `employeeCountUnder15HoursPerWeek` |
| Form 1, §3.1: owner details | `ownerLastName`, `ownerFirstNames`, `ownerCitizenServiceNumber`, `ownerDateOfBirth`, `ownerPlaceOfBirth`, `ownerCountryOfBirth`, `ownerGender`, `ownerHomeAddress` |
| Form 1, §4.1: advertising/marketing preference | `allowMarketingUseOfAddress` |
| Form 1, §5.1: Waadi Act hiring-out-employees notification | `hiresOutEmployeesForPayment` |
| Form 1, §6: signing, accepted identity-document types | `signerLastNameAndInitials`, `signerEmail`, `signerPhoneNumber`, `signingDate`, `documents[].ownerIdentityProof`, `documents[].ownerHandwrittenSignature` |

## What is NOT independently confirmed / out of scope

- **No PDF-level `required` flags.** Every one of KVK Form 1's AcroForm
  fields was programmatically checked (`getAnnotations()[].required`) and
  **none** set the PDF's own Required bit — unlike a submission portal, a
  paper/print form of this kind typically leaves required-ness to be
  enforced at the in-person appointment, not the PDF widget. This document's
  `required: true`/`requiredWhen` assignments are therefore derived from the
  form's own prose instructions and standard registration necessity (core
  identity, trade name, activity, address, and signature-block fields), the
  same honesty discipline `au/ato/individual-tax-return-mytax` and
  `sg/iras/individual-income-tax-return-formb1` applied to their own
  prose-derived requiredness. `businessPhoneNumber1`/`businessEmailAddress`
  are modelled as required (a registration needs at least one way to
  contact the business) while `businessPhoneNumber2`/`businessWebsiteUrl`
  are modelled as optional, consistent with the form's own "Telephone
  number 1"/"Telephone number 2" ordinal naming implying the second is
  supplementary.
- **BSN (citizen service number) format.** `ownerCitizenServiceNumber` is
  modelled with an `8-or-9-digit` pattern based on the BSN's
  publicly-documented general format (Dutch central government sources: a
  BSN is 8 or 9 decimal digits, no letters or separators), not a pattern
  confirmed against KVK Form 1's own field validation, which imposes no
  length constraint on this text field. The same discipline
  `sg/acra/sole-proprietorship-registration` applied to Singapore's 6-digit
  postal code (a public fact, independently pattern-asserted) versus its
  NRIC/FIN (not independently confirmed, left as free text). The BSN's
  eleven-test (`elfproef`) checksum is not asserted at all.
- **Existing-business KVK number format.** `existingBusinessKvkNumber` is
  modelled with an 8-digit pattern based on the Business Register's
  publicly-documented KVK-number format, not a pattern confirmed against
  this specific form field.
- **Partnerships (vennootschap onder firma, VOF).** KVK publishes a
  separate, structurally similar registration form/flow for partnerships
  (two or more owners); this document scopes to the single-owner
  eenmanszaak path only, consistent with this registry's
  single-entity/single-owner scoping convention (e.g.
  `sg/acra/sole-proprietorship-registration`'s sole-proprietorship-only
  scope, `ca/on/registration/business-incorporation`'s single
  director/incorporator).
- **Online pre-fill path (`kvk.nl/eenmanszaakregistration`).** The KVK
  website also offers an online form that pre-fills the same paper Form 1;
  it was not independently reviewed, since KVK's own guidance states an
  in-person appointment is required either way and the field set is the
  same underlying Form 1 — see "Path to a `verified` claim" below.
- **Fees.** The registration fee is not modelled as authoritative structured
  data — no fee amount was reviewed for this document at all (not
  referenced in any field description), unlike several other Business
  Formation schemas in this registry that reference (but do not assert) a
  fee for context.
- **Address decomposition.** Addresses are modelled as flat single-line
  strings (`businessVisitingAddress`, `businessPostalAddress`,
  `ownerHomeAddress`), matching the PDF's own single free-text address
  boxes (§2.8, §2.9.1, §3.1) rather than a decomposed street/number/postal
  code/city object — the PDF genuinely does not break the address box down
  further, unlike `sg/acra/sole-proprietorship-registration`'s
  address-line/unit-number/postal-code triple (which reflects Bizfile's own
  guide sectioning).
- **In-person appointment / identity verification at KVK.** Not modelled as
  a field or step; KVK's own guidance states registration is only completed
  in person at a KVK office regardless of how the form was filled in. This
  document's scope ends at preparing the form's answers.

## Scope and jurisdiction notes

- This is the **first schema in this registry for the Netherlands (NL)**, a
  new jurisdiction discovered during the GOV-829 "GovSchema Standard
  Research" cycle after auditing `discovery/catalog.json` and finding no
  unauthored candidates remaining in any of the 6 focus verticals (DMV,
  Business Formation, Visa, Passport, Taxes, National ID & Civic Documents)
  across all 9 previously-catalogued jurisdictions (US, GB, IE, CA, NZ, AU,
  DE, SG, plus FR which had been added to the registry without being added
  to `discovery/catalog.json`'s `scope.jurisdictions` — fixed in this same
  commit alongside adding NL).
- Business Formation was chosen for the first NL schema because KVK Form 1
  is a directly downloadable, genuinely fillable AcroForm PDF with a stable
  field structure (unlike a login-gated portal), giving the strongest
  sourcing rigor available for a first entry in a new jurisdiction.
- Conditional flow is expressed with `requiredWhen`/`visibleWhen`
  (GSP-0013) rather than `transitions`/`exitReason`, because neither the
  "new vs. continuing" choice nor any retail-channel/address sub-question
  disqualifies the applicant from registering — every path leads to the
  same registration, just with a different subset of applicable fields.
  This differs from `sg/acra/sole-proprietorship-registration`'s
  eligibility-gate `transitions`, which genuinely exit the flow for
  foreign-owner paths this registry doesn't model.
- The multi-select retail-channel checkbox group (§2.4.1: shop / market /
  street trading / internet / from home / other) has no `array` field type
  in GovSchema v0.3 (`$defs.field.properties.type` is a closed
  string/number/integer/boolean/date/enum/file/object enum), so each
  checkbox option is modelled as its own optional boolean field, gated
  `visibleWhen sellsToConsumersRetail: true` — the same decomposition this
  registry uses wherever a source form presents a non-exclusive multi-select
  checkbox group.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer completes an actual KVK
appointment (or has independent confirmation from someone who has) with a
mock/test eenmanszaak registration, confirming: the exact requiredness KVK
enforces at the appointment for every field in this document, the BSN and
existing-KVK-number validation KVK itself applies, and whether the online
`kvk.nl/eenmanszaakregistration` pre-fill path exposes any field this
document's paper-form sourcing does not — and records the outcome here,
shipping a new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
