# Verification record — `ch/fedpol/antrag-pass-identitaetskarte` v0.1.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this cycle picked fedpol's online passport/ID-card application

This is the recurring "GovSchema Standard Research" cycle (**GOV-1931**).
Switzerland previously had only 2 of 6 verticals modelled — DMV
(`ch/sg/stva/gesuch-lernfahr-fuehrerausweis`, cantonal) and Taxes
(`ch/zh/sta/*`, 11 companion schedules for Canton Zürich, a seam now fully
mined per GOV-1924). Business Formation, Passport, Visa, and National ID were
open. CH Visa was already a confirmed dead end (GOV-1774: SEM's own national
D-visa and Schengen C-visa PDFs are field-for-field duplicates of the
EU-harmonized `de/auswaertiges-amt/national-visa-application` template). CH
Passport and National ID had only ever been screened at the level of "no
downloadable citizen-facing PDF exists in the flow" (GOV-1840,
re-confirmed GOV-1804/GOV-1774) — that finding is true (there genuinely is no
PDF) but incomplete: it never rendered the live JavaScript single-page
application (SPA) the process actually runs on, at
`ch-edoc-passantrag.admin.ch`, linked from fedpol.admin.ch's own
`/en/application` page. This cycle did.

fedpol (the Federal Office of Police, part of the Federal Department of
Justice and Police) is Switzerland's federal authority for both the passport
and the identity card (Identitätskarte) — both documents are issued through
the *same* online application tool, asked through one shared field set
(a document-type choice: passport / identity card / combi), not two separate
flows. Per this registry's established pattern for a single source that
forks into related paths rather than being split artificially (see e.g.
`ch/zh/sta/hilfsblatt-b`), this cycle authors **one** schema modelling both
verticals via a `documentType` discriminator field, rather than two schemas.

The tool turned out to be a real, non-trivial data-entry SPA — not a
login-only shell — but one that structurally gates its own substantive
personal-data screens behind a one-time link e-mailed to the applicant, which
this cycle could not obtain (no real inbox). Rather than treating that gate
as a hard dead end (which this cycle judged would have discarded a great
deal of genuine, mechanically-sourced structure), the running application's
own canonical i18n resource bundle was fetched directly and used — clearly
and separately disclosed below from the directly-rendered portion — to model
the full flow. See "Sources examined" and "Judgment calls" below for the
complete, honest breakdown of what was directly observed vs. what was sourced
from that resource.

This opens 2 of Switzerland's remaining 4 open verticals (Passport, National
ID) via one schema. Business Formation (`easygov.swiss`) remains Switzerland's
last fully open vertical, previously confirmed a pure CH-Login-gated dead end
(GOV-1840) not re-attempted this cycle.

## Sources examined

- **Document `(id, version)`:** `ch/fedpol/antrag-pass-identitaetskarte` /
  `0.1.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Federal Office of Police (fedpol), Federal Department of
  Justice and Police (FDJP) — a federal, not cantonal, authority (contrast
  every prior CH schema in the registry, all cantonal).
- **Entry point:** `https://www.fedpol.admin.ch/en/application`, fetched
  directly this cycle, which links to the live application tool.
- **Primary source (live application):**
  `https://www.ch-edoc-passantrag.admin.ch/antrag/antrag_start.action?request_locale=en`
  — an Angular single-page application. Its own `/rest/appinfo/infos`
  endpoint (fetched directly this cycle, HTTP 200) reports
  `{"appVersion":"3.19.11", ..., "appName":"antrag-service"}`. First direct
  static fetch attempts (`curl`, `WebFetch`) returned a WAF block page
  ("Web Page Blocked! ... Attack ID: 20000051") on some requests but a normal
  200 with full HTML on others from the same IP within the same session —
  intermittent, not a hard block; a headless-Chromium session with a
  realistic desktop `User-Agent` string rendered the application cleanly and
  consistently every subsequent attempt this cycle.
