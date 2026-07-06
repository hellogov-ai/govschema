# Verification record — `br/mg/detran/comunicacao-de-venda-de-veiculo` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

Every field was read directly from the text layer of DETRAN-MG's own
"Requerimento de Comunicação de Venda" PDF (2026-01-29 edition). It remains
`draft`, not `verified`, because a live DETRAN-MG intake walkthrough and a
second independent reviewer's field-by-field pass have not yet occurred —
see "What is NOT yet independently verified" below.

## Why this candidate, and the provenance problem it resolves

This `GovSchema Standard Research` cycle (`GOV-1526`) began by re-scanning
`CATALOG.md`'s own "Known Gaps" and by-vertical sections (regenerated as of
2026-07-06): DMV stood at 16/17 jurisdictions, with Brazil as the only
remaining gap, explicitly flagged by the prior cycle (`GOV-1519`) as "not a
dead end" — a Brazilian-state DETRAN staff-procedures manual (2012 edition,
stale) and the ATPV-e ownership-transfer document (system-generated output,
not a fillable applicant form) had both been screened and rejected, but no
new candidate had yet been found.

This cycle re-screened DETRAN-ES's own public forms first (the same track
the prior cycle had been on): its "Manual de Procedimentos e Normas Gerais
de Serviços e Licenciamento de Veículos" (`detran.es.gov.br`) is confirmed,
via direct PDF-metadata inspection this cycle, to be the exact stale 2012
document (`CreationDate: 2015-05-19`, cover page reads "Esta é a versão 3.0
de 28 de fevereiro de 2012") already rejected by GOV-1519 — re-confirmed,
not re-litigated. DETRAN-ES's "Requerimento Geral" PDF was also fetched and
extracted directly: it is a single-page, multi-service administrative
request cover sheet with a 17-item checkbox list (restriction inclusion,
CNH-unblock, chassis re-stamping authorization, GNV installation/removal,
address/name change, "Comunicado de Venda," inheritance, etc.) plus generic
owner/vehicle identification fields — not a dedicated, field-rich
registration or ownership-transfer form, and rejected as too generic and
thin a source for this vertical.

This cycle then searched more broadly across Brazil's state DETRANs (vehicle
registration in Brazil is administered per state, not federally) and found
DETRAN-MG's (Minas Gerais) own dedicated "Requerimento de Comunicação de
Venda" — the seller-side notice of vehicle sale required under art. 134 of
the Código de Trânsito Brasileiro (CTB). This is a genuine, currently-dated,
directly downloadable (no login/CAPTCHA/WAF) PDF with a real text layer,
hosted directly on `detran.mg.gov.br`, distinct from both DETRAN-ES's stale
manual and the DETRAN-SP/ATPV-e dead ends already documented by prior
cycles. This closes the global DMV vertical to **17/17 jurisdictions
(100%)**.

## What this document does and does not model

Brazil's vehicle-ownership-transfer process has two legally distinct halves:

1. **The buyer and seller jointly complete and notarize the CRV (paper
   title) or ATPV-e (its 2021-onward digital equivalent) transfer
   authorization.** This half was already screened by GOV-1519: the ATPV-e
   is itself a system-generated output document, not an applicant-fillable
   form, and no legible specimen image of the physical CRV's reverse-side
   transfer block was found this cycle either — neither is directly
   sourceable as a field-by-field GovSchema document.
2. **The seller separately files a "Comunicação de Venda" with their state
   DETRAN**, attaching a copy of that notarized CRV/ATPV-e, to record the
   buyer against the vehicle in the state registry and release the seller
   from ongoing civil/criminal liability (CTB art. 134). **This is the
   genuinely sourceable, dedicated, field-level PDF this document models.**

`documents[].authenticatedTransferDocumentFile` represents the notarized
CRV/ATPV-e copy as a supporting-evidence attachment to this filing, rather
than modeling its own internal fields, consistent with how this document
cannot independently source that separate document's field layout (see
above).

The buyer's own follow-on step — bringing the same notarized document to a
DETRAN-MG unit in person within 30 days to register the vehicle in their own
name — is a separate, in-person, non-form-based procedure not modeled here.

## Access notes

- **Primary source (fetched directly, HTTP 200):**
  <https://detran.mg.gov.br/publico/files/upload/REQUERIMENTO%20DE%20COMUNICA%C3%87%C3%83O%20DE%20VENDA.pdf>
  — `curl -I` confirmed HTTP 200, `content-type: application/pdf`. PDF
  metadata: `Creator: Microsoft Word`, `Author: Iolanda Benfica`,
  `CreationDate: 2026-01-29`, confirming a current edition.
