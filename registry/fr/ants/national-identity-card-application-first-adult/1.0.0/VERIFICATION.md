# Verification record — `fr/ants/national-identity-card-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived from the publisher's own live process guidance and
the official Cerfa form's printed field set, but the online submission
channel that now processes the majority of these requests (ANTS's pré-demande
service) sits behind an authenticated account this review could not reach —
so the practice's field-by-field comparison against a *live* screen set has
not been completed. It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `fr/ants/national-identity-card-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Agence Nationale des Titres Sécurisés (ANTS), the operator of
  the online pré-demande and card-manufacturing system, under the Ministère
  de l'Intérieur et des Outre-mer, which is legally responsible for the card
  itself; applications are lodged at any CNI-equipped mairie (or a French
  embassy/consulate abroad), not at ANTS directly.
- **Process guidance:**
  - <https://www.service-public.fr/particuliers/vosdroits/F1341> —
    "Carte d'identité d'un majeur : première demande", fetched live (HTTP 200),
    2026-07-03. Confirms: the card is free ("La carte d'identité est
    gratuite"), 10-year validity, the 3-month retrieval-or-destroyed window,
    that the process does not depend on domicile (any mairie), and the
    branching document requirements by existing-document status (valid
    passport / expired passport under 5 years / expired passport over 5
    years or none).
  - <https://www.service-public.gouv.fr/particuliers/vosdroits/R45668> —
    "Pré-demande pour une 1re demande de carte d'identité", fetched live,
    2026-07-03. Confirms the online pré-demande collects applicant and
    parent identity information, issues a pré-demande number/QR code, and
    that finalisation (document check, fingerprints) happens in person at
    the mairie or consulate.
- **Primary form source:** Cerfa **12100\*03**, "Demande de carte nationale
  d'identité / passeport" — a single combined form covering both documents
  for an adult (majeur) applicant, retrieved from a French sub-prefecture's
  own official government subdomain
  (`polynesie-francaise.pref.gouv.fr/.../CERFA%20majeurs%20complet.pdf`).
  This is a direct `*.gouv.fr` source, not a third-party mirror — a stronger
  sourcing tier than the third-party fillable-PDF mirror used for the sibling
  `fr/ants/passport-application-first-adult` schema (which sourced the older
  Cerfa 12100\*02 edition, passport-only, from a non-government mirror since
  the official host had moved). A second copy of the same PDF was also
  retrieved from `igon.fr` for cross-checking but discarded: it renders as a
  different, unrelated Cerfa (12101\*02, the **minor's** identity-card/
  passport form — already identified and set aside during the sibling
  passport schema's review), not this one.
- **PDF extraction method:** the retrieved PDF (4 pages) is scanned/
  rasterised with no text layer (`pdfjs-dist`'s `getTextContent()` returns
  empty) and no AcroForm/XFA annotations (`getAnnotations()` returns zero
  widgets per page) — a paper form scanned to PDF, not a fillable one. Field
  labels were instead recovered by rendering each page to a PNG at 2.5x scale
  (`pdfjs-dist` + `node-canvas`) and reading the rendered images directly,
  since no OCR tool is available in this sandbox. This is a fifth distinct
  PDF shape encountered in this registry (after the no-AcroForm static case,
  the dynamic-XFA case, the has-AcroForm-shell-but-empty-Fields case, and the
  AcroForm-overlay-added-by-a-third-party-site case used for the sibling
  passport schema) — plain scanned image, no text or widget layer at all.
- **What the rendered form shows, verbatim structure:**
  - Page 1: a single checkbox pair at the top selects "carte nationale
    d'identité" or "passeport"; below it, one shared état-civil block (name,
    usage name, given names, sex, height, birth date/place/département/
    country, address, mobile phone — the last annotated "Pour le passeport :
    couleur des yeux" showing eye colour is passport-only, not asked for a
    CNI); two identical filiation blocks, each headed by its own
    "PÈRE  MÈRE" selector rather than a fixed father-then-mother order; an
    11-option "Vous êtes français(e) parce que" nationality-basis checklist;
    a CNI-only guardianship (tutelle) question; and a declaration/signature
    line.
  - Page 2: office-use stamp box, timbre-fiscal box (present on the shared
    form shell but not populated for a CNI request, which is free — see
    below), and the RGPD/data-retention legal notice, including the
    CNI-specific fingerprint-retention-refusal right (90-day default
    retention, exercised via a separate dedicated form referenced but not
    itself part of this Cerfa).
  - Page 3: a verso card with a photo box, a signature box, and a repeat of
    name/given-names/date-of-birth — modelled at the coarser `documents[]`
    grain (`identityPhoto`, `signature`) rather than as duplicate fields.
  - Page 4: a machine-read orientation arrow only, no applicant content.
- **Interpretation calls (rendered image, not machine-readable widget
  metadata):**
  - The two "PÈRE  MÈRE" headers are modelled as a `parent1Role`/
    `parent2Role` enum pair (`pere`/`mere`) rather than assuming a fixed
    father-then-mother order, since the rendered image shows each filiation
    block carrying its own selector rather than a pre-printed "PÈRE" /
    "MÈRE" label. This is a plausible reading of a flat page image, not a
    confirmed checkbox behaviour (no widget metadata exists to confirm which
    box a given block's checkbox actually toggles) — flagged here rather
    than silently assumed.
  - None of the filiation fields' requiredness could be confirmed from the
    rendered image (no asterisk/required-marker convention was legible), so
    — consistent with the sibling passport schema's same gap — all ten
    filiation fields are modelled `required: false`.
  - The 11-option nationality-basis checklist's exact printed wording was
    transcribed directly from the rendered image (two-column layout) and is
    quoted in full in the field's own `sourceRef`.
- **CNI vs. passport differences this schema captures:** no fee (`documents[]`
  carries no `payment` entry, unlike the passport schema's 86 EUR fiscal-
  stamp document); no eye-colour field; a CNI-only guardianship
  (majeur-en-tutelle) question and acknowledgment; and a CNI-only
  fingerprint-retention-refusal right, each sourced to its own on-form or
  privacy-notice text and noted as CNI-specific in the field's `description`.
- **Live online channel identified but not reached:** ANTS's CNI pré-demande
  portal requires an authenticated account this review could not reach, so
  the field-by-field comparison the practice requires has not been completed
  against that live screen set.

## Test run (mock data)

Two mock scenarios were run against this schema version's `required`/
`requiredWhen`/`visibleWhen` gating logic with a standalone validator script
(not committed — ad hoc, mirrors the checks `tools/validate.mjs` and
`tools/validate-ajv.mjs` already run structurally) before publishing:

1. An applicant already holding a valid passport (`identityDocumentStatus:
   valid_passport_or_id`) — confirms `birthCertificate` and
   `proofOfFrenchNationality` are correctly **not** required, and that
   `existingIdentityDocument` **is**. Committed as this version's
   `conformance/.../application-packet.json` fixture.
2. An applicant with no existing document (`expired_over_5_years_or_none`)
   who is under guardianship with an attached attestation — first run
   without `birthCertificate`/`proofOfFrenchNationality`/`guardianAttestation`
   provided correctly **failed** or with `MISSING required document` for all
   three, confirming the gating conditions actually fire rather than
   silently passing; adding those three documents made the same scenario
   pass. This scenario was not committed as a fixture (this registry's
   convention is a single `application-packet.json` per schema version) but
   is recorded here since it is what exercised the conditional-document
   branches end to end.

Both `tools/validate.mjs` (structural) and `tools/validate-ajv.mjs`
(full JSON Schema 2020-12 meta-schema, ajv) pass for this document.

## Scope

Out of scope for this version: the minor's identity-card process (governed
by a separate Cerfa 12101\*02 form), CNI renewal/lost/stolen situations, and
the online pré-demande portal's own screen-by-screen flow. A renewal
companion is a natural next candidate, mirroring the first-adult/renewal-
adult schema pairs already published for AU, CA, GB, and IE.
