# Verification record — `br/rfb/individual-income-tax-return-irpf` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every field was read directly from the text layer of RFB's own technical
file-layout specification for the DIRPF declaration file (the "Leiaute
DIRPF"). It remains `draft`, not `verified`, because there is no live web
wizard to walk — RFB's actual DIRPF filing happens through its own desktop
"Programa Gerador da Declaração" (PGD) or the "Meu Imposto de Renda"
web/app equivalent, both of which require a taxpayer's own credentials and
produce the exact structured file this layout document describes. This
registry never submits mock/fabricated data to a real government system, so
a live-system walkthrough is not attempted here — see "What is NOT yet
independently verified" below.

## Background: why this source, not the GOV-1295 FAQ

A prior cycle (GOV-1295) attempted to source Brazil's IRPF from RFB's
340-page topical FAQ ("Perguntas e Respostas IRPF"), and left it in backlog:
the FAQ answers isolated taxpayer questions and is too fragmentary to
source a field-by-field schema from. This cycle instead located RFB's
Leiaute DIRPF — a genuine byte-exact file-layout specification listing every
record type in the DIRPF data file, each field's name, content description,
start/end byte position, length, decimal places (for monetary fields), and
type code (C=character, N=numeric, A=alpha, I=indicator). This is a richer,
more literal field-by-field specification than most wizard-derived sources
already in this registry.

## Access notes

- `https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/dirpf/leiaute-dirpf-2023.pdf`
  is RFB's own official technical-documents page for the DIRPF, an official
  `gov.br` domain. The PDF was fetched and its text layer extracted in full
  with `pdfjs-dist`'s `getTextContent` (137 pages, no OCR needed), and
  independently confirmed to be the genuine layout document (not the
  GOV-1295 FAQ) before authoring began: it opens with "REGISTROS DO ARQUIVO
  DECLARAÇÃO (.DEC)" and lists all ~89 record types (HEADER through Reg 92),
  followed by byte-exact field tables for each record.
- **2023-vintage caveat, stated honestly:** this is the most recent Leiaute
  DIRPF edition RFB has published; RFB has not published a newer layout PDF
  since. The DIRPF's underlying record structure is known to evolve
  year-to-year in the live PGD/e-CAC software (for example, crypto-asset
  disclosure detail already exists within this 2023 layout's Reg 83-87
  "RENDIMENTO ISENTO TIPO DE INFORMAÇÃO" detail records, gated off the
  IN_CRIT_OBRIGAT/NR_COD_ISENTO code tables this document does not fully
  reproduce), so a filing year after 2023 may have gained record fields not
  captured here. This document should be treated as reflecting the general,
  stable shape of the return rather than a guarantee of byte-for-byte
  accuracy against any specific post-2023 filing year's PGD build.

## Sources examined

- **Document `(id, version)`:** `br/rfb/individual-income-tax-return-irpf` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Secretaria Especial da Receita Federal do Brasil (RFB)
- **Primary source (directly retrieved, text layer extracted verbatim with
  pdfjs-dist):**
  <https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/dirpf/leiaute-dirpf-2023.pdf>
  — "Leiaute dos Registros que Compõem a Declaração de Ajuste Anual do
  Imposto sobre a Renda da Pessoa Física" (Leiaute DIRPF), 2023 edition
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| HEADER — IDENTIFICAÇÃO DA DECLARAÇÃO | `cpf`, `fullName`, `dateOfBirth`, `isRectifying`, `filingType`, `hasSpouseIncludedInDeclaration`, `professionalRegistrationNumber` |
| Reg 16 — IDENTIFICAÇÃO DO DECLARANTE | `declarationType`, `originalDeclarationReceiptNumber`, `spouseCpf`, `streetType`, `streetAddress`, `addressNumber`, `addressComplement`, `neighborhood`, `postalCode`, `municipalityCode`, `municipalityName`, `stateOfResidence`, `countryCode`, `email`, `voterRegistrationNumber`, `occupationCode`, `occupationNatureCode`, `numberOfInstallments` |
| Reg 21 — RENDIMENTOS TRIBUTÁVEIS RECEBIDOS DE PESSOAS JURÍDICAS | `hadTaxableIncomeFromLegalEntityEmployer` (inferred gate), `employerCnpj`, `employerName`, `grossSalaryReceivedAmount`, `officialSocialSecurityContributionAmount`, `thirteenthSalaryAmount`, `incomeTaxWithheldAmount`, `thirteenthSalaryIncomeTaxWithheldAmount` |
| Reg 22 — REND. TRIB. RECEBIDOS DE PESSOAS FÍSICAS, EXTERIOR E CARNÊ-LEÃO | `hadIncomeFromIndividualsForeignOrCarneLeao` (inferred gate), `carneLeaoReferenceMonth`, `carneLeaoIncomeReceivedAmount`, `rentalIncomeReceivedAmount`, `otherIncomeFromIndividualsAmount`, `foreignIncomeReceivedAmount`, `cashBookDeductionAmount`, `alimonyDeductionAmount`, `dependentDeductionAmount`, `socialSecurityContributionPaidAmount`, `carneLeaoTaxPaidAmount` |
| Reg 23 — RENDIMENTOS ISENTOS E NÃO TRIBUTÁVEIS | `hadExemptOrNonTaxableIncome` (inferred gate), `exemptIncomeCode`, `exemptIncomeAmount` |
| Reg 24 — RENDIMENTOS SUJEITOS A TRIBUTAÇÂO EXCLUSIVA | `hadExclusivelyTaxedIncome` (inferred gate), `exclusiveTaxIncomeCode`, `exclusiveTaxIncomeAmount` |
| Reg 25 — DEPENDENTES | `hasDependents` (inferred gate), `dependentRelationshipCode`, `dependentName`, `dependentDateOfBirth`, `dependentCpf` |
| Reg 26 — RELAÇÃO DE PAGAMENTOS EFETUADOS | `madeDeductiblePayments` (inferred gate), `paymentCode`, `paymentBeneficiaryTaxId`, `paymentBeneficiaryName`, `paymentAmount`, `paymentNonDeductibleOrReimbursedAmount`, `paymentBeneficiaryType`, `paymentDescription` |
| Reg 34 — DOAÇÕES A PARTIDOS | `donatedToPoliticalParty` (inferred gate), `politicalPartyCnpj`, `politicalPartyName`, `donationAmount` |

Total: **67 fields**, 8 `steps`, no `documents` (the layout PDF does not
describe a document-upload workflow — the DIRPF is a self-declared filing
with no attachment requirement at submission time; RFB may separately
request supporting evidence under audit, but that is outside this
document's byte-layout source).

## Key structural findings

- **The layout document defines record structure, not a wizard's
  yes/no questions.** Unlike this registry's usual wizard-derived
  schemas, the Leiaute DIRPF only tells you which fields exist within a
  record and their byte positions — it never states "the PGD asks the
  taxpayer X before displaying record Y." Every boolean gating field in
  this document (`hadTaxableIncomeFromLegalEntityEmployer`,
  `hadIncomeFromIndividualsForeignOrCarneLeao`,
  `hadExemptOrNonTaxableIncome`, `hadExclusivelyTaxedIncome`,
  `hasDependents`, `madeDeductiblePayments`, `donatedToPoliticalParty`) is
  therefore an **inferred** field: a record's real-world presence/absence
  in the file is what "gates" it, and the corresponding "did the taxpayer
  have this kind of income/dependent/payment?" framing is this document's
  own construction, not a verbatim-quoted question from any RFB UI. This
  is flagged for a reviewer below rather than presented as verified wizard
  copy.
- **Several fields reference RFB code tables the layout document itself
  does not reproduce** (`exemptIncomeCode`, `exclusiveTaxIncomeCode`,
  `dependentRelationshipCode`, `occupationCode`, `paymentCode`,
  `countryCode`). The layout document gives the field's byte
  position/length/type but not the code-to-meaning mapping (that lives in
  the PGD program's own dropdown lists, a separate artifact this cycle did
  not fetch). Each such field's `description` states this honestly rather
  than fabricating an `enum`.
- **`declarationType` is modelled as an eligibility field** (mirroring the
  `companyClassification`-style pattern already used in
  `za/sars/corporate-income-tax-return-itr14-*`): the HEADER's
  `CODIGO_RECNET` and Reg 16's `IN_TIPODECLARACAO` fields distinguish
  ordinary annual-adjustment filings ('A' — Ajuste) from estate/probate
  final returns ('E' — Espólio) and definitive-exit-from-Brazil returns
  ('S' — Saída), each of which pulls in its own additional mandatory
  record set. `eligibleValues: ["ajuste"]` scopes this document to the
  ordinary case.
- **Repeating records are modelled as a single bounded entry**, the same
  limitation every prior large tax schema in this registry has hit (spec
  v0.3 has no repeating/nested field model, SPEC.md Section 12): Reg 21
  (one entry per paying employer), Reg 22 (one entry per calendar month),
  Reg 23/Reg 24 (one entry per income-type code), Reg 25 (one entry per
  dependent), Reg 26 (one entry per payment), and Reg 34 (one entry per
  party/candidate) each in reality repeat, but this document models one
  representative entry per record type. A filer/agent with more than one
  employer, more than one dependent, multiple deductible payments, etc.
  needs multiple submissions of this document's fields to fully represent
  their filing — the same caveat already recorded for
  `za/sars/corporate-income-tax-return-itr14-small-business`'s Donations
  container and `br/sp/jucesp/cnpj-registration-dbe`'s repeating officer
  list.

## Scope cuts (deliberate)

- **Rural activity — Anexo da Atividade Rural** (Regs 50-57: contributor
  identification, Brazil/exterior revenue-expense schedules, taxable-result
  computation, herd movement, assets, debts, rural-property ownership) —
  deferred in full. This is a self-contained annex with its own
  multi-record structure comparable in scope to everything else in this
  document combined.
- **Capital gains — GCAP** (Regs 60-75: real property, movable property,
  equity participation, foreign declarations, acquirer detail, expansion,
  apportionment, cost computation, gain-bracket detail) — deferred in
  full. A byte-exact but enormous nested computation spanning 16 record
  types with its own instalment/rate/exemption sub-logic.
- **Variable income / day-trade — RENDA VARIÁVEL** (Regs 40-43: monthly
  common-operations and day-trade results by CPF, annual totals, real
  estate investment fund operations) — deferred in full; a monthly
  repeating computation record RFB itself mostly derives from brokerage
  reporting.
- **Rendimentos Recebidos Acumuladamente / RRA** (Regs 45-48: accumulated
  income received by titular/dependent and the associated pension detail) —
  deferred in full; a specialised retroactive-income taxation regime with
  its own titular/dependent record pair.
- **Foreign-exchange-specific declarations** (the exterior-currency
  variants embedded across the GCAP record set, e.g. `VR_BEM_AQUISICAO_RME`,
  `FT_BEM_AQUISICAO_RME`) — deferred as part of the GCAP cut above, not
  separately re-derived.
- **Estate/espólio-only records** (Reg 30 INFORMAÇÕES DO INVENTARIANTE,
  Reg 38 FINAL DE ESPÓLIO, Reg 58 HERDEIROS, Reg 59 PERCENTUAL DO BEM) and
  **the definitive-exit declaration** (Reg 39 SAÍDA DEFINITIVA) — out of
  scope by construction: `declarationType`'s `eligibleValues: ["ajuste"]`
  excludes the 'E' (Espólio) and 'S' (Saída) branches these records belong
  to.
- **Declaração de Bens e Direitos / Dívidas e Ônus Reais** (Regs 27-28: the
  taxpayer's full asset-and-liability schedule, e.g. real estate, vehicles,
  bank accounts, investments, and debts held as of 31 December) — deferred
  in full. This is itself a large repeating schedule (`NR_CHAVE_BEM` per
  asset) with byte-exact fields for over 45 columns per row (see the Reg 27
  excerpt captured during source review), comparable in scope to a
  standalone document; a future cycle could model it separately.
- **Rendimentos recebidos de pessoas jurídicas pelos dependentes** (Reg
  32) and the dependent-side mirrors of Reg 45/47 (Reg 46/48) — deferred;
  this document's `hasDependents`/dependent fields (Reg 25) identify a
  dependent but do not model income received directly by that dependent
  from a legal entity, which is a separate repeating record keyed to the
  dependent's own CPF.
- **Alimentando (Reg 35)** — the record for a person receiving
  court-ordered alimony directly (distinct from the `alimonyDeductionAmount`
  paid-by-the-declarant field modelled from Reg 22) — deferred; no
  alimony-recipient identification fields are modelled.
- **All PGD/RFB-calculated total and control fields** — every HEADER
  `VR_TOTAL*`/`VR_SOMA*`/`IN_CRIT_OBRIGAT` field (e.g.
  `VR_TOTAL_RENDTRIB_PFPJ_TITDEP`, `VR__SOMA_IMPOSTO_PAGAR`,
  `VR_TOTISENTOS`, `VR_TOTEXCLUSIVO`, `VR_TOTAL_PAGAMENTOS`), Reg 22's
  `VR_BASECALCULO` (a computed tax-base subtotal, not a value the taxpayer
  directly enters), and the entire Reg 17-20 record family ("TOTAIS
  CALCULADOS DA DECLARAÇÃO...") — are excluded, consistent with this
  registry's established discipline of never modelling authority/program-
  calculated subtotal or control-total fields as filer-entered fields
  (SPEC.md §16, and the identical discipline applied throughout the ZA
  SARS ITR14/ITR12 and India ITR document families in this registry).
- **`NR_HASH`, `IN_CERTIFICAVEL`, `NR_CONTROLE`/`FIM_REG` record-integrity
  fields present at the end of every record** — these are PGD-computed
  file-integrity checksums/terminators, not filer input, and are excluded
  from every modelled record for the same reason as the calculated totals
  above.

## What is NOT yet independently verified

- **No live wizard exists to walk.** RFB's DIRPF filing happens through
  its own desktop PGD program or "Meu Imposto de Renda" web/app, both
  gated behind a taxpayer's own credentials (CPF + password, gov.br
  account, or digital certificate) and both of which produce this exact
  file format rather than exposing it as a public HTML form. No mock data
  from this cycle was, or will be, submitted to any RFB system.
- **The seven `had*`/`has*`/`made*`/`donated*` gating fields are inferred**,
  not verbatim wizard questions — see "Key structural findings" above. A
  reviewer with access to the live PGD/Meu Imposto de Renda UI should
  confirm the actual on-screen prompts these gates approximate (e.g. "Novo"
  buttons on an add/remove-row income-type screen, rather than a single
  yes/no question).
- **Six code-reference fields** (`exemptIncomeCode`, `exclusiveTaxIncomeCode`,
  `dependentRelationshipCode`, `occupationCode`, `paymentCode`,
  `countryCode`) reference RFB code tables not reproduced in the layout
  document; this document does not assert an `enum` for them and a
  reviewer should treat their `string` typing as a placeholder for a future
  version that sources the actual code tables (likely from the PGD
  program's own help files or a separate RFB "Tabelas" publication).
- **The 2023 vintage of the source** — see "Access notes" above. A
  reviewer should check whether RFB has since published a newer Leiaute
  DIRPF edition before treating this document as current for a specific
  post-2023 filing year.
- **The Declaração de Bens e Direitos schedule (Regs 27-28)** is flagged
  above as a large, self-contained deferred scope — a natural candidate
  for a dedicated follow-up document rather than folding into this one.

## Mock-data test run

A complete, illustrative mock filing — "Maria Oliveira Silva", a
São-Paulo-resident salaried employee filing an ordinary Declaração
Completa for a single employer, with one dependent child, R$1,200 in
exempt savings-account interest, and a R$850 deductible dental-expense
payment, with no rectifying declaration, no spouse included, no carnê-leão/
foreign income, no exclusively-taxed income, and no political donation — is
recorded in
[`conformance/br/rfb/individual-income-tax-return-irpf/1.0.0/application-packet.json`](../../../../../conformance/br/rfb/individual-income-tax-return-irpf/1.0.0/application-packet.json)
(with a human-readable mirror in the sibling `.txt` file). All names,
CPF/CNPJ numbers, and addresses are fabricated placeholders.

The run was independently checked with a from-scratch GSP-0013 condition
evaluator (re-deriving every field's effective requiredness from its
`required`/`requiredWhen` member and checking exact 1:1 coverage against the
packet's `collectedValues`/`notApplicableFields`): `totalFields: 67`,
`collectedCount: 48`, `notApplicableCount: 19`, `errors: 0`.

Three mutation tests confirmed the evaluator is not trivially passing every
input: (1) stripping `employerCnpj`/`employerName`/`grossSalaryReceivedAmount`
while `hadTaxableIncomeFromLegalEntityEmployer` remained `true` correctly
raised 3 violations; (2) flipping `donatedToPoliticalParty` to `true`
without adding `politicalPartyCnpj`/`politicalPartyName`/`donationAmount`
correctly raised 3 violations; (3) flipping `isRectifying` to `true`
without adding `originalDeclarationReceiptNumber` correctly raised 1
violation.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) with access to a real RFB PGD/Meu Imposto de Renda
account, confirms the actual on-screen framing of the seven inferred gating
fields, sources the six deferred code tables, checks whether a newer
Leiaute DIRPF edition has since been published, and resolves any
discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3); then records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the source on or before that date and on any
`source.url` change — in particular, check whether RFB has published a
newer Leiaute DIRPF edition superseding the 2023 one used here.

## Independent review (GOV-1411) — 2 sourceRef mis-citations found and fixed pre-merge

An independent reviewer re-fetched the same PDF directly from RFB's
`gov.br` URL (byte-identical, 1,845,128 bytes), re-extracted its full text
layer with `pdfjs-dist` (confirming 137 pages), and cross-checked every
`sourceRef` field-code citation in this document against the extracted
text. All 67 field codes were confirmed genuinely present in the source
(none fabricated), and the full record-level layouts for HEADER, REG 16,
and Reg 21/22/23/24/25/26/34 were independently re-transcribed and matched
byte-for-byte against this document's field descriptions, byte lengths, and
`requiredWhen`-gated grouping. Two `sourceRef`s cited the wrong record:

- **`hasSpouseIncludedInDeclaration`** cited "HEADER, field IN_CONJUGE".
  `IN_CONJUGE` appears exactly once in the 137-page document, as field 46 of
  **REG 16** (IDENTIFICAÇÃO DO DECLARANTE), not HEADER. Corrected the
  `sourceRef` to cite REG 16.
- **`professionalRegistrationNumber`** cited "HEADER, field
  NR_REGISTRO_PROFISSIONAL". This field also appears exactly once, as field
  43 of **REG 16**, not HEADER. Corrected the same way.

Both fields' underlying data (field name, description, and semantics) were
correct — only the record attribution in the citation was wrong, likely
because HEADER and REG 16 both carry many similarly-named fields (e.g. both
have their own `NR_CPF`, `NM_NOME`, `IN_COMPLETA`, `IN_RETIFICADORA`) and
it's easy to conflate the two multi-page records. The other five
`sourceRef`s citing HEADER (`cpf`, `fullName`, `dateOfBirth`, `isRectifying`,
`filingType`) were independently confirmed correct — each field genuinely
exists in the HEADER record with matching values/semantics, not just in
REG 16. After the fix, `node tools/validate.mjs` was re-run (227/227
documents, 3/3 mapping.json companions, still passing) and the mock
conformance packet was independently re-checked with a from-scratch
requiredWhen evaluator: 67 total fields, 48 collected, 19 not applicable, 0
errors — matching the author's original claim.
`tools/govschema-client/registry-index.json` was independently regenerated
and diffed against the committed version (zero diff).
