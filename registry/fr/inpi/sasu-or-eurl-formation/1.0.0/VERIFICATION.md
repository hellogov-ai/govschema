# Verification record — `fr/inpi/sasu-or-eurl-formation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from and cross-checked against the sources below.
The Guichet unique's own live declaration wizard sits behind an authenticated
INPI Connect/FranceConnect+ account this review could not reach, so the
practice's field-by-field comparison against a *live* screen set has not been
completed — `status` remains `draft`, not `verified`, the same honest
limitation recorded for the sibling `fr/inpi/micro-entrepreneur-activity-declaration`.

## Why this schema and why now (GOV-1143)

GOV-1143 asked for a fresh GovSchema Standard Research cycle: catalog what
exists, research a missing government process, document its fields, test-run
it with mock data, and author it into the registry. Step 1 (catalog audit)
found `discovery/catalog.json` already carries three open Business Formation
candidates filed by the prior GOV-1136 cycle — `fr/inpi/sasu-or-eurl-formation`,
`nl/kvk/bv-formation`, and `sg/acra/private-limited-company-incorporation` —
each an open sibling gap left after that cycle authored
`de/handelsregister/gmbh-formation-musterprotokoll`, Germany's true
limited-liability-company formation schema. This document closes the French
sibling: `fr/inpi/micro-entrepreneur-activity-declaration` (already published)
covers only the micro-entrepreneur sole-trader regime, not a company with
separate legal personality — the "LLC" analogue France was still missing,
alongside `gb/companies-house/company-incorporation-in01`,
`ie/cro/company-incorporation`, `ca/on/registration/business-incorporation`,
`nz/companiesoffice/company-incorporation`, `in/mca/company-incorporation-spice-plus`,
`us/ca/sos/business-entity-llc-formation`, and
`au/asic/proprietary-company-registration`.

## Sources examined

