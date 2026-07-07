# Verification record — `br/pr/iipr/carteira-identidade-correcao` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

Every field was confirmed either directly on-screen via a live Playwright
render of the real app, or by decompiling that same session's own compiled
Vue single-file-component render functions (real label text, option lists,
input masks, required-field markers — not just internal `$parent.form.<x>`
field names). It remains `draft`, not `verified`, because the data-entry
form's fields beyond the eligibility gate could not be walked with real
submitted data (see "Mock-data test run" below), and a second independent
reviewer's pass has not yet occurred.

## Why this candidate, and the DNS correction

Two prior `GovSchema Standard Research` cycles found and flagged this
candidate:

- **GOV-1616** (2026-07-07) first deep-dived Brazil's National ID gap
  (Carteira de Identidade Nacional, CIN) and found Paraná's RCI system
  (Registro Civil de Identificação) — the only Brazilian National ID
  candidate in this registry's history with a genuinely rich, unauthenticated
  field set, discovered by grepping the compiled `app.js` bundle for
  `$parent.form.<field>` references. It was rated the strongest-ever-found
  candidate but deliberately **not authored that cycle**, since confirming
  each field's real on-screen label/requiredness needed a live-rendered pass
  of the Vue app, not just static JS-bundle field-name inspection.
- **GOV-1624** (2026-07-07, later the same day) re-confirmed this candidate
  as strong and ready-to-author but again deferred it, picking Chile's SII
  Formulario 4415-PN instead for that cycle, explicitly leaving this Paraná
  candidate "for a dedicated future cycle."

**This document is that dedicated cycle.**

Both prior cycles' own notes cite the bare hostname `rci.pr.gov.br`
(without a `www.` prefix). That citation is now stale: as of 2026-07-07,
`rci.pr.gov.br` does not resolve in DNS at all — confirmed three independent
ways:

```
$ getent hosts rci.pr.gov.br          # no output, exit 2 (NXDOMAIN-equivalent)
$ python3 -c "import socket; socket.gethostbyname('rci.pr.gov.br')"
socket.gaierror: [Errno -2] Name or service not known
$ curl 'https://dns.google/resolve?name=rci.pr.gov.br&type=A'
{"Status":3, ...}   # NXDOMAIN
```

The real, live, working host is **`https://www.rci.pr.gov.br`** (with the
`www.` prefix) — confirmed `HTTP 200` on both
`https://www.rci.pr.gov.br/pedido` and
`https://www.rci.pr.gov.br/solicitante/iniciar`. It is embedded via an
`<iframe>` on `https://www.policiacivil.pr.gov.br/Pagina/Correcao-de-Solicitacao`
(also `HTTP 200`, confirmed by fetching the page's raw HTML directly:
`<iframe height="890" src="https://www.rci.pr.gov.br/pedido" width="100%">`),
and linked from IIPR's own service-catalog pages under "Identidade (CIN)" on
`policiacivil.pr.gov.br` (see "Second corroborating source" below). No
login, CAPTCHA, or WAF gate blocks any of these three pages.

## Live-render technique

A Playwright (`playwright-core`, chromium) session was launched headless
against a real Chrome binary (with the `LD_LIBRARY_PATH` workaround this
environment requires for missing system libs), using a realistic desktop
user agent and a 1366×900 viewport. Three screens were walked and
screenshotted:

1. **`https://www.rci.pr.gov.br/solicitante/iniciar`** — "SOLICITAÇÃO
   ON-LINE DA CARTEIRA DE IDENTIDADE NACIONAL – CIN / Exclusivo para
   documentos expedidos no Paraná." A single visible field, `num_doc`
   ("Número do documento" — the applicant's existing Paraná RG-with-check-digit
   or CPF number), gated behind a "Verificar" button that stays `disabled`
   until the input passes a client-side length check. Submitting it POSTs to
   `solicitante/verificarRg`, which server-side-checks the number against
   IIPR's own existing-record database and returns one of several outcomes
   (all present as hidden template strings in the page's own DOM, confirmed
   by reading the raw HTML): an existing-open-protocol prompt, an
   in-person-only rejection (twice — once generic, once for the Lei
   10.048/2000 "grupo preferencial" case), a genuine "cadastro disponível"
   success state (which then reveals `nome`/`data_nascimento` confirmation
   fields), a data-mismatch error, and a rate-limit error.
2. A **"Não sei meu número"** ("I don't know my number") link, confirmed
   live: clicking it reveals **"Clique aqui para agendar"** — an in-person
   scheduling link — confirming that citizens who don't know their existing
   RG/CPF number are routed to an in-person appointment, not any synthetic
   online path.
