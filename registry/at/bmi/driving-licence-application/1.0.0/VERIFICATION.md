# Verification record — `at/bmi/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

This is a `GovSchema Standard Research` cycle (**GOV-4100**), closing
Austria's DMV vertical — the jurisdiction's only remaining open vertical
after a prior cycle (GOV-4094) closed National ID. Austria now has all 6
GovSchema verticals modelled.

## Why this candidate

Austria was a single-vertical-gap jurisdiction (5/6, missing only DMV), and
this exact candidate had already been scouted and banked as ready-to-author
backlog by the prior GOV-4092 cycle (alongside a Netherlands Visa candidate,
left open — see CATALOG.md's Known Gaps section). Re-confirmed this cycle:
`registry/at/*` shows `bmeia` (Passport, Visa), `bmi` (National ID), `bmf`
(Taxes), and `gewerbebehoerde` (Business Formation) all populated, with no
`driving-licence`/DMV entry anywhere under `registry/at/`.

## Sources examined

### Primary source

- **Authority:** Bundesministerium für Inneres (BMI) — administered through
  each Land's driving-licence authority (Bezirkshauptmannschaft, or in Vienna
  the Landespolizeidirektion).
- **Document:** "Führerscheinantrag" (Driving licence application), Anlage 3
  to the Führerscheingesetz-Durchführungsverordnung, published as BGBl. II
  Nr. 472/2012.
  - **URL:** `https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40146673/II_472_2012_Anlage_3.pdf`,
    hosted on the Rechtsinformationssystem des Bundes (RIS), the Republic of
    Austria's official legal-gazette system.
  - **Access:** fetched fresh this cycle via `curl`, **HTTP 200,
    application/pdf, 612,300 bytes**.
  - **Format:** flat (non-fillable) 2-page PDF. `pdfjs-dist`'s
    `getAnnotations()` returns an **empty array on both pages** — this
    specimen has zero AcroForm widgets, unlike the sibling
    `at/bmi/national-identity-card-application` schema's fillable AcroForm.

### Cross-check source

- **URL:** `https://www.bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/FormularFuehrerscheinantrag.pdf`,
  the Bundesministerium für europäische und internationale Angelegenheiten's
  (BMEIA) central "Allgemein/Formulare" forms library, linked from a live
  Austrian embassy citizen-services page.
  - **Access:** fetched fresh this cycle via `curl`, **HTTP 200,
    application/pdf, 114,352 bytes**.
  - **Correction to the prior cycle's backlog note:** GOV-4092's own banked
    note described this mirror as reachable "without login" but did not
    itself claim byte-identity; this cycle independently fetched both copies
    and found they are **not** byte-identical (612,300 vs. 114,352 bytes,
    different SHA-256) — evidently re-encoded/optimized independently by
    each host, not literally the same file. Their **extracted text layers
    are identical string-for-string**, however, once the RIS copy's own
    gazette citation/page-marker/watermark lines ("BGBl. II - Ausgegeben am
    21. Dezember 2012 - Nr. 472", "1 von 2"/"2 von 2", "www.ris.bka.gv.at")
    are excluded — a genuine two-source cross-check confirming both mirrors
    describe the same, single-design form, even though they are not
    byte-identical artifacts.

## Extraction method

Since the PDF carries no AcroForm widgets, every field was reconstructed
from the text layer's own glyph x/y coordinates (`pdfjs-dist`'s
`getTextContent()`), grouped into rows/columns by shared y-coordinates. This
session's `node-canvas`-based PDF renderer failed to rasterize the embedded
vector text (a glyph-path resolution error on every character — a
renderer-side font-substitution failure, not a source defect) while
correctly rendering the surrounding lines, table borders, and checkbox
squares. Checkbox positions were therefore recovered independently via a
pixel-level scan of the rendered raster (column-wise dark-pixel-run
detection at 3x render scale) and matched, in strict left-to-right order,
against the text layer's own label sequence — most decisively for the
"Beantragte Klassen/Unterklassen" licence-class row, where the pixel scan
found **exactly 20** checkbox squares in the same left-to-right order as the
20 class-code labels extracted from the text layer (AM, A1, A2, A, B, BV,
C1, C1 95, C, C 95, D1, D1 95, D, D 95, F, BE, C1E, CE, D1E, DE), confirming
a clean 1:1 correspondence despite uneven inter-checkbox spacing (wider
cells accommodate the multi-character "C1 95"/"C 95"/"D 95" labels).

## Field inventory

63 applicant-facing fields modelled, split across:

- **10 personal-data fields** (name, academic degree pre-/suffixed, birth
  name, previous names, given names, gender, combined date-and-place of
  birth, citizenship, combined main-residence address).
- **1 residency declaration** + **3 existing-licence fields** (number,
  issuing authority, issue date).
- **8 booleans** for "reason for duplicate licence".
- **6 booleans** for "reason for exchange".
- **20 booleans** for the licence-class checklist.
- **9 fields** for reinstatement/reissuance/renunciation (4 boolean
  triggers, 3 conditionally-required dates, 1 conditionally-required
  free-text class list).
- **5 delivery-method fields** (3 mutually-exclusive method booleans + 1
  independent "Express" modifier + 1 conditionally-required address).
- **1 closing application-date field.**

Plus **3 `documents[]` entries**: a required photograph, a required
in-person signature (attestation), and an optional driving-school stamp.

Page 2 ("Nachweise" / "Behördliche Verfügungen") is entirely completed by
the issuing authority after submission — identity/residence/health
verification, licence production, serial numbers, and the applicant's own
later in-person pickup-confirmation signature at collection — and is
deliberately excluded from `fields[]`, matching this registry's established
convention for paper forms with a back-office processing section (e.g. the
sibling `at/bmi/national-identity-card-application` schema).

