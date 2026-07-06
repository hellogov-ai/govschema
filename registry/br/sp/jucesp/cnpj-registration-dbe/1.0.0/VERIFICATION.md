# Verification record — `br/sp/jucesp/cnpj-registration-dbe` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-05`

## Why this schema and why now (GOV-1342 / GOV-1296)

GOV-1342 ("GovSchema Standard Research") is the same recurring research-cycle
issue as GOV-1335/GOV-1328/GOV-1321/GOV-1289. GOV-1289's original
new-jurisdiction scouting cycle rated Brazil's Business Formation vertical
**STRONG** and filed a follow-up candidate, `GOV-1296`: São Paulo's REDESIM
documentation portal publishes a field-by-field manual ("16 Preenchimento do
Coletor Nacional – DBE de inscrição") for CNPJ registration via the
Documento Básico de Entrada (DBE), integrated through Receita Federal's
Coletor Nacional and the state Junta Comercial (JUCESP). GOV-1296's own note
flagged a live TLS/connection issue scouting the source; this cycle
confirmed the live `vreredesim.sp.gov.br` domain is fully unreachable from
this environment (connection refused on direct fetch, and the Documentacao/
Manuais listing page is an Angular SPA — the Wayback Machine only archived
an empty `<app-root>` shell, not the client-rendered manual list). Rather
than treating this as a second dead end (as `GOV-1295`, Brazil's other
candidate, was), the Wayback CDX API (`cdx/search/cdx`, filtered to
`mimetype:application/pdf`) was queried directly for the domain, which
surfaced a `/Documentacao/Manuais/PRD/` path carrying genuine
`application/pdf`-typed snapshots — including the exact manual GOV-1296
named, archived 2025-07-02, distinct from a same-named-but-different-path
2022 snapshot that turned out to be an HTML redirect stub, not the real PDF.
This document opens **Brazil as the registry's 15th jurisdiction**.

## Post-review fixes (GOV-1345)

An independent review gate (GOV-1345, re-review
on [PR #228](https://github.com/hellogov-ai/govschema/pull/228)) re-downloaded
the Wayback snapshot and decoded the embedded screenshot images directly
(the field labels live in images, not the PDF's extractable text layer — a
finer-grained pass than this document's own initial page-by-page read) and
found three real field-level gaps, all now fixed in this revision:

1. **`addressReference` was misclassified as optional.** The pendency-list
   screenshot explicitly reads *"O Campo 'Referência' é de preenchimento
   obrigatório"* (obligatory, red icon) — not optional as this document's
   first revision claimed. Fixed: `required: true`, `minLength: 1`.
2. **Four required fields were missing from the representative-address
   block.** The blank "Endereço do Representante da Pessoa Jurídica" form
   shows 7 inputs (CEP, Tipo de Logradouro, Logradouro, Bairro/Distrito,
   Município, UF, Número, Complemento); the first revision modelled only 3
   (CEP, Logradouro, Número). The pendency list confirms the other four as
   obligatory. Fixed: added `representativeAddressStreetType`,
   `representativeAddressNeighborhood`, `representativeAddressMunicipality`,
   and `representativeAddressStateCode`, all `required: true`. Per the
   reviewer's note, the representative's personal address is not
   jurisdiction-locked to São Paulo the way the establishment's address is
   (REDESIM itself is a per-state integrator, but the individual named as
   representative can reside anywhere in Brazil), so `Município`/`UF` are
   genuine free-input fields here, not safely inferrable/omittable.
3. **A missing top-level `registrationEventDate` field.** The reviewer
   flagged a pendency-list line — *"Na opção Datas dos Eventos: O Campo
   'Data do Evento' é de preenchimento obrigatório"* — that didn't clearly
   map to any modelled field, and asked whether it was the same as the
   separate "Data do Evento" widget visible inside the Sócio/Administrador
   panel (p.17). Re-checking p.11's FCPJ sidebar menu and p.12's pendency
   list together resolves this: **"Datas dos Eventos" is its own top-level
   FCPJ menu section**, distinct from the per-partner "Data do Evento" shown
   later inside the QSA panel — the general pendency list (p.12) flags only
   the former as obligatory; the QSA-specific pendency list (p.16-17) flags
   only `Natureza do Evento` as obligatory for the partner, never a
   partner-level date. This document had not modelled the FCPJ-level field
   at all. Fixed: added `registrationEventDate` (type `date`, required) to
   the `entity_identification` step, representing the date of the requested
   registration event (Evento 101). The partner-panel's own "Data do Evento"
   remains unmodelled, since the QSA-specific pendency list never marks it
   obligatory — a deliberate scope decision now recorded here rather than an
   open question.

Field count: 42 → 47. The mock conformance packet and its from-scratch
checker script were re-run against the updated schema (see **Test run**
below for the current numbers).

## Sources examined

- **Document `(id, version)`:** `br/sp/jucesp/cnpj-registration-dbe` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Junta Comercial do Estado de São Paulo ("JUCESP").
- **Primary source:**
  - <https://vreredesim.sp.gov.br/Documentacao/Manuais/PRD/16%20Preenchimento%20do%20Coletor%20Nacional%20-%20DBE%20de%20inscri%C3%A7%C3%A3o%20(Eventos%20101%20e%20102).pdf>
    — "Coletor Nacional DBE — Tutorial: Preenchimento do Coletor Nacional -
    DBE de inscrição do primeiro e dos demais estabelecimentos (Eventos 101
    e 102)", JUCESP / VRE|REDESIM (Secretaria de Desenvolvimento Econômico
    do Estado de São Paulo). Retrieved via a Wayback Machine snapshot dated
    2025-07-02 (`web.archive.org/web/20250702124154/...`), since the live
    domain is unreachable from this environment. A 34-page, fully
    screenshot-driven walkthrough (no separate fillable-field appendix): every
    field name, its section membership, and its required/optional status were
    read directly off the manual's own Coletor Nacional UI screenshots and the
    three separate "Verificar Pendências" pendency-list panels it captures
    (pp.12, 13, 16, 18, 19, 27, 29), which explicitly mark each field as
    obligatory (red icon) or optional (amber icon) — the strongest available
    signal for `required` short of live-browsing the real wizard.
  - The manual also documents the DBE's own printed output (pp.21-22, 32),
    used to source the `dbeSignedDeclaration` and `constitutiveActInstrument`
    document entries.
- **Field extraction method:** the PDF has a genuine text layer (unlike, e.g.,
  `ae/fta/vat-registration`'s screenshot-only manual) — extracted directly
  and read page-by-page, cross-checked against the embedded screenshots for
  each field's on-screen context.
- **Retrieved / reviewed:** 2026-07-05.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| p.9, "Coletor Nacional → Inscrição Matriz" | `municipality`, `legalNatureCode`, `viabilityProtocolNumber` |
| p.10, CPF recovery field | `representativeCpf` |
| p.12, "Seu ato constitutivo/alterador já foi registrado..." modal | `actAlreadyRegisteredWithRegistryBody` |
| p.12, "Dados do Órgão de Registro" | `registryBodyType`, `registryNire`, `registryNumber`, `registryBodyCnpj` |
| p.11, FCPJ menu "Datas dos Eventos" | `registrationEventDate` |
| p.12, "Identificação da Pessoa Jurídica" | `businessName`, `shareCapital`, `tradeName` |
| p.13, "Endereço da Pessoa Jurídica" | `addressPostalCode`, `addressStreetType`, `addressStreetName`, `addressNumber`, `addressComplement`, `addressNeighborhood`, `addressReference` |
| p.14, "Dados para Contato" | `contactPhoneAreaCode`, `contactPhoneNumber`, `contactEmail` |
| p.14, "Identificação do Representante da Pessoa Jurídica" | `representativeFullName`, `representativeType`, `representativeQualificationCode` |
| p.15, "Endereço do Representante da Pessoa Jurídica" | `representativeAddressPostalCode`, `representativeAddressStreetType`, `representativeAddressStreetName`, `representativeAddressNeighborhood`, `representativeAddressMunicipality`, `representativeAddressStateCode`, `representativeAddressNumber`, `representativeContactPhoneAreaCode`, `representativeContactPhoneNumber` |
| p.15, "Porte da Empresa" | `companySizeClassification` |
| p.16, "Contabilista" | `accountantCpfCnpj`, `accountantName`, `accountantBooksKeptAtAccountingOffice` |
| p.17, "Identificação do Sócio/Administrador" | `partnerEventNature`, `partnerName`, `partnerCpfCnpj`, `partnerQualificationCode`, `partnerCapitalParticipationValue` |
| p.18, "Atividade Econômica" | `primaryCnaeCode`, `unitType` |
| p.30, "Finalização do Preenchimento" (Lei da Liberdade Econômica) | `lowRiskConditionsAcknowledged` |
| pp.21-22, 32, printed DBE "05. IDENTIFICAÇÃO DO REPRESENTANTE" / "06. RECONHECIMENTO DE FIRMA" | `dbeSignedDeclaration` document |
| p.21, "...apresentar no órgão de registro junto com os demais instrumentos de análise de constituição de empresa" | `constitutiveActInstrument` document |

## What is NOT independently confirmed / out of scope

- **Registration filing fee.** This manual documents the DBE-filling wizard
  only, not JUCESP's separate registry-filing fee schedule; no `documents[]`
  fee entry is modelled to avoid asserting an unconfirmed amount (unlike,
  e.g., `za/cipc/private-company-incorporation`'s `registrationFee`, sourced
  from a dedicated CIPC fee-schedule PDF this cycle did not have a Brazilian
  equivalent for).
- **Dropdown option lists not fully enumerated in the source.** Several
  fields are typed `string` rather than `enum` because the manual's
  screenshots show only one or two example selections, not the full dropdown
  contents: `registryBodyType` (only "Junta Comercial" shown), `partnerEventNature`
  (only "Entrada de sócio/administrador" shown), and both
  `representativeQualificationCode`/`partnerQualificationCode` (only "5 -
  Administrador"/"49 - Sócio-Administrador" shown, against Receita Federal's
  much longer published Qualificação do Responsável table). This follows the
  same conservative precedent as `za/cipc/private-company-incorporation`'s
  `founderIdentityOrRegistrationNumber` (bounded by length, not an unconfirmed
  pattern/enum).
- **CPF/CNPJ format.** Modelled as free strings bounded by `maxLength` rather
  than a `pattern`, since the manual shows both a masked display format
  ("415.470.698-58") and a plain digit-entry box, and the exact input mask
  enforced by the live wizard was not independently confirmed.
- **Evento 102 (subsequent branch/filial registration).** The manual's
  second half (pp.23-32) documents this near-identical sibling event, which
  differs only in referencing an existing `cnpjDaMatriz` instead of the
  legal-nature/name-determination fields modelled here; deliberately out of
  scope as a distinct future sibling document, consistent with how this
  registry treats first-time vs. renewal/amendment processes as separate
  schemas elsewhere.
- **Repeating QSA (Quadro de Sócios e Administradores) beyond one partner.**
  The wizard supports an arbitrary "Novo Sócio/Administrador" list (p.17);
  this document models only the first partner/administrator, consistent with
  every sibling business-formation schema's single-founder scoping
  (`za/cipc/private-company-incorporation`, `fr/inpi/sasu-or-eurl-formation`,
  `de/handelsregister/gmbh-formation-musterprotokoll`,
  `nl/kvk/bv-formation`, `sg/acra/private-limited-company-incorporation`).
- **Secondary CNAE codes and the eight-option Forma de Atuação checklist.**
  p.18 shows a repeating "Atividades Econômicas Secundárias" list and eight
  Forma de Atuação checkboxes (Estabelecimento Fixo, Internet, Correio,
  etc.); GovSchema v0.3 has no array/multi-select field type (the same
  constraint noted in `za/cipc`'s VERIFICATION.md), and modelling only a
  subset of the eight checkboxes would be an arbitrary, undocumented partial
  gap rather than a deliberate scope cut — both are left for a future
  version if the pattern recurs elsewhere in the registry.
- **gov.br/Brasil Cidadão authentication and the CAPTCHA recovery step.**
  Portal login and bot-check mechanics, not data fields — out of scope,
  consistent with every other schema in the registry.
- **Contabilista's CRC classification sub-fields.** p.16 shows
  "Classificação CRC" / "UF CRC" / "SEQ CRC" / "Tipo CRC" and a parallel
  "Responsável pela Organização Contábil" block with its own identical
  sub-fields; the pendency list only marks the top-level `CPF/CNPJ do
  Contabilista` as obligatory, so only `accountantCpfCnpj`/`accountantName`
  are modelled as required, and the CRC-registration sub-fields are treated
  as an unconfirmed-cardinality accounting-firm detail out of scope for this
  version.

## Scope and jurisdiction notes

- This is Brazil's **first** GovSchema document, opening the registry's
  **15th jurisdiction**.
- Modelled as a **subnational** schema (`jurisdiction.level: "subnational"`,
  `subdivision: "BR-SP"`) rather than a national Brazil schema: REDESIM is a
  per-state integrator (the manual's own municipality list — p.9's dropdown
  — is scoped to São Paulo state), even though the underlying CNPJ/Coletor
  Nacional system it feeds into is federal (Receita Federal). This mirrors
  `us/ca/sos/business-entity-llc-formation`'s subnational treatment of a
  state-run business-registration front end.
- Addresses are modelled as flat, field-per-input-box strings
  (`addressPostalCode`, `addressStreetName`, etc.) rather than a single
  free-text block, matching the live wizard's own decomposed CEP/Tipo de
  Logradouro/Logradouro/Número/Complemento/Bairro input layout (screenshots,
  pp.13, 15) — the opposite structural choice from `za/cipc`'s flat-string
  addresses, made because *this* source genuinely decomposes the address
  into separate inputs, unlike CIPC's forms.

## Test run

A mock `conformance/br/sp/jucesp/cnpj-registration-dbe/1.0.0/application-packet.json`
scenario (Mariana Alves Ferreira, sole founder/administrator of a São Paulo
furniture-manufacturing company incorporating its first establishment, whose
constitutive act has not yet been registered with the Junta Comercial) was
checked with a from-scratch script (`/tmp/conformance-check-br.mjs`,
re-implementing this document's own `required`/`requiredWhen` `Condition`
grammar per GSP-0013). Result (re-run after the GOV-1345 fixes above): **0
violations** across 47 fields (43 collected, 4 correctly not-applicable/absent:
the three `actAlreadyRegisteredWithRegistryBody`-gated registry fields plus
the always-optional `registryBodyCnpj`). Mutation tests confirmed: (1) switching
`actAlreadyRegisteredWithRegistryBody` to `true` with no registry details
given correctly flags `registryBodyType`, `registryNire`, and
`registryNumber` as missing; (2) supplying those three fields alongside
`actAlreadyRegisteredWithRegistryBody: true` correctly drops back to 0
violations; (3) removing the required `contactEmail` value correctly flags
it as missing; (4) the baseline scenario's three registry fields are
correctly treated as not-required (not merely optional-and-blank) given
`actAlreadyRegisteredWithRegistryBody: false`. The schema was also validated
against the GovSchema v0.3 meta-schema with `tools/validate.mjs` and
`tools/validate-ajv.mjs` (both pass).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer should independently re-fetch
the manual (ideally from the live `vreredesim.sp.gov.br` domain once
reachable, to confirm the Wayback snapshot has not diverged from a current
edition) and — ideally — walk the live Coletor Nacional wizard with a real
(test) gov.br/REDESIM viability protocol to confirm the online screen
sequence and pendency rules match this transcription, recording the outcome
here per VERSIONING.md §3 (immutability; a new version if discrepancies are
found).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-05** (6
months).
