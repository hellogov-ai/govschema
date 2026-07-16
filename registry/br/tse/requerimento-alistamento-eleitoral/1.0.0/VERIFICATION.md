# Verification record — `br/tse/requerimento-alistamento-eleitoral` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3274**). This document
opens a new schema in Brazil's **National ID & Civic Documents** vertical
(Brazil already has a schema in this vertical — `br/pr/iipr/carteira-identidade-correcao`
— so this is a companion schema for a distinct national process, not a new
jurisdiction or vertical opening).

## IMPORTANT: the live service is currently suspended (confirmed 2026-07-16)

Before authoring, this cycle checked whether Título Net had ever been
scouted before. A prior cycle, **GOV-1483** (2026-07-06), found Brazil's
Título Net alistamento service "nationwide-closed from **2026-05-07 to
2026-11-03** under art. 91 of the Lei das Eleições (Lei no. 9.504/1997),
which bars any registration/transfer request within 150 days of an election
(Brazil holds municipal elections in October 2026)" via a live,
unauthenticated Playwright walk — see CATALOG.md's own Executive Summary
entry for that cycle. Today (2026-07-16) falls inside that window, so this
cycle independently re-verified the block is still in effect rather than
assuming the earlier note was current:

```
$ playwright chromium, real desktop UA, headless, no login
Navigated to: https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral
Extracted page text includes:
  "O atendimento remoto via Título Net está bloqueado entre os dias
   07/05/2026 e 02/11/2026, conforme prevê a norma eleitoral vigente."
```

This **confirms and is consistent with** the GOV-1483 finding (the end date
differs by one day in the two citations — GOV-1483's own prose says
"2026-11-03", the live banner says "02/11/2026" i.e. 2026-11-02; both are
recorded here rather than silently reconciled). Critically, the menu item
"Tirar primeiro título" (get first title) is still listed on the page, and
the underlying Angular SPA bundle (`tn3.tse.jus.br/main.js`) is still served
completely normally — the reactive-form definitions this document's fields
are sourced from are real, current, production code, unaffected by the
runtime submission gate. Only an actual live submission attempt is refused
until the blackout lifts. This is the same distinction this registry has
already established for other genuinely time-gated (not dead-end) sources:
the schema still accurately describes the process, which reopens
2026-11-03 (or 2026-11-02 per the live banner's own wording — either way,
the process resumes in Q4 2026).

This is disclosed in the schema's own top-level `description` and
`verification.notes` fields, not only here, so a consumer reading the
`schema.json` alone (without VERIFICATION.md) still sees it.

## Discovery

The prior cycle, **GOV-3267**, scouted Brazil's TSE (Tribunal Superior
Eleitoral) as a "remaining voter registration" candidate — one of the four
named National ID candidates in this routine's own standing brief — and
found the **Requerimento de Alistamento Eleitoral** (first-time voter
registration): a genuine, well-documented, government-operated online
service with no downloadable PDF/AcroForm equivalent. That cycle left it as
a disclosed, ready-to-author candidate rather than authoring it, in favor of
a more concretely-sourced Sri Lanka Taxes candidate that same session. See
CATALOG.md's "Genuinely open, well-sourced candidates" section, the GOV-3267
entry.

This cycle picked up that lead. Two official TSE sources were fetched
directly via `curl` first (both HTTP 200, no login/CAPTCHA gate):

- `https://www.tse.jus.br/comunicacao/noticias/2021/Dezembro/veja-o-passo-a-passo-para-tirar-o-primeiro-titulo-pela-internet`
  — the official step-by-step article for first-time online registration.
- `https://www.tse.jus.br/servicos-eleitorais/titulo-eleitoral-faq` and
  `https://www.tse.jus.br/servicos-eleitorais/titulo-eleitoral/autoatendimento-eleitoral/autoatendimento-eleitoral-titulo-net`
  — the FAQ and official how-to article, which additionally describe the
  wizard's own section order ("Dados Pessoais" → "Endereço e local de
  votação" → "Dados Complementares" → "Contato") and several category
  glosses (e.g. the `residencyBondType` values: residencial, afetivo,
  familiar, profissional, comunitário, de outra natureza).

