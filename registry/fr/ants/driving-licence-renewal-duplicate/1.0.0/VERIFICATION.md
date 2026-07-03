# Verification record — `fr/ants/driving-licence-renewal-duplicate` v1.0.0

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
channel that now processes the majority of these requests (ANTS's
`permisdeconduire.ants.gouv.fr` service) sits behind a FranceConnect/ANTS
account login this review could not reach — so the practice's field-by-field
comparison against a *live* screen set has not been completed. It therefore
remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `fr/ants/driving-licence-renewal-duplicate` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Agence Nationale des Titres Sécurisés (ANTS), the operator of
  the online request-and-manufacturing system, under the Ministère de
  l'Intérieur et des Outre-mer. Requests are lodged either online via ANTS or,
  as a fallback, on paper at a préfecture/sous-préfecture — the Cerfa this
  schema is sourced from is that paper fallback's own form.
- **Process guidance (fetched live, 2026-07-03, HTTP 200):**
  - <https://www.service-public.gouv.fr/particuliers/vosdroits/F1727> —
    "Perte du permis de conduire français". Confirms the online
    loss-declaration-plus-replacement-request flow via ANTS, the digital tax
    stamp fee (25 €), the required documents (photo-signature, identity
    proof, proof of address <6 months, avis médical for categories C/D
    only), and the distinct process for applicants normally resident abroad.
  - <https://www.securite-routiere.gouv.fr/passer-son-permis-de-conduire/demande-du-titre-du-permis-de-conduire/perte-vol-ou-deterioration-0-1>
    and its theft-specific sibling page — confirm the loss-vs-theft
    procedural split: a loss declaration is filed together with the
    replacement request on ANTS; a theft declaration can only be made in
    person at a police station or gendarmerie, which issues a receipt valid
    to drive in France for 2 months while the replacement request is filed.
  - <https://www.service-public.gouv.fr/particuliers/vosdroits/R42947> —
    the renewal-for-expiry guidance, confirming "expiration de la durée de
    validité du titre" as a distinct request reason from loss/theft/damage.
- **Primary form source:** Cerfa **14882\*01**, "Demande de renouvellement de
  permis de conduire, de duplicata ou de catégorie AM après annulation,
  suspension ou invalidation" (Art. R. 211-1, R. 221-1, R. 221-4 du Code de la
  route; Art. 8 de l'arrêté du 20 avril 2012 modifié). Retrieved from the
  Hérault préfecture's own official government subdomain
  (`herault.gouv.fr/content/download/.../Cefa 14882-01 + verso - Octobre
  2013.pdf`) after the national `formulaires.service-public.gouv.fr` catalog
  entry and the Paris préfecture-de-police copy both returned client-side
  JS redirect shells this sandbox could not follow. A direct `*.gouv.fr`
  source, not a third-party mirror. The same Cerfa reference number
  (14882\*01) is independently confirmed current in 2026 by multiple
  third-party legal/administrative sites (droitissimo.com, ornikar.com,
  vos-demarches.com), none of which describe a superseding edition.
- **PDF extraction method:** the retrieved PDF (2 pages) has an actual text
  layer — `pdfjs-dist`'s `getTextContent()` returned the full printed text of
  both pages directly — unlike several other FR Cerfa forms already in this
  registry that are scanned images with no text layer at all (e.g. the
  sibling `fr/ants/national-identity-card-application-first-adult` schema).
  `getAnnotations()` returned zero AcroForm/XFA widgets per page: this is a
  print-and-fill form (text-searchable, but not fillable), a sixth distinct
  PDF shape encountered in this registry (after the no-text/no-AcroForm
  scanned case, the dynamic-XFA case, the has-AcroForm-shell-but-empty-Fields
  case, the AcroForm-overlay-added-by-a-third-party-site case, and the
  plain-scanned-image-with-no-text-layer case) — text layer present, no
  widget layer.
- **What the extracted text shows, verbatim structure:**
  - Page 1: a shared état-civil header (birth family name, given names, date
    of birth, mobile phone, sex, place of birth commune/country/département,
    home address block, email, usage name) identical in field order to the
    sibling CNI/passport Cerfa header block from the same ministry; a
    six-option "À la suite de" request-reason checklist (theft, damage,
    non-receipt, loss, expiry, civil/marital-status change); a
    RENOUVELLEMENT / DUPLICATA / CATÉGORIE AM procedure-type selector with a
    footnote restricting DUPLICATA to heavy-category (C/C1/C1E/CE/D/D1/D1E/DE)
    holders replacing a lost, stolen, or damaged title; two 14-option
    category checklists (categories held, categories requested); an
    office-reserved NEHP number and issue date/place field (not modelled —
    filled by the administration, not the applicant); the applicant's
    attestation and declaration place/date; a delivery-method choice (postal,
    which requires an in-person counter deposit of the current title, or
    counter pickup); a personal-data-reuse opt-out; and a legal-representative
    block (single "Je soussigné(e) ... né(e) le ... demeurant à ..."
    attestation line, not separate name-field boxes) for a non-emancipated
    minor applicant.
  - Page 2: a "pièces à fournir" (documents to provide) checklist specific
    to the duplicata pathway, dated October 2013, from the Hérault
    préfecture: this Cerfa itself plus a compliant photo; a loss-declaration
    receipt (obtainable only in person at specific préfecture/sous-préfecture
    counters per that 2013 guidance — since superseded by the online ANTS
    loss-declaration flow, per F1727) or a police/gendarmerie theft
    declaration; the original document for a civil-status-change or damage
    request; a separate photo-signature Cerfa 14948\*01; two photocopies of
    an identity document; and two photocopies of a proof of address. This
    2013 checklist is treated here as historical/supplementary context for
    the damage/civil-status-change document requirement (not otherwise
    stated on the current online-process pages), while the *current*
    fee, photo, identity-proof, address-proof, and medical-certificate
    requirements are sourced to the 2026-fetched service-public.gouv.fr and
    securite-routiere.gouv.fr pages instead, since those postdate the 2013
    paper checklist and describe today's ANTS-centred process.
