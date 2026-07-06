# Verification record — `ph/comelec/overseas-voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every field in this schema was read directly from the served HTML DOM of
COMELEC's own public, unauthenticated **iRehistro** web tool
(`irehistro.comelec.gov.ph`), and cross-checked against the official
gazetted OVF No. 1 (Revised 2025) PDF form fetched directly from COMELEC's
own site. It remains `draft`, not `verified`, pending an independent second
reviewer's field-by-field pass.

## Why this document exists

This `GovSchema Standard Research` cycle (GOV-1457) was pointed at several
remaining voter-registration gaps by prior cycles' own notes: the UAE has no
general voter-registration process (likely N/A, not attempted this cycle),
Brazil's TSE electoral register is suspended 2026-05-07 through
2026-11-03 (confirmed dead end by GOV-1400, not re-attempted), and Mexico's
INE credencial para votar requires an in-person biometric appointment
(flagged as likely weak, not attempted this cycle in favor of a stronger
candidate). The Philippines — which opened as the registry's 17th
jurisdiction one cycle earlier (GOV-1444) with only one schema
(`ph/bir/tin-application-corporations-partnerships`, Business Formation) —
was flagged as "untested this cycle" for voter registration and picked as
the strongest remaining candidate. The Commission on Elections (COMELEC)
publishes **iRehistro for Overseas Voters**, a public, unauthenticated web
tool that walks an applicant through the exact fields of OVF No. 1
(Revised 2025) and generates a printable, QR-coded PDF of the completed
form — a live-wizard sourcing shape this registry has used successfully
before (e.g. `us/fl/miami-dade/clerk/marriage-license-preapplication`,
`mx/inm/forma-migratoria-multiple-electronica`). This adds the Philippines'
second vertical (National ID & Civic Documents) and closes this registry's
last realistically-sourceable voter-registration gap this cycle.

## Sources examined