These sources name field categories in prose but do not expose exact
internal field names, types, or conditional-requiredness logic. Rather than
model from prose alone, the actual live production bundle of the wizard
itself — **Título Net**, a live Angular single-page application served from
`tn3.tse.jus.br` and embedded on
`https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral` — was
independently fetched and decompiled:

```
$ curl -sIL https://tn3.tse.jus.br/main.js?id=2026-07-14-21
HTTP/1.1 200 OK
content-type: application/javascript
content-length: 2529928
last-modified: Thu, 02 Jul 2026 22:37:05 GMT

$ sha256sum main.js
c50f034b8d7c6e97cd18d5947a51f812ff32ca1809cbe1a982dac2b6b1eb03c2  main.js
```

Retrieved 2026-07-16. This is a minified but non-obfuscated Angular Ivy
build (class/method names are mangled short identifiers, but string
literals, validator names, and reactive-form `FormBuilder.group({...})`
calls are all intact plaintext) — the same class of source this registry
has previously relied on for `br/pr/iipr/carteira-identidade-correcao`
(compiled Vue render functions) and other SPA-only government services with
no static PDF equivalent.

## Method

Every field below was located as a real `formBuilder.group({...})` entry in
the decompiled bundle and cross-checked against its own real Angular
validator calls (`Validators.required` and the app's custom validators:
`apenasNomes`, `peloMenosDoisNomes`, `naoCaracteresEspeciais`, `cpfValido`,
`apenasNumeros`, `apenasAlfanumericosOuPontuacao`, `obrigatorioSe`,
`obrigatorioSeOutroCampoEstiverPreenchido`, `validarDocReservista`,
`validarDeficiencias`), not informal internal-property-name guesses. Five
distinct wizard sub-components were located and decompiled in full:

1. **Dados Pessoais** (`nome`, `dataNascimento`, `indicadorOpcaoFiliacao`,
   `filiacao1`–`filiacao4`, `cpf`, `tipoDoc`, `numDoc`, `orgaoExpedidor`,
   `genero`, `estadoCivil`, `grauInstrucao`, `ocupacao`, `ufNascimento`,
   `municipioNascimento`, `possuiIrmaoGemeo`, `desejaSerVoluntario`,
   `possuiDeficiencia`, `listaDeficiencias`, `reservista`). Confirmed
   specifically applicable to the **alistamento** flow (not only
   transferência/revisão, which reuse the same component) via the
   component's own `this.ehAlistamento` conditional branch, which sets
   initial values from `credenciais.tipoFiliacao` only in the alistamento
   case.
2. **Endereço** (`pais`, `siglaUf`, `cep`, `cepZZ`, `cidadeZZ`,
   `localidadeZZ`, `bairroZZ`, `municipio`, `bairro`, `endereco`,
   `enderecoZZ`, `numero`, `complemento`, `tipoVinculo`, `anos`, `meses`).
   The `*ZZ`/`pais` fields are the overseas-residence variant, scoped out
   of this document — see "Scoping decisions" below.
3. **Local de Votação** (`localVotacao`, `secaoAcessivel`).
4. **Dados Complementares** (`identidadeGenero`, `racaCor`, `nomeSocial`,
   `ehQuilombola`, `ehInterpreteLibras`, `comunidadeQuilombola`,
   `falaLinguaQuilombola`, `linguaQuilombola`, `etniaIndigena`,
   `segundaEtnia`, `falaLinguaIndigena`, `linguaIndigena`).
5. **Contato** (`tipoTelefone1`–`3`, `nacionalidadeContato1`–`3`,
   `telefone1`–`3`, `nomeContato`, `aceitaReceberMsg`, `aceitaReceberEmail`,
   `email`, `confirmarEmail`).

A sixth component, **Documentos**
(`selfie`/`docIdentficacao`/`comprovanteRes`/`certidao`/`outros`/
`docsAusencia`), maps each upload slot to a real internal document-type
constant via its own `getTipoDocumento` switch statement
(`selfie`→`FOTO_SEGURANDO_DOCUMENTO`, `docIdentficacao`→`IDENTIFICACAO`,
`comprovanteRes`→`COMPROVANTE_RESIDENCIA`, `certidao`→`CERTIDAO_NASCIMENTO`,
default→`OUTROS`). A seventh component, **Débitos**
(`opcaoMulta`), was confirmed present in the bundle but excluded — it
addresses existing electoral fines, structurally impossible for a
first-time applicant (see "Scoping decisions" below).

