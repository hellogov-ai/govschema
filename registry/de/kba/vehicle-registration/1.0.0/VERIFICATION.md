# Verification record — `de/kba/vehicle-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from the federal Ministry of Transport's (BMV)
official i-Kfz article and cross-checked against the Kraftfahrt-Bundesamt's
(KBA) own i-Kfz page. It remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `de/kba/vehicle-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kraftfahrt-Bundesamt (KBA) sets the federal framework
  (StVZO); each Bundesland/Kommunalverwaltung's local Zulassungsbehörde
  (registration authority) actually operates the i-Kfz portal and processes
  the transaction.
- **Primary source:** "Internetbasierte Fahrzeugzulassung: So funktioniert
  'i-Kfz'" —
  <https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/internetbasierte-fahrzeugzulassung.html>
  — fetched live as **raw HTML** (not a summarized fetch) and tag-stripped
  for direct quotation, 2026-07-02. This is the richest available source:
  it gives a numbered "Schritt für Schritt: So funktioniert's" walkthrough
  and a "Was brauche ich dafür?" (what do I need) checklist for each of the
  five i-Kfz process types (Anmeldung, Wiederzulassung, Umschreibung,
  Abmeldung, Tageszulassung), including the exact application-mask data
  points collected at each step.
- **Secondary source (corroboration):** the Kraftfahrt-Bundesamt's own i-Kfz
  page —
  <https://www.kba.de/DE/Themen/ZentraleRegister/Digitale_Fahrzeugzulassung/iKfz/ikfz_node.html>
  — also fetched as raw HTML, 2026-07-02. Independently confirms the
  identification methods (BundID/Online-Ausweisfunktion, MeinUK/Unternehmenskonto
  BUND), the document set (HU, SP, eVB-Nummer, ZB I/ZB II security codes,
  IBAN), the "Erfüllen Sie die Voraussetzungen?" eligibility preconditions
  (document-issuance-date cutoffs, an existing Kennzeichen, printer access),
  and — importantly — that i-Kfz availability is **per-Zulassungsbehörde**,
  not a single national portal: the KBA page embeds a live participation
  table ("Nutzt Ihre Zulassungsbehörde i-Kfz") listing hundreds of individual
  authorities with an "x" mark for those that have adopted it, confirming
  `authorityOffersIKfz` is a genuine, sourced eligibility gate rather than an
  inferred one.
- **Domain note:** `i-kfz.de` (the plausible-looking dedicated domain) now
  returns **HTTP 410 Gone** — confirmed by direct fetch, not assumed. It is
  not used as a source. `kba.de` required `curl -k` (TLS verification
  skipped) to fetch in this sandbox; the certificate issue did not reproduce
  via the WebFetch tool, and the raw-HTML content matched between both
  fetch paths.
- **Field extraction method:** prose guidance pages with a numbered
  step-by-step walkthrough, not a fillable form/PDF — i-Kfz has no
  downloadable form; all data is typed directly into each local authority's
  own "Antragsmaske" (application mask) web form. Field names and enum
  values are derived from the two pages' own wording, quoted in each
  field's `sourceRef`, the same method used for
  `ca/on/mto/drivers-licence-renewal` and `sg/acra/sole-proprietorship-registration`.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Die Umsetzung der Online-Fahrzeugzulassung obliegt ... den Bundesländern und Kommunalverwaltungen"; KBA i-Kfz Dashboard participation table | `authorityOffersIKfz` |
| "Sie brauchen eine Möglichkeit zum Drucken."; "Drucker zum Ausdrucken des vorläufigen Zulassungsnachweises" | `hasPrinterAccess` |
| "Natürliche Personen benötigen einen Personalausweis mit Online-Ausweisfunktion ... Alternativ kann die BundID mit ELSTER-Zertifikat ... Juristische Personen benötigen das Unternehmenskonto BUND mit ELSTER-Zertifikat." | `identificationMethod` |
| "Kfz-Kennzeichen und ggf. Fahrzeug-Identifikationsnummer (FIN)" | `vehicleIdentificationNumber` |
| "Was möchten Sie beantragen? Neuzulassung ... Wiederzulassung ..." (KBA); five online Zulassungsvorgänge listed (BMV) | `registrationType` |
| "Zum Kennzeichen: Nächstes freies Kennzeichen auswählen, Wunschkennzeichen oder reserviertes Kennzeichen angeben." | `licensePlatePreference` |
| "Zulassungsdokument Teil II (ehemals Fahrzeugbrief) mit Sicherheitscode. Die letzte Anmeldung ... darf nicht länger als 01.01.2018 zurückliegen..." | `zbIISecurityCode` |
| "Bei Wiederzulassung muss das Fahrzeug zusätzlich vorher außer Betrieb gesetzt worden sein." | `vehicleDeregisteredPreviously` |
| "Entwertetes Zulassungsdokument Teil I ... mit freigelegtem Sicherheitscode, welches bei der Abmeldung des Wagens verwendet wurde. Die letzte Anmeldung ... darf nicht länger als 01.01.2015 zurückliegen..." | `zbISecurityCode` |
| "gültige Hauptuntersuchung (HU) und ggf. Sicherheitsprüfung (SP)"; "Datum einer gültigen Hauptuntersuchung (HU)" | `mainInspectionValidUntil` |
| "je nach Fahrzeugtyp Datum einer gültigen Sicherheitsprüfung (SP)" | `safetyInspectionValidUntil` |
| "gültige elektronische Versicherungsbestätigung (eVB-Nummer)"; "eVB-Nummer der Versicherung zum Nachweis der Kfz-Haftpflichtversicherung" | `evbNumber` |
| "Bankverbindung (IBAN)/SEPA-Mandat für den Einzug der Kfz-Steuer der Halterin oder des Halters" | `ibanForVehicleTax` |
| "Eingaben und Antragstellung bestätigen." | `confirmApplicationAccurate` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **Scope narrowed to two of the five i-Kfz process types.** i-Kfz supports
  Anmeldung (new registration), Wiederzulassung (re-registration),
  Umschreibung mit/ohne Halterwechsel (ownership/location transfer),
  Abmeldung (deregistration), and Tageszulassung (single-day registration).
  This v1.0.0 models only **new registration** and **re-registration to the
  same owner** ("Wiederzulassung ... auf sich selbst") — the two flows the
  BMV source documents with a full step-by-step field list. Umschreibung,
  Abmeldung, and Tageszulassung each have their own document/eligibility
  shape (e.g. Abmeldung needs no identification at all, per the KBA page:
  "Die Abmeldung von Fahrzeugen funktioniert ohne Identifikation, HU und
  SP-Nachweis") and are deliberately out of scope, the same kind of
  scope line drawn around `sg/spf/driving-licence-application`'s
  `renewal_foreigner_photocard` (which excluded a citizen/PR renewal path
  the source itself doesn't document). A future revision should add each
  remaining process type as its own `registrationType` branch rather than
  guessing its field shape from this schema's pattern.
- **Re-registration further narrowed to same-owner only.** The
  Wiederzulassung section itself contains a "Hinweis bei Halterwechsel"
  (note for an ownership change) requiring an additional ZB II security
  code — that variant is out of scope here; `vehicleDeregisteredPreviously`
  and `zbISecurityCode` model only the "auf sich selbst" (to oneself) case
  named in the source's own section title.
- **`safetyInspectionValidUntil` has no sourced vehicle-type rule.** The
  source states the SP requirement applies only "je nach Fahrzeugtyp"
  (depending on vehicle type) without naming which classes (SP typically
  applies to certain trucks/buses in the wider Kfz-Zulassung system, but
  that specific mapping is not stated on either page fetched here).
  Modelled as an optional field rather than a `requiredWhen` gate keyed to
  a vehicle-class value this schema doesn't otherwise collect — the same
  discipline as `isApplyingForMotorcycleClass` in
  `sg/spf/driving-licence-application`, which asked a fact directly rather
  than hard-coding an unsourced mapping into a `Condition`.
- **Provisional-registration validity window: conflicting source figures,
  not resolved by picking one.** The BMV page states the provisional proof
  of registration is valid for **"10 Tage"** (10 days) in both the
  Anmeldung and Wiederzulassung walkthroughs; the KBA page states **"maximal
  14 Tage"** (max. 14 days) in its own step-by-step summary. This is
  informational/output text, not an applicant-supplied field, so it is not
  encoded as schema data — but it is flagged here rather than silently
  averaged or picked, since a future revision (or any agent narrating this
  process to a user) should not assert either figure as authoritative
  without checking the live portal or a dated official FAQ.
- **`vehicleIdentificationNumber` length assumption.** Modelled with
  `minLength`/`maxLength` of 17, the standard ISO 3779 VIN/FIN length used
  worldwide (including in every other vehicle schema in this registry, e.g.
  `us/ca/dmv/vehicle-registration-renewal`) — not a figure directly quoted
  from either i-Kfz source, which only says "ggf. Fahrzeug-Identifikationsnummer
  (FIN)" without stating a length. Flagged as a reasonable inference by
  analogy, not an equally well-sourced figure as the rest of the schema.
- **No live i-Kfz portal instance was tested.** i-Kfz has no single national
  portal — it is a specification each Zulassungsbehörde implements on its
  own domain (e.g. Berlin's, Munich's, or any of the hundreds listed on the
  KBA's participation dashboard), each requiring BundID/eID or
  ELSTER-certificate authentication to reach the actual application mask.
  No mock BundID/eID credential is available in this environment, so the
  live "Antragsmaske" screens themselves were not directly observed; fields
  are reconstructed entirely from the BMV/KBA guidance prose, the same
  constraint recorded for `gb/homeoffice/eta-application`,
  `us/cbp/esta-application`, and `gb/ukvi/standard-visitor-visa` (each an
  authenticated online application whose live form could not be reached
  pre-login). A worked walkthrough with representative mock values is given
  below in place of a live test run.

## Worked example (mock data, not a live submission)

**Scenario:** an individual re-registering ("Wiederzulassung auf sich
selbst") a vehicle they deregistered several months earlier, using the same
license plate, at a Zulassungsbehörde that offers i-Kfz.

| Field | Mock value |
|---|---|
| `authorityOffersIKfz` | `true` |
| `hasPrinterAccess` | `true` |
| `identificationMethod` | `personalausweis_eid` |
| `vehicleIdentificationNumber` | `WVWZZZ1KZAW123456` |
| `registrationType` | `re_registration` |
| `vehicleDeregisteredPreviously` | `true` |
| `zbISecurityCode` | `A1B2C3D4E5` (fictional 10-character code) |
| `mainInspectionValidUntil` | `2027-11-30` |
| `safetyInspectionValidUntil` | *(omitted — vehicle type not subject to SP)* |
| `evbNumber` | `1234567` (fictional 7-digit eVB number) |
| `ibanForVehicleTax` | `DE89370400440532013000` (IBAN check-digit-valid test IBAN, not a real account) |
| `confirmApplicationAccurate` | `true` |

Walking this data through the modelled `steps[]` exits cleanly at
`payment_and_confirmation` with no eligibility-gate exit triggered,
confirming the branching logic (`eligibility_and_service_selection` →
`re_registration_eligibility` → `re_registration_details` →
`payment_and_confirmation`) is internally consistent. This is a
self-consistency check of the schema's own transitions, not a substitute
for driving the live, authenticated portal — see the honesty flag above.

## Path to `verified`

1. Drive a real Zulassungsbehörde's live i-Kfz "Antragsmaske" (post-BundID/eID
   login) for both the Anmeldung and Wiederzulassung flows to confirm the
   exact field set and replace the prose-derived field list with a directly
   observed one.
2. Resolve the 10-day vs. 14-day provisional-registration-validity
   discrepancy against a live portal or a dated official FAQ before citing
   either figure with confidence.
3. Source the specific vehicle classes subject to Sicherheitsprüfung (SP) so
   `safetyInspectionValidUntil` can become a sourced `requiredWhen` gate
   instead of an unconditionally optional field.
4. Add Umschreibung (transfer), Abmeldung (deregistration), and
   Tageszulassung (day registration) as additional `registrationType`
   branches in a future minor version, each sourced from its own
   "Was brauche ich dafür?" section on the BMV page.
