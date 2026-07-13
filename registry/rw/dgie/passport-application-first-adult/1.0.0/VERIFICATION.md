# Verification record — `rw/dgie/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`

This is a `GovSchema Standard Research` cycle (**GOV-2629**), opening
Rwanda's Passport vertical (4 of 6; DMV, Visa, and Business Formation were
already closed — see `rw/rra/vrf-e06-motor-vehicle-registration-form`,
`rw/dgie/visa-application`, `rw/rdb/rf-001-domestic-company-application-for-incorporation`).

## Why this candidate, and why there is no PDF specimen

Rwanda's e-passport application is a pure IremboGov (irembo.gov.rw) online
SPA workflow with **no downloadable/fillable PDF specimen** and no AcroForm
equivalent. This is an accepted GovSchema pattern for portal-only
application processes — the same pattern already used by
`id/imigrasi/passport-application-first-adult` (Indonesia's M-Paspor),
authored from that jurisdiction's own official user-guide walkthrough rather
than a form specimen. This document follows the same approach: the primary
`source` is IremboGov's own official Support Center walkthrough article
(not a PDF), corroborated by a second official IremboGov FAQ article and the
DGIE's own service page.

## Sources examined (all independently re-fetched this cycle)

### Source 1 (primary `source`)

- **URL:** <https://support.irembo.gov.rw/en/support/solutions/articles/47001165759-how-to-apply-for-an-e-passport-application>
- **Title:** "Tips and how to apply for an E-Passport for the first time" (IremboGov Support Center)
- **Fetch result:** HTTP/2 200, `content-type: text/html; charset=utf-8`, **106,136 bytes**, server `cloudflare`, `cf-cache-status: DYNAMIC`. Retrieved 2026-07-13.
- **Extraction method:** the raw HTML's article body lives in `<div class="article__body markdown" itemprop="articleBody">` (not client-side-rendered — the full rich-text content, including embedded `<img>` tags pointing at `cdn.freshdesk.com`, is present in the initial HTML response). Extracted that div, stripped tags, unescaped HTML entities, and read the full plain-text body (~4,844 characters) directly, rather than trusting a search-engine or WebFetch summary.
- **Embedded screenshots independently fetched and visually inspected** (all `s3.amazonaws.com/cdn.freshdesk.com/...` URLs found in the article HTML, all served over HTTPS with no auth):
  - `47406235387` — "Applicant Details" screen, **"Above 18" toggle selected** (the adult pathway this document models). Confirms exact field labels, which fields carry a required-field red asterisk, and that "Profession" and "Other Nationality" render as dropdowns.
  - `47406233457` — "Applicant Details" screen, "Below 18" toggle selected (the minor pathway, out of scope, used only to confirm what differs between the two toggle states, e.g. presence of "Minor category"/"Guardian nationality" fields not present in the adult view).
  - `47406233448` — "Passport & Travel Details" screen, showing the "Passport type" dropdown open with exactly three options ("Service Passport", "Ordinary Passport", "Diplomatic Passport") and the "Travel details" fields.
  - `47406233441` / attachments screen (`bH1vGYTGMWMTDgQLXvvJ2J5cc7orrrjalg.png` is a small inline "+" icon; the actual "Attachments" screen screenshot shows the in-app notice: "Passport photo has to be less than 200kb, Signature has to be less than 50kb and allowed formats are jpeg and jpg. Other attachments are less than 500kb and pdf format only" — this is a minor-pathway screenshot (its attachment list item 3 reads "Signature (Write names of the child)"), but its size/format notice is a shared, pathway-independent UI element and was used as the most authoritative source for `documents[].constraints`, ahead of the two conflicting prose statements described below).

### Source 2 (FAQ corroboration)

- **URL:** <https://support.irembo.gov.rw/en/support/solutions/articles/47001230984-frequently-asked-questions-about-e-passport-application>
- **Fetch result:** HTTP/2 200, `content-type: text/html; charset=utf-8`, **62,228 bytes**. Retrieved 2026-07-13.
- **Confirms:** guest/no-login submission is possible ("You can apply for this service with or without an Irembo account"); "All applicants should have a valid phone number, email address, or both" (the basis for this document's disclosed-but-not-machine-enforced applicantContactPhone/applicantContactEmail business rule); processing time (4 working days); billing-number expiry (5 days unpaid).

### Source 3 (Canva PDF walkthrough — visual corroboration only, not a specimen)

- **URL:** <https://www.rwandainkenya.gov.rw/fileadmin/user_upload/Kenya_user_upload/Documents/e-Passport_step_by_step_application.pdf>
- **Fetch result:** HTTP/2 200, `content-type: application/pdf`, `content-length`/actual byte size **149,839 bytes**, `Last-Modified: Tue, 06 Apr 2021 12:36:14 GMT`. Retrieved 2026-07-13.
- **Independently confirmed 0 extractable text / AcroForm content:** decompressed all 14 zlib `stream`/`endstream` objects in the raw PDF bytes and searched for parenthesized text-show operands; the decompressed content is raw image-sample data (Canva-exported screenshots), not text — consistent with this being "a Canva-made screenshot walkthrough PDF, 0 AcroForm widgets — NOT a fillable form, just a visual aid" per the originating task's own description. Used only as directional corroboration that the same field set (ID number, profession/employer, height, residence, birth location, passport type/validity, travel details) appears in a second, independently-published walkthrough; not used as a source of exact field labels since its content is unextractable images.

### Source 4 (issuance-channel corroboration)

- **URL:** <https://www.migration.gov.rw/our-services/e-passport-1>
- **Fetch result:** HTTP/1.1 200 OK, `content-type: text/html; charset=utf-8`, **26,800 bytes**. Retrieved 2026-07-13.
- **Confirms:** DGIE's own service page names IREMBO as the sole application channel ("All applications are submitted through IREMBO platform"), confirms the post-submission biometric-capture (10 fingerprints + digital photo) step, and separately confirms the two adult passport page-counts/validities: "An adult passport of 50 pages is valid for 5 years" and "An adult passport of 66 pages is valid for 10 years" — used as secondary confirmation of the passportType/passportValidity field's real-world values (independent of, and consistent with, the primary article's own pricing table).

## Field-derivation reasoning

The primary article's own numbered walkthrough (section "2. Steps to apply
for an e-passport for the first application") states verbatim: **"Adult
applicants should fill in the following: ID number; Profession and
Employer; Height in cm; Residence details; Birth location; Other
nationality and other nationality passport (optional); Street number and
house number (optional)."** Each bullet was mapped to one or more
`fields[]` entries by cross-checking against the embedded "Above 18"
screenshot's own rendered layout (see Source 1 above):

- **ID number** → `idNumber` (single field, confirmed label "Identification document number").
- **Profession and Employer** → two fields (`profession`, `employer`) — the screenshot shows these as two separately labelled inputs, not one combined field.
- **Height in cm** → `heightCm` (single numeric field, confirmed label "Height (cm)").
- **Residence details** → modelled as `residenceCountry` only. **Disclosed scoping/judgment call:** the task brief anticipated a district/sector/cell/village Rwandan administrative breakdown here (mirroring this registry's own `rw/rdb/rf-001-domestic-company-application-for-incorporation`, which models Province/District/Sector/Cell for a Rwandan resident address). The embedded screenshot does confirm a "Residence Details" block with a required "Country" select as its first (and, in the captured screenshot state, only) visible field — but the screenshot captures this control in its default, unselected placeholder state ("Select country"), so it does **not** visually confirm whether selecting "Rwanda" cascades to further Province/District/Sector/Cell sub-fields (a UX pattern common elsewhere on Irembo/RALGA-integrated forms, but not confirmed for this specific screen by any screenshot in this walkthrough). No second screenshot in the article shows the post-selection expanded state. Rather than inventing unconfirmed sub-fields, this document models only the one field the screenshot directly confirms, and discloses the gap here and in the field's own `description`. A live-session capture of the expanded state (not attempted this cycle, to avoid creating a real application record in a live government system, matching `id/imigrasi/passport-application-first-adult`'s own stated reason for not attempting a live login) would be needed to close this gap in a future revision.
- **Birth location** → modelled as `birthLocationCountry` only, for the identical reason (confirmed "Country" select, unselected in the screenshot, no confirmed further breakdown).
- **Other nationality and other nationality passport (optional)** → two fields (`otherNationality`, `otherNationalityPassportNumber`), both optional, matching the screenshot's two separately labelled, non-asterisked inputs.
- **Street number and house number (optional)** → two fields (`streetNumber`, `houseNumber`), both optional, matching the screenshot.
- **Telephone number for contact** — visible in the same "Applicant Details" screenshot (not called out in the article's own bullet list, but present and unmarked as required in the rendered screen) → `applicantContactPhone`, optional.

The subsequent guide text ("Fill in the Passport & Travel Details ... Select
the passport type and the corresponding validity along with the travel
details: purpose of travel, destination country, and destination city")
maps to `passportType`, `passportValidity`, `purposeOfTravel`,
`destinationCountry`, and `destinationCity` — all five confirmed directly
from the "Passport & Travel Details" screenshot, which also confirms
`destinationCity` alone lacks a required-field asterisk (the other four all
carry one). The `passportType` enum's three values (`service`, `ordinary`,
`diplomatic`) are read verbatim from the screenshot's own open dropdown
list ("Service Passport", "Ordinary Passport", "Diplomatic Passport").

The final guide bullet ("Verify that the information is true, enter a phone
number and/or email address, check the verification box, and click Submit")
maps to `applicantContactEmail` (new field at this step) and the
`informationVerificationCertification` attestation-category `documents[]`
entry (the "verification box" checkbox), following this registry's existing
wet-ink/click-through-certification convention (cf.
`rw/dgie/visa-application`'s `applicationCertification`).

## Documents

`documents[]` entries (`nationalIdCopy`, `passportPhoto`, `signature`,
conditional `recommendationLetter`, conditional `appointmentLetter`) are
derived from the primary article's own "E-Passport Types and Requirements"
table, "Applicant: 18 and above" row, across all three passport types
(Service/Ordinary/Diplomatic). `recommendationLetter` is gated
`requiredWhen: passportType in [service, diplomatic]` (Ordinary requires no
recommendation letter per the same table); `appointmentLetter` is gated
`requiredWhen: passportType equals diplomatic` only.

**Disclosed three-way discrepancy on the signature attachment's format and
size**, all from official IremboGov-controlled sources:

1. Primary article's own prose note: "Signature: **PDF** format, maximum size **50 KB**."
2. FAQ article's own prose note: "Signature (Format: **JPG**, Size: **500KB**)."
3. The live in-app "Attachments" screen's own notice (read directly from the embedded screenshot): "Signature has to be less than **50kb** and allowed formats are **jpeg and jpg**."

This document resolves the discrepancy by trusting source 3 (the literal,
live in-app UI copy shown to the applicant at the point of upload) as most
authoritative, since it is the actual constraint the live system enforces,
rather than either prose article's (differing) restatement of it. The
discrepancy itself is disclosed in the `signature` document's own
`sourceRef`.

## Explicitly out of scope for this v1.0.0

- The parallel minor/child (below-18) applicant pathway (different field set: Minor category, Identity document type selector, Guardian nationality, guardian ID/passport number, in place of this document's adult-only fields).
- The passport-replacement/renewal pathway for a passport already issued by DGIE on or after 28 June 2019 (a distinct, not-walked-through pathway per the article's own scoping sentence: "This applies to someone who is applying for a passport for the first time or replacing or renewing a passport that was issued by DGIE before 28 June 2019").
- Post-submission steps (biometric-capture appointment notification, passport collection) — these occur after this document's own submission point and collect no further applicant-supplied fields.
- The Province/District/Sector/Cell (or similar) administrative-subdivision breakdown of Residence Details and Birth Location, per the disclosed gap above.

## Conformance run

2 valid mock scenarios (0 errors each) and 3 mutation-control fixtures
(exactly 1 error each — a missing required field, an invalid enum value,
and a pattern violation) were run through a disposable
`validate_instance.mjs` script (not committed) implementing this schema's
own `required`/`requiredWhen` grammar, plus `ajv` (draft 2020-12) for the
static JSON Schema subset built from each field's `type`/`validation`. See
`conformance/rw/dgie/passport-application-first-adult/1.0.0/` for the
fixtures themselves.

## Validator runs

- `node tools/validate.mjs registry/rw/dgie/passport-application-first-adult/1.0.0/schema.json` → `ok`.
- `node tools/validate-ajv.mjs registry/rw/dgie/passport-application-first-adult/1.0.0/schema.json` → `ok` (validated against the `spec/v0.3` meta-schema).
