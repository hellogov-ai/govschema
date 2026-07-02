# Verification record — `de/bmi/residence-registration` v1.1.1

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

A full field-by-field comparison (`manual-source-review-v1` → Procedure step 2)
is now complete. No field, type, requiredness, or flow discrepancy was found
against the sources examined; no data change was needed. This is a **PATCH**
per VERSIONING.md ("a re-verification that finds the source unchanged ...
refreshes `verification.lastVerifiedAt` [and] `status` to `verified`").

## Sources examined (re-fetched directly this pass)

- <https://service.berlin.de/dienstleistung/120686/> — unchanged from the
  v1.0.0 reading: 14-day deadline, no fee, the alleinige/Haupt/Nebenwohnung
  distinction, the online (BundID/eID, 18+, German/EU citizenship) vs.
  in-person (16+, any nationality, guardian for under-16) channel split,
  Wohnungsgeberbestätigung and guardian-consent requirements, and the same
  BMG section citations (§17, §21 Abs. 4, §23, §23a, §24 Abs. 1, §27).
- <https://wohnsitzanmeldung.gov.de/die-elektronische-wohnsitzanmeldung-schritt-fuer-schritt-642992>
  — unchanged: BundID + eID/AusweisApp + 6-digit PIN requirement, and the
  three-phase flow (data entry/family co-registration → authority review and
  email confirmation → digital Meldebestätigung plus a Bundesdruckerei-mailed
  ID-card address sticker). Still publishes no machine-readable
  per-municipality EWA-availability list.
- **New this pass — a third, independent, primary-adjacent field-level
  source:** the Freie Universität Berlin welcome-service's hosted blank
  Berlin Meldeschein PDF
  (`fu-berlin.de/en/sites/abt-1/referate/pe/welcome-service/_medien/downloads/anmeldung_bei_der_meldebehoerde.pdf`,
  fetched directly, HTTP 200). Its `pdf-lib`-extracted AcroForm field names
  (52 fields) and `pdfjs-dist`-extracted page text are a genuine Berlin
  registration-form specimen, distinct from the Munich Meldeschein already
  cited in v1.0.0 — not another expat-guide transcription.

## Why this closes the v1.0.0/v1.1.0 open gap

v1.0.0's VERIFICATION.md flagged: *"The full new-dwelling / previous-dwelling
/ personal-details / document-details field groups ... were not individually
itemised on the Berlin.de service page ... reconstructed from two independent
expat-guide field transcriptions ... not a direct read of the live Berlin
form's field list."* The FU Berlin PDF is a direct read of a genuine
Berlin-in-use Meldeschein, and its field names match this schema's field set
1:1:

| FU Berlin PDF field | Schema field |
|---|---|
| "Die neue Wohnung ist alleinige/Haupt/Nebenwohnung" | `residenceType` |
| "Neue Wohnung Tag des Einzugs" | `moveInDate` |
| "Neue Wohnung ... Postleitzahl Gemeinde Ortsteil" / "Straße Hausnummer Zusätze" | `newAddressPostalCode`/`newAddressMunicipality`/`newAddressDistrict`/`newAddressStreet`/`newAddressHouseNumber` |
| "Die (letzte) bisherige Wohnung ... war alleinige/Haupt/Nebenwohnung" | `previousResidenceType` |
| "Bisherige Wohnung ... Postleitzahl Gemeinde Kreis Land" / "Straße Hausnummer Zusätze" | `previousAddress*` |
| "Bei Zuzug aus dem Ausland Staat" | `previousAddressCountry` |
| "Wird die bisherige Wohnung beibehalten? Nein / Ja, und zwar als Haupt-/Nebenwohnung", annotated "Wenn ja, siehe Beiblatt!" | `keepingPreviousResidence` (boolean; the tri-state declaration is confirmed out of scope, routed to the separate Beiblatt, matching this schema's existing scope note) |
| "Haben [...] noch weitere Wohnungen in Deutschland? Nein/Ja" | `additionalResidencesInGermany` |
| "Person 1 Familienname, ggf. Doktorgrad, Passname" | `lastName` |
| "Person 1 Vornamen (Rufnamen unterstreichen)" | `firstNames` |
| "Person 1 Geburtsname" | `birthName` |
| "Person 1 Geschlecht" | `gender` |
| "Person 1 Tag, Ort, Land der Geburt" | `dateOfBirth` + `placeOfBirth` + `countryOfBirth` (schema splits this single combined form field into three typed sub-fields — a modeling decision, not a discrepancy) |
| "Person 1 Religionsgesellschaft" | `religiousAffiliation` |
| "Person 1 Staatsangehörigkeiten" | `nationality` |
| "Person 1 Ordens-/Künstlername" | `religiousOrArtisticName` |
| "Familienstand (1oder 1 und 2)" | `maritalStatus` |
| "Dokument 1 Art / Ausstellungsbehörde / Seriennummer / Datum / gültig bis" | `identityDocumentType`/`identityDocumentIssuingAuthority`/`identityDocumentSerialNumber`/`identityDocumentIssueDate`/`identityDocumentExpiryDate` |

The form also confirms this schema's single-registrant scope decision is a
deliberate simplification, not an oversight: the live form has a second
person block ("Person 2 ...") for co-registering a family member, explicitly
out of scope per this document's existing scope notes.

One structural note, not a discrepancy: this specific FU-Berlin-hosted
specimen prints an abbreviated 3-code key ("PA = Personalausweise, RP =
Reisepässe, KP = Kinderreisepass") next to the identity-document fields,
narrower than the Munich AcroForm's full 5-code `/TU`-tooltip enumeration
(adding KA/Kinderausweis and AKN/Ankunftsnachweis) already confirmed in
v1.0.0/v1.1.0. This is treated as an artifact of this particular specimen's
printed instruction line being abbreviated, not evidence the wider Munich
code set is wrong — consistent with this document's existing "Berlin and
Munich as representative exemplars, not proof every Land's template is
byte-identical" scope note; the Munich source remains the more complete
enumeration and is unchanged.

## What remains a documented scope decision, not a discrepancy (unchanged from v1.0.0)

- Cross-Land template uniformity (Berlin/Munich/FU-Berlin specimens treated
  as representative exemplars of a federally-set data model, not proof every
  Land's template is byte-identical).
- EWA per-municipality rollout coverage (no published machine-readable list;
  `channel` remains a flat enum).
- Postal-code and other string length limits remain GovSchema conventions.

## Noted aside, not fixed this pass (out of scope for this review)

Several fields whose `description` already says "Personal identifier; handle
as sensitive data" (e.g. `newAddressPostalCode`, `lastName`, `firstNames`,
`nationality`) do not carry the optional `classification: sensitive-pii`
member that this registry's GSP-0006 backfill (see GOV-396/GOV-574) applied
to identifier-shaped fields like `dateOfBirth` elsewhere in this same
document. This is a pre-existing gap from before this document joined the
registry's classification backfill scope, not something this verification
pass's practice (field/type/requiredness/validation/flow accuracy) covers;
flagged for whoever next runs a classification-backfill pass over this
document, same pattern as the SS-4 dangling-reference aside in GOV-603.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months), unchanged. Re-check the source on or before that date and on any
`source.url` change.
