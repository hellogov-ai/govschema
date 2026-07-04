# Verification record — `de/bundeswahlleiterin/voter-registration-abroad` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the fillable **Anlage 2** PDF form
(`bwo_anlage-2_ausfuellbar.pdf`, published on `bundeswahlleiterin.de`), fetched
over plain HTTPS with no bot-block encountered, using `pdfjs-dist`'s
`getFieldObjects()` API to recover the PDF's own AcroForm field names, types,
and checkbox/radio export values, cross-checked against the PDF's own rendered
text layer (form page 1, plus the Merkblatt/explanatory notes on pages 3-4).
Status remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `de/bundeswahlleiterin/voter-registration-abroad` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** the Gemeindebehörde (municipal authority) of the applicant's
  last registered German address processes and decides the application; the
  form itself, and the underlying Bundeswahlordnung (Federal Elections
  Regulation) it implements, are published nationally by the Bundeswahlleiterin
  (Federal Returning Officer) under the Bundeswahlgesetz (Federal Elections
  Act).
- **Primary source:** `https://www.bundeswahlleiterin.de/dam/jcr/dc589523-d709-4c43-adbc-9342dda468ad/bwo_anlage-2_ausfuellbar.pdf`
  — "Anlage 2 (zu § 18 Absatz 4) Antrag auf Eintragung in das Wählerverzeichnis
  und Wahlscheinantrag für im Ausland lebende Deutsche (§ 12 Abs. 2 S. 1 Nr. 1
  des Bundeswahlgesetzes)". Retrieved directly, HTTP 200, 4 pages (form page 1,
  official-use-only reverse-side page 2, Merkblatt explanatory notes pages 3-4).
- **Sibling source examined for scope (not used for field content):**
  `https://www.bundeswahlleiterin.de/dam/jcr/47a30ab4-2cf1-46f7-9958-443be9dd2446/bwo_anlage-1_ausfuellbar.pdf`
  ("Anlage 1 (zu § 18 Absatz 6) ... für Rückkehrer aus dem Ausland") —
  confirmed this is a **different** process (a returnee re-entering Germany
  and registering a new domestic address between the 42nd and 21st day before
  an election), not modelled by this document; see "Explicitly out of scope"
  below.