## Disclosed judgment calls

- **The "BV" licence-class checkbox is transcribed as printed, not
  glossed.** Printed between "B" and "C1" in the 20-entry class checklist,
  "BV" does not correspond to any driving-licence class this cycle could
  find a citation for in the Führerscheingesetz's own class list (§2),
  unlike every other token in that row (all standard EU-harmonised classes
  or their code-95/96 sub-variants). Considered and ruled out: a text-
  extraction/font-substitution artifact — unlikely, since text extraction
  and glyph rasterization are independent code paths in `pdfjs-dist` (the
  renderer's glyph-path failures did not affect `getTextContent()`), and the
  same "BV" string round-trips identically from both the RIS and BMEIA
  copies. Modelled as `licenceClassBV`, described as printed, without
  inventing a gloss.
- **`dateAndPlaceOfBirth` and `mainResidenceAddress` are each modelled as
  one combined free-text field**, not split into their constituent parts.
  The source prints a single blank with no internal column divider for
  "Geburtsdatum und Geburtsort" (date and place of birth), and a single
  blank for "Hauptwohnsitz (PLZ, Ort/Straße/Gasse/Platz, Hausnummer, Stiege,
  Tür)" (main residence, with its component list given only as a
  parenthetical hint) — one blank on the source, one field in the schema.
- **The 8-option "reason for duplicate" and 6-option "reason for exchange"
  checklists are modelled as independent booleans, not a constrained
  single-select.** No radio-group grouping evidence exists on this flat,
  non-AcroForm page (unlike the sibling National ID schema, where
  `getAnnotations()`'s `radioButton: true` flag on true PDF radio widgets
  justified merging options into an enum). Matches this registry's
  established convention for flat checklists with no such evidence (e.g.
  the NO `driving-licence-application`-equivalent schema's own licence-class
  checklist).
- **`exclusivityGroups` is used for the 3-way delivery-method choice**
  (`deliveryToAuthority`/`deliveryToHomeAddress`/`deliveryToOtherAddress`),
  the one place in this form a real-world constraint is genuinely asserted:
  a physical licence can only be delivered to one place. The sibling
  `deliveryExpress` checkbox is deliberately left out of the group as an
  independent delivery-speed modifier, applicable under any method.
- **Wet-ink signature lines are not modelled as data fields** (no signature
  primitive exists in the spec's field-type vocabulary). The applicant's
  in-person signature is instead modelled as a required `documents[]`
  attestation (`applicantSignature`), matching this registry's convention
  for the sibling `at/bmi/national-identity-card-application` schema's own
  `applicantOrRepresentativeSignature` entry; only its accompanying date is
  modelled as a field (`applicationDate`).

## Scope and disclosed boundaries — excluded office-only fields (page 2)

Explicitly out of scope, matching this registry's established exclusion
pattern for staff-filled fields:

- `Eingangsstempel` (receipt stamp) and `Datum und Unterschrift des Beamten`
  (date/signature of the official).
- `Identitätsnachweis erfolgt durch` / `Meldenachweis` / `Prüfung des
  Hauptwohnsitzes durch ZMR-Abfrage` (identity/residence verification
  performed by the caseworker).
- `Gesundheitliche Eignung nachgewiesen durch` and its sub-items (health
  fitness proof — private/official medical certificate, criminal register,
  administrative record, first-aid course), all authority-side verification
  checks.
- The entire "Behördliche Verfügungen" (official orders) block: licence
  production status, fee receipt, serial numbers, issuing authority/date,
  entered code(s), and the **pickup-confirmation signature** the licence
  holder signs later, in person, at collection — a distinct, later event
  from the application itself.

## Conformance fixtures

9 fixtures are committed under
`conformance/at/bmi/driving-licence-application/1.0.0/`: 2 valid submissions
(a minimal filing with only the 8 required fields, and a fuller filing
populating optional personal-data fields, existing-licence details, a
duplicate reason, two licence classes, a reinstatement sub-reason with its
conditionally-required date, and a conditionally-required "other address"
delivery) and 7 mutation fixtures, each verified to fail validation: a
missing required `familyName`, an invalid `gender` enum value, an invalid
`applicationDate` format, an unknown-field rejection, a `requiredWhen`
violation (`deliveryToOtherAddress: true` without `otherDeliveryAddress`), an
`exclusivityGroups` violation (`deliveryToAuthority` and
`deliveryToHomeAddress` both `true`), and an invalid `licenceClassAM` type
(string instead of boolean). The `requiredWhen` mutation surfaces 2 raw ajv
error entries (the outer `if`/`then` wrapper plus the inner missing-required
error) for what is a single semantic violation — an ajv reporting artifact
of how `if`/`then` failures compose, not a schema defect; every fixture's
valid/invalid verdict matches its expected outcome.

## Independence and reproducibility

No submission was made and no in-person visit to an Austrian driving-licence
authority was required to author this schema. Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` were run against the schema document itself and
pass (565/565 registry-wide); every fixture listed above was additionally
validated against a derived JSON Schema built from this document's own
`fields`/`requiredWhen`/`exclusivityGroups` constraints (ajv 2020-12),
matching the expected valid/invalid outcome for each fixture. GovSchema is
an independent, non-profit standards body; it is not affiliated with,
endorsed by, or operated by the Republic of Austria, the Bundesministerium
für Inneres, the Bundesministerium für europäische und internationale
Angelegenheiten, or any Austrian driving-licence authority.
