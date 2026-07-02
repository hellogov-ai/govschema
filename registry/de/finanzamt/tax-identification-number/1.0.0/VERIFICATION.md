# Verification record — `de/finanzamt/tax-identification-number` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

Unlike most `draft` schemas in this registry that are sourced from a PDF or
prose description of a process, this schema was verified by **directly
operating the live form itself**, field by field — the strongest sourcing
grain available under this practice short of an authenticated end-to-end
submission (see "What was not done" below for the one honest gap).

## Sources examined

- **Document `(id, version)`:** `de/finanzamt/tax-identification-number` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bundeszentralamt für Steuern (BZSt), Germany's federal tax
  office (distinct from a local Finanzamt, and from ELSTER's own
  `de/finanzamt/income-tax-return-elster` sibling in this registry — both
  live under the `de/finanzamt` registry segment per this repo's existing
  convention of grouping the German tax-authority family under that path).
- **General info page:** <https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html>
  — "Die Identifikationsnummer". Fetched live via plain `curl` (HTTP 200,
  no block), 2026-07-02. Confirms: the IdNr is an eleven-digit, permanent,
  content-free identifier; it is issued automatically, never applicant-
  requested for a first assignment; it can be found on an
  Einkommensteuerbescheid or Lohnsteuerbescheinigung; it can only be
  re-communicated by post, never by phone or email (data-protection
  reasons stated explicitly); the separate written-request procedure for a
  non-cohabiting minor child's IdNr (for an ELSTER "Anlage Kind" filing);
  the §139b AO data fields BZSt stores; the 4-week current processing time;
  and the link to the online re-issuance form used as this schema's primary
  source (see below).
- **Primary source — the live form itself:** <https://www.bzst.de/SiteGlobals/Kontaktformulare/DE/IdNr/Mitteilung_IdNr/mitteilung_IdNr_node.html>
  ("Erneute Mitteilung der IdNr"). Fetched live, 2026-07-02 (HTTP 200). The
  page's own surrounding prose confirms: the form is for re-issuance of the
  applicant's *own* IdNr to their *current* Meldeanschrift only; the
  applicant's surname must be on the mailbox for delivery to succeed
  (out of scope as a field — a delivery-logistics precondition, not
  applicant-entered data); a same-service option also exists on the BZSt
  Online Portal (BOP); current processing time is roughly four weeks; and
  the form is unsupported in Internet Explorer.

## Why a headless browser was required, and what it found

The form itself is **not static HTML** — it is a `<lucom-wci-form>` custom
element (BZSt's "Formular-Management-System"/LUCOM WCI form engine, form id
`118906`) that renders its actual input fields inside a **shadow DOM**,
populated by client-side JavaScript calling `formularbot-fms.bzst.de`. A
plain `curl`/`WebFetch` GET of the page returns only the page chrome and the
`<lucom-wci-form>` placeholder tag — no field markup at all — so the field
inventory below could not have been produced from a static fetch.

Instead, the form was driven directly with **Playwright** (headless Chromium,
per this environment's existing `browser-screenshots-setup` technique) — a
real, non-submitting walkthrough of both wizard pages:

1. Loaded the page, dismissed the cookie banner, and declined the ViOlA
   chatbot's separate data-consent prompt (the form itself is a sibling
   panel, unaffected by that decision).
2. Enumerated every visible `input`/`select`/`textarea`/`button` element via
   Playwright locators (which pierce shadow DOM automatically — a plain
   `document.querySelectorAll` inside `page.evaluate` does **not**, and
   returned nothing for the same elements; this distinction is the key
   technical finding worth recording for any future session touching this
   or a similarly-built German government form-engine widget).
3. Typed fabricated mock values into each of Seite 1's four fields
   (`Mustermann` / `Erika` / `01.01.1990` / `Berlin`) with real keystroke
   events and explicit blur between fields — required because the widget
   performs an AJAX round-trip (`.../fms/form/update.do`,
   `.../runOnServer.do`) on each field's blur, and filling fields too fast
   or out of DOM order caused the widget's own re-render to silently drop
   values from fields it hadn't yet round-tripped. This is a genuine quirk
   of the live form's implementation, not a GovSchema modelling concern —
   documented here in case a future re-verification session hits the same
   symptom and wastes time suspecting the wrong cause.
4. Deliberately entered a malformed date (`"0"`, an artifact of an earlier,
   too-fast typing attempt) to confirm the live client-side validation
   message: **"Ungültiges Datumsformat. Benutzen Sie das Format
   dd.MM.yyyy."** — directly confirming the required date-entry format
   named in the field's own label.
