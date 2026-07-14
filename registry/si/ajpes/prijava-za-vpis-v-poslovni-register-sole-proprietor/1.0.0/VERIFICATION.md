# Verification record — `si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2910**), following on from
GOV-2908's screening cycle, which identified this exact AJPES form as a
strong, genuine, unauthenticated Business Formation candidate. This document
opens **Slovenia as the registry's 53rd jurisdiction**, via Business
Formation (1 of 6).

## Source re-verification (Phase 1)

- **Authority:** AJPES (Agencija Republike Slovenije za javnopravne evidence
  in storitve — the Agency of the Republic of Slovenia for Public Legal
  Records and Related Services), an independent public agency.
- **URL:** `https://www.ajpes.si/doc/spot/29_Prijava_za_vpis_v_PRS_za_sp.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL`, not trusted from GOV-2908's prior scouting report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `1,450,034` bytes — matches the figure GOV-2908 recorded exactly. **sha256:**
  `ded369176dfb9c344039ad73738b14dd157b971e9f85e95424d109fd910f0f58` —
  independently computed this cycle with `sha256sum` against a fresh
  download, and separately confirmed byte-identical to the scouting cycle's
  own cached copy (`/tmp/slo/prs1-sp.pdf`) via a second `sha256sum`
  comparison.
- **File type:** a genuine PDF with a real AcroForm (`%PDF` header, not a
  scanned image or a legacy `.doc`).