- **Live rendering method:** Playwright driving headless Chromium (via
  `playwright-core` + the `/paperclip/chrome-sysroot` shared libraries, per
  this registry's own documented technique for this environment), navigating
  and interacting with real DOM elements (radio buttons, an autocomplete
  combobox, a `mat-select` dropdown, text inputs), never a fixed sleep —
  each step waited on `networkidle` plus a settle delay, and every step was
  screenshotted (saved under `/tmp/shotter/`, not in this repo, per this
  registry's screenshot-storage convention).
  - **Step 1 (Domicile) — directly rendered, DOM-verified.** The page
    (`#/antraggesuch`) opened in German by default despite the
    `request_locale=en` query parameter (a source quirk, disclosed, not a
    modelling concern); clicking the on-page `EN` language link (careful to
    match link text that **starts with** "EN", since a naive substring match
    on "en" false-positived on the French link's own text, "Cette page
    **en** français") switched the whole UI to English. Clicking "Order
    documents" (`#bestellenBtn`) opened a `mat-radio-group` titled "Select
    your place of residence.", with two `mat-radio-button`s labelled
    "Switzerland" and "Abroad" (native radio inputs `mat-radio-0-input`/
    `mat-radio-1-input`, clicked via their visible `<label>`, since MDC's
    native radio input itself is visually hidden by CSS). Selecting
    "Switzerland" immediately revealed a required `#cantonInput` autocomplete
    (`aria-required="true"`, `title="Select your canton of domicile."`);
    opening it listed exactly 26 `mat-option`s (Aargau AG, Appenzell
    Inner-/Outer-Rhodes AI/AR, Basle-City/-Country BS/BL, Bern BE, Fribourg
    FR, Geneva GE, Glarus GL, Grisons GR, Jura JU, Lucerne LU, Neuchâtel NE,
    Nidwalden NW, Obwalden OW, Schaffhausen SH, Schwyz SZ, Solothurn SO,
    St Gall SG, Thurgovia TG, Ticino TI, Uri UR, Valais VS, Vaud VD, Zug ZG,
    Zurich ZH), independently cross-checked against the application's own
    live reference-data endpoint,
    `https://www.ch-edoc-passantrag.admin.ch/rest/stammdaten/kanton?lang=en`
    (fetched directly this cycle, HTTP 200), which returns exactly 26 records
    with `kuerzel` abbreviations `AG,AI,AR,BE,BL,BS,FR,GE,GL,GR,JU,LU,NE,NW,
    OW,SG,SH,SO,SZ,TG,TI,UR,VD,VS,ZG,ZH` — an exact match, confirming the
    `canton` field's enum. Selecting "Abroad" instead advanced straight to
    the Applicant-contact card below with **no** separate country/
    registration-centre selector on this immediate screen (checked directly
    by re-running the flow with "Abroad" selected) — the "Registration
    centre" concept the i18n resource separately names
    (`internet.auslandch.passnureau`) is not shown at this point in the live
    flow; this cycle could not confirm exactly which later screen renders it
    (modelled here as `responsibleRepresentation`, per the i18n resource's
    own step-6 naming — see "Judgment calls" below).
  - **Step 2 (Applicant-contact card) — directly rendered, DOM-verified.**
    Clicking "Next" revealed a form headed "Applicant:" with a required
    `mat-select[formcontrolname=anrede]` (`aria-required="true"`,
    `title="Select title."`; opening it listed exactly two options, "Mr" and
    "Ms"), a required `surname` text input (`#mat-input-0
    [formcontrolname=name]`, `aria-required="true"`, `maxlength="50"`), a
    required `firstNames` text input (`#vorname[formcontrolname=vorname]`,
    same attributes), and a required `email` input entered twice
    (`#email`/`#emailrepeat`, both `aria-required="true"` `maxlength="50"`).
    Two additional hidden form-control names were found in the DOM at this
    step but are **not** modelled as schema fields: `formcontrolname="HName"`
    — confirmed to be an anti-bot honeypot field, not a real applicant
    attribute, by the i18n resource's own dedicated message,
    `validate.hname.maxLength`: "Input too long. Are you possibly a bot?" —
    and `formcontrolname="TS"` — confirmed to be an anti-bot elapsed-time
    field by `validate.ts.min`: "Cannot be sent. Please restart the
    application."; filling and submitting the form via scripted `page.fill()`
    calls (near-instant) reproducibly crashed the SPA's own client-side error
    renderer (`TypeError: Cannot read properties of undefined (reading
    'text')` inside its `getErrorMessage`/`validateFormular` code, confirmed
    via the browser console), consistent with the timing field failing its
    minimum-elapsed-time check; resubmitting with human-paced `page.type()`
    keystrokes and multi-second waits between steps (no bug, no crash)
    advanced cleanly straight to the Confirmation screen, which read: "A
    message has been sent to your e-mail address
    placeholder.test@example.com . Open the message by clicking the subject
    heading **"Ordering identity documents"**. To proceed with your order,
    click the link in this message." — mechanically confirming that
    everything past this point in the flow is gated behind a real e-mailed
    link, which this cycle, having used a fabricated placeholder address
    (`placeholder.test@example.com`, deliberately not a real deliverable
    inbox, per this registry's no-real-data rule), could not obtain. No
    CAPTCHA was actually rendered for this particular attempt, despite the
    i18n resource carrying CAPTCHA-related strings (`internet.captcha`,
    `validate.captcha`) — this cycle cannot rule out a CAPTCHA appearing
    under different conditions (e.g. rate-limiting) since it was not
    observed to trigger for a single clean attempt.
  - **All of the above is reproducible from this cycle's own saved
    screenshots** (not committed to this repository; a fresh independent
    re-run of the same live URL, described above, reproduces the same DOM
    structure and behaviour).
- **Secondary source (the application's own i18n resource) — used for every
  field beyond the e-mail gate, clearly disclosed per-field in `schema.json`
  via each field's `sourceRef`.**
  `https://www.ch-edoc-passantrag.admin.ch/rest/i18n/translations/en`,
  fetched directly this cycle (HTTP 200, 443 top-level keys, `Content-Type:
  application/json`). This is not a static document the reviewer merely
  read about — it is the exact REST resource the running Angular application
  itself downloads on page load (confirmed via the browser's own network
  log during the Step 1/2 rendering above, which shows the SPA fetching
  `/rest/i18n/translations/de` on first (German) load) to render every
  label, tooltip, and field-specific validation-error message in every step
  of the wizard, keyed by strings such as `internet.schritt2.geburtsdatum`
  ("Date of birth:") and `validate.nogeburtsdatum` ("Enter a valid date
  (dd.mm.yyyy or 00.mm.yyyy or 00.00.yyyy).") — i.e. the resource discloses
  not just field labels but the exact client-side validation-error text tied
  to each field, which is how this cycle inferred requiredness for fields it
  could not directly render (see "Requiredness inference" below). Every
  translation key cited in `schema.json`'s field descriptions and below was
  independently re-grepped against a fresh re-fetch of this same endpoint
  immediately before this cycle's sourcing re-verification pass (see the PR
  checklist / `verify-sources.mjs` run); none were paraphrased from memory.
  The resource's own step-grouping key namespace (`internet.schritt1.*`
  through `internet.schritt8.*`/`schritt10.*`) is what this schema's `steps[]`
  array's ordering and titles are derived from — `schritt1` = "Identity
  document type & language type" through `schritt7` = "Contact details", with
  `schritt8`'s own sub-keys (`schritt8.schritt1` through `schritt8.schritt6`)
  re-using the same headings to label a review/summary screen rather than
  describing an additional distinct data-entry step, and `schritt10.title` =
  "Summary of the application" naming the final screen this schema calls
  `summary`.

## Requiredness inference for i18n-resource-sourced fields (disclosed limitation)

For every field in the `documentTypeAndLanguage` step onward, `required`/
`requiredWhen` was set to `true` **only** where the i18n resource carries a
dedicated "this field is empty" validation-message key for it (e.g.
`validate.nogeburtsdatum`, `validate.nogeschlecht`, `validate.noantragsgrund`,
`validate.nolieferoption`, `validate.noimmatrikulation`,
`validate.noland.lieferadresse`) — a strong, but indirect, signal: the
existence of a dedicated blank-field error message means the live
`validateFormular` code path checks for that field's presence, which is only
meaningful if the field can be left blank and rejected, i.e. it is enforced
as required in at least some reachable form state. This is **not** the same
evidentiary strength as a directly observed `required`/`aria-required` DOM
attribute (which this cycle has, and cites, for every field in `domicile`
and `applicantContact`) or a submitted-and-rejected empty-field screenshot.
Fields with no such dedicated message (e.g. `hyphenatedSurname`,
`currentPassportNumber`, `currentIdCardNumber`, the address-line-2 fields,
`remarks`, the phone-number fields) are modelled as optional. This
distinction is called out again, field-by-field, in each affected field's
`sourceRef` in `schema.json` ("sourced from the application's own i18n
resource; not independently DOM-rendered this cycle").

## Judgment calls

1. **Single schema with a `documentType` discriminator, not two schemas.**
   fedpol's own tool asks "Do you need a passport, an ID card, or both
   (combi)?" through one shared field set and one continuous flow, not two
   separate application processes — the same modelling choice this registry
   made for `ch/zh/sta/hilfsblatt-b`. See the top-level `description` for the
   full reasoning.
2. **The domestic ID-card-only online-ordering restriction is disclosed in
   prose, not enforced as a hard validation rule.** The i18n resource states:
   "You are presently only able to apply for a passport or combination offer
   (passport and identity card) via internet in your canton of residence.
   Kindly contact your municipality of residence if you only wish to apply
   for an identity card." (`internet.schritt1.intro.pass`). Because the
   source itself frames this as a current operational state ("presently"),
   not a permanent structural rule, and because this cycle could not
   directly observe whether it is enforced as a hard client-side validation
   or is merely descriptive guidance, `documentType`'s enum is not narrowed
   conditionally on `domicile`; the restriction is disclosed in the field's
   own `description` instead.
3. **The ID-card "with/without data chip" wording variant
   (`internet.schritt1.intro.chip.true`/`.false`) is not modelled as a
   separate field.** This cycle could not confirm whether it is a
   user-selectable option or a system-determined attribute (e.g. tied to a
   chip-rollout date or the applicant's canton); disclosed in `documentType`'s
   description rather than guessed at.
4. **`reasonForApplication`'s enum is simplified to the plain citizen-facing
   reason set**, excluding the i18n resource's own additional
   document-specific (identity-card A/B/C codes), consular/EDA-specific, and
   internal data-entry-correction reason codes — a disclosed scope decision
   (see the field's own `description`), since fully replicating every
   internal code combination without ever rendering that screen risks
   overclaiming precision this cycle does not have.
5. **`custodyType`/parents/guardian fields are all optional**, not gated to
   minor applicants structurally, since this cycle could not confirm the
   live trigger condition (most likely an age threshold, but unconfirmed) —
   disclosed in `custodyType`'s own description.
6. **`emailRepeat` (the live form's duplicate-entry e-mail confirmation
   field) is not modelled as a separate schema field** — it carries no
   distinct data value beyond `email` itself; this mirrors how this registry
   generally treats UI-only double-entry confirmation controls.
7. **`responsibleRepresentation`/`responsibleRepresentationCountry` are
   placed at the step the i18n resource's own step numbering
   (`internet.schritt6.title`) implies**, even though this cycle's direct
   rendering of the Domicile step's "Abroad" branch did not surface a
   registration-centre selector at that point — disclosed directly in the
   field's own description, not silently reconciled.
8. **`dateOfBirth` and `height` use `string`/`pattern` rather than
   `date`/`number`**, to preserve the source's own documented non-standard
   allowances (partial dates with `00` placeholders for an unknown day/month;
   the literal `***` sentinel for children under 14 or wheelchair-dependent
   applicants) rather than forcing a strict calendar date or a bare numeric
   height that would reject those source-documented valid inputs.

## Field-by-field source mapping

- **Domicile step** → `domicile`, `canton` — DOM-verified (see "Sources
  examined").
- **Applicant-contact card** → `title`, `surname`, `firstNames`, `email` —
  DOM-verified.
- **Identity document type & language (i18n `schritt1`)** → `documentType`,
  `printedLanguage`.
- **Personal data (i18n `schritt2`)** → `hyphenatedSurname`, `dateOfBirth`,
  `placeOfBirthAbroad`, `placeOfBirth`, `sex`, `height`, `placeOfOrigin`,
  `currentPassportNumber`, `currentIdCardNumber`, `reasonForApplication`.
  (`surname`/`firstNames` are collected once, on the Applicant-contact card,
  and reused here per the i18n resource's identical `internet.schritt2.name`/
  `.vorname` labels — not duplicated as separate fields.)
- **Further personal data / parents & legal guardian (i18n `schritt3`)** →
  `custodyType`, `motherSurname`, `motherFirstNames`, `fatherSurname`,
  `fatherFirstNames`, `guardianSurname`, `guardianFirstNames`.
- **Residential address (i18n `schritt4`)** → `residentialStreetAndNumber`,
  `residentialAddressLine1`, `residentialAddressLine2`,
  `residentialPostalCode`, `residentialCity`.
- **Delivery address (i18n `schritt5`)** → `deliveryOption`,
  `deliveryAddressLine1`, `deliveryAddressLine2`, `deliveryPostalCode`,
  `deliveryCity`, `deliveryCountry`.
- **Responsible representation, abroad only (i18n `schritt6`)** →
  `responsibleRepresentationCountry`, `responsibleRepresentation`.
- **Contact details & remarks (i18n `schritt7`)** → `privatePhone`,
  `mobilePhone`, `workPhone`, `remarks`.
- **Summary/Confirmation (i18n `schritt8`/`schritt10`)** → not a distinct
  data-collection step; modelled as the terminal `summary` step with no
  fields of its own, per its own live-observed behaviour (Step 3 of the
  top-level tracker, "Confirmation").

## What is NOT modelled

- The biometric-capture in-person appointment (photograph, signature,
  fingerprints for a passport) that follows a verified online application —
  explicitly out of scope, per fedpol's own process description and this
  registry's established treatment of "the online step is what this
  registry models" for similar processes elsewhere.
- Payment/fee handling — the i18n resource references fee amounts
  (`antrag.antragtyp.template`) but this cycle found no payment step
  reachable online (fees are described elsewhere as collected at the
  in-person biometric appointment).
- Any document upload — none exists in this flow (contrast, e.g., a
  photo-upload step); the one `imageupload.*` key cluster in the i18n
  resource describes a *different*, separately-login-gated photo-upload tool
  (its own strings are literally untranslated placeholders, "EN: Bild
  hochladen" etc., and require a password e-mailed separately per
  `imageupload.tooltip.login`), which this cycle did not attempt to reach and
  does not model.
- The exact conditional trigger for the parents/legal-guardian section
  (age-based, most likely, but unconfirmed) — see "Judgment calls" #5.

## Mock-data test run

One complete, realistic application-packet fixture was constructed at
`conformance/ch/fedpol/antrag-pass-identitaetskarte/0.1.0/application-packet.json`
per this registry's established conformance-fixture convention (GSP-0016):
an adult woman domiciled in Winterthur, Canton Zürich, ordering a Combi
(passport + identity card) to replace her expiring documents, delivered to
her own residential address. Fabricated details, not a real person.

An ad hoc Node script (not committed to `tools/`, consistent with this
registry's established practice for a one-off conformance check) re-derived
every field's effective requiredness from `schema.json`'s own
`required`/`requiredWhen` conditions and re-checked the packet, plus five
additional hand-written variants, against every `validation.enum`/`pattern`/
`maxLength` rule:

1. The committed packet itself (`domicile: "switzerland"`, adult, `combi`) —
   **no violations**.
2. A positive control with `domicile: "abroad"`,
   `deliveryOption: "otherAddressAbroad"`, and every field
   `requiredWhen`-gated on those two choices supplied (`responsibleRepresentation`,
   `responsibleRepresentationCountry`, `deliveryAddressLine1`,
   `deliveryPostalCode`, `deliveryCity`, `deliveryCountry`) — **no
   violations**.
3. A positive control with `custodyType: "both"` and both parents' names
   supplied — **no violations**.
4. A negative control: `domicile: "switzerland"` with `canton` omitted —
   **correctly rejected** (`MISSING required field: canton`).
5. A negative control: `domicile: "abroad"` with
   `responsibleRepresentation`/`responsibleRepresentationCountry` omitted —
   **correctly rejected** (both flagged missing).
6. A negative control: `deliveryOption: "otherAddressAbroad"` with
   `deliveryCountry` omitted — **correctly rejected**.
7. A negative control: `documentType: "diplomaticPassport"` (not a member of
   the schema's enum) — **correctly rejected**.

All seven checks behaved as expected. Both registry validators were also run
directly against `schema.json`:

```
$ node tools/validate.mjs registry/ch/fedpol/antrag-pass-identitaetskarte/0.1.0/schema.json
ok   registry/ch/fedpol/antrag-pass-identitaetskarte/0.1.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/fedpol/antrag-pass-identitaetskarte/0.1.0/schema.json
ok   registry/ch/fedpol/antrag-pass-identitaetskarte/0.1.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
