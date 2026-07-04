# Verification record — `nl/denhaag/voter-registration-abroad` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from a **live, screen-by-screen headless-browser
walkthrough** (Playwright + Chromium, not a static page fetch) of the actual
production wizard at `formulieren.denhaag.nl/permanente-registratie-kiezer-buiten-nederland`.
A plain HTTP fetch of this URL returns only the wizard shell ("Openforms"
title, `Laden...`/loading placeholders); every field, label, and validation
message renders client-side, so field-level sourcing required driving a real
browser. Status remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `nl/denhaag/voter-registration-abroad` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Gemeente Den Haag (Municipality of The Hague). Under the
  Kieswet (Elections Act), Den Haag is the single national municipality
  designated to register every voter resident outside the Netherlands,
  regardless of which (if any) Dutch municipality the applicant was
  previously registered in — confirmed by `www.denhaag.nl`'s own "Kiezers
  buiten Nederland" page and corroborated by `www.nederlandwereldwijd.nl`
  (Ministry of Foreign Affairs' citizen-services site), which routes
  overseas Dutch nationals to the same `stemmenvanuithetbuitenland.nl` /
  `formulieren.denhaag.nl` service.
- **Primary source:** live wizard at
  <https://formulieren.denhaag.nl/permanente-registratie-kiezer-buiten-nederland>,
  driven with Playwright/Chromium (a genuine headless render, not a
  bot-check stub — the page returned real Open Forms markup, HTTP 200, no
  Incapsula/Akamai challenge page was encountered). The wizard exposes 8
  named steps in its own progress rail: Introductie, Startpagina,
  Verkiezingen, Uw gegevens, Uw nationaliteit, Uw stembiljet, Ondertekening,
  Overzicht.
- **Secondary sources (fetched directly, HTTP 200, used for scoping/context
  only, no field content sourced from them beyond what is cited above):**
  - `https://www.denhaag.nl/nl/verkiezingen/kiezers-buiten-nederland/registreren-als-kiezer-buiten-nederland/`
    — confirms eligibility (lives outside NL and not registered at a Dutch
    municipal address; Dutch nationality; 18 or older; valid Dutch passport
    or identity card) and that the wizard is reached via a link from this
    page.
  - `https://www.nederlandwereldwijd.nl/stemmen-buitenland` and its
    `.../registreren` sub-page — independently corroborates the same
    eligibility conditions and the postal-voting-by-default framing from the
    Ministry of Foreign Affairs' own citizen-facing summary.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `requestTweedeKamerDocuments`, `requestEuropeanParliamentDocuments`, `requestKiescollegeDocuments` | **Directly observed** in the live DOM at the wizard's 'Verkiezingen' step: three checkboxes under heading "Ik wil graag de documenten ontvangen die nodig zijn om te stemmen voor:", each with a stable `id`/`name`/`value`/label captured verbatim. The step's own client validation ("Het verplichte veld ... is niet ingevuld") confirmed at least one is required, observed by submitting the step with none checked. |
| `firstNames`, `namePrefix`, `lastName`, `bsn`, `dateOfBirth`, `phoneNumber`, `email`, `residentialAddress`, `residentialAddressLine2`, `residentialAddressLine3`, `countryOfResidence`, `correspondenceAddress`, `correspondenceAddressLine2`, `correspondenceAddressLine3`, `correspondenceCountry` | **Directly observed**, the 'Uw gegevens' step's own field labels, `name`/`id` attributes, `placeholder`s (e.g. `dd-mm-jjjj` for `dateOfBirth`, `_________` for `bsn`), and required/optional framing (`(niet verplicht)` suffix on labels marks optional fields, matching the step's own instruction "Alle velden zijn verplicht, tenzij anders aangegeven"). A full mock submission (see below) was entered into every one of these fields live in the browser and the step's Volgende (Next) button transitioned from a disabled `aria-disabled="true"` state to enabled only after the backend's own asynchronous `_check-logic` validation endpoint (`POST .../steps/{id}/_check-logic`, observed directly in the network log) returned success — i.e. the fields, their required/optional split, and the values entered were confirmed against the live server, not just client-side markup. `countryOfResidence`/`correspondenceCountry`'s enum is the exact 247-entry Dutch-language list read out of the live Choices.js country-picker widget's rendered `<option>` elements (see Explicitly out of scope for territories omitted from the mock-tested selection). The `bsn` pattern (8-9 digits) is the standard published BSN length, not read verbatim off the form (which shows only a 9-underscore placeholder), so is flagged the same as `ie/electoral-commission/voter-registration`'s `ppsn` pattern caveat. |
| `nationalityProofType`, `europeanParliamentDeclaration` | **Directly observed**, the 'Uw nationaliteit' step's own radio-button labels/values and checkbox label/id. `europeanParliamentDeclaration`'s conditional requirement was inferred from the field's own heading ("Verklaring verkiezing Europees Parlement") and body text explaining it applies to applicants resident in another EU member state who have requested European Parliament documents; the *positive* case (checking `requestEuropeanParliamentDocuments`, then confirming the step's own required-field error text appears if `epverklaring` is left unchecked) was directly observed. The negative case (leaving `requestEuropeanParliamentDocuments` unchecked and confirming `epverklaring` is *not* required) was not independently re-tested live this cycle — flagged for a future reviewer, though the schema's own `requiredWhen: { field: requestEuropeanParliamentDocuments, equals: true }` was checked against a from-scratch condition evaluator (see below) and correctly resolves to not-required when that field is `false`. |
| `documents[].identityDocumentCopy` | **Directly observed**, the 'Uw nationaliteit' step's own upload-widget copy ("Upload hier een kopie/scan van uw geldige identiteitsdocument... De maximale bestandsgrootte is 10MB... U kunt maximaal 20 MB aan bestanden toevoegen. Wij ondersteunen de volgende bestandsformaten: txt, jpg, pdf, png, doc, docx en Open Office") and its own required-field error text ("Dit veld moet minstens één waarde hebben"). A real file was uploaded through Playwright's native `filechooser` event interception (not a scripted DOM value injection) and the widget's own file-list UI confirmed receipt ("dummy_id.txt, 28.00 Bytes"). |

