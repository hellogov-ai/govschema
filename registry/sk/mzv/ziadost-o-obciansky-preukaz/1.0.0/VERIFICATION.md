# Verification record — `sk/mzv/ziadost-o-obciansky-preukaz` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-3019**, child issue
**GOV-3014**), pre-scouted during **GOV-3010**'s parallel-verticals
screening pass. Slovakia stood at 3 of 6 verticals (Business Formation,
Taxes, DMV) at the start of this issue. This document opens Slovakia's
**National ID & Civic Documents vertical (1 of 6, now 4 of 6 overall)**.

## Scouting handoff

GOV-3010's scouting note (re-verified from scratch this cycle, not trusted
as-is) identified `slovensko.sk`'s `MZV.RequestIdentityCard` eForm as a
strong candidate: a live HTML eForm requiring no login/CAPTCHA to view,
namespace `http://schemas.gov.sk/form/MZV.RequestIdentityCard/2.3`, filed
via a Slovak consular office abroad. The scouting note estimated "~89
`fieldLabel` elements (many hidden/duplicate autocomplete-support fields —
expect ~50-60 real fillable fields)" and flagged that this consular channel
covers renewal/replacement only, not first-time domestic issuance. Both of
these were independently confirmed this cycle (see below); the exact real
field count (62, not an estimated range) was derived from scratch.

## Source re-verification (Phase 1)