- **Secondary sources (fetched directly, HTTP 200, used for scoping/context
  only):**
  - `https://www.bundeswahlleiterin.de/en/bundestagswahlen/2025/informationen-waehler/deutsche-im-ausland.html`
    — the Bundeswahlleiterin's own English-language "Germans abroad" guidance,
    confirming the 25-year/3-month eligibility rule, the 21-days-before-election
    filing deadline, and that Anlage 2 (this document) is the standard-case form
    while Anlage 2a covers applicants relying on the narrower "political
    familiarity" clause instead.
  - `https://www.bundestag.de/parlament/bundestagswahl/auslandsdeutsche-213246`
    — Bundestag's own explainer, corroborating the same eligibility and
    submission-channel rules (personally and handwritten signed; may be
    transmitted by post, fax, email, or other documentable electronic means).
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `lastName`, `birthName`, `givenNames`, `lastNameAtGermanRegistration`, `formerLastNameAtGermanRegistration`, `dateOfBirth`, `email` | **Directly observed** — the PDF's own AcroForm field names (`Familienname`, `Geburtsname`, `Vornamen`, radio `FamiliennameBRD` with export values `unverändert`/`verändert`, `FamiliennameDamalsBRD`, `Geburtsdatum`, `EMail`) and adjacent rendered labels, read via `pdfjs-dist getFieldObjects()` plus the text layer. |
| `currentAddressAbroad` | **Directly observed** — PDF fields `DerzeitigeWohnungZeile1`/`DerzeitigeWohnungZeile2` under the label "Meine derzeitige Wohnung (vollständige Wohnanschrift im Ausland)"; modelled as one multi-line free-text field per this registry's existing address-block convention (e.g. `nl/denhaag/voter-registration-abroad`'s `residentialAddress`). |
| `lastGermanAddressFrom`/`To`/`lastGermanAddress`, `priorGermanAddressFrom`/`To`/`priorGermanAddress` | **Directly observed** — PDF fields `GemeldetBRDVomZeile1`/`GemeldetBRDBisZeile1`/`GemeldetBRDAnschriftZeile1` (row 1) and `GemeldetBRDVomZeile2`/`GemeldetBRDBisZeile2`/`GemeldetBRDAnschriftZeile2` (row 2), corroborated by the Merkblatt's own explanation (Randnummer 4) that a second address row is completed only when the qualifying three-month period spans more than one registered German address. |
| `dateOfDeparture`, `countryMovedTo` | **Directly observed** — PDF fields `DatumAbmeldung`, `FortzugStaat` under "und bin fortgezogen am (Datum der Abmeldung) nach (Ort, Staat)". |
| `identityDocumentType`, `identityDocumentNumber`, `identityDocumentIssueDate`, `identityDocumentIssuingAuthority` | **Directly observed** — PDF radio `BesitzPassart` (export values `Personalausweis`/`Reisepass`) and fields `Ausweisnummer`, `DatumPassAusstellung`, `AusstellendeBehoerde`. |
| `priorGermanResidenceDeclaration`, `germanNationalityDeclaration`, `notExcludedFromVotingRights`, `noOtherApplicationFiled` | **Directly observed** — PDF checkboxes `WahlrechtsvoraussetzungAusland`, `DeutscherGG`, `Wahlrechtsausschluss`, `NurEinAntrag`, each with export value `Ja` and adjacent declaration text under the form's own "Ich versichere gegenüber der Gemeindebehörde:" heading. Modelled as `required: true` + `fieldRole: eligibility` (no `eligibleValues`), the same lighter pattern this registry already uses for `ie/electoral-commission/voter-registration`'s `declarationTruthfulComplete` — the field's `required: true` already carries the "must be affirmed" constraint, so a separate `eligibleValues: [true]` would be redundant (unlike a field that can take several values where only some continue the pathway). |
| `votingAgeStatus` | **Directly observed** — PDF radio `AlterWahlberechtigung`, export values `bereits vollendet` (already turned 18) / `zum Wahltag vollendet` (will turn 18 by election day); both keep the applicant eligible, so modelled as a plain required `enum`, not an eligibility-role field. |
| `ballotDeliveryAddressChoice`, `ballotDeliveryAddress` | **Directly observed** — PDF radio `VersandAnschrift` (export values `derzeitige Anschrift`/`abweichende Anschrift`) and fields `VersandAnschriftZeile1`/`VersandAnschriftZeile2`. The `requiredWhen: { field: ballotDeliveryAddressChoice, equals: "different_address" }` condition is safe against this registry's known absent-field misfire class (GOV-763, GOV-1045) because it compares an always-submitted enum radio field with `equals` against one of its own two possible values, not `notEquals`/`equals: false` against a field that may simply be absent. |
| `declarationDate` | **Directly observed** — PDF field `AntragDatum` under "Datum, Unterschrift des Antragstellers/der Antragstellerin"; the Merkblatt (Randnummer 12) confirms a personally handwritten signature is required even though transmission of the signed document by email/fax/other electronic means is accepted. |

## Test run with mock data

A mock application packet was assembled at
`conformance/de/bundeswahlleiterin/voter-registration-abroad/1.0.0/application-packet.json`
for a German national resident in Barcelona, Spain, last registered at a
German address in Munich until 2022, requesting the postal ballot be sent to
her current Spanish address — fabricated name/address/document details, not a
real person. This packet was checked with a standalone script
re-implementing the schema's own `required`/`requiredWhen`/`validation`
evaluation (the GSP-0013 condition grammar `all`/`any`/`not`/leaf-compare,
the same technique used for the last several registration/renewal cycles):
28 fields evaluated, 0 violations. Two negative-branch checks additionally
confirmed both `requiredWhen` conditions correctly flip when their trigger
field's value changes:

- `formerLastNameAtGermanRegistration` correctly evaluates to *not required*
  when `lastNameAtGermanRegistration = "unchanged"` and to *required* when
  `lastNameAtGermanRegistration = "different_at_the_time"`.
- `ballotDeliveryAddress` correctly evaluates to *not required* when
  `ballotDeliveryAddressChoice = "current_address_abroad"` and to *required*
  when `ballotDeliveryAddressChoice = "different_address"`.

