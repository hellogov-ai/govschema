# Verification record — `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked up the Czech Republic's national visa application

This is the recurring "GovSchema Standard Research" cycle ([GOV-1819](/GOV/issues/GOV-1819)).
The Czech Republic opened as the registry's 26th jurisdiction this cycle
(GOV-1804, `cz/mpo/jednotny-registracni-formular-fyzicka-osoba`, Business
Formation) and immediately added a 2nd vertical (`cz/md/zadost-o-zapis-silnicniho-vozidla`,
DMV) — this document continues that same build-out pattern (the same
sequencing Malaysia's `my/jpj` → `my/jim` Passport → `my/jim` Visa used),
giving the Czech Republic its **3rd of 6 verticals**.

Four candidates were screened in parallel this cycle for the Czech
Republic's remaining Passport/Taxes/Visa/National ID gaps:

- **Passport** — DEAD END. Both `mv.gov.cz` and `portal.gov.cz` state
  identically that citizens do not complete a printed application form for
  a passport; a clerk enters the applicant's data directly into the system
  and captures biometrics (facial image, plus fingerprints over age 12)
  in person. `mv.gov.cz`'s own "Tiskopisy a vzory" (forms library) does not
  list a passport application PDF.
- **National ID (občanský průkaz)** — DEAD END, the same pattern:
  `portal.gov.cz` explicitly states the applicant does not fill out or
  submit a form; the municipal office generates and prints the application
  electronically from the citizen's existing data, and the applicant only
  verifies and signs it in person. `zákon č. 269/2021 Sb., o občanských
  průkazech` specifies required *documents*, not a field-by-field form
  layout, since none exists.
- **Taxes** — STRONG but LARGER-SCOPE candidate, left as an open backlog
  item rather than authored this cycle. `financnisprava.gov.cz` directly
  publishes both the current personal income tax return (Form 25 5405, "vzor
  č. 30") and its own field-by-field "Pokyny k vyplnění" (MFin 5405/1, "vzor
  č. 34") instructions guide, no login/CAPTCHA/WAF gate. The base return
  alone has ~85 numbered lines plus four annexes with their own numbering up
  to line 414 for business/capital/rental/other income — a larger single-session
  scope than this document's Visa candidate. Confirmed a genuinely strong,
  ready-to-author candidate for a future cycle.
- **Visa** — the candidate this document models. See below.

## Sources examined

- **Document `(id, version)`:** `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Foreign Affairs (Ministerstvo zahraničních věcí, MZV).
- **Primary source (field-by-field, the form itself):**
  <https://mzv.gov.cz/public/45/84/57/525242_423344_zov_EN.pdf>, the
  Ministry's own bilingual Czech/English "Žádost o udělení dlouhodobého
  víza" / "Application for long-stay visa" (form ŘSCP č. 1/2010, 5 pages),
  fetched directly (HTTP 200, no login/CAPTCHA/WAF gate) from the visa-forms
  index page <https://mzv.gov.cz/jnp/en/information_for_aliens/visa_form/index.html>.
- **Extraction method.** The PDF's text layer uses a custom font encoding
  with no ToUnicode CMap, so direct text extraction (`pdfjs-dist`) produces
  garbled/unreadable output — a distinct failure mode from this registry's
  more common "zero AcroForm fields, flat print-layout PDF" case (e.g. the
  Polish/Czech/Malaysian precedents), where the text layer itself is
  readable even without interactive fields. Each of this form's 5 pages was
  instead rendered to a high-resolution PNG (`pdfjs-dist` + `node-canvas`)
  and read visually, with every field cross-checked twice against the
  rendered image. No field below was guessed; the one disclosed ambiguity
  (the un-numbered "Application number" box, adjacent to the Embassy/Consulate
  stamp box) is treated as office-assigned and not modelled as an applicant
  field.
- **Duplicate-detection comparison.** Per this registry's established
  convention (Poland's, Spain's, Portugal's, and Switzerland's national
  D-visa forms were each found to be field-for-field duplicates of
  `de/auswaertiges-amt/national-visa-application`), this form's full field
  sequence was compared against that same German template before authoring.
  **Verdict: genuinely distinct, not a duplicate.** The opening identity
  block (items 1-9: surname, surname at birth, first names, date/place of
  birth, nationality at birth, current nationality, sex, marital status)
  follows the same Schengen-harmonized numbering convention shared across
  every EU member state's national long-stay visa form, but diverges
  sharply from item 10 onward: an **unconditional** parents block (not
  minor-gated, unlike the German form, which has no equivalent parents
  section at all — the Czech form is the only one in this registry to
  require parents' details universally on a *visa*, as distinct from the
  passport/national-ID contexts where that pattern is more common); a
  distinct "employer after entry" field (item 20) with no German
  counterpart; a structured "previous stay in the Czech Republic longer
  than 3 months" address+purpose block (item 22) absent from the German
  form; a Czech-specific "Executive manager — participation in the company
  arising under the Act 513/1991" purpose option (item 28), citing the
  Czech Commercial Code verbatim, with no equivalent in Germany's purpose
  enum; and a fully structured "inviting person or company" block (item 33,
  10 fields: name, address, phone, fax, email) that the German form has no
  counterpart for at all. The German form, in turn, has several sections
  entirely absent here (a `previouslyInGermany`/`previousStaysDetails`
  block, criminal-conviction and notifiable-disease declarations, and an
  accompanying-family-members question distinct from the children table).
  Net: a genuinely distinct national form sharing only its opening
  Schengen-harmonized numbering convention with Germany's, not a
  field-for-field republication of it.
- **Companion Schengen (short-stay) visa form — confirmed duplicate, not
  modelled.** <https://mzv.gov.cz/public/fe/ee/98/6103975_3488176_ENGLISH.pdf>,
  the Czech Republic's own Schengen short-stay visa application, was also
  fetched and rendered. Its purpose-of-journey checkboxes (Tourism/Business/
  Visiting family/Cultural/Sports/Medical/Study/Airport transit/Other) and
  funding section ("Cost of travelling and living...covered by
  applicant/sponsor," Cash/Traveller's cheques/Credit card) match the EU
  Annex I harmonized template verbatim, in the same order, as the
  already-modelled `fr/france-visas/schengen-visa-application` — a
  confirmed duplicate per this registry's established convention for
  Poland's, Spain's, Portugal's, and Switzerland's equivalent Schengen
  forms. Not authored.
- **Retrieved / reviewed:** 2026-07-08.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What the form's 40 numbered items map to

- **Items 1-9** (identity, nationality, sex, marital status) →
  `surname` through `maritalStatus`.
- **Items 10-11** (father's and mother's surname/first name, unconditional) →
  `fatherSurname` through `motherFirstName`.
- **Items 12-16** (travel document type/number/issuer/dates) →
  `travelDocumentType` through `travelDocumentValidUntil`.
- **Item 17** (permission to return to a country of residence other than
  the country of origin, with a number and validity date if "yes") →
  `hasPermissionToReturnToResidenceCountry` through
  `returnPermissionValidUntil`, the latter two `requiredWhen` the boolean is
  `true`. The form does not itself gate item 17 on a separate
  "country of residence" field, so the base boolean is left `required: false`
  with a description noting its conditional applicability.
- **Items 18-20** (current occupation; employer/school name, address,
  phone; employer/institution after Czech Republic entry) →
  `currentOccupation` through `employerAfterEntryCzechRepublic`.
- **Item 21** (place of long-term residence abroad — a full address block)
  → `residenceAbroad*` (six fields), all optional: applicable only to
  applicants who maintain a residence abroad distinct from their country of
  origin, which the form does not gate with an explicit checkbox.
- **Item 22** (previous stay in the Czech Republic longer than 3 months —
  address + purpose) → `previousStayOver3Months*` (six fields), all
  optional for the same reason as item 21.
- **Items 23-24** (address for stay in the Czech Republic; postal address
  if different) → `stayAddress*` (five fields, `required: true` — this is
  the core address the visa is being requested for) and `postalAddress*`
  (five fields, optional, "if different from" the stay address per the
  form's own wording).
- **Items 25-27** (requested duration in days; other Czech visas in the
  past three years; previous stays in other Schengen states) →
  `intendedStayDurationDays` through `previousSchengenStaysDetails`, the
  latter collapsing the form's own 3-row table into one free-text field —
  the same treatment this registry uses elsewhere for small repeating
  tables (e.g. `de/auswaertiges-amt/national-visa-application`'s
  `previousStaysDetails`).
- **Item 28** (purpose of stay, an 11-option checkbox list including the
  Czech-specific "Executive manager" option) → `purposeOfStay` /
  `otherPurposeDetails`.
- **Items 29-32** (arrival/departure dates, place of entry, means of
  transport) → `dateOfArrival` through `meansOfTransport`.
- **Item 33** (inviting natural person or legal entity — name, address,
  phone, fax, email) → `invitingPersonName` through `invitingPartyEmail`
  (ten fields), all optional: applicable only when there is an inviting
  party, which the form does not gate with a separate checkbox (it ties
  loosely to purposeOfStay values like `invitation`/`family-visit`, but the
  form itself does not state this as a hard rule, so no `requiredWhen` was
  added).
- **Item 34** (manner of funding the stay — Myself/Host person/Host
  company, plus supporting documents) → `fundingMethod` /
  `fundingSupportingDocuments`.
- **Item 35** (means of support — cash, credit cards, traveller's cheques,
  other; plus a separate travel/health insurance checkbox and validity
  date) → `hasCashFunds` through `travelOrHealthInsuranceValidUntil`. These
  four means-of-support checkboxes are modelled as independent booleans
  rather than a single enum, since the source form presents them as
  separately-checkable boxes an applicant may combine (e.g. both cash and
  credit cards) — the same "independent checkbox" pattern this registry
  used for `cz/md/zadost-o-zapis-silnicniho-vozidla`'s vehicle-colour
  checkboxes, but *not* wrapped in an `exclusivityGroups` constraint here,
  since nothing on this form indicates these four are mutually exclusive
  (unlike a vehicle's single colour).
- **Item 36** (spouse/registered partner — surname, surname at birth,
  first name, date/place of birth, nationality) → `spouseSurname` through
  `spouseNationalityCode`, `requiredWhen`/`visibleWhen` `maritalStatus` is
  `married` or `registered-partnership` — the same conditional-gating
  pattern `de/auswaertiges-amt/national-visa-application` uses for its own
  spouse block.
- **Item 37** (children, 4 labelled slots, form's own caveat that "Applications
  must be submitted separately for each passport") → `childrenCount` /
  `childrenDetails`, the latter collapsing the 4-slot table into one
  free-text field, `requiredWhen` `childrenCount` is greater than 0.
- **Items 38-40** (applicant's home address, telephone, e-mail — page 5) →
  `applicantHomeAddress` through `applicantEmail`. `applicantHomeAddress` is
  modelled as a single free-text line, distinct from the structured
  `residenceAbroad*` (item 21, a long-term residence abroad) and
  `stayAddress*` (items 23-24, the intended Czech Republic stay address)
  blocks — see the field's own `description`.
- **Photo requirement** (page 1 header, "FOTO / PHOTO 3,5 x 4,5 cm") and
  the **page 1 "For Official Use Only" supporting-documents checklist**
  (valid passport; means of subsistence; proof of accommodation;
  certificate of good conduct, citing § 174 zákona č. 326/1999 Sb. verbatim;
  medical report, citing § 31 odst. 5 písm. b) zákona č. 326/1999 Sb.
  verbatim; invitation; proof of means of transport; health insurance;
  document confirming purpose of stay) → the ten non-attestation
  `documents[]` entries. Although this checklist is printed in the form's
  office-use column, it lists documents the *applicant* must supply for the
  consulate to check off, not an office-only administrative record — the
  same treatment this registry gives supporting-evidence checklists printed
  alongside (rather than inside) an applicant's own answer boxes.
- **The page 5 bilingual 8-point declaration** (data-accuracy statement,
  legal basis citations to zákon č. 326/1999 Sb. and zákon č. 101/2000 Sb.,
  biometric/fingerprinting consent, undertaking to leave before visa
  expiry, and the 3-business-day address-reporting obligation), **signed
  once** (with a minor/guardian alternative signatory noted) → the single
  `declarationAndConsent` attestation document, with the full verbatim
  English text of all eight points reproduced in `statement`. Modelled as
  one attestation (unlike the German form's two independently-signed
  declaration/legal-notice blocks) because this form places all eight
  points above a single shared signature/date line, not two.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, a one-off Node.js script (not committed to the repo) implementing the
same `equals`/`in`/`greaterThan`/`greaterThanOrEqual`/`all`/`any`/`not`
`Condition` grammar as GSP-0013 checked every `type`/`required`/
`requiredWhen`/`visibleWhen`/`validation` constraint and both
`crossFieldValidation` rules in `schema.json` against five scenarios:

```
OK   Scenario 1: solo single applicant, self-funded, no branch triggers
OK   Scenario 2: married w/ spouse+children, host-company funded, prior CZ stay, other purpose
OK   Scenario 3: registered partnership, other travel document, executive-manager purpose, return permission
FAIL Negative control: missing spouseFirstName while registered-partnership (expected FAIL)
    - MISSING required field: spouseFirstName
FAIL Negative control 2: travel document validUntil before dateOfIssue (expected FAIL on crossFieldValidation)
    - crossFieldValidation FAILED: travelDocumentValidAfterIssue
```

Scenarios 1-3 together exercise every `requiredWhen`/`visibleWhen` branch
this document defines (return-permission number/date; other-travel-document
detail; other-purpose detail; other-funds detail; travel/health-insurance
validity date; spouse block; children detail) and both
`crossFieldValidation` rules, all of which held. The two negative controls
confirm the evaluator actually enforces `requiredWhen` and
`crossFieldValidation` (correctly reporting a missing spouse first name once
`maritalStatus` is `registered-partnership`, and correctly rejecting a
travel document whose validity predates its issue date) rather than
trivially passing everything. The first run of scenario 1 caught a gap in
the *test data* (a missing `purposeOfStay` value), not a schema defect —
corrected before the final run above. No defects were found in the schema
itself.

Both registry validators were run against the schema document itself and pass:

```
$ node tools/validate.mjs registry/cz/mzv/zadost-o-udeleni-dlouhodobeho-viza/1.0.0/schema.json
ok   registry/cz/mzv/zadost-o-udeleni-dlouhodobeho-viza/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/cz/mzv/zadost-o-udeleni-dlouhodobeho-viza/1.0.0/schema.json
ok   registry/cz/mzv/zadost-o-udeleni-dlouhodobeho-viza/1.0.0/schema.json [v0.3]
```

The full registry continues to validate after this addition (see PR for the
exact before/after document counts).

## What is NOT modelled (out of scope), and why

- **The Schengen (short-stay) visa form** — confirmed a field-for-field
  duplicate of `fr/france-visas/schengen-visa-application` (see above); not
  modelled, per this registry's established convention.
- **The office-only administrative columns printed on every page** ("Datum
  podání"/date of submission, "Zpracováno kým"/processed by, visa
  type/entry-count/validity-period boxes, and the final visa-sticker/
  officer-signature box) — completed by consulate staff, not the applicant.
- **The un-numbered "Application number" box** (page 1, adjacent to the
  Embassy/Consulate stamp) — treated as office-assigned at intake, not an
  applicant-supplied field, per the disclosed ambiguity above.
- **Purpose-specific supplementary evidence** a given consulate may request
  beyond the ten documents this form's own checklist names (e.g. a
  specific employment contract for the `employment` purpose, or admission
  paperwork for `study`) — out of scope for this base form, the same
  modelling boundary this registry draws elsewhere (e.g. the German
  national-visa document's own "purpose-specific supplementary question
  sets" exclusion).

## Scope and jurisdiction notes

- This is the Czech Republic's first Visa-vertical document. `cz/mpo/*` and
  `cz/md/*` cover Business Formation and DMV respectively; this document
  opens a third CZ authority segment, `cz/mzv/*`.
- `id` uses the form's own Czech title, `zadost-o-udeleni-dlouhodobeho-viza`
  (ASCII-folded from "Žádost o udělení dlouhodobého víza"), consistent with
  this registry's existing `cz/mpo/jednotny-registracni-formular-fyzicka-osoba`
  and `cz/md/zadost-o-zapis-silnicniho-vozidla` naming.
- Conditional requiredness/visibility uses `requiredWhen`/`visibleWhen`
  (GSP-0013), targeting spec v0.3, the same as every other Visa-vertical
  document in this registry.
- Coded fields (`*CountryCode`, `*NationalityCode`, `travelDocumentIssuedByCode`)
  are modelled as plain `string` fields with a 3-character `maxLength`: the
  source PDF prints three boxes per code but does not itself specify which
  code list (e.g. ISO 3166-1 alpha-3) applies, so no `pattern` constraint
  was added beyond length.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-08** (6
months). Because `status` remains `draft` (this document was authored from
the canonical PDF form but has not been checked against a live consulate
submission), a future review should prioritize confirming the effective
code list for the form's `(kód)/(code)` fields and re-confirming the
supporting-document checklist against any updated Ministry guidance.