- **Document `(id, version)`:** `ph/comelec/overseas-voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Commission on Elections (COMELEC), Republic of the Philippines
- **Primary source (directly retrieved, HTTP 200, full DOM read):**
  <https://irehistro.comelec.gov.ph/> — "iRehistro for Overseas Voters"
  (version 5.2.2.1). Note: `comelec.gov.ph`'s own root domain returns a
  Cloudflare interstitial challenge ("Just a moment...", HTTP 403) to a
  plain `curl` fetch from this environment, but the `irehistro.comelec.gov.ph`
  subdomain that hosts the actual application-form generator tool is
  directly reachable with a realistic browser User-Agent — no login,
  CAPTCHA, or WAF gate on the wizard page itself. The wizard's own
  submission step requires a Cloudflare Turnstile CAPTCHA
  (`cf-turnstile-response`), which is not modeled as a schema field (see
  "Explicitly out of scope" below), consistent with this registry's
  established treatment of CAPTCHA gates.
- **Corroborating source #1 (directly retrieved, HTTP 200, genuine text
  layer, extracted with pdfjs-dist 4.10.38):**
  <https://www.comelec.gov.ph/php-tpls-attachments/OverseasVoting/2028NLE_OV_RegForms/AnnexA_OVF1_v5_A4.pdf>
  — OVF No. 1 (Revised 2025), the official gazetted 2-page form, fetched
  directly from `comelec.gov.ph`'s own attachment path even though the
  site's root/browsable pages are Cloudflare-gated (the direct attachment
  path was not gated). Used to confirm the wizard's DOM fields correspond
  verbatim to the form's own Parts I and II, and to read the form's other
  application types, and Parts III/IV/V (out of scope — see below).
- **Corroborating source #2 (directly retrieved, HTTP 200, documentary
  requirements):** <https://philippine-embassy.de/overseas-voting/> — the
  Philippine Embassy in Berlin's own official "Overseas Voting —
  Registration Requirements and Procedures" page (a Philippine
  foreign-service-post government page), citing COMELEC Resolution No.
  11171. Used exclusively to source the `documents[]` array (the wizard
  and the blank PDF form do not themselves enumerate which physical
  identity/supporting documents must accompany the printed OVF1 at
  submission).
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Fetched `irehistro.comelec.gov.ph` directly via `curl` with a realistic
   browser User-Agent (HTTP 200, ~146KB HTML, no redirect, no bot
   mitigation encountered).
2. Read the full served HTML directly: every `<input>`/`<select>` `name`
   attribute, every `<label>` and `<option>` text, every `maxlength`
   attribute, every `help-block` hint, and — critically — the page's own
   inline `<script>` containing its client-side `validateForm({...})` call
   (invoked on the "Review Application to be Generated" button), which
   lists every field name alongside its own required/optional status and
   type (`text`/`select`/`email`/`date`/`captcha`). This inline validator
   call is the authoritative source for this schema's `required: true/false`
   assignments (e.g. it confirmed `resiaddr2` ["Address Line 2"] is
   required, even though its `<label>` carries no visible asterisk in the
   rendered form — a discrepancy resolved in favor of the validator, the
   stronger signal).
3. Extracted the three large `<select>` option lists (`resictry` — 247
   countries/territories, `leaveabdprv` — 88 provinces/NCR districts,
   `ovnameext` — 12 suffixes) programmatically via a script that parsed
   every `<option value="...">...</option>` pair, to guarantee no entries
   were dropped or mistyped by hand-transcription.
4. Fetched the official OVF No. 1 (Revised 2025) PDF directly and extracted
   its text layer with `pdfjs-dist` (`getTextContent`, version 4.10.38 —
   this environment did not require the 3.11.174 pin noted by earlier
   cycles for this particular PDF). Confirmed the wizard's six on-screen
   sections (Personal Information, Residence Abroad, Local Voter
   Registration, Contact Details, Authorized Representative in the
   Philippines, Review and Generate Application) correspond to the form's
   Part I ("PERSONAL INFORMATION OF THE APPLICANT", including the
   residence-abroad and local-registration blocks) and Part II
  ("AUTHORIZED REPRESENTATIVE OF THE APPLICANT IN THE PHILIPPINES").
5. Fetched the Philippine Embassy in Berlin's official registration-
   requirements page directly (HTTP 200) and read its "REQUIREMENTS FOR
   FILING AN APPLICATION FOR REGISTRATION/CERTIFICATION" section verbatim
   to source `documents[]`.

## What was confirmed directly (verbatim, from the sources' own text/DOM)

- The wizard's six-section structure and every field name/label/maxlength
  pair listed in `fields[]`'s own `sourceRef` values.
- The full 6-option `statusAbroad` checkbox/select list and its dependent
  conditional fields: `otherStatusAbroadDescription` (shown only when
  Status Abroad = OTHERS) and the two documents gated on `statusAbroad`
  (Seafarer's proof, Dual Citizenship certificate).
- The `isPhilippinePassportValid` → `passportValidUntil` and
  `isRegisteredVoterInPhilippines` → `registeredProvinceOrDistrict`/
  `registeredCityMunicipality` conditional-field pairs, both directly
  observed via the DOM's `style="display:none;"` containers
  (`ovpportcont`, `ovrcont`) that are toggled by the corresponding
  gating field's `change` handler.
- The `citizenship` field's blocking behavior: selecting NON-FILIPINO
  triggers a dialog ("Non-Filipinos cannot submit an application.") and
  the tool's own JavaScript immediately resets the field back to
  FILIPINO (`$("#citizenship").val("FILIPINO");`) — modeled here via
  `fieldRole: "eligibility"` / `eligibleValues: ["FILIPINO"]` rather than
  narrowing the enum itself, since NON-FILIPINO remains a reachable,
  well-formed selection on the live control.
- The OVF No. 1 form's other seven application types (Certification,
  Reactivation, Reinstatement, Change of Address, Recapture of Biometrics,
  Transfer between Posts/Countries, Correction of Entry/Change of Name),
  read directly from the PDF's "APPLICATION FOR:" checkbox group (Part I)
  — confirmed absent from the live iRehistro DOM (no `applicationType`-like
  control, no matching field names anywhere in the page's HTML or its
  `validateForm` call), so this tool generates a Registration-type OVF1
  only. This document therefore models the Registration application type
  exclusively.
- The documentary requirements in `documents[]`: a valid Philippine
  passport (data page + one photocopy) as the default identity document;
  in its absence, a Post-issued Certification; for a Seafarer, a Seaman's
  Book or other proof; for a Dual Citizen, a Dual Citizenship Certificate
  or Order of Approval (original + one photocopy) — all read verbatim from
  the Berlin Embassy's own numbered requirements list. Personal appearance/
  biometrics capture is mentioned on the same source ("Personal appearance
  is required, since the registrant will need to provide their
  biometrics.") but is a process step, not a document, and is not modeled
  as a `documents[]` entry.

## Interpretive judgment calls disclosed

1. **Registration application type only.** iRehistro's DOM only ever
   collects the fields needed to generate a Registration-type OVF1; the
   form's other seven application types are out of scope for this v1.0.0
   (see above). A future version could model these as a `applicationType`
   discriminator field if a source exposing their own additional fields
   (e.g. COMELEC's Virtual Frontline Services portal, mentioned by the
   Berlin Embassy page for Transfer/Reactivation/Reinstatement/Change of
   Address/Correction filings by already-registered overseas voters) is
   found and reviewed.
2. **`registeredCityMunicipality` modeled as an open string, not an enum.**
   The live tool populates this field's own `<select>` option list
   dynamically via a server-side AJAX call (`POST muns-prov`,
   `prv=<selected province code>`) once a province is chosen; the full,
   closed per-province city/municipality list is therefore not enumerable
   from the page's static HTML alone without walking all 88
   province/district values through that AJAX endpoint — deferred to a
   future cycle rather than guessed at.
3. **`dateOfBirth`'s 18-years-by-election-day cutoff not modeled as a
   static `validation.maximum`.** The live tool's client-side validator
   currently hardcodes this cutoff as `05/08/2010` (i.e. the next scheduled
   election date), which necessarily moves with each election cycle. Baking
   today's cutoff into a versioned schema would silently go stale;
   documented instead as a business rule in the field's own description.
4. **`citizenship` modeled via `fieldRole: eligibility` /
   `eligibleValues`, not a narrowed enum.** See "What was confirmed
   directly" above — NON-FILIPINO is a reachable but ineligible selection
   on the live control, which is exactly the shape GSP-0018's
   `eligibleValues` mechanism exists for.
5. **CAPTCHA excluded.** The wizard's final "Review and Generate
   Application" step requires solving a Cloudflare Turnstile challenge
   (`cf-turnstile-response`) before the tool will render the PDF. Consistent
   with this registry's established convention, this is not modeled as a
   schema field.
6. **Country/province enums use the source's own display-text values, not
   internal numeric/alpha codes.** `residenceCountry` (247 entries) and
   `registeredProvinceOrDistrict` (88 entries) are modeled using the
   `<option>` elements' visible label text (e.g. `"AFGHANISTAN"`,
   `"NCR - 1st DISTRICT (Manila)"`), not the underlying `value` attributes
   (ISO-ish country codes; internal province numeric codes) the tool
   itself submits — the same convention already established by
   `nl/denhaag/voter-registration-abroad`'s 247-entry country enum, since a
   consuming agent has no independent way to resolve COMELEC's internal
   numeric province codes without a further, unpublished lookup table.
7. **Parts III, IV, and V of OVF No. 1 out of scope.** Part III (the oath
   and the applicant's/Election Officer's signatures) is executed in
   person, not a data-entry field; Part IV ("TO BE ACCOMPLISHED BY THE
   VRMO") and Part V (Resident Election Registration Board action) are
   office-use-only sections never exposed to the applicant by iRehistro.
8. **In-country (domestic) voter registration not modeled.** COMELEC's
   domestic registration process is a separate, in-person, biometric-
   capture process with no equivalent public online wizard found this
   cycle — a distinct, not-yet-sourced candidate for a future cycle, not a
   dead end.

## What is NOT yet independently verified

- No independent second reviewer's field-by-field pass has occurred yet
  (status remains `draft`).
- The wizard's generated output PDF itself was not obtained (doing so
  requires solving the live Cloudflare Turnstile CAPTCHA, which was not
  attempted, consistent with this registry's boundary against CAPTCHA/
  login bypass) — the schema is derived from the intake DOM and the blank
  gazetted form, not from a rendered sample output.
- COMELEC's Virtual Frontline Services (VFS) portal, mentioned only in
  passing by the Berlin Embassy's own page as the channel for certain
  already-registered overseas voters' Transfer/Reactivation/Reinstatement/
  Change of Address/Correction filings, was not located or reviewed this
  cycle.

## Candidates rejected or deferred this cycle

- **AE (UAE):** no general citizen-initiated voter-registration process
  exists — not attempted, consistent with prior cycles' assessment.
- **BR (Brazil):** TSE's electoral register remains suspended
  (2026-05-07 through 2026-11-03), confirmed by GOV-1400 — not
  re-attempted.
- **MX (Mexico):** INE's credencial para votar requires an in-person
  biometric appointment — not attempted this cycle in favor of the
  stronger Philippines candidate; remains an open backlog candidate, not a
  dead end.
- **PH LTO driver's-licence/vehicle-registration (DMV vertical)** and
  **PH PhilSys national-ID Step-1 registration** were this cycle's
  fallback candidates per the task brief, but were not needed once
  COMELEC's iRehistro tool proved directly reachable and well-sourced —
  both remain open backlog candidates for the Philippines' remaining
  verticals (DMV, National ID card itself).