- **Cross-check source (fetched directly, HTTP 200, older edition):**
  <https://detran.mg.gov.br/publico/img/upload/files/Requerimento.pdf> —
  `Title: REQUERIMENTO - COMUNICAÇÃO DE VENDA`, `CreationDate: 2022-05-24`.
  Field content and order are identical to the 2026 edition apart from the
  closing block, which splits "Local e Data" into separate "Município" and
  "data" (day/month/year) fields in the 2026 edition versus one combined
  "(Local), ___ de ___ de 20__" line in the 2022 edition — modeled per the
  newer (2026) edition, since it is the more current of the two. This
  agreement across two independently-dated editions corroborates the field
  set's stability.
- **Corroborating source (fetched directly, HTTP 200):**
  <https://detran.mg.gov.br/publico/files/upload/Cartilha%20Comunica%C3%A7%C3%A3o%20de%20venda%20de%20ve%C3%ADculo.pdf>
  — DETRAN-MG's own official explanatory booklet ("Cartilha"), used to
  confirm the legal basis (CTB art. 134), the required notarized-document
  attachment, the 30/60-day filing-fee-waiver deadlines, and where filing
  occurs — narrative context, not a field source.
- Both PDFs were read using `pdfjs-dist@3.11.174` (the pinned version used
  by prior cycles per `gov-form-pdf-extraction.md`). `getTextContent()`
  confirmed a genuine, non-scanned text layer; `doc.getFieldObjects()`
  returned `null` and `page.getAnnotations()` returned an empty array,
  confirming no interactive AcroForm widgets — every field here is a
  printed label plus a blank, read directly from the text layer, not OCR or
  a rendered screenshot.
- **DETRAN-MG's live online filing wizard**
  (`protocolo.detran.mg.gov.br/veiculos/comunicacao-venda-veiculo/inserir-dados-responsavel`)
  returns **HTTP 302** to `http://protocolo.detran.mg.gov.br/ssc/login/login`
  on every path tried this cycle — an authenticated-citizen-login gate,
  consistent with the same wall already documented for DETRAN-SP
  (`e-crvsp.sp.gov.br`, GOV-1483) and BR CNH (GOV-1400). This document was
  therefore authored from the static PDF form, not a live wizard walk.
- **Confirmed a poor candidate this cycle, re-screened, not re-used:**
  DETRAN-ES's "Manual de Procedimentos e Normas Gerais de Serviços e
  Licenciamento de Veículos" (`Manual_de_procedimentos04.pdf`,
  `CreationDate: 2015-05-19`, cover page self-dated "versão 3.0 de 28 de
  fevereiro de 2012") — the same stale internal-norms document GOV-1519's
  cycle had already found and rejected; and DETRAN-ES's "Requerimento Geral"
  (`REQUERIMENTO GERAL (ATUALIZADO).pdf`) — a generic 17-checkbox
  multi-service administrative request cover sheet whose relevant items
  ("Comunicado de Venda," "Alteração de Endereço ou Nome (Veículos)") carry
  no seller/buyer identification fields of their own, unlike DETRAN-MG's
  dedicated form.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| "Eu, ___" / CPF / RG / Órgão expedidor / UF (seller identification block) | `sellerFullName`, `sellerCpf`, `sellerRg`, `sellerRgIssuingAgency`, `sellerRgIssuingState` |
| "residente e domiciliado(a) na" / nº / complemento / bairro / cidade / estado / CEP (seller address block) | `sellerStreetAddress`, `sellerAddressNumber`, `sellerAddressComplement`, `sellerAddressNeighborhood`, `sellerAddressCity`, `sellerAddressState`, `sellerAddressPostalCode` |
| "comunico que vendi o veículo de placa" / "na data de" | `vehiclePlate`, `saleDate` |
| "para o Sr(a)" / CPF / RG / Órgão expedidor / UF (buyer identification block) | `buyerFullName`, `buyerCpf`, `buyerRg`, `buyerRgIssuingAgency`, `buyerRgIssuingState` |
| "residente e domiciliado(a) na" / nº / complemento / bairro / cidade / estado / CEP (buyer address block) | `buyerStreetAddress`, `buyerAddressNumber`, `buyerAddressComplement`, `buyerAddressNeighborhood`, `buyerAddressCity`, `buyerAddressState`, `buyerAddressPostalCode` |
| "pelo valor de R$" | `saleValue` |
| "Município" / "data" (closing block) | `signingMunicipality`, `signingDate` |
| Cartilha p.3, notarized CRV/ATPV-e attachment requirement | `documents[].authenticatedTransferDocumentFile` |