3. **`https://www.rci.pr.gov.br/pedido`** — "Correção de Solicitação." A
   single visible field, `celular` (mobile phone number, masked
   `(DDD) _____-____`), gated behind a "Validar" button. This is IIPR's
   *separate* re-entry point for a citizen who already submitted a request
   and was sent an SMS by IIPR asking them to fix specific flagged items —
   distinct from, but functionally overlapping with, the `solicitante/iniciar`
   gate (confirmed by decompiling both components: they share the same
   phone/SMS-code verification sub-flow, and once past either gate the
   citizen reaches the same set of correction screens — see "Component
   reconstruction" below).

## Mock-data test run

Per this cycle's brief, a synthetic-but-checksum-valid CPF,
**`529.982.247-25`** (a well-known Brazilian placeholder/test CPF that
passes the standard two-check-digit modulo-11 algorithm — verified by hand:
first check digit from weights 10..2 over `529982247` sums to 295, `295 mod
11 = 9`, `11-9=2` ✓; second check digit from weights 11..2 over
`5299822472` sums to 347, `347 mod 11 = 6`, `11-6=5` ✓), was typed into the
`num_doc` field and submitted live:

- **Result:** `"Atenção: O seu cadastro no Paraná não está disponível para
  a solicitação on-line da CIN. É necessário realizar o agendamento para
  atendimento presencial."` — i.e. correctly rejected, since no real IIPR
  record exists for this synthetic number. Screenshot:
  `after-verificar3.png` in this cycle's working notes.
- The same synthetic approach was also tried against the *separate*
  `celular` (phone) gate on `/pedido`, with a synthetic number
  `(41)99999-8888`: **Result:** `"Pedido não encontrado"` ("Request not
  found") — again a correct rejection, confirming genuine server-side
  validation on both entry points, not a client-side-only check.

This confirms — as this cycle's brief anticipated — that **no synthetic
value can pass either eligibility gate**: the data-entry form's fields
beyond this point genuinely require a real existing Paraná RG/CIN holder's
credentials to reach live. This is a normal, previously-seen sourcing limit
in this registry (e.g. several published schemas combine a live-DOM walk up
to a real-record gate with the same app's own compiled source for what lies
beyond it). No real personal data was ever entered; no submission was
completed; client-side validation was the deepest point reached live.

## Component reconstruction (beyond the gate)

`https://www.rci.pr.gov.br/js/app.js?id=1fff2a22899fb4be9662` (2.2MB,
directly downloadable, `HTTP 200`, no login/CAPTCHA/WAF) is a webpack
bundle of a Vue 3 (Options API) app compiled with `vue-loader`'s
`@vue/compiler-sfc`. Unlike a typical minified bundle, each Single File
Component's `render()` function is compiled to explicit
`createElementVNode(tag, props, children)` calls with **hoisted static
VNodes** (`_hoisted_N` variables) — meaning every literal on-screen label,
help-text string, and `<option>` list survives compilation as a plain
JavaScript string literal, not just the field's internal camelCase name.
This cycle located and extracted each relevant component's own webpack
module (keyed by its unique `?vue&type=template&id=<hash>` module path) and
read its labels, masks, and option lists directly, rather than trusting the
`$parent.form.<field>` names GOV-1616's grep-only pass had surfaced. This
caught one genuine discrepancy with the prior cycles' own catalog notes:
**`nome_mae`/`nome_pai` are dead, commented-out code** (`// if
(this.pedidoAnterior.nome_pai) {...}`) — the live field is a dynamically
repeating `filiacoes` array (`Filiação 1:`, `Filiação 2:`, … up to 6
entries, add/remove buttons), not two fixed parent-name fields.

The correction flow is a single-page "Home" tile menu (`Pages/Home.vue`)
titled "Selecione os serviços que deseja, para solicitar sua Carteira de
Identidade Nacional – CIN," offering six checkbox-gated sections, each
implemented as its own sub-component under `resources/js/Pages/Extendido/`:

| Tile (Home.vue) | Component | Sub-fields this document models |
|---|---|---|
| *Atualizar foto (asterisked: "obrigatória para a solicitação da CIN com atualização") | `Foto.vue` | `photoFile` document |
| *Incluir documentos (asterisked: "A inclusão do CPF é obrigatória") | `Documentos.vue` | `numCPF`, `numCPFResponsavel`, and 7 optional document-number/file pairs (CNH/CNS/PIS/TRE/CTM/CTPS/CIP) |
| Atualizar dados biográficos | `Nome.vue` | `correctedFullName`, `correctedDateOfBirth`, `parentageChanged`, `parent1Name`/`parent2Name`, `maritalStatus`, `civilRegistryNumber`, `civilRegistryCertificateFile` |
| Atualizar assinatura | `Assinatura.vue` | `signatureImageFile` (upload or live signature-pad) |
| Adicionar condições de saúde e deficiências | `Saude.vue` | 5 disability booleans, `observacoesSaude`, `tipoSanguineo`, `doadorOrgaos`, `healthConditionProofFile` |
| *Atualização de contato e endereço (asterisked: "obrigatório possuir um número de celular válido") | `Endereço.vue` | `cellPhone`, address block, `pickupLocationPost`, `seniorCitizenStripe` |

The three asterisked tiles' own prose ("*A atualização da foto é
obrigatória...", "*A inclusão do CPF é obrigatória...", "É obrigatório
possuir um número de celular válido") is the source for modelling `Foto`,
`numCPF`, and the core `Endereço` fields (`cellPhone`,
`postalCode`/`state`/`municipality`/`neighborhood`/`streetAddress`/
`addressNumber`/`pickupLocationPost`) as unconditionally `required: true` —
i.e. every correction/reissuance request always needs a current photo, a
validated CPF, and a current delivery address/phone, regardless of which
other optional sections (biographical data, signature, health) the citizen
also opts into. The judgment call: the live Home.vue template renders all
six tiles as ordinary checkboxes (no `disabled`/pre-checked attribute was
observed in the static template for the three asterisked ones, since that
state is only set by the component's own script logic at runtime, which
this document did not reach live) — so this document infers the "always
required" status for those three tiles' core fields from the form's own
explicit prose, not from an observed disabled/pre-checked checkbox state.

`Pages/Corrigir.vue` (despite its name) is the **success** screen shown
after a request is submitted ("Solicitação realizada com sucesso! ... Você
receberá um SMS com o número da solicitação. Seu pedido será analisado em
até 48 horas..."). `Pages/Pedido/Index.vue` is the actual "Correção de
Solicitação" phone/SMS re-entry screen (matches the live screenshot at
`/pedido` exactly). `Pages/Pedido/Home.vue` is the downstream screen shown
after that phone verification succeeds: a list of IIPR-staff-flagged
"motivos" (reasons), each with an approved/pending icon and an observation
note, with "Corrigir"/"Enviar"/"Sair"/"Cancelar Solicitação" actions — this
is IIPR's internal review/approval loop, not a fixed field schema (the
`motivos` list is dynamically generated per-request by IIPR staff), and is
therefore **not modelled** here (see "What is deliberately NOT modelled"
below).

## Second corroborating source

Beyond the live app and its own compiled source, this cycle also found and
read IIPR's own service-catalog description page (a distinct, independently
maintained CMS page, not the Vue app):
`https://www.policiacivil.pr.gov.br/servicos/Servicos/Identidade-CIN/Solicitar-a-Carteira-de-Identidade-Nacional-CIN-Para-quem-possui-a-CIN-ou-o-RG-expedido-no-Parana-WaowKoDJ`
("Solicitar a Carteira de Identidade Nacional - CIN (Para quem possui a CIN
ou o RG expedido no Paraná)"), `HTTP 200`, no login/CAPTCHA/WAF. Its "O que
é" section states, verbatim: *"Por meio desse serviço, o cidadão que possui
a CIN ou o RG expedido no Paraná, poderá fazer a solicitação on-line da sua
Carteira de Identidade Nacional (CIN). Nesta modalidade, poderão ser
realizadas atualizações ou alterações no cadastro... A CIN não poderá ser
entregue a Procurador quando a solicitação for on-line, pois nessa
modalidade é necessária a validação biométrica do titular para retirar o
documento."* This independently corroborates: (a) the scope is
correction/update of an *existing* record, matching this document's title
and scope; (b) delivery requires the titleholder's own in-person biometric
validation (no proxy/attorney-in-fact pickup), which is why
`pickupLocationPost` is modelled as a physical IIPR post, not a mail-delivery
address; (c) the fee is R$49.31 for anyone who has previously requested a
CIN in Paraná or any other state, and free for first-time requesters — a
fee schedule this document does not model as a `documents[]`
`category: "payment"` entry, since no fee-payment step or amount is
confirmed inside the live app itself (see "What is deliberately NOT
modelled").

Its sibling page,
`.../Solicitar-a-Carteira-de-Identidade-Nacional-CIN-Para-quem-nao-possui-CIN-ou-RG-expedido-no-Parana-dloelrLv`
("...Para quem não possui CIN ou RG expedido no Paraná"), independently
confirms first-time issuance is **in-person-appointment-only** ("poderá
agendar atendimento presencial em um posto de atendimento do Instituto de
Identificação do Paraná") — this document does not model that pathway.
(This supersedes GOV-1616's own citation of a `seguranca.pr.gov.br` page
making the same claim: that exact URL now 404s; the equivalent, current
confirmation lives on this `policiacivil.pr.gov.br` service page instead.)

No further corroborating source (e.g. a downloadable PDF manual or a
`gov.br` federal service-catalog mirror) was found for this Paraná-specific
online flow — the `policiacivil.pr.gov.br` service-catalog page above is
the strongest available second source, consistent with this registry's
house style allowing a single well-verified live source plus one
independent descriptive page when no separate PDF/manual exists.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| `Documentos.vue`, "CADASTRO DE PESSOA FÍSICA (CPF)" | `numCPF` |
| `Documentos.vue`, "CPF do responsável pelo menor" (`v-if precisaCpfResponsavel`) | `numCPFResponsavel` |
| `Documentos.vue`, CNH/CNS/PIS/TRE/CTM/CTPS/CIP checkbox+number(+série/UF/emissor)+file blocks | `includeCnh`/`numCNH`, `includeCns`/`numCNS`, `includePis`/`numPIS`, `includeTre`/`numTRE`, `includeCtm`/`numCTM`, `includeCtps`/`numctps`/`seriectps`/`ufctps`, `includeCip`/`numcip`/`emissorcip`/`ufcip`, and their `*ProofFile` documents |
| `Nome.vue`, "Nome:" / "Data de Nascimento:" / "Houve alteração na filiação?" / "Filiação N:" / "Estado Civil:" / "Matrícula da Certidão:" | `correctedFullName`, `correctedDateOfBirth`, `parentageChanged`, `parent1Name`/`parent2Name`, `maritalStatus`, `civilRegistryNumber`, `civilRegistryCertificateFile` |
| `Assinatura.vue`, canvas signature-pad / "Enviar foto da assinatura" | `signatureImageFile` |
| `Saude.vue`, AUDITIVA/FÍSICA/INTELECTUAL/VISUAL/AUTISMO checkboxes, "Observações de saúde:", "Tipo Sanguíneo:", "Doador de Órgãos:", "Laudos Comprobatórios" | `defAuditiva`/`defFisica`/`defIntelectual`/`defVisual`/`defAutismo`, `observacoesSaude`, `tipoSanguineo`, `doadorOrgaos`, `healthConditionProofFile` |
| `Endereço.vue`, "Telefone Celular" / "Cep" / "Estado" / "Município" / "Bairro" / "Logradouro" / "Número" / "Complemento" / "Local de Retirada" / "Incluir informação \"IDOSO\"?" | `cellPhone`, `postalCode`, `state`, `municipality`, `neighborhood`, `streetAddress`, `addressNumber`, `addressComplement`, `pickupLocationPost`, `seniorCitizenStripe` |
| `Home.vue`, six tile checkboxes + asterisked "obrigatória"/"obrigatório" prose | `correctBiographicalData`, `updateSignature`, `addHealthConditions`, and the three unconditionally-required sections (Foto/CPF/Endereço) |

## What is NOT independently confirmed / out of scope

- **First-time CIN/RG issuance.** Confirmed separately, in-person-only —
  see "Second corroborating source" above. Out of scope by design; this
  document's title and description are scoped to correction/update of an
  *existing* Paraná record only.
- **The eligibility/lookup screen itself
  (`num_doc`/`nome`/`data_nascimento`, and the separate `celular`/SMS-code
  re-entry gate on `/pedido`).** These are authentication/record-matching
  mechanics, not data fields of the correction request — consistent with
  every other schema in this registry excluding login/CAPTCHA/OTP mechanics
  (e.g. `br/sp/jucesp/cnpj-registration-dbe`'s VERIFICATION.md explicitly
  makes the same exclusion for gov.br/Brasil Cidadão login).
- **IIPR's internal staff review/approval loop
  (`Pages/Pedido/Home.vue`'s dynamic "motivos" list).** Not a fixed field
  schema — it's a per-request list of flagged items IIPR staff generate
  during their internal review, described in prose ("Seu pedido será
  analisado em até 48 horas... você receberá outro SMS com o número do
  protocolo aprovado ou o motivo da reprovação") but not enumerable as a
  closed field set.
- **The fee-payment step** ("guia de pagamento," R$49.31 for repeat
  requesters). Confirmed to exist by the corroborating service-catalog page
  and by the success-screen prose ("Caso seu pedido tenha sido APROVADO, com
  o número do protocolo recebido, acesse novamente o site do IIPR para
  emissão da guia de pagamento"), but its own payment-collection form is a
  separate, later step this document does not model (no amount/method
  confirmed live).
- **Repeating `filiacoes` beyond the first two entries.** The live form
  supports up to 6 dynamically-added filiação entries; GovSchema v0.3 has no
  array/multi-value field type, so (consistent with
  `br/sp/jucesp/cnpj-registration-dbe`'s single-founder QSA precedent) only
  `parent1Name`/`parent2Name` are modelled.
- **`observacoesSaude`'s full option catalog and `pickupLocationPost`'s full
  post-office catalog.** Both are populated at runtime from external,
  server-provided lists (`observacoesOptions`, `retiradaOptions`) not
  enumerable from the compiled source — modelled as open strings rather than
  closed enums, consistent with this registry's established precedent for
  dropdowns whose full option list isn't statically confirmable (e.g.
  `br/sp/jucesp/cnpj-registration-dbe`'s `registryBodyType`).
- **`municipality`'s full municipality catalog.** Populated per-state from
  an external `optionsMunicipios` list (`{chave, nome}` pairs); modelled as
  an open string, not an enum, for the same reason.
- **The "correcting the name makes updating the signature mandatory" rule**
  (`Home.vue`'s own note: "Ao atualizar o nome torna-se obrigatório a
  atualização da assinatura"). Disclosed in `correctBiographicalData`'s
  description rather than encoded as a `requiredWhen`/`crossFieldValidation`
  rule: GovSchema v0.3's `crossFieldValidation.requirePresent` checks a
  field's mere *presence*, not that a specific boolean field equals `true`,
  so it does not cleanly express "field A `true` implies field B `true`"
  without overreaching the grammar's intent.
- **`seniorCitizenStripe`'s visibility condition** (only shown to applicants
  60+ per their existing record). This is a server-side condition based on
  data (date of birth) this form only sometimes collects (only when
  `correctBiographicalData` is also selected) — disclosed in the field's own
  description rather than forced into a `requiredWhen`/`visibleWhen`
  condition against a field that may not be present.
- **The unusual `cep` mask** (`##.###-###`, i.e. `XX.XXX-XXX` — grouped
  differently from the far more common Brazilian `XXXXX-XXX` CEP display,
  though both are 8 digits). Taken directly and verbatim from the live
  component's own `v-mask` directive, not assumed or corrected, since it is
  what the real form enforces.

## Test run

The `conformance/br/pr/iipr/carteira-identidade-correcao/1.0.0/application-packet.json`
fixture is a fabricated, obviously-synthetic example packet — Camila dos
Santos Ferreira (fake name), the same checksum-valid test CPF used in the
live mock-data run above, a fake Curitiba address — illustrating one
plausible correction request (biographical-data + signature + address
correction, no optional secondary documents or health/disability changes).
It was checked with a from-scratch script (`/tmp/conformance-check-br-pr.mjs`,
re-implementing this document's own `required`/`requiredWhen` `Condition`
grammar per GSP-0013), since no live submission past the eligibility gate
was reachable to cross-check against directly. Result: **0 violations**
across 59 fields/documents (21 collected, 38 correctly not-applicable/
absent). Mutation tests confirmed: (1) flipping `parentageChanged` to `true`
without supplying `parent1Name`/`parent2Name` correctly flags both as
missing; (2) flipping `correctBiographicalData` to `false` correctly drops
every biographical-section `requiredWhen` chain back to not-required; (3)
removing the always-required `cellPhone` value correctly flags it as
missing. The schema itself was also validated against the GovSchema v0.3
meta-schema with both `tools/validate.mjs` and `tools/validate-ajv.mjs`
(both pass); one real authoring bug this caught pre-merge: `signatureImageFile`
was initially miscategorized `category: "attestation"`, which the v0.3
meta-schema forbids from carrying a `constraints`/`mediaTypes` block —
fixed to `category: "supporting-evidence"`.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer should independently re-fetch
`https://www.rci.pr.gov.br/js/app.js` (confirming the `?id=` hash is
unchanged or, if changed, re-diffing the compiled component source against
this document's field list) and — ideally — walk the live wizard past the
eligibility gate with a real (test) Paraná RG/CPF holder's consent, to
confirm the Home.vue tile-selection behavior (in particular, whether the
three "asterisked" tiles are genuinely rendered `disabled`/pre-checked, a
judgment call this document currently infers from prose rather than an
observed runtime state) and the exact live requiredness of
`numCPFResponsavel`/`seniorCitizenStripe`.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-07** (6
months).
