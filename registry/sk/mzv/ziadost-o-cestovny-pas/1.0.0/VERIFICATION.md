# Verification record — `sk/mzv/ziadost-o-cestovny-pas` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3258**). Slovakia stood
at 5 of 6 verticals (DMV, Business Formation, Taxes, National ID; Visa is a
confirmed duplicate/dead end — see CATALOG.md's own prior Slovakia entries)
at the start of this cycle, with **Passport its sole remaining fully
unscreened vertical** per CATALOG.md's own Known Gaps section (no prior
cycle had recorded any scouting note or dead-end finding for Slovakia's
Passport process). This document opens Slovakia's **Passport vertical (1 of
6 for this gap)**.

## Discovery

No prior scouting note exists for this candidate — it was located from
scratch this cycle. The already-published sibling document
`sk/mzv/ziadost-o-obciansky-preukaz` (Slovakia's National ID & Civic
Documents vertical) is sourced from a live `slovensko.sk` eForm at
`https://www.slovensko.sk/static/eForm/dataset/MZV.RequestIdentityCard/2.3/Content/form.10.html`.
Slovakia's eForm platform namespaces datasets by process
(`MZV.RequestIdentityCard`, `MZV.RequestEmergencyTravelDocument`,
`MZV.ApplicationForCitizenship`, etc.), so a targeted search for a
Passport-namespaced dataset was run this cycle and surfaced
`MZV.RequestPassport` — confirmed live at the same URL pattern.

## Source re-verification (Phase 1)

- **URL:** `https://www.slovensko.sk/static/eForm/dataset/MZV.RequestPassport/2.0/Content/form.6.html`
- **Retrieved / reviewed:** 2026-07-16, independently fetched this cycle with
  `curl -s -A "Mozilla/5.0"`.
- **HTTP status:** `200`. **Size:** `116,460` bytes. **sha256:**
  `dd9999e8fd8b32c3c7461a6a86e353283bae364ad8ace624d88671824e444aad` —
  independently computed with `sha256sum` against a fresh download.
- **A note on `mzv.sk` itself:** the Ministry's own `www.mzv.sk` domain
  (including its English-language `/en/sluzby/ak-cestujete-do-zahranicia/cestovny-pas`
  passport-service page) returned HTTP 403 to every direct-fetch attempt this
  cycle, with and without a browser User-Agent header — a WAF/bot-mitigation
  gate on that specific host. The `slovensko.sk` eForm host that actually
  serves the live, interactive form is a separate host and was not gated;
  this is the same asymmetry the sibling `sk/mzv/ziadost-o-obciansky-preukaz`
  document's own VERIFICATION.md implicitly relies on (it, too, sources from
  `slovensko.sk`, not `mzv.sk`).
- **File type:** a genuine, live, interactive HTML eForm (`<form>`,
  `<title>Žiadosť o cestovný doklad</title>`), not a PDF/AcroForm — confirmed
  via direct inspection of the raw HTML.