## Interpretive judgment calls disclosed for an independent reviewer

1. **No field on this paper form carries an asterisk, "opcional" marker, or
   any other explicit required/optional cue.** Every blank is modeled as
   `required: true` except the two `AddressComplement` fields, which follow
   this registry's established convention for Brazilian address forms (an
   optional apartment/suite/unit qualifier, e.g. `br/pf/passport-application`)
   — since the form is a single declarative statement that is only legally
   meaningful when complete, this is judged the more defensible default, but
   it is a judgment call, not a source-stated requirement.
2. **`vehiclePlate`'s pattern** is constructed to accept both the legacy
   Brazilian plate format and the newer Mercosul format in one regular
   expression, since the source form itself imposes no format restriction
   and Brazil's plate stock includes both during its ongoing Mercosul
   rollout — not independently confirmed against a specimen of either format
   on the form itself (the form shows only a blank).
3. **`sellerRgIssuingAgency`/`buyerRgIssuingAgency`** are modeled as free
   text rather than an enum, since Brazilian RG-issuing-agency abbreviations
   (SSP, PC, IFP, DETRAN, and others) vary by issuing state and era with no
   single national closed list.
4. **`documents[].authenticatedTransferDocumentFile`** represents the
   notarized CRV/ATPV-e as one supporting-evidence attachment rather than
   modeling that document's own internal fields, since neither a legible CRV
   reverse-side specimen nor the (system-generated, non-applicant-facing)
   ATPV-e's field layout was independently sourced this cycle — see "What
   this document does and does not model" above.
5. This document scopes to the **seller's sale-notification filing only**,
   not the buyer's separate in-person registration-transfer step at a
   DETRAN-MG unit, nor any of DETRAN-MG's other vehicle-services processes
   (2nd-copy CRV/CRLV, restriction inclusion/discharge, chassis
   re-stamping, category/characteristic changes, etc.) that the sibling
   DETRAN-ES manual's table of contents enumerates but this form does not
   cover.
6. **Modeled as subnational (`BR-MG`)**, since vehicle registration in
   Brazil is administered per state DETRAN, not federally — mirroring this
   registry's existing `br/sp/jucesp/cnpj-registration-dbe` and
   `mx/semovi/alta-vehiculo-foraneo` precedent. A different Brazilian state's
   own "comunicação de venda" form (if one is found) would be a distinct
   sibling document, not a new version of this one, per the same reasoning
   `mx/semovi/alta-vehiculo-foraneo`'s own VERIFICATION.md applies.

## Test run (Phase 4 — mock-data conformance check)

A mock application packet (Ricardo Alves Moreira selling to Fernanda Lima
Torres, both fabricated Minas Gerais residents) was authored at
`conformance/br/mg/detran/comunicacao-de-venda-de-veiculo/1.0.0/application-packet.json`
(+ human-readable `.txt` rendering) and checked against `tools/validate.mjs`
and `tools/validate-ajv.mjs` (both pass for the schema document itself). The
mock packet's own data was additionally checked programmatically field by
field against every `required`, `pattern`, `enum`, `maxLength`, and
`minimum` constraint in this schema, and against the one required
`documents[]` entry — all pass, with no unknown keys. No automated
conformance-runner exists yet in this repository (per `conformance/README.md`'s
own "Out of scope" note), so this is a manual, scripted check, not a
machine-executed one against a live intake system.

## What is NOT yet independently verified

- A live DETRAN-MG intake walkthrough has not been performed (the online
  channel is login-gated, as documented above); this document is sourced
  entirely from the two independently-dated static PDF editions.
- Whether every field is genuinely `required` (see judgment call 1) — the
  source form provides no explicit marker either way.
- The exact current filing fee (the Cartilha states R$11.83 as of 2021 for
  a late, post-60-day filing; free within 60 days) is not modeled as a form
  field and may have changed since 2021.
- Whether DETRAN-MG's live online channel, if ever accessed with a test
  citizen login, collects any additional field (e.g. odometer/hodômetro,
  which DETRAN-MG's own separate online "intenção de venda" flow is
  reported to collect per secondary sources, but which does not appear on
  this paper form) not present on the paper form used here.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) by confirming the field set directly against a live
DETRAN-MG intake (if a test citizen login ever becomes available) or an
authoritative DETRAN-MG-published field-level checklist; resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5); and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (6
months). Re-check the sources on or before that date and on any `source.url`
change.
