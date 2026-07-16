# Verification record — `tz/immigration/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3281**). Tanzania stood
at 5 of 6 verticals entering this cycle (Business Formation via
`tz/brela/company-registration-form-14a`, National ID via
`tz/nida/application-form-2a`, DMV via `tz/tra/vehicle-registration`, Taxes
via `tz/tra/itx201-01-e-individual-income-tax-return`, and Visa via
`tz/immigration/visa-application`) — Passport was the sole vertical left
open and explicitly disclosed as unscreened by the prior GOV-3216 cycle
(see CATALOG.md's Executive Summary entry for that cycle, "leaving only
Passport open for Tanzania"). This document closes it: **Tanzania now
stands at 6 of 6.**

## Discovery

The Immigration Department's own public forms library was checked first:

```
$ curl -s https://www.immigration.go.tz/index.php/application-and-declaration-forms
```

This page lists downloadable forms for Citizenship/Naturalization, Visa,
Residence Permit, Dependent Pass, and Business Pass — no ordinary passport
application PDF. Tanzanian consular/embassy sites were checked next, per
this same jurisdiction's own established consular-form precedent (the
already-published `tz/immigration/visa-application` was itself sourced from
the Washington, D.C. embassy). The embassy's own text states passports are
lodged at Immigration HQ, a Regional/District Immigration Office, or via the
e-Immigration portal — not issued or form-distributed at missions abroad.
Two adjacent AcroForm PDFs were found on the embassy site
(`Passport_Change_of_Name_Endorsement.pdf`, `Passport_Child_Endorsement.pdf`)
but are post-issuance amendment forms, not the ordinary application —
disclosed as a narrower backlog candidate for a possible future companion
schema, not modelled here.

This confirmed a genuine gap (not a fetch failure): ordinary passport
applications in Tanzania are handled exclusively through the online
e-Immigration portal, `https://eservices.immigration.go.tz`.

## Method: live wizard walked with a real headless browser