- **Extraction method:** `pdfjs-dist@3` (`getFieldObjects()` for the AcroForm
  field inventory — name, type, rect, page, radio/checkbox export values —
  plus `getTextContent()` per page for label correlation by coordinate),
  run from scratch this cycle in a clean scratch directory against the
  freshly re-fetched PDF (not the scouting cycle's numbers taken as given).
  Confirmed **5 pages** and **52 AcroForm fields** — both exactly matching
  the issue's own claim. Every one of the 52 field names was individually
  mapped to a section/label via its rect's page position and the
  surrounding page text, and every one is accounted for by exactly one
  `fields[]` entry in `schema.json` (a strict 1:1 correspondence — see the
  per-page tally in judgment call 1 below).

## Field inventory (Phase 2)

All 52 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header (transaction type) | `isNewRegistration`, `isDataChange`, `isDeregistration` | Full — 3 independent checkboxes |
| PODATKI O PODJETJU PODJETNIKA (company) | `businessRegistrationNumber`, `proposedEntryDate`, `companyName`, `abbreviatedCompanyName`, `businessAddress`, `businessAddressOwnedByApplicant` | Full |
| PODATKI O PODJETNIKU (owner) | `ownerFullName`, `ownerResidentialAddress`, `ownerTaxNumber` | Full |
| KONTAKTNI PODATKI (contact) | `contactPhone`, `contactEmail`, `contactWebsite`, `contactInfoPubliclyPublished` | Full |
| PODATKI O ZASTOPNIKU (representative) | `representativeIsProkurist`/`representativeIsDeathContingencyRepresentative`, `representativeFullName`, `representativeAddress`, `representativeEmsoOrTaxNumber` | Full |
| REGISTRIRANE DEJAVNOSTI ... (activities) | `mainActivityCode`/`mainActivityName`, `otherActivity1..4Code`/`Name` | Full — the form's own 5-row (1 main + 4 other) capacity, not a bounded subset |
| PODATKI O PODRUŽNICAH (branch) | `branchIsNewRegistration`/`branchIsDataChange`/`branchIsDeregistration`, `branchName`, `branchRegistrationNumber`, `branchAddress`, `branchAddressOwnedByApplicant` | Full — one branch, the form's own capacity |
| PODATKI O ZASTOPNIKU PODRUŽNICE (branch representative) | `branchRepresentativeFullName`, `branchRepresentativeAddress`, `branchRepresentativeEmsoOrTaxNumber` | Full |
| REGISTRIRANE DEJAVNOSTI PODRUŽNICE (branch activity) | `branchMainActivityCode`, `branchMainActivityName` | Full — one row only, no "other activities" table for the branch |
| Sklep ... želim prejeti (decision delivery) | `decisionDeliveryMethod`, `decisionDeliveryEmailAddress` | Full |
| Prijavi so priložene ... (attachments) | `attachmentOwnerConsentStatement`, `attachmentRepresentativeConsent`, `attachmentPowerOfAttorney`, `attachmentOther`, `otherAttachmentDescription` | Full |
| Closing | `signatureDate`, `sealUsage`, `documents[].applicantSignature` | Full |

Total: **52 `fields[]`** entries (11 `required: true`, 41 `required: false`
some of which carry `requiredWhen`) plus **1 `documents[]`** entry, **2
`crossFieldValidation`** rules, and **3 `exclusivityGroups`** entries.

### Per-page field tally (independent cross-check against the 52-field claim)

- **Page 1** (16 unique AcroForm field names): `Vpis`, `Sprememba`, `Izbris`,
  `Maticna stevilka`, `Predlagani datum`, `Popolno ime firma`, `Skrajsano ime
  firme`, `Poslovni naslov`, `Sem lastnik` (radio group), `Ime in priimek`,
  `Stalno zacasno prebivalisce`, `Davcna stevilka`, `Telefon`, `Elektronska
  posta`, `Spletni naslov`, `yes` (radio group) → 16 `fields[]` entries.
- **Page 2** (22 unique AcroForm field names): `Prokurist`, `Zastopnik za
  primer smrti`, `Ime in priimek zastopnik`, `Stalno zacasno prebivalisce
  zastopnik`, `EMSO-Davcna stevilka zastopnik`, `1`, `naziv podrazreda`,
  `naziv podrazreda2`, `2`, `3`, `naziv podrazreda3`, `4`, `naziv
  podrazreda4`, `5`, `naziv podrazreda5`, `Vpis podruznice`, `Sprememba pri
  podruznici`, `Izbris podruznice`, `Ime podruznice`, `Maticna stevilka
  podruznice`, `Naslov podruznice`, `Sem lastnik objekta` (radio group) → 22
  `fields[]` entries.
- **Page 3** (14 unique AcroForm field names): `Ime in priimek2`, `Stalno oz
  zacasno prebivalisce2`, `EMSO ali davcna2`, `11`, `naziv podrazreda1`,
  `zelim prejeti` (radio group, 3 export values), `enaslov-vrocanje`,
  `Izjava lastnika`, `Soglasje prokurista`, `Pooblastilo za vlozitev`,
  `Drugo`, `Navedba drugega`, `Datum`, `dZig` (combobox) → 14 `fields[]`
  entries.
- 16 + 22 + 14 = **52**, matching `getFieldObjects()`'s own count exactly,
  and every named field is used exactly once (confirmed by diffing the full
  raw field-name list against the schema's `sourceRef` citations — no field
  left unmapped, no field double-counted from appearing as multiple widget
  instances on different pages under the same name, which the AcroForm does
  for `Prokurist`/`Zastopnik za primer smrti`/`Sem lastnik objekta` — see
  judgment call 2).

## Access notes and judgment calls

1. **Genuinely independent checkbox widgets (not a native PDF radio group)
   representing a pick-one choice are modelled as separate booleans plus an
   `exclusivityGroups` entry, not a single `enum` field.** `pdfjs-dist`'s raw
   field dump distinguishes the two AcroForm constructs clearly: a true
   radio group is one field `name` with multiple `kidIds`/widgets sharing
   different `exportValues` (`Sem lastnik`, `yes`, `zelim prejeti` all take
   this shape and are modelled as `enum` fields), whereas `Vpis`/`Sprememba`/
   `Izbris`, `Vpis podruznice`/`Sprememba pri podruznici`/`Izbris
   podruznice`, and `Prokurist`/`Zastopnik za primer smrti` are each **three
   (or two) separate field names**, each its own independent `checkbox`
   type with `exportValues: "Yes"`. This registry has an established
   precedent for exactly this distinction: `ng/cac/cac-1-1-application-for-
   registration-of-company`'s `typeOfCompanyLimitedByShares` etc., whose own
   field description cites the same `se/polisen`/`fi/poliisi` precedent for
   "a genuinely independent (non-radio) set of ... checkbox widgets
   representing a single-select choice." Followed here for
   `isNewRegistration`/`isDataChange`/`isDeregistration` (`transactionType`
   group), `representativeIsProkurist`/
   `representativeIsDeathContingencyRepresentative` (`representativeType`
   group), and `branchIsNewRegistration`/`branchIsDataChange`/
   `branchIsDeregistration` (`branchTransactionType` group). Per spec §8.4,
   `exclusivityGroups` only enforces "at most one member set," not "at least
   one" — the same accepted gap the `ng/cac` precedent carries; not
   re-litigated here.
2. **Requiredness for the owner-identity and activity fields is derived
   directly from the form's own footnotes 1 and 2, not assumed uniform
   across all three transaction types.** Footnote 1 (Sprememba) states the
   filer states the base fields (registration number, company name, business
   address, dates) "ter podatke, ki se s prijavo spreminjajo" (plus whatever
   data is actually changing) — not the full identity/activity set
   unconditionally. Footnote 2 (Izbris) is stronger still: it states the
   filer states **only** ("le") the registration number, company name,
   business address, and the two dates — explicitly excluding owner
   identity, activities, contact, representative, and branch data. Reading
   both together, only a **new registration** unambiguously requires the
   full owner-identity and main-activity set; this v1.0.0 therefore models
   `ownerFullName`, `ownerResidentialAddress`, `ownerTaxNumber`,
   `mainActivityCode`, and `mainActivityName` with `requiredWhen: { "field":
   "isNewRegistration", "equals": true }` rather than a blanket `required:
   true`, replacing what would otherwise be unencoded prose with a
   machine-checkable rule (the same rationale GSP-0013's own design record
   gives for `requiredWhen` generally).
3. **`branchRegistrationNumber`'s `requiredWhen` (change/deletion only) is
   an inferred judgment call, not a transcribed rule** — disclosed as such
   in the field's own `description`. The form prints footnote 3 explicitly
   for the *main* section's `businessRegistrationNumber` ("only in case you
   selected Sprememba or Izbris"), but no analogous footnote exists for the
   branch subsection. The inference (a newly registered branch cannot yet
   have a number) mirrors footnote 3's stated logic exactly, but is
   flagged as an extrapolation rather than a first-party-sourced rule.
4. **`attachmentOwnerConsentStatement`'s `requiredWhen` is a genuine,
   footnote-15-backed rule**, unlike judgment call 3: "priložite samo v
   primeru, da samostojni podjetnik ni (so)lastnik objekta na poslovnem
   naslovu ali poslovnem naslovu podružnice" (attach only if the sole
   proprietor is not the (co-)owner of the business or branch address)
   translates directly to `requiredWhen: { "any": [
   {"field":"businessAddressOwnedByApplicant","equals":"no"},
   {"field":"branchAddressOwnedByApplicant","equals":"no"} ] }`.
   `attachmentPowerOfAttorney`'s footnote 16 condition ("required if signed
   by an authorized representative rather than the sole proprietor
   personally") is **not** encoded the same way, since the form has no
   separate "who is signing" field to gate on (the closing signature line
   covers both possibilities on one blank) — left as a plain optional
   checklist item, with the gap disclosed in its own `description` rather
   than silently assumed away.