- **URL:** `https://www.slovensko.sk/static/eForm/dataset/MZV.RequestIdentityCard/2.3/Content/form.10.html`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -s`, not trusted from the scouting report as-is.
- **HTTP status:** `200`. **Content-Type:** `text/html`. **Size:** `110,026`
  bytes. **sha256:**
  `dbae62ee009a542df4ff7ec8e86994a081313417624b40ff0f8824a2c1f883b2` —
  independently computed this cycle with `sha256sum` against a fresh
  download.
- **File type:** a genuine, live, interactive HTML eForm (`<form
  id="RequestIdentityCard">`), not a PDF/AcroForm. Confirmed via direct
  inspection of the raw HTML: `<title>Žiadosť o občiansky preukaz</title>`,
  91 `fieldLabel` elements total (including hidden autocomplete-support
  companions — see below), 0 `<select>`/`<textarea>` elements (every
  dropdown-like field is a text `<input>` bound to a client-side
  autocomplete/codelist widget instead), 5 checkbox inputs, and one 2-option
  radio group.
- **Extraction method:** independent, from-scratch regex/structural parsing
  of the raw HTML this cycle (Python's `re` module — no `bs4`/`lxml`
  available in this environment), cross-checked against the page's own
  embedded jQuery-validate `rules: { ... }` configuration object (a
  client-side validation ruleset literally present in the page's
  `<script>` content, giving an authoritative `required`/`maxlength`/
  custom-validator-name inventory per field name) and its parallel
  `messages: { ... }` object (human-readable Slovak labels confirming which
  fields are required). This rules block is the authoritative source for
  every field's `required` status in `schema.json` — not an inference from
  the visible `<label>` markup alone.

## Field inventory (Phase 2)

**91 `fieldLabel` elements exist in the raw HTML; 62 are real, applicant-
facing fields modelled in `schema.json`.** The remaining 29 are
`MzvHidden*`-prefixed autocomplete-support companions (each visible field
bound to a dynamic combobox widget has a paired hidden field that stores
the widget's internal code value) — confirmed via `FormHelper.setupDynamicCombobox(...)`
calls in the page's own script, not modelled as separate schema fields
since they carry no independent applicant-facing meaning.

### Ten form sections (confirmed via the page's own `headercorrection`
section-caption markup, an authoritative structural signal, not inferred
from field-name prefixes alone)

| Section (Slovak caption) | Field count | Modelled scope |
|---|---|---|
| (header, no caption) | 1 (`submissionOffice`) | Full |
| Kontaktné informácie žiadateľa (contact info) | 12 fields + 1 checkbox | Full |
| Informácie o žiadateľovi (applicant info) | 11 | Full |
| Dátum a miesto narodenia — applicant birth | 6 | Full |
| Platný identifikačný doklad SR — applicant's current valid ID | 2 | Full |
| Adresa trvalého bydliska v SR — applicant permanent address | 7 | Full |
| Zákonný zástupca — legal representative identity | 1 checkbox + 5 | Full, gated (see below) |
| Dátum a miesto narodenia — deputy birth | 6 | Full, gated |
| Platný identifikačný doklad SR — deputy's current valid ID | 2 | Full, gated |
| Adresa trvalého bydliska — deputy permanent address | 7 | Full, gated |
| Potvrdenie vyplnených údajov (confirmation) | 1 | Full |

1 + 13 + 11 + 6 + 2 + 7 + 6 + 6 + 2 + 7 + 1 = **62**, matching `schema.json`'s
`fields[]` length exactly (the "Kontaktné informácie" row above is 13
total: 12 data fields + `filledByRepresentativeOrAuthorizedPerson`).

### Documents

4 `documents[]` entries, transcribed verbatim from the "Potrebné doklady"
(required documents) section's own notice text, which also contains this
eForm's scope-defining caveat (quoted in full below):

> UPOZORNENIE: Žiadosť o vyhotovenie občianskeho preukazu prostredníctvom
> zastupiteľského úradu Slovenskej republiky môže byť prijatá iba za
> predpokladu, že žiadateľ už bol držiteľom občianskeho preukazu vydaného
> po 01.07.2008.

("NOTICE: An application for issuance of a citizen ID card through a
diplomatic/consular office of the Slovak Republic may only be accepted
provided the applicant has already held a citizen ID card issued after
01.07.2008.") — confirming the scouting note's caveat precisely. This is
therefore modelled as a **renewal/replacement-via-embassy** schema; a
first-time domestic application is out of scope, matching this registry's
established practice of disclosing narrower-than-full-process scope rather
than fabricating coverage the form itself does not provide.

## Judgment calls disclosed

1. **The legal-representative (Zákonný zástupca) section's `visibleWhen`/
   `requiredWhen` gating is a directly confirmed client-side behavior, not
   an inference.** The page's own script contains:
   `$(document).ready(function() { SwitchSections({ '#DeputyCheckbox':
   ['#layoutRow123'] }, 'main', true); });` — an explicit binding of the
   `DeputyCheckbox` field to the visibility of the entire deputy-section
   container. All Deputy-section fields marked `required: true` in the
   page's own `rules` block (`deputyGivenName`, `deputyFamilyName`,
   `deputySex`, `deputyNationality`, `deputyBirthCountry`/`County`/
   `Municipality`/`Date`, and the deputy's permanent-address fields) are
   modelled with `requiredWhen`/`visibleWhen: { field:
   "deputyRepresentativeNeeded", equals: true }`; the remaining optional
   deputy fields (birth number, current-ID-document type/number, building
   number, unit) carry `visibleWhen` only, matching their own static
   `required: false`.
2. **`filledByRepresentativeOrAuthorizedPerson` (`PersonCheckbox`) does
   NOT gate visibility or requiredness — it triggers a value-copy/disable
   behavior instead, and is modelled with a `description`, not
   `requiredWhen`.** The page's own script shows this checkbox bound to
   `CopyValuesAcrossForm` (not `SwitchSections`): when unchecked (the
   default), `applicantGivenName`/`applicantFamilyName` are continuously
   copied from `contactGivenName`/`contactFamilyName` and disabled; when
   checked, they are cleared and become independently editable. Both
   fields remain visible and `required: true` per the static `rules` block
   regardless of this checkbox's state — encoding a `requiredWhen`/
   `visibleWhen` here would misrepresent what the page's own script
   actually does.
3. **`applicantBirthNumberNotYetAssigned`/`deputyBirthNumberNotYetAssigned`
   (`BirthNumberFlagSection*`) are modelled as plain optional booleans with
   a `description`, not a `requiredWhen` on their paired birth-number
   field.** The page's script calls a `FormHelper.disableMandatoryFieldByCheckbox(...)`
   helper for each pair — a function name strongly suggesting the birth-
   number field becomes non-mandatory only when its flag is checked (i.e.
   normally required) — but the page's own static `rules` block shows both
   `applicantBirthNumber`/`deputyBirthNumber` as `required: false`
   unconditionally, with no dynamically-added rule visible in the static
   markup extracted this cycle. Rather than assert a `requiredWhen`
   relationship inferred solely from a helper function's name (the
   registry's established caution around the prior `notEquals ""`
   incident), both birth-number fields are modelled per the static rules
   (`required: false`) with a `description` disclosing the checkbox's
   likely purpose.
4. **`applicantSex`/`applicantNationality`/`deputySex`/`deputyNationality`/
   `requestReason`/`applicantCurrentIdDocumentType`/
   `deputyCurrentIdDocumentType`/`submissionOffice`/
   `contactPhoneCountryCode`/`*Country`/`*Municipality`/`*County` fields are
   modelled as `type: "string"`, not `type: "enum"`.** Each is bound to a
   server-side codelist via `FormHelper.setupDynamicCombobox(...)` (codelist
   keys `SEX`, `NATIONALITY`, `REASON_OP`, `VALID_DOCUMENT`, `ZU`,
   `PHONE_TYPE`, `STATE`, `MUNICIPALITY`, `COUNTY`, confirmed directly in
   the page's own script), meaning the exact value set is fetched
   dynamically from the platform and is not enumerable from the form's
   static client-side markup. Each field's `description` names the exact
   codelist key its widget binds to, rather than fabricating an `enum`
   list this cycle could not verify.
5. **`applicantAddressCountry` carries a description noting it is
   restricted to Slovakia**, per `FormHelper.setSlovakiaOnlyCombobox(...)`
   in the page's own script — consistent with this section's own heading,
   "Adresa trvalého bydliska v SR" (permanent residence address in the
   Slovak Republic). Not modelled as a fixed/`const` value, since the
   client-side widget configuration is not proof of a hard server-side
   enforcement rule.
6. **`applicantLegalCapacity` is modelled as `type: "boolean"`**, matching
   the page's own `class="xsd_boolean radioButtonList"` markup for this
   field (a two-option Áno/Nie radio group with `value="1"`/`value="0"`),
   consistent with this registry's established boolean-radio-group
   convention.
7. **`lossTheftProof`/`nameChangeCertificate` documents are modelled as
   `required: false` without a `requiredWhen`.** The "Potrebné doklady"
   notice states these apply only when the request reason is loss/theft or
   a name change respectively, but `requestReason`'s exact codelist values
   are not known this cycle (judgment call 4) — a formal `requiredWhen`
   tied to an unverified literal string would be speculative. Disclosed
   here instead of encoded.

## Conformance fixtures (Phase 3)

10 fixtures committed under
`conformance/sk/mzv/ziadost-o-obciansky-preukaz/1.0.0/`: 2 valid (an adult
applicant filing their own request with no legal representative, and a
minor applicant's request filed by a legal-representative deputy, both with
the deputy section's conditional fields exercised in the second) plus 8
mutation-control fixtures, each derived from a valid fixture by a single
targeted mutation. All 10 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived from this schema's own
`fields[]`/`documents[]`, evaluating `visibleWhen`/`requiredWhen`
conditions; not committed to the repo) before being finalized: both valid
fixtures produced **0 errors**, and each of the 8 mutation-control fixtures
produced **exactly 1 error** — a missing required field (×3, covering the
applicant section, the final confirmation, and a `requiredWhen`-gated
deputy field), a missing required document, an invalid boolean type, an
invalid date format, a `pattern` violation (email), and a `maxLength`
violation.

## Structural validation

- `node tools/validate.mjs registry/sk/mzv/ziadost-o-obciansky-preukaz/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/sk/mzv/ziadost-o-obciansky-preukaz/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: see the accompanying PR
  for the exact document count.

## Maturity

`structural-reference`: the live eForm's own client-side structure (labels,
validation rules, codelist/visibility bindings) is fully transcribed, but no
live submission through a Slovak consular office was attempted. GovSchema is
an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of the Slovak Republic, the
Ministry of Foreign and European Affairs of the Slovak Republic, or any
Slovak diplomatic or consular office.
