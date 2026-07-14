# Verification record — `bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2954**), a pre-verified
candidate created as a delegated child issue during the prior **GOV-2952**
cycle. This document opens **Bulgaria's Business Formation vertical**,
reversing the registry's own prior GOV-2830/GOV-2837 "confirmed dead end"
finding for that vertical.

## Reconciling the prior "dead end" finding

GOV-2830 and GOV-2837 confirmed that Bulgaria's Commercial Register
(Търговски регистър) Business Formation candidate was a dead end, because
`portal.registryagency.bg`'s own document-template page
(`portal.registryagency.bg/document-template-cr`) gates its actual template
files behind a client-side JavaScript portal shell with no static attachment
reachable by an unauthenticated fetch. That finding is correct as far as it
goes, but scoped only to that one portal. This cycle located a genuinely
distinct, first-party specimen of the same in-force form (Заявление А1,
Application A1) hosted on a **different** `.government.bg` domain —
`iisda.government.bg`, Bulgaria's Integrated Information System for
Administrative Services (Интегрирана информационна система за
държавните услуги) — reachable by a plain unauthenticated `curl` fetch, no
JavaScript execution required. `portal.registryagency.bg`'s own live help
page (`portal.registryagency.bg/help/topics/cr-applicationprocesses-a1.html`)
independently confirms Form A1 is the Registry Agency's current, in-force
sole-trader registration form, cross-referencing the same iisda specimen.

## Source re-verification (Phase 1)

- **Authority:** Агенция по вписванията (Registry Agency), the independent
  state agency (under the Ministry of Justice) that operates Bulgaria's
  Commercial Register and Register of Non-Profit Legal Entities
  (Търговски регистър и регистър на юридическите лица с нестопанска
  цел, ТРРЮЛНЦ).