5. Advanced past the enabled "Weiter" button once all four Seite-1 fields
   validated, reaching Seite 2 of 2, and enumerated its fields the same way.
6. Typed a non-numeric test value (`ABCDE`) into the PLZ field and found
   **no live inline validation error** appears (unlike the date field) —
   recorded honestly in the `postalCode` field's own `description` rather
   than implied to be an independently-observed rule.
7. Confirmed the "Absenden" submit button stays **disabled** until every
   required field on both pages is filled *and* the privacy-consent
   checkbox is ticked.

## Field inventory (exact match, both pages)

| Field | Live label | Input id | Required | Notes |
|---|---|---|---|---|
| `lastName` | Name | `Nachnameneingabe` | yes | |
| `firstName` | Vorname | `Vornameneingabe` | yes | |
| `dateOfBirth` | Geburtsdatum (Eingabeformat: tt.mm.jjjj) | `Geburtsdatumseingabe` | yes | live-validated dd.MM.yyyy format |
| `placeOfBirth` | Geburtsort | `Geburtsorteingabe` | yes | |
| `street` | Straße | `Strasseneingabe` | yes | |
| `houseNumber` | Hausnummer | `Hausnummereingabe` | yes | |
| `postalCode` | PLZ | `PLZ_Eingabe` | yes | no live format check observed |
| `city` | Ort | `Orteingabe` | yes | |
| `privacyConsent` | Ich stimme den Datenschutzbestimmungen zu. | `Einverstandeneingabe` | yes (checkbox) | gates the submit button |

No field beyond these nine was found on either page. There is no file-upload
control, no payment step, and no additional branching — this is a genuinely
flat two-step form, which is why this schema carries no `documents[]` member.

## What was not done — the one honest gap

Per this cycle's "complete a test run with valid example mock data"
instruction, the walkthrough above **filled every field on both pages with
fabricated mock data and reached the final review screen with the submit
button enabled**, but **did not click "Absenden."** Actually submitting would
dispatch a real request, with fabricated identity and address data, into a
live federal government system — a real-world side effect (at minimum,
wasted processing capacity and support-desk handling of nonsense data; at
worst, something indistinguishable from a false report against BZSt's
systems). That is out of bounds for a research/authoring exercise and is
consistent with this registry's standing practice of never submitting a live
government form with test data (see e.g. `us/dos/passport-renewal-ds82`,
`sg/iras/individual-income-tax-return-formb1`, and every other schema in this
registry). This is the one instruction in the cycle brief not carried out to
the letter, called out here rather than silently glossed over.

Because every field's label, type, requiredness, and the two-step ordering
were independently confirmed by direct interaction with the live form itself
(`manual-source-review-v1` Procedure steps 1–4 in full), `status: verified`
is asserted despite this one gap — the practice's bar is a field-by-field
comparison against the live source, not a completed submission.

## Modelling decisions

- **Retrieval/re-issuance, not first-time assignment.** The IdNr is always
  issued automatically after a residence registration; nothing in this
  registry models that automatic first assignment as an applicant-driven
  process, because it is not one. This schema models only the "I have lost,
  forgotten, or never received my IdNr, mail it to me again" request BZSt
  itself names as the counterpart self-service action.
- **No delivery-address alternative.** The general info page states
  explicitly, and the form's own instructions confirm, that the IdNr can
  only be posted to the applicant's current Meldeanschrift; sending it to a
  different address requires a written power of attorney by letter (a
  distinct, non-self-service procedure) and is out of scope here. No
  "delivery address" field exists in this schema for that reason — the
  street/house-number/PLZ/Ort fields collected are the applicant's own
  current registered address, used by BZSt to corroborate the request
  against its own records, not chosen freely by the applicant as a mailing
  destination.
- **`postalCode` pattern is a registry convention, not an independently
  confirmed live rule.** See the field-inventory table above and the field's
  own `description`.
- **No `documents[]` member.** The live form has no file upload, no fee, and
  no attestation beyond the privacy-consent checkbox (itself modelled as
  the `privacyConsent` field, not a document, since it is a simple boolean
  gate with no accompanying instrument to name).

## Out of scope

- **First-time IdNr assignment** — automatic, not applicant-initiated; no
  self-service form exists for it.
- **Requesting a non-cohabiting minor child's IdNr** — a distinct, written
  (non-online) procedure using a separate PDF questionnaire, per the general
  info page.
- **BZSt Online Portal (BOP) channel** — the info page states the same
  re-issuance service is also available authenticated on BOP; this schema
  models the public, unauthenticated "Erneute Mitteilung der IdNr" input
  form specifically, since it is reachable and verifiable without a BOP
  account.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check both the general info page and the live form on or before
that date, and on any change to `source.url`.