5. **The 5-row (1 main + 4 other) activities table is modelled in full, not
   bounded**, unlike several peer registry schemas (e.g.
   `hr/portor/prijava-za-upis-u-obrtni-registar`'s 3-of-18 bound). Footnote
   10 states the filer lists all activities actually conducted, and only
   attaches a separate list if there are **more than 5** — 5 rows is the
   form's own full printed capacity, not an arbitrary registry-imposed cap.
6. **`dZig` (a combobox, not a decorative field) is modelled as the enum
   `sealUsage`.** Its raw `pdfjs-dist` dump shows two genuine `items`:
   `"Poslujemo brez žiga"` (we operate without a company seal) and `"Žig"`
   (a seal is used) — a real declaration accompanying the closing signature,
   reflecting Slovenia's abolition of the mandatory company seal, not a
   rendering artifact.
7. **`ownerTaxNumber`'s 8-digit pattern and `representativeEmsoOrTaxNumber`/
   `branchRepresentativeEmsoOrTaxNumber`'s 8-or-13-digit pattern are drawn
   from independently researched, well-documented Slovenian identifier
   formats** (davčna številka: 8 digits, last a check digit, per the
   `SI########` VAT-ID convention; EMŠO: 13 digits, `DDMMYYYRRBBBK`), not
   printed on the form itself (which shows blank lines only) — the same
   category of gap other registry schemas disclose when applying a
   well-known national identifier format (e.g. `hr/porezna-uprava`'s OIB
   pattern).
8. **No shared/reusable "address" field-type exists in `spec/v0.3`** (the
   field model is deliberately flat) — owner, business, representative,
   branch, and branch-representative addresses are each modelled as their
   own flat string field, consistent with this registry's established
   convention for parallel address blocks (e.g. `hr/portor`'s
   `owner*`/`business*` prefixes).
9. **`authority`.** AJPES is modelled without an `operatedBy` sub-object
   (its `basis` member is `REQUIRED` whenever `operatedBy` is present, per
   spec §6.3) — the majority convention in this registry (407 of 434 existing
   schemas have no `operatedBy`) for a standalone competent body rather than
   a shared portal. AJPES's own published regulations page
   (`ajpes.si/Registri/Poslovni_register/Predpisi`) names **Zakon o
   Poslovnem registru Slovenije (ZPRS-1)**, Uradni list RS št. 49/06 (adopted
   2006-04-26, published 2006-05-12), as the governing act — independently
   confirmed this cycle via a first-party AJPES source, though the specific
   supervising ministry (if any, beyond AJPES's own independent-agency
   status) could not be confirmed from the sources reached this cycle and is
   not asserted. **Forward-looking disclosure:** a successor act, ZPRS-2,
   was adopted 2025-10-23 and published in Uradni list RS on 2025-11-06,
   entering into force ("veljavnost") 2025-11-21 — but its actual
   application ("uporaba") is deferred to 2027-12-21, so ZPRS-1 remains the
   operative law as of this cycle's 2026-07-14 verification date. A future
   review cycle (this document's `nextReviewBy` is 2027-01-14, well before
   ZPRS-2's application date, so the ordinary review cadence will catch this
   in due course) should re-check whether the PRS-1 sp form itself has
   changed by the time ZPRS-2 actually applies.

## Test run (Phase 3)

No live AJPES/eVEM/SPOT submission was attempted: AJPES's own point-of-single-
contact (SPOT) and eVEM channels are authenticated, credential-based systems,
and the paper channel requires mailing or hand-delivering an original signed
(and, per footnote 14, sometimes notarized) form to a regional AJPES
izpostava — submitting fabricated applicant data against a live Slovenian
government registry is not a safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor/1.0.0/schema.json
ok   registry/si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor/1.0.0/schema.json
ok   registry/si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Two mock conformance fixtures were built against `schema.json` with a
from-scratch, ajv-free checker script (evaluates `required`/`requiredWhen`
(including `all`/`any`/`not` composition), per-type `validation` keywords,
`crossFieldValidation` (`when`+`requireAbsent`/`requirePresent`, and
`compare`), and `exclusivityGroups` directly against the meta-schema's own
rules) — not any author-provided tooling, since no shared
`tools/conformance-runner.mjs` exists yet in this repo (same approach as
`ke/nrb/application-for-identity-card`'s own precedent):

- `scenario-new-registration.json` — a first-time sole-proprietor
  registration (hairdressing services, Ljubljana), full owner identity and
  main-activity data, business address self-owned, decision by mail.
  **0 errors.**
- `scenario-deregistration.json` — a deregistration filing exercising the
  minimal field set footnote 2 actually requires (registration number,
  company name, business address, dates, decision method), business address
  not owned by the applicant, with the resulting owner-consent attachment
  correctly triggered. **0 errors.**

Six mutation-control fixtures, each a single deliberate violation of the
first valid fixture, each correctly raised **exactly 1 error**:

- `mutation-missing-required.json` — removes `ownerFullName` (required when
  `isNewRegistration`) → 1 error.
- `mutation-pattern-violation.json` — sets `ownerTaxNumber` to `"123"` → 1
  error (8-digit pattern violation).
- `mutation-enum-violation.json` — sets `businessAddressOwnedByApplicant` to
  `"maybe"` (not in the `["yes","no"]` enum) → 1 error.
- `mutation-exclusivity-violation.json` — sets both
  `representativeIsProkurist` and
  `representativeIsDeathContingencyRepresentative` to `true` → 1 error
  (`exclusivityGroups` violation). (Doing the equivalent for the
  `transactionType` group instead cascades into a second,
  `crossFieldValidation`-driven error, since the schema's own rules assume
  at most one transaction type is ever selected — an inherent, correct
  consequence of the violation itself, not a fixture defect; the
  `representativeType` group was used instead to isolate exactly one error.)
- `mutation-crossfield-violation.json` — sets `businessRegistrationNumber`
  while `isNewRegistration` is `true` → 1 error (`crossFieldValidation`
  `requireAbsent` violation).
- `mutation-conditional-violation.json` — sets `decisionDeliveryMethod` to
  `"by_email"` without adding `decisionDeliveryEmailAddress` → 1 error
  (conditional `requiredWhen` violation).

A full-registry run after regenerating
`tools/govschema-client/registry-index.json` (via `npm run build-index`)
confirms no regression:

```
$ node tools/validate.mjs
435/435 document(s) passed. 3/3 mapping.json companion(s) passed.
```

(Up from 434/434 on `main` before this document was added.)