- **Extraction method:** independent, from-scratch regex/structural parsing
  of the raw HTML this cycle (Python's `re` module), cross-checked against
  the page's own embedded jQuery-validate `rules: { ... }` configuration
  object — a client-side validation ruleset literally present in the page's
  `<script>` content, giving an authoritative `required`/`maxlength`/
  custom-validator-name inventory per field name. This rules block is the
  authoritative source for every field's `required` status in `schema.json`
  unless a separate, independently-confirmed dynamic override exists (see
  judgment call 1 below) — not an inference from the visible `<label>`
  markup alone.
- **Form metadata:** the page's own hidden `mtd_formMetaData` block confirms
  `mtd_version = 2.0` and `mtd_namespace = http://schemas.gov.sk/form/MZV.RequestPassport/2.0`,
  matching the URL's own version segment.

## Field inventory (Phase 2)

**83 total field-name entries exist in the raw HTML's embedded `rules: {
...}` object; 60 are real, applicant-facing fields carrying an explicit
validation rule.** The remaining 23 are `MzvHidden*`-prefixed autocomplete-
support companions (each visible field bound to a dynamic combobox widget
has a paired hidden field storing the widget's internal code value) —
confirmed via `FormHelper.setupDynamicCombobox(...)` calls in the page's own
script, not modelled as separate schema fields since they carry no
independent applicant-facing meaning. **4 further real fields carry no
`rules` entry at all** since an unchecked checkbox is always a valid value
for jQuery-validate purposes: `filledByRepresentativeOrAuthorizedPerson`
(`PersonCheckbox`), `deputyRepresentativeNeeded` (`DeputyCheckbox`),
`applicantBirthNumberNotYetAssigned` (`BirthNumberFlagSectionRequestor`),
`deputyBirthNumberNotYetAssigned` (`BirthNumberFlagSectionDeputy`) —
independently confirmed present via a direct `<input type="checkbox">` grep
of the raw HTML, not inferred. **60 + 4 = 64**, matching `schema.json`'s
`fields[]` length exactly.

### Twelve form sections (confirmed via the page's own `headercorrection`
section-caption markup, an authoritative structural signal, not inferred
from field-name prefixes alone)

| Section (Slovak caption) | Field count | Modelled scope |
|---|---|---|
| (header, no caption) | 1 (`submissionOffice`) | Full |
| Kontaktné informácie žiadateľa (contact info) | 12 + 1 checkbox | Full |
| Informácie o žiadateľovi (applicant info) | 8 | Full |
| Údaje iného cestovného pasu žiadateľa (other/previous passport) | 5 | Full, one pair gated (see below) |
| Dátum a miesto narodenia — applicant birth | 6 | Full |
| Platný identifikačný doklad SR — applicant's current valid ID | 2 | Full |
| Adresa trvalého bydliska — applicant permanent address | 7 | Full |
| Zákonný zástupca — legal representative identity | 1 checkbox + 5 | Full, gated (see below) |
| Dátum a miesto narodenia — deputy birth | 6 | Full, gated |
| Platný identifikačný doklad SR — deputy's current valid ID | 2 | Full, gated |
| Adresa trvalého bydliska — deputy permanent address | 7 | Full, gated |
| Potvrdenie vyplnených údajov (confirmation) | 1 | Full |

1 + 13 + 8 + 5 + 6 + 2 + 7 + 6 + 6 + 2 + 7 + 1 = **64**, matching
`schema.json`'s `fields[]` length exactly (the "Kontaktné informácie" row is
13 total: 12 data fields + `filledByRepresentativeOrAuthorizedPerson`; the
"Zákonný zástupca" row is 6 total: `deputyRepresentativeNeeded` + 5 data
fields).

### Documents

6 `documents[]` entries, transcribed from the "Potrebné doklady" (required
documents) notice's own bulleted list, which bundles several distinct,
source-disclosed alternative/conditional requirements into one prose block:
a valid identity document (unconditionally required); a citizenship
certificate no older than 6 months (needed only if the presented identity
document is past its own validity); a marriage certificate/name-change
decree/academic-title-grant document/prior passport bundle (needed only if
the applicant's surname or title differs from the presented identity
document); the child's own SR-issued birth certificate, required when a
legal representative files on a minor's behalf; a written, certified-
signature legal-representative consent, required specifically for
applicants aged 15–18; and an open-ended "other documents" catch-all (e.g. a
police loss/theft report). **None of these six are gated by a
`requiredWhen` condition** — the live eForm exposes no boolean field for "is
your identity document past its validity" or "is your surname different
from your identity document," so keying a `requiredWhen` off an existing
field would misrepresent the source; only `validIdentityDocument` is
modelled `required: true`, matching this registry's established convention
(also used by the sibling `sk/mzv/ziadost-o-obciansky-preukaz` document) of
not fabricating fields the source does not expose.

## Judgment calls disclosed

1. **`applicantBirthNumber`/`deputyBirthNumber` are modelled with
   `requiredWhen`, diverging from the sibling `sk/mzv/ziadost-o-obciansky-preukaz`
   document's more conservative choice for the analogous field pair — a
   deliberate difference justified by a genuinely different underlying
   source, not an inconsistency.** In the sibling ID-card eForm, the static
   `rules` block showed `applicantBirthNumber`/`deputyBirthNumber` as
   `required: false` unconditionally, so that document correctly modelled
   them as plain optional fields with a disclosing `description` rather than
   asserting a `requiredWhen` inferred solely from a helper function's name.
   **In this passport eForm, the static `rules` block is unambiguous the
   other way**: `BirthNumberSectionRequestor: { required: true,
   BirthNumberSectionRequestorRegEx: true, PersonalNumberValidator: true }`
   (and the same shape for `BirthNumberSectionDeputy`) — confirmed directly
   in the raw HTML, not inferred. The page's own script additionally calls
   `FormHelper.disableMandatoryFieldByCheckbox('#BirthNumberSectionRequestor',
   '#BirthNumberFlagSectionRequestor')` (and the equivalent deputy-section
   call), a concrete, argument-verified binding (not just a suggestively-
   named function reference) disabling that requirement when the paired
   checkbox is checked. Given a static baseline of `required: true` plus a
   verified, argument-matched disabling call, modelling
   `requiredWhen: { field: "applicantBirthNumberNotYetAssigned", equals:
   false }` (and the deputy equivalent, further gated by
   `deputyRepresentativeNeeded`) is the more accurate representation of this
   specific form's confirmed behavior — not a blanket `required: true` that
   would incorrectly reject a genuinely valid "not yet assigned" submission.
   This uses `equals: false` against a checkbox field that always carries a
   defined boolean value (never absent), not the `notEquals ""`-against-an-
   optional-field pattern this registry has previously flagged as unsafe.
2. **`holdsAnotherValidPassport` (`AdditionalPassportFlag`) is modelled as
   `type: "boolean"` gating `additionalPassportNumber`/
   `additionalPassportEndDate` via `visibleWhen`/`requiredWhen`, confirmed
   via a direct script binding, not inferred.** The page's own script
   contains a `SwitchSections` call keyed to `#AdditionalPassportFlag`
   controlling the visibility of the container holding these two fields;
   both carry no `required` entry in the static `rules` block on their own
   (`AdditionalPassportNumber: { maxlength: 64 }`,
   `AdditionalPassportEndDate: { AdditionalPassportEndDateRegEx: true,
   AnotherDocumentValidToNotInPastValidator: true }`), consistent with them
   being conditionally, not unconditionally, required — modelled as
   `required: false` with `requiredWhen` rather than fabricating an
   unconditional requirement the static rules do not support.
