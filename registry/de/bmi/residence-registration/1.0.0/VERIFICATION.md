# Verification record — `de/bmi/residence-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live online (EWA) and in-person Bürgeramt flows. It
therefore remains `draft`, not `verified`.

## Why Germany, why now

Every jurisdiction published in the registry before this document — US, GB, IE,
CA, NZ, AU — is Anglophone and common-law. GovSchema's charter calls for
global/multi-jurisdictional scope "even when early coverage is narrow" (see
`discovery/README.md`), and that narrowness had gone unaddressed for six
authoring cycles. This document opens Germany as a **seventh jurisdiction** and
the first non-English-source, civil-law one, which is also the first real test
of whether the v0.2 field/flow model holds outside the Anglophone convention
patterns (postal-code shape, name-and-nationality fields, address structure,
document-type enumerations) it was implicitly built against.

## Sources examined

- **Document `(id, version)`:** `de/bmi/residence-registration` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Primary source URL (in-person channel, legal basis, deadlines, fee,
  documents):**
  <https://service.berlin.de/dienstleistung/120686/> — Berlin's official
  "Wohnsitz - Alleinige Wohnung oder Hauptwohnung anmelden" service page.
  Fetched directly (`curl`, 2026-07-01, HTTP 200) and its raw HTML text
  extracted and read in full, not summarized by a small model — the page cites
  its own legal basis by section number (see below), so this was checked
  directly rather than trusted from a paraphrase.
- **Primary source URL (federal online EWA channel):**
  <https://wohnsitzanmeldung.gov.de/die-elektronische-wohnsitzanmeldung-schritt-fuer-schritt-642992>
  — the federal government's own EWA explainer, confirming the service is a
  joint Bundesministerium des Innern und für Heimat (BMI) / city digitalisation
  project rolling out municipality by municipality, not a Berlin-only service.