The portal renders each step server-side in response to the previous step's
own successful POST — a static fetch cannot see anything beyond the first
screen. Playwright + system Chromium was used (this environment's
established recipe: `executablePath`
`/paperclip/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
`LD_LIBRARY_PATH=/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu:/paperclip/chrome-sysroot/usr/lib`),
with a realistic desktop Chrome User-Agent, headless.

### Step 0 — `apply`

```
$ curl -sI https://eservices.immigration.go.tz/online/web/passport/apply
HTTP/1.1 200 OK
```

Plain server-rendered HTML, no login wall. Presents 4 fields
(`PassportBasicDetails[ApplicationTypeID]`, `[MobileNo]`, `[Priority]`,
`[TerritoryID]`) protected only by an **invisible** reCAPTCHA v3
(`grecaptcha.execute("6LcJHLwUAAAAAPonDYU5WjmxbSEuUcjCXH6pBxY-", {action:
"apply"})`, auto-resolved client-side with no visible challenge, the
resulting token silently written into a hidden field). No CAPTCHA-solving
was attempted or needed — the invisible v3 check runs automatically.

Submitting this step with placeholder data (application type = New/"Ombi
Jipya"; a placeholder Tanzanian mobile number; location = in-Tanzania;
territory = Mainland) generated a real `Reference ID` in the Immigration
Department's live system (e.g. `26NL-E07F-XQ16`) — the portal's own
"Kidokezo Muhimu" (Important Tip) guidance page explicitly instructs
applicants to save this ID to resume an incomplete application later, so
this is a designed, expected side effect of using the wizard at all, not an
unintended one. This is disclosed here rather than concealed: verifying a
live multi-step wizard (as opposed to a downloadable static form) has this
trade-off, one this registry has already accepted for
`br/tse/requerimento-alistamento-eleitoral` and
`si/e-uprava/vloga-za-registracijo-vozila`. Only placeholder/fabricated
applicant data was used throughout this verification — no real person's
information was entered — and the wizard was never walked past the
Attachments step (step_six; see below), so no payment was made and no
application was ever completed or submitted for actual processing.

### Steps 1-5 — each independently walked, each step's real rendered form captured

Each step's HTML (`page.content()`) was captured immediately after the
previous step's `SaveNext` submission succeeded, and every `<input>`/
`<select>`'s `id`/`name`, its `<label>` text, its `aria-required`/`required`
CSS class, and (for `<select>`) its full `<option>` list were read directly
from the live markup:

1. **`step_one`** (`PassportPersonalAndCitizenship[...]`) — "Taarifa
   Binafsi" (first/middle/family name, gender as a 2-option radio, marital
   status, occupation, national ID, Zanzibar ID), "Utambulisho" (the photo
   upload), and "Tarehe na Mahali pa Kuzaliwa" (date of birth as three
   day/month/year `<select>` menus, plus a birth-country-gated address
   cascade).
2. **`step_two`** (`PassportContactAndResidentialAddress[...]`) —
   "Mawasiliano" (postal address, a second contact mobile number, email)
   and "Anuani ya Makazi" (a Tanzania region/district/village residential
   address cascade, house number).
3. **`step_three`** (`PassportParentsInformation[...]`) — "Habari za
   Wazazi": full name, date of birth (day/month/year), and birth country
   for both father and mother, each with its own birth-place-detail field
   mirroring the applicant's own.
4. **`step_four`** (`PassportTravelAndGuardian[...]`) — "Habari za Safari":
   a single travel-purpose `<select>` (11 options) and a destination-country
   `<select>`.
5. **`step_five`** (`PassportEmergencyAndWitness[...]`) — "Wakati wa
   Dharura": two full emergency-contact blocks (name, occupation, postal
   box, phone, town, street, house number, relationship).

Every `SaveNext` click engaged the wizard's real client-side and
server-side validation (never bypassed or scripted around), so every
field's `required`/`requiredWhen` value below reflects an actually observed
validation outcome, not an inference from the initial markup alone.

### The applicant's birth-place cascade: confirmed live via real server errors

A placeholder foreign birth country (Kenya, the live portal's internal
country-reference-list ID `116`) was deliberately used for the applicant,
father, and mother in the walk-through that reached step_six, to avoid
triggering three separate nested Region→District→Ward AJAX cascades (one
each for applicant/father/mother) in a single session. The applicant's own
cascade, however, was independently confirmed live in a **separate**
attempt: selecting Tanzania (ID `220`) for `BirthCountryID` and submitting
without filling the dependent fields produced these real server-side error
messages, one per newly-required field:

```
Eneo is required.
Mkoa is required.
Wilaya is required.
Kata/Shehia is required.
Mtaa/Kijiji is required.
```

This confirms `birthAdminTerritory`, `birthAdminRegion`,
`birthAdminDistrict`, `birthAdminWard`, and `birthVillageOrAddressDetail`
all become required specifically when `birthCountry` is Tanzania — modelled
via `requiredWhen: { field: "birthCountry", equals: "TANZANIA" }` on the
first four (the fifth is required unconditionally; see below). The same
attempt, with a foreign country selected instead, produced:

```
Tafadhali Jaza Anwani Kamili ya Ulipozaliwa.
```

("Please fill the full address of birthplace.") against the very same
underlying field (`BirthVillage`), which the live form dynamically
re-labels from "Mtaa/Kijiji" to "Anwani Kamili ya Ulipozaliwa" depending on
`birthCountry` — confirming `birthVillageOrAddressDetail` is required in
**both** branches, just under a different label and semantics. This is
modelled as a single unconditionally-`required: true` field, matching the
live form's own actual behavior rather than a `requiredWhen` that would
incorrectly imply it is optional for foreign-born applicants.

**Not independently confirmed:** whether the same five-field cascade
requirement applies to `fatherBirthCountry`/`motherBirthCountry` when set to
Tanzania. What *was* confirmed live: `FatherBirthVillage`/
`MotherBirthVillage` become **read-only** or disabled) once a foreign
country is selected for that parent — visually and functionally consistent
with the applicant's own cascade pattern, but this cycle did not select
Tanzania for either parent to observe the equivalent required-field error
messages. `fatherBirthPlaceDetail`/`motherBirthPlaceDetail` are therefore
modelled `required: false` (a disclosed, most-likely-incomplete
simplification, not a confirmed fact) — see "Scoping decisions" below.

### Photo upload: real image-content validation, not just a filename check

The applicant-photo field (`PassportPersonalAndCitizenship[Photo]`, a
Krajee `kartik/file` widget) rejected a hand-built minimal PNG that had
simply been renamed to `.jpg`, with the live error `The file
"mock_photo.jpg" is not an image.` — confirming the server inspects real
image content, not merely the file extension. A genuine small JPEG
(produced with the `sharp` library, already present in this environment,
converting the same synthetic PNG) was accepted and the step advanced.
This registry's `sg/ica/passport-application` precedent is followed for
modelling `photo` as a `fields[]` entry of `type: "file"` (it lives inline
in the `step_one` form alongside scalar personal-data fields) rather than a
`documents[]` entry, which is reserved here for the dedicated,
separately-endpointed uploads in step_six.

### Step 6 — `step_six` (Viambatanisho / Attachments), reached but not completed

The Attachments page lists exactly three mandatory documents for this
application's own (server-computed) requirement set, each with its own
dedicated upload endpoint:

| DocTypeID | Label (Swahili) | Modelled as |
|---|---|---|
| 2 | Cheti/Kiapo cha Kuzaliwa cha Mzazi wa Mwombaji | `parentBirthCertificateOrAffidavit` |
| 1 | Cheti/Kiapo cha Kuzaliwa Mwombaji | `applicantBirthCertificateOrAffidavit` |
| 5 | Kitambulisho cha Kazi na Barua ya Ombi la Pasipoti toka Kwa Mwajiri (Kwa Walioajiriwa) au Barua ya Utambulisho toka Serikali ya Mtaa/Afisa Mtendaji wa Kata | `employmentIdOrWardIntroductionLetter` |

Opening the "Weka" (Upload) modal for DocTypeID 2 confirmed the underlying
mechanism: a small dedicated form
(`/online/web/passport/attachment?DocTypeID=2&OperationType=Insert`) with
hidden `PassportSupportingDocs[ApplicationID]`/`[DocID]`/`[DocTypeID]`
fields and a single `PassportSupportingDocs[document]` file input — a
simple one-file-per-document-type mechanism, confirming the three
`documents[]` entries above are each an independent upload, not a single
multi-file drop zone.

The page additionally lists 14 further documents that "may be required" at
final submission (marriage certificate, naturalization certificate, return
air ticket, employer/parent-guardian consent letters, a grandparent's birth
certificate, etc.) — this is disclosed as a real, non-exhaustive
supplementary list per the portal's own prose, not modelled as additional
required `documents[]` entries, since the three above are the only ones the
live page itself currently marks mandatory for this scenario.

**Not reached this cycle:** a real multi-part AJAX file upload through the
Attachments modal's own `SaveNext` gate (the button stays `disabled` until
all three uploads succeed) was attempted once; the modal's dismiss/close
interaction did not cleanly release for a second attempt within the same
browser session, and this cycle did not treat pushing through that
automation friction as worth a second live submission. As a result,
**"Tamko Rasmi" (Declaration), "Malipo" (Payment), and "Kamilika"
(Complete)** — the three steps after Attachments, per the wizard's own
left-hand step list — were never seen and are not modelled. This is
disclosed as an intentional scope boundary, not a silent omission: Payment
in particular is a transaction, not applicant-supplied form data, and this
registry has consistently excluded payment/completion steps from other
schemas' `fields[]` (e.g. `br/tse/requerimento-alistamento-eleitoral`
excludes TSE's own control-number payment step).

## Scoping decisions (disclosed, not fidelity gaps)

- **New/first-time applications only.** `applicationType`'s four live
  options (New, Full/e-passport replacement, Lost, Damaged) were all read
  from the initial step's own `<select>`, but only the New ("Ombi Jipya")
  pathway's downstream steps were walked and are modelled by this
  document's remaining fields. The other three almost certainly branch to a
  different, narrower flow (e.g. requesting a police-loss-report reference
  for the Lost pathway) not verified this cycle.
- **In-Tanzania applicants only.** `applicantLocation`'s "Nje ya Nchi
  (UBALOZINI)" (abroad/embassy) option was seen but not walked; its
  downstream steps likely differ from the in-Tanzania pathway modelled
  here (per the discovery step above, embassies do not issue passports
  directly, so this option's actual flow was not investigated further).
- **External/dynamic reference-table fields.** `birthCountry`,
  `fatherBirthCountry`, `motherBirthCountry`, and `visitCountry` are each
  backed by the live portal's own ~250-entry external country-reference
  list (confirmed values: Tanzania = `220`, Kenya = `116`, Uganda = `232`),
  not a fixed client-side enum reproducible in full. Modelled as open
  `string` fields per this registry's established external-code-table
  convention (see e.g. `br/tse/requerimento-alistamento-eleitoral`'s
  `maritalStatus`/`occupation` fields). `residenceRegion`/
  `residenceDistrict` are similarly backed by a Tanzania-only fixed
  region/district reference list (confirmed 30 regions, e.g. Dar es Salaam
  = `32`, and its own districts including Ilala = `8`), also modelled as
  open strings.
- **Day/month/year triplets collapsed to one `date` field each.** Every
  date of birth (`dateOfBirth`, `fatherDateOfBirth`, `motherDateOfBirth`) is
  collected on the live form as three separate `<select>` menus and
  collapsed here to a single ISO `date` field per this registry's
  established convention.
- **Father/mother birth-place-detail requiredness not independently
  confirmed.** See the "Not independently confirmed" paragraph above;
  `fatherBirthPlaceDetail`/`motherBirthPlaceDetail` are modelled optional,
  a disclosed, most-likely-incomplete simplification rather than a
  confirmed fact.
- **Declaration/Payment/Complete steps excluded.** See "Step 6" above —
  these were never reached this cycle and are disclosed as out of scope for
  this version.

## Mock test run

Two valid mock scenarios and six mutation-control fixtures are committed
under `conformance/tz/immigration/passport-application/1.0.0/`:

1. **`application-packet-1.json`** — Jane Mwakasege, a mainland-resident
   applicant born in Tanzania (Mwanza region), exercising the full
   birth-place administrative cascade (`birthAdminTerritory` through
   `birthVillageOrAddressDetail`), with both parents also born in Tanzania.
2. **`application-packet-2.json`** — Peter Otieno, an applicant born in
   Kenya (a naturalised-citizen-shaped scenario), taking the simpler
   foreign-birth-country path with no administrative cascade required.
3. **`mutation-missing-required-field.json`** — omits the statically
   required `familyName`.
4. **`mutation-missing-birth-region-when-tanzania.json`** — `birthCountry`
   is `TANZANIA` but `birthAdminRegion` is omitted.
5. **`mutation-missing-birth-village-detail.json`** — omits the
   unconditionally required `birthVillageOrAddressDetail`.
6. **`mutation-invalid-date-format.json`** — `dateOfBirth` uses a
   non-ISO format (`14/06/1990` instead of `1990-06-14`).
7. **`mutation-invalid-email-format.json`** — `emailAddress` is not a valid
   email address.
8. **`mutation-missing-required-document.json`** — omits the required
   `applicantBirthCertificateOrAffidavit` document.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`/
`documents[]`, discarded after use, not committed to the repository) ran
all 8 fixtures: both valid scenarios passed with 0 errors; all 6 mutation
controls each raised exactly 1 error, on the expected field/document. The
same script confirmed every `requiredWhen` field reference in this document
resolves to a real field name (0 dangling references).

## Tooling

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, both individually and as part of a full
registry run.