- **Document `(id, version)`:** `fr/inpi/sasu-or-eurl-formation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** INPI (Institut National de la Propriété Industrielle),
  operator of the Guichet unique des formalités d'entreprises
  (`formalites.entreprises.gouv.fr` / `procedures.inpi.fr`), the sole
  mandatory entry point for company-creation formalities in France since
  1 January 2023 (exclusively since 1 January 2025), which superseded the
  prior form-specific Centre de Formalités des Entreprises (CFE) network.
- **Live process guidance**, fetched 2026-07-04:
  - <https://www.inpi.fr/decouvrir-inpi/formalites-dentreprises/guichet-unique-formalites-dentreprises-et-registre-national-entreprises>
    and <https://www.inpi.fr/realiser-demarches/formalites-dentreprises/formalites-de-creation> —
    confirm the Guichet unique's single-online-declaration model and its
    rubrique structure (type d'entreprise; identité; composition; établissements;
    options fiscales), matching this document's `steps[]` grouping.
  - <https://entreprendre.service-public.gouv.fr/vosdroits/F35934> — dossier
    d'immatriculation supporting-document list, the source for the
    `documents[]` entries (signed statuts, capital-deposit certificate, legal-
    notice publication attestation, identity documents).
  - <https://www.legalstart.fr/fiches-pratiques/demarches-creation/attestation-de-depot-des-fonds/>
    and two further independent practitioner sources (legalplace.fr,
    l-expert-comptable.com) cross-corroborated the capital-deposit-certificate
    requirement and its "no certificate, no Kbis" consequence.
- **Primary form sources** (both retired since the Guichet unique went
  exclusive, but still hosted as fillable AcroForm PDFs and used here as a
  field-set proxy for the modern online declaration — the exact technique
  used for the sibling `fr/inpi/micro-entrepreneur-activity-declaration`):
  - Cerfa **13959\*05**, "M0 SAS — Déclaration de création d'une société ou
    autre personne morale", retrieved directly from a Greffe du tribunal de
    commerce mirror (`greffe-tae-paris.fr`), 4 pages (2 pages × 2 duplicate
    copies).
  - Cerfa **11680\*06**, "M0 SARL — Déclaration de constitution d'une société
    à responsabilité limitée (SARL, SELARL y compris à associé unique)",
    retrieved from a third-party fillable-form mirror
    (`cerfa.vos-demarches.com`), 4 pages (2 pages × 2 duplicate copies).
  - **PDF extraction method:** both PDFs carry genuine fillable AcroForm
    layers with real printed text underneath. `pdfjs-dist`'s
    `getTextContent()` returned the full instructional/cadre text of every
    page; `getAnnotations()`/`getFieldObjects()` independently returned each
    fillable field's internal name (e.g. `DENOMINATION 1`, `Capital montant
    unité monétaire`, `AVEZ-VOUS UN CONJOINT MARIE OU PACSE`), corroborating
    the cadre-text extraction. Both forms' 4 pages are two duplicate copies
    of the same 2-page declaration, confirmed by identical field names
    recurring across pages 1–2 and 3–4 — the same duplicate-copy layout
    already documented for the sibling micro-entrepreneur Cerfa.
- **Retrieved / reviewed:** 2026-07-04 (all sources fetched and read live at
  authoring time; no bot-block encountered on any of the above domains —
  unlike the Guichet unique's own authenticated wizard).
- **Reviewer:** GovSchema Engineering (Standards Engineer, initial authoring
  source-review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Cerfa 13959\*05 cover / 11680\*06 cover — SAS vs. SARL-associé-unique declarations | `legalForm` |
| Cerfa 13959\*05 / 11680\*06, cadre 1 — "DENOMINATION", "Sigle" | `companyName`, `companyAcronym` |
| Cerfa 13959\*05 / 11680\*06, cadre 1 — "Durée de la personne morale"; Code civil art. 1838 (99-year cap) | `companyDurationYears` |
| Cerfa 13959\*05, cadre 8 / 11680\*06, cadre 9 — "PRINCIPALES ACTIVITES ... de l'objet social" | `businessPurpose` |
| Cerfa 13959\*05 / 11680\*06, cadre 1 — "Capital, montant, unité monétaire"; Code de commerce art. L227-1/L223-2 (no statutory minimum since 2003) | `shareCapitalAmountEur` |
| Cerfa 13959\*05 / 11680*06, cadre 1 — "Si capital variable, minimum" | `capitalIsVariable`, `capitalVariableMinimumEur` |
| Cerfa 13959\*05 / 11680\*06 — "ADRESSE DU SIEGE", "Code postal", "Commune" | `registeredOfficeAddressLine`, `registeredOfficePostalCode`, `registeredOfficeCommune` |
| Cerfa 13959\*05 / 11680\*06 — "Au domicile du représentant légal/gérant ... domiciliation provisoire" / "Dans une entreprise de domiciliation" | `registeredOfficeArrangement`, `domiciliationCompanyIdentificationNumber`, `domiciliationCompanyName`, `domiciliationContract` |
| Cerfa 13959\*05, cadre 13 "QUALITE" / 11680\*06 associé-unique identity block | `soleShareholderFullName`, `soleShareholderUsualName`, `soleShareholderDateOfBirth`, `soleShareholderPlaceOfBirth`, `soleShareholderNationality`, `soleShareholderResidentialAddress` |
| Cerfa 13959\*05, cadre 9 "l'associé unique en est le président"; 11680\*06 cover "Dans le cas où le gérant est l'associé unique" | `managingOfficerIsSoleShareholder` |
| Cerfa 13959\*05 "REPRESENTANT LEGAL" block / 11680\*06, cadre 13A "GERANT" | `officerFullName`, `officerDateOfBirth`, `officerNationality`, `officerResidentialAddress` |
| Cerfa 11680\*06, cadre 14A — "AVEZ-VOUS UN CONJOINT MARIE OU PACSE ... SALARIE / ASSOCIE / COLLABORATEUR" (absent from 13959\*05) | `managerSpouseWorksInBusiness`, `managerSpouseStatus` |
| Cerfa 13959\*05 / 11680\*06 — "DATE DE DEBUT D'ACTIVITE", "Permanente / Saisonnière / Ambulant" | `activityStartDate`, `activityType` |
| Cerfa 13959\*05 / 11680\*06, cadre 1 — "Date de clôture de l'exercice social", "Le cas échéant, du 1er exercice" | `financialYearEndDate`, `firstFinancialYearEndDate` |
| Cerfa 13959\*05 / 11680\*06 — "OPTIONS PARTICULIERES: Assujettissement à l'IS / Régime des sociétés de personnes"; "Impôt sur les Sociétés (IS)" | `incomeTaxRegime` |
| Cerfa 13959\*05 / 11680\*06 — "T.V.A: Franchise en base / Réel simplifié / Mini-réel / Réel normal" | `vatRegime` |
| Cerfa 13959\*05 / 11680\*06 — "Fait à", "Le" | `declarationPlace`, `declarationDate` |
| entreprendre.service-public.gouv.fr F35934 — dossier d'immatriculation pièces justificatives | `soleShareholderIdentityDocument`, `officerIdentityDocument` |
| entreprendre.service-public.gouv.fr F35934 — "les statuts signés et datés" | `signedArticlesOfAssociation` |
| legalstart.fr / legalplace.fr / l-expert-comptable.com — attestation de dépôt des fonds ("sans ce certificat, le Kbis ne peut être délivré") | `shareCapitalDepositCertificate` |
| entreprendre.service-public.gouv.fr F35934 — avis de constitution published in a support d'annonces légales habilité | `legalNoticePublicationAttestation` |

## Conformance test run

Two scenarios exercise both `legalForm` branches and every conditional field:

- `conformance/fr/inpi/sasu-or-eurl-formation/1.0.0/application-packet-sasu.json` —
  a single founder forming a SASU, themself the président
  (`managingOfficerIsSoleShareholder = true`), ordinary leased premises,
  fixed EUR 1 capital, corporate IS / franchise en base elections.
- `.../application-packet-eurl.json` — a sole shareholder forming an EURL
  with a distinct gérant (`managingOfficerIsSoleShareholder = false`), a
  variable-capital clause (`capitalIsVariable = true`,
  `capitalVariableMinimumEur = 2000`), a domiciliation-company registered
  office, a working PACS partner (`managerSpouseWorksInBusiness = true`,
  `managerSpouseStatus = collaborator`), and the flow-through partnership /
  réel simplifié tax elections.

A scripted evaluator (reimplementing the GSP-0013 `requiredWhen` grammar —
`conditionLeaf` operators plus `all`/`any`/`not` composition — against
`fields[]` static `required` and `documents[].requiredWhen`) checked both
packets: **0 violations across 35 fields + 6 documents each**. A mutation
test confirmed the conditional requirements actually fire, not just that the
happy path passes: removing `capitalVariableMinimumEur` and
`managerSpouseStatus` from the EURL packet while `capitalIsVariable` and
`managerSpouseWorksInBusiness` stayed `true` correctly reintroduced exactly
those two violations.

Full console output is saved as `application-packet-sasu.txt` and
`application-packet-eurl.txt` alongside the packets.

## What was NOT modeled, and why

- **Multi-shareholder SAS/SARL.** Both source Cerfa forms and the underlying
  law support any number of shareholders; this document scopes to the
  single-shareholder case only, matching the single-founder scope every
  other company-formation schema in this registry (DE, GB, IE, CA/ON, NZ, IN,
  US-CA, AU) already uses.
- **Legal-person sole shareholder.** Both cerfas print a "POUR UNE PERSONNE
  MORALE — forme juridique / Lieu et N° d'immatriculation" branch for a
  corporate shareholder; out of scope here, which assumes a natural person.
- **EIRL status.** Superseded for new registrations by the unified 2022
  entrepreneur individuel reform (automatic patrimoine separation without an
  EIRL election), the same scoping decision already recorded for the sibling
  `fr/inpi/micro-entrepreneur-activity-declaration`.
- **Agricultural and liberal-profession company forms** (GIE/GEIE, sociétés
  civiles, SEL/SELARL/SELAFA, agricultural activity). Cerfa 11680\*06's own
  cover explicitly excludes agricultural-activity SARLs from its scope, and
  both forms flag SEL variants as printed but out-of-scope for this
  document's plain SASU/EURL case.
- **Take-over of a pre-existing fonds de commerce** (achat/apport/location-
  gérance/gérance-mandat, "ORIGINE DU FONDS"). Both Cerfas devote a whole
  cadre to a business-transfer origin; this document scopes to a
  brand-new-activity creation only ("Création, passer au cadre …" branch),
  the same "création" vs. "reprise" scoping boundary other registration
  schemas in this registry already draw.
- **Establishment address distinct from the registered office** ("ADRESSE DE
  L'ETABLISSEMENT où s'exerce l'activité, si différente du siège"). Both
  Cerfas make this genuinely optional; deferred to keep the single-address
  common case tractable, to be added as a future MINOR if requested.
- **The live Guichet unique wizard's own screen order and exact field
  labels.** Blocked behind an authenticated INPI Connect/FranceConnect+
  session; this version relies on the retired Cerfas as a field-set proxy,
  the same limitation already disclosed for the sibling schema.

## Next review

`nextReviewBy`: 2027-01-04, or sooner if the Guichet unique's declaration
screens, the SAS/SARL capital-minimum rules, or the supporting-document list
change.