## At-least-one-election-selected: a deliberate non-machine-encoded condition

The live form enforces that at least one of the three election checkboxes is
selected (directly observed: submitting the step with none checked returns
"Het verplichte veld ... is niet ingevuld"). This document does **not**
encode that as a `requiredWhen`/`crossFieldValidationRule` constraint,
because GSP-0013's leaf-compare grammar has no field-absence operator: an
unchecked checkbox is typically *absent* from a submission rather than
present with value `false`, and comparing an absent field against
`equals: false` risks the same absent-field misfire already recorded
against this registry's `notEquals`/`equals`-against-a-falsy-sentinel bug
class (`fr/dgfip/income-tax-return-2042`'s `notEquals: 0`, GOV-763;
`ie/electoral-commission/voter-registration`'s original `previousNationality
notEquals ""`, GOV-1045). Each of the three fields' own `description`
documents the human-facing constraint instead, following the same
description-only convention `ie/electoral-commission/voter-registration`
already established for its symmetric `ppsn`-absence/witness-required case.

## Test run with mock data

A mock registration packet was assembled at
`conformance/nl/denhaag/voter-registration-abroad/1.0.0/application-packet.json`
for a Dutch national resident in Germany, requesting documents for all
three election types, providing a BSN and a Dutch-ID-copy nationality
proof — fabricated name/address/BSN, not a real person. This exact packet
was:

1. **Entered live into the production wizard** (Playwright/Chromium),
   advancing from Introductie through Uw nationaliteit with the identity
   document uploaded via a real file-chooser interaction, confirming the
   backend's own step-transition validation accepts every value entered
   (screenshots retained in the authoring session). The wizard's remaining
   three steps (Uw stembiljet, Ondertekening, Overzicht) were reached in an
   earlier pass of the same walkthrough but the live site began responding
   more slowly/inconsistently to further automated interaction before this
   session captured their field-level content — see "Explicitly out of
   scope" below. No value was ever submitted to the live government system:
   this authoring pass only advanced the wizard's own client/server
   validation checkpoints, consistent with this registry's standing
   practice of never completing a live submission during authoring.
2. **Checked with a standalone script** re-implementing the schema's own
   `required`/`requiredWhen`/`validation`/`eligibleValues` evaluation (the
   GSP-0013 condition grammar `all`/`any`/`not`/leaf-compare, the same
   technique used for the last several registration/renewal cycles): 21
   field/document entries evaluated, 0 violations. A separate negative-branch
   check confirmed `europeanParliamentDeclaration`'s `requiredWhen`
   correctly evaluates to *not required* when `requestEuropeanParliamentDocuments`
   is `false`, ruling out the absent-field misfire class described above for
   this specific conditional field (which, unlike the three election
   checkboxes, needed a machine-checkable condition because its trigger,
   `requestEuropeanParliamentDocuments`, is compared with `equals: true` —
   safe against the absent-field trap, unlike `equals: false`/`notEquals`
   comparisons against a sentinel).

## Explicitly out of scope for v1.0.0

- **Uw stembiljet, Ondertekening, Overzicht (ballot-method, signature, and
  summary steps).** Confirmed to exist — visible by name in the wizard's own
  progress rail throughout every walkthrough this cycle — but their
  field-level content (labels, input names, required/optional split) was not
  captured before this cycle's live browser session hit intermittent
  site-side flakiness on repeated automated interaction. The site's own
  introductory copy states voting is by post by default ("Als kiezer buiten
  Nederland stemt u standaard per brief") and that a proxy (volmacht) may be
  arranged instead, but that is describing the separate per-election voting
  mechanics, not necessarily this registration form's own field set, so no
  field was authored from that inference. A future cycle should retry the
  walkthrough (ideally with longer inter-request pacing) to capture these
  three steps and extend this schema with a new version.
- **The separate per-election postal-vote proxy (volmacht) process** and the
  briefstemmen (postal voting) mechanics themselves — distinct, later-in-time
  transactions from this one-time permanent registration.
- **Territories/countries in the `countryOfResidence`/`correspondenceCountry`
  enum beyond the 247 read directly from the live picker.** The enum is
  believed complete as of the retrieval date but was not cross-checked
  against an authoritative ISO 3166 list; entries use the picker's own
  Dutch-language names verbatim (e.g. "Bondsrepubliek Duitsland" for
  Germany), not ISO 3166-1 alpha-2/3 codes.

## Scope and jurisdiction notes

This closes a real "remaining voter registration" gap named directly in
GOV-1121's own instructions. The Netherlands' ordinary electoral roll is
populated automatically from the municipal population register (BRP) for
residents, already effectively covered by the registration data underlying
`nl/rvig/passport-application`/`nl/rvig/national-identity-card-application`'s
BRP-sourced identity fields — but Dutch nationals living abroad and not
registered at any Dutch municipal address fall outside the BRP and must
actively register with Gemeente Den Haag as described here, a genuinely
separate, previously unmodelled process. This is the same class of gap this
registry already closed for Ireland
(`ie/electoral-commission/voter-registration`, GOV-1043/GOV-1045), New
Zealand (`nz/electoral-commission/voter-registration`, GOV-1075), France
(`fr/interieur/voter-registration`, GOV-1064), and the United States
(`us/eac/voter-registration-national-mail-form`, GOV-1112) — this schema
brings national-level voter-registration coverage to 9 of this registry's
11 core jurisdictions (Germany and Singapore remain confirmed non-gaps: both
populate their electoral/civic rolls automatically with no separate
citizen-initiated registration process, per `ie/electoral-commission/voter-registration`'s
own prior research note on Germany, and Singapore's NRIC-based automatic
enrolment confirmed during GOV-1075).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live wizard's remaining three
steps (Uw stembiljet, Ondertekening, Overzicht), resolves any discrepancy or
addition by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