- **URL:** `https://iisda.government.bg/adm_services/service_sample_file/105310_168762`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL` (a realistic desktop `User-Agent` header, no cookies/auth),
  not trusted from GOV-2952's prior scouting report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `395,910` bytes (GOV-2952's scouting note recorded "386KB" — 395,910 bytes
  is 386.6 KiB, consistent with that figure once accounted for as a rounded
  KiB approximation rather than a discrepancy). **sha256:**
  `1681fe286641412216f869530d3974288c0e93505694c969242f1df2357262bf`,
  independently computed this cycle with `sha256sum` against a fresh
  download.
- **File type:** a genuine Adobe **XFA-based fillable form** (field names
  follow the `topmostSubform[0].Page{N}[0].Part[0].OC[0].{Type}{N}[{idx}]`
  XFA naming convention), not a scanned image or flat specimen — a stronger
  find than GOV-2952's own scouting note anticipated (it did not identify
  AcroForm widgets, only clean extractable prose).
- **Extraction method:** `pdfjs-dist@3.11.174`, run from scratch this cycle
  in a clean scratch directory against the freshly re-fetched PDF (not the
  scouting cycle's numbers taken as given):
  - `page.getTextContent()` per page, confirming a clean, structured
    Bulgarian legal-form text layer across all 4 pages (not garbled) —
    matching GOV-2952's own extraction exactly, including page 4's full
    "Указания за попълване" (field-by-field completion instructions), which
    this cycle cross-checked word-for-word against the field groupings used
    below.
  - `page.getAnnotations()` per page, confirming **207 real Widget
    annotations** (61 on page 1, 47 on page 2, 99 on page 3, 0 on page 4 —
    the instructions page carries no form fields), plus each widget's
    `fieldType` (`Tx`/`Btn`), `checkBox`/`radioButton` flags, and `rect`.
  - Coordinate correlation: each widget's `rect` (converted to
    top-left-origin `y`) was matched against the nearest `getTextContent()`
    item at the same `y` to identify its printed label, cross-checked
    against the page 4 instructions' own numbered field references (e.g.
    "поле № 2 „Фирма&quot;", "поле № 5 „Седалище и адрес на
    управление&quot;", "поле № 18 „Физическо лице-търговец&quot;").

## Field inventory (Phase 2)

This schema models **24 `fields[]`** entries (7 `required: true`, 17
`required: false` some of which carry `requiredWhen`), **8 `documents[]`**
entries, **2 `crossFieldValidation`** rules, and **1 `exclusivityGroups`**
entry — scoped to the **initial-registration transaction type only**, per
the source form's own three-way transaction-type selector ("Вид на
вписването": първоначално вписване / пререгистрация / промяна).

| Group (page 4 instructions) | Modelled fields | Scope |
|---|---|---|
| Качество на заявителя (applicant capacity) | `applicantIsTrader`/`applicantIsProcurator`/`applicantIsAttorney`/`applicantIsOtherPersonProvidedByLaw` | Full — 4 independent checkboxes |
| Данни за заявителя (applicant identity) | `applicantName`, `applicantEgnOrLnch`, `applicantBirthPlace`, `applicantPermanentAddress` | Full |
| Основни обстоятелства §2, §4, §5 (trade name, seat) | `tradeName`, `tradeNameLatinTransliteration`, `registeredSeatAddress`, `registeredSeatPhone`/`Fax`/`Email`/`Website` | Full |
| Основни обстоятелства §6, §6а (activity) | `businessScope`, `mainActivityKidCode` | Full |
| Основни обстоятелства §18 (sole trader identity) | `soleTraderName`, `soleTraderEgn` | Full |
| Регистрация по избор чл.100 ал.5 ЗДДС (VAT election) | `vatVoluntaryRegistrationBasis` | Full — 2-way radio |
| Адрес за връчване на отказ (refusal delivery) | `refusalDeliveryElectronicConsent`, `refusalDeliveryEmail`, `refusalDeliveryAddresseeName`, `refusalDeliveryPostalAddress` | Full |
| Приложения (attachments) | `documents[]`: `specimenSignature`, `stateFeeProof`, `license`, `permit`, `professionalQualificationCertificate`, `truthfulnessDeclaration`, `documentsProvidedByApplicantDeclaration` | Bounded — see exclusions below |
| Подпис (signature) | `documents[].applicantSignature` | Full |

**Excluded from this v1.0.0** (all documented inline in `schema.json`'s own
`description`):

- **Field № 1, "ЕИК и фирма"** (unique identification code / trade name for
  a change or re-registration filing) — per the form's own instructions,
  "не се попълва при подаване на заявление за първоначално вписване"
  (not completed when filing for initial registration) — genuinely
  inapplicable to this schema's scope, not merely deferred.
- **The three-way transaction-type selector itself** ("Вид на вписването":
  първоначално вписване / пререгистрация на търговеца/клона на
  чуждестранния търговец / промяна в обстоятелствата) and the
  **"Допълнително заявление" continuation mechanism** (a routing checkbox
  plus А1/Б1/Б2/Г1 sub-options used only when a filing spans more than one
  physical form) — both out of scope for a schema versioned specifically
  around the initial-registration path; a future companion schema is
  anticipated for re-registration/change filings, following this registry's
  established precedent (e.g. `si/ajpes`'s single schema modelling all
  three SI transaction types via `requiredWhen`, vs. this BG form's much
  larger footprint per transaction type, which favors separate schemas
  instead).
- **Field № 27, "Заличаване на търговеца"** (a deregistration flag) —
  inapplicable to an initial registration by definition.
- **"Номер на предходно заявление"** (the case number of a previously
  refused application whose already-submitted documents are being reused) —
  inapplicable to a first-time filing with no prior refusal.
- **Ten of the printed attachment-checklist's ~19 items** — Актът за смърт
  на едноличния търговец (death certificate), Завещание (will),
  Удостоверение за наследници (heir certificate), two guardianship
  certificates, Удостоверение за сключен граждански брак (marriage
  certificate, чл. 128 ал. 3 СК), Препис от съдебно решение за поставяне
  под запрещение (incapacitation court decision), Удостоверение за
  актуално състояние по §4 ал.2 ЗТРРЮЛНЦ, Удостоверение за раждане (birth
  certificate), and Удостоверение по чл. 5 ал. 10 КСО — all pertain to
  succession, incapacitation, marital-consent, or re-registration
  scenarios that do not arise for a living founder's first-time
  registration, and are left as out-of-scope backlog for a future
  reregistration/deregistration companion schema rather than modelled here.

## Access notes and judgment calls

1. **Genuinely independent checkbox widgets representing a pick-one choice
   are modelled as separate booleans plus an `exclusivityGroups` entry, not
   a single `enum` field** — this registry's established precedent (see
   `si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor`'s own
   `transactionType`/`representativeType` groups, itself citing
   `ng/cac`/`se/polisen`/`fi/poliisi`). `pdfjs-dist`'s `getAnnotations()`
   distinguishes the two AcroForm constructs directly: a genuine radio
   group reports `radioButton: true` with multiple widgets sharing one
   `fieldName` and different `exportValue`s (`RadioButtonList[0]` for the
   refusal-delivery consent choice, `RadioButtonList[1]` for the VAT-basis
   choice — both modelled as `enum` fields here), whereas
   `CheckBox5[0]`-`CheckBox5[3]` (applicant capacity) report `checkBox:
   true, radioButton: false` as four genuinely independent field names —
   modelled as `applicantIsTrader`/`applicantIsProcurator`/
   `applicantIsAttorney`/`applicantIsOtherPersonProvidedByLaw` plus the
   `applicantCapacity` `exclusivityGroups` entry. Per spec §10,
   `exclusivityGroups` only enforces "at most one member true," not "at
   least one" — the same accepted gap the cited precedent carries; not
   re-litigated here.
2. **Address fields are modelled as single composite strings, not exploded
   into their dozen printed sub-boxes.** The source form gives every
   address (applicant's permanent address, the registered seat, and the
   refusal-delivery postal address) as a row of separate boxes (държава /
   област / община / населено място / п.к. / район / ж.к. / бул./ул. / № /
   бл. / вх. / ет. / ап.), each individually a distinct AcroForm widget.
   Rather than exploding each address into ~12 separate `fields[]` entries
   (which would triple this schema's field count without adding modelling
   value beyond what a single string plus a documented label already
   conveys), this schema follows the established convention already used by
   this registry for the same coordinate-box layout on a sibling BG form:
   `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s own `address` field
   ("Постоянен адрес (област, община, населено място, бул./ул., номер,
   вход, етаж, апартамент)") — one string field whose `label` enumerates
   the sub-components verbatim.