Enum values modelled with `type: "enum"` are the bundle's own real internal
string constants, not paraphrases:

- `raceColor`: found via `var ei=(()=>{...ei.BRANCA="BRANCA",ei.PRETA="PRETA",ei.PARDA="PARDA",ei.INDIGENA="INDIGENA",ei.AMARELA="AMARELA"...})()`
  and the matching label array
  `const Gt=[...(ei.AMARELA,"AMARELA"),(ei.BRANCA,"BRANCA"),(ei.INDIGENA,"INDÍGENA"),(ei.PARDA,"PARDA"),(ei.PRETA,"PRETA")]` —
  the standard IBGE five-category race/color classification.
- `gender`: the literal strings `"MASCULINO"`/`"FEMININO"` appear directly
  inside the `validarDocReservista` cross-field validator's own comparison.
- `isQuilombola`/`isLibrasInterpreter`: the live form's own valueChanges
  guards compare against the literal string `"SIM"` (e.g.
  `.pipe(filter(W=>"SIM"!=W))`), confirming a `"SIM"`/`"NAO"` two-value
  domain.

## Scoping decisions (disclosed, not fidelity gaps)

- **Domestic residents only.** The `pais`/`cepZZ`/`cidadeZZ`/`localidadeZZ`/
  `bairroZZ`/`enderecoZZ` address fields (for citizens resident abroad) are
  excluded. TSE itself designates "Eleitorado no Exterior" as a distinct
  service with its own top-level navigation entry, distinct address shape,
  and (per the FAQ) a client-rendered microsite of its own — a natural
  future companion schema, not a gap in this one.
- **First-time registration only, not transferência/revisão.** The
  `informacoesDebitos`/`opcaoMulta` (electoral-fine) step is excluded: it
  addresses fines for missed votes/poll-worker duty on an *existing*
  registration, which cannot exist for a first-time applicant. This is the
  same underlying wizard component set used for título transferência
  (change of electoral domicile) and revisão (data correction), which this
  document does not model.
- **`parentageDeclarationOption` and `parent1Name`–`parent4Name`.** The
  live form's true requiredness for the four parent-name fields depends on
  `indicadorOpcaoFiliacao`'s value being passed through an internal helper
  method (`deveHabilitarCampoFiliacaoPara`, keyed against an enum `ji.r`
  with members including `MAE`/`PAI`/`MAE_2`/`PAI_2`). The enum's own
  accepted string values were not independently confirmed this cycle (the
  bundle references it only via minified aliases). All four parent-name
  fields are modelled `required: false` rather than guessing at a
  `requiredWhen` condition that might not match the live enum's real
  values — a disclosed simplification, not a claim that the fields are
  truly always optional on the live form.
- **`militaryReservistCertificateNumber` / `militaryDischargeProofFile`.**
  The real live-form condition
  (`validarDocReservista(dataNascimento, genero, reservista)`) requires
  BOTH `gender === "MASCULINO"` AND a computed check that the applicant
  turns 19 within the current calendar year (the conscription window).
  GovSchema's `Condition` grammar supports only static field-to-value
  comparisons, not a computed function of a date field, so this document's
  `requiredWhen` uses `gender equals MASCULINO` alone — broader than the
  live form's real condition. This is independently corroborated as a real,
  disclosed exception by the official FAQ: "Você pode solicitar o título
  sem a apresentação do certificado de quitação militar se estiver fora do
  período de conscrição." Disclosed here rather than mis-modelled as an
  exact match.
- **`socialName`.** Enabled on the live form only when
  `identidadeGenero`'s value contains the substring "TRANS" — not
  expressible as a GovSchema `equals`/`in` condition against a dynamic,
  externally-fetched reference list whose full value set was not
  enumerated this cycle. Modelled as always-optional with the real
  condition disclosed in its own field description.