- **Secondary source (field-level cross-check #1):**
  <https://allaboutberlin.com/guides/anmeldung-in-english-berlin> and
  <https://allaboutberlin.com/docs/anmeldung> — a well-established,
  long-running expat resource that transcribes the ~54-field Meldeschein
  field-by-field (new/previous address, personal details, document details) and
  cites BMG section numbers (§17, §27 Abs. 2, §29, § 7 WoAufG Bln).
- **Secondary source (field-level cross-check #2):**
  <https://www.settle-in-berlin.com/anmeldung/guide-anmeldung-form-in-english/>
  — an independent expat-guide site; its field table (new/previous dwelling
  type, document type codes RP/PA, marital-status labels, gender labels) was
  cross-checked against allaboutberlin.com and found consistent everywhere the
  two overlap.
- **Structural confirmation (official form, different Land):** the City of
  Munich's official fillable Meldeschein PDF
  (`stadt.muenchen.de/dam/jcr:15cee8cc-bd9a-46f0-9c4b-052766dc547f/anmeldung_meldebehorde.pdf`,
  retrieved 2026-07-01, HTTP 200). Its AcroForm field names, `/Opt` option
  arrays, and tooltip (`/TU`) text were extracted directly from the PDF's
  decompressed content streams (zlib-decompress; the `/TU` values are
  **UTF-16BE hex strings** — `<FEFF…>` — and must be decoded as UTF-16BE, not
  read as Latin-1 parenthesized strings, which is why an earlier pass missed
  the enumerated option lists). This confirms directly, from the form's own
  text: the multi-person Sections 1-5 structure (this document scopes to
  Section 1/one registrant only); the identity-document type codes
  `PA`/`RP`/`KRP`/`KA`/`AKN` and their expansions (see below); the full
  marital-status and gender code sets (see below); and the presence of
  birth-place/date, nationality, and religion fields matching the
  Berlin-sourced field list.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed directly against the primary source

From `service.berlin.de/dienstleistung/120686/` (fetched and read in full):

| Source element | Field(s) / schema element |
|---|---|
| "innerhalb von 14 Tagen nach Ihrem Einzug" (14-day deadline) | `moveInDate` description |
| "alleinige Wohnung" / "Hauptwohnung" / "Nebenwohnung" distinction | `residenceType`, `previousResidenceType` |
| Online procedure (BundID, eID, AusweisApp, 18+, German/EU citizenship, moving within Germany, family-unit co-registration) | `channel` = `online_ewa` |
| In-person procedure (Bürgeramt appointment, 16+, any nationality, guardian registers under-16, Vollmacht for a representative) | `channel` = `in_person`, `representativeAuthorization` |
| Wohnungsgeberbestätigung requirement (landlord confirms in writing within 2 weeks; a tenancy agreement does not substitute) | `landlordConfirmationProvided` |
| Guardian consent for a minor's move (joint-custody parents) | `minorGuardianConsentProvided` |
| "Gebühren: keine" (no fee) | not modelled as a field (consistent with `us/usps/change-of-address`'s deliberately-unencoded fee) |
| "Durchschnittliche Bearbeitungszeit: sofort" (immediate) | informational only, not modelled |
| Legal basis: BMG §17 Abs. 1 u. 3 (An-/Abmeldung), §21 Abs. 4 (mehrere Wohnungen), §23 (Erfüllung der Meldepflicht), §23a Abs. 2 u. 3 (elektronische Anmeldung), §24 Abs. 1 (Datenerhebung, Meldebestätigung), §27 (Ausnahmen) | cited in schema description; exemption cases (short stays, communal service accommodation) recorded qualitatively, not modelled as fields, since this document assumes the registrant is in scope |

### Enum option codes — confirmed directly from the Munich PDF `/TU` tooltips

The Munich Meldeschein PDF's per-field tooltips (UTF-16BE `/TU` strings)
enumerate the official code sets verbatim. Decoded directly:

- **`maritalStatus` (`famst` field)** — *"Hier ist der personenstandsrechtliche
  Familienstand anzugeben:"* — LD = ledig, VH = verheiratet, VW = verwitwet,
  GS = geschieden, LP = eingetragene Lebenspartnerschaft, LV = Lebenspartner
  verstorben, LA = Lebenspartnerschaft aufgehoben, EA = Ehe aufgehoben, LE =
  Lebenspartner für tot erklärt, NB = nicht bekannt. All **ten** are modelled
  in the schema's `maritalStatus` enum (an earlier draft carried only six).
- **`gender` (`geschl` field)** — M = männlich, W = weiblich, o.A. = ohne
  Angabe, D = divers (with the §22 Abs. 3 PStG note). Modelled as
  male/female/unspecified/diverse.
- **`identityDocumentType` (Pass-/Ausweisdaten field, `/Opt` + `/TU`)** — PA =
  Personalausweis, RP = Reisepass, KRP = Kinderreisepass, KA = Kinderausweis,
  AKN = Ankunftsnachweis. All five are modelled as explicit enum values; `other`
  is retained for non-German-national documents (foreign passport, residence
  title) that the Bürgeramt accepts but that carry no distinct Munich-form code.

From `wohnsitzanmeldung.gov.de` (EWA explainer): the three-phase online flow
(data entry incl. optional family co-registration → authority review and
email confirmation → digital Meldebestätigung plus an ID-card address sticker
mailed by the Bundesdruckerei) — informational; not separately modelled beyond
the `channel` field, since GovSchema does not model post-submission fulfilment
steps for any published schema.

## What was cross-checked against secondary sources

The full new-dwelling / previous-dwelling / personal-details / document-details
field groups (`newAddress*`, `previousAddress*`, `lastName` through
`maritalStatus`, `identityDocument*`) were **not** individually itemised on the
Berlin.de service page (which describes the process in prose, not a
field-by-field form spec — the same gap noted for `gb/co/register-to-vote`).
They were reconstructed from the two independent expat-guide field
transcriptions (allaboutberlin.com, settle-in-berlin.com), which agree with
each other on field presence, ordering, and the document-type codes, and were
then structurally confirmed against the Munich Meldeschein PDF's own AcroForm
field names.

## What is NOT yet independently verified

- **Whether the exact enum wording matches every Land's template.** The
  `gender`, `maritalStatus`, and `identityDocumentType` code sets are now
  confirmed **directly** from the Munich Meldeschein PDF's own `/TU` tooltips
  (decoded as UTF-16BE; see the confirmed-enum block above), superseding the
  earlier "modelled from general knowledge" hedge. What remains open is only
  whether other Länder's templates use an identical code set — the same
  cross-template caveat noted just below, not a gap in the Munich source read.
- **Whether the field set is truly nationally uniform.** The Bundesmeldegesetz
  sets the registration *data model* federally, and the Allgemeine
  Verwaltungsvorschrift zur Durchführung des BMG (BMGVwV) that Berlin cites
  (Nrn. 17.1, 17.3, 21, 22, 23.0, 36.2) implements it, but each Land/city
  publishes its own Meldeschein template. This document treats the Berlin and
  Munich templates as representative exemplars (same convention as
  `us/ca/dmv/*` for US state DMVs), not as proof every Land's template is
  byte-identical.
- The **EWA online channel's per-municipality availability** is not modelled.
  The federal EWA site frames the service as a joint BMI/city project offered
  for municipalities to adopt (the "Einer für Alle" / Nachnutzung principle),
  rolling out municipality by municipality rather than being uniformly live
  everywhere on day one; it does not publish a machine-readable list of
  currently-live municipalities on the pages reviewed (home, FAQ, Über uns,
  Leistungsbeschreibung, service-description, step-by-step). `channel` is
  therefore modelled as a flat enum without a jurisdiction-availability gate.
  (An earlier draft cited a specific "nine of the ten largest German cities"
  figure; that figure could not be located on any reviewed page and has been
  removed as unsupported.)
- Postal-code, and other string length limits are GovSchema conventions (5-digit
  German PLZ format is a well-established public fact), not citations of a
  published field-length rule.

## Scope notes

- **Single adult registrant only.** The real Meldeschein supports registering
  up to several household members (spouse/civil partner, minor children) in
  one submission (Munich PDF sections 1-5); this document models one
  registrant's data, matching the scope discipline used for
  `gb/co/register-to-vote` and other single-applicant schemas. A future
  version could add a repeatable co-registrant field group once the spec
  supports a natural repeat construct.
- **Sole/main residence only** (Berlin dienstleistung 120686). Registering a
  *Nebenwohnung*-only, deregistering (Abmeldung, on moving abroad or having no
  further German residence), and the Beiblatt/Hauptwohnungserklärung
  multiple-residence supplement are **out of scope**. Each is a related but
  distinct service, flagged as future catalog candidates.
- **Minors under 16** cannot self-register in person and are out of scope
  beyond the `minorGuardianConsentProvided` flag for an adult's own move with a
  child.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live online (EWA) and in-person
Bürgeramt flows. The address/name/document field groups still rest primarily
on the two expat-guide transcriptions cross-checked against the Munich
AcroForm field names, not a direct read of the live Berlin form's field list.
The `gender`/`maritalStatus`/`identityDocumentType` enum codes are now
confirmed directly from the Munich PDF tooltips and no longer block promotion.
Confirm EWA per-municipality coverage if that ever becomes a modelled field,
and record the outcome here with a current `verification.lastVerifiedAt`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months). Re-check the source on or before that date and on any `source.url`
change.