- **Interpretation calls:**
  - `sex` is modelled `required: true` and `mobilePhone`/`email` are
    modelled `required: false` ("Recommandé"), matching the sibling CNI
    schema's identical header block — the extracted flat text does not
    preserve the original page layout precisely enough to confirm which
    element the "(Recommandé)" annotation is bound to, so this is a
    plausible reading by analogy to the same ministry's other Cerfa in this
    registry, not a directly confirmed layout.
  - `categoriesHeld`/`categoriesRequested` are modelled as delimited strings,
    not a repeating/array value: GovSchema v0.3 has no native multi-select
    field type (GSP-0009, composite/repeating values, has not been folded
    into the accepted spec). Flagged as a known modelling gap rather than
    silently forcing an unsupported shape.
  - `involvesHeavyVehicleCategory` is asked as its own direct boolean field
    rather than derived by parsing the category strings, for the same reason
    the sibling `sg/spf/driving-licence-application` schema asked
    `isApplyingForMotorcycleClass` directly instead of inferring it from a
    category code — avoids asserting an unsourced parsing/mapping rule.
  - `procedureType`'s DUPLICATA eligibility restriction (footnote 1) is
    documented in the field's own `description` but not enforced by a
    `requiredWhen`/`crossFieldValidation` rule, since evaluating it requires
    testing category-code membership inside the delimited `categoriesHeld`
    string — outside what the condition grammar's `equals`/`in`/comparison
    operators can express against a single scalar field.
  - The office-reserved "Numéro NEHP" and "Date et lieu de délivrance du
    titre" line is not modelled as an applicant-facing field: it immediately
    follows the form's own "(Réservé à l'administration)" annotation on the
    NEHP number, and its position and context (before the applicant's own
    attestation/signature line) reads as an office-completed pair, not an
    applicant entry — flagged here as an interpretation, not a confirmed
    widget behaviour (this Cerfa has no widget metadata at all, see above).
  - `legalRepFullName` is modelled as one field (not split into family/given
    name) since the source's legal-representative block gives a single
    "Je soussigné(e)" attestation line, unlike the applicant's own name
    fields which have separate labelled boxes earlier on the same page.
- **Live online channel identified but not reached:** ANTS's
  `permisdeconduire.ants.gouv.fr` requires an authenticated account this
  review could not reach, so the field-by-field comparison the practice
  requires has not been completed against that live screen set.

## Test run (mock data)

A mock scenario — an adult applicant in metropolitan France requesting a
DUPLICATA after losing a category B licence, with no legal representative
and no heavy-vehicle category — was run against this schema version's
`required`/`requiredWhen`/`visibleWhen` gating logic with a standalone
validator script (not committed — ad hoc, mirrors the checks
`tools/validate.mjs` and `tools/validate-ajv.mjs` already run structurally)
before publishing. Committed as this version's
`conformance/.../application-packet.json` fixture:

1. With `requestReason: loss`, `involvesHeavyVehicleCategory: false`, and
   `hasLegalRepresentative: false` — confirms `lossOrTheftDeclaration` is
   correctly required, `medicalCertificate` and all `legalRep*` fields are
   correctly **not** required, and `damagedOrPriorLicence` is correctly not
   required.
2. A second pass with `requestReason: theft` in place of `loss` (not
   committed as a fixture, this registry's convention is a single
   `application-packet.json` per schema version) confirmed
   `lossOrTheftDeclaration`'s `requiredWhen` (`in: [loss, theft]`) fires
   identically for both reasons, rather than only matching an `equals: loss`
   check.
3. A third pass with `involvesHeavyVehicleCategory: true` confirmed
   `medicalCertificate` becomes required, and reverting it to `false` made
   the requirement correctly disappear again.

Both `tools/validate.mjs` (structural) and `tools/validate-ajv.mjs`
(full JSON Schema 2020-12 meta-schema, ajv) pass for this document.

## Scope

Out of scope for this version: the ANTS online portal's own screen-by-screen
flow (not reached, see above); the DUPLICATA category-eligibility restriction
as an enforced cross-field rule (documented but not validated, see above);
and the process for an applicant normally resident outside France, which
F1727 describes as materially different (embassy/consulate-certified
declaration, translated by an approved translator) and does not model here.