- **External/dynamic reference-table fields.** `maritalStatus`,
  `educationLevel`, `occupation`, `birthMunicipality`,
  `selfDeclaredGenderIdentity`, and `residencyBondType` are each backed by
  the live service's own server-fetched reference lists (confirmed via
  `store.select`/`iniciarConsultar*` dispatch calls in the bundle, e.g.
  `municipioNascimento`'s list depends on the chosen `ufNascimento`), not a
  fixed enum baked into the client bundle. Each is modelled as an open
  `string`, this registry's established convention for a field backed by an
  external code table it cannot reproduce in full (see e.g.
  `co/dian/declaracion-renta-personas-naturales-formulario-210`'s own
  disclosed external-code-table fields). `residencyBondType`'s category
  glosses are drawn from the official FAQ prose instead, a second
  independent source, since the live list itself is fetched at runtime.
- **Type-level simplification of internal "SIM"/"NAO" toggles.**
  `speaksQuilombolaLanguage` and `speaksIndigenousLanguage` are modelled as
  GovSchema `boolean`, though the live form internally stores `"SIM"`/
  `"NAO"` string tokens (confirmed via their own
  `.pipe(filter(W=>"SIM"!=W))` valueChanges guards). This is a type-level
  house-style simplification for a plain two-state toggle, not a fidelity
  gap in the underlying yes/no semantics — `isQuilombola` and
  `isLibrasInterpreter` keep the literal `"SIM"`/`"NAO"` values as `enum`
  fields instead, since other fields' `requiredWhen` conditions reference
  their exact stored value (`isQuilombola equals "SIM"`).
- **Contact phone 2/3 deferred.** The live form supports up to three phone
  numbers (`telefone1`–`3`/`tipoTelefone1`–`3`/`nacionalidadeContato1`–`3`).
  Only the first slot is modelled; the second/third are an
  unbounded-repeating-like structure deferred per this registry's
  established convention for such containers.
- **Document-required-set is server-computed.** The bundle's own
  `abaDocumentos.documentosObrigatorios` is populated from the server's API
  response per applicant, not a static client-side list. The four modelled
  document entries (`selfieWithIdFile`, `identityDocumentFile`,
  `proofOfResidenceFile`, `militaryDischargeProofFile`) reflect the TSE's
  own published baseline description from the official step-by-step
  article, not an exhaustive enumeration of every server-computed edge
  case. `birthCertificateFile` (`certidao`→`CERTIDAO_NASCIMENTO`) is
  modelled optional since neither the guide's four-photo baseline nor the
  FAQ names it as universally required for an applicant presenting another
  accepted photo ID.

## Mock test run

Two valid mock scenarios and four mutation-control fixtures are committed
under `conformance/br/tse/requerimento-alistamento-eleitoral/1.0.0/`:

1. **`application-packet-1.json`** — Marcos Antônio da Silva, a salaried
   resident of Belo Horizonte (MG) registering for the first time and
   volunteering as a poll worker; no disability, not quilombola, not
   indigenous, opts out of contact.
2. **`application-packet-2.json`** — Iracema Kaingáng, a self-declared
   indigenous applicant in Manaus (AM) who speaks an indigenous language,
   is not quilombola, and opts in to email updates.
3. **`mutation-missing-required-field.json`** — omits the statically
   required `fullName`.
4. **`mutation-missing-quilombola-community.json`** — `isQuilombola` is
   `"SIM"` but `quilombolaCommunityName` is omitted.
5. **`mutation-missing-indigenous-ethnicity.json`** — `raceColor` is
   `"INDIGENA"` but `indigenousEthnicity` is omitted.
6. **`mutation-missing-required-document.json`** — omits the required
   `proofOfResidenceFile` document.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`/
`documents[]`, discarded after use, not committed to the repository) ran
all 6 fixtures: both valid scenarios passed with 0 errors; all 4 mutation
controls each raised exactly 1 error, on the expected field/document. The
same script confirmed every `requiredWhen` field reference in this document
resolves to a real field name (0 dangling references) — a known past
mistake in this registry (see CATALOG.md/memory notes on dangling
`requiredWhen` references caught by prior review-gate cycles).

## Tooling

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, both individually and as part of a full
registry run (498/498 documents passing on this branch, up from 497 on
`main`).
