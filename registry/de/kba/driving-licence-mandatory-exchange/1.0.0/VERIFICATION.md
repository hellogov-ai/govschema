# Verification record — `de/kba/driving-licence-mandatory-exchange` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

Authored from one representative local authority's live, fillable form, plus
the federal legal text governing the process nationwide. A second Land's
form was spot-checked for field-set consistency (not structurally extracted).
Because the process is executed by several hundred independent
Fahrerlaubnisbehörden rather than one national portal, the practice's
field-by-field comparison has not been completed against every local variant
— status remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `de/kba/driving-licence-mandatory-exchange` /
  `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Kraftfahrt-Bundesamt (KBA), which maintains the federal
  Fahrerlaubnisregister (central driving-licence register), under the
  Fahrerlaubnis-Verordnung (FeV). The exchange itself is filed with, and
  processed by, the applicant's local Fahrerlaubnisbehörde (Straßenverkehrsamt
  of a Landkreis or kreisfreie Stadt) — there is no single national online
  portal for this process, unlike e.g. Elster (tax) or the federal
  `verwaltung.bund.de` first-issuance flow.
- **Legal basis (fetched live, 2026-07-03, HTTP 200, gesetze-im-internet.de —
  the official federal law portal):**
  - <https://www.gesetze-im-internet.de/fev_2010/anlage_8e.html> — Anlage 8e
    FeV, implementing § 24a Abs. 2 Satz 1 FeV. Quotes verbatim the two
    exchange-deadline tables: Table I, licences issued through 31 December
    1998, keyed by the holder's birth year (before 1953 → 19 January 2033;
    1953–1958 → 19 July 2022; 1959–1964 → 19 January 2023; 1965–1970 → 19
    January 2024; 1971 or later → 19 January 2025); Table II, licences issued
    from 1 January 1999 onward, keyed by issue year (1999–2001 → 19 January
    2026, stepping forward roughly one year per issue-year band, through
    2012–18 January 2013 → 19 January 2033). Holders born before 1953 must
    exchange by 19 January 2033 regardless of issue year.
  - <https://www.gesetze-im-internet.de/fev_2010/__76.html> — § 76 FeV
    (Übergangsrecht), Nummer 9 and 10: the class-conversion rules for
    pre-1999 old-law classes (e.g. old Class 3 converting to unrestricted
    C1E, plus the age-50-limited CE/CE79 extended towing-combination option
    and the Class T agricultural/forestry option this schema models as
    `requestsExtendedTowingCombination`/`requestsClassT`), and the medical/eye
    examination validity transitional rules (Anlage 5, Anlage 6 FeV).
- **Process guidance (fetched live, 2026-07-03):**
  - <https://www.bundesregierung.de/breg-de/aktuelles/faq-fuehrerschein-umtausch-1842574>
    — federal government FAQ confirming who must exchange, the deadline
    structure, required documents (ID, biometric photo, current licence),
    approximate 25 EUR fee, the new card's 15-year document validity, and the
    (waivable) 10 EUR fine for missing a deadline.
  - <https://www.adac.de/verkehr/rund-um-den-fuehrerschein/aktuelles/fristen-fuehrerschein-umtausch/>
    — ADAC's consumer-facing deadline table and process summary, confirming
    the exchange happens "without examination or health evaluation" for a
    plain conversion and independently corroborating the Anlage 8e tables.
- **Primary form source:** Landkreis Ludwigsburg (Baden-Württemberg) —
  "Antrag auf Umstellung einer Fahrerlaubnis alten Rechts in einen neuen
  EU-Kartenführerschein" (2018 edition, marked "ausfüllbar"/fillable),
  retrieved directly from `landkreis-ludwigsburg.de`, a `*.de` municipal
  government domain. Two pages, a genuine fillable AcroForm (37 named
  widgets on page 1, 11 on page 2), extracted with `pdfjs-dist`'s
  `getAnnotations()`/`getTextContent()` per this registry's established
  gov-form-PDF-extraction technique.
- **Cross-check source (spot-checked, not structurally extracted):**
  Kreis Rendsburg-Eckernförde (Schleswig-Holstein) — "Antrag auf Umstellung
  der Fahrerlaubnis", Stand 01.01.2025, retrieved from
  `kreis-rendsburg-eckernfoerde.de`. This form has no AcroForm widgets (its
  text is extractable but not fillable), so it was read via
  `getTextContent()` only, as a field-set consistency check rather than a
  second primary extraction. It independently confirms the same core field
  set (Familienname, Vornamen, Geburtsname falls abweichend, Geburtsdatum,
  Geburtsort, postal code and home town, street and house number, phone,
  current licence class(es)/issue date/issuing Fahrerlaubnisbehörde, the
  same CE79 extended-towing-combination and Class T options gated by age 50
  and Anlage 5/6 medical certificates, and the same required-documents list
  — while pricing its own fee schedule differently (32.00 EUR for a plain
  exchange with direct mailing, 76.10 EUR for one that also extends the C/CE
  classes past age 50), confirming the fee is set per-Land/Landkreis rather
  than nationally fixed, as this schema's `exchangeFee` document already
  notes from the Ludwigsburg/national-guidance discrepancy (24 EUR vs ~25
  EUR) alone.
- **What the extracted Ludwigsburg text/widgets show, verbatim structure:**
  - Page 1: personal-details header (Name, Geburtsname bei Abweichung,
    Vornamen, Geschlecht w/m, Geburtsdatum, Geburtsort, Straße, PLZ/Ort, Tel.,
    Email-Adresse); current-licence block (ausstellende Behörde,
    Ausstellungsdatum, Führerscheinnummer); a 20-option Fahrerlaubnis-Klasse
    checklist (1, 1a, 1b, 2, 3, 4, 5, A1, A, B, BE, C1, C1E, C, CE, D1, D1E,
    D, DE, M, L, S, T); and a collection/return-method choice (old licence
    invalidated and new one mailed home — available only for licences issued
    by 31 December 1998 — vs. new licence collected in person at a named
    Fahrerlaubnisbehörde branch office).
  - Page 2: the Class-3-specific upgrade block — the extended >12t–18.5t
    towing combination (with the age-50 medical/vision-certificate
    extension), the Class T agricultural/forestry option (with its own
    irreversibility warning once the base conversion is completed), the fee
    (24.00 EUR quoted here), the required-attachments checklist (ID/birth
    record, biometric photo, medical certificate, vision certificate,
    agricultural-activity proof, Karteikartenabschrift), and a signature/date
    line.
- **Interpretation calls:**
  - `currentLicenceCategories` is modelled as a single delimited string, not
    a repeating/array value, for the same reason as this registry's other
    checklist-style category fields (e.g. `fr/ants/driving-licence-renewal-duplicate`):
    GovSchema v0.3 has no native multi-select field type (GSP-0009 not yet
    folded into the accepted spec).
  - The Anlage 8e FeV deadline tables (by birth year / by issue year) are
    documented in `dateOfBirth`'s and `currentLicenceIssueDate`'s
    descriptions and in this file, but are not enforced as a computed
    `requiredWhen`/validation rule: the condition grammar (GSP-0013 §1)
    compares a field against a literal or another field via
    `equals`/`in`/`greaterThan`-family operators, not against a
    table-lookup or date-arithmetic function of two fields. Flagged as an
    out-of-scope derived computation, not a silently-asserted rule.
  - `isPre1999Class3Holder` and its two gated fields
    (`requestsExtendedTowingCombination`, `requestsClassT`) are modelled as
    three separate booleans rather than deriving eligibility by parsing
    `currentLicenceCategories` for a "3" token, for the same reason the
    sibling `fr/ants/driving-licence-renewal-duplicate` schema asks
    `involvesHeavyVehicleCategory` directly instead of parsing its own
    delimited category string.
  - `sex`'s enum is modelled `["W", "M"]` (uppercase), matching this
    registry's existing convention on sibling DE schemas' single-letter
    enums, rather than the form's own lowercase "w/m" checkbox labels.
  - The office-reserved "Von der Fahrerlaubnisbehörde auszufüllen" block
    (Rendsburg-Eckernförde form) and the Ludwigsburg form's unlabeled
    generic checkbox pair for sex are administration-side or ambiguous
    widgets, not modelled as applicant-facing fields.

## Test run (mock data)

A mock scenario — an applicant exchanging a pre-1999 Class 3 licence issued
in 1991, who has already turned 50 and wants to keep the extended towing
combination but does not request Class T, with the current licence's
original issuing authority still being their present Fahrerlaubnisbehörde —
was run against this schema version's `required`/`requiredWhen`/`visibleWhen`
gating logic with a standalone validator script (not committed — ad hoc,
mirrors the checks `tools/validate.mjs` and `tools/validate-ajv.mjs` already
run structurally) before publishing. Committed as this version's
`conformance/.../application-packet.json` fixture:

1. With `isPre1999Class3Holder: true` and `requestsExtendedTowingCombination:
   true` — confirms `medicalCertificate` and `visionTestCertificate` are
   correctly required, `requestsClassT` is correctly still asked (and
   answered `false`) rather than skipped, and `agriculturalActivityProof` is
   correctly **not** required.
2. With `issuingAuthorityRecordsUnavailable: false` — confirms `recordExtract`
   is correctly **not** required.
3. A second pass with `isPre1999Class3Holder: false` (not committed as a
   fixture, this registry's convention is a single `application-packet.json`
   per schema version) confirmed all three Class-3-specific fields
   (`requestsExtendedTowingCombination`, `requestsClassT`, and their gated
   documents) correctly become not-required and not-visible.

Both `tools/validate.mjs` (structural) and `tools/validate-ajv.mjs`
(full JSON Schema 2020-12 meta-schema, ajv) pass for this document.

## Scope

Out of scope for this version: computing the applicable Anlage 8e FeV
exchange deadline from `dateOfBirth`/`currentLicenceIssueDate` (documented,
not enforced, see above); any local Fahrerlaubnisbehörde's own online
submission portal or appointment-booking flow (this schema models the
underlying paper/PDF field set common across offices, not a specific
office's screen-by-screen flow); and the separate, materially different
process for exchanging a foreign (non-German, non-EU/EWR) driving licence,
which falls under § 30/§ 31 FeV rather than Anlage 8e and is not modelled
here.
