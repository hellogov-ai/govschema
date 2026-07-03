# Verification record — `fr/inpi/micro-entrepreneur-activity-declaration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived from the publisher's own live process guidance and
the retired paper form's genuine fillable-field set, but the online
submission channel that now exclusively processes these requests (INPI's
guichet unique) sits behind an authenticated FranceConnect+/INPI Connect
account this review could not reach — so the practice's field-by-field
comparison against a *live* screen set has not been completed. It therefore
remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `fr/inpi/micro-entrepreneur-activity-declaration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Institut National de la Propriété Industrielle (INPI), which
  has operated the single national business-formalities window (guichet
  unique) since 1 January 2023 (exclusively since 1 January 2025),
  superseding the prior form-specific Centre de Formalités des Entreprises
  (CFE) network that this Cerfa's own header still references ("RESERVE AU
  CFE").
- **Process guidance:** <https://www.inpi.fr/realiser-demarches/formalites-dentreprises/creer-en-tant-que-micro-entrepreneur>,
  fetched live 2026-07-03. Confirms the online process now collects: an
  identity section; an optional composition/representatives section;
  primary-residence-protection status; établissement location and activity
  classification; an internet domain name if applicable; and fiscal-payment-
  frequency options — matching this Cerfa's own cadre structure closely
  enough to use the Cerfa's field-level detail as the authoritative source
  for what the online form collects field-by-field, per the same "retired
  paper form as field-set proxy" technique used for
  `fr/ants/passport-application-first-adult` and
  `fr/ants/national-identity-card-application-first-adult`.
- **Supporting-documents list:** cross-checked across several independent
  descriptive sources (lecoindesentrepreneurs.fr, legalstart.fr,
  entreprises.cci-paris-idf.fr) since INPI's own page does not itself
  enumerate them (it says only that "les pièces justificatives ... dépendent
  des informations renseignées"). All independently agree on: a copy of the
  applicant's identity document (bearing its own handwritten attestation of
  conformity, dated and signed), proof of occupancy of the professional
  address (< 3 months old), a sworn declaration of non-conviction, and a
  filiation attestation.
- **Primary form source:** Cerfa **15253\*05**, "Déclaration de début
  d'activité commerciale et/ou artisanale — P0 CMB micro-entrepreneur" —
  retired since the guichet unique went exclusive, retrieved from a
  third-party fillable-form mirror (`cerfa.vos-demarches.com`). A more
  current edition (15253\*08, per search-result cross-references) exists but
  was not independently retrieved; the underlying cadre structure between
  editions of a French Cerfa form is normally stable, but this is a gap
  worth closing in a future revision — see "Known gaps" below.
- **PDF extraction method:** unlike the scanned CNI Cerfa (12100\*03) and
  most other retired FR Cerfa forms in this registry, this PDF carries a
  genuine fillable AcroForm layer with real printed text underneath —
  `pdfjs-dist`'s `getTextContent()` returned the full instructional text of
  every cadre, and `getAnnotations()` independently returned each fillable
  field's internal name (e.g. `NOM DE NAISSANCE`, `Nationalité`,
  `VOTRE N° DE SECURITE SOCIALE`), which closely echo the printed labels and
  corroborate which cadre each field belongs to. No tooltip
  (`alternativeText`) is present on most fields, so `sourceRef`s quote the
  printed cadre text (from `getTextContent()`) rather than a widget tooltip.
  The PDF's 4 pages are two duplicate copies of the same 2-page form
  (a declarant copy and a CFE copy), confirmed by identical field names/
  `rect` coordinates recurring on pages 3–4.
- **Deliberately out of scope for this version** (present on the source
  Cerfa's 21 cadres but not modelled, because they are low-frequency edge
  cases the guichet-unique's own summary description does not surface as
  core to the common case):
  - Cadre 2A/2B (EIRL — entrepreneur individuel à responsabilité limitée):
    this status was superseded for new registrations by the unified 2022 EI
    reform (automatic patrimoine separation without an EIRL election), so
    modelling it would describe a defunct choice.
  - Cadre 5 (déclaration(s) d'insaisissabilité de bien(s) foncier(s)): a
    multi-part real-estate-unseizability declaration/renunciation mechanism;
    only a coarse eligibility signal would be defensible without the
    source's own worked examples, so it is left out entirely rather than
    half-modelled.
  - Cadre 6 (autre(s) établissement(s) dans un autre État de l'UE/EEE):
    requires a separate P0' intercalaire annex not retrieved.
  - Cadre 8's "précédent exploitant" / cadre 14 (personne ayant le pouvoir
    d'engager l'établissement, propriétaire indivis) fields, relevant only
    to `originOfBusiness` values other than `creation` (leasehold
    management, management mandate, purchase/partition/auction): the
    `originOfBusiness` enum itself is modelled so an agent can detect these
    cases, but their follow-on prior-operator detail fields are not.
  - Cadre 18 (correspondence address, if different from the fields already
    captured) and the spouse's own health-coverage/social-security-number
    sub-question under cadre 15: both low-frequency refinements layered on
    top of already-modelled fields.
- **Requiredness not independently confirmed:** the source PDF's own
  instructional banner states "Remplir dans tous les cas les cadres N° 1, 3,
  4, 8, 10, 12, 13, 16, 17, 19" (cadres to complete in every case) and lists
  which further cadres are conditional "selon votre situation" — this
  schema's `required`/`requiredWhen` structure follows that banner's
  cadre-level guidance, but individual field-level requiredness *within*
  each cadre (e.g. whether `pseudonym` or `signName` are ever mandatory) was
  not separately confirmed and defaults to `false` where the printed text
  gives no explicit cue.

## Test run (mock data)

Two mock scenarios were run against this schema version's `required`/
`requiredWhen`/`visibleWhen` gating logic with the same standalone validator
script used for `fr/ants/national-identity-card-application-first-adult`
(not committed — mirrors the checks `tools/validate.mjs` and
`tools/validate-ajv.mjs` already run structurally):

1. A first-time EU-national micro-entrepreneur working from home, no
   employees, no spouse in the business — confirms the "home address" /
   EU-national / no-employee branches correctly skip every conditional
   field. Committed as this version's `conformance/.../application-packet.json`
   fixture.
2. A non-EU-national ambulant market trader with a spouse collaborator,
   hiring a first employee, and an in-store retail sideline — exercises
   every conditional branch simultaneously (`marketPostalCode`/
   `marketCommune`, `spouseFamilyName`/`spouseGivenNames`, `employeeCount`/
   `isHiringFirstEmployee`, `retailStoreSurfaceM2`, `residencePermitNumber`/
   `residencePermitIssuedAt`/`residencePermitExpiringOn`,
   `simultaneousActivityType`). A deliberately broken variant (with
   `residencePermitNumber` omitted) correctly **failed** with
   `MISSING required field: residencePermitNumber`, confirming the gate
   fires; restoring the field passed. Not committed as a fixture (single-
   packet-per-version convention), but recorded here as the branch coverage
   this version's conditional logic received.

Both `tools/validate.mjs` and `tools/validate-ajv.mjs` (full JSON Schema
2020-12 meta-schema, ajv) pass for this document.

## Known gaps / future work

- Confirm the current Cerfa edition (15253\*08 per secondary sources,
  vs. \*05 used here) and re-diff field-by-field before promoting to
  `verified`.
- Reach the live guichet-unique screen flow (requires a FranceConnect+ or
  INPI Connect account) to confirm this schema's field set and gating match
  the actual online experience, not just the retired paper proxy.
- A liberal-profession sibling (P0 PL, Cerfa 13821) and a commercial-agent
  sibling (AC0, Cerfa 13847) are natural next candidates, mirroring this
  schema's structure.

## Scope

Out of scope for this version: EIRL election, liberal-profession and
commercial-agent micro-entrepreneur variants, company-formation (non-sole-
trader) business formation in France, and the cadre-5/6/14/18 edge cases
listed above.