3. **`applicantEgnOrLnch`'s conditional relationship to
   `applicantBirthPlace`/`applicantPermanentAddress` is disclosed in prose,
   not encoded as `requiredWhen`.** The form's own field-by-field
   instructions state the birthplace and permanent-address fields are
   completed "когато заявителят няма ЕГН или ЛНЧ" (when the applicant has
   neither an EGN nor an LNCh) — i.e. gated on `applicantEgnOrLnch`'s
   *absence*, not on any of its present values. The Condition grammar's
   `equals`/`notEquals`/`in` operators (per `$defs/conditionLeaf`) compare
   a field's actual value and cannot express "this field was never
   supplied" — `notEquals: ""` against an optional field is a known
   anti-pattern in this registry (a field that is validly *absent* is not
   the same as one present with an empty-string value, and the two must
   not be conflated). Rather than fabricate a synthetic gating boolean not
   printed anywhere on the source form (which `spec/v0.3`'s "Spec precision
   over cleverness" bar disfavors as an invented field), this document
   states the true conditionality in each of the three fields' own
   `description` and leaves all three `required: false` — a disclosed,
   intentional gap in machine-checkability rather than a fabricated
   modelling shortcut.
4. **`vatVoluntaryRegistrationBasis` is modelled as available specifically
   in this schema's own scope, not as a general-purpose field.** The
   source's own printed note next to this election reads "(Попълва се само
   при заявяване на първоначална регистрация по ЗТРРЮЛНЦ)" — completed
   only when this filing is an initial Commercial Register registration —
   which is exactly and only this schema's modelled transaction type, so no
   additional `requiredWhen` gate was needed to encode that restriction.
5. **`applicantEgnOrLnch`/`soleTraderEgn`'s 10-digit pattern** reflects the
   well-documented, standard length of a Bulgarian ЕГН (Единен граждански
   номер) or ЛНЧ (Личен номер на чужденец) — both defined as 10-digit
   numbers under Bulgaria's population-register regulations — not printed
   as a stated digit count on the form itself (which shows blank boxes
   only, independently counted at 10 boxes per instance via
   `getAnnotations()`'s own widget count for each occurrence:
   `R69[0]`-`R78[0]` for the applicant, `NumericField22[0]`-`[9]` for the
   sole trader).
6. **`registeredSeatEmail`/`refusalDeliveryEmail` use a `pattern`, not
   `format: "email"`.** `spec/v0.3`'s `$defs/nonFileValidation` closes its
   keyword set to `pattern`/`minLength`/`maxLength`/`minimum`/`maximum`/
   `enum` only (confirmed by `tools/validate-ajv.mjs` rejecting an initial
   draft that used `format`) — corrected to a `pattern` regex before this
   version was finalized.
7. **`authority`.** The Registry Agency is modelled without an
   `operatedBy` sub-object, following this registry's majority convention
   for a standalone competent body (its own `.government.bg`/`registryagency.bg`
   domains, not a shared multi-agency portal).

## Test run (Phase 3)