3. **`filledByRepresentativeOrAuthorizedPerson` (`PersonCheckbox`) does NOT
   gate visibility or requiredness — it triggers a value-copy/disable
   behavior instead**, exactly matching the sibling document's own precedent
   for the identical widget component reused across this MZV eForm family:
   the page's own script binds this checkbox to `CopyValuesAcrossForm`, not
   `SwitchSections`. `applicantGivenName`/`applicantFamilyName` remain
   visible and `required: true` per the static `rules` block regardless of
   this checkbox's state.
4. **`applicantSex`/`applicantNationality`/`deputySex`/`deputyNationality`/
   `requestReason`/`applicantCurrentIdDocumentType`/
   `deputyCurrentIdDocumentType`/`submissionOffice`/
   `contactPhoneCountryCode`/`*Country`/`*Municipality`/`*County` fields are
   modelled as `type: "string"`, not `type: "enum"`**, for the same reason as
   the sibling document: each is bound to a server-side codelist via
   `FormHelper.setupDynamicCombobox(...)` (codelist keys `SEX`,
   `NATIONALITY`, `REASON_CD`, `VALID_DOCUMENT`, `ZU`, `PHONE_TYPE`, `STATE`,
   `MUNICIPALITY`, `COUNTY`, confirmed directly in the page's own script),
   meaning the exact value set is fetched dynamically from the platform and
   is not enumerable from the form's static client-side markup. Each field's
   `description` names the exact codelist key its widget binds to.
5. **`contactPhoneCountryCode`'s label/description is carried over verbatim
   from the sibling document's own established interpretation of the
   identical `PHONE_TYPE`-codelist widget**, reused unchanged across this
   MZV eForm family (both forms bind `#TelephoneType` to the same
   `PHONE_TYPE` codelist via the identical `FormHelper.setupDynamicCombobox`
   call shape) — not independently re-derived this cycle, since the
   underlying widget component is confirmed identical.
6. **`applicantAddressCountry` carries a description noting it is
   restricted to Slovakia**, per `FormHelper.setSlovakiaOnlyCombobox(...)` in
   the page's own script — consistent with this section's own heading,
   "Adresa trvalého bydliska v SR" (permanent residence address in the
   Slovak Republic). Not modelled as a fixed/`const` value, since the
   client-side widget configuration is not proof of a hard server-side
   enforcement rule.
7. **The `AdditionalPassportFlag`/`applicantLegalCapacity`-style Áno/Nie
   radio groups are modelled as `type: "boolean"`**, matching the source's
   own `class="xsd_boolean radioButtonList"` markup and `value="1"`/`"0"`
   option pairing (Áno=true, Nie=false).
8. **`previousPassportNumber`/`previousPassportEndDate` (the applicant's own
   prior passport, e.g. the one being renewed/replaced) are modelled as
   unconditionally optional** (`required: false`, no `requiredWhen`),
   matching the static `rules` block exactly (`PreviousPassportNumber: {
   maxlength: 64 }`, `PreviousPassportEndDate: {
   PreviousPassportEndDateRegEx: true }` — neither carries a `required`
   key) — the live form does not force disclosure of a prior passport,
   consistent with `requestReason` covering first-time applications where
   no prior passport would exist.

## Conformance fixtures

11 fixtures committed under `conformance/sk/mzv/ziadost-o-cestovny-pas/1.0.0/`:

- **2 valid scenarios**: an adult, self-filing applicant with no legal
  representative and no additional passport disclosure
  (`valid-adult-self-filed-no-deputy.json`); a minor applicant whose parent
  files via the legal-representative section, with the child's own SR birth
  certificate attached (`valid-minor-filed-by-deputy.json`).
- **9 mutation-control fixtures**, each a single-field/single-document
  mutation of the first valid scenario: a missing unconditionally-required
  field, a missing final data-accuracy confirmation, an invalid email
  pattern, a phone-number `maxLength` violation, a boolean-typed field given
  a string value, a missing required document, a missing conditionally-
  required legal-representative field (with `deputyRepresentativeNeeded:
  true`), a missing conditionally-required `additionalPassportNumber` (with
  `holdsAnotherValidPassport: true`), and a missing conditionally-required
  `applicantBirthNumber` (with `applicantBirthNumberNotYetAssigned: false`).

All 11 fixtures were run this cycle through a from-scratch mock validator
(a standalone script implementing this spec's `required`/`requiredWhen`
condition grammar, `type`, `validation.maxLength`, `validation.pattern`, and
`documents[].required`/`requiredWhen` semantics directly against
`schema.json`, independent of `tools/validate-ajv.mjs`, which validates the
schema document's own meta-schema conformance rather than instance
payloads): both valid scenarios raised **0 errors**, and each of the 9
mutation-control fixtures raised **exactly 1 error**, confirming the
`requiredWhen` gates for the birth-number and additional-passport fields
behave as modelled.

`schema.json` itself passes both `tools/validate-ajv.mjs` and
`tools/validate.mjs` against `spec/v0.3/govschema.schema.json`.

## Non-affiliation

GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of the Slovak
Republic, the Ministry of Foreign and European Affairs of the Slovak
Republic, or any Slovak diplomatic or consular office.