Both `tools/validate.mjs` (structural/registry-path validator) and
`tools/validate-ajv.mjs` (meta-schema validator, ajv 2020-12) pass against
this document.

## Explicitly out of scope for v1.0.0

- **Anlage 1 (zu § 18 Absatz 6 Bundeswahlordnung), "für Rückkehrer aus dem
  Ausland".** A structurally distinct process for a German returning to live
  in Germany who registers a new domestic address between the 42nd and 21st
  day before an election; confirmed by direct comparison of its own PDF
  against Anlage 2's, not modelled here.
- **Anlage 2a (zu § 18 Absatz 5 Bundeswahlordnung).** The narrower pathway for
  applicants who do not meet the `priorGermanResidenceDeclaration` condition
  but have instead acquired "persönliche und unmittelbare Vertrautheit mit den
  politischen Verhältnissen in der Bundesrepublik Deutschland" (personal and
  direct familiarity with German political conditions) — named directly by
  Anlage 2's own text but its separate form was not fetched or modelled this
  cycle.
- **The assistance-person (Hilfsperson) accommodation** for applicants unable
  to read, write, or sign the application themselves — present on both Anlage
  1 and Anlage 2 as a secondary signature block, analogous to
  `ie/electoral-commission/voter-registration`'s `witnessType`/`witnessFullName`
  fields, but not modelled here; a future version could add it following that
  precedent.
- **The postal-ballot documents and postal-voting mechanics themselves** once
  issued — a separate, later-in-time transaction from this one-time
  registration/ballot-request application.
- **Any subnational European Parliament or Land-election variant** of this
  process — this document models the Bundestag (federal) election pathway
  only, per the form's own title and § 12 Abs. 2 S. 1 Nr. 1 Bundeswahlgesetz
  citation.
- **The official-use-only reverse side (page 2)** of the form, completed by
  the Gemeindebehörde itself, not the applicant — out of scope by definition
  (this document models applicant-supplied data only).

## Scope and jurisdiction notes

This corrects a mis-classification recorded in two earlier
"GovSchema Standard Research" cycles: `ie/electoral-commission/voter-registration`'s
own VERIFICATION.md (GOV-1043) and `nl/denhaag/voter-registration-abroad`'s
own VERIFICATION.md (GOV-1121) both stated that "Germany ... confirmed
non-gap: ... auto-enrol[s] with no separate citizen-initiated process." That
claim is correct only for German nationals *resident in Germany*, whose
enrollment is populated automatically from the municipal residence register
(already modelled by `de/bmi/residence-registration`) — it did not account for
German nationals living *abroad* and not registered at any German address,
who are excluded from that automatic process and must file a citizen-initiated
application, exactly the same structural gap this registry already closed for
Ireland, New Zealand, France, the United States, and the Netherlands (the
Netherlands' own equivalent, `nl/denhaag/voter-registration-abroad`, is the
closest structural sibling to this document). This document closes that gap,
directly against GOV-1150's own "remaining voter registration" instruction
note, and should be treated as superseding the "Germany ... confirmed
non-gap" language in the two VERIFICATION.md records above. National-level
voter-registration coverage (domestic-plus-abroad, or an abroad-only process
where domestic is genuinely automatic) now spans 10 of this registry's 11
core jurisdictions; Singapore remains the sole confirmed non-gap (NRIC-based
automatic civic enrolment, confirmed during GOV-1075).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live PDF (re-fetching in case
the Bundeswahlleiterin has re-issued the form ahead of the next Bundestag
election), confirms no discrepancy, and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/`nextReviewBy`.
A reviewer with independent access to a completed real-world submission would
further strengthen this by confirming the deadline text and Merkblatt
citations against the edition current at that time — the Bundeswahlleiterin
re-publishes fresh copies of Anlage 1/Anlage 2 ahead of each federal election
and past editions have carried a fixed deadline date printed on page 1 (e.g.
"Antragseingang bei der Gemeindebehörde bis 02.02.2025" for the 2025
election); this document deliberately does not encode that election-specific
date as a field or constraint, describing the underlying 21-day rule instead.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date, on any `source.url`
change, and ahead of any German federal election (the Bundeswahlleiterin may
re-issue the form with a new edition mark or updated deadline framing).