No live Commercial Register (ТРРЮЛНЦ) e-portal submission was attempted:
the Registry Agency's own filing channels (the JavaScript e-portal at
`portal.registryagency.bg`, and licensed-notary/in-person filing) are
either credential-gated or require an original signed paper form —
submitting fabricated applicant/trader data against a live Bulgarian
government register is not a safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/schema.json
ok   registry/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/schema.json
ok   registry/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Two mock conformance fixtures were built against `schema.json` with a
from-scratch, ajv-free checker script (evaluates `required`/`requiredWhen`
(including `all`/`any`/`not` composition), per-type `validation` keywords,
`crossFieldValidation` (`when` + `requireAbsent`/`requirePresent`), and
`exclusivityGroups` directly against the meta-schema's own rules) — not any
author-provided tooling, since no shared `tools/conformance-runner.mjs`
exists yet in this repo (same approach as `si/ajpes`'s own precedent):

- `valid-self-filed-hairdresser-electronic-consent.json` — the sole trader
  files personally, has an EGN (so `applicantBirthPlace`/
  `applicantPermanentAddress` are correctly omitted), consents to
  electronic delivery (so the postal-delivery fields are correctly
  omitted), and does not make the optional VAT election. **0 errors.**
- `valid-attorney-filed-no-egn-postal-delivery-vat-election.json` — the
  opposite branch of every conditional gate: filed by an attorney (not the
  trader), the attorney lacks an EGN/LNCh (so birthplace/address are
  populated instead), the applicant declines electronic delivery (so the
  postal-delivery fields are populated and email is correctly omitted),
  and the sole trader elects voluntary VAT registration under Art. 100(1),
  with a regulated-activity license/permit/qualification-certificate
  attached. **0 errors.**

Five mutation-control fixtures, each a single deliberate violation of the
first valid fixture (or, for the `requiredWhen` case, the second), each
correctly raised **exactly 1 error**:

- `mutation-control-missing-required-field.json` — removes `tradeName`
  (plain `required: true`) → 1 error.
- `mutation-control-missing-required-document.json` — omits `stateFeeProof`
  (plain `required: true` document) → 1 error.
- `mutation-control-pattern-violation.json` — sets `soleTraderEgn` to
  `"123"` → 1 error (10-digit pattern violation).
- `mutation-control-exclusivity-violation.json` — sets both
  `applicantIsTrader` and `applicantIsProcurator` to `true` → 1 error
  (`exclusivityGroups` violation).
- `mutation-control-enum-violation.json` — sets
  `refusalDeliveryElectronicConsent` to `"maybe"` (not in its two-value
  enum) → 1 error, and — because the mutated value no longer equals either
  `"consent"` or `"doNotConsent"` — none of `refusalDeliveryEmail`'s
  `requiredWhen`, the two postal fields' `requiredWhen`, or either
  `crossFieldValidation` rule spuriously fire, isolating exactly one error.
- `mutation-control-crossfield-violation.json` — keeps
  `refusalDeliveryElectronicConsent: "consent"` but adds
  `refusalDeliveryPostalAddress` anyway → 1 error
  (`electronicConsentExcludesPostalDeliveryFields` `requireAbsent`
  violation).
- `mutation-control-requiredwhen-violation.json` — keeps
  `refusalDeliveryElectronicConsent: "doNotConsent"` but omits
  `refusalDeliveryAddresseeName` → 1 error (conditional `requiredWhen`
  violation).

```
$ node /tmp/check_bg_a1.mjs registry/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/schema.json conformance/bg/registry-agency/zayavlenie-a1-vpisvane-obstoyatelstva-ednolichen-targovets/1.0.0/*.json
OK ... mutation-control-crossfield-violation.json: 1 error(s) (expected 1)
OK ... mutation-control-enum-violation.json: 1 error(s) (expected 1)
OK ... mutation-control-exclusivity-violation.json: 1 error(s) (expected 1)
OK ... mutation-control-missing-required-document.json: 1 error(s) (expected 1)
OK ... mutation-control-missing-required-field.json: 1 error(s) (expected 1)
OK ... mutation-control-pattern-violation.json: 1 error(s) (expected 1)
OK ... mutation-control-requiredwhen-violation.json: 1 error(s) (expected 1)
OK ... valid-attorney-filed-no-egn-postal-delivery-vat-election.json: 0 error(s)
OK ... valid-self-filed-hairdresser-electronic-consent.json: 0 error(s)
```

A full-registry run after regenerating
`tools/govschema-client/registry-index.json` (via `npm run build-index`)
confirms no regression (see the commit's own CI run / the accompanying
`CATALOG.md` update for the exact before/after document count).
