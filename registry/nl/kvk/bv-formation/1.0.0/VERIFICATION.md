# Verification record — `nl/kvk/bv-formation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Sources examined

- **Document `(id, version)`:** `nl/kvk/bv-formation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Netherlands Chamber of Commerce ("KVK", Kamer van Koophandel),
  via a Dutch civil-law notary.
- **Primary sources:**
  - KVK Formulier 3 ("Besloten vennootschap of naamloze vennootschap
    inschrijven", March 2026 edition), downloaded directly from
    <https://production-site-nl.kvk.bloomreach.cloud/binaries/content/assets/kvkwebsite-nl/categorie/inschrijven/formulier-3-inschrijving-bv-of-nv.pdf>
    (linked from
    <https://www.kvk.nl/over-het-handelsregister/formulier-3-inschrijving-bv-of-nv/>).
    A genuine, official, fillable AcroForm PDF (7 pages), retrieved with a
    direct `curl` fetch (HTTP 200, no block).
  - KVK Formulier 11 ("Functionarissen van een rechtspersoon inschrijven",
    December 2025 edition), downloaded directly from
    <https://production-site-nl.kvk.bloomreach.cloud/binaries/content/assets/kvkwebsite-nl/categorie/inschrijven/formulier-11-inschrijving-functionaris-rechtspersoon.pdf>
    (linked from
    <https://www.kvk.nl/over-het-handelsregister/formulier-11-inschrijving-functionaris-rechtspersoon/>).
    A genuine, official, fillable AcroForm PDF (9 pages), retrieved the same way.
  - Burgerlijk Wetboek Boek 2 (BW2), Titel 5 (Naamloze en besloten
    vennootschappen), specifically §§ 2:175, 2:178, 2:186, 2:191, 2:203 —
    used only for the notarial-deed/legal-personality/pre-registration
    liability facts neither KVK form itself states (KVK's own forms assume
    the deed already exists and do not restate the underlying company-law
    rule for when a BV comes into being).
- **Cross-referenced pages:**
  - <https://www.kvk.nl/starten/de-besloten-vennootschap-bv/> — general
    process narrative (notary's role, articles of association contents,
    UBO registration, DGA salary rule).
  - <https://www.kvk.nl/inschrijven/inschrijven-besloten-vennootschap-of-naamloze-vennootschap/>
    — confirms the post-incorporation registration flow and that the notary
    typically files Formulier 3 directly.
  - <https://www.kvk.nl/over-het-handelsregister/formulieren/> — confirms
    Formulier 3 and Formulier 11 are the correct numbered forms for this
    process (as opposed to Formulier 7, used only for a bv/nv *in
    oprichting* before the deed exists, and Formulier 30, the separate UBO
    filing — see Out of scope below).
- **Field extraction method:** `pdfjs-dist`'s `getTextContent()` (full text
  layer, all pages) and `getFieldObjects()`/page-level `getAnnotations()`
  (AcroForm field names, types, and each field's PDF-level `required` flag),
  run against both PDFs in full — the same rigor already used for
  `nl/kvk/sole-proprietorship-registration-eenmanszaak`,
  `ca/on/registration/business-incorporation`, and
  `de/gewerbeamt/business-registration`.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Formulier 3, §1.1: start/continue choice and dates | `registrationType`, `startDate`, `existingBusinessName`, `existingBusinessLocation`, `existingBusinessKvkNumber`, `continuationDate`, `originalEstablishmentDate` |
| Formulier 3, §2.1: name, seat, deed date, effective date | `companyName`, `registeredSeat`, `incorporationDeedDate`, `effectiveDate` |
| Formulier 3, §3.1-3.2: issued/paid-up capital of the bv | `issuedCapitalAmount`, `issuedCapitalCurrency`, `paidUpCapitalAmount`, `paidUpCapitalCurrency` |
| Formulier 3, §5.1: trade name(s) | `primaryTradeName`, `hasAdditionalTradeNames`, `additionalTradeNames` |
| Formulier 3, §5.2-5.3: activities | `businessActivities`, `mainBusinessActivity` |
| Formulier 3, §5.4: retail/consumer sales and channels | `sellsToConsumersRetail`, `retailInShop`, `retailAtMarket`, `retailViaStreetTrading`, `retailViaInternet`, `retailFromHome`, `retailOtherChannel`, `retailOtherChannelDescription` |
| Formulier 3, §5.5-5.7: wholesale/import/export | `sellsWholesale`, `importsGoods`, `exportsGoods` |
| Formulier 3, §5.8-5.9: visiting/postal address | `businessVisitingAddress`, `hasDifferentPostalAddress`, `businessPostalAddress` |
| Formulier 3, §5.10: contact details | `businessPhoneNumber1`, `businessPhoneNumber2`, `businessWebsiteUrl`, `businessEmailAddress` |
| Formulier 3, §5.11: staff numbers | `employeeCount15PlusHoursPerWeek`, `employeeCountUnder15HoursPerWeek` |
| Formulier 3, §6.1: advertising/marketing preference | `allowMarketingUseOfAddress` |
| Formulier 3, §7.1: Waadi Act hiring-out-employees notification | `hiresOutEmployeesForPayment` |
| Formulier 3, §8: signing, accepted identity-document types | `signerLastNameAndInitials`, `signerEmail`, `signerPhoneNumber`, `signingDate`, `documents[].signerIdentityDocument`, `documents[].signerHandwrittenSignature` |
| Formulier 11, §3.1: functionaris (natural person) identity/address | `directorLastName`, `directorFirstNames`, `directorCitizenServiceNumber`, `directorDateOfBirth`, `directorPlaceOfBirth`, `directorCountryOfBirth`, `directorGender`, `directorHomeAddress`, `directorResidesOutsideNetherlands`, `documents[].directorForeignAddressProof` |
| Formulier 11, §3.2-3.3: role (bestuurder) and enig-aandeelhouder status | `directorIsSoleShareholder`, `soleShareholderSinceDate`, `documents[].soleShareholderProof` |
| Formulier 11, §3.4: bevoegdheid | `directorAuthorityType` |
| Formulier 11, §3.5: title | `directorHasTitle`, `directorTitle` |
| Formulier 11, §3.6: start date and identity/signature | `directorStartDate`, `documents[].directorIdentityDocument`, `documents[].directorHandwrittenSignature` |
| Formulier 3, Uitleg 2: statuten must be attached | `documents[].articlesOfAssociation` |
| § 2:175 BW2: incorporation by notarial deed | `documents[].notarialDeedOfIncorporation`, `incorporationDeedDate` description |

## What is NOT independently confirmed / out of scope

- **No PDF-level `required` flags.** Every AcroForm annotation on both
  PDFs was programmatically checked (`page.getAnnotations()[].fieldFlags`,
  bit 2 / value `2`, the PDF `Required` flag): **none** of Formulier 3's 131
  fields or Formulier 11's 157 fields set the PDF's own Required bit —
  the identical pattern already documented for
  `nl/kvk/sole-proprietorship-registration-eenmanszaak`. This document's
  `required: true`/`requiredWhen` assignments are therefore derived from
  the forms' own prose instructions ("Wat zijn de gegevens van...", section
  numbering implying mandatory disclosure) and standard registration
  necessity, not a confirmed submission-time gate.
- **Monistic board model (monistisch bestuursmodel) and executive /
  non-executive bestuurder split.** Formulier 11 §3.2 asks this only when
  more than one bestuurder exists; out of scope by this document's
  single-director scoping (see Scope notes below), so
  `directorAuthorityType` is constrained to the single value
  `alleen_bevoegd` rather than reproducing the form's full
  niet/alleen/gezamenlijk bevoegd enum.
- **Personenvennootschap or rechtspersoon as functionaris** (Formulier 11
  §5-§6, a partnership or legal entity acting as director) — out of scope;
  this document models only a natural-person managing director.
- **Second natural-person functionaris** (Formulier 11 §4, e.g. a second
  director or commissaris) — out of scope by the single-director scoping.
- **NV (naamloze vennootschap).** Formulier 3 covers both bv and nv on the
  same form (§1.1 offers both as siblings, and §4 is nv-only capital
  fields); this document models the bv branch only. The nv-only fields
  (oprichtingskosten, maatschappelijk kapitaal, unpaid-share
  apportionment) are not reproduced.
- **UBO (Ultimate Beneficial Owner) registration.** KVK's own guidance
  states a BV's UBOs must separately be entered in the UBO-register using
  KVK Formulier 30 ("UBO van bv, nv, SE of SCE inschrijven") — mandatory
  before KVK will register the BV at all, per the "Starten met een bv"
  overview page. This is a distinct filing with its own field set
  (identity documents, nature-of-interest evidence, percentage-of-interest
  banding) not sourced or modelled in this document; a natural sibling
  candidate for a future research cycle, matching how
  `de/handelsregister/gmbh-formation-musterprotokoll` also does not model
  Germany's equivalent Transparenzregister filing.
- **Belastingdienst (Tax Administration) post-registration steps** (VAT/
  turnover-tax number issuance) — out of scope, a downstream consequence of
  registration rather than part of the registration filing itself.
- **In-person KVK appointment / notarial appointment logistics.** Not
  modelled as a field or step; this document's scope ends at preparing the
  filing's answers.
- **Address decomposition.** `businessVisitingAddress`,
  `businessPostalAddress`, and `directorHomeAddress` are modelled as single
  free-text strings, matching each PDF's own single free-text address box
  rather than a decomposed street/number/postal-code/city object — the
  same convention `nl/kvk/sole-proprietorship-registration-eenmanszaak`
  uses for the identical box style.
- **Address shielding (afscherming).** Unlike
  `nl/kvk/sole-proprietorship-registration-eenmanszaak`'s Form 1 §2.10
  (an explicit "shield the visiting address?" checkbox), Formulier 3's
  extracted text mentions afscherming only in its explanatory ("Uitleg")
  prose, with no corresponding checkbox question in the numbered form
  itself — so no `shieldVisitingAddress`-equivalent field is modelled here;
  this asymmetry between the two sibling KVK forms is intentional, not an
  oversight, and should be re-checked against a live filing before a
  `verified` claim.

## Scope and jurisdiction notes

- Identified as the open sibling gap flagged by the GOV-1136 research cycle
  that authored `de/handelsregister/gmbh-formation-musterprotokoll`:
  `nl/kvk/sole-proprietorship-registration-eenmanszaak` covers only the
  one-owner sole-trader form, not a true limited-liability company (the
  "LLC" analogue this registry already has for GB, IE, CA/ON, NZ, IN, US-CA/
  FL, AU, DE, and FR).
- Scoped to the single-founder/single-shareholder/single-managing-director
  case, the same narrowing `de/handelsregister/gmbh-formation-musterprotokoll`
  applies to Germany's GmbH — the natural first cut for a jurisdiction's
  first true-LLC schema, deferring the multi-founder/monistic-board variant
  (Formulier 11 §4-§6) to a future version.
- Conditional flow is expressed with `requiredWhen`/`visibleWhen`
  (GSP-0013) throughout; no branch in this document's scope disqualifies
  the applicant, so no `transitions`/`exitReason` construct is used, the
  same choice `nl/kvk/sole-proprietorship-registration-eenmanszaak` made
  for the identical reason.
- `sg/acra/private-limited-company-incorporation` remains the last open
  candidate in this pair of sibling gaps (Singapore's Pte. Ltd.
  incorporation); not authored this cycle.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer completes an actual notarial
BV incorporation (or has independent confirmation from someone who has)
with a mock/test scenario, confirming: the exact requiredness KVK enforces
when Formulier 3 and Formulier 11 are filed together, whether
`shieldVisitingAddress` genuinely has no bv/nv equivalent (see above), and
whether notaris.nl's "entirely digital" incorporation path exposes any
field this document's paper-form sourcing does not — and records the
outcome here, shipping a new schema version if discrepancies are found
(VERSIONING.md §3, immutability).

## Test run

A mock `conformance/nl/kvk/bv-formation/1.0.0/application-packet.json`
scenario (Bram Hendriks, a single-founder Rotterdam management-consultancy
BV, wholesale-only, EUR 0.01 nominal paid-up capital under the post-Flex-BV
regime) was checked with a from-scratch script re-implementing this
document's own `required`/`requiredWhen`/`visibleWhen` condition grammar
(GSP-0013). Result: **0 errors** across all 61 fields (43 collected, 18
correctly marked not-applicable). Two mutation tests confirmed the
condition grammar fires correctly in both directions: (1) flipping
`registrationType` to `continuing_existing_business` without adding the
continuation-branch fields correctly raised 4 missing-required-field
errors (`existingBusinessName`, `existingBusinessLocation`,
`existingBusinessKvkNumber`, `continuationDate`); (2) dropping
`soleShareholderSinceDate` from the collected values while
`directorIsSoleShareholder` remained `true` correctly raised 1
missing-required-field error. The schema was also validated against the
GovSchema v0.3 meta-schema with `tools/validate-ajv.mjs` (pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-05** (6
months).
